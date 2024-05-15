import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { RestaurantRanking } from "../components/Restaurants/";
import { size } from "lodash";
import { db } from "../utils";
import { RestaurantFavorite } from "../components/Favorites";
import { Text } from "@rneui/base";

export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  return (
    <View>
      <RestaurantRanking restaurants={restaurants} />
    </View>
  );
}
