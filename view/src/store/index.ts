import {action, observable} from "mobx";
import {getIPC} from "../utils";
import {ViewTypes} from "../types";
import {volStore} from "./vol";
import {singleStore} from "./single";
import {articleStore} from "./article";
import {playerStore} from "./player";

let ipc: IpcObject;

class Store {
  @action
  init = async (): Promise<void> => {
    ipc = await getIPC();
    await Promise.all([
      volStore.init(ipc),
      singleStore.init(ipc),
      articleStore.init(ipc)
    ]);
    await playerStore.init(ipc);
  };

  protected viewHistory: ViewTypes[] = [];

  @observable
  public view: ViewTypes = ViewTypes.VOLS;

  @action
  public changeView = (viewType: ViewTypes, isBack: boolean = false) => {
    if (viewType === this.view) {
      return;
    }

    const prevView = this.view;
    this.view = viewType;

    if (!isBack) {
      this.viewHistory.push(prevView);
    }

    if (viewType === ViewTypes.PLAYING || prevView === ViewTypes.PLAYING) {
      return;
    }

    const prevViewElement = document.querySelector(
        `.view-${prevView}`
    ) as HTMLElement | null;
    const viewElement = document.querySelector(
        `.view-${viewType}`
    ) as HTMLElement | null;
    if (!prevViewElement || !viewElement) return;

    const isEnterInfoPage =
        (prevView === ViewTypes.VOLS && viewType === ViewTypes.VOL_INFO) ||
        (prevView === ViewTypes.SINGLES && viewType === ViewTypes.SINGLE_INFO) ||
        (prevView === ViewTypes.ARTICLES && viewType === ViewTypes.ARTICLE_INFO);
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
  };

  @action
  public backView = () => {
    const prevView = this.viewHistory.pop();
    if (prevView === undefined) {
      throw new Error("Invalid previous view");
    }
    this.changeView(prevView, true);
  };

  @observable
  backgroundImage: string = volStore.allVols[0].cover;

  protected setBackgroundTimer: number | null = null;

  @action
  changeBackground = (type: ViewTypes) => {
    if (this.setBackgroundTimer) {
      clearTimeout(this.setBackgroundTimer);
    }

    const callback = () => {
      let backgroundImage;
      switch (type) {
        case ViewTypes.VOLS: {
          backgroundImage = volStore.selectedVol.cover;
          break;
        }
        case ViewTypes.SINGLES: {
          backgroundImage = singleStore.selectedSingle.cover;
          break;
        }
        case ViewTypes.ARTICLES: {
          backgroundImage = articleStore.selectedArticle.cover;
          break;
        }
        default: {
          throw 'Invalid type';
        }
      }

      window.clearTimeout(this.setBackgroundTimer as number);
      this.setBackgroundTimer = null;
      this.backgroundImage = backgroundImage;
    };

    this.setBackgroundTimer = window.setTimeout(callback, 1000);
  }
}

const store = new Store();

export { store, volStore, singleStore, articleStore, playerStore };
