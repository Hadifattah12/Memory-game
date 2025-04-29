

let counterdisplay = document.querySelector(".counter");
let duration = 60000;
let counter; 

let nbtry = document.querySelector(".nbtry");
let message = document.querySelector(".message");
let block = document.querySelector(".game-side")
let allcards = document.querySelectorAll(".game-block");
let bestscore = document.querySelector(".score");
let header = document.querySelector(".header");

bestscore.textContent = `best score till now is win after ${localStorage.getItem("win")} tries can you win in less tries? lets try`;

window.onload = () => {
    prompt("are you ready");
  counter = setInterval(() => {
    duration -= 1000;
    counterdisplay.innerHTML = `you must finish the game before time runs out: ${duration / 1000}`;
    if (duration === 0) {
        block.classList.add("no-clicking");
        message.textContent = `you lost after ${parseInt(nbtry.textContent)} tries !` ;
        message.style.backgroundColor = "#2196F3";
        document.body.appendChild(message);
      clearInterval(counter);
      if (duration === 0) 
        block.classList.add("no-clicking");
    }
  }, 1000);
};

allcards = Array.from(allcards);

let orderRange = Array.from(Array(allcards.length).keys());

let shuflledArray = shuflleArray(orderRange);

allcards.forEach((element,idx) => {
    element.style.order = shuflledArray[idx++];
    element.addEventListener("click",() => {
        element.classList.add("is-flipped");
        let cardflipped = allcards.filter(element => element.classList.contains("is-flipped"));
        if(cardflipped.length === 2)
        {
            block.classList.add("no-clicking");
            checkCard(cardflipped[0],cardflipped[1]);
        }
    })
});

let correct = 0;

function checkCard(card1,card2)
{
    if(card1.getAttribute("data-technology") === card2.getAttribute("data-technology"))
    {
        correct++;
        setTimeout(() => {
            card1.classList.remove("is-flipped");
            card2.classList.remove("is-flipped");
            card1.classList.add("has-match");
            card2.classList.add("has-match");
            block.classList.remove("no-clicking");
        },1000)
        if(correct === 10)
        {
             let win = parseInt(nbtry.textContent);
            if(localStorage.getItem("win") > win)
                localStorage.setItem("win",parseInt(nbtry.textContent));
            message.textContent = `you win after ${parseInt(nbtry.textContent)} tries !` ;
            localStorage.setItem("win",parseInt(nbtry.textContent));
            message.style.backgroundColor = "#2196F3";
            document.body.appendChild(message);
        }
    }else{
        nbtry.innerHTML = parseInt(nbtry.innerHTML) + 1;
        setTimeout(() => {
            card1.classList.remove("is-flipped");
            card2.classList.remove("is-flipped");
            block.classList.remove("no-clicking");
        },1000)
    }

}

function shuflleArray(array)
{
    let current = array.length;
    let temp;
    let random;
    while(current-- > 0)
    {
        random = Math.floor(Math.random() * current);

        temp = array[random];
        array[random] = array[current];
        array[current] = temp;
        current--;
    }
    return array;
}