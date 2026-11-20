import { getChannels, updateChannel, createChannel } from "./api.js";
import { filtercountry, SearchChannels } from "./search.js";

console.log(getChannels());

const channel = document.getElementById('channel');
const popout = document.getElementById("popout-page");
const openButton = document.getElementById("open-popout");
const closeButton = document.getElementById("close-popout");
const img_load = document.getElementById('imgload');
const info_load = document.getElementById('info_load');
const popoutbtn = document.getElementById("popout-p");
const openmenu = document.getElementById("popout-menu");
const close = document.getElementById('close-add')

export function renderChannels(List) {
    channel.innerHTML = List.map((ch) => {
        const buttons = ch.isBlacklisted === true
            ? `<button data-action="unban" class="text-xl text-white">Unban</button>
               <button data-action="delete" class="text-black text-2xl">🗑</button>`
            : `<button data-action="favorite" id="fav" class="fv text-2xl text-yellow-300">${ch.isFavorite === true ? "★" : "☆"}</button>
               <button data-action="blacklist" id="ban" class="text-2xl text-red-700">🛇</button>
               <button data-action="delete" class="text-black text-2xl">🗑</button>`;

        return `<li class="CHANNELS flex flex-row cursor-pointer gap-0.5 bg-purple-600 h-20 w-full border border-white hover:bg-purple-900" data-id="${ch.id}">
                  <div class="flex flex-row gap-2 w-full items-center">
                     <img src="${ch.logo}" alt="${ch.name}" class="h-full w-1/8"></img>
                     <div class="flex flex-row items-center justify-between gap-2 w-full">
                       <p class="text-white">${ch.name}</p>
                       <div data-id="${ch.id}">
                       ${buttons}
                       </div>
                     </div>  
                  </div>
                </li>`;
    }).join('');
}



function openPopout() {
    popout.classList.remove("hidden");
}

function closePopout() {
    popout.classList.add("hidden");
}
openButton.addEventListener("click", openPopout);
closeButton.addEventListener("click", closePopout);
popout.addEventListener("click", function (event) {
    if (event.target === popout) {
        closePopout();
    }
});

export async function ChannelsContent() {
    const preview = document.getElementById('imgpreview')
    const info = document.getElementById('info')
    const data = await getChannels();
    channel.addEventListener('click', (e) => {
        let screeninfo = e.target.closest('.CHANNELS');

        preview.innerHTML = ``
        data.forEach(e => {
            if (e.id === screeninfo.dataset.id) {
                preview.innerHTML = `<video-player>
         <video-scaffold-skin style="display: block; width: 100%; aspect-ratio: 16 / 9; --media-controls-before-start: visible;">
           <hlsjs-video src="https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM.m3u8" playsinline></hlsjs-video>
           </video-scaffold-skin>
         
           </video-player>`

                info.innerHTML = ` <img src="${e.logo}" alt="${e.name}">
        <div class="flex flex-col text-2xl text-white gap-3 h-full">
            <h2 class="mb-6">[${e.name}]</h2>
            <p class="mb-6">[${e.epg.currentProgram}]</p>
            <h3 class="text-2xl text-white"> Description:</h3>
            <p>"${e.epg.description}"</p>
        </div>
        <div class="flex flex-col text-2xl text-white">
             <p>"${e.epg.startTime}"</p>
             <p>"${e.epg.endTime}"</p>
        </div>`        }
        })



    })

}
export function changeBgChannel() {
    channel.addEventListener('click', (e) => {
        const item = e.target.closest('.CHANNELS');
        if (!item) return;

        channel.querySelectorAll('.CHANNELS').forEach(li => {
            li.classList.remove('bg-black');
            li.classList.add('bg-purple-600');
        });
        item.classList.remove('bg-purple-600');
        item.classList.add('bg-black');
    });
}

export function loading() {
    img_load.classList.remove('hidden');
    info_load.classList.remove('hidden');
}

function openM() {
    openmenu.classList.remove("hidden");
}

function closeM() {
    openmenu.classList.add("hidden");
}

popoutbtn.addEventListener("click", openM);
close.addEventListener("click", closeM);
popout.addEventListener("click", function (event) {
    if (event.target === popoutbtn) {
        closePopout();
    }
});

async function addchannel() {

    const nom = document.getElementById('add-name');
    const logo = document.getElementById('add-logo');
    const country = document.getElementById('add-country');
    const sub = document.getElementById('submit1');
    const data = await getChannels()

    sub.addEventListener('click', function (event) {
      event.preventDefault()
        const Newchannel = {
            id: data.length + 1,
            channelNumber: " ",
            name: nom.value,
            category: " ",
            country: country.value,
            countryLogo: "",
            logo: logo.value,
            previewImage: "https://placehold.co/800x450?text=FRANCE+3+Show",
            epg: {
                currentProgram: "Des racines et des ailes",
                description: "Un magazine qui part à la découverte du patrimoine, des paysages et des savoir-faire des régions françaises.",
                startTime: "20:50",
                endTime: "21:50",
                progressPercentage: 17
            },
            isFavorite: false,
            isBlacklisted: false
        };
        
        createChannel(Newchannel);
        closeM();
    })

}


ChannelsContent();
filtercountry();
SearchChannels();
changeBgChannel();
addchannel();








