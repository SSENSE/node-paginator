import * as querystring from 'querystring';
import {PaginatorMeta} from './PaginatorMeta';

export type PaginatorInterface = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number; // tslint:disable-line no-reserved-keywords
    to: number;
    links: PaginatorLinksInterface;
    data: any[];
}

export type PaginatorLinksInterface = {
    previous: string;
    current: string;
    next: string;
}

export type PaginatorOptions = {
    /**
     * The base path to assign to all URLs.
     *
     * @var string
     */
    path?: string;

    /**
     * The query parameters to add to all URLs.
     *
     * @var object
     */
    query?: {};

    /**
     * The URL fragment to add to all URLs.
     *
     * @var string|null
     */
    fragment?: string;

    /**
     * The query string variable used to store the page.
     *
     * @var string
     */
    pageName?: string;
}

export class Paginator extends PaginatorMeta {
    /**
     * All of the items being paginated.
     *
     * @var object[]
     */
    protected _items: any[]; // tslint:disable-line variable-name

    /**
     * Paginator options
     *
     * @var PaginatorOptions
     */
    protected _options: PaginatorOptions; // tslint:disable-line variable-name

    /**
     * Default Paginator options
     *
     * @var PaginatorOptions
     */
    protected _defaultOptions = <PaginatorOptions> { // tslint:disable-line variable-name
        path: '/',
        query: {},
        fragment: null,
        pageName: 'page'
    };

    /**
     * The query string variable used to store the page.
     *
     * @var string
     */
    protected _pageName: string = 'page'; // tslint:disable-line variable-name

    /**
     * Create a new paginator instance.
     *
     * @param items
     * @param total
     * @param perPage
     * @param currentPage
     * @param options
     */
    constructor(items: any[], total: number, perPage: number, currentPage: number, options?: PaginatorOptions) {
        super(total, perPage, currentPage);
        this._items = items;
        this._options = options || this._defaultOptions;

        this.setPageName(this._options.pageName || 'page');
    }

    /**
     * Add a query string key value to the paginator. alias of addQuery
     *
     * @param key
     * @param value
     * @returns {Paginator}
     */
    public append(key: string , value: any = null): Paginator {
        return <Paginator> this.addQuery(key, value);
    }

    /**
     * Add a set of queries string values to the paginator.
     *
     * @param queries
     * @returns {Paginator}
     */
    public appends(queries: Object): Paginator {
        Object.keys(queries).forEach((key: string) => {
            this.addQuery(key, queries[key]);
        });
        return <Paginator> this;
    }

    /**
     * Add a query string value to the paginator.
     *
     * @param key
     * @param value
     * @returns {Paginator}
     */
    public addQuery(key: string, value: any = null): Paginator {
        if (key !== this._pageName) {
            // @TODO typescript spread operator ?
            this._options.query = Object.assign({}, this._options.query, {[key]: value});
        }
        return <Paginator> this;
    }

    /**
     * Get / set the URL fragment to be appended to URLs.
     *
     * @param  string|null fragment
     * @return {Paginator}|{string}|null
     */
    public fragment(fragment: string = null): Paginator|string {
        if (fragment === null) {
            return this._options.fragment;
        }

        this._options.fragment = fragment;
        return <Paginator> this;
    }

    /**
     * Build the full fragment portion of a URL.
     *
     * @returns {string}
     */
    protected buildFragment(): string {
        return this._options.fragment ? `#${this._options.fragment}` : '';
    }

    /**
     * Get the slice of items being paginated.
     *
     * @returns {any[]}
     */
    public items(): any[] {
        return this._items;
    }

    /**
     * Get the URL for a given page number.
     *
     * @param page
     * @returns {string}
     */
    public url(page?: number): string {
        page = (page <= 0) ? 1 : page;

        let parameters = {
            [this._pageName]: page
        };

        if (this._options.query) {
            parameters = Object.assign({}, parameters, this._options.query);
        }

        let url = this._options.path;
        url += (this._options.path.indexOf('?') >= 0) ? '&' : '?';
        url += querystring.stringify(parameters);
        url += this.buildFragment();

        return url;
    }

    /**
     * Get the URL for the previous page.
     *
     * @returns {string}
     */
    public previousPageUrl(): string {
        if (this.currentPage() > 1) {
            return this.url(this.currentPage() - 1);
        }
    }

    /**
     * Get the URL for the next page.
     *
     * @returns {string}
     */
    public nextPageUrl(): string {
        if (this.lastPage() > this.currentPage()) {
            return this.url(this.currentPage() + 1);
        }
    }

    /**
     * Get the query string variable used to store the page.
     *
     * @returns {string}
     */
    public getPageName(): string {
        return this._pageName;
    }

    /**
     * Set the query string variable used to store the page.
     *
     * @param name
     * @returns {Paginator}
     */
    public setPageName(name: string): Paginator {
        this._pageName = name;
        return <Paginator> this;
    }

    /**
     * Get the instance as an object.
     *
     * @returns {PaginatorInterface}
     */
    public transform(): PaginatorInterface {
        return <PaginatorInterface> {
            total: this.total(),
            per_page: this.perPage(),
            current_page: this.currentPage(),
            last_page: this.lastPage(),
            from: this.firstItem(),
            to: this.lastItem(),
            links: <PaginatorLinksInterface> {
                previous: this.previousPageUrl(),
                current: this.url(this.currentPage()),
                next: this.nextPageUrl()
            },
            data: this.items()
        };
    }
}
