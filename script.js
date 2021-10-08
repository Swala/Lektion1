

const startCard = document.getElementById("startCard");
const nextCard = document.getElementById("nextCard");
const myCards = document.getElementById("myCards");
const buttonHigh = document.getElementById("higher");
const buttonLow = document.getElementById("lower");
const score = document.getElementById("score");
const startImage = document.createElement("img");
const nextImage = document.createElement("img");
const success = document.getElementById("result");
const showPoints = document.getElementById("points");
const displayTitle = document.getElementById("newTitle");
const displayOldTitle = document.getElementById("oldCard");

let value;
let points = 0;
showPoints.innerText = points;

buttonHigh.innerText= "Higher";
buttonLow.innerText= "Lower";

let data;

document.body.appendChild(myCards);
document.body.appendChild(score);
score.appendChild(showPoints);


async function getData() {

    const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );

    //console.log(res);

    data = await res.json();
    console.log(data);
    drawCard();

}

async function drawCard() {

    const res = await fetch(

        `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`

    );
    const { cards } = await res.json();

    //console.log(cards);

    cards.forEach((card) => {

        //const image = document.createElement("img");

        value = document.createElement("p");

        startImage.setAttribute("src", card.image);

        value.innerText = convertDressedCards(card);

        //myCards.appendChild(image);
        startCard.appendChild(startImage);
        nextCard.appendChild(nextImage)

        //myCards.appendChild(value);

    });

}

//onclick higher function
buttonHigh.addEventListener("click", isHigher);

async function isHigher(){
    //console.log("curent value: " + value.innerText);
    
    let currentValue = value.innerText;
    let nextValue;
    
    const res = await fetch(

        `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`

    );

    const { cards } = await res.json();

    changeImage(cards[0])

    //nextImage.setAttribute("src", cards[0].image);

    nextValue = convertDressedCards(cards[0])
    //nextValue = cards[0].value;
    
    //console.log("Next value: " + nextValue);

    let result = compareCards(currentValue, nextValue);
    console.log(result);
    
    if(result === true){
        value.innerText = nextValue;
        success.innerText = "True";
        points = points +1;
        showPoints.textContent = points;
        //showPoints.textContent + points;
        
    }else if(result === false){
        value.innerText = nextValue;
        success.innerText = "False";
        
    }else if(result === "Equal"){
        value.innerText = nextValue;
        success.innerText = "Equal! No points..."
    }
    //if equal

    //display next card
    //startImage.setAttribute("src", card.image);
    
    
    
    
    //console.log(points);
    
    
}

//onclick higher function
buttonLow.addEventListener("click", isLower);

async function isLower(){
    //console.log("curent value: " + value.innerText);
    
    let currentValue = value.innerText;
    let nextValue;
    
    const res = await fetch(

        `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`

    );

    const { cards } = await res.json();
    changeImage(cards[0])
    nextValue = convertDressedCards(cards[0])
    //nextValue = cards[0].value;
    
    //console.log("Next value: " + nextValue);

    let result = compareCards(currentValue, nextValue);
    console.log(result);
    
    if(result === true){
        value.innerText = nextValue;
        success.innerText = "False";
        
    }else if(result === false){
        value.innerText = nextValue;
        success.innerText = "True";
        points = points + 1;
        showPoints.innerText = points;
        
    }else if(result === "Equal"){
        value.innerText = nextValue;
        success.innerText = "Equal! No points..."
    }

    //display next card
    //startImage.setAttribute("src", cards[0].image);
    console.log(points);
    
    
}

compareCards = (currentValue, nextValue) => {
    console.log("curent value: " + currentValue);
    console.log("next value: " + nextValue);


    
    if(parseInt(currentValue) < parseInt(nextValue)){
        return true;
    }else if(parseInt(currentValue) > parseInt(nextValue)){
        return false;
    }else{
        return "Equal";
    }

}

convertDressedCards = (card)=>{

    switch(card.value){
        case "JACK":
             return 11;
             break;
        case "QUEEN":
            return 12;
            break;
            
        case "KING":
            return 13;
            break;
            
        case "ACE":
            return 14;
            break;
        default:
            return card.value;        
    }
} 

changeImage = (card) => {

    if(!nextImage.hasAttribute("src")){
        console.log("next card do not have an image yet")
        nextImage.setAttribute("src", card.image)
        displayTitle.innerText = "New Card";
    }else{
        console.log("next card do have image")
        console.log(nextImage.src)
        startImage.setAttribute("src", nextImage.src)
        nextImage.setAttribute("src", card.image)
        displayOldTitle.innerText = "Old Card";
        
    }

}



getData();



    
    


