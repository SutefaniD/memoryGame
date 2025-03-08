
/* Fonction pour générer la liste des cartes */
function getCardImages(gameCategory) {
    if (!gameCategory.cardPattern || !gameCategory.cardCount) return [];

    const cards = [];
    for (let i = 1; i <= gameCategory.cardCount; i++) {
        cards.push(gameCategory.cardPattern.replace("{index}", i));
    }
    return cards;
}

/* Fonction pour mélanger les cartes de manière aléatoire (algorithme de Fisher-Yates) */
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Fonction pour créer un élément de carte HTML */
function createCardElement(frontImage, backImage) {
    const card = document.createElement('div');
    card.classList.add('flip-card');

    // face de la carte
    const frontFace = document.createElement("div");
    frontFace.classList.add("flip-card-front");
    frontFace.innerHTML = `<img src="${frontImage}" alt="face">`;

    // dos de la carte
    const backFace = document.createElement("div");
    backFace.classList.add("flip-card-back");
    backFace.innerHTML = `<img src="${backImage}" alt="dos de la carte">`;

    // Par défaut, on affiche seulement le dos
    frontFace.style.visibility = "hidden";
    backFace.style.visibility = "visible";

    // ajouter un événement pour retourner la carte
    card.addEventListener("click", function (event) {
        if (frontFace.style.visibility === "hidden") {
            frontFace.style.visibility = "visible"; // Afficher la face avant
            backFace.style.visibility = "hidden";   // Cacher la face arrière
        } else {
            frontFace.style.visibility = "hidden";  // Cacher la face avant
            backFace.style.visibility = "visible";  // Afficher la face arrière
        }
    });

    // ajouter les faces au conteneur de la carte
    card.appendChild(frontFace);
    card.appendChild(backFace);
    

    return card;
}

/* *****************************************************
        Fonction pour générer le jeu de cartes
***************************************************** */
// TODO: nombre de cartes dépend du choix dans profil => à récupérer
// TODO: catégorie du jeu à récupérer (choix dans profil)
function setUpGame(data, selectedCategory) {
    const memoryBoard = document.querySelector('.memory-board');
    const gameCategory = data[selectedCategory];
    // const cardCount = gameCategory.cardCount;
    // const cardPattern = gameCategory.cardPattern;
    const cardBackImage = "assets/question.svg";

    // réinitiliser le plateau
    memoryBoard.innerHTML = "";

    // récupérer les images des cartes
    let cardImages = getCardImages(gameCategory);
    if (cardImages.length === 0) {
        console.log("Aucune carte trouvée !");
        return;
    }

    // Doubler les cartes pour avoir des paires
    console.log("cartes générées :", cardImages); // Liste des images générées
    let cardsDoubled = cardImages.concat(cardImages);
    console.log("cartes doublées :", cardsDoubled); // Liste des cartes doublées

    // Mélanger les cartes
    shuffleCards(cardsDoubled);
    console.log("cartes mélangées: ", cardsDoubled);

    // Créer les cartes HTML et les ajouter au plateau de jeu
    cardsDoubled.forEach((frontImage) => {
        const cardElement = createCardElement(frontImage, cardBackImage);
        memoryBoard.appendChild(cardElement);
    });

}

/* *****************************************************
                  Fonction d'initialisation
***************************************************** */
function init() {

    // Charger le JSON
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            console.log("données chargées :", data);

            // TODO : récupérer la catégorie sélectionnée dans le profil
            // TODO : récupérer le nb de cartes dans le profil
            const selectedCategory = "memory-legume"; // pour tester
            if (!selectedCategory) {
                console.log("Catégorie introuvable !");
                return;
            }

            setUpGame(data, selectedCategory);
        });
}

window.onload = init;



