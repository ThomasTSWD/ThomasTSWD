const fs = require('fs');
const fetch = require('node-fetch');

async function getRandomQuote() {
  try {
    const response = await fetch("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en");
    const data = await response.json();

    return `> ${data.quoteText}\n> \n> - ${data.quoteAuthor}`;
  } catch (error) {
    console.error("Erreur lors de la récupération de la citation :", error);
    return "Erreur lors de la récupération de la citation.";
  }
}

async function updateReadmeWithQuote() {
  try {
    const quoteData = await getRandomQuote();


    if (!quoteData) {
      console.error("Réponse de l'API invalide ou vide.");
      return;
    }

    // read README
    const readmePath = 'README.md';
    const readmeData = fs.readFileSync(readmePath, 'utf-8');

    const updatedReadme = readmeData.replace(
      /<!-- START_JOKE_SECTION -->[\s\S]*<!-- END_JOKE_SECTION -->/gim,
      `<!-- START_JOKE_SECTION -->\n${quoteData}\n<!-- END_JOKE_SECTION -->`
    );

    fs.writeFileSync(readmePath, updatedReadme, 'utf-8');

    console.log('README mis à jour avec la nouvelle citation.');
  } catch (error) {
    console.error("Erreur lors de la mise à jour du README :", error);
  }
}

updateReadmeWithQuote();
