import React from "react";
import {ITEM_CONFIG} from '../config/ItemConfig';

function FallingItems({type, itemX, itemY}) {
  const config = ITEM_CONFIG[type];

  if (!config) {
    console.warn(`Unknown item type ${type}`);
    return null;
  }
  const style= {
    position: "absolute",
    left: itemX, 
    top: itemY
  };

  return <div style={style}>{config.emoji}</div>;
}

export default FallingItems;