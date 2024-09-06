const socket = io();
let marker; // Variable to hold the marker

if(navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const {latitude, longitude} = position.coords;

        // Send location data to the server
        socket.emit("send-location", {latitude, longitude});

        // Update marker position on the map
        if (!marker) {
            marker = L.marker([latitude, longitude]).addTo(map);
        } else {
            marker.setLatLng([latitude, longitude]);
        }

        // Optionally adjust the view to center on the new location
        map.setView([latitude, longitude], 13);

    }, (error) => {
        console.error(error);
    }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });
}

// Leaflet map initialization
const map = L.map("map").setView([0, 0], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "OpenStreetMap"
}).addTo(map);
