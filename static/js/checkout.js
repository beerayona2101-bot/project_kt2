console.log("Checkout JS loaded");

let products =
    JSON.parse(localStorage.getItem("products")) || [];

// Calculate total
let subtotal = 0;
products.forEach(item => {
    if (item.qty && item.qty > 0) {
        subtotal += item.qty * item.price;
    }
});

document.getElementById("subtotal").innerText = "₹" + subtotal;
document.getElementById("total").innerText = "₹" + (subtotal + 20);

// MAIN FUNCTION
function processPayment() {
    let paymentMethod =
        document.querySelector('input[name="payment"]:checked').value;

    console.log("Payment Method:", paymentMethod);

    if (paymentMethod === "cod") {
        placeCODOrder();
    } else {
        payOnline();
    }
}

// COD FLOW (100% WORKING)
function placeCODOrder() {
    alert("Order placed successfully (Cash on Delivery)");

    saveOrder("COD");

    window.location.href = "/success";
}

// ONLINE PAYMENT (RAZORPAY)
function payOnline() {
    alert("Opening payment gateway (Test Mode)");

    // ⚠️ This is TEST MODE (no backend needed)
    let options = {
        key: "rzp_test_1234567890", // dummy test key
        amount: (subtotal + 20) * 100,
        currency: "INR",
        name: "GULLY MART",
        description: "Order Payment",
        handler: function (response) {
            alert("Payment successful");

            saveOrder("PAID");

            window.location.href = "/success";
        },
        prefill: {
            contact: document.getElementById("mobile").value || "9999999999"
        },
        theme: {
            color: "#05681e"
        }
    };

    let rzp = new Razorpay(options);
    rzp.open();
}

// SAVE ORDER TO LOCALSTORAGE
function saveOrder(status) {
    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    let order = {
        id: "GM-" + Date.now(),
        total: subtotal + 20,
        status: status,
        date: new Date().toLocaleString()
    };

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("products");
}
