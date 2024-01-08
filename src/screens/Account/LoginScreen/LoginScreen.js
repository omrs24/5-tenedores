import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Image } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth";
import { screen } from "../../../utils";
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    // Al navegar en un mismo stack no es necesario pasar el nombre del stack y luego la screen
    navigation.navigate(screen.account.register);
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <LoginForm />

        <Text style={styles.textRegister}>
          ¿Aun no tienes cuenta?{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Registrarse
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
