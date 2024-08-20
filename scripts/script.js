 const hangmanImage = document.querySelector(".hangman-box img")
const keyBoardDiv = document.querySelector(".keyboard")
const guessText = document.querySelector(".guesses-text b")
const wordDisplay = document.querySelector(".word-display")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")
let currentWord, correctLetters , wrongGuestCount;
const maxGuesses = 6

const resetGame = () =>{
    correctLetters = []
    wrongGuestCount = 0
    hangmanImage.src = `hangman-${wrongGuestCount}.svg`
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("")
    gameModal.classList.remove("show")
    keyBoardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    guessText.innerText = `${wrongGuestCount} / ${maxGuesses}`


}

const getRandom = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    console.log(word);
    
    document.querySelector(".hint-text b").innerText = hint;
    resetGame()
    
}

const gameOver = (isVictory) =>{
setTimeout(() => {
    // After 600ms of game conplete .. showing modal with rekevant details 
    const modalText = isVictory ? "You foung the word" : "The correct word was"
    gameModal.querySelector("img").src = `${isVictory ? "victory" : "lost"}.gif`
    gameModal.querySelector("img").innerText = `${isVictory ? "Congrats" : "Game Over"}`
    gameModal.querySelector("img").innerHTML = `${modalText} <b>${currentWord}</b>`
    gameModal.classList.add("show")
}, 300);
}
const initGame = (button, clickedLetter) =>{
if(currentWord.includes(clickedLetter)){
[...currentWord].forEach((letter, index) =>{
    if(letter === clickedLetter){
        correctLetters.push(letter)
        wordDisplay.querySelectorAll("li")[index].innerHTML = letter
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
    }
})    
}else{
    // if clicked letter does not exist then update the wrongGuessCount and hangman image
wrongGuestCount++    
hangmanImage.src = `hangman-${wrongGuestCount}.svg`
}
button.disabled = true
guessText.innerText = `${wrongGuestCount} / ${maxGuesses}`

// calling gameOver function if any of these condition meet
if(wrongGuestCount === maxGuesses) return gameOver(false)
if(correctLetters.length === currentWord.length) return gameOver(true)
}

// Creating keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerHTML = String.fromCharCode(i)
    keyBoardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))

}
getRandom()
playAgainBtn.addEventListener("click",getRandom)