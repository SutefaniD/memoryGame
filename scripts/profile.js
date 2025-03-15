/************************************************************
        Récupérer et afficher les informations de profil
************************************************************/
function displayProfile() {

    // Récupérer l'utilisateur connecté depuis le localStorage
let userSession = localStorage.getItem('userSession');
console.log(userSession);

// Vérifier si un utilisateur est bien connecté
if (userSession) {
    let user = JSON.parse(userSession); // convertir la chaîne JSON en objet JS
    
    // Afficher ses informations dans le formulaire
    document.getElementById('name').value = user.userName;
    document.getElementById('email').value = user.userMail;
} else {
    // si pas d'utilisateur connecté
    alert("Vous n'êtes pas connecté");
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
}

}


/************************************************************
    Afficher l'image correspondant au melory sélectionné
************************************************************/
function displayImage() {
    const optSelected = document.getElementById('memory-selection');
    const imgDisplay = document.getElementById('memory-img');
    const selectedValue = optSelected.value;

    const imagePath = "assets/" + selectedValue + "/memory_detail"
    let imgName = "";

    switch (selectedValue) {
        case "alphabet-scrabble":
            imgName = "_scrabble";
            break;
        case "animaux":
            imgName = "_animaux";
            break;
        case "window.onload = init;":
            imgName = "_animaux_animes";
            break;
        case "animauxDomestiques":
            imgName = "_animaux_domestiques";
            break;
        case "chiens":
            imgName = "_chiens";
            break;
        case "dinosaures":
            imgName = "_dinosaures";
            break;
        case "dinosauresAvecNom":
            imgName = "_dinosaures_avec_nom";
            break;
        case "memory-legume": // Handle the special case for memory-legume
            imgName = ""; // No suffix needed for "memory-legume"
            break;
        default:
            imgName = "_animaux_animes";
            break;
    }

    // si une image est sélectionnée, on l'affiche
    if (imgName !== undefined) {
        imgDisplay.src = imagePath + imgName + ".png";
        imgDisplay.style.display = "block"; // s'assurer que l'image est visible
    } else {
        imgDisplay.style.display = "none";
    }


    console.log('imagePath:', imgDisplay.src)
}



function init() {
    displayProfile();
    document.getElementById('memory-selection').addEventListener('change', displayImage)

    //document.getElementById('registerBtn').addEventListener('click', registerOptions);

}

window.onload = init;