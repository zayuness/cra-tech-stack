# redux-saga의 핵심 개념

## `redux-thunk`와 `redux-saga`와의 차이점

자바스크립트 런타임에서 `dispatch` 함수가 실행될 때, `reducer`가 실행되고 인자로 받은 `action`에 맞게 `state`를 변경한다. 여기서 리덕스 미들웨어는 `dispatch`와 `reducer` 사이의 `action` 전달을 중개한다.
예를 들어 표현식 `dispatch(action)`이 실행되면, 원래는 `reducer`에서 `action.type`에 맞는 state 변경 코드를 실행해야 한다. 그런데 중간에 미들웨어가 끼어 있으면 이 미들웨어가 (그럴 일은 없겠지만) 넘겨받은 `action`의 `action.type`을 임의로 수정하거나, `action.payload`를 추가하거나, 혹은 아예 `action`을 `reducer`에 넘기지 않을 수도 있다.

`redux-thunk`에서는, 임의의 thunk인 `anyThunk`를 생성해서 표현식 `disptach(anyThunk)`을 실행한다. 여기서 `anyThunk`는 `thunkAction`이라는 가상의 `action`으로 선언된다. `anyThunk`는 실제 `redux action`이 아니라 리덕스 미들웨어인 `thunkMiddleware`에서 `action`으로 취급한다. 이 `anyThunk`는 `action creator`와 달리 함수를 반환하는 고차 함수이다. 따라서 이런 특수한 `action`을 받으면 미들웨어는 이를 `reducer`로 넘기지 않고 `anyThunk`가 반환하는 함수를 실행시킨다. 해당 함수를 실행시킬 때, 미들웨어에서 `disptach`와 `getState`를 해당 함수의 인자로 넣어준다. 그리고 실행할 함수를 `async function`으로 선언하기에 non-blocking issue가 자동으로 해결되며, 함수 안에서 실제 `action`을 `dispatch`할 수 있어서 비동기 작업의 상태에 따라 다른 상태값을 redux에 반영할 수 있다.

`redux-saga`는 `saga`라고 부르는 `generator function`을 사용한다. `thunk`와 달리 `saga`는 가상의 `action`이 아니다. 따라서 `redux-thunk`처럼 `dispatch`로 의도한 코드를 실행하고 싶다면, 다시 말해 `dispatch`를 통해 어떤 `saga`의 로직을 실행하고 싶다면 미들웨어에 해당 `saga`와 `redux action`을 등록해야 한다(정확히는 등록의 개념이 아니지만, 그 내용이 매우 길기에 본문에서는 등록이라고 표현함.). 따라서 표현식 `dispatch(action)`을 실행하면 등록된 `saga`의 `generator`가 실행된다. 참고로 `redux-thunk`에서는 `dispatch`를 통해 전달된 `thunk`를 미들웨어가 고차 함수 여부에 따라 `thunk` 여부를 판별하므로, `thunk`를 미들웨어에 등록하는 별도의 과정은 없다.

또한 `redux-thunk`는 미들웨어와 통신할 때 `dispatch`만 사용한다. 반면 `redux-saga`는 미들웨어와 통신하는 api로 `dispatch`와 **`saga`의 `yield` 키워드**를 사용한다. `yield`는 `generator function`에서 `generator` 밖으로 값을 출력하는 키워드로 `saga` 내부에서 사용할 수 있는 특수한 `dispatch`라고 생각하면 된다. `saga`에서 `yield`로 출력하는 값은 `sagaMiddleware`로 전달되기 때문이다. 그런데 중요한 건 `yield`문이 아니라 `yield`문이 출력하는 내용이다. `redux-saga`에서는 후술할 `Effect description`이라는 객체를 이용하여 api의 실행뿐만 아니라 `saga`의 실행까지 제어할 수 있다.

마지막으로 `redux-thunk`와 `redux-saga`의 매커니즘에는 근본적인 차이가 있다. `redux-thunk`는 근본적으로 `redux`와 같은 매커니즘이다. `dispatch`한 `thunk`를 그대로 실행하는 **push** 방식인 것이다. 반면 `redux-saga`는 `take` 계열의 Effect creator를 사용하여, 특정 `redux action`이 발생했을 때 해당 `action`의 감시 작업을 등록한 `saga`가 실행된다. 이는 `saga`가 `action`을 **pull**하는 방식이다. 추상적인 데이터 흐름에서는 두 방식 모두 차이가 없으나 구현 방법에 차이가 있는 것이다.

## Effect, Effect description

`Effect` 객체는 쉽게 말해 비동기 함수의 실행이다. `Effect`라는 이름은 "side effect"에서 왔으며, 이 "side effect"는 함수가 해당 스코프 밖의 외부 상태(인자로 들어온 상태는 당연히 제외한다) 등을 변경시킨다는 의미를 가지고 있다. 다시 말해 어떤 함수가 부작용(side effect)을 가진다면 그 함수는 인자로 들어오지 않은 외부 상태를 변경시킨다는 것이다. 자바스크립트 런타임에서는 자바스크립트 엔진 외부와의 통신, 즉 콜백의 비동기 실행을 의미한다.

