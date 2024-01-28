
let userInfo=document.querySelector("#user_info");
let userData=document.querySelector("#user");
let links=document.querySelector("#links");
 if (localStorage.getItem("username")){
    links.remove()
    userInfo.style.display="block"
    userData.innerHTML=localStorage.getItem("username")

 }
let iconCart= document.querySelector('.icon-cart');
let closeCart= document.querySelector('.close');
let body= document.querySelector('body');
let listProductHTML= document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span')
let listProducts=[];
let carts = [];
iconCart.addEventListener('click',() => {
    // body.classList.toggle('showCart')
    document.getElementById("cartTab").style.display="block"
})
closeCart.addEventListener('click',() => {
    // body.classList.toggle('showCart')
    document.getElementById("cartTab").style.display="none"
})
const addDataToHTML = ()  => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="images">
               <h2>${product.name}</h2>
               <div class="price">${product.price}</div>
               <button class="addCart">
                Add To Cart
               </button>`;
               listProductHTML.appendChild(newProduct);
        })
    }
} 
listProductHTML.addEventListener('click',(event) => {
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
    })
}
iconCartSpan.innerText = totlaQuantity;
}
listCartHTML.addEventListener('click',(event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') ||positionClick.classList.contains('plus') ){
     let product_id = positionClick.parentElement.dataset.id;
   
     let type ='minus';
     if(positionClick.classList.contains('plus')){
        type = 'plus';
     }
     changeQuantity(product_id , type);
    }
})
const changeQuantity = (product_id , type) => {
    let positionItemIncart = carts.findIndex((value) => value.product_id = value.product_id);
    if(positionItemIncart > 0){
        switch (type) {
            case 'plus':
                carts[positionItemIncart].quantity = carts[positionItemIncart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[positionItemIncart].quantity - 1;
                if (valueChange > 0 ){
                    carts[positionItemIncart].quantity = valueChange;
                }else{
                    carts.splice(positionItemIncart ,1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

const initApp = () => {
// get data from json 
fetch('products.json')
.then(response => response.json())
.then(data => {
    listProducts= data;
    addDataToHTML();
    // get cart from memory 
    if(localStorage.getItem('cart')){
        carts= JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }

})
}
initApp();