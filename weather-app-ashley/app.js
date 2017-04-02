const my_key = '72f9bdc3596c005622aa'
const my_w_key='25490ad5e09fcf2543a677891784320c'

const uri = 'https://locationiq.org/v1/search.php?key='
const apiKey = my_key
const city = document.getElementById('city').value
const country = document.getElementById('country').value

const w_url = 'http://api.openweathermap.org/data/2.5/forecast?'


const cityData = []
 const form = document.getElementById('weather')
 form.addEventListener('submit',(e)=>{
 	e.preventDefault()
 	const myDIV = document.getElementById('display')
    while (myDIV.hasChildNodes()) {
        myDIV.removeChild(myDIV.lastChild)
    }

fetch(`${uri}${apiKey}&format=json&city=${city}&country=${country}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(my_w_key)

    getWeather(data[0].lat,data[0].lon)
 
  })
  .catch((e) => console.log(e, "what's happening dave?"))
})

function getWeather(lat, long)
{
fetch(`${w_url}lat=${lat}&lon=${long}&APPID=${my_w_key} `)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)

let date,desc,temp,icon
    

    console.log(date)
    console.log(desc)
    console.log(temp)

    for(let i = 0;i<35;i=i+7)
    {
    date = data.list[i].dt_txt
    desc = data.list[i].weather[0].description
    temp = data.list[i].main.temp
    icon = data.list[i].weather[0].icon
    show_w_data(date,desc,temp,icon)
    }
  })
  .catch((e) => console.log(e, "what's happening dave?"))
}

function show_w_data(date,desc,temperature,icon)
{

    const myDIV = document.getElementById('display')
    let my_date = document.createElement('h2')
    let my_desc_h3 = document.createElement('h3')
    let my_temp_h3 = document.createElement('h3')
    let myIMG = document.createElement('img')
    let my_span = document.createElement('span')
    let url = `icons/${icon}.png`
    let temp = Math.round(temperature - 273.15)
    date = date.substr(0,date.indexOf(' '))
    myIMG.setAttribute('src',url)
    my_date.textContent = date
    my_desc_h3.textContent = desc
    my_temp_h3.textContent =  `${temp} `
    my_span.innerHTML = '&#176'
    my_temp_h3.appendChild(my_span)
    my_temp_h3.textContent = my_temp_h3.textContent + 'C'
    myDIV.appendChild(my_date)
    myDIV.appendChild(my_desc_h3)
    myDIV.appendChild(my_temp_h3)
    myDIV.appendChild(myIMG)
}