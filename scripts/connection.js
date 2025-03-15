
/************************************************************
        Formulaire de connexion
************************************************************/
// comparer l'email et le mot de passe saisis par l'utilisateur avec ceux du localStorage

/* récupérer le tableau d'utilisateurs du localStorage */

function getUsers() {
    let users = [];

    for(let i = 0; i<localStorage.length;i++) {
        let key = localStorage.key(i);

        if(key.startsWith('user')) {
            let user = JSON.parse(localStorage.getItem(key));
            users.push(user);
        }
    }
    return users;
}

/* Fonction de connexion */
function connectUser(event) {

    // empêcher la soumission du formulaire
    event.preventDefault();

    const userMail = document.getElementById('email').value;
    const userPwd = document.getElementById("pwd").value;

    // récupérer les utilisateaurs enregistrés dans le localStorage
    let usersArray =  getUsers();

    let userFound = null;

    // vérifier si  l'email et le mot de passe correspondent
    for (let i = 0; i < usersArray.length; i++) {
        if ((usersArray[i].userMail === userMail) && (usersArray[i].userPwd === userPwd)) {
            userFound = usersArray[i];
            break;
        }
    }

    if(userFound) {
        // stocker l'utilisateur connecté dans le localStorage, clé 'userSession'
        localStorage.setItem('userSession', JSON.stringify(userFound));

        // afficher l'alerte
        alert(`L'email ${userMail} est connecté`);

        // après un délai, rediriger vers la page profil
        setTimeout(function () {
            window.location.href = "profile.html";
        }, 500);

    } else {
        alert("Erreur, veuillez saisir les informations correctement");
    }

    

}



function init() {
    document.getElementById('submitForm').addEventListener('submit', connectUser);

}

window.onload = init;