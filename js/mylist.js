document.addEventListener("DOMContentLoaded", () => {
  const rentedContainer = document.getElementById("rented-items");
  let rentals = JSON.parse(localStorage.getItem("rentedItems")) || [];

  if (rentals.length === 0) {
    rentedContainer.innerHTML = "<h3>No items rented yet.</h3>";
    return;
  }

  rentals.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('listing');
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title || item.name}">
      <h3>${item.title || item.name}</h3>
      <p>Location: ${item.location}</p>
      <p>Price: $${item.price_per_month || item.price_per_day}</p>
      <p>Status: ${item.availability ? "Available" : "Not Available"}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    rentedContainer.appendChild(itemDiv);
  });

  rentedContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.getAttribute("data-index");
      rentals.splice(index, 1);
      localStorage.setItem("rentedItems", JSON.stringify(rentals));
      location.reload();
    }
  });


  const userElement = document.getElementById("user");
  const logOutBtn = document.getElementById("logOut");
  const onlineUser = JSON.parse(localStorage.getItem("onlineUser"));

  if (onlineUser) {
    userElement.textContent = onlineUser.username;
  } else {
    userElement.textContent = "Guest";
  }

  logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("onlineUser");
    window.location.href = "auth.html";
  });
});
