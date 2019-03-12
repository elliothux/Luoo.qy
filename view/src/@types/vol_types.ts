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

export enum VolType {
  All = "All",
  RockAndRoll = "RockAndRoll",
  Alternative = "Alternative",
  Ballad = "Ballad",
  Pop = "Pop",
  Electronic = "Electronic",
  Classical = "Classical",
  Jazz = "Jazz",
  Metal = "Metal",
  Punk = "Punk",
  Rap = "Rap",
  World = "World",
  Atmosphere = "Atmosphere",
  Soundtrack = "Soundtrack",
  Reggae = "Reggae",
  Country = "Country",
  Blues = "Blues",
  Experimental = "Experimental",
  England = "England",
  PostRock = "PostRock",
  PsychedelicRock = "PsychedelicRock",
  DarkWave = "DarkWave",
  Mandopop = "Mandopop",
  Hardcore = "Hardcore",
  PostPunk = "PostPunk"
}

export type VolTypeItem = {
  type: VolType;
  name: string;
  img: string;
};

export const VolTypesList: VolTypeItem[] = [
  {
    name: "全部",
    img: All,
    type: VolType.All
  } as VolTypeItem,
  {
    name: "摇滚",
    img: RockAndRoll,
    type: VolType.RockAndRoll
  } as VolTypeItem,
  {
    name: "另类",
    img: Alternative,
    type: VolType.Alternative
  } as VolTypeItem,
  {
    name: "民谣",
    img: Ballad,
    type: VolType.Ballad
  } as VolTypeItem,
  {
    name: "流行",
    img: Pop,
    type: VolType.Pop
  } as VolTypeItem,
  {
    name: "电子",
    img: Electronic,
    type: VolType.Electronic
  } as VolTypeItem,
  {
    name: "古典",
    img: Classical,
    type: VolType.Classical
  } as VolTypeItem,
  {
    name: "爵士",
    img: Jazz,
    type: VolType.Jazz
  } as VolTypeItem,
  {
    name: "金属",
    img: Metal,
    type: VolType.Metal
  } as VolTypeItem,
  {
    name: "朋克",
    img: Punk,
    type: VolType.Punk
  } as VolTypeItem,
  {
    name: "说唱",
    img: Rap,
    type: VolType.Rap
  } as VolTypeItem,
  {
    name: "世界音乐",
    img: World,
    type: VolType.World
  } as VolTypeItem,
  {
    name: "氛围",
    img: Atmosphere,
    type: VolType.Atmosphere
  } as VolTypeItem,
  {
    name: "原声",
    img: Soundtrack,
    type: VolType.Soundtrack
  } as VolTypeItem,
  {
    name: "雷鬼",
    img: Reggae,
    type: VolType.Reggae
  } as VolTypeItem,
  {
    name: "乡村",
    img: Country,
    type: VolType.Country
  } as VolTypeItem,
  {
    name: "蓝调",
    img: Blues,
    type: VolType.Blues
  } as VolTypeItem,
  {
    name: "实验",
    img: Experimental,
    type: VolType.Experimental
  } as VolTypeItem,
  {
    name: "英伦",
    img: England,
    type: VolType.England
  } as VolTypeItem,
  {
    name: "后摇",
    img: PostRock,
    type: VolType.PostRock
  } as VolTypeItem,
  {
    name: "迷幻摇滚",
    img: PsychedelicRock,
    type: VolType.PsychedelicRock
  } as VolTypeItem,
  {
    name: "暗潮",
    img: DarkWave,
    type: VolType.DarkWave
  } as VolTypeItem,
  {
    name: "华语流行",
    img: Mandopop,
    type: VolType.Mandopop
  } as VolTypeItem,
  {
    name: "硬核",
    img: Hardcore,
    type: VolType.Hardcore
  } as VolTypeItem,
  {
    name: "后朋克",
    img: PostPunk,
    type: VolType.PostPunk
  } as VolTypeItem
];
