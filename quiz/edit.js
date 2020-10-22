/* shortcut for getting elements by id */
const _=id=>document.getElementById(id)

/* get DOM elements */
const guestCard=_("guestCard")
const loginBtn=_("loginBtn")
const logoutBtn=_("logoutBtn")
const userCard=_("userCard")
const quesID=_("quesID")
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
let availableQues=[]

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
    logoutBtn.classList.remove("d-none")
    getAllQues()
  } else {
    guestCard.classList.remove("d-none")
    userCard.classList.add("d-none")
    logoutBtn.classList.add("d-none")
  }
})


/* login with Google Firebase Auth */
loginBtn.addEventListener("click", ()=>{
  loginBtn.disabled="true"
  const googleProvider=new firebase.auth.GoogleAuthProvider()
  auth.signInWithRedirect(googleProvider)
  .then(()=>{
    guestCard.classList.add("d-none")
    userCard.classList.remove("d-none")
    loginBtn.disabled=""
  }).catch(error=>{
    alertBS(error)
    loginBtn.disabled=""
  })
})


/* logout */
logoutBtn.addEventListener("click", ()=>{
let user=firebase.auth().currentUser
auth.signOut()
.then(()=>alertBS("Logged out."))
.catch(error=>alertBS(error))
})


/* trim extra letters */
const shave=(str, n)=>
(str.length>n) ? str.substr(0, n-2)+'..' : str;


const deleteQues=id=>{
delPath=DELETE_QUES+".php?uid="+userID+"&id="+id
  fetch(delPath).then(res=>res.json())
  .then(res=>alertBS(res.message))
  .catch(err=>alertBS(err))
}


const editQues=id=>{
  availableQues.forEach(data=>{
    if(data.id == id){
      quesID.value=data.id
      ques.value=data.ques
      ans1.value=data.ans1
      ans2.value=data.ans2
      ans3.value=data.ans3
      ans4.value=data.ans4
      correct.value=data.correct
      desc.value=data.desc
    }
  })
}

const showQuesDesc=id=>{
  let tempDesc
  availableQues.forEach(data=>{
    if(data.id == id){
      tempDesc=`<span style="white-space:pre-wrap">${data.desc}</span>`
    }
  })
  alertBS(tempDesc)
}



const showQues=data=>{
  availableQues=[...data]
  let output=""
  data.forEach((data)=>{
    output+=`<div class="col-sm-6 col-md-4">
    <div class="card h-100">
    <span class="card-header h6">${data.ques}</span><div class="card-body">1. ${data.ans1}<br>2. ${data.ans2}<br>3. ${data.ans3}<br>4. ${data.ans4}<br>Correct Ans: ${data.correct}
    </div><div class="card-footer d-flex justify-content-between">
    <button onclick="deleteQues('${data.id}')" class="btn btn-danger btn-sm flex-fill mr-2">Delete</button>
    <button onclick="editQues('${data.id}')" class="btn btn-success btn-sm flex-fill">Edit</button>
    <button onclick="showQuesDesc('${data.id}')" class="btn btn-dark btn-sm flex-fill ml-2">Description</button>
    </div>
    </div>
    </div>`
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
  xhr.open("POST", LIMIT_QUES, true)
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
fetch(COUNT_QUES).then(res=>res.json())
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
  fd.append("id", quesID.value)
  fd.append("ques", shave(ques.value,250))
  fd.append("ans1", shave(ans1.value,250))
  fd.append("ans2", shave(ans2.value,250))
  fd.append("ans3", shave(ans3.value,250))
  fd.append("ans4", shave(ans4.value,250))
  fd.append("correct", shave(correct.value,1))
  fd.append("desc", shave(desc.value,250))
  var xhr=new XMLHttpRequest()
  xhr.open("POST", ADD_QUES, true)
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200){
      res=JSON.parse(xhr.responseText)
      alertBS(res.message)
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