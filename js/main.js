
function mouveover() {
    const cards = document.getElementsByClassName('link')
    // const music = document.getElementById('sabre')

    const music = new Audio
    const url = "./assets/sounds/sabre.mp3"

    music.src = url

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('mouseover', () => {
            music.play()
            music.volume = 0.3
            console.log('mouseover')
        })
        cards[i].addEventListener('mouseout', () => {
            music.pause()
            music.currentTime = 0
            console.log('mouseout')
        })
    }
}

mouveover()
