import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { screen } from "../../../utils";
import { styles } from "./RestaurantScreen.styles";

//  Navigation props solo en Pantallas, a niveles mas bajos (Componentes) no se pasan esos paraemtros
export function RestaurantScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  });

  const goToAddRestaurant = () => {
    //  Para navergar a screens dentro de un mismo stack
    //navigation.navigate(screen.restaurant.addRestaurant);

    //  Para navergar a screens dentro de un stack distinto
    //navigation.navigate(screen.account.tab, {screen: screen.account.accounts,});
    navigation.navigate(screen.restaurant.addRestaurant);
  };

  return (
    <View style={styles.content}>
      <Text>Estamos en la screen Restaurant</Text>

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
}
