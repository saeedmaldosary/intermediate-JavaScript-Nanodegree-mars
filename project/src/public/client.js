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

const App = (state) => {
  return `
    <header>
      <h1>Mars Dashboard 🌌</h1>
    </header>
    <main>
      <section>
        <div class="grid-container">
            <div class="grid-item">
              <img src="assets/images/Opportunity.png" alt="Cinque Terre" >
              <p>Opportunity</p>
            </div>
            <div class="grid-item">
              <img src="assets/images/Curiosity.png" alt="Cinque Terre" >
              <p>Curiosity</p>
            </div>
            <div class="grid-item">
              <img src="assets/images/Spirit.png" alt="Cinque Terre" >
              <p>Spirit</p>
            </div>
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
              <p>The Mars Science Laboratory mission's Curiosity rover landed in Mars' Gale Crater the evening of August 5, 2012 PDT (morning of August 6 EDT) using a series of complicated landing maneuvers never before attempted. The specialized landing sequence, which employed a giant parachute, a jet-controlled descent vehicle and a bungee-like apparatus called a "sky crane," was devised because tested landing techniques used during previous rover missions could not safely accommodate the much larger and heavier rover.
                  Curiosity's mission is to determine whether the Red Planet ever was habitable to microbial life. The rover, which is about the size of a MINI Cooper, is equipped with 17 cameras and a robotic arm containing a suite of specialized laboratory-like tools and instruments.
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
