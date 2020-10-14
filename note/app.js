var firebaseConfig={
apiKey:"AIzaSyAIBhvdbyFlTqZLgtNA7uTWHymjHOpzyMU",
authDomain:"rexarvind.firebaseapp.com",
databaseURL:"https://rexarvind.firebaseio.com",
projectId:"rexarvind",
storageBucket:"rexarvind.appspot.com",
messagingSenderId:"685927662051",
appId:"1:685927662051:web:252add00d42a851bc320d6"}
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();

/* shortcut for getting dom elements */
const _=id=>document.getElementById(id);
const qsa=el=>document.querySelectorAll(el);

/* storing dom elements */
const guestBox=qsa(".guest");
const userBox=qsa(".user");

/* initialising variables */
const monthNames=["Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let modal=new bootstrap.Modal(_("rexModal"));
var userID="";



/* handle user interface for guest and user */
auth.onAuthStateChanged(user=>{
if (user){
userID=user.uid;
guestBox.forEach(el=>{
el.classList.add("d-none")
el.classList.remove("d-block") })
userBox.forEach(el=>{
el.classList.add("d-block")
el.classList.remove("d-none") })
} else {
guestBox.forEach(el=>{
el.classList.add("d-block")
el.classList.remove("d-none") })
userBox.forEach(el=>{
el.classList.add("d-none")
el.classList.remove("d-block") })
}
})


/* Create Account */
_("signupForm").addEventListener("submit", (e)=>{e.preventDefault();
const email=_("signupForm").signupEmail.value;
const pwd=_("signupForm").signupPwd.value;
auth.createUserWithEmailAndPassword(email, pwd)
 .then((cred)=>{
 sendVerificationEmail();
 _("signupForm").reset();
 }) .catch(error=>alert(error.message))
});

/* Send verification email */
const sendVerificationEmail=()=>{
auth.currentUser.sendEmailVerification()
.then(()=>console.log("Email sent"))
.catch(error=>alert(error)) }


/* reset password */
if(_("resetPwdForm")){
_("resetPwdForm").addEventListener("submit", (e) => { e.preventDefault();
const email=_("resetPwdForm").resetPwdEmail.value;
auth.sendPasswordResetEmail(email)
 .then(() =>{ alert("Password Reset Email Sent !");
}) .catch(error => { alert(error); })
})
}




/* utility functions */
let d= new Date();
let year= d.getFullYear();
var month= d.getMonth();
var date= d.getDate();
var hours= d.getHours();
var minutes= d.getMinutes();
var ampm= hours >= 12? 'pm' : 'am';
hours= hours % 12;
hours= hours ? hours : 12;
minutes= minutes <10 ? '0'+minutes : minutes;

let timestamp=`${date} ${monthNames[month]} ${year}, ${hours}:${minutes} ${ampm}`;

_("copyYear").innerText=timestamp;


const numberWithCommas=x=>x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const countWords=s=>{
s = s.replace(/(^\s*)|(\s*$)/gi,"");
s = s.replace(/[ ]{2,}/gi," ");
s = s.replace(/\n /,"\n");
return s.split(' ').filter(str=>str!="").length}






const resetPwdModal=()=>{
_("rexModalBody").innerHTML=`
<form id="resetPwdForm" class="m-3">
<label for="resetPwdEmail" class="form-label">Email address</label>
<input type="email" class="form-control" id="resetPwdEmail">
<button type="submit" class="btn btn-dark btn-block">Send Password Reset Email</button>
</form>`;
modal.toggle()}
















const countChars=(el)=>{
let words=countWords(el.value);
_("nyResChars").innerText=el.value.length+", words: "+words}

const nyShare=(el)=>{
let url=_("nyShareMsg").value;
url=encodeURIComponent(url);
el.href="https://api.whatsapp.com/send?&text="+url;}







const imgOpen=el=>{
_("rexModalBody").innerHTML=`
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="${el.src}" class="lazyload img-fluid" alt="el.alt">
<p class="text-center p-2 mb-0">${el.alt}</p>`;
modal.toggle()}





_("addNoteForm").addEventListener("submit", (e) => {
e.preventDefault();
let api = auth.currentUser.uid;
let priority = 1;
let title = _('addNoteTitle').value;
let content = _('addNoteContent').value;
fetch('http://rexarvind.000webhostapp.com/api/notes/post', {
  method:'POST',
  headers:{
    'Accept': 'application/json, text/plain',
    'Content-type':'application/json'
  },
  body:JSON.stringify({
    uid:api,
    priority:priority,
    date:timestamp,
    title:title,
    content:content})
})
.then(res=>res.json())
.then(data=>alert(data))
.catch(err=>alert(err))
})






const updateViews=()=>{
fetch("https://api.countapi.xyz/update/rexarvind/home/?amount=1").then(res=>res.json())
.then(res=>{_("pageViews").innerText=numberWithCommas(res.value)
})
.catch(err=>_("pageViews").innerText=err)}
updateViews();