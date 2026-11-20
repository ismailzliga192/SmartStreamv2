import { loading } from "./ui.js";
import { updateChannel, deleteChannel } from "./api.js";



export async function channelsData() {
    const response = await fetch('https://6af43b1355a1de7dcf03bdd0.mockapi.io/channels');
    if (!response.ok) {
        loading();
        throw new Error(' Failed to fetch data');

    }
    const data = await response.json();
    return data;
}

export async function FavoriteBlacklist() {

    const API_URL = "https://6af43b1355a1de7dcf03bdd0.mockapi.io/channels"

    const response = await fetch(API_URL);
    const channels = await response.json();

    for (const channel of channels) {
        await fetch(`${API_URL}/${channel.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isFavorite: false, isBlacklisted: false }),
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
        renderChannels(channels.filter((c) => c.isBlacklisted !== true));
    } catch (error) {
        message.textContent = "Impossible de charger les chaînes.";
    }
};

loadChannels();

const list = document.querySelector('#channel');

list.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const id = button.closest("[data-id]").dataset.id;
    const action = button.dataset.action;
    const channel = channels.find((c) => c.id === id);
    console.log(action, id, channel);

    if (action === "favorite") {
        try {
            const newval = !channel.isFavorite;
            await updateChannel(id, { isFavorite: newval });
            channel.isFavorite = newval;
            renderChannels(channels.filter((c) => c.isBlacklisted !== true));
            message.textContent = "Favori enregistré ✔";
        } catch (error) {
            message.textContent = "Erreur : le favori n'est pas enregistré.";
        }
    }

    if (action === "blacklist") {
        try {
            await updateChannel(id, { isBlacklisted: true, isFavorite: false });
            channel.isBlacklisted = true;
            channel.isFavorite = false;
            renderChannels(channels.filter((c) => c.isBlacklisted !== true));
            message.textContent = "Chaîne ajoutée à la blacklist ✔";
        } catch (error) {
            message.textContent = "Erreur : la chaîne n'est pas dans la blacklist.";
        }
    }

    if (action === "unban") {
        try {
            await updateChannel(id, { isBlacklisted: false });
            channel.isBlacklisted = false;
            button.closest(".CHANNELS").remove();
            message.textContent = "Chaîne retirée de la blacklist ✔";
        } catch (error) {
            message.textContent = "Erreur : la chaîne n'a pas été retirée.";
        }
    }

    if (action === "delete") {
        try {
            await deleteChannel(id);
            channels = channels.filter((c) => c.id !== id);
            button.closest(".CHANNELS").remove();
            message.textContent = "Chaîne supprimée ✔";
        } catch (error) {
            message.textContent = "Erreur : la chaîne n'a pas été supprimée.";
        }
    }
})

const favoritesButton = document.querySelector("#favo");

const showFavorites = () => {
    const favorites = channels.filter((ch) => ch.isFavorite === true);

    renderChannels(favorites);

    if (favorites.length === 0) {
        message.textContent = "Aucun favori pour le moment.";
    } else {
        message.textContent = "";
    }

    document.querySelector("#popout-page").classList.add("hidden");
};

favoritesButton.addEventListener("click", showFavorites);

const blacklistButton = document.querySelector("#popout-page #ban");

const showBlacklist = () => {
    const blacklisted = channels.filter((ch) => ch.isBlacklisted === true);

    renderChannels(blacklisted);

    if (blacklisted.length === 0) {
        message.textContent = "Aucune chaîne dans la blacklist.";
    } else {
        message.textContent = "";
    }

    document.querySelector("#popout-page").classList.add("hidden");
};

blacklistButton.addEventListener("click", showBlacklist);

