import * as yup from "yup";
// const nameRegExp =
//   /^[А-ЯЁA-Z][а-яёa-z]*([-][А-ЯЁA-z][а-яёa-z]*)?\s[А-ЯЁA-Z][а-яёa-z]*$/;
const langRegExp = /([a-zA-Z])/;
const lowercaseRegExp = /(?=.*[a-z])/;
const uppercaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

const RegisterFormSchema = yup.object().shape({
  password: yup
    .string()
    .required("Обязательное поле")
    .min(6, "Пароль должен содержать не менее 6-ти символов")
    .test(
      "PASSWORD",
      "Пароль не должен содержать '12345'",
      (value) => value !== "12345"
    )
    .matches(
      lowercaseRegExp,
      "Пароль должен содержать хотя-бы одну маленькую букву"
    )
    .matches(
      uppercaseRegExp,
      "Пароль должен содержать хотя-бы одну большую букву"
    )
    .matches(numericRegExp, "Пароль должен содержать хотя-бы одну цифру"),
  email: yup
    .string()
    .required("Обязательное поле")
    .matches(emailRegExp, "Email должен быть формата 'dM007@tw.com'"),
  lastName: yup
    .string()
    .required("Обязательное поле")
    .min(1, "Минимум 1 букву"),
  firstName: yup
    .string()
    .required("Обязательное поле")
    .min(1, "Минимум 1 букву"),
  login: yup
    .string()
    .required("Обязательное поле")
    .min(5, "Минимум 5 букв максимум 16")
    .matches(
      lowercaseRegExp,
      "Логин должен содержать хотя-бы одну маленькую букву"
    )
    .matches(
      uppercaseRegExp,
      "Логин должен содержать хотя-бы одну большую букву"
    )
    .max(16, "Максимум 16 букв")
    .matches(langRegExp, "Только латинские буквы"),
});

const LoginFormSchema = yup.object().shape({
  password: yup
    .string()
    .required("Обязательное поле")
    .min(6, "Пароль должен содержать не менее 6-ти символов")
    .test(
      "PASSWORD",
      "Пароль не должен содержать '12345'",
      (value) => value !== "12345"
    )
    .matches(
      lowercaseRegExp,
      "Пароль должен содержать хотя-бы одну маленькую букву"
    )
    .matches(
      uppercaseRegExp,
      "Пароль должен содержать хотя-бы одну большую букву"
    )
    .matches(numericRegExp, "Пароль должен содержать хотя-бы одну цифру"),
  email: yup
    .string()
    .required("Обязательное поле")
    .matches(emailRegExp, "Email должен быть формата 'dM007@tw.com'"),
});

const ChangeEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Обязательное поле")
    .matches(emailRegExp, "Email должен быть формата 'dM007@tw.com'"),
});

export { RegisterFormSchema, LoginFormSchema, ChangeEmailSchema };
