// retourne img.src
function findImagePath(selValue) {

    const imagePath = "assets/" + selValue + "/memory_detail"
    let imgName = "";

    switch (selValue) {
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
        case "memory-legume": 
            imgName = ""; 
            break;
        default:
            imgName = "_animaux_animes";
            break;
    }

    return imagePath + imgName + ".png";

  


    console.log('imagePath:', imgDisplay.src)
}



}