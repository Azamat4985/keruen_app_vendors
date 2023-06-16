import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const paddingVertical = deviceHeight * 0.05;
export const paddingHorizontal = deviceWidth * 0.1;
