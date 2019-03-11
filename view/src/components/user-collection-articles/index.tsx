import * as React from "react";
import { observer } from "mobx-react";
import { userStore } from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import "./index.scss";

function IUserCollectionArticles() {
  const { isFetching, likedVolTracks } = userStore;

  if (isFetching) {
    return <Loading />;
  }

  if (likedVolTracks.length === 0) {
    return <Empty />;
  }

  return (
    <div id="user-collection-articles">
      <h1>VolTracks</h1>
    </div>
  );
}

const UserCollectionArticles = observer(IUserCollectionArticles);

export { UserCollectionArticles };
