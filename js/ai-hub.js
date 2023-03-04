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
 
  // display all ai when show all button clicked
  const showAll = document.getElementById("show-all");
  if (dataLimit && tools.length > 6) {
    tools = tools.slice(0, 6);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  tools.forEach((tool) => {
    const { id, name, image, published_in, features} = tool;

    const createDiv = document.createElement("div");
    createDiv.classList.add("col", "mb-3");
    createDiv.innerHTML = `         
        <div class="card p-3 ">
          <img src=${image} class="card-img-top img-fluid rounded image-height"  alt="">
          <div class="">
            <h3 class="card-title mt-4 mb-3">Features</h3>
            <ol>
                <li>${features[0]}</li>
                <li>${features[1]}</li>
               <div id="displayFeatures-container"  onload="displayFeature()">
               <li id="third-li" class="">${features[2]}</li>
               <li id="fourth-li" class="d-none" >${features[3]}</li>
               </div
            </ol>
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
     
    const displayFeature =()=>{
      // const container = document.getElementById("displayFeatures-container");
      // if(features[2]){
      //   console.log(features[2]);
      //   const thirdLi = document.getElementById("third-li");
      //   thirdLi.classList.remove("d-none");
      // }else{
      //   const thirdLi = document.getElementById("third-li");
      //   thirdLi.classList.remove("d-none");
      //   const fourthLi = document.getElementById("fourth-li");
      //   fourthLi.classList.remove("d-none");
      // }
      // // if(features[2] || features[3]){
   
      // // }
      // // else{
      // //   const container = document.getElementById("displayFeatures-container");
      // //   container.classList.add("d-none");
      // // }
    }
    displayFeature();
  });


    
};

// Make serial by date
document.getElementById("sort-by-date-btn").addEventListener('click', function(){
  // displayAi();
  // fetchAi();
});
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
      <div id="price-card" onload="pricingLoad()" class="row row-cols-2 row-cols-md-3 g-4 mt-3" >
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
        <button id="accuracy-btn" onload="accuracyButton()" class="btn btn-danger position-absolute top-0 end-0 "></button>
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
          <div class="card-body  text-success ">
            <div class ="text-center">
              <span>${pricing[0] ? pricing[0].price : ""}</span> <br>
              <span >${pricing[0] ? pricing[0].plan : ""}</span>
            </div>
          </div>
       </div> 
      </div> 
      <div class="col ">
        <div class="card modal-nested-card" >
          <div class="card-body text-warning-emphasis ">
            <div class ="text-center">          
              <span>${pricing[1] ? pricing[1].price : ""}</span> <br>
              <span>${pricing[1] ? pricing[1].plan : ""}</span>
              </div>
          </div>
        </div> 
      </div> 
      <div class="col ">
        <div class="card modal-nested-card" >
          <div class="card-body text-danger ">
            <div class ="text-center">
             <span>${pricing[2] ? pricing[2].price : ""}/</span> <br>
             <span >${pricing[2] ? pricing[2].plan : ""}</span>
            </div>
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
          input_output_examples[0] ? input_output_examples[0].input : "Can you give any example?"
        }</h5>
        <p class="card-title">${
          input_output_examples[0] ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"
        }</p>
        `;
      } else {
        examples.innerHTML = `
        <h5 class="h4">Can you give any example?</h5>
        <p class="card-title">No! Not Yet! Take a break!!!</p>
        `;
      }
    } else {
      accuracyDetail.classList.add("d-none");
      if (input_output_examples) {
        examples.innerHTML = `
        <h5 class="h5">${
          input_output_examples[1] ? input_output_examples[1].input : "Can you give any example?"
        }</h5>
        <p class="card-title">${
          input_output_examples[1] ? input_output_examples[1].output : "No! Not Yet! Take a break!!!"
        }</p>
        `;
      } else {
        examples.innerHTML = `
        <h5 class="h4">Can you give any example?</h5>
        <p class="card-title">No! Not Yet! Take a break!!!</p>
        `;
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
