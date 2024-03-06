import React from "react";
import { View } from "react-native";
import { Input } from "@rneui/base";
import { styles } from "./InfoForm.styles";

export function InfoForm(props) {
  const { formik } = props;

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre del restaurante"
        onChangeText={(text) => formik.setFieldValue("name", text)}
        errorMessage={formik.error.name}
      />
      <Input
        placeholder="Direccion"
        onChangeText={(text) => formik.setFieldValue("address", text)}
        errorMessage={formik.error.address}
      />
      <Input
        placeholder="Telefono"
        onChangeText={(text) => formik.setFieldValue("phone", text)}
        errorMessage={formik.error.phone}
      />
      <Input
        placeholder="Email"
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.error.email}
      />
      <Input
        placeholder="Descripcion del restaurante"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChangeText={(text) => formik.setFieldValue("description", text)}
        errorMessage={formik.error.description}
      />
    </View>
  );
}
