document.addEventListener("DOMContentLoaded", function () {

    let products = [
        { id: 1, name: "Basmati Rice", brand: "India Gate", category: "rice", image: "https://picsum.photos/300/200?1", price: 120, qty: 0 },
        { id: 2, name: "Sona Masuri Rice", brand: "Daawat", category: "rice", image: "https://picsum.photos/300/200?2", price: 95, qty: 0 },
        { id: 3, name: "Kolam Rice", brand: "Fortune", category: "rice", image: "https://picsum.photos/300/200?3", price: 90, qty: 0 },

        { id: 4, name: "Santoor Soap", brand: "Santoor", category: "soaps", image: "https://picsum.photos/300/200?4", price: 35, qty: 0 },
        { id: 5, name: "Medimix Soap", brand: "Medimix", category: "soaps", image: "https://picsum.photos/300/200?5", price: 40, qty: 0 },
        { id: 6, name: "Lifebuoy Soap", brand: "Lifebuoy", category: "soaps", image: "https://picsum.photos/300/200?6", price: 30, qty: 0 },

        { id: 7, name: "Sunflower Oil", brand: "Fortune", category: "oils", image: "https://picsum.photos/300/200?7", price: 150, qty: 0 },
        { id: 8, name: "Groundnut Oil", brand: "Dhara", category: "oils", image: "https://picsum.photos/300/200?8", price: 165, qty: 0 },

        { id: 9, name: "Tomato", brand: "Fresh", category: "vegetables", image: "https://picsum.photos/300/200?9", price: 25, qty: 0 },
        { id: 10, name: "Potato", brand: "Fresh", category: "vegetables", image: "https://picsum.photos/300/200?10", price: 30, qty: 0 },

        { id: 11, name: "Milk Packet", brand: "Amul", category: "dairy", image: "https://picsum.photos/300/200?11", price: 28, qty: 0 },
        { id: 12, name: "Curd", brand: "Heritage", category: "dairy", image: "https://picsum.photos/300/200?12", price: 35, qty: 0 }
    ];

    let saved = JSON.parse(localStorage.getItem("products"));
    if (saved) {
        products = saved;
    }

    let container = document.getElementById("productsContainer");
    let currentView = products;

    function render(list) {
        container.innerHTML = "";

        list.forEach(p => {
            let card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <img src="${p.image}">
                <div class="product-info">
                    <div class="product-name">${p.name}</div>
                    <div class="product-brand">${p.brand}</div>

                    <div class="add-btn" style="${p.qty > 0 ? "display:none" : ""}">
                        <button onclick="addItem(${p.id})">Add</button>
                    </div>

                    <div class="qty-controls" style="${p.qty > 0 ? "display:flex" : ""}">
                        <button onclick="changeQty(${p.id}, -1)">-</button>
                        <span>${p.qty}</span>
                        <button onclick="changeQty(${p.id}, 1)">+</button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

        localStorage.setItem("products", JSON.stringify(products));
    }

    window.addItem = function (id) {
        let p = products.find(x => x.id === id);
        p.qty = 1;
        render(currentView);
    };

    window.changeQty = function (id, delta) {
        let p = products.find(x => x.id === id);
        p.qty += delta;
        if (p.qty < 0) p.qty = 0;
        render(currentView);
    };

    window.filterItems = function (category) {
        if (category === "all") {
            currentView = products;
        } else {
            currentView = products.filter(p => p.category === category);
        }
        render(currentView);
    };

    render(products);
});
