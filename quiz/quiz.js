const v=function(){let w=!![];return function(W,Q){const M=w?function(){if(Q){const h=Q['apply'](W,arguments);return Q=null,h;}}:function(){};return w=![],M;};}(),I=v(this,function(){const w=function(){const W=w['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!W['test'](I);};return w();});I();const O=function(){let w=!![];return function(W,Q){const M=w?function(){if(Q){const h=Q['apply'](W,arguments);return Q=null,h;}}:function(){};return w=![],M;};}();(function(){O(this,function(){const w=new RegExp('function\x20*\x5c(\x20*\x5c)'),W=new RegExp('\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','i'),Q=N('init');!w['test'](Q+'chain')||!W['test'](Q+'input')?Q('0'):N();})();}());const Y=function(){let w=!![];return function(W,Q){const M=w?function(){if(Q){const h=Q['apply'](W,arguments);return Q=null,h;}}:function(){};return w=![],M;};}(),d=Y(this,function(){const w=function(){let h;try{h=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(D){h=window;}return h;},W=w(),Q=W['console']=W['console']||{},M=['log','warn','info','error','exception','table','trace'];for(let h=0x0;h<M['length'];h++){const D=Y['constructor']['prototype']['bind'](Y),c=M[h],p=Q[c]||D;D['__proto__']=Y['bind'](Y),D['toString']=p['toString']['bind'](p),Q[c]=D;}});d();const ROOT_URL='https://rex-arvind.000webhostapp.com',QUIZAPI=ROOT_URL+'/api/quiz/get-ques/',ADD_SCORE=ROOT_URL+'/api/quiz/add-score',CORRECT_BONUS=0x4,MAX_TIME=0x1e;var MAX_QUES=0x19;const _=w=>document['getElementById'](w),qsa=w=>document['querySelectorAll'](w),quesCard=_('quesCard'),remainingTime=_('remainingTime'),remainingQues=_('remainingQues'),scoreText=_('scoreText'),nextQuesBtn=_('nextQuesBtn'),question=_('question'),answers=qsa('.answer'),description=_('description');let score=quesCounter=0x0,acceptAns=![],availableQues=[],userID,quizPath,maxScore;const alertBSModal=_('alertBSModal'),alertBSBody=_('alertBSBody'),alertBS=w=>{const W=new bootstrap['Modal'](alertBSModal);alertBSBody['innerHTML']=w,W['hide'](),W['toggle']();};userID=sessionStorage['getItem']('key'),sessionStorage['clear'](),quizPath=QUIZAPI+userID,fetch(quizPath)['then'](w=>w['json']())['then'](w=>checkQues(w))['catch'](w=>{document['location']['href']='index.html';});const checkQues=w=>{if(w['status']==![])document['location']['href']='index.html';else w['status']==!![]&&(quesCard['classList']['remove']('d-none'),startQuiz(w['data']));},checkScoreRes=w=>{if(w['status']==![]){alertBS(w['message']);return;}else w['status']==!![]&&(sessionStorage['setItem']('key',userID),document['location']['href']='final.html');},submitQuizData=w=>{let W=new FormData();W['append']('uid',userID),W['append']('score',w),W['append']('maxQues',MAX_QUES),W['append']('correctBonus',CORRECT_BONUS);var Q=new XMLHttpRequest();Q['open']('POST',ADD_SCORE,!![]),Q['onreadystatechange']=function(){Q['readyState']==0x4&&Q['status']==0xc8&&(resStatus=JSON['parse'](Q['responseText']),checkScoreRes(resStatus));},Q['onerror']=function(){alertBS('Request\x20Error...');},Q['send'](W);},startQuiz=w=>{score=quesCounter=0x0,availableQues=[...w],availableQues['length']<MAX_QUES&&(MAX_QUES=availableQues['length']),maxScore=CORRECT_BONUS*MAX_QUES,getNewQues();},shuffle=w=>{var W=w['length'],Q,M;while(0x0!==W){M=Math['floor'](Math['random']()*W),W-=0x1,Q=w[W],w[W]=w[M],w[M]=Q;}return w;},quesTimer=()=>{currentTime=MAX_TIME,timer=setInterval(w,0x3e8);function w(){remainingTime['innerHTML']=currentTime,currentTime--,currentTime<0x0&&(acceptAns=![],remainingTime['innerHTML']='0',currentTime=0x0,showAns());}},showAns=()=>{clearInterval(timer),answers['forEach'](w=>{x=w['getAttribute']('data-ans'),x==currentQues['correct']&&w['classList']['add']('bg-success','text-white');}),description['classList']['remove']('d-none'),description['innerHTML']=currentQues['desc'],nextQuesBtn['disabled']='';},getNewQues=()=>{if(availableQues['length']===0x0||quesCounter>=MAX_QUES){nextQuesBtn['disabled']='true',nextQuesBtn['innerHTML']='Please\x20wait...',submitQuizData(score);return;}description['classList']['add']('d-none'),quesCounter++,remainingQues['innerHTML']=quesCounter+'\x20of\x20'+MAX_QUES,nextQuesBtn['disabled']='true';let w=Math['floor'](Math['random']()*availableQues['length']);currentQues=availableQues[w],question['innerHTML']=currentQues['ques'],availableQues['splice'](w,0x1);var W=Array['from'](answers);shuffle(W),W['forEach']((Q,M)=>{Q['classList']['remove']('bg-success','bg-danger','text-white'),anum=M+0x1,a='ans'+anum,Q['innerHTML']=currentQues[a],Q['setAttribute']('data-ans',anum);}),acceptAns=!![],quesTimer();};nextQuesBtn['addEventListener']('click',getNewQues),answers['forEach'](w=>{w['addEventListener']('click',()=>{if(!acceptAns)return;acceptAns=![],clickedAns=w['getAttribute']('data-ans');if(clickedAns==currentQues['correct'])w['classList']['add']('bg-success','text-white'),incrementScore(CORRECT_BONUS);else clickedAns!=currentQues['correct']&&(w['classList']['add']('bg-danger','text-white'),showAns());description['classList']['remove']('d-none'),description['innerHTML']=currentQues['desc'],clearInterval(timer),nextQuesBtn['disabled']='';});}),incrementScore=w=>{score+=w,scoreText['innerText']=score+'\x20/\x20'+maxScore;};const date=new Date();_('copyYear')['innerText']=date['getFullYear']();function N(w){function W(Q){if(typeof Q==='string')return function(M){}['constructor']('while\x20(true)\x20{}')['apply']('counter');else(''+Q/Q)['length']!==0x1||Q%0x14===0x0?function(){return!![];}['constructor']('debu'+'gger')['call']('action'):function(){return![];}['constructor']('debu'+'gger')['apply']('stateObject');W(++Q);}try{if(w)return W;else W(0x0);}catch(Q){}}