const _=(id)=>document.getElementById(id)

function numberWithCommas(x){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

const projects=_("projects")

fetch("https://rexarvind.github.io/lib/projects.json").then(res=>res.json())
.then(res=>{
res.forEach(data=>{
/*
projects.innerHTML+=`
<div class="col-sm-6 col-md-4">
<div class="card border-secondary shadow">
<img src="img/dummy/hd720.svg" data-src="projects/${data.img}" class="lazyload card-img-top" alt="${data.text}" onclick="imgOpen(this)">
<div class="card-footer p-1 border-secondary">
<a href="${data.link}" target="_blank" rel="noopener noreferrer" class="btn btn-dark btn-block btn-sm shadow-none font-weight-bold text-truncate bg-gradient">${data.text}&#8599;</a></div>

</div>
</div>
`

*/
})


})
.catch(err=>projects.innerHTML=err)

const imgOpen=el=>{
let modal=new bootstrap.Modal(_("rexModal"));
_("rexModalBody").innerHTML=`
<img src="img/dummy/hd720.svg" data-src="${el.src}" class="lazyload img-fluid" alt="el.alt">
<p class="text-center p-2 mb-0">${el.alt}</p>`;
modal.toggle()}

function updateViews(){
fetch('https://api.countapi.xyz/update/rexarvind/home/?amount=1').then(res=>res.json())
.then(res=>{_("pageViews").innerText=numberWithCommas(res.value)
})}
updateViews();

_("copyYear").innerText=new Date().getFullYear();

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
  .then(function(){console.log('SW Registered')})
}

let deferredPrompt;
const liteApp = _("liteApp");

window.addEventListener('beforeinstallprompt', (e)=>{
e.preventDefault();
deferredPrompt=e;
liteApp.classList.remove("d-none");
liteApp.addEventListener('click', (e)=>{
  liteApp.classList.add("d-none")
  deferredPrompt.prompt()
  deferredPrompt.userChoice.then((choiceResult) =>{  if (choiceResult.outcome === 'accepted'){
    console.log('User accepted the A2HS prompt');
    } else {
    console.log('User dismissed the A2HS prompt');
  } deferredPrompt = null
}) }) })