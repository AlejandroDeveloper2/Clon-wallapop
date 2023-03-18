export class ProductListModel {
  constructor() {
    this.productList = [];
    this.apiUrl = "http://127.0.0.1:8000/api/products";
    this.error = false;
    this.serverResponse = null;
  }

  //getter y setters para acceder a la lista de producto devuelta por la peticion http a la APi
  getProductList() {
    return this.productList;
  }

  setProductList(productList) {
    this.productList = productList;
  }

  //Función que hace la petición get a la APi para obtener todos los productos
  async fetchProducts(page = null) {
    this.apiUrl = page
      ? `http://127.0.0.1:8000/api/products?_page=${page}&_limit=5`
      : "http://127.0.0.1:8000/api/products";
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

  //Función para borrar un producto
  async deleteProduct(id, token) {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    this.apiUrl = `http://127.0.0.1:8000/api/products/${id}`;
    await fetch(this.apiUrl, options)
      .then((response) => {
        if (!response.ok) {
          this.error = true;
        }
        return response.json();
      })
      .then((result) => {
        if (this.error) {
          this.serverResponse = result.message;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (this.error) {
      return "error";
    }
    return "ok";
  }
}
