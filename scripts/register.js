const form = document.getElementById("register-form");
const formInputsContainer = document.getElementById("inputs-container");

form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const url = form.action;

  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { message, location } = await request.json();

    if (location) {
      document.location.pathname = location;
    }

    if (message) {
      console.log(message);
      // let p = document.createElement("p");
      // p.textContent = message;

      // p.className = "register-error-message";

      // formInputsContainer.appendChild(p);
    }
  } catch (error) {
    // console.log(error);
    // console.log("Error:", error);
  }
}
