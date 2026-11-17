export async function channelsData(){
    const response = await fetch('https://6af43b1355a1de7dcf03bdd0.mockapi.io/channels');
    if(!response.ok){
        throw new Error(' Failed to fetch data')
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
 