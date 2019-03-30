import * as React from "react";
import { Route } from "../../components/route";
import { store, volStore } from "../../store";
import { ViewTypes } from "../../types";
import { observer } from "mobx-react";
import { getIPC, preventSyntheticEvent } from "../../utils";
import { Icon, IconTypes } from "../../components/icon";
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
    searchText: "",
    showHistory: false,
    showResult: false,
    history: ["迷幻摇滚", "vol788", "Beatles"],
    view: SearchViewTypes.VOLS,
    volResult: null,
    trackResult: null,
    articleResult: null
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

    this.setState({ showResult: true, searchText: t });

    const handles: ((text: string) => Promise<boolean>)[] = [];
    for (let handle of handles) {
      const done = await handle(t);
      if (done) {
        return;
      }
    }
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

  changeView = (view: SearchViewTypes) => {
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

  private renderLoading = () => <Icon type={IconTypes.LOADING} animate />;

  private renderEmpty = () => "暂无结果";

  private renderResult = () => {
    const { volResult, trackResult, articleResult } = this.state;
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
            {Array.isArray(volResult)
              ? volResult.length
                ? null
                : this.renderEmpty()
              : this.renderLoading()}
          </div>
          <div>
            <h1>“{this.state.searchText}” 相关单曲</h1>
            {Array.isArray(trackResult)
              ? trackResult.length
                ? null
                : this.renderEmpty()
              : this.renderLoading()}
          </div>
          <div>
            <h1>“{this.state.searchText}” 相关专栏</h1>
            {Array.isArray(articleResult)
              ? articleResult.length
                ? null
                : this.renderEmpty()
              : this.renderLoading()}
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
