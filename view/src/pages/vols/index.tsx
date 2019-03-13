import * as React from "react";
import { RefObject } from "react";
import { observer } from "mobx-react";
import { volStore } from "../../store";
import { VolItem } from "../../components/vol-item";
import { Pagination } from "../../components/pagination";
import { events, EventTypes } from "../../utils";
import { ViewTypes, VolInfo } from "../../types";
import "./index.scss";
import { Loading } from "../../components/loading";

@observer
class Vols extends React.Component {
  containerRef: RefObject<HTMLDivElement> = React.createRef();

  state = {
    isFetching: true
  };

  componentDidMount(): void {
    events.on(EventTypes.ScrollBackVols, (smooth: boolean = false) => {
      const { current } = this.containerRef;
      if (!current) {
        return;
      }
      if (smooth) {
        current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        current.scrollTo(0, 0);
      }
    });
  }

  renderVols = () => {
    const { displayedItems } = volStore;
    if (!displayedItems) {
      return <Loading />;
    }
    return displayedItems.map((vol: VolInfo) => (
      <VolItem
        key={vol.id}
        id={vol.id}
        cover={vol.cover}
        title={vol.title}
        tags={vol.tags}
        color={vol.color}
        vol={vol.vol}
        isPlaying={false}
        isLiked={false}
      />
    ));
  };

  renderPagination = () => {
    const { pagination } = volStore;
    if (!pagination) return null;
    return <Pagination store={pagination} />;
  };

  render() {
    return (
      <div
        id="vols"
        className={`page show view-${ViewTypes.VOLS}`}
        style={{ zIndex: 1 }}
        ref={this.containerRef}
      >
        {this.renderVols()}
        {this.renderPagination()}
      </div>
    );
  }
}

export { Vols };
