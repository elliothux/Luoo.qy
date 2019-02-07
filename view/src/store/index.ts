import { action, computed, observable } from "mobx";
import anime from "animejs";
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

  @observable
  public view: ViewTypes = ViewTypes.VOLS;

  @action
  public changeView = (viewType: ViewTypes) => {
    if (this.view === viewType) return;
    const prevView = this.view;
    this.view = viewType;

    const prevViewElement: HTMLElement | null = document.querySelector(
      `.view-${prevView}`
    );
    const viewElement: HTMLElement | null = document.querySelector(
      `.view-${viewType}`
    );
    if (!prevViewElement || !viewElement) return;

    // anime({
    //   targets: prevViewElement,
    //   duration: 400,
    //   easing: "linear",
    //   scale: 0.9,
    //   opacity: 0
    // });
    // anime({
    //   targets: viewElement,
    //   duration: 400,
    //   easing: "linear",
    //   scale: 1,
    //   opacity: 1,
    //   delay: 350,
    //   complete: () => {
    //     prevViewElement.style.zIndex = "-1";
    //   }
    // });
      viewElement.className += ' show';
      prevViewElement.className = prevViewElement.className.replace(' show', '');
      viewElement.style.zIndex = viewType === ViewTypes.VOLS_TYPE ? "20" : "2";
    setTimeout(() => {
        prevViewElement.style.zIndex = "-1";
    }, 500);
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
