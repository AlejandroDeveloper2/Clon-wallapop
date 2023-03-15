import {
  getCurrentPageName,
  renderNavbar,
  renderFooter,
} from "../../functions";

import { SignUpController } from "./signUp.controller";

const currentUrlName = getCurrentPageName();

const signUpElement = document.querySelector("#signup");

signUpElement.innerHTML = `
  ${renderNavbar(currentUrlName)}
  <h1 class="pageTitle variantSignUpPage">Sign up</h1>
  <form class="form" >
    <div class="formInputs">
      <input type="text" placeholder="User name" id="input_user_name" class="input"/>
      <input type="password" placeholder="Password" id="input_password" class="input"/>
    </div>  
    <div class="formOptions">
      <button type="submit" class="btn_signup">Create account</button>
      <button type="button" class="btn_login" onclick="window.location.href='http://127.0.0.1:5173/pages/login.html'">Log in</button>
    </div>
  </form>
  ${renderFooter()}
`;

const form = signUpElement.children[2];

const submitFormSignUp = async (e) => {
  e.preventDefault();
  const usernameInputValue = form.children[0].children[0].value;
  const passwordInputValue = form.children[0].children[1].value;
  const signUpController = new SignUpController(
    usernameInputValue,
    passwordInputValue
  );
  await signUpController
    .createUser()
    .then(() => {
      signUpElement.append(signUpController.messageView);
    })
    .finally(() => {
      //Ocultamos la alerta ya que la peticion ya finalizó satisfactoriamente
      setTimeout(() => {
        signUpController.messageView.classList = "alertContainer hide";
      }, 1500);
    });
};

form.addEventListener("submit", submitFormSignUp);
