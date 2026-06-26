fetch("http://127.0.0.1:5000/admin-orders")
.then(res => res.json())
.then(data => {
    let tbody = document.getElementById("adminOrders");
    data.forEach(o => {
        tbody.innerHTML += `
            <tr>
                <td>${o[0]}</td>
                <td>${o[1]}</td>
                <td>₹${o[2]}</td>
                <td>${o[3]}</td>
                <td>${o[4]}</td>
            </tr>
        `;
    });
});
