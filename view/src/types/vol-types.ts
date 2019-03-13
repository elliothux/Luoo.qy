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
  name: string;
  img: string;
};

export const VolTypesMap = new Map<VolType, VolTypeItem>([
  [
    VolType.All,
    {
      name: "全部",
      img: All
    } as VolTypeItem
  ],
  [
    VolType.RockAndRoll,
    {
      name: "摇滚",
      img: RockAndRoll
    } as VolTypeItem
  ],
  [
    VolType.Alternative,
    {
      name: "另类",
      img: Alternative
    } as VolTypeItem
  ],
  [
    VolType.Ballad,
    {
      name: "民谣",
      img: Ballad
    } as VolTypeItem
  ],
  [
    VolType.Pop,
    {
      name: "流行",
      img: Pop
    } as VolTypeItem
  ],
  [
    VolType.Electronic,
    {
      name: "电子",
      img: Electronic
    } as VolTypeItem
  ],
  [
    VolType.Classical,
    {
      name: "古典",
      img: Classical
    } as VolTypeItem
  ],
  [
    VolType.Jazz,
    {
      name: "爵士",
      img: Jazz
    } as VolTypeItem
  ],
  [
    VolType.Metal,
    {
      name: "金属",
      img: Metal
    } as VolTypeItem
  ],
  [
    VolType.Punk,
    {
      name: "朋克",
      img: Punk
    } as VolTypeItem
  ],
  [
    VolType.Rap,
    {
      name: "说唱",
      img: Rap
    } as VolTypeItem
  ],
  [
    VolType.World,
    {
      name: "世界音乐",
      img: World
    } as VolTypeItem
  ],
  [
    VolType.Atmosphere,
    {
      name: "氛围",
      img: Atmosphere
    } as VolTypeItem
  ],
  [
    VolType.Soundtrack,
    {
      name: "原声",
      img: Soundtrack
    } as VolTypeItem
  ],
  [
    VolType.Reggae,
    {
      name: "雷鬼",
      img: Reggae
    } as VolTypeItem
  ],
  [
    VolType.Country,
    {
      name: "乡村",
      img: Country
    } as VolTypeItem
  ],
  [
    VolType.Blues,
    {
      name: "蓝调",
      img: Blues
    } as VolTypeItem
  ],
  [
    VolType.Experimental,
    {
      name: "实验",
      img: Experimental
    } as VolTypeItem
  ],
  [
    VolType.England,
    {
      name: "英伦",
      img: England
    } as VolTypeItem
  ],
  [
    VolType.PostRock,
    {
      name: "后摇",
      img: PostRock
    } as VolTypeItem
  ],
  [
    VolType.PsychedelicRock,
    {
      name: "迷幻摇滚",
      img: PsychedelicRock
    } as VolTypeItem
  ],
  [
    VolType.DarkWave,
    {
      name: "暗潮",
      img: DarkWave
    } as VolTypeItem
  ],
  [
    VolType.Mandopop,
    {
      name: "华语流行",
      img: Mandopop
    } as VolTypeItem
  ],
  [
    VolType.Hardcore,
    {
      name: "硬核",
      img: Hardcore
    } as VolTypeItem
  ],
  [
    VolType.PostPunk,
    {
      name: "后朋克",
      img: PostPunk
    } as VolTypeItem
  ]
]);
