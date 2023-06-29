const select = document.querySelector('[options-title]')
const section_dl = document.querySelector('.section_dl')
const dl = document.createElement('dl')
const peoplesObj = []
const peoplesString = []

async function getOptions(url) {
    try {
        const response = await axios.get(url)
        const data = response.data


        for (let people of data.results) {
            const option = document.createElement('option')
            option.innerText = people.name
            option.value = people.name
            select.appendChild(option)

            peoplesString.push(JSON.stringify(people))

            console.log('passei no for!')
        }

        if (data['next']) {
            await getOptions(data.next)
        } else {
            parseForObj(peoplesString, peoplesObj)
        }
    } catch (error) {
        console.error(`Erro ao obter opções: ${error}`)
    }
}

async function getDescriptions(url) {

    try {
        const response = await axios.get(url)

        select.addEventListener('change', () => {
            dl.textContent = ""
            const name = select.value
            const people = response.data

            for (let character of people.results) {
                if (character.name === name) {
                    createAndAppendElement('dt', 'Name: ')
                    createAndAppendElement('dd', character.name)
                    createAndAppendElement('dt', 'Height: ')
                    createAndAppendElement('dd', character.height)
                    createAndAppendElement('dt', 'Mass: ')
                    createAndAppendElement('dd', character.mass)
                    createAndAppendElement('dt', 'Hair color: ')
                    createAndAppendElement('dd', character.hair_color)
                    createAndAppendElement('dt', 'Skin color: ')
                    createAndAppendElement('dd', character.skin_color)
                    createAndAppendElement('dt', 'Eye color: ')
                    createAndAppendElement('dd', character.eye_color)
                    createAndAppendElement('dt', 'Birth year: ')
                    createAndAppendElement('dd', character.birth_year)
                    createAndAppendElement('dt', 'Gender: ')
                    createAndAppendElement('dd', character.gender)
                    createAndAppendElement('dt', 'Homeworld: ', 'homeworld')
                    createAndAppendElement('dt', 'Species: ', 'species')
                    createAndAppendElement('dt', 'Films: ', 'films')

                    createAndAppendUniqueRequestElement('dd', character.homeworld, '[species]')
                    createAndAppendUniqueRequestElement('dd', character.species, '[films]')
                    createAndAppendMultipleElements('dd', character.films)

                    section_dl.appendChild(dl)
                }
            }
        })
    }
    catch (error) {
        console.error(`Erro ao obter opções: ${error}`)
    }
}

function createAndAppendElement(tagName, content, attribute) {
    const tag = document.createElement(tagName);
    tag.innerText = content

    if (attribute) tag.setAttribute(attribute, "")

    dl.appendChild(tag);
};

async function createAndAppendUniqueRequestElement(tagName, content, attribute = undefined) {

    try {
        const response = await axios.get(content)
        const data = response.data
        const newTag = document.createElement(tagName)
        const key = Object.keys(data)
        newTag.innerText = data[key[0]]

        if (attribute === undefined) {
            dl.appendChild(newTag)
        } else if (attribute) {
            document.querySelector(attribute).insertAdjacentElement('beforebegin', newTag)
        }
    }
    catch (error) {
        console.log(`Erro ao obter opções: ${error}`)
    }
}

async function createAndAppendMultipleElements(tagName, content, attribute = undefined) {
    try {
        for (let i in content) {
            const response = await axios.get(content[i])
            const data = response.data
            const newTag = document.createElement(tagName)
            const key = Object.keys(data)
            newTag.innerText = data[key[0]]

            if (attribute === undefined) {
                dl.appendChild(newTag)
            } else if (attribute) {
                document.querySelector(attribute).insertAdjacentElement('beforebegin', newTag)
            }
        }
    }
    catch (error) {
        console.log(`Erro ao obter opções: ${error}`)
    }
}

const parseForObj = (array, newArray) => {
    for (let i = 0; i < array.length; i++) {
        newArray.push(JSON.parse(array[i]))
    }
}

getOptions('https://swapi.dev/api/people')
getDescriptions('https://swapi.dev/api/people')

console.log(peoplesObj)