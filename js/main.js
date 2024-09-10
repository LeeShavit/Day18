'use strict'

const increment = 50
var gDiameter = 100

function onBallClick(elBall){
    gDiameter+= increment
    elBall.style.height= gDiameter+'px'
    elBall.style.width= gDiameter+'px'
    updateDiameter()
}

function updateDiameter(){
    const elDiameter= document.querySelector('.diameter')
    elDiameter.innerText = gDiameter+'px'
}