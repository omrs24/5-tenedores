import React, { useState, useEffect } from "react";
import { TouchableNativeFeedback, View } from "react-native";
import { Text, Button } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { screen, db } from "../../../utils";
import { styles } from "./BtnReviewForm.styles";

export function BtnReviewForm(props) {
  const { idRestaurant } = props;
  const [hasLogged, setHasLogged] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", idRestaurant),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) setHasReviewed(true);
      });
    }
  }, [hasLogged]);

  const goToLogin = () => {
    //console.log("Ir al login");

    navigation.navigate(screen.account.tab, {
      screen: screen.account.login,
    });
  };

  const goToAddReview = () => {
    navigation.navigate(screen.restaurant.addReviewRestaurant, {
      idRestaurant,
    });
  };

  if (hasLogged && hasReviewed) {
    return (
      <View style={styles.content}>
        <Text style={styles.textSendReview}>Ya has enviado un review</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button
          title="Escribe una opinion"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={() => goToAddReview()}
        />
      ) : (
        <Text style={styles.text} onPress={() => goToLogin()}>
          Para escribir una opinion es necesario estar logueado.
          <Text style={styles.textClick}>Iniciar sesion.</Text>
        </Text>
      )}
    </View>
  );
}
