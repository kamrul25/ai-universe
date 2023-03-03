// Load AI Universe Hub API by fetch
const fetchAI = (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAI(data.data.tools, dataLimit))
    .catch((error) => {
      console.error(error);
    });
};

const displayAI = (tools , dataLimit) => {
  const toolsContainer = document.getElementById("tools-container");
  toolsContainer.innerHTML = "";

  // display all ai when show all button clicked
  const showAll = document.getElementById("show-all");
  if(dataLimit && tools.length > 6){
    tools = tools.slice(0,6);
    showAll.classList.remove("d-none");
  }
  else{
    showAll.classList.add("d-none");
  }

  tools.forEach((tool) => {
    // console.log(tool);
    const { name, image, published_in, features } = tool;
    const createDiv = document.createElement("div");
    createDiv.classList.add("col", "mb-3");
    createDiv.innerHTML = `         
        <div class="card p-3 ">
          <img src=${image} class="card-img-top img-fluid image " alt="">
          <div class="">
            <h3 class="card-title mt-4 mb-3">Features</h3>
            <div class="card-text">
              <p >1. ${features[0]}</p>
              <p >2. ${features[1]}</p>
              <p >3. ${features[2] ? features[2] : ""}</p>
            </div>
          </div>
          <hr class="">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h3 class="card-title" >${name}</h3>
              <i class="fa-regular fa-calendar-days "></i>  <span>${published_in}</span>
            </div>
            <i class="fa-solid fa-circle-arrow-right fa-2x text-danger" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal"></i>
          </div>
        </div>
    `;
    toolsContainer.appendChild(createDiv);
  });
//  toggleSpinner(false);
};

document.getElementById("btn-show-all").addEventListener('click', function(){
  fetchAI();
  // toggleSpinner(false);
});

// Spinner
const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById("loader");
  if(isLoading){
    loaderSection.classList.remove("d-none");
    fetchAI(7);
    loaderSection.classList.add("d-none");
  }else{
    loaderSection.classList.remove("d-none");
  }
};

toggleSpinner(true) ;

