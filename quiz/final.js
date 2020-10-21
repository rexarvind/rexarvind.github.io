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
uid=sessionStorage.getItem("key");
sessionStorage.clear()


/* store user id in form for certificate request */
quizKey.value=uid


/* get score from database */
fetch(GET_SCORE+uid).then(res=>res.json())
.then(res=>{
  if(res.status==true){
    data=res.data
    totalScore.innerText=data[0].score
    totalPercentage.innerText=data[0].percentage
    /* put name in certificate form by default */
    certificateName.value=shave(data[0].name,MAX_NAME)
    /* show certificate form if percent is high */
    if(data[0].percentage >= PASS_SCORE){
    certificateForm.classList.remove("d-none")
    }
  } else {
    alertBS(res.message)
  }
})
.catch(err=>alertBS(err))


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