import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";

import { SearchScreen } from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

export function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.search.searches}
        component={SearchScreen}
        options={{ title: "Search" }}
      />
    </Stack.Navigator>
  );
}
