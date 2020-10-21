/* shortcut for getting elements by id */
const _=id=>document.getElementById(id)

/* get DOM elements */
const playBtn=_("playBtn")
const pagination_controls=_("paginationBtns")
const results_box=_("results_box")

/* define variables */
let userID, userName, userEmail, userPhoto;
let resStatus, totalRows, pn
let rpp = 1;

/* use custom alert by alertBS(x) */
const alertBSModal=_("alertBSModal")
const alertBSBody=_("alertBSBody")
const alertBS=text=>{
  const aBS=new bootstrap.Modal(alertBSModal)
  alertBSBody.innerHTML=text
  aBS.hide()
  aBS.toggle()
}


/* enable button after authentication check */
playBtn.disabled="true"


/* check change in user authentication */
auth.onAuthStateChanged(user=>{
  if(user){
    userID=user.uid
    userName=user.displayName
    userEmail=user.email
    userPhoto=user.photoURL
    playBtn.addEventListener("click", startQuiz)
    playBtn.disabled=""
    playBtn.innerText="Start Quiz"
  } else {
    playBtn.addEventListener("click", loginUser)
    playBtn.disabled=""
    playBtn.innerText="Login to Start Quiz"
  }
})


/* login with Google Firebase Auth */
const loginUser=()=>{
  const googleProvider=new firebase.auth.GoogleAuthProvider()
  auth.signInWithRedirect(googleProvider)
  .then(()=>{
    playBtn.addEventListener("click", startQuiz)
    playBtn.innerText="Start Game"
  }).catch(error=>alertBS(error))
}


/* trim extra letters */
const shave=(str, n)=>
(str.length>n) ? str.substr(0, n-2)+'..' : str;


/* check API response status */
const checkStatus=resStatus=>{
  if(resStatus.status==true){
    sessionStorage.setItem("key", userID)
    document.location.href="quiz.html"
  } else if(resStatus.status==false){
    playBtn.disabled=""
    playBtn.innerText="Start Game"
    alertBS(resStatus.message)
  }
}


/* save user data on database */
const startQuiz=()=>{
  playBtn.disabled="true"
  playBtn.innerText="Loading..."
  let fd=new FormData()
  fd.append("uid", userID)
  fd.append("name", shave(userName,250))
  fd.append("email", shave(userEmail,250))
  fd.append("photoURL", shave(userPhoto,250))
  var xhr=new XMLHttpRequest()
  xhr.open("POST", ADD_USER, true)
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200){
      resStatus=JSON.parse(xhr.responseText)
      playBtn.disabled="true"
      playBtn.innerText="Redirecting..."
      checkStatus(resStatus)
    }
  }
  xhr.onerror = function(){
    playBtn.disabled=""
    playBtn.innerText="Retry"
    alertBS("Ajax Request Error...")
  }
  xhr.send(fd)
}




/* check high score response from API */
const checkScoreStatus=res=>{
  if(res.status==true){
    let output=""
    data=res.data
    data.forEach(data=>{
    output=`<div class="col-sm-6 col-md-4">
    <div class="card mb-2"><span class="card-header h5 text-truncate">${data.name}</span>
    <div class="card-body">
    <div class="row gx-1 gy-0">
    <p class="col-8">Percentage: ${data.percentage} &#37; <br>
    Score: ${data.score} out of ${data.maxScore}<br>Answered: ${data.ques} out of ${data.maxQues}</p>
<img src="${data.photoURL}" class="col-4">
    </div>
    </div>
    </div></div>`
    })
    results_box.innerHTML=output
  } else {
    alertBS(res.message)
  }
}



/* get scores and show pagination buttons */
function request_page(pn){
  let last=Math.ceil(totalRows/rpp)
  if(last < 1){last = 1}
  results_box.innerHTML='<div class="text-center mb-5"><div class="spinner-border text-light my-5" role="status"></div></div>';
  let fd=new FormData()
  fd.append("rpp", rpp)
  fd.append("last", last)
  fd.append("pn", pn)

  var xhr=new XMLHttpRequest()
  xhr.open("POST", LIMIT_HIGH_SCORE, true)
  xhr.onreadystatechange=()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
        var xhrRes=JSON.parse(xhr.responseText)
        checkScoreStatus(xhrRes)
    }
  }
  xhr.onerror = function(){
    alertBS("Request Error...")
  }
  xhr.send(fd)

  var paginationCtrls = "";
  if(last != 1){
    if(pn > 1){
      paginationCtrls += '<li class="page-item"><span onclick="request_page('+(pn-1)+')" class="page-link shadow-none">&lt;</span></li>';
      for(let i = pn-3; i < pn; i++){
        if(i > 0){
          paginationCtrls += '<li class="page-item"><span onclick="request_page('+i+')" class="page-link shadow-none">'+i+'</span></li>';
        }
      }
    }
    paginationCtrls += '<li class="page-item active"><span class="page-link shadow-none">'+pn+'</span></li>';

    for(let j = pn+1; j <= last; j++){
      paginationCtrls += '<li class="page-item"><span onclick="request_page('+j+')" class="page-link shadow-none">'+j+'</span></li>';
      if(j >= pn+3){
        break;
      }
    }
    if(pn != last){
      paginationCtrls += '<li class="page-item"><span onclick="request_page('+(pn+1)+')" class="page-link shadow-none">&gt;</span></li>';
    }
  }
  pagination_controls.innerHTML=paginationCtrls
}


/* count total users for displaying scores */
fetch(COUNT_HIGH_SCORE)
.then(res=>res.json())
.then(res=>{
  if(res.status==true){
    totalRows=res.data[0]
    request_page(1);
  } else {
    alertBS(res.message)
  }
})
.catch(err=>alertBS(err))


/* update copyright year */
const date=new Date();
_("copyYear").innerText=date.getFullYear()