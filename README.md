# long-ts

[![npm](https://img.shields.io/npm/v/long-ts)](https://www.npmjs.com/package/long-ts)

An alternative to [long.js](https://github.com/dcodeIO/long.js) with support for ESM, CJS, UMD and [Modern Mode](https://github.com/developit/microbundle#modern). It's written in TypeScript and thus houses it's own type declarations.

long-ts and long.js differences:

- Removed `Long.isLong()` in favor of using `instanceof`.
- Removed all aliased shorthand methods like `eq` and `shr` and more.
- Using named export `import { Long } from 'long-ts'` instead of `const Long = require('long.js')`

## Installation

```
npm install long-ts
```

## Usage

```ts
import { Long } from "long-ts";

const longVal = new Long(0xffffffff, 0x7fffffff);

console.log(longVal.toString());
```

## Documentation

https://hornta.github.io/long-ts/modules.html

## Building

`npm run build` will also build the documentation in `/docs`

```
npm install
npm run build
```

Running tests:

```
npm run test
```

Running linter:

```
npm run lint
```
