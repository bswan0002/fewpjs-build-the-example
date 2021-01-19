// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
function addHiddenToErrorModal() {
  let errorModal = document.querySelector("#modal");
  errorModal.className = "hidden";
}

function removeHiddenFromErrorModal() {
  let errorModal = document.querySelector("#modal");
  errorModal.classList.remove("hidden");
}

addHiddenToErrorModal();

// when user clicks heart, invoke mimicServerCall
// mimicServerCall will randomly fail

// if fail, respond to error using .catch(() => {}) block after .then(() => {}) block
// display error modal by removing .hidden class
// display server error in error modal
// use setTimeout to hide modal after 5 seconds (re-add .hidden)

// if success, change EMPTY_HEART to FULL_HEART
// add the .activated-heart class

// when user clicks full heart, change heart back to empty heart
// remove the .activated-heart class

// only manipulate the DOM once the server requests respond
// do not make the heart full until you're inside a successful .then block

// can also write with async await?
function like(heart) {
  mimicServerCall()
    .then((msg) => {
      if (heart.innerText === EMPTY_HEART) {
        heart.innerText = FULL_HEART;
        heart.className = "activated-heart";
      } else {
        heart.innerText = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      }
    })
    .catch((err) => {
      document.querySelector("#modal-message").innerText = err;
      removeHiddenFromErrorModal();
      setTimeout(addHiddenToErrorModal, 5000);
    });
}

document.querySelectorAll(".like-glyph").forEach((heart) => {
  heart.addEventListener("click", function () {
    like(heart);
  });
});

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
