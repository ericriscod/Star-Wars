function getOptions() {
    const select = document.querySelector('[options-title]')

    axios.get('https://swapi.dev/api/films')
        .then(response => {
            const data = response.data

            for (i in data.results) {
                const option = document.createElement('option')
                const title = data.results[i].title

                option.innerText = title
                option.value = title

                select.appendChild(option)
            }
        })
}


function description() {
    const section_dl = document.querySelector('.section_dl')
    const option = document.querySelector('[options-title]')
    const dl = document.createElement('dl')

    option.addEventListener('change', () => {

        axios.get('https://swapi.dev/api/films')
            .then(response => {
                const data = response.data
                const title = option.value

                for (i in data.results) {
                    if (data.results[i].title === title) {
                        dl.innerHTML = ""
                        console.log(option.value)

                        const dtTitle = document.createElement('dt')
                        const dtDirector = document.createElement('dt')
                        const dtProducer = document.createElement('dt')
                        const dtReleaseDate = document.createElement('dt')
                        const dtPersons = document.createElement('dt')
                        const dtStarships = document.createElement('dt')

                        const ddTitle = document.createElement('dd')
                        const ddDirector = document.createElement('dd')
                        const ddProducer = document.createElement('dd')
                        const ddReleaseDate = document.createElement('dd')
                        const ddPersons = document.createElement('dd')
                        const ddStarships = document.createElement('dd')

                        dtTitle.innerText = 'Title: '
                        ddTitle.innerText = (data.results[i].title)

                        dl.appendChild(dtTitle)
                        dl.appendChild(ddTitle)

                        dtDirector.innerText = 'Director: '
                        ddDirector.innerText = (data.results[i].director)

                        dl.appendChild(dtDirector)
                        dl.appendChild(ddDirector)

                        dtProducer.innerText = 'Producer: '
                        ddProducer.innerText = (data.results[i].producer)

                        dl.appendChild(dtProducer)
                        dl.appendChild(ddProducer)

                        dtReleaseDate.innerText = 'Release date: '
                        ddReleaseDate.innerText = (data.results[i].release_date)

                        dl.appendChild(dtReleaseDate)
                        dl.appendChild(ddReleaseDate)

                        dtPersons.innerText = 'Persons: '
                        dl.appendChild(dtPersons)

                        const listPersons = document.createElement('ul')

                        data.results[i].characters.forEach((element) => {
                            axios.get(element)
                                .then(response => {
                                    const data = response.data
                                    const name = document.createElement('li')

                                    name.innerHTML = data.name
                                    listPersons.appendChild(name)

                                    ddPersons.appendChild(listPersons)

                                    dl.insertBefore(ddPersons, dtStarships)

                                    console.log(data.name)
                                })
                        });

                        //Verificar 
                        dtStarships.innerText = 'Starships: '
                        dl.appendChild(dtStarships)

                        const listStarships = document.createElement('ul')

                        data.results[i].starships.forEach((element) => {
                            axios.get(element)
                                .then(response => {
                                    const data = response.data
                                    const starship = document.createElement('li')

                                    starship.innerHTML = data.name
                                    listStarships.appendChild(starship)

                                    ddStarships.appendChild(listStarships)

                                    dl.appendChild(ddStarships)

                                    console.log(data.starships)
                                })
                        });

                        section_dl.appendChild(dl)

                    }
                }
            })
    })
}
getOptions()
description()
