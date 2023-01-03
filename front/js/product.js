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
            newColor.value = oneProduct.colors[i];
            newColor.textContent = oneProduct.colors[i];
            colorChoice.appendChild(newColor);

        }

    })
    .catch(function (error) {

        console.log('Il y a eu un problème avec le chargement de la page ');
    });
//creation de l 'ajout au panier via le localstorage //
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

// creation  du panier //
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}
// fonction pour ajouter un produit au panier //
function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id && p.color === product.color);
    console.log(foundProduct);

    // message en cas d'anomalie 
    if (
        product.quantity < 1 || product.quantity > 100 || product.quantity === undefined || product.color === "" || product.color === undefined
    ) {
        alert("Veuillez sélectionnez une couleur et/ou une quantité comprise entre 1 et 100 avant d'ajouter le produit au panier.");

    } else if

        (foundProduct != undefined) {
        foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(product.quantity);
    } else {

        basket.push(product);
    }
    saveBasket(basket);
}
// ajout de l'eventlistener sur le bouton ajouter au panier //

const addToBasket = document.querySelector("#addToCart");
addToBasket.addEventListener("click", (event) => {
    event.preventDefault();

    // on récupère les options selectionnées par le visiteur 
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;


    const basket = getBasket();
    //console.log(basket)
    const product = {
        id: productId,
        color: color,
        quantity: quantity,
    }

    addBasket(product);

}
)








