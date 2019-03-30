import { action, observable } from "mobx";
import { ViewTypes } from "../types";
import { volStore } from "./vol";
import { singleStore } from "./single";
import { articleStore } from "./article";
import { playerStore } from "./player";
import {
  collectionArticleStore,
  collectionTrackStore,
  collectionVolStore,
  userStore
} from "./user";
import { searchArticleStore, searchTrackStore, searchVolStore } from "./search";
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
    playerStore.init();
  };

  protected viewHistory: ViewTypes[] = [];

  @observable
  public view: ViewTypes = ViewTypes.VOLS;

  @action
  public changeView = (viewType: ViewTypes, isBack: boolean = false) => {
    if (playerStore.showPlayer) {
      playerStore.toggleShowPlayer(false);
      setTimeout(() => {
        this.changeView(viewType, isBack);
      }, 500);
      return;
    }

    if (viewType === this.view) {
      return;
    }

    const prevView = this.view;
    this.view = viewType;
    this.changeViewListeners.forEach(callback => callback(viewType, prevView));

    if (!isBack) {
      this.viewHistory.push(prevView);
    }
  };

  @action
  public backView = () => {
    if (playerStore.showPlayer) {
      return playerStore.toggleShowPlayer(false);
    }

    const prevView = this.viewHistory.pop();
    if (prevView === undefined) {
      throw new Error("Invalid previous view");
    }
    this.changeView(prevView, true);
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
  playerStore,
  userStore,
  collectionVolStore,
  collectionTrackStore,
  collectionArticleStore,
  searchArticleStore,
  searchTrackStore,
  searchVolStore,
  Pagination
};
