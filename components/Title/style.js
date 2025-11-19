import { StyleSheet } from "react-native";
import { getFontFamily } from "../../assets/fonts/helper";

export default StyleSheet.create({
  title: {
    color: "#022150",
    fontFamily: getFontFamily("Inter", "700"),  // ✔ Correct usage
    fontSize: 24,
  },
});


