import SUNNY from "./../../assets/icons/sun.png";
import smallCLOUDY from "./../../assets/icons/cloud_sm.png";
import bigCLOUDY from "./../../assets/icons/cloud_bg.png";
import smallRAINY from "./../../assets/icons/rain_sm.png";
import bigRAINY from "./../../assets/icons/rain_bg.png";

const getWeatherImg = (element, size) => {
   switch (element) {
      case `맑음`:
         return SUNNY;
      case `흐림`:
         return size === "small" ? smallCLOUDY : bigCLOUDY;
      case `비`:
         return size === "small" ? smallRAINY : bigRAINY;
      case `눈`:
         return;
      default:
         return RAINY;
   }
};

export default getWeatherImg;
