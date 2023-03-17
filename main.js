import {
  renderNavbar,
  renderFooter,
  renderLogOutButton,
  getTokenFromLocalstorage,
  showAlertMessage,
  swicthAlertMessage,
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
`;

if (getTokenFromLocalstorage()) {
  //Creamos el boton para cerrar sesión
  const logOutButton = renderLogOutButton();
  //Añadimos el boton al contenedor principal
  appElement.append(logOutButton);
}
let count = 0;

//Función asincrona para ejecutar el controlador de la lista de productos y obtener el listado de productos
const renderProductList = async () => {
  count++;
  //instanciamos la clase del controlador
  const productListController = new ProductListController(
    productList,
    showAlertMessage(),
    appElement
  );
  //Accedemos a la función getAllProducts para obtener los productos
  await productListController
    .getAllProducts()
    .then(() => {
      //Agregamos la lista de productos al contenedor #app
      appElement.append(productListController.productListView);

      const message =
        productListController.messageView.children[0].children[0].innerText;
      const alertType = productListController.messageView.children[0].classList;

      //Agregamos la alerta al contenedor #app
      //Para evitar que se creen multiples alertas
      if (count === 1) {
        appElement.append(productListController.messageView);
      } else {
        swicthAlertMessage("", appElement, message, alertType);
      }
    })
    .finally(() => {
      //Ocultamos la alerta ya que la carga de productos ya finalizó satisfactoriamente
      setTimeout(() => {
        swicthAlertMessage("hide", appElement);
      }, 1500);
    });
};

renderProductList();
