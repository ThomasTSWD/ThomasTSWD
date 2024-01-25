function getRandomJoke() {
  fetch("https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political")
    .then((response) => response.json())
    .then((data) => {
      if (data.type === "single") {
        document.getElementById("joke").innerHTML = data.joke;
      } else {
        document.getElementById("joke").innerHTML = `${data.setup}<br><br>${data.delivery}`;
      }
      // Appelle la fonction pour mettre à jour le README avec la nouvelle blague
      updateReadmeWithJoke(data);
    });
}
function updateReadmeWithJoke(jokeData) {
  // ... Assure-toi d'avoir le code pour lire et écrire dans le fichier README ...
  fs.readFile('README.md', 'utf-8', (err, readmeData) => {
    if (err) {
      throw err;
    }

    // Remplace la section de blague dans le README
    const updatedReadme = readmeData.replace(
      /(?<=<!-- START_JOKE_SECTION -->)[\s\S]*(?=<!-- END_JOKE_SECTION -->)/gim,
      `<!-- START_JOKE_SECTION -->\n${getJokeMarkdown(jokeData)}\n<!-- END_JOKE_SECTION -->`
    );

    // Écriture du nouveau README
    fs.writeFile('README.md', updatedReadme, 'utf-8', (err) => {
      if (err) {
        throw err;
      }

      console.log('README mis à jour avec la nouvelle blague.');
    });
  });
}

function getJokeMarkdown(jokeData) {
  // Formate la blague en Markdown, tu peux ajuster selon tes besoins
  if (jokeData.type === "single") {
    return `**Blague du jour :** ${jokeData.joke}`;
  } else {
    return `**Blague du jour :**\n\n*${jokeData.setup}*\n\n*${jokeData.delivery}*`;
  }
}

