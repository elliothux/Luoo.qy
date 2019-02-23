import * as React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { store, volStore } from "../../store";
import { ViewTypes, VolTypes } from "../../types";
import { Icon, IconTypes } from "../icon";
import { events, EventTypes } from "../../utils";
import LOGO from "../../static/logo.png";
import "./index.scss";

function hideClassName(willHide: boolean) {
  return classnames({ "nav-item-hide": willHide });
}

function goVolTypes() {
  events.emit(EventTypes.ScrollBackVolTypes);
  store.changeView(ViewTypes.VOLS_TYPE);
}

function backTimeout(callback: () => void) {
  store.backView();
  return setTimeout(callback, 500);
}

function goVols() {
  if (store.view === ViewTypes.PLAYING) {
    return backTimeout(goVols);
  }
  events.emit(EventTypes.ScrollBackVols);
  store.changeView(ViewTypes.VOLS);
}

function goSingles() {
  if (store.view === ViewTypes.PLAYING) {
    return backTimeout(goSingles);
  }
  events.emit(EventTypes.ScrollBackSingles);
  store.changeView(ViewTypes.SINGLES);
}

function goArticles() {
  if (store.view === ViewTypes.PLAYING) {
    return backTimeout(goArticles);
  }
  events.emit(EventTypes.ScrollBackArticles);
  store.changeView(ViewTypes.ARTICLES);
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
            [ViewTypes.VOLS, ViewTypes.SINGLES, ViewTypes.ARTICLES].includes(
              view
            )
          )}
          onClick={store.backView}
        >
          <Icon type={IconTypes.BACK} />
          <p>返回</p>
        </div>
        <div className={hideClassName(view !== ViewTypes.PLAYING)}>
          <Icon type={IconTypes.SOURCE} />
          <p>来源</p>
        </div>
        <div
          className={hideClassName(view !== ViewTypes.VOLS)}
          onClick={goVolTypes}
        >
          <Icon type={IconTypes.CATEGORY} />
          <p>
            {volStore.volType === VolTypes.ALL
              ? "分类"
              : volStore.volTypeItem.name}
          </p>
        </div>
        <div>
          <Icon type={IconTypes.SEARCH} />
          <p>搜索</p>
        </div>
      </div>
      <img id="nav-logo" src={LOGO} alt="logo" />
      <div id="nav-buttons">
        <div onClick={goVols}>
          <Icon
            type={view === ViewTypes.VOLS ? IconTypes.VOL_SOLID : IconTypes.VOL}
          />
          <p>期刊</p>
        </div>
        <div onClick={goSingles}>
          <Icon
            type={
              view === ViewTypes.SINGLES
                ? IconTypes.SINGLE_SOLID
                : IconTypes.SINGLE
            }
          />
          <p>单曲</p>
        </div>
        <div onClick={goArticles}>
          <Icon
            type={
              view === ViewTypes.ARTICLES
                ? IconTypes.ARTICLE_SOLID
                : IconTypes.ARTICLE
            }
          />
          <p>专栏</p>
        </div>
        <div>
          <Icon type={IconTypes.USER} />
          <p>我的</p>
        </div>
      </div>
    </div>
  );
}

const Nav = observer(INav);

export { Nav };
