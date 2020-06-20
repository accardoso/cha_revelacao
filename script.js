// Word selection
// New word = ["Word name", "Hint"]
var word = [["",""]]

// Game keyboard
var tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ"

// Game memory
var select = 0
var wordLeft = []

// Web-page onload
window.onload = function() {
    gId("moveKeybord").addEventListener('touchmove', function(e) {
        wH = window.innerHeight
        tY = e.touches[0].clientY
        eL = gId("tastatur")
        resY = wH - tY - eL.offsetHeight
        if(resY < 0) {
            resY = 0
        } else if(resY > wH / 2) {
            resY = wH / 2
        }
        eL.style.bottom = resY + "px"
      }, false)
    createTastur()
}

// Start game
function startGameBoyGirl() {
    word = [["Ab    Ac", "Eu sou um Menin_!"]]
    gId("question").innerText = "Menino ou Menina?"
    newGame()
}
function startGameName() {
    word = [["Abc", "Meu nome é Abc"]]
    gId("question").innerText = "Meu nome é ..."
    newGame()
}

// New game
function newGame() {
    gId("home").className = "h"
    gId("result").className = "h"

    clearTastatur()
    createWord()
    // clearHint()
}

// Clear keyboard
function clearTastatur() {
    var e = document.getElementsByClassName("b")
    for(a = 0; a < e.length; a++) {
        e[a].setAttribute("data", "")
    }
}

// // Clear hint
// function clearHint() {
//     gId("hintButton").setAttribute("data", "false")
//     gId("hint").style.display = "none"
// }

// Get new word
function createWord() {
    wordLeft = []
    var d = gId("letter")
    d.innerHTML = ""
    select = 0 //Math.floor(Math.random() * word.length)
    for(a = 0; a < word[select][0].length; a++) {
        var x = word[select][0][a].toUpperCase()
        var b = document.createElement("span")
        b.className = "l" + (x == " " ? " ls" : "")
        b.innerHTML = "&nbsp"
        b.id = "l" + a;
        d.appendChild(b)

        if(x != " ") {
            if(wordLeft.indexOf(x) == -1) {
                wordLeft.push(x)
            }
        }
    }
}

// Create keyboard
function createTastur() {
    var tas = gId("keybord")
    tas.innerHTML = ""
    for(a = 0; a < tastatur.length; a++) {
        var b = document.createElement("span")
        b.className = "b"
        b.innerText = tastatur[a]
        b.setAttribute("data", "")
        b.onclick = function() {
            bTas(this)
        }
        tas.appendChild(b)
    }
}

// Game check, If show next error / game end
function bTas(a) {
    if(a.getAttribute("data") == "") {
        var x = isExist(a.innerText)
        a.setAttribute("data", x)
        if(x) {
            if(wordLeft.length == 0) {
                gameEnd()
            }
        }
    }
}

// If letter "X" exist
function isExist(e) {
    e = e.toUpperCase()
    var x = wordLeft.indexOf(e)
    if(x != -1) {
        wordLeft.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

function typeWord(e) {
    for(a = 0; a < word[select][0].length; a++) {
        if(word[select][0][a].toUpperCase() == e) {
            gId("l" + a).innerText = e
        }
    }
}

// Game result
function gameEnd() {
    gId("rT").innerText = word[select][1]
    gId("rB").innerText = word[select][0]
    gId("result").className = ""
}

// Reset game
function restartGame() {
    word = [["",""]]
    gId("home").className = ""
    gId("result").className = "h"
}

// // Show hint
// function hint() {
//     gId("hintText").innerText = word[select][1]
//     gId("hint").style.display = "block"
// }

// // Exit hint
// function hintExit() {
//     gId("hint").style.display = "none"
// }

// Get HTML ID element by name
function gId(a) {
    return document.getElementById(a)
}
