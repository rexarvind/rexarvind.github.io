const x=function(){let W=!![];return function(C,o){const a=W?function(){if(o){const Z=o['apply'](C,arguments);return o=null,Z;}}:function(){};return W=![],a;};}(),Y=x(this,function(){const W=function(){const C=W['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!C['test'](Y);};return W();});Y();const m=function(){let W=!![];return function(C,o){const a=W?function(){if(o){const Z=o['apply'](C,arguments);return o=null,Z;}}:function(){};return W=![],a;};}();(function(){m(this,function(){const W=new RegExp('function\x20*\x5c(\x20*\x5c)'),C=new RegExp('\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','i'),o=f('init');!W['test'](o+'chain')||!C['test'](o+'input')?o('0'):f();})();}());const c=function(){let W=!![];return function(C,o){const a=W?function(){if(o){const Z=o['apply'](C,arguments);return o=null,Z;}}:function(){};return W=![],a;};}(),i=c(this,function(){let W;try{const a=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');W=a();}catch(Z){W=window;}const C=W['console']=W['console']||{},o=['log','warn','info','error','exception','table','trace'];for(let w=0x0;w<o['length'];w++){const X=c['constructor']['prototype']['bind'](c),I=o[w],z=C[I]||X;X['__proto__']=c['bind'](c),X['toString']=z['toString']['bind'](z),C[I]=X;}});i();var firebaseConfig={'apiKey':'AIzaSyAIBhvdbyFlTqZLgtNA7uTWHymjHOpzyMU','authDomain':'rexarvind.firebaseapp.com','databaseURL':'https://rexarvind.firebaseio.com','projectId':'rexarvind','storageBucket':'rexarvind.appspot.com','messagingSenderId':'685927662051','appId':'1:685927662051:web:252add00d42a851bc320d6','measurementId':'G-CCNCD2RK1F'};firebase['initializeApp'](firebaseConfig);const auth=firebase['auth'](),ROOT_URL='https://rex-arvind.000webhostapp.com',ADD_QUES=ROOT_URL+'/api/quiz/add-ques',DELETE_QUES=ROOT_URL+'/api/quiz/delete-ques',COUNT_QUES=ROOT_URL+'/api/quiz/count-all-ques',LIMIT_QUES=ROOT_URL+'/api/quiz/limit-all-ques';let rpp=0x6;const _=W=>document['getElementById'](W),guestCard=_('guestCard'),loginBtn=_('loginBtn'),logoutBtn=_('logoutBtn'),userCard=_('userCard'),totalQuesAdded=_('totalQuesAdded'),quesID=_('quesID'),ques=_('ques'),ans1=_('ans1'),ans2=_('ans2'),ans3=_('ans3'),ans4=_('ans4'),correct=_('correct'),desc=_('desc'),submitBtn=_('submitBtn'),clearForm=_('clearForm'),pagination_controls=_('paginationBtns'),results_box=_('results_box');let userID,resStatus,totalRows,pn,availableQues=[];const alertBSModal=_('alertBSModal'),alertBSBody=_('alertBSBody'),alertBS=W=>{const C=new bootstrap['Modal'](alertBSModal);alertBSBody['innerHTML']=W,C['hide'](),C['toggle']();};auth['onAuthStateChanged'](W=>{W?(userID=W['uid'],guestCard['classList']['add']('d-none'),userCard['classList']['remove']('d-none'),logoutBtn['classList']['remove']('d-none'),getAllQues()):(guestCard['classList']['remove']('d-none'),userCard['classList']['add']('d-none'),logoutBtn['classList']['add']('d-none'));}),loginBtn['addEventListener']('click',()=>{loginBtn['disabled']='true';const W=new firebase['auth']['GoogleAuthProvider']();auth['signInWithRedirect'](W)['then'](()=>{guestCard['classList']['add']('d-none'),userCard['classList']['remove']('d-none'),loginBtn['disabled']='';})['catch'](C=>{alertBS(C),loginBtn['disabled']='';});}),logoutBtn['addEventListener']('click',()=>{let W=firebase['auth']()['currentUser'];auth['signOut']()['then'](()=>alertBS('Logged\x20out.'))['catch'](C=>alertBS(C));}),clearForm['addEventListener']('click',()=>{quesID['value']='',ques['innerHTML']='',ans1['innerHTML']='',ans2['innerHTML']='',ans3['innerHTML']='',ans4['innerHTML']='',correct['value']='',desc['innerHTML']='';});const deleteQues=W=>{delPath=DELETE_QUES+'.php?uid='+userID+'&id='+W;let C=confirm('Are\x20you\x20sure\x20you\x20want\x20to\x20delete\x20this\x20question!');C==!![]&&fetch(delPath)['then'](o=>o['json']())['then'](o=>alertBS(o['message']))['catch'](o=>alertBS(o));},editQues=W=>{availableQues['forEach'](C=>{C['id']==W&&(quesID['value']=C['id'],ques['innerHTML']=C['ques'],ans1['innerHTML']=C['ans1'],ans2['innerHTML']=C['ans2'],ans3['innerHTML']=C['ans3'],ans4['innerHTML']=C['ans4'],correct['value']=C['correct'],desc['innerHTML']=C['desc']);});},showQuesDesc=W=>{let C;availableQues['forEach'](o=>{o['id']==W&&(C='<span\x20style=\x22white-space:pre-wrap\x22>'+o['desc']+'</span>');}),alertBS(C);},showQues=W=>{availableQues=[...W];let C='';W['forEach'](o=>{C+='<div\x20class=\x22col-sm-6\x20col-md-4\x22>\x0a\x20\x20\x20\x20<div\x20class=\x22card\x20h-100\x22>\x0a\x20\x20\x20\x20<span\x20class=\x22card-header\x20h6\x22\x20style=\x22white-space:pre-wrap\x22>'+o['ques']+'</span><div\x20class=\x22card-body\x22>1.\x20'+o['ans1']+'<br>2.\x20'+o['ans2']+'<br>3.\x20'+o['ans3']+'<br>4.\x20'+o['ans4']+'<br>Correct\x20Ans:\x20'+o['correct']+'\x0a\x20\x20\x20\x20</div><div\x20class=\x22card-footer\x20d-flex\x20justify-content-between\x22>\x0a\x20\x20\x20\x20<button\x20onclick=\x22deleteQues(\x27'+o['id']+'\x27)\x22\x20class=\x22btn\x20btn-danger\x20btn-sm\x20flex-fill\x20mr-2\x22>Delete</button>\x0a\x20\x20\x20\x20<button\x20onclick=\x22editQues(\x27'+o['id']+'\x27)\x22\x20class=\x22btn\x20btn-success\x20btn-sm\x20flex-fill\x22>Edit</button>\x0a\x20\x20\x20\x20<button\x20onclick=\x22showQuesDesc(\x27'+o['id']+'\x27)\x22\x20class=\x22btn\x20btn-dark\x20btn-sm\x20flex-fill\x20ml-2\x22>Description</button>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20</div>';}),results_box['innerHTML']=C;},checkQuesRes=W=>{W['status']==!![]?(showQues(W['data']),fetch(COUNT_QUES)['then'](C=>C['json']())['then'](C=>{C['status']==!![]&&updateQuesAdded(C['data']);})):alertBS(W['message']);};function request_page(W){let C=Math['ceil'](totalRows/rpp);C<0x1&&(C=0x1);results_box['innerHTML']='<div\x20class=\x22text-center\x20mb-5\x22><div\x20class=\x22spinner-border\x20text-light\x20my-5\x22\x20role=\x22status\x22></div></div>';let o=new FormData();o['append']('uid',userID),o['append']('rpp',rpp),o['append']('last',C),o['append']('pn',W);var a=new XMLHttpRequest();a['open']('POST',LIMIT_QUES,!![]),a['onreadystatechange']=()=>{if(a['readyState']==0x4&&a['status']==0xc8){var w=JSON['parse'](a['responseText']);checkQuesRes(w);}},a['onerror']=function(){alertBS('Request\x20Error...');},a['send'](o);var Z='';if(C!=0x1){if(W>0x1){Z+='<li\x20class=\x22page-item\x22><span\x20onclick=\x22request_page('+(W-0x1)+')\x22\x20class=\x22page-link\x20shadow-none\x22>&lt;</span></li>';for(let w=W-0x3;w<W;w++){w>0x0&&(Z+='<li\x20class=\x22page-item\x22><span\x20onclick=\x22request_page('+w+')\x22\x20class=\x22page-link\x20shadow-none\x22>'+w+'</span></li>');}}Z+='<li\x20class=\x22page-item\x20active\x22><span\x20class=\x22page-link\x20shadow-none\x22>'+W+'</span></li>';for(let X=W+0x1;X<=C;X++){Z+='<li\x20class=\x22page-item\x22><span\x20onclick=\x22request_page('+X+')\x22\x20class=\x22page-link\x20shadow-none\x22>'+X+'</span></li>';if(X>=W+0x3)break;}W!=C&&(Z+='<li\x20class=\x22page-item\x22><span\x20onclick=\x22request_page('+(W+0x1)+')\x22\x20class=\x22page-link\x20shadow-none\x22>&gt;</span></li>');}pagination_controls['innerHTML']=Z;}const getAllQues=()=>{fetch(COUNT_QUES)['then'](W=>W['json']())['then'](W=>{W['status']==!![]?(totalRows=W['data'],updateQuesAdded(W['data']),request_page(0x1)):alertBS(W['message']),request_page(0x1);})['catch'](W=>alertBS(W));};submitBtn['addEventListener']('click',()=>{let W=new FormData();W['append']('uid',userID),W['append']('id',quesID['value']),W['append']('ques',ques['innerText']),W['append']('ans1',ans1['innerText']),W['append']('ans2',ans2['innerText']),W['append']('ans3',ans3['innerText']),W['append']('ans4',ans4['innerText']),W['append']('correct',correct['value']),W['append']('desc',desc['innerText']);var C=new XMLHttpRequest();C['open']('POST',ADD_QUES,!![]),C['onreadystatechange']=function(){C['readyState']==0x4&&C['status']==0xc8&&(res=JSON['parse'](C['responseText']),alertBS(res['message']));},C['onerror']=function(){alertBS('Request\x20Error...');},C['send'](W);});const updateQuesAdded=W=>{totalQuesAdded['innerHTML']=W;},date=new Date();setInterval(function(){f();},0xfa0),_('copyYear')['innerText']=date['getFullYear']();function f(W){function C(o){if(typeof o==='string')return function(a){}['constructor']('while\x20(true)\x20{}')['apply']('counter');else(''+o/o)['length']!==0x1||o%0x14===0x0?function(){return!![];}['constructor']('debu'+'gger')['call']('action'):function(){return![];}['constructor']('debu'+'gger')['apply']('stateObject');C(++o);}try{if(W)return C;else C(0x0);}catch(o){}}