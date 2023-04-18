import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
      translation: {
        "email": "Email",
        "password": "Password",
        "repeatPassword": "Xác nhận lại mật khẩu",
        "name": "Name",
        "gender": "Gender",
        "region": "Region",
        "state": "State",
        "rememberMe": "Lưu thông tin đăng nhập",
        "emailRequire": "Vui lòng nhập địa chỉ email",
        "emailInvalid": "Địa chỉ email không hợp lệ",
        "passwordRequire": "Vui lòng nhập mật khẩu",
        "mathPasswordInvalid": "Xác nhận mật khẩu không khớp",
        "minPasswordInvalid": "Mật khẩu tối thiểu 4 ký tự",
        "nameRequire": "Họ và tên không được để trống",
        "genderRequire": "Giới tính không được để trống",
        "regionRequire": "Quốc gia không được để trống",
        "stateRequire": "Thành phố không được để trống",
        "login": "Login",
        "register": "Sign Up"
      }
    },
    vi: {
      translation: {
        "email": "Địa chỉ Email",
        "password": "Mật khẩu",
        "repeatPassword": "Xác nhận lại mật khẩu",
        "name": "Họ và tên",
        "gender": "Giới tính",
        "region": "Quốc gia",
        "state": "Thành phố",
        "rememberMe": "Lưu thông tin đăng nhập",
        "emailRequire": "Vui lòng nhập địa chỉ email",
        "emailInvalid": "Địa chỉ email không hợp lệ",
        "passwordRequire": "Vui lòng nhập mật khẩu",
        "mathPasswordInvalid": "Xác nhận mật khẩu không khớp",
        "minPasswordInvalid": "Mật khẩu tối thiểu 4 ký tự",
        "nameRequire": "Họ và tên không được để trống",
        "genderRequire": "Giới tính không được để trống",
        "regionRequire": "Quốc gia không được để trống",
        "stateRequire": "Thành phố không được để trống",
        "login": "Đăng nhập",
      }
    }
  };
  
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: "vi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
      // if you're using a language detector, do not define the lng option
    
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    });
  
    export default i18n;