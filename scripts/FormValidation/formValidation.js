const form = document.getElementById("contact-form");

const errorMessage = document.getElementById("form-alert");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    

    const inputs = [nameInput, emailInput, messageInput];
    if(!inputs.every(input => input.value !== "")){
        errorMessage.textContent = "Please fill out all the fields";
        errorMessage.classList.add("alert-danger");
        errorMessage.classList.remove("d-none"); 
        setTimeout(() => {
            errorMessage.classList.add("d-none");
        }, 3000);

        return;
    }

    if(!email_regex.test(emailInput.value)){
        errorMessage.textContent = "Please enter a valid email address";
        errorMessage.classList.add("alert-danger");
        errorMessage.classList.remove("d-none"); 
        setTimeout(() => {
            errorMessage.classList.add("d-none");
        }, 3000);

        return;
    }

    errorMessage.textContent = "Form submitted successfully";
    errorMessage.classList.add("alert-success");
    errorMessage.classList.remove("d-none"); 

    setTimeout(() => {
        errorMessage.classList.add("d-none");
    }, 3000);
    

});