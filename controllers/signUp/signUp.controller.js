import { SignUpModel } from "../../models/signUp.model";
import { setAlertViewType } from "../../functions";

export class SignUpController {
  constructor(username, password, messageView) {
    this.messageView = messageView;
    this.userCredentials = {
      username,
      password,
    };
  }
  async createUser() {
    try {
      const { username, password } = this.userCredentials;
      if ([username, password].includes("")) {
        setAlertViewType(this.messageView, "All fields are required!", "error");
        return;
      }
      const signUpModel = new SignUpModel(username, password);
      setAlertViewType(this.messageView, "Creating user...!", "loading");
      await signUpModel.signUp();
      if (signUpModel.error) {
        setAlertViewType(
          this.messageView,
          signUpModel.serverResponse.message,
          "error"
        );
        return;
      }
      setAlertViewType(
        this.messageView,
        "User created successfully!",
        "success"
      );
    } catch (error) {
      console.log(error);
    }
  }
}
