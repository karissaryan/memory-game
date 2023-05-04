document.addEventListener('DOMContentLoaded', () => {

    //card options

    const cardArray = [        
        {           
            name: 'fries',            
            img: 'images/fries.png'       
        },        
        {            
            name: 'fries',            
            img: 'images/fries.png'        
        },        
        {            
            name: 'cheeseburger',            
            img: 'images/cheeseburger.png'        
        },        
        {            
            name: 'cheeseburger',            
            img: 'images/cheeseburger.png'        
        },        
        {            
            name: 'hotdog',            
            img: 'images/hotdog.png'        
        },        
        {            
            name: 'hotdog',            
            img: 'images/hotdog.png'        
        },        {            
            name: 'ice-cream',            
            img: 'images/ice-cream.png'        
        },        
        {           
            name: 'ice-cream',            
            img: 'images/ice-cream.png'        
        },        
        {            
            name: 'milkshake',            
            img: 'images/milkshake.png'        
        },        
        {            
            name: 'milkshake',           
            img: 'images/milkshake.png'        
        },        
        {            
            name: 'pizza',            
            img: 'images/pizza.png'        
        },        
        {            
            name: 'pizza',            
            img: 'images/pizza.png'        
        }    
    ];


    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#results');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let turns = 0;

    // Replace alert with showModal
    function showModal(message, playAgainCallback) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalPlayAgain = document.getElementById('modal-play-again');
  
    // Set the message
    modalMessage.textContent = message;
  
    // Show the modal
    modal.style.display = 'block';
  
    // When the user clicks on the close button or outside of the modal, hide it
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        playAgainCallback();
      }
    };
  
    // When the user clicks on the play again button, hide the modal and call the playAgainCallback
    modalPlayAgain.onclick = function() {
      modal.style.display = 'none';
      playAgainCallback();
    };
  }
    //create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            cardArray.sort(() => .05 - Math.random());
            let card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    //check for matches
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            showModal('You found a match!');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            showModal('Sorry try again');
        }
        cardsChosen = [];
        cardsChosenId = [];
        turns ++;
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = `Congratulation! You found them all in ${turns} turns!`;
        } else {
            resultDisplay.textContent = `${turns}`;
        }
    }

    //flip your card
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
});
