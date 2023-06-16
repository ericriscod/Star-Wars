const select = document.querySelector('[options-title]')
const section_dl = document.querySelector('.section_dl')
const dl = document.createElement('dl')

async function getOptions() {
    try {
        const response = await axios.get('https://swapi.dev/api/films')
        const data = response.data

        for (let film of data.results) {
            const option = document.createElement('option')
            option.innerText = film.title
            option.value = film.title
            select.appendChild(option)
        }
    } catch (error) {
        console.error(`Erro ao obter opções: ${error}`)
    }
}

async function getDescription() {
    const response = await axios.get('https://swapi.dev/api/films')

    select.addEventListener('change', () => {
        dl.textContent = ""
        const title = select.value
        const films = response.data
        console.log(films)

        for (let film of films.results) {
            if (film.title === title) {
                createAndAppendElement('dt', 'Title: ')
                createAndAppendElement('dd', film.title)
                createAndAppendElement('dt', 'Director: ')
                createAndAppendElement('dd', film.director)
                createAndAppendElement('dt', 'Producer: ')
                createAndAppendElement('dd', film.producer)
                createAndAppendElement('dt', 'Release date: ')
                createAndAppendElement('dd', film.release_date)
                createAndAppendElement('dt', 'Persons: ', 'persons')
                createAndAppendElement('dt', 'Starships:', 'starships')

                createAndAppendMultipleElements('dd', film.characters, '[starships]')
                createAndAppendMultipleElements('dd', film.starships)

                section_dl.appendChild(dl)
            }
        }
    })
}

function createAndAppendElement(tagName, content, attribute) {
    const tag = document.createElement(tagName);

    tag.innerText = content

    if (attribute) tag.setAttribute(attribute, "")

    dl.appendChild(tag);
};

function createAndAppendMultipleElements(tagName, content, attribute = undefined) {
    for (let i in content) {
        axios.get(content[i])
            .then(response => {
                const data = response.data
                const newTag = document.createElement(tagName)
                newTag.innerText = data.name

                if (attribute === undefined) {
                    dl.appendChild(newTag)
                } else if (attribute) {
                    document.querySelector(attribute).insertAdjacentElement('beforebegin', newTag)
                }
            })
    }
};

getOptions()
getDescription()