다만 이런 맥락과 별개로 `redux-saga`에서 `Effect` 자체는 비동기 함수가 아니라 동기적인 함수 실행일 수도 있다. 물론 동기 함수를 `sagaMiddleware`에서 실행할 이유가 없기에 본문에서 `Effect`는 비동기 함수의 실행을 전제한다. 비동기 함수를 generator function에서 실행하고 그 값을 yield하면 의미 있는 형태의 정보가 아니라 `Promise` 객체가 반환된다. `redux-saga`에서는 이를 generator 안에서 실행(invoke)하지 않고 비동기 함수의 실행과 관련된 정보를 객체로 만들어서 `sagaMiddleware`로 보낸 다음, 미들웨어에서 이를 해석하여 비동기로 실행한다. 이 때 **비동기 함수의 실행과 관련된 정보를 객체로 만든 것**을 `Effect description`으로 정의한다. 그리고 이 `Effect description`을 만드는 함수 api들을 `Effect creator`라고 부른다.

참고로 `Effect`와 `Effect description`은 분명히 구분된다. `Effect`는 `action` 실행과 `state` 변경 사이에서 `sagaMiddleware`가 비동기적으로 실행하는 함수의 결과다. 반면 `Effect description`은 `sagaMiddleware`에서 어떤 작업을 수행해야할지 지시하는 정보이다. `Effect`와 관련한 어떤 함수나 그 인자들은 `Effect description`의 정보에 해당하며 이를 전달받은 `sagaMiddleware`가 해당 `Effect description`를 토대로 어떤 작업을 수행하여 나온 결과를 `Effect`라고 한다.

## CPS, Continuation Passing Style

작성 예정.

### Channel

앞서 `saga`를 이용하여 2가지 api의 상태 변경 순서를 보장할 수 있다고 말했다. 그 방법에 대해서는 구체적으로 언급을 안 했는데, 사실 `redux-saga`에서도 Effect description만으로 상태 변경 순서를 보장할 수는 없다. 대신 `redux-saga`에는 이를 해결하기 위한 `Channel`이라는 개념이 있다.

만약 `Channel`을 사용하지 않는다면, 아래 예제에서는 구문 `yield call(request)`이 종료될 때까지 watcher saga는 `request` action을 받을 수가 없다. 그러면 사용자의 정당하면서 반복적인 요청을 모두 수행할 수 없는 문제가 발생한다. 이를 **watch-and-call**의 blocking 이슈 라고 한다. 이와 별개로 동시성을 위해 **watch-and-fork** 모델을 사용하는데, 이는 상태 변경의 순서 문제 자체를 해결할 수 없다. 따라서 이를 모두 해결하기 위해 `actionChannel`을 통해 `Channel`을 사용하며, 그 구체적인 예제는 아래와 같다.

```typescript
export function* watcher() {
  const requestChannel = yield actionChannel(SOMEACTION, buffers.sliding(1));
  while (true) {
    const { payload } = yield take(requestChannel);
    yield call(request, payload);
  }
}
```

위의 예제를 해설하자면, 반복적으로 받아야하는 action은 `actionChannel`에 등록하여 action이 발생할 때마다 channel의 buffer에 action을 push한다. 즉, `actionChannel`은 `take`의 역할을 한다. 그리고 `actionChannel`의 반환값으로 받은 `requestChannel`을 `take`으로 등록하면, `Channel`에 `action`이 enqueue될 때 해당 구문이 값을 반환하고 다음 코드로 넘어간다.
그렇다면 의문이 들 수 있다. 예를 들어 어떤 api가 3번 연속으로 실행된다고 할 때, 1번 api가 `call`된 후 종료될 때까지 나머지 2번, 3번 api가 들어온다고 하자. 예제에서 구문 `yield call(request)`가 block되어 있기에 2번, 3번 api에 대한 `yield take(requestChannel)`은 무시되었다고 생각할 수 있다. 하지만`take`이 인자로 `channel`을 받으면 action을 watch하지 않고 **Channel의 buffer에 저장된 action을 dequeue한다.** 따라서 1번 api가 종료되고 다시 `yield take(requestChannel)` 구문이 실행될 때는 2번째 api의 action을 받아온다.

즉, `Channnel` request를 받는 프로세스와 request를 실행하는 프로세스를 분리하여 **watch-and-call**의 blocking 이슈를 해결한다. 이를 `Channel` 없이 구현하려면 buffer를 redux store에 별도의 state로 두어야 하며 reqeust saga에서의 enqueue와 call saga에서의 dequeue를 특정 reducer가 수행해야 한다.

### eventChannel

