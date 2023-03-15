import { SignUpModel } from "../../models/signUp.model";
import { showAlertMessage } from "../../functions";

export class SignUpController {
  constructor(username, password) {
    this.messageView = null;
    this.userCredentials = {
      username,
      password,
    };
  }

  async createUser() {
    try {
      const { username, password } = this.userCredentials;

      if ([username, password].includes("")) {
        this.messageView = showAlertMessage(
          "All fields are required!",
          "error"
        );
        return;
      }

      const signUpModel = new SignUpModel(username, password);
      this.messageView = showAlertMessage("Creating user...!", "loading");

      await signUpModel.signUp();

      if (signUpModel.error) {
        this.messageView = showAlertMessage(
          signUpModel.serverResponse.message,
          "error"
        );
        return;
      }

      this.messageView = showAlertMessage(
        "User created successfully!",
        "success"
      );
    } catch (error) {
      console.log(error);
    }
  }
}
