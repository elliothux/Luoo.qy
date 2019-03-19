import * as React from "react";
import { observer } from "mobx-react";
import {collectionTrackStore, playerStore, singleStore, store} from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { PlayingTypes, ViewTypes } from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import "./index.scss";
import { ipcUtils } from "../../utils";

let coverRef: HTMLDivElement;

function getCoverRef(i: Maybe<HTMLImageElement>) {
  coverRef = i as HTMLDivElement;
}

function formatDate(date: number): string {
  const d = date.toString();
  return `${d.slice(0, 4)}/${d.slice(4, 6)}/${d.slice(6, 8)}`;
}

function formatRecommender(recommender: string): string {
  if (!recommender.trim()) return "LUO";
  return recommender.replace(/-/g, "").trim();
}

function ISingle() {
  const { displayedItem: single } = singleStore;

  if (!single) {
    return (
      <Route currentView={store.view} view={ViewTypes.SINGLE_INFO} id="single">
        <Loading />
      </Route>
    );
  }

  const { id } = single;
  const isPlaying = playerStore.isTrackPlaying(id);
  const isLiked = collectionTrackStore.isLiked(id);

  const onPlay = async () => {
    const ids = await ipcUtils.getSingleIds();
    playerStore.setPlayingIds(ids, id, PlayingTypes.SINGLE);
  };

  return (
    <Route currentView={store.view} view={ViewTypes.SINGLE_INFO} id="single">
      <div
        id="single-bg"
        ref={getCoverRef}
        style={{
          backgroundImage: `url(${single.cover})`
        }}
      />
      <div id="single-bg-mask" />
      <div id="single-info">
        <p id="single-info-name">
          {single.name}
          <Icon type={isLiked ? IconTypes.LIKED : IconTypes.LIKE} />
          <Icon
            preventDefault
            type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
            onClick={isPlaying ? playerStore.pause : onPlay}
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
          <span id="vol-info-recommender">
            推荐人：
            {formatRecommender(single.recommender)} ·{" "}
          </span>
          <span id="vol-info-date">{formatDate(single.date)}</span>
        </div>
      </div>
    </Route>
  );
}

const Single = observer(ISingle);

export { Single };
