import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: 550,
  },
  mapActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  btnMapContainerSave: {
    marginRight: 5,
    width: "45%",
    borderRadius: 10,
  },
  btnMapSave: {
    backgroundColor: "#00a680",
  },
  btnMapContainerCancel: {
    marginLeft: 5,
    width: "45%",
    borderRadius: 10,
  },
  btnMapCancel: {
    backgroundColor: "#a60d0d",
  },
});
