import React from "react";
import { DefaultLayout } from "@layouts";

class Controller {
  private static instance: Controller;
  name = "";
  age = 0;
  public isMobile = false;

  constructor() {
    if (Controller.instance) return Controller.instance; // singleton pattern
    this.name = "test";
    this.age = 24;
    this.isMobile = navigator.userAgent.includes("Mobi");

    Controller.instance = this; // singleton pattern
  }

  selectLayout(layout: string | null) {
    /**
     * used in "@globals/Page"
     */
    switch (layout) {
      case "default":
        return DefaultLayout;
      case "none":
        return React.Fragment;
      default:
        return DefaultLayout;
    }
  }
}

const controller = new Controller();

export default controller;
