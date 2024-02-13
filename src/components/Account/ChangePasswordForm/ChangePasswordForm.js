import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/base";
import { styles } from "./ChangePasswordForm.styles";
import { useFormik } from "formik";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  EmailAuthCredential,
  reauthenticateWithCredential,
} from "firebase/auth";
import { initialValues, validationSchema } from "./ChangePasswordForm.data";
import Toast from "react-native-toast-message";

export function ChangePasswordForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const { onClose } = props;
  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;

        const credentials = EmailAuthProvider.credential(
          currentUser.emaill,
          formValue.oldPassword
        );

        reauthenticateWithCredential(currentUser, credentials);

        await updatePassword(currentUser, formValue.newPassword);

        onClose();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar la contraseña",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("oldPassword", text)}
        errorMessage={formik.errors.oldPassword}
      />
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
        errorMessage={formik.errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
