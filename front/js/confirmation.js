/**Récupération de l'orderId avec la propriété "searchParams"
 * Et affichage de l'orderId
*/

const url = window.location.search;
const params = new URLSearchParams(url);
const orderId = params.get("id");

function orderDisplay() {
    const orderFinal = document.getElementById("orderId");
    orderFinal.innerText = orderId;
};

orderDisplay();