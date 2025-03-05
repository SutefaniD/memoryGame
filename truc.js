// pour récupérer un fichier json

// fetch('data.json')
// .then((response) => response.json())
// .then((data) => displayData(data))

// function displayData(data) {
//     console.log(data);
// }

// enregistrer dans localStorage les infos du formulaire d'inscription

// 1. Enregistrer les données dans le localStorage
window.localStorage.setItem("nom", getUserName);



// 2. Récupérer les données des users avec getItem()
let users = window.localStorage.getItem("users");
if (users === null) {
    // récupérer des données depuis fichier json
    const users = await fetch('data.json').then(users => users.json());
    // transformation des users en JSON
    const usersValue = JSON.stringify(users);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("users", usersValue);
} else {
    users = JSON.parse(users);
}

