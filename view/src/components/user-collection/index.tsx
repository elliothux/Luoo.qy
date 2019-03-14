import * as React from "react";
import { observer } from "mobx-react";
import { UserCollectionVols } from "../user-collection-vols";
import { UserCollectionVolTracks } from "../user-collection-vol-tracks";
import { UserCollectionSingles } from "../user-collection-singles";
import { UserCollectionArticles } from "../user-collection-articles";
import { UserCollectionArticleTracks } from "../user-collection-article-tracks";
import "./index.scss";

enum UserCollectionViewTypes {
  VOLS,
  VOL_TRACKS,
  SINGLES,
  ARTICLES,
  ARTICLE_TRACKS
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
      case UserCollectionViewTypes.VOL_TRACKS:
        return `-20%`;
      case UserCollectionViewTypes.SINGLES:
        return `-40%`;
      case UserCollectionViewTypes.ARTICLES:
        return `-60%`;
      case UserCollectionViewTypes.ARTICLE_TRACKS:
        return `-80%`;
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
          className={
            view === UserCollectionViewTypes.VOL_TRACKS ? "active" : ""
          }
          onClick={this.changeView.bind(
            this,
            UserCollectionViewTypes.VOL_TRACKS
          )}
        >
          期刊曲目
        </div>
        <div
          className={view === UserCollectionViewTypes.SINGLES ? "active" : ""}
          onClick={this.changeView.bind(this, UserCollectionViewTypes.SINGLES)}
        >
          单曲
        </div>
        <div
          className={view === UserCollectionViewTypes.ARTICLES ? "active" : ""}
          onClick={this.changeView.bind(this, UserCollectionViewTypes.ARTICLES)}
        >
          专栏
        </div>
        <div
          className={
            view === UserCollectionViewTypes.ARTICLE_TRACKS ? "active" : ""
          }
          onClick={this.changeView.bind(
            this,
            UserCollectionViewTypes.ARTICLE_TRACKS
          )}
        >
          专栏曲目
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
        <UserCollectionVolTracks />
        <UserCollectionSingles />
        <UserCollectionArticles />
        <UserCollectionArticleTracks />
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
