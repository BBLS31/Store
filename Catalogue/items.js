let cart = document.querySelectorAll('.add-cart');
let vat = 0.15
let confirm = document.getElementById('confirm');

let product = [{ //Products in the cart
        name: 'BBLS31',
        tag: 'BBLS31',
        price: 750,
        inCart: 0
    },

    {
        name: 'AOG',
        tag: 'AOG',
        price: 800,
        inCart: 0

    },
    
    {
        name: 'T_P',
        tag: 'T_P',
        price: 350,
        inCart: 0

    },


    {
        name: 'Bad Attitude',
        tag: 'Bad Attitude',
        price: 550,
        inCart: 0

    },

    
    {
        name: 'NoNameBrand',
        tag: 'NoNameBrand',
        price: 1200,
        inCart: 0

    },

    {
        name: 'Mics',
        tag: 'Mics',
        price: 305,
        inCart: 0

    },

    {
        name: 'Headphones',
        tag: 'Headphones',
        price: '1350',
        inCart: 0

    },

    {
        name: 'Stream Elements',
        tag: 'Stream Elements',
        price: '100',
        inCart: 0

    },

    {
        name: 'Monitors',
        tag: 'Monitors',
        price: '32500',
        inCart: 0

    },

    {
        name: 'Music',
        tag: 'Music',
        price: '150',
        inCart: 0

    },
];

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
        cartNums(product[i]);
        totalCost(product[i])
    })
};

function onLoadCarNums() {
    let productNumbers = localStorage.getItem('cartNums')

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
};

function cartNums(product) {
    console.log("The product", product);
    let productNumbers = localStorage.getItem('cartNums')

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNums', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNums', 1);
        document.querySelector('.cart span').textContent = 1
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are", cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }

    }

    localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

//Function to add up total cost
function totalCost(product){
  // console.log("The total is", product.price);
  let cartCost = localStorage.getItem('totalCost');
   

   console.log(typeof vat);
  
  console.log("My cart cost is", cartCost);
  console.log(typeof product.price);

  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + parseInt(product.price));
  } else {
    localStorage.setItem("totalCost", parseInt(product.price));
  }

}



function validate(coupon) { //Coupons which decrease the total price. I recieved help from https://stackoverflow.com/questions/44836407/validate-coupon-codes-with-javascript
codes = new Object();
codes.GUEST20 = 20;
codes.GUEST30 = 30;
codes.GUEST40 = 40;
codes.GUEST50 = 50;

if (codes[coupon]) 
 { 
 window.alert("Coupon Code Accepted!"); 
 } 
else 
 { 
 window.alert("Sorry, The Coupon Code you entered is invalid. Please check and try again!"); 
 } 
} 


function displayCart(){
   let cartItems = localStorage.getItem("productInCart");
   cartItems = JSON.parse(cartItems);
   let productContainer = document.querySelector(".product");

   let cartCost = localStorage.getItem('totalCost');
   if(cartItems && productContainer){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div id="product">
        <ion-icon name="close"></ion-icon>
        <img src="./images/${item.tag}.jpg">
        <span>${item.name}</span>
        </div>
        <div class="price">R${item.price},00</div> 
        <div id="quantity">
        <ion-icon name="remove"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="add"></ion-icon>
        </div>
        <div class="total">
        R${item.inCart * item.price},00
        </div>
        `
      });

      productContainer.innerHTML += `
      <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
      Grand Total with vat included
      <h4>
      <h4 class ="basketTotal">
      R${cartCost + (vat * cartCost)},00
      </h4>`
   }

   
}

function cost(){
    alert(cartCost);
}







onLoadCarNums();
displayCart();