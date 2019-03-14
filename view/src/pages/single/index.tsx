import * as React from "react";
import { observer } from "mobx-react";
import { singleStore, store } from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { ViewTypes } from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import "./index.scss";

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
          <Icon type={IconTypes.LIKE} />
          <Icon
              preventDefault
              type={IconTypes.PLAY}
          />
          {/*{playerStore.isSinglePlaying(single.id) ? (*/}
            {/*<Icon*/}
              {/*preventDefault*/}
              {/*type={IconTypes.PAUSE}*/}
              {/*onClick={playerStore.pause}*/}
            {/*/>*/}
          {/*) : (*/}
            {/*<Icon*/}
              {/*preventDefault*/}
              {/*type={IconTypes.PLAY}*/}
              {/*onClick={() => playerStore.playSingle(single.id)}*/}
            {/*/>*/}
          {/*)}*/}
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
