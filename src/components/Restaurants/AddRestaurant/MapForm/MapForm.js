import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Toast from "react-native-toast-message";
import { Modal } from "../../../Shared";
import { styles } from "./MapForm.styles";

export function MapForm(props) {
  const { show, close } = props;

  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Debes activar la localizacion en ajustes.",
        });
        return;
      }

      const locationTemp = await Location.getCurrentPositionAsync({});
      console.log(locationTemp);
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    };
  }, []);

  return (
    <Modal show={show} close={close}>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={location}
          showsUserLocation={true}
          style={styles.mapStyle}
        ></MapView>
      </View>
    </Modal>
  );
}
