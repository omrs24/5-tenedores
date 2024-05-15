import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text, SearchBar, ListItem, Avatar, Icon } from "@rneui/base";
import { Loading } from "../components/Shared";

export function SearchScreen() {
  const [searchResults, setSearchResults] = useState(null);
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
}
