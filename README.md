# Create React App Tech Stack

version: v0.3 - architecture + redux toolkit

## settings

- langguage: typescript
- framework: CRA, Create React App with typescript template
- editor: vscode
- formatter: eslint & prettier
- state manager: redux + redux-thunk
- data normalizer: normalizr
- api test server: json-server

(이하 예정)

- redux saga
- design manager: storybook
- testing library: jest
- github actions

## libraries

- craco
- immer
- concurrently
- emotion
- react-router-dom v6
- react-helmet-async

## vscode extensions

- Eslint
- Prettier - Code formatter
- vscode-styled-components

## typescript

## craco

```sh
npm i @craco/craco
```

to run start you need to make `craco.config.js` file first

## emotion (with craco)

```bash
npm i /
  @emotion/react  /
  @emotion/styled /
  @emotion/babel-preset-css-prop
```

```powershell
npm i `
  @emotion/react  `
  @emotion/styled `
  @emotion/babel-preset-css-prop
```

## eslint & prettier

```bash
npm i -D  /
  eslint  /
  eslint-config-airbnb  /
  eslint-config-prettier  /
  eslint-import-resolver-typescript /
  eslint-plugin-prettier /
  prettier
```

```powershell
npm i -D  `
  @typescript-eslint/parser `
  @typescript-eslint/eslint-plugin  `
  eslint  `
  eslint-config-airbnb  `
  eslint-config-prettier  `
  eslint-import-resolver-typescript `
  eslint-plugin-prettier  `
  prettier
```

## redux-saga with typesafe-actions

```bash
npm i redux-saga  /
  typesafe-actions  /
  immer /
  concurrently
npm i json-server -g
```

```powershell
npm i redux-saga  `
  typesafe-actions  `
  immer `
  concurrently
npm i json-server -g
```

effect creator 등 redux-saga의 api는 `@redux/README.md` 참고.

redux-saga에서 redux state 종속성과 리렌더링에 따른 커스텀 훅에서의 action 중복 실행 이슈를 해결하는게 `redux-thunk`보다 까다롭다.
물론 커스텀 훅에서 user의 fetchStatus를 가지고 분기처리하는 쉬운 방법이 있지만, 이를 redux-saga에서 해결하는 것이 좋긴 하다.
