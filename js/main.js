const container = document.getElementById("container")
const scr = document.getElementsByClassName("scr")
const logo = document.getElementById("logo")
const classement = document.getElementById("classement")
let essaisRestant
let containerGame
let startImg
let anim
let jeu
let facile
let moyen
let difficile
let soldat
let difficulty
let printWord
let mot_a_trouver
let longueur
let mot_trouve
let lettre
let clickSound
let ace
let erreurs_autorisees = 10
let erreurs_commises = 0
let alphabet = [];
for (let i=65;i<=90;i++){
    alphabet.push(String.fromCharCode(i))
}
let index = 0
let testKeyboard = 0
let tab_soldat = ["","ace_triste","ace_en_colere","ace","soldat1","soldat2","soldat3","soldat4","soldat5","soldat6","soldat7","ace_tete"]
let tab_score = []
let highscore
let scoreMoyen = 0

function startMenu(){
    highscore = 10
    scoreMoyen = 0
    tab_score=[]
    scr[1].innerHTML = ""
    scr[0].innerHTML = ""
    scr[2].innerHTML = ""
    const startPage = document.createElement("div")
    startPage.id = "start"
    container.appendChild(startPage)
    const labelSelect = document.createElement("label")
    labelSelect.classList.add("fontStyle")
    labelSelect.classList.add("fontChanga")
    labelSelect.innerHTML = "Choisir une difficulté : "
    startPage.appendChild(labelSelect)
    const difSelect = document.createElement("select")
    difSelect.name = "difficulty"
    difSelect.id = "difficulty"
    difSelect.classList.add("fontStyle")
    difSelect.classList.add("fontChanga")
    startPage.appendChild(difSelect)
    const optionEz = document.createElement("option")
    optionEz.value = "easy"
    optionEz.innerHTML = "Facile"
    const optionMid = document.createElement("option")
    optionMid.value = "mid"
    optionMid.innerHTML = "Moyen"
    const optionHard = document.createElement("option")
    optionHard.value = "hard"
    optionHard.innerHTML = "Difficile"
    difSelect.appendChild(optionEz)
    difSelect.appendChild(optionMid)
    difSelect.appendChild(optionHard)
    startImg = document.createElement("img")
    startImg.id = "btnStart"
    startImg.src = "Images/bouttondemarrer.png"
    startPage.appendChild(startImg)
    startImg.addEventListener("click",()=>{
        if (difSelect.value == "easy"){
            difficulty = easy
        }else if (difSelect.value == "mid"){
            difficulty = mid
        }else{
            difficulty = hard
        }
        startGame()
        game()
    })
    
}

startMenu()

function startGame(){

    clickSound = new Audio()
    clickSound.src = 'Audio/click.wav'
    clickSound.volume = 0.05

    // Clear de la page actuelle
    const start = document.getElementById("start")
    container.removeChild(start)

    containerGame = document.createElement("div")
    containerGame.id = "containerGame"
    container.appendChild(containerGame)

    // Creation de l'emplacement de l'anim
    anim = document.createElement("div")
    anim.id = "decapitation"
    containerGame.appendChild(anim)
    ace = document.createElement("img")
    ace.id = "aceImg"
    ace.src = `anim/${tab_soldat[1]}.png`
    anim.appendChild(ace)
    soldat = document.createElement("img")
    soldat.id = "soldat"
    soldat.src = `anim/${tab_soldat[4]}.png`
    anim.appendChild(soldat)

    // Creation de l'espace de jeu
    jeu = document.createElement("div")
    jeu.id = "game"
    containerGame.appendChild(jeu)

    // Creation de l'emplacement du mot à trouver
    const motDiv = document.createElement("div")
    motDiv.id = "mot"
    motDiv.classList.add("fontChanga")
    jeu.appendChild(motDiv)
    printWord = document.createElement("p")
    printWord.id = "word"
    motDiv.appendChild(printWord)

    // Creation de l'espace du clavier
    const keyboardDiv = document.createElement("div")
    keyboardDiv.id = "clavier"
    jeu.appendChild(keyboardDiv)
    const keyboard1 = document.createElement("div")
    keyboard1.id = "clavier1"
    keyboardDiv.appendChild(keyboard1)
    const keyboard2 = document.createElement("div")
    keyboard2.id = "clavier2"
    keyboardDiv.appendChild(keyboard2)
    essaisRestant = document.createElement("p")
    essaisRestant.id = "essaisRestant"
    essaisRestant.classList.add("fontChanga")
    essaisRestant.innerHTML = "Nombre d'essais restants : " + (erreurs_autorisees-erreurs_commises)
    keyboardDiv.appendChild(essaisRestant)

    // Creation du clavier
    for (let y=0;y<(alphabet.length/2);y++){
        let button = document.createElement("button")
        button.classList.add("fontChanga")
        button.innerHTML = alphabet[y]
        button.id = alphabet[y]
        keyboard1.appendChild(button)
        button.addEventListener("click",isInTheWord)
    }
    for (let y=(alphabet.length/2);y<alphabet.length;y++){
        let button = document.createElement("button")
        button.classList.add("fontChanga")
        button.innerHTML = alphabet[y]
        button.id = alphabet[y]
        keyboard2.appendChild(button)
        button.addEventListener("click",isInTheWord)
    }
    document.addEventListener("keyup",isInTheWord)
}

