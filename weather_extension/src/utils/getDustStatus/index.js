const getDustStatus = status => {
   switch (status) {
      case `lv1`:
         return "#3b87ff";
      case `lv2`:
         return "#66B266";
      case `lv3`:
         return "yellow";
      case `lv4`:
         return "red";
      default:
         return "black";
   }
};

export default getDustStatus;
