# Create React App Tech Stack

version: minimal-settings

## settings

- langguage: typescript
- framework: CRA, Create React App with typescript template
- editor: vscode
- formatter: eslint & prettier
- state manager: redux

## libraries

- craco
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

## redux

```powershell
npm i `
  redux  `
  react-redux `
  redux-logger
npm i -D redux-devtools
```
