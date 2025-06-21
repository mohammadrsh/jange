lucide.createIcons();
const map = L.map("map").setView([32.1975138, 50.4677976], 5.5);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var myIcon = L.divIcon({ className: "attack-icon" });

var droneIcon = L.icon({
  iconUrl: "test.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

let reds = [];
let attacks = [];
fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    reds = json.reds;
    attacks = json.attacks;
    reds.forEach((item) => {
      L.circle([item.lat, item.lon], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.2,
        radius: 100000,
      }).addTo(map);
    });
    attacks.forEach((item) => {
      L.marker([item.lat, item.lon], { icon: droneIcon })
        .addTo(map)
        .bindPopup(item.name);
    });
  });

  const input = document.getElementById("stateInput");
const button = document.getElementById("toggleDropdown");
const dropdown = document.getElementById("dropdownList");

let states = [];


function goToLocation(lat, lon, zoom = 10) {
  map.flyTo([lat, lon], zoom, {
      animate: true,
      duration: 1.5
  });
}

// Load JSON
fetch("states.json")
  .then((res) => res.json())
  .then((data) => {
    states = data;
    renderDropdown(states);
  });

function renderDropdown(states) {
  dropdown.innerHTML = "";
  states.forEach((state) => {
    const li = document.createElement("li");
    li.textContent = state.name;
    li.dataset.id = state.id;
    li.addEventListener("click", () => {
      input.value = state.name;
      dropdown.classList.add("hidden");
      goToLocation(state.lat, state.lon, 10);
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