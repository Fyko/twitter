# @fyko/twitter
[![GitHub](https://img.shields.io/github/license/fyko/twitter)](https://github.com/fyko/twitter/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/@fyko/twitter?color=crimson&logo=npm)](https://www.npmjs.com/package/@fyko/twitter)
> a modern twitter api wrapper

## Installation
Install with [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com) / [pnpm](https://pnpm.js.org/)
### Stable:
```sh
npm install @fyko/twitter
yarn add @fyko/twitter
pnpm add @fyko/twitter
```
### Development
```sh
npm install Fyko/twitter#build
yarn add Fyko/twitter#build
pnpm add Fyko/twitter#build
```

## Usage
```ts
import { Client } from '@fyko/twitter';

const client = new Client({
  api_key: '',
  api_secret_key: '',
  access_token: '',
  access_token_secret: '',
});

const res = await client.get<any>("/account/settings");
console.dir(res);
```
