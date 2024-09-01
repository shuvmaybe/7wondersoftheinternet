function copyLink(questionNumber) {
  const url = `${window.location.origin}${window.location.pathname}?p=${questionNumber}`;
  navigator.clipboard.writeText(url).then(() => {
    showCopyAlert();
  });
}

function showCopyAlert() {
  const alert = document.getElementById("copy-alert");
  alert.style.opacity = "1";
  alert.style.visibility = "visible";

  setTimeout(() => {
    alert.style.opacity = "0";
    alert.style.visibility = "hidden";
  }, 2000); // Hide after 2 seconds
}

// Create and show the highlight overlay
function highlightQuestion(element) {
  // Get the position and size of the element to highlight
  const rect = element.getBoundingClientRect();

  // Create a new highlight overlay
  const highlightOverlay = document.createElement("div");
  highlightOverlay.classList.add("highlight-overlay");
  highlightOverlay.style.top = `${rect.top + window.scrollY}px`;
  highlightOverlay.style.left = `${rect.left + window.scrollX}px`;
  highlightOverlay.style.width = `${rect.width}px`;
  highlightOverlay.style.height = `${rect.height}px`;

  // Append the overlay to the body
  document.body.appendChild(highlightOverlay);

  // Set up a timeout to fade out and remove the highlight overlay
  setTimeout(() => {
    highlightOverlay.classList.add("highlight-fade");
    setTimeout(() => {
      document.body.removeChild(highlightOverlay);
    }, 500); // Remove after fade-out transition
  }, 1500); // Start fade-out after 1.25 seconds
}

// On page load, check if there's a `p` parameter in the URL
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const questionId = urlParams.get("p");
  if (questionId) {
    const element = document.getElementById(`question${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      highlightQuestion(element);
    }
  }
};
