import * as React from "react";
import { Route } from "../../components/route";
import {
  searchArticleStore,
  searchTrackStore,
  searchVolStore,
  store,
  volStore
} from "../../store";
import {FindOptions, ViewTypes, VolInfo} from "../../types";
import { observer } from "mobx-react";
import { exec, getIPC, preventSyntheticEvent } from "../../utils";
import { Icon, IconTypes } from "../../components/icon";
import "./index.scss";
import { VolItem } from "../../components/vol-item";

enum SearchViewTypes {
  VOLS,
  TRACKS,
  ARTICLES
}

const ipc = getIPC();
setTimeout(() => store.changeView(ViewTypes.SEARCH), 2000);
@observer
class Search extends React.Component {
  state = {
    inputText: "",
    searchText: "",
    showHistory: false,
    showResult: false,
    history: ["迷幻摇滚", "vol788", "Beatles", "再见"],
    view: SearchViewTypes.VOLS,
    fetchingVol: false,
    fetchingTrack: false,
    fetchingArticle: false
  };

  get translateX(): string {
    const { view } = this.state;
    switch (view) {
      case SearchViewTypes.VOLS:
        return `0%`;
      case SearchViewTypes.TRACKS:
        return `-33.333333%`;
      case SearchViewTypes.ARTICLES:
        return `-66.66666%`;
      default:
        throw new Error("Invalid view type");
    }
  }

  private showHistory = () => this.setState({ showHistory: true });

  private hideHistory = () => this.setState({ showHistory: false });

  private onChangeInputText = (e: React.FormEvent<HTMLInputElement>) => {
    preventSyntheticEvent(e);
    const { value = "" } = e.currentTarget;
    this.setState({ inputText: value });
    if (!value.trim()) {
      this.setState({ showResult: false });
    }
  };

  private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    return this.handleSearch(this.state.inputText);
  };

  private onClickHistoryItem = (e: React.MouseEvent<HTMLInputElement>) => {
    const { value = "" } = e.currentTarget.dataset;
    this.setState({ inputText: value });
    return this.handleSearch(value);
  };

  private handleSearch = async (text: string) => {
    const t = text.trim();
    if (!t) {
      return;
    }

    if (await this.jumpVol(t)) {
      return;
    }

    const state = {
      showResult: true,
      searchText: t,
      fetchingVol: false,
      fetchingTrack: false,
      fetchingArticle: false
    };
    switch (this.state.view) {
      case SearchViewTypes.VOLS: {
        exec(() => this.searchVol(t));
        state.fetchingVol = true;
        break;
      }
      case SearchViewTypes.TRACKS:
        state.fetchingTrack = true;
        break;
      case SearchViewTypes.ARTICLES:
        state.fetchingArticle = true;
        break;
    }
    this.setState(state);
  };

  private jumpVol = async (text: string): Promise<boolean> => {
    const match = text
      .trim()
      .toLowerCase()
      .match(/^vol\s?\d+/);
    if (match && match[0].trim()) {
      const vol = parseInt((match[0].match(/\d+/) || ["0"])[0], 10);
      if (!vol) {
        return false;
      }

      const volItem = await ipc.db.vol.findOne({ vol });
      if (!volItem) {
        return false;
      }

      volStore.setItem(volItem.id);
      return true;
    }
    return false;
  };

  private changeView = (view: SearchViewTypes) => {
    this.setState({ view });
  };

  private searchVol = async (text: string) => {
    const items = await ipc.db.vol.search(text, { id: 1 });
    searchVolStore.setIds(items.map(i => i.id));
    setTimeout(() => this.setState({ fetchingVol: false }), 1000);
  };

  private renderSearchNav = () => {
    const { view } = this.state;
    return (
      <div id="search-result-nav">
        <div
          className={view === SearchViewTypes.VOLS ? "active" : ""}
          onClick={this.changeView.bind(this, SearchViewTypes.VOLS)}
        >
          期刊
        </div>
        <div
          className={view === SearchViewTypes.TRACKS ? "active" : ""}
          onClick={this.changeView.bind(this, SearchViewTypes.TRACKS)}
        >
          曲目
        </div>
        <div
          className={view === SearchViewTypes.ARTICLES ? "active" : ""}
          onClick={this.changeView.bind(this, SearchViewTypes.ARTICLES)}
        >
          专栏
        </div>
      </div>
    );
  };

  private renderLoading = () => <Icon type={IconTypes.LOADING} animate />;

  private renderEmpty = () => "暂无结果";

  private renderVolResult = () => {
    const { fetchingVol } = this.state;
    if (fetchingVol) {
      return this.renderLoading();
    }

    const { displayedItems } = searchVolStore;
    if (!displayedItems.length) {
      return this.renderEmpty();
    }

    return "111";
  };

  private renderTrackResult = () => {
    const { fetchingTrack } = this.state;
    if (fetchingTrack) {
      return this.renderLoading();
    }

    const { displayedItems } = searchTrackStore;
    if (!displayedItems.length) {
      return this.renderEmpty();
    }

    return "222";
  };

  private renderArticleResult = () => {
    const { fetchingArticle } = this.state;
    if (fetchingArticle) {
      return this.renderLoading();
    }

    const { displayedItems } = searchArticleStore;
    if (!displayedItems.length) {
      return this.renderEmpty();
    }

    return "333";
  };

  private renderResult = () => {
    return (
      <>
        {this.renderSearchNav()}
        <div
          id="search-result-content"
          style={{
            transform: `translateX(${this.translateX})`
          }}
        >
          <div>
            <h1>“{this.state.searchText}” 相关期刊</h1>
            {this.renderVolResult()}
          </div>
          <div>
            <h1>“{this.state.searchText}” 相关单曲</h1>
            {this.renderTrackResult()}
          </div>
          <div>
            <h1>“{this.state.searchText}” 相关专栏</h1>
            {this.renderArticleResult()}
          </div>
        </div>
      </>
    );
  };

  public render() {
    return (
      <Route
        currentView={store.view}
        view={ViewTypes.SEARCH}
        id="search"
        className={this.state.showResult ? "show-result" : ""}
      >
        <div id="search-main">
          <div id="search-input">
            <input
              type="text"
              placeholder="搜索..."
              maxLength={50}
              value={this.state.inputText}
              onFocus={this.showHistory}
              onBlur={this.hideHistory}
              onChange={this.onChangeInputText}
              onKeyPress={this.onKeyPress}
            />
            <Icon type={IconTypes.SEARCH} />
          </div>
          <div id="search-history">
            <p>搜索历史</p>
            <div className="search-history-content">
              {this.state.history.map(i => (
                <div
                  key={i}
                  className="search-history-item"
                  onClick={this.onClickHistoryItem}
                  data-value={i}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
        {this.state.showResult ? this.renderResult() : null}
      </Route>
    );
  }
}

export { Search };
