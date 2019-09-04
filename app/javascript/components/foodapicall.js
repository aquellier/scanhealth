const openFoodApiCall = (barcode) => {
  fetch(`https://fr.openfoodfacts.org/api/v0/produit/${barcode}.json`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        const productName = json.product.product_name_fr;
        const imageUrl = json.product.image_url;
        const jsonIngredients = json.product.ingredients_text_fr;
        const img = document.getElementById("card-image");
        const title = document.getElementById("product-name");
        const ingredients = document.getElementById("product-ingredients");
        title.innerText = productName;
        img.src = imageUrl;
        ingredients.innerText = jsonIngredients;
      });
}

export { openFoodApiCall }
