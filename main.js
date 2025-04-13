let room = new WebsimSocket();
let user = room.peers[room.clientId];
let name = user.username;

// Check for unauthorized users
if (name == "blueyellow" || name == "TheEthicalHacker") {
  console.log("Loading cheats for Websim....");
} else {
  // Destroy the image element with id 'targetImage'
  const targetImage = document.getElementById('targetImage');
  if (targetImage) {
    targetImage.remove();
  }
}
