export declare type MetaPaginatorInterface = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
};
export declare class PaginatorMeta {
    protected _hasMore: boolean;
    protected _total: number;
    protected _lastPage: number;
    protected _perPage: number;
    protected _currentPage: number;
    constructor(total: number, perPage: number, currentPage: number);
    total(): number;
    lastPage(): number;
    firstItem(): number | void;
    lastItem(): number;
    perPage(): number;
    isEmpty(): boolean;
    onFirstPage(): boolean;
    currentPage(): number;
    hasPages(): boolean;
    hasMorePages(): boolean;
    count(): number;
    protected setCurrentPage(currentPage: number): number;
    protected isValidPageNumber(page: number): boolean;
    transform(): MetaPaginatorInterface;
}
