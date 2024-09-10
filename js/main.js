'use strict'

var increment
var gDiameters
var gColors
var gIntervalTimer
var intervalCount = 0

function onInit() {
    increment = 50
    gDiameters = [100, 100]
    gColors = ['lightblue', 'pink']
}

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
        elBall.style.backgroundColor = gColors[i]
        updateDiameterDOM(i)
    }

}

function onBallReduce() {
    const randNum = getRandomInt(20, 61)
    for (var i = 0; i < gDiameters.length; i++) {
        gDiameters[i] = (gDiameters[i] - randNum < 100) ? 100 : gDiameters[i] - randNum
        const elBall = document.querySelector(`.ball${i + 1}`)
        elBall.style.width = gDiameters[i] + 'px'
        elBall.style.height = gDiameters[i] + 'px'
        updateDiameterDOM(i)
    }
}

function onChangeBackground(color = getRandomColor()) {
    const elPage = document.querySelector('body')
    elPage.style.backgroundColor = color
}

function updateDiameterDOM(i) {
    const elBall = document.querySelector(`.ball${i + 1}`)
    elBall.innerText = gDiameters[i] + 'px'
}

function changeBallRandColor(elBall, i) {
    gColors[i] = getRandomColor() + ''
    elBall.style.backgroundColor = gColors[i]
}

function onResetGame() {
    onInit()
    onChangeBackground('black')
    resetBalls()
}

function resetBalls() {
    for (var i = 0; i < gDiameters.length; i++) {
        const elBall = document.querySelector(`.ball${i + 1}`)
        elBall.style.backgroundColor = gColors[i]
        elBall.style.height = gDiameters[i] + 'px'
        elBall.style.width = gDiameters[i] + 'px'
        updateDiameterDOM(i)
    }
}

function onStartInterval() {
    gIntervalTimer = setInterval(runMouseClickOnBalls, 2000)
}

function runMouseClickOnBalls() {
    if(intervalCount>=10) clearInterval(gIntervalTimer)
    const elBall1 = document.querySelector(`.ball1`)
    const elBall2 = document.querySelector(`.ball2`)
    onBallClick(elBall1, 300, 0)
    onBallClick(elBall2, 300, 0)
    onBallSwap()
    onBallReduce()
    intervalCount++
}

function onEndInterval() {
    clearInterval(gIntervalTimer)
}