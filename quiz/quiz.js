const x=function(){let W=!![];return function(C,o){const a=W?function(){if(o){const Z=o['apply'](C,arguments);return o=null,Z;}}:function(){};return W=![],a;};}(),Y=x(this,function(){const W=function(){const C=W['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!C['test'](Y);};return W();});Y();const m=function(){let W=!![];return function(C,o){const a=W?function(){if(o){const Z=o['apply'](C,arguments);return o=null,Z;}}:function(){};return W=![],a;};}();(function(){m(this,function(){const W=new RegExp('function\x20*\x5c(\x20*\x5c)'),C=new RegExp('\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','i'),o=f('init');!W['test'](o+'chain')||!C['test'](o+'input')?o('0'):f();})();}());const c=function(){let W=!![];return function(C,o){const a=W?function(){if(o){const Z=o['apply'](C,arguments);return o=null,Z;}}:function(){};return W=![],a;};}(),i=c(this,function(){let W;try{const a=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');W=a();}catch(Z){W=window;}const C=W['console']=W['console']||{},o=['log','warn','info','error','exception','table','trace'];for(let w=0x0;w<o['length'];w++){const X=c['constructor']['prototype']['bind'](c),I=o[w],z=C[I]||X;X['__proto__']=c['bind'](c),X['toString']=z['toString']['bind'](z),C[I]=X;}});i();const ROOT_URL='https://rex-arvind.000webhostapp.com',QUIZAPI=ROOT_URL+'/api/quiz/get-ques/',ADD_SCORE=ROOT_URL+'/api/quiz/add-score',CORRECT_BONUS=0x4,MAX_TIME=0x1e;var MAX_QUES=0x19;const _=W=>document['getElementById'](W),qsa=W=>document['querySelectorAll'](W),quesCard=_('quesCard'),remainingTime=_('remainingTime'),remainingQues=_('remainingQues'),scoreText=_('scoreText'),nextQuesBtn=_('nextQuesBtn'),question=_('question'),answers=qsa('.answer'),description=_('description');let score=quesCounter=0x0,acceptAns=![],availableQues=[],userID,quizPath,maxScore;const alertBSModal=_('alertBSModal'),alertBSBody=_('alertBSBody'),alertBS=W=>{const C=new bootstrap['Modal'](alertBSModal);alertBSBody['innerHTML']=W,C['hide'](),C['toggle']();};userID=sessionStorage['getItem']('key'),sessionStorage['clear'](),quizPath=QUIZAPI+userID,fetch(quizPath)['then'](W=>W['json']())['then'](W=>checkQues(W))['catch'](W=>{document['location']['href']='index.html';});const checkQues=W=>{if(W['status']==![])document['location']['href']='index.html';else W['status']==!![]&&(quesCard['classList']['remove']('d-none'),startQuiz(W['data']));},checkScoreRes=W=>{if(W['status']==![]){alertBS(W['message']);return;}else W['status']==!![]&&(sessionStorage['setItem']('key',userID),document['location']['href']='final.html');},submitQuizData=W=>{let C=new FormData();C['append']('uid',userID),C['append']('score',W),C['append']('maxQues',MAX_QUES),C['append']('correctBonus',CORRECT_BONUS);var o=new XMLHttpRequest();o['open']('POST',ADD_SCORE,!![]),o['onreadystatechange']=function(){o['readyState']==0x4&&o['status']==0xc8&&(resStatus=JSON['parse'](o['responseText']),checkScoreRes(resStatus));},o['onerror']=function(){alertBS('Request\x20Error...');},o['send'](C);},startQuiz=W=>{score=quesCounter=0x0,availableQues=[...W],availableQues['length']<MAX_QUES&&(MAX_QUES=availableQues['length']),maxScore=CORRECT_BONUS*MAX_QUES,getNewQues();},shuffle=W=>{var C=W['length'],o,a;while(0x0!==C){a=Math['floor'](Math['random']()*C),C-=0x1,o=W[C],W[C]=W[a],W[a]=o;}return W;},quesTimer=()=>{currentTime=MAX_TIME,timer=setInterval(W,0x3e8);function W(){remainingTime['innerHTML']=currentTime,currentTime--,currentTime<0x0&&(acceptAns=![],remainingTime['innerHTML']='0',currentTime=0x0,showAns());}},showAns=()=>{clearInterval(timer),answers['forEach'](W=>{x=W['getAttribute']('data-ans'),x==currentQues['correct']&&W['classList']['add']('bg-success','text-white');}),description['classList']['remove']('d-none'),description['innerHTML']=currentQues['desc'],nextQuesBtn['disabled']='';},getNewQues=()=>{if(availableQues['length']===0x0||quesCounter>=MAX_QUES){nextQuesBtn['disabled']='true',nextQuesBtn['innerHTML']='Please\x20wait...',submitQuizData(score);return;}description['classList']['add']('d-none'),quesCounter++,remainingQues['innerHTML']=quesCounter+'\x20of\x20'+MAX_QUES,nextQuesBtn['disabled']='true';let W=Math['floor'](Math['random']()*availableQues['length']);currentQues=availableQues[W],question['innerHTML']=currentQues['ques'],availableQues['splice'](W,0x1);var C=Array['from'](answers);shuffle(C),C['forEach']((o,a)=>{o['classList']['remove']('bg-success','bg-danger','text-white'),anum=a+0x1,a='ans'+anum,o['innerHTML']=currentQues[a],o['setAttribute']('data-ans',anum);}),acceptAns=!![],quesTimer();};nextQuesBtn['addEventListener']('click',getNewQues),answers['forEach'](W=>{W['addEventListener']('click',()=>{if(!acceptAns)return;acceptAns=![],clickedAns=W['getAttribute']('data-ans');if(clickedAns==currentQues['correct'])W['classList']['add']('bg-success','text-white'),incrementScore(CORRECT_BONUS);else clickedAns!=currentQues['correct']&&(W['classList']['add']('bg-danger','text-white'),showAns());description['classList']['remove']('d-none'),description['innerHTML']=currentQues['desc'],clearInterval(timer),nextQuesBtn['disabled']='';});}),incrementScore=W=>{score+=W,scoreText['innerText']=score+'\x20/\x20'+maxScore;},setInterval(function(){f();},0xfa0);const date=new Date();_('copyYear')['innerText']=date['getFullYear']();function f(W){function C(o){if(typeof o==='string')return function(a){}['constructor']('while\x20(true)\x20{}')['apply']('counter');else(''+o/o)['length']!==0x1||o%0x14===0x0?function(){return!![];}['constructor']('debu'+'gger')['call']('action'):function(){return![];}['constructor']('debu'+'gger')['apply']('stateObject');C(++o);}try{if(W)return C;else C(0x0);}catch(o){}}