
const select = document.querySelector('[options-title]')
const section_dl = document.querySelector('.section_dl')
const dl = document.createElement('dl')
const arrayObj = []
const arrayOptions = []



async function fetch(url) {
    try {
        const response = await axios.get(url)
        const data = response.data

        arrayOptions.push(...data.results.map((obj) => obj.title))
        arrayObj.push(...data.results)

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
            console.log(arrayObj)
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

            const title = select.value
            const obj = arrayObj.find((p) => p.title === title)

            if (obj) {

                createAndAppendElement('dt', 'Title: ')
                createAndAppendElement('dd', obj.title)
                createAndAppendElement('dt', 'Director: ')
                createAndAppendElement('dd', obj.director)
                createAndAppendElement('dt', 'Producer: ')
                createAndAppendElement('dd', obj.producer)
                createAndAppendElement('dt', 'Release_date: ')
                createAndAppendElement('dd', obj.release_date)

                createAndAppendElement('dt', 'Characters: ', 'characters')

                createAndAppendMultipleElements('dd', obj.characters)

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
fetch('https://swapi.dev/api/films/')
fetchDetails('https://swapi.dev/api/films/')
