import * as React from "react";
// import store from '../../store';
import { Icon, IconTypes } from "../icon";
import LOGO from "../../static/logo.png";
import "./index.scss";

function Nav() {
  return (
    <div id="nav">
      <div id="nav-actions">
        <div>
          <Icon type={IconTypes.BACK} />
          <p>返回</p>
        </div>
        <div>
          <Icon type={IconTypes.SOURCE} />
          <p>来源</p>
        </div>
        <div>
          <Icon type={IconTypes.CATEGORY} />
          <p>分类</p>
        </div>
        <div>
          <Icon type={IconTypes.SEARCH} />
          <p>搜索</p>
        </div>
      </div>
      <img id="nav-logo" src={LOGO} />
      <div id="nav-buttons">
        <div>
          <Icon type={IconTypes.VOL} />
          <p>期刊</p>
        </div>
        <div>
          <Icon type={IconTypes.SINGLE} />
          <p>单曲</p>
        </div>
        <div>
          <Icon type={IconTypes.ARTICLE} />
          <p>文章</p>
        </div>
        <div>
          <Icon type={IconTypes.USER} />
          <p>我的</p>
        </div>
      </div>
    </div>
  );
}

export { Nav };
