import * as React from "react";
import { observer } from "mobx-react";
import {
  collectionTrackStore,
  playerStore,
  singleStore,
  store
} from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { PlayingTypes, ViewTypes } from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import { ipcUtils } from "../../utils";
import "./index.scss";

function formatDate(date: number): string {
  const d = date.toString();
  return `${d.slice(0, 4)}/${d.slice(4, 6)}/${d.slice(6, 8)}`;
}

function formatRecommender(recommender: string): string {
  if (!recommender.trim()) return "LUO";
  return recommender.replace(/-/g, "").trim();
}

@observer
class Single extends React.Component {
  private static get id(): ID {
    const { displayedItem: single } = singleStore;
    return single ? single.id : 0;
  }

  private static get isPlaying(): boolean {
    const { id } = Single;
    return id ? playerStore.isTrackPlaying(id) : false;
  }

  private static get isLiked(): boolean {
    const { id } = Single;
    return id ? collectionTrackStore.isLiked(id) : false;
  }

  private static get isFetchingLike(): boolean {
    const { id } = Single;
    return id ? collectionTrackStore.isFetchingLike(id) : false;
  }

  private static onTogglePlay = async () => {
    if (Single.isPlaying) {
      return playerStore.pause();
    }

    const ids = await ipcUtils.getSingleIds();
    playerStore.setPlayingIds(ids, Single.id, PlayingTypes.SINGLE);
  };

  private static onToggleLike = () => {
    if (Single.isFetchingLike) {
      return;
    }
  };

  private static renderLoading = () => (
    <Route currentView={store.view} view={ViewTypes.SINGLE_INFO} id="single">
      <Loading />
    </Route>
  );

  public render() {
    const { displayedItem: single } = singleStore;

    if (!single) {
      return Single.renderLoading();
    }

    return (
      <Route currentView={store.view} view={ViewTypes.SINGLE_INFO} id="single">
        <div
          id="single-bg"
          style={{
            backgroundImage: `url(${single.cover})`
          }}
        />
        <div id="single-bg-mask" />
        <div id="single-info">
          <p id="single-info-name">
            {single.name}
            <Icon type={IconTypes.DOWNLOAD}/>
            <Icon
              type={
                Single.isFetchingLike
                  ? IconTypes.LOADING
                  : Single.isLiked
                    ? IconTypes.LIKED
                    : IconTypes.LIKE
              }
              onClick={Single.onToggleLike}
              animate
              preventDefault
            />
            <Icon
              preventDefault
              type={Single.isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
              onClick={Single.onTogglePlay}
            />
          </p>
          <p id="single-info-artist">{single.artist}</p>
          <div
            id="single-info-desc"
            dangerouslySetInnerHTML={{
              __html: single.desc
            }}
          />
          <div id="single-info-date">
            <Icon type={IconTypes.LOGO} />
            <span id="single-info-recommender">
              推荐人：
              {formatRecommender(single.recommender)} ·{" "}
            </span>
            <span id="single-info-date">{formatDate(single.date)}</span>
          </div>
        </div>
      </Route>
    );
  }
}

export { Single };