[참고](https://mskims.github.io/redux-saga-in-korean/advanced/Channels.html)

앞서 `Channel`이 반복적인 action에 대응하는 api를 순차적으로 실행하는 개념이라고 했다. 그런데 이 action이 꼭 `redux-action`일 필요가 있을까? 예를 들어 어떤 데이터를 조회하는 버튼을 클릭할 때, 기존의 Channel 방식은 버튼 클릭 시 표현식 `dispatch(action)`을 실행하고 해당 `action`이 등록된 `Channel`이 실행된다. 그런데 중간 단계에 있는 `action` 없이 클릭하면 바로 `Channel`에 보낼 수는 없을까? 즉, 외부 이벤트 그 자체를 action으로 하여 `dispatch`함수를 거치지 않고 바로 `Channel`에 enqueue할 수 있을까?

이를 가능하게 하는 것이 바로 `eventChannel` api다. 아래 예제 코드를 보면 알 것이다.

```typescript
import { eventChannel } from "redux-saga";

const createFetchDataChannel = (button: HTMLButtonElement) => {
  return eventChannel((emitter) => {
    const fetchData = (event) => {
      emmiter({
        payload: event.target.value,
      });
    };

    const subscribe = () => {
      button.addEventListener("click", fetchData);
    };

    const unsubscribe = () => {
      button.removeEventListener("click", fetchData);
    };

    subscribe();

    return unsubscribe;
  });
};
```

참고로 이는 이해를 돕기 위한 예제이며 실제로 이렇게 사용하면 굉장히 불편할뿐더러 전혀 Reactful하지 않은, 말 그대로 안티 패턴이다.

만약 실제로 이렇게 사용하려고 한다면 외부 모듈에서 `export const button = document.createElement("button")`으로 HTMLButtonElement를 생성한 다음, `saga` 모듈로 import해서 `const channel = yield call(createFetchDataChannel, button)` 구문에 주입한다. 동시에 컴포넌트에서도 import해서 특정 컴포넌트를 `const parent = document.getElemetById('parent')` 식으로 호출한 다음, `parent.appendChilde(button)`으로 넣어주어야 한다.

이는 굉장히 불편한 방식이며, 이렇게 쓸 바에는 그냥 `dispatch`를 거치는 게 낫다.

참고로 비슷한 개념으로 redux 외부에서 `saga`를 실행할 수 있는 `runSaga` api도 존재한다.

# redux-saga api

[참고](https://redux-saga.js.org/docs/api/)

## 개요

- `take` vs `put`
- `call` vs `fork` vs `spawn`: 함수의 blocking/no-blocking
- `join`, `cancel`
- `all` vs `race`
- 추가 예정

## `take` vs `put`

`take`은 특정 `redux action`의 실행을 감시하며, `put`은 `redux`의 `dispatch`와 같다. 다만 `take`은 다음 코드를 block하지만, `put`은 불가능하다. 대신 `putResolve`는 `put`과 같은 기능을 하면서 동시에 다음 코드를 block할 수 있다.

## `call` vs `fork` vs `spawn`

### call(fn, ...args)

`await`의 역할을 한다. 즉, saga 내부에서 어떤 함수라도 `call` effect creator로 실행하면 saga는 call의 결과가 나올 떄까지 동작을 중지(suspend)한다.

여기서 매개변수 `fn`에는 일반 함수 generator 함수 모두 들어갈 수 있다. 만약 fn 인자가 generator 함수라면, 즉 saga라면 `call` effect creator는 내부적으로 해당 generator 함수를 `run`한다. 만약 매개변수 `fn`에 들어가는 일반 함수가 비동기 함수가 아니면서 Promise를 반환한다면, `call`은 해당 Promise 객체가 결과를 반환할 때까지 saga의 동작을 중지시킨다. **즉, `call` effect creator는 인자에 어떤 함수가 들어가도 해당 함수가 결과를 반환할 때까지 saga를 대기시킨다.**

### fork(fn, ...args)

`call` effect creator와 달리 `fork`는 매개변수 `fn`에 들어가는 함수를 실행하지만 다음 코드는 block하지 못한다.

`fork`는 `Task` 객체를 반환하는데, `Task` 객체는 `fn`의 진행 상황에 접근할 수 있다. 예를 들어 구문 `const res = task.result()`을 실행하면 `task`가 실행을 완료하고 결과값을 반환했다면 변수 `res`에는 `task`의 반환값이, 아직 실행이 완료되지 않았다면 `undefined`가 출력된다. 만약 실행 중인 `Task`를 취소하고 싶다면 `task.cancel()` 메소드를 실행하여 취소할 수 있다.

### spwan

`fork`와 유사하나 다른 점은 표현식 `yield fork(fn, ...args)`이 실행된 `saga`에 종속되지 않는(detached) `Task`를 반환한다. 이 `Task`는 부모 `saga`와 무관하게 실행되기 때문에 top-level로 존재한다.
