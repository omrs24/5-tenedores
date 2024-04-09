import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    description: "",
    phone: "",
    email: "",
    location: null,
    images: [],
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
    location: Yup.object().required("La localizacion es requerida"),
    images: Yup.array()
      .min(1, "Se requiere una imagen como minimo")
      .required("Imagen requerida"),
  });
}
