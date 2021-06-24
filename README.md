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

## redux-thunk with typesafe-actions

```bash
npm i redux-thunk  /
  typesafe-actions  /
  immer /
  concurrently
npm i json-server -g
```

```powershell
npm i redux-thunk  `
  typesafe-actions  `
  immer `
  concurrently
npm i json-server -g
```

`redux-thunk`는 비동기 상태 변경을 구조적으로 관리하기 위한 도구이다. 동기적으로 동작하는 작업과 달리 비동기적으로 동작하는 작업은 작업 상황에 따라 다른 상태를 부여해주는 것이 좋다. 만약 어떤 UI를 서버에 요청을 했는데 서버가 요청을 늦게 준다면, 그동안 우리는 어떤 UI를 사용자들에게 보여줘야 할까? 만약 서버 요청이 실패한다면?

이를 해결하려면 각 상황에 맞는 정보를 상태값으로 저장해야 한다. 물론 이를 컴포넌트 단에서 자체적으로 해결하거나 굳이 `redux-thunk`를 쓰지 않고 `redux`만으로도 구축할 수 있다. 하지만 그렇게 되면 코드가 길어지고 코드 구조도 복잡하고 통일성이 떨어지면서 가독성이 낮아진다. 따라서 이러한 이슈를 손쉽게 해결해주는 `redux-thunk`를 사용하면 좋다. 여기서 `thunk`는 **해당 비동기 작업과 관련된 action들이 포함된 코드 블럭**이라고 이해하면 편하다. 이러한 thunk의 action에는 `request`, `success`, `failure`, `cancel`로 나뉘는데 `cancel`을 제외하면 나머지 action들은 각각 Promise의 상태인 `pending`, `fulfilled`, `rejected`와 대응된다.

`thunk`는 본질적으로 코드 블럭이다. thunk를 dipatch하면 thunk 내부에 등록된 콜백이 실행된다. 콜백이 모두 실행되고 return값을 반환할 수 있다. 물론 thunk를 dispatch한 컴포넌트가 thunk에서 변경한 상태에 종속되어 있다면(변경된 state가 컴포넌트에 호출되어 있다면) return값 대신 해당 state를 참조하면 된다. 다만 store에 저장할 필요가 없으면서 컴포넌트에서는 필요한 값은 return으로 넘겨주어야 한다.

typescript를 쓰는 경우에는 `redux-actions` 대신 `typesafe-actions`를 사용한다. `typesafe-actions`의 api를 이용하면 typesafe할 뿐만 아니라 thunk와 reducer마다 따로 type을 명시해줄 필요가 없다.

`typesafe-actions`와 `redux-logger`의 호환이 맞지 않는지 콘솔 로그가 이상하게 나온다. 따라서 더 이상 디버깅 시에 `redux-logger`를 사용하지 않고 `redux-devtools-extension`만 사용한다.
