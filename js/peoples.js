const select = document.querySelector('[options-title]')
const section_dl = document.querySelector('.section_dl')
const dl = document.createElement('dl')
const peoplesObj = []
const arrayOptions = []

async function fetchPeople(url) {
    try {
        const response = await axios.get(url)
        const data = response.data

        arrayOptions.push(...data.results.map((person) => person.name))
        peoplesObj.push(...data.results)

        if (data['next']) {
            await fetchPeople(data.next)
        }
        else {
            arrayOptions.sort()

            for (const option of arrayOptions) {
                const elementOption = document.createElement('option')
                elementOption.innerText = option
                elementOption.value = option
                select.appendChild(elementOption)
            }

            console.log(arrayOptions)
            console.log(peoplesObj)
        }
    } catch (error) {
        console.error(`Erro ao obter opções: ${error}`)
    }
}

async function fetchDetaisOfPersons(url) {
    try {
        const response = await axios.get(url)
        const data = response.data

        select.addEventListener('change', () => {
            dl.textContent = ""

            const name = select.value
            const people = peoplesObj.find((p) => p.name === name)

            if (people) {
                createAndAppendElement('dt', 'Name: ')
                createAndAppendElement('dd', people.name)
                createAndAppendElement('dt', 'Height: ')
                createAndAppendElement('dd', people.height)
                createAndAppendElement('dt', 'Mass: ')
                createAndAppendElement('dd', people.mass)
                createAndAppendElement('dt', 'Hair color: ')
                createAndAppendElement('dd', people.hair_color)
                createAndAppendElement('dt', 'Skin color: ')
                createAndAppendElement('dd', people.skin_color)
                createAndAppendElement('dt', 'Eye color: ')
                createAndAppendElement('dd', people.eye_color)
                createAndAppendElement('dt', 'Birth year: ')
                createAndAppendElement('dd', people.birth_year)
                createAndAppendElement('dt', 'Gender: ')
                createAndAppendElement('dd', people.gender)

                createAndAppendElement('dt', 'Homeworld: ', 'homeworld')
                createAndAppendElement('dt', 'Species: ', 'species')
                createAndAppendElement('dt', 'Films: ', 'films')

                createAndAppendUniqueRequestElement('dd', people.homeworld, '[species]')
                createAndAppendUniqueRequestElement('dd', people.species, '[films]')
                createAndAppendMultipleElements('dd', people.films)

                section_dl.appendChild(dl)
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
}

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
        for (const i in content) {
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

fetchPeople('https://swapi.dev/api/people')
fetchDetaisOfPersons('https://swapi.dev/api/people')
