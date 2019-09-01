const openFoodApiCall = () => {
  fetch('https://fr.openfoodfacts.org/api/v0/produit/8433329082150.json')
      .then(res => res.json())
      .then(json => {
        const productName = json.product.product_name;
        const imageUrl = json.product.image_url;
        const img = document.getElementById("card-image");
        img.src = imageUrl;
      });
}

export { openFoodApiCall }
