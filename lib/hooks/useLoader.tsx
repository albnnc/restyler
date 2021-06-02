import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction
} from 'react';

interface RegistryDatum {
  count: number;
  subscriptions: Dispatch<SetStateAction<boolean>>[];
}

class Registry {
  data = new Map<any, RegistryDatum>();
  globalDatum: RegistryDatum = {
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
    const filterDatum = datum =>
      (datum.subscriptions = datum.subscriptions.filter(v => v !== fn));
    if (ids === undefined) {
      filterDatum(this.globalDatum);
    } else {
      ids.forEach(id => {
        const datum = this.data.get(id);
        if (!datum) {
          return;
        }
        filterDatum(datum);
        if (datum.subscriptions.length < 1) {
          this.data.delete(id);
        }
      });
    }
  }

  unload(ids: any[] | undefined) {
    this.addDelta(ids, -1);
  }

  update(datum: RegistryDatum) {
    datum.subscriptions.forEach(fn => fn(datum.count > 0));
  }
}

const registry = new Registry();

export const useLoader = (ids?: any[]) => {
  const targetIds = useMemo(() => (ids?.length === 0 ? [Symbol()] : ids), [
    ids
  ]);
  const deps = [targetIds?.length ?? 0, ...(targetIds ?? [])];
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    registry.bind(targetIds, setIsLoading);
    return () => {
      registry.unbind(targetIds, setIsLoading);
    };
  }, deps);
  const load = useCallback(async <T extends unknown>(promise: Promise<T>) => {
    try {
      registry.load(targetIds);
      const r = await promise;
      registry.unload(targetIds);
      return r;
    } catch (e) {
      registry.unload(targetIds);
      throw e;
    }
  }, deps);
  return [isLoading, load] as const;
};
