import React, { useState } from "react";
import { Text, View } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
//Authentication
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//navigation
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { styles } from "./RegisterForm.styles";
import { initialValues, validationSchema } from "./RegisterForm.data";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepPassword, setShowRepPassword] = useState(false);

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.accounts);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al registrarse, intentelo mas tarde",
        });
        //console.log(error);
      }
    },
  });

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);
  const showHiddenRepPassword = () =>
    setShowRepPassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Input
        placeholder="Corre electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />

      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showRepPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHiddenRepPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />

      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
