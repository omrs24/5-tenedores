import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Input } from "@rneui/base";
import { MapForm } from "../MapForm";
import { styles } from "./InfoForm.styles";

export function InfoForm(props) {
  const { formik } = props;
  const [showMap, setShowMap] = useState(false);
  const [mapColor, setMapColor] = useState("#c2c2c2");

  const toggleMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del restaurante"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
          rightIcon={{
            type: "material-community",
            name: "map-marker-radius",
            color: mapColor,
            onPress: toggleMap,
          }}
        />
        <Input
          placeholder="Direccion"
          onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
        />
        <Input
          placeholder="Telefono"
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Descripcion del restaurante"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />
      </View>
      <MapForm show={showMap} close={toggleMap} formik={formik} />
    </>
  );
}
