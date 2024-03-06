import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    description: "",
    phone: "",
    email: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo requerido"),
    address: Yup.string().required("Campo requerido"),
    phone: Yup.string().required("Campo requerido"),
    email: Yup.string()
      .email("Ingrese un email valido")
      .required("Campo requerido"),
    description: Yup.string().required("Campo requerido"),
  });
}
