import React from "react";
import { AirbnbRating, Text, Image, Icon } from "@rneui/base";
import { View, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./RestaurantRanking.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function RestaurantRanking(props) {
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

  const renderMedal = (index) => {
    if (index > 2) return null;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <FlatList
      data={restaurants}
      renderItem={(doc) => {
        const restaurant = doc.item.data();
        return (
          <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
            <View style={styles.content}>
              <Image
                source={{ uri: restaurant.images[0] }}
                style={styles.image}
              />

              <View style={styles.infoContent}>
                <View style={styles.nameContent}>
                  {renderMedal(doc.index)}
                  <Text style={styles.name}>{restaurant.name}</Text>
                </View>
                <AirbnbRating
                  size={15}
                  isDisabled={true}
                  defaultRating={restaurant.ratingMedia}
                  showRating={false}
                />
              </View>
              <Text style={styles.description}>{restaurant.description}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
