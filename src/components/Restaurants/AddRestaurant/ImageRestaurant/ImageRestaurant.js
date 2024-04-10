import React from "react";
import { View } from "react-native";
import { Image } from "@rneui/base";
import { styles } from "./ImageRestaurant.styles";

export function ImageRestaurant(props) {
  const { formik } = props;

  const primaryImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/img/ImageNotFound.jpg")
        }
        style={styles.image}
      />
    </View>
  );
}
