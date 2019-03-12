import * as React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { playerStore, store, volStore } from "../../store";
import { Icon, IconTypes } from "../icon";
import { events, EventTypes } from "../../utils";
import { ViewTypes, VolType } from "../../types";
import LOGO from "../../static/logo.png";
import "./index.scss";

function hideClassName(willHide: boolean) {
  return classnames({ "nav-item-hide": willHide });
}

function goVolTypes() {
  events.emit(EventTypes.ScrollBackVolTypes);
  store.changeView(ViewTypes.VOLS_TYPE);
}

function goVols() {
  if (store.view === ViewTypes.PLAYING) {
    store.backView(goVols);
  }
  events.emit(EventTypes.ScrollBackVols);
  store.changeView(ViewTypes.VOLS);
}

function goSingles() {
  if (store.view === ViewTypes.PLAYING) {
    store.backView(goSingles);
  }
  events.emit(EventTypes.ScrollBackSingles);
  store.changeView(ViewTypes.SINGLES);
}

function goArticles() {
  if (store.view === ViewTypes.PLAYING) {
    store.backView(goArticles);
  }
  events.emit(EventTypes.ScrollBackArticles);
  store.changeView(ViewTypes.ARTICLES);
}

function goUser() {
  if (store.view === ViewTypes.PLAYING) {
    store.backView(goUser);
  }
  events.emit(EventTypes.ScrollBackUser);
  store.changeView(ViewTypes.USER);
}

function INav() {
  const { view } = store;
  return (
    <div
      id="nav"
      style={{
        opacity: view === ViewTypes.VOLS_TYPE ? 0 : 1
      }}
    >
      <div id="nav-actions">
        <div
          className={hideClassName(
            [
              ViewTypes.VOLS,
              ViewTypes.SINGLES,
              ViewTypes.ARTICLES,
              ViewTypes.USER
            ].includes(view)
          )}
          onClick={store.backView}
        >
          <Icon type={IconTypes.BACK} />
          <p>返回</p>
        </div>
        <div
          className={hideClassName(view !== ViewTypes.PLAYING)}
          onClick={playerStore.goToPlayingSource}
        >
          <Icon type={IconTypes.SOURCE} />
          <p>来源</p>
        </div>
        <div
          className={hideClassName(view !== ViewTypes.VOLS)}
          onClick={goVolTypes}
        >
          <Icon type={IconTypes.CATEGORY} />
          <p>
            {volStore.volType === VolType.All
              ? "分类"
              : volStore.volTypeItem.name}
          </p>
        </div>
        <div>
          <Icon type={IconTypes.SEARCH} />
          <p>搜索</p>
        </div>
        <div
          className={hideClassName(
            [ViewTypes.VOLS, ViewTypes.SINGLES, ViewTypes.ARTICLES].includes(
              view
            )
          )}
        >
          <Icon type={IconTypes.SHARE} />
          <p>分享</p>
        </div>
      </div>
      <img id="nav-logo" src={LOGO} alt="logo" />
      <div id="nav-buttons">
        <div onClick={goVols}>
          <Icon
            type={
              view === ViewTypes.VOLS || view === ViewTypes.VOL_INFO
                ? IconTypes.VOL_SOLID
                : IconTypes.VOL
            }
          />
          <p>期刊</p>
        </div>
        <div onClick={goSingles}>
          <Icon
            type={
              view === ViewTypes.SINGLES || view === ViewTypes.SINGLE_INFO
                ? IconTypes.SINGLE_SOLID
                : IconTypes.SINGLE
            }
          />
          <p>单曲</p>
        </div>
        <div onClick={goArticles}>
          <Icon
            type={
              view === ViewTypes.ARTICLES || view === ViewTypes.ARTICLE_INFO
                ? IconTypes.ARTICLE_SOLID
                : IconTypes.ARTICLE
            }
          />
          <p>专栏</p>
        </div>
        <div onClick={goUser}>
          <Icon
            type={
              view === ViewTypes.USER ? IconTypes.USER_SOLID : IconTypes.USER
            }
          />
          <p>我的</p>
        </div>
      </div>
    </div>
  );
}

const Nav = observer(INav);

export { Nav };
