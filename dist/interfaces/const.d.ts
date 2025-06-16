export interface HasId {
    id: number;
}
export interface UseArrayReturn<T> {
    value: T[];
    add: (item: T) => void;
    clear: () => void;
    removeById: (id: number) => void;
    removeIndex: (index: number) => void;
    replaceAtIndex: (index: number, newItem: T) => void;
    replaceById: (id: number, newItem: T) => void;
    shuffle: () => void;
    ascendingSort: () => void;
    descendingSort: () => void;
}
export type FieldsState = Record<string, unknown>;
export interface OptionsUseOver {
    delay?: number;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}
export interface MediaQueryParams {
    query?: number;
    min?: number;
    max?: number;
}
export interface PaginationResult<T> {
    currentPage: number;
    totalPages: number;
    goToPage: (pageNumber: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
    paginatedData: T[];
}
export interface UsePreviousValuesOptions {
    value: any;
    maxValues?: number;
    unique?: boolean;
}
export interface UsePreviousValuesResult {
    previousValue: any[];
    storedValue: any[];
}
export type OrderType = 'asc' | 'desc' | boolean;
export interface StorageItem<T> {
    value: T;
    timestamp?: number;
}
export type StorageType = "localStorage" | "sessionStorage";
export type OptionalLocalStorageKey = string | '';
export type InitialValueType<T> = T | (() => T);
export interface GenerateUUIDOptions {
    prefix?: string;
    length?: number;
    specialChars?: boolean;
    excludeChars?: string;
}
export interface ScrollPosition {
    x: number;
    y: number;
    percentageX: number;
    percentageY: number;
}
export interface UseStepOptions {
    initialStep?: number;
    minStep?: number;
    maxStep: number;
    onStepChange?: (step: number) => void;
}
