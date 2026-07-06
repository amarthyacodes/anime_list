const anime_name = document.getElementById("anime_name")
const anime_date = document.getElementById("anime_date")
const submit = document.getElementById("submit")
const info_div = document.querySelector(".info")



function addAnime(name, date, image){
    const new_div = document.createElement("div")
    const new_info = document.createElement("p")
    const new_img = document.createElement("img")

    new_div.classList.add("animediv")
    new_info.classList.add("animeinfo")
    new_img.classList.add("animeimage")

    new_img.src = image
    new_info.innerHTML = `${name} on ${date}`
    info_div.appendChild(new_div)
    new_div.appendChild(new_info)
    new_div.appendChild(new_img)
}

async function getAnimepic(name){
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
        return(info.data[0].images.jpg.image_url)
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
    const anime_image = await getAnimepic(anime_name.value)
    if(anime_image === null){
        window.alert("No such anime")
    }
    else{
    addAnime(anime_name.value, anime_date.value, anime_image)
    obj.push({name: anime_name.value, date: anime_date.value, imgurl: anime_image})
    localStorage.setItem("anime", JSON.stringify(obj))
    }
    
}
    anime_name.value = ""
    anime_date.value = ""
    
})

