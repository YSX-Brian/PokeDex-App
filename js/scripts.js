
let pokemonRepository = (function () {
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

//validates that the new pokemon is an object and at least has matching keys before adding it to the list
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'type' in pokemon) {
            pokemonList.push(pokemon);
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

//tested the add function using the following line:
//pokemonRepository.add({name: 'Caterpie', height: 0.3, type: ['bug']});


//lists out pokemon with their heights, adds line breaks between, and highlights a big pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height >= 2){
        document.write(pokemon.name + ' - Height: ' + pokemon.height + 'm - Wow, that\'s big!' + "<br>");
    } else {
        document.write(pokemon.name + ' - Height: ' + pokemon.height + 'm ' + "<br>");
    }
});
