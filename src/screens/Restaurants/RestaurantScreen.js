import React from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/base";
import { screen } from "../../utils";

//  Navigation props solo en Pantallas, a niveles mas bajos (Componentes) no se pasan esos paraemtros
export function RestaurantScreen(props) {
  const { navigation } = props;

  const goToAddRestaurant = () => {
    //  Para navergar a screens dentro de un mismo stack
    //navigation.navigate(screen.restaurant.addRestaurant);

    //  Para navergar a screens dentro de un stack distinto
    navigation.navigate(screen.account.tab, {
      screen: screen.account.accounts,
    });
  };

  return (
    <View>
      <Text>Estamos en la screen Restaurant</Text>

      <Button title="Crear restaurante" onPress={goToAddRestaurant} />
    </View>
  );
}
