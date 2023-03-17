export class ProductDetailsModel {
  constructor(productId) {
    this.productDetails = {};
    this.apiUrl = `http://127.0.0.1:8000/api/products/${productId}`;
    this.error = false;
    this.serverResponse = null;
  }

  getProductDetails() {
    return this.productDetails;
  }

  //Función para obtener la info de un producto en especifico
  async fetchProductDetails() {
    await fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          this.error = true;
        }
        return response.json();
      })
      .then((data) => {
        this.productDetails = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
