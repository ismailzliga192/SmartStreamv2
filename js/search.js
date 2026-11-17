import { channelsData } from "./app.js";


const country = document.getElementById('categories');
const channel = document.getElementById('channel');

export async function filtercountry(){
   const data = await channelsData() 
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
                       <div>
                       <button id="fav" class="text-2xl text-white">☆</button>
                       <button id="ban" class="text-2xl text-red-700">🛇</button>
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
                       <div>
                         <button id="fav" class="text-2xl text-white">☆</button>
                         <button id="ban" class="text-2xl text-red-700">🛇</button>
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
    const data = await channelsData();
    search.addEventListener('input', (S) =>{
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
                       <div>
                       <button id="fav" class="text-2xl text-white">☆</button>
                       <button id="ban" class="text-2xl text-red-700">🛇</button>
                       </div>
                     </div>  
                  </div>
                `;
                channel.appendChild(list)
       })
      

    })
}