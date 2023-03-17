import { ProductDetailsModel } from "../../models/productDetails.model";
import { renderProductDetailsCard, setAlertViewType } from "../../functions";

export class ProductDetailsController {
  //Definimos el constructor de la clase con sus propiedades
  constructor(productId, messageView) {
    //Instanciamos el modelo para poder acceder a sus propiedades y metodos
    this.productDetailsModel = new ProductDetailsModel(productId);
    this.productDetailView = null;
    this.messageView = messageView;
  }

  /*Metodo para obtener la información de un producto espesifico del modelo 
  y una vez obtenido lo mostramos el la view productDetailView 
  para posteriormente mostrarlo en la vista*/
  async getProduct() {
    try {
      setAlertViewType(this.messageView, "Loading product data....", "loading");
      await this.productDetailsModel.fetchProductDetails();
      const data = this.productDetailsModel.getProductDetails();
      if (!this.productDetailsModel.error) {
        if (Object.keys(data).length > 0) {
          let productDetailsCard = renderProductDetailsCard(data);
          this.productDetailView = productDetailsCard;
          setAlertViewType(
            this.messageView,
            "Product data has been loaded successfully!",
            "success"
          );
        }
      } else {
        setAlertViewType(
          this.messageView,
          "An error has been ocurred!",
          "error"
        );
      }
    } catch (error) {
      setAlertViewType(this.messageView, error, "error");
    }
  }
}
