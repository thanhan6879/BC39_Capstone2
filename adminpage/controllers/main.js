var productService = new ProductService();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  productService
    .getListProductApi()
    .then(function (result) {
      renderHTML(result.data);
      console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();

// // Tạo Validation
function xet(id) {
  var TenSP = getEle("TenSP").value;
  var GiaSP = getEle("GiaSP").value;
  var Screen = getEle("Screen").value;
  var BackCamera = getEle("BackCamera").value;
  var FrontCamera = getEle("FrontCamera").value;
  var HinhSP = getEle("HinhSP").value;
  var MoTa = getEle("MoTa").value;
  var Type = getEle("Type").value;
  console.log(Screen);
  //flag: cờ
  var isValid = true; //hợp lệ
  //Check Validation

  //tenSP
  isValid &= validation.kiemTraRong(
    TenSP,
    "errorTenSP",
    "(*) Vui lòng nhập tên sản phẩm"
  );
  // &&
  // validation.kiemTraChuoiKitu(
  //   TenSP,
  //   "errorTenSP",
  //   "(*) Vui lòng nhập chuỗi kí tự"
  // );

  //Giá
  isValid &= validation.kiemTraRong(
    GiaSP,
    "errorGia",
    "(*) Vui lòng nhập giá!"
  );

  // Màn hình
  isValid &= validation.kiemTraRong(
    Screen,
    "errorScreen",
    "(*) Vui lòng nhập thông tin màn hình!"
  );
  // backCamera
  isValid &= validation.kiemTraRong(
    BackCamera,
    "errorbackCamera",
    "(*) Vui lòng nhập thông tin!"
  );

  // frontCamera
  isValid &= validation.kiemTraRong(
    FrontCamera,
    "errorfrontCamera",
    "(*) Vui lòng nhập thông tin!"
  );

  //Hình ảnh
  isValid &= validation.kiemTraRong(
    HinhSP,
    "errorHinhAnh",
    "(*) Vui lòng nhập hình ảnh!"
  );

  ///Mô Tả
  isValid &= validation.kiemTraRong(
    MoTa,
    "errorMoTa",
    "(*) Vui lòng viết mô tả!"
  );

  // Loại
  isValid &= validation.kiemTraRong(
    Type,
    "errortype",
    "(*) Nhập loại sản phẩm!"
  );

  if (!isValid) return;
  var product = new Product(
    id,
    TenSP,
    GiaSP,
    Screen,
    BackCamera,
    FrontCamera,
    HinhSP,
    MoTa,
    Type
  );
  return product;
}

function renderHTML(data) {
  var content = "";

  data.forEach(function (product, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img width="50px" src="${product.img}"/>
            </td>
            <td>${product.desc}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct('${
                  product.id
                }')">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct('${
                  product.id
                }')">Delete</button>
            </td>
        </tr>
    `;
  });

  getEle("tblDanhSachSP").innerHTML = content;
}

/**
 * Edit Product
 */
function editProduct(id) {
  var title = "Sửa Sản Phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  var button = `<button class="btn btn-warning" onclick="updateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;

  productService
    .getProductByIdApi(id)
    .then(function (result) {
      var product = result.data;
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("Screen").value = product.screen;
      getEle("BackCamera").value = product.backCamera;
      getEle("FrontCamera").value = product.frontCamera;
      getEle("HinhSP").value = product.img;
      getEle("MoTa").value = product.desc;
      getEle("Type").value = product.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update Product
 */
function updateProduct(id) {
  var product = xet(true);
  if (product) {
    var TenSP = getEle("TenSP").value;
    var GiaSP = getEle("GiaSP").value;
    var HinhSP = getEle("HinhSP").value;
    var MoTa = getEle("MoTa").value;
    var Screen = getEle("Screen").value;
    var BackCamera = getEle("BackCamera").value;
    var FrontCamera = getEle("FrontCamera").value;
    var Type = getEle("Type").value;

    var product = new Product(
      id,
      TenSP,
      GiaSP,
      Screen,
      BackCamera,
      FrontCamera,
      HinhSP,
      MoTa,
      Type
    );
    productService
      .updateProductApi(product)
      .then(function () {
        alert("Update Success!");
        getListProduct();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

/**
 * Delete Product
 */
function deleteProduct(id) {
  productService
    .deleteProductApi(id)
    .then(function (result) {
      alert("Delete Success!");
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").onclick = function () {
  var title = "Thêm Sản Phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  var button = `<button class="btn btn-success" onclick="addProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
};

/**
 * Add Product
 */
function addProduct() {
  var product = xet(true);
  if (product) {
    var TenSP = getEle("TenSP").value;
    var GiaSP = getEle("GiaSP").value;
    var HinhSP = getEle("HinhSP").value;
    var MoTa = getEle("MoTa").value;
    var Screen = getEle("Screen").value;
    var BackCamera = getEle("BackCamera").value;
    var FrontCamera = getEle("FrontCamera").value;
    var Type = getEle("Type").value;

    var product = new Product(
      "",
      TenSP,
      GiaSP,
      Screen,
      BackCamera,
      FrontCamera,
      HinhSP,
      MoTa,
      Type
    );

    productService
      .addProductApi(product)
      .then(function (result) {
        alert("Add Success!");
        getListProduct();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
