// récupération de la chaine de requete dans l'url //
const url = window.location.search;

//extraction  id de l'url //
const urlId = new URLSearchParams(url);
const orderId = urlId.get("id");

// affichage de l'ID //
const order = document.getElementById("orderId");
order.innerText = orderId;
