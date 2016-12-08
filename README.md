# Paginator

[![Build Status](https://travis-ci.org/SSENSE/restify-request-validator.svg?branch=master)](https://travis-ci.org/SSENSE/restify-request-validator)
[![Coverage Status](https://coveralls.io/repos/github/SSENSE/restify-request-validator/badge.svg?branch=master)](https://coveralls.io/github/SSENSE/restify-request-validator?branch=master)
[![Latest Stable Version](https://img.shields.io/npm/v/@ssense/restify-request-validator.svg)](https://www.npmjs.com/package/@ssense/restify-request-validator)
[![Known Vulnerabilities](https://snyk.io/test/npm/@ssense/restify-request-validator/badge.svg)](https://snyk.io/test/npm/@ssense/restify-request-validator)

### Usage

```
import { Paginator } from 'paginator';

const items = ['item1', 'item2', 'item3']; // from your DB returned collection...
const perPage = 1;
const currentPage = 2;
const paginator: Paginator = new Paginator(items, items.length, perPage, currentPage);
paginator.appends({
    foo: 'bar'
});
paginator.fragment('content');

const paginated = paginator.transform();

console.log(paginated);
/*
output
{ total: 3,
  per_page: 1,
  current_page: 2,
  last_page: 3,
  from: 2,
  to: 4,
  links:{
    previous: '/?page=1&foo=bar#content',
    current: '/?page=2&foo=bar#content',
    next: '/?page=3&foo=bar#content'
  },
  data: [ 'item1', 'item2', 'item3' ]
}
 */
```

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
