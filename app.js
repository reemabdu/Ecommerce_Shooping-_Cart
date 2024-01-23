
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

let listProducts=[];
iconCart.addEventListener('click',() => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click',() => {
    body.classList.toggle('showCart')
})
const addDataToHTML = ()  => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product =>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
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
const initApp = () => {
// get data from json 
fetch('products.json')
.then(response => response.json())
.then(data => {
    listProducts= data;
    addDataToHTML();
    // console.log(listProducts);

})
}
initApp();