
import React from 'react';
import store from '../../store';

import './index.scss';

import LOGO from '../../static/logo.png';
import VOL from '../../static/vol.svg';
import SINGLE from '../../static/single.svg';
import ARTICLE from '../../static/article.svg';
import AVATAR from '../../static/fake-avatar.jpeg';


function Nav() {
  return (
    <div id="nav">
      <img id="nav-logo" src={LOGO} />
      <div id="nav-buttons">
        <div>
          <img src={VOL} />
          <p>期刊</p>
        </div>
        <div>
          <img src={SINGLE} />
          <p>单曲</p>
        </div>
        <div>
          <img src={ARTICLE} />
          <p>文章</p>
        </div>
      </div>
      <div id="nav-user">
        <img src={AVATAR} />
        <p>抖腿侠</p>
      </div>
    </div>
  )
}

export default Nav;
