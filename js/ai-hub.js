// Load AI Universe Hub API by fetch
const fetchAI = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(res => res.json()).then(data => displayAI(data.data.tools))
    .catch((error) => {
        console.error( error);
    });
}

const displayAI = tools =>{
    console.log(tools);
}
fetchAI();