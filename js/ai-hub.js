// Load AI Universe Hub API by fetch
const fetchAI = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAI(data.data.tools))
    .catch((error) => {
      console.error(error);
    });
};

const displayAI = (tools) => {
  const toolsContainer = document.getElementById("tools-container");
//   toolsContainer.innerHTML = "";
  tools.forEach((tool) => {
    // console.log(tool);
    const { name, image, published_in, features } = tool;
    const createDiv = document.createElement("div");
    createDiv.classList.add("col");
    createDiv.innerHTML = `         
        <div class="card p-4">
          <img src=${image} class="card-img-top img-fluid rounded" alt="">
          <div class="">
            <h3 class="card-title mt-4 mb-3">Features</h3>
            <ol class="card-text">
              <li class="card-text">${features[0]}</li>
              <li class="card-text">${features[1]}</li>
              <li class="card-text">${features[2] ? features[2] : ""}</li>
            </ol>
          </div>
          <hr class="mt-4">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h3 class="card-title" >${name}</h3>
              <i class="fa-regular fa-calendar-days "></i>  <span>${published_in}</span>
            </div>
            <i class="fa-solid fa-circle-arrow-right fa-2x text-danger"></i>
          </div>
        </div>
    `;
    toolsContainer.appendChild(createDiv);
  });
};
fetchAI();
