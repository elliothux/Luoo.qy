import { action, computed, observable } from "mobx";
import { getIPC } from "../utils";
import { PlayingStatus, PlayingTypes, ViewTypes, VolTrack } from "../types";
import { volStore } from "./vol";

let ipc: IpcObject;

class Store {
  @action
  init = async (): Promise<void> => {
    ipc = await getIPC();
    await volStore.init(ipc);
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

    const prevViewElement = document.querySelector(
      `.view-${prevView}`
    ) as HTMLElement | null;
    const viewElement = document.querySelector(
      `.view-${viewType}`
    ) as HTMLElement | null;
    if (!prevViewElement || !viewElement) return;

    if (!isBack) {
      this.viewHistory.push(prevView);
    }

    viewElement.className += " show";
    prevViewElement.className = prevViewElement.className.replace(" show", "");

    viewElement.style.zIndex = viewType === ViewTypes.VOLS_TYPE ? "20" : "1";
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

  @computed
  public get playingInfo(): VolTrack {
    const { tracks } = volStore.vols[volStore.playingVolIndex];
    return tracks[volStore.playingTrackIndex] as VolTrack;
  }

  @observable
  public playStatus: PlayingStatus = PlayingStatus.PLAYING;

  @observable
  private playingType: PlayingTypes = PlayingTypes.VOL;

  @observable
  public totalTime: number = 33;

  @observable
  public playedTime: number = 100;

  @computed
  get playingProgress(): number {
    return Math.ceil((this.totalTime / this.playedTime) * 100);
  }
}

const store = new Store();

export { store, volStore };
