let products =
    JSON.parse(localStorage.getItem("products")) || [];

let cartItems =
    document.getElementById("cartItems");

let subtotal = 0;

function renderCart() {
    cartItems.innerHTML = "";
    subtotal = 0;

    products.forEach((item, index) => {
        if (item.qty > 0) {
            let itemTotal =
                item.qty * item.price;

            subtotal += itemTotal;

            let div =
                document.createElement("div");

            div.className =
                "cart-item";

            div.innerHTML = `
                <div class="cart-top">
                    <strong>${item.name}</strong>
                    <button class="remove-btn" onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>

                <div>₹${item.price} × ${item.qty}</div>

                <div class="qty-controls">
                    <button onclick="decrease(${index})">-</button>
                    <span>${item.qty}</span>
                    <button onclick="increase(${index})">+</button>
                </div>

                <div><strong>₹${itemTotal}</strong></div>
            `;

            cartItems.appendChild(div);
        }
    });

    document.getElementById("subtotal").innerText =
        "₹" + subtotal;

    document.getElementById("total").innerText =
        "₹" + (subtotal + 20);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}

function increase(i) {
    products[i].qty++;
    renderCart();
}

function decrease(i) {
    products[i].qty--;
    if (products[i].qty < 0) {
        products[i].qty = 0;
    }
    renderCart();
}

function removeItem(i) {
    products[i].qty = 0;
    renderCart();
}

renderCart();
