import React, { useState, useEffect } from "react";
import { Icon } from "@rneui/base";
import { View } from "react-native";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import { v4 as uuid } from "uuid";
import { size, forEach } from "lodash";
import { styles } from "./BtnFavorite.styles";
import Toast from "react-native-toast-message";

export function BtnFavorite(props) {
  const { idRestaurant } = props;
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [isReload, setIsReaload] = useState(undefined);
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavorites();
      console.log("Size of response: " + size(response));
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
  }, [idRestaurant, isReload]);

  const onReload = () => setIsReaload((prevState) => !prevState);

  const getFavorites = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", idRestaurant),
      where("idUser", "==", auth.currentUser.uid)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const addFavorite = async () => {
    try {
      const idFavorite = uuid();
      const data = {
        id: idFavorite,
        idRestaurant,
        idUser: auth.currentUser.uid,
      };

      await setDoc(doc(db, "favorites", idFavorite), data);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await getFavorites();
      forEach(response, async (item) => {
        await deleteDoc(doc(db, "favorites", item.id));
      });
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      {isFavorite !== undefined && (
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          onPress={isFavorite ? removeFavorite : addFavorite}
        />
      )}
    </View>
  );
}
