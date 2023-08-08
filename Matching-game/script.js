function on(id) {
  document.getElementById(id).style.display = "block";
}

function off(id) {
  document.getElementById(id).style.display = "none";
}

function initialize()
{
  document.getElementById("overlay").style.display = "block";
  document.getElementById("win").style.display = "none";

  firstClick = document.createElement("img");
  firstClick.src = "images/Question Mark.png";

  secondClick = document.createElement("img");
  secondClick.src = "images/Question Mark.png";
  
  array = new Array();
  //var numArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  //shuffle(numArray);
  for (let i = 0; i < 16; i++) 
  {
    if(array[i]==null)  
      array[i] = new Image();
  }
    array[0].src = "images/Bird.png";
    array[1].src = "images/Bird.png";
    array[2].src = "images/Bunny.jpg";
    array[3].src = "images/Bunny.jpg";
    array[4].src = "images/Cat.jpg";
    array[5].src = "images/Cat.jpg";
    array[6].src = "images/Dog.jpg";
    array[7].src = "images/Dog.jpg";
    array[8].src = "images/Ferret.gif";
    array[9].src = "images/Ferret.gif";
    array[10].src = "images/Fish.jpg";
    array[11].src = "images/Fish.jpg";
    array[12].src = "images/Guinea Pig.png";
    array[13].src = "images/Guinea Pig.png";
    array[14].src = "images/Hamster.png";
    array[15].src = "images/Hamster.png";

    shuffle(array);
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) 
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  console.log(array[0].getAttribute("src"));
  console.log(array[1].getAttribute("src"));
  console.log(array[2].getAttribute("src"));
  console.log(array[3].getAttribute("src"));
}
function resetClicks()
{
  firstClick.src = "images/Question Mark.png";
  firstClickValue = "";
  console.log(firstClick.src);
  secondClick.src = "images/Question Mark.png";
  secondClickValue = "";
}
function flip(num)
{
  if(document.getElementById(num).alt != "star" && (firstClick.getAttribute('src') == "images/Question Mark.png" ||secondClick.getAttribute('src')=="images/Question Mark.png"))
  {
    document.getElementById(num).src=array[num-1].src;
    checkAnswer(num);
  }

}
function checkAnswer(num)
{
  /* If first image isnt clicked previously, sets the firstClick's source to the current clicked image */ 
  if(firstClick.getAttribute('src') == "images/Question Mark.png") 
  {
    firstClick.src=array[num-1].src;
    console.log(firstClick.getAttribute('src'));
    firstClickValue = num;
  }
  /* If first image is clicked previously, sets the secondClick's source to the current clicked image */
  else if(secondClick.getAttribute('src')=="images/Question Mark.png")
  {
    secondClick.src=array[num-1].src;
    console.log(secondClick.getAttribute('src'));
    secondClickValue = num;

    /* if the first click and second click images dont match, it flips the cards back over and resets the clicks */
    if(secondClick.getAttribute('src') != firstClick.getAttribute('src'))
    {
      paused = true;
      setTimeout(function() {
        paused=false;
        document.getElementById(firstClickValue).src = "images/Question Mark.png";
        document.getElementById(secondClickValue).src = "images/Question Mark.png";

        resetClicks();},500);
    }

    /* if the first clicked and second clicked images are the same, the program resets the second click until the second click is a different value*/
    else if(document.getElementById(firstClickValue).id == document.getElementById(secondClickValue).id)
    {
      secondClick.src = "images/Question Mark.png";
    }

    /* If clicked images have the same source and aren't the same, both images change to Star.png and are unclickable */
    else
    {
      setTimeout(function(){
        document.getElementById(firstClickValue).alt = "star";
        document.getElementById(firstClickValue).src = "images/Star.png";
        document.getElementById(secondClickValue).alt = "star";
        document.getElementById(secondClickValue).src = "images/Star.png";
        resetClicks();
        winCheck();
      }, 500);
    }
  }
}

/* Checks if all images are Star.png and ends the game, prompting a replay */
function winCheck()
{
  winStatus = false;
  let starCount = 0;
  for(let i=1;i<=16;i++)
  {
    if(document.getElementById(i).getAttribute('src') == "images/Star.png")
    {
      starCount++;
      if(starCount==16)
      {
        winStatus = true;
      }
    }
  }
  if(winStatus == true)
  {
    setTimeout(function(){
      document.getElementById("win").style.display = "block";
    for(let i=1;i<=16;i++)
    {
      document.getElementById(i).alt="Hidden";
      document.getElementById(i).src="images/Question Mark.png";
    }
    }, 1000)
  }
}
