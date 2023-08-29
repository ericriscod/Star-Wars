
const select = document.querySelector('[options-title]')
const section_dl = document.querySelector('.section_dl')
const dl = document.createElement('dl')
const planetsObj = []
const arrayOptions = []



async function fetch(url) {
    try {
        const response = await axios.get(url)
        const data = response.data

        arrayOptions.push(...data.results.map((person) => person.name))
        planetsObj.push(...data.results)

        if (data['next']) {
            await fetch(data.next)
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
            console.log(planetsObj)
        }
    } catch (error) {
        console.error(`Erro ao obter opções: ${error}`)
    } finally {
        document.querySelector('.loading').style.display = 'none'
    }
}

async function fetchDetails(url) {
    try {
        select.addEventListener('change', () => {
            section_dl.textContent = ""
            dl.textContent = ""

            const name = select.value
            const planet = planetsObj.find((p) => p.name === name)

            if (planet) {
                createAndAppendElement('dt', 'Gravity: ')
                createAndAppendElement('dd', planet.gravity)
                createAndAppendElement('dt', 'Name: ')
                createAndAppendElement('dd', planet.name)
                createAndAppendElement('dt', 'Orbital_period: ')
                createAndAppendElement('dd', planet.orbital_period)
                createAndAppendElement('dt', 'Population: ')
                createAndAppendElement('dd', planet.population)

                createAndAppendElement('dt', 'Residents: ', 'residents')

                createAndAppendMultipleElements('dd', planet.residents)

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

function gifLoading(source) {
    const img = document.createElement('img')

    img.src = source
    img.title = 'Loading'
    img.classList.add('loading')

    document.querySelector('.choose').appendChild(img)
}

gifLoading('../assets/gifs/imperial_emblem.gif')
fetch('https://swapi.dev/api/planets/')
fetchDetails('https://swapi.dev/api/planets/')
