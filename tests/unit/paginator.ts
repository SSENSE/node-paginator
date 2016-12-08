/* tslint:disable no-http-string */
import {expect} from 'chai';
import {Paginator, PaginatorOptions} from '../../ts/Paginator';

describe('Paginator', () => {

    it('Get page name', () => {
        const paginator: Paginator = new Paginator(['item1', 'item2', 'item3'], 3, 2, 1);
        expect(paginator.getPageName()).to.eq('page');
        paginator.setPageName('p');
        expect(paginator.getPageName()).to.eq('p');
    });

    it('Can give me relevant page information', () => {
        const items = ['item1', 'item2', 'item3'];
        const perPage = 1;
        const currentPage = 2;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);

        expect(paginator.currentPage()).to.eq(2);
        expect(paginator.lastPage()).to.eq(3);
        expect(paginator.hasPages()).to.eq(true);
        expect(paginator.hasMorePages()).to.eq(true);
        expect(JSON.stringify(paginator.items())).to.eq(JSON.stringify(items));

    });

    it('Can generate URLs', () => {
        const items = ['item1', 'item2', 'item3', 'item4'];
        const perPage = 1;
        const currentPage = 2;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage, <PaginatorOptions> {
            path: 'http://example.com/',
            pageName: 'foo'
        });

        expect(paginator.url(paginator.currentPage())).to.eq('http://example.com/?foo=2');
        expect(paginator.url(paginator.currentPage() - 1)).to.eq('http://example.com/?foo=1');
        expect(paginator.url(paginator.currentPage() - 2)).to.eq('http://example.com/?foo=1');
        expect(paginator.previousPageUrl()).to.eq('http://example.com/?foo=1');
        expect(paginator.nextPageUrl()).to.eq('http://example.com/?foo=3');
    });

    it('Can determinate if there are any page to show', () => {
        const items = ['item1', 'item2', 'item3', 'item4'];
        const perPage = 3;
        const currentPage = 1;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage, <PaginatorOptions> {
            path: 'http://example.com/',
            pageName: 'foo'
        });

        expect(paginator.hasPages()).to.eq(true);
    });

    it('Can determinate if is empty', () => {
        const items = [];
        const perPage = 3;
        const currentPage = 1;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);

        expect(paginator.isEmpty()).to.eq(true);
    });

    it('Can determinate if we are on first page', () => {
        const items = ['item1', 'item2', 'item3', 'item4'];
        const perPage = 3;
        const currentPage = 1;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);

        expect(paginator.onFirstPage()).to.eq(true);
        expect(paginator.count()).to.eq(items.length);
    });

    it('Can determinate if query and hash appends to urls', () => {
        const items = ['item1', 'item2', 'item3', 'item4'];
        const perPage = 1;
        const currentPage = 2;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);
        paginator.append('foo', 'bar');
        paginator.appends({
            foo_1: 'bar-1',
            foo_2: 'bar-2'
        });
        paginator.addQuery('foo_3', 'bar-3');
        paginator.fragment('foo');
        const response = paginator.transform();

        expect(response.links.previous).to.contains('foo=bar&foo_1=bar-1&foo_2=bar-2&foo_3=bar-3');
        expect(response.links.current).to.contains('foo=bar&foo_1=bar-1&foo_2=bar-2&foo_3=bar-3');
        expect(response.links.next).to.contains('foo=bar&foo_1=bar-1&foo_2=bar-2&foo_3=bar-3');
        expect(response.links.next).to.contains('#foo');
    });

    it('Should not contain null gragment', () => {
        const items = ['item1', 'item2', 'item3', 'item4'];
        const perPage = 1;
        const currentPage = 2;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);
        paginator.fragment();
        const response = paginator.transform();
        expect(response.links.current).not.contains('#');
    });

    it('Get first and last item null if no items', () => {
        const items = [];
        const perPage = 1;
        const currentPage = 2;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);

        expect(paginator.firstItem()).to.be.an('undefined');
        expect(paginator.lastItem()).to.be.an('undefined');
    });

    it('Get tranform paginator to object', () => {
        const items = ['item1', 'item2', 'item3', 'item4'];
        const perPage = 3;
        const currentPage = 1;
        const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);
        const response = paginator.transform();

        expect(response).to.be.instanceOf(Object);
        expect(response).to.hasOwnProperty('per_page');
        expect(response).to.hasOwnProperty('current_page');
        expect(response).to.hasOwnProperty('last_page');
        expect(response).to.hasOwnProperty('from');
        expect(response).to.hasOwnProperty('to');
        expect(response).to.hasOwnProperty('links');
        expect(response.links).to.hasOwnProperty('next');
        expect(response.links).to.hasOwnProperty('previous');
        expect(response.links).to.hasOwnProperty('current');
        expect(response).to.hasOwnProperty('data');
    });
});
