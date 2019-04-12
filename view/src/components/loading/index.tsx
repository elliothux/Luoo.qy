import * as React from "react";
import "./index.scss";

interface LoadingProps {
  id?: string;
}
function Loading(props: LoadingProps) {
  return (
    <div className="loading" id={props.id || ""}>
      Loading
    </div>
  );
}

export { Loading };
