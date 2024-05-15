import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, SearchBar, ListItem, Avatar, Icon } from "@rneui/base";
import { Loading } from "../components/Shared";
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { size, map } from "lodash";
import { db, screen } from "../utils";
import { useNavigation } from "@react-navigation/native";

export function SearchScreen() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();

  const goToRestaurant = (restaurant) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurant.id,
      },
    });
  };

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      setSearchResults(querySnapshot.docs);
    })();
  }, [searchText]);

  return (
    <>
      <SearchBar
        placeholder="Buscar restaurante"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {!searchResults && <Loading show text="Cargando" />}

      <ScrollView>
        {size(searchResults == 0) ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>Sin resultados</Text>
          </View>
        ) : (
          map(searchResults, (item) => {
            const data = item.data();

            return (
              <ListItem
                key={data.id}
                bottomDivider
                onPress={() => goToRestaurant(data)}
                TouchableOpacity
              >
                <Avatar source={{ uri: data.images[0] }} rounded />
                <ListItem.Content style={{ paddingLeft: 15 }}>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
}
