const inputtext = document.querySelector(".inputtext");
const button1 = document.querySelector(".button1");
const inputdate = document.querySelector(".inputdate");
const ul = document.querySelector(".unli");
const stored = localStorage.getItem("content");

let anime = [];

if (stored) {
  anime_json = JSON.parse(stored);
  anime = anime_json;
  for (let i = 0; i < anime.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${anime[i].name} on ${anime[i].date}`;
    ul.append(li);
  }
}
console.log(anime);
let anime_name = "";
let anime_date = "";

button1.addEventListener("click", () => {
  anime_name = inputtext.value;
  anime_date = inputdate.value;
  anime.push({ name: anime_name, date: anime_date });
  anime_string = JSON.stringify(anime);
  localStorage.setItem("content", anime_string);
  const li = document.createElement("li");
  li.textContent = `${anime_name} on ${anime_date}`;
  ul.append(li);
  inputdate.value = "";
  inputtext.value = "";
});
