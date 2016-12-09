# Paginator

[![Build Status](https://travis-ci.org/SSENSE/node-paginator.svg?branch=master)](https://travis-ci.org/SSENSE/node-paginator)

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
