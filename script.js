let userTimezoneDiv = document.querySelector("#user-timezone");
// let outputDiv = document.querySelector("#search-output");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geolocation");
    window.alert("No geolocation");
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
  userTimezoneDiv.innerHTML = `
  <p> ${lat} </p>
  <p> ${lon} </p>
    <p> ${jsonData.results[0].address_line1} </p>
    <p> ${jsonData.results[0].address_line2} </p>
    <p> ${jsonData.results[0].postcode} </p>

  `;
}
document.addEventListener("DOMContentLoaded", getLocation);
