import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./RestaurantFavorite.styles";
import { Icon, Image } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { db, screen } from "../../../utils";
// import { BtnFavorite } from "../../Restaurant";

export function RestaurantFavorite(props) {
  const { restaurants } = props;
  const navigation = useNavigation();

  const goToRestaurant = (restaurant) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurant.id,
      },
    });
  };

  const onRemoveFavorite = async (restaurant) => {
    try {
      await deleteDoc(doc(db, "favorites", restaurant.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FlatList
      data={restaurants}
      renderItem={(doc) => {
        console.log(doc);
        const restaurant = doc.item;

        return (
          <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
            <View style={styles.content}>
              <Image
                source={{ uri: restaurant.images[0] }}
                style={styles.image}
              />

              <View style={styles.infoContent}>
                <Text style={styles.name}>{restaurant.name}</Text>
              </View>

              <Icon
                type="material-community"
                name="heart"
                color="#f00"
                size={35}
                containerStyle={styles.iconContainer}
                onPress={() => onRemoveFavorite(restaurant)}
              />

              {/* <BtnFavorite idRestaurant={restaurant.id} /> */}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
