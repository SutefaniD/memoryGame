// selection du memory -> affichage image
function imageDisplay() {
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
    document.getElementById('memory-selection').addEventListener('change', imageDisplay)

    //document.getElementById('registerBtn').addEventListener('click', registerOptions);

}

window.onload = init;