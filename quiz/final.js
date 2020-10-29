/* maximum characters of name on certificate */
const MAX_NAME=28

/* passing percentage for certificate.
MAKE SURE TO UPDATE THIS ON SERVER ALSO */
const PASS_SCORE=50

const ROOT_URL="https://rex-arvind.000webhostapp.com";
const GET_SCORE=ROOT_URL+"/api/quiz-2/get-score/";


/* shortcut for getting elements by id */
const _=id=>document.getElementById(id)

/* get DOM elements */
const totalScore=_("totalScore")
const totalPercentage=_("totalPercentage")
const quizKey=_("quizKey")
const certificateForm=_("certificateForm")
const certificateName=_("certificateName")
const certificateBtn=_("certificateBtn")
const nameCounter=_("nameCounter")

/* define variables if any */


/* use custom alert by alertBS(x) */
const alertBSModal=_("alertBSModal")
const alertBSBody=_("alertBSBody")
const alertBS=text=>{
  const aBS=new bootstrap.Modal(alertBSModal)
  alertBSBody.innerHTML=text
  aBS.hide()
  aBS.toggle()
}


/* trim extra letters */
const shave=(str, n)=>
(str.length>n) ? str.substr(0, n-2)+'..' : str;


/* update name character counter */
nameCounter.innerText=MAX_NAME


/* get user id for fetching score */
uid=sessionStorage.getItem("uid");


/* store user id in form for certificate request */
quizKey.value=uid


/* get score from database */
fetch(GET_SCORE+uid).then(res=>res.json())
.then(res=>{
  if(res.status==true){
    data=res.data
    totalScore.innerText=data.score
    totalPercentage.innerText=data.percentage
    /* put name in certificate form by default */
    certificateName.value=shave(data.name,MAX_NAME)
    /* show certificate form if percent is high */
    if(data.percentage >= PASS_SCORE){
    certificateForm.classList.remove("d-none")
    }
  } else {
    alertBS(res.message)
  }
})
.catch(err=>alertBS("Can not load Scores.<br>"+err))


/* check length of name for certificate */
certificateName.addEventListener("input",()=>{
  totalLength=certificateName.value.length
  nameCounter.innerText=MAX_NAME-totalLength
  counterBox=nameCounter.parentElement
  if(totalLength>MAX_NAME){
    counterBox.classList.add("text-danger")
    certificateBtn.disabled="true"
  } else if(totalLength<=MAX_NAME){
    counterBox.classList.remove("text-danger")
    certificateBtn.disabled=""
  }
})


/* update copyright year */
const date=new Date();
_("copyYear").innerText=date.getFullYear()