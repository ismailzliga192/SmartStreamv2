export async function channelsData(){
    const response = await fetch('https://6af43b1355a1de7dcf03bdd0.mockapi.io/channels');
    if(!response.ok){
        throw new Error(' Failed to fetch data')
    }
    const data = await response.json();
    return data;
}