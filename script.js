// let userTimezoneDiv = document.querySelector("#user-timezone");
// let outputDiv = document.querySelector("#search-output");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geolocation");
  }
}

async function showPosition(position) {
  //   fetchData(position.coords.latitude, position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, " ", lon);
  await fetchData(lat, lon);
}

async function fetchData(lat, lon) {
  console.log(typeof lat);
  console.log(typeof lon);
  let data = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=5cd148e2ff4e4a3791729195b0fe086c`
  );
  let jsonData = await data.json();
  console.log(jsonData);
}
document.addEventListener("DOMContentLoaded", getLocation);