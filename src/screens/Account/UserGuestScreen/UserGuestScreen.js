import React from "react";
import { View, ScrollView, ViewBase } from "react-native";
import { Text, Button, Image } from "@rneui/base";
import { styles } from "./UserGuestScreen.styles";

import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function UserGuestScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  return (
    <ScrollView style={styles.content}>
      <Image
        source={require("../../../../assets/img/user-guest.png")}
        style={styles.image}
      />
      <Text style={styles.title}> Consultar tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        ¿Como describirias tu mejor restaurant? Busca y visualiza los mejores
        restaurantes de una fomra sencilla, vota cual te ha gustado mas y
        comenta como ha sido tu experiencia.
      </Text>

      <Button
        title="Ver tu perfil"
        onPress={goToLogin}
        buttonStyle={styles.btnStyle}
      />
    </ScrollView>
  );
}
