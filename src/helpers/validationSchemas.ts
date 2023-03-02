import * as Yup from "yup";

export const loginValidation = Yup.object({
  username: Yup.string().required("Please enter your Relationship Manager ID"),
  password: Yup.string().required("Please enter your password"),
});

export const addViewValidation = Yup.object({
  product: Yup.string().required("Please select a product"),
  movement: Yup.string().required("Please select a movement"),
  percentage: Yup.number().max(100).required(),
  confidence: Yup.number().max(100).required(),
});
