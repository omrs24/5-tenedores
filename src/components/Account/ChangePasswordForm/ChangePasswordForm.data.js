import * as Yup from "yup";

export function initialValues() {
  return {
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    oldPassword: Yup.string().required("Campo obligatorio"),
    newPassword: Yup.string().required("Campo obligatorio"),
    repeatNewPassword: Yup.string()
      .required("Campo obligatorio")
      .oneOf(
        [Yup.ref("newPassword")],
        "Las nuevas contraseñas tiene que ser iguales"
      ),
  });
}
