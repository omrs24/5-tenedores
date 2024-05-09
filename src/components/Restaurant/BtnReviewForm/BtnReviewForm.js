import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { styles } from "./BtnReviewForm.styles";

export function BtnReviewForm(props) {
  const { idrestaurant } = props;
  const [hasLogged, setHasLogged] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  return (
    <View>
      {hasLogged ? (
        <Button title="Escribe una opinion" />
      ) : (
        <Text>
          Para escribir una opinion es necesario estar logueado pulsa AQUI para
          iniciar sesion
        </Text>
      )}
    </View>
  );
}
