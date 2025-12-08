import React from "react";
import ITEMS_CONFIG from '../config/ItemConfig';

function FallingItems({item_type, itemX, itemY}) {
  const config = ITEMS_CONFIG[time_type];

  if (!config) {
    console.log(`Unknown item type ${item_type}`);
    return null;

    return <div>{config.emoji}</div>;
  }

}

export default FallingItems;