const select = document.querySelector('[options-title]')
const section_dl = document.querySelector('.section_dl')
const dl = document.createElement('dl')
const peoplesObj = []
const arrayTemp = []
const arrayOptions = []

async function getOptions(url) {
    try {
        const response = await axios.get(url)
        const data = response.data

        const parseForObj = (array, newArray) => {
            for (let i = 0; i < array.length; i++) {
                newArray.push(JSON.parse(array[i]))
            }
        }

        for (let people of data.results) {

            arrayOptions.push(people.name)
            arrayTemp.push(JSON.stringify(people))
        }

        if (data['next']) {
            await getOptions(data.next)
        } 
        else {
            arrayOptions.sort((a, b) => {
                if (a > b) {
                    return 1
                } 
                else if (a < b) {
                    return -1
                } 
                else {
                    return 0
                }
            })
            
            for (let i = 0; i < arrayOptions.length; i++) {
                const option = document.createElement('option')
                option.innerText = arrayOptions[i]
                option.value = arrayOptions[i]
                select.appendChild(option)
            }
            parseForObj(arrayTemp, peoplesObj)

            console.log(arrayOptions)
            console.log(peoplesObj)
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

            for (let i = 0; i < peoplesObj.length; i++) {
                if (peoplesObj[i].name === name) {
                    createAndAppendElement('dt', 'Name: ')
                    createAndAppendElement('dd', peoplesObj[i].name)
                    createAndAppendElement('dt', 'Height: ')
                    createAndAppendElement('dd', peoplesObj[i].height)
                    createAndAppendElement('dt', 'Mass: ')
                    createAndAppendElement('dd', peoplesObj[i].mass)
                    createAndAppendElement('dt', 'Hair color: ')
                    createAndAppendElement('dd', peoplesObj[i].hair_color)
                    createAndAppendElement('dt', 'Skin color: ')
                    createAndAppendElement('dd', peoplesObj[i].skin_color)
                    createAndAppendElement('dt', 'Eye color: ')
                    createAndAppendElement('dd', peoplesObj[i].eye_color)
                    createAndAppendElement('dt', 'Birth year: ')
                    createAndAppendElement('dd', peoplesObj[i].birth_year)
                    createAndAppendElement('dt', 'Gender: ')
                    createAndAppendElement('dd', peoplesObj[i].gender)
                    createAndAppendElement('dt', 'Homeworld: ', 'homeworld')
                    createAndAppendElement('dt', 'Species: ', 'species')
                    createAndAppendElement('dt', 'Films: ', 'films')

                    createAndAppendUniqueRequestElement('dd', peoplesObj[i].homeworld, '[species]')
                    createAndAppendUniqueRequestElement('dd', peoplesObj[i].species, '[films]')
                    createAndAppendMultipleElements('dd', peoplesObj[i].films)

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

getOptions('https://swapi.dev/api/people')
getDescriptions('https://swapi.dev/api/people')
