// récupération de la chaine de requete dans l'url//
const queryStringUrl = window.location.search;

//extraction id de l'url //
const urlId = new URLSearchParams(queryStringUrl);
const productId = urlId.get("id");

//récupération des données via la méthode fetch //
let oneProduct = [];

fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(oneProduct => {

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
    .catch(error => alert("Impossible de charger la page !"));

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
        if (foundProduct.quantity > 100) {
            alert(`Vous avez ajouté un total de ` + foundProduct.quantity + ` ` + 'canapés de couleur' + ` ` + product.color + ` à votre panier, vous pouvez en ajouter dans la limite de 100 produits de même couleur.`);
            return (foundProduct.quantity += 1); // bloque le nombre de canapés si le montant cumulé dépasse l'alerte.
        }
    } else {
        basket.push(product);
        alert('Votre article a bien été ajouté au panier.');
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

    const product = {
        id: productId,
        color: color,
        quantity: quantity,
    }
    addBasket(product);
}
);








