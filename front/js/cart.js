// On récupère le localStorage //
function getBasketLocalStorage() {
    return JSON.parse(localStorage.getItem("basket"));
}

// On récupere les éléments de l'api //
async function getApiProducts() {
    let api = await fetch("http://localhost:3000/api/products/");
    let apiProducts = await api.json();
    return apiProducts;
}

// on boucle notre panier pour avoir tous les produits //
function displayProducts(basket) {
    for (let i = 0; i < basket.length; i++) {
        const product = basket[i];
        createProductInBasket(product)
    }
}

// on execute toutes les fonctions//
async function displayItemsInTheCart() {
    const items = await getApiProducts();
    console.log(items)
    const recapProduct = [];

    findAndCompareItemsInApi(items, recapProduct);
    displayProducts(recapProduct);
    calculateTotals(recapProduct);
    alertQuantity();
    const inputField = document.querySelectorAll('.itemQuantity');
    updateTotals(inputField, recapProduct);
    const deleteItemBtn = document.querySelectorAll('.deleteItem');
    const sectionOfCartItems = document.getElementById('cart__items');
    const articleCartItem = document.querySelectorAll('.cart__item');
    deleteProductFromTheCart(deleteItemBtn, recapProduct, sectionOfCartItems, articleCartItem);


}
displayItemsInTheCart();


// on compare les produits issu du localstorage avec ceux de l'api //
let itemsOfLocalStorage = getBasketLocalStorage();


function findAndCompareItemsInApi(item, basketItems) {
    console.log(basketItems);
    if (itemsOfLocalStorage === null || itemsOfLocalStorage == 0) {

        emptyBasket();

    } else {

        for (let i = 0; i < itemsOfLocalStorage.length; i++) {
            const itemId = itemsOfLocalStorage[i].id;
            const found = item.find(element => element._id == itemId);
            basketItems.push({
                'id': found._id,
                'name': found.name,
                'color': itemsOfLocalStorage[i].color,
                'price': found.price,
                'imgUrl': found.imageUrl,
                'quantity': itemsOfLocalStorage[i].quantity,
                'altTxt': found.altTxt
            })


        }
    }
}

//message si panier vide //
function emptyBasket() {
    let newH1 = document.createElement('h1');
    cartItems.appendChild(newH1);
    newH1.innerText = 'Le panier est vide !';
}

// calcul du nombre d'articles total et du prix total
function calculateTotals(items) {
    const totalQuantityOfArticles = document.getElementById('totalQuantity');
    const totalPriceOfArticles = document.getElementById('totalPrice');
    totalQuantityOfArticles.innerText = calculateQuantity(items);
    totalPriceOfArticles.innerText = calculateTotalPrice(items);
}

// fonction de calcul de la quantité total
function calculateQuantity(items) {
    return items.reduce((a, b) => {
        return parseInt(a) + parseInt(b.quantity);
    }, 0);
}

// fonction de calcul du prix total
function calculateTotalPrice(items) {
    //total du prix
    return items.reduce((a, b) => {
        return a + (b.price * b.quantity);
    }, 0);
}
// fonction qui alerte sur la quantité si elle ne respecte pas minimum 1 et maximum 100
function alertQuantity() {
    let alertItemQuantity = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < alertItemQuantity.length; i++) {
        alertItemQuantity[i].addEventListener("change", function (event) {
            if (event.target.value >= 1 && event.target.value <= 100) {
                alertItemQuantity[i].quantity = event.target.value;
                localStorage.setItem("product", JSON.stringify(items));
            } else {
                alert("Attention, la quantité du produit doit être au minimum de 1 et au maximum de 100. Elle sera automatiquement remise à 1.");
                event.target.value = 1;
                alertItemQuantity[i].quantity = event.target.value;
                localStorage.setItem("product", JSON.stringify(items));
            }
        });
    };
};
// fonction qui update le local storage avec le calcul du nouveau prix et quantité après modification
function updateTotals(input, cartItems) {
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener("change", (event) => {
            const targetElement = event.target.closest('.cart__item').dataset;
            const dataId = targetElement.id;
            const dataColor = targetElement.color;
            let itemsLocalStorage = getBasketLocalStorage();

            const found = cartItems.find(element => element.id == dataId && element.color == dataColor);
            found.quantity = Number(event.target.value);


            let index = itemsLocalStorage.findIndex(element => element.id == dataId && element.color == dataColor);
            itemsLocalStorage[index].quantity = Number(event.target.value);

            let newLocalStorage = JSON.stringify(itemsLocalStorage); // remplace le localstorage initial
            localStorage.setItem('basket', newLocalStorage);

            calculateTotals(cartItems);
        })
    }
}

