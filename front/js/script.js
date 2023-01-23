let url = `http://localhost:3000/api/products`;

const sectionItems = document.querySelector("#items");

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let allProducts = data;
    for (i = 0; i < allProducts.length; i++) {

      /*creation des produits sur la page */
      const newA = document.createElement("a");
      newA.setAttribute("href", `./product.html?id=${allProducts[i]._id}`);
      sectionItems.appendChild(newA);

      const article = document.createElement("article");
      newA.appendChild(article);

      const productImage = document.createElement("img");
      productImage.src = (allProducts[i].imageUrl);
      article.appendChild(productImage);
      productImage.setAttribute("alt", allProducts[i].altTxt);


      const productName = document.createElement("h3");
      productName.innerText = (allProducts[i].name);
      article.appendChild(productName);

      const productDescription = document.createElement("p");
      productDescription.innerText = (allProducts[i].description);
      article.appendChild(productDescription);
    }
  })
  .catch(error => alert("Impossible de charger la page !"));


