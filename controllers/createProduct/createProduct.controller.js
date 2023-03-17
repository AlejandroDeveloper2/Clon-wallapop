import { CreateProductModel } from "../../models/createProduct.model";
import {
  setAlertViewType,
  getTokenFromLocalstorage,
  parseJwt,
} from "../../functions";

export class CreateProductController {
  constructor(data, messageView) {
    this.data = data;
    this.messageView = messageView;
  }

  //Función para guardar un producto nuevo y actualizar el DOM
  async saveProduct() {
    try {
      const token = getTokenFromLocalstorage();
      const creator = parseJwt(token).username;
      const { productPhoto, name, description, price, type } = this.data;

      if ([name, description, price, type].includes("")) {
        setAlertViewType(this.messageView, "All fields are required!", "error");
        return;
      }
      setAlertViewType(this.messageView, "Saving product...!", "loading");
      const createProductModel = new CreateProductModel(
        productPhoto,
        name,
        description,
        price,
        type,
        creator
      );
      await createProductModel.createNewProduct();
      if (createProductModel.error) {
        setAlertViewType(
          this.messageView,
          createProductModel.serverResponse,
          "error"
        );
        return;
      }
      setAlertViewType(
        this.messageView,
        "Product has been created successfully!",
        "success"
      );
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
}
