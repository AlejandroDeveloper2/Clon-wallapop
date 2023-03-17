import { ProductListModel } from "../../models/productList.model";
import {
  renderProductCard,
  getTokenFromLocalstorage,
  setAlertViewType,
  renderEmptyProductList,
  swicthAlertMessage,
} from "../../functions";

export class ProductListController {
  //Definimos el constructor de la clase con sus propiedades
  constructor(productListView, messageView, appElementView) {
    //Instanciamos el modelo para poder acceder a sus propiedades y metodos
    this.productListModel = new ProductListModel();
    this.productListView = productListView;
    this.messageView = messageView;
    this.appElementView = appElementView;
    this.data = [];
  }

  /*Metodo para obtener todos los productos del modelo 
  y una vez obtenidos añadirlos a un array de cards 
  para posteriormente mostrarlos en la vista*/
  async getAllProducts() {
    try {
      setAlertViewType(this.messageView, "Loading products...", "loading");

      await this.productListModel.fetchProducts();
      const data = this.productListModel.getProductList();
      if (!this.productListModel.error) {
        if (data.length > 0) {
          this.data = data;
          data.forEach((item) => {
            let productCard = renderProductCard({
              ...item,
              removeProduct: () => this.removeProduct(item.id),
            });
            this.productListView.append(productCard);
          });

          setAlertViewType(
            this.messageView,
            "Products has been loaded successfully!",
            "success"
          );
        } else {
          this.productListView = renderEmptyProductList();
        }
      } else {
        setAlertViewType(
          this.messageView,
          "An error ocurred during the products loading!",
          "error"
        );
      }
    } catch (error) {
      setAlertViewType(this.messageView, error, "error");
    }
  }

  /*Metodo para eliminar un producto especifico por su id y una ves 
  eliminado actualiza la interfaz de lista de productos*/
  async removeProduct(id) {
    try {
      const deleting = this.showConfirmPrompt();
      const token = getTokenFromLocalstorage();
      if (deleting) {
        const res = await this.productListModel.deleteProduct(id, token);
        if (res === "ok") {
          this.data = this.data.filter((item) => item.id !== id);
          if (this.data.length === 0) {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
          for (
            let index = 0;
            index < this.productListView.children.length;
            index++
          ) {
            const card = this.productListView.children[index];
            if (
              parseInt(card.children[1].children[0].children[0].innerText) ===
              id
            ) {
              this.productListView.removeChild(card);
              //Configuramos la alerta
              setAlertViewType(
                this.messageView,
                "Product has been deleted successfully!",
                "success"
              );
              break;
            }
          }
        } else {
          setAlertViewType(
            this.messageView,
            this.productListModel.serverResponse,
            "error"
          );
        }
        const message = this.messageView.children[0].children[0].innerText;
        const alertType = this.messageView.children[0].classList;

        //Mostrar la alerta
        swicthAlertMessage("", this.appElementView, message, alertType);
        //Ocultamos la alerta
        setTimeout(() => {
          swicthAlertMessage("hide", this.appElementView);
        }, 1500);
      }
    } catch (error) {
      setAlertViewType(this.messageView, error, "error");
    }
  }

  showConfirmPrompt() {
    let text = "are you sure to delete this product?";
    if (confirm(text) == true) return true;
    return false;
  }
}
