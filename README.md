# Express.js Parse Query To Sequelize.js

[Express.js](https://expressjs.com) middleware used to parse http query to [Sequelize.js](https://sequelize.org).

[![npm package](https://img.shields.io/badge/npm%20i-example--typescript--package-brightgreen)](https://www.npmjs.com/package/express-parse-query-sequelize) [![version number](https://img.shields.io/npm/v/express-parse-query-sequelize?color=green&label=version)](https://github.com/wesleysmitthe/express-parse-query-sequelize/releases) [![Actions Status](https://github.com/wesleysmitthe/express-parse-query-sequelize/workflows/Test/badge.svg)](https://github.com/wesleysmitthe/express-parse-query-sequelize/actions) [![License](https://img.shields.io/github/license/tomchen/express-parse-query-sequelize)](https://github.com/wesleysmitthe/express-parse-query-sequelize/blob/main/LICENSE)

It uses npm, TypeScript compiler, Jest, ESLint, Prettier, husky, pinst, commitlint. The production files include ES Modules and TypeScript declaration files.

<p align="center">
  <a href="https://github.com/" title="Github"><img src="https://github.com/get-icon/geticon/raw/master/icons/github-icon.svg" alt="Github" width="21px" height="21px"></a>
  <a href="https://code.visualstudio.com/" title="Visual Studio Code"><img src="https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg" alt="Visual Studio Code" width="21px" height="21px"></a>
  <a href="https://www.microsoft.com/windows" title="Windows"><img src="https://github.com/get-icon/geticon/raw/master/icons/microsoft-windows.svg" alt="Windows" width="21px" height="21px"></a>
  <a href="https://www.apple.com/macos/" title="Mac OS"><img src="https://github.com/get-icon/geticon/raw/master/icons/macOS.svg" alt="Mac OS" width="21px" height="21px"></a>
  <a href="https://www.linuxfoundation.org/" title="Linux"><img src="https://github.com/get-icon/geticon/raw/master/icons/linux-tux.svg" alt="Linux" width="21px" height="21px"></a>
  <a href="https://www.npmjs.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="npm" width="21px" height="21px"></a>
  <a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="21px" height="21px"></a>
  <a href="https://expressjs.com" title="express"><img src="https://github.com/get-icon/geticon/raw/master/icons/express.svg" alt="express" width="21px" height="21px"></a>
  <a href="https://jestjs.io/" title="Jest"><img src="https://github.com/get-icon/geticon/raw/master/icons/jest.svg" alt="Jest" width="21px" height="21px"></a>
  <a href="https://eslint.org/" title="ESLint"><img src="https://github.com/get-icon/geticon/raw/master/icons/eslint.svg" alt="ESLint" width="21px" height="21px"></a>
  <a href="https://prettier.io/" title="Prettier"><img src="https://github.com/get-icon/geticon/raw/master/icons/prettier.svg" alt="Prettier" width="21px" height="21px"></a>
</p>

## Installation

    npm install express-parse-query-sequelize

## Usage

> Where

```js
// Where name equals "john" and email equals "john@doe.com"
?eq=name:john,email:john@doe.com

// Where name is not equals "john"
?!eq=name:john

// Where id greater than "1"
?gt=id:1

// Where id less than "10"
?lt=id:10

// Where name like "%john%doe%"
?like=name:*john*doe*
```

> Sorting

```js
// Sort by id in ascending order
?sort_by=id:asc

// Sort by id in descending order
?sort_by=id:desc

// Sort by id in descending order and name in ascending order
?sort_by=id:desc,name:asc
```

> Grouping

```js
// Group by
?group_by=id,name
```

> Fields

```js
?fields=id,name,email
```

> include

```js
?include=
```

## Operators

```md
gt -----------> greater than
gte ----------> greater or equals than
lt -----------> less than
lte ----------> less than or equals
eq -----------> equals
!eq ----------> not equals
like ---------> like
!like --------> not like
between ------> between
!between -----> not between
in -----------> in
!in ----------> not in
```

## Development

### Install dependencies with npm:

```bash
npm i
```

**Note:** make necessary changes in **package.json** the version of the package.

### Test

Test your code with Jest framework:

```bash
npm run test
```

**Note:** this package uses [husky](https://typicode.github.io/husky/), [pinst](https://github.com/typicode/pinst) and [commitlint](https://commitlint.js.org/) to automatically execute test and [lint commit message](https://www.conventionalcommits.org/) before every commit.

### Build

Build production (distribution) files in your **dist** folder:

```bash
npm run build
```

It generates ES Modules (in **dist/** folder), as well as TypeScript declaration files (in **dist/types** folder).
