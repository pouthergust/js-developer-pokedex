function setUrlHash(hash = '1') {
  window.location.hash = hash
}

function loadPokemonDetails() {
  const pokemonId = window.location.hash.replace(/[#0]/g, '')
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  console.log("aooba");

  fetch(pokemonUrl)
   .then(response => response.json())
   .then(data => {
      const pokemon = {}
      const form = data.form
  })
}

// function createPokemonStatus() {
//   return `
//   <div class="pokemon__base-infos">
//     <span class="pokemon__status-name">HP</span>
//     <span class="pokemon__status-number">45</span>
//     <progress value="45" max="100"></progress>
//   </div>
//   `;
// }


window.removeEventListener("hashchange", loadPokemonDetails);
window.addEventListener("hashchange", loadPokemonDetails);