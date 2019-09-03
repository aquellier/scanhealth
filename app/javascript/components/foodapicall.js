const openFoodApiCall = (barcode) => {
  fetch(`https://fr.openfoodfacts.org/api/v0/produit/${barcode}.json`)
      .then(res => res.json())
      .then(json => {
        const productName = json.product.product_name;
        const imageUrl = json.product.image_url;
        const img = document.getElementById("card-image");
        const title = document.getElementById("product-name");
        title.innerText = productName;
        img.src = imageUrl;
      });
}

export { openFoodApiCall }
