import { PaginatorMeta } from './PaginatorMeta';
export declare type PaginatorInterface = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    links: PaginatorLinksInterface;
    data: any[];
};
export declare type PaginatorLinksInterface = {
    previous: string;
    current: string;
    next: string;
};
export declare type PaginatorOptions = {
    path?: string;
    query?: {};
    fragment?: string;
    pageName?: string;
};
export declare class Paginator extends PaginatorMeta {
    protected _items: any[];
    protected _options: PaginatorOptions;
    protected _defaultOptions: PaginatorOptions;
    protected _pageName: string;
    constructor(items: any[], total: number, perPage: number, currentPage: number, options?: PaginatorOptions);
    append(key: string, value?: any): Paginator;
    appends(queries: Object): Paginator;
    addQuery(key: string, value?: any): Paginator;
    fragment(fragment?: string): Paginator | string;
    protected buildFragment(): string;
    items(): any[];
    url(page?: number): string;
    previousPageUrl(): string;
    nextPageUrl(): string;
    getPageName(): string;
    setPageName(name: string): Paginator;
    transform(): PaginatorInterface;
}
