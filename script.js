const pokemon_ID = document.getElementById('pokemon-id');
const pokemon_Name = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const vitesse = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const datapokemon = await response.json();

    // régalage des infos générales
    pokemon_Name.textContent = `${datapokemon.name.toUpperCase()}`;
    pokemon_ID.textContent = `#${datapokemon.id}`;
    weight.textContent = `Weight: ${datapokemon.weight}`;
    height.textContent = `Height: ${datapokemon.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${datapokemon.sprites.front_default}" alt="${datapokemon.name} front default sprite">
    `;

    // réglages des stats
    hp.textContent = datapokemon.stats[0].base_stat;
    attack.textContent = datapokemon.stats[1].base_stat;
    defense.textContent = datapokemon.stats[2].base_stat;
    specialAttack.textContent = datapokemon.stats[3].base_stat;
    specialDefense.textContent = datapokemon.stats[4].base_stat;
    vitesse.textContent = datapokemon.stats[5].base_stat;

    // Sréglage du type
    types.innerHTML = datapokemon.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
      .join('');


      
  } catch (err) {
    resetDisplay();
    alert('Pokémon not found');
    console.log(`Pokémon not found: ${err}`);
  }
};

const resetDisplay = () => {
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();

  // on reset les stats avec des élem vides
  pokemon_Name.textContent = '';
  pokemon_ID.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  vitesse.textContent = '';
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  getPokemon();
});