import { StyleSheet, Text, View } from "react-native";

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LA BÀN THẦY TUẤN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    marginHorizontal: 16,
    marginTop: 24,
  },
  text: {
    color: "#7B5C26",
    fontSize: 20,
    fontFamily: "UTM Impact",
    backgroundColor: "#FEC41F",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default CustomHeader;
