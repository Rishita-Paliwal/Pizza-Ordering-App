import Product from "../models/product.js";
import makeNetworkCall from "./api-client.js";

const productOperations = {
    products: [],

    async loadProducts() {
        const pizzas = await makeNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        
        const defaultImage = "https://via.placeholder.com/300x200?text=No+Image";

        const productsArray = pizzaArray.map(pizza => {
            const imageUrl = pizza.assets?.product_details_page?.[0]?.url || defaultImage;

            if (!pizza.assets?.product_details_page?.[0]?.url) {
                console.warn(`⚠️ No image found for pizza: ${pizza.name}`);
            }

            const currentPizza = new Product(
                pizza.id,
                pizza.name,
                pizza.menu_description,
                pizza.price,
                imageUrl
            );

            return currentPizza;
        });

        console.log('✅ Loaded Product Array:', productsArray);
        this.products = productsArray;
        return productsArray;
    },

    gettProductsInCart() {
        const productInBasket = this.products.filter(product => product.isAddedInCart);
        return productInBasket;
    },

    search(pizzaId) {
        const product = this.products.find(currentProduct => currentProduct.id == pizzaId);
        if (product) {
            console.log('🔍 Product Found:', product);
            product.isAddedInCart = true;
            console.log('🛒 Updated Product Array:', this.products);
        } else {
            console.warn(`❌ Product with ID ${pizzaId} not found`);
        }
    }
};

export default productOperations;
