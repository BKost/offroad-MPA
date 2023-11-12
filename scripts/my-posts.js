console.log("Marketplace");
// Navigation list items
const navMyProfileLI = document.getElementById("nav-profile");
const navLoginLI = document.getElementById("nav-login");
const navRegisterLI = document.getElementById("nav-register");
const navLogoutLI = document.getElementById("nav-logout");
const navMyPostsLI = document.getElementById("nav-my-posts");

// Posts
const postsContainer = document.getElementById("posts-container");

// Form
const uploadPostForm = document.getElementById("upload-post-form");
const updatePostForm = document.getElementById("update-post-form");

// Form blur container
const formContainer = document.getElementById("form-container");

// Input
const fileInput = document.getElementById("file_input");

// Buton
const createPostBtn = document.getElementById("create-post-btn");

// -------------------

const { user_name, _id } = getDataFromCookie("user");

changeNavigationToSignedUser();

// fetch posts data
fetchPosts();

createPostBtn.addEventListener("click", () => {
  formContainer.classList.remove("hide-blur-container");
  uploadPostForm.classList.remove("hide-blur-container");
});

formContainer.addEventListener("click", () => {
  formContainer.classList.add("hide-blur-container");
  uploadPostForm.classList.add("hide-blur-container");
});

uploadPostForm.addEventListener("submit", uploadPost);
fileInput.addEventListener("change", uploadImage);

let imageValue;

async function uploadImage(event) {
  const imageFile = event.target.files[0];

  const formData = new FormData();
  formData.append("image", imageFile);

  const url = `${document.location.origin}/uploads`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const { imagePath } = await response.json();
    console.log(imagePath);

    imageValue = imagePath;
  } catch (error) {
    imageValue = null;
    console.log(error);
  }
}

async function uploadPost(event) {
  event.preventDefault();

  const formData = new FormData(uploadPostForm);

  const formDataObject = Object.fromEntries(formData.entries());

  formDataObject.image = imageValue;
  formDataObject.createdBy = { user_name, userId: _id };

  const date = new Date();
  const currentDate = date.toLocaleDateString();
  formDataObject.date = currentDate;

  console.log(formDataObject);
  // console.log(formDataObject.image);

  const url = `${document.location.origin}/my-posts/${_id}`;
  // const url = `${document.location.origin}/uploads`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formDataObject),
    });
    const data = await response.json();

    fetchPosts();

    console.log(data);
    const form = document.getElementById("upload-post-form");

    form.querySelectorAll("input, textarea").forEach((input) => {
      input.value = "";
    });

    formContainer.classList.add("hide-blur-container");
    uploadPostForm.classList.add("hide-blur-container");
  } catch (error) {
    console.log(error);
  }
}

async function fetchPosts() {
  const url = `${document.location.origin}/my-posts/${_id}`;

  try {
    const response = await fetch(url);

    const { data } = await response.json();
    displayPosts(data);
  } catch (error) {
    console.log(error);
  }
}

function displayPosts(data) {
  const htmlStringArr = data.map((post) => {
    const {
      title,
      price,
      date,
      description,
      image,
      createdBy: { user_name },
    } = post;

    console.log(post);

    return `<article  class="marketplace-post">
      <img class="post-image" src=${image} alt="" />
      <div class="post-about">
        <time datetime="">${date}</time>
        <h3 class="post-title" >${title}</h3>
        <h3 class="price">$${price}</h3>
        
        <p class="post-about-text">${description}</p>
        <p>By: <span class="posted-by-span">${user_name}</span></p>
      </div>

      <div class="post-btn-container">
        <button class="post-btn post-btn-edit">Edit</button>
        <button class="post-btn post-btn-delete">Delete</button>
      </div>
    </article>`;
  });

  const final = htmlStringArr.join(" ");
  postsContainer.innerHTML = final;
  console.log(final);
}

function changeNavigationToSignedUser() {
  if (user_name) {
    navMyProfileLI.classList.remove("nav-item-hidden");
    navMyPostsLI.classList.remove("nav-item-hidden");
    navLoginLI.classList.add("nav-item-hidden");
    navRegisterLI.classList.add("nav-item-hidden");
  }
}

function getDataFromCookie(cookieName) {
  const decodedCookies = decodeURIComponent(document.cookie);

  const splitCookies = decodedCookies.split("; ");

  const [userCookie] = splitCookies.filter((item) =>
    item.startsWith(cookieName)
  );

  const [key, value] = userCookie.split("=");

  const dataObjectJSON = value.slice(value.indexOf("{"));

  const dataObject = JSON.parse(dataObjectJSON);

  return dataObject;
}
