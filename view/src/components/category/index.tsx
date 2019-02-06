import * as React from 'react';

import All from "../../static/types/All.png";
import RockAndRoll from "../../static/types/Rock&Roll.png";
import Alternative from "../../static/types/Alternative.png";
import Ballad from "../../static/types/Ballad.png";
import Pop from "../../static/types/Pop.png";
import Electronic from "../../static/types/Electronic.png";
import Classical from "../../static/types/Classical.png";
import Jazz from "../../static/types/Jazz.png";
import Metal from "../../static/types/Metal.png";
import Punk from "../../static/types/Punk.png";
import Rap from "../../static/types/Rap.png";
import World from "../../static/types/World.png";
import Atmosphere from "../../static/types/Atmosphere.png";
import Soundtrack from "../../static/types/Soundtrack.png";
import Reggae from "../../static/types/Reggae.png";
import Country from "../../static/types/Country.png";
import Blues from "../../static/types/Blues.png";
import Experimental from "../../static/types/Experimental.png";
import England from "../../static/types/England.png";
import PostRock from "../../static/types/PostRock.png";
import PsychedelicRock from "../../static/types/PsychedelicRock.png";
import DarkWave from "../../static/types/DarkWave.png";
import Mandopop from "../../static/types/Mandopop.png";
import Hardcore from "../../static/types/Hardcore.png";
import PostPunk from "../../static/types/PostPunk.png";

import './index.scss';


const cates: [string, string][] = [
  ["全部", "All"],
  ["摇滚", "Rock&Roll"],
  ["另类", "Alternative"],
  ["民谣", "Ballad"],
  ["流行", "Pop"],
  ["电子", "Electronic"],
  ["古典", "Classical"],
  ["爵士", "Jazz"],
  ["金属", "Metal"],
  ["朋克", "Punk"],
  ["说唱", "Rap"],
  ["世界音乐", "World"],
  ["氛围", "Atmosphere"],
  ["原声", "Soundtrack"],
  ["雷鬼", "Reggae"],
  ["乡村", "Country"],
  ["蓝调", "Blues"],
  ["实验", "Experimental"],
  ["英伦", "England"],
  ["后摇", "PostRock"],
  ["迷幻摇滚", "PsychedelicRock"],
  ["暗潮", "DarkWave"],
  ["华语流行", "Mandopop"],
  ["硬核", "Hardcore"],
  ["后朋克", "PostPunk"]
];


function renderCategoryItem(cate: [string, string]) {
    const [name, type] = cate;
    let img;
    switch (type) {
        case 'All': img = All; break;
        case 'Rock&Roll': img = RockAndRoll; break;
        case 'Alternative': img = Alternative; break;
        case 'Ballad': img = Ballad; break;
        case 'Pop': img = Pop; break;
        case 'Electronic': img = Electronic; break;
        case 'Classical': img = Classical; break;
        case 'Jazz': img = Jazz; break;
        case 'Metal': img = Metal; break;
        case 'Punk': img = Punk; break;
        case 'Rap': img = Rap; break;
        case 'World': img = World; break;
        case 'Atmosphere': img = Atmosphere; break;
        case 'Soundtrack': img = Soundtrack; break;
        case 'Reggae': img = Reggae; break;
        case 'Country': img = Country; break;
        case 'Blues': img = Blues; break;
        case 'Experimental': img = Experimental; break;
        case 'England': img = England; break;
        case 'PostRock': img = PostRock; break;
        case 'PsychedelicRock': img = PsychedelicRock; break;
        case 'DarkWave': img = DarkWave; break;
        case 'Mandopop': img = Mandopop; break;
        case 'Hardcore': img = Hardcore; break;
        case 'PostPunk': img = PostPunk; break;
        default: throw new Error(`Invalid vol type: ${type}`);
    }
    return (
        <div key={type} className="category-item">
          <p className="category-item-name">{name}</p>
          <p className="category-item-type">{type}</p>
          <div className="category-item-bg" style={{
            backgroundImage: `url(${img})`
          }}/>
        </div>
    )
}

function Category() {
  return (
      <div id="vol-types">
          {cates.map(i => renderCategoryItem(i))}
      </div>
  )
}


export {
  Category
}
