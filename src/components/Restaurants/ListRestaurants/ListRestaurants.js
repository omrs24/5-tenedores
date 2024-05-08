import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image } from "@rneui/base";
import { styles } from "./ListRestaurants.styles";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function ListRestaurants(props) {
  const { restaurants } = props;
  const navigation = useNavigation();

  const goToRestaurant = (restaurant) => {
    //Porque estamos en el mismo stack
    navigation.navigate(screen.restaurant.restaurant, { id: restaurant.id });
  };

  return (
    <FlatList
      data={restaurants}
      renderItem={(doc) => {
        const restaurant = doc.item.data();
        console.log(restaurant);
        return (
          <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
            <View style={styles.restaurant}>
              <Image
                source={{ uri: restaurant.images[0] }}
                style={styles.image}
              />

              <View>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Text style={styles.info}>{restaurant.address}</Text>
                <Text style={styles.info}>{restaurant.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
