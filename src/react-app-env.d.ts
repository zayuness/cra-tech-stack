/// <reference types="react-scripts" />
/// <reference types="@emotion/react/types/css-prop" />

declare interface Page {
  name: string;
  head: {
    title: string;
    tags: JSX.Element;
  };
  path: string;
  layout: string | null;
  Component: () => JSX.Element;
}

declare interface ReactProps {
  children?: React.ReactChild;
}
