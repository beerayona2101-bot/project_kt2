let savedLoc = localStorage.getItem("userLocation");

            if (savedLoc) {
                document.getElementById("showLocation").innerText = savedLoc;
            }