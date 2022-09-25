let store = {
  apod: "",
};

const root = document.getElementById("root");

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

function displayRovers() {
  const roversName = ["Opportunity", "Curiosity", "Spirit"];
  var results = ``;

  roversName.map((name) => {
    results += `<div class="grid-item">
    <img src="assets/images/${name}.png" alt="${name}" >
    <p>${name}</p>
  </div>`;
  });

  return results;
}

function roverMission(roverName) {
  if (roverName === "Opportunity") {
    return `Opportunity was the second of the two rovers launched in 2003 to land on Mars and begin traversing the Red Planet in search of signs of ancient water. The rover explored the Martian terrain for almost 15 years, far outlasting her planned 90-day mission.

    After landing on Mars in 2004, Opportunity made a number of discoveries about the Red Planet including dramatic evidence that long ago at least one area of Mars stayed wet for an extended period and that conditions could have been suitable for sustaining microbial life.
    
    The Opportunity rover stopped communicating with Earth when a severe Mars-wide dust storm blanketed its location in June 2018. After more than a thousand commands to restore contact, engineers in the Mission Control at NASA's Jet Propulsion Laboratory (JPL) made their last attempt to revive Opportunity Tuesday, February 13, 2019, to no avail. The solar-powered rover's final communication was received June 10.
    `;
  } else if (roverName === "Curiosity") {
    return `The Mars Science Laboratory mission's Curiosity rover landed in Mars' Gale Crater the evening of August 5, 2012 PDT (morning of August 6 EDT) using a series of complicated landing maneuvers never before attempted. The specialized landing sequence, which employed a giant parachute, a jet-controlled descent vehicle and a bungee-like apparatus called a "sky crane," was devised because tested landing techniques used during previous rover missions could not safely accommodate the much larger and heavier rover.

    Curiosity's mission is to determine whether the Red Planet ever was habitable to microbial life. The rover, which is about the size of a MINI Cooper, is equipped with 17 cameras and a robotic arm containing a suite of specialized laboratory-like tools and instruments.
    `;
  } else {
    return `
    One of two rovers launched in 2003 to explore Mars and search for signs of past life, Spirit far outlasted her planned 90-day mission, lasting over six years. Among her myriad discoveries, Spirit found evidence that Mars was once much wetter than it is today and helped scientists better understand the Martian wind.
    
    In May 2009, the rover became embedded in soft soil at a site called "Troy" with only five working wheels to aid in the rescue effort. After months of testing and carefully planned maneuvers, NASA ended efforts to free the rover and eventually ended the mission on May 25, 2011.`;
  }
}

const App = (state) => {
  return `
    <header>
      <h1>Mars Dashboard 🌌</h1>
    </header>
    <main>
      <section>
        <div class="grid-container">
           ${displayRovers()}
        </div>
        <div class="grid-container" style="row-gap:0px">
            <div class="grid-item table-item" style="margin-top:40px;">
              <table style="width:100%">
                  <tr>
                    <th>Launch Date</th>
                    <td>2012-08-06</td>
                  </tr>
                  <tr>
                    <th>Landing Date</th>
                    <td>2011-11-26</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>active</td>
                  </tr>
              </table>
            </div>
            <div class="grid-item" style="margin-top:40px;">
              <p><b>Mission</b></p>
              <p>${roverMission("Curiosity")}
              </p>
            </div>
        </div>
      </section>
    </main>
    <footer></footer>
    `;
};

async function getRoverInfo(roverName) {
  let roverInfo;
  try {
    var response = await fetch("http://localhost:3000/roverInfo/" + roverName);
    roverInfo = await response.json();
    console.log(roverInfo);
  } catch (e) {
    console.error(e);
  }
  return roverInfo;
}

console.log(getRoverInfo());
