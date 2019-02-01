import * as React from "react";
import { observer } from "mobx-react";
import { store } from "../../store";
import { VolItem } from "../../components/vol-item";
import { VolInfo } from "../../types";
import "./index.scss";

@observer
class Vols extends React.Component {
  async componentDidMount() {
    console.log(await store.getVols());
  }

  static renderEmpty = () => {
    return <h1>EMPTY</h1>;
  };

  static renderVols = (vols: VolInfo[]) => {
    return vols.map((vol: VolInfo) => <VolItem key={vol.id} volInfo={vol} />);
  };

  render() {
    const { vols } = store;
    if (!vols.length) {
      return Vols.renderEmpty();
    }
    return <div id="vols">{Vols.renderVols(vols)}</div>;
  }
}

export { Vols };
