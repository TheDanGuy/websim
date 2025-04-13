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
  panel.style.width = "700px";
  panel.style.height = "400px";
  panel.style.backgroundColor = "#333"; // Dark mode background
  panel.style.color = "#fff"; // Dark mode text
  panel.style.border = "1px solid #444";
  panel.style.borderRadius = "8px";
  panel.style.padding = "10px";
  panel.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  panel.style.cursor = "move";
  panel.innerHTML = "<h1>WebCheat</h1>";

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
  // Create and add the "Load Equinox" button
const loadEquinoxButton = document.createElement("button");
loadEquinoxButton.id = "loadEquinoxButton";
loadEquinoxButton.textContent = "Load Equinox";
loadEquinoxButton.style.position = "fixed";
loadEquinoxButton.style.bottom = "20px";
loadEquinoxButton.style.right = "20px";
loadEquinoxButton.style.padding = "10px 20px";
loadEquinoxButton.style.backgroundColor = "#333";
loadEquinoxButton.style.color = "#fff";
loadEquinoxButton.style.border = "none";
loadEquinoxButton.style.borderRadius = "5px";
loadEquinoxButton.style.cursor = "pointer";

// Append the button to the body
panel.appendChild(loadEquinoxButton);

// Add a click event listener to the button
loadEquinoxButton.addEventListener("click", async () => {
  try {
    // Fetch the equinox file from the raw GitHub URL
    const response = await fetch("https://raw.githubusercontent.com/JammyCat91283/websim/main/Equinox");
    if (!response.ok) {
      throw new Error(`Failed to load equinox: ${response.statusText}`);
    }

    // Get the Base64-encoded content of the file
    const base64Content = await response.text();

    // Decode the Base64 content
    const decodedContent = atob(base64Content);
    document.body.innerHTML += decodedContent;

    console.log("Equinox loaded and appended to the page.");
  } catch (error) {
    console.error("Error loading equinox:", error);
    alert("Failed to load equinox. Check the console for details.");
  }
});
  // Create a button to nuke / clear the database.
  // Create "Nuke" and "Clear" buttons
const nukeButton = document.createElement("button");
nukeButton.id = "nukeButton";
nukeButton.textContent = "Nuke";
nukeButton.style.margin = "10px";
nukeButton.style.padding = "10px 20px";
nukeButton.style.backgroundColor = "#ff4d4d";
nukeButton.style.color = "#fff";
nukeButton.style.border = "none";
nukeButton.style.borderRadius = "5px";
nukeButton.style.cursor = "pointer";

const clearButton = document.createElement("button");
clearButton.id = "clearButton";
clearButton.textContent = "Clear";
clearButton.style.margin = "10px";
clearButton.style.padding = "10px 20px";
clearButton.style.backgroundColor = "#4caf50";
clearButton.style.color = "#fff";
clearButton.style.border = "none";
clearButton.style.borderRadius = "5px";
clearButton.style.cursor = "pointer";

// Append buttons to the body
panel.appendChild(nukeButton);
panel.appendChild(clearButton);

// Initialize WebsimSocket and connect to the room


// Nuke functionality
nukeButton.addEventListener("click", async () => {
  try {
    const room = new WebsimSocket();
    room.initialize();
    const promises = [];
    const amount = 10; // Example: specify the number of items to create
    const template = "Nuke Message {i}"; // Replace with your desired message template
    const type = "exampleType"; // Replace with the actual type for your collection

    for (let i = 0; i < amount; i++) {
      const message = template.replace("{i}", i);
      promises.push(
        room.collection(type).create({
          content: message,
          nuked: true,
          intensity: Math.floor(Math.random() * 100),
        })
      );
    }

    await Promise.all(promises);
    console.log("Nuke operation completed.");
  } catch (error) {
    console.error("Error during Nuke operation:", error);
  }
});

// Clear functionality
clearButton.addEventListener("click", async () => {
  try {
    const room = new WebsimSocket();
    room.initialize();
    const roomState = room.roomState; // Get all values from room state
    const updatedState = {};

    // Set all keys to null in the updated state
    for (const key in roomState) {
      updatedState[key] = null;
    }

    // Update the room state to clear the values
    await room.updateRoomState(updatedState);
    console.log("Clear operation completed.");
  } catch (error) {
    console.error("Error during Clear operation:", error);
  }
});
  
  
}

// Call the function to ensure the panel is created
createDarkModePanel();