// fonction de suppression d'un produit en cliquant sur le bouton supprimer
function deleteProductFromTheCart(deleteBtn, cartItems, section, article) {
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (event) => {
            const targetElement = event.target.closest('.cart__item').dataset;
            const dataId = targetElement.id;
            const dataColor = targetElement.color;
            let itemsLocalStorage = getBasketLocalStorage();

            let indexLs = itemsLocalStorage.findIndex(element => element.id == dataId && element.color == dataColor);

            console.log("indexLs:", indexLs);
            let indexCartItems = cartItems.findIndex(element => element.id == dataId && element.color == dataColor);
            console.log("indexCartItems:", indexCartItems);
            section.removeChild(article[i]);

            itemsLocalStorage.splice(indexLs, 1); // supprime l'élement de cette position
            let newLocalStorage = JSON.stringify(itemsLocalStorage);
            localStorage.setItem('basket', newLocalStorage);

            cartItems.splice(indexCartItems, 1);

            calculateTotals(cartItems);
        })
    }
};

// on ajoute les produits du localstorage à la page cart //
const cartItems = document.querySelector("#cart__items");
function createProductInBasket(product) {

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
    newImg.src = product.imgUrl;
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

}


// Formulaire de contact

// On récupère tous les "id"
const firstNameForm = document.getElementById("firstName");
const lastNameForm = document.getElementById("lastName");
const addressForm = document.getElementById("address");
const cityForm = document.getElementById("city");
const emailForm = document.getElementById("email");

// On crée des variables vides pour récupérer les informations qui seront déclarées par les visiteurs
let valueFirstName;
let valueLastName;
let valueAddress;
let valueCity;
let valueEmail;

// on crée des variables pour la validation du panier 
let errorFormFirstName = true;
let errorFormLastName = true;
let errorFormAddress = true;
let errorFormCity = true;
let errorFormEmail = true;

// on crée les Regex 
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameFirstNameAndCityRegex = /^[a-zA-Z][^0-9!?@#$%^&*)(':;=+/]{2,30}$/;
const addressRegex = /^[0-9]+,* *[a-zA-Z][^0-9]*$/;

//Formulaire pour le prénom
firstNameForm.addEventListener('change', function () {
    let firstNameErrorMsg = firstNameForm.nextElementSibling;
    valueFirstName = nameFirstNameAndCityRegex.test(firstNameForm.value);
    if (valueFirstName) {
        firstNameErrorMsg.innerText = '';
        errorFormFirstName = false;
    }
    else {
        firstNameErrorMsg.innerText = 'Veuillez indiquer votre prénom.';
        errorFormulaireFirstName = true;
    }
});

// Formulaire pour le nom
lastNameForm.addEventListener('change', function () {
    let lastNameErrorMsg = lastNameForm.nextElementSibling;
    valueLastName = nameFirstNameAndCityRegex.test(lastNameForm.value);
    if (valueLastName) {
        lastNameErrorMsg.innerText = '';
        errorFormLastName = false;
    }
    else {
        lastNameErrorMsg.innerText = 'Veuillez indiquer votre nom.';
        errorFormLastName = true;
    }
});

// Formulaire pour l'adresse
addressForm.addEventListener('change', function () {
    let addressErrorMsg = addressForm.nextElementSibling;
    valueAddress = addressRegex.test(addressForm.value);
    if (valueAddress) {
        addressErrorMsg.innerText = '';
        errorFormAddress = false;
    }
    else {
        addressErrorMsg.innerText = 'Veuillez indiquer votre adresse.';
        errorFormAddress = true;
    }
});

// Formulaire pour la ville
cityForm.addEventListener('change', function () {
    let cityErrorMsg = cityForm.nextElementSibling;
    valueCity = nameFirstNameAndCityRegex.test(cityForm.value);
    if (valueCity) {
        cityErrorMsg.innerText = '';
        errorFormCity = false;
    } else {
        cityErrorMsg.innerText = 'Veuillez indiquer votre ville.';
        errorFormCity = true;
    }
});

// Formulaire pour l'email
emailForm.addEventListener('change', function () {
    let emailErrorMsg = emailForm.nextElementSibling;
    valueEmail = emailRegex.test(emailForm.value);
    if (valueEmail) {
        emailErrorMsg.innerText = '';
        errorFormEmail = false;
    }
    else {
        emailErrorMsg.innerText = 'Veuillez renseigner un email correct (ex: jean.kanap@gmail.com).';
        errorFormEmail = true;
    }
});

//Envoi du formulaire

let formContact = document.querySelector(".cart__order");

formContact.addEventListener("submit", (event) => {
    event.preventDefault();

    if (valueFirstName && valueLastName && valueAddress && valueCity && valueEmail) {
        const finalOrder = getBasketLocalStorage();
        let orderId = [];

        finalOrder.forEach((order) => {
            orderId.push(order.id);
        });

        // Données attendues par le controller
        const data = {
            contact: {
                firstName: valueFirstName,
                lastName: valueLastName,
                address: valueAddress,
                city: valueCity,
                email: valueEmail,
            },
            products: orderId,
        };


        // Fetch post
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(data => {
                document.location.href = `confirmation.html?id=` + data.orderId;
                localStorage.removeItem("product");
            });

        //Vide les informations du formulaire pour éviter les erreurs
        localStorage.clear();

    } else {
        alert("Veuillez vérifier le formulaire.")
    }
});