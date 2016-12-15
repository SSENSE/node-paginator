import {expect} from 'chai';
import {PaginatorMeta} from '../../ts/PaginatorMeta';

describe('PaginatorMeta', () => {
    it('Can give me relevant page information', () => {
        const itemCount = 3;
        const perPage = 1;
        const currentPage = 2;
        const paginator: PaginatorMeta = new PaginatorMeta(itemCount, perPage, currentPage);

        expect(paginator.currentPage()).to.eq(2);
        expect(paginator.lastPage()).to.eq(3);
        expect(paginator.hasPages()).to.eq(true);
        expect(paginator.hasMorePages()).to.eq(true);

    });

    it('Can give correct firstItem/lastItem', () => {
        const itemCount = 7;
        const perPage = 2;
        const currentPage = 2;
        const paginator: PaginatorMeta = new PaginatorMeta(itemCount, perPage, currentPage);

        expect(paginator.firstItem()).to.eq(2);
        expect(paginator.lastItem()).to.eq(3);

    });

    it('Can determinate if there are any page to show', () => {
        const itemCount = 4;
        const perPage = 3;
        const currentPage = 1;
        const paginator: PaginatorMeta = new PaginatorMeta(itemCount, perPage, currentPage);

        expect(paginator.hasPages()).to.eq(true);
    });

    it('Can determinate if is empty', () => {
        const itemCount = 0;
        const perPage = 3;
        const currentPage = 1;
        const paginator: PaginatorMeta = new PaginatorMeta(itemCount, perPage, currentPage);

        expect(paginator.isEmpty()).to.eq(true);
    });

    it('Can determinate if we are on first page', () => {
        const itemCount = 4;
        const perPage = 3;
        const currentPage = 1;
        const paginator: PaginatorMeta = new PaginatorMeta(itemCount, perPage, currentPage);

        expect(paginator.onFirstPage()).to.eq(true);
        expect(paginator.count()).to.eq(itemCount);
    });

    it('Get first and last item null if no items', () => {
        const itemCount = 0;
        const perPage = 1;
        const currentPage = 2;
        const paginator: PaginatorMeta = new PaginatorMeta(itemCount, perPage, currentPage);

        expect(paginator.firstItem()).to.be.an('undefined');
        expect(paginator.lastItem()).to.be.an('undefined');
    });

    it('Get tranform paginator to object', () => {
        const itemCount = 4;
        const perPage = 3;
        const currentPage = 1;
        const paginator: PaginatorMeta = new PaginatorMeta(itemCount, perPage, currentPage);
        const response = paginator.transform();

        expect(response).to.be.instanceOf(Object);
        expect(response).to.hasOwnProperty('per_page');
        expect(response).to.hasOwnProperty('current_page');
        expect(response).to.hasOwnProperty('last_page');
        expect(response).to.hasOwnProperty('from');
        expect(response).to.hasOwnProperty('to');
    });
});
