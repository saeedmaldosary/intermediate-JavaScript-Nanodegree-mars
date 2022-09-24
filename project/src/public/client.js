let store = {
  user: { name: "Student" },
  apod: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  let { rovers, apod } = state;

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

      <div class="grid-item" style="margin-top:40px;">
      <p><b>Mission</b></p>
    <p>The Mars Science Laboratory mission's Curiosity rover landed in Mars' Gale Crater the evening of August 5, 2012 PDT (morning of August 6 EDT) using a series of complicated landing maneuvers never before attempted. The specialized landing sequence, which employed a giant parachute, a jet-controlled descent vehicle and a bungee-like apparatus called a "sky crane," was devised because tested landing techniques used during previous rover missions could not safely accommodate the much larger and heavier rover.

    Curiosity's mission is to determine whether the Red Planet ever was habitable to microbial life. The rover, which is about the size of a MINI Cooper, is equipped with 17 cameras and a robotic arm containing a suite of specialized laboratory-like tools and instruments.
    </p>
      </div>
         
        </section>
      </main>
      <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
            <h1>Welcome, ${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
  }
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));

  return data;
};
