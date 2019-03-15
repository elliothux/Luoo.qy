import { action, observable } from "mobx";
import { ViewTypes } from "../types";
import { events, EventTypes, noop } from "../utils";
import { volStore } from "./vol";
import { singleStore } from "./single";
import { articleStore } from "./article";
import {
  collectionArticleStore,
  collectionTrackStore,
  collectionVolStore,
  userStore
} from "./user";
import { Pagination } from "./pagination";

type ChangeViewListener = (view?: ViewTypes, preView?: ViewTypes) => void;

class Store {
  @action
  init = async (): Promise<void> => {
    await Promise.all([
      volStore.init(),
      singleStore.init(),
      articleStore.init(),
      userStore.init()
    ]);
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
    this.changeViewListeners.forEach(callback => callback(viewType, prevView));

    if (!isBack && prevView !== ViewTypes.PLAYING) {
      this.viewHistory.push(prevView);
    }

    if (viewType === ViewTypes.PLAYING || prevView === ViewTypes.PLAYING) {
      return callback();
    }
  };

  @action
  public backView = (callback?: Callback) => {
    const prevView = this.viewHistory.pop();
    if (prevView === undefined) {
      throw new Error("Invalid previous view");
    }
    this.changeView(prevView, true, callback);
  };

  public onChangeView = (callback: ChangeViewListener) => {
    this.changeViewListeners.push(callback);
  };

  private changeViewListeners: ChangeViewListener[] = [];

  /*
  @desc Background
   */
  @observable
  public backgroundImage: string = require("../static/fake-bg.jpg");

  @action
  public setBackgroundImage = (src: string) => {
    this.backgroundImage = src;
  };
}

const store = new Store();

export {
  store,
  volStore,
  singleStore,
  articleStore,
  userStore,
  collectionVolStore,
  collectionTrackStore,
  collectionArticleStore,
  Pagination
};
