import * as React from "react";
import { Route } from "../../components/route";
import {
  store,
  volStore
} from "../../store";
import { ViewTypes } from "../../types";
import { observer } from "mobx-react";
import { getIPC, preventSyntheticEvent } from "../../utils";
import { Icon, IconTypes } from "../../components/icon";
import { searchStore } from "../../store/search";
import { SearchResultVol } from "../../components/search-result-vols";
import { SearchResultArticle } from '../../components/search-result-articles';
import { SearchResultTrack } from '../../components/search-result-tracks';
import "./index.scss";


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
    view: SearchViewTypes.VOLS
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

  get title(): string {
    const { view } = this.state;
    const { searchText } = searchStore;

    switch (view) {
      case SearchViewTypes.VOLS:
        return `“${searchText}” 相关期刊`;
      case SearchViewTypes.TRACKS:
        return `“${searchText}” 相关歌曲`;
      case SearchViewTypes.ARTICLES:
        return `“${searchText}” 相关专栏`;
      default:
        throw new Error("Invalid view type");
    }
  }

  private onChangeInputText = (e: React.FormEvent<HTMLInputElement>) => {
    preventSyntheticEvent(e);
    const { value = "" } = e.currentTarget;
    this.setState({ inputText: value });
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
    if (await Search.jumpVol(text)) {
      return;
    }

    searchStore.setSearchText(text);
  };

  private static jumpVol = async (text: string): Promise<boolean> => {
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

  private renderResult = () => {
    return (
      <>
        {this.renderSearchNav()}
        <h1 id="search-result-title">{this.title}</h1>
        <div
          id="search-result-content"
          style={{ transform: `translateX(${this.translateX})` }}
        >
          <SearchResultVol />
          <SearchResultTrack />
          <SearchResultArticle />
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
        className={searchStore.searchText ? "show-result" : ""}
      >
        <div id="search-main">
          <div id="search-input">
            <input
              type="text"
              placeholder="搜索..."
              maxLength={50}
              value={this.state.inputText}
              onChange={this.onChangeInputText}
              onKeyPress={this.onKeyPress}
            />
            <Icon type={IconTypes.SEARCH} />
          </div>
          <div id="search-history">
            <p>搜索历史</p>
            <div className="search-history-content">
              {searchStore.history.map(i => (
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
        {searchStore.searchText ? this.renderResult() : null}
      </Route>
    );
  }
}

export { Search };
