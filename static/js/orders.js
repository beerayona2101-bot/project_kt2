let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

let box =
    document.getElementById("ordersList");

if (orders.length === 0) {
    box.innerHTML = "<p>No orders yet</p>";
}

orders.forEach(o => {
    let div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";

    div.innerHTML = `
        <strong>Order ID:</strong> ${o.id}<br>
        <strong>Total:</strong> ₹${total}<br>
        <strong>Status:</strong> ${status}<br>
        <strong>Date:</strong> ${date}
    `;

    box.appendChild(div);
});
