# Paginator
Paginator library in NodeJS to facilitate REST pagination

[![Build Status](https://travis-ci.org/SSENSE/node-paginator.svg?branch=master)](https://travis-ci.org/SSENSE/node-paginator)
[![Coverage Status](https://coveralls.io/repos/github/SSENSE/node-paginator/badge.svg?branch=master)](https://coveralls.io/github/SSENSE/node-paginator?branch=master)
[![Latest Stable Version](https://img.shields.io/npm/v/@ssense/node-paginator.svg)](https://www.npmjs.com/package/@ssense/node-paginator)
[![Known Vulnerabilities](https://snyk.io/test/npm/@ssense/node-paginator/badge.svg)](https://snyk.io/test/npm/@ssense/node-paginator)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Tips and tricks](#tips-and-tricks)
    - [Append queries string to URL](#append-queries-string-to-url)
    - [Add fragment to URL](#add-fragment-to-url)
- [Licence](#licence)


### Installation

    $ npm install --save  @ssense/node-paginator

### Usage

    import { Paginator } from '@ssense/node-paginator';
    
    const items = ['item1', 'item2', 'item3']; // from your DB returned collection...
    const perPage = 1;
    const currentPage = 2;
    const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);
    
    // Transform paginator to object, use this as rour REST response
    const paginated = paginator.transform();
    
    console.log(paginated);
    /*
    output
    {
        total: 3,
        per_page: 1,
        current_page: 2,
        last_page: 3,
        from: 2,
        to: 4,
        links:{
            previous: '/?page=1&foo=bar#foobar',
            current: '/?page=2&foo=bar#foobar',
            next: '/?page=3&foo=bar#foobar'
        },
        data: [ 'item1', 'item2', 'item3' ]
    }
    */


### Tips and tricks
#### Append queries string to URL
    // Append one query string to URL
    paginator.append('key', 'value');
    
    // Appends multiple queries to URL
    paginator.appends({
        foo: 'bar'
    });

#### Add fragment to URL 
    // Add foobar fragment to URL
    paginator.fragment('foobar');

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
