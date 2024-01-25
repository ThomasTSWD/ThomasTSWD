const fetch = require('node-fetch');
const fs = require('fs');

async function getRandomJoke() {
  try {
    const response = await fetch("https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political");
    const data = await response.json();

    if (data.type === "single") {
      return `**Blague du jour :** ${data.joke}`;
    } else {
      return `**Blague du jour :**\n\n*${data.setup}*\n\n*${data.delivery}*`;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la blague :", error);
    return "Erreur lors de la récupération de la blague.";
  }
}

async function updateReadmeWithJoke() {
  try {
    const jokeData = await getRandomJoke();

    const readmePath = 'README.md';
    const readmeData = fs.readFileSync(readmePath, 'utf-8');

    const updatedReadme = readmeData.replace(
      /<!-- START_JOKE_SECTION -->[\s\S]*<!-- END_JOKE_SECTION -->/gim,
      `<!-- START_JOKE_SECTION -->\n${jokeData}\n<!-- END_JOKE_SECTION -->`
    );

    fs.writeFileSync(readmePath, updatedReadme, 'utf-8');

    console.log('README mis à jour avec la nouvelle blague.');
  } catch (error) {
    console.error("Erreur lors de la mise à jour du README :", error);
  }
}
updateReadmeWithJoke();
