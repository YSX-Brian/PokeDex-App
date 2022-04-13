
// pokemon height is in meters
let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        type: ['grass', 'poison']
    },
    {
        name: 'Ivysaur',
        height: 1,
        type: ['grass', 'poison']
    },
    {
        name: 'Venusaur',
        height: 2,
        type: ['grass', 'poison']
    },
    {
        name: 'Charmander',
        height: 0.6,
        type: ['fire']
    },
    {
        name: 'Charmeleon',
        height: 1.1,
        type: ['fire']
    },
    {
        name: 'Charizard',
        height: 1.7,
        type: ['fire', 'flying']
    },
    {
        name: 'Squirtle',
        height: 0.5,
        type: ['water']
    },
    {
        name: 'Wartortle',
        height: 1,
        type: ['water']
    },
    {
        name: 'Blastoise',
        height: 1.6,
        type: ['water']
    }
];

//lists out pokemon with their heights, adds line breaks between, and highlights a big pokemon
for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height >= 2){
        document.write(pokemonList[i].name + ' - Height: ' + pokemonList[i].height + 'm - Wow, that\'s big!' + "<br>");
    } else {
        document.write(pokemonList[i].name + ' - Height: ' + pokemonList[i].height + 'm ' + "<br>");
    }
}
