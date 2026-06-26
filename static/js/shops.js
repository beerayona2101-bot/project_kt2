let location =
    localStorage.getItem("userLocation");

document.getElementById("locationName").innerText =
    location || "your area";

let demoShops = [
    {
        name: "Bala Kirana Store",
        rating: 4.4,
        image: "https://picsum.photos/300/200?random=11"
    },
    {
        name: "Lakshmi General Store",
        rating: 4.2,
        image: "https://picsum.photos/300/200?random=12"
    },
    {
        name: "STC Super Market",
        rating: 4.6,
        image: "https://picsum.photos/300/200?random=13"
    },
    {
        name: "Sri Sai Kirana & Stores",
        rating: 4.3,
        image: "https://picsum.photos/300/200?random=14"
    },
    {
        name: "Ramesh Provisions",
        rating: 4.1,
        image: "https://picsum.photos/300/200?random=15"
    },
    {
        name: "Fresh Mart Daily Needs",
        rating: 4.5,
        image: "https://picsum.photos/300/200?random=16"
    }
];

let container =
    document.getElementById("shopsContainer");

demoShops.forEach(shop => {
    let card =
        document.createElement("div");

    card.className =
        "shop-card";

    card.innerHTML = `
        <img src="${shop.image}" alt="${shop.name}">
        <div class="shop-info">
            <div class="shop-name">
                ${shop.name}
            </div>
            <div class="shop-rating">
                ⭐ ${shop.rating}
            </div>
        </div>
    `;

    container.appendChild(card);
});
