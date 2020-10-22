/* shortcut for getting elements by id */
const _=id=>document.getElementById(id)

/* get DOM elements */
const guestCard=_("guestCard")
const loginBtn=_("loginBtn")
const userCard=_("userCard")
const ques=_("ques")
const quesCounter=_("quesCounter")
const ans1=_("ans1")
const ans2=_("ans2")
const ans3=_("ans3")
const ans4=_("ans4")
const correct=_("correct")
const desc=_("desc")
const submitBtn=_("submitBtn")
const pagination_controls=_("paginationBtns")
const results_box=_("results_box")

/* define variables */
let userID
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


/* check change in user authentication */
auth.onAuthStateChanged(user=>{
  if(user){
    userID=user.uid
    guestCard.classList.add("d-none")
    userCard.classList.remove("d-none")
    getAllQues()
  } else {
  }
})


/* login with Google Firebase Auth */
loginBtn.addEventListener("click", ()=>{
  const googleProvider=new firebase.auth.GoogleAuthProvider()
  auth.signInWithRedirect(googleProvider)
  .then(()=>{
    guestCard.classList.add("d-none")
    userCard.classList.remove("d-none")
  }).catch(error=>alertBS(error))
})




/* trim extra letters */
const shave=(str, n)=>
(str.length>n) ? str.substr(0, n-2)+'..' : str;


const showQues=data=>{
  let output=""
  data.forEach((data, index)=>{
    output+=`<div class="card">
${index}<br>${data.ques}
</div>
  `
  })
  results_box.innerHTML=output
}


const checkQuesRes=res=>{
  if(res.status==true){
    showQues(res.data)
  } else {
    alertBS(res.message)
  }
}


/* get questions and show pagination buttons */
function request_page(pn){
  let last=Math.ceil(totalRows/rpp)
  if(last < 1){last = 1}
  results_box.innerHTML='<div class="text-center mb-5"><div class="spinner-border text-light my-5" role="status"></div></div>';

  let fd=new FormData()
  fd.append("uid", userID)
  fd.append("rpp", rpp)
  fd.append("last", last)
  fd.append("pn", pn)

  var xhr=new XMLHttpRequest()
  xhr.open("POST", LIMIT_URL, true)
  xhr.onreadystatechange=()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
        var xhrRes=JSON.parse(xhr.responseText)
        checkQuesRes(xhrRes)
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

const getAllQues=()=>{
fetch(COUNT_URL).then(res=>res.json())
.then(res=>{
  if(res.status==true){
    totalRows=res.data[0]
    request_page(1);
  } else {
    alertBS(res.message)
  }
  request_page(1);
})
.catch(err=>alertBS(err))
}


submitBtn.addEventListener("click", ()=>{
  let fd=new FormData()
  fd.append("uid", userID)
  fd.append("ques", shave(ques.value,250))
  fd.append("ans1", shave(ans1.value,250))
  fd.append("ans2", shave(ans2.value,250))
  fd.append("ans3", shave(ans3.value,250))
  fd.append("ans4", shave(ans4.value,250))
  fd.append("correct", shave(correct.value,1))
  fd.append("desc", shave(desc.value,250))
  var xhr=new XMLHttpRequest()
  xhr.open("POST", ADD_URL, true)
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200){
      resStatus=xhr.responseText
      alertBS(resStatus)
    }
  }
  xhr.onerror = function(){
    alertBS("Request Error...")
  }
  xhr.send(fd)
})

/* update copyright year */
const date=new Date();
_("copyYear").innerText=date.getFullYear()