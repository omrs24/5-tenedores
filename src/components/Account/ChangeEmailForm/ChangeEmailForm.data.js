import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Formato de correo incorrecto")
      .required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  });
}
