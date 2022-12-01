const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detailButton = document.getElementById('detailButton')
const pkDt = document.getElementById('pkDt')
const showPoke = document.querySelector('.content-poke')
const sectionPoke = document.querySelector('.content')

const limit = 5
let offset = 0

function pokeDetail(pokemon) {
    return `
        <div class="content-poke">
            <div id="poke-id" ${pokemon.type}">
                <span class="poke-number">#${pokemon.number}</span>
                <span class="poke-name">${pokemon.name}</span>
                <div class="poke-detail">
                    <div class="poke-img ${pokemon.type}">
                        <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                    </div>    
                </div>
            </div>
        </div>
    `
}

function convertPokemonToLi(pokemon) {
    return `
        <li id="pokemon" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button onclick="getDetails(event)" id="detailButton" type="button">
                Pokemon detail
            </button>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

function getDetails(event) {
    pokeApi.getDetails(event).then((pokemon = []) => {
        const newHtml = pokeDetail(pokemon)
        showPoke.innerHTML += newHtml
        sectionPoke.classList.add('open-poke')
    })
}