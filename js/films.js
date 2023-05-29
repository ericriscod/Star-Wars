function getOptions() {
    const select = document.querySelector('select')

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

getOptions()