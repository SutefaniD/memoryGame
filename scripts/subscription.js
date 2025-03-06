/************************************************************
        Function to check the length of the user name
************************************************************/
function checkNameLength(event) {

    const elementInputContainer = event.target.closest(".input-container");   /* closest to id=userName */
    const imgContainer = elementInputContainer.querySelector(".img-container");
    const newP = document.createElement('p');

    // Delete existing image (if any)
    const existingImg = imgContainer.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }

    // Deleting <p> if existing
    const existingP = elementInputContainer.querySelector('p');
    if (existingP) {
        existingP.remove();
    }


    // Check name length
    if (event.target.value.length < 3) {
        let img = document.createElement('img');
        img.src = 'assets/error.svg';
        imgContainer.appendChild(img);

        newP.textContent = "Choisissez un pseudo contenant au moins 3 caractères.";
        newP.style.color = "red";
        imgContainer.insertAdjacentElement('afterend', newP);

    } else {
        let img = document.createElement('img');
        img.src = 'assets/check.svg';
        imgContainer.appendChild(img);

        const existingP = elementInputContainer.querySelector('p');
        if (existingP) {
            existingP.remove();
        }

    }
    validateForm();  // Appel à validateForm() après chaque modification

}

/************************************************************
        Function to check mail validity
************************************************************/

function checkEmail(email) {
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*[a-zA-Z0-9]$/;

    return re.test(email);

}

function mailValidity(event) {
    const elementInputContainer = event.target.closest(".input-container");   /* closest to id=userMail */
    const imgContainer = elementInputContainer.querySelector(".img-container");
    const p = document.getElementById('mailMsg');
    const email = event.target.value.trim(); /* récupérer la valeur de l'input mail */

    p.innerText = "Rentrez un email valide";
    p.style.color = "red";
    p.hidden = true;

    const existingImg = imgContainer.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }

    if (!checkEmail(email)) {
        let img = document.createElement('img');
        img.src = 'assets/error.svg';
        imgContainer.appendChild(img);
        p.hidden = false;


    } else {
        let img = document.createElement('img');
        img.src = 'assets/check.svg';
        imgContainer.appendChild(img);
        p.hidden = true;

    }
    validateForm();  // Appel à validateForm() après chaque modification
}

/************************************************************
        Function to check password
************************************************************/

function checkPassword(pwd) {
    let re = /^(?=(.*\d))(?=.*[^\w\s]).{6,}$/;  /* at least one number,  one symbol, and be 6 characters long */
    return re.test(pwd);
}

function pwdValidity(event) {
    const elementInputContainer = event.target.closest(".input-container");   /* closest to id=pwd */
    const imgContainer = elementInputContainer.querySelector(".img-container");
    const pwd = event.target.value.trim(); // Get the password value

    // Remove existing feedback image
    const existingImg = imgContainer.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }

    // validate the password using the checkPassword function
    if (!checkPassword(pwd)) {
        console.log(pwd)
        let img = document.createElement('img');
        img.src = 'assets/error.svg';
        imgContainer.appendChild(img);


    } else {
        console.log(pwd)
        let img = document.createElement('img');
        img.src = 'assets/check.svg';
        imgContainer.appendChild(img);

    }
    validateForm();  // Appel à validateForm() après chaque modification
}


/* Password strength checking functions */
function checkWeak(password) {
    return password.length <= 6;
}

function checkMedium(password) {
    return password.length > 6 && (/[0-9]/.test(password) || /[^\w\s]/.test(password));
}

function checkStrong(password) {
    return password.length >= 9 && /[0-9]/.test(password) && /[^\w\s]/.test(password);
}

/* Password input Assistance */
/* quand plus de 6 caractères mais pas de symbole ou chiffre, pas de barre */
function pwdHelp(event) {
    const pwd = event.target.value.trim();
    const orange = document.getElementById('orange');
    const yellow = document.getElementById('yellow');
    const green = document.getElementById('green');

    const orangeText = document.getElementById('orange-text');
    orangeText.textContent = "Faible";
    const yellowText = document.getElementById('yellow-text');
    yellowText.textContent = "Moyen";
    const greenText = document.getElementById('green-text');
    greenText.textContent = "Fort";

    let isWeak = checkWeak(pwd);
    let isMedium = checkMedium(pwd)
    let isStrong = checkStrong(pwd)

    console.log('isWeak', isWeak, 'isMedium', isMedium, 'isStrong', isStrong);

    /* Display bars and text */
    if (isStrong) {
        orange.classList.add("visible");
        yellow.classList.add("visible");
        green.classList.add("visible");

        orangeText.style.display = "block";
        yellowText.style.display = "block";
        greenText.style.display = "block";
    } else if (isMedium) {
        orange.classList.add("visible");
        yellow.classList.add("visible");
        green.classList.remove("visible");

        orangeText.style.display = "block";
        yellowText.style.display = "block";
        greenText.style.display = "none";
    } else if (isWeak) {
        orange.classList.add("visible");
        yellow.classList.remove("visible");
        green.classList.remove("visible");

        orangeText.style.display = "block";
        yellowText.style.display = "none";
        greenText.style.display = "none";
    } else {
        orange.classList.remove("visible");
        yellow.classList.remove("visible");
        green.classList.remove("visible");

        orangeText.style.display = "none";
        yellowText.style.display = "none";
        greenText.style.display = "none";
    }
}

