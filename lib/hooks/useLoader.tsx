import {
  useCallback,
  useEffect,
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

  addDelta(ids: any[], delta: 1 | -1) {
    const targetIds = ids.length < 1 ? Array.from(this.data.keys()) : ids;
    for (const id of targetIds) {
      const datum = this.ensureDatum(id);
      datum.count += delta;
      this.update(datum);
    }
    this.globalDatum.count += delta * targetIds.length;
    this.update(this.globalDatum);
  }

  bind(ids: any, fn: Dispatch<SetStateAction<boolean>>) {
    if (ids.length < 1) {
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

  ensureDatum(id: any) {
    const datum = this.data.get(id);
    if (!datum) {
      throw new Error('Unable to find loader');
    }
    return datum;
  }

  load(ids: any[]) {
    this.addDelta(ids, 1);
  }

  unbind(ids: any, fn: Dispatch<SetStateAction<boolean>>) {
    const filterDatum = datum =>
      (datum.subscriptions = datum.subscriptions.filter(v => v !== fn));
    if (ids.length < 1) {
      filterDatum(this.globalDatum);
    } else {
      ids.forEach(id => {
        const datum = this.ensureDatum(id);
        filterDatum(datum);
        if (datum.subscriptions.length < 1) {
          this.data.delete(id);
        }
      });
    }
  }

  unload(ids: any[]) {
    this.addDelta(ids, -1);
  }

  update(datum: RegistryDatum) {
    datum.subscriptions.forEach(fn => fn(datum.count > 0));
  }
}

const registry = new Registry();

export const useLoader = (...ids: any[]) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    registry.bind(ids, setIsLoading);
    return () => {
      registry.unbind(ids, setIsLoading);
    };
  }, [ids]);
  const load = useCallback(
    async <T extends unknown>(promise: Promise<T>) => {
      try {
        registry.load(ids);
        const r = await promise;
        registry.unload(ids);
        return r;
      } catch (e) {
        registry.unload(ids);
        throw e;
      }
    },
    [ids]
  );
  return [isLoading, load] as const;
};
