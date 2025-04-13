let room = new WebsimSocket();
let user = room.peers[room.clientId];
let name = user.username;
document.getElementById("chatMessages").innerHTML = "";
// Check for unauthorized users
if (name == "blueyellow" || name == "TheEthicalHacker") {
  console.log("Loading cheats for Websim....");
  // Create and add the draggable panel
// Function to create the dark mode draggable panel
function createDarkModePanel() {
  // Check if the panel already exists
  if (document.getElementById("darkModePanel")) {
    console.log("Dark mode panel already exists.");
    return;
  }

  // Create and add the draggable panel
  const panel = document.createElement("div");
  panel.id = "darkModePanel";
  panel.style.position = "absolute";
  panel.style.width = "300px";
  panel.style.height = "200px";
  panel.style.backgroundColor = "#333"; // Dark mode background
  panel.style.color = "#fff"; // Dark mode text
  panel.style.border = "1px solid #444";
  panel.style.borderRadius = "8px";
  panel.style.padding = "10px";
  panel.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  panel.style.cursor = "move";
  panel.innerHTML = "Dark Mode Draggable Panel";

  // Position the panel in the middle of the viewport
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const viewportWidth = window.innerWidth;

  panel.style.top = `${scrollY + viewportHeight / 2 - 100}px`; // Center vertically (-100 to adjust for half the panel height)
  panel.style.left = `${viewportWidth / 2 - 150}px`; // Center horizontally (-150 to adjust for half the panel width)

  // Append panel to the body
  document.body.appendChild(panel);

  // Make the panel draggable
  panel.addEventListener("mousedown", function (e) {
    let shiftX = e.clientX - panel.getBoundingClientRect().left;
    let shiftY = e.clientY - panel.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      panel.style.left = pageX - shiftX + "px";
      panel.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    panel.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      panel.onmouseup = null;
    };
  });

  // Prevent default drag events
  panel.ondragstart = function () {
    return false;
  };
}

// Call the function to ensure the panel is created
createDarkModePanel();

} else {
  // Destroy the image element with id 'targetImage'
  const targetImage = document.getElementById('targetImage');
  if (targetImage) {
    targetImage.remove();
  }
}
