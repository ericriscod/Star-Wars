var cards = document.getElementsByClassName('link')
var sound = document.getElementById('sabre')

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('mouseover',()=>{
        sound.play()
        console.log('passei aqui')
      
    })

    cards[i].addEventListener('mouseout', ()=>{
        sound.pause()
        sound.currentTime = 0
        console.log('saindo')
    })
}