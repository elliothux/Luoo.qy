import * as React from "react";
import {RefObject} from "react";
import {observer} from "mobx-react";
import {collectionVolStore, playerStore, store, volStore} from "../../store";
import {VolItem} from "../../components/vol-item";
import {Pagination} from "../../components/pagination";
import {PlayingTypes, ViewTypes, VolInfo} from "../../types";
import {Loading} from "../../components/loading";
import {Route} from "../../components/route";
import "./index.scss";
import {ipcUtils, scrollToTop} from "../../utils";


@observer
class Vols extends React.Component {
  containerRef: RefObject<HTMLDivElement> = React.createRef();

  componentDidMount(): void {
    volStore.pagination.onChangePage(() => scrollToTop(this.containerRef.current));
    volStore.onChangeVolType(() => scrollToTop(this.containerRef.current, false));
  }

  renderVols = () => {
    const { displayedItems } = volStore;
    if (!displayedItems) {
      return <Loading />;
    }

    return displayedItems.map((vol: VolInfo) => {
      const { id } = vol;

      const onPlay = async () => {
        const ids = await ipcUtils.getTrackIdsByVolId(id);
        playerStore.setPlayingIds(ids, null, PlayingTypes.VOL, vol.id);
      };

      return (
        <VolItem
          key={vol.id}
          id={vol.id}
          cover={vol.cover}
          title={vol.title}
          tags={vol.tags}
          color={vol.color}
          vol={vol.vol}
          isPlaying={playerStore.isVolPlaying(id)}
          onPlay={onPlay}
        />
      );
    });
  };

  render() {
    return (
      <Route
        currentView={store.view}
        view={ViewTypes.VOLS}
        id="vols"
        getRef={this.containerRef}
      >
        {this.renderVols()}
        <Pagination store={volStore.pagination} />
      </Route>
    );
  }
}

export { Vols };
