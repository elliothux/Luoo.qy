import { observable } from 'mobx';
import { ipc } from '../utils';
import { Views, VolInfo } from '../types'



class Store {
  @observable view = Views.VOL;
  @observable vols: VolInfo[] = [];
  @observable getVols = async () => {
    const { data } = JSON.parse(await ipc.requestVols(900, 920));
    this.vols = data as VolInfo[];
    return this.vols;
  }
}


const store = new Store();


export {
    store
};
