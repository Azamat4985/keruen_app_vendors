import { StyleSheet } from "react-native";
import { paddingHorizontal, paddingVertical } from "../helpers/sizes";

export const GlobalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontal,
    paddingVertical: paddingVertical
  },
  lightBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: '#212427',
    borderWidth: 1,
  },
  darkBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212427",
    paddingVertical: 15,
    borderRadius: 10,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  textInput: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: "#dadada",
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 10,
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#212427",
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
  smallText: {
    color: "#212427",
    fontFamily: "Rubik-Regular",
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    fontFamily: "Rubik-Medium",
    marginBottom: 30,
  },
});
