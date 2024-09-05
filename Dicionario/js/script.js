let url = 'https://dictionaryapi.dev/';

document.addEventListener('DOMContentLoaded',function () {
    const form = document.querySelector('form');
    const queryInput =document.getElementById('query');
    form.addEventListener('submit',async function(event) {
        event.preventDefault();
        const query = queryInput.value.trim();
        if (query) {

            try {
                const response = await fetch('https://dictionaryapi.dev/api/v2/entries/en/${query}');
                const data = await response.json();
                if (data && data.length > 0) {
                    displayResults(data[0]);
                } else {
                    displayError('Nenhum resultado encontrado.');
                }

            } catch (error) {
                displayError('Ocorreu um erro ao buscar a palavra. Tente novamente.');
            }
        } else {
            displayError('Por favor,insira uma palavra.');
        }
    });
    function displayResults(result) {
        const container = document.getElementById('container');
        container.innerHTML ='';
        const meanings = result.meanings;
        const translations = meanings.find(meanings => meanings.language === 'pt');

        if (translations) {
            const wordElement = document.createElement('h2');
            wordElement.textContent = `Tradução: ${translations.translation}`;
            container.appendChild(wordElement);
        } else {
            displayError('Tradução não disponível.');

            if (result.phonetics && result.phonetics.length > 0 && result.phonetics[0].audio) {
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.src = result.phonetics[0].audio;
                container.appendChild(audio);
            }
        }
        function displayError(message) {
            const container = document.getElementById('container');
            container.innerHTML = '';
            const errorElement = document.createElement('p');
            errorElement.textContent == message;
            errorElement.style.color = 'red';
            container.appendChild(errorElement);
        }
    }
});