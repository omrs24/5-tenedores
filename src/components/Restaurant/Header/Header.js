import React from "react";
import { View } from "react-native";

import { Text, AirbnbRating } from "@rneui/base";
import { styles } from "./Header.styles";

export function Header(props) {
  const { restaurant } = props;

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <AirbnbRating
          size={20}
          count={5}
          isDisabled={true}
          defaultRating={restaurant.ratingMedia ?? 0}
          showRating={false}
        />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
