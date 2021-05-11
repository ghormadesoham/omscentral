import qs from 'query-string';
import { useLocation } from 'react-router';

const useQueryParams = <TParams>(): Partial<TParams> =>
  qs.parse(useLocation().search) as any as Partial<TParams>;

export default useQueryParams;
