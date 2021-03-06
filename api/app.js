const _=(id)=>document.getElementById(id)

const numberWithCommas=(x)=>x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


function countWords(s){
s = s.replace(/(^\s*)|(\s*$)/gi,"");
s = s.replace(/[ ]{2,}/gi," ");
s = s.replace(/\n /,"\n");
return s.split(' ').filter(str=>str!="").length}



/* Password Generator and Copy Password */
function getPwd(){
let chars= "01234567890abcdefghijklmnopqrstuvwxyz@#_&*:;!?(){}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const pwdLength=16;
let pwd="";
for(let i=0; i<pwdLength; i++){
var randomNumber=Math.floor(Math.random() * chars.length);
pwd += chars.substring(randomNumber, randomNumber+1)
}
_("pwdInput").value = pwd;
_("pwdCopyBtn").innerText = "Click to copy password"
}
getPwd();

function copyPwd(){
var copyPwdText = _("pwdInput"); copyPwdText.select(); copyPwdText.setSelectionRange(0,9999); document.execCommand("copy");
_("pwdCopyBtn").innerText = "Password Copied" } 




/* Color Generator and Copy Color */
function getHexNumber(){
return Math.floor(Math.random() * hex.length)}

const hex=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
const colorBox=_("colorBox");
const colorCode=_("colorCode");

function getColor(){
let hexColor="#";
for (let i = 0; i < 6; i++){
hexColor += hex[getHexNumber()]
}
colorCode.value=hexColor; colorBox.style.backgroundColor = hexColor;
_("copyColorBtn").innerText = "Copy color code"
}
getColor(); 


function copyColor(){
colorCode.select();
colorCode.setSelectionRange(0,9999); document.execCommand("copy");
_("copyColorBtn").innerText="Color Copied"} 















/* New Year Countdown */
let date=new Date();
let year=(date.getFullYear())+1;
_("copyYear").innerText=year-1;

function newYear(){
let countDate=new Date("Jan 1, "+year+" 00:00:00").getTime();
let now=new Date().getTime();
gap=countDate - now;
let second=1000;
let minute = second * 60;
let hour = minute * 60;
let day = hour * 24;
let d = Math.floor(gap / (day));
let h = Math.floor((gap % (day)) / (hour));
let m = Math.floor((gap % (hour)) / (minute));
let s = Math.floor((gap % (minute)) / (second));
_("nyDays").innerText=d;
_("nyHours").innerText=h;
_("nyMinutes").innerText=m;
_("nySeconds").innerText=s;
}
setInterval(()=>newYear(), 1000)


const countChars=(el)=>{
let words=countWords(el.value);
_("nyResChars").innerText=el.value.length+", words: "+words}

const nyShare=(el)=>{
let url=_("nyShareMsg").value;
url=encodeURIComponent(url);
el.href="https://api.whatsapp.com/send?&text="+url;}









const getNews=()=>{
fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=nrmwhOcdEFD5azwInGxRk8n1O4SvWF8B")
  .then(res=>res.json())
  .then(res=>showNews(res.results))
  .catch(err=>console.log(err))
}
getNews();

const showNews=(data)=>{
let output="";
data.forEach((data, index)=>{
if(data.byline==""){data.byline="Not Available"}
output+=`<div class="col-sm-6 col-md-4">
<div class="card h-100 border-dark shadow-sm" onclick="openNews(this)">
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="${data.multimedia[0].url}" class="lazyload card-img-top" alt="${data.title}" onclick="imgOpen(this)">
<div class="card-body p-2">
<h5 class="card-title">${data.title}</h5>
<a href="${data.url}" target="_blank" rel="noopener noreferrer" class="text-decoration-none link-dark">
<p class="h6 font-weight-normal mb-0">${data.abstract}..</p></a>
</div>
<p class="h6 font-weight-normal text-muted p-2 mb-0 border-top bg-light rounded-bottom">${data.byline}</p>
</div>
</div>`
})
_("newsBox").innerHTML+=output;
}








function getQuote(){
_("quoteBox").innerHTML=`<div class="text-center my-4"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span> </div></div>`;
fetch("https://favqs.com/api/qotd").then(res=>res.json())
.then(res=>{
_("quoteBox").innerHTML=`${res.quote.body}<br/><small class="text-muted">ID ${res.quote.id}, &nbsp; By ${res.quote.author}</small>`
})
.catch(err=>{_("quoteBox").innerText=err})
}
getQuote();


function getAdvice(){
_("adviceSlip").innerHTML=`<div class="text-center my-4"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span> </div></div>`;
fetch("https://api.adviceslip.com/advice").then(res=>res.json())
.then(res=>{
_("adviceSlip").innerHTML=res.slip.advice;
_("adviceId").innerText=`ID ${res.slip.id}`
})
.catch(err=>{_("adviceSlip").innerText=err})
}
getAdvice();

const shareAdvice=()=>{
const waURL="https://api.whatsapp.com/send?&text=";
shareUrl = _("adviceSlip").innerText;
_("shareAdviceBtn").href=waURL + encodeURIComponent(shareUrl)}

async function getJoke(){
_("jokeBox").innerHTML=`<div class="text-center my-4"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span> </div></div>`;
const res=await fetch("https://icanhazdadjoke.com/",{
  headers:{"Accept":"application/json"}
})
const joke=await res.json();
_("jokeBox").innerHTML=joke.joke;
}
getJoke();



const imgOpen=el=>{
let modal=new bootstrap.Modal(_("rexModal"));
_("rexModalBody").innerHTML=`
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="${el.src}" class="lazyload img-fluid" alt="el.alt">
<p class="text-center p-2 mb-0">${el.alt}</p>`;
modal.toggle()}

function updateViews(){
fetch("https://api.countapi.xyz/update/rexarvind/home/?amount=1").then(res=>res.json())
.then(res=>{_("pageViews").innerText=numberWithCommas(res.value)
})
.catch(err=>_("pageViews").innerText=err)}
updateViews();




