/************************************************************
        Function to check the length of the user name
************************************************************/
function checkNameLength() {

    const elementInputContainer = this.closest(".input-container");   /* closest to id=userName */
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


    if (this.value.length < 3) {

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
}

/************************************************************
        Function to check mail validity
************************************************************/

function checkEmail(email) {
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*[a-zA-Z0-9]$/;

    return re.test(email);

}

function mailValidity() {
    const elementInputContainer = this.closest(".input-container");   /* closest to id=userMail */
    const imgContainer = elementInputContainer.querySelector(".img-container");
    const p = document.getElementById('mailMsg');
    const email = this.value.trim(); /* récupérer la valeur de l'input mail */

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



    } else {
        console.log("Les mots de passe ne correspondent pas.");
        let img = document.createElement('img');
        img.src = 'assets/error.svg';
        imgContainer.appendChild(img);
    }

}


/************************************************************
        Init
************************************************************/

function init() {
    document.getElementById("userName").addEventListener("input", checkNameLength);
    document.getElementById("userMail").addEventListener("input", mailValidity);
    document.getElementById("pwd").addEventListener("input", function (event) {
        pwdValidity(event);
        pwdHelp(event);
    });
    document.getElementById('pwd-check').addEventListener('input', recheckPwd);

}

window.onload = init;
