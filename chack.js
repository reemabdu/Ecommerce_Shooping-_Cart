

let listProductCheckHTML= document.querySelector('.listProduct-Check');
let listCheckHTML = document.querySelector('.listCart-Check');
// let iconCheckpan = document.querySelector('.icon-cart span')
let listProductsCheck=[];
let Check=[];

// const addToCart = (product_id) => {
//     let positionThisProductCart =Check.findIndex((value) => value.product_id == product_id) ;
//   if(Check.length <= 0){
//     Check = [
//         {
//         product_id: product_id,
//         quantity: 1
//         }
//     ]
    
//   }else if (positionThisProductCart < 0){
//     Check.push({
//         product_id:product_id,
//         quantity: 1
//     });
//   }else{
//     Check[positionThisProductCart].quantity = Check[positionThisProductCart].quantity + 1;
//   }
//   addCartToHTML();
//   addCartToMemory();

// }
const addCartToMemoryCheck = () => {
localStorage.setItem('cart', JSON.stringify(Check));
}
const addCheckToHTML = () => {
listCheckHTML.innerHTML = '';
let totlaQuantity = 0;
if(Check.length > 0){
    Check.forEach(cart => {
        totlaQuantity = totlaQuantity + cart.quantity;
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.dataset.id = cart.product_id;
        let positionProduct = listProductsCheck.findIndex((value) => value.id == cart.product_id);
        let info = listProductsCheck[positionProduct];
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
            listCheckHTML.appendChild(newCart);
        }
    });
}
// iconCheckpan.innerText = totlaQuantity;
};

   
const initAppCheck = () => {
// get data from json 
fetch('products.json')
.then(response => response.json())
.then(data => {
    listProductsCheck= data;
    addCheckToHTML();
    // get cart from memory 
    if(localStorage.getItem('cart')){
        Check= JSON.parse(localStorage.getItem('cart'));
        addCheckToHTML();
    }

})
}
initAppCheck();