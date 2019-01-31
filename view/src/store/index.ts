
import { observable } from 'mobx';
import { constants, ipc } from '../utils';

class Store {
  @observable view = constants.VIEWS.VOL;
  @observable vols = [];
  @observable getVols = async () => {
    const { data } = JSON.parse(await ipc.requestVols(900, 920));
    this.vols = data;
    return this.vols;
  }
}

const store = new Store();

export default store;
