/* Function to check the length of the user name */
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

/************************************************************************************************ */
/* Function to check mail validity */

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

/************************************************************************************************ */
/* Function to check password */

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

    // if (checkWeak(pwd)) {
    //     let img = document.createElement('img');
    //     img.src = 'assets/error.svg';
    //     imgContainer.appendChild(img);
    // } else if (checkMedium(pwd)) {
    //     let img = document.createElement('img');
    //     img.src = 'assets/check.svg';
    //     imgContainer.appendChild(img);
    // } else if (checkStrong(pwd)) {
    //     let img = document.createElement('img');
    //     img.src = 'assets/check.svg';
    //     imgContainer.appendChild(img);
    // }


}


/* niveau de difficulté du pwd */
/*
pwd.length < 6 => faible
pwd.length > 6 AND (1symbole OU 1 nombre) => moyen
pwd.length > 9 AND 1 symbole AND 1 nombre => fort
*/

/* Password strength checkinh functions */

function checkWeak(password) {
    return password.length <= 6;
}

function checkMedium(password) {
    return password.length > 6 && (/[0-9]/.test(password) || /[^\w\s]/.test(password));
}

function checkStrong(password) {
    return password.length > 9 && /[0-9]/.test(password) && /[^\w\s]/.test(password);
}

/* Password input Assistance */
function pwdHelp(event) {
    const pwd = event.target.value.trim();
    const strengthBar = document.getElementById('pwdStrengthBar');

    strengthBar.style.display = "none";

    let isWeak = checkWeak(pwd)
    let isMedium = checkMedium(pwd)
    let isStrong = checkStrong(pwd)

    

    if (isWeak) {
        strengthBar.style.display = "block";
        strengthBar.style.backgroundColor = "orange";
    } else if (isMedium) {
        strengthBar.style.display = "block";
        strengthBar.style.backgroundColor = "yellow";

    } else if (isStrong) {
        strengthBar.style.display = "block";
        strengthBar.style.backgroundColor = "green";
    } else {
        strengthBar.style.display = "none";
    }

}







function init() {
    document.getElementById("userName").addEventListener("input", checkNameLength);
    document.getElementById("userMail").addEventListener("input", mailValidity);
    document.getElementById("pwd").addEventListener("input", function (event) {
        pwdValidity(event);
        pwdHelp(event);
    });




    //document.getElementById('submit-btn').addEventListener('click', checkCriteria);
    // document.getElementById('mdp').addEventListener('input', checkPassword);

}

window.onload = init;

