import {
  getCurrentPageName,
  renderNavbar,
  renderFooter,
  getTokenFromLocalstorage,
  renderLogOutButton,
  showAlertMessage,
  swicthAlertMessage,
} from "../../functions";
import { ProductDetailsController } from "./productDetails.controller";

const currentUrlName = getCurrentPageName();

const productDetailElement = document.querySelector("#productDetails");

/*Pintamos el menu de navegación el footer y 
el titulo de la pagina dentro del contenedor con el id #productDetails*/
productDetailElement.innerHTML = `
  ${renderNavbar(currentUrlName)}
  <h1 class="pageTitle">Product details</h1>
  ${renderFooter()}
`;

if (getTokenFromLocalstorage()) {
  //Creamos el boton para cerrar sesión
  const logOutButton = renderLogOutButton();
  //Añadimos el boton al contenedor principal
  productDetailElement.append(logOutButton);
}
let count = 0;
const renderProductDetails = async () => {
  count++;
  //Obtenemos el id del producto que viene en la url
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("idProduct");
  //instanciamos las clases de los controladores que usaremos
  const productDetailController = new ProductDetailsController(
    id,
    showAlertMessage()
  );
  //Accedemos a la función getProduct para obtener la info del producto
  await productDetailController
    .getProduct()
    .then(() => {
      //Agregamos la card con los detalles delproducto al contenedor #productDetails
      if (productDetailController.productDetailView) {
        productDetailElement.append(productDetailController.productDetailView);
      }
      const message =
        productDetailController.messageView.children[0].children[0].innerText;
      const alertType =
        productDetailController.messageView.children[0].classList;
      //Para evitar que se creen multiples elementos HTML de alertas
      if (count === 1) {
        //Agregamos la alerta al contenedor #productDetails
        productDetailElement.append(productDetailController.messageView);
      } else {
        swicthAlertMessage("", productDetailElement, message, alertType);
      }
    })
    .finally(() => {
      //Ocultamos la alerta ya que la carga de información del producto ya finalizó satisfactoriamente
      setTimeout(() => {
        swicthAlertMessage("hide", productDetailElement);
      }, 1500);
    });
};

renderProductDetails();
