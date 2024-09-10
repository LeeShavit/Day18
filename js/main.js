'use strict'

const increment = 50
var gDiameter = 100

function onBallClick(elBall) {
    gDiameter = gDiameter < 400 ? gDiameter+increment : 100
    elBall.style.height = gDiameter + 'px'
    elBall.style.width = gDiameter + 'px'
    updateDiameter()
    changeBallRandColor(elBall)
}

function updateDiameter() {
    const elDiameter = document.querySelector('.diameter')
    elDiameter.innerText = gDiameter + 'px'
}

function changeBallRandColor(elBall){
    elBall.style.backgroundColor= getRandomColor()+''
}