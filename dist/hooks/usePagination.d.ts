import { PaginationResult } from '../interfaces/const';
declare const usePagination: <T>(data: T[], itemsPerPage: number) => PaginationResult<T>;
export default usePagination;
