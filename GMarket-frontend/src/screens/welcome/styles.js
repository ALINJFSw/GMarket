import { StyleSheet } from "react-native";
import { COLORS } from "../../contansts/colors";

export default style = StyleSheet.create({
    container : {
        backgroundColor: COLORS.main,
        flex: 1,
        justifyContent: "center",
        alignItems : "center"
    },

    logo: {
        width : 600,
        height : 400
    }
})