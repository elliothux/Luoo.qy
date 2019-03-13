import { action, observable } from "mobx";
import { volStore } from "./vol";
import { ViewTypes } from "../types";
import {noop} from "../utils";

class Store {
  @action
  init = async (): Promise<void> => {
    await Promise.all([volStore.init()]);
  };

  protected viewHistory: ViewTypes[] = [];

  @observable
  public view: ViewTypes = ViewTypes.VOLS;

  @action
  public changeView = (
    viewType: ViewTypes,
    isBack: boolean = false,
    callback: Callback = noop
  ) => {
    if (viewType === this.view) {
      return callback();
    }

    const prevView = this.view;
    this.view = viewType;

    if (!isBack && prevView !== ViewTypes.PLAYING) {
      this.viewHistory.push(prevView);
    }

    if (viewType === ViewTypes.PLAYING || prevView === ViewTypes.PLAYING) {
      return callback();
    }

    const prevViewElement = document.querySelector(
      `.view-${prevView}`
    ) as Maybe<HTMLElement>;
    const viewElement = document.querySelector(`.view-${viewType}`) as Maybe<
      HTMLElement
    >;
    if (!prevViewElement || !viewElement) return;

    viewElement.className += " show";
    prevViewElement.className = prevViewElement.className.replace(" show", "");
    viewElement.style.zIndex = viewType === ViewTypes.VOLS_TYPE ? "20" : "5";
    setTimeout(() => {
      prevViewElement.style.zIndex = "-1";
      return callback();
    }, 500);
  };

  @action
  public backView = (callback?: Callback) => {
    const prevView = this.viewHistory.pop();
    if (prevView === undefined) {
      throw new Error("Invalid previous view");
    }
    this.changeView(prevView, true, callback);
  };

  @observable
  backgroundImage: string = require("../static/fake-bg.jpg");
}

const store = new Store();

export { store, volStore };
