import * as React from "react";
import { observer } from "mobx-react";
import {collectionVolStore, playerStore} from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import {PlayingTypes, VolInfo} from "../../types";
import { VolItem } from "../vol-item";
import { Pagination } from "../pagination";
import "./index.scss";
import {ipcUtils} from "../../utils";

function renderVols(vols: VolInfo[]) {
  return vols.map(vol => {
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
            isLiked={true}
            onPlay={onPlay}
        />
    )
  });
}

function IUserCollectionVols() {
  const { displayedItems, isFetching, pagination } = collectionVolStore;

  if (isFetching) {
    return <Loading />;
  }

  if (displayedItems.length === 0) {
    return <Empty />;
  }

  return (
    <div id="user-collection-vols">
      {renderVols(displayedItems)}
      <Pagination store={pagination} />
    </div>
  );
}

const UserCollectionVols = observer(IUserCollectionVols);

export { UserCollectionVols };
