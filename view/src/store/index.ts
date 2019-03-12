import { action, observable } from "mobx";
import { volStore } from "./vol";
import { ViewTypes } from "../@types";

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
    callback?: any
  ) => {
    const hasCallback = typeof callback === "function";
    if (viewType === this.view) {
      if (hasCallback) {
        callback();
      }
      return;
    }

    const prevView = this.view;
    this.view = viewType;

    if (!isBack && prevView !== ViewTypes.PLAYING) {
      this.viewHistory.push(prevView);
    }

    if (viewType === ViewTypes.PLAYING || prevView === ViewTypes.PLAYING) {
      if (hasCallback) {
        callback();
      }
      return;
    }

    const prevViewElement = document.querySelector(
      `.view-${prevView}`
    ) as Maybe<HTMLElement>;
    const viewElement = document.querySelector(`.view-${viewType}`) as Maybe<
      HTMLElement
    >;
    if (!prevViewElement || !viewElement) return;

    const isEnterInfoPage =
      (prevView === ViewTypes.VOLS && viewType === ViewTypes.VOL_INFO) ||
      (prevView === ViewTypes.SINGLES && viewType === ViewTypes.SINGLE_INFO) ||
      (prevView === ViewTypes.ARTICLES &&
        viewType === ViewTypes.ARTICLE_INFO) ||
      (prevView === ViewTypes.USER &&
        [
          ViewTypes.VOL_INFO,
          ViewTypes.SINGLE_INFO,
          ViewTypes.ARTICLE_INFO
        ].includes(viewType));
    const isExitInfoPage =
      prevView === ViewTypes.VOL_INFO ||
      prevView === ViewTypes.SINGLE_INFO ||
      prevView === ViewTypes.ARTICLE_INFO;

    if (isEnterInfoPage) {
      viewElement.className += " show-with-cover";
      prevViewElement.className = prevViewElement.className.replace(
        " show",
        ""
      );
    } else if (isExitInfoPage) {
      viewElement.className += " show";
      prevViewElement.className = prevViewElement.className.replace(
        " show-with-cover",
        ""
      );
    } else {
      viewElement.className += " show";
      prevViewElement.className = prevViewElement.className.replace(
        " show",
        ""
      );
    }

    viewElement.style.zIndex = viewType === ViewTypes.VOLS_TYPE ? "20" : "5";
    setTimeout(() => {
      prevViewElement.style.zIndex = "-1";
    }, 500);
    setTimeout(() => {
      if (typeof callback === "function") {
        callback();
      }
    }, isEnterInfoPage ? 2000 : 500);
  };

  @action
  public backView = (callback?: any) => {
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
