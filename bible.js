(function(){
var IDX=[["متى", "bbnt1", 28], ["مرقس", "bbnt2", 16], ["لوقا", "bbnt3", 24], ["يوحنا", "bbnt4", 21], ["أعمال الرسل", "bbnt5", 28], ["رومية", "bbnt6", 16], ["كورنثوس الأولى", "bbnt6", 16], ["كورنثوس الثانية", "bbnt6", 13], ["غلاطية", "bbnt6", 6], ["أفسس", "bbnt6", 6], ["فيلبي", "bbnt7", 4], ["كولوسي", "bbnt7", 4], ["تسالونيكي الأولى", "bbnt7", 5], ["تسالونيكي الثانية", "bbnt7", 3], ["تيموثاوس الأولى", "bbnt7", 6], ["تيموثاوس الثانية", "bbnt7", 4], ["تيطس", "bbnt7", 3], ["فليمون", "bbnt7", 1], ["العبرانيين", "bbnt7", 13], ["يعقوب", "bbnt7", 5], ["بطرس الأولى", "bbnt7", 5], ["بطرس الثانية", "bbnt7", 3], ["يوحنا الأولى", "bbnt7", 5], ["يوحنا الثانية", "bbnt7", 1], ["يوحنا الثالثة", "bbnt7", 1], ["يهوذا", "bbnt7", 1], ["الرؤيا", "bbnt8", 22], ["التكوين", "bbot1", 50], ["الخروج", "bbot2", 40], ["اللاويين", "bbot3", 27], ["العدد", "bbot4", 36], ["التثنية", "bbot5", 34], ["يشوع", "bbot6", 24], ["القضاة", "bbot6", 16], ["راعوث", "bbot6", 4], ["صموئيل الأول", "bbot7", 31], ["صموئيل الثاني", "bbot8", 24], ["الملوك الأول", "bbot9", 22], ["الملوك الثاني", "bbot10", 25], ["الأيام الأول", "bbot11", 29], ["الأيام الثاني", "bbot12", 35], ["عزرا", "bbot12", 10], ["نحميا", "bbot13", 13], ["أستير", "bbot13", 10], ["أيوب", "bbot13", 42], ["المزامير", "bbot14", 149], ["الأمثال", "bbot15", 31], ["الجامعة", "bbot15", 12], ["نشيد الأنشاد", "bbot15", 8], ["إشعياء", "bbot16", 66], ["إرميا", "bbot17", 51], ["مراثي إرميا", "bbot18", 5], ["حزقيال", "bbot19", 48], ["دانيال", "bbot20", 12], ["هوشع", "bbot20", 14], ["يوئيل", "bbot20", 3], ["عاموس", "bbot20", 9], ["عوبديا", "bbot20", 1], ["يونان", "bbot20", 3], ["ميخا", "bbot20", 7], ["ناحوم", "bbot20", 3], ["حبقوق", "bbot20", 3], ["صفنيا", "bbot20", 3], ["حجي", "bbot20", 2], ["زكريا", "bbot21", 14], ["ملاخي", "bbot21", 4]];
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
