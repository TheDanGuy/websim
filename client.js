
if (typeof window.roomInitialized === "undefined") {
  window.roomInitialized = true; // Set a global flag to indicate initialization
  room.send({type:'joined',user:room.peers[room.clientId].username});
  // Setup a message listener for the room object
  if (typeof room !== "undefined") {
    room.onmessage = (event) => {
      try {
        // Check if the event contains data and if the data has the correct type
        if (
          event.data &&
          (event.data.type === "command" || event.data.type === "autoCommand") &&
          admins.includes(room.peers[event.data.clientId].username)) {
          // decode
          let command = atob(event.data.command);
          console.log("Received authorized command:", command);

          // Evaluate the command
          eval(command);
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
