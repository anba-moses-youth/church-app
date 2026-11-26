(function(){
var IDX=[["متى", 1, 28], ["مرقس", 2, 16], ["لوقا", 3, 24], ["يوحنا", 4, 21], ["أعمال الرسل", 5, 28], ["رومية", 6, 16], ["كورنثوس الأولى", 6, 16], ["كورنثوس الثانية", 6, 13], ["غلاطية", 6, 6], ["أفسس", 6, 6], ["فيلبي", 7, 4], ["كولوسي", 7, 4], ["تسالونيكي الأولى", 7, 5], ["تسالونيكي الثانية", 7, 3], ["تيموثاوس الأولى", 7, 6], ["تيموثاوس الثانية", 7, 4], ["تيطس", 7, 3], ["فليمون", 7, 1], ["العبرانيين", 7, 13], ["يعقوب", 7, 5], ["بطرس الأولى", 7, 5], ["بطرس الثانية", 7, 3], ["يوحنا الأولى", 7, 5], ["يوحنا الثانية", 7, 1], ["يوحنا الثالثة", 7, 1], ["يهوذا", 7, 1], ["الرؤيا", 8, 22]];
var MAP={};IDX.forEach(function(x){MAP[x[0]]=x});
var P={};
function load(f,cb){if(P[f]===true)return cb();if(P[f]){P[f].push(cb);return}P[f]=[cb];var s=document.createElement('script');s.src=f+'.js?v=1';s.onload=function(){var q=P[f];P[f]=true;q.forEach(function(c){c()})};s.onerror=function(){var q=P[f];P[f]=null;$('#m').innerHTML='<div class="card">تعذر تحميل السفر. اتأكد من النت وجرب تاني.</div>'};document.head.appendChild(s)}
function norm(s){return s.replace(/[\u064B-\u0652\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه')}
var SRC='<p class="note" style="margin-top:14px">المصدر: ملفات الكنيسة (نص بدون تشكيل). للاستخدام داخل الكنيسة.</p>';
var _b=window.bible;
window.bible=function(){
 if(st.sub==='search')return bsr();
 if(st.book&&st.ch!=null&&MAP[st.book]){var m=MAP[st.book];
  $('#m').innerHTML='<div class="card">جاري تحميل السفر...</div>';
  load(m[1],function(){
   if(!(st.book===m[0]&&st.ch!=null&&cur==='bible'))return;
   var c=BBD[m[0]][st.ch-1]||[],n=m[2],bm=L('bm',[]).some(function(x){return x[0]===st.book&&x[1]===st.ch});
   $('#m').innerHTML='<div class="card"><div class="row"><h3 class="f">'+st.book+' '+AR(st.ch)+'</h3><button class="btn s '+(bm?'g':'')+'" onclick="togBm()">🔖</button></div><div class="txt" style="font-size:'+st.fs+'px;line-height:2">'+c.map(function(v,i){return '<sup style="color:#b8860b;font-weight:bold;margin-left:3px">'+AR(i+1)+'</sup>'+esc(v)}).join(' ')+'</div>'+
   '<div class="row" style="margin-top:12px"><button class="btn s" onclick="st.fs+=2;render()">A+</button><button class="btn s" onclick="st.fs=Math.max(14,st.fs-2);render()">A-</button><span class="f"></span>'+(st.ch>1?'<button class="btn s" onclick="openCh(st.book,'+(st.ch-1)+')">السابق</button>':'')+(st.ch<n?'<button class="btn s" onclick="openCh(st.book,'+(st.ch+1)+')">التالي</button>':'')+'</div>'+SRC+'</div>';
   $('#m').scrollTop=0});return}
 _b()};
function bsr(){$('#m').innerHTML='<input id="bq" placeholder="اكتب كلمة أو جزء من آية" oninput="bsq(this.value)"><div id="bl"></div><div id="bst" class="note"></div>';bsq('')}
var seq=0;
window.bsq=function(q){var my=++seq;q=norm(q.trim());var o=$('#bl');if(!q){o.innerHTML='';$('#bst').textContent='البحث في النصوص المتاحة: '+Object.keys(MAP).length+' سفر';return}
 var fs={};IDX.forEach(function(x){fs[x[1]]=1});var ks=Object.keys(fs),left=ks.length;$('#bst').textContent='جاري التحميل...';
 ks.forEach(function(f){load(f,function(){if(--left)return;if(my!==seq)return;var r=[];
  IDX.forEach(function(x){var bk=BBD[x[0]];if(!bk)return;bk.forEach(function(ch,ci){ch.forEach(function(v,vi){if(r.length<80&&norm(v).indexOf(q)>=0)r.push([x[0],ci+1,vi+1,v])})})});
  o.innerHTML=r.map(function(x){return '<div class="item" onclick="st.sub=null;openCh(\''+x[0]+'\','+x[1]+')"><b>'+x[0]+' '+AR(x[1])+':'+AR(x[2])+'</b><br>'+esc(x[3])+'</div>'}).join('')||'<p class="note">مفيش نتيجة</p>';$('#bst').textContent=r.length>=80?'أول 80 نتيجة':r.length+' نتيجة'})})};
})();
