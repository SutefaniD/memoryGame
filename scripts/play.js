// // Faire apparitre dynamiquement les cartes
// // 1. Charger le JSON contenant les infos des cartes
// // 2. Générer les cartes et les ajouter dans .memory-board
// // 3. Afficher le recto et le verso des cartes avec des images
// quand on clique sur une carte, elle se retourne (face de la carte)


// Fonction pour générer la liste des cartes
function getCardImages(category) {
    if (!category.cardPattern || !category.cardCount) return [];

    const cards = [];
    for (let i = 1; i <= category.cardCount; i++) {
        cards.push(category.cardPattern.replace("{index}", i));
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

/* Fonction d'initialisation */
function init() {
    const memoryBoard = document.querySelector(".memory-board");

    // Charger le JSON
    fetch("~/../data.json")
        .then((response) => response.json())
        .then((data) => {
            console.log("données chargées :", data);

            const selectedCategory = data["memory-legume"];
            if (!selectedCategory) {
                console.log("Catégorie introuvable !");
                return;
            }

            const cardImages = getCardImages(selectedCategory);
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

            // Générer les cartes HTML
            cardsDoubled.forEach((imgSrc) => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `<img src="${imgSrc}" class="front-face" alt="Carte">`;

                // Ajouter un événement pour retourner la carte
                card.addEventListener("click", function() {
                    card.classList.toggle("flip"); // Applique ou retire la classe "flip"
                });

                memoryBoard.appendChild(card);
            });
            console.log("cartes mélangées:", cardsDoubled);


        })
        .catch((error) => console.error("Erreur de chargement JSON :", error));

}

window.onload = init;



/*<img src="assets/question.svg" class="back-face" alt="Dos">*/