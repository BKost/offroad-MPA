// Protected routes:

// /my-posts
// /my-posts/:id
// /user
//

//Retrieve user cookie

// console.log(typeof document.cookie);

const navigationDOM = document.querySelector("navigation");

// const authorizedUser = getDataFromCookie("user");
const { user_name, _id } = getDataFromCookie("user");

function getDataFromCookie(cookieName) {
  const decodedCookies = decodeURIComponent(document.cookie);

  const splitCookies = decodedCookies.split("; ");

  console.log(splitCookies);

  const [userCookie] = splitCookies.filter((item) =>
    item.startsWith(cookieName)
  );

  const [key, value] = userCookie.split("=");

  const dataObjectJSON = value.slice(value.indexOf("{"), value.length);

  const dataObject = JSON.parse(dataObjectJSON);

  console.log(dataObject);

  return dataObject;
}
