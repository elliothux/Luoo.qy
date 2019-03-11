import * as React from "react";
import { observer } from "mobx-react";
import { userStore } from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import "./index.scss";

function IUserCollectionVolTracks() {
  const { isFetching, likedVolTracks } = userStore;

  if (isFetching) {
    return <Loading />;
  }

  if (likedVolTracks.length === 0) {
    return <Empty />;
  }

  return (
    <div id="user-collection-vol-tracks">
      <h1>VolTracks</h1>
    </div>
  );
}

const UserCollectionVolTracks = observer(IUserCollectionVolTracks);

export { UserCollectionVolTracks };
