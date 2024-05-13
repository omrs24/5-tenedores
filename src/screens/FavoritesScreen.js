import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserNotLogged } from "../components/Favorites/";

export function FavoritesScreen() {
  const auth = getAuth();
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  if (!hasLogged) return <UserNotLogged />;

  return (
    <View>
      <Text>Favorites Screen</Text>
    </View>
  );
}
