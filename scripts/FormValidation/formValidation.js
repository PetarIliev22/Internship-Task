const form = document.getElementById("contact-form");
const errorMessage = document.getElementById("form-alert");
const submitBtn = document.getElementById("submitBtn");
const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;
    const messageInput = document.getElementById("message").value;
    
    if(nameInput === "" || emailInput === "" || messageInput === ""){
        errorMessage.textContent = "Please fill out all the fields";
        errorMessage.style.backgroundColor = "red";
        errorMessage.classList.remove("d-none"); 
        setTimeout(() => {
            errorMessage.classList.add("d-none");
        }, 3000);

        return;
    }

     if(!email_regex.test(emailInput)){
            errorMessage.textContent = "Please enter a valid email";
            errorMessage.style.backgroundColor = "red";
            errorMessage.classList.remove("d-none"); 
            setTimeout(() => {
                errorMessage.classList.add("d-none");
            }, 3000);
    
            return;
        }

    if(nameInput && emailInput && messageInput){
        const formData = new FormData(form);
        formData.append("access_key", "7f7b8e00-77b6-43e0-8bae-11be4abebd24");

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                errorMessage.textContent = "Form submitted successfully";
                errorMessage.style.backgroundColor = "green";
                errorMessage.classList.remove("d-none");
                form.reset();
                setTimeout(() => {
                    errorMessage.classList.add("d-none");
                }, 3000);
            }
        })
        .catch(error => console.log(error));
    }
});