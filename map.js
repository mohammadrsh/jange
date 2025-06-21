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
fetch("http://localhost:8000")
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
