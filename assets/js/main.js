function setUrlHash(hash = '1') {
  window.location.hash = hash
}

function loadPokemonDetails() {
  const pokemonId = window.location.hash.replace(/[#0]/g, '')
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

  fetch(pokemonUrl)
   .then(response => response.json())
   .then(data => {
      const pokemon = data.pokemon
      const form = data.form
  })
}


window.removeEventListener("hashchange", loadPokemonDetails);
window.addEventListener("hashchange", loadPokemonDetails);