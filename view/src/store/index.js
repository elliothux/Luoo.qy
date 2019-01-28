
import { observable } from 'mobx';
import { constants } from '../utils';


class Store {
  @observable view = constants.VIEWS.VOL;
}

const store = new Store();

export default store;
