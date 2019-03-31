import * as React from "react";
import { observer } from "mobx-react";
import { playerStore, searchVolStore } from "../../store";
import { ipcUtils } from "../../utils";
import {PlayingTypes, VolInfo} from "../../types";
import { Pagination } from "../pagination";
import { VolItem } from "../vol-item";
import "./index.scss";
import {Empty} from "../empty";

function renderContent(displayedItems: VolInfo[]) {
    if (displayedItems.length === 0) {
        return <Empty />
    }

    return displayedItems.map(vol => {
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
}

function ISearchResultVol() {
  const { displayedItems, pagination } = searchVolStore;
  return (
    <div id="vol-search-result-content">
      {renderContent(displayedItems)}
      <Pagination store={pagination} />
    </div>
  );
}

const SearchResultVol = observer(ISearchResultVol);

export { SearchResultVol };
