import * as React from "react";
import { observer } from "mobx-react";
import { userStore } from "../../store";
import "./index.scss";
import { UserCollectionVols } from "../user-collection-vols";
import {Loading} from "../loading";

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
      <div id="user-collection-container">
        <UserCollectionVols/>
      </div>
    );
  };

  render() {
    const { isFetching } = userStore;
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div id="user-collection">
        {this.renderHeader()}
        {this.renderCollection()}
      </div>
    );
  }
}

export { UserCollection };
