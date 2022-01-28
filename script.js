const paramTemplate = '<input class="q-input"  placeholder="Param Key" />';
const queryTemplate =
  '<input class="q-input" placeholder="Query Key" /><input class="q-input" placeholder="Query Value" />';
var baseUrl = "https://website.ir";
const params_container = document.querySelector('#params-container')
const queries_container = document.querySelector('#queries-container')
const url_container  =document.querySelector('#url-container')

var paramCounter = 0;
var queryCounter = 0;

const addNewParam = () => {
  if(params_container.children[paramCounter].firstElementChild.value !== ''){
    const div =  document.createElement('div')
    div.classList.add('keyValue-box')
    div.innerHTML = paramTemplate
    params_container.appendChild(div)
  } else{
    return null
  }
  paramCounter ++
};

const addNewQuery = () => {
  if (queries_container.children[queryCounter].firstElementChild.value !== '' 
  && queries_container.children[queryCounter].lastElementChild.value !== ''){
    const div =  document.createElement('div')
    div.classList.add('keyValue-box')
    div.innerHTML = queryTemplate
    queries_container.appendChild(div)
  } else{
    return null
  }
  queryCounter ++
};

const paramsHandler =() => {
  for (let i=0 ; i<params_container.childElementCount; i++){
    if (params_container.children[i].firstElementChild.value.trim().length === 0 ){} 
    else{baseUrl += '/' + params_container.children[i].firstElementChild.value}
  }
}

const queryHandler =() => {
  for (let i=0 ; i < queries_container.childElementCount; i++){
    if (queries_container.children[i].firstElementChild.value.trim().length ===0  || queries_container.children[i].lastElementChild.value.trim().length ===0 ){}
    else if ( queries_container.childElementCount === 1 ){
      baseUrl += `?${queries_container.children[i].firstElementChild.value}
      =${queries_container.children[i].lastElementChild.value}`
    } 
    else{
      if ( i===0 ){
        if (queries_container.children[i].firstElementChild.value === queries_container.children[i+1].firstElementChild.value){
          baseUrl += `?${queries_container.children[i+1].firstElementChild.value}
          =${queries_container.children[i+1].lastElementChild.value}`
        } else{
          baseUrl += `?${queries_container.children[i].firstElementChild.value}
          =${queries_container.children[i].lastElementChild.value}`
        }
      }

      else if ( i === queries_container.childElementCount - 1 ){
        if (queries_container.children[i].firstElementChild.value === queries_container.children[i-1].firstElementChild.value){}
        else {
          baseUrl += `&${queries_container.children[i].firstElementChild.value}
          =${queries_container.children[i].lastElementChild.value}`
        }
      }

      else {
        if (queries_container.children[i].firstElementChild.value === queries_container.children[i-1].firstElementChild.value){}
        else if (queries_container.children[i].firstElementChild.value === queries_container.children[i+1].firstElementChild.value){
          baseUrl += `&${queries_container.children[i+1].firstElementChild.value}
          =${queries_container.children[i+1].lastElementChild.value}`
        }
        else {
          baseUrl += `&${queries_container.children[i].firstElementChild.value}
          =${queries_container.children[i].lastElementChild.value}`
        }
      }   
    }
  }
}

const generateURL = () => {
  paramsHandler();
  queryHandler()
  url_container.innerText = baseUrl
  baseUrl = "https://website.ir"
};

const renderUrl = (url) => {
  const el = document.getElementById("url-container");
  el.innerHTML = `<p>${url}</p>`;
};

document.getElementById("param-submit").addEventListener("click", addNewParam);
document.getElementById("query-submit").addEventListener("click", addNewQuery);
document.getElementById("generate").addEventListener("click", generateURL);
