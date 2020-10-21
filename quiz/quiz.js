/* shortcut for getting elements by id */
const _=id=>document.getElementById(id)

/* shortcut for getting multiple elements */
const qsa=x=>document.querySelectorAll(x)

/* get DOM elements */
const quesCard=_("quesCard")
const remainingTime=_("remainingTime")
const remainingQues=_("remainingQues")
const scoreText=_("scoreText")
const nextQuesBtn=_("nextQuesBtn")
const question=_("question")
const answers=qsa(".answer")

/* define variables */
let score=quesCounter=0;
let acceptAns=false;
let availableQues=[];
let userID, quizPath

/* use custom alert by alertBS(x) */
const alertBSModal=_("alertBSModal")
const alertBSBody=_("alertBSBody")
const alertBS=text=>{
  const aBS=new bootstrap.Modal(alertBSModal)
  alertBSBody.innerHTML=text
  aBS.hide()
  aBS.toggle()
}


/* get user id for getting questions */
userID=sessionStorage.getItem("key")
sessionStorage.clear()


/* fetch questions fron database with user id */
quizPath=QUIZAPI+userID
fetch(quizPath).then(res=>res.json())
.then(res=>checkQues(res))
.catch(err=>alertBS(err))


/* check question before starting quiz */
const checkQues=res=>{
  if(res.status==false){
    document.location.href="index.html"
  } else if(res.status==true){
    quesCard.classList.remove("d-none")
    startQuiz(res.data)
  }
}


/* checking if data is stored successfully */
const checkScoreRes=res=>{
  if(res.status==false){
    alertBS(res.message)
    return
  } else if(res.status==true){
    /* sending to final page on perfect request */
    sessionStorage.setItem("key", userID)
    document.location.href="final.html"
  }
}


/* sending all details of quiz to database */
const submitQuizData=score=>{
  let fd=new FormData()
  fd.append("uid", userID)
  fd.append("score", score)
  fd.append("maxQues", MAX_QUES)
  fd.append("correctBonus", CORRECT_BONUS)
  var xhr=new XMLHttpRequest()
  xhr.open("POST", ADD_SCORE, true)
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200){
      resStatus=JSON.parse(xhr.responseText)
      /* checking response from API */
      checkScoreRes(resStatus)
    }
  }
  /* displaying error if any */
  xhr.onerror = function(){
    alertBS("Request Error...")
  }
  /* sending ajax request */
  xhr.send(fd)
}


/* reset score, copy questions and start quiz */
const startQuiz=data=>{
  score=quesCounter=0;
  availableQues=[...data];
  getNewQues();
}


/* shuffle array */
const shuffle=array=>{
  var currentIndex=array.length;
  var tempValue;
  var randomIndex;
  while (0 !== currentIndex){
    randomIndex=Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; 
    tempValue=array[currentIndex];
    array[currentIndex]=array[randomIndex];
    array[randomIndex]=tempValue;
  }
  return array;
} 


/* updating timer on question card */
const quesTimer=()=>{
  currentTime=MAX_TIME
  timer=setInterval(countdown,1000)
  function countdown(){
    remainingTime.innerHTML=currentTime
    currentTime--
    if(currentTime < 0){
      /* disabling click after time is over */
      acceptAns=false
      remainingTime.innerHTML="0"
      currentTime=0
      /* showing right answer if time is over */
      showAns()
    }
  }
}


/* show right answer as user clicked wrong */
const showAns=()=>{
  /* stop timer */
  clearInterval(timer)
  /* get attribute to track from  shuffled ans */
  answers.forEach((answer)=>{
    x=answer.getAttribute("data-ans")
    if(x==currentQues.correct){
      /* add class to show right answer */
      answer.classList.add("bg-success","text-white")
    }
  })
  /* enable button to get new question */
  nextQuesBtn.disabled=""
}


/* show question, it is main function of quiz */
const getNewQues=()=>{
  if(availableQues.length === 0 || quesCounter >= MAX_QUES){
    /* disable btn and save score to database */
    nextQuesBtn.disabled="true"
    nextQuesBtn.innerHTML="Please wait..."
    /* sending score for storing in database */
    submitQuizData(score)
    return
  }

  /* update question counter */
  quesCounter++;
  remainingQues.innerHTML=quesCounter+" of "+MAX_QUES

  /* button disabled to stop skipping question */
  nextQuesBtn.disabled="true"

  /* shuffling questions */
  let quesIndex=Math.floor(Math.random() * availableQues.length);
  currentQues=availableQues[quesIndex]

  /* displaying question */
  question.innerHTML=currentQues.ques;

  /* removing used question */
  availableQues.splice(quesIndex, 1)

  /* converting node list in array for shuffling */
  var  shuffledAns=Array.from(answers)

  /* shuffling answers */
  shuffle(shuffledAns)

  /* displaying all answers */
  shuffledAns.forEach((answer,index)=>{
  /* removing previously applied classes */
  answer.classList.remove("bg-success", "bg-danger", "text-white")
  /* adding attribute to track shuffled answers */
  anum=index+1
  a="ans"+anum
  answer.innerHTML=currentQues[a]
  answer.setAttribute("data-ans", anum);
  })

  /* enabling click on answers */
  acceptAns=true

  /* starting timer */
  quesTimer()
}


/* adding event listener on next question btn */
nextQuesBtn.addEventListener("click",getNewQues)


/* listening for answer by user */
answers.forEach((answer)=>{
  answer.addEventListener("click",()=>{
  /* disabling click, if time is over */
  if (!acceptAns) return;

  /* stop from clicking more than one answer */
  acceptAns=false

  /* get attribute to track from  shuffled ans */
  clickedAns=answer.getAttribute("data-ans")
  if(clickedAns==currentQues.correct){
    /* add class to show right answer */
    answer.classList.add("bg-success","text-white")
    /* increase score */
    incrementScore(CORRECT_BONUS);
  } else if(clickedAns!=currentQues.correct){
    /* add class to show wrong answer */
    answer.classList.add("bg-danger","text-white")
    /* show right answer */
    showAns()
  }
  /* stop timer as answer is displayed */
  clearInterval(timer)
  /* enable button to get new question */
  nextQuesBtn.disabled=""
  })
})


/* increase and show score */
incrementScore=num=>{
  score+=num;
  scoreText.innerText=score;
}


/* update copyright year */
const date=new Date();
_("copyYear").innerText=date.getFullYear()