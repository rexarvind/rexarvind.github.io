function _(id){
return document.getElementById(id)}

function numberWithCommas(x){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

function imgOpen(el){
let modal=new bootstrap.Modal(_("imgModal"));
_("imgModalSrc").src=el.src;
_("imgModalAlt").innerText=el.alt;
modal.toggle()}

function updateViews(){
fetch('https://api.countapi.xyz/update/rexarvind/home/?amount=1').then(res=>res.json())
.then(res=>{_("pageViews").innerText=numberWithCommas(res.value)
})}
updateViews();

const date=new Date();
const year=date.getFullYear();
_("copyYear").innerText=year;

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