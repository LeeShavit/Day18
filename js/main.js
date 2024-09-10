'use strict'

var increment = 50
var gDiameters = [100, 100]
var gColors = []

function onBallClick(elBall, maxDiameter, i) {
    increment = getRandomInt(20, 61)
    gDiameters[i] = gDiameters[i] < maxDiameter ? gDiameters[i] + increment : 100
    elBall.style.height = gDiameters[i] + 'px'
    elBall.style.width = gDiameters[i] + 'px'
    updateDiameterDOM(i)
    changeBallRandColor(elBall, i)
}

function onBallSwap() {
    gDiameters.push(gDiameters.shift())
    gColors.push(gColors.shift())
    for (var i = 0; i < gDiameters.length; i++) {
        const elBall = document.querySelector(`.ball${i + 1}`)
        elBall.style.width = gDiameters[i] + 'px'
        elBall.style.height = gDiameters[i] + 'px'
        elBall.style.backgroundColor= gColors[i]
        updateDiameterDOM(i)
    }

}

function updateDiameterDOM(i) {
    const elBall = document.querySelector(`.ball${i + 1}`)
    elBall.innerText = gDiameters[i] + 'px'
}

function changeBallRandColor(elBall, i) {
    gColors[i] = getRandomColor() + ''
    elBall.style.backgroundColor = gColors[i]
}