import All from "../static/types/All.png";
import RockAndRoll from "../static/types/Rock&Roll.png";
import Alternative from "../static/types/Alternative.png";
import Ballad from "../static/types/Ballad.png";
import Pop from "../static/types/Pop.png";
import Electronic from "../static/types/Electronic.png";
import Classical from "../static/types/Classical.png";
import Jazz from "../static/types/Jazz.png";
import Metal from "../static/types/Metal.png";
import Punk from "../static/types/Punk.png";
import Rap from "../static/types/Rap.png";
import World from "../static/types/World.png";
import Atmosphere from "../static/types/Atmosphere.png";
import Soundtrack from "../static/types/Soundtrack.png";
import Reggae from "../static/types/Reggae.png";
import Country from "../static/types/Country.png";
import Blues from "../static/types/Blues.png";
import Experimental from "../static/types/Experimental.png";
import England from "../static/types/England.png";
import PostRock from "../static/types/PostRock.png";
import PsychedelicRock from "../static/types/PsychedelicRock.png";
import DarkWave from "../static/types/DarkWave.png";
import Mandopop from "../static/types/Mandopop.png";
import Hardcore from "../static/types/Hardcore.png";
import PostPunk from "../static/types/PostPunk.png";

export enum VolTypes {
  ALL,
  RockAndRoll,
  Alternative,
  Ballad,
  Pop,
  Electronic,
  Classical,
  Jazz,
  Metal,
  Punk,
  Rap,
  World,
  Atmosphere,
  Soundtrack,
  Reggae,
  Country,
  Blues,
  Experimental,
  England,
  PostRock,
  PsychedelicRock,
  DarkWave,
  Mandopop,
  Hardcore,
  PostPunk
}

export type VolTypeItem = {
  name: string;
  type: string;
  img: string;
  value: VolTypes;
};

export const VolTypesList: VolTypeItem[] = [
  {
    name: "全部",
    type: "All",
    img: All,
    value: VolTypes.ALL
  } as VolTypeItem,
  {
    name: "摇滚",
    type: "Rock And Roll",
    img: RockAndRoll,
    value: VolTypes.RockAndRoll
  } as VolTypeItem,
  {
    name: "另类",
    type: "Alternative",
    img: Alternative,
    value: VolTypes.Alternative
  } as VolTypeItem,
  {
    name: "民谣",
    type: "Ballad",
    img: Ballad,
    value: VolTypes.Ballad
  } as VolTypeItem,
  {
    name: "流行",
    type: "Pop",
    img: Pop,
    value: VolTypes.Pop
  } as VolTypeItem,
  {
    name: "电子",
    type: "Electronic",
    img: Electronic,
    value: VolTypes.Electronic
  } as VolTypeItem,
  {
    name: "古典",
    type: "Classical",
    img: Classical,
    value: VolTypes.Classical
  } as VolTypeItem,
  {
    name: "爵士",
    type: "Jazz",
    img: Jazz,
    value: VolTypes.Jazz
  } as VolTypeItem,
  {
    name: "金属",
    type: "Metal",
    img: Metal,
    value: VolTypes.Metal
  } as VolTypeItem,
  {
    name: "朋克",
    type: "Punk",
    img: Punk,
    value: VolTypes.Punk
  } as VolTypeItem,
  { name: "说唱", type: "Rap", img: Rap, value: VolTypes.Rap } as VolTypeItem,
  {
    name: "世界音乐",
    type: "World",
    img: World,
    value: VolTypes.World
  } as VolTypeItem,
  {
    name: "氛围",
    type: "Atmosphere",
    img: Atmosphere,
    value: VolTypes.Atmosphere
  } as VolTypeItem,
  {
    name: "原声",
    type: "Soundtrack",
    img: Soundtrack,
    value: VolTypes.Soundtrack
  } as VolTypeItem,
  {
    name: "雷鬼",
    type: "Reggae",
    img: Reggae,
    value: VolTypes.Reggae
  } as VolTypeItem,
  {
    name: "乡村",
    type: "Country",
    img: Country,
    value: VolTypes.Country
  } as VolTypeItem,
  {
    name: "蓝调",
    type: "Blues",
    img: Blues,
    value: VolTypes.Blues
  } as VolTypeItem,
  {
    name: "实验",
    type: "Experimental",
    img: Experimental,
    value: VolTypes.Experimental
  } as VolTypeItem,
  {
    name: "英伦",
    type: "England",
    img: England,
    value: VolTypes.England
  } as VolTypeItem,
  {
    name: "后摇",
    type: "Post Rock",
    img: PostRock,
    value: VolTypes.PostRock
  } as VolTypeItem,
  {
    name: "迷幻摇滚",
    type: "Psychedelic Rock",
    img: PsychedelicRock,
    value: VolTypes.PsychedelicRock
  } as VolTypeItem,
  {
    name: "暗潮",
    type: "Dark Wave",
    img: DarkWave,
    value: VolTypes.DarkWave
  } as VolTypeItem,
  {
    name: "华语流行",
    type: "Mandopop",
    img: Mandopop,
    value: VolTypes.Mandopop
  } as VolTypeItem,
  {
    name: "硬核",
    type: "Hardcore",
    img: Hardcore,
    value: VolTypes.Hardcore
  } as VolTypeItem,
  {
    name: "后朋克",
    type: "Post Punk",
    img: PostPunk,
    value: VolTypes.PostPunk
  } as VolTypeItem
];
