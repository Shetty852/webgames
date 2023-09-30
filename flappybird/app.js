import {getRandomNumber,getCssprop} from '/utils/utils.js'
let game, block, hole, character, score, gameoverscreen, star, gameStopped, isjumping

function getElements() {
    game=document.querySelector('#game')
    hole=document.querySelector('#block')
    hole=document.querySelector('#hole')
    character=document.querySelector('#character')
    score=document.querySelector('#score')
    gameoverscreen=document.querySelector('#gameoverscreen')
    star =document.querySelector('#star ')
} 
function setInitialValues() {
    gameStopped=false
    isjumping=false
    
}
function setEventListeners(){
    window.addEventListener('resize',_=>{
        if(gameStopped)return
        resetAllAnimations()
    })
    document.body.parentElement.addEventListener('click',_=>{
        if (gameStopped) return
        characterjump()
    })
    document.onkeypress = e => {
        e =e || window.event
        if ( e.keyCode === 32){
            if (gameStopped)return
            characterjump()
        }
    }
}
function gameOver(){

}
function characterjump() {
    isjumping=true
    let jumpCount=0
    const jumpInterval=setInterval(_=>{
        changeGameState({diff:-3, direction:'up'})
        if (jumpCount>20){
            clearInterval(jumpInterval)
            isjumping=false
            jumpCount=0
        }
        jumpCount++
    },10)
}
function changeGameState(diff, direction){
    handleCharacterAnimation(direction)
    handleCharacterPosition(diff)
}
function handleCharacterAnimation(direction){
    if (direction==='down'){
        character.classList.remove('go-up')
        character.classList.add('go-down')
    }
    else if (direction === 'up') {
        character.classList.add('go-up')
        character.classList.remove('go-down')
    }
}
function handleCharacterPosition(diff){
    const characterTop=parseInt(getCssprop(character,'top'))
    const changeTop=characterTop+diff
    if(changeTop < 0) {
        return
    }
    if(changeTop>window.innerHeight) {
        return gameOver()
    }
    character.style.top=`${changeTop}px`
}
function initRandomHoles(){
    hole.addEventListener('animationiteration',_=> {
        const fromHeight=60*window.innerHeight/100
        const toHeight=95*window.innerHeight/100

        const randomTop=getRandomNumber(fromHeight,toHeight)
        hole.style.top= `-${ randomTop }px`
    })
}
function beginGravity() {
    setInterval(_=>{
        if (isjumping)return
        changeGamesState({diff:5, direction:'down'})
    },20)
}
function resetAllAnimations() {
    const seconds=2
    const blockAnimationCss= `blockAnimation ${seconds}s infinite linear`

    block.style.animation=blockAnimationCss
    hole.style.animation=blockAnimationCss
}
function getInit(){
    getElements()
    setInitialVal()
    beginGravity()
    initRandomHoles()
    setEventListeners()
    resetAllAnimations()
}

gameInit()
