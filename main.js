const numberInput = document.getElementById("numberInput");
const showMemeBtn = document.getElementById("showMemeBtn");
const errorMessage = document.getElementById("errorMessage");
const memeContainer = document.getElementById("memeContainer");

async function fetchAndShowMeme() {
  const value = numberInput.value.trim();
  const index = parseInt(value, 10);

  errorMessage.textContent = "";
  memeContainer.innerHTML = "";

  if (value === "" || isNaN(index) || index < 0 || index > 99) {
    errorMessage.textContent = "please enter valid number";
    return;
  }

  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const result = await response.json();

    if (result.success) {
      const memes = result.data.memes;
      const selectedMeme = memes[index];

      if (selectedMeme) {
        const memeBox = document.createElement("div");
        memeBox.className = "p-4 bg-white rounded text-dark shadow mx-auto";
        memeBox.style.maxWidth = "500px";

        const memeTitle = document.createElement("h2");
        memeTitle.className = "fw-bold mb-3 text-warning text-center";
        memeTitle.textContent = selectedMeme.name;

        const memeImage = document.createElement("img");
        memeImage.src = selectedMeme.url;
        memeImage.alt = selectedMeme.name;
        memeImage.className = "w-100 h-auto rounded";

        memeBox.appendChild(memeTitle);
        memeBox.appendChild(memeImage);

        memeContainer.appendChild(memeBox);

        numberInput.value = "";
      } else {
        errorMessage.textContent = "please enter valid number";
      }
    } else {
      errorMessage.textContent = "Error fetching data";
    }
  } catch (error) {
    errorMessage.textContent = "Connection failed";
  }
}

showMemeBtn.addEventListener("click", fetchAndShowMeme);

numberInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    fetchAndShowMeme();
  }
});
