import { loading } from "./ui.js";
export async function channelsData(){
    const response = await fetch('https://6af43b1355a1de7dcf03bdd0.mockapi.io/channels');
    if(!response.ok){
        loading();
        throw new Error(' Failed to fetch data');
        
    }
    const data = await response.json();
    return data;
}

export async function FavoriteBlacklist(){

const API_URL = "https://6af43b1355a1de7dcf03bdd0.mockapi.io/channels"

const response = await fetch(API_URL);
const channels = await response.json();

for (const channel of channels) {
    await fetch(`${API_URL}/${channel.id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ isFavorite: false, isBlacklisted: false}),
    });
    console.log(channel);
}
console.log("Terminé !");
}

import { getChannels } from "./api.js";
import { renderChannels } from "./ui.js";

const message = document.querySelector("#message");
let channels = [];

const loadChannels = async () => {
  try {
    message.textContent = "Chargement...";
    channels = await getChannels();
    message.textContent = "";
    renderChannels(channels);
  } catch (error) {
    message.textContent = "Impossible de charger les chaînes.";
  }
};

loadChannels();
 