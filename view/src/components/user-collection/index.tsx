import * as React from "react";
import { observer } from "mobx-react";
import { UserCollectionVols } from "../user-collection-vols";
import { UserCollectionTracks } from "../user-collection-tracks";
import { UserCollectionArticles } from "../user-collection-articles";
import "./index.scss";

enum UserCollectionViewTypes {
  VOLS,
  TRACKS,
  ARTICLES
}

@observer
class UserCollection extends React.Component {
  state = {
    view: UserCollectionViewTypes.VOLS
  };

  get translateX(): string {
    const { view } = this.state;
    switch (view) {
      case UserCollectionViewTypes.VOLS:
        return `0%`;
      case UserCollectionViewTypes.TRACKS:
        return `-33.333333%`;
      case UserCollectionViewTypes.ARTICLES:
        return `-66.66666%`;
      default:
        throw new Error("Invalid view type");
    }
  }

  changeView = (view: UserCollectionViewTypes) => {
    this.setState({ view });
  };

  renderHeader = () => {
    const { view } = this.state;
    return (
      <div id="user-collection-header">
        <div
          className={view === UserCollectionViewTypes.VOLS ? "active" : ""}
          onClick={this.changeView.bind(this, UserCollectionViewTypes.VOLS)}
        >
          期刊
        </div>
        <div
          className={view === UserCollectionViewTypes.TRACKS ? "active" : ""}
          onClick={this.changeView.bind(this, UserCollectionViewTypes.TRACKS)}
        >
          曲目
        </div>
        <div
          className={view === UserCollectionViewTypes.ARTICLES ? "active" : ""}
          onClick={this.changeView.bind(this, UserCollectionViewTypes.ARTICLES)}
        >
          专栏
        </div>
      </div>
    );
  };

  renderCollection = () => {
    return (
      <div
        id="user-collection-container"
        style={{
          transform: `translateX(${this.translateX})`
        }}
      >
        <UserCollectionVols />
        <UserCollectionTracks />
        <UserCollectionArticles />
      </div>
    );
  };

  render() {
    return (
      <div id="user-collection">
        {this.renderHeader()}
        {this.renderCollection()}
      </div>
    );
  }
}

export { UserCollection };
