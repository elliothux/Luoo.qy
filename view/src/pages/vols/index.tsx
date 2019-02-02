import * as React from "react";
import { observer } from "mobx-react";
import { store } from "../../store";
import { VolItem } from "../../components/vol-item";
import { Pagination } from "../../components/pagination";
import { VolInfo } from "../../types";
import "./index.scss";

@observer
class Vols extends React.Component {
  static renderEmpty = () => {
    return <h1>EMPTY</h1>;
  };

  static renderVols = (vols: VolInfo[]) => {
    return vols.map((vol: VolInfo) => <VolItem key={vol.id} volInfo={vol} />);
  };

  render() {
    const { displayVols } = store;
    if (!displayVols.length) {
      return Vols.renderEmpty();
    }
    return (
      <div id="vols">
        {Vols.renderVols(displayVols)}
        <Pagination />
      </div>
    );
  }
}

export { Vols };
