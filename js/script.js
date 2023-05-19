
function mouveover() {
    const cards = document.getElementsByClassName('link')
    const sound = document.getElementById('sabre')

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('mouseover', () => {
            sound.play()
            console.log('mouseover')

        })
        cards[i].addEventListener('mouseout', () => {
            sound.pause()
            sound.currentTime = 0
            console.log('mouseout')
        })
    }
}

function volumeMusic(volume) {
    const music = document.getElementById('music')
    music.volume = volume
}

volumeMusic(0.4)
mouveover()
