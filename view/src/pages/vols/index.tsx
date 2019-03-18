import * as React from "react";
import { RefObject } from "react";
import { observer } from "mobx-react";
import { collectionVolStore, playerStore, store, volStore } from "../../store";
import { VolItem } from "../../components/vol-item";
import { Pagination } from "../../components/pagination";
import { PlayingStatus, ViewTypes, VolInfo, VolTrack } from "../../types";
import { Loading } from "../../components/loading";
import { Route } from "../../components/route";
import "./index.scss";
import { getIPC } from "../../utils";

const ipc = getIPC();

@observer
class Vols extends React.Component {
  containerRef: RefObject<HTMLDivElement> = React.createRef();

  renderVols = () => {
    const { displayedItems } = volStore;
    if (!displayedItems) {
      return <Loading />;
    }

    const { playingTrack, playingStatus } = playerStore;
    return displayedItems.map((vol: VolInfo) => {
      const { id } = vol;
      const isPlaying = !!(
        playingStatus === PlayingStatus.PLAYING &&
        playingTrack &&
        "volId" in playingTrack &&
        playingTrack.volId === id
      );
      const onToggle = isPlaying
        ? playerStore.pause
        : async () => {
            const trackIds = (await ipc.db.volTrack.find<VolTrack>({
              query: { volId: id },
              projection: { id: 1 }
            })).map(i => i.id);
            playerStore.setPlayingIds(trackIds);
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
          isPlaying={isPlaying}
          isLiked={collectionVolStore.isLiked(id)}
          onToggle={onToggle}
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
