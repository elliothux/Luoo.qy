import * as React from "react";
import { Route } from "../../components/route";
import { store, volStore } from "../../store";
import { ViewTypes, SearchViewTypes } from "../../types";
import { observer } from "mobx-react";
import { events, EventTypes, getIPC, preventSyntheticEvent } from "../../utils";
import { Icon, IconTypes } from "../../components/icon";
import { searchStore } from "../../store/search";
import { SearchResultVol } from "../../components/search-result-vols";
import { SearchResultArticle } from "../../components/search-result-articles";
import { SearchResultTrack } from "../../components/search-result-tracks";
import { Empty } from "../../components/empty";

import "./index.scss";

const ipc = getIPC();

@observer
class Search extends React.Component {
  state = { inputText: "" };

  componentDidMount(): void {
    events.on(EventTypes.CLEAR_SEARCH_TEXT, () => {
      this.setState({ inputText: "" });
    });
    events.on(EventTypes.SEARCH, (text: string) => {
      this.setState({ inputText: text });
      return this.handleSearch(text);
    });
  }

  private static get translateX(): string {
    switch (searchStore.searchType) {
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

  private static get title(): string {
    const { searchText, searchType } = searchStore;

    switch (searchType) {
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
    if (!value.trim()) {
      searchStore.setSearchText(null);
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

  private renderSearchNav = () => {
    return (
      <div id="search-result-nav">
        <div
          className={
            searchStore.searchType === SearchViewTypes.VOLS ? "active" : ""
          }
          onClick={() => searchStore.setSearchType(SearchViewTypes.VOLS)}
        >
          期刊
        </div>
        <div
          className={
            searchStore.searchType === SearchViewTypes.TRACKS ? "active" : ""
          }
          onClick={() => searchStore.setSearchType(SearchViewTypes.TRACKS)}
        >
          曲目
        </div>
        <div
          className={
            searchStore.searchType === SearchViewTypes.ARTICLES ? "active" : ""
          }
          onClick={() => searchStore.setSearchType(SearchViewTypes.ARTICLES)}
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
        <h1 id="search-result-title">{Search.title}</h1>
        <div
          id="search-result-content"
          style={{ transform: `translateX(${Search.translateX})` }}
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
              {searchStore.history.length ? (
                searchStore.history.map(i => (
                  <div
                    key={i}
                    className="search-history-item"
                    onClick={this.onClickHistoryItem}
                    data-value={i}
                  >
                    {i}
                  </div>
                ))
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
        {searchStore.searchText ? this.renderResult() : null}
      </Route>
    );
  }
}

export { Search };
