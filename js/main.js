
function mouveover() {

    const music = new Audio
    const url = "./assets/sounds/sabre.mp3"

    music.src = url

    const cards = document.querySelectorAll('.link').forEach(link => {
        link.addEventListener('mouseover', () => {
            music.play()
            music.volume = 0.3
            console.log('mouseover')
        })

        link.addEventListener('mouseout', () => {
            music.pause()
            music.currentTime = 0
            console.log('mouseout')
        })
    })
}

mouveover()
