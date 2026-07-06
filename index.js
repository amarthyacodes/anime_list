const anime_name = document.getElementById("anime_name")
const anime_date = document.getElementById("anime_date")
const submit = document.getElementById("submit")
const info_div = document.querySelector(".info")



function addAnime(name, date, image){
    const new_div = document.createElement("div")
    const new_name = document.createElement("p")
    const new_img = document.createElement("img")
    const new_date = document.createElement("p")
    const nddiv = document.createElement("div")

    new_div.classList.add("animediv")
    new_name.classList.add("animename")
    new_date.classList.add("animedate")
    new_img.classList.add("animeimage")
    nddiv.classList.add("nddiv")


    new_img.src = image
    new_name.innerHTML = `${name}`
    new_date.innerHTML = `${date}`
    
    info_div.appendChild(new_div)
    new_div.appendChild(new_img)
    new_div.appendChild(nddiv)
    nddiv.appendChild(new_name)
    nddiv.appendChild(new_date)
    
}

async function getAnimeinfo(name){
    try{
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(name)}`)
    if(!response.ok){
        throw new Error("error")
    }
        const info = await response.json()
        
        if(info.data[0] == null){
            return null
        }
        else{
            console.log(info)
        return(info.data[0])
        }
    }
    catch(error){
        console.log(error)
        return null
    }
}


let obj = []

if (localStorage.getItem("anime")){
obj = JSON.parse(localStorage.getItem("anime"))

obj.forEach(element => {
    addAnime(element.name, element.date, element.imgurl)
});
}


submit.addEventListener("click", async () =>{
    if(anime_name.value === "" || anime_date.value === ""){
        window.alert("Enter name and date")
    }
   else{
    const anime_data = await getAnimeinfo(anime_name.value)
    if(anime_data === null){
        window.alert("No such anime")
    }
    else{
    addAnime(anime_data.title, anime_date.value, anime_data.images.jpg.image_url)
    obj.push({name: anime_data.title, date: anime_date.value, imgurl: anime_data.images.jpg.image_url})
    localStorage.setItem("anime", JSON.stringify(obj))
    }
    
}
    anime_name.value = ""
    anime_date.value = ""
    
})

