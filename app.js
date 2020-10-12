const _=(id)=>document.getElementById(id)

function numberWithCommas(x){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}


const openProjects=()=>{
let modal=new bootstrap.Modal(_("rexModal"));
_("rexModalBody").innerHTML=`<div class="text-center my-5"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
modal.toggle();
fetch("https://rexarvind.github.io/lib/projects.json").then(res=>res.json())
.then(res=>{
_("rexModalBody").innerHTML="";
res.forEach((data)=>{
_("rexModalBody").innerHTML+=`
<div class="card m-3 border-dark shadow">
<img data-src="projects/${data.img}" class="lazyload card-img-top" alt="${data.text}">
<div class="card-body p-2 position-relative">
<a href="${data.link}" target="_blank" rel="noopener noreferer" class="btn btn-dark btn-sm position-absolute top-0 translate-middle border border-secondary" style="left:90%">Live</a>
<p class="card-text pt-2">${data.text}</p>
</div></div>`})
})
.catch(err=>{_("rexModalBody").innerHTML=`<p class="text-center my-4">${err}</p>`})
}



const imgOpen=el=>{
let modal=new bootstrap.Modal(_("rexModal"));
_("rexModalBody").innerHTML=`
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="${el.src}" class="lazyload img-fluid" alt="el.alt">
<p class="text-center p-2 mb-0">${el.alt}</p>`;
modal.toggle()}

function updateViews(){
fetch('https://api.countapi.xyz/update/rexarvind/home/?amount=1').then(res=>res.json())
.then(res=>{_("pageViews").innerText=numberWithCommas(res.value)
})}
updateViews();

const date=new Date();
_("copyYear").innerText=date.getFullYear();

if ('serviceWorker' in navigator){
  navigator.serviceWorker
  .register('/sw.js')
  .then(function(){
    console.log('Service Worker Registered')
  })
}

let deferredPrompt;
const liteApp = _("liteApp");

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  liteApp.classList.remove("d-none");

  liteApp.addEventListener('click', (e) => {
    liteApp.classList.add("d-none");
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then( (choiceResult) =>{
    if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
    } else {
    console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
    });
  });
});