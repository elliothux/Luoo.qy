import { observable, action, computed } from "mobx";
import { ipc } from "../utils";
import { Views, VolInfo } from "../types";

class Store {
  @observable
  public view = Views.VOL;

  @observable
  public vols: VolInfo[] = [];

  @action
  public getVols = async () => {
    const { data } = JSON.parse(await ipc.requestVols(900, 920));
    this.vols = data as VolInfo[];
    return this.vols;
  };

  @observable
  private selectedVolIndex: number = 10;

  @computed
  public get selectedVol(): VolInfo {
    return this.vols[this.selectedVolIndex];
  }
}

const store = new Store();

export { store };
