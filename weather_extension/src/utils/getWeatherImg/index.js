import SUNNY from "./../../assets/icons/sun.png";
import CLOUDY from "./../../assets/icons/cloud.png";
import RAINY from "./../../assets/icons/umbrella.png";

const getWeatherImg = element => {
   switch (element) {
      case `맑음`:
         return SUNNY;
      case `흐림`:
         return CLOUDY;
      case `비`:
         return RAINY;
      case `눈`:
         return;
      default:
         return RAINY;
   }
};

export default getWeatherImg;
