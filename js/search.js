import { getChannels } from "./api.js";


const country = document.getElementById('categories');
const channel = document.getElementById('channel');
const favorite = document.getElementById('fav');

export async function filtercountry(){
   const data = await getChannels() 
   country.addEventListener('click', (event) => {

     if(event.target.tagName === 'BUTTON'){
         channel.innerHTML='';
        data.forEach(element =>{
            if(element.country === event.target.id){
                const list = document.createElement('li');
                list.className = "CHANNELS flex flex-row cursor-pointer gap-0.5 bg-purple-600 h-20 w-full border border-white hover:bg-purple-900"
                list.dataset.id = element.id
                list.innerHTML=`
                  <div class="flex flex-row gap-2 w-full items-center">
                     <img src="${element.logo}" alt="${element.name}"></img>
                      <div class="flex flex-row items-center justify-between gap-2 w-full">
                       <p class="text-white">${element.name}</p>
                       <div data-id="${element.id}">
                       <button data-action="favorite" id="fav" class="fv text-2xl text-yellow-300">${element.isFavorite === true ? "★" : "☆"}</button>
                       <button data-id="blacklist" id="ban" class="text-2xl text-red-700">🛇</button>
                       <button data-action="delete" class="text-black text-2xl">🗑</button>
                       </div>
                     </div>  
                  </div>
                `;
                channel.appendChild(list)
            }else if(event.target.id === 'ALL'){
                const list = document.createElement('li');
                list.className = "CHANNELS flex flex-row cursor-pointer gap-0.5 bg-purple-600 h-20 w-full border border-white hover:bg-purple-900"
                list.dataset.id = element.id
                list.innerHTML=`
                  <div class="flex flex-row gap-2 w-full items-center">
                     <img src="${element.logo}" alt="${element.name}"></img>
                    <div class="flex flex-row items-center justify-between gap-2 w-full">
                       <p class="text-white">${element.name}</p>
                       <div data-id="${element.id}">
                       <button data-action="favorite" id="fav" class="fv text-2xl text-yellow-300">${element.isFavorite === true ? "★" : "☆"}</button>
                       <button data-id="blacklist" id="ban" class="text-2xl text-red-700">🛇</button>
                       <button data-action="delete" class="text-black text-2xl">🗑</button>
                       </div>
                     </div>  
                  </div>
                `;
                channel.appendChild(list)
                

            }
        })
        
     }
   })
}

export async function SearchChannels() {
    const search = document.getElementById('search')
    const data = await getChannels();
    search.addEventListener('input', (e) =>{
       const value = search.value.toLowerCase();
       const chfilter = data.filter(e => e.name.toLowerCase().includes(value))
       channel.innerHTML='';
       chfilter.forEach(element =>{
         const list = document.createElement('li');
                list.className = "CHANNELS flex flex-row cursor-pointer gap-0.5 bg-purple-600 h-20 w-full border border-white hover:bg-purple-900"
                list.dataset.id = element.id
                list.innerHTML=`
                  <div class="flex flex-row gap-2 w-full items-center">
                     <img src="${element.logo}" alt="${element.name}"></img>
                     <div class="flex flex-row items-center justify-between gap-2 w-full">
                       <p class="text-white">${element.name}</p>
                       <div data-id="${element.id}">
                       <button data-action="favorite" id="fav" class="fv text-2xl text-yellow-300">${element.isFavorite === true ? "★" : "☆"}</button>
                       <button data-id="blacklist" id="ban" class="text-2xl text-red-700">🛇</button>
                       <button data-action="delete" class="text-black text-2xl">🗑</button>
                       </div>
                     </div>  
                  </div>
                `;
                channel.appendChild(list)
       })
      

    })
}
