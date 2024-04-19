function setUrlHash(hash = '1') {
  window.location.hash = hash
}

function loadPokemonDetails() {
  const pokemonId = window.location.hash.replace(/[#0]/g, '')
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  
  fetch(pokemonUrl)
  .then(response => response.json())
  .then(data => {
    const pokemonCard = document.getElementById('pokemon-card')
    const divToInsertInfos = document.getElementById('pokemon-view')
    const divToInsertStatus = document.getElementById('pokemon-status')

    const pokemon = {
      id: pokemonId.padStart(3, '0'),
      name: data.forms[0].name ,
      types: data.types.map(type => type.type.name),
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`,
    }
    const stats = data.stats.map(status => {
      const base_status = status.base_stat;
      const name = status.stat.name;

      return { base_status, name }
    })

    console.log("pokemon.type", pokemon.types)
    const pokeInfoList = createPokemonView(pokemon)
    const pokeStatusList = createPokemonStatus(stats)

    pokemonCard.className = `pokemon__card ${pokemon.types[0]}`
    divToInsertInfos.innerHTML = pokeInfoList
    divToInsertStatus.innerHTML = pokeStatusList.join("")
  })
}

function createPokemonView(pokemonInfo) {
  return `
  <div class="pokemon__header-infos">
    <div class="pokemon__name-n-types">
      <h1 class="pokemon__name">${pokemonInfo.name}</h1>

      <div class="pokemon__types">
      ${pokemonInfo.types.map(type => 
        '<span>' + type + '</span>'
      ).join("")}
      </div>
    </div>

    <div class="pokemon__number">
      <span class="number">#${pokemonInfo.id}</span>
    </div>
  </div>

  <div class="pokemon__photo-wrapper">
    <img 
      class="pokemon__photo-wrapper"
      src="${pokemonInfo.img}"
      alt="${pokemonInfo.name}"
    >
  </div>
  `
}

function createPokemonStatus(pokemonStatus) {
  const statusList = pokemonStatus.map(status => `
    <div class="pokemon__base-infos">
      <span class="pokemon__status-name">${status.name}</span>
      <span class="pokemon__status-number">${status.base_status}</span>
      <progress value="${status.base_status}" max="100"></progress>
    </div>
  `)

  return statusList;
}

loadPokemonDetails();


window.removeEventListener("hashchange", loadPokemonDetails);
window.addEventListener("hashchange", loadPokemonDetails);