import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/base";
import { useFormik } from "formik";
import {
  getAuth,
  updateEmail,
  signOut,
  EmailAuthProvider,
  EmailAuthCredential,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { styles } from "./ChangeEmailForm.styles";
import { initialValues, validationSchema } from "./ChangeEmailForm.data";
import Toast from "react-native-toast-message";

export function ChangeEmailForm(props) {
  const { onClose, onReload } = props;
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  async function firebaseEmailReset(user, email) {
    try {
      await verifyBeforeUpdateEmail(user, email);
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );
        //await firebaseEmailReset(currentUser, formValue.email);
        await reauthenticateWithCredential(currentUser, credentials);

        /*Toast.show({
          type: "info",
          position: "top",
          text1: "Verificar correo elecronico",
        });*/
        await updateEmail(currentUser, formValue.email);

        onReload();
        onClose();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el email",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nuevo email"
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
