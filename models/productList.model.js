export class ProductListModel {
  constructor() {
    this.productList = [];
    this.apiUrl = "http://127.0.0.1:8000/api/products";
    this.error = false;
  }

  //getter y setters para acceder a la lista de producto devuelta por la peticion http a la APi
  getProductList() {
    return this.productList;
  }

  setProductList(productList) {
    this.productList = productList;
  }

  //Función que hace la petición get a la APi para obtener todos los productos
  async fetchProducts() {
    await fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          this.error = true;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setProductList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
