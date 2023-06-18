import { StyleSheet } from "react-native";
import { paddingHorizontal, paddingVertical } from "../helpers/sizes";

export const GlobalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontal,
    paddingTop: paddingVertical
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
  disabledBtn: {
    opacity: 0.5
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  textInput: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  subtitle: {
    fontSize: 24,
    fontFamily: "Rubik-Medium",
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc'
  },
  optionItem: {
    paddingVertical: 15,
  },
  disabledText: {
    color: "#666666"
  },
  codeInput: {
    width: 60,
    height: 60,
    fontSize: 40,
    borderWidth: 1,
    borderColor: '#dadada',
    borderRadius: 5,
    textAlign: 'center',
  },
  codeFocus: {
    borderWidth: 2,
    borderColor: '#a1a1a1',
  },
});
