import { ProductListModel } from "../../models/productList.model";
import { showAlertMessage, renderProductCard } from "../../functions";

export class ProductListController {
  //Definimos el constructor de la clase con sus propiedades
  constructor() {
    //Instanciamos el modelo para poder acceder a sus propiedades y metodos
    this.productListModel = new ProductListModel();
    this.productListView = [];
    this.messageView = null;
  }

  /*Metodo para obtener todos los productos del modelo 
  y una vez obtenidos añadirlos a un array de cards 
  para posteriormente mostrarlos en la vista*/
  async getAllProducts() {
    try {
      this.messageView = showAlertMessage("Loading products....", "loading");
      await this.productListModel.fetchProducts();
      const data = this.productListModel.getProductList();
      if (!this.productListModel.error) {
        if (data.length > 0) {
          data.forEach((item) => {
            let productCard = renderProductCard(item);
            this.productListView.push(productCard);
          });
          this.messageView = showAlertMessage(
            "Products has been loaded successfully!",
            "success"
          );
        }
      } else {
        this.messageView = showAlertMessage(
          "An error has been ocurred!",
          "error"
        );
      }
    } catch (error) {
      this.messageView = showAlertMessage(error, "error");
    }
  }
}
