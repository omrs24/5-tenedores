import React from "react";
import { View } from "react-native";
import { ListItem, Icon } from "@rneui/base";
import { map } from "lodash";

export function AccountOptions() {
  const menuOptions = getMenuOptions();

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          bottomDivider
          onPress={() => {
            console.log("Click");
          }}
        >
          <Icon
            type={menu.itemType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.itemType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
    </View>
  );
}

function getMenuOptions() {
  return [
    {
      title: "Cambiar Nombre y apellidos",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "account-circle-outline",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
    },
  ];
}