function initWord(){
    mot_a_trouver = difficulty[Math.floor(Math.random()*difficulty.length)].toUpperCase()
    longueur = mot_a_trouver.length
    mot_trouve = ""
    for (let i=0;i<longueur;i++){
        if (mot_a_trouver[i]==" "){
            mot_trouve += " "
        }else{
            mot_trouve += "-"
        }
}
printWord.innerHTML = mot_trouve
}

function lettres_placees(lettres_trouvees){
    mot_trouve = mot_trouve.split("")
    for (let i in mot_a_trouver){
        if (mot_a_trouver[i]==lettres_trouvees){
            mot_trouve[i]=lettres_trouvees
        }
    }
    mot_trouve = mot_trouve.join("")
    printWord.innerHTML = mot_trouve
}

function isInTheWord(e){
    clickSound.play()
    let styleTarget
    if (e.key == undefined){
        lettre = e.target.id.toUpperCase()
        styleTarget = e.target
    }else{
        lettre = e.key.toUpperCase()
        styleTarget = document.getElementById(lettre.toUpperCase())
    }
    if (mot_a_trouver.includes(lettre)){
        lettres_placees(lettre)
    }else{
        if (styleTarget.style.backgroundColor!="gray"){
            erreurs_commises++
            essaisRestant.innerHTML = "Nombre d'essais restants : " + (erreurs_autorisees-erreurs_commises)
            scr[0].innerHTML = "Score : " + erreurs_commises
            console.log(erreurs_commises)
            index++
            if (index>3){
                if (index==10){
                    ace.style.margin = "18.5em -22.5em 0 0"
                    soldat.src=`anim/${tab_soldat[index]}.png`
                    ace.src = `anim/${tab_soldat[11]}.png`
                }else{
                    soldat.style.visibility = "visible"
                    soldat.src = `anim/${tab_soldat[index]}.png`
                    ace.src = `anim/${tab_soldat[3]}.png`
                }
            }else{
                ace.style.visibility = "visible"
                ace.src = `anim/${tab_soldat[index]}.png`
            }
        }
    }
    styleTarget.style.backgroundColor = "gray"
    if (mot_a_trouver==mot_trouve || erreurs_autorisees==erreurs_commises){
        setTimeout(endGame,1000)
    }
}

function endGame(){
    if (erreurs_autorisees == erreurs_commises){
        audio.play()
    }else{
        win.play()
    }
    score()
    index = 0
    let result
    let endGif
    if (mot_trouve!=mot_a_trouver){
        result = `PERDU ! Le mot a trouvé était ${mot_a_trouver}.`
        endGif = "Images/luffy_lose.gif"
    }else{
        result = `GAGNÉ ! Le mot était bien ${mot_a_trouver} <br>Vous avez fait ${erreurs_commises} erreurs.`
        endGif = "Images/luffy_happy_.gif"
    }
    containerGame.removeChild(anim)
    containerGame.removeChild(jeu)

    const endContainer = document.createElement("div")
    endContainer.id = "start"
    container.appendChild(endContainer)
    const resultat = document.createElement("div")
    resultat.id = "result"
    endContainer.appendChild(resultat)
    const printResult = document.createElement("p")
    printResult.id = "resultat"
    printResult.classList.add("fontStyle")
    printResult.classList.add("fontChanga")
    printResult.innerHTML = result
    resultat.appendChild(printResult)

    const imgEnd = document.createElement("img")
    imgEnd.id = "imgEnd"
    imgEnd.src = endGif
    endContainer.appendChild(imgEnd)

    const btnPanelEnd = document.createElement("div")
    btnPanelEnd.id = "btnEnd"
    endContainer.appendChild(btnPanelEnd)
    const restart = document.createElement("img")
    restart.id = "btnRestart"
    restart.src = "Images/RELANCERfinal.png"
    btnPanelEnd.appendChild(restart)
    restart.addEventListener("click",()=>{
        startGame()
        game()
    })
    const returnMenu = document.createElement("img")
    returnMenu.id = "returnMenu"
    returnMenu.src = "Images/boutonAccueil.png"
    btnPanelEnd.appendChild(returnMenu)
    returnMenu.addEventListener("click",()=>{
        const clearElement = document.getElementById("start")
        container.removeChild(clearElement)
        startMenu()
    })
}

function game(){
    scr[0].innerHTML = "Score : " + 0
    erreurs_autorisees = 10;
    erreurs_commises = 0;
    initWord()
}

function score(){
    let score = erreurs_commises
    if (highscore >= score){
        highscore = score
        scr[1].innerHTML = "Highscore : " + highscore
    }
    tab_score.push(score)
    scoreMoyen = 0
    for (let i of tab_score){
        scoreMoyen += i
    }
    scoreMoyen/=tab_score.length
    scr[2].innerHTML = "Score moyen : " + scoreMoyen
}

logo.addEventListener("click",()=>location.reload())

// Son de défaite
let audio = new Audio()
audio.src = 'Audio/sad_trombone.mp3'
audio.volume = 0.05

// Son d'ambiance
let ost = new Audio()
ost.src = 'Audio/ost.mp3'
ost.volume = 0.05
ost.loop = "autoloop"

// Son de victoire
let win = new Audio()
win.src = 'Audio/luffy-laugh.mp3'
win.volume = 0.05

const music = document.getElementById("music")
music.addEventListener("change",()=>{
    if (music.checked){
        ost.play()
    }else{
        ost.pause()
    }
})