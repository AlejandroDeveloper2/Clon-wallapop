import "../styles/navStyles.css";
import "../styles/footerStyles.css";
import "../styles/alertMessage.css";
import "../styles/productCard.css";

//Función para optener el nombre de la pagina actual
const getCurrentPageName = () => {
  return location.href.split("/")[4];
};

//Función para renderizar el menu de navegación en cada pagina de la web
const renderNavbar = (currentUrlName) => {
  //Variable para validar si la pagina actual es login.html
  const isCurrentPageLogin = currentUrlName === "login.html" ? true : false;
  const isCurrentPageSignUp = currentUrlName === "signUp.html" ? true : false;
  return `
    <nav class="navigation">
      <a class="logo" href="/">Clon Wallapop</a> 
      <li class="options">
        <a class="link" href="${
          isCurrentPageLogin || isCurrentPageSignUp
            ? "/"
            : "http://127.0.0.1:5173/pages/login.html"
        }">
          ${
            isCurrentPageLogin || isCurrentPageSignUp
              ? "Go back"
              : "Log in or Sign up"
          }
        </a>${
          isCurrentPageLogin || isCurrentPageSignUp
            ? ""
            : "<a class='link variant'>Add product</a>"
        }
      </li>
    </nav> 
  `;
};

//Función para renderizar el pie de pagina en cada pagina de la web
const renderFooter = () => {
  return `
    <footer class="footerPage">
      <p class="copyright">Derechos reservados©</p>          
    </footer>
  `;
};

//Función para renderizar los mensajes de exito y error de la web
const showAlertMessage = (message, type = "success") => {
  const alertMessageContainer = document.createElement("div");
  const alertMessage = document.createElement("div");
  const messageText = document.createElement("span");
  alertMessageContainer.classList = "alertContainer";
  alertMessage.classList =
    type === "success"
      ? "alertSuccess"
      : type === "error"
      ? "alertError"
      : "alertLoading";
  messageText.classList = "message";
  alertMessage.append(messageText);
  messageText.append(message);
  alertMessageContainer.append(alertMessage);
  if (message !== "") return alertMessageContainer;
  return "";
};

//Función para renderizar las card con la información de los productos o anuncios
const renderProductCard = (productData = {}) => {
  const { productPhoto, name } = productData;
  const card = document.createElement("div");
  const cardHead = document.createElement("div");
  const cardImage = document.createElement("img");
  const cardBody = document.createElement("div");
  const text = document.createElement("span");
  card.classList = "card";
  cardHead.classList = "cardHead";
  cardImage.classList = "productPhoto";
  cardBody.classList = "cardBody";
  text.classList = "text";
  cardImage.alt = name;
  cardImage.src = productPhoto;

  cardHead.append(cardImage);
  card.append(cardHead);
  cardBody.append(text);
  text.append(name);
  card.append(cardBody);

  return card;
};

//Función para renderizar una imagen que le indique al usuario que no hay productos para listar
const renderEmptyProductList = () => {
  const emptyContainer = document.createElement("div");
  const emptyImage = document.createElement("img");
  const emptyText = document.createElement("span");
  emptyContainer.classList = "emptyContainer";
  emptyImage.classList = "empty";
  emptyImage.alt = "Empty list";
  emptyImage.src = "../public/images/empty.png";
  emptyText.append("There're not any products to show!");
  emptyContainer.append(emptyImage);
  emptyContainer.append(emptyText);
  return emptyContainer;
};

export {
  getCurrentPageName,
  renderNavbar,
  renderFooter,
  showAlertMessage,
  renderProductCard,
  renderEmptyProductList,
};
