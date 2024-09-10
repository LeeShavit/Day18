'use strict'

var increment = 50
var gDiameters = [100,100]

function onBallClick(elBall,maxDiameter,i) {
    increment= getRandomInt(20,61)
    gDiameters[i] = gDiameters[i] < maxDiameter ? gDiameters[i]+increment : 100
    elBall.style.height = gDiameters[i] + 'px'
    elBall.style.width = gDiameters[i] + 'px'
    updateDiameterDOM(i)
    changeBallRandColor(elBall)
}

function updateDiameterDOM(i) {
    const elDiameter = document.querySelector(`.ball${i+1}`)
    elDiameter.innerText = gDiameters[i] + 'px'
}

function changeBallRandColor(elBall){
    elBall.style.backgroundColor= getRandomColor()+''
}