/************************************************************
        Function to recheck password
************************************************************/
function recheckPwd() {
    // Récupérer la valeur du mot de passe original
    const pwdOriginal = document.getElementById('pwd').value;

    // Récupérer la valeur du mot de passe confirmé (pwd-check)
    const checkPwd = document.getElementById('pwd-check').value;

    // Affichage des valeurs pour débogage
    console.log("Mot de passe original : " + pwdOriginal);
    console.log("Mot de passe confirmé : " + checkPwd);

    const imgContainer = document.getElementById('same');

    // Remove existing feedback image
    const existingImg = imgContainer.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }

    // Vérification si les deux mots de passe sont identiques
    if (pwdOriginal === checkPwd) {
        console.log("Les mots de passe correspondent.");
        let img = document.createElement('img');
        img.src = 'assets/check.svg';
        imgContainer.appendChild(img);
        return true;



    } else {
        console.log("Les mots de passe ne correspondent pas.");
        let img = document.createElement('img');
        img.src = 'assets/error.svg';
        imgContainer.appendChild(img);
        return false;
    }
    validateForm();  // Appel à validateForm() après chaque modification

}



/************************************************************
        Function to validate the form
************************************************************/
function validateForm() {
    const userName = document.getElementById('userName').value;
    const userMail = document.getElementById('userMail').value;
    const userPwd = document.getElementById('pwd').value;

    const isNameValid = userName.length >= 3;
    const isMailValid = checkEmail(userMail);
    const isPwdValid = checkPassword(userPwd) && recheckPwd();

    const submitBtn = document.getElementById('submit-btn');

    if (isNameValid && isMailValid && isPwdValid) {
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';

    } else {
        console.log("erreur: nom non valide")
        submitBtn.disabled = true;   // Désactive le bouton

    }
}


/************************************************************
        Function to register data in localStorage 
        (called when submit button is clicked on)
************************************************************/

function registerUser(event) {
    /* l'objet event contient les infos spécifiques sur l'événement qui se produit:
     - l'élément qui a déclenché l'événement (ici le bouton)
     - le type d'événement (clic)
     - méthodes permettant de contrôler le comportement de l'événement (preventDefault() )
    */

    // Empêcher la soumission du formulaire si une erreur est présente
    event.preventDefault(); /* empêche redirection vers la page de connexion */

    const userName = document.getElementById('userName').value;
    const userMail = document.getElementById('userMail').value;
    const userPwd = document.getElementById('pwd').value;


    // Créer un objet pour un nouvel utilisateur
    const newUser = {
        userName: userName,
        userMail: userMail,
        userPwd: userPwd
    };

    // Vérifier si le nouvel utilisateur n'utilise pas un email ou un nom déjà utilisé
    if (!checkNewUserUnicity(newUser)) {
        return; // utilisateur ne peut pas être ajouté s'il existe déjà
    }

    // Récupérer la liste des utilisateurs existants du localStorage
    let usersArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];  // load any pre-existing items in localStorage; if there aren't any, create an empty array

    // Ajouter le nouvel utilisateur au tableau
    usersArray.push(newUser);

    // Sérialiser le tableau des utilisateurs en JSON et l'enregistrer dans le localStorage
    localStorage.setItem('users', JSON.stringify(usersArray));

    // Affichage console
    //console.log('Nouvel utilisateur enregistré:', newUser);
    //console.log('Liste des utilisateurs:', usersArray);

    // rediriger vers la page de connexion après l'enregistrement
    window.location.href = "connection.html";

}



/* Vérifier que la personne qui s'inscrit n'a pas déjà utilisé un email ou un nom présent dans la liste des utilisateurs déjà créés. */
function checkNewUserUnicity(newUser) {

    // récupérer les utilisateaurs existants dans le localStorage
    let usersArray = localStorage.getItem("users") ? JSON.parse(localStorage.getItem('users')) : [];

    // vérifier si  l'email ou le nom d'utilisateur existe déjà
    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].userName === newUser.userName) {
            alert(`Le nom ${newUser.userName} existe déjà. Veuillez saisir un nouveau nom.`);
            document.getElementById('userName').focus();
            return false;
        }
        if (usersArray[i].userMail === newUser.userMail) {
            alert(`L'email ${newUser.userMail} existe déjà. Veuillez saisir un nouvel email.`);
            document.getElementById('userMail').focus();
            return false;
        }
    }
    // si tout est ok, on retourne true
    console.log("utilisateur peut être enregistré");
    return true;

}



/************************************************************
        Init
************************************************************/

function init() {
    document.getElementById("userName").addEventListener("input", function (event) {
        checkNameLength(event);  // Vérification du nom
        validateForm();  // Vérification globale du formulaire
    });
    document.getElementById("userMail").addEventListener("input", function (event) {
        mailValidity(event);  // Vérification de l'email
        validateForm();  // Vérification globale du formulaire
    });
    document.getElementById("pwd").addEventListener("input", function (event) {
        pwdValidity(event);
        pwdHelp(event);
        validateForm();      // Vérification globale du formulaire
    });
    document.getElementById('pwd-check').addEventListener('input', function (event) {
        recheckPwd(event);  // Vérification que les mots de passe correspondent
        validateForm();     // Vérification globale du formulaire
    });
    document.getElementById('submit-btn').addEventListener('click', registerUser);

   
}

window.onload = init;
