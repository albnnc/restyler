import { hash } from 'lib/utils';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction
} from 'react';

interface LoaderRegistryDatum {
  count: number;
  subscriptions: Dispatch<SetStateAction<boolean>>[];
}

class LoaderRegistry {
  data = new Map<any, LoaderRegistryDatum>();
  globalDatum: LoaderRegistryDatum = {
    count: 0,
    subscriptions: []
  };

  addDelta(ids: any[] | undefined, delta: 1 | -1) {
    const targetIds = ids === undefined ? Array.from(this.data.keys()) : ids;
    for (const id of targetIds) {
      let datum =
        this.data.get(id) ??
        this.data.set(id, { count: 0, subscriptions: [] }).get(id);
      if (!datum) {
        continue;
      }
      datum.count += delta;
    }
    this.globalDatum.count += delta * targetIds.length;
  }

  bind(ids: any[] | undefined, fn: Dispatch<SetStateAction<boolean>>) {
    if (ids === undefined) {
      this.globalDatum.subscriptions.push(fn);
    } else {
      ids.forEach(id => {
        const datum = this.data.get(id);
        if (datum) {
          datum.subscriptions.push(fn);
        } else {
          this.data.set(id, { count: 0, subscriptions: [fn] });
        }
      });
    }
    // Updating newly bound subscriber in order
    // it to be in sync with already exist data.
    this.update(ids);
  }

  clean(ids: any[] | undefined) {
    // Only non-global data have to be cleaned.
    if (!ids) {
      return;
    }
    ids.forEach(id => {
      const datum = this.data.get(id);
      if (datum && datum.count <= 0 && datum.subscriptions.length < 1) {
        this.data.delete(id);
      }
    });
  }

  load(ids: any[] | undefined) {
    this.addDelta(ids, 1);
    this.update(ids);
    this.clean(ids);
  }

  unbind(ids: any[] | undefined, fn: Dispatch<SetStateAction<boolean>>) {
    const unbindDatum = datum => {
      if (!datum) {
        return;
      }
      datum.subscriptions = datum.subscriptions.filter(v => v !== fn);
    };
    if (ids === undefined) {
      unbindDatum(this.globalDatum);
    } else {
      ids.forEach(id => unbindDatum(this.data.get(id)));
    }
  }

  unload(ids: any[] | undefined) {
    this.addDelta(ids, -1);
    this.update(ids);
    this.clean(ids);
  }

  update(ids: any[] | undefined) {
    const updateDatum = datum =>
      datum?.subscriptions.forEach(fn => fn(datum.count > 0));
    if (ids) {
      ids.forEach(id => updateDatum(this.data.get(id)));
    }
    // Any update requires global datum to be also updated.
    updateDatum(this.globalDatum);
  }
}

export const loaderRegistry = new LoaderRegistry();

export const useLoader = (ids?: any[]) => {
  const targetIds = useMemo(() => (ids?.length === 0 ? [Symbol()] : ids), [
    ids
  ]);
  const deps = [targetIds?.length ?? 0, ...(targetIds ?? [])];
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loaderRegistry.bind(targetIds, setIsLoading);
    return () => {
      loaderRegistry.unbind(targetIds, setIsLoading);
    };
  }, [setIsLoading, ...deps]);
  const load = useCallback(async <T extends unknown>(promise: Promise<T>) => {
    try {
      loaderRegistry.load(targetIds);
      const r = await promise;
      loaderRegistry.unload(targetIds);
      return r;
    } catch (e) {
      loaderRegistry.unload(targetIds);
      throw e;
    }
  }, deps);
  return [isLoading, load] as const;
};
