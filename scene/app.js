var ft={id:"scene",storage:"motif3-scene",name:"MOTIF Sc\xE8ne",fluid:!0};var wn=ft.storage,Sn=1,ga=null;function Tn(){return ga||(ga=new Promise((i,e)=>{let t=indexedDB.open(wn,Sn);t.onupgradeneeded=()=>{let s=t.result;s.objectStoreNames.contains("projects")||s.createObjectStore("projects",{keyPath:"id"}),s.objectStoreNames.contains("renders")||s.createObjectStore("renders",{keyPath:"id"}),s.objectStoreNames.contains("files")||s.createObjectStore("files",{keyPath:"id"}),s.objectStoreNames.contains("kv")||s.createObjectStore("kv")},t.onsuccess=()=>{let s=t.result;s.onversionchange=()=>s.close(),i(s)},t.onerror=()=>e(t.error),t.onblocked=()=>e(new Error("Base locale bloqu\xE9e par un autre onglet"))}),ga)}function Ys(i,e,t){return Tn().then(s=>new Promise((a,o)=>{let r=s.transaction(i,e),n=r.objectStore(i),l;Promise.resolve(t(n)).then(d=>{l=d}),r.oncomplete=()=>a(l),r.onerror=()=>o(r.error),r.onabort=()=>o(r.error||new Error("transaction annul\xE9e"))}))}var Ks=i=>new Promise((e,t)=>{i.onsuccess=()=>e(i.result),i.onerror=()=>t(i.error)}),vt={put:(i,e,t)=>Ys(i,"readwrite",s=>Ks(t===void 0?s.put(e):s.put(e,t))),get:(i,e)=>Ys(i,"readonly",t=>Ks(t.get(e))),del:(i,e)=>Ys(i,"readwrite",t=>Ks(t.delete(e))),all:i=>Ys(i,"readonly",e=>Ks(e.getAll())),keys:i=>Ys(i,"readonly",e=>Ks(e.getAllKeys()))};async function lo(){try{if(navigator.storage&&navigator.storage.persist)return await navigator.storage.persisted()?!0:await navigator.storage.persist()}catch{}return!1}async function co(){try{if(navigator.storage&&navigator.storage.estimate)return await navigator.storage.estimate()}catch{}return null}var Xt=["Do","R\xE9\u266D","R\xE9","Mi\u266D","Mi","Fa","Fa\u266F","Sol","La\u266D","La","Si\u266D","Si"];var ba=[{id:"major",name:"Majeur",iv:[0,2,4,5,7,9,11],minor:!1},{id:"minor",name:"Mineur",iv:[0,2,3,5,7,8,10],minor:!0},{id:"dorian",name:"Dorien",iv:[0,2,3,5,7,9,10],minor:!0},{id:"phrygian",name:"Phrygien",iv:[0,1,3,5,7,8,10],minor:!0},{id:"harmonic",name:"Mineur harmonique",iv:[0,2,3,5,7,8,11],minor:!0},{id:"phrygdom",name:"Phrygien dominant",iv:[0,1,4,5,7,8,10],minor:!1},{id:"mixolydian",name:"Mixolydien",iv:[0,2,4,5,7,9,10],minor:!1},{id:"lydian",name:"Lydien",iv:[0,2,4,6,7,9,11],minor:!1},{id:"melodic",name:"Mineur m\xE9lodique",iv:[0,2,3,5,7,9,11],minor:!0},{id:"hungarian",name:"Hongrois",iv:[0,2,3,6,7,8,11],minor:!0}];function $t(i){return ba.find(e=>e.id===i)||ba[0]}var Mn=[0,4,2,5,1,6,3],Ln=[0,4,2,6,3,1,5],Ut=[1,2,3,4,5,6,7,12];function ci(i,e){let t=$t(i);if(e>=12){let o=[];for(let r=0;r<12;r++){let n=0;for(let l=0;l<7;l++)t.iv[l]<=r&&(n=l);o.push({deg:n,acc:r-t.iv[n],semi:r})}return o}return(t.minor?Ln:Mn).slice(0,Math.max(1,Math.min(7,e))).sort((o,r)=>o-r).map(o=>({deg:o,acc:0,semi:t.iv[o]}))}function ho(i,e,t,s,a=48){let o=$t(s),r=Math.floor(i/7),n=i-r*7;return a+t+r*12+o.iv[n]+(e||0)}function Jt(i,e,t){let s=$t(t),a=Math.floor(i/7);return a*12+s.iv[i-a*7]+(e||0)}function Pt(i,e,t){let s=ci(e,t),a=s.length,o=Math.floor(i.lo/12)-1,r=0,n=(d,c)=>d*12+s[c].semi;for(;n(o,r)<i.lo;)r++,r>=a&&(r=0,o++);let l=[];for(let d=0;d<i.n;d++){let c=s[r];l.push({deg:o*7+c.deg,acc:c.acc,semi:o*12+c.semi,octave:o,isRoot:c.semi===0&&c.acc===0}),r++,r>=a&&(r=0,o++)}return l}function Rn(i,e){let t=$t(e),s=Math.floor(i/12),a=i-s*12,o=0;for(let r=0;r<7;r++)t.iv[r]<=a&&(o=r);return{deg:s*7+o,acc:a-t.iv[o]}}var An=new Set([1,3,6,8,10]),as=.6,Es=.62;function uo(i,e,t,s){let a=Pt(i,e,t),o=h=>An.has(((s+h)%12+12)%12),r=a[0].semi,n=a[a.length-1].semi;for(;n-r<11;)n++,n-r<11&&r--;o(r)&&r--,o(n)&&n++;let l=new Set(Pt({lo:r-12,n:96},e,t).map(h=>h.semi)),d=[],c=0;for(let h=r;h<=n;h++){let p=o(h),{deg:f,acc:m}=Rn(h,e);d.push({semi:h,black:p,pos:c,deg:f,acc:m,inScale:l.has(h),isRoot:(h%12+12)%12===0}),p||c++}return{keys:d,whites:c}}function fo(i,e,t){let{keys:s,whites:a}=i;if(t<as){for(let r of s)if(r.black&&Math.abs(e-r.pos/a)<Es/a/2)return r}let o=Math.min(a-1,Math.max(0,Math.floor(e*a)));return s.find(r=>!r.black&&r.pos===o)}function En(i,e,t){let s=ci(e,t),a=Math.floor(i/12),o=null;for(let r=a-1;r<=a;r++)for(let n of s){let l=r*12+n.semi;l<=i&&(o===null||l>o)&&(o=l)}return o===null?i:o}function po(i,e,t,s){let a=Pt(i,e,t),o=a.length?a[a.length-1].semi:i.lo,r=En(i.lo,e,s),n=0,l=Pt({lo:r,n:64},e,s);for(let d of l)if(d.semi<=o+.5)n++;else break;return{lo:r,n:Math.max(1,Math.min(36,n))}}var li=24;function Y(i,e,t=16){let s=e.map(([a,o,r])=>[Math.round(a*li),Math.max(3,Math.round(o*li)),r?1:0]);return s.sort((a,o)=>a[0]-o[0]),{name:i,len:t*li,ev:s}}function At(i,e,t,s,a,o=0,r=16){let n=[];for(let l=0;l<s;l++)n.push([e+l*t,a,o&&l%o===0]);return Y(i,n,r)}function ss(i,e,t=384){return{name:i,len:t,ev:e.map(([s,a,o])=>[s,a,o?1:0])}}var jt=[{name:"Libre",len:0,ev:[]},Y("Ronde",[[0,15.5,1]]),Y("Blanches",[[0,7.5,1],[8,7.5,0]]),Y("Noires",[[0,3.2,1],[4,3.2,0],[8,3.2,0],[12,3.2,0]]),At("Croches",0,2,8,1.5,4),At("Doubles",0,1,16,.8,4),Y("Point\xE9es",[[0,2.6,1],[3,2.6,0],[6,2.6,0],[9,2.6,0],[12,1.6,1],[14,1.6,0]]),Y("Tresillo",[[0,2.6,1],[3,2.6,0],[6,1.6,0],[8,2.6,1],[11,2.6,0],[14,1.6,0]]),Y("Contretemps",[[2,1.5,1],[6,1.5,0],[10,1.5,1],[14,1.5,0]]),Y("Galop",[[0,1.6,1],[2,.8,0],[3,.8,0],[4,1.6,1],[6,.8,0],[7,.8,0],[8,1.6,1],[10,.8,0],[11,.8,0],[12,1.6,1],[14,.8,0],[15,.8,0]]),Y("Deux-pas",[[0,2.5,1],[3,1.5,0],[6,3.5,0],[10,1.5,1],[12,3.5,0]]),Y("Dembow",[[0,1.5,1],[3,.9,0],[4,1.5,0],[7,.9,0],[8,1.5,1],[11,.9,0],[12,1.5,0],[15,.9,0]]),ss("Triolets",Array.from({length:12},(i,e)=>[e*32,26,e%3===0])),Y("Log drum",[[0,2,1],[3,1,0],[6,2.5,1],[10,1,0],[12,1,0],[14,1.6,1]]),Y("Jersey",[[0,2.5,1],[4,2.5,1],[8,1.5,1],[10,2,0],[13,2.5,1]]),At("Arp\xE8ge",0,1,16,.9,3),Y("Rafales",[[0,.45,1],[.5,.45,0],[1,.45,0],[1.5,.45,0],[6,1.5,1],[8,.45,1],[8.5,.45,0],[9,.45,0],[9.5,.45,0],[12,1.5,0],[14,1.5,1]])],y=.5,_n=[{name:"Coup par coup",len:0,ev:[]},Y("Quatre temps",[[0,y,1],[4,y,0],[8,y,0],[12,y,0]]),Y("Un et trois",[[0,y,1],[8,y,0]]),Y("Deux-pas",[[0,y,1],[10,y,0]]),Y("Trap",[[0,y,1],[7,y,0],[10,y,0]],16),Y("Breakbeat",[[0,y,1],[10,y,0],[16,y,1],[23,y,0],[26,y,0]],32),Y("Jersey",[[0,y,1],[4,y,1],[8,y,1],[10,y,0],[13,y,1]]),Y("Montagem",[[0,y,1],[3,y,0],[6,y,0],[10,y,1],[12,y,0]]),Y("Afro",[[0,y,1],[4,y,0],[7,y,0],[8,y,0],[12,y,0]]),Y("Amapiano",[[0,y,1],[4,y,0],[8,y,0],[12,y,0],[14,y,0]]),Y("Martel\xE9",[[0,y,1],[4,y,0],[8,y,0],[12,y,0],[14,y,0],[15,y,0]]),Y("Roulant",[[0,y,1],[3,y,0],[4,y,0],[8,y,0],[11,y,0],[12,y,0]]),Y("Demi-temps",[[0,y,1],[11,y,0],[19,y,0]],32),Y("Syncope",[[0,y,1],[6,y,0],[10,y,0]]),At("Croches",0,2,8,y,4),At("Rouleau",0,1,16,y,4),Y("Reggaeton",[[0,y,1],[4,y,0],[8,y,0],[12,y,0],[10,y,0]])],Dn=[{name:"Coup par coup",len:0,ev:[]},Y("Deux et quatre",[[4,y,1],[12,y,1]]),Y("Demi-temps",[[8,y,1]]),Y("Dembow",[[3,y,1],[6,y,0],[11,y,1],[14,y,0]]),Y("Deux-pas",[[4,y,1],[12,y,1],[15,y,0]]),Y("Breakbeat",[[4,y,1],[12,y,1],[20,y,1],[25,y,0],[28,y,1]],32),Y("Jersey",[[4,y,1],[12,y,1],[14,y,0],[15,y,0]]),Y("Trap",[[8,y,1],[24,y,1],[30,y,0],[31,y,0]],32),Y("Funk",[[4,y,1],[7,y,0],[12,y,1],[14,y,0]]),Y("Afro",[[4,y,1],[10,y,0],[12,y,1]]),Y("Fant\xF4mes",[[4,y,1],[9,y,0],[12,y,1],[15,y,0]]),At("Croches",0,2,8,y,2),Y("Rafale",[[12,y,1],[13,y,0],[14,y,0],[15,y,1]]),Y("Contretemps",[[2,y,1],[6,y,0],[10,y,1],[14,y,0]]),Y("Trois-trois-deux",[[0,y,1],[3,y,0],[6,y,0],[8,y,1],[11,y,0],[14,y,0]]),Y("Syncop\xE9",[[3,y,1],[10,y,1]]),At("Roulement",0,1,16,y,4)],Pn=[{name:"Coup par coup",len:0,ev:[]},At("Croches",0,2,8,y,2),At("Doubles",0,1,16,y,4),Y("Contretemps",[[2,y,1],[6,y,1],[10,y,1],[14,y,1]]),Y("Deux-pas",[[0,y,1],[2,y,0],[3,y,0],[6,y,1],[8,y,0],[10,y,1],[11,y,0],[14,y,1]]),ss("Triolets",Array.from({length:12},(i,e)=>[e*32,12,e%3===0])),ss("Roulements",[0,24,48,60,72,96,120,144,156,168,180,192,216,240,264,276,288,312,336,344,352,360,368,376].map((i,e)=>[i,6,i%96===0])),At("Noires",0,4,4,y,1),Y("Galop",[[0,y,1],[2,y,0],[3,y,0],[4,y,1],[6,y,0],[7,y,0],[8,y,1],[10,y,0],[11,y,0],[12,y,1],[14,y,0],[15,y,0]]),Y("Afro",[[0,y,1],[3,y,0],[6,y,0],[8,y,1],[11,y,0],[14,y,0],[15,y,0]]),Y("Accents",Array.from({length:16},(i,e)=>[e,y,e%4===2])),ss("Triolets 16",Array.from({length:24},(i,e)=>[e*16,8,e%6===0])),Y("Sautill\xE9",[[0,y,1],[3,y,0],[4,y,1],[7,y,0],[8,y,1],[11,y,0],[12,y,1],[15,y,0]]),Y("Point\xE9es",[[0,y,1],[3,y,0],[6,y,0],[9,y,0],[12,y,1]]),ss("Rafales",[0,48,96,108,120,132,192,240,288,300,312,324,336,348,360,372].map(i=>[i,6,i%96===0])),Y("Clave",[[0,y,1],[3,y,0],[6,y,0],[10,y,1],[12,y,0]]),Y("Shuffle",[[0,y,1],[3,y,0],[4,y,1],[7,y,0],[8,y,1],[11,y,0],[12,y,1],[14,y,0],[15,y,0]])],qn=[{name:"Coup par coup",len:0,ev:[]},Y("Clave son",[[0,y,1],[3,y,0],[6,y,0],[10,y,1],[12,y,0]]),Y("Clave rumba",[[0,y,1],[3,y,0],[7,y,0],[10,y,1],[12,y,0]]),Y("Tresillo",[[0,y,1],[3,y,0],[6,y,0],[8,y,1],[11,y,0],[14,y,0]]),At("Shaker",0,1,16,y,2),Y("Tumbao",[[2,y,0],[3,y,1],[6,y,0],[7,y,1],[10,y,0],[11,y,1],[14,y,0],[15,y,1]]),Y("Cloche phonk",[[0,y,1],[2,y,0],[3,y,1],[5,y,0],[6,y,1],[8,y,0],[10,y,1],[11,y,0],[13,y,1],[14,y,0]]),ss("Cloche 12/8",[0,2,4,5,7,9,11].map((i,e)=>[i*32,12,e===0])),Y("Contretemps",[[2,y,1],[6,y,0],[10,y,1],[14,y,0]]),Y("Log",[[3,y,1],[6,y,0],[11,y,1],[14,y,0]]),At("Croches",0,2,8,y,2),At("Noires",0,4,4,y,1),Y("Syncope",[[1,y,1],[4,y,0],[7,y,1],[10,y,0],[13,y,1]]),Y("Rim deux-pas",[[3,y,0],[7,y,1],[11,y,0],[14,y,1]]),ss("Triolets",Array.from({length:12},(i,e)=>[e*32,12,e%3===0])),ss("Rafales",[288,300,312,324,336,348,360,372].map((i,e)=>[i,6,e===0])),Y("Montagem",[[0,y,1],[3,y,0],[6,y,1],[8,y,0],[10,y,1],[12,y,0],[14,y,1]])],is=[_n,Dn,Pn,qn];function mo(i,e){let t=i.ev.length;if(!e||t<2)return[];let s=Math.min(e,t-1),a=[];for(let o=0;o<s;o++){let r=Math.round((o+1)*t/(s+1));r<1&&(r=1),r>t-1&&(r=t-1),a.includes(r)||a.push(r)}return a}function hi(i){return Math.max(0,i.ev.length-1)}var vo=[1,2,4,8];var ds={lo:-24,hi:36,maxN:24,maxSemis:37};function ya(i,e,t=ds){let s=ci(i,e),a=[];for(let o=Math.floor(t.lo/12);o<=Math.ceil(t.hi/12);o++)for(let r of s){let n=o*12+r.semi;n>=t.lo&&n<t.hi&&a.push(n)}return a.sort((o,r)=>o-r)}function di(i,e,t,s,a=ds){let o=ya(t,s,a),r=0,n=1/0;o.forEach((d,c)=>{let h=Math.abs(d-e);h<n&&(n=h,r=c)});let l=Math.min(i.n,o.length);return r=Math.max(0,Math.min(o.length-l,r)),{lo:o[r],n:l}}function ui(i,e,t,s,a,o=ds){let r=ya(s,a,o),n=Pt(i,s,a),l=n[0].semi,d=n[n.length-1].semi,c=r[0],h=1/0;for(let m of r){let v=Math.abs(m-t);v<h&&(h=v,c=m)}let p=(m,v)=>r.filter(g=>g>=m&&g<=v).length;if(e==="left"){let m=Math.min(c,d);return m=Math.max(m,d-o.maxSemis+1),{lo:m,n:Math.min(o.maxN,Math.max(1,p(m,d)))}}let f=Math.max(c,l);return f=Math.min(f,l+o.maxSemis-1),{lo:l,n:Math.min(o.maxN,Math.max(1,p(l,f)))}}var bo="motif-3",Cn=3;function fs(){let i=new Uint8Array(8);return crypto.getRandomValues(i),Array.from(i,e=>e.toString(16).padStart(2,"0")).join("")}function Qt(i="A"){return{name:i,drum:[{hits:[]},{hits:[]},{hits:[]},{hits:[]}],bass:{notes:[]},lead:{notes:[]},auto:{},gest:{bass:[],lead:[],drum:[]}}}function Zt(i={}){let e=Date.now();return{format:bo,v:Cn,id:fs(),name:i.name||"Nouvelle id\xE9e",created:e,updated:e,tempo:i.tempo||120,swing:50,key:i.key??2,scale:i.scale||"minor",bars:2,parts:{drum:{kit:i.kit||[null,null,null,null],macros:[null,null,null,null],rhythm:[1,1,1,4],mute:[!1,!1,!1,!1],level:[0,0,0,0]},bass:{preset:i.bass||null,macros:null,rhythm:4,ties:0,steps:5,range:{lo:-12,n:8},arp:"order",q:24,mute:!1,level:0},lead:{preset:i.lead||null,macros:null,rhythm:5,ties:0,steps:5,range:{lo:0,n:10},arp:"order",q:24,mute:!1,level:0}},mix:{drum:0,bass:0,lead:0,pump:.3,master:0,space:.5,drumDrive:.15,drumSpace:.1},patterns:[Qt("A")],current:0,song:{enabled:!1,sections:[]}}}var ve=(i,e,t,s)=>{let a=Number(i);return Number.isFinite(a)?Math.min(s,Math.max(t,a)):e};function os(i){if(!i||typeof i!="object")throw new Error("Fichier de projet illisible");if(i.format&&i.format!==bo)throw new Error("Format de projet inconnu");let t=Zt();t.id=typeof i.id=="string"?i.id.slice(0,40):fs(),t.name=typeof i.name=="string"&&i.name.trim()?i.name.slice(0,80):"Sans titre",t.created=ve(i.created,Date.now(),0,1e15),t.updated=ve(i.updated,Date.now(),0,1e15),t.tempo=ve(i.tempo,120,40,220),t.swing=ve(i.swing,50,50,75),t.key=ve(i.key,0,0,11)|0,t.scale=typeof i.scale=="string"?i.scale:"minor",t.bars=[1,2,4,8].includes(i.bars)?i.bars:2;let s=i.parts||{};if(s.drum){let r=s.drum;t.parts.drum.kit=[0,1,2,3].map(n=>r.kit&&typeof r.kit[n]=="string"?r.kit[n]:null),t.parts.drum.macros=[0,1,2,3].map(n=>r.macros&&Array.isArray(r.macros[n])?r.macros[n].slice(0,7).map(l=>l===null?null:ve(l,.5,0,1)):null),t.parts.drum.rhythm=[0,1,2,3].map(n=>ve(r.rhythm&&r.rhythm[n],1,0,16)|0),t.parts.drum.mute=[0,1,2,3].map(n=>!!(r.mute&&r.mute[n])),t.parts.drum.level=[0,1,2,3].map(n=>ve(r.level&&r.level[n],0,-40,6))}for(let r of["bass","lead"]){let n=s[r];if(!n)continue;let l=t.parts[r];l.preset=typeof n.preset=="string"?n.preset:null,l.macros=Array.isArray(n.macros)?n.macros.slice(0,7).map(d=>d===null?null:ve(d,.5,0,1)):null,l.rhythm=ve(n.rhythm,l.rhythm,0,16)|0,l.ties=ve(n.ties,0,0,24)|0,l.steps=[1,2,3,4,5,6,7,12].includes(n.steps)?n.steps:l.steps,n.range&&(l.range={lo:ve(n.range.lo,l.range.lo,-36,48)|0,n:ve(n.range.n,l.range.n,1,36)|0}),l.arp=["order","up","down","chord"].includes(n.arp)?n.arp:"order",l.q=[6,12,24,48].includes(n.q)?n.q:24,l.mute=!!n.mute,l.level=ve(n.level,0,-40,6)}if(i.mix)for(let r of Object.keys(t.mix))i.mix[r]!==void 0&&(t.mix[r]=ve(i.mix[r],t.mix[r],-40,12));let a=384*t.bars,o=Array.isArray(i.patterns)&&i.patterns.length?i.patterns.slice(0,8):[Qt("A")];return t.patterns=o.map((r,n)=>{let l=Qt(typeof r.name=="string"?r.name.slice(0,12):String.fromCharCode(65+n));for(let d=0;d<4;d++){let c=r.drum&&r.drum[d]&&Array.isArray(r.drum[d].hits)?r.drum[d].hits:[];l.drum[d].hits=c.filter(h=>h&&h.t>=0&&h.t<a).slice(0,4e3).map(h=>({t:h.t|0,v:ve(h.v,.8,0,1),x:ve(h.x,1,0,2)|0,c:ve(h.c,.5,0,1)}))}for(let d of["bass","lead"]){let c=r[d]&&Array.isArray(r[d].notes)?r[d].notes:[];l[d].notes=c.filter(h=>h&&h.t>=0&&h.t<a).slice(0,4e3).map(h=>({t:h.t|0,d:ve(h.d,24,1,a)|0,deg:ve(h.deg,0,-60,60)|0,acc:ve(h.acc,0,-2,2)|0,v:ve(h.v,.8,0,1),tie:!!h.tie,...typeof h.y=="number"?{y:ve(h.y,.5,0,1)}:{}}))}if(r.gest&&typeof r.gest=="object")for(let d of["bass","lead","drum"]){let c=Array.isArray(r.gest[d])?r.gest[d]:[],h=2e4;l.gest[d]=[];for(let p of c){if(!p||!Array.isArray(p.p)||h<=0)continue;let f=p.p.filter(m=>Array.isArray(m)&&m[0]>=0&&m[0]<a).slice(0,h).map(m=>d==="drum"?[Math.round(ve(m[0],0,0,a)*10)/10,ve(m[1],.5,0,1),ve(m[2],.5,0,1)]:[Math.round(ve(m[0],0,0,a)*10)/10,ve(m[1],.5,0,1),ve(m[2],.5,0,1),ve(m[3],0,-60,60)|0,ve(m[4],0,-2,2)|0]);f.length&&(h-=f.length,l.gest[d].push(d==="drum"?{l:ve(p.l,0,0,3)|0,p:f}:{p:f}))}}if(r.auto&&typeof r.auto=="object"){for(let d of["d0","d1","d2","d3","bass","lead"])if(r.auto[d])for(let c=0;c<7;c++){let h=r.auto[d][c];if(Array.isArray(h)&&h.length){l.auto[d]=l.auto[d]||{};let p=a/12;l.auto[d][c]=Array.from({length:p},(f,m)=>{let v=h[m];return v==null||v<0?-1:ve(v,-1,0,1)})}}}return l}),t.current=ve(i.current,0,0,t.patterns.length-1)|0,i.song&&Array.isArray(i.song.sections)&&(t.song.sections=i.song.sections.slice(0,64).map(r=>({p:ve(r.p,0,0,t.patterns.length-1)|0,reps:ve(r.reps,1,1,16)|0,mute:r.mute&&typeof r.mute=="object"?{d0:!!r.mute.d0,d1:!!r.mute.d1,d2:!!r.mute.d2,d3:!!r.mute.d3,bass:!!r.mute.bass,lead:!!r.mute.lead}:{}})),t.song.enabled=!!i.song.enabled&&t.song.sections.length>0),t}function yo(i,e){let t=384*i.bars,s=384*e;if(e!==i.bars){for(let a of i.patterns){let o=(r,n)=>{if(s>t){let l=[];for(let d=t;d<s;d+=t)for(let c of r)c.t+d<s&&l.push(n(c,d));return r.concat(l)}return r.filter(l=>l.t<s).map(l=>l.d&&l.t+l.d>s?{...l,d:s-l.t}:l)};for(let r=0;r<4;r++)a.drum[r].hits=o(a.drum[r].hits,(n,l)=>({...n,t:n.t+l}));for(let r of["bass","lead"])a[r].notes=o(a[r].notes,(n,l)=>({...n,t:n.t+l}));if(a.gest)for(let r of["bass","lead","drum"]){let n=a.gest[r]||[];if(s>t){let l=[];for(let d=t;d<s;d+=t)for(let c of n)l.push({...c,p:c.p.map(h=>[h[0]+d,...h.slice(1)])});a.gest[r]=n.concat(l)}else a.gest[r]=n.map(l=>({...l,p:l.p.filter(d=>d[0]<s)})).filter(l=>l.p.length)}for(let r in a.auto)for(let n in a.auto[r]){let l=a.auto[r][n],d=s/12;a.auto[r][n]=Array.from({length:d},(c,h)=>l[h%l.length])}}i.bars=e}}function fi(i,e,t,s,a,o=!0){if(On(i,e,e==="drum"?t:void 0,s,a),e==="drum"){let r=t==null?[0,1,2,3]:[t];for(let n of r)i.drum[n].hits=i.drum[n].hits.filter(l=>l.t<s||l.t>=a);if(o)for(let n of r)go(i,"d"+n,s,a)}else i[e].notes=i[e].notes.filter(r=>r.t<s||r.t>=a),o&&go(i,e,s,a)}function On(i,e,t,s,a){if(!i.gest||!i.gest[e])return;let o=[];for(let r of i.gest[e]){if(e==="drum"&&t!==void 0&&t!==null&&r.l!==t){o.push(r);continue}let n=r.p.filter(d=>d[0]<s),l=r.p.filter(d=>d[0]>=a);if(n.length===r.p.length){o.push(r);continue}for(let d of[n,l])d.length&&o.push({...r,p:d})}i.gest[e]=o}function go(i,e,t,s){let a=i.auto[e];if(a){for(let o in a){let r=a[o];for(let n=Math.floor(t/12);n<Math.ceil(s/12)&&n<r.length;n++)r[n]=-1;r.every(n=>n<0)&&delete a[o]}Object.keys(a).length||delete i.auto[e]}}function xo(i,e,t){i.range=po(i.range,t,i.steps,e),i.steps=e}function pi(i){return i.drum.reduce((e,t)=>e+t.hits.length,0)+i.bass.notes.length+i.lead.notes.length}var Bn=[{name:"Court",off:{bodyDecay:-1,boomDecay:-1,smpDecay:-1.5}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8,boomDecay:.6,smpDecay:.6}}],In=[{name:"Frappe",def:.5,map:[["click",-.3,.45],["pAmt",-10,10],["clickTone",-.6,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1.2],["boomDecay",-1,1]]}],Fn={name:"Couleur",def:.6,map:[["tone",-2.6,0],["drive",-.12,.3]]},Te=(i,e,t,s={})=>({id:"kick."+i,name:e,style:s.style||null,desc:s.desc||"",p:{kind:0,...t},samples:s.samples,variants:s.variants||Bn,macros:s.macros||In,expr:s.expr||Fn,trim:s.trim||0}),ko=[["vd-kick-2-1",0,70],["vd-kick-3-1",71,104],["vd-kick-4-1",105,127],["vd-kick-4-2",105,127]],wo=[Te("rond","Rond",{freq:50,pAmt:26,pDecay:.045,bodyDecay:.42,click:.3,clickTone:3200,drive:.15,driveType:3},{desc:"Rond et polyvalent, attaque douce"}),Te("club","Club",{freq:53,pAmt:34,pDecay:.03,pAmt2:14,pDecay2:.003,bodyDecay:.34,bodyShape:.2,click:.5,clickTone:4500,drive:.3,driveType:1},{desc:"Punch de club, m\xE9dium pr\xE9sent"}),Te("profond","Profond",{freq:43,pAmt:22,pDecay:.06,bodyDecay:.6,boom:.35,boomDecay:.9,click:.18,tone:6e3},{desc:"Grave profond, queue souple"}),Te("808","808 long",{freq:46,pAmt:18,pDecay:.028,bodyDecay:.35,boom:.85,boomDecay:1.6,click:.22,clickTone:2500,drive:.12},{desc:"Grosse caisse 808 tenue",macros:[{name:"Glisse",def:.35,map:[["pDecay",-1,2.2],["pAmt",-6,14]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,1.2],["boom",-.4,.15]]}]}),Te("feutre","Feutr\xE9",{freq:56,pAmt:14,pDecay:.05,bodyDecay:.28,click:.08,tone:2200,drive:.25,driveType:3},{desc:"Mat, chaud, presque acoustique"}),Te("acoustique","Acoustique",{freq:52,pAmt:10,pDecay:.04,bodyDecay:.22,bodyLevel:.35,click:0,smpLevel:1.05,smpDecay:2},{desc:"Grosse caisse de batterie jazz, prises Virtuosity Drums",samples:ko,macros:[{name:"Peau \u2194 Sub",def:.3,map:[["smpLevel",.15,-.6],["bodyLevel",-.25,.6]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.7,map:[["tone",-2.6,0],["drive",0,.35]]}}),Te("sec","Sec",{freq:62,pAmt:30,pDecay:.018,bodyDecay:.16,click:.6,clickTone:5e3},{desc:"Tr\xE8s court, net, rapide"}),Te("concert","Grosse caisse",{freq:45,pAmt:6,pDecay:.05,bodyDecay:.7,bodyLevel:.4,click:0,smpLevel:1.1,smpDecay:2.5},{desc:"Grosse caisse d\u2019orchestre (VCSL), ample",samples:[["vcsl-bassdrum"]],macros:[{name:"Ampleur",def:.5,map:[["smpDecay",-1.6,1],["bodyLevel",-.3,.4]]},{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]}]}),Te("sature","Satur\xE9",{freq:54,pAmt:32,pDecay:.035,bodyDecay:.32,drive:.65,driveType:1,click:.4,tone:12e3},{desc:"Saturation franche, attaque mordante",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.28],["tone",-1,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),Te("rebond","Rebond",{freq:50,pAmt:24,pDecay:.095,bodyDecay:.5,click:.25},{desc:"Chute de hauteur lente, \xE9lastique"}),Te("sub","Sub",{freq:41,pAmt:10,pDecay:.04,bodyDecay:.8,click:.06,tone:3e3},{desc:"Presque une note de sub"}),Te("clic","Clic",{freq:55,pAmt:28,pDecay:.014,bodyDecay:.3,click:1,clickTone:7e3,clickDecay:.0018},{desc:"Clic aigu tr\xE8s pr\xE9cis"}),Te("vinyle","Vinyle",{freq:54,pAmt:16,pDecay:.04,bodyDecay:.3,bodyLevel:.6,crush:.3,tone:4e3,drive:.3,driveType:3,smpLevel:.8,smpDecay:1},{desc:"Kick poussi\xE9reux, micro lo-fi",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.25,.4],["tone",.6,-1]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]}),Te("909","Neuf-z\xE9ro",{freq:54,pAmt:30,pDecay:.03,bodyDecay:.3,bodyShape:.45,click:.55,clickTone:6e3,clickDecay:.006},{desc:"Analogique techno, l\xE9g\xE8rement carr\xE9"}),Te("boom","Boom",{freq:47,pAmt:22,pDecay:.04,bodyDecay:.3,boom:.55,boomDecay:1.1,drive:.2},{desc:"Hip-hop ample, queue tenue"}),Te("papier","Papier",{freq:65,pAmt:20,pDecay:.02,bodyDecay:.14,click:.45,clickTone:1600,tone:4e3},{desc:"Sec et mat, comme un carton"}),Te("plie","Pli\xE9",{freq:50,pAmt:30,pDecay:.03,bodyDecay:.4,drive:.45,driveType:2,tone:8e3},{desc:"Repliement d\u2019onde : grain harmonique",macros:[{name:"Pli",def:.4,map:[["drive",-.3,.45]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),Te("cajon","Caj\xF3n",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse en bois frapp\xE9e (VCSL)",samples:[["vcsl-cajon-bass",0,127,0],["vcsl-cajon-mid",0,127,1],["vcsl-cajon-slap",0,127,2]],variants:[{name:"Basse"},{name:"Milieu"},{name:"Claque"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),Te("cadre","Tambour sur cadre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Frame drum (VCSL), grave et feutr\xE9",samples:[["vcsl-frame-lo",0,127,0],["vcsl-frame-mute",0,127,1],["vcsl-frame-hi",0,127,2]],variants:[{name:"Ouvert"},{name:"\xC9touff\xE9"},{name:"Petit"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,3]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),Te("tom","Tom grave",{freq:68,pAmt:7,pDecay:.05,bodyDecay:.45,bodyLevel:.45,click:0,smpLevel:1,smpDecay:2},{desc:"Tom basse de batterie + sous-couche synth\xE9tique",samples:[["vd-ltom-8",0,90],["vd-ltom-14",91,127]],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}]}),Te("montagem","Montagem",{freq:50,pAmt:40,pDecay:.032,pAmt2:18,pDecay2:.003,bodyDecay:.45,bodyShape:.5,drive:.85,driveType:1,click:.5,tone:1e4,boom:.3,boomDecay:.7},{style:"phonk",desc:"\xC9cr\xEAt\xE9, agressif, pens\xE9 pour la montagem",macros:[{name:"\xC9cr\xEAtage",def:.5,map:[["drive",-.4,.15],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boom",-.3,.4],["boomDecay",-1,1]]}]}),Te("garage","Garage",{freq:56,pAmt:28,pDecay:.028,bodyDecay:.26,click:.45,clickTone:5200,drive:.18,bodyShape:.15},{style:"ukg",desc:"Court et rebondi pour le 2-step"}),Te("afroprofond","Afro profond",{freq:44,pAmt:16,pDecay:.06,bodyDecay:.5,click:.12,clickTone:2200,drive:.2,driveType:3,boom:.35,boomDecay:1,tone:5e3},{style:"afro",desc:"Profond, chaud, laisse respirer"}),Te("pianofeutre","Piano feutre",{freq:51,pAmt:15,pDecay:.045,bodyDecay:.24,click:.14,tone:3200,drive:.15,driveType:3},{style:"amapiano",desc:"Discret, laisse la place au log drum"}),Te("perreo","Perreo",{freq:57,pAmt:30,pDecay:.035,bodyDecay:.34,bodyShape:.25,click:.4,clickTone:3800,drive:.32,driveType:0},{style:"reggaeton",desc:"Rond et dense pour le dembow"}),Te("jersey","Jersey",{freq:60,pAmt:44,pDecay:.02,pAmt2:12,pDecay2:.002,bodyDecay:.22,click:.75,clickTone:6e3,drive:.38,driveType:1},{style:"jersey",desc:"Tr\xE8s articul\xE9 pour les rafales"}),Te("break","Break",{freq:55,pAmt:26,pDecay:.02,bodyDecay:.18,bodyLevel:.5,click:.2,drive:.25,smpLevel:1,smpDecay:.35},{style:"dnb",desc:"Acoustique serr\xE9 + sub court",samples:ko,macros:[{name:"Peau \u2194 Sub",def:.45,map:[["smpLevel",.1,-.6],["bodyLevel",-.3,.5]]},{name:"Longueur",def:.5,map:[["smpDecay",-1,2],["bodyDecay",-1,1]]}]}),Te("808rage","808 rage",{freq:45,pAmt:24,pDecay:.03,bodyDecay:.4,boom:.95,boomDecay:1.9,bodyShape:.35,drive:.55,driveType:0,click:.3,tone:9e3},{style:"rage",desc:"808 satur\xE9e et tenue",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.35],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,.8]]}]}),Te("rumble","Rumble",{freq:45,pAmt:38,pDecay:.025,bodyDecay:.28,drive:.9,driveType:0,boom:.75,boomDecay:.9,click:.45,tone:5e3,hp:35},{style:"hardtechno",desc:"Kick dur avec tra\xEEne grave satur\xE9e",macros:[{name:"Rumble",def:.5,map:[["boom",-.5,.35],["boomDecay",-1,.8]]},{name:"Duret\xE9",def:.5,map:[["drive",-.4,.15],["click",-.3,.4]]}]}),Te("poussiere","Poussi\xE8re",{freq:52,pAmt:18,pDecay:.05,bodyDecay:.4,click:.2,tone:1600,crush:.4,drive:.3,driveType:3,smpLevel:.6,smpDecay:1},{style:"triphop",desc:"\xC9touff\xE9 et granuleux, tempo lent",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.35,.45],["tone",1,-.6],["drive",-.2,.3]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]})];var zn=[{name:"Fant\xF4me",off:{level:-9,noiseDecay:-.7,bodyDecay:-.5,smpDecay:-1}},{name:"Normal"},{name:"Ouvert",off:{noiseDecay:.8,bodyDecay:.4,revSend:.1,smpDecay:.8}}],Nn=[{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1],["noiseTone",-.8,.8]]}],Hn={name:"Claquant",def:.5,map:[["snap",-.3,.45],["drive",-.05,.3]]},Un=[{name:"Serr\xE9",off:{bursts:-1,noiseDecay:-.8}},{name:"Normal"},{name:"Large",off:{bursts:1,noiseDecay:.7,width:.3,revSend:.15}}],jn=[{name:"Mains",def:.5,map:[["burstGap",-.6,.6],["bursts",-1,2]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["revSend",-.05,.3]]}],Gn={name:"\xC9clat",def:.5,map:[["noiseTone",-.5,.6],["drive",-.05,.3]]},Wn=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.6]]}],Vn={name:"Couleur",def:.6,map:[["tone",-2.3,0],["drive",-.05,.3]]},Me=(i,e,t,s={})=>({id:"snare."+i,name:e,style:s.style||null,desc:s.desc||"",p:{kind:1,freq:190,...t},samples:s.samples,variants:s.variants||(t.kind===2?Un:zn),macros:s.macros||(t.kind===2?jn:t.kind===7?Wn:Nn),expr:s.expr||(t.kind===2?Gn:t.kind===7?Vn:Hn),trim:s.trim||0}),mi=[["vd-snare-8",0,50],["vd-snare-16",51,80],["vd-snare-24",81,100],["vd-snare-32",101,117],["vd-snare-36",118,127]],xa=[["vd-xstick-6",0,60],["vd-xstick-12",61,100],["vd-xstick-16",101,127]],ka=[["vcsl-clap-1"],["vcsl-clap-2"],["vcsl-clap-3"]],wa=(i,e)=>i.map(([t,s=0,a=127])=>[t,s,a,e]),So=[Me("classique","Classique",{pAmt:6,pDecay:.03,bodyDecay:.1,body2:.5,ratio2:1.62,noiseLevel:.8,noiseTone:9e3,noiseHP:800,noiseDecay:.2,snap:.5,clickTone:4500},{desc:"Caisse claire analogique \xE9quilibr\xE9e"}),Me("clap808","Clap 808",{kind:2,noiseLevel:1,noiseTone:1150,noiseQ:.4,noiseHP:600,noiseDecay:.18,bursts:4,burstGap:.0085,width:.4},{desc:"Clap analogique classique"}),Me("rim","Rimshot",{kind:4,freq:520,mdMat:7,bodyDecay:.13,mdHard:.9,click:.35,clickTone:3500},{desc:"Cercle de caisse claire, bois\xE9 et court",macros:[{name:"Accord",def:.5,map:[["tune",-5,5]]},{name:"R\xE9sonance",def:.4,map:[["bodyDecay",-1,1.4]]}],expr:{name:"Frappe",def:.6,map:[["mdHard",-.4,.1],["click",-.3,.15],["level",2.5,-2]]}}),Me("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse claire jazz (Virtuosity Drums) : cross-stick, centre, buzz",samples:[...wa(xa,0),...wa(mi,1),["vd-buzz-6",0,80,2],["vd-buzz-12",81,127,2]],variants:[{name:"Cross-stick"},{name:"Centre"},{name:"Buzz"}]}),Me("sanstimbre","Sans timbre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Timbre rel\xE2ch\xE9 : son de tom sec",samples:[["vd-snoff-6",0,80],["vd-snoff-12",81,127]],variants:[{name:"Grave",off:{smpTune:-3}},{name:"Normal"},{name:"Aigu",off:{smpTune:3}}]}),Me("fantome","Fant\xF4me",{freq:210,pAmt:4,bodyDecay:.06,noiseLevel:.5,noiseTone:7e3,noiseHP:1200,noiseDecay:.09,snap:.2,level:-3},{desc:"L\xE9ger, pour les notes fant\xF4mes"}),Me("crepitant","Cr\xE9pitant",{pAmt:5,bodyDecay:.12,bodyLevel:.6,noiseLevel:1,noiseTone:6e3,noiseHP:400,noiseDecay:.45,crush:.15,snap:.3},{desc:"Longue queue de grain"}),Me("clapserre","Clap serr\xE9",{kind:2,noiseLevel:1,noiseTone:1600,noiseQ:.35,noiseHP:700,noiseDecay:.08,bursts:2,burstGap:.005,width:.25},{desc:"Clap court et pr\xE9cis"}),Me("claplarge","Clap large",{kind:2,noiseLevel:1,noiseTone:1050,noiseQ:.25,noiseHP:500,noiseDecay:.4,bursts:5,burstGap:.011,width:1,revSend:.25},{desc:"Clap ample en st\xE9r\xE9o"}),Me("doigts","Claquement",{kind:2,noiseLevel:1.1,noiseTone:2600,noiseQ:.7,noiseHP:1500,noiseDecay:.05,bursts:1,burstGap:.004,width:.1},{desc:"Claquement de doigts sec"}),Me("mains","Mains",{kind:7,smpLevel:1,smpDecay:3},{desc:"Vrais claps (VCSL) : seul, groupe, groupe en salle",samples:[["vcsl-soloclap-2",0,90,0],["vcsl-soloclap-3",91,127,0],...wa(ka,1),...wa(ka,2)],variants:[{name:"Seul"},{name:"Groupe"},{name:"Salle",off:{revSend:.3}}]}),Me("lofi","Lo-fi",{pAmt:8,bodyDecay:.1,body2:.4,noiseLevel:.85,noiseTone:7e3,noiseHP:900,noiseDecay:.18,crush:.5,tone:5e3,snap:.3},{desc:"\xC9chantillonneur vieilli, 8 bits",macros:[{name:"Usure",def:.5,map:[["crush",-.35,.35],["tone",.8,-.8]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1]]}]}),Me("metal","M\xE9tal",{freq:240,pAmt:3,bodyDecay:.35,body2:.9,ratio2:2.31,noiseLevel:.6,noiseTone:9e3,noiseHP:1500,noiseDecay:.16,snap:.4},{desc:"R\xE9sonance m\xE9tallique accord\xE9e",macros:[{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.2,1],["body2",-.5,.1]]},{name:"Accord",def:.5,map:[["tune",-6,6]]}]}),Me("tomsnare","Tom-caisse",{freq:160,pAmt:12,pDecay:.05,bodyDecay:.22,body2:.3,ratio2:1.5,noiseLevel:.35,noiseTone:6e3,noiseHP:700,noiseDecay:.12},{desc:"Tonal, \xE0 mi-chemin du tom"}),Me("balai","Balai",{bodyLevel:.15,bodyDecay:.05,noiseLevel:.9,noiseTone:5e3,noiseHP:1200,noiseDecay:.3,noiseAttack:.03,snap:0},{desc:"Frottement de balai, attaque lente",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.5,1.2],["noiseDecay",-.7,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.8],["noiseHP",-.6,.6]]}]}),Me("electro","\xC9lectro",{freq:230,pAmt:18,pDecay:.02,bodyDecay:.12,noiseLevel:.9,noiseTone:12e3,noiseHP:1800,noiseDecay:.16,snap:.8,clickTone:6e3,drive:.3,driveType:1},{desc:"Brillant, chute de hauteur rapide"}),Me("snareclap","Caisse + clap",{pAmt:6,bodyDecay:.1,body2:.4,noiseLevel:.6,noiseTone:8e3,noiseHP:1e3,noiseDecay:.16,snap:.3,smpLevel:.7,smpDecay:2},{desc:"Caisse synth\xE9tique doubl\xE9e de vrais claps",samples:ka,macros:[{name:"Caisse \u2194 Clap",def:.5,map:[["smpLevel",-.5,.5],["noiseLevel",.3,-.4],["bodyLevel",.2,-.5]]},{name:"Queue",def:.5,map:[["noiseDecay",-1,1],["smpDecay",-2.5,.5],["revSend",-.05,.25]]}]}),Me("ressort","Ressort",{freq:180,pAmt:9,pDecay:.06,bodyDecay:.6,body2:.7,ratio2:1.45,noiseLevel:.5,noiseTone:7e3,noiseHP:900,noiseDecay:.25,drive:.2},{desc:"Corps qui sonne longtemps"}),Me("roulement","Roulement",{kind:7,smpLevel:1,smpDecay:3},{desc:"Buzz de caisse claire (roul\xE9 press\xE9)",samples:[["vd-buzz-6",0,80],["vd-buzz-12",81,127]]}),Me("crossstick","Cross-stick",{kind:7,smpLevel:1,smpDecay:3},{desc:"Baguette pos\xE9e sur le cercle",samples:xa}),Me("clapmontagem","Clap montagem",{kind:2,noiseLevel:1,noiseTone:1400,noiseQ:.3,noiseHP:600,noiseDecay:.2,bursts:3,burstGap:.007,drive:.8,driveType:1,width:.4},{style:"phonk",desc:"Clap \xE9cras\xE9, tr\xE8s pr\xE9sent"}),Me("garage","Garage snare",{freq:220,pAmt:8,bodyDecay:.07,noiseLevel:.85,noiseTone:11e3,noiseHP:1500,noiseDecay:.11,snap:.6,smpLevel:.4,smpDecay:1},{style:"ukg",desc:"Sec et nerveux pour le 2-step",samples:xa}),Me("clapafro","Clap afro",{kind:2,noiseLevel:.9,noiseTone:1e3,noiseQ:.2,noiseHP:450,noiseDecay:.3,bursts:4,burstGap:.012,width:.9,revSend:.2},{style:"afro",desc:"Doux, large, a\xE9r\xE9"}),Me("rimpiano","Rim piano",{kind:4,freq:600,mdMat:7,bodyDecay:.06,mdHard:.8,click:.4,bodyLevel:.5,smpLevel:.7,smpDecay:1},{style:"amapiano",desc:"Rimshot bois\xE9 et feutr\xE9",samples:xa,macros:[{name:"Accord",def:.5,map:[["tune",-5,5],["smpTune",-5,5]]},{name:"Bois \u2194 Baguette",def:.5,map:[["bodyLevel",-.4,.4],["smpLevel",.4,-.5]]}]}),Me("dembow","Snare dembow",{freq:200,pAmt:10,bodyDecay:.08,noiseLevel:.9,noiseTone:8e3,noiseHP:1200,noiseDecay:.12,snap:.7,drive:.2},{style:"reggaeton",desc:"Claquant et court"}),Me("clapjersey","Clap jersey",{kind:2,noiseLevel:1,noiseTone:1300,noiseQ:.3,noiseHP:600,noiseDecay:.22,bursts:4,burstGap:.008,drive:.35,driveType:1,smpLevel:.5,smpDecay:2},{style:"jersey",desc:"Clap \xE9norme, doubl\xE9",samples:ka,macros:[{name:"Synth\xE9 \u2194 Mains",def:.4,map:[["smpLevel",-.45,.7],["noiseLevel",.3,-.6]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["smpDecay",-2,.5],["revSend",-.05,.3]]}]}),Me("dnb","Snare DnB",{freq:200,bodyDecay:.1,bodyLevel:.5,noiseLevel:.6,noiseTone:9e3,noiseHP:1200,noiseDecay:.16,snap:.6,drive:.3,smpLevel:1,smpDecay:1.5},{style:"dnb",desc:"Crack acoustique renforc\xE9",samples:mi,macros:[{name:"Crack",def:.5,map:[["snap",-.3,.5],["drive",-.2,.35]]},{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3],["smpTune",-2,2]]}]}),Me("claprage","Clap rage",{kind:2,noiseLevel:1,noiseTone:1250,noiseQ:.3,noiseHP:500,noiseDecay:.25,bursts:3,burstGap:.009,width:1,drive:.5,revSend:.2},{style:"rage",desc:"Large et satur\xE9"}),Me("industriel","Clap industriel",{kind:2,noiseLevel:1,noiseTone:1800,noiseQ:.55,noiseHP:700,noiseDecay:.35,bursts:4,burstGap:.01,drive:.6,driveType:2,width:.6,revSend:.3},{style:"hardtechno",desc:"R\xE9sonance m\xE9tallique, salle froide"}),Me("poussiere","Snare poussi\xE8re",{kind:7,smpLevel:1,smpDecay:3,crush:.35,tone:4500,drive:.3,driveType:3,revSend:.15},{style:"triphop",desc:"Caisse claire us\xE9e, lente",samples:mi})];var Yn=[{name:"Ferm\xE9"},{name:"Mi-ouvert",off:{noiseDecay:1.3}},{name:"Ouvert",off:{noiseDecay:2.6,revSend:.05}}],Kn=[{name:"M\xE9tal \u2194 Souffle",def:.5,map:[["metal",.35,-.5]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.7],["noiseHP",-.7,.5]]}],Xn={name:"Longueur",def:.4,map:[["noiseDecay",-.7,1],["smpDecay",-1.5,1]]},$n=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Brillance",def:.6,map:[["tone",-2.4,0],["hp",0,1.6]]}],Jn={name:"Longueur",def:.65,map:[["smpDecay",-3,.5]]},Le=(i,e,t,s={})=>({id:"hat."+i,name:e,style:s.style||null,desc:s.desc||"",p:{kind:3,freq:400,noiseLevel:.8,...t},samples:s.samples,variants:s.variants||Yn,macros:s.macros||(t.kind===7?$n:Kn),expr:s.expr||(t.kind===7?Jn:Xn),trim:s.trim||0}),To=[["vd-hh-closed-2-1",0,80,0],["vd-hh-closed-2-2",0,80,0],["vd-hh-closed-4-1",81,127,0],["vd-hh-closed-4-2",81,127,0],["vd-hh-half-3",0,127,1],["vd-hh-open-3",0,127,2]],Mo=[{name:"Doux",off:{level:-5}},{name:"Normal"},{name:"Long",off:{smpDecay:1,revSend:.08}}],Lo=[Le("analogique","Analogique",{metal:.75,noiseTone:9e3,noiseHP:6500,noiseDecay:.06},{desc:"M\xE9tallique fa\xE7on bo\xEEte \xE0 rythmes"}),Le("bruit","Bruit blanc",{metal:0,noiseTone:1e4,noiseHP:7e3,noiseDecay:.05,width:.5},{desc:"Souffle pur, tr\xE8s lisible"}),Le("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Charleston jazz (Virtuosity Drums) : ferm\xE9, mi-ouvert, ouvert",samples:To,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]}),Le("ride","Ride",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Cymbale ride : frappe, cloche",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Forte"}]}),Le("crash","Crash",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Crash et cymbale \xE0 rivets",samples:[["vd-crash-2-1",0,127,0],["vd-crash-2-1",0,127,1],["vd-sizzle-2-1",0,127,2]],variants:[{name:"Court",off:{smpDecay:-2.5}},{name:"Crash"},{name:"Rivets"}]}),Le("fin","Fin",{metal:.5,noiseTone:13e3,noiseHP:9e3,noiseDecay:.04},{desc:"Petit tic aigu"}),Le("sombre","Sombre",{metal:.6,metalTune:-7,noiseTone:6e3,noiseHP:3500,noiseDecay:.08},{desc:"Grave et feutr\xE9"}),Le("brillant","Brillant",{metal:.4,noiseTone:14e3,noiseHP:8e3,noiseDecay:.07,width:.7},{desc:"Air et brillance"}),Le("lofi","Lo-fi",{metal:.6,noiseTone:9e3,noiseHP:5e3,noiseDecay:.06,crush:.45,tone:9e3},{desc:"Granuleux, r\xE9duit en bits"}),Le("tss","Tss",{metal:.2,noiseTone:11e3,noiseHP:6e3,noiseDecay:.2,noiseAttack:.008},{desc:"Souffle ouvert, attaque douce"}),Le("shaker","Shaker",{kind:7,smpLevel:1,smpDecay:4},{desc:"Shaker (Virtuosity Drums) aller / retour",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-shaker-d",0,127,2],["vd-shaker-u",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Altern\xE9"}]}),Le("tambourin","Tambourin",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Tambourin secou\xE9",samples:[["vd-tamb-1"],["vd-tamb-2"]],variants:Mo}),Le("triangle","Triangle",{kind:7,smpLevel:1,smpDecay:6,choke:1},{desc:"Triangle \xE9touff\xE9 ou ouvert",samples:[["vd-tri-mute",0,127,0],["vd-tri-open",0,127,1],["vd-tri-open",0,127,2]],variants:[{name:"\xC9touff\xE9"},{name:"Ouvert"},{name:"Long",off:{revSend:.15}}]}),Le("cabasa","Cabasa",{kind:7,smpLevel:1,smpDecay:4},{desc:"Perles m\xE9talliques frott\xE9es",samples:[["vd-cabasa"]],variants:Mo}),Le("charleston2","Charleston clair",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Autre charleston (VCSL) : ferm\xE9, l\xE2che, ouvert",samples:[["vcsl-hh-closed",0,127,0],["vcsl-hh-loose",0,127,1],["vcsl-hh-open",0,127,2]],variants:[{name:"Ferm\xE9"},{name:"L\xE2che"},{name:"Ouvert"}]}),Le("clochette","Clochette",{metal:1,metalTune:12,noiseTone:8e3,noiseHP:4e3,noiseDecay:.15},{desc:"M\xE9tal accord\xE9, presque une cloche"}),Le("grain","Granuleux",{kind:6,noiseTone:9e3,noiseQ:.3,noiseHP:5e3,noiseDecay:.07,noiseAttack:.004,bodyShape:.75,noiseLevel:1},{desc:"Grains de sable irr\xE9guliers",macros:[{name:"Grain",def:.5,map:[["bodyShape",-.5,.25]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),Le("large","St\xE9r\xE9o",{metal:.3,noiseTone:1e4,noiseHP:6e3,noiseDecay:.09,width:1},{desc:"Ouvert dans l\u2019image st\xE9r\xE9o"}),Le("pichenette","Pichenette",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Cymbalettes \xE0 doigts (VCSL)",samples:[["vcsl-fingercym"]],variants:[{name:"Court",off:{smpDecay:-3}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),Le("pedale","P\xE9dale",{metal:.5,noiseTone:7e3,noiseHP:5e3,noiseDecay:.025,noiseAttack:.004},{desc:"Chick sec de p\xE9dale"}),Le("drift","Hat drift",{metal:.7,noiseTone:1e4,noiseHP:7500,noiseDecay:.045,drive:.4},{style:"phonk",desc:"Court et croustillant"}),Le("garage","Hat garage",{metal:.55,noiseTone:11e3,noiseHP:7e3,noiseDecay:.055,width:.4},{style:"ukg",desc:"Swing et ouvertures nettes"}),Le("shakerafro","Shaker afro",{kind:7,smpLevel:1,smpDecay:4,revSend:.18,tone:7e3,smpTune:-2},{style:"afro",desc:"Shaker organique, un peu d\u2019espace",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-cabasa",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Cabasa"}]}),Le("shakerpiano","Shaker piano",{kind:6,noiseTone:7500,noiseQ:.3,noiseHP:4e3,noiseDecay:.14,noiseAttack:.02,bodyShape:.4,width:.6,noiseLevel:1},{style:"amapiano",desc:"Long shaker soyeux",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.2,1],["noiseDecay",-.6,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),Le("perreo","Hat perreo",{metal:.65,noiseTone:9500,noiseHP:6e3,noiseDecay:.05},{style:"reggaeton",desc:"R\xE9gulier et lisible"}),Le("jersey","Hat jersey",{metal:.5,noiseTone:12e3,noiseHP:8e3,noiseDecay:.035,drive:.25},{style:"jersey",desc:"Pointu pour les doubles croches"}),Le("ridednb","Ride DnB",{kind:7,smpLevel:1,smpDecay:.7,hp:1800,choke:1},{style:"dnb",desc:"Ride serr\xE9e et rapide",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Ouverte",off:{smpDecay:2}}]}),Le("trap","Hat trap",{metal:.8,noiseTone:10500,noiseHP:8e3,noiseDecay:.03,drive:.2},{style:"rage",desc:"Tr\xE8s serr\xE9, fait pour les roulements"}),Le("industriel","Hat industriel",{metal:.3,noiseTone:9e3,noiseHP:5e3,noiseDecay:.25,drive:.7,driveType:2,revSend:.1},{style:"hardtechno",desc:"Ouvert, dur, satur\xE9"}),Le("vinyle","Hat vinyle",{kind:7,smpLevel:1,smpDecay:4,crush:.4,tone:6e3,choke:1},{style:"triphop",desc:"Charleston us\xE9 et sombre",samples:To,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]})];var Qn=[{name:"Grave",off:{tune:-5,smpTune:-5}},{name:"M\xE9dium"},{name:"Aigu",off:{tune:5,smpTune:5}}],Zn=[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"R\xE9sonance",def:.6,map:[["smpDecay",-2.5,.6],["revSend",-.05,.25]]}],e0={name:"Couleur",def:.6,map:[["tone",-2.4,0],["drive",-.05,.3]]},t0=[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.3,1.3]]}],s0={name:"Frappe",def:.6,map:[["mdHard",-.4,.2],["click",-.2,.15],["level",2.5,-2]]},Re=(i,e,t,s={})=>({id:"perc."+i,name:e,style:s.style||null,desc:s.desc||"",p:{kind:7,smpLevel:1,smpDecay:4,...t},samples:s.samples,variants:s.variants||Qn,macros:s.macros||((t.kind??7)===7?Zn:t0),expr:s.expr||((t.kind??7)===7?e0:s0),trim:s.trim||0}),yt=(...i)=>i.flatMap((e,t)=>e.map(([s,a=0,o=127])=>[s,a,o,t])),Ro=[Re("conga","Conga",{},{desc:"Tumba, conga ouverte, conga \xE9touff\xE9e (Virtuosity Drums)",samples:yt([["vd-tumba"]],[["vd-conga-open-lo",0,100],["vd-conga-open-hi",101,127]],[["vd-conga-mute"]]),variants:[{name:"Tumba"},{name:"Ouverte"},{name:"\xC9touff\xE9e"}]}),Re("bongo","Bongo",{},{desc:"Paire de bongos",samples:yt([["vd-bongo-lo"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),Re("cloche","Cloche",{},{desc:"Cloche de vache r\xE9elle",samples:[["vd-cowbell-1",0,90],["vd-cowbell-2",91,127]]}),Re("cloche808","Cloche 808",{kind:5,freq:540,ratio2:1.48,bodyDecay:.06,noiseDecay:.35,noiseTone:2600,noiseQ:.3,bodyLevel:1},{desc:"Cloche analogique \xE0 deux oscillateurs",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.5,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.5,map:[["noiseTone",-.6,.6],["drive",0,.4]]}}),Re("agogo","Agog\xF4",{},{desc:"Cloches agog\xF4 grave et aigu\xEB",samples:yt([["vd-agogo-lo"]],[["vd-agogo-hi"]],[["vd-agogo-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Aigu\xEB tendue",off:{smpTune:2}}]}),Re("claves","Claves",{},{desc:"Deux b\xE2tons de bois",samples:[["vd-claves-1",0,90],["vd-claves-2",91,127]]}),Re("bloc","Wood-block",{},{desc:"Bloc de bois grave / aigu",samples:yt([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-woodblock-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Tr\xE8s aigu",off:{smpTune:4}}]}),Re("guiro","G\xFCiro",{},{desc:"R\xE2pe en bois",samples:[["vd-guiro"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long"}]}),Re("timbales","Timbales",{},{desc:"Timbales latines",samples:yt([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Sec",off:{smpDecay:-2}}]}),Re("cuica","Cu\xEDca",{},{desc:"Tambour \xE0 friction br\xE9silien",samples:yt([["vd-cuica-1"]],[["vd-cuica-2"]],[["vd-cuica-2"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Tr\xE8s aigu\xEB",off:{smpTune:4}}]}),Re("darbuka","Darbouka",{},{desc:"Frappes de darbouka (VCSL)",samples:yt([["vcsl-darbuka-1"],["vcsl-darbuka-2"]],[["vcsl-darbuka-3"]],[["vcsl-darbuka-4"],["vcsl-darbuka-5"]]),variants:[{name:"Centre"},{name:"Bord"},{name:"Claque"}]}),Re("cajon","Caj\xF3n aigu",{},{desc:"Claques de caj\xF3n",samples:yt([["vcsl-cajon-mid"]],[["vcsl-cajon-slap"]],[["vcsl-cajon-slap"]]),variants:[{name:"Milieu"},{name:"Claque"},{name:"Claque s\xE8che",off:{smpDecay:-2}}]}),Re("fente","Tambour \xE0 fente",{},{desc:"Log drum en bois (VCSL)",samples:yt([["vcsl-slit-lo"]],[["vcsl-slit-hi"]],[["vcsl-slit-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),Re("toms","Toms",{},{desc:"Toms de batterie",samples:yt([["vd-ltom-8",0,90],["vd-ltom-14",91,127]],[["vd-htom-8",0,90],["vd-htom-14",91,127]],[["vd-htom-14"]]),variants:[{name:"Basse"},{name:"Haute"},{name:"Haute tendue",off:{smpTune:3}}]}),Re("goutte","Goutte",{kind:4,freq:900,mdMat:2,pAmt:12,pDecay:.02,bodyDecay:.4,mdHard:.4,revSend:.1},{desc:"Goutte de verre accord\xE9e"}),Re("boisynth","Bois synth\xE9tique",{kind:4,freq:750,mdMat:0,bodyDecay:.2,mdHard:.7,click:.2},{desc:"R\xE9sonateur de bois"}),Re("tom808","Tom 808",{kind:8,freq:120,mdMat:3,pAmt:10,pDecay:.1,bodyDecay:.45,mdHard:.5},{desc:"Tom analogique qui chute"}),Re("vibraslap","Vibraslap",{},{desc:"Claquement vibrant",samples:[["vd-vibraslap"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),Re("enclume","Enclume",{drive:.15},{desc:"M\xE9taux frapp\xE9s : enclume, tambours de frein",samples:yt([["vcsl-anvil"]],[["vcsl-brake-1"]],[["vcsl-brake-2"]]),variants:[{name:"Enclume"},{name:"Frein 1"},{name:"Frein 2"}]}),Re("blip","Blip",{kind:4,freq:1200,mdMat:4,pAmt:24,pDecay:.008,bodyDecay:.11,mdHard:.9},{desc:"Bip synth\xE9tique zapp\xE9"}),Re("clochephonk","Cloche phonk",{kind:5,freq:560,ratio2:1.48,bodyDecay:.08,noiseDecay:.25,noiseTone:2800,noiseQ:.35,drive:.5,driveType:1},{style:"phonk",desc:"Cloche satur\xE9e, jouable en m\xE9lodie (axe vertical = hauteur)",variants:[{name:"Courte",off:{noiseDecay:-1.2}},{name:"Normale"},{name:"Longue",off:{noiseDecay:.8}}],macros:[{name:"Saturation",def:.5,map:[["drive",-.4,.4]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.2,1]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),Re("toc","Toc garage",{kind:4,freq:950,mdMat:0,bodyDecay:.12,mdHard:.85,click:.25,clickTone:5e3,drive:.1},{style:"ukg",desc:"Bois tr\xE8s court pour le shuffle"}),Re("djembe","Peau afro",{kind:8,freq:220,mdMat:3,pAmt:14,pDecay:.03,bodyDecay:.25,noiseLevel:.4,noiseDecay:.05,noiseHP:1500,noiseTone:6e3,click:.4,clickTone:3e3},{style:"afro",desc:"Peau synth\xE9tique avec claque",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Peau \u2194 Claque",def:.4,map:[["noiseLevel",-.3,.6],["bodyLevel",.2,-.4]]}]}),Re("logdrum","Log drum",{kind:8,freq:90,mdMat:3,pAmt:19,pDecay:.05,bodyDecay:.5,mdHard:.7,drive:.3,driveType:3},{style:"amapiano",desc:"Log drum percussif (axe vertical = hauteur)",variants:[{name:"Court",off:{bodyDecay:-1}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8}}],macros:[{name:"Glisse",def:.5,map:[["pAmt",-10,10],["pDecay",-.6,.8]]},{name:"Grain",def:.4,map:[["drive",-.25,.45],["mdHard",-.3,.3]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),Re("timbal","Timbal perreo",{smpDecay:.8,drive:.3,smpTune:2,hp:300,tone:9e3},{style:"reggaeton",desc:"Timbales s\xE8ches pour le dembow",samples:yt([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Ouverte",off:{smpDecay:2}}]}),Re("couinement","Couinement",{kind:4,freq:1400,mdMat:4,pAmt:7,pDecay:.06,bodyDecay:.22,mdHard:.9,drive:.2},{style:"jersey",desc:"Petit cri synth\xE9tique, original"}),Re("tombreak","Tom break",{smpDecay:.6,drive:.25},{style:"dnb",desc:"Toms tendus pour les breaks",samples:yt([["vd-ltom-14"]],[["vd-htom-14"]],[["vd-snoff-12"]]),variants:[{name:"Tom basse"},{name:"Tom haute"},{name:"Caisse sans timbre"}]}),Re("laser","Laser",{kind:4,freq:1600,mdMat:4,pAmt:30,pDecay:.01,bodyDecay:.13,mdHard:1,drive:.4},{style:"rage",desc:"Bip laser satur\xE9"}),Re("metalindus","M\xE9tal industriel",{drive:.6,driveType:2,revSend:.2},{style:"hardtechno",desc:"Freins frapp\xE9s, satur\xE9s, salle froide",samples:yt([["vcsl-brake-1"]],[["vcsl-brake-2"]],[["vcsl-anvil"]]),variants:[{name:"Frein 1"},{name:"Frein 2"},{name:"Enclume"}]}),Re("boisfeutre","Bois feutr\xE9",{tone:2500,crush:.2,revSend:.2},{style:"triphop",desc:"Bois \xE9touff\xE9 et lointain",samples:yt([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-claves-1"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Claves"}]})];var Ae=(i,e,t,s,a,o,r,n={})=>({id:"bass."+i,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||1,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.03,aA:.003,aR:.08,...s},groups:a,macros:o,expr:r,trim:n.trim||0}),k=(i,e,t)=>({name:i,def:e,map:t}),Gt=[k("\xC9cho",0,[["dlMix",0,.35],["dlFb",0,.3]]),k("Salle",.1,[["rvSend",-.03,.3]])],vi=[Ae("sub","Sub pur","va",{osc1Wave:3,fType:4,vDrive:.15,vDriveType:3,aD:.3,aS:.95,aR:.12,osc2Wave:3,osc2Semi:12,osc2Level:0},["Chaleur","Forme","Glisse"],[k("Harmoniques",.3,[["vDrive",-.15,.5]]),k("Octave",0,[["osc2Level",0,.55]]),k("Attaque",.2,[["aA",-.5,6]]),k("Rel\xE2che",.3,[["aR",-.8,2.5]]),k("Glisse",.4,[["glide",-2,2.5],["pEnvAmt",0,5],["pEnvTime",0,1]]),k("Tenue",.8,[["aS",-.6,.05],["aD",-1,1]])],{name:"Grain",def:.3,map:[["fxDrive",0,.45],["fxLP",0,-1.5]]},{desc:"Sinus pur, grave centr\xE9"}),Ae("moog","Moog rond","va",{osc1Wave:0,fType:0,cutoff:280,reso:.35,fEnv:3.2,fD:.22,fS:.15,keyTrack:.4,subLevel:.5,aS:.9},["Filtre","Enveloppe","Couleur"],[k("Ouverture",.45,[["cutoff",-1.5,2]]),k("R\xE9sonance",.4,[["reso",-.35,.6],["cutoff",0,.5]]),k("Mordant",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.45,[["fD",-1.5,1.6]]),k("Saturation",.2,[["fDrive",0,.8]]),k("Sub",.5,[["subLevel",-.5,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,2]]},{desc:"Analogique classique, rond et souple"}),Ae("acide","Acide","va",{osc1Wave:0,osc2Wave:1,osc2Level:0,fType:0,cutoff:380,reso:.82,fEnv:4,fD:.16,fS:0,keyTrack:.5,velFilt:.7,glide:.07,aD:.25,aS:.7,aR:.06,vDrive:.2},["Filtre","Accent","Grain"],[k("Coupure",.4,[["cutoff",-1.5,2.2]]),k("R\xE9sonance",.7,[["reso",-.45,.14]]),k("Enveloppe",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.4,[["fD",-1.4,1.8]]),k("Distorsion",.25,[["vDrive",-.2,.7]]),k("Scie \u2194 Carr\xE9",0,[["osc1Level",0,-1],["osc2Level",0,1]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{desc:"Ligne acide r\xE9sonante, glisse sur les liaisons"}),Ae("reese","Reese","va",{osc1Wave:0,unison:3,detune:18,spread:.35,osc2Wave:0,osc2Semi:-12,osc2Level:.3,fType:0,cutoff:900,reso:.15,fEnv:.5,subLevel:.6,chMix:.2,lfoRate:.25,aS:1,aR:.15},["Battement","Filtre","Largeur"],[k("D\xE9saccord",.4,[["detune",-12,25]]),k("Mouvement",.3,[["lfoCut",0,1.6]]),k("Ouverture",.45,[["cutoff",-1.5,1.8]]),k("Mordant",.25,[["fDrive",0,.8]]),k("Largeur",.4,[["spread",-.35,.6],["chMix",-.2,.4]]),k("Sub",.6,[["subLevel",-.6,.4]])],{name:"Ouverture",def:.4,map:[["cutoff",-1.2,1.6]]},{desc:"Scies d\xE9saccord\xE9es qui battent lentement"}),Ae("808","808 gliss\xE9e","va",{osc1Wave:3,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.3,vDriveType:0,glide:.09,aD:1.5,aS:.6,aR:.2},["Saturation","Glisse","Queue"],[k("Saturation",.4,[["vDrive",-.3,.5]]),k("Mordant",.2,[["fxDrive",0,.5]]),k("Glisse",.45,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-10,12]]),k("Queue",.5,[["aD",-1.5,1.5]]),k("Tenue",.5,[["aS",-.5,.35]])],{name:"Saturation",def:.4,map:[["vDrive",-.25,.45]]},{desc:"808 accord\xE9e, les notes qui se chevauchent glissent",glideMode:"legato"}),Ae("fm","FM grave","fm",{fmAlgo:0,fmR1:1,fmR2:1,fmL2:2.5,fmD2:.25,fmS2:.2,fmR3:3,fmL3:.6,fmD3:.12,fmS3:0,fmL4:0,fType:4,aS:.85,aR:.1},["Brillance","M\xE9tal","Espace"],[k("Indice",.45,[["fmL2",-2,3]]),k("D\xE9clin",.45,[["fmD2",-1.5,2]]),k("Rapport",0,[["fmR2",0,2.5]]),k("R\xE9troaction",0,[["fmFb",0,.7],["fmL4",0,1.5]]),...Gt],{name:"Indice",def:.4,map:[["fmL2",-1.5,2.5]]},{desc:"Basse FM num\xE9rique, attaque brillante"}),Ae("pluck","Pluck basse","va",{osc1Wave:0,osc2Wave:1,osc2Level:.4,fType:0,cutoff:200,reso:.25,fEnv:4.5,fD:.12,aD:.35,aS:.2,aR:.1},["Pincement","Corps","Espace"],[k("Pincement",.5,[["fEnv",-2.5,2.5],["fD",-.8,.8]]),k("R\xE9sonance",.3,[["reso",-.2,.5]]),k("Longueur",.4,[["aD",-1,2],["aS",-.15,.5]]),k("Grave",.3,[["subLevel",0,.8]]),...Gt],{name:"Brillance",def:.4,map:[["cutoff",-1,2]]},{desc:"Court et articul\xE9 pour la house"}),Ae("orgue","Orgue basse","wt",{wtTable:4,wtPos:.35,subLevel:.6,fType:1,cutoff:2500,reso:0,fEnv:0,fD:.06,chMix:.15,chRate:.8,aA:.002,aS:1,aR:.06},["Tirettes","Percussion","Rotation"],[k("Tirettes",.35,[["wtPos",-.35,.65]]),k("Sub",.6,[["subLevel",-.6,.4]]),k("Clic",.2,[["fEnv",0,3.5]]),k("Douceur",0,[["cutoff",0,-2.2]]),k("Rotation",.2,[["chMix",-.15,.6],["chRate",0,2.6]]),k("Saturation",.1,[["fxDrive",0,.5]])],{name:"Tirettes",def:.4,map:[["wtPos",-.3,.5]]},{desc:"Orgue grave fa\xE7on house/garage"}),Ae("contrebasse","Contrebasse","pluck",{pkDecay:1.2,pkDamp:.55,pkBright:.45,pkBody:.5,fType:1,cutoff:3e3,glide:.06,aS:1,aR:.15},["Corde","Caisse","Doigt"],[k("Tension",.5,[["pkDamp",.45,-.45],["pkBright",-.2,.25]]),k("R\xE9sonance",.5,[["pkDecay",-1.2,1.4]]),k("Caisse",.5,[["pkBody",-.4,.4]]),k("Bois\xE9",.5,[["cutoff",-1.6,1]]),k("Attaque",.45,[["pkBright",-.35,.45]]),k("Glisse",.3,[["glide",-2,2]])],{name:"Attaque",def:.45,map:[["pkBright",-.3,.4]]},{desc:"Corde pinc\xE9e physique, chaude"}),Ae("electrique","\xC9lectrique","va",{osc1Wave:0,osc2Wave:4,osc2PW:.3,osc2Level:.3,fType:0,cutoff:950,reso:.1,fEnv:2,fD:.3,vDrive:.05,aD:.6,aS:.5},["Doigt","Ampli","Espace"],[k("Attaque",.4,[["fEnv",-1,2.5]]),k("M\xE9diums",.5,[["osc2Level",-.3,.6],["osc2PW",-.2,.2]]),k("Ampli",.25,[["vDrive",-.1,.6]]),k("Grave",.3,[["subLevel",0,.7]]),...Gt],{name:"Brillance",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Basse \xE9lectrique au doigt, m\xE9diums pr\xE9sents"}),Ae("wobble","Wobble","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,fType:0,cutoff:300,reso:.5,lfoBeats:.5,lfoCut:3,lfoShape:0,subLevel:.5,vDrive:.25,aS:1,aR:.1},["Oscillation","Filtre","Grain"],[k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Profondeur",.6,[["lfoCut",-2.5,1.2]]),k("Ouverture",.4,[["cutoff",-1,1.8]]),k("R\xE9sonance",.5,[["reso",-.3,.4]]),k("Saturation",.3,[["vDrive",-.2,.6]]),k("Sub",.5,[["subLevel",-.5,.5]])],{name:"Profondeur",def:.5,map:[["lfoCut",-2,1]]},{desc:"Filtre oscillant cal\xE9 sur le tempo"}),Ae("hoover","Hoover","va",{osc1Wave:4,osc1PW:.3,unison:5,detune:30,spread:.8,osc2Wave:0,osc2Semi:-12,osc2Level:.6,lfoPW:.2,lfoRate:3,pEnvAmt:-5,pEnvTime:.12,fType:0,cutoff:1500,reso:.1,chMix:.4,aS:1,aR:.2},["Plong\xE9e","Ch\u0153ur","Filtre"],[k("Plong\xE9e",.5,[["pEnvAmt",5,-7],["pEnvTime",-.5,1]]),k("Pulsation",.4,[["lfoPW",-.2,.2]]),k("D\xE9saccord",.5,[["detune",-20,25]]),k("Ch\u0153ur",.4,[["chMix",-.3,.5]]),k("Ouverture",.5,[["cutoff",-1.5,1.5]]),k("R\xE9sonance",.2,[["reso",-.1,.5]])],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.2]]},{desc:"Rave des ann\xE9es 90, plongeant et large"}),Ae("carre","Carr\xE9","va",{osc1Wave:4,osc1PW:.5,subLevel:.2,fType:1,cutoff:3e3,reso:.1,fEnv:1.5,fD:.15,aD:.4,aS:.6},["Forme","Filtre","Espace"],[k("Largeur",1,[["osc1PW",-.4,0]]),k("Sub",.4,[["subLevel",-.4,.6]]),k("Ouverture",.5,[["cutoff",-2,1.5]]),k("Mordant",.3,[["fEnv",-1,3]]),...Gt],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Onde carr\xE9e, clin d\u2019\u0153il 8 bits"}),Ae("grondement","Grondement","wt",{wtTable:3,wtPos:.3,unison:3,detune:10,spread:.3,lfoBeats:1,lfoWt:.6,fType:1,cutoff:4e3,vDrive:.4,subLevel:.6,aS:1,aR:.12},["Gorge","Filtre","Grain"],[k("Gorge",.3,[["wtPos",-.3,.7]]),k("Mouvement",.5,[["lfoWt",-.6,.4],["lfoBeats",.6,-.5]]),k("Ouverture",.6,[["cutoff",-2.5,1]]),k("R\xE9sonance",.2,[["reso",0,.6]]),k("Saturation",.4,[["vDrive",-.3,.5]]),k("Sub",.6,[["subLevel",-.6,.4]])],{name:"Gorge",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Table d\u2019ondes qui \xAB parle \xBB, style bass music"}),Ae("doux","Doux","va",{osc1Wave:2,vDriveType:3,subLevel:.6,fType:1,cutoff:1200,aA:.01,aS:.9,aR:.2},["Rondeur","Souffle","Espace"],[k("Ouverture",.4,[["cutoff",-1,1.6]]),k("Sub",.6,[["subLevel",-.6,.4]]),k("Attaque",.3,[["aA",-.5,4]]),k("Chaleur",.2,[["vDrive",0,.4]]),...Gt],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.5]]},{desc:"Triangle tendre pour deep house"}),Ae("pulse","Pulse","va",{osc1Wave:4,osc1PW:.22,lfoPW:.15,lfoRate:.35,fType:0,cutoff:700,reso:.2,fEnv:2,fD:.25,aS:.8,subLevel:.3},["Impulsion","Filtre","Espace"],[k("Largeur",.3,[["osc1PW",-.17,.27]]),k("Modulation",.5,[["lfoPW",-.15,.2],["lfoRate",-1,2]]),k("Ouverture",.45,[["cutoff",-1.5,1.8]]),k("Mordant",.4,[["fEnv",-1.5,3]]),...Gt],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Impulsion \xE0 largeur mouvante"}),Ae("saturee","Satur\xE9e","va",{osc1Wave:0,fType:0,cutoff:900,reso:.25,fDrive:.8,vDrive:.5,fxDrive:.3,fxDriveType:1,subLevel:.5,aS:.9},["Distorsion","Filtre","Grave"],[k("Entr\xE9e",.6,[["fDrive",-.6,.2]]),k("Sortie",.4,[["vDrive",-.4,.45],["fxDrive",-.2,.4]]),k("Ouverture",.5,[["cutoff",-1.5,1.5]]),k("R\xE9sonance",.3,[["reso",-.2,.55]]),k("Sub",.5,[["subLevel",-.5,.5]]),k("Largeur",0,[["unison",0,2.4],["detune",0,18],["spread",0,.5]])],{name:"Distorsion",def:.4,map:[["vDrive",-.3,.45]]},{desc:"Scie satur\xE9e en deux \xE9tages"}),Ae("yoy","Yoy","formant",{formVowel:.2,formShift:-5,formQ:.6,formMix:.3,subLevel:.7,fType:4,glide:.07,lfoForm:0,lfoBeats:.5,aS:1,aR:.1},["Voyelle","Mouvement","Grain"],[k("Voyelle",.2,[["formVowel",-.2,.8]]),k("Gorge",.5,[["formShift",-6,6]]),k("Parole",.35,[["lfoForm",0,1]]),k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Saturation",.3,[["vDrive",0,.6]]),k("Sub",.7,[["subLevel",-.7,.3]])],{name:"Voyelle",def:.3,map:[["formVowel",-.2,.7]]},{desc:"Basse qui articule des voyelles (axe vertical)"}),Ae("stab","Stab","va",{osc1Wave:0,unison:5,detune:20,spread:.5,fType:0,cutoff:500,reso:.3,fEnv:3.5,fD:.1,aD:.22,aS:.05,aR:.08,dlMix:.12,dlBeats:.75},["Impact","Filtre","Espace"],[k("Longueur",.4,[["aD",-1,1.6],["fD",-.8,1.2]]),k("\xC9paisseur",.5,[["detune",-15,20],["unison",-3,2]]),k("Ouverture",.45,[["cutoff",-1.2,1.8]]),k("R\xE9sonance",.4,[["reso",-.25,.45]]),...Gt],{name:"Ouverture",def:.45,map:[["cutoff",-1,1.6]]},{desc:"Coup court et \xE9pais"}),Ae("marimba","Marimba grave","sampler",{fType:1,cutoff:6e3,aS:1,aR:.25,rvSend:.06},["Bois","Espace","Grain"],[k("Douceur",.2,[["cutoff",0,-2.5]]),k("Attaque",.5,[["smpStart",0,.06]]),k("\xC9cho",0,[["dlMix",0,.3]]),k("Salle",.15,[["rvSend",-.05,.3]]),k("Grain",0,[["fxDrive",0,.45]]),k("Sub",0,[["subLevel",0,.5]])],{name:"Douceur",def:.2,map:[["cutoff",0,-2]]},{desc:"Marimba enregistr\xE9 (VCSL) dans le grave",bank:"marimba"}),Ae("808montagem","808 montagem","va",{osc1Wave:3,fType:4,pEnvAmt:16,pEnvTime:.025,vDrive:.75,vDriveType:1,glide:.08,aD:1.2,aS:.5,aR:.15,fxDrive:.2,fxDriveType:1},["\xC9cr\xEAtage","Glisse","Queue"],[k("\xC9cr\xEAtage",.5,[["vDrive",-.4,.25]]),k("Mordant",.3,[["fxDrive",-.2,.5]]),k("Glisse",.45,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-12,10]]),k("Queue",.5,[["aD",-1.5,1.5]]),k("Tenue",.5,[["aS",-.45,.35]])],{name:"\xC9cr\xEAtage",def:.5,map:[["vDrive",-.3,.25]]},{style:"phonk",glideMode:"legato",desc:"808 tr\xE8s satur\xE9e qui glisse"}),Ae("speedgarage","Speed garage","va",{osc1Wave:0,unison:2,detune:12,spread:.2,fType:0,cutoff:450,reso:.3,lfoBeats:.5,lfoCut:1.2,subLevel:.7,glide:.05,aS:.9,aR:.08,vDrive:.2},["Oscillation","Filtre","Grave"],[k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Profondeur",.4,[["lfoCut",-1.2,1.5]]),k("Ouverture",.4,[["cutoff",-1,2]]),k("R\xE9sonance",.4,[["reso",-.25,.45]]),k("Sub",.7,[["subLevel",-.7,.3]]),k("Saturation",.3,[["vDrive",-.2,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{style:"ukg",desc:"Basse qui \xAB wobble \xBB pour le 2-step"}),Ae("afrorond","Afro rond","fm",{fmAlgo:0,fmR1:1,fmR2:2,fmL2:1.2,fmD2:.12,fmS2:.05,fmL3:0,fmL4:0,subLevel:.5,fType:1,cutoff:3e3,aD:.6,aS:.4,aR:.12,rvSend:.05},["Pincement","Corps","Espace"],[k("Pincement",.5,[["fmL2",-1,2],["fmD2",-.5,.8]]),k("Couleur",0,[["fmR2",0,1]]),k("Longueur",.4,[["aD",-1,1.5],["aS",-.3,.4]]),k("Sub",.5,[["subLevel",-.5,.5]]),...Gt],{name:"Pincement",def:.4,map:[["fmL2",-.8,1.8]]},{style:"afro",desc:"Ronde et bois\xE9e, laisse respirer les percussions"}),Ae("logdrum","Log drum","modal",{mdMat:3,mdDecay:.6,mdHard:.6,pEnvAmt:14,pEnvTime:.045,vDrive:.35,vDriveType:3,fType:4,aA:.001,aD:2,aS:1,aR:.25,subLevel:.25},["Glisse","Bois","Queue"],[k("Glisse",.5,[["pEnvAmt",-10,10]]),k("Vitesse",.5,[["pEnvTime",-1,1.2]]),k("Frappe",.5,[["mdHard",-.4,.4]]),k("Grain",.35,[["vDrive",-.3,.5]]),k("Queue",.5,[["mdDecay",-1.2,1.2]]),k("Sub",.25,[["subLevel",-.25,.5]])],{name:"Glisse",def:.5,map:[["pEnvAmt",-8,8]]},{style:"amapiano",desc:"Basse percussive qui chute, au c\u0153ur de l\u2019amapiano"}),Ae("subperreo","Sub perreo","va",{osc1Wave:3,osc2Wave:2,osc2Semi:12,osc2Level:.25,fType:4,pEnvAmt:4,pEnvTime:.02,vDrive:.25,aD:.5,aS:.7,aR:.1},["Rondeur","Punch","Espace"],[k("Pr\xE9sence",.3,[["osc2Level",-.25,.4]]),k("Chaleur",.3,[["vDrive",-.2,.45]]),k("Punch",.4,[["pEnvAmt",-4,12]]),k("Longueur",.5,[["aD",-1,1.5]]),...Gt],{name:"Pr\xE9sence",def:.3,map:[["osc2Level",-.2,.4]]},{style:"reggaeton",desc:"Sub lisible m\xEAme sur petit haut-parleur"}),Ae("bounce","Bounce","va",{osc1Wave:3,osc2Wave:1,osc2Level:.25,fType:1,cutoff:1400,pEnvAmt:24,pEnvTime:.015,aD:.18,aS:.3,aR:.06,vDrive:.3},["Rebond","Forme","Espace"],[k("Rebond",.5,[["pEnvAmt",-16,16],["pEnvTime",-.5,1]]),k("Longueur",.4,[["aD",-1,1.6],["aS",-.3,.5]]),k("Carr\xE9",.3,[["osc2Level",-.25,.6]]),k("Saturation",.3,[["vDrive",-.2,.5]]),...Gt],{name:"Rebond",def:.5,map:[["pEnvAmt",-12,12]]},{style:"jersey",desc:"Petit bond de hauteur \xE0 chaque note"}),Ae("turbine","Reese turbine","va",{osc1Wave:0,unison:7,detune:22,spread:.5,osc2Wave:0,osc2Semi:-12,osc2Level:.35,fType:0,cutoff:1100,reso:.15,fDrive:.4,lfoRate:.15,lfoCut:.6,subLevel:.7,chMix:.2,aS:1,aR:.15},["Turbine","Filtre","Largeur"],[k("D\xE9saccord",.45,[["detune",-15,28]]),k("Rotation",.4,[["lfoRate",-1.5,3],["lfoCut",-.5,1]]),k("Ouverture",.45,[["cutoff",-1.5,1.6]]),k("Mordant",.4,[["fDrive",-.4,.5]]),k("Largeur",.5,[["spread",-.5,.5],["chMix",-.2,.35]]),k("Sub",.7,[["subLevel",-.7,.3]])],{name:"Ouverture",def:.45,map:[["cutoff",-1.2,1.5]]},{style:"dnb",desc:"Sept scies qui tournent, sub s\xE9par\xE9"}),Ae("808rage","808 rage","va",{osc1Wave:3,osc2Wave:3,osc2Semi:12,osc2Level:.35,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.65,vDriveType:0,glide:.1,aD:2,aS:.55,aR:.2},["Saturation","Glisse","Queue"],[k("Saturation",.5,[["vDrive",-.4,.3]]),k("Octave",.35,[["osc2Level",-.35,.4]]),k("Glisse",.5,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-10,12]]),k("Queue",.5,[["aD",-1.5,1.2]]),k("Tenue",.5,[["aS",-.45,.35]])],{name:"Saturation",def:.5,map:[["vDrive",-.35,.3]]},{style:"rage",glideMode:"legato",desc:"808 large avec octave, pour le rage"}),Ae("acidedur","Acide dur","va",{osc1Wave:0,fType:0,cutoff:500,reso:.88,fEnv:4,fD:.14,velFilt:.7,glide:.06,aD:.22,aS:.7,aR:.05,vDrive:.4,fxDrive:.6,fxDriveType:2},["Filtre","Accent","Pli"],[k("Coupure",.4,[["cutoff",-1.5,2.2]]),k("R\xE9sonance",.8,[["reso",-.5,.1]]),k("Enveloppe",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.4,[["fD",-1.4,1.8]]),k("Pli",.5,[["fxDrive",-.5,.35]]),k("Saturation",.4,[["vDrive",-.35,.5]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{style:"hardtechno",desc:"Acide repli\xE9, tr\xE8s agressif"}),Ae("ronde","Basse ronde","va",{osc1Wave:2,subLevel:.6,fType:1,cutoff:500,aA:.015,aS:.6,aR:.18,vDrive:.35,vDriveType:3,glide:.1,dlMix:.15,dlBeats:.75,dlFb:.35,rvSend:.08,aD:.8},["Rondeur","Dub","Usure"],[k("Ouverture",.4,[["cutoff",-1,1.6],["vDrive",-.1,.25]]),k("Chaleur",.3,[["vDrive",-.2,.45]]),k("\xC9cho",.3,[["dlMix",-.15,.3],["dlFb",0,.35]]),k("Salle",.2,[["rvSend",-.08,.25]]),k("Bande",0,[["vibDepth",0,.15],["vibRate",0,-1.5]]),k("Usure",0,[["fxCrush",0,.35]])],{name:"Ouverture",def:.4,map:[["cutoff",-.8,1.4]]},{style:"triphop",desc:"Basse dub ronde avec \xE9cho"})];var pt=(i,e,t,s,a,o,r,n={})=>({id:"lead."+i,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||6,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.12,aR:.25,...s},groups:a,macros:o,expr:r,trim:n.trim||0}),z=(i,e,t)=>({name:i,def:e,map:t}),lt=[z("\xC9cho",.2,[["dlMix",-.15,.35],["dlFb",-.1,.3]]),z("Salle",.3,[["rvSend",-.1,.4]])],gi=z("Bande",0,[["vibDepth",0,.32],["vibRate",0,-1.8],["vibDelay",0,-3],["fxLP",0,-2.2],["fxCrush",0,.12]]),wt=(i,e,t,s,a,o={})=>pt(i,e,"sampler",{fType:1,cutoff:9e3,reso:.05,aA:.001,aD:2,aS:1,aR:.35,...s},o.groups||["Toucher","Couleur","Espace"],o.macros||[z("Douceur",.15,[["cutoff",0,-3],["level",0,4]]),z("Attaque",0,[["smpStart",0,.08],["aA",0,7.5]]),z("Chorus",.1,[["chMix",-.1,.5]]),gi,...lt],o.expr||{name:"Douceur",def:.2,map:[["cutoff",.5,-2.5],["level",-.5,3]]},{bank:t,desc:a,...o}),bi=[pt("supersaw","Supersaw","va",{osc1Wave:0,unison:7,detune:28,spread:.9,fType:1,cutoff:6e3,reso:.1,fEnv:1,fD:.5,aA:.005,aD:.6,aS:.75,aR:.35,chMix:.25,dlMix:.15,dlBeats:.75,rvSend:.2},["Essaim","Filtre","Espace"],[z("D\xE9saccord",.5,[["detune",-20,25]]),z("Largeur",.6,[["spread",-.6,.1],["width",-.5,.4]]),z("Ouverture",.5,[["cutoff",-2.2,1.2]]),z("Mordant",.3,[["fEnv",-1,3],["fD",-.8,.6]]),...lt],{name:"Ouverture",def:.5,map:[["cutoff",-1.8,1]]},{desc:"Sept scies d\xE9saccord\xE9es, large et brillant"}),pt("pluck","Pluck","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,osc2Semi:12,fType:0,cutoff:900,reso:.25,fEnv:4,fD:.14,aA:.001,aD:.3,aS:0,aR:.2,dlMix:.25,dlBeats:.75,rvSend:.15},["Pincement","Filtre","Espace"],[z("Longueur",.4,[["aD",-1,1.8],["fD",-.8,1.5]]),z("Octave",.5,[["osc2Level",-.5,.5]]),z("Brillance",.5,[["cutoff",-1.5,1.8],["fEnv",-1,1]]),z("R\xE9sonance",.3,[["reso",-.2,.5]]),...lt],{name:"Brillance",def:.5,map:[["cutoff",-1.2,1.6]]},{desc:"Pincement synth\xE9tique avec \xE9cho point\xE9"}),wt("piano","Piano","piano",{rvSend:.15},"Piano droit enregistr\xE9 (VCSL)"),pt("rhodes","Rhodes FM","fm",{fmAlgo:1,fmR1:1,fmR2:1,fmL2:1.1,fmD2:.9,fmS2:.15,fmR3:1,fmL3:1.4,fmD3:1.5,fmS3:.3,fmR4:14,fmL4:1.6,fmD4:.06,fmS4:0,fmDetune:4,aA:.002,aD:2.5,aS:.4,aR:.4,chMix:.35,chRate:.6,lfoAmp:.12,lfoRate:4.5,rvSend:.15},["Lames","Corps","Espace"],[z("Lame",.45,[["fmL4",-1.4,2]]),z("Cloche",.4,[["fmD4",-1,2]]),z("Grain",.4,[["fmL2",-.9,1.6]]),z("Tr\xE9molo",.3,[["lfoAmp",-.12,.45],["lfoRate",-.6,.6]]),...lt],{name:"Toucher",def:.5,map:[["fmL2",-.6,1],["fmL4",-.8,.8]]},{desc:"Piano \xE9lectrique FM avec tr\xE9molo et chorus"}),wt("marimba","Marimba","marimba",{rvSend:.12,dlMix:.08},"Marimba en bois (VCSL)"),wt("vibraphone","Vibraphone","vibes",{lfoAmp:.3,lfoRate:5.5,rvSend:.2},"Vibraphone, moteur de tr\xE9molo r\xE9glable",{macros:[z("Douceur",.1,[["cutoff",0,-3]]),z("Moteur",.5,[["lfoAmp",-.3,.4],["lfoRate",-1.5,1]]),z("Chorus",0,[["chMix",0,.5]]),gi,...lt]}),wt("kalimba","Kalimba","kalimba",{rvSend:.15,dlMix:.12,dlBeats:.75},"Piano \xE0 pouces du Kenya (VCSL)"),pt("verre","Cloche de verre","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:3,fmD2:2,fmS2:.1,fmR3:7,fmL3:.5,fmD3:.4,fmS3:0,fmL4:0,aA:.001,aD:3,aS:0,aR:1.2,chMix:.2,rvSend:.3},["M\xE9tal","Dur\xE9e","Espace"],[z("Rapport",.5,[["fmR2",-1.5,1.5]]),z("\xC9clat",.5,[["fmL2",-2,3],["fmL3",-.5,1.5]]),z("Dur\xE9e",.5,[["aD",-1.5,1.2],["fmD2",-1.5,1]]),z("Scintillement",0,[["fmDetune",0,12],["chMix",0,.4]]),...lt],{name:"\xC9clat",def:.5,map:[["fmL2",-1.5,2.5]]},{desc:"Cloche FM cristalline, longue r\xE9sonance"}),pt("orgue","Orgue","wt",{wtTable:4,wtPos:.55,fType:4,aA:.002,aS:1,aR:.08,chMix:.45,chRate:.8,chDepth:.6,subLevel:.15,rvSend:.12},["Tirettes","Rotation","Saturation"],[z("Tirettes",.55,[["wtPos",-.55,.45]]),z("16 pieds",.15,[["subLevel",-.15,.6]]),z("Vitesse",.3,[["chRate",-.6,3]]),z("Profondeur",.6,[["chMix",-.45,.4],["chDepth",-.3,.4]]),z("Saturation",.1,[["fxDrive",0,.55]]),z("Salle",.25,[["rvSend",-.1,.35]])],{name:"Tirettes",def:.5,map:[["wtPos",-.4,.4]]},{desc:"Orgue \xE0 tirettes et cabine tournante"}),pt("nappe","Nappe chaude","wt",{wtTable:6,wtPos:.4,unison:3,detune:14,spread:.8,fType:1,cutoff:2500,aA:.6,aD:1,aS:.9,aR:1.2,lfoWt:.2,lfoRate:.15,chMix:.4,rvSend:.35},["Mati\xE8re","Souffle","Espace"],[z("Mati\xE8re",.4,[["wtPos",-.4,.6]]),z("Mouvement",.3,[["lfoWt",-.2,.6],["lfoRate",-1,2]]),z("Attaque",.4,[["aA",-2.5,1.5]]),z("Ouverture",.5,[["cutoff",-1.5,1.5]]),...lt],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Nappe douce qui respire",poly:6}),pt("voix","Voix","formant",{formVowel:0,formShift:0,formQ:.55,formMix:.25,vibDepth:.22,vibRate:5.2,vibDelay:.35,aA:.04,aS:.9,aR:.3,chMix:.2,rvSend:.2},["Voyelle","Gorge","Espace"],[z("Voyelle",0,[["formVowel",0,1]]),z("Parole",0,[["lfoForm",0,.8],["lfoBeats",0,1]]),z("Gorge",.5,[["formShift",-7,7]]),z("Vibrato",.5,[["vibDepth",-.22,.3]]),...lt],{name:"Voyelle",def:.2,map:[["formVowel",-.2,.8]]},{desc:"Synth\xE8se de voyelles, ch\u0153ur artificiel",poly:4}),wt("ocarina","Ocarina","ocarina",{vibDepth:.08,vibDelay:.4,rvSend:.18},"Ocarina souffl\xE9 (VCSL)",{poly:3}),wt("saxo","Saxophone","sax",{vibDepth:.12,vibRate:5,vibDelay:.45,cutoff:7e3,rvSend:.15},"Saxophone t\xE9nor enregistr\xE9 (VCSL)",{poly:2,macros:[z("Souffle",.2,[["cutoff",0,-2.5],["noiseLevel",0,.06]]),z("Vibrato",.4,[["vibDepth",-.12,.25],["vibDelay",0,-2]]),z("Grain",0,[["fxDrive",0,.45]]),gi,...lt]}),wt("harmonica","Harmonica","harmonica",{vibDepth:.05,rvSend:.12},"Harmonica diatonique (VCSL)",{poly:4}),pt("guitare","Guitare pinc\xE9e","pluck",{pkBright:.7,pkDamp:.35,pkDecay:2.5,pkBody:.4,fType:4,aS:1,aR:.3,chMix:.15,dlMix:.12,rvSend:.15},["Corde","Caisse","Espace"],[z("Attaque",.6,[["pkBright",-.5,.3]]),z("Sustain",.5,[["pkDecay",-1.5,1.5],["pkDamp",.2,-.25]]),z("Caisse",.4,[["pkBody",-.4,.5]]),z("Chorus",.3,[["chMix",-.15,.4]]),...lt],{name:"Attaque",def:.5,map:[["pkBright",-.4,.3]]},{desc:"Corde pinc\xE9e physique, nylon ou acier"}),wt("harpe","Harpe","harp",{rvSend:.22},"Harpe de concert (VCSL)"),pt("chip","Chiptune","va",{osc1Wave:4,osc1PW:.25,fType:4,vibDepth:.25,vibRate:6.5,vibDelay:.15,lfoPW:0,aA:.001,aD:.2,aS:.7,aR:.08,dlMix:.1,dlBeats:.5,rvSend:.05},["Onde","Vibrato","Espace"],[z("Largeur",.5,[["osc1PW",-.2,.25]]),z("Balayage",0,[["lfoPW",0,.22],["lfoRate",0,1]]),z("Vibrato",.4,[["vibDepth",-.25,.4]]),z("Arp\xE8ge",0,[["pEnvAmt",0,12],["pEnvTime",0,-1]]),...lt],{name:"Largeur",def:.5,map:[["osc1PW",-.2,.2]]},{desc:"Onde carr\xE9e de console 8 bits",poly:3}),pt("sync","Sync","wt",{wtTable:7,wtPos:.3,wtEnv:.4,fEnv:0,fA:.002,fD:.35,fS:.2,unison:2,detune:8,spread:.6,fType:4,vDrive:.3,glide:.06,aS:.85,aR:.15,dlMix:.15,rvSend:.12},["Synchro","Mouvement","Espace"],[z("Synchro",.3,[["wtPos",-.3,.6]]),z("Balayage",.5,[["wtEnv",-.4,.5],["fD",-1,1]]),z("Vibration",0,[["lfoWt",0,.5],["lfoRate",0,1.5]]),z("Saturation",.3,[["vDrive",-.3,.5]]),...lt],{name:"Synchro",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Lead synchronis\xE9 mordant, glisse sur les liaisons",poly:1}),pt("cordes","Cordes synth\xE9","va",{osc1Wave:0,unison:5,detune:14,spread:.7,osc2Wave:0,osc2Semi:12,osc2Level:.3,fType:1,cutoff:3500,aA:.35,aD:1,aS:.9,aR:.9,vibDepth:.08,vibDelay:.5,chMix:.35,rvSend:.3},["Archet","Ensemble","Espace"],[z("Attaque",.4,[["aA",-2.5,1.5]]),z("Ouverture",.5,[["cutoff",-1.5,1.4]]),z("Ensemble",.5,[["detune",-10,16],["chMix",-.25,.4]]),z("Octave",.3,[["osc2Level",-.3,.5]]),...lt],{name:"Ouverture",def:.5,map:[["cutoff",-1.4,1.2]]},{desc:"Ensemble de cordes analogique"}),wt("glock","Glockenspiel","glock",{rvSend:.2,dlMix:.1},"Lames de m\xE9tal brillantes (VCSL)"),pt("sino","Sino montagem","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:2.2,fmD2:.35,fmS2:.1,fmR3:1.5,fmL3:.8,fmD3:.2,fmS3:0,aA:.001,aD:.8,aS:.2,aR:.3,fxDrive:.5,fxDriveType:1,dlMix:.2,dlBeats:.5,rvSend:.1},["M\xE9tal","\xC9cr\xEAtage","Espace"],[z("Rapport",.5,[["fmR2",-1.5,1.5]]),z("\xC9clat",.5,[["fmL2",-1.5,2.5]]),z("\xC9cr\xEAtage",.5,[["fxDrive",-.45,.4]]),z("Longueur",.4,[["aD",-1,1.5],["aS",-.2,.5]]),...lt],{name:"\xC9clat",def:.5,map:[["fmL2",-1.2,2]]},{style:"phonk",desc:"Cloche m\xE9tallique satur\xE9e, m\xE9lodies de montagem"}),wt("stabgarage","Stab garage","clavi",{cutoff:7e3,chMix:.3,dlMix:.18,dlBeats:.75,rvSend:.12,aR:.15},"Clavisynth TX81Z enregistr\xE9, accords courts",{style:"ukg"}),wt("balafon","Balafon afro","balafon",{dlMix:.2,dlBeats:.75,rvSend:.2},"Balafon (xylophone ouest-africain) avec \xE9cho",{style:"afro"}),wt("keys","Keys amapiano","fmpiano",{cutoff:5e3,chMix:.45,chRate:.5,dlMix:.18,dlBeats:.75,rvSend:.25},"Piano FM TX81Z enregistr\xE9, chorus et \xE9cho",{style:"amapiano"}),wt("perreo","Pluck perreo","dantranh",{fxDrive:.15,dlMix:.15,dlBeats:.5,rvSend:.12},"Cithare \u0111\xE0n tranh enregistr\xE9e (VCSL), en pincements",{style:"reggaeton"}),pt("stabjersey","Stab jersey","va",{osc1Wave:0,unison:5,detune:24,spread:.8,osc2Wave:1,osc2Semi:12,osc2Level:.35,fType:1,cutoff:5e3,fEnv:2,fD:.12,pEnvAmt:2,pEnvTime:.02,aA:.001,aD:.18,aS:.1,aR:.12,rvSend:.15},["Impact","Filtre","Espace"],[z("Longueur",.4,[["aD",-1,1.8],["aS",-.1,.5]]),z("Hoquet",.4,[["pEnvAmt",-2,10]]),z("Brillance",.5,[["cutoff",-1.8,1.2]]),z("\xC9paisseur",.5,[["detune",-18,20],["osc2Level",-.35,.4]]),...lt],{name:"Brillance",def:.5,map:[["cutoff",-1.5,1.2]]},{style:"jersey",desc:"Stab brillant pour les rafales"}),pt("liquide","Pad liquide","wt",{wtTable:10,wtPos:.6,unison:4,detune:10,spread:.8,fType:1,cutoff:2200,lfoCut:.6,lfoBeats:4,aA:.25,aD:1,aS:.85,aR:1.5,chMix:.35,dlMix:.15,rvSend:.45},["Mati\xE8re","Mar\xE9e","Espace"],[z("Mati\xE8re",.5,[["wtPos",-.5,.4]]),z("Ouverture",.5,[["cutoff",-1.5,1.5]]),z("Mar\xE9e",.4,[["lfoCut",-.6,1.2]]),z("Attaque",.4,[["aA",-2,1.5]]),...lt],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.4]]},{style:"dnb",desc:"Nappe douce et mouvante pour le liquid"}),pt("rage","Lead rage","va",{osc1Wave:0,unison:7,detune:32,spread:1,osc2Wave:4,osc2PW:.2,osc2Level:.4,fType:1,cutoff:7e3,pEnvAmt:-3,pEnvTime:.08,vDrive:.3,aA:.003,aD:.5,aS:.65,aR:.25,dlMix:.2,dlBeats:.5,rvSend:.18},["Essaim","Plong\xE9e","Espace"],[z("D\xE9saccord",.5,[["detune",-20,20]]),z("Saturation",.3,[["vDrive",-.3,.5]]),z("Plong\xE9e",.5,[["pEnvAmt",3,-9],["pEnvTime",-.6,1]]),z("Brillance",.6,[["cutoff",-2,.6]]),...lt],{name:"Brillance",def:.6,map:[["cutoff",-1.8,.6]]},{style:"rage",desc:"Lead large et satur\xE9 qui plonge"}),pt("hurleur","Hurleur","va",{osc1Wave:0,osc2Wave:0,osc2Fine:12,osc2Level:.8,fType:0,cutoff:1200,reso:.75,fEnv:2,fD:.4,vDrive:.6,fxDrive:.3,fxDriveType:2,glide:.08,lfoRate:6,lfoCut:0,aS:1,aR:.12,dlMix:.12,rvSend:.15},["Cri","Filtre","Espace"],[z("Saturation",.5,[["vDrive",-.4,.35],["fxDrive",-.25,.4]]),z("Hurlement",0,[["lfoCut",0,1.5],["lfoRate",-1,1]]),z("Coupure",.5,[["cutoff",-1.5,2]]),z("R\xE9sonance",.7,[["reso",-.4,.2]]),...lt],{name:"Coupure",def:.5,map:[["cutoff",-1.2,1.8]]},{style:"hardtechno",desc:"Lead r\xE9sonant et repli\xE9, glisse",poly:1}),wt("brume","Cloches brumeuses","chimes",{cutoff:4e3,vibDepth:.1,vibRate:.9,vibDelay:.01,fxCrush:.15,chMix:.3,rvSend:.45,dlMix:.15,dlBeats:1.5},"Cloches \xE0 main, bande us\xE9e et grande salle",{style:"triphop"})];var xt=(i,e,t,s,a,o,r)=>({id:i,name:e,style:t,kit:s.map((n,l)=>["kick.","snare.","hat.","perc."][l]+n),rhythm:a,bass:o&&"bass."+o,lead:r&&"lead."+r}),qt=[xt("studio","Studio",null,["club","classique","analogique","conga"],[1,1,1,3],"moog","pluck"),xt("acoustique","Acoustique",null,["acoustique","acoustique","acoustique","toms"],[2,1,1,11],"contrebasse","piano"),xt("organique","Organique",null,["cajon","mains","shaker","darbuka"],[3,1,2,1],"contrebasse","kalimba"),xt("analogique","Analogique",null,["909","clap808","analogique","cloche808"],[1,1,3,8],"acide","supersaw"),xt("lofi","Lo-fi",null,["vinyle","lofi","lofi","bloc"],[2,1,1,12],"doux","rhodes"),xt("phonk","Phonk BR","phonk",["montagem","clapmontagem","drift","clochephonk"],[7,1,2,6],"808montagem","sino"),xt("ukg","UK garage","ukg",["garage","garage","garage","toc"],[3,4,4,13],"speedgarage","stabgarage"),xt("afro","Afro house","afro",["afroprofond","clapafro","shakerafro","djembe"],[1,9,9,7],"afrorond","balafon"),xt("amapiano","Amapiano","amapiano",["pianofeutre","rimpiano","shakerpiano","logdrum"],[9,9,4,9],"logdrum","keys"),xt("reggaeton","Perreo","reggaeton",["perreo","dembow","perreo","timbal"],[16,3,1,3],"subperreo","perreo"),xt("jersey","Jersey club","jersey",["jersey","clapjersey","jersey","couinement"],[6,6,2,12],"bounce","stabjersey"),xt("dnb","Drum & bass","dnb",["break","dnb","ridednb","tombreak"],[5,5,1,15],"turbine","liquide"),xt("rage","Rage","rage",["808rage","claprage","trap","laser"],[4,7,6,12],"808rage","rage"),xt("hardtechno","Hard techno","hardtechno",["rumble","industriel","industriel","metalindus"],[10,1,3,8],"acidedur","hurleur"),xt("triphop","Trip-hop","triphop",["poussiere","poussiere","vinyle","boisfeutre"],[12,2,1,11],"ronde","brume")];var ps=[{id:"phonk",name:"Phonk BR \xB7 montagem",short:"Phonk BR",bpm:130,key:1,scale:"phrygian"},{id:"ukg",name:"UK garage",short:"UKG",bpm:134,key:5,scale:"minor"},{id:"afro",name:"Afro house",short:"Afro",bpm:122,key:9,scale:"minor"},{id:"amapiano",name:"Amapiano",short:"Amapiano",bpm:112,key:2,scale:"dorian"},{id:"reggaeton",name:"Reggaeton nouvelle vague",short:"Perreo",bpm:96,key:4,scale:"minor"},{id:"jersey",name:"Jersey club",short:"Jersey",bpm:142,key:7,scale:"minor"},{id:"dnb",name:"Drum & bass",short:"DnB",bpm:174,key:5,scale:"minor"},{id:"rage",name:"Rage \xB7 trap",short:"Rage",bpm:150,key:1,scale:"harmonic"},{id:"hardtechno",name:"Hard techno",short:"Hard",bpm:152,key:9,scale:"phrygian"},{id:"triphop",name:"Trip-hop atmosph\xE9rique",short:"Trip-hop",bpm:86,key:0,scale:"dorian"}];function Ct(i){return ps.find(e=>e.id===i)||null}var Ao={"kick.rond":1.7,"kick.club":3.2,"kick.profond":.9,"kick.808":-.8,"kick.feutre":2.9,"kick.acoustique":-6.4,"kick.sec":.7,"kick.concert":-7.3,"kick.sature":6.2,"kick.rebond":-.1,"kick.sub":3.5,"kick.clic":1.4,"kick.vinyle":-2.6,"kick.909":-.1,"kick.boom":1.1,"kick.papier":1.8,"kick.plie":3.1,"kick.cajon":-7.1,"kick.cadre":-8,"kick.tom":-6,"kick.montagem":2.8,"kick.garage":2.6,"kick.afroprofond":2.4,"kick.pianofeutre":2.5,"kick.perreo":4.1,"kick.jersey":4.4,"kick.break":1.5,"kick.808rage":-.3,"kick.rumble":5.9,"kick.poussiere":.4,"snare.classique":-1.4,"snare.clap808":.8,"snare.rim":6.2,"snare.acoustique":-12.3,"snare.sanstimbre":-11.5,"snare.fantome":2.5,"snare.crepitant":-3.3,"snare.clapserre":.5,"snare.claplarge":-2.8,"snare.doigts":1.1,"snare.mains":-12.6,"snare.lofi":-.5,"snare.metal":-5.7,"snare.tomsnare":-2.9,"snare.balai":-.2,"snare.electro":-2.8,"snare.snareclap":-8.3,"snare.ressort":-7.1,"snare.roulement":-11.5,"snare.crossstick":-12.7,"snare.clapmontagem":-1.9,"snare.garage":-4.5,"snare.clapafro":-.7,"snare.rimpiano":-7.2,"snare.dembow":.5,"snare.clapjersey":-11.2,"snare.dnb":-10.8,"snare.claprage":-3.3,"snare.industriel":-4,"snare.poussiere":-9.6,"hat.analogique":4.9,"hat.bruit":-2.7,"hat.acoustique":-17.6,"hat.ride":-19.8,"hat.crash":-18.2,"hat.fin":3.1,"hat.sombre":.3,"hat.brillant":-1.6,"hat.lofi":5.2,"hat.tss":-8.9,"hat.shaker":-18.7,"hat.tambourin":-17.9,"hat.triangle":-20.2,"hat.cabasa":-15.6,"hat.charleston2":-17.5,"hat.clochette":-2.5,"hat.grain":-6.3,"hat.large":-4.9,"hat.pichenette":-19.1,"hat.pedale":3.6,"hat.drift":-.1,"hat.garage":1.9,"hat.shakerafro":-15.5,"hat.shakerpiano":-10.6,"hat.perreo":3.2,"hat.jersey":-.3,"hat.ridednb":-11.9,"hat.trap":6.4,"hat.industriel":-10.8,"hat.vinyle":-13.3,"perc.conga":-14.9,"perc.bongo":-15.5,"perc.cloche":-15.8,"perc.cloche808":-4.2,"perc.agogo":-17.5,"perc.claves":-17,"perc.bloc":-16.9,"perc.guiro":-16.4,"perc.timbales":-15.2,"perc.cuica":-15.9,"perc.darbuka":-15.4,"perc.cajon":-13.6,"perc.fente":-14.7,"perc.toms":-15,"perc.goutte":10.4,"perc.boisynth":12.5,"perc.tom808":-13.9,"perc.vibraslap":-16.3,"perc.enclume":-17.6,"perc.blip":6.5,"perc.clochephonk":-4.3,"perc.toc":9.2,"perc.djembe":-8.1,"perc.logdrum":-10.8,"perc.timbal":-7.2,"perc.couinement":3.1,"perc.tombreak":-7.6,"perc.laser":7,"perc.metalindus":-9.6,"perc.boisfeutre":-12.3,"bass.sub":-8.5,"bass.moog":-7.8,"bass.acide":-3.3,"bass.reese":-8.5,"bass.808":-4.6,"bass.fm":-8.6,"bass.pluck":4.1,"bass.orgue":-6.8,"bass.contrebasse":1.1,"bass.electrique":-.4,"bass.wobble":-5,"bass.hoover":-9.7,"bass.carre":-11.2,"bass.grondement":-7.1,"bass.doux":-8.2,"bass.pulse":-6.1,"bass.saturee":-12.3,"bass.yoy":-6.3,"bass.stab":.3,"bass.marimba":-10.2,"bass.808montagem":-4,"bass.speedgarage":-7.8,"bass.afrorond":-6.6,"bass.logdrum":-4.3,"bass.subperreo":-6.3,"bass.bounce":-.2,"bass.turbine":-7.9,"bass.808rage":-.3,"bass.acidedur":-11.2,"bass.ronde":-4.7,"lead.supersaw":-14.5,"lead.pluck":-5,"lead.piano":-17.4,"lead.rhodes":-11.9,"lead.marimba":-16.4,"lead.vibraphone":-15.9,"lead.kalimba":-17.3,"lead.verre":-8.9,"lead.orgue":-12.4,"lead.nappe":-16.9,"lead.voix":-9,"lead.ocarina":-16.9,"lead.saxo":-15.9,"lead.harmonica":-16.1,"lead.guitare":-7.6,"lead.harpe":-16.9,"lead.chip":-18.2,"lead.sync":-8.9,"lead.cordes":-15.7,"lead.glock":-17.7,"lead.sino":-18.3,"lead.stabgarage":-15.7,"lead.balafon":-15.6,"lead.keys":-17.1,"lead.perreo":-18.2,"lead.stabjersey":-8,"lead.liquide":-14.9,"lead.rage":-12.1,"lead.hurleur":-15.4,"lead.brume":-17.4};var yi=[{id:"kick",name:"Kick",list:wo},{id:"snare",name:"Snare \xB7 clap",list:So},{id:"hat",name:"Hat",list:Lo},{id:"perc",name:"Perc",list:Ro},{id:"bass",name:"Basse",list:vi},{id:"lead",name:"M\xE9lodie",list:bi}],ms=["kick","snare","hat","perc"],xi=new Map;for(let i of yi)for(let e of i.list){if(xi.has(e.id))throw new Error("duplicate preset id "+e.id);e.family=i.id,e.trim=(e.trim||0)+(Ao[e.id]||0),xi.set(e.id,e)}function qe(i){return xi.get(i)||null}function Ot(i){return(yi.find(e=>e.id===i)||yi[0]).list}function Eo(i){return qt.find(e=>e.id===i)||null}var _s={kit:qt[0].kit,bass:vi[0].id,lead:bi[0].id};function _o(i){return i?i.bank?[i.bank]:i.samples&&i.samples.length?["drums"]:[]:[]}var a0={bass:[28,47],lead:[48,67]},i0=48;function Ds(i,e=Math.random,t){let s=i.length>1&&t!==void 0?i.filter(a=>a!==t):i;return s[Math.floor(e()*s.length)%s.length]}function o0(i,e,t){let[s,a]=a0[i],o=[];for(let r=-4;r<=4;r++){let n=i0+t+e.lo+12*r;n>=s&&n<=a&&o.push(r)}return o.length?o:[0]}function ki(i,e="all",t=Math.random){let s={kit:null,bass:null,lead:null},a=i;(e==="all"||e==="drum")&&(s.kit=ms.map((o,r)=>Ds(Ot(o),t,void 0).id),s.kit.every((o,r)=>o===a.parts.drum.kit[r])&&(s.kit[0]=Ds(Ot("kick"),t,Ot("kick").find(o=>o.id===s.kit[0])).id));for(let o of["bass","lead"]){if(e!=="all"&&e!==o)continue;let r=Ot(o),n=r.find(c=>c.id===a.parts[o].preset),l=Ds(r,t,n).id,d=Ds(o0(o,a.parts[o].range,a.key),t);s[o]={preset:l,oct:d}}return s}function Do(i){return[...i.kit||[],i.bass&&i.bass.preset,i.lead&&i.lead.preset].filter(Boolean)}function wi(i,e){let t=i;e.kit&&(t.parts.drum.kit=e.kit.slice(),t.parts.drum.macros=[null,null,null,null]);for(let s of["bass","lead"]){let a=e[s];if(!a)continue;let o=t.parts[s];if(o.preset=a.preset,o.macros=null,a.oct){o.range={lo:o.range.lo+12*a.oct,n:o.range.n};for(let r of t.patterns){for(let n of r[s].notes)n.deg+=7*a.oct;if(r.gest&&r.gest[s])for(let n of r.gest[s])for(let l of n.p)l[3]+=7*a.oct}}}return t}function Po(i=Math.random){let e=Ds(ps,i),t=Ds(qt,i),s=Zt({tempo:e.bpm,key:Math.floor(i()*12)%12,scale:e.scale,name:"Id\xE9e au hasard"});return s.parts.drum.kit=t.kit.slice(),s.parts.drum.rhythm=t.rhythm.slice(),s.parts.bass.preset=Ot("bass")[0].id,s.parts.lead.preset=Ot("lead")[0].id,wi(s,ki(s,"all",i)),s}var Sa=ft.storage+".",r0={metro:!1,metroAlways:!1,metroLevel:0,piano:!1,ghosts:!0,fluid:!0,fluidZone:"keys",fluidStyle:"spectaculaire",fluidColors:"partie",fluidInk:"libre",glass:ft.fluid,fluidHdr:"intense",fluidEngine:"auto",glassTilt:!1,glassSpill:!0,glassLight:"forte",mixGlass:ft.fluid,ctrlHeight:6,lightLook:"aquarelle",hdrLight:!0,glassLook:"optique",...ft.fluid?{hwCast:[0,3,2,1],hwRelay:!1}:{}},n0=60,Ta=class{constructor(){this.project=null,this.ui={part:"lead",view:"pattern",lane:0,group:0,erase:!1,playing:!1,armed:!1,tick:-1,sel:null,section:0,browse:null},this.listeners=new Map,this.undoStack=[],this.redoStack=[],this.saveTimer=null,this.dirty=!1,this.engine=null,this.lastSaved=0,this.settings={...r0};try{Object.assign(this.settings,JSON.parse(localStorage.getItem(Sa+"settings")||"{}"))}catch{}this.diceMark=null}setSetting(e,t){this.settings[e]=t;try{localStorage.setItem(Sa+"settings",JSON.stringify(this.settings))}catch{}e.startsWith("metro")&&this.send(...this.metroMessages()),this.changed("settings:"+e)}metroMessages(){let e=this.settings;return[{type:"batch",list:[{type:"set",key:"metro",value:e.metro?e.metroAlways?2:1:0},{type:"set",key:"metroLevel",value:e.metroLevel}]}]}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.listeners.get(e).delete(t)}emit(e,t){let s=this.listeners.get(e);if(s)for(let a of s)a(t)}changed(e){this.emit("change",e)}async init(){let e=null;try{let t=localStorage.getItem(Sa+"last");t&&(e=await vt.get("projects",t))}catch{}if(e)try{e=os(e)}catch{e=null}return e||(e=this.starterProject()),this.project=e,this.ensurePresets(),lo(),e}starterProject(e){let t=e&&qt.find(o=>o.style===e)||qt[0],s=Ct(t.style),a=Zt({kit:t.kit.slice(),bass:t.bass||_s.bass,lead:t.lead||_s.lead,tempo:s?s.bpm:118,key:s?s.key:2,scale:s?s.scale:"minor",name:s?"Id\xE9e "+s.short:"Nouvelle id\xE9e"});return a.parts.drum.rhythm=t.rhythm.slice(),a}ensurePresets(){let e=this.project,t=e.parts.drum;for(let s=0;s<4;s++)(!t.kit[s]||!qe(t.kit[s]))&&(t.kit[s]=_s.kit[s]);(!e.parts.bass.preset||!qe(e.parts.bass.preset))&&(e.parts.bass.preset=_s.bass),(!e.parts.lead.preset||!qe(e.parts.lead.preset))&&(e.parts.lead.preset=_s.lead)}scheduleSave(){this.dirty=!0,clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.save(),700)}async save(){if(clearTimeout(this.saveTimer),!!this.project){this.project.updated=Date.now();try{await vt.put("projects",JSON.parse(JSON.stringify(this.project))),localStorage.setItem(Sa+"last",this.project.id),this.dirty=!1,this.lastSaved=Date.now(),this.emit("saved",this.lastSaved)}catch(e){this.emit("error","Sauvegarde impossible : "+(e&&e.message||e))}}}async listProjects(){return(await vt.all("projects")).sort((t,s)=>(s.updated||0)-(t.updated||0))}async openProject(e){await this.save();let t=await vt.get("projects",e);if(!t)throw new Error("Projet introuvable");this.loadProject(os(t))}loadProject(e){this.project=e,this.ensurePresets(),this.undoStack=[],this.redoStack=[],this.ui.sel=null,this.syncAll(),this.changed("project"),this.scheduleSave()}async newProject(e){await this.save(),this.loadProject(this.starterProject(e))}planRandom(e){return ki(this.project,e)}applyRandom(e){let t=this.undoStack[this.undoStack.length-1];(!t||t!==this.diceMark)&&this.snapshot(),wi(this.project,e),this.syncAll(),this.changed("project"),this.scheduleSave(),this.diceMark=this.undoStack[this.undoStack.length-1]}planRandomProject(){return Po()}async duplicateProject(){await this.save();let e=JSON.parse(JSON.stringify(this.project));e.id=fs(),e.name=this.project.name+" (copie)",e.created=e.updated=Date.now(),this.loadProject(e)}async deleteProject(e){if(await vt.del("projects",e),this.project&&this.project.id===e){let t=await this.listProjects();t.length?this.loadProject(os(t[0])):this.loadProject(this.starterProject())}}rename(e){this.project.name=e.slice(0,80)||"Sans titre",this.changed("name"),this.scheduleSave()}snapshot(){this.undoStack.push(JSON.stringify(this.project)),this.undoStack.length>n0&&this.undoStack.shift(),this.redoStack.length=0,this.changed("undo")}undo(){return this.undoStack.length?(this.redoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.undoStack.pop())),!0):!1}redo(){return this.redoStack.length?(this.undoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.redoStack.pop())),!0):!1}restore(e){let t=this.ui.playing;this.project=e,this.syncAll(!0),this.changed("project"),this.changed("undo"),this.scheduleSave()}send(e){this.engine&&this.engine.send(e)}presetMessage(e,t){let s=this.project;if(e==="drum"){let a=qe(s.parts.drum.kit[t]);return{type:"preset",part:e,lane:t,preset:a,macros:s.parts.drum.macros[t]}}return{type:"preset",part:e,preset:qe(s.parts[e].preset),macros:s.parts[e].macros}}engineState(){let e=[];for(let t=0;t<4;t++)e.push(this.presetMessage("drum",t));return e.push(this.presetMessage("bass")),e.push(this.presetMessage("lead")),e.push({type:"project",project:this.project}),e.push({type:"erase",on:this.ui.erase}),e.push(...this.metroMessages()[0].list),e}syncAll(){this.engine&&this.engine.send({type:"batch",list:this.engineState()})}onEngine(e){let t=this.project;switch(e.type){case"pos":this.ui.tick=e.tick,this.emit("pos",e);break;case"state":this.ui.playing=e.playing,this.ui.armed=e.armed,this.changed("transport");break;case"takeStart":this.snapshot();break;case"autoStart":this.snapshot();break;case"take":{let s=t.patterns[e.pat];if(!s)break;e.part==="drum"?s.drum[e.lane].hits=e.data:s[e.part].notes=e.data,this.changed("notes"),this.scheduleSave();break}case"gest":{let s=t.patterns[e.pat];if(!s)break;s.gest=s.gest||{bass:[],lead:[],drum:[]},s.gest[e.part]=e.data,this.changed("gest"),this.scheduleSave();break}case"auto":{let s=t.patterns[e.pat];if(!s)break;e.data?(s.auto[e.target]=s.auto[e.target]||{},s.auto[e.target][e.slot]=e.data):s.auto[e.target]&&(delete s.auto[e.target][e.slot],Object.keys(s.auto[e.target]).length||delete s.auto[e.target]),this.changed("auto"),this.scheduleSave();break}case"macro":{let s=this.macrosFor(e.target,!0);s[e.slot]=Math.round(e.value*1e3)/1e3,this.changed("macro"),this.scheduleSave();break}case"section":this.ui.section=e.index,this.changed("section");break;default:break}}macrosFor(e,t){let s=this.project;if(e==="bass"||e==="lead")return!s.parts[e].macros&&t&&(s.parts[e].macros=[null,null,null,null,null,null,null]),s.parts[e].macros;let a=+e.slice(1);return!s.parts.drum.macros[a]&&t&&(s.parts.drum.macros[a]=[null,null,null,null,null,null,null]),s.parts.drum.macros[a]}macroValue(e,t){let s=this.macrosFor(e,!1);if(s&&s[t]!==null&&s[t]!==void 0)return s[t];let a=this.presetFor(e);if(t===6)return a&&a.expr&&a.expr.def!==void 0?a.expr.def:.5;let o=a&&a.macros&&a.macros[t];return o&&o.def!==void 0?o.def:.5}presetFor(e){let t=this.project;return e==="bass"||e==="lead"?qe(t.parts[e].preset):qe(t.parts.drum.kit[+e.slice(1)])}get pattern(){return this.project.patterns[this.project.current]}setPreset(e,t,s){let a=this.project;this.snapshot(),e==="drum"?(a.parts.drum.kit[t]=s,a.parts.drum.macros[t]=null):(a.parts[e].preset=s,a.parts[e].macros=null),this.send(this.presetMessage(e,t)),this.changed("preset"),this.scheduleSave()}applyKit(e,t){let s=Eo(e);if(!s)return;this.snapshot();let a=this.project;if(a.parts.drum.kit=s.kit.slice(),a.parts.drum.macros=[null,null,null,null],a.parts.drum.rhythm=s.rhythm.slice(),t){s.bass&&(a.parts.bass.preset=s.bass,a.parts.bass.macros=null),s.lead&&(a.parts.lead.preset=s.lead,a.parts.lead.macros=null);let o=Ct(s.style);o&&(a.tempo=o.bpm,a.key=o.key,a.scale=o.scale)}this.syncAll(),this.changed("project"),this.scheduleSave()}set(e,t,s={}){let a=this.project;switch(s.undo&&this.snapshot(),e){case"tempo":a.tempo=Math.round(Math.min(220,Math.max(40,t))),this.send({type:"set",key:e,value:a.tempo});break;case"swing":a.swing=Math.min(75,Math.max(50,Math.round(t))),this.send({type:"set",key:e,value:a.swing});break;case"key":a.key=(t%12+12)%12,this.send({type:"set",key:e,value:a.key});break;case"scale":a.scale=t,this.send({type:"set",key:e,value:t});break;case"bars":yo(a,t),this.send({type:"project",project:a});break;default:break}this.changed(e),this.scheduleSave()}setPart(e,t,s,a){let o=this.project;if(e==="drum")o.parts.drum[t][a]=s,this.send({type:"set",key:t,value:s,part:e,lane:a});else{let r=o.parts[e];t==="steps"?xo(r,s,o.scale):t==="range"?r.range=s:(r[t]=s,this.send({type:"set",key:t==="q"?"quant":t,value:s,part:e}))}this.changed(e+":"+t),this.scheduleSave()}setMix(e,t){let s=this.project;s.mix[e]=t,this.send({type:"set",key:"mix",value:{[e]:t}}),this.changed("mix"),this.scheduleSave()}setLevel(e,t,s){e==="drum"?(this.project.parts.drum.level[t]=s,this.send({type:"set",key:"level",part:e,lane:t,value:s})):(this.project.parts[e].level=s,this.send({type:"set",key:"level",part:e,value:s})),this.changed("mix"),this.scheduleSave()}setMute(e,t,s){e==="drum"?(this.project.parts.drum.mute[t]=s,this.send({type:"set",key:"mute",part:e,lane:t,value:s})):(this.project.parts[e].mute=s,this.send({type:"set",key:"mute",part:e,value:s})),this.changed("mix"),this.scheduleSave()}eraseSpan(e,t,s,a){this.snapshot();let o=this.pattern;fi(o,e,t,s,a,!0),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearPart(e,t){this.snapshot();let s=384*this.project.bars;fi(this.pattern,e,t,0,s,!1),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearAuto(e,t){this.snapshot();let s=this.pattern;s.auto[e]&&(t===void 0?delete s.auto[e]:(delete s.auto[e][t],Object.keys(s.auto[e]).length||delete s.auto[e]));let a=t===void 0?[0,1,2,3,4,5,6]:[t];for(let o of a)this.send({type:"auto",pat:this.project.current,target:e,slot:o,data:null});this.changed("auto"),this.scheduleSave()}pushPattern(e,t){let s=this.pattern,a=this.project.current;if(s.gest&&this.send({type:"gest",pat:a,part:e,data:s.gest[e]||[]}),e==="drum"){let o=t==null?[0,1,2,3]:[t];for(let r of o)this.send({type:"pattern",pat:a,part:e,lane:r,data:s.drum[r].hits});for(let r of o)this.pushAuto("d"+r)}else this.send({type:"pattern",pat:a,part:e,data:s[e].notes}),this.pushAuto(e)}pushAuto(e){let t=this.pattern,s=this.project.current;for(let a=0;a<7;a++)this.send({type:"auto",pat:s,target:e,slot:a,data:t.auto[e]&&t.auto[e][a]?t.auto[e][a]:null})}selectPattern(e){let t=this.project;e<0||e>=t.patterns.length||(t.current=e,this.send({type:"set",key:"current",value:e}),this.changed("pattern"),this.scheduleSave())}addPattern(e){let t=this.project;if(t.patterns.length>=8)return;this.snapshot();let s=String.fromCharCode(65+t.patterns.length),a=e!==void 0?{...JSON.parse(JSON.stringify(t.patterns[e])),name:s}:Qt(s);t.patterns.push(a),t.current=t.patterns.length-1,this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave()}deletePattern(e){let t=this.project;t.patterns.length<=1||(this.snapshot(),t.patterns.splice(e,1),t.patterns.forEach((s,a)=>{s.name=String.fromCharCode(65+a)}),t.song.sections=t.song.sections.filter(s=>s.p!==e).map(s=>({...s,p:s.p>e?s.p-1:s.p})),t.current=Math.min(t.current,t.patterns.length-1),t.song.sections.length||(t.song.enabled=!1),this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave())}setSong(e,t=!0){t&&this.snapshot(),this.project.song=e,this.send({type:"set",key:"song",value:e}),this.changed("song"),this.scheduleSave()}autoArrange(){let e=this.project,t=0,s=e.patterns.length>1?1:0,a=(r,n,l={})=>({p:r,reps:n,mute:l}),o=[a(t,2,{d0:!0,bass:!0,lead:!0}),a(t,2,{lead:!0}),a(s,4),a(t,2,{d0:!0,d1:!0,bass:!0}),a(s,4),a(t,2,{bass:!0,d2:!0,d3:!0})];this.setSong({enabled:!0,sections:o})}setErase(e){this.ui.erase=e,this.send({type:"erase",on:e}),this.changed("erase")}exportProjectJSON(){return JSON.stringify({...this.project,app:"MOTIF 3",exported:new Date().toISOString()},null,1)}importProjectText(e){let t=JSON.parse(e),s=os(t);return s.id=fs(),s.updated=Date.now(),this.loadProject(s),s}async backupAll(){let e=await vt.all("projects");return JSON.stringify({format:"motif-3-backup",exported:new Date().toISOString(),projects:e},null,1)}async restoreBackup(e){let t=JSON.parse(e);if(t.format!=="motif-3-backup"||!Array.isArray(t.projects))throw new Error("Sauvegarde non reconnue");let s=0;for(let a of t.projects)try{let o=os(a);await vt.put("projects",o),s++}catch{}return s}};var Ma=class{constructor({workletUrl:e,onMessage:t,onState:s}){this.workletUrl=e,this.onMessage=t,this.onState=s||(()=>{}),this.ctx=null,this.node=null,this.ready=!1,this.starting=null,this.samples=new Map,this.sampleSets=[],this.loadedBanks=new Set,this.replay=()=>[],this.queue=[],this.lastFrameCheck=0,this.setSessionType()}setSessionType(){try{"audioSession"in navigator&&(navigator.audioSession.type="playback")}catch{}}get running(){return!!(this.ctx&&this.ctx.state==="running"&&this.ready)}start(){return this.running?Promise.resolve(!0):this.ctx&&this.ready&&this.ctx.state!=="closed"?this.ctx.resume().then(()=>this.ctx.state==="running"):this.starting?this.starting:(this.starting=this.build().finally(()=>{this.starting=null}),this.starting)}async build(){this.setSessionType();let e=window.AudioContext||window.webkitAudioContext,t=new e({latencyHint:"interactive"});this.ctx=t;let s=t.resume();t.onstatechange=()=>this.onState(t.state),await t.audioWorklet.addModule(this.workletUrl);let a=new AudioWorkletNode(t,"motif-engine",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]});a.port.onmessage=n=>this.receive(n.data),a.onprocessorerror=()=>{this.ready=!1,this.onState("error")},a.connect(t.destination),this.node=a;let o=Array.from(this.samples.values());o.length&&a.port.postMessage({type:"samples",list:o}),this.sampleSets.length&&a.port.postMessage({type:"sampleSets",sets:this.sampleSets});let r=this.replay();r.length&&a.port.postMessage({type:"batch",list:r});for(let n of this.queue)a.port.postMessage(n);this.queue.length=0,this.ready=!0;try{await s}catch{}return this.onState(t.state),t.state==="running"}async rebuild(){let e=this.ctx;if(this.ready=!1,this.node=null,this.ctx=null,e)try{await e.close()}catch{}return this.start()}receive(e){if(e){if(e.type==="batch"){for(let t of e.list)this.onMessage(t);return}this.onMessage(e)}}send(e){this.node&&this.ready?this.node.port.postMessage(e):e.type==="project"||e.type==="preset"||e.type==="set"||e.type==="macro"||e.type==="pattern"||e.type}suspend(){return this.ctx&&this.ctx.state==="running"?this.ctx.suspend().catch(()=>{}):Promise.resolve()}async probe(e=350){if(!this.ctx)return!1;let t=this.ctx.currentTime;return await new Promise(s=>setTimeout(s,e)),this.ctx.state==="running"&&this.ctx.currentTime>t}async loadBank(e,t){if(this.loadedBanks.has(e))return;let s=await fetch(e);if(!s.ok)throw new Error("Banque introuvable : "+e);let a=await s.json(),o=e.slice(0,e.lastIndexOf("/")+1),r=this.ctx||new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(1,1,48e3),n=0,l=[],d=a.samples.map(async c=>{if(this.samples.has(c.id))return;let h=await fetch(o+c.file);if(!h.ok)throw new Error("Son manquant : "+c.file);let p=await h.arrayBuffer(),f=await l0(r,p),m=f.getChannelData(0),v;if(f.numberOfChannels>1){let x=f.getChannelData(1);v=new Float32Array(m.length);for(let T=0;T<v.length;T++)v[T]=.5*(m[T]+x[T])}else v=new Float32Array(m);let g=new Float32Array(v.length+4);g.set(v,1);let b={id:c.id,sr:f.sampleRate,data:g,gain:c.gain||1,loopStart:c.loopStart?c.loopStart*f.sampleRate/c.sr+1:0,loopEnd:c.loopEnd?c.loopEnd*f.sampleRate/c.sr+1:0};this.samples.set(c.id,b),l.push(b),n++,t&&t(n/a.samples.length)});if(await Promise.all(d),a.sets)for(let c of a.sets)this.sampleSets.find(h=>h.id===c.id)||this.sampleSets.push(c);this.loadedBanks.add(e),this.node&&this.ready&&(l.length&&this.node.port.postMessage({type:"samples",list:l}),this.node.port.postMessage({type:"sampleSets",sets:this.sampleSets}))}};function l0(i,e){return new Promise((t,s)=>{let a=i.decodeAudioData(e,t,s);a&&a.then&&a.then(t,s)})}function u(i,e,...t){let s=document.createElement(i);if(e)for(let a in e){let o=e[a];if(!(o==null||o===!1))if(a==="class")s.className=o;else if(a==="html")s.innerHTML=o;else if(a==="text")s.textContent=o;else if(a.startsWith("on"))s.addEventListener(a.slice(2),o);else if(a==="style"&&typeof o=="object")for(let r in o)r.startsWith("--")?s.style.setProperty(r,o[r]):s.style[r]=o[r];else s.setAttribute(a,o===!0?"":o)}for(let a of t.flat())a!=null&&a!==!1&&s.append(a.nodeType?a:document.createTextNode(String(a)));return s}function c0(i){let e=document.createElement("template");return e.innerHTML=i.trim(),e.content.firstChild}var ye=(i,e="")=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${e}>${i}</svg>`,h0={logo:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="9" width="3.2" height="6" rx="1.6" fill="var(--drum)"/><rect x="7" y="5" width="3.2" height="14" rx="1.6" fill="var(--bass)"/><rect x="12" y="2" width="3.2" height="20" rx="1.6" fill="var(--lead)"/><rect x="17" y="7" width="3.2" height="10" rx="1.6" fill="currentColor" opacity=".55"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" fill="currentColor"/></svg>',stop:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor"/></svg>',rec:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.5"/></svg>',undo:ye('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'),redo:ye('<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>'),erase:ye('<path d="m7 21-4.3-4.3a1.5 1.5 0 0 1 0-2.1L13.4 3.9a1.5 1.5 0 0 1 2.1 0l4.6 4.6a1.5 1.5 0 0 1 0 2.1L10 21"/><path d="M22 21H7"/><path d="m5.5 12 6.5 6.5"/>'),trash:ye('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>'),left:ye('<path d="m15 18-6-6 6-6"/>'),right:ye('<path d="m9 18 6-6-6-6"/>'),down:ye('<path d="m6 9 6 6 6-6"/>'),close:ye('<path d="M18 6 6 18M6 6l12 12"/>'),plus:ye('<path d="M12 5v14M5 12h14"/>'),check:ye('<path d="M20 6 9 17l-5-5"/>'),more:ye('<circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/>'),drum:ye('<circle cx="7" cy="8" r="1.4" fill="currentColor"/><circle cx="12" cy="8" r="1.4" fill="currentColor"/><circle cx="17" cy="8" r="1.4" fill="currentColor"/><circle cx="7" cy="14" r="1.4" fill="currentColor"/><circle cx="12" cy="14" r="1.4" fill="currentColor"/><circle cx="17" cy="14" r="1.4" fill="currentColor"/>','stroke-width="1"'),bass:ye('<path d="M2 13c2.5 0 2.5-6 5-6s2.5 10 5 10 2.5-10 5-10 2.5 6 5 6"/>'),lead:ye('<path d="M3 15l4-7 4 9 4-11 3 7h3"/>'),pattern:ye('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 4v16M13 4v16M18 4v16" opacity=".55"/>'),tweaks:ye('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="9" cy="10" r="2.2"/><circle cx="15" cy="15" r="2.2"/>'),mix:ye('<path d="M6 4v16M12 4v16M18 4v16"/><rect x="4" y="13" width="4" height="3" rx="1" fill="currentColor"/><rect x="10" y="7" width="4" height="3" rx="1" fill="currentColor"/><rect x="16" y="11" width="4" height="3" rx="1" fill="currentColor"/>'),song:ye('<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="18" r="2"/>'),share:ye('<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'),download:ye('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'),folder:ye('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),file:ye('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),note:ye('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),sun:ye('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:ye('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),info:ye('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),wifi:ye('<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>'),copy:ye('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),sparkle:ye('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>'),speaker:ye('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),metro:ye('<path d="M9.2 3h5.6l4.2 18H5z"/><path d="M12 15.5 17.5 6"/><path d="M8 15.5h8"/>'),dice:ye('<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/>'),piano:ye('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 13v7M15 13v7"/><rect x="7.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/><rect x="13.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/>'),settings:ye('<path d="M4 7h9M18 7h2M4 17h3M12 17h8"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="9.5" cy="17" r="2.3"/>'),touch:ye('<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="7.5" opacity=".55"/>'),pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/></svg>'};function he(i){return c0(h0[i])}function d0(){return Math.min(window.devicePixelRatio||1,2.5)}function Wt(i){let e=i.getBoundingClientRect(),t=d0(),s=Math.max(1,Math.round(e.width*t)),a=Math.max(1,Math.round(e.height*t));return(i.width!==s||i.height!==a)&&(i.width=s,i.height=a),{w:e.width,h:e.height,d:t}}function Ze(i,e=document.querySelector(".app")||document.documentElement){return getComputedStyle(e).getPropertyValue(i).trim()}function qo(i,{get:e,set:t,step:s=12,axis:a="y",onStart:o,onEnd:r,onTap:n}){let l=null;i.addEventListener("pointerdown",c=>{c.preventDefault();try{i.setPointerCapture(c.pointerId)}catch{}l={x:c.clientX,y:c.clientY,v:e(),moved:!1,id:c.pointerId},o&&o()}),i.addEventListener("pointermove",c=>{if(!l||c.pointerId!==l.id)return;let h=a==="y"?l.y-c.clientY:c.clientX-l.x;Math.abs(h)>4&&(l.moved=!0),l.moved&&t(l.v+Math.round(h/s),c)});let d=c=>{if(!l||c.pointerId!==l.id)return;let h=l;l=null,!h.moved&&n&&n(c),r&&r()};i.addEventListener("pointerup",d),i.addEventListener("pointercancel",d)}var Et=class{constructor(e){this.o=e,this.el=u("div",{class:"dial",role:"slider",tabindex:"0","aria-label":e.label}),this.cv=u("canvas"),this.vEl=u("div",{class:"v"}),this.lEl=u("div",{class:"l",text:e.label}),this.sEl=u("div",{class:"s"}),this.el.append(this.cv,this.vEl,this.lEl,this.sEl);let t=null;this.el.addEventListener("pointerdown",a=>{a.preventDefault();try{this.el.setPointerCapture(a.pointerId)}catch{}t={x:a.clientX,y:a.clientY,v:this.o.get(),id:a.pointerId,moved:!1,axis:null},this.el.classList.add("active"),e.onStart&&e.onStart()}),this.el.addEventListener("pointermove",a=>{if(!t||a.pointerId!==t.id)return;let o=a.clientX-t.x,r=t.y-a.clientY;if(!t.axis&&Math.hypot(o,r)>8&&(t.axis=Math.abs(o)>Math.abs(r)*1.3?"x":"y"),t.axis==="x"&&e.onSwipeX&&!t.swiped&&Math.abs(o)>26&&(t.swiped=!0,e.onSwipeX(o>0?1:-1),t.v=this.o.get(),t.y=a.clientY,t.axis="y2"),t.axis==="y"||t.axis==="y2"){t.moved=!0;let n=e.step||14,l=Math.max(e.min(),Math.min(e.max(),t.v+Math.round(r/n)));l!==this.o.get()&&(this.o.set(l),this.render())}});let s=a=>{if(!t||a.pointerId!==t.id)return;let o=t;t=null,this.el.classList.remove("active"),!o.axis&&e.onTap&&e.onTap(),e.onEnd&&e.onEnd()};this.el.addEventListener("pointerup",s),this.el.addEventListener("pointercancel",s),this.el.addEventListener("keydown",a=>{let o=a.key==="ArrowUp"||a.key==="ArrowRight"?1:a.key==="ArrowDown"||a.key==="ArrowLeft"?-1:0;if(o){a.preventDefault();let r=Math.max(e.min(),Math.min(e.max(),this.o.get()+o));this.o.set(r),this.render()}else(a.key==="Enter"||a.key===" ")&&e.onTap&&(a.preventDefault(),e.onTap())})}render(){let e=this.o,t=e.format(e.get());this.vEl.textContent=t.v,this.sEl.textContent=t.s||"",t.l!==void 0&&(this.lEl.textContent=t.l),this.el.setAttribute("aria-valuenow",String(e.get())),this.el.setAttribute("aria-valuetext",`${t.v} ${t.s||""}`.trim()),this.el.classList.toggle("ties",!!t.ties);let{w:s,h:a,d:o}=Wt(this.cv),r=this.cv.getContext("2d");r.setTransform(o,0,0,o,0,0),r.clearRect(0,0,s,a),e.ring&&e.ring(r,s,a,e.get())}};function Si(i,e,t,s,a,o,r,n){let l=e/2,d=t/2-2,c=Math.min(e,t)/2-8;if(i.lineCap="round",i.strokeStyle=n,i.lineWidth=1,i.beginPath(),i.arc(l,d,c,0,Math.PI*2),i.stroke(),!s||!s.len){i.strokeStyle=r,i.lineWidth=3,i.globalAlpha=.6,i.beginPath(),i.arc(l,d,c,-Math.PI/2,Math.PI*1.5),i.stroke(),i.globalAlpha=1;return}let h=p=>-Math.PI/2+p/s.len*Math.PI*2;if(s.ev.forEach(([p,f,m],v)=>{let g=h(p),b=h(Math.min(p+f,s.len))-.02;if(i.strokeStyle=r,i.lineWidth=m?5:3.5,i.beginPath(),i.arc(l,d,c,g+.03,Math.max(g+.06,b)),i.stroke(),a&&a.includes(v)){let x=s.ev[(v-1+s.ev.length)%s.ev.length];i.strokeStyle=r,i.lineWidth=2,i.globalAlpha=.9,i.beginPath(),i.arc(l,d,c-8,h(x[0])+.05,g-.02+(v===0?Math.PI*2:0)),i.stroke(),i.globalAlpha=1,i.fillStyle=r,i.beginPath(),i.arc(l+Math.cos(g)*(c-8),d+Math.sin(g)*(c-8),2.6,0,Math.PI*2),i.fill()}}),o>=0){let p=h(o);i.fillStyle=Ze("--ink"),i.beginPath(),i.arc(l+Math.cos(p)*c,d+Math.sin(p)*c,3,0,Math.PI*2),i.fill()}}var vs=ds.lo,Xs=ds.hi,u0=ds.maxN;function $s(i,e){let t=48+e+i;return Xt[(t%12+12)%12]+(Math.floor(t/12)-1)}var La=class{constructor({get:e,set:t,scale:s,onStart:a}){this.get=e,this.set=t,this.scale=s,this.onStart=a,this.el=u("div",{class:"range",role:"group","aria-label":"Plage de notes",tabindex:"0"}),this.cv=u("canvas"),this.lbl=u("div",{class:"lbl"}),this.el.append(this.cv,this.lbl),this.drag=null,this.el.addEventListener("pointerdown",o=>this.down(o)),this.el.addEventListener("pointermove",o=>this.move(o)),this.el.addEventListener("pointerup",o=>this.up(o)),this.el.addEventListener("pointercancel",o=>this.up(o)),this.el.addEventListener("keydown",o=>this.key(o))}x2semi(e){return vs+e/this.w*(Xs-vs)}semi2x(e){return(e-vs)/(Xs-vs)*this.w}notes(){let{scale:e,steps:t}=this.scale();return ya(e,t)}windowPx(){let{scale:e,steps:t}=this.scale(),s=this.get(),a=Pt(s,e,t),o=a[0].semi,r=a[a.length-1].semi;return{x0:this.semi2x(o-.45),x1:this.semi2x(r+.55),lo:o,hi:r,cols:a}}nearestNote(e){let t=this.notes(),s=t[0],a=1/0;for(let o of t){let r=Math.abs(o-e);r<a&&(a=r,s=o)}return s}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.el.getBoundingClientRect(),s=e.clientX-t.left,a=this.windowPx(),o=Math.max(18,Math.min(30,(a.x1-a.x0)*.25)),r;Math.abs(s-a.x0)<=o&&s<(a.x0+a.x1)/2?r="left":Math.abs(s-a.x1)<=o&&s>(a.x0+a.x1)/2?r="right":s>a.x0&&s<a.x1?r="move":r="jump";let n=this.get();this.drag={id:e.pointerId,mode:r,x0:s,lo:a.lo,hi:a.hi,n:n.n,moved:!1},this.onStart&&this.onStart(),r==="jump"&&this.jumpTo(s,n.n),this.render()}jumpTo(e,t){let{scale:s,steps:a}=this.scale(),o=this.notes(),r=this.x2semi(e),n=0,l=1/0;o.forEach((c,h)=>{let p=Math.abs(c-r);p<l&&(l=p,n=h)});let d=di({lo:o[Math.max(0,n-Math.floor(t/2))],n:t},o[Math.max(0,n-Math.floor(t/2))],s,a);this.set(d),this.drag.lo=d.lo,this.drag.mode="move",this.drag.x0=e}move(e){let t=this.drag;if(!t||e.pointerId!==t.id)return;let s=this.el.getBoundingClientRect(),a=e.clientX-s.left;Math.abs(a-t.x0)>3&&(t.moved=!0);let o=(a-t.x0)/this.w*(Xs-vs),{scale:r,steps:n}=this.scale(),l=this.get(),d;t.mode==="move"?d=di({lo:t.lo,n:t.n},t.lo+o,r,n):t.mode==="left"?d=ui({lo:t.lo,n:t.n},"left",t.lo+o,r,n):t.mode==="right"&&(d=ui({lo:t.lo,n:t.n},"right",t.hi+o,r,n)),d&&(d.lo!==l.lo||d.n!==l.n)&&this.set(d),this.render()}up(e){this.drag&&e.pointerId===this.drag.id&&(this.drag=null,this.render())}key(e){let t=this.notes(),s=this.get(),a=t.indexOf(this.nearestNote(s.lo));if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();let o=e.key==="ArrowRight"?1:-1;if(e.shiftKey)this.set({lo:s.lo,n:Math.max(1,Math.min(u0,s.n+o))});else{let r=Math.max(0,Math.min(t.length-s.n,a+o));this.set({lo:t[r],n:s.n})}this.render()}}render(){let{w:e,h:t,d:s}=Wt(this.cv);this.w=e,this.h=t;let a=this.cv.getContext("2d");a.setTransform(s,0,0,s,0,0),a.clearRect(0,0,e,t);let{scale:o,steps:r,key:n}=this.scale(),l=Ze("--accent"),d=Ze("--ink"),c=Ze("--ink-3"),h=document.documentElement.dataset.theme==="dark",p=6,f=t-18;for(let T=Math.floor(vs/12);T<Math.ceil(Xs/12);T++){let R=this.semi2x(T*12-.5),I=this.semi2x(T*12+11.5);a.fillStyle=T%2===0?h?"rgba(255,255,255,0.045)":"rgba(0,0,0,0.045)":"rgba(0,0,0,0)",a.fillRect(R,p,I-R,f-p)}let m=this.windowPx(),v=9;a.fillStyle=l,a.globalAlpha=h?.22:.3,et(a,m.x0,p-2,m.x1-m.x0,f-p+4,v),a.fill(),a.globalAlpha=1,a.strokeStyle=l,a.lineWidth=2,et(a,m.x0,p-2,m.x1-m.x0,f-p+4,v),a.stroke();let g=this.notes(),b=e/(Xs-vs);for(let T of g){let R=this.semi2x(T),I=T>=m.lo&&T<=m.hi,N=(T%12+12)%12===0,ie=Math.floor(T/12);a.fillStyle=I?d:c,a.globalAlpha=I?ie%2===0?1:.72:.35;let K=Math.max(2,Math.min(b*.55,6)),P=N?f-p-4:(f-p)*.62;et(a,R-K/2,f-2-P,K,P,K/2),a.fill(),a.globalAlpha=1}a.fillStyle=l;for(let T of[m.x0,m.x1])et(a,T-3.5,p+(f-p)/2-11,7,22,3.5),a.fill();this.drag&&(a.fillStyle=l,a.globalAlpha=.12,a.fillRect(0,0,e,t),a.globalAlpha=1);let x=m.cols.length;this.lbl.textContent=`${$s(m.lo,n)} \u2192 ${$s(m.hi,n)} \xB7 ${x} note${x>1?"s":""}`,this.el.setAttribute("aria-label","Plage de notes : "+this.lbl.textContent)}};function et(i,e,t,s,a,o){o=Math.max(0,Math.min(o,s/2,a/2)),i.beginPath(),i.moveTo(e+o,t),i.lineTo(e+s-o,t),i.quadraticCurveTo(e+s,t,e+s,t+o),i.lineTo(e+s,t+a-o),i.quadraticCurveTo(e+s,t+a,e+s-o,t+a),i.lineTo(e+o,t+a),i.quadraticCurveTo(e,t+a,e,t+a-o),i.lineTo(e,t+o),i.quadraticCurveTo(e,t,e+o,t),i.closePath()}function Ti(i){return Array.from({length:i},(e,t)=>({x0:t/i,y0:0,x1:(t+1)/i,y1:1}))}function Co(i){let{keys:e,whites:t}=i,s=[];for(let o of e)o.black||s.push({x0:o.pos/t,y0:0,x1:(o.pos+1)/t,y1:1});let a=Es/t/2;for(let o of e)o.black&&s.push({x0:o.pos/t-a,y0:0,x1:o.pos/t+a,y1:as,cut:!0});return s}var gs={plain:0,shaded:1,white:2,black:3,laneEven:4,laneOdd:5};function Ps(i){if(i=(i||"").trim(),i.startsWith("color(")){let t=i.match(/[\d.]+/g).map(Number);return[t[t.length-3],t[t.length-2],t[t.length-1]].map(s=>s>1?s/255:s)}if(i.startsWith("#"))return(i.length===4?i.slice(1).split("").map(s=>s+s):[i.slice(1,3),i.slice(3,5),i.slice(5,7)]).map(s=>parseInt(s,16)/255);let e=i.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[0,0,0]}function f0(i,e,t,s){let a=n=>[1,1,1,n],o=n=>[0,0,0,n],r=n=>[...e,n];return s?[a(0),a(.03),a(.06),[.035,.015,.055,.72],a(0),a(.025)]:i?[a(0),a(.035),a(.075),[.031,.035,.047,1],a(0),a(.03)]:t==="aquarelle"?[o(0),o(.03),a(.55),[.16,.14,.13,.93],o(0),o(.025)]:t==="vitrail"?[o(.02),a(.16),a(.4),r(.9),a(.12),o(.03)]:[o(.035),a(.13),a(.34),r(.88),a(.1),o(.04)]}var Oo={classique:0,aquarelle:1,vitrail:2},Bo=(i,e,t)=>i.map((s,a)=>s+(e[a]-s)*t);function Mi({kind:i,keys:e,sig:t,el:s,glass:a,hdr:o,slabs:r,fills:n,spill:l=0,radius:d,look:c="aquarelle",gel:h=1,glassLook:p="optique"}){let f=getComputedStyle(s.closest(".app")||document.documentElement),m=document.documentElement.dataset.theme!=="light",v=document.documentElement.hasAttribute("data-halloween"),g=Ps(f.getPropertyValue("--accent")),b=Ps(f.getPropertyValue("--accent-ink"));(m||!(c in Oo))&&(c=m?"dark":"aquarelle");let x=c==="aquarelle",T=m?[26/255,28/255,35/255]:x?[.98,.965,.933]:c==="vitrail"?Bo(g,[1,1,1],.35):g,R=m?[18/255,19/255,24/255]:x?[.945,.918,.871]:c==="vitrail"?Bo(g,[1,1,1],.1):g,I=x?[.25,.2,.15,e&&e.length<=4?.18:.12]:i==="pad"&&e&&e.length<=4?m?[1,1,1,.1]:[0,0,0,.12]:m?[1,1,1,.06]:[0,0,0,.07],N=d||parseFloat(getComputedStyle(s).borderTopLeftRadius)||20,ie=Ps(f.getPropertyValue("--surface")),K=Ps(f.getPropertyValue("--bg")),P=a?m?1:.6:0;return{kind:i,keys:e,dark:m,accent:g,bgTop:T,bgBot:R,sep:I,sepPx:e&&e.length<=4?2:1,kinds:f0(m,b,c,v),glass:!!a,hdr:o||1,radius:N,surf:ie,appBg:K,slabs:r||[[0,0,1,1]],fills:n||[],spill:a?l:0,shadow:P,style:m?0:Oo[c],gel:h,glassLook:p,keyGlow:m||x?[...g,x?.55:.5]:[1,1,1,.55],sig:`${i}|${t}|${m}|${v}|${c}|${h}|${p}|${g.join()}|${a}|${o}|${N}|${l}|${JSON.stringify(r||0)}|${JSON.stringify(n||0)}`}}function Ra(i,e,t,s){i.width=t,i.height=s;let a=i.getContext("2d");return a.imageSmoothingEnabled=!1,a.fillStyle="#000",a.fillRect(0,0,t,s),(e||[]).forEach((o,r)=>{let n=Math.round(o.x0*t),l=Math.round(o.x1*t),d=Math.round(o.y0*s),c=Math.round(o.y1*s);o.cut&&(a.fillStyle="#000",a.fillRect(n-1,d,l-n+2,c-d+1)),a.fillStyle=`rgb(${r+1},${(o.kind||0)*40},0)`,a.fillRect(n,d,Math.max(1,l-n),Math.max(1,c-d))}),i}function Js(i,e,t,s){i.width=t,i.height=s;let a=i.getContext("2d");if(a.imageSmoothingEnabled=!1,!e)return a.fillStyle="rgb(1,0,0)",a.fillRect(0,0,t,s),i;a.fillStyle="#000",a.fillRect(0,0,t,s);let o=Math.max(1,Math.round(t/180));return e.forEach((r,n)=>{let l=Math.round(r.x0*t),d=Math.round(r.x1*t),c=Math.round(r.y0*s),h=Math.round(r.y1*s);r.cut&&(a.fillStyle="#000",a.fillRect(l-o,c,d-l+2*o,h-c+o)),a.fillStyle=`rgb(${n+1},0,0)`,a.fillRect(l+o,c+(r.y0>0?o:0),Math.max(1,d-l-2*o),Math.max(1,h-c-(r.y0>0?o:0)-(r.y1<1?o:0)))}),i}var Aa=class{constructor(e,t={}){this.store=e,this.opts=t,this.el=u("div",{class:"pad",role:"application","aria-label":"Surface de jeu"}),this.cv=u("canvas"),this.hint=u("div",{class:"hint"},u("b",{text:"\xC0 toi de jouer."}),u("span",{text:""})),this.axY=u("div",{class:"ax y"}),this.el.append(this.cv,this.hint,this.axY),this.touches=new Map,this.ripples=[],this.level=0,this.raf=0,this.flash=new Map,this.ghosts=[],this.fx=null,this.ghouls=null,this.gpu=!1,this.under=!1,this.inkUnder=!1,this.pianoCache=null,this.el.addEventListener("pointerdown",s=>this.down(s)),this.el.addEventListener("pointermove",s=>this.move(s)),this.el.addEventListener("pointerup",s=>this.up(s)),this.el.addEventListener("pointercancel",s=>this.up(s,!0)),this.el.addEventListener("lostpointercapture",s=>{this.touches.has(s.pointerId)&&this.up(s,!0)}),this.el.addEventListener("contextmenu",s=>s.preventDefault()),this.ro=new ResizeObserver(()=>this.draw()),this.ro.observe(this.el)}get part(){return this.store.ui.part}columns(){let e=this.store.project,t=e.parts[this.part];return Pt(t.range,e.scale,t.steps)}get piano(){return this.part!=="drum"&&!!this.store.settings.piano}pianoLayout(){let e=this.store.project,t=e.parts[this.part],s=`${t.range.lo}:${t.range.n}:${e.scale}:${t.steps}:${e.key}`;return(!this.pianoCache||this.pianoCache.k!==s)&&(this.pianoCache={k:s,L:uo(t.range,e.scale,t.steps,e.key)}),this.pianoCache.L}inkShare(){return this.fx&&this.store.settings.fluid?.4:1}keyLayout(){if(this.part==="drum")return{sig:"drum",keys:Ti(4).map((a,o)=>({...a,kind:o%2?gs.laneOdd:gs.laneEven}))};if(this.piano){let a=this.pianoLayout();return{sig:"piano:"+this.pianoCache.k,keys:Co(a).map(o=>({...o,kind:o.cut?gs.black:gs.white}))}}let e=this.columns(),t=e.length,s=a=>(a.octave%2+2)%2===0;return{sig:"cols:"+t+":"+e.map(a=>s(a)?1:0).join(""),keys:Ti(t).map((a,o)=>({...a,kind:s(e[o])?gs.shaded:gs.plain}))}}pitchClass(e,t){let s=this.store.project;return((s.key+Jt(e,t,s.scale))%12+12)%12}keyBox(e,t){if(!t.black)return{x0:t.pos/e.whites,w:1/e.whites};let s=Es/e.whites/2;return{x0:t.pos/e.whites-s,w:2*s}}setClock(e){this.clock=e,e.playing&&this.hasStrokes()&&this.kick()}playingPattern(){let e=this.clock,t=this.store.project;return e&&t.patterns[e.pat]||this.store.pattern}hasStrokes(e=this.part){let t=this.playingPattern().gest;return!!(t&&t[e]&&t[e].length)}clockTick(e){let t=this.clock;if(!t||!t.playing||t.tick<0)return-1;let s=Math.min(120,e-t.at)/t.msPerTick;return(t.tick+s)%t.L}pointToPad(e,t,s){if(e==="drum")return{x:(t+s[1])/4,y:1-s[2]};let a=this.store.project.scale,o=Jt(s[3],s[4],a);if(this.piano){let d=this.pianoLayout(),c=d.keys.find(p=>p.semi===o);if(!c)return null;let h=this.keyBox(d,c);return{x:h.x0+s[1]*h.w,y:(1-s[2])*(c.black?as:1)}}let r=this.columns(),n=-1,l=3;return r.forEach((d,c)=>{let h=Math.abs(d.semi-o);h<l&&(l=h,n=c)}),n<0?null:{x:(n+s[1])/r.length,y:1-s[2]}}strokeAt(e,t,s){let a=t.p,o=a.length;if(!o||s<a[0][0]||s>a[o-1][0]+(o===1?6:1.5))return null;let r=0;for(;r<o-1&&a[r+1][0]<=s;)r++;let n=this.pointToPad(e,t.l,a[r]);if(r===o-1)return n;let l=this.pointToPad(e,t.l,a[r+1]);if(!n||!l)return n||l;let d=(s-a[r][0])/Math.max(.1,a[r+1][0]-a[r][0]);return{x:n.x+(l.x-n.x)*d,y:n.y+(l.y-n.y)*d}}drawReplay(e,t,s,a,o,r){let n=this.clockTick(r),l=this.part,d=this.playingPattern().gest,c=new Map;if(n<0||!d||!d[l])return this.strokePrev=c,!1;let h=this.store.settings.ghosts,p=new Set([...this.touches.values()].map(f=>f.lane));for(let f of d[l]){if(l!=="drum"&&this.touches.size)break;if(l==="drum"&&p.has(f.l))continue;let m=this.strokeAt(l,f,n);if(!m)continue;let v=this.strokePrev&&this.strokePrev.get(f);if(c.set(f,m),this.fx){let R=f.p[0],I=l==="drum"?void 0:this.pitchClass(R[3],R[4]);v?(m.x!==v.x||m.y!==v.y)&&this.fx.touch(l,m.x,m.y,m.x-v.x,m.y-v.y,"move",f.l,I):this.fx.touch(l,m.x,m.y,0,0,"down",f.l,I)}if(!h)continue;e.lineCap="round",e.lineJoin="round";let g=m;for(let R=1;R<=14;R++){let I=this.strokeAt(l,f,n-R*2);if(!I)break;let N=1-R/15;e.strokeStyle=a?xe(o,.55*N):`rgba(255,255,255,${.15+.6*N})`,e.lineWidth=2+12*N,e.beginPath(),e.moveTo(g.x*t,g.y*s),e.lineTo(I.x*t,I.y*s),e.stroke(),g=I}let b=m.x*t,x=m.y*s,T=e.createRadialGradient(b,x,0,b,x,46);a?(T.addColorStop(0,xe(o,.32)),T.addColorStop(1,xe(o,0))):(T.addColorStop(0,"rgba(255,255,255,0.45)"),T.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=T,e.fillRect(b-46,x-46,92,92),e.lineWidth=2,e.strokeStyle=a?xe(o,.8):"rgba(255,255,255,0.9)",e.setLineDash([5,4]),e.beginPath(),e.arc(b,x,19,0,Math.PI*2),e.stroke(),e.setLineDash([])}return this.strokePrev=c,!0}keyGeom(e,t){return t.black?{x:t.pos/e.whites,top:as}:{x:(t.pos+.5)/e.whites,top:1}}local(e){let t=this.el.getBoundingClientRect();return{x:Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,(e.clientY-t.top)/t.height))}}msgFor(e,t,s){let a=this.part;if(a==="drum"){let l=Math.min(3,Math.floor(s.x*4)),d=s.x*4-l;return{type:"pad",part:a,lane:l,id:e,phase:t,x:d,y:1-s.y,v:.9}}if(this.piano){let l=this.pianoLayout(),d=fo(l,s.x,s.y),c=d.black?1-Math.min(1,s.y/as):1-s.y,h=this.keyBox(l,d),p=Math.min(1,Math.max(0,(s.x-h.x0)/h.w));return{type:"pad",part:a,id:e,phase:t,deg:d.deg,acc:d.acc,y:c,fx:p,v:.85,col:l.keys.indexOf(d)}}let o=this.columns(),r=Math.min(o.length-1,Math.floor(s.x*o.length)),n=o[r];return{type:"pad",part:a,id:e,phase:t,deg:n.deg,acc:n.acc,y:1-s.y,fx:s.x*o.length-r,v:.85,col:r}}down(e){e.preventDefault(),this.opts.onFirstTouch&&this.opts.onFirstTouch();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.local(e),s=this.msgFor(e.pointerId,"down",t);this.touches.set(e.pointerId,{...t,rx:t.x,ry:t.y,lane:s.lane,col:s.col,deg:s.deg,acc:s.acc,t:performance.now()}),this.fx&&(this.fx.touch(this.part,t.x,t.y,0,0,"down",s.lane,s.deg!==void 0?this.pitchClass(s.deg,s.acc):void 0),this.fx.press(e.pointerId,t.x,t.y,"down")),this.ghouls&&this.ghouls.press(e.pointerId,t.x,t.y,"down"),this.store.send(s),this.hint.style.opacity="0",this.kick()}move(e){let t=this.touches.get(e.pointerId);if(!t)return;let s=this.local(e);if(this.fx&&(this.fx.touch(this.part,s.x,s.y,s.x-t.rx,s.y-t.ry,"move",t.lane,t.pc),this.fx.press(e.pointerId,s.x,s.y,"move"),t.rx=s.x,t.ry=s.y),this.ghouls&&this.ghouls.press(e.pointerId,s.x,s.y,"move"),this.part==="drum"){let a=t.lane,o=Math.min(.999,Math.max(0,s.x*4-a));this.store.send({type:"pad",part:"drum",lane:a,id:e.pointerId,phase:"move",x:o,y:1-s.y}),t.x=(a+o)/4,t.y=s.y}else{let a=this.msgFor(e.pointerId,"move",s);t.x=s.x,t.y=s.y,t.col=a.col,t.deg=a.deg,t.acc=a.acc,this.fx&&(t.pc=this.pitchClass(a.deg,a.acc)),this.store.send(a)}}up(e,t){let s=this.touches.get(e.pointerId);if(!s)return;this.touches.delete(e.pointerId),this.fx&&this.fx.press(e.pointerId,s.x,s.y,"up"),this.ghouls&&this.ghouls.press(e.pointerId,s.x,s.y,"up");let a=this.part;a==="drum"?this.store.send({type:"pad",part:a,lane:s.lane,id:e.pointerId,phase:t?"cancel":"up"}):this.store.send({type:"pad",part:a,id:e.pointerId,phase:t?"cancel":"up"})}releaseAll(){for(let[e,t]of this.touches)this.part==="drum"?this.store.send({type:"pad",part:"drum",lane:t.lane,id:e,phase:"cancel"}):this.store.send({type:"pad",part:this.part,id:e,phase:"cancel"});this.touches.clear()}get layers(){return!!(this.fx||this.ghouls&&this.ghouls.on)}noteFx(...e){this.fx&&this.fx.note(...e),this.ghouls&&this.ghouls.on&&this.ghouls.note(...e)}onTrig(e,t){if(t){let r=this.part==="drum"?t.drum:t[this.part];this.level=Math.max(this.level*.6,r||0)}if(!e){this.level>.01&&this.kick();return}let s=this.part,a=performance.now(),o=this.store.settings.ghosts&&!this.hasStrokes(s);for(let r=0;r<e.length;r+=4){let n=e[r],l=e[r+1],d=e[r+2],c=e[r+3];if(c===-1&&this.layers){if(s==="drum"&&n===0){for(let[,h]of this.touches)if(h.lane===l){this.noteFx("drum",h.x,h.y,l,.9);break}}else if(s==="bass"&&n===1||s==="lead"&&n===2){let h=null;for(let[,p]of this.touches)(!h||p.deg===l&&p.acc===d)&&(h=p);h&&this.noteFx(s,h.x,h.y,0,.9,this.pitchClass(l,d))}}if(s==="drum"&&n===0){if(this.ripples.push({lane:l,zone:d,t:a}),c!==-1){let h=(l+(d+.5)/3)/4,p=c>=0?1-c:.5;o&&c>=0&&this.ghosts.push({x:h,y:p,t:a}),this.layers&&this.noteFx("drum",h,p,l)}}else if(s==="bass"&&n===1||s==="lead"&&n===2){let h=c>=0?c:this.store.macroValue(s,6);if(this.piano){let p=this.pianoLayout(),f=Jt(l,d,this.store.project.scale),m=p.keys.findIndex(v=>v.semi===f);if(this.ripples.push({col:m,t:a}),c!==-1&&m>=0){let v=this.keyGeom(p,p.keys[m]);o&&this.ghosts.push({x:v.x,y:(1-h)*v.top,t:a}),this.layers&&this.noteFx(s,v.x,(1-h)*v.top,0,.8,this.pitchClass(l,d))}}else{let p=this.columns(),f=p.findIndex(m=>m.deg===l&&m.acc===d);this.ripples.push({col:f,deg:l,t:a}),c!==-1&&f>=0&&(o&&this.ghosts.push({x:(f+.5)/p.length,y:1-h,t:a}),this.layers&&this.noteFx(s,(f+.5)/p.length,1-h,0,.8,this.pitchClass(l,d)))}}}this.ripples.length>40&&this.ripples.splice(0,this.ripples.length-40),this.ghosts.length>24&&this.ghosts.splice(0,this.ghosts.length-24),this.kick()}kick(){this.raf||(this.raf=requestAnimationFrame(()=>{this.raf=0,this.draw(!0)}))}setHint(){let e=this.store.ui,t=this.store.presetFor(this.part==="drum"?"d0":this.part),s;e.erase?s="Gomme : touche pendant la lecture pour effacer":this.part==="drum"?s="Une colonne par son \xB7 \u2194 variante \xB7 \u2195\uFE0E caract\xE8re":s=`${this.piano?"Clavier":"Notes \u2194"} \xB7 ${t&&t.expr?t.expr.name:"Expression"} \u2195\uFE0E`,this.hint.querySelector("b").textContent=e.erase?"Gomme":e.armed&&!e.playing?"Pr\xEAt \xE0 enregistrer":"\xC0 toi de jouer.",this.hint.querySelector("span").textContent=e.armed&&!e.playing?"Le premier toucher lance la boucle":s,this.axY.textContent=this.part==="drum"?"Caract\xE8re":t&&t.expr?t.expr.name:"",this.axY.hidden=this.piano}showHint(e){this.hint.style.opacity=e?"1":"0"}draw(e){let{w:t,h:s,d:a}=Wt(this.cv),o=this.cv.getContext("2d");o.setTransform(a,0,0,a,0,0);let r=document.documentElement.dataset.theme==="dark",n=Ze("--accent"),l=Ze("--accent-ink"),d=Ze("--ink"),c=performance.now();this.fx&&this.fx.syncScene(),this.under=this.gpu||!!(this.ghouls&&this.ghouls.stage);let h=this.under;if(o.clearRect(0,0,t,s),h&&(o.save(),et(o,0,0,t,s,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),o.clip()),!h){if(r){let v=o.createLinearGradient(0,0,0,s);v.addColorStop(0,"#1a1c23"),v.addColorStop(1,"#121318"),o.fillStyle=v}else o.fillStyle=n;o.fillRect(0,0,t,s)}this.part==="drum"?this.drawDrums(o,t,s,r,n,l,d,c):this.drawMelodic(o,t,s,r,n,l,d,c);for(let[,v]of this.touches){let g=v.x*t,b=v.y*s,x=Math.max(70,Math.min(t,s)*.35)*(1+this.level*.6),T=o.createRadialGradient(g,b,0,g,b,x);r?(T.addColorStop(0,xe(n,.55+this.level*.3)),T.addColorStop(.35,xe(n,.18)),T.addColorStop(1,xe(n,0))):(T.addColorStop(0,"rgba(255,255,255,0.65)"),T.addColorStop(.4,"rgba(255,255,255,0.18)"),T.addColorStop(1,"rgba(255,255,255,0)")),o.globalCompositeOperation=r?"lighter":"source-over",o.fillStyle=T,o.fillRect(g-x,b-x,2*x,2*x),o.globalCompositeOperation="source-over",o.strokeStyle=r?xe(n,.9):"rgba(255,255,255,0.9)",o.lineWidth=2,o.beginPath(),o.arc(g,b,22,0,Math.PI*2),o.stroke()}this.drawGhosts(o,t,s,r,n,c);let f=this.drawReplay(o,t,s,r,n,c);if(this.store.ui.erase){o.fillStyle=r?"rgba(255,80,80,0.08)":"rgba(0,0,0,0.08)";for(let v=-s;v<t;v+=22)o.beginPath(),o.moveTo(v,s),o.lineTo(v+s,0),o.lineTo(v+s+8,0),o.lineTo(v+8,s),o.fill()}h&&o.restore(),this.level*=.9;let m=this.touches.size||this.ripples.some(v=>c-v.t<600)||this.ghosts.length||this.level>.02||f;this.ripples=this.ripples.filter(v=>c-v.t<600),this.ghosts=this.ghosts.filter(v=>c-v.t<Io),m&&e&&this.kick()}drawGhosts(e,t,s,a,o,r){for(let n of this.ghosts){let l=(r-n.t)/Io;if(l>=1)continue;let d=n.x*t,c=Math.min(s-8,Math.max(8,n.y*s)),h=(1-l)*(1-l),p=15+10*l,f=e.createRadialGradient(d,c,0,d,c,p*2.2);a?(f.addColorStop(0,xe(o,.35*h)),f.addColorStop(1,xe(o,0))):(f.addColorStop(0,`rgba(255,255,255,${.5*h})`),f.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=f,e.fillRect(d-p*2.2,c-p*2.2,p*4.4,p*4.4),e.lineWidth=2,e.strokeStyle=a?xe(o,.85*h):`rgba(255,255,255,${.95*h})`,e.beginPath(),e.arc(d,c,p,0,Math.PI*2),e.stroke(),e.fillStyle=a?xe(o,.9*h):`rgba(255,255,255,${h})`,e.beginPath(),e.arc(d,c,3.5,0,Math.PI*2),e.fill()}}drawPiano(e,t,s,a,o,r,n){let l=this.pianoLayout(),d=t/l.whites,c=d*Es,h=s*as,p=this.store.project.key,f=new Set;for(let[,I]of this.touches)I.col!==void 0&&f.add(I.col);let m=new Map;for(let I of this.ripples)I.col>=0&&m.set(I.col,Math.max(m.get(I.col)||0,(1-(n-I.t)/600)*this.inkShare()));let v=!this.inkUnder,g=(I,N)=>f.has(N)?a?xe(o,.75):"rgba(255,255,255,0.92)":I?a?"#08090c":xe(r,.88):a?"rgba(255,255,255,0.075)":"rgba(255,255,255,0.34)",b=this.under?new Float32Array(64):null,x=l.whites,T=0,R=0;l.keys.forEach((I,N)=>{if(I.black)return;let ie=I.pos*d,K=m.get(N)||0;if(this.under?v&&(b[T]=Math.max(f.has(N)?1:0,K)):(e.fillStyle=g(!1,N),et(e,ie+1,0,d-2,s,Math.min(8,d/4)),e.fill(),K>0&&(e.fillStyle=a?xe(o,.4*K):`rgba(255,255,255,${.5*K})`,et(e,ie+1,0,d-2,s,Math.min(8,d/4)),e.fill())),T++,this.keyMark(e,I,ie+d/2,s-30,a,o,r),d>20||I.isRoot){e.fillStyle=a?"rgba(255,255,255,0.5)":xe(r,.65),e.font=`600 ${d>30?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let P=$s(I.semi,p);e.fillText(I.isRoot||d>30?P:P.replace(/-?\d+$/,""),ie+d/2,s-10)}}),l.keys.forEach((I,N)=>{if(!I.black)return;let ie=I.pos/l.whites*t-c/2,K=m.get(N)||0;this.under?v&&(b[x+R]=Math.max(f.has(N)?1:0,K)):(e.fillStyle=g(!0,N),et(e,ie,-6,c,h+6,Math.min(6,c/4)),e.fill(),a&&!f.has(N)&&(e.strokeStyle="rgba(255,255,255,0.10)",e.lineWidth=1,et(e,ie+.5,-6,c-1,h+5.5,Math.min(6,c/4)),e.stroke()),K>0&&(e.fillStyle=xe(o,.55*K),et(e,ie,-6,c,h+6,Math.min(6,c/4)),e.fill())),R++,this.keyMark(e,I,ie+c/2,h-16,!0,o,r)}),b&&this.fx&&this.fx.keyLights(v?b:null),b&&this.ghouls&&this.ghouls.keyLights(v?b:null)}keyMark(e,t,s,a,o,r,n){!t.inScale&&!t.isRoot||(t.isRoot?e.fillStyle=o?r:n:e.fillStyle=o?"rgba(255,255,255,0.6)":xe(n,.45),e.beginPath(),e.arc(s,a,t.isRoot?3.6:2.6,0,Math.PI*2),e.fill())}drawMelodic(e,t,s,a,o,r,n,l){if(this.piano){this.drawPiano(e,t,s,a,o,r,l);return}let d=this.columns(),c=d.length,h=t/c,p=this.store.project.key;for(let m=0;m<c;m++){let v=d[m],g=m*h,b=(v.octave%2+2)%2===0;this.under||(a?e.fillStyle=b?"rgba(255,255,255,0.035)":"rgba(255,255,255,0)":e.fillStyle=b?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.035)",e.fillRect(g,0,h,s),m>0&&(e.fillStyle=a?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",e.fillRect(g-.5,0,1,s))),m>0&&d[m-1].octave!==v.octave&&(e.fillStyle=a?xe(o,.22):"rgba(255,255,255,0.45)",e.fillRect(g-.75,0,1.5,s)),v.isRoot&&(e.fillStyle=a?xe(o,.75):r,e.globalAlpha=a?1:.55,et(e,g+h/2-3,s-30,6,6,3),e.fill(),e.globalAlpha=1),e.fillStyle=a?"rgba(255,255,255,0.45)":xe(r,.6),e.font=`600 ${h>34?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let x=$s(v.semi,p);(h>22||v.isRoot)&&e.fillText(h>30?x:x.replace(/\d+$/,""),g+h/2,s-10)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let m=new Float32Array(64),v=this.store.settings.ghosts?.6:1;for(let[,g]of this.touches){let b=Math.min(c-1,Math.floor(g.x*c));m[b]=Math.max(m[b],.45)}for(let g of this.ripples)g.col>=0&&g.col<64&&(m[g.col]=Math.max(m[g.col],v*(1-(l-g.t)/600)));this.fx&&this.fx.keyLights(m),this.ghouls&&this.ghouls.keyLights(m);return}for(let[,m]of this.touches){let v=Math.min(c-1,Math.floor(m.x*c));e.fillStyle=a?xe(o,.16):"rgba(255,255,255,0.22)",e.fillRect(v*h,0,h,s)}let f=(this.store.settings.ghosts?.6:1)*this.inkShare();for(let m of this.ripples){if(m.col<0)continue;let v=(l-m.t)/600,g=m.col*h;e.fillStyle=a?xe(o,.45*f*(1-v)):`rgba(255,255,255,${.5*f*(1-v)})`,e.fillRect(g+2,0,h-4,s)}}drawDrums(e,t,s,a,o,r,n,l){let d=t/4,c=this.store.project;for(let h=0;h<4;h++){let p=h*d;this.under||(e.fillStyle=a?h%2?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.0)":h%2?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.1)",e.fillRect(p,0,d,s),h>0&&(e.fillStyle=a?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)",e.fillRect(p-1,0,2,s)));for(let m=1;m<3;m++)e.fillStyle=a?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.05)",e.fillRect(p+m*d/3,s*.18,1,s*.64);let f=this.store.presetFor("d"+h);if(e.textAlign="center",e.fillStyle=a?"rgba(255,255,255,0.85)":xe(r,.85),e.font="750 13px -apple-system, system-ui, sans-serif",e.fillText(["Kick","Snare","Hat","Perc"][h],p+d/2,22),e.font="600 10.5px -apple-system, system-ui, sans-serif",e.fillStyle=a?"rgba(255,255,255,0.45)":xe(r,.6),e.fillText(p0(e,f?f.name:"",d-8),p+d/2,38),f&&f.variants)for(let m=0;m<3;m++)e.beginPath(),e.arc(p+(m+.5)*d/3,s-12,2.2,0,Math.PI*2),e.fill();c.parts.drum.mute[h]&&(e.fillStyle=a?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.35)",e.fillRect(p,0,d,s))}e.font="750 12px -apple-system, system-ui, sans-serif",e.textAlign="center";for(let[,h]of this.touches){let p=h.lane,f=this.store.presetFor("d"+p);if(!f||!f.variants)continue;let m=Math.min(2,Math.max(0,Math.floor((h.x*4-p)*3))),v=f.variants[m]?f.variants[m].name:"",g=Math.min(t-40,Math.max(40,h.x*t)),b=Math.max(70,h.y*s-44);e.fillStyle=a?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.75)";let x=e.measureText(v).width+16;et(e,g-x/2,b-15,x,22,11),e.fill(),e.fillStyle=a?"#fff":r,e.fillText(v,g,b)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let h=new Float32Array(64);for(let p of this.ripples)h[p.lane]=Math.max(h[p.lane],1-(l-p.t)/600);this.fx&&this.fx.keyLights(h),this.ghouls&&this.ghouls.keyLights(h);return}for(let h of this.ripples){let p=(l-h.t)/600,f=h.lane*d,m=e.createLinearGradient(0,s,0,0),v=.55*(1-p)*this.inkShare();a?(m.addColorStop(0,xe(o,v)),m.addColorStop(1,xe(o,0))):(m.addColorStop(0,`rgba(255,255,255,${v})`),m.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=m,e.fillRect(f+2,0,d-4,s)}}},Io=520;function p0(i,e,t){if(i.measureText(e).width<=t)return e;for(;e.length>1&&i.measureText(e+"\u2026").width>t;)e=e.slice(0,-1);return e+"\u2026"}function xe(i,e){if(i=i.trim(),i.startsWith("#")){let t=i.length===4?i.slice(1).split("").map(s=>parseInt(s+s,16)):[1,3,5].map(s=>parseInt(i.slice(s,s+2),16));return`rgba(${t[0]},${t[1]},${t[2]},${e})`}return i.startsWith("color(")?i.replace(/\)\s*$/,` / ${e})`):i.startsWith("rgb(")?i.replace("rgb(","rgba(").replace(")",`,${e})`):i}var Ea=class{constructor(e,{onSelect:t}){this.store=e,this.onSelect=t,this.el=u("div",{class:"tl",role:"img","aria-label":"Frise de la boucle"}),this.cv=u("canvas"),this.el.append(this.cv),this.sel=null,this.drag=null,this.tick=-1,this.el.addEventListener("pointerdown",a=>{a.preventDefault();try{this.el.setPointerCapture(a.pointerId)}catch{}let o=this.tickAt(a);this.drag={id:a.pointerId,t0:o,moved:!1}}),this.el.addEventListener("pointermove",a=>{if(!this.drag||a.pointerId!==this.drag.id)return;let o=this.tickAt(a);Math.abs(o-this.drag.t0)>=24&&(this.drag.moved=!0),this.drag.moved&&(this.sel={t0:Math.min(o,this.drag.t0),t1:Math.max(o,this.drag.t0)+24},this.draw())});let s=a=>{if(!this.drag||a.pointerId!==this.drag.id)return;let o=this.drag;if(this.drag=null,!o.moved)if(this.sel&&o.t0>=this.sel.t0&&o.t0<this.sel.t1)this.sel=null;else{let r=Math.floor(o.t0/384);this.sel={t0:r*384,t1:(r+1)*384}}this.draw(),this.onSelect(this.sel)};this.el.addEventListener("pointerup",s),this.el.addEventListener("pointercancel",s),new ResizeObserver(()=>this.draw()).observe(this.el)}get L(){return 384*this.store.project.bars}tickAt(e){let t=this.el.getBoundingClientRect(),s=Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width));return Math.floor(s*this.L/24)*24}clear(){this.sel=null,this.draw()}setTick(e){e!==this.tick&&(this.tick=e,this.draw())}draw(){let{w:e,h:t,d:s}=Wt(this.cv),a=this.cv.getContext("2d");a.setTransform(s,0,0,s,0,0),a.clearRect(0,0,e,t);let o=this.store.project,r=this.store.ui,n=this.L,l=Ze("--accent"),d=Ze("--ink"),c=Ze("--line-2"),h=f=>f/n*e;for(let f=0;f<=o.bars;f++)a.fillStyle=c,a.fillRect(Math.round(h(f*384))-.5,0,1,t);for(let f=0;f<n;f+=96)a.fillStyle=c,a.globalAlpha=.5,a.fillRect(Math.round(h(f)),t-5,1,5),a.globalAlpha=1;this.sel&&(a.fillStyle=xe(l,.28),et(a,h(this.sel.t0)+1,2,h(this.sel.t1)-h(this.sel.t0)-2,t-4,6),a.fill(),a.strokeStyle=l,a.lineWidth=1.5,a.stroke());let p=o.patterns[o.current];if(r.part==="drum"){let f=(t-8)/4;for(let m=0;m<4;m++){a.fillStyle=d,a.globalAlpha=m===r.lane?.95:.6;for(let v of p.drum[m].hits){let g=h(v.t),b=Math.max(2,e/(n/24)*.55);et(a,g,4+m*f+1,b,f-2,1.5),a.fill()}}a.globalAlpha=1}else{let f=p[r.part].notes;if(f.length){let m=1/0,v=-1/0;for(let T of f){let R=Jt(T.deg,T.acc,o.scale);m=Math.min(m,R),v=Math.max(v,R)}let g=Math.max(12,v-m+1);a.fillStyle=d,a.strokeStyle=d;let b=null,x=f.slice().sort((T,R)=>T.t-R.t);for(let T of x){let R=Jt(T.deg,T.acc,o.scale),I=t-6-(R-m)/g*(t-12),N=h(T.t),ie=Math.max(2.5,h(T.t+T.d)-N-1);a.globalAlpha=.85,et(a,N,I-2.5,ie,5,2.5),a.fill(),T.tie&&b&&(a.lineWidth=1.5,a.beginPath(),a.moveTo(b.x,b.y),a.lineTo(N+1,I),a.stroke()),b={x:N+ie,y:I}}a.globalAlpha=1}}r.playing&&this.tick>=0&&(a.fillStyle=r.armed?Ze("--rec"):l,a.fillRect(h(this.tick)-1,0,2,t))}};var _a=class{constructor(e){this.store=e,this.groupsEl=u("div",{class:"groups",role:"tablist"}),this.el=u("div",{class:"pad",role:"application","aria-label":"Surface de transformation"}),this.cv=u("canvas"),this.axX=u("div",{class:"ax x"}),this.axY=u("div",{class:"ax y"}),this.el.append(this.cv,this.axX,this.axY),this.info=u("div",{class:"info"}),this.clearBtn=u("button",{class:"pill",text:"Effacer les mouvements",onclick:()=>this.clearAuto()}),this.barEl=u("div",{class:"autobar"},this.info,this.clearBtn),this.touch=new Map,this.live=null,this.fx=null,this.gpu=!1,this.prev=new Map,this.el.addEventListener("pointerdown",t=>this.down(t)),this.el.addEventListener("pointermove",t=>this.move(t)),this.el.addEventListener("pointerup",t=>this.up(t)),this.el.addEventListener("pointercancel",t=>this.up(t)),new ResizeObserver(()=>this.draw()).observe(this.el)}groups(){let e=this.store,t=e.ui.part;if(t==="drum")return[0,1,2,3].map(o=>{let r=e.presetFor("d"+o),n=r&&r.macros||[];return{label:["Kick","Snare","Hat","Perc"][o],sub:r?r.name:"",target:"d"+o,sx:0,sy:1,xName:n[0]?n[0].name:"X",yName:n[1]?n[1].name:"Y"}});let s=e.presetFor(t);return(s&&s.groups||["Groupe 1","Groupe 2","Groupe 3"]).map((o,r)=>{let n=s.macros[r*2],l=s.macros[r*2+1];return{label:o,sub:`${n?n.name:"X"} \xB7 ${l?l.name:"Y"}`,target:t,sx:r*2,sy:r*2+1,xName:n?n.name:"X",yName:l?l.name:"Y"}})}value(e,t){let s=this.store;for(let[,a]of this.touch){let o=this.groups()[a];if(o.target===e.target&&(o.sx===t||o.sy===t)&&this.touchVals&&this.touchVals[e.target+":"+t]!==void 0)return this.touchVals[e.target+":"+t]}if(this.live&&s.ui.playing){if(e.target==="bass")return this.live[8+t];if(e.target==="lead")return this.live[15+t];let a=+e.target.slice(1);return this.live[a*2+t]}return s.macroValue(e.target,t)}hasAuto(e){let s=this.store.pattern.auto[e.target];return!!(s&&(s[e.sx]||s[e.sy]))}render(){let e=this.groups(),t=Math.min(this.store.ui.group,e.length-1);this.groupsEl.replaceChildren(...e.map((o,r)=>u("button",{class:"grp"+(this.hasAuto(o)?" auto":""),role:"tab","aria-selected":String(r===t),onclick:()=>{this.store.ui.group=r,this.render()}},u("span",{class:"num",text:String(r+1)}),u("b",{text:o.label}),u("small",{text:o.sub}),u("i",{class:"rec"}))));let s=e[t];this.axX.textContent=s.xName+" \u2192",this.axY.textContent=s.yName+" \u2192";let a=e.filter(o=>this.hasAuto(o)).length;this.info.textContent=this.store.ui.armed?"REC : bouge un point pendant la lecture pour enregistrer":a?`${a} groupe${a>1?"s":""} avec mouvements enregistr\xE9s`:"Glisse un point \xB7 plusieurs doigts possibles",this.clearBtn.disabled=!this.hasAuto(s),this.draw()}pos(e){let t=this.el.getBoundingClientRect();return{x:Math.min(1,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,1-(e.clientY-t.top)/t.height))}}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.pos(e),s=this.groups(),a=this.el.getBoundingClientRect(),o=-1,r=1/0;s.forEach((l,d)=>{if([...this.touch.values()].includes(d))return;let c=(this.value(l,l.sx)-t.x)*a.width,h=(this.value(l,l.sy)-t.y)*a.height,p=Math.hypot(c,h);p<r&&(r=p,o=d)});let n=r<44?o:Math.min(this.store.ui.group,s.length-1);[...this.touch.values()].includes(n)||(this.touch.set(e.pointerId,n),this.store.ui.group=n,this.send(s[n],t,"down"),this.render())}move(e){let t=this.touch.get(e.pointerId);t!==void 0&&(this.send(this.groups()[t],this.pos(e),"move"),this.draw())}up(e){let t=this.touch.get(e.pointerId);if(t===void 0)return;this.touch.delete(e.pointerId);let s=this.groups()[t];this.fx&&this.fx.press(s.target+":"+s.sx,0,0,"up"),this.store.send({type:"tweak",target:s.target,slot:s.sx,phase:"up"}),this.store.send({type:"tweak",target:s.target,slot:s.sy,phase:"up"}),this.render()}releaseAll(){let e=this.groups();for(let[,t]of this.touch){let s=e[t];s&&(this.store.send({type:"tweak",target:s.target,slot:s.sx,phase:"up"}),this.store.send({type:"tweak",target:s.target,slot:s.sy,phase:"up"}))}this.touch.clear()}send(e,t,s){if(this.fx&&this.fx.press(e.target+":"+e.sx,t.x,1-t.y,s==="down"?"down":"move"),this.fx){let a=e.target+":"+e.sx,o=this.prev.get(a);this.fx.stir(e.target,t.x,1-t.y,o?t.x-o.x:0,o?o.y-t.y:0,!0),this.prev.set(a,{x:t.x,y:t.y})}this.touchVals=this.touchVals||{},this.touchVals[e.target+":"+e.sx]=t.x,this.touchVals[e.target+":"+e.sy]=t.y,this.store.send({type:"tweak",target:e.target,slot:e.sx,value:t.x,phase:s}),this.store.send({type:"tweak",target:e.target,slot:e.sy,value:t.y,phase:s})}clearAuto(){let e=this.groups(),t=e[Math.min(this.store.ui.group,e.length-1)];this.store.clearAuto(t.target,t.sx),this.store.clearAuto(t.target,t.sy),this.render()}onPos(e){this.live=e.mac,(this.store.ui.playing||this.touch.size)&&this.draw()}draw(){let{w:e,h:t,d:s}=Wt(this.cv),a=this.cv.getContext("2d");a.setTransform(s,0,0,s,0,0);let o=document.documentElement.dataset.theme==="dark",r=Ze("--accent"),n=Ze("--accent-ink");if(a.clearRect(0,0,e,t),this.fx&&this.fx.syncScene(),this.gpu&&(a.save(),et(a,0,0,e,t,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),a.clip()),!this.gpu){if(o){let c=a.createLinearGradient(0,0,e,t);c.addColorStop(0,"#1b1d24"),c.addColorStop(1,"#121318"),a.fillStyle=c}else a.fillStyle=r;a.fillRect(0,0,e,t),a.strokeStyle=o?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",a.lineWidth=1;for(let c=1;c<4;c++)a.beginPath(),a.moveTo(c*e/4,0),a.lineTo(c*e/4,t),a.stroke(),a.beginPath(),a.moveTo(0,c*t/4),a.lineTo(e,c*t/4),a.stroke()}let l=this.groups(),d=Math.min(this.store.ui.group,l.length-1);l.forEach((c,h)=>{let p=this.value(c,c.sx)*e,f=(1-this.value(c,c.sy))*t,m=[...this.touch.values()].includes(h);if(this.fx&&!m){let b=c.target+":"+c.sx,x=this.prev.get(b),T=p/e,R=1-f/t;x&&this.store.ui.playing&&Math.hypot(T-x.x,R-x.y)>.003&&this.fx.stir(c.target,T,1-R,T-x.x,x.y-R,!1),this.prev.set(b,{x:T,y:R})}let v=m?120:70,g=a.createRadialGradient(p,f,0,p,f,v);o?(g.addColorStop(0,xe(r,h===d?.4:.18)),g.addColorStop(1,xe(r,0))):(g.addColorStop(0,`rgba(255,255,255,${h===d?.5:.25})`),g.addColorStop(1,"rgba(255,255,255,0)")),a.fillStyle=g,a.fillRect(p-v,f-v,2*v,2*v),a.beginPath(),a.arc(p,f,m?26:21,0,Math.PI*2),a.fillStyle=o?h===d?xe(r,.95):"rgba(255,255,255,0.12)":h===d?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.4)",a.fill(),a.lineWidth=2,a.strokeStyle=o?xe(r,.9):"rgba(255,255,255,0.95)",a.stroke(),a.fillStyle=o?h===d?n:"rgba(255,255,255,0.9)":n,a.font="800 14px -apple-system, system-ui, sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillText(String(h+1),p,f+1),this.hasAuto(c)&&(a.beginPath(),a.arc(p+17,f-17,4,0,Math.PI*2),a.fillStyle=Ze("--rec"),a.fill())}),a.textBaseline="alphabetic",this.gpu&&a.restore()}};var m0=96,v0=[36,38,42,63],Fo={0:[36,36,35],1:[37,38,40],2:[42,44,46],3:[64,63,62]};function zo(i){let e=[i&127];for(;i>>=7;)e.unshift(i&127|128);return e}function Ri(i){return Array.from(i,e=>e.charCodeAt(0)&127)}function No(i){return[i>>>24&255,i>>>16&255,i>>>8&255,i&255]}function Li(i){return[i>>>8&255,i&255]}function Da(i,e){e.sort((a,o)=>a.t-o.t||a.order-o.order);let t=[0,255,3,...zo(i.length),...Ri(i)],s=0;for(let a of e)t.push(...zo(Math.max(0,a.t-s)),...a.data),s=a.t;return t.push(0,255,47,0),[...Ri("MTrk"),...No(t.length),...t]}function Ho(i,{loops:e=1}={}){let t=384*i.bars,s=i.song&&i.song.enabled&&i.song.sections.length?i.song.sections:[{p:i.current,reps:e,mute:{}}],a=[],o=[],r=[],n=0;for(let p of s){let f=i.patterns[p.p]||i.patterns[0];for(let m=0;m<(p.reps||1);m++){for(let v=0;v<4;v++)if(!(i.parts.drum.mute[v]||p.mute&&p.mute["d"+v]))for(let g of f.drum[v].hits){let b=Fo[v]&&Fo[v][g.x]||v0[v],x=Math.max(1,Math.round(g.v*127));a.push({t:n+g.t,order:1,data:[153,b,x]}),a.push({t:n+g.t+12,order:0,data:[137,b,0]})}for(let[v,g,b]of[["bass",o,0],["lead",r,1]])if(!(i.parts[v].mute||p.mute&&p.mute[v]))for(let x of f[v].notes){let T=Math.max(0,Math.min(127,ho(x.deg,x.acc,i.key,i.scale,48))),R=Math.max(1,Math.round(x.v*127));g.push({t:n+x.t,order:1,data:[144|b,T,R]}),g.push({t:n+x.t+Math.max(1,Math.min(x.d,t)),order:0,data:[128|b,T,0]})}n+=t}}let l=Math.round(6e7/i.tempo),d=[{t:0,order:0,data:[255,81,3,l>>16&255,l>>8&255,l&255]},{t:0,order:0,data:[255,88,4,4,2,24,8]}],c=[Da(i.name||"MOTIF",d),Da("Batterie",a),Da("Basse",o),Da("M\xE9lodie",r)],h=[...Ri("MThd"),...No(6),...Li(1),...Li(c.length),...Li(m0)];return new Uint8Array([...h,...c.flat()])}var g0=(()=>{let i=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let s=0;s<8;s++)t=t&1?3988292384^t>>>1:t>>>1;i[e]=t>>>0}return i})();function b0(i){let e=4294967295;for(let t=0;t<i.length;t++)e=g0[(e^i[t])&255]^e>>>8;return(e^4294967295)>>>0}function Uo(i){let e=new TextEncoder,t=[],s=[],a=0,o=new Date,r=o.getHours()<<11|o.getMinutes()<<5|o.getSeconds()>>1,n=o.getFullYear()-1980<<9|o.getMonth()+1<<5|o.getDate();for(let c of i){let h=e.encode(c.name),p=b0(c.data),f=new DataView(new ArrayBuffer(30));f.setUint32(0,67324752,!0),f.setUint16(4,20,!0),f.setUint16(6,2048,!0),f.setUint16(8,0,!0),f.setUint16(10,r,!0),f.setUint16(12,n,!0),f.setUint32(14,p,!0),f.setUint32(18,c.data.length,!0),f.setUint32(22,c.data.length,!0),f.setUint16(26,h.length,!0),f.setUint16(28,0,!0),t.push(new Uint8Array(f.buffer),h,c.data);let m=new DataView(new ArrayBuffer(46));m.setUint32(0,33639248,!0),m.setUint16(4,20,!0),m.setUint16(6,20,!0),m.setUint16(8,2048,!0),m.setUint16(10,0,!0),m.setUint16(12,r,!0),m.setUint16(14,n,!0),m.setUint32(16,p,!0),m.setUint32(20,c.data.length,!0),m.setUint32(24,c.data.length,!0),m.setUint16(28,h.length,!0),m.setUint32(42,a,!0),s.push(new Uint8Array(m.buffer),h),a+=30+h.length+c.data.length}let l=s.reduce((c,h)=>c+h.length,0),d=new DataView(new ArrayBuffer(22));return d.setUint32(0,101010256,!0),d.setUint16(8,i.length,!0),d.setUint16(10,i.length,!0),d.setUint32(12,l,!0),d.setUint32(16,a,!0),new Blob([...t,...s,new Uint8Array(d.buffer)],{type:"application/zip"})}var bs=null,y0=0,qs=new Map;function x0(i){return bs||(bs=new Worker("export-worker.js?v="+i),bs.onmessage=e=>{let t=e.data,s=qs.get(t.id);s&&(t.type==="progress"?s.onProgress&&s.onProgress(t.value):t.type==="done"?(qs.delete(t.id),s.resolve(t)):t.type==="error"&&(qs.delete(t.id),s.reject(new Error(t.message))))},bs.onerror=e=>{for(let[,t]of qs)t.reject(new Error(e.message||"Erreur du moteur d\u2019export"));qs.clear(),bs=null},bs)}function Cs(i){return(i||"motif").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-zA-Z0-9 _-]+/g,"").trim().replace(/\s+/g,"-").slice(0,40)||"motif"}async function jo(i,e,{stems:t=!1,loops:s=2,sr:a=48e3,bits:o=24,onProgress:r,build:n}){let l=JSON.parse(JSON.stringify(i.project)),d=[];for(let b=0;b<4;b++)d.push({part:"drum",lane:b,preset:qe(l.parts.drum.kit[b]),macros:l.parts.drum.macros[b]});d.push({part:"bass",preset:qe(l.parts.bass.preset),macros:l.parts.bass.macros}),d.push({part:"lead",preset:qe(l.parts.lead.preset),macros:l.parts.lead.macros});let c=Array.from(e.samples.values()).map(b=>({id:b.id,sr:b.sr,data:b.data,gain:b.gain,loopStart:b.loopStart,loopEnd:b.loopEnd})),h=++y0,p=x0(n),f=await new Promise((b,x)=>{qs.set(h,{resolve:b,reject:x,onProgress:r}),p.postMessage({type:"render",id:h,project:l,presets:d,samples:c,sampleSets:e.sampleSets,stems:t,loops:s,sr:a,bits:o})}),m=Cs(l.name),v={null:"mix",d0:"kick",d1:"snare",d2:"hat",d3:"perc",bass:"basse",lead:"melodie"};return f.files.map(b=>({name:`${m}-${v[b.group]}.wav`,data:new Uint8Array(b.wav),peak:b.peak,seconds:b.seconds,group:b.group}))}async function Ai(i,e,t){let s={id:fs(),name:i,created:Date.now(),size:e.size,type:e.type,blob:e,...t};return await vt.put("renders",s),s}function Go(i){let e=Ho(i.project,{loops:1});return new File([e],`${Cs(i.project.name)}.mid`,{type:"audio/midi"})}function Wo(i){return new File([i.exportProjectJSON()],`${Cs(i.project.name)}.motif.json`,{type:"application/json"})}function Vo(i){return Uo(i.map(e=>({name:e.name,data:e.data})))}async function Zs(i){try{if(navigator.canShare&&navigator.canShare({files:[i]}))return await navigator.share({files:[i],title:i.name}),"shared"}catch(s){if(s&&s.name==="AbortError")return"cancelled"}let e=URL.createObjectURL(i),t=document.createElement("a");return t.href=e,t.download=i.name,document.body.append(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(e),6e4),"downloaded"}var Ko={phonk:{bassR:11,leadR:9,roots:[0,0,-2,-3],contour:[7,8,7,4,7,8,9,7],bassTies:2,leadSteps:7},ukg:{bassR:10,leadR:8,roots:[0,-2,-4,-3],contour:[9,7,9,11],bassTies:1,leadSteps:7},afro:{bassR:8,leadR:7,roots:[0,0,-2,-3],contour:[7,9,11,9,7,6],bassTies:0,leadSteps:5},amapiano:{bassR:13,leadR:3,roots:[0,-3,-2,-4],contour:[9,11,9,7],bassTies:2,leadSteps:7,chords:!0},reggaeton:{bassR:11,leadR:7,roots:[0,-2,-3,-1],contour:[7,9,10,9,7,6],bassTies:0,leadSteps:7},jersey:{bassR:14,leadR:14,roots:[0,-2,-3,-2],contour:[11,9,7,9],bassTies:0,leadSteps:7,chords:!0},dnb:{bassR:2,leadR:1,roots:[0,-3,-2,-4],contour:[9,11,12,11],bassTies:1,leadSteps:7,chords:!0},rage:{bassR:1,leadR:15,roots:[0,-1,-3,-4],contour:[7,11,14,11,9,7],bassTies:0,leadSteps:7},hardtechno:{bassR:5,leadR:4,roots:[0,0,1,0],contour:[7,7,8,7],bassTies:3,leadSteps:7},triphop:{bassR:3,leadR:2,roots:[0,-2,-3,-4],contour:[9,7,6,4],bassTies:1,leadSteps:7,chords:!0}};function k0(i,e,t,s){let a=is[i][e],o=384*t,r=[];if(!a||!a.len)return r;for(let n=0;n<o;n+=a.len)for(let[l,,d]of a.ev){if(n+l>=o)continue;let c=1;i===2&&(c=0),r.push({t:n+l,v:d?.95:.74,x:c,c:.5})}return i===2&&s&&r.length&&(r[r.length-1].x=2),i===1&&r.length>2&&(r[r.length-1].v=1),r}function Yo(i,e,t,{ties:s=0,chord:a=null}={}){let o=jt[i],r=384*e,n=[];if(!o||!o.len)return n;let l=o.ev.length,d=new Set;for(let h=0;h<s;h++)d.add(Math.round((h+1)*l/(s+1)));let c=0;for(let h=0;h<r;h+=o.len)o.ev.forEach(([p,f,m],v)=>{if(h+p>=r)return;let g=d.has(v)&&v>0,b=f;d.has((v+1)%l)&&(b=((v+1)%l===0?o.len+o.ev[0][0]:o.ev[v+1][0])-p+3);let x=t(h+p,c++),T=m?.95:.8;if(a)for(let R of a)n.push({t:h+p,d:Math.min(b,r-h-p),deg:x+R,acc:0,v:T*.9,tie:!1});else n.push({t:h+p,d:Math.min(b,r-h-p),deg:x,acc:0,v:T,tie:g})});return n}function Xo(i){let e=qt.find(d=>d.style===i),t=Ct(i),s=Ko[i],a=Zt({kit:e.kit.slice(),bass:e.bass,lead:e.lead,tempo:t.bpm,key:t.key,scale:t.scale,name:"Exemple "+t.short});a.parts.drum.rhythm=e.rhythm.slice(),a.parts.bass.rhythm=s.bassR,a.parts.bass.ties=s.bassTies,a.parts.lead.rhythm=s.leadR,a.parts.lead.steps=s.leadSteps;let o=2,r=384,n=d=>s.roots[Math.floor(d/(r/2))%s.roots.length],l=d=>{let c=Qt(d?"B":"A");for(let h=0;h<4;h++){let p=d&&h===2?Math.min(16,e.rhythm[h]+1):e.rhythm[h];c.drum[h].hits=k0(h,p,o,d)}if(d&&c.drum[1].hits.length)for(let h of[r*2-48,r*2-24])c.drum[1].hits.push({t:h,v:.7,x:0,c:.5});return c.bass.notes=Yo(s.bassR,o,h=>n(h)-7,{ties:s.bassTies}),c.lead.notes=Yo(s.leadR,o,(h,p)=>s.contour[(p+(d?2:0))%s.contour.length]+(s.chords?n(h):0),{chord:s.chords?[0,2,4]:null}),d||(c.lead.notes=c.lead.notes.filter(h=>h.t<r||!s.chords||h.t%96===0)),c};return a.patterns=[l(!1),l(!0)],a.song={enabled:!1,sections:[]},a}var $o=Object.keys(Ko);var Jo={jamal:{levels:[-.5,-4,-4,-7,5,3.5],macros:{},mix:{master:-2.5}},solto:{levels:[2.5,-2.5,-1.5,-7.5,1.5,3],macros:{lead:[null,.2],bass:[.25]},mix:{drumDrive:.17,master:-3.5}},cimetiere:{levels:[1,-3.5,-5.5,-5.5,6,-2.5],macros:{},mix:{master:-2}},rebond:{levels:[3,-4,.5,-2.5,-.5,1],macros:{},mix:{master:-2}},costumes:{levels:[4.5,-3,-6,-5.5,3,1.5],macros:{},mix:{master:-2.5}},escalier:{levels:[1,0,-7.5,-3.5,3,2],macros:{lead:[.3]},mix:{master:-3.5}},ete2011:{levels:[1,-.5,-2,-3.5,-1,3.5],macros:{},mix:{master:-1.5}},mondial:{levels:[-1.5,-4,-7,-5.5,3,-.5],macros:{d2:[null,.2],lead:[1],bass:[null,null,null,.15]},mix:{master:-1.5}},conscience:{levels:[-.5,-.5,-8.5,-4,2.5,2.5],macros:{lead:[.2]},mix:{master:-3}},piste:{levels:[2.5,-3.5,-5.5,-2.5,2.5,2.5],macros:{},mix:{master:-1}},contagion:{levels:[1.5,-3.5,-1,-2,2.5,.5],macros:{lead:[.85]},mix:{master:0}},logdrum:{levels:[2,-3.5,-4,1,3,.5],macros:{},mix:{master:-1}},baile150:{levels:[-3,-6.5,-8,-10,1,6],macros:{},mix:{drumDrive:.15,master:-1}},garage:{levels:[0,-3.5,-4.5,2,.5,1.5],macros:{},mix:{master:-.5}},liquide:{levels:[1,-1.5,-3.5,0,4.5,-.5],macros:{},mix:{master:-3}},rage:{levels:[1,-4.5,-5.5,-7,5,6],macros:{lead:[null,.25]},mix:{master:-2.5}},afrohouse:{levels:[0,-1,-8,-2.5,1.5,5],macros:{lead:[.75]},mix:{master:-1.5}},perreo:{levels:[-1,-4,-2.5,-4.5,4.5,2],macros:{d1:[null,.3]},mix:{master:-1}},hardtechno:{levels:[-.5,-4,-7,-5.5,3.5,3],macros:{},mix:{master:-2.5}},brume:{levels:[5,0,-.5,2,2.5,-2],macros:{},mix:{master:-1}}};var es=384,ea=es/16,ys=i=>Math.round(i*100)/100,zt=i=>Math.round(i*1e3)/1e3,ta=i=>Math.max(0,Math.min(1,i));function w0(i){let e=Math.imul(i|0,2654435761)>>>0||1;return()=>(e^=e<<13,e>>>=0,e^=e>>>17,e^=e<<5,e>>>=0,e/4294967296)}var S0=i=>{let e=7;for(let t of i)e=Math.imul(e,31)+t.charCodeAt(0)|0;return e};function Qo(i){let e=/^(-?\d+)([b#]?)$/.exec(i);if(!e)throw new Error("touche "+i);return[+e[1],e[2]==="b"?-1:e[2]==="#"?1:0]}function T0(i){let e=[],t=0,s=null;for(let a of i.trim().split(/\s+/)){if(a==="|")continue;if(a==="."){s&&s.len++,t++;continue}if(a==="_"){s=null,t++;continue}let o=a.startsWith("/"),r=a.endsWith(">"),n=a.replace(/^\//,"").replace(/>$/,"").split("+").map(Qo);s={step:t,len:1,keys:n,accent:r,slide:o},e.push(s),t++}return e}var Ei=class{constructor(e,t,s){this.song=e,this.L=es*e.bars,this.R=w0(s),this.pat=Qt(t)}hold(e,t,s,a,o,r,n){let l=this.R()*6.28,d=this.R()*6.28,c=Math.min(s,this.L-1);for(let p=t;p<=c;p+=12){let f=p-t,m=n!==void 0&&f<30?n+(a-n)*(f/30):a,v=[p,zt(ta(m+.035*Math.sin(f/70+l)+.012*(this.R()-.5))),zt(ta(o+.025*Math.sin(f/115+d)+.008*(this.R()-.5)))];e.push(r?v.concat(r):v)}let h=e[e.length-1];return h&&h[0]<c-3&&e.push(r?[c,h[1],h[2],...r]:[c,h[1],h[2]]),e}lane(e,t,s,a,{x:o=1,y:r=.5,f:n=.9}={}){let l=is[e][t],d=s*es,c=Math.min(a*es,this.L);for(let h=d;h<c;h+=l.len)for(let[p,,f]of l.ev)h+p>=c||this.pat.drum[e].hits.push({t:h+p,v:ys((f?1:.78)*(.55+.45*n)),x:o,c:ys(r)});return this.pat.gest.drum.push({l:e,p:this.hold([],d,c-4,(o+.5)/3+(this.R()-.5)*.1,r)}),this}lanes(e,t,s,a=[]){return e.forEach((o,r)=>{o!=null&&this.lane(r,o,t,s,a[r]||{})}),this}taps(e,t,s,{x:a=1,y:o=.5}={}){let r=0,n=s.replace(/[\s|]/g,"").length;(n%16||t*es+n*ea>this.L)&&(this.song.warnings=this.song.warnings||[]).push(`${this.song.id} ${this.pat.name} taps ${e}: ${n} pas`);for(let l of s.replace(/[\s|]/g,"")){let d=t*es+r*ea;if(d>=this.L)break;if(l!=="."){let c=ta(o+(this.R()-.5)*.08);this.pat.drum[e].hits.push({t:d,v:l==="X"?.98:l==="o"?.5:.8,x:a,c:ys(c)});let h=(a+.5)/3+(this.R()-.5)*.14,p=[[d,zt(h),zt(c)]];d+10<this.L&&p.push([d+10,zt(h+.012),zt(c-.012)]),d+18<this.L&&p.push([d+18,zt(h+.02),zt(c-.02)]),this.pat.gest.drum.push({l:e,p})}r++}return this}line(e,t,s,{y:a=.55,lift:o=.2,v:r=.84,gap:n=.12}={}){let l=T0(s),d=t*es,c=s.trim().split(/\s+/).filter(v=>v!=="|").length;(c%16||d+c*ea>this.L)&&(this.song.warnings=this.song.warnings||[]).push(`${this.song.id} ${this.pat.name} ${e}: ${c} doubles croches`);let h=l.flatMap(v=>v.keys.map(g=>g[0])),p=Math.min(...h),f=Math.max(1,Math.max(...h)-p),m=null;return l.forEach((v,g)=>{let b=d+v.step*ea;if(b>=this.L)return;let x=l[g+1],T=!!(x&&x.slide&&x.step===v.step+v.len&&v.keys.length===1&&x.keys.length===1),R=Math.max(6,Math.min(this.L-b,Math.round(v.len*ea*(T?1:1-n)))),I=ys((v.accent?.98:r)*(.93+.07*this.R()));v.keys.forEach(([N,ie],K)=>{let P=ta(a+o*((N-p)/f-.5)+(this.R()-.5)*.04);if(this.pat[e].notes.push({t:b,d:R,deg:N,acc:ie,v:I,tie:v.slide&&v.keys.length===1,y:ys(P)}),v.keys.length===1){let Z;v.slide&&m?Z=this.glide(m.p,b,N,ie,P):(m={p:[]},this.pat.gest[e].push(m)),this.hold(m.p,b,b+R-3,.5+(this.R()-.5)*.18,P,[N,ie],Z),T||(m=null)}else{let Z={p:[]};this.hold(Z.p,b+K*2,b+R-3,.5+(this.R()-.5)*.2,P,[N,ie]),this.pat.gest[e].push(Z),m=null}})}),this}glide(e,t,s,a,o){let r=e[e.length-1];if(!r)return;let n=r[3],l=s>n||s===n&&a>r[4],d=l?.94:.06;e.push([Math.max(r[0]+1,t-7),d,zt(o),n,r[4]]);let c=Math.abs(s-n);for(let h=1;h<c;h++)e.push([t-7+Math.round(6*h/c),.5,zt(o),n+(l?h:-h),0]);return l?.08:.92}chords(e,t,s,{arp:a="chord",v:o=.9,legato:r=.92}={}){let n=jt[t];for(let[l,d,c,h=.5]of s){let p=c.split("+").map(Qo),f=Math.round(l*es),m=Math.min(Math.round((l+d)*es),this.L),v=a==="up"?p.slice().sort((b,x)=>b[0]+b[1]/3-x[0]-x[1]/3):a==="down"?p.slice().sort((b,x)=>x[0]+x[1]/3-b[0]-b[1]/3):p,g=0;for(let b=f;b<m;b+=n.len)for(let[x,T,R]of n.ev){let I=b+x;if(I>=m)continue;let N=ys((R?.98:.8)*(.7+.3*o)),ie=p.length===1||a==="chord"?p:[v[g++%v.length]];for(let[K,P]of ie)this.pat[e].notes.push({t:I,d:Math.max(6,Math.min(Math.round(T*r),m-I)),deg:K,acc:P,v:N,tie:!1,y:ys(h)})}p.forEach(([b,x],T)=>this.pat.gest[e].push({p:this.hold([],f+T*3,m-6,.5+(this.R()-.5)*.2,h,[b,x])}))}return this}move(e,t,s){let a=this.L/12,o=this.pat.auto[e]=this.pat.auto[e]||{},r=this.R()*6.28;return o[t]=Array.from({length:a},(n,l)=>zt(ta(s(l/a)+.006*Math.sin(l/5+r)))),this}done(){let e=this.pat;for(let t of e.drum)t.hits.sort((s,a)=>s.t-a.t);for(let t of["bass","lead"])e[t].notes.sort((s,a)=>s.t-a.t||s.deg-a.deg);return e}},M0=i=>({d0:i.includes("k"),d1:i.includes("s"),d2:i.includes("h"),d3:i.includes("p"),bass:i.includes("b"),lead:i.includes("l")});function L0(i,e,t){let s=[],a=!1;for(let h of i.patterns)for(let p of h[e].notes)s.push(Jt(p.deg,p.acc,i.scale)),p.acc&&(a=!0);if(!s.length)return{steps:i.parts[e].steps,range:i.parts[e].range};let o=a?12:t||7,r=Math.min(36,Math.max(...s)),n=Math.max(-24,Math.min(...s)),l=h=>{let p=1;for(;p<24;){let f=Pt({lo:h,n:p},i.scale,o);if(f[f.length-1].semi>=r)break;p++}return p},d=e==="bass"?8:10,c=l(n);for(let h=0;h<2&&c<d&&n>-24;h++){let p=Pt({lo:n-3,n:1},i.scale,o)[0].semi;p<n&&p>=-24&&(n=p,c=l(n))}return{steps:o,range:{lo:n,n:Math.max(c,d)}}}function R0(i,e=!1){let t=Zt({kit:i.kit,bass:i.bass,lead:i.lead,tempo:i.tempo,key:i.key,scale:i.scale,name:i.name});t.bars=i.bars,t.swing=i.swing||50,t.parts.drum.rhythm=i.dials.slice(0,4),t.parts.bass.rhythm=i.dials[4],t.parts.lead.rhythm=i.dials[5],i.arp&&(t.parts.bass.arp=i.arp[0],t.parts.lead.arp=i.arp[1]);let s=i.macros||{};for(let r=0;r<4;r++)s["d"+r]&&(t.parts.drum.macros[r]=s["d"+r].concat(Array(7).fill(null)).slice(0,7));for(let r of["bass","lead"])s[r]&&(t.parts[r].macros=s[r].concat(Array(7).fill(null)).slice(0,7));i.levels&&(t.parts.drum.level=i.levels.slice(0,4),t.parts.bass.level=i.levels[4],t.parts.lead.level=i.levels[5]),Object.assign(t.mix,i.mix||{});let a=!e&&Jo[i.id];if(a){a.levels&&(t.parts.drum.level=a.levels.slice(0,4),t.parts.bass.level=a.levels[4],t.parts.lead.level=a.levels[5]);for(let[r,n]of Object.entries(a.macros||{})){let l=/^d\d$/.test(r)?+r[1]:-1,c=((l>=0?t.parts.drum.macros[l]:t.parts[r].macros)||Array(7).fill(null)).slice();n.forEach((h,p)=>{h!=null&&(c[p]=h)}),l>=0?t.parts.drum.macros[l]=c:t.parts[r].macros=c}Object.assign(t.mix,a.mix||{})}let o=S0(i.id);t.patterns=i.takes.map((r,n)=>{let l=new Ei(i,String.fromCharCode(65+n),o+n*977);return r(l),l.done()});for(let r of["bass","lead"])Object.assign(t.parts[r],L0(t,r,i.steps&&i.steps[r]));return t.song={enabled:!0,sections:i.song.map(([r,n,l=""])=>({p:r,reps:n,mute:M0(l)}))},t.current=0,t}var ct=(i,e)=>t=>i+(e-i)*(.5-.5*Math.cos(Math.PI*t)),Ce=(i,e,t=1)=>s=>i+e*Math.sin(2*Math.PI*t*s),_i=[{id:"jamal",name:"Passinho na laje",trend:"Brega funk du Passinho do Jamal",ref:"Dans l\u2019esprit de \xAB Toma Botada \xBB (Eo Chapa et MC Rog\xEA, 2025-26), le son du Passinho do Jamal. Tempo et tonalit\xE9 : ceux du genre.",tempo:160,key:2,scale:"minor",bars:4,kit:["kick.perreo","snare.claplarge","hat.perreo","perc.timbal"],bass:"bass.subperreo",lead:"lead.perreo",dials:[7,1,2,3,7,0],arp:["order","order"],macros:{d0:[.62,.45],d3:[.55,.6],bass:[.7,.55,.7,.45,.1,.15],lead:[.35,.6,.3,.2,.35,.3]},mix:{pump:.35,space:.35,drumDrive:.22,drumSpace:.08},takes:[i=>i.lanes([7,1,2,3],0,4,[{y:.62},{y:.5},{x:0,y:.35},{y:.58}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]),i=>i.lanes([7,1,2,3],0,4,[{y:.62},{y:.5},{x:0,y:.38},{y:.58}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).line("lead",0,"7> . _ 6 . _ 4 . 5 . 4 . 2 . _ _ | 4 . _ 5 . _ 4 . 2 . 0 . 2 . _ _ | 6> . _ 5 . _ 4 . 2 . 4 . /5 . . . | 4 . _ 2 . _ 0 . . . _ _ _ _ _ _",{y:.55}).move("lead",4,ct(.2,.5)),i=>i.lanes([13,3,12,6],0,4,[{y:.7},{y:.55},{x:0,y:.4},{y:.7}]).taps(0,3,".... .... x.x. XXXX",{y:.8}).chords("bass",7,[[0,1,"-7",.6],[1,1,"-9",.6],[2,1,"-8",.62],[3,1,"-7",.65]]).line("lead",0,"7 _ 7 _ 9> . 7 . 6 . 4 . 6 . 7 . | 9 _ 9 _ 11> . 9 . 7 . 6 . 7 . _ _ | 7 _ 7 _ 9> . 7 . 6 . 4 . /5 . . . | 4 . . . 2 . . . 0 . . . _ _ _ _",{y:.7}).move("lead",4,ct(.5,.75)).move("bass",0,Ce(.7,.15,2))],song:[[0,1,"kl"],[0,1,"l"],[1,2],[2,1],[1,2],[0,1,"b"]]},{id:"solto",name:"Bem solto",trend:"Phonk br\xE9silien",ref:"Dans l\u2019esprit de \xAB Passo Bem Solto \xBB (ATLXS, 2024-25) : 130 BPM, la mineur (fa, sol, la mineur), d\u2019apr\xE8s les donn\xE9es publiques.",tempo:130,key:9,scale:"minor",bars:4,kit:["kick.montagem","snare.clapmontagem","hat.drift","perc.clochephonk"],bass:"bass.808montagem",lead:"lead.sino",dials:[7,1,2,6,0,0],macros:{d0:[.75,.5],d3:[.6,.5],bass:[.75,.55,.6,.6,.55,.5],lead:[.5,.6,.55,.45,.3,.3]},mix:{pump:.4,space:.3,drumDrive:.35,drumSpace:.06},takes:[i=>i.lanes([7,1,2,6],0,4,[{y:.66},{y:.5},{x:0,y:.4},{y:.6}]).line("bass",0,"-9> . . . . . -9 . . . /-10 . -9 . . . | -8> . . . . . -8 . . . /-7 . -8 . . . | -7> . . . . . -7 . . . -7 . /-5 . . . | -7> . . . . . /-14 . . . . . /-7 . . .",{y:.6}).move("bass",2,Ce(.55,.15,2)),i=>i.lanes([7,1,2,6],0,4,[{y:.66},{y:.5},{x:0,y:.42},{y:.6}]).line("bass",0,"-9> . . . . . -9 . . . /-10 . -9 . . . | -8> . . . . . -8 . . . /-7 . -8 . . . | -7> . . . . . -7 . . . -7 . /-5 . . . | -7> . . . . . /-14 . . . . . /-7 . . .",{y:.6}).line("lead",0,"9 _ 9 _ 7 _ 9 _ 10 _ 9 _ 7 _ 5 _ | 8 _ 8 _ 6 _ 8 _ 9 _ 8 _ 6 _ 4 _ | 7 _ 7 _ 7 _ 9 _ 11> _ 10 _ 9 _ 7 _ | 7 . . . _ _ 4 _ 5 _ 7 . . . _ _",{y:.6,gap:.3}).move("lead",4,ct(.25,.55)),i=>i.lanes([7,1,14,16],0,4,[{y:.75},{y:.55},{x:0,y:.5},{y:.72}]).line("bass",0,"-9> . . . -9 . . . /-10 . -9 . . . -9 . | -8> . . . -8 . . . /-7 . -8 . . . -8 . | -7> . . . -7 . . . -7 . /-5 . . . -7 . | -7> . . . /-14 . . . . . . . /-7 . . .",{y:.7}).line("lead",0,"14 _ 14 _ 12 _ 14 _ 15 _ 14 _ 12 _ 10 _ | 13 _ 13 _ 11 _ 13 _ 14 _ 13 _ 11 _ 9 _ | 12 _ 12 _ 12 _ 14 _ 16> _ 15 _ 14 _ 12 _ | 14 . . . _ _ 11 _ 12 _ 14 . . . _ _",{y:.72,gap:.3}).move("d0",0,ct(.6,.95)).move("lead",2,Ce(.6,.2,1))],song:[[0,1,"l"],[0,1],[1,2],[2,2],[1,1],[0,1,"kl"]]},{id:"cimetiere",name:"La danse du cimeti\xE8re",trend:"Halloween",ref:"Tendance Halloween de TikTok 2026 (d\xE9fil\xE9s de costumes, sons d\u2019\xE9pouvante comme \xAB Peli de terror \xBB) : un orgue hant\xE9 sur un funk lourd, en mi phrygien dominant.",tempo:128,key:4,scale:"phrygdom",bars:8,kit:["kick.sature","snare.claprage","hat.trap","perc.vibraslap"],bass:"bass.808rage",lead:"lead.orgue",dials:[7,2,11,0,0,1],arp:["order","chord"],macros:{d0:[.7,.55],d1:[.5,.75],bass:[.6,.3,.55,.6,.6,.5],lead:[.55,.6,.3,.6,.35,.75]},mix:{pump:.3,space:.6,drumDrive:.3,drumSpace:.2},takes:[i=>i.lane(2,11,0,8,{x:0,y:.3,f:.5}).taps(3,3,"........X.......",{y:.6}).taps(3,7,"....X.......X...",{y:.7}).chords("lead",1,[[0,2,"7+9+11",.4],[2,2,"8+10+12",.45],[4,2,"7+9+11",.5],[6,2,"6+8+10",.45]]).line("bass",0,"-7> . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -6 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -8 . . . . . . . . . . . . . . . | . . . . . . . . . . . . /-7 . . .",{y:.4}).move("lead",2,ct(.2,.7)),i=>i.lanes([7,2,11,null],0,8,[{y:.72},{y:.55},{x:0,y:.45}]).taps(3,1,"............X...",{y:.7}).taps(3,3,"............X...",{y:.7}).taps(3,5,"............X...",{y:.7}).taps(3,7,"....X.......X.X.",{y:.8}).chords("lead",8,[[0,2,"7+9+11",.55],[2,2,"8+10+12",.6],[4,2,"7+9+11",.6],[6,2,"6+8+10",.62]]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -7 . . . . . -7 . . . /-3 . /-7 . . . | -6> . . . . . -6 . . . /-4 . -6 . . . | -6 . . . . . -6 . . . /-2 . /-6 . . . | -7> . . . . . -7 . . . /-5 . -7 . . . | -7 . . . . . -7 . . . /-3 . /-7 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -8 . . . -8 . /-7 . . . . . /-14 . . .",{y:.65}).move("lead",2,Ce(.6,.3,2)).move("bass",0,ct(.6,.85)),i=>i.lane(2,11,0,8,{x:0,y:.35,f:.6}).lane(1,2,4,8,{y:.45}).taps(3,3,"............X...",{y:.65}).taps(3,7,"....X...X...X...",{y:.75}).line("lead",0,"14> . . . . . 13 . 12 . . . 11 . . . | 12 . . . . . 11 . 10 . . . 9 . . . | 10 . . . 11 . 12 . 13 . . . 14 . . . | 15 . . . . . . . 14 . . . . . . . | 14> . . . . . 13 . 12 . . . 11 . . . | 12 . . . . . 11 . 10 . . . 9 . 8 . | 9 . 8 . 7 . 8 . /9 . . . 8 . . . | 7 . . . . . . . . . . . _ _ _ _",{y:.55}).line("bass",0,"-7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -6 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -8 . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . _ _ _ _",{y:.45}).move("lead",5,ct(.6,.9))],song:[[0,1],[1,1],[2,1],[1,1],[0,1,"b"]]},{id:"rebond",name:"Rebond",trend:"Jersey club",ref:"Les danses qui rebondissent de TikTok 2026 sur du jersey club : 142 BPM, sol mineur (r\xE9glages du genre), le grincement de lit en signature.",tempo:142,key:7,scale:"minor",bars:4,kit:["kick.jersey","snare.clapjersey","hat.jersey","perc.couinement"],bass:"bass.bounce",lead:"lead.stabjersey",dials:[6,6,12,0,14,14],arp:["order","chord"],macros:{d0:[.65,.45],d1:[.4,.55],bass:[.6,.45,.4,.35,.15,.2],lead:[.45,.3,.6,.55,.3,.35]},mix:{pump:.45,space:.3,drumDrive:.2,drumSpace:.08},takes:[i=>i.lanes([6,6,12,null],0,4,[{y:.6},{y:.55},{x:0,y:.42}]).taps(3,0,"....X.......X... | ....X.......X... | ....X.......X... | ....X...X.X.X...",{y:.55}).chords("bass",14,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).chords("lead",14,[[0,1,"7+9+11",.55],[1,1,"5+7+9",.55],[2,1,"6+8+10",.58],[3,1,"7+9+11",.6]]).move("bass",0,Ce(.6,.15,4)),i=>i.lanes([6,6,12,null],0,4,[{y:.66},{y:.58},{x:0,y:.45}]).taps(3,0,"....X.......X... | ....X.......X... | ....X.......X... | ....X...X.X.XXXX",{y:.6}).taps(0,3,"............x.x.",{y:.7}).chords("bass",14,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-7",.6]]).line("lead",0,"7> _ 7 _ _ 9 _ 7 . _ 6 _ 4 . _ _ | 7> _ 7 _ _ 9 _ 10 . _ 9 _ 7 . _ _ | 7> _ 7 _ _ 9 _ 7 . _ 6 _ 4 . _ _ | 2 . 4 . 6 . 7> . . . _ _ _ _ _ _",{y:.6}).move("lead",1,Ce(.4,.3,2))],song:[[0,1,"l"],[0,2],[1,2],[0,1,"kb"],[1,2]]},{id:"costumes",name:"D\xE9fil\xE9 des costumes",trend:"\xC9lectro-pop (Halloween)",ref:"Dans l\u2019esprit de \xAB Ramalama (Bang Bang) \xBB (R\xF3is\xEDn Murphy, 2005), le son des d\xE9fil\xE9s de costumes d\u2019Halloween sur TikTok en 2026 : 107 BPM, do\u266F mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:107,key:1,scale:"minor",bars:4,kit:["kick.909","snare.clap808","hat.analogique","perc.cloche808"],bass:"bass.pulse",lead:"lead.sync",dials:[1,1,3,0,4,0],arp:["order","order"],macros:{d0:[.55,.5],d2:[.45,.6],bass:[.55,.45,.45,.5,.15,.2],lead:[.5,.45,.3,.35,.35,.3]},mix:{pump:.3,space:.4,drumDrive:.15,drumSpace:.12},takes:[i=>i.lanes([1,1,3,null],0,4,[{y:.6},{y:.5},{x:2,y:.45}]).taps(3,0,"..x...x...x.x... | ..x...x...x.x... | ..x...x...x.x... | ..x...x...x.xx.x",{y:.5}).chords("bass",4,[[0,2,"-7+0",.5],[2,1,"-9+-2",.52],[3,1,"-8+-1",.55]],{arp:"order"}).move("bass",2,Ce(.5,.25,1)),i=>i.lanes([1,1,3,null],0,4,[{y:.62},{y:.52},{x:2,y:.48}]).taps(3,0,"..x...x...x.x... | ..x...x...x.x... | ..x...x...x.x... | ..x...x...x.xx.x",{y:.55}).chords("bass",4,[[0,2,"-7+0",.55],[2,1,"-9+-2",.55],[3,1,"-8+-1",.58]],{arp:"order"}).line("lead",0,"7> . _ 7 . _ 9 . _ _ 7 . 6 . 4 . | 7> . _ 7 . _ 9 . _ _ 11 . 9 . 7 . | 5> . _ 5 . _ 7 . _ _ 5 . 4 . 2 . | 6> . _ 6 . _ 8 . _ _ /9 . . . . .",{y:.55}).move("lead",0,ct(.3,.75)).move("bass",2,Ce(.6,.2,2))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"kl"],[1,2]]},{id:"escalier",name:"Escalier pi\xE9g\xE9",trend:"Pop-rock des ann\xE9es 80",ref:"Dans l\u2019esprit de \xAB Beat It \xBB (Michael Jackson, 1982), la musique des faux escaliers pi\xE9g\xE9s de TikTok en septembre 2026 : 139 BPM, mi\u266D mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:139,key:3,scale:"minor",bars:4,kit:["kick.acoustique","snare.acoustique","hat.acoustique","perc.toms"],bass:"bass.electrique",lead:"lead.guitare",dials:[2,1,1,0,0,0],arp:["order","chord"],macros:{d1:[.55,.5],bass:[.6,.55,.6,.5,.1,.2],lead:[.7,.45,.5,.3,.2,.35]},mix:{pump:.1,space:.35,drumDrive:.25,drumSpace:.2},takes:[i=>i.lanes([2,1,1,null],0,4,[{y:.6},{y:.62},{x:0,y:.45}]).taps(3,3,"........xx..xx..",{x:1,y:.6}).taps(3,3,"..........xx..XX",{x:0,y:.65}).line("bass",0,"-7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -3 . -2 . /-1 . . .",{y:.6,gap:.15}).line("lead",0,"7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 9+13 . . . 8+12 . . . 7+11> . . . _ _ _ _",{y:.6}),i=>i.lanes([2,1,1,null],0,4,[{y:.66},{y:.66},{x:1,y:.5}]).taps(3,3,"........xxxxXXXX",{x:0,y:.7}).line("bass",0,"-7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -9 . -9 . -7 . -9 . -10 . -11 . -10 . -9 . | -8 . -8 . -6 . -8 . -3 . -2 . /-1 . . .",{y:.62,gap:.15}).line("lead",0,"11 . 11 . 10 . 9 . 11 . . . 9 . 7 . | 11 . 11 . 10 . 9 . 6 . . . 4 . . . | 9 . 9 . 8 . 7 . 9 . . . 7 . 5 . | 8 . . . 9 . . . /11 . . . . . _ _",{y:.65}).move("lead",4,Ce(.3,.15,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1],[1,2]]},{id:"ete2011",name:"\xC9t\xE9 2011",trend:"Pop des ann\xE9es 2010",ref:"Dans l\u2019esprit de \xAB The One That Got Away \xBB (Katy Perry, 2010), chanson de l\u2019\xE9t\xE9 2026 sur TikTok : 123 BPM, mi majeur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:123,key:4,scale:"major",bars:8,kit:["kick.club","snare.classique","hat.analogique","perc.claves"],bass:"bass.doux",lead:"lead.piano",dials:[1,1,1,0,6,6],arp:["order","chord"],macros:{bass:[.5,.55,.4,.55,.1,.2],lead:[.45,.55,.35,.2,.3,.5]},mix:{pump:.25,space:.5,drumDrive:.1,drumSpace:.18},takes:[i=>i.lanes([1,1,1,null],0,8,[{y:.45},{y:.48},{x:0,y:.38}]).taps(3,3,"............x.x.",{y:.4}).taps(3,7,"........x.x.x.x.",{y:.45}).chords("lead",6,[[0,2,"7+9+11",.5],[2,2,"4+6+8",.5],[4,2,"5+7+9",.52],[6,2,"3+5+7",.5]]).chords("bass",6,[[0,2,"-7",.5],[2,2,"-10",.5],[4,2,"-9",.5],[6,2,"-11",.5]]),i=>i.lanes([1,1,2,null],0,8,[{y:.55},{y:.55},{x:0,y:.45}]).taps(3,1,"............x.x.",{y:.45}).taps(3,3,"........x.x.x.x.",{y:.5}).taps(3,5,"............x.x.",{y:.45}).taps(3,7,"x.x.x.x.x.x.XXXX",{y:.55}).chords("bass",6,[[0,2,"-7",.55],[2,2,"-10",.55],[4,2,"-9",.55],[6,2,"-11",.55]]).line("lead",0,"9 . . . 9 . 8 . 7 . . . 8 . 9 . | 11 . . . 9 . . . 7 . . . _ _ _ _ | 8 . . . 8 . 7 . 6 . . . 7 . 8 . | 9 . . . 8 . . . 6 . . . _ _ _ _ | 9 . . . 9 . 10 . 11 . . . 12 . 11 . | 12 . . . 11 . . . 9 . . . _ _ 9 _ | 10 . . . 9 . 8 . 7 . . . 8 . 7 . | 7 . . . . . . . _ _ _ _ _ _ _ _",{y:.55}).move("lead",4,Ce(.35,.12,1))],song:[[0,1],[1,1],[0,1,"k"],[1,2]]},{id:"mondial",name:"Mondial 2026",trend:"Afrobeats \xD7 latino",ref:"Le son afrobeats et latino de la Coupe du monde 2026 (comme \xAB Dai Dai \xBB, Shakira et Burna Boy). Tempo et tonalit\xE9 : ceux du genre.",tempo:105,key:9,scale:"minor",bars:4,steps:{lead:5},kit:["kick.afroprofond","snare.clapafro","hat.shakerafro","perc.djembe"],bass:"bass.afrorond",lead:"lead.balafon",dials:[8,9,9,1,7,0],arp:["order","order"],macros:{d3:[.5,.6],bass:[.55,.5,.45,.55,.1,.2],lead:[.4,.6,.3,.2,.35,.35]},mix:{pump:.25,space:.4,drumDrive:.12,drumSpace:.15},takes:[i=>i.lanes([8,9,9,1],0,4,[{y:.6},{y:.5},{x:1,y:.45},{y:.55}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-12",.52],[3,1,"-8",.55]]),i=>i.lanes([8,9,16,3],0,4,[{y:.62},{y:.52},{x:1,y:.48},{y:.6}]).chords("bass",7,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-12",.55],[3,1,"-8",.58]]).line("lead",0,"7 _ 9 _ 10 . 9 _ 7 _ _ 4 . _ 7 _ | 6 _ 7 _ 9 . 7 _ 6 _ _ 4 . _ 2 _ | 7 _ 9 _ 10 . 11 _ 13 _ _ 11 . _ 9 _ | 10 . 9 . 7 . . . _ _ _ _ _ _ _ _",{y:.55,gap:.25}).move("lead",4,Ce(.35,.15,2)),i=>i.lanes([8,9,16,3],0,4,[{y:.64},{y:.54},{x:1,y:.5},{y:.62}]).chords("bass",7,[[0,1,"-7",.58],[1,1,"-9",.58],[2,1,"-12",.58],[3,1,"-8",.6]]).line("lead",0,"_ _ 9 . 9 . 7 _ 9 . 10 . 9 . 7 . | _ _ 9 . 9 . 7 _ 9 . 10 . 12> . . . | _ _ 11 . 11 . 9 _ 11 . 12 . 11 . 9 . | 10 . . . 9 . 7 . 6 . . . _ _ _ _",{y:.58,gap:.2}).move("lead",4,Ce(.4,.15,2))],song:[[0,1,"l"],[0,1,"l"],[1,2],[2,2],[0,1],[1,1],[2,2]]},{id:"conscience",name:"Conscience",trend:"Rock alternatif",ref:"Dans l\u2019esprit de \xAB Self Aware \xBB (Temper City, 2026) : 162 BPM, la mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:162,key:9,scale:"minor",bars:4,kit:["kick.acoustique","snare.acoustique","hat.ride","perc.toms"],bass:"bass.electrique",lead:"lead.guitare",dials:[2,1,1,0,4,4],arp:["order","up"],macros:{bass:[.6,.6,.65,.5,.1,.2],lead:[.6,.55,.45,.4,.25,.35]},mix:{pump:.08,space:.35,drumDrive:.3,drumSpace:.22},takes:[i=>i.lanes([2,1,1,null],0,4,[{y:.6},{y:.6},{x:0,y:.45}]).chords("lead",4,[[0,1,"7+9+11",.5],[1,1,"5+7+9",.5],[2,1,"9+11+13",.52],[3,1,"6+8+10",.55]],{arp:"up"}).chords("bass",4,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-12",.5],[3,1,"-8",.52]]),i=>i.lanes([12,2,7,null],0,4,[{y:.66},{y:.66},{x:2,y:.55}]).taps(3,3,"........xxxxXXXX",{x:0,y:.7}).chords("lead",2,[[0,1,"7+11+14",.62],[1,1,"5+9+12",.62],[2,1,"9+13+16",.64],[3,1,"6+10+13",.66]]).chords("bass",4,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-12",.55],[3,1,"-8",.58]]).move("lead",3,ct(.3,.6)),i=>i.lanes([12,2,7,null],0,4,[{y:.68},{y:.66},{x:2,y:.56}]).taps(3,3,"............xxXX",{x:0,y:.7}).chords("bass",4,[[0,1,"-7",.58],[1,1,"-9",.58],[2,1,"-12",.58],[3,1,"-8",.6]]).line("lead",0,"11> . . . 11 . 10 . 9 . . . 7 . . . | 9 . . . 9 . 10 . 11 . . . 9 . . . | 13> . . . 13 . 11 . 11 . . . 10 . 9 . | 10 . . . . . 8 . 10 . . . _ _ _ _",{y:.62}).move("lead",3,ct(.35,.55))],song:[[0,1,"b"],[0,1],[1,2],[2,2],[0,1],[1,1],[2,2]]},{id:"piste",name:"Piste de danse",trend:"\xC9lectroclash",ref:"Dans l\u2019esprit de \xAB DANCE\u2026 \xBB (Slayyyter, 2026) : 113 BPM, la majeur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:113,key:9,scale:"major",bars:4,kit:["kick.909","snare.clap808","hat.analogique","perc.cloche808"],bass:"bass.acide",lead:"lead.chip",dials:[1,1,3,0,5,0],arp:["up","order"],macros:{d2:[.4,.65],bass:[.45,.7,.55,.4,.3,.5],lead:[.55,.4,.3,.2,.35,.3]},mix:{pump:.35,space:.35,drumDrive:.25,drumSpace:.1},takes:[i=>i.lanes([1,1,3,null],0,4,[{y:.62},{y:.5},{x:2,y:.5}]).chords("bass",5,[[0,1,"-7+-5+-3",.5],[1,1,"-10+-8+-6",.5],[2,1,"-9+-7+-5",.52],[3,1,"-11+-9+-7",.55]],{arp:"up"}).move("bass",0,Ce(.45,.3,2)),i=>i.lanes([1,1,3,11],0,4,[{y:.65},{y:.55},{x:2,y:.55},{y:.5}]).chords("bass",5,[[0,1,"-7+-5+-3",.55],[1,1,"-10+-8+-6",.55],[2,1,"-9+-7+-5",.58],[3,1,"-11+-9+-7",.6]],{arp:"up"}).line("lead",0,"11 . 11 . 9 . 11 . 12 . . . 11 . 9 . | 8 . 8 . 6 . 8 . 9 . . . 8 . 6 . | 9 . 9 . 7 . 9 . 10 . . . 9 . 7 . | 10 . . . 11 . . . 12> . . . . . _ _",{y:.6}).move("bass",0,ct(.35,.85)).move("lead",1,Ce(.5,.3,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"contagion",name:"Contagion douce",trend:"Pop ballade",ref:"Dans l\u2019esprit de \xAB Patient Zero \xBB (Taylor Swift, 2026), les mariages film\xE9s sur TikTok en octobre 2026 : 92 BPM, do majeur, d\u2019apr\xE8s les donn\xE9es publiques (tonalit\xE9 de la version piano).",tempo:92,key:0,scale:"major",bars:8,kit:["kick.feutre","snare.claplarge","hat.fin","perc.claves"],bass:"bass.electrique",lead:"lead.piano",dials:[2,1,1,0,3,3],arp:["order","chord"],macros:{d1:[.45,.65],bass:[.45,.55,.35,.6,.1,.25],lead:[.55,.5,.35,.25,.35,.6]},mix:{pump:.15,space:.6,drumDrive:.05,drumSpace:.25},takes:[i=>i.lanes([2,1,1,null],0,8,[{y:.4},{y:.45},{x:0,y:.3}]).chords("lead",3,[[0,2,"5+7+9",.45],[2,2,"3+5+7",.45],[4,2,"7+9+11",.48],[6,2,"4+6+8",.5]]).chords("bass",3,[[0,2,"-9",.45],[2,2,"-11",.45],[4,2,"-7",.45],[6,2,"-10",.45]]),i=>i.lanes([2,1,2,null],0,8,[{y:.5},{y:.5},{x:0,y:.38}]).taps(3,3,"............x.x.",{y:.4}).taps(3,7,"........x.x.x.x.",{y:.45}).chords("bass",3,[[0,2,"-9",.5],[2,2,"-11",.5],[4,2,"-7",.5],[6,2,"-10",.5]]).line("lead",0,"9 . . . 9 . 11 . 12 . . . 11 . 9 . | 11 . . . . . 9 . 7 . . . _ _ _ _ | 7 . . . 7 . 9 . 10 . . . 9 . 7 . | 9 . . . . . 7 . 6 . . . _ _ _ _ | 9 . . . 9 . 11 . 12 . . . 14 . 12 . | 11 . . . . . 9 . 11 . . . 12 . . . | 11 . 10 . 9 . . . 7 . . . 9 . . . | 7 . . . . . . . _ _ _ _ _ _ _ _",{y:.5}).move("lead",5,ct(.55,.75))],song:[[0,1,"k"],[1,1],[0,1],[1,1]]},{id:"logdrum",name:"Log drum 2026",trend:"Amapiano",ref:"Les d\xE9fis de danse amapiano de TikTok 2026 : 112 BPM, r\xE9 dorien (r\xE9glages du genre), le log drum qui glisse.",tempo:112,key:2,scale:"dorian",bars:8,kit:["kick.pianofeutre","snare.rimpiano","hat.shakerpiano","perc.logdrum"],bass:"bass.logdrum",lead:"lead.keys",dials:[9,9,4,9,0,8],arp:["order","chord"],macros:{d3:[.6,.4],bass:[.65,.5,.55,.45,.5,.55],lead:[.55,.45,.4,.2,.35,.45]},mix:{pump:.3,space:.45,drumDrive:.08,drumSpace:.15},takes:[i=>i.lanes([9,9,4,null],0,8,[{y:.5},{y:.5},{x:0,y:.45}]).line("bass",0,"-7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ -8 . _ /-7 . . | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ /-8 . . . . .",{y:.55,gap:.08}).chords("lead",8,[[0,2,"7+9+11+13",.45],[2,2,"10+12+14+16",.48],[4,2,"7+9+11+13",.5],[6,2,"10+12+14+16",.52]]).move("bass",0,Ce(.6,.15,2)).move("lead",4,Ce(.35,.12,1)),i=>i.lanes([9,9,9,9],0,8,[{y:.55},{y:.52},{x:1,y:.5},{y:.6}]).line("bass",0,"-7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ -8 . _ /-7 . . | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ /-8 . . . . .",{y:.6,gap:.08}).chords("lead",13,[[0,2,"7+9+11+13",.5],[2,2,"10+12+14+16",.52],[4,2,"7+9+11+13",.55],[6,2,"10+12+14+16",.58]]).move("lead",4,ct(.3,.6))],song:[[0,1,"b"],[0,1],[1,1],[0,1,"k"],[1,1]]},{id:"baile150",name:"Baile 150",trend:"Funk carioca 150 BPM",ref:"Le funk carioca acc\xE9l\xE9r\xE9 \xE0 150 BPM des danses br\xE9siliennes de TikTok (r\xE9glages du genre) : agog\xF4, 808 qui glisse et un chant de synth\xE8se.",tempo:150,key:6,scale:"minor",bars:4,kit:["kick.boom","snare.clapserre","hat.tss","perc.agogo"],bass:"bass.808",lead:"lead.voix",dials:[7,1,1,16,0,0],macros:{d0:[.7,.45],d3:[.5,.55],bass:[.6,.5,.6,.6,.5,.45],lead:[.45,.6,.4,.35,.3,.3]},mix:{pump:.35,space:.3,drumDrive:.3,drumSpace:.06},takes:[i=>i.lanes([7,1,1,16],0,4,[{y:.66},{y:.52},{x:0,y:.42},{y:.58}]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -10> . . . . . -10 . . . /-8 . /-7 . . .",{y:.6}),i=>i.lanes([7,1,2,16],0,4,[{y:.7},{y:.55},{x:0,y:.45},{y:.62}]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -10> . . . . . -10 . . . /-8 . /-7 . . .",{y:.62}).line("lead",0,"7 _ 7 _ 9 . 7 _ 6 . 4 _ _ _ 4 _ | 7 _ 7 _ 9 . 10 _ 9 . 7 _ _ _ _ _ | 7 _ 7 _ 9 . 7 _ 6 . 4 _ _ _ 2 _ | 4 . . . 6 . . . 7> . . . _ _ _ _",{y:.55}).move("lead",0,Ce(.45,.25,2)),i=>i.lanes([null,1,14,16],0,4,[null,{y:.6},{x:0,y:.5},{y:.7}]).taps(0,0,"X..x..x...x.x... | X..x..x...x.x... | X..x..x...x.x... | X..x..x.X.X.XXXX",{y:.75}).line("bass",0,"-7> . . . -7 . . . /-5 . -7 . . . -7 . | -9> . . . -9 . . . /-7 . -9 . . . -9 . | -8> . . . -8 . . . /-6 . -8 . . . -8 . | -10> . . . /-14 . . . . . . . /-7 . . .",{y:.7}).move("d0",0,ct(.6,.9))],song:[[0,1,"l"],[1,2],[2,1],[1,2],[0,1,"kl"]]},{id:"garage",name:"Garage 2026",trend:"UK garage",ref:"Le retour du UK garage sur TikTok en 2026 : 134 BPM, fa mineur, rythme chaloup\xE9 (r\xE9glages du genre).",tempo:134,swing:58,key:5,scale:"minor",bars:4,kit:["kick.garage","snare.garage","hat.garage","perc.toc"],bass:"bass.speedgarage",lead:"lead.rhodes",dials:[3,4,4,13,10,8],arp:["order","chord"],macros:{bass:[.5,.55,.5,.4,.55,.3],lead:[.45,.5,.4,.25,.35,.4]},mix:{pump:.4,space:.35,drumDrive:.12,drumSpace:.1},takes:[i=>i.lanes([3,4,4,13],0,4,[{y:.58},{y:.5},{x:0,y:.45},{y:.5}]).chords("bass",10,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).chords("lead",8,[[0,1,"7+9+11+13",.5],[1,1,"5+7+9",.5],[2,1,"6+8+10",.52],[3,1,"7+9+11",.55]]).move("bass",0,Ce(.5,.25,4)),i=>i.lanes([3,4,2,13],0,4,[{y:.62},{y:.55},{x:0,y:.5},{y:.55}]).chords("bass",10,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-7",.6]]).line("lead",0,"9 . _ 9 . _ 11 . _ 9 _ 7 . _ _ _ | 9 . _ 9 . _ 11 . _ 12 _ 11 . _ _ _ | 9 . _ 9 . _ 11 . _ 9 _ 7 . _ 6 _ | 7 . . . 6 . . . 4 . . . _ _ _ _",{y:.55}).move("bass",2,ct(.35,.7))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"liquide",name:"Liquide",trend:"Drum & bass liquide",ref:"La drum & bass liquide des versions acc\xE9l\xE9r\xE9es de TikTok : 174 BPM, fa mineur (r\xE9glages du genre).",tempo:174,key:5,scale:"minor",bars:8,kit:["kick.break","snare.dnb","hat.ridednb","perc.tombreak"],bass:"bass.reese",lead:"lead.liquide",dials:[5,5,1,0,0,1],arp:["order","chord"],macros:{bass:[.45,.35,.4,.4,.5,.65],lead:[.55,.5,.45,.4,.4,.55]},mix:{pump:.3,space:.55,drumDrive:.15,drumSpace:.18},takes:[i=>i.lanes([5,5,1,null],0,8,[{y:.6},{y:.55},{x:0,y:.42}]).chords("lead",1,[[0,2,"7+9+11+14",.5],[2,2,"5+7+9+12",.5],[4,2,"9+11+13",.52],[6,2,"6+8+10+13",.55]]).line("bass",0,"-7> . . . . . . . . . . . -7 . . . | . . . . . . . . -5 . . . /-7 . . . | -9> . . . . . . . . . . . -9 . . . | . . . . . . . . -7 . . . /-9 . . . | -12> . . . . . . . . . . . -12 . . . | . . . . . . . . -10 . . . /-12 . . . | -8> . . . . . . . . . . . -8 . . . | . . . . . . . . -6 . . . /-7 . . .",{y:.5}).move("lead",2,Ce(.45,.2,1)),i=>i.lanes([5,5,2,null],0,8,[{y:.66},{y:.6},{x:0,y:.5}]).taps(3,3,"............xxXX",{x:1,y:.6}).taps(3,7,"........xx.xxxXX",{x:0,y:.65}).chords("lead",1,[[0,2,"7+9+11+14",.55],[2,2,"5+7+9+12",.55],[4,2,"9+11+13",.58],[6,2,"6+8+10+13",.6]]).line("bass",0,"-7> . . . . . -7 . . . -5 . /-7 . . . | -7 . . . . . -2 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . -7 . /-9 . . . | -9 . . . . . -4 . . . /-7 . -9 . . . | -12> . . . . . -12 . . . -10 . /-12 . . . | -12 . . . . . -7 . . . /-10 . -12 . . . | -8> . . . . . -8 . . . -6 . /-8 . . . | -8 . . . -6 . . . -5 . . . /-7 . . .",{y:.6}).move("bass",1,Ce(.4,.25,2)),i=>i.lanes([5,5,2,null],0,8,[{y:.66},{y:.6},{x:0,y:.5}]).taps(3,7,"........xx.xxxXX",{x:0,y:.65}).chords("lead",1,[[0,2,"0+2+4+7",.45],[2,2,"-2+0+2+5",.45],[4,2,"2+4+6",.47],[6,2,"-1+1+3+6",.5]],{v:.7}).line("lead",0,"11> . . . . . . . 9 . . . . . . . | 10 . . . 9 . . . 8 . . . 7 . . . | 7 . . . . . . . 9 . . . . . . . | 10 . . . . . . . 11 . . . 12 . . . | 13> . . . . . . . 11 . . . . . . . | 12 . . . 11 . . . 10 . . . 9 . . . | 8 . . . . . . . 10 . . . . . . . | 11 . . . 10 . . . 8 . . . _ _ _ _",{y:.6}).line("bass",0,"-7> . . . . . -7 . . . -5 . /-7 . . . | -7 . . . . . -2 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . -7 . /-9 . . . | -9 . . . . . -4 . . . /-7 . -9 . . . | -12> . . . . . -12 . . . -10 . /-12 . . . | -12 . . . . . -7 . . . /-10 . -12 . . . | -8> . . . . . -8 . . . -6 . /-8 . . . | -8 . . . -6 . . . -5 . . . /-7 . . .",{y:.6}).move("lead",2,Ce(.45,.2,1))],song:[[0,1,"k"],[0,1],[1,2],[2,2],[0,1,"b"]]},{id:"rage",name:"Rage",trend:"Rage \xB7 trap m\xE9lodique",ref:"Le rage et la trap m\xE9lodique de TikTok 2026 : 150 BPM, do\u266F mineur harmonique (r\xE9glages du genre), arp\xE8ges satur\xE9s.",tempo:150,key:1,scale:"harmonic",bars:4,kit:["kick.808rage","snare.claprage","hat.trap","perc.laser"],bass:"bass.808rage",lead:"lead.rage",dials:[4,7,6,0,0,15],arp:["order","up"],macros:{d2:[.5,.6],bass:[.65,.3,.55,.6,.6,.5],lead:[.6,.55,.3,.6,.3,.35]},mix:{pump:.3,space:.35,drumDrive:.3,drumSpace:.08},takes:[i=>i.lanes([4,7,6,null],0,4,[{y:.65},{y:.55},{x:0,y:.45}]).taps(3,1,"..............X.",{y:.6}).taps(3,3,"..........X...X.",{y:.65}).chords("lead",15,[[0,1,"7+9+11",.55],[1,1,"5+7+9",.55],[2,1,"3+5+7",.58],[3,1,"4+6+8",.6]],{arp:"up"}).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -11> . . . . . -11 . . . /-9 . -11 . . . | -10> . . . . . -10 . /-7 . . . /-3 . . .",{y:.6}),i=>i.lanes([4,7,6,null],0,4,[{y:.7},{y:.58},{x:0,y:.5}]).taps(3,0,"......X.......X. | ......X.......X. | ......X.......X. | ..X...X...X.XXXX",{y:.7}).chords("lead",15,[[0,1,"7+9+11",.62],[1,1,"5+7+9",.62],[2,1,"3+5+7",.65],[3,1,"4+6+8",.68]],{arp:"up"}).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -11> . . . . . -11 . . . /-9 . -11 . . . | -10> . . . . . -10 . /-7 . . . /-3 . . .",{y:.65}).move("lead",1,ct(.5,.85)).move("lead",2,Ce(.3,.2,2))],song:[[0,1,"kb"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"afrohouse",name:"Afro house 2026",trend:"Afro house",ref:"L\u2019afro house des vid\xE9os de danse de TikTok 2026 : 122 BPM, la mineur (r\xE9glages du genre).",tempo:122,key:9,scale:"minor",bars:8,kit:["kick.afroprofond","snare.clapafro","hat.shakerafro","perc.djembe"],bass:"bass.afrorond",lead:"lead.marimba",dials:[1,1,9,7,7,0],arp:["order","order"],macros:{d3:[.55,.55],bass:[.5,.55,.45,.6,.15,.25],lead:[.45,.55,.35,.2,.4,.45]},mix:{pump:.4,space:.45,drumDrive:.1,drumSpace:.15},takes:[i=>i.lanes([1,1,9,7],0,8,[{y:.58},{y:.5},{x:1,y:.45},{y:.55}]).chords("bass",7,[[0,2,"-7",.5],[2,2,"-8",.5],[4,2,"-9",.52],[6,2,"-8",.55]]),i=>i.lanes([1,1,9,7],0,8,[{y:.62},{y:.52},{x:1,y:.48},{y:.6}]).chords("bass",7,[[0,2,"-7",.55],[2,2,"-8",.55],[4,2,"-9",.55],[6,2,"-8",.58]]).line("lead",0,"7 _ 9 _ 7 _ 11 _ 9 _ 7 _ 4 _ _ _ | 6 _ 7 _ 9 _ 7 _ 6 _ 4 _ 2 _ _ _ | 5 _ 7 _ 5 _ 9 _ 7 _ 5 _ 4 _ _ _ | 6 . . . 7 . . . 9 . . . 11 . . . | 7 _ 9 _ 7 _ 11 _ 9 _ 7 _ 4 _ _ _ | 6 _ 7 _ 9 _ 7 _ 6 _ 4 _ 2 _ _ _ | 5 _ 7 _ 5 _ 9 _ 7 _ 5 _ 4 _ 2 _ | 0 . . . . . . . _ _ _ _ _ _ _ _",{y:.55,gap:.3}).move("lead",4,Ce(.4,.15,1))],song:[[0,1,"l"],[0,1,"l"],[1,1],[0,1],[1,1]]},{id:"perreo",name:"Perreo 2026",trend:"Reggaeton \xB7 perreo",ref:"Le perreo des chor\xE9graphies de TikTok 2026 : 96 BPM, mi mineur, rythme dembow (r\xE9glages du genre).",tempo:96,key:4,scale:"minor",bars:4,kit:["kick.perreo","snare.dembow","hat.perreo","perc.timbal"],bass:"bass.subperreo",lead:"lead.perreo",dials:[16,3,1,0,11,0],arp:["order","order"],macros:{bass:[.65,.55,.6,.45,.1,.15],lead:[.4,.6,.35,.2,.35,.35]},mix:{pump:.3,space:.35,drumDrive:.15,drumSpace:.08},takes:[i=>i.lanes([16,3,1,null],0,4,[{y:.6},{y:.55},{x:0,y:.42}]).taps(3,3,"............x.xX",{y:.55}).chords("bass",11,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-10",.55]]),i=>i.lanes([16,3,1,null],0,4,[{y:.62},{y:.58},{x:0,y:.45}]).taps(3,1,"............x.xX",{y:.55}).taps(3,3,"........x.x.x.xX",{y:.6}).chords("bass",11,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-10",.6]]).line("lead",0,"11 . 9 _ 11 . 9 _ 7 . . . 9 . 7 _ | 6 . 7 . 9 . . . 7 . . . _ _ _ _ | 11 . 9 _ 11 . 9 _ 7 . . . 9 . 11 _ | 12 . . . 11 . . . 9 . . . _ _ _ _",{y:.55}).move("lead",4,Ce(.35,.15,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"hardtechno",name:"Hard techno TikTok",trend:"Hard techno",ref:"La hard techno des vid\xE9os de sport et de f\xEAte de TikTok 2026 : 152 BPM, la phrygien (r\xE9glages du genre), acide en doubles croches.",tempo:152,key:9,scale:"phrygian",bars:4,kit:["kick.rumble","snare.industriel","hat.industriel","perc.metalindus"],bass:"bass.acidedur",lead:"lead.hurleur",dials:[1,1,10,0,5,0],arp:["order","order"],macros:{d0:[.7,.6],bass:[.4,.75,.55,.4,.3,.5],lead:[.6,.5,.45,.5,.25,.4]},mix:{pump:.45,space:.3,drumDrive:.4,drumSpace:.1},takes:[i=>i.lanes([1,1,10,null],0,4,[{y:.7},{y:.55},{x:0,y:.5}]).taps(3,0,"..x...x...x...x. | ..x...x...x...x. | ..x...x...x...x. | ..x...x...x.x.xx",{x:0,y:.6}).chords("bass",5,[[0,4,"-7+-6",.5]],{arp:"order"}).move("bass",0,Ce(.5,.3,1)),i=>i.lanes([1,1,2,null],0,4,[{y:.75},{y:.6},{x:0,y:.55}]).taps(3,0,"..x...x...x...x. | ..x...x...x...x. | ..x...x...x...x. | ..x...x...x.x.xx",{x:0,y:.65}).chords("bass",5,[[0,2,"-7+-6",.55],[2,2,"-7+-4",.58]],{arp:"order"}).line("lead",0,"7> . . . _ _ _ _ 8> . . . _ _ _ _ | 7> . . . _ _ 7 . 8 . . . 10 . . . | 7> . . . _ _ _ _ 8> . . . _ _ _ _ | 11 . . . 10 . . . 8 . . . 7 . . .",{y:.6}).move("bass",0,ct(.3,.9)).move("lead",1,Ce(.5,.3,2))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"brume",name:"Brume ralentie",trend:"Slowed + reverb",ref:"Les versions ralenties et noy\xE9es de r\xE9verb\xE9ration (\xAB slowed + reverb \xBB) de TikTok : 78 BPM, do dorien (r\xE9glages du genre).",tempo:78,key:0,scale:"dorian",bars:4,kit:["kick.poussiere","snare.poussiere","hat.vinyle","perc.boisfeutre"],bass:"bass.ronde",lead:"lead.brume",dials:[12,2,1,0,1,1],arp:["order","chord"],macros:{bass:[.45,.6,.35,.45,.4,.45],lead:[.6,.4,.5,.45,.55,.8]},mix:{pump:.15,space:.85,drumDrive:.08,drumSpace:.35},takes:[i=>i.lanes([12,2,1,null],0,4,[{y:.45},{y:.45},{x:0,y:.35}]).taps(3,1,"..........x.....",{y:.4}).taps(3,3,"......x.....x...",{y:.45}).chords("lead",1,[[0,1,"7+9+11+13",.45],[1,1,"10+12+14",.45],[2,1,"5+7+9+11",.48],[3,1,"6+8+10",.5]]).chords("bass",1,[[0,1,"-7",.45],[1,1,"-4",.45],[2,1,"-9",.45],[3,1,"-8",.45]]).move("lead",5,ct(.7,.9)),i=>i.lanes([12,2,1,null],0,4,[{y:.5},{y:.48},{x:0,y:.38}]).taps(3,1,"..........x.....",{y:.4}).taps(3,3,"......x.....x...",{y:.45}).chords("bass",1,[[0,1,"-7",.5],[1,1,"-4",.5],[2,1,"-9",.5],[3,1,"-8",.5]]).line("lead",0,"11 . . . . . 9 . 10 . . . 9 . 7 . | 9 . . . . . . . _ _ 7 . 9 . 10 . | 11 . . . . . 12 . 11 . . . 9 . 7 . | 7 . . . . . . . . . . . _ _ _ _",{y:.45}).move("lead",4,Ce(.5,.15,1))],song:[[0,1,"b"],[0,1],[1,1],[0,1],[1,1]]}];function Zo(i,{raw:e=!1}={}){let t=_i.find(s=>s.id===i);return t?os(R0(t,e)):null}var Pa=class{constructor(e,t){this.store=e,this.ctx=t,this.cur=null,this.audio=null}open(e,t,s={}){this.close(!0);let a=u("div",{class:"sheet-back",onclick:()=>this.close()}),o=u("button",{class:"close","aria-label":"Fermer",onclick:()=>this.close()},he("close")),r=u("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e},u("div",{class:"grab"}),u("header",null,u("h2",{text:e}),...s.actions||[],o),u("div",{class:"body"},t));document.body.append(a,r),requestAnimationFrame(()=>{a.classList.add("open"),r.classList.add("open")});let n=null;return r.querySelector(".grab").addEventListener("pointerdown",l=>{n=l.clientY}),r.addEventListener("pointerup",l=>{n!==null&&l.clientY-n>60&&this.close(),n=null}),this.cur={back:a,sheet:r,onClose:s.onClose},r}close(e){let t=this.cur;if(t){if(this.cur=null,t.onClose&&t.onClose(),e){t.back.remove(),t.sheet.remove();return}t.back.classList.remove("open"),t.sheet.classList.remove("open"),setTimeout(()=>{t.back.remove(),t.sheet.remove()},280)}}menu(){let e=this.store,t=(o,r,n,l)=>u("button",{class:"item",onclick:l},u("span",{class:"ic"},he(o)),u("span",{class:"tx"},u("b",{text:r}),n?u("small",{text:n}):null)),s=document.documentElement.dataset.theme==="dark",a=u("div",{class:"list"},t("folder","Projets",e.project.name,()=>this.library()),t("plus","Nouvelle id\xE9e","Vide ou \xE0 partir d\u2019une sc\xE8ne",()=>this.newIdea()),t("share","Exporter","WAV, pistes s\xE9par\xE9es, MIDI, projet",()=>this.exportSheet()),t("speaker","Lecteur","Rendus et fichiers import\xE9s",()=>this.player()),t("settings","R\xE9glages","M\xE9tronome, clavier piano, doigts, th\xE8me",()=>this.settings()),t("dice","Sons au hasard","Batterie, basse et m\xE9lodie \xB7 annulable",()=>{this.close(),this.ctx.rollDice("all")}),t("wifi","Hors ligne et mises \xE0 jour","",()=>this.offline()),t("info","Aide","Les gestes en une page",()=>this.help()),t("file","Sons et licences","Provenance des banques int\xE9gr\xE9es",()=>this.licences()));this.open("MOTIF",a)}settings(){let e=this.store,t=e.settings,s=(c,h,p,f)=>{let m=u("button",{class:"item switch",role:"switch","aria-checked":String(!!t[c])},u("span",{class:"tx"},u("b",{text:h}),p?u("small",{text:p,style:{whiteSpace:"normal"}}):null),u("i",{class:"knob"}));return m.addEventListener("click",()=>{e.setSetting(c,!e.settings[c]),m.setAttribute("aria-checked",String(!!e.settings[c])),f&&f()}),m},a=(c,h,p)=>u("div",{class:"seg"},...h.map(f=>{let m=u("button",{"aria-pressed":String(t[c]===f)},p(f));return m.addEventListener("click",()=>{e.setSetting(c,f);for(let v of m.parentNode.children)v.setAttribute("aria-pressed",String(v===m))}),m})),o=A0(),r=[["dark","Sombre"],["light","Clair"]];ft.fluid&&r.push(["halloween","Halloween"]);let n=null;{let c=["Citrouille","Vaudou","Fant\xF4me","Calavera","Momie","Monstre","Squelette"],h=()=>Array.isArray(e.settings.hwCast)&&e.settings.hwCast.length===4?e.settings.hwCast.slice():[0,3,2,1],p=u("div",{class:"cards hwcast"},...["Kick","Snare","Hat","Perc"].map((f,m)=>{let v=u("button",{class:"pat","aria-label":f+" : changer de personnage"},u("small",{text:f}),u("b",{text:c[h()[m]]}));return v.addEventListener("click",()=>{let g=h();g[m]=(g[m]+1)%c.length,e.setSetting("hwCast",g),v.querySelector("b").textContent=c[g[m]]}),v}));n=u("div",{hidden:o!=="halloween"},u("p",{class:"note",text:"Les quatre de la batterie : touche une case pour changer de personnage."}),p,u("div",{class:"list",style:{marginTop:"8px"}},s("hwRelay","Ils se relaient","De temps en temps, l\u2019un d\u2019eux retourne dans sa tombe et un de ceux qu\u2019on ne voit pas sort de terre \xE0 sa place : pendant la lecture toutes les huit mesures, au repos toutes les 25 \xE0 45 secondes.")))}let l=u("div",{class:"seg"},...r.map(([c,h])=>{let p=u("button",{"aria-pressed":String(c===o)},h);return p.addEventListener("click",()=>{E0(c);for(let f of p.parentNode.children)f.setAttribute("aria-pressed",String(f===p));n&&(n.hidden=c!=="halloween")}),p})),d=u("div",null,u("div",{class:"sect"},u("h3",{text:"M\xE9tronome"}),u("div",{class:"list"},s("metro","M\xE9tronome","Un clic \xE0 chaque temps, plus aigu sur le premier. Raccourci : touche le tempo en haut. Jamais pr\xE9sent dans les exports."),s("metroAlways","Aussi sans enregistrer","Sinon, il ne sonne que pendant l\u2019enregistrement (REC).")),u("p",{class:"note",text:"Volume du clic"}),a("metroLevel",[-12,-6,0,6],c=>(c>0?"+":c<0?"\u2212":"")+Math.abs(c)+" dB")),u("div",{class:"sect"},u("h3",{text:"Surface de jeu"}),u("div",{class:"list"},s("piano","Clavier de piano","Basse et m\xE9lodie : touches blanches et noires, toutes les notes jouables. Les notes de la gamme sont marqu\xE9es d\u2019un point."),s("ghosts","Montrer les doigts \xE0 la lecture","Pendant la lecture, un doigt fant\xF4me refait le geste enregistr\xE9 (chaque gliss\xE9, chaque hauteur), avec sa tra\xEEn\xE9e. Pour les prises plus anciennes, un rond marque chaque note."))),ft.fluid?u("div",{class:"sect"},u("h3",{text:"Effets fluides"}),u("div",{class:"list"},s("fluid","Fluide sous les doigts","Encre anim\xE9e sur la surface de jeu et les tweaks : tes doigts, les notes rejou\xE9es, le kick. Coup\xE9 si l\u2019iPhone demande de r\xE9duire les animations. D\xE9sactive-le pour \xE9conomiser la batterie.")),u("p",{class:"note",text:"O\xF9"}),a("fluidZone",["keys","all"],c=>c==="keys"?"Dans les touches":"Partout"),u("p",{class:"note",text:"Style"}),a("fluidStyle",["douce","normale","spectaculaire"],c=>({douce:"Doux",normale:"Normal",spectaculaire:"Spectaculaire"})[c]),u("p",{class:"note",text:"Encre"}),a("fluidInk",["libre","maitrisee"],c=>c==="libre"?"Libre":"Ma\xEEtris\xE9e"),u("p",{class:"note",text:"Libre : chaque note, gliss\xE9 et coup d\xE9pose toute son encre, sans limite (\xE7a peut d\xE9border et br\xFBler au blanc). Ma\xEEtris\xE9e : un budget par touche, un geste lent laisse un filet, un geste vif un panache."}),u("p",{class:"note",text:"Couleurs"}),u("div",{class:"seg wrap"},...a("fluidColors",["partie","notes","arc","neon"],c=>({partie:"Partie",notes:"Notes",arc:"Arc-en-ciel",neon:"N\xE9on"})[c]).children),u("p",{class:"note",text:"\xAB Dans les touches \xBB : chaque touche devient un tube, l\u2019encre ne passe pas d\u2019une touche \xE0 l\u2019autre. \xAB Notes \xBB : chaque note a sa couleur (voisines sur le cycle des quintes = couleurs voisines). Spectaculaire : tra\xEEn\xE9es longues, halo, et le kick secoue toute l\u2019encre."}),u("div",{class:"list",style:{marginTop:"8px"}},s("glass","Verre liquide","Le pad et la surface Tweaks deviennent une plaque de verre pos\xE9e sur l\u2019\xE9cran, dans l\u2019esprit Liquid Glass : son bord courbe ce qu\u2019il y a dessous et s\xE9pare un peu les couleurs, ses reflets suivent la lumi\xE8re, elle fl\xE9chit sous le doigt. Choisis son style plus bas."),s("mixGlass","Mix sous verre","Chaque tranche du Mix devient un tube de verre rempli de son niveau, et le son de chaque instrument y monte en lumi\xE8re liquide : un jet \xE0 chaque attaque, un filet tant qu\u2019il sonne."),s("glassSpill","Lumi\xE8re autour du verre","La lumi\xE8re de l\u2019encre d\xE9borde du verre sur l\u2019\xE9cran. Les boutons proches r\xE9v\xE8lent leur relief et projettent une ombre \xE0 l\u2019oppos\xE9 ; les boutons sans fond ne font ressortir que leur texte. Plus ils sont loin de la lumi\xE8re, moins elle les touche.")),u("p",{class:"note",text:"Style du verre"}),u("div",{class:"seg wrap"},...a("glassLook",["optique","liquide","depoli","cristal","prisme"],c=>({optique:"Optique",liquide:"Liquide",depoli:"D\xE9poli",cristal:"Cristal",prisme:"Prisme"})[c]).children),u("p",{class:"note",text:"Optique : une plaque claire et incolore, presque invisible, qui ne courbe que ses bords ; l\u2019encre et les touches restent nettes. Liquide : le verre pr\xE9c\xE9dent, une dalle plus \xE9paisse qui s\u2019\xE9claire de l\u2019encre et sous le doigt. D\xE9poli : un verre laiteux qui floute l\u2019encre en lueurs et s\u2019\xE9claire de la lumi\xE8re autour. Cristal : un bord biseaut\xE9 \xE0 facettes qui d\xE9cale et irise ce qu\u2019il y a dessous et accroche la lumi\xE8re. Prisme : un verre \xE9pais et tr\xE8s clair qui flotte au-dessus de l\u2019\xE9cran ; son large bord arrondi replie l\u2019image pr\xE8s du contour et la d\xE9compose en couleurs."}),u("p",{class:"note",text:"Puissance de la lumi\xE8re autour du verre"}),a("glassLight",["douce","normale","forte","max"],c=>({douce:"Douce",normale:"Normale",forte:"Forte",max:"Max"})[c]),u("p",{class:"note",text:"Hauteur des boutons (plus ils sont hauts, plus leur ombre est longue)"}),a("ctrlHeight",[3,6,10,15],c=>({3:"Plats",6:"Bas",10:"Hauts",15:"Tr\xE8s hauts"})[c]),u("p",{class:"note",text:"Mode clair : le verre et l\u2019encre"}),a("lightLook",["aquarelle","vitrail","classique"],c=>({aquarelle:"Aquarelle",vitrail:"Vitrail",classique:"Classique"})[c]),u("p",{class:"note",text:"Aquarelle : sous le verre un papier ivoire, l\u2019encre est un pigment qui colore l\u2019eau et fonce l\xE0 o\xF9 les couleurs se m\xEAlent ; la lumi\xE8re autour teinte l\u2019\xE9cran. Vitrail : la couleur de la partie, \xE9clair\xE9e comme un vitrail, une encre lumineuse et une lumi\xE8re color\xE9e autour. Classique : l\u2019aspect d\u2019avant."}),u("div",{class:"list",style:{marginTop:"8px"}},s("glassTilt","Le verre suit l\u2019iPhone","La lumi\xE8re reste fixe dans la pi\xE8ce : quand tu inclines le t\xE9l\xE9phone, les reflets glissent sur le verre comme sur un vrai objet. Tenu normalement, la lumi\xE8re vient d\u2019en haut \xE0 gauche. (iOS demande l\u2019autorisation d\u2019utiliser les mouvements.)",()=>{this.store.settings.glassTilt&&this.ctx.enableTilt&&this.ctx.enableTilt()})),u("p",{class:"note",text:"HDR (\xE9cran HDR : reflets, c\u0153urs d\u2019encre et lumi\xE8re autour du verre plus lumineux que le blanc)"}),a("fluidHdr",["normal","intense","max"],c=>({normal:"Normal",intense:"Intense",max:"Max"})[c]),u("div",{class:"list",style:{marginTop:"8px"}},s("hdrLight","HDR aussi en mode clair","L\u2019\xE9cran autour garde sa couleur exacte. Si la surface sous le verre te para\xEEt plus terne en mode clair, coupe-le : l\u2019iPhone assombrit un peu un calque HDR \xE0 c\xF4t\xE9 des couleurs de la page.")),u("p",{class:"note",text:"Moteur graphique"}),a("fluidEngine",["auto","webgl"],c=>c==="auto"?"Auto (WebGPU)":"Compatibilit\xE9 (WebGL)"),u("p",{class:"note",text:this.ctx.fluidStatus?this.ctx.fluidStatus():""}),u("button",{class:"big accent",style:{marginTop:"6px"},onclick:()=>{this.close(),this.ctx.previewFluid&&this.ctx.previewFluid()}},he("sparkle"),"Voir l\u2019aper\xE7u")):null,u("div",{class:"sect"},u("h3",{text:"Apparence"}),l,ft.fluid?u("p",{class:"note",text:"Halloween : chaque bouton devient un objet d\u2019Halloween en 3D, et une troupe de poup\xE9es vit sur le pad. Elles s\u2019\xE9crasent sous le doigt, crient ou chantent avec le son, suivent ton doigt des yeux et dansent parfois. La nuit tombe autour : brume, braises, et sur le pad un cimeti\xE8re sous la lune. Si tu ne touches plus rien, elles finissent par te regarder."}):null,n),u("p",{class:"note",text:"Ces r\xE9glages restent sur cet appareil ; ils ne changent pas tes projets."}));this.open("R\xE9glages",d)}async library(){let e=this.store,t=u("div",{class:"list"}),s=async()=>{let r=await e.listProjects();t.replaceChildren(...r.map(n=>{let l=(n.patterns||[]).reduce((h,p)=>h+pi(p),0),d=new Date(n.updated||n.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}),c=u("button",{class:"close","aria-label":"Options du projet",onclick:h=>{h.stopPropagation(),this.projectMenu(n,s)}},he("more"));return u("div",{class:"item",role:"button",tabindex:"0","aria-current":String(n.id===e.project.id),onclick:async()=>{await e.openProject(n.id),this.close();let h=e.project;for(let p of[...h.parts.drum.kit,h.parts.bass.preset,h.parts.lead.preset])await this.ctx.loadBanksFor(qe(p));e.syncAll(),this.ctx.toast("Projet ouvert : "+n.name)}},u("span",{class:"tx"},u("b",{text:n.name}),u("small",{text:`${d} \xB7 ${n.tempo} BPM \xB7 ${l} \xE9v\xE9n.`})),c)}))};await s();let a=u("input",{type:"file",accept:".json,.motif,application/json",class:"hidden"});a.addEventListener("change",async()=>{let r=a.files[0];if(r){try{let n=await r.text();if(n.includes('"motif-3-backup"')){let l=await e.restoreBackup(n);this.ctx.toast(`${l} projet(s) restaur\xE9(s)`),await s()}else e.importProjectText(n),this.ctx.toast("Projet import\xE9"),this.close()}catch(n){this.ctx.toast("Import impossible : "+n.message)}a.value=""}});let o=u("div",null,u("div",{class:"grid2",style:{marginBottom:"12px"}},u("button",{class:"big accent",onclick:()=>this.newIdea()},he("plus"),"Nouvelle"),u("button",{class:"big",onclick:()=>a.click()},he("download"),"Importer")),t,a,u("div",{class:"sect"},u("h3",{text:"Sauvegarde hors de l\u2019app"}),u("p",{class:"note",text:"Les projets sont enregistr\xE9s automatiquement sur cet appareil. Pour les garder ailleurs (Fichiers, iCloud Drive\u2026), exporte une sauvegarde compl\xE8te."}),u("button",{class:"big",onclick:async()=>{let r=await e.backupAll(),n=new File([r],`MOTIF-sauvegarde-${new Date().toISOString().slice(0,10)}.json`,{type:"application/json"});await Zs(n)!=="cancelled"&&this.ctx.toast("Sauvegarde pr\xEAte")}},he("share"),"Sauvegarder tous les projets")));this.open("Projets",o)}projectMenu(e,t){let s=this.store,a=u("input",{class:"field",value:e.name,"aria-label":"Nom du projet"}),o=u("div",null,u("div",{class:"sect"},u("h3",{text:"Nom"}),a),u("div",{class:"list"},u("button",{class:"item",onclick:async()=>{let r=a.value.trim()||e.name;e.id===s.project.id?s.rename(r):(e.name=r,await vt.put("projects",e)),await s.save(),this.library()}},u("span",{class:"tx"},u("b",{text:"Renommer"}))),u("button",{class:"item",onclick:async()=>{e.id!==s.project.id&&await s.openProject(e.id),await s.duplicateProject(),this.ctx.toast("Copie cr\xE9\xE9e"),this.library()}},u("span",{class:"tx"},u("b",{text:"Dupliquer"}))),u("button",{class:"item",onclick:async()=>{let r=new File([JSON.stringify(e,null,1)],`${Cs(e.name)}.motif.json`,{type:"application/json"});await Zs(r)}},u("span",{class:"tx"},u("b",{text:"Exporter le fichier projet"}))),u("button",{class:"item",onclick:()=>this.confirm(`Supprimer \xAB ${e.name} \xBB ?`,"Le projet sera effac\xE9 de cet appareil. Exporte-le avant si tu veux le garder.","Supprimer",async()=>{await s.deleteProject(e.id),this.ctx.toast("Projet supprim\xE9"),this.library()})},u("span",{class:"tx"},u("b",{text:"Supprimer\u2026",style:{color:"var(--rec)"}})))));this.open(e.name,o)}confirm(e,t,s,a){let o=u("div",null,u("p",{class:"note",text:t}),u("div",{class:"grid2"},u("button",{class:"big",onclick:()=>this.close(),text:"Annuler"}),u("button",{class:"big accent",style:{background:"var(--rec)",color:"#fff"},onclick:async()=>{this.close(!0),await a()},text:s})));this.open(e,o)}newIdea(){let e=this.store,t=u("div",{class:"list"},u("button",{class:"item",onclick:async()=>{await e.newProject(null),await s()}},u("span",{class:"ic"},he("plus")),u("span",{class:"tx"},u("b",{text:"Id\xE9e vierge"}),u("small",{text:"Kit Studio, 2 mesures"}))),u("button",{class:"item",onclick:async()=>{let r=e.planRandomProject();for(let n of[...r.parts.drum.kit,r.parts.bass.preset,r.parts.lead.preset])await this.ctx.loadBanksFor(qe(n));await e.save(),e.loadProject(r),await s(`${qe(r.parts.bass.preset).name} \xB7 ${qe(r.parts.lead.preset).name} \xB7 touche le d\xE9 pour relancer`)}},u("span",{class:"ic"},he("dice")),u("span",{class:"tx"},u("b",{text:"Id\xE9e au hasard"}),u("small",{text:"Sons et octaves tir\xE9s au sort, tempo et gamme d\u2019une sc\xE8ne"}))),...ps.map(r=>u("button",{class:"item",onclick:async()=>{await e.newProject(r.id),await s()}},u("span",{class:"ic"},he("sparkle")),u("span",{class:"tx"},u("b",{text:r.name}),u("small",{text:`${r.bpm} BPM \xB7 ${Xt[r.key]} ${$t(r.scale).name.toLowerCase()} \xB7 sons de la sc\xE8ne`}))))),s=async r=>{this.close(),this.ctx.toast(r||"Nouvelle id\xE9e");let n=e.project;for(let l of[...n.parts.drum.kit,n.parts.bass.preset,n.parts.lead.preset])await this.ctx.loadBanksFor(qe(l));e.syncAll()},a=u("div",{class:"list"},...$o.map(r=>{let n=Ct(r);return u("button",{class:"item",onclick:async()=>{await e.save(),e.loadProject(Xo(r)),await s("Exemple charg\xE9 : touche \u25B6")}},u("span",{class:"ic"},he("play")),u("span",{class:"tx"},u("b",{text:"Exemple "+n.short}),u("small",{text:`Boucle A + variation B \xB7 ${n.bpm} BPM`})))})),o=u("div",{class:"sect"},u("h3",{text:"Tendances 2026 : morceaux jou\xE9s"}),u("p",{class:"note",text:"Vingt morceaux jou\xE9s sur MOTIF : \xE0 la lecture, les doigts fant\xF4mes refont chaque geste, les tweaks bougent, les variations et l\u2019arrangement s\u2019encha\xEEnent. M\xE9lodies originales ; le tempo, la tonalit\xE9, le groove et les sons suivent chaque tendance."}),u("div",{class:"list"},..._i.map(r=>u("button",{class:"item",onclick:async()=>{await e.save(),e.loadProject(Zo(r.id)),await s(`${r.name} \xB7 ${r.trend} \xB7 touche \u25B6`)}},u("span",{class:"ic"},he("play")),u("span",{class:"tx"},u("b",{text:r.name}),u("small",{text:`${r.trend} \xB7 ${r.tempo} BPM \xB7 ${r.bars} mesures`,style:{whiteSpace:"normal"}}))))));this.open("Nouvelle id\xE9e",u("div",null,u("div",{class:"sect"},u("h3",{text:"Partir de z\xE9ro"}),t),o,u("div",{class:"sect"},u("h3",{text:"Exemples \xE0 \xE9couter et modifier"}),a)))}browser(){let e=this.store,t=e.ui,s=t.part==="drum"?ms[t.lane]:t.part,a="all",o=u("div",{class:"list"}),r=u("div",{class:"filters"}),n=()=>t.part==="drum"?e.project.parts.drum.kit[t.lane]:e.project.parts[t.part].preset,l=()=>{let p=Ot(s).filter(m=>a==="all"||(a==="core"?!m.style:m.style===a));o.replaceChildren(...p.map(m=>{let v=m.style?Ct(m.style):null;return u("button",{class:"item","aria-current":String(m.id===n()),onclick:async()=>{await Di(m.id),l()}},u("span",{class:"tx"},u("b",{text:m.name}),u("small",{text:m.desc||""})),v?u("span",{class:"tag",text:v.short}):null)}));let f=o.querySelector('[aria-current="true"]');f&&f.scrollIntoView({block:"center"})},d=[["all","Tous"],["core","Base"],...ps.map(h=>[h.id,h.short])];r.replaceChildren(...d.map(([h,p])=>{let f=u("button",{"aria-pressed":String(a===h)},p);return f.addEventListener("click",()=>{a=h;for(let m of r.children)m.setAttribute("aria-pressed","false");f.setAttribute("aria-pressed","true"),l()}),f}));let c=u("div",null);if(t.part==="drum"){let h=u("div",{class:"seg",style:{marginBottom:"10px"}},...["Kick","Snare","Hat","Perc"].map((f,m)=>u("button",{"aria-pressed":String(t.lane===m),onclick:()=>{t.lane=m,this.browser(),e.changed("preset")}},f))),p=u("div",{class:"filters"},...qt.map(f=>u("button",{onclick:async()=>{for(let m of f.kit)await this.ctx.loadBanksFor(qe(m));e.applyKit(f.id,!1),this.ctx.toast("Kit "+f.name),l()}},f.name)));c.append(h,u("div",{class:"sect"},u("h3",{text:"Kits complets"}),p))}c.append(r,o),this.open(t.part==="drum"?"Sons de batterie":t.part==="bass"?"Basses":"M\xE9lodies",c),l()}keyPicker(){let e=this.store,t=u("div",{class:"cards"},...Xt.map((a,o)=>u("button",{class:"pat",style:{width:"52px",height:"48px",fontSize:"16px"},"aria-pressed":String(e.project.key===o),onclick:()=>{e.set("key",o),this.keyPicker()}},a))),s=u("div",{class:"list"},...ba.map(a=>u("button",{class:"item","aria-current":String(e.project.scale===a.id),onclick:()=>{e.set("scale",a.id),this.keyPicker()}},u("span",{class:"tx"},u("b",{text:a.name}),u("small",{text:a.iv.map(o=>Xt[(o+e.project.key)%12]).join(" \xB7 ")})))));this.open("Tonalit\xE9",u("div",null,u("div",{class:"sect"},u("h3",{text:"Tonique"}),t),u("div",{class:"sect"},u("h3",{text:"Gamme (les notes enregistr\xE9es suivent)"}),s)))}clearMenu(){let e=this.store,t=e.ui,s=(r,n,l)=>u("button",{class:"item",onclick:()=>{l(),this.close(),this.ctx.toast("Effac\xE9",{label:"Annuler",fn:()=>e.undo()})}},u("span",{class:"tx"},u("b",{text:r}),u("small",{text:n}))),a=[];t.part==="drum"?(a.push(s(`Effacer ${["le kick","la snare","le hat","la perc"][t.lane]}`,"Seulement cette ligne de batterie",()=>e.clearPart("drum",t.lane))),a.push(s("Effacer toute la batterie","Les quatre lignes",()=>e.clearPart("drum",null)))):a.push(s(`Effacer la ${t.part==="bass"?"basse":"m\xE9lodie"}`,"Toutes les notes de la boucle",()=>e.clearPart(t.part))),a.push(s("Effacer les mouvements","Automation des tweaks de cette partie",()=>{if(t.part==="drum")for(let r=0;r<4;r++)e.clearAuto("d"+r);else e.clearAuto(t.part)})),e.redoStack.length&&a.unshift(u("button",{class:"item",onclick:()=>{e.redo(),this.close(),this.ctx.toast("R\xE9tabli")}},u("span",{class:"tx"},u("b",{text:"R\xE9tablir"}),u("small",{text:"Refaire ce que \u21B6 vient d\u2019annuler"}))));let o=u("div",null,u("p",{class:"note",text:"Pour n\u2019effacer qu\u2019une portion : glisse sur la frise (ou touche une mesure) puis touche la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."}),u("div",{class:"list"},...a));this.open("Effacer",o)}song(){this.store.ui.view="song",document.querySelector('.nav [data-v="song"]').click()}songView(){let e=this.store,t=u("div",{class:"scroll"}),s=[],a=()=>{let r=e.project;t.replaceChildren();let n=new Et({label:"Tempo",min:()=>40,max:()=>220,get:()=>e.project.tempo,set:v=>e.set("tempo",v),format:v=>({v:String(v),s:"BPM"}),step:5,onTap:()=>h()}),l=new Et({label:"Swing",min:()=>50,max:()=>75,get:()=>e.project.swing,set:v=>e.set("swing",v),format:v=>({v:v===50?"OFF":v+"%",s:"groove"}),step:8}),d=new Et({label:"Tonalit\xE9",min:()=>0,max:()=>11,get:()=>e.project.key,set:v=>e.set("key",v),format:v=>({v:Xt[v],s:$t(e.project.scale).name}),step:14,onTap:()=>this.keyPicker()}),c=[],h=()=>{let v=performance.now();if(c=c.filter(g=>v-g<2500),c.push(v),c.length>=3){let g=(c[c.length-1]-c[0])/(c.length-1);e.set("tempo",Math.round(6e4/g)),n.render()}else this.ctx.toast("Tape encore pour r\xE9gler le tempo")};t.append(u("div",{class:"sect"},u("h3",{text:"Global"}),u("div",{class:"controls"},n.el,l.el,d.el))),requestAnimationFrame(()=>{n.render(),l.render(),d.render()}),t.append(u("div",{class:"sect"},u("h3",{text:"Longueur de la boucle"}),u("div",{class:"seg"},...vo.map(v=>u("button",{"aria-pressed":String(r.bars===v),onclick:()=>{let g=r.bars;v!==g&&(e.snapshot(),e.set("bars",v),a(),this.ctx.toast(v>g?"Boucle allong\xE9e : le contenu est r\xE9p\xE9t\xE9":"Boucle raccourcie : la fin est coup\xE9e",{label:"Annuler",fn:()=>e.undo()}))}},`${v} mes.`)))));let p=u("div",{class:"cards"},...r.patterns.map((v,g)=>{let b=u("button",{class:"pat","aria-pressed":String(r.current===g),onclick:()=>{e.selectPattern(g),a()}},v.name,u("small",{text:`${pi(v)} \xE9v.`})),x=0;return b.addEventListener("pointerdown",()=>{x=setTimeout(()=>{r.patterns.length>1&&this.confirm(`Supprimer la variation ${v.name} ?`,"Ses notes et mouvements seront effac\xE9s.","Supprimer",()=>{e.deletePattern(g),a()})},650)}),b.addEventListener("pointerup",()=>clearTimeout(x)),b.addEventListener("pointercancel",()=>clearTimeout(x)),b}),r.patterns.length<8?u("button",{class:"pat add","aria-label":"Nouvelle variation (copie)",onclick:()=>{e.addPattern(r.current),a(),this.ctx.toast("Variation copi\xE9e : modifie-la librement")}},"+"):null);t.append(u("div",{class:"sect"},u("h3",{text:"Variations de la boucle"}),p,u("p",{class:"note",text:"\xAB + \xBB copie la variation en cours. Appui long pour supprimer."})));let f=u("div",{class:"secs"});r.song.sections.forEach((v,g)=>{let b=[["d0","K"],["d1","S"],["d2","H"],["d3","P"],["bass","B"],["lead","L"]].map(([x,T])=>u("button",{"aria-pressed":String(!!(v.mute&&v.mute[x])),"aria-label":"Couper "+x,onclick:()=>{let R=JSON.parse(JSON.stringify(r.song));R.sections[g].mute={...R.sections[g].mute,[x]:!(v.mute&&v.mute[x])},e.setSong(R),a()}},T));f.append(u("div",{class:"sec"+(e.ui.playing&&r.song.enabled&&e.ui.section===g?" playing":"")},u("button",{class:"p","aria-label":"Changer de variation",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song));x.sections[g].p=(v.p+1)%r.patterns.length,e.setSong(x),a()}},r.patterns[v.p]?r.patterns[v.p].name:"?"),u("button",{class:"reps",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song)),T=[1,2,4,8];x.sections[g].reps=T[(T.indexOf(v.reps)+1)%T.length],e.setSong(x),a()}},`\xD7${v.reps}`),u("div",{class:"mutes"},...b),u("button",{class:"x","aria-label":"Retirer la section",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song));x.sections.splice(g,1),x.sections.length||(x.enabled=!1),e.setSong(x),a()}},he("close"))))});let m=u("button",{class:"big"+(r.song.enabled?" accent":""),onclick:()=>{r.song.sections.length?e.setSong({...r.song,enabled:!r.song.enabled}):e.autoArrange(),a()}},he("song"),r.song.enabled?"Arrangement activ\xE9 (lecture du morceau)":"Lire l\u2019arrangement");t.append(u("div",{class:"sect"},u("h3",{text:"Arrangement"}),m,u("div",{style:{height:"8px"}}),f,u("div",{class:"grid2",style:{marginTop:"8px"}},u("button",{class:"big",onclick:()=>{let v=JSON.parse(JSON.stringify(r.song));v.sections.push({p:r.current,reps:2,mute:{}}),v.enabled=!0,e.setSong(v),a()}},he("plus"),"Section"),u("button",{class:"big",onclick:()=>{e.autoArrange(),a(),this.ctx.toast("Arrangement cr\xE9\xE9 \xE0 partir de tes variations")}},he("sparkle"),"D\xE9velopper")),u("p",{class:"note",text:"Chaque section joue une variation un certain nombre de fois ; touche K S H P B L pour couper une partie dans la section."}))),t.append(u("div",{class:"sect"},u("h3",{text:"Exporter"}),u("button",{class:"big accent",onclick:()=>this.exportSheet()},he("share"),"WAV, pistes, MIDI, projet")))};a();let o=this.store.on("change",r=>{(r==="section"||r==="song")&&a()});return s.push(o),{el:t,cleanup:()=>s.forEach(r=>r())}}exportSheet(){let e=this.store,t=this.ctx.host(),s=e.project,a=s.song.enabled&&s.song.sections.length,o=u("div",{class:"seg"},...[1,2,4,8].map(g=>u("button",{"aria-pressed":String(g===2),onclick:b=>{for(let x of o.children)x.setAttribute("aria-pressed","false");b.currentTarget.setAttribute("aria-pressed","true"),r=g}},`\xD7${g}`))),r=2,n=u("div",{class:"prog"},u("i")),l=u("p",{class:"note",text:""}),d=u("div",{class:"list"}),c=g=>{n.firstChild.style.width=Math.round(g*100)+"%"},h=(g,b)=>{d.prepend(u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:g.name}),u("small",{text:b})),u("button",{class:"pill on",onclick:async()=>{await Zs(g)==="downloaded"&&this.ctx.toast("Fichier t\xE9l\xE9charg\xE9")}},he("share"),"Partager")))},p=g=>{for(let b of m.querySelectorAll("button"))b.disabled=g},f=async g=>{p(!0),c(0),l.textContent=g?"Rendu des pistes\u2026":"Rendu du mix\u2026";try{let b=await jo(e,t,{stems:g,loops:r,onProgress:c,build:this.ctx.build});if(c(1),g){let x=Vo(b),T=new File([x],`${Cs(s.name)}-pistes.zip`,{type:"application/zip"});h(T,`${b.length} fichiers WAV 24 bits \xB7 ${(x.size/1e6).toFixed(1)} Mo`);let R=b.find(I=>I.group===null);R&&await Ai(R.name,new Blob([R.data],{type:"audio/wav"}),{seconds:R.seconds,project:s.name})}else{let x=b[0],T=new Blob([x.data],{type:"audio/wav"}),R=new File([T],x.name,{type:"audio/wav"});h(R,`${x.seconds.toFixed(1)} s \xB7 WAV 24 bits 48 kHz \xB7 cr\xEAte ${(20*Math.log10(x.peak)).toFixed(1)} dBFS`),await Ai(x.name,T,{seconds:x.seconds,project:s.name})}l.textContent="Pr\xEAt. Touche \xAB Partager \xBB pour l\u2019enregistrer dans Fichiers ou l\u2019envoyer."}catch(b){l.textContent="\xC9chec du rendu : "+b.message}p(!1)},m=u("div",{class:"list"},u("button",{class:"item",onclick:()=>f(!1)},u("span",{class:"ic"},he("speaker")),u("span",{class:"tx"},u("b",{text:"Mix WAV"}),u("small",{text:"Le morceau tel que tu l\u2019entends, effets et mouvements compris"}))),u("button",{class:"item",onclick:()=>f(!0)},u("span",{class:"ic"},he("mix")),u("span",{class:"tx"},u("b",{text:"Pistes s\xE9par\xE9es (ZIP)"}),u("small",{text:"Kick, snare, hat, perc, basse, m\xE9lodie + mix"}))),u("button",{class:"item",onclick:()=>{h(Go(e),"Notes de batterie, basse et m\xE9lodie (MIDI type 1)")}},u("span",{class:"ic"},he("note")),u("span",{class:"tx"},u("b",{text:"MIDI"}),u("small",{text:"Pour continuer dans un logiciel de musique"}))),u("button",{class:"item",onclick:()=>{h(Wo(e),"Projet MOTIF modifiable")}},u("span",{class:"ic"},he("file")),u("span",{class:"tx"},u("b",{text:"Fichier projet"}),u("small",{text:"\xC0 r\xE9importer dans MOTIF"})))),v=u("div",null,a?u("p",{class:"note",text:"L\u2019arrangement est activ\xE9 : le rendu suit les sections."}):u("div",{class:"sect"},u("h3",{text:"R\xE9p\xE9titions de la boucle"}),o),m,u("div",{style:{height:"10px"}}),n,l,d);this.open("Exporter",v)}async player(){let e=u("div",{class:"list"}),t=this.audio||(this.audio=u("audio",{preload:"none"})),s=null,a=async()=>{let n=(await vt.all("renders")).map(c=>({...c,kind:"Rendu"})),l=(await vt.all("files")).map(c=>({...c,kind:"Import\xE9"})),d=[...n,...l].sort((c,h)=>h.created-c.created);d.length?e.replaceChildren(...d.map(c=>{let h=u("button",{class:"pill","aria-label":"Lire"},he("play"));h.addEventListener("click",()=>{if(s&&t.dataset.id===c.id&&!t.paused){t.pause();return}s&&URL.revokeObjectURL(s),s=URL.createObjectURL(c.blob),t.src=s,t.dataset.id=c.id,t.play().catch(()=>{})});let p=u("button",{class:"pill","aria-label":"Partager",onclick:()=>Zs(new File([c.blob],c.name,{type:c.type||"audio/wav"}))},he("share")),f=u("button",{class:"pill","aria-label":"Supprimer",onclick:()=>this.confirm("Supprimer ce fichier ?",c.name,"Supprimer",async()=>{await vt.del(c.kind==="Rendu"?"renders":"files",c.id),this.player()})},he("trash"));return u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:c.name}),u("small",{text:`${c.kind} \xB7 ${new Date(c.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})} \xB7 ${((c.size||0)/1e6).toFixed(1)} Mo`})),h,p,f)})):e.replaceChildren(u("p",{class:"note",text:"Aucun rendu pour l\u2019instant. Exporte un mix WAV ou importe un fichier audio."}))},o=u("input",{type:"file",accept:"audio/*",class:"hidden",multiple:!0});o.addEventListener("change",async()=>{for(let n of o.files)await vt.put("files",{id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),name:n.name,created:Date.now(),size:n.size,type:n.type,blob:n});o.value="",a()});let r=u("div",{class:"sect"},t);t.controls=!0,t.style.width="100%",await a(),this.open("Lecteur",u("div",null,r,u("button",{class:"big",style:{marginBottom:"10px"},onclick:()=>o.click()},he("download"),"Importer un fichier audio"),e,o,u("p",{class:"note",text:"Les rendus et fichiers import\xE9s restent sur cet appareil ; rien n\u2019est envoy\xE9 sur internet."})),{onClose:()=>{t.pause()}})}async offline(){let e=await co(),t=navigator.storage&&navigator.storage.persisted?await navigator.storage.persisted().catch(()=>!1):!1,s=u("p",{class:"note",text:window.__motifOffline||"V\xE9rification\u2026"}),a=u("div",{class:"prog"},u("i")),o=u("div",null,u("div",{class:"sect"},u("h3",{text:"Hors ligne"}),s,a,u("button",{class:"big accent",style:{marginTop:"10px"},onclick:async()=>{s.textContent="T\xE9l\xE9chargement de tous les sons\u2026";try{await(window.__motifCacheAll?window.__motifCacheAll(r=>{a.firstChild.style.width=Math.round(r*100)+"%"}):Promise.reject(new Error("service worker indisponible"))),s.textContent="Tout est disponible hors ligne."}catch(r){s.textContent="\xC9chec : "+r.message}}},he("download"),"Tout rendre disponible hors ligne")),u("div",{class:"sect"},u("h3",{text:"Version"}),u("p",{class:"note",text:`MOTIF 3 \xB7 version ${this.ctx.build}. Les mises \xE0 jour ne touchent jamais \xE0 tes projets (ils sont dans la base locale, s\xE9par\xE9e du cache).`}),u("button",{class:"big",onclick:()=>window.__motifCheckUpdate&&window.__motifCheckUpdate(!0)},"Rechercher une mise \xE0 jour"),u("p",{class:"note"},"Version pr\xE9c\xE9dente pour comparer : ",u("a",{href:"https://motif-studio-iphone.taxulas.chatgpt.site/figure/",target:"_blank",rel:"noopener",style:{color:"var(--accent)"}},"MOTIF Studio 2.4")," (acc\xE8s priv\xE9).")),u("div",{class:"sect"},u("h3",{text:"Stockage"}),u("p",{class:"note",text:`${t?"Stockage persistant accord\xE9.":"Stockage standard (le navigateur peut le lib\xE9rer si l\u2019appareil manque de place ; exporte une sauvegarde de temps en temps)."}${e?` Utilis\xE9 : ${(e.usage/1e6).toFixed(1)} Mo.`:""}`})),u("div",{class:"sect"},u("h3",{text:"Son"}),u("button",{class:"big",onclick:async()=>{this.close();let r=await this.ctx.host().rebuild();this.ctx.toast(r?"Son r\xE9initialis\xE9":"Touchez l\u2019\xE9cran pour r\xE9activer le son")}},he("speaker"),"R\xE9initialiser le son")));this.open("Hors ligne et mises \xE0 jour",o)}help(){let e=(t,s)=>u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:t}),u("small",{text:s,style:{whiteSpace:"normal"}})));this.open("Les gestes",u("div",{class:"list"},e("Jouer","Touche le pad : le son joue avec le rythme choisi, sans lancer la boucle. Gauche-droite = notes, haut-bas = expression."),e("Enregistrer","REC arme. Le premier toucher lance la boucle et la prise. Rejouer par-dessus remplace ce qui passe sous ton doigt."),e("Rythme et liaisons","Glisse verticalement sur Rythme. Touche-le (ou glisse vers la droite) pour r\xE9gler les liaisons : les notes se lient et glissent."),e("Plage de notes","Glisse la fen\xEAtre pour la d\xE9placer (m\xEAme nombre de notes). Tire une poign\xE9e pour agrandir ou r\xE9duire. Touche ailleurs pour sauter."),e("Plusieurs doigts","Avec plusieurs doigts, l\u2019arp\xE8ge suit l\u2019ordre de pose ; \xAB Doigts \xBB change d\u2019ordre ou joue un accord."),e("Effacer une portion","Glisse sur la frise (ou touche une mesure), puis la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."),e("Changer de son","Glisse le nom ou utilise les fl\xE8ches : la boucle continue avec le nouveau son."),e("Tweaks","Chaque son a ses propres axes. Plusieurs points se bougent \xE0 la fois. Avec REC et lecture, les mouvements s\u2019enregistrent."),e("Batterie","Une colonne par son. Dans une colonne, gauche/milieu/droite = trois variantes, haut-bas = caract\xE8re."),e("Annuler","La fl\xE8che \u21B6 annule la derni\xE8re prise ou modification.")))}async licences(){let e=u("div",null,u("p",{class:"note",text:"Tous les sons synth\xE9tiques sont des cr\xE9ations originales de MOTIF. Les enregistrements int\xE9gr\xE9s sont dans le domaine public (CC0) ; ils ont \xE9t\xE9 convertis en mono, d\xE9coup\xE9s, normalis\xE9s et encod\xE9s en FLAC."}),u("div",{class:"list"},u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"Virtuosity Drums"}),u("small",{text:"Versilian Studios & Karoryfer Lecolds \xB7 CC0 1.0 \xB7 github.com/sfzinstruments/virtuosity_drums"}))),u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"Versilian Community Sample Library"}),u("small",{text:"Versilian Studios \xB7 CC0 1.0 \xB7 github.com/sgossner/VCSL"}))),ft.fluid?u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"WebGL Fluid Simulation (effets fluides)"}),u("small",{text:"\xA9 2017 Pavel Dobryakov \xB7 licence MIT \xB7 github.com/PavelDoGreat/WebGL-Fluid-Simulation",style:{whiteSpace:"normal"}}))):null),u("p",{class:"note",text:"Le d\xE9tail fichier par fichier (chemin d\u2019origine, commit, transformations, empreinte SHA-256) est dans banks/*/bank.json et SOUNDS.md."}));this.open("Sons et licences",e)}};function A0(){let i=document.documentElement;return i.hasAttribute("data-halloween")?"halloween":i.dataset.theme==="light"?"light":"dark"}function E0(i){document.documentElement.toggleAttribute("data-halloween",i==="halloween"),document.documentElement.dataset.theme=i==="light"?"light":"dark";try{localStorage.setItem(ft.storage+".theme",i)}catch{}let e=document.getElementById("themeColor");e&&e.setAttribute("content",i==="light"?"#f3efe6":i==="halloween"?"#0a0612":"#0b0c10"),window.dispatchEvent(new Event("resize")),window.dispatchEvent(new Event("motif:theme"))}function er({toast:i,store:e,build:t}){if(window.__motifOffline="Le mode hors ligne s\u2019active apr\xE8s le premier chargement complet.",!("serviceWorker"in navigator)){window.__motifOffline="Ce navigateur ne permet pas le mode hors ligne.";return}let s=location.hostname==="localhost"||location.hostname==="127.0.0.1";if(location.protocol!=="https:"&&!s){window.__motifOffline="Hors ligne indisponible sans HTTPS.";return}if(s&&!/[?&]sw\b/.test(location.search)){navigator.serviceWorker.getRegistrations().then(h=>h.forEach(p=>p.unregister())),window.__motifOffline="Service worker d\xE9sactiv\xE9 en d\xE9veloppement local.";return}let a=null,o=new URL("sw.js",location.href).href,r=()=>!!navigator.serviceWorker.controller&&navigator.serviceWorker.controller.scriptURL===o,n=h=>{i("Mise \xE0 jour disponible",{label:"Installer",fn:async()=>{await e.save(),h.postMessage({type:"skipWaiting"})}})};navigator.serviceWorker.register("sw.js",{scope:"./"}).then(h=>{a=h,h.waiting&&r()&&n(h.waiting),h.addEventListener("updatefound",()=>{let p=h.installing;p&&p.addEventListener("statechange",()=>{p.state==="installed"&&r()&&n(p)})}),c()}).catch(h=>{window.__motifOffline="Service worker non install\xE9 : "+h.message});let l=r(),d=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!l||d||(d=!0,e.save().finally(()=>location.reload()))}),navigator.serviceWorker.addEventListener("message",h=>{let p=h.data||{};p.type==="status"&&(window.__motifOffline=p.text),p.type==="cacheProgress"&&window.__motifCacheProgress&&window.__motifCacheProgress(p.value)});async function c(){let h=await navigator.serviceWorker.ready;h.active&&h.active.postMessage({type:"status"})}window.__motifCheckUpdate=async h=>{if(a)try{await a.update(),h&&!a.waiting&&!a.installing&&i("MOTIF est \xE0 jour")}catch{h&&i("Pas de connexion")}},window.__motifCacheAll=h=>new Promise((p,f)=>{navigator.serviceWorker.ready.then(m=>{let v=new MessageChannel;v.port1.onmessage=g=>{let b=g.data;b.type==="progress"?h&&h(b.value):b.type==="done"?(window.__motifOffline="Tout est disponible hors ligne.",p()):b.type==="error"&&f(new Error(b.message))},m.active.postMessage({type:"cacheAll"},[v.port2])},f)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&window.__motifCheckUpdate(!1)})}var tr=Math.PI/180,sr={beta:50,gamma:0},qa=22,Ca=6;function qi(i,e){let t=i*tr,s=e*tr;return[-Math.sin(s)*Math.cos(t),Math.sin(t),Math.cos(s)*Math.cos(t)]}function Ci(i){let e=[i[0]-.62,i[1],Math.max(.18,i[2])],t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}var Pi=qi(sr.beta,sr.gamma),Os=Ci(Pi);function ar(i){return[(i[0]-Pi[0])*1.4,(i[1]-Pi[1])*1.4]}var ht=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,_0=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  float offset = 1.33333333;
  vL = vUv - texelSize * offset; vR = vUv + texelSize * offset;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,D0=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
  sum += texture2D(uTexture, vL) * 0.35294117;
  sum += texture2D(uTexture, vR) * 0.35294117;
  gl_FragColor = sum;
}`,P0=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture;
void main () { gl_FragColor = texture2D(uTexture, vUv); }`,q0=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`,Oa=`
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
#endif`,C0=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; uniform sampler2D uTexture; uniform vec3 curve; uniform float threshold;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
  float br = max(c.r, max(c.g, c.b));
  float rq = clamp(br - curve.x, 0.0, curve.y);
  rq = curve.z * rq * rq;
  c *= max(rq, br - threshold) / max(br, 0.0001);
  gl_FragColor = vec4(c, 0.0);
}`,O0=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25;
}`,B0=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture; uniform float intensity;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25 * intensity;
}`,I0=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uTexture;
void main () {
  vec4 c = texture2D(uTexture, vUv);
  float br = max(c.r, max(c.g, c.b));
  c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
  gl_FragColor = c;
}`,F0=`
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
}`,z0=`
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
}`,N0=`
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
}`,H0=`
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
}`,U0=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,j0=`
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
}`,G0=`
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
}`,W0=`
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
}`,ir={optique:{id:0,bevel:20,thick:26,p:2.2,disp:.012,depth:1},liquide:{id:1,bevel:30,thick:34,p:2.6,disp:.03,depth:1},depoli:{id:2,bevel:26,thick:26,p:2,disp:.008,depth:1},cristal:{id:3,bevel:20,thick:12,p:1,disp:.045,depth:3},prisme:{id:4,bevel:34,thick:28,p:3.2,disp:.015,depth:.9}},Ba=i=>ir[i&&i.glassLook||"optique"]||ir.optique,Oi={SIM_RESOLUTION:128,DYE_RESOLUTION:512,DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,PRESSURE:.8,PRESSURE_ITERATIONS:16,CURL:24,SPLAT_RADIUS:.22,SPLAT_FORCE:5200,SHADING:!0,BLOOM:!0,BLOOM_ITERATIONS:7,BLOOM_RESOLUTION:192,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:128,SUNRAYS_WEIGHT:.8,IDLE_MS:4500},Bs=class{constructor(e={}){this.cfg={...Oi,...e},this.canvas=document.createElement("canvas"),this.canvas.className="fluid",this.canvas.setAttribute("aria-hidden","true"),this.ok=!1,this.raf=0,this.last=0,this.lastInput=0,this.queue=[],this.gain=1,this.boost=0,this.slow=0,this.ema=16,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.ok=!1,this.stop()}),this.canvas.addEventListener("webglcontextrestored",()=>this.init()),this.init()}init(){let e={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!0,powerPreference:"low-power"},t=this.canvas.getContext("webgl2",e),s=!!t;if(t||(t=this.canvas.getContext("webgl",e)),!t)return;this.gl=t;try{"drawingBufferColorSpace"in t&&(t.drawingBufferColorSpace="display-p3")}catch{}this.p3=t.drawingBufferColorSpace==="display-p3";let a,o;if(s)t.getExtension("EXT_color_buffer_float"),o=!0;else if(a=t.getExtension("OES_texture_half_float"),o=t.getExtension("OES_texture_half_float_linear"),!a)return;let r=s?t.HALF_FLOAT:a.HALF_FLOAT_OES,n=(p,f)=>this.supports(p,f,r)?{internal:p,format:f}:null,l,d,c;if(s?(l=n(t.RGBA16F,t.RGBA),d=n(t.RG16F,t.RG)||l,c=n(t.R16F,t.RED)||d):l=d=c=n(t.RGBA,t.RGBA),!l)return;this.ext={type:r,rgba:l,rg:d,r:c,linear:!!o},o||(this.cfg.SHADING=!1,this.cfg.BLOOM=!1,this.cfg.SUNRAYS=!1);let h=(p,f,m)=>this.program(p,f,m);this.p={blur:h(_0,D0),copy:h(ht,P0),clear:h(ht,q0),bloomPre:h(ht,C0),bloomBlur:h(ht,O0),bloomFinal:h(ht,B0),sunMask:h(ht,I0),sun:h(ht,F0),splat:h(ht,z0),advect:h(ht,N0,o?[]:["MANUAL_FILTERING"]),div:h(ht,H0),curl:h(ht,U0),vort:h(ht,j0),pressure:h(ht,G0),grad:h(ht,W0)},this.setDisplay(),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),this.dither=this.noiseTexture(64),this.keys=null,this.scene=null,this.keyTex=null,this.resetLight(),this.maskAll=this.maskTexture(null,1,1),this.maskSim=this.maskDye=this.maskAll,this.dye=null,this.velocity=null,this.ok=!0}supports(e,t,s){let a=this.gl,o=a.createTexture();a.bindTexture(a.TEXTURE_2D,o),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texImage2D(a.TEXTURE_2D,0,e,4,4,0,t,s,null);let r=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,r),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,o,0);let n=a.checkFramebufferStatus(a.FRAMEBUFFER)===a.FRAMEBUFFER_COMPLETE;return a.deleteFramebuffer(r),a.deleteTexture(o),n}shader(e,t,s){let a=this.gl,o=a.createShader(e);if(a.shaderSource(o,(s||[]).map(r=>`#define ${r}
`).join("")+t),a.compileShader(o),!a.getShaderParameter(o,a.COMPILE_STATUS)){let r=a.getShaderInfoLog(o);console.warn(r),(this.shaderErrors||(this.shaderErrors=[])).push(r)}return o}program(e,t,s){let a=this.gl,o=a.createProgram();a.attachShader(o,this.shader(a.VERTEX_SHADER,e)),a.attachShader(o,this.shader(a.FRAGMENT_SHADER,t,s)),a.bindAttribLocation(o,0,"aPosition"),a.linkProgram(o),a.getProgramParameter(o,a.LINK_STATUS)||console.warn(a.getProgramInfoLog(o));let r={},n=a.getProgramParameter(o,a.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let d=a.getActiveUniform(o,l).name;r[d]=a.getUniformLocation(o,d)}return{p:o,u:r,bind:()=>a.useProgram(o)}}setDisplay(){let e=[];this.cfg.SHADING&&e.push("SHADING"),this.cfg.BLOOM&&e.push("BLOOM"),this.cfg.SUNRAYS&&e.push("SUNRAYS"),this.p.display=this.program(ht,Oa,e),this.p.light=this.program(ht,Oa,[...e,"LIGHT_PASS"]),this.p.sources=this.program(ht,Oa,[...e,"SOURCES_PASS"]),this.p.haze=this.program(ht,Oa,[...e,"HAZE_PASS"])}noiseTexture(e){let t=this.gl,s=new Uint8Array(e*e*3),a=1234567;for(let r=0;r<s.length;r++)a=a*1103515245+12345&2147483647,s[r]=a>>23;let o=t.createTexture();return t.bindTexture(t.TEXTURE_2D,o),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGB,e,e,0,t.RGB,t.UNSIGNED_BYTE,s),{width:e,height:e,attach:r=>(t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,o),r)}}maskTexture(e,t,s){let a=this.gl,o=Js(this.maskCanvas||(this.maskCanvas=document.createElement("canvas")),e,t,s),r=a.createTexture();return a.bindTexture(a.TEXTURE_2D,r),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,o),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),{tex:r,attach:n=>(a.activeTexture(a.TEXTURE0+n),a.bindTexture(a.TEXTURE_2D,r),n)}}setKeys(e,t){!this.ok||t===this.keySig||(this.keySig=t,this.keys=e,this.rebuildMasks(),this.clear())}rebuildMasks(){let e=this.gl;for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&e.deleteTexture(t.tex);if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}this.maskSim=this.maskTexture(this.keys,this.velocity.width,this.velocity.height),this.maskDye=this.maskTexture(this.keys,this.dye.width,this.dye.height)}setScene(e){if(!this.ok)return;let t=this.scene&&this.scene.sig===e.sig;this.scene=e,this.margin=e.glass?this.marginTest||4e3:0,t||(this.keyTexSig=null,this.requestRender())}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,s=this.hostH,a=e.sig+"|"+t+"x"+s;if(this.keyTexSig===a)return;let o=this.gl;this.keyTex&&o.deleteTexture(this.keyTex.tex);let r=Ra(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,s),n=o.createTexture();o.bindTexture(o.TEXTURE_2D,n),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!0),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,r),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),this.keyTex={tex:n,attach:l=>(o.activeTexture(o.TEXTURE0+l),o.bindTexture(o.TEXTURE_2D,n),l)},this.keyTexSig=a}resetLight(){this.lightBase=Os.slice(),this.light=Os.slice(),this.lightTo=Os.slice(),this.slide=[0,0],this.slideTo=[0,0],this.up=null,this.touchSlots=[],this.gelOn=!0,this.meters=new Float32Array(8),this.margin=0,this.off=[0,0],this.dpr=1,this.hostW=0,this.hostH=0,this.srcFbo=null,this.lightFbo=null,this.hazeFbo=null,this.keyLitTex=null}setLight(e,t){let s=this.lightBase;this.lightTo=[s[0]*.75+(e-.5)*.45,s[1]*.75+(.5-t)*.45,s[2]]}setTilt(e,t){let s=qi(t,e),a=this.up;this.up=a?a.map((o,r)=>o+(s[r]-o)*.25):s,this.lightBase=Ci(this.up),this.slideTo=ar(this.up),this.lightTo=this.lightBase.slice(),(!a||Math.abs(a[0]-this.up[0])+Math.abs(a[1]-this.up[1])+Math.abs(a[2]-this.up[2])>.002)&&this.wake()}aim(e){this.lightTo=e.slice(),this.wake()}aimReset(){this.lightTo=this.lightBase.slice(),this.wake()}resetTilt(){this.up=null,this.lightBase=Os.slice(),this.lightTo=Os.slice(),this.slideTo=[0,0],this.wake()}screenColor(e){if(e=e||[.043,.047,.063],!this.p3)return e;let t=e.map(a=>a<=.04045?a/12.92:((a+.055)/1.055)**2.4);return[.8225*t[0]+.1774*t[1],.0332*t[0]+.9669*t[1],.0171*t[0]+.0724*t[1]+.9108*t[2]].map(a=>a<=.0031308?a*12.92:1.055*a**(1/2.4)-.055)}stepLight(){for(let e=0;e<3;e++)this.light[e]+=(this.lightTo[e]-this.light[e])*.12;for(let e=0;e<2;e++)this.slide[e]+=(this.slideTo[e]-this.slide[e])*.12}setObstacles(e){this.obstacles=(e||[]).slice(0,16),this.wake()}setControlHeight(e){this.ctrlH=e,this.wake()}obstacleData(e){let t=this.dpr||1,s=this.hostH,a=new Float32Array(64),o=new Float32Array(16),r=this.obstacles||[];return r.forEach((n,l)=>{a.set(e?[n[0]*t,s-n[3]*t,n[2]*t,s-n[1]*t]:[n[0]*t,n[1]*t,n[2]*t,n[3]*t],l*4),o[l]=(n[4]||0)*t}),{rects:a,radii:o,n:r.length,lightH:qa*t,ctrlH:(this.ctrlH||Ca)*t}}setKeyLights(e){let t=this.keyLit||(this.keyLit=new Uint8Array(256)),s=!1;for(let a=0;a<64;a++){let o=Math.round(Math.max(0,Math.min(1,e&&e[a]||0))*255);t[a*4]!==o&&(t[a*4]=o,s=!0)}s&&(this.keyLitDirty=!0,this.wake())}ensureKeyLit(){let e=this.gl;if(this.keyLit||(this.keyLit=new Uint8Array(256)),!this.keyLitTex){let t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);for(let[s,a]of[[e.TEXTURE_MIN_FILTER,e.NEAREST],[e.TEXTURE_MAG_FILTER,e.NEAREST],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,s,a);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,64,1,0,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitTex={tex:t,attach:s=>(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,t),s)},this.keyLitDirty=!1}this.keyLitDirty&&(e.bindTexture(e.TEXTURE_2D,this.keyLitTex.tex),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,1,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitDirty=!1)}setMeters(e){for(let t=0;t<8;t++)this.meters[t]=e[t]||0;this.wake()}slabData(e){let t=this.scene||{},s=(t.slabs||[[0,0,1,1]]).slice(0,8),a=new Float32Array(32),o=new Float32Array(32);return s.forEach((r,n)=>a.set(e?[r[0],1-r[3],r[2],1-r[1]]:r,n*4)),(t.fills||[]).slice(0,8).forEach((r,n)=>o.set(r,n*4)),{slabs:a,fills:o,n:s.length}}press(e,t,s,a){let o=performance.now(),r=this.touchSlots.find(n=>n.id===e&&!n.up);a==="down"?(this.touchSlots=this.touchSlots.filter(n=>!n.up||o-n.up<450).slice(-3),this.touchSlots.push({id:e,x:t,y:s,down:o,up:0}),Ba(this.scene).id===1&&this.setLight(t,s)):r&&(r.x=t,r.y=s,(a==="up"||a==="cancel")&&(r.up=o,this.lightTo=this.lightBase.slice())),this.wake()}touchUniforms(e){let t=performance.now(),s=new Float32Array(16);return this.touchSlots=this.touchSlots.filter(a=>!a.up||t-a.up<450),this.touchSlots.slice(-4).forEach((a,o)=>{let r=a.up?Math.max(0,1-(t-a.up)/450):Math.min(1,(t-a.down)/90);s.set([a.x,e?1-a.y:a.y,(t-a.down)/1e3,r],o*4)}),s}keyAt(e,t){if(!this.keys)return 0;for(let s=this.keys.length-1;s>=0;s--){let a=this.keys[s];if(e>=a.x0&&e<a.x1&&t>=a.y0&&t<a.y1)return s+1}return 0}fbo(e,t,s,a){let o=this.gl;o.activeTexture(o.TEXTURE0);let r=o.createTexture();o.bindTexture(o.TEXTURE_2D,r),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texImage2D(o.TEXTURE_2D,0,s.internal,e,t,0,s.format,this.ext.type,null);let n=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,n),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,r,0),o.viewport(0,0,e,t),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),{texture:r,fbo:n,width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,attach:l=>(o.activeTexture(o.TEXTURE0+l),o.bindTexture(o.TEXTURE_2D,r),l)}}double(e,t,s,a){let o=this.fbo(e,t,s,a),r=this.fbo(e,t,s,a);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return o},set read(n){o=n},get write(){return r},set write(n){r=n},swap(){let n=o;o=r,r=n}}}resizeDouble(e,t,s,a,o){if(e.width===t&&e.height===s)return e;let r=this.fbo(t,s,a,o);return this.p.copy.bind(),this.gl.uniform1i(this.p.copy.u.uTexture,e.read.attach(0)),this.blit(r),e.read=r,e.write=this.fbo(t,s,a,o),e.width=t,e.height=s,e.texelSizeX=1/t,e.texelSizeY=1/s,e}res(e){let t=this.hostW/this.hostH;t<1&&(t=1/t);let s=Math.round(e),a=Math.round(e*t);return this.hostW>this.hostH?{width:a,height:s}:{width:s,height:a}}initBuffers(){let e=this.gl,t=this.ext,s=this.cfg,a=this.res(s.SIM_RESOLUTION),o=this.res(s.DYE_RESOLUTION),r=t.linear?e.LINEAR:e.NEAREST;e.disable(e.BLEND),this.dye=this.dye?this.resizeDouble(this.dye,o.width,o.height,t.rgba,r):this.double(o.width,o.height,t.rgba,r),this.velocity=this.velocity?this.resizeDouble(this.velocity,a.width,a.height,t.rg,r):this.double(a.width,a.height,t.rg,r),this.divergence=this.fbo(a.width,a.height,t.r,e.NEAREST),this.curl=this.fbo(a.width,a.height,t.r,e.NEAREST),this.pressure=this.double(a.width,a.height,t.r,e.NEAREST);let n=this.res(s.BLOOM_RESOLUTION);this.bloom=this.fbo(n.width,n.height,t.rgba,r),this.bloomFbos=[];for(let d=0;d<s.BLOOM_ITERATIONS;d++){let c=n.width>>d+1,h=n.height>>d+1;if(c<2||h<2)break;this.bloomFbos.push(this.fbo(c,h,t.rgba,r))}let l=this.res(s.SUNRAYS_RESOLUTION);this.sunrays=this.fbo(l.width,l.height,t.r,r),this.sunraysTemp=this.fbo(l.width,l.height,t.r,r),this.rebuildMasks()}blit(e){let t=this.gl;e?(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)):(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}attach(e){this.ok&&(this.host!==e&&(this.host=e,this.hostW=0,this.ro&&this.ro.disconnect(),this.ro=null),this.canvas.parentNode!==e&&e.insertBefore(this.canvas,e.firstChild),this.ro||(this.ro=new ResizeObserver(()=>this.requestRender()),this.ro.observe(e)),this.requestRender())}detach(){this.stop(),this.canvas.remove(),this.ro&&this.ro.disconnect(),this.ro=null,this.host=null}fit(){let e=this.host;if(!e)return;let t=Math.min(window.devicePixelRatio||1,2),s=e.getBoundingClientRect(),a=(e.closest(".app")||document.documentElement).getBoundingClientRect(),o=this.margin||0,r=x=>Math.round(Math.max(0,Math.min(o,x))),n=r(s.left-a.left),l=r(s.top-a.top),d=r(a.right-s.right),c=r(a.bottom-s.bottom),h=s.width+n+d,p=s.height+l+c,f=`${n},${l},${h},${p}`;f!==this.placeKey&&(this.placeKey=f,Object.assign(this.canvas.style,{left:-n+"px",top:-l+"px",width:h+"px",height:p+"px"}));let m=Math.max(2,Math.round(h*t)),v=Math.max(2,Math.round(p*t));(this.canvas.width!==m||this.canvas.height!==v)&&(this.canvas.width=m,this.canvas.height=v),this.dpr=t,this.off=[Math.round(n*t),Math.round(l*t)];let g=Math.max(2,Math.round(s.width*t)),b=Math.max(2,Math.round(s.height*t));(this.hostW!==g||this.hostH!==b||!this.dye)&&(this.hostW=g,this.hostH=b,this.initBuffers())}get aspect(){return this.hostW/this.hostH}splat(e,t,s,a,o,r=1,n=!1){this.ok&&(this.queue.push([e,t,s,a,o,r,n]),this.queue.length>64&&this.queue.shift(),this.wake())}burst(e,t,s,a=1,o=6,r=.8){let n=Math.random()*Math.PI*2;for(let l=0;l<o;l++){let d=n+l/o*Math.PI*2;this.splat(e+Math.cos(d)*.012,t+Math.sin(d)*.012,Math.cos(d)*.05*a,Math.sin(d)*.05*a,l===0?s:K0(s,.35),r)}}pulse(e){this.boost=Math.max(this.boost,e)}push(e,t,s,a,o=3){this.splat(e,t,s,a,{r:0,g:0,b:0},o,!0)}setStyle(e){let t=this.cfg,s={b:t.BLOOM,s:t.SUNRAYS};Object.assign(t,e),t.BLOOM=s.b,t.SUNRAYS=s.s}wake(){this.lastInput=performance.now(),!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}keepAwake(){!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}stop(){this.raf&&cancelAnimationFrame(this.raf),this.raf=0}clear(){if(!this.ok||!this.dye)return;let e=this.gl;e.clearColor(0,0,0,0);for(let t of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.bloom,this.sunrays])e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.viewport(0,0,t.width,t.height),e.clear(e.COLOR_BUFFER_BIT);this.requestRender()}requestRender(){this.raf||this.pending||!this.ok||!this.canvas.isConnected||(this.pending=requestAnimationFrame(()=>{this.pending=0,!(this.raf||!this.canvas.isConnected)&&(this.fit(),this.render(!0))}))}frame(e){if(this.raf=0,!this.ok||!this.canvas.isConnected)return;let t=Math.min((e-this.last)/1e3,1/60);this.last=e,this.lastFrameAt&&e-this.lastInput<1500&&(this.ema+=(Math.min(200,e-this.lastFrameAt)-this.ema)*.1,this.slow=this.ema>45?this.slow+1:0),this.lastFrameAt=e,this.slow>60&&this.degrade(),this.fit();let s=e-this.lastInput<this.cfg.IDLE_MS;s?(this.rested=!1,this.inkOn!==!1?(this.applyInputs(),this.step(t),this.render()):(this.queue=[],this.render(!0))):this.stage&&(this.rested||(this.clear(),this.rested=!0),(this.restTick=(this.restTick||0)+1)%2===0&&this.render(!0)),this.boost*=.9,s||this.stage?this.raf=requestAnimationFrame(a=>this.frame(a)):this.clear()}degrade(){this.slow=0;let e=this.cfg;if(e.SUNRAYS)e.SUNRAYS=!1;else if(e.BLOOM)e.BLOOM=!1;else if(e.SIM_RESOLUTION>64)e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.dye=null,this.velocity=null,this.hostW=0;else return;this.setDisplay()}applyInputs(){let e=this.queue;this.queue=[];for(let[t,s,a,o,r,n,l]of e)this.splatNow(t,1-s,a*this.cfg.SPLAT_FORCE*V0(this.aspect),-o*this.cfg.SPLAT_FORCE*Y0(this.aspect),r,n,l?0:this.keyAt(t,s))}splatNow(e,t,s,a,o,r,n){let l=this.gl,d=this.p.splat,c=this.cfg.SPLAT_RADIUS*r/100;this.aspect>1&&(c*=this.aspect),d.bind(),l.uniform1i(d.u.uTarget,this.velocity.read.attach(0)),l.uniform1f(d.u.aspectRatio,this.aspect),l.uniform2f(d.u.point,e,t),l.uniform3f(d.u.color,s,a,0),l.uniform1f(d.u.radius,c),l.uniform1f(d.u.targetId,n?n/255:0),l.uniform1i(d.u.uMask,this.maskSim.attach(1)),this.blit(this.velocity.write),this.velocity.swap(),l.uniform1i(d.u.uMask,this.maskDye.attach(1)),l.uniform1i(d.u.uTarget,this.dye.read.attach(0)),l.uniform3f(d.u.color,o.r*this.gain,o.g*this.gain,o.b*this.gain),this.blit(this.dye.write),this.dye.swap()}step(e){let t=this.gl,s=this.p,a=this.velocity,o=this.cfg;t.disable(t.BLEND),s.curl.bind(),t.uniform2f(s.curl.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.curl.u.uVelocity,a.read.attach(0)),this.blit(this.curl),s.vort.bind(),t.uniform2f(s.vort.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.vort.u.uVelocity,a.read.attach(0)),t.uniform1i(s.vort.u.uCurl,this.curl.attach(1)),t.uniform1f(s.vort.u.curl,o.CURL),t.uniform1f(s.vort.u.dt,e),this.blit(a.write),a.swap(),s.div.bind(),t.uniform2f(s.div.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.div.u.uVelocity,a.read.attach(0)),t.uniform1i(s.div.u.uMask,this.maskSim.attach(2)),this.blit(this.divergence),s.clear.bind(),t.uniform1i(s.clear.u.uTexture,this.pressure.read.attach(0)),t.uniform1f(s.clear.u.value,o.PRESSURE),this.blit(this.pressure.write),this.pressure.swap(),s.pressure.bind(),t.uniform2f(s.pressure.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.pressure.u.uDivergence,this.divergence.attach(0)),t.uniform1i(s.pressure.u.uMask,this.maskSim.attach(2));for(let n=0;n<o.PRESSURE_ITERATIONS;n++)t.uniform1i(s.pressure.u.uPressure,this.pressure.read.attach(1)),this.blit(this.pressure.write),this.pressure.swap();s.grad.bind(),t.uniform2f(s.grad.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.grad.u.uPressure,this.pressure.read.attach(0)),t.uniform1i(s.grad.u.uVelocity,a.read.attach(1)),t.uniform1i(s.grad.u.uMask,this.maskSim.attach(2)),this.blit(a.write),a.swap(),s.advect.bind(),t.uniform2f(s.advect.u.texelSize,a.texelSizeX,a.texelSizeY),this.ext.linear||t.uniform2f(s.advect.u.dyeTexelSize,a.texelSizeX,a.texelSizeY);let r=a.read.attach(0);t.uniform1i(s.advect.u.uVelocity,r),t.uniform1i(s.advect.u.uSource,r),t.uniform1i(s.advect.u.uMask,this.maskSim.attach(2)),t.uniform1f(s.advect.u.dt,e),t.uniform1f(s.advect.u.dissipation,o.VELOCITY_DISSIPATION),this.blit(a.write),a.swap(),this.ext.linear||t.uniform2f(s.advect.u.dyeTexelSize,this.dye.texelSizeX,this.dye.texelSizeY),t.uniform1i(s.advect.u.uVelocity,a.read.attach(0)),t.uniform1i(s.advect.u.uSource,this.dye.read.attach(1)),t.uniform1i(s.advect.u.uMask,this.maskDye.attach(2)),t.uniform1f(s.advect.u.dissipation,o.DENSITY_DISSIPATION),this.blit(this.dye.write),this.dye.swap()}render(e){let t=this.gl,s=this.cfg,a=this.p;if(!this.dye)return;e||(s.BLOOM&&this.applyBloom(),s.SUNRAYS&&(this.applySunrays(),this.blur(this.sunrays,this.sunraysTemp,1))),this.ensureKeyTex();let o=this.scene||{};this.stepLight(),t.disable(t.BLEND);let r=t.drawingBufferWidth,n=t.drawingBufferHeight;if(o.glass){let l=this.srcFbo||(this.srcFbo=this.fbo(8,1,this.ext.rgba,t.NEAREST));this.useComposite(a.sources,o),this.blit(l);let d=this.ensureHazeFbo();this.useComposite(a.haze,o),t.uniform2f(a.haze.u.hazeRes,d.width,d.height),this.blit(d);let c=this.ensureLightFbo(r,n);this.useComposite(a.light,o),t.uniform2f(a.light.u.lightScale,r/c.width,n/c.height),a.light.u.uSources&&t.uniform1i(a.light.u.uSources,l.attach(7)),this.blit(c)}this.useComposite(a.display,o),o.glass&&(t.uniform1i(a.display.u.uLight,this.lightFbo.attach(5)),t.uniform2f(a.display.u.canvasRes,r,n),t.uniform2f(a.display.u.lightScale,r/this.lightFbo.width,n/this.lightFbo.height),a.display.u.uHaze&&(t.uniform1i(a.display.u.uHaze,this.hazeFbo.attach(7)),t.uniform2f(a.display.u.hazeRes,this.hazeFbo.width,this.hazeFbo.height))),this.blit(null)}ensureHazeFbo(){let e=this.gl,t=this.res(16),s=this.hazeFbo;return s&&s.width===t.width&&s.height===t.height?s:(s&&(e.deleteTexture(s.texture),e.deleteFramebuffer(s.fbo)),this.hazeFbo=this.fbo(t.width,t.height,this.ext.rgba,this.ext.linear?e.LINEAR:e.NEAREST),this.hazeFbo)}ensureLightFbo(e,t){let s=this.gl,a=Math.max(2,Math.ceil(e/2)),o=Math.max(2,Math.ceil(t/2)),r=this.lightFbo;return r&&r.width===a&&r.height===o?r:(r&&(s.deleteTexture(r.texture),s.deleteFramebuffer(r.fbo)),this.lightFbo=this.fbo(a,o,this.ext.rgba,this.ext.linear?s.LINEAR:s.NEAREST),this.lightFbo)}useComposite(e,t){let s=this.gl,a=this.cfg,o=e.u,r=s.drawingBufferHeight,n=this.hostW,l=this.hostH,d=this.dpr||1;e.bind(),s.uniform2f(o.texelSize,1/n,1/l),s.uniform2f(o.res,n,l),s.uniform2f(o.off,this.off[0],r-this.off[1]-l),s.uniform1f(o.dpr,d),s.uniform1i(o.uTexture,this.dye.read.attach(0)),s.uniform1f(o.gain,1),a.BLOOM&&(s.uniform1i(o.uBloom,this.bloom.attach(1)),s.uniform1i(o.uDithering,this.dither.attach(2)),s.uniform2f(o.ditherScale,n/this.dither.width,l/this.dither.height)),a.SUNRAYS&&s.uniform1i(o.uSunrays,this.sunrays.attach(3));let c=(b,x)=>o[b]&&s.uniform3f(o[b],x[0],x[1],x[2]);c("bgTop",t.bgTop||[.1,.11,.14]),c("bgBot",t.bgBot||[.07,.075,.094]),c("accent",t.accent||[.8,.9,.3]),c("surf",t.surf||[.086,.09,.114]),c("appBg",this.screenColor(t.appBg));let h=t.sep||[1,1,1,.06];s.uniform4f(o.sep,h[0],h[1],h[2],h[3]),s.uniform1f(o.sepPx,(t.sepPx||1)*d),o["kinds[0]"]&&s.uniform4fv(o["kinds[0]"],new Float32Array((t.kinds||Array(6).fill([0,0,0,0])).flat())),s.uniform1f(o.useKeys,t.keys?1:0),s.uniform1f(o.grid,t.kind==="xy"?1:0),s.uniform1f(o.darkTheme,t.dark===!1?0:1),this.keyTex&&t.keys&&s.uniform1i(o.uKeys,this.keyTex.attach(4)),s.uniform1f(o.glass,t.glass?1:0),s.uniform1f(o.radius,(t.radius||20)*d);let p=Ba(t);s.uniform1f(o.bevel,p.bevel*d),s.uniform1f(o.thickness,p.thick*d),o.look&&s.uniform4f(o.look,p.id,p.p,p.disp,p.depth);let f=this.stage||[0,0,0,0];o.stage&&s.uniform4f(o.stage,f[0],f[1],f[2],f[3]),s.uniform1f(o.gel,this.gelOn===!1?0:t.gel??1);let m=this.touchUniforms(!0);(o["touches[0]"]||o.touches)&&s.uniform4fv(o["touches[0]"]||o.touches,m);let v=this.slabData(!0);o["slabs[0]"]&&s.uniform4fv(o["slabs[0]"],v.slabs),o["fills[0]"]&&s.uniform4fv(o["fills[0]"],v.fills),o["meters[0]"]&&s.uniform1fv(o["meters[0]"],this.meters),s.uniform1f(o.nSlabs,v.n),s.uniform1f(o.mode,t.kind==="mix"?1:0),s.uniform2f(o.lightDir,this.light[0],this.light[1]),s.uniform1f(o.lightZ,this.light[2]),s.uniform2f(o.slide,this.slide[0],this.slide[1]),s.uniform1f(o.spillK,t.spill||0),s.uniform1f(o.shadowK,t.shadow||0),s.uniform1f(o.style,t.style||0);let g=t.keyGlow||[1,1,1,0];if(o.keyGlow&&s.uniform4f(o.keyGlow,g[0],g[1],g[2],g[3]),this.ensureKeyLit(),o.uKeyLit&&s.uniform1i(o.uKeyLit,this.keyLitTex.attach(6)),o["obst[0]"]){let b=this.obstacleData(!0);s.uniform4fv(o["obst[0]"],b.rects),s.uniform1f(o.nObst,b.n),s.uniform2f(o.obstH,b.lightH,b.ctrlH),o["obstR[0]"]&&s.uniform1fv(o["obstR[0]"],b.radii)}s.uniform1f(o.pulse,Math.min(1,this.boost)),s.uniform1f(o.hdr,1)}applyBloom(){let e=this.gl,t=this.cfg,s=this.p;if(this.bloomFbos.length<2)return;let a=this.bloom;e.disable(e.BLEND),s.bloomPre.bind();let o=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;e.uniform3f(s.bloomPre.u.curve,t.BLOOM_THRESHOLD-o,o*2,.25/o),e.uniform1f(s.bloomPre.u.threshold,t.BLOOM_THRESHOLD),e.uniform1i(s.bloomPre.u.uTexture,this.dye.read.attach(0)),this.blit(a),s.bloomBlur.bind();for(let r of this.bloomFbos)e.uniform2f(s.bloomBlur.u.texelSize,a.texelSizeX,a.texelSizeY),e.uniform1i(s.bloomBlur.u.uTexture,a.attach(0)),this.blit(r),a=r;e.blendFunc(e.ONE,e.ONE),e.enable(e.BLEND);for(let r=this.bloomFbos.length-2;r>=0;r--){let n=this.bloomFbos[r];e.uniform2f(s.bloomBlur.u.texelSize,a.texelSizeX,a.texelSizeY),e.uniform1i(s.bloomBlur.u.uTexture,a.attach(0)),this.blit(n),a=n}e.disable(e.BLEND),s.bloomFinal.bind(),e.uniform2f(s.bloomFinal.u.texelSize,a.texelSizeX,a.texelSizeY),e.uniform1i(s.bloomFinal.u.uTexture,a.attach(0)),e.uniform1f(s.bloomFinal.u.intensity,t.BLOOM_INTENSITY*(1+this.boost*.8)),this.blit(this.bloom)}applySunrays(){let e=this.gl,t=this.p;e.disable(e.BLEND),t.sunMask.bind(),e.uniform1i(t.sunMask.u.uTexture,this.dye.read.attach(0)),this.blit(this.dye.write),t.sun.bind(),e.uniform1f(t.sun.u.weight,this.cfg.SUNRAYS_WEIGHT),e.uniform1i(t.sun.u.uTexture,this.dye.write.attach(0)),this.blit(this.sunrays)}blur(e,t,s){let a=this.gl,o=this.p;o.blur.bind();for(let r=0;r<s;r++)a.uniform2f(o.blur.u.texelSize,e.texelSizeX,0),a.uniform1i(o.blur.u.uTexture,e.attach(0)),this.blit(t),a.uniform2f(o.blur.u.texelSize,0,e.texelSizeY),a.uniform1i(o.blur.u.uTexture,t.attach(0)),this.blit(e)}},V0=i=>i<1?i:1,Y0=i=>i>1?1/i:1,K0=(i,e)=>({r:i.r*e,g:i.g*e,b:i.b*e});var X0=`
struct U { texel: vec2f, dyeTexel: vec2f, point: vec2f, aspect: f32, radius: f32, color: vec4f, a: f32, b: f32, c: f32, d: f32, curve: vec4f, e: vec4f };
struct VO { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VO {
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var o: VO; o.pos = vec4f(p[i], 0.0, 1.0); o.uv = vec2f(p[i].x * 0.5 + 0.5, 0.5 - p[i].y * 0.5); return o;
}
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var sl: sampler;
fn tx(t: texture_2d<f32>, uv: vec2f) -> vec4f { return textureSampleLevel(t, sl, uv, 0.0); }
`,$0={copy:`@group(0) @binding(2) var t0: texture_2d<f32>;
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
}`},Ia=`
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
`,Fa=`var<private> selRect: vec4f;
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
`,J0=()=>Ia+`@group(0) @binding(2) var dye: texture_2d<f32>;
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
`+Fa+`fn inkAt(uv: vec2f) -> vec3f {
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
}`,Bi=`@group(0) @binding(2) var dye: texture_2d<f32>;
@group(0) @binding(3) var bloom: texture_2d<f32>;
@group(0) @binding(4) var keys: texture_2d<f32>;
@group(0) @binding(5) var sn: sampler;
@group(0) @binding(6) var keyLit: texture_2d<f32>;
@group(0) @binding(7) var srcT: texture_2d<f32>;
@group(0) @binding(8) var haze: texture_2d<f32>;
`,Q0=()=>Ia+Bi+Fa+`@fragment fn fs(i: VO) -> @location(0) vec4f { return aroundLight(i.pos.xy * s.lightScale - s.off); }
`,Z0=()=>Ia+Bi+Fa+`@fragment fn fs(i: VO) -> @location(0) vec4f {
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
`,el=()=>Ia+Bi+Fa+`@fragment fn fs(i: VO) -> @location(0) vec4f {
  let c0 = floor(i.pos.xy);
  var sum = vec3f(0.0);
  for (var j = 0; j < 8; j = j + 1) {
    for (var n = 0; n < 8; n = n + 1) { sum = sum + glowAt((c0 + (vec2f(f32(n), f32(j)) + 0.5) / 8.0) / s.hazeRes); }
  }
  return vec4f(sum / 64.0, 1.0);
}
`,tl=()=>GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST,sa=256,aa=class i extends Bs{static supported(){return typeof navigator<"u"&&!!navigator.gpu}static async create(){try{let e=new i;return await e.initGPU(),e.ok?e:null}catch(e){return console.warn("WebGPU indisponible, repli sur WebGL",e),null}}init(){}async initGPU(){this.cfg={...Oi},this.ext={linear:!0};let e=await navigator.gpu.requestAdapter();if(!e)return;let t=await e.requestDevice();this.device=t,t.lost.then(()=>{this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let s=0;t.addEventListener("uncapturederror",f=>{console.warn("WebGPU",f.error&&f.error.message),++s>4&&this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let a=this.canvas.getContext("webgpu");if(!a)return;this.ctx=a,this.format="rgba16float";try{a.configure({device:t,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:"extended"},alphaMode:"premultiplied"}),this.p3=!0;let f=a.getConfiguration?a.getConfiguration():null;this.extended=f?!!(f.toneMapping&&f.toneMapping.mode==="extended"):!0,this.rangeOn=!0}catch{this.format=navigator.gpu.getPreferredCanvasFormat(),a.configure({device:t,format:this.format,alphaMode:"premultiplied"}),this.extended=!1,this.p3=!1}this.hdrScreen=this.extended&&matchMedia("(dynamic-range: high)").matches,this.lin=t.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.near=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.rep=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat"}),this.ubuf=t.createBuffer({size:sa*512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.staging=new ArrayBuffer(sa*512),this.f32=new Float32Array(this.staging),this.uOff=0;let o={},r=[],n=(f,m,v,g)=>{let b=t.createShaderModule({code:m});b.getCompilationInfo&&b.getCompilationInfo().then(T=>{for(let R of T.messages)R.type==="error"&&r.push(`${f}:${R.lineNum}: ${R.message}`)}),t.pushErrorScope("validation");let x=t.createRenderPipeline({layout:"auto",vertex:{module:b,entryPoint:"vs"},fragment:{module:b,entryPoint:"fs",targets:[{format:v,blend:g}]},primitive:{topology:"triangle-list"}});return t.popErrorScope().then(T=>{T&&r.push(`${f}: ${T.message}`)}),x},l={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},d=f=>X0+$0[f];o.copyRGBA=n("copy",d("copy"),"rgba16float"),o.copyRG=n("copy",d("copy"),"rg16float"),o.clear=n("clear",d("clear"),"r16float"),o.splatRG=n("splat",d("splat"),"rg16float"),o.splatRGBA=n("splat",d("splat"),"rgba16float"),o.advectRG=n("advect",d("advect"),"rg16float"),o.advectRGBA=n("advect",d("advect"),"rgba16float"),o.divergence=n("div",d("divergence"),"r16float"),o.curl=n("curl",d("curl"),"r16float"),o.vorticity=n("vort",d("vorticity"),"rg16float"),o.pressure=n("pressure",d("pressure"),"r16float"),o.gradient=n("grad",d("gradient"),"rg16float"),o.bloomPre=n("bloomPre",d("bloomPre"),"rgba16float"),o.bloomBlur=n("bloomBlur",d("bloomBlur"),"rgba16float"),o.bloomAdd=n("bloomAdd",d("bloomBlur"),"rgba16float",l),o.sunMask=n("sunMask",d("sunMask"),"rgba16float"),o.sun=n("sun",d("sun"),"r16float"),o.blur=n("blur",d("blur"),"r16float"),o.composite=n("composite",J0(),this.format),o.light=n("light",Q0(),"rgba16float"),o.sources=n("sources",Z0(),"rgba16float"),o.haze=n("haze",el(),"rgba16float"),this.pipes=o,this.layouts=new Map;let c=new Uint8Array(4096*4),h=1234567;for(let f=0;f<c.length;f++)h=h*1103515245+12345&2147483647,c[f]=h>>23;this.dither=this.texFromData(64,64,c),this.maskAll=this.texFromData(1,1,new Uint8Array([1,0,0,255])),this.maskSim=this.maskDye=this.maskAll,this.keyTex=this.texFromData(1,1,new Uint8Array([0,0,0,255])),this.keys=null,this.scene=null,this.resetLight(),this.dye=null,this.velocity=null,this.ok=!0,t.pushErrorScope("validation");try{this.canvas.width=96,this.canvas.height=128,this.hostW=96,this.hostH=128,this.initBuffers(),this.splat(.5,.5,.01,.01,{r:.3,g:.2,b:.1}),this.scene={glass:!0},this.applyInputs(),this.step(1/60),this.render(!1),this.scene=null}catch(f){r.push("dry run: "+f.message)}let p=await t.popErrorScope();if(p&&r.push(p.message),await t.queue.onSubmittedWorkDone(),await new Promise(f=>setTimeout(f,0)),this.queue=[],this.dye=null,this.canvas.width=2,this.canvas.height=2,this.hostW=0,r.length){console.warn("MOTIF WebGPU: repli sur WebGL \u2014",r.join(" | ")),this.problems=r,this.ok=!1;return}}tex(e,t,s){let a=this.device.createTexture({size:[e,t],format:s,usage:tl()});return{texture:a,view:a.createView(),width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,format:s}}double(e,t,s){let a=this.tex(e,t,s),o=this.tex(e,t,s);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return a},set read(r){a=r},get write(){return o},set write(r){o=r},swap(){let r=a;a=o,o=r}}}texFromData(e,t,s){let a=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return this.device.queue.writeTexture({texture:a},s,{bytesPerRow:e*4},[e,t]),{texture:a,view:a.createView(),width:e,height:t}}texFromCanvas(e){let t=this.device.createTexture({size:[e.width,e.height],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return this.device.queue.copyExternalImageToTexture({source:e},{texture:t},[e.width,e.height]),{texture:t,view:t.createView(),width:e.width,height:e.height}}initBuffers(){let e=this.cfg,t=this.res(e.SIM_RESOLUTION),s=this.res(e.DYE_RESOLUTION);for(let r of[this.dye,this.velocity,this.pressure])r&&(r.read.texture.destroy(),r.write.texture.destroy());for(let r of[this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp,...this.bloomFbos||[]])r&&r.texture.destroy();this.dye=this.double(s.width,s.height,"rgba16float"),this.velocity=this.double(t.width,t.height,"rg16float"),this.divergence=this.tex(t.width,t.height,"r16float"),this.curl=this.tex(t.width,t.height,"r16float"),this.pressure=this.double(t.width,t.height,"r16float");let a=this.res(e.BLOOM_RESOLUTION);this.bloom=this.tex(a.width,a.height,"rgba16float"),this.bloomFbos=[];for(let r=0;r<e.BLOOM_ITERATIONS;r++){let n=a.width>>r+1,l=a.height>>r+1;if(n<2||l<2)break;this.bloomFbos.push(this.tex(n,l,"rgba16float"))}let o=this.res(e.SUNRAYS_RESOLUTION);this.sunrays=this.tex(o.width,o.height,"r16float"),this.sunraysTemp=this.tex(o.width,o.height,"r16float"),this.rebuildMasks(),this.zero()}rebuildMasks(){for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&t.texture.destroy();if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}let e=this.maskCanvas||(this.maskCanvas=document.createElement("canvas"));this.maskSim=this.texFromCanvas(Js(e,this.keys,this.velocity.width,this.velocity.height)),this.maskDye=this.texFromCanvas(Js(e,this.keys,this.dye.width,this.dye.height))}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,s=this.hostH,a=e.sig+"|"+t+"x"+s;this.keyTexSig!==a&&(this.keyTex&&this.keyTex.texture.destroy(),this.keyTex=this.texFromCanvas(Ra(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,s)),this.keyTexSig=a)}get enc(){return this._enc||(this._enc=this.device.createCommandEncoder())}uniforms(e,t=1){let s=this.uOff;if(this.uOff+=sa*t,this.uOff>this.staging.byteLength)throw new Error("uniform space");let a=this.f32,o=s/4;return a.fill(0,o,o+sa*t/4),e(a,o),{buffer:this.ubuf,offset:s,size:sa*t}}uni(e){return this.uniforms((t,s)=>{e.texel&&(t[s]=e.texel[0],t[s+1]=e.texel[1]),e.point&&(t[s+4]=e.point[0],t[s+5]=e.point[1]),t[s+6]=e.aspect||0,t[s+7]=e.radius||0,e.color&&(t[s+8]=e.color[0],t[s+9]=e.color[1],t[s+10]=e.color[2]),t[s+12]=e.a||0,t[s+13]=e.b||0,t[s+14]=e.c||0,t[s+15]=e.d||0,e.curve&&(t[s+16]=e.curve[0],t[s+17]=e.curve[1],t[s+18]=e.curve[2])})}pass(e,t,s,a,o){let r=this.layouts.get(e)||(this.layouts.set(e,e.getBindGroupLayout(0)),this.layouts.get(e)),n=[{binding:0,resource:s},{binding:1,resource:this.lin}];a.forEach((c,h)=>{c&&n.push({binding:2+h,resource:c})});let l=this.device.createBindGroup({layout:r,entries:n}),d=this.enc.beginRenderPass({colorAttachments:[{view:t.view||t,loadOp:o?"load":"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]});d.setPipeline(e),d.setBindGroup(0,l),d.draw(3),d.end()}flush(){this._enc&&(this.device.queue.writeBuffer(this.ubuf,0,this.staging,0,this.uOff),this.device.queue.submit([this._enc.finish()]),this._enc=null,this.uOff=0)}zero(){if(this.dye){for(let e of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp])this.enc.beginRenderPass({colorAttachments:[{view:e.view,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]}).end();this.flush()}}clear(){!this.ok||!this.dye||(this.zero(),this.requestRender())}applyInputs(){let e=this.queue;this.queue=[];for(let[t,s,a,o,r,n,l]of e)this.splatNow(t,s,a*this.cfg.SPLAT_FORCE*sl(this.aspect),-o*this.cfg.SPLAT_FORCE*al(this.aspect),r,n,l?0:this.keyAt(t,s))}splatNow(e,t,s,a,o,r,n){let l=this.cfg.SPLAT_RADIUS*r/100;this.aspect>1&&(l*=this.aspect);let d={point:[e,t],aspect:this.aspect,radius:l,a:n?n/255:0},c=this.velocity,h=this.dye;this.pass(this.pipes.splatRG,c.write,this.uni({...d,color:[s,a,0]}),[c.read.view,this.maskSim.view,this.near]),c.swap(),this.pass(this.pipes.splatRGBA,h.write,this.uni({...d,color:[o.r*this.gain,o.g*this.gain,o.b*this.gain]}),[h.read.view,this.maskDye.view,this.near]),h.swap()}step(e){let t=this.pipes,s=this.velocity,a=this.cfg,o=[s.texelSizeX,s.texelSizeY];this.pass(t.curl,this.curl,this.uni({texel:o}),[s.read.view]),this.pass(t.vorticity,s.write,this.uni({texel:o,a:e,c:a.CURL}),[s.read.view,this.curl.view]),s.swap(),this.pass(t.divergence,this.divergence,this.uni({texel:o}),[s.read.view,this.maskSim.view,this.near]),this.pass(t.clear,this.pressure.write,this.uni({a:a.PRESSURE}),[this.pressure.read.view]),this.pressure.swap();let r=this.uni({texel:o});for(let n=0;n<a.PRESSURE_ITERATIONS;n++)this.pass(t.pressure,this.pressure.write,r,[this.pressure.read.view,this.divergence.view,this.maskSim.view,this.near]),this.pressure.swap();this.pass(t.gradient,s.write,this.uni({texel:o}),[this.pressure.read.view,s.read.view,this.maskSim.view,this.near]),s.swap(),this.pass(t.advectRG,s.write,this.uni({texel:o,a:e,b:a.VELOCITY_DISSIPATION}),[s.read.view,s.read.view,this.maskSim.view,this.near]),s.swap(),this.pass(t.advectRGBA,this.dye.write,this.uni({texel:o,a:e,b:a.DENSITY_DISSIPATION}),[s.read.view,this.dye.read.view,this.maskDye.view,this.near]),this.dye.swap()}applyBloom(){let e=this.pipes,t=this.cfg;if(this.bloomFbos.length<2)return;let s=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;this.pass(e.bloomPre,this.bloom,this.uni({curve:[t.BLOOM_THRESHOLD-s,s*2,.25/s],a:t.BLOOM_THRESHOLD}),[this.dye.read.view]);let a=this.bloom;for(let o of this.bloomFbos)this.pass(e.bloomBlur,o,this.uni({texel:[a.texelSizeX,a.texelSizeY],a:1}),[a.view]),a=o;for(let o=this.bloomFbos.length-2;o>=0;o--){let r=this.bloomFbos[o];this.pass(e.bloomAdd,r,this.uni({texel:[a.texelSizeX,a.texelSizeY],a:1}),[a.view],!0),a=r}this.pass(e.bloomBlur,this.bloom,this.uni({texel:[a.texelSizeX,a.texelSizeY],a:t.BLOOM_INTENSITY*(1+this.boost*.8)}),[a.view])}applySunrays(){let e=this.pipes;this.pass(e.sunMask,this.dye.write,this.uni({}),[this.dye.read.view]),this.pass(e.sun,this.sunrays,this.uni({a:this.cfg.SUNRAYS_WEIGHT}),[this.dye.write.view]),this.pass(e.blur,this.sunraysTemp,this.uni({texel:[this.sunrays.texelSizeX,0]}),[this.sunrays.view]),this.pass(e.blur,this.sunrays,this.uni({texel:[0,this.sunraysTemp.texelSizeY]}),[this.sunraysTemp.view])}setDisplay(){}setExtended(e){if(!(!this.ctx||this.format!=="rgba16float"||this.rangeOn===e)){this.rangeOn=e;try{this.ctx.configure({device:this.device,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:e?"extended":"standard"},alphaMode:"premultiplied"})}catch{}this.requestRender()}}ensureKeyLit(){this.keyLit||(this.keyLit=new Uint8Array(256)),this.keyLitTex||(this.keyLitTex=this.texFromData(64,1,this.keyLit),this.keyLitDirty=!1),this.keyLitDirty&&(this.device.queue.writeTexture({texture:this.keyLitTex.texture},this.keyLit,{bytesPerRow:256},[64,1]),this.keyLitDirty=!1)}ensureHazeTex(){let e=this.res(16),t=this.hazeTex;return t&&t.width===e.width&&t.height===e.height?t:(t&&t.texture.destroy(),this.hazeTex=this.tex(e.width,e.height,"rgba16float"),this.hazeTex)}ensureLightTex(e,t){let s=Math.max(2,Math.ceil(e/2)),a=Math.max(2,Math.ceil(t/2)),o=this.lightTex;return o&&o.width===s&&o.height===a?o:(o&&o.texture.destroy(),this.lightTex=this.tex(s,a,"rgba16float"),this.lightTex)}render(e){if(!this.ok||!this.dye)return;let t=this.cfg;e||(t.BLOOM&&this.applyBloom(),t.SUNRAYS&&this.applySunrays()),this.ensureKeyTex();let s=this.scene||{};this.stepLight();let a=this.hostW,o=this.hostH,r=this.dpr||1,n=this.hdrScreen&&s.hdr||1,l=this.slabData(!1),d=this.canvas.width,c=this.canvas.height,h=s.glass?this.ensureLightTex(d,c):null,p=this.ensureHazeTex(),f=Ba(s),m=this.uniforms((g,b)=>{let x=(R,I)=>{for(let N=0;N<I.length;N++)g[b+R+N]=I[N]};x(0,[a,o]),x(2,[this.light[0],this.light[1]]),x(4,s.bgTop||[.1,.11,.14]),x(8,s.bgBot||[.07,.075,.094]),x(12,s.accent||[.8,.9,.3]),x(16,s.sep||[1,1,1,.06]),(s.kinds||[]).forEach((R,I)=>x(20+I*4,R)),x(44,[a/64,o/64]),x(46,[1/a,1/o]),x(48,[(s.sepPx||1)*r,s.keys?1:0,s.kind==="xy"?1:0,s.dark===!1?0:1,s.glass?1:0,(s.radius||20)*r,f.bevel*r,Math.min(1,this.boost)]),x(56,[n,t.BLOOM?1:0,t.SUNRAYS?1:0,t.SHADING?1:0]),g.set(this.touchUniforms(!1),b+60),x(76,[f.thick*r,this.gelOn===!1?0:s.gel??1,h?d/h.width:1,h?c/h.height:1]),g.set(l.slabs,b+80),g.set(l.fills,b+112),g.set(this.meters,b+144),x(152,[this.off[0],this.off[1],this.slide[0],-this.slide[1]]),x(156,[r,l.n,s.kind==="mix"?1:0,this.light[2],s.spill||0,s.shadow||0,d,c]),x(164,s.surf||[.086,.09,.114]),x(168,this.screenColor(s.appBg));let T=this.obstacleData(!1);g.set(T.rects,b+172),x(236,[T.n,T.lightH,T.ctrlH,s.style||0]),g.set(T.radii,b+240),x(256,s.keyGlow||[1,1,1,0]),x(260,[f.id,f.p,f.disp,f.depth]),x(264,[p.width,p.height]),x(268,this.stage||[0,0,0,0])},5);this.ensureKeyLit();let v=this.ctx.getCurrentTexture().createView();if(h){let g=this.srcTex||(this.srcTex=this.tex(8,1,"rgba16float"));this.pass(this.pipes.sources,g,m,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.haze,p,m,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.light,h,m,[this.dye.read.view,this.bloom.view,this.keyTex.view,this.near,this.keyLitTex.view,g.view])}this.pass(this.pipes.composite,v,m,[this.dye.read.view,this.bloom.view,this.sunrays.view,this.dither.view,this.keyTex.view,this.near,this.rep,(h||this.dither).view,this.keyLitTex.view,null,p.view]),this.flush()}degrade(){this.slow=0;let e=this.cfg;e.SUNRAYS?e.SUNRAYS=!1:e.BLOOM?e.BLOOM=!1:e.SIM_RESOLUTION>64&&(e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.hostW=0)}},sl=i=>i<1?i:1,al=i=>i>1?1/i:1;var Ii=[".parts .ptab",".inst .arrow",".inst .name",".nav button"],il={pad:[".controls .dial",".range",".timeline > *",...Ii],xy:[".groups .grp",".autobar > *",...Ii],mix:[".mixknobs .dial",".fader .m",...Ii]},or=190,xs={layouts:0,paints:0,writes:0,items:0},ol=i=>{let e=getComputedStyle(i).backgroundColor.match(/[\d.]+/g);return!!e&&(e.length<4||+e[3]>.02)},rr=i=>{let e=document.createElement("div");return e.className=i,e.setAttribute("aria-hidden","true"),e};function nr(i){let e=[],t=null,s=[],a=Ca,o={r:0,g:0,b:0,x:0,y:0,w:0},r=0,n=0,l=!1,d=1.6,c=null,h=0,p=[],f=0,m={sh:"0 0 0",hl:"255 255 255"},v=rr("spill-over"),g=()=>{for(let P of e){P.el.classList.remove("lit","solid");for(let Z of["--e","--ux","--uy","--l"])P.el.style.removeProperty(Z)}v.replaceChildren(),e=[]},b=new MutationObserver(P=>{if(!l||!c||h)return;let Z=j=>j.target===v;P.some(j=>!Z(j)&&(j.type==="attributes"||[...j.addedNodes].some(ae=>ae.nodeType===1)))&&(h=setTimeout(()=>{h=0,c&&x.layout(c.el,c.kind)},160))}),x={enable(P){l=P,document.documentElement.toggleAttribute("data-spill",P),P?(v.parentNode!==i&&i.append(v),b.observe(i,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["aria-selected","aria-pressed","disabled"]}),b.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),document.fonts&&document.fonts.ready.then(()=>{l&&c&&x.layout(c.el,c.kind)})):(b.disconnect(),g(),v.remove(),c=null,o={r:0,g:0,b:0,x:0,y:0,w:0},p=[],x.onObstacles([]),x.onSources([]))},setPower(P){d=P},setHeight(P){a=P},onObstacles(){},onSources(){},layout(P,Z){if(xs.layouts++,g(),t=null,c=null,!l||!P||!P.isConnected){x.onObstacles([]);return}c={el:P,kind:Z},t=P.getBoundingClientRect();let j=i.getBoundingClientRect();m=document.documentElement.dataset.theme==="light"?{sh:"70 48 12",hl:"255 255 255"}:{sh:"0 0 0",hl:"255 255 255"};let ae=(Z==="mix"?[...P.querySelectorAll(".fader")]:[P]).map(G=>G.getBoundingClientRect()),H=G=>ae.some(U=>G.left<U.right&&G.right>U.left&&G.top<U.bottom&&G.bottom>U.top),fe=[];s=[];for(let G of il[Z]||[])for(let U of i.querySelectorAll(G)){let ue=U.getBoundingClientRect();if(!ue.width)continue;let oe=Math.max(0,t.left-ue.right,ue.left-t.right),re=Math.max(0,t.top-ue.bottom,ue.top-t.bottom);if(Math.hypot(oe,re)>or*2.5)continue;let Se=ol(U);U.classList.toggle("solid",Se);let le={el:U,r:ue,solid:Se,ro:"",ang:"",te:-1,ta:0};if(Se){let Ge={left:`${ue.left-j.left}px`,top:`${ue.top-j.top}px`,width:`${ue.width}px`,height:`${ue.height}px`,borderRadius:getComputedStyle(U).borderRadius};le.rl=rr(""),Object.assign(le.rl.style,Ge),le.rl.style.setProperty("--hl",m.hl),le.rl.style.setProperty("--sh",m.sh),v.append(le.rl),H(ue)||(fe.push({d:Math.hypot(oe,re),r:[ue.left-t.left,ue.top-t.top,ue.right-t.left,ue.bottom-t.top,parseFloat(getComputedStyle(U).borderTopLeftRadius)||0]}),s.push(le))}e.push(le)}xs.items=e.length,x.onObstacles(fe.sort((G,U)=>G.d-U.d).slice(0,16).map(G=>G.r.map(U=>Math.round(U*10)/10))),o.w>0&&T()},emit(P,Z=1,j,ae){if(!l)return;let H=P.r*Z,fe=P.g*Z,G=P.b*Z,U=H+fe+G;o.r+=H,o.g+=fe,o.b+=G,j!==void 0&&U>0&&(o.x+=j*U,o.y+=ae*U,o.w+=U,R(j,ae,U,H,fe,G)),T()}};function T(){r||(n=performance.now(),r=requestAnimationFrame(I))}function R(P,Z,j,ae,H,fe){let G=t?t.height/t.width:1.4,U=null,ue=1/0;for(let oe of p){let re=Math.hypot(oe.x-P,(oe.y-Z)*G);re<ue&&(ue=re,U=oe)}if(U&&(ue<.22||p.length>=4)){let oe=U.e+j;U.x=(U.x*U.e+P*j)/oe,U.y=(U.y*U.e+Z*j)/oe,U.e=oe,U.r+=ae,U.g+=H,U.b+=fe}else p.push({x:P,y:Z,e:j,r:ae,g:H,b:fe})}function I(P){r=0;let Z=Math.min(.1,(P-n)/1e3);n=P;let j=Math.exp(-Z/.28);for(let G in o)o[G]*=j;let ae=o.r+o.g+o.b,H=1-Math.exp(-ae*.45),fe=Math.exp(-Z/.45);for(let G of p)G.e*=fe,G.r*=fe,G.g*=fe,G.b*=fe;p=p.filter(G=>G.e>.01),(p.length||f)&&(f=p.length,x.onSources(p.map(G=>{let U=Math.max(G.r,G.g,G.b,1e-6);return[G.x,G.y,1-Math.exp(-G.e*.5),G.r/U,G.g/U,G.b/U]}))),t&&K(H<.01&&!p.length?0:1),(H>=.01||p.length)&&(r=requestAnimationFrame(I))}let N=(P,Z,j,ae,H)=>{P[Z]!==H&&(P[Z]=H,j.style[ae]=H)};function ie(P,Z,j){let ae=Z.x-P.x,H=Z.y-P.y;Math.abs(ae)<.001&&(ae=.001),Math.abs(H)<.001&&(H=.001);let fe=1;for(let G of s){if(G===j)continue;let U=G.r,ue=(U.left-P.x)/ae,oe=(U.right-P.x)/ae,re=(U.top-P.y)/H,Se=(U.bottom-P.y)/H,le=Math.max(Math.min(ue,oe),Math.min(re,Se),0),Ge=Math.min(Math.max(ue,oe),Math.max(re,Se),1);if(le<Ge){let M=4.5*(1-Ge)+.15*a,C=qa*(1-Ge)-a,A=Math.min(1,Math.max(0,(C+M)/(2*M)));fe*=A*A*(3-2*A)}}return .22+.78*fe}function K(P){xs.paints++;let Z=P?p.map(j=>({x:t.left+j.x*t.width,y:t.top+j.y*t.height,i:1-Math.exp(-j.e*.5)})):[];for(let j of e){let{r:ae}=j,H=ae.left+ae.width/2,fe=ae.top+ae.height/2,G=0,U=0,ue=0,oe=0;for(let re of Z){let Se=Math.min(Math.max(re.x,ae.left),ae.right),le=Math.min(Math.max(re.y,ae.top),ae.bottom),Ge=Math.hypot(Se-re.x,le-re.y),M=re.i*(s.length?ie(re,{x:Se,y:le},j):1)/(1+(Ge/or)**2),C=H-re.x,A=fe-re.y,O=Math.hypot(C,A)||1;G+=M,U+=M*C/O,ue+=M*A/O,oe+=M*Ge}if(G>0){oe/=G;let re=Math.hypot(U,ue)||1;U/=re,ue/=re}else U=0,ue=1;if(G=Math.min(1,G*d),j.solid){if(N(j,"ro",j.rl,"opacity",G<.02?"0":Math.min(1,G*1.3).toFixed(2)),G>=.02){let re=`${Math.round(Math.atan2(U,-ue)*180/Math.PI)}deg`;re!==j.ang&&(j.ang=re,j.rl.style.setProperty("--ang",re),xs.writes++)}}else{let re=G<.03?0:Math.min(1,G),Se=Math.atan2(ue,U);if(Math.abs(re-j.te)<.03&&Math.abs(Math.atan2(Math.sin(Se-j.ta),Math.cos(Se-j.ta)))<.06||(j.te=re,j.ta=Se,xs.writes++,j.el.classList.toggle("lit",re>0),!re))continue;let le=j.el.style;le.setProperty("--e",re.toFixed(2)),le.setProperty("--ux",U.toFixed(2)),le.setProperty("--uy",ue.toFixed(2)),le.setProperty("--l",Math.min(2.2,.7+oe*.006).toFixed(2))}}}return x}var lr={normal:1.6,intense:2.6,max:4},cr={douce:.6,normale:1,forte:1.6,max:2.4},rl=[3,6,10,15],hr={drum:28,bass:345,lead:78},dr=[18,40,52,300],nl=[322,190,160,272],ll={bass:322,lead:190},cl=[0,7,2,9,4,11,6,1,8,3,10,5],hl=["optique","liquide","depoli","cristal","prisme"],ur={douce:{cfg:{DENSITY_DISSIPATION:2.8,VELOCITY_DISSIPATION:.8,CURL:16,SPLAT_RADIUS:.18,BLOOM_INTENSITY:.3,BLOOM_THRESHOLD:.7,SUNRAYS_WEIGHT:.6},gain:.6,shake:0,rise:.01,dose:{down:.35,move:.1,kick:[.06,.2],snare:[.03,.14],hat:[.02,.05],perc:[.02,.06],note:[.1,.25],stir:[.07,.13]}},normale:{cfg:{DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,CURL:24,SPLAT_RADIUS:.22,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,SUNRAYS_WEIGHT:.8},gain:.7,shake:0,rise:.012,dose:{down:.55,move:.16,kick:[.12,.4],snare:[.06,.28],hat:[.03,.1],perc:[.04,.12],note:[.15,.45],stir:[.1,.2]}},spectaculaire:{cfg:{DENSITY_DISSIPATION:1.5,VELOCITY_DISSIPATION:.4,CURL:32,SPLAT_RADIUS:.26,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.72,SUNRAYS_WEIGHT:1},gain:.92,shake:1,rise:.016,dose:{down:.7,move:.2,kick:[.2,.5],snare:[.15,.4],hat:[.15,.05],perc:[.12,.3],note:[.2,.55],stir:[.15,.3]}}};function dl(i,e,t){i=(i%360+360)%360/60;let s=Math.floor(i),a=i-s,o=t*(1-e),r=t*(1-a*e),n=t*(1-(1-a)*e),[l,d,c]=[[t,n,o],[r,t,o],[o,t,n],[o,r,t],[n,o,t],[t,o,r]][s%6];return{r:l,g:d,b:c}}function fr(i,{pad:e,xy:t}){let s=null,a="none",o=()=>{let M=new Bs;M.ok&&(s=M,a="webgl")};i.settings.fluidEngine!=="webgl"&&aa.supported()?aa.create().then(M=>{M?(s=M,a=M.hdrScreen?"webgpu-hdr":"webgpu",M.onLost=()=>{s=null,o(),le.place()}):o(),le.place()}):setTimeout(()=>{o(),le.place()});let r=matchMedia("(prefers-reduced-motion: reduce)"),n=i.settings,l=()=>!!n.fluid&&!r.matches,d=()=>!!n.glass,c=nr(e.el.closest(".app")||document.querySelector(".app"));c.onObstacles=M=>{s&&s.setObstacles&&s.setObstacles(M)};let h=()=>document.documentElement.dataset.theme!=="light",p=()=>ur[n.fluidStyle]||ur.spectaculaire,f=null,m=null,v=()=>n.glassSpill===!1?0:cr[n.glassLight]||cr.forte,g=()=>hl.includes(n.glassLook)?n.glassLook:"optique",b=()=>g()==="liquide",x=M=>{let C=n.fluidColors,A=M.part==="drum"||M.part===void 0;return C==="notes"?M.pc!==void 0?cl.indexOf(M.pc)*30:A?dr[M.lane||0]:hr[M.part]:C==="arc"?performance.now()/1e3*48+(A?(M.lane||0)*24:M.x*70):C==="neon"?A?nl[M.lane||0]:ll[M.part]+(M.x-.5)*30:A?dr[M.lane||0]:hr[M.part]+(M.x-.5)*(M.part==="lead"?70:40)},T=(M,C)=>{let A=n.fluidColors==="notes"||n.fluidColors==="arc"||n.fluidColors==="neon",O=n.lightLook||"aquarelle",B=dl(x(M),h()?n.fluidColors==="neon"?1:.82:O==="aquarelle"?.85:O==="vitrail"?.72:A?.42:.28,1),Q=C*p().gain,pe={r:B.r*Q,g:B.g*Q,b:B.b*Q};return c.emit(pe,1,M.x,M.y),pe},R=new Map,I=()=>n.fluidInk!=="maitrisee",N=(M,C=.8,A)=>{let O=p().dose[M],B=Array.isArray(O)?O[0]+O[1]*C:O;if(I())return B;if(n.fluidZone==="keys"&&i.ui.view==="pattern"&&(B*=M==="note"||M==="down"||M==="move"?.95:.6),A!==void 0){let Q=performance.now(),pe=R.get(A)||{e:0,t:Q};pe.e*=Math.exp(-(Q-pe.t)/550),pe.t=Q;let de=B/(1+pe.e*2.2);return pe.e+=de,R.set(A,pe),de}return B},ie=null,K=null,P=()=>{if(s)if(m&&f===m.el){let M=ae();s.setKeys(M.map(([C,A,O,B])=>({x0:C,y0:A,x1:O,y1:B})),"mix|"+JSON.stringify(M))}else if(n.fluidZone==="keys"&&i.ui.view==="pattern"){let M=e.keyLayout();s.setKeys(M.keys,M.sig)}else s.setKeys(null,"all")},Z=M=>M===e.el?"pad":M===t.el?"xy":"mix",j=null,ae=()=>{if(j)return j;let M=m.el.getBoundingClientRect(),C=m.faders.map(A=>{let O=A.el.getBoundingClientRect();return[(O.left-M.left)/M.width,(O.top-M.top)/M.height,(O.right-M.left)/M.width,(O.bottom-M.top)/M.height].map(B=>Math.round(B*1e4)/1e4)});return M.width>0&&(j=C),C},H=M=>Math.pow(Math.max(0,(M+40)/46),1.6),fe=()=>{let M=i.project.parts,C=m.faders.map(B=>{let Q=B.part==="drum"?M.drum.level[B.lane]:M[B.part].level,pe=B.part==="drum"?M.drum.mute[B.lane]:M[B.part].mute,de=Ps(getComputedStyle(B.el).getPropertyValue("--fc")),X=pe?.3:1;return[de[0]*X,de[1]*X,de[2]*X,Math.round(Math.min(1,H(Q))*1e3)/1e3]}),A=parseFloat(getComputedStyle(m.faders[0].el).borderTopLeftRadius)||16,O=Mi({kind:"mix",keys:null,sig:"mix",el:m.el,glass:!0,hdr:Se(),slabs:ae(),fills:C,spill:v(),radius:A,look:n.lightLook,gel:.8,glassLook:g()});O.sig!==ie&&(ie=O.sig,K=O,s.setExtended&&s.setExtended(re()),s.setScene(O))},G=()=>{let M=de=>[.18+.64*de,.72-.38*Math.sin(de*Math.PI)],C=Ge(),A=26,O=0,[B,Q]=M(0);le.press("preview",B,Q,"down");let pe=()=>{O++;let[de,X]=M(O/A);if(O<A){le.press("preview",de,X,"move"),b()&&c.emit({r:C[0],g:C[1],b:C[2]},.18,de,X),setTimeout(pe,40);return}le.press("preview",de,X,"up");let bt=performance.now(),He=()=>{if(!s)return;let st=(performance.now()-bt)/1800;if(st>=1){s.aimReset();return}let mt=Math.PI*(.72-.55*Math.sin(st*Math.PI));s.aim([Math.cos(mt)*.78,Math.sin(mt)*.78,.62]),requestAnimationFrame(He)};requestAnimationFrame(He)};setTimeout(pe,40)},U=[],ue=(M,C)=>{let A=performance.now(),O=U[M];O.e=(O.e||0)*Math.exp(-(A-(O.te||A))/420),O.te=A;let B=C/(1+O.e*3);return O.e+=B,B},oe=M=>{if(!s||!m||f!==m.el)return;let C=performance.now(),A=ae(),O=[];m.faders.forEach((B,Q)=>{let pe=B.part==="drum"?M.d[B.lane]:M[B.part],de=Math.max(0,Math.min(1,(20*Math.log10(Math.max(pe||0,1e-5))+48)/48));O[Q]=de;let X=U[Q]||(U[Q]={env:0,t:0}),bt=de>X.env+.15&&de>.45;if(X.env=Math.max(de,X.env*.9),!l()||!A[Q])return;let[He,st,mt,Dt]=A[Q],Nt=(He+mt)/2,Ht=mt-He,Ms=Dt-st,It=Dt-Ms*.06,Ie={part:B.part,lane:B.lane,x:Nt,y:It},Ls=.012+.03*de;bt?(s.splat(Nt,It,(Math.random()-.5)*Ht*.08,-Ls*2.2,T(Ie,ue(Q,.18+.4*de)),.9),B.part==="drum"&&B.lane===0&&s.pulse(.7*de),X.t=C):de>.5&&C-X.t>160&&(s.splat(Nt+(Math.random()-.5)*Ht*.4,It,0,-Ls,T(Ie,ue(Q,.05*de*de)),.6),X.t=C)}),s.setMeters(O)},re=()=>h()||n.hdrLight!==!1,Se=()=>a==="webgpu-hdr"&&re()?lr[n.fluidHdr]||lr.intense:1,le={get fluid(){return s},spillStats:xs,engine:()=>a,place(){let M=i.ui.view,C=M==="mix"&&!!m&&n.mixGlass!==!1,A=M==="pattern"?e.el:M==="tweaks"?t.el:C?m.el:null,O=!!s&&!!A&&(l()||d()||C);e.gpu=O&&A===e.el,t.gpu=O&&A===t.el,e.inkUnder=e.gpu&&l();for(let Q of[e.el,t.el,m&&m.el])Q&&Q.classList.toggle("gpu-host",O&&Q===A);for(let Q of[e.el,t.el])O&&Q===A&&d()?Q.dataset.glass=g():delete Q.dataset.glass;if(!O){s&&s.detach(),f=null,c.enable(!1),e.draw(),M==="tweaks"&&t.draw();return}s.setStyle(C?{...p().cfg,DENSITY_DISSIPATION:Math.max(2.6,p().cfg.DENSITY_DISSIPATION)}:p().cfg),s.gelOn=!r.matches,s.inkOn=l(),c.enable((d()||C)&&n.glassSpill!==!1),c.setPower(v());let B=rl.includes(+n.ctrlHeight)?+n.ctrlHeight:6;c.setHeight(B),s.setControlHeight&&s.setControlHeight(B),requestAnimationFrame(()=>c.layout(A,Z(A))),f!==A&&(s.clear(),f=A),s.attach(A),j=null,ie=null,le.syncScene(),P(),A===e.el?e.draw():A===t.el&&t.draw()},setMix(M){m=M,j=null,!M&&f&&f!==e.el&&f!==t.el&&(s&&s.detach(),f=null)},syncScene(){if(!f||!s)return;if(m&&f===m.el)return fe();let M=f===e.el,C=M?e.keyLayout():null,A=Mi({kind:M?"pad":"xy",keys:C&&C.keys,sig:C?C.sig:"xy",el:f,glass:!!n.glass,hdr:Se(),spill:v(),look:n.lightLook,gel:M&&e.piano?.4:1,glassLook:g()});A.sig!==ie&&(ie=A.sig,K=A,s.setExtended&&s.setExtended(re()),s.setScene(A))},press(M,C,A,O){if(!(!s||!f||!s.press)&&(s.press(M,C,A,O),O==="down"&&d()&&b())){let B=Ge();c.emit({r:B[0],g:B[1],b:B[2]},.45,C,A)}},tilt(M,C){s&&(M===null?s.resetTilt():s.setTilt(M,C))},touch(M,C,A,O,B,Q,pe,de){if(!f||!l())return;P();let X={part:M,lane:pe,pc:de,x:C,y:A};if(Q==="down")s.burst(C,A,T(X,N("down",.8,"f"+Math.round(C*24))),.5,5,.7);else if(O||B){let bt=I()?1:Math.min(1,Math.max(.25,Math.hypot(O,B)*45)),He=N("move",.8,"m"+M+(pe||0))*bt*(!I()&&n.fluidZone==="keys"?.7:1);s.splat(C,A,O,B,T(X,He),1)}},note(M,C,A,O,B=.8,Q){if(le.held||!f||i.ui.view!=="pattern"||!l())return;P();let pe={part:M,lane:O,pc:Q,x:C,y:A};if(M==="drum"){let He="d"+O;if(O===0)s.burst(C,A,T(pe,N("kick",B,He)),1.2*B+.4,7,1.1),s.pulse(.8);else if(O===1){let st=T(pe,N("snare",B,He));s.splat(C,A,.03,-.004,st,.8),s.splat(C,A,-.03,-.004,st,.8)}else if(O===2)s.splat(C,A,(Math.random()-.5)*.01,-.02,T(pe,N("hat",B,He)),.35);else{let st=T(pe,N("perc",B,He));for(let mt=0;mt<3;mt++){let Dt=mt/3*Math.PI*2;s.splat(C+Math.cos(Dt)*.03,A+Math.sin(Dt)*.03,-Math.sin(Dt)*.025,Math.cos(Dt)*.025,st,.5)}}return}let de=p().rise,X=n.fluidZone==="keys",bt=N("note",B,X?M+Math.round(C*24):M)*(!I()&&e.hasStrokes(M)?.5:1);s.splat(C,A,(Math.random()-.5)*de*.8,-de,T(pe,bt),.9)},stir(M,C,A,O,B,Q){if(!f||i.ui.view!=="tweaks"||!l())return;let pe=M==="bass"||M==="lead",de={part:pe?M:"drum",lane:pe?0:+M.slice(1),x:C,y:A};s.splat(C,A,O,B,T(de,Q?N("stir",1):N("stir",0)),Q?1:.7)},level(M){if(!le.held&&!(!f||!M.trig||!l()))for(let C=0;C<M.trig.length;C+=4)M.trig[C]!==0||M.trig[C+1]!==0||(s.pulse(.6),p().shake&&s.push(.5,1.02,0,-.05,5))},keyLights(M){le.held||s&&s.setKeyLights&&f===e.el&&s.setKeyLights(M)},mixLevels(M){le.held||M&&oe(M)},preview(){if(!f)return;if(!l()){G();return}if(P(),m&&f===m.el){let A=O=>({d:[0,1,2,3].map(B=>B===O?1:.01),bass:O===4?1:.01,lead:O===5?1:.01});for(let O=0;O<6;O++)setTimeout(()=>oe(A(O)),O*140);setTimeout(()=>oe({d:[1,.9,.8,.9],bass:1,lead:1}),950),setTimeout(()=>oe({d:[.01,.01,.01,.01],bass:.01,lead:.01}),1500);return}let M=i.ui.part,C=(A,O)=>setTimeout(O,A);if(M==="drum")[[0,0],[180,2],[360,1],[540,2],[720,0],[820,3],[900,2],[1080,1],[1260,0],[1350,3]].forEach(([A,O])=>C(A,()=>le.note("drum",(O+.5)/4,.55+Math.random()*.25,O,.95)));else{let A=e.piano?e.pianoLayout().keys.filter(B=>!B.black):e.columns(),O=A.length;for(let B=0;B<8;B++){let Q=Math.min(O-1,Math.round(B/7*(O-1))),pe=A[Q],de=e.piano?(pe.pos+.5)/e.pianoLayout().whites:(Q+.5)/O;C(B*150,()=>le.note(M,de,.8-B*.05,0,.95,e.pitchClass(pe.deg,pe.acc)))}C(1250,()=>{s.pulse(1),p().shake&&s.push(.5,1.02,0,-.06,5)})}}};r.addEventListener&&r.addEventListener("change",()=>le.place()),document.addEventListener("visibilitychange",()=>{s&&(document.visibilityState!=="visible"?s.stop():f&&(s.requestRender(),c.layout(f,Z(f))))}),window.addEventListener("resize",()=>{f&&(c.layout(f,Z(f)),m&&f===m.el&&(j=null,P(),le.syncScene()))});let Ge=()=>K&&K.accent||[.8,.9,.3];return le}var pr=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,mr=`#version 300 es
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
}`,vr=`#version 300 es
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
in vec4 iPoseD;   // left foot aside, right foot aside, crouch, where a lifted foot goes (forward +, back \u2212)
uniform vec2 uRes; uniform float uScale;
out vec2 vPos;
flat out vec4 vRect, vPlate, vDoll, vA, vB, vC, vCol, vPA, vPB, vPC, vPD;
void main() {
  vec2 lo = iRect.xy, hi = iRect.xy + iRect.zw;
  if (iPlate.y < 0.5) { lo = vec2(1e5); hi = vec2(-1e5); }
  if (iDoll.z > 0.5) {
    float s = iDoll.z;
    if (iDoll.w < 9.5) {
      // a doll: feet at the anchor; room above for a spotlight, below for its reflection on the glass
      float up = max(iPlate.y < 0.5 && iPlate.x > 0.01 ? 2.6 : 1.3, 1.12 * (1.0 - iAnimA.x));   // (taller when it stretches)
      lo = min(lo, iDoll.xy - vec2(0.85 * s, up * s));
      hi = max(hi, iDoll.xy + vec2(0.85 * s, (iPlate.y < 0.5 && iPlate.z > 0.5 ? 0.32 : 0.12) * s));
    } else { lo = min(lo, iDoll.xy - 0.62 * s); hi = max(hi, iDoll.xy + 0.62 * s); }
  }
  lo -= 6.0; hi += 6.0;
  vec2 p = mix(lo, hi, aCorner);
  vPos = p;
  vRect = iRect; vPlate = iPlate; vDoll = iDoll; vA = iAnimA; vB = iAnimB; vC = iAnimC; vCol = iColor; vPA = iPoseA; vPB = iPoseB; vPC = iPoseC; vPD = iPoseD;
  vec2 ndc = p * uScale / uRes * 2.0 - 1.0;
  gl_Position = vec4(ndc.x, -ndc.y, 0.0, 1.0);
}`,za=`#version 300 es
precision highp float;
in vec2 vPos;
flat in vec4 vRect, vPlate, vDoll, vA, vB, vC, vCol, vPA, vPB, vPC, vPD;
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
#define M_FIRE 26.0
#define M_STEAM 27.0

float TYPE, SEED, SQ, SWAY, BLINK, MOUTH, GLOW, SCARE, REACH, HIPX, TWIST, LIFTL, LIFTR, ROLL, INK, SPIN, FXL, FXR, CROUCH, LZ, BEND, LEGUP;
vec2 HEAD, LOOK;
vec3 HL, HR;
vec3 SHL, SHR, ELL, ELR, HLC, HRC;   // the arms' joints: shoulders, elbows, hands (round the head)
vec3 gHQ;   // the head's own coordinates at the last point looked at (for its face)
vec3 gBQ;   // the upper body's
float gHitT;   // how far along its ray the last march stopped (1e5: nothing there)
float gBAND;   // the mummy's: where its bandages are (they wind round each part and follow it)

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
  // (in a dance the head keeps its face to us when the body turns or the shoulders twist, as dancers do;
  // a whole turn, it catches up, like a dancer spotting)
  float hold = TYPE < 9.5 ? 0.8 * (TWIST + SPIN * (1.0 - smoothstep(1.2, 2.2, abs(SPIN)))) : 0.0;   // (dolls only: a button's face has neither)
  q.xz = rot(LOOK.x * 0.55 - hold) * q.xz;
  q.yz = rot(LOOK.y * 0.32) * q.yz;
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
  vec2 res = vec2(d * 0.85, max(f, 0.18 - q.z) < 0.02 ? M_GLOW : M_SKIN);    // (walls and back of the carving too)
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
  vec2 res = vec2(d, max(mo, -mq.z - 0.07) < 0.02 ? M_DARK : M_SKIN);     // (inside the mouth, all of it)
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
  return vec2(d, max(face, 0.3 - q.z) < 0.02 ? M_DARK : M_CLOTH);
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
// the skeleton's skull: the calavera's, plain bone, its eye sockets and nose dark, its eyes glowing
vec2 boneHead(vec3 q) {
  vec2 res = skullHead(q, 0.6);
  if (res.y == M_BONE && res.x < 0.03) {     // (the colour only matters on the surface)
    vec3 e = vec3(abs(q.x) - 0.2, q.y, q.z - 0.42);
    float sock = length(e * vec3(1.0, 1.0 + 0.5 * BLINK, 1.0)) - 0.16 * (1.0 + 0.2 * SCARE);
    float nose = sdEll(q - vec3(0.0, -0.16, 0.47), vec3(0.05, 0.075, 0.12));
    if (min(sock, nose) < 0.025) res.y = M_DARK;
  }
  return res;
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
  // (a glowing slit on the face, not a beam out of it: bounded in front)
  res = U(res, vec2(length(e2.xy * vec2(1.0, 4.0 / max(1.0 - BLINK, 0.2))) - 0.07 + max(0.0, max(-e2.z - 0.02, e2.z - 0.035)), M_GLOW));
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
  vec2 res = vec2(d, max(mo, -mq.z - 0.08) < 0.02 ? M_DARK : M_SKIN);     // (inside the mouth, all of it)
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
  if (ty < 5.5) return frankHead(q);
  return boneHead(q);
}
float headY(float ty) { return ty < 0.5 ? 0.26 : ty < 1.5 ? 0.33 : ty < 2.5 ? 0.34 : ty < 3.5 ? 0.4 : ty < 4.5 ? 0.36 : 0.4; }

// ---------- the dolls: a body that dances (hands, hips, a twist, feet, a tilted head) ----------
// legs: hips, knees, feet. A foot lifts (forward, or dragged back), steps aside; the knee bends out and
// forward as the leg gets shorter (a crouch, a lifted foot). The legs are short under big bodies: a foot
// lifts only a little (higher, it would go into the body and the leg would vanish) but comes forward,
// and while it dances a doll with legs stands up on longer ones (LEGUP), so its steps show
vec3 footAt(float side, float x, float lift) {
  return vec3(side * x + HIPX * 0.4, -1.03 + lift * (0.17 + LEGUP * 0.5), 0.07 + lift * 0.17 * LZ);
}
vec3 kneeOf(vec3 hip, vec3 foot, float hlen, float side) {
  vec3 d = foot - hip;
  float k = sqrt(max(hlen * hlen - 0.25 * dot(d, d), 0.0));
  return hip + d * 0.5 + vec3(side * 0.6, 0.0, 0.8) * k;
}
float leg(vec3 p, vec3 hip, vec3 foot, float r, float hlen, float side) {
  vec3 knee = kneeOf(hip, foot, hlen, side);
  return min(sdCap(p, hip, knee, r), sdCap(p, knee, foot, r));
}
// (hips, feet and the length of a thigh: where the legs go)
float legEnds(float spread, float hipY, out vec3 hl, out vec3 hr, out vec3 fl, out vec3 fr) {
  float hy = hipY - CROUCH * 0.2 + LEGUP;
  hl = vec3(-spread + HIPX, hy, 0.0); hr = vec3(spread + HIPX, hy, 0.0);
  fl = footAt(-1.0, spread + 0.02, LIFTL) + vec3(FXL, 0.03, -0.04);
  fr = footAt(1.0, spread + 0.02, LIFTR) + vec3(FXR, 0.03, -0.04);
  return 0.52 * (1.0 + hipY + LEGUP);
}
float legPair(vec3 p, float r, float spread, float hipY) {
  vec3 hl, hr, fl, fr;
  float hlen = legEnds(spread, hipY, hl, hr, fl, fr);
  return min(leg(p, hl, fl, r, hlen, -1.0), leg(p, hr, fr, r, hlen, 1.0));
}
vec3 footL() { return footAt(-1.0, 0.15, LIFTL) + vec3(FXL, 0.0, 0.0); }
vec3 footR() { return footAt(1.0, 0.15, LIFTR) + vec3(FXR, 0.0, 0.0); }
// the upper body turns about the hips
vec3 upper(vec3 p) {
  vec3 q = p - vec3(HIPX, -0.78, 0.0);
  q.xz = rot(TWIST) * q.xz;
  q += vec3(0.0, -0.78, 0.0);
  gBQ = q;
  return q;
}
// arms: shoulder, elbow, hand. Straight unless a dance bends them (BEND); a bent elbow goes out to the
// side (a little down and back), rounded. A hand or an elbow that would go into the head is pushed out of
// it, so an arm never passes through the head
vec3 outOfHead(vec3 x, vec3 hc, vec3 hr, float m) {
  vec3 e = (x - hc) / (hr + m);
  float l = length(e);
  return l < 1.0 ? hc + e / max(l, 1e-3) * (hr + m) : x;
}
vec3 elbowAt(vec3 s, vec3 h, float side) {
  vec3 d = h - s;
  float len = length(d);
  vec3 dir = d / max(len, 1e-4);
  vec3 pole = vec3(side, -0.4, -0.3);
  pole -= dir * dot(pole, dir);
  float pl = length(pole);
  pole = pl > 1e-3 ? pole / pl : vec3(side, 0.0, 0.0);
  return s + d * 0.5 + pole * len * 0.294 * BEND;      // (bent: upper arm and forearm each 0.58 of the reach)
}
// (once per pixel: the joints only depend on the doll's pose)
void armRig(vec3 sh, vec3 hc, vec3 hr, float r) {
  SHL = vec3(-sh.x, sh.y, sh.z); SHR = sh;
  HLC = outOfHead(HL, hc, hr, r + 0.03); HRC = outOfHead(HR, hc, hr, r + 0.03);
  ELL = outOfHead(elbowAt(SHL, HLC, -1.0), hc, hr, r + 0.03);
  ELR = outOfHead(elbowAt(SHR, HRC, 1.0), hc, hr, r + 0.03);
}
float arms(vec3 q, float r) {
  // (the two halves melt into a round elbow)
  return min(smin(sdCap(q, SHL, ELL, r), sdCap(q, ELL, HLC, r * 0.94), 0.05), smin(sdCap(q, SHR, ELR, r), sdCap(q, ELR, HRC, r * 0.94), 0.05));
}

// the mummy's bandages wind round its body, each arm and each leg, and follow them (as they move, bend,
// stretch): a stripe coordinate along each part, the same for its relief and for its colour. (Only the
// nearest part's stripes, and only near the surface: the rest of the way, plain capsules, as cheap as before)
float wind(float s, vec3 q) { return s * 6.5 + 0.18 * sin(atan(q.x, q.z) + s * 3.0 + SEED * 5.0); }
float bandBump(float w) { float f = fract(w); return 0.022 * smoothstep(0.0, 0.18, f) * smoothstep(1.0, 0.82, f); }
// (how far along a segment a point is)
float along(vec3 p, vec3 a, vec3 b) { vec3 ba = b - a; return clamp(dot(p - a, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0) * length(ba); }
vec2 mummyBody(vec3 lq, vec3 q) {
  float body = sdCap(q, vec3(0.0, -0.2, 0.0), vec3(0.0, -0.72, 0.0), 0.3);
  float a1 = sdCap(q, SHL, ELL, 0.095), a2 = sdCap(q, ELL, HLC, 0.09), a3 = sdCap(q, SHR, ELR, 0.095), a4 = sdCap(q, ELR, HRC, 0.09);
  vec3 hl, hr, fl, fr;
  float hlen = legEnds(0.13, -0.75, hl, hr, fl, fr);
  vec3 kl = kneeOf(hl, fl, hlen, -1.0), kr = kneeOf(hr, fr, hlen, 1.0);
  float l1 = sdCap(lq, hl, kl, 0.105), l2 = sdCap(lq, kl, fl, 0.105), l3 = sdCap(lq, hr, kr, 0.105), l4 = sdCap(lq, kr, fr, 0.105);
  float d = smin(smin(body, min(smin(a1, a2, 0.05), smin(a3, a4, 0.05)), 0.06), min(min(l1, l2), min(l3, l4)), 0.05);
  if (d > 0.08) return vec2(d, 0.0);
  // (the stripes of the nearest part: round the body by height, round a limb along it, measured from
  // the limb's start; only that segment's ends are kept, and measured once)
  float m = body;
  vec3 pp = q, so = vec3(0.0), sa = vec3(0.0), sb = vec3(0.0);
  if (a1 < m) { m = a1; so = SHL; sa = SHL; sb = ELL; }
  if (a2 < m) { m = a2; so = SHL; sa = ELL; sb = HLC; }
  if (a3 < m) { m = a3; so = SHR; sa = SHR; sb = ELR; }
  if (a4 < m) { m = a4; so = SHR; sa = ELR; sb = HRC; }
  if (l1 < m) { m = l1; pp = lq; so = hl; sa = hl; sb = kl; }
  if (l2 < m) { m = l2; pp = lq; so = hl; sa = kl; sb = fl; }
  if (l3 < m) { m = l3; pp = lq; so = hr; sa = hr; sb = kr; }
  if (l4 < m) { m = l4; pp = lq; so = hr; sa = kr; sb = fr; }
  float w;
  if (m == body) w = wind(q.y, q);
  else { float sl = length(sa - so) + along(pp, sa, sb); w = sl * 6.5 + 0.18 * sin(sl * 3.0 + SEED * 5.0); }
  return vec2(d - bandBump(w) * smoothstep(0.08, 0.04, d), w);
}

// the skeleton: a spine of vertebrae, three pairs of ribs open in front and a breastbone, collarbones, a
// pelvis; long thin bony arms and legs, their elbows and knees round knobs that show when they bend
float skeletonTorso(vec3 q) {
  // (all of it inside this capsule: far from it, the capsule is distance enough)
  float bound = sdCap(q, vec3(0.0, -0.12, -0.03), vec3(0.0, -0.66, -0.03), 0.27);
  if (bound > 0.08) return bound;
  float iy = clamp(floor((-0.12 - q.y) / 0.064 + 0.5), 0.0, 7.0);
  float d = sdRBox(q - vec3(0.0, -0.12 - iy * 0.064, -0.15 + iy * 0.014), vec3(0.042, 0.017, 0.03), 0.012);
  d = min(d, sdCap(q, vec3(0.0, -0.1, -0.15), vec3(0.0, -0.6, -0.05), 0.022));
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec3 rq = q - vec3(0.0, -0.23 - fi * 0.08, -0.05);
    rq.y += rq.z * 0.3;
    float rib = length(vec2(length(rq.xz) - (0.17 + 0.022 * fi - 0.011 * fi * fi), rq.y)) - 0.026;
    d = min(d, max(rib, -max(abs(rq.x) - 0.045, -rq.z)));
  }
  d = min(d, sdCap(q, vec3(0.0, -0.21, 0.12), vec3(0.0, -0.36, 0.11), 0.028));
  d = min(d, min(sdCap(q, vec3(0.0, -0.17, 0.04), SHL, 0.022), sdCap(q, vec3(0.0, -0.17, 0.04), SHR, 0.022)));
  vec3 pq = q - vec3(0.0, -0.64, -0.03);
  float pel = smax(sdEll(pq, vec3(0.19, 0.09, 0.12)), -sdEll(pq - vec3(0.0, 0.0, 0.08), vec3(0.07, 0.05, 0.12)), 0.02);
  return smin(d, pel, 0.03);
}
float skeletonBody(vec3 lq, vec3 q) {
  float d = skeletonTorso(q);
  d = min(d, arms(q, 0.05));
  d = min(d, min(length(q - ELL), length(q - ELR)) - 0.05 - 0.02 * BEND);
  d = min(d, min(length(q - HLC), length(q - HRC)) - 0.065);
  vec3 hl, hr, fl, fr;
  float hlen = legEnds(0.1, -0.66, hl, hr, fl, fr);
  vec3 kl = kneeOf(hl, fl, hlen, -1.0), kr = kneeOf(hr, fr, hlen, 1.0);
  float lg = min(min(sdCap(lq, hl, kl, 0.052), sdCap(lq, kl, fl, 0.048)), min(sdCap(lq, hr, kr, 0.052), sdCap(lq, kr, fr, 0.048)));
  // (a knee shows as much as it bends)
  float kb = clamp(1.2 - length(fl - hl) / (2.0 * hlen), 0.0, 1.0), kbr = clamp(1.2 - length(fr - hr) / (2.0 * hlen), 0.0, 1.0);
  lg = min(lg, min(length(lq - kl) - 0.052 - 0.025 * kb, length(lq - kr) - 0.052 - 0.025 * kbr));
  d = min(d, lg);
  return min(d, min(sdEll(lq - fl - vec3(0.0, -0.02, 0.05), vec3(0.075, 0.045, 0.11)), sdEll(lq - fr - vec3(0.0, -0.02, 0.05), vec3(0.075, 0.045, 0.11))));
}

vec2 dollBody(vec3 p) {
  vec3 q = upper(p + vec3(0.0, CROUCH * 0.2 - LEGUP, 0.0));     // (a crouch lowers everything above the hips)
  vec3 hc = vec3(HEAD.x, headY(TYPE) + HEAD.y, 0.0);
  vec2 res;
  if (TYPE < 0.5) {            // the jack-o'-lantern
    res = pumpkinHead(headSpace(q, hc), false);
    float b = sdRCone(q - vec3(0.0, -0.93, 0.0), 0.34, 0.17, 0.62);
    res = U(res, vec2(b, M_CLOTH));
    res = U(res, vec2(arms(q, 0.075), M_STEM));
    res = U(res, vec2(min(length(q - HLC) - 0.095, length(q - HRC) - 0.095), M_SKIN));
    res = U(res, vec2(legPair(p, 0.06, 0.12, -0.8), M_CLOTH));
    res = U(res, vec2(min(sdEll(p - footL(), vec3(0.1, 0.07, 0.14)), sdEll(p - footR(), vec3(0.1, 0.07, 0.14))), M_BOOT));
  } else if (TYPE < 1.5) {     // the voodoo doll
    vec3 hq = headSpace(q, hc);
    float d = sdRBox(q - vec3(0.0, -0.45, 0.0), vec3(0.2, 0.28, 0.12), 0.14);
    d = smin(d, legPair(p, 0.105, 0.14, -0.72), 0.05);
    // (the body, in the head's space, so both melt together; the arms join after, so they never blur the face)
    res = voodooMain(hq, d);
    float ad = arms(q, 0.1);
    res = vec2(smin(res.x, ad, 0.06), ad < res.x ? M_SKIN : res.y);
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
    float b = smin(sdRCone(sp, 0.6 + 0.04 * sin(a * 5.0 + uTime * 3.0), 0.4, 1.25), arms(g, 0.1), 0.18);
    float hem = -0.93 + 0.07 * sin(a * 7.0 + uTime * 3.1 + SEED * 4.0) + 0.04 * sin(a * 3.0 - uTime * 1.7);
    b = smax(b, hem - g.y, 0.05);
    res = ghostMain(headSpace(g, hc), b);
    res.x *= 0.9;
  } else if (TYPE < 3.5) {     // the calavera
    res = skullHead(headSpace(q, hc), 0.0);
    float b = sdRCone(q - vec3(0.0, -0.98, 0.0), 0.38, 0.15, 0.82);
    res = U(res, vec2(b, M_CLOTH));
    res = U(res, vec2(arms(q, 0.05), M_BONE));
    res = U(res, vec2(min(length(q - HLC) - 0.085, length(q - HRC) - 0.085), M_BONE));
    res = U(res, vec2(min(sdEll(p - footL() - vec3(0.0, 0.02, 0.0), vec3(0.09, 0.06, 0.12)), sdEll(p - footR() - vec3(0.0, 0.02, 0.0), vec3(0.09, 0.06, 0.12))), M_BONE));
  } else if (TYPE < 4.5) {     // the mummy
    vec3 hq = headSpace(q, hc);
    res = mummyHead(hq);
    vec2 b = mummyBody(p, q);
    gBAND = b.x * 0.85 < res.x ? b.y : -1e4;     // (on the head: its stripes, from its own coordinates, when it is coloured)
    res = U(res, vec2(b.x * 0.85, M_SKIN));
  } else if (TYPE < 5.5) {      // the little monster with bolts
    res = frankHead(headSpace(q, hc));
    float b = sdRBox(q - vec3(0.0, -0.48, 0.0), vec3(0.26, 0.26, 0.15), 0.12);
    b = smin(b, arms(q, 0.085), 0.06);
    res = U(res, vec2(b, M_CLOTH));
    res = U(res, vec2(min(length(q - HLC) - 0.09, length(q - HRC) - 0.09), M_SKIN));
    res = U(res, vec2(legPair(p, 0.08, 0.14, -0.78), M_CLOTH));
    res = U(res, vec2(min(sdRBox(p - footL(), vec3(0.08, 0.06, 0.12), 0.04), sdRBox(p - footR(), vec3(0.08, 0.06, 0.12), 0.04)), M_BOOT));
  } else {                      // the skeleton
    res = boneHead(headSpace(q, hc));
    res = U(res, vec2(skeletonBody(p, q), M_BONE));
  }
  return res;
}

// ---------- the Halloween buttons ----------
// the logo: a cauldron on its fire, seen a little from above so its glowing brew shows, steam rising, a
// ladle in it; bubbles grow and pop (bigger when the music plays)
vec2 cauldron(vec3 p) {
  vec3 q = p;
  q.yz = rot(-0.5) * q.yz;     // (its mouth tipped towards us)
  q -= vec3(0.0, -0.1, 0.0);
  float pot = smax(sdEll(q, vec3(0.64, 0.52, 0.64)), q.y - 0.18, 0.04);
  vec2 res = vec2(pot, M_IRON);
  res = U(res, vec2(sdTorus(q - vec3(0.0, 0.22, 0.0), 0.58, 0.075), M_IRON));
  // two ring handles on its sides, three stubby legs
  vec3 hq = vec3(abs(q.x) - 0.66, q.y - 0.02, q.z);
  res = U(res, vec2(length(vec2(length(hq.xy) - 0.1, hq.z)) - 0.03, M_IRON));
  float legs = 1e5;
  for (int i = 0; i < 3; i++) { float a = float(i) * 2.094 + 0.5; legs = min(legs, sdCap(q, vec3(cos(a) * 0.36, -0.42, sin(a) * 0.36), vec3(cos(a) * 0.44, -0.62, sin(a) * 0.44), 0.06)); }
  res = U(res, vec2(legs, M_IRON));
  // the brew, slightly domed, and its bubbles
  float brew = max(length(q.xz) - 0.56, abs(q.y - 0.19 - 0.03 * (1.0 - dot(q.xz, q.xz) * 3.0)) - 0.03);
  for (int i = 0; i < 4; i++) {
    float fi = float(i), ph = fract(uTime * (0.5 + 0.17 * fi) + fi * 0.27);
    vec3 bc = vec3(0.3 * sin(fi * 2.4 + 1.0), 0.21 + 0.07 * ph, 0.26 * cos(fi * 1.7));
    brew = smin(brew, length(q - bc) - 0.13 * sin(ph * 3.14159) * (1.0 + 0.6 * GLOW), 0.04);
  }
  res = U(res, vec2(brew, M_BREW));
  // the ladle's handle, out of the brew
  res = U(res, vec2(sdCap(q, vec3(0.12, 0.18, 0.05), vec3(0.6, 0.85, -0.12), 0.04), M_WOOD));
  // underneath (upright, not tilted): two crossed logs and three flames licking the pot
  res = U(res, vec2(min(sdCap(p, vec3(-0.5, -0.92, 0.35), vec3(0.45, -0.86, 0.0), 0.06), sdCap(p, vec3(0.5, -0.92, 0.35), vec3(-0.42, -0.86, 0.02), 0.06)), M_WOOD));
  float fire = 1e5;
  for (int i = 0; i < 3; i++) {
    // (tongues of flame: round at the bottom, pointed at the top, swaying and flickering)
    float fi = float(i) - 1.0, fl = 0.85 + 0.25 * sin(uTime * (9.0 + fi * 3.0) + fi * 2.0), sz = 1.0 - 0.28 * abs(fi);
    vec3 fq = p - vec3(fi * 0.24, -0.84, 0.08 - 0.05 * abs(fi));
    fq.x += 0.05 * sin(uTime * 11.0 + fq.y * 9.0 + fi * 3.0) * smoothstep(0.0, 0.3, fq.y);
    fire = min(fire, sdRCone(fq, 0.11 * sz, 0.015, 0.34 * fl * sz));
  }
  res = U(res, vec2(fire, M_FIRE));
  // steam: three puffs rising from the brew, growing then fading
  float steam = 1e5;
  for (int i = 0; i < 3; i++) {
    // (puffs of steam: wobbly, growing as they rise, then gone)
    float fi = float(i), ph = fract(uTime * 0.35 + fi / 3.0);
    vec3 sc = vec3(0.22 * sin(fi * 2.1 + ph * 3.0) - 0.05, 0.36 + 0.6 * ph, 0.12 - 0.2 * ph);
    float wob = 0.035 * noise(p.xy * 9.0 + vec2(uTime * 0.8, fi * 7.0));
    steam = min(steam, length(p - sc) - 0.19 * sin(ph * 3.14159) * (0.75 + 0.25 * fi / 2.0) - wob);
  }
  return U(res, vec2(steam, M_STEAM));
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
// a die's pips on one face (1 to 6; opposite faces add up to 7): uv on the face, w how far off its surface
float pipsAt(vec2 uv, float w, float n) {
  float s = 0.22, r = 0.095, d = 1e5;
  if (n == 1.0 || n == 3.0 || n == 5.0) d = min(d, length(vec3(uv, w)) - r);
  if (n >= 2.0) d = min(d, min(length(vec3(uv - vec2(-s, s), w)), length(vec3(uv - vec2(s, -s), w))) - r);
  if (n >= 4.0) d = min(d, min(length(vec3(uv - vec2(s, s), w)), length(vec3(uv - vec2(-s, -s), w))) - r);
  if (n == 6.0) d = min(d, min(length(vec3(uv - vec2(-s, 0.0), w)), length(vec3(uv - vec2(s, 0.0), w))) - r);
  return d;
}
// the die: pips on its six faces; it hops and rolls to a face when pressed, and stays on it (its two
// angles come from the page)
vec2 die(vec3 p) {
  p.y -= 0.22 * sin(REACH * 3.14159);
  p.xz = rot(HL.x) * p.xz;
  p.yz = rot(HL.y) * p.yz;
  float d = sdRBox(p, vec3(0.42), 0.14);
  // (only the face this point is nearest)
  vec3 a = abs(p);
  float pips;
  if (a.z >= a.x && a.z >= a.y) pips = pipsAt(p.xy, a.z - 0.58, p.z > 0.0 ? 1.0 : 6.0);
  else if (a.y >= a.x) pips = pipsAt(p.xz, a.y - 0.58, p.y > 0.0 ? 2.0 : 5.0);
  else pips = pipsAt(p.zy, a.x - 0.58, p.x > 0.0 ? 3.0 : 4.0);
  d = smax(d, -pips, 0.03);
  return vec2(d, pips < 0.02 ? M_DARK : M_BONE);
}
// the hourglass: a wooden frame (two round plates, three posts), two glass bulbs (drawn over everything,
// see overGlass) and its sand. It turns over when pressed (undo); the sand runs from the bulb on top into
// the other one while it stands upright (how much is in the bulb that starts on top comes from the page)
float sdCylY(vec3 p, float r, float h) { vec2 d = vec2(length(p.xz) - r, abs(p.y) - h); return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)); }
vec2 hourglass(vec3 p) {
  p.xy = rot(REACH * 3.1416) * p.xy;
  vec2 res = vec2(min(sdCylY(p - vec3(0.0, 0.83, 0.0), 0.44, 0.035), sdCylY(p - vec3(0.0, -0.83, 0.0), 0.44, 0.035)) - 0.02, M_WOOD);
  float posts = 1e5;
  for (int i = 0; i < 3; i++) {
    float a = float(i) * 2.094 + 1.5708;    // (one at the back, two at the sides: the front stays clear)
    vec3 c = vec3(cos(a) * 0.38, 0.0, -sin(a) * 0.38 * 0.8);
    posts = min(posts, min(sdCap(p, c + vec3(0.0, -0.8, 0.0), c + vec3(0.0, 0.8, 0.0), 0.03), length(vec3(p.x - c.x, abs(p.y) - 0.42, p.z - c.z)) - 0.05));
  }
  res = U(res, vec2(posts, M_WOOD));
  // the sand, as gravity has it (yy: up): in the bulb on top, a layer at the bottom with a little funnel
  // where it runs out; in the bulb below, a pile; between them, a thin stream
  float up = cos(REACH * 3.1416), g = up >= 0.0 ? 1.0 : -1.0, yy = p.y * g;
  float aT = g > 0.0 ? HL.x : 1.0 - HL.x, aB = 1.0 - aT;
  float r = length(p.xz);
  float lt = 0.05 + 0.68 * pow(clamp(aT, 0.0, 1.0), 0.6) - 0.09 * exp(-r * r * 40.0) * step(0.02, aT);
  float sand = aT > 0.01 ? max(sdEll(vec3(p.x, yy - 0.39, p.z), vec3(0.28, 0.34, 0.28)), yy - lt) : 1e5;
  float lb = -0.73 + 0.62 * pow(clamp(aB, 0.0, 1.0), 0.6) + 0.07;
  if (aB > 0.01) sand = min(sand, max(sdEll(vec3(p.x, yy + 0.39, p.z), vec3(0.28, 0.34, 0.28)), yy - lb + 0.45 * r));
  if (aT > 0.01 && abs(up) > 0.97) sand = min(sand, length(vec3(p.x, yy - clamp(yy, lb, 0.06), p.z)) - 0.014);
  return U(res, vec2(sand, M_SAND));
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
// a button's own space: a little turn towards the finger, a squash when pressed
vec3 emblemSpace(vec3 p, out float sy, out float sx) {
  p.xz = rot(LOOK.x * 0.35) * p.xz;
  p.yz = rot(LOOK.y * 0.25) * p.yz;
  sy = 1.0 - SQ; sx = inversesqrt(max(sy, 0.3));
  p.y = (p.y + 0.9) / sy - 0.9;
  p.xz /= sx;
  return p;
}
vec2 emblem(vec3 p) {
  float sy, sx;
  p = emblemSpace(p, sy, sx);
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
  r.x *= min(sy, sx) * 0.92;      // (the true scale: thinner when stretched, flatter when squashed)
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
  r.x *= min(sy, sx) * 0.92;      // (the true scale: thinner when stretched, flatter when squashed)
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
      // (the same stripes as its relief, on whichever part this is: head, body, an arm, a leg)
      float band = fract(TYPE < 9.5 && gBAND > -9e3 ? gBAND : wind(hq.y, hq));
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
    if (ty > 5.5 && ty < 6.5 && TYPE < 19.5 && isHead) {     // (the skeleton's teeth)
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
  } else if (m == M_IRON) {
    c = vec3(0.13, 0.12, 0.16); spec = 0.9;
    // (the cauldron's iron: lit green by its brew near the rim, orange by its fire underneath)
    if (TYPE > 19.5 && TYPE < 20.5) {
      c += vec3(0.04, 0.2, 0.05) * smoothstep(0.12, 0.3, hq.y) * (0.6 + 0.4 * GLOW);
      c += vec3(0.6, 0.25, 0.05) * smoothstep(-0.3, -0.62, hq.y) * (0.8 + 0.25 * sin(uTime * 9.0));
    }
  }
  else if (m == M_BREW) {
    float sw = noise(vec2(atan(hq.z, hq.x) * 1.5 + uTime * 0.7, length(hq.xz) * 7.0 - uTime * 1.2));
    c = mix(vec3(0.2, 0.75, 0.15), vec3(0.6, 1.0, 0.35), sw);
    emit = 1.1 + 0.8 * GLOW + 0.3 * sin(uTime * 3.0 + p.x * 9.0);
  }
  else if (m == M_FIRE) {
    float k = clamp((hq.y + 0.95) / 0.36, 0.0, 1.0);
    c = mix(mix(vec3(1.0, 0.95, 0.6), vec3(1.0, 0.55, 0.1), smoothstep(0.0, 0.5, k)), vec3(0.95, 0.2, 0.05), smoothstep(0.5, 1.0, k));
    emit = 1.8 + 0.5 * sin(uTime * 13.0 + hq.x * 9.0);
  }
  else if (m == M_STEAM) { c = vec3(0.62, 0.95, 0.66); emit = 0.35 + 0.3 * GLOW; alpha = 0.4; }
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
  else if (m == M_SAND) { c = mix(vec3(0.95, 0.66, 0.28), vec3(1.0, 0.82, 0.45), noise(p.xy * 60.0)); emit = 0.22; spec = 0.1; }
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
  gHitT = 1e5;
  if (cover <= 0.0) return vec4(0.0);
  vec3 p = ro + rd * t;
  // (a near miss: back to its closest point, measured again so the head's coordinates are this point's;
  // a hit was the last point measured)
  if (h.x >= eps) { t = tmin; p = ro + rd * t; h = sceneMap(p); }
  vec3 hq = gHQ, bq = gBQ;
  float band = gBAND;
  vec3 n = normalAt(p);
  gBQ = bq; gBAND = band;
  float spec, emit, sss, alpha;
  vec3 base = baseColor(h.y, p, hq, spec, emit, sss, alpha);
  vec3 lit = shade(p, n, base, spec, emit, sss);
  // (glass: more opaque at its edges; steam: the other way round, thin at its edges)
  if (h.y == M_STEAM) alpha *= pow(max(n.z, 0.0), 1.5);
  else if (alpha < 1.0) { float fres = pow(1.0 - max(n.z, 0.0), 2.0); alpha = alpha + (1.0 - alpha) * fres; }
  gHitT = t;
  return vec4(lit, cover * alpha);
}

// the hourglass's two glass bulbs, laid over what the rays found behind them (its sand, the back post):
// clear glass, a rim of light along its edges, a glint of the moon
vec4 overGlass(vec2 lp, vec4 dc) {
  float sy, sx;
  vec3 a = emblemSpace(vec3(lp, 2.0), sy, sx), b = emblemSpace(vec3(lp, 1.0), sy, sx);
  mat2 fl = rot(REACH * 3.1416);
  a.xy = fl * a.xy; b.xy = fl * b.xy;
  vec3 rd = b - a;    // (one unit of the march's distance along the ray)
  vec3 R = vec3(0.33, 0.39, 0.33);
  float tg = 1e5; vec3 ng = vec3(0.0, 0.0, 1.0);
  for (int i = 0; i < 2; i++) {
    vec3 c = vec3(0.0, i == 0 ? 0.39 : -0.39, 0.0);
    vec3 o = (a - c) / R, d = rd / R;
    float A = dot(d, d), B = dot(o, d), C = dot(o, o) - 1.0, h = B * B - A * C;
    if (h > 0.0) { float t = (-B - sqrt(h)) / A; if (t > 0.0 && t < tg) { tg = t; ng = normalize((a + rd * t - c) / (R * R)); } }
  }
  if (tg > 1e4 || gHitT < tg) return dc;
  float f = pow(1.0 - abs(dot(ng, normalize(rd))), 2.0);
  float glint = pow(max(dot(ng, normalize(vec3(-0.45, 0.6, 0.65))), 0.0), 30.0) + 0.5 * pow(max(dot(ng, normalize(vec3(0.6, -0.2, 0.75))), 0.0), 60.0);
  vec3 gc = mix(vec3(0.55, 0.62, 0.8), vec3(0.85, 0.92, 1.0), f) + vec3(1.0, 0.95, 0.85) * glint;
  float ga = clamp(0.1 + 0.75 * smoothstep(0.35, 1.0, f) + glint, 0.0, 0.92);
  float A2 = ga + dc.a * (1.0 - ga);
  return vec4((gc * ga + dc.rgb * dc.a * (1.0 - ga)) / max(A2, 1e-4), A2);
}

void main() {
  TYPE = vDoll.w; SEED = vC.z; SQ = vA.x; HEAD = vA.yz; SWAY = vA.w;
  LOOK = vB.xy; BLINK = vB.z; MOUTH = vB.w; GLOW = vC.x; SCARE = vC.y; REACH = vC.w;
  HL = vPA.xyz; HIPX = vPA.w; HR = vPB.xyz; TWIST = vPB.w; LIFTL = vPC.x; LIFTR = vPC.y; ROLL = vPC.z; INK = vPC.w;
  FXL = vPD.x; FXR = vPD.y; CROUCH = vPD.z; LZ = vPD.w;
  BEND = TYPE < 9.5 ? vC.w : 0.0;    // (a doll's last value there is how much its elbows bend)
  // (dancing, the voodoo doll, the mummy and the little monster stand up on longer legs; the others have
  // no legs to show: a dress, a sheet, a big body)
  float legs = TYPE > 0.5 && TYPE < 1.5 ? 0.09 : TYPE > 3.5 && TYPE < 4.5 ? 0.15 : TYPE > 4.5 && TYPE < 5.5 ? 0.09 : 0.0;
  LEGUP = vPlate.y < 0.5 ? clamp(vPlate.x, 0.0, 1.0) * legs : 0.0;
  if (vDoll.z > 0.5 && TYPE < 9.5) {
    // each doll's shoulders, the size of its head (its arms go round it), the thickness of its arms
    vec3 hc = vec3(HEAD.x, headY(TYPE) + HEAD.y, 0.0);
    if (TYPE < 0.5) armRig(vec3(0.22, -0.38, 0.0), hc, vec3(0.74, 0.58, 0.68), 0.075);
    else if (TYPE < 1.5) armRig(vec3(0.24, -0.28, 0.0), hc, vec3(0.52, 0.48, 0.45), 0.1);
    else if (TYPE < 2.5) armRig(vec3(0.3, 0.0, 0.0), hc, vec3(0.52, 0.5, 0.52), 0.1);
    else if (TYPE < 3.5) armRig(vec3(0.18, -0.25, 0.0), hc, vec3(0.54, 0.56, 0.52), 0.05);
    else if (TYPE < 4.5) armRig(vec3(0.26, -0.22, 0.0), hc, vec3(0.47, 0.5, 0.45), 0.095);
    else if (TYPE < 5.5) armRig(vec3(0.32, -0.28, 0.0), hc, vec3(0.49, 0.52, 0.43), 0.085);
    else armRig(vec3(0.22, -0.2, -0.02), hc, vec3(0.54, 0.56, 0.52), 0.05);
  }
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
    // a relay: the doll sinks into its grave (or comes out of it); the ground hides what is under it, and
    // a puff of earth flies up
    float sink = doll && vPlate.y < 0.0 ? -vPlate.y : 0.0;
    vec2 lg = lp;
    if (sink > 0.0) {
      lp.y += sink * 2.6;
      vec2 dq = (lg - vec2(0.0, -1.05)) / vec2(0.9, 0.3);
      float clods = step(0.82, hash(floor(lg * 9.0 + vec2(0.0, -uTime * 3.0)))) * 0.8 + 0.35;
      float puff = exp(-dot(dq, dq) * 2.2) * sink * (1.0 - sink) * 4.0 * clods;
      col.rgb += vec3(0.16, 0.1, 0.07) * puff; col.a = max(col.a, min(puff, 0.85));
      // (a mound of fresh earth over the grave, speckled, while it is down there)
      float mh = 0.3 * smoothstep(0.3, 0.8, sink);
      if (mh > 0.002) {     // (no mound yet: nothing to divide by)
        vec2 mq = (lg - vec2(0.0, -1.12)) / vec2(0.72, mh);
        float mound = smoothstep(1.0, 0.88, length(mq + vec2(0.0, 0.06 * sin(lg.x * 14.0)))) * step(-1.12, lg.y);
        vec3 earth = mix(vec3(0.24, 0.15, 0.09), vec3(0.42, 0.28, 0.16), step(0.65, hash(floor(lg * 22.0))));
        col.rgb = mix(col.rgb, earth * (0.7 + 0.5 * clamp(mq.y, 0.0, 1.0)), mound); col.a = max(col.a, mound);
      }
    }
    if (doll) {
      // the spotlight on a dancer: a cone of moonlight from above, a bright pool at its feet
      float spot = vPlate.y < 0.5 ? vPlate.x : 0.0;
      if (spot > 0.01) {
        float w = 0.62 + 0.2 * (lg.y + 1.1);
        float edge = smoothstep(w, w * 0.55, abs(lg.x));
        float beam = edge * smoothstep(5.2, 0.4, lg.y + 1.1) * smoothstep(-1.3, -1.0, lg.y) * (0.46 + 0.08 * sin(uTime * 6.0 + lg.y * 3.0));
        // motes of dust turning in the light: soft round specks
        vec2 mg = vec2(lg.x * 7.0, lg.y * 7.0 - uTime * 1.6);
        vec2 mc = floor(mg), mf = fract(mg) - 0.5 - 0.35 * (vec2(hash(mc + 3.7), hash(mc + 8.1)) - 0.5);
        float mote = step(0.94, hash(mc)) * exp(-dot(mf, mf) * 70.0) * edge * 1.4;
        vec2 fp = (lg - vec2(0.0, -1.1)) / vec2(0.9, 0.17);
        float pool = exp(-dot(fp, fp) * 1.3) * 0.75;
        vec3 sc = mix(vec3(0.9, 0.93, 1.0), vCol.rgb, 0.4);
        col.rgb += sc * (beam + pool + mote) * spot; col.a = max(col.a, min(1.0, (beam + pool + mote * 0.5) * spot));
      }
      // its shadow, cast away from the moon (down and to the left), smaller when it floats or jumps
      float lift = max(-SQ, 0.0) * 1.5 + (TYPE > 1.5 && TYPE < 2.5 ? 0.25 : 0.0);
      vec2 sp = (lg - vec2(-0.28, -1.12)) / vec2(0.75 + 0.3 * SQ, 0.13);
      float sh = exp(-dot(sp, sp) * 1.4) * 0.5 * vCol.a * (1.0 - 0.5 * lift) * (1.0 - sink);
      col.rgb *= 1.0 - sh; col.a = max(col.a, sh * 0.8);
      // its reflection in the glass it stands on
      bool refl = vPlate.y < 0.5 && vPlate.z > 0.5 && sink == 0.0;
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
    vec2 bq = lp / (face ? 0.9 : 1.12);
    if (doll) {
      // (measured in the doll's own proportions: unstretched, unswayed)
      float sy = 1.0 - SQ, sx = inversesqrt(max(sy, 0.25));
      vec2 lq = vec2(lp.x / sx, (lp.y + 1.1) / sy - 1.1);
      lq.x -= SWAY * (lq.y + 1.1) * (lq.y + 1.1) * 0.12;
      bq = (lq - vec2(0.0, -0.05)) / vec2(1.22, 1.35);
    }
    if (dot(bq, bq) < 1.0 && (sink == 0.0 || lg.y > -1.12)) {
      vec4 dc = marchAt(lp, px, doll ? 44 : 40);
      if (TYPE > 27.5 && TYPE < 28.5) dc = overGlass(lp, dc);
      col.rgb = col.rgb * (1.0 - dc.a) + dc.rgb * dc.a;
      col.a = col.a + dc.a * (1.0 - col.a);
    }
  }
  o = col;
}`;var Ha=11,Fi=Ha*4,gr=96,zi=24;function br(i,e,t,s){let a=i.createShader(e);return i.shaderSource(a,t),i.compileShader(a),i.getShaderParameter(a,i.COMPILE_STATUS)||s.push(i.getShaderInfoLog(a)||"shader"),a}function yr(i,e,t,s,a){let o=i.createProgram();i.attachShader(o,br(i,i.VERTEX_SHADER,e,s)),i.attachShader(o,br(i,i.FRAGMENT_SHADER,t,s)),(a||[]).forEach((l,d)=>i.bindAttribLocation(o,d,l)),i.linkProgram(o),i.getProgramParameter(o,i.LINK_STATUS)||s.push(i.getProgramInfoLog(o)||"link");let r={},n=i.getProgramParameter(o,i.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let d=i.getActiveUniform(o,l);r[d.name.replace(/\[0\]$/,"")]=i.getUniformLocation(o,d.name)}return{p:o,u:r}}var Na=class{constructor(e){this.errors=[],this.canvas=document.createElement("canvas"),this.canvas.className="ghouls",this.canvas.setAttribute("aria-hidden","true"),e.insertBefore(this.canvas,e.firstChild),this.data=new Float32Array(gr*Fi),this.lost=!1,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.lost=!0}),this.canvas.addEventListener("webglcontextrestored",()=>{this.lost=!1,this.init()}),this.init()}init(){let e=this.canvas.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(this.gl=e,this.ok=!!e,!e)return;this.errors=[],this.night=yr(e,pr,mr,this.errors,["aPos"]);let t=["aCorner","iRect","iPlate","iDoll","iAnimA","iAnimB","iAnimC","iColor","iPoseA","iPoseB","iPoseC","iPoseD"];if(this.dolls=yr(e,vr,za,this.errors,t),this.errors.length){this.ok=!1;return}this.tri=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.tri),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),this.vaoNight=e.createVertexArray(),e.bindVertexArray(this.vaoNight),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.vaoDolls=e.createVertexArray(),e.bindVertexArray(this.vaoDolls),this.corner=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.corner),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.inst=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.inst),e.bufferData(e.ARRAY_BUFFER,this.data.byteLength,e.DYNAMIC_DRAW);for(let s=0;s<Ha;s++)e.enableVertexAttribArray(1+s),e.vertexAttribPointer(1+s,4,e.FLOAT,!1,Fi*4,s*16),e.vertexAttribDivisor(1+s,1);e.bindVertexArray(null),this.keyRects=new Float32Array(zi*4),this.keyInfo=new Float32Array(zi*4)}resize(e,t,s){let a=Math.max(1,Math.round(e*s)),o=Math.max(1,Math.round(t*s));(this.canvas.width!==a||this.canvas.height!==o)&&(this.canvas.width=a,this.canvas.height=o),this.scale=a/Math.max(e,1)}draw(e){let t=this.gl;if(!this.ok||this.lost||!t)return;let s=this.canvas.width,a=this.canvas.height,o=this.scale;t.viewport(0,0,s,a),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA);let r=this.night,n=r.u;t.useProgram(r.p),t.uniform2f(n.uRes,s,a),t.uniform1f(n.uScale,o),t.uniform1f(n.uTime,e.time);let l=e.pad||{x:-1e4,y:-1e4,w:1,h:1,r:0};t.uniform4f(n.uPad,l.x,l.y,l.w,l.h),t.uniform1f(n.uPadR,l.r),t.uniform1f(n.uStage,e.pad&&e.stage?1:0);let d=(e.keys||[]).slice(0,zi);this.keyRects.fill(0),this.keyInfo.fill(0),d.forEach((h,p)=>{this.keyRects.set([h.x0,h.y0,h.x1,h.y1],p*4),this.keyInfo.set([h.black?1:0,h.lit||0,0,0],p*4)}),n.uKeys&&t.uniform4fv(n.uKeys,this.keyRects),n.uKeyInfo&&t.uniform4fv(n.uKeyInfo,this.keyInfo),t.uniform1f(n.uNKeys,d.length),t.uniform3f(n.uAccent,e.accent[0],e.accent[1],e.accent[2]),t.uniform1f(n.uWatch,e.watch),t.uniform1f(n.uBeat,e.beat),t.uniform1f(n.uCalm,e.calm?1:0),t.bindVertexArray(this.vaoNight),t.drawArrays(t.TRIANGLES,0,3);let c=Math.min(e.dolls,gr);if(c>0){let h=this.dolls,p=h.u;t.useProgram(h.p),t.uniform2f(p.uRes,s,a),t.uniform1f(p.uScale,o),t.uniform1f(p.uTime,e.time),t.uniform1f(p.uFlicker,e.flicker),t.uniform1f(p.uWatch,e.watch),t.uniform1f(p.uCalm,e.calm?1:0),p.uMoon&&t.uniform3f(p.uMoon,.55,.7,.45),t.bindVertexArray(this.vaoDolls),t.bindBuffer(t.ARRAY_BUFFER,this.inst),t.bufferSubData(t.ARRAY_BUFFER,0,e.data,0,c*Fi),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,c)}t.bindVertexArray(null)}destroy(){let e=this.gl;if(e){let t=e.getExtension("WEBGL_lose_context");t&&t.loseContext()}this.canvas.remove(),this.ok=!1}};var J={PUMPKIN:0,VOODOO:1,GHOST:2,SKULL:3,MUMMY:4,FRANK:5,SKELETON:6},ul=i=>10+i,ke={CAULDRON:20,SKULL:21,PUMPKIN:22,HEART:23,CRYSTAL:24,BAT_L:25,BAT_R:26,DIE:27,HOURGLASS:28,BROOM:29,COFFIN:30,WEB:31,POTION:32,VIALS:33,BOOK:34},kr=[[".top .logo",ke.CAULDRON,"fill"],[".top .tbtn.rec",ke.SKULL,"fill","rec"],[".top .tbtn.play",ke.PUMPKIN,"fill","play"],[".top .progress",-1,"plate"],[".top .chip.tempo",ke.HEART,"left","tempo"],[".top .chip:not(.tempo)",ke.CRYSTAL,"left"],[".parts .ptab",i=>ul({drum:J.PUMPKIN,bass:J.FRANK,lead:J.GHOST}[i.dataset.p]??J.GHOST),"face","part"],[".inst .arrow:not(.dice)",(i,e)=>e===0?ke.BAT_L:ke.BAT_R,"fill"],[".inst .dice",ke.DIE,"fill","dice"],[".view .controls .dial",-1,"plate"],[".view .range",-1,"plate"],[".timeline .tbtn",(i,e)=>[ke.HOURGLASS,ke.BROOM,ke.COFFIN][e]??ke.COFFIN,"fill","tool"],[".timeline .tl",-1,"plate"],[".groups .grp",-1,"plate"],[".autobar .pill",-1,"plate"],[".faders .fader",-1,"plate"],[".faders .fader .m",-1,"plate"],[".mixknobs .dial",-1,"plate"],[".nav button",(i,e)=>[ke.WEB,ke.POTION,ke.VIALS,ke.BOOK][e]??ke.WEB,"nav","nav"]],Vt=(i,e)=>i+Math.random()*(e-i),Wa=(i,e,t)=>Math.max(e,Math.min(t,i)),St=i=>(i=Wa(i,0,1),i*i*(3-2*i)),ra=(i,e,t)=>i+(e-i)*t,Va=(i,e,t)=>[ra(i[0],e[0],t),ra(i[1],e[1],t),ra(i[2],e[2],t)],Ua={[J.PUMPKIN]:[[-.42,-.66,.08],[.42,-.66,.08]],[J.VOODOO]:[[-.64,-.2,.04],[.64,-.2,.04]],[J.GHOST]:[[-.6,-.12,.05],[.6,-.12,.05]],[J.SKULL]:[[-.4,-.6,.12],[.4,-.6,.12]],[J.MUMMY]:[[-.5,-.38,.4],[.5,-.38,.4]],[J.FRANK]:[[-.46,-.78,.08],[.46,-.78,.08]],[J.SKELETON]:[[-.32,-.6,.06],[.32,-.6,.06]]},Ni=["hip","twist","ll","lr","fxl","fxr","lz","crouch","travel","roll","spin","bounce","head","bend"],fl={[J.PUMPKIN]:[1,.1],[J.VOODOO]:[.95,.4],[J.GHOST]:[1,.3],[J.SKULL]:[.9,.3],[J.MUMMY]:[.9,.45],[J.FRANK]:[.85,.5],[J.SKELETON]:[.9,.35]},W=(i,e,t={})=>{let s={hl:i,hr:e};for(let a of Ni)s[a]=t[a]||0;return t.lz===void 0&&(s.lz=1),s},_t=(i,e,t)=>{let s={hl:Va(i.hl,e.hl,t),hr:Va(i.hr,e.hr,t)};for(let a of Ni)s[a]=ra(i[a],e[a],t);return s},ia=(i,e)=>t=>{let s=i.length,a=(t%e+e)%e,o=s-1;for(let l=0;l<s;l++)i[l][0]<=a&&(o=l);let r=i[o][0];r>a&&(r-=e);let n=o+1<s?i[o+1][0]:i[0][0]+e;return n<=r&&(n+=e),_t(i[o][1],i[(o+1)%s][1],St((a-r)/(n-r)))},ja=(i,e,{rate:t=2,lift:s=.5,lz:a=1,bounce:o=.05}={})=>{let r={...i,hl:i.hl.slice(),hr:i.hr.slice()},n=e*t,l=n-Math.floor(n),d=l<.5?Math.sin(Math.PI*l/.5):0,c=Math.floor(n)%2===0;return r.ll=Math.max(r.ll,c?s*d:0),r.lr=Math.max(r.lr,c?0:s*d),s&&(r.lz=a),r.crouch+=o*(1-d),r},pl=(i,e)=>{let t=i.length,s=Math.floor(e)%t,a=e-Math.floor(e);return _t(i[(s+t-1)%t],i[s],St(a/.22))},xr=W([-.05,.18,.36],[.78,.48,.1],{roll:.32,head:-.06,twist:-.2,bend:.9}),oa=(i,e)=>{let t=i-Math.floor(i);return t<e?Math.sin(Math.PI*t/e):0},ml=i=>Math.tanh(2.5*i)/Math.tanh(2.5),Ga=(i,e,t=.1,s=2,a={})=>{let o=Math.PI*2*s*i;return W([e[0]-.12+t*Math.cos(o),e[1]+t*Math.sin(o),e[2]],[e[0]+.12-t*Math.cos(o),e[1]-t*Math.sin(o),e[2]],{bend:1,...a})},Bt={passinho:{name:"Passinho do Jamal",weight:4,at(i){let e=W([-.12,-.2,.5],[.48,-.45,.15],{bend:1,crouch:.22}),t=W([-.8,-.45,-.05],[-.15,-.15,.45],{bend:1,crouch:.25,twist:-.75,hip:.08}),s=W([-.5,-.12,.38],[.5,-.3,.38],{bend:1,crouch:.2,roll:.04}),a=W([-.5,-.3,.38],[.5,-.12,.38],{bend:1,crouch:.2,roll:-.04}),o=W([.05,-.22,.48],[-.05,-.06,.48],{bend:1,crouch:.18,twist:1,hip:-.08,fxl:.02,fxr:-.02}),r=W([.05,-.08,.48],[-.05,-.2,.48],{bend:1,crouch:.2,twist:.95,hip:-.08}),n=W([-.6,-.2,.3],[.55,-.25,.3],{bend:1,crouch:.22,twist:.3}),l=ia([[0,e],[.6,t],[1.2,s],[1.6,a],[2,o],[2.5,r],[2.9,o],[3.3,n]],4)(i),d=i*2,c=d-Math.floor(d),h=c<.55?Math.sin(Math.PI*c/.55):0,p=Math.floor(d)%2===0;return l.ll=Math.max(l.ll,p?.55*h:0),l.lr=Math.max(l.lr,p?0:.55*h),l.fxl+=p?-.06*h:0,l.fxr+=p?0:.06*h,l.crouch+=.06*(1-h),l.bounce=-.03*h,l}},rat:{name:"Danse du rat",weight:3,at(i){let e=W([.3,-.18,.46],[.66,-.3,.26],{bend:1,spin:-.6,twist:-.25,crouch:.2,roll:-.1}),t=W([-.3,-.05,.45],[.3,-.05,.45],{bend:1,crouch:.16,head:.03}),s=W([-.66,-.15,.2],[.55,.1,.25],{bend:1,crouch:.22,roll:.08}),a=ia([[0,e],[.55,t],[1.05,s],[1.5,t]],2)(i);return ja(a,i,{rate:4,lift:.6,lz:-.6,bounce:.05})}},dakoto:{name:"Da Koto Nai",weight:2,at(i){let e=W([-.82,.05,.12],[.82,.05,.12],{bend:1,crouch:.28,fxl:-.1,fxr:.1}),t=W([-.12,-.32,.48],[.55,.42,.28],{bend:1,crouch:.2,spin:.45,roll:.06}),s=W([-.75,-.55,.22],[.75,-.55,.22],{bend:1,crouch:.42,fxl:-.18,fxr:.18}),a;return i<1.5?a=Ga(i,[0,-.25,.48],.1,2,{crouch:.2}):i<2.5?a=_t(Ga(1.5,[0,-.25,.48],.1,2,{crouch:.2}),e,St((i-1.5)/.35)):i<5.5?(a=_t(e,t,St((i-2.5)/.35)),a.head=.05*oa(i,.5)):i<6.5?a=_t(t,Ga(i,[0,-.25,.48],.1,2,{crouch:.2}),St((i-5.5)/.3)):a=_t(Ga(6.5,[0,-.25,.48],.1,2,{crouch:.2}),s,St((i-6.5)/.3)),ja(a,i,{rate:2,lift:.2,bounce:.08})}},floss:{name:"Floss",weight:2,at(i){if(i>7)return xr;let e=ml(Math.sin(Math.PI*2*i)),t=Math.cos(Math.PI*2*i);return W([-.16+.62*e,-.66,.34*t],[.16+.62*e,-.66,-.34*t],{hip:-.2*e,twist:.18*e,crouch:.1+.06*Math.abs(e),bounce:.03*Math.abs(e),fxl:-.04*e,fxr:-.04*e})}},riri:{name:"RiRiRi : Joyeux Halloween",weight:3,at(i){let e=W([-.32,.32,.46],[.32,.32,.46],{bend:1,crouch:.15,roll:.1}),t=W([-.1,-.2,.5],[.3,-.1,.45],{bend:1,spin:1.3,ll:1,crouch:.1}),s=W([-.55,.55,.3],[.55,.15,.3],{bend:1,crouch:.2}),a=W([-.55,.15,.3],[.55,.55,.3],{bend:1,crouch:.2}),o=W([-.6,.85,.2],[.6,.85,.2],{bend:.4,bounce:-.08}),r=W([-.85,-.2,.3],[.4,.15,.35],{bend:.8,crouch:.42,roll:-.12}),n=W([-.2,-.18,.5],[.2,-.18,.5],{bend:1,crouch:.18}),l=W([-.3,-.45,.3],[.06,.12,.5],{bend:1,roll:.2,crouch:.15}),d=ia([[0,e],[1,t],[2,s],[2.5,a],[3,o],[4,r],[5.5,n],[6.5,l],[7.2,o]],8)(i);return i>=5.5&&i<6.5&&(d.travel=.12*Math.sin(Math.PI*2*(i-5.5))),ja(d,i,{rate:2,lift:.32,bounce:.05})}},nervy:{name:"Danse nerveuse",weight:2,at(i){let e=W([.1,-.3,.46],[.72,.72,.15],{bend:.6,crouch:.2}),t=W([-.3,-.1,.45],[.3,-.2,.8],{bend:.5,crouch:.22,roll:.15,spin:-.3}),s=W([-.4,.15,.35],[.4,.15,.35],{bend:1,crouch:.25}),a=ia([[0,e],[2,t],[4.5,s],[6,e],[7,s]],8)(i),o=Math.sin(Math.PI*2*6*i);if(a.hl[0]+=.03*o,a.hl[1]+=.02*Math.sin(Math.PI*2*7*i),a.hr[0]-=.03*o,a.hip+=.03*o,i>=4.5&&i<6){let r=Math.sin(Math.PI*2*4*i);a.fxl=.06*r,a.fxr=-.06*r}return ja(a,i,{rate:4,lift:.2,bounce:.03})}},ambiguous:{name:"Danse d\u2019Ambiguous Kim",weight:2,len:32,at(i){let e=a=>{let o=W([-.2,-.78,.3],[.2,-.78,.3],{crouch:.05,fxl:.03,fxr:-.03,head:.04,bounce:.02}),r=W([-.3,-.62,.22],[.3,-.62,.22],{bend:1,head:.06,bounce:-.03}),n=W([-.3,-.6,.22],[.3,-.6,.22],{bend:1,crouch:.14,head:.04}),l=W([-.34,-.5,.2],[.34,-.5,.2],{bend:1,ll:1,roll:.05,bounce:-.08}),d=W([-.36,-.66,.12],[.36,-.66,.12],{bend:.3,lr:.6,lz:-1,fxr:.14,crouch:.1}),c=W([-.12,-.3,.46],[.12,-.3,.46],{bend:1,ll:1,bounce:-.07}),h=W([-.36,-.62,.15],[.36,-.62,.15],{bend:.3,crouch:.2,fxr:.15}),p=W([-.46,-.72,.14],[.46,-.72,.14],{crouch:.38,fxl:-.08,fxr:.34,hip:-.12,travel:-.1,roll:.06,bounce:.06}),f=W([.16,-.15,.48],[-.16,-.1,.46],{bend:1,twist:.15,crouch:.2,fxr:.18}),m=W([-.08,1.1,.1],[.08,1.1,.1],{bend:.7,ll:.8,bounce:-.08}),v=W([-.48,.42,.1],[.48,.42,.1],{bend:1,ll:1,bounce:-.08}),g=W([-.62,.95,.1],[-.2,1,-.05],{bend:.4,ll:.6,roll:.15}),b=W([-.22,.9,.1],[.22,.9,.1],{bend:.8,ll:1,bounce:-.08}),x=W([-.25,0,.45],[.58,1,.05],{bend:.6,ll:.8,roll:-.12}),T=W([-.08,1.1,.1],[.08,1.1,.1],{bend:.7,bounce:-.05}),R=W([-.1,-.3,.45],[.1,-.26,.45],{bend:.8,crouch:.06});return ia([[0,o],[.35,o],[.5,r],[1,n],[1.5,l],[2,d],[2.5,c],[3,h],[3.3,p],[4.75,p],[5,f],[5.25,m],[5.75,v],[6,g],[6.5,b],[6.75,v],[7,x],[7.25,T],[7.5,R]],8)(a)},t;if(i<16)t=e(i%8);else if(i<21)t=e(i-16);else if(i<31){let a=i-21,o=oa(a,.55),r=.06*Math.sin(Math.PI*4*a),n=W([-.14-r,1.12,.04],[.16+r,1.1,.04],{bend:.85,spin:-.6,head:-.04,roll:.06});t=_t(e(5),n,St(a/.5)),t.ll=.95*o,t.lz=.8,t.bounce=.03*(1-o)-.09*o,t.crouch=.08+.12*(1-o)}else t=_t(W([-.14,1.12,.04],[.16,1.1,.04],{bend:.85,spin:-.6}),W([-.2,-.78,.3],[.2,-.78,.3],{crouch:.05,head:.04}),St((i-31)/.8));let s=i<21?i%8:0;if(s>=3.3&&s<4.75){let a=oa(s,.5);t.crouch+=.05*a,t.bounce+=.04*a}return t}},bemsolto:{name:"Passo bem solto",weight:1,at(i){if(i>7)return xr;let e=Math.sin(Math.PI*i),t=oa(i,.5),s=Math.floor(i)%2?-1:1;return W([-.58-.1*e,-.3+.28*t*(s>0?1:.3),.2],[.58-.1*e,-.3+.28*t*(s<0?1:.3),.2],{ll:s<0?.8*t:0,lr:s>0?.8*t:0,fxl:s<0?-.12*t:0,fxr:s>0?.12*t:0,crouch:.15+.12*(1-t),twist:.3*e,hip:.1*e,roll:.12*e,travel:.1*e,bounce:.06*t,bend:.5})}},slick:{name:"Slick back",weight:1,at(i){let e=i*2,t=Math.floor(e)%2===0,s=Math.sin(Math.PI*(e-Math.floor(e))),a=Math.sin(Math.PI*i/4);return W([-.44-.06*a,-.5+.05*s,.12],[.44-.06*a,-.48+.05*s,.12],{ll:t?.9*s:0,lr:t?0:.9*s,lz:-1.6,crouch:.14,travel:.28*a,hip:.05*(t?1:-1)*s,twist:-.08*a,roll:-.05*a,head:.04,bend:.3})}},goule:{name:"Danse de la goule",weight:1,at(i){let e=[W([-.3,-.06,.26],[.3,-.06,.26],{roll:.25,twist:.2,crouch:.15,bend:1}),W([-.8,-.22,.05],[.26,-.58,.18],{roll:-.3,twist:-.25,ll:.5,fxl:-.1,crouch:.25,bend:1}),W([-.42,.28,.16],[.42,.28,.16],{roll:.12,head:.04,bend:1}),W([.18,-.6,.3],[-.18,-.6,.32],{roll:-.22,twist:.3,lr:.5,fxr:.1,crouch:.2,bend:1})];return pl(e,i*2)}},zombies:{name:"Danse des zombies",weight:1,at(i){let e=i%4,t=e<2?-1:1,s=e%2,a=Math.max(0,Math.sin(Math.PI*2*s))*.08,o=oa(s*2,.7);return W([.5*t-.22,-.12+a,.42],[.5*t+.22,-.1+a,.46],{roll:.3*t,hip:.1*t*Math.sin(Math.PI*s),twist:.2*t,bounce:a*.6,bend:.15,ll:t<0?.55*o:0,lr:t>0?.55*o:0,lz:-.8,crouch:.12,travel:.12*t*St(s)})}}};function Ya(){let i=Object.keys(Bt),e=i.reduce((s,a)=>s+Bt[a].weight,0),t=Math.random()*e;for(let s of i)if(t-=Bt[s].weight,t<=0)return s;return i[0]}var Yt=class{constructor(e,t){this.type=e,this.seed=t,this.sq=0,this.sqv=0,this.sqT=0,this.hx=0,this.hy=0,this.hvx=0,this.hvy=0,this.sw=0,this.swv=0,this.lx=0,this.ly=0,this.ltx=0,this.lty=0,this.blink=0,this.blinkAt=performance.now()+Vt(800,4e3),this.mouth=0,this.mouthT=0,this.glow=0,this.glowT=0,this.scare=0,this.reach=0,this.reachT=0,this.held=0,this.color=[1,.55,.15],this.twitchAt=performance.now()+Vt(3e3,12e3),this.ink=0,this.dance=null,this.spot=0,this.rise=1,this.swapTo=null;let s=Ua[e]||Ua[J.PUMPKIN];this.p=W(s[0].slice(),s[1].slice())}press(e=1){this.held++,this.dance=null,this.sqT=.32*e,this.sqv-=2.5*e,this.mouthT=1,this.scare=1,this.hvy-=3.5*e,this.hvx+=Vt(-2.5,2.5)*e,this.swv+=Vt(-3,3)*e}release(){this.held=Math.max(0,this.held-1),this.held||(this.sqT=0,this.mouthT=0,this.sqv-=3.5,this.hvx+=Vt(-2,2))}sing(e=.8,t){this.mouth=Math.max(this.mouth,Math.min(1,.45+e*.6)),this.glow=Math.max(this.glow,Math.min(1,e)),this.sqv-=2.2*e,this.hvy+=1.5*e,t&&(this.color=t)}startle(e){e<=.02||(this.scare=Math.max(this.scare,e),this.sqv-=3*e,this.hvx+=Vt(-3,3)*e,this.hvy+=2*e)}step(e,t,s,a){let o=s?.5:1,r=this.sqT+(s?0:.018*Math.sin(t/700+this.seed*9)),n=Ua[this.type]||Ua[J.PUMPKIN],l=s?0:.04*Math.sin(t/900+this.seed*7),d=W([n[0][0],n[0][1]+l,n[0][2]],[n[1][0],n[1][1]-l,n[1][2]]);if(this.reach>.01){let[b,x]=fl[this.type]||[.95,.4];d=_t(d,W([-b,x,.16],[b,x,.16]),this.reach)}if(this.swapTo!==null&&this.outT!==void 0){let b=this.outT,x=Math.sin(t/85);b<.35?d=_t(d,W([-.42,-.55,.1],[.62+.14*x,.78,.18],{roll:.06*x,bend:.4}),St(b/.08)):d=_t(d,W([-.55-.08*x,.85,.1],[.55-.08*x,.85,.1],{roll:.16*Math.sin(t/70),hip:.08*x}),St((b-.35)/.12))}if(this.inT!==void 0){let b=this.inT,x=Math.sin(t/75);b<.6?d=W([-.45,-.5,.1],[.28+.1*x,1.05,.12],{roll:b>.35?.12*Math.sin(t/160):0}):b<.82?d=W([-.72,.82,.1],[.72,.82,.1],{spin:Math.PI*2*St((b-.6)/.2)}):d=_t(W([-.72,.82,.1],[.72,.82,.1],{roll:.18*x}),d,St((b-.82)/.18))}let c=0;if(this.dance&&!s){let b=this.dance,x=a-b.start;if(x>=b.len||x<-1)this.dance=null;else if(x>=0){let T=Bt[b.name].at(x),R=St(Math.min(x/.25,(b.len-x)/.25,1));d=_t(d,T,R),r+=T.bounce*R,c=R}}let h=1-Math.exp(-e*22),p=this.p;p.hl=Va(p.hl,d.hl,h),p.hr=Va(p.hr,d.hr,h);for(let b of Ni)b!=="spin"&&b!=="bounce"&&(p[b]=ra(p[b],d[b],h));p.spin=d.spin,this.spot+=(c-this.spot)*(1-Math.exp(-e*6)),this.sqv+=(-(this.sq-r)*340-this.sqv*15)*e,this.sq=Wa(this.sq+this.sqv*e,-.35,.5),this.hvx+=(-this.hx*180-this.hvx*9)*e,this.hx+=this.hvx*e,this.hvy+=(-(this.hy-p.head)*220-this.hvy*10)*e,this.hy+=this.hvy*e,this.hx=Wa(this.hx,-.25,.25),this.hy=Wa(this.hy,-.2,.2);let f=s?0:.1*Math.sin(t/1300+this.seed*5)*o;this.swv+=(-(this.sw-f)*90-this.swv*7)*e,this.sw+=this.swv*e;let m=1-Math.exp(-e*10);this.lx+=(this.ltx-this.lx)*m,this.ly+=(this.lty-this.ly)*m,t>this.blinkAt&&(this.blinkStart=t,this.blinkAt=t+Vt(1800,6e3)*(s?1.6:1));let v=this.blinkStart?(t-this.blinkStart)/140:9;this.blink=v<1?Math.sin(v*Math.PI):0,!s&&t>this.twitchAt&&(this.twitchAt=t+Vt(6e3,16e3),this.hvx+=Vt(-4,4),this.swv+=Vt(-4,4));let g=1-Math.exp(-e*(this.mouthT>this.mouth?22:7));this.mouth+=(Math.max(this.mouthT,0)-this.mouth)*g,this.glow=Math.max(this.glowT,this.glow*Math.exp(-e*3.2)),this.scare*=Math.exp(-e*3.5),this.reach+=(this.reachT-this.reach)*(1-Math.exp(-e*8))}};function na(i){if(i=(i||"").trim(),i.startsWith("color("))return i.match(/[\d.]+/g).map(Number).slice(-3).map(s=>s>1?s/255:s);if(i.startsWith("#"))return(i.length===4?i.slice(1).split("").map(s=>s+s):[i.slice(1,3),i.slice(3,5),i.slice(5,7)]).map(s=>parseInt(s,16)/255);let e=i.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[1,.5,.1]}function wr(i,e){if(i==="fill"){let t=Math.min(e.height,e.width)*1.02;return{x:e.left+e.width/2,y:e.top+e.height/2,s:t}}if(i==="left"){let t=e.height*.8;return{x:e.left+e.height*.38,y:e.top+e.height/2,s:t}}if(i==="face"){let t=e.height*.9;return{x:e.left+e.height*.5,y:e.top+e.height/2,s:t}}if(i==="nav"){let t=Math.min(e.height*.7,36);return{x:e.left+e.width/2,y:e.top+t*.55+2,s:t}}return null}var Hi=Ha*4,vl=[J.PUMPKIN,J.SKULL,J.GHOST,J.VOODOO],Sr=[J.GHOST,J.PUMPKIN,J.SKULL,J.VOODOO,J.MUMMY,J.FRANK,J.SKELETON],Tr=9e3,gl=112,Ka=i=>(i=Math.max(0,Math.min(1,i)),i*i*(3-2*i)),bl=[[0,0,1],[0,1,0],[1,0,0],[-1,0,0],[0,-1,0],[0,0,-1]];function yl(i){let e=bl[i-1],t=[[1,0,0],[0,1,0],[0,0,1]].filter(c=>!c.some((h,p)=>h&&e[p])),s=Math.random()<.5?-1:1,a=Math.random()<.5?-1:1,o=e.map((c,h)=>c+.55*s*t[0][h]+.42*a*t[1][h]),r=Math.hypot(...o),n=o[0]/r,l=o[1]/r,d=o[2]/r;return[Math.asin(-n),Math.atan2(-l,d)]}function Mr(i,{pad:e,app:t,fx:s}){let a=()=>{let S=s&&s();return S&&S.fluid&&S.fluid.ok?S.fluid:null},o=matchMedia("(prefers-reduced-motion: reduce)"),r=null,n=0,l=!1,d=null,c=!0,h=[],p=new Map,f=[],m="",v=[],g=null,b={x:-1,y:-1,t:-1e9},x=performance.now(),T=0,R=new Map,I=new Map,N=0,ie=-1,K=!1,P=null,Z={tick:0,at:0,msPerTick:6e4/11520},j=0,ae=-1,H=null,fe=null,G=0,U=-1,ue=()=>Math.min(window.devicePixelRatio||1,1.75),oe=ue(),re=16,Se=0,le=0,Ge=0,M=0,C=0,A=new Float32Array(128*Hi),O=1,B={drum:[1,.5,.1],bass:[.7,.3,1],lead:[.45,1,.3],rec:[1,.15,.12],accent:[1,.5,.1],play:[1,.55,.1]},Q=()=>{let S=getComputedStyle(t);for(let _ of["drum","bass","lead","rec"])B[_]=na(S.getPropertyValue("--"+_));B.accent=na(S.getPropertyValue("--accent"))},pe=()=>t.getBoundingClientRect(),de=()=>O++*.6180339%1;function X(){c=!1;let S=[];for(let[_,F,D,V]of kr)t.querySelectorAll(_).forEach((ee,We)=>{let je=typeof F=="function"?F(ee,We):F,Ue=p.get(ee);je>=0&&(!Ue||Ue.type!==je)&&(Ue=new Yt(je,de()),Ue.state=0,Ue.act=0,Ue.actT=0,p.set(ee,Ue));let Xe=parseFloat(getComputedStyle(ee).borderTopLeftRadius)||12;S.push({el:ee,kind:D,tag:V,doll:je>=0?Ue:null,radius:Xe,flash:0,plate:!ee.closest(".gpu-host")})});h=S}let bt=S=>{let _=null;for(let F of h)F.el.contains(S)&&(!_||_.el.contains(F.el))&&(_=F);return _},He=null,st=()=>{let S=i.settings.hwCast;return Array.isArray(S)&&S.length===4?S.slice():vl.slice()};function mt(){let S=e.keyLayout(),_=S.sig.startsWith("piano");return He||(He=st()),S.sig!==m&&(m=S.sig,f=S.keys.map((F,D)=>new Yt(e.part==="drum"?He[D%4]:_&&F.cut?J.SKULL:Sr[D%Sr.length],de())),H&&H.classList.remove("show")),v=S.keys,_}let Dt=(S,_)=>{for(let F=v.length-1;F>=0;F--){let D=v[F];if(D.cut&&S>=D.x0&&S<D.x1&&_>=D.y0&&_<D.y1)return F}for(let F=0;F<v.length;F++){let D=v[F];if(!D.cut&&S>=D.x0&&S<D.x1&&_>=D.y0&&_<D.y1)return F}return-1},Nt=(S,_,F,D,V)=>{let ee=(S.x1-S.x0)*D;if(e.part==="drum")return{y:.86,s:Math.min(ee*1.02,V*.38)};if(F&&S.cut){let je=Math.min(ee*1.25,V*.15,46);return{y:S.y1-6/V,s:je}}let We=Math.min(ee*1.3,V*.24,74);return{y:1-24/V,s:We}};function Ht(S,_,F,D){if(!l)return;mt(),Hs(null,_,F);let V=I.get(S);if(D==="up"||D==="cancel"){V!==void 0&&f[V]&&(f[V].release(),f[V].reachT=0),I.delete(S);return}let ee=Dt(_,F);if(ee!==V&&(V!==void 0&&f[V]&&(f[V].release(),f[V].reachT=0),ee>=0&&f[ee].press(D==="down"?1:.6),ee>=0?I.set(S,ee):I.delete(S)),ee>=0){let We=f[ee],je=e.el.getBoundingClientRect(),Ue=Nt(v[ee],ee,e.piano,je.width,je.height),Xe=Ue.y-Ue.s/je.height,Rt=Math.max(0,Math.min(1,(Xe-F)/.25));We.reachT=Rt,We.sqT=Rt>.1?-.22*Rt:.32}}function Ms(S,_,F,D,V=.8){if(!l)return;mt();let ee=S==="drum"?D:Dt(Math.min(.999,Math.max(0,_)),Math.min(.999,Math.max(0,F)));if(ee<0&&S!=="drum"){let je=1e9;v.forEach((Ue,Xe)=>{let Rt=Math.abs((Ue.x0+Ue.x1)/2-_);!Ue.cut&&Rt<je&&(je=Rt,ee=Xe)})}let We=f[ee];We&&We.sing(V,B[S]||B.accent)}let It=S=>K?Z.tick/96+(S-Z.at)/(Z.msPerTick*96):S/(6e4/gl);function Ie(S,_,F){let D=Bt[_].len||8;for(let V of S)V.dance={name:_,start:F,len:D};fe={dolls:S,name:_,until:F+D},H||(H=document.createElement("div"),H.className="hw-dance",t.append(H)),H.textContent="\u266A "+Bt[_].name}function Ls(S){if(ge.away||!i.settings.hwRelay||e.part!=="drum"||i.ui.view!=="pattern"||o.matches||f.length!==4||!He||f.some(V=>V.swapTo!==null||V.rise<1))return;let _=!1;if(K){let V=Math.floor(It(S)/4);V!==U&&(U=V,_=V>0&&V%8===0)}else S>G&&(_=G>0,G=S+25e3+Math.random()*2e4);if(!_)return;let F=[J.PUMPKIN,J.VOODOO,J.GHOST,J.SKULL,J.MUMMY,J.FRANK,J.SKELETON].filter(V=>!He.includes(V)),D=[0,1,2,3].filter(V=>!f[V].dance&&!f[V].held);!F.length||!D.length||(f[D[Math.floor(Math.random()*D.length)]].swapTo=F[Math.floor(Math.random()*F.length)])}function ri(S){if(ge.away||o.matches||!f.length||i.ui.view!=="pattern")return;let _=It(S);if(K){let F=Math.floor(_/4);if(F!==ae&&(ae=F,F%4===2&&!f.some(D=>D.dance)&&Math.random()<.75)){let D=f.filter(We=>!We.held&&We.swapTo===null&&We.inT===void 0),V=Math.min(D.length,1+Math.floor(Math.random()*3)),ee=D.sort(()=>Math.random()-.5).slice(0,V);ee.length&&Ie(ee,Ya(),F*4)}}else if(S>j){if(j){let F=f.filter(D=>!D.held&&!D.dance&&D.swapTo===null&&D.inT===void 0);F.length&&S-x>2500&&Ie([F[Math.floor(Math.random()*F.length)]],Ya(),Math.ceil(_))}j=S+15e3+Math.random()*15e3}}function Hs(S,_,F){let D=pe();if(S)b.x=S.clientX-D.left,b.y=S.clientY-D.top;else{let V=e.el.getBoundingClientRect();b.x=V.left-D.left+_*V.width,b.y=V.top-D.top+F*V.height}b.t=performance.now(),x=b.t}let Us=S=>{if(!l)return;Hs(S);let _=bt(S.target),F=[];if(_){_.flash=1;let D=_.doll;if(D){if(D.press(.8),F.push(D),(D.type===ke.DIE||D.type===ke.BOOK||D.type===ke.WEB)&&(D.act=0,D.actT=1),D.type===ke.DIE){let V=D.face||1;for(;V===(D.face||1);)V=1+Math.floor(Math.random()*6);let[ee,We]=yl(V),je=()=>(Math.random()<.5?-1:1)*Math.PI*2*(1+Math.floor(Math.random()*2));D.rollFrom=[D.rollA??.6,D.rollB??-.5],D.rollTo=[ee+je(),We+je()],D.rollT=0,D.face=V}D.type===ke.HOURGLASS&&(D.actT=D.actT>.5?0:1),D.type===ke.COFFIN&&(D.actT=1)}}R.set(S.pointerId,F);for(let D of h){if(!D.doll||D===_||!D.pos)continue;let V=Math.hypot(D.pos.x-b.x,D.pos.y-b.y);D.doll.startle(Math.max(0,1-V/150)*.6)}},js=S=>{l&&R.has(S.pointerId)&&Hs(S)},ls=S=>{let _=R.get(S.pointerId);if(_){for(let F of _)F.release(),F.type===ke.COFFIN&&setTimeout(()=>{F.actT=0},450);R.delete(S.pointerId)}};function ni(S){if(n=0,!l||!r||ge.held)return;if(ge.every>1&&(ge.skip=((ge.skip||0)+1)%ge.every)){Lt();return}let _=Math.min(.05,Se?(S-Se)/1e3:1/60);Se&&(re=re*.94+(S-Se)*.06,S<C?le=0:re>18?++le>45&&oe>1&&(oe=Math.max(1,oe*.85),le=0):(le=Math.max(0,le-1),re<15&&oe<ue()&&(oe=Math.min(ue(),oe+.002))),ge.cap&&(oe=Math.min(oe,ge.cap))),Se=S,c&&X(),S-M>500&&(Q(),M=S);let F=o.matches,D=f.some(se=>se.dance||se.swapTo!==null||se.rise<1),V=S-x<1500||K||R.size||I.size||D;if(Ge++,!V&&Ge%2){Lt();return}let ee=pe();r.resize(ee.width,ee.height,oe);let We=S-x;T+=((We>Tr&&!D?1:0)-T)*(1-Math.exp(-_*(We>Tr?.8:6))),N*=Math.exp(-_*6);let je=.5+.5*Math.sin(S/90)*Math.sin(S/37+1.3)*(F?.3:1);ri(S),Ls(S);let Ue=It(S),Xe=0,Rt=(se,at,ut,we,Ye,$e,$)=>{let q=Xe*Hi;if(A.set(se,q),A.set(at,q+4),we&&ut){let Pe=we.p;A.set([ut.x,ut.y,ut.s,we.type],q+8),A.set([we.sq,we.hx,we.hy,we.sw],q+12),A.set([we.lx,we.ly,we.blink,Ye],q+16),A.set([we.glow,we.scare,we.seed,we.type>=20?we.act:we.type<10?we.p.bend:we.reach],q+20),A.set([$e[0],$e[1],$e[2],$],q+24);let it=we.extra||Pe.hl;A.set([it[0],it[1],it[2],Pe.hip],q+28),A.set([Pe.hr[0],Pe.hr[1],Pe.hr[2],Pe.twist],q+32),A.set([Pe.ll,Pe.lr,Pe.roll,we.ink],q+36),A.set([Pe.fxl,Pe.fxr,Pe.crouch,Pe.lz],q+40)}else A.fill(0,q+8,q+Hi),A.set([$e[0],$e[1],$e[2],$],q+24);Xe++},Rs=(se,at,ut)=>{if(T>.5){se.ltx=0,se.lty=.05;return}S-b.t<3500?(se.ltx=Math.max(-1,Math.min(1,(b.x-at)/170)),se.lty=Math.max(-1,Math.min(1,(ut-b.y)/220))):(se.ltx=.5*Math.sin(S/2300+se.seed*20),se.lty=.25*Math.sin(S/3100+se.seed*13))};for(let se of h){let at=se.el.getBoundingClientRect();if(at.width<2||at.height<2||at.bottom<0||at.top>ee.height+ee.top){se.pos=null;continue}let ut={left:at.left-ee.left,top:at.top-ee.top,width:at.width,height:at.height,right:at.right-ee.left,bottom:at.bottom-ee.top},we=se.el,Ye=we.getAttribute("aria-pressed")==="true",$e=Ye||we.getAttribute("aria-selected")==="true"||we.classList.contains("active")||we.classList.contains("on")?1:0,$=B.accent,q=se.doll,Pe=0;if(q){if(q.glowT=0,q.type<20&&(Pe=q.mouth),se.tag==="rec"?($=B.rec,Pe=Ye?1:0,q.glowT=Ye&&K?.5+.5*N:0):se.tag==="play"?($=B.play,Pe=Ye?1:0,q.glowT=Ye?.35+.65*N:0):se.tag==="tempo"?($=B.rec,q.glowT=K?N:.5+.5*Math.pow(Math.max(0,Math.sin(S/430)),12)):se.tag==="part"?($=B[we.dataset.p]||B.accent,q.glowT=$e?.35:0):se.tag==="nav"?(q.glowT=$e?.4:0,$=B.accent):se.tag==="tool"&&q.type===ke.BROOM&&(Pe=Ye?1:0),q.type===ke.DIE){if(q.rollA===void 0&&(q.rollA=.6,q.rollB=-.5,q.face=1,q.rollT=1),q.rollT<1){q.rollT=Math.min(1,q.rollT+_/.85);let ot=1-Math.pow(1-q.rollT,3);q.rollA=q.rollFrom[0]+(q.rollTo[0]-q.rollFrom[0])*ot,q.rollB=q.rollFrom[1]+(q.rollTo[1]-q.rollFrom[1])*ot,q.rollT===1&&(q.rollA%=Math.PI*2,q.rollB%=Math.PI*2)}q.extra=[q.rollA,q.rollB,0]}if(q.type===ke.HOURGLASS){q.sand===void 0&&(q.sand=.75);let ot=Math.cos(q.act*Math.PI);Math.abs(ot)>.97&&(q.sand=ot>0?Math.max(0,q.sand-_/9):Math.min(1,q.sand+_/9)),q.extra=[q.sand,0,0]}if(q.type===ke.VIALS&&P){let ot=rt=>Math.min(1,Math.sqrt(rt||0)*1.3);q.extra=[.25+.75*ot(P.drum),.25+.75*ot(P.bass),.25+.75*ot(P.lead)]}else q.type===ke.VIALS&&(q.extra=[.55,.4,.7]);q.act+=(q.actT-q.act)*(1-Math.exp(-_*(q.type===ke.DIE?5:7))),(q.type===ke.DIE||q.type===ke.BOOK||q.type===ke.WEB)&&q.act>.97&&(q.act=0,q.actT=0)}se.flash*=Math.exp(-_*5);let it=q?wr(se.kind,ut):null;if(se.pos=it,q&&(Rs(q,it.x,it.y),q.step(_,S,F,Ue)),Rt([ut.left,ut.top,ut.width,ut.height],[se.radius,se.plate?1:0,$e,se.flash],it,q,Pe,$,1),Xe>=100)break}let Ve=null,ts=[],dt=null;if(i.ui.view==="pattern"&&e.el.isConnected){let se=e.el.getBoundingClientRect();if(se.width>10&&se.height>10){let at=mt();Ve={x:se.left-ee.left,y:se.top-ee.top,w:se.width,h:se.height,r:parseFloat(getComputedStyle(e.el).borderTopLeftRadius)||20};let ut=B[e.part]||B.accent,we=!!e.gpu;v.forEach((Ye,$e)=>{let $=f[$e];if(!$)return;if(ge.away)$.rise=Math.max(0,$.rise-_*2.2),$.dance=null,$.inT=void 0;else if($.swapTo!==null){$.outT=Math.min(1,($.outT||0)+_/2);let rt=$.outT;if($.rise=rt<.35?1:1-Ka((rt-.35)/.45),rt>=1){let cs=new Yt($.swapTo,de());cs.rise=0,cs.inT=0,He[$e]=$.swapTo,f[$e]=$=cs}}else if($.inT!==void 0){$.inT=Math.min(1,$.inT+_/2);let rt=$.inT;$.rise=rt<.12?0:rt<.35?.3*Ka((rt-.12)/.23):rt<.6?.3+.32*Ka((rt-.35)/.25):rt<.78?.62+.38*Ka((rt-.6)/.18):1,rt>=.78&&!$.landed&&($.landed=!0,$.sqv-=3.4,$.hvy+=2.2,$.scare=.5),rt===1&&($.inT=void 0)}else $.rise<1&&($.rise=Math.min(1,$.rise+_*1.6));let q=Nt(Ye,$e,at,se.width,se.height),Pe=Ve.x+(Ye.x0+Ye.x1)/2*se.width,it=Ve.y+q.y*se.height,ot=g&&g[$e]||0;$.glowT=Math.max(ot*.6,K?.1*N:0),$.ink+=(Math.max(ot,$.glow*.8)-$.ink)*(1-Math.exp(-_*8)),$.color=ut,Rs($,Pe,it-q.s*.6),$.step(_,S,F,Ue),$.dance&&fe&&fe.dolls.includes($)&&(dt=dt||{x:0,y:1e9,n:0},dt.x+=Pe,dt.n++,dt.y=Math.min(dt.y,it-q.s*1.05)),ts.push({x0:Ye.x0,y0:Ye.y0,x1:Ye.x1,y1:Ye.y1,black:!!Ye.cut,lit:Math.max(ot,$.glow*.6)}),Rt([0,0,0,0],[$.spot,$.rise-1,we?1:0,$.p.spin],{x:Pe+$.p.travel*q.s/2.2,y:it,s:q.s},$,$.mouth,ut,we?.6:1)})}}H&&(dt&&dt.n?(H.style.transform=`translate(${(dt.x/dt.n).toFixed(1)}px, ${(dt.y-22).toFixed(1)}px) translate(-50%, -100%)`,H.classList.add("show")):H.classList.remove("show")),r.draw({time:S/1e3,flicker:je,watch:T,beat:N,calm:F,pad:Ve,stage:!e.gpu,keys:ts,accent:B.accent,dolls:Xe,data:A}),r.errors.length&&!ge.reported&&(ge.reported=!0,console.warn("MOTIF Halloween:",r.errors.join(`
`)));let kt=a();kt&&(kt.stage=[1,(F?S*.25:S)/1e3,T,N],kt.scene&&kt.scene.glass&&(i.ui.view==="pattern"||i.ui.view==="tweaks")&&kt.keepAwake()),Lt()}let Lt=()=>{l&&!n&&document.visibilityState==="visible"&&!ge.held&&(n=requestAnimationFrame(ni))},Gs=()=>{Se=0,C=performance.now()+3e3,Lt()},ge={get on(){return l},get stage(){return l&&!e.gpu},get ok(){return!!(r&&r.ok)},get errors(){return r?r.errors:[]},get ema(){return re},get scale(){return oe},get dolls(){return f},dance(S,_=2){if(!l||!f.length)return;let F=performance.now();Ie(f.slice(0,_),S||Ya(),Math.ceil(It(F)))},set(S){if(S!==l){if(l=S,l)r=new Na(t),r.ok||console.warn("MOTIF Halloween: WebGL 2 indisponible",r.errors),Q(),c=!0,m="",d=new MutationObserver(()=>{c=!0}),d.observe(t,{childList:!0,subtree:!0}),document.addEventListener("pointerdown",Us,!0),document.addEventListener("pointermove",js,!0),document.addEventListener("pointerup",ls,!0),document.addEventListener("pointercancel",ls,!0),document.addEventListener("visibilitychange",Gs),x=performance.now(),Se=0,j=performance.now()+9e3,C=performance.now()+3e3,G=performance.now()+2e4,Lt();else{n&&cancelAnimationFrame(n),n=0,d&&d.disconnect(),d=null,document.removeEventListener("pointerdown",Us,!0),document.removeEventListener("pointermove",js,!0),document.removeEventListener("pointerup",ls,!0),document.removeEventListener("pointercancel",ls,!0),document.removeEventListener("visibilitychange",Gs),r&&r.destroy(),r=null,H&&(H.remove(),H=null),h=[],p.clear(),f=[],m="",R.clear(),I.clear();let _=a();_&&(_.stage=null,_.wake())}e.draw()}},refresh(){l&&(Q(),c=!0,m="",He=null)},press:Ht,note:Ms,keyLights(S){g=S},level(S){if(!l||!S)return;let _=K;if(K=!!S.playing,K!==_){for(let F of f)F.dance=null;ae=-1}if(S.playing&&S.tick>=0){Z={tick:S.tick,at:performance.now(),msPerTick:6e4/((i.project.tempo||120)*96)},S.abs>=0&&((K!==_||ge.abs0===void 0)&&(ge.abs0=S.abs-S.tick),Z.tick=S.abs-ge.abs0);let F=Math.floor(S.tick/96);if(F!==ie){ie=F,N=1;let D=S.tick%384<96;for(let V of f)V.dance||(V.sqv-=D?1.6:.8);for(let V of h)V.doll&&V.tag==="play"&&(V.doll.sqv-=D?2.2:1.2)}}if(S.m&&(P={d:S.m.d,bass:S.m.bass,lead:S.m.lead,drum:S.m.drum}),S.trig){for(let F=0;F<S.trig.length;F+=4)if(S.trig[F]===0&&S.trig[F+1]===0){for(let D of h)D.doll&&(D.doll.sqv-=1,D.doll.hvy+=.4);break}}},gasp(){if(l){for(let S of h)S.doll&&S.doll.startle(.9);for(let S of f)S.startle(.9)}}};return ge.goAway=S=>{ge.away=S,S||f.forEach((_,F)=>{if(_.swapTo!==null){let D=new Yt(_.swapTo,de());D.rise=0,D.inT=0,He&&(He[F]=_.swapTo),f[F]=D}else _.rise<.05&&(_.rise=0,_.inT=0,_.landed=!1)}),S&&H&&H.classList.remove("show")},ge.light=(S,_)=>{ge.every=_,ge.skip=0,S?(ge.saved===void 0&&(ge.saved=oe),oe=Math.min(oe,S)):ge.saved!==void 0&&(oe=Math.min(ge.saved,ue()),ge.saved=void 0,le=0,re=16,Se=0,C=performance.now()+3e3),ge.cap=S},ge.hold=S=>{if(ge.held=S,S){n&&cancelAnimationFrame(n),n=0;return}for(let _ of f)_.sqv=0,_.hvy=0;for(let _ of h)_.doll&&(_.doll.sqv=0,_.doll.hvy=0);Se=0,C=performance.now()+3e3,Lt()},e.ghouls=ge,ge}var xl="// the light of the scene on a surface",Lr="void main() {",kl="  vec4 col = vec4(0.0);";function Rr(i=za){let e=i.indexOf(xl),t=i.lastIndexOf(Lr),s=i.indexOf(kl,t);return e<0||t<e||s<0?null:{head:i.slice(0,e),pose:i.slice(t+Lr.length,s)}}var Ui=`
float h1(float n) { return fract(sin(n) * 43758.5453); }
float h2(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float n2(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h2(i), h2(i + vec2(1, 0)), u.x), mix(h2(i + vec2(0, 1)), h2(i + vec2(1, 1)), u.x), u.y);
}
float fbm2(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * n2(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }
// a ray against an axis-aligned box: (t in, t out); no hit when x > y
vec2 boxT(vec3 ro, vec3 rd, vec3 lo, vec3 hi) {
  vec3 r = vec3(abs(rd.x) < 1e-6 ? 1e-6 : rd.x, abs(rd.y) < 1e-6 ? 1e-6 : rd.y, abs(rd.z) < 1e-6 ? 1e-6 : rd.z);
  vec3 a = (lo - ro) / r, b = (hi - ro) / r;
  vec3 mn = min(a, b), mx = max(a, b);
  return vec2(max(max(mn.x, mn.y), mn.z), min(min(mx.x, mx.y), mx.z));
}
`,ji=`
uniform vec4 uSpotPos[4];   // the moving heads: position (m), power
uniform vec4 uSpotDir[4];   // where each one points, cos of its half angle
uniform vec3 uSpotCol[4];   // colour
uniform vec3 uMoonDir;      // towards the moon
uniform vec3 uFoot;         // footlights at the stage's edge (colour \xD7 level)
uniform vec3 uScreenCol;    // the big screen's glow
uniform float uFlash;       // a flash of the whole stage (kick, strobe)
uniform float uBeat;        // 0..1, a pulse on each beat
// how much of spot i reaches a world point (cone, soft edge, distance)
float spotAt(int i, vec3 P, out vec3 L) {
  vec3 d = uSpotPos[i].xyz - P;
  float l = length(d); L = d / l;
  float c = dot(-L, uSpotDir[i].xyz), cw = uSpotDir[i].w;
  return smoothstep(cw, cw + (1.0 - cw) * 0.35, c) * uSpotPos[i].w * 120.0 / (60.0 + l * l);
}
`,Gi=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,Ar=`#version 300 es
precision highp float;
uniform vec2 uRes;
uniform mat4 uInvVP;
uniform vec3 uEye;
uniform vec4 uScreen;       // the big screen: half width, bottom, top, z
uniform vec4 uDolls[7];     // the dancers' feet (m) and size (m per unit), for their shadows
uniform float uNDolls;
uniform vec3 uRiserCol;     // the riser's strip (the drum's colour \xD7 its level)
uniform float uStrobe;      // the strobe lamps on the screen's frame
uniform float uFade;        // 0..1: the night appears around the app as it moves away
uniform float uTime;
${ji}
out vec4 o;
${Ui}
const float DECK_X = 5.6, DECK_Z0 = -7.2, DECK_Z1 = 1.0, GROUND = -1.5;
const vec3 RISER_LO = vec3(-3.4, 0.0, -5.0), RISER_HI = vec3(3.4, 0.95, -3.2);

vec3 sky(vec3 rd) {
  float el = rd.y, az = atan(rd.x, -rd.z);
  vec3 c = mix(vec3(0.16, 0.06, 0.22), vec3(0.015, 0.01, 0.04), smoothstep(-0.05, 0.55, el));
  c += vec3(0.5, 0.18, 0.32) * exp(-max(el, 0.0) * 9.0) * 0.35;                // glow of the stage on the haze
  // stars
  vec2 sp = vec2(az * 60.0, el * 60.0);
  float st = step(0.985, h2(floor(sp))) * smoothstep(0.05, 0.25, el);
  vec2 sf = fract(sp) - 0.5;
  c += vec3(0.9, 0.9, 1.0) * st * exp(-dot(sf, sf) * 30.0) * (0.6 + 0.4 * sin(uTime * 2.0 + h2(floor(sp)) * 40.0));
  // the moon, its halo and craters
  float m = dot(rd, uMoonDir);
  float md = acos(clamp(m, -1.0, 1.0));
  vec3 moon = vec3(0.95, 0.92, 0.82) * (0.85 + 0.15 * n2(rd.xy * 90.0)) * (1.0 - 0.35 * smoothstep(0.4, 1.0, n2(rd.xz * 40.0 + 3.0)));
  c = mix(c, moon, smoothstep(0.042, 0.038, md));
  c += vec3(0.5, 0.45, 0.6) * exp(-md * 7.0) * 0.35;
  // clouds drifting over it
  float cl = fbm2(vec2(az * 2.5 + uTime * 0.012, el * 7.0));
  float cover = smoothstep(0.52, 0.8, cl) * smoothstep(0.02, 0.2, el) * smoothstep(0.7, 0.35, el);
  c = mix(c, vec3(0.08, 0.05, 0.12) + vec3(0.3, 0.28, 0.36) * exp(-md * 4.0), cover * 0.85);
  // the far hills, a graveyard and dead trees against the sky
  float hill = 0.035 + 0.025 * sin(az * 3.0 + 1.0) + 0.012 * sin(az * 11.0) + 0.006 * n2(vec2(az * 40.0, 0.0));
  float crs = 0.0;
  float cell = floor(az * 26.0), fx = fract(az * 26.0) - 0.5;
  if (h1(cell) > 0.55) {
    float hh = hill + 0.012 + 0.01 * h1(cell + 3.0);
    crs = step(abs(fx), 0.05) * step(el, hh) + step(abs(fx), 0.16) * step(abs(el - hh + 0.006), 0.003);
  }
  float tree = 0.0;
  float tc = floor(az * 7.0), tx = fract(az * 7.0) - 0.5;
  if (h1(tc + 9.0) > 0.6) {
    float th = hill + 0.05 + 0.03 * h1(tc);
    tree = step(abs(tx + 0.02 * (el - hill) * 30.0), 0.012) * step(el, th);
    float br = abs(tx - (el - hill - 0.025) * 3.0 * sign(h1(tc + 1.0) - 0.5));
    tree = max(tree, step(br, 0.01) * step(hill + 0.02, el) * step(el, th - 0.005));
  }
  float sil = max(step(el, hill), max(crs, tree));
  c = mix(c, vec3(0.025, 0.012, 0.04), sil);
  // bats, now and then
  for (int i = 0; i < 3; i++) {
    float fi = float(i), ph = fract(uTime * (0.045 + 0.012 * fi) + fi * 0.37);
    vec2 bp = vec2((ph - 0.5) * 2.2, 0.32 + 0.12 * fi + 0.04 * sin(ph * 30.0));
    vec2 q = (vec2(az, el) - bp) * vec2(28.0, 34.0);
    float flap = sin(uTime * 14.0 + fi * 2.0);
    q.x = abs(q.x);
    float wing = step(abs(q.y - 0.35 * q.x * flap), 0.12 * (1.0 - q.x)) * step(q.x, 1.0);
    c = mix(c, vec3(0.02), max(wing, step(length(q * vec2(1.6, 1.0)), 0.16)) * 0.9);
  }
  return c;
}

// the light falling on a surface of the stage (pools of the spots, the footlights, the flash, the screen)
vec3 lightOn(vec3 P, vec3 n) {
  vec3 l = vec3(0.025, 0.02, 0.04);
  for (int i = 0; i < 4; i++) {
    vec3 L; float k = spotAt(i, P, L);
    l += uSpotCol[i] * k * max(dot(n, L), 0.0) * 2.6;
  }
  l += vec3(0.35, 0.38, 0.5) * max(dot(n, uMoonDir), 0.0) * 0.2;
  // the footlights wash the front of the stage, the screen lights what is near it
  l += uFoot * exp(-max(DECK_Z1 - P.z, 0.0) * 0.9) * (0.5 + 0.5 * n.y) * smoothstep(-1.3, 0.1, P.y) * step(P.z, DECK_Z1 + 0.05);
  l += uScreenCol * 0.5 * exp(-abs(P.z - uScreen.w) * 0.6) * smoothstep(2.0 * uScreen.x + 1.5, 0.0, abs(P.x));
  l += vec3(1.0, 0.85, 0.7) * uFlash * 0.6 * exp(-length(P.xz - vec2(0.0, -1.5)) * 0.35);
  return l;
}
// the dancers' shadows on the floor (soft, under their feet; longer away from the spots)
float shadows(vec3 P) {
  float s = 1.0;
  for (int i = 0; i < 7; i++) {
    if (float(i) >= uNDolls) break;
    vec4 d = uDolls[i];
    vec2 q = (P.xz - d.xz) / (d.w * vec2(0.85, 0.55));
    float near = step(abs(P.y - d.y), 0.08);
    s *= 1.0 - 0.6 * near * exp(-dot(q, q) * 1.6);
  }
  return s;
}

void main() {
  vec2 ndc = gl_FragCoord.xy / uRes * 2.0 - 1.0;
  vec4 f = uInvVP * vec4(ndc, 1.0, 1.0);
  vec3 rd = normalize(f.xyz / f.w - uEye), ro = uEye;
  vec3 col = sky(rd);
  float tHit = 1e5;
  vec3 P, n, base = vec3(0.0);
  int what = 0;     // 1 field, 2 deck top, 3 deck front, 4 riser, 5 screen frame / back wall
  // the field
  if (rd.y < 0.0) { float t = (GROUND - ro.y) / rd.y; if (t > 0.0 && t < tHit) { tHit = t; what = 1; } }
  // the deck
  vec2 b = boxT(ro, rd, vec3(-DECK_X, GROUND, DECK_Z0), vec3(DECK_X, 0.0, DECK_Z1));
  if (b.x < b.y && b.x > 0.0 && b.x < tHit) { tHit = b.x; vec3 p = ro + rd * b.x; what = p.y > -0.01 ? 2 : 3; }
  b = boxT(ro, rd, RISER_LO, RISER_HI);
  if (b.x < b.y && b.x > 0.0 && b.x < tHit) { tHit = b.x; what = 4; }
  // the back wall: the frame of the big screen and the dark scaffolding round it
  float sw = uScreen.x, sb = uScreen.y, stp = uScreen.z, sz = uScreen.w;
  b = boxT(ro, rd, vec3(-(sw + 1.1), 0.0, sz - 0.5), vec3(sw + 1.1, stp + 0.75, sz - 0.02));
  if (b.x < b.y && b.x > 0.0 && b.x < tHit) { tHit = b.x; what = 5; }
  // two lattice towers carrying the lights, and the truss between them, high up
  for (int k = 0; k < 2; k++) {
    float tx = k == 0 ? -4.9 : 4.9;
    b = boxT(ro, rd, vec3(tx - 0.22, GROUND, sz + 0.3), vec3(tx + 0.22, 10.5, sz + 0.66));
    if (b.x < b.y && b.x > 0.0 && b.x < tHit) { tHit = b.x; what = 6; }
  }
  b = boxT(ro, rd, vec3(-5.2, 10.1, sz + 0.3), vec3(5.2, 10.5, sz + 0.66));
  if (b.x < b.y && b.x > 0.0 && b.x < tHit) { tHit = b.x; what = 6; }
  if (what > 0) {
    P = ro + rd * tHit;
    vec3 emit = vec3(0.0);
    if (what == 1) {
      n = vec3(0.0, 1.0, 0.0);
      float g = n2(P.xz * 3.0) * 0.5 + n2(P.xz * 11.0) * 0.5;
      base = mix(vec3(0.03, 0.04, 0.025), vec3(0.06, 0.07, 0.04), g);
      // a few pumpkins glowing along the stage's front
      vec2 pc = vec2(fract(P.x / 1.6 + 0.5) - 0.5, P.z - DECK_Z1 - 0.45);
      float pk = smoothstep(0.2, 0.1, length(pc * vec2(1.6, 2.2)));
      emit += vec3(1.0, 0.45, 0.08) * pk * (0.5 + 0.2 * sin(uTime * 7.0 + floor(P.x / 1.6)));
    } else if (what == 2) {
      n = vec3(0.0, 1.0, 0.0);
      float plank = fract(P.x * 2.2), seam = smoothstep(0.03, 0.0, min(plank, 1.0 - plank));
      float grain = n2(vec2(P.x * 2.2, P.z * 0.6) * vec2(1.0, 8.0));
      base = mix(vec3(0.07, 0.045, 0.035), vec3(0.11, 0.07, 0.05), grain) * (1.0 - 0.5 * seam);
    } else if (what == 3) {
      n = vec3(0.0, 0.0, 1.0);
      base = vec3(0.03, 0.02, 0.035);
      // the footlights: a row of little lamps along the front
      float lamp = smoothstep(0.08, 0.02, length(vec2(fract(P.x * 1.25) - 0.5, (P.y + 0.12) * 1.25)));
      emit += (uFoot * 3.0 + vec3(0.15, 0.08, 0.03)) * lamp;
    } else if (what == 4) {
      n = abs(P.y - RISER_HI.y) < 0.01 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0);
      base = n.y > 0.5 ? vec3(0.06, 0.04, 0.05) : vec3(0.025, 0.018, 0.03);
      // a strip of light along the riser's front, in the drum's colour
      if (n.z > 0.5) emit += uRiserCol * smoothstep(0.05, 0.0, abs(P.y - RISER_HI.y + 0.12)) * 2.5;
    } else if (what == 6) {
      // truss: a lattice of tubes catching the light
      vec3 a = abs(fract(P * 1.8) - 0.5);
      float tube = smoothstep(0.42, 0.5, max(a.x, a.y)) + smoothstep(0.42, 0.5, max(a.y, a.z)) * 0.6;
      n = normalize(vec3(sign(P.x) * 0.3, 0.2, 1.0));
      base = vec3(0.04, 0.035, 0.05) + vec3(0.18, 0.17, 0.2) * clamp(tube, 0.0, 1.0);
    } else {
      n = vec3(0.0, 0.0, 1.0);
      vec2 q = vec2(abs(P.x), P.y);
      // the frame round the screen (the app sits exactly in its hole), with a row of strobe lamps on top
      float inFrame = step(q.x, sw + 0.22) * step(sb - 0.22, P.y) * step(P.y, stp + 0.32);
      base = mix(vec3(0.02, 0.016, 0.03), vec3(0.05, 0.045, 0.06), inFrame);
      float bolts = smoothstep(0.035, 0.02, length(vec2(fract(P.x * 2.0) - 0.5, (P.y - stp - 0.17) * 2.0))) * inFrame;
      emit += mix(vec3(0.1, 0.08, 0.12), vec3(1.4, 1.35, 1.5), uStrobe) * bolts * (0.3 + 2.5 * uStrobe);
      // scaffolding: a lattice of pipes
      float lat = smoothstep(0.03, 0.0, min(abs(fract(P.x * 0.7 + P.y * 0.7) - 0.5), abs(fract(P.x * 0.7 - P.y * 0.7) - 0.5)));
      base += vec3(0.05, 0.04, 0.06) * lat * (1.0 - inFrame);
      // the screen's glow spilling on its frame
      emit += uScreenCol * 0.12 * inFrame;
    }
    vec3 lit = base * lightOn(P, n) * 3.0;
    if (what == 2 || what == 4) lit *= shadows(P);
    lit += emit;
    // a sheen on the deck: the moon mirrored on the boards
    if (what == 2) { float sh = pow(max(dot(reflect(rd, n), uMoonDir), 0.0), 30.0); lit += vec3(0.4, 0.4, 0.55) * sh * 0.25; }
    // haze: far away things sink into the night
    float fog = 1.0 - exp(-tHit * 0.035);
    col = mix(lit, vec3(0.06, 0.03, 0.08), fog * 0.6);
  }
  col += vec3(0.25, 0.1, 0.3) * uBeat * 0.03;
  o = vec4(col * uFade, 1.0);
}`,Er=`#version 300 es
in vec2 aCorner;
in vec4 iRect;    // here: the feet (world, m) and the size (m per doll unit)
in vec4 iPlate;   // dance spotlight (long legs), -, -, spin
in vec4 iDoll;    // -, -, 1, type
in vec4 iAnimA; in vec4 iAnimB; in vec4 iAnimC; in vec4 iColor;
in vec4 iPoseA; in vec4 iPoseB; in vec4 iPoseC; in vec4 iPoseD;
uniform mat4 uVP;
out vec2 vPos;
flat out vec4 vRect, vPlate, vDoll, vA, vB, vC, vCol, vPA, vPB, vPC, vPD;
void main() {
  // the doll's box (its own units: x, z within \xB11.5, from under its feet to over its raised hands) on screen
  vec2 lo = vec2(1e9), hi = vec2(-1e9);
  for (int i = 0; i < 8; i++) {
    vec3 c = vec3((i & 1) == 0 ? -1.3 : 1.3, (i & 2) == 0 ? -1.16 : 2.2, (i & 4) == 0 ? -1.3 : 1.3);
    vec4 p = uVP * vec4(iRect.xyz + (c + vec3(0.0, 1.1, 0.0)) * iRect.w, 1.0);
    vec2 n = p.xy / max(p.w, 0.05);
    lo = min(lo, n); hi = max(hi, n);
  }
  vec2 ndc = mix(lo, hi, aCorner);
  vPos = ndc;
  vRect = iRect; vPlate = iPlate; vDoll = iDoll; vA = iAnimA; vB = iAnimB; vC = iAnimC; vCol = iColor; vPA = iPoseA; vPB = iPoseB; vPC = iPoseC; vPD = iPoseD;
  gl_Position = vec4(ndc, 0.0, 1.0);
}`;function _r(i){return`${i.head}
uniform mat4 uInvVP;
uniform vec3 uEye;
uniform float uPix;         // the size of a pixel (radians)
uniform int uSteps;
${ji}
${Ui}

// the stage's light on a dancer (p: the doll's own units, P: the same point in the world)
vec3 shadeShow(vec3 p, vec3 P, vec3 n, vec3 V, vec3 base, float spec, float emit, float sss) {
  float ao = clamp(0.45 + 0.55 * sceneMap(p + n * 0.12).x / 0.12, 0.25, 1.0);
  vec3 lit = base * vec3(0.05, 0.045, 0.06) * ao;
  float dm = max(dot(n, uMoonDir), 0.0), wm = max(dot(n, uMoonDir) * (1.0 - sss) + sss, 0.0);
  lit += base * vec3(0.5, 0.55, 0.8) * mix(dm, wm, sss) * 0.35;
  // the front-of-house wash: a warm white from the audience, so that each character keeps its colours
  vec3 Lw = normalize(vec3(0.15, 0.4, 0.9));
  float dw = max(dot(n, Lw) * (1.0 - sss) + sss * 0.6, 0.0);
  lit += base * vec3(1.0, 0.92, 0.84) * dw * 0.55 * ao + spec * vec3(1.0, 0.95, 0.9) * pow(max(dot(n, normalize(Lw + V)), 0.0), 50.0) * 0.4;
  for (int i = 0; i < 4; i++) {
    vec3 L; float k = spotAt(i, P, L);
    if (k <= 0.001) continue;
    float df = max(dot(n, L) * (1.0 - sss) + sss * 0.5, 0.0);
    vec3 hv = normalize(L + V);
    lit += uSpotCol[i] * k * (base * df * 0.95 + spec * pow(max(dot(n, hv), 0.0), 40.0) * 0.8);
  }
  // the footlights, from the stage's edge below
  lit += base * uFoot * max(dot(n, normalize(vec3(0.0, -0.35, 0.94))), 0.0) * ao * 0.9;
  // from behind: the screen's glow and the stage's back light, round the silhouette
  float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0);
  lit += (uScreenCol * 0.7 + vec3(0.3, 0.2, 0.5) * 0.25) * fres * ao;
  lit += vCol.rgb * (GLOW + INK) * (0.25 + 0.6 * fres);
  lit += base * emit;
  lit += base * vec3(1.0, 0.9, 0.8) * uFlash * 0.6;
  return lit;
}

void main() {
${i.pose}
  vec4 f = uInvVP * vec4(vPos, 1.0, 1.0);
  vec3 rdW = normalize(f.xyz / f.w - uEye);
  float s = vRect.w;
  vec3 ro = (uEye - vRect.xyz) / s - vec3(0.0, 1.1, 0.0), rd = rdW;
  vec2 tb = boxT(ro, rd, vec3(-1.3, -1.13, -1.3), vec3(1.3, 2.2, 1.3));
  if (tb.x >= tb.y || tb.y < 0.0) discard;
  float t = max(tb.x, 0.0), dmin = 1e5, tmin = t;
  vec2 h = vec2(1e5, 0.0);
  for (int i = 0; i < 48; i++) {
    if (i >= uSteps) break;
    vec3 p = ro + rd * t;
    h = sceneMap(p);
    if (h.x < dmin) { dmin = h.x; tmin = t; }
    if (h.x < max(0.0015, t * uPix * 0.3) || t > tb.y) break;
    t += h.x;
  }
  float px = tmin * uPix;
  float cover = h.x < max(0.0015, t * uPix * 0.3) && t <= tb.y ? 1.0 : smoothstep(px * 1.2, 0.0, dmin);
  if (cover <= 0.0) discard;
  if (h.x >= max(0.0015, t * uPix * 0.3) || t > tb.y) { t = tmin; }
  vec3 p = ro + rd * t;
  h = sceneMap(p);
  vec3 hq = gHQ, bq = gBQ;
  float band = gBAND;
  vec3 n = normalAt(p);
  gBQ = bq; gBAND = band;
  float spec, emit, sss, alpha;
  vec3 base = baseColor(h.y, p, hq, spec, emit, sss, alpha);
  vec3 P = vRect.xyz + (p + vec3(0.0, 1.1, 0.0)) * s;
  vec3 lit = shadeShow(p, P, n, -rd, base, spec, emit, sss);
  if (h.y == M_STEAM) alpha *= pow(max(dot(n, -rd), 0.0), 1.5);
  else if (alpha < 1.0) { float fr = pow(1.0 - max(dot(n, -rd), 0.0), 2.0); alpha = alpha + (1.0 - alpha) * fr; }
  lit = lit / (1.0 + 0.3 * max(lit.r, max(lit.g, lit.b)));     // (bright spots roll off instead of burning white)
  float a = cover * alpha;
  o = vec4(lit * a, a);
}`}var Dr=`#version 300 es
precision highp float;
uniform vec2 uRes;
uniform mat4 uInvVP;
uniform vec3 uEye;
uniform float uHaze;        // how thick the haze is (the light it catches)
uniform float uSparkle;     // the charleston's sparkles in the beams
uniform float uWhite;       // a flash of the whole picture (the start of the show; a few a second at most)
uniform float uCrowd;       // 0..1: the crowd is there
uniform float uJump;        // the crowd's jump (on the kick)
uniform float uBeams;       // 1: the beams and the haze; 0: the crowd and the flash (two passes, the front row between)
uniform float uPix;         // the size of a pixel (radians): soft edges for the crowd
uniform float uFade;        // 0..1: the beams appear with the night as the app moves away
uniform float uTime;
${ji}
out vec4 o;
${Ui}
// a beam: the light gathered along the view ray where it crosses spot i's cone (closest approach of the
// ray to the cone's axis, the cone's width there, a fall-off with distance), until the floor
vec3 beam(int i, vec3 ro, vec3 rd, float tMax) {
  vec3 A = uSpotPos[i].xyz, D = uSpotDir[i].xyz;
  vec3 w0 = ro - A;
  float b = dot(rd, D), d = dot(rd, w0), e = dot(D, w0);
  float den = max(1.0 - b * b, 1e-4);
  float t = (b * e - d) / den, s = (e - b * d) / den;      // along the ray, along the axis
  t = clamp(t, 0.0, tMax);
  vec3 P = ro + rd * t;
  s = dot(P - A, D);
  if (s <= 0.0) return vec3(0.0);
  float sFloor = D.y < -0.01 ? (A.y - 0.0) / -D.y : 40.0;
  float r = length(P - A - D * s);
  float tanA = sqrt(max(1.0 - uSpotDir[i].w * uSpotDir[i].w, 0.0)) / uSpotDir[i].w;
  float R = s * tanA + 0.05;
  float k = smoothstep(R, R * 0.15, r) * smoothstep(sFloor + 0.3, sFloor - 0.6, s) * exp(-s * 0.06);
  // brighter where the ray looks along the beam; motes of dust turning in it
  float along = 1.0 + 1.5 * pow(abs(b), 6.0);
  float dust = 0.75 + 0.5 * n2(vec2(s * 3.0 - uTime * 0.6, r * 9.0 + float(i) * 7.0));
  float spark = step(0.993, h2(floor(vec2(s * 10.0, r * 30.0) + floor(uTime * 12.0)))) * uSparkle * smoothstep(R * 0.6, 0.0, r);
  return uSpotCol[i] * uSpotPos[i].w * (k * along * dust * 0.2 * uHaze + spark * 0.35);
}
// the crowd: rows of people, one row per plane in front of the stage (the nearest row first: it hides the
// ones behind); dark against the light with a rim of the stage's light; some raise their arms, some hold up
// a phone; they jump on the kick
float seg2(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }
vec4 crowd(vec3 ro, vec3 rd) {
  vec4 acc = vec4(0.0);                    // (the soft edges composed front to back: a row seen through another's edge)
  for (int k = 0; k < 7; k++) {
    float z = 5.9 - float(k) * 0.62;
    float t = (z - ro.z) / rd.z;
    if (t <= 0.0) continue;
    vec3 P = ro + rd * t;
    float cw = 0.52, off = float(k) * 0.37 + 0.5 * mod(float(k), 2.0);
    float cx = floor(P.x / cw + off), fx = fract(P.x / cw + off) - 0.5;
    float hs = h1(cx * 7.1 + float(k) * 13.0), hs2 = h1(cx * 3.3 + float(k) * 5.0), hs3 = h1(cx * 1.7 + float(k) * 2.0);
    if (h1(cx * 5.3 + float(k) * 3.1) < 0.1) continue;      // (a gap here and there)
    float sz = 0.84 + 0.3 * hs3;
    float jump = uJump * (0.1 + 0.1 * hs) * step(0.4, hs2);
    float base = -1.5 + 1.34 * sz + jump;                  // shoulders
    float lean = (hs - 0.5) * 2.0 * max(0.0, 0.25 - 0.2 * sz);   // (off-centre, but never out of its cell)
    vec2 q = vec2(fx * cw + lean, P.y - base) / sz;
    float head = length((q - vec2(0.0, 0.2)) * vec2(1.0, 0.86)) - 0.095;
    vec2 bq = q - vec2(0.0, -0.4);
    float body = length(max(abs(bq) - vec2(0.13, 0.36), 0.0)) - 0.07;
    float d = min(head, body);
    float w = t * uPix / sz;               // (a pixel, in the row's own units: the edges are smoothed over it)
    // arms up: shoulder, elbow, hand; one or both, swaying with the music
    if (hs2 > 0.45) {
      float sw = 0.06 * sin(uTime * 3.0 + hs * 20.0) + 0.05 * uBeat;
      for (int a = 0; a < 2; a++) {
        float sd = a == 0 ? 1.0 : -1.0;
        if (a == 1 && hs2 < 0.8) break;
        vec2 s0 = vec2(0.15 * sd, 0.0), e0 = vec2((0.25 + 0.04 * hs) * sd, 0.27 + 0.05 * hs), w0 = vec2((0.19 + sw) * sd, 0.55 + 0.06 * hs);
        d = min(d, min(seg2(q, s0, e0), seg2(q, e0, w0)) - 0.034);
        d = min(d, length(q - w0 - vec2(0.0, 0.03)) - 0.042);
      }
    }
    if (d < w * 0.5 && P.y > -1.5) {
      float cover = clamp(0.5 - d / w, 0.0, 1.0);
      // (a rim of light along the tops: heads, shoulders, raised arms; the stage is ahead of them)
      float rim = smoothstep(-0.03 - w, 0.0, d) * smoothstep(-0.1, 0.35, q.y);
      float far = 1.0 - float(k) * 0.09;
      vec3 c = vec3(0.008, 0.006, 0.013) + ((uSpotCol[0] + uSpotCol[1] + uSpotCol[2] + uSpotCol[3]) * 0.045 + uScreenCol * 0.18 + uFoot * 0.25) * rim * far;
      // a phone held up now and then, its screen a small cold glow
      if (hs3 > 0.94 && hs2 > 0.45) { vec2 ph = (q - vec2(0.2, 0.66)) / vec2(0.028, 0.045); c += vec3(0.35, 0.45, 0.8) * exp(-dot(ph, ph) * 1.5) * 0.9; }
      float a = cover * (1.0 - acc.a);
      acc.rgb += c * a; acc.a += a;
      if (acc.a > 0.995) break;
    }
  }
  return acc.a > 0.0 ? vec4(acc.rgb / acc.a, acc.a) : vec4(0.0);
}
void main() {
  vec2 ndc = gl_FragCoord.xy / uRes * 2.0 - 1.0;
  vec4 f = uInvVP * vec4(ndc, 1.0, 1.0);
  vec3 rd = normalize(f.xyz / f.w - uEye), ro = uEye;
  float tMax = rd.y < 0.0 ? (0.0 - ro.y) / rd.y : 80.0;
  vec3 c = vec3(0.0);
  if (uBeams > 0.5) {
    for (int i = 0; i < 4; i++) c += beam(i, ro, rd, tMax);
    // a light haze over everything, lit by the stage
    c += (uSpotCol[0] + uSpotCol[1] + uSpotCol[2] + uSpotCol[3]) * 0.004 * uHaze;
    c *= uFade;
  }
  vec4 cr = uCrowd > 0.0 ? crowd(ro, rd) : vec4(0.0);
  float a = cr.a * uCrowd;
  vec3 rgb = c * (1.0 - a) + cr.rgb * a;
  rgb += vec3(1.0, 0.97, 0.92) * uWhite;
  // (added light: its alpha stays low so the app under it is lit, not hidden)
  float al = clamp(max(a, uWhite + 0.25 * max(max(rgb.r, rgb.g), rgb.b)), 0.0, 1.0);
  o = vec4(rgb, al);
}`;var ca=11,la=ca*4,Pr=12;function qr(i,e,t,s){let a=i.createShader(e);return i.shaderSource(a,t),i.compileShader(a),a}function Wi(i,e,t,s){let a=i.createProgram(),o=qr(i,i.VERTEX_SHADER,e),r=qr(i,i.FRAGMENT_SHADER,t);return i.attachShader(a,o),i.attachShader(a,r),(s||[]).forEach((n,l)=>i.bindAttribLocation(a,l,n)),i.linkProgram(a),{p:a,v:o,f:r}}function Vi(i,e,t){let{p:s,v:a,f:o}=e;if(!i.getProgramParameter(s,i.LINK_STATUS)){for(let l of[a,o])i.getShaderParameter(l,i.COMPILE_STATUS)||t.push(i.getShaderInfoLog(l)||"shader");return t.push(i.getProgramInfoLog(s)||"link"),null}let r={},n=i.getProgramParameter(s,i.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let d=i.getActiveUniform(s,l);r[d.name.replace(/\[0\]$/,"")]=i.getUniformLocation(s,d.name)}return{p:s,u:r}}function Cr(i){let e=document.createElement("canvas");return e.className=i,e.setAttribute("aria-hidden","true"),e}var ha=class{constructor(){this.errors=[],this.back=Cr("show-back"),this.front=Cr("show-front"),this.lostB=this.lostF=!1,this.stale=!1;for(let[e,t]of[[this.back,"lostB"],[this.front,"lostF"]])e.addEventListener("webglcontextlost",s=>{s.preventDefault(),this[t]=!0,this.ready=!1}),e.addEventListener("webglcontextrestored",()=>{this[t]=!1,this.stale=!0});this.data=new Float32Array(Pr*la),this.ready=!1,this.start()}start(){let e={premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1};if(this.gb=this.back.getContext("webgl2",{...e,alpha:!1}),this.gf=this.front.getContext("webgl2",{...e,alpha:!0}),this.ok=!!(this.gb&&this.gf),this.ready=!1,!this.ok){this.errors.push("WebGL 2 indisponible");return}let t=Rr();if(!t){this.ok=!1,this.errors.push("morceaux du shader des poup\xE9es introuvables");return}this.parallel=!!this.gf.getExtension("KHR_parallel_shader_compile"),this.gb.getExtension("KHR_parallel_shader_compile"),this.t0=performance.now(),this.pStage=Wi(this.gb,Gi,Ar,["aPos"]),this.pBeams=Wi(this.gf,Gi,Dr,["aPos"]),this.pDolls=Wi(this.gf,Er,_r(t),["aCorner","iRect","iPlate","iDoll","iAnimA","iAnimB","iAnimC","iColor","iPoseA","iPoseB","iPoseC","iPoseD"])}get lost(){return this.lostB||this.lostF}compiled(){if(this.stale){if(this.lost)return!1;this.stale=!1,this.dispose(),this.start()}if(!this.ok||this.ready||!this.parallel)return!0;let e=37297;return[[this.gb,this.pStage],[this.gf,this.pBeams],[this.gf,this.pDolls]].every(([t,s])=>t.getProgramParameter(s.p,e))}finish(){if(!this.ok||this.ready)return this.ok;let e=this.gb,t=this.gf,s=this.errors,a=performance.now();if(this.stage=Vi(e,this.pStage,s),this.beams=Vi(t,this.pBeams,s),this.dolls=Vi(t,this.pDolls,s),this.compileMs=Math.round(performance.now()-a),this.readyMs=Math.round(performance.now()-this.t0),!this.stage||!this.beams||!this.dolls)return this.ok=!1,!1;let o=new Float32Array([-1,-1,3,-1,-1,3]);for(let[n,l]of[[e,"vaoB"],[t,"vaoF"]]){let d=n.createVertexArray();n.bindVertexArray(d);let c=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,c),n.bufferData(n.ARRAY_BUFFER,o,n.STATIC_DRAW),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0),this[l]=d}this.vaoD=t.createVertexArray(),t.bindVertexArray(this.vaoD);let r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),this.inst=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.inst),t.bufferData(t.ARRAY_BUFFER,this.data.byteLength,t.DYNAMIC_DRAW);for(let n=0;n<ca;n++)t.enableVertexAttribArray(1+n),t.vertexAttribPointer(1+n,4,t.FLOAT,!1,la*4,n*16),t.vertexAttribDivisor(1+n,1);return t.bindVertexArray(null),this.ready=!0,!0}dispose(){for(let[e,t]of[[this.gb,["stage","vaoB"]],[this.gf,["beams","dolls","vaoF","vaoD","inst"]]])if(e)for(let s of t){let a=this[s];a&&(a.p?e.deleteProgram(a.p):s.startsWith("vao")?e.deleteVertexArray(a):e.deleteBuffer(a),this[s]=null)}}resize(e,t,s,a){let o=(r,n)=>{let l=Math.max(1,Math.round(e*n)),d=Math.max(1,Math.round(t*n));(r.width!==l||r.height!==d)&&(r.width=l,r.height=d)};o(this.back,s),o(this.front,a)}lights(e,t,s){t.uSpotPos&&e.uniform4fv(t.uSpotPos,s.spotPos),t.uSpotDir&&e.uniform4fv(t.uSpotDir,s.spotDir),t.uSpotCol&&e.uniform3fv(t.uSpotCol,s.spotCol),t.uMoonDir&&e.uniform3fv(t.uMoonDir,s.moon),t.uFoot&&e.uniform3fv(t.uFoot,s.foot),t.uScreenCol&&e.uniform3fv(t.uScreenCol,s.screenCol),t.uFlash&&e.uniform1f(t.uFlash,s.flash),t.uBeat&&e.uniform1f(t.uBeat,s.beat),t.uTime&&e.uniform1f(t.uTime,s.time),t.uInvVP&&e.uniformMatrix4fv(t.uInvVP,!1,s.invVP),t.uEye&&e.uniform3fv(t.uEye,s.eye)}draw(e){if(!this.ok||!this.ready||this.lost)return;let t=this.gb,s=this.stage,a=s.u;t.viewport(0,0,this.back.width,this.back.height),t.useProgram(s.p),t.uniform2f(a.uRes,this.back.width,this.back.height),this.lights(t,a,e),t.uniform4fv(a.uScreen,e.screen),t.uniform4fv(a.uDolls,e.shadowDolls),t.uniform1f(a.uNDolls,e.n),t.uniform3fv(a.uRiserCol,e.riserCol),t.uniform1f(a.uStrobe,e.strobe),t.uniform1f(a.uFade,e.fade),t.bindVertexArray(this.vaoB),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null);let o=this.gf;o.viewport(0,0,this.front.width,this.front.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA);let r=Math.min(e.n,Pr),n=Math.min(e.far||0,r),l=this.dolls,d=l.u,c=this.beams,h=c.u,p=(v,g,b,x)=>{if(!(g<=0)){o.useProgram(l.p),x&&(this.lights(o,d,e),o.uniformMatrix4fv(d.uVP,!1,e.VP),o.uniform1f(d.uPix,e.pix),d.uFlicker&&o.uniform1f(d.uFlicker,.5+.5*Math.sin(e.time*11)*Math.sin(e.time*27+1.3)),d.uWatch&&o.uniform1f(d.uWatch,0),d.uCalm&&o.uniform1f(d.uCalm,0),d.uScale&&o.uniform1f(d.uScale,1),d.uMoon&&o.uniform3fv(d.uMoon,e.moon)),o.bindVertexArray(this.vaoD),o.bindBuffer(o.ARRAY_BUFFER,this.inst),x&&o.bufferSubData(o.ARRAY_BUFFER,0,e.dolls,0,r*la);for(let T=0;T<ca;T++)o.vertexAttribPointer(1+T,4,o.FLOAT,!1,la*4,v*la*4+T*16);o.uniform1i(d.uSteps,b),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,g)}},f=v=>{o.useProgram(c.p),o.uniform2f(h.uRes,this.front.width,this.front.height),this.lights(o,h,e),o.uniform1f(h.uBeams,v?1:0),o.uniform1f(h.uFade,e.fade),o.uniform1f(h.uHaze,e.haze),o.uniform1f(h.uSparkle,e.sparkle),o.uniform1f(h.uWhite,v?0:e.white),o.uniform1f(h.uCrowd,v?0:e.crowd),o.uniform1f(h.uJump,e.jump),o.uniform1f(h.uPix,e.pix),o.bindVertexArray(this.vaoF),o.drawArrays(o.TRIANGLES,0,3)},m=!1;n>0&&(p(0,n,e.farSteps||e.steps,!0),m=!0),f(!0),r-n>0&&p(n,r-n,e.steps,!m),f(!1),o.bindVertexArray(null)}time(e,t=20){if(!this.ok||!this.ready)return null;let s=new Uint8Array(4),a=()=>{this.gb.readPixels(0,0,1,1,this.gb.RGBA,this.gb.UNSIGNED_BYTE,s),this.gf.readPixels(0,0,1,1,this.gf.RGBA,this.gf.UNSIGNED_BYTE,s)},o=l=>{a();let d=[];for(let c=0;c<5;c++){let h=performance.now();for(let p=0;p<t;p++)this.draw(l);a(),d.push((performance.now()-h)/t)}return d.sort((c,h)=>c-h)[2]},r=o(e),n=o({...e,n:0});return{full:+r.toFixed(2),withoutDancers:+n.toFixed(2),dancers:+(r-n).toFixed(2),front:[this.front.width,this.front.height],back:[this.back.width,this.back.height]}}destroy(){for(let e of[this.gb,this.gf])if(e){let t=e.getExtension("WEBGL_lose_context");t&&t.loseContext()}this.back.remove(),this.front.remove(),this.ok=!1}};var Ee={deck:{x:5.6,z0:-7.2,z1:1,top:0,ground:-1.5},screen:{z:-6.4,bottom:1.85,height:5.5},riser:{z0:-5,z1:-3.2,top:.95,x:3.4},front:[[-1.38,-.35],[0,0],[1.38,-.35]],back:[[-2.3,-4],[-.78,-4.15],[.78,-4.15],[2.3,-4]],dollScale:.9,heads:[[-3.9,9.85,-5.9],[-1.35,9.95,-5.9],[1.35,9.95,-5.9],[3.9,9.85,-5.9]],speakers:[[-4.35,.3],[4.35,.3]],moon:[.16,.36,-.92],fovY:50*Math.PI/180,eye:[0,2.05,10.4],target:[0,2.75,-3],pivot:[0,0,-2.6]},Qa=(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],Or=(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]];var Yi=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],Br=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],$a=i=>{let e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},da=(i,e,t)=>i+(e-i)*t,Ja=(i,e,t)=>[da(i[0],e[0],t),da(i[1],e[1],t),da(i[2],e[2],t)];function Ir(i,e){let t=new Array(16);for(let s=0;s<4;s++)for(let a=0;a<4;a++){let o=0;for(let r=0;r<4;r++)o+=i[r*4+a]*e[s*4+r];t[s*4+a]=o}return t}function wl(i,e,t,s){let a=1/Math.tan(i/2),o=1/(t-s);return[a/e,0,0,0,0,a,0,0,0,0,(s+t)*o,-1,0,0,2*s*t*o,0]}function Sl(i,e,t=[0,1,0]){let s=$a(Qa(i,e)),a=$a(Br(t,s)),o=Br(s,a);return[a[0],o[0],s[0],0,a[1],o[1],s[1],0,a[2],o[2],s[2],0,-Yi(a,i),-Yi(o,i),-Yi(s,i),1]}function Fr(i){let e=i,t=new Array(16),s=e[0]*e[5]-e[1]*e[4],a=e[0]*e[6]-e[2]*e[4],o=e[0]*e[7]-e[3]*e[4],r=e[1]*e[6]-e[2]*e[5],n=e[1]*e[7]-e[3]*e[5],l=e[2]*e[7]-e[3]*e[6],d=e[8]*e[13]-e[9]*e[12],c=e[8]*e[14]-e[10]*e[12],h=e[8]*e[15]-e[11]*e[12],p=e[9]*e[14]-e[10]*e[13],f=e[9]*e[15]-e[11]*e[13],m=e[10]*e[15]-e[11]*e[14],v=1/(s*m-a*f+o*p+r*h-n*c+l*d);return t[0]=(e[5]*m-e[6]*f+e[7]*p)*v,t[1]=(e[2]*f-e[1]*m-e[3]*p)*v,t[2]=(e[13]*l-e[14]*n+e[15]*r)*v,t[3]=(e[10]*n-e[9]*l-e[11]*r)*v,t[4]=(e[6]*h-e[4]*m-e[7]*c)*v,t[5]=(e[0]*m-e[2]*h+e[3]*c)*v,t[6]=(e[14]*o-e[12]*l-e[15]*a)*v,t[7]=(e[8]*l-e[10]*o+e[11]*a)*v,t[8]=(e[4]*f-e[5]*h+e[7]*d)*v,t[9]=(e[1]*h-e[0]*f-e[3]*d)*v,t[10]=(e[12]*n-e[13]*o+e[15]*s)*v,t[11]=(e[9]*o-e[8]*n-e[11]*s)*v,t[12]=(e[5]*c-e[4]*p-e[6]*d)*v,t[13]=(e[0]*p-e[1]*c+e[2]*d)*v,t[14]=(e[13]*a-e[12]*r-e[14]*s)*v,t[15]=(e[8]*r-e[9]*a+e[10]*s)*v,t}function Tl(i,e){return[i[0]*e[0]+i[4]*e[1]+i[8]*e[2]+i[12],i[1]*e[0]+i[5]*e[1]+i[9]*e[2]+i[13],i[2]*e[0]+i[6]*e[1]+i[10]*e[2]+i[14],i[3]*e[0]+i[7]*e[1]+i[11]*e[2]+i[15]]}function Ki(i,e,t,s){let a=Tl(i,e);return[(a[0]/a[3]*.5+.5)*t,(.5-a[1]/a[3]*.5)*s,a[3]]}function zr(i){let e=Ee.screen,t=e.height*i/2,s=e.bottom,a=e.bottom+e.height;return[[-t,a,e.z],[t,a,e.z],[t,s,e.z],[-t,s,e.z]]}function Ml(){let i=Ee.screen,e=i.bottom+i.height/2,t=i.height/2/Math.tan(Ee.fovY/2);return{eye:[0,e,i.z+t],target:[0,e,i.z]}}function Xa(i=0,e=0,t=1){let s=Ee.pivot,a=Qa(Ee.eye,s),o=Math.cos(i),r=Math.sin(i),n=[(a[0]*o+a[2]*r)*t,(a[1]+e*6)*t,(-a[0]*r+a[2]*o)*t];return{eye:Or(s,n),target:Or(Ee.target,[0,e*2,0])}}function Ll(){let i=Ee.dollScale,e=[],t=(s,a,o)=>{for(let r of[-.8,.8])for(let n of[0,2.35])for(let l of[-.4,.4])e.push([s+r*i,a+n*i,o+l*i])};for(let[s,a]of Ee.front)t(s,0,a);for(let[s,a]of Ee.back)t(s,Ee.riser.top,a);return e}var Rl=Ll();function Nr(i,e,t,s=8){let a=n=>{let l=$i(Xa(i,0,n),e,t,null,1,0);return Rl.every(d=>{let[c,h,p]=Ki(l,d,e,t);return p>0&&c>s&&c<e-s&&h>s&&h<t-s})};if(a(1))return Xa(i,0,1);let o=1,r=2.6;for(let n=0;n<12;n++){let l=(o+r)/2;a(l)?r=l:o=l}return Xa(i,0,r)}var Al=i=>i*i*(3-2*i);function Xi(i,e=0,t=0,s=null){let a=Ml(),o=s||Xa(e,t),r=Al(Math.min(1,Math.max(0,i))),n=Ja(a.eye,o.eye,r);return n[1]+=Math.sin(r*Math.PI)*1.1,{eye:n,target:Ja(a.target,o.target,r)}}function $i(i,e,t,s,a,o){let r=e/t,n=wl(Ee.fovY,r,.3,120),l=Sl(i.eye,i.target),d=Ir(n,l);if(o>0&&s){let c=a/r,h=s.width/e,p=s.height/t,f=(s.left+s.width/2)/e*2-1,m=1-(s.top+s.height/2)/t*2,v=da(1,h/c,o),g=da(1,p,o),b=f*o,x=m*o;d=Ir([v,0,0,0,0,g,0,0,0,0,1,0,b,x,0,1],d)}return d}function Hr(i,e,t){let[[s,a],[o,r],[n,l],[d,c]]=t,h=o-n,p=d-n,f=s-o+n-d,m=r-l,v=c-l,g=a-r+l-c,b=0,x=0;if(Math.abs(f)>1e-9||Math.abs(g)>1e-9){let P=h*v-p*m;b=(f*v-p*g)/P,x=(h*g-f*m)/P}let T=o-s+b*o,R=d-s+x*d,I=s,N=r-a+b*r,ie=c-a+x*c,K=a;return[[T/i,R/e,I],[N/i,ie/e,K],[b/i,x/e,1]]}function Ur(i){return`matrix3d(${[i[0][0],i[1][0],0,i[2][0],i[0][1],i[1][1],0,i[2][1],0,0,1,0,i[0][2],i[1][2],0,i[2][2]].map(t=>+t.toPrecision(9)).join(",")})`}var Gr=(i,e,t)=>Math.max(e,Math.min(t,i)),El=i=>(i=Gr(i,0,1),i*i*(3-2*i)),jr=Object.keys(Bt),_l=[[1,.42,.06],[.62,.2,1],[.35,1,.22],[1,.42,.06]];function Dl(i){let e=Array.isArray(i)&&i.length===4?i.slice():[J.PUMPKIN,J.SKULL,J.GHOST,J.VOODOO],t=[J.PUMPKIN,J.VOODOO,J.GHOST,J.SKULL,J.MUMMY,J.FRANK,J.SKELETON].filter(n=>!e.includes(n)),s=n=>{let l=t.indexOf(n);return l>=0?t.splice(l,1)[0]:null},a=s(J.MUMMY)??t.shift(),o=s(J.FRANK)??t.shift(),r=t.shift()??J.SKELETON;return{front:[o,a,r],back:e}}function Pl(i,e=Math.random){let t=jr.filter(r=>!i.includes(r)),s=t.length?t:jr,a=s.reduce((r,n)=>r+(Bt[n].weight||1),0),o=e()*a;for(let r of s)if(o-=Bt[r].weight||1,o<=0)return r;return s[0]}var Za=class{constructor(e,t=1){let s=Dl(e),a=t,o=()=>a=(a*.6180339+.137)%1;this.dancers=[],s.front.forEach((r,n)=>this.dancers.push({d:new Yt(r,o()),home:[Ee.front[n][0],0,Ee.front[n][1]],row:"front",role:["bass","lead","free"][n]})),s.back.forEach((r,n)=>this.dancers.push({d:new Yt(r,o()),home:[Ee.back[n][0],Ee.riser.top,Ee.back[n][1]],row:"back",lane:n}));for(let r of this.dancers)r.in=0,r.out=0,r.enterAt=1/0,r.exitAt=1/0,r.extraSpin=0,r.bow=0;this.groups={front:{name:null,end:-1/0},back:{name:null,end:-1/0}},this.recent=[],this.pattern=0,this.palette=0,this.flash=0,this.strobe=0,this.sparkle=0,this.white=0,this.jump=0,this.lastWhite=-1e9,this.shake=0,this.switchSoon=!1,this.rnd=Math.random,this.lastBeat=-1/0,this.wasPlaying=!1}reset(){for(let e of Object.values(this.groups))e.name=null,e.end=-1/0;for(let e of this.dancers)e.pending=null,e.d.dance=null;this.switchSoon=!1}enter(e,t){this.dancers.forEach((s,a)=>{s.enterAt=e+[3,1,5,0,2,4,6][a]*t*.5,s.in=0,s.exitAt=1/0,s.out=0})}leave(e){this.dancers.forEach((t,s)=>{t.exitAt=e+s*45})}get gone(){return this.dancers.every(e=>e.out>=1)}whiteFlash(e,t){e-this.lastWhite>400&&(this.white=Math.max(this.white,t),this.lastWhite=e)}schedule(e,t,s){let a=this.groups[e],o=this.dancers.filter(c=>c.row===e);if(s){a.end=Math.min(a.end,Math.ceil(t/4)*4);return}if(t<a.end-.05)return;let r=Math.max(a.end,Math.floor(t/4)*4),n=e==="back"&&this.rnd()<.45&&this.groups.front.name?this.groups.front.name:Pl(this.recent,this.rnd);e==="front"&&(this.recent.push(n),this.recent.length>3&&this.recent.shift(),this.pattern=(this.pattern+1)%4,this.palette=(this.palette+1)%4);let l=Bt[n].len||8,d=e==="front"&&l<=16&&this.rnd()<.3;o.forEach((c,h)=>{let p=d?h:0;c.pending={name:n,start:r+p,len:l-p}}),a.name=n,a.end=r+l}update(e,t,s,a,o,r,n,l,d,c){let p=n>150?s/2:s;r&&(!this.wasPlaying||p<this.lastBeat-1)&&this.reset(),this.wasPlaying=r,this.lastBeat=p;for(let m of a)if(m.kind==="section")this.switchSoon=!0,this.whiteFlash(t,.55);else if(m.kind==="kick"){this.flash=Math.max(this.flash,.7),this.jump=1,this.shake=1;for(let v of this.dancers)v.d.dance||(v.d.sqv-=.8);this.stamp(0)}else m.kind==="snare"?(this.strobe=1,this.stamp(1)):m.kind==="hat"?(this.sparkle=1,this.stamp(2)):m.kind==="perc"?this.stamp(3):m.kind==="lead"?this.sing("lead",l.lead):m.kind==="bass"&&this.sing("bass",l.bass);r&&(this.schedule("front",p,this.switchSoon),this.schedule("back",p,this.switchSoon),this.switchSoon=!1);let f=m=>Math.exp(-e*m);this.flash*=f(7),this.strobe*=f(16),this.sparkle*=f(5),this.white*=f(5),this.jump*=f(4.5),this.shake*=f(9);for(let m of this.dancers){let v=m.d;if(m.pending&&p>=m.pending.start-.5&&(v.dance=m.pending,m.pending=null),m.in=t<m.enterAt?0:Math.min(1,(t-m.enterAt)/750),m.out=t<m.exitAt?0:Math.min(1,(t-m.exitAt)/520),m.bow+=((r?0:1)-m.bow)*(1-f(3)),v.ltx=Gr(d[0]*1.6,-1,1)*.8+.25*Math.sin(t/2100+v.seed*20),v.lty=.08+.15*Math.sin(t/2900+v.seed*13),v.color=m.row==="back"?l.drum:m.role==="bass"?l.bass:m.role==="lead"?l.lead:l.accent,v.step(e,t,!1,p),c&&(v.p.spin=0),m.bow>.01){let g=v.p,b=El(m.bow);g.crouch+=(.3-g.crouch)*b,g.head+=(-.2-g.head)*b,g.hl=g.hl.map((x,T)=>x+([-.25,-.75,.3][T]-x)*b),g.hr=g.hr.map((x,T)=>x+([.25,-.75,.3][T]-x)*b)}v.ink+=((m.row==="back"?o.d[m.lane]||0:m.role==="lead"?o.lead:m.role==="bass"?o.bass:o.master)*.8-v.ink)*(1-f(8))}return this.lights(t,s,o,l,r)}stamp(e){let t=this.dancers.find(s=>s.row==="back"&&s.lane===e);t&&(t.d.sqv-=t.d.dance?1:1.8,t.d.hvy+=.6,t.d.glow=Math.max(t.d.glow,.5))}sing(e,t){let s=this.dancers.find(a=>a.role===e);s&&s.d.sing(.75,t)}lights(e,t,s,a,o){let r=Math.pow(1-(t%1+1)%1,3),n=[[a.drum,a.bass,a.lead,a.drum],_l,[a.lead,a.accent,a.lead,a.accent],[a.bass,[1,.9,.8],[1,.9,.8],a.bass]][this.palette],l=[s.drum,s.bass,s.lead,s.master],d=new Float32Array(16),c=new Float32Array(16),h=new Float32Array(12),p=t*Math.PI;return Ee.heads.forEach((f,m)=>{let v=m<2?-1:1,g=m,b,x;this.pattern===0?(b=f[0]*.55+1.5*Math.sin(p/2+g*.8),x=-1.6+1.2*Math.cos(p/4+g)):this.pattern===1?(b=-v*1.9*Math.sin(p/2)+v*.4,x=-2.2+1.4*Math.sin(p/4+g*1.3)):this.pattern===2?(b=.35*Math.sin(p+g),x=Ee.front[1][1]+.3*Math.cos(p/2+g)):(b=2.3*Math.cos(p/2+g*Math.PI/2),x=-2.2+1.7*Math.sin(p/2+g*Math.PI/2));let T=$a(Qa([b,0,x],f)),R=o?.75+1.1*Math.min(1,Math.sqrt(l[m]||0)*1.3)+.6*r:.55;d.set([f[0],f[1],f[2],R],m*4),c.set([T[0],T[1],T[2],Math.cos((this.pattern===2?6.5:9)*Math.PI/180)],m*4);let I=n[m]||a.accent;h.set(I,m*3)}),{spotPos:d,spotDir:c,spotCol:h,pulse:r}}};function Wr(i){let e={playing:!1,tempo:120,latency:0,levels:{drum:0,bass:0,lead:0,master:0,d:[0,0,0,0]},sec:-1,events:[],abs0:null,tick:0,at:0,msPerTick:5.208333333333333,beatAt(t){let s=t-e.latency;return e.playing?(e.tick+(s-e.at)/e.msPerTick)/96:s/600},take(t){let s=t-e.latency,a=[];for(;e.events.length&&e.events[0].at<=s;)a.push(e.events.shift());return a},onPos(t){let s=performance.now(),a=e.playing;if(e.playing=!!t.playing&&t.tick>=0,e.tempo=i.project.tempo||120,e.msPerTick=6e4/(e.tempo*96),e.playing?((!a||e.abs0===null)&&(e.abs0=t.abs-t.tick),e.tick=t.abs-e.abs0,e.at=s,i.project.song&&i.project.song.enabled&&i.project.song.sections.length&&t.sec!==e.sec&&(e.sec>=0&&e.events.push({at:s,kind:"section",v:t.sec}),e.sec=t.sec)):(e.abs0=null,e.sec=-1),t.m){let o=e.levels,r=.5;if(o.drum=Math.max(t.m.drum||0,o.drum*r),o.bass=Math.max(t.m.bass||0,o.bass*r),o.lead=Math.max(t.m.lead||0,o.lead*r),o.master=Math.max(t.m.master||0,o.master*r),t.m.d)for(let n=0;n<4;n++)o.d[n]=Math.max(t.m.d[n]||0,o.d[n]*r)}if(t.trig){for(let o=0;o<t.trig.length;o+=4){let r=t.trig[o],n=t.trig[o+1];r===0?e.events.push({at:s,kind:["kick","snare","hat","perc"][n]||"perc",v:n}):e.events.push({at:s,kind:r===1?"bass":"lead",v:n})}e.events.length>256&&e.events.splice(0,e.events.length-256)}}};return e}var ua={legere:11,normale:14,forte:19};function Vr({threshold:i=ua.normale,swings:e=5,window:t=700,rest:s=2e3}={}){let a=[],o=null,r=-1e9,n={threshold:i,peak:0,push(l,d,c,h){let p=[l,d,c],f=0;for(let b=1;b<3;b++)Math.abs(p[b])>Math.abs(p[f])&&(f=b);let m=Math.abs(p[f]);if(n.peak=Math.max(m,n.peak*.97),h-r<s)return a=[],o=null,!1;if(m<n.threshold)return o=null,!1;let v=Math.sign(p[f]);if(o&&o.axis===f&&o.sign===v)return!1;o={t:h,axis:f,sign:v};let g=a[a.length-1];return g&&g.sign===v&&g.axis===f?!1:(a.push(o),a=a.filter(b=>h-b.t<=n.window),a.length>=e?(r=h,a=[],o=null,!0):!1)},window:t,reset(){a=[],o=null}};return n}function Yr(i=.1){let e=null;return(t,s,a)=>(e||(e=[t,s,a]),e[0]+=(t-e[0])*i,e[1]+=(s-e[1])*i,e[2]+=(a-e[2])*i,[t-e[0],s-e[1],a-e[2]])}var Kr=ca*4,Xr=ft.storage+".show",ql={soft:!1,latency:0,shake:"normale",meter:!1},ei=(i,e,t)=>Math.max(e,Math.min(t,i)),Kt=i=>(i=ei(i,0,1),i*i*(3-2*i)),$r=1600,Ji=260,Jr=1150,Cl=`
canvas.show-back, canvas.show-front { position: fixed; left: 0; top: 0; width: 100vw; height: var(--app-h, 100vh); display: block; }
canvas.show-back { z-index: 0; pointer-events: none; background: #05030a; }
canvas.show-front { z-index: 2; touch-action: none; }
html.show-on .app { z-index: 1; pointer-events: none; transform-origin: 0 0; clip-path: inset(0 round 46px); will-change: transform; }
html.show-on body { background: #05030a; }
.show-ui { position: fixed; left: 0; right: 0; top: 0; height: var(--app-h, 100vh); z-index: 3; pointer-events: none; color: #fff; font: 600 14px/1.3 -apple-system, system-ui, sans-serif; }
.show-ui button { pointer-events: auto; color: inherit; font: inherit; }
.show-ui .sx, .show-ui .sg { position: absolute; top: calc(env(safe-area-inset-top, 0px) + 10px); width: 44px; height: 44px; border-radius: 22px; background: rgba(16, 8, 26, .62); border: 1px solid rgba(255, 255, 255, .18); display: grid; place-items: center; font-size: 22px; opacity: 0; transition: opacity .3s; pointer-events: none; }
.show-ui .sx { right: 14px; } .show-ui .sg { left: 14px; font-size: 20px; }
.show-ui.controls .sx, .show-ui.controls .sg { opacity: 1; pointer-events: auto; }
.show-ui .again { position: absolute; left: 50%; bottom: calc(env(safe-area-inset-bottom, 0px) + 26px); transform: translateX(-50%); padding: 12px 20px; border-radius: 22px; background: rgba(255, 110, 20, .9); color: #2b0d00; font-weight: 800; opacity: 0; transition: opacity .4s; pointer-events: none; white-space: nowrap; }
.show-ui.stopped .again { opacity: 1; pointer-events: auto; }
.show-ui .panel { position: absolute; left: 14px; right: 14px; top: calc(env(safe-area-inset-top, 0px) + 62px); max-width: 420px; padding: 14px; border-radius: 18px; background: rgba(16, 8, 26, .9); border: 1px solid rgba(255, 255, 255, .14); display: none; pointer-events: auto; }
.show-ui .panel.open { display: block; }
.show-ui .panel h4 { margin: 0 0 10px; font-size: 15px; }
.show-ui .panel .row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin: 8px 0; }
.show-ui .panel .seg { display: flex; gap: 4px; }
.show-ui .panel .seg button { padding: 7px 10px; border-radius: 10px; background: rgba(255, 255, 255, .08); font-size: 13px; }
.show-ui .panel .seg button[aria-pressed="true"] { background: #ff8a2a; color: #2b0d00; }
.show-ui .panel p { margin: 8px 0 0; font-size: 12px; font-weight: 500; opacity: .7; }
.show-ui .meter { position: absolute; left: 10px; bottom: calc(env(safe-area-inset-bottom, 0px) + 10px); padding: 6px 9px; border-radius: 10px; background: rgba(0, 0, 0, .55); font: 500 11px/1.35 ui-monospace, Menlo, monospace; white-space: pre; display: none; }
.show-ui .meter.on { display: block; }
.show-ui .meter button { margin-top: 4px; padding: 4px 8px; border-radius: 8px; background: rgba(255, 255, 255, .15); font: 600 11px/1 -apple-system, system-ui, sans-serif; }
`;function Ke(i,e,...t){let s=document.createElement(i);for(let a in e||{})a==="onclick"?s.addEventListener("click",e[a]):a==="text"?s.textContent=e[a]:s.setAttribute(a,e[a]);for(let a of t)a&&s.append(a);return s}function Qr(i,{app:e,pad:t,timeline:s,fx:a,hw:o,onPlay:r,ensureAudio:n,toast:l}){let d=matchMedia("(prefers-reduced-motion: reduce)"),c={...ql};try{c={...c,...JSON.parse(localStorage.getItem(Xr)||"{}")}}catch{}let h=()=>{try{localStorage.setItem(Xr,JSON.stringify(c))}catch{}},p=Wr(i);p.latency=c.latency||0,i.on("pos",L=>p.onPos(L));let f="idle",m=0,v=0,g=null,b=null,x=null,T=1,R=0,I=0,N=0,ie=0,K=0,P=0,Z=16.7,j=!1,ae=1e9,H=window.devicePixelRatio||1,fe=0,G=0,U={drum:[1,.5,.1],bass:[.7,.3,1],lead:[.45,1,.3],accent:[1,.5,.1]},ue=0,oe=16.7,re=60,Se=0,le=0,Ge=0,M=Math.min(window.devicePixelRatio||1,1.25),C=Math.min(window.devicePixelRatio||1,1.25),A=40,O=!1,B=!1,Q=new Float32Array(12*Kr),pe=new Float32Array(28),de=null,X={state:"unknown",listening:!1,asked:!1,samples:[],hits:[],shakes:[],error:""},bt=Vr({threshold:ua[c.shake]||ua.normale}),He=Yr(),st=0,mt=0;function Dt(L){let ce=L.acceleration,me,be,Oe;if(ce&&ce.x!==null&&ce.x!==void 0)me=ce.x,be=ce.y,Oe=ce.z;else{let Qe=L.accelerationIncludingGravity;if(!Qe||Qe.x===null||Qe.x===void 0)return;[me,be,Oe]=He(Qe.x,Qe.y,Qe.z)}let Je=performance.now();if(X.samples.push([Math.round(Je),+me.toFixed(2),+be.toFixed(2),+Oe.toFixed(2)]),X.samples.length>900&&X.samples.splice(0,X.samples.length-900),bt.push(me,be,Oe,Je)){X.hits.push(Math.round(Je));let Qe={t:Math.round(Je),before:X.samples.slice(-60),after:[]};X.shakes.push(Qe),X.shakes.length>4&&X.shakes.shift(),setTimeout(()=>{Qe.after=X.samples.filter(_e=>_e[0]>Qe.t).slice(0,30)},600),ni(Je)&&Pe("secousse")}}function Nt(){X.listening||(X.listening=!0,window.addEventListener("devicemotion",Dt))}let Ht=window.DeviceMotionEvent,Ms=!!(Ht&&typeof Ht.requestPermission=="function");Ht?Ms?Ht.requestPermission().then(L=>{X.state=L,L==="granted"&&Nt()}).catch(()=>{X.state==="unknown"&&(X.state="\xE0 demander")}):(X.state="granted",Nt()):X.state="absent";function It(){!Ms||X.asked||X.state==="granted"||X.state==="denied"||(X.asked=!0,Ht.requestPermission().then(L=>{X.state=L,L==="granted"&&Nt()}).catch(L=>{X.state="erreur",X.error=String(L&&L.message||L)}))}let Ie={sentinel:null,authorized:!1,error:""};function Ls(){Ie.authorized||!navigator.wakeLock||(Ie.authorized=!0,navigator.wakeLock.request("screen").then(L=>L.release()).catch(L=>{Ie.authorized=!1,Ie.error=String(L&&L.message||L)}))}function ri(){!navigator.wakeLock||Ie.sentinel||navigator.wakeLock.request("screen").then(L=>{if(f==="idle"){L.release();return}Ie.sentinel=L,L.addEventListener("release",()=>{Ie.sentinel===L&&(Ie.sentinel=null)})}).catch(L=>{Ie.error=String(L&&L.message||L)})}function Hs(){Ie.sentinel&&(Ie.sentinel.release().catch(()=>{}),Ie.sentinel=null)}let Us=0,js=()=>{It(),Ls(),Us||(Us=setTimeout(()=>{!g&&f==="idle"&&(g=new ha)},4e3))};document.addEventListener("touchend",js,!0),document.addEventListener("click",js,!0),document.addEventListener("pointerdown",L=>{L.isPrimary&&L.pointerType==="touch"&&(st=0),st++},!0);let ls=()=>{st=Math.max(0,st-1),mt=performance.now()};document.addEventListener("pointerup",ls,!0),document.addEventListener("pointercancel",ls,!0);function ni(L){return f==="idle"&&i.ui.playing&&!i.ui.armed&&document.visibilityState==="visible"&&st===0&&L-mt>500&&!document.querySelector(".sheet.open")&&!document.querySelector(".wake:not(.hidden)")}let Lt=null;e.addEventListener("pointerdown",L=>{!L.target.closest||!L.target.closest(".top .progress")||(n&&n(),clearTimeout(Lt),Lt=setTimeout(()=>{Lt="fired",i.ui.playing||r(),Pe("appui long")},650))},!0);let Gs=()=>{Lt==="fired"?It():clearTimeout(Lt),Lt=null};e.addEventListener("pointerup",Gs,!0),e.addEventListener("pointercancel",Gs,!0);let ge=null,S=null,_=0,F=(L,ce,me)=>Ke("div",{class:"seg"},...ce.map(([be,Oe])=>{let Je=Ke("button",{"aria-pressed":String(c[L]===be),text:Oe});return Je.addEventListener("click",Qe=>{Qe.stopPropagation(),c[L]=be,h();for(let _e of Je.parentNode.children)_e.setAttribute("aria-pressed",String(_e===Je));me&&me(be)}),Je}));function D(){let L=Ke("div",{class:"panel"},Ke("h4",{text:"Le concert"}),Ke("div",{class:"row"},Ke("span",{text:"Lumi\xE8res"}),F("soft",[[!1,"Intenses"],[!0,"Douces"]])),Ke("div",{class:"row"},Ke("span",{text:"Avance du son"}),F("latency",[[0,"0"],[100,"0,1 s"],[200,"Bluetooth"],[300,"0,3 s"]],_e=>{p.latency=_e})),Ke("div",{class:"row"},Ke("span",{text:"Secousse"}),F("shake",[["legere","L\xE9g\xE8re"],["normale","Normale"],["forte","Forte"]],_e=>{bt.threshold=ua[_e]})),Ke("div",{class:"row"},Ke("span",{text:"Compteur"}),F("meter",[[!1,"Non"],[!0,"Oui"]],_e=>be.classList.toggle("on",_e))),Ke("p",{text:"Avec des \xE9couteurs Bluetooth, le son arrive apr\xE8s l\u2019image : \xAB Bluetooth \xBB retarde les lumi\xE8res et les danses d\u2019autant. Les flashs de toute l\u2019image ne d\xE9passent jamais trois par seconde."})),ce=Ke("div"),me=Ke("button",{text:"Copier la trace"});me.addEventListener("click",_e=>{_e.stopPropagation();let Ws=JSON.stringify(V());(navigator.clipboard?navigator.clipboard.writeText(Ws):Promise.reject()).then(()=>l("Trace copi\xE9e"),()=>l("Copie impossible"))});let be=Ke("div",{class:"meter"+(c.meter?" on":"")},ce,me),Oe=Ke("button",{class:"sx","aria-label":"Revenir \xE0 l\u2019app",text:"\xD7"});Oe.addEventListener("click",_e=>{_e.stopPropagation(),it()});let Je=Ke("button",{class:"sg","aria-label":"R\xE9glages du concert",text:"\u2699"});Je.addEventListener("click",_e=>{_e.stopPropagation(),L.classList.toggle("open"),_=performance.now()+6e3});let Qe=Ke("button",{class:"again",text:"Touchez pour relancer"});Qe.addEventListener("click",_e=>{_e.stopPropagation(),r()}),S=Ke("div",{class:"show-ui"},Oe,Je,L,Qe,be),S.meterText=ce,S.panel=L,S.meter=be}let V=()=>({build:"fdb1fcf7d8",ua:navigator.userAgent,motion:{state:X.state,error:X.error,threshold:bt.threshold,hits:X.hits.slice(-20),shakes:X.shakes,samples:X.samples.slice(-600)},wake:{held:!!Ie.sentinel,error:Ie.error},gpu:{ema:+oe.toFixed(2),fps:re,app:Ve,sf:+M.toFixed(2),sb:+C.toFixed(2),steps:A,compileMs:g&&g.compileMs,readyMs:g&&g.readyMs,parallel:g&&g.parallel,errors:g?g.errors.slice(0,3):[]}}),ee=null;function We(L){f!=="on"&&f!=="opening"||(S.classList.add("controls"),_=performance.now()+3e3,ee={id:L.pointerId,x:L.clientX,y:L.clientY,yaw:G})}function je(L){if(!ee||L.pointerId!==ee.id)return;let ce=L.clientX-ee.x,me=L.clientY-ee.y;d.matches||(G=ei(ee.yaw-ce/innerWidth*1.2,-.5,.5)),me>90&&Math.abs(me)>Math.abs(ce)*1.5&&(ee=null,it())}function Ue(L){!ee||L.pointerId!==ee.id||(ee=null)}let Xe=null,Rt=["wake","keepAwake","requestRender"];function Rs(L){let ce=a&&a();ce&&(ce.held=L);let me=ce&&ce.fluid;if(L&&me&&Xe!==me){if(Xe)for(let be of Rt)delete Xe[be];Xe=me,me.stop(),me.pending&&(cancelAnimationFrame(me.pending),me.pending=0);for(let be of Rt)me[be]=()=>{}}else if(!L&&Xe){Xe.queue=[];for(let be of Rt)delete Xe[be];Xe=null}o&&o.hold&&o.hold(L)}let Ve=0,ts=null,dt=null,kt=null,se=null;function at(){ts=new Map([[e,e.getBoundingClientRect()]]);for(let ce of e.querySelectorAll("*"))ts.set(ce,ce.getBoundingClientRect());dt=Element.prototype.getBoundingClientRect;let L=dt;Element.prototype.getBoundingClientRect=function(){let ce=ts&&ts.get(this);return ce?DOMRect.fromRect(ce):L.call(this)}}function ut(){dt&&(Element.prototype.getBoundingClientRect=dt,dt=null),ts=null}function we(L){L&&!kt?(kt=Object.getOwnPropertyDescriptor(window,"devicePixelRatio")||{inherited:!0},Object.defineProperty(window,"devicePixelRatio",{configurable:!0,get:()=>1})):!L&&kt&&(kt.inherited?delete window.devicePixelRatio:Object.defineProperty(window,"devicePixelRatio",kt),kt=null)}let Ye=0;function $e(L){let ce=a&&a()&&a().fluid;if(se&&(se!==ce||L!==Ye)&&(delete se.frame,se=null,Ye=0),!ce||L<=1||se)return;$(ce);let me=Object.getPrototypeOf(ce).frame,be=1;ce.slow=0,ce.frame=Oe=>{if(ce.lastFrameAt=0,be=(be+1)%L){ce.raf=requestAnimationFrame(Je=>ce.frame(Je));return}me.call(ce,Oe)},se=ce,Ye=L}function $(L){if(L.keepInk)return;let ce=Object.getPrototypeOf(L).initBuffers;L.initBuffers=function(){let me=this.res(this.cfg.SIM_RESOLUTION),be=this.res(this.cfg.DYE_RESOLUTION);this.dye&&this.velocity&&this.velocity.width===me.width&&this.velocity.height===me.height&&this.dye.width===be.width&&this.dye.height===be.height||ce.call(this)},L.keepInk=!0}function q(L){if(Ve=L,L===9){$e(1),Rs(!0);return}Rs(!1),$e(L||1),o&&o.light&&o.light(L&&kt?1:0,L||1)}function Pe(L){if(!(f!=="idle"||document.visibilityState!=="visible")){if(g||(g=new ha),!g.ok){l("Le concert ne peut pas d\xE9marrer ici (WebGL 2)");return}f="opening",ao.reason=L,document.activeElement&&/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)&&document.activeElement.blur(),o&&o.goAway&&o.goAway(!0),at(),H=window.devicePixelRatio||1,q(2),ge||(ge=Ke("style",{text:Cl}),document.head.append(ge)),S||D(),x=e.getBoundingClientRect(),T=x.width/x.height,K=innerWidth,b=new Za(i.settings.hwCast),p.events.length=0,document.body.insertBefore(g.back,e),document.body.append(g.front,S),document.documentElement.classList.add("show-on"),g.front.addEventListener("pointerdown",We),g.front.addEventListener("pointermove",je),g.front.addEventListener("pointerup",Ue),g.front.addEventListener("pointercancel",Ue),I=performance.now(),R=0,O=!1,fe=G=0,v=0,Ge=0,oe=16.7,Z=16.7,ae=1e9,j=!1,P=0,ri(),m=requestAnimationFrame(so)}}function it(L){if(f!=="idle"){if(L===!0||f==="opening"||d.matches){ot();return}f!=="closing"&&(f="closing",N=performance.now(),ie=N+780,b.leave(N),o&&o.goAway&&o.goAway(!1),we(!1),o&&o.light&&Ve!==9&&o.light(0,Ve),S.classList.remove("controls","stopped"),S.panel.classList.remove("open"))}}function ot(){m&&cancelAnimationFrame(m),m=0,f="idle",st=0,ee=null,Object.assign(e.style,{transform:"",opacity:""}),document.documentElement.classList.remove("show-on"),g&&(g.back.remove(),g.front.remove()),S&&(S.remove(),S.classList.remove("controls","stopped"),S.panel.classList.remove("open")),g&&(g.front.removeEventListener("pointerdown",We),g.front.removeEventListener("pointermove",je),g.front.removeEventListener("pointerup",Ue),g.front.removeEventListener("pointercancel",Ue)),we(!1),q(0),o&&o.goAway&&o.away&&o.goAway(!1),ut(),Hs();let L=a&&a();L&&L.place&&L.place(),t&&t.draw(),s&&s.draw()}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&it(!0)}),window.addEventListener("resize",()=>{f!=="idle"&&Math.abs(innerWidth-K)>1&&it(!0)});let rt="",cs=null,pa=(L,ce,me)=>{let be=`${L.toFixed(3)},${ce},${me}`;return be!==rt&&(rt=be,cs=Nr(L,ce,me)),{eye:cs.eye.slice(),target:cs.target.slice()}};function so(L){if(m=0,f==="idle")return;let ce=Math.min(.05,v?(L-v)/1e3:1/60);if(v&&f==="on"){let ne=L-v;oe=oe*.94+ne*.06;let Be=j&&Math.abs(oe-33.3)<3;oe>18.5&&!Be?++Ge>50&&(Ge=0,M>1?M=Math.max(1,M*.9):Ve===2?q(3):A>32?A=32:Ve===3?q(9):M>.75?M=Math.max(.75,M*.9):A>26?A=26:C>.6&&(C=Math.max(.6,C*.85))):Ge=Math.max(0,Ge-1)}if(v&&f==="opening"&&R&&L-R>150&&(Z=Z*.9+(L-v)*.1,ae=Math.min(ae,L-v)),v=L,Se++,L-le>1e3&&(re=Math.round(Se*1e3/(L-le||1e3)),Se=0,le=L),!g.ready&&g.compiled()&&(g.finish(),!g.ok)){console.warn("MOTIF Sc\xE8ne :",g.errors.join(`
`)),l("Le concert ne peut pas d\xE9marrer ici"),ot();return}if(g.ready&&!R&&(R=L),g.lost){if(!P)P=L;else if(L-P>3e3){let ne=g;ot(),ne.destroy(),g=null;return}}else P=0;{let ne=a&&a()&&a().fluid;ne&&Ve===9&&ne!==Xe?Rs(!0):ne&&(Ve===2||Ve===3)&&ne!==se&&$e(Ve)}if(L-ue>500){ue=L;let ne=getComputedStyle(e);for(let Be of["drum","bass","lead","accent"])U[Be]=na(ne.getPropertyValue("--"+Be))}let me=g.back.clientWidth||innerWidth,be=g.back.clientHeight||innerHeight;fe+=(G-fe)*(1-Math.exp(-ce*5));let Oe,Je=0,Qe=1,_e=d.matches;if(f==="opening"){let ne=R?L-R:0,Be=_e?1:ei((ne-Ji)/$r,0,1);Oe=_e?pa(0,me,be):Xi(Be,fe,0,pa(fe,me,be)),Je=_e?0:1-Kt(Be),Qe=Kt(_e?ne/600:Be*1.4);let Fe=_e?0:(R?Math.max(0,1-ne/Ji):1)*.045;Fe&&(Oe.eye=[Oe.eye[0]+Fe*Math.sin(L*.11),Oe.eye[1]+Fe*Math.sin(L*.137+1),Oe.eye[2]]),_e&&(e.style.opacity=String(Kt(ne/600))),!kt&&(_e||Kt(Be)>.5)&&(we(!0),o&&o.light&&Ve!==9&&o.light(1,Ve)),R&&ne>=(_e?600:Ji+$r)&&(f="on",e.style.opacity="",j=Z>28&&ae>25)}else if(f==="closing"){let ne=L<ie?1:1-ei((L-ie)/Jr,0,1);if(Oe=Xi(ne,fe,0,pa(fe,me,be)),Je=1-Kt(ne),Qe=Kt(ne*1.4),L>ie+Jr){b.whiteFlash(L,0),ot();return}}else Oe=pa(fe,me,be);if(f==="on"&&!O){O=!0;let ne=6e4/(p.tempo||120),Be=p.beatAt(L),Fe=p.playing?(Math.ceil(Be)-Be)*ne:0;b.enter(L+Fe,ne),setTimeout(()=>{f==="on"&&b.whiteFlash(performance.now(),.85)},Fe)}!_e&&f==="on"&&b.shake>.01&&(Oe={eye:[Oe.eye[0],Oe.eye[1]+.025*b.shake*Math.sin(L*.08),Oe.eye[2]-.05*b.shake],target:Oe.target});let Ws=$i(Oe,me,be,x,T,Je),pn=Fr(Ws),mn=zr(T).map(ne=>{let Be=Ki(Ws,ne,me,be);return[Be[0]-x.left,Be[1]-x.top]});e.style.transform=Ur(Hr(x.width,x.height,mn));let vn=p.beatAt(L),gn=p.take(L),As=p.playing;As!==B&&(B=As,S.classList.toggle("stopped",!As&&f==="on")),_&&L>_&&!S.panel.classList.contains("open")&&(S.classList.remove("controls"),_=0);let ma=p.levels,va=b.update(ce,L,vn,gn,ma,As,p.tempo,U,[Math.sin(fe),0],_e),io=c.soft?.4:1,oo=Ee.dollScale,Vs=0,ro=0,bn=b.dancers.slice().sort((ne,Be)=>ne.home[2]-Be.home[2]);for(let ne of bn){let Be=f==="closing"?Math.min(Kt(ne.in),1-Kt(ne.out)):Kt(ne.in);if(Be<=.001)continue;let Fe=ne.d,nt=Fe.p,xn=[ne.home[0]+nt.travel*oo,ne.home[1],ne.home[2]],kn=[ne.home[0]*.3,Ee.screen.bottom+.6,Ee.screen.z+.25],hs=Ja(kn,xn,Be);hs[1]+=Math.sin(Be*Math.PI)*2.2;let no=oo*(.35+.65*Be),Ft=Vs*Kr;Q.set([hs[0],hs[1],hs[2],no],Ft),Q.set([Fe.spot,0,0,nt.spin+(1-Be)*Math.PI*2],Ft+4),Q.set([0,0,1,Fe.type],Ft+8),Q.set([Fe.sq,Fe.hx,Fe.hy,Fe.sw],Ft+12),Q.set([Fe.lx,Fe.ly,Fe.blink,Fe.mouth],Ft+16),Q.set([Fe.glow,Fe.scare,Fe.seed,nt.bend],Ft+20),Q.set([Fe.color[0],Fe.color[1],Fe.color[2],1],Ft+24),Q.set([nt.hl[0],nt.hl[1],nt.hl[2],nt.hip],Ft+28),Q.set([nt.hr[0],nt.hr[1],nt.hr[2],nt.twist],Ft+32),Q.set([nt.ll,nt.lr,nt.roll,Fe.ink],Ft+36),Q.set([nt.fxl,nt.fxr,nt.crouch,nt.lz],Ft+40),pe.set([hs[0],hs[1],hs[2],no*(Be>.98?1:0)],Vs*4),ne.row==="back"&&(ro=Vs+1),Vs++}g.resize(me,be,C,M);let yn=As?1:.6;g.draw(de={VP:new Float32Array(Ws),invVP:new Float32Array(pn),eye:Oe.eye,pix:2*Math.tan(Ee.fovY/2)/Math.max(1,g.front.height),steps:A,farSteps:Math.max(24,A-10),far:ro,n:Vs,dolls:Q,shadowDolls:pe,spotPos:va.spotPos.map((ne,Be)=>Be%4===3?ne*(c.soft?.75:1):ne),spotDir:va.spotDir,spotCol:va.spotCol,moon:Ee.moon,time:L/1e3,beat:va.pulse*(As?1:0),foot:U.bass.map(ne=>ne*(.25+1.6*Math.min(1,Math.sqrt(ma.bass||0)*1.2))*yn),screenCol:U.accent.map(ne=>ne*(.35+.5*Math.min(1,Math.sqrt(ma.master||0)))),riserCol:U.drum.map(ne=>ne*(.3+1.6*Math.min(1,Math.sqrt(ma.drum||0)*1.2))),flash:b.flash*io,strobe:b.strobe*(c.soft?.3:1),sparkle:b.sparkle*io,white:b.white*(c.soft?.3:1),haze:c.soft?.7:1,crowd:1,jump:b.jump,screen:[Ee.screen.height*T/2,Ee.screen.bottom,Ee.screen.bottom+Ee.screen.height,Ee.screen.z],fade:Qe}),c.meter&&S.meter.classList.contains("on")&&(S.meterText.textContent=`${re} i/s \xB7 ${oe.toFixed(1)} ms
devant ${M.toFixed(2)}\xD7 \xB7 fond ${C.toFixed(2)}\xD7 \xB7 ${A} pas
shader : ${g.compileMs??"\u2026"} ms d\u2019attente${g.parallel?" (compil\xE9 \xE0 part)":""}
mouvement : ${X.state}${X.listening?", \xE9cout\xE9":""}
secousse : ${bt.peak.toFixed(1)} / ${bt.threshold} m/s\xB2 \xB7 ${X.hits.length}
app : ${Ve===9?"fig\xE9e":Ve?"en direct, 1 image sur "+Ve:"\u2014"}
\xE9cran allum\xE9 : ${Ie.sentinel?"oui":"non"}${Ie.error?" ("+Ie.error.slice(0,30)+")":""}`),m=requestAnimationFrame(so)}let ao={get state(){return f},get ok(){return!g||g.ok},get errors(){return g?g.errors:[]},get stats(){return{state:f,ema:oe,fps:re,sf:M,sb:C,steps:A,app:Ve,dpr:H,compileMs:g&&g.compileMs,parallel:g&&g.parallel,motion:X.state,wake:!!Ie.sentinel,n:b?b.dancers.length:0}},get renderer(){return g},get director(){return b},reason:"",open:Pe,close:it,trace:V,measure(L){return g&&de?g.time(de,L):null},quality(L){L.sf&&(M=L.sf),L.sb&&(C=L.sb),L.steps&&(A=L.steps),Ge=-1e9}};return ao}var Qi="fdb1fcf7d8",w=new Ta;window.__motif=w;var Ol={drum:"Drum",bass:"Bass",lead:"Lead"},Bl={kick:"KICK",snare:"SNARE \xB7 CLAP",hat:"HAT",perc:"PERC",bass:"BASSE",lead:"M\xC9LODIE"},ks=[["order","Ordre"],["up","Montant"],["down","Descendant"],["chord","Accord"]],tt=null,ws,De,Mt,Fs,Tt,ns,te=null,Ne=null,Zr=!1,E={},en=0;function gt(i,e){let t=E.toast;if(t.replaceChildren(u("span",{text:i})),e){let s=u("button",{text:e.label,onclick:()=>{t.classList.remove("show"),e.fn()}});t.append(s)}t.classList.toggle("act",!!e),t.classList.add("show"),clearTimeout(en),en=setTimeout(()=>t.classList.remove("show"),e?5e3:2200)}var rs=null;function Ss(){return tt.running?Promise.resolve(!0):tt.start().then(i=>(i&&to(),i)).catch(i=>(gt("Audio indisponible : "+i.message),!1))}function rn(i,e){E.wake.querySelector("h1").textContent=i,E.wake.querySelector("p").textContent=e,E.wake.classList.remove("hidden")}function to(){E.wake.classList.add("hidden")}async function oi(i){for(let e of _o(i)){let t=e==="drums"?"banks/drums/bank.json":`banks/${e}/bank.json`;if(!tt.loadedBanks.has(t))try{await tt.loadBank(t)}catch(s){gt("Sons non charg\xE9s ("+e+") : "+s.message)}}}async function nn(){let i=w.project,e=[...i.parts.drum.kit,i.parts.bass.preset,i.parts.lead.preset];for(let t of e)await oi(qe(t));w.syncAll()}function Il(){ws=document.getElementById("app"),ws.dataset.part=w.ui.part,E.logo=u("button",{class:"logo","aria-label":"Menu et projets",onclick:()=>ns.menu()},u("span",{html:he("logo").outerHTML}),u("b",{text:"MOTIF"})),E.rec=u("button",{class:"tbtn rec","aria-label":"Armer l\u2019enregistrement","aria-pressed":"false",onclick:zl},he("rec")),E.play=u("button",{class:"tbtn play","aria-label":"Lecture","aria-pressed":"false",onclick:Zi},he("play")),E.progressFill=u("div",{class:"fill"}),E.progressBars=u("div",{class:"bars"}),E.pos=u("span",{class:"pos",text:""}),E.progress=u("div",{class:"progress","aria-hidden":"true"},E.progressFill,E.progressBars,E.pos),E.tempo=u("div",{class:"chip tempo",role:"slider",tabindex:"0","aria-label":"Tempo. Toucher pour le m\xE9tronome, glisser pour changer."},u("b"),u("small",null,u("span",{class:"mi",html:he("metro").outerHTML}),"BPM")),E.key=u("button",{class:"chip","aria-label":"Tonalit\xE9 et gamme",onclick:()=>ns.keyPicker()},u("b"),u("small"));let i=u("div",{class:"top"},E.logo,E.rec,E.play,E.progress,E.tempo,E.key);qo(E.tempo,{get:()=>w.project.tempo,set:t=>{w.set("tempo",t),zs()},step:6,onTap:Hl}),E.parts=u("div",{class:"parts",role:"tablist"});for(let t of["drum","bass","lead"]){let s=u("button",{class:"ptab",role:"tab","data-p":t,onclick:()=>cn(t)},he(t),Ol[t],u("i",{class:"lvl"}),u("i",{class:"mute"}));E.parts.append(s)}E.instName=u("button",{class:"name","aria-label":"Choisir un son",onclick:()=>ns.browser()},u("small"),u("b")),E.prev=u("button",{class:"arrow","aria-label":"Son pr\xE9c\xE9dent",onclick:()=>eo(-1)},he("left")),E.next=u("button",{class:"arrow","aria-label":"Son suivant",onclick:()=>eo(1)},he("right")),E.dice=u("button",{class:"arrow dice","aria-label":"Son au hasard pour cette partie (annulable)",onclick:()=>an(w.ui.part)},he("dice"));let e=u("div",{class:"inst"},E.prev,E.instName,E.next,E.dice);Fl(E.instName),E.view=u("div",{class:"view"}),E.nav=u("nav",{class:"nav",role:"tablist"});for(let[t,s,a]of[["pattern","Pattern","pattern"],["tweaks","Tweaks","tweaks"],["mix","Mix","mix"],["song","Song","song"]])E.nav.append(u("button",{role:"tab","data-v":t,onclick:()=>hn(t)},he(a),s));E.toast=u("div",{class:"toast",role:"status"}),E.wake=u("div",{class:"wake"},u("div",{class:"orb"},he("play")),u("h1",{text:ft.name}),u("p",{text:"Touchez pour activer le son."})),E.wake.addEventListener("click",async()=>{(tt.ctx?await tt.rebuildIfNeeded():await Ss())&&(to(),await nn())}),ws.append(i,E.parts,e,E.view,E.nav),document.body.append(E.toast,E.wake),De=new Aa(w,{onFirstTouch:()=>{tt.running||Ss()}}),Mt=new Ea(w,{onSelect:()=>Ns()}),Fs=new La({get:()=>w.project.parts[w.ui.part].range,set:t=>w.setPart(w.ui.part,"range",t),scale:()=>({scale:w.project.scale,steps:w.project.parts[w.ui.part].steps,key:w.project.key}),onStart:()=>{}}),Tt=new _a(w),ns=new Pa(w,{host:()=>tt,toast:gt,loadBanksFor:oi,ensureAudio:Ss,rollDice:an,previewFluid:ln,fluidStatus:Nl,enableTilt:sn,build:Qi}),te=fr(w,{pad:De,xy:Tt}),te&&(De.fx=te,Tt.fx=te,window.__motifFx=te,w.settings.glassTilt&&sn(!0)),Ne=Mr(w,{pad:De,app:ws,fx:()=>te}),window.__motifHw=Ne,Ne.set(document.documentElement.hasAttribute("data-halloween")),rs=Qr(w,{app:ws,pad:De,timeline:Mt,fx:()=>te,hw:Ne,onPlay:Zi,ensureAudio:Ss,toast:gt}),window.__motifShow=rs}function Fl(i){let e=null;i.addEventListener("pointerdown",t=>{e={x:t.clientX,y:t.clientY,t:performance.now()}}),i.addEventListener("pointerup",t=>{if(!e)return;let s=t.clientX-e.x,a=t.clientY-e.y;e=null,Math.abs(s)>40&&Math.abs(s)>Math.abs(a)*1.5&&(eo(s<0?1:-1),i.dataset.swiped="1",setTimeout(()=>{delete i.dataset.swiped},50))}),i.addEventListener("click",t=>{i.dataset.swiped&&(t.stopImmediatePropagation(),t.preventDefault())},!0)}function zl(){Ss();let i=w.ui;w.send({type:"transport",cmd:i.armed?"disarm":"arm"})}function Zi(){Ss().then(()=>w.send({type:"transport",cmd:w.ui.playing?"stop":"play"}))}var tn=!1;function sn(i){let e=()=>{tn||(tn=!0,window.addEventListener("deviceorientation",s=>{te&&w.settings.glassTilt&&s.gamma!==null&&te.tilt(s.gamma,s.beta)}))},t=window.DeviceOrientationEvent;if(i){t&&e();return}t&&typeof t.requestPermission=="function"?t.requestPermission().then(s=>{s==="granted"?e():(w.setSetting("glassTilt",!1),gt("Mouvements refus\xE9s : les reflets suivent ton doigt"))}).catch(()=>w.setSetting("glassTilt",!1)):t&&e()}function Nl(){let i=te?te.engine():"none";return{"webgpu-hdr":"Actif : WebGPU, \xE9cran HDR \u2014 l\u2019encre et le verre peuvent d\xE9passer le blanc.",webgpu:"Actif : WebGPU (\xE9cran standard : pas de HDR ici).",webgl:"Actif : WebGL (compatibilit\xE9, sans HDR).",none:"Effets fluides indisponibles sur cet appareil."}[i]}function ln(){if(te){if(!w.settings.fluid&&!w.settings.glass){gt("Active le fluide ou le verre pour voir l\u2019aper\xE7u");return}w.ui.view!=="pattern"&&hn("pattern"),setTimeout(()=>{te.place(),setTimeout(()=>te.preview(),120)},320)}}function Hl(){let i=!w.settings.metro;w.setSetting("metro",i),zs(),gt(i?w.settings.metroAlways?"M\xE9tronome activ\xE9":"M\xE9tronome activ\xE9 pendant l\u2019enregistrement":"M\xE9tronome coup\xE9",i?{label:"R\xE9glages",fn:()=>ns.settings()}:null)}async function an(i){let e=w.planRandom(i);for(let s of Do(e))await oi(qe(s));w.applyRandom(e);let t=[];e.kit&&t.push(i==="drum"?e.kit.map(s=>qe(s).name).join(" \xB7 "):"kit "+qe(e.kit[0]).name+"\u2026");for(let s of["bass","lead"])e[s]&&t.push(qe(e[s].preset).name+(e[s].oct?` (${e[s].oct>0?"+":""}${e[s].oct} oct.)`:""));E.instName.classList.remove("flash"),E.instName.offsetWidth,E.instName.classList.add("flash"),gt(t.join(" \xB7 "),{label:"Annuler",fn:()=>{w.undo()&&gt("Sons d\u2019avant r\xE9tablis")}})}function cn(i){if(w.ui.part===i){ns.browser();return}De.releaseAll(),w.ui.part=i,w.ui.group=0,Mt.clear(),ws.dataset.part=i,ii()}function hn(i){De.releaseAll(),Tt.releaseAll(),w.ui.view=i,fn()}function dn(){let i=w.ui;return i.part==="drum"?ms[i.lane]:i.part}function un(){let i=w.project,e=w.ui;return e.part==="drum"?i.parts.drum.kit[e.lane]:i.parts[e.part].preset}async function eo(i){let e=dn(),t=Ot(e),s=t.findIndex(o=>o.id===un()),a=t[(s+i+t.length)%t.length];await Di(a.id)}async function Di(i){let e=qe(i);if(!e)return;await oi(e);let t=w.ui;w.setPreset(t.part,t.lane,i),E.instName.classList.remove("flash"),E.instName.offsetWidth,E.instName.classList.add("flash")}function zs(){let i=w.project,e=w.ui;E.tempo.querySelector("b").textContent=i.tempo,E.tempo.setAttribute("aria-valuenow",i.tempo),E.tempo.classList.toggle("metro",!!w.settings.metro),E.tempo.classList.toggle("live",!!w.settings.metro&&e.playing&&(e.armed||w.settings.metroAlways)),E.key.querySelector("b").textContent=Xt[i.key],E.key.querySelector("small").textContent=$t(i.scale).name.slice(0,9),E.rec.setAttribute("aria-pressed",String(e.armed)),E.rec.classList.toggle("waiting",e.armed&&!e.playing),E.play.setAttribute("aria-pressed",String(e.playing)),E.play.replaceChildren(he(e.playing?"stop":"play")),E.play.setAttribute("aria-label",e.playing?"Arr\xEAter":"Lecture"),E.progress.classList.toggle("rec",e.armed),E.progressBars.childElementCount!==i.bars&&E.progressBars.replaceChildren(...Array.from({length:i.bars},()=>u("i"))),e.playing||(E.progressFill.style.width="0",E.pos.textContent=e.armed?"REC pr\xEAt":`${i.bars} mes.`)}function fa(){let i=w.project;for(let e of E.parts.children){let t=e.dataset.p;e.setAttribute("aria-selected",String(t===w.ui.part));let s=t==="drum"?i.parts.drum.mute.every(Boolean):i.parts[t].mute;e.classList.toggle("muted",s)}}function ai(){let i=w.ui,e=dn(),t=Ot(e),s=un(),a=qe(s),o=t.findIndex(n=>n.id===s),r=a&&a.style?Ct(a.style):null;E.instName.querySelector("small").textContent=`${Bl[e]} \xB7 ${o+1}/${t.length}${r?" \xB7 "+r.short:""}`,E.instName.querySelector("b").textContent=a?a.name:"\u2014",E.instName.setAttribute("aria-label",`Son ${a?a.name:""}, ${o+1} sur ${t.length}. Toucher pour parcourir.`)}function ii(){zs(),fa(),ai(),fn()}var Ts=null;function fn(){let i=w.ui.view;for(let e of E.nav.children)e.setAttribute("aria-selected",String(e.dataset.v===i));Ts&&(Ts(),Ts=null),E.view.replaceChildren(),i==="pattern"?Ul():i==="tweaks"?Wl():i==="mix"?Vl():Yl(),te&&requestAnimationFrame(()=>te.place())}function Ul(){let i=w.ui,e=w.project,t=u("div",{class:"controls"});if(i.part==="drum")for(let s=0;s<4;s++){let a=new Et({label:["Kick","Snare","Hat","Perc"][s],min:()=>0,max:()=>is[s].length-1,get:()=>w.project.parts.drum.rhythm[s],set:o=>{w.setPart("drum","rhythm",o,s)},format:o=>({v:o===0?"1\xD7":String(o).padStart(2,"0"),s:is[s][o].name}),ring:(o,r,n,l)=>Si(o,r,n,is[s][l],null,-1,ti(),si()),onTap:()=>{i.lane=s,ai(),Is.forEach((o,r)=>o.el.classList.toggle("active",r===s))},onStart:()=>{i.lane=s,ai()}});a.el.classList.toggle("active",s===i.lane),t.append(a.el),Is.push(a)}else{let s=i.part,a=!1,o=new Et({label:"Rythme",min:()=>0,max:()=>a?hi(jt[e.parts[s].rhythm]):jt.length-1,get:()=>a?w.project.parts[s].ties:w.project.parts[s].rhythm,set:l=>{if(a)w.setPart(s,"ties",l);else{w.setPart(s,"rhythm",l);let d=hi(jt[l]);w.project.parts[s].ties>d&&w.setPart(s,"ties",d)}},format:l=>{let d=w.project.parts[s],c=jt[d.rhythm];return a?{v:l===0?"OFF":String(l),s:c.len===0?"gliss\xE9":"liaisons",l:"Liaisons",ties:!0}:{v:l===0?"\u221E":String(l).padStart(2,"0"),s:c.name+(d.ties?` \xB7 ${d.ties} liaison${d.ties>1?"s":""}`:""),l:"Rythme"}},ring:(l,d,c)=>{let h=w.project.parts[s],p=jt[h.rhythm];Si(l,d,c,p,mo(p,h.ties),-1,ti(),si())},onTap:()=>{a=!a,o.render()},onSwipeX:l=>{a=l>0,o.render()},step:16}),r=new Et({label:"Degr\xE9s",min:()=>0,max:()=>Ut.length-1,get:()=>Ut.indexOf(w.project.parts[s].steps),set:l=>{w.setPart(s,"steps",Ut[l]),Fs.render(),De.draw()},format:l=>({v:Ut[l]===12?"12":String(Ut[l]),s:Ut[l]===12?"chromatique":Ut[l]===5?"pentatonique":Ut[l]===7?"gamme enti\xE8re":"par octave"}),ring:(l,d,c,h)=>{let p=Ut[h],f=d/2,m=c/2-2,v=Math.min(d,c)/2-8;l.lineWidth=4,l.lineCap="round";for(let g=0;g<p;g++){let b=-Math.PI/2+g/p*Math.PI*2+.06,x=-Math.PI/2+(g+1)/p*Math.PI*2-.06;l.strokeStyle=g===0?ti():si(2),l.beginPath(),l.arc(f,m,v,b,x),l.stroke()}},step:18}),n=new Et({label:"Doigts",min:()=>0,max:()=>ks.length-1,get:()=>ks.findIndex(l=>l[0]===w.project.parts[s].arp),set:l=>w.setPart(s,"arp",ks[l][0]),format:l=>({v:["1\u21922","\u2197","\u2198","\u2261"][l],s:ks[l][1]}),onTap:()=>{let l=(ks.findIndex(d=>d[0]===w.project.parts[s].arp)+1)%ks.length;w.setPart(s,"arp",ks[l][0]),n.render()},step:22});n.el.classList.add("small"),t.append(o.el,r.el,n.el),Is.push(o,r,n)}E.view.append(t),i.part!=="drum"&&E.view.append(Fs.el),E.view.append(De.el),E.undo=u("button",{class:"tbtn small","aria-label":"Annuler",onclick:()=>{w.undo()&&gt("Annul\xE9")}},he("undo")),E.redo=u("button",{class:"tbtn small","aria-label":"R\xE9tablir",onclick:()=>{w.redo()&&gt("R\xE9tabli")}},he("redo")),E.erase=u("button",{class:"tbtn small","aria-label":"Gomme","aria-pressed":String(i.erase),onclick:()=>{w.setErase(!w.ui.erase)}},he("erase")),E.clear=u("button",{class:"tbtn small","aria-label":"Effacer",onclick:Gl},he("trash")),E.view.append(u("div",{class:"timeline"},E.undo,Mt.el,E.erase,E.clear)),requestAnimationFrame(()=>{Is.forEach(s=>s.render()),i.part!=="drum"&&Fs.render(),De.setHint(),De.showHint(!jl()),De.draw(),Mt.draw(),Ns()}),Ts=()=>{Is.length=0,De.releaseAll()}}var Is=[];function jl(){let i=w.pattern,e=w.ui.part;return e==="drum"?i.drum.some(t=>t.hits.length):i[e].notes.length>0}function Ns(){E.erase&&(E.erase.classList.toggle("on",w.ui.erase),E.erase.setAttribute("aria-pressed",String(w.ui.erase)),E.undo.disabled=!w.undoStack.length,E.clear.classList.toggle("on",!!Mt.sel),E.clear.setAttribute("aria-label",Mt.sel?"Effacer la s\xE9lection":"Effacer\u2026"))}function Gl(){let i=w.ui;if(Mt.sel){let e=Mt.sel;w.eraseSpan(i.part,i.part==="drum"?null:void 0,e.t0,e.t1),Mt.clear(),Ns(),gt("Portion effac\xE9e",{label:"Annuler",fn:()=>w.undo()});return}ns.clearMenu()}function Wl(){E.view.append(Tt.groupsEl,Tt.el,Tt.barEl),requestAnimationFrame(()=>Tt.render()),Ts=()=>Tt.releaseAll()}function Vl(){let i=w.project,e=u("div",{class:"mix"}),t=u("div",{class:"faders"}),s=[["drum",0,"Kick","--drum"],["drum",1,"Snare","--drum"],["drum",2,"Hat","--drum"],["drum",3,"Perc","--drum"],["bass",null,"Basse","--bass"],["lead",null,"M\xE9lodie","--lead"]],a=[],o=new Map,r=new Map,n=(v,g)=>{let b=o.get(v);b&&(w.setMute(b.part,b.lane,g),b.upd())};t.addEventListener("pointermove",v=>{let g=r.get(v.pointerId);if(!g)return;let b=document.elementFromPoint(v.clientX,v.clientY),x=b&&b.closest(".m");x&&o.has(x)&&!g.done.has(x)&&(g.done.add(x),n(x,g.v),fa())});let l=v=>r.delete(v.pointerId);t.addEventListener("pointerup",l),t.addEventListener("pointercancel",l);for(let[v,g,b,x]of s){let T=()=>v==="drum"?w.project.parts.drum.level[g]:w.project.parts[v].level,R=()=>v==="drum"?w.project.parts.drum.mute[g]:w.project.parts[v].mute,I=u("div",{class:"fill"}),N=u("div",{class:"meter"}),ie=u("div",{class:"db"}),K=u("button",{class:"m","aria-pressed":String(R()),"aria-label":"Couper "+b,text:"M"}),P=u("div",{class:"fader",style:{"--fc":`var(${x})`},role:"slider","aria-label":"Volume "+b,tabindex:"0"},I,N,u("div",{class:"t",text:b}),ie,K),Z=H=>Math.pow((H+40)/46,1.6),j=()=>{let H=T();I.style.height=Z(H)*100+"%",ie.textContent=(H>0?"+":"")+H.toFixed(1)+" dB",P.classList.toggle("muted",R()),K.setAttribute("aria-pressed",String(R()))},ae=null;P.addEventListener("pointerdown",H=>{if(H.target!==K){H.preventDefault();try{P.setPointerCapture(H.pointerId)}catch{}ae={y:H.clientY,v:T(),t:performance.now()}}}),P.addEventListener("pointermove",H=>{if(!ae)return;let fe=P.getBoundingClientRect().height,G=Z(ae.v)+(ae.y-H.clientY)/fe,U=Math.max(-40,Math.min(6,Math.pow(Math.max(0,Math.min(1,G)),1/1.6)*46-40));w.setLevel(v,g,Math.round(U*2)/2),j()}),P.addEventListener("pointerup",H=>{ae&&Math.abs(H.clientY-ae.y)<4&&performance.now()-ae.t<250&&H.detail===2&&(w.setLevel(v,g,0),j()),ae=null}),P.addEventListener("dblclick",()=>{w.setLevel(v,g,0),j()}),o.set(K,{part:v,lane:g,upd:()=>j()}),K.addEventListener("pointerdown",H=>{H.preventDefault(),H.stopPropagation();let fe=!R();n(K,fe),fa(),r.set(H.pointerId,{v:fe,done:new Set([K])});try{K.releasePointerCapture(H.pointerId)}catch{}}),K.addEventListener("click",H=>{H.detail===0&&(n(K,!R()),fa())}),j(),a.push({part:v,lane:g,meter:N,el:P}),t.append(P)}let d=(v,g,b,x=.02)=>new Et({label:v,min:()=>0,max:()=>50,get:()=>Math.round(w.project.mix[g]/x),set:R=>{w.setMix(g,R*x)},format:R=>({v:b(R*x),s:""}),ring:(R,I,N,ie)=>{let K=I/2,P=N/2-2,Z=Math.min(I,N)/2-8;R.lineWidth=4,R.lineCap="round",R.strokeStyle=si(2),R.beginPath(),R.arc(K,P,Z,Math.PI*.75,Math.PI*2.25),R.stroke(),R.strokeStyle=ti(),R.beginPath(),R.arc(K,P,Z,Math.PI*.75,Math.PI*.75+ie/50*Math.PI*1.5),R.stroke()},step:5}),c=[d("Pump","pump",v=>Math.round(v*100)+""),d("Espace","space",v=>Math.round(v*100)+""),d("Batterie","drumDrive",v=>Math.round(v*100)+"")],h=new Et({label:"Master",min:()=>0,max:()=>36,get:()=>Math.round((w.project.mix.master+18)*1),set:v=>w.setMix("master",v-18),format:v=>({v:(v-18>0?"+":"")+(v-18)+" dB",s:""}),step:6}),p=u("div",{class:"mixknobs"},...c.map(v=>v.el),h.el);e.append(t,p),E.view.append(e),requestAnimationFrame(()=>{c.forEach(v=>v.render()),h.render()});let f=w.on("pos",v=>{if(v.m){for(let g of a){let b=g.part==="drum"?v.m.d[g.lane]:v.m[g.part],x=20*Math.log10(Math.max(b,1e-5));g.meter.style.height=Math.max(0,Math.min(100,(x+48)/48*100))+"%"}te&&te.mixLevels(v.m)}}),m=null;if(te){te.setMix({el:t,faders:a.map(({part:b,lane:x,el:T})=>({part:b,lane:x,el:T}))});let v=b=>x=>{let T=t.getBoundingClientRect();te.press(x.pointerId,(x.clientX-T.left)/T.width,(x.clientY-T.top)/T.height,b)},g=[["pointerdown",v("down")],["pointermove",v("move")],["pointerup",v("up")],["pointercancel",v("cancel")]];for(let[b,x]of g)t.addEventListener(b,x);m=()=>{for(let[b,x]of g)t.removeEventListener(b,x)}}Ts=()=>{f(),m&&m(),te&&te.setMix(null)}}function Yl(){let i=ns.songView();E.view.append(i.el),Ts=i.cleanup}function ti(){return getComputedStyle(ws).getPropertyValue("--accent").trim()}function si(i=1){return document.documentElement.dataset.theme==="dark"?`rgba(255,255,255,${.08*i})`:`rgba(0,0,0,${.08*i})`}var Kl=null,on=-1;function Xl(i){Kl=i;let e=w.project,t=w.ui;if(i.playing&&i.tick>=0){let s=384*e.bars;E.progressFill.style.width=((i.tick+1)/s*100).toFixed(2)+"%";let a=Math.floor(i.tick/384)+1,o=Math.floor(i.tick%384/96)+1;E.pos.textContent=`${a}.${o}`;let r=Math.floor(i.tick/96);r!==on&&(on=r,E.tempo.classList.contains("live")&&(E.tempo.classList.remove("beat","down"),E.tempo.offsetWidth,E.tempo.classList.add("beat"),i.tick%384<96&&E.tempo.classList.add("down")))}if(i.m)for(let s of E.parts.children){let a=s.dataset.p==="drum"?i.m.drum:i.m[s.dataset.p];s.querySelector(".lvl").style.transform=`scaleX(${Math.min(1,Math.sqrt(a||0)*1.1).toFixed(3)})`}if(t.view==="pattern"){let s=e.song.enabled&&e.song.sections.length;De.setClock({tick:i.tick,at:performance.now(),playing:i.playing,msPerTick:6e4/(e.tempo*96),L:384*e.bars,pat:s?e.song.sections[i.sec%e.song.sections.length].p:e.current}),De.onTrig(i.trig,i.m),Mt.setTick(i.playing?i.tick:-1)}t.view==="tweaks"&&Tt.onPos(i),te&&te.level(i),Ne&&Ne.level(i)}function $l(i){switch(i){case"transport":zs(),w.ui.view==="pattern"&&(De.setHint(),Mt.draw()),Ne&&w.ui.armed&&!Zr&&Ne.gasp(),Zr=w.ui.armed;break;case"tempo":case"key":case"scale":case"bars":zs(),w.ui.view==="pattern"&&(Fs.render(),De.draw(),Mt.draw());break;case"preset":ai(),w.ui.view==="tweaks"&&Tt.render(),w.ui.view==="pattern"&&(De.setHint(),De.draw());break;case"notes":w.ui.view==="pattern"&&(Mt.draw(),De.showHint(!1),Ns());break;case"undo":Ns();break;case"erase":Ns(),De.setHint(),De.showHint(!0),De.draw(),w.ui.erase&&gt(w.ui.playing?"Gomme : touche le pad pour effacer pendant la lecture":"Gomme activ\xE9e \u2014 lance la lecture puis touche le pad");break;case"project":case"pattern":ii();break;case"auto":case"macro":w.ui.view==="tweaks"&&Tt.render();break;case"mix":fa(),te&&te.syncScene();break;case"settings:metro":case"settings:metroAlways":zs();break;case"settings:piano":case"settings:ghosts":w.ui.view==="pattern"&&(De.setHint(),De.draw());break;case"settings:glass":document.documentElement.toggleAttribute("data-glass",!!w.settings.glass),te&&te.place();break;case"settings:fluid":case"settings:fluidZone":case"settings:fluidStyle":case"settings:fluidColors":case"settings:fluidInk":case"settings:fluidHdr":case"settings:glassSpill":case"settings:glassLight":case"settings:mixGlass":case"settings:ctrlHeight":case"settings:lightLook":case"settings:hdrLight":case"settings:glassLook":te&&te.place();break;case"settings:fluidEngine":w.save().finally(()=>location.reload());break;case"settings:hwCast":case"settings:hwRelay":Ne&&Ne.refresh();break;case"settings:glassTilt":te&&!w.settings.glassTilt&&te.tilt(null);break;default:i&&i.includes(":range")&&De.draw(),i&&i.endsWith(":steps")&&(Fs.render(),De.draw()),i&&(i.endsWith(":rhythm")||i.endsWith(":ties"))&&Is.forEach(e=>e.render())}}function Jl(){let i=()=>{De&&De.releaseAll(),Tt&&Tt.releaseAll(),w.ui.playing&&w.send({type:"transport",cmd:"stop"}),w.ui.armed&&w.send({type:"transport",cmd:"disarm"}),w.save(),tt.suspend()};document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="hidden")i();else if(tt.ctx){try{await tt.ctx.resume()}catch{}await tt.probe(400)||rn("Son en pause","Touchez pour r\xE9activer le son.")}}),window.addEventListener("pagehide",()=>w.save()),window.addEventListener("beforeunload",()=>w.save());let e=()=>document.documentElement.style.setProperty("--app-h",window.innerHeight+"px");CSS.supports("height","100dvh")||(e(),window.addEventListener("resize",e)),document.addEventListener("gesturestart",t=>t.preventDefault()),document.addEventListener("dblclick",t=>{t.target.closest("input,textarea")||t.preventDefault()},{passive:!1}),document.addEventListener("touchmove",t=>{t.target.closest(".scroll, .sheet .body, .filters")||t.preventDefault()},{passive:!1})}async function Ql(){await w.init(),tt=new Ma({workletUrl:"worklet.js?v="+Qi,onMessage:t=>w.onEngine(t),onState:t=>{(t==="interrupted"||t==="suspended")&&document.visibilityState==="visible"&&w.ui.playing&&rn("Son interrompu","Touchez pour reprendre."),t==="running"&&to()}}),tt.replay=()=>w.engineState(),tt.rebuildIfNeeded=async()=>{try{await tt.ctx.resume()}catch{}return await tt.probe(250)?!0:(gt("Red\xE9marrage du son\u2026"),tt.rebuild())},w.engine=tt,Il(),w.on("change",$l),w.on("pos",Xl),w.on("error",t=>gt(t)),Jl(),window.addEventListener("motif:theme",()=>{Ne&&(Ne.set(document.documentElement.hasAttribute("data-halloween")),Ne.refresh()),ii()}),ii();let i=nn().catch(t=>{window.__motifBankError=String(t&&t.message||t)});(/[?&]diag\b/.test(location.search)||location.hostname==="localhost"&&matchMedia("(display-mode: standalone)").matches)&&Zl(i),er({toast:gt,store:w,build:Qi}),/[?&]fxtest\b/.test(location.search)&&location.hostname==="localhost"&&setTimeout(async()=>{document.querySelectorAll(".wake").forEach(c=>c.remove()),w.settings.glass||w.setSetting("glass",!0);let t=new URLSearchParams(location.search),s=t.get("part"),a=t.get("look"),o=w.settings.glassLook;t.get("theme")==="halloween"&&(document.documentElement.setAttribute("data-halloween",""),document.documentElement.dataset.theme="dark",window.dispatchEvent(new Event("motif:theme")));let r=(t.get("cast")||"").split(",").map(Number);Ne&&r.length===4&&r.every(c=>c>=0&&c<=6)&&(w.settings.hwCast=r,Ne.refresh()),t.has("dance")&&Ne&&setTimeout(()=>Ne.dance(t.get("dance")||"passinho",3),1500),t.has("show")&&rs&&(setTimeout(()=>{w.ui.playing||Zi(),rs.open("test")},1500),setTimeout(()=>{let c=rs.measure(20);fetch("/__log",{method:"POST",body:JSON.stringify({kind:"showtest",ua:navigator.userAgent,engine:te?te.engine():"none",stats:rs.stats,errors:rs.errors.map(h=>String(h).slice(0,300)),gpu:c,dpr:rs.stats.dpr,fluidEma:te&&te.fluid&&te.fluid.ema,hwScale:Ne&&Ne.scale,view:[innerWidth,innerHeight]})}).catch(()=>{})},11e3)),["drum","bass","lead"].includes(s)&&w.ui.part!==s&&(cn(s),await new Promise(c=>setTimeout(c,400))),a&&(w.settings.glassLook=a,te&&te.place(),await new Promise(c=>setTimeout(c,300))),te&&te.fluid&&t.has("m")&&(te.fluid.marginTest=+t.get("m"),te.place()),t.has("ns")&&w.settings.glassSpill&&w.setSetting("glassSpill",!1),!t.has("ns")&&!w.settings.glassSpill&&w.setSetting("glassSpill",!0);let n=te&&te.fluid,l=async c=>{if(!(!t.has("snap")||!n))try{n.render(!0);let h=document.createElement("canvas");h.width=Math.round(n.canvas.width/2),h.height=Math.round(n.canvas.height/2),h.getContext("2d").drawImage(n.canvas,0,0,h.width,h.height),await fetch("/__log",{method:"POST",body:JSON.stringify({kind:"snap",name:c,out:[h.toDataURL("image/png")]})})}catch{}};for(let c=0;c<5;c++)ln(),await new Promise(h=>setTimeout(h,c===1?900:1500)),c===1&&(await l("preview"),await new Promise(h=>setTimeout(h,600)));if(t.has("snap")&&(await new Promise(c=>setTimeout(c,6500)),await l("rest")),t.has("snap")&&t.has("edges")&&n&&n.splat){let c=n.cfg.DENSITY_DISSIPATION;n.cfg.DENSITY_DISSIPATION=0,n.clear();let h=(p,f,m,v,g,b)=>n.splat(p,f,m,v,{r:g[0]*.3,g:g[1]*.3,b:g[2]*.3},b);for(let p=0;p<12;p++)h(.9,.05+p*.08,(p%2?1:-1)*.01,.006,[.45,.05,1],.7);h(.12,.06,.02,.01,[1,.05,.6],.8),h(.14,.35,0,.01,[1,.05,.6],.5),h(.5,.97,.03,-.01,[1,.1,.7],.6),n.applyInputs(),n.render(!1),await new Promise(p=>setTimeout(p,300)),await l("edges"),n.cfg.DENSITY_DISSIPATION=c}a&&(w.settings.glassLook=o,te&&te.place());let d=null;try{n.render(!0);let c=document.createElement("canvas");c.width=n.canvas.width,c.height=n.canvas.height;let h=c.getContext("2d");h.drawImage(n.canvas,0,0);let p=n.off?n.off[0]:0,f=n.off?n.off[1]:0,m=n.hostW||c.width,v=n.hostH||c.height,g=(b,x)=>Array.from(h.getImageData(Math.round(p+b*m),Math.round(f+x*v),1,1).data);d={centre:g(.5,.5),rimLeft:g(.004,.5),bevelLeft:g(.03,.5),cornerOutside:g(.001,.001),top:g(.5,.004),below:g(.5,1.02)}}catch(c){d=String(c)}fetch("/__log",{method:"POST",body:JSON.stringify({kind:"fxtest",ua:navigator.userAgent,engine:te?te.engine():"none",ok:!!(n&&n.ok),glass:w.settings.glass,sceneGlass:!!(n&&n.scene&&n.scene.glass),shaderErrors:n&&n.shaderErrors?n.shaderErrors.map(c=>String(c).slice(0,300)):null,link:n&&n.gl?n.gl.getProgramParameter(n.p.display.p,n.gl.LINK_STATUS):null,format:n&&n.format,extended:n&&n.extended,hdrScreen:n&&n.hdrScreen,gpuCanvas:!!document.querySelector("canvas.fluid"),slow:n&&n.ema,spill:te&&te.spillStats,px:d,hw:Ne&&Ne.on?{ok:Ne.ok,errors:Ne.errors,ema:Ne.ema,scale:Ne.scale}:null})}).catch(()=>{})},2500);let e=()=>{Ss()};window.addEventListener("pointerdown",e,{once:!0,capture:!0})}async function Zl(i){let e=performance.now();await i;let t=getComputedStyle(document.documentElement),s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;visibility:hidden",document.body.append(s);let a=getComputedStyle(s),o=document.getElementById("app").getBoundingClientRect(),r=document.querySelector(".nav").getBoundingClientRect(),n=document.querySelector(".pad")&&document.querySelector(".pad").getBoundingClientRect(),l={kind:"diag",ua:navigator.userAgent,standalone:matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,inner:[innerWidth,innerHeight],vv:window.visualViewport?[visualViewport.width,visualViewport.height]:null,dpr:devicePixelRatio,safe:[a.paddingTop,a.paddingBottom],app:[o.top,o.height],navBottom:r.bottom,padH:n?n.height:null,screen:[screen.width,screen.height],docH:document.documentElement.clientHeight,dvh:(()=>{let f=document.createElement("div");f.style.cssText="position:fixed;height:100dvh;width:1px;top:0",document.body.append(f);let m=f.getBoundingClientRect().height;return f.remove(),m})(),vh:(()=>{let f=document.createElement("div");f.style.cssText="position:fixed;height:100vh;width:1px;top:0",document.body.append(f);let m=f.getBoundingClientRect().height;return f.remove(),m})(),fixedInset:(()=>{let f=document.createElement("div");f.style.cssText="position:fixed;inset:0;",document.body.append(f);let m=f.getBoundingClientRect();return f.remove(),[m.top,m.height]})(),samples:w.engine.samples.size,banks:[...w.engine.loadedBanks],bankError:window.__motifBankError||null,ms:Math.round(performance.now()-e),audioSession:"audioSession"in navigator,worklet:typeof AudioWorkletNode<"u",share:!!navigator.canShare,dvhSupported:CSS.supports("height","100dvh")};s.remove(),fetch("/__log",{method:"POST",body:JSON.stringify(l)}).catch(()=>{});let d=0,c=null;w.on("pos",f=>{c=f,f.trig&&(d+=f.trig.length/4)});let h=Date.now(),p=setInterval(()=>{let f=w.engine.ctx,m={kind:"state",t:Math.round((Date.now()-h)/1e3),ctx:f?f.state:"none",sr:f?f.sampleRate:0,base:f?f.baseLatency:0,out:f&&f.outputLatency,time:f?+f.currentTime.toFixed(2):0,playing:w.ui.playing,armed:w.ui.armed,trig:d,view:w.ui.view,part:w.ui.part,preset:w.presetFor(w.ui.part==="drum"?"d0":w.ui.part).id,notes:w.pattern.lead.notes.length+w.pattern.bass.notes.length+w.pattern.drum.reduce((v,g)=>v+g.hits.length,0),standalone:matchMedia("(display-mode: standalone)").matches,h:innerHeight,master:c&&c.m?+c.m.master.toFixed(3):0};fetch("/__log",{method:"POST",body:JSON.stringify(m)}).catch(()=>{}),Date.now()-h>12e4&&clearInterval(p)},2e3)}Ql().catch(i=>{console.error(i),document.getElementById("app").textContent="Erreur au d\xE9marrage : "+i.message});export{Di as choosePreset,gt as toast};
