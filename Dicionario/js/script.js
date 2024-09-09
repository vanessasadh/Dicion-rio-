let url = 'https://dictionaryapi.dev/api/v2/entries/en/';

function displayError(message) {
    const container= document.getElementById('container');
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    container.appendChild(errorElement);
}

function displayResults(result) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const definitions = result.meanings.map((meaning) => meaning.definitions)
    .map(
        (array) => array.map(
            (definition) => definition.definition)
        )
    .flat();

    if(definitions) {
        const ul =document.createElement('ul');
        
        for (const definition of definition) {
            const wordElement = document.createElement('li');
            wordElement.textContent = `${definition}`;
            ul.appendChild(wordElement);
        }
        container.appendChild(ul);

    } else {
        displayError('Definições não disponíveis.');
    }

    if (result.phonetics && result.phonetics.length> 0 && result.phonetics[0].audio)
        {
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = result.phonetics[0].audio;

            container.appendChild(audio); 
        } else {
            displayError('Audio não dísponivel.');
        }   
}
document.addEventListener('DOMContentLoaded', function() 
{
    const form = document.querySelector('form');
    const queryInput = document.getElementById('query');
    form.addEventListener('submit',async function(event)
    {
        event.preventDefault();
        const query = queryInput.value.trim();
        if (query) {
         try {
            const response = await fetch(`${url}${query}`);
            const data = await response.json();
            if (data && data.length > 0) {
                displayResults(data[0]);
            } else {
                displayError('Nenhum resultado encontrado.');
            }
         } catch (error)  {
            displayError('Ocorreu um erro ao buscar a palavra. Tente novamente');
         }

        } else {
            displayError('Por favor, insira uma palavra.');
        }

    });

});

