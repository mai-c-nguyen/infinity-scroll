// Unsplash API
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 50;
const apiKey = "bHIKttI2ARceCosNgqB7n1x_yRhAzIw5B3yjyTiFX7M";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
  console.log("image loaded");
  imageLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready =", ready);
  }
}
//Helper Function to Set Attribute on DOM Elements
// function setAttributes(element, attributes) {
//   for (const key in attributes) {
//     element.setAttribute(key, attribute[key]);
//   }
// }
// Create Elements for Links and Photos, Add to the DOM
function displayPhotos() {
  totalImages = photosArray.length;
  console.log("total images", totalImages);

  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // setAttributes(item, {
    //   href: photo.links.html,
    //   target: "_blank",
    // });

    //Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // setAttributes(img, {
    //   src: photo.urls.regular,
    //   alt: photo.alt_description,
    //   title: photo.alt_description,
    // });
    // add EventListerner to Load
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>,
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
  }
});
// Call the function
getPhotos();
