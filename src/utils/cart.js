import toast from "react-hot-toast";

export function getCart(){
    let cartString = localStorage.getItem("cart");

    if(cartString == null){
        localStorage.setItem("cart", "[]");
        return [];
    }else{
        const cart = JSON.parse(cartString);
        return cart;
    }
}

export function addToCart(product, quantity){
    const cart = getCart();

    //check if product is alreadly in cart

    const index = cart.findIndex(
        (item) => {
            return item.productID == product.productID
        }
    );
    if(index == -1){
        cart.push(
            {
                productID: product.productID,
                productName: product.productName,
                price: Number(product.price),
                labelPrice: Number(product.labelPrice),
                quantity: Number(quantity),
                image: product.images[0]
            }
        )

        toast.success(`${product.productName }Product Added to the Cart`);

    }else{
        const newQnty = cart[index].quantity + quantity

        if(newQnty <= 0){
            cart.splice(index, 1);
            toast.success(`${product.productName } removed from cart`);
        }else{
            cart[index].quantity =newQnty;
            toast.success(`Updated ${product.productName} Quantity to ${newQnty}`);
        }
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}

export function emptyCart(){
    localStorage.setItem("cart", "[]");
}

export function getCartTotal(){
    let total = 0;
    const cart = getCart();

    cart.forEach(
        (item) => {
            total += item.price * item.quantity;
        }
    )
    return total;

}
