import { searchVolStore } from "./search-vol";
import { searchTrackStore } from "./search-track";
import { searchArticleStore } from "./search-article";

import { action, observable, reaction } from "mobx";
import {getIPC} from "../../utils";


const ipc = getIPC();

class SearchStore {
  constructor() {
    this.initReaction();
  }

  private initReaction = () => {
    reaction(() => {
      return this.searchText;
    }, this.search);
  };

  @observable
  public searchText: Maybe<string> = null;

  @action
  public setSearchText = (text: Maybe<string>) => {
      if (!text) {
          this.searchText = null;
          this.clearIds();
          return;
      }

    const t = text.trim();
    this.searchText = t;
    this.history = [t, ...this.history.filter(i => i !== t)];
  };

  @observable
  public history: string[] = ["迷幻摇滚", "vol788", "Beatles", "再见"];

  @action
  private clearIds = () => {
      searchVolStore.setIds([]);
      searchTrackStore.setIds([]);
      searchArticleStore.setIds([]);
  };

  @action
  private search = async () => {
      this.clearIds();
      if (!this.searchText) {
          return;
      }

      const items = await ipc.db.vol.search(this.searchText, { id: 1 });
      setTimeout(() => {
          searchVolStore.setIds(items.map(i => i.id));
      }, 1500);
  };
}

const searchStore = new SearchStore();

export { searchStore, searchVolStore, searchTrackStore, searchArticleStore };
