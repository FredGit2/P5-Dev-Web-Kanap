
// Récupération du panier via  localstorage sous forme de tableau //
let basket = JSON.parse(localStorage.getItem("basket"));
//console.log(basket);
let recapProduct = [];
console.log(recapProduct)

// si panier vide ==> message d'erreur //
if (basket == null) {
    alert("votre panier est vide");
    // parcourir le tableau issu du localstorage//
} else {

    for (let i = 0; i < basket.length; i++) {
        let product = basket[i];
        console.log(recapProduct)
        fetch(`http://localhost:3000/api/products/${product.id}`)
            .then((response) => response.json())
            .then(function (data) {
                //console.log(data)
                product.name = data.name;
                product.price = data.price;
                product.id = data._id;
                product.imageUrl = data.imageUrl;
                product.altTxt = data.altTxt;
                recapProduct.push(product);
                //console.log(product.quantity)
                //integrer les produits au dom //
                //-Création de la balise article //
                let newArticle = document.createElement("article");
                newArticle.setAttribute("class", "cart__item");
                newArticle.setAttribute("data-id", `${product.id}`);
                newArticle.setAttribute("data-color", `${product.color}`);
                cartItems.appendChild(newArticle);

                //-Création de la balise div image//
                let newDivImg = document.createElement("div");
                newDivImg.setAttribute("class", "cart__item__img");
                newArticle.appendChild(newDivImg);

                let newImg = document.createElement("img");
                newImg.src = product.imageUrl;
                newImg.setAttribute("alt", product.altTxt);
                newDivImg.appendChild(newImg);

                //-Création de la div content //
                let newDivContent = document.createElement("div");
                newDivContent.setAttribute("class", "cart__item__content");
                newArticle.appendChild(newDivContent);

                let newDivContentDescription = document.createElement("div");
                newDivContentDescription.setAttribute(
                    "class",
                    "cart__item__content__description"
                );
                newDivContent.appendChild(newDivContentDescription);

                let newH2 = document.createElement("h2");
                newH2.innerText = product.name;
                newDivContentDescription.appendChild(newH2);
                //-Création d'une balise couleur
                let newColor = document.createElement("p");
                newColor.innerText = product.color;
                newDivContentDescription.appendChild(newColor);

                //-Création d'une balise prix
                let newPrice = document.createElement("p");
                newPrice.innerText = product.price + " €";
                newDivContentDescription.appendChild(newPrice);

                //-Création de la div avec pour classe cart__item__content__settings-
                let newDivContentSettings = document.createElement("div");
                newDivContentSettings.setAttribute(
                    "class",
                    "cart__item__content__settings"
                );
                newDivContent.appendChild(newDivContentSettings);

                //-Création de la div quantité
                let newDivContentSettingsQuantity = document.createElement("div");
                newDivContentSettingsQuantity.setAttribute(
                    "class",
                    "cart__item__content__settings__quantity"
                );
                newDivContentSettings.appendChild(newDivContentSettingsQuantity);

                let newQuantity = document.createElement("p");
                newQuantity.innerText = "Qté :";
                newDivContentSettingsQuantity.appendChild(newQuantity);
                let newInput = document.createElement("input");
                newInput.setAttribute("type", "number");
                newInput.setAttribute("class", "itemQuantity");
                newInput.setAttribute("name", "itemQuantity");
                newInput.setAttribute("min", "1");
                newInput.setAttribute("max", "100");
                newInput.setAttribute("value", `${product.quantity}`);
                newDivContentSettingsQuantity.appendChild(newInput);

                //-Création de la div supprimer
                let newDivContentSettingsDelete = document.createElement("div");
                newDivContentSettingsDelete.setAttribute(
                    "class",
                    "cart__item__content__settings__delete"
                );
                newDivContentSettings.appendChild(newDivContentSettingsDelete);

                //-Création d'une balise qui indique le prix du canapé
                let newDelete = document.createElement("p");
                newDelete.setAttribute("class", "deleteItem");
                newDelete.innerText = "Supprimer";
                newDivContentSettingsDelete.appendChild(newDelete);
            })

            .catch(function (error) {
                // console.log('Il y a eu un problème avec le chargement de la page ');
            });

    }
    console.log(recapProduct.length)
}


document.querySelectorAll(".deleteItem").forEach(function (item) {
    item.addEventListener("click", function () {
        console.log(item.closest("article").dataset.id);
    });

});





function displayItems(listProduct) {
    console.log(listProduct)
    for (let i = 0; i < listProduct.length; i++) {
        console.log(listProduct[i]);
    }

}
//declaratation des variables et fonctions //
const cartItems = document.querySelector("#cart__items");

function getBasket() {
    let basket = localStorage.getItem("basket")
    if (basket == null) {
        return []
    } else {
        return JSON.parse(basket)
    }
}

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}
//supprimer une quantité //

function removeBasket(product) {
    let basket = getBasket();
    basket = basket.filter((p) => p.id == product.id);
    saveBasket(basket);
    console.log(basket);
}
// nombres d'articles dans le panier//
function getNumberProduct() {
    const totalQuantity = document.querySelector("#totalQuantity");
    let number = 0;
    let product = basket[i];
    for (let element of product) {
        number += product.quantity;
    }
    console.log(element);
    return number;
}
// prix total de l'ensemble des articles du panier //
function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}
// affichage de la quantité totale 

function setTotalQuantity() {
    let totalQuantity = document.getElementById('totalQuantity')
    let newQuantity = document.createTextNode(`${getNumberProduct()}`)
    if (newQuantity != undefined) {
        totalQuantity.replaceChild(newQuantity, totalQuantity.childNodes[0])

    } else {
        totalQuantity.appendChild(newQuantity)
    }
}
// gestion de l'ajout de quantité 

function addQuantity(product) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id)
    if (foundProduct != undefined) {
        foundProduct.quantity = product.quantity
    }

    saveBasket(basket)
    setTotalQuantity()
    setTotalPrice()
}





//passer l'orde de commande /
// modifier la quantité// ==> utiliser la méthode change / dataset/ closest
/*function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}
const changeQuantity = document.querySelectorAll('input');
const foundQuantity = document.getElementsByClassName('.itemQuantity');

changeQuantity.addEventListener('change', updateValue);

function updateValue(e) {
    changeQuantity.textContent = e.target.value;/*
}

// ajout de l'eventlistener sur le click du supprimer //


// autre idee //
/*newInput.addEventListener("change", function () {
    `${product.quantity}` = Number(this.value);
    saveBasket(basket);
  });
  return newInput;

/*function changeQuantity(product, quantity) {
    //let basket = getBasket();
    let foundProduct = product.find(p => p.id == product.id && p.color === product.color);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeBasket(foundProduct);
        } else {
            saveBasket(basket);
        }
    }
}*/
