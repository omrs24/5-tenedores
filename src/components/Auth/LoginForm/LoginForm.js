import React, { useState } from "react";
import { Text, View } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
import { styles } from "./LoginForm.styles";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
// apenas voy a agregar el envio de datos para el login
import { initialValues, validationSchema } from "./LoginForm.data";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);
        const auth = getAuth();
        console.log(auth);
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.accounts);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Usuario o contraseña incorrectos",
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electronico"
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
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
