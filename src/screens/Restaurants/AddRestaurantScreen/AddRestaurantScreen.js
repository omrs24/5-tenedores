import React from "react";
import { ScrollView, Text } from "react-native";
import { Button } from "@rneui/base";
import { Formik, useFormik } from "formik";
import {
  InfoForm,
  UploadImagesForm,
  ImageRestaurant,
} from "../../../components/Restaurants/AddRestaurant";

import { initialValues, validationSchema } from "./AddRestaurantScreen.data";
import { styles } from "./AddRestaurantScreen.styles";

export function AddRestaurantScreen() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />

      <InfoForm formik={formik} />

      <UploadImagesForm formik={formik} />
      <Button
        title="Crear Restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
