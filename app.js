const GET_URL = 'https://text-translator2.p.rapidapi.com/getLanguages';

const translateFrom = document.querySelector("#translateForm");

const translateTo = document.querySelector("#translateTo");


const options = {
	method: 'get',
	headers: {
		'X-RapidAPI-Key': '250eaf2135msh26ecdbefcc69bebp1ed07bjsnb217bd2dda0e',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

let source_languague;
let target_languague;

fetch(GET_URL,options)
    .then(res=> res.json()) 
    .then(data =>{
        //El Codigo necesario para la carga de Select
        const languague = data.data.languages;

        languague.forEach(element => {
            translateFrom.innerHTML +=`<option value="${element.code}">${element.name}</option>`;
            translateTo.innerHTML +=`<option  value="${element.code}">${element.name}</option>`;
        });
        translateFrom.addEventListener('click',()=>{
            source_languague= translateFrom.value;
        });
        translateTo.addEventListener('click',()=>{
            target_languague = translateTo.value;
        })
    })
    .catch(error=>console.log(error));

//Caoturar los datos del textarea para enviarlo al servidor
const translate = document.querySelector('#btnTraducir');
const textTranslate = document.querySelector('#inputTranslate');
const resultToTranslate = document.querySelector('#resultToTranslate');
const POST_URL = 'https://text-translator2.p.rapidapi.com/translate';


translate.addEventListener('click',()=>{
    let textToTransalate = textTranslate.value;


    const encodeParams = new URLSearchParams();
    encodeParams.append("source_language",source_languague);
    encodeParams.append("target_language",target_languague);
    encodeParams.append("text",textToTransalate);
    const option = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '250eaf2135msh26ecdbefcc69bebp1ed07bjsnb217bd2dda0e',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodeParams
    };

    fetch(POST_URL,option)
    .then(res=> res.json()) 
    .then(response => {
        resultToTranslate.innerHTML = response.data.translatedText
        })
    .catch(error=>console.log(error));


})



