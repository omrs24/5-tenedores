import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { ListRestaurants } from "../../../components/Restaurants";
import { screen, db } from "../../../utils";
import { styles } from "./RestaurantsScreen.styles";

//  Navigation props solo en Pantallas, a niveles mas bajos (Componentes) no se pasan esos paraemtros
export function RestaurantsScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  });

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  const goToAddRestaurant = () => {
    //  Para navergar a screens dentro de un mismo stack
    //navigation.navigate(screen.restaurant.addRestaurant);

    //  Para navegar a screens dentro de un stack distinto
    //navigation.navigate(screen.account.tab, {screen: screen.account.accounts,});
    navigation.navigate(screen.restaurant.addRestaurant);
  };

  return (
    <View style={styles.content}>
      {!restaurants ? (
        <View>
          <LoadingModal show text="Cargando" />
          <Text>Sin informacion</Text>
        </View>
      ) : (
        <ListRestaurants restaurants={restaurants} />
      )}

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
