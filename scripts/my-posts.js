console.log("Marketplace");
// Navigation list items
const navMyProfileLI = document.getElementById("nav-profile");
const navLoginLI = document.getElementById("nav-login");
const navRegisterLI = document.getElementById("nav-register");
const navLogoutLI = document.getElementById("nav-logout");
const navMyPostsLI = document.getElementById("nav-my-posts");

// Form
const uploadPostForm = document.getElementById("upload-post-form");
const updatePostForm = document.getElementById("update-post-form");

// Input
const fileInput = document.getElementById("file_input");

const { user_name, _id } = getDataFromCookie("user");

changeNavigationToSignedUser();

// fetch posts data
fetchPosts();

uploadPostForm.addEventListener("submit", uploadPost);
// fileInput.addEventListener("change", uploadImage);

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

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function uploadPost(event) {
  event.preventDefault();

  const formData = new FormData(uploadPostForm);

  const formDataObject = Object.fromEntries(formData.entries());

  // console.log(formDataObject);
  // console.log(formDataObject.image);

  const url = `${document.location.origin}/my-posts/${_id}`;
  // const url = `${document.location.origin}/uploads`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },

      body: formDataObject,
    });
    console.log();
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function fetchPosts() {
  const url = `${document.location.origin}/my-posts/${_id}`;

  try {
    const response = await fetch(url);

    const { data } = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
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
