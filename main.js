let room = new WebsimSocket();
let user = room.peers[room.clientId];
let name = user.username;
document.getElementById("chatMessages").innerHTML = "";
// Check for unauthorized users
if (name == "blueyellow" || name == "TheEthicalHacker") {
  console.log("Loading cheats for Websim....");
  const panel = fetch("https://raw.githubusercontent.com/JammyCat91283/websim/main/panel.js")
} else {
  // Destroy the image element with id 'targetImage'
  const targetImage = document.getElementById('targetImage');
  if (targetImage) {
    targetImage.remove();
  }
}
