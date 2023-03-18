import {
  renderNavbar,
  renderFooter,
  renderLogOutButton,
  getTokenFromLocalstorage,
  showAlertMessage,
  swicthAlertMessage,
} from "./functions";
import { ProductListController } from "./controllers/productList/productList.controller";

//Seleccionamos el contenedor con el id #app y lo almacenamos en una constante
const appElement = document.querySelector("#app");

/*Pintamos el menu de navegación el footer  
el titulo de la pagina dentro del contenedor con el id #app*/
appElement.innerHTML = `
  ${renderNavbar()}
  <h1 class="pageTitle">Product list</h1>
  <li class="productList"></li>
  ${renderFooter()}
`;
if (getTokenFromLocalstorage()) {
  //Creamos el boton para cerrar sesión
  const logOutButton = renderLogOutButton();
  //Añadimos el boton al contenedor principal
  appElement.append(logOutButton);
}

let count = 0;
let productList = appElement.children[2];
let page = 1;

//instanciamos la clase del controlador
const productListController = new ProductListController(
  productList,
  showAlertMessage(),
  appElement
);

//Función asincrona para ejecutar el controlador de la lista de productos y obtener el listado de productos
const renderProductList = async () => {
  count++;
  //Accedemos a la función getAllProducts para obtener los productos
  await productListController
    .getAllProducts(page)
    .then(() => {
      productListController.getTotalProducts();
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

const renderPagination = () => {
  //Añadimos el componente de paginacion
  const pagination = document.createElement("div");
  pagination.classList = "pagination";
  const buttonPrev = document.createElement("button");
  const buttonNext = document.createElement("button");
  buttonPrev.classList = "btn_paginate";
  buttonNext.classList = "btn_paginate";
  buttonPrev.innerText = "Previous";
  buttonNext.innerText = "Next";
  pagination.append(buttonPrev, buttonNext);
  appElement.append(pagination);

  buttonNext.addEventListener("click", () => {
    if (page < Math.ceil(productListController.totalProducts / 5)) {
      page++;
      productListController.getAllProducts(page);
    }
  });

  buttonPrev.addEventListener("click", () => {
    if (page > 1) {
      page--;
      productListController.getAllProducts(page);
    }
  });
};

renderProductList();
renderPagination();
