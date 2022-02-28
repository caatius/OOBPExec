
// And here's code to access the JSON file and create the items for the page
fetch("https://raw.githubusercontent.com/caatius/oobp/main/products.json")
.then(response => response.json())
.then(productsArray => renderAllProducts(productsArray))

function renderAllProducts(productsArray) {
    productsArray.forEach(product => renderOneProduct(product))
}

const findDiv = document.getElementById("shop-items");

function renderOneProduct(product) {
    const newElement = document.createElement("div")
    newElement.className = "shop-item"
    newElement.innerHTML = `
                <span class="shop-item-title">${product.title}</span>
                <span class="detile">${product.description}</span>
                <img class="shop-item-image" src="${product.image}">
                <div class="shop-item-details">
                <span class="shop-item-price">${product.price}€</span>
                <button class="btn btn-primary shop-item-button"type="button">ADD TO CART</button>
                </div>
    `
    findDiv.appendChild(newElement)        
}
