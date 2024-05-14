import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { size } from "lodash";
import { db } from "../utils";

export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);

  console.log(size(restaurants));

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
      <Text>RankingScreen</Text>
    </View>
  );
}
