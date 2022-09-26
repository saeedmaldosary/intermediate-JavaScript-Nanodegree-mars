// Object to store on it page data
let store = {
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  roverData: {
    landing_date: "",
    launch_date: "",
    status: "",
    images: [],
  },
};

const root = document.getElementById("root");

// Update store object
const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

window.addEventListener("load", () => {
  render(root, store);
});

// Dynamic function to show rovers
function displayRovers() {
  let results = ``;
  store.rovers.map((name) => {
    results += `<div class="grid-item" onclick="getRoverInfo('${name}',roverInfo)" style="cursor: pointer;">
    <img src="assets/images/${name}.png" alt="${name}" >
    <p>${name}</p>
  </div>`;
  });

  return results;
}

// Pure function to show rover mission
function roverMission(roverName) {
  if (roverName === "Opportunity") {
    return `Opportunity was the second of the two rovers launched in 2003 to 
    land on Mars and begin traversing the Red Planet in search of signs of ancient water.
     The rover explored the Martian terrain for almost 15 years, far outlasting her planned 90-day mission.
    `;
  } else if (roverName === "Curiosity") {
    return `The Mars Science Laboratory mission's Curiosity rover landed in Mars' 
    Gale Crater the evening of August 5, 2012 PDT (morning of August 6 EDT) 
    using a series of complicated landing maneuvers never before attempted. 
    `;
  } else {
    return `
    One of two rovers launched in 2003 to explore Mars and search for signs of past life, Spirit far 
    outlasted her planned 90-day mission, lasting over six years. Among her myriad discoveries, Spirit found
     evidence that Mars was once much wetter than it is today and helped scientists better understand the Martian wind.
    `;
  }
}

// Create page content
const App = () => {
  return `
    <header>
      <h1>Mars Dashboard 🌌</h1>
    </header>
    <main>
      <section>
        <div class="grid-container">
           ${displayRovers()}
        </div>
        <div class="grid-container" id="roverInfo" style="row-gap: 0px; display: none">
            <div class="grid-item table-item marginTop">
              <table style="width:100%">
                  <tr>
                    <th>Launch Date</th>
                    <td>${store.roverData["landing_date"]}</td>
                  </tr>
                  <tr>
                    <th>Landing Date</th>
                    <td>${store.roverData["launch_date"]}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>${store.roverData["status"]}</td>
                  </tr>
              </table>
            </div>
            <div class="grid-item marginTop">
              <p><b>Mission</b></p>
              <p>${roverMission("Curiosity")}
              </p>
            </div>
        </div>
        <div class="grid-container" id="roverPhotos">
           ${displayRoverLatestPhotos()}
        </div>
      </section>
    </main>
    `;
};

// Prepare data and show rover info - Higher-Order Function
function roverInfo(response, showResultContainerFn) {
  let objCopy = { ...store };
  let neededInfo = ["landing_date", "launch_date", "status"];
  for (let i = 0; i < neededInfo.length; i++) {
    const info = response.latest_photos[0].rover[neededInfo[i]];
    objCopy.roverData[neededInfo[i]] = info ? info : "No result";
  }
  response.latest_photos.map((photo) => {
    objCopy.roverData["images"].push(photo.img_src);
  });
  updateStore(store, objCopy);
  showResultContainerFn(true);
}

// Function to hide and display results container
function showResultContainer(show) {
  if (show === true) {
    document.getElementById("roverInfo").style.display = "grid";
    document.getElementById("roverPhotos").style.display = "grid";
  } else {
    document.getElementById("roverInfo").style.display = "none";
    document.getElementById("roverPhotos").style.display = "none";
  }
}

// Dynamic function to show rover latest photos
function displayRoverLatestPhotos() {
  let results = ``;
  store.roverData.images.map((url) => {
    results += `<div class="grid-item marginTop">
                  <img src="${url}">
                </div>`;
  });

  return results;
}

// Get result from API - Higher-Order Function
async function getRoverInfo(roverName, roverInfoFn) {
  try {
    showResultContainer(false);
    let response = await fetch("http://localhost:3000/roverInfo/" + roverName);
    response = await response.json();
    roverInfoFn(response, showResultContainer);
  } catch (e) {
    console.error(e);
  }
}
