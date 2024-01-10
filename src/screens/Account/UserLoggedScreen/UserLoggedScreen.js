import React from "react";
import { View } from "react-native";
import { Button } from "@rneui/base";
import { getAuth, signOut } from "firebase/auth";
import { InfoUser } from "../../../components/Account";
import { styles } from "./UserLoggedScreen.styles";

export function UserLoggedScreen() {
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.content}>
      <InfoUser />

      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btnStyle}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />
    </View>
  );
}
