import React from "react";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./Map.styles";

export function Map(props) {
  const { location, name } = props;

  return (
    <MapView
      initialRegion={location}
      style={styles.content}
      showsMyLocationButton={true}
      showsUserLocation={true}
    >
      <Marker coordinate={location} />
    </MapView>
  );
}
