export type MetaPaginatorInterface = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number; // tslint:disable-line no-reserved-keywords
    to: number;
}

export class PaginatorMeta {

    /**
     * Determine if there are more items in the data source.
     */
    protected _hasMore: boolean; // tslint:disable-line variable-name

    /**
     * The total number of items before slicing.
     *
     * @var int
     */
    protected _total: number; // tslint:disable-line variable-name

    /**
     * The last available page.
     *
     * @var int
     */
    protected _lastPage: number; // tslint:disable-line variable-name

    /**
     * The number of items to be shown per page.
     *
     * @var int
     */
    protected _perPage: number; // tslint:disable-line variable-name

    /**
     * The current page being "viewed".
     *
     * @var int
     */
    protected _currentPage: number; // tslint:disable-line variable-name

    /**
     * Create a new paginator instance.
     *
     * @param total
     * @param perPage
     * @param currentPage
     */
    constructor(total: number, perPage: number, currentPage: number) {
        this._total = total;
        this._perPage = perPage;
        this._lastPage = Math.ceil(total / perPage);
        this._currentPage = this.setCurrentPage(currentPage);
    }

    /**
     * Get the total number of items being paginated.
     * @returns {number}
     */
    public total(): number {
        return this._total;
    }

    /**
     * Get the last page.
     *
     * @returns {number}
     */
    public lastPage(): number {
        return this._lastPage;
    }

    /**
     * Get the position of the first item in the slice.
     *
     * @returns {number}
     */
    public firstItem(): number|void {
        const position = (this._currentPage - 1) * this._perPage;
        if (position >= this._total) {
            return;
        }
        return position;
    }

    /**
     * Get the position of the last item in the slice.
     *
     * @returns {number}
     */
    public lastItem(): number {
        const firstItemPosition = this.firstItem();
        if (firstItemPosition === undefined) {
            return;
        }
        return (<number> firstItemPosition) + this.perPage() - 1;
    }

    /**
     * Get the number of items shown per page.
     *
     * @returns {number}
     */
    public perPage(): number {
        return this._perPage;
    }

    /**
     * Determine if the list of items is empty or not.
     *
     * @returns {boolean}
     */
    public isEmpty(): boolean {
        return this._total === 0;
    }

    /**
     * Determine if the paginator is on the first page.
     *
     * @returns {boolean}
     */
    public onFirstPage(): boolean {
        return this.currentPage() <= 1;
    }

    /**
     * Get the current page.
     *
     * @returns {number}
     */
    public currentPage(): number {
        return this._currentPage;
    }

    /**
     * Determine if there are enough items to split into multiple pages.
     *
     * @returns {boolean}
     */
    public hasPages(): boolean {
        return ! (this.currentPage() === 0 && ! this.hasMorePages());
    }

    /**
     * Determine if there are more items in the data source.
     *
     * @returns {boolean}
     */
    public hasMorePages(): boolean {
        return this.currentPage() < this.lastPage();
    }

    /**
     * Get the number of items for the current page.
     *
     * @returns {number}
     */
    public count(): number {
        return this._total;
    }

    /**
     * Get the current page for the request.
     *
     * @param currentPage
     * @returns {number}
     */
    protected setCurrentPage(currentPage: number): number {
        currentPage = currentPage || 1;

        return this.isValidPageNumber(currentPage) ? currentPage : 1;
    }

    /**
     * Determine if the given value is a valid page number.
     *
     * @param page
     * @returns {boolean}
     */
    protected isValidPageNumber(page: number): boolean {
        return page >= 1;
    }

    /**
     * Get the instance as an object.
     *
     * @returns {MetaPaginatorInterface}
     */
    public transform(): MetaPaginatorInterface {
        return <MetaPaginatorInterface> {
            total: this.total(),
            per_page: this.perPage(),
            current_page: this.currentPage(),
            last_page: this.lastPage(),
            from: this.firstItem(),
            to: this.lastItem()
        };
    }
}
