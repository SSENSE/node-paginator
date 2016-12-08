"use strict";
const querystring = require("querystring");
class Paginator {
    constructor(items, total, perPage, currentPage, options) {
        this._defaultOptions = {
            path: '/',
            query: {},
            fragment: null,
            pageName: 'page'
        };
        this._pageName = 'page';
        this._items = items;
        this._total = total;
        this._perPage = perPage;
        this._lastPage = Math.ceil(total / perPage);
        this._currentPage = this.setCurrentPage(currentPage);
        this._options = options || this._defaultOptions;
        this.setPageName(this._options.pageName || 'page');
    }
    append(key, value = null) {
        return this.addQuery(key, value);
    }
    appends(queries) {
        Object.keys(queries).forEach((key) => {
            this.addQuery(key, queries[key]);
        });
        return this;
    }
    addQuery(key, value = null) {
        if (key !== this._pageName) {
            this._options.query = Object.assign({}, this._options.query, { [key]: value });
        }
        return this;
    }
    fragment(fragment = null) {
        if (fragment === null) {
            return this._options.fragment;
        }
        this._options.fragment = fragment;
        return this;
    }
    buildFragment() {
        return this._options.fragment ? `#${this._options.fragment}` : '';
    }
    items() {
        return this._items;
    }
    total() {
        return this._total;
    }
    lastPage() {
        return this._lastPage;
    }
    firstItem() {
        if (this._items.length === 0) {
            return;
        }
        return (this._currentPage - 1) * this._perPage + 1;
    }
    lastItem() {
        if (this._items.length === 0) {
            return;
        }
        return this.firstItem() + this.count() - 1;
    }
    perPage() {
        return this._perPage;
    }
    onFirstPage() {
        return this.currentPage() <= 1;
    }
    currentPage() {
        return this._currentPage;
    }
    hasPages() {
        return !(this.currentPage() === 0 && !this.hasMorePages());
    }
    hasMorePages() {
        return this.currentPage() < this.lastPage();
    }
    isEmpty() {
        return this._items.length === 0;
    }
    count() {
        return this._items.length;
    }
    url(page) {
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
    previousPageUrl() {
        if (this.currentPage() > 1) {
            return this.url(this.currentPage() - 1);
        }
    }
    nextPageUrl() {
        if (this.lastPage() > this.currentPage()) {
            return this.url(this.currentPage() + 1);
        }
    }
    setCurrentPage(currentPage) {
        currentPage = currentPage || 1;
        return this.isValidPageNumber(currentPage) ? currentPage : 1;
    }
    isValidPageNumber(page) {
        return page >= 1;
    }
    getPageName() {
        return this._pageName;
    }
    setPageName(name) {
        this._pageName = name;
        return this;
    }
    transform() {
        return {
            total: this.total(),
            per_page: this.perPage(),
            current_page: this.currentPage(),
            last_page: this.lastPage(),
            from: this.firstItem(),
            to: this.lastItem(),
            links: {
                previous: this.previousPageUrl(),
                current: this.url(this.currentPage()),
                next: this.nextPageUrl()
            },
            data: this.items()
        };
    }
}
exports.Paginator = Paginator;
//# sourceMappingURL=Paginator.js.map