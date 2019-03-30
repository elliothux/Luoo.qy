import * as React from "react";
import { Route } from "../../components/route";
import "./index.scss";
import { store } from "../../store";
import { ViewTypes } from "../../types";
import { observer } from "mobx-react";
import { preventSyntheticEvent } from "../../utils";
import { Icon, IconTypes } from "../../components/icon";
import {debug} from "util";

setTimeout(() => store.changeView(ViewTypes.SEARCH), 2000);
@observer
class Search extends React.Component {
  state = {
    inputText: "",
    showHistory: false,
    showResult: false,
    history: ["迷幻摇滚", "vol788", "Beatles"]
  };

  private showHistory = () => this.setState({ showHistory: true });

  private hideHistory = () => this.setState({ showHistory: false });

  private onChangeInputText = (e: React.FormEvent<HTMLInputElement>) => {
    preventSyntheticEvent(e);
    const { value = '' } = e.currentTarget;
    this.setState({ inputText: value });
    if (!value.trim()) {
      this.setState({ showResult: false });
    }
  };

  private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    this.handleSearch(this.state.inputText);
  };

  private onClickHistoryItem = (e: React.MouseEvent<HTMLInputElement>) => {
    const { value = '' } = e.currentTarget.dataset;
    this.setState({ inputText: value });
    this.handleSearch(value);
  };

  private handleSearch(text: string) {
    if (!text.trim()) {
      return;
    }

    this.setState({ showResult: true });
  }

  public render() {
    return (
      <Route currentView={store.view} view={ViewTypes.SEARCH} id="search" className={this.state.showResult ? 'show-result' : ''}>
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
      </Route>
    );
  }
}

export { Search };
