import {
  getCurrentPageName,
  renderNavbar,
  renderFooter,
} from "../../functions";

import { LoginController } from "./login.controller";

const currentUrlName = getCurrentPageName();

const loginContainerElement = document.querySelector("#login");

loginContainerElement.innerHTML = `
  ${renderNavbar(currentUrlName)}
  <h1 class="pageTitle">Log in</h1>
  <form class="form" id="formLogin">
    <div class="formInputs">
      <input type="text" placeholder="User name" id="input_user_name" class="input"/>
      <input type="password" placeholder="Password" id="input_password" class="input"/>
    </div>  
    <div class="formOptions">
      <button type="submit" class="btn_login">Log in</button>
      <button type="button" class="btn_signup" onclick="window.location.href='http://127.0.0.1:5173/pages/signUp.html'">Sign up</button>
    </div>
  </form>
  ${renderFooter()}
`;

const form = loginContainerElement.children[2];

const submitFormLogin = async (e) => {
  e.preventDefault();
  const usernameInputValue = form.children[0].children[0].value;
  const passwordInputValue = form.children[0].children[1].value;
  const loginController = new LoginController(
    usernameInputValue,
    passwordInputValue
  );
  await loginController
    .authenticateUser()
    .then(() => {
      loginContainerElement.append(loginController.messageView);
    })
    .finally(() => {
      //Ocultamos la alerta ya que la peticion ya finalizó satisfactoriamente
      setTimeout(() => {
        loginController.messageView.classList = "alertContainer hide";
      }, 1500);
    });
};

form.addEventListener("submit", submitFormLogin);
