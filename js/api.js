// Adresse de mon API MockAPI, toutes les requêtes partent de là
const API_URL = "https://6af43b1355a1de7dcf03bdd0.mockapi.io/channels";

// GET : lire toutes les chaînes
// Fonction asynchrone exportée pour pouvoir l'utiliser dans les autres fichiers
export const getChannels = async () => {
  // J'envoie la requête GET et j'attends la réponse du serveur
  const response = await fetch(API_URL);
  // Si le serveur répond avec une erreur (404, 500...), je lance une erreur avec le code
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  // Je convertis la réponse JSON en tableau JavaScript et je le renvoie
  return response.json();
};

// POST : ajouter une chaîne
// Cette fonction reçoit l'objet de la nouvelle chaîne
export async  function createChannel(channel){
  // Je fais une requête avec la méthode POST pour créer une ressource
  const response = await fetch(API_URL, {
    // Méthode HTTP utilisée : POST = créer
    method: "POST",
    // Je dis au serveur que j'envoie du JSON
    headers: { "Content-Type": "application/json" },
    // Je transforme l'objet en texte JSON pour l'envoyer
    body: JSON.stringify(channel),
  });
  console.log('hsdgq');
  // Je vérifie que la création s'est bien passée
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  // Je renvoie la chaîne créée, avec son id généré par MockAPI
  return response.json();
};

// PUT : modifier une chaîne
// Elle reçoit l'id de la chaîne et les champs à changer
export const updateChannel = async (id, changes) => {
  // J'ajoute l'id à l'URL pour viser une seule chaîne
  const response = await fetch(`${API_URL}/${id}`, {
    // PUT = modifier une ressource existante
    method: "PUT",
    // Le corps de la requête est du JSON
    headers: { "Content-Type": "application/json" },
    // J'envoie les modifications sous forme de texte JSON
    body: JSON.stringify(changes),
  });
  // Je vérifie que la modification a réussi
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  // Je renvoie la chaîne mise à jour
  return response.json();
};

// DELETE : supprimer une chaîne
// Elle reçoit l'id de la chaîne à supprimer
export const deleteChannel = async (id) => {
  // DELETE sur l'URL avec l'id : le serveur supprime cette chaîne
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  // Je vérifie que la suppression a réussi
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  // Je renvoie la chaîne supprimée
  return response.json();
};