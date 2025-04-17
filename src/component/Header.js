import "./Header.css";
import React from "react";

const Header = () => {
  // console.log("header 업데이트");
  return (
    <div className="Header">
      <div className="today">
        <div className="label">TODO LIST</div>
        <div className="date">{new Date().toDateString()}</div>
      </div>
    </div>
  );
};

export default React.memo(Header); //헤더 리렌더 필요X
