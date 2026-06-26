const locationsDB = {
    miyapur: ["HMT Colony", "JP Colony", "PJR Nagar"],
    kukatpally: ["Moosapet", "Vivekananda Nagar", "Balanagar"],
    ameerpet: ["Punjagutta", "SR Nagar", "Begumpet"],
    gachibowli: ["Nanakramguda", "Financial District", "Kondapur"],
    kondapur: ["Raghavendra Colony", "Hafeezpet", "Madhapur"]
};

const commonNearby = [
    "Main Road",
    "Market Area",
    "Bus Stand",
    "Railway Station"
];

function normalize(text) {
    return text.toLowerCase().trim();
}

function capitalizeWords(text) {
    return text.replace(/\b\w/g, c => c.toUpperCase());
}

function updateLocation() {
    const input = document.getElementById("locationInput").value;
    const list = document.getElementById("shopsList");
    const map = document.getElementById("mapPreview");

    const key = normalize(input);

    if (key.length < 2) {
        list.innerHTML = "<li class='muted'>Start typing to see nearby areas</li>";
        return;
    }

    map.src = "https://www.google.com/maps?q=" + key + "&output=embed";
    list.innerHTML = "";

    let found = false;

    for (let area in locationsDB) {
        if (area.includes(key) || key.includes(area)) {
            locationsDB[area].forEach(place => {
                addListItem(place);
            });
            found = true;
        }
    }

    if (!found) {
        commonNearby.forEach(place => {
            addListItem(capitalizeWords(key) + " " + place);
        });
    }
}

function addListItem(name) {
    const list = document.getElementById("shopsList");
    const li = document.createElement("li");

    li.innerText = capitalizeWords(name);
    li.onclick = () => {
        localStorage.setItem("userLocation", capitalizeWords(name));
        document.getElementById("mapPreview").src =
            "https://www.google.com/maps?q=" + name + "&output=embed";
    };

    list.appendChild(li);
}
