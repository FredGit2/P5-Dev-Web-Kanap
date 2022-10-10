// récupération de la chaine de requete dans l'url//
const queryStringUrl = window.location.search;
//console.log(queryStringUrl);//

//extraction id de l'url //
const urlId = new URLSearchParams(queryStringUrl);
//console.log(urlId);
const productId = urlId.get("id");

//récupération des données via la méthode fetch //
let oneProduct = [];

fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(oneProduct => {
        // console.log(oneProduct);

        //creation de l'image et de l'alt //
        let imgElement = document.querySelector(".item__img");
        imgElement.innerHTML = `<img src="${oneProduct.imageUrl}" alt="${oneProduct.altTxt}"/>`;

        //creation du titre,prix et descriptions //
        document.getElementById("title").innerText = oneProduct.name;
        document.title = oneProduct.name;
        document.getElementById("price").innerText = oneProduct.price;
        document.getElementById("description").innerText = oneProduct.description;

        //creation du choix des couleurs //
        for (i = 0; i < oneProduct.colors.length; i++) {
            const colorChoice = document.getElementById("colors");
            const newColor = document.createElement("option");

            newColor.value = oneProduct.newColor;
            newColor.textContent = oneProduct.colors[i];
            colorChoice.appendChild(newColor);

        }

    })
    .catch(function (error) {

        console.log('Il y a eu un problème avec le chargement de la page ');
    });
// ajout de l'eventlistener sur le bouton ajouter au panier //

const addToBasket = document.querySelector("#addToCart");
addToBasket.addEventListener("click", (event) => {
    event.preventDefault();
    
    let color = document.querySelector("#colors").value;
    console.log(color)
    const quantity = document.querySelector("#quantity").value;
    console.log(quantity)


    //creation de l 'ajout au panier via le localstorage //
   /* function saveBasket(basket) {
        localStorage.setItem("basket", JSON.stringify(basket));
    }
    function getBasket() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            return [];
        } else {
            return JSON.parse(basket);
        }
    }

    function addBasket(product) {
        let basket = getBasket();
        let foundProduct = basket.find(p => p.id == product.id);
        if (foundProduct != undefined) {
            foundProduct.quantity++;
        } else {
            product.quantiy = 1;
            basket.push(product);
        }
        saveBasket(basket);
    }
    function removeBasket(product) {
        let basket = getBasket();
        basket = basket.filter(p => p.id == product.id);
        saveBasket(basket);
        console.log(basket);
    }
    function changeQuantity(product, quantity) {
        let basket = getBasket();
        let foundProduct = basket.find(p => p.id == product.id);
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                removeBasket(foundProduct);
            } else {
                saveBasket(basket);
            }
        }
    }
    function getNumberProduct() {
        let basket = getBasket();
        let number = 0;
        for (let product of basket) {
            number += product.quantity;
        }
        return number;
    }

    function getTotalPrice() {
        let basket = getBasket();
        let total = 0;
        for (let product of basket) {
            total += product.quantity * product.price;
        }
        return total;
    }*/
}
)
   



