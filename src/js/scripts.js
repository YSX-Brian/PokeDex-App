
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=251';

//validates that the new pokemon is an object and at least has a matching key before adding it to the list
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Incorrect entry format.');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        listItem.classList.add('list-inline-item');
        button.innerText = capitalizeFirstLetter(pokemon.name);
        button.classList.add('btn');
        button.classList.add('btn-outline-dark');
        button.setAttribute('data-target', '#poke-modal');
        button.setAttribute('data-toggle', 'modal');
        button.addEventListener('click', function() {
            showDetails(pokemon);
            console.log(pokemon);
        });
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.otherImageUrl = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
            item.number = details.id;
            item.frontShiny = details.sprites.front_shiny;
            item.backShiny = details.sprites.back_shiny;
        }).catch(function (e) {
            console.error(e);
        });
    }
  
    function showModal(pokemon) {
        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = '';
        let modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';
        let generationInfo = pokemon.number > 150 ? 'Gen. 2' : 'Gen. 1';

        modalTitle.innerText = `# ${pokemon.number} ${capitalizeFirstLetter(pokemon.name)}`;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        let otherImageElement = document.createElement('img');
        otherImageElement.src = pokemon.otherImageUrl;

        let typesElement = document.createElement('p');
        if(pokemon.types[1]) {
            typesElement.innerText =
            'Types: ' + capitalizeFirstLetter(pokemon.types[0].type.name) + ', ' + capitalizeFirstLetter(pokemon.types[1].type.name);
        } else {
            typesElement.innerText = 'Type: ' + capitalizeFirstLetter(pokemon.types[0].type.name);
        }

        let generationElement = document.createElement('p');
        generationElement.innerText = generationInfo;

        let weightElement = document.createElement('p');
        weightElement.innerText = 'Weight: ' + pokemon.weight/10 + 'kg';

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height/10 + 'm';

        let shinyImageElement = document.createElement('img');
        shinyImageElement.src = pokemon.frontShiny;

        let backShinyImageElement = document.createElement('img');
        backShinyImageElement.src = pokemon.backShiny;

        modalBody.appendChild(imageElement);
        modalBody.appendChild(otherImageElement);
        modalBody.appendChild(generationElement);
        modalBody.appendChild(typesElement);
        modalBody.appendChild(contentElement);
        modalBody.appendChild(weightElement);
        modalBody.appendChild(shinyImageElement);
        modalBody.appendChild(backShinyImageElement);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

/* eslint-disable no-undef */
    $(document).ready(function () {
      $('#anythingSearch').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $('#myDIV *').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
/* eslint-disable no-undef */


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});