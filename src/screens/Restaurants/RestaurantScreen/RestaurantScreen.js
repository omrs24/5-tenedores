import React, { useEffect, useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { Carousel, Loading } from "../../../components/Shared";
import { db } from "../../../utils";
import { styles } from "./RestaurantScreen.styles";

const { width } = Dimensions.get("window");

export function RestaurantScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);

    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  if (!restaurant) return <Loading show text="Cargando Restaurantes" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel images={restaurant.images} height={250} width={width} />
    </ScrollView>
  );
}
