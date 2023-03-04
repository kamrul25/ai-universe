// Load AI Universe Hub API by fetch
const fetchAi = (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAi(data.data.tools, dataLimit))
    .catch((error) => {
      console.error(error);
    });
};

const displayAi = (tools, dataLimit) => {
  const toolsContainer = document.getElementById("tools-container");
  toolsContainer.innerHTML = "";

  // display all ai by date to date when "sort by date "button clicked

  // display all ai when show all button clicked
  const showAll = document.getElementById("show-all");
  if (dataLimit && tools.length > 6) {
    tools = tools.slice(0, 6);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  tools.forEach((tool) => {
    // console.log(tool);
    const { id, name, image, published_in, features } = tool;

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
            <i class="fa-solid fa-circle-arrow-right fa-2x text-danger cursor" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchAiDetails('${id}')"></i>
          </div>
        </div>
    `;
    toolsContainer.appendChild(createDiv);
  });
};

// Make serial by date

// Showing all tools when seen more clicked
document.getElementById("btn-show-all").addEventListener("click", function () {
  fetchAi();
});

// load data by id for modal
const fetchAiDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAiDetails(data.data))
    .catch((error) => console.log(error));
};
// Display details about ai tool
const displayAiDetails = (data) => {
  const {image_link, input_output_examples, accuracy, description, features, integrations, pricing, } = data;
  const modalDetails = document.getElementById("modal-details");
  modalDetails.innerHTML = `
 <div class="col">
  <div class="card bg-body-secondary">
    <div class="card-body">
      <h3>${description}</h3>
      <div id="price-card" onload="pricingLoad()" class="row row-cols-1 row-cols-md-3 g-4 mt-3" >
      </div>
      <div  onload="qualificationLoad()" class="row row-cols-1 row-cols-md-2 g-4 mt-3">
        <div class="col">
        <h5 class="h4">Features</h5>
        <ul id="features-container" onload="featuresLoad()"></ul>
        </div>
        <div class="col ">
        <h5 class="h4">Integrations</h5>
        <ul id="integrations-container" onload="integrationsLoad()"></ul>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col ">
  <div class="card">
    <div class="card-body" onload="">
        <img src=${image_link[0]} alt="" class="card-img-top img-fluid ">
        <button id="accuracy-btn" onload="accuracyButton()" class="btn btn-danger position-accuracy "></button>
        <div id="examples" class="text-center mt-4"></div>
    </div>
  </div>
</div>
  `;
  // Pricing cards
  const pricingLoad = () => {
    const pricingCard = document.getElementById("price-card");
    if (pricing) {
      pricingCard.innerHTML = `
      <div class="col ">
        <div class="card modal-nested-card" >
          <div class="card-body text-success text-center">
            <span>${pricing[0] ? pricing[0].price : ""}</span> <br>
            <span>${pricing[0] ? pricing[0].plan : ""}</span>
          </div>
       </div> 
      </div> 
      <div class="col ">
        <div class="card modal-nested-card" >
          <div class="card-body text-warning-emphasis text-center">
            <span>${pricing[1] ? pricing[1].price : ""}</span> <br>
            <span>${pricing[1] ? pricing[1].plan : ""}</span>
          </div>
        </div> 
      </div> 
      <div class="col ">
        <div class="card modal-nested-card" >
          <div class="card-body text-danger text-center">
            <span>${pricing[2] ? pricing[2].price : ""}/</span> <br>
            <span>${pricing[2] ? pricing[2].plan : ""}</span>
          </div>
        </div> 
      </div> 
      `;
    } else {
      pricingCard.innerHTML = `
      <div class="col ">
        <div class="card modal-nested-card" >
          <div class="card-body text-success text-center">
            <span>Free of cost</span> <br>
            <span>/Basic</span>
          </div>
        </div> 
      </div> 
      <div class="col ">
        <div class="card modal-nested-card" >
          <div class="card-body text-warning-emphasis text-center">
            <span>Free of cost</span> <br>
            <span>/Pro</span>
          </div>
        </div> 
      </div> 
      <div class="col ">
        <div class="card modal-nested-card" >
         <div class="card-body text-danger text-center">
            <span>Free of cost</span> <br>
            <span>/Enterprise</span>
          </div>
        </div> 
      </div> 
      `;
    }
  };
  pricingLoad();
  // Feature 
  const featuresLoad =()=>{
    const featuresContainer = document.getElementById("features-container");
    if(features){
      for(const key in features){
        const li = document.createElement("li");
        li.innerHTML = `${features[key].feature_name}`;
        featuresContainer.appendChild(li);
      }
    }else{
      featuresContainer.innerHTML=`<p class="card-title">No data Found</p>`;
    }
  }
  featuresLoad();
  // Integrations
  const integrationsLoad = () =>{
    const integrationsContainer = document.getElementById("integrations-container");
    if(integrations){
      integrations.forEach(integration => {
       const li = document.createElement("li");
       li.innerHTML = `${integration}`;
       integrationsContainer.appendChild(li);
      })
    }else{
      integrationsContainer.innerHTML=`<p class="card-title">No data Found</p>`;
    }
  }
  integrationsLoad();
  // Accuracy Button
  const accuracyButton = () => {
    const accuracyDetail = document.getElementById("accuracy-btn");
    const examples = document.getElementById("examples");
    if (accuracy.score) {
      accuracyDetail.innerHTML = `${accuracy.score} accuracy`;
      if (input_output_examples) {
        examples.innerHTML = `
        <h5 class="h5">${
          input_output_examples[0] ? input_output_examples[0].input : ""
        }</h5>
        <p class="card-title">${
          input_output_examples[0] ? input_output_examples[0].output : ""
        }</p>
        `;
      } else {
        examples.innerHTML = "";
      }
    } else {
      accuracyDetail.classList.add("d-none");
      if (input_output_examples) {
        examples.innerHTML = `
        <h5 class="h5">${
          input_output_examples[1] ? input_output_examples[1].input : ""
        }</h5>
        <p class="card-title">${
          input_output_examples[1] ? input_output_examples[1].output : ""
        }</p>
        `;
      } else {
        examples.innerHTML = "";
      }
    }
  };
  accuracyButton();
};

// Spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
    fetchAi(7);
    loaderSection.classList.add("d-none");
  } else {
    loaderSection.classList.remove("d-none");
  }
};
toggleSpinner(true);
