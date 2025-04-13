import "./Header.css";
import React from "react";

const Header = () => {
  // console.log("header 업데이트");
  return (
    <div className="Header">
      <h3>오늘은 📆</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

export default React.memo(Header); //헤더 리렌더 필요X
