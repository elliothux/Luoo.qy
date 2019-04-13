import { searchVolStore } from "./search-vol";
import { searchTrackStore } from "./search-track";
import { searchArticleStore } from "./search-article";

import { action, observable, reaction } from "mobx";
import { getIPC } from "../../utils";
import { SearchViewTypes } from "../../types";

const MAX_HISTORY_COUNT = 20;
const HISTORY_LS_KEY = "search_history";

const ipc = getIPC();

class SearchStore {
  constructor() {
    this.initReaction();
  }

  private initReaction = () => {
    reaction(() => this.searchText, this.search);
    reaction(
      () => this.history,
      () => {
        localStorage.setItem(HISTORY_LS_KEY, JSON.stringify(this.history));
      }
    );
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
    this.history = [t, ...this.history.filter(i => i !== t)].slice(
      0,
      MAX_HISTORY_COUNT
    );
  };

  @observable
  public searchType: SearchViewTypes = SearchViewTypes.VOLS;

  @action
  public setSearchType = (type: SearchViewTypes) => {
    this.searchType = type;
    if (type === SearchViewTypes.ARTICLES && searchArticleStore.isLoading) {
      return this.searchArticle();
    }
    if (type === SearchViewTypes.TRACKS && searchTrackStore.isLoading) {
      return this.searchTracks();
    }
  };

  @observable
  public history: string[] = JSON.parse(
    localStorage.getItem(HISTORY_LS_KEY) || "[]"
  );

  @action
  private clearIds = () => {
    searchVolStore.setIds(null);
    searchTrackStore.setIds(null);
    searchArticleStore.setIds(null);
  };

  @action
  private search = () => {
    this.clearIds();
    return this.searchVol();
  };

  @action
  private searchVol = async () => {
    if (!this.searchText) {
      return;
    }

    const items = await ipc.db.vol.search(this.searchText, { id: 1 });
    setTimeout(() => {
      searchVolStore.setIds(items.map(i => i.id));
    }, 1500);
  };

  @action
  private searchArticle = async () => {
    if (!this.searchText) {
      return;
    }

    const items = await ipc.db.article.search(this.searchText, { id: 1 });
    setTimeout(() => {
      searchArticleStore.setIds(items.map(i => i.id));
    }, 1500);
  };

  @action
  private searchTracks = async () => {
    if (!this.searchText) {
      return;
    }

    const projection = { id: 1 };
    const [volTracks, singles, articleTracks] = await Promise.all([
      ipc.db.volTrack.search(this.searchText, projection),
      ipc.db.single.search(this.searchText, projection),
      ipc.db.articleTrack.search(this.searchText, projection)
    ]);
    const items = [...volTracks, ...singles, ...articleTracks];
    setTimeout(() => {
      searchTrackStore.setIds(items.map(i => i.id));
    }, 1500);
  };
}

const searchStore = new SearchStore();

export { searchStore, searchVolStore, searchTrackStore, searchArticleStore };
