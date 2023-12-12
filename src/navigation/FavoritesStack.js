import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";

import { FavoritesScreen } from "../screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.favorite.favorites}
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
    </Stack.Navigator>
  );
}
