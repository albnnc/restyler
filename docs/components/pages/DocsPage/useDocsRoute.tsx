import { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { groups } from './groups';

interface DocsRouteMatch {
  group: string;
  item?: string;
}

export const useDocsRoute = () => {
  const match = useRouteMatch<DocsRouteMatch>('/docs/:group/:item?');
  const { group, item } = useMemo(
    () => match?.params ?? ({} as DocsRouteMatch),
    [match]
  );
  const title = useMemo(
    () =>
      groups
        ?.find(v => v.path === `/docs/${group}`)
        ?.items?.find(v => v.path === `/docs/${group}/${item}`)?.title,
    [group, item]
  );
  return { group, item, title };
};
