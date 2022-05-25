
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        });
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(capitalizeFirstLetter(pokemon.name),
            pokemon.height,pokemon.weight, pokemon.types, pokemon.imageUrl, pokemon.otherImageUrl, pokemon.number)
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
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(title, height, weight, types, image, otherImage, number) {
        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = '';
        let modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';

        modalTitle.innerText = '#' + number + ' ' + title;

        let imageElement = document.createElement('img');
        imageElement.src = image;

        let otherImageElement = document.createElement('img');
        otherImageElement.src = otherImage;

        //If the pokemon has 2 types, prints both. Otherwise only prints the 1.
        let typesElement = document.createElement('p');
        if(types[1]) {
            typesElement.innerText =
            'Types: ' + capitalizeFirstLetter(types[0].type.name) + ', ' + capitalizeFirstLetter(types[1].type.name);
        } else {
            typesElement.innerText = 'Type: ' + capitalizeFirstLetter(types[0].type.name);
        }

        let weightElement = document.createElement('p');
        weightElement.innerText = 'Weight: ' + weight/10 + 'kg';

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + height/10 + 'm';

        modalBody.appendChild(imageElement);
        modalBody.appendChild(otherImageElement);
        modalBody.appendChild(typesElement);
        modalBody.appendChild(contentElement);
        modalBody.appendChild(weightElement);
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
