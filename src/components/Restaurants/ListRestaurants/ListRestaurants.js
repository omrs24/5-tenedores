import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image } from "@rneui/base";
import { styles } from "./ListRestaurants.styles";

export function ListRestaurants(props) {
  const { restaurants } = props;

  const goToRestaurant = (restaurant) => {
    console.log("Ir al " + restaurant.name);
  };

  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={(doc) => {
          const restaurant = doc.item.data();
          console.log(restaurant);
          return (
            <TouchableOpacity
              onPress={() => goToRestaurant(restaurant)}
            ></TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
