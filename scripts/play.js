// paquet de cartes * 2
// dos cartes : assets/question.svg

// const optSelected = "animauxAnimes";
// const imagePath = "assets/" + optSelected;

// let img = document.createElement('img');
// img.src = imagePath;

// const imagesArr = [];

// document.appendChild(img);

document.addEventListener("DOMContentLoaded", function() {
    // Tableau d'objets avec des données d'images (nom et chemin de l'image)
    const imageData = [
        { src: "assets/animauxAnimes/1.webp", title: "Image 1" },
        { src: "assets/animauxAnimes/2.webp", title: "Image 2" },
        { src: "assets/animauxAnimes/3.webp", title: "Image 3" },
        { src: "assets/animauxAnimes/4.webp", title: "Image 4" },
        { src: "assets/animauxAnimes/5.webp", title: "Image 5" },
        { src: "assets/animauxAnimes/6.webp", title: "Image 6" },
        { src: "assets/animauxAnimes/7.webp", title: "Image 7" },
        { src: "assets/animauxAnimes/8.webp", title: "Image 8" },
    ];

    // Cibler la section où les cartes seront ajoutées
    const section = document.getElementById('image-cards-section');

    // Fonction pour créer et afficher les cartes d'images
    function displayImageCards(images) {
        images.forEach(image => {
            // Créer un élément div pour la carte
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Créer un élément image
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            
            // Créer un élément titre pour la carte
            const title = document.createElement('div');
            title.classList.add('card-title');
            title.textContent = image.title;

            // Ajouter l'image et le titre à la carte
            card.appendChild(img);
            card.appendChild(title);

            // Ajouter la carte à la section
            section.appendChild(card);
        });
    }

    // Appeler la fonction pour afficher les cartes
    displayImageCards(imageData);
});



function init() {

}

window.onload = init;