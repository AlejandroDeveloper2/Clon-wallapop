import {
  renderNavbar,
  renderFooter,
  renderEmptyProductList,
} from "./functions";
import { ProductListController } from "./controllers/productList/productList.controller";

//Creamos un elemento li para la lista de productos
const productList = document.createElement("li");
productList.classList = "productList";

//Seleccionamos el contenedor con el id #app y lo almacenamos en una constante
const appElement = document.querySelector("#app");

/*Pintamos el menu de navegación el footer y 
el titulo de la pagina dentro del contenedor con el id #app*/
appElement.innerHTML = `
  ${renderNavbar()}
  <h1 class="pageTitle">Product list</h1>
  ${renderFooter()}
  <button type="button" class="btn_add_new_product">
    Add product
  </button>
`;

//Función asincrona para ejecutar el controlador de la lista de productos y obtener el listado de productos
const renderProductList = async () => {
  //instanciamos la clase del controlador
  const productListController = new ProductListController();
  //Accedemos a la función getAllProducts para obtener los productos
  await productListController
    .getAllProducts()
    .then(() => {
      /*Accedemos a la propiedad productListView que es un array 
      que contiene los elementos productCard con la información 
      de cada producto y añadimos esta lista al contenedor correspondiente
      Validamos si el array viene vacio o con datos
      */
      if (productListController.productListView.length > 0) {
        productListController.productListView.forEach((productCard) => {
          productList.append(productCard);
        });
      } else {
        productList.append(renderEmptyProductList());
      }
      //Agregamos la lista de productos al contenedor #app
      appElement.append(productList);
      //Agregamos la alerta al contenedor #app
      appElement.append(productListController.messageView);
    })
    .finally(() => {
      //Ocultamos la alerta ya que la carga de productos ya finalizó satisfactoriamente
      setTimeout(() => {
        productListController.messageView.classList = "alertContainer hide";
      }, 1500);
    });
};

renderProductList();
