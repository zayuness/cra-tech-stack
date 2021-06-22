import React from "react";

const home = {
  name: "home",
  head: {
    title: "홈페이지",
    tags: <></>,
  },
  path: "/",
  layout: "default",
  component: "Home",
};

const test = {
  name: "test",
  head: {
    title: "테스트 페이지",
    tags: <></>,
  },
  path: "/test",
  layout: "default",
  component: "Test",
};

const args = [home, test];

export default args;
