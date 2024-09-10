'use strict'
const gSteps = []

var increment
var gDiameters = []
var gColors = []
var gBackGroundColor
var gIntervalTimer
var intervalCount = 0

var gStepCounter = 0
var gStepsBack = 0

var gIsEnableOn = false

function onInit() {
    increment = 50
    gDiameters = [100, 100]
    gColors = ['lightblue', 'pink']
    gBackGroundColor = 'black'
}

function onBallClick(elBall, maxDiameter, i) {
    increment = getRandomInt(20, 61)
    gDiameters[i] = gDiameters[i] < maxDiameter ? gDiameters[i] + increment : 100
    updateBallSizeDom(elBall, i)
    updateDiameterDOM(i)
    changeBallRandColor(elBall, i)
    saveStep()
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
    saveStep()
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
    saveStep()
}

function updateBallSizeDom(elBall, i) {
    elBall.style.height = gDiameters[i] + 'px'
    elBall.style.width = gDiameters[i] + 'px'
}

function onChangeBackground(color = getRandomColor()) {
    const elPage = document.querySelector('body')
    elPage.style.backgroundColor = color
    gBackGroundColor = color
    saveStep()
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
    saveStep()
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
    if (intervalCount >= 10) clearInterval(gIntervalTimer)
    const elBall1 = document.querySelector(`.ball1`)
    const elBall2 = document.querySelector(`.ball2`)
    onBallClick(elBall1, 300, 0)
    onBallClick(elBall2, 300, 0)
    onBallSwap()
    onBallReduce()
    intervalCount++
    saveStep()
}

function onEndInterval() {
    clearInterval(gIntervalTimer)
}

function saveStep() {
    const step = {
        ball1: {
            size: gDiameters[0],
            color: gColors[0]
        },
        ball2: {
            size: gDiameters[1],
            color: gColors[1]
        },
        background: gBackGroundColor
    }
    gSteps.push(step)
    gStepCounter++
    renderStepCounterTitle()
}

function onUndo() {
    gStepsBack++
    initializeStep()
}

function onRedo(){
    gStepsBack--
    initializeStep()
}

function initializeStep() {
    const stepIdx= gSteps.length-gStepsBack
    const currStep = gSteps[stepIdx]
    //update modal
    gDiameters[0] = currStep.ball1.size
    gDiameters[1] = currStep.ball2.size
    gColors[0] = currStep.ball1.color
    gColors[1] = currStep.ball2.color
    gBackGroundColor = currStep.background
    //update DOM
    const elBall1 = document.querySelector(`.ball1`)
    const elBall2 = document.querySelector(`.ball2`)
    updateBallSizeDom(elBall1, 0)
    updateBallSizeDom(elBall2, 1)
    elBall1.style.backgroundColor = gColors[0]
    elBall2.style.backgroundColor = gColors[1]
    onChangeBackground(gBackGroundColor)
}

function onEnable(elEnableBtn){
    if(gIsEnableOn){
        elEnableBtn.innerText='Disable undo/redo'
    }
    else {
        elEnableBtn.innerText='Enable undo/redo'
    }
    gIsEnableOn=!gIsEnableOn
    const elUndo=document.querySelector('.undo')
    elUndo.classList.toggle('hide')
    const elRedo=document.querySelector('.redo')
    elRedo.classList.toggle('hide')
    }

function renderStepCounterTitle(){
    const elTitle=document.querySelector('title')
    elTitle.innerText=`Steps: ${gStepCounter}`
}