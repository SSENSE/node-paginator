"use strict";
class PaginatorMeta {
    constructor(total, perPage, currentPage) {
        this._total = total;
        this._perPage = perPage;
        this._lastPage = Math.ceil(total / perPage);
        this._currentPage = this.setCurrentPage(currentPage);
    }
    total() {
        return this._total;
    }
    lastPage() {
        return this._lastPage;
    }
    firstItem() {
        const position = (this._currentPage - 1) * this._perPage + 1;
        if (position > this._total) {
            return;
        }
        return position;
    }
    lastItem() {
        const firstItemPosition = this.firstItem();
        if (firstItemPosition === undefined) {
            return;
        }
        return firstItemPosition + this.count() - 1;
    }
    perPage() {
        return this._perPage;
    }
    isEmpty() {
        return this._total === 0;
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
    count() {
        return this._total;
    }
    setCurrentPage(currentPage) {
        currentPage = currentPage || 1;
        return this.isValidPageNumber(currentPage) ? currentPage : 1;
    }
    isValidPageNumber(page) {
        return page >= 1;
    }
    transform() {
        return {
            total: this.total(),
            per_page: this.perPage(),
            current_page: this.currentPage(),
            last_page: this.lastPage(),
            from: this.firstItem(),
            to: this.lastItem()
        };
    }
}
exports.PaginatorMeta = PaginatorMeta;
//# sourceMappingURL=PaginatorMeta.js.map