# long-ts

An alternative to [https://github.com/dcodeIO/long.js](long.js) with support for ESM, CJS, UMD and [https://github.com/developit/microbundle#modern](Modern Mode). It's written in TypeScript and thus houses it's own type declarations. The only notable differences between long-ts and long.js are the removal of `Long.isLong()` in favor of using `instanceof`. All aliased shorthand methods are also removed.

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

...
