import {ITEM_CONFIG} from '../config/ItemConfig';


const useItemConfig = (type) =>{
  const config = ITEM_CONFIG[type];

  if (!config) {
    console.warn(`Unknown item type ${type}`);
    return null;
  }

  return config;
}
export default useItemConfig;
  
