import React from "react";
import './FallingItems.css';
import useItemConfig from '../hooks/useItemConfig';

function FallingItems({type, itemX, itemY}) {

  const config = useItemConfig(type);
  const style= {
    position: "absolute",
    left: itemX, 
    top: itemY
  };

  return <div className="falling_item" style={style}>{config.emoji}</div>;
}

export default FallingItems;