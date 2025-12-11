import React from "react";
import {ITEM_CONFIG} from '../config/ItemConfig';

function FallingItems({item_type, itemX, itemY}) {
  const config = ITEM_CONFIG[item_type];

  if (!config) {
    console.warn(`Unknown item type ${item_type}`);
    return null;
  }
  const style= {left: itemX,  top: itemY};

  return <div style={style}>{config.emoji}</div>;
}

export default FallingItems;