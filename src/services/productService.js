function ProductService() {
  this.getListProductApi = function () {
    var promise = axios({
      url: "https://63885e2dd94a7e5040995ee7.mockapi.io/api/product",
      method: "GET",
    });

    return promise;
  };
}
