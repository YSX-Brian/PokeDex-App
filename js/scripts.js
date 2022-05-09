
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

//validates that the new pokemon is an object and at least has matching keys before adding it to the list
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
        button.innerText = capitalizeFirstLetter(pokemon.name);
        button.classList.add('selection');
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(capitalizeFirstLetter(pokemon.name), pokemon.height,pokemon.weight, pokemon.types, pokemon.imageUrl)
        });
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            hideLoadingMessage();
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    function showLoadingMessage() {
        let loading = document.querySelector('.loading');
        let message = document.createElement('h2')
        message.innerText = 'Loading...';
        message.classList.add('loading-text');
        loading.appendChild(message);
    }

    function hideLoadingMessage() {
        let removeLoading = document.querySelector('h2');
        removeLoading.parentElement.removeChild(removeLoading);
    }

    function showModal(title, height, weight, types, image) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let imageElement = document.createElement('img');
        imageElement.src = image;

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

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        modal.appendChild(typesElement);
        modal.appendChild(contentElement);
        modal.appendChild(weightElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal () {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });


    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
           hideModal();
        }
    });



    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

//tested the add function using the following line:
//pokemonRepository.add({name: 'Caterpie', height: 0.3, type: ['bug']});

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
