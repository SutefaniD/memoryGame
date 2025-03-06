
/************************************************************
        Formulaire de connexion
************************************************************/
// comparer l'email et le mot de passe saisis par l'utilisateur avec ceux du localStorage

/* récupérer le tableau d'utilisateurs du localStorage */

function getUsers() {
    return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
}

function connectUser(event) {

    // empêcher la soumission du formulaire
    event.preventDefault();

    const userMail = document.getElementById('email').value;
    const userPwd = document.getElementById("pwd").value;

    // récupérer les utilisateaurs enregistrés dans le localStorage
    let usersArray =  getUsers();

    let userFound = false;

    // vérifier si  l'email et le mot de passe correspondent
    for (let i = 0; i < usersArray.length; i++) {
        if ((usersArray[i].userMail === userMail) && (usersArray[i].userPwd === userPwd)) {
            userFound = true;
            // afficher l'alerte
            alert(`L'email ${userMail} est connecté`);

            // après un délai, rediriger vers la page profil
            setTimeout(function () {
                window.location.href = "profile.html";
            }, 1000);

            break;
        }
    }

    // si ça ne correspond pas, alerte
    if (!userFound) {
        alert("Erreur, veuillez saisir les informations correctement");
    }

}



function init() {
    document.getElementById('submit').addEventListener('click', connectUser);

}

window.onload = init;