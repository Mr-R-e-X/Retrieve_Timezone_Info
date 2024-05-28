let apiKey = "5cd148e2ff4e4a3791729195b0fe086c";
let submitBtn = document.querySelector("#submit");
let userLocation = document.querySelector("#user-location");
let searchOutput = document.querySelector("#search-output");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        showPosition(position);
      },
      (error) => {
        showError("Please Give Permission to Geolocation", userLocation);
      }
    );
  } else {
    showError("Error in Geolocation", userLocation);
  }
}

async function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let userLocationApiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`;
  try {
    let data = await fetchApiData(userLocationApiUrl);
    if (data.results.length === 0) {
      showError("Please Give Permission to Geolocation");
    } else {
      let updatedUi = userLocationUI(data);
      userLocation.innerHTML = `
      <div class="">
        <div class="py-3 px-6 bg-black rounded-sm"> 
          <h1 class="text-2xl font-semibold text-white">Your Current Timezone</h1> 
        </div>
        ${updatedUi}
      </div>
      `;
    }
  } catch (error) {
    showError("Error while fetching results", userLocation);
  }
}

async function fetchApiData(url) {
  let data = await fetch(url);
  let res = await data.json();
  return res;
}

function userLocationUI(data) {
  let nameOfTimeZone = data?.results[0]?.timezone?.name;
  let lat = data?.results[0]?.bbox?.lat1;
  let lon = data?.results[0]?.bbox?.lon1;
  let offsetSTD = data?.results[0]?.timezone?.offset_STD;
  let offsetSTDSec = data?.results[0]?.timezone?.offset_STD_seconds;
  let offsetDST = data?.results[0]?.timezone?.offset_DST;
  let offsetDSTSec = data?.results[0]?.timezone?.offset_DST_seconds;
  let country = data?.results[0]?.country;
  let postcode = data?.results[0]?.postcode;
  let city = data?.results[0]?.city;
  let state = data?.results[0]?.state;
  let ui = `
    <div class="px-6 py-3 bg-black shadow-md">
      <div class="mb-4">
        ${
          nameOfTimeZone
            ? `<p class="font-medium text-white">Name of Time Zone: <span class="font-normal">${nameOfTimeZone}</span></p>`
            : ""
        }
      </div>
      <div class="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
        ${
          lat
            ? `<p class="font-medium text-white">Latitude: <span class="font-normal">${lat}</span></p>`
            : ""
        }
        ${
          lon
            ? `<p class="font-medium text-white">Longitude: <span class="font-normal">${lon}</span></p>`
            : ""
        }
      </div>
      <div class="space-y-2">
        ${
          offsetSTD
            ? `<p class="font-medium text-white">Offset STD: <span class="font-normal">${offsetSTD}</span></p>`
            : ""
        }
        ${
          offsetSTDSec
            ? `<p class="font-medium text-white">Offset STD Seconds: <span class="font-normal">${offsetSTDSec}</span></p>`
            : ""
        }
        ${
          offsetDST
            ? `<p class="font-medium text-white">Offset DST: <span class="font-normal">${offsetDST}</span></p>`
            : ""
        }
        ${
          offsetDSTSec
            ? `<p class="font-medium text-white">Offset DST Seconds: <span class="font-normal">${offsetDSTSec}</span></p>`
            : ""
        }
        ${
          postcode
            ? `<p class="font-medium text-white">Postcode: <span class="font-normal">${postcode}</span></p>`
            : ""
        }
        ${
          city
            ? `<p class="font-medium text-white">City: <span class="font-normal">${city}</span></p>`
            : ""
        }
        ${
          state
            ? `<p class="font-medium text-white">State: <span class="font-normal">${state}</span></p>`
            : ""
        }
        ${
          country
            ? `<p class="font-medium text-white">Country: <span class="font-normal">${country}</span></p>`
            : ""
        }
      </div>
    </div>
    `;
  return ui;
}

async function getAddress(address) {
  try {
    let encodedAddress = encodeURIComponent(address);
    let addressApiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&format=json&apiKey=${apiKey}`;
    let data = await fetchApiData(addressApiUrl);
    if (data.results.length === 0) {
      showError("Data Not Found");
    } else {
      let updatedUi = userLocationUI(data);
      searchOutput.innerHTML = `
      <div class="py-3 px-6"> 
        <h1 class="text-2xl font-semibold text-white">Your Result</h1> 
      </div>
      ${updatedUi}
      `;
    }
  } catch (error) {
    showError("Error while fetching results", searchOutput);
  }
}

function showError(error, position) {
  position.innerHTML = `
  <p class="text-red-500 text-sm text-center font-bold my-4">${error}</p>
  `;
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let address = document.querySelector("#address").value;
  if (address === "") {
    let emptyInput = document.createElement("p");
    emptyInput.classList.add("text-red-500", "text-sm", "font-bold", "my-4");
    emptyInput.innerText = "Please enter an address.";
    document.querySelector("#error-message").appendChild(emptyInput);
  } else {
    document.querySelector("#error-message").innerHTML = "";
    getAddress(address);
  }
});

document.addEventListener("DOMContentLoaded", getLocation);
