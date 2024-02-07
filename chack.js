
// let iconCart= document.querySelector('.icon-cart');
// let closeCart= document.querySelector('.close');
// let body= document.querySelector('body');
let listProductHTML= document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span')
let listProducts=[];
let carts = [];

listProductCheckHTML.addEventListener('click',(event) => {
  let positionClick = event .target;
  if(positionClick.classList.contains('addCart')){
      let product_id = positionClick.parentElement.dataset.id;

      addToCart(product_id);

  }
})
const addToCart = (product_id) => {
  let positionThisProductCart =carts.findIndex((value) => value.product_id == product_id) ;
if(carts.length <= 0){
  carts = [
      {
      product_id: product_id,
      quantity: 1
      }
  ]
  
}else if (positionThisProductCart < 0){
  carts.push({
      product_id:product_id,
      quantity: 1
  });
}else{
  carts[positionThisProductCart].quantity = carts[positionThisProductCart].quantity + 1;
}
addCartToHTML();
addCartToMemory();

}
const addCartToMemory = () => {
localStorage.setItem('cart', JSON.stringify(carts));
}
const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totlaQuantity = 0;
  if(carts.length > 0){
      carts.forEach(cart => {
          totlaQuantity = totlaQuantity + cart.quantity;
          let newCart = document.createElement('div');
          newCart.classList.add('item');
          newCart.dataset.id = cart.product_id;
          let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
          let info = listProducts[positionProduct];
          if(info){
          newCart.innerHTML = `
          <div class="image">
                  <img src="${info.image}" alt="image" width="100px;">
                  </div><!-- /image -->
                  <div class="name">
                  ${info.name}
                  </div><!-- /name -->
                  <div class="totalPrice">
                  ${info.price * cart.quantity}
                  </div><!-- /totalPrice -->
                  <div class="quantity">
                      <span class="minus"><</span>
                      <span>${cart.quantity}</span>
                      <span class="plus">></span>
                  </div><!-- /quantity-->
              </div><!-- /item -->` ;
              listCartHTML.appendChild(newCart);
          }
      });
  }
  iconCartSpan.innerText = totlaQuantity;
  };




  const checkoutButton = document.getElementById('checkout');
  checkoutButton.addEventListener('click', () => {
    // تخزين المنتجات المحددة في localStorage
    localStorage.setItem('selectedProducts', JSON.stringify(carts));
  
    // انتقل إلى الصفحة الجديدة
    window.location.href = 'checkout.html';
  });













// const showProductsButton = document.getElementById('.showProductsButton');
// showProductsButton.addEventListener('click', showProductList);

// const showProductList = () => {
//     // Store the list of products in localStorage
//     localStorage.setItem('productList', JSON.stringify(listProductsCheck));
  
//     // Navigate to the other page where the list will be displayed
//     window.location.href = 'another-page.html';
//   }


//   // Retrieve the stored list of products from localStorage
// const productList = JSON.parse(localStorage.getItem('productList'));

// // Display the products on the page
// const productListContainer = document.querySelector('.product-list-container');

// if (productList && productList.length > 0) {
//   productList.forEach(product => {
//     const productElement = document.createElement('div');
//     // Customize the display of each product element as needed
//     productElement.innerHTML = `<div>${product.name}</div>`;
//     productListContainer.appendChild(productElement);
//   });
// }