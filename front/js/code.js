let basket = JSON.parse(localStorage.getItem("basket"));
//console.log(basket);

basket.forEach(product => {
    fetch(`http://localhost:3000/api/products/${product.id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else { console.log(response) }
        })
});
function addCartToHtml(id, color, imageUrl, altText, name, price, quantity)