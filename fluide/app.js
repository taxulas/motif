var xo="fluide",Ye=xo==="fluide"?{id:"fluide",storage:"motif3-fluide",name:"MOTIF Fluide",fluid:!0}:{id:"main",storage:"motif3",name:"MOTIF",fluid:!1};var ko=Ye.storage,wo=1,Ts=null;function So(){return Ts||(Ts=new Promise((o,e)=>{let t=indexedDB.open(ko,wo);t.onupgradeneeded=()=>{let s=t.result;s.objectStoreNames.contains("projects")||s.createObjectStore("projects",{keyPath:"id"}),s.objectStoreNames.contains("renders")||s.createObjectStore("renders",{keyPath:"id"}),s.objectStoreNames.contains("files")||s.createObjectStore("files",{keyPath:"id"}),s.objectStoreNames.contains("kv")||s.createObjectStore("kv")},t.onsuccess=()=>{let s=t.result;s.onversionchange=()=>s.close(),o(s)},t.onerror=()=>e(t.error),t.onblocked=()=>e(new Error("Base locale bloqu\xE9e par un autre onglet"))}),Ts)}function ns(o,e,t){return So().then(s=>new Promise((i,a)=>{let r=s.transaction(o,e),n=r.objectStore(o),l;Promise.resolve(t(n)).then(c=>{l=c}),r.oncomplete=()=>i(l),r.onerror=()=>a(r.error),r.onabort=()=>a(r.error||new Error("transaction annul\xE9e"))}))}var ls=o=>new Promise((e,t)=>{o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),Fe={put:(o,e,t)=>ns(o,"readwrite",s=>ls(t===void 0?s.put(e):s.put(e,t))),get:(o,e)=>ns(o,"readonly",t=>ls(t.get(e))),del:(o,e)=>ns(o,"readwrite",t=>ls(t.delete(e))),all:o=>ns(o,"readonly",e=>ls(e.getAll())),keys:o=>ns(o,"readonly",e=>ls(e.getAllKeys()))};async function Ui(){try{if(navigator.storage&&navigator.storage.persist)return await navigator.storage.persisted()?!0:await navigator.storage.persist()}catch{}return!1}async function Hi(){try{if(navigator.storage&&navigator.storage.estimate)return await navigator.storage.estimate()}catch{}return null}var mt=["Do","R\xE9\u266D","R\xE9","Mi\u266D","Mi","Fa","Fa\u266F","Sol","La\u266D","La","Si\u266D","Si"];var Ms=[{id:"major",name:"Majeur",iv:[0,2,4,5,7,9,11],minor:!1},{id:"minor",name:"Mineur",iv:[0,2,3,5,7,8,10],minor:!0},{id:"dorian",name:"Dorien",iv:[0,2,3,5,7,9,10],minor:!0},{id:"phrygian",name:"Phrygien",iv:[0,1,3,5,7,8,10],minor:!0},{id:"harmonic",name:"Mineur harmonique",iv:[0,2,3,5,7,8,11],minor:!0},{id:"phrygdom",name:"Phrygien dominant",iv:[0,1,4,5,7,8,10],minor:!1},{id:"mixolydian",name:"Mixolydien",iv:[0,2,4,5,7,9,10],minor:!1},{id:"lydian",name:"Lydien",iv:[0,2,4,6,7,9,11],minor:!1},{id:"melodic",name:"Mineur m\xE9lodique",iv:[0,2,3,5,7,9,11],minor:!0},{id:"hungarian",name:"Hongrois",iv:[0,2,3,6,7,8,11],minor:!0}];function vt(o){return Ms.find(e=>e.id===o)||Ms[0]}var To=[0,4,2,5,1,6,3],Mo=[0,4,2,6,3,1,5],ct=[1,2,3,4,5,6,7,12];function ai(o,e){let t=vt(o);if(e>=12){let a=[];for(let r=0;r<12;r++){let n=0;for(let l=0;l<7;l++)t.iv[l]<=r&&(n=l);a.push({deg:n,acc:r-t.iv[n],semi:r})}return a}return(t.minor?Mo:To).slice(0,Math.max(1,Math.min(7,e))).sort((a,r)=>a-r).map(a=>({deg:a,acc:0,semi:t.iv[a]}))}function ji(o,e,t,s,i=48){let a=vt(s),r=Math.floor(o/7),n=o-r*7;return i+t+r*12+a.iv[n]+(e||0)}function Mt(o,e,t){let s=vt(t),i=Math.floor(o/7);return i*12+s.iv[o-i*7]+(e||0)}function ft(o,e,t){let s=ai(e,t),i=s.length,a=Math.floor(o.lo/12)-1,r=0,n=(c,d)=>c*12+s[d].semi;for(;n(a,r)<o.lo;)r++,r>=i&&(r=0,a++);let l=[];for(let c=0;c<o.n;c++){let d=s[r];l.push({deg:a*7+d.deg,acc:d.acc,semi:a*12+d.semi,octave:a,isRoot:d.semi===0&&d.acc===0}),r++,r>=i&&(r=0,a++)}return l}function Lo(o,e){let t=vt(e),s=Math.floor(o/12),i=o-s*12,a=0;for(let r=0;r<7;r++)t.iv[r]<=i&&(a=r);return{deg:s*7+a,acc:i-t.iv[a]}}var Ro=new Set([1,3,6,8,10]),bt=.6,zt=.62;function Gi(o,e,t,s){let i=ft(o,e,t),a=h=>Ro.has(((s+h)%12+12)%12),r=i[0].semi,n=i[i.length-1].semi;for(;n-r<11;)n++,n-r<11&&r--;a(r)&&r--,a(n)&&n++;let l=new Set(ft({lo:r-12,n:96},e,t).map(h=>h.semi)),c=[],d=0;for(let h=r;h<=n;h++){let v=a(h),{deg:p,acc:m}=Lo(h,e);c.push({semi:h,black:v,pos:d,deg:p,acc:m,inScale:l.has(h),isRoot:(h%12+12)%12===0}),v||d++}return{keys:c,whites:d}}function Wi(o,e,t){let{keys:s,whites:i}=o;if(t<bt){for(let r of s)if(r.black&&Math.abs(e-r.pos/i)<zt/i/2)return r}let a=Math.min(i-1,Math.max(0,Math.floor(e*i)));return s.find(r=>!r.black&&r.pos===a)}function Eo(o,e,t){let s=ai(e,t),i=Math.floor(o/12),a=null;for(let r=i-1;r<=i;r++)for(let n of s){let l=r*12+n.semi;l<=o&&(a===null||l>a)&&(a=l)}return a===null?o:a}function Vi(o,e,t,s){let i=ft(o,e,t),a=i.length?i[i.length-1].semi:o.lo,r=Eo(o.lo,e,s),n=0,l=ft({lo:r,n:64},e,s);for(let c of l)if(c.semi<=a+.5)n++;else break;return{lo:r,n:Math.max(1,Math.min(36,n))}}var ii=24;function z(o,e,t=16){let s=e.map(([i,a,r])=>[Math.round(i*ii),Math.max(3,Math.round(a*ii)),r?1:0]);return s.sort((i,a)=>i[0]-a[0]),{name:o,len:t*ii,ev:s}}function $e(o,e,t,s,i,a=0,r=16){let n=[];for(let l=0;l<s;l++)n.push([e+l*t,i,a&&l%a===0]);return z(o,n,r)}function yt(o,e,t=384){return{name:o,len:t,ev:e.map(([s,i,a])=>[s,i,a?1:0])}}var xt=[{name:"Libre",len:0,ev:[]},z("Ronde",[[0,15.5,1]]),z("Blanches",[[0,7.5,1],[8,7.5,0]]),z("Noires",[[0,3.2,1],[4,3.2,0],[8,3.2,0],[12,3.2,0]]),$e("Croches",0,2,8,1.5,4),$e("Doubles",0,1,16,.8,4),z("Point\xE9es",[[0,2.6,1],[3,2.6,0],[6,2.6,0],[9,2.6,0],[12,1.6,1],[14,1.6,0]]),z("Tresillo",[[0,2.6,1],[3,2.6,0],[6,1.6,0],[8,2.6,1],[11,2.6,0],[14,1.6,0]]),z("Contretemps",[[2,1.5,1],[6,1.5,0],[10,1.5,1],[14,1.5,0]]),z("Galop",[[0,1.6,1],[2,.8,0],[3,.8,0],[4,1.6,1],[6,.8,0],[7,.8,0],[8,1.6,1],[10,.8,0],[11,.8,0],[12,1.6,1],[14,.8,0],[15,.8,0]]),z("Deux-pas",[[0,2.5,1],[3,1.5,0],[6,3.5,0],[10,1.5,1],[12,3.5,0]]),z("Dembow",[[0,1.5,1],[3,.9,0],[4,1.5,0],[7,.9,0],[8,1.5,1],[11,.9,0],[12,1.5,0],[15,.9,0]]),yt("Triolets",Array.from({length:12},(o,e)=>[e*32,26,e%3===0])),z("Log drum",[[0,2,1],[3,1,0],[6,2.5,1],[10,1,0],[12,1,0],[14,1.6,1]]),z("Jersey",[[0,2.5,1],[4,2.5,1],[8,1.5,1],[10,2,0],[13,2.5,1]]),$e("Arp\xE8ge",0,1,16,.9,3),z("Rafales",[[0,.45,1],[.5,.45,0],[1,.45,0],[1.5,.45,0],[6,1.5,1],[8,.45,1],[8.5,.45,0],[9,.45,0],[9.5,.45,0],[12,1.5,0],[14,1.5,1]])],g=.5,Ao=[{name:"Coup par coup",len:0,ev:[]},z("Quatre temps",[[0,g,1],[4,g,0],[8,g,0],[12,g,0]]),z("Un et trois",[[0,g,1],[8,g,0]]),z("Deux-pas",[[0,g,1],[10,g,0]]),z("Trap",[[0,g,1],[7,g,0],[10,g,0]],16),z("Breakbeat",[[0,g,1],[10,g,0],[16,g,1],[23,g,0],[26,g,0]],32),z("Jersey",[[0,g,1],[4,g,1],[8,g,1],[10,g,0],[13,g,1]]),z("Montagem",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),z("Afro",[[0,g,1],[4,g,0],[7,g,0],[8,g,0],[12,g,0]]),z("Amapiano",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[14,g,0]]),z("Martel\xE9",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[14,g,0],[15,g,0]]),z("Roulant",[[0,g,1],[3,g,0],[4,g,0],[8,g,0],[11,g,0],[12,g,0]]),z("Demi-temps",[[0,g,1],[11,g,0],[19,g,0]],32),z("Syncope",[[0,g,1],[6,g,0],[10,g,0]]),$e("Croches",0,2,8,g,4),$e("Rouleau",0,1,16,g,4),z("Reggaeton",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[10,g,0]])],Do=[{name:"Coup par coup",len:0,ev:[]},z("Deux et quatre",[[4,g,1],[12,g,1]]),z("Demi-temps",[[8,g,1]]),z("Dembow",[[3,g,1],[6,g,0],[11,g,1],[14,g,0]]),z("Deux-pas",[[4,g,1],[12,g,1],[15,g,0]]),z("Breakbeat",[[4,g,1],[12,g,1],[20,g,1],[25,g,0],[28,g,1]],32),z("Jersey",[[4,g,1],[12,g,1],[14,g,0],[15,g,0]]),z("Trap",[[8,g,1],[24,g,1],[30,g,0],[31,g,0]],32),z("Funk",[[4,g,1],[7,g,0],[12,g,1],[14,g,0]]),z("Afro",[[4,g,1],[10,g,0],[12,g,1]]),z("Fant\xF4mes",[[4,g,1],[9,g,0],[12,g,1],[15,g,0]]),$e("Croches",0,2,8,g,2),z("Rafale",[[12,g,1],[13,g,0],[14,g,0],[15,g,1]]),z("Contretemps",[[2,g,1],[6,g,0],[10,g,1],[14,g,0]]),z("Trois-trois-deux",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0]]),z("Syncop\xE9",[[3,g,1],[10,g,1]]),$e("Roulement",0,1,16,g,4)],Po=[{name:"Coup par coup",len:0,ev:[]},$e("Croches",0,2,8,g,2),$e("Doubles",0,1,16,g,4),z("Contretemps",[[2,g,1],[6,g,1],[10,g,1],[14,g,1]]),z("Deux-pas",[[0,g,1],[2,g,0],[3,g,0],[6,g,1],[8,g,0],[10,g,1],[11,g,0],[14,g,1]]),yt("Triolets",Array.from({length:12},(o,e)=>[e*32,12,e%3===0])),yt("Roulements",[0,24,48,60,72,96,120,144,156,168,180,192,216,240,264,276,288,312,336,344,352,360,368,376].map((o,e)=>[o,6,o%96===0])),$e("Noires",0,4,4,g,1),z("Galop",[[0,g,1],[2,g,0],[3,g,0],[4,g,1],[6,g,0],[7,g,0],[8,g,1],[10,g,0],[11,g,0],[12,g,1],[14,g,0],[15,g,0]]),z("Afro",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0],[15,g,0]]),z("Accents",Array.from({length:16},(o,e)=>[e,g,e%4===2])),yt("Triolets 16",Array.from({length:24},(o,e)=>[e*16,8,e%6===0])),z("Sautill\xE9",[[0,g,1],[3,g,0],[4,g,1],[7,g,0],[8,g,1],[11,g,0],[12,g,1],[15,g,0]]),z("Point\xE9es",[[0,g,1],[3,g,0],[6,g,0],[9,g,0],[12,g,1]]),yt("Rafales",[0,48,96,108,120,132,192,240,288,300,312,324,336,348,360,372].map(o=>[o,6,o%96===0])),z("Clave",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),z("Shuffle",[[0,g,1],[3,g,0],[4,g,1],[7,g,0],[8,g,1],[11,g,0],[12,g,1],[14,g,0],[15,g,0]])],qo=[{name:"Coup par coup",len:0,ev:[]},z("Clave son",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),z("Clave rumba",[[0,g,1],[3,g,0],[7,g,0],[10,g,1],[12,g,0]]),z("Tresillo",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0]]),$e("Shaker",0,1,16,g,2),z("Tumbao",[[2,g,0],[3,g,1],[6,g,0],[7,g,1],[10,g,0],[11,g,1],[14,g,0],[15,g,1]]),z("Cloche phonk",[[0,g,1],[2,g,0],[3,g,1],[5,g,0],[6,g,1],[8,g,0],[10,g,1],[11,g,0],[13,g,1],[14,g,0]]),yt("Cloche 12/8",[0,2,4,5,7,9,11].map((o,e)=>[o*32,12,e===0])),z("Contretemps",[[2,g,1],[6,g,0],[10,g,1],[14,g,0]]),z("Log",[[3,g,1],[6,g,0],[11,g,1],[14,g,0]]),$e("Croches",0,2,8,g,2),$e("Noires",0,4,4,g,1),z("Syncope",[[1,g,1],[4,g,0],[7,g,1],[10,g,0],[13,g,1]]),z("Rim deux-pas",[[3,g,0],[7,g,1],[11,g,0],[14,g,1]]),yt("Triolets",Array.from({length:12},(o,e)=>[e*32,12,e%3===0])),yt("Rafales",[288,300,312,324,336,348,360,372].map((o,e)=>[o,6,e===0])),z("Montagem",[[0,g,1],[3,g,0],[6,g,1],[8,g,0],[10,g,1],[12,g,0],[14,g,1]])],Ut=[Ao,Do,Po,qo];function Yi(o,e){let t=o.ev.length;if(!e||t<2)return[];let s=Math.min(e,t-1),i=[];for(let a=0;a<s;a++){let r=Math.round((a+1)*t/(s+1));r<1&&(r=1),r>t-1&&(r=t-1),i.includes(r)||i.push(r)}return i}function oi(o){return Math.max(0,o.ev.length-1)}var Ki=[1,2,4,8];var Lt={lo:-24,hi:36,maxN:24,maxSemis:37};function Ls(o,e,t=Lt){let s=ai(o,e),i=[];for(let a=Math.floor(t.lo/12);a<=Math.ceil(t.hi/12);a++)for(let r of s){let n=a*12+r.semi;n>=t.lo&&n<t.hi&&i.push(n)}return i.sort((a,r)=>a-r)}function ri(o,e,t,s,i=Lt){let a=Ls(t,s,i),r=0,n=1/0;a.forEach((c,d)=>{let h=Math.abs(c-e);h<n&&(n=h,r=d)});let l=Math.min(o.n,a.length);return r=Math.max(0,Math.min(a.length-l,r)),{lo:a[r],n:l}}function ni(o,e,t,s,i,a=Lt){let r=Ls(s,i,a),n=ft(o,s,i),l=n[0].semi,c=n[n.length-1].semi,d=r[0],h=1/0;for(let m of r){let f=Math.abs(m-t);f<h&&(h=f,d=m)}let v=(m,f)=>r.filter(b=>b>=m&&b<=f).length;if(e==="left"){let m=Math.min(d,c);return m=Math.max(m,c-a.maxSemis+1),{lo:m,n:Math.min(a.maxN,Math.max(1,v(m,c)))}}let p=Math.max(d,l);return p=Math.min(p,l+a.maxSemis-1),{lo:l,n:Math.min(a.maxN,Math.max(1,v(l,p)))}}var $i="motif-3",Co=3;function Et(){let o=new Uint8Array(8);return crypto.getRandomValues(o),Array.from(o,e=>e.toString(16).padStart(2,"0")).join("")}function Rt(o="A"){return{name:o,drum:[{hits:[]},{hits:[]},{hits:[]},{hits:[]}],bass:{notes:[]},lead:{notes:[]},auto:{},gest:{bass:[],lead:[],drum:[]}}}function At(o={}){let e=Date.now();return{format:$i,v:Co,id:Et(),name:o.name||"Nouvelle id\xE9e",created:e,updated:e,tempo:o.tempo||120,swing:50,key:o.key??2,scale:o.scale||"minor",bars:2,parts:{drum:{kit:o.kit||[null,null,null,null],macros:[null,null,null,null],rhythm:[1,1,1,4],mute:[!1,!1,!1,!1],level:[0,0,0,0]},bass:{preset:o.bass||null,macros:null,rhythm:4,ties:0,steps:5,range:{lo:-12,n:8},arp:"order",q:24,mute:!1,level:0},lead:{preset:o.lead||null,macros:null,rhythm:5,ties:0,steps:5,range:{lo:0,n:10},arp:"order",q:24,mute:!1,level:0}},mix:{drum:0,bass:0,lead:0,pump:.3,master:0,space:.5,drumDrive:.15,drumSpace:.1},patterns:[Rt("A")],current:0,song:{enabled:!1,sections:[]}}}var se=(o,e,t,s)=>{let i=Number(o);return Number.isFinite(i)?Math.min(s,Math.max(t,i)):e};function Ht(o){if(!o||typeof o!="object")throw new Error("Fichier de projet illisible");if(o.format&&o.format!==$i)throw new Error("Format de projet inconnu");let t=At();t.id=typeof o.id=="string"?o.id.slice(0,40):Et(),t.name=typeof o.name=="string"&&o.name.trim()?o.name.slice(0,80):"Sans titre",t.created=se(o.created,Date.now(),0,1e15),t.updated=se(o.updated,Date.now(),0,1e15),t.tempo=se(o.tempo,120,40,220),t.swing=se(o.swing,50,50,75),t.key=se(o.key,0,0,11)|0,t.scale=typeof o.scale=="string"?o.scale:"minor",t.bars=[1,2,4,8].includes(o.bars)?o.bars:2;let s=o.parts||{};if(s.drum){let r=s.drum;t.parts.drum.kit=[0,1,2,3].map(n=>r.kit&&typeof r.kit[n]=="string"?r.kit[n]:null),t.parts.drum.macros=[0,1,2,3].map(n=>r.macros&&Array.isArray(r.macros[n])?r.macros[n].slice(0,7).map(l=>l===null?null:se(l,.5,0,1)):null),t.parts.drum.rhythm=[0,1,2,3].map(n=>se(r.rhythm&&r.rhythm[n],1,0,16)|0),t.parts.drum.mute=[0,1,2,3].map(n=>!!(r.mute&&r.mute[n])),t.parts.drum.level=[0,1,2,3].map(n=>se(r.level&&r.level[n],0,-40,6))}for(let r of["bass","lead"]){let n=s[r];if(!n)continue;let l=t.parts[r];l.preset=typeof n.preset=="string"?n.preset:null,l.macros=Array.isArray(n.macros)?n.macros.slice(0,7).map(c=>c===null?null:se(c,.5,0,1)):null,l.rhythm=se(n.rhythm,l.rhythm,0,16)|0,l.ties=se(n.ties,0,0,24)|0,l.steps=[1,2,3,4,5,6,7,12].includes(n.steps)?n.steps:l.steps,n.range&&(l.range={lo:se(n.range.lo,l.range.lo,-36,48)|0,n:se(n.range.n,l.range.n,1,36)|0}),l.arp=["order","up","down","chord"].includes(n.arp)?n.arp:"order",l.q=[6,12,24,48].includes(n.q)?n.q:24,l.mute=!!n.mute,l.level=se(n.level,0,-40,6)}if(o.mix)for(let r of Object.keys(t.mix))o.mix[r]!==void 0&&(t.mix[r]=se(o.mix[r],t.mix[r],-40,12));let i=384*t.bars,a=Array.isArray(o.patterns)&&o.patterns.length?o.patterns.slice(0,8):[Rt("A")];return t.patterns=a.map((r,n)=>{let l=Rt(typeof r.name=="string"?r.name.slice(0,12):String.fromCharCode(65+n));for(let c=0;c<4;c++){let d=r.drum&&r.drum[c]&&Array.isArray(r.drum[c].hits)?r.drum[c].hits:[];l.drum[c].hits=d.filter(h=>h&&h.t>=0&&h.t<i).slice(0,4e3).map(h=>({t:h.t|0,v:se(h.v,.8,0,1),x:se(h.x,1,0,2)|0,c:se(h.c,.5,0,1)}))}for(let c of["bass","lead"]){let d=r[c]&&Array.isArray(r[c].notes)?r[c].notes:[];l[c].notes=d.filter(h=>h&&h.t>=0&&h.t<i).slice(0,4e3).map(h=>({t:h.t|0,d:se(h.d,24,1,i)|0,deg:se(h.deg,0,-60,60)|0,acc:se(h.acc,0,-2,2)|0,v:se(h.v,.8,0,1),tie:!!h.tie,...typeof h.y=="number"?{y:se(h.y,.5,0,1)}:{}}))}if(r.gest&&typeof r.gest=="object")for(let c of["bass","lead","drum"]){let d=Array.isArray(r.gest[c])?r.gest[c]:[],h=2e4;l.gest[c]=[];for(let v of d){if(!v||!Array.isArray(v.p)||h<=0)continue;let p=v.p.filter(m=>Array.isArray(m)&&m[0]>=0&&m[0]<i).slice(0,h).map(m=>c==="drum"?[Math.round(se(m[0],0,0,i)*10)/10,se(m[1],.5,0,1),se(m[2],.5,0,1)]:[Math.round(se(m[0],0,0,i)*10)/10,se(m[1],.5,0,1),se(m[2],.5,0,1),se(m[3],0,-60,60)|0,se(m[4],0,-2,2)|0]);p.length&&(h-=p.length,l.gest[c].push(c==="drum"?{l:se(v.l,0,0,3)|0,p}:{p}))}}if(r.auto&&typeof r.auto=="object"){for(let c of["d0","d1","d2","d3","bass","lead"])if(r.auto[c])for(let d=0;d<7;d++){let h=r.auto[c][d];if(Array.isArray(h)&&h.length){l.auto[c]=l.auto[c]||{};let v=i/12;l.auto[c][d]=Array.from({length:v},(p,m)=>{let f=h[m];return f==null||f<0?-1:se(f,-1,0,1)})}}}return l}),t.current=se(o.current,0,0,t.patterns.length-1)|0,o.song&&Array.isArray(o.song.sections)&&(t.song.sections=o.song.sections.slice(0,64).map(r=>({p:se(r.p,0,0,t.patterns.length-1)|0,reps:se(r.reps,1,1,16)|0,mute:r.mute&&typeof r.mute=="object"?{d0:!!r.mute.d0,d1:!!r.mute.d1,d2:!!r.mute.d2,d3:!!r.mute.d3,bass:!!r.mute.bass,lead:!!r.mute.lead}:{}})),t.song.enabled=!!o.song.enabled&&t.song.sections.length>0),t}function Qi(o,e){let t=384*o.bars,s=384*e;if(e!==o.bars){for(let i of o.patterns){let a=(r,n)=>{if(s>t){let l=[];for(let c=t;c<s;c+=t)for(let d of r)d.t+c<s&&l.push(n(d,c));return r.concat(l)}return r.filter(l=>l.t<s).map(l=>l.d&&l.t+l.d>s?{...l,d:s-l.t}:l)};for(let r=0;r<4;r++)i.drum[r].hits=a(i.drum[r].hits,(n,l)=>({...n,t:n.t+l}));for(let r of["bass","lead"])i[r].notes=a(i[r].notes,(n,l)=>({...n,t:n.t+l}));if(i.gest)for(let r of["bass","lead","drum"]){let n=i.gest[r]||[];if(s>t){let l=[];for(let c=t;c<s;c+=t)for(let d of n)l.push({...d,p:d.p.map(h=>[h[0]+c,...h.slice(1)])});i.gest[r]=n.concat(l)}else i.gest[r]=n.map(l=>({...l,p:l.p.filter(c=>c[0]<s)})).filter(l=>l.p.length)}for(let r in i.auto)for(let n in i.auto[r]){let l=i.auto[r][n],c=s/12;i.auto[r][n]=Array.from({length:c},(d,h)=>l[h%l.length])}}o.bars=e}}function li(o,e,t,s,i,a=!0){if(Oo(o,e,e==="drum"?t:void 0,s,i),e==="drum"){let r=t==null?[0,1,2,3]:[t];for(let n of r)o.drum[n].hits=o.drum[n].hits.filter(l=>l.t<s||l.t>=i);if(a)for(let n of r)Xi(o,"d"+n,s,i)}else o[e].notes=o[e].notes.filter(r=>r.t<s||r.t>=i),a&&Xi(o,e,s,i)}function Oo(o,e,t,s,i){if(!o.gest||!o.gest[e])return;let a=[];for(let r of o.gest[e]){if(e==="drum"&&t!==void 0&&t!==null&&r.l!==t){a.push(r);continue}let n=r.p.filter(c=>c[0]<s),l=r.p.filter(c=>c[0]>=i);if(n.length===r.p.length){a.push(r);continue}for(let c of[n,l])c.length&&a.push({...r,p:c})}o.gest[e]=a}function Xi(o,e,t,s){let i=o.auto[e];if(i){for(let a in i){let r=i[a];for(let n=Math.floor(t/12);n<Math.ceil(s/12)&&n<r.length;n++)r[n]=-1;r.every(n=>n<0)&&delete i[a]}Object.keys(i).length||delete o.auto[e]}}function Ji(o,e,t){o.range=Vi(o.range,t,o.steps,e),o.steps=e}function ci(o){return o.drum.reduce((e,t)=>e+t.hits.length,0)+o.bass.notes.length+o.lead.notes.length}var _o=[{name:"Court",off:{bodyDecay:-1,boomDecay:-1,smpDecay:-1.5}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8,boomDecay:.6,smpDecay:.6}}],Io=[{name:"Frappe",def:.5,map:[["click",-.3,.45],["pAmt",-10,10],["clickTone",-.6,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1.2],["boomDecay",-1,1]]}],Bo={name:"Couleur",def:.6,map:[["tone",-2.6,0],["drive",-.12,.3]]},de=(o,e,t,s={})=>({id:"kick."+o,name:e,style:s.style||null,desc:s.desc||"",p:{kind:0,...t},samples:s.samples,variants:s.variants||_o,macros:s.macros||Io,expr:s.expr||Bo,trim:s.trim||0}),Zi=[["vd-kick-2-1",0,70],["vd-kick-3-1",71,104],["vd-kick-4-1",105,127],["vd-kick-4-2",105,127]],ea=[de("rond","Rond",{freq:50,pAmt:26,pDecay:.045,bodyDecay:.42,click:.3,clickTone:3200,drive:.15,driveType:3},{desc:"Rond et polyvalent, attaque douce"}),de("club","Club",{freq:53,pAmt:34,pDecay:.03,pAmt2:14,pDecay2:.003,bodyDecay:.34,bodyShape:.2,click:.5,clickTone:4500,drive:.3,driveType:1},{desc:"Punch de club, m\xE9dium pr\xE9sent"}),de("profond","Profond",{freq:43,pAmt:22,pDecay:.06,bodyDecay:.6,boom:.35,boomDecay:.9,click:.18,tone:6e3},{desc:"Grave profond, queue souple"}),de("808","808 long",{freq:46,pAmt:18,pDecay:.028,bodyDecay:.35,boom:.85,boomDecay:1.6,click:.22,clickTone:2500,drive:.12},{desc:"Grosse caisse 808 tenue",macros:[{name:"Glisse",def:.35,map:[["pDecay",-1,2.2],["pAmt",-6,14]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,1.2],["boom",-.4,.15]]}]}),de("feutre","Feutr\xE9",{freq:56,pAmt:14,pDecay:.05,bodyDecay:.28,click:.08,tone:2200,drive:.25,driveType:3},{desc:"Mat, chaud, presque acoustique"}),de("acoustique","Acoustique",{freq:52,pAmt:10,pDecay:.04,bodyDecay:.22,bodyLevel:.35,click:0,smpLevel:1.05,smpDecay:2},{desc:"Grosse caisse de batterie jazz, prises Virtuosity Drums",samples:Zi,macros:[{name:"Peau \u2194 Sub",def:.3,map:[["smpLevel",.15,-.6],["bodyLevel",-.25,.6]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.7,map:[["tone",-2.6,0],["drive",0,.35]]}}),de("sec","Sec",{freq:62,pAmt:30,pDecay:.018,bodyDecay:.16,click:.6,clickTone:5e3},{desc:"Tr\xE8s court, net, rapide"}),de("concert","Grosse caisse",{freq:45,pAmt:6,pDecay:.05,bodyDecay:.7,bodyLevel:.4,click:0,smpLevel:1.1,smpDecay:2.5},{desc:"Grosse caisse d\u2019orchestre (VCSL), ample",samples:[["vcsl-bassdrum"]],macros:[{name:"Ampleur",def:.5,map:[["smpDecay",-1.6,1],["bodyLevel",-.3,.4]]},{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]}]}),de("sature","Satur\xE9",{freq:54,pAmt:32,pDecay:.035,bodyDecay:.32,drive:.65,driveType:1,click:.4,tone:12e3},{desc:"Saturation franche, attaque mordante",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.28],["tone",-1,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),de("rebond","Rebond",{freq:50,pAmt:24,pDecay:.095,bodyDecay:.5,click:.25},{desc:"Chute de hauteur lente, \xE9lastique"}),de("sub","Sub",{freq:41,pAmt:10,pDecay:.04,bodyDecay:.8,click:.06,tone:3e3},{desc:"Presque une note de sub"}),de("clic","Clic",{freq:55,pAmt:28,pDecay:.014,bodyDecay:.3,click:1,clickTone:7e3,clickDecay:.0018},{desc:"Clic aigu tr\xE8s pr\xE9cis"}),de("vinyle","Vinyle",{freq:54,pAmt:16,pDecay:.04,bodyDecay:.3,bodyLevel:.6,crush:.3,tone:4e3,drive:.3,driveType:3,smpLevel:.8,smpDecay:1},{desc:"Kick poussi\xE9reux, micro lo-fi",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.25,.4],["tone",.6,-1]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]}),de("909","Neuf-z\xE9ro",{freq:54,pAmt:30,pDecay:.03,bodyDecay:.3,bodyShape:.45,click:.55,clickTone:6e3,clickDecay:.006},{desc:"Analogique techno, l\xE9g\xE8rement carr\xE9"}),de("boom","Boom",{freq:47,pAmt:22,pDecay:.04,bodyDecay:.3,boom:.55,boomDecay:1.1,drive:.2},{desc:"Hip-hop ample, queue tenue"}),de("papier","Papier",{freq:65,pAmt:20,pDecay:.02,bodyDecay:.14,click:.45,clickTone:1600,tone:4e3},{desc:"Sec et mat, comme un carton"}),de("plie","Pli\xE9",{freq:50,pAmt:30,pDecay:.03,bodyDecay:.4,drive:.45,driveType:2,tone:8e3},{desc:"Repliement d\u2019onde : grain harmonique",macros:[{name:"Pli",def:.4,map:[["drive",-.3,.45]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),de("cajon","Caj\xF3n",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse en bois frapp\xE9e (VCSL)",samples:[["vcsl-cajon-bass",0,127,0],["vcsl-cajon-mid",0,127,1],["vcsl-cajon-slap",0,127,2]],variants:[{name:"Basse"},{name:"Milieu"},{name:"Claque"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),de("cadre","Tambour sur cadre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Frame drum (VCSL), grave et feutr\xE9",samples:[["vcsl-frame-lo",0,127,0],["vcsl-frame-mute",0,127,1],["vcsl-frame-hi",0,127,2]],variants:[{name:"Ouvert"},{name:"\xC9touff\xE9"},{name:"Petit"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,3]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),de("tom","Tom grave",{freq:68,pAmt:7,pDecay:.05,bodyDecay:.45,bodyLevel:.45,click:0,smpLevel:1,smpDecay:2},{desc:"Tom basse de batterie + sous-couche synth\xE9tique",samples:[["vd-ltom-8",0,90],["vd-ltom-14",91,127]],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}]}),de("montagem","Montagem",{freq:50,pAmt:40,pDecay:.032,pAmt2:18,pDecay2:.003,bodyDecay:.45,bodyShape:.5,drive:.85,driveType:1,click:.5,tone:1e4,boom:.3,boomDecay:.7},{style:"phonk",desc:"\xC9cr\xEAt\xE9, agressif, pens\xE9 pour la montagem",macros:[{name:"\xC9cr\xEAtage",def:.5,map:[["drive",-.4,.15],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boom",-.3,.4],["boomDecay",-1,1]]}]}),de("garage","Garage",{freq:56,pAmt:28,pDecay:.028,bodyDecay:.26,click:.45,clickTone:5200,drive:.18,bodyShape:.15},{style:"ukg",desc:"Court et rebondi pour le 2-step"}),de("afroprofond","Afro profond",{freq:44,pAmt:16,pDecay:.06,bodyDecay:.5,click:.12,clickTone:2200,drive:.2,driveType:3,boom:.35,boomDecay:1,tone:5e3},{style:"afro",desc:"Profond, chaud, laisse respirer"}),de("pianofeutre","Piano feutre",{freq:51,pAmt:15,pDecay:.045,bodyDecay:.24,click:.14,tone:3200,drive:.15,driveType:3},{style:"amapiano",desc:"Discret, laisse la place au log drum"}),de("perreo","Perreo",{freq:57,pAmt:30,pDecay:.035,bodyDecay:.34,bodyShape:.25,click:.4,clickTone:3800,drive:.32,driveType:0},{style:"reggaeton",desc:"Rond et dense pour le dembow"}),de("jersey","Jersey",{freq:60,pAmt:44,pDecay:.02,pAmt2:12,pDecay2:.002,bodyDecay:.22,click:.75,clickTone:6e3,drive:.38,driveType:1},{style:"jersey",desc:"Tr\xE8s articul\xE9 pour les rafales"}),de("break","Break",{freq:55,pAmt:26,pDecay:.02,bodyDecay:.18,bodyLevel:.5,click:.2,drive:.25,smpLevel:1,smpDecay:.35},{style:"dnb",desc:"Acoustique serr\xE9 + sub court",samples:Zi,macros:[{name:"Peau \u2194 Sub",def:.45,map:[["smpLevel",.1,-.6],["bodyLevel",-.3,.5]]},{name:"Longueur",def:.5,map:[["smpDecay",-1,2],["bodyDecay",-1,1]]}]}),de("808rage","808 rage",{freq:45,pAmt:24,pDecay:.03,bodyDecay:.4,boom:.95,boomDecay:1.9,bodyShape:.35,drive:.55,driveType:0,click:.3,tone:9e3},{style:"rage",desc:"808 satur\xE9e et tenue",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.35],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,.8]]}]}),de("rumble","Rumble",{freq:45,pAmt:38,pDecay:.025,bodyDecay:.28,drive:.9,driveType:0,boom:.75,boomDecay:.9,click:.45,tone:5e3,hp:35},{style:"hardtechno",desc:"Kick dur avec tra\xEEne grave satur\xE9e",macros:[{name:"Rumble",def:.5,map:[["boom",-.5,.35],["boomDecay",-1,.8]]},{name:"Duret\xE9",def:.5,map:[["drive",-.4,.15],["click",-.3,.4]]}]}),de("poussiere","Poussi\xE8re",{freq:52,pAmt:18,pDecay:.05,bodyDecay:.4,click:.2,tone:1600,crush:.4,drive:.3,driveType:3,smpLevel:.6,smpDecay:1},{style:"triphop",desc:"\xC9touff\xE9 et granuleux, tempo lent",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.35,.45],["tone",1,-.6],["drive",-.2,.3]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]})];var Fo=[{name:"Fant\xF4me",off:{level:-9,noiseDecay:-.7,bodyDecay:-.5,smpDecay:-1}},{name:"Normal"},{name:"Ouvert",off:{noiseDecay:.8,bodyDecay:.4,revSend:.1,smpDecay:.8}}],No=[{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1],["noiseTone",-.8,.8]]}],zo={name:"Claquant",def:.5,map:[["snap",-.3,.45],["drive",-.05,.3]]},Uo=[{name:"Serr\xE9",off:{bursts:-1,noiseDecay:-.8}},{name:"Normal"},{name:"Large",off:{bursts:1,noiseDecay:.7,width:.3,revSend:.15}}],Ho=[{name:"Mains",def:.5,map:[["burstGap",-.6,.6],["bursts",-1,2]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["revSend",-.05,.3]]}],jo={name:"\xC9clat",def:.5,map:[["noiseTone",-.5,.6],["drive",-.05,.3]]},Go=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.6]]}],Wo={name:"Couleur",def:.6,map:[["tone",-2.3,0],["drive",-.05,.3]]},pe=(o,e,t,s={})=>({id:"snare."+o,name:e,style:s.style||null,desc:s.desc||"",p:{kind:1,freq:190,...t},samples:s.samples,variants:s.variants||(t.kind===2?Uo:Fo),macros:s.macros||(t.kind===2?Ho:t.kind===7?Go:No),expr:s.expr||(t.kind===2?jo:t.kind===7?Wo:zo),trim:s.trim||0}),hi=[["vd-snare-8",0,50],["vd-snare-16",51,80],["vd-snare-24",81,100],["vd-snare-32",101,117],["vd-snare-36",118,127]],Rs=[["vd-xstick-6",0,60],["vd-xstick-12",61,100],["vd-xstick-16",101,127]],Es=[["vcsl-clap-1"],["vcsl-clap-2"],["vcsl-clap-3"]],As=(o,e)=>o.map(([t,s=0,i=127])=>[t,s,i,e]),ta=[pe("classique","Classique",{pAmt:6,pDecay:.03,bodyDecay:.1,body2:.5,ratio2:1.62,noiseLevel:.8,noiseTone:9e3,noiseHP:800,noiseDecay:.2,snap:.5,clickTone:4500},{desc:"Caisse claire analogique \xE9quilibr\xE9e"}),pe("clap808","Clap 808",{kind:2,noiseLevel:1,noiseTone:1150,noiseQ:.4,noiseHP:600,noiseDecay:.18,bursts:4,burstGap:.0085,width:.4},{desc:"Clap analogique classique"}),pe("rim","Rimshot",{kind:4,freq:520,mdMat:7,bodyDecay:.13,mdHard:.9,click:.35,clickTone:3500},{desc:"Cercle de caisse claire, bois\xE9 et court",macros:[{name:"Accord",def:.5,map:[["tune",-5,5]]},{name:"R\xE9sonance",def:.4,map:[["bodyDecay",-1,1.4]]}],expr:{name:"Frappe",def:.6,map:[["mdHard",-.4,.1],["click",-.3,.15],["level",2.5,-2]]}}),pe("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse claire jazz (Virtuosity Drums) : cross-stick, centre, buzz",samples:[...As(Rs,0),...As(hi,1),["vd-buzz-6",0,80,2],["vd-buzz-12",81,127,2]],variants:[{name:"Cross-stick"},{name:"Centre"},{name:"Buzz"}]}),pe("sanstimbre","Sans timbre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Timbre rel\xE2ch\xE9 : son de tom sec",samples:[["vd-snoff-6",0,80],["vd-snoff-12",81,127]],variants:[{name:"Grave",off:{smpTune:-3}},{name:"Normal"},{name:"Aigu",off:{smpTune:3}}]}),pe("fantome","Fant\xF4me",{freq:210,pAmt:4,bodyDecay:.06,noiseLevel:.5,noiseTone:7e3,noiseHP:1200,noiseDecay:.09,snap:.2,level:-3},{desc:"L\xE9ger, pour les notes fant\xF4mes"}),pe("crepitant","Cr\xE9pitant",{pAmt:5,bodyDecay:.12,bodyLevel:.6,noiseLevel:1,noiseTone:6e3,noiseHP:400,noiseDecay:.45,crush:.15,snap:.3},{desc:"Longue queue de grain"}),pe("clapserre","Clap serr\xE9",{kind:2,noiseLevel:1,noiseTone:1600,noiseQ:.35,noiseHP:700,noiseDecay:.08,bursts:2,burstGap:.005,width:.25},{desc:"Clap court et pr\xE9cis"}),pe("claplarge","Clap large",{kind:2,noiseLevel:1,noiseTone:1050,noiseQ:.25,noiseHP:500,noiseDecay:.4,bursts:5,burstGap:.011,width:1,revSend:.25},{desc:"Clap ample en st\xE9r\xE9o"}),pe("doigts","Claquement",{kind:2,noiseLevel:1.1,noiseTone:2600,noiseQ:.7,noiseHP:1500,noiseDecay:.05,bursts:1,burstGap:.004,width:.1},{desc:"Claquement de doigts sec"}),pe("mains","Mains",{kind:7,smpLevel:1,smpDecay:3},{desc:"Vrais claps (VCSL) : seul, groupe, groupe en salle",samples:[["vcsl-soloclap-2",0,90,0],["vcsl-soloclap-3",91,127,0],...As(Es,1),...As(Es,2)],variants:[{name:"Seul"},{name:"Groupe"},{name:"Salle",off:{revSend:.3}}]}),pe("lofi","Lo-fi",{pAmt:8,bodyDecay:.1,body2:.4,noiseLevel:.85,noiseTone:7e3,noiseHP:900,noiseDecay:.18,crush:.5,tone:5e3,snap:.3},{desc:"\xC9chantillonneur vieilli, 8 bits",macros:[{name:"Usure",def:.5,map:[["crush",-.35,.35],["tone",.8,-.8]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1]]}]}),pe("metal","M\xE9tal",{freq:240,pAmt:3,bodyDecay:.35,body2:.9,ratio2:2.31,noiseLevel:.6,noiseTone:9e3,noiseHP:1500,noiseDecay:.16,snap:.4},{desc:"R\xE9sonance m\xE9tallique accord\xE9e",macros:[{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.2,1],["body2",-.5,.1]]},{name:"Accord",def:.5,map:[["tune",-6,6]]}]}),pe("tomsnare","Tom-caisse",{freq:160,pAmt:12,pDecay:.05,bodyDecay:.22,body2:.3,ratio2:1.5,noiseLevel:.35,noiseTone:6e3,noiseHP:700,noiseDecay:.12},{desc:"Tonal, \xE0 mi-chemin du tom"}),pe("balai","Balai",{bodyLevel:.15,bodyDecay:.05,noiseLevel:.9,noiseTone:5e3,noiseHP:1200,noiseDecay:.3,noiseAttack:.03,snap:0},{desc:"Frottement de balai, attaque lente",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.5,1.2],["noiseDecay",-.7,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.8],["noiseHP",-.6,.6]]}]}),pe("electro","\xC9lectro",{freq:230,pAmt:18,pDecay:.02,bodyDecay:.12,noiseLevel:.9,noiseTone:12e3,noiseHP:1800,noiseDecay:.16,snap:.8,clickTone:6e3,drive:.3,driveType:1},{desc:"Brillant, chute de hauteur rapide"}),pe("snareclap","Caisse + clap",{pAmt:6,bodyDecay:.1,body2:.4,noiseLevel:.6,noiseTone:8e3,noiseHP:1e3,noiseDecay:.16,snap:.3,smpLevel:.7,smpDecay:2},{desc:"Caisse synth\xE9tique doubl\xE9e de vrais claps",samples:Es,macros:[{name:"Caisse \u2194 Clap",def:.5,map:[["smpLevel",-.5,.5],["noiseLevel",.3,-.4],["bodyLevel",.2,-.5]]},{name:"Queue",def:.5,map:[["noiseDecay",-1,1],["smpDecay",-2.5,.5],["revSend",-.05,.25]]}]}),pe("ressort","Ressort",{freq:180,pAmt:9,pDecay:.06,bodyDecay:.6,body2:.7,ratio2:1.45,noiseLevel:.5,noiseTone:7e3,noiseHP:900,noiseDecay:.25,drive:.2},{desc:"Corps qui sonne longtemps"}),pe("roulement","Roulement",{kind:7,smpLevel:1,smpDecay:3},{desc:"Buzz de caisse claire (roul\xE9 press\xE9)",samples:[["vd-buzz-6",0,80],["vd-buzz-12",81,127]]}),pe("crossstick","Cross-stick",{kind:7,smpLevel:1,smpDecay:3},{desc:"Baguette pos\xE9e sur le cercle",samples:Rs}),pe("clapmontagem","Clap montagem",{kind:2,noiseLevel:1,noiseTone:1400,noiseQ:.3,noiseHP:600,noiseDecay:.2,bursts:3,burstGap:.007,drive:.8,driveType:1,width:.4},{style:"phonk",desc:"Clap \xE9cras\xE9, tr\xE8s pr\xE9sent"}),pe("garage","Garage snare",{freq:220,pAmt:8,bodyDecay:.07,noiseLevel:.85,noiseTone:11e3,noiseHP:1500,noiseDecay:.11,snap:.6,smpLevel:.4,smpDecay:1},{style:"ukg",desc:"Sec et nerveux pour le 2-step",samples:Rs}),pe("clapafro","Clap afro",{kind:2,noiseLevel:.9,noiseTone:1e3,noiseQ:.2,noiseHP:450,noiseDecay:.3,bursts:4,burstGap:.012,width:.9,revSend:.2},{style:"afro",desc:"Doux, large, a\xE9r\xE9"}),pe("rimpiano","Rim piano",{kind:4,freq:600,mdMat:7,bodyDecay:.06,mdHard:.8,click:.4,bodyLevel:.5,smpLevel:.7,smpDecay:1},{style:"amapiano",desc:"Rimshot bois\xE9 et feutr\xE9",samples:Rs,macros:[{name:"Accord",def:.5,map:[["tune",-5,5],["smpTune",-5,5]]},{name:"Bois \u2194 Baguette",def:.5,map:[["bodyLevel",-.4,.4],["smpLevel",.4,-.5]]}]}),pe("dembow","Snare dembow",{freq:200,pAmt:10,bodyDecay:.08,noiseLevel:.9,noiseTone:8e3,noiseHP:1200,noiseDecay:.12,snap:.7,drive:.2},{style:"reggaeton",desc:"Claquant et court"}),pe("clapjersey","Clap jersey",{kind:2,noiseLevel:1,noiseTone:1300,noiseQ:.3,noiseHP:600,noiseDecay:.22,bursts:4,burstGap:.008,drive:.35,driveType:1,smpLevel:.5,smpDecay:2},{style:"jersey",desc:"Clap \xE9norme, doubl\xE9",samples:Es,macros:[{name:"Synth\xE9 \u2194 Mains",def:.4,map:[["smpLevel",-.45,.7],["noiseLevel",.3,-.6]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["smpDecay",-2,.5],["revSend",-.05,.3]]}]}),pe("dnb","Snare DnB",{freq:200,bodyDecay:.1,bodyLevel:.5,noiseLevel:.6,noiseTone:9e3,noiseHP:1200,noiseDecay:.16,snap:.6,drive:.3,smpLevel:1,smpDecay:1.5},{style:"dnb",desc:"Crack acoustique renforc\xE9",samples:hi,macros:[{name:"Crack",def:.5,map:[["snap",-.3,.5],["drive",-.2,.35]]},{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3],["smpTune",-2,2]]}]}),pe("claprage","Clap rage",{kind:2,noiseLevel:1,noiseTone:1250,noiseQ:.3,noiseHP:500,noiseDecay:.25,bursts:3,burstGap:.009,width:1,drive:.5,revSend:.2},{style:"rage",desc:"Large et satur\xE9"}),pe("industriel","Clap industriel",{kind:2,noiseLevel:1,noiseTone:1800,noiseQ:.55,noiseHP:700,noiseDecay:.35,bursts:4,burstGap:.01,drive:.6,driveType:2,width:.6,revSend:.3},{style:"hardtechno",desc:"R\xE9sonance m\xE9tallique, salle froide"}),pe("poussiere","Snare poussi\xE8re",{kind:7,smpLevel:1,smpDecay:3,crush:.35,tone:4500,drive:.3,driveType:3,revSend:.15},{style:"triphop",desc:"Caisse claire us\xE9e, lente",samples:hi})];var Vo=[{name:"Ferm\xE9"},{name:"Mi-ouvert",off:{noiseDecay:1.3}},{name:"Ouvert",off:{noiseDecay:2.6,revSend:.05}}],Yo=[{name:"M\xE9tal \u2194 Souffle",def:.5,map:[["metal",.35,-.5]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.7],["noiseHP",-.7,.5]]}],Ko={name:"Longueur",def:.4,map:[["noiseDecay",-.7,1],["smpDecay",-1.5,1]]},Xo=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Brillance",def:.6,map:[["tone",-2.4,0],["hp",0,1.6]]}],$o={name:"Longueur",def:.65,map:[["smpDecay",-3,.5]]},fe=(o,e,t,s={})=>({id:"hat."+o,name:e,style:s.style||null,desc:s.desc||"",p:{kind:3,freq:400,noiseLevel:.8,...t},samples:s.samples,variants:s.variants||Vo,macros:s.macros||(t.kind===7?Xo:Yo),expr:s.expr||(t.kind===7?$o:Ko),trim:s.trim||0}),sa=[["vd-hh-closed-2-1",0,80,0],["vd-hh-closed-2-2",0,80,0],["vd-hh-closed-4-1",81,127,0],["vd-hh-closed-4-2",81,127,0],["vd-hh-half-3",0,127,1],["vd-hh-open-3",0,127,2]],ia=[{name:"Doux",off:{level:-5}},{name:"Normal"},{name:"Long",off:{smpDecay:1,revSend:.08}}],aa=[fe("analogique","Analogique",{metal:.75,noiseTone:9e3,noiseHP:6500,noiseDecay:.06},{desc:"M\xE9tallique fa\xE7on bo\xEEte \xE0 rythmes"}),fe("bruit","Bruit blanc",{metal:0,noiseTone:1e4,noiseHP:7e3,noiseDecay:.05,width:.5},{desc:"Souffle pur, tr\xE8s lisible"}),fe("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Charleston jazz (Virtuosity Drums) : ferm\xE9, mi-ouvert, ouvert",samples:sa,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]}),fe("ride","Ride",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Cymbale ride : frappe, cloche",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Forte"}]}),fe("crash","Crash",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Crash et cymbale \xE0 rivets",samples:[["vd-crash-2-1",0,127,0],["vd-crash-2-1",0,127,1],["vd-sizzle-2-1",0,127,2]],variants:[{name:"Court",off:{smpDecay:-2.5}},{name:"Crash"},{name:"Rivets"}]}),fe("fin","Fin",{metal:.5,noiseTone:13e3,noiseHP:9e3,noiseDecay:.04},{desc:"Petit tic aigu"}),fe("sombre","Sombre",{metal:.6,metalTune:-7,noiseTone:6e3,noiseHP:3500,noiseDecay:.08},{desc:"Grave et feutr\xE9"}),fe("brillant","Brillant",{metal:.4,noiseTone:14e3,noiseHP:8e3,noiseDecay:.07,width:.7},{desc:"Air et brillance"}),fe("lofi","Lo-fi",{metal:.6,noiseTone:9e3,noiseHP:5e3,noiseDecay:.06,crush:.45,tone:9e3},{desc:"Granuleux, r\xE9duit en bits"}),fe("tss","Tss",{metal:.2,noiseTone:11e3,noiseHP:6e3,noiseDecay:.2,noiseAttack:.008},{desc:"Souffle ouvert, attaque douce"}),fe("shaker","Shaker",{kind:7,smpLevel:1,smpDecay:4},{desc:"Shaker (Virtuosity Drums) aller / retour",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-shaker-d",0,127,2],["vd-shaker-u",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Altern\xE9"}]}),fe("tambourin","Tambourin",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Tambourin secou\xE9",samples:[["vd-tamb-1"],["vd-tamb-2"]],variants:ia}),fe("triangle","Triangle",{kind:7,smpLevel:1,smpDecay:6,choke:1},{desc:"Triangle \xE9touff\xE9 ou ouvert",samples:[["vd-tri-mute",0,127,0],["vd-tri-open",0,127,1],["vd-tri-open",0,127,2]],variants:[{name:"\xC9touff\xE9"},{name:"Ouvert"},{name:"Long",off:{revSend:.15}}]}),fe("cabasa","Cabasa",{kind:7,smpLevel:1,smpDecay:4},{desc:"Perles m\xE9talliques frott\xE9es",samples:[["vd-cabasa"]],variants:ia}),fe("charleston2","Charleston clair",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Autre charleston (VCSL) : ferm\xE9, l\xE2che, ouvert",samples:[["vcsl-hh-closed",0,127,0],["vcsl-hh-loose",0,127,1],["vcsl-hh-open",0,127,2]],variants:[{name:"Ferm\xE9"},{name:"L\xE2che"},{name:"Ouvert"}]}),fe("clochette","Clochette",{metal:1,metalTune:12,noiseTone:8e3,noiseHP:4e3,noiseDecay:.15},{desc:"M\xE9tal accord\xE9, presque une cloche"}),fe("grain","Granuleux",{kind:6,noiseTone:9e3,noiseQ:.3,noiseHP:5e3,noiseDecay:.07,noiseAttack:.004,bodyShape:.75,noiseLevel:1},{desc:"Grains de sable irr\xE9guliers",macros:[{name:"Grain",def:.5,map:[["bodyShape",-.5,.25]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),fe("large","St\xE9r\xE9o",{metal:.3,noiseTone:1e4,noiseHP:6e3,noiseDecay:.09,width:1},{desc:"Ouvert dans l\u2019image st\xE9r\xE9o"}),fe("pichenette","Pichenette",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Cymbalettes \xE0 doigts (VCSL)",samples:[["vcsl-fingercym"]],variants:[{name:"Court",off:{smpDecay:-3}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),fe("pedale","P\xE9dale",{metal:.5,noiseTone:7e3,noiseHP:5e3,noiseDecay:.025,noiseAttack:.004},{desc:"Chick sec de p\xE9dale"}),fe("drift","Hat drift",{metal:.7,noiseTone:1e4,noiseHP:7500,noiseDecay:.045,drive:.4},{style:"phonk",desc:"Court et croustillant"}),fe("garage","Hat garage",{metal:.55,noiseTone:11e3,noiseHP:7e3,noiseDecay:.055,width:.4},{style:"ukg",desc:"Swing et ouvertures nettes"}),fe("shakerafro","Shaker afro",{kind:7,smpLevel:1,smpDecay:4,revSend:.18,tone:7e3,smpTune:-2},{style:"afro",desc:"Shaker organique, un peu d\u2019espace",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-cabasa",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Cabasa"}]}),fe("shakerpiano","Shaker piano",{kind:6,noiseTone:7500,noiseQ:.3,noiseHP:4e3,noiseDecay:.14,noiseAttack:.02,bodyShape:.4,width:.6,noiseLevel:1},{style:"amapiano",desc:"Long shaker soyeux",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.2,1],["noiseDecay",-.6,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),fe("perreo","Hat perreo",{metal:.65,noiseTone:9500,noiseHP:6e3,noiseDecay:.05},{style:"reggaeton",desc:"R\xE9gulier et lisible"}),fe("jersey","Hat jersey",{metal:.5,noiseTone:12e3,noiseHP:8e3,noiseDecay:.035,drive:.25},{style:"jersey",desc:"Pointu pour les doubles croches"}),fe("ridednb","Ride DnB",{kind:7,smpLevel:1,smpDecay:.7,hp:1800,choke:1},{style:"dnb",desc:"Ride serr\xE9e et rapide",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Ouverte",off:{smpDecay:2}}]}),fe("trap","Hat trap",{metal:.8,noiseTone:10500,noiseHP:8e3,noiseDecay:.03,drive:.2},{style:"rage",desc:"Tr\xE8s serr\xE9, fait pour les roulements"}),fe("industriel","Hat industriel",{metal:.3,noiseTone:9e3,noiseHP:5e3,noiseDecay:.25,drive:.7,driveType:2,revSend:.1},{style:"hardtechno",desc:"Ouvert, dur, satur\xE9"}),fe("vinyle","Hat vinyle",{kind:7,smpLevel:1,smpDecay:4,crush:.4,tone:6e3,choke:1},{style:"triphop",desc:"Charleston us\xE9 et sombre",samples:sa,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]})];var Qo=[{name:"Grave",off:{tune:-5,smpTune:-5}},{name:"M\xE9dium"},{name:"Aigu",off:{tune:5,smpTune:5}}],Jo=[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"R\xE9sonance",def:.6,map:[["smpDecay",-2.5,.6],["revSend",-.05,.25]]}],Zo={name:"Couleur",def:.6,map:[["tone",-2.4,0],["drive",-.05,.3]]},er=[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.3,1.3]]}],tr={name:"Frappe",def:.6,map:[["mdHard",-.4,.2],["click",-.2,.15],["level",2.5,-2]]},me=(o,e,t,s={})=>({id:"perc."+o,name:e,style:s.style||null,desc:s.desc||"",p:{kind:7,smpLevel:1,smpDecay:4,...t},samples:s.samples,variants:s.variants||Qo,macros:s.macros||((t.kind??7)===7?Jo:er),expr:s.expr||((t.kind??7)===7?Zo:tr),trim:s.trim||0}),He=(...o)=>o.flatMap((e,t)=>e.map(([s,i=0,a=127])=>[s,i,a,t])),oa=[me("conga","Conga",{},{desc:"Tumba, conga ouverte, conga \xE9touff\xE9e (Virtuosity Drums)",samples:He([["vd-tumba"]],[["vd-conga-open-lo",0,100],["vd-conga-open-hi",101,127]],[["vd-conga-mute"]]),variants:[{name:"Tumba"},{name:"Ouverte"},{name:"\xC9touff\xE9e"}]}),me("bongo","Bongo",{},{desc:"Paire de bongos",samples:He([["vd-bongo-lo"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),me("cloche","Cloche",{},{desc:"Cloche de vache r\xE9elle",samples:[["vd-cowbell-1",0,90],["vd-cowbell-2",91,127]]}),me("cloche808","Cloche 808",{kind:5,freq:540,ratio2:1.48,bodyDecay:.06,noiseDecay:.35,noiseTone:2600,noiseQ:.3,bodyLevel:1},{desc:"Cloche analogique \xE0 deux oscillateurs",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.5,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.5,map:[["noiseTone",-.6,.6],["drive",0,.4]]}}),me("agogo","Agog\xF4",{},{desc:"Cloches agog\xF4 grave et aigu\xEB",samples:He([["vd-agogo-lo"]],[["vd-agogo-hi"]],[["vd-agogo-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Aigu\xEB tendue",off:{smpTune:2}}]}),me("claves","Claves",{},{desc:"Deux b\xE2tons de bois",samples:[["vd-claves-1",0,90],["vd-claves-2",91,127]]}),me("bloc","Wood-block",{},{desc:"Bloc de bois grave / aigu",samples:He([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-woodblock-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Tr\xE8s aigu",off:{smpTune:4}}]}),me("guiro","G\xFCiro",{},{desc:"R\xE2pe en bois",samples:[["vd-guiro"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long"}]}),me("timbales","Timbales",{},{desc:"Timbales latines",samples:He([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Sec",off:{smpDecay:-2}}]}),me("cuica","Cu\xEDca",{},{desc:"Tambour \xE0 friction br\xE9silien",samples:He([["vd-cuica-1"]],[["vd-cuica-2"]],[["vd-cuica-2"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Tr\xE8s aigu\xEB",off:{smpTune:4}}]}),me("darbuka","Darbouka",{},{desc:"Frappes de darbouka (VCSL)",samples:He([["vcsl-darbuka-1"],["vcsl-darbuka-2"]],[["vcsl-darbuka-3"]],[["vcsl-darbuka-4"],["vcsl-darbuka-5"]]),variants:[{name:"Centre"},{name:"Bord"},{name:"Claque"}]}),me("cajon","Caj\xF3n aigu",{},{desc:"Claques de caj\xF3n",samples:He([["vcsl-cajon-mid"]],[["vcsl-cajon-slap"]],[["vcsl-cajon-slap"]]),variants:[{name:"Milieu"},{name:"Claque"},{name:"Claque s\xE8che",off:{smpDecay:-2}}]}),me("fente","Tambour \xE0 fente",{},{desc:"Log drum en bois (VCSL)",samples:He([["vcsl-slit-lo"]],[["vcsl-slit-hi"]],[["vcsl-slit-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),me("toms","Toms",{},{desc:"Toms de batterie",samples:He([["vd-ltom-8",0,90],["vd-ltom-14",91,127]],[["vd-htom-8",0,90],["vd-htom-14",91,127]],[["vd-htom-14"]]),variants:[{name:"Basse"},{name:"Haute"},{name:"Haute tendue",off:{smpTune:3}}]}),me("goutte","Goutte",{kind:4,freq:900,mdMat:2,pAmt:12,pDecay:.02,bodyDecay:.4,mdHard:.4,revSend:.1},{desc:"Goutte de verre accord\xE9e"}),me("boisynth","Bois synth\xE9tique",{kind:4,freq:750,mdMat:0,bodyDecay:.2,mdHard:.7,click:.2},{desc:"R\xE9sonateur de bois"}),me("tom808","Tom 808",{kind:8,freq:120,mdMat:3,pAmt:10,pDecay:.1,bodyDecay:.45,mdHard:.5},{desc:"Tom analogique qui chute"}),me("vibraslap","Vibraslap",{},{desc:"Claquement vibrant",samples:[["vd-vibraslap"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),me("enclume","Enclume",{drive:.15},{desc:"M\xE9taux frapp\xE9s : enclume, tambours de frein",samples:He([["vcsl-anvil"]],[["vcsl-brake-1"]],[["vcsl-brake-2"]]),variants:[{name:"Enclume"},{name:"Frein 1"},{name:"Frein 2"}]}),me("blip","Blip",{kind:4,freq:1200,mdMat:4,pAmt:24,pDecay:.008,bodyDecay:.11,mdHard:.9},{desc:"Bip synth\xE9tique zapp\xE9"}),me("clochephonk","Cloche phonk",{kind:5,freq:560,ratio2:1.48,bodyDecay:.08,noiseDecay:.25,noiseTone:2800,noiseQ:.35,drive:.5,driveType:1},{style:"phonk",desc:"Cloche satur\xE9e, jouable en m\xE9lodie (axe vertical = hauteur)",variants:[{name:"Courte",off:{noiseDecay:-1.2}},{name:"Normale"},{name:"Longue",off:{noiseDecay:.8}}],macros:[{name:"Saturation",def:.5,map:[["drive",-.4,.4]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.2,1]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),me("toc","Toc garage",{kind:4,freq:950,mdMat:0,bodyDecay:.12,mdHard:.85,click:.25,clickTone:5e3,drive:.1},{style:"ukg",desc:"Bois tr\xE8s court pour le shuffle"}),me("djembe","Peau afro",{kind:8,freq:220,mdMat:3,pAmt:14,pDecay:.03,bodyDecay:.25,noiseLevel:.4,noiseDecay:.05,noiseHP:1500,noiseTone:6e3,click:.4,clickTone:3e3},{style:"afro",desc:"Peau synth\xE9tique avec claque",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Peau \u2194 Claque",def:.4,map:[["noiseLevel",-.3,.6],["bodyLevel",.2,-.4]]}]}),me("logdrum","Log drum",{kind:8,freq:90,mdMat:3,pAmt:19,pDecay:.05,bodyDecay:.5,mdHard:.7,drive:.3,driveType:3},{style:"amapiano",desc:"Log drum percussif (axe vertical = hauteur)",variants:[{name:"Court",off:{bodyDecay:-1}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8}}],macros:[{name:"Glisse",def:.5,map:[["pAmt",-10,10],["pDecay",-.6,.8]]},{name:"Grain",def:.4,map:[["drive",-.25,.45],["mdHard",-.3,.3]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),me("timbal","Timbal perreo",{smpDecay:.8,drive:.3,smpTune:2,hp:300,tone:9e3},{style:"reggaeton",desc:"Timbales s\xE8ches pour le dembow",samples:He([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Ouverte",off:{smpDecay:2}}]}),me("couinement","Couinement",{kind:4,freq:1400,mdMat:4,pAmt:7,pDecay:.06,bodyDecay:.22,mdHard:.9,drive:.2},{style:"jersey",desc:"Petit cri synth\xE9tique, original"}),me("tombreak","Tom break",{smpDecay:.6,drive:.25},{style:"dnb",desc:"Toms tendus pour les breaks",samples:He([["vd-ltom-14"]],[["vd-htom-14"]],[["vd-snoff-12"]]),variants:[{name:"Tom basse"},{name:"Tom haute"},{name:"Caisse sans timbre"}]}),me("laser","Laser",{kind:4,freq:1600,mdMat:4,pAmt:30,pDecay:.01,bodyDecay:.13,mdHard:1,drive:.4},{style:"rage",desc:"Bip laser satur\xE9"}),me("metalindus","M\xE9tal industriel",{drive:.6,driveType:2,revSend:.2},{style:"hardtechno",desc:"Freins frapp\xE9s, satur\xE9s, salle froide",samples:He([["vcsl-brake-1"]],[["vcsl-brake-2"]],[["vcsl-anvil"]]),variants:[{name:"Frein 1"},{name:"Frein 2"},{name:"Enclume"}]}),me("boisfeutre","Bois feutr\xE9",{tone:2500,crush:.2,revSend:.2},{style:"triphop",desc:"Bois \xE9touff\xE9 et lointain",samples:He([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-claves-1"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Claves"}]})];var ve=(o,e,t,s,i,a,r,n={})=>({id:"bass."+o,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||1,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.03,aA:.003,aR:.08,...s},groups:i,macros:a,expr:r,trim:n.trim||0}),k=(o,e,t)=>({name:o,def:e,map:t}),ht=[k("\xC9cho",0,[["dlMix",0,.35],["dlFb",0,.3]]),k("Salle",.1,[["rvSend",-.03,.3]])],ui=[ve("sub","Sub pur","va",{osc1Wave:3,fType:4,vDrive:.15,vDriveType:3,aD:.3,aS:.95,aR:.12,osc2Wave:3,osc2Semi:12,osc2Level:0},["Chaleur","Forme","Glisse"],[k("Harmoniques",.3,[["vDrive",-.15,.5]]),k("Octave",0,[["osc2Level",0,.55]]),k("Attaque",.2,[["aA",-.5,6]]),k("Rel\xE2che",.3,[["aR",-.8,2.5]]),k("Glisse",.4,[["glide",-2,2.5],["pEnvAmt",0,5],["pEnvTime",0,1]]),k("Tenue",.8,[["aS",-.6,.05],["aD",-1,1]])],{name:"Grain",def:.3,map:[["fxDrive",0,.45],["fxLP",0,-1.5]]},{desc:"Sinus pur, grave centr\xE9"}),ve("moog","Moog rond","va",{osc1Wave:0,fType:0,cutoff:280,reso:.35,fEnv:3.2,fD:.22,fS:.15,keyTrack:.4,subLevel:.5,aS:.9},["Filtre","Enveloppe","Couleur"],[k("Ouverture",.45,[["cutoff",-1.5,2]]),k("R\xE9sonance",.4,[["reso",-.35,.6],["cutoff",0,.5]]),k("Mordant",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.45,[["fD",-1.5,1.6]]),k("Saturation",.2,[["fDrive",0,.8]]),k("Sub",.5,[["subLevel",-.5,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,2]]},{desc:"Analogique classique, rond et souple"}),ve("acide","Acide","va",{osc1Wave:0,osc2Wave:1,osc2Level:0,fType:0,cutoff:380,reso:.82,fEnv:4,fD:.16,fS:0,keyTrack:.5,velFilt:.7,glide:.07,aD:.25,aS:.7,aR:.06,vDrive:.2},["Filtre","Accent","Grain"],[k("Coupure",.4,[["cutoff",-1.5,2.2]]),k("R\xE9sonance",.7,[["reso",-.45,.14]]),k("Enveloppe",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.4,[["fD",-1.4,1.8]]),k("Distorsion",.25,[["vDrive",-.2,.7]]),k("Scie \u2194 Carr\xE9",0,[["osc1Level",0,-1],["osc2Level",0,1]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{desc:"Ligne acide r\xE9sonante, glisse sur les liaisons"}),ve("reese","Reese","va",{osc1Wave:0,unison:3,detune:18,spread:.35,osc2Wave:0,osc2Semi:-12,osc2Level:.3,fType:0,cutoff:900,reso:.15,fEnv:.5,subLevel:.6,chMix:.2,lfoRate:.25,aS:1,aR:.15},["Battement","Filtre","Largeur"],[k("D\xE9saccord",.4,[["detune",-12,25]]),k("Mouvement",.3,[["lfoCut",0,1.6]]),k("Ouverture",.45,[["cutoff",-1.5,1.8]]),k("Mordant",.25,[["fDrive",0,.8]]),k("Largeur",.4,[["spread",-.35,.6],["chMix",-.2,.4]]),k("Sub",.6,[["subLevel",-.6,.4]])],{name:"Ouverture",def:.4,map:[["cutoff",-1.2,1.6]]},{desc:"Scies d\xE9saccord\xE9es qui battent lentement"}),ve("808","808 gliss\xE9e","va",{osc1Wave:3,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.3,vDriveType:0,glide:.09,aD:1.5,aS:.6,aR:.2},["Saturation","Glisse","Queue"],[k("Saturation",.4,[["vDrive",-.3,.5]]),k("Mordant",.2,[["fxDrive",0,.5]]),k("Glisse",.45,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-10,12]]),k("Queue",.5,[["aD",-1.5,1.5]]),k("Tenue",.5,[["aS",-.5,.35]])],{name:"Saturation",def:.4,map:[["vDrive",-.25,.45]]},{desc:"808 accord\xE9e, les notes qui se chevauchent glissent",glideMode:"legato"}),ve("fm","FM grave","fm",{fmAlgo:0,fmR1:1,fmR2:1,fmL2:2.5,fmD2:.25,fmS2:.2,fmR3:3,fmL3:.6,fmD3:.12,fmS3:0,fmL4:0,fType:4,aS:.85,aR:.1},["Brillance","M\xE9tal","Espace"],[k("Indice",.45,[["fmL2",-2,3]]),k("D\xE9clin",.45,[["fmD2",-1.5,2]]),k("Rapport",0,[["fmR2",0,2.5]]),k("R\xE9troaction",0,[["fmFb",0,.7],["fmL4",0,1.5]]),...ht],{name:"Indice",def:.4,map:[["fmL2",-1.5,2.5]]},{desc:"Basse FM num\xE9rique, attaque brillante"}),ve("pluck","Pluck basse","va",{osc1Wave:0,osc2Wave:1,osc2Level:.4,fType:0,cutoff:200,reso:.25,fEnv:4.5,fD:.12,aD:.35,aS:.2,aR:.1},["Pincement","Corps","Espace"],[k("Pincement",.5,[["fEnv",-2.5,2.5],["fD",-.8,.8]]),k("R\xE9sonance",.3,[["reso",-.2,.5]]),k("Longueur",.4,[["aD",-1,2],["aS",-.15,.5]]),k("Grave",.3,[["subLevel",0,.8]]),...ht],{name:"Brillance",def:.4,map:[["cutoff",-1,2]]},{desc:"Court et articul\xE9 pour la house"}),ve("orgue","Orgue basse","wt",{wtTable:4,wtPos:.35,subLevel:.6,fType:1,cutoff:2500,reso:0,fEnv:0,fD:.06,chMix:.15,chRate:.8,aA:.002,aS:1,aR:.06},["Tirettes","Percussion","Rotation"],[k("Tirettes",.35,[["wtPos",-.35,.65]]),k("Sub",.6,[["subLevel",-.6,.4]]),k("Clic",.2,[["fEnv",0,3.5]]),k("Douceur",0,[["cutoff",0,-2.2]]),k("Rotation",.2,[["chMix",-.15,.6],["chRate",0,2.6]]),k("Saturation",.1,[["fxDrive",0,.5]])],{name:"Tirettes",def:.4,map:[["wtPos",-.3,.5]]},{desc:"Orgue grave fa\xE7on house/garage"}),ve("contrebasse","Contrebasse","pluck",{pkDecay:1.2,pkDamp:.55,pkBright:.45,pkBody:.5,fType:1,cutoff:3e3,glide:.06,aS:1,aR:.15},["Corde","Caisse","Doigt"],[k("Tension",.5,[["pkDamp",.45,-.45],["pkBright",-.2,.25]]),k("R\xE9sonance",.5,[["pkDecay",-1.2,1.4]]),k("Caisse",.5,[["pkBody",-.4,.4]]),k("Bois\xE9",.5,[["cutoff",-1.6,1]]),k("Attaque",.45,[["pkBright",-.35,.45]]),k("Glisse",.3,[["glide",-2,2]])],{name:"Attaque",def:.45,map:[["pkBright",-.3,.4]]},{desc:"Corde pinc\xE9e physique, chaude"}),ve("electrique","\xC9lectrique","va",{osc1Wave:0,osc2Wave:4,osc2PW:.3,osc2Level:.3,fType:0,cutoff:950,reso:.1,fEnv:2,fD:.3,vDrive:.05,aD:.6,aS:.5},["Doigt","Ampli","Espace"],[k("Attaque",.4,[["fEnv",-1,2.5]]),k("M\xE9diums",.5,[["osc2Level",-.3,.6],["osc2PW",-.2,.2]]),k("Ampli",.25,[["vDrive",-.1,.6]]),k("Grave",.3,[["subLevel",0,.7]]),...ht],{name:"Brillance",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Basse \xE9lectrique au doigt, m\xE9diums pr\xE9sents"}),ve("wobble","Wobble","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,fType:0,cutoff:300,reso:.5,lfoBeats:.5,lfoCut:3,lfoShape:0,subLevel:.5,vDrive:.25,aS:1,aR:.1},["Oscillation","Filtre","Grain"],[k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Profondeur",.6,[["lfoCut",-2.5,1.2]]),k("Ouverture",.4,[["cutoff",-1,1.8]]),k("R\xE9sonance",.5,[["reso",-.3,.4]]),k("Saturation",.3,[["vDrive",-.2,.6]]),k("Sub",.5,[["subLevel",-.5,.5]])],{name:"Profondeur",def:.5,map:[["lfoCut",-2,1]]},{desc:"Filtre oscillant cal\xE9 sur le tempo"}),ve("hoover","Hoover","va",{osc1Wave:4,osc1PW:.3,unison:5,detune:30,spread:.8,osc2Wave:0,osc2Semi:-12,osc2Level:.6,lfoPW:.2,lfoRate:3,pEnvAmt:-5,pEnvTime:.12,fType:0,cutoff:1500,reso:.1,chMix:.4,aS:1,aR:.2},["Plong\xE9e","Ch\u0153ur","Filtre"],[k("Plong\xE9e",.5,[["pEnvAmt",5,-7],["pEnvTime",-.5,1]]),k("Pulsation",.4,[["lfoPW",-.2,.2]]),k("D\xE9saccord",.5,[["detune",-20,25]]),k("Ch\u0153ur",.4,[["chMix",-.3,.5]]),k("Ouverture",.5,[["cutoff",-1.5,1.5]]),k("R\xE9sonance",.2,[["reso",-.1,.5]])],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.2]]},{desc:"Rave des ann\xE9es 90, plongeant et large"}),ve("carre","Carr\xE9","va",{osc1Wave:4,osc1PW:.5,subLevel:.2,fType:1,cutoff:3e3,reso:.1,fEnv:1.5,fD:.15,aD:.4,aS:.6},["Forme","Filtre","Espace"],[k("Largeur",1,[["osc1PW",-.4,0]]),k("Sub",.4,[["subLevel",-.4,.6]]),k("Ouverture",.5,[["cutoff",-2,1.5]]),k("Mordant",.3,[["fEnv",-1,3]]),...ht],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Onde carr\xE9e, clin d\u2019\u0153il 8 bits"}),ve("grondement","Grondement","wt",{wtTable:3,wtPos:.3,unison:3,detune:10,spread:.3,lfoBeats:1,lfoWt:.6,fType:1,cutoff:4e3,vDrive:.4,subLevel:.6,aS:1,aR:.12},["Gorge","Filtre","Grain"],[k("Gorge",.3,[["wtPos",-.3,.7]]),k("Mouvement",.5,[["lfoWt",-.6,.4],["lfoBeats",.6,-.5]]),k("Ouverture",.6,[["cutoff",-2.5,1]]),k("R\xE9sonance",.2,[["reso",0,.6]]),k("Saturation",.4,[["vDrive",-.3,.5]]),k("Sub",.6,[["subLevel",-.6,.4]])],{name:"Gorge",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Table d\u2019ondes qui \xAB parle \xBB, style bass music"}),ve("doux","Doux","va",{osc1Wave:2,vDriveType:3,subLevel:.6,fType:1,cutoff:1200,aA:.01,aS:.9,aR:.2},["Rondeur","Souffle","Espace"],[k("Ouverture",.4,[["cutoff",-1,1.6]]),k("Sub",.6,[["subLevel",-.6,.4]]),k("Attaque",.3,[["aA",-.5,4]]),k("Chaleur",.2,[["vDrive",0,.4]]),...ht],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.5]]},{desc:"Triangle tendre pour deep house"}),ve("pulse","Pulse","va",{osc1Wave:4,osc1PW:.22,lfoPW:.15,lfoRate:.35,fType:0,cutoff:700,reso:.2,fEnv:2,fD:.25,aS:.8,subLevel:.3},["Impulsion","Filtre","Espace"],[k("Largeur",.3,[["osc1PW",-.17,.27]]),k("Modulation",.5,[["lfoPW",-.15,.2],["lfoRate",-1,2]]),k("Ouverture",.45,[["cutoff",-1.5,1.8]]),k("Mordant",.4,[["fEnv",-1.5,3]]),...ht],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Impulsion \xE0 largeur mouvante"}),ve("saturee","Satur\xE9e","va",{osc1Wave:0,fType:0,cutoff:900,reso:.25,fDrive:.8,vDrive:.5,fxDrive:.3,fxDriveType:1,subLevel:.5,aS:.9},["Distorsion","Filtre","Grave"],[k("Entr\xE9e",.6,[["fDrive",-.6,.2]]),k("Sortie",.4,[["vDrive",-.4,.45],["fxDrive",-.2,.4]]),k("Ouverture",.5,[["cutoff",-1.5,1.5]]),k("R\xE9sonance",.3,[["reso",-.2,.55]]),k("Sub",.5,[["subLevel",-.5,.5]]),k("Largeur",0,[["unison",0,2.4],["detune",0,18],["spread",0,.5]])],{name:"Distorsion",def:.4,map:[["vDrive",-.3,.45]]},{desc:"Scie satur\xE9e en deux \xE9tages"}),ve("yoy","Yoy","formant",{formVowel:.2,formShift:-5,formQ:.6,formMix:.3,subLevel:.7,fType:4,glide:.07,lfoForm:0,lfoBeats:.5,aS:1,aR:.1},["Voyelle","Mouvement","Grain"],[k("Voyelle",.2,[["formVowel",-.2,.8]]),k("Gorge",.5,[["formShift",-6,6]]),k("Parole",.35,[["lfoForm",0,1]]),k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Saturation",.3,[["vDrive",0,.6]]),k("Sub",.7,[["subLevel",-.7,.3]])],{name:"Voyelle",def:.3,map:[["formVowel",-.2,.7]]},{desc:"Basse qui articule des voyelles (axe vertical)"}),ve("stab","Stab","va",{osc1Wave:0,unison:5,detune:20,spread:.5,fType:0,cutoff:500,reso:.3,fEnv:3.5,fD:.1,aD:.22,aS:.05,aR:.08,dlMix:.12,dlBeats:.75},["Impact","Filtre","Espace"],[k("Longueur",.4,[["aD",-1,1.6],["fD",-.8,1.2]]),k("\xC9paisseur",.5,[["detune",-15,20],["unison",-3,2]]),k("Ouverture",.45,[["cutoff",-1.2,1.8]]),k("R\xE9sonance",.4,[["reso",-.25,.45]]),...ht],{name:"Ouverture",def:.45,map:[["cutoff",-1,1.6]]},{desc:"Coup court et \xE9pais"}),ve("marimba","Marimba grave","sampler",{fType:1,cutoff:6e3,aS:1,aR:.25,rvSend:.06},["Bois","Espace","Grain"],[k("Douceur",.2,[["cutoff",0,-2.5]]),k("Attaque",.5,[["smpStart",0,.06]]),k("\xC9cho",0,[["dlMix",0,.3]]),k("Salle",.15,[["rvSend",-.05,.3]]),k("Grain",0,[["fxDrive",0,.45]]),k("Sub",0,[["subLevel",0,.5]])],{name:"Douceur",def:.2,map:[["cutoff",0,-2]]},{desc:"Marimba enregistr\xE9 (VCSL) dans le grave",bank:"marimba"}),ve("808montagem","808 montagem","va",{osc1Wave:3,fType:4,pEnvAmt:16,pEnvTime:.025,vDrive:.75,vDriveType:1,glide:.08,aD:1.2,aS:.5,aR:.15,fxDrive:.2,fxDriveType:1},["\xC9cr\xEAtage","Glisse","Queue"],[k("\xC9cr\xEAtage",.5,[["vDrive",-.4,.25]]),k("Mordant",.3,[["fxDrive",-.2,.5]]),k("Glisse",.45,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-12,10]]),k("Queue",.5,[["aD",-1.5,1.5]]),k("Tenue",.5,[["aS",-.45,.35]])],{name:"\xC9cr\xEAtage",def:.5,map:[["vDrive",-.3,.25]]},{style:"phonk",glideMode:"legato",desc:"808 tr\xE8s satur\xE9e qui glisse"}),ve("speedgarage","Speed garage","va",{osc1Wave:0,unison:2,detune:12,spread:.2,fType:0,cutoff:450,reso:.3,lfoBeats:.5,lfoCut:1.2,subLevel:.7,glide:.05,aS:.9,aR:.08,vDrive:.2},["Oscillation","Filtre","Grave"],[k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Profondeur",.4,[["lfoCut",-1.2,1.5]]),k("Ouverture",.4,[["cutoff",-1,2]]),k("R\xE9sonance",.4,[["reso",-.25,.45]]),k("Sub",.7,[["subLevel",-.7,.3]]),k("Saturation",.3,[["vDrive",-.2,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{style:"ukg",desc:"Basse qui \xAB wobble \xBB pour le 2-step"}),ve("afrorond","Afro rond","fm",{fmAlgo:0,fmR1:1,fmR2:2,fmL2:1.2,fmD2:.12,fmS2:.05,fmL3:0,fmL4:0,subLevel:.5,fType:1,cutoff:3e3,aD:.6,aS:.4,aR:.12,rvSend:.05},["Pincement","Corps","Espace"],[k("Pincement",.5,[["fmL2",-1,2],["fmD2",-.5,.8]]),k("Couleur",0,[["fmR2",0,1]]),k("Longueur",.4,[["aD",-1,1.5],["aS",-.3,.4]]),k("Sub",.5,[["subLevel",-.5,.5]]),...ht],{name:"Pincement",def:.4,map:[["fmL2",-.8,1.8]]},{style:"afro",desc:"Ronde et bois\xE9e, laisse respirer les percussions"}),ve("logdrum","Log drum","modal",{mdMat:3,mdDecay:.6,mdHard:.6,pEnvAmt:14,pEnvTime:.045,vDrive:.35,vDriveType:3,fType:4,aA:.001,aD:2,aS:1,aR:.25,subLevel:.25},["Glisse","Bois","Queue"],[k("Glisse",.5,[["pEnvAmt",-10,10]]),k("Vitesse",.5,[["pEnvTime",-1,1.2]]),k("Frappe",.5,[["mdHard",-.4,.4]]),k("Grain",.35,[["vDrive",-.3,.5]]),k("Queue",.5,[["mdDecay",-1.2,1.2]]),k("Sub",.25,[["subLevel",-.25,.5]])],{name:"Glisse",def:.5,map:[["pEnvAmt",-8,8]]},{style:"amapiano",desc:"Basse percussive qui chute, au c\u0153ur de l\u2019amapiano"}),ve("subperreo","Sub perreo","va",{osc1Wave:3,osc2Wave:2,osc2Semi:12,osc2Level:.25,fType:4,pEnvAmt:4,pEnvTime:.02,vDrive:.25,aD:.5,aS:.7,aR:.1},["Rondeur","Punch","Espace"],[k("Pr\xE9sence",.3,[["osc2Level",-.25,.4]]),k("Chaleur",.3,[["vDrive",-.2,.45]]),k("Punch",.4,[["pEnvAmt",-4,12]]),k("Longueur",.5,[["aD",-1,1.5]]),...ht],{name:"Pr\xE9sence",def:.3,map:[["osc2Level",-.2,.4]]},{style:"reggaeton",desc:"Sub lisible m\xEAme sur petit haut-parleur"}),ve("bounce","Bounce","va",{osc1Wave:3,osc2Wave:1,osc2Level:.25,fType:1,cutoff:1400,pEnvAmt:24,pEnvTime:.015,aD:.18,aS:.3,aR:.06,vDrive:.3},["Rebond","Forme","Espace"],[k("Rebond",.5,[["pEnvAmt",-16,16],["pEnvTime",-.5,1]]),k("Longueur",.4,[["aD",-1,1.6],["aS",-.3,.5]]),k("Carr\xE9",.3,[["osc2Level",-.25,.6]]),k("Saturation",.3,[["vDrive",-.2,.5]]),...ht],{name:"Rebond",def:.5,map:[["pEnvAmt",-12,12]]},{style:"jersey",desc:"Petit bond de hauteur \xE0 chaque note"}),ve("turbine","Reese turbine","va",{osc1Wave:0,unison:7,detune:22,spread:.5,osc2Wave:0,osc2Semi:-12,osc2Level:.35,fType:0,cutoff:1100,reso:.15,fDrive:.4,lfoRate:.15,lfoCut:.6,subLevel:.7,chMix:.2,aS:1,aR:.15},["Turbine","Filtre","Largeur"],[k("D\xE9saccord",.45,[["detune",-15,28]]),k("Rotation",.4,[["lfoRate",-1.5,3],["lfoCut",-.5,1]]),k("Ouverture",.45,[["cutoff",-1.5,1.6]]),k("Mordant",.4,[["fDrive",-.4,.5]]),k("Largeur",.5,[["spread",-.5,.5],["chMix",-.2,.35]]),k("Sub",.7,[["subLevel",-.7,.3]])],{name:"Ouverture",def:.45,map:[["cutoff",-1.2,1.5]]},{style:"dnb",desc:"Sept scies qui tournent, sub s\xE9par\xE9"}),ve("808rage","808 rage","va",{osc1Wave:3,osc2Wave:3,osc2Semi:12,osc2Level:.35,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.65,vDriveType:0,glide:.1,aD:2,aS:.55,aR:.2},["Saturation","Glisse","Queue"],[k("Saturation",.5,[["vDrive",-.4,.3]]),k("Octave",.35,[["osc2Level",-.35,.4]]),k("Glisse",.5,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-10,12]]),k("Queue",.5,[["aD",-1.5,1.2]]),k("Tenue",.5,[["aS",-.45,.35]])],{name:"Saturation",def:.5,map:[["vDrive",-.35,.3]]},{style:"rage",glideMode:"legato",desc:"808 large avec octave, pour le rage"}),ve("acidedur","Acide dur","va",{osc1Wave:0,fType:0,cutoff:500,reso:.88,fEnv:4,fD:.14,velFilt:.7,glide:.06,aD:.22,aS:.7,aR:.05,vDrive:.4,fxDrive:.6,fxDriveType:2},["Filtre","Accent","Pli"],[k("Coupure",.4,[["cutoff",-1.5,2.2]]),k("R\xE9sonance",.8,[["reso",-.5,.1]]),k("Enveloppe",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.4,[["fD",-1.4,1.8]]),k("Pli",.5,[["fxDrive",-.5,.35]]),k("Saturation",.4,[["vDrive",-.35,.5]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{style:"hardtechno",desc:"Acide repli\xE9, tr\xE8s agressif"}),ve("ronde","Basse ronde","va",{osc1Wave:2,subLevel:.6,fType:1,cutoff:500,aA:.015,aS:.6,aR:.18,vDrive:.35,vDriveType:3,glide:.1,dlMix:.15,dlBeats:.75,dlFb:.35,rvSend:.08,aD:.8},["Rondeur","Dub","Usure"],[k("Ouverture",.4,[["cutoff",-1,1.6],["vDrive",-.1,.25]]),k("Chaleur",.3,[["vDrive",-.2,.45]]),k("\xC9cho",.3,[["dlMix",-.15,.3],["dlFb",0,.35]]),k("Salle",.2,[["rvSend",-.08,.25]]),k("Bande",0,[["vibDepth",0,.15],["vibRate",0,-1.5]]),k("Usure",0,[["fxCrush",0,.35]])],{name:"Ouverture",def:.4,map:[["cutoff",-.8,1.4]]},{style:"triphop",desc:"Basse dub ronde avec \xE9cho"})];var _e=(o,e,t,s,i,a,r,n={})=>({id:"lead."+o,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||6,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.12,aR:.25,...s},groups:i,macros:a,expr:r,trim:n.trim||0}),D=(o,e,t)=>({name:o,def:e,map:t}),Pe=[D("\xC9cho",.2,[["dlMix",-.15,.35],["dlFb",-.1,.3]]),D("Salle",.3,[["rvSend",-.1,.4]])],di=D("Bande",0,[["vibDepth",0,.32],["vibRate",0,-1.8],["vibDelay",0,-3],["fxLP",0,-2.2],["fxCrush",0,.12]]),Ke=(o,e,t,s,i,a={})=>_e(o,e,"sampler",{fType:1,cutoff:9e3,reso:.05,aA:.001,aD:2,aS:1,aR:.35,...s},a.groups||["Toucher","Couleur","Espace"],a.macros||[D("Douceur",.15,[["cutoff",0,-3],["level",0,4]]),D("Attaque",0,[["smpStart",0,.08],["aA",0,7.5]]),D("Chorus",.1,[["chMix",-.1,.5]]),di,...Pe],a.expr||{name:"Douceur",def:.2,map:[["cutoff",.5,-2.5],["level",-.5,3]]},{bank:t,desc:i,...a}),pi=[_e("supersaw","Supersaw","va",{osc1Wave:0,unison:7,detune:28,spread:.9,fType:1,cutoff:6e3,reso:.1,fEnv:1,fD:.5,aA:.005,aD:.6,aS:.75,aR:.35,chMix:.25,dlMix:.15,dlBeats:.75,rvSend:.2},["Essaim","Filtre","Espace"],[D("D\xE9saccord",.5,[["detune",-20,25]]),D("Largeur",.6,[["spread",-.6,.1],["width",-.5,.4]]),D("Ouverture",.5,[["cutoff",-2.2,1.2]]),D("Mordant",.3,[["fEnv",-1,3],["fD",-.8,.6]]),...Pe],{name:"Ouverture",def:.5,map:[["cutoff",-1.8,1]]},{desc:"Sept scies d\xE9saccord\xE9es, large et brillant"}),_e("pluck","Pluck","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,osc2Semi:12,fType:0,cutoff:900,reso:.25,fEnv:4,fD:.14,aA:.001,aD:.3,aS:0,aR:.2,dlMix:.25,dlBeats:.75,rvSend:.15},["Pincement","Filtre","Espace"],[D("Longueur",.4,[["aD",-1,1.8],["fD",-.8,1.5]]),D("Octave",.5,[["osc2Level",-.5,.5]]),D("Brillance",.5,[["cutoff",-1.5,1.8],["fEnv",-1,1]]),D("R\xE9sonance",.3,[["reso",-.2,.5]]),...Pe],{name:"Brillance",def:.5,map:[["cutoff",-1.2,1.6]]},{desc:"Pincement synth\xE9tique avec \xE9cho point\xE9"}),Ke("piano","Piano","piano",{rvSend:.15},"Piano droit enregistr\xE9 (VCSL)"),_e("rhodes","Rhodes FM","fm",{fmAlgo:1,fmR1:1,fmR2:1,fmL2:1.1,fmD2:.9,fmS2:.15,fmR3:1,fmL3:1.4,fmD3:1.5,fmS3:.3,fmR4:14,fmL4:1.6,fmD4:.06,fmS4:0,fmDetune:4,aA:.002,aD:2.5,aS:.4,aR:.4,chMix:.35,chRate:.6,lfoAmp:.12,lfoRate:4.5,rvSend:.15},["Lames","Corps","Espace"],[D("Lame",.45,[["fmL4",-1.4,2]]),D("Cloche",.4,[["fmD4",-1,2]]),D("Grain",.4,[["fmL2",-.9,1.6]]),D("Tr\xE9molo",.3,[["lfoAmp",-.12,.45],["lfoRate",-.6,.6]]),...Pe],{name:"Toucher",def:.5,map:[["fmL2",-.6,1],["fmL4",-.8,.8]]},{desc:"Piano \xE9lectrique FM avec tr\xE9molo et chorus"}),Ke("marimba","Marimba","marimba",{rvSend:.12,dlMix:.08},"Marimba en bois (VCSL)"),Ke("vibraphone","Vibraphone","vibes",{lfoAmp:.3,lfoRate:5.5,rvSend:.2},"Vibraphone, moteur de tr\xE9molo r\xE9glable",{macros:[D("Douceur",.1,[["cutoff",0,-3]]),D("Moteur",.5,[["lfoAmp",-.3,.4],["lfoRate",-1.5,1]]),D("Chorus",0,[["chMix",0,.5]]),di,...Pe]}),Ke("kalimba","Kalimba","kalimba",{rvSend:.15,dlMix:.12,dlBeats:.75},"Piano \xE0 pouces du Kenya (VCSL)"),_e("verre","Cloche de verre","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:3,fmD2:2,fmS2:.1,fmR3:7,fmL3:.5,fmD3:.4,fmS3:0,fmL4:0,aA:.001,aD:3,aS:0,aR:1.2,chMix:.2,rvSend:.3},["M\xE9tal","Dur\xE9e","Espace"],[D("Rapport",.5,[["fmR2",-1.5,1.5]]),D("\xC9clat",.5,[["fmL2",-2,3],["fmL3",-.5,1.5]]),D("Dur\xE9e",.5,[["aD",-1.5,1.2],["fmD2",-1.5,1]]),D("Scintillement",0,[["fmDetune",0,12],["chMix",0,.4]]),...Pe],{name:"\xC9clat",def:.5,map:[["fmL2",-1.5,2.5]]},{desc:"Cloche FM cristalline, longue r\xE9sonance"}),_e("orgue","Orgue","wt",{wtTable:4,wtPos:.55,fType:4,aA:.002,aS:1,aR:.08,chMix:.45,chRate:.8,chDepth:.6,subLevel:.15,rvSend:.12},["Tirettes","Rotation","Saturation"],[D("Tirettes",.55,[["wtPos",-.55,.45]]),D("16 pieds",.15,[["subLevel",-.15,.6]]),D("Vitesse",.3,[["chRate",-.6,3]]),D("Profondeur",.6,[["chMix",-.45,.4],["chDepth",-.3,.4]]),D("Saturation",.1,[["fxDrive",0,.55]]),D("Salle",.25,[["rvSend",-.1,.35]])],{name:"Tirettes",def:.5,map:[["wtPos",-.4,.4]]},{desc:"Orgue \xE0 tirettes et cabine tournante"}),_e("nappe","Nappe chaude","wt",{wtTable:6,wtPos:.4,unison:3,detune:14,spread:.8,fType:1,cutoff:2500,aA:.6,aD:1,aS:.9,aR:1.2,lfoWt:.2,lfoRate:.15,chMix:.4,rvSend:.35},["Mati\xE8re","Souffle","Espace"],[D("Mati\xE8re",.4,[["wtPos",-.4,.6]]),D("Mouvement",.3,[["lfoWt",-.2,.6],["lfoRate",-1,2]]),D("Attaque",.4,[["aA",-2.5,1.5]]),D("Ouverture",.5,[["cutoff",-1.5,1.5]]),...Pe],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Nappe douce qui respire",poly:6}),_e("voix","Voix","formant",{formVowel:0,formShift:0,formQ:.55,formMix:.25,vibDepth:.22,vibRate:5.2,vibDelay:.35,aA:.04,aS:.9,aR:.3,chMix:.2,rvSend:.2},["Voyelle","Gorge","Espace"],[D("Voyelle",0,[["formVowel",0,1]]),D("Parole",0,[["lfoForm",0,.8],["lfoBeats",0,1]]),D("Gorge",.5,[["formShift",-7,7]]),D("Vibrato",.5,[["vibDepth",-.22,.3]]),...Pe],{name:"Voyelle",def:.2,map:[["formVowel",-.2,.8]]},{desc:"Synth\xE8se de voyelles, ch\u0153ur artificiel",poly:4}),Ke("ocarina","Ocarina","ocarina",{vibDepth:.08,vibDelay:.4,rvSend:.18},"Ocarina souffl\xE9 (VCSL)",{poly:3}),Ke("saxo","Saxophone","sax",{vibDepth:.12,vibRate:5,vibDelay:.45,cutoff:7e3,rvSend:.15},"Saxophone t\xE9nor enregistr\xE9 (VCSL)",{poly:2,macros:[D("Souffle",.2,[["cutoff",0,-2.5],["noiseLevel",0,.06]]),D("Vibrato",.4,[["vibDepth",-.12,.25],["vibDelay",0,-2]]),D("Grain",0,[["fxDrive",0,.45]]),di,...Pe]}),Ke("harmonica","Harmonica","harmonica",{vibDepth:.05,rvSend:.12},"Harmonica diatonique (VCSL)",{poly:4}),_e("guitare","Guitare pinc\xE9e","pluck",{pkBright:.7,pkDamp:.35,pkDecay:2.5,pkBody:.4,fType:4,aS:1,aR:.3,chMix:.15,dlMix:.12,rvSend:.15},["Corde","Caisse","Espace"],[D("Attaque",.6,[["pkBright",-.5,.3]]),D("Sustain",.5,[["pkDecay",-1.5,1.5],["pkDamp",.2,-.25]]),D("Caisse",.4,[["pkBody",-.4,.5]]),D("Chorus",.3,[["chMix",-.15,.4]]),...Pe],{name:"Attaque",def:.5,map:[["pkBright",-.4,.3]]},{desc:"Corde pinc\xE9e physique, nylon ou acier"}),Ke("harpe","Harpe","harp",{rvSend:.22},"Harpe de concert (VCSL)"),_e("chip","Chiptune","va",{osc1Wave:4,osc1PW:.25,fType:4,vibDepth:.25,vibRate:6.5,vibDelay:.15,lfoPW:0,aA:.001,aD:.2,aS:.7,aR:.08,dlMix:.1,dlBeats:.5,rvSend:.05},["Onde","Vibrato","Espace"],[D("Largeur",.5,[["osc1PW",-.2,.25]]),D("Balayage",0,[["lfoPW",0,.22],["lfoRate",0,1]]),D("Vibrato",.4,[["vibDepth",-.25,.4]]),D("Arp\xE8ge",0,[["pEnvAmt",0,12],["pEnvTime",0,-1]]),...Pe],{name:"Largeur",def:.5,map:[["osc1PW",-.2,.2]]},{desc:"Onde carr\xE9e de console 8 bits",poly:3}),_e("sync","Sync","wt",{wtTable:7,wtPos:.3,wtEnv:.4,fEnv:0,fA:.002,fD:.35,fS:.2,unison:2,detune:8,spread:.6,fType:4,vDrive:.3,glide:.06,aS:.85,aR:.15,dlMix:.15,rvSend:.12},["Synchro","Mouvement","Espace"],[D("Synchro",.3,[["wtPos",-.3,.6]]),D("Balayage",.5,[["wtEnv",-.4,.5],["fD",-1,1]]),D("Vibration",0,[["lfoWt",0,.5],["lfoRate",0,1.5]]),D("Saturation",.3,[["vDrive",-.3,.5]]),...Pe],{name:"Synchro",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Lead synchronis\xE9 mordant, glisse sur les liaisons",poly:1}),_e("cordes","Cordes synth\xE9","va",{osc1Wave:0,unison:5,detune:14,spread:.7,osc2Wave:0,osc2Semi:12,osc2Level:.3,fType:1,cutoff:3500,aA:.35,aD:1,aS:.9,aR:.9,vibDepth:.08,vibDelay:.5,chMix:.35,rvSend:.3},["Archet","Ensemble","Espace"],[D("Attaque",.4,[["aA",-2.5,1.5]]),D("Ouverture",.5,[["cutoff",-1.5,1.4]]),D("Ensemble",.5,[["detune",-10,16],["chMix",-.25,.4]]),D("Octave",.3,[["osc2Level",-.3,.5]]),...Pe],{name:"Ouverture",def:.5,map:[["cutoff",-1.4,1.2]]},{desc:"Ensemble de cordes analogique"}),Ke("glock","Glockenspiel","glock",{rvSend:.2,dlMix:.1},"Lames de m\xE9tal brillantes (VCSL)"),_e("sino","Sino montagem","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:2.2,fmD2:.35,fmS2:.1,fmR3:1.5,fmL3:.8,fmD3:.2,fmS3:0,aA:.001,aD:.8,aS:.2,aR:.3,fxDrive:.5,fxDriveType:1,dlMix:.2,dlBeats:.5,rvSend:.1},["M\xE9tal","\xC9cr\xEAtage","Espace"],[D("Rapport",.5,[["fmR2",-1.5,1.5]]),D("\xC9clat",.5,[["fmL2",-1.5,2.5]]),D("\xC9cr\xEAtage",.5,[["fxDrive",-.45,.4]]),D("Longueur",.4,[["aD",-1,1.5],["aS",-.2,.5]]),...Pe],{name:"\xC9clat",def:.5,map:[["fmL2",-1.2,2]]},{style:"phonk",desc:"Cloche m\xE9tallique satur\xE9e, m\xE9lodies de montagem"}),Ke("stabgarage","Stab garage","clavi",{cutoff:7e3,chMix:.3,dlMix:.18,dlBeats:.75,rvSend:.12,aR:.15},"Clavisynth TX81Z enregistr\xE9, accords courts",{style:"ukg"}),Ke("balafon","Balafon afro","balafon",{dlMix:.2,dlBeats:.75,rvSend:.2},"Balafon (xylophone ouest-africain) avec \xE9cho",{style:"afro"}),Ke("keys","Keys amapiano","fmpiano",{cutoff:5e3,chMix:.45,chRate:.5,dlMix:.18,dlBeats:.75,rvSend:.25},"Piano FM TX81Z enregistr\xE9, chorus et \xE9cho",{style:"amapiano"}),Ke("perreo","Pluck perreo","dantranh",{fxDrive:.15,dlMix:.15,dlBeats:.5,rvSend:.12},"Cithare \u0111\xE0n tranh enregistr\xE9e (VCSL), en pincements",{style:"reggaeton"}),_e("stabjersey","Stab jersey","va",{osc1Wave:0,unison:5,detune:24,spread:.8,osc2Wave:1,osc2Semi:12,osc2Level:.35,fType:1,cutoff:5e3,fEnv:2,fD:.12,pEnvAmt:2,pEnvTime:.02,aA:.001,aD:.18,aS:.1,aR:.12,rvSend:.15},["Impact","Filtre","Espace"],[D("Longueur",.4,[["aD",-1,1.8],["aS",-.1,.5]]),D("Hoquet",.4,[["pEnvAmt",-2,10]]),D("Brillance",.5,[["cutoff",-1.8,1.2]]),D("\xC9paisseur",.5,[["detune",-18,20],["osc2Level",-.35,.4]]),...Pe],{name:"Brillance",def:.5,map:[["cutoff",-1.5,1.2]]},{style:"jersey",desc:"Stab brillant pour les rafales"}),_e("liquide","Pad liquide","wt",{wtTable:10,wtPos:.6,unison:4,detune:10,spread:.8,fType:1,cutoff:2200,lfoCut:.6,lfoBeats:4,aA:.25,aD:1,aS:.85,aR:1.5,chMix:.35,dlMix:.15,rvSend:.45},["Mati\xE8re","Mar\xE9e","Espace"],[D("Mati\xE8re",.5,[["wtPos",-.5,.4]]),D("Ouverture",.5,[["cutoff",-1.5,1.5]]),D("Mar\xE9e",.4,[["lfoCut",-.6,1.2]]),D("Attaque",.4,[["aA",-2,1.5]]),...Pe],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.4]]},{style:"dnb",desc:"Nappe douce et mouvante pour le liquid"}),_e("rage","Lead rage","va",{osc1Wave:0,unison:7,detune:32,spread:1,osc2Wave:4,osc2PW:.2,osc2Level:.4,fType:1,cutoff:7e3,pEnvAmt:-3,pEnvTime:.08,vDrive:.3,aA:.003,aD:.5,aS:.65,aR:.25,dlMix:.2,dlBeats:.5,rvSend:.18},["Essaim","Plong\xE9e","Espace"],[D("D\xE9saccord",.5,[["detune",-20,20]]),D("Saturation",.3,[["vDrive",-.3,.5]]),D("Plong\xE9e",.5,[["pEnvAmt",3,-9],["pEnvTime",-.6,1]]),D("Brillance",.6,[["cutoff",-2,.6]]),...Pe],{name:"Brillance",def:.6,map:[["cutoff",-1.8,.6]]},{style:"rage",desc:"Lead large et satur\xE9 qui plonge"}),_e("hurleur","Hurleur","va",{osc1Wave:0,osc2Wave:0,osc2Fine:12,osc2Level:.8,fType:0,cutoff:1200,reso:.75,fEnv:2,fD:.4,vDrive:.6,fxDrive:.3,fxDriveType:2,glide:.08,lfoRate:6,lfoCut:0,aS:1,aR:.12,dlMix:.12,rvSend:.15},["Cri","Filtre","Espace"],[D("Saturation",.5,[["vDrive",-.4,.35],["fxDrive",-.25,.4]]),D("Hurlement",0,[["lfoCut",0,1.5],["lfoRate",-1,1]]),D("Coupure",.5,[["cutoff",-1.5,2]]),D("R\xE9sonance",.7,[["reso",-.4,.2]]),...Pe],{name:"Coupure",def:.5,map:[["cutoff",-1.2,1.8]]},{style:"hardtechno",desc:"Lead r\xE9sonant et repli\xE9, glisse",poly:1}),Ke("brume","Cloches brumeuses","chimes",{cutoff:4e3,vibDepth:.1,vibRate:.9,vibDelay:.01,fxCrush:.15,chMix:.3,rvSend:.45,dlMix:.15,dlBeats:1.5},"Cloches \xE0 main, bande us\xE9e et grande salle",{style:"triphop"})];var je=(o,e,t,s,i,a,r)=>({id:o,name:e,style:t,kit:s.map((n,l)=>["kick.","snare.","hat.","perc."][l]+n),rhythm:i,bass:a&&"bass."+a,lead:r&&"lead."+r}),Ze=[je("studio","Studio",null,["club","classique","analogique","conga"],[1,1,1,3],"moog","pluck"),je("acoustique","Acoustique",null,["acoustique","acoustique","acoustique","toms"],[2,1,1,11],"contrebasse","piano"),je("organique","Organique",null,["cajon","mains","shaker","darbuka"],[3,1,2,1],"contrebasse","kalimba"),je("analogique","Analogique",null,["909","clap808","analogique","cloche808"],[1,1,3,8],"acide","supersaw"),je("lofi","Lo-fi",null,["vinyle","lofi","lofi","bloc"],[2,1,1,12],"doux","rhodes"),je("phonk","Phonk BR","phonk",["montagem","clapmontagem","drift","clochephonk"],[7,1,2,6],"808montagem","sino"),je("ukg","UK garage","ukg",["garage","garage","garage","toc"],[3,4,4,13],"speedgarage","stabgarage"),je("afro","Afro house","afro",["afroprofond","clapafro","shakerafro","djembe"],[1,9,9,7],"afrorond","balafon"),je("amapiano","Amapiano","amapiano",["pianofeutre","rimpiano","shakerpiano","logdrum"],[9,9,4,9],"logdrum","keys"),je("reggaeton","Perreo","reggaeton",["perreo","dembow","perreo","timbal"],[16,3,1,3],"subperreo","perreo"),je("jersey","Jersey club","jersey",["jersey","clapjersey","jersey","couinement"],[6,6,2,12],"bounce","stabjersey"),je("dnb","Drum & bass","dnb",["break","dnb","ridednb","tombreak"],[5,5,1,15],"turbine","liquide"),je("rage","Rage","rage",["808rage","claprage","trap","laser"],[4,7,6,12],"808rage","rage"),je("hardtechno","Hard techno","hardtechno",["rumble","industriel","industriel","metalindus"],[10,1,3,8],"acidedur","hurleur"),je("triphop","Trip-hop","triphop",["poussiere","poussiere","vinyle","boisfeutre"],[12,2,1,11],"ronde","brume")];var Dt=[{id:"phonk",name:"Phonk BR \xB7 montagem",short:"Phonk BR",bpm:130,key:1,scale:"phrygian"},{id:"ukg",name:"UK garage",short:"UKG",bpm:134,key:5,scale:"minor"},{id:"afro",name:"Afro house",short:"Afro",bpm:122,key:9,scale:"minor"},{id:"amapiano",name:"Amapiano",short:"Amapiano",bpm:112,key:2,scale:"dorian"},{id:"reggaeton",name:"Reggaeton nouvelle vague",short:"Perreo",bpm:96,key:4,scale:"minor"},{id:"jersey",name:"Jersey club",short:"Jersey",bpm:142,key:7,scale:"minor"},{id:"dnb",name:"Drum & bass",short:"DnB",bpm:174,key:5,scale:"minor"},{id:"rage",name:"Rage \xB7 trap",short:"Rage",bpm:150,key:1,scale:"harmonic"},{id:"hardtechno",name:"Hard techno",short:"Hard",bpm:152,key:9,scale:"phrygian"},{id:"triphop",name:"Trip-hop atmosph\xE9rique",short:"Trip-hop",bpm:86,key:0,scale:"dorian"}];function et(o){return Dt.find(e=>e.id===o)||null}var ra={"kick.rond":1.7,"kick.club":3.2,"kick.profond":.9,"kick.808":-.8,"kick.feutre":2.9,"kick.acoustique":-6.4,"kick.sec":.7,"kick.concert":-7.3,"kick.sature":6.2,"kick.rebond":-.1,"kick.sub":3.5,"kick.clic":1.4,"kick.vinyle":-2.6,"kick.909":-.1,"kick.boom":1.1,"kick.papier":1.8,"kick.plie":3.1,"kick.cajon":-7.1,"kick.cadre":-8,"kick.tom":-6,"kick.montagem":2.8,"kick.garage":2.6,"kick.afroprofond":2.4,"kick.pianofeutre":2.5,"kick.perreo":4.1,"kick.jersey":4.4,"kick.break":1.5,"kick.808rage":-.3,"kick.rumble":5.9,"kick.poussiere":.4,"snare.classique":-1.4,"snare.clap808":.8,"snare.rim":6.2,"snare.acoustique":-12.3,"snare.sanstimbre":-11.5,"snare.fantome":2.5,"snare.crepitant":-3.3,"snare.clapserre":.5,"snare.claplarge":-2.8,"snare.doigts":1.1,"snare.mains":-12.6,"snare.lofi":-.5,"snare.metal":-5.7,"snare.tomsnare":-2.9,"snare.balai":-.2,"snare.electro":-2.8,"snare.snareclap":-8.3,"snare.ressort":-7.1,"snare.roulement":-11.5,"snare.crossstick":-12.7,"snare.clapmontagem":-1.9,"snare.garage":-4.5,"snare.clapafro":-.7,"snare.rimpiano":-7.2,"snare.dembow":.5,"snare.clapjersey":-11.2,"snare.dnb":-10.8,"snare.claprage":-3.3,"snare.industriel":-4,"snare.poussiere":-9.6,"hat.analogique":4.9,"hat.bruit":-2.7,"hat.acoustique":-17.6,"hat.ride":-19.8,"hat.crash":-18.2,"hat.fin":3.1,"hat.sombre":.3,"hat.brillant":-1.6,"hat.lofi":5.2,"hat.tss":-8.9,"hat.shaker":-18.7,"hat.tambourin":-17.9,"hat.triangle":-20.2,"hat.cabasa":-15.6,"hat.charleston2":-17.5,"hat.clochette":-2.5,"hat.grain":-6.3,"hat.large":-4.9,"hat.pichenette":-19.1,"hat.pedale":3.6,"hat.drift":-.1,"hat.garage":1.9,"hat.shakerafro":-15.5,"hat.shakerpiano":-10.6,"hat.perreo":3.2,"hat.jersey":-.3,"hat.ridednb":-11.9,"hat.trap":6.4,"hat.industriel":-10.8,"hat.vinyle":-13.3,"perc.conga":-14.9,"perc.bongo":-15.5,"perc.cloche":-15.8,"perc.cloche808":-4.2,"perc.agogo":-17.5,"perc.claves":-17,"perc.bloc":-16.9,"perc.guiro":-16.4,"perc.timbales":-15.2,"perc.cuica":-15.9,"perc.darbuka":-15.4,"perc.cajon":-13.6,"perc.fente":-14.7,"perc.toms":-15,"perc.goutte":10.4,"perc.boisynth":12.5,"perc.tom808":-13.9,"perc.vibraslap":-16.3,"perc.enclume":-17.6,"perc.blip":6.5,"perc.clochephonk":-4.3,"perc.toc":9.2,"perc.djembe":-8.1,"perc.logdrum":-10.8,"perc.timbal":-7.2,"perc.couinement":3.1,"perc.tombreak":-7.6,"perc.laser":7,"perc.metalindus":-9.6,"perc.boisfeutre":-12.3,"bass.sub":-8.5,"bass.moog":-7.8,"bass.acide":-3.3,"bass.reese":-8.5,"bass.808":-4.6,"bass.fm":-8.6,"bass.pluck":4.1,"bass.orgue":-6.8,"bass.contrebasse":1.1,"bass.electrique":-.4,"bass.wobble":-5,"bass.hoover":-9.7,"bass.carre":-11.2,"bass.grondement":-7.1,"bass.doux":-8.2,"bass.pulse":-6.1,"bass.saturee":-12.3,"bass.yoy":-6.3,"bass.stab":.3,"bass.marimba":-10.2,"bass.808montagem":-4,"bass.speedgarage":-7.8,"bass.afrorond":-6.6,"bass.logdrum":-4.3,"bass.subperreo":-6.3,"bass.bounce":-.2,"bass.turbine":-7.9,"bass.808rage":-.3,"bass.acidedur":-11.2,"bass.ronde":-4.7,"lead.supersaw":-14.5,"lead.pluck":-5,"lead.piano":-17.4,"lead.rhodes":-11.9,"lead.marimba":-16.4,"lead.vibraphone":-15.9,"lead.kalimba":-17.3,"lead.verre":-8.9,"lead.orgue":-12.4,"lead.nappe":-16.9,"lead.voix":-9,"lead.ocarina":-16.9,"lead.saxo":-15.9,"lead.harmonica":-16.1,"lead.guitare":-7.6,"lead.harpe":-16.9,"lead.chip":-18.2,"lead.sync":-8.9,"lead.cordes":-15.7,"lead.glock":-17.7,"lead.sino":-18.3,"lead.stabgarage":-15.7,"lead.balafon":-15.6,"lead.keys":-17.1,"lead.perreo":-18.2,"lead.stabjersey":-8,"lead.liquide":-14.9,"lead.rage":-12.1,"lead.hurleur":-15.4,"lead.brume":-17.4};var fi=[{id:"kick",name:"Kick",list:ea},{id:"snare",name:"Snare \xB7 clap",list:ta},{id:"hat",name:"Hat",list:aa},{id:"perc",name:"Perc",list:oa},{id:"bass",name:"Basse",list:ui},{id:"lead",name:"M\xE9lodie",list:pi}],Pt=["kick","snare","hat","perc"],mi=new Map;for(let o of fi)for(let e of o.list){if(mi.has(e.id))throw new Error("duplicate preset id "+e.id);e.family=o.id,e.trim=(e.trim||0)+(ra[e.id]||0),mi.set(e.id,e)}function ye(o){return mi.get(o)||null}function tt(o){return(fi.find(e=>e.id===o)||fi[0]).list}function na(o){return Ze.find(e=>e.id===o)||null}var jt={kit:Ze[0].kit,bass:ui[0].id,lead:pi[0].id};function la(o){return o?o.bank?[o.bank]:o.samples&&o.samples.length?["drums"]:[]:[]}var sr={bass:[28,47],lead:[48,67]},ir=48;function Gt(o,e=Math.random,t){let s=o.length>1&&t!==void 0?o.filter(i=>i!==t):o;return s[Math.floor(e()*s.length)%s.length]}function ar(o,e,t){let[s,i]=sr[o],a=[];for(let r=-4;r<=4;r++){let n=ir+t+e.lo+12*r;n>=s&&n<=i&&a.push(r)}return a.length?a:[0]}function vi(o,e="all",t=Math.random){let s={kit:null,bass:null,lead:null},i=o;(e==="all"||e==="drum")&&(s.kit=Pt.map((a,r)=>Gt(tt(a),t,void 0).id),s.kit.every((a,r)=>a===i.parts.drum.kit[r])&&(s.kit[0]=Gt(tt("kick"),t,tt("kick").find(a=>a.id===s.kit[0])).id));for(let a of["bass","lead"]){if(e!=="all"&&e!==a)continue;let r=tt(a),n=r.find(d=>d.id===i.parts[a].preset),l=Gt(r,t,n).id,c=Gt(ar(a,i.parts[a].range,i.key),t);s[a]={preset:l,oct:c}}return s}function ca(o){return[...o.kit||[],o.bass&&o.bass.preset,o.lead&&o.lead.preset].filter(Boolean)}function gi(o,e){let t=o;e.kit&&(t.parts.drum.kit=e.kit.slice(),t.parts.drum.macros=[null,null,null,null]);for(let s of["bass","lead"]){let i=e[s];if(!i)continue;let a=t.parts[s];if(a.preset=i.preset,a.macros=null,i.oct){a.range={lo:a.range.lo+12*i.oct,n:a.range.n};for(let r of t.patterns){for(let n of r[s].notes)n.deg+=7*i.oct;if(r.gest&&r.gest[s])for(let n of r.gest[s])for(let l of n.p)l[3]+=7*i.oct}}}return t}function ha(o=Math.random){let e=Gt(Dt,o),t=Gt(Ze,o),s=At({tempo:e.bpm,key:Math.floor(o()*12)%12,scale:e.scale,name:"Id\xE9e au hasard"});return s.parts.drum.kit=t.kit.slice(),s.parts.drum.rhythm=t.rhythm.slice(),s.parts.bass.preset=tt("bass")[0].id,s.parts.lead.preset=tt("lead")[0].id,gi(s,vi(s,"all",o)),s}var Ds=Ye.storage+".",or={metro:!1,metroAlways:!1,metroLevel:0,piano:!1,ghosts:!0,fluid:!0,fluidZone:"keys",fluidStyle:"spectaculaire",fluidColors:"partie",fluidInk:"libre",glass:Ye.fluid,fluidHdr:"intense",fluidEngine:"auto",glassTilt:!1,glassSpill:!0,glassLight:"forte",mixGlass:Ye.fluid,ctrlHeight:6,lightLook:"aquarelle",hdrLight:!0,glassLook:"optique"},rr=60,Ps=class{constructor(){this.project=null,this.ui={part:"lead",view:"pattern",lane:0,group:0,erase:!1,playing:!1,armed:!1,tick:-1,sel:null,section:0,browse:null},this.listeners=new Map,this.undoStack=[],this.redoStack=[],this.saveTimer=null,this.dirty=!1,this.engine=null,this.lastSaved=0,this.settings={...or};try{Object.assign(this.settings,JSON.parse(localStorage.getItem(Ds+"settings")||"{}"))}catch{}this.diceMark=null}setSetting(e,t){this.settings[e]=t;try{localStorage.setItem(Ds+"settings",JSON.stringify(this.settings))}catch{}e.startsWith("metro")&&this.send(...this.metroMessages()),this.changed("settings:"+e)}metroMessages(){let e=this.settings;return[{type:"batch",list:[{type:"set",key:"metro",value:e.metro?e.metroAlways?2:1:0},{type:"set",key:"metroLevel",value:e.metroLevel}]}]}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.listeners.get(e).delete(t)}emit(e,t){let s=this.listeners.get(e);if(s)for(let i of s)i(t)}changed(e){this.emit("change",e)}async init(){let e=null;try{let t=localStorage.getItem(Ds+"last");t&&(e=await Fe.get("projects",t))}catch{}if(e)try{e=Ht(e)}catch{e=null}return e||(e=this.starterProject()),this.project=e,this.ensurePresets(),Ui(),e}starterProject(e){let t=e&&Ze.find(a=>a.style===e)||Ze[0],s=et(t.style),i=At({kit:t.kit.slice(),bass:t.bass||jt.bass,lead:t.lead||jt.lead,tempo:s?s.bpm:118,key:s?s.key:2,scale:s?s.scale:"minor",name:s?"Id\xE9e "+s.short:"Nouvelle id\xE9e"});return i.parts.drum.rhythm=t.rhythm.slice(),i}ensurePresets(){let e=this.project,t=e.parts.drum;for(let s=0;s<4;s++)(!t.kit[s]||!ye(t.kit[s]))&&(t.kit[s]=jt.kit[s]);(!e.parts.bass.preset||!ye(e.parts.bass.preset))&&(e.parts.bass.preset=jt.bass),(!e.parts.lead.preset||!ye(e.parts.lead.preset))&&(e.parts.lead.preset=jt.lead)}scheduleSave(){this.dirty=!0,clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.save(),700)}async save(){if(clearTimeout(this.saveTimer),!!this.project){this.project.updated=Date.now();try{await Fe.put("projects",JSON.parse(JSON.stringify(this.project))),localStorage.setItem(Ds+"last",this.project.id),this.dirty=!1,this.lastSaved=Date.now(),this.emit("saved",this.lastSaved)}catch(e){this.emit("error","Sauvegarde impossible : "+(e&&e.message||e))}}}async listProjects(){return(await Fe.all("projects")).sort((t,s)=>(s.updated||0)-(t.updated||0))}async openProject(e){await this.save();let t=await Fe.get("projects",e);if(!t)throw new Error("Projet introuvable");this.loadProject(Ht(t))}loadProject(e){this.project=e,this.ensurePresets(),this.undoStack=[],this.redoStack=[],this.ui.sel=null,this.syncAll(),this.changed("project"),this.scheduleSave()}async newProject(e){await this.save(),this.loadProject(this.starterProject(e))}planRandom(e){return vi(this.project,e)}applyRandom(e){let t=this.undoStack[this.undoStack.length-1];(!t||t!==this.diceMark)&&this.snapshot(),gi(this.project,e),this.syncAll(),this.changed("project"),this.scheduleSave(),this.diceMark=this.undoStack[this.undoStack.length-1]}planRandomProject(){return ha()}async duplicateProject(){await this.save();let e=JSON.parse(JSON.stringify(this.project));e.id=Et(),e.name=this.project.name+" (copie)",e.created=e.updated=Date.now(),this.loadProject(e)}async deleteProject(e){if(await Fe.del("projects",e),this.project&&this.project.id===e){let t=await this.listProjects();t.length?this.loadProject(Ht(t[0])):this.loadProject(this.starterProject())}}rename(e){this.project.name=e.slice(0,80)||"Sans titre",this.changed("name"),this.scheduleSave()}snapshot(){this.undoStack.push(JSON.stringify(this.project)),this.undoStack.length>rr&&this.undoStack.shift(),this.redoStack.length=0,this.changed("undo")}undo(){return this.undoStack.length?(this.redoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.undoStack.pop())),!0):!1}redo(){return this.redoStack.length?(this.undoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.redoStack.pop())),!0):!1}restore(e){let t=this.ui.playing;this.project=e,this.syncAll(!0),this.changed("project"),this.changed("undo"),this.scheduleSave()}send(e){this.engine&&this.engine.send(e)}presetMessage(e,t){let s=this.project;if(e==="drum"){let i=ye(s.parts.drum.kit[t]);return{type:"preset",part:e,lane:t,preset:i,macros:s.parts.drum.macros[t]}}return{type:"preset",part:e,preset:ye(s.parts[e].preset),macros:s.parts[e].macros}}engineState(){let e=[];for(let t=0;t<4;t++)e.push(this.presetMessage("drum",t));return e.push(this.presetMessage("bass")),e.push(this.presetMessage("lead")),e.push({type:"project",project:this.project}),e.push({type:"erase",on:this.ui.erase}),e.push(...this.metroMessages()[0].list),e}syncAll(){this.engine&&this.engine.send({type:"batch",list:this.engineState()})}onEngine(e){let t=this.project;switch(e.type){case"pos":this.ui.tick=e.tick,this.emit("pos",e);break;case"state":this.ui.playing=e.playing,this.ui.armed=e.armed,this.changed("transport");break;case"takeStart":this.snapshot();break;case"autoStart":this.snapshot();break;case"take":{let s=t.patterns[e.pat];if(!s)break;e.part==="drum"?s.drum[e.lane].hits=e.data:s[e.part].notes=e.data,this.changed("notes"),this.scheduleSave();break}case"gest":{let s=t.patterns[e.pat];if(!s)break;s.gest=s.gest||{bass:[],lead:[],drum:[]},s.gest[e.part]=e.data,this.changed("gest"),this.scheduleSave();break}case"auto":{let s=t.patterns[e.pat];if(!s)break;e.data?(s.auto[e.target]=s.auto[e.target]||{},s.auto[e.target][e.slot]=e.data):s.auto[e.target]&&(delete s.auto[e.target][e.slot],Object.keys(s.auto[e.target]).length||delete s.auto[e.target]),this.changed("auto"),this.scheduleSave();break}case"macro":{let s=this.macrosFor(e.target,!0);s[e.slot]=Math.round(e.value*1e3)/1e3,this.changed("macro"),this.scheduleSave();break}case"section":this.ui.section=e.index,this.changed("section");break;default:break}}macrosFor(e,t){let s=this.project;if(e==="bass"||e==="lead")return!s.parts[e].macros&&t&&(s.parts[e].macros=[null,null,null,null,null,null,null]),s.parts[e].macros;let i=+e.slice(1);return!s.parts.drum.macros[i]&&t&&(s.parts.drum.macros[i]=[null,null,null,null,null,null,null]),s.parts.drum.macros[i]}macroValue(e,t){let s=this.macrosFor(e,!1);if(s&&s[t]!==null&&s[t]!==void 0)return s[t];let i=this.presetFor(e);if(t===6)return i&&i.expr&&i.expr.def!==void 0?i.expr.def:.5;let a=i&&i.macros&&i.macros[t];return a&&a.def!==void 0?a.def:.5}presetFor(e){let t=this.project;return e==="bass"||e==="lead"?ye(t.parts[e].preset):ye(t.parts.drum.kit[+e.slice(1)])}get pattern(){return this.project.patterns[this.project.current]}setPreset(e,t,s){let i=this.project;this.snapshot(),e==="drum"?(i.parts.drum.kit[t]=s,i.parts.drum.macros[t]=null):(i.parts[e].preset=s,i.parts[e].macros=null),this.send(this.presetMessage(e,t)),this.changed("preset"),this.scheduleSave()}applyKit(e,t){let s=na(e);if(!s)return;this.snapshot();let i=this.project;if(i.parts.drum.kit=s.kit.slice(),i.parts.drum.macros=[null,null,null,null],i.parts.drum.rhythm=s.rhythm.slice(),t){s.bass&&(i.parts.bass.preset=s.bass,i.parts.bass.macros=null),s.lead&&(i.parts.lead.preset=s.lead,i.parts.lead.macros=null);let a=et(s.style);a&&(i.tempo=a.bpm,i.key=a.key,i.scale=a.scale)}this.syncAll(),this.changed("project"),this.scheduleSave()}set(e,t,s={}){let i=this.project;switch(s.undo&&this.snapshot(),e){case"tempo":i.tempo=Math.round(Math.min(220,Math.max(40,t))),this.send({type:"set",key:e,value:i.tempo});break;case"swing":i.swing=Math.min(75,Math.max(50,Math.round(t))),this.send({type:"set",key:e,value:i.swing});break;case"key":i.key=(t%12+12)%12,this.send({type:"set",key:e,value:i.key});break;case"scale":i.scale=t,this.send({type:"set",key:e,value:t});break;case"bars":Qi(i,t),this.send({type:"project",project:i});break;default:break}this.changed(e),this.scheduleSave()}setPart(e,t,s,i){let a=this.project;if(e==="drum")a.parts.drum[t][i]=s,this.send({type:"set",key:t,value:s,part:e,lane:i});else{let r=a.parts[e];t==="steps"?Ji(r,s,a.scale):t==="range"?r.range=s:(r[t]=s,this.send({type:"set",key:t==="q"?"quant":t,value:s,part:e}))}this.changed(e+":"+t),this.scheduleSave()}setMix(e,t){let s=this.project;s.mix[e]=t,this.send({type:"set",key:"mix",value:{[e]:t}}),this.changed("mix"),this.scheduleSave()}setLevel(e,t,s){e==="drum"?(this.project.parts.drum.level[t]=s,this.send({type:"set",key:"level",part:e,lane:t,value:s})):(this.project.parts[e].level=s,this.send({type:"set",key:"level",part:e,value:s})),this.changed("mix"),this.scheduleSave()}setMute(e,t,s){e==="drum"?(this.project.parts.drum.mute[t]=s,this.send({type:"set",key:"mute",part:e,lane:t,value:s})):(this.project.parts[e].mute=s,this.send({type:"set",key:"mute",part:e,value:s})),this.changed("mix"),this.scheduleSave()}eraseSpan(e,t,s,i){this.snapshot();let a=this.pattern;li(a,e,t,s,i,!0),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearPart(e,t){this.snapshot();let s=384*this.project.bars;li(this.pattern,e,t,0,s,!1),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearAuto(e,t){this.snapshot();let s=this.pattern;s.auto[e]&&(t===void 0?delete s.auto[e]:(delete s.auto[e][t],Object.keys(s.auto[e]).length||delete s.auto[e]));let i=t===void 0?[0,1,2,3,4,5,6]:[t];for(let a of i)this.send({type:"auto",pat:this.project.current,target:e,slot:a,data:null});this.changed("auto"),this.scheduleSave()}pushPattern(e,t){let s=this.pattern,i=this.project.current;if(s.gest&&this.send({type:"gest",pat:i,part:e,data:s.gest[e]||[]}),e==="drum"){let a=t==null?[0,1,2,3]:[t];for(let r of a)this.send({type:"pattern",pat:i,part:e,lane:r,data:s.drum[r].hits});for(let r of a)this.pushAuto("d"+r)}else this.send({type:"pattern",pat:i,part:e,data:s[e].notes}),this.pushAuto(e)}pushAuto(e){let t=this.pattern,s=this.project.current;for(let i=0;i<7;i++)this.send({type:"auto",pat:s,target:e,slot:i,data:t.auto[e]&&t.auto[e][i]?t.auto[e][i]:null})}selectPattern(e){let t=this.project;e<0||e>=t.patterns.length||(t.current=e,this.send({type:"set",key:"current",value:e}),this.changed("pattern"),this.scheduleSave())}addPattern(e){let t=this.project;if(t.patterns.length>=8)return;this.snapshot();let s=String.fromCharCode(65+t.patterns.length),i=e!==void 0?{...JSON.parse(JSON.stringify(t.patterns[e])),name:s}:Rt(s);t.patterns.push(i),t.current=t.patterns.length-1,this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave()}deletePattern(e){let t=this.project;t.patterns.length<=1||(this.snapshot(),t.patterns.splice(e,1),t.patterns.forEach((s,i)=>{s.name=String.fromCharCode(65+i)}),t.song.sections=t.song.sections.filter(s=>s.p!==e).map(s=>({...s,p:s.p>e?s.p-1:s.p})),t.current=Math.min(t.current,t.patterns.length-1),t.song.sections.length||(t.song.enabled=!1),this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave())}setSong(e,t=!0){t&&this.snapshot(),this.project.song=e,this.send({type:"set",key:"song",value:e}),this.changed("song"),this.scheduleSave()}autoArrange(){let e=this.project,t=0,s=e.patterns.length>1?1:0,i=(r,n,l={})=>({p:r,reps:n,mute:l}),a=[i(t,2,{d0:!0,bass:!0,lead:!0}),i(t,2,{lead:!0}),i(s,4),i(t,2,{d0:!0,d1:!0,bass:!0}),i(s,4),i(t,2,{bass:!0,d2:!0,d3:!0})];this.setSong({enabled:!0,sections:a})}setErase(e){this.ui.erase=e,this.send({type:"erase",on:e}),this.changed("erase")}exportProjectJSON(){return JSON.stringify({...this.project,app:"MOTIF 3",exported:new Date().toISOString()},null,1)}importProjectText(e){let t=JSON.parse(e),s=Ht(t);return s.id=Et(),s.updated=Date.now(),this.loadProject(s),s}async backupAll(){let e=await Fe.all("projects");return JSON.stringify({format:"motif-3-backup",exported:new Date().toISOString(),projects:e},null,1)}async restoreBackup(e){let t=JSON.parse(e);if(t.format!=="motif-3-backup"||!Array.isArray(t.projects))throw new Error("Sauvegarde non reconnue");let s=0;for(let i of t.projects)try{let a=Ht(i);await Fe.put("projects",a),s++}catch{}return s}};var qs=class{constructor({workletUrl:e,onMessage:t,onState:s}){this.workletUrl=e,this.onMessage=t,this.onState=s||(()=>{}),this.ctx=null,this.node=null,this.ready=!1,this.starting=null,this.samples=new Map,this.sampleSets=[],this.loadedBanks=new Set,this.replay=()=>[],this.queue=[],this.lastFrameCheck=0,this.setSessionType()}setSessionType(){try{"audioSession"in navigator&&(navigator.audioSession.type="playback")}catch{}}get running(){return!!(this.ctx&&this.ctx.state==="running"&&this.ready)}start(){return this.running?Promise.resolve(!0):this.ctx&&this.ready&&this.ctx.state!=="closed"?this.ctx.resume().then(()=>this.ctx.state==="running"):this.starting?this.starting:(this.starting=this.build().finally(()=>{this.starting=null}),this.starting)}async build(){this.setSessionType();let e=window.AudioContext||window.webkitAudioContext,t=new e({latencyHint:"interactive"});this.ctx=t;let s=t.resume();t.onstatechange=()=>this.onState(t.state),await t.audioWorklet.addModule(this.workletUrl);let i=new AudioWorkletNode(t,"motif-engine",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]});i.port.onmessage=n=>this.receive(n.data),i.onprocessorerror=()=>{this.ready=!1,this.onState("error")},i.connect(t.destination),this.node=i;let a=Array.from(this.samples.values());a.length&&i.port.postMessage({type:"samples",list:a}),this.sampleSets.length&&i.port.postMessage({type:"sampleSets",sets:this.sampleSets});let r=this.replay();r.length&&i.port.postMessage({type:"batch",list:r});for(let n of this.queue)i.port.postMessage(n);this.queue.length=0,this.ready=!0;try{await s}catch{}return this.onState(t.state),t.state==="running"}async rebuild(){let e=this.ctx;if(this.ready=!1,this.node=null,this.ctx=null,e)try{await e.close()}catch{}return this.start()}receive(e){if(e){if(e.type==="batch"){for(let t of e.list)this.onMessage(t);return}this.onMessage(e)}}send(e){this.node&&this.ready?this.node.port.postMessage(e):e.type==="project"||e.type==="preset"||e.type==="set"||e.type==="macro"||e.type==="pattern"||e.type}suspend(){return this.ctx&&this.ctx.state==="running"?this.ctx.suspend().catch(()=>{}):Promise.resolve()}async probe(e=350){if(!this.ctx)return!1;let t=this.ctx.currentTime;return await new Promise(s=>setTimeout(s,e)),this.ctx.state==="running"&&this.ctx.currentTime>t}async loadBank(e,t){if(this.loadedBanks.has(e))return;let s=await fetch(e);if(!s.ok)throw new Error("Banque introuvable : "+e);let i=await s.json(),a=e.slice(0,e.lastIndexOf("/")+1),r=this.ctx||new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(1,1,48e3),n=0,l=[],c=i.samples.map(async d=>{if(this.samples.has(d.id))return;let h=await fetch(a+d.file);if(!h.ok)throw new Error("Son manquant : "+d.file);let v=await h.arrayBuffer(),p=await nr(r,v),m=p.getChannelData(0),f;if(p.numberOfChannels>1){let x=p.getChannelData(1);f=new Float32Array(m.length);for(let T=0;T<f.length;T++)f[T]=.5*(m[T]+x[T])}else f=new Float32Array(m);let b=new Float32Array(f.length+4);b.set(f,1);let y={id:d.id,sr:p.sampleRate,data:b,gain:d.gain||1,loopStart:d.loopStart?d.loopStart*p.sampleRate/d.sr+1:0,loopEnd:d.loopEnd?d.loopEnd*p.sampleRate/d.sr+1:0};this.samples.set(d.id,y),l.push(y),n++,t&&t(n/i.samples.length)});if(await Promise.all(c),i.sets)for(let d of i.sets)this.sampleSets.find(h=>h.id===d.id)||this.sampleSets.push(d);this.loadedBanks.add(e),this.node&&this.ready&&(l.length&&this.node.port.postMessage({type:"samples",list:l}),this.node.port.postMessage({type:"sampleSets",sets:this.sampleSets}))}};function nr(o,e){return new Promise((t,s)=>{let i=o.decodeAudioData(e,t,s);i&&i.then&&i.then(t,s)})}function u(o,e,...t){let s=document.createElement(o);if(e)for(let i in e){let a=e[i];if(!(a==null||a===!1))if(i==="class")s.className=a;else if(i==="html")s.innerHTML=a;else if(i==="text")s.textContent=a;else if(i.startsWith("on"))s.addEventListener(i.slice(2),a);else if(i==="style"&&typeof a=="object")for(let r in a)r.startsWith("--")?s.style.setProperty(r,a[r]):s.style[r]=a[r];else s.setAttribute(i,a===!0?"":a)}for(let i of t.flat())i!=null&&i!==!1&&s.append(i.nodeType?i:document.createTextNode(String(i)));return s}function lr(o){let e=document.createElement("template");return e.innerHTML=o.trim(),e.content.firstChild}var ae=(o,e="")=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${e}>${o}</svg>`,cr={logo:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="9" width="3.2" height="6" rx="1.6" fill="var(--drum)"/><rect x="7" y="5" width="3.2" height="14" rx="1.6" fill="var(--bass)"/><rect x="12" y="2" width="3.2" height="20" rx="1.6" fill="var(--lead)"/><rect x="17" y="7" width="3.2" height="10" rx="1.6" fill="currentColor" opacity=".55"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" fill="currentColor"/></svg>',stop:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor"/></svg>',rec:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.5"/></svg>',undo:ae('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'),redo:ae('<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>'),erase:ae('<path d="m7 21-4.3-4.3a1.5 1.5 0 0 1 0-2.1L13.4 3.9a1.5 1.5 0 0 1 2.1 0l4.6 4.6a1.5 1.5 0 0 1 0 2.1L10 21"/><path d="M22 21H7"/><path d="m5.5 12 6.5 6.5"/>'),trash:ae('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>'),left:ae('<path d="m15 18-6-6 6-6"/>'),right:ae('<path d="m9 18 6-6-6-6"/>'),down:ae('<path d="m6 9 6 6 6-6"/>'),close:ae('<path d="M18 6 6 18M6 6l12 12"/>'),plus:ae('<path d="M12 5v14M5 12h14"/>'),check:ae('<path d="M20 6 9 17l-5-5"/>'),more:ae('<circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/>'),drum:ae('<circle cx="7" cy="8" r="1.4" fill="currentColor"/><circle cx="12" cy="8" r="1.4" fill="currentColor"/><circle cx="17" cy="8" r="1.4" fill="currentColor"/><circle cx="7" cy="14" r="1.4" fill="currentColor"/><circle cx="12" cy="14" r="1.4" fill="currentColor"/><circle cx="17" cy="14" r="1.4" fill="currentColor"/>','stroke-width="1"'),bass:ae('<path d="M2 13c2.5 0 2.5-6 5-6s2.5 10 5 10 2.5-10 5-10 2.5 6 5 6"/>'),lead:ae('<path d="M3 15l4-7 4 9 4-11 3 7h3"/>'),pattern:ae('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 4v16M13 4v16M18 4v16" opacity=".55"/>'),tweaks:ae('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="9" cy="10" r="2.2"/><circle cx="15" cy="15" r="2.2"/>'),mix:ae('<path d="M6 4v16M12 4v16M18 4v16"/><rect x="4" y="13" width="4" height="3" rx="1" fill="currentColor"/><rect x="10" y="7" width="4" height="3" rx="1" fill="currentColor"/><rect x="16" y="11" width="4" height="3" rx="1" fill="currentColor"/>'),song:ae('<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="18" r="2"/>'),share:ae('<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'),download:ae('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'),folder:ae('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),file:ae('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),note:ae('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),sun:ae('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:ae('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),info:ae('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),wifi:ae('<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>'),copy:ae('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),sparkle:ae('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>'),speaker:ae('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),metro:ae('<path d="M9.2 3h5.6l4.2 18H5z"/><path d="M12 15.5 17.5 6"/><path d="M8 15.5h8"/>'),dice:ae('<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/>'),piano:ae('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 13v7M15 13v7"/><rect x="7.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/><rect x="13.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/>'),settings:ae('<path d="M4 7h9M18 7h2M4 17h3M12 17h8"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="9.5" cy="17" r="2.3"/>'),touch:ae('<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="7.5" opacity=".55"/>'),pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/></svg>'};function K(o){return lr(cr[o])}function hr(){return Math.min(window.devicePixelRatio||1,2.5)}function ut(o){let e=o.getBoundingClientRect(),t=hr(),s=Math.max(1,Math.round(e.width*t)),i=Math.max(1,Math.round(e.height*t));return(o.width!==s||o.height!==i)&&(o.width=s,o.height=i),{w:e.width,h:e.height,d:t}}function Re(o,e=document.querySelector(".app")||document.documentElement){return getComputedStyle(e).getPropertyValue(o).trim()}function ua(o,{get:e,set:t,step:s=12,axis:i="y",onStart:a,onEnd:r,onTap:n}){let l=null;o.addEventListener("pointerdown",d=>{d.preventDefault();try{o.setPointerCapture(d.pointerId)}catch{}l={x:d.clientX,y:d.clientY,v:e(),moved:!1,id:d.pointerId},a&&a()}),o.addEventListener("pointermove",d=>{if(!l||d.pointerId!==l.id)return;let h=i==="y"?l.y-d.clientY:d.clientX-l.x;Math.abs(h)>4&&(l.moved=!0),l.moved&&t(l.v+Math.round(h/s),d)});let c=d=>{if(!l||d.pointerId!==l.id)return;let h=l;l=null,!h.moved&&n&&n(d),r&&r()};o.addEventListener("pointerup",c),o.addEventListener("pointercancel",c)}var Qe=class{constructor(e){this.o=e,this.el=u("div",{class:"dial",role:"slider",tabindex:"0","aria-label":e.label}),this.cv=u("canvas"),this.vEl=u("div",{class:"v"}),this.lEl=u("div",{class:"l",text:e.label}),this.sEl=u("div",{class:"s"}),this.el.append(this.cv,this.vEl,this.lEl,this.sEl);let t=null;this.el.addEventListener("pointerdown",i=>{i.preventDefault();try{this.el.setPointerCapture(i.pointerId)}catch{}t={x:i.clientX,y:i.clientY,v:this.o.get(),id:i.pointerId,moved:!1,axis:null},this.el.classList.add("active"),e.onStart&&e.onStart()}),this.el.addEventListener("pointermove",i=>{if(!t||i.pointerId!==t.id)return;let a=i.clientX-t.x,r=t.y-i.clientY;if(!t.axis&&Math.hypot(a,r)>8&&(t.axis=Math.abs(a)>Math.abs(r)*1.3?"x":"y"),t.axis==="x"&&e.onSwipeX&&!t.swiped&&Math.abs(a)>26&&(t.swiped=!0,e.onSwipeX(a>0?1:-1),t.v=this.o.get(),t.y=i.clientY,t.axis="y2"),t.axis==="y"||t.axis==="y2"){t.moved=!0;let n=e.step||14,l=Math.max(e.min(),Math.min(e.max(),t.v+Math.round(r/n)));l!==this.o.get()&&(this.o.set(l),this.render())}});let s=i=>{if(!t||i.pointerId!==t.id)return;let a=t;t=null,this.el.classList.remove("active"),!a.axis&&e.onTap&&e.onTap(),e.onEnd&&e.onEnd()};this.el.addEventListener("pointerup",s),this.el.addEventListener("pointercancel",s),this.el.addEventListener("keydown",i=>{let a=i.key==="ArrowUp"||i.key==="ArrowRight"?1:i.key==="ArrowDown"||i.key==="ArrowLeft"?-1:0;if(a){i.preventDefault();let r=Math.max(e.min(),Math.min(e.max(),this.o.get()+a));this.o.set(r),this.render()}else(i.key==="Enter"||i.key===" ")&&e.onTap&&(i.preventDefault(),e.onTap())})}render(){let e=this.o,t=e.format(e.get());this.vEl.textContent=t.v,this.sEl.textContent=t.s||"",t.l!==void 0&&(this.lEl.textContent=t.l),this.el.setAttribute("aria-valuenow",String(e.get())),this.el.setAttribute("aria-valuetext",`${t.v} ${t.s||""}`.trim()),this.el.classList.toggle("ties",!!t.ties);let{w:s,h:i,d:a}=ut(this.cv),r=this.cv.getContext("2d");r.setTransform(a,0,0,a,0,0),r.clearRect(0,0,s,i),e.ring&&e.ring(r,s,i,e.get())}};function yi(o,e,t,s,i,a,r,n){let l=e/2,c=t/2-2,d=Math.min(e,t)/2-8;if(o.lineCap="round",o.strokeStyle=n,o.lineWidth=1,o.beginPath(),o.arc(l,c,d,0,Math.PI*2),o.stroke(),!s||!s.len){o.strokeStyle=r,o.lineWidth=3,o.globalAlpha=.6,o.beginPath(),o.arc(l,c,d,-Math.PI/2,Math.PI*1.5),o.stroke(),o.globalAlpha=1;return}let h=v=>-Math.PI/2+v/s.len*Math.PI*2;if(s.ev.forEach(([v,p,m],f)=>{let b=h(v),y=h(Math.min(v+p,s.len))-.02;if(o.strokeStyle=r,o.lineWidth=m?5:3.5,o.beginPath(),o.arc(l,c,d,b+.03,Math.max(b+.06,y)),o.stroke(),i&&i.includes(f)){let x=s.ev[(f-1+s.ev.length)%s.ev.length];o.strokeStyle=r,o.lineWidth=2,o.globalAlpha=.9,o.beginPath(),o.arc(l,c,d-8,h(x[0])+.05,b-.02+(f===0?Math.PI*2:0)),o.stroke(),o.globalAlpha=1,o.fillStyle=r,o.beginPath(),o.arc(l+Math.cos(b)*(d-8),c+Math.sin(b)*(d-8),2.6,0,Math.PI*2),o.fill()}}),a>=0){let v=h(a);o.fillStyle=Re("--ink"),o.beginPath(),o.arc(l+Math.cos(v)*d,c+Math.sin(v)*d,3,0,Math.PI*2),o.fill()}}var qt=Lt.lo,hs=Lt.hi,ur=Lt.maxN;function us(o,e){let t=48+e+o;return mt[(t%12+12)%12]+(Math.floor(t/12)-1)}var Cs=class{constructor({get:e,set:t,scale:s,onStart:i}){this.get=e,this.set=t,this.scale=s,this.onStart=i,this.el=u("div",{class:"range",role:"group","aria-label":"Plage de notes",tabindex:"0"}),this.cv=u("canvas"),this.lbl=u("div",{class:"lbl"}),this.el.append(this.cv,this.lbl),this.drag=null,this.el.addEventListener("pointerdown",a=>this.down(a)),this.el.addEventListener("pointermove",a=>this.move(a)),this.el.addEventListener("pointerup",a=>this.up(a)),this.el.addEventListener("pointercancel",a=>this.up(a)),this.el.addEventListener("keydown",a=>this.key(a))}x2semi(e){return qt+e/this.w*(hs-qt)}semi2x(e){return(e-qt)/(hs-qt)*this.w}notes(){let{scale:e,steps:t}=this.scale();return Ls(e,t)}windowPx(){let{scale:e,steps:t}=this.scale(),s=this.get(),i=ft(s,e,t),a=i[0].semi,r=i[i.length-1].semi;return{x0:this.semi2x(a-.45),x1:this.semi2x(r+.55),lo:a,hi:r,cols:i}}nearestNote(e){let t=this.notes(),s=t[0],i=1/0;for(let a of t){let r=Math.abs(a-e);r<i&&(i=r,s=a)}return s}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.el.getBoundingClientRect(),s=e.clientX-t.left,i=this.windowPx(),a=Math.max(18,Math.min(30,(i.x1-i.x0)*.25)),r;Math.abs(s-i.x0)<=a&&s<(i.x0+i.x1)/2?r="left":Math.abs(s-i.x1)<=a&&s>(i.x0+i.x1)/2?r="right":s>i.x0&&s<i.x1?r="move":r="jump";let n=this.get();this.drag={id:e.pointerId,mode:r,x0:s,lo:i.lo,hi:i.hi,n:n.n,moved:!1},this.onStart&&this.onStart(),r==="jump"&&this.jumpTo(s,n.n),this.render()}jumpTo(e,t){let{scale:s,steps:i}=this.scale(),a=this.notes(),r=this.x2semi(e),n=0,l=1/0;a.forEach((d,h)=>{let v=Math.abs(d-r);v<l&&(l=v,n=h)});let c=ri({lo:a[Math.max(0,n-Math.floor(t/2))],n:t},a[Math.max(0,n-Math.floor(t/2))],s,i);this.set(c),this.drag.lo=c.lo,this.drag.mode="move",this.drag.x0=e}move(e){let t=this.drag;if(!t||e.pointerId!==t.id)return;let s=this.el.getBoundingClientRect(),i=e.clientX-s.left;Math.abs(i-t.x0)>3&&(t.moved=!0);let a=(i-t.x0)/this.w*(hs-qt),{scale:r,steps:n}=this.scale(),l=this.get(),c;t.mode==="move"?c=ri({lo:t.lo,n:t.n},t.lo+a,r,n):t.mode==="left"?c=ni({lo:t.lo,n:t.n},"left",t.lo+a,r,n):t.mode==="right"&&(c=ni({lo:t.lo,n:t.n},"right",t.hi+a,r,n)),c&&(c.lo!==l.lo||c.n!==l.n)&&this.set(c),this.render()}up(e){this.drag&&e.pointerId===this.drag.id&&(this.drag=null,this.render())}key(e){let t=this.notes(),s=this.get(),i=t.indexOf(this.nearestNote(s.lo));if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();let a=e.key==="ArrowRight"?1:-1;if(e.shiftKey)this.set({lo:s.lo,n:Math.max(1,Math.min(ur,s.n+a))});else{let r=Math.max(0,Math.min(t.length-s.n,i+a));this.set({lo:t[r],n:s.n})}this.render()}}render(){let{w:e,h:t,d:s}=ut(this.cv);this.w=e,this.h=t;let i=this.cv.getContext("2d");i.setTransform(s,0,0,s,0,0),i.clearRect(0,0,e,t);let{scale:a,steps:r,key:n}=this.scale(),l=Re("--accent"),c=Re("--ink"),d=Re("--ink-3"),h=document.documentElement.dataset.theme==="dark",v=6,p=t-18;for(let T=Math.floor(qt/12);T<Math.ceil(hs/12);T++){let E=this.semi2x(T*12-.5),O=this.semi2x(T*12+11.5);i.fillStyle=T%2===0?h?"rgba(255,255,255,0.045)":"rgba(0,0,0,0.045)":"rgba(0,0,0,0)",i.fillRect(E,v,O-E,p-v)}let m=this.windowPx(),f=9;i.fillStyle=l,i.globalAlpha=h?.22:.3,Ee(i,m.x0,v-2,m.x1-m.x0,p-v+4,f),i.fill(),i.globalAlpha=1,i.strokeStyle=l,i.lineWidth=2,Ee(i,m.x0,v-2,m.x1-m.x0,p-v+4,f),i.stroke();let b=this.notes(),y=e/(hs-qt);for(let T of b){let E=this.semi2x(T),O=T>=m.lo&&T<=m.hi,j=(T%12+12)%12===0,le=Math.floor(T/12);i.fillStyle=O?c:d,i.globalAlpha=O?le%2===0?1:.72:.35;let V=Math.max(2,Math.min(y*.55,6)),P=j?p-v-4:(p-v)*.62;Ee(i,E-V/2,p-2-P,V,P,V/2),i.fill(),i.globalAlpha=1}i.fillStyle=l;for(let T of[m.x0,m.x1])Ee(i,T-3.5,v+(p-v)/2-11,7,22,3.5),i.fill();this.drag&&(i.fillStyle=l,i.globalAlpha=.12,i.fillRect(0,0,e,t),i.globalAlpha=1);let x=m.cols.length;this.lbl.textContent=`${us(m.lo,n)} \u2192 ${us(m.hi,n)} \xB7 ${x} note${x>1?"s":""}`,this.el.setAttribute("aria-label","Plage de notes : "+this.lbl.textContent)}};function Ee(o,e,t,s,i,a){a=Math.max(0,Math.min(a,s/2,i/2)),o.beginPath(),o.moveTo(e+a,t),o.lineTo(e+s-a,t),o.quadraticCurveTo(e+s,t,e+s,t+a),o.lineTo(e+s,t+i-a),o.quadraticCurveTo(e+s,t+i,e+s-a,t+i),o.lineTo(e+a,t+i),o.quadraticCurveTo(e,t+i,e,t+i-a),o.lineTo(e,t+a),o.quadraticCurveTo(e,t,e+a,t),o.closePath()}function bi(o){return Array.from({length:o},(e,t)=>({x0:t/o,y0:0,x1:(t+1)/o,y1:1}))}function da(o){let{keys:e,whites:t}=o,s=[];for(let a of e)a.black||s.push({x0:a.pos/t,y0:0,x1:(a.pos+1)/t,y1:1});let i=zt/t/2;for(let a of e)a.black&&s.push({x0:a.pos/t-i,y0:0,x1:a.pos/t+i,y1:bt,cut:!0});return s}var Ct={plain:0,shaded:1,white:2,black:3,laneEven:4,laneOdd:5};function Wt(o){if(o=(o||"").trim(),o.startsWith("color(")){let t=o.match(/[\d.]+/g).map(Number);return[t[t.length-3],t[t.length-2],t[t.length-1]].map(s=>s>1?s/255:s)}if(o.startsWith("#"))return(o.length===4?o.slice(1).split("").map(s=>s+s):[o.slice(1,3),o.slice(3,5),o.slice(5,7)]).map(s=>parseInt(s,16)/255);let e=o.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[0,0,0]}function dr(o,e,t,s){let i=n=>[1,1,1,n],a=n=>[0,0,0,n],r=n=>[...e,n];return s?[i(0),i(.03),i(.06),[.035,.015,.055,.72],i(0),i(.025)]:o?[i(0),i(.035),i(.075),[.031,.035,.047,1],i(0),i(.03)]:t==="aquarelle"?[a(0),a(.03),i(.55),[.16,.14,.13,.93],a(0),a(.025)]:t==="vitrail"?[a(.02),i(.16),i(.4),r(.9),i(.12),a(.03)]:[a(.035),i(.13),i(.34),r(.88),i(.1),a(.04)]}var pa={classique:0,aquarelle:1,vitrail:2},fa=(o,e,t)=>o.map((s,i)=>s+(e[i]-s)*t);function xi({kind:o,keys:e,sig:t,el:s,glass:i,hdr:a,slabs:r,fills:n,spill:l=0,radius:c,look:d="aquarelle",gel:h=1,glassLook:v="optique"}){let p=getComputedStyle(s.closest(".app")||document.documentElement),m=document.documentElement.dataset.theme!=="light",f=document.documentElement.hasAttribute("data-halloween"),b=Wt(p.getPropertyValue("--accent")),y=Wt(p.getPropertyValue("--accent-ink"));(m||!(d in pa))&&(d=m?"dark":"aquarelle");let x=d==="aquarelle",T=m?[26/255,28/255,35/255]:x?[.98,.965,.933]:d==="vitrail"?fa(b,[1,1,1],.35):b,E=m?[18/255,19/255,24/255]:x?[.945,.918,.871]:d==="vitrail"?fa(b,[1,1,1],.1):b,O=x?[.25,.2,.15,e&&e.length<=4?.18:.12]:o==="pad"&&e&&e.length<=4?m?[1,1,1,.1]:[0,0,0,.12]:m?[1,1,1,.06]:[0,0,0,.07],j=c||parseFloat(getComputedStyle(s).borderTopLeftRadius)||20,le=Wt(p.getPropertyValue("--surface")),V=Wt(p.getPropertyValue("--bg")),P=i?m?1:.6:0;return{kind:o,keys:e,dark:m,accent:b,bgTop:T,bgBot:E,sep:O,sepPx:e&&e.length<=4?2:1,kinds:dr(m,y,d,f),glass:!!i,hdr:a||1,radius:j,surf:le,appBg:V,slabs:r||[[0,0,1,1]],fills:n||[],spill:i?l:0,shadow:P,style:m?0:pa[d],gel:h,glassLook:v,keyGlow:m||x?[...b,x?.55:.5]:[1,1,1,.55],sig:`${o}|${t}|${m}|${f}|${d}|${h}|${v}|${b.join()}|${i}|${a}|${j}|${l}|${JSON.stringify(r||0)}|${JSON.stringify(n||0)}`}}function Os(o,e,t,s){o.width=t,o.height=s;let i=o.getContext("2d");return i.imageSmoothingEnabled=!1,i.fillStyle="#000",i.fillRect(0,0,t,s),(e||[]).forEach((a,r)=>{let n=Math.round(a.x0*t),l=Math.round(a.x1*t),c=Math.round(a.y0*s),d=Math.round(a.y1*s);a.cut&&(i.fillStyle="#000",i.fillRect(n-1,c,l-n+2,d-c+1)),i.fillStyle=`rgb(${r+1},${(a.kind||0)*40},0)`,i.fillRect(n,c,Math.max(1,l-n),Math.max(1,d-c))}),o}function ds(o,e,t,s){o.width=t,o.height=s;let i=o.getContext("2d");if(i.imageSmoothingEnabled=!1,!e)return i.fillStyle="rgb(1,0,0)",i.fillRect(0,0,t,s),o;i.fillStyle="#000",i.fillRect(0,0,t,s);let a=Math.max(1,Math.round(t/180));return e.forEach((r,n)=>{let l=Math.round(r.x0*t),c=Math.round(r.x1*t),d=Math.round(r.y0*s),h=Math.round(r.y1*s);r.cut&&(i.fillStyle="#000",i.fillRect(l-a,d,c-l+2*a,h-d+a)),i.fillStyle=`rgb(${n+1},0,0)`,i.fillRect(l+a,d+(r.y0>0?a:0),Math.max(1,c-l-2*a),Math.max(1,h-d-(r.y0>0?a:0)-(r.y1<1?a:0)))}),o}var _s=class{constructor(e,t={}){this.store=e,this.opts=t,this.el=u("div",{class:"pad",role:"application","aria-label":"Surface de jeu"}),this.cv=u("canvas"),this.hint=u("div",{class:"hint"},u("b",{text:"\xC0 toi de jouer."}),u("span",{text:""})),this.axY=u("div",{class:"ax y"}),this.el.append(this.cv,this.hint,this.axY),this.touches=new Map,this.ripples=[],this.level=0,this.raf=0,this.flash=new Map,this.ghosts=[],this.fx=null,this.ghouls=null,this.gpu=!1,this.under=!1,this.inkUnder=!1,this.pianoCache=null,this.el.addEventListener("pointerdown",s=>this.down(s)),this.el.addEventListener("pointermove",s=>this.move(s)),this.el.addEventListener("pointerup",s=>this.up(s)),this.el.addEventListener("pointercancel",s=>this.up(s,!0)),this.el.addEventListener("lostpointercapture",s=>{this.touches.has(s.pointerId)&&this.up(s,!0)}),this.el.addEventListener("contextmenu",s=>s.preventDefault()),this.ro=new ResizeObserver(()=>this.draw()),this.ro.observe(this.el)}get part(){return this.store.ui.part}columns(){let e=this.store.project,t=e.parts[this.part];return ft(t.range,e.scale,t.steps)}get piano(){return this.part!=="drum"&&!!this.store.settings.piano}pianoLayout(){let e=this.store.project,t=e.parts[this.part],s=`${t.range.lo}:${t.range.n}:${e.scale}:${t.steps}:${e.key}`;return(!this.pianoCache||this.pianoCache.k!==s)&&(this.pianoCache={k:s,L:Gi(t.range,e.scale,t.steps,e.key)}),this.pianoCache.L}inkShare(){return this.fx&&this.store.settings.fluid?.4:1}keyLayout(){if(this.part==="drum")return{sig:"drum",keys:bi(4).map((i,a)=>({...i,kind:a%2?Ct.laneOdd:Ct.laneEven}))};if(this.piano){let i=this.pianoLayout();return{sig:"piano:"+this.pianoCache.k,keys:da(i).map(a=>({...a,kind:a.cut?Ct.black:Ct.white}))}}let e=this.columns(),t=e.length,s=i=>(i.octave%2+2)%2===0;return{sig:"cols:"+t+":"+e.map(i=>s(i)?1:0).join(""),keys:bi(t).map((i,a)=>({...i,kind:s(e[a])?Ct.shaded:Ct.plain}))}}pitchClass(e,t){let s=this.store.project;return((s.key+Mt(e,t,s.scale))%12+12)%12}keyBox(e,t){if(!t.black)return{x0:t.pos/e.whites,w:1/e.whites};let s=zt/e.whites/2;return{x0:t.pos/e.whites-s,w:2*s}}setClock(e){this.clock=e,e.playing&&this.hasStrokes()&&this.kick()}playingPattern(){let e=this.clock,t=this.store.project;return e&&t.patterns[e.pat]||this.store.pattern}hasStrokes(e=this.part){let t=this.playingPattern().gest;return!!(t&&t[e]&&t[e].length)}clockTick(e){let t=this.clock;if(!t||!t.playing||t.tick<0)return-1;let s=Math.min(120,e-t.at)/t.msPerTick;return(t.tick+s)%t.L}pointToPad(e,t,s){if(e==="drum")return{x:(t+s[1])/4,y:1-s[2]};let i=this.store.project.scale,a=Mt(s[3],s[4],i);if(this.piano){let c=this.pianoLayout(),d=c.keys.find(v=>v.semi===a);if(!d)return null;let h=this.keyBox(c,d);return{x:h.x0+s[1]*h.w,y:(1-s[2])*(d.black?bt:1)}}let r=this.columns(),n=-1,l=3;return r.forEach((c,d)=>{let h=Math.abs(c.semi-a);h<l&&(l=h,n=d)}),n<0?null:{x:(n+s[1])/r.length,y:1-s[2]}}strokeAt(e,t,s){let i=t.p,a=i.length;if(!a||s<i[0][0]||s>i[a-1][0]+(a===1?6:1.5))return null;let r=0;for(;r<a-1&&i[r+1][0]<=s;)r++;let n=this.pointToPad(e,t.l,i[r]);if(r===a-1)return n;let l=this.pointToPad(e,t.l,i[r+1]);if(!n||!l)return n||l;let c=(s-i[r][0])/Math.max(.1,i[r+1][0]-i[r][0]);return{x:n.x+(l.x-n.x)*c,y:n.y+(l.y-n.y)*c}}drawReplay(e,t,s,i,a,r){let n=this.clockTick(r),l=this.part,c=this.playingPattern().gest,d=new Map;if(n<0||!c||!c[l])return this.strokePrev=d,!1;let h=this.store.settings.ghosts,v=new Set([...this.touches.values()].map(p=>p.lane));for(let p of c[l]){if(l!=="drum"&&this.touches.size)break;if(l==="drum"&&v.has(p.l))continue;let m=this.strokeAt(l,p,n);if(!m)continue;let f=this.strokePrev&&this.strokePrev.get(p);if(d.set(p,m),this.fx){let E=p.p[0],O=l==="drum"?void 0:this.pitchClass(E[3],E[4]);f?(m.x!==f.x||m.y!==f.y)&&this.fx.touch(l,m.x,m.y,m.x-f.x,m.y-f.y,"move",p.l,O):this.fx.touch(l,m.x,m.y,0,0,"down",p.l,O)}if(!h)continue;e.lineCap="round",e.lineJoin="round";let b=m;for(let E=1;E<=14;E++){let O=this.strokeAt(l,p,n-E*2);if(!O)break;let j=1-E/15;e.strokeStyle=i?re(a,.55*j):`rgba(255,255,255,${.15+.6*j})`,e.lineWidth=2+12*j,e.beginPath(),e.moveTo(b.x*t,b.y*s),e.lineTo(O.x*t,O.y*s),e.stroke(),b=O}let y=m.x*t,x=m.y*s,T=e.createRadialGradient(y,x,0,y,x,46);i?(T.addColorStop(0,re(a,.32)),T.addColorStop(1,re(a,0))):(T.addColorStop(0,"rgba(255,255,255,0.45)"),T.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=T,e.fillRect(y-46,x-46,92,92),e.lineWidth=2,e.strokeStyle=i?re(a,.8):"rgba(255,255,255,0.9)",e.setLineDash([5,4]),e.beginPath(),e.arc(y,x,19,0,Math.PI*2),e.stroke(),e.setLineDash([])}return this.strokePrev=d,!0}keyGeom(e,t){return t.black?{x:t.pos/e.whites,top:bt}:{x:(t.pos+.5)/e.whites,top:1}}local(e){let t=this.el.getBoundingClientRect();return{x:Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,(e.clientY-t.top)/t.height))}}msgFor(e,t,s){let i=this.part;if(i==="drum"){let l=Math.min(3,Math.floor(s.x*4)),c=s.x*4-l;return{type:"pad",part:i,lane:l,id:e,phase:t,x:c,y:1-s.y,v:.9}}if(this.piano){let l=this.pianoLayout(),c=Wi(l,s.x,s.y),d=c.black?1-Math.min(1,s.y/bt):1-s.y,h=this.keyBox(l,c),v=Math.min(1,Math.max(0,(s.x-h.x0)/h.w));return{type:"pad",part:i,id:e,phase:t,deg:c.deg,acc:c.acc,y:d,fx:v,v:.85,col:l.keys.indexOf(c)}}let a=this.columns(),r=Math.min(a.length-1,Math.floor(s.x*a.length)),n=a[r];return{type:"pad",part:i,id:e,phase:t,deg:n.deg,acc:n.acc,y:1-s.y,fx:s.x*a.length-r,v:.85,col:r}}down(e){e.preventDefault(),this.opts.onFirstTouch&&this.opts.onFirstTouch();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.local(e),s=this.msgFor(e.pointerId,"down",t);this.touches.set(e.pointerId,{...t,rx:t.x,ry:t.y,lane:s.lane,col:s.col,deg:s.deg,acc:s.acc,t:performance.now()}),this.fx&&(this.fx.touch(this.part,t.x,t.y,0,0,"down",s.lane,s.deg!==void 0?this.pitchClass(s.deg,s.acc):void 0),this.fx.press(e.pointerId,t.x,t.y,"down")),this.ghouls&&this.ghouls.press(e.pointerId,t.x,t.y,"down"),this.store.send(s),this.hint.style.opacity="0",this.kick()}move(e){let t=this.touches.get(e.pointerId);if(!t)return;let s=this.local(e);if(this.fx&&(this.fx.touch(this.part,s.x,s.y,s.x-t.rx,s.y-t.ry,"move",t.lane,t.pc),this.fx.press(e.pointerId,s.x,s.y,"move"),t.rx=s.x,t.ry=s.y),this.ghouls&&this.ghouls.press(e.pointerId,s.x,s.y,"move"),this.part==="drum"){let i=t.lane,a=Math.min(.999,Math.max(0,s.x*4-i));this.store.send({type:"pad",part:"drum",lane:i,id:e.pointerId,phase:"move",x:a,y:1-s.y}),t.x=(i+a)/4,t.y=s.y}else{let i=this.msgFor(e.pointerId,"move",s);t.x=s.x,t.y=s.y,t.col=i.col,t.deg=i.deg,t.acc=i.acc,this.fx&&(t.pc=this.pitchClass(i.deg,i.acc)),this.store.send(i)}}up(e,t){let s=this.touches.get(e.pointerId);if(!s)return;this.touches.delete(e.pointerId),this.fx&&this.fx.press(e.pointerId,s.x,s.y,"up"),this.ghouls&&this.ghouls.press(e.pointerId,s.x,s.y,"up");let i=this.part;i==="drum"?this.store.send({type:"pad",part:i,lane:s.lane,id:e.pointerId,phase:t?"cancel":"up"}):this.store.send({type:"pad",part:i,id:e.pointerId,phase:t?"cancel":"up"})}releaseAll(){for(let[e,t]of this.touches)this.part==="drum"?this.store.send({type:"pad",part:"drum",lane:t.lane,id:e,phase:"cancel"}):this.store.send({type:"pad",part:this.part,id:e,phase:"cancel"});this.touches.clear()}get layers(){return!!(this.fx||this.ghouls&&this.ghouls.on)}noteFx(...e){this.fx&&this.fx.note(...e),this.ghouls&&this.ghouls.on&&this.ghouls.note(...e)}onTrig(e,t){if(t){let r=this.part==="drum"?t.drum:t[this.part];this.level=Math.max(this.level*.6,r||0)}if(!e){this.level>.01&&this.kick();return}let s=this.part,i=performance.now(),a=this.store.settings.ghosts&&!this.hasStrokes(s);for(let r=0;r<e.length;r+=4){let n=e[r],l=e[r+1],c=e[r+2],d=e[r+3];if(d===-1&&this.layers){if(s==="drum"&&n===0){for(let[,h]of this.touches)if(h.lane===l){this.noteFx("drum",h.x,h.y,l,.9);break}}else if(s==="bass"&&n===1||s==="lead"&&n===2){let h=null;for(let[,v]of this.touches)(!h||v.deg===l&&v.acc===c)&&(h=v);h&&this.noteFx(s,h.x,h.y,0,.9,this.pitchClass(l,c))}}if(s==="drum"&&n===0){if(this.ripples.push({lane:l,zone:c,t:i}),d!==-1){let h=(l+(c+.5)/3)/4,v=d>=0?1-d:.5;a&&d>=0&&this.ghosts.push({x:h,y:v,t:i}),this.layers&&this.noteFx("drum",h,v,l)}}else if(s==="bass"&&n===1||s==="lead"&&n===2){let h=d>=0?d:this.store.macroValue(s,6);if(this.piano){let v=this.pianoLayout(),p=Mt(l,c,this.store.project.scale),m=v.keys.findIndex(f=>f.semi===p);if(this.ripples.push({col:m,t:i}),d!==-1&&m>=0){let f=this.keyGeom(v,v.keys[m]);a&&this.ghosts.push({x:f.x,y:(1-h)*f.top,t:i}),this.layers&&this.noteFx(s,f.x,(1-h)*f.top,0,.8,this.pitchClass(l,c))}}else{let v=this.columns(),p=v.findIndex(m=>m.deg===l&&m.acc===c);this.ripples.push({col:p,deg:l,t:i}),d!==-1&&p>=0&&(a&&this.ghosts.push({x:(p+.5)/v.length,y:1-h,t:i}),this.layers&&this.noteFx(s,(p+.5)/v.length,1-h,0,.8,this.pitchClass(l,c)))}}}this.ripples.length>40&&this.ripples.splice(0,this.ripples.length-40),this.ghosts.length>24&&this.ghosts.splice(0,this.ghosts.length-24),this.kick()}kick(){this.raf||(this.raf=requestAnimationFrame(()=>{this.raf=0,this.draw(!0)}))}setHint(){let e=this.store.ui,t=this.store.presetFor(this.part==="drum"?"d0":this.part),s;e.erase?s="Gomme : touche pendant la lecture pour effacer":this.part==="drum"?s="Une colonne par son \xB7 \u2194 variante \xB7 \u2195\uFE0E caract\xE8re":s=`${this.piano?"Clavier":"Notes \u2194"} \xB7 ${t&&t.expr?t.expr.name:"Expression"} \u2195\uFE0E`,this.hint.querySelector("b").textContent=e.erase?"Gomme":e.armed&&!e.playing?"Pr\xEAt \xE0 enregistrer":"\xC0 toi de jouer.",this.hint.querySelector("span").textContent=e.armed&&!e.playing?"Le premier toucher lance la boucle":s,this.axY.textContent=this.part==="drum"?"Caract\xE8re":t&&t.expr?t.expr.name:"",this.axY.hidden=this.piano}showHint(e){this.hint.style.opacity=e?"1":"0"}draw(e){let{w:t,h:s,d:i}=ut(this.cv),a=this.cv.getContext("2d");a.setTransform(i,0,0,i,0,0);let r=document.documentElement.dataset.theme==="dark",n=Re("--accent"),l=Re("--accent-ink"),c=Re("--ink"),d=performance.now();this.fx&&this.fx.syncScene(),this.under=this.gpu||!!(this.ghouls&&this.ghouls.stage);let h=this.under;if(a.clearRect(0,0,t,s),h&&(a.save(),Ee(a,0,0,t,s,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),a.clip()),!h){if(r){let f=a.createLinearGradient(0,0,0,s);f.addColorStop(0,"#1a1c23"),f.addColorStop(1,"#121318"),a.fillStyle=f}else a.fillStyle=n;a.fillRect(0,0,t,s)}this.part==="drum"?this.drawDrums(a,t,s,r,n,l,c,d):this.drawMelodic(a,t,s,r,n,l,c,d);for(let[,f]of this.touches){let b=f.x*t,y=f.y*s,x=Math.max(70,Math.min(t,s)*.35)*(1+this.level*.6),T=a.createRadialGradient(b,y,0,b,y,x);r?(T.addColorStop(0,re(n,.55+this.level*.3)),T.addColorStop(.35,re(n,.18)),T.addColorStop(1,re(n,0))):(T.addColorStop(0,"rgba(255,255,255,0.65)"),T.addColorStop(.4,"rgba(255,255,255,0.18)"),T.addColorStop(1,"rgba(255,255,255,0)")),a.globalCompositeOperation=r?"lighter":"source-over",a.fillStyle=T,a.fillRect(b-x,y-x,2*x,2*x),a.globalCompositeOperation="source-over",a.strokeStyle=r?re(n,.9):"rgba(255,255,255,0.9)",a.lineWidth=2,a.beginPath(),a.arc(b,y,22,0,Math.PI*2),a.stroke()}this.drawGhosts(a,t,s,r,n,d);let p=this.drawReplay(a,t,s,r,n,d);if(this.store.ui.erase){a.fillStyle=r?"rgba(255,80,80,0.08)":"rgba(0,0,0,0.08)";for(let f=-s;f<t;f+=22)a.beginPath(),a.moveTo(f,s),a.lineTo(f+s,0),a.lineTo(f+s+8,0),a.lineTo(f+8,s),a.fill()}h&&a.restore(),this.level*=.9;let m=this.touches.size||this.ripples.some(f=>d-f.t<600)||this.ghosts.length||this.level>.02||p;this.ripples=this.ripples.filter(f=>d-f.t<600),this.ghosts=this.ghosts.filter(f=>d-f.t<ma),m&&e&&this.kick()}drawGhosts(e,t,s,i,a,r){for(let n of this.ghosts){let l=(r-n.t)/ma;if(l>=1)continue;let c=n.x*t,d=Math.min(s-8,Math.max(8,n.y*s)),h=(1-l)*(1-l),v=15+10*l,p=e.createRadialGradient(c,d,0,c,d,v*2.2);i?(p.addColorStop(0,re(a,.35*h)),p.addColorStop(1,re(a,0))):(p.addColorStop(0,`rgba(255,255,255,${.5*h})`),p.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=p,e.fillRect(c-v*2.2,d-v*2.2,v*4.4,v*4.4),e.lineWidth=2,e.strokeStyle=i?re(a,.85*h):`rgba(255,255,255,${.95*h})`,e.beginPath(),e.arc(c,d,v,0,Math.PI*2),e.stroke(),e.fillStyle=i?re(a,.9*h):`rgba(255,255,255,${h})`,e.beginPath(),e.arc(c,d,3.5,0,Math.PI*2),e.fill()}}drawPiano(e,t,s,i,a,r,n){let l=this.pianoLayout(),c=t/l.whites,d=c*zt,h=s*bt,v=this.store.project.key,p=new Set;for(let[,O]of this.touches)O.col!==void 0&&p.add(O.col);let m=new Map;for(let O of this.ripples)O.col>=0&&m.set(O.col,Math.max(m.get(O.col)||0,(1-(n-O.t)/600)*this.inkShare()));let f=!this.inkUnder,b=(O,j)=>p.has(j)?i?re(a,.75):"rgba(255,255,255,0.92)":O?i?"#08090c":re(r,.88):i?"rgba(255,255,255,0.075)":"rgba(255,255,255,0.34)",y=this.under?new Float32Array(64):null,x=l.whites,T=0,E=0;l.keys.forEach((O,j)=>{if(O.black)return;let le=O.pos*c,V=m.get(j)||0;if(this.under?f&&(y[T]=Math.max(p.has(j)?1:0,V)):(e.fillStyle=b(!1,j),Ee(e,le+1,0,c-2,s,Math.min(8,c/4)),e.fill(),V>0&&(e.fillStyle=i?re(a,.4*V):`rgba(255,255,255,${.5*V})`,Ee(e,le+1,0,c-2,s,Math.min(8,c/4)),e.fill())),T++,this.keyMark(e,O,le+c/2,s-30,i,a,r),c>20||O.isRoot){e.fillStyle=i?"rgba(255,255,255,0.5)":re(r,.65),e.font=`600 ${c>30?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let P=us(O.semi,v);e.fillText(O.isRoot||c>30?P:P.replace(/-?\d+$/,""),le+c/2,s-10)}}),l.keys.forEach((O,j)=>{if(!O.black)return;let le=O.pos/l.whites*t-d/2,V=m.get(j)||0;this.under?f&&(y[x+E]=Math.max(p.has(j)?1:0,V)):(e.fillStyle=b(!0,j),Ee(e,le,-6,d,h+6,Math.min(6,d/4)),e.fill(),i&&!p.has(j)&&(e.strokeStyle="rgba(255,255,255,0.10)",e.lineWidth=1,Ee(e,le+.5,-6,d-1,h+5.5,Math.min(6,d/4)),e.stroke()),V>0&&(e.fillStyle=re(a,.55*V),Ee(e,le,-6,d,h+6,Math.min(6,d/4)),e.fill())),E++,this.keyMark(e,O,le+d/2,h-16,!0,a,r)}),y&&this.fx&&this.fx.keyLights(f?y:null),y&&this.ghouls&&this.ghouls.keyLights(f?y:null)}keyMark(e,t,s,i,a,r,n){!t.inScale&&!t.isRoot||(t.isRoot?e.fillStyle=a?r:n:e.fillStyle=a?"rgba(255,255,255,0.6)":re(n,.45),e.beginPath(),e.arc(s,i,t.isRoot?3.6:2.6,0,Math.PI*2),e.fill())}drawMelodic(e,t,s,i,a,r,n,l){if(this.piano){this.drawPiano(e,t,s,i,a,r,l);return}let c=this.columns(),d=c.length,h=t/d,v=this.store.project.key;for(let m=0;m<d;m++){let f=c[m],b=m*h,y=(f.octave%2+2)%2===0;this.under||(i?e.fillStyle=y?"rgba(255,255,255,0.035)":"rgba(255,255,255,0)":e.fillStyle=y?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.035)",e.fillRect(b,0,h,s),m>0&&(e.fillStyle=i?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",e.fillRect(b-.5,0,1,s))),m>0&&c[m-1].octave!==f.octave&&(e.fillStyle=i?re(a,.22):"rgba(255,255,255,0.45)",e.fillRect(b-.75,0,1.5,s)),f.isRoot&&(e.fillStyle=i?re(a,.75):r,e.globalAlpha=i?1:.55,Ee(e,b+h/2-3,s-30,6,6,3),e.fill(),e.globalAlpha=1),e.fillStyle=i?"rgba(255,255,255,0.45)":re(r,.6),e.font=`600 ${h>34?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let x=us(f.semi,v);(h>22||f.isRoot)&&e.fillText(h>30?x:x.replace(/\d+$/,""),b+h/2,s-10)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let m=new Float32Array(64),f=this.store.settings.ghosts?.6:1;for(let[,b]of this.touches){let y=Math.min(d-1,Math.floor(b.x*d));m[y]=Math.max(m[y],.45)}for(let b of this.ripples)b.col>=0&&b.col<64&&(m[b.col]=Math.max(m[b.col],f*(1-(l-b.t)/600)));this.fx&&this.fx.keyLights(m),this.ghouls&&this.ghouls.keyLights(m);return}for(let[,m]of this.touches){let f=Math.min(d-1,Math.floor(m.x*d));e.fillStyle=i?re(a,.16):"rgba(255,255,255,0.22)",e.fillRect(f*h,0,h,s)}let p=(this.store.settings.ghosts?.6:1)*this.inkShare();for(let m of this.ripples){if(m.col<0)continue;let f=(l-m.t)/600,b=m.col*h;e.fillStyle=i?re(a,.45*p*(1-f)):`rgba(255,255,255,${.5*p*(1-f)})`,e.fillRect(b+2,0,h-4,s)}}drawDrums(e,t,s,i,a,r,n,l){let c=t/4,d=this.store.project;for(let h=0;h<4;h++){let v=h*c;this.under||(e.fillStyle=i?h%2?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.0)":h%2?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.1)",e.fillRect(v,0,c,s),h>0&&(e.fillStyle=i?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)",e.fillRect(v-1,0,2,s)));for(let m=1;m<3;m++)e.fillStyle=i?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.05)",e.fillRect(v+m*c/3,s*.18,1,s*.64);let p=this.store.presetFor("d"+h);if(e.textAlign="center",e.fillStyle=i?"rgba(255,255,255,0.85)":re(r,.85),e.font="750 13px -apple-system, system-ui, sans-serif",e.fillText(["Kick","Snare","Hat","Perc"][h],v+c/2,22),e.font="600 10.5px -apple-system, system-ui, sans-serif",e.fillStyle=i?"rgba(255,255,255,0.45)":re(r,.6),e.fillText(pr(e,p?p.name:"",c-8),v+c/2,38),p&&p.variants)for(let m=0;m<3;m++)e.beginPath(),e.arc(v+(m+.5)*c/3,s-12,2.2,0,Math.PI*2),e.fill();d.parts.drum.mute[h]&&(e.fillStyle=i?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.35)",e.fillRect(v,0,c,s))}e.font="750 12px -apple-system, system-ui, sans-serif",e.textAlign="center";for(let[,h]of this.touches){let v=h.lane,p=this.store.presetFor("d"+v);if(!p||!p.variants)continue;let m=Math.min(2,Math.max(0,Math.floor((h.x*4-v)*3))),f=p.variants[m]?p.variants[m].name:"",b=Math.min(t-40,Math.max(40,h.x*t)),y=Math.max(70,h.y*s-44);e.fillStyle=i?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.75)";let x=e.measureText(f).width+16;Ee(e,b-x/2,y-15,x,22,11),e.fill(),e.fillStyle=i?"#fff":r,e.fillText(f,b,y)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let h=new Float32Array(64);for(let v of this.ripples)h[v.lane]=Math.max(h[v.lane],1-(l-v.t)/600);this.fx&&this.fx.keyLights(h),this.ghouls&&this.ghouls.keyLights(h);return}for(let h of this.ripples){let v=(l-h.t)/600,p=h.lane*c,m=e.createLinearGradient(0,s,0,0),f=.55*(1-v)*this.inkShare();i?(m.addColorStop(0,re(a,f)),m.addColorStop(1,re(a,0))):(m.addColorStop(0,`rgba(255,255,255,${f})`),m.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=m,e.fillRect(p+2,0,c-4,s)}}},ma=520;function pr(o,e,t){if(o.measureText(e).width<=t)return e;for(;e.length>1&&o.measureText(e+"\u2026").width>t;)e=e.slice(0,-1);return e+"\u2026"}function re(o,e){if(o=o.trim(),o.startsWith("#")){let t=o.length===4?o.slice(1).split("").map(s=>parseInt(s+s,16)):[1,3,5].map(s=>parseInt(o.slice(s,s+2),16));return`rgba(${t[0]},${t[1]},${t[2]},${e})`}return o.startsWith("color(")?o.replace(/\)\s*$/,` / ${e})`):o.startsWith("rgb(")?o.replace("rgb(","rgba(").replace(")",`,${e})`):o}var Is=class{constructor(e,{onSelect:t}){this.store=e,this.onSelect=t,this.el=u("div",{class:"tl",role:"img","aria-label":"Frise de la boucle"}),this.cv=u("canvas"),this.el.append(this.cv),this.sel=null,this.drag=null,this.tick=-1,this.el.addEventListener("pointerdown",i=>{i.preventDefault();try{this.el.setPointerCapture(i.pointerId)}catch{}let a=this.tickAt(i);this.drag={id:i.pointerId,t0:a,moved:!1}}),this.el.addEventListener("pointermove",i=>{if(!this.drag||i.pointerId!==this.drag.id)return;let a=this.tickAt(i);Math.abs(a-this.drag.t0)>=24&&(this.drag.moved=!0),this.drag.moved&&(this.sel={t0:Math.min(a,this.drag.t0),t1:Math.max(a,this.drag.t0)+24},this.draw())});let s=i=>{if(!this.drag||i.pointerId!==this.drag.id)return;let a=this.drag;if(this.drag=null,!a.moved)if(this.sel&&a.t0>=this.sel.t0&&a.t0<this.sel.t1)this.sel=null;else{let r=Math.floor(a.t0/384);this.sel={t0:r*384,t1:(r+1)*384}}this.draw(),this.onSelect(this.sel)};this.el.addEventListener("pointerup",s),this.el.addEventListener("pointercancel",s),new ResizeObserver(()=>this.draw()).observe(this.el)}get L(){return 384*this.store.project.bars}tickAt(e){let t=this.el.getBoundingClientRect(),s=Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width));return Math.floor(s*this.L/24)*24}clear(){this.sel=null,this.draw()}setTick(e){e!==this.tick&&(this.tick=e,this.draw())}draw(){let{w:e,h:t,d:s}=ut(this.cv),i=this.cv.getContext("2d");i.setTransform(s,0,0,s,0,0),i.clearRect(0,0,e,t);let a=this.store.project,r=this.store.ui,n=this.L,l=Re("--accent"),c=Re("--ink"),d=Re("--line-2"),h=p=>p/n*e;for(let p=0;p<=a.bars;p++)i.fillStyle=d,i.fillRect(Math.round(h(p*384))-.5,0,1,t);for(let p=0;p<n;p+=96)i.fillStyle=d,i.globalAlpha=.5,i.fillRect(Math.round(h(p)),t-5,1,5),i.globalAlpha=1;this.sel&&(i.fillStyle=re(l,.28),Ee(i,h(this.sel.t0)+1,2,h(this.sel.t1)-h(this.sel.t0)-2,t-4,6),i.fill(),i.strokeStyle=l,i.lineWidth=1.5,i.stroke());let v=a.patterns[a.current];if(r.part==="drum"){let p=(t-8)/4;for(let m=0;m<4;m++){i.fillStyle=c,i.globalAlpha=m===r.lane?.95:.6;for(let f of v.drum[m].hits){let b=h(f.t),y=Math.max(2,e/(n/24)*.55);Ee(i,b,4+m*p+1,y,p-2,1.5),i.fill()}}i.globalAlpha=1}else{let p=v[r.part].notes;if(p.length){let m=1/0,f=-1/0;for(let T of p){let E=Mt(T.deg,T.acc,a.scale);m=Math.min(m,E),f=Math.max(f,E)}let b=Math.max(12,f-m+1);i.fillStyle=c,i.strokeStyle=c;let y=null,x=p.slice().sort((T,E)=>T.t-E.t);for(let T of x){let E=Mt(T.deg,T.acc,a.scale),O=t-6-(E-m)/b*(t-12),j=h(T.t),le=Math.max(2.5,h(T.t+T.d)-j-1);i.globalAlpha=.85,Ee(i,j,O-2.5,le,5,2.5),i.fill(),T.tie&&y&&(i.lineWidth=1.5,i.beginPath(),i.moveTo(y.x,y.y),i.lineTo(j+1,O),i.stroke()),y={x:j+le,y:O}}i.globalAlpha=1}}r.playing&&this.tick>=0&&(i.fillStyle=r.armed?Re("--rec"):l,i.fillRect(h(this.tick)-1,0,2,t))}};var Bs=class{constructor(e){this.store=e,this.groupsEl=u("div",{class:"groups",role:"tablist"}),this.el=u("div",{class:"pad",role:"application","aria-label":"Surface de transformation"}),this.cv=u("canvas"),this.axX=u("div",{class:"ax x"}),this.axY=u("div",{class:"ax y"}),this.el.append(this.cv,this.axX,this.axY),this.info=u("div",{class:"info"}),this.clearBtn=u("button",{class:"pill",text:"Effacer les mouvements",onclick:()=>this.clearAuto()}),this.barEl=u("div",{class:"autobar"},this.info,this.clearBtn),this.touch=new Map,this.live=null,this.fx=null,this.gpu=!1,this.prev=new Map,this.el.addEventListener("pointerdown",t=>this.down(t)),this.el.addEventListener("pointermove",t=>this.move(t)),this.el.addEventListener("pointerup",t=>this.up(t)),this.el.addEventListener("pointercancel",t=>this.up(t)),new ResizeObserver(()=>this.draw()).observe(this.el)}groups(){let e=this.store,t=e.ui.part;if(t==="drum")return[0,1,2,3].map(a=>{let r=e.presetFor("d"+a),n=r&&r.macros||[];return{label:["Kick","Snare","Hat","Perc"][a],sub:r?r.name:"",target:"d"+a,sx:0,sy:1,xName:n[0]?n[0].name:"X",yName:n[1]?n[1].name:"Y"}});let s=e.presetFor(t);return(s&&s.groups||["Groupe 1","Groupe 2","Groupe 3"]).map((a,r)=>{let n=s.macros[r*2],l=s.macros[r*2+1];return{label:a,sub:`${n?n.name:"X"} \xB7 ${l?l.name:"Y"}`,target:t,sx:r*2,sy:r*2+1,xName:n?n.name:"X",yName:l?l.name:"Y"}})}value(e,t){let s=this.store;for(let[,i]of this.touch){let a=this.groups()[i];if(a.target===e.target&&(a.sx===t||a.sy===t)&&this.touchVals&&this.touchVals[e.target+":"+t]!==void 0)return this.touchVals[e.target+":"+t]}if(this.live&&s.ui.playing){if(e.target==="bass")return this.live[8+t];if(e.target==="lead")return this.live[15+t];let i=+e.target.slice(1);return this.live[i*2+t]}return s.macroValue(e.target,t)}hasAuto(e){let s=this.store.pattern.auto[e.target];return!!(s&&(s[e.sx]||s[e.sy]))}render(){let e=this.groups(),t=Math.min(this.store.ui.group,e.length-1);this.groupsEl.replaceChildren(...e.map((a,r)=>u("button",{class:"grp"+(this.hasAuto(a)?" auto":""),role:"tab","aria-selected":String(r===t),onclick:()=>{this.store.ui.group=r,this.render()}},u("span",{class:"num",text:String(r+1)}),u("b",{text:a.label}),u("small",{text:a.sub}),u("i",{class:"rec"}))));let s=e[t];this.axX.textContent=s.xName+" \u2192",this.axY.textContent=s.yName+" \u2192";let i=e.filter(a=>this.hasAuto(a)).length;this.info.textContent=this.store.ui.armed?"REC : bouge un point pendant la lecture pour enregistrer":i?`${i} groupe${i>1?"s":""} avec mouvements enregistr\xE9s`:"Glisse un point \xB7 plusieurs doigts possibles",this.clearBtn.disabled=!this.hasAuto(s),this.draw()}pos(e){let t=this.el.getBoundingClientRect();return{x:Math.min(1,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,1-(e.clientY-t.top)/t.height))}}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.pos(e),s=this.groups(),i=this.el.getBoundingClientRect(),a=-1,r=1/0;s.forEach((l,c)=>{if([...this.touch.values()].includes(c))return;let d=(this.value(l,l.sx)-t.x)*i.width,h=(this.value(l,l.sy)-t.y)*i.height,v=Math.hypot(d,h);v<r&&(r=v,a=c)});let n=r<44?a:Math.min(this.store.ui.group,s.length-1);[...this.touch.values()].includes(n)||(this.touch.set(e.pointerId,n),this.store.ui.group=n,this.send(s[n],t,"down"),this.render())}move(e){let t=this.touch.get(e.pointerId);t!==void 0&&(this.send(this.groups()[t],this.pos(e),"move"),this.draw())}up(e){let t=this.touch.get(e.pointerId);if(t===void 0)return;this.touch.delete(e.pointerId);let s=this.groups()[t];this.fx&&this.fx.press(s.target+":"+s.sx,0,0,"up"),this.store.send({type:"tweak",target:s.target,slot:s.sx,phase:"up"}),this.store.send({type:"tweak",target:s.target,slot:s.sy,phase:"up"}),this.render()}releaseAll(){let e=this.groups();for(let[,t]of this.touch){let s=e[t];s&&(this.store.send({type:"tweak",target:s.target,slot:s.sx,phase:"up"}),this.store.send({type:"tweak",target:s.target,slot:s.sy,phase:"up"}))}this.touch.clear()}send(e,t,s){if(this.fx&&this.fx.press(e.target+":"+e.sx,t.x,1-t.y,s==="down"?"down":"move"),this.fx){let i=e.target+":"+e.sx,a=this.prev.get(i);this.fx.stir(e.target,t.x,1-t.y,a?t.x-a.x:0,a?a.y-t.y:0,!0),this.prev.set(i,{x:t.x,y:t.y})}this.touchVals=this.touchVals||{},this.touchVals[e.target+":"+e.sx]=t.x,this.touchVals[e.target+":"+e.sy]=t.y,this.store.send({type:"tweak",target:e.target,slot:e.sx,value:t.x,phase:s}),this.store.send({type:"tweak",target:e.target,slot:e.sy,value:t.y,phase:s})}clearAuto(){let e=this.groups(),t=e[Math.min(this.store.ui.group,e.length-1)];this.store.clearAuto(t.target,t.sx),this.store.clearAuto(t.target,t.sy),this.render()}onPos(e){this.live=e.mac,(this.store.ui.playing||this.touch.size)&&this.draw()}draw(){let{w:e,h:t,d:s}=ut(this.cv),i=this.cv.getContext("2d");i.setTransform(s,0,0,s,0,0);let a=document.documentElement.dataset.theme==="dark",r=Re("--accent"),n=Re("--accent-ink");if(i.clearRect(0,0,e,t),this.fx&&this.fx.syncScene(),this.gpu&&(i.save(),Ee(i,0,0,e,t,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),i.clip()),!this.gpu){if(a){let d=i.createLinearGradient(0,0,e,t);d.addColorStop(0,"#1b1d24"),d.addColorStop(1,"#121318"),i.fillStyle=d}else i.fillStyle=r;i.fillRect(0,0,e,t),i.strokeStyle=a?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",i.lineWidth=1;for(let d=1;d<4;d++)i.beginPath(),i.moveTo(d*e/4,0),i.lineTo(d*e/4,t),i.stroke(),i.beginPath(),i.moveTo(0,d*t/4),i.lineTo(e,d*t/4),i.stroke()}let l=this.groups(),c=Math.min(this.store.ui.group,l.length-1);l.forEach((d,h)=>{let v=this.value(d,d.sx)*e,p=(1-this.value(d,d.sy))*t,m=[...this.touch.values()].includes(h);if(this.fx&&!m){let y=d.target+":"+d.sx,x=this.prev.get(y),T=v/e,E=1-p/t;x&&this.store.ui.playing&&Math.hypot(T-x.x,E-x.y)>.003&&this.fx.stir(d.target,T,1-E,T-x.x,x.y-E,!1),this.prev.set(y,{x:T,y:E})}let f=m?120:70,b=i.createRadialGradient(v,p,0,v,p,f);a?(b.addColorStop(0,re(r,h===c?.4:.18)),b.addColorStop(1,re(r,0))):(b.addColorStop(0,`rgba(255,255,255,${h===c?.5:.25})`),b.addColorStop(1,"rgba(255,255,255,0)")),i.fillStyle=b,i.fillRect(v-f,p-f,2*f,2*f),i.beginPath(),i.arc(v,p,m?26:21,0,Math.PI*2),i.fillStyle=a?h===c?re(r,.95):"rgba(255,255,255,0.12)":h===c?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.4)",i.fill(),i.lineWidth=2,i.strokeStyle=a?re(r,.9):"rgba(255,255,255,0.95)",i.stroke(),i.fillStyle=a?h===c?n:"rgba(255,255,255,0.9)":n,i.font="800 14px -apple-system, system-ui, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(String(h+1),v,p+1),this.hasAuto(d)&&(i.beginPath(),i.arc(v+17,p-17,4,0,Math.PI*2),i.fillStyle=Re("--rec"),i.fill())}),i.textBaseline="alphabetic",this.gpu&&i.restore()}};var fr=96,mr=[36,38,42,63],va={0:[36,36,35],1:[37,38,40],2:[42,44,46],3:[64,63,62]};function ga(o){let e=[o&127];for(;o>>=7;)e.unshift(o&127|128);return e}function wi(o){return Array.from(o,e=>e.charCodeAt(0)&127)}function ya(o){return[o>>>24&255,o>>>16&255,o>>>8&255,o&255]}function ki(o){return[o>>>8&255,o&255]}function Fs(o,e){e.sort((i,a)=>i.t-a.t||i.order-a.order);let t=[0,255,3,...ga(o.length),...wi(o)],s=0;for(let i of e)t.push(...ga(Math.max(0,i.t-s)),...i.data),s=i.t;return t.push(0,255,47,0),[...wi("MTrk"),...ya(t.length),...t]}function ba(o,{loops:e=1}={}){let t=384*o.bars,s=o.song&&o.song.enabled&&o.song.sections.length?o.song.sections:[{p:o.current,reps:e,mute:{}}],i=[],a=[],r=[],n=0;for(let v of s){let p=o.patterns[v.p]||o.patterns[0];for(let m=0;m<(v.reps||1);m++){for(let f=0;f<4;f++)if(!(o.parts.drum.mute[f]||v.mute&&v.mute["d"+f]))for(let b of p.drum[f].hits){let y=va[f]&&va[f][b.x]||mr[f],x=Math.max(1,Math.round(b.v*127));i.push({t:n+b.t,order:1,data:[153,y,x]}),i.push({t:n+b.t+12,order:0,data:[137,y,0]})}for(let[f,b,y]of[["bass",a,0],["lead",r,1]])if(!(o.parts[f].mute||v.mute&&v.mute[f]))for(let x of p[f].notes){let T=Math.max(0,Math.min(127,ji(x.deg,x.acc,o.key,o.scale,48))),E=Math.max(1,Math.round(x.v*127));b.push({t:n+x.t,order:1,data:[144|y,T,E]}),b.push({t:n+x.t+Math.max(1,Math.min(x.d,t)),order:0,data:[128|y,T,0]})}n+=t}}let l=Math.round(6e7/o.tempo),c=[{t:0,order:0,data:[255,81,3,l>>16&255,l>>8&255,l&255]},{t:0,order:0,data:[255,88,4,4,2,24,8]}],d=[Fs(o.name||"MOTIF",c),Fs("Batterie",i),Fs("Basse",a),Fs("M\xE9lodie",r)],h=[...wi("MThd"),...ya(6),...ki(1),...ki(d.length),...ki(fr)];return new Uint8Array([...h,...d.flat()])}var vr=(()=>{let o=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let s=0;s<8;s++)t=t&1?3988292384^t>>>1:t>>>1;o[e]=t>>>0}return o})();function gr(o){let e=4294967295;for(let t=0;t<o.length;t++)e=vr[(e^o[t])&255]^e>>>8;return(e^4294967295)>>>0}function xa(o){let e=new TextEncoder,t=[],s=[],i=0,a=new Date,r=a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1,n=a.getFullYear()-1980<<9|a.getMonth()+1<<5|a.getDate();for(let d of o){let h=e.encode(d.name),v=gr(d.data),p=new DataView(new ArrayBuffer(30));p.setUint32(0,67324752,!0),p.setUint16(4,20,!0),p.setUint16(6,2048,!0),p.setUint16(8,0,!0),p.setUint16(10,r,!0),p.setUint16(12,n,!0),p.setUint32(14,v,!0),p.setUint32(18,d.data.length,!0),p.setUint32(22,d.data.length,!0),p.setUint16(26,h.length,!0),p.setUint16(28,0,!0),t.push(new Uint8Array(p.buffer),h,d.data);let m=new DataView(new ArrayBuffer(46));m.setUint32(0,33639248,!0),m.setUint16(4,20,!0),m.setUint16(6,20,!0),m.setUint16(8,2048,!0),m.setUint16(10,0,!0),m.setUint16(12,r,!0),m.setUint16(14,n,!0),m.setUint32(16,v,!0),m.setUint32(20,d.data.length,!0),m.setUint32(24,d.data.length,!0),m.setUint16(28,h.length,!0),m.setUint32(42,i,!0),s.push(new Uint8Array(m.buffer),h),i+=30+h.length+d.data.length}let l=s.reduce((d,h)=>d+h.length,0),c=new DataView(new ArrayBuffer(22));return c.setUint32(0,101010256,!0),c.setUint16(8,o.length,!0),c.setUint16(10,o.length,!0),c.setUint32(12,l,!0),c.setUint32(16,i,!0),new Blob([...t,...s,new Uint8Array(c.buffer)],{type:"application/zip"})}var Ot=null,yr=0,Vt=new Map;function br(o){return Ot||(Ot=new Worker("export-worker.js?v="+o),Ot.onmessage=e=>{let t=e.data,s=Vt.get(t.id);s&&(t.type==="progress"?s.onProgress&&s.onProgress(t.value):t.type==="done"?(Vt.delete(t.id),s.resolve(t)):t.type==="error"&&(Vt.delete(t.id),s.reject(new Error(t.message))))},Ot.onerror=e=>{for(let[,t]of Vt)t.reject(new Error(e.message||"Erreur du moteur d\u2019export"));Vt.clear(),Ot=null},Ot)}function Yt(o){return(o||"motif").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-zA-Z0-9 _-]+/g,"").trim().replace(/\s+/g,"-").slice(0,40)||"motif"}async function ka(o,e,{stems:t=!1,loops:s=2,sr:i=48e3,bits:a=24,onProgress:r,build:n}){let l=JSON.parse(JSON.stringify(o.project)),c=[];for(let y=0;y<4;y++)c.push({part:"drum",lane:y,preset:ye(l.parts.drum.kit[y]),macros:l.parts.drum.macros[y]});c.push({part:"bass",preset:ye(l.parts.bass.preset),macros:l.parts.bass.macros}),c.push({part:"lead",preset:ye(l.parts.lead.preset),macros:l.parts.lead.macros});let d=Array.from(e.samples.values()).map(y=>({id:y.id,sr:y.sr,data:y.data,gain:y.gain,loopStart:y.loopStart,loopEnd:y.loopEnd})),h=++yr,v=br(n),p=await new Promise((y,x)=>{Vt.set(h,{resolve:y,reject:x,onProgress:r}),v.postMessage({type:"render",id:h,project:l,presets:c,samples:d,sampleSets:e.sampleSets,stems:t,loops:s,sr:i,bits:a})}),m=Yt(l.name),f={null:"mix",d0:"kick",d1:"snare",d2:"hat",d3:"perc",bass:"basse",lead:"melodie"};return p.files.map(y=>({name:`${m}-${f[y.group]}.wav`,data:new Uint8Array(y.wav),peak:y.peak,seconds:y.seconds,group:y.group}))}async function Si(o,e,t){let s={id:Et(),name:o,created:Date.now(),size:e.size,type:e.type,blob:e,...t};return await Fe.put("renders",s),s}function wa(o){let e=ba(o.project,{loops:1});return new File([e],`${Yt(o.project.name)}.mid`,{type:"audio/midi"})}function Sa(o){return new File([o.exportProjectJSON()],`${Yt(o.project.name)}.motif.json`,{type:"application/json"})}function Ta(o){return xa(o.map(e=>({name:e.name,data:e.data})))}async function fs(o){try{if(navigator.canShare&&navigator.canShare({files:[o]}))return await navigator.share({files:[o],title:o.name}),"shared"}catch(s){if(s&&s.name==="AbortError")return"cancelled"}let e=URL.createObjectURL(o),t=document.createElement("a");return t.href=e,t.download=o.name,document.body.append(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(e),6e4),"downloaded"}var La={phonk:{bassR:11,leadR:9,roots:[0,0,-2,-3],contour:[7,8,7,4,7,8,9,7],bassTies:2,leadSteps:7},ukg:{bassR:10,leadR:8,roots:[0,-2,-4,-3],contour:[9,7,9,11],bassTies:1,leadSteps:7},afro:{bassR:8,leadR:7,roots:[0,0,-2,-3],contour:[7,9,11,9,7,6],bassTies:0,leadSteps:5},amapiano:{bassR:13,leadR:3,roots:[0,-3,-2,-4],contour:[9,11,9,7],bassTies:2,leadSteps:7,chords:!0},reggaeton:{bassR:11,leadR:7,roots:[0,-2,-3,-1],contour:[7,9,10,9,7,6],bassTies:0,leadSteps:7},jersey:{bassR:14,leadR:14,roots:[0,-2,-3,-2],contour:[11,9,7,9],bassTies:0,leadSteps:7,chords:!0},dnb:{bassR:2,leadR:1,roots:[0,-3,-2,-4],contour:[9,11,12,11],bassTies:1,leadSteps:7,chords:!0},rage:{bassR:1,leadR:15,roots:[0,-1,-3,-4],contour:[7,11,14,11,9,7],bassTies:0,leadSteps:7},hardtechno:{bassR:5,leadR:4,roots:[0,0,1,0],contour:[7,7,8,7],bassTies:3,leadSteps:7},triphop:{bassR:3,leadR:2,roots:[0,-2,-3,-4],contour:[9,7,6,4],bassTies:1,leadSteps:7,chords:!0}};function xr(o,e,t,s){let i=Ut[o][e],a=384*t,r=[];if(!i||!i.len)return r;for(let n=0;n<a;n+=i.len)for(let[l,,c]of i.ev){if(n+l>=a)continue;let d=1;o===2&&(d=0),r.push({t:n+l,v:c?.95:.74,x:d,c:.5})}return o===2&&s&&r.length&&(r[r.length-1].x=2),o===1&&r.length>2&&(r[r.length-1].v=1),r}function Ma(o,e,t,{ties:s=0,chord:i=null}={}){let a=xt[o],r=384*e,n=[];if(!a||!a.len)return n;let l=a.ev.length,c=new Set;for(let h=0;h<s;h++)c.add(Math.round((h+1)*l/(s+1)));let d=0;for(let h=0;h<r;h+=a.len)a.ev.forEach(([v,p,m],f)=>{if(h+v>=r)return;let b=c.has(f)&&f>0,y=p;c.has((f+1)%l)&&(y=((f+1)%l===0?a.len+a.ev[0][0]:a.ev[f+1][0])-v+3);let x=t(h+v,d++),T=m?.95:.8;if(i)for(let E of i)n.push({t:h+v,d:Math.min(y,r-h-v),deg:x+E,acc:0,v:T*.9,tie:!1});else n.push({t:h+v,d:Math.min(y,r-h-v),deg:x,acc:0,v:T,tie:b})});return n}function Ra(o){let e=Ze.find(c=>c.style===o),t=et(o),s=La[o],i=At({kit:e.kit.slice(),bass:e.bass,lead:e.lead,tempo:t.bpm,key:t.key,scale:t.scale,name:"Exemple "+t.short});i.parts.drum.rhythm=e.rhythm.slice(),i.parts.bass.rhythm=s.bassR,i.parts.bass.ties=s.bassTies,i.parts.lead.rhythm=s.leadR,i.parts.lead.steps=s.leadSteps;let a=2,r=384,n=c=>s.roots[Math.floor(c/(r/2))%s.roots.length],l=c=>{let d=Rt(c?"B":"A");for(let h=0;h<4;h++){let v=c&&h===2?Math.min(16,e.rhythm[h]+1):e.rhythm[h];d.drum[h].hits=xr(h,v,a,c)}if(c&&d.drum[1].hits.length)for(let h of[r*2-48,r*2-24])d.drum[1].hits.push({t:h,v:.7,x:0,c:.5});return d.bass.notes=Ma(s.bassR,a,h=>n(h)-7,{ties:s.bassTies}),d.lead.notes=Ma(s.leadR,a,(h,v)=>s.contour[(v+(c?2:0))%s.contour.length]+(s.chords?n(h):0),{chord:s.chords?[0,2,4]:null}),c||(d.lead.notes=d.lead.notes.filter(h=>h.t<r||!s.chords||h.t%96===0)),d};return i.patterns=[l(!1),l(!0)],i.song={enabled:!1,sections:[]},i}var Ea=Object.keys(La);var Ns=class{constructor(e,t){this.store=e,this.ctx=t,this.cur=null,this.audio=null}open(e,t,s={}){this.close(!0);let i=u("div",{class:"sheet-back",onclick:()=>this.close()}),a=u("button",{class:"close","aria-label":"Fermer",onclick:()=>this.close()},K("close")),r=u("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e},u("div",{class:"grab"}),u("header",null,u("h2",{text:e}),...s.actions||[],a),u("div",{class:"body"},t));document.body.append(i,r),requestAnimationFrame(()=>{i.classList.add("open"),r.classList.add("open")});let n=null;return r.querySelector(".grab").addEventListener("pointerdown",l=>{n=l.clientY}),r.addEventListener("pointerup",l=>{n!==null&&l.clientY-n>60&&this.close(),n=null}),this.cur={back:i,sheet:r,onClose:s.onClose},r}close(e){let t=this.cur;if(t){if(this.cur=null,t.onClose&&t.onClose(),e){t.back.remove(),t.sheet.remove();return}t.back.classList.remove("open"),t.sheet.classList.remove("open"),setTimeout(()=>{t.back.remove(),t.sheet.remove()},280)}}menu(){let e=this.store,t=(a,r,n,l)=>u("button",{class:"item",onclick:l},u("span",{class:"ic"},K(a)),u("span",{class:"tx"},u("b",{text:r}),n?u("small",{text:n}):null)),s=document.documentElement.dataset.theme==="dark",i=u("div",{class:"list"},t("folder","Projets",e.project.name,()=>this.library()),t("plus","Nouvelle id\xE9e","Vide ou \xE0 partir d\u2019une sc\xE8ne",()=>this.newIdea()),t("share","Exporter","WAV, pistes s\xE9par\xE9es, MIDI, projet",()=>this.exportSheet()),t("speaker","Lecteur","Rendus et fichiers import\xE9s",()=>this.player()),t("settings","R\xE9glages","M\xE9tronome, clavier piano, doigts, th\xE8me",()=>this.settings()),t("dice","Sons au hasard","Batterie, basse et m\xE9lodie \xB7 annulable",()=>{this.close(),this.ctx.rollDice("all")}),t("wifi","Hors ligne et mises \xE0 jour","",()=>this.offline()),t("info","Aide","Les gestes en une page",()=>this.help()),t("file","Sons et licences","Provenance des banques int\xE9gr\xE9es",()=>this.licences()));this.open("MOTIF",i)}settings(){let e=this.store,t=e.settings,s=(c,d,h,v)=>{let p=u("button",{class:"item switch",role:"switch","aria-checked":String(!!t[c])},u("span",{class:"tx"},u("b",{text:d}),h?u("small",{text:h,style:{whiteSpace:"normal"}}):null),u("i",{class:"knob"}));return p.addEventListener("click",()=>{e.setSetting(c,!e.settings[c]),p.setAttribute("aria-checked",String(!!e.settings[c])),v&&v()}),p},i=(c,d,h)=>u("div",{class:"seg"},...d.map(v=>{let p=u("button",{"aria-pressed":String(t[c]===v)},h(v));return p.addEventListener("click",()=>{e.setSetting(c,v);for(let m of p.parentNode.children)m.setAttribute("aria-pressed",String(m===p))}),p})),a=kr(),r=[["dark","Sombre"],["light","Clair"]];Ye.fluid&&r.push(["halloween","Halloween"]);let n=u("div",{class:"seg"},...r.map(([c,d])=>{let h=u("button",{"aria-pressed":String(c===a)},d);return h.addEventListener("click",()=>{wr(c);for(let v of h.parentNode.children)v.setAttribute("aria-pressed",String(v===h))}),h})),l=u("div",null,u("div",{class:"sect"},u("h3",{text:"M\xE9tronome"}),u("div",{class:"list"},s("metro","M\xE9tronome","Un clic \xE0 chaque temps, plus aigu sur le premier. Raccourci : touche le tempo en haut. Jamais pr\xE9sent dans les exports."),s("metroAlways","Aussi sans enregistrer","Sinon, il ne sonne que pendant l\u2019enregistrement (REC).")),u("p",{class:"note",text:"Volume du clic"}),i("metroLevel",[-12,-6,0,6],c=>(c>0?"+":c<0?"\u2212":"")+Math.abs(c)+" dB")),u("div",{class:"sect"},u("h3",{text:"Surface de jeu"}),u("div",{class:"list"},s("piano","Clavier de piano","Basse et m\xE9lodie : touches blanches et noires, toutes les notes jouables. Les notes de la gamme sont marqu\xE9es d\u2019un point."),s("ghosts","Montrer les doigts \xE0 la lecture","Pendant la lecture, un doigt fant\xF4me refait le geste enregistr\xE9 (chaque gliss\xE9, chaque hauteur), avec sa tra\xEEn\xE9e. Pour les prises plus anciennes, un rond marque chaque note."))),Ye.fluid?u("div",{class:"sect"},u("h3",{text:"Effets fluides"}),u("div",{class:"list"},s("fluid","Fluide sous les doigts","Encre anim\xE9e sur la surface de jeu et les tweaks : tes doigts, les notes rejou\xE9es, le kick. Coup\xE9 si l\u2019iPhone demande de r\xE9duire les animations. D\xE9sactive-le pour \xE9conomiser la batterie.")),u("p",{class:"note",text:"O\xF9"}),i("fluidZone",["keys","all"],c=>c==="keys"?"Dans les touches":"Partout"),u("p",{class:"note",text:"Style"}),i("fluidStyle",["douce","normale","spectaculaire"],c=>({douce:"Doux",normale:"Normal",spectaculaire:"Spectaculaire"})[c]),u("p",{class:"note",text:"Encre"}),i("fluidInk",["libre","maitrisee"],c=>c==="libre"?"Libre":"Ma\xEEtris\xE9e"),u("p",{class:"note",text:"Libre : chaque note, gliss\xE9 et coup d\xE9pose toute son encre, sans limite (\xE7a peut d\xE9border et br\xFBler au blanc). Ma\xEEtris\xE9e : un budget par touche, un geste lent laisse un filet, un geste vif un panache."}),u("p",{class:"note",text:"Couleurs"}),u("div",{class:"seg wrap"},...i("fluidColors",["partie","notes","arc","neon"],c=>({partie:"Partie",notes:"Notes",arc:"Arc-en-ciel",neon:"N\xE9on"})[c]).children),u("p",{class:"note",text:"\xAB Dans les touches \xBB : chaque touche devient un tube, l\u2019encre ne passe pas d\u2019une touche \xE0 l\u2019autre. \xAB Notes \xBB : chaque note a sa couleur (voisines sur le cycle des quintes = couleurs voisines). Spectaculaire : tra\xEEn\xE9es longues, halo, et le kick secoue toute l\u2019encre."}),u("div",{class:"list",style:{marginTop:"8px"}},s("glass","Verre liquide","Le pad et la surface Tweaks deviennent une plaque de verre pos\xE9e sur l\u2019\xE9cran, dans l\u2019esprit Liquid Glass : son bord courbe ce qu\u2019il y a dessous et s\xE9pare un peu les couleurs, ses reflets suivent la lumi\xE8re, elle fl\xE9chit sous le doigt. Choisis son style plus bas."),s("mixGlass","Mix sous verre","Chaque tranche du Mix devient un tube de verre rempli de son niveau, et le son de chaque instrument y monte en lumi\xE8re liquide : un jet \xE0 chaque attaque, un filet tant qu\u2019il sonne."),s("glassSpill","Lumi\xE8re autour du verre","La lumi\xE8re de l\u2019encre d\xE9borde du verre sur l\u2019\xE9cran. Les boutons proches r\xE9v\xE8lent leur relief et projettent une ombre \xE0 l\u2019oppos\xE9 ; les boutons sans fond ne font ressortir que leur texte. Plus ils sont loin de la lumi\xE8re, moins elle les touche.")),u("p",{class:"note",text:"Style du verre"}),u("div",{class:"seg wrap"},...i("glassLook",["optique","liquide","depoli","cristal","prisme"],c=>({optique:"Optique",liquide:"Liquide",depoli:"D\xE9poli",cristal:"Cristal",prisme:"Prisme"})[c]).children),u("p",{class:"note",text:"Optique : une plaque claire et incolore, presque invisible, qui ne courbe que ses bords ; l\u2019encre et les touches restent nettes. Liquide : le verre pr\xE9c\xE9dent, une dalle plus \xE9paisse qui s\u2019\xE9claire de l\u2019encre et sous le doigt. D\xE9poli : un verre laiteux qui floute l\u2019encre en lueurs et s\u2019\xE9claire de la lumi\xE8re autour. Cristal : un bord biseaut\xE9 \xE0 facettes qui d\xE9cale et irise ce qu\u2019il y a dessous et accroche la lumi\xE8re. Prisme : un verre \xE9pais et tr\xE8s clair qui flotte au-dessus de l\u2019\xE9cran ; son large bord arrondi replie l\u2019image pr\xE8s du contour et la d\xE9compose en couleurs."}),u("p",{class:"note",text:"Puissance de la lumi\xE8re autour du verre"}),i("glassLight",["douce","normale","forte","max"],c=>({douce:"Douce",normale:"Normale",forte:"Forte",max:"Max"})[c]),u("p",{class:"note",text:"Hauteur des boutons (plus ils sont hauts, plus leur ombre est longue)"}),i("ctrlHeight",[3,6,10,15],c=>({3:"Plats",6:"Bas",10:"Hauts",15:"Tr\xE8s hauts"})[c]),u("p",{class:"note",text:"Mode clair : le verre et l\u2019encre"}),i("lightLook",["aquarelle","vitrail","classique"],c=>({aquarelle:"Aquarelle",vitrail:"Vitrail",classique:"Classique"})[c]),u("p",{class:"note",text:"Aquarelle : sous le verre un papier ivoire, l\u2019encre est un pigment qui colore l\u2019eau et fonce l\xE0 o\xF9 les couleurs se m\xEAlent ; la lumi\xE8re autour teinte l\u2019\xE9cran. Vitrail : la couleur de la partie, \xE9clair\xE9e comme un vitrail, une encre lumineuse et une lumi\xE8re color\xE9e autour. Classique : l\u2019aspect d\u2019avant."}),u("div",{class:"list",style:{marginTop:"8px"}},s("glassTilt","Le verre suit l\u2019iPhone","La lumi\xE8re reste fixe dans la pi\xE8ce : quand tu inclines le t\xE9l\xE9phone, les reflets glissent sur le verre comme sur un vrai objet. Tenu normalement, la lumi\xE8re vient d\u2019en haut \xE0 gauche. (iOS demande l\u2019autorisation d\u2019utiliser les mouvements.)",()=>{this.store.settings.glassTilt&&this.ctx.enableTilt&&this.ctx.enableTilt()})),u("p",{class:"note",text:"HDR (\xE9cran HDR : reflets, c\u0153urs d\u2019encre et lumi\xE8re autour du verre plus lumineux que le blanc)"}),i("fluidHdr",["normal","intense","max"],c=>({normal:"Normal",intense:"Intense",max:"Max"})[c]),u("div",{class:"list",style:{marginTop:"8px"}},s("hdrLight","HDR aussi en mode clair","L\u2019\xE9cran autour garde sa couleur exacte. Si la surface sous le verre te para\xEEt plus terne en mode clair, coupe-le : l\u2019iPhone assombrit un peu un calque HDR \xE0 c\xF4t\xE9 des couleurs de la page.")),u("p",{class:"note",text:"Moteur graphique"}),i("fluidEngine",["auto","webgl"],c=>c==="auto"?"Auto (WebGPU)":"Compatibilit\xE9 (WebGL)"),u("p",{class:"note",text:this.ctx.fluidStatus?this.ctx.fluidStatus():""}),u("button",{class:"big accent",style:{marginTop:"6px"},onclick:()=>{this.close(),this.ctx.previewFluid&&this.ctx.previewFluid()}},K("sparkle"),"Voir l\u2019aper\xE7u")):null,u("div",{class:"sect"},u("h3",{text:"Apparence"}),n,Ye.fluid?u("p",{class:"note",text:"Halloween : chaque bouton, chaque onglet et chaque touche du pad devient une petite poup\xE9e en 3D. Elle s\u2019\xE9crase sous le doigt, crie ou chante avec le son, et ses yeux suivent ton doigt. La nuit tombe autour : brume, braises, et sur le pad un cimeti\xE8re sous la lune. Si tu ne touches plus rien, elles finissent par te regarder."}):null),u("p",{class:"note",text:"Ces r\xE9glages restent sur cet appareil ; ils ne changent pas tes projets."}));this.open("R\xE9glages",l)}async library(){let e=this.store,t=u("div",{class:"list"}),s=async()=>{let r=await e.listProjects();t.replaceChildren(...r.map(n=>{let l=(n.patterns||[]).reduce((h,v)=>h+ci(v),0),c=new Date(n.updated||n.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}),d=u("button",{class:"close","aria-label":"Options du projet",onclick:h=>{h.stopPropagation(),this.projectMenu(n,s)}},K("more"));return u("div",{class:"item",role:"button",tabindex:"0","aria-current":String(n.id===e.project.id),onclick:async()=>{await e.openProject(n.id),this.close();let h=e.project;for(let v of[...h.parts.drum.kit,h.parts.bass.preset,h.parts.lead.preset])await this.ctx.loadBanksFor(ye(v));e.syncAll(),this.ctx.toast("Projet ouvert : "+n.name)}},u("span",{class:"tx"},u("b",{text:n.name}),u("small",{text:`${c} \xB7 ${n.tempo} BPM \xB7 ${l} \xE9v\xE9n.`})),d)}))};await s();let i=u("input",{type:"file",accept:".json,.motif,application/json",class:"hidden"});i.addEventListener("change",async()=>{let r=i.files[0];if(r){try{let n=await r.text();if(n.includes('"motif-3-backup"')){let l=await e.restoreBackup(n);this.ctx.toast(`${l} projet(s) restaur\xE9(s)`),await s()}else e.importProjectText(n),this.ctx.toast("Projet import\xE9"),this.close()}catch(n){this.ctx.toast("Import impossible : "+n.message)}i.value=""}});let a=u("div",null,u("div",{class:"grid2",style:{marginBottom:"12px"}},u("button",{class:"big accent",onclick:()=>this.newIdea()},K("plus"),"Nouvelle"),u("button",{class:"big",onclick:()=>i.click()},K("download"),"Importer")),t,i,u("div",{class:"sect"},u("h3",{text:"Sauvegarde hors de l\u2019app"}),u("p",{class:"note",text:"Les projets sont enregistr\xE9s automatiquement sur cet appareil. Pour les garder ailleurs (Fichiers, iCloud Drive\u2026), exporte une sauvegarde compl\xE8te."}),u("button",{class:"big",onclick:async()=>{let r=await e.backupAll(),n=new File([r],`MOTIF-sauvegarde-${new Date().toISOString().slice(0,10)}.json`,{type:"application/json"});await fs(n)!=="cancelled"&&this.ctx.toast("Sauvegarde pr\xEAte")}},K("share"),"Sauvegarder tous les projets")));this.open("Projets",a)}projectMenu(e,t){let s=this.store,i=u("input",{class:"field",value:e.name,"aria-label":"Nom du projet"}),a=u("div",null,u("div",{class:"sect"},u("h3",{text:"Nom"}),i),u("div",{class:"list"},u("button",{class:"item",onclick:async()=>{let r=i.value.trim()||e.name;e.id===s.project.id?s.rename(r):(e.name=r,await Fe.put("projects",e)),await s.save(),this.library()}},u("span",{class:"tx"},u("b",{text:"Renommer"}))),u("button",{class:"item",onclick:async()=>{e.id!==s.project.id&&await s.openProject(e.id),await s.duplicateProject(),this.ctx.toast("Copie cr\xE9\xE9e"),this.library()}},u("span",{class:"tx"},u("b",{text:"Dupliquer"}))),u("button",{class:"item",onclick:async()=>{let r=new File([JSON.stringify(e,null,1)],`${Yt(e.name)}.motif.json`,{type:"application/json"});await fs(r)}},u("span",{class:"tx"},u("b",{text:"Exporter le fichier projet"}))),u("button",{class:"item",onclick:()=>this.confirm(`Supprimer \xAB ${e.name} \xBB ?`,"Le projet sera effac\xE9 de cet appareil. Exporte-le avant si tu veux le garder.","Supprimer",async()=>{await s.deleteProject(e.id),this.ctx.toast("Projet supprim\xE9"),this.library()})},u("span",{class:"tx"},u("b",{text:"Supprimer\u2026",style:{color:"var(--rec)"}})))));this.open(e.name,a)}confirm(e,t,s,i){let a=u("div",null,u("p",{class:"note",text:t}),u("div",{class:"grid2"},u("button",{class:"big",onclick:()=>this.close(),text:"Annuler"}),u("button",{class:"big accent",style:{background:"var(--rec)",color:"#fff"},onclick:async()=>{this.close(!0),await i()},text:s})));this.open(e,a)}newIdea(){let e=this.store,t=u("div",{class:"list"},u("button",{class:"item",onclick:async()=>{await e.newProject(null),await s()}},u("span",{class:"ic"},K("plus")),u("span",{class:"tx"},u("b",{text:"Id\xE9e vierge"}),u("small",{text:"Kit Studio, 2 mesures"}))),u("button",{class:"item",onclick:async()=>{let a=e.planRandomProject();for(let r of[...a.parts.drum.kit,a.parts.bass.preset,a.parts.lead.preset])await this.ctx.loadBanksFor(ye(r));await e.save(),e.loadProject(a),await s(`${ye(a.parts.bass.preset).name} \xB7 ${ye(a.parts.lead.preset).name} \xB7 touche le d\xE9 pour relancer`)}},u("span",{class:"ic"},K("dice")),u("span",{class:"tx"},u("b",{text:"Id\xE9e au hasard"}),u("small",{text:"Sons et octaves tir\xE9s au sort, tempo et gamme d\u2019une sc\xE8ne"}))),...Dt.map(a=>u("button",{class:"item",onclick:async()=>{await e.newProject(a.id),await s()}},u("span",{class:"ic"},K("sparkle")),u("span",{class:"tx"},u("b",{text:a.name}),u("small",{text:`${a.bpm} BPM \xB7 ${mt[a.key]} ${vt(a.scale).name.toLowerCase()} \xB7 sons de la sc\xE8ne`}))))),s=async a=>{this.close(),this.ctx.toast(a||"Nouvelle id\xE9e");let r=e.project;for(let n of[...r.parts.drum.kit,r.parts.bass.preset,r.parts.lead.preset])await this.ctx.loadBanksFor(ye(n));e.syncAll()},i=u("div",{class:"list"},...Ea.map(a=>{let r=et(a);return u("button",{class:"item",onclick:async()=>{await e.save(),e.loadProject(Ra(a)),await s("Exemple charg\xE9 : touche \u25B6")}},u("span",{class:"ic"},K("play")),u("span",{class:"tx"},u("b",{text:"Exemple "+r.short}),u("small",{text:`Boucle A + variation B \xB7 ${r.bpm} BPM`})))}));this.open("Nouvelle id\xE9e",u("div",null,u("div",{class:"sect"},u("h3",{text:"Partir de z\xE9ro"}),t),u("div",{class:"sect"},u("h3",{text:"Exemples \xE0 \xE9couter et modifier"}),i)))}browser(){let e=this.store,t=e.ui,s=t.part==="drum"?Pt[t.lane]:t.part,i="all",a=u("div",{class:"list"}),r=u("div",{class:"filters"}),n=()=>t.part==="drum"?e.project.parts.drum.kit[t.lane]:e.project.parts[t.part].preset,l=()=>{let v=tt(s).filter(m=>i==="all"||(i==="core"?!m.style:m.style===i));a.replaceChildren(...v.map(m=>{let f=m.style?et(m.style):null;return u("button",{class:"item","aria-current":String(m.id===n()),onclick:async()=>{await Ti(m.id),l()}},u("span",{class:"tx"},u("b",{text:m.name}),u("small",{text:m.desc||""})),f?u("span",{class:"tag",text:f.short}):null)}));let p=a.querySelector('[aria-current="true"]');p&&p.scrollIntoView({block:"center"})},c=[["all","Tous"],["core","Base"],...Dt.map(h=>[h.id,h.short])];r.replaceChildren(...c.map(([h,v])=>{let p=u("button",{"aria-pressed":String(i===h)},v);return p.addEventListener("click",()=>{i=h;for(let m of r.children)m.setAttribute("aria-pressed","false");p.setAttribute("aria-pressed","true"),l()}),p}));let d=u("div",null);if(t.part==="drum"){let h=u("div",{class:"seg",style:{marginBottom:"10px"}},...["Kick","Snare","Hat","Perc"].map((p,m)=>u("button",{"aria-pressed":String(t.lane===m),onclick:()=>{t.lane=m,this.browser(),e.changed("preset")}},p))),v=u("div",{class:"filters"},...Ze.map(p=>u("button",{onclick:async()=>{for(let m of p.kit)await this.ctx.loadBanksFor(ye(m));e.applyKit(p.id,!1),this.ctx.toast("Kit "+p.name),l()}},p.name)));d.append(h,u("div",{class:"sect"},u("h3",{text:"Kits complets"}),v))}d.append(r,a),this.open(t.part==="drum"?"Sons de batterie":t.part==="bass"?"Basses":"M\xE9lodies",d),l()}keyPicker(){let e=this.store,t=u("div",{class:"cards"},...mt.map((i,a)=>u("button",{class:"pat",style:{width:"52px",height:"48px",fontSize:"16px"},"aria-pressed":String(e.project.key===a),onclick:()=>{e.set("key",a),this.keyPicker()}},i))),s=u("div",{class:"list"},...Ms.map(i=>u("button",{class:"item","aria-current":String(e.project.scale===i.id),onclick:()=>{e.set("scale",i.id),this.keyPicker()}},u("span",{class:"tx"},u("b",{text:i.name}),u("small",{text:i.iv.map(a=>mt[(a+e.project.key)%12]).join(" \xB7 ")})))));this.open("Tonalit\xE9",u("div",null,u("div",{class:"sect"},u("h3",{text:"Tonique"}),t),u("div",{class:"sect"},u("h3",{text:"Gamme (les notes enregistr\xE9es suivent)"}),s)))}clearMenu(){let e=this.store,t=e.ui,s=(r,n,l)=>u("button",{class:"item",onclick:()=>{l(),this.close(),this.ctx.toast("Effac\xE9",{label:"Annuler",fn:()=>e.undo()})}},u("span",{class:"tx"},u("b",{text:r}),u("small",{text:n}))),i=[];t.part==="drum"?(i.push(s(`Effacer ${["le kick","la snare","le hat","la perc"][t.lane]}`,"Seulement cette ligne de batterie",()=>e.clearPart("drum",t.lane))),i.push(s("Effacer toute la batterie","Les quatre lignes",()=>e.clearPart("drum",null)))):i.push(s(`Effacer la ${t.part==="bass"?"basse":"m\xE9lodie"}`,"Toutes les notes de la boucle",()=>e.clearPart(t.part))),i.push(s("Effacer les mouvements","Automation des tweaks de cette partie",()=>{if(t.part==="drum")for(let r=0;r<4;r++)e.clearAuto("d"+r);else e.clearAuto(t.part)})),e.redoStack.length&&i.unshift(u("button",{class:"item",onclick:()=>{e.redo(),this.close(),this.ctx.toast("R\xE9tabli")}},u("span",{class:"tx"},u("b",{text:"R\xE9tablir"}),u("small",{text:"Refaire ce que \u21B6 vient d\u2019annuler"}))));let a=u("div",null,u("p",{class:"note",text:"Pour n\u2019effacer qu\u2019une portion : glisse sur la frise (ou touche une mesure) puis touche la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."}),u("div",{class:"list"},...i));this.open("Effacer",a)}song(){this.store.ui.view="song",document.querySelector('.nav [data-v="song"]').click()}songView(){let e=this.store,t=u("div",{class:"scroll"}),s=[],i=()=>{let r=e.project;t.replaceChildren();let n=new Qe({label:"Tempo",min:()=>40,max:()=>220,get:()=>e.project.tempo,set:f=>e.set("tempo",f),format:f=>({v:String(f),s:"BPM"}),step:5,onTap:()=>h()}),l=new Qe({label:"Swing",min:()=>50,max:()=>75,get:()=>e.project.swing,set:f=>e.set("swing",f),format:f=>({v:f===50?"OFF":f+"%",s:"groove"}),step:8}),c=new Qe({label:"Tonalit\xE9",min:()=>0,max:()=>11,get:()=>e.project.key,set:f=>e.set("key",f),format:f=>({v:mt[f],s:vt(e.project.scale).name}),step:14,onTap:()=>this.keyPicker()}),d=[],h=()=>{let f=performance.now();if(d=d.filter(b=>f-b<2500),d.push(f),d.length>=3){let b=(d[d.length-1]-d[0])/(d.length-1);e.set("tempo",Math.round(6e4/b)),n.render()}else this.ctx.toast("Tape encore pour r\xE9gler le tempo")};t.append(u("div",{class:"sect"},u("h3",{text:"Global"}),u("div",{class:"controls"},n.el,l.el,c.el))),requestAnimationFrame(()=>{n.render(),l.render(),c.render()}),t.append(u("div",{class:"sect"},u("h3",{text:"Longueur de la boucle"}),u("div",{class:"seg"},...Ki.map(f=>u("button",{"aria-pressed":String(r.bars===f),onclick:()=>{let b=r.bars;f!==b&&(e.snapshot(),e.set("bars",f),i(),this.ctx.toast(f>b?"Boucle allong\xE9e : le contenu est r\xE9p\xE9t\xE9":"Boucle raccourcie : la fin est coup\xE9e",{label:"Annuler",fn:()=>e.undo()}))}},`${f} mes.`)))));let v=u("div",{class:"cards"},...r.patterns.map((f,b)=>{let y=u("button",{class:"pat","aria-pressed":String(r.current===b),onclick:()=>{e.selectPattern(b),i()}},f.name,u("small",{text:`${ci(f)} \xE9v.`})),x=0;return y.addEventListener("pointerdown",()=>{x=setTimeout(()=>{r.patterns.length>1&&this.confirm(`Supprimer la variation ${f.name} ?`,"Ses notes et mouvements seront effac\xE9s.","Supprimer",()=>{e.deletePattern(b),i()})},650)}),y.addEventListener("pointerup",()=>clearTimeout(x)),y.addEventListener("pointercancel",()=>clearTimeout(x)),y}),r.patterns.length<8?u("button",{class:"pat add","aria-label":"Nouvelle variation (copie)",onclick:()=>{e.addPattern(r.current),i(),this.ctx.toast("Variation copi\xE9e : modifie-la librement")}},"+"):null);t.append(u("div",{class:"sect"},u("h3",{text:"Variations de la boucle"}),v,u("p",{class:"note",text:"\xAB + \xBB copie la variation en cours. Appui long pour supprimer."})));let p=u("div",{class:"secs"});r.song.sections.forEach((f,b)=>{let y=[["d0","K"],["d1","S"],["d2","H"],["d3","P"],["bass","B"],["lead","L"]].map(([x,T])=>u("button",{"aria-pressed":String(!!(f.mute&&f.mute[x])),"aria-label":"Couper "+x,onclick:()=>{let E=JSON.parse(JSON.stringify(r.song));E.sections[b].mute={...E.sections[b].mute,[x]:!(f.mute&&f.mute[x])},e.setSong(E),i()}},T));p.append(u("div",{class:"sec"+(e.ui.playing&&r.song.enabled&&e.ui.section===b?" playing":"")},u("button",{class:"p","aria-label":"Changer de variation",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song));x.sections[b].p=(f.p+1)%r.patterns.length,e.setSong(x),i()}},r.patterns[f.p]?r.patterns[f.p].name:"?"),u("button",{class:"reps",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song)),T=[1,2,4,8];x.sections[b].reps=T[(T.indexOf(f.reps)+1)%T.length],e.setSong(x),i()}},`\xD7${f.reps}`),u("div",{class:"mutes"},...y),u("button",{class:"x","aria-label":"Retirer la section",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song));x.sections.splice(b,1),x.sections.length||(x.enabled=!1),e.setSong(x),i()}},K("close"))))});let m=u("button",{class:"big"+(r.song.enabled?" accent":""),onclick:()=>{r.song.sections.length?e.setSong({...r.song,enabled:!r.song.enabled}):e.autoArrange(),i()}},K("song"),r.song.enabled?"Arrangement activ\xE9 (lecture du morceau)":"Lire l\u2019arrangement");t.append(u("div",{class:"sect"},u("h3",{text:"Arrangement"}),m,u("div",{style:{height:"8px"}}),p,u("div",{class:"grid2",style:{marginTop:"8px"}},u("button",{class:"big",onclick:()=>{let f=JSON.parse(JSON.stringify(r.song));f.sections.push({p:r.current,reps:2,mute:{}}),f.enabled=!0,e.setSong(f),i()}},K("plus"),"Section"),u("button",{class:"big",onclick:()=>{e.autoArrange(),i(),this.ctx.toast("Arrangement cr\xE9\xE9 \xE0 partir de tes variations")}},K("sparkle"),"D\xE9velopper")),u("p",{class:"note",text:"Chaque section joue une variation un certain nombre de fois ; touche K S H P B L pour couper une partie dans la section."}))),t.append(u("div",{class:"sect"},u("h3",{text:"Exporter"}),u("button",{class:"big accent",onclick:()=>this.exportSheet()},K("share"),"WAV, pistes, MIDI, projet")))};i();let a=this.store.on("change",r=>{(r==="section"||r==="song")&&i()});return s.push(a),{el:t,cleanup:()=>s.forEach(r=>r())}}exportSheet(){let e=this.store,t=this.ctx.host(),s=e.project,i=s.song.enabled&&s.song.sections.length,a=u("div",{class:"seg"},...[1,2,4,8].map(b=>u("button",{"aria-pressed":String(b===2),onclick:y=>{for(let x of a.children)x.setAttribute("aria-pressed","false");y.currentTarget.setAttribute("aria-pressed","true"),r=b}},`\xD7${b}`))),r=2,n=u("div",{class:"prog"},u("i")),l=u("p",{class:"note",text:""}),c=u("div",{class:"list"}),d=b=>{n.firstChild.style.width=Math.round(b*100)+"%"},h=(b,y)=>{c.prepend(u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:b.name}),u("small",{text:y})),u("button",{class:"pill on",onclick:async()=>{await fs(b)==="downloaded"&&this.ctx.toast("Fichier t\xE9l\xE9charg\xE9")}},K("share"),"Partager")))},v=b=>{for(let y of m.querySelectorAll("button"))y.disabled=b},p=async b=>{v(!0),d(0),l.textContent=b?"Rendu des pistes\u2026":"Rendu du mix\u2026";try{let y=await ka(e,t,{stems:b,loops:r,onProgress:d,build:this.ctx.build});if(d(1),b){let x=Ta(y),T=new File([x],`${Yt(s.name)}-pistes.zip`,{type:"application/zip"});h(T,`${y.length} fichiers WAV 24 bits \xB7 ${(x.size/1e6).toFixed(1)} Mo`);let E=y.find(O=>O.group===null);E&&await Si(E.name,new Blob([E.data],{type:"audio/wav"}),{seconds:E.seconds,project:s.name})}else{let x=y[0],T=new Blob([x.data],{type:"audio/wav"}),E=new File([T],x.name,{type:"audio/wav"});h(E,`${x.seconds.toFixed(1)} s \xB7 WAV 24 bits 48 kHz \xB7 cr\xEAte ${(20*Math.log10(x.peak)).toFixed(1)} dBFS`),await Si(x.name,T,{seconds:x.seconds,project:s.name})}l.textContent="Pr\xEAt. Touche \xAB Partager \xBB pour l\u2019enregistrer dans Fichiers ou l\u2019envoyer."}catch(y){l.textContent="\xC9chec du rendu : "+y.message}v(!1)},m=u("div",{class:"list"},u("button",{class:"item",onclick:()=>p(!1)},u("span",{class:"ic"},K("speaker")),u("span",{class:"tx"},u("b",{text:"Mix WAV"}),u("small",{text:"Le morceau tel que tu l\u2019entends, effets et mouvements compris"}))),u("button",{class:"item",onclick:()=>p(!0)},u("span",{class:"ic"},K("mix")),u("span",{class:"tx"},u("b",{text:"Pistes s\xE9par\xE9es (ZIP)"}),u("small",{text:"Kick, snare, hat, perc, basse, m\xE9lodie + mix"}))),u("button",{class:"item",onclick:()=>{h(wa(e),"Notes de batterie, basse et m\xE9lodie (MIDI type 1)")}},u("span",{class:"ic"},K("note")),u("span",{class:"tx"},u("b",{text:"MIDI"}),u("small",{text:"Pour continuer dans un logiciel de musique"}))),u("button",{class:"item",onclick:()=>{h(Sa(e),"Projet MOTIF modifiable")}},u("span",{class:"ic"},K("file")),u("span",{class:"tx"},u("b",{text:"Fichier projet"}),u("small",{text:"\xC0 r\xE9importer dans MOTIF"})))),f=u("div",null,i?u("p",{class:"note",text:"L\u2019arrangement est activ\xE9 : le rendu suit les sections."}):u("div",{class:"sect"},u("h3",{text:"R\xE9p\xE9titions de la boucle"}),a),m,u("div",{style:{height:"10px"}}),n,l,c);this.open("Exporter",f)}async player(){let e=u("div",{class:"list"}),t=this.audio||(this.audio=u("audio",{preload:"none"})),s=null,i=async()=>{let n=(await Fe.all("renders")).map(d=>({...d,kind:"Rendu"})),l=(await Fe.all("files")).map(d=>({...d,kind:"Import\xE9"})),c=[...n,...l].sort((d,h)=>h.created-d.created);c.length?e.replaceChildren(...c.map(d=>{let h=u("button",{class:"pill","aria-label":"Lire"},K("play"));h.addEventListener("click",()=>{if(s&&t.dataset.id===d.id&&!t.paused){t.pause();return}s&&URL.revokeObjectURL(s),s=URL.createObjectURL(d.blob),t.src=s,t.dataset.id=d.id,t.play().catch(()=>{})});let v=u("button",{class:"pill","aria-label":"Partager",onclick:()=>fs(new File([d.blob],d.name,{type:d.type||"audio/wav"}))},K("share")),p=u("button",{class:"pill","aria-label":"Supprimer",onclick:()=>this.confirm("Supprimer ce fichier ?",d.name,"Supprimer",async()=>{await Fe.del(d.kind==="Rendu"?"renders":"files",d.id),this.player()})},K("trash"));return u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:d.name}),u("small",{text:`${d.kind} \xB7 ${new Date(d.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})} \xB7 ${((d.size||0)/1e6).toFixed(1)} Mo`})),h,v,p)})):e.replaceChildren(u("p",{class:"note",text:"Aucun rendu pour l\u2019instant. Exporte un mix WAV ou importe un fichier audio."}))},a=u("input",{type:"file",accept:"audio/*",class:"hidden",multiple:!0});a.addEventListener("change",async()=>{for(let n of a.files)await Fe.put("files",{id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),name:n.name,created:Date.now(),size:n.size,type:n.type,blob:n});a.value="",i()});let r=u("div",{class:"sect"},t);t.controls=!0,t.style.width="100%",await i(),this.open("Lecteur",u("div",null,r,u("button",{class:"big",style:{marginBottom:"10px"},onclick:()=>a.click()},K("download"),"Importer un fichier audio"),e,a,u("p",{class:"note",text:"Les rendus et fichiers import\xE9s restent sur cet appareil ; rien n\u2019est envoy\xE9 sur internet."})),{onClose:()=>{t.pause()}})}async offline(){let e=await Hi(),t=navigator.storage&&navigator.storage.persisted?await navigator.storage.persisted().catch(()=>!1):!1,s=u("p",{class:"note",text:window.__motifOffline||"V\xE9rification\u2026"}),i=u("div",{class:"prog"},u("i")),a=u("div",null,u("div",{class:"sect"},u("h3",{text:"Hors ligne"}),s,i,u("button",{class:"big accent",style:{marginTop:"10px"},onclick:async()=>{s.textContent="T\xE9l\xE9chargement de tous les sons\u2026";try{await(window.__motifCacheAll?window.__motifCacheAll(r=>{i.firstChild.style.width=Math.round(r*100)+"%"}):Promise.reject(new Error("service worker indisponible"))),s.textContent="Tout est disponible hors ligne."}catch(r){s.textContent="\xC9chec : "+r.message}}},K("download"),"Tout rendre disponible hors ligne")),u("div",{class:"sect"},u("h3",{text:"Version"}),u("p",{class:"note",text:`MOTIF 3 \xB7 version ${this.ctx.build}. Les mises \xE0 jour ne touchent jamais \xE0 tes projets (ils sont dans la base locale, s\xE9par\xE9e du cache).`}),u("button",{class:"big",onclick:()=>window.__motifCheckUpdate&&window.__motifCheckUpdate(!0)},"Rechercher une mise \xE0 jour"),u("p",{class:"note"},"Version pr\xE9c\xE9dente pour comparer : ",u("a",{href:"https://motif-studio-iphone.taxulas.chatgpt.site/figure/",target:"_blank",rel:"noopener",style:{color:"var(--accent)"}},"MOTIF Studio 2.4")," (acc\xE8s priv\xE9).")),u("div",{class:"sect"},u("h3",{text:"Stockage"}),u("p",{class:"note",text:`${t?"Stockage persistant accord\xE9.":"Stockage standard (le navigateur peut le lib\xE9rer si l\u2019appareil manque de place ; exporte une sauvegarde de temps en temps)."}${e?` Utilis\xE9 : ${(e.usage/1e6).toFixed(1)} Mo.`:""}`})),u("div",{class:"sect"},u("h3",{text:"Son"}),u("button",{class:"big",onclick:async()=>{this.close();let r=await this.ctx.host().rebuild();this.ctx.toast(r?"Son r\xE9initialis\xE9":"Touchez l\u2019\xE9cran pour r\xE9activer le son")}},K("speaker"),"R\xE9initialiser le son")));this.open("Hors ligne et mises \xE0 jour",a)}help(){let e=(t,s)=>u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:t}),u("small",{text:s,style:{whiteSpace:"normal"}})));this.open("Les gestes",u("div",{class:"list"},e("Jouer","Touche le pad : le son joue avec le rythme choisi, sans lancer la boucle. Gauche-droite = notes, haut-bas = expression."),e("Enregistrer","REC arme. Le premier toucher lance la boucle et la prise. Rejouer par-dessus remplace ce qui passe sous ton doigt."),e("Rythme et liaisons","Glisse verticalement sur Rythme. Touche-le (ou glisse vers la droite) pour r\xE9gler les liaisons : les notes se lient et glissent."),e("Plage de notes","Glisse la fen\xEAtre pour la d\xE9placer (m\xEAme nombre de notes). Tire une poign\xE9e pour agrandir ou r\xE9duire. Touche ailleurs pour sauter."),e("Plusieurs doigts","Avec plusieurs doigts, l\u2019arp\xE8ge suit l\u2019ordre de pose ; \xAB Doigts \xBB change d\u2019ordre ou joue un accord."),e("Effacer une portion","Glisse sur la frise (ou touche une mesure), puis la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."),e("Changer de son","Glisse le nom ou utilise les fl\xE8ches : la boucle continue avec le nouveau son."),e("Tweaks","Chaque son a ses propres axes. Plusieurs points se bougent \xE0 la fois. Avec REC et lecture, les mouvements s\u2019enregistrent."),e("Batterie","Une colonne par son. Dans une colonne, gauche/milieu/droite = trois variantes, haut-bas = caract\xE8re."),e("Annuler","La fl\xE8che \u21B6 annule la derni\xE8re prise ou modification.")))}async licences(){let e=u("div",null,u("p",{class:"note",text:"Tous les sons synth\xE9tiques sont des cr\xE9ations originales de MOTIF. Les enregistrements int\xE9gr\xE9s sont dans le domaine public (CC0) ; ils ont \xE9t\xE9 convertis en mono, d\xE9coup\xE9s, normalis\xE9s et encod\xE9s en FLAC."}),u("div",{class:"list"},u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"Virtuosity Drums"}),u("small",{text:"Versilian Studios & Karoryfer Lecolds \xB7 CC0 1.0 \xB7 github.com/sfzinstruments/virtuosity_drums"}))),u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"Versilian Community Sample Library"}),u("small",{text:"Versilian Studios \xB7 CC0 1.0 \xB7 github.com/sgossner/VCSL"}))),Ye.fluid?u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"WebGL Fluid Simulation (effets fluides)"}),u("small",{text:"\xA9 2017 Pavel Dobryakov \xB7 licence MIT \xB7 github.com/PavelDoGreat/WebGL-Fluid-Simulation",style:{whiteSpace:"normal"}}))):null),u("p",{class:"note",text:"Le d\xE9tail fichier par fichier (chemin d\u2019origine, commit, transformations, empreinte SHA-256) est dans banks/*/bank.json et SOUNDS.md."}));this.open("Sons et licences",e)}};function kr(){let o=document.documentElement;return o.hasAttribute("data-halloween")?"halloween":o.dataset.theme==="light"?"light":"dark"}function wr(o){document.documentElement.toggleAttribute("data-halloween",o==="halloween"),document.documentElement.dataset.theme=o==="light"?"light":"dark";try{localStorage.setItem(Ye.storage+".theme",o)}catch{}let e=document.getElementById("themeColor");e&&e.setAttribute("content",o==="light"?"#f3efe6":o==="halloween"?"#0a0612":"#0b0c10"),window.dispatchEvent(new Event("resize")),window.dispatchEvent(new Event("motif:theme"))}function Aa({toast:o,store:e,build:t}){if(window.__motifOffline="Le mode hors ligne s\u2019active apr\xE8s le premier chargement complet.",!("serviceWorker"in navigator)){window.__motifOffline="Ce navigateur ne permet pas le mode hors ligne.";return}let s=location.hostname==="localhost"||location.hostname==="127.0.0.1";if(location.protocol!=="https:"&&!s){window.__motifOffline="Hors ligne indisponible sans HTTPS.";return}if(s&&!/[?&]sw\b/.test(location.search)){navigator.serviceWorker.getRegistrations().then(h=>h.forEach(v=>v.unregister())),window.__motifOffline="Service worker d\xE9sactiv\xE9 en d\xE9veloppement local.";return}let i=null,a=new URL("sw.js",location.href).href,r=()=>!!navigator.serviceWorker.controller&&navigator.serviceWorker.controller.scriptURL===a,n=h=>{o("Mise \xE0 jour disponible",{label:"Installer",fn:async()=>{await e.save(),h.postMessage({type:"skipWaiting"})}})};navigator.serviceWorker.register("sw.js",{scope:"./"}).then(h=>{i=h,h.waiting&&r()&&n(h.waiting),h.addEventListener("updatefound",()=>{let v=h.installing;v&&v.addEventListener("statechange",()=>{v.state==="installed"&&r()&&n(v)})}),d()}).catch(h=>{window.__motifOffline="Service worker non install\xE9 : "+h.message});let l=r(),c=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!l||c||(c=!0,e.save().finally(()=>location.reload()))}),navigator.serviceWorker.addEventListener("message",h=>{let v=h.data||{};v.type==="status"&&(window.__motifOffline=v.text),v.type==="cacheProgress"&&window.__motifCacheProgress&&window.__motifCacheProgress(v.value)});async function d(){let h=await navigator.serviceWorker.ready;h.active&&h.active.postMessage({type:"status"})}window.__motifCheckUpdate=async h=>{if(i)try{await i.update(),h&&!i.waiting&&!i.installing&&o("MOTIF est \xE0 jour")}catch{h&&o("Pas de connexion")}},window.__motifCacheAll=h=>new Promise((v,p)=>{navigator.serviceWorker.ready.then(m=>{let f=new MessageChannel;f.port1.onmessage=b=>{let y=b.data;y.type==="progress"?h&&h(y.value):y.type==="done"?(window.__motifOffline="Tout est disponible hors ligne.",v()):y.type==="error"&&p(new Error(y.message))},m.active.postMessage({type:"cacheAll"},[f.port2])},p)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&window.__motifCheckUpdate(!1)})}var Da=Math.PI/180,Pa={beta:50,gamma:0},zs=22,Us=6;function Li(o,e){let t=o*Da,s=e*Da;return[-Math.sin(s)*Math.cos(t),Math.sin(t),Math.cos(s)*Math.cos(t)]}function Ri(o){let e=[o[0]-.62,o[1],Math.max(.18,o[2])],t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}var Mi=Li(Pa.beta,Pa.gamma),Kt=Ri(Mi);function qa(o){return[(o[0]-Mi[0])*1.4,(o[1]-Mi[1])*1.4]}var qe=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Sr=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  float offset = 1.33333333;
  vL = vUv - texelSize * offset; vR = vUv + texelSize * offset;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Tr=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
  sum += texture2D(uTexture, vL) * 0.35294117;
  sum += texture2D(uTexture, vR) * 0.35294117;
  gl_FragColor = sum;
}`,Mr=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture;
void main () { gl_FragColor = texture2D(uTexture, vUv); }`,Lr=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`,Hs=`
precision highp float; precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uTexture; uniform sampler2D uBloom; uniform sampler2D uSunrays; uniform sampler2D uDithering; uniform sampler2D uKeys;
uniform vec2 ditherScale; uniform vec2 texelSize; uniform vec2 res; uniform float gain;
uniform vec3 bgTop; uniform vec3 bgBot; uniform vec3 accent; uniform vec4 sep; uniform float sepPx;
uniform vec4 kinds[6]; uniform float useKeys; uniform float grid; uniform float darkTheme;
uniform float glass; uniform float radius; uniform float bevel; uniform vec2 lightDir; uniform float pulse; uniform float hdr;
uniform float thickness; uniform float gel; uniform vec4 touches[4]; // touches: x, y (uv), age (s), strength
// where the surface lies in the larger canvas (px, from the bottom left), and the screen's pixel ratio
uniform vec2 off; uniform float dpr;
// glass slabs (surface uv, y up): one for the pad, one per channel in the Mix, and what each holds there
// (colour and level of the channel, its live meter); mode 1 = Mix
uniform vec4 slabs[8]; uniform vec4 fills[8]; uniform float meters[8]; uniform float nSlabs; uniform float mode; uniform vec3 surf;
// the lamp's height above the screen, the room's reflection sliding with the phone's tilt,
// the power of the light around the glass, the strength of its shadow
uniform float lightZ; uniform vec2 slide; uniform float spillK; uniform float shadowK;
// the light around the glass, drawn at half the resolution by the LIGHT_PASS (it is soft)
uniform sampler2D uLight; uniform vec2 canvasRes; uniform vec2 lightScale;
// the screen's own colour: around the glass the canvas paints the screen itself, lit and shaded
uniform vec3 appBg;
// the raised controls standing on the screen around the glass (surface px, y up) hide the light behind
// them; obstH: the light's height in the glass, the controls' height (px)
uniform vec4 obst[16]; uniform float obstR[16]; uniform float nObst; uniform vec2 obstH;
// light theme look: 0 light that adds (dark theme, Classique), 1 Aquarelle (pigment ink, tinted light
// around), 2 Vitrail (luminous ink, coloured light around)
uniform float style;
// where the ink shines (surface px, y up; z: intensity 0..1) and its colour: the lights that cast the
// controls' shadows
uniform sampler2D uSources; // (SOURCES_PASS: 8\xD71 \u2014 x, y (uv), intensity for 4 glows, then their colours)
// keys lit by a finger or a note, drawn under the glass so they bend with it (one texel per key)
uniform sampler2D uKeyLit; uniform vec4 keyGlow;
// the glass's look (R\xE9glages \u2192 Style du verre): x 0 Optique, 1 Liquide, 2 D\xE9poli, 3 Cristal, 4 Prisme; y the
// edge's profile (a superellipse's exponent, 1: a flat facet); z how much the colours split; w how deep the
// facet refracts (Prisme: how high the plate floats over the screen, in thicknesses)
uniform vec4 look;
// MOTIF Halloween (R\xE9glages \u2192 Th\xE8me): x 1 = a graveyard under the moon is the screen under the glass;
// y time (s); z the dolls watch you (0..1); w a pulse on each beat
uniform vec4 stage;
// the ink's light averaged over a coarse grid (HAZE_PASS, cells of about 20 px): the light caught in the
// glass that leaks out through its edge, and the ink seen through frosted glass
uniform sampler2D uHaze; uniform vec2 hazeRes;

vec4 selRect; vec4 selFill; float selMeter;
float sepLine; // (marks: 1 on a partition between keys or a grid line)

vec3 linearToGamma (vec3 color) { color = max(color, vec3(0)); return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0)); }

vec3 inkAt (vec2 uv) {
  vec3 c = texture2D(uTexture, uv).rgb;
#ifdef SHADING
  vec3 lc = texture2D(uTexture, uv - vec2(texelSize.x, 0.0)).rgb; vec3 rc = texture2D(uTexture, uv + vec2(texelSize.x, 0.0)).rgb;
  vec3 tc = texture2D(uTexture, uv + vec2(0.0, texelSize.y)).rgb; vec3 bc = texture2D(uTexture, uv - vec2(0.0, texelSize.y)).rgb;
  vec3 n = normalize(vec3(length(rc) - length(lc), length(tc) - length(bc), length(texelSize)));
  c *= clamp(dot(n, vec3(0.0, 0.0, 1.0)) + 0.7, 0.7, 1.0);
#endif
#ifdef BLOOM
  vec3 bloom = texture2D(uBloom, uv).rgb;
#endif
#ifdef SUNRAYS
  float sunrays = texture2D(uSunrays, uv).r;
  c *= sunrays;
#ifdef BLOOM
  bloom *= sunrays;
#endif
#endif
#ifdef BLOOM
  // (the dithering goes after the gamma curve, at half a step: before it, the curve blew it up into a
  // visible grain in the dark parts of the glow)
  c += linearToGamma(bloom) + (texture2D(uDithering, uv * ditherScale).r - 0.5) / 255.0;
#endif
  return c * gain;
}
// the ink's light without the details (for the light leaving the glass)
vec3 glowAt (vec2 uv) {
  vec3 c = texture2D(uTexture, uv).rgb;
#ifdef BLOOM
  c += linearToGamma(texture2D(uBloom, uv).rgb);
#endif
  return c;
}

// the blurred ink, smoothed between the cells of its grid (four taps: no visible steps)
vec3 hazeAt (vec2 uv) {
  vec2 o = 0.5 / hazeRes;
  return 0.25 * (texture2D(uHaze, uv + o).rgb + texture2D(uHaze, uv - o).rgb + texture2D(uHaze, uv + vec2(o.x, -o.y)).rgb + texture2D(uHaze, uv + vec2(-o.x, o.y)).rgb);
}

// (constant indices only: WebGL 1 fragment shaders may not index uniform arrays dynamically)
vec4 kindColor (float k) {
  if (k < 0.5) return kinds[0]; if (k < 1.5) return kinds[1]; if (k < 2.5) return kinds[2];
  if (k < 3.5) return kinds[3]; if (k < 4.5) return kinds[4]; return kinds[5];
}


// ---- MOTIF Halloween: a graveyard under the moon, under the glass (see halloween/shaders.js) ----
float hHash (vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float hNoise (vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hHash(i), hHash(i + vec2(1.0, 0.0)), u.x), mix(hHash(i + vec2(0.0, 1.0)), hHash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float hFbm (vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 3; i++) { s += a * hNoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }
float hBox (vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
// a bat (2D, y up): a small body, scalloped wings that flap
float hBat (vec2 p, float flap) {
  p.x = abs(p.x);
  float body = length(p * vec2(1.6, 1.0)) - 0.16;
  vec2 w = p - vec2(0.18, 0.0);
  float a = flap * 0.9, c = cos(a), s = sin(a);
  w = vec2(c * w.x - s * w.y, s * w.x + c * w.y);
  float wing = max(abs(w.y + 0.05 * w.x) - 0.12 * (1.0 - w.x / 0.95), w.x - 0.95);
  wing = max(wing, -w.x);
  wing = max(wing, -(length(vec2(mod(w.x, 0.3) - 0.15, w.y + 0.13)) - 0.11));
  return min(min(body, wing), length(p - vec2(0.07, 0.17)) - 0.05);
}
// crooked crosses, tombstones and a dead tree on the hill (units of the pad's height, y up)
float hGraves (vec2 p, float w) {
  float d = 1e5;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    vec2 q = p - vec2((0.1 + fi * 0.21) * w + 0.03 * sin(fi * 7.1), 0.0);
    float tl = 0.12 * sin(fi * 3.7), c = cos(tl), s = sin(tl);
    q = vec2(c * q.x - s * q.y, s * q.x + c * q.y);
    float h = 0.07 + 0.03 * fract(fi * 0.73);
    if (mod(fi, 2.0) < 1.0) d = min(d, min(hBox(q - vec2(0.0, h * 0.5), vec2(0.008, h * 0.5), 0.003), hBox(q - vec2(0.0, h * 0.68), vec2(0.03, 0.008), 0.003)));
    else d = min(d, min(hBox(q - vec2(0.0, h * 0.4), vec2(0.026, h * 0.4), 0.0), length(q - vec2(0.0, h * 0.8)) - 0.026));
  }
  vec2 t = p - vec2(0.83 * w, 0.0);
  float trunk = hBox(t - vec2(0.04 * t.y, 0.11), vec2(0.012 - t.y * 0.03, 0.11), 0.004);
  vec2 b1 = t - vec2(0.0, 0.17); b1 = vec2(0.6 * b1.x + 0.8 * b1.y, -0.8 * b1.x + 0.6 * b1.y);
  vec2 b2 = t - vec2(0.0, 0.13); b2 = vec2(0.5 * b2.x - 0.86 * b2.y, 0.86 * b2.x + 0.5 * b2.y);
  vec2 b3 = t - vec2(-0.03, 0.2); b3 = vec2(0.94 * b3.x + 0.34 * b3.y, -0.34 * b3.x + 0.94 * b3.y);
  float br = min(hBox(b1 - vec2(0.05, 0.0), vec2(0.05, 0.004), 0.003), hBox(b2 - vec2(0.045, 0.0), vec2(0.045, 0.004), 0.003));
  return min(d, min(trunk, min(br, hBox(b3 - vec2(-0.04, 0.0), vec2(0.04, 0.0035), 0.003))));
}
// the night at p (surface px, y up): sky, stars, the moon (a little red when the dolls watch you), clouds,
// bats, the hill with its graves, eyes opening in the dark, ground mist
vec3 stageAt (vec2 p) {
  vec2 uv = p / res;
  float Wr = res.x / res.y, t = stage.y, watch = stage.z;
  vec2 q = vec2(uv.x * Wr, uv.y);
  vec3 sky = mix(vec3(0.2, 0.07, 0.24), vec3(0.025, 0.02, 0.07), smoothstep(0.05, 0.95, q.y));
  if (q.y > 0.35) {
    vec2 cp = p / dpr;
    vec2 sg = floor(cp / 11.0), sf = fract(cp / 11.0) - 0.5 - 0.3 * (vec2(hHash(sg + 7.7), hHash(sg + 1.9)) - 0.5);
    sky += step(0.975, hHash(sg)) * smoothstep(0.35, 0.8, q.y) * exp(-dot(sf, sf) * 160.0) * (0.55 + 0.45 * sin(t * (1.5 + 3.0 * hHash(sg + 3.1)) + hHash(sg) * 30.0)) * vec3(0.85, 0.85, 1.0);
  }
  vec2 mc = vec2(0.72 * Wr, 0.78);
  float md = length(q - mc) - 0.13;
  vec3 moonC = mix(vec3(1.0, 0.95, 0.78), vec3(1.0, 0.45, 0.25), watch * 0.7);
  sky += moonC * 0.35 * exp(-max(md, 0.0) * 9.0) * (1.0 + 0.6 * stage.w);
  if (md < 0.01) sky = mix(sky, moonC * (0.82 + 0.25 * hNoise((q - mc) * 18.0 + 3.0) - 0.22 * smoothstep(0.5, 0.75, hNoise((q - mc) * 7.0))), smoothstep(0.004, -0.004, md));
  if (q.y > 0.45) {
    float cl = hFbm(vec2(q.x * 2.2 - t * 0.03, q.y * 5.0));
    sky = mix(sky, vec3(0.16, 0.1, 0.22) + moonC * 0.12 * exp(-length(q - mc) * 3.0), smoothstep(0.52, 0.8, cl) * smoothstep(0.45, 0.7, q.y) * smoothstep(1.0, 0.75, q.y) * 0.85);
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 bp = vec2((fract(t * (0.05 + 0.025 * fi) + fi * 0.37) * 1.4 - 0.2) * Wr, 0.62 + 0.15 * fi + 0.04 * sin(t * 1.3 + fi * 2.0));
      float sz = 0.035 + 0.012 * fi;
      sky = mix(sky, vec3(0.02, 0.01, 0.03), smoothstep(0.0015, -0.0015, hBat((q - bp) / sz, sin(t * (11.0 + fi * 2.0) + fi)) * sz));
    }
  }
  float hill = 0.2 + 0.04 * sin(q.x * 5.0 + 1.0) + 0.025 * sin(q.x * 11.0 + 2.0);
  if (q.y < hill + 0.2) {
    float gy = hGraves(q - vec2(0.0, hill - 0.004), Wr);
    sky = mix(sky, vec3(0.05, 0.03, 0.08), max(smoothstep(0.002, -0.002, q.y - hill), smoothstep(0.0015, -0.0015, gy) * step(hill - 0.01, q.y)));
    float near = 0.1 + 0.02 * sin(q.x * 3.0 + 4.0);
    sky = mix(sky, vec3(0.025, 0.015, 0.04), smoothstep(0.002, -0.002, q.y - near));
    for (int i = 0; i < 5; i++) {
      float fi = float(i), cyc = 7.0 + 3.0 * fi, ph = fract(t / cyc + fi * 0.31);
      float open = smoothstep(0.0, 0.08, ph) * smoothstep(0.55, 0.45, ph) * step(0.35 - watch * 0.4, fract(fi * 0.618 + floor(t / cyc + fi * 0.31) * 0.37));
      float blink = 1.0 - step(0.96, fract(t * 0.7 + fi * 0.21));
      vec2 ep = q - vec2((0.08 + 0.2 * fi + 0.05 * sin(fi * 4.0)) * Wr, hill - 0.035 - 0.03 * fract(fi * 0.53));
      ep.x = abs(ep.x) - 0.011;
      sky += vec3(0.75, 1.0, 0.3) * smoothstep(0.004, -0.002, length(ep * vec2(1.0, 2.4 / max(blink * open, 0.05))) - 0.006) * open * blink * (0.8 + watch);
    }
    sky += vec3(0.25, 0.4, 0.3) * smoothstep(0.32, 0.05, q.y) * hFbm(vec2(q.x * 3.0 + t * 0.05, q.y * 9.0 - t * 0.02)) * 0.45;
  }
  return sky;
}
vec3 marks (vec3 col, vec2 uv);
vec3 sceneAt (vec2 uv) {
  if (mode > 0.5) {
    // Mix: the channel's surface, its level as a column of coloured liquid, its sound as rising light
    float hgt = max(selRect.w - selRect.y, 1e-3), hpx = hgt * res.y;
    float t = clamp((uv.y - selRect.y) / hgt, 0.0, 1.0), lv = selFill.a;
    vec3 c = surf;
    float below = 1.0 - smoothstep(lv - 1.5 / hpx, lv + 1.5 / hpx, t);
    c = mix(c, selFill.rgb, below * mix(0.85, 0.42, clamp(t / max(lv, 0.05), 0.0, 1.0)));
    float ml = (t - lv) * hpx / (2.0 * dpr);
    c += selFill.rgb * exp(-ml * ml) * 0.6;                      // the meniscus catches the light
    float m = selMeter;
    c += selFill.rgb * m * m * 0.5 * (1.0 - smoothstep(0.0, max(m, 0.01), t));
    return c;
  }
  vec3 col = marks(stage.x > 0.5 ? stageAt(uv * res) : mix(bgBot, bgTop, uv.y), uv);
  // light under the glass: a soft glow in the part colour that breathes with the kick
  float glow = exp(-dot(uv - vec2(0.5, 0.12), uv - vec2(0.5, 0.12)) * 8.0) * (0.035 + 0.13 * pulse);
  col += accent * glow * (darkTheme > 0.5 ? 1.0 : 0.4);
  return col;
}
// the keys, the partitions between them and the grid, over a base colour
vec3 marks (vec3 col, vec2 uv) {
  if (useKeys > 0.5) {
    vec4 k = texture2D(uKeys, uv);
    if (k.r > 0.001) {
      vec4 o = kindColor(floor(k.g * 255.0 / 40.0 + 0.5));
      col = mix(col, o.rgb, o.a);
      float lit = texture2D(uKeyLit, vec2((floor(k.r * 255.0 + 0.5) - 0.5) / 64.0, 0.5)).r;
      col = mix(col, keyGlow.rgb, lit * keyGlow.a);
      float dx = sepPx / res.x;
      if (abs(texture2D(uKeys, uv - vec2(dx, 0.0)).r - k.r) > 0.001 || abs(texture2D(uKeys, uv + vec2(dx, 0.0)).r - k.r) > 0.001) { col = mix(col, sep.rgb, sep.a); sepLine = 1.0; }
    } else col = mix(col, darkTheme > 0.5 ? vec3(0.0) : sep.rgb, darkTheme > 0.5 ? 0.25 : sep.a);
  }
  if (grid > 0.5) {
    vec2 g = abs(fract(uv * 4.0 + 0.5) - 0.5) * res / 4.0;
    if (min(g.x, g.y) < 0.6) { col = mix(col, sep.rgb, sep.a); sepLine = 1.0; }
  }
  return col;
}

vec3 screenAt (vec2 p);
vec3 under (vec2 uv) {
  // under a clear plate (every look but Liquide) lies the screen itself, with the keys, the partitions
  // and the ink: nothing coloured belongs to the glass. Satin glass (D\xE9poli) softens the ink into glows.
  bool plate = glass > 0.5 && mode < 0.5 && abs(look.x - 1.0) > 0.5;
  sepLine = 0.0;
  vec3 s = plate ? marks(screenAt(uv * res), uv) : sceneAt(uv), i = inkAt(uv), c;
  if (glass > 0.5 && abs(look.x - 2.0) < 0.5) i = mix(i, hazeAt(uv) * 1.3, 0.9);
  if (style > 0.5 && style < 1.5) {
    // Aquarelle: the ink is a pigment in water; it colours the paper, and darkens where colours meet
    float dens = max(i.r, max(i.g, i.b));
    vec3 pig = pow(clamp(i / max(dens, 1e-3), 0.0, 1.0), vec3(1.7)) * 0.94 + 0.02;
    c = s * mix(vec3(1.0), pig, 1.0 - exp(-dens * 1.6));
  } else if (style > 1.5) {
    // Vitrail: the ink is a piece of coloured glass lit from behind; it keeps its own colour, brighter at heart
    float dens = max(i.r, max(i.g, i.b));
    vec3 lit = mix(clamp(i / max(dens, 1e-3), 0.0, 1.0), vec3(1.0), 0.12) * (0.92 + 0.25 * smoothstep(1.0, 3.0, dens)) * (hdr > 1.0 ? 1.0 + 0.3 * (hdr - 1.0) : 1.0);
    c = mix(s, lit, 1.0 - exp(-dens * 1.4));
  } else {
    // standard screens: screen blend (ink only adds light, never above white);
    // HDR: plain addition, the ink's bright cores go beyond white
    // (the HDR setting raises the ink's bright cores further above white)
    c = hdr > 1.0 ? s + i * (0.6 + 0.4 * hdr) : 1.0 - (1.0 - s) * (1.0 - clamp(i, 0.0, 1.0));
  }
  // under a clear plate the partitions between keys show faintly through the ink, so the keys' limits
  // can still be guessed wherever it goes (not through frosted glass)
  if (plate && sepLine > 0.5 && abs(look.x - 2.0) > 0.5) c = mix(c, mix(c * 0.8, sep.rgb, sep.a), 0.55);
  return c;
}

float sdRound (vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
vec2 clampLen (vec2 v, float m) { float l = length(v); return l > m ? v * (m / l) : v; }

// signed distance to a slab (px, negative inside)
float sdSlab (vec2 p, vec4 r) {
  vec2 a = r.xy * res, b = r.zw * res, hs = (b - a) * 0.5;
  return sdRound(p - (a + b) * 0.5, hs, min(radius, min(hs.x, hs.y)));
}
// the nearest slab: its distance, and what it holds (selRect, selFill, selMeter)
float nearest (vec2 p) {
  float sd = 1e5;
  for (int i = 0; i < 8; i++) {
    if (float(i) >= nSlabs) break;
    float s = sdSlab(p, slabs[i]);
    if (s < sd) { sd = s; selRect = slabs[i]; selFill = fills[i]; selMeter = meters[i]; }
  }
  return sd;
}
float nearestOnly (vec2 p) {
  float sd = 1e5;
  for (int i = 0; i < 8; i++) { if (float(i) >= nSlabs) break; sd = min(sd, sdSlab(p, slabs[i])); }
  return sd;
}
vec2 normalOut (vec2 p) {
  return normalize(vec2(sdSlab(p + vec2(1.0, 0.0), selRect) - sdSlab(p - vec2(1.0, 0.0), selRect),
                        sdSlab(p + vec2(0.0, 1.0), selRect) - sdSlab(p - vec2(0.0, 1.0), selRect)) + 1e-5);
}

// How much of the light leaving the glass at s (at the light's height) reaches p on the screen. A
// control standing in between hides it where the ray passes under its top: behind each control lies
// its shadow, long when the control is far from the light; the top edge is soft. Several points of the
// glowing edge are tested, so shadows get a natural penumbra (sharp near the control, soft farther).
// where the segment s + t\xB7d (t in 0..1) leaves a box, -1 if it misses it
float boxExit (vec2 s, vec2 inv, vec4 b) {
  vec2 t0 = (b.xy - s) * inv, t1 = (b.zw - s) * inv;
  vec2 tn = min(t0, t1), tf = max(t0, t1);
  float tin = max(max(tn.x, tn.y), 0.0), tout = min(min(tf.x, tf.y), 1.0);
  return tin < tout ? tout : -1.0;
}
float circleExit (vec2 s, vec2 d, vec2 c, float r) {
  vec2 f = s - c;
  float a = dot(d, d), b = dot(f, d), disc = b * b - a * (dot(f, f) - r * r);
  if (disc < 0.0) return -1.0;
  float q = sqrt(disc), t1 = (-b - q) / a, t2 = (-b + q) / a;
  return (t2 > 0.0 && t1 < 1.0) ? min(t2, 1.0) : -1.0;
}
float seen (vec2 s, vec2 p) {
  vec2 d = p - s;
  d = vec2(abs(d.x) < 1e-3 ? 1e-3 : d.x, abs(d.y) < 1e-3 ? 1e-3 : d.y);
  vec2 inv = 1.0 / d;
  float v = 1.0;
  for (int i = 0; i < 16; i++) {
    if (float(i) >= nObst) break;
    vec4 b = obst[i];
    if (boxExit(s, inv, b) < 0.0) continue;
    // the control's own rounded shape: two crossed boxes and four corner discs
    float r = min(obstR[i], 0.5 * min(b.z - b.x, b.w - b.y));
    float t = max(boxExit(s, inv, vec4(b.x, b.y + r, b.z, b.w - r)), boxExit(s, inv, vec4(b.x + r, b.y, b.z - r, b.w)));
    t = max(t, max(circleExit(s, d, b.xy + r, r), circleExit(s, d, b.zw - r, r)));
    t = max(t, max(circleExit(s, d, vec2(b.x + r, b.w - r), r), circleExit(s, d, vec2(b.z - r, b.y + r), r)));
    // the ray's height as it leaves the control, against the control's top. The penumbra is narrow
    // right behind the control and widens with the distance to it (the glowing ink is not a point)
    float w = 12.0 * dpr * (1.0 - t) + 0.35 * obstH.y + 1.5 * dpr;
    if (t >= 0.0) v *= smoothstep(-w, w, obstH.x * (1.0 - t) - obstH.y);
  }
  // shadows are never black: light bouncing off everything around fills them a little
  return 0.22 + 0.78 * v;
}
// near the foot of a control, less light reaches the screen from every side (contact shadow, wider
// for a taller control)
float aoAt (vec2 p) {
  float a = 1.0;
  for (int i = 0; i < 16; i++) {
    if (float(i) >= nObst) break;
    vec4 b = obst[i];
    vec2 hs = (b.zw - b.xy) * 0.5;
    float sd = sdRound(p - (b.xy + b.zw) * 0.5, hs, min(obstR[i], min(hs.x, hs.y)));
    a *= 1.0 - 0.6 * exp(-max(sd, 0.0) / (0.9 * obstH.y + 1.0));
  }
  return a;
}

// the light from where the ink shines (SOURCES_PASS): o = 1 lets the controls in the way cast their shadows
vec3 farLight (vec2 p, float o) {
  vec3 light = vec3(0.0);
  for (int k = 0; k < 4; k++) {
    vec4 Ls = texture2D(uSources, vec2((float(k) + 0.5) / 8.0, 0.5));
    if (Ls.z < 0.005) continue;
    vec3 Lc = texture2D(uSources, vec2((float(k) + 4.5) / 8.0, 0.5)).rgb;
    vec2 sp = Ls.xy * res;
    vec2 dv = p - sp;
    float dist = length(dv);
    vec2 side = vec2(-dv.y, dv.x) / max(dist, 1e-3) * 14.0 * dpr;
    float v = o > 0.5 ? 0.5 * (seen(sp + side, p) + seen(sp - side, p)) : 1.0;
    float rr = dist / (140.0 * dpr);
    light += Lc * Ls.z * spillK * 1.4 * v / (1.0 + rr * rr);
  }
  return light;
}
// The screen around the glass, like a table under a glass object: a shadow cast away from the lamp, a
// line where the glass touches; a line of room light focused by the rounded edge (a caustic); and the
// ink's light leaking out of the edge, fading smoothly to nothing with distance. Every slab adds its
// own light (no seams between the Mix's tubes). Under a clear plate the screen keeps only a little of
// that light, just inside the edge (the domed edge bends that band anyway): the ink is the brightest
// thing there and the keys' limits stay clear. The light is soft, so it is drawn at half the
// resolution (LIGHT_PASS) and only looked up here.
vec4 aroundLight (vec2 p) {
  float reach = 560.0 * dpr;
  float sdMin = nearestOnly(p);
  if (sdMin > reach) return vec4(0.0, 0.0, 0.0, 1.0);
  bool plate = sdMin < 0.0 && mode < 0.5 && abs(look.x - 1.0) > 0.5; // (a point under a clear plate)
  bool floats = abs(look.x - 4.0) < 0.5;                    // (Prisme floats above the screen)
  float lift = floats ? 1.0 + look.w : 1.0;
  vec3 L = normalize(vec3(lightDir, max(lightZ, 0.05)));
  vec2 ld = normalize(lightDir + 1e-5);
  float len = clamp(thickness * 0.3 * lift * length(L.xy) / max(L.z, 0.2), 3.0 * dpr, 22.0 * dpr * lift);
  float amb = darkTheme > 0.5 ? 0.22 : 0.85;
  vec3 light = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    if (float(i) >= nSlabs) break;
    vec4 R = slabs[i];
    float sd = sdSlab(p, R);
    if (sd > reach) continue;
    selRect = R; selFill = fills[i]; selMeter = meters[i];
    vec2 nOut = normalize(vec2(sdSlab(p + vec2(1.0, 0.0), R) - sdSlab(p - vec2(1.0, 0.0), R),
                               sdSlab(p + vec2(0.0, 1.0), R) - sdSlab(p - vec2(0.0, 1.0), R)) + 1e-5);
    vec2 tg = vec2(-nOut.y, nOut.x);
    float so = max(sd, 0.0);
    vec2 pe = p - nOut * min(sd, 0.0);                       // (under the plate: the edge above the point)
    vec2 q = pe - nOut * (so + 6.0 * dpr), uq = q / res;
    vec3 g0 = glowAt(uq);
    // the caustic, on the side away from the lamp
    float away = max(dot(nOut, -ld), 0.0);
    float cd = so - len * 0.55, cw = 2.0 * dpr + len * 0.25;
    float caustic = exp(-cd * cd / (cw * cw)) * away * away;
    if (caustic > 0.002 && !plate) {
      if (abs(look.x - 1.0) < 0.5) light += (amb * mix(vec3(1.0), sceneAt(uq) * 1.6, 0.6) + g0 * 0.8) * caustic * 0.5; // (Liquide: tinted by the glass)
      else light += (vec3(amb) + g0 * 0.4) * caustic * 0.3;
    }
    // near the edge, the ink's light pools on the screen where it leaks out (gathered along the edge,
    // wider with distance: no streaks)
    float spread = so * 0.9 + 4.0 * dpr;
    vec2 a1 = q + tg * spread, a2 = q - tg * spread, b1 = q + tg * spread * 0.45, b2 = q - tg * spread * 0.45, c1 = q - nOut * spread * 0.6;
    vec3 E = g0 * 0.2 + (glowAt(a1 / res) + glowAt(a2 / res)) * 0.15 + (glowAt(b1 / res) + glowAt(b2 / res)) * 0.2 + glowAt(c1 / res) * 0.1;
    float r = so / (34.0 * dpr);
    float leak = 1.0 / (1.0 + r * r);
    // a clear plate's rounded edge lets the light caught in the glass out: it pools at the glass's
    // foot, bright and narrow, in the colour of the ink near the edge (spread wider below a floating one)
    if (abs(look.x - 1.0) > 0.5 && !plate) leak += floats ? 0.55 * exp(-so / (12.0 * dpr)) : 0.8 * exp(-so / (5.0 * dpr));
    // under the plate: a thin band just inside the edge (frosted glass scatters it much further; under a
    // floating plate it spreads a little further in)
    float beneath = abs(look.x - 2.0) < 0.5 ? 0.65 * exp(min(sd, 0.0) / (24.0 * dpr)) : floats ? 0.3 * exp(min(sd, 0.0) / (18.0 * dpr)) : 0.25 * exp(min(sd, 0.0) / (8.0 * dpr));
    light += E * spillK * seen(q, pe) * leak * (plate ? beneath : 1.0);
  }
  if (plate) return vec4(light + farLight(p, 0.0) * (abs(look.x - 2.0) < 0.5 ? 0.08 + 0.5 * exp(sdMin / (24.0 * dpr)) : 0.4 * exp(sdMin / (12.0 * dpr))), 1.0);
  // farther, the light comes from where the ink shines right now (SOURCES_PASS, every frame, so the
  // shadows keep following the ink as it drifts): each control in the way casts its shadow away from it
  // (two points across each glow give the shadows soft sides)
  light += farLight(p, 1.0);
  light *= 1.0 - smoothstep(0.5 * reach, reach, sdMin);
  return vec4(light, aoAt(p));
}
// the light texture at p (four taps around the point: a smooth enlargement of the half-resolution
// light, no stair steps)
vec4 lightAt (vec2 p) {
  vec2 lu = (p + off) / canvasRes, lo = 0.5 * lightScale / canvasRes;
  return 0.25 * (texture2D(uLight, lu + vec2(lo.x, lo.y)) + texture2D(uLight, lu + vec2(-lo.x, lo.y)) + texture2D(uLight, lu + vec2(lo.x, -lo.y)) + texture2D(uLight, lu - lo));
}
// light theme looks: on a pale screen, light through coloured glass shows as colour, not as white
vec3 lightTint (vec3 light) {
  float lum = max(light.r, max(light.g, light.b));
  vec3 hue = light / max(lum, 1e-3);
  bool aq = style < 1.5;
  vec3 tint = aq ? pow(clamp(hue, 0.0, 1.0), vec3(1.2)) : mix(vec3(1.0), hue, 0.85);
  return mix(vec3(1.0), tint, (1.0 - exp(-lum * (aq ? 0.9 : 1.3))) * (aq ? 0.55 : 0.75));
}
// the screen the glass lies on, with the light that falls on it: what is seen around the plate and
// through it
vec3 screenAt (vec2 p) {
  vec4 Lt = lightAt(p);
  vec3 light = Lt.rgb * Lt.a;
  // Halloween: under the pad's glass lies the graveyard, lit by the ink
  if (stage.x > 0.5 && mode < 0.5 && p.x >= 0.0 && p.y >= 0.0 && p.x <= res.x && p.y <= res.y) return stageAt(p) + (1.0 - exp(-light)) * 0.8;
  if (style > 0.5) return appBg * min(lightTint(light), vec3(1.0));
  return appBg + (1.0 - exp(-light)) * (hdr > 1.0 ? 0.8 + 0.25 * hdr : 1.0);
}
vec4 table (vec2 p, float sdMin) {
  if (sdMin > 560.0 * dpr) return style > 0.5 ? vec4(0.0) : vec4(appBg, 1.0);
  vec3 L = normalize(vec3(lightDir, max(lightZ, 0.05)));
  vec2 ld = normalize(lightDir + 1e-5);
  float lift = abs(look.x - 4.0) < 0.5 ? 1.0 + look.w : 1.0; // (Prisme floats above the screen)
  float len = clamp(thickness * 0.3 * lift * length(L.xy) / max(L.z, 0.2), 3.0 * dpr, 22.0 * dpr * lift);
  float blur = 5.0 * dpr + len * 0.9;
  float shadow = sdMin < len + 3.0 * blur ? 1.0 - smoothstep(-blur, blur, nearestOnly(p + ld * len)) : 0.0;
  // the Liquide slab: a soft shadow, darker where it touches; a clear plate: a faint cast shadow and a
  // thin line where it touches the screen; Prisme, floating: a wider, softer shadow, and no line
  float alpha = abs(look.x - 1.0) < 0.5 ? clamp((shadow * 0.42 + exp(-sdMin / (2.5 * dpr)) * 0.3) * shadowK, 0.0, 0.85)
              : lift > 1.0 ? clamp(shadow * 0.24 * shadowK, 0.0, 0.6)
                           : clamp((shadow * 0.16 + exp(-sdMin / (1.2 * dpr)) * 0.35) * shadowK, 0.0, 0.6);
  vec4 Lt = lightAt(p);
  vec3 light = Lt.rgb * Lt.a;                               // (dimmer at the controls' feet)
  vec3 base = appBg * (1.0 - alpha);
  if (style > 0.5) {
    // light theme: the light is drawn as a filter over the page's own colour, transparent where nothing
    // changes (the page keeps its exact colour, even when this canvas runs in the HDR range)
    vec3 T = min((1.0 - alpha) * lightTint(light), vec3(1.0));
    float tmin = min(T.r, min(T.g, T.b));
    return vec4(appBg * (T - tmin), 1.0 - tmin);
  }
  // a light on a matte screen does not burn: it saturates softly (above white on HDR, more with the setting)
  light = (1.0 - exp(-light)) * (hdr > 1.0 ? 0.8 + 0.25 * hdr : 1.0);
  // the screen itself, shaded then lit (opaque: browsers do not add light through a transparent canvas)
  return vec4(base + light, 1.0);
}

// The room above the glass, as its polished surface reflects it (R: direction, z out of the screen).
// Neutral white light only: a dim ceiling, the lamp (a soft disc with a bright core), a window on the
// other side, and the walls, lit unevenly (windows, a wall in shadow...) and brighter towards the
// horizon: on the edge they make a soft, wide band that varies all around the glass, strongest on the
// lamp's side, never an even line. soft = 1: satin glass blurs it all. Below the horizon the glass
// reflects the screen around it (see main).
vec3 roomAt (vec3 R, vec3 L, vec2 ld, float k, float soft) {
  vec2 h = normalize(R.xy + 1e-5);
  float c = dot(h, ld), fr = max(c, 0.0), bk = max(-c, 0.0), az = atan(h.y, h.x);
  float base = darkTheme > 0.5 ? 0.16 + 0.22 * max(R.z, 0.0) : 0.62 + 0.3 * max(R.z, 0.0);
  float dl = max(dot(R, L), 0.0);
  float lamp = (pow(dl, mix(120.0, 24.0, soft)) * mix(4.0, 2.0, soft) + pow(dl, mix(1500.0, 160.0, soft)) * mix(30.0, 4.0, soft)) * k;
  vec3 W = normalize(vec3(-ld * 0.92, 0.38));
  float win = pow(max(dot(R, W), 0.0), mix(28.0, 10.0, soft)) * 2.0;
  float walls = (0.25 + 1.6 * fr * fr) * (1.0 - smoothstep(0.0, 0.7, R.z));
  float t = (R.z - 0.15) / mix(0.11, 0.25, soft);
  float uneven = 0.65 + 0.35 * (0.5 + 0.5 * sin(2.0 * az + 0.7)) * (0.6 + 0.4 * sin(5.0 * az + 2.3));
  float band = exp(-t * t) * (0.5 + 3.5 * fr * fr * fr * fr + 1.2 * bk * bk * bk * bk) * uneven * (1.0 - 0.5 * soft);
  return vec3(1.0, 0.985, 0.965) * (base + lamp + win + walls + band);
}
// Prisme's polished, rounded edge mirrors the same room without its band: a dim ceiling, walls that
// brighten smoothly towards the horizon (more on the lamp's side), the lamp (a bright disc in a wide
// soft halo) and the window across the room. Its curvature stretches them along the edge: a glossy
// line of the lamp on the side that faces it, a softer one of the window on the other side, both
// fading smoothly across the curve and towards their ends; the walls, a gentle gradient.
vec3 prismeRoom (vec3 R, vec3 L, vec2 ld, float k) {
  float fr = max(dot(normalize(R.xy + 1e-5), ld), 0.0);
  float base = darkTheme > 0.5 ? 0.18 + 0.2 * max(R.z, 0.0) : 0.66 + 0.25 * max(R.z, 0.0);
  float walls = (0.3 + 1.2 * fr * fr) * (1.0 - smoothstep(0.0, 0.85, R.z));
  float dl = max(dot(R, L), 0.0);
  float lamp = (pow(dl, 24.0) * 2.5 + pow(dl, 200.0) * 14.0) * k;
  vec3 W = normalize(vec3(-ld * 0.92, 0.38));
  float win = pow(max(dot(R, W), 0.0), 10.0) * 2.5;
  return vec3(1.0, 0.985, 0.965) * (base + walls + lamp + win);
}

#ifdef LIGHT_PASS
void main () { gl_FragColor = aroundLight(gl_FragCoord.xy * lightScale - off); }
#elif defined(SOURCES_PASS)
// where the ink shines now: the weighted centre of the glow in each quarter of the surface, its
// strength (texels 0..3) and its colour (texels 4..7)
void main () {
  float k = floor(gl_FragCoord.x), qd = mod(k, 4.0);
  vec2 r0 = vec2(mod(qd, 2.0), floor(qd / 2.0)) * 0.5;
  vec3 cs = vec3(0.0); vec2 ps = vec2(0.0); float ws = 0.0;
  for (int j = 0; j < 6; j++) for (int i = 0; i < 6; i++) {
    vec2 uv = r0 + (vec2(float(i), float(j)) + 0.5) / 12.0;
    vec3 g = glowAt(uv);
    float w = max(g.r, max(g.g, g.b));
    cs += g * w; ps += uv * w; ws += w;
  }
  vec3 c = cs / max(ws, 1e-4);
  gl_FragColor = k < 4.0 ? vec4(ps / max(ws, 1e-4), 1.0 - exp(-ws * 0.25), ws) : vec4(c / max(max(c.r, max(c.g, c.b)), 1e-4), 1.0);
}
#elif defined(HAZE_PASS)
// the ink's light averaged over each cell of a coarse grid (8\xD78 taps a cell)
void main () {
  vec2 c0 = floor(gl_FragCoord.xy);
  vec3 sum = vec3(0.0);
  for (int j = 0; j < 8; j++) for (int i = 0; i < 8; i++) sum += glowAt((c0 + (vec2(float(i), float(j)) + 0.5) / 8.0) / hazeRes);
  gl_FragColor = vec4(sum / 64.0, 1.0);
}
#else
// The glass slabs (R\xE9glages \u2192 Style du verre), after Apple's WWDC25 "Meet Liquid Glass" (lensing rather
// than blur, gel-like flex) and kube.io's refraction model (convex rounded profile, Snell's law with
// n = 1.5). Optique: a clear plate, colourless and almost invisible on its flat top, showing itself by
// its domed edge (refraction, Fresnel reflection of the room and of the screen around it, a faint
// contact shadow). D\xE9poli: the same plate in satin glass, the ink softened into glows. Cristal: a
// bevelled edge, a flat facet that shifts and splits what lies under it like cut glass. Prisme: Liquid
// Glass as iOS 26 draws it, a thick clear plate floating above the screen, its wide rounded edge (a
// squircle: its curvature grows from nothing where it leaves the flat top, so no crease shows there)
// folding what lies near it into the rim (a second, mirrored image that joins the first along the
// curves), split into rainbow fringes; the lamp's fine glossy line along the edge that faces it, a
// thin light line on the silhouette, a soft sheen, a soft shadow cast below. Liquide: the earlier glass, a thicker slab over the pad's own surface, lit by
// the ink and from within under the finger.
void main () {
  vec2 p = gl_FragCoord.xy - off;                           // surface px, y up
  vec2 uv = p / res;
  float sd = nearest(p), d = -sd;                           // d: distance inside the nearest slab, px
  if (glass < 0.5) {
    if (d < -0.5) { gl_FragColor = vec4(0.0); return; }
    float a0 = clamp(d + 0.5, 0.0, 1.0);
    gl_FragColor = vec4(under(uv) * a0, a0); return;
  }
  if (d < -0.5) { gl_FragColor = table(p, sd); return; }
  vec4 R = selRect;
  vec2 ra = R.xy * res, rb = R.zw * res, hs = (rb - ra) * 0.5;
  float bev = min(bevel, min(hs.x, hs.y) * 0.98), th = thickness * bev / bevel;
  vec2 nIn = -normalOut(p);                                 // towards the middle of the slab
  // the edge: rounded, between a circle and a squircle (exponent look.y; a narrow slab, like a Mix
  // channel, becomes a full tube), or a flat facet (Cristal) whose creases are softened over a pixel
  float x = clamp(d / bev, 0.0, 1.0), w = 1.0 - x, h, dh;
  if (look.y < 1.5) {
    h = x;
    dh = 1.0 - smoothstep(1.0 - 1.2 * dpr / bev, 1.0, x);
  } else {
    float wp = pow(w, look.y);
    h = pow(max(1.0 - wp, 0.0), 1.0 / look.y);
    dh = x < 1.0 ? pow(w, look.y - 1.0) * pow(max(1.0 - wp, 1e-4), 1.0 / look.y - 1.0) : 0.0;
  }
  vec2 grad = nIn * dh * th / bev;                          // slope of the glass (rises inwards)
  float H = th * h;
  // gel: each finger presses a soft bulge into the glass (a lens over what lies under it); the Liquide
  // glass also lights up from under the finger
  float glow = 0.0;
  for (int k = 0; k < 4; k++) {
    vec4 tk = touches[k];
    if (tk.w <= 0.001) continue;
    vec2 q = (p - tk.xy * res) / (38.0 * dpr);
    float b = gel * tk.w * exp(-dot(q, q)) * th * 1.2;
    H += b; grad -= 2.0 * q / (38.0 * dpr) * b;
    vec2 q2 = (p - tk.xy * res) / (60.0 + 800.0 * tk.z);
    glow += exp(-dot(q2, q2)) * tk.w * exp(-tk.z * 2.2);
  }
  vec3 N = normalize(vec3(-grad, 1.0));
  // Snell's law: a vertical ray bends entering the glass, blue a little more than red (look.z: how
  // much); a facet refracts as deep as the plate is thick (look.w). Prisme floats above the screen
  // (look.w thicknesses): even at its silhouette the light travels far once bent, so the rim shows
  // what lies further in, folded back on itself
  vec3 I = vec3(0.0, 0.0, -1.0);
  vec3 col;
  bool prisme = abs(look.x - 4.0) < 0.5;
  if (length(grad) > 1e-4) {
    vec3 Rr = refract(I, N, 1.0 / (1.5 - look.z)), Rg = refract(I, N, 1.0 / 1.5), Rb = refract(I, N, 1.0 / (1.5 + look.z));
    float mx = bev * (prisme ? 2.6 : 1.3), Hr = prisme ? H + th * look.w : H * look.w;
    vec2 orr = clampLen(Rr.xy / max(-Rr.z, 0.15) * Hr, mx) / res;
    vec2 org = clampLen(Rg.xy / max(-Rg.z, 0.15) * Hr, mx) / res;
    vec2 orb = clampLen(Rb.xy / max(-Rb.z, 0.15) * Hr, mx) / res;
    col = vec3(under(uv + orr).r, under(uv + org).g, under(uv + orb).b);
  } else col = under(uv);
  vec3 L = normalize(vec3(lightDir, max(lightZ, 0.05)));
  vec2 Ld2 = normalize(lightDir + 1e-5);
  float k = max(hdr, 1.0);
  vec2 qc = (p - (ra + rb) * 0.5) / max(hs.x, hs.y);
  if (abs(look.x - 1.0) < 0.5) {
    // Liquide, the earlier glass. Light caught in the glass runs inside it and leaves through the
    // rounded edge: a soft glow under the surface where ink is near, from the blurred ink, beneath the
    // reflections; a little of it is scattered around the ink, like a clear block lit from within
    float lean = length(N.xy);
    if (style < 0.5 || style > 1.5) {
      if (d < bev) col += hazeAt(uv + nIn * bev * 0.5 / res) * lean * lean * 0.9;
      col += hazeAt(uv) * 0.22;
    }
    col += mix(vec3(1.0), mode > 0.5 ? selFill.rgb : accent, 0.35) * glow * 0.14 * max(k * 0.8, 1.0); // illuminated from within
    // the polished surface reflects the room (Fresnel): the rim shines along the silhouette and fades
    // inwards, brightest on the lamp's side; white light over what the glass shows
    float F = 0.04 + 0.96 * pow(1.0 - clamp(N.z, 0.0, 1.0), 5.0);
    float c = lean > 1e-4 ? dot(N.xy / lean, Ld2) * smoothstep(0.0, 0.2, lean) : 0.0;
    float front = max(c, 0.0), back = max(-c, 0.0);
    float e = 2.0 * N.z * N.z - 1.0;                        // height of the reflected ray (1: the ceiling)
    float walls = 0.12 + 5.0 * front * front * front + 1.6 * back * back * back * back;
    float room = mix(walls, darkTheme > 0.5 ? 0.45 : 1.0, smoothstep(0.0, 0.8, e));
    room *= mix(0.35, 1.0, smoothstep(-0.95, -0.7, e));    // the very silhouette sees the dark screen: no outline
    // the lamp's glint, a short line along the rim on its side; the lamp's light coming out through the
    // opposite edge
    float eg = (e + 0.3 - 0.6 * (L.z - 0.55)) / 0.16;
    float glint = exp(-eg * eg) * pow(front, 8.0) * 0.55;
    float xb = (x - 0.14) / 0.12;
    float through = exp(-xb * xb) * back * back * back * back * 0.2;
    float sb = (dot(qc + slide, Ld2) - 0.5) / 0.24;
    float win = exp(-sb * sb) * (darkTheme > 0.5 ? 0.035 : 0.07);
    vec3 prism = mix(vec3(1.0), 0.5 + 0.5 * cos(6.2832 * (x * 5.0 + vec3(0.0, 0.33, 0.67))), 0.3 * min(glint * 3.0, 1.0));
    col = col * (1.0 - F) + vec3(1.0, 0.985, 0.96) * ((F * room + through) * mix(1.0, k, 0.25) + glint * prism * k) + win;
  } else {
    // The clear plates have no colour: they let the background through (about 96 % on the flat top)
    // and reflect what is around them (Fresnel; lead crystal a little more). Looking down on the edge,
    // the reflected ray sweeps from the room above (the lamp, a window, the walls) down to the screen
    // around the plate, whose light, and colours when the ink lights it, the outer edge picks up.
    float soft = abs(look.x - 2.0) < 0.5 ? 1.0 : abs(look.x - 3.0) < 0.5 ? 0.35 : 0.0;
    float lean = length(N.xy);
    vec3 Rf = vec3(2.0 * N.z * N.xy, 2.0 * N.z * N.z - 1.0);
    float F0 = abs(look.x - 3.0) < 0.5 ? 0.05 : 0.035;
    float F = F0 + (1.0 - F0) * pow(1.0 - clamp(N.z, 0.0, 1.0), 5.0);
    vec3 env = prisme ? prismeRoom(Rf, L, Ld2, k) : roomAt(Rf, L, Ld2, k, soft);
    if (Rf.z < 0.08) {
      vec2 dir = lean > 1e-4 ? N.xy / lean : -nIn;
      vec3 below = screenAt(p + dir * min(H * length(Rf.xy) / max(-Rf.z, 0.08), 60.0 * dpr));
      vec3 hz = vec3(normalize(Rf.xy + 1e-5), 0.0);
      vec3 horizon = prisme ? prismeRoom(hz, L, Ld2, k) : roomAt(hz, L, Ld2, k, soft);
      env = mix(mix(below, horizon, 0.5), env, smoothstep(-0.08, 0.08, Rf.z));
    }
    if (style < 0.5 || style > 1.5) {
      // light leaks: the ink's light caught in the glass escapes through the rounded edge, which
      // glows softly where the ink is near (in its colour, no detail)
      if (d < bev) col += hazeAt(uv + nIn * bev * 0.4 / res) * lean * lean * (soft > 0.5 ? 0.55 : 0.75);
      // frosted glass: it scatters the light around it and blurs what it shows into a milky glow,
      // tinted by that light
      if (soft > 0.5) {
        vec3 lt = lightAt(p).rgb;
        float lum = max(lt.r, max(lt.g, lt.b));
        col = mix(col, vec3(dot(col, vec3(0.3, 0.59, 0.11))), 0.2) + mix(vec3(1.0), lt / max(lum, 1e-3), 0.55) * ((darkTheme > 0.5 ? 0.05 : 0.0) + 0.3 * (1.0 - exp(-lum)));
      }
    } else if (soft > 0.5) col = mix(col, vec3(1.0), 0.1);   // (frosted glass on a pale page: a white veil)
    // the room reflected in the polished top: a very soft band of light that slides as the phone tilts
    float sb = (dot(qc + slide, Ld2) - 0.5) / 0.3;
    float win = exp(-sb * sb) * (darkTheme > 0.5 ? 0.018 : 0.04);
    // (lead crystal sparkles: its facets throw back more of the room)
    col = col * (1.0 - F) + F * env * (abs(look.x - 3.0) < 0.5 ? 2.2 : 1.0) + win;
    // Prisme: the rounded edge gathers the room's light towards its silhouette, a soft gradient that
    // follows the curve (brighter on the lamp's side), and the lamp spreads a soft sheen where it faces it
    if (prisme) {
      float fz = lean > 1e-4 ? max(dot(N.xy / lean, Ld2), 0.0) : 0.0;
      col += vec3(1.0, 0.985, 0.965) * (lean * lean * (darkTheme > 0.5 ? 0.12 : 0.14) * (0.45 + 1.1 * fz * fz) * mix(1.0, k, 0.25)
                                       + pow(max(dot(Rf, L), 0.0), 6.0) * 0.06 * k * smoothstep(0.0, 0.3, lean));
    }
  }
  float al = clamp(d + 0.5, 0.0, 1.0);                      // smooth silhouette, over its own shadow
  vec4 o = vec4(col * al, al);
  if (al < 1.0) o += table(p, max(sd, 0.01)) * (1.0 - al);
  gl_FragColor = o;
}
#endif`,Rr=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; uniform sampler2D uTexture; uniform vec3 curve; uniform float threshold;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
  float br = max(c.r, max(c.g, c.b));
  float rq = clamp(br - curve.x, 0.0, curve.y);
  rq = curve.z * rq * rq;
  c *= max(rq, br - threshold) / max(br, 0.0001);
  gl_FragColor = vec4(c, 0.0);
}`,Er=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25;
}`,Ar=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture; uniform float intensity;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25 * intensity;
}`,Dr=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uTexture;
void main () {
  vec4 c = texture2D(uTexture, vUv);
  float br = max(c.r, max(c.g, c.b));
  c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
  gl_FragColor = c;
}`,Pr=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uTexture; uniform float weight;
#define ITERATIONS 16
void main () {
  float Density = 0.3; float Decay = 0.95; float Exposure = 0.7;
  vec2 coord = vUv; vec2 dir = vUv - 0.5;
  dir *= 1.0 / float(ITERATIONS) * Density;
  float illuminationDecay = 1.0;
  float color = texture2D(uTexture, vUv).a;
  for (int i = 0; i < ITERATIONS; i++) {
    coord -= dir;
    color += texture2D(uTexture, coord).a * illuminationDecay * weight;
    illuminationDecay *= Decay;
  }
  gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
}`,qr=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uTarget; uniform sampler2D uMask; uniform float targetId;
uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  if (targetId > 0.0 && abs(texture2D(uMask, vUv).r - targetId) > 0.001) splat = vec3(0.0);
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}`,Cr=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform sampler2D uMask;
uniform vec2 texelSize; uniform vec2 dyeTexelSize; uniform float dt; uniform float dissipation;
vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st); vec2 fuv = fract(st);
  vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
void main () {
#ifdef MANUAL_FILTERING
  vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
  vec4 result = bilerp(uSource, coord, dyeTexelSize);
#else
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  vec4 result = texture2D(uSource, coord);
#endif
  float id = texture2D(uMask, vUv).r;
  if (id < 0.001 || abs(texture2D(uMask, coord).r - id) > 0.001) result = vec4(0.0);
  float decay = 1.0 + dissipation * dt;
  gl_FragColor = result / decay;
}`,Or=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
uniform sampler2D uVelocity; uniform sampler2D uMask;
bool wall (vec2 uv, float id) { return abs(texture2D(uMask, uv).r - id) > 0.001; }
void main () {
  float id = texture2D(uMask, vUv).r;
  float L = texture2D(uVelocity, vL).x; float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y; float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0 || wall(vL, id)) { L = -C.x; } if (vR.x > 1.0 || wall(vR, id)) { R = -C.x; }
  if (vT.y > 1.0 || wall(vT, id)) { T = -C.y; } if (vB.y < 0.0 || wall(vB, id)) { B = -C.y; }
  gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,_r=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,Ir=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
void main () {
  float L = texture2D(uCurl, vL).x; float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x; float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture2D(uVelocity, vUv).xy + force * dt;
  velocity = min(max(velocity, -1000.0), 1000.0);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`,Br=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
uniform sampler2D uPressure; uniform sampler2D uDivergence; uniform sampler2D uMask;
bool wall (vec2 uv, float id) { return abs(texture2D(uMask, uv).r - id) > 0.001; }
void main () {
  float id = texture2D(uMask, vUv).r;
  float C = texture2D(uPressure, vUv).x;
  float L = wall(vL, id) ? C : texture2D(uPressure, vL).x; float R = wall(vR, id) ? C : texture2D(uPressure, vR).x;
  float T = wall(vT, id) ? C : texture2D(uPressure, vT).x; float B = wall(vB, id) ? C : texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}`,Fr=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
uniform sampler2D uPressure; uniform sampler2D uVelocity; uniform sampler2D uMask;
bool wall (vec2 uv, float id) { return abs(texture2D(uMask, uv).r - id) > 0.001; }
void main () {
  float id = texture2D(uMask, vUv).r;
  float C = texture2D(uPressure, vUv).x;
  float L = wall(vL, id) ? C : texture2D(uPressure, vL).x; float R = wall(vR, id) ? C : texture2D(uPressure, vR).x;
  float T = wall(vT, id) ? C : texture2D(uPressure, vT).x; float B = wall(vB, id) ? C : texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  if (id < 0.001) velocity = vec2(0.0);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`,Ca={optique:{id:0,bevel:20,thick:26,p:2.2,disp:.012,depth:1},liquide:{id:1,bevel:30,thick:34,p:2.6,disp:.03,depth:1},depoli:{id:2,bevel:26,thick:26,p:2,disp:.008,depth:1},cristal:{id:3,bevel:20,thick:12,p:1,disp:.045,depth:3},prisme:{id:4,bevel:34,thick:28,p:3.2,disp:.015,depth:.9}},js=o=>Ca[o&&o.glassLook||"optique"]||Ca.optique,Ei={SIM_RESOLUTION:128,DYE_RESOLUTION:512,DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,PRESSURE:.8,PRESSURE_ITERATIONS:16,CURL:24,SPLAT_RADIUS:.22,SPLAT_FORCE:5200,SHADING:!0,BLOOM:!0,BLOOM_ITERATIONS:7,BLOOM_RESOLUTION:192,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:128,SUNRAYS_WEIGHT:.8,IDLE_MS:4500},Xt=class{constructor(e={}){this.cfg={...Ei,...e},this.canvas=document.createElement("canvas"),this.canvas.className="fluid",this.canvas.setAttribute("aria-hidden","true"),this.ok=!1,this.raf=0,this.last=0,this.lastInput=0,this.queue=[],this.gain=1,this.boost=0,this.slow=0,this.ema=16,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.ok=!1,this.stop()}),this.canvas.addEventListener("webglcontextrestored",()=>this.init()),this.init()}init(){let e={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!0,powerPreference:"low-power"},t=this.canvas.getContext("webgl2",e),s=!!t;if(t||(t=this.canvas.getContext("webgl",e)),!t)return;this.gl=t;try{"drawingBufferColorSpace"in t&&(t.drawingBufferColorSpace="display-p3")}catch{}this.p3=t.drawingBufferColorSpace==="display-p3";let i,a;if(s)t.getExtension("EXT_color_buffer_float"),a=!0;else if(i=t.getExtension("OES_texture_half_float"),a=t.getExtension("OES_texture_half_float_linear"),!i)return;let r=s?t.HALF_FLOAT:i.HALF_FLOAT_OES,n=(v,p)=>this.supports(v,p,r)?{internal:v,format:p}:null,l,c,d;if(s?(l=n(t.RGBA16F,t.RGBA),c=n(t.RG16F,t.RG)||l,d=n(t.R16F,t.RED)||c):l=c=d=n(t.RGBA,t.RGBA),!l)return;this.ext={type:r,rgba:l,rg:c,r:d,linear:!!a},a||(this.cfg.SHADING=!1,this.cfg.BLOOM=!1,this.cfg.SUNRAYS=!1);let h=(v,p,m)=>this.program(v,p,m);this.p={blur:h(Sr,Tr),copy:h(qe,Mr),clear:h(qe,Lr),bloomPre:h(qe,Rr),bloomBlur:h(qe,Er),bloomFinal:h(qe,Ar),sunMask:h(qe,Dr),sun:h(qe,Pr),splat:h(qe,qr),advect:h(qe,Cr,a?[]:["MANUAL_FILTERING"]),div:h(qe,Or),curl:h(qe,_r),vort:h(qe,Ir),pressure:h(qe,Br),grad:h(qe,Fr)},this.setDisplay(),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),this.dither=this.noiseTexture(64),this.keys=null,this.scene=null,this.keyTex=null,this.resetLight(),this.maskAll=this.maskTexture(null,1,1),this.maskSim=this.maskDye=this.maskAll,this.dye=null,this.velocity=null,this.ok=!0}supports(e,t,s){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texImage2D(i.TEXTURE_2D,0,e,4,4,0,t,s,null);let r=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,r),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,a,0);let n=i.checkFramebufferStatus(i.FRAMEBUFFER)===i.FRAMEBUFFER_COMPLETE;return i.deleteFramebuffer(r),i.deleteTexture(a),n}shader(e,t,s){let i=this.gl,a=i.createShader(e);if(i.shaderSource(a,(s||[]).map(r=>`#define ${r}
`).join("")+t),i.compileShader(a),!i.getShaderParameter(a,i.COMPILE_STATUS)){let r=i.getShaderInfoLog(a);console.warn(r),(this.shaderErrors||(this.shaderErrors=[])).push(r)}return a}program(e,t,s){let i=this.gl,a=i.createProgram();i.attachShader(a,this.shader(i.VERTEX_SHADER,e)),i.attachShader(a,this.shader(i.FRAGMENT_SHADER,t,s)),i.bindAttribLocation(a,0,"aPosition"),i.linkProgram(a),i.getProgramParameter(a,i.LINK_STATUS)||console.warn(i.getProgramInfoLog(a));let r={},n=i.getProgramParameter(a,i.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let c=i.getActiveUniform(a,l).name;r[c]=i.getUniformLocation(a,c)}return{p:a,u:r,bind:()=>i.useProgram(a)}}setDisplay(){let e=[];this.cfg.SHADING&&e.push("SHADING"),this.cfg.BLOOM&&e.push("BLOOM"),this.cfg.SUNRAYS&&e.push("SUNRAYS"),this.p.display=this.program(qe,Hs,e),this.p.light=this.program(qe,Hs,[...e,"LIGHT_PASS"]),this.p.sources=this.program(qe,Hs,[...e,"SOURCES_PASS"]),this.p.haze=this.program(qe,Hs,[...e,"HAZE_PASS"])}noiseTexture(e){let t=this.gl,s=new Uint8Array(e*e*3),i=1234567;for(let r=0;r<s.length;r++)i=i*1103515245+12345&2147483647,s[r]=i>>23;let a=t.createTexture();return t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGB,e,e,0,t.RGB,t.UNSIGNED_BYTE,s),{width:e,height:e,attach:r=>(t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,a),r)}}maskTexture(e,t,s){let i=this.gl,a=ds(this.maskCanvas||(this.maskCanvas=document.createElement("canvas")),e,t,s),r=i.createTexture();return i.bindTexture(i.TEXTURE_2D,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!0),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,a),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),{tex:r,attach:n=>(i.activeTexture(i.TEXTURE0+n),i.bindTexture(i.TEXTURE_2D,r),n)}}setKeys(e,t){!this.ok||t===this.keySig||(this.keySig=t,this.keys=e,this.rebuildMasks(),this.clear())}rebuildMasks(){let e=this.gl;for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&e.deleteTexture(t.tex);if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}this.maskSim=this.maskTexture(this.keys,this.velocity.width,this.velocity.height),this.maskDye=this.maskTexture(this.keys,this.dye.width,this.dye.height)}setScene(e){if(!this.ok)return;let t=this.scene&&this.scene.sig===e.sig;this.scene=e,this.margin=e.glass?this.marginTest||4e3:0,t||(this.keyTexSig=null,this.requestRender())}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,s=this.hostH,i=e.sig+"|"+t+"x"+s;if(this.keyTexSig===i)return;let a=this.gl;this.keyTex&&a.deleteTexture(this.keyTex.tex);let r=Os(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,s),n=a.createTexture();a.bindTexture(a.TEXTURE_2D,n),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,r),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),this.keyTex={tex:n,attach:l=>(a.activeTexture(a.TEXTURE0+l),a.bindTexture(a.TEXTURE_2D,n),l)},this.keyTexSig=i}resetLight(){this.lightBase=Kt.slice(),this.light=Kt.slice(),this.lightTo=Kt.slice(),this.slide=[0,0],this.slideTo=[0,0],this.up=null,this.touchSlots=[],this.gelOn=!0,this.meters=new Float32Array(8),this.margin=0,this.off=[0,0],this.dpr=1,this.hostW=0,this.hostH=0,this.srcFbo=null,this.lightFbo=null,this.hazeFbo=null,this.keyLitTex=null}setLight(e,t){let s=this.lightBase;this.lightTo=[s[0]*.75+(e-.5)*.45,s[1]*.75+(.5-t)*.45,s[2]]}setTilt(e,t){let s=Li(t,e),i=this.up;this.up=i?i.map((a,r)=>a+(s[r]-a)*.25):s,this.lightBase=Ri(this.up),this.slideTo=qa(this.up),this.lightTo=this.lightBase.slice(),(!i||Math.abs(i[0]-this.up[0])+Math.abs(i[1]-this.up[1])+Math.abs(i[2]-this.up[2])>.002)&&this.wake()}aim(e){this.lightTo=e.slice(),this.wake()}aimReset(){this.lightTo=this.lightBase.slice(),this.wake()}resetTilt(){this.up=null,this.lightBase=Kt.slice(),this.lightTo=Kt.slice(),this.slideTo=[0,0],this.wake()}screenColor(e){if(e=e||[.043,.047,.063],!this.p3)return e;let t=e.map(i=>i<=.04045?i/12.92:((i+.055)/1.055)**2.4);return[.8225*t[0]+.1774*t[1],.0332*t[0]+.9669*t[1],.0171*t[0]+.0724*t[1]+.9108*t[2]].map(i=>i<=.0031308?i*12.92:1.055*i**(1/2.4)-.055)}stepLight(){for(let e=0;e<3;e++)this.light[e]+=(this.lightTo[e]-this.light[e])*.12;for(let e=0;e<2;e++)this.slide[e]+=(this.slideTo[e]-this.slide[e])*.12}setObstacles(e){this.obstacles=(e||[]).slice(0,16),this.wake()}setControlHeight(e){this.ctrlH=e,this.wake()}obstacleData(e){let t=this.dpr||1,s=this.hostH,i=new Float32Array(64),a=new Float32Array(16),r=this.obstacles||[];return r.forEach((n,l)=>{i.set(e?[n[0]*t,s-n[3]*t,n[2]*t,s-n[1]*t]:[n[0]*t,n[1]*t,n[2]*t,n[3]*t],l*4),a[l]=(n[4]||0)*t}),{rects:i,radii:a,n:r.length,lightH:zs*t,ctrlH:(this.ctrlH||Us)*t}}setKeyLights(e){let t=this.keyLit||(this.keyLit=new Uint8Array(256)),s=!1;for(let i=0;i<64;i++){let a=Math.round(Math.max(0,Math.min(1,e&&e[i]||0))*255);t[i*4]!==a&&(t[i*4]=a,s=!0)}s&&(this.keyLitDirty=!0,this.wake())}ensureKeyLit(){let e=this.gl;if(this.keyLit||(this.keyLit=new Uint8Array(256)),!this.keyLitTex){let t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);for(let[s,i]of[[e.TEXTURE_MIN_FILTER,e.NEAREST],[e.TEXTURE_MAG_FILTER,e.NEAREST],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,s,i);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,64,1,0,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitTex={tex:t,attach:s=>(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,t),s)},this.keyLitDirty=!1}this.keyLitDirty&&(e.bindTexture(e.TEXTURE_2D,this.keyLitTex.tex),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,1,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitDirty=!1)}setMeters(e){for(let t=0;t<8;t++)this.meters[t]=e[t]||0;this.wake()}slabData(e){let t=this.scene||{},s=(t.slabs||[[0,0,1,1]]).slice(0,8),i=new Float32Array(32),a=new Float32Array(32);return s.forEach((r,n)=>i.set(e?[r[0],1-r[3],r[2],1-r[1]]:r,n*4)),(t.fills||[]).slice(0,8).forEach((r,n)=>a.set(r,n*4)),{slabs:i,fills:a,n:s.length}}press(e,t,s,i){let a=performance.now(),r=this.touchSlots.find(n=>n.id===e&&!n.up);i==="down"?(this.touchSlots=this.touchSlots.filter(n=>!n.up||a-n.up<450).slice(-3),this.touchSlots.push({id:e,x:t,y:s,down:a,up:0}),js(this.scene).id===1&&this.setLight(t,s)):r&&(r.x=t,r.y=s,(i==="up"||i==="cancel")&&(r.up=a,this.lightTo=this.lightBase.slice())),this.wake()}touchUniforms(e){let t=performance.now(),s=new Float32Array(16);return this.touchSlots=this.touchSlots.filter(i=>!i.up||t-i.up<450),this.touchSlots.slice(-4).forEach((i,a)=>{let r=i.up?Math.max(0,1-(t-i.up)/450):Math.min(1,(t-i.down)/90);s.set([i.x,e?1-i.y:i.y,(t-i.down)/1e3,r],a*4)}),s}keyAt(e,t){if(!this.keys)return 0;for(let s=this.keys.length-1;s>=0;s--){let i=this.keys[s];if(e>=i.x0&&e<i.x1&&t>=i.y0&&t<i.y1)return s+1}return 0}fbo(e,t,s,i){let a=this.gl;a.activeTexture(a.TEXTURE0);let r=a.createTexture();a.bindTexture(a.TEXTURE_2D,r),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,i),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,i),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texImage2D(a.TEXTURE_2D,0,s.internal,e,t,0,s.format,this.ext.type,null);let n=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,n),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,r,0),a.viewport(0,0,e,t),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),{texture:r,fbo:n,width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,attach:l=>(a.activeTexture(a.TEXTURE0+l),a.bindTexture(a.TEXTURE_2D,r),l)}}double(e,t,s,i){let a=this.fbo(e,t,s,i),r=this.fbo(e,t,s,i);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return a},set read(n){a=n},get write(){return r},set write(n){r=n},swap(){let n=a;a=r,r=n}}}resizeDouble(e,t,s,i,a){if(e.width===t&&e.height===s)return e;let r=this.fbo(t,s,i,a);return this.p.copy.bind(),this.gl.uniform1i(this.p.copy.u.uTexture,e.read.attach(0)),this.blit(r),e.read=r,e.write=this.fbo(t,s,i,a),e.width=t,e.height=s,e.texelSizeX=1/t,e.texelSizeY=1/s,e}res(e){let t=this.hostW/this.hostH;t<1&&(t=1/t);let s=Math.round(e),i=Math.round(e*t);return this.hostW>this.hostH?{width:i,height:s}:{width:s,height:i}}initBuffers(){let e=this.gl,t=this.ext,s=this.cfg,i=this.res(s.SIM_RESOLUTION),a=this.res(s.DYE_RESOLUTION),r=t.linear?e.LINEAR:e.NEAREST;e.disable(e.BLEND),this.dye=this.dye?this.resizeDouble(this.dye,a.width,a.height,t.rgba,r):this.double(a.width,a.height,t.rgba,r),this.velocity=this.velocity?this.resizeDouble(this.velocity,i.width,i.height,t.rg,r):this.double(i.width,i.height,t.rg,r),this.divergence=this.fbo(i.width,i.height,t.r,e.NEAREST),this.curl=this.fbo(i.width,i.height,t.r,e.NEAREST),this.pressure=this.double(i.width,i.height,t.r,e.NEAREST);let n=this.res(s.BLOOM_RESOLUTION);this.bloom=this.fbo(n.width,n.height,t.rgba,r),this.bloomFbos=[];for(let c=0;c<s.BLOOM_ITERATIONS;c++){let d=n.width>>c+1,h=n.height>>c+1;if(d<2||h<2)break;this.bloomFbos.push(this.fbo(d,h,t.rgba,r))}let l=this.res(s.SUNRAYS_RESOLUTION);this.sunrays=this.fbo(l.width,l.height,t.r,r),this.sunraysTemp=this.fbo(l.width,l.height,t.r,r),this.rebuildMasks()}blit(e){let t=this.gl;e?(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)):(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}attach(e){this.ok&&(this.host!==e&&(this.host=e,this.hostW=0,this.ro&&this.ro.disconnect(),this.ro=null),this.canvas.parentNode!==e&&e.insertBefore(this.canvas,e.firstChild),this.ro||(this.ro=new ResizeObserver(()=>this.requestRender()),this.ro.observe(e)),this.requestRender())}detach(){this.stop(),this.canvas.remove(),this.ro&&this.ro.disconnect(),this.ro=null,this.host=null}fit(){let e=this.host;if(!e)return;let t=Math.min(window.devicePixelRatio||1,2),s=e.getBoundingClientRect(),i=(e.closest(".app")||document.documentElement).getBoundingClientRect(),a=this.margin||0,r=x=>Math.round(Math.max(0,Math.min(a,x))),n=r(s.left-i.left),l=r(s.top-i.top),c=r(i.right-s.right),d=r(i.bottom-s.bottom),h=s.width+n+c,v=s.height+l+d,p=`${n},${l},${h},${v}`;p!==this.placeKey&&(this.placeKey=p,Object.assign(this.canvas.style,{left:-n+"px",top:-l+"px",width:h+"px",height:v+"px"}));let m=Math.max(2,Math.round(h*t)),f=Math.max(2,Math.round(v*t));(this.canvas.width!==m||this.canvas.height!==f)&&(this.canvas.width=m,this.canvas.height=f),this.dpr=t,this.off=[Math.round(n*t),Math.round(l*t)];let b=Math.max(2,Math.round(s.width*t)),y=Math.max(2,Math.round(s.height*t));(this.hostW!==b||this.hostH!==y||!this.dye)&&(this.hostW=b,this.hostH=y,this.initBuffers())}get aspect(){return this.hostW/this.hostH}splat(e,t,s,i,a,r=1,n=!1){this.ok&&(this.queue.push([e,t,s,i,a,r,n]),this.queue.length>64&&this.queue.shift(),this.wake())}burst(e,t,s,i=1,a=6,r=.8){let n=Math.random()*Math.PI*2;for(let l=0;l<a;l++){let c=n+l/a*Math.PI*2;this.splat(e+Math.cos(c)*.012,t+Math.sin(c)*.012,Math.cos(c)*.05*i,Math.sin(c)*.05*i,l===0?s:Ur(s,.35),r)}}pulse(e){this.boost=Math.max(this.boost,e)}push(e,t,s,i,a=3){this.splat(e,t,s,i,{r:0,g:0,b:0},a,!0)}setStyle(e){let t=this.cfg,s={b:t.BLOOM,s:t.SUNRAYS};Object.assign(t,e),t.BLOOM=s.b,t.SUNRAYS=s.s}wake(){this.lastInput=performance.now(),!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}keepAwake(){!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}stop(){this.raf&&cancelAnimationFrame(this.raf),this.raf=0}clear(){if(!this.ok||!this.dye)return;let e=this.gl;e.clearColor(0,0,0,0);for(let t of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.bloom,this.sunrays])e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.viewport(0,0,t.width,t.height),e.clear(e.COLOR_BUFFER_BIT);this.requestRender()}requestRender(){this.raf||this.pending||!this.ok||!this.canvas.isConnected||(this.pending=requestAnimationFrame(()=>{this.pending=0,!(this.raf||!this.canvas.isConnected)&&(this.fit(),this.render(!0))}))}frame(e){if(this.raf=0,!this.ok||!this.canvas.isConnected)return;let t=Math.min((e-this.last)/1e3,1/60);this.last=e,this.lastFrameAt&&e-this.lastInput<1500&&(this.ema+=(Math.min(200,e-this.lastFrameAt)-this.ema)*.1,this.slow=this.ema>45?this.slow+1:0),this.lastFrameAt=e,this.slow>60&&this.degrade(),this.fit();let s=e-this.lastInput<this.cfg.IDLE_MS;s?(this.rested=!1,this.inkOn!==!1?(this.applyInputs(),this.step(t),this.render()):(this.queue=[],this.render(!0))):this.stage&&(this.rested||(this.clear(),this.rested=!0),(this.restTick=(this.restTick||0)+1)%2===0&&this.render(!0)),this.boost*=.9,s||this.stage?this.raf=requestAnimationFrame(i=>this.frame(i)):this.clear()}degrade(){this.slow=0;let e=this.cfg;if(e.SUNRAYS)e.SUNRAYS=!1;else if(e.BLOOM)e.BLOOM=!1;else if(e.SIM_RESOLUTION>64)e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.dye=null,this.velocity=null,this.hostW=0;else return;this.setDisplay()}applyInputs(){let e=this.queue;this.queue=[];for(let[t,s,i,a,r,n,l]of e)this.splatNow(t,1-s,i*this.cfg.SPLAT_FORCE*Nr(this.aspect),-a*this.cfg.SPLAT_FORCE*zr(this.aspect),r,n,l?0:this.keyAt(t,s))}splatNow(e,t,s,i,a,r,n){let l=this.gl,c=this.p.splat,d=this.cfg.SPLAT_RADIUS*r/100;this.aspect>1&&(d*=this.aspect),c.bind(),l.uniform1i(c.u.uTarget,this.velocity.read.attach(0)),l.uniform1f(c.u.aspectRatio,this.aspect),l.uniform2f(c.u.point,e,t),l.uniform3f(c.u.color,s,i,0),l.uniform1f(c.u.radius,d),l.uniform1f(c.u.targetId,n?n/255:0),l.uniform1i(c.u.uMask,this.maskSim.attach(1)),this.blit(this.velocity.write),this.velocity.swap(),l.uniform1i(c.u.uMask,this.maskDye.attach(1)),l.uniform1i(c.u.uTarget,this.dye.read.attach(0)),l.uniform3f(c.u.color,a.r*this.gain,a.g*this.gain,a.b*this.gain),this.blit(this.dye.write),this.dye.swap()}step(e){let t=this.gl,s=this.p,i=this.velocity,a=this.cfg;t.disable(t.BLEND),s.curl.bind(),t.uniform2f(s.curl.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.curl.u.uVelocity,i.read.attach(0)),this.blit(this.curl),s.vort.bind(),t.uniform2f(s.vort.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.vort.u.uVelocity,i.read.attach(0)),t.uniform1i(s.vort.u.uCurl,this.curl.attach(1)),t.uniform1f(s.vort.u.curl,a.CURL),t.uniform1f(s.vort.u.dt,e),this.blit(i.write),i.swap(),s.div.bind(),t.uniform2f(s.div.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.div.u.uVelocity,i.read.attach(0)),t.uniform1i(s.div.u.uMask,this.maskSim.attach(2)),this.blit(this.divergence),s.clear.bind(),t.uniform1i(s.clear.u.uTexture,this.pressure.read.attach(0)),t.uniform1f(s.clear.u.value,a.PRESSURE),this.blit(this.pressure.write),this.pressure.swap(),s.pressure.bind(),t.uniform2f(s.pressure.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.pressure.u.uDivergence,this.divergence.attach(0)),t.uniform1i(s.pressure.u.uMask,this.maskSim.attach(2));for(let n=0;n<a.PRESSURE_ITERATIONS;n++)t.uniform1i(s.pressure.u.uPressure,this.pressure.read.attach(1)),this.blit(this.pressure.write),this.pressure.swap();s.grad.bind(),t.uniform2f(s.grad.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.grad.u.uPressure,this.pressure.read.attach(0)),t.uniform1i(s.grad.u.uVelocity,i.read.attach(1)),t.uniform1i(s.grad.u.uMask,this.maskSim.attach(2)),this.blit(i.write),i.swap(),s.advect.bind(),t.uniform2f(s.advect.u.texelSize,i.texelSizeX,i.texelSizeY),this.ext.linear||t.uniform2f(s.advect.u.dyeTexelSize,i.texelSizeX,i.texelSizeY);let r=i.read.attach(0);t.uniform1i(s.advect.u.uVelocity,r),t.uniform1i(s.advect.u.uSource,r),t.uniform1i(s.advect.u.uMask,this.maskSim.attach(2)),t.uniform1f(s.advect.u.dt,e),t.uniform1f(s.advect.u.dissipation,a.VELOCITY_DISSIPATION),this.blit(i.write),i.swap(),this.ext.linear||t.uniform2f(s.advect.u.dyeTexelSize,this.dye.texelSizeX,this.dye.texelSizeY),t.uniform1i(s.advect.u.uVelocity,i.read.attach(0)),t.uniform1i(s.advect.u.uSource,this.dye.read.attach(1)),t.uniform1i(s.advect.u.uMask,this.maskDye.attach(2)),t.uniform1f(s.advect.u.dissipation,a.DENSITY_DISSIPATION),this.blit(this.dye.write),this.dye.swap()}render(e){let t=this.gl,s=this.cfg,i=this.p;if(!this.dye)return;e||(s.BLOOM&&this.applyBloom(),s.SUNRAYS&&(this.applySunrays(),this.blur(this.sunrays,this.sunraysTemp,1))),this.ensureKeyTex();let a=this.scene||{};this.stepLight(),t.disable(t.BLEND);let r=t.drawingBufferWidth,n=t.drawingBufferHeight;if(a.glass){let l=this.srcFbo||(this.srcFbo=this.fbo(8,1,this.ext.rgba,t.NEAREST));this.useComposite(i.sources,a),this.blit(l);let c=this.ensureHazeFbo();this.useComposite(i.haze,a),t.uniform2f(i.haze.u.hazeRes,c.width,c.height),this.blit(c);let d=this.ensureLightFbo(r,n);this.useComposite(i.light,a),t.uniform2f(i.light.u.lightScale,r/d.width,n/d.height),i.light.u.uSources&&t.uniform1i(i.light.u.uSources,l.attach(7)),this.blit(d)}this.useComposite(i.display,a),a.glass&&(t.uniform1i(i.display.u.uLight,this.lightFbo.attach(5)),t.uniform2f(i.display.u.canvasRes,r,n),t.uniform2f(i.display.u.lightScale,r/this.lightFbo.width,n/this.lightFbo.height),i.display.u.uHaze&&(t.uniform1i(i.display.u.uHaze,this.hazeFbo.attach(7)),t.uniform2f(i.display.u.hazeRes,this.hazeFbo.width,this.hazeFbo.height))),this.blit(null)}ensureHazeFbo(){let e=this.gl,t=this.res(16),s=this.hazeFbo;return s&&s.width===t.width&&s.height===t.height?s:(s&&(e.deleteTexture(s.texture),e.deleteFramebuffer(s.fbo)),this.hazeFbo=this.fbo(t.width,t.height,this.ext.rgba,this.ext.linear?e.LINEAR:e.NEAREST),this.hazeFbo)}ensureLightFbo(e,t){let s=this.gl,i=Math.max(2,Math.ceil(e/2)),a=Math.max(2,Math.ceil(t/2)),r=this.lightFbo;return r&&r.width===i&&r.height===a?r:(r&&(s.deleteTexture(r.texture),s.deleteFramebuffer(r.fbo)),this.lightFbo=this.fbo(i,a,this.ext.rgba,this.ext.linear?s.LINEAR:s.NEAREST),this.lightFbo)}useComposite(e,t){let s=this.gl,i=this.cfg,a=e.u,r=s.drawingBufferHeight,n=this.hostW,l=this.hostH,c=this.dpr||1;e.bind(),s.uniform2f(a.texelSize,1/n,1/l),s.uniform2f(a.res,n,l),s.uniform2f(a.off,this.off[0],r-this.off[1]-l),s.uniform1f(a.dpr,c),s.uniform1i(a.uTexture,this.dye.read.attach(0)),s.uniform1f(a.gain,1),i.BLOOM&&(s.uniform1i(a.uBloom,this.bloom.attach(1)),s.uniform1i(a.uDithering,this.dither.attach(2)),s.uniform2f(a.ditherScale,n/this.dither.width,l/this.dither.height)),i.SUNRAYS&&s.uniform1i(a.uSunrays,this.sunrays.attach(3));let d=(y,x)=>a[y]&&s.uniform3f(a[y],x[0],x[1],x[2]);d("bgTop",t.bgTop||[.1,.11,.14]),d("bgBot",t.bgBot||[.07,.075,.094]),d("accent",t.accent||[.8,.9,.3]),d("surf",t.surf||[.086,.09,.114]),d("appBg",this.screenColor(t.appBg));let h=t.sep||[1,1,1,.06];s.uniform4f(a.sep,h[0],h[1],h[2],h[3]),s.uniform1f(a.sepPx,(t.sepPx||1)*c),a["kinds[0]"]&&s.uniform4fv(a["kinds[0]"],new Float32Array((t.kinds||Array(6).fill([0,0,0,0])).flat())),s.uniform1f(a.useKeys,t.keys?1:0),s.uniform1f(a.grid,t.kind==="xy"?1:0),s.uniform1f(a.darkTheme,t.dark===!1?0:1),this.keyTex&&t.keys&&s.uniform1i(a.uKeys,this.keyTex.attach(4)),s.uniform1f(a.glass,t.glass?1:0),s.uniform1f(a.radius,(t.radius||20)*c);let v=js(t);s.uniform1f(a.bevel,v.bevel*c),s.uniform1f(a.thickness,v.thick*c),a.look&&s.uniform4f(a.look,v.id,v.p,v.disp,v.depth);let p=this.stage||[0,0,0,0];a.stage&&s.uniform4f(a.stage,p[0],p[1],p[2],p[3]),s.uniform1f(a.gel,this.gelOn===!1?0:t.gel??1);let m=this.touchUniforms(!0);(a["touches[0]"]||a.touches)&&s.uniform4fv(a["touches[0]"]||a.touches,m);let f=this.slabData(!0);a["slabs[0]"]&&s.uniform4fv(a["slabs[0]"],f.slabs),a["fills[0]"]&&s.uniform4fv(a["fills[0]"],f.fills),a["meters[0]"]&&s.uniform1fv(a["meters[0]"],this.meters),s.uniform1f(a.nSlabs,f.n),s.uniform1f(a.mode,t.kind==="mix"?1:0),s.uniform2f(a.lightDir,this.light[0],this.light[1]),s.uniform1f(a.lightZ,this.light[2]),s.uniform2f(a.slide,this.slide[0],this.slide[1]),s.uniform1f(a.spillK,t.spill||0),s.uniform1f(a.shadowK,t.shadow||0),s.uniform1f(a.style,t.style||0);let b=t.keyGlow||[1,1,1,0];if(a.keyGlow&&s.uniform4f(a.keyGlow,b[0],b[1],b[2],b[3]),this.ensureKeyLit(),a.uKeyLit&&s.uniform1i(a.uKeyLit,this.keyLitTex.attach(6)),a["obst[0]"]){let y=this.obstacleData(!0);s.uniform4fv(a["obst[0]"],y.rects),s.uniform1f(a.nObst,y.n),s.uniform2f(a.obstH,y.lightH,y.ctrlH),a["obstR[0]"]&&s.uniform1fv(a["obstR[0]"],y.radii)}s.uniform1f(a.pulse,Math.min(1,this.boost)),s.uniform1f(a.hdr,1)}applyBloom(){let e=this.gl,t=this.cfg,s=this.p;if(this.bloomFbos.length<2)return;let i=this.bloom;e.disable(e.BLEND),s.bloomPre.bind();let a=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;e.uniform3f(s.bloomPre.u.curve,t.BLOOM_THRESHOLD-a,a*2,.25/a),e.uniform1f(s.bloomPre.u.threshold,t.BLOOM_THRESHOLD),e.uniform1i(s.bloomPre.u.uTexture,this.dye.read.attach(0)),this.blit(i),s.bloomBlur.bind();for(let r of this.bloomFbos)e.uniform2f(s.bloomBlur.u.texelSize,i.texelSizeX,i.texelSizeY),e.uniform1i(s.bloomBlur.u.uTexture,i.attach(0)),this.blit(r),i=r;e.blendFunc(e.ONE,e.ONE),e.enable(e.BLEND);for(let r=this.bloomFbos.length-2;r>=0;r--){let n=this.bloomFbos[r];e.uniform2f(s.bloomBlur.u.texelSize,i.texelSizeX,i.texelSizeY),e.uniform1i(s.bloomBlur.u.uTexture,i.attach(0)),this.blit(n),i=n}e.disable(e.BLEND),s.bloomFinal.bind(),e.uniform2f(s.bloomFinal.u.texelSize,i.texelSizeX,i.texelSizeY),e.uniform1i(s.bloomFinal.u.uTexture,i.attach(0)),e.uniform1f(s.bloomFinal.u.intensity,t.BLOOM_INTENSITY*(1+this.boost*.8)),this.blit(this.bloom)}applySunrays(){let e=this.gl,t=this.p;e.disable(e.BLEND),t.sunMask.bind(),e.uniform1i(t.sunMask.u.uTexture,this.dye.read.attach(0)),this.blit(this.dye.write),t.sun.bind(),e.uniform1f(t.sun.u.weight,this.cfg.SUNRAYS_WEIGHT),e.uniform1i(t.sun.u.uTexture,this.dye.write.attach(0)),this.blit(this.sunrays)}blur(e,t,s){let i=this.gl,a=this.p;a.blur.bind();for(let r=0;r<s;r++)i.uniform2f(a.blur.u.texelSize,e.texelSizeX,0),i.uniform1i(a.blur.u.uTexture,e.attach(0)),this.blit(t),i.uniform2f(a.blur.u.texelSize,0,e.texelSizeY),i.uniform1i(a.blur.u.uTexture,t.attach(0)),this.blit(e)}},Nr=o=>o<1?o:1,zr=o=>o>1?1/o:1,Ur=(o,e)=>({r:o.r*e,g:o.g*e,b:o.b*e});var Hr=`
struct U { texel: vec2f, dyeTexel: vec2f, point: vec2f, aspect: f32, radius: f32, color: vec4f, a: f32, b: f32, c: f32, d: f32, curve: vec4f, e: vec4f };
struct VO { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VO {
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var o: VO; o.pos = vec4f(p[i], 0.0, 1.0); o.uv = vec2f(p[i].x * 0.5 + 0.5, 0.5 - p[i].y * 0.5); return o;
}
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var sl: sampler;
fn tx(t: texture_2d<f32>, uv: vec2f) -> vec4f { return textureSampleLevel(t, sl, uv, 0.0); }
`,jr={copy:`@group(0) @binding(2) var t0: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f { return tx(t0, i.uv) + u.e * 0.0; }`,clear:`@group(0) @binding(2) var t0: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f { return u.a * tx(t0, i.uv); }`,splat:`@group(0) @binding(2) var tgt: texture_2d<f32>; @group(0) @binding(3) var msk: texture_2d<f32>; @group(0) @binding(4) var sn: sampler;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  var p = i.uv - u.point; p.x = p.x * u.aspect;
  var sp = exp(-dot(p, p) / u.radius) * u.color.rgb;
  if (u.a > 0.0 && abs(textureSampleLevel(msk, sn, i.uv, 0.0).r - u.a) > 0.001) { sp = vec3f(0.0); }
  return vec4f(tx(tgt, i.uv).xyz + sp, 1.0);
}`,advect:`@group(0) @binding(2) var vel: texture_2d<f32>; @group(0) @binding(3) var src: texture_2d<f32>; @group(0) @binding(4) var msk: texture_2d<f32>; @group(0) @binding(5) var sn: sampler;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let v = tx(vel, i.uv).xy;
  let coord = i.uv - u.a * vec2f(v.x, -v.y) * u.texel;
  var r = tx(src, coord);
  let id = textureSampleLevel(msk, sn, i.uv, 0.0).r;
  if (id < 0.001 || abs(textureSampleLevel(msk, sn, coord, 0.0).r - id) > 0.001) { r = vec4f(0.0); }
  return r / (1.0 + u.b * u.a);
}`,divergence:`@group(0) @binding(2) var vel: texture_2d<f32>; @group(0) @binding(3) var msk: texture_2d<f32>; @group(0) @binding(4) var sn: sampler;
fn wall(uv: vec2f, id: f32) -> bool { return abs(textureSampleLevel(msk, sn, uv, 0.0).r - id) > 0.001; }
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let id = textureSampleLevel(msk, sn, i.uv, 0.0).r;
  let uL = i.uv - vec2f(u.texel.x, 0.0); let uR = i.uv + vec2f(u.texel.x, 0.0);
  let uT = i.uv - vec2f(0.0, u.texel.y); let uB = i.uv + vec2f(0.0, u.texel.y);
  var L = tx(vel, uL).x; var R = tx(vel, uR).x; var T = tx(vel, uT).y; var B = tx(vel, uB).y;
  let C = tx(vel, i.uv).xy;
  if (uL.x < 0.0 || wall(uL, id)) { L = -C.x; } if (uR.x > 1.0 || wall(uR, id)) { R = -C.x; }
  if (uT.y < 0.0 || wall(uT, id)) { T = -C.y; } if (uB.y > 1.0 || wall(uB, id)) { B = -C.y; }
  return vec4f(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,curl:`@group(0) @binding(2) var vel: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let L = tx(vel, i.uv - vec2f(u.texel.x, 0.0)).y; let R = tx(vel, i.uv + vec2f(u.texel.x, 0.0)).y;
  let T = tx(vel, i.uv - vec2f(0.0, u.texel.y)).x; let B = tx(vel, i.uv + vec2f(0.0, u.texel.y)).x;
  return vec4f(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,vorticity:`@group(0) @binding(2) var vel: texture_2d<f32>; @group(0) @binding(3) var crl: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let L = tx(crl, i.uv - vec2f(u.texel.x, 0.0)).x; let R = tx(crl, i.uv + vec2f(u.texel.x, 0.0)).x;
  let T = tx(crl, i.uv - vec2f(0.0, u.texel.y)).x; let B = tx(crl, i.uv + vec2f(0.0, u.texel.y)).x;
  let C = tx(crl, i.uv).x;
  var force = 0.5 * vec2f(abs(T) - abs(B), abs(R) - abs(L));
  force = force / (length(force) + 0.0001) * u.c * C;
  force.y = -force.y;
  let v = clamp(tx(vel, i.uv).xy + force * u.a, vec2f(-1000.0), vec2f(1000.0));
  return vec4f(v, 0.0, 1.0);
}`,pressure:`@group(0) @binding(2) var prs: texture_2d<f32>; @group(0) @binding(3) var dvg: texture_2d<f32>; @group(0) @binding(4) var msk: texture_2d<f32>; @group(0) @binding(5) var sn: sampler;
fn wall(uv: vec2f, id: f32) -> bool { return abs(textureSampleLevel(msk, sn, uv, 0.0).r - id) > 0.001; }
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let id = textureSampleLevel(msk, sn, i.uv, 0.0).r;
  let uL = i.uv - vec2f(u.texel.x, 0.0); let uR = i.uv + vec2f(u.texel.x, 0.0);
  let uT = i.uv - vec2f(0.0, u.texel.y); let uB = i.uv + vec2f(0.0, u.texel.y);
  let C = tx(prs, i.uv).x;
  let L = select(tx(prs, uL).x, C, wall(uL, id)); let R = select(tx(prs, uR).x, C, wall(uR, id));
  let T = select(tx(prs, uT).x, C, wall(uT, id)); let B = select(tx(prs, uB).x, C, wall(uB, id));
  return vec4f((L + R + B + T - tx(dvg, i.uv).x) * 0.25, 0.0, 0.0, 1.0);
}`,gradient:`@group(0) @binding(2) var prs: texture_2d<f32>; @group(0) @binding(3) var vel: texture_2d<f32>; @group(0) @binding(4) var msk: texture_2d<f32>; @group(0) @binding(5) var sn: sampler;
fn wall(uv: vec2f, id: f32) -> bool { return abs(textureSampleLevel(msk, sn, uv, 0.0).r - id) > 0.001; }
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let id = textureSampleLevel(msk, sn, i.uv, 0.0).r;
  let uL = i.uv - vec2f(u.texel.x, 0.0); let uR = i.uv + vec2f(u.texel.x, 0.0);
  let uT = i.uv - vec2f(0.0, u.texel.y); let uB = i.uv + vec2f(0.0, u.texel.y);
  let C = tx(prs, i.uv).x;
  let L = select(tx(prs, uL).x, C, wall(uL, id)); let R = select(tx(prs, uR).x, C, wall(uR, id));
  let T = select(tx(prs, uT).x, C, wall(uT, id)); let B = select(tx(prs, uB).x, C, wall(uB, id));
  var v = tx(vel, i.uv).xy - vec2f(R - L, T - B);
  if (id < 0.001) { v = vec2f(0.0); }
  return vec4f(v, 0.0, 1.0);
}`,bloomPre:`@group(0) @binding(2) var t0: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  var c = tx(t0, i.uv).rgb;
  let br = max(c.r, max(c.g, c.b));
  var rq = clamp(br - u.curve.x, 0.0, u.curve.y); rq = u.curve.z * rq * rq;
  c = c * max(rq, br - u.a) / max(br, 0.0001);
  return vec4f(c, 0.0);
}`,bloomBlur:`@group(0) @binding(2) var t0: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let s = tx(t0, i.uv - vec2f(u.texel.x, 0.0)) + tx(t0, i.uv + vec2f(u.texel.x, 0.0)) + tx(t0, i.uv - vec2f(0.0, u.texel.y)) + tx(t0, i.uv + vec2f(0.0, u.texel.y));
  return s * 0.25 * u.a;
}`,sunMask:`@group(0) @binding(2) var t0: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  var c = tx(t0, i.uv);
  let br = max(c.r, max(c.g, c.b));
  c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8) + u.e.x * 0.0; // (every pass binds the uniform block)
  return c;
}`,sun:`@group(0) @binding(2) var t0: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  var coord = i.uv;
  let dir = (i.uv - 0.5) * (1.0 / 16.0) * 0.3;
  var decay = 1.0;
  var col = tx(t0, i.uv).a;
  for (var k = 0; k < 16; k = k + 1) { coord = coord - dir; col = col + tx(t0, coord).a * decay * u.a; decay = decay * 0.95; }
  return vec4f(col * 0.7, 0.0, 0.0, 1.0);
}`,blur:`@group(0) @binding(2) var t0: texture_2d<f32>;
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let o = u.texel * 1.33333333;
  return tx(t0, i.uv) * 0.29411764 + tx(t0, i.uv - o) * 0.35294117 + tx(t0, i.uv + o) * 0.35294117;
}`},Gs=`
struct S {
  res: vec2f, lightDir: vec2f, bgTop: vec4f, bgBot: vec4f, accent: vec4f, sep: vec4f,
  k0: vec4f, k1: vec4f, k2: vec4f, k3: vec4f, k4: vec4f, k5: vec4f,
  ditherScale: vec2f, texel: vec2f,
  sepPx: f32, useKeys: f32, grid: f32, darkTheme: f32, glass: f32, radius: f32, bevel: f32, pulse: f32,
  hdr: f32, bloomOn: f32, sunOn: f32, shadeOn: f32,
  t0: vec4f, t1: vec4f, t2: vec4f, t3: vec4f,
  thickness: f32, gel: f32, lightScale: vec2f,
  slabs: array<vec4f, 8>, fills: array<vec4f, 8>, meters: array<vec4f, 2>,
  off: vec2f, slide: vec2f,
  dpr: f32, nSlabs: f32, mode: f32, lightZ: f32,
  spillK: f32, shadowK: f32, cres: vec2f,
  surf: vec4f, appBg: vec4f,
  obst: array<vec4f, 16>, nObst: f32, lightH: f32, obstH: f32, style: f32,
  obstR: array<vec4f, 4>,
  keyGlow: vec4f,
  look: vec4f, hazeRes: vec2f, hz0: vec2f,
  stage: vec4f,
};
struct VO { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VO {
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var o: VO; o.pos = vec4f(p[i], 0.0, 1.0); o.uv = vec2f(p[i].x * 0.5 + 0.5, 0.5 - p[i].y * 0.5); return o;
}
@group(0) @binding(0) var<uniform> s: S;
@group(0) @binding(1) var sl: sampler;
`,Ws=`var<private> selRect: vec4f;
var<private> selFill: vec4f;
var<private> selMeter: f32;
var<private> sepLine: f32; // (marks: 1 on a partition between keys or a grid line; see fluid.js)
fn tx(t: texture_2d<f32>, uv: vec2f) -> vec4f { return textureSampleLevel(t, sl, uv, 0.0); }
fn tn(t: texture_2d<f32>, uv: vec2f) -> vec4f { return textureSampleLevel(t, sn, uv, 0.0); }
fn linearToGamma(c: vec3f) -> vec3f { let x = max(c, vec3f(0.0)); return max(1.055 * pow(x, vec3f(0.416666667)) - 0.055, vec3f(0.0)); }
fn glowAt(uv: vec2f) -> vec3f {
  var c = tx(dye, uv).rgb;
  if (s.bloomOn > 0.5) { c = c + linearToGamma(tx(bloom, uv).rgb); }
  return c;
}
// the ink blurred on a coarse grid (HAZE pass), smoothed between its cells (see fluid.js)
fn hazeAt(uv: vec2f) -> vec3f {
  let o = 0.5 / s.hazeRes;
  return 0.25 * (tx(haze, uv + o).rgb + tx(haze, uv - o).rgb + tx(haze, uv + vec2f(o.x, -o.y)).rgb + tx(haze, uv + vec2f(-o.x, o.y)).rgb);
}
fn kindColor(k: f32) -> vec4f {
  if (k < 0.5) { return s.k0; } if (k < 1.5) { return s.k1; } if (k < 2.5) { return s.k2; }
  if (k < 3.5) { return s.k3; } if (k < 4.5) { return s.k4; } return s.k5;
}
// ---- MOTIF Halloween: a graveyard under the moon, under the glass (see fluid.js; here y runs down) ----
fn hStep(a: f32, b: f32, x: f32) -> f32 { let t = clamp((x - a) / (b - a), 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
fn hHash(q: vec2f) -> f32 { var p = fract(q * vec2f(123.34, 456.21)); p = p + dot(p, p + 45.32); return fract(p.x * p.y); }
fn hNoise(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hHash(i), hHash(i + vec2f(1.0, 0.0)), u.x), mix(hHash(i + vec2f(0.0, 1.0)), hHash(i + vec2f(1.0, 1.0)), u.x), u.y);
}
fn hFbm(q: vec2f) -> f32 { var p = q; var sum = 0.0; var a = 0.5; for (var i = 0; i < 3; i = i + 1) { sum = sum + a * hNoise(p); p = p * 2.03 + 17.1; a = a * 0.5; } return sum; }
fn hBox(p: vec2f, b: vec2f, r: f32) -> f32 { let q = abs(p) - b + r; return length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - r; }
fn hBat(q: vec2f, flap: f32) -> f32 {
  let p = vec2f(abs(q.x), q.y);
  let body = length(p * vec2f(1.6, 1.0)) - 0.16;
  var w = p - vec2f(0.18, 0.0);
  let a = flap * 0.9; let c = cos(a); let sn = sin(a);
  w = vec2f(c * w.x - sn * w.y, sn * w.x + c * w.y);
  var wing = max(abs(w.y + 0.05 * w.x) - 0.12 * (1.0 - w.x / 0.95), w.x - 0.95);
  wing = max(wing, -w.x);
  let mx = w.x - 0.3 * floor(w.x / 0.3);
  wing = max(wing, -(length(vec2f(mx - 0.15, w.y + 0.13)) - 0.11));
  return min(min(body, wing), length(p - vec2f(0.07, 0.17)) - 0.05);
}
fn hGraves(p: vec2f, w: f32) -> f32 {
  var d = 1e5;
  for (var i = 0; i < 5; i = i + 1) {
    let fi = f32(i);
    var q = p - vec2f((0.1 + fi * 0.21) * w + 0.03 * sin(fi * 7.1), 0.0);
    let tl = 0.12 * sin(fi * 3.7); let c = cos(tl); let sn = sin(tl);
    q = vec2f(c * q.x - sn * q.y, sn * q.x + c * q.y);
    let h = 0.07 + 0.03 * fract(fi * 0.73);
    if (fi % 2.0 < 1.0) { d = min(d, min(hBox(q - vec2f(0.0, h * 0.5), vec2f(0.008, h * 0.5), 0.003), hBox(q - vec2f(0.0, h * 0.68), vec2f(0.03, 0.008), 0.003))); }
    else { d = min(d, min(hBox(q - vec2f(0.0, h * 0.4), vec2f(0.026, h * 0.4), 0.0), length(q - vec2f(0.0, h * 0.8)) - 0.026)); }
  }
  let t = p - vec2f(0.83 * w, 0.0);
  let trunk = hBox(t - vec2f(0.04 * t.y, 0.11), vec2f(0.012 - t.y * 0.03, 0.11), 0.004);
  var b1 = t - vec2f(0.0, 0.17); b1 = vec2f(0.6 * b1.x + 0.8 * b1.y, -0.8 * b1.x + 0.6 * b1.y);
  var b2 = t - vec2f(0.0, 0.13); b2 = vec2f(0.5 * b2.x - 0.86 * b2.y, 0.86 * b2.x + 0.5 * b2.y);
  var b3 = t - vec2f(-0.03, 0.2); b3 = vec2f(0.94 * b3.x + 0.34 * b3.y, -0.34 * b3.x + 0.94 * b3.y);
  let br = min(hBox(b1 - vec2f(0.05, 0.0), vec2f(0.05, 0.004), 0.003), hBox(b2 - vec2f(0.045, 0.0), vec2f(0.045, 0.004), 0.003));
  return min(d, min(trunk, min(br, hBox(b3 - vec2f(-0.04, 0.0), vec2f(0.04, 0.0035), 0.003))));
}
fn stageAt(p: vec2f) -> vec3f {
  let uv = p / s.res;
  let Wr = s.res.x / s.res.y; let t = s.stage.y; let watch = s.stage.z;
  let q = vec2f(uv.x * Wr, 1.0 - uv.y);
  var sky = mix(vec3f(0.2, 0.07, 0.24), vec3f(0.025, 0.02, 0.07), hStep(0.05, 0.95, q.y));
  if (q.y > 0.35) {
    let cp = p / s.dpr;
    let sg = floor(cp / 11.0); let sf = fract(cp / 11.0) - 0.5 - 0.3 * (vec2f(hHash(sg + 7.7), hHash(sg + 1.9)) - 0.5);
    sky = sky + step(0.975, hHash(sg)) * hStep(0.35, 0.8, q.y) * exp(-dot(sf, sf) * 160.0) * (0.55 + 0.45 * sin(t * (1.5 + 3.0 * hHash(sg + 3.1)) + hHash(sg) * 30.0)) * vec3f(0.85, 0.85, 1.0);
  }
  let mc = vec2f(0.72 * Wr, 0.78);
  let md = length(q - mc) - 0.13;
  let moonC = mix(vec3f(1.0, 0.95, 0.78), vec3f(1.0, 0.45, 0.25), watch * 0.7);
  sky = sky + moonC * 0.35 * exp(-max(md, 0.0) * 9.0) * (1.0 + 0.6 * s.stage.w);
  if (md < 0.01) { sky = mix(sky, moonC * (0.82 + 0.25 * hNoise((q - mc) * 18.0 + 3.0) - 0.22 * hStep(0.5, 0.75, hNoise((q - mc) * 7.0))), hStep(0.004, -0.004, md)); }
  if (q.y > 0.45) {
    let cl = hFbm(vec2f(q.x * 2.2 - t * 0.03, q.y * 5.0));
    sky = mix(sky, vec3f(0.16, 0.1, 0.22) + moonC * 0.12 * exp(-length(q - mc) * 3.0), hStep(0.52, 0.8, cl) * hStep(0.45, 0.7, q.y) * hStep(1.0, 0.75, q.y) * 0.85);
    for (var i = 0; i < 3; i = i + 1) {
      let fi = f32(i);
      let bp = vec2f((fract(t * (0.05 + 0.025 * fi) + fi * 0.37) * 1.4 - 0.2) * Wr, 0.62 + 0.15 * fi + 0.04 * sin(t * 1.3 + fi * 2.0));
      let sz = 0.035 + 0.012 * fi;
      sky = mix(sky, vec3f(0.02, 0.01, 0.03), hStep(0.0015, -0.0015, hBat((q - bp) / sz, sin(t * (11.0 + fi * 2.0) + fi)) * sz));
    }
  }
  let hill = 0.2 + 0.04 * sin(q.x * 5.0 + 1.0) + 0.025 * sin(q.x * 11.0 + 2.0);
  if (q.y < hill + 0.2) {
    let gy = hGraves(q - vec2f(0.0, hill - 0.004), Wr);
    sky = mix(sky, vec3f(0.05, 0.03, 0.08), max(hStep(0.002, -0.002, q.y - hill), hStep(0.0015, -0.0015, gy) * step(hill - 0.01, q.y)));
    let near = 0.1 + 0.02 * sin(q.x * 3.0 + 4.0);
    sky = mix(sky, vec3f(0.025, 0.015, 0.04), hStep(0.002, -0.002, q.y - near));
    for (var i = 0; i < 5; i = i + 1) {
      let fi = f32(i); let cyc = 7.0 + 3.0 * fi; let ph = fract(t / cyc + fi * 0.31);
      let open = hStep(0.0, 0.08, ph) * hStep(0.55, 0.45, ph) * step(0.35 - watch * 0.4, fract(fi * 0.618 + floor(t / cyc + fi * 0.31) * 0.37));
      let blink = 1.0 - step(0.96, fract(t * 0.7 + fi * 0.21));
      var ep = q - vec2f((0.08 + 0.2 * fi + 0.05 * sin(fi * 4.0)) * Wr, hill - 0.035 - 0.03 * fract(fi * 0.53));
      ep.x = abs(ep.x) - 0.011;
      sky = sky + vec3f(0.75, 1.0, 0.3) * hStep(0.004, -0.002, length(ep * vec2f(1.0, 2.4 / max(blink * open, 0.05))) - 0.006) * open * blink * (0.8 + watch);
    }
    sky = sky + vec3f(0.25, 0.4, 0.3) * hStep(0.32, 0.05, q.y) * hFbm(vec2f(q.x * 3.0 + t * 0.05, q.y * 9.0 - t * 0.02)) * 0.45;
  }
  return sky;
}
fn sceneAt(uv: vec2f) -> vec3f {
  if (s.mode > 0.5) {
    let hgt = max(selRect.w - selRect.y, 1e-3); let hpx = hgt * s.res.y;
    let t = clamp((selRect.w - uv.y) / hgt, 0.0, 1.0); let lv = selFill.a;
    var c = s.surf.rgb;
    let below = 1.0 - smoothstep(lv - 1.5 / hpx, lv + 1.5 / hpx, t);
    c = mix(c, selFill.rgb, below * mix(0.85, 0.42, clamp(t / max(lv, 0.05), 0.0, 1.0)));
    let ml = (t - lv) * hpx / (2.0 * s.dpr);
    c = c + selFill.rgb * exp(-ml * ml) * 0.6;
    let m = selMeter;
    c = c + selFill.rgb * m * m * 0.5 * (1.0 - smoothstep(0.0, max(m, 0.01), t));
    return c;
  }
  var base = mix(s.bgTop.rgb, s.bgBot.rgb, uv.y);
  if (s.stage.x > 0.5) { base = stageAt(uv * s.res); }
  var col = marks(base, uv);
  let q = uv - vec2f(0.5, 0.88);
  let glow = exp(-dot(q, q) * 8.0) * (0.035 + 0.13 * s.pulse);
  col = col + s.accent.rgb * glow * select(0.4, 1.0, s.darkTheme > 0.5);
  return col;
}
// the keys, the partitions between them and the grid, over a base colour (see fluid.js)
fn marks(base: vec3f, uv: vec2f) -> vec3f {
  var col = base;
  if (s.useKeys > 0.5) {
    let k = tn(keys, uv);
    if (k.r > 0.001) {
      let o = kindColor(floor(k.g * 255.0 / 40.0 + 0.5));
      col = mix(col, o.rgb, o.a);
      let lit = textureSampleLevel(keyLit, sn, vec2f((floor(k.r * 255.0 + 0.5) - 0.5) / 64.0, 0.5), 0.0).r;
      col = mix(col, s.keyGlow.rgb, lit * s.keyGlow.a);
      let dx = s.sepPx / s.res.x;
      if (abs(tn(keys, uv - vec2f(dx, 0.0)).r - k.r) > 0.001 || abs(tn(keys, uv + vec2f(dx, 0.0)).r - k.r) > 0.001) { col = mix(col, s.sep.rgb, s.sep.a); sepLine = 1.0; }
    } else {
      col = mix(col, select(s.sep.rgb, vec3f(0.0), s.darkTheme > 0.5), select(s.sep.a, 0.25, s.darkTheme > 0.5));
    }
  }
  if (s.grid > 0.5) {
    let g = abs(fract(uv * 4.0 + 0.5) - 0.5) * s.res / 4.0;
    if (min(g.x, g.y) < 0.6) { col = mix(col, s.sep.rgb, s.sep.a); sepLine = 1.0; }
  }
  return col;
}
fn sdRound(p: vec2f, b: vec2f, r: f32) -> f32 { let q = abs(p) - b + r; return length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - r; }
fn clampLen(v: vec2f, m: f32) -> vec2f { let l = length(v); if (l > m) { return v * (m / l); } return v; }
fn sdSlab(p: vec2f, r: vec4f) -> f32 {
  let a = r.xy * s.res; let b = r.zw * s.res; let hs = (b - a) * 0.5;
  return sdRound(p - (a + b) * 0.5, hs, min(s.radius, min(hs.x, hs.y)));
}
fn nearest(p: vec2f) -> f32 {
  var sd = 1e5;
  for (var i = 0; i < 8; i = i + 1) {
    if (f32(i) >= s.nSlabs) { break; }
    let v = sdSlab(p, s.slabs[i]);
    if (v < sd) { sd = v; selRect = s.slabs[i]; selFill = s.fills[i]; selMeter = s.meters[i / 4][i % 4]; }
  }
  return sd;
}
fn nearestOnly(p: vec2f) -> f32 {
  var sd = 1e5;
  for (var i = 0; i < 8; i = i + 1) { if (f32(i) >= s.nSlabs) { break; } sd = min(sd, sdSlab(p, s.slabs[i])); }
  return sd;
}
fn normalOut(p: vec2f) -> vec2f {
  return normalize(vec2f(sdSlab(p + vec2f(1.0, 0.0), selRect) - sdSlab(p - vec2f(1.0, 0.0), selRect),
                         sdSlab(p + vec2f(0.0, 1.0), selRect) - sdSlab(p - vec2f(0.0, 1.0), selRect)) + vec2f(1e-5));
}
// how much of the light leaving the glass at a reaches p: the controls standing between hide it (see fluid.js)
fn boxExit(a: vec2f, inv: vec2f, b: vec4f) -> f32 {
  let t0 = (b.xy - a) * inv; let t1 = (b.zw - a) * inv;
  let tn = min(t0, t1); let tf = max(t0, t1);
  let tin = max(max(tn.x, tn.y), 0.0); let tout = min(min(tf.x, tf.y), 1.0);
  return select(-1.0, tout, tin < tout);
}
fn circleExit(a: vec2f, d: vec2f, c: vec2f, r: f32) -> f32 {
  let f = a - c;
  let aa = dot(d, d); let b = dot(f, d); let disc = b * b - aa * (dot(f, f) - r * r);
  if (disc < 0.0) { return -1.0; }
  let q = sqrt(disc); let t1 = (-b - q) / aa; let t2 = (-b + q) / aa;
  return select(-1.0, min(t2, 1.0), t2 > 0.0 && t1 < 1.0);
}
fn seen(a: vec2f, p: vec2f) -> f32 {
  var d = p - a;
  d = vec2f(select(d.x, 1e-3, abs(d.x) < 1e-3), select(d.y, 1e-3, abs(d.y) < 1e-3));
  let inv = 1.0 / d;
  var v = 1.0;
  for (var i = 0; i < 16; i = i + 1) {
    if (f32(i) >= s.nObst) { break; }
    let b = s.obst[i];
    if (boxExit(a, inv, b) < 0.0) { continue; }
    let r = min(s.obstR[i / 4][i % 4], 0.5 * min(b.z - b.x, b.w - b.y));
    var t = max(boxExit(a, inv, vec4f(b.x, b.y + r, b.z, b.w - r)), boxExit(a, inv, vec4f(b.x + r, b.y, b.z - r, b.w)));
    t = max(t, max(circleExit(a, d, b.xy + vec2f(r), r), circleExit(a, d, b.zw - vec2f(r), r)));
    t = max(t, max(circleExit(a, d, vec2f(b.x + r, b.w - r), r), circleExit(a, d, vec2f(b.z - r, b.y + r), r)));
    let w = 12.0 * s.dpr * (1.0 - t) + 0.35 * s.obstH + 1.5 * s.dpr;
    if (t >= 0.0) { v = v * smoothstep(-w, w, s.lightH * (1.0 - t) - s.obstH); }
  }
  return 0.22 + 0.78 * v;
}
fn aoAt(p: vec2f) -> f32 {
  var a = 1.0;
  for (var i = 0; i < 16; i = i + 1) {
    if (f32(i) >= s.nObst) { break; }
    let b = s.obst[i];
    let hs = (b.zw - b.xy) * 0.5;
    let sd = sdRound(p - (b.xy + b.zw) * 0.5, hs, min(s.obstR[i / 4][i % 4], min(hs.x, hs.y)));
    a = a * (1.0 - 0.6 * exp(-max(sd, 0.0) / (0.9 * s.obstH + 1.0)));
  }
  return a;
}
// the light from where the ink shines (SOURCES pass): o = 1 lets the controls in the way cast their shadows
fn farLight(p: vec2f, o: f32) -> vec3f {
  var light = vec3f(0.0);
  for (var k = 0; k < 4; k = k + 1) {
    let Ls = textureLoad(srcT, vec2i(k, 0), 0);
    if (Ls.z < 0.005) { continue; }
    let Lc = textureLoad(srcT, vec2i(k + 4, 0), 0).rgb;
    let sp = Ls.xy * s.res;
    let dv = p - sp;
    let dist = length(dv);
    let side = vec2f(-dv.y, dv.x) / max(dist, 1e-3) * 14.0 * s.dpr;
    var v = 1.0;
    if (o > 0.5) { v = 0.5 * (seen(sp + side, p) + seen(sp - side, p)); }
    let rr = dist / (140.0 * s.dpr);
    light = light + Lc * Ls.z * s.spillK * 1.4 * v / (1.0 + rr * rr);
  }
  return light;
}
// the light around the glass, from every slab, and under the clear plate (see fluid.js), drawn at half
// the resolution by its own pass since it is soft
fn aroundLight(p: vec2f) -> vec4f {
  let reach = 560.0 * s.dpr;
  let sdMin = nearestOnly(p);
  if (sdMin > reach) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let plate = sdMin < 0.0 && s.mode < 0.5 && abs(s.look.x - 1.0) > 0.5; // (a point under a clear plate)
  let floats = abs(s.look.x - 4.0) < 0.5;                   // (Prisme floats above the screen)
  let lift = select(1.0, 1.0 + s.look.w, floats);
  let L = normalize(vec3f(s.lightDir.x, -s.lightDir.y, max(s.lightZ, 0.05)));
  let ld = normalize(L.xy + vec2f(1e-5));
  let len = clamp(s.thickness * 0.3 * lift * length(L.xy) / max(L.z, 0.2), 3.0 * s.dpr, 22.0 * s.dpr * lift);
  let amb = select(0.85, 0.22, s.darkTheme > 0.5);
  var light = vec3f(0.0);
  for (var i = 0; i < 8; i = i + 1) {
    if (f32(i) >= s.nSlabs) { break; }
    let R = s.slabs[i];
    let sd = sdSlab(p, R);
    if (sd > reach) { continue; }
    selRect = R; selFill = s.fills[i]; selMeter = s.meters[i / 4][i % 4];
    let nOut = normalize(vec2f(sdSlab(p + vec2f(1.0, 0.0), R) - sdSlab(p - vec2f(1.0, 0.0), R),
                               sdSlab(p + vec2f(0.0, 1.0), R) - sdSlab(p - vec2f(0.0, 1.0), R)) + vec2f(1e-5));
    let tg = vec2f(-nOut.y, nOut.x);
    let so = max(sd, 0.0);
    let pe = p - nOut * min(sd, 0.0);                       // (under the plate: the edge above the point)
    let q = pe - nOut * (so + 6.0 * s.dpr); let uq = q / s.res;
    let g0 = glowAt(uq);
    let away = max(dot(nOut, -ld), 0.0);
    let cd = so - len * 0.55; let cw = 2.0 * s.dpr + len * 0.25;
    let caustic = exp(-cd * cd / (cw * cw)) * away * away;
    if (caustic > 0.002 && !plate) {
      if (abs(s.look.x - 1.0) < 0.5) { light = light + (amb * mix(vec3f(1.0), sceneAt(uq) * 1.6, 0.6) + g0 * 0.8) * caustic * 0.5; } // (Liquide: tinted by the glass)
      else { light = light + (vec3f(amb) + g0 * 0.4) * caustic * 0.3; }
    }
    let spread = so * 0.9 + 4.0 * s.dpr;
    let a1 = q + tg * spread; let a2 = q - tg * spread; let b1 = q + tg * spread * 0.45; let b2 = q - tg * spread * 0.45; let c1 = q - nOut * spread * 0.6;
    let E = g0 * 0.2 + (glowAt(a1 / s.res) + glowAt(a2 / s.res)) * 0.15 + (glowAt(b1 / s.res) + glowAt(b2 / s.res)) * 0.2 + glowAt(c1 / s.res) * 0.1;
    let r = so / (34.0 * s.dpr);
    var leak = 1.0 / (1.0 + r * r);
    // a clear plate's edge lets the light caught in the glass out: it pools at the glass's foot (wider
    // below a floating plate); under the plate, a band just inside the edge (wider under frosted glass)
    if (abs(s.look.x - 1.0) > 0.5 && !plate) { leak = leak + select(0.8 * exp(-so / (5.0 * s.dpr)), 0.55 * exp(-so / (12.0 * s.dpr)), floats); }
    var beneath = 0.25 * exp(min(sd, 0.0) / (8.0 * s.dpr));
    if (abs(s.look.x - 2.0) < 0.5) { beneath = 0.65 * exp(min(sd, 0.0) / (24.0 * s.dpr)); } else if (floats) { beneath = 0.3 * exp(min(sd, 0.0) / (18.0 * s.dpr)); }
    light = light + E * s.spillK * seen(q, pe) * leak * select(1.0, beneath, plate);
  }
  if (plate) {
    var far = 0.4 * exp(sdMin / (12.0 * s.dpr));
    if (abs(s.look.x - 2.0) < 0.5) { far = 0.08 + 0.5 * exp(sdMin / (24.0 * s.dpr)); }
    return vec4f(light + farLight(p, 0.0) * far, 1.0);
  }
  light = light + farLight(p, 1.0);
  light = light * (1.0 - smoothstep(0.5 * reach, reach, sdMin));
  return vec4f(light, aoAt(p));
}
`,Gr=()=>Gs+`@group(0) @binding(2) var dye: texture_2d<f32>;
@group(0) @binding(3) var bloom: texture_2d<f32>;
@group(0) @binding(4) var sun: texture_2d<f32>;
@group(0) @binding(5) var dither: texture_2d<f32>;
@group(0) @binding(6) var keys: texture_2d<f32>;
@group(0) @binding(7) var sn: sampler;
@group(0) @binding(8) var srep: sampler;
@group(0) @binding(9) var lightT: texture_2d<f32>;
@group(0) @binding(10) var keyLit: texture_2d<f32>;
@group(0) @binding(11) var srcT: texture_2d<f32>;
@group(0) @binding(12) var haze: texture_2d<f32>;
`+Ws+`fn inkAt(uv: vec2f) -> vec3f {
  var c = tx(dye, uv).rgb;
  if (s.shadeOn > 0.5) {
    let lc = tx(dye, uv - vec2f(s.texel.x, 0.0)).rgb; let rc = tx(dye, uv + vec2f(s.texel.x, 0.0)).rgb;
    let tc = tx(dye, uv - vec2f(0.0, s.texel.y)).rgb; let bc = tx(dye, uv + vec2f(0.0, s.texel.y)).rgb;
    let n = normalize(vec3f(length(rc) - length(lc), length(tc) - length(bc), length(s.texel)));
    c = c * clamp(n.z + 0.7, 0.7, 1.0);
  }
  var b = vec3f(0.0);
  if (s.bloomOn > 0.5) { b = tx(bloom, uv).rgb; }
  if (s.sunOn > 0.5) { let r = tx(sun, uv).r; c = c * r; b = b * r; }
  if (s.bloomOn > 0.5) {
    c = c + linearToGamma(b) + (textureSampleLevel(dither, srep, uv * s.ditherScale, 0.0).r - 0.5) / 255.0;
  }
  return c;
}
fn under(uv: vec2f) -> vec3f {
  // under a clear plate (every look but Liquide) lies the screen itself, with the keys, the partitions
  // and the ink; satin glass (D\xE9poli) softens the ink into glows (see fluid.js)
  let plate = s.glass > 0.5 && s.mode < 0.5 && abs(s.look.x - 1.0) > 0.5;
  sepLine = 0.0;
  var sc: vec3f;
  if (plate) { sc = marks(screenAt(uv * s.res), uv); } else { sc = sceneAt(uv); }
  var ink = inkAt(uv);
  if (s.glass > 0.5 && abs(s.look.x - 2.0) < 0.5) { ink = mix(ink, hazeAt(uv) * 1.3, 0.9); }
  var c: vec3f;
  if (s.style > 0.5 && s.style < 1.5) {
    let dens = max(ink.r, max(ink.g, ink.b));
    let pig = pow(clamp(ink / max(dens, 1e-3), vec3f(0.0), vec3f(1.0)), vec3f(1.7)) * 0.94 + 0.02;
    c = sc * mix(vec3f(1.0), pig, 1.0 - exp(-dens * 1.6));
  } else if (s.style > 1.5) {
    let dens = max(ink.r, max(ink.g, ink.b));
    let lit = mix(clamp(ink / max(dens, 1e-3), vec3f(0.0), vec3f(1.0)), vec3f(1.0), 0.12) * (0.92 + 0.25 * smoothstep(1.0, 3.0, dens)) * select(1.0, 1.0 + 0.3 * (s.hdr - 1.0), s.hdr > 1.0);
    c = mix(sc, lit, 1.0 - exp(-dens * 1.4));
  } else if (s.hdr > 1.0) {
    c = sc + ink * (0.6 + 0.4 * s.hdr);
  } else {
    c = 1.0 - (1.0 - sc) * (1.0 - clamp(ink, vec3f(0.0), vec3f(1.0)));
  }
  // under a clear plate the partitions between keys show faintly through the ink (not through frosted
  // glass; see fluid.js)
  if (plate && sepLine > 0.5 && abs(s.look.x - 2.0) > 0.5) { c = mix(c, mix(c * 0.8, s.sep.rgb, s.sep.a), 0.55); }
  return c;
}
fn touchAt(k: i32) -> vec4f { if (k == 0) { return s.t0; } if (k == 1) { return s.t1; } if (k == 2) { return s.t2; } return s.t3; }
// the light texture at p, four taps around the point (smooth enlargement of the half-resolution light)
fn lightAt(p: vec2f) -> vec4f {
  let lu = (p + s.off) / s.cres; let lo = 0.5 * s.lightScale / s.cres;
  return 0.25 * (textureSampleLevel(lightT, sl, lu + lo, 0.0) + textureSampleLevel(lightT, sl, lu - lo, 0.0)
               + textureSampleLevel(lightT, sl, lu + vec2f(lo.x, -lo.y), 0.0) + textureSampleLevel(lightT, sl, lu + vec2f(-lo.x, lo.y), 0.0));
}
// light theme looks: on a pale screen, light through coloured glass shows as colour, not as white
fn lightTint(light: vec3f) -> vec3f {
  let lum = max(light.r, max(light.g, light.b));
  let hue = light / max(lum, 1e-3);
  let aq = s.style < 1.5;
  let tint = select(mix(vec3f(1.0), hue, 0.85), pow(clamp(hue, vec3f(0.0), vec3f(1.0)), vec3f(1.2)), aq);
  return mix(vec3f(1.0), tint, (1.0 - exp(-lum * select(1.3, 0.9, aq))) * select(0.75, 0.55, aq));
}
// the screen the glass lies on, with the light that falls on it (see fluid.js)
fn screenAt(p: vec2f) -> vec3f {
  let Lt = lightAt(p);
  let light = Lt.rgb * Lt.a;
  // Halloween: under the pad's glass lies the graveyard, lit by the ink
  if (s.stage.x > 0.5 && s.mode < 0.5 && p.x >= 0.0 && p.y >= 0.0 && p.x <= s.res.x && p.y <= s.res.y) { return stageAt(p) + (1.0 - exp(-light)) * 0.8; }
  if (s.style > 0.5) { return s.appBg.rgb * min(lightTint(light), vec3f(1.0)); }
  return s.appBg.rgb + (1.0 - exp(-light)) * select(1.0, 0.8 + 0.25 * s.hdr, s.hdr > 1.0);
}
// the screen around the glass: its shadow (full resolution) and the light looked up from its pass
fn table(p: vec2f, sdMin: f32) -> vec4f {
  if (sdMin > 560.0 * s.dpr) { return select(vec4f(s.appBg.rgb, 1.0), vec4f(0.0), s.style > 0.5); }
  let L = normalize(vec3f(s.lightDir.x, -s.lightDir.y, max(s.lightZ, 0.05)));
  let ld = normalize(L.xy + vec2f(1e-5));
  let lift = select(1.0, 1.0 + s.look.w, abs(s.look.x - 4.0) < 0.5); // (Prisme floats above the screen)
  let len = clamp(s.thickness * 0.3 * lift * length(L.xy) / max(L.z, 0.2), 3.0 * s.dpr, 22.0 * s.dpr * lift);
  let blur = 5.0 * s.dpr + len * 0.9;
  var shadow = 0.0;
  if (sdMin < len + 3.0 * blur) { shadow = 1.0 - smoothstep(-blur, blur, nearestOnly(p + ld * len)); }
  // the Liquide slab: a soft shadow, darker where it touches; a clear plate: a faint one, a thin line;
  // Prisme, floating: a wider, softer shadow, no line
  var alpha = clamp((shadow * 0.16 + exp(-sdMin / (1.2 * s.dpr)) * 0.35) * s.shadowK, 0.0, 0.6);
  if (abs(s.look.x - 1.0) < 0.5) { alpha = clamp((shadow * 0.42 + exp(-sdMin / (2.5 * s.dpr)) * 0.3) * s.shadowK, 0.0, 0.85); }
  else if (lift > 1.0) { alpha = clamp(shadow * 0.24 * s.shadowK, 0.0, 0.6); }
  let Lt = lightAt(p);
  var light = Lt.rgb * Lt.a;
  let base = s.appBg.rgb * (1.0 - alpha);
  if (s.style > 0.5) {
    // light theme: a coloured filter over the page's own colour, transparent where nothing changes (see fluid.js)
    let T = min((1.0 - alpha) * lightTint(light), vec3f(1.0));
    let tmin = min(T.r, min(T.g, T.b));
    return vec4f(s.appBg.rgb * (T - tmin), 1.0 - tmin);
  }
  light = (1.0 - exp(-light)) * select(1.0, 0.8 + 0.25 * s.hdr, s.hdr > 1.0);
  return vec4f(base + light, 1.0); // the screen itself, shaded then lit
}
// the room above the glass, as its polished surface reflects it: neutral white light only, the walls
// lit unevenly and brighter towards the horizon, a soft wide band all around, strongest on the lamp's
// side; soft = 1: satin glass blurs it all (see fluid.js; the azimuth is taken "y up")
fn roomAt(R: vec3f, L: vec3f, ld: vec2f, k: f32, soft: f32) -> vec3f {
  let h = normalize(R.xy + vec2f(1e-5));
  let c = dot(h, ld); let fr = max(c, 0.0); let bk = max(-c, 0.0); let az = atan2(-h.y, h.x);
  let base = select(0.62 + 0.3 * max(R.z, 0.0), 0.16 + 0.22 * max(R.z, 0.0), s.darkTheme > 0.5);
  let dl = max(dot(R, L), 0.0);
  let lamp = (pow(dl, mix(120.0, 24.0, soft)) * mix(4.0, 2.0, soft) + pow(dl, mix(1500.0, 160.0, soft)) * mix(30.0, 4.0, soft)) * k;
  let W = normalize(vec3f(-ld * 0.92, 0.38));
  let win = pow(max(dot(R, W), 0.0), mix(28.0, 10.0, soft)) * 2.0;
  let walls = (0.25 + 1.6 * fr * fr) * (1.0 - smoothstep(0.0, 0.7, R.z));
  let t = (R.z - 0.15) / mix(0.11, 0.25, soft);
  let uneven = 0.65 + 0.35 * (0.5 + 0.5 * sin(2.0 * az + 0.7)) * (0.6 + 0.4 * sin(5.0 * az + 2.3));
  let band = exp(-t * t) * (0.5 + 3.5 * fr * fr * fr * fr + 1.2 * bk * bk * bk * bk) * uneven * (1.0 - 0.5 * soft);
  return vec3f(1.0, 0.985, 0.965) * (base + lamp + win + walls + band);
}
// Prisme's polished, rounded edge mirrors the same room without its band: glossy lines of the lamp and
// of the window stretched along the edge, the walls a gentle gradient (see fluid.js)
fn prismeRoom(R: vec3f, L: vec3f, ld: vec2f, k: f32) -> vec3f {
  let fr = max(dot(normalize(R.xy + vec2f(1e-5)), ld), 0.0);
  let base = select(0.66 + 0.25 * max(R.z, 0.0), 0.18 + 0.2 * max(R.z, 0.0), s.darkTheme > 0.5);
  let walls = (0.3 + 1.2 * fr * fr) * (1.0 - smoothstep(0.0, 0.85, R.z));
  let dl = max(dot(R, L), 0.0);
  let lamp = (pow(dl, 24.0) * 2.5 + pow(dl, 200.0) * 14.0) * k;
  let W = normalize(vec3f(-ld * 0.92, 0.38));
  let win = pow(max(dot(R, W), 0.0), 10.0) * 2.5;
  return vec3f(1.0, 0.985, 0.965) * (base + walls + lamp + win);
}
// the glass slabs, in their five looks (see fluid.js): Optique, Liquide (the earlier glass), D\xE9poli,
// Cristal, Prisme (after iOS 26's Liquid Glass, floating above the screen)
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let p = i.pos.xy - s.off;
  let uv = p / s.res;
  let sd = nearest(p); let d = -sd;
  if (s.glass < 0.5) {
    if (d < -0.5) { return vec4f(0.0); }
    let a0 = clamp(d + 0.5, 0.0, 1.0);
    return vec4f(under(uv) * a0, a0);
  }
  if (d < -0.5) { return table(p, sd); }
  let R = selRect;
  let ra = R.xy * s.res; let rb = R.zw * s.res; let hs = (rb - ra) * 0.5;
  let bev = min(s.bevel, min(hs.x, hs.y) * 0.98); let th = s.thickness * bev / s.bevel;
  let nIn = -normalOut(p);
  // the edge: rounded (superellipse of exponent look.y) or a flat facet (Cristal)
  let x = clamp(d / bev, 0.0, 1.0); let w = 1.0 - x;
  var h = x; var dh = 1.0 - smoothstep(1.0 - 1.2 * s.dpr / bev, 1.0, x);
  if (s.look.y > 1.5) {
    let wp = pow(w, s.look.y);
    h = pow(max(1.0 - wp, 0.0), 1.0 / s.look.y);
    dh = 0.0;
    if (x < 1.0) { dh = pow(w, s.look.y - 1.0) * pow(max(1.0 - wp, 1e-4), 1.0 / s.look.y - 1.0); }
  }
  var grad = nIn * dh * th / bev;
  var H = th * h;
  var glow = 0.0;
  let R0 = 38.0 * s.dpr;
  for (var k = 0; k < 4; k = k + 1) {
    let tk = touchAt(k);
    if (tk.w <= 0.001) { continue; }
    let q = (p - tk.xy * s.res) / R0;
    let b = s.gel * tk.w * exp(-dot(q, q)) * th * 1.2;
    H = H + b; grad = grad - 2.0 * q / R0 * b;
    let q2 = (p - tk.xy * s.res) / (60.0 + 800.0 * tk.z);
    glow = glow + exp(-dot(q2, q2)) * tk.w * exp(-tk.z * 2.2);
  }
  let N = normalize(vec3f(-grad, 1.0));
  let I = vec3f(0.0, 0.0, -1.0);
  var col: vec3f;
  // (Prisme floats look.w thicknesses above the screen: its rim folds what lies further in)
  let prisme = abs(s.look.x - 4.0) < 0.5;
  if (length(grad) > 1e-4) {
    let Rr = refract(I, N, 1.0 / (1.5 - s.look.z)); let Rg = refract(I, N, 1.0 / 1.5); let Rb = refract(I, N, 1.0 / (1.5 + s.look.z));
    let mx = bev * select(1.3, 2.6, prisme); let Hr = select(H * s.look.w, H + th * s.look.w, prisme);
    let orr = clampLen(Rr.xy / max(-Rr.z, 0.15) * Hr, mx) / s.res;
    let org = clampLen(Rg.xy / max(-Rg.z, 0.15) * Hr, mx) / s.res;
    let orb = clampLen(Rb.xy / max(-Rb.z, 0.15) * Hr, mx) / s.res;
    col = vec3f(under(uv + orr).r, under(uv + org).g, under(uv + orb).b);
  } else { col = under(uv); }
  let L = normalize(vec3f(s.lightDir.x, -s.lightDir.y, max(s.lightZ, 0.05))); // light given "y up"; this shader runs "y down"
  let ld = normalize(L.xy + vec2f(1e-5));
  let kk = max(s.hdr, 1.0);
  let qc = (p - (ra + rb) * 0.5) / max(hs.x, hs.y);
  if (abs(s.look.x - 1.0) < 0.5) {
    // Liquide, the earlier glass (see fluid.js)
    let lean = length(N.xy);
    if (s.style < 0.5 || s.style > 1.5) {
      if (d < bev) { col = col + hazeAt(uv + nIn * bev * 0.5 / s.res) * lean * lean * 0.9; }
      col = col + hazeAt(uv) * 0.22;
    }
    col = col + mix(vec3f(1.0), select(s.accent.rgb, selFill.rgb, s.mode > 0.5), 0.35) * glow * 0.14 * max(kk * 0.8, 1.0);
    let F = 0.04 + 0.96 * pow(1.0 - clamp(N.z, 0.0, 1.0), 5.0);
    var c = 0.0;
    if (lean > 1e-4) { c = dot(N.xy / lean, ld) * smoothstep(0.0, 0.2, lean); }
    let front = max(c, 0.0); let back = max(-c, 0.0);
    let e = 2.0 * N.z * N.z - 1.0;
    let walls = 0.12 + 5.0 * front * front * front + 1.6 * back * back * back * back;
    var room = mix(walls, select(1.0, 0.45, s.darkTheme > 0.5), smoothstep(0.0, 0.8, e));
    room = room * mix(0.35, 1.0, smoothstep(-0.95, -0.7, e));
    let eg = (e + 0.3 - 0.6 * (L.z - 0.55)) / 0.16;
    let glint = exp(-eg * eg) * pow(front, 8.0) * 0.55;
    let xb = (x - 0.14) / 0.12;
    let through = exp(-xb * xb) * back * back * back * back * 0.2;
    let sb = (dot(qc + s.slide, ld) - 0.5) / 0.24;
    let win = exp(-sb * sb) * select(0.07, 0.035, s.darkTheme > 0.5);
    let prism = mix(vec3f(1.0), 0.5 + 0.5 * cos(6.2832 * (x * 5.0 + vec3f(0.0, 0.33, 0.67))), 0.3 * min(glint * 3.0, 1.0));
    col = col * (1.0 - F) + vec3f(1.0, 0.985, 0.96) * ((F * room + through) * mix(1.0, kk, 0.25) + glint * prism * kk) + vec3f(win);
  } else {
    // the clear plates: no light of their own, no colour; the room above and the screen around (see fluid.js)
    var soft = 0.0;
    if (abs(s.look.x - 2.0) < 0.5) { soft = 1.0; } else if (abs(s.look.x - 3.0) < 0.5) { soft = 0.35; }
    let lean = length(N.xy);
    let Rf = vec3f(2.0 * N.z * N.xy, 2.0 * N.z * N.z - 1.0);
    let F0 = select(0.035, 0.05, abs(s.look.x - 3.0) < 0.5);
    let F = F0 + (1.0 - F0) * pow(1.0 - clamp(N.z, 0.0, 1.0), 5.0);
    var env: vec3f;
    if (prisme) { env = prismeRoom(Rf, L, ld, kk); } else { env = roomAt(Rf, L, ld, kk, soft); }
    if (Rf.z < 0.08) {
      var dir = -nIn;
      if (lean > 1e-4) { dir = N.xy / lean; }
      let below = screenAt(p + dir * min(H * length(Rf.xy) / max(-Rf.z, 0.08), 60.0 * s.dpr));
      let hz = vec3f(normalize(Rf.xy + vec2f(1e-5)), 0.0);
      var horizon: vec3f;
      if (prisme) { horizon = prismeRoom(hz, L, ld, kk); } else { horizon = roomAt(hz, L, ld, kk, soft); }
      env = mix(mix(below, horizon, 0.5), env, smoothstep(-0.08, 0.08, Rf.z));
    }
    if (s.style < 0.5 || s.style > 1.5) {
      // light leaks: the ink's light caught in the glass glows softly out of the rounded edge; frosted
      // glass blurs what it shows into a milky glow, tinted by the light around it (see fluid.js)
      if (d < bev) { col = col + hazeAt(uv + nIn * bev * 0.4 / s.res) * lean * lean * select(0.75, 0.55, soft > 0.5); }
      if (soft > 0.5) {
        let lt = lightAt(p).rgb;
        let lum = max(lt.r, max(lt.g, lt.b));
        col = mix(col, vec3f(dot(col, vec3f(0.3, 0.59, 0.11))), 0.2) + mix(vec3f(1.0), lt / max(lum, 1e-3), 0.55) * (select(0.0, 0.05, s.darkTheme > 0.5) + 0.3 * (1.0 - exp(-lum)));
      }
    } else if (soft > 0.5) { col = mix(col, vec3f(1.0), 0.1); }  // (frosted glass on a pale page: a white veil)
    let sb = (dot(qc + s.slide, ld) - 0.5) / 0.3;
    let win = exp(-sb * sb) * select(0.04, 0.018, s.darkTheme > 0.5);
    col = col * (1.0 - F) + F * env * select(1.0, 2.2, abs(s.look.x - 3.0) < 0.5) + vec3f(win);
    // Prisme: the rounded edge gathers the room's light towards its silhouette (a soft gradient that
    // follows the curve, brighter on the lamp's side), and the lamp spreads a soft sheen where it faces it
    if (prisme) {
      var fz = 0.0;
      if (lean > 1e-4) { fz = max(dot(N.xy / lean, ld), 0.0); }
      col = col + vec3f(1.0, 0.985, 0.965) * (lean * lean * select(0.14, 0.12, s.darkTheme > 0.5) * (0.45 + 1.1 * fz * fz) * mix(1.0, kk, 0.25)
                                              + pow(max(dot(Rf, L), 0.0), 6.0) * 0.06 * kk * smoothstep(0.0, 0.3, lean));
    }
  }
  let al = clamp(d + 0.5, 0.0, 1.0);
  var o = vec4f(col * al, al);
  if (al < 1.0) { o = o + table(p, max(sd, 0.01)) * (1.0 - al); }
  return o;
}`,Ai=`@group(0) @binding(2) var dye: texture_2d<f32>;
@group(0) @binding(3) var bloom: texture_2d<f32>;
@group(0) @binding(4) var keys: texture_2d<f32>;
@group(0) @binding(5) var sn: sampler;
@group(0) @binding(6) var keyLit: texture_2d<f32>;
@group(0) @binding(7) var srcT: texture_2d<f32>;
@group(0) @binding(8) var haze: texture_2d<f32>;
`,Wr=()=>Gs+Ai+Ws+`@fragment fn fs(i: VO) -> @location(0) vec4f { return aroundLight(i.pos.xy * s.lightScale - s.off); }
`,Vr=()=>Gs+Ai+Ws+`@fragment fn fs(i: VO) -> @location(0) vec4f {
  let k = i32(floor(i.pos.x)); let qd = k % 4;
  let r0 = vec2f(f32(qd % 2), f32(qd / 2)) * 0.5;
  var cs = vec3f(0.0); var ps = vec2f(0.0); var ws = 0.0;
  for (var j = 0; j < 6; j = j + 1) {
    for (var n = 0; n < 6; n = n + 1) {
      let uv = r0 + (vec2f(f32(n), f32(j)) + 0.5) / 12.0;
      let g = glowAt(uv); let w = max(g.r, max(g.g, g.b));
      cs = cs + g * w; ps = ps + uv * w; ws = ws + w;
    }
  }
  if (k < 4) { return vec4f(ps / max(ws, 1e-4), 1.0 - exp(-ws * 0.25), ws); }
  let c = cs / max(ws, 1e-4);
  return vec4f(c / max(max(c.r, max(c.g, c.b)), 1e-4), 1.0);
}
`,Yr=()=>Gs+Ai+Ws+`@fragment fn fs(i: VO) -> @location(0) vec4f {
  let c0 = floor(i.pos.xy);
  var sum = vec3f(0.0);
  for (var j = 0; j < 8; j = j + 1) {
    for (var n = 0; n < 8; n = n + 1) { sum = sum + glowAt((c0 + (vec2f(f32(n), f32(j)) + 0.5) / 8.0) / s.hazeRes); }
  }
  return vec4f(sum / 64.0, 1.0);
}
`,Kr=()=>GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST,ms=256,vs=class o extends Xt{static supported(){return typeof navigator<"u"&&!!navigator.gpu}static async create(){try{let e=new o;return await e.initGPU(),e.ok?e:null}catch(e){return console.warn("WebGPU indisponible, repli sur WebGL",e),null}}init(){}async initGPU(){this.cfg={...Ei},this.ext={linear:!0};let e=await navigator.gpu.requestAdapter();if(!e)return;let t=await e.requestDevice();this.device=t,t.lost.then(()=>{this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let s=0;t.addEventListener("uncapturederror",p=>{console.warn("WebGPU",p.error&&p.error.message),++s>4&&this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let i=this.canvas.getContext("webgpu");if(!i)return;this.ctx=i,this.format="rgba16float";try{i.configure({device:t,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:"extended"},alphaMode:"premultiplied"}),this.p3=!0;let p=i.getConfiguration?i.getConfiguration():null;this.extended=p?!!(p.toneMapping&&p.toneMapping.mode==="extended"):!0,this.rangeOn=!0}catch{this.format=navigator.gpu.getPreferredCanvasFormat(),i.configure({device:t,format:this.format,alphaMode:"premultiplied"}),this.extended=!1,this.p3=!1}this.hdrScreen=this.extended&&matchMedia("(dynamic-range: high)").matches,this.lin=t.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.near=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.rep=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat"}),this.ubuf=t.createBuffer({size:ms*512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.staging=new ArrayBuffer(ms*512),this.f32=new Float32Array(this.staging),this.uOff=0;let a={},r=[],n=(p,m,f,b)=>{let y=t.createShaderModule({code:m});y.getCompilationInfo&&y.getCompilationInfo().then(T=>{for(let E of T.messages)E.type==="error"&&r.push(`${p}:${E.lineNum}: ${E.message}`)}),t.pushErrorScope("validation");let x=t.createRenderPipeline({layout:"auto",vertex:{module:y,entryPoint:"vs"},fragment:{module:y,entryPoint:"fs",targets:[{format:f,blend:b}]},primitive:{topology:"triangle-list"}});return t.popErrorScope().then(T=>{T&&r.push(`${p}: ${T.message}`)}),x},l={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},c=p=>Hr+jr[p];a.copyRGBA=n("copy",c("copy"),"rgba16float"),a.copyRG=n("copy",c("copy"),"rg16float"),a.clear=n("clear",c("clear"),"r16float"),a.splatRG=n("splat",c("splat"),"rg16float"),a.splatRGBA=n("splat",c("splat"),"rgba16float"),a.advectRG=n("advect",c("advect"),"rg16float"),a.advectRGBA=n("advect",c("advect"),"rgba16float"),a.divergence=n("div",c("divergence"),"r16float"),a.curl=n("curl",c("curl"),"r16float"),a.vorticity=n("vort",c("vorticity"),"rg16float"),a.pressure=n("pressure",c("pressure"),"r16float"),a.gradient=n("grad",c("gradient"),"rg16float"),a.bloomPre=n("bloomPre",c("bloomPre"),"rgba16float"),a.bloomBlur=n("bloomBlur",c("bloomBlur"),"rgba16float"),a.bloomAdd=n("bloomAdd",c("bloomBlur"),"rgba16float",l),a.sunMask=n("sunMask",c("sunMask"),"rgba16float"),a.sun=n("sun",c("sun"),"r16float"),a.blur=n("blur",c("blur"),"r16float"),a.composite=n("composite",Gr(),this.format),a.light=n("light",Wr(),"rgba16float"),a.sources=n("sources",Vr(),"rgba16float"),a.haze=n("haze",Yr(),"rgba16float"),this.pipes=a,this.layouts=new Map;let d=new Uint8Array(4096*4),h=1234567;for(let p=0;p<d.length;p++)h=h*1103515245+12345&2147483647,d[p]=h>>23;this.dither=this.texFromData(64,64,d),this.maskAll=this.texFromData(1,1,new Uint8Array([1,0,0,255])),this.maskSim=this.maskDye=this.maskAll,this.keyTex=this.texFromData(1,1,new Uint8Array([0,0,0,255])),this.keys=null,this.scene=null,this.resetLight(),this.dye=null,this.velocity=null,this.ok=!0,t.pushErrorScope("validation");try{this.canvas.width=96,this.canvas.height=128,this.hostW=96,this.hostH=128,this.initBuffers(),this.splat(.5,.5,.01,.01,{r:.3,g:.2,b:.1}),this.scene={glass:!0},this.applyInputs(),this.step(1/60),this.render(!1),this.scene=null}catch(p){r.push("dry run: "+p.message)}let v=await t.popErrorScope();if(v&&r.push(v.message),await t.queue.onSubmittedWorkDone(),await new Promise(p=>setTimeout(p,0)),this.queue=[],this.dye=null,this.canvas.width=2,this.canvas.height=2,this.hostW=0,r.length){console.warn("MOTIF WebGPU: repli sur WebGL \u2014",r.join(" | ")),this.problems=r,this.ok=!1;return}}tex(e,t,s){let i=this.device.createTexture({size:[e,t],format:s,usage:Kr()});return{texture:i,view:i.createView(),width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,format:s}}double(e,t,s){let i=this.tex(e,t,s),a=this.tex(e,t,s);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return i},set read(r){i=r},get write(){return a},set write(r){a=r},swap(){let r=i;i=a,a=r}}}texFromData(e,t,s){let i=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return this.device.queue.writeTexture({texture:i},s,{bytesPerRow:e*4},[e,t]),{texture:i,view:i.createView(),width:e,height:t}}texFromCanvas(e){let t=this.device.createTexture({size:[e.width,e.height],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return this.device.queue.copyExternalImageToTexture({source:e},{texture:t},[e.width,e.height]),{texture:t,view:t.createView(),width:e.width,height:e.height}}initBuffers(){let e=this.cfg,t=this.res(e.SIM_RESOLUTION),s=this.res(e.DYE_RESOLUTION);for(let r of[this.dye,this.velocity,this.pressure])r&&(r.read.texture.destroy(),r.write.texture.destroy());for(let r of[this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp,...this.bloomFbos||[]])r&&r.texture.destroy();this.dye=this.double(s.width,s.height,"rgba16float"),this.velocity=this.double(t.width,t.height,"rg16float"),this.divergence=this.tex(t.width,t.height,"r16float"),this.curl=this.tex(t.width,t.height,"r16float"),this.pressure=this.double(t.width,t.height,"r16float");let i=this.res(e.BLOOM_RESOLUTION);this.bloom=this.tex(i.width,i.height,"rgba16float"),this.bloomFbos=[];for(let r=0;r<e.BLOOM_ITERATIONS;r++){let n=i.width>>r+1,l=i.height>>r+1;if(n<2||l<2)break;this.bloomFbos.push(this.tex(n,l,"rgba16float"))}let a=this.res(e.SUNRAYS_RESOLUTION);this.sunrays=this.tex(a.width,a.height,"r16float"),this.sunraysTemp=this.tex(a.width,a.height,"r16float"),this.rebuildMasks(),this.zero()}rebuildMasks(){for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&t.texture.destroy();if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}let e=this.maskCanvas||(this.maskCanvas=document.createElement("canvas"));this.maskSim=this.texFromCanvas(ds(e,this.keys,this.velocity.width,this.velocity.height)),this.maskDye=this.texFromCanvas(ds(e,this.keys,this.dye.width,this.dye.height))}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,s=this.hostH,i=e.sig+"|"+t+"x"+s;this.keyTexSig!==i&&(this.keyTex&&this.keyTex.texture.destroy(),this.keyTex=this.texFromCanvas(Os(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,s)),this.keyTexSig=i)}get enc(){return this._enc||(this._enc=this.device.createCommandEncoder())}uniforms(e,t=1){let s=this.uOff;if(this.uOff+=ms*t,this.uOff>this.staging.byteLength)throw new Error("uniform space");let i=this.f32,a=s/4;return i.fill(0,a,a+ms*t/4),e(i,a),{buffer:this.ubuf,offset:s,size:ms*t}}uni(e){return this.uniforms((t,s)=>{e.texel&&(t[s]=e.texel[0],t[s+1]=e.texel[1]),e.point&&(t[s+4]=e.point[0],t[s+5]=e.point[1]),t[s+6]=e.aspect||0,t[s+7]=e.radius||0,e.color&&(t[s+8]=e.color[0],t[s+9]=e.color[1],t[s+10]=e.color[2]),t[s+12]=e.a||0,t[s+13]=e.b||0,t[s+14]=e.c||0,t[s+15]=e.d||0,e.curve&&(t[s+16]=e.curve[0],t[s+17]=e.curve[1],t[s+18]=e.curve[2])})}pass(e,t,s,i,a){let r=this.layouts.get(e)||(this.layouts.set(e,e.getBindGroupLayout(0)),this.layouts.get(e)),n=[{binding:0,resource:s},{binding:1,resource:this.lin}];i.forEach((d,h)=>{d&&n.push({binding:2+h,resource:d})});let l=this.device.createBindGroup({layout:r,entries:n}),c=this.enc.beginRenderPass({colorAttachments:[{view:t.view||t,loadOp:a?"load":"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]});c.setPipeline(e),c.setBindGroup(0,l),c.draw(3),c.end()}flush(){this._enc&&(this.device.queue.writeBuffer(this.ubuf,0,this.staging,0,this.uOff),this.device.queue.submit([this._enc.finish()]),this._enc=null,this.uOff=0)}zero(){if(this.dye){for(let e of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp])this.enc.beginRenderPass({colorAttachments:[{view:e.view,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]}).end();this.flush()}}clear(){!this.ok||!this.dye||(this.zero(),this.requestRender())}applyInputs(){let e=this.queue;this.queue=[];for(let[t,s,i,a,r,n,l]of e)this.splatNow(t,s,i*this.cfg.SPLAT_FORCE*Xr(this.aspect),-a*this.cfg.SPLAT_FORCE*$r(this.aspect),r,n,l?0:this.keyAt(t,s))}splatNow(e,t,s,i,a,r,n){let l=this.cfg.SPLAT_RADIUS*r/100;this.aspect>1&&(l*=this.aspect);let c={point:[e,t],aspect:this.aspect,radius:l,a:n?n/255:0},d=this.velocity,h=this.dye;this.pass(this.pipes.splatRG,d.write,this.uni({...c,color:[s,i,0]}),[d.read.view,this.maskSim.view,this.near]),d.swap(),this.pass(this.pipes.splatRGBA,h.write,this.uni({...c,color:[a.r*this.gain,a.g*this.gain,a.b*this.gain]}),[h.read.view,this.maskDye.view,this.near]),h.swap()}step(e){let t=this.pipes,s=this.velocity,i=this.cfg,a=[s.texelSizeX,s.texelSizeY];this.pass(t.curl,this.curl,this.uni({texel:a}),[s.read.view]),this.pass(t.vorticity,s.write,this.uni({texel:a,a:e,c:i.CURL}),[s.read.view,this.curl.view]),s.swap(),this.pass(t.divergence,this.divergence,this.uni({texel:a}),[s.read.view,this.maskSim.view,this.near]),this.pass(t.clear,this.pressure.write,this.uni({a:i.PRESSURE}),[this.pressure.read.view]),this.pressure.swap();let r=this.uni({texel:a});for(let n=0;n<i.PRESSURE_ITERATIONS;n++)this.pass(t.pressure,this.pressure.write,r,[this.pressure.read.view,this.divergence.view,this.maskSim.view,this.near]),this.pressure.swap();this.pass(t.gradient,s.write,this.uni({texel:a}),[this.pressure.read.view,s.read.view,this.maskSim.view,this.near]),s.swap(),this.pass(t.advectRG,s.write,this.uni({texel:a,a:e,b:i.VELOCITY_DISSIPATION}),[s.read.view,s.read.view,this.maskSim.view,this.near]),s.swap(),this.pass(t.advectRGBA,this.dye.write,this.uni({texel:a,a:e,b:i.DENSITY_DISSIPATION}),[s.read.view,this.dye.read.view,this.maskDye.view,this.near]),this.dye.swap()}applyBloom(){let e=this.pipes,t=this.cfg;if(this.bloomFbos.length<2)return;let s=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;this.pass(e.bloomPre,this.bloom,this.uni({curve:[t.BLOOM_THRESHOLD-s,s*2,.25/s],a:t.BLOOM_THRESHOLD}),[this.dye.read.view]);let i=this.bloom;for(let a of this.bloomFbos)this.pass(e.bloomBlur,a,this.uni({texel:[i.texelSizeX,i.texelSizeY],a:1}),[i.view]),i=a;for(let a=this.bloomFbos.length-2;a>=0;a--){let r=this.bloomFbos[a];this.pass(e.bloomAdd,r,this.uni({texel:[i.texelSizeX,i.texelSizeY],a:1}),[i.view],!0),i=r}this.pass(e.bloomBlur,this.bloom,this.uni({texel:[i.texelSizeX,i.texelSizeY],a:t.BLOOM_INTENSITY*(1+this.boost*.8)}),[i.view])}applySunrays(){let e=this.pipes;this.pass(e.sunMask,this.dye.write,this.uni({}),[this.dye.read.view]),this.pass(e.sun,this.sunrays,this.uni({a:this.cfg.SUNRAYS_WEIGHT}),[this.dye.write.view]),this.pass(e.blur,this.sunraysTemp,this.uni({texel:[this.sunrays.texelSizeX,0]}),[this.sunrays.view]),this.pass(e.blur,this.sunrays,this.uni({texel:[0,this.sunraysTemp.texelSizeY]}),[this.sunraysTemp.view])}setDisplay(){}setExtended(e){if(!(!this.ctx||this.format!=="rgba16float"||this.rangeOn===e)){this.rangeOn=e;try{this.ctx.configure({device:this.device,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:e?"extended":"standard"},alphaMode:"premultiplied"})}catch{}this.requestRender()}}ensureKeyLit(){this.keyLit||(this.keyLit=new Uint8Array(256)),this.keyLitTex||(this.keyLitTex=this.texFromData(64,1,this.keyLit),this.keyLitDirty=!1),this.keyLitDirty&&(this.device.queue.writeTexture({texture:this.keyLitTex.texture},this.keyLit,{bytesPerRow:256},[64,1]),this.keyLitDirty=!1)}ensureHazeTex(){let e=this.res(16),t=this.hazeTex;return t&&t.width===e.width&&t.height===e.height?t:(t&&t.texture.destroy(),this.hazeTex=this.tex(e.width,e.height,"rgba16float"),this.hazeTex)}ensureLightTex(e,t){let s=Math.max(2,Math.ceil(e/2)),i=Math.max(2,Math.ceil(t/2)),a=this.lightTex;return a&&a.width===s&&a.height===i?a:(a&&a.texture.destroy(),this.lightTex=this.tex(s,i,"rgba16float"),this.lightTex)}render(e){if(!this.ok||!this.dye)return;let t=this.cfg;e||(t.BLOOM&&this.applyBloom(),t.SUNRAYS&&this.applySunrays()),this.ensureKeyTex();let s=this.scene||{};this.stepLight();let i=this.hostW,a=this.hostH,r=this.dpr||1,n=this.hdrScreen&&s.hdr||1,l=this.slabData(!1),c=this.canvas.width,d=this.canvas.height,h=s.glass?this.ensureLightTex(c,d):null,v=this.ensureHazeTex(),p=js(s),m=this.uniforms((b,y)=>{let x=(E,O)=>{for(let j=0;j<O.length;j++)b[y+E+j]=O[j]};x(0,[i,a]),x(2,[this.light[0],this.light[1]]),x(4,s.bgTop||[.1,.11,.14]),x(8,s.bgBot||[.07,.075,.094]),x(12,s.accent||[.8,.9,.3]),x(16,s.sep||[1,1,1,.06]),(s.kinds||[]).forEach((E,O)=>x(20+O*4,E)),x(44,[i/64,a/64]),x(46,[1/i,1/a]),x(48,[(s.sepPx||1)*r,s.keys?1:0,s.kind==="xy"?1:0,s.dark===!1?0:1,s.glass?1:0,(s.radius||20)*r,p.bevel*r,Math.min(1,this.boost)]),x(56,[n,t.BLOOM?1:0,t.SUNRAYS?1:0,t.SHADING?1:0]),b.set(this.touchUniforms(!1),y+60),x(76,[p.thick*r,this.gelOn===!1?0:s.gel??1,h?c/h.width:1,h?d/h.height:1]),b.set(l.slabs,y+80),b.set(l.fills,y+112),b.set(this.meters,y+144),x(152,[this.off[0],this.off[1],this.slide[0],-this.slide[1]]),x(156,[r,l.n,s.kind==="mix"?1:0,this.light[2],s.spill||0,s.shadow||0,c,d]),x(164,s.surf||[.086,.09,.114]),x(168,this.screenColor(s.appBg));let T=this.obstacleData(!1);b.set(T.rects,y+172),x(236,[T.n,T.lightH,T.ctrlH,s.style||0]),b.set(T.radii,y+240),x(256,s.keyGlow||[1,1,1,0]),x(260,[p.id,p.p,p.disp,p.depth]),x(264,[v.width,v.height]),x(268,this.stage||[0,0,0,0])},5);this.ensureKeyLit();let f=this.ctx.getCurrentTexture().createView();if(h){let b=this.srcTex||(this.srcTex=this.tex(8,1,"rgba16float"));this.pass(this.pipes.sources,b,m,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.haze,v,m,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.light,h,m,[this.dye.read.view,this.bloom.view,this.keyTex.view,this.near,this.keyLitTex.view,b.view])}this.pass(this.pipes.composite,f,m,[this.dye.read.view,this.bloom.view,this.sunrays.view,this.dither.view,this.keyTex.view,this.near,this.rep,(h||this.dither).view,this.keyLitTex.view,null,v.view]),this.flush()}degrade(){this.slow=0;let e=this.cfg;e.SUNRAYS?e.SUNRAYS=!1:e.BLOOM?e.BLOOM=!1:e.SIM_RESOLUTION>64&&(e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.hostW=0)}},Xr=o=>o<1?o:1,$r=o=>o>1?1/o:1;var Di=[".parts .ptab",".inst .arrow",".inst .name",".nav button"],Qr={pad:[".controls .dial",".range",".timeline > *",...Di],xy:[".groups .grp",".autobar > *",...Di],mix:[".mixknobs .dial",".fader .m",...Di]},Oa=190,_t={layouts:0,paints:0,writes:0,items:0},Jr=o=>{let e=getComputedStyle(o).backgroundColor.match(/[\d.]+/g);return!!e&&(e.length<4||+e[3]>.02)},_a=o=>{let e=document.createElement("div");return e.className=o,e.setAttribute("aria-hidden","true"),e};function Ia(o){let e=[],t=null,s=[],i=Us,a={r:0,g:0,b:0,x:0,y:0,w:0},r=0,n=0,l=!1,c=1.6,d=null,h=0,v=[],p=0,m={sh:"0 0 0",hl:"255 255 255"},f=_a("spill-over"),b=()=>{for(let P of e){P.el.classList.remove("lit","solid");for(let X of["--e","--ux","--uy","--l"])P.el.style.removeProperty(X)}f.replaceChildren(),e=[]},y=new MutationObserver(P=>{if(!l||!d||h)return;let X=N=>N.target===f;P.some(N=>!X(N)&&(N.type==="attributes"||[...N.addedNodes].some(Y=>Y.nodeType===1)))&&(h=setTimeout(()=>{h=0,d&&x.layout(d.el,d.kind)},160))}),x={enable(P){l=P,document.documentElement.toggleAttribute("data-spill",P),P?(f.parentNode!==o&&o.append(f),y.observe(o,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["aria-selected","aria-pressed","disabled"]}),y.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),document.fonts&&document.fonts.ready.then(()=>{l&&d&&x.layout(d.el,d.kind)})):(y.disconnect(),b(),f.remove(),d=null,a={r:0,g:0,b:0,x:0,y:0,w:0},v=[],x.onObstacles([]),x.onSources([]))},setPower(P){c=P},setHeight(P){i=P},onObstacles(){},onSources(){},layout(P,X){if(_t.layouts++,b(),t=null,d=null,!l||!P||!P.isConnected){x.onObstacles([]);return}d={el:P,kind:X},t=P.getBoundingClientRect();let N=o.getBoundingClientRect();m=document.documentElement.dataset.theme==="light"?{sh:"70 48 12",hl:"255 255 255"}:{sh:"0 0 0",hl:"255 255 255"};let Y=(X==="mix"?[...P.querySelectorAll(".fader")]:[P]).map(U=>U.getBoundingClientRect()),F=U=>Y.some(_=>U.left<_.right&&U.right>_.left&&U.top<_.bottom&&U.bottom>_.top),he=[];s=[];for(let U of Qr[X]||[])for(let _ of o.querySelectorAll(U)){let Z=_.getBoundingClientRect();if(!Z.width)continue;let ue=Math.max(0,t.left-Z.right,Z.left-t.right),$=Math.max(0,t.top-Z.bottom,Z.top-t.bottom);if(Math.hypot(ue,$)>Oa*2.5)continue;let Le=Jr(_);_.classList.toggle("solid",Le);let ne={el:_,r:Z,solid:Le,ro:"",ang:"",te:-1,ta:0};if(Le){let Ne={left:`${Z.left-N.left}px`,top:`${Z.top-N.top}px`,width:`${Z.width}px`,height:`${Z.height}px`,borderRadius:getComputedStyle(_).borderRadius};ne.rl=_a(""),Object.assign(ne.rl.style,Ne),ne.rl.style.setProperty("--hl",m.hl),ne.rl.style.setProperty("--sh",m.sh),f.append(ne.rl),F(Z)||(he.push({d:Math.hypot(ue,$),r:[Z.left-t.left,Z.top-t.top,Z.right-t.left,Z.bottom-t.top,parseFloat(getComputedStyle(_).borderTopLeftRadius)||0]}),s.push(ne))}e.push(ne)}_t.items=e.length,x.onObstacles(he.sort((U,_)=>U.d-_.d).slice(0,16).map(U=>U.r.map(_=>Math.round(_*10)/10))),a.w>0&&T()},emit(P,X=1,N,Y){if(!l)return;let F=P.r*X,he=P.g*X,U=P.b*X,_=F+he+U;a.r+=F,a.g+=he,a.b+=U,N!==void 0&&_>0&&(a.x+=N*_,a.y+=Y*_,a.w+=_,E(N,Y,_,F,he,U)),T()}};function T(){r||(n=performance.now(),r=requestAnimationFrame(O))}function E(P,X,N,Y,F,he){let U=t?t.height/t.width:1.4,_=null,Z=1/0;for(let ue of v){let $=Math.hypot(ue.x-P,(ue.y-X)*U);$<Z&&(Z=$,_=ue)}if(_&&(Z<.22||v.length>=4)){let ue=_.e+N;_.x=(_.x*_.e+P*N)/ue,_.y=(_.y*_.e+X*N)/ue,_.e=ue,_.r+=Y,_.g+=F,_.b+=he}else v.push({x:P,y:X,e:N,r:Y,g:F,b:he})}function O(P){r=0;let X=Math.min(.1,(P-n)/1e3);n=P;let N=Math.exp(-X/.28);for(let U in a)a[U]*=N;let Y=a.r+a.g+a.b,F=1-Math.exp(-Y*.45),he=Math.exp(-X/.45);for(let U of v)U.e*=he,U.r*=he,U.g*=he,U.b*=he;v=v.filter(U=>U.e>.01),(v.length||p)&&(p=v.length,x.onSources(v.map(U=>{let _=Math.max(U.r,U.g,U.b,1e-6);return[U.x,U.y,1-Math.exp(-U.e*.5),U.r/_,U.g/_,U.b/_]}))),t&&V(F<.01&&!v.length?0:1),(F>=.01||v.length)&&(r=requestAnimationFrame(O))}let j=(P,X,N,Y,F)=>{P[X]!==F&&(P[X]=F,N.style[Y]=F)};function le(P,X,N){let Y=X.x-P.x,F=X.y-P.y;Math.abs(Y)<.001&&(Y=.001),Math.abs(F)<.001&&(F=.001);let he=1;for(let U of s){if(U===N)continue;let _=U.r,Z=(_.left-P.x)/Y,ue=(_.right-P.x)/Y,$=(_.top-P.y)/F,Le=(_.bottom-P.y)/F,ne=Math.max(Math.min(Z,ue),Math.min($,Le),0),Ne=Math.min(Math.max(Z,ue),Math.max($,Le),1);if(ne<Ne){let S=4.5*(1-Ne)+.15*i,q=zs*(1-Ne)-i,R=Math.min(1,Math.max(0,(q+S)/(2*S)));he*=R*R*(3-2*R)}}return .22+.78*he}function V(P){_t.paints++;let X=P?v.map(N=>({x:t.left+N.x*t.width,y:t.top+N.y*t.height,i:1-Math.exp(-N.e*.5)})):[];for(let N of e){let{r:Y}=N,F=Y.left+Y.width/2,he=Y.top+Y.height/2,U=0,_=0,Z=0,ue=0;for(let $ of X){let Le=Math.min(Math.max($.x,Y.left),Y.right),ne=Math.min(Math.max($.y,Y.top),Y.bottom),Ne=Math.hypot(Le-$.x,ne-$.y),S=$.i*(s.length?le($,{x:Le,y:ne},N):1)/(1+(Ne/Oa)**2),q=F-$.x,R=he-$.y,A=Math.hypot(q,R)||1;U+=S,_+=S*q/A,Z+=S*R/A,ue+=S*Ne}if(U>0){ue/=U;let $=Math.hypot(_,Z)||1;_/=$,Z/=$}else _=0,Z=1;if(U=Math.min(1,U*c),N.solid){if(j(N,"ro",N.rl,"opacity",U<.02?"0":Math.min(1,U*1.3).toFixed(2)),U>=.02){let $=`${Math.round(Math.atan2(_,-Z)*180/Math.PI)}deg`;$!==N.ang&&(N.ang=$,N.rl.style.setProperty("--ang",$),_t.writes++)}}else{let $=U<.03?0:Math.min(1,U),Le=Math.atan2(Z,_);if(Math.abs($-N.te)<.03&&Math.abs(Math.atan2(Math.sin(Le-N.ta),Math.cos(Le-N.ta)))<.06||(N.te=$,N.ta=Le,_t.writes++,N.el.classList.toggle("lit",$>0),!$))continue;let ne=N.el.style;ne.setProperty("--e",$.toFixed(2)),ne.setProperty("--ux",_.toFixed(2)),ne.setProperty("--uy",Z.toFixed(2)),ne.setProperty("--l",Math.min(2.2,.7+ue*.006).toFixed(2))}}}return x}var Ba={normal:1.6,intense:2.6,max:4},Fa={douce:.6,normale:1,forte:1.6,max:2.4},Zr=[3,6,10,15],Na={drum:28,bass:345,lead:78},za=[18,40,52,300],en=[322,190,160,272],tn={bass:322,lead:190},sn=[0,7,2,9,4,11,6,1,8,3,10,5],an=["optique","liquide","depoli","cristal","prisme"],Ua={douce:{cfg:{DENSITY_DISSIPATION:2.8,VELOCITY_DISSIPATION:.8,CURL:16,SPLAT_RADIUS:.18,BLOOM_INTENSITY:.3,BLOOM_THRESHOLD:.7,SUNRAYS_WEIGHT:.6},gain:.6,shake:0,rise:.01,dose:{down:.35,move:.1,kick:[.06,.2],snare:[.03,.14],hat:[.02,.05],perc:[.02,.06],note:[.1,.25],stir:[.07,.13]}},normale:{cfg:{DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,CURL:24,SPLAT_RADIUS:.22,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,SUNRAYS_WEIGHT:.8},gain:.7,shake:0,rise:.012,dose:{down:.55,move:.16,kick:[.12,.4],snare:[.06,.28],hat:[.03,.1],perc:[.04,.12],note:[.15,.45],stir:[.1,.2]}},spectaculaire:{cfg:{DENSITY_DISSIPATION:1.5,VELOCITY_DISSIPATION:.4,CURL:32,SPLAT_RADIUS:.26,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.72,SUNRAYS_WEIGHT:1},gain:.92,shake:1,rise:.016,dose:{down:.7,move:.2,kick:[.2,.5],snare:[.15,.4],hat:[.15,.05],perc:[.12,.3],note:[.2,.55],stir:[.15,.3]}}};function on(o,e,t){o=(o%360+360)%360/60;let s=Math.floor(o),i=o-s,a=t*(1-e),r=t*(1-i*e),n=t*(1-(1-i)*e),[l,c,d]=[[t,n,a],[r,t,a],[a,t,n],[a,r,t],[n,a,t],[t,a,r]][s%6];return{r:l,g:c,b:d}}function Ha(o,{pad:e,xy:t}){let s=null,i="none",a=()=>{let S=new Xt;S.ok&&(s=S,i="webgl")};o.settings.fluidEngine!=="webgl"&&vs.supported()?vs.create().then(S=>{S?(s=S,i=S.hdrScreen?"webgpu-hdr":"webgpu",S.onLost=()=>{s=null,a(),ne.place()}):a(),ne.place()}):setTimeout(()=>{a(),ne.place()});let r=matchMedia("(prefers-reduced-motion: reduce)"),n=o.settings,l=()=>!!n.fluid&&!r.matches,c=()=>!!n.glass,d=Ia(e.el.closest(".app")||document.querySelector(".app"));d.onObstacles=S=>{s&&s.setObstacles&&s.setObstacles(S)};let h=()=>document.documentElement.dataset.theme!=="light",v=()=>Ua[n.fluidStyle]||Ua.spectaculaire,p=null,m=null,f=()=>n.glassSpill===!1?0:Fa[n.glassLight]||Fa.forte,b=()=>an.includes(n.glassLook)?n.glassLook:"optique",y=()=>b()==="liquide",x=S=>{let q=n.fluidColors,R=S.part==="drum"||S.part===void 0;return q==="notes"?S.pc!==void 0?sn.indexOf(S.pc)*30:R?za[S.lane||0]:Na[S.part]:q==="arc"?performance.now()/1e3*48+(R?(S.lane||0)*24:S.x*70):q==="neon"?R?en[S.lane||0]:tn[S.part]+(S.x-.5)*30:R?za[S.lane||0]:Na[S.part]+(S.x-.5)*(S.part==="lead"?70:40)},T=(S,q)=>{let R=n.fluidColors==="notes"||n.fluidColors==="arc"||n.fluidColors==="neon",A=n.lightLook||"aquarelle",I=on(x(S),h()?n.fluidColors==="neon"?1:.82:A==="aquarelle"?.85:A==="vitrail"?.72:R?.42:.28,1),Q=q*v().gain,oe={r:I.r*Q,g:I.g*Q,b:I.b*Q};return d.emit(oe,1,S.x,S.y),oe},E=new Map,O=()=>n.fluidInk!=="maitrisee",j=(S,q=.8,R)=>{let A=v().dose[S],I=Array.isArray(A)?A[0]+A[1]*q:A;if(O())return I;if(n.fluidZone==="keys"&&o.ui.view==="pattern"&&(I*=S==="note"||S==="down"||S==="move"?.95:.6),R!==void 0){let Q=performance.now(),oe=E.get(R)||{e:0,t:Q};oe.e*=Math.exp(-(Q-oe.t)/550),oe.t=Q;let ie=I/(1+oe.e*2.2);return oe.e+=ie,E.set(R,oe),ie}return I},le=null,V=null,P=()=>{if(s)if(m&&p===m.el){let S=Y();s.setKeys(S.map(([q,R,A,I])=>({x0:q,y0:R,x1:A,y1:I})),"mix|"+JSON.stringify(S))}else if(n.fluidZone==="keys"&&o.ui.view==="pattern"){let S=e.keyLayout();s.setKeys(S.keys,S.sig)}else s.setKeys(null,"all")},X=S=>S===e.el?"pad":S===t.el?"xy":"mix",N=null,Y=()=>{if(N)return N;let S=m.el.getBoundingClientRect(),q=m.faders.map(R=>{let A=R.el.getBoundingClientRect();return[(A.left-S.left)/S.width,(A.top-S.top)/S.height,(A.right-S.left)/S.width,(A.bottom-S.top)/S.height].map(I=>Math.round(I*1e4)/1e4)});return S.width>0&&(N=q),q},F=S=>Math.pow(Math.max(0,(S+40)/46),1.6),he=()=>{let S=o.project.parts,q=m.faders.map(I=>{let Q=I.part==="drum"?S.drum.level[I.lane]:S[I.part].level,oe=I.part==="drum"?S.drum.mute[I.lane]:S[I.part].mute,ie=Wt(getComputedStyle(I.el).getPropertyValue("--fc")),we=oe?.3:1;return[ie[0]*we,ie[1]*we,ie[2]*we,Math.round(Math.min(1,F(Q))*1e3)/1e3]}),R=parseFloat(getComputedStyle(m.faders[0].el).borderTopLeftRadius)||16,A=xi({kind:"mix",keys:null,sig:"mix",el:m.el,glass:!0,hdr:Le(),slabs:Y(),fills:q,spill:f(),radius:R,look:n.lightLook,gel:.8,glassLook:b()});A.sig!==le&&(le=A.sig,V=A,s.setExtended&&s.setExtended($()),s.setScene(A))},U=()=>{let S=ie=>[.18+.64*ie,.72-.38*Math.sin(ie*Math.PI)],q=Ne(),R=26,A=0,[I,Q]=S(0);ne.press("preview",I,Q,"down");let oe=()=>{A++;let[ie,we]=S(A/R);if(A<R){ne.press("preview",ie,we,"move"),y()&&d.emit({r:q[0],g:q[1],b:q[2]},.18,ie,we),setTimeout(oe,40);return}ne.press("preview",ie,we,"up");let nt=performance.now(),ze=()=>{if(!s)return;let it=(performance.now()-nt)/1800;if(it>=1){s.aimReset();return}let at=Math.PI*(.72-.55*Math.sin(it*Math.PI));s.aim([Math.cos(at)*.78,Math.sin(at)*.78,.62]),requestAnimationFrame(ze)};requestAnimationFrame(ze)};setTimeout(oe,40)},_=[],Z=(S,q)=>{let R=performance.now(),A=_[S];A.e=(A.e||0)*Math.exp(-(R-(A.te||R))/420),A.te=R;let I=q/(1+A.e*3);return A.e+=I,I},ue=S=>{if(!s||!m||p!==m.el)return;let q=performance.now(),R=Y(),A=[];m.faders.forEach((I,Q)=>{let oe=I.part==="drum"?S.d[I.lane]:S[I.part],ie=Math.max(0,Math.min(1,(20*Math.log10(Math.max(oe||0,1e-5))+48)/48));A[Q]=ie;let we=_[Q]||(_[Q]={env:0,t:0}),nt=ie>we.env+.15&&ie>.45;if(we.env=Math.max(ie,we.env*.9),!l()||!R[Q])return;let[ze,it,at,ot]=R[Q],wt=(ze+at)/2,xs=at-ze,as=ot-it,Nt=ot-as*.06,os={part:I.part,lane:I.lane,x:wt,y:Nt},St=.012+.03*ie;nt?(s.splat(wt,Nt,(Math.random()-.5)*xs*.08,-St*2.2,T(os,Z(Q,.18+.4*ie)),.9),I.part==="drum"&&I.lane===0&&s.pulse(.7*ie),we.t=q):ie>.5&&q-we.t>160&&(s.splat(wt+(Math.random()-.5)*xs*.4,Nt,0,-St,T(os,Z(Q,.05*ie*ie)),.6),we.t=q)}),s.setMeters(A)},$=()=>h()||n.hdrLight!==!1,Le=()=>i==="webgpu-hdr"&&$()?Ba[n.fluidHdr]||Ba.intense:1,ne={get fluid(){return s},spillStats:_t,engine:()=>i,place(){let S=o.ui.view,q=S==="mix"&&!!m&&n.mixGlass!==!1,R=S==="pattern"?e.el:S==="tweaks"?t.el:q?m.el:null,A=!!s&&!!R&&(l()||c()||q);e.gpu=A&&R===e.el,t.gpu=A&&R===t.el,e.inkUnder=e.gpu&&l();for(let Q of[e.el,t.el,m&&m.el])Q&&Q.classList.toggle("gpu-host",A&&Q===R);for(let Q of[e.el,t.el])A&&Q===R&&c()?Q.dataset.glass=b():delete Q.dataset.glass;if(!A){s&&s.detach(),p=null,d.enable(!1),e.draw(),S==="tweaks"&&t.draw();return}s.setStyle(q?{...v().cfg,DENSITY_DISSIPATION:Math.max(2.6,v().cfg.DENSITY_DISSIPATION)}:v().cfg),s.gelOn=!r.matches,s.inkOn=l(),d.enable((c()||q)&&n.glassSpill!==!1),d.setPower(f());let I=Zr.includes(+n.ctrlHeight)?+n.ctrlHeight:6;d.setHeight(I),s.setControlHeight&&s.setControlHeight(I),requestAnimationFrame(()=>d.layout(R,X(R))),p!==R&&(s.clear(),p=R),s.attach(R),N=null,le=null,ne.syncScene(),P(),R===e.el?e.draw():R===t.el&&t.draw()},setMix(S){m=S,N=null,!S&&p&&p!==e.el&&p!==t.el&&(s&&s.detach(),p=null)},syncScene(){if(!p||!s)return;if(m&&p===m.el)return he();let S=p===e.el,q=S?e.keyLayout():null,R=xi({kind:S?"pad":"xy",keys:q&&q.keys,sig:q?q.sig:"xy",el:p,glass:!!n.glass,hdr:Le(),spill:f(),look:n.lightLook,gel:S&&e.piano?.4:1,glassLook:b()});R.sig!==le&&(le=R.sig,V=R,s.setExtended&&s.setExtended($()),s.setScene(R))},press(S,q,R,A){if(!(!s||!p||!s.press)&&(s.press(S,q,R,A),A==="down"&&c()&&y())){let I=Ne();d.emit({r:I[0],g:I[1],b:I[2]},.45,q,R)}},tilt(S,q){s&&(S===null?s.resetTilt():s.setTilt(S,q))},touch(S,q,R,A,I,Q,oe,ie){if(!p||!l())return;P();let we={part:S,lane:oe,pc:ie,x:q,y:R};if(Q==="down")s.burst(q,R,T(we,j("down",.8,"f"+Math.round(q*24))),.5,5,.7);else if(A||I){let nt=O()?1:Math.min(1,Math.max(.25,Math.hypot(A,I)*45)),ze=j("move",.8,"m"+S+(oe||0))*nt*(!O()&&n.fluidZone==="keys"?.7:1);s.splat(q,R,A,I,T(we,ze),1)}},note(S,q,R,A,I=.8,Q){if(!p||o.ui.view!=="pattern"||!l())return;P();let oe={part:S,lane:A,pc:Q,x:q,y:R};if(S==="drum"){let ze="d"+A;if(A===0)s.burst(q,R,T(oe,j("kick",I,ze)),1.2*I+.4,7,1.1),s.pulse(.8);else if(A===1){let it=T(oe,j("snare",I,ze));s.splat(q,R,.03,-.004,it,.8),s.splat(q,R,-.03,-.004,it,.8)}else if(A===2)s.splat(q,R,(Math.random()-.5)*.01,-.02,T(oe,j("hat",I,ze)),.35);else{let it=T(oe,j("perc",I,ze));for(let at=0;at<3;at++){let ot=at/3*Math.PI*2;s.splat(q+Math.cos(ot)*.03,R+Math.sin(ot)*.03,-Math.sin(ot)*.025,Math.cos(ot)*.025,it,.5)}}return}let ie=v().rise,we=n.fluidZone==="keys",nt=j("note",I,we?S+Math.round(q*24):S)*(!O()&&e.hasStrokes(S)?.5:1);s.splat(q,R,(Math.random()-.5)*ie*.8,-ie,T(oe,nt),.9)},stir(S,q,R,A,I,Q){if(!p||o.ui.view!=="tweaks"||!l())return;let oe=S==="bass"||S==="lead",ie={part:oe?S:"drum",lane:oe?0:+S.slice(1),x:q,y:R};s.splat(q,R,A,I,T(ie,Q?j("stir",1):j("stir",0)),Q?1:.7)},level(S){if(!(!p||!S.trig||!l()))for(let q=0;q<S.trig.length;q+=4)S.trig[q]!==0||S.trig[q+1]!==0||(s.pulse(.6),v().shake&&s.push(.5,1.02,0,-.05,5))},keyLights(S){s&&s.setKeyLights&&p===e.el&&s.setKeyLights(S)},mixLevels(S){S&&ue(S)},preview(){if(!p)return;if(!l()){U();return}if(P(),m&&p===m.el){let R=A=>({d:[0,1,2,3].map(I=>I===A?1:.01),bass:A===4?1:.01,lead:A===5?1:.01});for(let A=0;A<6;A++)setTimeout(()=>ue(R(A)),A*140);setTimeout(()=>ue({d:[1,.9,.8,.9],bass:1,lead:1}),950),setTimeout(()=>ue({d:[.01,.01,.01,.01],bass:.01,lead:.01}),1500);return}let S=o.ui.part,q=(R,A)=>setTimeout(A,R);if(S==="drum")[[0,0],[180,2],[360,1],[540,2],[720,0],[820,3],[900,2],[1080,1],[1260,0],[1350,3]].forEach(([R,A])=>q(R,()=>ne.note("drum",(A+.5)/4,.55+Math.random()*.25,A,.95)));else{let R=e.piano?e.pianoLayout().keys.filter(I=>!I.black):e.columns(),A=R.length;for(let I=0;I<8;I++){let Q=Math.min(A-1,Math.round(I/7*(A-1))),oe=R[Q],ie=e.piano?(oe.pos+.5)/e.pianoLayout().whites:(Q+.5)/A;q(I*150,()=>ne.note(S,ie,.8-I*.05,0,.95,e.pitchClass(oe.deg,oe.acc)))}q(1250,()=>{s.pulse(1),v().shake&&s.push(.5,1.02,0,-.06,5)})}}};r.addEventListener&&r.addEventListener("change",()=>ne.place()),document.addEventListener("visibilitychange",()=>{s&&(document.visibilityState!=="visible"?s.stop():p&&(s.requestRender(),d.layout(p,X(p))))}),window.addEventListener("resize",()=>{p&&(d.layout(p,X(p)),m&&p===m.el&&(N=null,P(),ne.syncScene()))});let Ne=()=>V&&V.accent||[.8,.9,.3];return ne}var ja=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,Ga=`#version 300 es
precision highp float;
uniform vec2 uRes;          // canvas px
uniform float uScale;       // canvas px per CSS px
uniform float uTime;
uniform vec4 uPad;          // the pad (CSS px: x, y, w, h)
uniform float uPadR;        // its corner radius (CSS px)
uniform float uStage;       // 1: draw the diorama on the pad
uniform vec4 uKeys[24];     // the pad's keys (normalized x0, y0, x1, y1, y down)
uniform vec4 uKeyInfo[24];  // x: 1 = black key (piano), y: lit (0..1)
uniform float uNKeys;
uniform vec3 uAccent;
uniform float uWatch;       // 0..1: the dolls are watching you
uniform float uBeat;        // 0..1, a pulse on each beat while playing
uniform float uCalm;        // 1: reduced motion
out vec4 o;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }
float sdRRect(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }

// a bat: a small body and two scalloped wings that flap (2D, y up)
float bat(vec2 p, float flap) {
  p.x = abs(p.x);
  float body = length(p * vec2(1.6, 1.0)) - 0.16;
  vec2 w = p - vec2(0.18, 0.0);
  float a = flap * 0.9;
  w = mat2(cos(a), -sin(a), sin(a), cos(a)) * w;
  float wing = max(abs(w.y + 0.05 * w.x) - 0.12 * (1.0 - w.x / 0.95), w.x - 0.95);
  wing = max(wing, -w.x);
  // scallops along the trailing edge
  float sc = length(vec2(mod(w.x, 0.3) - 0.15, w.y + 0.13)) - 0.11;
  wing = max(wing, -sc);
  float ears = length(p - vec2(0.07, 0.17)) - 0.05;
  return min(min(body, wing), ears);
}

// crooked crosses, a tombstone and a dead tree on the far hill (2D, units of the pad's height)
float graveyard(vec2 p, float w) {
  float d = 1e5;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float x = (0.1 + fi * 0.21) * w + 0.03 * sin(fi * 7.1);
    vec2 q = p - vec2(x, 0.0);
    float tilt = 0.12 * sin(fi * 3.7);
    q = mat2(cos(tilt), -sin(tilt), sin(tilt), cos(tilt)) * q;
    float h = 0.07 + 0.03 * fract(fi * 0.73);
    if (mod(fi, 2.0) < 1.0) {
      float v = sdRRect(q - vec2(0.0, h * 0.5), vec2(0.008, h * 0.5), 0.003);
      float hz = sdRRect(q - vec2(0.0, h * 0.68), vec2(0.03, 0.008), 0.003);
      d = min(d, min(v, hz));
    } else {
      float stone = sdRRect(q - vec2(0.0, h * 0.4), vec2(0.026, h * 0.4), 0.0);
      stone = min(stone, length(q - vec2(0.0, h * 0.8)) - 0.026);
      d = min(d, stone);
    }
  }
  // the dead tree: a trunk and a few crooked branches
  vec2 t = p - vec2(0.83 * w, 0.0);
  float trunk = sdRRect(t - vec2(0.004 * t.y * 10.0, 0.11), vec2(0.012 - t.y * 0.03, 0.11), 0.004);
  vec2 b1 = t - vec2(0.0, 0.17); b1 = mat2(0.6, -0.8, 0.8, 0.6) * b1;
  vec2 b2 = t - vec2(0.0, 0.13); b2 = mat2(0.5, 0.86, -0.86, 0.5) * b2;
  vec2 b3 = t - vec2(-0.03, 0.2); b3 = mat2(0.94, -0.34, 0.34, 0.94) * b3;
  float br = min(sdRRect(b1 - vec2(0.05, 0.0), vec2(0.05, 0.004), 0.003), sdRRect(b2 - vec2(0.045, 0.0), vec2(0.045, 0.004), 0.003));
  br = min(br, sdRRect(b3 - vec2(-0.04, 0.0), vec2(0.04, 0.0035), 0.003));
  return min(d, min(trunk, br));
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uScale;   // CSS px, y down
  float t = uTime * (uCalm > 0.5 ? 0.25 : 1.0);
  vec4 col = vec4(0.0);
  // ---- the pad's diorama ----
  vec2 pc = px - (uPad.xy + uPad.zw * 0.5);
  float pd = sdRRect(pc, uPad.zw * 0.5, uPadR);
  if (uStage > 0.5 && pd < 0.5) {
    vec2 uv = (px - uPad.xy) / uPad.zw;            // 0..1, y down
    float H = uPad.w, Wr = uPad.z / uPad.w;
    vec2 q = vec2(uv.x * Wr, 1.0 - uv.y);          // units of the pad's height, y up
    // sky: deep indigo, a violet haze towards the horizon
    vec3 sky = mix(vec3(0.20, 0.07, 0.24), vec3(0.025, 0.02, 0.07), smoothstep(0.05, 0.95, q.y));
    // stars, twinkling: a point of light in some cells of a fine grid
    vec2 sg = floor(px / 11.0), sf = fract(px / 11.0) - 0.5 - 0.3 * (vec2(hash(sg + 7.7), hash(sg + 1.9)) - 0.5);
    float st = step(0.975, hash(sg)) * smoothstep(0.35, 0.8, q.y) * exp(-dot(sf, sf) * 160.0);
    sky += st * (0.55 + 0.45 * sin(t * (1.5 + 3.0 * hash(sg + 3.1)) + hash(sg) * 30.0)) * vec3(0.85, 0.85, 1.0);
    // the moon, a little red when the dolls watch you
    vec2 mc = vec2(0.72 * Wr, 0.78);
    float mr = 0.13;
    float md = length(q - mc) - mr;
    vec3 moonC = mix(vec3(1.0, 0.95, 0.78), vec3(1.0, 0.45, 0.25), uWatch * 0.7);
    float crater = fbm((q - mc) * 18.0 + 3.0);
    vec3 moon = moonC * (0.82 + 0.25 * crater - 0.25 * smoothstep(0.55, 0.75, fbm((q - mc) * 7.0)));
    sky += moonC * 0.35 * exp(-max(md, 0.0) * 9.0) * (1.0 + 0.6 * uBeat);   // halo
    sky = mix(sky, moon, smoothstep(0.004, -0.004, md));
    // clouds drifting over the moon
    float cl = fbm(vec2(q.x * 2.2 - t * 0.03, q.y * 5.0));
    float cloud = smoothstep(0.52, 0.8, cl) * smoothstep(0.45, 0.7, q.y) * smoothstep(1.0, 0.75, q.y);
    sky = mix(sky, vec3(0.16, 0.1, 0.22) + moonC * 0.12 * exp(-length(q - mc) * 3.0), cloud * 0.85);
    // bats crossing the sky
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float spd = 0.05 + 0.025 * fi;
      float ph = fract(t * spd + fi * 0.37);
      vec2 bp = vec2((ph * 1.4 - 0.2) * Wr, 0.62 + 0.15 * fi + 0.04 * sin(t * 1.3 + fi * 2.0));
      float s = 0.035 + 0.012 * fi;
      float flap = sin(t * (11.0 + fi * 2.0) + fi);
      float bd = bat((q - bp) / s, flap) * s;
      sky = mix(sky, vec3(0.02, 0.01, 0.03), smoothstep(0.0015, -0.0015, bd));
    }
    // far hills with the graveyard, then the ground mist
    float hill = 0.2 + 0.04 * sin(q.x * 5.0 + 1.0) + 0.025 * sin(q.x * 11.0 + 2.0);
    float gy = graveyard(q - vec2(0.0, hill - 0.004), Wr);
    vec3 land = vec3(0.05, 0.03, 0.08);
    float hillMask = smoothstep(0.002, -0.002, q.y - hill);
    float graveMask = smoothstep(0.0015, -0.0015, gy) * step(hill - 0.01, q.y);
    sky = mix(sky, land, max(hillMask, graveMask));
    float near = 0.1 + 0.02 * sin(q.x * 3.0 + 4.0);
    sky = mix(sky, vec3(0.025, 0.015, 0.04), smoothstep(0.002, -0.002, q.y - near));
    // eyes in the dark, among the graves: they open, blink, close again (more of them when the dolls watch you)
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float cyc = 7.0 + 3.0 * fi;
      float ph = fract(t / cyc + fi * 0.31);
      float open = smoothstep(0.0, 0.08, ph) * smoothstep(0.55, 0.45, ph) * step(0.35 - uWatch * 0.4, fract(fi * 0.618 + floor(t / cyc + fi * 0.31) * 0.37));
      float blink = 1.0 - step(0.96, fract(t * 0.7 + fi * 0.21));
      vec2 ec = vec2((0.08 + 0.2 * fi + 0.05 * sin(fi * 4.0)) * Wr, hill - 0.035 - 0.03 * fract(fi * 0.53));
      vec2 ep = q - ec;
      ep.x = abs(ep.x) - 0.011;
      float eye = length(ep * vec2(1.0, 2.4 / max(blink * open, 0.05))) - 0.006;
      sky += vec3(0.75, 1.0, 0.3) * smoothstep(0.004, -0.002, eye) * open * blink * (0.8 + uWatch);
    }
    float mist = fbm(vec2(q.x * 3.0 + t * 0.05, q.y * 9.0 - t * 0.02));
    sky += vec3(0.25, 0.4, 0.3) * smoothstep(0.32, 0.05, q.y) * mist * 0.45;
    // the keys: faint beams of moonlight between them, black keys as dark slabs, lit keys glow
    for (int i = 0; i < 24; i++) {
      if (float(i) >= uNKeys) break;
      vec4 k = uKeys[i], ki = uKeyInfo[i];
      vec2 kc = (k.xy + k.zw) * 0.5 * uPad.zw, kh = (k.zw - k.xy) * 0.5 * uPad.zw;
      vec2 kp = (px - uPad.xy) - kc;
      float kd = sdRRect(kp, kh, ki.x > 0.5 ? 6.0 : 0.0);
      if (ki.x > 0.5) sky = mix(sky, vec3(0.03, 0.015, 0.05) + uAccent * 0.08 * ki.y, smoothstep(1.0, -1.0, kd) * 0.88);
      else if (k.x > 0.001) sky += vec3(0.55, 0.5, 0.75) * 0.08 * exp(-abs(kp.x + kh.x) * 0.9);
      sky += uAccent * ki.y * 0.28 * smoothstep(8.0, -kh.x, kd);
    }
    float a = smoothstep(0.5, -0.5, pd);
    col = vec4(sky * a, a);
  }
  // ---- mist over everything else (not over the pad) ----
  float outside = smoothstep(-2.0, 6.0, pd);
  vec2 m = px / 240.0;
  float f1 = fbm(m * vec2(1.0, 2.2) + vec2(t * 0.025, -t * 0.01));
  float f2 = fbm(m * 2.3 + vec2(-t * 0.04, t * 0.015) + 5.0);
  float ground = smoothstep(uRes.y / uScale * 0.55, uRes.y / uScale, px.y);
  float fog = (smoothstep(0.4, 0.85, f1) * 0.11 + smoothstep(0.5, 0.9, f2) * 0.07 + ground * 0.06) * outside;
  vec3 fogC = mix(vec3(0.3, 0.2, 0.45), vec3(0.2, 0.4, 0.3), smoothstep(0.4, 0.8, f2));
  col.rgb = col.rgb * (1.0 - fog) + fogC * fog;
  col.a = col.a + fog * (1.0 - col.a);
  // embers rising
  vec2 eg = vec2(px.x / 23.0, px.y / 23.0 + t * 0.9);
  vec2 ec = floor(eg);
  float eh = hash(ec);
  if (eh > 0.93 && uCalm < 0.5) {
    vec2 ef = fract(eg) - 0.5 - 0.3 * vec2(sin(t * 2.0 + eh * 40.0), 0.0);
    float e = exp(-dot(ef, ef) * 90.0) * (0.5 + 0.5 * sin(t * 4.0 + eh * 60.0)) * outside;
    col.rgb += vec3(1.0, 0.5, 0.15) * e * 0.7;
    col.a = max(col.a, e * 0.7);
  }
  // vignette
  vec2 vq = px / (uRes / uScale) - 0.5;
  float vig = smoothstep(0.25, 0.85, length(vq * vec2(1.1, 0.9))) * 0.55;
  col.rgb *= 1.0 - vig * (1.0 - outside * 0.0);
  col.a = col.a + vig * (1.0 - col.a) * outside;
  o = col;
}`,Wa=`#version 300 es
in vec2 aCorner;
in vec4 iRect;    // the plate: x, y, w, h (CSS px, y down)
in vec4 iPlate;   // corner radius, plate (1) or not (0), active, press flash; for the pad's dolls: spotlight, -, on the glass (1), -
in vec4 iDoll;    // anchor x, y (CSS px: a doll's feet, a face's or a button's centre), size (CSS px), type
in vec4 iAnimA;   // squash, head x, head y, sway
in vec4 iAnimB;   // look x, look y, blink, mouth
in vec4 iAnimC;   // glow, fright, seed, reach
in vec4 iColor;   // its colour of light, shadow strength
in vec4 iPoseA;   // left hand x, y, z, hips x
in vec4 iPoseB;   // right hand x, y, z, twist
in vec4 iPoseC;   // left foot lift, right foot lift, head roll, ink light
uniform vec2 uRes; uniform float uScale;
out vec2 vPos;
flat out vec4 vRect, vPlate, vDoll, vA, vB, vC, vCol, vPA, vPB, vPC;
void main() {
  vec2 lo = iRect.xy, hi = iRect.xy + iRect.zw;
  if (iPlate.y < 0.5) { lo = vec2(1e5); hi = vec2(-1e5); }
  if (iDoll.z > 0.5) {
    float s = iDoll.z;
    if (iDoll.w < 9.5) {
      // a doll: feet at the anchor; room above for a spotlight, below for its reflection on the glass
      float up = iPlate.y < 0.5 && iPlate.x > 0.01 ? 2.6 : 1.3;
      lo = min(lo, iDoll.xy - vec2(0.85 * s, up * s));
      hi = max(hi, iDoll.xy + vec2(0.85 * s, (iPlate.y < 0.5 && iPlate.z > 0.5 ? 0.32 : 0.12) * s));
    } else { lo = min(lo, iDoll.xy - 0.62 * s); hi = max(hi, iDoll.xy + 0.62 * s); }
  }
  lo -= 6.0; hi += 6.0;
  vec2 p = mix(lo, hi, aCorner);
  vPos = p;
  vRect = iRect; vPlate = iPlate; vDoll = iDoll; vA = iAnimA; vB = iAnimB; vC = iAnimC; vCol = iColor; vPA = iPoseA; vPB = iPoseB; vPC = iPoseC;
  vec2 ndc = p * uScale / uRes * 2.0 - 1.0;
  gl_Position = vec4(ndc.x, -ndc.y, 0.0, 1.0);
}`,Va=`#version 300 es
precision highp float;
in vec2 vPos;
flat in vec4 vRect, vPlate, vDoll, vA, vB, vC, vCol, vPA, vPB, vPC;
uniform float uTime; uniform float uScale; uniform float uFlicker; uniform float uWatch; uniform float uCalm;
uniform vec3 uMoon;     // towards the moon (x right, y up, z out of the screen)
out vec4 o;

#define M_CLOTH 1.0
#define M_SKIN 2.0
#define M_EYE 3.0
#define M_DARK 4.0
#define M_GLOW 5.0
#define M_THREAD 6.0
#define M_METAL 7.0
#define M_PIN 8.0
#define M_STEM 9.0
#define M_HAIR 10.0
#define M_BUTTON 11.0
#define M_BONE 12.0
#define M_BOOT 13.0
#define M_ROPE 14.0
#define M_IRON 15.0
#define M_BREW 16.0
#define M_HEART 17.0
#define M_GLASS 18.0
#define M_WOOD 19.0
#define M_STRAW 20.0
#define M_SAND 21.0
#define M_GOLD 22.0
#define M_SILK 23.0
#define M_PAGE 24.0
#define M_CORK 25.0

float TYPE, SEED, SQ, SWAY, BLINK, MOUTH, GLOW, SCARE, REACH, HIPX, TWIST, LIFTL, LIFTR, ROLL, INK, SPIN;
vec2 HEAD, LOOK;
vec3 HL, HR;
vec3 gHQ;   // the head's own coordinates at the last point looked at (for its face)
vec3 gBQ;   // the upper body's

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float sdEll(vec3 p, vec3 r) { float k0 = length(p / r); float k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / max(k1, 1e-5); }
float sdCap(vec3 p, vec3 a, vec3 b, float r) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - r; }
float sdRBox(vec3 p, vec3 b, float r) { vec3 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
float sdRCone(vec3 p, float r1, float r2, float h) {
  vec2 q = vec2(length(p.xz), p.y);
  float b = (r1 - r2) / h, a = sqrt(1.0 - b * b), k = dot(q, vec2(-b, a));
  if (k < 0.0) return length(q) - r1;
  if (k > a * h) return length(q - vec2(0.0, h)) - r2;
  return dot(q, vec2(a, b)) - r1;
}
float sdTorus(vec3 p, float R, float r) { return length(vec2(length(p.xz) - R, p.y)) - r; }
float sdBox2(vec2 p, vec2 b) { vec2 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0); }
float sdSeg2(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }
float tri2(vec2 p, float r) {
  const float k = 1.7320508;
  p.x = abs(p.x) - r; p.y = p.y + r / k;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -2.0 * r, 0.0);
  return -length(p) * sign(p.y);
}
vec2 U(vec2 a, vec2 b) { return a.x < b.x ? a : b; }

// the head turns towards the finger and tilts with the dance
vec3 headSpace(vec3 p, vec3 c) {
  vec3 q = p - c;
  q.xy = rot(-ROLL) * q.xy;
  q.xz = rot(LOOK.x * 0.55) * q.xz;
  q.yz = rot(-LOOK.y * 0.32) * q.yz;
  return q;
}

// ---------- heads (in their own space: centre at the origin, looking at you) ----------
float pumpkinFace(vec2 p) {
  float wide = 1.0 + 0.3 * SCARE;
  vec2 e = vec2(abs(p.x) - 0.25, p.y - 0.12);
  e.y /= max(1.0 - BLINK * 0.85, 0.15);
  float eyes = tri2(e / wide, 0.12) * wide - 0.02;
  float nose = tri2(vec2(p.x, p.y + 0.02), 0.045);
  vec2 m = vec2(p.x, p.y + 0.21);
  float open = MOUTH;
  // a smile with one tooth; open, a round "oh"
  float smile = max(length(m * vec2(1.0, 1.9 - 1.2 * open)) - 0.3, -(length((m - vec2(0.0, 0.12 + 0.12 * open)) * vec2(1.0, 1.5 - 0.6 * open)) - 0.32));
  smile = max(smile, -sdBox2(m - vec2(0.06, 0.02 + 0.04 * open), vec2(0.04, 0.05)));
  return min(min(eyes, nose), smile);
}
// the play button's pumpkin: its mouth is the sign, a triangle (play) or a square (stop)
float pumpkinSign(vec2 p) {
  vec2 e = vec2(abs(p.x) - 0.24, p.y - 0.17);
  float eyes = tri2(e, 0.1) - 0.015;
  vec2 m = p - vec2(0.0, -0.18);
  float play = tri2(vec2(-m.y, m.x - 0.02), 0.17) - 0.02;
  float stop = sdBox2(m, vec2(0.14)) - 0.03;
  return min(eyes, mix(play, stop, step(0.5, MOUTH)));
}
vec2 pumpkinHead(vec3 q, bool sign) {
  gHQ = q;
  float a = atan(q.x, q.z);
  float lobes = pow(abs(sin(a * 4.0)), 0.6);
  float d = sdEll(q, vec3(0.72, 0.56, 0.66)) + 0.05 * (1.0 - lobes) * smoothstep(0.6, 0.05, abs(q.y));
  float f = sign ? pumpkinSign(q.xy) : pumpkinFace(q.xy);
  d = smax(d, -max(f, 0.2 - q.z), 0.012);
  vec2 res = vec2(d * 0.85, (f < 0.015 && q.z > 0.08) ? M_GLOW : M_SKIN);
  vec3 sq = q - vec3(0.0, 0.47, -0.03);
  sq.x -= 0.6 * sq.y * sq.y;
  res = U(res, vec2(sdCap(sq, vec3(0.0), vec3(0.0, 0.22, 0.0), 0.075 - 0.08 * max(sq.y, 0.0)), M_STEM));
  // a curly little leaf
  vec3 lq = q - vec3(0.12, 0.55, 0.0);
  lq.xy = rot(-0.5) * lq.xy;
  res = U(res, vec2(sdEll(lq, vec3(0.13, 0.035, 0.08)), M_STEM));
  return res;
}
vec2 voodooMain(vec3 q, float body) {
  gHQ = q;
  float d = smin(sdEll(q, vec3(0.5, 0.46, 0.42)), body, 0.14);
  // the mouth: stitched shut; it opens to sing or scream
  vec3 mq = q - vec3(0.0, -0.17, 0.38);
  float mo = length(mq.xy * vec2(1.0, 2.6 - 1.7 * MOUTH)) - 0.13 * (0.2 + MOUTH);
  d = smax(d, -max(mo, -mq.z - 0.07), 0.015);
  vec2 res = vec2(d, (mo < 0.0 && mq.z > -0.07) ? M_DARK : M_SKIN);
  vec3 bq = q - vec3(-0.18, 0.06, 0.38);
  res = U(res, vec2(max(length(bq.xy) - 0.12, abs(bq.z) - 0.035) - 0.012, M_BUTTON));
  // a pin in its head
  vec3 pa = vec3(0.2, 0.25, 0.1), pd = normalize(vec3(0.5, 0.75, 0.45));
  res = U(res, vec2(sdCap(q, pa, pa + pd * 0.3, 0.014), M_METAL));
  return U(res, vec2(length(q - pa - pd * 0.32) - 0.055, M_PIN));
}
vec2 voodooHead(vec3 q) { return voodooMain(q, 1e5); }
vec2 ghostMain(vec3 q, float body) {
  gHQ = q;
  float d = smin(length(q * vec3(1.0, 0.96, 1.05)) - 0.5, body, 0.28);
  float wide = 1.0 + 0.3 * SCARE;
  vec2 e = vec2(abs(q.x) - 0.17, q.y - 0.08);
  float eyes = length(e * vec2(1.0, 0.72 / max(1.0 - 0.9 * BLINK, 0.1)) / wide) - 0.1;
  vec2 m = q.xy - vec2(0.0, -0.16);
  float mouth = length(m * vec2(1.0 / (0.55 + 0.6 * MOUTH), 1.0 / (0.3 + 0.9 * MOUTH))) - 0.09;
  float face = min(eyes, mouth);
  d = smax(d, -max(face, 0.32 - q.z), 0.02);
  return vec2(d, (face < 0.01 && q.z > 0.2) ? M_DARK : M_CLOTH);
}
vec2 ghostHead(vec3 q) { return ghostMain(q, 1e5); }
vec2 skullHead(vec3 q, float glowEyes) {
  gHQ = q;
  float cran = sdEll(q - vec3(0.0, 0.06, -0.02), vec3(0.52, 0.48, 0.5));
  float d = smin(cran, sdEll(q - vec3(0.0, -0.16, 0.1), vec3(0.4, 0.24, 0.36)), 0.12);
  float jo = MOUTH * 0.17;
  d = smin(d, sdRBox(q - vec3(0.0, -0.39 - jo, 0.13), vec3(0.19, 0.05, 0.15), 0.08), 0.03 + 0.05 * (1.0 - MOUTH));
  vec3 e = vec3(abs(q.x) - 0.2, q.y + 0.0, q.z - 0.42);
  float sock = length(e * vec3(1.0, 1.0 + 0.5 * BLINK, 1.0)) - 0.16 * (1.0 + 0.2 * SCARE);
  d = smax(d, -sock, 0.05);
  d = smax(d, -sdEll(q - vec3(0.0, -0.16, 0.47), vec3(0.05, 0.075, 0.12)), 0.02);
  vec2 res = vec2(d, M_BONE);
  vec3 lp = vec3(LOOK.x * 0.05, LOOK.y * 0.04, 0.0);
  float pr = (0.05 + 0.03 * glowEyes) * (1.0 + 0.6 * SCARE) * (1.0 - 0.8 * BLINK);
  float pu = min(length(q - vec3(-0.2, 0.0, 0.31) - lp), length(q - vec3(0.2, 0.0, 0.31) - lp)) - pr;
  return U(res, vec2(pu, M_GLOW));
}
vec2 mummyHead(vec3 q) {
  gHQ = q;
  float d = sdEll(q, vec3(0.45, 0.48, 0.42));
  float a = atan(q.x, q.z);
  float band = fract(q.y * 6.5 + 0.18 * sin(a + q.y * 3.0 + SEED * 5.0));
  d -= 0.022 * smoothstep(0.0, 0.18, band) * smoothstep(1.0, 0.82, band);
  vec3 eq = q - vec3(-0.15, 0.07, 0.33);
  d = smax(d, -max(length(eq.xy * vec2(1.0, 1.7)) - 0.15, -eq.z - 0.06), 0.03);
  vec2 res = vec2(d * 0.85, M_SKIN);
  res = U(res, vec2(length(eq - vec3(0.0, 0.0, -0.06)) - 0.1 * (1.0 + 0.3 * SCARE), M_EYE));
  vec3 e2 = q - vec3(0.16, 0.07, 0.38);
  res = U(res, vec2(length(e2.xy * vec2(1.0, 4.0 / max(1.0 - BLINK, 0.2))) - 0.07 + max(0.0, -e2.z - 0.02), M_GLOW));
  // a loose end, hanging from the side of its head
  float sw = 0.06 * sin(uTime * 2.0 + SEED * 3.0);
  vec3 l0 = vec3(0.36, 0.12, 0.05), l1 = l0 + vec3(0.1 + sw, -0.22, 0.02), l2 = l1 + vec3(0.02 + 1.6 * sw, -0.2, 0.0);
  float loose = min(sdRBox(q - (l0 + l1) * 0.5, vec3(0.03, length(l1 - l0) * 0.5, 0.012), 0.01), sdRBox(q - (l1 + l2) * 0.5, vec3(0.028, length(l2 - l1) * 0.5, 0.012), 0.01));
  return U(res, vec2(loose, M_SKIN));
}
vec2 frankHead(vec3 q) {
  gHQ = q;
  float d = smin(sdRBox(q, vec3(0.32, 0.34, 0.26), 0.15), sdRBox(q - vec3(0.0, 0.13, 0.36), vec3(0.3, 0.04, 0.04), 0.04), 0.05);
  vec3 mq = q - vec3(0.0, -0.2, 0.41);
  float mo = sdBox2(mq.xy, vec2(0.15, 0.012 + 0.09 * MOUTH)) - 0.02;
  d = smax(d, -max(mo, -mq.z - 0.08), 0.015);
  vec2 res = vec2(d, (mo < 0.0 && mq.z > -0.08) ? M_DARK : M_SKIN);
  res = U(res, vec2(sdRBox(q - vec3(0.0, 0.43, -0.02), vec3(0.34, 0.06 + 0.025 * sin(q.x * 38.0), 0.31), 0.06), M_HAIR));
  vec3 lp = vec3(LOOK.x * 0.02, 0.0, 0.0);
  res = U(res, vec2(min(length(q - vec3(-0.15, 0.02, 0.34) - lp), length(q - vec3(0.15, 0.02, 0.34) - lp)) - 0.085 * (1.0 + 0.25 * SCARE), M_EYE));
  vec3 nb = q - vec3(0.0, -0.4, -0.02);
  float bolts = smax(sdCap(nb, vec3(-0.44, 0.0, 0.0), vec3(0.44, 0.0, 0.0), 0.055), 0.32 - abs(nb.x), 0.01);
  return U(res, vec2(bolts, M_METAL));
}
vec2 headOf(float ty, vec3 q) {
  if (ty < 0.5) return pumpkinHead(q, false);
  if (ty < 1.5) return voodooHead(q);
  if (ty < 2.5) return ghostHead(q);
  if (ty < 3.5) return skullHead(q, 0.0);
  if (ty < 4.5) return mummyHead(q);
  return frankHead(q);
}
float headY(float ty) { return ty < 0.5 ? 0.26 : ty < 1.5 ? 0.33 : ty < 2.5 ? 0.34 : ty < 3.5 ? 0.4 : ty < 4.5 ? 0.36 : 0.4; }

// ---------- the dolls: a body that dances (hands, hips, a twist, feet, a tilted head) ----------
// legs: from the hips to the feet; a lifted foot comes up and forward
float legPair(vec3 p, float r, float spread, float hipY) {
  vec3 hl = vec3(-spread + HIPX, hipY, 0.0), hr = vec3(spread + HIPX, hipY, 0.0);
  vec3 fl = vec3(-spread - 0.02 + HIPX * 0.4, -1.0 + LIFTL * 0.3, 0.03 + LIFTL * 0.12);
  vec3 fr = vec3(spread + 0.02 + HIPX * 0.4, -1.0 + LIFTR * 0.3, 0.03 + LIFTR * 0.12);
  return min(sdCap(p, hl, fl, r), sdCap(p, hr, fr, r));
}
vec3 footL() { return vec3(-0.15 + HIPX * 0.4, -1.03 + LIFTL * 0.3, 0.07 + LIFTL * 0.12); }
vec3 footR() { return vec3(0.15 + HIPX * 0.4, -1.03 + LIFTR * 0.3, 0.07 + LIFTR * 0.12); }
// the upper body turns about the hips
vec3 upper(vec3 p) {
  vec3 q = p - vec3(HIPX, -0.78, 0.0);
  q.xz = rot(TWIST) * q.xz;
  q += vec3(0.0, -0.78, 0.0);
  gBQ = q;
  return q;
}
float arms(vec3 q, vec3 sh, float r) { return min(sdCap(q, vec3(-sh.x, sh.y, sh.z), HL, r), sdCap(q, vec3(sh.x, sh.y, sh.z), HR, r)); }

vec2 dollBody(vec3 p) {
  vec3 q = upper(p);
  vec3 hc = vec3(HEAD.x, headY(TYPE) + HEAD.y, 0.0);
  vec2 res;
  if (TYPE < 0.5) {            // the jack-o'-lantern
    res = pumpkinHead(headSpace(q, hc), false);
    float b = sdRCone(q - vec3(0.0, -0.93, 0.0), 0.34, 0.17, 0.62);
    res = U(res, vec2(b, M_CLOTH));
    res = U(res, vec2(arms(q, vec3(0.22, -0.38, 0.0), 0.075), M_STEM));
    res = U(res, vec2(min(length(q - HL) - 0.095, length(q - HR) - 0.095), M_SKIN));
    res = U(res, vec2(legPair(p, 0.06, 0.12, -0.8), M_CLOTH));
    res = U(res, vec2(min(sdEll(p - footL(), vec3(0.1, 0.07, 0.14)), sdEll(p - footR(), vec3(0.1, 0.07, 0.14))), M_BOOT));
  } else if (TYPE < 1.5) {     // the voodoo doll
    vec3 hq = headSpace(q, hc);
    float d = sdRBox(q - vec3(0.0, -0.45, 0.0), vec3(0.2, 0.28, 0.12), 0.14);
    d = smin(d, arms(q, vec3(0.24, -0.28, 0.0), 0.1), 0.07);
    d = smin(d, legPair(p, 0.105, 0.14, -0.72), 0.05);
    // (the body, in the head's space, so both melt together)
    res = voodooMain(hq, d);
    vec3 nq = q - vec3(HEAD.x * 0.5, -0.06 + HEAD.y * 0.5, 0.0);
    res = U(res, vec2(length(vec2(length(nq.xz * vec2(1.0, 1.35)) - 0.25, nq.y)) - 0.035, M_ROPE));
    vec3 pa1 = vec3(0.1, -0.33, 0.12), pd1 = normalize(vec3(0.45, 0.45, 0.8));
    vec3 pa2 = vec3(-0.12, -0.55, 0.12), pd2 = normalize(vec3(-0.6, 0.1, 0.8));
    res = U(res, vec2(min(sdCap(q, pa1, pa1 + pd1 * 0.36, 0.014), sdCap(q, pa2, pa2 + pd2 * 0.3, 0.014)), M_METAL));
    res = U(res, vec2(min(length(q - pa1 - pd1 * 0.38) - 0.06, length(q - pa2 - pd2 * 0.32) - 0.055), M_PIN));
  } else if (TYPE < 2.5) {     // the ghost: it floats, its sheet follows its hips
    float bob = 0.1 + 0.06 * sin(uTime * 2.1 + SEED * 6.0);
    vec3 g = q - vec3(0.0, bob, 0.0);
    float a = atan(g.x, g.z);
    vec3 sp = g - vec3(HIPX * 0.5, -0.98, 0.0);
    float b = smin(sdRCone(sp, 0.6 + 0.04 * sin(a * 5.0 + uTime * 3.0), 0.4, 1.25), arms(g, vec3(0.3, 0.0, 0.0), 0.1), 0.18);
    float hem = -0.93 + 0.07 * sin(a * 7.0 + uTime * 3.1 + SEED * 4.0) + 0.04 * sin(a * 3.0 - uTime * 1.7);
    b = smax(b, hem - g.y, 0.05);
    res = ghostMain(headSpace(g, hc), b);
    res.x *= 0.9;
  } else if (TYPE < 3.5) {     // the calavera
    res = skullHead(headSpace(q, hc), 0.0);
    float b = sdRCone(q - vec3(0.0, -0.98, 0.0), 0.38, 0.15, 0.82);
    res = U(res, vec2(b, M_CLOTH));
    res = U(res, vec2(arms(q, vec3(0.18, -0.25, 0.0), 0.05), M_BONE));
    res = U(res, vec2(min(length(q - HL) - 0.085, length(q - HR) - 0.085), M_BONE));
    res = U(res, vec2(min(sdEll(p - footL() - vec3(0.0, 0.02, 0.0), vec3(0.09, 0.06, 0.12)), sdEll(p - footR() - vec3(0.0, 0.02, 0.0), vec3(0.09, 0.06, 0.12))), M_BONE));
  } else if (TYPE < 4.5) {     // the mummy
    res = mummyHead(headSpace(q, hc));
    float d = sdCap(q, vec3(0.0, -0.2, 0.0), vec3(0.0, -0.72, 0.0), 0.3);
    d = smin(d, arms(q, vec3(0.26, -0.22, 0.0), 0.095), 0.06);
    d = smin(d, legPair(p, 0.105, 0.13, -0.75), 0.05);
    float a = atan(q.x, q.z);
    float band = fract(q.y * 6.5 + 0.18 * sin(a + q.y * 3.0 + SEED * 5.0));
    d -= 0.022 * smoothstep(0.0, 0.18, band) * smoothstep(1.0, 0.82, band);
    res = U(res, vec2(d * 0.85, M_SKIN));
  } else {                      // the little monster with bolts
    res = frankHead(headSpace(q, hc));
    float b = sdRBox(q - vec3(0.0, -0.48, 0.0), vec3(0.26, 0.26, 0.15), 0.12);
    b = smin(b, arms(q, vec3(0.32, -0.28, 0.0), 0.085), 0.06);
    res = U(res, vec2(b, M_CLOTH));
    res = U(res, vec2(min(length(q - HL) - 0.09, length(q - HR) - 0.09), M_SKIN));
    res = U(res, vec2(legPair(p, 0.08, 0.14, -0.78), M_CLOTH));
    res = U(res, vec2(min(sdRBox(p - footL(), vec3(0.08, 0.06, 0.12), 0.04), sdRBox(p - footR(), vec3(0.08, 0.06, 0.12), 0.04)), M_BOOT));
  }
  return res;
}

// ---------- the Halloween buttons ----------
vec2 cauldron(vec3 p) {
  p.yz = rot(0.42) * p.yz;
  vec3 q = p - vec3(0.0, -0.05, 0.0);
  // (cut low enough that the brew is its top, inside the rim)
  float pot = smax(length(q * vec3(1.0, 1.15, 1.0)) - 0.66, q.y - 0.14, 0.04);
  vec2 res = vec2(pot, M_IRON);
  res = U(res, vec2(sdTorus(q - vec3(0.0, 0.28, 0.0), 0.57, 0.075), M_IRON));
  float legs = 1e5;
  for (int i = 0; i < 3; i++) { float a = float(i) * 2.094 + 0.5; legs = min(legs, sdCap(q, vec3(cos(a) * 0.38, -0.45, sin(a) * 0.38), vec3(cos(a) * 0.48, -0.66, sin(a) * 0.48), 0.06)); }
  res = U(res, vec2(legs, M_IRON));
  // the brew, and its bubbles that grow and pop
  float brew = max(length(q.xz) - 0.56, abs(q.y - 0.17) - 0.03);
  for (int i = 0; i < 4; i++) {
    float fi = float(i), ph = fract(uTime * (0.5 + 0.17 * fi) + fi * 0.27);
    vec3 bc = vec3(0.3 * sin(fi * 2.4 + 1.0), 0.19 + 0.06 * ph, 0.26 * cos(fi * 1.7));
    brew = smin(brew, length(q - bc) - 0.11 * sin(ph * 3.14159) * (1.0 + GLOW), 0.04);
  }
  return U(res, vec2(brew, M_BREW));
}
vec2 heart(vec3 p) {
  float k = 1.0 + 0.13 * GLOW;
  p /= k;
  p.z *= 1.35;
  vec3 q = vec3(abs(p.x), p.y, p.z);
  float d = smin(length(q - vec3(0.27, 0.2, 0.0)) - 0.37, sdRCone(p - vec3(0.0, -0.74, 0.0), 0.04, 0.46, 0.86), 0.12);
  // two little vessels on top
  d = smin(d, sdCap(p, vec3(-0.1, 0.4, -0.05), vec3(-0.16, 0.7, -0.08), 0.07), 0.05);
  d = smin(d, sdCap(p, vec3(0.08, 0.38, -0.1), vec3(0.2, 0.62, -0.12), 0.06), 0.05);
  return vec2(d * k / 1.35, M_HEART);
}
vec2 crystal(vec3 p) {
  vec2 res = vec2(length(p - vec3(0.0, 0.14, 0.0)) - 0.6, M_GLASS);
  float stand = sdRCone(p - vec3(0.0, -0.78, 0.0), 0.4, 0.26, 0.2);
  stand = min(stand, sdTorus(p - vec3(0.0, -0.46, 0.0), 0.3, 0.06));
  return U(res, vec2(stand, M_GOLD));
}
// a round little bat, flying towards dir (-1 left, 1 right)
vec2 bat3(vec3 p, float dir) {
  p.x *= dir;
  p.xy = rot(0.22) * p.xy;
  gHQ = p;
  float body = sdEll(p - vec3(0.0, -0.05, 0.0), vec3(0.34, 0.4, 0.32));
  float head = length(p - vec3(0.06, 0.32, 0.06)) - 0.3;
  float d = smin(body, head, 0.12);
  // ears
  d = smin(d, sdRCone(p - vec3(-0.08, 0.5, 0.02), 0.08, 0.01, 0.26), 0.04);
  d = smin(d, sdRCone(p - vec3(0.22, 0.48, 0.02), 0.08, 0.01, 0.26), 0.04);
  vec2 res = vec2(d, M_CLOTH);
  // wings, flapping (faster when pressed)
  float fl = sin(uTime * (7.0 + 9.0 * SCARE) + SEED * 6.0) * 0.5;
  vec3 w = vec3(abs(p.x - 0.03), p.y, p.z);
  w -= vec3(0.28, 0.05, 0.0);
  w.xy = rot(fl) * w.xy;
  float wing = sdEll(w - vec3(0.38, 0.02, 0.0), vec3(0.42, 0.26, 0.05));
  wing = smax(wing, -(length(vec2(mod(w.x, 0.22) - 0.11, w.y + 0.3)) - 0.13), 0.02);
  res = U(res, vec2(wing, M_SILK));
  // big eyes and two small fangs
  vec3 e = vec3(abs(p.x - 0.07) - 0.11, p.y - 0.36, p.z - 0.29);
  res = U(res, vec2(length(e) - 0.085, M_EYE));
  vec3 f = vec3(abs(p.x - 0.07) - 0.05, p.y - 0.17, p.z - 0.32);
  res = U(res, vec2(sdRCone(vec3(f.x, -f.y, f.z), 0.025, 0.003, 0.08), M_BONE));
  return res;
}
vec2 die(vec3 p) {
  p.xz = rot(0.6 + REACH * 6.2832) * p.xz;
  p.yz = rot(-0.5 + REACH * 3.1416) * p.yz;
  float d = sdRBox(p, vec3(0.42), 0.14);
  // pips: one on the front, two on top, three on the right
  float pips = length(p - vec3(0.0, 0.0, 0.58)) - 0.11;
  pips = min(pips, min(length(p - vec3(-0.2, 0.58, -0.2)) - 0.1, length(p - vec3(0.2, 0.58, 0.2)) - 0.1));
  pips = min(pips, min(length(p - vec3(0.58, 0.22, 0.22)) - 0.09, min(length(p - vec3(0.58, 0.0, 0.0)) - 0.09, length(p - vec3(0.58, -0.22, -0.22)) - 0.09)));
  d = smax(d, -pips, 0.03);
  return vec2(d, pips < 0.02 ? M_DARK : M_BONE);
}
vec2 hourglass(vec3 p) {
  p.xy = rot(REACH * 3.1416) * p.xy;
  vec2 res = vec2(min(sdRBox(p - vec3(0.0, 0.74, 0.0), vec3(0.46, 0.04, 0.32), 0.04), sdRBox(p - vec3(0.0, -0.74, 0.0), vec3(0.46, 0.04, 0.32), 0.04)), M_BONE);
  float posts = min(sdCap(p, vec3(-0.4, -0.72, 0.2), vec3(-0.4, 0.72, 0.2), 0.035), sdCap(p, vec3(0.4, -0.72, 0.2), vec3(0.4, 0.72, 0.2), 0.035));
  posts = min(posts, sdCap(p, vec3(0.0, -0.72, -0.25), vec3(0.0, 0.72, -0.25), 0.035));
  res = U(res, vec2(posts, M_BONE));
  // the sand: draining from the top bulb into the bottom one
  float flow = fract(uTime * 0.08 + SEED);
  float top = sdRCone(vec3(p.x, -(p.y - 0.66), p.z), 0.28 * (1.0 - flow) + 0.02, 0.02, 0.5 * (1.0 - flow) + 0.05);
  float bot = sdRCone(p - vec3(0.0, -0.7, 0.0), 0.3, 0.02 + 0.06 * flow, 0.12 + 0.36 * flow);
  float stream = sdCap(p, vec3(0.0, 0.1, 0.0), vec3(0.0, -0.5, 0.0), 0.018);
  return U(res, vec2(min(min(top, bot), stream), M_SAND));
}
vec2 broom(vec3 p) {
  float sweep = MOUTH > 0.5 ? sin(uTime * 7.0) * 0.35 : 0.0;
  p.xy = rot(0.65 + sweep) * p.xy;
  vec2 res = vec2(sdCap(p, vec3(0.0, 0.95, 0.0), vec3(0.0, -0.15, 0.0), 0.05), M_WOOD);
  res = U(res, vec2(sdTorus(p - vec3(0.0, -0.18, 0.0), 0.11, 0.04), M_ROPE));
  float br = sdRCone(vec3(p.x, -(p.y + 0.2), p.z), 0.1, 0.34, 0.7);
  br = smax(br, -(p.y + 0.95 + 0.04 * sin(p.x * 40.0)), 0.02);
  return U(res, vec2(br, M_STRAW));
}
vec2 coffin(vec3 p) {
  // the outline: wide at the shoulders, narrow at the feet and head
  float w = p.y > 0.42 ? mix(0.42, 0.22, (p.y - 0.42) / 0.38) : mix(0.28, 0.42, (p.y + 0.86) / 1.28);
  float d2 = max(abs(p.x) - w, max(p.y - 0.8, -0.86 - p.y));
  float box = max(d2, abs(p.z) - 0.16) - 0.03;
  vec2 res = vec2(box, M_WOOD);
  // the lid: it lifts and swings aside, two eyes glow inside
  vec3 lq = p - vec3(-0.45 * REACH, 0.15 * REACH, 0.22 + 0.25 * REACH);
  lq.xz = rot(-0.6 * REACH) * lq.xz;
  float lw = lq.y > 0.42 ? mix(0.45, 0.24, (lq.y - 0.42) / 0.38) : mix(0.3, 0.45, (lq.y + 0.86) / 1.28);
  float lid = max(max(abs(lq.x) - lw, max(lq.y - 0.82, -0.88 - lq.y)), abs(lq.z) - 0.035) - 0.025;
  res = U(res, vec2(lid, M_WOOD));
  float cross = min(sdRBox(lq - vec3(0.0, 0.22, 0.06), vec3(0.03, 0.3, 0.02), 0.01), sdRBox(lq - vec3(0.0, 0.32, 0.06), vec3(0.15, 0.03, 0.02), 0.01));
  res = U(res, vec2(cross, M_GOLD));
  if (REACH > 0.05) {
    vec3 e = vec3(abs(p.x) - 0.1, p.y - 0.42, p.z - 0.17);
    res = U(res, vec2(length(e * vec3(1.0, 1.6, 1.0)) - 0.05 * REACH, M_GLOW));
  }
  return res;
}
vec2 web(vec3 p) {
  // radial threads, rings, and a spider coming down on its thread
  vec2 q = p.xy - vec2(0.0, 0.25);
  float a = atan(q.y, q.x), r = length(q);
  float sec = 6.2832 / 8.0;
  float ar = mod(a + sec * 0.5, sec) - sec * 0.5;
  float radial = abs(sin(ar) * r);
  float ring = abs(mod(r + 0.02 * sin(a * 8.0), 0.2) - 0.1) - 0.088;
  float th = min(radial, max(abs(ring), 0.0));
  th = max(th, r - 0.66);
  float d = length(vec2(th, p.z)) - 0.012;
  vec2 res = vec2(d, M_THREAD);
  float drop = -0.25 - 0.18 * (0.5 + 0.5 * sin(uTime * 1.6 + SEED * 4.0)) - 0.3 * REACH;
  res = U(res, vec2(sdCap(p, vec3(0.0, 0.25, 0.0), vec3(0.0, drop, 0.0), 0.008), M_THREAD));
  vec3 sp = p - vec3(0.0, drop - 0.12, 0.05);
  gHQ = sp - vec3(0.0, 0.12, 0.1);
  float sb = smin(length(sp - vec3(0.0, -0.08, 0.0)) - 0.16, length(sp - vec3(0.0, 0.1, 0.02)) - 0.1, 0.05);
  // legs
  vec3 lq = vec3(abs(sp.x), sp.y, sp.z);
  for (int i = 0; i < 4; i++) { float fi = float(i); sb = min(sb, sdCap(lq, vec3(0.1, 0.02 - fi * 0.05, 0.0), vec3(0.3, 0.12 - fi * 0.13, 0.04), 0.018)); }
  res = U(res, vec2(sb, M_HAIR));
  vec3 e = vec3(abs(sp.x) - 0.045, sp.y - 0.12, sp.z - 0.1);
  return U(res, vec2(length(e) - 0.035, M_EYE));
}
vec2 potion(vec3 p) {
  vec2 res = vec2(smin(length(p - vec3(0.0, -0.22, 0.0)) - 0.52, sdCap(p, vec3(0.0, -0.1, 0.0), vec3(0.0, 0.5, 0.0), 0.15), 0.06), M_GLASS);
  res = U(res, vec2(sdRBox(p - vec3(0.0, 0.62, 0.0), vec3(0.11, 0.08, 0.11), 0.04), M_CORK));
  return res;
}
vec2 vials(vec3 p) {
  vec2 res = vec2(1e5, 0.0);
  for (int i = 0; i < 3; i++) {
    float x = (float(i) - 1.0) * 0.38;
    res = U(res, vec2(sdCap(p, vec3(x, -0.62, 0.0), vec3(x, 0.5, 0.0), 0.14), M_GLASS));
    res = U(res, vec2(sdRBox(p - vec3(x, 0.63, 0.0), vec3(0.09, 0.06, 0.09), 0.03), M_CORK));
  }
  res = U(res, vec2(sdRBox(p - vec3(0.0, -0.2, -0.05), vec3(0.62, 0.035, 0.12), 0.02), M_WOOD));
  return res;
}
vec2 book(vec3 p) {
  p.xy = rot(-0.12) * p.xy;
  vec2 res = vec2(sdRBox(p, vec3(0.5, 0.66, 0.1), 0.06), M_CLOTH);
  // pages on the side, one lifting
  res = U(res, vec2(sdRBox(p - vec3(0.06, 0.0, 0.0), vec3(0.48, 0.62, 0.075), 0.01), M_PAGE));
  vec3 pq = p - vec3(-0.5, 0.0, 0.17);
  pq.xz = rot(-0.6 * REACH - 0.08 * sin(uTime * 2.0)) * pq.xz;
  res = U(res, vec2(sdRBox(pq - vec3(0.48, 0.0, 0.0), vec3(0.46, 0.6, 0.008), 0.004), M_PAGE));
  // gilded corners and a glowing moon on the cover
  vec3 c = vec3(abs(p.x) - 0.48, abs(p.y) - 0.62, p.z - 0.12);
  res = U(res, vec2(length(c) - 0.09, M_GOLD));
  vec2 m = p.xy - vec2(0.0, 0.12);
  float moon = max(length(m) - 0.2, -(length(m - vec2(0.09, 0.05)) - 0.17));
  res = U(res, vec2(max(moon, abs(p.z - 0.17) - 0.02), M_GLOW));
  return res;
}
vec2 emblem(vec3 p) {
  // a little turn towards the finger, a squash when pressed
  p.xz = rot(LOOK.x * 0.35) * p.xz;
  p.yz = rot(-LOOK.y * 0.25) * p.yz;
  float sy = 1.0 - SQ, sx = inversesqrt(max(sy, 0.3));
  p.y = (p.y + 0.9) / sy - 0.9;
  p.xz /= sx;
  gHQ = p;
  vec2 r;
  float e = TYPE - 20.0;
  if (e < 0.5) r = cauldron(p);
  else if (e < 1.5) { gHQ = p; r = skullHead(p * 1.15, MOUTH); r.x /= 1.15; }
  else if (e < 2.5) { r = pumpkinHead(p * 1.12, true); r.x /= 1.12; }
  else if (e < 3.5) r = heart(p);
  else if (e < 4.5) r = crystal(p);
  else if (e < 5.5) r = bat3(p, -1.0);
  else if (e < 6.5) r = bat3(p, 1.0);
  else if (e < 7.5) r = die(p);
  else if (e < 8.5) r = hourglass(p);
  else if (e < 9.5) r = broom(p);
  else if (e < 10.5) r = coffin(p);
  else if (e < 11.5) r = web(p);
  else if (e < 12.5) r = potion(p);
  else if (e < 13.5) r = vials(p);
  else r = book(p);
  r.x *= min(sy, 1.0 / sx) * 0.92;
  return r;
}

// everything: a doll (squashed about its feet, leaning), a doll's head alone, or a button
vec2 sceneMap(vec3 p) {
  if (TYPE > 19.5) return emblem(p);
  if (TYPE > 9.5) { vec2 h = headOf(TYPE - 10.0, headSpace(p * 1.0, vec3(0.0))); return h; }
  float sy = 1.0 - SQ, sx = inversesqrt(max(sy, 0.25));
  vec3 q = p;
  q.xz = rot(SPIN) * q.xz;                  // a whole turn, in a dance
  q.y = (q.y + 1.1) / sy - 1.1;
  q.xz /= sx;
  q.x -= SWAY * (q.y + 1.1) * (q.y + 1.1) * 0.12;
  vec2 r = dollBody(q);
  r.x *= min(sy, 1.0 / sx) * 0.92;
  return r;
}
vec3 normalAt(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  float e = 0.0025;
  return normalize(k.xyy * sceneMap(p + k.xyy * e).x + k.yyx * sceneMap(p + k.yyx * e).x + k.yxy * sceneMap(p + k.yxy * e).x + k.xxx * sceneMap(p + k.xxx * e).x);
}

// what each material looks like at p (hq: the head's own coordinates); cute details: shiny eyes, blush
vec3 baseColor(float m, vec3 p, vec3 hq, out float spec, out float emit, out float sss, out float alpha) {
  spec = 0.0; emit = 0.0; sss = 0.0; alpha = 1.0;
  vec3 c = vec3(0.5);
  float n = noise(p.xy * 14.0 + SEED * 10.0);
  bool isHead = TYPE < 9.5 || (TYPE > 9.5 && TYPE < 19.5);
  float ty = TYPE > 9.5 && TYPE < 19.5 ? TYPE - 10.0 : TYPE;
  if (m == M_SKIN) {
    if (ty < 0.5 || TYPE > 21.5 && TYPE < 22.5) {
      float a = atan(hq.x, hq.z);
      float g = pow(abs(sin(a * 4.0)), 0.6);
      c = mix(vec3(0.62, 0.18, 0.02), vec3(1.0, 0.5, 0.08), 0.35 + 0.65 * g) * (0.85 + 0.25 * n);
      spec = 0.35; sss = 0.3;
    } else if (ty < 1.5) {
      float weave = 0.5 + 0.5 * sin(p.x * 140.0) * sin(p.y * 140.0);
      c = mix(vec3(0.58, 0.42, 0.26), vec3(0.78, 0.62, 0.42), 0.5 * weave + 0.5 * n);
      vec2 e = hq.xy - vec2(0.18, 0.06);
      if (hq.z > 0.2 && max(abs(e.x), abs(e.y)) < 0.1 && min(abs(e.x - e.y), abs(e.x + e.y)) < 0.022) c = vec3(0.14, 0.05, 0.06);
      vec2 mq = hq.xy - vec2(0.0, -0.17);
      if (hq.z > 0.25 && abs(mq.y) < 0.09 * (1.0 + MOUTH) && abs(mq.x) < 0.17 && abs(fract(mq.x * 14.0) - 0.5) < 0.12 && abs(mq.y) > 0.02 * MOUTH) c = vec3(0.1, 0.04, 0.04);
      vec2 hp = gBQ.xy - vec2(-0.1, -0.38);
      hp.y -= sqrt(abs(hp.x)) * 0.12;
      if (TYPE < 9.5 && gBQ.z > 0.05 && length(hp * vec2(1.0, 1.3)) < 0.1) { c = vec3(0.85, 0.08, 0.12) * (0.8 + 0.3 * n); spec = 0.2; }
    } else if (ty > 3.5 && ty < 4.5) {
      float a = atan(p.x, p.z);
      float band = fract(p.y * 6.5 + 0.18 * sin(a + p.y * 3.0 + SEED * 5.0));
      c = mix(vec3(0.58, 0.5, 0.36), vec3(0.94, 0.9, 0.78), smoothstep(0.0, 0.25, band) * smoothstep(1.0, 0.75, band)) * (0.85 + 0.25 * n);
    } else {
      c = vec3(0.45, 0.7, 0.34) * (0.85 + 0.25 * n);
      spec = 0.15; sss = 0.15;
      vec2 s = hq.xy - vec2(-0.05, 0.3);
      if (hq.z > 0.2 && abs(s.y + 0.04 * s.x) < 0.012 && abs(s.x) < 0.22) c = vec3(0.12, 0.08, 0.1);
      if (hq.z > 0.2 && abs(s.x) < 0.2 && abs(s.y) < 0.045 && abs(fract(s.x * 18.0) - 0.5) < 0.1) c = vec3(0.12, 0.08, 0.1);
    }
  } else if (m == M_CLOTH) {
    if (TYPE > 24.5 && TYPE < 26.5) { c = vec3(0.16, 0.1, 0.22) * (0.85 + 0.3 * n); spec = 0.2; }   // a bat's fur
    else if (TYPE > 33.5) { c = vec3(0.32, 0.06, 0.12) * (0.8 + 0.3 * n); spec = 0.25; }           // the book's leather
    else if (ty > 1.5 && ty < 2.5) { c = vec3(0.95, 0.94, 1.0); sss = 0.65; spec = 0.1; }
    else if (ty < 0.5) c = vec3(0.12, 0.2, 0.09) * (0.8 + 0.3 * n);
    else if (ty > 2.5 && ty < 3.5) c = vec3(0.14, 0.07, 0.18) * (0.8 + 0.3 * n);
    else c = vec3(0.18, 0.13, 0.25) * (0.8 + 0.3 * n);
  } else if (m == M_BONE) {
    c = vec3(0.94, 0.9, 0.8) * (0.9 + 0.12 * n); spec = 0.45;
    if (TYPE > 26.5 && TYPE < 27.5) spec = 0.7;
    if (ty > 2.5 && ty < 3.5 || TYPE > 20.5 && TYPE < 21.5) {
      vec2 f1 = vec2(abs(hq.x) - 0.2, hq.y);
      float r1 = length(f1), a1 = atan(f1.y, f1.x);
      if (hq.z > 0.15 && r1 > 0.165 && r1 < 0.21 + 0.035 * cos(a1 * 8.0)) c = mix(vec3(1.0, 0.38, 0.68), vec3(0.25, 0.85, 1.0), step(0.0, hq.x));
      vec2 f2 = hq.xy - vec2(0.0, 0.3);
      float r2 = length(f2), a2 = atan(f2.y, f2.x);
      if (hq.z > 0.2 && r2 < 0.07 + 0.025 * cos(a2 * 5.0)) c = vec3(1.0, 0.62, 0.12);
      if (hq.z > 0.2 && r2 < 0.025) c = vec3(0.35, 0.92, 0.45);
      vec2 tq = hq.xy - vec2(0.0, -0.33);
      if (hq.z > 0.2 && abs(tq.y) < 0.045 && abs(tq.x) < 0.17 && abs(fract(tq.x * 13.0) - 0.5) < 0.07) c = vec3(0.4, 0.34, 0.32);
    }
  } else if (m == M_STEM) { c = vec3(0.24, 0.36, 0.1) * (0.8 + 0.4 * n); }
  else if (m == M_HAIR) { c = vec3(0.04, 0.035, 0.05); spec = 0.7; }
  else if (m == M_BOOT) { c = vec3(0.08, 0.05, 0.07); spec = 0.5; }
  else if (m == M_ROPE) { c = vec3(0.5, 0.35, 0.2) * (0.75 + 0.4 * sin(atan(p.x, p.z) * 30.0 + p.y * 60.0)); }
  else if (m == M_METAL) { c = vec3(0.62, 0.64, 0.7); spec = 1.0; }
  else if (m == M_PIN) {
    float k = floor(hash(floor(p.xy * 6.0) + SEED) * 3.0);
    c = k < 1.0 ? vec3(0.95, 0.12, 0.2) : k < 2.0 ? vec3(1.0, 0.8, 0.1) : vec3(0.1, 0.8, 0.95); spec = 1.0;
  } else if (m == M_BUTTON) {
    c = vec3(0.05, 0.04, 0.06); spec = 1.0;
    vec2 b = hq.xy - vec2(-0.18, 0.06);
    if (length(abs(b) - 0.035) < 0.018) c = vec3(0.5, 0.4, 0.3);
    if (abs(length(b) - 0.09) < 0.008) c = vec3(0.13, 0.1, 0.13);
  } else if (m == M_EYE) {
    vec3 ec = ty > 3.5 && ty < 4.5 ? vec3(-0.15, 0.07, 0.27) : vec3(sign(hq.x) * 0.15, 0.02, 0.34);
    if (TYPE > 24.5 && TYPE < 26.5) ec = vec3(0.07 + sign(hq.x - 0.07) * 0.11, 0.36, 0.29);
    if (TYPE > 30.5 && TYPE < 31.5) ec = vec3(sign(hq.x) * 0.045, 0.0, 0.0);
    vec3 e = normalize(hq - ec);
    vec3 dir = normalize(vec3(LOOK.x * 0.8 + (TYPE > 24.5 && TYPE < 26.5 ? (TYPE < 25.5 ? -0.6 : 0.6) : 0.0), LOOK.y * 0.6, 1.0));
    float cs = dot(e, dir);
    c = vec3(0.96, 0.94, 0.9);
    if (cs > 0.9 - 0.05 * SCARE) c = ty > 3.5 && ty < 4.5 ? vec3(0.75, 0.12, 0.06) : vec3(0.35, 0.78, 0.28);
    if (cs > 0.965 + 0.012 * SCARE) c = vec3(0.02);
    spec = 1.0;
    float lid = ty > 4.5 && TYPE < 19.5 ? 0.38 : 0.0;
    if (e.y > 1.0 - 2.0 * max(BLINK, lid)) c = ty > 4.5 ? vec3(0.38, 0.6, 0.3) : vec3(0.8, 0.75, 0.62);
  } else if (m == M_DARK) {
    c = vec3(0.03, 0.01, 0.02);
    // shiny eyes: a dot of moonlight in each dark eye
    if (isHead) { vec2 sp = vec2(abs(hq.x) - 0.17 - 0.035, hq.y - 0.12); if (length(sp) < 0.028 && hq.y > 0.0 && BLINK < 0.5) { c = vec3(1.0); emit = 1.2; } }
  } else if (m == M_GLOW) {
    vec3 warm = vec3(1.0, 0.58, 0.14);
    vec3 g = mix(warm, vCol.rgb, clamp(GLOW, 0.0, 1.0) * 0.85);
    if (TYPE > 20.5 && TYPE < 21.5) g = mix(vec3(0.55, 0.3, 0.9), vec3(1.0, 0.12, 0.1), MOUTH);   // the REC skull's eyes: red when armed
    if (TYPE > 33.5) g = vec3(0.65, 0.9, 1.0);
    float depth = (ty < 0.5 || TYPE > 21.5 && TYPE < 22.5) ? (0.6 + 0.8 * smoothstep(0.42, 0.2, hq.z)) : 1.0;
    emit = (0.9 + 0.6 * uFlicker + 1.8 * GLOW + 0.6 * uWatch) * depth;
    if (TYPE > 20.5 && TYPE < 21.5) emit = 0.5 + MOUTH * (1.6 + 1.2 * GLOW);
    c = g;
  } else if (m == M_IRON) { c = vec3(0.09, 0.08, 0.11); spec = 0.8; }
  else if (m == M_BREW) { c = vec3(0.35, 1.0, 0.3); emit = 1.0 + 0.8 * GLOW + 0.3 * sin(uTime * 3.0 + p.x * 9.0); }
  else if (m == M_HEART) {
    c = mix(vec3(0.55, 0.03, 0.12), vec3(0.85, 0.12, 0.25), n); spec = 0.8; sss = 0.3;
    if (abs(sin(p.x * 9.0 + sin(p.y * 7.0) * 1.5)) < 0.08 && p.z > 0.0) c = vec3(0.35, 0.05, 0.4);
    emit = 0.25 * GLOW;
  } else if (m == M_GLASS) {
    // a crystal ball, a potion, the vials: mist or liquid glowing inside, a rim of reflected light
    alpha = 1.0; spec = 1.0;
    if (TYPE > 23.5 && TYPE < 24.5) {
      float sw = noise(vec2(atan(p.y - 0.14, p.x) * 2.0 + uTime * 0.6, length(p.xy - vec2(0.0, 0.14)) * 6.0 - uTime * 0.8));
      c = mix(vec3(0.3, 0.1, 0.55), vec3(0.4, 0.95, 0.9), sw);
      emit = 0.6 + 0.6 * sw * (0.6 + GLOW);
    } else if (TYPE > 31.5 && TYPE < 32.5) {
      bool liquid = p.y < -0.05 + 0.03 * sin(p.x * 8.0 + uTime * 2.0);
      c = liquid ? vCol.rgb : vec3(0.12, 0.1, 0.16);
      emit = liquid ? 0.9 + 0.6 * GLOW : 0.05;
      float bub = step(0.985, hash(floor(vec2(p.x * 12.0, p.y * 12.0 - uTime * 3.0))));
      if (liquid) c += bub * 0.8;
    } else if (TYPE > 32.5 && TYPE < 33.5) {
      float i = floor((p.x + 0.57) / 0.38);
      float lv = i < 0.5 ? vPA.x : i < 1.5 ? vPA.y : vPA.z;
      vec3 vc = i < 0.5 ? vec3(1.0, 0.5, 0.1) : i < 1.5 ? vec3(0.7, 0.3, 1.0) : vec3(0.5, 1.0, 0.35);
      bool liquid = p.y < -0.6 + 1.05 * clamp(lv, 0.05, 1.0);
      c = liquid ? vc : vec3(0.12, 0.1, 0.16);
      emit = liquid ? 0.8 + 0.5 * lv : 0.05;
    } else { c = vec3(0.55, 0.6, 0.75); alpha = 0.35; emit = 0.05; }
  } else if (m == M_WOOD) {
    float gr = 0.5 + 0.5 * sin(p.y * 40.0 + noise(p.xy * 6.0) * 6.0);
    c = (TYPE > 29.5 && TYPE < 30.5 ? vec3(0.2, 0.09, 0.14) : vec3(0.42, 0.26, 0.14)) * (0.75 + 0.35 * gr); spec = 0.25;
  } else if (m == M_STRAW) { c = mix(vec3(0.75, 0.55, 0.2), vec3(0.95, 0.8, 0.4), 0.5 + 0.5 * sin(atan(p.x, p.z) * 40.0)); if (MOUTH > 0.5) emit = 0.15 + 0.15 * sin(uTime * 14.0); }
  else if (m == M_SAND) { c = vec3(1.0, 0.62, 0.2); emit = 0.35; }
  else if (m == M_GOLD) { c = vec3(0.95, 0.72, 0.3); spec = 1.0; }
  else if (m == M_SILK) { c = vec3(0.22, 0.12, 0.3) * (0.8 + 0.3 * n); sss = 0.4; spec = 0.3; }
  else if (m == M_PAGE) { c = vec3(0.93, 0.88, 0.74) * (0.9 + 0.1 * n); }
  else if (m == M_CORK) { c = vec3(0.6, 0.42, 0.25) * (0.8 + 0.3 * n); }
  else if (m == M_THREAD) { c = vec3(0.86, 0.86, 0.95); spec = 0.6; emit = 0.15; }
  // blush on the cheeks of the cute ones
  if (isHead && (m == M_SKIN || m == M_CLOTH) && hq.z > 0.18 && !(ty > 2.5 && ty < 3.5)) {
    vec2 ck = vec2(abs(hq.x) - 0.27, hq.y + 0.08);
    float bl = smoothstep(0.09, 0.0, length(ck * vec2(1.0, 1.4)));
    c = mix(c, vec3(1.0, 0.45, 0.6), bl * 0.45);
  }
  return c;
}

// the light of the scene on a surface: the moon (key), the ink below (its colour), a dim warm fill from
// the lanterns, a violet ambient, a coloured rim from behind, and its own glow
vec3 shade(vec3 p, vec3 n, vec3 base, float spec, float emit, float sss) {
  vec3 Lm = normalize(uMoon);
  vec3 Li = normalize(vec3(0.0, -0.75, 0.66));
  vec3 Lw = normalize(vec3(-0.4, -0.2, 0.9));
  float dm = max(dot(n, Lm), 0.0), wm = max(dot(n, Lm) * (1.0 - sss) + sss, 0.0);
  float di = max(dot(n, Li), 0.0), dw = max(dot(n, Lw), 0.0);
  float ao = clamp(0.45 + 0.55 * sceneMap(p + n * 0.12).x / 0.12, 0.25, 1.0);
  vec3 moon = vec3(0.78, 0.84, 1.0);
  vec3 ink = vCol.rgb * (0.18 + 1.3 * INK + 0.4 * GLOW);
  vec3 warm = vec3(1.0, 0.62, 0.32) * (0.22 + 0.12 * uFlicker);
  vec3 lit = base * (vec3(0.1, 0.07, 0.15) * ao + moon * mix(dm, wm, sss) * 1.05 + ink * di * ao + warm * dw);
  float fres = pow(1.0 - max(n.z, 0.0), 3.0);
  lit += mix(vec3(0.5, 0.32, 0.9), vCol.rgb, clamp(GLOW + INK, 0.0, 1.0)) * fres * (0.45 + 0.6 * (GLOW + INK)) * ao;
  vec3 hm = normalize(Lm + vec3(0.0, 0.0, 1.0));
  lit += moon * pow(max(dot(n, hm), 0.0), 60.0) * spec * 0.9;
  vec3 hi = normalize(Li + vec3(0.0, 0.0, 1.0));
  lit += ink * pow(max(dot(n, hi), 0.0), 30.0) * spec * 0.5;
  lit += base * emit;
  lit += vec3(0.2, 0.6, 0.35) * uWatch * 0.12 * fres;
  return lit;
}

// march from the front of the quad at local point lp; returns colour and coverage
vec4 marchAt(vec2 lp, float px, int steps) {
  vec3 ro = vec3(lp, 2.0), rd = vec3(0.0, 0.0, -1.0);
  float eps = max(0.0015, px * 0.3);
  float t = 0.6, dmin = 1e5, tmin = 0.0;
  vec2 h = vec2(1e5, 0.0);
  for (int i = 0; i < 48; i++) {
    if (i >= steps) break;
    h = sceneMap(ro + rd * t);
    if (h.x < dmin) { dmin = h.x; tmin = t; }
    if (h.x < eps || t > 3.4) break;
    t += h.x;
  }
  float cover = h.x < eps ? 1.0 : smoothstep(px * 1.2, 0.0, dmin);
  if (cover <= 0.0) return vec4(0.0);
  vec3 p = ro + rd * t;
  // (a near miss: back to its closest point, measured again so the head's coordinates are this point's;
  // a hit was the last point measured)
  if (h.x >= eps) { t = tmin; p = ro + rd * t; h = sceneMap(p); }
  vec3 hq = gHQ, bq = gBQ;
  vec3 n = normalAt(p);
  gBQ = bq;
  float spec, emit, sss, alpha;
  vec3 base = baseColor(h.y, p, hq, spec, emit, sss, alpha);
  vec3 lit = shade(p, n, base, spec, emit, sss);
  if (alpha < 1.0) { float fres = pow(1.0 - max(n.z, 0.0), 2.0); alpha = alpha + (1.0 - alpha) * fres; lit *= 1.0; }
  return vec4(lit, cover * alpha);
}

void main() {
  TYPE = vDoll.w; SEED = vC.z; SQ = vA.x; HEAD = vA.yz; SWAY = vA.w;
  LOOK = vB.xy; BLINK = vB.z; MOUTH = vB.w; GLOW = vC.x; SCARE = vC.y; REACH = vC.w;
  HL = vPA.xyz; HIPX = vPA.w; HR = vPB.xyz; TWIST = vPB.w; LIFTL = vPC.x; LIFTR = vPC.y; ROLL = vPC.z; INK = vPC.w;
  SPIN = vPlate.y < 0.5 ? vPlate.w : 0.0;
  vec4 col = vec4(0.0);
  // ---- the plate: dark velvet, a stitched seam, a coloured glow when it is on ----
  if (vPlate.y > 0.5) {
    vec2 c = vRect.xy + vRect.zw * 0.5;
    vec2 q = vPos - c;
    vec2 hs = vRect.zw * 0.5;
    float r = min(vPlate.x, min(hs.x, hs.y));
    vec2 qq = abs(q) - hs + r;
    float d = length(max(qq, 0.0)) + min(max(qq.x, qq.y), 0.0) - r;
    float a = smoothstep(0.75, -0.75, d);
    if (a > 0.0) {
      float nz = noise(vPos * 0.6) * 0.5 + noise(vPos * 2.3) * 0.5;
      vec3 pc = mix(vec3(0.075, 0.04, 0.1), vec3(0.13, 0.07, 0.16), 0.5 + 0.5 * (-q.y / hs.y)) * (0.85 + 0.3 * nz);
      pc *= 0.65 + 0.35 * smoothstep(0.0, -9.0, d);
      // moonlight on the plate's top right edge
      pc += vec3(0.5, 0.55, 0.8) * 0.08 * smoothstep(-6.0, 0.0, d) * smoothstep(-hs.x, hs.x, q.x) * smoothstep(hs.y, -hs.y, q.y);
      float seam = abs(d + 4.0);
      float along = abs(qq.x) > abs(qq.y) ? q.y : q.x;
      pc = mix(pc, vec3(0.85, 0.48, 0.2), smoothstep(0.9, 0.2, seam) * step(0.45, fract(along / 6.0)) * 0.4);
      float on = vPlate.z, fl = vPlate.w;
      pc += vCol.rgb * (on * 0.22 + fl * 0.35) * smoothstep(0.0, -16.0, d) + vCol.rgb * (on * 0.5 + fl) * 0.5 * exp(-abs(d) * 0.35);
      col = vec4(pc * a, a);
    }
  }
  if (vDoll.z > 0.5) {
    bool doll = TYPE < 9.5, face = TYPE > 9.5 && TYPE < 19.5;
    float u = vDoll.z / (face ? (TYPE < 10.5 ? 1.6 : 1.3) : TYPE > 19.5 ? 2.0 : 2.2);   // CSS px per unit
    vec2 lp = doll ? vec2(vPos.x - vDoll.x, vDoll.y - vPos.y) / u + vec2(0.0, -1.1) : vec2(vPos.x - vDoll.x, vDoll.y - vPos.y) / u;
    float px = 1.0 / (u * uScale);
    if (doll) {
      // the spotlight on a dancer: a cone of moonlight from above, a bright pool at its feet
      float spot = vPlate.y < 0.5 ? vPlate.x : 0.0;
      if (spot > 0.01) {
        float w = 0.62 + 0.2 * (lp.y + 1.1);
        float edge = smoothstep(w, w * 0.55, abs(lp.x));
        float beam = edge * smoothstep(5.2, 0.4, lp.y + 1.1) * smoothstep(-1.3, -1.0, lp.y) * (0.46 + 0.08 * sin(uTime * 6.0 + lp.y * 3.0));
        // motes of dust turning in the light: soft round specks
        vec2 mg = vec2(lp.x * 7.0, lp.y * 7.0 - uTime * 1.6);
        vec2 mc = floor(mg), mf = fract(mg) - 0.5 - 0.35 * (vec2(hash(mc + 3.7), hash(mc + 8.1)) - 0.5);
        float mote = step(0.94, hash(mc)) * exp(-dot(mf, mf) * 70.0) * edge * 1.4;
        vec2 fp = (lp - vec2(0.0, -1.1)) / vec2(0.9, 0.17);
        float pool = exp(-dot(fp, fp) * 1.3) * 0.75;
        vec3 sc = mix(vec3(0.9, 0.93, 1.0), vCol.rgb, 0.4);
        col.rgb += sc * (beam + pool + mote) * spot; col.a = max(col.a, min(1.0, (beam + pool + mote * 0.5) * spot));
      }
      // its shadow, cast away from the moon (down and to the left), smaller when it floats or jumps
      float lift = max(-SQ, 0.0) * 1.5 + (TYPE > 1.5 && TYPE < 2.5 ? 0.25 : 0.0);
      vec2 sp = (lp - vec2(-0.28, -1.12)) / vec2(0.75 + 0.3 * SQ, 0.13);
      float sh = exp(-dot(sp, sp) * 1.4) * 0.5 * vCol.a * (1.0 - 0.5 * lift);
      col.rgb *= 1.0 - sh; col.a = max(col.a, sh * 0.8);
      // its reflection in the glass it stands on
      bool refl = vPlate.y < 0.5 && vPlate.z > 0.5;
      if (refl && lp.y < -1.1 && lp.y > -1.55 && abs(lp.x) < 0.75) {
        vec4 rc = marchAt(vec2(lp.x, -2.2 - lp.y), px, 20);
        float k = 0.2 * smoothstep(-1.6, -1.12, lp.y);
        col.rgb = col.rgb * (1.0 - rc.a * k) + rc.rgb * rc.a * k; col.a = max(col.a, rc.a * k);
      }
    }
    // its glow when it sings (and when they all watch you)
    float aur = (GLOW * 0.8 + uWatch * 0.22 * (doll ? 1.0 : 0.3)) * exp(-dot(lp - vec2(0.0, doll ? 0.1 : 0.0), lp - vec2(0.0, doll ? 0.1 : 0.0)) * 0.9);
    col.rgb += vCol.rgb * aur * 0.32; col.a = max(col.a, min(aur * 0.32, 1.0));
    // (rays are sent only where the thing can be: an ellipse round a doll, even arms up or spinning; a
    // disc round a button or a face)
    vec2 bq = doll ? (lp - vec2(0.0, -0.1)) / vec2(1.02, 1.27) : lp / (face ? 0.9 : 1.12);
    if (dot(bq, bq) < 1.0) {
      vec4 dc = marchAt(lp, px, doll ? 44 : 40);
      col.rgb = col.rgb * (1.0 - dc.a) + dc.rgb * dc.a;
      col.a = col.a + dc.a * (1.0 - col.a);
    }
  }
  o = col;
}`;var Ys=10,Pi=Ys*4,Ya=96,qi=24;function Ka(o,e,t,s){let i=o.createShader(e);return o.shaderSource(i,t),o.compileShader(i),o.getShaderParameter(i,o.COMPILE_STATUS)||s.push(o.getShaderInfoLog(i)||"shader"),i}function Xa(o,e,t,s,i){let a=o.createProgram();o.attachShader(a,Ka(o,o.VERTEX_SHADER,e,s)),o.attachShader(a,Ka(o,o.FRAGMENT_SHADER,t,s)),(i||[]).forEach((l,c)=>o.bindAttribLocation(a,c,l)),o.linkProgram(a),o.getProgramParameter(a,o.LINK_STATUS)||s.push(o.getProgramInfoLog(a)||"link");let r={},n=o.getProgramParameter(a,o.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let c=o.getActiveUniform(a,l);r[c.name.replace(/\[0\]$/,"")]=o.getUniformLocation(a,c.name)}return{p:a,u:r}}var Vs=class{constructor(e){this.errors=[],this.canvas=document.createElement("canvas"),this.canvas.className="ghouls",this.canvas.setAttribute("aria-hidden","true"),e.insertBefore(this.canvas,e.firstChild),this.data=new Float32Array(Ya*Pi),this.lost=!1,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.lost=!0}),this.canvas.addEventListener("webglcontextrestored",()=>{this.lost=!1,this.init()}),this.init()}init(){let e=this.canvas.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(this.gl=e,this.ok=!!e,!e)return;this.errors=[],this.night=Xa(e,ja,Ga,this.errors,["aPos"]);let t=["aCorner","iRect","iPlate","iDoll","iAnimA","iAnimB","iAnimC","iColor","iPoseA","iPoseB","iPoseC"];if(this.dolls=Xa(e,Wa,Va,this.errors,t),this.errors.length){this.ok=!1;return}this.tri=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.tri),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),this.vaoNight=e.createVertexArray(),e.bindVertexArray(this.vaoNight),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.vaoDolls=e.createVertexArray(),e.bindVertexArray(this.vaoDolls),this.corner=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.corner),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.inst=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.inst),e.bufferData(e.ARRAY_BUFFER,this.data.byteLength,e.DYNAMIC_DRAW);for(let s=0;s<Ys;s++)e.enableVertexAttribArray(1+s),e.vertexAttribPointer(1+s,4,e.FLOAT,!1,Pi*4,s*16),e.vertexAttribDivisor(1+s,1);e.bindVertexArray(null),this.keyRects=new Float32Array(qi*4),this.keyInfo=new Float32Array(qi*4)}resize(e,t,s){let i=Math.max(1,Math.round(e*s)),a=Math.max(1,Math.round(t*s));(this.canvas.width!==i||this.canvas.height!==a)&&(this.canvas.width=i,this.canvas.height=a),this.scale=i/Math.max(e,1)}draw(e){let t=this.gl;if(!this.ok||this.lost||!t)return;let s=this.canvas.width,i=this.canvas.height,a=this.scale;t.viewport(0,0,s,i),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA);let r=this.night,n=r.u;t.useProgram(r.p),t.uniform2f(n.uRes,s,i),t.uniform1f(n.uScale,a),t.uniform1f(n.uTime,e.time);let l=e.pad||{x:-1e4,y:-1e4,w:1,h:1,r:0};t.uniform4f(n.uPad,l.x,l.y,l.w,l.h),t.uniform1f(n.uPadR,l.r),t.uniform1f(n.uStage,e.pad&&e.stage?1:0);let c=(e.keys||[]).slice(0,qi);this.keyRects.fill(0),this.keyInfo.fill(0),c.forEach((h,v)=>{this.keyRects.set([h.x0,h.y0,h.x1,h.y1],v*4),this.keyInfo.set([h.black?1:0,h.lit||0,0,0],v*4)}),n.uKeys&&t.uniform4fv(n.uKeys,this.keyRects),n.uKeyInfo&&t.uniform4fv(n.uKeyInfo,this.keyInfo),t.uniform1f(n.uNKeys,c.length),t.uniform3f(n.uAccent,e.accent[0],e.accent[1],e.accent[2]),t.uniform1f(n.uWatch,e.watch),t.uniform1f(n.uBeat,e.beat),t.uniform1f(n.uCalm,e.calm?1:0),t.bindVertexArray(this.vaoNight),t.drawArrays(t.TRIANGLES,0,3);let d=Math.min(e.dolls,Ya);if(d>0){let h=this.dolls,v=h.u;t.useProgram(h.p),t.uniform2f(v.uRes,s,i),t.uniform1f(v.uScale,a),t.uniform1f(v.uTime,e.time),t.uniform1f(v.uFlicker,e.flicker),t.uniform1f(v.uWatch,e.watch),t.uniform1f(v.uCalm,e.calm?1:0),v.uMoon&&t.uniform3f(v.uMoon,.55,.7,.45),t.bindVertexArray(this.vaoDolls),t.bindBuffer(t.ARRAY_BUFFER,this.inst),t.bufferSubData(t.ARRAY_BUFFER,0,e.data,0,d*Pi),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,d)}t.bindVertexArray(null)}destroy(){let e=this.gl;if(e){let t=e.getExtension("WEBGL_lose_context");t&&t.loseContext()}this.canvas.remove(),this.ok=!1}};var ke={PUMPKIN:0,VOODOO:1,GHOST:2,SKULL:3,MUMMY:4,FRANK:5},rn=o=>10+o,ce={CAULDRON:20,SKULL:21,PUMPKIN:22,HEART:23,CRYSTAL:24,BAT_L:25,BAT_R:26,DIE:27,HOURGLASS:28,BROOM:29,COFFIN:30,WEB:31,POTION:32,VIALS:33,BOOK:34},Qa=[[".top .logo",ce.CAULDRON,"fill"],[".top .tbtn.rec",ce.SKULL,"fill","rec"],[".top .tbtn.play",ce.PUMPKIN,"fill","play"],[".top .progress",-1,"plate"],[".top .chip.tempo",ce.HEART,"left","tempo"],[".top .chip:not(.tempo)",ce.CRYSTAL,"left"],[".parts .ptab",o=>rn({drum:ke.PUMPKIN,bass:ke.FRANK,lead:ke.GHOST}[o.dataset.p]??ke.GHOST),"face","part"],[".inst .arrow:not(.dice)",(o,e)=>e===0?ce.BAT_L:ce.BAT_R,"fill"],[".inst .dice",ce.DIE,"fill","dice"],[".view .controls .dial",-1,"plate"],[".view .range",-1,"plate"],[".timeline .tbtn",(o,e)=>[ce.HOURGLASS,ce.BROOM,ce.COFFIN][e]??ce.COFFIN,"fill","tool"],[".timeline .tl",-1,"plate"],[".groups .grp",-1,"plate"],[".autobar .pill",-1,"plate"],[".faders .fader",-1,"plate"],[".faders .fader .m",-1,"plate"],[".mixknobs .dial",-1,"plate"],[".nav button",(o,e)=>[ce.WEB,ce.POTION,ce.VIALS,ce.BOOK][e]??ce.WEB,"nav","nav"]],dt=(o,e)=>o+Math.random()*(e-o),Xs=(o,e,t)=>Math.max(e,Math.min(t,o)),It=o=>(o=Xs(o,0,1),o*o*(3-2*o)),st=(o,e,t)=>o+(e-o)*t,$s=(o,e,t)=>[st(o[0],e[0],t),st(o[1],e[1],t),st(o[2],e[2],t)],Ks={[ke.PUMPKIN]:[[-.42,-.66,.08],[.42,-.66,.08]],[ke.VOODOO]:[[-.64,-.2,.04],[.64,-.2,.04]],[ke.GHOST]:[[-.6,-.12,.05],[.6,-.12,.05]],[ke.SKULL]:[[-.4,-.6,.12],[.4,-.6,.12]],[ke.MUMMY]:[[-.5,-.38,.4],[.5,-.38,.4]],[ke.FRANK]:[[-.46,-.78,.08],[.46,-.78,.08]]},Te=(o,e,t={})=>({hl:o,hr:e,hip:t.hip||0,twist:t.twist||0,ll:t.ll||0,lr:t.lr||0,roll:t.roll||0,spin:t.spin||0,bounce:t.bounce||0,head:t.head||0}),$t=(o,e,t)=>Te($s(o.hl,e.hl,t),$s(o.hr,e.hr,t),{hip:st(o.hip,e.hip,t),twist:st(o.twist,e.twist,t),ll:st(o.ll,e.ll,t),lr:st(o.lr,e.lr,t),roll:st(o.roll,e.roll,t),spin:st(o.spin,e.spin,t),bounce:st(o.bounce,e.bounce,t),head:st(o.head,e.head,t)}),gs=o=>{let e=o-Math.floor(o);return e<.6?Math.sin(Math.PI*e/.6):0},nn=(o,e)=>{let t=o.length,s=Math.floor(e)%t,i=e-Math.floor(e);return $t(o[(s+t-1)%t],o[s],It(i/.22))},$a=Te([-.05,.18,.36],[.78,.48,.1],{roll:.32,head:-.06,twist:-.2}),Qt={passinho:{name:"Passinho do Jamal",weight:4,at(o){if(o<4){let s=Math.floor(o/2),i=s%2?-1:1,a=o-s*2,r=a<1.5?gs(a*2)*.8:0,n=Math.sin(Math.PI*a/2),l=.2*Math.sin(Math.PI*2*a-.7);return Te([-.46+l,-.5+.12*r+.06*Math.abs(l),.16],[.46+l,-.48+.12*r,.16],{ll:i<0?r:0,lr:i>0?r:0,hip:-.17*i*n,twist:.25*i*n,roll:.12*i*n,bounce:.08*r})}let e=o-4;if(e<1)return $t(Te([-.36,-.62,.12],[.36,-.6,.12]),Te([.22,-.22,.32],[-.22,-.18,.34]),It(e/.3));if(e<2)return $t(Te([.22,-.22,.32],[-.22,-.18,.34]),Te([-.32,-.62,.1],[.32,-.62,.1],{hip:.08*Math.sin(Math.PI*2*e)}),It((e-1)/.3));if(e<3){let s=It(e-2);return Te([-.42,-.4,.1],[.42,-.4,.1],{spin:Math.PI*2*s,ll:.25*Math.sin(Math.PI*s),lr:.25*Math.sin(Math.PI*s),bounce:-.08*Math.sin(Math.PI*s)})}if(e<3.5)return $t(Te([-.42,-.4,.1],[.42,-.4,.1]),Te([-.08,.12,.42],[.08,.1,.42],{head:-.05,roll:.1}),It((e-3)/.25));let t=Math.PI*2*It((e-3.5)/.5);return Te([-.25*Math.cos(t),-.2+.25*Math.sin(t),.36],[.25*Math.cos(t),-.2+.25*Math.sin(t),.36],{roll:.08*Math.sin(t)})}},bemsolto:{name:"Passo bem solto",weight:2,at(o){if(o>7)return $a;let e=Math.sin(Math.PI*2*o),t=Math.sin(Math.PI*4*o);return Te([-.58-.12*e,-.25+.3*t,.3*e],[.58-.12*e,-.25-.3*t,-.3*e],{ll:Math.max(0,t)*.75,lr:Math.max(0,-t)*.75,twist:.35*e,roll:.15*e,bounce:.1*Math.abs(t),hip:.1*e})}},slick:{name:"Slick back",weight:2,at(o){let e=Math.sin(Math.PI*o/2),t=o*4;return Te([-.45-.1*e,-.45+.12*Math.sin(Math.PI*2*o),.2],[.45-.1*e,-.45-.12*Math.sin(Math.PI*2*o),.2],{ll:gs(t)*.4*(Math.floor(t)%2?1:0),lr:gs(t)*.4*(Math.floor(t)%2?0:1),hip:.26*e,twist:-.16*e,roll:.08*e})}},floss:{name:"Floss",weight:1,at(o){if(o>7)return $a;let e=Math.sin(Math.PI*2*o),t=Math.cos(Math.PI*2*o);return Te([-.18+.75*e,-.5,.36*t],[.18+.75*e,-.5,-.36*t],{hip:-.22*e,twist:.22*e,bounce:.05*Math.abs(e)})}},goule:{name:"Danse de la goule",weight:1,at(o){let e=[Te([-.3,-.06,.26],[.3,-.06,.26],{roll:.25,twist:.2}),Te([-.8,-.22,.05],[.26,-.58,.18],{roll:-.3,twist:-.25,ll:.2}),Te([-.42,.28,.16],[.42,.28,.16],{roll:.12,head:.04}),Te([.18,-.6,.3],[-.18,-.6,.32],{roll:-.22,twist:.3,lr:.25})];return nn(e,o*2)}},zombies:{name:"Danse des zombies",weight:1,at(o){let e=o%4,t=e<2?-1:1,s=e%2,i=Math.max(0,Math.sin(Math.PI*2*s))*.08;return Te([.55*t-.25,-.12+i,.25],[.55*t+.25,-.1+i,.3],{roll:.3*t,hip:.1*t*Math.sin(Math.PI*s),twist:.2*t,bounce:i*.6,ll:t<0?gs(s*2)*.3:0,lr:t>0?gs(s*2)*.3:0})}}},Ci=Object.keys(Qt);function Qs(){let o=Ci.reduce((t,s)=>t+Qt[s].weight,0),e=Math.random()*o;for(let t of Ci)if(e-=Qt[t].weight,e<=0)return t;return Ci[0]}var ys=class{constructor(e,t){this.type=e,this.seed=t,this.sq=0,this.sqv=0,this.sqT=0,this.hx=0,this.hy=0,this.hvx=0,this.hvy=0,this.sw=0,this.swv=0,this.lx=0,this.ly=0,this.ltx=0,this.lty=0,this.blink=0,this.blinkAt=performance.now()+dt(800,4e3),this.mouth=0,this.mouthT=0,this.glow=0,this.glowT=0,this.scare=0,this.reach=0,this.reachT=0,this.held=0,this.color=[1,.55,.15],this.twitchAt=performance.now()+dt(3e3,12e3),this.ink=0,this.dance=null,this.spot=0;let s=Ks[e]||Ks[ke.PUMPKIN];this.p=Te(s[0].slice(),s[1].slice())}press(e=1){this.held++,this.dance=null,this.sqT=.32*e,this.sqv-=2.5*e,this.mouthT=1,this.scare=1,this.hvy-=3.5*e,this.hvx+=dt(-2.5,2.5)*e,this.swv+=dt(-3,3)*e}release(){this.held=Math.max(0,this.held-1),this.held||(this.sqT=0,this.mouthT=0,this.sqv-=3.5,this.hvx+=dt(-2,2))}sing(e=.8,t){this.mouth=Math.max(this.mouth,Math.min(1,.45+e*.6)),this.glow=Math.max(this.glow,Math.min(1,e)),this.sqv-=2.2*e,this.hvy+=1.5*e,t&&(this.color=t)}startle(e){e<=.02||(this.scare=Math.max(this.scare,e),this.sqv-=3*e,this.hvx+=dt(-3,3)*e,this.hvy+=2*e)}step(e,t,s,i){let a=s?.5:1,r=this.sqT+(s?0:.018*Math.sin(t/700+this.seed*9)),n=Ks[this.type]||Ks[ke.PUMPKIN],l=s?0:.04*Math.sin(t/900+this.seed*7),c=Te([n[0][0],n[0][1]+l,n[0][2]],[n[1][0],n[1][1]-l,n[1][2]]);this.reach>.01&&(c=$t(c,Te([-.5,.48,.12],[.5,.48,.12]),this.reach));let d=0;if(this.dance&&!s){let y=this.dance,x=i-y.start;if(x>=y.len||x<-1)this.dance=null;else if(x>=0){let T=Qt[y.name].at(x),E=It(Math.min(x/.25,(y.len-x)/.25,1));c=$t(c,T,E),r+=T.bounce*E,d=E}}let h=1-Math.exp(-e*22),v=this.p;v.hl=$s(v.hl,c.hl,h),v.hr=$s(v.hr,c.hr,h);for(let y of["hip","twist","ll","lr","roll","head"])v[y]=st(v[y],c[y],h);v.spin=c.spin,this.spot+=(d-this.spot)*(1-Math.exp(-e*6)),this.sqv+=(-(this.sq-r)*340-this.sqv*15)*e,this.sq=Xs(this.sq+this.sqv*e,-.35,.5),this.hvx+=(-this.hx*180-this.hvx*9)*e,this.hx+=this.hvx*e,this.hvy+=(-(this.hy-v.head)*220-this.hvy*10)*e,this.hy+=this.hvy*e,this.hx=Xs(this.hx,-.25,.25),this.hy=Xs(this.hy,-.2,.2);let p=s?0:.1*Math.sin(t/1300+this.seed*5)*a;this.swv+=(-(this.sw-p)*90-this.swv*7)*e,this.sw+=this.swv*e;let m=1-Math.exp(-e*10);this.lx+=(this.ltx-this.lx)*m,this.ly+=(this.lty-this.ly)*m,t>this.blinkAt&&(this.blinkStart=t,this.blinkAt=t+dt(1800,6e3)*(s?1.6:1));let f=this.blinkStart?(t-this.blinkStart)/140:9;this.blink=f<1?Math.sin(f*Math.PI):0,!s&&t>this.twitchAt&&(this.twitchAt=t+dt(6e3,16e3),this.hvx+=dt(-4,4),this.swv+=dt(-4,4));let b=1-Math.exp(-e*(this.mouthT>this.mouth?22:7));this.mouth+=(Math.max(this.mouthT,0)-this.mouth)*b,this.glow=Math.max(this.glowT,this.glow*Math.exp(-e*3.2)),this.scare*=Math.exp(-e*3.5),this.reach+=(this.reachT-this.reach)*(1-Math.exp(-e*8))}};function Oi(o){if(o=(o||"").trim(),o.startsWith("color("))return o.match(/[\d.]+/g).map(Number).slice(-3).map(s=>s>1?s/255:s);if(o.startsWith("#"))return(o.length===4?o.slice(1).split("").map(s=>s+s):[o.slice(1,3),o.slice(3,5),o.slice(5,7)]).map(s=>parseInt(s,16)/255);let e=o.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[1,.5,.1]}function Ja(o,e){if(o==="fill"){let t=Math.min(e.height,e.width)*1.02;return{x:e.left+e.width/2,y:e.top+e.height/2,s:t}}if(o==="left"){let t=e.height*.8;return{x:e.left+e.height*.38,y:e.top+e.height/2,s:t}}if(o==="face"){let t=e.height*.9;return{x:e.left+e.height*.5,y:e.top+e.height/2,s:t}}if(o==="nav"){let t=Math.min(e.height*.7,36);return{x:e.left+e.width/2,y:e.top+t*.55+2,s:t}}return null}var Za=Ys*4,ln=[ke.PUMPKIN,ke.SKULL,ke.GHOST,ke.VOODOO],eo=[ke.GHOST,ke.PUMPKIN,ke.SKULL,ke.VOODOO,ke.MUMMY,ke.FRANK],to=9e3,cn=112;function so(o,{pad:e,app:t,fx:s}){let i=()=>{let M=s&&s();return M&&M.fluid&&M.fluid.ok?M.fluid:null},a=matchMedia("(prefers-reduced-motion: reduce)"),r=null,n=0,l=!1,c=null,d=!0,h=[],v=new Map,p=[],m="",f=[],b=null,y={x:-1,y:-1,t:-1e9},x=performance.now(),T=0,E=new Map,O=new Map,j=0,le=-1,V=!1,P=null,X={tick:0,at:0,msPerTick:6e4/11520},N=0,Y=-1,F=null,he=null,U=()=>Math.min(window.devicePixelRatio||1,1.75),_=U(),Z=16,ue=0,$=0,Le=0,ne=0,Ne=0,S=new Float32Array(128*Za),q=1,R={drum:[1,.5,.1],bass:[.7,.3,1],lead:[.45,1,.3],rec:[1,.15,.12],accent:[1,.5,.1],play:[1,.55,.1]},A=()=>{let M=getComputedStyle(t);for(let H of["drum","bass","lead","rec"])R[H]=Oi(M.getPropertyValue("--"+H));R.accent=Oi(M.getPropertyValue("--accent"))},I=()=>t.getBoundingClientRect(),Q=()=>q++*.6180339%1;function oe(){d=!1;let M=[];for(let[H,B,C,te]of Qa)t.querySelectorAll(H).forEach((ee,We)=>{let Ie=typeof B=="function"?B(ee,We):B,De=v.get(ee);Ie>=0&&(!De||De.type!==Ie)&&(De=new ys(Ie,Q()),De.state=0,De.act=0,De.actT=0,v.set(ee,De));let lt=parseFloat(getComputedStyle(ee).borderTopLeftRadius)||12;M.push({el:ee,kind:C,tag:te,doll:Ie>=0?De:null,radius:lt,flash:0,plate:!ee.closest(".gpu-host")})});h=M}let ie=M=>{let H=null;for(let B of h)B.el.contains(M)&&(!H||H.el.contains(B.el))&&(H=B);return H};function we(){let M=e.keyLayout(),H=M.sig.startsWith("piano");return M.sig!==m&&(m=M.sig,p=M.keys.map((B,C)=>new ys(e.part==="drum"?ln[C%4]:H&&B.cut?ke.SKULL:eo[C%eo.length],Q())),F&&F.classList.remove("show")),f=M.keys,H}let nt=(M,H)=>{for(let B=f.length-1;B>=0;B--){let C=f[B];if(C.cut&&M>=C.x0&&M<C.x1&&H>=C.y0&&H<C.y1)return B}for(let B=0;B<f.length;B++){let C=f[B];if(!C.cut&&M>=C.x0&&M<C.x1&&H>=C.y0&&H<C.y1)return B}return-1},ze=(M,H,B,C,te)=>{let ee=(M.x1-M.x0)*C;if(e.part==="drum")return{y:.86,s:Math.min(ee*1.02,te*.38)};if(B&&M.cut){let Ie=Math.min(ee*1.25,te*.15,46);return{y:M.y1-6/te,s:Ie}}let We=Math.min(ee*1.3,te*.24,74);return{y:1-24/te,s:We}};function it(M,H,B,C){if(!l)return;we(),as(null,H,B);let te=O.get(M);if(C==="up"||C==="cancel"){te!==void 0&&p[te]&&(p[te].release(),p[te].reachT=0),O.delete(M);return}let ee=nt(H,B);if(ee!==te&&(te!==void 0&&p[te]&&(p[te].release(),p[te].reachT=0),ee>=0&&p[ee].press(C==="down"?1:.6),ee>=0?O.set(M,ee):O.delete(M)),ee>=0){let We=p[ee],Ie=e.el.getBoundingClientRect(),De=ze(f[ee],ee,e.piano,Ie.width,Ie.height),lt=De.y-De.s/Ie.height,pt=Math.max(0,Math.min(1,(lt-B)/.25));We.reachT=pt,We.sqT=pt>.1?-.22*pt:.32}}function at(M,H,B,C,te=.8){if(!l)return;we();let ee=M==="drum"?C:nt(Math.min(.999,Math.max(0,H)),Math.min(.999,Math.max(0,B)));if(ee<0&&M!=="drum"){let Ie=1e9;f.forEach((De,lt)=>{let pt=Math.abs((De.x0+De.x1)/2-H);!De.cut&&pt<Ie&&(Ie=pt,ee=lt)})}let We=p[ee];We&&We.sing(te,R[M]||R.accent)}let ot=M=>V?X.tick/96+(M-X.at)/(X.msPerTick*96):M/(6e4/cn);function wt(M,H,B){for(let C of M)C.dance={name:H,start:B,len:8};he={dolls:M,name:H,until:B+8},F||(F=document.createElement("div"),F.className="hw-dance",t.append(F)),F.textContent="\u266A "+Qt[H].name}function xs(M){if(a.matches||!p.length||o.ui.view!=="pattern")return;let H=ot(M);if(V){let B=Math.floor(H/4);if(B!==Y&&(Y=B,B%4===2&&!p.some(C=>C.dance)&&Math.random()<.75)){let C=p.filter(We=>!We.held),te=Math.min(C.length,1+Math.floor(Math.random()*3)),ee=C.sort(()=>Math.random()-.5).slice(0,te);ee.length&&wt(ee,Qs(),B*4)}}else if(M>N){if(N){let B=p.filter(C=>!C.held&&!C.dance);B.length&&M-x>2500&&wt([B[Math.floor(Math.random()*B.length)]],Qs(),Math.ceil(H))}N=M+15e3+Math.random()*15e3}}function as(M,H,B){let C=I();if(M)y.x=M.clientX-C.left,y.y=M.clientY-C.top;else{let te=e.el.getBoundingClientRect();y.x=te.left-C.left+H*te.width,y.y=te.top-C.top+B*te.height}y.t=performance.now(),x=y.t}let Nt=M=>{if(!l)return;as(M);let H=ie(M.target),B=[];if(H){H.flash=1;let C=H.doll;C&&(C.press(.8),B.push(C),(C.type===ce.DIE||C.type===ce.BOOK||C.type===ce.WEB)&&(C.act=0,C.actT=1),C.type===ce.HOURGLASS&&(C.actT=C.actT>.5?0:1),C.type===ce.COFFIN&&(C.actT=1))}E.set(M.pointerId,B);for(let C of h){if(!C.doll||C===H||!C.pos)continue;let te=Math.hypot(C.pos.x-y.x,C.pos.y-y.y);C.doll.startle(Math.max(0,1-te/150)*.6)}},os=M=>{l&&E.has(M.pointerId)&&as(M)},St=M=>{let H=E.get(M.pointerId);if(H){for(let B of H)B.release(),B.type===ce.COFFIN&&setTimeout(()=>{B.actT=0},450);E.delete(M.pointerId)}};function yo(M){if(n=0,!l||!r)return;let H=Math.min(.05,ue?(M-ue)/1e3:1/60);ue&&(Z=Z*.94+(M-ue)*.06,M<Ne?$=0:Z>18?++$>45&&_>1&&(_=Math.max(1,_*.85),$=0):($=Math.max(0,$-1),Z<15&&_<U()&&(_=Math.min(U(),_+.002)))),ue=M,d&&oe(),M-ne>500&&(A(),ne=M);let B=a.matches,C=p.some(J=>J.dance),te=M-x<1500||V||E.size||O.size||C;if(Le++,!te&&Le%2){ks();return}let ee=I();r.resize(ee.width,ee.height,_);let We=M-x;T+=((We>to&&!C?1:0)-T)*(1-Math.exp(-H*(We>to?.8:6))),j*=Math.exp(-H*6);let Ie=.5+.5*Math.sin(M/90)*Math.sin(M/37+1.3)*(B?.3:1);xs(M);let De=ot(M),lt=0,pt=(J,Be,Ue,be,Oe,Ve,xe)=>{let G=lt*Za;if(S.set(J,G),S.set(Be,G+4),be&&Ue){let Me=be.p;S.set([Ue.x,Ue.y,Ue.s,be.type],G+8),S.set([be.sq,be.hx,be.hy,be.sw],G+12),S.set([be.lx,be.ly,be.blink,Oe],G+16),S.set([be.glow,be.scare,be.seed,be.type>=20?be.act:be.reach],G+20),S.set([Ve[0],Ve[1],Ve[2],xe],G+24),S.set([Me.hl[0],Me.hl[1],Me.hl[2],Me.hip],G+28),S.set([Me.hr[0],Me.hr[1],Me.hr[2],Me.twist],G+32),S.set([Me.ll,Me.lr,Me.roll,be.ink],G+36)}else S.fill(0,G+8,G+40),S.set([Ve[0],Ve[1],Ve[2],xe],G+24);lt++},Ni=(J,Be,Ue)=>{if(T>.5){J.ltx=0,J.lty=.05;return}M-y.t<3500?(J.ltx=Math.max(-1,Math.min(1,(y.x-Be)/170)),J.lty=Math.max(-1,Math.min(1,(Ue-y.y)/220))):(J.ltx=.5*Math.sin(M/2300+J.seed*20),J.lty=.25*Math.sin(M/3100+J.seed*13))};for(let J of h){let Be=J.el.getBoundingClientRect();if(Be.width<2||Be.height<2||Be.bottom<0||Be.top>ee.height+ee.top){J.pos=null;continue}let Ue={left:Be.left-ee.left,top:Be.top-ee.top,width:Be.width,height:Be.height,right:Be.right-ee.left,bottom:Be.bottom-ee.top},be=J.el,Oe=be.getAttribute("aria-pressed")==="true",Ve=Oe||be.getAttribute("aria-selected")==="true"||be.classList.contains("active")||be.classList.contains("on")?1:0,xe=R.accent,G=J.doll,Me=0;if(G){if(G.glowT=0,G.type<20&&(Me=G.mouth),J.tag==="rec"?(xe=R.rec,Me=Oe?1:0,G.glowT=Oe&&V?.5+.5*j:0):J.tag==="play"?(xe=R.play,Me=Oe?1:0,G.glowT=Oe?.35+.65*j:0):J.tag==="tempo"?(xe=R.rec,G.glowT=V?j:.5+.5*Math.pow(Math.max(0,Math.sin(M/430)),12)):J.tag==="part"?(xe=R[be.dataset.p]||R.accent,G.glowT=Ve?.35:0):J.tag==="nav"?(G.glowT=Ve?.4:0,xe=R.accent):J.tag==="tool"&&G.type===ce.BROOM&&(Me=Oe?1:0),G.type===ce.VIALS&&P){let Tt=bo=>Math.min(1,Math.sqrt(bo||0)*1.3);G.p.hl=[.25+.75*Tt(P.drum),.25+.75*Tt(P.bass),.25+.75*Tt(P.lead)]}else G.type===ce.VIALS&&(G.p.hl=[.55,.4,.7]);G.act+=(G.actT-G.act)*(1-Math.exp(-H*(G.type===ce.DIE?5:7))),(G.type===ce.DIE||G.type===ce.BOOK||G.type===ce.WEB)&&G.act>.97&&(G.act=0,G.actT=0)}J.flash*=Math.exp(-H*5);let gt=G?Ja(J.kind,Ue):null;if(J.pos=gt,G&&(Ni(G,gt.x,gt.y),G.step(H,M,B,De)),pt([Ue.left,Ue.top,Ue.width,Ue.height],[J.radius,J.plate?1:0,Ve,J.flash],gt,G,Me,xe,1),lt>=100)break}let Ss=null,zi=[],rt=null;if(o.ui.view==="pattern"&&e.el.isConnected){let J=e.el.getBoundingClientRect();if(J.width>10&&J.height>10){let Be=we();Ss={x:J.left-ee.left,y:J.top-ee.top,w:J.width,h:J.height,r:parseFloat(getComputedStyle(e.el).borderTopLeftRadius)||20};let Ue=R[e.part]||R.accent,be=!!e.gpu;f.forEach((Oe,Ve)=>{let xe=p[Ve];if(!xe)return;let G=ze(Oe,Ve,Be,J.width,J.height),Me=Ss.x+(Oe.x0+Oe.x1)/2*J.width,gt=Ss.y+G.y*J.height,Tt=b&&b[Ve]||0;xe.glowT=Math.max(Tt*.6,V?.1*j:0),xe.ink+=(Math.max(Tt,xe.glow*.8)-xe.ink)*(1-Math.exp(-H*8)),xe.color=Ue,Ni(xe,Me,gt-G.s*.6),xe.step(H,M,B,De),xe.dance&&he&&he.dolls.includes(xe)&&(rt=rt||{x:0,y:1e9,n:0},rt.x+=Me,rt.n++,rt.y=Math.min(rt.y,gt-G.s*1.05)),zi.push({x0:Oe.x0,y0:Oe.y0,x1:Oe.x1,y1:Oe.y1,black:!!Oe.cut,lit:Math.max(Tt,xe.glow*.6)}),pt([0,0,0,0],[xe.spot,0,be?1:0,xe.p.spin],{x:Me,y:gt,s:G.s},xe,xe.mouth,Ue,be?.6:1)})}}F&&(rt&&rt.n?(F.style.transform=`translate(${(rt.x/rt.n).toFixed(1)}px, ${(rt.y-22).toFixed(1)}px) translate(-50%, -100%)`,F.classList.add("show")):F.classList.remove("show")),r.draw({time:M/1e3,flicker:Ie,watch:T,beat:j,calm:B,pad:Ss,stage:!e.gpu,keys:zi,accent:R.accent,dolls:lt,data:S}),r.errors.length&&!ws.reported&&(ws.reported=!0,console.warn("MOTIF Halloween:",r.errors.join(`
`)));let rs=i();rs&&(rs.stage=[1,(B?M*.25:M)/1e3,T,j],rs.scene&&rs.scene.glass&&(o.ui.view==="pattern"||o.ui.view==="tweaks")&&rs.keepAwake()),ks()}let ks=()=>{l&&!n&&document.visibilityState==="visible"&&(n=requestAnimationFrame(yo))},Fi=()=>{ue=0,Ne=performance.now()+3e3,ks()},ws={get on(){return l},get stage(){return l&&!e.gpu},get ok(){return!!(r&&r.ok)},get errors(){return r?r.errors:[]},get ema(){return Z},get scale(){return _},get dolls(){return p},dance(M,H=2){if(!l||!p.length)return;let B=performance.now();wt(p.slice(0,H),M||Qs(),Math.ceil(ot(B)))},set(M){if(M!==l){if(l=M,l)r=new Vs(t),r.ok||console.warn("MOTIF Halloween: WebGL 2 indisponible",r.errors),A(),d=!0,m="",c=new MutationObserver(()=>{d=!0}),c.observe(t,{childList:!0,subtree:!0}),document.addEventListener("pointerdown",Nt,!0),document.addEventListener("pointermove",os,!0),document.addEventListener("pointerup",St,!0),document.addEventListener("pointercancel",St,!0),document.addEventListener("visibilitychange",Fi),x=performance.now(),ue=0,N=performance.now()+9e3,Ne=performance.now()+3e3,ks();else{n&&cancelAnimationFrame(n),n=0,c&&c.disconnect(),c=null,document.removeEventListener("pointerdown",Nt,!0),document.removeEventListener("pointermove",os,!0),document.removeEventListener("pointerup",St,!0),document.removeEventListener("pointercancel",St,!0),document.removeEventListener("visibilitychange",Fi),r&&r.destroy(),r=null,F&&(F.remove(),F=null),h=[],v.clear(),p=[],m="",E.clear(),O.clear();let H=i();H&&(H.stage=null,H.wake())}e.draw()}},refresh(){l&&(A(),d=!0,m="")},press:it,note:at,keyLights(M){b=M},level(M){if(!l||!M)return;let H=V;if(V=!!M.playing,V!==H){for(let B of p)B.dance=null;Y=-1}if(M.playing&&M.tick>=0){X={tick:M.tick,at:performance.now(),msPerTick:6e4/((o.project.tempo||120)*96)};let B=Math.floor(M.tick/96);if(B!==le){le=B,j=1;let C=M.tick%384<96;for(let te of p)te.dance||(te.sqv-=C?1.6:.8);for(let te of h)te.doll&&te.tag==="play"&&(te.doll.sqv-=C?2.2:1.2)}}if(M.m&&(P={d:M.m.d,bass:M.m.bass,lead:M.m.lead,drum:M.m.drum}),M.trig){for(let B=0;B<M.trig.length;B+=4)if(M.trig[B]===0&&M.trig[B+1]===0){for(let C of h)C.doll&&(C.doll.sqv-=1,C.doll.hvy+=.4);break}}},gasp(){if(l){for(let M of h)M.doll&&M.doll.startle(.9);for(let M of p)M.startle(.9)}}};return e.ghouls=ws,ws}var _i="beb2b8e574",w=new Ps;window.__motif=w;var hn={drum:"Drum",bass:"Bass",lead:"Lead"},un={kick:"KICK",snare:"SNARE \xB7 CLAP",hat:"HAT",perc:"PERC",bass:"BASSE",lead:"M\xC9LODIE"},Bt=[["order","Ordre"],["up","Montant"],["down","Descendant"],["chord","Accord"]],Ae=null,Zt,ge,Je,es,Xe,kt,W=null,Ce=null,io=!1,L={},ao=0;function Ge(o,e){let t=L.toast;if(t.replaceChildren(u("span",{text:o})),e){let s=u("button",{text:e.label,onclick:()=>{t.classList.remove("show"),e.fn()}});t.append(s)}t.classList.toggle("act",!!e),t.classList.add("show"),clearTimeout(ao),ao=setTimeout(()=>t.classList.remove("show"),e?5e3:2200)}function ts(){return Ae.running?Promise.resolve(!0):Ae.start().then(o=>(o&&Bi(),o)).catch(o=>(Ge("Audio indisponible : "+o.message),!1))}function co(o,e){L.wake.querySelector("h1").textContent=o,L.wake.querySelector("p").textContent=e,L.wake.classList.remove("hidden")}function Bi(){L.wake.classList.add("hidden")}async function si(o){for(let e of la(o)){let t=e==="drums"?"banks/drums/bank.json":`banks/${e}/bank.json`;if(!Ae.loadedBanks.has(t))try{await Ae.loadBank(t)}catch(s){Ge("Sons non charg\xE9s ("+e+") : "+s.message)}}}async function ho(){let o=w.project,e=[...o.parts.drum.kit,o.parts.bass.preset,o.parts.lead.preset];for(let t of e)await si(ye(t));w.syncAll()}function dn(){Zt=document.getElementById("app"),Zt.dataset.part=w.ui.part,L.logo=u("button",{class:"logo","aria-label":"Menu et projets",onclick:()=>kt.menu()},u("span",{html:K("logo").outerHTML}),u("b",{text:"MOTIF"})),L.rec=u("button",{class:"tbtn rec","aria-label":"Armer l\u2019enregistrement","aria-pressed":"false",onclick:fn},K("rec")),L.play=u("button",{class:"tbtn play","aria-label":"Lecture","aria-pressed":"false",onclick:mn},K("play")),L.progressFill=u("div",{class:"fill"}),L.progressBars=u("div",{class:"bars"}),L.pos=u("span",{class:"pos",text:""}),L.progress=u("div",{class:"progress","aria-hidden":"true"},L.progressFill,L.progressBars,L.pos),L.tempo=u("div",{class:"chip tempo",role:"slider",tabindex:"0","aria-label":"Tempo. Toucher pour le m\xE9tronome, glisser pour changer."},u("b"),u("small",null,u("span",{class:"mi",html:K("metro").outerHTML}),"BPM")),L.key=u("button",{class:"chip","aria-label":"Tonalit\xE9 et gamme",onclick:()=>kt.keyPicker()},u("b"),u("small"));let o=u("div",{class:"top"},L.logo,L.rec,L.play,L.progress,L.tempo,L.key);ua(L.tempo,{get:()=>w.project.tempo,set:t=>{w.set("tempo",t),ss()},step:6,onTap:gn}),L.parts=u("div",{class:"parts",role:"tablist"});for(let t of["drum","bass","lead"]){let s=u("button",{class:"ptab",role:"tab","data-p":t,onclick:()=>po(t)},K(t),hn[t],u("i",{class:"lvl"}),u("i",{class:"mute"}));L.parts.append(s)}L.instName=u("button",{class:"name","aria-label":"Choisir un son",onclick:()=>kt.browser()},u("small"),u("b")),L.prev=u("button",{class:"arrow","aria-label":"Son pr\xE9c\xE9dent",onclick:()=>Ii(-1)},K("left")),L.next=u("button",{class:"arrow","aria-label":"Son suivant",onclick:()=>Ii(1)},K("right")),L.dice=u("button",{class:"arrow dice","aria-label":"Son au hasard pour cette partie (annulable)",onclick:()=>no(w.ui.part)},K("dice"));let e=u("div",{class:"inst"},L.prev,L.instName,L.next,L.dice);pn(L.instName),L.view=u("div",{class:"view"}),L.nav=u("nav",{class:"nav",role:"tablist"});for(let[t,s,i]of[["pattern","Pattern","pattern"],["tweaks","Tweaks","tweaks"],["mix","Mix","mix"],["song","Song","song"]])L.nav.append(u("button",{role:"tab","data-v":t,onclick:()=>fo(t)},K(i),s));L.toast=u("div",{class:"toast",role:"status"}),L.wake=u("div",{class:"wake"},u("div",{class:"orb"},K("play")),u("h1",{text:Ye.name}),u("p",{text:"Touchez pour activer le son."})),L.wake.addEventListener("click",async()=>{(Ae.ctx?await Ae.rebuildIfNeeded():await ts())&&(Bi(),await ho())}),Zt.append(o,L.parts,e,L.view,L.nav),document.body.append(L.toast,L.wake),ge=new _s(w,{onFirstTouch:()=>{Ae.running||ts()}}),Je=new Is(w,{onSelect:()=>is()}),es=new Cs({get:()=>w.project.parts[w.ui.part].range,set:t=>w.setPart(w.ui.part,"range",t),scale:()=>({scale:w.project.scale,steps:w.project.parts[w.ui.part].steps,key:w.project.key}),onStart:()=>{}}),Xe=new Bs(w),kt=new Ns(w,{host:()=>Ae,toast:Ge,loadBanksFor:si,ensureAudio:ts,rollDice:no,previewFluid:uo,fluidStatus:vn,enableTilt:ro,build:_i}),W=Ha(w,{pad:ge,xy:Xe}),W&&(ge.fx=W,Xe.fx=W,window.__motifFx=W,w.settings.glassTilt&&ro(!0)),Ce=so(w,{pad:ge,app:Zt,fx:()=>W}),window.__motifHw=Ce,Ce.set(document.documentElement.hasAttribute("data-halloween"))}function pn(o){let e=null;o.addEventListener("pointerdown",t=>{e={x:t.clientX,y:t.clientY,t:performance.now()}}),o.addEventListener("pointerup",t=>{if(!e)return;let s=t.clientX-e.x,i=t.clientY-e.y;e=null,Math.abs(s)>40&&Math.abs(s)>Math.abs(i)*1.5&&(Ii(s<0?1:-1),o.dataset.swiped="1",setTimeout(()=>{delete o.dataset.swiped},50))}),o.addEventListener("click",t=>{o.dataset.swiped&&(t.stopImmediatePropagation(),t.preventDefault())},!0)}function fn(){ts();let o=w.ui;w.send({type:"transport",cmd:o.armed?"disarm":"arm"})}function mn(){ts().then(()=>w.send({type:"transport",cmd:w.ui.playing?"stop":"play"}))}var oo=!1;function ro(o){let e=()=>{oo||(oo=!0,window.addEventListener("deviceorientation",s=>{W&&w.settings.glassTilt&&s.gamma!==null&&W.tilt(s.gamma,s.beta)}))},t=window.DeviceOrientationEvent;if(o){t&&e();return}t&&typeof t.requestPermission=="function"?t.requestPermission().then(s=>{s==="granted"?e():(w.setSetting("glassTilt",!1),Ge("Mouvements refus\xE9s : les reflets suivent ton doigt"))}).catch(()=>w.setSetting("glassTilt",!1)):t&&e()}function vn(){let o=W?W.engine():"none";return{"webgpu-hdr":"Actif : WebGPU, \xE9cran HDR \u2014 l\u2019encre et le verre peuvent d\xE9passer le blanc.",webgpu:"Actif : WebGPU (\xE9cran standard : pas de HDR ici).",webgl:"Actif : WebGL (compatibilit\xE9, sans HDR).",none:"Effets fluides indisponibles sur cet appareil."}[o]}function uo(){if(W){if(!w.settings.fluid&&!w.settings.glass){Ge("Active le fluide ou le verre pour voir l\u2019aper\xE7u");return}w.ui.view!=="pattern"&&fo("pattern"),setTimeout(()=>{W.place(),setTimeout(()=>W.preview(),120)},320)}}function gn(){let o=!w.settings.metro;w.setSetting("metro",o),ss(),Ge(o?w.settings.metroAlways?"M\xE9tronome activ\xE9":"M\xE9tronome activ\xE9 pendant l\u2019enregistrement":"M\xE9tronome coup\xE9",o?{label:"R\xE9glages",fn:()=>kt.settings()}:null)}async function no(o){let e=w.planRandom(o);for(let s of ca(e))await si(ye(s));w.applyRandom(e);let t=[];e.kit&&t.push(o==="drum"?e.kit.map(s=>ye(s).name).join(" \xB7 "):"kit "+ye(e.kit[0]).name+"\u2026");for(let s of["bass","lead"])e[s]&&t.push(ye(e[s].preset).name+(e[s].oct?` (${e[s].oct>0?"+":""}${e[s].oct} oct.)`:""));L.instName.classList.remove("flash"),L.instName.offsetWidth,L.instName.classList.add("flash"),Ge(t.join(" \xB7 "),{label:"Annuler",fn:()=>{w.undo()&&Ge("Sons d\u2019avant r\xE9tablis")}})}function po(o){if(w.ui.part===o){kt.browser();return}ge.releaseAll(),w.ui.part=o,w.ui.group=0,Je.clear(),Zt.dataset.part=o,ti()}function fo(o){ge.releaseAll(),Xe.releaseAll(),w.ui.view=o,go()}function mo(){let o=w.ui;return o.part==="drum"?Pt[o.lane]:o.part}function vo(){let o=w.project,e=w.ui;return e.part==="drum"?o.parts.drum.kit[e.lane]:o.parts[e.part].preset}async function Ii(o){let e=mo(),t=tt(e),s=t.findIndex(a=>a.id===vo()),i=t[(s+o+t.length)%t.length];await Ti(i.id)}async function Ti(o){let e=ye(o);if(!e)return;await si(e);let t=w.ui;w.setPreset(t.part,t.lane,o),L.instName.classList.remove("flash"),L.instName.offsetWidth,L.instName.classList.add("flash")}function ss(){let o=w.project,e=w.ui;L.tempo.querySelector("b").textContent=o.tempo,L.tempo.setAttribute("aria-valuenow",o.tempo),L.tempo.classList.toggle("metro",!!w.settings.metro),L.tempo.classList.toggle("live",!!w.settings.metro&&e.playing&&(e.armed||w.settings.metroAlways)),L.key.querySelector("b").textContent=mt[o.key],L.key.querySelector("small").textContent=vt(o.scale).name.slice(0,9),L.rec.setAttribute("aria-pressed",String(e.armed)),L.rec.classList.toggle("waiting",e.armed&&!e.playing),L.play.setAttribute("aria-pressed",String(e.playing)),L.play.replaceChildren(K(e.playing?"stop":"play")),L.play.setAttribute("aria-label",e.playing?"Arr\xEAter":"Lecture"),L.progress.classList.toggle("rec",e.armed),L.progressBars.childElementCount!==o.bars&&L.progressBars.replaceChildren(...Array.from({length:o.bars},()=>u("i"))),e.playing||(L.progressFill.style.width="0",L.pos.textContent=e.armed?"REC pr\xEAt":`${o.bars} mes.`)}function bs(){let o=w.project;for(let e of L.parts.children){let t=e.dataset.p;e.setAttribute("aria-selected",String(t===w.ui.part));let s=t==="drum"?o.parts.drum.mute.every(Boolean):o.parts[t].mute;e.classList.toggle("muted",s)}}function ei(){let o=w.ui,e=mo(),t=tt(e),s=vo(),i=ye(s),a=t.findIndex(n=>n.id===s),r=i&&i.style?et(i.style):null;L.instName.querySelector("small").textContent=`${un[e]} \xB7 ${a+1}/${t.length}${r?" \xB7 "+r.short:""}`,L.instName.querySelector("b").textContent=i?i.name:"\u2014",L.instName.setAttribute("aria-label",`Son ${i?i.name:""}, ${a+1} sur ${t.length}. Toucher pour parcourir.`)}function ti(){ss(),bs(),ei(),go()}var Ft=null;function go(){let o=w.ui.view;for(let e of L.nav.children)e.setAttribute("aria-selected",String(e.dataset.v===o));Ft&&(Ft(),Ft=null),L.view.replaceChildren(),o==="pattern"?yn():o==="tweaks"?kn():o==="mix"?wn():Sn(),W&&requestAnimationFrame(()=>W.place())}function yn(){let o=w.ui,e=w.project,t=u("div",{class:"controls"});if(o.part==="drum")for(let s=0;s<4;s++){let i=new Qe({label:["Kick","Snare","Hat","Perc"][s],min:()=>0,max:()=>Ut[s].length-1,get:()=>w.project.parts.drum.rhythm[s],set:a=>{w.setPart("drum","rhythm",a,s)},format:a=>({v:a===0?"1\xD7":String(a).padStart(2,"0"),s:Ut[s][a].name}),ring:(a,r,n,l)=>yi(a,r,n,Ut[s][l],null,-1,Js(),Zs()),onTap:()=>{o.lane=s,ei(),Jt.forEach((a,r)=>a.el.classList.toggle("active",r===s))},onStart:()=>{o.lane=s,ei()}});i.el.classList.toggle("active",s===o.lane),t.append(i.el),Jt.push(i)}else{let s=o.part,i=!1,a=new Qe({label:"Rythme",min:()=>0,max:()=>i?oi(xt[e.parts[s].rhythm]):xt.length-1,get:()=>i?w.project.parts[s].ties:w.project.parts[s].rhythm,set:l=>{if(i)w.setPart(s,"ties",l);else{w.setPart(s,"rhythm",l);let c=oi(xt[l]);w.project.parts[s].ties>c&&w.setPart(s,"ties",c)}},format:l=>{let c=w.project.parts[s],d=xt[c.rhythm];return i?{v:l===0?"OFF":String(l),s:d.len===0?"gliss\xE9":"liaisons",l:"Liaisons",ties:!0}:{v:l===0?"\u221E":String(l).padStart(2,"0"),s:d.name+(c.ties?` \xB7 ${c.ties} liaison${c.ties>1?"s":""}`:""),l:"Rythme"}},ring:(l,c,d)=>{let h=w.project.parts[s],v=xt[h.rhythm];yi(l,c,d,v,Yi(v,h.ties),-1,Js(),Zs())},onTap:()=>{i=!i,a.render()},onSwipeX:l=>{i=l>0,a.render()},step:16}),r=new Qe({label:"Degr\xE9s",min:()=>0,max:()=>ct.length-1,get:()=>ct.indexOf(w.project.parts[s].steps),set:l=>{w.setPart(s,"steps",ct[l]),es.render(),ge.draw()},format:l=>({v:ct[l]===12?"12":String(ct[l]),s:ct[l]===12?"chromatique":ct[l]===5?"pentatonique":ct[l]===7?"gamme enti\xE8re":"par octave"}),ring:(l,c,d,h)=>{let v=ct[h],p=c/2,m=d/2-2,f=Math.min(c,d)/2-8;l.lineWidth=4,l.lineCap="round";for(let b=0;b<v;b++){let y=-Math.PI/2+b/v*Math.PI*2+.06,x=-Math.PI/2+(b+1)/v*Math.PI*2-.06;l.strokeStyle=b===0?Js():Zs(2),l.beginPath(),l.arc(p,m,f,y,x),l.stroke()}},step:18}),n=new Qe({label:"Doigts",min:()=>0,max:()=>Bt.length-1,get:()=>Bt.findIndex(l=>l[0]===w.project.parts[s].arp),set:l=>w.setPart(s,"arp",Bt[l][0]),format:l=>({v:["1\u21922","\u2197","\u2198","\u2261"][l],s:Bt[l][1]}),onTap:()=>{let l=(Bt.findIndex(c=>c[0]===w.project.parts[s].arp)+1)%Bt.length;w.setPart(s,"arp",Bt[l][0]),n.render()},step:22});n.el.classList.add("small"),t.append(a.el,r.el,n.el),Jt.push(a,r,n)}L.view.append(t),o.part!=="drum"&&L.view.append(es.el),L.view.append(ge.el),L.undo=u("button",{class:"tbtn small","aria-label":"Annuler",onclick:()=>{w.undo()&&Ge("Annul\xE9")}},K("undo")),L.redo=u("button",{class:"tbtn small","aria-label":"R\xE9tablir",onclick:()=>{w.redo()&&Ge("R\xE9tabli")}},K("redo")),L.erase=u("button",{class:"tbtn small","aria-label":"Gomme","aria-pressed":String(o.erase),onclick:()=>{w.setErase(!w.ui.erase)}},K("erase")),L.clear=u("button",{class:"tbtn small","aria-label":"Effacer",onclick:xn},K("trash")),L.view.append(u("div",{class:"timeline"},L.undo,Je.el,L.erase,L.clear)),requestAnimationFrame(()=>{Jt.forEach(s=>s.render()),o.part!=="drum"&&es.render(),ge.setHint(),ge.showHint(!bn()),ge.draw(),Je.draw(),is()}),Ft=()=>{Jt.length=0,ge.releaseAll()}}var Jt=[];function bn(){let o=w.pattern,e=w.ui.part;return e==="drum"?o.drum.some(t=>t.hits.length):o[e].notes.length>0}function is(){L.erase&&(L.erase.classList.toggle("on",w.ui.erase),L.erase.setAttribute("aria-pressed",String(w.ui.erase)),L.undo.disabled=!w.undoStack.length,L.clear.classList.toggle("on",!!Je.sel),L.clear.setAttribute("aria-label",Je.sel?"Effacer la s\xE9lection":"Effacer\u2026"))}function xn(){let o=w.ui;if(Je.sel){let e=Je.sel;w.eraseSpan(o.part,o.part==="drum"?null:void 0,e.t0,e.t1),Je.clear(),is(),Ge("Portion effac\xE9e",{label:"Annuler",fn:()=>w.undo()});return}kt.clearMenu()}function kn(){L.view.append(Xe.groupsEl,Xe.el,Xe.barEl),requestAnimationFrame(()=>Xe.render()),Ft=()=>Xe.releaseAll()}function wn(){let o=w.project,e=u("div",{class:"mix"}),t=u("div",{class:"faders"}),s=[["drum",0,"Kick","--drum"],["drum",1,"Snare","--drum"],["drum",2,"Hat","--drum"],["drum",3,"Perc","--drum"],["bass",null,"Basse","--bass"],["lead",null,"M\xE9lodie","--lead"]],i=[],a=new Map,r=new Map,n=(f,b)=>{let y=a.get(f);y&&(w.setMute(y.part,y.lane,b),y.upd())};t.addEventListener("pointermove",f=>{let b=r.get(f.pointerId);if(!b)return;let y=document.elementFromPoint(f.clientX,f.clientY),x=y&&y.closest(".m");x&&a.has(x)&&!b.done.has(x)&&(b.done.add(x),n(x,b.v),bs())});let l=f=>r.delete(f.pointerId);t.addEventListener("pointerup",l),t.addEventListener("pointercancel",l);for(let[f,b,y,x]of s){let T=()=>f==="drum"?w.project.parts.drum.level[b]:w.project.parts[f].level,E=()=>f==="drum"?w.project.parts.drum.mute[b]:w.project.parts[f].mute,O=u("div",{class:"fill"}),j=u("div",{class:"meter"}),le=u("div",{class:"db"}),V=u("button",{class:"m","aria-pressed":String(E()),"aria-label":"Couper "+y,text:"M"}),P=u("div",{class:"fader",style:{"--fc":`var(${x})`},role:"slider","aria-label":"Volume "+y,tabindex:"0"},O,j,u("div",{class:"t",text:y}),le,V),X=F=>Math.pow((F+40)/46,1.6),N=()=>{let F=T();O.style.height=X(F)*100+"%",le.textContent=(F>0?"+":"")+F.toFixed(1)+" dB",P.classList.toggle("muted",E()),V.setAttribute("aria-pressed",String(E()))},Y=null;P.addEventListener("pointerdown",F=>{if(F.target!==V){F.preventDefault();try{P.setPointerCapture(F.pointerId)}catch{}Y={y:F.clientY,v:T(),t:performance.now()}}}),P.addEventListener("pointermove",F=>{if(!Y)return;let he=P.getBoundingClientRect().height,U=X(Y.v)+(Y.y-F.clientY)/he,_=Math.max(-40,Math.min(6,Math.pow(Math.max(0,Math.min(1,U)),1/1.6)*46-40));w.setLevel(f,b,Math.round(_*2)/2),N()}),P.addEventListener("pointerup",F=>{Y&&Math.abs(F.clientY-Y.y)<4&&performance.now()-Y.t<250&&F.detail===2&&(w.setLevel(f,b,0),N()),Y=null}),P.addEventListener("dblclick",()=>{w.setLevel(f,b,0),N()}),a.set(V,{part:f,lane:b,upd:()=>N()}),V.addEventListener("pointerdown",F=>{F.preventDefault(),F.stopPropagation();let he=!E();n(V,he),bs(),r.set(F.pointerId,{v:he,done:new Set([V])});try{V.releasePointerCapture(F.pointerId)}catch{}}),V.addEventListener("click",F=>{F.detail===0&&(n(V,!E()),bs())}),N(),i.push({part:f,lane:b,meter:j,el:P}),t.append(P)}let c=(f,b,y,x=.02)=>new Qe({label:f,min:()=>0,max:()=>50,get:()=>Math.round(w.project.mix[b]/x),set:E=>{w.setMix(b,E*x)},format:E=>({v:y(E*x),s:""}),ring:(E,O,j,le)=>{let V=O/2,P=j/2-2,X=Math.min(O,j)/2-8;E.lineWidth=4,E.lineCap="round",E.strokeStyle=Zs(2),E.beginPath(),E.arc(V,P,X,Math.PI*.75,Math.PI*2.25),E.stroke(),E.strokeStyle=Js(),E.beginPath(),E.arc(V,P,X,Math.PI*.75,Math.PI*.75+le/50*Math.PI*1.5),E.stroke()},step:5}),d=[c("Pump","pump",f=>Math.round(f*100)+""),c("Espace","space",f=>Math.round(f*100)+""),c("Batterie","drumDrive",f=>Math.round(f*100)+"")],h=new Qe({label:"Master",min:()=>0,max:()=>36,get:()=>Math.round((w.project.mix.master+18)*1),set:f=>w.setMix("master",f-18),format:f=>({v:(f-18>0?"+":"")+(f-18)+" dB",s:""}),step:6}),v=u("div",{class:"mixknobs"},...d.map(f=>f.el),h.el);e.append(t,v),L.view.append(e),requestAnimationFrame(()=>{d.forEach(f=>f.render()),h.render()});let p=w.on("pos",f=>{if(f.m){for(let b of i){let y=b.part==="drum"?f.m.d[b.lane]:f.m[b.part],x=20*Math.log10(Math.max(y,1e-5));b.meter.style.height=Math.max(0,Math.min(100,(x+48)/48*100))+"%"}W&&W.mixLevels(f.m)}}),m=null;if(W){W.setMix({el:t,faders:i.map(({part:y,lane:x,el:T})=>({part:y,lane:x,el:T}))});let f=y=>x=>{let T=t.getBoundingClientRect();W.press(x.pointerId,(x.clientX-T.left)/T.width,(x.clientY-T.top)/T.height,y)},b=[["pointerdown",f("down")],["pointermove",f("move")],["pointerup",f("up")],["pointercancel",f("cancel")]];for(let[y,x]of b)t.addEventListener(y,x);m=()=>{for(let[y,x]of b)t.removeEventListener(y,x)}}Ft=()=>{p(),m&&m(),W&&W.setMix(null)}}function Sn(){let o=kt.songView();L.view.append(o.el),Ft=o.cleanup}function Js(){return getComputedStyle(Zt).getPropertyValue("--accent").trim()}function Zs(o=1){return document.documentElement.dataset.theme==="dark"?`rgba(255,255,255,${.08*o})`:`rgba(0,0,0,${.08*o})`}var Tn=null,lo=-1;function Mn(o){Tn=o;let e=w.project,t=w.ui;if(o.playing&&o.tick>=0){let s=384*e.bars;L.progressFill.style.width=((o.tick+1)/s*100).toFixed(2)+"%";let i=Math.floor(o.tick/384)+1,a=Math.floor(o.tick%384/96)+1;L.pos.textContent=`${i}.${a}`;let r=Math.floor(o.tick/96);r!==lo&&(lo=r,L.tempo.classList.contains("live")&&(L.tempo.classList.remove("beat","down"),L.tempo.offsetWidth,L.tempo.classList.add("beat"),o.tick%384<96&&L.tempo.classList.add("down")))}if(o.m)for(let s of L.parts.children){let i=s.dataset.p==="drum"?o.m.drum:o.m[s.dataset.p];s.querySelector(".lvl").style.transform=`scaleX(${Math.min(1,Math.sqrt(i||0)*1.1).toFixed(3)})`}if(t.view==="pattern"){let s=e.song.enabled&&e.song.sections.length;ge.setClock({tick:o.tick,at:performance.now(),playing:o.playing,msPerTick:6e4/(e.tempo*96),L:384*e.bars,pat:s?e.song.sections[o.sec%e.song.sections.length].p:e.current}),ge.onTrig(o.trig,o.m),Je.setTick(o.playing?o.tick:-1)}t.view==="tweaks"&&Xe.onPos(o),W&&W.level(o),Ce&&Ce.level(o)}function Ln(o){switch(o){case"transport":ss(),w.ui.view==="pattern"&&(ge.setHint(),Je.draw()),Ce&&w.ui.armed&&!io&&Ce.gasp(),io=w.ui.armed;break;case"tempo":case"key":case"scale":case"bars":ss(),w.ui.view==="pattern"&&(es.render(),ge.draw(),Je.draw());break;case"preset":ei(),w.ui.view==="tweaks"&&Xe.render(),w.ui.view==="pattern"&&(ge.setHint(),ge.draw());break;case"notes":w.ui.view==="pattern"&&(Je.draw(),ge.showHint(!1),is());break;case"undo":is();break;case"erase":is(),ge.setHint(),ge.showHint(!0),ge.draw(),w.ui.erase&&Ge(w.ui.playing?"Gomme : touche le pad pour effacer pendant la lecture":"Gomme activ\xE9e \u2014 lance la lecture puis touche le pad");break;case"project":case"pattern":ti();break;case"auto":case"macro":w.ui.view==="tweaks"&&Xe.render();break;case"mix":bs(),W&&W.syncScene();break;case"settings:metro":case"settings:metroAlways":ss();break;case"settings:piano":case"settings:ghosts":w.ui.view==="pattern"&&(ge.setHint(),ge.draw());break;case"settings:glass":document.documentElement.toggleAttribute("data-glass",!!w.settings.glass),W&&W.place();break;case"settings:fluid":case"settings:fluidZone":case"settings:fluidStyle":case"settings:fluidColors":case"settings:fluidInk":case"settings:fluidHdr":case"settings:glassSpill":case"settings:glassLight":case"settings:mixGlass":case"settings:ctrlHeight":case"settings:lightLook":case"settings:hdrLight":case"settings:glassLook":W&&W.place();break;case"settings:fluidEngine":w.save().finally(()=>location.reload());break;case"settings:glassTilt":W&&!w.settings.glassTilt&&W.tilt(null);break;default:o&&o.includes(":range")&&ge.draw(),o&&o.endsWith(":steps")&&(es.render(),ge.draw()),o&&(o.endsWith(":rhythm")||o.endsWith(":ties"))&&Jt.forEach(e=>e.render())}}function Rn(){let o=()=>{ge&&ge.releaseAll(),Xe&&Xe.releaseAll(),w.ui.playing&&w.send({type:"transport",cmd:"stop"}),w.ui.armed&&w.send({type:"transport",cmd:"disarm"}),w.save(),Ae.suspend()};document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="hidden")o();else if(Ae.ctx){try{await Ae.ctx.resume()}catch{}await Ae.probe(400)||co("Son en pause","Touchez pour r\xE9activer le son.")}}),window.addEventListener("pagehide",()=>w.save()),window.addEventListener("beforeunload",()=>w.save());let e=()=>document.documentElement.style.setProperty("--app-h",window.innerHeight+"px");CSS.supports("height","100dvh")||(e(),window.addEventListener("resize",e)),document.addEventListener("gesturestart",t=>t.preventDefault()),document.addEventListener("dblclick",t=>{t.target.closest("input,textarea")||t.preventDefault()},{passive:!1}),document.addEventListener("touchmove",t=>{t.target.closest(".scroll, .sheet .body, .filters")||t.preventDefault()},{passive:!1})}async function En(){await w.init(),Ae=new qs({workletUrl:"worklet.js?v="+_i,onMessage:t=>w.onEngine(t),onState:t=>{(t==="interrupted"||t==="suspended")&&document.visibilityState==="visible"&&w.ui.playing&&co("Son interrompu","Touchez pour reprendre."),t==="running"&&Bi()}}),Ae.replay=()=>w.engineState(),Ae.rebuildIfNeeded=async()=>{try{await Ae.ctx.resume()}catch{}return await Ae.probe(250)?!0:(Ge("Red\xE9marrage du son\u2026"),Ae.rebuild())},w.engine=Ae,dn(),w.on("change",Ln),w.on("pos",Mn),w.on("error",t=>Ge(t)),Rn(),window.addEventListener("motif:theme",()=>{Ce&&(Ce.set(document.documentElement.hasAttribute("data-halloween")),Ce.refresh()),ti()}),ti();let o=ho().catch(t=>{window.__motifBankError=String(t&&t.message||t)});(/[?&]diag\b/.test(location.search)||location.hostname==="localhost"&&matchMedia("(display-mode: standalone)").matches)&&An(o),Aa({toast:Ge,store:w,build:_i}),/[?&]fxtest\b/.test(location.search)&&location.hostname==="localhost"&&setTimeout(async()=>{document.querySelectorAll(".wake").forEach(c=>c.remove()),w.settings.glass||w.setSetting("glass",!0);let t=new URLSearchParams(location.search),s=t.get("part"),i=t.get("look"),a=w.settings.glassLook;t.get("theme")==="halloween"&&(document.documentElement.setAttribute("data-halloween",""),document.documentElement.dataset.theme="dark",window.dispatchEvent(new Event("motif:theme"))),t.has("dance")&&Ce&&setTimeout(()=>Ce.dance(t.get("dance")||"passinho",3),1500),["drum","bass","lead"].includes(s)&&w.ui.part!==s&&(po(s),await new Promise(c=>setTimeout(c,400))),i&&(w.settings.glassLook=i,W&&W.place(),await new Promise(c=>setTimeout(c,300))),W&&W.fluid&&t.has("m")&&(W.fluid.marginTest=+t.get("m"),W.place()),t.has("ns")&&w.settings.glassSpill&&w.setSetting("glassSpill",!1),!t.has("ns")&&!w.settings.glassSpill&&w.setSetting("glassSpill",!0);let r=W&&W.fluid,n=async c=>{if(!(!t.has("snap")||!r))try{r.render(!0);let d=document.createElement("canvas");d.width=Math.round(r.canvas.width/2),d.height=Math.round(r.canvas.height/2),d.getContext("2d").drawImage(r.canvas,0,0,d.width,d.height),await fetch("/__log",{method:"POST",body:JSON.stringify({kind:"snap",name:c,out:[d.toDataURL("image/png")]})})}catch{}};for(let c=0;c<5;c++)uo(),await new Promise(d=>setTimeout(d,c===1?900:1500)),c===1&&(await n("preview"),await new Promise(d=>setTimeout(d,600)));if(t.has("snap")&&(await new Promise(c=>setTimeout(c,6500)),await n("rest")),t.has("snap")&&t.has("edges")&&r&&r.splat){let c=r.cfg.DENSITY_DISSIPATION;r.cfg.DENSITY_DISSIPATION=0,r.clear();let d=(h,v,p,m,f,b)=>r.splat(h,v,p,m,{r:f[0]*.3,g:f[1]*.3,b:f[2]*.3},b);for(let h=0;h<12;h++)d(.9,.05+h*.08,(h%2?1:-1)*.01,.006,[.45,.05,1],.7);d(.12,.06,.02,.01,[1,.05,.6],.8),d(.14,.35,0,.01,[1,.05,.6],.5),d(.5,.97,.03,-.01,[1,.1,.7],.6),r.applyInputs(),r.render(!1),await new Promise(h=>setTimeout(h,300)),await n("edges"),r.cfg.DENSITY_DISSIPATION=c}i&&(w.settings.glassLook=a,W&&W.place());let l=null;try{r.render(!0);let c=document.createElement("canvas");c.width=r.canvas.width,c.height=r.canvas.height;let d=c.getContext("2d");d.drawImage(r.canvas,0,0);let h=r.off?r.off[0]:0,v=r.off?r.off[1]:0,p=r.hostW||c.width,m=r.hostH||c.height,f=(b,y)=>Array.from(d.getImageData(Math.round(h+b*p),Math.round(v+y*m),1,1).data);l={centre:f(.5,.5),rimLeft:f(.004,.5),bevelLeft:f(.03,.5),cornerOutside:f(.001,.001),top:f(.5,.004),below:f(.5,1.02)}}catch(c){l=String(c)}fetch("/__log",{method:"POST",body:JSON.stringify({kind:"fxtest",ua:navigator.userAgent,engine:W?W.engine():"none",ok:!!(r&&r.ok),glass:w.settings.glass,sceneGlass:!!(r&&r.scene&&r.scene.glass),shaderErrors:r&&r.shaderErrors?r.shaderErrors.map(c=>String(c).slice(0,300)):null,link:r&&r.gl?r.gl.getProgramParameter(r.p.display.p,r.gl.LINK_STATUS):null,format:r&&r.format,extended:r&&r.extended,hdrScreen:r&&r.hdrScreen,gpuCanvas:!!document.querySelector("canvas.fluid"),slow:r&&r.ema,spill:W&&W.spillStats,px:l,hw:Ce&&Ce.on?{ok:Ce.ok,errors:Ce.errors,ema:Ce.ema,scale:Ce.scale}:null})}).catch(()=>{})},2500);let e=()=>{ts()};window.addEventListener("pointerdown",e,{once:!0,capture:!0})}async function An(o){let e=performance.now();await o;let t=getComputedStyle(document.documentElement),s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;visibility:hidden",document.body.append(s);let i=getComputedStyle(s),a=document.getElementById("app").getBoundingClientRect(),r=document.querySelector(".nav").getBoundingClientRect(),n=document.querySelector(".pad")&&document.querySelector(".pad").getBoundingClientRect(),l={kind:"diag",ua:navigator.userAgent,standalone:matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,inner:[innerWidth,innerHeight],vv:window.visualViewport?[visualViewport.width,visualViewport.height]:null,dpr:devicePixelRatio,safe:[i.paddingTop,i.paddingBottom],app:[a.top,a.height],navBottom:r.bottom,padH:n?n.height:null,screen:[screen.width,screen.height],docH:document.documentElement.clientHeight,dvh:(()=>{let p=document.createElement("div");p.style.cssText="position:fixed;height:100dvh;width:1px;top:0",document.body.append(p);let m=p.getBoundingClientRect().height;return p.remove(),m})(),vh:(()=>{let p=document.createElement("div");p.style.cssText="position:fixed;height:100vh;width:1px;top:0",document.body.append(p);let m=p.getBoundingClientRect().height;return p.remove(),m})(),fixedInset:(()=>{let p=document.createElement("div");p.style.cssText="position:fixed;inset:0;",document.body.append(p);let m=p.getBoundingClientRect();return p.remove(),[m.top,m.height]})(),samples:w.engine.samples.size,banks:[...w.engine.loadedBanks],bankError:window.__motifBankError||null,ms:Math.round(performance.now()-e),audioSession:"audioSession"in navigator,worklet:typeof AudioWorkletNode<"u",share:!!navigator.canShare,dvhSupported:CSS.supports("height","100dvh")};s.remove(),fetch("/__log",{method:"POST",body:JSON.stringify(l)}).catch(()=>{});let c=0,d=null;w.on("pos",p=>{d=p,p.trig&&(c+=p.trig.length/4)});let h=Date.now(),v=setInterval(()=>{let p=w.engine.ctx,m={kind:"state",t:Math.round((Date.now()-h)/1e3),ctx:p?p.state:"none",sr:p?p.sampleRate:0,base:p?p.baseLatency:0,out:p&&p.outputLatency,time:p?+p.currentTime.toFixed(2):0,playing:w.ui.playing,armed:w.ui.armed,trig:c,view:w.ui.view,part:w.ui.part,preset:w.presetFor(w.ui.part==="drum"?"d0":w.ui.part).id,notes:w.pattern.lead.notes.length+w.pattern.bass.notes.length+w.pattern.drum.reduce((f,b)=>f+b.hits.length,0),standalone:matchMedia("(display-mode: standalone)").matches,h:innerHeight,master:d&&d.m?+d.m.master.toFixed(3):0};fetch("/__log",{method:"POST",body:JSON.stringify(m)}).catch(()=>{}),Date.now()-h>12e4&&clearInterval(v)},2e3)}En().catch(o=>{console.error(o),document.getElementById("app").textContent="Erreur au d\xE9marrage : "+o.message});export{Ti as choosePreset,Ge as toast};
