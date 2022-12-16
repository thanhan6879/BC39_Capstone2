function ProductService() {
  this.getListProductApi = function () {
    return axios({
      url: "https://63885e2dd94a7e5040995ee7.mockapi.io/api/product",
      method: "GET",
    });
  };

  this.deleteProductApi = function (id) {
    return axios({
      url: `https://63885e2dd94a7e5040995ee7.mockapi.io/api/product/${id}`,
      method: "DELETE",
    });
  };

  this.addProductApi = function (product) {
    return axios({
      url: "https://63885e2dd94a7e5040995ee7.mockapi.io/api/product",
      method: "POST",
      data: product,
    });
  };

  this.getProductByIdApi = function (id) {
    return axios({
      url: `https://63885e2dd94a7e5040995ee7.mockapi.io/api/product/${id}`,
      method: "GET",
    });
  };
  this.updateProductApi = function (product) {
    return axios({
      url: `https://63885e2dd94a7e5040995ee7.mockapi.io/api/product/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
