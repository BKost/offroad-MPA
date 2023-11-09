// User Inputs
const userNameInput = document.getElementById("user_name");
const firstNameInput = document.getElementById("first_name");
const lastNameInput = document.getElementById("last_name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");

// User Info Form
const userProfileForm = document.getElementById("user-profile-form");

// Navigation list items
const navMyProfileLI = document.getElementById("nav-profile");
const navLoginLI = document.getElementById("nav-login");
const navRegisterLI = document.getElementById("nav-register");
const navLogoutLI = document.getElementById("nav-logout");
const navMyPostsLI = document.getElementById("nav-my-posts");

const { user_name, _id } = getDataFromCookie("user");

// fetchUserInfo();
fetchUserInfo()
  .then((data) => {
    insertUserData(data);
  })
  .catch((error) => console.log(error));

changeNavigationToSignedUser();

function changeNavigationToSignedUser() {
  if (user_name) {
    navMyProfileLI.classList.remove("nav-item-hidden");
    navMyPostsLI.classList.remove("nav-item-hidden");
    navLoginLI.classList.add("nav-item-hidden");
    navRegisterLI.classList.add("nav-item-hidden");
  }
}

async function fetchUserInfo() {
  const path = window.location.origin;

  try {
    // const userInfo = await fetch(`${path}/user/?id=${_id}`);
    const response = await fetch(`${path}/user/${_id}`);

    const data = await response.json();

    return data;

    // insertUserData(data);

    // update formState
  } catch (error) {
    console.log(error);
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

function insertUserData(data) {
  const {
    user_name,
    first_name,
    last_name,
    password,
    confirm_password,
    email,
  } = data;

  userNameInput.value = user_name;
  firstNameInput.value = first_name;
  lastNameInput.value = last_name;
  emailInput.value = email;
  passwordInput.value = password;
  confirmPasswordInput.value = confirm_password;

  // Update Profile Form State
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
