import { LoginModel } from "../../models/login.model";
import { showAlertMessage } from "../../functions";

export class LoginController {
  constructor(username, password) {
    this.token = null;
    this.messageView = null;
    this.userCredentials = {
      username,
      password,
    };
  }

  //Función para autenticar al usuario y validarlo
  async authenticateUser() {
    try {
      const { username, password } = this.userCredentials;
      if ([username, password].includes("")) {
        this.messageView = showAlertMessage(
          "All fields are required!",
          "error"
        );
        return;
      }
      const loginModel = new LoginModel(username, password);
      this.messageView = showAlertMessage("Checking user...!", "loading");
      await loginModel.logIn();
      if (loginModel.error) {
        this.messageView = showAlertMessage(
          loginModel.serverResponse.message,
          "error"
        );
        return;
      }
      this.saveTokenToLocalstorage(loginModel.serverResponse);
      window.location.href = "http://127.0.0.1:5173/";
    } catch (error) {
      console.log(error);
    }
  }

  //Funcion para guardar el token que devuelve la función anterior
  saveTokenToLocalstorage(token) {
    localStorage.setItem("token", token);
  }

  //Funcion para obtener el token del localstorage para validar que el usuario esté autenticado
  getTokenFromLocalstorage() {
    const tokenLS = localStorage.getItem("token");
    if (tokenLS) {
      return JSON.parse(tokenLS);
    }
    return null;
  }

  //Función para cerrar sesión
  logOut() {
    if (this.getTokenFromLocalstorage()) {
      localStorage.removeItem("token");
    }
  }
}
