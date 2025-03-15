
/* Fonction pour générer la liste des cartes */
function getCardImages(gameCategory) {
    if (!gameCategory.cardPattern || !gameCategory.cardCount) return [];

    const cards = [];
    for (let i = 1; i <= gameCategory.cardCount; i++) {
        cards.push(gameCategory.cardPattern.replace("{index}", i));
    }
    return cards;
}

/* Fonction pour mélanger les cartes de manière aléatoire 
(algorithme de Fisher-Yates) */
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
        Fonction pour jouer une partie
***************************************************** */
// TODO: relancer le jeu en appuyant sur la barre d'espace
// "relancer le jeu" = ?nouvelle partie ? ou ?pause ?
function playGame(cardCount) {
    let remainingPairs = cardCount
    console.log("remaining pairs = ", remainingPairs);
    let movesNb = 0;
    let firstCard = null;
    let secondCard = null;
    let firstCardImg = null;
    let secondCardImg = null;
    let lockBoard = false; // empêche clics pendant vérif

    const cards = document.querySelectorAll('.flip-card');
        
    cards.forEach(card => {
        card.addEventListener("click", function () {
            if (lockBoard || this === firstCardImg || this.classList.contains("matched")) {
                return;
            } // Bloque les clics inutiles

            // sélectionne les faces avant et arrière de la carte retournér
            let frontFace = this.querySelector('.flip-card-front');
            let backFace = this.querySelector('.flip-card-back')
    
            // retourne la carte
            frontFace.style.visibility = "visible";
            backFace.style.visibility = "hidden";   
            
            if(!firstCard) {
                // 1ere carte retournée
                firstCard = this.querySelector('img').src;
                firstCardImg = this;
            } else {
                // 2e carte retournée
                secondCard = this.querySelector('img').src;
                secondCardImg = this;
                movesNb++;
                document.getElementById('count').innerText = movesNb;
                console.log("nb coups joués: ", movesNb);

                lockBoard = true; // bloque les clics le temps de vérifier

                if (firstCard === secondCard) {
                    // cartes identiques : restent visibles
                    firstCardImg.classList.add("matched");
                    secondCardImg.classList.add("matched");
                    remainingPairs--;
                    console.log("nb de paires restantes: ", remainingPairs);
                    resetSelection(); // réinitialiser pour prochaine paire
                } else {
                    // cartes différentes : les retourner (après un délai)
                    setTimeout(() => {
                        firstCardImg.querySelector('.flip-card-front').style.visibility = "hidden";
                        firstCardImg.querySelector('.flip-card-back').style.visibility = "visible";

                        secondCardImg.querySelector('.flip-card-front').style.visibility = "hidden";
                        secondCardImg.querySelector('.flip-card-back').style.visibility = "visible";

                        resetSelection();
                    }, 1000);    
                }

                // vérifier la fin de jeu
                if(remainingPairs === 0) {
                    setTimeout(() => alert(`Partie gagnée en ${movesNb} coups`), 500);
                }
            }
        });
    });

    function resetSelection() {
        firstCard = null;
        secondCard = null;
        firstCardImg = null;
        secondCardImg = null;
        lockBoard = false;
    }
}

/* Fonction pour rejouer */
function resetGame() {
    document.querySelectorAll('.flip-card-front').forEach(front => front.style.visibility = "hidden");
    document.querySelectorAll('.flip-card-back').forEach(back => back.style.visibility = "visible");
    init(); // Réinitialise la logique du jeu
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
            const cardNumber = 6; // pour tester

            if (!selectedCategory) {
                console.log("Catégorie introuvable !");
                return;
            }

            setUpGame(data, selectedCategory);
            playGame(cardNumber);
        });
}

window.onload = init;



