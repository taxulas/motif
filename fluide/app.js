var Uo="fluide",Ye=Uo==="fluide"?{id:"fluide",storage:"motif3-fluide",name:"MOTIF Fluide",fluid:!0}:{id:"main",storage:"motif3",name:"MOTIF",fluid:!1};var jo=Ye.storage,Go=1,qs=null;function Wo(){return qs||(qs=new Promise((i,e)=>{let t=indexedDB.open(jo,Go);t.onupgradeneeded=()=>{let s=t.result;s.objectStoreNames.contains("projects")||s.createObjectStore("projects",{keyPath:"id"}),s.objectStoreNames.contains("renders")||s.createObjectStore("renders",{keyPath:"id"}),s.objectStoreNames.contains("files")||s.createObjectStore("files",{keyPath:"id"}),s.objectStoreNames.contains("kv")||s.createObjectStore("kv")},t.onsuccess=()=>{let s=t.result;s.onversionchange=()=>s.close(),i(s)},t.onerror=()=>e(t.error),t.onblocked=()=>e(new Error("Base locale bloqu\xE9e par un autre onglet"))}),qs)}function us(i,e,t){return Wo().then(s=>new Promise((a,o)=>{let r=s.transaction(i,e),n=r.objectStore(i),l;Promise.resolve(t(n)).then(d=>{l=d}),r.oncomplete=()=>a(l),r.onerror=()=>o(r.error),r.onabort=()=>o(r.error||new Error("transaction annul\xE9e"))}))}var ps=i=>new Promise((e,t)=>{i.onsuccess=()=>e(i.result),i.onerror=()=>t(i.error)}),je={put:(i,e,t)=>us(i,"readwrite",s=>ps(t===void 0?s.put(e):s.put(e,t))),get:(i,e)=>us(i,"readonly",t=>ps(t.get(e))),del:(i,e)=>us(i,"readwrite",t=>ps(t.delete(e))),all:i=>us(i,"readonly",e=>ps(e.getAll())),keys:i=>us(i,"readonly",e=>ps(e.getAllKeys()))};async function ni(){try{if(navigator.storage&&navigator.storage.persist)return await navigator.storage.persisted()?!0:await navigator.storage.persist()}catch{}return!1}async function li(){try{if(navigator.storage&&navigator.storage.estimate)return await navigator.storage.estimate()}catch{}return null}var St=["Do","R\xE9\u266D","R\xE9","Mi\u266D","Mi","Fa","Fa\u266F","Sol","La\u266D","La","Si\u266D","Si"];var Cs=[{id:"major",name:"Majeur",iv:[0,2,4,5,7,9,11],minor:!1},{id:"minor",name:"Mineur",iv:[0,2,3,5,7,8,10],minor:!0},{id:"dorian",name:"Dorien",iv:[0,2,3,5,7,9,10],minor:!0},{id:"phrygian",name:"Phrygien",iv:[0,1,3,5,7,8,10],minor:!0},{id:"harmonic",name:"Mineur harmonique",iv:[0,2,3,5,7,8,11],minor:!0},{id:"phrygdom",name:"Phrygien dominant",iv:[0,1,4,5,7,8,10],minor:!1},{id:"mixolydian",name:"Mixolydien",iv:[0,2,4,5,7,9,10],minor:!1},{id:"lydian",name:"Lydien",iv:[0,2,4,6,7,9,11],minor:!1},{id:"melodic",name:"Mineur m\xE9lodique",iv:[0,2,3,5,7,9,11],minor:!0},{id:"hungarian",name:"Hongrois",iv:[0,2,3,6,7,8,11],minor:!0}];function Tt(i){return Cs.find(e=>e.id===i)||Cs[0]}var Yo=[0,4,2,5,1,6,3],Ko=[0,4,2,6,3,1,5],vt=[1,2,3,4,5,6,7,12];function ba(i,e){let t=Tt(i);if(e>=12){let o=[];for(let r=0;r<12;r++){let n=0;for(let l=0;l<7;l++)t.iv[l]<=r&&(n=l);o.push({deg:n,acc:r-t.iv[n],semi:r})}return o}return(t.minor?Ko:Yo).slice(0,Math.max(1,Math.min(7,e))).sort((o,r)=>o-r).map(o=>({deg:o,acc:0,semi:t.iv[o]}))}function ci(i,e,t,s,a=48){let o=Tt(s),r=Math.floor(i/7),n=i-r*7;return a+t+r*12+o.iv[n]+(e||0)}function Mt(i,e,t){let s=Tt(t),a=Math.floor(i/7);return a*12+s.iv[i-a*7]+(e||0)}function nt(i,e,t){let s=ba(e,t),a=s.length,o=Math.floor(i.lo/12)-1,r=0,n=(d,c)=>d*12+s[c].semi;for(;n(o,r)<i.lo;)r++,r>=a&&(r=0,o++);let l=[];for(let d=0;d<i.n;d++){let c=s[r];l.push({deg:o*7+c.deg,acc:c.acc,semi:o*12+c.semi,octave:o,isRoot:c.semi===0&&c.acc===0}),r++,r>=a&&(r=0,o++)}return l}function Vo(i,e){let t=Tt(e),s=Math.floor(i/12),a=i-s*12,o=0;for(let r=0;r<7;r++)t.iv[r]<=a&&(o=r);return{deg:s*7+o,acc:a-t.iv[o]}}var Xo=new Set([1,3,6,8,10]),Dt=.6,$t=.62;function hi(i,e,t,s){let a=nt(i,e,t),o=h=>Xo.has(((s+h)%12+12)%12),r=a[0].semi,n=a[a.length-1].semi;for(;n-r<11;)n++,n-r<11&&r--;o(r)&&r--,o(n)&&n++;let l=new Set(nt({lo:r-12,n:96},e,t).map(h=>h.semi)),d=[],c=0;for(let h=r;h<=n;h++){let f=o(h),{deg:p,acc:m}=Vo(h,e);d.push({semi:h,black:f,pos:c,deg:p,acc:m,inScale:l.has(h),isRoot:(h%12+12)%12===0}),f||c++}return{keys:d,whites:c}}function di(i,e,t){let{keys:s,whites:a}=i;if(t<Dt){for(let r of s)if(r.black&&Math.abs(e-r.pos/a)<$t/a/2)return r}let o=Math.min(a-1,Math.max(0,Math.floor(e*a)));return s.find(r=>!r.black&&r.pos===o)}function $o(i,e,t){let s=ba(e,t),a=Math.floor(i/12),o=null;for(let r=a-1;r<=a;r++)for(let n of s){let l=r*12+n.semi;l<=i&&(o===null||l>o)&&(o=l)}return o===null?i:o}function ui(i,e,t,s){let a=nt(i,e,t),o=a.length?a[a.length-1].semi:i.lo,r=$o(i.lo,e,s),n=0,l=nt({lo:r,n:64},e,s);for(let d of l)if(d.semi<=o+.5)n++;else break;return{lo:r,n:Math.max(1,Math.min(36,n))}}var ya=24;function W(i,e,t=16){let s=e.map(([a,o,r])=>[Math.round(a*ya),Math.max(3,Math.round(o*ya)),r?1:0]);return s.sort((a,o)=>a[0]-o[0]),{name:i,len:t*ya,ev:s}}function st(i,e,t,s,a,o=0,r=16){let n=[];for(let l=0;l<s;l++)n.push([e+l*t,a,o&&l%o===0]);return W(i,n,r)}function _t(i,e,t=384){return{name:i,len:t,ev:e.map(([s,a,o])=>[s,a,o?1:0])}}var gt=[{name:"Libre",len:0,ev:[]},W("Ronde",[[0,15.5,1]]),W("Blanches",[[0,7.5,1],[8,7.5,0]]),W("Noires",[[0,3.2,1],[4,3.2,0],[8,3.2,0],[12,3.2,0]]),st("Croches",0,2,8,1.5,4),st("Doubles",0,1,16,.8,4),W("Point\xE9es",[[0,2.6,1],[3,2.6,0],[6,2.6,0],[9,2.6,0],[12,1.6,1],[14,1.6,0]]),W("Tresillo",[[0,2.6,1],[3,2.6,0],[6,1.6,0],[8,2.6,1],[11,2.6,0],[14,1.6,0]]),W("Contretemps",[[2,1.5,1],[6,1.5,0],[10,1.5,1],[14,1.5,0]]),W("Galop",[[0,1.6,1],[2,.8,0],[3,.8,0],[4,1.6,1],[6,.8,0],[7,.8,0],[8,1.6,1],[10,.8,0],[11,.8,0],[12,1.6,1],[14,.8,0],[15,.8,0]]),W("Deux-pas",[[0,2.5,1],[3,1.5,0],[6,3.5,0],[10,1.5,1],[12,3.5,0]]),W("Dembow",[[0,1.5,1],[3,.9,0],[4,1.5,0],[7,.9,0],[8,1.5,1],[11,.9,0],[12,1.5,0],[15,.9,0]]),_t("Triolets",Array.from({length:12},(i,e)=>[e*32,26,e%3===0])),W("Log drum",[[0,2,1],[3,1,0],[6,2.5,1],[10,1,0],[12,1,0],[14,1.6,1]]),W("Jersey",[[0,2.5,1],[4,2.5,1],[8,1.5,1],[10,2,0],[13,2.5,1]]),st("Arp\xE8ge",0,1,16,.9,3),W("Rafales",[[0,.45,1],[.5,.45,0],[1,.45,0],[1.5,.45,0],[6,1.5,1],[8,.45,1],[8.5,.45,0],[9,.45,0],[9.5,.45,0],[12,1.5,0],[14,1.5,1]])],g=.5,Qo=[{name:"Coup par coup",len:0,ev:[]},W("Quatre temps",[[0,g,1],[4,g,0],[8,g,0],[12,g,0]]),W("Un et trois",[[0,g,1],[8,g,0]]),W("Deux-pas",[[0,g,1],[10,g,0]]),W("Trap",[[0,g,1],[7,g,0],[10,g,0]],16),W("Breakbeat",[[0,g,1],[10,g,0],[16,g,1],[23,g,0],[26,g,0]],32),W("Jersey",[[0,g,1],[4,g,1],[8,g,1],[10,g,0],[13,g,1]]),W("Montagem",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),W("Afro",[[0,g,1],[4,g,0],[7,g,0],[8,g,0],[12,g,0]]),W("Amapiano",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[14,g,0]]),W("Martel\xE9",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[14,g,0],[15,g,0]]),W("Roulant",[[0,g,1],[3,g,0],[4,g,0],[8,g,0],[11,g,0],[12,g,0]]),W("Demi-temps",[[0,g,1],[11,g,0],[19,g,0]],32),W("Syncope",[[0,g,1],[6,g,0],[10,g,0]]),st("Croches",0,2,8,g,4),st("Rouleau",0,1,16,g,4),W("Reggaeton",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[10,g,0]])],Jo=[{name:"Coup par coup",len:0,ev:[]},W("Deux et quatre",[[4,g,1],[12,g,1]]),W("Demi-temps",[[8,g,1]]),W("Dembow",[[3,g,1],[6,g,0],[11,g,1],[14,g,0]]),W("Deux-pas",[[4,g,1],[12,g,1],[15,g,0]]),W("Breakbeat",[[4,g,1],[12,g,1],[20,g,1],[25,g,0],[28,g,1]],32),W("Jersey",[[4,g,1],[12,g,1],[14,g,0],[15,g,0]]),W("Trap",[[8,g,1],[24,g,1],[30,g,0],[31,g,0]],32),W("Funk",[[4,g,1],[7,g,0],[12,g,1],[14,g,0]]),W("Afro",[[4,g,1],[10,g,0],[12,g,1]]),W("Fant\xF4mes",[[4,g,1],[9,g,0],[12,g,1],[15,g,0]]),st("Croches",0,2,8,g,2),W("Rafale",[[12,g,1],[13,g,0],[14,g,0],[15,g,1]]),W("Contretemps",[[2,g,1],[6,g,0],[10,g,1],[14,g,0]]),W("Trois-trois-deux",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0]]),W("Syncop\xE9",[[3,g,1],[10,g,1]]),st("Roulement",0,1,16,g,4)],Zo=[{name:"Coup par coup",len:0,ev:[]},st("Croches",0,2,8,g,2),st("Doubles",0,1,16,g,4),W("Contretemps",[[2,g,1],[6,g,1],[10,g,1],[14,g,1]]),W("Deux-pas",[[0,g,1],[2,g,0],[3,g,0],[6,g,1],[8,g,0],[10,g,1],[11,g,0],[14,g,1]]),_t("Triolets",Array.from({length:12},(i,e)=>[e*32,12,e%3===0])),_t("Roulements",[0,24,48,60,72,96,120,144,156,168,180,192,216,240,264,276,288,312,336,344,352,360,368,376].map((i,e)=>[i,6,i%96===0])),st("Noires",0,4,4,g,1),W("Galop",[[0,g,1],[2,g,0],[3,g,0],[4,g,1],[6,g,0],[7,g,0],[8,g,1],[10,g,0],[11,g,0],[12,g,1],[14,g,0],[15,g,0]]),W("Afro",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0],[15,g,0]]),W("Accents",Array.from({length:16},(i,e)=>[e,g,e%4===2])),_t("Triolets 16",Array.from({length:24},(i,e)=>[e*16,8,e%6===0])),W("Sautill\xE9",[[0,g,1],[3,g,0],[4,g,1],[7,g,0],[8,g,1],[11,g,0],[12,g,1],[15,g,0]]),W("Point\xE9es",[[0,g,1],[3,g,0],[6,g,0],[9,g,0],[12,g,1]]),_t("Rafales",[0,48,96,108,120,132,192,240,288,300,312,324,336,348,360,372].map(i=>[i,6,i%96===0])),W("Clave",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),W("Shuffle",[[0,g,1],[3,g,0],[4,g,1],[7,g,0],[8,g,1],[11,g,0],[12,g,1],[14,g,0],[15,g,0]])],er=[{name:"Coup par coup",len:0,ev:[]},W("Clave son",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),W("Clave rumba",[[0,g,1],[3,g,0],[7,g,0],[10,g,1],[12,g,0]]),W("Tresillo",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0]]),st("Shaker",0,1,16,g,2),W("Tumbao",[[2,g,0],[3,g,1],[6,g,0],[7,g,1],[10,g,0],[11,g,1],[14,g,0],[15,g,1]]),W("Cloche phonk",[[0,g,1],[2,g,0],[3,g,1],[5,g,0],[6,g,1],[8,g,0],[10,g,1],[11,g,0],[13,g,1],[14,g,0]]),_t("Cloche 12/8",[0,2,4,5,7,9,11].map((i,e)=>[i*32,12,e===0])),W("Contretemps",[[2,g,1],[6,g,0],[10,g,1],[14,g,0]]),W("Log",[[3,g,1],[6,g,0],[11,g,1],[14,g,0]]),st("Croches",0,2,8,g,2),st("Noires",0,4,4,g,1),W("Syncope",[[1,g,1],[4,g,0],[7,g,1],[10,g,0],[13,g,1]]),W("Rim deux-pas",[[3,g,0],[7,g,1],[11,g,0],[14,g,1]]),_t("Triolets",Array.from({length:12},(i,e)=>[e*32,12,e%3===0])),_t("Rafales",[288,300,312,324,336,348,360,372].map((i,e)=>[i,6,e===0])),W("Montagem",[[0,g,1],[3,g,0],[6,g,1],[8,g,0],[10,g,1],[12,g,0],[14,g,1]])],Pt=[Qo,Jo,Zo,er];function pi(i,e){let t=i.ev.length;if(!e||t<2)return[];let s=Math.min(e,t-1),a=[];for(let o=0;o<s;o++){let r=Math.round((o+1)*t/(s+1));r<1&&(r=1),r>t-1&&(r=t-1),a.includes(r)||a.push(r)}return a}function xa(i){return Math.max(0,i.ev.length-1)}var fi=[1,2,4,8];var Ot={lo:-24,hi:36,maxN:24,maxSemis:37};function Os(i,e,t=Ot){let s=ba(i,e),a=[];for(let o=Math.floor(t.lo/12);o<=Math.ceil(t.hi/12);o++)for(let r of s){let n=o*12+r.semi;n>=t.lo&&n<t.hi&&a.push(n)}return a.sort((o,r)=>o-r)}function ka(i,e,t,s,a=Ot){let o=Os(t,s,a),r=0,n=1/0;o.forEach((d,c)=>{let h=Math.abs(d-e);h<n&&(n=h,r=c)});let l=Math.min(i.n,o.length);return r=Math.max(0,Math.min(o.length-l,r)),{lo:o[r],n:l}}function wa(i,e,t,s,a,o=Ot){let r=Os(s,a,o),n=nt(i,s,a),l=n[0].semi,d=n[n.length-1].semi,c=r[0],h=1/0;for(let m of r){let v=Math.abs(m-t);v<h&&(h=v,c=m)}let f=(m,v)=>r.filter(b=>b>=m&&b<=v).length;if(e==="left"){let m=Math.min(c,d);return m=Math.max(m,d-o.maxSemis+1),{lo:m,n:Math.min(o.maxN,Math.max(1,f(m,d)))}}let p=Math.max(c,l);return p=Math.min(p,l+o.maxSemis-1),{lo:l,n:Math.min(o.maxN,Math.max(1,f(l,p)))}}var vi="motif-3",tr=3;function It(){let i=new Uint8Array(8);return crypto.getRandomValues(i),Array.from(i,e=>e.toString(16).padStart(2,"0")).join("")}function Lt(i="A"){return{name:i,drum:[{hits:[]},{hits:[]},{hits:[]},{hits:[]}],bass:{notes:[]},lead:{notes:[]},auto:{},gest:{bass:[],lead:[],drum:[]}}}function Rt(i={}){let e=Date.now();return{format:vi,v:tr,id:It(),name:i.name||"Nouvelle id\xE9e",created:e,updated:e,tempo:i.tempo||120,swing:50,key:i.key??2,scale:i.scale||"minor",bars:2,parts:{drum:{kit:i.kit||[null,null,null,null],macros:[null,null,null,null],rhythm:[1,1,1,4],mute:[!1,!1,!1,!1],level:[0,0,0,0]},bass:{preset:i.bass||null,macros:null,rhythm:4,ties:0,steps:5,range:{lo:-12,n:8},arp:"order",q:24,mute:!1,level:0},lead:{preset:i.lead||null,macros:null,rhythm:5,ties:0,steps:5,range:{lo:0,n:10},arp:"order",q:24,mute:!1,level:0}},mix:{drum:0,bass:0,lead:0,pump:.3,master:0,space:.5,drumDrive:.15,drumSpace:.1},patterns:[Lt("A")],current:0,song:{enabled:!1,sections:[]}}}var le=(i,e,t,s)=>{let a=Number(i);return Number.isFinite(a)?Math.min(s,Math.max(t,a)):e};function qt(i){if(!i||typeof i!="object")throw new Error("Fichier de projet illisible");if(i.format&&i.format!==vi)throw new Error("Format de projet inconnu");let t=Rt();t.id=typeof i.id=="string"?i.id.slice(0,40):It(),t.name=typeof i.name=="string"&&i.name.trim()?i.name.slice(0,80):"Sans titre",t.created=le(i.created,Date.now(),0,1e15),t.updated=le(i.updated,Date.now(),0,1e15),t.tempo=le(i.tempo,120,40,220),t.swing=le(i.swing,50,50,75),t.key=le(i.key,0,0,11)|0,t.scale=typeof i.scale=="string"?i.scale:"minor",t.bars=[1,2,4,8].includes(i.bars)?i.bars:2;let s=i.parts||{};if(s.drum){let r=s.drum;t.parts.drum.kit=[0,1,2,3].map(n=>r.kit&&typeof r.kit[n]=="string"?r.kit[n]:null),t.parts.drum.macros=[0,1,2,3].map(n=>r.macros&&Array.isArray(r.macros[n])?r.macros[n].slice(0,7).map(l=>l===null?null:le(l,.5,0,1)):null),t.parts.drum.rhythm=[0,1,2,3].map(n=>le(r.rhythm&&r.rhythm[n],1,0,16)|0),t.parts.drum.mute=[0,1,2,3].map(n=>!!(r.mute&&r.mute[n])),t.parts.drum.level=[0,1,2,3].map(n=>le(r.level&&r.level[n],0,-40,6))}for(let r of["bass","lead"]){let n=s[r];if(!n)continue;let l=t.parts[r];l.preset=typeof n.preset=="string"?n.preset:null,l.macros=Array.isArray(n.macros)?n.macros.slice(0,7).map(d=>d===null?null:le(d,.5,0,1)):null,l.rhythm=le(n.rhythm,l.rhythm,0,16)|0,l.ties=le(n.ties,0,0,24)|0,l.steps=[1,2,3,4,5,6,7,12].includes(n.steps)?n.steps:l.steps,n.range&&(l.range={lo:le(n.range.lo,l.range.lo,-36,48)|0,n:le(n.range.n,l.range.n,1,36)|0}),l.arp=["order","up","down","chord"].includes(n.arp)?n.arp:"order",l.q=[6,12,24,48].includes(n.q)?n.q:24,l.mute=!!n.mute,l.level=le(n.level,0,-40,6)}if(i.mix)for(let r of Object.keys(t.mix))i.mix[r]!==void 0&&(t.mix[r]=le(i.mix[r],t.mix[r],-40,12));let a=384*t.bars,o=Array.isArray(i.patterns)&&i.patterns.length?i.patterns.slice(0,8):[Lt("A")];return t.patterns=o.map((r,n)=>{let l=Lt(typeof r.name=="string"?r.name.slice(0,12):String.fromCharCode(65+n));for(let d=0;d<4;d++){let c=r.drum&&r.drum[d]&&Array.isArray(r.drum[d].hits)?r.drum[d].hits:[];l.drum[d].hits=c.filter(h=>h&&h.t>=0&&h.t<a).slice(0,4e3).map(h=>({t:h.t|0,v:le(h.v,.8,0,1),x:le(h.x,1,0,2)|0,c:le(h.c,.5,0,1)}))}for(let d of["bass","lead"]){let c=r[d]&&Array.isArray(r[d].notes)?r[d].notes:[];l[d].notes=c.filter(h=>h&&h.t>=0&&h.t<a).slice(0,4e3).map(h=>({t:h.t|0,d:le(h.d,24,1,a)|0,deg:le(h.deg,0,-60,60)|0,acc:le(h.acc,0,-2,2)|0,v:le(h.v,.8,0,1),tie:!!h.tie,...typeof h.y=="number"?{y:le(h.y,.5,0,1)}:{}}))}if(r.gest&&typeof r.gest=="object")for(let d of["bass","lead","drum"]){let c=Array.isArray(r.gest[d])?r.gest[d]:[],h=2e4;l.gest[d]=[];for(let f of c){if(!f||!Array.isArray(f.p)||h<=0)continue;let p=f.p.filter(m=>Array.isArray(m)&&m[0]>=0&&m[0]<a).slice(0,h).map(m=>d==="drum"?[Math.round(le(m[0],0,0,a)*10)/10,le(m[1],.5,0,1),le(m[2],.5,0,1)]:[Math.round(le(m[0],0,0,a)*10)/10,le(m[1],.5,0,1),le(m[2],.5,0,1),le(m[3],0,-60,60)|0,le(m[4],0,-2,2)|0]);p.length&&(h-=p.length,l.gest[d].push(d==="drum"?{l:le(f.l,0,0,3)|0,p}:{p}))}}if(r.auto&&typeof r.auto=="object"){for(let d of["d0","d1","d2","d3","bass","lead"])if(r.auto[d])for(let c=0;c<7;c++){let h=r.auto[d][c];if(Array.isArray(h)&&h.length){l.auto[d]=l.auto[d]||{};let f=a/12;l.auto[d][c]=Array.from({length:f},(p,m)=>{let v=h[m];return v==null||v<0?-1:le(v,-1,0,1)})}}}return l}),t.current=le(i.current,0,0,t.patterns.length-1)|0,i.song&&Array.isArray(i.song.sections)&&(t.song.sections=i.song.sections.slice(0,64).map(r=>({p:le(r.p,0,0,t.patterns.length-1)|0,reps:le(r.reps,1,1,16)|0,mute:r.mute&&typeof r.mute=="object"?{d0:!!r.mute.d0,d1:!!r.mute.d1,d2:!!r.mute.d2,d3:!!r.mute.d3,bass:!!r.mute.bass,lead:!!r.mute.lead}:{}})),t.song.enabled=!!i.song.enabled&&t.song.sections.length>0),t}function gi(i,e){let t=384*i.bars,s=384*e;if(e!==i.bars){for(let a of i.patterns){let o=(r,n)=>{if(s>t){let l=[];for(let d=t;d<s;d+=t)for(let c of r)c.t+d<s&&l.push(n(c,d));return r.concat(l)}return r.filter(l=>l.t<s).map(l=>l.d&&l.t+l.d>s?{...l,d:s-l.t}:l)};for(let r=0;r<4;r++)a.drum[r].hits=o(a.drum[r].hits,(n,l)=>({...n,t:n.t+l}));for(let r of["bass","lead"])a[r].notes=o(a[r].notes,(n,l)=>({...n,t:n.t+l}));if(a.gest)for(let r of["bass","lead","drum"]){let n=a.gest[r]||[];if(s>t){let l=[];for(let d=t;d<s;d+=t)for(let c of n)l.push({...c,p:c.p.map(h=>[h[0]+d,...h.slice(1)])});a.gest[r]=n.concat(l)}else a.gest[r]=n.map(l=>({...l,p:l.p.filter(d=>d[0]<s)})).filter(l=>l.p.length)}for(let r in a.auto)for(let n in a.auto[r]){let l=a.auto[r][n],d=s/12;a.auto[r][n]=Array.from({length:d},(c,h)=>l[h%l.length])}}i.bars=e}}function Sa(i,e,t,s,a,o=!0){if(sr(i,e,e==="drum"?t:void 0,s,a),e==="drum"){let r=t==null?[0,1,2,3]:[t];for(let n of r)i.drum[n].hits=i.drum[n].hits.filter(l=>l.t<s||l.t>=a);if(o)for(let n of r)mi(i,"d"+n,s,a)}else i[e].notes=i[e].notes.filter(r=>r.t<s||r.t>=a),o&&mi(i,e,s,a)}function sr(i,e,t,s,a){if(!i.gest||!i.gest[e])return;let o=[];for(let r of i.gest[e]){if(e==="drum"&&t!==void 0&&t!==null&&r.l!==t){o.push(r);continue}let n=r.p.filter(d=>d[0]<s),l=r.p.filter(d=>d[0]>=a);if(n.length===r.p.length){o.push(r);continue}for(let d of[n,l])d.length&&o.push({...r,p:d})}i.gest[e]=o}function mi(i,e,t,s){let a=i.auto[e];if(a){for(let o in a){let r=a[o];for(let n=Math.floor(t/12);n<Math.ceil(s/12)&&n<r.length;n++)r[n]=-1;r.every(n=>n<0)&&delete a[o]}Object.keys(a).length||delete i.auto[e]}}function yi(i,e,t){i.range=ui(i.range,t,i.steps,e),i.steps=e}function Ta(i){return i.drum.reduce((e,t)=>e+t.hits.length,0)+i.bass.notes.length+i.lead.notes.length}var ar=[{name:"Court",off:{bodyDecay:-1,boomDecay:-1,smpDecay:-1.5}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8,boomDecay:.6,smpDecay:.6}}],ir=[{name:"Frappe",def:.5,map:[["click",-.3,.45],["pAmt",-10,10],["clickTone",-.6,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1.2],["boomDecay",-1,1]]}],or={name:"Couleur",def:.6,map:[["tone",-2.6,0],["drive",-.12,.3]]},me=(i,e,t,s={})=>({id:"kick."+i,name:e,style:s.style||null,desc:s.desc||"",p:{kind:0,...t},samples:s.samples,variants:s.variants||ar,macros:s.macros||ir,expr:s.expr||or,trim:s.trim||0}),bi=[["vd-kick-2-1",0,70],["vd-kick-3-1",71,104],["vd-kick-4-1",105,127],["vd-kick-4-2",105,127]],xi=[me("rond","Rond",{freq:50,pAmt:26,pDecay:.045,bodyDecay:.42,click:.3,clickTone:3200,drive:.15,driveType:3},{desc:"Rond et polyvalent, attaque douce"}),me("club","Club",{freq:53,pAmt:34,pDecay:.03,pAmt2:14,pDecay2:.003,bodyDecay:.34,bodyShape:.2,click:.5,clickTone:4500,drive:.3,driveType:1},{desc:"Punch de club, m\xE9dium pr\xE9sent"}),me("profond","Profond",{freq:43,pAmt:22,pDecay:.06,bodyDecay:.6,boom:.35,boomDecay:.9,click:.18,tone:6e3},{desc:"Grave profond, queue souple"}),me("808","808 long",{freq:46,pAmt:18,pDecay:.028,bodyDecay:.35,boom:.85,boomDecay:1.6,click:.22,clickTone:2500,drive:.12},{desc:"Grosse caisse 808 tenue",macros:[{name:"Glisse",def:.35,map:[["pDecay",-1,2.2],["pAmt",-6,14]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,1.2],["boom",-.4,.15]]}]}),me("feutre","Feutr\xE9",{freq:56,pAmt:14,pDecay:.05,bodyDecay:.28,click:.08,tone:2200,drive:.25,driveType:3},{desc:"Mat, chaud, presque acoustique"}),me("acoustique","Acoustique",{freq:52,pAmt:10,pDecay:.04,bodyDecay:.22,bodyLevel:.35,click:0,smpLevel:1.05,smpDecay:2},{desc:"Grosse caisse de batterie jazz, prises Virtuosity Drums",samples:bi,macros:[{name:"Peau \u2194 Sub",def:.3,map:[["smpLevel",.15,-.6],["bodyLevel",-.25,.6]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.7,map:[["tone",-2.6,0],["drive",0,.35]]}}),me("sec","Sec",{freq:62,pAmt:30,pDecay:.018,bodyDecay:.16,click:.6,clickTone:5e3},{desc:"Tr\xE8s court, net, rapide"}),me("concert","Grosse caisse",{freq:45,pAmt:6,pDecay:.05,bodyDecay:.7,bodyLevel:.4,click:0,smpLevel:1.1,smpDecay:2.5},{desc:"Grosse caisse d\u2019orchestre (VCSL), ample",samples:[["vcsl-bassdrum"]],macros:[{name:"Ampleur",def:.5,map:[["smpDecay",-1.6,1],["bodyLevel",-.3,.4]]},{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]}]}),me("sature","Satur\xE9",{freq:54,pAmt:32,pDecay:.035,bodyDecay:.32,drive:.65,driveType:1,click:.4,tone:12e3},{desc:"Saturation franche, attaque mordante",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.28],["tone",-1,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),me("rebond","Rebond",{freq:50,pAmt:24,pDecay:.095,bodyDecay:.5,click:.25},{desc:"Chute de hauteur lente, \xE9lastique"}),me("sub","Sub",{freq:41,pAmt:10,pDecay:.04,bodyDecay:.8,click:.06,tone:3e3},{desc:"Presque une note de sub"}),me("clic","Clic",{freq:55,pAmt:28,pDecay:.014,bodyDecay:.3,click:1,clickTone:7e3,clickDecay:.0018},{desc:"Clic aigu tr\xE8s pr\xE9cis"}),me("vinyle","Vinyle",{freq:54,pAmt:16,pDecay:.04,bodyDecay:.3,bodyLevel:.6,crush:.3,tone:4e3,drive:.3,driveType:3,smpLevel:.8,smpDecay:1},{desc:"Kick poussi\xE9reux, micro lo-fi",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.25,.4],["tone",.6,-1]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]}),me("909","Neuf-z\xE9ro",{freq:54,pAmt:30,pDecay:.03,bodyDecay:.3,bodyShape:.45,click:.55,clickTone:6e3,clickDecay:.006},{desc:"Analogique techno, l\xE9g\xE8rement carr\xE9"}),me("boom","Boom",{freq:47,pAmt:22,pDecay:.04,bodyDecay:.3,boom:.55,boomDecay:1.1,drive:.2},{desc:"Hip-hop ample, queue tenue"}),me("papier","Papier",{freq:65,pAmt:20,pDecay:.02,bodyDecay:.14,click:.45,clickTone:1600,tone:4e3},{desc:"Sec et mat, comme un carton"}),me("plie","Pli\xE9",{freq:50,pAmt:30,pDecay:.03,bodyDecay:.4,drive:.45,driveType:2,tone:8e3},{desc:"Repliement d\u2019onde : grain harmonique",macros:[{name:"Pli",def:.4,map:[["drive",-.3,.45]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),me("cajon","Caj\xF3n",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse en bois frapp\xE9e (VCSL)",samples:[["vcsl-cajon-bass",0,127,0],["vcsl-cajon-mid",0,127,1],["vcsl-cajon-slap",0,127,2]],variants:[{name:"Basse"},{name:"Milieu"},{name:"Claque"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),me("cadre","Tambour sur cadre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Frame drum (VCSL), grave et feutr\xE9",samples:[["vcsl-frame-lo",0,127,0],["vcsl-frame-mute",0,127,1],["vcsl-frame-hi",0,127,2]],variants:[{name:"Ouvert"},{name:"\xC9touff\xE9"},{name:"Petit"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,3]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),me("tom","Tom grave",{freq:68,pAmt:7,pDecay:.05,bodyDecay:.45,bodyLevel:.45,click:0,smpLevel:1,smpDecay:2},{desc:"Tom basse de batterie + sous-couche synth\xE9tique",samples:[["vd-ltom-8",0,90],["vd-ltom-14",91,127]],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}]}),me("montagem","Montagem",{freq:50,pAmt:40,pDecay:.032,pAmt2:18,pDecay2:.003,bodyDecay:.45,bodyShape:.5,drive:.85,driveType:1,click:.5,tone:1e4,boom:.3,boomDecay:.7},{style:"phonk",desc:"\xC9cr\xEAt\xE9, agressif, pens\xE9 pour la montagem",macros:[{name:"\xC9cr\xEAtage",def:.5,map:[["drive",-.4,.15],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boom",-.3,.4],["boomDecay",-1,1]]}]}),me("garage","Garage",{freq:56,pAmt:28,pDecay:.028,bodyDecay:.26,click:.45,clickTone:5200,drive:.18,bodyShape:.15},{style:"ukg",desc:"Court et rebondi pour le 2-step"}),me("afroprofond","Afro profond",{freq:44,pAmt:16,pDecay:.06,bodyDecay:.5,click:.12,clickTone:2200,drive:.2,driveType:3,boom:.35,boomDecay:1,tone:5e3},{style:"afro",desc:"Profond, chaud, laisse respirer"}),me("pianofeutre","Piano feutre",{freq:51,pAmt:15,pDecay:.045,bodyDecay:.24,click:.14,tone:3200,drive:.15,driveType:3},{style:"amapiano",desc:"Discret, laisse la place au log drum"}),me("perreo","Perreo",{freq:57,pAmt:30,pDecay:.035,bodyDecay:.34,bodyShape:.25,click:.4,clickTone:3800,drive:.32,driveType:0},{style:"reggaeton",desc:"Rond et dense pour le dembow"}),me("jersey","Jersey",{freq:60,pAmt:44,pDecay:.02,pAmt2:12,pDecay2:.002,bodyDecay:.22,click:.75,clickTone:6e3,drive:.38,driveType:1},{style:"jersey",desc:"Tr\xE8s articul\xE9 pour les rafales"}),me("break","Break",{freq:55,pAmt:26,pDecay:.02,bodyDecay:.18,bodyLevel:.5,click:.2,drive:.25,smpLevel:1,smpDecay:.35},{style:"dnb",desc:"Acoustique serr\xE9 + sub court",samples:bi,macros:[{name:"Peau \u2194 Sub",def:.45,map:[["smpLevel",.1,-.6],["bodyLevel",-.3,.5]]},{name:"Longueur",def:.5,map:[["smpDecay",-1,2],["bodyDecay",-1,1]]}]}),me("808rage","808 rage",{freq:45,pAmt:24,pDecay:.03,bodyDecay:.4,boom:.95,boomDecay:1.9,bodyShape:.35,drive:.55,driveType:0,click:.3,tone:9e3},{style:"rage",desc:"808 satur\xE9e et tenue",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.35],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,.8]]}]}),me("rumble","Rumble",{freq:45,pAmt:38,pDecay:.025,bodyDecay:.28,drive:.9,driveType:0,boom:.75,boomDecay:.9,click:.45,tone:5e3,hp:35},{style:"hardtechno",desc:"Kick dur avec tra\xEEne grave satur\xE9e",macros:[{name:"Rumble",def:.5,map:[["boom",-.5,.35],["boomDecay",-1,.8]]},{name:"Duret\xE9",def:.5,map:[["drive",-.4,.15],["click",-.3,.4]]}]}),me("poussiere","Poussi\xE8re",{freq:52,pAmt:18,pDecay:.05,bodyDecay:.4,click:.2,tone:1600,crush:.4,drive:.3,driveType:3,smpLevel:.6,smpDecay:1},{style:"triphop",desc:"\xC9touff\xE9 et granuleux, tempo lent",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.35,.45],["tone",1,-.6],["drive",-.2,.3]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]})];var rr=[{name:"Fant\xF4me",off:{level:-9,noiseDecay:-.7,bodyDecay:-.5,smpDecay:-1}},{name:"Normal"},{name:"Ouvert",off:{noiseDecay:.8,bodyDecay:.4,revSend:.1,smpDecay:.8}}],nr=[{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1],["noiseTone",-.8,.8]]}],lr={name:"Claquant",def:.5,map:[["snap",-.3,.45],["drive",-.05,.3]]},cr=[{name:"Serr\xE9",off:{bursts:-1,noiseDecay:-.8}},{name:"Normal"},{name:"Large",off:{bursts:1,noiseDecay:.7,width:.3,revSend:.15}}],hr=[{name:"Mains",def:.5,map:[["burstGap",-.6,.6],["bursts",-1,2]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["revSend",-.05,.3]]}],dr={name:"\xC9clat",def:.5,map:[["noiseTone",-.5,.6],["drive",-.05,.3]]},ur=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.6]]}],pr={name:"Couleur",def:.6,map:[["tone",-2.3,0],["drive",-.05,.3]]},ve=(i,e,t,s={})=>({id:"snare."+i,name:e,style:s.style||null,desc:s.desc||"",p:{kind:1,freq:190,...t},samples:s.samples,variants:s.variants||(t.kind===2?cr:rr),macros:s.macros||(t.kind===2?hr:t.kind===7?ur:nr),expr:s.expr||(t.kind===2?dr:t.kind===7?pr:lr),trim:s.trim||0}),Ma=[["vd-snare-8",0,50],["vd-snare-16",51,80],["vd-snare-24",81,100],["vd-snare-32",101,117],["vd-snare-36",118,127]],Bs=[["vd-xstick-6",0,60],["vd-xstick-12",61,100],["vd-xstick-16",101,127]],Is=[["vcsl-clap-1"],["vcsl-clap-2"],["vcsl-clap-3"]],Fs=(i,e)=>i.map(([t,s=0,a=127])=>[t,s,a,e]),ki=[ve("classique","Classique",{pAmt:6,pDecay:.03,bodyDecay:.1,body2:.5,ratio2:1.62,noiseLevel:.8,noiseTone:9e3,noiseHP:800,noiseDecay:.2,snap:.5,clickTone:4500},{desc:"Caisse claire analogique \xE9quilibr\xE9e"}),ve("clap808","Clap 808",{kind:2,noiseLevel:1,noiseTone:1150,noiseQ:.4,noiseHP:600,noiseDecay:.18,bursts:4,burstGap:.0085,width:.4},{desc:"Clap analogique classique"}),ve("rim","Rimshot",{kind:4,freq:520,mdMat:7,bodyDecay:.13,mdHard:.9,click:.35,clickTone:3500},{desc:"Cercle de caisse claire, bois\xE9 et court",macros:[{name:"Accord",def:.5,map:[["tune",-5,5]]},{name:"R\xE9sonance",def:.4,map:[["bodyDecay",-1,1.4]]}],expr:{name:"Frappe",def:.6,map:[["mdHard",-.4,.1],["click",-.3,.15],["level",2.5,-2]]}}),ve("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse claire jazz (Virtuosity Drums) : cross-stick, centre, buzz",samples:[...Fs(Bs,0),...Fs(Ma,1),["vd-buzz-6",0,80,2],["vd-buzz-12",81,127,2]],variants:[{name:"Cross-stick"},{name:"Centre"},{name:"Buzz"}]}),ve("sanstimbre","Sans timbre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Timbre rel\xE2ch\xE9 : son de tom sec",samples:[["vd-snoff-6",0,80],["vd-snoff-12",81,127]],variants:[{name:"Grave",off:{smpTune:-3}},{name:"Normal"},{name:"Aigu",off:{smpTune:3}}]}),ve("fantome","Fant\xF4me",{freq:210,pAmt:4,bodyDecay:.06,noiseLevel:.5,noiseTone:7e3,noiseHP:1200,noiseDecay:.09,snap:.2,level:-3},{desc:"L\xE9ger, pour les notes fant\xF4mes"}),ve("crepitant","Cr\xE9pitant",{pAmt:5,bodyDecay:.12,bodyLevel:.6,noiseLevel:1,noiseTone:6e3,noiseHP:400,noiseDecay:.45,crush:.15,snap:.3},{desc:"Longue queue de grain"}),ve("clapserre","Clap serr\xE9",{kind:2,noiseLevel:1,noiseTone:1600,noiseQ:.35,noiseHP:700,noiseDecay:.08,bursts:2,burstGap:.005,width:.25},{desc:"Clap court et pr\xE9cis"}),ve("claplarge","Clap large",{kind:2,noiseLevel:1,noiseTone:1050,noiseQ:.25,noiseHP:500,noiseDecay:.4,bursts:5,burstGap:.011,width:1,revSend:.25},{desc:"Clap ample en st\xE9r\xE9o"}),ve("doigts","Claquement",{kind:2,noiseLevel:1.1,noiseTone:2600,noiseQ:.7,noiseHP:1500,noiseDecay:.05,bursts:1,burstGap:.004,width:.1},{desc:"Claquement de doigts sec"}),ve("mains","Mains",{kind:7,smpLevel:1,smpDecay:3},{desc:"Vrais claps (VCSL) : seul, groupe, groupe en salle",samples:[["vcsl-soloclap-2",0,90,0],["vcsl-soloclap-3",91,127,0],...Fs(Is,1),...Fs(Is,2)],variants:[{name:"Seul"},{name:"Groupe"},{name:"Salle",off:{revSend:.3}}]}),ve("lofi","Lo-fi",{pAmt:8,bodyDecay:.1,body2:.4,noiseLevel:.85,noiseTone:7e3,noiseHP:900,noiseDecay:.18,crush:.5,tone:5e3,snap:.3},{desc:"\xC9chantillonneur vieilli, 8 bits",macros:[{name:"Usure",def:.5,map:[["crush",-.35,.35],["tone",.8,-.8]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1]]}]}),ve("metal","M\xE9tal",{freq:240,pAmt:3,bodyDecay:.35,body2:.9,ratio2:2.31,noiseLevel:.6,noiseTone:9e3,noiseHP:1500,noiseDecay:.16,snap:.4},{desc:"R\xE9sonance m\xE9tallique accord\xE9e",macros:[{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.2,1],["body2",-.5,.1]]},{name:"Accord",def:.5,map:[["tune",-6,6]]}]}),ve("tomsnare","Tom-caisse",{freq:160,pAmt:12,pDecay:.05,bodyDecay:.22,body2:.3,ratio2:1.5,noiseLevel:.35,noiseTone:6e3,noiseHP:700,noiseDecay:.12},{desc:"Tonal, \xE0 mi-chemin du tom"}),ve("balai","Balai",{bodyLevel:.15,bodyDecay:.05,noiseLevel:.9,noiseTone:5e3,noiseHP:1200,noiseDecay:.3,noiseAttack:.03,snap:0},{desc:"Frottement de balai, attaque lente",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.5,1.2],["noiseDecay",-.7,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.8],["noiseHP",-.6,.6]]}]}),ve("electro","\xC9lectro",{freq:230,pAmt:18,pDecay:.02,bodyDecay:.12,noiseLevel:.9,noiseTone:12e3,noiseHP:1800,noiseDecay:.16,snap:.8,clickTone:6e3,drive:.3,driveType:1},{desc:"Brillant, chute de hauteur rapide"}),ve("snareclap","Caisse + clap",{pAmt:6,bodyDecay:.1,body2:.4,noiseLevel:.6,noiseTone:8e3,noiseHP:1e3,noiseDecay:.16,snap:.3,smpLevel:.7,smpDecay:2},{desc:"Caisse synth\xE9tique doubl\xE9e de vrais claps",samples:Is,macros:[{name:"Caisse \u2194 Clap",def:.5,map:[["smpLevel",-.5,.5],["noiseLevel",.3,-.4],["bodyLevel",.2,-.5]]},{name:"Queue",def:.5,map:[["noiseDecay",-1,1],["smpDecay",-2.5,.5],["revSend",-.05,.25]]}]}),ve("ressort","Ressort",{freq:180,pAmt:9,pDecay:.06,bodyDecay:.6,body2:.7,ratio2:1.45,noiseLevel:.5,noiseTone:7e3,noiseHP:900,noiseDecay:.25,drive:.2},{desc:"Corps qui sonne longtemps"}),ve("roulement","Roulement",{kind:7,smpLevel:1,smpDecay:3},{desc:"Buzz de caisse claire (roul\xE9 press\xE9)",samples:[["vd-buzz-6",0,80],["vd-buzz-12",81,127]]}),ve("crossstick","Cross-stick",{kind:7,smpLevel:1,smpDecay:3},{desc:"Baguette pos\xE9e sur le cercle",samples:Bs}),ve("clapmontagem","Clap montagem",{kind:2,noiseLevel:1,noiseTone:1400,noiseQ:.3,noiseHP:600,noiseDecay:.2,bursts:3,burstGap:.007,drive:.8,driveType:1,width:.4},{style:"phonk",desc:"Clap \xE9cras\xE9, tr\xE8s pr\xE9sent"}),ve("garage","Garage snare",{freq:220,pAmt:8,bodyDecay:.07,noiseLevel:.85,noiseTone:11e3,noiseHP:1500,noiseDecay:.11,snap:.6,smpLevel:.4,smpDecay:1},{style:"ukg",desc:"Sec et nerveux pour le 2-step",samples:Bs}),ve("clapafro","Clap afro",{kind:2,noiseLevel:.9,noiseTone:1e3,noiseQ:.2,noiseHP:450,noiseDecay:.3,bursts:4,burstGap:.012,width:.9,revSend:.2},{style:"afro",desc:"Doux, large, a\xE9r\xE9"}),ve("rimpiano","Rim piano",{kind:4,freq:600,mdMat:7,bodyDecay:.06,mdHard:.8,click:.4,bodyLevel:.5,smpLevel:.7,smpDecay:1},{style:"amapiano",desc:"Rimshot bois\xE9 et feutr\xE9",samples:Bs,macros:[{name:"Accord",def:.5,map:[["tune",-5,5],["smpTune",-5,5]]},{name:"Bois \u2194 Baguette",def:.5,map:[["bodyLevel",-.4,.4],["smpLevel",.4,-.5]]}]}),ve("dembow","Snare dembow",{freq:200,pAmt:10,bodyDecay:.08,noiseLevel:.9,noiseTone:8e3,noiseHP:1200,noiseDecay:.12,snap:.7,drive:.2},{style:"reggaeton",desc:"Claquant et court"}),ve("clapjersey","Clap jersey",{kind:2,noiseLevel:1,noiseTone:1300,noiseQ:.3,noiseHP:600,noiseDecay:.22,bursts:4,burstGap:.008,drive:.35,driveType:1,smpLevel:.5,smpDecay:2},{style:"jersey",desc:"Clap \xE9norme, doubl\xE9",samples:Is,macros:[{name:"Synth\xE9 \u2194 Mains",def:.4,map:[["smpLevel",-.45,.7],["noiseLevel",.3,-.6]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["smpDecay",-2,.5],["revSend",-.05,.3]]}]}),ve("dnb","Snare DnB",{freq:200,bodyDecay:.1,bodyLevel:.5,noiseLevel:.6,noiseTone:9e3,noiseHP:1200,noiseDecay:.16,snap:.6,drive:.3,smpLevel:1,smpDecay:1.5},{style:"dnb",desc:"Crack acoustique renforc\xE9",samples:Ma,macros:[{name:"Crack",def:.5,map:[["snap",-.3,.5],["drive",-.2,.35]]},{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3],["smpTune",-2,2]]}]}),ve("claprage","Clap rage",{kind:2,noiseLevel:1,noiseTone:1250,noiseQ:.3,noiseHP:500,noiseDecay:.25,bursts:3,burstGap:.009,width:1,drive:.5,revSend:.2},{style:"rage",desc:"Large et satur\xE9"}),ve("industriel","Clap industriel",{kind:2,noiseLevel:1,noiseTone:1800,noiseQ:.55,noiseHP:700,noiseDecay:.35,bursts:4,burstGap:.01,drive:.6,driveType:2,width:.6,revSend:.3},{style:"hardtechno",desc:"R\xE9sonance m\xE9tallique, salle froide"}),ve("poussiere","Snare poussi\xE8re",{kind:7,smpLevel:1,smpDecay:3,crush:.35,tone:4500,drive:.3,driveType:3,revSend:.15},{style:"triphop",desc:"Caisse claire us\xE9e, lente",samples:Ma})];var fr=[{name:"Ferm\xE9"},{name:"Mi-ouvert",off:{noiseDecay:1.3}},{name:"Ouvert",off:{noiseDecay:2.6,revSend:.05}}],mr=[{name:"M\xE9tal \u2194 Souffle",def:.5,map:[["metal",.35,-.5]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.7],["noiseHP",-.7,.5]]}],vr={name:"Longueur",def:.4,map:[["noiseDecay",-.7,1],["smpDecay",-1.5,1]]},gr=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Brillance",def:.6,map:[["tone",-2.4,0],["hp",0,1.6]]}],yr={name:"Longueur",def:.65,map:[["smpDecay",-3,.5]]},ge=(i,e,t,s={})=>({id:"hat."+i,name:e,style:s.style||null,desc:s.desc||"",p:{kind:3,freq:400,noiseLevel:.8,...t},samples:s.samples,variants:s.variants||fr,macros:s.macros||(t.kind===7?gr:mr),expr:s.expr||(t.kind===7?yr:vr),trim:s.trim||0}),wi=[["vd-hh-closed-2-1",0,80,0],["vd-hh-closed-2-2",0,80,0],["vd-hh-closed-4-1",81,127,0],["vd-hh-closed-4-2",81,127,0],["vd-hh-half-3",0,127,1],["vd-hh-open-3",0,127,2]],Si=[{name:"Doux",off:{level:-5}},{name:"Normal"},{name:"Long",off:{smpDecay:1,revSend:.08}}],Ti=[ge("analogique","Analogique",{metal:.75,noiseTone:9e3,noiseHP:6500,noiseDecay:.06},{desc:"M\xE9tallique fa\xE7on bo\xEEte \xE0 rythmes"}),ge("bruit","Bruit blanc",{metal:0,noiseTone:1e4,noiseHP:7e3,noiseDecay:.05,width:.5},{desc:"Souffle pur, tr\xE8s lisible"}),ge("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Charleston jazz (Virtuosity Drums) : ferm\xE9, mi-ouvert, ouvert",samples:wi,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]}),ge("ride","Ride",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Cymbale ride : frappe, cloche",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Forte"}]}),ge("crash","Crash",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Crash et cymbale \xE0 rivets",samples:[["vd-crash-2-1",0,127,0],["vd-crash-2-1",0,127,1],["vd-sizzle-2-1",0,127,2]],variants:[{name:"Court",off:{smpDecay:-2.5}},{name:"Crash"},{name:"Rivets"}]}),ge("fin","Fin",{metal:.5,noiseTone:13e3,noiseHP:9e3,noiseDecay:.04},{desc:"Petit tic aigu"}),ge("sombre","Sombre",{metal:.6,metalTune:-7,noiseTone:6e3,noiseHP:3500,noiseDecay:.08},{desc:"Grave et feutr\xE9"}),ge("brillant","Brillant",{metal:.4,noiseTone:14e3,noiseHP:8e3,noiseDecay:.07,width:.7},{desc:"Air et brillance"}),ge("lofi","Lo-fi",{metal:.6,noiseTone:9e3,noiseHP:5e3,noiseDecay:.06,crush:.45,tone:9e3},{desc:"Granuleux, r\xE9duit en bits"}),ge("tss","Tss",{metal:.2,noiseTone:11e3,noiseHP:6e3,noiseDecay:.2,noiseAttack:.008},{desc:"Souffle ouvert, attaque douce"}),ge("shaker","Shaker",{kind:7,smpLevel:1,smpDecay:4},{desc:"Shaker (Virtuosity Drums) aller / retour",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-shaker-d",0,127,2],["vd-shaker-u",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Altern\xE9"}]}),ge("tambourin","Tambourin",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Tambourin secou\xE9",samples:[["vd-tamb-1"],["vd-tamb-2"]],variants:Si}),ge("triangle","Triangle",{kind:7,smpLevel:1,smpDecay:6,choke:1},{desc:"Triangle \xE9touff\xE9 ou ouvert",samples:[["vd-tri-mute",0,127,0],["vd-tri-open",0,127,1],["vd-tri-open",0,127,2]],variants:[{name:"\xC9touff\xE9"},{name:"Ouvert"},{name:"Long",off:{revSend:.15}}]}),ge("cabasa","Cabasa",{kind:7,smpLevel:1,smpDecay:4},{desc:"Perles m\xE9talliques frott\xE9es",samples:[["vd-cabasa"]],variants:Si}),ge("charleston2","Charleston clair",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Autre charleston (VCSL) : ferm\xE9, l\xE2che, ouvert",samples:[["vcsl-hh-closed",0,127,0],["vcsl-hh-loose",0,127,1],["vcsl-hh-open",0,127,2]],variants:[{name:"Ferm\xE9"},{name:"L\xE2che"},{name:"Ouvert"}]}),ge("clochette","Clochette",{metal:1,metalTune:12,noiseTone:8e3,noiseHP:4e3,noiseDecay:.15},{desc:"M\xE9tal accord\xE9, presque une cloche"}),ge("grain","Granuleux",{kind:6,noiseTone:9e3,noiseQ:.3,noiseHP:5e3,noiseDecay:.07,noiseAttack:.004,bodyShape:.75,noiseLevel:1},{desc:"Grains de sable irr\xE9guliers",macros:[{name:"Grain",def:.5,map:[["bodyShape",-.5,.25]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),ge("large","St\xE9r\xE9o",{metal:.3,noiseTone:1e4,noiseHP:6e3,noiseDecay:.09,width:1},{desc:"Ouvert dans l\u2019image st\xE9r\xE9o"}),ge("pichenette","Pichenette",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Cymbalettes \xE0 doigts (VCSL)",samples:[["vcsl-fingercym"]],variants:[{name:"Court",off:{smpDecay:-3}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),ge("pedale","P\xE9dale",{metal:.5,noiseTone:7e3,noiseHP:5e3,noiseDecay:.025,noiseAttack:.004},{desc:"Chick sec de p\xE9dale"}),ge("drift","Hat drift",{metal:.7,noiseTone:1e4,noiseHP:7500,noiseDecay:.045,drive:.4},{style:"phonk",desc:"Court et croustillant"}),ge("garage","Hat garage",{metal:.55,noiseTone:11e3,noiseHP:7e3,noiseDecay:.055,width:.4},{style:"ukg",desc:"Swing et ouvertures nettes"}),ge("shakerafro","Shaker afro",{kind:7,smpLevel:1,smpDecay:4,revSend:.18,tone:7e3,smpTune:-2},{style:"afro",desc:"Shaker organique, un peu d\u2019espace",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-cabasa",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Cabasa"}]}),ge("shakerpiano","Shaker piano",{kind:6,noiseTone:7500,noiseQ:.3,noiseHP:4e3,noiseDecay:.14,noiseAttack:.02,bodyShape:.4,width:.6,noiseLevel:1},{style:"amapiano",desc:"Long shaker soyeux",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.2,1],["noiseDecay",-.6,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),ge("perreo","Hat perreo",{metal:.65,noiseTone:9500,noiseHP:6e3,noiseDecay:.05},{style:"reggaeton",desc:"R\xE9gulier et lisible"}),ge("jersey","Hat jersey",{metal:.5,noiseTone:12e3,noiseHP:8e3,noiseDecay:.035,drive:.25},{style:"jersey",desc:"Pointu pour les doubles croches"}),ge("ridednb","Ride DnB",{kind:7,smpLevel:1,smpDecay:.7,hp:1800,choke:1},{style:"dnb",desc:"Ride serr\xE9e et rapide",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Ouverte",off:{smpDecay:2}}]}),ge("trap","Hat trap",{metal:.8,noiseTone:10500,noiseHP:8e3,noiseDecay:.03,drive:.2},{style:"rage",desc:"Tr\xE8s serr\xE9, fait pour les roulements"}),ge("industriel","Hat industriel",{metal:.3,noiseTone:9e3,noiseHP:5e3,noiseDecay:.25,drive:.7,driveType:2,revSend:.1},{style:"hardtechno",desc:"Ouvert, dur, satur\xE9"}),ge("vinyle","Hat vinyle",{kind:7,smpLevel:1,smpDecay:4,crush:.4,tone:6e3,choke:1},{style:"triphop",desc:"Charleston us\xE9 et sombre",samples:wi,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]})];var br=[{name:"Grave",off:{tune:-5,smpTune:-5}},{name:"M\xE9dium"},{name:"Aigu",off:{tune:5,smpTune:5}}],xr=[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"R\xE9sonance",def:.6,map:[["smpDecay",-2.5,.6],["revSend",-.05,.25]]}],kr={name:"Couleur",def:.6,map:[["tone",-2.4,0],["drive",-.05,.3]]},wr=[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.3,1.3]]}],Sr={name:"Frappe",def:.6,map:[["mdHard",-.4,.2],["click",-.2,.15],["level",2.5,-2]]},ye=(i,e,t,s={})=>({id:"perc."+i,name:e,style:s.style||null,desc:s.desc||"",p:{kind:7,smpLevel:1,smpDecay:4,...t},samples:s.samples,variants:s.variants||br,macros:s.macros||((t.kind??7)===7?xr:wr),expr:s.expr||((t.kind??7)===7?kr:Sr),trim:s.trim||0}),Ke=(...i)=>i.flatMap((e,t)=>e.map(([s,a=0,o=127])=>[s,a,o,t])),Mi=[ye("conga","Conga",{},{desc:"Tumba, conga ouverte, conga \xE9touff\xE9e (Virtuosity Drums)",samples:Ke([["vd-tumba"]],[["vd-conga-open-lo",0,100],["vd-conga-open-hi",101,127]],[["vd-conga-mute"]]),variants:[{name:"Tumba"},{name:"Ouverte"},{name:"\xC9touff\xE9e"}]}),ye("bongo","Bongo",{},{desc:"Paire de bongos",samples:Ke([["vd-bongo-lo"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),ye("cloche","Cloche",{},{desc:"Cloche de vache r\xE9elle",samples:[["vd-cowbell-1",0,90],["vd-cowbell-2",91,127]]}),ye("cloche808","Cloche 808",{kind:5,freq:540,ratio2:1.48,bodyDecay:.06,noiseDecay:.35,noiseTone:2600,noiseQ:.3,bodyLevel:1},{desc:"Cloche analogique \xE0 deux oscillateurs",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.5,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.5,map:[["noiseTone",-.6,.6],["drive",0,.4]]}}),ye("agogo","Agog\xF4",{},{desc:"Cloches agog\xF4 grave et aigu\xEB",samples:Ke([["vd-agogo-lo"]],[["vd-agogo-hi"]],[["vd-agogo-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Aigu\xEB tendue",off:{smpTune:2}}]}),ye("claves","Claves",{},{desc:"Deux b\xE2tons de bois",samples:[["vd-claves-1",0,90],["vd-claves-2",91,127]]}),ye("bloc","Wood-block",{},{desc:"Bloc de bois grave / aigu",samples:Ke([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-woodblock-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Tr\xE8s aigu",off:{smpTune:4}}]}),ye("guiro","G\xFCiro",{},{desc:"R\xE2pe en bois",samples:[["vd-guiro"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long"}]}),ye("timbales","Timbales",{},{desc:"Timbales latines",samples:Ke([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Sec",off:{smpDecay:-2}}]}),ye("cuica","Cu\xEDca",{},{desc:"Tambour \xE0 friction br\xE9silien",samples:Ke([["vd-cuica-1"]],[["vd-cuica-2"]],[["vd-cuica-2"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Tr\xE8s aigu\xEB",off:{smpTune:4}}]}),ye("darbuka","Darbouka",{},{desc:"Frappes de darbouka (VCSL)",samples:Ke([["vcsl-darbuka-1"],["vcsl-darbuka-2"]],[["vcsl-darbuka-3"]],[["vcsl-darbuka-4"],["vcsl-darbuka-5"]]),variants:[{name:"Centre"},{name:"Bord"},{name:"Claque"}]}),ye("cajon","Caj\xF3n aigu",{},{desc:"Claques de caj\xF3n",samples:Ke([["vcsl-cajon-mid"]],[["vcsl-cajon-slap"]],[["vcsl-cajon-slap"]]),variants:[{name:"Milieu"},{name:"Claque"},{name:"Claque s\xE8che",off:{smpDecay:-2}}]}),ye("fente","Tambour \xE0 fente",{},{desc:"Log drum en bois (VCSL)",samples:Ke([["vcsl-slit-lo"]],[["vcsl-slit-hi"]],[["vcsl-slit-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),ye("toms","Toms",{},{desc:"Toms de batterie",samples:Ke([["vd-ltom-8",0,90],["vd-ltom-14",91,127]],[["vd-htom-8",0,90],["vd-htom-14",91,127]],[["vd-htom-14"]]),variants:[{name:"Basse"},{name:"Haute"},{name:"Haute tendue",off:{smpTune:3}}]}),ye("goutte","Goutte",{kind:4,freq:900,mdMat:2,pAmt:12,pDecay:.02,bodyDecay:.4,mdHard:.4,revSend:.1},{desc:"Goutte de verre accord\xE9e"}),ye("boisynth","Bois synth\xE9tique",{kind:4,freq:750,mdMat:0,bodyDecay:.2,mdHard:.7,click:.2},{desc:"R\xE9sonateur de bois"}),ye("tom808","Tom 808",{kind:8,freq:120,mdMat:3,pAmt:10,pDecay:.1,bodyDecay:.45,mdHard:.5},{desc:"Tom analogique qui chute"}),ye("vibraslap","Vibraslap",{},{desc:"Claquement vibrant",samples:[["vd-vibraslap"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),ye("enclume","Enclume",{drive:.15},{desc:"M\xE9taux frapp\xE9s : enclume, tambours de frein",samples:Ke([["vcsl-anvil"]],[["vcsl-brake-1"]],[["vcsl-brake-2"]]),variants:[{name:"Enclume"},{name:"Frein 1"},{name:"Frein 2"}]}),ye("blip","Blip",{kind:4,freq:1200,mdMat:4,pAmt:24,pDecay:.008,bodyDecay:.11,mdHard:.9},{desc:"Bip synth\xE9tique zapp\xE9"}),ye("clochephonk","Cloche phonk",{kind:5,freq:560,ratio2:1.48,bodyDecay:.08,noiseDecay:.25,noiseTone:2800,noiseQ:.35,drive:.5,driveType:1},{style:"phonk",desc:"Cloche satur\xE9e, jouable en m\xE9lodie (axe vertical = hauteur)",variants:[{name:"Courte",off:{noiseDecay:-1.2}},{name:"Normale"},{name:"Longue",off:{noiseDecay:.8}}],macros:[{name:"Saturation",def:.5,map:[["drive",-.4,.4]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.2,1]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),ye("toc","Toc garage",{kind:4,freq:950,mdMat:0,bodyDecay:.12,mdHard:.85,click:.25,clickTone:5e3,drive:.1},{style:"ukg",desc:"Bois tr\xE8s court pour le shuffle"}),ye("djembe","Peau afro",{kind:8,freq:220,mdMat:3,pAmt:14,pDecay:.03,bodyDecay:.25,noiseLevel:.4,noiseDecay:.05,noiseHP:1500,noiseTone:6e3,click:.4,clickTone:3e3},{style:"afro",desc:"Peau synth\xE9tique avec claque",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Peau \u2194 Claque",def:.4,map:[["noiseLevel",-.3,.6],["bodyLevel",.2,-.4]]}]}),ye("logdrum","Log drum",{kind:8,freq:90,mdMat:3,pAmt:19,pDecay:.05,bodyDecay:.5,mdHard:.7,drive:.3,driveType:3},{style:"amapiano",desc:"Log drum percussif (axe vertical = hauteur)",variants:[{name:"Court",off:{bodyDecay:-1}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8}}],macros:[{name:"Glisse",def:.5,map:[["pAmt",-10,10],["pDecay",-.6,.8]]},{name:"Grain",def:.4,map:[["drive",-.25,.45],["mdHard",-.3,.3]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),ye("timbal","Timbal perreo",{smpDecay:.8,drive:.3,smpTune:2,hp:300,tone:9e3},{style:"reggaeton",desc:"Timbales s\xE8ches pour le dembow",samples:Ke([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Ouverte",off:{smpDecay:2}}]}),ye("couinement","Couinement",{kind:4,freq:1400,mdMat:4,pAmt:7,pDecay:.06,bodyDecay:.22,mdHard:.9,drive:.2},{style:"jersey",desc:"Petit cri synth\xE9tique, original"}),ye("tombreak","Tom break",{smpDecay:.6,drive:.25},{style:"dnb",desc:"Toms tendus pour les breaks",samples:Ke([["vd-ltom-14"]],[["vd-htom-14"]],[["vd-snoff-12"]]),variants:[{name:"Tom basse"},{name:"Tom haute"},{name:"Caisse sans timbre"}]}),ye("laser","Laser",{kind:4,freq:1600,mdMat:4,pAmt:30,pDecay:.01,bodyDecay:.13,mdHard:1,drive:.4},{style:"rage",desc:"Bip laser satur\xE9"}),ye("metalindus","M\xE9tal industriel",{drive:.6,driveType:2,revSend:.2},{style:"hardtechno",desc:"Freins frapp\xE9s, satur\xE9s, salle froide",samples:Ke([["vcsl-brake-1"]],[["vcsl-brake-2"]],[["vcsl-anvil"]]),variants:[{name:"Frein 1"},{name:"Frein 2"},{name:"Enclume"}]}),ye("boisfeutre","Bois feutr\xE9",{tone:2500,crush:.2,revSend:.2},{style:"triphop",desc:"Bois \xE9touff\xE9 et lointain",samples:Ke([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-claves-1"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Claves"}]})];var be=(i,e,t,s,a,o,r,n={})=>({id:"bass."+i,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||1,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.03,aA:.003,aR:.08,...s},groups:a,macros:o,expr:r,trim:n.trim||0}),k=(i,e,t)=>({name:i,def:e,map:t}),yt=[k("\xC9cho",0,[["dlMix",0,.35],["dlFb",0,.3]]),k("Salle",.1,[["rvSend",-.03,.3]])],La=[be("sub","Sub pur","va",{osc1Wave:3,fType:4,vDrive:.15,vDriveType:3,aD:.3,aS:.95,aR:.12,osc2Wave:3,osc2Semi:12,osc2Level:0},["Chaleur","Forme","Glisse"],[k("Harmoniques",.3,[["vDrive",-.15,.5]]),k("Octave",0,[["osc2Level",0,.55]]),k("Attaque",.2,[["aA",-.5,6]]),k("Rel\xE2che",.3,[["aR",-.8,2.5]]),k("Glisse",.4,[["glide",-2,2.5],["pEnvAmt",0,5],["pEnvTime",0,1]]),k("Tenue",.8,[["aS",-.6,.05],["aD",-1,1]])],{name:"Grain",def:.3,map:[["fxDrive",0,.45],["fxLP",0,-1.5]]},{desc:"Sinus pur, grave centr\xE9"}),be("moog","Moog rond","va",{osc1Wave:0,fType:0,cutoff:280,reso:.35,fEnv:3.2,fD:.22,fS:.15,keyTrack:.4,subLevel:.5,aS:.9},["Filtre","Enveloppe","Couleur"],[k("Ouverture",.45,[["cutoff",-1.5,2]]),k("R\xE9sonance",.4,[["reso",-.35,.6],["cutoff",0,.5]]),k("Mordant",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.45,[["fD",-1.5,1.6]]),k("Saturation",.2,[["fDrive",0,.8]]),k("Sub",.5,[["subLevel",-.5,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,2]]},{desc:"Analogique classique, rond et souple"}),be("acide","Acide","va",{osc1Wave:0,osc2Wave:1,osc2Level:0,fType:0,cutoff:380,reso:.82,fEnv:4,fD:.16,fS:0,keyTrack:.5,velFilt:.7,glide:.07,aD:.25,aS:.7,aR:.06,vDrive:.2},["Filtre","Accent","Grain"],[k("Coupure",.4,[["cutoff",-1.5,2.2]]),k("R\xE9sonance",.7,[["reso",-.45,.14]]),k("Enveloppe",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.4,[["fD",-1.4,1.8]]),k("Distorsion",.25,[["vDrive",-.2,.7]]),k("Scie \u2194 Carr\xE9",0,[["osc1Level",0,-1],["osc2Level",0,1]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{desc:"Ligne acide r\xE9sonante, glisse sur les liaisons"}),be("reese","Reese","va",{osc1Wave:0,unison:3,detune:18,spread:.35,osc2Wave:0,osc2Semi:-12,osc2Level:.3,fType:0,cutoff:900,reso:.15,fEnv:.5,subLevel:.6,chMix:.2,lfoRate:.25,aS:1,aR:.15},["Battement","Filtre","Largeur"],[k("D\xE9saccord",.4,[["detune",-12,25]]),k("Mouvement",.3,[["lfoCut",0,1.6]]),k("Ouverture",.45,[["cutoff",-1.5,1.8]]),k("Mordant",.25,[["fDrive",0,.8]]),k("Largeur",.4,[["spread",-.35,.6],["chMix",-.2,.4]]),k("Sub",.6,[["subLevel",-.6,.4]])],{name:"Ouverture",def:.4,map:[["cutoff",-1.2,1.6]]},{desc:"Scies d\xE9saccord\xE9es qui battent lentement"}),be("808","808 gliss\xE9e","va",{osc1Wave:3,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.3,vDriveType:0,glide:.09,aD:1.5,aS:.6,aR:.2},["Saturation","Glisse","Queue"],[k("Saturation",.4,[["vDrive",-.3,.5]]),k("Mordant",.2,[["fxDrive",0,.5]]),k("Glisse",.45,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-10,12]]),k("Queue",.5,[["aD",-1.5,1.5]]),k("Tenue",.5,[["aS",-.5,.35]])],{name:"Saturation",def:.4,map:[["vDrive",-.25,.45]]},{desc:"808 accord\xE9e, les notes qui se chevauchent glissent",glideMode:"legato"}),be("fm","FM grave","fm",{fmAlgo:0,fmR1:1,fmR2:1,fmL2:2.5,fmD2:.25,fmS2:.2,fmR3:3,fmL3:.6,fmD3:.12,fmS3:0,fmL4:0,fType:4,aS:.85,aR:.1},["Brillance","M\xE9tal","Espace"],[k("Indice",.45,[["fmL2",-2,3]]),k("D\xE9clin",.45,[["fmD2",-1.5,2]]),k("Rapport",0,[["fmR2",0,2.5]]),k("R\xE9troaction",0,[["fmFb",0,.7],["fmL4",0,1.5]]),...yt],{name:"Indice",def:.4,map:[["fmL2",-1.5,2.5]]},{desc:"Basse FM num\xE9rique, attaque brillante"}),be("pluck","Pluck basse","va",{osc1Wave:0,osc2Wave:1,osc2Level:.4,fType:0,cutoff:200,reso:.25,fEnv:4.5,fD:.12,aD:.35,aS:.2,aR:.1},["Pincement","Corps","Espace"],[k("Pincement",.5,[["fEnv",-2.5,2.5],["fD",-.8,.8]]),k("R\xE9sonance",.3,[["reso",-.2,.5]]),k("Longueur",.4,[["aD",-1,2],["aS",-.15,.5]]),k("Grave",.3,[["subLevel",0,.8]]),...yt],{name:"Brillance",def:.4,map:[["cutoff",-1,2]]},{desc:"Court et articul\xE9 pour la house"}),be("orgue","Orgue basse","wt",{wtTable:4,wtPos:.35,subLevel:.6,fType:1,cutoff:2500,reso:0,fEnv:0,fD:.06,chMix:.15,chRate:.8,aA:.002,aS:1,aR:.06},["Tirettes","Percussion","Rotation"],[k("Tirettes",.35,[["wtPos",-.35,.65]]),k("Sub",.6,[["subLevel",-.6,.4]]),k("Clic",.2,[["fEnv",0,3.5]]),k("Douceur",0,[["cutoff",0,-2.2]]),k("Rotation",.2,[["chMix",-.15,.6],["chRate",0,2.6]]),k("Saturation",.1,[["fxDrive",0,.5]])],{name:"Tirettes",def:.4,map:[["wtPos",-.3,.5]]},{desc:"Orgue grave fa\xE7on house/garage"}),be("contrebasse","Contrebasse","pluck",{pkDecay:1.2,pkDamp:.55,pkBright:.45,pkBody:.5,fType:1,cutoff:3e3,glide:.06,aS:1,aR:.15},["Corde","Caisse","Doigt"],[k("Tension",.5,[["pkDamp",.45,-.45],["pkBright",-.2,.25]]),k("R\xE9sonance",.5,[["pkDecay",-1.2,1.4]]),k("Caisse",.5,[["pkBody",-.4,.4]]),k("Bois\xE9",.5,[["cutoff",-1.6,1]]),k("Attaque",.45,[["pkBright",-.35,.45]]),k("Glisse",.3,[["glide",-2,2]])],{name:"Attaque",def:.45,map:[["pkBright",-.3,.4]]},{desc:"Corde pinc\xE9e physique, chaude"}),be("electrique","\xC9lectrique","va",{osc1Wave:0,osc2Wave:4,osc2PW:.3,osc2Level:.3,fType:0,cutoff:950,reso:.1,fEnv:2,fD:.3,vDrive:.05,aD:.6,aS:.5},["Doigt","Ampli","Espace"],[k("Attaque",.4,[["fEnv",-1,2.5]]),k("M\xE9diums",.5,[["osc2Level",-.3,.6],["osc2PW",-.2,.2]]),k("Ampli",.25,[["vDrive",-.1,.6]]),k("Grave",.3,[["subLevel",0,.7]]),...yt],{name:"Brillance",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Basse \xE9lectrique au doigt, m\xE9diums pr\xE9sents"}),be("wobble","Wobble","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,fType:0,cutoff:300,reso:.5,lfoBeats:.5,lfoCut:3,lfoShape:0,subLevel:.5,vDrive:.25,aS:1,aR:.1},["Oscillation","Filtre","Grain"],[k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Profondeur",.6,[["lfoCut",-2.5,1.2]]),k("Ouverture",.4,[["cutoff",-1,1.8]]),k("R\xE9sonance",.5,[["reso",-.3,.4]]),k("Saturation",.3,[["vDrive",-.2,.6]]),k("Sub",.5,[["subLevel",-.5,.5]])],{name:"Profondeur",def:.5,map:[["lfoCut",-2,1]]},{desc:"Filtre oscillant cal\xE9 sur le tempo"}),be("hoover","Hoover","va",{osc1Wave:4,osc1PW:.3,unison:5,detune:30,spread:.8,osc2Wave:0,osc2Semi:-12,osc2Level:.6,lfoPW:.2,lfoRate:3,pEnvAmt:-5,pEnvTime:.12,fType:0,cutoff:1500,reso:.1,chMix:.4,aS:1,aR:.2},["Plong\xE9e","Ch\u0153ur","Filtre"],[k("Plong\xE9e",.5,[["pEnvAmt",5,-7],["pEnvTime",-.5,1]]),k("Pulsation",.4,[["lfoPW",-.2,.2]]),k("D\xE9saccord",.5,[["detune",-20,25]]),k("Ch\u0153ur",.4,[["chMix",-.3,.5]]),k("Ouverture",.5,[["cutoff",-1.5,1.5]]),k("R\xE9sonance",.2,[["reso",-.1,.5]])],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.2]]},{desc:"Rave des ann\xE9es 90, plongeant et large"}),be("carre","Carr\xE9","va",{osc1Wave:4,osc1PW:.5,subLevel:.2,fType:1,cutoff:3e3,reso:.1,fEnv:1.5,fD:.15,aD:.4,aS:.6},["Forme","Filtre","Espace"],[k("Largeur",1,[["osc1PW",-.4,0]]),k("Sub",.4,[["subLevel",-.4,.6]]),k("Ouverture",.5,[["cutoff",-2,1.5]]),k("Mordant",.3,[["fEnv",-1,3]]),...yt],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Onde carr\xE9e, clin d\u2019\u0153il 8 bits"}),be("grondement","Grondement","wt",{wtTable:3,wtPos:.3,unison:3,detune:10,spread:.3,lfoBeats:1,lfoWt:.6,fType:1,cutoff:4e3,vDrive:.4,subLevel:.6,aS:1,aR:.12},["Gorge","Filtre","Grain"],[k("Gorge",.3,[["wtPos",-.3,.7]]),k("Mouvement",.5,[["lfoWt",-.6,.4],["lfoBeats",.6,-.5]]),k("Ouverture",.6,[["cutoff",-2.5,1]]),k("R\xE9sonance",.2,[["reso",0,.6]]),k("Saturation",.4,[["vDrive",-.3,.5]]),k("Sub",.6,[["subLevel",-.6,.4]])],{name:"Gorge",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Table d\u2019ondes qui \xAB parle \xBB, style bass music"}),be("doux","Doux","va",{osc1Wave:2,vDriveType:3,subLevel:.6,fType:1,cutoff:1200,aA:.01,aS:.9,aR:.2},["Rondeur","Souffle","Espace"],[k("Ouverture",.4,[["cutoff",-1,1.6]]),k("Sub",.6,[["subLevel",-.6,.4]]),k("Attaque",.3,[["aA",-.5,4]]),k("Chaleur",.2,[["vDrive",0,.4]]),...yt],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.5]]},{desc:"Triangle tendre pour deep house"}),be("pulse","Pulse","va",{osc1Wave:4,osc1PW:.22,lfoPW:.15,lfoRate:.35,fType:0,cutoff:700,reso:.2,fEnv:2,fD:.25,aS:.8,subLevel:.3},["Impulsion","Filtre","Espace"],[k("Largeur",.3,[["osc1PW",-.17,.27]]),k("Modulation",.5,[["lfoPW",-.15,.2],["lfoRate",-1,2]]),k("Ouverture",.45,[["cutoff",-1.5,1.8]]),k("Mordant",.4,[["fEnv",-1.5,3]]),...yt],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Impulsion \xE0 largeur mouvante"}),be("saturee","Satur\xE9e","va",{osc1Wave:0,fType:0,cutoff:900,reso:.25,fDrive:.8,vDrive:.5,fxDrive:.3,fxDriveType:1,subLevel:.5,aS:.9},["Distorsion","Filtre","Grave"],[k("Entr\xE9e",.6,[["fDrive",-.6,.2]]),k("Sortie",.4,[["vDrive",-.4,.45],["fxDrive",-.2,.4]]),k("Ouverture",.5,[["cutoff",-1.5,1.5]]),k("R\xE9sonance",.3,[["reso",-.2,.55]]),k("Sub",.5,[["subLevel",-.5,.5]]),k("Largeur",0,[["unison",0,2.4],["detune",0,18],["spread",0,.5]])],{name:"Distorsion",def:.4,map:[["vDrive",-.3,.45]]},{desc:"Scie satur\xE9e en deux \xE9tages"}),be("yoy","Yoy","formant",{formVowel:.2,formShift:-5,formQ:.6,formMix:.3,subLevel:.7,fType:4,glide:.07,lfoForm:0,lfoBeats:.5,aS:1,aR:.1},["Voyelle","Mouvement","Grain"],[k("Voyelle",.2,[["formVowel",-.2,.8]]),k("Gorge",.5,[["formShift",-6,6]]),k("Parole",.35,[["lfoForm",0,1]]),k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Saturation",.3,[["vDrive",0,.6]]),k("Sub",.7,[["subLevel",-.7,.3]])],{name:"Voyelle",def:.3,map:[["formVowel",-.2,.7]]},{desc:"Basse qui articule des voyelles (axe vertical)"}),be("stab","Stab","va",{osc1Wave:0,unison:5,detune:20,spread:.5,fType:0,cutoff:500,reso:.3,fEnv:3.5,fD:.1,aD:.22,aS:.05,aR:.08,dlMix:.12,dlBeats:.75},["Impact","Filtre","Espace"],[k("Longueur",.4,[["aD",-1,1.6],["fD",-.8,1.2]]),k("\xC9paisseur",.5,[["detune",-15,20],["unison",-3,2]]),k("Ouverture",.45,[["cutoff",-1.2,1.8]]),k("R\xE9sonance",.4,[["reso",-.25,.45]]),...yt],{name:"Ouverture",def:.45,map:[["cutoff",-1,1.6]]},{desc:"Coup court et \xE9pais"}),be("marimba","Marimba grave","sampler",{fType:1,cutoff:6e3,aS:1,aR:.25,rvSend:.06},["Bois","Espace","Grain"],[k("Douceur",.2,[["cutoff",0,-2.5]]),k("Attaque",.5,[["smpStart",0,.06]]),k("\xC9cho",0,[["dlMix",0,.3]]),k("Salle",.15,[["rvSend",-.05,.3]]),k("Grain",0,[["fxDrive",0,.45]]),k("Sub",0,[["subLevel",0,.5]])],{name:"Douceur",def:.2,map:[["cutoff",0,-2]]},{desc:"Marimba enregistr\xE9 (VCSL) dans le grave",bank:"marimba"}),be("808montagem","808 montagem","va",{osc1Wave:3,fType:4,pEnvAmt:16,pEnvTime:.025,vDrive:.75,vDriveType:1,glide:.08,aD:1.2,aS:.5,aR:.15,fxDrive:.2,fxDriveType:1},["\xC9cr\xEAtage","Glisse","Queue"],[k("\xC9cr\xEAtage",.5,[["vDrive",-.4,.25]]),k("Mordant",.3,[["fxDrive",-.2,.5]]),k("Glisse",.45,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-12,10]]),k("Queue",.5,[["aD",-1.5,1.5]]),k("Tenue",.5,[["aS",-.45,.35]])],{name:"\xC9cr\xEAtage",def:.5,map:[["vDrive",-.3,.25]]},{style:"phonk",glideMode:"legato",desc:"808 tr\xE8s satur\xE9e qui glisse"}),be("speedgarage","Speed garage","va",{osc1Wave:0,unison:2,detune:12,spread:.2,fType:0,cutoff:450,reso:.3,lfoBeats:.5,lfoCut:1.2,subLevel:.7,glide:.05,aS:.9,aR:.08,vDrive:.2},["Oscillation","Filtre","Grave"],[k("Vitesse",.5,[["lfoBeats",1.5,-.375]]),k("Profondeur",.4,[["lfoCut",-1.2,1.5]]),k("Ouverture",.4,[["cutoff",-1,2]]),k("R\xE9sonance",.4,[["reso",-.25,.45]]),k("Sub",.7,[["subLevel",-.7,.3]]),k("Saturation",.3,[["vDrive",-.2,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{style:"ukg",desc:"Basse qui \xAB wobble \xBB pour le 2-step"}),be("afrorond","Afro rond","fm",{fmAlgo:0,fmR1:1,fmR2:2,fmL2:1.2,fmD2:.12,fmS2:.05,fmL3:0,fmL4:0,subLevel:.5,fType:1,cutoff:3e3,aD:.6,aS:.4,aR:.12,rvSend:.05},["Pincement","Corps","Espace"],[k("Pincement",.5,[["fmL2",-1,2],["fmD2",-.5,.8]]),k("Couleur",0,[["fmR2",0,1]]),k("Longueur",.4,[["aD",-1,1.5],["aS",-.3,.4]]),k("Sub",.5,[["subLevel",-.5,.5]]),...yt],{name:"Pincement",def:.4,map:[["fmL2",-.8,1.8]]},{style:"afro",desc:"Ronde et bois\xE9e, laisse respirer les percussions"}),be("logdrum","Log drum","modal",{mdMat:3,mdDecay:.6,mdHard:.6,pEnvAmt:14,pEnvTime:.045,vDrive:.35,vDriveType:3,fType:4,aA:.001,aD:2,aS:1,aR:.25,subLevel:.25},["Glisse","Bois","Queue"],[k("Glisse",.5,[["pEnvAmt",-10,10]]),k("Vitesse",.5,[["pEnvTime",-1,1.2]]),k("Frappe",.5,[["mdHard",-.4,.4]]),k("Grain",.35,[["vDrive",-.3,.5]]),k("Queue",.5,[["mdDecay",-1.2,1.2]]),k("Sub",.25,[["subLevel",-.25,.5]])],{name:"Glisse",def:.5,map:[["pEnvAmt",-8,8]]},{style:"amapiano",desc:"Basse percussive qui chute, au c\u0153ur de l\u2019amapiano"}),be("subperreo","Sub perreo","va",{osc1Wave:3,osc2Wave:2,osc2Semi:12,osc2Level:.25,fType:4,pEnvAmt:4,pEnvTime:.02,vDrive:.25,aD:.5,aS:.7,aR:.1},["Rondeur","Punch","Espace"],[k("Pr\xE9sence",.3,[["osc2Level",-.25,.4]]),k("Chaleur",.3,[["vDrive",-.2,.45]]),k("Punch",.4,[["pEnvAmt",-4,12]]),k("Longueur",.5,[["aD",-1,1.5]]),...yt],{name:"Pr\xE9sence",def:.3,map:[["osc2Level",-.2,.4]]},{style:"reggaeton",desc:"Sub lisible m\xEAme sur petit haut-parleur"}),be("bounce","Bounce","va",{osc1Wave:3,osc2Wave:1,osc2Level:.25,fType:1,cutoff:1400,pEnvAmt:24,pEnvTime:.015,aD:.18,aS:.3,aR:.06,vDrive:.3},["Rebond","Forme","Espace"],[k("Rebond",.5,[["pEnvAmt",-16,16],["pEnvTime",-.5,1]]),k("Longueur",.4,[["aD",-1,1.6],["aS",-.3,.5]]),k("Carr\xE9",.3,[["osc2Level",-.25,.6]]),k("Saturation",.3,[["vDrive",-.2,.5]]),...yt],{name:"Rebond",def:.5,map:[["pEnvAmt",-12,12]]},{style:"jersey",desc:"Petit bond de hauteur \xE0 chaque note"}),be("turbine","Reese turbine","va",{osc1Wave:0,unison:7,detune:22,spread:.5,osc2Wave:0,osc2Semi:-12,osc2Level:.35,fType:0,cutoff:1100,reso:.15,fDrive:.4,lfoRate:.15,lfoCut:.6,subLevel:.7,chMix:.2,aS:1,aR:.15},["Turbine","Filtre","Largeur"],[k("D\xE9saccord",.45,[["detune",-15,28]]),k("Rotation",.4,[["lfoRate",-1.5,3],["lfoCut",-.5,1]]),k("Ouverture",.45,[["cutoff",-1.5,1.6]]),k("Mordant",.4,[["fDrive",-.4,.5]]),k("Largeur",.5,[["spread",-.5,.5],["chMix",-.2,.35]]),k("Sub",.7,[["subLevel",-.7,.3]])],{name:"Ouverture",def:.45,map:[["cutoff",-1.2,1.5]]},{style:"dnb",desc:"Sept scies qui tournent, sub s\xE9par\xE9"}),be("808rage","808 rage","va",{osc1Wave:3,osc2Wave:3,osc2Semi:12,osc2Level:.35,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.65,vDriveType:0,glide:.1,aD:2,aS:.55,aR:.2},["Saturation","Glisse","Queue"],[k("Saturation",.5,[["vDrive",-.4,.3]]),k("Octave",.35,[["osc2Level",-.35,.4]]),k("Glisse",.5,[["glide",-2,2]]),k("Punch",.5,[["pEnvAmt",-10,12]]),k("Queue",.5,[["aD",-1.5,1.2]]),k("Tenue",.5,[["aS",-.45,.35]])],{name:"Saturation",def:.5,map:[["vDrive",-.35,.3]]},{style:"rage",glideMode:"legato",desc:"808 large avec octave, pour le rage"}),be("acidedur","Acide dur","va",{osc1Wave:0,fType:0,cutoff:500,reso:.88,fEnv:4,fD:.14,velFilt:.7,glide:.06,aD:.22,aS:.7,aR:.05,vDrive:.4,fxDrive:.6,fxDriveType:2},["Filtre","Accent","Pli"],[k("Coupure",.4,[["cutoff",-1.5,2.2]]),k("R\xE9sonance",.8,[["reso",-.5,.1]]),k("Enveloppe",.5,[["fEnv",-2.5,3]]),k("D\xE9clin",.4,[["fD",-1.4,1.8]]),k("Pli",.5,[["fxDrive",-.5,.35]]),k("Saturation",.4,[["vDrive",-.35,.5]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{style:"hardtechno",desc:"Acide repli\xE9, tr\xE8s agressif"}),be("ronde","Basse ronde","va",{osc1Wave:2,subLevel:.6,fType:1,cutoff:500,aA:.015,aS:.6,aR:.18,vDrive:.35,vDriveType:3,glide:.1,dlMix:.15,dlBeats:.75,dlFb:.35,rvSend:.08,aD:.8},["Rondeur","Dub","Usure"],[k("Ouverture",.4,[["cutoff",-1,1.6],["vDrive",-.1,.25]]),k("Chaleur",.3,[["vDrive",-.2,.45]]),k("\xC9cho",.3,[["dlMix",-.15,.3],["dlFb",0,.35]]),k("Salle",.2,[["rvSend",-.08,.25]]),k("Bande",0,[["vibDepth",0,.15],["vibRate",0,-1.5]]),k("Usure",0,[["fxCrush",0,.35]])],{name:"Ouverture",def:.4,map:[["cutoff",-.8,1.4]]},{style:"triphop",desc:"Basse dub ronde avec \xE9cho"})];var Ne=(i,e,t,s,a,o,r,n={})=>({id:"lead."+i,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||6,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.12,aR:.25,...s},groups:a,macros:o,expr:r,trim:n.trim||0}),q=(i,e,t)=>({name:i,def:e,map:t}),Be=[q("\xC9cho",.2,[["dlMix",-.15,.35],["dlFb",-.1,.3]]),q("Salle",.3,[["rvSend",-.1,.4]])],Ra=q("Bande",0,[["vibDepth",0,.32],["vibRate",0,-1.8],["vibDelay",0,-3],["fxLP",0,-2.2],["fxCrush",0,.12]]),Qe=(i,e,t,s,a,o={})=>Ne(i,e,"sampler",{fType:1,cutoff:9e3,reso:.05,aA:.001,aD:2,aS:1,aR:.35,...s},o.groups||["Toucher","Couleur","Espace"],o.macros||[q("Douceur",.15,[["cutoff",0,-3],["level",0,4]]),q("Attaque",0,[["smpStart",0,.08],["aA",0,7.5]]),q("Chorus",.1,[["chMix",-.1,.5]]),Ra,...Be],o.expr||{name:"Douceur",def:.2,map:[["cutoff",.5,-2.5],["level",-.5,3]]},{bank:t,desc:a,...o}),Ea=[Ne("supersaw","Supersaw","va",{osc1Wave:0,unison:7,detune:28,spread:.9,fType:1,cutoff:6e3,reso:.1,fEnv:1,fD:.5,aA:.005,aD:.6,aS:.75,aR:.35,chMix:.25,dlMix:.15,dlBeats:.75,rvSend:.2},["Essaim","Filtre","Espace"],[q("D\xE9saccord",.5,[["detune",-20,25]]),q("Largeur",.6,[["spread",-.6,.1],["width",-.5,.4]]),q("Ouverture",.5,[["cutoff",-2.2,1.2]]),q("Mordant",.3,[["fEnv",-1,3],["fD",-.8,.6]]),...Be],{name:"Ouverture",def:.5,map:[["cutoff",-1.8,1]]},{desc:"Sept scies d\xE9saccord\xE9es, large et brillant"}),Ne("pluck","Pluck","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,osc2Semi:12,fType:0,cutoff:900,reso:.25,fEnv:4,fD:.14,aA:.001,aD:.3,aS:0,aR:.2,dlMix:.25,dlBeats:.75,rvSend:.15},["Pincement","Filtre","Espace"],[q("Longueur",.4,[["aD",-1,1.8],["fD",-.8,1.5]]),q("Octave",.5,[["osc2Level",-.5,.5]]),q("Brillance",.5,[["cutoff",-1.5,1.8],["fEnv",-1,1]]),q("R\xE9sonance",.3,[["reso",-.2,.5]]),...Be],{name:"Brillance",def:.5,map:[["cutoff",-1.2,1.6]]},{desc:"Pincement synth\xE9tique avec \xE9cho point\xE9"}),Qe("piano","Piano","piano",{rvSend:.15},"Piano droit enregistr\xE9 (VCSL)"),Ne("rhodes","Rhodes FM","fm",{fmAlgo:1,fmR1:1,fmR2:1,fmL2:1.1,fmD2:.9,fmS2:.15,fmR3:1,fmL3:1.4,fmD3:1.5,fmS3:.3,fmR4:14,fmL4:1.6,fmD4:.06,fmS4:0,fmDetune:4,aA:.002,aD:2.5,aS:.4,aR:.4,chMix:.35,chRate:.6,lfoAmp:.12,lfoRate:4.5,rvSend:.15},["Lames","Corps","Espace"],[q("Lame",.45,[["fmL4",-1.4,2]]),q("Cloche",.4,[["fmD4",-1,2]]),q("Grain",.4,[["fmL2",-.9,1.6]]),q("Tr\xE9molo",.3,[["lfoAmp",-.12,.45],["lfoRate",-.6,.6]]),...Be],{name:"Toucher",def:.5,map:[["fmL2",-.6,1],["fmL4",-.8,.8]]},{desc:"Piano \xE9lectrique FM avec tr\xE9molo et chorus"}),Qe("marimba","Marimba","marimba",{rvSend:.12,dlMix:.08},"Marimba en bois (VCSL)"),Qe("vibraphone","Vibraphone","vibes",{lfoAmp:.3,lfoRate:5.5,rvSend:.2},"Vibraphone, moteur de tr\xE9molo r\xE9glable",{macros:[q("Douceur",.1,[["cutoff",0,-3]]),q("Moteur",.5,[["lfoAmp",-.3,.4],["lfoRate",-1.5,1]]),q("Chorus",0,[["chMix",0,.5]]),Ra,...Be]}),Qe("kalimba","Kalimba","kalimba",{rvSend:.15,dlMix:.12,dlBeats:.75},"Piano \xE0 pouces du Kenya (VCSL)"),Ne("verre","Cloche de verre","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:3,fmD2:2,fmS2:.1,fmR3:7,fmL3:.5,fmD3:.4,fmS3:0,fmL4:0,aA:.001,aD:3,aS:0,aR:1.2,chMix:.2,rvSend:.3},["M\xE9tal","Dur\xE9e","Espace"],[q("Rapport",.5,[["fmR2",-1.5,1.5]]),q("\xC9clat",.5,[["fmL2",-2,3],["fmL3",-.5,1.5]]),q("Dur\xE9e",.5,[["aD",-1.5,1.2],["fmD2",-1.5,1]]),q("Scintillement",0,[["fmDetune",0,12],["chMix",0,.4]]),...Be],{name:"\xC9clat",def:.5,map:[["fmL2",-1.5,2.5]]},{desc:"Cloche FM cristalline, longue r\xE9sonance"}),Ne("orgue","Orgue","wt",{wtTable:4,wtPos:.55,fType:4,aA:.002,aS:1,aR:.08,chMix:.45,chRate:.8,chDepth:.6,subLevel:.15,rvSend:.12},["Tirettes","Rotation","Saturation"],[q("Tirettes",.55,[["wtPos",-.55,.45]]),q("16 pieds",.15,[["subLevel",-.15,.6]]),q("Vitesse",.3,[["chRate",-.6,3]]),q("Profondeur",.6,[["chMix",-.45,.4],["chDepth",-.3,.4]]),q("Saturation",.1,[["fxDrive",0,.55]]),q("Salle",.25,[["rvSend",-.1,.35]])],{name:"Tirettes",def:.5,map:[["wtPos",-.4,.4]]},{desc:"Orgue \xE0 tirettes et cabine tournante"}),Ne("nappe","Nappe chaude","wt",{wtTable:6,wtPos:.4,unison:3,detune:14,spread:.8,fType:1,cutoff:2500,aA:.6,aD:1,aS:.9,aR:1.2,lfoWt:.2,lfoRate:.15,chMix:.4,rvSend:.35},["Mati\xE8re","Souffle","Espace"],[q("Mati\xE8re",.4,[["wtPos",-.4,.6]]),q("Mouvement",.3,[["lfoWt",-.2,.6],["lfoRate",-1,2]]),q("Attaque",.4,[["aA",-2.5,1.5]]),q("Ouverture",.5,[["cutoff",-1.5,1.5]]),...Be],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Nappe douce qui respire",poly:6}),Ne("voix","Voix","formant",{formVowel:0,formShift:0,formQ:.55,formMix:.25,vibDepth:.22,vibRate:5.2,vibDelay:.35,aA:.04,aS:.9,aR:.3,chMix:.2,rvSend:.2},["Voyelle","Gorge","Espace"],[q("Voyelle",0,[["formVowel",0,1]]),q("Parole",0,[["lfoForm",0,.8],["lfoBeats",0,1]]),q("Gorge",.5,[["formShift",-7,7]]),q("Vibrato",.5,[["vibDepth",-.22,.3]]),...Be],{name:"Voyelle",def:.2,map:[["formVowel",-.2,.8]]},{desc:"Synth\xE8se de voyelles, ch\u0153ur artificiel",poly:4}),Qe("ocarina","Ocarina","ocarina",{vibDepth:.08,vibDelay:.4,rvSend:.18},"Ocarina souffl\xE9 (VCSL)",{poly:3}),Qe("saxo","Saxophone","sax",{vibDepth:.12,vibRate:5,vibDelay:.45,cutoff:7e3,rvSend:.15},"Saxophone t\xE9nor enregistr\xE9 (VCSL)",{poly:2,macros:[q("Souffle",.2,[["cutoff",0,-2.5],["noiseLevel",0,.06]]),q("Vibrato",.4,[["vibDepth",-.12,.25],["vibDelay",0,-2]]),q("Grain",0,[["fxDrive",0,.45]]),Ra,...Be]}),Qe("harmonica","Harmonica","harmonica",{vibDepth:.05,rvSend:.12},"Harmonica diatonique (VCSL)",{poly:4}),Ne("guitare","Guitare pinc\xE9e","pluck",{pkBright:.7,pkDamp:.35,pkDecay:2.5,pkBody:.4,fType:4,aS:1,aR:.3,chMix:.15,dlMix:.12,rvSend:.15},["Corde","Caisse","Espace"],[q("Attaque",.6,[["pkBright",-.5,.3]]),q("Sustain",.5,[["pkDecay",-1.5,1.5],["pkDamp",.2,-.25]]),q("Caisse",.4,[["pkBody",-.4,.5]]),q("Chorus",.3,[["chMix",-.15,.4]]),...Be],{name:"Attaque",def:.5,map:[["pkBright",-.4,.3]]},{desc:"Corde pinc\xE9e physique, nylon ou acier"}),Qe("harpe","Harpe","harp",{rvSend:.22},"Harpe de concert (VCSL)"),Ne("chip","Chiptune","va",{osc1Wave:4,osc1PW:.25,fType:4,vibDepth:.25,vibRate:6.5,vibDelay:.15,lfoPW:0,aA:.001,aD:.2,aS:.7,aR:.08,dlMix:.1,dlBeats:.5,rvSend:.05},["Onde","Vibrato","Espace"],[q("Largeur",.5,[["osc1PW",-.2,.25]]),q("Balayage",0,[["lfoPW",0,.22],["lfoRate",0,1]]),q("Vibrato",.4,[["vibDepth",-.25,.4]]),q("Arp\xE8ge",0,[["pEnvAmt",0,12],["pEnvTime",0,-1]]),...Be],{name:"Largeur",def:.5,map:[["osc1PW",-.2,.2]]},{desc:"Onde carr\xE9e de console 8 bits",poly:3}),Ne("sync","Sync","wt",{wtTable:7,wtPos:.3,wtEnv:.4,fEnv:0,fA:.002,fD:.35,fS:.2,unison:2,detune:8,spread:.6,fType:4,vDrive:.3,glide:.06,aS:.85,aR:.15,dlMix:.15,rvSend:.12},["Synchro","Mouvement","Espace"],[q("Synchro",.3,[["wtPos",-.3,.6]]),q("Balayage",.5,[["wtEnv",-.4,.5],["fD",-1,1]]),q("Vibration",0,[["lfoWt",0,.5],["lfoRate",0,1.5]]),q("Saturation",.3,[["vDrive",-.3,.5]]),...Be],{name:"Synchro",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Lead synchronis\xE9 mordant, glisse sur les liaisons",poly:1}),Ne("cordes","Cordes synth\xE9","va",{osc1Wave:0,unison:5,detune:14,spread:.7,osc2Wave:0,osc2Semi:12,osc2Level:.3,fType:1,cutoff:3500,aA:.35,aD:1,aS:.9,aR:.9,vibDepth:.08,vibDelay:.5,chMix:.35,rvSend:.3},["Archet","Ensemble","Espace"],[q("Attaque",.4,[["aA",-2.5,1.5]]),q("Ouverture",.5,[["cutoff",-1.5,1.4]]),q("Ensemble",.5,[["detune",-10,16],["chMix",-.25,.4]]),q("Octave",.3,[["osc2Level",-.3,.5]]),...Be],{name:"Ouverture",def:.5,map:[["cutoff",-1.4,1.2]]},{desc:"Ensemble de cordes analogique"}),Qe("glock","Glockenspiel","glock",{rvSend:.2,dlMix:.1},"Lames de m\xE9tal brillantes (VCSL)"),Ne("sino","Sino montagem","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:2.2,fmD2:.35,fmS2:.1,fmR3:1.5,fmL3:.8,fmD3:.2,fmS3:0,aA:.001,aD:.8,aS:.2,aR:.3,fxDrive:.5,fxDriveType:1,dlMix:.2,dlBeats:.5,rvSend:.1},["M\xE9tal","\xC9cr\xEAtage","Espace"],[q("Rapport",.5,[["fmR2",-1.5,1.5]]),q("\xC9clat",.5,[["fmL2",-1.5,2.5]]),q("\xC9cr\xEAtage",.5,[["fxDrive",-.45,.4]]),q("Longueur",.4,[["aD",-1,1.5],["aS",-.2,.5]]),...Be],{name:"\xC9clat",def:.5,map:[["fmL2",-1.2,2]]},{style:"phonk",desc:"Cloche m\xE9tallique satur\xE9e, m\xE9lodies de montagem"}),Qe("stabgarage","Stab garage","clavi",{cutoff:7e3,chMix:.3,dlMix:.18,dlBeats:.75,rvSend:.12,aR:.15},"Clavisynth TX81Z enregistr\xE9, accords courts",{style:"ukg"}),Qe("balafon","Balafon afro","balafon",{dlMix:.2,dlBeats:.75,rvSend:.2},"Balafon (xylophone ouest-africain) avec \xE9cho",{style:"afro"}),Qe("keys","Keys amapiano","fmpiano",{cutoff:5e3,chMix:.45,chRate:.5,dlMix:.18,dlBeats:.75,rvSend:.25},"Piano FM TX81Z enregistr\xE9, chorus et \xE9cho",{style:"amapiano"}),Qe("perreo","Pluck perreo","dantranh",{fxDrive:.15,dlMix:.15,dlBeats:.5,rvSend:.12},"Cithare \u0111\xE0n tranh enregistr\xE9e (VCSL), en pincements",{style:"reggaeton"}),Ne("stabjersey","Stab jersey","va",{osc1Wave:0,unison:5,detune:24,spread:.8,osc2Wave:1,osc2Semi:12,osc2Level:.35,fType:1,cutoff:5e3,fEnv:2,fD:.12,pEnvAmt:2,pEnvTime:.02,aA:.001,aD:.18,aS:.1,aR:.12,rvSend:.15},["Impact","Filtre","Espace"],[q("Longueur",.4,[["aD",-1,1.8],["aS",-.1,.5]]),q("Hoquet",.4,[["pEnvAmt",-2,10]]),q("Brillance",.5,[["cutoff",-1.8,1.2]]),q("\xC9paisseur",.5,[["detune",-18,20],["osc2Level",-.35,.4]]),...Be],{name:"Brillance",def:.5,map:[["cutoff",-1.5,1.2]]},{style:"jersey",desc:"Stab brillant pour les rafales"}),Ne("liquide","Pad liquide","wt",{wtTable:10,wtPos:.6,unison:4,detune:10,spread:.8,fType:1,cutoff:2200,lfoCut:.6,lfoBeats:4,aA:.25,aD:1,aS:.85,aR:1.5,chMix:.35,dlMix:.15,rvSend:.45},["Mati\xE8re","Mar\xE9e","Espace"],[q("Mati\xE8re",.5,[["wtPos",-.5,.4]]),q("Ouverture",.5,[["cutoff",-1.5,1.5]]),q("Mar\xE9e",.4,[["lfoCut",-.6,1.2]]),q("Attaque",.4,[["aA",-2,1.5]]),...Be],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.4]]},{style:"dnb",desc:"Nappe douce et mouvante pour le liquid"}),Ne("rage","Lead rage","va",{osc1Wave:0,unison:7,detune:32,spread:1,osc2Wave:4,osc2PW:.2,osc2Level:.4,fType:1,cutoff:7e3,pEnvAmt:-3,pEnvTime:.08,vDrive:.3,aA:.003,aD:.5,aS:.65,aR:.25,dlMix:.2,dlBeats:.5,rvSend:.18},["Essaim","Plong\xE9e","Espace"],[q("D\xE9saccord",.5,[["detune",-20,20]]),q("Saturation",.3,[["vDrive",-.3,.5]]),q("Plong\xE9e",.5,[["pEnvAmt",3,-9],["pEnvTime",-.6,1]]),q("Brillance",.6,[["cutoff",-2,.6]]),...Be],{name:"Brillance",def:.6,map:[["cutoff",-1.8,.6]]},{style:"rage",desc:"Lead large et satur\xE9 qui plonge"}),Ne("hurleur","Hurleur","va",{osc1Wave:0,osc2Wave:0,osc2Fine:12,osc2Level:.8,fType:0,cutoff:1200,reso:.75,fEnv:2,fD:.4,vDrive:.6,fxDrive:.3,fxDriveType:2,glide:.08,lfoRate:6,lfoCut:0,aS:1,aR:.12,dlMix:.12,rvSend:.15},["Cri","Filtre","Espace"],[q("Saturation",.5,[["vDrive",-.4,.35],["fxDrive",-.25,.4]]),q("Hurlement",0,[["lfoCut",0,1.5],["lfoRate",-1,1]]),q("Coupure",.5,[["cutoff",-1.5,2]]),q("R\xE9sonance",.7,[["reso",-.4,.2]]),...Be],{name:"Coupure",def:.5,map:[["cutoff",-1.2,1.8]]},{style:"hardtechno",desc:"Lead r\xE9sonant et repli\xE9, glisse",poly:1}),Qe("brume","Cloches brumeuses","chimes",{cutoff:4e3,vibDepth:.1,vibRate:.9,vibDelay:.01,fxCrush:.15,chMix:.3,rvSend:.45,dlMix:.15,dlBeats:1.5},"Cloches \xE0 main, bande us\xE9e et grande salle",{style:"triphop"})];var Ve=(i,e,t,s,a,o,r)=>({id:i,name:e,style:t,kit:s.map((n,l)=>["kick.","snare.","hat.","perc."][l]+n),rhythm:a,bass:o&&"bass."+o,lead:r&&"lead."+r}),lt=[Ve("studio","Studio",null,["club","classique","analogique","conga"],[1,1,1,3],"moog","pluck"),Ve("acoustique","Acoustique",null,["acoustique","acoustique","acoustique","toms"],[2,1,1,11],"contrebasse","piano"),Ve("organique","Organique",null,["cajon","mains","shaker","darbuka"],[3,1,2,1],"contrebasse","kalimba"),Ve("analogique","Analogique",null,["909","clap808","analogique","cloche808"],[1,1,3,8],"acide","supersaw"),Ve("lofi","Lo-fi",null,["vinyle","lofi","lofi","bloc"],[2,1,1,12],"doux","rhodes"),Ve("phonk","Phonk BR","phonk",["montagem","clapmontagem","drift","clochephonk"],[7,1,2,6],"808montagem","sino"),Ve("ukg","UK garage","ukg",["garage","garage","garage","toc"],[3,4,4,13],"speedgarage","stabgarage"),Ve("afro","Afro house","afro",["afroprofond","clapafro","shakerafro","djembe"],[1,9,9,7],"afrorond","balafon"),Ve("amapiano","Amapiano","amapiano",["pianofeutre","rimpiano","shakerpiano","logdrum"],[9,9,4,9],"logdrum","keys"),Ve("reggaeton","Perreo","reggaeton",["perreo","dembow","perreo","timbal"],[16,3,1,3],"subperreo","perreo"),Ve("jersey","Jersey club","jersey",["jersey","clapjersey","jersey","couinement"],[6,6,2,12],"bounce","stabjersey"),Ve("dnb","Drum & bass","dnb",["break","dnb","ridednb","tombreak"],[5,5,1,15],"turbine","liquide"),Ve("rage","Rage","rage",["808rage","claprage","trap","laser"],[4,7,6,12],"808rage","rage"),Ve("hardtechno","Hard techno","hardtechno",["rumble","industriel","industriel","metalindus"],[10,1,3,8],"acidedur","hurleur"),Ve("triphop","Trip-hop","triphop",["poussiere","poussiere","vinyle","boisfeutre"],[12,2,1,11],"ronde","brume")];var Ft=[{id:"phonk",name:"Phonk BR \xB7 montagem",short:"Phonk BR",bpm:130,key:1,scale:"phrygian"},{id:"ukg",name:"UK garage",short:"UKG",bpm:134,key:5,scale:"minor"},{id:"afro",name:"Afro house",short:"Afro",bpm:122,key:9,scale:"minor"},{id:"amapiano",name:"Amapiano",short:"Amapiano",bpm:112,key:2,scale:"dorian"},{id:"reggaeton",name:"Reggaeton nouvelle vague",short:"Perreo",bpm:96,key:4,scale:"minor"},{id:"jersey",name:"Jersey club",short:"Jersey",bpm:142,key:7,scale:"minor"},{id:"dnb",name:"Drum & bass",short:"DnB",bpm:174,key:5,scale:"minor"},{id:"rage",name:"Rage \xB7 trap",short:"Rage",bpm:150,key:1,scale:"harmonic"},{id:"hardtechno",name:"Hard techno",short:"Hard",bpm:152,key:9,scale:"phrygian"},{id:"triphop",name:"Trip-hop atmosph\xE9rique",short:"Trip-hop",bpm:86,key:0,scale:"dorian"}];function ct(i){return Ft.find(e=>e.id===i)||null}var Li={"kick.rond":1.7,"kick.club":3.2,"kick.profond":.9,"kick.808":-.8,"kick.feutre":2.9,"kick.acoustique":-6.4,"kick.sec":.7,"kick.concert":-7.3,"kick.sature":6.2,"kick.rebond":-.1,"kick.sub":3.5,"kick.clic":1.4,"kick.vinyle":-2.6,"kick.909":-.1,"kick.boom":1.1,"kick.papier":1.8,"kick.plie":3.1,"kick.cajon":-7.1,"kick.cadre":-8,"kick.tom":-6,"kick.montagem":2.8,"kick.garage":2.6,"kick.afroprofond":2.4,"kick.pianofeutre":2.5,"kick.perreo":4.1,"kick.jersey":4.4,"kick.break":1.5,"kick.808rage":-.3,"kick.rumble":5.9,"kick.poussiere":.4,"snare.classique":-1.4,"snare.clap808":.8,"snare.rim":6.2,"snare.acoustique":-12.3,"snare.sanstimbre":-11.5,"snare.fantome":2.5,"snare.crepitant":-3.3,"snare.clapserre":.5,"snare.claplarge":-2.8,"snare.doigts":1.1,"snare.mains":-12.6,"snare.lofi":-.5,"snare.metal":-5.7,"snare.tomsnare":-2.9,"snare.balai":-.2,"snare.electro":-2.8,"snare.snareclap":-8.3,"snare.ressort":-7.1,"snare.roulement":-11.5,"snare.crossstick":-12.7,"snare.clapmontagem":-1.9,"snare.garage":-4.5,"snare.clapafro":-.7,"snare.rimpiano":-7.2,"snare.dembow":.5,"snare.clapjersey":-11.2,"snare.dnb":-10.8,"snare.claprage":-3.3,"snare.industriel":-4,"snare.poussiere":-9.6,"hat.analogique":4.9,"hat.bruit":-2.7,"hat.acoustique":-17.6,"hat.ride":-19.8,"hat.crash":-18.2,"hat.fin":3.1,"hat.sombre":.3,"hat.brillant":-1.6,"hat.lofi":5.2,"hat.tss":-8.9,"hat.shaker":-18.7,"hat.tambourin":-17.9,"hat.triangle":-20.2,"hat.cabasa":-15.6,"hat.charleston2":-17.5,"hat.clochette":-2.5,"hat.grain":-6.3,"hat.large":-4.9,"hat.pichenette":-19.1,"hat.pedale":3.6,"hat.drift":-.1,"hat.garage":1.9,"hat.shakerafro":-15.5,"hat.shakerpiano":-10.6,"hat.perreo":3.2,"hat.jersey":-.3,"hat.ridednb":-11.9,"hat.trap":6.4,"hat.industriel":-10.8,"hat.vinyle":-13.3,"perc.conga":-14.9,"perc.bongo":-15.5,"perc.cloche":-15.8,"perc.cloche808":-4.2,"perc.agogo":-17.5,"perc.claves":-17,"perc.bloc":-16.9,"perc.guiro":-16.4,"perc.timbales":-15.2,"perc.cuica":-15.9,"perc.darbuka":-15.4,"perc.cajon":-13.6,"perc.fente":-14.7,"perc.toms":-15,"perc.goutte":10.4,"perc.boisynth":12.5,"perc.tom808":-13.9,"perc.vibraslap":-16.3,"perc.enclume":-17.6,"perc.blip":6.5,"perc.clochephonk":-4.3,"perc.toc":9.2,"perc.djembe":-8.1,"perc.logdrum":-10.8,"perc.timbal":-7.2,"perc.couinement":3.1,"perc.tombreak":-7.6,"perc.laser":7,"perc.metalindus":-9.6,"perc.boisfeutre":-12.3,"bass.sub":-8.5,"bass.moog":-7.8,"bass.acide":-3.3,"bass.reese":-8.5,"bass.808":-4.6,"bass.fm":-8.6,"bass.pluck":4.1,"bass.orgue":-6.8,"bass.contrebasse":1.1,"bass.electrique":-.4,"bass.wobble":-5,"bass.hoover":-9.7,"bass.carre":-11.2,"bass.grondement":-7.1,"bass.doux":-8.2,"bass.pulse":-6.1,"bass.saturee":-12.3,"bass.yoy":-6.3,"bass.stab":.3,"bass.marimba":-10.2,"bass.808montagem":-4,"bass.speedgarage":-7.8,"bass.afrorond":-6.6,"bass.logdrum":-4.3,"bass.subperreo":-6.3,"bass.bounce":-.2,"bass.turbine":-7.9,"bass.808rage":-.3,"bass.acidedur":-11.2,"bass.ronde":-4.7,"lead.supersaw":-14.5,"lead.pluck":-5,"lead.piano":-17.4,"lead.rhodes":-11.9,"lead.marimba":-16.4,"lead.vibraphone":-15.9,"lead.kalimba":-17.3,"lead.verre":-8.9,"lead.orgue":-12.4,"lead.nappe":-16.9,"lead.voix":-9,"lead.ocarina":-16.9,"lead.saxo":-15.9,"lead.harmonica":-16.1,"lead.guitare":-7.6,"lead.harpe":-16.9,"lead.chip":-18.2,"lead.sync":-8.9,"lead.cordes":-15.7,"lead.glock":-17.7,"lead.sino":-18.3,"lead.stabgarage":-15.7,"lead.balafon":-15.6,"lead.keys":-17.1,"lead.perreo":-18.2,"lead.stabjersey":-8,"lead.liquide":-14.9,"lead.rage":-12.1,"lead.hurleur":-15.4,"lead.brume":-17.4};var Aa=[{id:"kick",name:"Kick",list:xi},{id:"snare",name:"Snare \xB7 clap",list:ki},{id:"hat",name:"Hat",list:Ti},{id:"perc",name:"Perc",list:Mi},{id:"bass",name:"Basse",list:La},{id:"lead",name:"M\xE9lodie",list:Ea}],Ht=["kick","snare","hat","perc"],_a=new Map;for(let i of Aa)for(let e of i.list){if(_a.has(e.id))throw new Error("duplicate preset id "+e.id);e.family=i.id,e.trim=(e.trim||0)+(Li[e.id]||0),_a.set(e.id,e)}function we(i){return _a.get(i)||null}function ht(i){return(Aa.find(e=>e.id===i)||Aa[0]).list}function Ri(i){return lt.find(e=>e.id===i)||null}var Qt={kit:lt[0].kit,bass:La[0].id,lead:Ea[0].id};function Ei(i){return i?i.bank?[i.bank]:i.samples&&i.samples.length?["drums"]:[]:[]}var Tr={bass:[28,47],lead:[48,67]},Mr=48;function Jt(i,e=Math.random,t){let s=i.length>1&&t!==void 0?i.filter(a=>a!==t):i;return s[Math.floor(e()*s.length)%s.length]}function Lr(i,e,t){let[s,a]=Tr[i],o=[];for(let r=-4;r<=4;r++){let n=Mr+t+e.lo+12*r;n>=s&&n<=a&&o.push(r)}return o.length?o:[0]}function Da(i,e="all",t=Math.random){let s={kit:null,bass:null,lead:null},a=i;(e==="all"||e==="drum")&&(s.kit=Ht.map((o,r)=>Jt(ht(o),t,void 0).id),s.kit.every((o,r)=>o===a.parts.drum.kit[r])&&(s.kit[0]=Jt(ht("kick"),t,ht("kick").find(o=>o.id===s.kit[0])).id));for(let o of["bass","lead"]){if(e!=="all"&&e!==o)continue;let r=ht(o),n=r.find(c=>c.id===a.parts[o].preset),l=Jt(r,t,n).id,d=Jt(Lr(o,a.parts[o].range,a.key),t);s[o]={preset:l,oct:d}}return s}function Ai(i){return[...i.kit||[],i.bass&&i.bass.preset,i.lead&&i.lead.preset].filter(Boolean)}function Pa(i,e){let t=i;e.kit&&(t.parts.drum.kit=e.kit.slice(),t.parts.drum.macros=[null,null,null,null]);for(let s of["bass","lead"]){let a=e[s];if(!a)continue;let o=t.parts[s];if(o.preset=a.preset,o.macros=null,a.oct){o.range={lo:o.range.lo+12*a.oct,n:o.range.n};for(let r of t.patterns){for(let n of r[s].notes)n.deg+=7*a.oct;if(r.gest&&r.gest[s])for(let n of r.gest[s])for(let l of n.p)l[3]+=7*a.oct}}}return t}function _i(i=Math.random){let e=Jt(Ft,i),t=Jt(lt,i),s=Rt({tempo:e.bpm,key:Math.floor(i()*12)%12,scale:e.scale,name:"Id\xE9e au hasard"});return s.parts.drum.kit=t.kit.slice(),s.parts.drum.rhythm=t.rhythm.slice(),s.parts.bass.preset=ht("bass")[0].id,s.parts.lead.preset=ht("lead")[0].id,Pa(s,Da(s,"all",i)),s}var Hs=Ye.storage+".",Rr={metro:!1,metroAlways:!1,metroLevel:0,piano:!1,ghosts:!0,fluid:!0,fluidZone:"keys",fluidStyle:"spectaculaire",fluidColors:"partie",fluidInk:"libre",glass:Ye.fluid,fluidHdr:"intense",fluidEngine:"auto",glassTilt:!1,glassSpill:!0,glassLight:"forte",mixGlass:Ye.fluid,ctrlHeight:6,lightLook:"aquarelle",hdrLight:!0,glassLook:"optique",...Ye.fluid?{hwCast:[0,3,2,1],hwRelay:!1}:{}},Er=60,Ns=class{constructor(){this.project=null,this.ui={part:"lead",view:"pattern",lane:0,group:0,erase:!1,playing:!1,armed:!1,tick:-1,sel:null,section:0,browse:null},this.listeners=new Map,this.undoStack=[],this.redoStack=[],this.saveTimer=null,this.dirty=!1,this.engine=null,this.lastSaved=0,this.settings={...Rr};try{Object.assign(this.settings,JSON.parse(localStorage.getItem(Hs+"settings")||"{}"))}catch{}this.diceMark=null}setSetting(e,t){this.settings[e]=t;try{localStorage.setItem(Hs+"settings",JSON.stringify(this.settings))}catch{}e.startsWith("metro")&&this.send(...this.metroMessages()),this.changed("settings:"+e)}metroMessages(){let e=this.settings;return[{type:"batch",list:[{type:"set",key:"metro",value:e.metro?e.metroAlways?2:1:0},{type:"set",key:"metroLevel",value:e.metroLevel}]}]}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.listeners.get(e).delete(t)}emit(e,t){let s=this.listeners.get(e);if(s)for(let a of s)a(t)}changed(e){this.emit("change",e)}async init(){let e=null;try{let t=localStorage.getItem(Hs+"last");t&&(e=await je.get("projects",t))}catch{}if(e)try{e=qt(e)}catch{e=null}return e||(e=this.starterProject()),this.project=e,this.ensurePresets(),ni(),e}starterProject(e){let t=e&&lt.find(o=>o.style===e)||lt[0],s=ct(t.style),a=Rt({kit:t.kit.slice(),bass:t.bass||Qt.bass,lead:t.lead||Qt.lead,tempo:s?s.bpm:118,key:s?s.key:2,scale:s?s.scale:"minor",name:s?"Id\xE9e "+s.short:"Nouvelle id\xE9e"});return a.parts.drum.rhythm=t.rhythm.slice(),a}ensurePresets(){let e=this.project,t=e.parts.drum;for(let s=0;s<4;s++)(!t.kit[s]||!we(t.kit[s]))&&(t.kit[s]=Qt.kit[s]);(!e.parts.bass.preset||!we(e.parts.bass.preset))&&(e.parts.bass.preset=Qt.bass),(!e.parts.lead.preset||!we(e.parts.lead.preset))&&(e.parts.lead.preset=Qt.lead)}scheduleSave(){this.dirty=!0,clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.save(),700)}async save(){if(clearTimeout(this.saveTimer),!!this.project){this.project.updated=Date.now();try{await je.put("projects",JSON.parse(JSON.stringify(this.project))),localStorage.setItem(Hs+"last",this.project.id),this.dirty=!1,this.lastSaved=Date.now(),this.emit("saved",this.lastSaved)}catch(e){this.emit("error","Sauvegarde impossible : "+(e&&e.message||e))}}}async listProjects(){return(await je.all("projects")).sort((t,s)=>(s.updated||0)-(t.updated||0))}async openProject(e){await this.save();let t=await je.get("projects",e);if(!t)throw new Error("Projet introuvable");this.loadProject(qt(t))}loadProject(e){this.project=e,this.ensurePresets(),this.undoStack=[],this.redoStack=[],this.ui.sel=null,this.syncAll(),this.changed("project"),this.scheduleSave()}async newProject(e){await this.save(),this.loadProject(this.starterProject(e))}planRandom(e){return Da(this.project,e)}applyRandom(e){let t=this.undoStack[this.undoStack.length-1];(!t||t!==this.diceMark)&&this.snapshot(),Pa(this.project,e),this.syncAll(),this.changed("project"),this.scheduleSave(),this.diceMark=this.undoStack[this.undoStack.length-1]}planRandomProject(){return _i()}async duplicateProject(){await this.save();let e=JSON.parse(JSON.stringify(this.project));e.id=It(),e.name=this.project.name+" (copie)",e.created=e.updated=Date.now(),this.loadProject(e)}async deleteProject(e){if(await je.del("projects",e),this.project&&this.project.id===e){let t=await this.listProjects();t.length?this.loadProject(qt(t[0])):this.loadProject(this.starterProject())}}rename(e){this.project.name=e.slice(0,80)||"Sans titre",this.changed("name"),this.scheduleSave()}snapshot(){this.undoStack.push(JSON.stringify(this.project)),this.undoStack.length>Er&&this.undoStack.shift(),this.redoStack.length=0,this.changed("undo")}undo(){return this.undoStack.length?(this.redoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.undoStack.pop())),!0):!1}redo(){return this.redoStack.length?(this.undoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.redoStack.pop())),!0):!1}restore(e){let t=this.ui.playing;this.project=e,this.syncAll(!0),this.changed("project"),this.changed("undo"),this.scheduleSave()}send(e){this.engine&&this.engine.send(e)}presetMessage(e,t){let s=this.project;if(e==="drum"){let a=we(s.parts.drum.kit[t]);return{type:"preset",part:e,lane:t,preset:a,macros:s.parts.drum.macros[t]}}return{type:"preset",part:e,preset:we(s.parts[e].preset),macros:s.parts[e].macros}}engineState(){let e=[];for(let t=0;t<4;t++)e.push(this.presetMessage("drum",t));return e.push(this.presetMessage("bass")),e.push(this.presetMessage("lead")),e.push({type:"project",project:this.project}),e.push({type:"erase",on:this.ui.erase}),e.push(...this.metroMessages()[0].list),e}syncAll(){this.engine&&this.engine.send({type:"batch",list:this.engineState()})}onEngine(e){let t=this.project;switch(e.type){case"pos":this.ui.tick=e.tick,this.emit("pos",e);break;case"state":this.ui.playing=e.playing,this.ui.armed=e.armed,this.changed("transport");break;case"takeStart":this.snapshot();break;case"autoStart":this.snapshot();break;case"take":{let s=t.patterns[e.pat];if(!s)break;e.part==="drum"?s.drum[e.lane].hits=e.data:s[e.part].notes=e.data,this.changed("notes"),this.scheduleSave();break}case"gest":{let s=t.patterns[e.pat];if(!s)break;s.gest=s.gest||{bass:[],lead:[],drum:[]},s.gest[e.part]=e.data,this.changed("gest"),this.scheduleSave();break}case"auto":{let s=t.patterns[e.pat];if(!s)break;e.data?(s.auto[e.target]=s.auto[e.target]||{},s.auto[e.target][e.slot]=e.data):s.auto[e.target]&&(delete s.auto[e.target][e.slot],Object.keys(s.auto[e.target]).length||delete s.auto[e.target]),this.changed("auto"),this.scheduleSave();break}case"macro":{let s=this.macrosFor(e.target,!0);s[e.slot]=Math.round(e.value*1e3)/1e3,this.changed("macro"),this.scheduleSave();break}case"section":this.ui.section=e.index,this.changed("section");break;default:break}}macrosFor(e,t){let s=this.project;if(e==="bass"||e==="lead")return!s.parts[e].macros&&t&&(s.parts[e].macros=[null,null,null,null,null,null,null]),s.parts[e].macros;let a=+e.slice(1);return!s.parts.drum.macros[a]&&t&&(s.parts.drum.macros[a]=[null,null,null,null,null,null,null]),s.parts.drum.macros[a]}macroValue(e,t){let s=this.macrosFor(e,!1);if(s&&s[t]!==null&&s[t]!==void 0)return s[t];let a=this.presetFor(e);if(t===6)return a&&a.expr&&a.expr.def!==void 0?a.expr.def:.5;let o=a&&a.macros&&a.macros[t];return o&&o.def!==void 0?o.def:.5}presetFor(e){let t=this.project;return e==="bass"||e==="lead"?we(t.parts[e].preset):we(t.parts.drum.kit[+e.slice(1)])}get pattern(){return this.project.patterns[this.project.current]}setPreset(e,t,s){let a=this.project;this.snapshot(),e==="drum"?(a.parts.drum.kit[t]=s,a.parts.drum.macros[t]=null):(a.parts[e].preset=s,a.parts[e].macros=null),this.send(this.presetMessage(e,t)),this.changed("preset"),this.scheduleSave()}applyKit(e,t){let s=Ri(e);if(!s)return;this.snapshot();let a=this.project;if(a.parts.drum.kit=s.kit.slice(),a.parts.drum.macros=[null,null,null,null],a.parts.drum.rhythm=s.rhythm.slice(),t){s.bass&&(a.parts.bass.preset=s.bass,a.parts.bass.macros=null),s.lead&&(a.parts.lead.preset=s.lead,a.parts.lead.macros=null);let o=ct(s.style);o&&(a.tempo=o.bpm,a.key=o.key,a.scale=o.scale)}this.syncAll(),this.changed("project"),this.scheduleSave()}set(e,t,s={}){let a=this.project;switch(s.undo&&this.snapshot(),e){case"tempo":a.tempo=Math.round(Math.min(220,Math.max(40,t))),this.send({type:"set",key:e,value:a.tempo});break;case"swing":a.swing=Math.min(75,Math.max(50,Math.round(t))),this.send({type:"set",key:e,value:a.swing});break;case"key":a.key=(t%12+12)%12,this.send({type:"set",key:e,value:a.key});break;case"scale":a.scale=t,this.send({type:"set",key:e,value:t});break;case"bars":gi(a,t),this.send({type:"project",project:a});break;default:break}this.changed(e),this.scheduleSave()}setPart(e,t,s,a){let o=this.project;if(e==="drum")o.parts.drum[t][a]=s,this.send({type:"set",key:t,value:s,part:e,lane:a});else{let r=o.parts[e];t==="steps"?yi(r,s,o.scale):t==="range"?r.range=s:(r[t]=s,this.send({type:"set",key:t==="q"?"quant":t,value:s,part:e}))}this.changed(e+":"+t),this.scheduleSave()}setMix(e,t){let s=this.project;s.mix[e]=t,this.send({type:"set",key:"mix",value:{[e]:t}}),this.changed("mix"),this.scheduleSave()}setLevel(e,t,s){e==="drum"?(this.project.parts.drum.level[t]=s,this.send({type:"set",key:"level",part:e,lane:t,value:s})):(this.project.parts[e].level=s,this.send({type:"set",key:"level",part:e,value:s})),this.changed("mix"),this.scheduleSave()}setMute(e,t,s){e==="drum"?(this.project.parts.drum.mute[t]=s,this.send({type:"set",key:"mute",part:e,lane:t,value:s})):(this.project.parts[e].mute=s,this.send({type:"set",key:"mute",part:e,value:s})),this.changed("mix"),this.scheduleSave()}eraseSpan(e,t,s,a){this.snapshot();let o=this.pattern;Sa(o,e,t,s,a,!0),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearPart(e,t){this.snapshot();let s=384*this.project.bars;Sa(this.pattern,e,t,0,s,!1),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearAuto(e,t){this.snapshot();let s=this.pattern;s.auto[e]&&(t===void 0?delete s.auto[e]:(delete s.auto[e][t],Object.keys(s.auto[e]).length||delete s.auto[e]));let a=t===void 0?[0,1,2,3,4,5,6]:[t];for(let o of a)this.send({type:"auto",pat:this.project.current,target:e,slot:o,data:null});this.changed("auto"),this.scheduleSave()}pushPattern(e,t){let s=this.pattern,a=this.project.current;if(s.gest&&this.send({type:"gest",pat:a,part:e,data:s.gest[e]||[]}),e==="drum"){let o=t==null?[0,1,2,3]:[t];for(let r of o)this.send({type:"pattern",pat:a,part:e,lane:r,data:s.drum[r].hits});for(let r of o)this.pushAuto("d"+r)}else this.send({type:"pattern",pat:a,part:e,data:s[e].notes}),this.pushAuto(e)}pushAuto(e){let t=this.pattern,s=this.project.current;for(let a=0;a<7;a++)this.send({type:"auto",pat:s,target:e,slot:a,data:t.auto[e]&&t.auto[e][a]?t.auto[e][a]:null})}selectPattern(e){let t=this.project;e<0||e>=t.patterns.length||(t.current=e,this.send({type:"set",key:"current",value:e}),this.changed("pattern"),this.scheduleSave())}addPattern(e){let t=this.project;if(t.patterns.length>=8)return;this.snapshot();let s=String.fromCharCode(65+t.patterns.length),a=e!==void 0?{...JSON.parse(JSON.stringify(t.patterns[e])),name:s}:Lt(s);t.patterns.push(a),t.current=t.patterns.length-1,this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave()}deletePattern(e){let t=this.project;t.patterns.length<=1||(this.snapshot(),t.patterns.splice(e,1),t.patterns.forEach((s,a)=>{s.name=String.fromCharCode(65+a)}),t.song.sections=t.song.sections.filter(s=>s.p!==e).map(s=>({...s,p:s.p>e?s.p-1:s.p})),t.current=Math.min(t.current,t.patterns.length-1),t.song.sections.length||(t.song.enabled=!1),this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave())}setSong(e,t=!0){t&&this.snapshot(),this.project.song=e,this.send({type:"set",key:"song",value:e}),this.changed("song"),this.scheduleSave()}autoArrange(){let e=this.project,t=0,s=e.patterns.length>1?1:0,a=(r,n,l={})=>({p:r,reps:n,mute:l}),o=[a(t,2,{d0:!0,bass:!0,lead:!0}),a(t,2,{lead:!0}),a(s,4),a(t,2,{d0:!0,d1:!0,bass:!0}),a(s,4),a(t,2,{bass:!0,d2:!0,d3:!0})];this.setSong({enabled:!0,sections:o})}setErase(e){this.ui.erase=e,this.send({type:"erase",on:e}),this.changed("erase")}exportProjectJSON(){return JSON.stringify({...this.project,app:"MOTIF 3",exported:new Date().toISOString()},null,1)}importProjectText(e){let t=JSON.parse(e),s=qt(t);return s.id=It(),s.updated=Date.now(),this.loadProject(s),s}async backupAll(){let e=await je.all("projects");return JSON.stringify({format:"motif-3-backup",exported:new Date().toISOString(),projects:e},null,1)}async restoreBackup(e){let t=JSON.parse(e);if(t.format!=="motif-3-backup"||!Array.isArray(t.projects))throw new Error("Sauvegarde non reconnue");let s=0;for(let a of t.projects)try{let o=qt(a);await je.put("projects",o),s++}catch{}return s}};var zs=class{constructor({workletUrl:e,onMessage:t,onState:s}){this.workletUrl=e,this.onMessage=t,this.onState=s||(()=>{}),this.ctx=null,this.node=null,this.ready=!1,this.starting=null,this.samples=new Map,this.sampleSets=[],this.loadedBanks=new Set,this.replay=()=>[],this.queue=[],this.lastFrameCheck=0,this.setSessionType()}setSessionType(){try{"audioSession"in navigator&&(navigator.audioSession.type="playback")}catch{}}get running(){return!!(this.ctx&&this.ctx.state==="running"&&this.ready)}start(){return this.running?Promise.resolve(!0):this.ctx&&this.ready&&this.ctx.state!=="closed"?this.ctx.resume().then(()=>this.ctx.state==="running"):this.starting?this.starting:(this.starting=this.build().finally(()=>{this.starting=null}),this.starting)}async build(){this.setSessionType();let e=window.AudioContext||window.webkitAudioContext,t=new e({latencyHint:"interactive"});this.ctx=t;let s=t.resume();t.onstatechange=()=>this.onState(t.state),await t.audioWorklet.addModule(this.workletUrl);let a=new AudioWorkletNode(t,"motif-engine",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]});a.port.onmessage=n=>this.receive(n.data),a.onprocessorerror=()=>{this.ready=!1,this.onState("error")},a.connect(t.destination),this.node=a;let o=Array.from(this.samples.values());o.length&&a.port.postMessage({type:"samples",list:o}),this.sampleSets.length&&a.port.postMessage({type:"sampleSets",sets:this.sampleSets});let r=this.replay();r.length&&a.port.postMessage({type:"batch",list:r});for(let n of this.queue)a.port.postMessage(n);this.queue.length=0,this.ready=!0;try{await s}catch{}return this.onState(t.state),t.state==="running"}async rebuild(){let e=this.ctx;if(this.ready=!1,this.node=null,this.ctx=null,e)try{await e.close()}catch{}return this.start()}receive(e){if(e){if(e.type==="batch"){for(let t of e.list)this.onMessage(t);return}this.onMessage(e)}}send(e){this.node&&this.ready?this.node.port.postMessage(e):e.type==="project"||e.type==="preset"||e.type==="set"||e.type==="macro"||e.type==="pattern"||e.type}suspend(){return this.ctx&&this.ctx.state==="running"?this.ctx.suspend().catch(()=>{}):Promise.resolve()}async probe(e=350){if(!this.ctx)return!1;let t=this.ctx.currentTime;return await new Promise(s=>setTimeout(s,e)),this.ctx.state==="running"&&this.ctx.currentTime>t}async loadBank(e,t){if(this.loadedBanks.has(e))return;let s=await fetch(e);if(!s.ok)throw new Error("Banque introuvable : "+e);let a=await s.json(),o=e.slice(0,e.lastIndexOf("/")+1),r=this.ctx||new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(1,1,48e3),n=0,l=[],d=a.samples.map(async c=>{if(this.samples.has(c.id))return;let h=await fetch(o+c.file);if(!h.ok)throw new Error("Son manquant : "+c.file);let f=await h.arrayBuffer(),p=await Ar(r,f),m=p.getChannelData(0),v;if(p.numberOfChannels>1){let x=p.getChannelData(1);v=new Float32Array(m.length);for(let S=0;S<v.length;S++)v[S]=.5*(m[S]+x[S])}else v=new Float32Array(m);let b=new Float32Array(v.length+4);b.set(v,1);let y={id:c.id,sr:p.sampleRate,data:b,gain:c.gain||1,loopStart:c.loopStart?c.loopStart*p.sampleRate/c.sr+1:0,loopEnd:c.loopEnd?c.loopEnd*p.sampleRate/c.sr+1:0};this.samples.set(c.id,y),l.push(y),n++,t&&t(n/a.samples.length)});if(await Promise.all(d),a.sets)for(let c of a.sets)this.sampleSets.find(h=>h.id===c.id)||this.sampleSets.push(c);this.loadedBanks.add(e),this.node&&this.ready&&(l.length&&this.node.port.postMessage({type:"samples",list:l}),this.node.port.postMessage({type:"sampleSets",sets:this.sampleSets}))}};function Ar(i,e){return new Promise((t,s)=>{let a=i.decodeAudioData(e,t,s);a&&a.then&&a.then(t,s)})}function u(i,e,...t){let s=document.createElement(i);if(e)for(let a in e){let o=e[a];if(!(o==null||o===!1))if(a==="class")s.className=o;else if(a==="html")s.innerHTML=o;else if(a==="text")s.textContent=o;else if(a.startsWith("on"))s.addEventListener(a.slice(2),o);else if(a==="style"&&typeof o=="object")for(let r in o)r.startsWith("--")?s.style.setProperty(r,o[r]):s.style[r]=o[r];else s.setAttribute(a,o===!0?"":o)}for(let a of t.flat())a!=null&&a!==!1&&s.append(a.nodeType?a:document.createTextNode(String(a)));return s}function _r(i){let e=document.createElement("template");return e.innerHTML=i.trim(),e.content.firstChild}var he=(i,e="")=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${e}>${i}</svg>`,Dr={logo:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="9" width="3.2" height="6" rx="1.6" fill="var(--drum)"/><rect x="7" y="5" width="3.2" height="14" rx="1.6" fill="var(--bass)"/><rect x="12" y="2" width="3.2" height="20" rx="1.6" fill="var(--lead)"/><rect x="17" y="7" width="3.2" height="10" rx="1.6" fill="currentColor" opacity=".55"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" fill="currentColor"/></svg>',stop:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor"/></svg>',rec:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.5"/></svg>',undo:he('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'),redo:he('<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>'),erase:he('<path d="m7 21-4.3-4.3a1.5 1.5 0 0 1 0-2.1L13.4 3.9a1.5 1.5 0 0 1 2.1 0l4.6 4.6a1.5 1.5 0 0 1 0 2.1L10 21"/><path d="M22 21H7"/><path d="m5.5 12 6.5 6.5"/>'),trash:he('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>'),left:he('<path d="m15 18-6-6 6-6"/>'),right:he('<path d="m9 18 6-6-6-6"/>'),down:he('<path d="m6 9 6 6 6-6"/>'),close:he('<path d="M18 6 6 18M6 6l12 12"/>'),plus:he('<path d="M12 5v14M5 12h14"/>'),check:he('<path d="M20 6 9 17l-5-5"/>'),more:he('<circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/>'),drum:he('<circle cx="7" cy="8" r="1.4" fill="currentColor"/><circle cx="12" cy="8" r="1.4" fill="currentColor"/><circle cx="17" cy="8" r="1.4" fill="currentColor"/><circle cx="7" cy="14" r="1.4" fill="currentColor"/><circle cx="12" cy="14" r="1.4" fill="currentColor"/><circle cx="17" cy="14" r="1.4" fill="currentColor"/>','stroke-width="1"'),bass:he('<path d="M2 13c2.5 0 2.5-6 5-6s2.5 10 5 10 2.5-10 5-10 2.5 6 5 6"/>'),lead:he('<path d="M3 15l4-7 4 9 4-11 3 7h3"/>'),pattern:he('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 4v16M13 4v16M18 4v16" opacity=".55"/>'),tweaks:he('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="9" cy="10" r="2.2"/><circle cx="15" cy="15" r="2.2"/>'),mix:he('<path d="M6 4v16M12 4v16M18 4v16"/><rect x="4" y="13" width="4" height="3" rx="1" fill="currentColor"/><rect x="10" y="7" width="4" height="3" rx="1" fill="currentColor"/><rect x="16" y="11" width="4" height="3" rx="1" fill="currentColor"/>'),song:he('<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="18" r="2"/>'),share:he('<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'),download:he('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'),folder:he('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),file:he('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),note:he('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),sun:he('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:he('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),info:he('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),wifi:he('<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>'),copy:he('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),sparkle:he('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>'),speaker:he('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),metro:he('<path d="M9.2 3h5.6l4.2 18H5z"/><path d="M12 15.5 17.5 6"/><path d="M8 15.5h8"/>'),dice:he('<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/>'),piano:he('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 13v7M15 13v7"/><rect x="7.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/><rect x="13.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/>'),settings:he('<path d="M4 7h9M18 7h2M4 17h3M12 17h8"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="9.5" cy="17" r="2.3"/>'),touch:he('<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="7.5" opacity=".55"/>'),pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/></svg>'};function Q(i){return _r(Dr[i])}function Pr(){return Math.min(window.devicePixelRatio||1,2.5)}function bt(i){let e=i.getBoundingClientRect(),t=Pr(),s=Math.max(1,Math.round(e.width*t)),a=Math.max(1,Math.round(e.height*t));return(i.width!==s||i.height!==a)&&(i.width=s,i.height=a),{w:e.width,h:e.height,d:t}}function De(i,e=document.querySelector(".app")||document.documentElement){return getComputedStyle(e).getPropertyValue(i).trim()}function Di(i,{get:e,set:t,step:s=12,axis:a="y",onStart:o,onEnd:r,onTap:n}){let l=null;i.addEventListener("pointerdown",c=>{c.preventDefault();try{i.setPointerCapture(c.pointerId)}catch{}l={x:c.clientX,y:c.clientY,v:e(),moved:!1,id:c.pointerId},o&&o()}),i.addEventListener("pointermove",c=>{if(!l||c.pointerId!==l.id)return;let h=a==="y"?l.y-c.clientY:c.clientX-l.x;Math.abs(h)>4&&(l.moved=!0),l.moved&&t(l.v+Math.round(h/s),c)});let d=c=>{if(!l||c.pointerId!==l.id)return;let h=l;l=null,!h.moved&&n&&n(c),r&&r()};i.addEventListener("pointerup",d),i.addEventListener("pointercancel",d)}var at=class{constructor(e){this.o=e,this.el=u("div",{class:"dial",role:"slider",tabindex:"0","aria-label":e.label}),this.cv=u("canvas"),this.vEl=u("div",{class:"v"}),this.lEl=u("div",{class:"l",text:e.label}),this.sEl=u("div",{class:"s"}),this.el.append(this.cv,this.vEl,this.lEl,this.sEl);let t=null;this.el.addEventListener("pointerdown",a=>{a.preventDefault();try{this.el.setPointerCapture(a.pointerId)}catch{}t={x:a.clientX,y:a.clientY,v:this.o.get(),id:a.pointerId,moved:!1,axis:null},this.el.classList.add("active"),e.onStart&&e.onStart()}),this.el.addEventListener("pointermove",a=>{if(!t||a.pointerId!==t.id)return;let o=a.clientX-t.x,r=t.y-a.clientY;if(!t.axis&&Math.hypot(o,r)>8&&(t.axis=Math.abs(o)>Math.abs(r)*1.3?"x":"y"),t.axis==="x"&&e.onSwipeX&&!t.swiped&&Math.abs(o)>26&&(t.swiped=!0,e.onSwipeX(o>0?1:-1),t.v=this.o.get(),t.y=a.clientY,t.axis="y2"),t.axis==="y"||t.axis==="y2"){t.moved=!0;let n=e.step||14,l=Math.max(e.min(),Math.min(e.max(),t.v+Math.round(r/n)));l!==this.o.get()&&(this.o.set(l),this.render())}});let s=a=>{if(!t||a.pointerId!==t.id)return;let o=t;t=null,this.el.classList.remove("active"),!o.axis&&e.onTap&&e.onTap(),e.onEnd&&e.onEnd()};this.el.addEventListener("pointerup",s),this.el.addEventListener("pointercancel",s),this.el.addEventListener("keydown",a=>{let o=a.key==="ArrowUp"||a.key==="ArrowRight"?1:a.key==="ArrowDown"||a.key==="ArrowLeft"?-1:0;if(o){a.preventDefault();let r=Math.max(e.min(),Math.min(e.max(),this.o.get()+o));this.o.set(r),this.render()}else(a.key==="Enter"||a.key===" ")&&e.onTap&&(a.preventDefault(),e.onTap())})}render(){let e=this.o,t=e.format(e.get());this.vEl.textContent=t.v,this.sEl.textContent=t.s||"",t.l!==void 0&&(this.lEl.textContent=t.l),this.el.setAttribute("aria-valuenow",String(e.get())),this.el.setAttribute("aria-valuetext",`${t.v} ${t.s||""}`.trim()),this.el.classList.toggle("ties",!!t.ties);let{w:s,h:a,d:o}=bt(this.cv),r=this.cv.getContext("2d");r.setTransform(o,0,0,o,0,0),r.clearRect(0,0,s,a),e.ring&&e.ring(r,s,a,e.get())}};function qa(i,e,t,s,a,o,r,n){let l=e/2,d=t/2-2,c=Math.min(e,t)/2-8;if(i.lineCap="round",i.strokeStyle=n,i.lineWidth=1,i.beginPath(),i.arc(l,d,c,0,Math.PI*2),i.stroke(),!s||!s.len){i.strokeStyle=r,i.lineWidth=3,i.globalAlpha=.6,i.beginPath(),i.arc(l,d,c,-Math.PI/2,Math.PI*1.5),i.stroke(),i.globalAlpha=1;return}let h=f=>-Math.PI/2+f/s.len*Math.PI*2;if(s.ev.forEach(([f,p,m],v)=>{let b=h(f),y=h(Math.min(f+p,s.len))-.02;if(i.strokeStyle=r,i.lineWidth=m?5:3.5,i.beginPath(),i.arc(l,d,c,b+.03,Math.max(b+.06,y)),i.stroke(),a&&a.includes(v)){let x=s.ev[(v-1+s.ev.length)%s.ev.length];i.strokeStyle=r,i.lineWidth=2,i.globalAlpha=.9,i.beginPath(),i.arc(l,d,c-8,h(x[0])+.05,b-.02+(v===0?Math.PI*2:0)),i.stroke(),i.globalAlpha=1,i.fillStyle=r,i.beginPath(),i.arc(l+Math.cos(b)*(c-8),d+Math.sin(b)*(c-8),2.6,0,Math.PI*2),i.fill()}}),o>=0){let f=h(o);i.fillStyle=De("--ink"),i.beginPath(),i.arc(l+Math.cos(f)*c,d+Math.sin(f)*c,3,0,Math.PI*2),i.fill()}}var Nt=Ot.lo,fs=Ot.hi,qr=Ot.maxN;function ms(i,e){let t=48+e+i;return St[(t%12+12)%12]+(Math.floor(t/12)-1)}var Us=class{constructor({get:e,set:t,scale:s,onStart:a}){this.get=e,this.set=t,this.scale=s,this.onStart=a,this.el=u("div",{class:"range",role:"group","aria-label":"Plage de notes",tabindex:"0"}),this.cv=u("canvas"),this.lbl=u("div",{class:"lbl"}),this.el.append(this.cv,this.lbl),this.drag=null,this.el.addEventListener("pointerdown",o=>this.down(o)),this.el.addEventListener("pointermove",o=>this.move(o)),this.el.addEventListener("pointerup",o=>this.up(o)),this.el.addEventListener("pointercancel",o=>this.up(o)),this.el.addEventListener("keydown",o=>this.key(o))}x2semi(e){return Nt+e/this.w*(fs-Nt)}semi2x(e){return(e-Nt)/(fs-Nt)*this.w}notes(){let{scale:e,steps:t}=this.scale();return Os(e,t)}windowPx(){let{scale:e,steps:t}=this.scale(),s=this.get(),a=nt(s,e,t),o=a[0].semi,r=a[a.length-1].semi;return{x0:this.semi2x(o-.45),x1:this.semi2x(r+.55),lo:o,hi:r,cols:a}}nearestNote(e){let t=this.notes(),s=t[0],a=1/0;for(let o of t){let r=Math.abs(o-e);r<a&&(a=r,s=o)}return s}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.el.getBoundingClientRect(),s=e.clientX-t.left,a=this.windowPx(),o=Math.max(18,Math.min(30,(a.x1-a.x0)*.25)),r;Math.abs(s-a.x0)<=o&&s<(a.x0+a.x1)/2?r="left":Math.abs(s-a.x1)<=o&&s>(a.x0+a.x1)/2?r="right":s>a.x0&&s<a.x1?r="move":r="jump";let n=this.get();this.drag={id:e.pointerId,mode:r,x0:s,lo:a.lo,hi:a.hi,n:n.n,moved:!1},this.onStart&&this.onStart(),r==="jump"&&this.jumpTo(s,n.n),this.render()}jumpTo(e,t){let{scale:s,steps:a}=this.scale(),o=this.notes(),r=this.x2semi(e),n=0,l=1/0;o.forEach((c,h)=>{let f=Math.abs(c-r);f<l&&(l=f,n=h)});let d=ka({lo:o[Math.max(0,n-Math.floor(t/2))],n:t},o[Math.max(0,n-Math.floor(t/2))],s,a);this.set(d),this.drag.lo=d.lo,this.drag.mode="move",this.drag.x0=e}move(e){let t=this.drag;if(!t||e.pointerId!==t.id)return;let s=this.el.getBoundingClientRect(),a=e.clientX-s.left;Math.abs(a-t.x0)>3&&(t.moved=!0);let o=(a-t.x0)/this.w*(fs-Nt),{scale:r,steps:n}=this.scale(),l=this.get(),d;t.mode==="move"?d=ka({lo:t.lo,n:t.n},t.lo+o,r,n):t.mode==="left"?d=wa({lo:t.lo,n:t.n},"left",t.lo+o,r,n):t.mode==="right"&&(d=wa({lo:t.lo,n:t.n},"right",t.hi+o,r,n)),d&&(d.lo!==l.lo||d.n!==l.n)&&this.set(d),this.render()}up(e){this.drag&&e.pointerId===this.drag.id&&(this.drag=null,this.render())}key(e){let t=this.notes(),s=this.get(),a=t.indexOf(this.nearestNote(s.lo));if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();let o=e.key==="ArrowRight"?1:-1;if(e.shiftKey)this.set({lo:s.lo,n:Math.max(1,Math.min(qr,s.n+o))});else{let r=Math.max(0,Math.min(t.length-s.n,a+o));this.set({lo:t[r],n:s.n})}this.render()}}render(){let{w:e,h:t,d:s}=bt(this.cv);this.w=e,this.h=t;let a=this.cv.getContext("2d");a.setTransform(s,0,0,s,0,0),a.clearRect(0,0,e,t);let{scale:o,steps:r,key:n}=this.scale(),l=De("--accent"),d=De("--ink"),c=De("--ink-3"),h=document.documentElement.dataset.theme==="dark",f=6,p=t-18;for(let S=Math.floor(Nt/12);S<Math.ceil(fs/12);S++){let R=this.semi2x(S*12-.5),B=this.semi2x(S*12+11.5);a.fillStyle=S%2===0?h?"rgba(255,255,255,0.045)":"rgba(0,0,0,0.045)":"rgba(0,0,0,0)",a.fillRect(R,f,B-R,p-f)}let m=this.windowPx(),v=9;a.fillStyle=l,a.globalAlpha=h?.22:.3,Pe(a,m.x0,f-2,m.x1-m.x0,p-f+4,v),a.fill(),a.globalAlpha=1,a.strokeStyle=l,a.lineWidth=2,Pe(a,m.x0,f-2,m.x1-m.x0,p-f+4,v),a.stroke();let b=this.notes(),y=e/(fs-Nt);for(let S of b){let R=this.semi2x(S),B=S>=m.lo&&S<=m.hi,H=(S%12+12)%12===0,ie=Math.floor(S/12);a.fillStyle=B?d:c,a.globalAlpha=B?ie%2===0?1:.72:.35;let K=Math.max(2,Math.min(y*.55,6)),D=H?p-f-4:(p-f)*.62;Pe(a,R-K/2,p-2-D,K,D,K/2),a.fill(),a.globalAlpha=1}a.fillStyle=l;for(let S of[m.x0,m.x1])Pe(a,S-3.5,f+(p-f)/2-11,7,22,3.5),a.fill();this.drag&&(a.fillStyle=l,a.globalAlpha=.12,a.fillRect(0,0,e,t),a.globalAlpha=1);let x=m.cols.length;this.lbl.textContent=`${ms(m.lo,n)} \u2192 ${ms(m.hi,n)} \xB7 ${x} note${x>1?"s":""}`,this.el.setAttribute("aria-label","Plage de notes : "+this.lbl.textContent)}};function Pe(i,e,t,s,a,o){o=Math.max(0,Math.min(o,s/2,a/2)),i.beginPath(),i.moveTo(e+o,t),i.lineTo(e+s-o,t),i.quadraticCurveTo(e+s,t,e+s,t+o),i.lineTo(e+s,t+a-o),i.quadraticCurveTo(e+s,t+a,e+s-o,t+a),i.lineTo(e+o,t+a),i.quadraticCurveTo(e,t+a,e,t+a-o),i.lineTo(e,t+o),i.quadraticCurveTo(e,t,e+o,t),i.closePath()}function Ca(i){return Array.from({length:i},(e,t)=>({x0:t/i,y0:0,x1:(t+1)/i,y1:1}))}function Pi(i){let{keys:e,whites:t}=i,s=[];for(let o of e)o.black||s.push({x0:o.pos/t,y0:0,x1:(o.pos+1)/t,y1:1});let a=$t/t/2;for(let o of e)o.black&&s.push({x0:o.pos/t-a,y0:0,x1:o.pos/t+a,y1:Dt,cut:!0});return s}var zt={plain:0,shaded:1,white:2,black:3,laneEven:4,laneOdd:5};function Zt(i){if(i=(i||"").trim(),i.startsWith("color(")){let t=i.match(/[\d.]+/g).map(Number);return[t[t.length-3],t[t.length-2],t[t.length-1]].map(s=>s>1?s/255:s)}if(i.startsWith("#"))return(i.length===4?i.slice(1).split("").map(s=>s+s):[i.slice(1,3),i.slice(3,5),i.slice(5,7)]).map(s=>parseInt(s,16)/255);let e=i.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[0,0,0]}function Cr(i,e,t,s){let a=n=>[1,1,1,n],o=n=>[0,0,0,n],r=n=>[...e,n];return s?[a(0),a(.03),a(.06),[.035,.015,.055,.72],a(0),a(.025)]:i?[a(0),a(.035),a(.075),[.031,.035,.047,1],a(0),a(.03)]:t==="aquarelle"?[o(0),o(.03),a(.55),[.16,.14,.13,.93],o(0),o(.025)]:t==="vitrail"?[o(.02),a(.16),a(.4),r(.9),a(.12),o(.03)]:[o(.035),a(.13),a(.34),r(.88),a(.1),o(.04)]}var qi={classique:0,aquarelle:1,vitrail:2},Ci=(i,e,t)=>i.map((s,a)=>s+(e[a]-s)*t);function Oa({kind:i,keys:e,sig:t,el:s,glass:a,hdr:o,slabs:r,fills:n,spill:l=0,radius:d,look:c="aquarelle",gel:h=1,glassLook:f="optique"}){let p=getComputedStyle(s.closest(".app")||document.documentElement),m=document.documentElement.dataset.theme!=="light",v=document.documentElement.hasAttribute("data-halloween"),b=Zt(p.getPropertyValue("--accent")),y=Zt(p.getPropertyValue("--accent-ink"));(m||!(c in qi))&&(c=m?"dark":"aquarelle");let x=c==="aquarelle",S=m?[26/255,28/255,35/255]:x?[.98,.965,.933]:c==="vitrail"?Ci(b,[1,1,1],.35):b,R=m?[18/255,19/255,24/255]:x?[.945,.918,.871]:c==="vitrail"?Ci(b,[1,1,1],.1):b,B=x?[.25,.2,.15,e&&e.length<=4?.18:.12]:i==="pad"&&e&&e.length<=4?m?[1,1,1,.1]:[0,0,0,.12]:m?[1,1,1,.06]:[0,0,0,.07],H=d||parseFloat(getComputedStyle(s).borderTopLeftRadius)||20,ie=Zt(p.getPropertyValue("--surface")),K=Zt(p.getPropertyValue("--bg")),D=a?m?1:.6:0;return{kind:i,keys:e,dark:m,accent:b,bgTop:S,bgBot:R,sep:B,sepPx:e&&e.length<=4?2:1,kinds:Cr(m,y,c,v),glass:!!a,hdr:o||1,radius:H,surf:ie,appBg:K,slabs:r||[[0,0,1,1]],fills:n||[],spill:a?l:0,shadow:D,style:m?0:qi[c],gel:h,glassLook:f,keyGlow:m||x?[...b,x?.55:.5]:[1,1,1,.55],sig:`${i}|${t}|${m}|${v}|${c}|${h}|${f}|${b.join()}|${a}|${o}|${H}|${l}|${JSON.stringify(r||0)}|${JSON.stringify(n||0)}`}}function js(i,e,t,s){i.width=t,i.height=s;let a=i.getContext("2d");return a.imageSmoothingEnabled=!1,a.fillStyle="#000",a.fillRect(0,0,t,s),(e||[]).forEach((o,r)=>{let n=Math.round(o.x0*t),l=Math.round(o.x1*t),d=Math.round(o.y0*s),c=Math.round(o.y1*s);o.cut&&(a.fillStyle="#000",a.fillRect(n-1,d,l-n+2,c-d+1)),a.fillStyle=`rgb(${r+1},${(o.kind||0)*40},0)`,a.fillRect(n,d,Math.max(1,l-n),Math.max(1,c-d))}),i}function vs(i,e,t,s){i.width=t,i.height=s;let a=i.getContext("2d");if(a.imageSmoothingEnabled=!1,!e)return a.fillStyle="rgb(1,0,0)",a.fillRect(0,0,t,s),i;a.fillStyle="#000",a.fillRect(0,0,t,s);let o=Math.max(1,Math.round(t/180));return e.forEach((r,n)=>{let l=Math.round(r.x0*t),d=Math.round(r.x1*t),c=Math.round(r.y0*s),h=Math.round(r.y1*s);r.cut&&(a.fillStyle="#000",a.fillRect(l-o,c,d-l+2*o,h-c+o)),a.fillStyle=`rgb(${n+1},0,0)`,a.fillRect(l+o,c+(r.y0>0?o:0),Math.max(1,d-l-2*o),Math.max(1,h-c-(r.y0>0?o:0)-(r.y1<1?o:0)))}),i}var Gs=class{constructor(e,t={}){this.store=e,this.opts=t,this.el=u("div",{class:"pad",role:"application","aria-label":"Surface de jeu"}),this.cv=u("canvas"),this.hint=u("div",{class:"hint"},u("b",{text:"\xC0 toi de jouer."}),u("span",{text:""})),this.axY=u("div",{class:"ax y"}),this.el.append(this.cv,this.hint,this.axY),this.touches=new Map,this.ripples=[],this.level=0,this.raf=0,this.flash=new Map,this.ghosts=[],this.fx=null,this.ghouls=null,this.gpu=!1,this.under=!1,this.inkUnder=!1,this.pianoCache=null,this.el.addEventListener("pointerdown",s=>this.down(s)),this.el.addEventListener("pointermove",s=>this.move(s)),this.el.addEventListener("pointerup",s=>this.up(s)),this.el.addEventListener("pointercancel",s=>this.up(s,!0)),this.el.addEventListener("lostpointercapture",s=>{this.touches.has(s.pointerId)&&this.up(s,!0)}),this.el.addEventListener("contextmenu",s=>s.preventDefault()),this.ro=new ResizeObserver(()=>this.draw()),this.ro.observe(this.el)}get part(){return this.store.ui.part}columns(){let e=this.store.project,t=e.parts[this.part];return nt(t.range,e.scale,t.steps)}get piano(){return this.part!=="drum"&&!!this.store.settings.piano}pianoLayout(){let e=this.store.project,t=e.parts[this.part],s=`${t.range.lo}:${t.range.n}:${e.scale}:${t.steps}:${e.key}`;return(!this.pianoCache||this.pianoCache.k!==s)&&(this.pianoCache={k:s,L:hi(t.range,e.scale,t.steps,e.key)}),this.pianoCache.L}inkShare(){return this.fx&&this.store.settings.fluid?.4:1}keyLayout(){if(this.part==="drum")return{sig:"drum",keys:Ca(4).map((a,o)=>({...a,kind:o%2?zt.laneOdd:zt.laneEven}))};if(this.piano){let a=this.pianoLayout();return{sig:"piano:"+this.pianoCache.k,keys:Pi(a).map(o=>({...o,kind:o.cut?zt.black:zt.white}))}}let e=this.columns(),t=e.length,s=a=>(a.octave%2+2)%2===0;return{sig:"cols:"+t+":"+e.map(a=>s(a)?1:0).join(""),keys:Ca(t).map((a,o)=>({...a,kind:s(e[o])?zt.shaded:zt.plain}))}}pitchClass(e,t){let s=this.store.project;return((s.key+Mt(e,t,s.scale))%12+12)%12}keyBox(e,t){if(!t.black)return{x0:t.pos/e.whites,w:1/e.whites};let s=$t/e.whites/2;return{x0:t.pos/e.whites-s,w:2*s}}setClock(e){this.clock=e,e.playing&&this.hasStrokes()&&this.kick()}playingPattern(){let e=this.clock,t=this.store.project;return e&&t.patterns[e.pat]||this.store.pattern}hasStrokes(e=this.part){let t=this.playingPattern().gest;return!!(t&&t[e]&&t[e].length)}clockTick(e){let t=this.clock;if(!t||!t.playing||t.tick<0)return-1;let s=Math.min(120,e-t.at)/t.msPerTick;return(t.tick+s)%t.L}pointToPad(e,t,s){if(e==="drum")return{x:(t+s[1])/4,y:1-s[2]};let a=this.store.project.scale,o=Mt(s[3],s[4],a);if(this.piano){let d=this.pianoLayout(),c=d.keys.find(f=>f.semi===o);if(!c)return null;let h=this.keyBox(d,c);return{x:h.x0+s[1]*h.w,y:(1-s[2])*(c.black?Dt:1)}}let r=this.columns(),n=-1,l=3;return r.forEach((d,c)=>{let h=Math.abs(d.semi-o);h<l&&(l=h,n=c)}),n<0?null:{x:(n+s[1])/r.length,y:1-s[2]}}strokeAt(e,t,s){let a=t.p,o=a.length;if(!o||s<a[0][0]||s>a[o-1][0]+(o===1?6:1.5))return null;let r=0;for(;r<o-1&&a[r+1][0]<=s;)r++;let n=this.pointToPad(e,t.l,a[r]);if(r===o-1)return n;let l=this.pointToPad(e,t.l,a[r+1]);if(!n||!l)return n||l;let d=(s-a[r][0])/Math.max(.1,a[r+1][0]-a[r][0]);return{x:n.x+(l.x-n.x)*d,y:n.y+(l.y-n.y)*d}}drawReplay(e,t,s,a,o,r){let n=this.clockTick(r),l=this.part,d=this.playingPattern().gest,c=new Map;if(n<0||!d||!d[l])return this.strokePrev=c,!1;let h=this.store.settings.ghosts,f=new Set([...this.touches.values()].map(p=>p.lane));for(let p of d[l]){if(l!=="drum"&&this.touches.size)break;if(l==="drum"&&f.has(p.l))continue;let m=this.strokeAt(l,p,n);if(!m)continue;let v=this.strokePrev&&this.strokePrev.get(p);if(c.set(p,m),this.fx){let R=p.p[0],B=l==="drum"?void 0:this.pitchClass(R[3],R[4]);v?(m.x!==v.x||m.y!==v.y)&&this.fx.touch(l,m.x,m.y,m.x-v.x,m.y-v.y,"move",p.l,B):this.fx.touch(l,m.x,m.y,0,0,"down",p.l,B)}if(!h)continue;e.lineCap="round",e.lineJoin="round";let b=m;for(let R=1;R<=14;R++){let B=this.strokeAt(l,p,n-R*2);if(!B)break;let H=1-R/15;e.strokeStyle=a?de(o,.55*H):`rgba(255,255,255,${.15+.6*H})`,e.lineWidth=2+12*H,e.beginPath(),e.moveTo(b.x*t,b.y*s),e.lineTo(B.x*t,B.y*s),e.stroke(),b=B}let y=m.x*t,x=m.y*s,S=e.createRadialGradient(y,x,0,y,x,46);a?(S.addColorStop(0,de(o,.32)),S.addColorStop(1,de(o,0))):(S.addColorStop(0,"rgba(255,255,255,0.45)"),S.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=S,e.fillRect(y-46,x-46,92,92),e.lineWidth=2,e.strokeStyle=a?de(o,.8):"rgba(255,255,255,0.9)",e.setLineDash([5,4]),e.beginPath(),e.arc(y,x,19,0,Math.PI*2),e.stroke(),e.setLineDash([])}return this.strokePrev=c,!0}keyGeom(e,t){return t.black?{x:t.pos/e.whites,top:Dt}:{x:(t.pos+.5)/e.whites,top:1}}local(e){let t=this.el.getBoundingClientRect();return{x:Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,(e.clientY-t.top)/t.height))}}msgFor(e,t,s){let a=this.part;if(a==="drum"){let l=Math.min(3,Math.floor(s.x*4)),d=s.x*4-l;return{type:"pad",part:a,lane:l,id:e,phase:t,x:d,y:1-s.y,v:.9}}if(this.piano){let l=this.pianoLayout(),d=di(l,s.x,s.y),c=d.black?1-Math.min(1,s.y/Dt):1-s.y,h=this.keyBox(l,d),f=Math.min(1,Math.max(0,(s.x-h.x0)/h.w));return{type:"pad",part:a,id:e,phase:t,deg:d.deg,acc:d.acc,y:c,fx:f,v:.85,col:l.keys.indexOf(d)}}let o=this.columns(),r=Math.min(o.length-1,Math.floor(s.x*o.length)),n=o[r];return{type:"pad",part:a,id:e,phase:t,deg:n.deg,acc:n.acc,y:1-s.y,fx:s.x*o.length-r,v:.85,col:r}}down(e){e.preventDefault(),this.opts.onFirstTouch&&this.opts.onFirstTouch();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.local(e),s=this.msgFor(e.pointerId,"down",t);this.touches.set(e.pointerId,{...t,rx:t.x,ry:t.y,lane:s.lane,col:s.col,deg:s.deg,acc:s.acc,t:performance.now()}),this.fx&&(this.fx.touch(this.part,t.x,t.y,0,0,"down",s.lane,s.deg!==void 0?this.pitchClass(s.deg,s.acc):void 0),this.fx.press(e.pointerId,t.x,t.y,"down")),this.ghouls&&this.ghouls.press(e.pointerId,t.x,t.y,"down"),this.store.send(s),this.hint.style.opacity="0",this.kick()}move(e){let t=this.touches.get(e.pointerId);if(!t)return;let s=this.local(e);if(this.fx&&(this.fx.touch(this.part,s.x,s.y,s.x-t.rx,s.y-t.ry,"move",t.lane,t.pc),this.fx.press(e.pointerId,s.x,s.y,"move"),t.rx=s.x,t.ry=s.y),this.ghouls&&this.ghouls.press(e.pointerId,s.x,s.y,"move"),this.part==="drum"){let a=t.lane,o=Math.min(.999,Math.max(0,s.x*4-a));this.store.send({type:"pad",part:"drum",lane:a,id:e.pointerId,phase:"move",x:o,y:1-s.y}),t.x=(a+o)/4,t.y=s.y}else{let a=this.msgFor(e.pointerId,"move",s);t.x=s.x,t.y=s.y,t.col=a.col,t.deg=a.deg,t.acc=a.acc,this.fx&&(t.pc=this.pitchClass(a.deg,a.acc)),this.store.send(a)}}up(e,t){let s=this.touches.get(e.pointerId);if(!s)return;this.touches.delete(e.pointerId),this.fx&&this.fx.press(e.pointerId,s.x,s.y,"up"),this.ghouls&&this.ghouls.press(e.pointerId,s.x,s.y,"up");let a=this.part;a==="drum"?this.store.send({type:"pad",part:a,lane:s.lane,id:e.pointerId,phase:t?"cancel":"up"}):this.store.send({type:"pad",part:a,id:e.pointerId,phase:t?"cancel":"up"})}releaseAll(){for(let[e,t]of this.touches)this.part==="drum"?this.store.send({type:"pad",part:"drum",lane:t.lane,id:e,phase:"cancel"}):this.store.send({type:"pad",part:this.part,id:e,phase:"cancel"});this.touches.clear()}get layers(){return!!(this.fx||this.ghouls&&this.ghouls.on)}noteFx(...e){this.fx&&this.fx.note(...e),this.ghouls&&this.ghouls.on&&this.ghouls.note(...e)}onTrig(e,t){if(t){let r=this.part==="drum"?t.drum:t[this.part];this.level=Math.max(this.level*.6,r||0)}if(!e){this.level>.01&&this.kick();return}let s=this.part,a=performance.now(),o=this.store.settings.ghosts&&!this.hasStrokes(s);for(let r=0;r<e.length;r+=4){let n=e[r],l=e[r+1],d=e[r+2],c=e[r+3];if(c===-1&&this.layers){if(s==="drum"&&n===0){for(let[,h]of this.touches)if(h.lane===l){this.noteFx("drum",h.x,h.y,l,.9);break}}else if(s==="bass"&&n===1||s==="lead"&&n===2){let h=null;for(let[,f]of this.touches)(!h||f.deg===l&&f.acc===d)&&(h=f);h&&this.noteFx(s,h.x,h.y,0,.9,this.pitchClass(l,d))}}if(s==="drum"&&n===0){if(this.ripples.push({lane:l,zone:d,t:a}),c!==-1){let h=(l+(d+.5)/3)/4,f=c>=0?1-c:.5;o&&c>=0&&this.ghosts.push({x:h,y:f,t:a}),this.layers&&this.noteFx("drum",h,f,l)}}else if(s==="bass"&&n===1||s==="lead"&&n===2){let h=c>=0?c:this.store.macroValue(s,6);if(this.piano){let f=this.pianoLayout(),p=Mt(l,d,this.store.project.scale),m=f.keys.findIndex(v=>v.semi===p);if(this.ripples.push({col:m,t:a}),c!==-1&&m>=0){let v=this.keyGeom(f,f.keys[m]);o&&this.ghosts.push({x:v.x,y:(1-h)*v.top,t:a}),this.layers&&this.noteFx(s,v.x,(1-h)*v.top,0,.8,this.pitchClass(l,d))}}else{let f=this.columns(),p=f.findIndex(m=>m.deg===l&&m.acc===d);this.ripples.push({col:p,deg:l,t:a}),c!==-1&&p>=0&&(o&&this.ghosts.push({x:(p+.5)/f.length,y:1-h,t:a}),this.layers&&this.noteFx(s,(p+.5)/f.length,1-h,0,.8,this.pitchClass(l,d)))}}}this.ripples.length>40&&this.ripples.splice(0,this.ripples.length-40),this.ghosts.length>24&&this.ghosts.splice(0,this.ghosts.length-24),this.kick()}kick(){this.raf||(this.raf=requestAnimationFrame(()=>{this.raf=0,this.draw(!0)}))}setHint(){let e=this.store.ui,t=this.store.presetFor(this.part==="drum"?"d0":this.part),s;e.erase?s="Gomme : touche pendant la lecture pour effacer":this.part==="drum"?s="Une colonne par son \xB7 \u2194 variante \xB7 \u2195\uFE0E caract\xE8re":s=`${this.piano?"Clavier":"Notes \u2194"} \xB7 ${t&&t.expr?t.expr.name:"Expression"} \u2195\uFE0E`,this.hint.querySelector("b").textContent=e.erase?"Gomme":e.armed&&!e.playing?"Pr\xEAt \xE0 enregistrer":"\xC0 toi de jouer.",this.hint.querySelector("span").textContent=e.armed&&!e.playing?"Le premier toucher lance la boucle":s,this.axY.textContent=this.part==="drum"?"Caract\xE8re":t&&t.expr?t.expr.name:"",this.axY.hidden=this.piano}showHint(e){this.hint.style.opacity=e?"1":"0"}draw(e){let{w:t,h:s,d:a}=bt(this.cv),o=this.cv.getContext("2d");o.setTransform(a,0,0,a,0,0);let r=document.documentElement.dataset.theme==="dark",n=De("--accent"),l=De("--accent-ink"),d=De("--ink"),c=performance.now();this.fx&&this.fx.syncScene(),this.under=this.gpu||!!(this.ghouls&&this.ghouls.stage);let h=this.under;if(o.clearRect(0,0,t,s),h&&(o.save(),Pe(o,0,0,t,s,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),o.clip()),!h){if(r){let v=o.createLinearGradient(0,0,0,s);v.addColorStop(0,"#1a1c23"),v.addColorStop(1,"#121318"),o.fillStyle=v}else o.fillStyle=n;o.fillRect(0,0,t,s)}this.part==="drum"?this.drawDrums(o,t,s,r,n,l,d,c):this.drawMelodic(o,t,s,r,n,l,d,c);for(let[,v]of this.touches){let b=v.x*t,y=v.y*s,x=Math.max(70,Math.min(t,s)*.35)*(1+this.level*.6),S=o.createRadialGradient(b,y,0,b,y,x);r?(S.addColorStop(0,de(n,.55+this.level*.3)),S.addColorStop(.35,de(n,.18)),S.addColorStop(1,de(n,0))):(S.addColorStop(0,"rgba(255,255,255,0.65)"),S.addColorStop(.4,"rgba(255,255,255,0.18)"),S.addColorStop(1,"rgba(255,255,255,0)")),o.globalCompositeOperation=r?"lighter":"source-over",o.fillStyle=S,o.fillRect(b-x,y-x,2*x,2*x),o.globalCompositeOperation="source-over",o.strokeStyle=r?de(n,.9):"rgba(255,255,255,0.9)",o.lineWidth=2,o.beginPath(),o.arc(b,y,22,0,Math.PI*2),o.stroke()}this.drawGhosts(o,t,s,r,n,c);let p=this.drawReplay(o,t,s,r,n,c);if(this.store.ui.erase){o.fillStyle=r?"rgba(255,80,80,0.08)":"rgba(0,0,0,0.08)";for(let v=-s;v<t;v+=22)o.beginPath(),o.moveTo(v,s),o.lineTo(v+s,0),o.lineTo(v+s+8,0),o.lineTo(v+8,s),o.fill()}h&&o.restore(),this.level*=.9;let m=this.touches.size||this.ripples.some(v=>c-v.t<600)||this.ghosts.length||this.level>.02||p;this.ripples=this.ripples.filter(v=>c-v.t<600),this.ghosts=this.ghosts.filter(v=>c-v.t<Oi),m&&e&&this.kick()}drawGhosts(e,t,s,a,o,r){for(let n of this.ghosts){let l=(r-n.t)/Oi;if(l>=1)continue;let d=n.x*t,c=Math.min(s-8,Math.max(8,n.y*s)),h=(1-l)*(1-l),f=15+10*l,p=e.createRadialGradient(d,c,0,d,c,f*2.2);a?(p.addColorStop(0,de(o,.35*h)),p.addColorStop(1,de(o,0))):(p.addColorStop(0,`rgba(255,255,255,${.5*h})`),p.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=p,e.fillRect(d-f*2.2,c-f*2.2,f*4.4,f*4.4),e.lineWidth=2,e.strokeStyle=a?de(o,.85*h):`rgba(255,255,255,${.95*h})`,e.beginPath(),e.arc(d,c,f,0,Math.PI*2),e.stroke(),e.fillStyle=a?de(o,.9*h):`rgba(255,255,255,${h})`,e.beginPath(),e.arc(d,c,3.5,0,Math.PI*2),e.fill()}}drawPiano(e,t,s,a,o,r,n){let l=this.pianoLayout(),d=t/l.whites,c=d*$t,h=s*Dt,f=this.store.project.key,p=new Set;for(let[,B]of this.touches)B.col!==void 0&&p.add(B.col);let m=new Map;for(let B of this.ripples)B.col>=0&&m.set(B.col,Math.max(m.get(B.col)||0,(1-(n-B.t)/600)*this.inkShare()));let v=!this.inkUnder,b=(B,H)=>p.has(H)?a?de(o,.75):"rgba(255,255,255,0.92)":B?a?"#08090c":de(r,.88):a?"rgba(255,255,255,0.075)":"rgba(255,255,255,0.34)",y=this.under?new Float32Array(64):null,x=l.whites,S=0,R=0;l.keys.forEach((B,H)=>{if(B.black)return;let ie=B.pos*d,K=m.get(H)||0;if(this.under?v&&(y[S]=Math.max(p.has(H)?1:0,K)):(e.fillStyle=b(!1,H),Pe(e,ie+1,0,d-2,s,Math.min(8,d/4)),e.fill(),K>0&&(e.fillStyle=a?de(o,.4*K):`rgba(255,255,255,${.5*K})`,Pe(e,ie+1,0,d-2,s,Math.min(8,d/4)),e.fill())),S++,this.keyMark(e,B,ie+d/2,s-30,a,o,r),d>20||B.isRoot){e.fillStyle=a?"rgba(255,255,255,0.5)":de(r,.65),e.font=`600 ${d>30?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let D=ms(B.semi,f);e.fillText(B.isRoot||d>30?D:D.replace(/-?\d+$/,""),ie+d/2,s-10)}}),l.keys.forEach((B,H)=>{if(!B.black)return;let ie=B.pos/l.whites*t-c/2,K=m.get(H)||0;this.under?v&&(y[x+R]=Math.max(p.has(H)?1:0,K)):(e.fillStyle=b(!0,H),Pe(e,ie,-6,c,h+6,Math.min(6,c/4)),e.fill(),a&&!p.has(H)&&(e.strokeStyle="rgba(255,255,255,0.10)",e.lineWidth=1,Pe(e,ie+.5,-6,c-1,h+5.5,Math.min(6,c/4)),e.stroke()),K>0&&(e.fillStyle=de(o,.55*K),Pe(e,ie,-6,c,h+6,Math.min(6,c/4)),e.fill())),R++,this.keyMark(e,B,ie+c/2,h-16,!0,o,r)}),y&&this.fx&&this.fx.keyLights(v?y:null),y&&this.ghouls&&this.ghouls.keyLights(v?y:null)}keyMark(e,t,s,a,o,r,n){!t.inScale&&!t.isRoot||(t.isRoot?e.fillStyle=o?r:n:e.fillStyle=o?"rgba(255,255,255,0.6)":de(n,.45),e.beginPath(),e.arc(s,a,t.isRoot?3.6:2.6,0,Math.PI*2),e.fill())}drawMelodic(e,t,s,a,o,r,n,l){if(this.piano){this.drawPiano(e,t,s,a,o,r,l);return}let d=this.columns(),c=d.length,h=t/c,f=this.store.project.key;for(let m=0;m<c;m++){let v=d[m],b=m*h,y=(v.octave%2+2)%2===0;this.under||(a?e.fillStyle=y?"rgba(255,255,255,0.035)":"rgba(255,255,255,0)":e.fillStyle=y?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.035)",e.fillRect(b,0,h,s),m>0&&(e.fillStyle=a?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",e.fillRect(b-.5,0,1,s))),m>0&&d[m-1].octave!==v.octave&&(e.fillStyle=a?de(o,.22):"rgba(255,255,255,0.45)",e.fillRect(b-.75,0,1.5,s)),v.isRoot&&(e.fillStyle=a?de(o,.75):r,e.globalAlpha=a?1:.55,Pe(e,b+h/2-3,s-30,6,6,3),e.fill(),e.globalAlpha=1),e.fillStyle=a?"rgba(255,255,255,0.45)":de(r,.6),e.font=`600 ${h>34?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let x=ms(v.semi,f);(h>22||v.isRoot)&&e.fillText(h>30?x:x.replace(/\d+$/,""),b+h/2,s-10)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let m=new Float32Array(64),v=this.store.settings.ghosts?.6:1;for(let[,b]of this.touches){let y=Math.min(c-1,Math.floor(b.x*c));m[y]=Math.max(m[y],.45)}for(let b of this.ripples)b.col>=0&&b.col<64&&(m[b.col]=Math.max(m[b.col],v*(1-(l-b.t)/600)));this.fx&&this.fx.keyLights(m),this.ghouls&&this.ghouls.keyLights(m);return}for(let[,m]of this.touches){let v=Math.min(c-1,Math.floor(m.x*c));e.fillStyle=a?de(o,.16):"rgba(255,255,255,0.22)",e.fillRect(v*h,0,h,s)}let p=(this.store.settings.ghosts?.6:1)*this.inkShare();for(let m of this.ripples){if(m.col<0)continue;let v=(l-m.t)/600,b=m.col*h;e.fillStyle=a?de(o,.45*p*(1-v)):`rgba(255,255,255,${.5*p*(1-v)})`,e.fillRect(b+2,0,h-4,s)}}drawDrums(e,t,s,a,o,r,n,l){let d=t/4,c=this.store.project;for(let h=0;h<4;h++){let f=h*d;this.under||(e.fillStyle=a?h%2?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.0)":h%2?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.1)",e.fillRect(f,0,d,s),h>0&&(e.fillStyle=a?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)",e.fillRect(f-1,0,2,s)));for(let m=1;m<3;m++)e.fillStyle=a?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.05)",e.fillRect(f+m*d/3,s*.18,1,s*.64);let p=this.store.presetFor("d"+h);if(e.textAlign="center",e.fillStyle=a?"rgba(255,255,255,0.85)":de(r,.85),e.font="750 13px -apple-system, system-ui, sans-serif",e.fillText(["Kick","Snare","Hat","Perc"][h],f+d/2,22),e.font="600 10.5px -apple-system, system-ui, sans-serif",e.fillStyle=a?"rgba(255,255,255,0.45)":de(r,.6),e.fillText(Or(e,p?p.name:"",d-8),f+d/2,38),p&&p.variants)for(let m=0;m<3;m++)e.beginPath(),e.arc(f+(m+.5)*d/3,s-12,2.2,0,Math.PI*2),e.fill();c.parts.drum.mute[h]&&(e.fillStyle=a?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.35)",e.fillRect(f,0,d,s))}e.font="750 12px -apple-system, system-ui, sans-serif",e.textAlign="center";for(let[,h]of this.touches){let f=h.lane,p=this.store.presetFor("d"+f);if(!p||!p.variants)continue;let m=Math.min(2,Math.max(0,Math.floor((h.x*4-f)*3))),v=p.variants[m]?p.variants[m].name:"",b=Math.min(t-40,Math.max(40,h.x*t)),y=Math.max(70,h.y*s-44);e.fillStyle=a?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.75)";let x=e.measureText(v).width+16;Pe(e,b-x/2,y-15,x,22,11),e.fill(),e.fillStyle=a?"#fff":r,e.fillText(v,b,y)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let h=new Float32Array(64);for(let f of this.ripples)h[f.lane]=Math.max(h[f.lane],1-(l-f.t)/600);this.fx&&this.fx.keyLights(h),this.ghouls&&this.ghouls.keyLights(h);return}for(let h of this.ripples){let f=(l-h.t)/600,p=h.lane*d,m=e.createLinearGradient(0,s,0,0),v=.55*(1-f)*this.inkShare();a?(m.addColorStop(0,de(o,v)),m.addColorStop(1,de(o,0))):(m.addColorStop(0,`rgba(255,255,255,${v})`),m.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=m,e.fillRect(p+2,0,d-4,s)}}},Oi=520;function Or(i,e,t){if(i.measureText(e).width<=t)return e;for(;e.length>1&&i.measureText(e+"\u2026").width>t;)e=e.slice(0,-1);return e+"\u2026"}function de(i,e){if(i=i.trim(),i.startsWith("#")){let t=i.length===4?i.slice(1).split("").map(s=>parseInt(s+s,16)):[1,3,5].map(s=>parseInt(i.slice(s,s+2),16));return`rgba(${t[0]},${t[1]},${t[2]},${e})`}return i.startsWith("color(")?i.replace(/\)\s*$/,` / ${e})`):i.startsWith("rgb(")?i.replace("rgb(","rgba(").replace(")",`,${e})`):i}var Ws=class{constructor(e,{onSelect:t}){this.store=e,this.onSelect=t,this.el=u("div",{class:"tl",role:"img","aria-label":"Frise de la boucle"}),this.cv=u("canvas"),this.el.append(this.cv),this.sel=null,this.drag=null,this.tick=-1,this.el.addEventListener("pointerdown",a=>{a.preventDefault();try{this.el.setPointerCapture(a.pointerId)}catch{}let o=this.tickAt(a);this.drag={id:a.pointerId,t0:o,moved:!1}}),this.el.addEventListener("pointermove",a=>{if(!this.drag||a.pointerId!==this.drag.id)return;let o=this.tickAt(a);Math.abs(o-this.drag.t0)>=24&&(this.drag.moved=!0),this.drag.moved&&(this.sel={t0:Math.min(o,this.drag.t0),t1:Math.max(o,this.drag.t0)+24},this.draw())});let s=a=>{if(!this.drag||a.pointerId!==this.drag.id)return;let o=this.drag;if(this.drag=null,!o.moved)if(this.sel&&o.t0>=this.sel.t0&&o.t0<this.sel.t1)this.sel=null;else{let r=Math.floor(o.t0/384);this.sel={t0:r*384,t1:(r+1)*384}}this.draw(),this.onSelect(this.sel)};this.el.addEventListener("pointerup",s),this.el.addEventListener("pointercancel",s),new ResizeObserver(()=>this.draw()).observe(this.el)}get L(){return 384*this.store.project.bars}tickAt(e){let t=this.el.getBoundingClientRect(),s=Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width));return Math.floor(s*this.L/24)*24}clear(){this.sel=null,this.draw()}setTick(e){e!==this.tick&&(this.tick=e,this.draw())}draw(){let{w:e,h:t,d:s}=bt(this.cv),a=this.cv.getContext("2d");a.setTransform(s,0,0,s,0,0),a.clearRect(0,0,e,t);let o=this.store.project,r=this.store.ui,n=this.L,l=De("--accent"),d=De("--ink"),c=De("--line-2"),h=p=>p/n*e;for(let p=0;p<=o.bars;p++)a.fillStyle=c,a.fillRect(Math.round(h(p*384))-.5,0,1,t);for(let p=0;p<n;p+=96)a.fillStyle=c,a.globalAlpha=.5,a.fillRect(Math.round(h(p)),t-5,1,5),a.globalAlpha=1;this.sel&&(a.fillStyle=de(l,.28),Pe(a,h(this.sel.t0)+1,2,h(this.sel.t1)-h(this.sel.t0)-2,t-4,6),a.fill(),a.strokeStyle=l,a.lineWidth=1.5,a.stroke());let f=o.patterns[o.current];if(r.part==="drum"){let p=(t-8)/4;for(let m=0;m<4;m++){a.fillStyle=d,a.globalAlpha=m===r.lane?.95:.6;for(let v of f.drum[m].hits){let b=h(v.t),y=Math.max(2,e/(n/24)*.55);Pe(a,b,4+m*p+1,y,p-2,1.5),a.fill()}}a.globalAlpha=1}else{let p=f[r.part].notes;if(p.length){let m=1/0,v=-1/0;for(let S of p){let R=Mt(S.deg,S.acc,o.scale);m=Math.min(m,R),v=Math.max(v,R)}let b=Math.max(12,v-m+1);a.fillStyle=d,a.strokeStyle=d;let y=null,x=p.slice().sort((S,R)=>S.t-R.t);for(let S of x){let R=Mt(S.deg,S.acc,o.scale),B=t-6-(R-m)/b*(t-12),H=h(S.t),ie=Math.max(2.5,h(S.t+S.d)-H-1);a.globalAlpha=.85,Pe(a,H,B-2.5,ie,5,2.5),a.fill(),S.tie&&y&&(a.lineWidth=1.5,a.beginPath(),a.moveTo(y.x,y.y),a.lineTo(H+1,B),a.stroke()),y={x:H+ie,y:B}}a.globalAlpha=1}}r.playing&&this.tick>=0&&(a.fillStyle=r.armed?De("--rec"):l,a.fillRect(h(this.tick)-1,0,2,t))}};var Ys=class{constructor(e){this.store=e,this.groupsEl=u("div",{class:"groups",role:"tablist"}),this.el=u("div",{class:"pad",role:"application","aria-label":"Surface de transformation"}),this.cv=u("canvas"),this.axX=u("div",{class:"ax x"}),this.axY=u("div",{class:"ax y"}),this.el.append(this.cv,this.axX,this.axY),this.info=u("div",{class:"info"}),this.clearBtn=u("button",{class:"pill",text:"Effacer les mouvements",onclick:()=>this.clearAuto()}),this.barEl=u("div",{class:"autobar"},this.info,this.clearBtn),this.touch=new Map,this.live=null,this.fx=null,this.gpu=!1,this.prev=new Map,this.el.addEventListener("pointerdown",t=>this.down(t)),this.el.addEventListener("pointermove",t=>this.move(t)),this.el.addEventListener("pointerup",t=>this.up(t)),this.el.addEventListener("pointercancel",t=>this.up(t)),new ResizeObserver(()=>this.draw()).observe(this.el)}groups(){let e=this.store,t=e.ui.part;if(t==="drum")return[0,1,2,3].map(o=>{let r=e.presetFor("d"+o),n=r&&r.macros||[];return{label:["Kick","Snare","Hat","Perc"][o],sub:r?r.name:"",target:"d"+o,sx:0,sy:1,xName:n[0]?n[0].name:"X",yName:n[1]?n[1].name:"Y"}});let s=e.presetFor(t);return(s&&s.groups||["Groupe 1","Groupe 2","Groupe 3"]).map((o,r)=>{let n=s.macros[r*2],l=s.macros[r*2+1];return{label:o,sub:`${n?n.name:"X"} \xB7 ${l?l.name:"Y"}`,target:t,sx:r*2,sy:r*2+1,xName:n?n.name:"X",yName:l?l.name:"Y"}})}value(e,t){let s=this.store;for(let[,a]of this.touch){let o=this.groups()[a];if(o.target===e.target&&(o.sx===t||o.sy===t)&&this.touchVals&&this.touchVals[e.target+":"+t]!==void 0)return this.touchVals[e.target+":"+t]}if(this.live&&s.ui.playing){if(e.target==="bass")return this.live[8+t];if(e.target==="lead")return this.live[15+t];let a=+e.target.slice(1);return this.live[a*2+t]}return s.macroValue(e.target,t)}hasAuto(e){let s=this.store.pattern.auto[e.target];return!!(s&&(s[e.sx]||s[e.sy]))}render(){let e=this.groups(),t=Math.min(this.store.ui.group,e.length-1);this.groupsEl.replaceChildren(...e.map((o,r)=>u("button",{class:"grp"+(this.hasAuto(o)?" auto":""),role:"tab","aria-selected":String(r===t),onclick:()=>{this.store.ui.group=r,this.render()}},u("span",{class:"num",text:String(r+1)}),u("b",{text:o.label}),u("small",{text:o.sub}),u("i",{class:"rec"}))));let s=e[t];this.axX.textContent=s.xName+" \u2192",this.axY.textContent=s.yName+" \u2192";let a=e.filter(o=>this.hasAuto(o)).length;this.info.textContent=this.store.ui.armed?"REC : bouge un point pendant la lecture pour enregistrer":a?`${a} groupe${a>1?"s":""} avec mouvements enregistr\xE9s`:"Glisse un point \xB7 plusieurs doigts possibles",this.clearBtn.disabled=!this.hasAuto(s),this.draw()}pos(e){let t=this.el.getBoundingClientRect();return{x:Math.min(1,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,1-(e.clientY-t.top)/t.height))}}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.pos(e),s=this.groups(),a=this.el.getBoundingClientRect(),o=-1,r=1/0;s.forEach((l,d)=>{if([...this.touch.values()].includes(d))return;let c=(this.value(l,l.sx)-t.x)*a.width,h=(this.value(l,l.sy)-t.y)*a.height,f=Math.hypot(c,h);f<r&&(r=f,o=d)});let n=r<44?o:Math.min(this.store.ui.group,s.length-1);[...this.touch.values()].includes(n)||(this.touch.set(e.pointerId,n),this.store.ui.group=n,this.send(s[n],t,"down"),this.render())}move(e){let t=this.touch.get(e.pointerId);t!==void 0&&(this.send(this.groups()[t],this.pos(e),"move"),this.draw())}up(e){let t=this.touch.get(e.pointerId);if(t===void 0)return;this.touch.delete(e.pointerId);let s=this.groups()[t];this.fx&&this.fx.press(s.target+":"+s.sx,0,0,"up"),this.store.send({type:"tweak",target:s.target,slot:s.sx,phase:"up"}),this.store.send({type:"tweak",target:s.target,slot:s.sy,phase:"up"}),this.render()}releaseAll(){let e=this.groups();for(let[,t]of this.touch){let s=e[t];s&&(this.store.send({type:"tweak",target:s.target,slot:s.sx,phase:"up"}),this.store.send({type:"tweak",target:s.target,slot:s.sy,phase:"up"}))}this.touch.clear()}send(e,t,s){if(this.fx&&this.fx.press(e.target+":"+e.sx,t.x,1-t.y,s==="down"?"down":"move"),this.fx){let a=e.target+":"+e.sx,o=this.prev.get(a);this.fx.stir(e.target,t.x,1-t.y,o?t.x-o.x:0,o?o.y-t.y:0,!0),this.prev.set(a,{x:t.x,y:t.y})}this.touchVals=this.touchVals||{},this.touchVals[e.target+":"+e.sx]=t.x,this.touchVals[e.target+":"+e.sy]=t.y,this.store.send({type:"tweak",target:e.target,slot:e.sx,value:t.x,phase:s}),this.store.send({type:"tweak",target:e.target,slot:e.sy,value:t.y,phase:s})}clearAuto(){let e=this.groups(),t=e[Math.min(this.store.ui.group,e.length-1)];this.store.clearAuto(t.target,t.sx),this.store.clearAuto(t.target,t.sy),this.render()}onPos(e){this.live=e.mac,(this.store.ui.playing||this.touch.size)&&this.draw()}draw(){let{w:e,h:t,d:s}=bt(this.cv),a=this.cv.getContext("2d");a.setTransform(s,0,0,s,0,0);let o=document.documentElement.dataset.theme==="dark",r=De("--accent"),n=De("--accent-ink");if(a.clearRect(0,0,e,t),this.fx&&this.fx.syncScene(),this.gpu&&(a.save(),Pe(a,0,0,e,t,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),a.clip()),!this.gpu){if(o){let c=a.createLinearGradient(0,0,e,t);c.addColorStop(0,"#1b1d24"),c.addColorStop(1,"#121318"),a.fillStyle=c}else a.fillStyle=r;a.fillRect(0,0,e,t),a.strokeStyle=o?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",a.lineWidth=1;for(let c=1;c<4;c++)a.beginPath(),a.moveTo(c*e/4,0),a.lineTo(c*e/4,t),a.stroke(),a.beginPath(),a.moveTo(0,c*t/4),a.lineTo(e,c*t/4),a.stroke()}let l=this.groups(),d=Math.min(this.store.ui.group,l.length-1);l.forEach((c,h)=>{let f=this.value(c,c.sx)*e,p=(1-this.value(c,c.sy))*t,m=[...this.touch.values()].includes(h);if(this.fx&&!m){let y=c.target+":"+c.sx,x=this.prev.get(y),S=f/e,R=1-p/t;x&&this.store.ui.playing&&Math.hypot(S-x.x,R-x.y)>.003&&this.fx.stir(c.target,S,1-R,S-x.x,x.y-R,!1),this.prev.set(y,{x:S,y:R})}let v=m?120:70,b=a.createRadialGradient(f,p,0,f,p,v);o?(b.addColorStop(0,de(r,h===d?.4:.18)),b.addColorStop(1,de(r,0))):(b.addColorStop(0,`rgba(255,255,255,${h===d?.5:.25})`),b.addColorStop(1,"rgba(255,255,255,0)")),a.fillStyle=b,a.fillRect(f-v,p-v,2*v,2*v),a.beginPath(),a.arc(f,p,m?26:21,0,Math.PI*2),a.fillStyle=o?h===d?de(r,.95):"rgba(255,255,255,0.12)":h===d?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.4)",a.fill(),a.lineWidth=2,a.strokeStyle=o?de(r,.9):"rgba(255,255,255,0.95)",a.stroke(),a.fillStyle=o?h===d?n:"rgba(255,255,255,0.9)":n,a.font="800 14px -apple-system, system-ui, sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillText(String(h+1),f,p+1),this.hasAuto(c)&&(a.beginPath(),a.arc(f+17,p-17,4,0,Math.PI*2),a.fillStyle=De("--rec"),a.fill())}),a.textBaseline="alphabetic",this.gpu&&a.restore()}};var Br=96,Ir=[36,38,42,63],Bi={0:[36,36,35],1:[37,38,40],2:[42,44,46],3:[64,63,62]};function Ii(i){let e=[i&127];for(;i>>=7;)e.unshift(i&127|128);return e}function Ia(i){return Array.from(i,e=>e.charCodeAt(0)&127)}function Fi(i){return[i>>>24&255,i>>>16&255,i>>>8&255,i&255]}function Ba(i){return[i>>>8&255,i&255]}function Ks(i,e){e.sort((a,o)=>a.t-o.t||a.order-o.order);let t=[0,255,3,...Ii(i.length),...Ia(i)],s=0;for(let a of e)t.push(...Ii(Math.max(0,a.t-s)),...a.data),s=a.t;return t.push(0,255,47,0),[...Ia("MTrk"),...Fi(t.length),...t]}function Hi(i,{loops:e=1}={}){let t=384*i.bars,s=i.song&&i.song.enabled&&i.song.sections.length?i.song.sections:[{p:i.current,reps:e,mute:{}}],a=[],o=[],r=[],n=0;for(let f of s){let p=i.patterns[f.p]||i.patterns[0];for(let m=0;m<(f.reps||1);m++){for(let v=0;v<4;v++)if(!(i.parts.drum.mute[v]||f.mute&&f.mute["d"+v]))for(let b of p.drum[v].hits){let y=Bi[v]&&Bi[v][b.x]||Ir[v],x=Math.max(1,Math.round(b.v*127));a.push({t:n+b.t,order:1,data:[153,y,x]}),a.push({t:n+b.t+12,order:0,data:[137,y,0]})}for(let[v,b,y]of[["bass",o,0],["lead",r,1]])if(!(i.parts[v].mute||f.mute&&f.mute[v]))for(let x of p[v].notes){let S=Math.max(0,Math.min(127,ci(x.deg,x.acc,i.key,i.scale,48))),R=Math.max(1,Math.round(x.v*127));b.push({t:n+x.t,order:1,data:[144|y,S,R]}),b.push({t:n+x.t+Math.max(1,Math.min(x.d,t)),order:0,data:[128|y,S,0]})}n+=t}}let l=Math.round(6e7/i.tempo),d=[{t:0,order:0,data:[255,81,3,l>>16&255,l>>8&255,l&255]},{t:0,order:0,data:[255,88,4,4,2,24,8]}],c=[Ks(i.name||"MOTIF",d),Ks("Batterie",a),Ks("Basse",o),Ks("M\xE9lodie",r)],h=[...Ia("MThd"),...Fi(6),...Ba(1),...Ba(c.length),...Ba(Br)];return new Uint8Array([...h,...c.flat()])}var Fr=(()=>{let i=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let s=0;s<8;s++)t=t&1?3988292384^t>>>1:t>>>1;i[e]=t>>>0}return i})();function Hr(i){let e=4294967295;for(let t=0;t<i.length;t++)e=Fr[(e^i[t])&255]^e>>>8;return(e^4294967295)>>>0}function Ni(i){let e=new TextEncoder,t=[],s=[],a=0,o=new Date,r=o.getHours()<<11|o.getMinutes()<<5|o.getSeconds()>>1,n=o.getFullYear()-1980<<9|o.getMonth()+1<<5|o.getDate();for(let c of i){let h=e.encode(c.name),f=Hr(c.data),p=new DataView(new ArrayBuffer(30));p.setUint32(0,67324752,!0),p.setUint16(4,20,!0),p.setUint16(6,2048,!0),p.setUint16(8,0,!0),p.setUint16(10,r,!0),p.setUint16(12,n,!0),p.setUint32(14,f,!0),p.setUint32(18,c.data.length,!0),p.setUint32(22,c.data.length,!0),p.setUint16(26,h.length,!0),p.setUint16(28,0,!0),t.push(new Uint8Array(p.buffer),h,c.data);let m=new DataView(new ArrayBuffer(46));m.setUint32(0,33639248,!0),m.setUint16(4,20,!0),m.setUint16(6,20,!0),m.setUint16(8,2048,!0),m.setUint16(10,0,!0),m.setUint16(12,r,!0),m.setUint16(14,n,!0),m.setUint32(16,f,!0),m.setUint32(20,c.data.length,!0),m.setUint32(24,c.data.length,!0),m.setUint16(28,h.length,!0),m.setUint32(42,a,!0),s.push(new Uint8Array(m.buffer),h),a+=30+h.length+c.data.length}let l=s.reduce((c,h)=>c+h.length,0),d=new DataView(new ArrayBuffer(22));return d.setUint32(0,101010256,!0),d.setUint16(8,i.length,!0),d.setUint16(10,i.length,!0),d.setUint32(12,l,!0),d.setUint32(16,a,!0),new Blob([...t,...s,new Uint8Array(d.buffer)],{type:"application/zip"})}var Ut=null,Nr=0,es=new Map;function zr(i){return Ut||(Ut=new Worker("export-worker.js?v="+i),Ut.onmessage=e=>{let t=e.data,s=es.get(t.id);s&&(t.type==="progress"?s.onProgress&&s.onProgress(t.value):t.type==="done"?(es.delete(t.id),s.resolve(t)):t.type==="error"&&(es.delete(t.id),s.reject(new Error(t.message))))},Ut.onerror=e=>{for(let[,t]of es)t.reject(new Error(e.message||"Erreur du moteur d\u2019export"));es.clear(),Ut=null},Ut)}function ts(i){return(i||"motif").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-zA-Z0-9 _-]+/g,"").trim().replace(/\s+/g,"-").slice(0,40)||"motif"}async function zi(i,e,{stems:t=!1,loops:s=2,sr:a=48e3,bits:o=24,onProgress:r,build:n}){let l=JSON.parse(JSON.stringify(i.project)),d=[];for(let y=0;y<4;y++)d.push({part:"drum",lane:y,preset:we(l.parts.drum.kit[y]),macros:l.parts.drum.macros[y]});d.push({part:"bass",preset:we(l.parts.bass.preset),macros:l.parts.bass.macros}),d.push({part:"lead",preset:we(l.parts.lead.preset),macros:l.parts.lead.macros});let c=Array.from(e.samples.values()).map(y=>({id:y.id,sr:y.sr,data:y.data,gain:y.gain,loopStart:y.loopStart,loopEnd:y.loopEnd})),h=++Nr,f=zr(n),p=await new Promise((y,x)=>{es.set(h,{resolve:y,reject:x,onProgress:r}),f.postMessage({type:"render",id:h,project:l,presets:d,samples:c,sampleSets:e.sampleSets,stems:t,loops:s,sr:a,bits:o})}),m=ts(l.name),v={null:"mix",d0:"kick",d1:"snare",d2:"hat",d3:"perc",bass:"basse",lead:"melodie"};return p.files.map(y=>({name:`${m}-${v[y.group]}.wav`,data:new Uint8Array(y.wav),peak:y.peak,seconds:y.seconds,group:y.group}))}async function Fa(i,e,t){let s={id:It(),name:i,created:Date.now(),size:e.size,type:e.type,blob:e,...t};return await je.put("renders",s),s}function Ui(i){let e=Hi(i.project,{loops:1});return new File([e],`${ts(i.project.name)}.mid`,{type:"audio/midi"})}function ji(i){return new File([i.exportProjectJSON()],`${ts(i.project.name)}.motif.json`,{type:"application/json"})}function Gi(i){return Ni(i.map(e=>({name:e.name,data:e.data})))}async function ys(i){try{if(navigator.canShare&&navigator.canShare({files:[i]}))return await navigator.share({files:[i],title:i.name}),"shared"}catch(s){if(s&&s.name==="AbortError")return"cancelled"}let e=URL.createObjectURL(i),t=document.createElement("a");return t.href=e,t.download=i.name,document.body.append(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(e),6e4),"downloaded"}var Yi={phonk:{bassR:11,leadR:9,roots:[0,0,-2,-3],contour:[7,8,7,4,7,8,9,7],bassTies:2,leadSteps:7},ukg:{bassR:10,leadR:8,roots:[0,-2,-4,-3],contour:[9,7,9,11],bassTies:1,leadSteps:7},afro:{bassR:8,leadR:7,roots:[0,0,-2,-3],contour:[7,9,11,9,7,6],bassTies:0,leadSteps:5},amapiano:{bassR:13,leadR:3,roots:[0,-3,-2,-4],contour:[9,11,9,7],bassTies:2,leadSteps:7,chords:!0},reggaeton:{bassR:11,leadR:7,roots:[0,-2,-3,-1],contour:[7,9,10,9,7,6],bassTies:0,leadSteps:7},jersey:{bassR:14,leadR:14,roots:[0,-2,-3,-2],contour:[11,9,7,9],bassTies:0,leadSteps:7,chords:!0},dnb:{bassR:2,leadR:1,roots:[0,-3,-2,-4],contour:[9,11,12,11],bassTies:1,leadSteps:7,chords:!0},rage:{bassR:1,leadR:15,roots:[0,-1,-3,-4],contour:[7,11,14,11,9,7],bassTies:0,leadSteps:7},hardtechno:{bassR:5,leadR:4,roots:[0,0,1,0],contour:[7,7,8,7],bassTies:3,leadSteps:7},triphop:{bassR:3,leadR:2,roots:[0,-2,-3,-4],contour:[9,7,6,4],bassTies:1,leadSteps:7,chords:!0}};function Ur(i,e,t,s){let a=Pt[i][e],o=384*t,r=[];if(!a||!a.len)return r;for(let n=0;n<o;n+=a.len)for(let[l,,d]of a.ev){if(n+l>=o)continue;let c=1;i===2&&(c=0),r.push({t:n+l,v:d?.95:.74,x:c,c:.5})}return i===2&&s&&r.length&&(r[r.length-1].x=2),i===1&&r.length>2&&(r[r.length-1].v=1),r}function Wi(i,e,t,{ties:s=0,chord:a=null}={}){let o=gt[i],r=384*e,n=[];if(!o||!o.len)return n;let l=o.ev.length,d=new Set;for(let h=0;h<s;h++)d.add(Math.round((h+1)*l/(s+1)));let c=0;for(let h=0;h<r;h+=o.len)o.ev.forEach(([f,p,m],v)=>{if(h+f>=r)return;let b=d.has(v)&&v>0,y=p;d.has((v+1)%l)&&(y=((v+1)%l===0?o.len+o.ev[0][0]:o.ev[v+1][0])-f+3);let x=t(h+f,c++),S=m?.95:.8;if(a)for(let R of a)n.push({t:h+f,d:Math.min(y,r-h-f),deg:x+R,acc:0,v:S*.9,tie:!1});else n.push({t:h+f,d:Math.min(y,r-h-f),deg:x,acc:0,v:S,tie:b})});return n}function Ki(i){let e=lt.find(d=>d.style===i),t=ct(i),s=Yi[i],a=Rt({kit:e.kit.slice(),bass:e.bass,lead:e.lead,tempo:t.bpm,key:t.key,scale:t.scale,name:"Exemple "+t.short});a.parts.drum.rhythm=e.rhythm.slice(),a.parts.bass.rhythm=s.bassR,a.parts.bass.ties=s.bassTies,a.parts.lead.rhythm=s.leadR,a.parts.lead.steps=s.leadSteps;let o=2,r=384,n=d=>s.roots[Math.floor(d/(r/2))%s.roots.length],l=d=>{let c=Lt(d?"B":"A");for(let h=0;h<4;h++){let f=d&&h===2?Math.min(16,e.rhythm[h]+1):e.rhythm[h];c.drum[h].hits=Ur(h,f,o,d)}if(d&&c.drum[1].hits.length)for(let h of[r*2-48,r*2-24])c.drum[1].hits.push({t:h,v:.7,x:0,c:.5});return c.bass.notes=Wi(s.bassR,o,h=>n(h)-7,{ties:s.bassTies}),c.lead.notes=Wi(s.leadR,o,(h,f)=>s.contour[(f+(d?2:0))%s.contour.length]+(s.chords?n(h):0),{chord:s.chords?[0,2,4]:null}),d||(c.lead.notes=c.lead.notes.filter(h=>h.t<r||!s.chords||h.t%96===0)),c};return a.patterns=[l(!1),l(!0)],a.song={enabled:!1,sections:[]},a}var Vi=Object.keys(Yi);var Xi={jamal:{levels:[-.5,-4,-4,-7,5,3.5],macros:{},mix:{master:-2.5}},solto:{levels:[2.5,-2.5,-1.5,-7.5,1.5,3],macros:{lead:[null,.2],bass:[.25]},mix:{drumDrive:.17,master:-3.5}},cimetiere:{levels:[1,-3.5,-5.5,-5.5,6,-2.5],macros:{},mix:{master:-2}},rebond:{levels:[3,-4,.5,-2.5,-.5,1],macros:{},mix:{master:-2}},costumes:{levels:[4.5,-3,-6,-5.5,3,1.5],macros:{},mix:{master:-2.5}},escalier:{levels:[1,0,-7.5,-3.5,3,2],macros:{lead:[.3]},mix:{master:-3.5}},ete2011:{levels:[1,-.5,-2,-3.5,-1,3.5],macros:{},mix:{master:-1.5}},mondial:{levels:[-1.5,-4,-7,-5.5,3,-.5],macros:{d2:[null,.2],lead:[1],bass:[null,null,null,.15]},mix:{master:-1.5}},conscience:{levels:[-.5,-.5,-8.5,-4,2.5,2.5],macros:{lead:[.2]},mix:{master:-3}},piste:{levels:[2.5,-3.5,-5.5,-2.5,2.5,2.5],macros:{},mix:{master:-1}},contagion:{levels:[1.5,-3.5,-1,-2,2.5,.5],macros:{lead:[.85]},mix:{master:0}},logdrum:{levels:[2,-3.5,-4,1,3,.5],macros:{},mix:{master:-1}},baile150:{levels:[-3,-6.5,-8,-10,1,6],macros:{},mix:{drumDrive:.15,master:-1}},garage:{levels:[0,-3.5,-4.5,2,.5,1.5],macros:{},mix:{master:-.5}},liquide:{levels:[1,-1.5,-3.5,0,4.5,-.5],macros:{},mix:{master:-3}},rage:{levels:[1,-4.5,-5.5,-7,5,6],macros:{lead:[null,.25]},mix:{master:-2.5}},afrohouse:{levels:[0,-1,-8,-2.5,1.5,5],macros:{lead:[.75]},mix:{master:-1.5}},perreo:{levels:[-1,-4,-2.5,-4.5,4.5,2],macros:{d1:[null,.3]},mix:{master:-1}},hardtechno:{levels:[-.5,-4,-7,-5.5,3.5,3],macros:{},mix:{master:-2.5}},brume:{levels:[5,0,-.5,2,2.5,-2],macros:{},mix:{master:-1}}};var Et=384,bs=Et/16,jt=i=>Math.round(i*100)/100,pt=i=>Math.round(i*1e3)/1e3,xs=i=>Math.max(0,Math.min(1,i));function jr(i){let e=Math.imul(i|0,2654435761)>>>0||1;return()=>(e^=e<<13,e>>>=0,e^=e>>>17,e^=e<<5,e>>>=0,e/4294967296)}var Gr=i=>{let e=7;for(let t of i)e=Math.imul(e,31)+t.charCodeAt(0)|0;return e};function $i(i){let e=/^(-?\d+)([b#]?)$/.exec(i);if(!e)throw new Error("touche "+i);return[+e[1],e[2]==="b"?-1:e[2]==="#"?1:0]}function Wr(i){let e=[],t=0,s=null;for(let a of i.trim().split(/\s+/)){if(a==="|")continue;if(a==="."){s&&s.len++,t++;continue}if(a==="_"){s=null,t++;continue}let o=a.startsWith("/"),r=a.endsWith(">"),n=a.replace(/^\//,"").replace(/>$/,"").split("+").map($i);s={step:t,len:1,keys:n,accent:r,slide:o},e.push(s),t++}return e}var Ha=class{constructor(e,t,s){this.song=e,this.L=Et*e.bars,this.R=jr(s),this.pat=Lt(t)}hold(e,t,s,a,o,r,n){let l=this.R()*6.28,d=this.R()*6.28,c=Math.min(s,this.L-1);for(let f=t;f<=c;f+=12){let p=f-t,m=n!==void 0&&p<30?n+(a-n)*(p/30):a,v=[f,pt(xs(m+.035*Math.sin(p/70+l)+.012*(this.R()-.5))),pt(xs(o+.025*Math.sin(p/115+d)+.008*(this.R()-.5)))];e.push(r?v.concat(r):v)}let h=e[e.length-1];return h&&h[0]<c-3&&e.push(r?[c,h[1],h[2],...r]:[c,h[1],h[2]]),e}lane(e,t,s,a,{x:o=1,y:r=.5,f:n=.9}={}){let l=Pt[e][t],d=s*Et,c=Math.min(a*Et,this.L);for(let h=d;h<c;h+=l.len)for(let[f,,p]of l.ev)h+f>=c||this.pat.drum[e].hits.push({t:h+f,v:jt((p?1:.78)*(.55+.45*n)),x:o,c:jt(r)});return this.pat.gest.drum.push({l:e,p:this.hold([],d,c-4,(o+.5)/3+(this.R()-.5)*.1,r)}),this}lanes(e,t,s,a=[]){return e.forEach((o,r)=>{o!=null&&this.lane(r,o,t,s,a[r]||{})}),this}taps(e,t,s,{x:a=1,y:o=.5}={}){let r=0,n=s.replace(/[\s|]/g,"").length;(n%16||t*Et+n*bs>this.L)&&(this.song.warnings=this.song.warnings||[]).push(`${this.song.id} ${this.pat.name} taps ${e}: ${n} pas`);for(let l of s.replace(/[\s|]/g,"")){let d=t*Et+r*bs;if(d>=this.L)break;if(l!=="."){let c=xs(o+(this.R()-.5)*.08);this.pat.drum[e].hits.push({t:d,v:l==="X"?.98:l==="o"?.5:.8,x:a,c:jt(c)});let h=(a+.5)/3+(this.R()-.5)*.14,f=[[d,pt(h),pt(c)]];d+10<this.L&&f.push([d+10,pt(h+.012),pt(c-.012)]),d+18<this.L&&f.push([d+18,pt(h+.02),pt(c-.02)]),this.pat.gest.drum.push({l:e,p:f})}r++}return this}line(e,t,s,{y:a=.55,lift:o=.2,v:r=.84,gap:n=.12}={}){let l=Wr(s),d=t*Et,c=s.trim().split(/\s+/).filter(v=>v!=="|").length;(c%16||d+c*bs>this.L)&&(this.song.warnings=this.song.warnings||[]).push(`${this.song.id} ${this.pat.name} ${e}: ${c} doubles croches`);let h=l.flatMap(v=>v.keys.map(b=>b[0])),f=Math.min(...h),p=Math.max(1,Math.max(...h)-f),m=null;return l.forEach((v,b)=>{let y=d+v.step*bs;if(y>=this.L)return;let x=l[b+1],S=!!(x&&x.slide&&x.step===v.step+v.len&&v.keys.length===1&&x.keys.length===1),R=Math.max(6,Math.min(this.L-y,Math.round(v.len*bs*(S?1:1-n)))),B=jt((v.accent?.98:r)*(.93+.07*this.R()));v.keys.forEach(([H,ie],K)=>{let D=xs(a+o*((H-f)/p-.5)+(this.R()-.5)*.04);if(this.pat[e].notes.push({t:y,d:R,deg:H,acc:ie,v:B,tie:v.slide&&v.keys.length===1,y:jt(D)}),v.keys.length===1){let X;v.slide&&m?X=this.glide(m.p,y,H,ie,D):(m={p:[]},this.pat.gest[e].push(m)),this.hold(m.p,y,y+R-3,.5+(this.R()-.5)*.18,D,[H,ie],X),S||(m=null)}else{let X={p:[]};this.hold(X.p,y+K*2,y+R-3,.5+(this.R()-.5)*.2,D,[H,ie]),this.pat.gest[e].push(X),m=null}})}),this}glide(e,t,s,a,o){let r=e[e.length-1];if(!r)return;let n=r[3],l=s>n||s===n&&a>r[4],d=l?.94:.06;e.push([Math.max(r[0]+1,t-7),d,pt(o),n,r[4]]);let c=Math.abs(s-n);for(let h=1;h<c;h++)e.push([t-7+Math.round(6*h/c),.5,pt(o),n+(l?h:-h),0]);return l?.08:.92}chords(e,t,s,{arp:a="chord",v:o=.9,legato:r=.92}={}){let n=gt[t];for(let[l,d,c,h=.5]of s){let f=c.split("+").map($i),p=Math.round(l*Et),m=Math.min(Math.round((l+d)*Et),this.L),v=a==="up"?f.slice().sort((y,x)=>y[0]+y[1]/3-x[0]-x[1]/3):a==="down"?f.slice().sort((y,x)=>x[0]+x[1]/3-y[0]-y[1]/3):f,b=0;for(let y=p;y<m;y+=n.len)for(let[x,S,R]of n.ev){let B=y+x;if(B>=m)continue;let H=jt((R?.98:.8)*(.7+.3*o)),ie=f.length===1||a==="chord"?f:[v[b++%v.length]];for(let[K,D]of ie)this.pat[e].notes.push({t:B,d:Math.max(6,Math.min(Math.round(S*r),m-B)),deg:K,acc:D,v:H,tie:!1,y:jt(h)})}f.forEach(([y,x],S)=>this.pat.gest[e].push({p:this.hold([],p+S*3,m-6,.5+(this.R()-.5)*.2,h,[y,x])}))}return this}move(e,t,s){let a=this.L/12,o=this.pat.auto[e]=this.pat.auto[e]||{},r=this.R()*6.28;return o[t]=Array.from({length:a},(n,l)=>pt(xs(s(l/a)+.006*Math.sin(l/5+r)))),this}done(){let e=this.pat;for(let t of e.drum)t.hits.sort((s,a)=>s.t-a.t);for(let t of["bass","lead"])e[t].notes.sort((s,a)=>s.t-a.t||s.deg-a.deg);return e}},Yr=i=>({d0:i.includes("k"),d1:i.includes("s"),d2:i.includes("h"),d3:i.includes("p"),bass:i.includes("b"),lead:i.includes("l")});function Kr(i,e,t){let s=[],a=!1;for(let h of i.patterns)for(let f of h[e].notes)s.push(Mt(f.deg,f.acc,i.scale)),f.acc&&(a=!0);if(!s.length)return{steps:i.parts[e].steps,range:i.parts[e].range};let o=a?12:t||7,r=Math.min(36,Math.max(...s)),n=Math.max(-24,Math.min(...s)),l=h=>{let f=1;for(;f<24;){let p=nt({lo:h,n:f},i.scale,o);if(p[p.length-1].semi>=r)break;f++}return f},d=e==="bass"?8:10,c=l(n);for(let h=0;h<2&&c<d&&n>-24;h++){let f=nt({lo:n-3,n:1},i.scale,o)[0].semi;f<n&&f>=-24&&(n=f,c=l(n))}return{steps:o,range:{lo:n,n:Math.max(c,d)}}}function Vr(i,e=!1){let t=Rt({kit:i.kit,bass:i.bass,lead:i.lead,tempo:i.tempo,key:i.key,scale:i.scale,name:i.name});t.bars=i.bars,t.swing=i.swing||50,t.parts.drum.rhythm=i.dials.slice(0,4),t.parts.bass.rhythm=i.dials[4],t.parts.lead.rhythm=i.dials[5],i.arp&&(t.parts.bass.arp=i.arp[0],t.parts.lead.arp=i.arp[1]);let s=i.macros||{};for(let r=0;r<4;r++)s["d"+r]&&(t.parts.drum.macros[r]=s["d"+r].concat(Array(7).fill(null)).slice(0,7));for(let r of["bass","lead"])s[r]&&(t.parts[r].macros=s[r].concat(Array(7).fill(null)).slice(0,7));i.levels&&(t.parts.drum.level=i.levels.slice(0,4),t.parts.bass.level=i.levels[4],t.parts.lead.level=i.levels[5]),Object.assign(t.mix,i.mix||{});let a=!e&&Xi[i.id];if(a){a.levels&&(t.parts.drum.level=a.levels.slice(0,4),t.parts.bass.level=a.levels[4],t.parts.lead.level=a.levels[5]);for(let[r,n]of Object.entries(a.macros||{})){let l=/^d\d$/.test(r)?+r[1]:-1,c=((l>=0?t.parts.drum.macros[l]:t.parts[r].macros)||Array(7).fill(null)).slice();n.forEach((h,f)=>{h!=null&&(c[f]=h)}),l>=0?t.parts.drum.macros[l]=c:t.parts[r].macros=c}Object.assign(t.mix,a.mix||{})}let o=Gr(i.id);t.patterns=i.takes.map((r,n)=>{let l=new Ha(i,String.fromCharCode(65+n),o+n*977);return r(l),l.done()});for(let r of["bass","lead"])Object.assign(t.parts[r],Kr(t,r,i.steps&&i.steps[r]));return t.song={enabled:!0,sections:i.song.map(([r,n,l=""])=>({p:r,reps:n,mute:Yr(l)}))},t.current=0,t}var Ie=(i,e)=>t=>i+(e-i)*(.5-.5*Math.cos(Math.PI*t)),Se=(i,e,t=1)=>s=>i+e*Math.sin(2*Math.PI*t*s),Na=[{id:"jamal",name:"Passinho na laje",trend:"Brega funk du Passinho do Jamal",ref:"Dans l\u2019esprit de \xAB Toma Botada \xBB (Eo Chapa et MC Rog\xEA, 2025-26), le son du Passinho do Jamal. Tempo et tonalit\xE9 : ceux du genre.",tempo:160,key:2,scale:"minor",bars:4,kit:["kick.perreo","snare.claplarge","hat.perreo","perc.timbal"],bass:"bass.subperreo",lead:"lead.perreo",dials:[7,1,2,3,7,0],arp:["order","order"],macros:{d0:[.62,.45],d3:[.55,.6],bass:[.7,.55,.7,.45,.1,.15],lead:[.35,.6,.3,.2,.35,.3]},mix:{pump:.35,space:.35,drumDrive:.22,drumSpace:.08},takes:[i=>i.lanes([7,1,2,3],0,4,[{y:.62},{y:.5},{x:0,y:.35},{y:.58}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]),i=>i.lanes([7,1,2,3],0,4,[{y:.62},{y:.5},{x:0,y:.38},{y:.58}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).line("lead",0,"7> . _ 6 . _ 4 . 5 . 4 . 2 . _ _ | 4 . _ 5 . _ 4 . 2 . 0 . 2 . _ _ | 6> . _ 5 . _ 4 . 2 . 4 . /5 . . . | 4 . _ 2 . _ 0 . . . _ _ _ _ _ _",{y:.55}).move("lead",4,Ie(.2,.5)),i=>i.lanes([13,3,12,6],0,4,[{y:.7},{y:.55},{x:0,y:.4},{y:.7}]).taps(0,3,".... .... x.x. XXXX",{y:.8}).chords("bass",7,[[0,1,"-7",.6],[1,1,"-9",.6],[2,1,"-8",.62],[3,1,"-7",.65]]).line("lead",0,"7 _ 7 _ 9> . 7 . 6 . 4 . 6 . 7 . | 9 _ 9 _ 11> . 9 . 7 . 6 . 7 . _ _ | 7 _ 7 _ 9> . 7 . 6 . 4 . /5 . . . | 4 . . . 2 . . . 0 . . . _ _ _ _",{y:.7}).move("lead",4,Ie(.5,.75)).move("bass",0,Se(.7,.15,2))],song:[[0,1,"kl"],[0,1,"l"],[1,2],[2,1],[1,2],[0,1,"b"]]},{id:"solto",name:"Bem solto",trend:"Phonk br\xE9silien",ref:"Dans l\u2019esprit de \xAB Passo Bem Solto \xBB (ATLXS, 2024-25) : 130 BPM, la mineur (fa, sol, la mineur), d\u2019apr\xE8s les donn\xE9es publiques.",tempo:130,key:9,scale:"minor",bars:4,kit:["kick.montagem","snare.clapmontagem","hat.drift","perc.clochephonk"],bass:"bass.808montagem",lead:"lead.sino",dials:[7,1,2,6,0,0],macros:{d0:[.75,.5],d3:[.6,.5],bass:[.75,.55,.6,.6,.55,.5],lead:[.5,.6,.55,.45,.3,.3]},mix:{pump:.4,space:.3,drumDrive:.35,drumSpace:.06},takes:[i=>i.lanes([7,1,2,6],0,4,[{y:.66},{y:.5},{x:0,y:.4},{y:.6}]).line("bass",0,"-9> . . . . . -9 . . . /-10 . -9 . . . | -8> . . . . . -8 . . . /-7 . -8 . . . | -7> . . . . . -7 . . . -7 . /-5 . . . | -7> . . . . . /-14 . . . . . /-7 . . .",{y:.6}).move("bass",2,Se(.55,.15,2)),i=>i.lanes([7,1,2,6],0,4,[{y:.66},{y:.5},{x:0,y:.42},{y:.6}]).line("bass",0,"-9> . . . . . -9 . . . /-10 . -9 . . . | -8> . . . . . -8 . . . /-7 . -8 . . . | -7> . . . . . -7 . . . -7 . /-5 . . . | -7> . . . . . /-14 . . . . . /-7 . . .",{y:.6}).line("lead",0,"9 _ 9 _ 7 _ 9 _ 10 _ 9 _ 7 _ 5 _ | 8 _ 8 _ 6 _ 8 _ 9 _ 8 _ 6 _ 4 _ | 7 _ 7 _ 7 _ 9 _ 11> _ 10 _ 9 _ 7 _ | 7 . . . _ _ 4 _ 5 _ 7 . . . _ _",{y:.6,gap:.3}).move("lead",4,Ie(.25,.55)),i=>i.lanes([7,1,14,16],0,4,[{y:.75},{y:.55},{x:0,y:.5},{y:.72}]).line("bass",0,"-9> . . . -9 . . . /-10 . -9 . . . -9 . | -8> . . . -8 . . . /-7 . -8 . . . -8 . | -7> . . . -7 . . . -7 . /-5 . . . -7 . | -7> . . . /-14 . . . . . . . /-7 . . .",{y:.7}).line("lead",0,"14 _ 14 _ 12 _ 14 _ 15 _ 14 _ 12 _ 10 _ | 13 _ 13 _ 11 _ 13 _ 14 _ 13 _ 11 _ 9 _ | 12 _ 12 _ 12 _ 14 _ 16> _ 15 _ 14 _ 12 _ | 14 . . . _ _ 11 _ 12 _ 14 . . . _ _",{y:.72,gap:.3}).move("d0",0,Ie(.6,.95)).move("lead",2,Se(.6,.2,1))],song:[[0,1,"l"],[0,1],[1,2],[2,2],[1,1],[0,1,"kl"]]},{id:"cimetiere",name:"La danse du cimeti\xE8re",trend:"Halloween",ref:"Tendance Halloween de TikTok 2026 (d\xE9fil\xE9s de costumes, sons d\u2019\xE9pouvante comme \xAB Peli de terror \xBB) : un orgue hant\xE9 sur un funk lourd, en mi phrygien dominant.",tempo:128,key:4,scale:"phrygdom",bars:8,kit:["kick.sature","snare.claprage","hat.trap","perc.vibraslap"],bass:"bass.808rage",lead:"lead.orgue",dials:[7,2,11,0,0,1],arp:["order","chord"],macros:{d0:[.7,.55],d1:[.5,.75],bass:[.6,.3,.55,.6,.6,.5],lead:[.55,.6,.3,.6,.35,.75]},mix:{pump:.3,space:.6,drumDrive:.3,drumSpace:.2},takes:[i=>i.lane(2,11,0,8,{x:0,y:.3,f:.5}).taps(3,3,"........X.......",{y:.6}).taps(3,7,"....X.......X...",{y:.7}).chords("lead",1,[[0,2,"7+9+11",.4],[2,2,"8+10+12",.45],[4,2,"7+9+11",.5],[6,2,"6+8+10",.45]]).line("bass",0,"-7> . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -6 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -8 . . . . . . . . . . . . . . . | . . . . . . . . . . . . /-7 . . .",{y:.4}).move("lead",2,Ie(.2,.7)),i=>i.lanes([7,2,11,null],0,8,[{y:.72},{y:.55},{x:0,y:.45}]).taps(3,1,"............X...",{y:.7}).taps(3,3,"............X...",{y:.7}).taps(3,5,"............X...",{y:.7}).taps(3,7,"....X.......X.X.",{y:.8}).chords("lead",8,[[0,2,"7+9+11",.55],[2,2,"8+10+12",.6],[4,2,"7+9+11",.6],[6,2,"6+8+10",.62]]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -7 . . . . . -7 . . . /-3 . /-7 . . . | -6> . . . . . -6 . . . /-4 . -6 . . . | -6 . . . . . -6 . . . /-2 . /-6 . . . | -7> . . . . . -7 . . . /-5 . -7 . . . | -7 . . . . . -7 . . . /-3 . /-7 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -8 . . . -8 . /-7 . . . . . /-14 . . .",{y:.65}).move("lead",2,Se(.6,.3,2)).move("bass",0,Ie(.6,.85)),i=>i.lane(2,11,0,8,{x:0,y:.35,f:.6}).lane(1,2,4,8,{y:.45}).taps(3,3,"............X...",{y:.65}).taps(3,7,"....X...X...X...",{y:.75}).line("lead",0,"14> . . . . . 13 . 12 . . . 11 . . . | 12 . . . . . 11 . 10 . . . 9 . . . | 10 . . . 11 . 12 . 13 . . . 14 . . . | 15 . . . . . . . 14 . . . . . . . | 14> . . . . . 13 . 12 . . . 11 . . . | 12 . . . . . 11 . 10 . . . 9 . 8 . | 9 . 8 . 7 . 8 . /9 . . . 8 . . . | 7 . . . . . . . . . . . _ _ _ _",{y:.55}).line("bass",0,"-7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -6 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -8 . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . _ _ _ _",{y:.45}).move("lead",5,Ie(.6,.9))],song:[[0,1],[1,1],[2,1],[1,1],[0,1,"b"]]},{id:"rebond",name:"Rebond",trend:"Jersey club",ref:"Les danses qui rebondissent de TikTok 2026 sur du jersey club : 142 BPM, sol mineur (r\xE9glages du genre), le grincement de lit en signature.",tempo:142,key:7,scale:"minor",bars:4,kit:["kick.jersey","snare.clapjersey","hat.jersey","perc.couinement"],bass:"bass.bounce",lead:"lead.stabjersey",dials:[6,6,12,0,14,14],arp:["order","chord"],macros:{d0:[.65,.45],d1:[.4,.55],bass:[.6,.45,.4,.35,.15,.2],lead:[.45,.3,.6,.55,.3,.35]},mix:{pump:.45,space:.3,drumDrive:.2,drumSpace:.08},takes:[i=>i.lanes([6,6,12,null],0,4,[{y:.6},{y:.55},{x:0,y:.42}]).taps(3,0,"....X.......X... | ....X.......X... | ....X.......X... | ....X...X.X.X...",{y:.55}).chords("bass",14,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).chords("lead",14,[[0,1,"7+9+11",.55],[1,1,"5+7+9",.55],[2,1,"6+8+10",.58],[3,1,"7+9+11",.6]]).move("bass",0,Se(.6,.15,4)),i=>i.lanes([6,6,12,null],0,4,[{y:.66},{y:.58},{x:0,y:.45}]).taps(3,0,"....X.......X... | ....X.......X... | ....X.......X... | ....X...X.X.XXXX",{y:.6}).taps(0,3,"............x.x.",{y:.7}).chords("bass",14,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-7",.6]]).line("lead",0,"7> _ 7 _ _ 9 _ 7 . _ 6 _ 4 . _ _ | 7> _ 7 _ _ 9 _ 10 . _ 9 _ 7 . _ _ | 7> _ 7 _ _ 9 _ 7 . _ 6 _ 4 . _ _ | 2 . 4 . 6 . 7> . . . _ _ _ _ _ _",{y:.6}).move("lead",1,Se(.4,.3,2))],song:[[0,1,"l"],[0,2],[1,2],[0,1,"kb"],[1,2]]},{id:"costumes",name:"D\xE9fil\xE9 des costumes",trend:"\xC9lectro-pop (Halloween)",ref:"Dans l\u2019esprit de \xAB Ramalama (Bang Bang) \xBB (R\xF3is\xEDn Murphy, 2005), le son des d\xE9fil\xE9s de costumes d\u2019Halloween sur TikTok en 2026 : 107 BPM, do\u266F mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:107,key:1,scale:"minor",bars:4,kit:["kick.909","snare.clap808","hat.analogique","perc.cloche808"],bass:"bass.pulse",lead:"lead.sync",dials:[1,1,3,0,4,0],arp:["order","order"],macros:{d0:[.55,.5],d2:[.45,.6],bass:[.55,.45,.45,.5,.15,.2],lead:[.5,.45,.3,.35,.35,.3]},mix:{pump:.3,space:.4,drumDrive:.15,drumSpace:.12},takes:[i=>i.lanes([1,1,3,null],0,4,[{y:.6},{y:.5},{x:2,y:.45}]).taps(3,0,"..x...x...x.x... | ..x...x...x.x... | ..x...x...x.x... | ..x...x...x.xx.x",{y:.5}).chords("bass",4,[[0,2,"-7+0",.5],[2,1,"-9+-2",.52],[3,1,"-8+-1",.55]],{arp:"order"}).move("bass",2,Se(.5,.25,1)),i=>i.lanes([1,1,3,null],0,4,[{y:.62},{y:.52},{x:2,y:.48}]).taps(3,0,"..x...x...x.x... | ..x...x...x.x... | ..x...x...x.x... | ..x...x...x.xx.x",{y:.55}).chords("bass",4,[[0,2,"-7+0",.55],[2,1,"-9+-2",.55],[3,1,"-8+-1",.58]],{arp:"order"}).line("lead",0,"7> . _ 7 . _ 9 . _ _ 7 . 6 . 4 . | 7> . _ 7 . _ 9 . _ _ 11 . 9 . 7 . | 5> . _ 5 . _ 7 . _ _ 5 . 4 . 2 . | 6> . _ 6 . _ 8 . _ _ /9 . . . . .",{y:.55}).move("lead",0,Ie(.3,.75)).move("bass",2,Se(.6,.2,2))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"kl"],[1,2]]},{id:"escalier",name:"Escalier pi\xE9g\xE9",trend:"Pop-rock des ann\xE9es 80",ref:"Dans l\u2019esprit de \xAB Beat It \xBB (Michael Jackson, 1982), la musique des faux escaliers pi\xE9g\xE9s de TikTok en septembre 2026 : 139 BPM, mi\u266D mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:139,key:3,scale:"minor",bars:4,kit:["kick.acoustique","snare.acoustique","hat.acoustique","perc.toms"],bass:"bass.electrique",lead:"lead.guitare",dials:[2,1,1,0,0,0],arp:["order","chord"],macros:{d1:[.55,.5],bass:[.6,.55,.6,.5,.1,.2],lead:[.7,.45,.5,.3,.2,.35]},mix:{pump:.1,space:.35,drumDrive:.25,drumSpace:.2},takes:[i=>i.lanes([2,1,1,null],0,4,[{y:.6},{y:.62},{x:0,y:.45}]).taps(3,3,"........xx..xx..",{x:1,y:.6}).taps(3,3,"..........xx..XX",{x:0,y:.65}).line("bass",0,"-7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -3 . -2 . /-1 . . .",{y:.6,gap:.15}).line("lead",0,"7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 9+13 . . . 8+12 . . . 7+11> . . . _ _ _ _",{y:.6}),i=>i.lanes([2,1,1,null],0,4,[{y:.66},{y:.66},{x:1,y:.5}]).taps(3,3,"........xxxxXXXX",{x:0,y:.7}).line("bass",0,"-7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -9 . -9 . -7 . -9 . -10 . -11 . -10 . -9 . | -8 . -8 . -6 . -8 . -3 . -2 . /-1 . . .",{y:.62,gap:.15}).line("lead",0,"11 . 11 . 10 . 9 . 11 . . . 9 . 7 . | 11 . 11 . 10 . 9 . 6 . . . 4 . . . | 9 . 9 . 8 . 7 . 9 . . . 7 . 5 . | 8 . . . 9 . . . /11 . . . . . _ _",{y:.65}).move("lead",4,Se(.3,.15,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1],[1,2]]},{id:"ete2011",name:"\xC9t\xE9 2011",trend:"Pop des ann\xE9es 2010",ref:"Dans l\u2019esprit de \xAB The One That Got Away \xBB (Katy Perry, 2010), chanson de l\u2019\xE9t\xE9 2026 sur TikTok : 123 BPM, mi majeur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:123,key:4,scale:"major",bars:8,kit:["kick.club","snare.classique","hat.analogique","perc.claves"],bass:"bass.doux",lead:"lead.piano",dials:[1,1,1,0,6,6],arp:["order","chord"],macros:{bass:[.5,.55,.4,.55,.1,.2],lead:[.45,.55,.35,.2,.3,.5]},mix:{pump:.25,space:.5,drumDrive:.1,drumSpace:.18},takes:[i=>i.lanes([1,1,1,null],0,8,[{y:.45},{y:.48},{x:0,y:.38}]).taps(3,3,"............x.x.",{y:.4}).taps(3,7,"........x.x.x.x.",{y:.45}).chords("lead",6,[[0,2,"7+9+11",.5],[2,2,"4+6+8",.5],[4,2,"5+7+9",.52],[6,2,"3+5+7",.5]]).chords("bass",6,[[0,2,"-7",.5],[2,2,"-10",.5],[4,2,"-9",.5],[6,2,"-11",.5]]),i=>i.lanes([1,1,2,null],0,8,[{y:.55},{y:.55},{x:0,y:.45}]).taps(3,1,"............x.x.",{y:.45}).taps(3,3,"........x.x.x.x.",{y:.5}).taps(3,5,"............x.x.",{y:.45}).taps(3,7,"x.x.x.x.x.x.XXXX",{y:.55}).chords("bass",6,[[0,2,"-7",.55],[2,2,"-10",.55],[4,2,"-9",.55],[6,2,"-11",.55]]).line("lead",0,"9 . . . 9 . 8 . 7 . . . 8 . 9 . | 11 . . . 9 . . . 7 . . . _ _ _ _ | 8 . . . 8 . 7 . 6 . . . 7 . 8 . | 9 . . . 8 . . . 6 . . . _ _ _ _ | 9 . . . 9 . 10 . 11 . . . 12 . 11 . | 12 . . . 11 . . . 9 . . . _ _ 9 _ | 10 . . . 9 . 8 . 7 . . . 8 . 7 . | 7 . . . . . . . _ _ _ _ _ _ _ _",{y:.55}).move("lead",4,Se(.35,.12,1))],song:[[0,1],[1,1],[0,1,"k"],[1,2]]},{id:"mondial",name:"Mondial 2026",trend:"Afrobeats \xD7 latino",ref:"Le son afrobeats et latino de la Coupe du monde 2026 (comme \xAB Dai Dai \xBB, Shakira et Burna Boy). Tempo et tonalit\xE9 : ceux du genre.",tempo:105,key:9,scale:"minor",bars:4,steps:{lead:5},kit:["kick.afroprofond","snare.clapafro","hat.shakerafro","perc.djembe"],bass:"bass.afrorond",lead:"lead.balafon",dials:[8,9,9,1,7,0],arp:["order","order"],macros:{d3:[.5,.6],bass:[.55,.5,.45,.55,.1,.2],lead:[.4,.6,.3,.2,.35,.35]},mix:{pump:.25,space:.4,drumDrive:.12,drumSpace:.15},takes:[i=>i.lanes([8,9,9,1],0,4,[{y:.6},{y:.5},{x:1,y:.45},{y:.55}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-12",.52],[3,1,"-8",.55]]),i=>i.lanes([8,9,16,3],0,4,[{y:.62},{y:.52},{x:1,y:.48},{y:.6}]).chords("bass",7,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-12",.55],[3,1,"-8",.58]]).line("lead",0,"7 _ 9 _ 10 . 9 _ 7 _ _ 4 . _ 7 _ | 6 _ 7 _ 9 . 7 _ 6 _ _ 4 . _ 2 _ | 7 _ 9 _ 10 . 11 _ 13 _ _ 11 . _ 9 _ | 10 . 9 . 7 . . . _ _ _ _ _ _ _ _",{y:.55,gap:.25}).move("lead",4,Se(.35,.15,2)),i=>i.lanes([8,9,16,3],0,4,[{y:.64},{y:.54},{x:1,y:.5},{y:.62}]).chords("bass",7,[[0,1,"-7",.58],[1,1,"-9",.58],[2,1,"-12",.58],[3,1,"-8",.6]]).line("lead",0,"_ _ 9 . 9 . 7 _ 9 . 10 . 9 . 7 . | _ _ 9 . 9 . 7 _ 9 . 10 . 12> . . . | _ _ 11 . 11 . 9 _ 11 . 12 . 11 . 9 . | 10 . . . 9 . 7 . 6 . . . _ _ _ _",{y:.58,gap:.2}).move("lead",4,Se(.4,.15,2))],song:[[0,1,"l"],[0,1,"l"],[1,2],[2,2],[0,1],[1,1],[2,2]]},{id:"conscience",name:"Conscience",trend:"Rock alternatif",ref:"Dans l\u2019esprit de \xAB Self Aware \xBB (Temper City, 2026) : 162 BPM, la mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:162,key:9,scale:"minor",bars:4,kit:["kick.acoustique","snare.acoustique","hat.ride","perc.toms"],bass:"bass.electrique",lead:"lead.guitare",dials:[2,1,1,0,4,4],arp:["order","up"],macros:{bass:[.6,.6,.65,.5,.1,.2],lead:[.6,.55,.45,.4,.25,.35]},mix:{pump:.08,space:.35,drumDrive:.3,drumSpace:.22},takes:[i=>i.lanes([2,1,1,null],0,4,[{y:.6},{y:.6},{x:0,y:.45}]).chords("lead",4,[[0,1,"7+9+11",.5],[1,1,"5+7+9",.5],[2,1,"9+11+13",.52],[3,1,"6+8+10",.55]],{arp:"up"}).chords("bass",4,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-12",.5],[3,1,"-8",.52]]),i=>i.lanes([12,2,7,null],0,4,[{y:.66},{y:.66},{x:2,y:.55}]).taps(3,3,"........xxxxXXXX",{x:0,y:.7}).chords("lead",2,[[0,1,"7+11+14",.62],[1,1,"5+9+12",.62],[2,1,"9+13+16",.64],[3,1,"6+10+13",.66]]).chords("bass",4,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-12",.55],[3,1,"-8",.58]]).move("lead",3,Ie(.3,.6)),i=>i.lanes([12,2,7,null],0,4,[{y:.68},{y:.66},{x:2,y:.56}]).taps(3,3,"............xxXX",{x:0,y:.7}).chords("bass",4,[[0,1,"-7",.58],[1,1,"-9",.58],[2,1,"-12",.58],[3,1,"-8",.6]]).line("lead",0,"11> . . . 11 . 10 . 9 . . . 7 . . . | 9 . . . 9 . 10 . 11 . . . 9 . . . | 13> . . . 13 . 11 . 11 . . . 10 . 9 . | 10 . . . . . 8 . 10 . . . _ _ _ _",{y:.62}).move("lead",3,Ie(.35,.55))],song:[[0,1,"b"],[0,1],[1,2],[2,2],[0,1],[1,1],[2,2]]},{id:"piste",name:"Piste de danse",trend:"\xC9lectroclash",ref:"Dans l\u2019esprit de \xAB DANCE\u2026 \xBB (Slayyyter, 2026) : 113 BPM, la majeur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:113,key:9,scale:"major",bars:4,kit:["kick.909","snare.clap808","hat.analogique","perc.cloche808"],bass:"bass.acide",lead:"lead.chip",dials:[1,1,3,0,5,0],arp:["up","order"],macros:{d2:[.4,.65],bass:[.45,.7,.55,.4,.3,.5],lead:[.55,.4,.3,.2,.35,.3]},mix:{pump:.35,space:.35,drumDrive:.25,drumSpace:.1},takes:[i=>i.lanes([1,1,3,null],0,4,[{y:.62},{y:.5},{x:2,y:.5}]).chords("bass",5,[[0,1,"-7+-5+-3",.5],[1,1,"-10+-8+-6",.5],[2,1,"-9+-7+-5",.52],[3,1,"-11+-9+-7",.55]],{arp:"up"}).move("bass",0,Se(.45,.3,2)),i=>i.lanes([1,1,3,11],0,4,[{y:.65},{y:.55},{x:2,y:.55},{y:.5}]).chords("bass",5,[[0,1,"-7+-5+-3",.55],[1,1,"-10+-8+-6",.55],[2,1,"-9+-7+-5",.58],[3,1,"-11+-9+-7",.6]],{arp:"up"}).line("lead",0,"11 . 11 . 9 . 11 . 12 . . . 11 . 9 . | 8 . 8 . 6 . 8 . 9 . . . 8 . 6 . | 9 . 9 . 7 . 9 . 10 . . . 9 . 7 . | 10 . . . 11 . . . 12> . . . . . _ _",{y:.6}).move("bass",0,Ie(.35,.85)).move("lead",1,Se(.5,.3,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"contagion",name:"Contagion douce",trend:"Pop ballade",ref:"Dans l\u2019esprit de \xAB Patient Zero \xBB (Taylor Swift, 2026), les mariages film\xE9s sur TikTok en octobre 2026 : 92 BPM, do majeur, d\u2019apr\xE8s les donn\xE9es publiques (tonalit\xE9 de la version piano).",tempo:92,key:0,scale:"major",bars:8,kit:["kick.feutre","snare.claplarge","hat.fin","perc.claves"],bass:"bass.electrique",lead:"lead.piano",dials:[2,1,1,0,3,3],arp:["order","chord"],macros:{d1:[.45,.65],bass:[.45,.55,.35,.6,.1,.25],lead:[.55,.5,.35,.25,.35,.6]},mix:{pump:.15,space:.6,drumDrive:.05,drumSpace:.25},takes:[i=>i.lanes([2,1,1,null],0,8,[{y:.4},{y:.45},{x:0,y:.3}]).chords("lead",3,[[0,2,"5+7+9",.45],[2,2,"3+5+7",.45],[4,2,"7+9+11",.48],[6,2,"4+6+8",.5]]).chords("bass",3,[[0,2,"-9",.45],[2,2,"-11",.45],[4,2,"-7",.45],[6,2,"-10",.45]]),i=>i.lanes([2,1,2,null],0,8,[{y:.5},{y:.5},{x:0,y:.38}]).taps(3,3,"............x.x.",{y:.4}).taps(3,7,"........x.x.x.x.",{y:.45}).chords("bass",3,[[0,2,"-9",.5],[2,2,"-11",.5],[4,2,"-7",.5],[6,2,"-10",.5]]).line("lead",0,"9 . . . 9 . 11 . 12 . . . 11 . 9 . | 11 . . . . . 9 . 7 . . . _ _ _ _ | 7 . . . 7 . 9 . 10 . . . 9 . 7 . | 9 . . . . . 7 . 6 . . . _ _ _ _ | 9 . . . 9 . 11 . 12 . . . 14 . 12 . | 11 . . . . . 9 . 11 . . . 12 . . . | 11 . 10 . 9 . . . 7 . . . 9 . . . | 7 . . . . . . . _ _ _ _ _ _ _ _",{y:.5}).move("lead",5,Ie(.55,.75))],song:[[0,1,"k"],[1,1],[0,1],[1,1]]},{id:"logdrum",name:"Log drum 2026",trend:"Amapiano",ref:"Les d\xE9fis de danse amapiano de TikTok 2026 : 112 BPM, r\xE9 dorien (r\xE9glages du genre), le log drum qui glisse.",tempo:112,key:2,scale:"dorian",bars:8,kit:["kick.pianofeutre","snare.rimpiano","hat.shakerpiano","perc.logdrum"],bass:"bass.logdrum",lead:"lead.keys",dials:[9,9,4,9,0,8],arp:["order","chord"],macros:{d3:[.6,.4],bass:[.65,.5,.55,.45,.5,.55],lead:[.55,.45,.4,.2,.35,.45]},mix:{pump:.3,space:.45,drumDrive:.08,drumSpace:.15},takes:[i=>i.lanes([9,9,4,null],0,8,[{y:.5},{y:.5},{x:0,y:.45}]).line("bass",0,"-7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ -8 . _ /-7 . . | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ /-8 . . . . .",{y:.55,gap:.08}).chords("lead",8,[[0,2,"7+9+11+13",.45],[2,2,"10+12+14+16",.48],[4,2,"7+9+11+13",.5],[6,2,"10+12+14+16",.52]]).move("bass",0,Se(.6,.15,2)).move("lead",4,Se(.35,.12,1)),i=>i.lanes([9,9,9,9],0,8,[{y:.55},{y:.52},{x:1,y:.5},{y:.6}]).line("bass",0,"-7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ -8 . _ /-7 . . | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ /-8 . . . . .",{y:.6,gap:.08}).chords("lead",13,[[0,2,"7+9+11+13",.5],[2,2,"10+12+14+16",.52],[4,2,"7+9+11+13",.55],[6,2,"10+12+14+16",.58]]).move("lead",4,Ie(.3,.6))],song:[[0,1,"b"],[0,1],[1,1],[0,1,"k"],[1,1]]},{id:"baile150",name:"Baile 150",trend:"Funk carioca 150 BPM",ref:"Le funk carioca acc\xE9l\xE9r\xE9 \xE0 150 BPM des danses br\xE9siliennes de TikTok (r\xE9glages du genre) : agog\xF4, 808 qui glisse et un chant de synth\xE8se.",tempo:150,key:6,scale:"minor",bars:4,kit:["kick.boom","snare.clapserre","hat.tss","perc.agogo"],bass:"bass.808",lead:"lead.voix",dials:[7,1,1,16,0,0],macros:{d0:[.7,.45],d3:[.5,.55],bass:[.6,.5,.6,.6,.5,.45],lead:[.45,.6,.4,.35,.3,.3]},mix:{pump:.35,space:.3,drumDrive:.3,drumSpace:.06},takes:[i=>i.lanes([7,1,1,16],0,4,[{y:.66},{y:.52},{x:0,y:.42},{y:.58}]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -10> . . . . . -10 . . . /-8 . /-7 . . .",{y:.6}),i=>i.lanes([7,1,2,16],0,4,[{y:.7},{y:.55},{x:0,y:.45},{y:.62}]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -10> . . . . . -10 . . . /-8 . /-7 . . .",{y:.62}).line("lead",0,"7 _ 7 _ 9 . 7 _ 6 . 4 _ _ _ 4 _ | 7 _ 7 _ 9 . 10 _ 9 . 7 _ _ _ _ _ | 7 _ 7 _ 9 . 7 _ 6 . 4 _ _ _ 2 _ | 4 . . . 6 . . . 7> . . . _ _ _ _",{y:.55}).move("lead",0,Se(.45,.25,2)),i=>i.lanes([null,1,14,16],0,4,[null,{y:.6},{x:0,y:.5},{y:.7}]).taps(0,0,"X..x..x...x.x... | X..x..x...x.x... | X..x..x...x.x... | X..x..x.X.X.XXXX",{y:.75}).line("bass",0,"-7> . . . -7 . . . /-5 . -7 . . . -7 . | -9> . . . -9 . . . /-7 . -9 . . . -9 . | -8> . . . -8 . . . /-6 . -8 . . . -8 . | -10> . . . /-14 . . . . . . . /-7 . . .",{y:.7}).move("d0",0,Ie(.6,.9))],song:[[0,1,"l"],[1,2],[2,1],[1,2],[0,1,"kl"]]},{id:"garage",name:"Garage 2026",trend:"UK garage",ref:"Le retour du UK garage sur TikTok en 2026 : 134 BPM, fa mineur, rythme chaloup\xE9 (r\xE9glages du genre).",tempo:134,swing:58,key:5,scale:"minor",bars:4,kit:["kick.garage","snare.garage","hat.garage","perc.toc"],bass:"bass.speedgarage",lead:"lead.rhodes",dials:[3,4,4,13,10,8],arp:["order","chord"],macros:{bass:[.5,.55,.5,.4,.55,.3],lead:[.45,.5,.4,.25,.35,.4]},mix:{pump:.4,space:.35,drumDrive:.12,drumSpace:.1},takes:[i=>i.lanes([3,4,4,13],0,4,[{y:.58},{y:.5},{x:0,y:.45},{y:.5}]).chords("bass",10,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).chords("lead",8,[[0,1,"7+9+11+13",.5],[1,1,"5+7+9",.5],[2,1,"6+8+10",.52],[3,1,"7+9+11",.55]]).move("bass",0,Se(.5,.25,4)),i=>i.lanes([3,4,2,13],0,4,[{y:.62},{y:.55},{x:0,y:.5},{y:.55}]).chords("bass",10,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-7",.6]]).line("lead",0,"9 . _ 9 . _ 11 . _ 9 _ 7 . _ _ _ | 9 . _ 9 . _ 11 . _ 12 _ 11 . _ _ _ | 9 . _ 9 . _ 11 . _ 9 _ 7 . _ 6 _ | 7 . . . 6 . . . 4 . . . _ _ _ _",{y:.55}).move("bass",2,Ie(.35,.7))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"liquide",name:"Liquide",trend:"Drum & bass liquide",ref:"La drum & bass liquide des versions acc\xE9l\xE9r\xE9es de TikTok : 174 BPM, fa mineur (r\xE9glages du genre).",tempo:174,key:5,scale:"minor",bars:8,kit:["kick.break","snare.dnb","hat.ridednb","perc.tombreak"],bass:"bass.reese",lead:"lead.liquide",dials:[5,5,1,0,0,1],arp:["order","chord"],macros:{bass:[.45,.35,.4,.4,.5,.65],lead:[.55,.5,.45,.4,.4,.55]},mix:{pump:.3,space:.55,drumDrive:.15,drumSpace:.18},takes:[i=>i.lanes([5,5,1,null],0,8,[{y:.6},{y:.55},{x:0,y:.42}]).chords("lead",1,[[0,2,"7+9+11+14",.5],[2,2,"5+7+9+12",.5],[4,2,"9+11+13",.52],[6,2,"6+8+10+13",.55]]).line("bass",0,"-7> . . . . . . . . . . . -7 . . . | . . . . . . . . -5 . . . /-7 . . . | -9> . . . . . . . . . . . -9 . . . | . . . . . . . . -7 . . . /-9 . . . | -12> . . . . . . . . . . . -12 . . . | . . . . . . . . -10 . . . /-12 . . . | -8> . . . . . . . . . . . -8 . . . | . . . . . . . . -6 . . . /-7 . . .",{y:.5}).move("lead",2,Se(.45,.2,1)),i=>i.lanes([5,5,2,null],0,8,[{y:.66},{y:.6},{x:0,y:.5}]).taps(3,3,"............xxXX",{x:1,y:.6}).taps(3,7,"........xx.xxxXX",{x:0,y:.65}).chords("lead",1,[[0,2,"7+9+11+14",.55],[2,2,"5+7+9+12",.55],[4,2,"9+11+13",.58],[6,2,"6+8+10+13",.6]]).line("bass",0,"-7> . . . . . -7 . . . -5 . /-7 . . . | -7 . . . . . -2 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . -7 . /-9 . . . | -9 . . . . . -4 . . . /-7 . -9 . . . | -12> . . . . . -12 . . . -10 . /-12 . . . | -12 . . . . . -7 . . . /-10 . -12 . . . | -8> . . . . . -8 . . . -6 . /-8 . . . | -8 . . . -6 . . . -5 . . . /-7 . . .",{y:.6}).move("bass",1,Se(.4,.25,2)),i=>i.lanes([5,5,2,null],0,8,[{y:.66},{y:.6},{x:0,y:.5}]).taps(3,7,"........xx.xxxXX",{x:0,y:.65}).chords("lead",1,[[0,2,"0+2+4+7",.45],[2,2,"-2+0+2+5",.45],[4,2,"2+4+6",.47],[6,2,"-1+1+3+6",.5]],{v:.7}).line("lead",0,"11> . . . . . . . 9 . . . . . . . | 10 . . . 9 . . . 8 . . . 7 . . . | 7 . . . . . . . 9 . . . . . . . | 10 . . . . . . . 11 . . . 12 . . . | 13> . . . . . . . 11 . . . . . . . | 12 . . . 11 . . . 10 . . . 9 . . . | 8 . . . . . . . 10 . . . . . . . | 11 . . . 10 . . . 8 . . . _ _ _ _",{y:.6}).line("bass",0,"-7> . . . . . -7 . . . -5 . /-7 . . . | -7 . . . . . -2 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . -7 . /-9 . . . | -9 . . . . . -4 . . . /-7 . -9 . . . | -12> . . . . . -12 . . . -10 . /-12 . . . | -12 . . . . . -7 . . . /-10 . -12 . . . | -8> . . . . . -8 . . . -6 . /-8 . . . | -8 . . . -6 . . . -5 . . . /-7 . . .",{y:.6}).move("lead",2,Se(.45,.2,1))],song:[[0,1,"k"],[0,1],[1,2],[2,2],[0,1,"b"]]},{id:"rage",name:"Rage",trend:"Rage \xB7 trap m\xE9lodique",ref:"Le rage et la trap m\xE9lodique de TikTok 2026 : 150 BPM, do\u266F mineur harmonique (r\xE9glages du genre), arp\xE8ges satur\xE9s.",tempo:150,key:1,scale:"harmonic",bars:4,kit:["kick.808rage","snare.claprage","hat.trap","perc.laser"],bass:"bass.808rage",lead:"lead.rage",dials:[4,7,6,0,0,15],arp:["order","up"],macros:{d2:[.5,.6],bass:[.65,.3,.55,.6,.6,.5],lead:[.6,.55,.3,.6,.3,.35]},mix:{pump:.3,space:.35,drumDrive:.3,drumSpace:.08},takes:[i=>i.lanes([4,7,6,null],0,4,[{y:.65},{y:.55},{x:0,y:.45}]).taps(3,1,"..............X.",{y:.6}).taps(3,3,"..........X...X.",{y:.65}).chords("lead",15,[[0,1,"7+9+11",.55],[1,1,"5+7+9",.55],[2,1,"3+5+7",.58],[3,1,"4+6+8",.6]],{arp:"up"}).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -11> . . . . . -11 . . . /-9 . -11 . . . | -10> . . . . . -10 . /-7 . . . /-3 . . .",{y:.6}),i=>i.lanes([4,7,6,null],0,4,[{y:.7},{y:.58},{x:0,y:.5}]).taps(3,0,"......X.......X. | ......X.......X. | ......X.......X. | ..X...X...X.XXXX",{y:.7}).chords("lead",15,[[0,1,"7+9+11",.62],[1,1,"5+7+9",.62],[2,1,"3+5+7",.65],[3,1,"4+6+8",.68]],{arp:"up"}).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -11> . . . . . -11 . . . /-9 . -11 . . . | -10> . . . . . -10 . /-7 . . . /-3 . . .",{y:.65}).move("lead",1,Ie(.5,.85)).move("lead",2,Se(.3,.2,2))],song:[[0,1,"kb"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"afrohouse",name:"Afro house 2026",trend:"Afro house",ref:"L\u2019afro house des vid\xE9os de danse de TikTok 2026 : 122 BPM, la mineur (r\xE9glages du genre).",tempo:122,key:9,scale:"minor",bars:8,kit:["kick.afroprofond","snare.clapafro","hat.shakerafro","perc.djembe"],bass:"bass.afrorond",lead:"lead.marimba",dials:[1,1,9,7,7,0],arp:["order","order"],macros:{d3:[.55,.55],bass:[.5,.55,.45,.6,.15,.25],lead:[.45,.55,.35,.2,.4,.45]},mix:{pump:.4,space:.45,drumDrive:.1,drumSpace:.15},takes:[i=>i.lanes([1,1,9,7],0,8,[{y:.58},{y:.5},{x:1,y:.45},{y:.55}]).chords("bass",7,[[0,2,"-7",.5],[2,2,"-8",.5],[4,2,"-9",.52],[6,2,"-8",.55]]),i=>i.lanes([1,1,9,7],0,8,[{y:.62},{y:.52},{x:1,y:.48},{y:.6}]).chords("bass",7,[[0,2,"-7",.55],[2,2,"-8",.55],[4,2,"-9",.55],[6,2,"-8",.58]]).line("lead",0,"7 _ 9 _ 7 _ 11 _ 9 _ 7 _ 4 _ _ _ | 6 _ 7 _ 9 _ 7 _ 6 _ 4 _ 2 _ _ _ | 5 _ 7 _ 5 _ 9 _ 7 _ 5 _ 4 _ _ _ | 6 . . . 7 . . . 9 . . . 11 . . . | 7 _ 9 _ 7 _ 11 _ 9 _ 7 _ 4 _ _ _ | 6 _ 7 _ 9 _ 7 _ 6 _ 4 _ 2 _ _ _ | 5 _ 7 _ 5 _ 9 _ 7 _ 5 _ 4 _ 2 _ | 0 . . . . . . . _ _ _ _ _ _ _ _",{y:.55,gap:.3}).move("lead",4,Se(.4,.15,1))],song:[[0,1,"l"],[0,1,"l"],[1,1],[0,1],[1,1]]},{id:"perreo",name:"Perreo 2026",trend:"Reggaeton \xB7 perreo",ref:"Le perreo des chor\xE9graphies de TikTok 2026 : 96 BPM, mi mineur, rythme dembow (r\xE9glages du genre).",tempo:96,key:4,scale:"minor",bars:4,kit:["kick.perreo","snare.dembow","hat.perreo","perc.timbal"],bass:"bass.subperreo",lead:"lead.perreo",dials:[16,3,1,0,11,0],arp:["order","order"],macros:{bass:[.65,.55,.6,.45,.1,.15],lead:[.4,.6,.35,.2,.35,.35]},mix:{pump:.3,space:.35,drumDrive:.15,drumSpace:.08},takes:[i=>i.lanes([16,3,1,null],0,4,[{y:.6},{y:.55},{x:0,y:.42}]).taps(3,3,"............x.xX",{y:.55}).chords("bass",11,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-10",.55]]),i=>i.lanes([16,3,1,null],0,4,[{y:.62},{y:.58},{x:0,y:.45}]).taps(3,1,"............x.xX",{y:.55}).taps(3,3,"........x.x.x.xX",{y:.6}).chords("bass",11,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-10",.6]]).line("lead",0,"11 . 9 _ 11 . 9 _ 7 . . . 9 . 7 _ | 6 . 7 . 9 . . . 7 . . . _ _ _ _ | 11 . 9 _ 11 . 9 _ 7 . . . 9 . 11 _ | 12 . . . 11 . . . 9 . . . _ _ _ _",{y:.55}).move("lead",4,Se(.35,.15,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"hardtechno",name:"Hard techno TikTok",trend:"Hard techno",ref:"La hard techno des vid\xE9os de sport et de f\xEAte de TikTok 2026 : 152 BPM, la phrygien (r\xE9glages du genre), acide en doubles croches.",tempo:152,key:9,scale:"phrygian",bars:4,kit:["kick.rumble","snare.industriel","hat.industriel","perc.metalindus"],bass:"bass.acidedur",lead:"lead.hurleur",dials:[1,1,10,0,5,0],arp:["order","order"],macros:{d0:[.7,.6],bass:[.4,.75,.55,.4,.3,.5],lead:[.6,.5,.45,.5,.25,.4]},mix:{pump:.45,space:.3,drumDrive:.4,drumSpace:.1},takes:[i=>i.lanes([1,1,10,null],0,4,[{y:.7},{y:.55},{x:0,y:.5}]).taps(3,0,"..x...x...x...x. | ..x...x...x...x. | ..x...x...x...x. | ..x...x...x.x.xx",{x:0,y:.6}).chords("bass",5,[[0,4,"-7+-6",.5]],{arp:"order"}).move("bass",0,Se(.5,.3,1)),i=>i.lanes([1,1,2,null],0,4,[{y:.75},{y:.6},{x:0,y:.55}]).taps(3,0,"..x...x...x...x. | ..x...x...x...x. | ..x...x...x...x. | ..x...x...x.x.xx",{x:0,y:.65}).chords("bass",5,[[0,2,"-7+-6",.55],[2,2,"-7+-4",.58]],{arp:"order"}).line("lead",0,"7> . . . _ _ _ _ 8> . . . _ _ _ _ | 7> . . . _ _ 7 . 8 . . . 10 . . . | 7> . . . _ _ _ _ 8> . . . _ _ _ _ | 11 . . . 10 . . . 8 . . . 7 . . .",{y:.6}).move("bass",0,Ie(.3,.9)).move("lead",1,Se(.5,.3,2))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"brume",name:"Brume ralentie",trend:"Slowed + reverb",ref:"Les versions ralenties et noy\xE9es de r\xE9verb\xE9ration (\xAB slowed + reverb \xBB) de TikTok : 78 BPM, do dorien (r\xE9glages du genre).",tempo:78,key:0,scale:"dorian",bars:4,kit:["kick.poussiere","snare.poussiere","hat.vinyle","perc.boisfeutre"],bass:"bass.ronde",lead:"lead.brume",dials:[12,2,1,0,1,1],arp:["order","chord"],macros:{bass:[.45,.6,.35,.45,.4,.45],lead:[.6,.4,.5,.45,.55,.8]},mix:{pump:.15,space:.85,drumDrive:.08,drumSpace:.35},takes:[i=>i.lanes([12,2,1,null],0,4,[{y:.45},{y:.45},{x:0,y:.35}]).taps(3,1,"..........x.....",{y:.4}).taps(3,3,"......x.....x...",{y:.45}).chords("lead",1,[[0,1,"7+9+11+13",.45],[1,1,"10+12+14",.45],[2,1,"5+7+9+11",.48],[3,1,"6+8+10",.5]]).chords("bass",1,[[0,1,"-7",.45],[1,1,"-4",.45],[2,1,"-9",.45],[3,1,"-8",.45]]).move("lead",5,Ie(.7,.9)),i=>i.lanes([12,2,1,null],0,4,[{y:.5},{y:.48},{x:0,y:.38}]).taps(3,1,"..........x.....",{y:.4}).taps(3,3,"......x.....x...",{y:.45}).chords("bass",1,[[0,1,"-7",.5],[1,1,"-4",.5],[2,1,"-9",.5],[3,1,"-8",.5]]).line("lead",0,"11 . . . . . 9 . 10 . . . 9 . 7 . | 9 . . . . . . . _ _ 7 . 9 . 10 . | 11 . . . . . 12 . 11 . . . 9 . 7 . | 7 . . . . . . . . . . . _ _ _ _",{y:.45}).move("lead",4,Se(.5,.15,1))],song:[[0,1,"b"],[0,1],[1,1],[0,1],[1,1]]}];function Qi(i,{raw:e=!1}={}){let t=Na.find(s=>s.id===i);return t?qt(Vr(t,e)):null}var Vs=class{constructor(e,t){this.store=e,this.ctx=t,this.cur=null,this.audio=null}open(e,t,s={}){this.close(!0);let a=u("div",{class:"sheet-back",onclick:()=>this.close()}),o=u("button",{class:"close","aria-label":"Fermer",onclick:()=>this.close()},Q("close")),r=u("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e},u("div",{class:"grab"}),u("header",null,u("h2",{text:e}),...s.actions||[],o),u("div",{class:"body"},t));document.body.append(a,r),requestAnimationFrame(()=>{a.classList.add("open"),r.classList.add("open")});let n=null;return r.querySelector(".grab").addEventListener("pointerdown",l=>{n=l.clientY}),r.addEventListener("pointerup",l=>{n!==null&&l.clientY-n>60&&this.close(),n=null}),this.cur={back:a,sheet:r,onClose:s.onClose},r}close(e){let t=this.cur;if(t){if(this.cur=null,t.onClose&&t.onClose(),e){t.back.remove(),t.sheet.remove();return}t.back.classList.remove("open"),t.sheet.classList.remove("open"),setTimeout(()=>{t.back.remove(),t.sheet.remove()},280)}}menu(){let e=this.store,t=(o,r,n,l)=>u("button",{class:"item",onclick:l},u("span",{class:"ic"},Q(o)),u("span",{class:"tx"},u("b",{text:r}),n?u("small",{text:n}):null)),s=document.documentElement.dataset.theme==="dark",a=u("div",{class:"list"},t("folder","Projets",e.project.name,()=>this.library()),t("plus","Nouvelle id\xE9e","Vide ou \xE0 partir d\u2019une sc\xE8ne",()=>this.newIdea()),t("share","Exporter","WAV, pistes s\xE9par\xE9es, MIDI, projet",()=>this.exportSheet()),t("speaker","Lecteur","Rendus et fichiers import\xE9s",()=>this.player()),t("settings","R\xE9glages","M\xE9tronome, clavier piano, doigts, th\xE8me",()=>this.settings()),t("dice","Sons au hasard","Batterie, basse et m\xE9lodie \xB7 annulable",()=>{this.close(),this.ctx.rollDice("all")}),t("wifi","Hors ligne et mises \xE0 jour","",()=>this.offline()),t("info","Aide","Les gestes en une page",()=>this.help()),t("file","Sons et licences","Provenance des banques int\xE9gr\xE9es",()=>this.licences()));this.open("MOTIF",a)}settings(){let e=this.store,t=e.settings,s=(c,h,f,p)=>{let m=u("button",{class:"item switch",role:"switch","aria-checked":String(!!t[c])},u("span",{class:"tx"},u("b",{text:h}),f?u("small",{text:f,style:{whiteSpace:"normal"}}):null),u("i",{class:"knob"}));return m.addEventListener("click",()=>{e.setSetting(c,!e.settings[c]),m.setAttribute("aria-checked",String(!!e.settings[c])),p&&p()}),m},a=(c,h,f)=>u("div",{class:"seg"},...h.map(p=>{let m=u("button",{"aria-pressed":String(t[c]===p)},f(p));return m.addEventListener("click",()=>{e.setSetting(c,p);for(let v of m.parentNode.children)v.setAttribute("aria-pressed",String(v===m))}),m})),o=Xr(),r=[["dark","Sombre"],["light","Clair"]];Ye.fluid&&r.push(["halloween","Halloween"]);let n=null;{let c=["Citrouille","Vaudou","Fant\xF4me","Calavera","Momie","Monstre","Squelette"],h=()=>Array.isArray(e.settings.hwCast)&&e.settings.hwCast.length===4?e.settings.hwCast.slice():[0,3,2,1],f=u("div",{class:"cards hwcast"},...["Kick","Snare","Hat","Perc"].map((p,m)=>{let v=u("button",{class:"pat","aria-label":p+" : changer de personnage"},u("small",{text:p}),u("b",{text:c[h()[m]]}));return v.addEventListener("click",()=>{let b=h();b[m]=(b[m]+1)%c.length,e.setSetting("hwCast",b),v.querySelector("b").textContent=c[b[m]]}),v}));n=u("div",{hidden:o!=="halloween"},u("p",{class:"note",text:"Les quatre de la batterie : touche une case pour changer de personnage."}),f,u("div",{class:"list",style:{marginTop:"8px"}},s("hwRelay","Ils se relaient","De temps en temps, l\u2019un d\u2019eux retourne dans sa tombe et un de ceux qu\u2019on ne voit pas sort de terre \xE0 sa place : pendant la lecture toutes les huit mesures, au repos toutes les 25 \xE0 45 secondes.")))}let l=u("div",{class:"seg"},...r.map(([c,h])=>{let f=u("button",{"aria-pressed":String(c===o)},h);return f.addEventListener("click",()=>{$r(c);for(let p of f.parentNode.children)p.setAttribute("aria-pressed",String(p===f));n&&(n.hidden=c!=="halloween")}),f})),d=u("div",null,u("div",{class:"sect"},u("h3",{text:"M\xE9tronome"}),u("div",{class:"list"},s("metro","M\xE9tronome","Un clic \xE0 chaque temps, plus aigu sur le premier. Raccourci : touche le tempo en haut. Jamais pr\xE9sent dans les exports."),s("metroAlways","Aussi sans enregistrer","Sinon, il ne sonne que pendant l\u2019enregistrement (REC).")),u("p",{class:"note",text:"Volume du clic"}),a("metroLevel",[-12,-6,0,6],c=>(c>0?"+":c<0?"\u2212":"")+Math.abs(c)+" dB")),u("div",{class:"sect"},u("h3",{text:"Surface de jeu"}),u("div",{class:"list"},s("piano","Clavier de piano","Basse et m\xE9lodie : touches blanches et noires, toutes les notes jouables. Les notes de la gamme sont marqu\xE9es d\u2019un point."),s("ghosts","Montrer les doigts \xE0 la lecture","Pendant la lecture, un doigt fant\xF4me refait le geste enregistr\xE9 (chaque gliss\xE9, chaque hauteur), avec sa tra\xEEn\xE9e. Pour les prises plus anciennes, un rond marque chaque note."))),Ye.fluid?u("div",{class:"sect"},u("h3",{text:"Effets fluides"}),u("div",{class:"list"},s("fluid","Fluide sous les doigts","Encre anim\xE9e sur la surface de jeu et les tweaks : tes doigts, les notes rejou\xE9es, le kick. Coup\xE9 si l\u2019iPhone demande de r\xE9duire les animations. D\xE9sactive-le pour \xE9conomiser la batterie.")),u("p",{class:"note",text:"O\xF9"}),a("fluidZone",["keys","all"],c=>c==="keys"?"Dans les touches":"Partout"),u("p",{class:"note",text:"Style"}),a("fluidStyle",["douce","normale","spectaculaire"],c=>({douce:"Doux",normale:"Normal",spectaculaire:"Spectaculaire"})[c]),u("p",{class:"note",text:"Encre"}),a("fluidInk",["libre","maitrisee"],c=>c==="libre"?"Libre":"Ma\xEEtris\xE9e"),u("p",{class:"note",text:"Libre : chaque note, gliss\xE9 et coup d\xE9pose toute son encre, sans limite (\xE7a peut d\xE9border et br\xFBler au blanc). Ma\xEEtris\xE9e : un budget par touche, un geste lent laisse un filet, un geste vif un panache."}),u("p",{class:"note",text:"Couleurs"}),u("div",{class:"seg wrap"},...a("fluidColors",["partie","notes","arc","neon"],c=>({partie:"Partie",notes:"Notes",arc:"Arc-en-ciel",neon:"N\xE9on"})[c]).children),u("p",{class:"note",text:"\xAB Dans les touches \xBB : chaque touche devient un tube, l\u2019encre ne passe pas d\u2019une touche \xE0 l\u2019autre. \xAB Notes \xBB : chaque note a sa couleur (voisines sur le cycle des quintes = couleurs voisines). Spectaculaire : tra\xEEn\xE9es longues, halo, et le kick secoue toute l\u2019encre."}),u("div",{class:"list",style:{marginTop:"8px"}},s("glass","Verre liquide","Le pad et la surface Tweaks deviennent une plaque de verre pos\xE9e sur l\u2019\xE9cran, dans l\u2019esprit Liquid Glass : son bord courbe ce qu\u2019il y a dessous et s\xE9pare un peu les couleurs, ses reflets suivent la lumi\xE8re, elle fl\xE9chit sous le doigt. Choisis son style plus bas."),s("mixGlass","Mix sous verre","Chaque tranche du Mix devient un tube de verre rempli de son niveau, et le son de chaque instrument y monte en lumi\xE8re liquide : un jet \xE0 chaque attaque, un filet tant qu\u2019il sonne."),s("glassSpill","Lumi\xE8re autour du verre","La lumi\xE8re de l\u2019encre d\xE9borde du verre sur l\u2019\xE9cran. Les boutons proches r\xE9v\xE8lent leur relief et projettent une ombre \xE0 l\u2019oppos\xE9 ; les boutons sans fond ne font ressortir que leur texte. Plus ils sont loin de la lumi\xE8re, moins elle les touche.")),u("p",{class:"note",text:"Style du verre"}),u("div",{class:"seg wrap"},...a("glassLook",["optique","liquide","depoli","cristal","prisme"],c=>({optique:"Optique",liquide:"Liquide",depoli:"D\xE9poli",cristal:"Cristal",prisme:"Prisme"})[c]).children),u("p",{class:"note",text:"Optique : une plaque claire et incolore, presque invisible, qui ne courbe que ses bords ; l\u2019encre et les touches restent nettes. Liquide : le verre pr\xE9c\xE9dent, une dalle plus \xE9paisse qui s\u2019\xE9claire de l\u2019encre et sous le doigt. D\xE9poli : un verre laiteux qui floute l\u2019encre en lueurs et s\u2019\xE9claire de la lumi\xE8re autour. Cristal : un bord biseaut\xE9 \xE0 facettes qui d\xE9cale et irise ce qu\u2019il y a dessous et accroche la lumi\xE8re. Prisme : un verre \xE9pais et tr\xE8s clair qui flotte au-dessus de l\u2019\xE9cran ; son large bord arrondi replie l\u2019image pr\xE8s du contour et la d\xE9compose en couleurs."}),u("p",{class:"note",text:"Puissance de la lumi\xE8re autour du verre"}),a("glassLight",["douce","normale","forte","max"],c=>({douce:"Douce",normale:"Normale",forte:"Forte",max:"Max"})[c]),u("p",{class:"note",text:"Hauteur des boutons (plus ils sont hauts, plus leur ombre est longue)"}),a("ctrlHeight",[3,6,10,15],c=>({3:"Plats",6:"Bas",10:"Hauts",15:"Tr\xE8s hauts"})[c]),u("p",{class:"note",text:"Mode clair : le verre et l\u2019encre"}),a("lightLook",["aquarelle","vitrail","classique"],c=>({aquarelle:"Aquarelle",vitrail:"Vitrail",classique:"Classique"})[c]),u("p",{class:"note",text:"Aquarelle : sous le verre un papier ivoire, l\u2019encre est un pigment qui colore l\u2019eau et fonce l\xE0 o\xF9 les couleurs se m\xEAlent ; la lumi\xE8re autour teinte l\u2019\xE9cran. Vitrail : la couleur de la partie, \xE9clair\xE9e comme un vitrail, une encre lumineuse et une lumi\xE8re color\xE9e autour. Classique : l\u2019aspect d\u2019avant."}),u("div",{class:"list",style:{marginTop:"8px"}},s("glassTilt","Le verre suit l\u2019iPhone","La lumi\xE8re reste fixe dans la pi\xE8ce : quand tu inclines le t\xE9l\xE9phone, les reflets glissent sur le verre comme sur un vrai objet. Tenu normalement, la lumi\xE8re vient d\u2019en haut \xE0 gauche. (iOS demande l\u2019autorisation d\u2019utiliser les mouvements.)",()=>{this.store.settings.glassTilt&&this.ctx.enableTilt&&this.ctx.enableTilt()})),u("p",{class:"note",text:"HDR (\xE9cran HDR : reflets, c\u0153urs d\u2019encre et lumi\xE8re autour du verre plus lumineux que le blanc)"}),a("fluidHdr",["normal","intense","max"],c=>({normal:"Normal",intense:"Intense",max:"Max"})[c]),u("div",{class:"list",style:{marginTop:"8px"}},s("hdrLight","HDR aussi en mode clair","L\u2019\xE9cran autour garde sa couleur exacte. Si la surface sous le verre te para\xEEt plus terne en mode clair, coupe-le : l\u2019iPhone assombrit un peu un calque HDR \xE0 c\xF4t\xE9 des couleurs de la page.")),u("p",{class:"note",text:"Moteur graphique"}),a("fluidEngine",["auto","webgl"],c=>c==="auto"?"Auto (WebGPU)":"Compatibilit\xE9 (WebGL)"),u("p",{class:"note",text:this.ctx.fluidStatus?this.ctx.fluidStatus():""}),u("button",{class:"big accent",style:{marginTop:"6px"},onclick:()=>{this.close(),this.ctx.previewFluid&&this.ctx.previewFluid()}},Q("sparkle"),"Voir l\u2019aper\xE7u")):null,u("div",{class:"sect"},u("h3",{text:"Apparence"}),l,Ye.fluid?u("p",{class:"note",text:"Halloween : chaque bouton devient un objet d\u2019Halloween en 3D, et une troupe de poup\xE9es vit sur le pad. Elles s\u2019\xE9crasent sous le doigt, crient ou chantent avec le son, suivent ton doigt des yeux et dansent parfois. La nuit tombe autour : brume, braises, et sur le pad un cimeti\xE8re sous la lune. Si tu ne touches plus rien, elles finissent par te regarder."}):null,n),u("p",{class:"note",text:"Ces r\xE9glages restent sur cet appareil ; ils ne changent pas tes projets."}));this.open("R\xE9glages",d)}async library(){let e=this.store,t=u("div",{class:"list"}),s=async()=>{let r=await e.listProjects();t.replaceChildren(...r.map(n=>{let l=(n.patterns||[]).reduce((h,f)=>h+Ta(f),0),d=new Date(n.updated||n.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}),c=u("button",{class:"close","aria-label":"Options du projet",onclick:h=>{h.stopPropagation(),this.projectMenu(n,s)}},Q("more"));return u("div",{class:"item",role:"button",tabindex:"0","aria-current":String(n.id===e.project.id),onclick:async()=>{await e.openProject(n.id),this.close();let h=e.project;for(let f of[...h.parts.drum.kit,h.parts.bass.preset,h.parts.lead.preset])await this.ctx.loadBanksFor(we(f));e.syncAll(),this.ctx.toast("Projet ouvert : "+n.name)}},u("span",{class:"tx"},u("b",{text:n.name}),u("small",{text:`${d} \xB7 ${n.tempo} BPM \xB7 ${l} \xE9v\xE9n.`})),c)}))};await s();let a=u("input",{type:"file",accept:".json,.motif,application/json",class:"hidden"});a.addEventListener("change",async()=>{let r=a.files[0];if(r){try{let n=await r.text();if(n.includes('"motif-3-backup"')){let l=await e.restoreBackup(n);this.ctx.toast(`${l} projet(s) restaur\xE9(s)`),await s()}else e.importProjectText(n),this.ctx.toast("Projet import\xE9"),this.close()}catch(n){this.ctx.toast("Import impossible : "+n.message)}a.value=""}});let o=u("div",null,u("div",{class:"grid2",style:{marginBottom:"12px"}},u("button",{class:"big accent",onclick:()=>this.newIdea()},Q("plus"),"Nouvelle"),u("button",{class:"big",onclick:()=>a.click()},Q("download"),"Importer")),t,a,u("div",{class:"sect"},u("h3",{text:"Sauvegarde hors de l\u2019app"}),u("p",{class:"note",text:"Les projets sont enregistr\xE9s automatiquement sur cet appareil. Pour les garder ailleurs (Fichiers, iCloud Drive\u2026), exporte une sauvegarde compl\xE8te."}),u("button",{class:"big",onclick:async()=>{let r=await e.backupAll(),n=new File([r],`MOTIF-sauvegarde-${new Date().toISOString().slice(0,10)}.json`,{type:"application/json"});await ys(n)!=="cancelled"&&this.ctx.toast("Sauvegarde pr\xEAte")}},Q("share"),"Sauvegarder tous les projets")));this.open("Projets",o)}projectMenu(e,t){let s=this.store,a=u("input",{class:"field",value:e.name,"aria-label":"Nom du projet"}),o=u("div",null,u("div",{class:"sect"},u("h3",{text:"Nom"}),a),u("div",{class:"list"},u("button",{class:"item",onclick:async()=>{let r=a.value.trim()||e.name;e.id===s.project.id?s.rename(r):(e.name=r,await je.put("projects",e)),await s.save(),this.library()}},u("span",{class:"tx"},u("b",{text:"Renommer"}))),u("button",{class:"item",onclick:async()=>{e.id!==s.project.id&&await s.openProject(e.id),await s.duplicateProject(),this.ctx.toast("Copie cr\xE9\xE9e"),this.library()}},u("span",{class:"tx"},u("b",{text:"Dupliquer"}))),u("button",{class:"item",onclick:async()=>{let r=new File([JSON.stringify(e,null,1)],`${ts(e.name)}.motif.json`,{type:"application/json"});await ys(r)}},u("span",{class:"tx"},u("b",{text:"Exporter le fichier projet"}))),u("button",{class:"item",onclick:()=>this.confirm(`Supprimer \xAB ${e.name} \xBB ?`,"Le projet sera effac\xE9 de cet appareil. Exporte-le avant si tu veux le garder.","Supprimer",async()=>{await s.deleteProject(e.id),this.ctx.toast("Projet supprim\xE9"),this.library()})},u("span",{class:"tx"},u("b",{text:"Supprimer\u2026",style:{color:"var(--rec)"}})))));this.open(e.name,o)}confirm(e,t,s,a){let o=u("div",null,u("p",{class:"note",text:t}),u("div",{class:"grid2"},u("button",{class:"big",onclick:()=>this.close(),text:"Annuler"}),u("button",{class:"big accent",style:{background:"var(--rec)",color:"#fff"},onclick:async()=>{this.close(!0),await a()},text:s})));this.open(e,o)}newIdea(){let e=this.store,t=u("div",{class:"list"},u("button",{class:"item",onclick:async()=>{await e.newProject(null),await s()}},u("span",{class:"ic"},Q("plus")),u("span",{class:"tx"},u("b",{text:"Id\xE9e vierge"}),u("small",{text:"Kit Studio, 2 mesures"}))),u("button",{class:"item",onclick:async()=>{let r=e.planRandomProject();for(let n of[...r.parts.drum.kit,r.parts.bass.preset,r.parts.lead.preset])await this.ctx.loadBanksFor(we(n));await e.save(),e.loadProject(r),await s(`${we(r.parts.bass.preset).name} \xB7 ${we(r.parts.lead.preset).name} \xB7 touche le d\xE9 pour relancer`)}},u("span",{class:"ic"},Q("dice")),u("span",{class:"tx"},u("b",{text:"Id\xE9e au hasard"}),u("small",{text:"Sons et octaves tir\xE9s au sort, tempo et gamme d\u2019une sc\xE8ne"}))),...Ft.map(r=>u("button",{class:"item",onclick:async()=>{await e.newProject(r.id),await s()}},u("span",{class:"ic"},Q("sparkle")),u("span",{class:"tx"},u("b",{text:r.name}),u("small",{text:`${r.bpm} BPM \xB7 ${St[r.key]} ${Tt(r.scale).name.toLowerCase()} \xB7 sons de la sc\xE8ne`}))))),s=async r=>{this.close(),this.ctx.toast(r||"Nouvelle id\xE9e");let n=e.project;for(let l of[...n.parts.drum.kit,n.parts.bass.preset,n.parts.lead.preset])await this.ctx.loadBanksFor(we(l));e.syncAll()},a=u("div",{class:"list"},...Vi.map(r=>{let n=ct(r);return u("button",{class:"item",onclick:async()=>{await e.save(),e.loadProject(Ki(r)),await s("Exemple charg\xE9 : touche \u25B6")}},u("span",{class:"ic"},Q("play")),u("span",{class:"tx"},u("b",{text:"Exemple "+n.short}),u("small",{text:`Boucle A + variation B \xB7 ${n.bpm} BPM`})))})),o=u("div",{class:"sect"},u("h3",{text:"Tendances 2026 : morceaux jou\xE9s"}),u("p",{class:"note",text:"Vingt morceaux jou\xE9s sur MOTIF : \xE0 la lecture, les doigts fant\xF4mes refont chaque geste, les tweaks bougent, les variations et l\u2019arrangement s\u2019encha\xEEnent. M\xE9lodies originales ; le tempo, la tonalit\xE9, le groove et les sons suivent chaque tendance."}),u("div",{class:"list"},...Na.map(r=>u("button",{class:"item",onclick:async()=>{await e.save(),e.loadProject(Qi(r.id)),await s(`${r.name} \xB7 ${r.trend} \xB7 touche \u25B6`)}},u("span",{class:"ic"},Q("play")),u("span",{class:"tx"},u("b",{text:r.name}),u("small",{text:`${r.trend} \xB7 ${r.tempo} BPM \xB7 ${r.bars} mesures`,style:{whiteSpace:"normal"}}))))));this.open("Nouvelle id\xE9e",u("div",null,u("div",{class:"sect"},u("h3",{text:"Partir de z\xE9ro"}),t),o,u("div",{class:"sect"},u("h3",{text:"Exemples \xE0 \xE9couter et modifier"}),a)))}browser(){let e=this.store,t=e.ui,s=t.part==="drum"?Ht[t.lane]:t.part,a="all",o=u("div",{class:"list"}),r=u("div",{class:"filters"}),n=()=>t.part==="drum"?e.project.parts.drum.kit[t.lane]:e.project.parts[t.part].preset,l=()=>{let f=ht(s).filter(m=>a==="all"||(a==="core"?!m.style:m.style===a));o.replaceChildren(...f.map(m=>{let v=m.style?ct(m.style):null;return u("button",{class:"item","aria-current":String(m.id===n()),onclick:async()=>{await za(m.id),l()}},u("span",{class:"tx"},u("b",{text:m.name}),u("small",{text:m.desc||""})),v?u("span",{class:"tag",text:v.short}):null)}));let p=o.querySelector('[aria-current="true"]');p&&p.scrollIntoView({block:"center"})},d=[["all","Tous"],["core","Base"],...Ft.map(h=>[h.id,h.short])];r.replaceChildren(...d.map(([h,f])=>{let p=u("button",{"aria-pressed":String(a===h)},f);return p.addEventListener("click",()=>{a=h;for(let m of r.children)m.setAttribute("aria-pressed","false");p.setAttribute("aria-pressed","true"),l()}),p}));let c=u("div",null);if(t.part==="drum"){let h=u("div",{class:"seg",style:{marginBottom:"10px"}},...["Kick","Snare","Hat","Perc"].map((p,m)=>u("button",{"aria-pressed":String(t.lane===m),onclick:()=>{t.lane=m,this.browser(),e.changed("preset")}},p))),f=u("div",{class:"filters"},...lt.map(p=>u("button",{onclick:async()=>{for(let m of p.kit)await this.ctx.loadBanksFor(we(m));e.applyKit(p.id,!1),this.ctx.toast("Kit "+p.name),l()}},p.name)));c.append(h,u("div",{class:"sect"},u("h3",{text:"Kits complets"}),f))}c.append(r,o),this.open(t.part==="drum"?"Sons de batterie":t.part==="bass"?"Basses":"M\xE9lodies",c),l()}keyPicker(){let e=this.store,t=u("div",{class:"cards"},...St.map((a,o)=>u("button",{class:"pat",style:{width:"52px",height:"48px",fontSize:"16px"},"aria-pressed":String(e.project.key===o),onclick:()=>{e.set("key",o),this.keyPicker()}},a))),s=u("div",{class:"list"},...Cs.map(a=>u("button",{class:"item","aria-current":String(e.project.scale===a.id),onclick:()=>{e.set("scale",a.id),this.keyPicker()}},u("span",{class:"tx"},u("b",{text:a.name}),u("small",{text:a.iv.map(o=>St[(o+e.project.key)%12]).join(" \xB7 ")})))));this.open("Tonalit\xE9",u("div",null,u("div",{class:"sect"},u("h3",{text:"Tonique"}),t),u("div",{class:"sect"},u("h3",{text:"Gamme (les notes enregistr\xE9es suivent)"}),s)))}clearMenu(){let e=this.store,t=e.ui,s=(r,n,l)=>u("button",{class:"item",onclick:()=>{l(),this.close(),this.ctx.toast("Effac\xE9",{label:"Annuler",fn:()=>e.undo()})}},u("span",{class:"tx"},u("b",{text:r}),u("small",{text:n}))),a=[];t.part==="drum"?(a.push(s(`Effacer ${["le kick","la snare","le hat","la perc"][t.lane]}`,"Seulement cette ligne de batterie",()=>e.clearPart("drum",t.lane))),a.push(s("Effacer toute la batterie","Les quatre lignes",()=>e.clearPart("drum",null)))):a.push(s(`Effacer la ${t.part==="bass"?"basse":"m\xE9lodie"}`,"Toutes les notes de la boucle",()=>e.clearPart(t.part))),a.push(s("Effacer les mouvements","Automation des tweaks de cette partie",()=>{if(t.part==="drum")for(let r=0;r<4;r++)e.clearAuto("d"+r);else e.clearAuto(t.part)})),e.redoStack.length&&a.unshift(u("button",{class:"item",onclick:()=>{e.redo(),this.close(),this.ctx.toast("R\xE9tabli")}},u("span",{class:"tx"},u("b",{text:"R\xE9tablir"}),u("small",{text:"Refaire ce que \u21B6 vient d\u2019annuler"}))));let o=u("div",null,u("p",{class:"note",text:"Pour n\u2019effacer qu\u2019une portion : glisse sur la frise (ou touche une mesure) puis touche la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."}),u("div",{class:"list"},...a));this.open("Effacer",o)}song(){this.store.ui.view="song",document.querySelector('.nav [data-v="song"]').click()}songView(){let e=this.store,t=u("div",{class:"scroll"}),s=[],a=()=>{let r=e.project;t.replaceChildren();let n=new at({label:"Tempo",min:()=>40,max:()=>220,get:()=>e.project.tempo,set:v=>e.set("tempo",v),format:v=>({v:String(v),s:"BPM"}),step:5,onTap:()=>h()}),l=new at({label:"Swing",min:()=>50,max:()=>75,get:()=>e.project.swing,set:v=>e.set("swing",v),format:v=>({v:v===50?"OFF":v+"%",s:"groove"}),step:8}),d=new at({label:"Tonalit\xE9",min:()=>0,max:()=>11,get:()=>e.project.key,set:v=>e.set("key",v),format:v=>({v:St[v],s:Tt(e.project.scale).name}),step:14,onTap:()=>this.keyPicker()}),c=[],h=()=>{let v=performance.now();if(c=c.filter(b=>v-b<2500),c.push(v),c.length>=3){let b=(c[c.length-1]-c[0])/(c.length-1);e.set("tempo",Math.round(6e4/b)),n.render()}else this.ctx.toast("Tape encore pour r\xE9gler le tempo")};t.append(u("div",{class:"sect"},u("h3",{text:"Global"}),u("div",{class:"controls"},n.el,l.el,d.el))),requestAnimationFrame(()=>{n.render(),l.render(),d.render()}),t.append(u("div",{class:"sect"},u("h3",{text:"Longueur de la boucle"}),u("div",{class:"seg"},...fi.map(v=>u("button",{"aria-pressed":String(r.bars===v),onclick:()=>{let b=r.bars;v!==b&&(e.snapshot(),e.set("bars",v),a(),this.ctx.toast(v>b?"Boucle allong\xE9e : le contenu est r\xE9p\xE9t\xE9":"Boucle raccourcie : la fin est coup\xE9e",{label:"Annuler",fn:()=>e.undo()}))}},`${v} mes.`)))));let f=u("div",{class:"cards"},...r.patterns.map((v,b)=>{let y=u("button",{class:"pat","aria-pressed":String(r.current===b),onclick:()=>{e.selectPattern(b),a()}},v.name,u("small",{text:`${Ta(v)} \xE9v.`})),x=0;return y.addEventListener("pointerdown",()=>{x=setTimeout(()=>{r.patterns.length>1&&this.confirm(`Supprimer la variation ${v.name} ?`,"Ses notes et mouvements seront effac\xE9s.","Supprimer",()=>{e.deletePattern(b),a()})},650)}),y.addEventListener("pointerup",()=>clearTimeout(x)),y.addEventListener("pointercancel",()=>clearTimeout(x)),y}),r.patterns.length<8?u("button",{class:"pat add","aria-label":"Nouvelle variation (copie)",onclick:()=>{e.addPattern(r.current),a(),this.ctx.toast("Variation copi\xE9e : modifie-la librement")}},"+"):null);t.append(u("div",{class:"sect"},u("h3",{text:"Variations de la boucle"}),f,u("p",{class:"note",text:"\xAB + \xBB copie la variation en cours. Appui long pour supprimer."})));let p=u("div",{class:"secs"});r.song.sections.forEach((v,b)=>{let y=[["d0","K"],["d1","S"],["d2","H"],["d3","P"],["bass","B"],["lead","L"]].map(([x,S])=>u("button",{"aria-pressed":String(!!(v.mute&&v.mute[x])),"aria-label":"Couper "+x,onclick:()=>{let R=JSON.parse(JSON.stringify(r.song));R.sections[b].mute={...R.sections[b].mute,[x]:!(v.mute&&v.mute[x])},e.setSong(R),a()}},S));p.append(u("div",{class:"sec"+(e.ui.playing&&r.song.enabled&&e.ui.section===b?" playing":"")},u("button",{class:"p","aria-label":"Changer de variation",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song));x.sections[b].p=(v.p+1)%r.patterns.length,e.setSong(x),a()}},r.patterns[v.p]?r.patterns[v.p].name:"?"),u("button",{class:"reps",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song)),S=[1,2,4,8];x.sections[b].reps=S[(S.indexOf(v.reps)+1)%S.length],e.setSong(x),a()}},`\xD7${v.reps}`),u("div",{class:"mutes"},...y),u("button",{class:"x","aria-label":"Retirer la section",onclick:()=>{let x=JSON.parse(JSON.stringify(r.song));x.sections.splice(b,1),x.sections.length||(x.enabled=!1),e.setSong(x),a()}},Q("close"))))});let m=u("button",{class:"big"+(r.song.enabled?" accent":""),onclick:()=>{r.song.sections.length?e.setSong({...r.song,enabled:!r.song.enabled}):e.autoArrange(),a()}},Q("song"),r.song.enabled?"Arrangement activ\xE9 (lecture du morceau)":"Lire l\u2019arrangement");t.append(u("div",{class:"sect"},u("h3",{text:"Arrangement"}),m,u("div",{style:{height:"8px"}}),p,u("div",{class:"grid2",style:{marginTop:"8px"}},u("button",{class:"big",onclick:()=>{let v=JSON.parse(JSON.stringify(r.song));v.sections.push({p:r.current,reps:2,mute:{}}),v.enabled=!0,e.setSong(v),a()}},Q("plus"),"Section"),u("button",{class:"big",onclick:()=>{e.autoArrange(),a(),this.ctx.toast("Arrangement cr\xE9\xE9 \xE0 partir de tes variations")}},Q("sparkle"),"D\xE9velopper")),u("p",{class:"note",text:"Chaque section joue une variation un certain nombre de fois ; touche K S H P B L pour couper une partie dans la section."}))),t.append(u("div",{class:"sect"},u("h3",{text:"Exporter"}),u("button",{class:"big accent",onclick:()=>this.exportSheet()},Q("share"),"WAV, pistes, MIDI, projet")))};a();let o=this.store.on("change",r=>{(r==="section"||r==="song")&&a()});return s.push(o),{el:t,cleanup:()=>s.forEach(r=>r())}}exportSheet(){let e=this.store,t=this.ctx.host(),s=e.project,a=s.song.enabled&&s.song.sections.length,o=u("div",{class:"seg"},...[1,2,4,8].map(b=>u("button",{"aria-pressed":String(b===2),onclick:y=>{for(let x of o.children)x.setAttribute("aria-pressed","false");y.currentTarget.setAttribute("aria-pressed","true"),r=b}},`\xD7${b}`))),r=2,n=u("div",{class:"prog"},u("i")),l=u("p",{class:"note",text:""}),d=u("div",{class:"list"}),c=b=>{n.firstChild.style.width=Math.round(b*100)+"%"},h=(b,y)=>{d.prepend(u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:b.name}),u("small",{text:y})),u("button",{class:"pill on",onclick:async()=>{await ys(b)==="downloaded"&&this.ctx.toast("Fichier t\xE9l\xE9charg\xE9")}},Q("share"),"Partager")))},f=b=>{for(let y of m.querySelectorAll("button"))y.disabled=b},p=async b=>{f(!0),c(0),l.textContent=b?"Rendu des pistes\u2026":"Rendu du mix\u2026";try{let y=await zi(e,t,{stems:b,loops:r,onProgress:c,build:this.ctx.build});if(c(1),b){let x=Gi(y),S=new File([x],`${ts(s.name)}-pistes.zip`,{type:"application/zip"});h(S,`${y.length} fichiers WAV 24 bits \xB7 ${(x.size/1e6).toFixed(1)} Mo`);let R=y.find(B=>B.group===null);R&&await Fa(R.name,new Blob([R.data],{type:"audio/wav"}),{seconds:R.seconds,project:s.name})}else{let x=y[0],S=new Blob([x.data],{type:"audio/wav"}),R=new File([S],x.name,{type:"audio/wav"});h(R,`${x.seconds.toFixed(1)} s \xB7 WAV 24 bits 48 kHz \xB7 cr\xEAte ${(20*Math.log10(x.peak)).toFixed(1)} dBFS`),await Fa(x.name,S,{seconds:x.seconds,project:s.name})}l.textContent="Pr\xEAt. Touche \xAB Partager \xBB pour l\u2019enregistrer dans Fichiers ou l\u2019envoyer."}catch(y){l.textContent="\xC9chec du rendu : "+y.message}f(!1)},m=u("div",{class:"list"},u("button",{class:"item",onclick:()=>p(!1)},u("span",{class:"ic"},Q("speaker")),u("span",{class:"tx"},u("b",{text:"Mix WAV"}),u("small",{text:"Le morceau tel que tu l\u2019entends, effets et mouvements compris"}))),u("button",{class:"item",onclick:()=>p(!0)},u("span",{class:"ic"},Q("mix")),u("span",{class:"tx"},u("b",{text:"Pistes s\xE9par\xE9es (ZIP)"}),u("small",{text:"Kick, snare, hat, perc, basse, m\xE9lodie + mix"}))),u("button",{class:"item",onclick:()=>{h(Ui(e),"Notes de batterie, basse et m\xE9lodie (MIDI type 1)")}},u("span",{class:"ic"},Q("note")),u("span",{class:"tx"},u("b",{text:"MIDI"}),u("small",{text:"Pour continuer dans un logiciel de musique"}))),u("button",{class:"item",onclick:()=>{h(ji(e),"Projet MOTIF modifiable")}},u("span",{class:"ic"},Q("file")),u("span",{class:"tx"},u("b",{text:"Fichier projet"}),u("small",{text:"\xC0 r\xE9importer dans MOTIF"})))),v=u("div",null,a?u("p",{class:"note",text:"L\u2019arrangement est activ\xE9 : le rendu suit les sections."}):u("div",{class:"sect"},u("h3",{text:"R\xE9p\xE9titions de la boucle"}),o),m,u("div",{style:{height:"10px"}}),n,l,d);this.open("Exporter",v)}async player(){let e=u("div",{class:"list"}),t=this.audio||(this.audio=u("audio",{preload:"none"})),s=null,a=async()=>{let n=(await je.all("renders")).map(c=>({...c,kind:"Rendu"})),l=(await je.all("files")).map(c=>({...c,kind:"Import\xE9"})),d=[...n,...l].sort((c,h)=>h.created-c.created);d.length?e.replaceChildren(...d.map(c=>{let h=u("button",{class:"pill","aria-label":"Lire"},Q("play"));h.addEventListener("click",()=>{if(s&&t.dataset.id===c.id&&!t.paused){t.pause();return}s&&URL.revokeObjectURL(s),s=URL.createObjectURL(c.blob),t.src=s,t.dataset.id=c.id,t.play().catch(()=>{})});let f=u("button",{class:"pill","aria-label":"Partager",onclick:()=>ys(new File([c.blob],c.name,{type:c.type||"audio/wav"}))},Q("share")),p=u("button",{class:"pill","aria-label":"Supprimer",onclick:()=>this.confirm("Supprimer ce fichier ?",c.name,"Supprimer",async()=>{await je.del(c.kind==="Rendu"?"renders":"files",c.id),this.player()})},Q("trash"));return u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:c.name}),u("small",{text:`${c.kind} \xB7 ${new Date(c.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})} \xB7 ${((c.size||0)/1e6).toFixed(1)} Mo`})),h,f,p)})):e.replaceChildren(u("p",{class:"note",text:"Aucun rendu pour l\u2019instant. Exporte un mix WAV ou importe un fichier audio."}))},o=u("input",{type:"file",accept:"audio/*",class:"hidden",multiple:!0});o.addEventListener("change",async()=>{for(let n of o.files)await je.put("files",{id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),name:n.name,created:Date.now(),size:n.size,type:n.type,blob:n});o.value="",a()});let r=u("div",{class:"sect"},t);t.controls=!0,t.style.width="100%",await a(),this.open("Lecteur",u("div",null,r,u("button",{class:"big",style:{marginBottom:"10px"},onclick:()=>o.click()},Q("download"),"Importer un fichier audio"),e,o,u("p",{class:"note",text:"Les rendus et fichiers import\xE9s restent sur cet appareil ; rien n\u2019est envoy\xE9 sur internet."})),{onClose:()=>{t.pause()}})}async offline(){let e=await li(),t=navigator.storage&&navigator.storage.persisted?await navigator.storage.persisted().catch(()=>!1):!1,s=u("p",{class:"note",text:window.__motifOffline||"V\xE9rification\u2026"}),a=u("div",{class:"prog"},u("i")),o=u("div",null,u("div",{class:"sect"},u("h3",{text:"Hors ligne"}),s,a,u("button",{class:"big accent",style:{marginTop:"10px"},onclick:async()=>{s.textContent="T\xE9l\xE9chargement de tous les sons\u2026";try{await(window.__motifCacheAll?window.__motifCacheAll(r=>{a.firstChild.style.width=Math.round(r*100)+"%"}):Promise.reject(new Error("service worker indisponible"))),s.textContent="Tout est disponible hors ligne."}catch(r){s.textContent="\xC9chec : "+r.message}}},Q("download"),"Tout rendre disponible hors ligne")),u("div",{class:"sect"},u("h3",{text:"Version"}),u("p",{class:"note",text:`MOTIF 3 \xB7 version ${this.ctx.build}. Les mises \xE0 jour ne touchent jamais \xE0 tes projets (ils sont dans la base locale, s\xE9par\xE9e du cache).`}),u("button",{class:"big",onclick:()=>window.__motifCheckUpdate&&window.__motifCheckUpdate(!0)},"Rechercher une mise \xE0 jour"),u("p",{class:"note"},"Version pr\xE9c\xE9dente pour comparer : ",u("a",{href:"https://motif-studio-iphone.taxulas.chatgpt.site/figure/",target:"_blank",rel:"noopener",style:{color:"var(--accent)"}},"MOTIF Studio 2.4")," (acc\xE8s priv\xE9).")),u("div",{class:"sect"},u("h3",{text:"Stockage"}),u("p",{class:"note",text:`${t?"Stockage persistant accord\xE9.":"Stockage standard (le navigateur peut le lib\xE9rer si l\u2019appareil manque de place ; exporte une sauvegarde de temps en temps)."}${e?` Utilis\xE9 : ${(e.usage/1e6).toFixed(1)} Mo.`:""}`})),u("div",{class:"sect"},u("h3",{text:"Son"}),u("button",{class:"big",onclick:async()=>{this.close();let r=await this.ctx.host().rebuild();this.ctx.toast(r?"Son r\xE9initialis\xE9":"Touchez l\u2019\xE9cran pour r\xE9activer le son")}},Q("speaker"),"R\xE9initialiser le son")));this.open("Hors ligne et mises \xE0 jour",o)}help(){let e=(t,s)=>u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:t}),u("small",{text:s,style:{whiteSpace:"normal"}})));this.open("Les gestes",u("div",{class:"list"},e("Jouer","Touche le pad : le son joue avec le rythme choisi, sans lancer la boucle. Gauche-droite = notes, haut-bas = expression."),e("Enregistrer","REC arme. Le premier toucher lance la boucle et la prise. Rejouer par-dessus remplace ce qui passe sous ton doigt."),e("Rythme et liaisons","Glisse verticalement sur Rythme. Touche-le (ou glisse vers la droite) pour r\xE9gler les liaisons : les notes se lient et glissent."),e("Plage de notes","Glisse la fen\xEAtre pour la d\xE9placer (m\xEAme nombre de notes). Tire une poign\xE9e pour agrandir ou r\xE9duire. Touche ailleurs pour sauter."),e("Plusieurs doigts","Avec plusieurs doigts, l\u2019arp\xE8ge suit l\u2019ordre de pose ; \xAB Doigts \xBB change d\u2019ordre ou joue un accord."),e("Effacer une portion","Glisse sur la frise (ou touche une mesure), puis la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."),e("Changer de son","Glisse le nom ou utilise les fl\xE8ches : la boucle continue avec le nouveau son."),e("Tweaks","Chaque son a ses propres axes. Plusieurs points se bougent \xE0 la fois. Avec REC et lecture, les mouvements s\u2019enregistrent."),e("Batterie","Une colonne par son. Dans une colonne, gauche/milieu/droite = trois variantes, haut-bas = caract\xE8re."),e("Annuler","La fl\xE8che \u21B6 annule la derni\xE8re prise ou modification.")))}async licences(){let e=u("div",null,u("p",{class:"note",text:"Tous les sons synth\xE9tiques sont des cr\xE9ations originales de MOTIF. Les enregistrements int\xE9gr\xE9s sont dans le domaine public (CC0) ; ils ont \xE9t\xE9 convertis en mono, d\xE9coup\xE9s, normalis\xE9s et encod\xE9s en FLAC."}),u("div",{class:"list"},u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"Virtuosity Drums"}),u("small",{text:"Versilian Studios & Karoryfer Lecolds \xB7 CC0 1.0 \xB7 github.com/sfzinstruments/virtuosity_drums"}))),u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"Versilian Community Sample Library"}),u("small",{text:"Versilian Studios \xB7 CC0 1.0 \xB7 github.com/sgossner/VCSL"}))),Ye.fluid?u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"WebGL Fluid Simulation (effets fluides)"}),u("small",{text:"\xA9 2017 Pavel Dobryakov \xB7 licence MIT \xB7 github.com/PavelDoGreat/WebGL-Fluid-Simulation",style:{whiteSpace:"normal"}}))):null),u("p",{class:"note",text:"Le d\xE9tail fichier par fichier (chemin d\u2019origine, commit, transformations, empreinte SHA-256) est dans banks/*/bank.json et SOUNDS.md."}));this.open("Sons et licences",e)}};function Xr(){let i=document.documentElement;return i.hasAttribute("data-halloween")?"halloween":i.dataset.theme==="light"?"light":"dark"}function $r(i){document.documentElement.toggleAttribute("data-halloween",i==="halloween"),document.documentElement.dataset.theme=i==="light"?"light":"dark";try{localStorage.setItem(Ye.storage+".theme",i)}catch{}let e=document.getElementById("themeColor");e&&e.setAttribute("content",i==="light"?"#f3efe6":i==="halloween"?"#0a0612":"#0b0c10"),window.dispatchEvent(new Event("resize")),window.dispatchEvent(new Event("motif:theme"))}function Ji({toast:i,store:e,build:t}){if(window.__motifOffline="Le mode hors ligne s\u2019active apr\xE8s le premier chargement complet.",!("serviceWorker"in navigator)){window.__motifOffline="Ce navigateur ne permet pas le mode hors ligne.";return}let s=location.hostname==="localhost"||location.hostname==="127.0.0.1";if(location.protocol!=="https:"&&!s){window.__motifOffline="Hors ligne indisponible sans HTTPS.";return}if(s&&!/[?&]sw\b/.test(location.search)){navigator.serviceWorker.getRegistrations().then(h=>h.forEach(f=>f.unregister())),window.__motifOffline="Service worker d\xE9sactiv\xE9 en d\xE9veloppement local.";return}let a=null,o=new URL("sw.js",location.href).href,r=()=>!!navigator.serviceWorker.controller&&navigator.serviceWorker.controller.scriptURL===o,n=h=>{i("Mise \xE0 jour disponible",{label:"Installer",fn:async()=>{await e.save(),h.postMessage({type:"skipWaiting"})}})};navigator.serviceWorker.register("sw.js",{scope:"./"}).then(h=>{a=h,h.waiting&&r()&&n(h.waiting),h.addEventListener("updatefound",()=>{let f=h.installing;f&&f.addEventListener("statechange",()=>{f.state==="installed"&&r()&&n(f)})}),c()}).catch(h=>{window.__motifOffline="Service worker non install\xE9 : "+h.message});let l=r(),d=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!l||d||(d=!0,e.save().finally(()=>location.reload()))}),navigator.serviceWorker.addEventListener("message",h=>{let f=h.data||{};f.type==="status"&&(window.__motifOffline=f.text),f.type==="cacheProgress"&&window.__motifCacheProgress&&window.__motifCacheProgress(f.value)});async function c(){let h=await navigator.serviceWorker.ready;h.active&&h.active.postMessage({type:"status"})}window.__motifCheckUpdate=async h=>{if(a)try{await a.update(),h&&!a.waiting&&!a.installing&&i("MOTIF est \xE0 jour")}catch{h&&i("Pas de connexion")}},window.__motifCacheAll=h=>new Promise((f,p)=>{navigator.serviceWorker.ready.then(m=>{let v=new MessageChannel;v.port1.onmessage=b=>{let y=b.data;y.type==="progress"?h&&h(y.value):y.type==="done"?(window.__motifOffline="Tout est disponible hors ligne.",f()):y.type==="error"&&p(new Error(y.message))},m.active.postMessage({type:"cacheAll"},[v.port2])},p)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&window.__motifCheckUpdate(!1)})}var Zi=Math.PI/180,eo={beta:50,gamma:0},Xs=22,$s=6;function ja(i,e){let t=i*Zi,s=e*Zi;return[-Math.sin(s)*Math.cos(t),Math.sin(t),Math.cos(s)*Math.cos(t)]}function Ga(i){let e=[i[0]-.62,i[1],Math.max(.18,i[2])],t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}var Ua=ja(eo.beta,eo.gamma),ss=Ga(Ua);function to(i){return[(i[0]-Ua[0])*1.4,(i[1]-Ua[1])*1.4]}var Fe=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Qr=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  float offset = 1.33333333;
  vL = vUv - texelSize * offset; vR = vUv + texelSize * offset;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Jr=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
  sum += texture2D(uTexture, vL) * 0.35294117;
  sum += texture2D(uTexture, vR) * 0.35294117;
  gl_FragColor = sum;
}`,Zr=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture;
void main () { gl_FragColor = texture2D(uTexture, vUv); }`,en=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`,Qs=`
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
#endif`,tn=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; uniform sampler2D uTexture; uniform vec3 curve; uniform float threshold;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
  float br = max(c.r, max(c.g, c.b));
  float rq = clamp(br - curve.x, 0.0, curve.y);
  rq = curve.z * rq * rq;
  c *= max(rq, br - threshold) / max(br, 0.0001);
  gl_FragColor = vec4(c, 0.0);
}`,sn=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25;
}`,an=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture; uniform float intensity;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25 * intensity;
}`,on=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uTexture;
void main () {
  vec4 c = texture2D(uTexture, vUv);
  float br = max(c.r, max(c.g, c.b));
  c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
  gl_FragColor = c;
}`,rn=`
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
}`,nn=`
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
}`,ln=`
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
}`,cn=`
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
}`,hn=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,dn=`
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
}`,un=`
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
}`,pn=`
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
}`,so={optique:{id:0,bevel:20,thick:26,p:2.2,disp:.012,depth:1},liquide:{id:1,bevel:30,thick:34,p:2.6,disp:.03,depth:1},depoli:{id:2,bevel:26,thick:26,p:2,disp:.008,depth:1},cristal:{id:3,bevel:20,thick:12,p:1,disp:.045,depth:3},prisme:{id:4,bevel:34,thick:28,p:3.2,disp:.015,depth:.9}},Js=i=>so[i&&i.glassLook||"optique"]||so.optique,Wa={SIM_RESOLUTION:128,DYE_RESOLUTION:512,DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,PRESSURE:.8,PRESSURE_ITERATIONS:16,CURL:24,SPLAT_RADIUS:.22,SPLAT_FORCE:5200,SHADING:!0,BLOOM:!0,BLOOM_ITERATIONS:7,BLOOM_RESOLUTION:192,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:128,SUNRAYS_WEIGHT:.8,IDLE_MS:4500},as=class{constructor(e={}){this.cfg={...Wa,...e},this.canvas=document.createElement("canvas"),this.canvas.className="fluid",this.canvas.setAttribute("aria-hidden","true"),this.ok=!1,this.raf=0,this.last=0,this.lastInput=0,this.queue=[],this.gain=1,this.boost=0,this.slow=0,this.ema=16,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.ok=!1,this.stop()}),this.canvas.addEventListener("webglcontextrestored",()=>this.init()),this.init()}init(){let e={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!0,powerPreference:"low-power"},t=this.canvas.getContext("webgl2",e),s=!!t;if(t||(t=this.canvas.getContext("webgl",e)),!t)return;this.gl=t;try{"drawingBufferColorSpace"in t&&(t.drawingBufferColorSpace="display-p3")}catch{}this.p3=t.drawingBufferColorSpace==="display-p3";let a,o;if(s)t.getExtension("EXT_color_buffer_float"),o=!0;else if(a=t.getExtension("OES_texture_half_float"),o=t.getExtension("OES_texture_half_float_linear"),!a)return;let r=s?t.HALF_FLOAT:a.HALF_FLOAT_OES,n=(f,p)=>this.supports(f,p,r)?{internal:f,format:p}:null,l,d,c;if(s?(l=n(t.RGBA16F,t.RGBA),d=n(t.RG16F,t.RG)||l,c=n(t.R16F,t.RED)||d):l=d=c=n(t.RGBA,t.RGBA),!l)return;this.ext={type:r,rgba:l,rg:d,r:c,linear:!!o},o||(this.cfg.SHADING=!1,this.cfg.BLOOM=!1,this.cfg.SUNRAYS=!1);let h=(f,p,m)=>this.program(f,p,m);this.p={blur:h(Qr,Jr),copy:h(Fe,Zr),clear:h(Fe,en),bloomPre:h(Fe,tn),bloomBlur:h(Fe,sn),bloomFinal:h(Fe,an),sunMask:h(Fe,on),sun:h(Fe,rn),splat:h(Fe,nn),advect:h(Fe,ln,o?[]:["MANUAL_FILTERING"]),div:h(Fe,cn),curl:h(Fe,hn),vort:h(Fe,dn),pressure:h(Fe,un),grad:h(Fe,pn)},this.setDisplay(),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),this.dither=this.noiseTexture(64),this.keys=null,this.scene=null,this.keyTex=null,this.resetLight(),this.maskAll=this.maskTexture(null,1,1),this.maskSim=this.maskDye=this.maskAll,this.dye=null,this.velocity=null,this.ok=!0}supports(e,t,s){let a=this.gl,o=a.createTexture();a.bindTexture(a.TEXTURE_2D,o),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texImage2D(a.TEXTURE_2D,0,e,4,4,0,t,s,null);let r=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,r),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,o,0);let n=a.checkFramebufferStatus(a.FRAMEBUFFER)===a.FRAMEBUFFER_COMPLETE;return a.deleteFramebuffer(r),a.deleteTexture(o),n}shader(e,t,s){let a=this.gl,o=a.createShader(e);if(a.shaderSource(o,(s||[]).map(r=>`#define ${r}
`).join("")+t),a.compileShader(o),!a.getShaderParameter(o,a.COMPILE_STATUS)){let r=a.getShaderInfoLog(o);console.warn(r),(this.shaderErrors||(this.shaderErrors=[])).push(r)}return o}program(e,t,s){let a=this.gl,o=a.createProgram();a.attachShader(o,this.shader(a.VERTEX_SHADER,e)),a.attachShader(o,this.shader(a.FRAGMENT_SHADER,t,s)),a.bindAttribLocation(o,0,"aPosition"),a.linkProgram(o),a.getProgramParameter(o,a.LINK_STATUS)||console.warn(a.getProgramInfoLog(o));let r={},n=a.getProgramParameter(o,a.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let d=a.getActiveUniform(o,l).name;r[d]=a.getUniformLocation(o,d)}return{p:o,u:r,bind:()=>a.useProgram(o)}}setDisplay(){let e=[];this.cfg.SHADING&&e.push("SHADING"),this.cfg.BLOOM&&e.push("BLOOM"),this.cfg.SUNRAYS&&e.push("SUNRAYS"),this.p.display=this.program(Fe,Qs,e),this.p.light=this.program(Fe,Qs,[...e,"LIGHT_PASS"]),this.p.sources=this.program(Fe,Qs,[...e,"SOURCES_PASS"]),this.p.haze=this.program(Fe,Qs,[...e,"HAZE_PASS"])}noiseTexture(e){let t=this.gl,s=new Uint8Array(e*e*3),a=1234567;for(let r=0;r<s.length;r++)a=a*1103515245+12345&2147483647,s[r]=a>>23;let o=t.createTexture();return t.bindTexture(t.TEXTURE_2D,o),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGB,e,e,0,t.RGB,t.UNSIGNED_BYTE,s),{width:e,height:e,attach:r=>(t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,o),r)}}maskTexture(e,t,s){let a=this.gl,o=vs(this.maskCanvas||(this.maskCanvas=document.createElement("canvas")),e,t,s),r=a.createTexture();return a.bindTexture(a.TEXTURE_2D,r),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,o),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),{tex:r,attach:n=>(a.activeTexture(a.TEXTURE0+n),a.bindTexture(a.TEXTURE_2D,r),n)}}setKeys(e,t){!this.ok||t===this.keySig||(this.keySig=t,this.keys=e,this.rebuildMasks(),this.clear())}rebuildMasks(){let e=this.gl;for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&e.deleteTexture(t.tex);if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}this.maskSim=this.maskTexture(this.keys,this.velocity.width,this.velocity.height),this.maskDye=this.maskTexture(this.keys,this.dye.width,this.dye.height)}setScene(e){if(!this.ok)return;let t=this.scene&&this.scene.sig===e.sig;this.scene=e,this.margin=e.glass?this.marginTest||4e3:0,t||(this.keyTexSig=null,this.requestRender())}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,s=this.hostH,a=e.sig+"|"+t+"x"+s;if(this.keyTexSig===a)return;let o=this.gl;this.keyTex&&o.deleteTexture(this.keyTex.tex);let r=js(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,s),n=o.createTexture();o.bindTexture(o.TEXTURE_2D,n),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!0),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,r),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),this.keyTex={tex:n,attach:l=>(o.activeTexture(o.TEXTURE0+l),o.bindTexture(o.TEXTURE_2D,n),l)},this.keyTexSig=a}resetLight(){this.lightBase=ss.slice(),this.light=ss.slice(),this.lightTo=ss.slice(),this.slide=[0,0],this.slideTo=[0,0],this.up=null,this.touchSlots=[],this.gelOn=!0,this.meters=new Float32Array(8),this.margin=0,this.off=[0,0],this.dpr=1,this.hostW=0,this.hostH=0,this.srcFbo=null,this.lightFbo=null,this.hazeFbo=null,this.keyLitTex=null}setLight(e,t){let s=this.lightBase;this.lightTo=[s[0]*.75+(e-.5)*.45,s[1]*.75+(.5-t)*.45,s[2]]}setTilt(e,t){let s=ja(t,e),a=this.up;this.up=a?a.map((o,r)=>o+(s[r]-o)*.25):s,this.lightBase=Ga(this.up),this.slideTo=to(this.up),this.lightTo=this.lightBase.slice(),(!a||Math.abs(a[0]-this.up[0])+Math.abs(a[1]-this.up[1])+Math.abs(a[2]-this.up[2])>.002)&&this.wake()}aim(e){this.lightTo=e.slice(),this.wake()}aimReset(){this.lightTo=this.lightBase.slice(),this.wake()}resetTilt(){this.up=null,this.lightBase=ss.slice(),this.lightTo=ss.slice(),this.slideTo=[0,0],this.wake()}screenColor(e){if(e=e||[.043,.047,.063],!this.p3)return e;let t=e.map(a=>a<=.04045?a/12.92:((a+.055)/1.055)**2.4);return[.8225*t[0]+.1774*t[1],.0332*t[0]+.9669*t[1],.0171*t[0]+.0724*t[1]+.9108*t[2]].map(a=>a<=.0031308?a*12.92:1.055*a**(1/2.4)-.055)}stepLight(){for(let e=0;e<3;e++)this.light[e]+=(this.lightTo[e]-this.light[e])*.12;for(let e=0;e<2;e++)this.slide[e]+=(this.slideTo[e]-this.slide[e])*.12}setObstacles(e){this.obstacles=(e||[]).slice(0,16),this.wake()}setControlHeight(e){this.ctrlH=e,this.wake()}obstacleData(e){let t=this.dpr||1,s=this.hostH,a=new Float32Array(64),o=new Float32Array(16),r=this.obstacles||[];return r.forEach((n,l)=>{a.set(e?[n[0]*t,s-n[3]*t,n[2]*t,s-n[1]*t]:[n[0]*t,n[1]*t,n[2]*t,n[3]*t],l*4),o[l]=(n[4]||0)*t}),{rects:a,radii:o,n:r.length,lightH:Xs*t,ctrlH:(this.ctrlH||$s)*t}}setKeyLights(e){let t=this.keyLit||(this.keyLit=new Uint8Array(256)),s=!1;for(let a=0;a<64;a++){let o=Math.round(Math.max(0,Math.min(1,e&&e[a]||0))*255);t[a*4]!==o&&(t[a*4]=o,s=!0)}s&&(this.keyLitDirty=!0,this.wake())}ensureKeyLit(){let e=this.gl;if(this.keyLit||(this.keyLit=new Uint8Array(256)),!this.keyLitTex){let t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);for(let[s,a]of[[e.TEXTURE_MIN_FILTER,e.NEAREST],[e.TEXTURE_MAG_FILTER,e.NEAREST],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,s,a);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,64,1,0,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitTex={tex:t,attach:s=>(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,t),s)},this.keyLitDirty=!1}this.keyLitDirty&&(e.bindTexture(e.TEXTURE_2D,this.keyLitTex.tex),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,1,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitDirty=!1)}setMeters(e){for(let t=0;t<8;t++)this.meters[t]=e[t]||0;this.wake()}slabData(e){let t=this.scene||{},s=(t.slabs||[[0,0,1,1]]).slice(0,8),a=new Float32Array(32),o=new Float32Array(32);return s.forEach((r,n)=>a.set(e?[r[0],1-r[3],r[2],1-r[1]]:r,n*4)),(t.fills||[]).slice(0,8).forEach((r,n)=>o.set(r,n*4)),{slabs:a,fills:o,n:s.length}}press(e,t,s,a){let o=performance.now(),r=this.touchSlots.find(n=>n.id===e&&!n.up);a==="down"?(this.touchSlots=this.touchSlots.filter(n=>!n.up||o-n.up<450).slice(-3),this.touchSlots.push({id:e,x:t,y:s,down:o,up:0}),Js(this.scene).id===1&&this.setLight(t,s)):r&&(r.x=t,r.y=s,(a==="up"||a==="cancel")&&(r.up=o,this.lightTo=this.lightBase.slice())),this.wake()}touchUniforms(e){let t=performance.now(),s=new Float32Array(16);return this.touchSlots=this.touchSlots.filter(a=>!a.up||t-a.up<450),this.touchSlots.slice(-4).forEach((a,o)=>{let r=a.up?Math.max(0,1-(t-a.up)/450):Math.min(1,(t-a.down)/90);s.set([a.x,e?1-a.y:a.y,(t-a.down)/1e3,r],o*4)}),s}keyAt(e,t){if(!this.keys)return 0;for(let s=this.keys.length-1;s>=0;s--){let a=this.keys[s];if(e>=a.x0&&e<a.x1&&t>=a.y0&&t<a.y1)return s+1}return 0}fbo(e,t,s,a){let o=this.gl;o.activeTexture(o.TEXTURE0);let r=o.createTexture();o.bindTexture(o.TEXTURE_2D,r),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texImage2D(o.TEXTURE_2D,0,s.internal,e,t,0,s.format,this.ext.type,null);let n=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,n),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,r,0),o.viewport(0,0,e,t),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),{texture:r,fbo:n,width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,attach:l=>(o.activeTexture(o.TEXTURE0+l),o.bindTexture(o.TEXTURE_2D,r),l)}}double(e,t,s,a){let o=this.fbo(e,t,s,a),r=this.fbo(e,t,s,a);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return o},set read(n){o=n},get write(){return r},set write(n){r=n},swap(){let n=o;o=r,r=n}}}resizeDouble(e,t,s,a,o){if(e.width===t&&e.height===s)return e;let r=this.fbo(t,s,a,o);return this.p.copy.bind(),this.gl.uniform1i(this.p.copy.u.uTexture,e.read.attach(0)),this.blit(r),e.read=r,e.write=this.fbo(t,s,a,o),e.width=t,e.height=s,e.texelSizeX=1/t,e.texelSizeY=1/s,e}res(e){let t=this.hostW/this.hostH;t<1&&(t=1/t);let s=Math.round(e),a=Math.round(e*t);return this.hostW>this.hostH?{width:a,height:s}:{width:s,height:a}}initBuffers(){let e=this.gl,t=this.ext,s=this.cfg,a=this.res(s.SIM_RESOLUTION),o=this.res(s.DYE_RESOLUTION),r=t.linear?e.LINEAR:e.NEAREST;e.disable(e.BLEND),this.dye=this.dye?this.resizeDouble(this.dye,o.width,o.height,t.rgba,r):this.double(o.width,o.height,t.rgba,r),this.velocity=this.velocity?this.resizeDouble(this.velocity,a.width,a.height,t.rg,r):this.double(a.width,a.height,t.rg,r),this.divergence=this.fbo(a.width,a.height,t.r,e.NEAREST),this.curl=this.fbo(a.width,a.height,t.r,e.NEAREST),this.pressure=this.double(a.width,a.height,t.r,e.NEAREST);let n=this.res(s.BLOOM_RESOLUTION);this.bloom=this.fbo(n.width,n.height,t.rgba,r),this.bloomFbos=[];for(let d=0;d<s.BLOOM_ITERATIONS;d++){let c=n.width>>d+1,h=n.height>>d+1;if(c<2||h<2)break;this.bloomFbos.push(this.fbo(c,h,t.rgba,r))}let l=this.res(s.SUNRAYS_RESOLUTION);this.sunrays=this.fbo(l.width,l.height,t.r,r),this.sunraysTemp=this.fbo(l.width,l.height,t.r,r),this.rebuildMasks()}blit(e){let t=this.gl;e?(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)):(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}attach(e){this.ok&&(this.host!==e&&(this.host=e,this.hostW=0,this.ro&&this.ro.disconnect(),this.ro=null),this.canvas.parentNode!==e&&e.insertBefore(this.canvas,e.firstChild),this.ro||(this.ro=new ResizeObserver(()=>this.requestRender()),this.ro.observe(e)),this.requestRender())}detach(){this.stop(),this.canvas.remove(),this.ro&&this.ro.disconnect(),this.ro=null,this.host=null}fit(){let e=this.host;if(!e)return;let t=Math.min(window.devicePixelRatio||1,2),s=e.getBoundingClientRect(),a=(e.closest(".app")||document.documentElement).getBoundingClientRect(),o=this.margin||0,r=x=>Math.round(Math.max(0,Math.min(o,x))),n=r(s.left-a.left),l=r(s.top-a.top),d=r(a.right-s.right),c=r(a.bottom-s.bottom),h=s.width+n+d,f=s.height+l+c,p=`${n},${l},${h},${f}`;p!==this.placeKey&&(this.placeKey=p,Object.assign(this.canvas.style,{left:-n+"px",top:-l+"px",width:h+"px",height:f+"px"}));let m=Math.max(2,Math.round(h*t)),v=Math.max(2,Math.round(f*t));(this.canvas.width!==m||this.canvas.height!==v)&&(this.canvas.width=m,this.canvas.height=v),this.dpr=t,this.off=[Math.round(n*t),Math.round(l*t)];let b=Math.max(2,Math.round(s.width*t)),y=Math.max(2,Math.round(s.height*t));(this.hostW!==b||this.hostH!==y||!this.dye)&&(this.hostW=b,this.hostH=y,this.initBuffers())}get aspect(){return this.hostW/this.hostH}splat(e,t,s,a,o,r=1,n=!1){this.ok&&(this.queue.push([e,t,s,a,o,r,n]),this.queue.length>64&&this.queue.shift(),this.wake())}burst(e,t,s,a=1,o=6,r=.8){let n=Math.random()*Math.PI*2;for(let l=0;l<o;l++){let d=n+l/o*Math.PI*2;this.splat(e+Math.cos(d)*.012,t+Math.sin(d)*.012,Math.cos(d)*.05*a,Math.sin(d)*.05*a,l===0?s:vn(s,.35),r)}}pulse(e){this.boost=Math.max(this.boost,e)}push(e,t,s,a,o=3){this.splat(e,t,s,a,{r:0,g:0,b:0},o,!0)}setStyle(e){let t=this.cfg,s={b:t.BLOOM,s:t.SUNRAYS};Object.assign(t,e),t.BLOOM=s.b,t.SUNRAYS=s.s}wake(){this.lastInput=performance.now(),!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}keepAwake(){!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}stop(){this.raf&&cancelAnimationFrame(this.raf),this.raf=0}clear(){if(!this.ok||!this.dye)return;let e=this.gl;e.clearColor(0,0,0,0);for(let t of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.bloom,this.sunrays])e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.viewport(0,0,t.width,t.height),e.clear(e.COLOR_BUFFER_BIT);this.requestRender()}requestRender(){this.raf||this.pending||!this.ok||!this.canvas.isConnected||(this.pending=requestAnimationFrame(()=>{this.pending=0,!(this.raf||!this.canvas.isConnected)&&(this.fit(),this.render(!0))}))}frame(e){if(this.raf=0,!this.ok||!this.canvas.isConnected)return;let t=Math.min((e-this.last)/1e3,1/60);this.last=e,this.lastFrameAt&&e-this.lastInput<1500&&(this.ema+=(Math.min(200,e-this.lastFrameAt)-this.ema)*.1,this.slow=this.ema>45?this.slow+1:0),this.lastFrameAt=e,this.slow>60&&this.degrade(),this.fit();let s=e-this.lastInput<this.cfg.IDLE_MS;s?(this.rested=!1,this.inkOn!==!1?(this.applyInputs(),this.step(t),this.render()):(this.queue=[],this.render(!0))):this.stage&&(this.rested||(this.clear(),this.rested=!0),(this.restTick=(this.restTick||0)+1)%2===0&&this.render(!0)),this.boost*=.9,s||this.stage?this.raf=requestAnimationFrame(a=>this.frame(a)):this.clear()}degrade(){this.slow=0;let e=this.cfg;if(e.SUNRAYS)e.SUNRAYS=!1;else if(e.BLOOM)e.BLOOM=!1;else if(e.SIM_RESOLUTION>64)e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.dye=null,this.velocity=null,this.hostW=0;else return;this.setDisplay()}applyInputs(){let e=this.queue;this.queue=[];for(let[t,s,a,o,r,n,l]of e)this.splatNow(t,1-s,a*this.cfg.SPLAT_FORCE*fn(this.aspect),-o*this.cfg.SPLAT_FORCE*mn(this.aspect),r,n,l?0:this.keyAt(t,s))}splatNow(e,t,s,a,o,r,n){let l=this.gl,d=this.p.splat,c=this.cfg.SPLAT_RADIUS*r/100;this.aspect>1&&(c*=this.aspect),d.bind(),l.uniform1i(d.u.uTarget,this.velocity.read.attach(0)),l.uniform1f(d.u.aspectRatio,this.aspect),l.uniform2f(d.u.point,e,t),l.uniform3f(d.u.color,s,a,0),l.uniform1f(d.u.radius,c),l.uniform1f(d.u.targetId,n?n/255:0),l.uniform1i(d.u.uMask,this.maskSim.attach(1)),this.blit(this.velocity.write),this.velocity.swap(),l.uniform1i(d.u.uMask,this.maskDye.attach(1)),l.uniform1i(d.u.uTarget,this.dye.read.attach(0)),l.uniform3f(d.u.color,o.r*this.gain,o.g*this.gain,o.b*this.gain),this.blit(this.dye.write),this.dye.swap()}step(e){let t=this.gl,s=this.p,a=this.velocity,o=this.cfg;t.disable(t.BLEND),s.curl.bind(),t.uniform2f(s.curl.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.curl.u.uVelocity,a.read.attach(0)),this.blit(this.curl),s.vort.bind(),t.uniform2f(s.vort.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.vort.u.uVelocity,a.read.attach(0)),t.uniform1i(s.vort.u.uCurl,this.curl.attach(1)),t.uniform1f(s.vort.u.curl,o.CURL),t.uniform1f(s.vort.u.dt,e),this.blit(a.write),a.swap(),s.div.bind(),t.uniform2f(s.div.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.div.u.uVelocity,a.read.attach(0)),t.uniform1i(s.div.u.uMask,this.maskSim.attach(2)),this.blit(this.divergence),s.clear.bind(),t.uniform1i(s.clear.u.uTexture,this.pressure.read.attach(0)),t.uniform1f(s.clear.u.value,o.PRESSURE),this.blit(this.pressure.write),this.pressure.swap(),s.pressure.bind(),t.uniform2f(s.pressure.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.pressure.u.uDivergence,this.divergence.attach(0)),t.uniform1i(s.pressure.u.uMask,this.maskSim.attach(2));for(let n=0;n<o.PRESSURE_ITERATIONS;n++)t.uniform1i(s.pressure.u.uPressure,this.pressure.read.attach(1)),this.blit(this.pressure.write),this.pressure.swap();s.grad.bind(),t.uniform2f(s.grad.u.texelSize,a.texelSizeX,a.texelSizeY),t.uniform1i(s.grad.u.uPressure,this.pressure.read.attach(0)),t.uniform1i(s.grad.u.uVelocity,a.read.attach(1)),t.uniform1i(s.grad.u.uMask,this.maskSim.attach(2)),this.blit(a.write),a.swap(),s.advect.bind(),t.uniform2f(s.advect.u.texelSize,a.texelSizeX,a.texelSizeY),this.ext.linear||t.uniform2f(s.advect.u.dyeTexelSize,a.texelSizeX,a.texelSizeY);let r=a.read.attach(0);t.uniform1i(s.advect.u.uVelocity,r),t.uniform1i(s.advect.u.uSource,r),t.uniform1i(s.advect.u.uMask,this.maskSim.attach(2)),t.uniform1f(s.advect.u.dt,e),t.uniform1f(s.advect.u.dissipation,o.VELOCITY_DISSIPATION),this.blit(a.write),a.swap(),this.ext.linear||t.uniform2f(s.advect.u.dyeTexelSize,this.dye.texelSizeX,this.dye.texelSizeY),t.uniform1i(s.advect.u.uVelocity,a.read.attach(0)),t.uniform1i(s.advect.u.uSource,this.dye.read.attach(1)),t.uniform1i(s.advect.u.uMask,this.maskDye.attach(2)),t.uniform1f(s.advect.u.dissipation,o.DENSITY_DISSIPATION),this.blit(this.dye.write),this.dye.swap()}render(e){let t=this.gl,s=this.cfg,a=this.p;if(!this.dye)return;e||(s.BLOOM&&this.applyBloom(),s.SUNRAYS&&(this.applySunrays(),this.blur(this.sunrays,this.sunraysTemp,1))),this.ensureKeyTex();let o=this.scene||{};this.stepLight(),t.disable(t.BLEND);let r=t.drawingBufferWidth,n=t.drawingBufferHeight;if(o.glass){let l=this.srcFbo||(this.srcFbo=this.fbo(8,1,this.ext.rgba,t.NEAREST));this.useComposite(a.sources,o),this.blit(l);let d=this.ensureHazeFbo();this.useComposite(a.haze,o),t.uniform2f(a.haze.u.hazeRes,d.width,d.height),this.blit(d);let c=this.ensureLightFbo(r,n);this.useComposite(a.light,o),t.uniform2f(a.light.u.lightScale,r/c.width,n/c.height),a.light.u.uSources&&t.uniform1i(a.light.u.uSources,l.attach(7)),this.blit(c)}this.useComposite(a.display,o),o.glass&&(t.uniform1i(a.display.u.uLight,this.lightFbo.attach(5)),t.uniform2f(a.display.u.canvasRes,r,n),t.uniform2f(a.display.u.lightScale,r/this.lightFbo.width,n/this.lightFbo.height),a.display.u.uHaze&&(t.uniform1i(a.display.u.uHaze,this.hazeFbo.attach(7)),t.uniform2f(a.display.u.hazeRes,this.hazeFbo.width,this.hazeFbo.height))),this.blit(null)}ensureHazeFbo(){let e=this.gl,t=this.res(16),s=this.hazeFbo;return s&&s.width===t.width&&s.height===t.height?s:(s&&(e.deleteTexture(s.texture),e.deleteFramebuffer(s.fbo)),this.hazeFbo=this.fbo(t.width,t.height,this.ext.rgba,this.ext.linear?e.LINEAR:e.NEAREST),this.hazeFbo)}ensureLightFbo(e,t){let s=this.gl,a=Math.max(2,Math.ceil(e/2)),o=Math.max(2,Math.ceil(t/2)),r=this.lightFbo;return r&&r.width===a&&r.height===o?r:(r&&(s.deleteTexture(r.texture),s.deleteFramebuffer(r.fbo)),this.lightFbo=this.fbo(a,o,this.ext.rgba,this.ext.linear?s.LINEAR:s.NEAREST),this.lightFbo)}useComposite(e,t){let s=this.gl,a=this.cfg,o=e.u,r=s.drawingBufferHeight,n=this.hostW,l=this.hostH,d=this.dpr||1;e.bind(),s.uniform2f(o.texelSize,1/n,1/l),s.uniform2f(o.res,n,l),s.uniform2f(o.off,this.off[0],r-this.off[1]-l),s.uniform1f(o.dpr,d),s.uniform1i(o.uTexture,this.dye.read.attach(0)),s.uniform1f(o.gain,1),a.BLOOM&&(s.uniform1i(o.uBloom,this.bloom.attach(1)),s.uniform1i(o.uDithering,this.dither.attach(2)),s.uniform2f(o.ditherScale,n/this.dither.width,l/this.dither.height)),a.SUNRAYS&&s.uniform1i(o.uSunrays,this.sunrays.attach(3));let c=(y,x)=>o[y]&&s.uniform3f(o[y],x[0],x[1],x[2]);c("bgTop",t.bgTop||[.1,.11,.14]),c("bgBot",t.bgBot||[.07,.075,.094]),c("accent",t.accent||[.8,.9,.3]),c("surf",t.surf||[.086,.09,.114]),c("appBg",this.screenColor(t.appBg));let h=t.sep||[1,1,1,.06];s.uniform4f(o.sep,h[0],h[1],h[2],h[3]),s.uniform1f(o.sepPx,(t.sepPx||1)*d),o["kinds[0]"]&&s.uniform4fv(o["kinds[0]"],new Float32Array((t.kinds||Array(6).fill([0,0,0,0])).flat())),s.uniform1f(o.useKeys,t.keys?1:0),s.uniform1f(o.grid,t.kind==="xy"?1:0),s.uniform1f(o.darkTheme,t.dark===!1?0:1),this.keyTex&&t.keys&&s.uniform1i(o.uKeys,this.keyTex.attach(4)),s.uniform1f(o.glass,t.glass?1:0),s.uniform1f(o.radius,(t.radius||20)*d);let f=Js(t);s.uniform1f(o.bevel,f.bevel*d),s.uniform1f(o.thickness,f.thick*d),o.look&&s.uniform4f(o.look,f.id,f.p,f.disp,f.depth);let p=this.stage||[0,0,0,0];o.stage&&s.uniform4f(o.stage,p[0],p[1],p[2],p[3]),s.uniform1f(o.gel,this.gelOn===!1?0:t.gel??1);let m=this.touchUniforms(!0);(o["touches[0]"]||o.touches)&&s.uniform4fv(o["touches[0]"]||o.touches,m);let v=this.slabData(!0);o["slabs[0]"]&&s.uniform4fv(o["slabs[0]"],v.slabs),o["fills[0]"]&&s.uniform4fv(o["fills[0]"],v.fills),o["meters[0]"]&&s.uniform1fv(o["meters[0]"],this.meters),s.uniform1f(o.nSlabs,v.n),s.uniform1f(o.mode,t.kind==="mix"?1:0),s.uniform2f(o.lightDir,this.light[0],this.light[1]),s.uniform1f(o.lightZ,this.light[2]),s.uniform2f(o.slide,this.slide[0],this.slide[1]),s.uniform1f(o.spillK,t.spill||0),s.uniform1f(o.shadowK,t.shadow||0),s.uniform1f(o.style,t.style||0);let b=t.keyGlow||[1,1,1,0];if(o.keyGlow&&s.uniform4f(o.keyGlow,b[0],b[1],b[2],b[3]),this.ensureKeyLit(),o.uKeyLit&&s.uniform1i(o.uKeyLit,this.keyLitTex.attach(6)),o["obst[0]"]){let y=this.obstacleData(!0);s.uniform4fv(o["obst[0]"],y.rects),s.uniform1f(o.nObst,y.n),s.uniform2f(o.obstH,y.lightH,y.ctrlH),o["obstR[0]"]&&s.uniform1fv(o["obstR[0]"],y.radii)}s.uniform1f(o.pulse,Math.min(1,this.boost)),s.uniform1f(o.hdr,1)}applyBloom(){let e=this.gl,t=this.cfg,s=this.p;if(this.bloomFbos.length<2)return;let a=this.bloom;e.disable(e.BLEND),s.bloomPre.bind();let o=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;e.uniform3f(s.bloomPre.u.curve,t.BLOOM_THRESHOLD-o,o*2,.25/o),e.uniform1f(s.bloomPre.u.threshold,t.BLOOM_THRESHOLD),e.uniform1i(s.bloomPre.u.uTexture,this.dye.read.attach(0)),this.blit(a),s.bloomBlur.bind();for(let r of this.bloomFbos)e.uniform2f(s.bloomBlur.u.texelSize,a.texelSizeX,a.texelSizeY),e.uniform1i(s.bloomBlur.u.uTexture,a.attach(0)),this.blit(r),a=r;e.blendFunc(e.ONE,e.ONE),e.enable(e.BLEND);for(let r=this.bloomFbos.length-2;r>=0;r--){let n=this.bloomFbos[r];e.uniform2f(s.bloomBlur.u.texelSize,a.texelSizeX,a.texelSizeY),e.uniform1i(s.bloomBlur.u.uTexture,a.attach(0)),this.blit(n),a=n}e.disable(e.BLEND),s.bloomFinal.bind(),e.uniform2f(s.bloomFinal.u.texelSize,a.texelSizeX,a.texelSizeY),e.uniform1i(s.bloomFinal.u.uTexture,a.attach(0)),e.uniform1f(s.bloomFinal.u.intensity,t.BLOOM_INTENSITY*(1+this.boost*.8)),this.blit(this.bloom)}applySunrays(){let e=this.gl,t=this.p;e.disable(e.BLEND),t.sunMask.bind(),e.uniform1i(t.sunMask.u.uTexture,this.dye.read.attach(0)),this.blit(this.dye.write),t.sun.bind(),e.uniform1f(t.sun.u.weight,this.cfg.SUNRAYS_WEIGHT),e.uniform1i(t.sun.u.uTexture,this.dye.write.attach(0)),this.blit(this.sunrays)}blur(e,t,s){let a=this.gl,o=this.p;o.blur.bind();for(let r=0;r<s;r++)a.uniform2f(o.blur.u.texelSize,e.texelSizeX,0),a.uniform1i(o.blur.u.uTexture,e.attach(0)),this.blit(t),a.uniform2f(o.blur.u.texelSize,0,e.texelSizeY),a.uniform1i(o.blur.u.uTexture,t.attach(0)),this.blit(e)}},fn=i=>i<1?i:1,mn=i=>i>1?1/i:1,vn=(i,e)=>({r:i.r*e,g:i.g*e,b:i.b*e});var gn=`
struct U { texel: vec2f, dyeTexel: vec2f, point: vec2f, aspect: f32, radius: f32, color: vec4f, a: f32, b: f32, c: f32, d: f32, curve: vec4f, e: vec4f };
struct VO { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VO {
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var o: VO; o.pos = vec4f(p[i], 0.0, 1.0); o.uv = vec2f(p[i].x * 0.5 + 0.5, 0.5 - p[i].y * 0.5); return o;
}
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var sl: sampler;
fn tx(t: texture_2d<f32>, uv: vec2f) -> vec4f { return textureSampleLevel(t, sl, uv, 0.0); }
`,yn={copy:`@group(0) @binding(2) var t0: texture_2d<f32>;
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
}`},Zs=`
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
`,ea=`var<private> selRect: vec4f;
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
`,bn=()=>Zs+`@group(0) @binding(2) var dye: texture_2d<f32>;
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
`+ea+`fn inkAt(uv: vec2f) -> vec3f {
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
}`,Ya=`@group(0) @binding(2) var dye: texture_2d<f32>;
@group(0) @binding(3) var bloom: texture_2d<f32>;
@group(0) @binding(4) var keys: texture_2d<f32>;
@group(0) @binding(5) var sn: sampler;
@group(0) @binding(6) var keyLit: texture_2d<f32>;
@group(0) @binding(7) var srcT: texture_2d<f32>;
@group(0) @binding(8) var haze: texture_2d<f32>;
`,xn=()=>Zs+Ya+ea+`@fragment fn fs(i: VO) -> @location(0) vec4f { return aroundLight(i.pos.xy * s.lightScale - s.off); }
`,kn=()=>Zs+Ya+ea+`@fragment fn fs(i: VO) -> @location(0) vec4f {
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
`,wn=()=>Zs+Ya+ea+`@fragment fn fs(i: VO) -> @location(0) vec4f {
  let c0 = floor(i.pos.xy);
  var sum = vec3f(0.0);
  for (var j = 0; j < 8; j = j + 1) {
    for (var n = 0; n < 8; n = n + 1) { sum = sum + glowAt((c0 + (vec2f(f32(n), f32(j)) + 0.5) / 8.0) / s.hazeRes); }
  }
  return vec4f(sum / 64.0, 1.0);
}
`,Sn=()=>GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST,ks=256,ws=class i extends as{static supported(){return typeof navigator<"u"&&!!navigator.gpu}static async create(){try{let e=new i;return await e.initGPU(),e.ok?e:null}catch(e){return console.warn("WebGPU indisponible, repli sur WebGL",e),null}}init(){}async initGPU(){this.cfg={...Wa},this.ext={linear:!0};let e=await navigator.gpu.requestAdapter();if(!e)return;let t=await e.requestDevice();this.device=t,t.lost.then(()=>{this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let s=0;t.addEventListener("uncapturederror",p=>{console.warn("WebGPU",p.error&&p.error.message),++s>4&&this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let a=this.canvas.getContext("webgpu");if(!a)return;this.ctx=a,this.format="rgba16float";try{a.configure({device:t,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:"extended"},alphaMode:"premultiplied"}),this.p3=!0;let p=a.getConfiguration?a.getConfiguration():null;this.extended=p?!!(p.toneMapping&&p.toneMapping.mode==="extended"):!0,this.rangeOn=!0}catch{this.format=navigator.gpu.getPreferredCanvasFormat(),a.configure({device:t,format:this.format,alphaMode:"premultiplied"}),this.extended=!1,this.p3=!1}this.hdrScreen=this.extended&&matchMedia("(dynamic-range: high)").matches,this.lin=t.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.near=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.rep=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat"}),this.ubuf=t.createBuffer({size:ks*512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.staging=new ArrayBuffer(ks*512),this.f32=new Float32Array(this.staging),this.uOff=0;let o={},r=[],n=(p,m,v,b)=>{let y=t.createShaderModule({code:m});y.getCompilationInfo&&y.getCompilationInfo().then(S=>{for(let R of S.messages)R.type==="error"&&r.push(`${p}:${R.lineNum}: ${R.message}`)}),t.pushErrorScope("validation");let x=t.createRenderPipeline({layout:"auto",vertex:{module:y,entryPoint:"vs"},fragment:{module:y,entryPoint:"fs",targets:[{format:v,blend:b}]},primitive:{topology:"triangle-list"}});return t.popErrorScope().then(S=>{S&&r.push(`${p}: ${S.message}`)}),x},l={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},d=p=>gn+yn[p];o.copyRGBA=n("copy",d("copy"),"rgba16float"),o.copyRG=n("copy",d("copy"),"rg16float"),o.clear=n("clear",d("clear"),"r16float"),o.splatRG=n("splat",d("splat"),"rg16float"),o.splatRGBA=n("splat",d("splat"),"rgba16float"),o.advectRG=n("advect",d("advect"),"rg16float"),o.advectRGBA=n("advect",d("advect"),"rgba16float"),o.divergence=n("div",d("divergence"),"r16float"),o.curl=n("curl",d("curl"),"r16float"),o.vorticity=n("vort",d("vorticity"),"rg16float"),o.pressure=n("pressure",d("pressure"),"r16float"),o.gradient=n("grad",d("gradient"),"rg16float"),o.bloomPre=n("bloomPre",d("bloomPre"),"rgba16float"),o.bloomBlur=n("bloomBlur",d("bloomBlur"),"rgba16float"),o.bloomAdd=n("bloomAdd",d("bloomBlur"),"rgba16float",l),o.sunMask=n("sunMask",d("sunMask"),"rgba16float"),o.sun=n("sun",d("sun"),"r16float"),o.blur=n("blur",d("blur"),"r16float"),o.composite=n("composite",bn(),this.format),o.light=n("light",xn(),"rgba16float"),o.sources=n("sources",kn(),"rgba16float"),o.haze=n("haze",wn(),"rgba16float"),this.pipes=o,this.layouts=new Map;let c=new Uint8Array(4096*4),h=1234567;for(let p=0;p<c.length;p++)h=h*1103515245+12345&2147483647,c[p]=h>>23;this.dither=this.texFromData(64,64,c),this.maskAll=this.texFromData(1,1,new Uint8Array([1,0,0,255])),this.maskSim=this.maskDye=this.maskAll,this.keyTex=this.texFromData(1,1,new Uint8Array([0,0,0,255])),this.keys=null,this.scene=null,this.resetLight(),this.dye=null,this.velocity=null,this.ok=!0,t.pushErrorScope("validation");try{this.canvas.width=96,this.canvas.height=128,this.hostW=96,this.hostH=128,this.initBuffers(),this.splat(.5,.5,.01,.01,{r:.3,g:.2,b:.1}),this.scene={glass:!0},this.applyInputs(),this.step(1/60),this.render(!1),this.scene=null}catch(p){r.push("dry run: "+p.message)}let f=await t.popErrorScope();if(f&&r.push(f.message),await t.queue.onSubmittedWorkDone(),await new Promise(p=>setTimeout(p,0)),this.queue=[],this.dye=null,this.canvas.width=2,this.canvas.height=2,this.hostW=0,r.length){console.warn("MOTIF WebGPU: repli sur WebGL \u2014",r.join(" | ")),this.problems=r,this.ok=!1;return}}tex(e,t,s){let a=this.device.createTexture({size:[e,t],format:s,usage:Sn()});return{texture:a,view:a.createView(),width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,format:s}}double(e,t,s){let a=this.tex(e,t,s),o=this.tex(e,t,s);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return a},set read(r){a=r},get write(){return o},set write(r){o=r},swap(){let r=a;a=o,o=r}}}texFromData(e,t,s){let a=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return this.device.queue.writeTexture({texture:a},s,{bytesPerRow:e*4},[e,t]),{texture:a,view:a.createView(),width:e,height:t}}texFromCanvas(e){let t=this.device.createTexture({size:[e.width,e.height],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return this.device.queue.copyExternalImageToTexture({source:e},{texture:t},[e.width,e.height]),{texture:t,view:t.createView(),width:e.width,height:e.height}}initBuffers(){let e=this.cfg,t=this.res(e.SIM_RESOLUTION),s=this.res(e.DYE_RESOLUTION);for(let r of[this.dye,this.velocity,this.pressure])r&&(r.read.texture.destroy(),r.write.texture.destroy());for(let r of[this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp,...this.bloomFbos||[]])r&&r.texture.destroy();this.dye=this.double(s.width,s.height,"rgba16float"),this.velocity=this.double(t.width,t.height,"rg16float"),this.divergence=this.tex(t.width,t.height,"r16float"),this.curl=this.tex(t.width,t.height,"r16float"),this.pressure=this.double(t.width,t.height,"r16float");let a=this.res(e.BLOOM_RESOLUTION);this.bloom=this.tex(a.width,a.height,"rgba16float"),this.bloomFbos=[];for(let r=0;r<e.BLOOM_ITERATIONS;r++){let n=a.width>>r+1,l=a.height>>r+1;if(n<2||l<2)break;this.bloomFbos.push(this.tex(n,l,"rgba16float"))}let o=this.res(e.SUNRAYS_RESOLUTION);this.sunrays=this.tex(o.width,o.height,"r16float"),this.sunraysTemp=this.tex(o.width,o.height,"r16float"),this.rebuildMasks(),this.zero()}rebuildMasks(){for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&t.texture.destroy();if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}let e=this.maskCanvas||(this.maskCanvas=document.createElement("canvas"));this.maskSim=this.texFromCanvas(vs(e,this.keys,this.velocity.width,this.velocity.height)),this.maskDye=this.texFromCanvas(vs(e,this.keys,this.dye.width,this.dye.height))}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,s=this.hostH,a=e.sig+"|"+t+"x"+s;this.keyTexSig!==a&&(this.keyTex&&this.keyTex.texture.destroy(),this.keyTex=this.texFromCanvas(js(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,s)),this.keyTexSig=a)}get enc(){return this._enc||(this._enc=this.device.createCommandEncoder())}uniforms(e,t=1){let s=this.uOff;if(this.uOff+=ks*t,this.uOff>this.staging.byteLength)throw new Error("uniform space");let a=this.f32,o=s/4;return a.fill(0,o,o+ks*t/4),e(a,o),{buffer:this.ubuf,offset:s,size:ks*t}}uni(e){return this.uniforms((t,s)=>{e.texel&&(t[s]=e.texel[0],t[s+1]=e.texel[1]),e.point&&(t[s+4]=e.point[0],t[s+5]=e.point[1]),t[s+6]=e.aspect||0,t[s+7]=e.radius||0,e.color&&(t[s+8]=e.color[0],t[s+9]=e.color[1],t[s+10]=e.color[2]),t[s+12]=e.a||0,t[s+13]=e.b||0,t[s+14]=e.c||0,t[s+15]=e.d||0,e.curve&&(t[s+16]=e.curve[0],t[s+17]=e.curve[1],t[s+18]=e.curve[2])})}pass(e,t,s,a,o){let r=this.layouts.get(e)||(this.layouts.set(e,e.getBindGroupLayout(0)),this.layouts.get(e)),n=[{binding:0,resource:s},{binding:1,resource:this.lin}];a.forEach((c,h)=>{c&&n.push({binding:2+h,resource:c})});let l=this.device.createBindGroup({layout:r,entries:n}),d=this.enc.beginRenderPass({colorAttachments:[{view:t.view||t,loadOp:o?"load":"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]});d.setPipeline(e),d.setBindGroup(0,l),d.draw(3),d.end()}flush(){this._enc&&(this.device.queue.writeBuffer(this.ubuf,0,this.staging,0,this.uOff),this.device.queue.submit([this._enc.finish()]),this._enc=null,this.uOff=0)}zero(){if(this.dye){for(let e of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp])this.enc.beginRenderPass({colorAttachments:[{view:e.view,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]}).end();this.flush()}}clear(){!this.ok||!this.dye||(this.zero(),this.requestRender())}applyInputs(){let e=this.queue;this.queue=[];for(let[t,s,a,o,r,n,l]of e)this.splatNow(t,s,a*this.cfg.SPLAT_FORCE*Tn(this.aspect),-o*this.cfg.SPLAT_FORCE*Mn(this.aspect),r,n,l?0:this.keyAt(t,s))}splatNow(e,t,s,a,o,r,n){let l=this.cfg.SPLAT_RADIUS*r/100;this.aspect>1&&(l*=this.aspect);let d={point:[e,t],aspect:this.aspect,radius:l,a:n?n/255:0},c=this.velocity,h=this.dye;this.pass(this.pipes.splatRG,c.write,this.uni({...d,color:[s,a,0]}),[c.read.view,this.maskSim.view,this.near]),c.swap(),this.pass(this.pipes.splatRGBA,h.write,this.uni({...d,color:[o.r*this.gain,o.g*this.gain,o.b*this.gain]}),[h.read.view,this.maskDye.view,this.near]),h.swap()}step(e){let t=this.pipes,s=this.velocity,a=this.cfg,o=[s.texelSizeX,s.texelSizeY];this.pass(t.curl,this.curl,this.uni({texel:o}),[s.read.view]),this.pass(t.vorticity,s.write,this.uni({texel:o,a:e,c:a.CURL}),[s.read.view,this.curl.view]),s.swap(),this.pass(t.divergence,this.divergence,this.uni({texel:o}),[s.read.view,this.maskSim.view,this.near]),this.pass(t.clear,this.pressure.write,this.uni({a:a.PRESSURE}),[this.pressure.read.view]),this.pressure.swap();let r=this.uni({texel:o});for(let n=0;n<a.PRESSURE_ITERATIONS;n++)this.pass(t.pressure,this.pressure.write,r,[this.pressure.read.view,this.divergence.view,this.maskSim.view,this.near]),this.pressure.swap();this.pass(t.gradient,s.write,this.uni({texel:o}),[this.pressure.read.view,s.read.view,this.maskSim.view,this.near]),s.swap(),this.pass(t.advectRG,s.write,this.uni({texel:o,a:e,b:a.VELOCITY_DISSIPATION}),[s.read.view,s.read.view,this.maskSim.view,this.near]),s.swap(),this.pass(t.advectRGBA,this.dye.write,this.uni({texel:o,a:e,b:a.DENSITY_DISSIPATION}),[s.read.view,this.dye.read.view,this.maskDye.view,this.near]),this.dye.swap()}applyBloom(){let e=this.pipes,t=this.cfg;if(this.bloomFbos.length<2)return;let s=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;this.pass(e.bloomPre,this.bloom,this.uni({curve:[t.BLOOM_THRESHOLD-s,s*2,.25/s],a:t.BLOOM_THRESHOLD}),[this.dye.read.view]);let a=this.bloom;for(let o of this.bloomFbos)this.pass(e.bloomBlur,o,this.uni({texel:[a.texelSizeX,a.texelSizeY],a:1}),[a.view]),a=o;for(let o=this.bloomFbos.length-2;o>=0;o--){let r=this.bloomFbos[o];this.pass(e.bloomAdd,r,this.uni({texel:[a.texelSizeX,a.texelSizeY],a:1}),[a.view],!0),a=r}this.pass(e.bloomBlur,this.bloom,this.uni({texel:[a.texelSizeX,a.texelSizeY],a:t.BLOOM_INTENSITY*(1+this.boost*.8)}),[a.view])}applySunrays(){let e=this.pipes;this.pass(e.sunMask,this.dye.write,this.uni({}),[this.dye.read.view]),this.pass(e.sun,this.sunrays,this.uni({a:this.cfg.SUNRAYS_WEIGHT}),[this.dye.write.view]),this.pass(e.blur,this.sunraysTemp,this.uni({texel:[this.sunrays.texelSizeX,0]}),[this.sunrays.view]),this.pass(e.blur,this.sunrays,this.uni({texel:[0,this.sunraysTemp.texelSizeY]}),[this.sunraysTemp.view])}setDisplay(){}setExtended(e){if(!(!this.ctx||this.format!=="rgba16float"||this.rangeOn===e)){this.rangeOn=e;try{this.ctx.configure({device:this.device,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:e?"extended":"standard"},alphaMode:"premultiplied"})}catch{}this.requestRender()}}ensureKeyLit(){this.keyLit||(this.keyLit=new Uint8Array(256)),this.keyLitTex||(this.keyLitTex=this.texFromData(64,1,this.keyLit),this.keyLitDirty=!1),this.keyLitDirty&&(this.device.queue.writeTexture({texture:this.keyLitTex.texture},this.keyLit,{bytesPerRow:256},[64,1]),this.keyLitDirty=!1)}ensureHazeTex(){let e=this.res(16),t=this.hazeTex;return t&&t.width===e.width&&t.height===e.height?t:(t&&t.texture.destroy(),this.hazeTex=this.tex(e.width,e.height,"rgba16float"),this.hazeTex)}ensureLightTex(e,t){let s=Math.max(2,Math.ceil(e/2)),a=Math.max(2,Math.ceil(t/2)),o=this.lightTex;return o&&o.width===s&&o.height===a?o:(o&&o.texture.destroy(),this.lightTex=this.tex(s,a,"rgba16float"),this.lightTex)}render(e){if(!this.ok||!this.dye)return;let t=this.cfg;e||(t.BLOOM&&this.applyBloom(),t.SUNRAYS&&this.applySunrays()),this.ensureKeyTex();let s=this.scene||{};this.stepLight();let a=this.hostW,o=this.hostH,r=this.dpr||1,n=this.hdrScreen&&s.hdr||1,l=this.slabData(!1),d=this.canvas.width,c=this.canvas.height,h=s.glass?this.ensureLightTex(d,c):null,f=this.ensureHazeTex(),p=Js(s),m=this.uniforms((b,y)=>{let x=(R,B)=>{for(let H=0;H<B.length;H++)b[y+R+H]=B[H]};x(0,[a,o]),x(2,[this.light[0],this.light[1]]),x(4,s.bgTop||[.1,.11,.14]),x(8,s.bgBot||[.07,.075,.094]),x(12,s.accent||[.8,.9,.3]),x(16,s.sep||[1,1,1,.06]),(s.kinds||[]).forEach((R,B)=>x(20+B*4,R)),x(44,[a/64,o/64]),x(46,[1/a,1/o]),x(48,[(s.sepPx||1)*r,s.keys?1:0,s.kind==="xy"?1:0,s.dark===!1?0:1,s.glass?1:0,(s.radius||20)*r,p.bevel*r,Math.min(1,this.boost)]),x(56,[n,t.BLOOM?1:0,t.SUNRAYS?1:0,t.SHADING?1:0]),b.set(this.touchUniforms(!1),y+60),x(76,[p.thick*r,this.gelOn===!1?0:s.gel??1,h?d/h.width:1,h?c/h.height:1]),b.set(l.slabs,y+80),b.set(l.fills,y+112),b.set(this.meters,y+144),x(152,[this.off[0],this.off[1],this.slide[0],-this.slide[1]]),x(156,[r,l.n,s.kind==="mix"?1:0,this.light[2],s.spill||0,s.shadow||0,d,c]),x(164,s.surf||[.086,.09,.114]),x(168,this.screenColor(s.appBg));let S=this.obstacleData(!1);b.set(S.rects,y+172),x(236,[S.n,S.lightH,S.ctrlH,s.style||0]),b.set(S.radii,y+240),x(256,s.keyGlow||[1,1,1,0]),x(260,[p.id,p.p,p.disp,p.depth]),x(264,[f.width,f.height]),x(268,this.stage||[0,0,0,0])},5);this.ensureKeyLit();let v=this.ctx.getCurrentTexture().createView();if(h){let b=this.srcTex||(this.srcTex=this.tex(8,1,"rgba16float"));this.pass(this.pipes.sources,b,m,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.haze,f,m,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.light,h,m,[this.dye.read.view,this.bloom.view,this.keyTex.view,this.near,this.keyLitTex.view,b.view])}this.pass(this.pipes.composite,v,m,[this.dye.read.view,this.bloom.view,this.sunrays.view,this.dither.view,this.keyTex.view,this.near,this.rep,(h||this.dither).view,this.keyLitTex.view,null,f.view]),this.flush()}degrade(){this.slow=0;let e=this.cfg;e.SUNRAYS?e.SUNRAYS=!1:e.BLOOM?e.BLOOM=!1:e.SIM_RESOLUTION>64&&(e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.hostW=0)}},Tn=i=>i<1?i:1,Mn=i=>i>1?1/i:1;var Ka=[".parts .ptab",".inst .arrow",".inst .name",".nav button"],Ln={pad:[".controls .dial",".range",".timeline > *",...Ka],xy:[".groups .grp",".autobar > *",...Ka],mix:[".mixknobs .dial",".fader .m",...Ka]},ao=190,Gt={layouts:0,paints:0,writes:0,items:0},Rn=i=>{let e=getComputedStyle(i).backgroundColor.match(/[\d.]+/g);return!!e&&(e.length<4||+e[3]>.02)},io=i=>{let e=document.createElement("div");return e.className=i,e.setAttribute("aria-hidden","true"),e};function oo(i){let e=[],t=null,s=[],a=$s,o={r:0,g:0,b:0,x:0,y:0,w:0},r=0,n=0,l=!1,d=1.6,c=null,h=0,f=[],p=0,m={sh:"0 0 0",hl:"255 255 255"},v=io("spill-over"),b=()=>{for(let D of e){D.el.classList.remove("lit","solid");for(let X of["--e","--ux","--uy","--l"])D.el.style.removeProperty(X)}v.replaceChildren(),e=[]},y=new MutationObserver(D=>{if(!l||!c||h)return;let X=z=>z.target===v;D.some(z=>!X(z)&&(z.type==="attributes"||[...z.addedNodes].some(J=>J.nodeType===1)))&&(h=setTimeout(()=>{h=0,c&&x.layout(c.el,c.kind)},160))}),x={enable(D){l=D,document.documentElement.toggleAttribute("data-spill",D),D?(v.parentNode!==i&&i.append(v),y.observe(i,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["aria-selected","aria-pressed","disabled"]}),y.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),document.fonts&&document.fonts.ready.then(()=>{l&&c&&x.layout(c.el,c.kind)})):(y.disconnect(),b(),v.remove(),c=null,o={r:0,g:0,b:0,x:0,y:0,w:0},f=[],x.onObstacles([]),x.onSources([]))},setPower(D){d=D},setHeight(D){a=D},onObstacles(){},onSources(){},layout(D,X){if(Gt.layouts++,b(),t=null,c=null,!l||!D||!D.isConnected){x.onObstacles([]);return}c={el:D,kind:X},t=D.getBoundingClientRect();let z=i.getBoundingClientRect();m=document.documentElement.dataset.theme==="light"?{sh:"70 48 12",hl:"255 255 255"}:{sh:"0 0 0",hl:"255 255 255"};let J=(X==="mix"?[...D.querySelectorAll(".fader")]:[D]).map(G=>G.getBoundingClientRect()),N=G=>J.some(U=>G.left<U.right&&G.right>U.left&&G.top<U.bottom&&G.bottom>U.top),fe=[];s=[];for(let G of Ln[X]||[])for(let U of i.querySelectorAll(G)){let oe=U.getBoundingClientRect();if(!oe.width)continue;let pe=Math.max(0,t.left-oe.right,oe.left-t.right),te=Math.max(0,t.top-oe.bottom,oe.top-t.bottom);if(Math.hypot(pe,te)>ao*2.5)continue;let Me=Rn(U);U.classList.toggle("solid",Me);let ne={el:U,r:oe,solid:Me,ro:"",ang:"",te:-1,ta:0};if(Me){let $e={left:`${oe.left-z.left}px`,top:`${oe.top-z.top}px`,width:`${oe.width}px`,height:`${oe.height}px`,borderRadius:getComputedStyle(U).borderRadius};ne.rl=io(""),Object.assign(ne.rl.style,$e),ne.rl.style.setProperty("--hl",m.hl),ne.rl.style.setProperty("--sh",m.sh),v.append(ne.rl),N(oe)||(fe.push({d:Math.hypot(pe,te),r:[oe.left-t.left,oe.top-t.top,oe.right-t.left,oe.bottom-t.top,parseFloat(getComputedStyle(U).borderTopLeftRadius)||0]}),s.push(ne))}e.push(ne)}Gt.items=e.length,x.onObstacles(fe.sort((G,U)=>G.d-U.d).slice(0,16).map(G=>G.r.map(U=>Math.round(U*10)/10))),o.w>0&&S()},emit(D,X=1,z,J){if(!l)return;let N=D.r*X,fe=D.g*X,G=D.b*X,U=N+fe+G;o.r+=N,o.g+=fe,o.b+=G,z!==void 0&&U>0&&(o.x+=z*U,o.y+=J*U,o.w+=U,R(z,J,U,N,fe,G)),S()}};function S(){r||(n=performance.now(),r=requestAnimationFrame(B))}function R(D,X,z,J,N,fe){let G=t?t.height/t.width:1.4,U=null,oe=1/0;for(let pe of f){let te=Math.hypot(pe.x-D,(pe.y-X)*G);te<oe&&(oe=te,U=pe)}if(U&&(oe<.22||f.length>=4)){let pe=U.e+z;U.x=(U.x*U.e+D*z)/pe,U.y=(U.y*U.e+X*z)/pe,U.e=pe,U.r+=J,U.g+=N,U.b+=fe}else f.push({x:D,y:X,e:z,r:J,g:N,b:fe})}function B(D){r=0;let X=Math.min(.1,(D-n)/1e3);n=D;let z=Math.exp(-X/.28);for(let G in o)o[G]*=z;let J=o.r+o.g+o.b,N=1-Math.exp(-J*.45),fe=Math.exp(-X/.45);for(let G of f)G.e*=fe,G.r*=fe,G.g*=fe,G.b*=fe;f=f.filter(G=>G.e>.01),(f.length||p)&&(p=f.length,x.onSources(f.map(G=>{let U=Math.max(G.r,G.g,G.b,1e-6);return[G.x,G.y,1-Math.exp(-G.e*.5),G.r/U,G.g/U,G.b/U]}))),t&&K(N<.01&&!f.length?0:1),(N>=.01||f.length)&&(r=requestAnimationFrame(B))}let H=(D,X,z,J,N)=>{D[X]!==N&&(D[X]=N,z.style[J]=N)};function ie(D,X,z){let J=X.x-D.x,N=X.y-D.y;Math.abs(J)<.001&&(J=.001),Math.abs(N)<.001&&(N=.001);let fe=1;for(let G of s){if(G===z)continue;let U=G.r,oe=(U.left-D.x)/J,pe=(U.right-D.x)/J,te=(U.top-D.y)/N,Me=(U.bottom-D.y)/N,ne=Math.max(Math.min(oe,pe),Math.min(te,Me),0),$e=Math.min(Math.max(oe,pe),Math.max(te,Me),1);if(ne<$e){let T=4.5*(1-$e)+.15*a,O=Xs*(1-$e)-a,E=Math.min(1,Math.max(0,(O+T)/(2*T)));fe*=E*E*(3-2*E)}}return .22+.78*fe}function K(D){Gt.paints++;let X=D?f.map(z=>({x:t.left+z.x*t.width,y:t.top+z.y*t.height,i:1-Math.exp(-z.e*.5)})):[];for(let z of e){let{r:J}=z,N=J.left+J.width/2,fe=J.top+J.height/2,G=0,U=0,oe=0,pe=0;for(let te of X){let Me=Math.min(Math.max(te.x,J.left),J.right),ne=Math.min(Math.max(te.y,J.top),J.bottom),$e=Math.hypot(Me-te.x,ne-te.y),T=te.i*(s.length?ie(te,{x:Me,y:ne},z):1)/(1+($e/ao)**2),O=N-te.x,E=fe-te.y,C=Math.hypot(O,E)||1;G+=T,U+=T*O/C,oe+=T*E/C,pe+=T*$e}if(G>0){pe/=G;let te=Math.hypot(U,oe)||1;U/=te,oe/=te}else U=0,oe=1;if(G=Math.min(1,G*d),z.solid){if(H(z,"ro",z.rl,"opacity",G<.02?"0":Math.min(1,G*1.3).toFixed(2)),G>=.02){let te=`${Math.round(Math.atan2(U,-oe)*180/Math.PI)}deg`;te!==z.ang&&(z.ang=te,z.rl.style.setProperty("--ang",te),Gt.writes++)}}else{let te=G<.03?0:Math.min(1,G),Me=Math.atan2(oe,U);if(Math.abs(te-z.te)<.03&&Math.abs(Math.atan2(Math.sin(Me-z.ta),Math.cos(Me-z.ta)))<.06||(z.te=te,z.ta=Me,Gt.writes++,z.el.classList.toggle("lit",te>0),!te))continue;let ne=z.el.style;ne.setProperty("--e",te.toFixed(2)),ne.setProperty("--ux",U.toFixed(2)),ne.setProperty("--uy",oe.toFixed(2)),ne.setProperty("--l",Math.min(2.2,.7+pe*.006).toFixed(2))}}}return x}var ro={normal:1.6,intense:2.6,max:4},no={douce:.6,normale:1,forte:1.6,max:2.4},En=[3,6,10,15],lo={drum:28,bass:345,lead:78},co=[18,40,52,300],An=[322,190,160,272],_n={bass:322,lead:190},Dn=[0,7,2,9,4,11,6,1,8,3,10,5],Pn=["optique","liquide","depoli","cristal","prisme"],ho={douce:{cfg:{DENSITY_DISSIPATION:2.8,VELOCITY_DISSIPATION:.8,CURL:16,SPLAT_RADIUS:.18,BLOOM_INTENSITY:.3,BLOOM_THRESHOLD:.7,SUNRAYS_WEIGHT:.6},gain:.6,shake:0,rise:.01,dose:{down:.35,move:.1,kick:[.06,.2],snare:[.03,.14],hat:[.02,.05],perc:[.02,.06],note:[.1,.25],stir:[.07,.13]}},normale:{cfg:{DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,CURL:24,SPLAT_RADIUS:.22,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,SUNRAYS_WEIGHT:.8},gain:.7,shake:0,rise:.012,dose:{down:.55,move:.16,kick:[.12,.4],snare:[.06,.28],hat:[.03,.1],perc:[.04,.12],note:[.15,.45],stir:[.1,.2]}},spectaculaire:{cfg:{DENSITY_DISSIPATION:1.5,VELOCITY_DISSIPATION:.4,CURL:32,SPLAT_RADIUS:.26,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.72,SUNRAYS_WEIGHT:1},gain:.92,shake:1,rise:.016,dose:{down:.7,move:.2,kick:[.2,.5],snare:[.15,.4],hat:[.15,.05],perc:[.12,.3],note:[.2,.55],stir:[.15,.3]}}};function qn(i,e,t){i=(i%360+360)%360/60;let s=Math.floor(i),a=i-s,o=t*(1-e),r=t*(1-a*e),n=t*(1-(1-a)*e),[l,d,c]=[[t,n,o],[r,t,o],[o,t,n],[o,r,t],[n,o,t],[t,o,r]][s%6];return{r:l,g:d,b:c}}function uo(i,{pad:e,xy:t}){let s=null,a="none",o=()=>{let T=new as;T.ok&&(s=T,a="webgl")};i.settings.fluidEngine!=="webgl"&&ws.supported()?ws.create().then(T=>{T?(s=T,a=T.hdrScreen?"webgpu-hdr":"webgpu",T.onLost=()=>{s=null,o(),ne.place()}):o(),ne.place()}):setTimeout(()=>{o(),ne.place()});let r=matchMedia("(prefers-reduced-motion: reduce)"),n=i.settings,l=()=>!!n.fluid&&!r.matches,d=()=>!!n.glass,c=oo(e.el.closest(".app")||document.querySelector(".app"));c.onObstacles=T=>{s&&s.setObstacles&&s.setObstacles(T)};let h=()=>document.documentElement.dataset.theme!=="light",f=()=>ho[n.fluidStyle]||ho.spectaculaire,p=null,m=null,v=()=>n.glassSpill===!1?0:no[n.glassLight]||no.forte,b=()=>Pn.includes(n.glassLook)?n.glassLook:"optique",y=()=>b()==="liquide",x=T=>{let O=n.fluidColors,E=T.part==="drum"||T.part===void 0;return O==="notes"?T.pc!==void 0?Dn.indexOf(T.pc)*30:E?co[T.lane||0]:lo[T.part]:O==="arc"?performance.now()/1e3*48+(E?(T.lane||0)*24:T.x*70):O==="neon"?E?An[T.lane||0]:_n[T.part]+(T.x-.5)*30:E?co[T.lane||0]:lo[T.part]+(T.x-.5)*(T.part==="lead"?70:40)},S=(T,O)=>{let E=n.fluidColors==="notes"||n.fluidColors==="arc"||n.fluidColors==="neon",C=n.lightLook||"aquarelle",P=qn(x(T),h()?n.fluidColors==="neon"?1:.82:C==="aquarelle"?.85:C==="vitrail"?.72:E?.42:.28,1),ee=O*f().gain,ce={r:P.r*ee,g:P.g*ee,b:P.b*ee};return c.emit(ce,1,T.x,T.y),ce},R=new Map,B=()=>n.fluidInk!=="maitrisee",H=(T,O=.8,E)=>{let C=f().dose[T],P=Array.isArray(C)?C[0]+C[1]*O:C;if(B())return P;if(n.fluidZone==="keys"&&i.ui.view==="pattern"&&(P*=T==="note"||T==="down"||T==="move"?.95:.6),E!==void 0){let ee=performance.now(),ce=R.get(E)||{e:0,t:ee};ce.e*=Math.exp(-(ee-ce.t)/550),ce.t=ee;let re=P/(1+ce.e*2.2);return ce.e+=re,R.set(E,ce),re}return P},ie=null,K=null,D=()=>{if(s)if(m&&p===m.el){let T=J();s.setKeys(T.map(([O,E,C,P])=>({x0:O,y0:E,x1:C,y1:P})),"mix|"+JSON.stringify(T))}else if(n.fluidZone==="keys"&&i.ui.view==="pattern"){let T=e.keyLayout();s.setKeys(T.keys,T.sig)}else s.setKeys(null,"all")},X=T=>T===e.el?"pad":T===t.el?"xy":"mix",z=null,J=()=>{if(z)return z;let T=m.el.getBoundingClientRect(),O=m.faders.map(E=>{let C=E.el.getBoundingClientRect();return[(C.left-T.left)/T.width,(C.top-T.top)/T.height,(C.right-T.left)/T.width,(C.bottom-T.top)/T.height].map(P=>Math.round(P*1e4)/1e4)});return T.width>0&&(z=O),O},N=T=>Math.pow(Math.max(0,(T+40)/46),1.6),fe=()=>{let T=i.project.parts,O=m.faders.map(P=>{let ee=P.part==="drum"?T.drum.level[P.lane]:T[P.part].level,ce=P.part==="drum"?T.drum.mute[P.lane]:T[P.part].mute,re=Zt(getComputedStyle(P.el).getPropertyValue("--fc")),Ee=ce?.3:1;return[re[0]*Ee,re[1]*Ee,re[2]*Ee,Math.round(Math.min(1,N(ee))*1e3)/1e3]}),E=parseFloat(getComputedStyle(m.faders[0].el).borderTopLeftRadius)||16,C=Oa({kind:"mix",keys:null,sig:"mix",el:m.el,glass:!0,hdr:Me(),slabs:J(),fills:O,spill:v(),radius:E,look:n.lightLook,gel:.8,glassLook:b()});C.sig!==ie&&(ie=C.sig,K=C,s.setExtended&&s.setExtended(te()),s.setScene(C))},G=()=>{let T=re=>[.18+.64*re,.72-.38*Math.sin(re*Math.PI)],O=$e(),E=26,C=0,[P,ee]=T(0);ne.press("preview",P,ee,"down");let ce=()=>{C++;let[re,Ee]=T(C/E);if(C<E){ne.press("preview",re,Ee,"move"),y()&&c.emit({r:O[0],g:O[1],b:O[2]},.18,re,Ee),setTimeout(ce,40);return}ne.press("preview",re,Ee,"up");let kt=performance.now(),Ae=()=>{if(!s)return;let dt=(performance.now()-kt)/1800;if(dt>=1){s.aimReset();return}let et=Math.PI*(.72-.55*Math.sin(dt*Math.PI));s.aim([Math.cos(et)*.78,Math.sin(et)*.78,.62]),requestAnimationFrame(Ae)};requestAnimationFrame(Ae)};setTimeout(ce,40)},U=[],oe=(T,O)=>{let E=performance.now(),C=U[T];C.e=(C.e||0)*Math.exp(-(E-(C.te||E))/420),C.te=E;let P=O/(1+C.e*3);return C.e+=P,P},pe=T=>{if(!s||!m||p!==m.el)return;let O=performance.now(),E=J(),C=[];m.faders.forEach((P,ee)=>{let ce=P.part==="drum"?T.d[P.lane]:T[P.part],re=Math.max(0,Math.min(1,(20*Math.log10(Math.max(ce||0,1e-5))+48)/48));C[ee]=re;let Ee=U[ee]||(U[ee]={env:0,t:0}),kt=re>Ee.env+.15&&re>.45;if(Ee.env=Math.max(re,Ee.env*.9),!l()||!E[ee])return;let[Ae,dt,et,ft]=E[ee],Vt=(Ae+et)/2,Rs=et-Ae,ma=ft-dt,At=ft-ma*.06,Xt={part:P.part,lane:P.lane,x:Vt,y:At},Es=.012+.03*re;kt?(s.splat(Vt,At,(Math.random()-.5)*Rs*.08,-Es*2.2,S(Xt,oe(ee,.18+.4*re)),.9),P.part==="drum"&&P.lane===0&&s.pulse(.7*re),Ee.t=O):re>.5&&O-Ee.t>160&&(s.splat(Vt+(Math.random()-.5)*Rs*.4,At,0,-Es,S(Xt,oe(ee,.05*re*re)),.6),Ee.t=O)}),s.setMeters(C)},te=()=>h()||n.hdrLight!==!1,Me=()=>a==="webgpu-hdr"&&te()?ro[n.fluidHdr]||ro.intense:1,ne={get fluid(){return s},spillStats:Gt,engine:()=>a,place(){let T=i.ui.view,O=T==="mix"&&!!m&&n.mixGlass!==!1,E=T==="pattern"?e.el:T==="tweaks"?t.el:O?m.el:null,C=!!s&&!!E&&(l()||d()||O);e.gpu=C&&E===e.el,t.gpu=C&&E===t.el,e.inkUnder=e.gpu&&l();for(let ee of[e.el,t.el,m&&m.el])ee&&ee.classList.toggle("gpu-host",C&&ee===E);for(let ee of[e.el,t.el])C&&ee===E&&d()?ee.dataset.glass=b():delete ee.dataset.glass;if(!C){s&&s.detach(),p=null,c.enable(!1),e.draw(),T==="tweaks"&&t.draw();return}s.setStyle(O?{...f().cfg,DENSITY_DISSIPATION:Math.max(2.6,f().cfg.DENSITY_DISSIPATION)}:f().cfg),s.gelOn=!r.matches,s.inkOn=l(),c.enable((d()||O)&&n.glassSpill!==!1),c.setPower(v());let P=En.includes(+n.ctrlHeight)?+n.ctrlHeight:6;c.setHeight(P),s.setControlHeight&&s.setControlHeight(P),requestAnimationFrame(()=>c.layout(E,X(E))),p!==E&&(s.clear(),p=E),s.attach(E),z=null,ie=null,ne.syncScene(),D(),E===e.el?e.draw():E===t.el&&t.draw()},setMix(T){m=T,z=null,!T&&p&&p!==e.el&&p!==t.el&&(s&&s.detach(),p=null)},syncScene(){if(!p||!s)return;if(m&&p===m.el)return fe();let T=p===e.el,O=T?e.keyLayout():null,E=Oa({kind:T?"pad":"xy",keys:O&&O.keys,sig:O?O.sig:"xy",el:p,glass:!!n.glass,hdr:Me(),spill:v(),look:n.lightLook,gel:T&&e.piano?.4:1,glassLook:b()});E.sig!==ie&&(ie=E.sig,K=E,s.setExtended&&s.setExtended(te()),s.setScene(E))},press(T,O,E,C){if(!(!s||!p||!s.press)&&(s.press(T,O,E,C),C==="down"&&d()&&y())){let P=$e();c.emit({r:P[0],g:P[1],b:P[2]},.45,O,E)}},tilt(T,O){s&&(T===null?s.resetTilt():s.setTilt(T,O))},touch(T,O,E,C,P,ee,ce,re){if(!p||!l())return;D();let Ee={part:T,lane:ce,pc:re,x:O,y:E};if(ee==="down")s.burst(O,E,S(Ee,H("down",.8,"f"+Math.round(O*24))),.5,5,.7);else if(C||P){let kt=B()?1:Math.min(1,Math.max(.25,Math.hypot(C,P)*45)),Ae=H("move",.8,"m"+T+(ce||0))*kt*(!B()&&n.fluidZone==="keys"?.7:1);s.splat(O,E,C,P,S(Ee,Ae),1)}},note(T,O,E,C,P=.8,ee){if(!p||i.ui.view!=="pattern"||!l())return;D();let ce={part:T,lane:C,pc:ee,x:O,y:E};if(T==="drum"){let Ae="d"+C;if(C===0)s.burst(O,E,S(ce,H("kick",P,Ae)),1.2*P+.4,7,1.1),s.pulse(.8);else if(C===1){let dt=S(ce,H("snare",P,Ae));s.splat(O,E,.03,-.004,dt,.8),s.splat(O,E,-.03,-.004,dt,.8)}else if(C===2)s.splat(O,E,(Math.random()-.5)*.01,-.02,S(ce,H("hat",P,Ae)),.35);else{let dt=S(ce,H("perc",P,Ae));for(let et=0;et<3;et++){let ft=et/3*Math.PI*2;s.splat(O+Math.cos(ft)*.03,E+Math.sin(ft)*.03,-Math.sin(ft)*.025,Math.cos(ft)*.025,dt,.5)}}return}let re=f().rise,Ee=n.fluidZone==="keys",kt=H("note",P,Ee?T+Math.round(O*24):T)*(!B()&&e.hasStrokes(T)?.5:1);s.splat(O,E,(Math.random()-.5)*re*.8,-re,S(ce,kt),.9)},stir(T,O,E,C,P,ee){if(!p||i.ui.view!=="tweaks"||!l())return;let ce=T==="bass"||T==="lead",re={part:ce?T:"drum",lane:ce?0:+T.slice(1),x:O,y:E};s.splat(O,E,C,P,S(re,ee?H("stir",1):H("stir",0)),ee?1:.7)},level(T){if(!(!p||!T.trig||!l()))for(let O=0;O<T.trig.length;O+=4)T.trig[O]!==0||T.trig[O+1]!==0||(s.pulse(.6),f().shake&&s.push(.5,1.02,0,-.05,5))},keyLights(T){s&&s.setKeyLights&&p===e.el&&s.setKeyLights(T)},mixLevels(T){T&&pe(T)},preview(){if(!p)return;if(!l()){G();return}if(D(),m&&p===m.el){let E=C=>({d:[0,1,2,3].map(P=>P===C?1:.01),bass:C===4?1:.01,lead:C===5?1:.01});for(let C=0;C<6;C++)setTimeout(()=>pe(E(C)),C*140);setTimeout(()=>pe({d:[1,.9,.8,.9],bass:1,lead:1}),950),setTimeout(()=>pe({d:[.01,.01,.01,.01],bass:.01,lead:.01}),1500);return}let T=i.ui.part,O=(E,C)=>setTimeout(C,E);if(T==="drum")[[0,0],[180,2],[360,1],[540,2],[720,0],[820,3],[900,2],[1080,1],[1260,0],[1350,3]].forEach(([E,C])=>O(E,()=>ne.note("drum",(C+.5)/4,.55+Math.random()*.25,C,.95)));else{let E=e.piano?e.pianoLayout().keys.filter(P=>!P.black):e.columns(),C=E.length;for(let P=0;P<8;P++){let ee=Math.min(C-1,Math.round(P/7*(C-1))),ce=E[ee],re=e.piano?(ce.pos+.5)/e.pianoLayout().whites:(ee+.5)/C;O(P*150,()=>ne.note(T,re,.8-P*.05,0,.95,e.pitchClass(ce.deg,ce.acc)))}O(1250,()=>{s.pulse(1),f().shake&&s.push(.5,1.02,0,-.06,5)})}}};r.addEventListener&&r.addEventListener("change",()=>ne.place()),document.addEventListener("visibilitychange",()=>{s&&(document.visibilityState!=="visible"?s.stop():p&&(s.requestRender(),c.layout(p,X(p))))}),window.addEventListener("resize",()=>{p&&(c.layout(p,X(p)),m&&p===m.el&&(z=null,D(),ne.syncScene()))});let $e=()=>K&&K.accent||[.8,.9,.3];return ne}var po=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,fo=`#version 300 es
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
}`,mo=`#version 300 es
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
}`,vo=`#version 300 es
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
}`;var sa=11,Va=sa*4,go=96,Xa=24;function yo(i,e,t,s){let a=i.createShader(e);return i.shaderSource(a,t),i.compileShader(a),i.getShaderParameter(a,i.COMPILE_STATUS)||s.push(i.getShaderInfoLog(a)||"shader"),a}function bo(i,e,t,s,a){let o=i.createProgram();i.attachShader(o,yo(i,i.VERTEX_SHADER,e,s)),i.attachShader(o,yo(i,i.FRAGMENT_SHADER,t,s)),(a||[]).forEach((l,d)=>i.bindAttribLocation(o,d,l)),i.linkProgram(o),i.getProgramParameter(o,i.LINK_STATUS)||s.push(i.getProgramInfoLog(o)||"link");let r={},n=i.getProgramParameter(o,i.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let d=i.getActiveUniform(o,l);r[d.name.replace(/\[0\]$/,"")]=i.getUniformLocation(o,d.name)}return{p:o,u:r}}var ta=class{constructor(e){this.errors=[],this.canvas=document.createElement("canvas"),this.canvas.className="ghouls",this.canvas.setAttribute("aria-hidden","true"),e.insertBefore(this.canvas,e.firstChild),this.data=new Float32Array(go*Va),this.lost=!1,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.lost=!0}),this.canvas.addEventListener("webglcontextrestored",()=>{this.lost=!1,this.init()}),this.init()}init(){let e=this.canvas.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(this.gl=e,this.ok=!!e,!e)return;this.errors=[],this.night=bo(e,po,fo,this.errors,["aPos"]);let t=["aCorner","iRect","iPlate","iDoll","iAnimA","iAnimB","iAnimC","iColor","iPoseA","iPoseB","iPoseC","iPoseD"];if(this.dolls=bo(e,mo,vo,this.errors,t),this.errors.length){this.ok=!1;return}this.tri=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.tri),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),this.vaoNight=e.createVertexArray(),e.bindVertexArray(this.vaoNight),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.vaoDolls=e.createVertexArray(),e.bindVertexArray(this.vaoDolls),this.corner=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.corner),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.inst=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.inst),e.bufferData(e.ARRAY_BUFFER,this.data.byteLength,e.DYNAMIC_DRAW);for(let s=0;s<sa;s++)e.enableVertexAttribArray(1+s),e.vertexAttribPointer(1+s,4,e.FLOAT,!1,Va*4,s*16),e.vertexAttribDivisor(1+s,1);e.bindVertexArray(null),this.keyRects=new Float32Array(Xa*4),this.keyInfo=new Float32Array(Xa*4)}resize(e,t,s){let a=Math.max(1,Math.round(e*s)),o=Math.max(1,Math.round(t*s));(this.canvas.width!==a||this.canvas.height!==o)&&(this.canvas.width=a,this.canvas.height=o),this.scale=a/Math.max(e,1)}draw(e){let t=this.gl;if(!this.ok||this.lost||!t)return;let s=this.canvas.width,a=this.canvas.height,o=this.scale;t.viewport(0,0,s,a),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA);let r=this.night,n=r.u;t.useProgram(r.p),t.uniform2f(n.uRes,s,a),t.uniform1f(n.uScale,o),t.uniform1f(n.uTime,e.time);let l=e.pad||{x:-1e4,y:-1e4,w:1,h:1,r:0};t.uniform4f(n.uPad,l.x,l.y,l.w,l.h),t.uniform1f(n.uPadR,l.r),t.uniform1f(n.uStage,e.pad&&e.stage?1:0);let d=(e.keys||[]).slice(0,Xa);this.keyRects.fill(0),this.keyInfo.fill(0),d.forEach((h,f)=>{this.keyRects.set([h.x0,h.y0,h.x1,h.y1],f*4),this.keyInfo.set([h.black?1:0,h.lit||0,0,0],f*4)}),n.uKeys&&t.uniform4fv(n.uKeys,this.keyRects),n.uKeyInfo&&t.uniform4fv(n.uKeyInfo,this.keyInfo),t.uniform1f(n.uNKeys,d.length),t.uniform3f(n.uAccent,e.accent[0],e.accent[1],e.accent[2]),t.uniform1f(n.uWatch,e.watch),t.uniform1f(n.uBeat,e.beat),t.uniform1f(n.uCalm,e.calm?1:0),t.bindVertexArray(this.vaoNight),t.drawArrays(t.TRIANGLES,0,3);let c=Math.min(e.dolls,go);if(c>0){let h=this.dolls,f=h.u;t.useProgram(h.p),t.uniform2f(f.uRes,s,a),t.uniform1f(f.uScale,o),t.uniform1f(f.uTime,e.time),t.uniform1f(f.uFlicker,e.flicker),t.uniform1f(f.uWatch,e.watch),t.uniform1f(f.uCalm,e.calm?1:0),f.uMoon&&t.uniform3f(f.uMoon,.55,.7,.45),t.bindVertexArray(this.vaoDolls),t.bindBuffer(t.ARRAY_BUFFER,this.inst),t.bufferSubData(t.ARRAY_BUFFER,0,e.data,0,c*Va),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,c)}t.bindVertexArray(null)}destroy(){let e=this.gl;if(e){let t=e.getExtension("WEBGL_lose_context");t&&t.loseContext()}this.canvas.remove(),this.ok=!1}};var ae={PUMPKIN:0,VOODOO:1,GHOST:2,SKULL:3,MUMMY:4,FRANK:5,SKELETON:6},Cn=i=>10+i,ue={CAULDRON:20,SKULL:21,PUMPKIN:22,HEART:23,CRYSTAL:24,BAT_L:25,BAT_R:26,DIE:27,HOURGLASS:28,BROOM:29,COFFIN:30,WEB:31,POTION:32,VIALS:33,BOOK:34},ko=[[".top .logo",ue.CAULDRON,"fill"],[".top .tbtn.rec",ue.SKULL,"fill","rec"],[".top .tbtn.play",ue.PUMPKIN,"fill","play"],[".top .progress",-1,"plate"],[".top .chip.tempo",ue.HEART,"left","tempo"],[".top .chip:not(.tempo)",ue.CRYSTAL,"left"],[".parts .ptab",i=>Cn({drum:ae.PUMPKIN,bass:ae.FRANK,lead:ae.GHOST}[i.dataset.p]??ae.GHOST),"face","part"],[".inst .arrow:not(.dice)",(i,e)=>e===0?ue.BAT_L:ue.BAT_R,"fill"],[".inst .dice",ue.DIE,"fill","dice"],[".view .controls .dial",-1,"plate"],[".view .range",-1,"plate"],[".timeline .tbtn",(i,e)=>[ue.HOURGLASS,ue.BROOM,ue.COFFIN][e]??ue.COFFIN,"fill","tool"],[".timeline .tl",-1,"plate"],[".groups .grp",-1,"plate"],[".autobar .pill",-1,"plate"],[".faders .fader",-1,"plate"],[".faders .fader .m",-1,"plate"],[".mixknobs .dial",-1,"plate"],[".nav button",(i,e)=>[ue.WEB,ue.POTION,ue.VIALS,ue.BOOK][e]??ue.WEB,"nav","nav"]],xt=(i,e)=>i+Math.random()*(e-i),ra=(i,e,t)=>Math.max(e,Math.min(t,i)),Je=i=>(i=ra(i,0,1),i*i*(3-2*i)),Ms=(i,e,t)=>i+(e-i)*t,na=(i,e,t)=>[Ms(i[0],e[0],t),Ms(i[1],e[1],t),Ms(i[2],e[2],t)],aa={[ae.PUMPKIN]:[[-.42,-.66,.08],[.42,-.66,.08]],[ae.VOODOO]:[[-.64,-.2,.04],[.64,-.2,.04]],[ae.GHOST]:[[-.6,-.12,.05],[.6,-.12,.05]],[ae.SKULL]:[[-.4,-.6,.12],[.4,-.6,.12]],[ae.MUMMY]:[[-.5,-.38,.4],[.5,-.38,.4]],[ae.FRANK]:[[-.46,-.78,.08],[.46,-.78,.08]],[ae.SKELETON]:[[-.32,-.6,.06],[.32,-.6,.06]]},$a=["hip","twist","ll","lr","fxl","fxr","lz","crouch","travel","roll","spin","bounce","head","bend"],On={[ae.PUMPKIN]:[1,.1],[ae.VOODOO]:[.95,.4],[ae.GHOST]:[1,.3],[ae.SKULL]:[.9,.3],[ae.MUMMY]:[.9,.45],[ae.FRANK]:[.85,.5],[ae.SKELETON]:[.9,.35]},j=(i,e,t={})=>{let s={hl:i,hr:e};for(let a of $a)s[a]=t[a]||0;return t.lz===void 0&&(s.lz=1),s},it=(i,e,t)=>{let s={hl:na(i.hl,e.hl,t),hr:na(i.hr,e.hr,t)};for(let a of $a)s[a]=Ms(i[a],e[a],t);return s},Ss=(i,e)=>t=>{let s=i.length,a=(t%e+e)%e,o=s-1;for(let l=0;l<s;l++)i[l][0]<=a&&(o=l);let r=i[o][0];r>a&&(r-=e);let n=o+1<s?i[o+1][0]:i[0][0]+e;return n<=r&&(n+=e),it(i[o][1],i[(o+1)%s][1],Je((a-r)/(n-r)))},ia=(i,e,{rate:t=2,lift:s=.5,lz:a=1,bounce:o=.05}={})=>{let r={...i,hl:i.hl.slice(),hr:i.hr.slice()},n=e*t,l=n-Math.floor(n),d=l<.5?Math.sin(Math.PI*l/.5):0,c=Math.floor(n)%2===0;return r.ll=Math.max(r.ll,c?s*d:0),r.lr=Math.max(r.lr,c?0:s*d),s&&(r.lz=a),r.crouch+=o*(1-d),r},Bn=(i,e)=>{let t=i.length,s=Math.floor(e)%t,a=e-Math.floor(e);return it(i[(s+t-1)%t],i[s],Je(a/.22))},xo=j([-.05,.18,.36],[.78,.48,.1],{roll:.32,head:-.06,twist:-.2,bend:.9}),Ts=(i,e)=>{let t=i-Math.floor(i);return t<e?Math.sin(Math.PI*t/e):0},In=i=>Math.tanh(2.5*i)/Math.tanh(2.5),oa=(i,e,t=.1,s=2,a={})=>{let o=Math.PI*2*s*i;return j([e[0]-.12+t*Math.cos(o),e[1]+t*Math.sin(o),e[2]],[e[0]+.12-t*Math.cos(o),e[1]-t*Math.sin(o),e[2]],{bend:1,...a})},Wt={passinho:{name:"Passinho do Jamal",weight:4,at(i){let e=j([-.12,-.2,.5],[.48,-.45,.15],{bend:1,crouch:.22}),t=j([-.8,-.45,-.05],[-.15,-.15,.45],{bend:1,crouch:.25,twist:-.75,hip:.08}),s=j([-.5,-.12,.38],[.5,-.3,.38],{bend:1,crouch:.2,roll:.04}),a=j([-.5,-.3,.38],[.5,-.12,.38],{bend:1,crouch:.2,roll:-.04}),o=j([.05,-.22,.48],[-.05,-.06,.48],{bend:1,crouch:.18,twist:1,hip:-.08,fxl:.02,fxr:-.02}),r=j([.05,-.08,.48],[-.05,-.2,.48],{bend:1,crouch:.2,twist:.95,hip:-.08}),n=j([-.6,-.2,.3],[.55,-.25,.3],{bend:1,crouch:.22,twist:.3}),l=Ss([[0,e],[.6,t],[1.2,s],[1.6,a],[2,o],[2.5,r],[2.9,o],[3.3,n]],4)(i),d=i*2,c=d-Math.floor(d),h=c<.55?Math.sin(Math.PI*c/.55):0,f=Math.floor(d)%2===0;return l.ll=Math.max(l.ll,f?.55*h:0),l.lr=Math.max(l.lr,f?0:.55*h),l.fxl+=f?-.06*h:0,l.fxr+=f?0:.06*h,l.crouch+=.06*(1-h),l.bounce=-.03*h,l}},rat:{name:"Danse du rat",weight:3,at(i){let e=j([.3,-.18,.46],[.66,-.3,.26],{bend:1,spin:-.6,twist:-.25,crouch:.2,roll:-.1}),t=j([-.3,-.05,.45],[.3,-.05,.45],{bend:1,crouch:.16,head:.03}),s=j([-.66,-.15,.2],[.55,.1,.25],{bend:1,crouch:.22,roll:.08}),a=Ss([[0,e],[.55,t],[1.05,s],[1.5,t]],2)(i);return ia(a,i,{rate:4,lift:.6,lz:-.6,bounce:.05})}},dakoto:{name:"Da Koto Nai",weight:2,at(i){let e=j([-.82,.05,.12],[.82,.05,.12],{bend:1,crouch:.28,fxl:-.1,fxr:.1}),t=j([-.12,-.32,.48],[.55,.42,.28],{bend:1,crouch:.2,spin:.45,roll:.06}),s=j([-.75,-.55,.22],[.75,-.55,.22],{bend:1,crouch:.42,fxl:-.18,fxr:.18}),a;return i<1.5?a=oa(i,[0,-.25,.48],.1,2,{crouch:.2}):i<2.5?a=it(oa(1.5,[0,-.25,.48],.1,2,{crouch:.2}),e,Je((i-1.5)/.35)):i<5.5?(a=it(e,t,Je((i-2.5)/.35)),a.head=.05*Ts(i,.5)):i<6.5?a=it(t,oa(i,[0,-.25,.48],.1,2,{crouch:.2}),Je((i-5.5)/.3)):a=it(oa(6.5,[0,-.25,.48],.1,2,{crouch:.2}),s,Je((i-6.5)/.3)),ia(a,i,{rate:2,lift:.2,bounce:.08})}},floss:{name:"Floss",weight:2,at(i){if(i>7)return xo;let e=In(Math.sin(Math.PI*2*i)),t=Math.cos(Math.PI*2*i);return j([-.16+.62*e,-.66,.34*t],[.16+.62*e,-.66,-.34*t],{hip:-.2*e,twist:.18*e,crouch:.1+.06*Math.abs(e),bounce:.03*Math.abs(e),fxl:-.04*e,fxr:-.04*e})}},riri:{name:"RiRiRi : Joyeux Halloween",weight:3,at(i){let e=j([-.32,.32,.46],[.32,.32,.46],{bend:1,crouch:.15,roll:.1}),t=j([-.1,-.2,.5],[.3,-.1,.45],{bend:1,spin:1.3,ll:1,crouch:.1}),s=j([-.55,.55,.3],[.55,.15,.3],{bend:1,crouch:.2}),a=j([-.55,.15,.3],[.55,.55,.3],{bend:1,crouch:.2}),o=j([-.6,.85,.2],[.6,.85,.2],{bend:.4,bounce:-.08}),r=j([-.85,-.2,.3],[.4,.15,.35],{bend:.8,crouch:.42,roll:-.12}),n=j([-.2,-.18,.5],[.2,-.18,.5],{bend:1,crouch:.18}),l=j([-.3,-.45,.3],[.06,.12,.5],{bend:1,roll:.2,crouch:.15}),d=Ss([[0,e],[1,t],[2,s],[2.5,a],[3,o],[4,r],[5.5,n],[6.5,l],[7.2,o]],8)(i);return i>=5.5&&i<6.5&&(d.travel=.12*Math.sin(Math.PI*2*(i-5.5))),ia(d,i,{rate:2,lift:.32,bounce:.05})}},nervy:{name:"Danse nerveuse",weight:2,at(i){let e=j([.1,-.3,.46],[.72,.72,.15],{bend:.6,crouch:.2}),t=j([-.3,-.1,.45],[.3,-.2,.8],{bend:.5,crouch:.22,roll:.15,spin:-.3}),s=j([-.4,.15,.35],[.4,.15,.35],{bend:1,crouch:.25}),a=Ss([[0,e],[2,t],[4.5,s],[6,e],[7,s]],8)(i),o=Math.sin(Math.PI*2*6*i);if(a.hl[0]+=.03*o,a.hl[1]+=.02*Math.sin(Math.PI*2*7*i),a.hr[0]-=.03*o,a.hip+=.03*o,i>=4.5&&i<6){let r=Math.sin(Math.PI*2*4*i);a.fxl=.06*r,a.fxr=-.06*r}return ia(a,i,{rate:4,lift:.2,bounce:.03})}},ambiguous:{name:"Danse d\u2019Ambiguous Kim",weight:2,len:32,at(i){let e=a=>{let o=j([-.2,-.78,.3],[.2,-.78,.3],{crouch:.05,fxl:.03,fxr:-.03,head:.04,bounce:.02}),r=j([-.3,-.62,.22],[.3,-.62,.22],{bend:1,head:.06,bounce:-.03}),n=j([-.3,-.6,.22],[.3,-.6,.22],{bend:1,crouch:.14,head:.04}),l=j([-.34,-.5,.2],[.34,-.5,.2],{bend:1,ll:1,roll:.05,bounce:-.08}),d=j([-.36,-.66,.12],[.36,-.66,.12],{bend:.3,lr:.6,lz:-1,fxr:.14,crouch:.1}),c=j([-.12,-.3,.46],[.12,-.3,.46],{bend:1,ll:1,bounce:-.07}),h=j([-.36,-.62,.15],[.36,-.62,.15],{bend:.3,crouch:.2,fxr:.15}),f=j([-.46,-.72,.14],[.46,-.72,.14],{crouch:.38,fxl:-.08,fxr:.34,hip:-.12,travel:-.1,roll:.06,bounce:.06}),p=j([.16,-.15,.48],[-.16,-.1,.46],{bend:1,twist:.15,crouch:.2,fxr:.18}),m=j([-.08,1.1,.1],[.08,1.1,.1],{bend:.7,ll:.8,bounce:-.08}),v=j([-.48,.42,.1],[.48,.42,.1],{bend:1,ll:1,bounce:-.08}),b=j([-.62,.95,.1],[-.2,1,-.05],{bend:.4,ll:.6,roll:.15}),y=j([-.22,.9,.1],[.22,.9,.1],{bend:.8,ll:1,bounce:-.08}),x=j([-.25,0,.45],[.58,1,.05],{bend:.6,ll:.8,roll:-.12}),S=j([-.08,1.1,.1],[.08,1.1,.1],{bend:.7,bounce:-.05}),R=j([-.1,-.3,.45],[.1,-.26,.45],{bend:.8,crouch:.06});return Ss([[0,o],[.35,o],[.5,r],[1,n],[1.5,l],[2,d],[2.5,c],[3,h],[3.3,f],[4.75,f],[5,p],[5.25,m],[5.75,v],[6,b],[6.5,y],[6.75,v],[7,x],[7.25,S],[7.5,R]],8)(a)},t;if(i<16)t=e(i%8);else if(i<21)t=e(i-16);else if(i<31){let a=i-21,o=Ts(a,.55),r=.06*Math.sin(Math.PI*4*a),n=j([-.14-r,1.12,.04],[.16+r,1.1,.04],{bend:.85,spin:-.6,head:-.04,roll:.06});t=it(e(5),n,Je(a/.5)),t.ll=.95*o,t.lz=.8,t.bounce=.03*(1-o)-.09*o,t.crouch=.08+.12*(1-o)}else t=it(j([-.14,1.12,.04],[.16,1.1,.04],{bend:.85,spin:-.6}),j([-.2,-.78,.3],[.2,-.78,.3],{crouch:.05,head:.04}),Je((i-31)/.8));let s=i<21?i%8:0;if(s>=3.3&&s<4.75){let a=Ts(s,.5);t.crouch+=.05*a,t.bounce+=.04*a}return t}},bemsolto:{name:"Passo bem solto",weight:1,at(i){if(i>7)return xo;let e=Math.sin(Math.PI*i),t=Ts(i,.5),s=Math.floor(i)%2?-1:1;return j([-.58-.1*e,-.3+.28*t*(s>0?1:.3),.2],[.58-.1*e,-.3+.28*t*(s<0?1:.3),.2],{ll:s<0?.8*t:0,lr:s>0?.8*t:0,fxl:s<0?-.12*t:0,fxr:s>0?.12*t:0,crouch:.15+.12*(1-t),twist:.3*e,hip:.1*e,roll:.12*e,travel:.1*e,bounce:.06*t,bend:.5})}},slick:{name:"Slick back",weight:1,at(i){let e=i*2,t=Math.floor(e)%2===0,s=Math.sin(Math.PI*(e-Math.floor(e))),a=Math.sin(Math.PI*i/4);return j([-.44-.06*a,-.5+.05*s,.12],[.44-.06*a,-.48+.05*s,.12],{ll:t?.9*s:0,lr:t?0:.9*s,lz:-1.6,crouch:.14,travel:.28*a,hip:.05*(t?1:-1)*s,twist:-.08*a,roll:-.05*a,head:.04,bend:.3})}},goule:{name:"Danse de la goule",weight:1,at(i){let e=[j([-.3,-.06,.26],[.3,-.06,.26],{roll:.25,twist:.2,crouch:.15,bend:1}),j([-.8,-.22,.05],[.26,-.58,.18],{roll:-.3,twist:-.25,ll:.5,fxl:-.1,crouch:.25,bend:1}),j([-.42,.28,.16],[.42,.28,.16],{roll:.12,head:.04,bend:1}),j([.18,-.6,.3],[-.18,-.6,.32],{roll:-.22,twist:.3,lr:.5,fxr:.1,crouch:.2,bend:1})];return Bn(e,i*2)}},zombies:{name:"Danse des zombies",weight:1,at(i){let e=i%4,t=e<2?-1:1,s=e%2,a=Math.max(0,Math.sin(Math.PI*2*s))*.08,o=Ts(s*2,.7);return j([.5*t-.22,-.12+a,.42],[.5*t+.22,-.1+a,.46],{roll:.3*t,hip:.1*t*Math.sin(Math.PI*s),twist:.2*t,bounce:a*.6,bend:.15,ll:t<0?.55*o:0,lr:t>0?.55*o:0,lz:-.8,crouch:.12,travel:.12*t*Je(s)})}}};function la(){let i=Object.keys(Wt),e=i.reduce((s,a)=>s+Wt[a].weight,0),t=Math.random()*e;for(let s of i)if(t-=Wt[s].weight,t<=0)return s;return i[0]}var is=class{constructor(e,t){this.type=e,this.seed=t,this.sq=0,this.sqv=0,this.sqT=0,this.hx=0,this.hy=0,this.hvx=0,this.hvy=0,this.sw=0,this.swv=0,this.lx=0,this.ly=0,this.ltx=0,this.lty=0,this.blink=0,this.blinkAt=performance.now()+xt(800,4e3),this.mouth=0,this.mouthT=0,this.glow=0,this.glowT=0,this.scare=0,this.reach=0,this.reachT=0,this.held=0,this.color=[1,.55,.15],this.twitchAt=performance.now()+xt(3e3,12e3),this.ink=0,this.dance=null,this.spot=0,this.rise=1,this.swapTo=null;let s=aa[e]||aa[ae.PUMPKIN];this.p=j(s[0].slice(),s[1].slice())}press(e=1){this.held++,this.dance=null,this.sqT=.32*e,this.sqv-=2.5*e,this.mouthT=1,this.scare=1,this.hvy-=3.5*e,this.hvx+=xt(-2.5,2.5)*e,this.swv+=xt(-3,3)*e}release(){this.held=Math.max(0,this.held-1),this.held||(this.sqT=0,this.mouthT=0,this.sqv-=3.5,this.hvx+=xt(-2,2))}sing(e=.8,t){this.mouth=Math.max(this.mouth,Math.min(1,.45+e*.6)),this.glow=Math.max(this.glow,Math.min(1,e)),this.sqv-=2.2*e,this.hvy+=1.5*e,t&&(this.color=t)}startle(e){e<=.02||(this.scare=Math.max(this.scare,e),this.sqv-=3*e,this.hvx+=xt(-3,3)*e,this.hvy+=2*e)}step(e,t,s,a){let o=s?.5:1,r=this.sqT+(s?0:.018*Math.sin(t/700+this.seed*9)),n=aa[this.type]||aa[ae.PUMPKIN],l=s?0:.04*Math.sin(t/900+this.seed*7),d=j([n[0][0],n[0][1]+l,n[0][2]],[n[1][0],n[1][1]-l,n[1][2]]);if(this.reach>.01){let[y,x]=On[this.type]||[.95,.4];d=it(d,j([-y,x,.16],[y,x,.16]),this.reach)}if(this.swapTo!==null&&this.outT!==void 0){let y=this.outT,x=Math.sin(t/85);y<.35?d=it(d,j([-.42,-.55,.1],[.62+.14*x,.78,.18],{roll:.06*x,bend:.4}),Je(y/.08)):d=it(d,j([-.55-.08*x,.85,.1],[.55-.08*x,.85,.1],{roll:.16*Math.sin(t/70),hip:.08*x}),Je((y-.35)/.12))}if(this.inT!==void 0){let y=this.inT,x=Math.sin(t/75);y<.6?d=j([-.45,-.5,.1],[.28+.1*x,1.05,.12],{roll:y>.35?.12*Math.sin(t/160):0}):y<.82?d=j([-.72,.82,.1],[.72,.82,.1],{spin:Math.PI*2*Je((y-.6)/.2)}):d=it(j([-.72,.82,.1],[.72,.82,.1],{roll:.18*x}),d,Je((y-.82)/.18))}let c=0;if(this.dance&&!s){let y=this.dance,x=a-y.start;if(x>=y.len||x<-1)this.dance=null;else if(x>=0){let S=Wt[y.name].at(x),R=Je(Math.min(x/.25,(y.len-x)/.25,1));d=it(d,S,R),r+=S.bounce*R,c=R}}let h=1-Math.exp(-e*22),f=this.p;f.hl=na(f.hl,d.hl,h),f.hr=na(f.hr,d.hr,h);for(let y of $a)y!=="spin"&&y!=="bounce"&&(f[y]=Ms(f[y],d[y],h));f.spin=d.spin,this.spot+=(c-this.spot)*(1-Math.exp(-e*6)),this.sqv+=(-(this.sq-r)*340-this.sqv*15)*e,this.sq=ra(this.sq+this.sqv*e,-.35,.5),this.hvx+=(-this.hx*180-this.hvx*9)*e,this.hx+=this.hvx*e,this.hvy+=(-(this.hy-f.head)*220-this.hvy*10)*e,this.hy+=this.hvy*e,this.hx=ra(this.hx,-.25,.25),this.hy=ra(this.hy,-.2,.2);let p=s?0:.1*Math.sin(t/1300+this.seed*5)*o;this.swv+=(-(this.sw-p)*90-this.swv*7)*e,this.sw+=this.swv*e;let m=1-Math.exp(-e*10);this.lx+=(this.ltx-this.lx)*m,this.ly+=(this.lty-this.ly)*m,t>this.blinkAt&&(this.blinkStart=t,this.blinkAt=t+xt(1800,6e3)*(s?1.6:1));let v=this.blinkStart?(t-this.blinkStart)/140:9;this.blink=v<1?Math.sin(v*Math.PI):0,!s&&t>this.twitchAt&&(this.twitchAt=t+xt(6e3,16e3),this.hvx+=xt(-4,4),this.swv+=xt(-4,4));let b=1-Math.exp(-e*(this.mouthT>this.mouth?22:7));this.mouth+=(Math.max(this.mouthT,0)-this.mouth)*b,this.glow=Math.max(this.glowT,this.glow*Math.exp(-e*3.2)),this.scare*=Math.exp(-e*3.5),this.reach+=(this.reachT-this.reach)*(1-Math.exp(-e*8))}};function Qa(i){if(i=(i||"").trim(),i.startsWith("color("))return i.match(/[\d.]+/g).map(Number).slice(-3).map(s=>s>1?s/255:s);if(i.startsWith("#"))return(i.length===4?i.slice(1).split("").map(s=>s+s):[i.slice(1,3),i.slice(3,5),i.slice(5,7)]).map(s=>parseInt(s,16)/255);let e=i.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[1,.5,.1]}function wo(i,e){if(i==="fill"){let t=Math.min(e.height,e.width)*1.02;return{x:e.left+e.width/2,y:e.top+e.height/2,s:t}}if(i==="left"){let t=e.height*.8;return{x:e.left+e.height*.38,y:e.top+e.height/2,s:t}}if(i==="face"){let t=e.height*.9;return{x:e.left+e.height*.5,y:e.top+e.height/2,s:t}}if(i==="nav"){let t=Math.min(e.height*.7,36);return{x:e.left+e.width/2,y:e.top+t*.55+2,s:t}}return null}var Ja=sa*4,Fn=[ae.PUMPKIN,ae.SKULL,ae.GHOST,ae.VOODOO],So=[ae.GHOST,ae.PUMPKIN,ae.SKULL,ae.VOODOO,ae.MUMMY,ae.FRANK,ae.SKELETON],To=9e3,Hn=112,ca=i=>(i=Math.max(0,Math.min(1,i)),i*i*(3-2*i)),Nn=[[0,0,1],[0,1,0],[1,0,0],[-1,0,0],[0,-1,0],[0,0,-1]];function zn(i){let e=Nn[i-1],t=[[1,0,0],[0,1,0],[0,0,1]].filter(c=>!c.some((h,f)=>h&&e[f])),s=Math.random()<.5?-1:1,a=Math.random()<.5?-1:1,o=e.map((c,h)=>c+.55*s*t[0][h]+.42*a*t[1][h]),r=Math.hypot(...o),n=o[0]/r,l=o[1]/r,d=o[2]/r;return[Math.asin(-n),Math.atan2(-l,d)]}function Mo(i,{pad:e,app:t,fx:s}){let a=()=>{let M=s&&s();return M&&M.fluid&&M.fluid.ok?M.fluid:null},o=matchMedia("(prefers-reduced-motion: reduce)"),r=null,n=0,l=!1,d=null,c=!0,h=[],f=new Map,p=[],m="",v=[],b=null,y={x:-1,y:-1,t:-1e9},x=performance.now(),S=0,R=new Map,B=new Map,H=0,ie=-1,K=!1,D=null,X={tick:0,at:0,msPerTick:6e4/11520},z=0,J=-1,N=null,fe=null,G=0,U=-1,oe=()=>Math.min(window.devicePixelRatio||1,1.75),pe=oe(),te=16,Me=0,ne=0,$e=0,T=0,O=0,E=new Float32Array(128*Ja),C=1,P={drum:[1,.5,.1],bass:[.7,.3,1],lead:[.45,1,.3],rec:[1,.15,.12],accent:[1,.5,.1],play:[1,.55,.1]},ee=()=>{let M=getComputedStyle(t);for(let F of["drum","bass","lead","rec"])P[F]=Qa(M.getPropertyValue("--"+F));P.accent=Qa(M.getPropertyValue("--accent"))},ce=()=>t.getBoundingClientRect(),re=()=>C++*.6180339%1;function Ee(){c=!1;let M=[];for(let[F,I,A,Y]of ko)t.querySelectorAll(F).forEach((se,Ce)=>{let _e=typeof I=="function"?I(se,Ce):I,Oe=f.get(se);_e>=0&&(!Oe||Oe.type!==_e)&&(Oe=new is(_e,re()),Oe.state=0,Oe.act=0,Oe.actT=0,f.set(se,Oe));let mt=parseFloat(getComputedStyle(se).borderTopLeftRadius)||12;M.push({el:se,kind:A,tag:Y,doll:_e>=0?Oe:null,radius:mt,flash:0,plate:!se.closest(".gpu-host")})});h=M}let kt=M=>{let F=null;for(let I of h)I.el.contains(M)&&(!F||F.el.contains(I.el))&&(F=I);return F},Ae=null,dt=()=>{let M=i.settings.hwCast;return Array.isArray(M)&&M.length===4?M.slice():Fn.slice()};function et(){let M=e.keyLayout(),F=M.sig.startsWith("piano");return Ae||(Ae=dt()),M.sig!==m&&(m=M.sig,p=M.keys.map((I,A)=>new is(e.part==="drum"?Ae[A%4]:F&&I.cut?ae.SKULL:So[A%So.length],re())),N&&N.classList.remove("show")),v=M.keys,F}let ft=(M,F)=>{for(let I=v.length-1;I>=0;I--){let A=v[I];if(A.cut&&M>=A.x0&&M<A.x1&&F>=A.y0&&F<A.y1)return I}for(let I=0;I<v.length;I++){let A=v[I];if(!A.cut&&M>=A.x0&&M<A.x1&&F>=A.y0&&F<A.y1)return I}return-1},Vt=(M,F,I,A,Y)=>{let se=(M.x1-M.x0)*A;if(e.part==="drum")return{y:.86,s:Math.min(se*1.02,Y*.38)};if(I&&M.cut){let _e=Math.min(se*1.25,Y*.15,46);return{y:M.y1-6/Y,s:_e}}let Ce=Math.min(se*1.3,Y*.24,74);return{y:1-24/Y,s:Ce}};function Rs(M,F,I,A){if(!l)return;et(),va(null,F,I);let Y=B.get(M);if(A==="up"||A==="cancel"){Y!==void 0&&p[Y]&&(p[Y].release(),p[Y].reachT=0),B.delete(M);return}let se=ft(F,I);if(se!==Y&&(Y!==void 0&&p[Y]&&(p[Y].release(),p[Y].reachT=0),se>=0&&p[se].press(A==="down"?1:.6),se>=0?B.set(M,se):B.delete(M)),se>=0){let Ce=p[se],_e=e.el.getBoundingClientRect(),Oe=Vt(v[se],se,e.piano,_e.width,_e.height),mt=Oe.y-Oe.s/_e.height,wt=Math.max(0,Math.min(1,(mt-I)/.25));Ce.reachT=wt,Ce.sqT=wt>.1?-.22*wt:.32}}function ma(M,F,I,A,Y=.8){if(!l)return;et();let se=M==="drum"?A:ft(Math.min(.999,Math.max(0,F)),Math.min(.999,Math.max(0,I)));if(se<0&&M!=="drum"){let _e=1e9;v.forEach((Oe,mt)=>{let wt=Math.abs((Oe.x0+Oe.x1)/2-F);!Oe.cut&&wt<_e&&(_e=wt,se=mt)})}let Ce=p[se];Ce&&Ce.sing(Y,P[M]||P.accent)}let At=M=>K?X.tick/96+(M-X.at)/(X.msPerTick*96):M/(6e4/Hn);function Xt(M,F,I){let A=Wt[F].len||8;for(let Y of M)Y.dance={name:F,start:I,len:A};fe={dolls:M,name:F,until:I+A},N||(N=document.createElement("div"),N.className="hw-dance",t.append(N)),N.textContent="\u266A "+Wt[F].name}function Es(M){if(!i.settings.hwRelay||e.part!=="drum"||i.ui.view!=="pattern"||o.matches||p.length!==4||!Ae||p.some(Y=>Y.swapTo!==null||Y.rise<1))return;let F=!1;if(K){let Y=Math.floor(At(M)/4);Y!==U&&(U=Y,F=Y>0&&Y%8===0)}else M>G&&(F=G>0,G=M+25e3+Math.random()*2e4);if(!F)return;let I=[ae.PUMPKIN,ae.VOODOO,ae.GHOST,ae.SKULL,ae.MUMMY,ae.FRANK,ae.SKELETON].filter(Y=>!Ae.includes(Y)),A=[0,1,2,3].filter(Y=>!p[Y].dance&&!p[Y].held);!I.length||!A.length||(p[A[Math.floor(Math.random()*A.length)]].swapTo=I[Math.floor(Math.random()*I.length)])}function No(M){if(o.matches||!p.length||i.ui.view!=="pattern")return;let F=At(M);if(K){let I=Math.floor(F/4);if(I!==J&&(J=I,I%4===2&&!p.some(A=>A.dance)&&Math.random()<.75)){let A=p.filter(Ce=>!Ce.held&&Ce.swapTo===null&&Ce.inT===void 0),Y=Math.min(A.length,1+Math.floor(Math.random()*3)),se=A.sort(()=>Math.random()-.5).slice(0,Y);se.length&&Xt(se,la(),I*4)}}else if(M>z){if(z){let I=p.filter(A=>!A.held&&!A.dance&&A.swapTo===null&&A.inT===void 0);I.length&&M-x>2500&&Xt([I[Math.floor(Math.random()*I.length)]],la(),Math.ceil(F))}z=M+15e3+Math.random()*15e3}}function va(M,F,I){let A=ce();if(M)y.x=M.clientX-A.left,y.y=M.clientY-A.top;else{let Y=e.el.getBoundingClientRect();y.x=Y.left-A.left+F*Y.width,y.y=Y.top-A.top+I*Y.height}y.t=performance.now(),x=y.t}let si=M=>{if(!l)return;va(M);let F=kt(M.target),I=[];if(F){F.flash=1;let A=F.doll;if(A){if(A.press(.8),I.push(A),(A.type===ue.DIE||A.type===ue.BOOK||A.type===ue.WEB)&&(A.act=0,A.actT=1),A.type===ue.DIE){let Y=A.face||1;for(;Y===(A.face||1);)Y=1+Math.floor(Math.random()*6);let[se,Ce]=zn(Y),_e=()=>(Math.random()<.5?-1:1)*Math.PI*2*(1+Math.floor(Math.random()*2));A.rollFrom=[A.rollA??.6,A.rollB??-.5],A.rollTo=[se+_e(),Ce+_e()],A.rollT=0,A.face=Y}A.type===ue.HOURGLASS&&(A.actT=A.actT>.5?0:1),A.type===ue.COFFIN&&(A.actT=1)}}R.set(M.pointerId,I);for(let A of h){if(!A.doll||A===F||!A.pos)continue;let Y=Math.hypot(A.pos.x-y.x,A.pos.y-y.y);A.doll.startle(Math.max(0,1-Y/150)*.6)}},ai=M=>{l&&R.has(M.pointerId)&&va(M)},As=M=>{let F=R.get(M.pointerId);if(F){for(let I of F)I.release(),I.type===ue.COFFIN&&setTimeout(()=>{I.actT=0},450);R.delete(M.pointerId)}};function zo(M){if(n=0,!l||!r)return;let F=Math.min(.05,Me?(M-Me)/1e3:1/60);Me&&(te=te*.94+(M-Me)*.06,M<O?ne=0:te>18?++ne>45&&pe>1&&(pe=Math.max(1,pe*.85),ne=0):(ne=Math.max(0,ne-1),te<15&&pe<oe()&&(pe=Math.min(oe(),pe+.002)))),Me=M,c&&Ee(),M-T>500&&(ee(),T=M);let I=o.matches,A=p.some(Z=>Z.dance||Z.swapTo!==null||Z.rise<1),Y=M-x<1500||K||R.size||B.size||A;if($e++,!Y&&$e%2){_s();return}let se=ce();r.resize(se.width,se.height,pe);let Ce=M-x;S+=((Ce>To&&!A?1:0)-S)*(1-Math.exp(-F*(Ce>To?.8:6))),H*=Math.exp(-F*6);let _e=.5+.5*Math.sin(M/90)*Math.sin(M/37+1.3)*(I?.3:1);No(M),Es(M);let Oe=At(M),mt=0,wt=(Z,ze,Ge,xe,He,Ue,V)=>{let _=mt*Ja;if(E.set(Z,_),E.set(ze,_+4),xe&&Ge){let Le=xe.p;E.set([Ge.x,Ge.y,Ge.s,xe.type],_+8),E.set([xe.sq,xe.hx,xe.hy,xe.sw],_+12),E.set([xe.lx,xe.ly,xe.blink,He],_+16),E.set([xe.glow,xe.scare,xe.seed,xe.type>=20?xe.act:xe.type<10?xe.p.bend:xe.reach],_+20),E.set([Ue[0],Ue[1],Ue[2],V],_+24);let rt=xe.extra||Le.hl;E.set([rt[0],rt[1],rt[2],Le.hip],_+28),E.set([Le.hr[0],Le.hr[1],Le.hr[2],Le.twist],_+32),E.set([Le.ll,Le.lr,Le.roll,xe.ink],_+36),E.set([Le.fxl,Le.fxr,Le.crouch,Le.lz],_+40)}else E.fill(0,_+8,_+Ja),E.set([Ue[0],Ue[1],Ue[2],V],_+24);mt++},oi=(Z,ze,Ge)=>{if(S>.5){Z.ltx=0,Z.lty=.05;return}M-y.t<3500?(Z.ltx=Math.max(-1,Math.min(1,(y.x-ze)/170)),Z.lty=Math.max(-1,Math.min(1,(Ge-y.y)/220))):(Z.ltx=.5*Math.sin(M/2300+Z.seed*20),Z.lty=.25*Math.sin(M/3100+Z.seed*13))};for(let Z of h){let ze=Z.el.getBoundingClientRect();if(ze.width<2||ze.height<2||ze.bottom<0||ze.top>se.height+se.top){Z.pos=null;continue}let Ge={left:ze.left-se.left,top:ze.top-se.top,width:ze.width,height:ze.height,right:ze.right-se.left,bottom:ze.bottom-se.top},xe=Z.el,He=xe.getAttribute("aria-pressed")==="true",Ue=He||xe.getAttribute("aria-selected")==="true"||xe.classList.contains("active")||xe.classList.contains("on")?1:0,V=P.accent,_=Z.doll,Le=0;if(_){if(_.glowT=0,_.type<20&&(Le=_.mouth),Z.tag==="rec"?(V=P.rec,Le=He?1:0,_.glowT=He&&K?.5+.5*H:0):Z.tag==="play"?(V=P.play,Le=He?1:0,_.glowT=He?.35+.65*H:0):Z.tag==="tempo"?(V=P.rec,_.glowT=K?H:.5+.5*Math.pow(Math.max(0,Math.sin(M/430)),12)):Z.tag==="part"?(V=P[xe.dataset.p]||P.accent,_.glowT=Ue?.35:0):Z.tag==="nav"?(_.glowT=Ue?.4:0,V=P.accent):Z.tag==="tool"&&_.type===ue.BROOM&&(Le=He?1:0),_.type===ue.DIE){if(_.rollA===void 0&&(_.rollA=.6,_.rollB=-.5,_.face=1,_.rollT=1),_.rollT<1){_.rollT=Math.min(1,_.rollT+F/.85);let tt=1-Math.pow(1-_.rollT,3);_.rollA=_.rollFrom[0]+(_.rollTo[0]-_.rollFrom[0])*tt,_.rollB=_.rollFrom[1]+(_.rollTo[1]-_.rollFrom[1])*tt,_.rollT===1&&(_.rollA%=Math.PI*2,_.rollB%=Math.PI*2)}_.extra=[_.rollA,_.rollB,0]}if(_.type===ue.HOURGLASS){_.sand===void 0&&(_.sand=.75);let tt=Math.cos(_.act*Math.PI);Math.abs(tt)>.97&&(_.sand=tt>0?Math.max(0,_.sand-F/9):Math.min(1,_.sand+F/9)),_.extra=[_.sand,0,0]}if(_.type===ue.VIALS&&D){let tt=We=>Math.min(1,Math.sqrt(We||0)*1.3);_.extra=[.25+.75*tt(D.drum),.25+.75*tt(D.bass),.25+.75*tt(D.lead)]}else _.type===ue.VIALS&&(_.extra=[.55,.4,.7]);_.act+=(_.actT-_.act)*(1-Math.exp(-F*(_.type===ue.DIE?5:7))),(_.type===ue.DIE||_.type===ue.BOOK||_.type===ue.WEB)&&_.act>.97&&(_.act=0,_.actT=0)}Z.flash*=Math.exp(-F*5);let rt=_?wo(Z.kind,Ge):null;if(Z.pos=rt,_&&(oi(_,rt.x,rt.y),_.step(F,M,I,Oe)),wt([Ge.left,Ge.top,Ge.width,Ge.height],[Z.radius,Z.plate?1:0,Ue,Z.flash],rt,_,Le,V,1),mt>=100)break}let Ps=null,ri=[],ut=null;if(i.ui.view==="pattern"&&e.el.isConnected){let Z=e.el.getBoundingClientRect();if(Z.width>10&&Z.height>10){let ze=et();Ps={x:Z.left-se.left,y:Z.top-se.top,w:Z.width,h:Z.height,r:parseFloat(getComputedStyle(e.el).borderTopLeftRadius)||20};let Ge=P[e.part]||P.accent,xe=!!e.gpu;v.forEach((He,Ue)=>{let V=p[Ue];if(!V)return;if(V.swapTo!==null){V.outT=Math.min(1,(V.outT||0)+F/2);let We=V.outT;if(V.rise=We<.35?1:1-ca((We-.35)/.45),We>=1){let ga=new is(V.swapTo,re());ga.rise=0,ga.inT=0,Ae[Ue]=V.swapTo,p[Ue]=V=ga}}else if(V.inT!==void 0){V.inT=Math.min(1,V.inT+F/2);let We=V.inT;V.rise=We<.12?0:We<.35?.3*ca((We-.12)/.23):We<.6?.3+.32*ca((We-.35)/.25):We<.78?.62+.38*ca((We-.6)/.18):1,We>=.78&&!V.landed&&(V.landed=!0,V.sqv-=3.4,V.hvy+=2.2,V.scare=.5),We===1&&(V.inT=void 0)}else V.rise<1&&(V.rise=Math.min(1,V.rise+F*1.6));let _=Vt(He,Ue,ze,Z.width,Z.height),Le=Ps.x+(He.x0+He.x1)/2*Z.width,rt=Ps.y+_.y*Z.height,tt=b&&b[Ue]||0;V.glowT=Math.max(tt*.6,K?.1*H:0),V.ink+=(Math.max(tt,V.glow*.8)-V.ink)*(1-Math.exp(-F*8)),V.color=Ge,oi(V,Le,rt-_.s*.6),V.step(F,M,I,Oe),V.dance&&fe&&fe.dolls.includes(V)&&(ut=ut||{x:0,y:1e9,n:0},ut.x+=Le,ut.n++,ut.y=Math.min(ut.y,rt-_.s*1.05)),ri.push({x0:He.x0,y0:He.y0,x1:He.x1,y1:He.y1,black:!!He.cut,lit:Math.max(tt,V.glow*.6)}),wt([0,0,0,0],[V.spot,V.rise-1,xe?1:0,V.p.spin],{x:Le+V.p.travel*_.s/2.2,y:rt,s:_.s},V,V.mouth,Ge,xe?.6:1)})}}N&&(ut&&ut.n?(N.style.transform=`translate(${(ut.x/ut.n).toFixed(1)}px, ${(ut.y-22).toFixed(1)}px) translate(-50%, -100%)`,N.classList.add("show")):N.classList.remove("show")),r.draw({time:M/1e3,flicker:_e,watch:S,beat:H,calm:I,pad:Ps,stage:!e.gpu,keys:ri,accent:P.accent,dolls:mt,data:E}),r.errors.length&&!Ds.reported&&(Ds.reported=!0,console.warn("MOTIF Halloween:",r.errors.join(`
`)));let ds=a();ds&&(ds.stage=[1,(I?M*.25:M)/1e3,S,H],ds.scene&&ds.scene.glass&&(i.ui.view==="pattern"||i.ui.view==="tweaks")&&ds.keepAwake()),_s()}let _s=()=>{l&&!n&&document.visibilityState==="visible"&&(n=requestAnimationFrame(zo))},ii=()=>{Me=0,O=performance.now()+3e3,_s()},Ds={get on(){return l},get stage(){return l&&!e.gpu},get ok(){return!!(r&&r.ok)},get errors(){return r?r.errors:[]},get ema(){return te},get scale(){return pe},get dolls(){return p},dance(M,F=2){if(!l||!p.length)return;let I=performance.now();Xt(p.slice(0,F),M||la(),Math.ceil(At(I)))},set(M){if(M!==l){if(l=M,l)r=new ta(t),r.ok||console.warn("MOTIF Halloween: WebGL 2 indisponible",r.errors),ee(),c=!0,m="",d=new MutationObserver(()=>{c=!0}),d.observe(t,{childList:!0,subtree:!0}),document.addEventListener("pointerdown",si,!0),document.addEventListener("pointermove",ai,!0),document.addEventListener("pointerup",As,!0),document.addEventListener("pointercancel",As,!0),document.addEventListener("visibilitychange",ii),x=performance.now(),Me=0,z=performance.now()+9e3,O=performance.now()+3e3,G=performance.now()+2e4,_s();else{n&&cancelAnimationFrame(n),n=0,d&&d.disconnect(),d=null,document.removeEventListener("pointerdown",si,!0),document.removeEventListener("pointermove",ai,!0),document.removeEventListener("pointerup",As,!0),document.removeEventListener("pointercancel",As,!0),document.removeEventListener("visibilitychange",ii),r&&r.destroy(),r=null,N&&(N.remove(),N=null),h=[],f.clear(),p=[],m="",R.clear(),B.clear();let F=a();F&&(F.stage=null,F.wake())}e.draw()}},refresh(){l&&(ee(),c=!0,m="",Ae=null)},press:Rs,note:ma,keyLights(M){b=M},level(M){if(!l||!M)return;let F=K;if(K=!!M.playing,K!==F){for(let I of p)I.dance=null;J=-1}if(M.playing&&M.tick>=0){X={tick:M.tick,at:performance.now(),msPerTick:6e4/((i.project.tempo||120)*96)};let I=Math.floor(M.tick/96);if(I!==ie){ie=I,H=1;let A=M.tick%384<96;for(let Y of p)Y.dance||(Y.sqv-=A?1.6:.8);for(let Y of h)Y.doll&&Y.tag==="play"&&(Y.doll.sqv-=A?2.2:1.2)}}if(M.m&&(D={d:M.m.d,bass:M.m.bass,lead:M.m.lead,drum:M.m.drum}),M.trig){for(let I=0;I<M.trig.length;I+=4)if(M.trig[I]===0&&M.trig[I+1]===0){for(let A of h)A.doll&&(A.doll.sqv-=1,A.doll.hvy+=.4);break}}},gasp(){if(l){for(let M of h)M.doll&&M.doll.startle(.9);for(let M of p)M.startle(.9)}}};return e.ghouls=Ds,Ds}var Za="43b08cdbd7",w=new Ns;window.__motif=w;var Un={drum:"Drum",bass:"Bass",lead:"Lead"},jn={kick:"KICK",snare:"SNARE \xB7 CLAP",hat:"HAT",perc:"PERC",bass:"BASSE",lead:"M\xC9LODIE"},Yt=[["order","Ordre"],["up","Montant"],["down","Descendant"],["chord","Accord"]],qe=null,rs,ke,ot,ns,Ze,Ct,$=null,Re=null,Lo=!1,L={},Ro=0;function Xe(i,e){let t=L.toast;if(t.replaceChildren(u("span",{text:i})),e){let s=u("button",{text:e.label,onclick:()=>{t.classList.remove("show"),e.fn()}});t.append(s)}t.classList.toggle("act",!!e),t.classList.add("show"),clearTimeout(Ro),Ro=setTimeout(()=>t.classList.remove("show"),e?5e3:2200)}function ls(){return qe.running?Promise.resolve(!0):qe.start().then(i=>(i&&ti(),i)).catch(i=>(Xe("Audio indisponible : "+i.message),!1))}function Po(i,e){L.wake.querySelector("h1").textContent=i,L.wake.querySelector("p").textContent=e,L.wake.classList.remove("hidden")}function ti(){L.wake.classList.add("hidden")}async function fa(i){for(let e of Ei(i)){let t=e==="drums"?"banks/drums/bank.json":`banks/${e}/bank.json`;if(!qe.loadedBanks.has(t))try{await qe.loadBank(t)}catch(s){Xe("Sons non charg\xE9s ("+e+") : "+s.message)}}}async function qo(){let i=w.project,e=[...i.parts.drum.kit,i.parts.bass.preset,i.parts.lead.preset];for(let t of e)await fa(we(t));w.syncAll()}function Gn(){rs=document.getElementById("app"),rs.dataset.part=w.ui.part,L.logo=u("button",{class:"logo","aria-label":"Menu et projets",onclick:()=>Ct.menu()},u("span",{html:Q("logo").outerHTML}),u("b",{text:"MOTIF"})),L.rec=u("button",{class:"tbtn rec","aria-label":"Armer l\u2019enregistrement","aria-pressed":"false",onclick:Yn},Q("rec")),L.play=u("button",{class:"tbtn play","aria-label":"Lecture","aria-pressed":"false",onclick:Kn},Q("play")),L.progressFill=u("div",{class:"fill"}),L.progressBars=u("div",{class:"bars"}),L.pos=u("span",{class:"pos",text:""}),L.progress=u("div",{class:"progress","aria-hidden":"true"},L.progressFill,L.progressBars,L.pos),L.tempo=u("div",{class:"chip tempo",role:"slider",tabindex:"0","aria-label":"Tempo. Toucher pour le m\xE9tronome, glisser pour changer."},u("b"),u("small",null,u("span",{class:"mi",html:Q("metro").outerHTML}),"BPM")),L.key=u("button",{class:"chip","aria-label":"Tonalit\xE9 et gamme",onclick:()=>Ct.keyPicker()},u("b"),u("small"));let i=u("div",{class:"top"},L.logo,L.rec,L.play,L.progress,L.tempo,L.key);Di(L.tempo,{get:()=>w.project.tempo,set:t=>{w.set("tempo",t),cs()},step:6,onTap:Xn}),L.parts=u("div",{class:"parts",role:"tablist"});for(let t of["drum","bass","lead"]){let s=u("button",{class:"ptab",role:"tab","data-p":t,onclick:()=>Oo(t)},Q(t),Un[t],u("i",{class:"lvl"}),u("i",{class:"mute"}));L.parts.append(s)}L.instName=u("button",{class:"name","aria-label":"Choisir un son",onclick:()=>Ct.browser()},u("small"),u("b")),L.prev=u("button",{class:"arrow","aria-label":"Son pr\xE9c\xE9dent",onclick:()=>ei(-1)},Q("left")),L.next=u("button",{class:"arrow","aria-label":"Son suivant",onclick:()=>ei(1)},Q("right")),L.dice=u("button",{class:"arrow dice","aria-label":"Son au hasard pour cette partie (annulable)",onclick:()=>_o(w.ui.part)},Q("dice"));let e=u("div",{class:"inst"},L.prev,L.instName,L.next,L.dice);Wn(L.instName),L.view=u("div",{class:"view"}),L.nav=u("nav",{class:"nav",role:"tablist"});for(let[t,s,a]of[["pattern","Pattern","pattern"],["tweaks","Tweaks","tweaks"],["mix","Mix","mix"],["song","Song","song"]])L.nav.append(u("button",{role:"tab","data-v":t,onclick:()=>Bo(t)},Q(a),s));L.toast=u("div",{class:"toast",role:"status"}),L.wake=u("div",{class:"wake"},u("div",{class:"orb"},Q("play")),u("h1",{text:Ye.name}),u("p",{text:"Touchez pour activer le son."})),L.wake.addEventListener("click",async()=>{(qe.ctx?await qe.rebuildIfNeeded():await ls())&&(ti(),await qo())}),rs.append(i,L.parts,e,L.view,L.nav),document.body.append(L.toast,L.wake),ke=new Gs(w,{onFirstTouch:()=>{qe.running||ls()}}),ot=new Ws(w,{onSelect:()=>hs()}),ns=new Us({get:()=>w.project.parts[w.ui.part].range,set:t=>w.setPart(w.ui.part,"range",t),scale:()=>({scale:w.project.scale,steps:w.project.parts[w.ui.part].steps,key:w.project.key}),onStart:()=>{}}),Ze=new Ys(w),Ct=new Vs(w,{host:()=>qe,toast:Xe,loadBanksFor:fa,ensureAudio:ls,rollDice:_o,previewFluid:Co,fluidStatus:Vn,enableTilt:Ao,build:Za}),$=uo(w,{pad:ke,xy:Ze}),$&&(ke.fx=$,Ze.fx=$,window.__motifFx=$,w.settings.glassTilt&&Ao(!0)),Re=Mo(w,{pad:ke,app:rs,fx:()=>$}),window.__motifHw=Re,Re.set(document.documentElement.hasAttribute("data-halloween"))}function Wn(i){let e=null;i.addEventListener("pointerdown",t=>{e={x:t.clientX,y:t.clientY,t:performance.now()}}),i.addEventListener("pointerup",t=>{if(!e)return;let s=t.clientX-e.x,a=t.clientY-e.y;e=null,Math.abs(s)>40&&Math.abs(s)>Math.abs(a)*1.5&&(ei(s<0?1:-1),i.dataset.swiped="1",setTimeout(()=>{delete i.dataset.swiped},50))}),i.addEventListener("click",t=>{i.dataset.swiped&&(t.stopImmediatePropagation(),t.preventDefault())},!0)}function Yn(){ls();let i=w.ui;w.send({type:"transport",cmd:i.armed?"disarm":"arm"})}function Kn(){ls().then(()=>w.send({type:"transport",cmd:w.ui.playing?"stop":"play"}))}var Eo=!1;function Ao(i){let e=()=>{Eo||(Eo=!0,window.addEventListener("deviceorientation",s=>{$&&w.settings.glassTilt&&s.gamma!==null&&$.tilt(s.gamma,s.beta)}))},t=window.DeviceOrientationEvent;if(i){t&&e();return}t&&typeof t.requestPermission=="function"?t.requestPermission().then(s=>{s==="granted"?e():(w.setSetting("glassTilt",!1),Xe("Mouvements refus\xE9s : les reflets suivent ton doigt"))}).catch(()=>w.setSetting("glassTilt",!1)):t&&e()}function Vn(){let i=$?$.engine():"none";return{"webgpu-hdr":"Actif : WebGPU, \xE9cran HDR \u2014 l\u2019encre et le verre peuvent d\xE9passer le blanc.",webgpu:"Actif : WebGPU (\xE9cran standard : pas de HDR ici).",webgl:"Actif : WebGL (compatibilit\xE9, sans HDR).",none:"Effets fluides indisponibles sur cet appareil."}[i]}function Co(){if($){if(!w.settings.fluid&&!w.settings.glass){Xe("Active le fluide ou le verre pour voir l\u2019aper\xE7u");return}w.ui.view!=="pattern"&&Bo("pattern"),setTimeout(()=>{$.place(),setTimeout(()=>$.preview(),120)},320)}}function Xn(){let i=!w.settings.metro;w.setSetting("metro",i),cs(),Xe(i?w.settings.metroAlways?"M\xE9tronome activ\xE9":"M\xE9tronome activ\xE9 pendant l\u2019enregistrement":"M\xE9tronome coup\xE9",i?{label:"R\xE9glages",fn:()=>Ct.settings()}:null)}async function _o(i){let e=w.planRandom(i);for(let s of Ai(e))await fa(we(s));w.applyRandom(e);let t=[];e.kit&&t.push(i==="drum"?e.kit.map(s=>we(s).name).join(" \xB7 "):"kit "+we(e.kit[0]).name+"\u2026");for(let s of["bass","lead"])e[s]&&t.push(we(e[s].preset).name+(e[s].oct?` (${e[s].oct>0?"+":""}${e[s].oct} oct.)`:""));L.instName.classList.remove("flash"),L.instName.offsetWidth,L.instName.classList.add("flash"),Xe(t.join(" \xB7 "),{label:"Annuler",fn:()=>{w.undo()&&Xe("Sons d\u2019avant r\xE9tablis")}})}function Oo(i){if(w.ui.part===i){Ct.browser();return}ke.releaseAll(),w.ui.part=i,w.ui.group=0,ot.clear(),rs.dataset.part=i,pa()}function Bo(i){ke.releaseAll(),Ze.releaseAll(),w.ui.view=i,Ho()}function Io(){let i=w.ui;return i.part==="drum"?Ht[i.lane]:i.part}function Fo(){let i=w.project,e=w.ui;return e.part==="drum"?i.parts.drum.kit[e.lane]:i.parts[e.part].preset}async function ei(i){let e=Io(),t=ht(e),s=t.findIndex(o=>o.id===Fo()),a=t[(s+i+t.length)%t.length];await za(a.id)}async function za(i){let e=we(i);if(!e)return;await fa(e);let t=w.ui;w.setPreset(t.part,t.lane,i),L.instName.classList.remove("flash"),L.instName.offsetWidth,L.instName.classList.add("flash")}function cs(){let i=w.project,e=w.ui;L.tempo.querySelector("b").textContent=i.tempo,L.tempo.setAttribute("aria-valuenow",i.tempo),L.tempo.classList.toggle("metro",!!w.settings.metro),L.tempo.classList.toggle("live",!!w.settings.metro&&e.playing&&(e.armed||w.settings.metroAlways)),L.key.querySelector("b").textContent=St[i.key],L.key.querySelector("small").textContent=Tt(i.scale).name.slice(0,9),L.rec.setAttribute("aria-pressed",String(e.armed)),L.rec.classList.toggle("waiting",e.armed&&!e.playing),L.play.setAttribute("aria-pressed",String(e.playing)),L.play.replaceChildren(Q(e.playing?"stop":"play")),L.play.setAttribute("aria-label",e.playing?"Arr\xEAter":"Lecture"),L.progress.classList.toggle("rec",e.armed),L.progressBars.childElementCount!==i.bars&&L.progressBars.replaceChildren(...Array.from({length:i.bars},()=>u("i"))),e.playing||(L.progressFill.style.width="0",L.pos.textContent=e.armed?"REC pr\xEAt":`${i.bars} mes.`)}function Ls(){let i=w.project;for(let e of L.parts.children){let t=e.dataset.p;e.setAttribute("aria-selected",String(t===w.ui.part));let s=t==="drum"?i.parts.drum.mute.every(Boolean):i.parts[t].mute;e.classList.toggle("muted",s)}}function ua(){let i=w.ui,e=Io(),t=ht(e),s=Fo(),a=we(s),o=t.findIndex(n=>n.id===s),r=a&&a.style?ct(a.style):null;L.instName.querySelector("small").textContent=`${jn[e]} \xB7 ${o+1}/${t.length}${r?" \xB7 "+r.short:""}`,L.instName.querySelector("b").textContent=a?a.name:"\u2014",L.instName.setAttribute("aria-label",`Son ${a?a.name:""}, ${o+1} sur ${t.length}. Toucher pour parcourir.`)}function pa(){cs(),Ls(),ua(),Ho()}var Kt=null;function Ho(){let i=w.ui.view;for(let e of L.nav.children)e.setAttribute("aria-selected",String(e.dataset.v===i));Kt&&(Kt(),Kt=null),L.view.replaceChildren(),i==="pattern"?$n():i==="tweaks"?Zn():i==="mix"?e0():t0(),$&&requestAnimationFrame(()=>$.place())}function $n(){let i=w.ui,e=w.project,t=u("div",{class:"controls"});if(i.part==="drum")for(let s=0;s<4;s++){let a=new at({label:["Kick","Snare","Hat","Perc"][s],min:()=>0,max:()=>Pt[s].length-1,get:()=>w.project.parts.drum.rhythm[s],set:o=>{w.setPart("drum","rhythm",o,s)},format:o=>({v:o===0?"1\xD7":String(o).padStart(2,"0"),s:Pt[s][o].name}),ring:(o,r,n,l)=>qa(o,r,n,Pt[s][l],null,-1,ha(),da()),onTap:()=>{i.lane=s,ua(),os.forEach((o,r)=>o.el.classList.toggle("active",r===s))},onStart:()=>{i.lane=s,ua()}});a.el.classList.toggle("active",s===i.lane),t.append(a.el),os.push(a)}else{let s=i.part,a=!1,o=new at({label:"Rythme",min:()=>0,max:()=>a?xa(gt[e.parts[s].rhythm]):gt.length-1,get:()=>a?w.project.parts[s].ties:w.project.parts[s].rhythm,set:l=>{if(a)w.setPart(s,"ties",l);else{w.setPart(s,"rhythm",l);let d=xa(gt[l]);w.project.parts[s].ties>d&&w.setPart(s,"ties",d)}},format:l=>{let d=w.project.parts[s],c=gt[d.rhythm];return a?{v:l===0?"OFF":String(l),s:c.len===0?"gliss\xE9":"liaisons",l:"Liaisons",ties:!0}:{v:l===0?"\u221E":String(l).padStart(2,"0"),s:c.name+(d.ties?` \xB7 ${d.ties} liaison${d.ties>1?"s":""}`:""),l:"Rythme"}},ring:(l,d,c)=>{let h=w.project.parts[s],f=gt[h.rhythm];qa(l,d,c,f,pi(f,h.ties),-1,ha(),da())},onTap:()=>{a=!a,o.render()},onSwipeX:l=>{a=l>0,o.render()},step:16}),r=new at({label:"Degr\xE9s",min:()=>0,max:()=>vt.length-1,get:()=>vt.indexOf(w.project.parts[s].steps),set:l=>{w.setPart(s,"steps",vt[l]),ns.render(),ke.draw()},format:l=>({v:vt[l]===12?"12":String(vt[l]),s:vt[l]===12?"chromatique":vt[l]===5?"pentatonique":vt[l]===7?"gamme enti\xE8re":"par octave"}),ring:(l,d,c,h)=>{let f=vt[h],p=d/2,m=c/2-2,v=Math.min(d,c)/2-8;l.lineWidth=4,l.lineCap="round";for(let b=0;b<f;b++){let y=-Math.PI/2+b/f*Math.PI*2+.06,x=-Math.PI/2+(b+1)/f*Math.PI*2-.06;l.strokeStyle=b===0?ha():da(2),l.beginPath(),l.arc(p,m,v,y,x),l.stroke()}},step:18}),n=new at({label:"Doigts",min:()=>0,max:()=>Yt.length-1,get:()=>Yt.findIndex(l=>l[0]===w.project.parts[s].arp),set:l=>w.setPart(s,"arp",Yt[l][0]),format:l=>({v:["1\u21922","\u2197","\u2198","\u2261"][l],s:Yt[l][1]}),onTap:()=>{let l=(Yt.findIndex(d=>d[0]===w.project.parts[s].arp)+1)%Yt.length;w.setPart(s,"arp",Yt[l][0]),n.render()},step:22});n.el.classList.add("small"),t.append(o.el,r.el,n.el),os.push(o,r,n)}L.view.append(t),i.part!=="drum"&&L.view.append(ns.el),L.view.append(ke.el),L.undo=u("button",{class:"tbtn small","aria-label":"Annuler",onclick:()=>{w.undo()&&Xe("Annul\xE9")}},Q("undo")),L.redo=u("button",{class:"tbtn small","aria-label":"R\xE9tablir",onclick:()=>{w.redo()&&Xe("R\xE9tabli")}},Q("redo")),L.erase=u("button",{class:"tbtn small","aria-label":"Gomme","aria-pressed":String(i.erase),onclick:()=>{w.setErase(!w.ui.erase)}},Q("erase")),L.clear=u("button",{class:"tbtn small","aria-label":"Effacer",onclick:Jn},Q("trash")),L.view.append(u("div",{class:"timeline"},L.undo,ot.el,L.erase,L.clear)),requestAnimationFrame(()=>{os.forEach(s=>s.render()),i.part!=="drum"&&ns.render(),ke.setHint(),ke.showHint(!Qn()),ke.draw(),ot.draw(),hs()}),Kt=()=>{os.length=0,ke.releaseAll()}}var os=[];function Qn(){let i=w.pattern,e=w.ui.part;return e==="drum"?i.drum.some(t=>t.hits.length):i[e].notes.length>0}function hs(){L.erase&&(L.erase.classList.toggle("on",w.ui.erase),L.erase.setAttribute("aria-pressed",String(w.ui.erase)),L.undo.disabled=!w.undoStack.length,L.clear.classList.toggle("on",!!ot.sel),L.clear.setAttribute("aria-label",ot.sel?"Effacer la s\xE9lection":"Effacer\u2026"))}function Jn(){let i=w.ui;if(ot.sel){let e=ot.sel;w.eraseSpan(i.part,i.part==="drum"?null:void 0,e.t0,e.t1),ot.clear(),hs(),Xe("Portion effac\xE9e",{label:"Annuler",fn:()=>w.undo()});return}Ct.clearMenu()}function Zn(){L.view.append(Ze.groupsEl,Ze.el,Ze.barEl),requestAnimationFrame(()=>Ze.render()),Kt=()=>Ze.releaseAll()}function e0(){let i=w.project,e=u("div",{class:"mix"}),t=u("div",{class:"faders"}),s=[["drum",0,"Kick","--drum"],["drum",1,"Snare","--drum"],["drum",2,"Hat","--drum"],["drum",3,"Perc","--drum"],["bass",null,"Basse","--bass"],["lead",null,"M\xE9lodie","--lead"]],a=[],o=new Map,r=new Map,n=(v,b)=>{let y=o.get(v);y&&(w.setMute(y.part,y.lane,b),y.upd())};t.addEventListener("pointermove",v=>{let b=r.get(v.pointerId);if(!b)return;let y=document.elementFromPoint(v.clientX,v.clientY),x=y&&y.closest(".m");x&&o.has(x)&&!b.done.has(x)&&(b.done.add(x),n(x,b.v),Ls())});let l=v=>r.delete(v.pointerId);t.addEventListener("pointerup",l),t.addEventListener("pointercancel",l);for(let[v,b,y,x]of s){let S=()=>v==="drum"?w.project.parts.drum.level[b]:w.project.parts[v].level,R=()=>v==="drum"?w.project.parts.drum.mute[b]:w.project.parts[v].mute,B=u("div",{class:"fill"}),H=u("div",{class:"meter"}),ie=u("div",{class:"db"}),K=u("button",{class:"m","aria-pressed":String(R()),"aria-label":"Couper "+y,text:"M"}),D=u("div",{class:"fader",style:{"--fc":`var(${x})`},role:"slider","aria-label":"Volume "+y,tabindex:"0"},B,H,u("div",{class:"t",text:y}),ie,K),X=N=>Math.pow((N+40)/46,1.6),z=()=>{let N=S();B.style.height=X(N)*100+"%",ie.textContent=(N>0?"+":"")+N.toFixed(1)+" dB",D.classList.toggle("muted",R()),K.setAttribute("aria-pressed",String(R()))},J=null;D.addEventListener("pointerdown",N=>{if(N.target!==K){N.preventDefault();try{D.setPointerCapture(N.pointerId)}catch{}J={y:N.clientY,v:S(),t:performance.now()}}}),D.addEventListener("pointermove",N=>{if(!J)return;let fe=D.getBoundingClientRect().height,G=X(J.v)+(J.y-N.clientY)/fe,U=Math.max(-40,Math.min(6,Math.pow(Math.max(0,Math.min(1,G)),1/1.6)*46-40));w.setLevel(v,b,Math.round(U*2)/2),z()}),D.addEventListener("pointerup",N=>{J&&Math.abs(N.clientY-J.y)<4&&performance.now()-J.t<250&&N.detail===2&&(w.setLevel(v,b,0),z()),J=null}),D.addEventListener("dblclick",()=>{w.setLevel(v,b,0),z()}),o.set(K,{part:v,lane:b,upd:()=>z()}),K.addEventListener("pointerdown",N=>{N.preventDefault(),N.stopPropagation();let fe=!R();n(K,fe),Ls(),r.set(N.pointerId,{v:fe,done:new Set([K])});try{K.releasePointerCapture(N.pointerId)}catch{}}),K.addEventListener("click",N=>{N.detail===0&&(n(K,!R()),Ls())}),z(),a.push({part:v,lane:b,meter:H,el:D}),t.append(D)}let d=(v,b,y,x=.02)=>new at({label:v,min:()=>0,max:()=>50,get:()=>Math.round(w.project.mix[b]/x),set:R=>{w.setMix(b,R*x)},format:R=>({v:y(R*x),s:""}),ring:(R,B,H,ie)=>{let K=B/2,D=H/2-2,X=Math.min(B,H)/2-8;R.lineWidth=4,R.lineCap="round",R.strokeStyle=da(2),R.beginPath(),R.arc(K,D,X,Math.PI*.75,Math.PI*2.25),R.stroke(),R.strokeStyle=ha(),R.beginPath(),R.arc(K,D,X,Math.PI*.75,Math.PI*.75+ie/50*Math.PI*1.5),R.stroke()},step:5}),c=[d("Pump","pump",v=>Math.round(v*100)+""),d("Espace","space",v=>Math.round(v*100)+""),d("Batterie","drumDrive",v=>Math.round(v*100)+"")],h=new at({label:"Master",min:()=>0,max:()=>36,get:()=>Math.round((w.project.mix.master+18)*1),set:v=>w.setMix("master",v-18),format:v=>({v:(v-18>0?"+":"")+(v-18)+" dB",s:""}),step:6}),f=u("div",{class:"mixknobs"},...c.map(v=>v.el),h.el);e.append(t,f),L.view.append(e),requestAnimationFrame(()=>{c.forEach(v=>v.render()),h.render()});let p=w.on("pos",v=>{if(v.m){for(let b of a){let y=b.part==="drum"?v.m.d[b.lane]:v.m[b.part],x=20*Math.log10(Math.max(y,1e-5));b.meter.style.height=Math.max(0,Math.min(100,(x+48)/48*100))+"%"}$&&$.mixLevels(v.m)}}),m=null;if($){$.setMix({el:t,faders:a.map(({part:y,lane:x,el:S})=>({part:y,lane:x,el:S}))});let v=y=>x=>{let S=t.getBoundingClientRect();$.press(x.pointerId,(x.clientX-S.left)/S.width,(x.clientY-S.top)/S.height,y)},b=[["pointerdown",v("down")],["pointermove",v("move")],["pointerup",v("up")],["pointercancel",v("cancel")]];for(let[y,x]of b)t.addEventListener(y,x);m=()=>{for(let[y,x]of b)t.removeEventListener(y,x)}}Kt=()=>{p(),m&&m(),$&&$.setMix(null)}}function t0(){let i=Ct.songView();L.view.append(i.el),Kt=i.cleanup}function ha(){return getComputedStyle(rs).getPropertyValue("--accent").trim()}function da(i=1){return document.documentElement.dataset.theme==="dark"?`rgba(255,255,255,${.08*i})`:`rgba(0,0,0,${.08*i})`}var s0=null,Do=-1;function a0(i){s0=i;let e=w.project,t=w.ui;if(i.playing&&i.tick>=0){let s=384*e.bars;L.progressFill.style.width=((i.tick+1)/s*100).toFixed(2)+"%";let a=Math.floor(i.tick/384)+1,o=Math.floor(i.tick%384/96)+1;L.pos.textContent=`${a}.${o}`;let r=Math.floor(i.tick/96);r!==Do&&(Do=r,L.tempo.classList.contains("live")&&(L.tempo.classList.remove("beat","down"),L.tempo.offsetWidth,L.tempo.classList.add("beat"),i.tick%384<96&&L.tempo.classList.add("down")))}if(i.m)for(let s of L.parts.children){let a=s.dataset.p==="drum"?i.m.drum:i.m[s.dataset.p];s.querySelector(".lvl").style.transform=`scaleX(${Math.min(1,Math.sqrt(a||0)*1.1).toFixed(3)})`}if(t.view==="pattern"){let s=e.song.enabled&&e.song.sections.length;ke.setClock({tick:i.tick,at:performance.now(),playing:i.playing,msPerTick:6e4/(e.tempo*96),L:384*e.bars,pat:s?e.song.sections[i.sec%e.song.sections.length].p:e.current}),ke.onTrig(i.trig,i.m),ot.setTick(i.playing?i.tick:-1)}t.view==="tweaks"&&Ze.onPos(i),$&&$.level(i),Re&&Re.level(i)}function i0(i){switch(i){case"transport":cs(),w.ui.view==="pattern"&&(ke.setHint(),ot.draw()),Re&&w.ui.armed&&!Lo&&Re.gasp(),Lo=w.ui.armed;break;case"tempo":case"key":case"scale":case"bars":cs(),w.ui.view==="pattern"&&(ns.render(),ke.draw(),ot.draw());break;case"preset":ua(),w.ui.view==="tweaks"&&Ze.render(),w.ui.view==="pattern"&&(ke.setHint(),ke.draw());break;case"notes":w.ui.view==="pattern"&&(ot.draw(),ke.showHint(!1),hs());break;case"undo":hs();break;case"erase":hs(),ke.setHint(),ke.showHint(!0),ke.draw(),w.ui.erase&&Xe(w.ui.playing?"Gomme : touche le pad pour effacer pendant la lecture":"Gomme activ\xE9e \u2014 lance la lecture puis touche le pad");break;case"project":case"pattern":pa();break;case"auto":case"macro":w.ui.view==="tweaks"&&Ze.render();break;case"mix":Ls(),$&&$.syncScene();break;case"settings:metro":case"settings:metroAlways":cs();break;case"settings:piano":case"settings:ghosts":w.ui.view==="pattern"&&(ke.setHint(),ke.draw());break;case"settings:glass":document.documentElement.toggleAttribute("data-glass",!!w.settings.glass),$&&$.place();break;case"settings:fluid":case"settings:fluidZone":case"settings:fluidStyle":case"settings:fluidColors":case"settings:fluidInk":case"settings:fluidHdr":case"settings:glassSpill":case"settings:glassLight":case"settings:mixGlass":case"settings:ctrlHeight":case"settings:lightLook":case"settings:hdrLight":case"settings:glassLook":$&&$.place();break;case"settings:fluidEngine":w.save().finally(()=>location.reload());break;case"settings:hwCast":case"settings:hwRelay":Re&&Re.refresh();break;case"settings:glassTilt":$&&!w.settings.glassTilt&&$.tilt(null);break;default:i&&i.includes(":range")&&ke.draw(),i&&i.endsWith(":steps")&&(ns.render(),ke.draw()),i&&(i.endsWith(":rhythm")||i.endsWith(":ties"))&&os.forEach(e=>e.render())}}function o0(){let i=()=>{ke&&ke.releaseAll(),Ze&&Ze.releaseAll(),w.ui.playing&&w.send({type:"transport",cmd:"stop"}),w.ui.armed&&w.send({type:"transport",cmd:"disarm"}),w.save(),qe.suspend()};document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="hidden")i();else if(qe.ctx){try{await qe.ctx.resume()}catch{}await qe.probe(400)||Po("Son en pause","Touchez pour r\xE9activer le son.")}}),window.addEventListener("pagehide",()=>w.save()),window.addEventListener("beforeunload",()=>w.save());let e=()=>document.documentElement.style.setProperty("--app-h",window.innerHeight+"px");CSS.supports("height","100dvh")||(e(),window.addEventListener("resize",e)),document.addEventListener("gesturestart",t=>t.preventDefault()),document.addEventListener("dblclick",t=>{t.target.closest("input,textarea")||t.preventDefault()},{passive:!1}),document.addEventListener("touchmove",t=>{t.target.closest(".scroll, .sheet .body, .filters")||t.preventDefault()},{passive:!1})}async function r0(){await w.init(),qe=new zs({workletUrl:"worklet.js?v="+Za,onMessage:t=>w.onEngine(t),onState:t=>{(t==="interrupted"||t==="suspended")&&document.visibilityState==="visible"&&w.ui.playing&&Po("Son interrompu","Touchez pour reprendre."),t==="running"&&ti()}}),qe.replay=()=>w.engineState(),qe.rebuildIfNeeded=async()=>{try{await qe.ctx.resume()}catch{}return await qe.probe(250)?!0:(Xe("Red\xE9marrage du son\u2026"),qe.rebuild())},w.engine=qe,Gn(),w.on("change",i0),w.on("pos",a0),w.on("error",t=>Xe(t)),o0(),window.addEventListener("motif:theme",()=>{Re&&(Re.set(document.documentElement.hasAttribute("data-halloween")),Re.refresh()),pa()}),pa();let i=qo().catch(t=>{window.__motifBankError=String(t&&t.message||t)});(/[?&]diag\b/.test(location.search)||location.hostname==="localhost"&&matchMedia("(display-mode: standalone)").matches)&&n0(i),Ji({toast:Xe,store:w,build:Za}),/[?&]fxtest\b/.test(location.search)&&location.hostname==="localhost"&&setTimeout(async()=>{document.querySelectorAll(".wake").forEach(c=>c.remove()),w.settings.glass||w.setSetting("glass",!0);let t=new URLSearchParams(location.search),s=t.get("part"),a=t.get("look"),o=w.settings.glassLook;t.get("theme")==="halloween"&&(document.documentElement.setAttribute("data-halloween",""),document.documentElement.dataset.theme="dark",window.dispatchEvent(new Event("motif:theme")));let r=(t.get("cast")||"").split(",").map(Number);Re&&r.length===4&&r.every(c=>c>=0&&c<=6)&&(w.settings.hwCast=r,Re.refresh()),t.has("dance")&&Re&&setTimeout(()=>Re.dance(t.get("dance")||"passinho",3),1500),["drum","bass","lead"].includes(s)&&w.ui.part!==s&&(Oo(s),await new Promise(c=>setTimeout(c,400))),a&&(w.settings.glassLook=a,$&&$.place(),await new Promise(c=>setTimeout(c,300))),$&&$.fluid&&t.has("m")&&($.fluid.marginTest=+t.get("m"),$.place()),t.has("ns")&&w.settings.glassSpill&&w.setSetting("glassSpill",!1),!t.has("ns")&&!w.settings.glassSpill&&w.setSetting("glassSpill",!0);let n=$&&$.fluid,l=async c=>{if(!(!t.has("snap")||!n))try{n.render(!0);let h=document.createElement("canvas");h.width=Math.round(n.canvas.width/2),h.height=Math.round(n.canvas.height/2),h.getContext("2d").drawImage(n.canvas,0,0,h.width,h.height),await fetch("/__log",{method:"POST",body:JSON.stringify({kind:"snap",name:c,out:[h.toDataURL("image/png")]})})}catch{}};for(let c=0;c<5;c++)Co(),await new Promise(h=>setTimeout(h,c===1?900:1500)),c===1&&(await l("preview"),await new Promise(h=>setTimeout(h,600)));if(t.has("snap")&&(await new Promise(c=>setTimeout(c,6500)),await l("rest")),t.has("snap")&&t.has("edges")&&n&&n.splat){let c=n.cfg.DENSITY_DISSIPATION;n.cfg.DENSITY_DISSIPATION=0,n.clear();let h=(f,p,m,v,b,y)=>n.splat(f,p,m,v,{r:b[0]*.3,g:b[1]*.3,b:b[2]*.3},y);for(let f=0;f<12;f++)h(.9,.05+f*.08,(f%2?1:-1)*.01,.006,[.45,.05,1],.7);h(.12,.06,.02,.01,[1,.05,.6],.8),h(.14,.35,0,.01,[1,.05,.6],.5),h(.5,.97,.03,-.01,[1,.1,.7],.6),n.applyInputs(),n.render(!1),await new Promise(f=>setTimeout(f,300)),await l("edges"),n.cfg.DENSITY_DISSIPATION=c}a&&(w.settings.glassLook=o,$&&$.place());let d=null;try{n.render(!0);let c=document.createElement("canvas");c.width=n.canvas.width,c.height=n.canvas.height;let h=c.getContext("2d");h.drawImage(n.canvas,0,0);let f=n.off?n.off[0]:0,p=n.off?n.off[1]:0,m=n.hostW||c.width,v=n.hostH||c.height,b=(y,x)=>Array.from(h.getImageData(Math.round(f+y*m),Math.round(p+x*v),1,1).data);d={centre:b(.5,.5),rimLeft:b(.004,.5),bevelLeft:b(.03,.5),cornerOutside:b(.001,.001),top:b(.5,.004),below:b(.5,1.02)}}catch(c){d=String(c)}fetch("/__log",{method:"POST",body:JSON.stringify({kind:"fxtest",ua:navigator.userAgent,engine:$?$.engine():"none",ok:!!(n&&n.ok),glass:w.settings.glass,sceneGlass:!!(n&&n.scene&&n.scene.glass),shaderErrors:n&&n.shaderErrors?n.shaderErrors.map(c=>String(c).slice(0,300)):null,link:n&&n.gl?n.gl.getProgramParameter(n.p.display.p,n.gl.LINK_STATUS):null,format:n&&n.format,extended:n&&n.extended,hdrScreen:n&&n.hdrScreen,gpuCanvas:!!document.querySelector("canvas.fluid"),slow:n&&n.ema,spill:$&&$.spillStats,px:d,hw:Re&&Re.on?{ok:Re.ok,errors:Re.errors,ema:Re.ema,scale:Re.scale}:null})}).catch(()=>{})},2500);let e=()=>{ls()};window.addEventListener("pointerdown",e,{once:!0,capture:!0})}async function n0(i){let e=performance.now();await i;let t=getComputedStyle(document.documentElement),s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;visibility:hidden",document.body.append(s);let a=getComputedStyle(s),o=document.getElementById("app").getBoundingClientRect(),r=document.querySelector(".nav").getBoundingClientRect(),n=document.querySelector(".pad")&&document.querySelector(".pad").getBoundingClientRect(),l={kind:"diag",ua:navigator.userAgent,standalone:matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,inner:[innerWidth,innerHeight],vv:window.visualViewport?[visualViewport.width,visualViewport.height]:null,dpr:devicePixelRatio,safe:[a.paddingTop,a.paddingBottom],app:[o.top,o.height],navBottom:r.bottom,padH:n?n.height:null,screen:[screen.width,screen.height],docH:document.documentElement.clientHeight,dvh:(()=>{let p=document.createElement("div");p.style.cssText="position:fixed;height:100dvh;width:1px;top:0",document.body.append(p);let m=p.getBoundingClientRect().height;return p.remove(),m})(),vh:(()=>{let p=document.createElement("div");p.style.cssText="position:fixed;height:100vh;width:1px;top:0",document.body.append(p);let m=p.getBoundingClientRect().height;return p.remove(),m})(),fixedInset:(()=>{let p=document.createElement("div");p.style.cssText="position:fixed;inset:0;",document.body.append(p);let m=p.getBoundingClientRect();return p.remove(),[m.top,m.height]})(),samples:w.engine.samples.size,banks:[...w.engine.loadedBanks],bankError:window.__motifBankError||null,ms:Math.round(performance.now()-e),audioSession:"audioSession"in navigator,worklet:typeof AudioWorkletNode<"u",share:!!navigator.canShare,dvhSupported:CSS.supports("height","100dvh")};s.remove(),fetch("/__log",{method:"POST",body:JSON.stringify(l)}).catch(()=>{});let d=0,c=null;w.on("pos",p=>{c=p,p.trig&&(d+=p.trig.length/4)});let h=Date.now(),f=setInterval(()=>{let p=w.engine.ctx,m={kind:"state",t:Math.round((Date.now()-h)/1e3),ctx:p?p.state:"none",sr:p?p.sampleRate:0,base:p?p.baseLatency:0,out:p&&p.outputLatency,time:p?+p.currentTime.toFixed(2):0,playing:w.ui.playing,armed:w.ui.armed,trig:d,view:w.ui.view,part:w.ui.part,preset:w.presetFor(w.ui.part==="drum"?"d0":w.ui.part).id,notes:w.pattern.lead.notes.length+w.pattern.bass.notes.length+w.pattern.drum.reduce((v,b)=>v+b.hits.length,0),standalone:matchMedia("(display-mode: standalone)").matches,h:innerHeight,master:c&&c.m?+c.m.master.toFixed(3):0};fetch("/__log",{method:"POST",body:JSON.stringify(m)}).catch(()=>{}),Date.now()-h>12e4&&clearInterval(f)},2e3)}r0().catch(i=>{console.error(i),document.getElementById("app").textContent="Erreur au d\xE9marrage : "+i.message});export{za as choosePreset,Xe as toast};
