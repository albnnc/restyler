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
      const datum = this.data.get(id);
      if (!datum) {
        continue;
      }
      datum.count += delta;
      this.update(datum);
    }
    this.globalDatum.count += delta * targetIds.length;
    this.update(this.globalDatum);
  }

  bind(ids: any[] | undefined, fn: Dispatch<SetStateAction<boolean>>) {
    if (ids === undefined) {
      this.globalDatum.subscriptions.push(fn);
    } else {
      ids.forEach(id => {
        const datum = this.data.get(id);
        if (datum) {
          datum.subscriptions.push(fn);
          this.update(datum);
        } else {
          this.data.set(id, { count: 0, subscriptions: [fn] });
        }
      });
    }
  }

  load(ids: any[] | undefined) {
    this.addDelta(ids, 1);
  }

  unbind(ids: any[] | undefined, fn: Dispatch<SetStateAction<boolean>>) {
    const unbindDatum = datum =>
      (datum.subscriptions = datum.subscriptions.filter(v => v !== fn));
    if (ids === undefined) {
      unbindDatum(this.globalDatum);
    } else {
      ids.forEach(id => {
        const datum = this.data.get(id);
        if (!datum) {
          return;
        }
        unbindDatum(datum);
        if (datum.subscriptions.length < 1) {
          this.data.delete(id);
        }
      });
    }
  }

  unload(ids: any[] | undefined) {
    this.addDelta(ids, -1);
  }

  update(datum: LoaderRegistryDatum) {
    datum.subscriptions.forEach(fn => fn(datum.count > 0));
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
  }, deps);
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
