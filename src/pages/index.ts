import Home from "./Home";
import Test from "./Test";

import args from "./_args";

const components = [Home, Test];

const pages: Page[] = [];

components.forEach((Component) => {
  const result = args.find((arg) => arg.component === Component.name);
  if (result) {
    const page: Page = {
      ...result,
      Component,
    };
    pages.push(page);
  }
  return null;
});

export default pages;

export { Home };
