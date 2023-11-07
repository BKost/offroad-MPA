// retrieve login form data
// fetch them to backend

const form = document.getElementById("login-form");

form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const url = form.action;

  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  console.log(data);

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    console.log(response);
  } catch (error) {
    console.log(error);
    // console.log(error);
    // console.log("Error:", error);
  }
}
