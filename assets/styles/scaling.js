import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";

const {width, height} = Dimensions.get('window');

const isSmall = width <= 375 && !DeviceInfo.hasNotch();

const guidelineBaseWidth = () => {   //minimum amount of width needed
    if(isSmall)
        return 330;
    return 350
};

const horizontalScale = (size) =>  (width / guidelineBaseWidth()) * size;      //function will be used anytime when we want to scale horizontal values like paddingHorizontal etc.

const guidelineBaseHeight = () => {   //minimum amount of height needed
    if(isSmall)
        return 550;
    else if (width > 410)
        return 620;
    return 680;
};

const verticalScale = (size) => (height / guidelineBaseHeight()) * size;                       //function will be used anytime when we want to scale vertical/height values like height etc.
       
const guideLineBaseFonts = () => {
    if(width > 410)
        return 430;
    return 400;
};

const scaleFontSize = (size) => Math.round((width /guideLineBaseFonts())*size); //function will be used anytime when we want to scale font Sizes

export {horizontalScale, scaleFontSize, verticalScale};