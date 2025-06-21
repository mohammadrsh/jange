const input = document.getElementById("stateInput");
const button = document.getElementById("toggleDropdown");
const dropdown = document.getElementById("dropdownList");

let states = [];

// Load JSON
fetch("states.json")
  .then((res) => res.json())
  .then((data) => {
    states = data;
    renderDropdown(states);
  });

function renderDropdown(list) {
  dropdown.innerHTML = "";
  list.forEach((state) => {
    const li = document.createElement("li");
    li.textContent = state.name;
    li.dataset.id = state.id;
    li.addEventListener("click", () => {
      input.value = state.name;
      dropdown.classList.add("hidden");
    });
    dropdown.appendChild(li);
  });
}

// Toggle dropdown visibility
button.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Filter as user types
input.addEventListener("input", () => {
  const filtered = states.filter((state) =>
    state.name.toLowerCase().includes(input.value.toLowerCase())
  );
  renderDropdown(filtered);
  dropdown.classList.remove("hidden");
});

// Hide dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!document.getElementById("stateSelector").contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});