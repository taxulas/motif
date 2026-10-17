var Mt={id:"scene",storage:"motif3-scene",name:"MOTIF Sc\xE8ne",fluid:!0};var Cc=Mt.storage,qc=1,Vo=null;function Oc(){return Vo||(Vo=new Promise((o,e)=>{let t=indexedDB.open(Cc,qc);t.onupgradeneeded=()=>{let a=t.result;a.objectStoreNames.contains("projects")||a.createObjectStore("projects",{keyPath:"id"}),a.objectStoreNames.contains("renders")||a.createObjectStore("renders",{keyPath:"id"}),a.objectStoreNames.contains("files")||a.createObjectStore("files",{keyPath:"id"}),a.objectStoreNames.contains("kv")||a.createObjectStore("kv")},t.onsuccess=()=>{let a=t.result;a.onversionchange=()=>a.close(),o(a)},t.onerror=()=>e(t.error),t.onblocked=()=>e(new Error("Base locale bloqu\xE9e par un autre onglet"))}),Vo)}function lo(o,e,t){return Oc().then(a=>new Promise((s,i)=>{let r=a.transaction(o,e),n=r.objectStore(o),l;Promise.resolve(t(n)).then(u=>{l=u}),r.oncomplete=()=>s(l),r.onerror=()=>i(r.error),r.onabort=()=>i(r.error||new Error("transaction annul\xE9e"))}))}var co=o=>new Promise((e,t)=>{o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),At={put:(o,e,t)=>lo(o,"readwrite",a=>co(t===void 0?a.put(e):a.put(e,t))),get:(o,e)=>lo(o,"readonly",t=>co(t.get(e))),del:(o,e)=>lo(o,"readwrite",t=>co(t.delete(e))),all:o=>lo(o,"readonly",e=>co(e.getAll())),keys:o=>lo(o,"readonly",e=>co(e.getAllKeys()))};async function Hn(){try{if(navigator.storage&&navigator.storage.persist)return await navigator.storage.persisted()?!0:await navigator.storage.persist()}catch{}return!1}async function Un(){try{if(navigator.storage&&navigator.storage.estimate)return await navigator.storage.estimate()}catch{}return null}var Es=["Do","R\xE9\u266D","R\xE9","Mi\u266D","Mi","Fa","Fa\u266F","Sol","La\u266D","La","Si\u266D","Si"];var Wo=[{id:"major",name:"Majeur",iv:[0,2,4,5,7,9,11],minor:!1},{id:"minor",name:"Mineur",iv:[0,2,3,5,7,8,10],minor:!0},{id:"dorian",name:"Dorien",iv:[0,2,3,5,7,9,10],minor:!0},{id:"phrygian",name:"Phrygien",iv:[0,1,3,5,7,8,10],minor:!0},{id:"harmonic",name:"Mineur harmonique",iv:[0,2,3,5,7,8,11],minor:!0},{id:"phrygdom",name:"Phrygien dominant",iv:[0,1,4,5,7,8,10],minor:!1},{id:"mixolydian",name:"Mixolydien",iv:[0,2,4,5,7,9,10],minor:!1},{id:"lydian",name:"Lydien",iv:[0,2,4,6,7,9,11],minor:!1},{id:"melodic",name:"Mineur m\xE9lodique",iv:[0,2,3,5,7,9,11],minor:!0},{id:"hungarian",name:"Hongrois",iv:[0,2,3,6,7,8,11],minor:!0}];function As(o){return Wo.find(e=>e.id===o)||Wo[0]}var Bc=[0,4,2,5,1,6,3],Ic=[0,4,2,6,3,1,5],cs=[1,2,3,4,5,6,7,12];function cr(o,e){let t=As(o);if(e>=12){let i=[];for(let r=0;r<12;r++){let n=0;for(let l=0;l<7;l++)t.iv[l]<=r&&(n=l);i.push({deg:n,acc:r-t.iv[n],semi:r})}return i}return(t.minor?Ic:Bc).slice(0,Math.max(1,Math.min(7,e))).sort((i,r)=>i-r).map(i=>({deg:i,acc:0,semi:t.iv[i]}))}function jn(o,e,t,a,s=48){let i=As(a),r=Math.floor(o/7),n=o-r*7;return s+t+r*12+i.iv[n]+(e||0)}function Ls(o,e,t){let a=As(t),s=Math.floor(o/7);return s*12+a.iv[o-s*7]+(e||0)}function Zt(o,e,t){let a=cr(e,t),s=a.length,i=Math.floor(o.lo/12)-1,r=0,n=(u,c)=>u*12+a[c].semi;for(;n(i,r)<o.lo;)r++,r>=s&&(r=0,i++);let l=[];for(let u=0;u<o.n;u++){let c=a[r];l.push({deg:i*7+c.deg,acc:c.acc,semi:i*12+c.semi,octave:i,isRoot:c.semi===0&&c.acc===0}),r++,r>=s&&(r=0,i++)}return l}function Fc(o,e){let t=As(e),a=Math.floor(o/12),s=o-a*12,i=0;for(let r=0;r<7;r++)t.iv[r]<=s&&(i=r);return{deg:a*7+i,acc:s-t.iv[i]}}var zc=new Set([1,3,6,8,10]),Ws=.6,Aa=.62;function Gn(o,e,t,a){let s=Zt(o,e,t),i=h=>zc.has(((a+h)%12+12)%12),r=s[0].semi,n=s[s.length-1].semi;for(;n-r<11;)n++,n-r<11&&r--;i(r)&&r--,i(n)&&n++;let l=new Set(Zt({lo:r-12,n:96},e,t).map(h=>h.semi)),u=[],c=0;for(let h=r;h<=n;h++){let d=i(h),{deg:m,acc:v}=Fc(h,e);u.push({semi:h,black:d,pos:c,deg:m,acc:v,inScale:l.has(h),isRoot:(h%12+12)%12===0}),d||c++}return{keys:u,whites:c}}function Vn(o,e,t){let{keys:a,whites:s}=o;if(t<Ws){for(let r of a)if(r.black&&Math.abs(e-r.pos/s)<Aa/s/2)return r}let i=Math.min(s-1,Math.max(0,Math.floor(e*s)));return a.find(r=>!r.black&&r.pos===i)}function Nc(o,e,t){let a=cr(e,t),s=Math.floor(o/12),i=null;for(let r=s-1;r<=s;r++)for(let n of a){let l=r*12+n.semi;l<=o&&(i===null||l>i)&&(i=l)}return i===null?o:i}function Wn(o,e,t,a){let s=Zt(o,e,t),i=s.length?s[s.length-1].semi:o.lo,r=Nc(o.lo,e,a),n=0,l=Zt({lo:r,n:64},e,a);for(let u of l)if(u.semi<=i+.5)n++;else break;return{lo:r,n:Math.max(1,Math.min(36,n))}}var lr=24;function oe(o,e,t=16){let a=e.map(([s,i,r])=>[Math.round(s*lr),Math.max(3,Math.round(i*lr)),r?1:0]);return a.sort((s,i)=>s[0]-i[0]),{name:o,len:t*lr,ev:a}}function Vt(o,e,t,a,s,i=0,r=16){let n=[];for(let l=0;l<a;l++)n.push([e+l*t,s,i&&l%i===0]);return oe(o,n,r)}function Vs(o,e,t=384){return{name:o,len:t,ev:e.map(([a,s,i])=>[a,s,i?1:0])}}var hs=[{name:"Libre",len:0,ev:[]},oe("Ronde",[[0,15.5,1]]),oe("Blanches",[[0,7.5,1],[8,7.5,0]]),oe("Noires",[[0,3.2,1],[4,3.2,0],[8,3.2,0],[12,3.2,0]]),Vt("Croches",0,2,8,1.5,4),Vt("Doubles",0,1,16,.8,4),oe("Point\xE9es",[[0,2.6,1],[3,2.6,0],[6,2.6,0],[9,2.6,0],[12,1.6,1],[14,1.6,0]]),oe("Tresillo",[[0,2.6,1],[3,2.6,0],[6,1.6,0],[8,2.6,1],[11,2.6,0],[14,1.6,0]]),oe("Contretemps",[[2,1.5,1],[6,1.5,0],[10,1.5,1],[14,1.5,0]]),oe("Galop",[[0,1.6,1],[2,.8,0],[3,.8,0],[4,1.6,1],[6,.8,0],[7,.8,0],[8,1.6,1],[10,.8,0],[11,.8,0],[12,1.6,1],[14,.8,0],[15,.8,0]]),oe("Deux-pas",[[0,2.5,1],[3,1.5,0],[6,3.5,0],[10,1.5,1],[12,3.5,0]]),oe("Dembow",[[0,1.5,1],[3,.9,0],[4,1.5,0],[7,.9,0],[8,1.5,1],[11,.9,0],[12,1.5,0],[15,.9,0]]),Vs("Triolets",Array.from({length:12},(o,e)=>[e*32,26,e%3===0])),oe("Log drum",[[0,2,1],[3,1,0],[6,2.5,1],[10,1,0],[12,1,0],[14,1.6,1]]),oe("Jersey",[[0,2.5,1],[4,2.5,1],[8,1.5,1],[10,2,0],[13,2.5,1]]),Vt("Arp\xE8ge",0,1,16,.9,3),oe("Rafales",[[0,.45,1],[.5,.45,0],[1,.45,0],[1.5,.45,0],[6,1.5,1],[8,.45,1],[8.5,.45,0],[9,.45,0],[9.5,.45,0],[12,1.5,0],[14,1.5,1]])],w=.5,Hc=[{name:"Coup par coup",len:0,ev:[]},oe("Quatre temps",[[0,w,1],[4,w,0],[8,w,0],[12,w,0]]),oe("Un et trois",[[0,w,1],[8,w,0]]),oe("Deux-pas",[[0,w,1],[10,w,0]]),oe("Trap",[[0,w,1],[7,w,0],[10,w,0]],16),oe("Breakbeat",[[0,w,1],[10,w,0],[16,w,1],[23,w,0],[26,w,0]],32),oe("Jersey",[[0,w,1],[4,w,1],[8,w,1],[10,w,0],[13,w,1]]),oe("Montagem",[[0,w,1],[3,w,0],[6,w,0],[10,w,1],[12,w,0]]),oe("Afro",[[0,w,1],[4,w,0],[7,w,0],[8,w,0],[12,w,0]]),oe("Amapiano",[[0,w,1],[4,w,0],[8,w,0],[12,w,0],[14,w,0]]),oe("Martel\xE9",[[0,w,1],[4,w,0],[8,w,0],[12,w,0],[14,w,0],[15,w,0]]),oe("Roulant",[[0,w,1],[3,w,0],[4,w,0],[8,w,0],[11,w,0],[12,w,0]]),oe("Demi-temps",[[0,w,1],[11,w,0],[19,w,0]],32),oe("Syncope",[[0,w,1],[6,w,0],[10,w,0]]),Vt("Croches",0,2,8,w,4),Vt("Rouleau",0,1,16,w,4),oe("Reggaeton",[[0,w,1],[4,w,0],[8,w,0],[12,w,0],[10,w,0]])],Uc=[{name:"Coup par coup",len:0,ev:[]},oe("Deux et quatre",[[4,w,1],[12,w,1]]),oe("Demi-temps",[[8,w,1]]),oe("Dembow",[[3,w,1],[6,w,0],[11,w,1],[14,w,0]]),oe("Deux-pas",[[4,w,1],[12,w,1],[15,w,0]]),oe("Breakbeat",[[4,w,1],[12,w,1],[20,w,1],[25,w,0],[28,w,1]],32),oe("Jersey",[[4,w,1],[12,w,1],[14,w,0],[15,w,0]]),oe("Trap",[[8,w,1],[24,w,1],[30,w,0],[31,w,0]],32),oe("Funk",[[4,w,1],[7,w,0],[12,w,1],[14,w,0]]),oe("Afro",[[4,w,1],[10,w,0],[12,w,1]]),oe("Fant\xF4mes",[[4,w,1],[9,w,0],[12,w,1],[15,w,0]]),Vt("Croches",0,2,8,w,2),oe("Rafale",[[12,w,1],[13,w,0],[14,w,0],[15,w,1]]),oe("Contretemps",[[2,w,1],[6,w,0],[10,w,1],[14,w,0]]),oe("Trois-trois-deux",[[0,w,1],[3,w,0],[6,w,0],[8,w,1],[11,w,0],[14,w,0]]),oe("Syncop\xE9",[[3,w,1],[10,w,1]]),Vt("Roulement",0,1,16,w,4)],jc=[{name:"Coup par coup",len:0,ev:[]},Vt("Croches",0,2,8,w,2),Vt("Doubles",0,1,16,w,4),oe("Contretemps",[[2,w,1],[6,w,1],[10,w,1],[14,w,1]]),oe("Deux-pas",[[0,w,1],[2,w,0],[3,w,0],[6,w,1],[8,w,0],[10,w,1],[11,w,0],[14,w,1]]),Vs("Triolets",Array.from({length:12},(o,e)=>[e*32,12,e%3===0])),Vs("Roulements",[0,24,48,60,72,96,120,144,156,168,180,192,216,240,264,276,288,312,336,344,352,360,368,376].map((o,e)=>[o,6,o%96===0])),Vt("Noires",0,4,4,w,1),oe("Galop",[[0,w,1],[2,w,0],[3,w,0],[4,w,1],[6,w,0],[7,w,0],[8,w,1],[10,w,0],[11,w,0],[12,w,1],[14,w,0],[15,w,0]]),oe("Afro",[[0,w,1],[3,w,0],[6,w,0],[8,w,1],[11,w,0],[14,w,0],[15,w,0]]),oe("Accents",Array.from({length:16},(o,e)=>[e,w,e%4===2])),Vs("Triolets 16",Array.from({length:24},(o,e)=>[e*16,8,e%6===0])),oe("Sautill\xE9",[[0,w,1],[3,w,0],[4,w,1],[7,w,0],[8,w,1],[11,w,0],[12,w,1],[15,w,0]]),oe("Point\xE9es",[[0,w,1],[3,w,0],[6,w,0],[9,w,0],[12,w,1]]),Vs("Rafales",[0,48,96,108,120,132,192,240,288,300,312,324,336,348,360,372].map(o=>[o,6,o%96===0])),oe("Clave",[[0,w,1],[3,w,0],[6,w,0],[10,w,1],[12,w,0]]),oe("Shuffle",[[0,w,1],[3,w,0],[4,w,1],[7,w,0],[8,w,1],[11,w,0],[12,w,1],[14,w,0],[15,w,0]])],Gc=[{name:"Coup par coup",len:0,ev:[]},oe("Clave son",[[0,w,1],[3,w,0],[6,w,0],[10,w,1],[12,w,0]]),oe("Clave rumba",[[0,w,1],[3,w,0],[7,w,0],[10,w,1],[12,w,0]]),oe("Tresillo",[[0,w,1],[3,w,0],[6,w,0],[8,w,1],[11,w,0],[14,w,0]]),Vt("Shaker",0,1,16,w,2),oe("Tumbao",[[2,w,0],[3,w,1],[6,w,0],[7,w,1],[10,w,0],[11,w,1],[14,w,0],[15,w,1]]),oe("Cloche phonk",[[0,w,1],[2,w,0],[3,w,1],[5,w,0],[6,w,1],[8,w,0],[10,w,1],[11,w,0],[13,w,1],[14,w,0]]),Vs("Cloche 12/8",[0,2,4,5,7,9,11].map((o,e)=>[o*32,12,e===0])),oe("Contretemps",[[2,w,1],[6,w,0],[10,w,1],[14,w,0]]),oe("Log",[[3,w,1],[6,w,0],[11,w,1],[14,w,0]]),Vt("Croches",0,2,8,w,2),Vt("Noires",0,4,4,w,1),oe("Syncope",[[1,w,1],[4,w,0],[7,w,1],[10,w,0],[13,w,1]]),oe("Rim deux-pas",[[3,w,0],[7,w,1],[11,w,0],[14,w,1]]),Vs("Triolets",Array.from({length:12},(o,e)=>[e*32,12,e%3===0])),Vs("Rafales",[288,300,312,324,336,348,360,372].map((o,e)=>[o,6,e===0])),oe("Montagem",[[0,w,1],[3,w,0],[6,w,1],[8,w,0],[10,w,1],[12,w,0],[14,w,1]])],Ys=[Hc,Uc,jc,Gc];function Yn(o,e){let t=o.ev.length;if(!e||t<2)return[];let a=Math.min(e,t-1),s=[];for(let i=0;i<a;i++){let r=Math.round((i+1)*t/(a+1));r<1&&(r=1),r>t-1&&(r=t-1),s.includes(r)||s.push(r)}return s}function hr(o){return Math.max(0,o.ev.length-1)}var Kn=[1,2,4,8];var ia={lo:-24,hi:36,maxN:24,maxSemis:37};function Yo(o,e,t=ia){let a=cr(o,e),s=[];for(let i=Math.floor(t.lo/12);i<=Math.ceil(t.hi/12);i++)for(let r of a){let n=i*12+r.semi;n>=t.lo&&n<t.hi&&s.push(n)}return s.sort((i,r)=>i-r)}function ur(o,e,t,a,s=ia){let i=Yo(t,a,s),r=0,n=1/0;i.forEach((u,c)=>{let h=Math.abs(u-e);h<n&&(n=h,r=c)});let l=Math.min(o.n,i.length);return r=Math.max(0,Math.min(i.length-l,r)),{lo:i[r],n:l}}function dr(o,e,t,a,s,i=ia){let r=Yo(a,s,i),n=Zt(o,a,s),l=n[0].semi,u=n[n.length-1].semi,c=r[0],h=1/0;for(let v of r){let g=Math.abs(v-t);g<h&&(h=g,c=v)}let d=(v,g)=>r.filter(f=>f>=v&&f<=g).length;if(e==="left"){let v=Math.min(c,u);return v=Math.max(v,u-i.maxSemis+1),{lo:v,n:Math.min(i.maxN,Math.max(1,d(v,u)))}}let m=Math.max(c,l);return m=Math.min(m,l+i.maxSemis-1),{lo:l,n:Math.min(i.maxN,Math.max(1,d(l,m)))}}var $n="motif-3",Vc=3;function na(){let o=new Uint8Array(8);return crypto.getRandomValues(o),Array.from(o,e=>e.toString(16).padStart(2,"0")).join("")}function Rs(o="A"){return{name:o,drum:[{hits:[]},{hits:[]},{hits:[]},{hits:[]}],bass:{notes:[]},lead:{notes:[]},auto:{},gest:{bass:[],lead:[],drum:[]}}}function Ps(o={}){let e=Date.now();return{format:$n,v:Vc,id:na(),name:o.name||"Nouvelle id\xE9e",created:e,updated:e,tempo:o.tempo||120,swing:50,key:o.key??2,scale:o.scale||"minor",bars:2,parts:{drum:{kit:o.kit||[null,null,null,null],macros:[null,null,null,null],rhythm:[1,1,1,4],mute:[!1,!1,!1,!1],level:[0,0,0,0]},bass:{preset:o.bass||null,macros:null,rhythm:4,ties:0,steps:5,range:{lo:-12,n:8},arp:"order",q:24,mute:!1,level:0},lead:{preset:o.lead||null,macros:null,rhythm:5,ties:0,steps:5,range:{lo:0,n:10},arp:"order",q:24,mute:!1,level:0}},mix:{drum:0,bass:0,lead:0,pump:.3,master:0,space:.5,drumDrive:.15,drumSpace:.1},patterns:[Rs("A")],current:0,song:{enabled:!1,sections:[]}}}var Ae=(o,e,t,a)=>{let s=Number(o);return Number.isFinite(s)?Math.min(a,Math.max(t,s)):e};function Ks(o){if(!o||typeof o!="object")throw new Error("Fichier de projet illisible");if(o.format&&o.format!==$n)throw new Error("Format de projet inconnu");let t=Ps();t.id=typeof o.id=="string"?o.id.slice(0,40):na(),t.name=typeof o.name=="string"&&o.name.trim()?o.name.slice(0,80):"Sans titre",t.created=Ae(o.created,Date.now(),0,1e15),t.updated=Ae(o.updated,Date.now(),0,1e15),t.tempo=Ae(o.tempo,120,40,220),t.swing=Ae(o.swing,50,50,75),t.key=Ae(o.key,0,0,11)|0,t.scale=typeof o.scale=="string"?o.scale:"minor",t.bars=[1,2,4,8].includes(o.bars)?o.bars:2;let a=o.parts||{};if(a.drum){let r=a.drum;t.parts.drum.kit=[0,1,2,3].map(n=>r.kit&&typeof r.kit[n]=="string"?r.kit[n]:null),t.parts.drum.macros=[0,1,2,3].map(n=>r.macros&&Array.isArray(r.macros[n])?r.macros[n].slice(0,7).map(l=>l===null?null:Ae(l,.5,0,1)):null),t.parts.drum.rhythm=[0,1,2,3].map(n=>Ae(r.rhythm&&r.rhythm[n],1,0,16)|0),t.parts.drum.mute=[0,1,2,3].map(n=>!!(r.mute&&r.mute[n])),t.parts.drum.level=[0,1,2,3].map(n=>Ae(r.level&&r.level[n],0,-40,6))}for(let r of["bass","lead"]){let n=a[r];if(!n)continue;let l=t.parts[r];l.preset=typeof n.preset=="string"?n.preset:null,l.macros=Array.isArray(n.macros)?n.macros.slice(0,7).map(u=>u===null?null:Ae(u,.5,0,1)):null,l.rhythm=Ae(n.rhythm,l.rhythm,0,16)|0,l.ties=Ae(n.ties,0,0,24)|0,l.steps=[1,2,3,4,5,6,7,12].includes(n.steps)?n.steps:l.steps,n.range&&(l.range={lo:Ae(n.range.lo,l.range.lo,-36,48)|0,n:Ae(n.range.n,l.range.n,1,36)|0}),l.arp=["order","up","down","chord"].includes(n.arp)?n.arp:"order",l.q=[6,12,24,48].includes(n.q)?n.q:24,l.mute=!!n.mute,l.level=Ae(n.level,0,-40,6)}if(o.mix)for(let r of Object.keys(t.mix))o.mix[r]!==void 0&&(t.mix[r]=Ae(o.mix[r],t.mix[r],-40,12));let s=384*t.bars,i=Array.isArray(o.patterns)&&o.patterns.length?o.patterns.slice(0,8):[Rs("A")];return t.patterns=i.map((r,n)=>{let l=Rs(typeof r.name=="string"?r.name.slice(0,12):String.fromCharCode(65+n));for(let u=0;u<4;u++){let c=r.drum&&r.drum[u]&&Array.isArray(r.drum[u].hits)?r.drum[u].hits:[];l.drum[u].hits=c.filter(h=>h&&h.t>=0&&h.t<s).slice(0,4e3).map(h=>({t:h.t|0,v:Ae(h.v,.8,0,1),x:Ae(h.x,1,0,2)|0,c:Ae(h.c,.5,0,1)}))}for(let u of["bass","lead"]){let c=r[u]&&Array.isArray(r[u].notes)?r[u].notes:[];l[u].notes=c.filter(h=>h&&h.t>=0&&h.t<s).slice(0,4e3).map(h=>({t:h.t|0,d:Ae(h.d,24,1,s)|0,deg:Ae(h.deg,0,-60,60)|0,acc:Ae(h.acc,0,-2,2)|0,v:Ae(h.v,.8,0,1),tie:!!h.tie,...typeof h.y=="number"?{y:Ae(h.y,.5,0,1)}:{}}))}if(r.gest&&typeof r.gest=="object")for(let u of["bass","lead","drum"]){let c=Array.isArray(r.gest[u])?r.gest[u]:[],h=2e4;l.gest[u]=[];for(let d of c){if(!d||!Array.isArray(d.p)||h<=0)continue;let m=d.p.filter(v=>Array.isArray(v)&&v[0]>=0&&v[0]<s).slice(0,h).map(v=>u==="drum"?[Math.round(Ae(v[0],0,0,s)*10)/10,Ae(v[1],.5,0,1),Ae(v[2],.5,0,1)]:[Math.round(Ae(v[0],0,0,s)*10)/10,Ae(v[1],.5,0,1),Ae(v[2],.5,0,1),Ae(v[3],0,-60,60)|0,Ae(v[4],0,-2,2)|0]);m.length&&(h-=m.length,l.gest[u].push(u==="drum"?{l:Ae(d.l,0,0,3)|0,p:m}:{p:m}))}}if(r.auto&&typeof r.auto=="object"){for(let u of["d0","d1","d2","d3","bass","lead"])if(r.auto[u])for(let c=0;c<7;c++){let h=r.auto[u][c];if(Array.isArray(h)&&h.length){l.auto[u]=l.auto[u]||{};let d=s/12;l.auto[u][c]=Array.from({length:d},(m,v)=>{let g=h[v];return g==null||g<0?-1:Ae(g,-1,0,1)})}}}return l}),t.current=Ae(o.current,0,0,t.patterns.length-1)|0,o.song&&Array.isArray(o.song.sections)&&(t.song.sections=o.song.sections.slice(0,64).map(r=>({p:Ae(r.p,0,0,t.patterns.length-1)|0,reps:Ae(r.reps,1,1,16)|0,mute:r.mute&&typeof r.mute=="object"?{d0:!!r.mute.d0,d1:!!r.mute.d1,d2:!!r.mute.d2,d3:!!r.mute.d3,bass:!!r.mute.bass,lead:!!r.mute.lead}:{}})),t.song.enabled=!!o.song.enabled&&t.song.sections.length>0),t}function Qn(o,e){let t=384*o.bars,a=384*e;if(e!==o.bars){for(let s of o.patterns){let i=(r,n)=>{if(a>t){let l=[];for(let u=t;u<a;u+=t)for(let c of r)c.t+u<a&&l.push(n(c,u));return r.concat(l)}return r.filter(l=>l.t<a).map(l=>l.d&&l.t+l.d>a?{...l,d:a-l.t}:l)};for(let r=0;r<4;r++)s.drum[r].hits=i(s.drum[r].hits,(n,l)=>({...n,t:n.t+l}));for(let r of["bass","lead"])s[r].notes=i(s[r].notes,(n,l)=>({...n,t:n.t+l}));if(s.gest)for(let r of["bass","lead","drum"]){let n=s.gest[r]||[];if(a>t){let l=[];for(let u=t;u<a;u+=t)for(let c of n)l.push({...c,p:c.p.map(h=>[h[0]+u,...h.slice(1)])});s.gest[r]=n.concat(l)}else s.gest[r]=n.map(l=>({...l,p:l.p.filter(u=>u[0]<a)})).filter(l=>l.p.length)}for(let r in s.auto)for(let n in s.auto[r]){let l=s.auto[r][n],u=a/12;s.auto[r][n]=Array.from({length:u},(c,h)=>l[h%l.length])}}o.bars=e}}function fr(o,e,t,a,s,i=!0){if(Wc(o,e,e==="drum"?t:void 0,a,s),e==="drum"){let r=t==null?[0,1,2,3]:[t];for(let n of r)o.drum[n].hits=o.drum[n].hits.filter(l=>l.t<a||l.t>=s);if(i)for(let n of r)Xn(o,"d"+n,a,s)}else o[e].notes=o[e].notes.filter(r=>r.t<a||r.t>=s),i&&Xn(o,e,a,s)}function Wc(o,e,t,a,s){if(!o.gest||!o.gest[e])return;let i=[];for(let r of o.gest[e]){if(e==="drum"&&t!==void 0&&t!==null&&r.l!==t){i.push(r);continue}let n=r.p.filter(u=>u[0]<a),l=r.p.filter(u=>u[0]>=s);if(n.length===r.p.length){i.push(r);continue}for(let u of[n,l])u.length&&i.push({...r,p:u})}o.gest[e]=i}function Xn(o,e,t,a){let s=o.auto[e];if(s){for(let i in s){let r=s[i];for(let n=Math.floor(t/12);n<Math.ceil(a/12)&&n<r.length;n++)r[n]=-1;r.every(n=>n<0)&&delete s[i]}Object.keys(s).length||delete o.auto[e]}}function Jn(o,e,t){o.range=Wn(o.range,t,o.steps,e),o.steps=e}function pr(o){return o.drum.reduce((e,t)=>e+t.hits.length,0)+o.bass.notes.length+o.lead.notes.length}var Yc=[{name:"Court",off:{bodyDecay:-1,boomDecay:-1,smpDecay:-1.5}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8,boomDecay:.6,smpDecay:.6}}],Kc=[{name:"Frappe",def:.5,map:[["click",-.3,.45],["pAmt",-10,10],["clickTone",-.6,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1.2],["boomDecay",-1,1]]}],Xc={name:"Couleur",def:.6,map:[["tone",-2.6,0],["drive",-.12,.3]]},Be=(o,e,t,a={})=>({id:"kick."+o,name:e,style:a.style||null,desc:a.desc||"",p:{kind:0,...t},samples:a.samples,variants:a.variants||Yc,macros:a.macros||Kc,expr:a.expr||Xc,trim:a.trim||0}),Zn=[["vd-kick-2-1",0,70],["vd-kick-3-1",71,104],["vd-kick-4-1",105,127],["vd-kick-4-2",105,127]],e0=[Be("rond","Rond",{freq:50,pAmt:26,pDecay:.045,bodyDecay:.42,click:.3,clickTone:3200,drive:.15,driveType:3},{desc:"Rond et polyvalent, attaque douce"}),Be("club","Club",{freq:53,pAmt:34,pDecay:.03,pAmt2:14,pDecay2:.003,bodyDecay:.34,bodyShape:.2,click:.5,clickTone:4500,drive:.3,driveType:1},{desc:"Punch de club, m\xE9dium pr\xE9sent"}),Be("profond","Profond",{freq:43,pAmt:22,pDecay:.06,bodyDecay:.6,boom:.35,boomDecay:.9,click:.18,tone:6e3},{desc:"Grave profond, queue souple"}),Be("808","808 long",{freq:46,pAmt:18,pDecay:.028,bodyDecay:.35,boom:.85,boomDecay:1.6,click:.22,clickTone:2500,drive:.12},{desc:"Grosse caisse 808 tenue",macros:[{name:"Glisse",def:.35,map:[["pDecay",-1,2.2],["pAmt",-6,14]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,1.2],["boom",-.4,.15]]}]}),Be("feutre","Feutr\xE9",{freq:56,pAmt:14,pDecay:.05,bodyDecay:.28,click:.08,tone:2200,drive:.25,driveType:3},{desc:"Mat, chaud, presque acoustique"}),Be("acoustique","Acoustique",{freq:52,pAmt:10,pDecay:.04,bodyDecay:.22,bodyLevel:.35,click:0,smpLevel:1.05,smpDecay:2},{desc:"Grosse caisse de batterie jazz, prises Virtuosity Drums",samples:Zn,macros:[{name:"Peau \u2194 Sub",def:.3,map:[["smpLevel",.15,-.6],["bodyLevel",-.25,.6]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.7,map:[["tone",-2.6,0],["drive",0,.35]]}}),Be("sec","Sec",{freq:62,pAmt:30,pDecay:.018,bodyDecay:.16,click:.6,clickTone:5e3},{desc:"Tr\xE8s court, net, rapide"}),Be("concert","Grosse caisse",{freq:45,pAmt:6,pDecay:.05,bodyDecay:.7,bodyLevel:.4,click:0,smpLevel:1.1,smpDecay:2.5},{desc:"Grosse caisse d\u2019orchestre (VCSL), ample",samples:[["vcsl-bassdrum"]],macros:[{name:"Ampleur",def:.5,map:[["smpDecay",-1.6,1],["bodyLevel",-.3,.4]]},{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]}]}),Be("sature","Satur\xE9",{freq:54,pAmt:32,pDecay:.035,bodyDecay:.32,drive:.65,driveType:1,click:.4,tone:12e3},{desc:"Saturation franche, attaque mordante",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.28],["tone",-1,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),Be("rebond","Rebond",{freq:50,pAmt:24,pDecay:.095,bodyDecay:.5,click:.25},{desc:"Chute de hauteur lente, \xE9lastique"}),Be("sub","Sub",{freq:41,pAmt:10,pDecay:.04,bodyDecay:.8,click:.06,tone:3e3},{desc:"Presque une note de sub"}),Be("clic","Clic",{freq:55,pAmt:28,pDecay:.014,bodyDecay:.3,click:1,clickTone:7e3,clickDecay:.0018},{desc:"Clic aigu tr\xE8s pr\xE9cis"}),Be("vinyle","Vinyle",{freq:54,pAmt:16,pDecay:.04,bodyDecay:.3,bodyLevel:.6,crush:.3,tone:4e3,drive:.3,driveType:3,smpLevel:.8,smpDecay:1},{desc:"Kick poussi\xE9reux, micro lo-fi",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.25,.4],["tone",.6,-1]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]}),Be("909","Neuf-z\xE9ro",{freq:54,pAmt:30,pDecay:.03,bodyDecay:.3,bodyShape:.45,click:.55,clickTone:6e3,clickDecay:.006},{desc:"Analogique techno, l\xE9g\xE8rement carr\xE9"}),Be("boom","Boom",{freq:47,pAmt:22,pDecay:.04,bodyDecay:.3,boom:.55,boomDecay:1.1,drive:.2},{desc:"Hip-hop ample, queue tenue"}),Be("papier","Papier",{freq:65,pAmt:20,pDecay:.02,bodyDecay:.14,click:.45,clickTone:1600,tone:4e3},{desc:"Sec et mat, comme un carton"}),Be("plie","Pli\xE9",{freq:50,pAmt:30,pDecay:.03,bodyDecay:.4,drive:.45,driveType:2,tone:8e3},{desc:"Repliement d\u2019onde : grain harmonique",macros:[{name:"Pli",def:.4,map:[["drive",-.3,.45]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),Be("cajon","Caj\xF3n",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse en bois frapp\xE9e (VCSL)",samples:[["vcsl-cajon-bass",0,127,0],["vcsl-cajon-mid",0,127,1],["vcsl-cajon-slap",0,127,2]],variants:[{name:"Basse"},{name:"Milieu"},{name:"Claque"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),Be("cadre","Tambour sur cadre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Frame drum (VCSL), grave et feutr\xE9",samples:[["vcsl-frame-lo",0,127,0],["vcsl-frame-mute",0,127,1],["vcsl-frame-hi",0,127,2]],variants:[{name:"Ouvert"},{name:"\xC9touff\xE9"},{name:"Petit"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,3]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),Be("tom","Tom grave",{freq:68,pAmt:7,pDecay:.05,bodyDecay:.45,bodyLevel:.45,click:0,smpLevel:1,smpDecay:2},{desc:"Tom basse de batterie + sous-couche synth\xE9tique",samples:[["vd-ltom-8",0,90],["vd-ltom-14",91,127]],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}]}),Be("montagem","Montagem",{freq:50,pAmt:40,pDecay:.032,pAmt2:18,pDecay2:.003,bodyDecay:.45,bodyShape:.5,drive:.85,driveType:1,click:.5,tone:1e4,boom:.3,boomDecay:.7},{style:"phonk",desc:"\xC9cr\xEAt\xE9, agressif, pens\xE9 pour la montagem",macros:[{name:"\xC9cr\xEAtage",def:.5,map:[["drive",-.4,.15],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boom",-.3,.4],["boomDecay",-1,1]]}]}),Be("garage","Garage",{freq:56,pAmt:28,pDecay:.028,bodyDecay:.26,click:.45,clickTone:5200,drive:.18,bodyShape:.15},{style:"ukg",desc:"Court et rebondi pour le 2-step"}),Be("afroprofond","Afro profond",{freq:44,pAmt:16,pDecay:.06,bodyDecay:.5,click:.12,clickTone:2200,drive:.2,driveType:3,boom:.35,boomDecay:1,tone:5e3},{style:"afro",desc:"Profond, chaud, laisse respirer"}),Be("pianofeutre","Piano feutre",{freq:51,pAmt:15,pDecay:.045,bodyDecay:.24,click:.14,tone:3200,drive:.15,driveType:3},{style:"amapiano",desc:"Discret, laisse la place au log drum"}),Be("perreo","Perreo",{freq:57,pAmt:30,pDecay:.035,bodyDecay:.34,bodyShape:.25,click:.4,clickTone:3800,drive:.32,driveType:0},{style:"reggaeton",desc:"Rond et dense pour le dembow"}),Be("jersey","Jersey",{freq:60,pAmt:44,pDecay:.02,pAmt2:12,pDecay2:.002,bodyDecay:.22,click:.75,clickTone:6e3,drive:.38,driveType:1},{style:"jersey",desc:"Tr\xE8s articul\xE9 pour les rafales"}),Be("break","Break",{freq:55,pAmt:26,pDecay:.02,bodyDecay:.18,bodyLevel:.5,click:.2,drive:.25,smpLevel:1,smpDecay:.35},{style:"dnb",desc:"Acoustique serr\xE9 + sub court",samples:Zn,macros:[{name:"Peau \u2194 Sub",def:.45,map:[["smpLevel",.1,-.6],["bodyLevel",-.3,.5]]},{name:"Longueur",def:.5,map:[["smpDecay",-1,2],["bodyDecay",-1,1]]}]}),Be("808rage","808 rage",{freq:45,pAmt:24,pDecay:.03,bodyDecay:.4,boom:.95,boomDecay:1.9,bodyShape:.35,drive:.55,driveType:0,click:.3,tone:9e3},{style:"rage",desc:"808 satur\xE9e et tenue",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.35],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,.8]]}]}),Be("rumble","Rumble",{freq:45,pAmt:38,pDecay:.025,bodyDecay:.28,drive:.9,driveType:0,boom:.75,boomDecay:.9,click:.45,tone:5e3,hp:35},{style:"hardtechno",desc:"Kick dur avec tra\xEEne grave satur\xE9e",macros:[{name:"Rumble",def:.5,map:[["boom",-.5,.35],["boomDecay",-1,.8]]},{name:"Duret\xE9",def:.5,map:[["drive",-.4,.15],["click",-.3,.4]]}]}),Be("poussiere","Poussi\xE8re",{freq:52,pAmt:18,pDecay:.05,bodyDecay:.4,click:.2,tone:1600,crush:.4,drive:.3,driveType:3,smpLevel:.6,smpDecay:1},{style:"triphop",desc:"\xC9touff\xE9 et granuleux, tempo lent",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.35,.45],["tone",1,-.6],["drive",-.2,.3]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]})];var $c=[{name:"Fant\xF4me",off:{level:-9,noiseDecay:-.7,bodyDecay:-.5,smpDecay:-1}},{name:"Normal"},{name:"Ouvert",off:{noiseDecay:.8,bodyDecay:.4,revSend:.1,smpDecay:.8}}],Qc=[{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1],["noiseTone",-.8,.8]]}],Jc={name:"Claquant",def:.5,map:[["snap",-.3,.45],["drive",-.05,.3]]},Zc=[{name:"Serr\xE9",off:{bursts:-1,noiseDecay:-.8}},{name:"Normal"},{name:"Large",off:{bursts:1,noiseDecay:.7,width:.3,revSend:.15}}],eh=[{name:"Mains",def:.5,map:[["burstGap",-.6,.6],["bursts",-1,2]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["revSend",-.05,.3]]}],th={name:"\xC9clat",def:.5,map:[["noiseTone",-.5,.6],["drive",-.05,.3]]},sh=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.6]]}],ah={name:"Couleur",def:.6,map:[["tone",-2.3,0],["drive",-.05,.3]]},Ie=(o,e,t,a={})=>({id:"snare."+o,name:e,style:a.style||null,desc:a.desc||"",p:{kind:1,freq:190,...t},samples:a.samples,variants:a.variants||(t.kind===2?Zc:$c),macros:a.macros||(t.kind===2?eh:t.kind===7?sh:Qc),expr:a.expr||(t.kind===2?th:t.kind===7?ah:Jc),trim:a.trim||0}),mr=[["vd-snare-8",0,50],["vd-snare-16",51,80],["vd-snare-24",81,100],["vd-snare-32",101,117],["vd-snare-36",118,127]],Ko=[["vd-xstick-6",0,60],["vd-xstick-12",61,100],["vd-xstick-16",101,127]],Xo=[["vcsl-clap-1"],["vcsl-clap-2"],["vcsl-clap-3"]],$o=(o,e)=>o.map(([t,a=0,s=127])=>[t,a,s,e]),t0=[Ie("classique","Classique",{pAmt:6,pDecay:.03,bodyDecay:.1,body2:.5,ratio2:1.62,noiseLevel:.8,noiseTone:9e3,noiseHP:800,noiseDecay:.2,snap:.5,clickTone:4500},{desc:"Caisse claire analogique \xE9quilibr\xE9e"}),Ie("clap808","Clap 808",{kind:2,noiseLevel:1,noiseTone:1150,noiseQ:.4,noiseHP:600,noiseDecay:.18,bursts:4,burstGap:.0085,width:.4},{desc:"Clap analogique classique"}),Ie("rim","Rimshot",{kind:4,freq:520,mdMat:7,bodyDecay:.13,mdHard:.9,click:.35,clickTone:3500},{desc:"Cercle de caisse claire, bois\xE9 et court",macros:[{name:"Accord",def:.5,map:[["tune",-5,5]]},{name:"R\xE9sonance",def:.4,map:[["bodyDecay",-1,1.4]]}],expr:{name:"Frappe",def:.6,map:[["mdHard",-.4,.1],["click",-.3,.15],["level",2.5,-2]]}}),Ie("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse claire jazz (Virtuosity Drums) : cross-stick, centre, buzz",samples:[...$o(Ko,0),...$o(mr,1),["vd-buzz-6",0,80,2],["vd-buzz-12",81,127,2]],variants:[{name:"Cross-stick"},{name:"Centre"},{name:"Buzz"}]}),Ie("sanstimbre","Sans timbre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Timbre rel\xE2ch\xE9 : son de tom sec",samples:[["vd-snoff-6",0,80],["vd-snoff-12",81,127]],variants:[{name:"Grave",off:{smpTune:-3}},{name:"Normal"},{name:"Aigu",off:{smpTune:3}}]}),Ie("fantome","Fant\xF4me",{freq:210,pAmt:4,bodyDecay:.06,noiseLevel:.5,noiseTone:7e3,noiseHP:1200,noiseDecay:.09,snap:.2,level:-3},{desc:"L\xE9ger, pour les notes fant\xF4mes"}),Ie("crepitant","Cr\xE9pitant",{pAmt:5,bodyDecay:.12,bodyLevel:.6,noiseLevel:1,noiseTone:6e3,noiseHP:400,noiseDecay:.45,crush:.15,snap:.3},{desc:"Longue queue de grain"}),Ie("clapserre","Clap serr\xE9",{kind:2,noiseLevel:1,noiseTone:1600,noiseQ:.35,noiseHP:700,noiseDecay:.08,bursts:2,burstGap:.005,width:.25},{desc:"Clap court et pr\xE9cis"}),Ie("claplarge","Clap large",{kind:2,noiseLevel:1,noiseTone:1050,noiseQ:.25,noiseHP:500,noiseDecay:.4,bursts:5,burstGap:.011,width:1,revSend:.25},{desc:"Clap ample en st\xE9r\xE9o"}),Ie("doigts","Claquement",{kind:2,noiseLevel:1.1,noiseTone:2600,noiseQ:.7,noiseHP:1500,noiseDecay:.05,bursts:1,burstGap:.004,width:.1},{desc:"Claquement de doigts sec"}),Ie("mains","Mains",{kind:7,smpLevel:1,smpDecay:3},{desc:"Vrais claps (VCSL) : seul, groupe, groupe en salle",samples:[["vcsl-soloclap-2",0,90,0],["vcsl-soloclap-3",91,127,0],...$o(Xo,1),...$o(Xo,2)],variants:[{name:"Seul"},{name:"Groupe"},{name:"Salle",off:{revSend:.3}}]}),Ie("lofi","Lo-fi",{pAmt:8,bodyDecay:.1,body2:.4,noiseLevel:.85,noiseTone:7e3,noiseHP:900,noiseDecay:.18,crush:.5,tone:5e3,snap:.3},{desc:"\xC9chantillonneur vieilli, 8 bits",macros:[{name:"Usure",def:.5,map:[["crush",-.35,.35],["tone",.8,-.8]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1]]}]}),Ie("metal","M\xE9tal",{freq:240,pAmt:3,bodyDecay:.35,body2:.9,ratio2:2.31,noiseLevel:.6,noiseTone:9e3,noiseHP:1500,noiseDecay:.16,snap:.4},{desc:"R\xE9sonance m\xE9tallique accord\xE9e",macros:[{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.2,1],["body2",-.5,.1]]},{name:"Accord",def:.5,map:[["tune",-6,6]]}]}),Ie("tomsnare","Tom-caisse",{freq:160,pAmt:12,pDecay:.05,bodyDecay:.22,body2:.3,ratio2:1.5,noiseLevel:.35,noiseTone:6e3,noiseHP:700,noiseDecay:.12},{desc:"Tonal, \xE0 mi-chemin du tom"}),Ie("balai","Balai",{bodyLevel:.15,bodyDecay:.05,noiseLevel:.9,noiseTone:5e3,noiseHP:1200,noiseDecay:.3,noiseAttack:.03,snap:0},{desc:"Frottement de balai, attaque lente",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.5,1.2],["noiseDecay",-.7,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.8],["noiseHP",-.6,.6]]}]}),Ie("electro","\xC9lectro",{freq:230,pAmt:18,pDecay:.02,bodyDecay:.12,noiseLevel:.9,noiseTone:12e3,noiseHP:1800,noiseDecay:.16,snap:.8,clickTone:6e3,drive:.3,driveType:1},{desc:"Brillant, chute de hauteur rapide"}),Ie("snareclap","Caisse + clap",{pAmt:6,bodyDecay:.1,body2:.4,noiseLevel:.6,noiseTone:8e3,noiseHP:1e3,noiseDecay:.16,snap:.3,smpLevel:.7,smpDecay:2},{desc:"Caisse synth\xE9tique doubl\xE9e de vrais claps",samples:Xo,macros:[{name:"Caisse \u2194 Clap",def:.5,map:[["smpLevel",-.5,.5],["noiseLevel",.3,-.4],["bodyLevel",.2,-.5]]},{name:"Queue",def:.5,map:[["noiseDecay",-1,1],["smpDecay",-2.5,.5],["revSend",-.05,.25]]}]}),Ie("ressort","Ressort",{freq:180,pAmt:9,pDecay:.06,bodyDecay:.6,body2:.7,ratio2:1.45,noiseLevel:.5,noiseTone:7e3,noiseHP:900,noiseDecay:.25,drive:.2},{desc:"Corps qui sonne longtemps"}),Ie("roulement","Roulement",{kind:7,smpLevel:1,smpDecay:3},{desc:"Buzz de caisse claire (roul\xE9 press\xE9)",samples:[["vd-buzz-6",0,80],["vd-buzz-12",81,127]]}),Ie("crossstick","Cross-stick",{kind:7,smpLevel:1,smpDecay:3},{desc:"Baguette pos\xE9e sur le cercle",samples:Ko}),Ie("clapmontagem","Clap montagem",{kind:2,noiseLevel:1,noiseTone:1400,noiseQ:.3,noiseHP:600,noiseDecay:.2,bursts:3,burstGap:.007,drive:.8,driveType:1,width:.4},{style:"phonk",desc:"Clap \xE9cras\xE9, tr\xE8s pr\xE9sent"}),Ie("garage","Garage snare",{freq:220,pAmt:8,bodyDecay:.07,noiseLevel:.85,noiseTone:11e3,noiseHP:1500,noiseDecay:.11,snap:.6,smpLevel:.4,smpDecay:1},{style:"ukg",desc:"Sec et nerveux pour le 2-step",samples:Ko}),Ie("clapafro","Clap afro",{kind:2,noiseLevel:.9,noiseTone:1e3,noiseQ:.2,noiseHP:450,noiseDecay:.3,bursts:4,burstGap:.012,width:.9,revSend:.2},{style:"afro",desc:"Doux, large, a\xE9r\xE9"}),Ie("rimpiano","Rim piano",{kind:4,freq:600,mdMat:7,bodyDecay:.06,mdHard:.8,click:.4,bodyLevel:.5,smpLevel:.7,smpDecay:1},{style:"amapiano",desc:"Rimshot bois\xE9 et feutr\xE9",samples:Ko,macros:[{name:"Accord",def:.5,map:[["tune",-5,5],["smpTune",-5,5]]},{name:"Bois \u2194 Baguette",def:.5,map:[["bodyLevel",-.4,.4],["smpLevel",.4,-.5]]}]}),Ie("dembow","Snare dembow",{freq:200,pAmt:10,bodyDecay:.08,noiseLevel:.9,noiseTone:8e3,noiseHP:1200,noiseDecay:.12,snap:.7,drive:.2},{style:"reggaeton",desc:"Claquant et court"}),Ie("clapjersey","Clap jersey",{kind:2,noiseLevel:1,noiseTone:1300,noiseQ:.3,noiseHP:600,noiseDecay:.22,bursts:4,burstGap:.008,drive:.35,driveType:1,smpLevel:.5,smpDecay:2},{style:"jersey",desc:"Clap \xE9norme, doubl\xE9",samples:Xo,macros:[{name:"Synth\xE9 \u2194 Mains",def:.4,map:[["smpLevel",-.45,.7],["noiseLevel",.3,-.6]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["smpDecay",-2,.5],["revSend",-.05,.3]]}]}),Ie("dnb","Snare DnB",{freq:200,bodyDecay:.1,bodyLevel:.5,noiseLevel:.6,noiseTone:9e3,noiseHP:1200,noiseDecay:.16,snap:.6,drive:.3,smpLevel:1,smpDecay:1.5},{style:"dnb",desc:"Crack acoustique renforc\xE9",samples:mr,macros:[{name:"Crack",def:.5,map:[["snap",-.3,.5],["drive",-.2,.35]]},{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3],["smpTune",-2,2]]}]}),Ie("claprage","Clap rage",{kind:2,noiseLevel:1,noiseTone:1250,noiseQ:.3,noiseHP:500,noiseDecay:.25,bursts:3,burstGap:.009,width:1,drive:.5,revSend:.2},{style:"rage",desc:"Large et satur\xE9"}),Ie("industriel","Clap industriel",{kind:2,noiseLevel:1,noiseTone:1800,noiseQ:.55,noiseHP:700,noiseDecay:.35,bursts:4,burstGap:.01,drive:.6,driveType:2,width:.6,revSend:.3},{style:"hardtechno",desc:"R\xE9sonance m\xE9tallique, salle froide"}),Ie("poussiere","Snare poussi\xE8re",{kind:7,smpLevel:1,smpDecay:3,crush:.35,tone:4500,drive:.3,driveType:3,revSend:.15},{style:"triphop",desc:"Caisse claire us\xE9e, lente",samples:mr})];var oh=[{name:"Ferm\xE9"},{name:"Mi-ouvert",off:{noiseDecay:1.3}},{name:"Ouvert",off:{noiseDecay:2.6,revSend:.05}}],ih=[{name:"M\xE9tal \u2194 Souffle",def:.5,map:[["metal",.35,-.5]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.7],["noiseHP",-.7,.5]]}],rh={name:"Longueur",def:.4,map:[["noiseDecay",-.7,1],["smpDecay",-1.5,1]]},nh=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Brillance",def:.6,map:[["tone",-2.4,0],["hp",0,1.6]]}],lh={name:"Longueur",def:.65,map:[["smpDecay",-3,.5]]},Fe=(o,e,t,a={})=>({id:"hat."+o,name:e,style:a.style||null,desc:a.desc||"",p:{kind:3,freq:400,noiseLevel:.8,...t},samples:a.samples,variants:a.variants||oh,macros:a.macros||(t.kind===7?nh:ih),expr:a.expr||(t.kind===7?lh:rh),trim:a.trim||0}),s0=[["vd-hh-closed-2-1",0,80,0],["vd-hh-closed-2-2",0,80,0],["vd-hh-closed-4-1",81,127,0],["vd-hh-closed-4-2",81,127,0],["vd-hh-half-3",0,127,1],["vd-hh-open-3",0,127,2]],a0=[{name:"Doux",off:{level:-5}},{name:"Normal"},{name:"Long",off:{smpDecay:1,revSend:.08}}],o0=[Fe("analogique","Analogique",{metal:.75,noiseTone:9e3,noiseHP:6500,noiseDecay:.06},{desc:"M\xE9tallique fa\xE7on bo\xEEte \xE0 rythmes"}),Fe("bruit","Bruit blanc",{metal:0,noiseTone:1e4,noiseHP:7e3,noiseDecay:.05,width:.5},{desc:"Souffle pur, tr\xE8s lisible"}),Fe("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Charleston jazz (Virtuosity Drums) : ferm\xE9, mi-ouvert, ouvert",samples:s0,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]}),Fe("ride","Ride",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Cymbale ride : frappe, cloche",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Forte"}]}),Fe("crash","Crash",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Crash et cymbale \xE0 rivets",samples:[["vd-crash-2-1",0,127,0],["vd-crash-2-1",0,127,1],["vd-sizzle-2-1",0,127,2]],variants:[{name:"Court",off:{smpDecay:-2.5}},{name:"Crash"},{name:"Rivets"}]}),Fe("fin","Fin",{metal:.5,noiseTone:13e3,noiseHP:9e3,noiseDecay:.04},{desc:"Petit tic aigu"}),Fe("sombre","Sombre",{metal:.6,metalTune:-7,noiseTone:6e3,noiseHP:3500,noiseDecay:.08},{desc:"Grave et feutr\xE9"}),Fe("brillant","Brillant",{metal:.4,noiseTone:14e3,noiseHP:8e3,noiseDecay:.07,width:.7},{desc:"Air et brillance"}),Fe("lofi","Lo-fi",{metal:.6,noiseTone:9e3,noiseHP:5e3,noiseDecay:.06,crush:.45,tone:9e3},{desc:"Granuleux, r\xE9duit en bits"}),Fe("tss","Tss",{metal:.2,noiseTone:11e3,noiseHP:6e3,noiseDecay:.2,noiseAttack:.008},{desc:"Souffle ouvert, attaque douce"}),Fe("shaker","Shaker",{kind:7,smpLevel:1,smpDecay:4},{desc:"Shaker (Virtuosity Drums) aller / retour",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-shaker-d",0,127,2],["vd-shaker-u",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Altern\xE9"}]}),Fe("tambourin","Tambourin",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Tambourin secou\xE9",samples:[["vd-tamb-1"],["vd-tamb-2"]],variants:a0}),Fe("triangle","Triangle",{kind:7,smpLevel:1,smpDecay:6,choke:1},{desc:"Triangle \xE9touff\xE9 ou ouvert",samples:[["vd-tri-mute",0,127,0],["vd-tri-open",0,127,1],["vd-tri-open",0,127,2]],variants:[{name:"\xC9touff\xE9"},{name:"Ouvert"},{name:"Long",off:{revSend:.15}}]}),Fe("cabasa","Cabasa",{kind:7,smpLevel:1,smpDecay:4},{desc:"Perles m\xE9talliques frott\xE9es",samples:[["vd-cabasa"]],variants:a0}),Fe("charleston2","Charleston clair",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Autre charleston (VCSL) : ferm\xE9, l\xE2che, ouvert",samples:[["vcsl-hh-closed",0,127,0],["vcsl-hh-loose",0,127,1],["vcsl-hh-open",0,127,2]],variants:[{name:"Ferm\xE9"},{name:"L\xE2che"},{name:"Ouvert"}]}),Fe("clochette","Clochette",{metal:1,metalTune:12,noiseTone:8e3,noiseHP:4e3,noiseDecay:.15},{desc:"M\xE9tal accord\xE9, presque une cloche"}),Fe("grain","Granuleux",{kind:6,noiseTone:9e3,noiseQ:.3,noiseHP:5e3,noiseDecay:.07,noiseAttack:.004,bodyShape:.75,noiseLevel:1},{desc:"Grains de sable irr\xE9guliers",macros:[{name:"Grain",def:.5,map:[["bodyShape",-.5,.25]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),Fe("large","St\xE9r\xE9o",{metal:.3,noiseTone:1e4,noiseHP:6e3,noiseDecay:.09,width:1},{desc:"Ouvert dans l\u2019image st\xE9r\xE9o"}),Fe("pichenette","Pichenette",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Cymbalettes \xE0 doigts (VCSL)",samples:[["vcsl-fingercym"]],variants:[{name:"Court",off:{smpDecay:-3}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),Fe("pedale","P\xE9dale",{metal:.5,noiseTone:7e3,noiseHP:5e3,noiseDecay:.025,noiseAttack:.004},{desc:"Chick sec de p\xE9dale"}),Fe("drift","Hat drift",{metal:.7,noiseTone:1e4,noiseHP:7500,noiseDecay:.045,drive:.4},{style:"phonk",desc:"Court et croustillant"}),Fe("garage","Hat garage",{metal:.55,noiseTone:11e3,noiseHP:7e3,noiseDecay:.055,width:.4},{style:"ukg",desc:"Swing et ouvertures nettes"}),Fe("shakerafro","Shaker afro",{kind:7,smpLevel:1,smpDecay:4,revSend:.18,tone:7e3,smpTune:-2},{style:"afro",desc:"Shaker organique, un peu d\u2019espace",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-cabasa",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Cabasa"}]}),Fe("shakerpiano","Shaker piano",{kind:6,noiseTone:7500,noiseQ:.3,noiseHP:4e3,noiseDecay:.14,noiseAttack:.02,bodyShape:.4,width:.6,noiseLevel:1},{style:"amapiano",desc:"Long shaker soyeux",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.2,1],["noiseDecay",-.6,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),Fe("perreo","Hat perreo",{metal:.65,noiseTone:9500,noiseHP:6e3,noiseDecay:.05},{style:"reggaeton",desc:"R\xE9gulier et lisible"}),Fe("jersey","Hat jersey",{metal:.5,noiseTone:12e3,noiseHP:8e3,noiseDecay:.035,drive:.25},{style:"jersey",desc:"Pointu pour les doubles croches"}),Fe("ridednb","Ride DnB",{kind:7,smpLevel:1,smpDecay:.7,hp:1800,choke:1},{style:"dnb",desc:"Ride serr\xE9e et rapide",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Ouverte",off:{smpDecay:2}}]}),Fe("trap","Hat trap",{metal:.8,noiseTone:10500,noiseHP:8e3,noiseDecay:.03,drive:.2},{style:"rage",desc:"Tr\xE8s serr\xE9, fait pour les roulements"}),Fe("industriel","Hat industriel",{metal:.3,noiseTone:9e3,noiseHP:5e3,noiseDecay:.25,drive:.7,driveType:2,revSend:.1},{style:"hardtechno",desc:"Ouvert, dur, satur\xE9"}),Fe("vinyle","Hat vinyle",{kind:7,smpLevel:1,smpDecay:4,crush:.4,tone:6e3,choke:1},{style:"triphop",desc:"Charleston us\xE9 et sombre",samples:s0,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]})];var ch=[{name:"Grave",off:{tune:-5,smpTune:-5}},{name:"M\xE9dium"},{name:"Aigu",off:{tune:5,smpTune:5}}],hh=[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"R\xE9sonance",def:.6,map:[["smpDecay",-2.5,.6],["revSend",-.05,.25]]}],uh={name:"Couleur",def:.6,map:[["tone",-2.4,0],["drive",-.05,.3]]},dh=[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.3,1.3]]}],fh={name:"Frappe",def:.6,map:[["mdHard",-.4,.2],["click",-.2,.15],["level",2.5,-2]]},ze=(o,e,t,a={})=>({id:"perc."+o,name:e,style:a.style||null,desc:a.desc||"",p:{kind:7,smpLevel:1,smpDecay:4,...t},samples:a.samples,variants:a.variants||ch,macros:a.macros||((t.kind??7)===7?hh:dh),expr:a.expr||((t.kind??7)===7?uh:fh),trim:a.trim||0}),_t=(...o)=>o.flatMap((e,t)=>e.map(([a,s=0,i=127])=>[a,s,i,t])),i0=[ze("conga","Conga",{},{desc:"Tumba, conga ouverte, conga \xE9touff\xE9e (Virtuosity Drums)",samples:_t([["vd-tumba"]],[["vd-conga-open-lo",0,100],["vd-conga-open-hi",101,127]],[["vd-conga-mute"]]),variants:[{name:"Tumba"},{name:"Ouverte"},{name:"\xC9touff\xE9e"}]}),ze("bongo","Bongo",{},{desc:"Paire de bongos",samples:_t([["vd-bongo-lo"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),ze("cloche","Cloche",{},{desc:"Cloche de vache r\xE9elle",samples:[["vd-cowbell-1",0,90],["vd-cowbell-2",91,127]]}),ze("cloche808","Cloche 808",{kind:5,freq:540,ratio2:1.48,bodyDecay:.06,noiseDecay:.35,noiseTone:2600,noiseQ:.3,bodyLevel:1},{desc:"Cloche analogique \xE0 deux oscillateurs",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.5,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.5,map:[["noiseTone",-.6,.6],["drive",0,.4]]}}),ze("agogo","Agog\xF4",{},{desc:"Cloches agog\xF4 grave et aigu\xEB",samples:_t([["vd-agogo-lo"]],[["vd-agogo-hi"]],[["vd-agogo-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Aigu\xEB tendue",off:{smpTune:2}}]}),ze("claves","Claves",{},{desc:"Deux b\xE2tons de bois",samples:[["vd-claves-1",0,90],["vd-claves-2",91,127]]}),ze("bloc","Wood-block",{},{desc:"Bloc de bois grave / aigu",samples:_t([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-woodblock-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Tr\xE8s aigu",off:{smpTune:4}}]}),ze("guiro","G\xFCiro",{},{desc:"R\xE2pe en bois",samples:[["vd-guiro"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long"}]}),ze("timbales","Timbales",{},{desc:"Timbales latines",samples:_t([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Sec",off:{smpDecay:-2}}]}),ze("cuica","Cu\xEDca",{},{desc:"Tambour \xE0 friction br\xE9silien",samples:_t([["vd-cuica-1"]],[["vd-cuica-2"]],[["vd-cuica-2"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Tr\xE8s aigu\xEB",off:{smpTune:4}}]}),ze("darbuka","Darbouka",{},{desc:"Frappes de darbouka (VCSL)",samples:_t([["vcsl-darbuka-1"],["vcsl-darbuka-2"]],[["vcsl-darbuka-3"]],[["vcsl-darbuka-4"],["vcsl-darbuka-5"]]),variants:[{name:"Centre"},{name:"Bord"},{name:"Claque"}]}),ze("cajon","Caj\xF3n aigu",{},{desc:"Claques de caj\xF3n",samples:_t([["vcsl-cajon-mid"]],[["vcsl-cajon-slap"]],[["vcsl-cajon-slap"]]),variants:[{name:"Milieu"},{name:"Claque"},{name:"Claque s\xE8che",off:{smpDecay:-2}}]}),ze("fente","Tambour \xE0 fente",{},{desc:"Log drum en bois (VCSL)",samples:_t([["vcsl-slit-lo"]],[["vcsl-slit-hi"]],[["vcsl-slit-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),ze("toms","Toms",{},{desc:"Toms de batterie",samples:_t([["vd-ltom-8",0,90],["vd-ltom-14",91,127]],[["vd-htom-8",0,90],["vd-htom-14",91,127]],[["vd-htom-14"]]),variants:[{name:"Basse"},{name:"Haute"},{name:"Haute tendue",off:{smpTune:3}}]}),ze("goutte","Goutte",{kind:4,freq:900,mdMat:2,pAmt:12,pDecay:.02,bodyDecay:.4,mdHard:.4,revSend:.1},{desc:"Goutte de verre accord\xE9e"}),ze("boisynth","Bois synth\xE9tique",{kind:4,freq:750,mdMat:0,bodyDecay:.2,mdHard:.7,click:.2},{desc:"R\xE9sonateur de bois"}),ze("tom808","Tom 808",{kind:8,freq:120,mdMat:3,pAmt:10,pDecay:.1,bodyDecay:.45,mdHard:.5},{desc:"Tom analogique qui chute"}),ze("vibraslap","Vibraslap",{},{desc:"Claquement vibrant",samples:[["vd-vibraslap"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),ze("enclume","Enclume",{drive:.15},{desc:"M\xE9taux frapp\xE9s : enclume, tambours de frein",samples:_t([["vcsl-anvil"]],[["vcsl-brake-1"]],[["vcsl-brake-2"]]),variants:[{name:"Enclume"},{name:"Frein 1"},{name:"Frein 2"}]}),ze("blip","Blip",{kind:4,freq:1200,mdMat:4,pAmt:24,pDecay:.008,bodyDecay:.11,mdHard:.9},{desc:"Bip synth\xE9tique zapp\xE9"}),ze("clochephonk","Cloche phonk",{kind:5,freq:560,ratio2:1.48,bodyDecay:.08,noiseDecay:.25,noiseTone:2800,noiseQ:.35,drive:.5,driveType:1},{style:"phonk",desc:"Cloche satur\xE9e, jouable en m\xE9lodie (axe vertical = hauteur)",variants:[{name:"Courte",off:{noiseDecay:-1.2}},{name:"Normale"},{name:"Longue",off:{noiseDecay:.8}}],macros:[{name:"Saturation",def:.5,map:[["drive",-.4,.4]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.2,1]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),ze("toc","Toc garage",{kind:4,freq:950,mdMat:0,bodyDecay:.12,mdHard:.85,click:.25,clickTone:5e3,drive:.1},{style:"ukg",desc:"Bois tr\xE8s court pour le shuffle"}),ze("djembe","Peau afro",{kind:8,freq:220,mdMat:3,pAmt:14,pDecay:.03,bodyDecay:.25,noiseLevel:.4,noiseDecay:.05,noiseHP:1500,noiseTone:6e3,click:.4,clickTone:3e3},{style:"afro",desc:"Peau synth\xE9tique avec claque",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Peau \u2194 Claque",def:.4,map:[["noiseLevel",-.3,.6],["bodyLevel",.2,-.4]]}]}),ze("logdrum","Log drum",{kind:8,freq:90,mdMat:3,pAmt:19,pDecay:.05,bodyDecay:.5,mdHard:.7,drive:.3,driveType:3},{style:"amapiano",desc:"Log drum percussif (axe vertical = hauteur)",variants:[{name:"Court",off:{bodyDecay:-1}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8}}],macros:[{name:"Glisse",def:.5,map:[["pAmt",-10,10],["pDecay",-.6,.8]]},{name:"Grain",def:.4,map:[["drive",-.25,.45],["mdHard",-.3,.3]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),ze("timbal","Timbal perreo",{smpDecay:.8,drive:.3,smpTune:2,hp:300,tone:9e3},{style:"reggaeton",desc:"Timbales s\xE8ches pour le dembow",samples:_t([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Ouverte",off:{smpDecay:2}}]}),ze("couinement","Couinement",{kind:4,freq:1400,mdMat:4,pAmt:7,pDecay:.06,bodyDecay:.22,mdHard:.9,drive:.2},{style:"jersey",desc:"Petit cri synth\xE9tique, original"}),ze("tombreak","Tom break",{smpDecay:.6,drive:.25},{style:"dnb",desc:"Toms tendus pour les breaks",samples:_t([["vd-ltom-14"]],[["vd-htom-14"]],[["vd-snoff-12"]]),variants:[{name:"Tom basse"},{name:"Tom haute"},{name:"Caisse sans timbre"}]}),ze("laser","Laser",{kind:4,freq:1600,mdMat:4,pAmt:30,pDecay:.01,bodyDecay:.13,mdHard:1,drive:.4},{style:"rage",desc:"Bip laser satur\xE9"}),ze("metalindus","M\xE9tal industriel",{drive:.6,driveType:2,revSend:.2},{style:"hardtechno",desc:"Freins frapp\xE9s, satur\xE9s, salle froide",samples:_t([["vcsl-brake-1"]],[["vcsl-brake-2"]],[["vcsl-anvil"]]),variants:[{name:"Frein 1"},{name:"Frein 2"},{name:"Enclume"}]}),ze("boisfeutre","Bois feutr\xE9",{tone:2500,crush:.2,revSend:.2},{style:"triphop",desc:"Bois \xE9touff\xE9 et lointain",samples:_t([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-claves-1"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Claves"}]})];var Ne=(o,e,t,a,s,i,r,n={})=>({id:"bass."+o,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||1,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.03,aA:.003,aR:.08,...a},groups:s,macros:i,expr:r,trim:n.trim||0}),M=(o,e,t)=>({name:o,def:e,map:t}),us=[M("\xC9cho",0,[["dlMix",0,.35],["dlFb",0,.3]]),M("Salle",.1,[["rvSend",-.03,.3]])],vr=[Ne("sub","Sub pur","va",{osc1Wave:3,fType:4,vDrive:.15,vDriveType:3,aD:.3,aS:.95,aR:.12,osc2Wave:3,osc2Semi:12,osc2Level:0},["Chaleur","Forme","Glisse"],[M("Harmoniques",.3,[["vDrive",-.15,.5]]),M("Octave",0,[["osc2Level",0,.55]]),M("Attaque",.2,[["aA",-.5,6]]),M("Rel\xE2che",.3,[["aR",-.8,2.5]]),M("Glisse",.4,[["glide",-2,2.5],["pEnvAmt",0,5],["pEnvTime",0,1]]),M("Tenue",.8,[["aS",-.6,.05],["aD",-1,1]])],{name:"Grain",def:.3,map:[["fxDrive",0,.45],["fxLP",0,-1.5]]},{desc:"Sinus pur, grave centr\xE9"}),Ne("moog","Moog rond","va",{osc1Wave:0,fType:0,cutoff:280,reso:.35,fEnv:3.2,fD:.22,fS:.15,keyTrack:.4,subLevel:.5,aS:.9},["Filtre","Enveloppe","Couleur"],[M("Ouverture",.45,[["cutoff",-1.5,2]]),M("R\xE9sonance",.4,[["reso",-.35,.6],["cutoff",0,.5]]),M("Mordant",.5,[["fEnv",-2.5,3]]),M("D\xE9clin",.45,[["fD",-1.5,1.6]]),M("Saturation",.2,[["fDrive",0,.8]]),M("Sub",.5,[["subLevel",-.5,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,2]]},{desc:"Analogique classique, rond et souple"}),Ne("acide","Acide","va",{osc1Wave:0,osc2Wave:1,osc2Level:0,fType:0,cutoff:380,reso:.82,fEnv:4,fD:.16,fS:0,keyTrack:.5,velFilt:.7,glide:.07,aD:.25,aS:.7,aR:.06,vDrive:.2},["Filtre","Accent","Grain"],[M("Coupure",.4,[["cutoff",-1.5,2.2]]),M("R\xE9sonance",.7,[["reso",-.45,.14]]),M("Enveloppe",.5,[["fEnv",-2.5,3]]),M("D\xE9clin",.4,[["fD",-1.4,1.8]]),M("Distorsion",.25,[["vDrive",-.2,.7]]),M("Scie \u2194 Carr\xE9",0,[["osc1Level",0,-1],["osc2Level",0,1]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{desc:"Ligne acide r\xE9sonante, glisse sur les liaisons"}),Ne("reese","Reese","va",{osc1Wave:0,unison:3,detune:18,spread:.35,osc2Wave:0,osc2Semi:-12,osc2Level:.3,fType:0,cutoff:900,reso:.15,fEnv:.5,subLevel:.6,chMix:.2,lfoRate:.25,aS:1,aR:.15},["Battement","Filtre","Largeur"],[M("D\xE9saccord",.4,[["detune",-12,25]]),M("Mouvement",.3,[["lfoCut",0,1.6]]),M("Ouverture",.45,[["cutoff",-1.5,1.8]]),M("Mordant",.25,[["fDrive",0,.8]]),M("Largeur",.4,[["spread",-.35,.6],["chMix",-.2,.4]]),M("Sub",.6,[["subLevel",-.6,.4]])],{name:"Ouverture",def:.4,map:[["cutoff",-1.2,1.6]]},{desc:"Scies d\xE9saccord\xE9es qui battent lentement"}),Ne("808","808 gliss\xE9e","va",{osc1Wave:3,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.3,vDriveType:0,glide:.09,aD:1.5,aS:.6,aR:.2},["Saturation","Glisse","Queue"],[M("Saturation",.4,[["vDrive",-.3,.5]]),M("Mordant",.2,[["fxDrive",0,.5]]),M("Glisse",.45,[["glide",-2,2]]),M("Punch",.5,[["pEnvAmt",-10,12]]),M("Queue",.5,[["aD",-1.5,1.5]]),M("Tenue",.5,[["aS",-.5,.35]])],{name:"Saturation",def:.4,map:[["vDrive",-.25,.45]]},{desc:"808 accord\xE9e, les notes qui se chevauchent glissent",glideMode:"legato"}),Ne("fm","FM grave","fm",{fmAlgo:0,fmR1:1,fmR2:1,fmL2:2.5,fmD2:.25,fmS2:.2,fmR3:3,fmL3:.6,fmD3:.12,fmS3:0,fmL4:0,fType:4,aS:.85,aR:.1},["Brillance","M\xE9tal","Espace"],[M("Indice",.45,[["fmL2",-2,3]]),M("D\xE9clin",.45,[["fmD2",-1.5,2]]),M("Rapport",0,[["fmR2",0,2.5]]),M("R\xE9troaction",0,[["fmFb",0,.7],["fmL4",0,1.5]]),...us],{name:"Indice",def:.4,map:[["fmL2",-1.5,2.5]]},{desc:"Basse FM num\xE9rique, attaque brillante"}),Ne("pluck","Pluck basse","va",{osc1Wave:0,osc2Wave:1,osc2Level:.4,fType:0,cutoff:200,reso:.25,fEnv:4.5,fD:.12,aD:.35,aS:.2,aR:.1},["Pincement","Corps","Espace"],[M("Pincement",.5,[["fEnv",-2.5,2.5],["fD",-.8,.8]]),M("R\xE9sonance",.3,[["reso",-.2,.5]]),M("Longueur",.4,[["aD",-1,2],["aS",-.15,.5]]),M("Grave",.3,[["subLevel",0,.8]]),...us],{name:"Brillance",def:.4,map:[["cutoff",-1,2]]},{desc:"Court et articul\xE9 pour la house"}),Ne("orgue","Orgue basse","wt",{wtTable:4,wtPos:.35,subLevel:.6,fType:1,cutoff:2500,reso:0,fEnv:0,fD:.06,chMix:.15,chRate:.8,aA:.002,aS:1,aR:.06},["Tirettes","Percussion","Rotation"],[M("Tirettes",.35,[["wtPos",-.35,.65]]),M("Sub",.6,[["subLevel",-.6,.4]]),M("Clic",.2,[["fEnv",0,3.5]]),M("Douceur",0,[["cutoff",0,-2.2]]),M("Rotation",.2,[["chMix",-.15,.6],["chRate",0,2.6]]),M("Saturation",.1,[["fxDrive",0,.5]])],{name:"Tirettes",def:.4,map:[["wtPos",-.3,.5]]},{desc:"Orgue grave fa\xE7on house/garage"}),Ne("contrebasse","Contrebasse","pluck",{pkDecay:1.2,pkDamp:.55,pkBright:.45,pkBody:.5,fType:1,cutoff:3e3,glide:.06,aS:1,aR:.15},["Corde","Caisse","Doigt"],[M("Tension",.5,[["pkDamp",.45,-.45],["pkBright",-.2,.25]]),M("R\xE9sonance",.5,[["pkDecay",-1.2,1.4]]),M("Caisse",.5,[["pkBody",-.4,.4]]),M("Bois\xE9",.5,[["cutoff",-1.6,1]]),M("Attaque",.45,[["pkBright",-.35,.45]]),M("Glisse",.3,[["glide",-2,2]])],{name:"Attaque",def:.45,map:[["pkBright",-.3,.4]]},{desc:"Corde pinc\xE9e physique, chaude"}),Ne("electrique","\xC9lectrique","va",{osc1Wave:0,osc2Wave:4,osc2PW:.3,osc2Level:.3,fType:0,cutoff:950,reso:.1,fEnv:2,fD:.3,vDrive:.05,aD:.6,aS:.5},["Doigt","Ampli","Espace"],[M("Attaque",.4,[["fEnv",-1,2.5]]),M("M\xE9diums",.5,[["osc2Level",-.3,.6],["osc2PW",-.2,.2]]),M("Ampli",.25,[["vDrive",-.1,.6]]),M("Grave",.3,[["subLevel",0,.7]]),...us],{name:"Brillance",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Basse \xE9lectrique au doigt, m\xE9diums pr\xE9sents"}),Ne("wobble","Wobble","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,fType:0,cutoff:300,reso:.5,lfoBeats:.5,lfoCut:3,lfoShape:0,subLevel:.5,vDrive:.25,aS:1,aR:.1},["Oscillation","Filtre","Grain"],[M("Vitesse",.5,[["lfoBeats",1.5,-.375]]),M("Profondeur",.6,[["lfoCut",-2.5,1.2]]),M("Ouverture",.4,[["cutoff",-1,1.8]]),M("R\xE9sonance",.5,[["reso",-.3,.4]]),M("Saturation",.3,[["vDrive",-.2,.6]]),M("Sub",.5,[["subLevel",-.5,.5]])],{name:"Profondeur",def:.5,map:[["lfoCut",-2,1]]},{desc:"Filtre oscillant cal\xE9 sur le tempo"}),Ne("hoover","Hoover","va",{osc1Wave:4,osc1PW:.3,unison:5,detune:30,spread:.8,osc2Wave:0,osc2Semi:-12,osc2Level:.6,lfoPW:.2,lfoRate:3,pEnvAmt:-5,pEnvTime:.12,fType:0,cutoff:1500,reso:.1,chMix:.4,aS:1,aR:.2},["Plong\xE9e","Ch\u0153ur","Filtre"],[M("Plong\xE9e",.5,[["pEnvAmt",5,-7],["pEnvTime",-.5,1]]),M("Pulsation",.4,[["lfoPW",-.2,.2]]),M("D\xE9saccord",.5,[["detune",-20,25]]),M("Ch\u0153ur",.4,[["chMix",-.3,.5]]),M("Ouverture",.5,[["cutoff",-1.5,1.5]]),M("R\xE9sonance",.2,[["reso",-.1,.5]])],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.2]]},{desc:"Rave des ann\xE9es 90, plongeant et large"}),Ne("carre","Carr\xE9","va",{osc1Wave:4,osc1PW:.5,subLevel:.2,fType:1,cutoff:3e3,reso:.1,fEnv:1.5,fD:.15,aD:.4,aS:.6},["Forme","Filtre","Espace"],[M("Largeur",1,[["osc1PW",-.4,0]]),M("Sub",.4,[["subLevel",-.4,.6]]),M("Ouverture",.5,[["cutoff",-2,1.5]]),M("Mordant",.3,[["fEnv",-1,3]]),...us],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Onde carr\xE9e, clin d\u2019\u0153il 8 bits"}),Ne("grondement","Grondement","wt",{wtTable:3,wtPos:.3,unison:3,detune:10,spread:.3,lfoBeats:1,lfoWt:.6,fType:1,cutoff:4e3,vDrive:.4,subLevel:.6,aS:1,aR:.12},["Gorge","Filtre","Grain"],[M("Gorge",.3,[["wtPos",-.3,.7]]),M("Mouvement",.5,[["lfoWt",-.6,.4],["lfoBeats",.6,-.5]]),M("Ouverture",.6,[["cutoff",-2.5,1]]),M("R\xE9sonance",.2,[["reso",0,.6]]),M("Saturation",.4,[["vDrive",-.3,.5]]),M("Sub",.6,[["subLevel",-.6,.4]])],{name:"Gorge",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Table d\u2019ondes qui \xAB parle \xBB, style bass music"}),Ne("doux","Doux","va",{osc1Wave:2,vDriveType:3,subLevel:.6,fType:1,cutoff:1200,aA:.01,aS:.9,aR:.2},["Rondeur","Souffle","Espace"],[M("Ouverture",.4,[["cutoff",-1,1.6]]),M("Sub",.6,[["subLevel",-.6,.4]]),M("Attaque",.3,[["aA",-.5,4]]),M("Chaleur",.2,[["vDrive",0,.4]]),...us],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.5]]},{desc:"Triangle tendre pour deep house"}),Ne("pulse","Pulse","va",{osc1Wave:4,osc1PW:.22,lfoPW:.15,lfoRate:.35,fType:0,cutoff:700,reso:.2,fEnv:2,fD:.25,aS:.8,subLevel:.3},["Impulsion","Filtre","Espace"],[M("Largeur",.3,[["osc1PW",-.17,.27]]),M("Modulation",.5,[["lfoPW",-.15,.2],["lfoRate",-1,2]]),M("Ouverture",.45,[["cutoff",-1.5,1.8]]),M("Mordant",.4,[["fEnv",-1.5,3]]),...us],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Impulsion \xE0 largeur mouvante"}),Ne("saturee","Satur\xE9e","va",{osc1Wave:0,fType:0,cutoff:900,reso:.25,fDrive:.8,vDrive:.5,fxDrive:.3,fxDriveType:1,subLevel:.5,aS:.9},["Distorsion","Filtre","Grave"],[M("Entr\xE9e",.6,[["fDrive",-.6,.2]]),M("Sortie",.4,[["vDrive",-.4,.45],["fxDrive",-.2,.4]]),M("Ouverture",.5,[["cutoff",-1.5,1.5]]),M("R\xE9sonance",.3,[["reso",-.2,.55]]),M("Sub",.5,[["subLevel",-.5,.5]]),M("Largeur",0,[["unison",0,2.4],["detune",0,18],["spread",0,.5]])],{name:"Distorsion",def:.4,map:[["vDrive",-.3,.45]]},{desc:"Scie satur\xE9e en deux \xE9tages"}),Ne("yoy","Yoy","formant",{formVowel:.2,formShift:-5,formQ:.6,formMix:.3,subLevel:.7,fType:4,glide:.07,lfoForm:0,lfoBeats:.5,aS:1,aR:.1},["Voyelle","Mouvement","Grain"],[M("Voyelle",.2,[["formVowel",-.2,.8]]),M("Gorge",.5,[["formShift",-6,6]]),M("Parole",.35,[["lfoForm",0,1]]),M("Vitesse",.5,[["lfoBeats",1.5,-.375]]),M("Saturation",.3,[["vDrive",0,.6]]),M("Sub",.7,[["subLevel",-.7,.3]])],{name:"Voyelle",def:.3,map:[["formVowel",-.2,.7]]},{desc:"Basse qui articule des voyelles (axe vertical)"}),Ne("stab","Stab","va",{osc1Wave:0,unison:5,detune:20,spread:.5,fType:0,cutoff:500,reso:.3,fEnv:3.5,fD:.1,aD:.22,aS:.05,aR:.08,dlMix:.12,dlBeats:.75},["Impact","Filtre","Espace"],[M("Longueur",.4,[["aD",-1,1.6],["fD",-.8,1.2]]),M("\xC9paisseur",.5,[["detune",-15,20],["unison",-3,2]]),M("Ouverture",.45,[["cutoff",-1.2,1.8]]),M("R\xE9sonance",.4,[["reso",-.25,.45]]),...us],{name:"Ouverture",def:.45,map:[["cutoff",-1,1.6]]},{desc:"Coup court et \xE9pais"}),Ne("marimba","Marimba grave","sampler",{fType:1,cutoff:6e3,aS:1,aR:.25,rvSend:.06},["Bois","Espace","Grain"],[M("Douceur",.2,[["cutoff",0,-2.5]]),M("Attaque",.5,[["smpStart",0,.06]]),M("\xC9cho",0,[["dlMix",0,.3]]),M("Salle",.15,[["rvSend",-.05,.3]]),M("Grain",0,[["fxDrive",0,.45]]),M("Sub",0,[["subLevel",0,.5]])],{name:"Douceur",def:.2,map:[["cutoff",0,-2]]},{desc:"Marimba enregistr\xE9 (VCSL) dans le grave",bank:"marimba"}),Ne("808montagem","808 montagem","va",{osc1Wave:3,fType:4,pEnvAmt:16,pEnvTime:.025,vDrive:.75,vDriveType:1,glide:.08,aD:1.2,aS:.5,aR:.15,fxDrive:.2,fxDriveType:1},["\xC9cr\xEAtage","Glisse","Queue"],[M("\xC9cr\xEAtage",.5,[["vDrive",-.4,.25]]),M("Mordant",.3,[["fxDrive",-.2,.5]]),M("Glisse",.45,[["glide",-2,2]]),M("Punch",.5,[["pEnvAmt",-12,10]]),M("Queue",.5,[["aD",-1.5,1.5]]),M("Tenue",.5,[["aS",-.45,.35]])],{name:"\xC9cr\xEAtage",def:.5,map:[["vDrive",-.3,.25]]},{style:"phonk",glideMode:"legato",desc:"808 tr\xE8s satur\xE9e qui glisse"}),Ne("speedgarage","Speed garage","va",{osc1Wave:0,unison:2,detune:12,spread:.2,fType:0,cutoff:450,reso:.3,lfoBeats:.5,lfoCut:1.2,subLevel:.7,glide:.05,aS:.9,aR:.08,vDrive:.2},["Oscillation","Filtre","Grave"],[M("Vitesse",.5,[["lfoBeats",1.5,-.375]]),M("Profondeur",.4,[["lfoCut",-1.2,1.5]]),M("Ouverture",.4,[["cutoff",-1,2]]),M("R\xE9sonance",.4,[["reso",-.25,.45]]),M("Sub",.7,[["subLevel",-.7,.3]]),M("Saturation",.3,[["vDrive",-.2,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{style:"ukg",desc:"Basse qui \xAB wobble \xBB pour le 2-step"}),Ne("afrorond","Afro rond","fm",{fmAlgo:0,fmR1:1,fmR2:2,fmL2:1.2,fmD2:.12,fmS2:.05,fmL3:0,fmL4:0,subLevel:.5,fType:1,cutoff:3e3,aD:.6,aS:.4,aR:.12,rvSend:.05},["Pincement","Corps","Espace"],[M("Pincement",.5,[["fmL2",-1,2],["fmD2",-.5,.8]]),M("Couleur",0,[["fmR2",0,1]]),M("Longueur",.4,[["aD",-1,1.5],["aS",-.3,.4]]),M("Sub",.5,[["subLevel",-.5,.5]]),...us],{name:"Pincement",def:.4,map:[["fmL2",-.8,1.8]]},{style:"afro",desc:"Ronde et bois\xE9e, laisse respirer les percussions"}),Ne("logdrum","Log drum","modal",{mdMat:3,mdDecay:.6,mdHard:.6,pEnvAmt:14,pEnvTime:.045,vDrive:.35,vDriveType:3,fType:4,aA:.001,aD:2,aS:1,aR:.25,subLevel:.25},["Glisse","Bois","Queue"],[M("Glisse",.5,[["pEnvAmt",-10,10]]),M("Vitesse",.5,[["pEnvTime",-1,1.2]]),M("Frappe",.5,[["mdHard",-.4,.4]]),M("Grain",.35,[["vDrive",-.3,.5]]),M("Queue",.5,[["mdDecay",-1.2,1.2]]),M("Sub",.25,[["subLevel",-.25,.5]])],{name:"Glisse",def:.5,map:[["pEnvAmt",-8,8]]},{style:"amapiano",desc:"Basse percussive qui chute, au c\u0153ur de l\u2019amapiano"}),Ne("subperreo","Sub perreo","va",{osc1Wave:3,osc2Wave:2,osc2Semi:12,osc2Level:.25,fType:4,pEnvAmt:4,pEnvTime:.02,vDrive:.25,aD:.5,aS:.7,aR:.1},["Rondeur","Punch","Espace"],[M("Pr\xE9sence",.3,[["osc2Level",-.25,.4]]),M("Chaleur",.3,[["vDrive",-.2,.45]]),M("Punch",.4,[["pEnvAmt",-4,12]]),M("Longueur",.5,[["aD",-1,1.5]]),...us],{name:"Pr\xE9sence",def:.3,map:[["osc2Level",-.2,.4]]},{style:"reggaeton",desc:"Sub lisible m\xEAme sur petit haut-parleur"}),Ne("bounce","Bounce","va",{osc1Wave:3,osc2Wave:1,osc2Level:.25,fType:1,cutoff:1400,pEnvAmt:24,pEnvTime:.015,aD:.18,aS:.3,aR:.06,vDrive:.3},["Rebond","Forme","Espace"],[M("Rebond",.5,[["pEnvAmt",-16,16],["pEnvTime",-.5,1]]),M("Longueur",.4,[["aD",-1,1.6],["aS",-.3,.5]]),M("Carr\xE9",.3,[["osc2Level",-.25,.6]]),M("Saturation",.3,[["vDrive",-.2,.5]]),...us],{name:"Rebond",def:.5,map:[["pEnvAmt",-12,12]]},{style:"jersey",desc:"Petit bond de hauteur \xE0 chaque note"}),Ne("turbine","Reese turbine","va",{osc1Wave:0,unison:7,detune:22,spread:.5,osc2Wave:0,osc2Semi:-12,osc2Level:.35,fType:0,cutoff:1100,reso:.15,fDrive:.4,lfoRate:.15,lfoCut:.6,subLevel:.7,chMix:.2,aS:1,aR:.15},["Turbine","Filtre","Largeur"],[M("D\xE9saccord",.45,[["detune",-15,28]]),M("Rotation",.4,[["lfoRate",-1.5,3],["lfoCut",-.5,1]]),M("Ouverture",.45,[["cutoff",-1.5,1.6]]),M("Mordant",.4,[["fDrive",-.4,.5]]),M("Largeur",.5,[["spread",-.5,.5],["chMix",-.2,.35]]),M("Sub",.7,[["subLevel",-.7,.3]])],{name:"Ouverture",def:.45,map:[["cutoff",-1.2,1.5]]},{style:"dnb",desc:"Sept scies qui tournent, sub s\xE9par\xE9"}),Ne("808rage","808 rage","va",{osc1Wave:3,osc2Wave:3,osc2Semi:12,osc2Level:.35,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.65,vDriveType:0,glide:.1,aD:2,aS:.55,aR:.2},["Saturation","Glisse","Queue"],[M("Saturation",.5,[["vDrive",-.4,.3]]),M("Octave",.35,[["osc2Level",-.35,.4]]),M("Glisse",.5,[["glide",-2,2]]),M("Punch",.5,[["pEnvAmt",-10,12]]),M("Queue",.5,[["aD",-1.5,1.2]]),M("Tenue",.5,[["aS",-.45,.35]])],{name:"Saturation",def:.5,map:[["vDrive",-.35,.3]]},{style:"rage",glideMode:"legato",desc:"808 large avec octave, pour le rage"}),Ne("acidedur","Acide dur","va",{osc1Wave:0,fType:0,cutoff:500,reso:.88,fEnv:4,fD:.14,velFilt:.7,glide:.06,aD:.22,aS:.7,aR:.05,vDrive:.4,fxDrive:.6,fxDriveType:2},["Filtre","Accent","Pli"],[M("Coupure",.4,[["cutoff",-1.5,2.2]]),M("R\xE9sonance",.8,[["reso",-.5,.1]]),M("Enveloppe",.5,[["fEnv",-2.5,3]]),M("D\xE9clin",.4,[["fD",-1.4,1.8]]),M("Pli",.5,[["fxDrive",-.5,.35]]),M("Saturation",.4,[["vDrive",-.35,.5]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{style:"hardtechno",desc:"Acide repli\xE9, tr\xE8s agressif"}),Ne("ronde","Basse ronde","va",{osc1Wave:2,subLevel:.6,fType:1,cutoff:500,aA:.015,aS:.6,aR:.18,vDrive:.35,vDriveType:3,glide:.1,dlMix:.15,dlBeats:.75,dlFb:.35,rvSend:.08,aD:.8},["Rondeur","Dub","Usure"],[M("Ouverture",.4,[["cutoff",-1,1.6],["vDrive",-.1,.25]]),M("Chaleur",.3,[["vDrive",-.2,.45]]),M("\xC9cho",.3,[["dlMix",-.15,.3],["dlFb",0,.35]]),M("Salle",.2,[["rvSend",-.08,.25]]),M("Bande",0,[["vibDepth",0,.15],["vibRate",0,-1.5]]),M("Usure",0,[["fxCrush",0,.35]])],{name:"Ouverture",def:.4,map:[["cutoff",-.8,1.4]]},{style:"triphop",desc:"Basse dub ronde avec \xE9cho"})];var Tt=(o,e,t,a,s,i,r,n={})=>({id:"lead."+o,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||6,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.12,aR:.25,...a},groups:s,macros:i,expr:r,trim:n.trim||0}),$=(o,e,t)=>({name:o,def:e,map:t}),xt=[$("\xC9cho",.2,[["dlMix",-.15,.35],["dlFb",-.1,.3]]),$("Salle",.3,[["rvSend",-.1,.4]])],gr=$("Bande",0,[["vibDepth",0,.32],["vibRate",0,-1.8],["vibDelay",0,-3],["fxLP",0,-2.2],["fxCrush",0,.12]]),Ot=(o,e,t,a,s,i={})=>Tt(o,e,"sampler",{fType:1,cutoff:9e3,reso:.05,aA:.001,aD:2,aS:1,aR:.35,...a},i.groups||["Toucher","Couleur","Espace"],i.macros||[$("Douceur",.15,[["cutoff",0,-3],["level",0,4]]),$("Attaque",0,[["smpStart",0,.08],["aA",0,7.5]]),$("Chorus",.1,[["chMix",-.1,.5]]),gr,...xt],i.expr||{name:"Douceur",def:.2,map:[["cutoff",.5,-2.5],["level",-.5,3]]},{bank:t,desc:s,...i}),br=[Tt("supersaw","Supersaw","va",{osc1Wave:0,unison:7,detune:28,spread:.9,fType:1,cutoff:6e3,reso:.1,fEnv:1,fD:.5,aA:.005,aD:.6,aS:.75,aR:.35,chMix:.25,dlMix:.15,dlBeats:.75,rvSend:.2},["Essaim","Filtre","Espace"],[$("D\xE9saccord",.5,[["detune",-20,25]]),$("Largeur",.6,[["spread",-.6,.1],["width",-.5,.4]]),$("Ouverture",.5,[["cutoff",-2.2,1.2]]),$("Mordant",.3,[["fEnv",-1,3],["fD",-.8,.6]]),...xt],{name:"Ouverture",def:.5,map:[["cutoff",-1.8,1]]},{desc:"Sept scies d\xE9saccord\xE9es, large et brillant"}),Tt("pluck","Pluck","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,osc2Semi:12,fType:0,cutoff:900,reso:.25,fEnv:4,fD:.14,aA:.001,aD:.3,aS:0,aR:.2,dlMix:.25,dlBeats:.75,rvSend:.15},["Pincement","Filtre","Espace"],[$("Longueur",.4,[["aD",-1,1.8],["fD",-.8,1.5]]),$("Octave",.5,[["osc2Level",-.5,.5]]),$("Brillance",.5,[["cutoff",-1.5,1.8],["fEnv",-1,1]]),$("R\xE9sonance",.3,[["reso",-.2,.5]]),...xt],{name:"Brillance",def:.5,map:[["cutoff",-1.2,1.6]]},{desc:"Pincement synth\xE9tique avec \xE9cho point\xE9"}),Ot("piano","Piano","piano",{rvSend:.15},"Piano droit enregistr\xE9 (VCSL)"),Tt("rhodes","Rhodes FM","fm",{fmAlgo:1,fmR1:1,fmR2:1,fmL2:1.1,fmD2:.9,fmS2:.15,fmR3:1,fmL3:1.4,fmD3:1.5,fmS3:.3,fmR4:14,fmL4:1.6,fmD4:.06,fmS4:0,fmDetune:4,aA:.002,aD:2.5,aS:.4,aR:.4,chMix:.35,chRate:.6,lfoAmp:.12,lfoRate:4.5,rvSend:.15},["Lames","Corps","Espace"],[$("Lame",.45,[["fmL4",-1.4,2]]),$("Cloche",.4,[["fmD4",-1,2]]),$("Grain",.4,[["fmL2",-.9,1.6]]),$("Tr\xE9molo",.3,[["lfoAmp",-.12,.45],["lfoRate",-.6,.6]]),...xt],{name:"Toucher",def:.5,map:[["fmL2",-.6,1],["fmL4",-.8,.8]]},{desc:"Piano \xE9lectrique FM avec tr\xE9molo et chorus"}),Ot("marimba","Marimba","marimba",{rvSend:.12,dlMix:.08},"Marimba en bois (VCSL)"),Ot("vibraphone","Vibraphone","vibes",{lfoAmp:.3,lfoRate:5.5,rvSend:.2},"Vibraphone, moteur de tr\xE9molo r\xE9glable",{macros:[$("Douceur",.1,[["cutoff",0,-3]]),$("Moteur",.5,[["lfoAmp",-.3,.4],["lfoRate",-1.5,1]]),$("Chorus",0,[["chMix",0,.5]]),gr,...xt]}),Ot("kalimba","Kalimba","kalimba",{rvSend:.15,dlMix:.12,dlBeats:.75},"Piano \xE0 pouces du Kenya (VCSL)"),Tt("verre","Cloche de verre","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:3,fmD2:2,fmS2:.1,fmR3:7,fmL3:.5,fmD3:.4,fmS3:0,fmL4:0,aA:.001,aD:3,aS:0,aR:1.2,chMix:.2,rvSend:.3},["M\xE9tal","Dur\xE9e","Espace"],[$("Rapport",.5,[["fmR2",-1.5,1.5]]),$("\xC9clat",.5,[["fmL2",-2,3],["fmL3",-.5,1.5]]),$("Dur\xE9e",.5,[["aD",-1.5,1.2],["fmD2",-1.5,1]]),$("Scintillement",0,[["fmDetune",0,12],["chMix",0,.4]]),...xt],{name:"\xC9clat",def:.5,map:[["fmL2",-1.5,2.5]]},{desc:"Cloche FM cristalline, longue r\xE9sonance"}),Tt("orgue","Orgue","wt",{wtTable:4,wtPos:.55,fType:4,aA:.002,aS:1,aR:.08,chMix:.45,chRate:.8,chDepth:.6,subLevel:.15,rvSend:.12},["Tirettes","Rotation","Saturation"],[$("Tirettes",.55,[["wtPos",-.55,.45]]),$("16 pieds",.15,[["subLevel",-.15,.6]]),$("Vitesse",.3,[["chRate",-.6,3]]),$("Profondeur",.6,[["chMix",-.45,.4],["chDepth",-.3,.4]]),$("Saturation",.1,[["fxDrive",0,.55]]),$("Salle",.25,[["rvSend",-.1,.35]])],{name:"Tirettes",def:.5,map:[["wtPos",-.4,.4]]},{desc:"Orgue \xE0 tirettes et cabine tournante"}),Tt("nappe","Nappe chaude","wt",{wtTable:6,wtPos:.4,unison:3,detune:14,spread:.8,fType:1,cutoff:2500,aA:.6,aD:1,aS:.9,aR:1.2,lfoWt:.2,lfoRate:.15,chMix:.4,rvSend:.35},["Mati\xE8re","Souffle","Espace"],[$("Mati\xE8re",.4,[["wtPos",-.4,.6]]),$("Mouvement",.3,[["lfoWt",-.2,.6],["lfoRate",-1,2]]),$("Attaque",.4,[["aA",-2.5,1.5]]),$("Ouverture",.5,[["cutoff",-1.5,1.5]]),...xt],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Nappe douce qui respire",poly:6}),Tt("voix","Voix","formant",{formVowel:0,formShift:0,formQ:.55,formMix:.25,vibDepth:.22,vibRate:5.2,vibDelay:.35,aA:.04,aS:.9,aR:.3,chMix:.2,rvSend:.2},["Voyelle","Gorge","Espace"],[$("Voyelle",0,[["formVowel",0,1]]),$("Parole",0,[["lfoForm",0,.8],["lfoBeats",0,1]]),$("Gorge",.5,[["formShift",-7,7]]),$("Vibrato",.5,[["vibDepth",-.22,.3]]),...xt],{name:"Voyelle",def:.2,map:[["formVowel",-.2,.8]]},{desc:"Synth\xE8se de voyelles, ch\u0153ur artificiel",poly:4}),Ot("ocarina","Ocarina","ocarina",{vibDepth:.08,vibDelay:.4,rvSend:.18},"Ocarina souffl\xE9 (VCSL)",{poly:3}),Ot("saxo","Saxophone","sax",{vibDepth:.12,vibRate:5,vibDelay:.45,cutoff:7e3,rvSend:.15},"Saxophone t\xE9nor enregistr\xE9 (VCSL)",{poly:2,macros:[$("Souffle",.2,[["cutoff",0,-2.5],["noiseLevel",0,.06]]),$("Vibrato",.4,[["vibDepth",-.12,.25],["vibDelay",0,-2]]),$("Grain",0,[["fxDrive",0,.45]]),gr,...xt]}),Ot("harmonica","Harmonica","harmonica",{vibDepth:.05,rvSend:.12},"Harmonica diatonique (VCSL)",{poly:4}),Tt("guitare","Guitare pinc\xE9e","pluck",{pkBright:.7,pkDamp:.35,pkDecay:2.5,pkBody:.4,fType:4,aS:1,aR:.3,chMix:.15,dlMix:.12,rvSend:.15},["Corde","Caisse","Espace"],[$("Attaque",.6,[["pkBright",-.5,.3]]),$("Sustain",.5,[["pkDecay",-1.5,1.5],["pkDamp",.2,-.25]]),$("Caisse",.4,[["pkBody",-.4,.5]]),$("Chorus",.3,[["chMix",-.15,.4]]),...xt],{name:"Attaque",def:.5,map:[["pkBright",-.4,.3]]},{desc:"Corde pinc\xE9e physique, nylon ou acier"}),Ot("harpe","Harpe","harp",{rvSend:.22},"Harpe de concert (VCSL)"),Tt("chip","Chiptune","va",{osc1Wave:4,osc1PW:.25,fType:4,vibDepth:.25,vibRate:6.5,vibDelay:.15,lfoPW:0,aA:.001,aD:.2,aS:.7,aR:.08,dlMix:.1,dlBeats:.5,rvSend:.05},["Onde","Vibrato","Espace"],[$("Largeur",.5,[["osc1PW",-.2,.25]]),$("Balayage",0,[["lfoPW",0,.22],["lfoRate",0,1]]),$("Vibrato",.4,[["vibDepth",-.25,.4]]),$("Arp\xE8ge",0,[["pEnvAmt",0,12],["pEnvTime",0,-1]]),...xt],{name:"Largeur",def:.5,map:[["osc1PW",-.2,.2]]},{desc:"Onde carr\xE9e de console 8 bits",poly:3}),Tt("sync","Sync","wt",{wtTable:7,wtPos:.3,wtEnv:.4,fEnv:0,fA:.002,fD:.35,fS:.2,unison:2,detune:8,spread:.6,fType:4,vDrive:.3,glide:.06,aS:.85,aR:.15,dlMix:.15,rvSend:.12},["Synchro","Mouvement","Espace"],[$("Synchro",.3,[["wtPos",-.3,.6]]),$("Balayage",.5,[["wtEnv",-.4,.5],["fD",-1,1]]),$("Vibration",0,[["lfoWt",0,.5],["lfoRate",0,1.5]]),$("Saturation",.3,[["vDrive",-.3,.5]]),...xt],{name:"Synchro",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Lead synchronis\xE9 mordant, glisse sur les liaisons",poly:1}),Tt("cordes","Cordes synth\xE9","va",{osc1Wave:0,unison:5,detune:14,spread:.7,osc2Wave:0,osc2Semi:12,osc2Level:.3,fType:1,cutoff:3500,aA:.35,aD:1,aS:.9,aR:.9,vibDepth:.08,vibDelay:.5,chMix:.35,rvSend:.3},["Archet","Ensemble","Espace"],[$("Attaque",.4,[["aA",-2.5,1.5]]),$("Ouverture",.5,[["cutoff",-1.5,1.4]]),$("Ensemble",.5,[["detune",-10,16],["chMix",-.25,.4]]),$("Octave",.3,[["osc2Level",-.3,.5]]),...xt],{name:"Ouverture",def:.5,map:[["cutoff",-1.4,1.2]]},{desc:"Ensemble de cordes analogique"}),Ot("glock","Glockenspiel","glock",{rvSend:.2,dlMix:.1},"Lames de m\xE9tal brillantes (VCSL)"),Tt("sino","Sino montagem","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:2.2,fmD2:.35,fmS2:.1,fmR3:1.5,fmL3:.8,fmD3:.2,fmS3:0,aA:.001,aD:.8,aS:.2,aR:.3,fxDrive:.5,fxDriveType:1,dlMix:.2,dlBeats:.5,rvSend:.1},["M\xE9tal","\xC9cr\xEAtage","Espace"],[$("Rapport",.5,[["fmR2",-1.5,1.5]]),$("\xC9clat",.5,[["fmL2",-1.5,2.5]]),$("\xC9cr\xEAtage",.5,[["fxDrive",-.45,.4]]),$("Longueur",.4,[["aD",-1,1.5],["aS",-.2,.5]]),...xt],{name:"\xC9clat",def:.5,map:[["fmL2",-1.2,2]]},{style:"phonk",desc:"Cloche m\xE9tallique satur\xE9e, m\xE9lodies de montagem"}),Ot("stabgarage","Stab garage","clavi",{cutoff:7e3,chMix:.3,dlMix:.18,dlBeats:.75,rvSend:.12,aR:.15},"Clavisynth TX81Z enregistr\xE9, accords courts",{style:"ukg"}),Ot("balafon","Balafon afro","balafon",{dlMix:.2,dlBeats:.75,rvSend:.2},"Balafon (xylophone ouest-africain) avec \xE9cho",{style:"afro"}),Ot("keys","Keys amapiano","fmpiano",{cutoff:5e3,chMix:.45,chRate:.5,dlMix:.18,dlBeats:.75,rvSend:.25},"Piano FM TX81Z enregistr\xE9, chorus et \xE9cho",{style:"amapiano"}),Ot("perreo","Pluck perreo","dantranh",{fxDrive:.15,dlMix:.15,dlBeats:.5,rvSend:.12},"Cithare \u0111\xE0n tranh enregistr\xE9e (VCSL), en pincements",{style:"reggaeton"}),Tt("stabjersey","Stab jersey","va",{osc1Wave:0,unison:5,detune:24,spread:.8,osc2Wave:1,osc2Semi:12,osc2Level:.35,fType:1,cutoff:5e3,fEnv:2,fD:.12,pEnvAmt:2,pEnvTime:.02,aA:.001,aD:.18,aS:.1,aR:.12,rvSend:.15},["Impact","Filtre","Espace"],[$("Longueur",.4,[["aD",-1,1.8],["aS",-.1,.5]]),$("Hoquet",.4,[["pEnvAmt",-2,10]]),$("Brillance",.5,[["cutoff",-1.8,1.2]]),$("\xC9paisseur",.5,[["detune",-18,20],["osc2Level",-.35,.4]]),...xt],{name:"Brillance",def:.5,map:[["cutoff",-1.5,1.2]]},{style:"jersey",desc:"Stab brillant pour les rafales"}),Tt("liquide","Pad liquide","wt",{wtTable:10,wtPos:.6,unison:4,detune:10,spread:.8,fType:1,cutoff:2200,lfoCut:.6,lfoBeats:4,aA:.25,aD:1,aS:.85,aR:1.5,chMix:.35,dlMix:.15,rvSend:.45},["Mati\xE8re","Mar\xE9e","Espace"],[$("Mati\xE8re",.5,[["wtPos",-.5,.4]]),$("Ouverture",.5,[["cutoff",-1.5,1.5]]),$("Mar\xE9e",.4,[["lfoCut",-.6,1.2]]),$("Attaque",.4,[["aA",-2,1.5]]),...xt],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.4]]},{style:"dnb",desc:"Nappe douce et mouvante pour le liquid"}),Tt("rage","Lead rage","va",{osc1Wave:0,unison:7,detune:32,spread:1,osc2Wave:4,osc2PW:.2,osc2Level:.4,fType:1,cutoff:7e3,pEnvAmt:-3,pEnvTime:.08,vDrive:.3,aA:.003,aD:.5,aS:.65,aR:.25,dlMix:.2,dlBeats:.5,rvSend:.18},["Essaim","Plong\xE9e","Espace"],[$("D\xE9saccord",.5,[["detune",-20,20]]),$("Saturation",.3,[["vDrive",-.3,.5]]),$("Plong\xE9e",.5,[["pEnvAmt",3,-9],["pEnvTime",-.6,1]]),$("Brillance",.6,[["cutoff",-2,.6]]),...xt],{name:"Brillance",def:.6,map:[["cutoff",-1.8,.6]]},{style:"rage",desc:"Lead large et satur\xE9 qui plonge"}),Tt("hurleur","Hurleur","va",{osc1Wave:0,osc2Wave:0,osc2Fine:12,osc2Level:.8,fType:0,cutoff:1200,reso:.75,fEnv:2,fD:.4,vDrive:.6,fxDrive:.3,fxDriveType:2,glide:.08,lfoRate:6,lfoCut:0,aS:1,aR:.12,dlMix:.12,rvSend:.15},["Cri","Filtre","Espace"],[$("Saturation",.5,[["vDrive",-.4,.35],["fxDrive",-.25,.4]]),$("Hurlement",0,[["lfoCut",0,1.5],["lfoRate",-1,1]]),$("Coupure",.5,[["cutoff",-1.5,2]]),$("R\xE9sonance",.7,[["reso",-.4,.2]]),...xt],{name:"Coupure",def:.5,map:[["cutoff",-1.2,1.8]]},{style:"hardtechno",desc:"Lead r\xE9sonant et repli\xE9, glisse",poly:1}),Ot("brume","Cloches brumeuses","chimes",{cutoff:4e3,vibDepth:.1,vibRate:.9,vibDelay:.01,fxCrush:.15,chMix:.3,rvSend:.45,dlMix:.15,dlBeats:1.5},"Cloches \xE0 main, bande us\xE9e et grande salle",{style:"triphop"})];var Dt=(o,e,t,a,s,i,r)=>({id:o,name:e,style:t,kit:a.map((n,l)=>["kick.","snare.","hat.","perc."][l]+n),rhythm:s,bass:i&&"bass."+i,lead:r&&"lead."+r}),es=[Dt("studio","Studio",null,["club","classique","analogique","conga"],[1,1,1,3],"moog","pluck"),Dt("acoustique","Acoustique",null,["acoustique","acoustique","acoustique","toms"],[2,1,1,11],"contrebasse","piano"),Dt("organique","Organique",null,["cajon","mains","shaker","darbuka"],[3,1,2,1],"contrebasse","kalimba"),Dt("analogique","Analogique",null,["909","clap808","analogique","cloche808"],[1,1,3,8],"acide","supersaw"),Dt("lofi","Lo-fi",null,["vinyle","lofi","lofi","bloc"],[2,1,1,12],"doux","rhodes"),Dt("phonk","Phonk BR","phonk",["montagem","clapmontagem","drift","clochephonk"],[7,1,2,6],"808montagem","sino"),Dt("ukg","UK garage","ukg",["garage","garage","garage","toc"],[3,4,4,13],"speedgarage","stabgarage"),Dt("afro","Afro house","afro",["afroprofond","clapafro","shakerafro","djembe"],[1,9,9,7],"afrorond","balafon"),Dt("amapiano","Amapiano","amapiano",["pianofeutre","rimpiano","shakerpiano","logdrum"],[9,9,4,9],"logdrum","keys"),Dt("reggaeton","Perreo","reggaeton",["perreo","dembow","perreo","timbal"],[16,3,1,3],"subperreo","perreo"),Dt("jersey","Jersey club","jersey",["jersey","clapjersey","jersey","couinement"],[6,6,2,12],"bounce","stabjersey"),Dt("dnb","Drum & bass","dnb",["break","dnb","ridednb","tombreak"],[5,5,1,15],"turbine","liquide"),Dt("rage","Rage","rage",["808rage","claprage","trap","laser"],[4,7,6,12],"808rage","rage"),Dt("hardtechno","Hard techno","hardtechno",["rumble","industriel","industriel","metalindus"],[10,1,3,8],"acidedur","hurleur"),Dt("triphop","Trip-hop","triphop",["poussiere","poussiere","vinyle","boisfeutre"],[12,2,1,11],"ronde","brume")];var la=[{id:"phonk",name:"Phonk BR \xB7 montagem",short:"Phonk BR",bpm:130,key:1,scale:"phrygian"},{id:"ukg",name:"UK garage",short:"UKG",bpm:134,key:5,scale:"minor"},{id:"afro",name:"Afro house",short:"Afro",bpm:122,key:9,scale:"minor"},{id:"amapiano",name:"Amapiano",short:"Amapiano",bpm:112,key:2,scale:"dorian"},{id:"reggaeton",name:"Reggaeton nouvelle vague",short:"Perreo",bpm:96,key:4,scale:"minor"},{id:"jersey",name:"Jersey club",short:"Jersey",bpm:142,key:7,scale:"minor"},{id:"dnb",name:"Drum & bass",short:"DnB",bpm:174,key:5,scale:"minor"},{id:"rage",name:"Rage \xB7 trap",short:"Rage",bpm:150,key:1,scale:"harmonic"},{id:"hardtechno",name:"Hard techno",short:"Hard",bpm:152,key:9,scale:"phrygian"},{id:"triphop",name:"Trip-hop atmosph\xE9rique",short:"Trip-hop",bpm:86,key:0,scale:"dorian"}];function ts(o){return la.find(e=>e.id===o)||null}var r0={"kick.rond":1.7,"kick.club":3.2,"kick.profond":.9,"kick.808":-.8,"kick.feutre":2.9,"kick.acoustique":-6.4,"kick.sec":.7,"kick.concert":-7.3,"kick.sature":6.2,"kick.rebond":-.1,"kick.sub":3.5,"kick.clic":1.4,"kick.vinyle":-2.6,"kick.909":-.1,"kick.boom":1.1,"kick.papier":1.8,"kick.plie":3.1,"kick.cajon":-7.1,"kick.cadre":-8,"kick.tom":-6,"kick.montagem":2.8,"kick.garage":2.6,"kick.afroprofond":2.4,"kick.pianofeutre":2.5,"kick.perreo":4.1,"kick.jersey":4.4,"kick.break":1.5,"kick.808rage":-.3,"kick.rumble":5.9,"kick.poussiere":.4,"snare.classique":-1.4,"snare.clap808":.8,"snare.rim":6.2,"snare.acoustique":-12.3,"snare.sanstimbre":-11.5,"snare.fantome":2.5,"snare.crepitant":-3.3,"snare.clapserre":.5,"snare.claplarge":-2.8,"snare.doigts":1.1,"snare.mains":-12.6,"snare.lofi":-.5,"snare.metal":-5.7,"snare.tomsnare":-2.9,"snare.balai":-.2,"snare.electro":-2.8,"snare.snareclap":-8.3,"snare.ressort":-7.1,"snare.roulement":-11.5,"snare.crossstick":-12.7,"snare.clapmontagem":-1.9,"snare.garage":-4.5,"snare.clapafro":-.7,"snare.rimpiano":-7.2,"snare.dembow":.5,"snare.clapjersey":-11.2,"snare.dnb":-10.8,"snare.claprage":-3.3,"snare.industriel":-4,"snare.poussiere":-9.6,"hat.analogique":4.9,"hat.bruit":-2.7,"hat.acoustique":-17.6,"hat.ride":-19.8,"hat.crash":-18.2,"hat.fin":3.1,"hat.sombre":.3,"hat.brillant":-1.6,"hat.lofi":5.2,"hat.tss":-8.9,"hat.shaker":-18.7,"hat.tambourin":-17.9,"hat.triangle":-20.2,"hat.cabasa":-15.6,"hat.charleston2":-17.5,"hat.clochette":-2.5,"hat.grain":-6.3,"hat.large":-4.9,"hat.pichenette":-19.1,"hat.pedale":3.6,"hat.drift":-.1,"hat.garage":1.9,"hat.shakerafro":-15.5,"hat.shakerpiano":-10.6,"hat.perreo":3.2,"hat.jersey":-.3,"hat.ridednb":-11.9,"hat.trap":6.4,"hat.industriel":-10.8,"hat.vinyle":-13.3,"perc.conga":-14.9,"perc.bongo":-15.5,"perc.cloche":-15.8,"perc.cloche808":-4.2,"perc.agogo":-17.5,"perc.claves":-17,"perc.bloc":-16.9,"perc.guiro":-16.4,"perc.timbales":-15.2,"perc.cuica":-15.9,"perc.darbuka":-15.4,"perc.cajon":-13.6,"perc.fente":-14.7,"perc.toms":-15,"perc.goutte":10.4,"perc.boisynth":12.5,"perc.tom808":-13.9,"perc.vibraslap":-16.3,"perc.enclume":-17.6,"perc.blip":6.5,"perc.clochephonk":-4.3,"perc.toc":9.2,"perc.djembe":-8.1,"perc.logdrum":-10.8,"perc.timbal":-7.2,"perc.couinement":3.1,"perc.tombreak":-7.6,"perc.laser":7,"perc.metalindus":-9.6,"perc.boisfeutre":-12.3,"bass.sub":-8.5,"bass.moog":-7.8,"bass.acide":-3.3,"bass.reese":-8.5,"bass.808":-4.6,"bass.fm":-8.6,"bass.pluck":4.1,"bass.orgue":-6.8,"bass.contrebasse":1.1,"bass.electrique":-.4,"bass.wobble":-5,"bass.hoover":-9.7,"bass.carre":-11.2,"bass.grondement":-7.1,"bass.doux":-8.2,"bass.pulse":-6.1,"bass.saturee":-12.3,"bass.yoy":-6.3,"bass.stab":.3,"bass.marimba":-10.2,"bass.808montagem":-4,"bass.speedgarage":-7.8,"bass.afrorond":-6.6,"bass.logdrum":-4.3,"bass.subperreo":-6.3,"bass.bounce":-.2,"bass.turbine":-7.9,"bass.808rage":-.3,"bass.acidedur":-11.2,"bass.ronde":-4.7,"lead.supersaw":-14.5,"lead.pluck":-5,"lead.piano":-17.4,"lead.rhodes":-11.9,"lead.marimba":-16.4,"lead.vibraphone":-15.9,"lead.kalimba":-17.3,"lead.verre":-8.9,"lead.orgue":-12.4,"lead.nappe":-16.9,"lead.voix":-9,"lead.ocarina":-16.9,"lead.saxo":-15.9,"lead.harmonica":-16.1,"lead.guitare":-7.6,"lead.harpe":-16.9,"lead.chip":-18.2,"lead.sync":-8.9,"lead.cordes":-15.7,"lead.glock":-17.7,"lead.sino":-18.3,"lead.stabgarage":-15.7,"lead.balafon":-15.6,"lead.keys":-17.1,"lead.perreo":-18.2,"lead.stabjersey":-8,"lead.liquide":-14.9,"lead.rage":-12.1,"lead.hurleur":-15.4,"lead.brume":-17.4};var yr=[{id:"kick",name:"Kick",list:e0},{id:"snare",name:"Snare \xB7 clap",list:t0},{id:"hat",name:"Hat",list:o0},{id:"perc",name:"Perc",list:i0},{id:"bass",name:"Basse",list:vr},{id:"lead",name:"M\xE9lodie",list:br}],ca=["kick","snare","hat","perc"],xr=new Map;for(let o of yr)for(let e of o.list){if(xr.has(e.id))throw new Error("duplicate preset id "+e.id);e.family=o.id,e.trim=(e.trim||0)+(r0[e.id]||0),xr.set(e.id,e)}function Ve(o){return xr.get(o)||null}function ss(o){return(yr.find(e=>e.id===o)||yr[0]).list}function n0(o){return es.find(e=>e.id===o)||null}var La={kit:es[0].kit,bass:vr[0].id,lead:br[0].id};function l0(o){return o?o.bank?[o.bank]:o.samples&&o.samples.length?["drums"]:[]:[]}var ph={bass:[28,47],lead:[48,67]},mh=48;function Ra(o,e=Math.random,t){let a=o.length>1&&t!==void 0?o.filter(s=>s!==t):o;return a[Math.floor(e()*a.length)%a.length]}function vh(o,e,t){let[a,s]=ph[o],i=[];for(let r=-4;r<=4;r++){let n=mh+t+e.lo+12*r;n>=a&&n<=s&&i.push(r)}return i.length?i:[0]}function wr(o,e="all",t=Math.random){let a={kit:null,bass:null,lead:null},s=o;(e==="all"||e==="drum")&&(a.kit=ca.map((i,r)=>Ra(ss(i),t,void 0).id),a.kit.every((i,r)=>i===s.parts.drum.kit[r])&&(a.kit[0]=Ra(ss("kick"),t,ss("kick").find(i=>i.id===a.kit[0])).id));for(let i of["bass","lead"]){if(e!=="all"&&e!==i)continue;let r=ss(i),n=r.find(c=>c.id===s.parts[i].preset),l=Ra(r,t,n).id,u=Ra(vh(i,s.parts[i].range,s.key),t);a[i]={preset:l,oct:u}}return a}function c0(o){return[...o.kit||[],o.bass&&o.bass.preset,o.lead&&o.lead.preset].filter(Boolean)}function kr(o,e){let t=o;e.kit&&(t.parts.drum.kit=e.kit.slice(),t.parts.drum.macros=[null,null,null,null]);for(let a of["bass","lead"]){let s=e[a];if(!s)continue;let i=t.parts[a];if(i.preset=s.preset,i.macros=null,s.oct){i.range={lo:i.range.lo+12*s.oct,n:i.range.n};for(let r of t.patterns){for(let n of r[a].notes)n.deg+=7*s.oct;if(r.gest&&r.gest[a])for(let n of r.gest[a])for(let l of n.p)l[3]+=7*s.oct}}}return t}function h0(o=Math.random){let e=Ra(la,o),t=Ra(es,o),a=Ps({tempo:e.bpm,key:Math.floor(o()*12)%12,scale:e.scale,name:"Id\xE9e au hasard"});return a.parts.drum.kit=t.kit.slice(),a.parts.drum.rhythm=t.rhythm.slice(),a.parts.bass.preset=ss("bass")[0].id,a.parts.lead.preset=ss("lead")[0].id,kr(a,wr(a,"all",o)),a}var Qo=Mt.storage+".",gh={metro:!1,metroAlways:!1,metroLevel:0,piano:!1,ghosts:!0,fluid:!0,fluidZone:"keys",fluidStyle:"spectaculaire",fluidColors:"partie",fluidInk:"libre",glass:Mt.fluid,fluidHdr:"intense",fluidEngine:"auto",glassTilt:!1,glassSpill:!0,glassLight:"forte",mixGlass:Mt.fluid,ctrlHeight:6,lightLook:"aquarelle",hdrLight:!0,glassLook:"optique",...Mt.fluid?{hwCast:[0,3,2,1],hwRelay:!1}:{}},bh=60,Jo=class{constructor(){this.project=null,this.ui={part:"lead",view:"pattern",lane:0,group:0,erase:!1,playing:!1,armed:!1,tick:-1,sel:null,section:0,browse:null},this.listeners=new Map,this.undoStack=[],this.redoStack=[],this.saveTimer=null,this.dirty=!1,this.engine=null,this.lastSaved=0,this.settings={...gh};try{Object.assign(this.settings,JSON.parse(localStorage.getItem(Qo+"settings")||"{}"))}catch{}this.diceMark=null}setSetting(e,t){this.settings[e]=t;try{localStorage.setItem(Qo+"settings",JSON.stringify(this.settings))}catch{}e.startsWith("metro")&&this.send(...this.metroMessages()),this.changed("settings:"+e)}metroMessages(){let e=this.settings;return[{type:"batch",list:[{type:"set",key:"metro",value:e.metro?e.metroAlways?2:1:0},{type:"set",key:"metroLevel",value:e.metroLevel}]}]}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.listeners.get(e).delete(t)}emit(e,t){let a=this.listeners.get(e);if(a)for(let s of a)s(t)}changed(e){this.emit("change",e)}async init(){let e=null;try{let t=localStorage.getItem(Qo+"last");t&&(e=await At.get("projects",t))}catch{}if(e)try{e=Ks(e)}catch{e=null}return e||(e=this.starterProject()),this.project=e,this.ensurePresets(),Hn(),e}starterProject(e){let t=e&&es.find(i=>i.style===e)||es[0],a=ts(t.style),s=Ps({kit:t.kit.slice(),bass:t.bass||La.bass,lead:t.lead||La.lead,tempo:a?a.bpm:118,key:a?a.key:2,scale:a?a.scale:"minor",name:a?"Id\xE9e "+a.short:"Nouvelle id\xE9e"});return s.parts.drum.rhythm=t.rhythm.slice(),s}ensurePresets(){let e=this.project,t=e.parts.drum;for(let a=0;a<4;a++)(!t.kit[a]||!Ve(t.kit[a]))&&(t.kit[a]=La.kit[a]);(!e.parts.bass.preset||!Ve(e.parts.bass.preset))&&(e.parts.bass.preset=La.bass),(!e.parts.lead.preset||!Ve(e.parts.lead.preset))&&(e.parts.lead.preset=La.lead)}scheduleSave(){this.dirty=!0,clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.save(),700)}async save(){if(clearTimeout(this.saveTimer),!!this.project){this.project.updated=Date.now();try{await At.put("projects",JSON.parse(JSON.stringify(this.project))),localStorage.setItem(Qo+"last",this.project.id),this.dirty=!1,this.lastSaved=Date.now(),this.emit("saved",this.lastSaved)}catch(e){this.emit("error","Sauvegarde impossible : "+(e&&e.message||e))}}}async listProjects(){return(await At.all("projects")).sort((t,a)=>(a.updated||0)-(t.updated||0))}async openProject(e){await this.save();let t=await At.get("projects",e);if(!t)throw new Error("Projet introuvable");this.loadProject(Ks(t))}loadProject(e){this.project=e,this.ensurePresets(),this.undoStack=[],this.redoStack=[],this.ui.sel=null,this.syncAll(),this.changed("project"),this.scheduleSave()}async newProject(e){await this.save(),this.loadProject(this.starterProject(e))}planRandom(e){return wr(this.project,e)}applyRandom(e){let t=this.undoStack[this.undoStack.length-1];(!t||t!==this.diceMark)&&this.snapshot(),kr(this.project,e),this.syncAll(),this.changed("project"),this.scheduleSave(),this.diceMark=this.undoStack[this.undoStack.length-1]}planRandomProject(){return h0()}async duplicateProject(){await this.save();let e=JSON.parse(JSON.stringify(this.project));e.id=na(),e.name=this.project.name+" (copie)",e.created=e.updated=Date.now(),this.loadProject(e)}async deleteProject(e){if(await At.del("projects",e),this.project&&this.project.id===e){let t=await this.listProjects();t.length?this.loadProject(Ks(t[0])):this.loadProject(this.starterProject())}}rename(e){this.project.name=e.slice(0,80)||"Sans titre",this.changed("name"),this.scheduleSave()}snapshot(){this.undoStack.push(JSON.stringify(this.project)),this.undoStack.length>bh&&this.undoStack.shift(),this.redoStack.length=0,this.changed("undo")}undo(){return this.undoStack.length?(this.redoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.undoStack.pop())),!0):!1}redo(){return this.redoStack.length?(this.undoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.redoStack.pop())),!0):!1}restore(e){let t=this.ui.playing;this.project=e,this.syncAll(!0),this.changed("project"),this.changed("undo"),this.scheduleSave()}send(e){this.engine&&this.engine.send(e)}presetMessage(e,t){let a=this.project;if(e==="drum"){let s=Ve(a.parts.drum.kit[t]);return{type:"preset",part:e,lane:t,preset:s,macros:a.parts.drum.macros[t]}}return{type:"preset",part:e,preset:Ve(a.parts[e].preset),macros:a.parts[e].macros}}engineState(){let e=[];for(let t=0;t<4;t++)e.push(this.presetMessage("drum",t));return e.push(this.presetMessage("bass")),e.push(this.presetMessage("lead")),e.push({type:"project",project:this.project}),e.push({type:"erase",on:this.ui.erase}),e.push(...this.metroMessages()[0].list),e}syncAll(){this.engine&&this.engine.send({type:"batch",list:this.engineState()})}onEngine(e){let t=this.project;switch(e.type){case"pos":this.ui.tick=e.tick,this.emit("pos",e);break;case"state":this.ui.playing=e.playing,this.ui.armed=e.armed,this.changed("transport");break;case"takeStart":this.snapshot();break;case"autoStart":this.snapshot();break;case"take":{let a=t.patterns[e.pat];if(!a)break;e.part==="drum"?a.drum[e.lane].hits=e.data:a[e.part].notes=e.data,this.changed("notes"),this.scheduleSave();break}case"gest":{let a=t.patterns[e.pat];if(!a)break;a.gest=a.gest||{bass:[],lead:[],drum:[]},a.gest[e.part]=e.data,this.changed("gest"),this.scheduleSave();break}case"auto":{let a=t.patterns[e.pat];if(!a)break;e.data?(a.auto[e.target]=a.auto[e.target]||{},a.auto[e.target][e.slot]=e.data):a.auto[e.target]&&(delete a.auto[e.target][e.slot],Object.keys(a.auto[e.target]).length||delete a.auto[e.target]),this.changed("auto"),this.scheduleSave();break}case"macro":{let a=this.macrosFor(e.target,!0);a[e.slot]=Math.round(e.value*1e3)/1e3,this.changed("macro"),this.scheduleSave();break}case"section":this.ui.section=e.index,this.changed("section");break;default:break}}macrosFor(e,t){let a=this.project;if(e==="bass"||e==="lead")return!a.parts[e].macros&&t&&(a.parts[e].macros=[null,null,null,null,null,null,null]),a.parts[e].macros;let s=+e.slice(1);return!a.parts.drum.macros[s]&&t&&(a.parts.drum.macros[s]=[null,null,null,null,null,null,null]),a.parts.drum.macros[s]}macroValue(e,t){let a=this.macrosFor(e,!1);if(a&&a[t]!==null&&a[t]!==void 0)return a[t];let s=this.presetFor(e);if(t===6)return s&&s.expr&&s.expr.def!==void 0?s.expr.def:.5;let i=s&&s.macros&&s.macros[t];return i&&i.def!==void 0?i.def:.5}presetFor(e){let t=this.project;return e==="bass"||e==="lead"?Ve(t.parts[e].preset):Ve(t.parts.drum.kit[+e.slice(1)])}get pattern(){return this.project.patterns[this.project.current]}setPreset(e,t,a){let s=this.project;this.snapshot(),e==="drum"?(s.parts.drum.kit[t]=a,s.parts.drum.macros[t]=null):(s.parts[e].preset=a,s.parts[e].macros=null),this.send(this.presetMessage(e,t)),this.changed("preset"),this.scheduleSave()}applyKit(e,t){let a=n0(e);if(!a)return;this.snapshot();let s=this.project;if(s.parts.drum.kit=a.kit.slice(),s.parts.drum.macros=[null,null,null,null],s.parts.drum.rhythm=a.rhythm.slice(),t){a.bass&&(s.parts.bass.preset=a.bass,s.parts.bass.macros=null),a.lead&&(s.parts.lead.preset=a.lead,s.parts.lead.macros=null);let i=ts(a.style);i&&(s.tempo=i.bpm,s.key=i.key,s.scale=i.scale)}this.syncAll(),this.changed("project"),this.scheduleSave()}set(e,t,a={}){let s=this.project;switch(a.undo&&this.snapshot(),e){case"tempo":s.tempo=Math.round(Math.min(220,Math.max(40,t))),this.send({type:"set",key:e,value:s.tempo});break;case"swing":s.swing=Math.min(75,Math.max(50,Math.round(t))),this.send({type:"set",key:e,value:s.swing});break;case"key":s.key=(t%12+12)%12,this.send({type:"set",key:e,value:s.key});break;case"scale":s.scale=t,this.send({type:"set",key:e,value:t});break;case"bars":Qn(s,t),this.send({type:"project",project:s});break;default:break}this.changed(e),this.scheduleSave()}setPart(e,t,a,s){let i=this.project;if(e==="drum")i.parts.drum[t][s]=a,this.send({type:"set",key:t,value:a,part:e,lane:s});else{let r=i.parts[e];t==="steps"?Jn(r,a,i.scale):t==="range"?r.range=a:(r[t]=a,this.send({type:"set",key:t==="q"?"quant":t,value:a,part:e}))}this.changed(e+":"+t),this.scheduleSave()}setMix(e,t){let a=this.project;a.mix[e]=t,this.send({type:"set",key:"mix",value:{[e]:t}}),this.changed("mix"),this.scheduleSave()}setLevel(e,t,a){e==="drum"?(this.project.parts.drum.level[t]=a,this.send({type:"set",key:"level",part:e,lane:t,value:a})):(this.project.parts[e].level=a,this.send({type:"set",key:"level",part:e,value:a})),this.changed("mix"),this.scheduleSave()}setMute(e,t,a){e==="drum"?(this.project.parts.drum.mute[t]=a,this.send({type:"set",key:"mute",part:e,lane:t,value:a})):(this.project.parts[e].mute=a,this.send({type:"set",key:"mute",part:e,value:a})),this.changed("mix"),this.scheduleSave()}eraseSpan(e,t,a,s){this.snapshot();let i=this.pattern;fr(i,e,t,a,s,!0),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearPart(e,t){this.snapshot();let a=384*this.project.bars;fr(this.pattern,e,t,0,a,!1),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearAuto(e,t){this.snapshot();let a=this.pattern;a.auto[e]&&(t===void 0?delete a.auto[e]:(delete a.auto[e][t],Object.keys(a.auto[e]).length||delete a.auto[e]));let s=t===void 0?[0,1,2,3,4,5,6]:[t];for(let i of s)this.send({type:"auto",pat:this.project.current,target:e,slot:i,data:null});this.changed("auto"),this.scheduleSave()}pushPattern(e,t){let a=this.pattern,s=this.project.current;if(a.gest&&this.send({type:"gest",pat:s,part:e,data:a.gest[e]||[]}),e==="drum"){let i=t==null?[0,1,2,3]:[t];for(let r of i)this.send({type:"pattern",pat:s,part:e,lane:r,data:a.drum[r].hits});for(let r of i)this.pushAuto("d"+r)}else this.send({type:"pattern",pat:s,part:e,data:a[e].notes}),this.pushAuto(e)}pushAuto(e){let t=this.pattern,a=this.project.current;for(let s=0;s<7;s++)this.send({type:"auto",pat:a,target:e,slot:s,data:t.auto[e]&&t.auto[e][s]?t.auto[e][s]:null})}selectPattern(e){let t=this.project;e<0||e>=t.patterns.length||(t.current=e,this.send({type:"set",key:"current",value:e}),this.changed("pattern"),this.scheduleSave())}addPattern(e){let t=this.project;if(t.patterns.length>=8)return;this.snapshot();let a=String.fromCharCode(65+t.patterns.length),s=e!==void 0?{...JSON.parse(JSON.stringify(t.patterns[e])),name:a}:Rs(a);t.patterns.push(s),t.current=t.patterns.length-1,this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave()}deletePattern(e){let t=this.project;t.patterns.length<=1||(this.snapshot(),t.patterns.splice(e,1),t.patterns.forEach((a,s)=>{a.name=String.fromCharCode(65+s)}),t.song.sections=t.song.sections.filter(a=>a.p!==e).map(a=>({...a,p:a.p>e?a.p-1:a.p})),t.current=Math.min(t.current,t.patterns.length-1),t.song.sections.length||(t.song.enabled=!1),this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave())}setSong(e,t=!0){t&&this.snapshot(),this.project.song=e,this.send({type:"set",key:"song",value:e}),this.changed("song"),this.scheduleSave()}autoArrange(){let e=this.project,t=0,a=e.patterns.length>1?1:0,s=(r,n,l={})=>({p:r,reps:n,mute:l}),i=[s(t,2,{d0:!0,bass:!0,lead:!0}),s(t,2,{lead:!0}),s(a,4),s(t,2,{d0:!0,d1:!0,bass:!0}),s(a,4),s(t,2,{bass:!0,d2:!0,d3:!0})];this.setSong({enabled:!0,sections:i})}setErase(e){this.ui.erase=e,this.send({type:"erase",on:e}),this.changed("erase")}exportProjectJSON(){return JSON.stringify({...this.project,app:"MOTIF 3",exported:new Date().toISOString()},null,1)}importProjectText(e){let t=JSON.parse(e),a=Ks(t);return a.id=na(),a.updated=Date.now(),this.loadProject(a),a}async backupAll(){let e=await At.all("projects");return JSON.stringify({format:"motif-3-backup",exported:new Date().toISOString(),projects:e},null,1)}async restoreBackup(e){let t=JSON.parse(e);if(t.format!=="motif-3-backup"||!Array.isArray(t.projects))throw new Error("Sauvegarde non reconnue");let a=0;for(let s of t.projects)try{let i=Ks(s);await At.put("projects",i),a++}catch{}return a}};var Zo=class{constructor({workletUrl:e,onMessage:t,onState:a}){this.workletUrl=e,this.onMessage=t,this.onState=a||(()=>{}),this.ctx=null,this.node=null,this.ready=!1,this.starting=null,this.samples=new Map,this.sampleSets=[],this.loadedBanks=new Set,this.replay=()=>[],this.queue=[],this.lastFrameCheck=0,this.setSessionType()}setSessionType(){try{"audioSession"in navigator&&(navigator.audioSession.type="playback")}catch{}}get running(){return!!(this.ctx&&this.ctx.state==="running"&&this.ready)}start(){return this.running?Promise.resolve(!0):this.ctx&&this.ready&&this.ctx.state!=="closed"?this.ctx.resume().then(()=>this.ctx.state==="running"):this.starting?this.starting:(this.starting=this.build().finally(()=>{this.starting=null}),this.starting)}async build(){this.setSessionType();let e=window.AudioContext||window.webkitAudioContext,t=new e({latencyHint:"interactive"});this.ctx=t;let a=t.resume();t.onstatechange=()=>this.onState(t.state),await t.audioWorklet.addModule(this.workletUrl);let s=new AudioWorkletNode(t,"motif-engine",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]});s.port.onmessage=n=>this.receive(n.data),s.onprocessorerror=()=>{this.ready=!1,this.onState("error")},s.connect(t.destination),this.node=s;let i=Array.from(this.samples.values());i.length&&s.port.postMessage({type:"samples",list:i}),this.sampleSets.length&&s.port.postMessage({type:"sampleSets",sets:this.sampleSets});let r=this.replay();r.length&&s.port.postMessage({type:"batch",list:r});for(let n of this.queue)s.port.postMessage(n);this.queue.length=0,this.ready=!0;try{await a}catch{}return this.onState(t.state),t.state==="running"}async rebuild(){let e=this.ctx;if(this.ready=!1,this.node=null,this.ctx=null,e)try{await e.close()}catch{}return this.start()}receive(e){if(e){if(e.type==="batch"){for(let t of e.list)this.onMessage(t);return}this.onMessage(e)}}send(e){this.node&&this.ready?this.node.port.postMessage(e):e.type==="project"||e.type==="preset"||e.type==="set"||e.type==="macro"||e.type==="pattern"||e.type}suspend(){return this.ctx&&this.ctx.state==="running"?this.ctx.suspend().catch(()=>{}):Promise.resolve()}async probe(e=350){if(!this.ctx)return!1;let t=this.ctx.currentTime;return await new Promise(a=>setTimeout(a,e)),this.ctx.state==="running"&&this.ctx.currentTime>t}async loadBank(e,t){if(this.loadedBanks.has(e))return;let a=await fetch(e);if(!a.ok)throw new Error("Banque introuvable : "+e);let s=await a.json(),i=e.slice(0,e.lastIndexOf("/")+1),r=this.ctx||new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(1,1,48e3),n=0,l=[],u=s.samples.map(async c=>{if(this.samples.has(c.id))return;let h=await fetch(i+c.file);if(!h.ok)throw new Error("Son manquant : "+c.file);let d=await h.arrayBuffer(),m=await yh(r,d),v=m.getChannelData(0),g;if(m.numberOfChannels>1){let y=m.getChannelData(1);g=new Float32Array(v.length);for(let x=0;x<g.length;x++)g[x]=.5*(v[x]+y[x])}else g=new Float32Array(v);let f=new Float32Array(g.length+4);f.set(g,1);let p={id:c.id,sr:m.sampleRate,data:f,gain:c.gain||1,loopStart:c.loopStart?c.loopStart*m.sampleRate/c.sr+1:0,loopEnd:c.loopEnd?c.loopEnd*m.sampleRate/c.sr+1:0};this.samples.set(c.id,p),l.push(p),n++,t&&t(n/s.samples.length)});if(await Promise.all(u),s.sets)for(let c of s.sets)this.sampleSets.find(h=>h.id===c.id)||this.sampleSets.push(c);this.loadedBanks.add(e),this.node&&this.ready&&(l.length&&this.node.port.postMessage({type:"samples",list:l}),this.node.port.postMessage({type:"sampleSets",sets:this.sampleSets}))}};function yh(o,e){return new Promise((t,a)=>{let s=o.decodeAudioData(e,t,a);s&&s.then&&s.then(t,a)})}function b(o,e,...t){let a=document.createElement(o);if(e)for(let s in e){let i=e[s];if(!(i==null||i===!1))if(s==="class")a.className=i;else if(s==="html")a.innerHTML=i;else if(s==="text")a.textContent=i;else if(s.startsWith("on"))a.addEventListener(s.slice(2),i);else if(s==="style"&&typeof i=="object")for(let r in i)r.startsWith("--")?a.style.setProperty(r,i[r]):a.style[r]=i[r];else a.setAttribute(s,i===!0?"":i)}for(let s of t.flat())s!=null&&s!==!1&&a.append(s.nodeType?s:document.createTextNode(String(s)));return a}function xh(o){let e=document.createElement("template");return e.innerHTML=o.trim(),e.content.firstChild}var Re=(o,e="")=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${e}>${o}</svg>`,wh={logo:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="9" width="3.2" height="6" rx="1.6" fill="var(--drum)"/><rect x="7" y="5" width="3.2" height="14" rx="1.6" fill="var(--bass)"/><rect x="12" y="2" width="3.2" height="20" rx="1.6" fill="var(--lead)"/><rect x="17" y="7" width="3.2" height="10" rx="1.6" fill="currentColor" opacity=".55"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" fill="currentColor"/></svg>',stop:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor"/></svg>',rec:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.5"/></svg>',undo:Re('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'),redo:Re('<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>'),erase:Re('<path d="m7 21-4.3-4.3a1.5 1.5 0 0 1 0-2.1L13.4 3.9a1.5 1.5 0 0 1 2.1 0l4.6 4.6a1.5 1.5 0 0 1 0 2.1L10 21"/><path d="M22 21H7"/><path d="m5.5 12 6.5 6.5"/>'),trash:Re('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>'),left:Re('<path d="m15 18-6-6 6-6"/>'),right:Re('<path d="m9 18 6-6-6-6"/>'),down:Re('<path d="m6 9 6 6 6-6"/>'),close:Re('<path d="M18 6 6 18M6 6l12 12"/>'),plus:Re('<path d="M12 5v14M5 12h14"/>'),check:Re('<path d="M20 6 9 17l-5-5"/>'),more:Re('<circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/>'),drum:Re('<circle cx="7" cy="8" r="1.4" fill="currentColor"/><circle cx="12" cy="8" r="1.4" fill="currentColor"/><circle cx="17" cy="8" r="1.4" fill="currentColor"/><circle cx="7" cy="14" r="1.4" fill="currentColor"/><circle cx="12" cy="14" r="1.4" fill="currentColor"/><circle cx="17" cy="14" r="1.4" fill="currentColor"/>','stroke-width="1"'),bass:Re('<path d="M2 13c2.5 0 2.5-6 5-6s2.5 10 5 10 2.5-10 5-10 2.5 6 5 6"/>'),lead:Re('<path d="M3 15l4-7 4 9 4-11 3 7h3"/>'),pattern:Re('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 4v16M13 4v16M18 4v16" opacity=".55"/>'),tweaks:Re('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="9" cy="10" r="2.2"/><circle cx="15" cy="15" r="2.2"/>'),mix:Re('<path d="M6 4v16M12 4v16M18 4v16"/><rect x="4" y="13" width="4" height="3" rx="1" fill="currentColor"/><rect x="10" y="7" width="4" height="3" rx="1" fill="currentColor"/><rect x="16" y="11" width="4" height="3" rx="1" fill="currentColor"/>'),song:Re('<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="18" r="2"/>'),share:Re('<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'),download:Re('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'),folder:Re('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),file:Re('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),note:Re('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),sun:Re('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:Re('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),info:Re('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),wifi:Re('<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>'),copy:Re('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),sparkle:Re('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>'),speaker:Re('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),metro:Re('<path d="M9.2 3h5.6l4.2 18H5z"/><path d="M12 15.5 17.5 6"/><path d="M8 15.5h8"/>'),dice:Re('<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/>'),piano:Re('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 13v7M15 13v7"/><rect x="7.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/><rect x="13.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/>'),settings:Re('<path d="M4 7h9M18 7h2M4 17h3M12 17h8"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="9.5" cy="17" r="2.3"/>'),touch:Re('<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="7.5" opacity=".55"/>'),pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/></svg>'};function be(o){return xh(wh[o])}function kh(){return Math.min(window.devicePixelRatio||1,2.5)}function ds(o){let e=o.getBoundingClientRect(),t=kh(),a=Math.max(1,Math.round(e.width*t)),s=Math.max(1,Math.round(e.height*t));return(o.width!==a||o.height!==s)&&(o.width=a,o.height=s),{w:e.width,h:e.height,d:t}}function dt(o,e=document.querySelector(".app")||document.documentElement){return getComputedStyle(e).getPropertyValue(o).trim()}function u0(o,{get:e,set:t,step:a=12,axis:s="y",onStart:i,onEnd:r,onTap:n}){let l=null;o.addEventListener("pointerdown",c=>{c.preventDefault();try{o.setPointerCapture(c.pointerId)}catch{}l={x:c.clientX,y:c.clientY,v:e(),moved:!1,id:c.pointerId},i&&i()}),o.addEventListener("pointermove",c=>{if(!l||c.pointerId!==l.id)return;let h=s==="y"?l.y-c.clientY:c.clientX-l.x;Math.abs(h)>4&&(l.moved=!0),l.moved&&t(l.v+Math.round(h/a),c)});let u=c=>{if(!l||c.pointerId!==l.id)return;let h=l;l=null,!h.moved&&n&&n(c),r&&r()};o.addEventListener("pointerup",u),o.addEventListener("pointercancel",u)}var Wt=class{constructor(e){this.o=e,this.el=b("div",{class:"dial",role:"slider",tabindex:"0","aria-label":e.label}),this.cv=b("canvas"),this.vEl=b("div",{class:"v"}),this.lEl=b("div",{class:"l",text:e.label}),this.sEl=b("div",{class:"s"}),this.el.append(this.cv,this.vEl,this.lEl,this.sEl);let t=null;this.el.addEventListener("pointerdown",s=>{s.preventDefault();try{this.el.setPointerCapture(s.pointerId)}catch{}t={x:s.clientX,y:s.clientY,v:this.o.get(),id:s.pointerId,moved:!1,axis:null},this.el.classList.add("active"),e.onStart&&e.onStart()}),this.el.addEventListener("pointermove",s=>{if(!t||s.pointerId!==t.id)return;let i=s.clientX-t.x,r=t.y-s.clientY;if(!t.axis&&Math.hypot(i,r)>8&&(t.axis=Math.abs(i)>Math.abs(r)*1.3?"x":"y"),t.axis==="x"&&e.onSwipeX&&!t.swiped&&Math.abs(i)>26&&(t.swiped=!0,e.onSwipeX(i>0?1:-1),t.v=this.o.get(),t.y=s.clientY,t.axis="y2"),t.axis==="y"||t.axis==="y2"){t.moved=!0;let n=e.step||14,l=Math.max(e.min(),Math.min(e.max(),t.v+Math.round(r/n)));l!==this.o.get()&&(this.o.set(l),this.render())}});let a=s=>{if(!t||s.pointerId!==t.id)return;let i=t;t=null,this.el.classList.remove("active"),!i.axis&&e.onTap&&e.onTap(),e.onEnd&&e.onEnd()};this.el.addEventListener("pointerup",a),this.el.addEventListener("pointercancel",a),this.el.addEventListener("keydown",s=>{let i=s.key==="ArrowUp"||s.key==="ArrowRight"?1:s.key==="ArrowDown"||s.key==="ArrowLeft"?-1:0;if(i){s.preventDefault();let r=Math.max(e.min(),Math.min(e.max(),this.o.get()+i));this.o.set(r),this.render()}else(s.key==="Enter"||s.key===" ")&&e.onTap&&(s.preventDefault(),e.onTap())})}render(){let e=this.o,t=e.format(e.get());this.vEl.textContent=t.v,this.sEl.textContent=t.s||"",t.l!==void 0&&(this.lEl.textContent=t.l),this.el.setAttribute("aria-valuenow",String(e.get())),this.el.setAttribute("aria-valuetext",`${t.v} ${t.s||""}`.trim()),this.el.classList.toggle("ties",!!t.ties);let{w:a,h:s,d:i}=ds(this.cv),r=this.cv.getContext("2d");r.setTransform(i,0,0,i,0,0),r.clearRect(0,0,a,s),e.ring&&e.ring(r,a,s,e.get())}};function Sr(o,e,t,a,s,i,r,n){let l=e/2,u=t/2-2,c=Math.min(e,t)/2-8;if(o.lineCap="round",o.strokeStyle=n,o.lineWidth=1,o.beginPath(),o.arc(l,u,c,0,Math.PI*2),o.stroke(),!a||!a.len){o.strokeStyle=r,o.lineWidth=3,o.globalAlpha=.6,o.beginPath(),o.arc(l,u,c,-Math.PI/2,Math.PI*1.5),o.stroke(),o.globalAlpha=1;return}let h=d=>-Math.PI/2+d/a.len*Math.PI*2;if(a.ev.forEach(([d,m,v],g)=>{let f=h(d),p=h(Math.min(d+m,a.len))-.02;if(o.strokeStyle=r,o.lineWidth=v?5:3.5,o.beginPath(),o.arc(l,u,c,f+.03,Math.max(f+.06,p)),o.stroke(),s&&s.includes(g)){let y=a.ev[(g-1+a.ev.length)%a.ev.length];o.strokeStyle=r,o.lineWidth=2,o.globalAlpha=.9,o.beginPath(),o.arc(l,u,c-8,h(y[0])+.05,f-.02+(g===0?Math.PI*2:0)),o.stroke(),o.globalAlpha=1,o.fillStyle=r,o.beginPath(),o.arc(l+Math.cos(f)*(c-8),u+Math.sin(f)*(c-8),2.6,0,Math.PI*2),o.fill()}}),i>=0){let d=h(i);o.fillStyle=dt("--ink"),o.beginPath(),o.arc(l+Math.cos(d)*c,u+Math.sin(d)*c,3,0,Math.PI*2),o.fill()}}var ha=ia.lo,ho=ia.hi,Sh=ia.maxN;function uo(o,e){let t=48+e+o;return Es[(t%12+12)%12]+(Math.floor(t/12)-1)}var ei=class{constructor({get:e,set:t,scale:a,onStart:s}){this.get=e,this.set=t,this.scale=a,this.onStart=s,this.el=b("div",{class:"range",role:"group","aria-label":"Plage de notes",tabindex:"0"}),this.cv=b("canvas"),this.lbl=b("div",{class:"lbl"}),this.el.append(this.cv,this.lbl),this.drag=null,this.el.addEventListener("pointerdown",i=>this.down(i)),this.el.addEventListener("pointermove",i=>this.move(i)),this.el.addEventListener("pointerup",i=>this.up(i)),this.el.addEventListener("pointercancel",i=>this.up(i)),this.el.addEventListener("keydown",i=>this.key(i))}x2semi(e){return ha+e/this.w*(ho-ha)}semi2x(e){return(e-ha)/(ho-ha)*this.w}notes(){let{scale:e,steps:t}=this.scale();return Yo(e,t)}windowPx(){let{scale:e,steps:t}=this.scale(),a=this.get(),s=Zt(a,e,t),i=s[0].semi,r=s[s.length-1].semi;return{x0:this.semi2x(i-.45),x1:this.semi2x(r+.55),lo:i,hi:r,cols:s}}nearestNote(e){let t=this.notes(),a=t[0],s=1/0;for(let i of t){let r=Math.abs(i-e);r<s&&(s=r,a=i)}return a}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.el.getBoundingClientRect(),a=e.clientX-t.left,s=this.windowPx(),i=Math.max(18,Math.min(30,(s.x1-s.x0)*.25)),r;Math.abs(a-s.x0)<=i&&a<(s.x0+s.x1)/2?r="left":Math.abs(a-s.x1)<=i&&a>(s.x0+s.x1)/2?r="right":a>s.x0&&a<s.x1?r="move":r="jump";let n=this.get();this.drag={id:e.pointerId,mode:r,x0:a,lo:s.lo,hi:s.hi,n:n.n,moved:!1},this.onStart&&this.onStart(),r==="jump"&&this.jumpTo(a,n.n),this.render()}jumpTo(e,t){let{scale:a,steps:s}=this.scale(),i=this.notes(),r=this.x2semi(e),n=0,l=1/0;i.forEach((c,h)=>{let d=Math.abs(c-r);d<l&&(l=d,n=h)});let u=ur({lo:i[Math.max(0,n-Math.floor(t/2))],n:t},i[Math.max(0,n-Math.floor(t/2))],a,s);this.set(u),this.drag.lo=u.lo,this.drag.mode="move",this.drag.x0=e}move(e){let t=this.drag;if(!t||e.pointerId!==t.id)return;let a=this.el.getBoundingClientRect(),s=e.clientX-a.left;Math.abs(s-t.x0)>3&&(t.moved=!0);let i=(s-t.x0)/this.w*(ho-ha),{scale:r,steps:n}=this.scale(),l=this.get(),u;t.mode==="move"?u=ur({lo:t.lo,n:t.n},t.lo+i,r,n):t.mode==="left"?u=dr({lo:t.lo,n:t.n},"left",t.lo+i,r,n):t.mode==="right"&&(u=dr({lo:t.lo,n:t.n},"right",t.hi+i,r,n)),u&&(u.lo!==l.lo||u.n!==l.n)&&this.set(u),this.render()}up(e){this.drag&&e.pointerId===this.drag.id&&(this.drag=null,this.render())}key(e){let t=this.notes(),a=this.get(),s=t.indexOf(this.nearestNote(a.lo));if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();let i=e.key==="ArrowRight"?1:-1;if(e.shiftKey)this.set({lo:a.lo,n:Math.max(1,Math.min(Sh,a.n+i))});else{let r=Math.max(0,Math.min(t.length-a.n,s+i));this.set({lo:t[r],n:a.n})}this.render()}}render(){let{w:e,h:t,d:a}=ds(this.cv);this.w=e,this.h=t;let s=this.cv.getContext("2d");s.setTransform(a,0,0,a,0,0),s.clearRect(0,0,e,t);let{scale:i,steps:r,key:n}=this.scale(),l=dt("--accent"),u=dt("--ink"),c=dt("--ink-3"),h=document.documentElement.dataset.theme==="dark",d=6,m=t-18;for(let x=Math.floor(ha/12);x<Math.ceil(ho/12);x++){let S=this.semi2x(x*12-.5),E=this.semi2x(x*12+11.5);s.fillStyle=x%2===0?h?"rgba(255,255,255,0.045)":"rgba(0,0,0,0.045)":"rgba(0,0,0,0)",s.fillRect(S,d,E-S,m-d)}let v=this.windowPx(),g=9;s.fillStyle=l,s.globalAlpha=h?.22:.3,ft(s,v.x0,d-2,v.x1-v.x0,m-d+4,g),s.fill(),s.globalAlpha=1,s.strokeStyle=l,s.lineWidth=2,ft(s,v.x0,d-2,v.x1-v.x0,m-d+4,g),s.stroke();let f=this.notes(),p=e/(ho-ha);for(let x of f){let S=this.semi2x(x),E=x>=v.lo&&x<=v.hi,L=(x%12+12)%12===0,D=Math.floor(x/12);s.fillStyle=E?u:c,s.globalAlpha=E?D%2===0?1:.72:.35;let q=Math.max(2,Math.min(p*.55,6)),A=L?m-d-4:(m-d)*.62;ft(s,S-q/2,m-2-A,q,A,q/2),s.fill(),s.globalAlpha=1}s.fillStyle=l;for(let x of[v.x0,v.x1])ft(s,x-3.5,d+(m-d)/2-11,7,22,3.5),s.fill();this.drag&&(s.fillStyle=l,s.globalAlpha=.12,s.fillRect(0,0,e,t),s.globalAlpha=1);let y=v.cols.length;this.lbl.textContent=`${uo(v.lo,n)} \u2192 ${uo(v.hi,n)} \xB7 ${y} note${y>1?"s":""}`,this.el.setAttribute("aria-label","Plage de notes : "+this.lbl.textContent)}};function ft(o,e,t,a,s,i){i=Math.max(0,Math.min(i,a/2,s/2)),o.beginPath(),o.moveTo(e+i,t),o.lineTo(e+a-i,t),o.quadraticCurveTo(e+a,t,e+a,t+i),o.lineTo(e+a,t+s-i),o.quadraticCurveTo(e+a,t+s,e+a-i,t+s),o.lineTo(e+i,t+s),o.quadraticCurveTo(e,t+s,e,t+s-i),o.lineTo(e,t+i),o.quadraticCurveTo(e,t,e+i,t),o.closePath()}function Mr(o){return Array.from({length:o},(e,t)=>({x0:t/o,y0:0,x1:(t+1)/o,y1:1}))}function d0(o){let{keys:e,whites:t}=o,a=[];for(let i of e)i.black||a.push({x0:i.pos/t,y0:0,x1:(i.pos+1)/t,y1:1});let s=Aa/t/2;for(let i of e)i.black&&a.push({x0:i.pos/t-s,y0:0,x1:i.pos/t+s,y1:Ws,cut:!0});return a}var ua={plain:0,shaded:1,white:2,black:3,laneEven:4,laneOdd:5};function Pa(o){if(o=(o||"").trim(),o.startsWith("color(")){let t=o.match(/[\d.]+/g).map(Number);return[t[t.length-3],t[t.length-2],t[t.length-1]].map(a=>a>1?a/255:a)}if(o.startsWith("#"))return(o.length===4?o.slice(1).split("").map(a=>a+a):[o.slice(1,3),o.slice(3,5),o.slice(5,7)]).map(a=>parseInt(a,16)/255);let e=o.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[0,0,0]}function Mh(o,e,t,a){let s=n=>[1,1,1,n],i=n=>[0,0,0,n],r=n=>[...e,n];return a?[s(0),s(.03),s(.06),[.035,.015,.055,.72],s(0),s(.025)]:o?[s(0),s(.035),s(.075),[.031,.035,.047,1],s(0),s(.03)]:t==="aquarelle"?[i(0),i(.03),s(.55),[.16,.14,.13,.93],i(0),i(.025)]:t==="vitrail"?[i(.02),s(.16),s(.4),r(.9),s(.12),i(.03)]:[i(.035),s(.13),s(.34),r(.88),s(.1),i(.04)]}var f0={classique:0,aquarelle:1,vitrail:2},p0=(o,e,t)=>o.map((a,s)=>a+(e[s]-a)*t);function Tr({kind:o,keys:e,sig:t,el:a,glass:s,hdr:i,slabs:r,fills:n,spill:l=0,radius:u,look:c="aquarelle",gel:h=1,glassLook:d="optique"}){let m=getComputedStyle(a.closest(".app")||document.documentElement),v=document.documentElement.dataset.theme!=="light",g=document.documentElement.hasAttribute("data-halloween"),f=Pa(m.getPropertyValue("--accent")),p=Pa(m.getPropertyValue("--accent-ink"));(v||!(c in f0))&&(c=v?"dark":"aquarelle");let y=c==="aquarelle",x=v?[26/255,28/255,35/255]:y?[.98,.965,.933]:c==="vitrail"?p0(f,[1,1,1],.35):f,S=v?[18/255,19/255,24/255]:y?[.945,.918,.871]:c==="vitrail"?p0(f,[1,1,1],.1):f,E=y?[.25,.2,.15,e&&e.length<=4?.18:.12]:o==="pad"&&e&&e.length<=4?v?[1,1,1,.1]:[0,0,0,.12]:v?[1,1,1,.06]:[0,0,0,.07],L=u||parseFloat(getComputedStyle(a).borderTopLeftRadius)||20,D=Pa(m.getPropertyValue("--surface")),q=Pa(m.getPropertyValue("--bg")),A=s?v?1:.6:0;return{kind:o,keys:e,dark:v,accent:f,bgTop:x,bgBot:S,sep:E,sepPx:e&&e.length<=4?2:1,kinds:Mh(v,p,c,g),glass:!!s,hdr:i||1,radius:L,surf:D,appBg:q,slabs:r||[[0,0,1,1]],fills:n||[],spill:s?l:0,shadow:A,style:v?0:f0[c],gel:h,glassLook:d,keyGlow:v||y?[...f,y?.55:.5]:[1,1,1,.55],sig:`${o}|${t}|${v}|${g}|${c}|${h}|${d}|${f.join()}|${s}|${i}|${L}|${l}|${JSON.stringify(r||0)}|${JSON.stringify(n||0)}`}}function ti(o,e,t,a){o.width=t,o.height=a;let s=o.getContext("2d");return s.imageSmoothingEnabled=!1,s.fillStyle="#000",s.fillRect(0,0,t,a),(e||[]).forEach((i,r)=>{let n=Math.round(i.x0*t),l=Math.round(i.x1*t),u=Math.round(i.y0*a),c=Math.round(i.y1*a);i.cut&&(s.fillStyle="#000",s.fillRect(n-1,u,l-n+2,c-u+1)),s.fillStyle=`rgb(${r+1},${(i.kind||0)*40},0)`,s.fillRect(n,u,Math.max(1,l-n),Math.max(1,c-u))}),o}function fo(o,e,t,a){o.width=t,o.height=a;let s=o.getContext("2d");if(s.imageSmoothingEnabled=!1,!e)return s.fillStyle="rgb(1,0,0)",s.fillRect(0,0,t,a),o;s.fillStyle="#000",s.fillRect(0,0,t,a);let i=Math.max(1,Math.round(t/180));return e.forEach((r,n)=>{let l=Math.round(r.x0*t),u=Math.round(r.x1*t),c=Math.round(r.y0*a),h=Math.round(r.y1*a);r.cut&&(s.fillStyle="#000",s.fillRect(l-i,c,u-l+2*i,h-c+i)),s.fillStyle=`rgb(${n+1},0,0)`,s.fillRect(l+i,c+(r.y0>0?i:0),Math.max(1,u-l-2*i),Math.max(1,h-c-(r.y0>0?i:0)-(r.y1<1?i:0)))}),o}var si=class{constructor(e,t={}){this.store=e,this.opts=t,this.el=b("div",{class:"pad",role:"application","aria-label":"Surface de jeu"}),this.cv=b("canvas"),this.hint=b("div",{class:"hint"},b("b",{text:"\xC0 toi de jouer."}),b("span",{text:""})),this.axY=b("div",{class:"ax y"}),this.el.append(this.cv,this.hint,this.axY),this.touches=new Map,this.ripples=[],this.level=0,this.raf=0,this.flash=new Map,this.ghosts=[],this.fx=null,this.ghouls=null,this.gpu=!1,this.under=!1,this.inkUnder=!1,this.pianoCache=null,this.el.addEventListener("pointerdown",a=>this.down(a)),this.el.addEventListener("pointermove",a=>this.move(a)),this.el.addEventListener("pointerup",a=>this.up(a)),this.el.addEventListener("pointercancel",a=>this.up(a,!0)),this.el.addEventListener("lostpointercapture",a=>{this.touches.has(a.pointerId)&&this.up(a,!0)}),this.el.addEventListener("contextmenu",a=>a.preventDefault()),this.ro=new ResizeObserver(()=>this.draw()),this.ro.observe(this.el)}get part(){return this.store.ui.part}columns(){let e=this.store.project,t=e.parts[this.part];return Zt(t.range,e.scale,t.steps)}get piano(){return this.part!=="drum"&&!!this.store.settings.piano}pianoLayout(){let e=this.store.project,t=e.parts[this.part],a=`${t.range.lo}:${t.range.n}:${e.scale}:${t.steps}:${e.key}`;return(!this.pianoCache||this.pianoCache.k!==a)&&(this.pianoCache={k:a,L:Gn(t.range,e.scale,t.steps,e.key)}),this.pianoCache.L}inkShare(){return this.fx&&this.store.settings.fluid?.4:1}keyLayout(){if(this.part==="drum")return{sig:"drum",keys:Mr(4).map((s,i)=>({...s,kind:i%2?ua.laneOdd:ua.laneEven}))};if(this.piano){let s=this.pianoLayout();return{sig:"piano:"+this.pianoCache.k,keys:d0(s).map(i=>({...i,kind:i.cut?ua.black:ua.white}))}}let e=this.columns(),t=e.length,a=s=>(s.octave%2+2)%2===0;return{sig:"cols:"+t+":"+e.map(s=>a(s)?1:0).join(""),keys:Mr(t).map((s,i)=>({...s,kind:a(e[i])?ua.shaded:ua.plain}))}}pitchClass(e,t){let a=this.store.project;return((a.key+Ls(e,t,a.scale))%12+12)%12}keyBox(e,t){if(!t.black)return{x0:t.pos/e.whites,w:1/e.whites};let a=Aa/e.whites/2;return{x0:t.pos/e.whites-a,w:2*a}}setClock(e){this.clock=e,e.playing&&this.hasStrokes()&&this.kick()}playingPattern(){let e=this.clock,t=this.store.project;return e&&t.patterns[e.pat]||this.store.pattern}hasStrokes(e=this.part){let t=this.playingPattern().gest;return!!(t&&t[e]&&t[e].length)}clockTick(e){let t=this.clock;if(!t||!t.playing||t.tick<0)return-1;let a=Math.min(120,e-t.at)/t.msPerTick;return(t.tick+a)%t.L}pointToPad(e,t,a){if(e==="drum")return{x:(t+a[1])/4,y:1-a[2]};let s=this.store.project.scale,i=Ls(a[3],a[4],s);if(this.piano){let u=this.pianoLayout(),c=u.keys.find(d=>d.semi===i);if(!c)return null;let h=this.keyBox(u,c);return{x:h.x0+a[1]*h.w,y:(1-a[2])*(c.black?Ws:1)}}let r=this.columns(),n=-1,l=3;return r.forEach((u,c)=>{let h=Math.abs(u.semi-i);h<l&&(l=h,n=c)}),n<0?null:{x:(n+a[1])/r.length,y:1-a[2]}}strokeAt(e,t,a){let s=t.p,i=s.length;if(!i||a<s[0][0]||a>s[i-1][0]+(i===1?6:1.5))return null;let r=0;for(;r<i-1&&s[r+1][0]<=a;)r++;let n=this.pointToPad(e,t.l,s[r]);if(r===i-1)return n;let l=this.pointToPad(e,t.l,s[r+1]);if(!n||!l)return n||l;let u=(a-s[r][0])/Math.max(.1,s[r+1][0]-s[r][0]);return{x:n.x+(l.x-n.x)*u,y:n.y+(l.y-n.y)*u}}drawReplay(e,t,a,s,i,r){let n=this.clockTick(r),l=this.part,u=this.playingPattern().gest,c=new Map;if(n<0||!u||!u[l])return this.strokePrev=c,!1;let h=this.store.settings.ghosts,d=new Set([...this.touches.values()].map(m=>m.lane));for(let m of u[l]){if(l!=="drum"&&this.touches.size)break;if(l==="drum"&&d.has(m.l))continue;let v=this.strokeAt(l,m,n);if(!v)continue;let g=this.strokePrev&&this.strokePrev.get(m);if(c.set(m,v),this.fx){let S=m.p[0],E=l==="drum"?void 0:this.pitchClass(S[3],S[4]);g?(v.x!==g.x||v.y!==g.y)&&this.fx.touch(l,v.x,v.y,v.x-g.x,v.y-g.y,"move",m.l,E):this.fx.touch(l,v.x,v.y,0,0,"down",m.l,E)}if(!h)continue;e.lineCap="round",e.lineJoin="round";let f=v;for(let S=1;S<=14;S++){let E=this.strokeAt(l,m,n-S*2);if(!E)break;let L=1-S/15;e.strokeStyle=s?_e(i,.55*L):`rgba(255,255,255,${.15+.6*L})`,e.lineWidth=2+12*L,e.beginPath(),e.moveTo(f.x*t,f.y*a),e.lineTo(E.x*t,E.y*a),e.stroke(),f=E}let p=v.x*t,y=v.y*a,x=e.createRadialGradient(p,y,0,p,y,46);s?(x.addColorStop(0,_e(i,.32)),x.addColorStop(1,_e(i,0))):(x.addColorStop(0,"rgba(255,255,255,0.45)"),x.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=x,e.fillRect(p-46,y-46,92,92),e.lineWidth=2,e.strokeStyle=s?_e(i,.8):"rgba(255,255,255,0.9)",e.setLineDash([5,4]),e.beginPath(),e.arc(p,y,19,0,Math.PI*2),e.stroke(),e.setLineDash([])}return this.strokePrev=c,!0}keyGeom(e,t){return t.black?{x:t.pos/e.whites,top:Ws}:{x:(t.pos+.5)/e.whites,top:1}}local(e){let t=this.el.getBoundingClientRect();return{x:Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,(e.clientY-t.top)/t.height))}}msgFor(e,t,a){let s=this.part;if(s==="drum"){let l=Math.min(3,Math.floor(a.x*4)),u=a.x*4-l;return{type:"pad",part:s,lane:l,id:e,phase:t,x:u,y:1-a.y,v:.9}}if(this.piano){let l=this.pianoLayout(),u=Vn(l,a.x,a.y),c=u.black?1-Math.min(1,a.y/Ws):1-a.y,h=this.keyBox(l,u),d=Math.min(1,Math.max(0,(a.x-h.x0)/h.w));return{type:"pad",part:s,id:e,phase:t,deg:u.deg,acc:u.acc,y:c,fx:d,v:.85,col:l.keys.indexOf(u)}}let i=this.columns(),r=Math.min(i.length-1,Math.floor(a.x*i.length)),n=i[r];return{type:"pad",part:s,id:e,phase:t,deg:n.deg,acc:n.acc,y:1-a.y,fx:a.x*i.length-r,v:.85,col:r}}down(e){e.preventDefault(),this.opts.onFirstTouch&&this.opts.onFirstTouch();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.local(e),a=this.msgFor(e.pointerId,"down",t);this.touches.set(e.pointerId,{...t,rx:t.x,ry:t.y,lane:a.lane,col:a.col,deg:a.deg,acc:a.acc,t:performance.now()}),this.fx&&(this.fx.touch(this.part,t.x,t.y,0,0,"down",a.lane,a.deg!==void 0?this.pitchClass(a.deg,a.acc):void 0),this.fx.press(e.pointerId,t.x,t.y,"down")),this.ghouls&&this.ghouls.press(e.pointerId,t.x,t.y,"down"),this.store.send(a),this.hint.style.opacity="0",this.kick()}move(e){let t=this.touches.get(e.pointerId);if(!t)return;let a=this.local(e);if(this.fx&&(this.fx.touch(this.part,a.x,a.y,a.x-t.rx,a.y-t.ry,"move",t.lane,t.pc),this.fx.press(e.pointerId,a.x,a.y,"move"),t.rx=a.x,t.ry=a.y),this.ghouls&&this.ghouls.press(e.pointerId,a.x,a.y,"move"),this.part==="drum"){let s=t.lane,i=Math.min(.999,Math.max(0,a.x*4-s));this.store.send({type:"pad",part:"drum",lane:s,id:e.pointerId,phase:"move",x:i,y:1-a.y}),t.x=(s+i)/4,t.y=a.y}else{let s=this.msgFor(e.pointerId,"move",a);t.x=a.x,t.y=a.y,t.col=s.col,t.deg=s.deg,t.acc=s.acc,this.fx&&(t.pc=this.pitchClass(s.deg,s.acc)),this.store.send(s)}}up(e,t){let a=this.touches.get(e.pointerId);if(!a)return;this.touches.delete(e.pointerId),this.fx&&this.fx.press(e.pointerId,a.x,a.y,"up"),this.ghouls&&this.ghouls.press(e.pointerId,a.x,a.y,"up");let s=this.part;s==="drum"?this.store.send({type:"pad",part:s,lane:a.lane,id:e.pointerId,phase:t?"cancel":"up"}):this.store.send({type:"pad",part:s,id:e.pointerId,phase:t?"cancel":"up"})}releaseAll(){for(let[e,t]of this.touches)this.part==="drum"?this.store.send({type:"pad",part:"drum",lane:t.lane,id:e,phase:"cancel"}):this.store.send({type:"pad",part:this.part,id:e,phase:"cancel"});this.touches.clear()}get layers(){return!!(this.fx||this.ghouls&&this.ghouls.on)}noteFx(...e){this.fx&&this.fx.note(...e),this.ghouls&&this.ghouls.on&&this.ghouls.note(...e)}onTrig(e,t){if(t){let r=this.part==="drum"?t.drum:t[this.part];this.level=Math.max(this.level*.6,r||0)}if(!e){this.level>.01&&this.kick();return}let a=this.part,s=performance.now(),i=this.store.settings.ghosts&&!this.hasStrokes(a);for(let r=0;r<e.length;r+=4){let n=e[r],l=e[r+1],u=e[r+2],c=e[r+3];if(c===-1&&this.layers){if(a==="drum"&&n===0){for(let[,h]of this.touches)if(h.lane===l){this.noteFx("drum",h.x,h.y,l,.9);break}}else if(a==="bass"&&n===1||a==="lead"&&n===2){let h=null;for(let[,d]of this.touches)(!h||d.deg===l&&d.acc===u)&&(h=d);h&&this.noteFx(a,h.x,h.y,0,.9,this.pitchClass(l,u))}}if(a==="drum"&&n===0){if(this.ripples.push({lane:l,zone:u,t:s}),c!==-1){let h=(l+(u+.5)/3)/4,d=c>=0?1-c:.5;i&&c>=0&&this.ghosts.push({x:h,y:d,t:s}),this.layers&&this.noteFx("drum",h,d,l)}}else if(a==="bass"&&n===1||a==="lead"&&n===2){let h=c>=0?c:this.store.macroValue(a,6);if(this.piano){let d=this.pianoLayout(),m=Ls(l,u,this.store.project.scale),v=d.keys.findIndex(g=>g.semi===m);if(this.ripples.push({col:v,t:s}),c!==-1&&v>=0){let g=this.keyGeom(d,d.keys[v]);i&&this.ghosts.push({x:g.x,y:(1-h)*g.top,t:s}),this.layers&&this.noteFx(a,g.x,(1-h)*g.top,0,.8,this.pitchClass(l,u))}}else{let d=this.columns(),m=d.findIndex(v=>v.deg===l&&v.acc===u);this.ripples.push({col:m,deg:l,t:s}),c!==-1&&m>=0&&(i&&this.ghosts.push({x:(m+.5)/d.length,y:1-h,t:s}),this.layers&&this.noteFx(a,(m+.5)/d.length,1-h,0,.8,this.pitchClass(l,u)))}}}this.ripples.length>40&&this.ripples.splice(0,this.ripples.length-40),this.ghosts.length>24&&this.ghosts.splice(0,this.ghosts.length-24),this.kick()}kick(){this.raf||(this.raf=requestAnimationFrame(()=>{this.raf=0,this.draw(!0)}))}setHint(){let e=this.store.ui,t=this.store.presetFor(this.part==="drum"?"d0":this.part),a;e.erase?a="Gomme : touche pendant la lecture pour effacer":this.part==="drum"?a="Une colonne par son \xB7 \u2194 variante \xB7 \u2195\uFE0E caract\xE8re":a=`${this.piano?"Clavier":"Notes \u2194"} \xB7 ${t&&t.expr?t.expr.name:"Expression"} \u2195\uFE0E`,this.hint.querySelector("b").textContent=e.erase?"Gomme":e.armed&&!e.playing?"Pr\xEAt \xE0 enregistrer":"\xC0 toi de jouer.",this.hint.querySelector("span").textContent=e.armed&&!e.playing?"Le premier toucher lance la boucle":a,this.axY.textContent=this.part==="drum"?"Caract\xE8re":t&&t.expr?t.expr.name:"",this.axY.hidden=this.piano}showHint(e){this.hint.style.opacity=e?"1":"0"}draw(e){let{w:t,h:a,d:s}=ds(this.cv),i=this.cv.getContext("2d");i.setTransform(s,0,0,s,0,0);let r=document.documentElement.dataset.theme==="dark",n=dt("--accent"),l=dt("--accent-ink"),u=dt("--ink"),c=performance.now();this.fx&&this.fx.syncScene(),this.under=this.gpu||!!(this.ghouls&&this.ghouls.stage);let h=this.under;if(i.clearRect(0,0,t,a),h&&(i.save(),ft(i,0,0,t,a,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),i.clip()),!h){if(r){let g=i.createLinearGradient(0,0,0,a);g.addColorStop(0,"#1a1c23"),g.addColorStop(1,"#121318"),i.fillStyle=g}else i.fillStyle=n;i.fillRect(0,0,t,a)}this.part==="drum"?this.drawDrums(i,t,a,r,n,l,u,c):this.drawMelodic(i,t,a,r,n,l,u,c);for(let[,g]of this.touches){let f=g.x*t,p=g.y*a,y=Math.max(70,Math.min(t,a)*.35)*(1+this.level*.6),x=i.createRadialGradient(f,p,0,f,p,y);r?(x.addColorStop(0,_e(n,.55+this.level*.3)),x.addColorStop(.35,_e(n,.18)),x.addColorStop(1,_e(n,0))):(x.addColorStop(0,"rgba(255,255,255,0.65)"),x.addColorStop(.4,"rgba(255,255,255,0.18)"),x.addColorStop(1,"rgba(255,255,255,0)")),i.globalCompositeOperation=r?"lighter":"source-over",i.fillStyle=x,i.fillRect(f-y,p-y,2*y,2*y),i.globalCompositeOperation="source-over",i.strokeStyle=r?_e(n,.9):"rgba(255,255,255,0.9)",i.lineWidth=2,i.beginPath(),i.arc(f,p,22,0,Math.PI*2),i.stroke()}this.drawGhosts(i,t,a,r,n,c);let m=this.drawReplay(i,t,a,r,n,c);if(this.store.ui.erase){i.fillStyle=r?"rgba(255,80,80,0.08)":"rgba(0,0,0,0.08)";for(let g=-a;g<t;g+=22)i.beginPath(),i.moveTo(g,a),i.lineTo(g+a,0),i.lineTo(g+a+8,0),i.lineTo(g+8,a),i.fill()}h&&i.restore(),this.level*=.9;let v=this.touches.size||this.ripples.some(g=>c-g.t<600)||this.ghosts.length||this.level>.02||m;this.ripples=this.ripples.filter(g=>c-g.t<600),this.ghosts=this.ghosts.filter(g=>c-g.t<m0),v&&e&&this.kick()}drawGhosts(e,t,a,s,i,r){for(let n of this.ghosts){let l=(r-n.t)/m0;if(l>=1)continue;let u=n.x*t,c=Math.min(a-8,Math.max(8,n.y*a)),h=(1-l)*(1-l),d=15+10*l,m=e.createRadialGradient(u,c,0,u,c,d*2.2);s?(m.addColorStop(0,_e(i,.35*h)),m.addColorStop(1,_e(i,0))):(m.addColorStop(0,`rgba(255,255,255,${.5*h})`),m.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=m,e.fillRect(u-d*2.2,c-d*2.2,d*4.4,d*4.4),e.lineWidth=2,e.strokeStyle=s?_e(i,.85*h):`rgba(255,255,255,${.95*h})`,e.beginPath(),e.arc(u,c,d,0,Math.PI*2),e.stroke(),e.fillStyle=s?_e(i,.9*h):`rgba(255,255,255,${h})`,e.beginPath(),e.arc(u,c,3.5,0,Math.PI*2),e.fill()}}drawPiano(e,t,a,s,i,r,n){let l=this.pianoLayout(),u=t/l.whites,c=u*Aa,h=a*Ws,d=this.store.project.key,m=new Set;for(let[,E]of this.touches)E.col!==void 0&&m.add(E.col);let v=new Map;for(let E of this.ripples)E.col>=0&&v.set(E.col,Math.max(v.get(E.col)||0,(1-(n-E.t)/600)*this.inkShare()));let g=!this.inkUnder,f=(E,L)=>m.has(L)?s?_e(i,.75):"rgba(255,255,255,0.92)":E?s?"#08090c":_e(r,.88):s?"rgba(255,255,255,0.075)":"rgba(255,255,255,0.34)",p=this.under?new Float32Array(64):null,y=l.whites,x=0,S=0;l.keys.forEach((E,L)=>{if(E.black)return;let D=E.pos*u,q=v.get(L)||0;if(this.under?g&&(p[x]=Math.max(m.has(L)?1:0,q)):(e.fillStyle=f(!1,L),ft(e,D+1,0,u-2,a,Math.min(8,u/4)),e.fill(),q>0&&(e.fillStyle=s?_e(i,.4*q):`rgba(255,255,255,${.5*q})`,ft(e,D+1,0,u-2,a,Math.min(8,u/4)),e.fill())),x++,this.keyMark(e,E,D+u/2,a-30,s,i,r),u>20||E.isRoot){e.fillStyle=s?"rgba(255,255,255,0.5)":_e(r,.65),e.font=`600 ${u>30?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let A=uo(E.semi,d);e.fillText(E.isRoot||u>30?A:A.replace(/-?\d+$/,""),D+u/2,a-10)}}),l.keys.forEach((E,L)=>{if(!E.black)return;let D=E.pos/l.whites*t-c/2,q=v.get(L)||0;this.under?g&&(p[y+S]=Math.max(m.has(L)?1:0,q)):(e.fillStyle=f(!0,L),ft(e,D,-6,c,h+6,Math.min(6,c/4)),e.fill(),s&&!m.has(L)&&(e.strokeStyle="rgba(255,255,255,0.10)",e.lineWidth=1,ft(e,D+.5,-6,c-1,h+5.5,Math.min(6,c/4)),e.stroke()),q>0&&(e.fillStyle=_e(i,.55*q),ft(e,D,-6,c,h+6,Math.min(6,c/4)),e.fill())),S++,this.keyMark(e,E,D+c/2,h-16,!0,i,r)}),p&&this.fx&&this.fx.keyLights(g?p:null),p&&this.ghouls&&this.ghouls.keyLights(g?p:null)}keyMark(e,t,a,s,i,r,n){!t.inScale&&!t.isRoot||(t.isRoot?e.fillStyle=i?r:n:e.fillStyle=i?"rgba(255,255,255,0.6)":_e(n,.45),e.beginPath(),e.arc(a,s,t.isRoot?3.6:2.6,0,Math.PI*2),e.fill())}drawMelodic(e,t,a,s,i,r,n,l){if(this.piano){this.drawPiano(e,t,a,s,i,r,l);return}let u=this.columns(),c=u.length,h=t/c,d=this.store.project.key;for(let v=0;v<c;v++){let g=u[v],f=v*h,p=(g.octave%2+2)%2===0;this.under||(s?e.fillStyle=p?"rgba(255,255,255,0.035)":"rgba(255,255,255,0)":e.fillStyle=p?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.035)",e.fillRect(f,0,h,a),v>0&&(e.fillStyle=s?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",e.fillRect(f-.5,0,1,a))),v>0&&u[v-1].octave!==g.octave&&(e.fillStyle=s?_e(i,.22):"rgba(255,255,255,0.45)",e.fillRect(f-.75,0,1.5,a)),g.isRoot&&(e.fillStyle=s?_e(i,.75):r,e.globalAlpha=s?1:.55,ft(e,f+h/2-3,a-30,6,6,3),e.fill(),e.globalAlpha=1),e.fillStyle=s?"rgba(255,255,255,0.45)":_e(r,.6),e.font=`600 ${h>34?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let y=uo(g.semi,d);(h>22||g.isRoot)&&e.fillText(h>30?y:y.replace(/\d+$/,""),f+h/2,a-10)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let v=new Float32Array(64),g=this.store.settings.ghosts?.6:1;for(let[,f]of this.touches){let p=Math.min(c-1,Math.floor(f.x*c));v[p]=Math.max(v[p],.45)}for(let f of this.ripples)f.col>=0&&f.col<64&&(v[f.col]=Math.max(v[f.col],g*(1-(l-f.t)/600)));this.fx&&this.fx.keyLights(v),this.ghouls&&this.ghouls.keyLights(v);return}for(let[,v]of this.touches){let g=Math.min(c-1,Math.floor(v.x*c));e.fillStyle=s?_e(i,.16):"rgba(255,255,255,0.22)",e.fillRect(g*h,0,h,a)}let m=(this.store.settings.ghosts?.6:1)*this.inkShare();for(let v of this.ripples){if(v.col<0)continue;let g=(l-v.t)/600,f=v.col*h;e.fillStyle=s?_e(i,.45*m*(1-g)):`rgba(255,255,255,${.5*m*(1-g)})`,e.fillRect(f+2,0,h-4,a)}}drawDrums(e,t,a,s,i,r,n,l){let u=t/4,c=this.store.project;for(let h=0;h<4;h++){let d=h*u;this.under||(e.fillStyle=s?h%2?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.0)":h%2?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.1)",e.fillRect(d,0,u,a),h>0&&(e.fillStyle=s?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)",e.fillRect(d-1,0,2,a)));for(let v=1;v<3;v++)e.fillStyle=s?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.05)",e.fillRect(d+v*u/3,a*.18,1,a*.64);let m=this.store.presetFor("d"+h);if(e.textAlign="center",e.fillStyle=s?"rgba(255,255,255,0.85)":_e(r,.85),e.font="750 13px -apple-system, system-ui, sans-serif",e.fillText(["Kick","Snare","Hat","Perc"][h],d+u/2,22),e.font="600 10.5px -apple-system, system-ui, sans-serif",e.fillStyle=s?"rgba(255,255,255,0.45)":_e(r,.6),e.fillText(Th(e,m?m.name:"",u-8),d+u/2,38),m&&m.variants)for(let v=0;v<3;v++)e.beginPath(),e.arc(d+(v+.5)*u/3,a-12,2.2,0,Math.PI*2),e.fill();c.parts.drum.mute[h]&&(e.fillStyle=s?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.35)",e.fillRect(d,0,u,a))}e.font="750 12px -apple-system, system-ui, sans-serif",e.textAlign="center";for(let[,h]of this.touches){let d=h.lane,m=this.store.presetFor("d"+d);if(!m||!m.variants)continue;let v=Math.min(2,Math.max(0,Math.floor((h.x*4-d)*3))),g=m.variants[v]?m.variants[v].name:"",f=Math.min(t-40,Math.max(40,h.x*t)),p=Math.max(70,h.y*a-44);e.fillStyle=s?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.75)";let y=e.measureText(g).width+16;ft(e,f-y/2,p-15,y,22,11),e.fill(),e.fillStyle=s?"#fff":r,e.fillText(g,f,p)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let h=new Float32Array(64);for(let d of this.ripples)h[d.lane]=Math.max(h[d.lane],1-(l-d.t)/600);this.fx&&this.fx.keyLights(h),this.ghouls&&this.ghouls.keyLights(h);return}for(let h of this.ripples){let d=(l-h.t)/600,m=h.lane*u,v=e.createLinearGradient(0,a,0,0),g=.55*(1-d)*this.inkShare();s?(v.addColorStop(0,_e(i,g)),v.addColorStop(1,_e(i,0))):(v.addColorStop(0,`rgba(255,255,255,${g})`),v.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=v,e.fillRect(m+2,0,u-4,a)}}},m0=520;function Th(o,e,t){if(o.measureText(e).width<=t)return e;for(;e.length>1&&o.measureText(e+"\u2026").width>t;)e=e.slice(0,-1);return e+"\u2026"}function _e(o,e){if(o=o.trim(),o.startsWith("#")){let t=o.length===4?o.slice(1).split("").map(a=>parseInt(a+a,16)):[1,3,5].map(a=>parseInt(o.slice(a,a+2),16));return`rgba(${t[0]},${t[1]},${t[2]},${e})`}return o.startsWith("color(")?o.replace(/\)\s*$/,` / ${e})`):o.startsWith("rgb(")?o.replace("rgb(","rgba(").replace(")",`,${e})`):o}var ai=class{constructor(e,{onSelect:t}){this.store=e,this.onSelect=t,this.el=b("div",{class:"tl",role:"img","aria-label":"Frise de la boucle"}),this.cv=b("canvas"),this.el.append(this.cv),this.sel=null,this.drag=null,this.tick=-1,this.el.addEventListener("pointerdown",s=>{s.preventDefault();try{this.el.setPointerCapture(s.pointerId)}catch{}let i=this.tickAt(s);this.drag={id:s.pointerId,t0:i,moved:!1}}),this.el.addEventListener("pointermove",s=>{if(!this.drag||s.pointerId!==this.drag.id)return;let i=this.tickAt(s);Math.abs(i-this.drag.t0)>=24&&(this.drag.moved=!0),this.drag.moved&&(this.sel={t0:Math.min(i,this.drag.t0),t1:Math.max(i,this.drag.t0)+24},this.draw())});let a=s=>{if(!this.drag||s.pointerId!==this.drag.id)return;let i=this.drag;if(this.drag=null,!i.moved)if(this.sel&&i.t0>=this.sel.t0&&i.t0<this.sel.t1)this.sel=null;else{let r=Math.floor(i.t0/384);this.sel={t0:r*384,t1:(r+1)*384}}this.draw(),this.onSelect(this.sel)};this.el.addEventListener("pointerup",a),this.el.addEventListener("pointercancel",a),new ResizeObserver(()=>this.draw()).observe(this.el)}get L(){return 384*this.store.project.bars}tickAt(e){let t=this.el.getBoundingClientRect(),a=Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width));return Math.floor(a*this.L/24)*24}clear(){this.sel=null,this.draw()}setTick(e){e!==this.tick&&(this.tick=e,this.draw())}draw(){let{w:e,h:t,d:a}=ds(this.cv),s=this.cv.getContext("2d");s.setTransform(a,0,0,a,0,0),s.clearRect(0,0,e,t);let i=this.store.project,r=this.store.ui,n=this.L,l=dt("--accent"),u=dt("--ink"),c=dt("--line-2"),h=m=>m/n*e;for(let m=0;m<=i.bars;m++)s.fillStyle=c,s.fillRect(Math.round(h(m*384))-.5,0,1,t);for(let m=0;m<n;m+=96)s.fillStyle=c,s.globalAlpha=.5,s.fillRect(Math.round(h(m)),t-5,1,5),s.globalAlpha=1;this.sel&&(s.fillStyle=_e(l,.28),ft(s,h(this.sel.t0)+1,2,h(this.sel.t1)-h(this.sel.t0)-2,t-4,6),s.fill(),s.strokeStyle=l,s.lineWidth=1.5,s.stroke());let d=i.patterns[i.current];if(r.part==="drum"){let m=(t-8)/4;for(let v=0;v<4;v++){s.fillStyle=u,s.globalAlpha=v===r.lane?.95:.6;for(let g of d.drum[v].hits){let f=h(g.t),p=Math.max(2,e/(n/24)*.55);ft(s,f,4+v*m+1,p,m-2,1.5),s.fill()}}s.globalAlpha=1}else{let m=d[r.part].notes;if(m.length){let v=1/0,g=-1/0;for(let x of m){let S=Ls(x.deg,x.acc,i.scale);v=Math.min(v,S),g=Math.max(g,S)}let f=Math.max(12,g-v+1);s.fillStyle=u,s.strokeStyle=u;let p=null,y=m.slice().sort((x,S)=>x.t-S.t);for(let x of y){let S=Ls(x.deg,x.acc,i.scale),E=t-6-(S-v)/f*(t-12),L=h(x.t),D=Math.max(2.5,h(x.t+x.d)-L-1);s.globalAlpha=.85,ft(s,L,E-2.5,D,5,2.5),s.fill(),x.tie&&p&&(s.lineWidth=1.5,s.beginPath(),s.moveTo(p.x,p.y),s.lineTo(L+1,E),s.stroke()),p={x:L+D,y:E}}s.globalAlpha=1}}r.playing&&this.tick>=0&&(s.fillStyle=r.armed?dt("--rec"):l,s.fillRect(h(this.tick)-1,0,2,t))}};var oi=class{constructor(e){this.store=e,this.groupsEl=b("div",{class:"groups",role:"tablist"}),this.el=b("div",{class:"pad",role:"application","aria-label":"Surface de transformation"}),this.cv=b("canvas"),this.axX=b("div",{class:"ax x"}),this.axY=b("div",{class:"ax y"}),this.el.append(this.cv,this.axX,this.axY),this.info=b("div",{class:"info"}),this.clearBtn=b("button",{class:"pill",text:"Effacer les mouvements",onclick:()=>this.clearAuto()}),this.barEl=b("div",{class:"autobar"},this.info,this.clearBtn),this.touch=new Map,this.live=null,this.fx=null,this.gpu=!1,this.prev=new Map,this.el.addEventListener("pointerdown",t=>this.down(t)),this.el.addEventListener("pointermove",t=>this.move(t)),this.el.addEventListener("pointerup",t=>this.up(t)),this.el.addEventListener("pointercancel",t=>this.up(t)),new ResizeObserver(()=>this.draw()).observe(this.el)}groups(){let e=this.store,t=e.ui.part;if(t==="drum")return[0,1,2,3].map(i=>{let r=e.presetFor("d"+i),n=r&&r.macros||[];return{label:["Kick","Snare","Hat","Perc"][i],sub:r?r.name:"",target:"d"+i,sx:0,sy:1,xName:n[0]?n[0].name:"X",yName:n[1]?n[1].name:"Y"}});let a=e.presetFor(t);return(a&&a.groups||["Groupe 1","Groupe 2","Groupe 3"]).map((i,r)=>{let n=a.macros[r*2],l=a.macros[r*2+1];return{label:i,sub:`${n?n.name:"X"} \xB7 ${l?l.name:"Y"}`,target:t,sx:r*2,sy:r*2+1,xName:n?n.name:"X",yName:l?l.name:"Y"}})}value(e,t){let a=this.store;for(let[,s]of this.touch){let i=this.groups()[s];if(i.target===e.target&&(i.sx===t||i.sy===t)&&this.touchVals&&this.touchVals[e.target+":"+t]!==void 0)return this.touchVals[e.target+":"+t]}if(this.live&&a.ui.playing){if(e.target==="bass")return this.live[8+t];if(e.target==="lead")return this.live[15+t];let s=+e.target.slice(1);return this.live[s*2+t]}return a.macroValue(e.target,t)}hasAuto(e){let a=this.store.pattern.auto[e.target];return!!(a&&(a[e.sx]||a[e.sy]))}render(){let e=this.groups(),t=Math.min(this.store.ui.group,e.length-1);this.groupsEl.replaceChildren(...e.map((i,r)=>b("button",{class:"grp"+(this.hasAuto(i)?" auto":""),role:"tab","aria-selected":String(r===t),onclick:()=>{this.store.ui.group=r,this.render()}},b("span",{class:"num",text:String(r+1)}),b("b",{text:i.label}),b("small",{text:i.sub}),b("i",{class:"rec"}))));let a=e[t];this.axX.textContent=a.xName+" \u2192",this.axY.textContent=a.yName+" \u2192";let s=e.filter(i=>this.hasAuto(i)).length;this.info.textContent=this.store.ui.armed?"REC : bouge un point pendant la lecture pour enregistrer":s?`${s} groupe${s>1?"s":""} avec mouvements enregistr\xE9s`:"Glisse un point \xB7 plusieurs doigts possibles",this.clearBtn.disabled=!this.hasAuto(a),this.draw()}pos(e){let t=this.el.getBoundingClientRect();return{x:Math.min(1,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,1-(e.clientY-t.top)/t.height))}}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.pos(e),a=this.groups(),s=this.el.getBoundingClientRect(),i=-1,r=1/0;a.forEach((l,u)=>{if([...this.touch.values()].includes(u))return;let c=(this.value(l,l.sx)-t.x)*s.width,h=(this.value(l,l.sy)-t.y)*s.height,d=Math.hypot(c,h);d<r&&(r=d,i=u)});let n=r<44?i:Math.min(this.store.ui.group,a.length-1);[...this.touch.values()].includes(n)||(this.touch.set(e.pointerId,n),this.store.ui.group=n,this.send(a[n],t,"down"),this.render())}move(e){let t=this.touch.get(e.pointerId);t!==void 0&&(this.send(this.groups()[t],this.pos(e),"move"),this.draw())}up(e){let t=this.touch.get(e.pointerId);if(t===void 0)return;this.touch.delete(e.pointerId);let a=this.groups()[t];this.fx&&this.fx.press(a.target+":"+a.sx,0,0,"up"),this.store.send({type:"tweak",target:a.target,slot:a.sx,phase:"up"}),this.store.send({type:"tweak",target:a.target,slot:a.sy,phase:"up"}),this.render()}releaseAll(){let e=this.groups();for(let[,t]of this.touch){let a=e[t];a&&(this.store.send({type:"tweak",target:a.target,slot:a.sx,phase:"up"}),this.store.send({type:"tweak",target:a.target,slot:a.sy,phase:"up"}))}this.touch.clear()}send(e,t,a){if(this.fx&&this.fx.press(e.target+":"+e.sx,t.x,1-t.y,a==="down"?"down":"move"),this.fx){let s=e.target+":"+e.sx,i=this.prev.get(s);this.fx.stir(e.target,t.x,1-t.y,i?t.x-i.x:0,i?i.y-t.y:0,!0),this.prev.set(s,{x:t.x,y:t.y})}this.touchVals=this.touchVals||{},this.touchVals[e.target+":"+e.sx]=t.x,this.touchVals[e.target+":"+e.sy]=t.y,this.store.send({type:"tweak",target:e.target,slot:e.sx,value:t.x,phase:a}),this.store.send({type:"tweak",target:e.target,slot:e.sy,value:t.y,phase:a})}clearAuto(){let e=this.groups(),t=e[Math.min(this.store.ui.group,e.length-1)];this.store.clearAuto(t.target,t.sx),this.store.clearAuto(t.target,t.sy),this.render()}onPos(e){this.live=e.mac,(this.store.ui.playing||this.touch.size)&&this.draw()}draw(){let{w:e,h:t,d:a}=ds(this.cv),s=this.cv.getContext("2d");s.setTransform(a,0,0,a,0,0);let i=document.documentElement.dataset.theme==="dark",r=dt("--accent"),n=dt("--accent-ink");if(s.clearRect(0,0,e,t),this.fx&&this.fx.syncScene(),this.gpu&&(s.save(),ft(s,0,0,e,t,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),s.clip()),!this.gpu){if(i){let c=s.createLinearGradient(0,0,e,t);c.addColorStop(0,"#1b1d24"),c.addColorStop(1,"#121318"),s.fillStyle=c}else s.fillStyle=r;s.fillRect(0,0,e,t),s.strokeStyle=i?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",s.lineWidth=1;for(let c=1;c<4;c++)s.beginPath(),s.moveTo(c*e/4,0),s.lineTo(c*e/4,t),s.stroke(),s.beginPath(),s.moveTo(0,c*t/4),s.lineTo(e,c*t/4),s.stroke()}let l=this.groups(),u=Math.min(this.store.ui.group,l.length-1);l.forEach((c,h)=>{let d=this.value(c,c.sx)*e,m=(1-this.value(c,c.sy))*t,v=[...this.touch.values()].includes(h);if(this.fx&&!v){let p=c.target+":"+c.sx,y=this.prev.get(p),x=d/e,S=1-m/t;y&&this.store.ui.playing&&Math.hypot(x-y.x,S-y.y)>.003&&this.fx.stir(c.target,x,1-S,x-y.x,y.y-S,!1),this.prev.set(p,{x,y:S})}let g=v?120:70,f=s.createRadialGradient(d,m,0,d,m,g);i?(f.addColorStop(0,_e(r,h===u?.4:.18)),f.addColorStop(1,_e(r,0))):(f.addColorStop(0,`rgba(255,255,255,${h===u?.5:.25})`),f.addColorStop(1,"rgba(255,255,255,0)")),s.fillStyle=f,s.fillRect(d-g,m-g,2*g,2*g),s.beginPath(),s.arc(d,m,v?26:21,0,Math.PI*2),s.fillStyle=i?h===u?_e(r,.95):"rgba(255,255,255,0.12)":h===u?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.4)",s.fill(),s.lineWidth=2,s.strokeStyle=i?_e(r,.9):"rgba(255,255,255,0.95)",s.stroke(),s.fillStyle=i?h===u?n:"rgba(255,255,255,0.9)":n,s.font="800 14px -apple-system, system-ui, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText(String(h+1),d,m+1),this.hasAuto(c)&&(s.beginPath(),s.arc(d+17,m-17,4,0,Math.PI*2),s.fillStyle=dt("--rec"),s.fill())}),s.textBaseline="alphabetic",this.gpu&&s.restore()}};var Eh=96,Ah=[36,38,42,63],v0={0:[36,36,35],1:[37,38,40],2:[42,44,46],3:[64,63,62]};function g0(o){let e=[o&127];for(;o>>=7;)e.unshift(o&127|128);return e}function Ar(o){return Array.from(o,e=>e.charCodeAt(0)&127)}function b0(o){return[o>>>24&255,o>>>16&255,o>>>8&255,o&255]}function Er(o){return[o>>>8&255,o&255]}function ii(o,e){e.sort((s,i)=>s.t-i.t||s.order-i.order);let t=[0,255,3,...g0(o.length),...Ar(o)],a=0;for(let s of e)t.push(...g0(Math.max(0,s.t-a)),...s.data),a=s.t;return t.push(0,255,47,0),[...Ar("MTrk"),...b0(t.length),...t]}function y0(o,{loops:e=1}={}){let t=384*o.bars,a=o.song&&o.song.enabled&&o.song.sections.length?o.song.sections:[{p:o.current,reps:e,mute:{}}],s=[],i=[],r=[],n=0;for(let d of a){let m=o.patterns[d.p]||o.patterns[0];for(let v=0;v<(d.reps||1);v++){for(let g=0;g<4;g++)if(!(o.parts.drum.mute[g]||d.mute&&d.mute["d"+g]))for(let f of m.drum[g].hits){let p=v0[g]&&v0[g][f.x]||Ah[g],y=Math.max(1,Math.round(f.v*127));s.push({t:n+f.t,order:1,data:[153,p,y]}),s.push({t:n+f.t+12,order:0,data:[137,p,0]})}for(let[g,f,p]of[["bass",i,0],["lead",r,1]])if(!(o.parts[g].mute||d.mute&&d.mute[g]))for(let y of m[g].notes){let x=Math.max(0,Math.min(127,jn(y.deg,y.acc,o.key,o.scale,48))),S=Math.max(1,Math.round(y.v*127));f.push({t:n+y.t,order:1,data:[144|p,x,S]}),f.push({t:n+y.t+Math.max(1,Math.min(y.d,t)),order:0,data:[128|p,x,0]})}n+=t}}let l=Math.round(6e7/o.tempo),u=[{t:0,order:0,data:[255,81,3,l>>16&255,l>>8&255,l&255]},{t:0,order:0,data:[255,88,4,4,2,24,8]}],c=[ii(o.name||"MOTIF",u),ii("Batterie",s),ii("Basse",i),ii("M\xE9lodie",r)],h=[...Ar("MThd"),...b0(6),...Er(1),...Er(c.length),...Er(Eh)];return new Uint8Array([...h,...c.flat()])}var Lh=(()=>{let o=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let a=0;a<8;a++)t=t&1?3988292384^t>>>1:t>>>1;o[e]=t>>>0}return o})();function Rh(o){let e=4294967295;for(let t=0;t<o.length;t++)e=Lh[(e^o[t])&255]^e>>>8;return(e^4294967295)>>>0}function x0(o){let e=new TextEncoder,t=[],a=[],s=0,i=new Date,r=i.getHours()<<11|i.getMinutes()<<5|i.getSeconds()>>1,n=i.getFullYear()-1980<<9|i.getMonth()+1<<5|i.getDate();for(let c of o){let h=e.encode(c.name),d=Rh(c.data),m=new DataView(new ArrayBuffer(30));m.setUint32(0,67324752,!0),m.setUint16(4,20,!0),m.setUint16(6,2048,!0),m.setUint16(8,0,!0),m.setUint16(10,r,!0),m.setUint16(12,n,!0),m.setUint32(14,d,!0),m.setUint32(18,c.data.length,!0),m.setUint32(22,c.data.length,!0),m.setUint16(26,h.length,!0),m.setUint16(28,0,!0),t.push(new Uint8Array(m.buffer),h,c.data);let v=new DataView(new ArrayBuffer(46));v.setUint32(0,33639248,!0),v.setUint16(4,20,!0),v.setUint16(6,20,!0),v.setUint16(8,2048,!0),v.setUint16(10,0,!0),v.setUint16(12,r,!0),v.setUint16(14,n,!0),v.setUint32(16,d,!0),v.setUint32(20,c.data.length,!0),v.setUint32(24,c.data.length,!0),v.setUint16(28,h.length,!0),v.setUint32(42,s,!0),a.push(new Uint8Array(v.buffer),h),s+=30+h.length+c.data.length}let l=a.reduce((c,h)=>c+h.length,0),u=new DataView(new ArrayBuffer(22));return u.setUint32(0,101010256,!0),u.setUint16(8,o.length,!0),u.setUint16(10,o.length,!0),u.setUint32(12,l,!0),u.setUint32(16,s,!0),new Blob([...t,...a,new Uint8Array(u.buffer)],{type:"application/zip"})}var da=null,Ph=0,_a=new Map;function _h(o){return da||(da=new Worker("export-worker.js?v="+o),da.onmessage=e=>{let t=e.data,a=_a.get(t.id);a&&(t.type==="progress"?a.onProgress&&a.onProgress(t.value):t.type==="done"?(_a.delete(t.id),a.resolve(t)):t.type==="error"&&(_a.delete(t.id),a.reject(new Error(t.message))))},da.onerror=e=>{for(let[,t]of _a)t.reject(new Error(e.message||"Erreur du moteur d\u2019export"));_a.clear(),da=null},da)}function Da(o){return(o||"motif").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-zA-Z0-9 _-]+/g,"").trim().replace(/\s+/g,"-").slice(0,40)||"motif"}async function w0(o,e,{stems:t=!1,loops:a=2,sr:s=48e3,bits:i=24,onProgress:r,build:n}){let l=JSON.parse(JSON.stringify(o.project)),u=[];for(let p=0;p<4;p++)u.push({part:"drum",lane:p,preset:Ve(l.parts.drum.kit[p]),macros:l.parts.drum.macros[p]});u.push({part:"bass",preset:Ve(l.parts.bass.preset),macros:l.parts.bass.macros}),u.push({part:"lead",preset:Ve(l.parts.lead.preset),macros:l.parts.lead.macros});let c=Array.from(e.samples.values()).map(p=>({id:p.id,sr:p.sr,data:p.data,gain:p.gain,loopStart:p.loopStart,loopEnd:p.loopEnd})),h=++Ph,d=_h(n),m=await new Promise((p,y)=>{_a.set(h,{resolve:p,reject:y,onProgress:r}),d.postMessage({type:"render",id:h,project:l,presets:u,samples:c,sampleSets:e.sampleSets,stems:t,loops:a,sr:s,bits:i})}),v=Da(l.name),g={null:"mix",d0:"kick",d1:"snare",d2:"hat",d3:"perc",bass:"basse",lead:"melodie"};return m.files.map(p=>({name:`${v}-${g[p.group]}.wav`,data:new Uint8Array(p.wav),peak:p.peak,seconds:p.seconds,group:p.group}))}async function Lr(o,e,t){let a={id:na(),name:o,created:Date.now(),size:e.size,type:e.type,blob:e,...t};return await At.put("renders",a),a}function k0(o){let e=y0(o.project,{loops:1});return new File([e],`${Da(o.project.name)}.mid`,{type:"audio/midi"})}function S0(o){return new File([o.exportProjectJSON()],`${Da(o.project.name)}.motif.json`,{type:"application/json"})}function M0(o){return x0(o.map(e=>({name:e.name,data:e.data})))}async function mo(o){try{if(navigator.canShare&&navigator.canShare({files:[o]}))return await navigator.share({files:[o],title:o.name}),"shared"}catch(a){if(a&&a.name==="AbortError")return"cancelled"}let e=URL.createObjectURL(o),t=document.createElement("a");return t.href=e,t.download=o.name,document.body.append(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(e),6e4),"downloaded"}var E0={phonk:{bassR:11,leadR:9,roots:[0,0,-2,-3],contour:[7,8,7,4,7,8,9,7],bassTies:2,leadSteps:7},ukg:{bassR:10,leadR:8,roots:[0,-2,-4,-3],contour:[9,7,9,11],bassTies:1,leadSteps:7},afro:{bassR:8,leadR:7,roots:[0,0,-2,-3],contour:[7,9,11,9,7,6],bassTies:0,leadSteps:5},amapiano:{bassR:13,leadR:3,roots:[0,-3,-2,-4],contour:[9,11,9,7],bassTies:2,leadSteps:7,chords:!0},reggaeton:{bassR:11,leadR:7,roots:[0,-2,-3,-1],contour:[7,9,10,9,7,6],bassTies:0,leadSteps:7},jersey:{bassR:14,leadR:14,roots:[0,-2,-3,-2],contour:[11,9,7,9],bassTies:0,leadSteps:7,chords:!0},dnb:{bassR:2,leadR:1,roots:[0,-3,-2,-4],contour:[9,11,12,11],bassTies:1,leadSteps:7,chords:!0},rage:{bassR:1,leadR:15,roots:[0,-1,-3,-4],contour:[7,11,14,11,9,7],bassTies:0,leadSteps:7},hardtechno:{bassR:5,leadR:4,roots:[0,0,1,0],contour:[7,7,8,7],bassTies:3,leadSteps:7},triphop:{bassR:3,leadR:2,roots:[0,-2,-3,-4],contour:[9,7,6,4],bassTies:1,leadSteps:7,chords:!0}};function Dh(o,e,t,a){let s=Ys[o][e],i=384*t,r=[];if(!s||!s.len)return r;for(let n=0;n<i;n+=s.len)for(let[l,,u]of s.ev){if(n+l>=i)continue;let c=1;o===2&&(c=0),r.push({t:n+l,v:u?.95:.74,x:c,c:.5})}return o===2&&a&&r.length&&(r[r.length-1].x=2),o===1&&r.length>2&&(r[r.length-1].v=1),r}function T0(o,e,t,{ties:a=0,chord:s=null}={}){let i=hs[o],r=384*e,n=[];if(!i||!i.len)return n;let l=i.ev.length,u=new Set;for(let h=0;h<a;h++)u.add(Math.round((h+1)*l/(a+1)));let c=0;for(let h=0;h<r;h+=i.len)i.ev.forEach(([d,m,v],g)=>{if(h+d>=r)return;let f=u.has(g)&&g>0,p=m;u.has((g+1)%l)&&(p=((g+1)%l===0?i.len+i.ev[0][0]:i.ev[g+1][0])-d+3);let y=t(h+d,c++),x=v?.95:.8;if(s)for(let S of s)n.push({t:h+d,d:Math.min(p,r-h-d),deg:y+S,acc:0,v:x*.9,tie:!1});else n.push({t:h+d,d:Math.min(p,r-h-d),deg:y,acc:0,v:x,tie:f})});return n}function A0(o){let e=es.find(u=>u.style===o),t=ts(o),a=E0[o],s=Ps({kit:e.kit.slice(),bass:e.bass,lead:e.lead,tempo:t.bpm,key:t.key,scale:t.scale,name:"Exemple "+t.short});s.parts.drum.rhythm=e.rhythm.slice(),s.parts.bass.rhythm=a.bassR,s.parts.bass.ties=a.bassTies,s.parts.lead.rhythm=a.leadR,s.parts.lead.steps=a.leadSteps;let i=2,r=384,n=u=>a.roots[Math.floor(u/(r/2))%a.roots.length],l=u=>{let c=Rs(u?"B":"A");for(let h=0;h<4;h++){let d=u&&h===2?Math.min(16,e.rhythm[h]+1):e.rhythm[h];c.drum[h].hits=Dh(h,d,i,u)}if(u&&c.drum[1].hits.length)for(let h of[r*2-48,r*2-24])c.drum[1].hits.push({t:h,v:.7,x:0,c:.5});return c.bass.notes=T0(a.bassR,i,h=>n(h)-7,{ties:a.bassTies}),c.lead.notes=T0(a.leadR,i,(h,d)=>a.contour[(d+(u?2:0))%a.contour.length]+(a.chords?n(h):0),{chord:a.chords?[0,2,4]:null}),u||(c.lead.notes=c.lead.notes.filter(h=>h.t<r||!a.chords||h.t%96===0)),c};return s.patterns=[l(!1),l(!0)],s.song={enabled:!1,sections:[]},s}var L0=Object.keys(E0);var R0={jamal:{levels:[-.5,-4,-4,-7,5,3.5],macros:{},mix:{master:-2.5}},solto:{levels:[2.5,-2.5,-1.5,-7.5,1.5,3],macros:{lead:[null,.2],bass:[.25]},mix:{drumDrive:.17,master:-3.5}},cimetiere:{levels:[1,-3.5,-5.5,-5.5,6,-2.5],macros:{},mix:{master:-2}},rebond:{levels:[3,-4,.5,-2.5,-.5,1],macros:{},mix:{master:-2}},costumes:{levels:[4.5,-3,-6,-5.5,3,1.5],macros:{},mix:{master:-2.5}},escalier:{levels:[1,0,-7.5,-3.5,3,2],macros:{lead:[.3]},mix:{master:-3.5}},ete2011:{levels:[1,-.5,-2,-3.5,-1,3.5],macros:{},mix:{master:-1.5}},mondial:{levels:[-1.5,-4,-7,-5.5,3,-.5],macros:{d2:[null,.2],lead:[1],bass:[null,null,null,.15]},mix:{master:-1.5}},conscience:{levels:[-.5,-.5,-8.5,-4,2.5,2.5],macros:{lead:[.2]},mix:{master:-3}},piste:{levels:[2.5,-3.5,-5.5,-2.5,2.5,2.5],macros:{},mix:{master:-1}},contagion:{levels:[1.5,-3.5,-1,-2,2.5,.5],macros:{lead:[.85]},mix:{master:0}},logdrum:{levels:[2,-3.5,-4,1,3,.5],macros:{},mix:{master:-1}},baile150:{levels:[-3,-6.5,-8,-10,1,6],macros:{},mix:{drumDrive:.15,master:-1}},garage:{levels:[0,-3.5,-4.5,2,.5,1.5],macros:{},mix:{master:-.5}},liquide:{levels:[1,-1.5,-3.5,0,4.5,-.5],macros:{},mix:{master:-3}},rage:{levels:[1,-4.5,-5.5,-7,5,6],macros:{lead:[null,.25]},mix:{master:-2.5}},afrohouse:{levels:[0,-1,-8,-2.5,1.5,5],macros:{lead:[.75]},mix:{master:-1.5}},perreo:{levels:[-1,-4,-2.5,-4.5,4.5,2],macros:{d1:[null,.3]},mix:{master:-1}},hardtechno:{levels:[-.5,-4,-7,-5.5,3.5,3],macros:{},mix:{master:-2.5}},brume:{levels:[5,0,-.5,2,2.5,-2],macros:{},mix:{master:-1}}};var _s=384,vo=_s/16,fa=o=>Math.round(o*100)/100,rs=o=>Math.round(o*1e3)/1e3,go=o=>Math.max(0,Math.min(1,o));function Ch(o){let e=Math.imul(o|0,2654435761)>>>0||1;return()=>(e^=e<<13,e>>>=0,e^=e>>>17,e^=e<<5,e>>>=0,e/4294967296)}var qh=o=>{let e=7;for(let t of o)e=Math.imul(e,31)+t.charCodeAt(0)|0;return e};function P0(o){let e=/^(-?\d+)([b#]?)$/.exec(o);if(!e)throw new Error("touche "+o);return[+e[1],e[2]==="b"?-1:e[2]==="#"?1:0]}function Oh(o){let e=[],t=0,a=null;for(let s of o.trim().split(/\s+/)){if(s==="|")continue;if(s==="."){a&&a.len++,t++;continue}if(s==="_"){a=null,t++;continue}let i=s.startsWith("/"),r=s.endsWith(">"),n=s.replace(/^\//,"").replace(/>$/,"").split("+").map(P0);a={step:t,len:1,keys:n,accent:r,slide:i},e.push(a),t++}return e}var Rr=class{constructor(e,t,a){this.song=e,this.L=_s*e.bars,this.R=Ch(a),this.pat=Rs(t)}hold(e,t,a,s,i,r,n){let l=this.R()*6.28,u=this.R()*6.28,c=Math.min(a,this.L-1);for(let d=t;d<=c;d+=12){let m=d-t,v=n!==void 0&&m<30?n+(s-n)*(m/30):s,g=[d,rs(go(v+.035*Math.sin(m/70+l)+.012*(this.R()-.5))),rs(go(i+.025*Math.sin(m/115+u)+.008*(this.R()-.5)))];e.push(r?g.concat(r):g)}let h=e[e.length-1];return h&&h[0]<c-3&&e.push(r?[c,h[1],h[2],...r]:[c,h[1],h[2]]),e}lane(e,t,a,s,{x:i=1,y:r=.5,f:n=.9}={}){let l=Ys[e][t],u=a*_s,c=Math.min(s*_s,this.L);for(let h=u;h<c;h+=l.len)for(let[d,,m]of l.ev)h+d>=c||this.pat.drum[e].hits.push({t:h+d,v:fa((m?1:.78)*(.55+.45*n)),x:i,c:fa(r)});return this.pat.gest.drum.push({l:e,p:this.hold([],u,c-4,(i+.5)/3+(this.R()-.5)*.1,r)}),this}lanes(e,t,a,s=[]){return e.forEach((i,r)=>{i!=null&&this.lane(r,i,t,a,s[r]||{})}),this}taps(e,t,a,{x:s=1,y:i=.5}={}){let r=0,n=a.replace(/[\s|]/g,"").length;(n%16||t*_s+n*vo>this.L)&&(this.song.warnings=this.song.warnings||[]).push(`${this.song.id} ${this.pat.name} taps ${e}: ${n} pas`);for(let l of a.replace(/[\s|]/g,"")){let u=t*_s+r*vo;if(u>=this.L)break;if(l!=="."){let c=go(i+(this.R()-.5)*.08);this.pat.drum[e].hits.push({t:u,v:l==="X"?.98:l==="o"?.5:.8,x:s,c:fa(c)});let h=(s+.5)/3+(this.R()-.5)*.14,d=[[u,rs(h),rs(c)]];u+10<this.L&&d.push([u+10,rs(h+.012),rs(c-.012)]),u+18<this.L&&d.push([u+18,rs(h+.02),rs(c-.02)]),this.pat.gest.drum.push({l:e,p:d})}r++}return this}line(e,t,a,{y:s=.55,lift:i=.2,v:r=.84,gap:n=.12}={}){let l=Oh(a),u=t*_s,c=a.trim().split(/\s+/).filter(g=>g!=="|").length;(c%16||u+c*vo>this.L)&&(this.song.warnings=this.song.warnings||[]).push(`${this.song.id} ${this.pat.name} ${e}: ${c} doubles croches`);let h=l.flatMap(g=>g.keys.map(f=>f[0])),d=Math.min(...h),m=Math.max(1,Math.max(...h)-d),v=null;return l.forEach((g,f)=>{let p=u+g.step*vo;if(p>=this.L)return;let y=l[f+1],x=!!(y&&y.slide&&y.step===g.step+g.len&&g.keys.length===1&&y.keys.length===1),S=Math.max(6,Math.min(this.L-p,Math.round(g.len*vo*(x?1:1-n)))),E=fa((g.accent?.98:r)*(.93+.07*this.R()));g.keys.forEach(([L,D],q)=>{let A=go(s+i*((L-d)/m-.5)+(this.R()-.5)*.04);if(this.pat[e].notes.push({t:p,d:S,deg:L,acc:D,v:E,tie:g.slide&&g.keys.length===1,y:fa(A)}),g.keys.length===1){let U;g.slide&&v?U=this.glide(v.p,p,L,D,A):(v={p:[]},this.pat.gest[e].push(v)),this.hold(v.p,p,p+S-3,.5+(this.R()-.5)*.18,A,[L,D],U),x||(v=null)}else{let U={p:[]};this.hold(U.p,p+q*2,p+S-3,.5+(this.R()-.5)*.2,A,[L,D]),this.pat.gest[e].push(U),v=null}})}),this}glide(e,t,a,s,i){let r=e[e.length-1];if(!r)return;let n=r[3],l=a>n||a===n&&s>r[4],u=l?.94:.06;e.push([Math.max(r[0]+1,t-7),u,rs(i),n,r[4]]);let c=Math.abs(a-n);for(let h=1;h<c;h++)e.push([t-7+Math.round(6*h/c),.5,rs(i),n+(l?h:-h),0]);return l?.08:.92}chords(e,t,a,{arp:s="chord",v:i=.9,legato:r=.92}={}){let n=hs[t];for(let[l,u,c,h=.5]of a){let d=c.split("+").map(P0),m=Math.round(l*_s),v=Math.min(Math.round((l+u)*_s),this.L),g=s==="up"?d.slice().sort((p,y)=>p[0]+p[1]/3-y[0]-y[1]/3):s==="down"?d.slice().sort((p,y)=>y[0]+y[1]/3-p[0]-p[1]/3):d,f=0;for(let p=m;p<v;p+=n.len)for(let[y,x,S]of n.ev){let E=p+y;if(E>=v)continue;let L=fa((S?.98:.8)*(.7+.3*i)),D=d.length===1||s==="chord"?d:[g[f++%g.length]];for(let[q,A]of D)this.pat[e].notes.push({t:E,d:Math.max(6,Math.min(Math.round(x*r),v-E)),deg:q,acc:A,v:L,tie:!1,y:fa(h)})}d.forEach(([p,y],x)=>this.pat.gest[e].push({p:this.hold([],m+x*3,v-6,.5+(this.R()-.5)*.2,h,[p,y])}))}return this}move(e,t,a){let s=this.L/12,i=this.pat.auto[e]=this.pat.auto[e]||{},r=this.R()*6.28;return i[t]=Array.from({length:s},(n,l)=>rs(go(a(l/s)+.006*Math.sin(l/5+r)))),this}done(){let e=this.pat;for(let t of e.drum)t.hits.sort((a,s)=>a.t-s.t);for(let t of["bass","lead"])e[t].notes.sort((a,s)=>a.t-s.t||a.deg-s.deg);return e}},Bh=o=>({d0:o.includes("k"),d1:o.includes("s"),d2:o.includes("h"),d3:o.includes("p"),bass:o.includes("b"),lead:o.includes("l")});function Ih(o,e,t){let a=[],s=!1;for(let h of o.patterns)for(let d of h[e].notes)a.push(Ls(d.deg,d.acc,o.scale)),d.acc&&(s=!0);if(!a.length)return{steps:o.parts[e].steps,range:o.parts[e].range};let i=s?12:t||7,r=Math.min(36,Math.max(...a)),n=Math.max(-24,Math.min(...a)),l=h=>{let d=1;for(;d<24;){let m=Zt({lo:h,n:d},o.scale,i);if(m[m.length-1].semi>=r)break;d++}return d},u=e==="bass"?8:10,c=l(n);for(let h=0;h<2&&c<u&&n>-24;h++){let d=Zt({lo:n-3,n:1},o.scale,i)[0].semi;d<n&&d>=-24&&(n=d,c=l(n))}return{steps:i,range:{lo:n,n:Math.max(c,u)}}}function Fh(o,e=!1){let t=Ps({kit:o.kit,bass:o.bass,lead:o.lead,tempo:o.tempo,key:o.key,scale:o.scale,name:o.name});t.bars=o.bars,t.swing=o.swing||50,t.parts.drum.rhythm=o.dials.slice(0,4),t.parts.bass.rhythm=o.dials[4],t.parts.lead.rhythm=o.dials[5],o.arp&&(t.parts.bass.arp=o.arp[0],t.parts.lead.arp=o.arp[1]);let a=o.macros||{};for(let r=0;r<4;r++)a["d"+r]&&(t.parts.drum.macros[r]=a["d"+r].concat(Array(7).fill(null)).slice(0,7));for(let r of["bass","lead"])a[r]&&(t.parts[r].macros=a[r].concat(Array(7).fill(null)).slice(0,7));o.levels&&(t.parts.drum.level=o.levels.slice(0,4),t.parts.bass.level=o.levels[4],t.parts.lead.level=o.levels[5]),Object.assign(t.mix,o.mix||{});let s=!e&&R0[o.id];if(s){s.levels&&(t.parts.drum.level=s.levels.slice(0,4),t.parts.bass.level=s.levels[4],t.parts.lead.level=s.levels[5]);for(let[r,n]of Object.entries(s.macros||{})){let l=/^d\d$/.test(r)?+r[1]:-1,c=((l>=0?t.parts.drum.macros[l]:t.parts[r].macros)||Array(7).fill(null)).slice();n.forEach((h,d)=>{h!=null&&(c[d]=h)}),l>=0?t.parts.drum.macros[l]=c:t.parts[r].macros=c}Object.assign(t.mix,s.mix||{})}let i=qh(o.id);t.patterns=o.takes.map((r,n)=>{let l=new Rr(o,String.fromCharCode(65+n),i+n*977);return r(l),l.done()});for(let r of["bass","lead"])Object.assign(t.parts[r],Ih(t,r,o.steps&&o.steps[r]));return t.song={enabled:!0,sections:o.song.map(([r,n,l=""])=>({p:r,reps:n,mute:Bh(l)}))},t.current=0,t}var wt=(o,e)=>t=>o+(e-o)*(.5-.5*Math.cos(Math.PI*t)),We=(o,e,t=1)=>a=>o+e*Math.sin(2*Math.PI*t*a),Pr=[{id:"jamal",name:"Passinho na laje",trend:"Brega funk du Passinho do Jamal",ref:"Dans l\u2019esprit de \xAB Toma Botada \xBB (Eo Chapa et MC Rog\xEA, 2025-26), le son du Passinho do Jamal. Tempo et tonalit\xE9 : ceux du genre.",tempo:160,key:2,scale:"minor",bars:4,kit:["kick.perreo","snare.claplarge","hat.perreo","perc.timbal"],bass:"bass.subperreo",lead:"lead.perreo",dials:[7,1,2,3,7,0],arp:["order","order"],macros:{d0:[.62,.45],d3:[.55,.6],bass:[.7,.55,.7,.45,.1,.15],lead:[.35,.6,.3,.2,.35,.3]},mix:{pump:.35,space:.35,drumDrive:.22,drumSpace:.08},takes:[o=>o.lanes([7,1,2,3],0,4,[{y:.62},{y:.5},{x:0,y:.35},{y:.58}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]),o=>o.lanes([7,1,2,3],0,4,[{y:.62},{y:.5},{x:0,y:.38},{y:.58}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).line("lead",0,"7> . _ 6 . _ 4 . 5 . 4 . 2 . _ _ | 4 . _ 5 . _ 4 . 2 . 0 . 2 . _ _ | 6> . _ 5 . _ 4 . 2 . 4 . /5 . . . | 4 . _ 2 . _ 0 . . . _ _ _ _ _ _",{y:.55}).move("lead",4,wt(.2,.5)),o=>o.lanes([13,3,12,6],0,4,[{y:.7},{y:.55},{x:0,y:.4},{y:.7}]).taps(0,3,".... .... x.x. XXXX",{y:.8}).chords("bass",7,[[0,1,"-7",.6],[1,1,"-9",.6],[2,1,"-8",.62],[3,1,"-7",.65]]).line("lead",0,"7 _ 7 _ 9> . 7 . 6 . 4 . 6 . 7 . | 9 _ 9 _ 11> . 9 . 7 . 6 . 7 . _ _ | 7 _ 7 _ 9> . 7 . 6 . 4 . /5 . . . | 4 . . . 2 . . . 0 . . . _ _ _ _",{y:.7}).move("lead",4,wt(.5,.75)).move("bass",0,We(.7,.15,2))],song:[[0,1,"kl"],[0,1,"l"],[1,2],[2,1],[1,2],[0,1,"b"]]},{id:"solto",name:"Bem solto",trend:"Phonk br\xE9silien",ref:"Dans l\u2019esprit de \xAB Passo Bem Solto \xBB (ATLXS, 2024-25) : 130 BPM, la mineur (fa, sol, la mineur), d\u2019apr\xE8s les donn\xE9es publiques.",tempo:130,key:9,scale:"minor",bars:4,kit:["kick.montagem","snare.clapmontagem","hat.drift","perc.clochephonk"],bass:"bass.808montagem",lead:"lead.sino",dials:[7,1,2,6,0,0],macros:{d0:[.75,.5],d3:[.6,.5],bass:[.75,.55,.6,.6,.55,.5],lead:[.5,.6,.55,.45,.3,.3]},mix:{pump:.4,space:.3,drumDrive:.35,drumSpace:.06},takes:[o=>o.lanes([7,1,2,6],0,4,[{y:.66},{y:.5},{x:0,y:.4},{y:.6}]).line("bass",0,"-9> . . . . . -9 . . . /-10 . -9 . . . | -8> . . . . . -8 . . . /-7 . -8 . . . | -7> . . . . . -7 . . . -7 . /-5 . . . | -7> . . . . . /-14 . . . . . /-7 . . .",{y:.6}).move("bass",2,We(.55,.15,2)),o=>o.lanes([7,1,2,6],0,4,[{y:.66},{y:.5},{x:0,y:.42},{y:.6}]).line("bass",0,"-9> . . . . . -9 . . . /-10 . -9 . . . | -8> . . . . . -8 . . . /-7 . -8 . . . | -7> . . . . . -7 . . . -7 . /-5 . . . | -7> . . . . . /-14 . . . . . /-7 . . .",{y:.6}).line("lead",0,"9 _ 9 _ 7 _ 9 _ 10 _ 9 _ 7 _ 5 _ | 8 _ 8 _ 6 _ 8 _ 9 _ 8 _ 6 _ 4 _ | 7 _ 7 _ 7 _ 9 _ 11> _ 10 _ 9 _ 7 _ | 7 . . . _ _ 4 _ 5 _ 7 . . . _ _",{y:.6,gap:.3}).move("lead",4,wt(.25,.55)),o=>o.lanes([7,1,14,16],0,4,[{y:.75},{y:.55},{x:0,y:.5},{y:.72}]).line("bass",0,"-9> . . . -9 . . . /-10 . -9 . . . -9 . | -8> . . . -8 . . . /-7 . -8 . . . -8 . | -7> . . . -7 . . . -7 . /-5 . . . -7 . | -7> . . . /-14 . . . . . . . /-7 . . .",{y:.7}).line("lead",0,"14 _ 14 _ 12 _ 14 _ 15 _ 14 _ 12 _ 10 _ | 13 _ 13 _ 11 _ 13 _ 14 _ 13 _ 11 _ 9 _ | 12 _ 12 _ 12 _ 14 _ 16> _ 15 _ 14 _ 12 _ | 14 . . . _ _ 11 _ 12 _ 14 . . . _ _",{y:.72,gap:.3}).move("d0",0,wt(.6,.95)).move("lead",2,We(.6,.2,1))],song:[[0,1,"l"],[0,1],[1,2],[2,2],[1,1],[0,1,"kl"]]},{id:"cimetiere",name:"La danse du cimeti\xE8re",trend:"Halloween",ref:"Tendance Halloween de TikTok 2026 (d\xE9fil\xE9s de costumes, sons d\u2019\xE9pouvante comme \xAB Peli de terror \xBB) : un orgue hant\xE9 sur un funk lourd, en mi phrygien dominant.",tempo:128,key:4,scale:"phrygdom",bars:8,kit:["kick.sature","snare.claprage","hat.trap","perc.vibraslap"],bass:"bass.808rage",lead:"lead.orgue",dials:[7,2,11,0,0,1],arp:["order","chord"],macros:{d0:[.7,.55],d1:[.5,.75],bass:[.6,.3,.55,.6,.6,.5],lead:[.55,.6,.3,.6,.35,.75]},mix:{pump:.3,space:.6,drumDrive:.3,drumSpace:.2},takes:[o=>o.lane(2,11,0,8,{x:0,y:.3,f:.5}).taps(3,3,"........X.......",{y:.6}).taps(3,7,"....X.......X...",{y:.7}).chords("lead",1,[[0,2,"7+9+11",.4],[2,2,"8+10+12",.45],[4,2,"7+9+11",.5],[6,2,"6+8+10",.45]]).line("bass",0,"-7> . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -6 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -8 . . . . . . . . . . . . . . . | . . . . . . . . . . . . /-7 . . .",{y:.4}).move("lead",2,wt(.2,.7)),o=>o.lanes([7,2,11,null],0,8,[{y:.72},{y:.55},{x:0,y:.45}]).taps(3,1,"............X...",{y:.7}).taps(3,3,"............X...",{y:.7}).taps(3,5,"............X...",{y:.7}).taps(3,7,"....X.......X.X.",{y:.8}).chords("lead",8,[[0,2,"7+9+11",.55],[2,2,"8+10+12",.6],[4,2,"7+9+11",.6],[6,2,"6+8+10",.62]]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -7 . . . . . -7 . . . /-3 . /-7 . . . | -6> . . . . . -6 . . . /-4 . -6 . . . | -6 . . . . . -6 . . . /-2 . /-6 . . . | -7> . . . . . -7 . . . /-5 . -7 . . . | -7 . . . . . -7 . . . /-3 . /-7 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -8 . . . -8 . /-7 . . . . . /-14 . . .",{y:.65}).move("lead",2,We(.6,.3,2)).move("bass",0,wt(.6,.85)),o=>o.lane(2,11,0,8,{x:0,y:.35,f:.6}).lane(1,2,4,8,{y:.45}).taps(3,3,"............X...",{y:.65}).taps(3,7,"....X...X...X...",{y:.75}).line("lead",0,"14> . . . . . 13 . 12 . . . 11 . . . | 12 . . . . . 11 . 10 . . . 9 . . . | 10 . . . 11 . 12 . 13 . . . 14 . . . | 15 . . . . . . . 14 . . . . . . . | 14> . . . . . 13 . 12 . . . 11 . . . | 12 . . . . . 11 . 10 . . . 9 . 8 . | 9 . 8 . 7 . 8 . /9 . . . 8 . . . | 7 . . . . . . . . . . . _ _ _ _",{y:.55}).line("bass",0,"-7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -6 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . . . . . | . . . . . . . . . . . . . . . . | -8 . . . . . . . . . . . . . . . | -7 . . . . . . . . . . . _ _ _ _",{y:.45}).move("lead",5,wt(.6,.9))],song:[[0,1],[1,1],[2,1],[1,1],[0,1,"b"]]},{id:"rebond",name:"Rebond",trend:"Jersey club",ref:"Les danses qui rebondissent de TikTok 2026 sur du jersey club : 142 BPM, sol mineur (r\xE9glages du genre), le grincement de lit en signature.",tempo:142,key:7,scale:"minor",bars:4,kit:["kick.jersey","snare.clapjersey","hat.jersey","perc.couinement"],bass:"bass.bounce",lead:"lead.stabjersey",dials:[6,6,12,0,14,14],arp:["order","chord"],macros:{d0:[.65,.45],d1:[.4,.55],bass:[.6,.45,.4,.35,.15,.2],lead:[.45,.3,.6,.55,.3,.35]},mix:{pump:.45,space:.3,drumDrive:.2,drumSpace:.08},takes:[o=>o.lanes([6,6,12,null],0,4,[{y:.6},{y:.55},{x:0,y:.42}]).taps(3,0,"....X.......X... | ....X.......X... | ....X.......X... | ....X...X.X.X...",{y:.55}).chords("bass",14,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).chords("lead",14,[[0,1,"7+9+11",.55],[1,1,"5+7+9",.55],[2,1,"6+8+10",.58],[3,1,"7+9+11",.6]]).move("bass",0,We(.6,.15,4)),o=>o.lanes([6,6,12,null],0,4,[{y:.66},{y:.58},{x:0,y:.45}]).taps(3,0,"....X.......X... | ....X.......X... | ....X.......X... | ....X...X.X.XXXX",{y:.6}).taps(0,3,"............x.x.",{y:.7}).chords("bass",14,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-7",.6]]).line("lead",0,"7> _ 7 _ _ 9 _ 7 . _ 6 _ 4 . _ _ | 7> _ 7 _ _ 9 _ 10 . _ 9 _ 7 . _ _ | 7> _ 7 _ _ 9 _ 7 . _ 6 _ 4 . _ _ | 2 . 4 . 6 . 7> . . . _ _ _ _ _ _",{y:.6}).move("lead",1,We(.4,.3,2))],song:[[0,1,"l"],[0,2],[1,2],[0,1,"kb"],[1,2]]},{id:"costumes",name:"D\xE9fil\xE9 des costumes",trend:"\xC9lectro-pop (Halloween)",ref:"Dans l\u2019esprit de \xAB Ramalama (Bang Bang) \xBB (R\xF3is\xEDn Murphy, 2005), le son des d\xE9fil\xE9s de costumes d\u2019Halloween sur TikTok en 2026 : 107 BPM, do\u266F mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:107,key:1,scale:"minor",bars:4,kit:["kick.909","snare.clap808","hat.analogique","perc.cloche808"],bass:"bass.pulse",lead:"lead.sync",dials:[1,1,3,0,4,0],arp:["order","order"],macros:{d0:[.55,.5],d2:[.45,.6],bass:[.55,.45,.45,.5,.15,.2],lead:[.5,.45,.3,.35,.35,.3]},mix:{pump:.3,space:.4,drumDrive:.15,drumSpace:.12},takes:[o=>o.lanes([1,1,3,null],0,4,[{y:.6},{y:.5},{x:2,y:.45}]).taps(3,0,"..x...x...x.x... | ..x...x...x.x... | ..x...x...x.x... | ..x...x...x.xx.x",{y:.5}).chords("bass",4,[[0,2,"-7+0",.5],[2,1,"-9+-2",.52],[3,1,"-8+-1",.55]],{arp:"order"}).move("bass",2,We(.5,.25,1)),o=>o.lanes([1,1,3,null],0,4,[{y:.62},{y:.52},{x:2,y:.48}]).taps(3,0,"..x...x...x.x... | ..x...x...x.x... | ..x...x...x.x... | ..x...x...x.xx.x",{y:.55}).chords("bass",4,[[0,2,"-7+0",.55],[2,1,"-9+-2",.55],[3,1,"-8+-1",.58]],{arp:"order"}).line("lead",0,"7> . _ 7 . _ 9 . _ _ 7 . 6 . 4 . | 7> . _ 7 . _ 9 . _ _ 11 . 9 . 7 . | 5> . _ 5 . _ 7 . _ _ 5 . 4 . 2 . | 6> . _ 6 . _ 8 . _ _ /9 . . . . .",{y:.55}).move("lead",0,wt(.3,.75)).move("bass",2,We(.6,.2,2))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"kl"],[1,2]]},{id:"escalier",name:"Escalier pi\xE9g\xE9",trend:"Pop-rock des ann\xE9es 80",ref:"Dans l\u2019esprit de \xAB Beat It \xBB (Michael Jackson, 1982), la musique des faux escaliers pi\xE9g\xE9s de TikTok en septembre 2026 : 139 BPM, mi\u266D mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:139,key:3,scale:"minor",bars:4,kit:["kick.acoustique","snare.acoustique","hat.acoustique","perc.toms"],bass:"bass.electrique",lead:"lead.guitare",dials:[2,1,1,0,0,0],arp:["order","chord"],macros:{d1:[.55,.5],bass:[.6,.55,.6,.5,.1,.2],lead:[.7,.45,.5,.3,.2,.35]},mix:{pump:.1,space:.35,drumDrive:.25,drumSpace:.2},takes:[o=>o.lanes([2,1,1,null],0,4,[{y:.6},{y:.62},{x:0,y:.45}]).taps(3,3,"........xx..xx..",{x:1,y:.6}).taps(3,3,"..........xx..XX",{x:0,y:.65}).line("bass",0,"-7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -3 . -2 . /-1 . . .",{y:.6,gap:.15}).line("lead",0,"7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 7+11 . _ 7+11 . _ 9+13 . _ 7+11 . _ 6+10 . 7+11 . | 9+13 . . . 8+12 . . . 7+11> . . . _ _ _ _",{y:.6}),o=>o.lanes([2,1,1,null],0,4,[{y:.66},{y:.66},{x:1,y:.5}]).taps(3,3,"........xxxxXXXX",{x:0,y:.7}).line("bass",0,"-7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -7 . -7 . -5 . -7 . -8 . -9 . -8 . -7 . | -9 . -9 . -7 . -9 . -10 . -11 . -10 . -9 . | -8 . -8 . -6 . -8 . -3 . -2 . /-1 . . .",{y:.62,gap:.15}).line("lead",0,"11 . 11 . 10 . 9 . 11 . . . 9 . 7 . | 11 . 11 . 10 . 9 . 6 . . . 4 . . . | 9 . 9 . 8 . 7 . 9 . . . 7 . 5 . | 8 . . . 9 . . . /11 . . . . . _ _",{y:.65}).move("lead",4,We(.3,.15,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1],[1,2]]},{id:"ete2011",name:"\xC9t\xE9 2011",trend:"Pop des ann\xE9es 2010",ref:"Dans l\u2019esprit de \xAB The One That Got Away \xBB (Katy Perry, 2010), chanson de l\u2019\xE9t\xE9 2026 sur TikTok : 123 BPM, mi majeur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:123,key:4,scale:"major",bars:8,kit:["kick.club","snare.classique","hat.analogique","perc.claves"],bass:"bass.doux",lead:"lead.piano",dials:[1,1,1,0,6,6],arp:["order","chord"],macros:{bass:[.5,.55,.4,.55,.1,.2],lead:[.45,.55,.35,.2,.3,.5]},mix:{pump:.25,space:.5,drumDrive:.1,drumSpace:.18},takes:[o=>o.lanes([1,1,1,null],0,8,[{y:.45},{y:.48},{x:0,y:.38}]).taps(3,3,"............x.x.",{y:.4}).taps(3,7,"........x.x.x.x.",{y:.45}).chords("lead",6,[[0,2,"7+9+11",.5],[2,2,"4+6+8",.5],[4,2,"5+7+9",.52],[6,2,"3+5+7",.5]]).chords("bass",6,[[0,2,"-7",.5],[2,2,"-10",.5],[4,2,"-9",.5],[6,2,"-11",.5]]),o=>o.lanes([1,1,2,null],0,8,[{y:.55},{y:.55},{x:0,y:.45}]).taps(3,1,"............x.x.",{y:.45}).taps(3,3,"........x.x.x.x.",{y:.5}).taps(3,5,"............x.x.",{y:.45}).taps(3,7,"x.x.x.x.x.x.XXXX",{y:.55}).chords("bass",6,[[0,2,"-7",.55],[2,2,"-10",.55],[4,2,"-9",.55],[6,2,"-11",.55]]).line("lead",0,"9 . . . 9 . 8 . 7 . . . 8 . 9 . | 11 . . . 9 . . . 7 . . . _ _ _ _ | 8 . . . 8 . 7 . 6 . . . 7 . 8 . | 9 . . . 8 . . . 6 . . . _ _ _ _ | 9 . . . 9 . 10 . 11 . . . 12 . 11 . | 12 . . . 11 . . . 9 . . . _ _ 9 _ | 10 . . . 9 . 8 . 7 . . . 8 . 7 . | 7 . . . . . . . _ _ _ _ _ _ _ _",{y:.55}).move("lead",4,We(.35,.12,1))],song:[[0,1],[1,1],[0,1,"k"],[1,2]]},{id:"mondial",name:"Mondial 2026",trend:"Afrobeats \xD7 latino",ref:"Le son afrobeats et latino de la Coupe du monde 2026 (comme \xAB Dai Dai \xBB, Shakira et Burna Boy). Tempo et tonalit\xE9 : ceux du genre.",tempo:105,key:9,scale:"minor",bars:4,steps:{lead:5},kit:["kick.afroprofond","snare.clapafro","hat.shakerafro","perc.djembe"],bass:"bass.afrorond",lead:"lead.balafon",dials:[8,9,9,1,7,0],arp:["order","order"],macros:{d3:[.5,.6],bass:[.55,.5,.45,.55,.1,.2],lead:[.4,.6,.3,.2,.35,.35]},mix:{pump:.25,space:.4,drumDrive:.12,drumSpace:.15},takes:[o=>o.lanes([8,9,9,1],0,4,[{y:.6},{y:.5},{x:1,y:.45},{y:.55}]).chords("bass",7,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-12",.52],[3,1,"-8",.55]]),o=>o.lanes([8,9,16,3],0,4,[{y:.62},{y:.52},{x:1,y:.48},{y:.6}]).chords("bass",7,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-12",.55],[3,1,"-8",.58]]).line("lead",0,"7 _ 9 _ 10 . 9 _ 7 _ _ 4 . _ 7 _ | 6 _ 7 _ 9 . 7 _ 6 _ _ 4 . _ 2 _ | 7 _ 9 _ 10 . 11 _ 13 _ _ 11 . _ 9 _ | 10 . 9 . 7 . . . _ _ _ _ _ _ _ _",{y:.55,gap:.25}).move("lead",4,We(.35,.15,2)),o=>o.lanes([8,9,16,3],0,4,[{y:.64},{y:.54},{x:1,y:.5},{y:.62}]).chords("bass",7,[[0,1,"-7",.58],[1,1,"-9",.58],[2,1,"-12",.58],[3,1,"-8",.6]]).line("lead",0,"_ _ 9 . 9 . 7 _ 9 . 10 . 9 . 7 . | _ _ 9 . 9 . 7 _ 9 . 10 . 12> . . . | _ _ 11 . 11 . 9 _ 11 . 12 . 11 . 9 . | 10 . . . 9 . 7 . 6 . . . _ _ _ _",{y:.58,gap:.2}).move("lead",4,We(.4,.15,2))],song:[[0,1,"l"],[0,1,"l"],[1,2],[2,2],[0,1],[1,1],[2,2]]},{id:"conscience",name:"Conscience",trend:"Rock alternatif",ref:"Dans l\u2019esprit de \xAB Self Aware \xBB (Temper City, 2026) : 162 BPM, la mineur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:162,key:9,scale:"minor",bars:4,kit:["kick.acoustique","snare.acoustique","hat.ride","perc.toms"],bass:"bass.electrique",lead:"lead.guitare",dials:[2,1,1,0,4,4],arp:["order","up"],macros:{bass:[.6,.6,.65,.5,.1,.2],lead:[.6,.55,.45,.4,.25,.35]},mix:{pump:.08,space:.35,drumDrive:.3,drumSpace:.22},takes:[o=>o.lanes([2,1,1,null],0,4,[{y:.6},{y:.6},{x:0,y:.45}]).chords("lead",4,[[0,1,"7+9+11",.5],[1,1,"5+7+9",.5],[2,1,"9+11+13",.52],[3,1,"6+8+10",.55]],{arp:"up"}).chords("bass",4,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-12",.5],[3,1,"-8",.52]]),o=>o.lanes([12,2,7,null],0,4,[{y:.66},{y:.66},{x:2,y:.55}]).taps(3,3,"........xxxxXXXX",{x:0,y:.7}).chords("lead",2,[[0,1,"7+11+14",.62],[1,1,"5+9+12",.62],[2,1,"9+13+16",.64],[3,1,"6+10+13",.66]]).chords("bass",4,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-12",.55],[3,1,"-8",.58]]).move("lead",3,wt(.3,.6)),o=>o.lanes([12,2,7,null],0,4,[{y:.68},{y:.66},{x:2,y:.56}]).taps(3,3,"............xxXX",{x:0,y:.7}).chords("bass",4,[[0,1,"-7",.58],[1,1,"-9",.58],[2,1,"-12",.58],[3,1,"-8",.6]]).line("lead",0,"11> . . . 11 . 10 . 9 . . . 7 . . . | 9 . . . 9 . 10 . 11 . . . 9 . . . | 13> . . . 13 . 11 . 11 . . . 10 . 9 . | 10 . . . . . 8 . 10 . . . _ _ _ _",{y:.62}).move("lead",3,wt(.35,.55))],song:[[0,1,"b"],[0,1],[1,2],[2,2],[0,1],[1,1],[2,2]]},{id:"piste",name:"Piste de danse",trend:"\xC9lectroclash",ref:"Dans l\u2019esprit de \xAB DANCE\u2026 \xBB (Slayyyter, 2026) : 113 BPM, la majeur, d\u2019apr\xE8s les donn\xE9es publiques.",tempo:113,key:9,scale:"major",bars:4,kit:["kick.909","snare.clap808","hat.analogique","perc.cloche808"],bass:"bass.acide",lead:"lead.chip",dials:[1,1,3,0,5,0],arp:["up","order"],macros:{d2:[.4,.65],bass:[.45,.7,.55,.4,.3,.5],lead:[.55,.4,.3,.2,.35,.3]},mix:{pump:.35,space:.35,drumDrive:.25,drumSpace:.1},takes:[o=>o.lanes([1,1,3,null],0,4,[{y:.62},{y:.5},{x:2,y:.5}]).chords("bass",5,[[0,1,"-7+-5+-3",.5],[1,1,"-10+-8+-6",.5],[2,1,"-9+-7+-5",.52],[3,1,"-11+-9+-7",.55]],{arp:"up"}).move("bass",0,We(.45,.3,2)),o=>o.lanes([1,1,3,11],0,4,[{y:.65},{y:.55},{x:2,y:.55},{y:.5}]).chords("bass",5,[[0,1,"-7+-5+-3",.55],[1,1,"-10+-8+-6",.55],[2,1,"-9+-7+-5",.58],[3,1,"-11+-9+-7",.6]],{arp:"up"}).line("lead",0,"11 . 11 . 9 . 11 . 12 . . . 11 . 9 . | 8 . 8 . 6 . 8 . 9 . . . 8 . 6 . | 9 . 9 . 7 . 9 . 10 . . . 9 . 7 . | 10 . . . 11 . . . 12> . . . . . _ _",{y:.6}).move("bass",0,wt(.35,.85)).move("lead",1,We(.5,.3,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"contagion",name:"Contagion douce",trend:"Pop ballade",ref:"Dans l\u2019esprit de \xAB Patient Zero \xBB (Taylor Swift, 2026), les mariages film\xE9s sur TikTok en octobre 2026 : 92 BPM, do majeur, d\u2019apr\xE8s les donn\xE9es publiques (tonalit\xE9 de la version piano).",tempo:92,key:0,scale:"major",bars:8,kit:["kick.feutre","snare.claplarge","hat.fin","perc.claves"],bass:"bass.electrique",lead:"lead.piano",dials:[2,1,1,0,3,3],arp:["order","chord"],macros:{d1:[.45,.65],bass:[.45,.55,.35,.6,.1,.25],lead:[.55,.5,.35,.25,.35,.6]},mix:{pump:.15,space:.6,drumDrive:.05,drumSpace:.25},takes:[o=>o.lanes([2,1,1,null],0,8,[{y:.4},{y:.45},{x:0,y:.3}]).chords("lead",3,[[0,2,"5+7+9",.45],[2,2,"3+5+7",.45],[4,2,"7+9+11",.48],[6,2,"4+6+8",.5]]).chords("bass",3,[[0,2,"-9",.45],[2,2,"-11",.45],[4,2,"-7",.45],[6,2,"-10",.45]]),o=>o.lanes([2,1,2,null],0,8,[{y:.5},{y:.5},{x:0,y:.38}]).taps(3,3,"............x.x.",{y:.4}).taps(3,7,"........x.x.x.x.",{y:.45}).chords("bass",3,[[0,2,"-9",.5],[2,2,"-11",.5],[4,2,"-7",.5],[6,2,"-10",.5]]).line("lead",0,"9 . . . 9 . 11 . 12 . . . 11 . 9 . | 11 . . . . . 9 . 7 . . . _ _ _ _ | 7 . . . 7 . 9 . 10 . . . 9 . 7 . | 9 . . . . . 7 . 6 . . . _ _ _ _ | 9 . . . 9 . 11 . 12 . . . 14 . 12 . | 11 . . . . . 9 . 11 . . . 12 . . . | 11 . 10 . 9 . . . 7 . . . 9 . . . | 7 . . . . . . . _ _ _ _ _ _ _ _",{y:.5}).move("lead",5,wt(.55,.75))],song:[[0,1,"k"],[1,1],[0,1],[1,1]]},{id:"logdrum",name:"Log drum 2026",trend:"Amapiano",ref:"Les d\xE9fis de danse amapiano de TikTok 2026 : 112 BPM, r\xE9 dorien (r\xE9glages du genre), le log drum qui glisse.",tempo:112,key:2,scale:"dorian",bars:8,kit:["kick.pianofeutre","snare.rimpiano","hat.shakerpiano","perc.logdrum"],bass:"bass.logdrum",lead:"lead.keys",dials:[9,9,4,9,0,8],arp:["order","chord"],macros:{d3:[.6,.4],bass:[.65,.5,.55,.45,.5,.55],lead:[.55,.45,.4,.2,.35,.45]},mix:{pump:.3,space:.45,drumDrive:.08,drumSpace:.15},takes:[o=>o.lanes([9,9,4,null],0,8,[{y:.5},{y:.5},{x:0,y:.45}]).line("bass",0,"-7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ -8 . _ /-7 . . | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ /-8 . . . . .",{y:.55,gap:.08}).chords("lead",8,[[0,2,"7+9+11+13",.45],[2,2,"10+12+14+16",.48],[4,2,"7+9+11+13",.5],[6,2,"10+12+14+16",.52]]).move("bass",0,We(.6,.15,2)).move("lead",4,We(.35,.12,1)),o=>o.lanes([9,9,9,9],0,8,[{y:.55},{y:.52},{x:1,y:.5},{y:.6}]).line("bass",0,"-7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ -8 . _ /-7 . . | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -8 . . _ -8 _ /-7 . . _ -5 . _ -7 . _ | -7> . . _ -7 _ /-5 . . _ -7 . _ _ -9 _ | -10 . . _ -10 _ /-9 . . _ /-8 . . . . .",{y:.6,gap:.08}).chords("lead",13,[[0,2,"7+9+11+13",.5],[2,2,"10+12+14+16",.52],[4,2,"7+9+11+13",.55],[6,2,"10+12+14+16",.58]]).move("lead",4,wt(.3,.6))],song:[[0,1,"b"],[0,1],[1,1],[0,1,"k"],[1,1]]},{id:"baile150",name:"Baile 150",trend:"Funk carioca 150 BPM",ref:"Le funk carioca acc\xE9l\xE9r\xE9 \xE0 150 BPM des danses br\xE9siliennes de TikTok (r\xE9glages du genre) : agog\xF4, 808 qui glisse et un chant de synth\xE8se.",tempo:150,key:6,scale:"minor",bars:4,kit:["kick.boom","snare.clapserre","hat.tss","perc.agogo"],bass:"bass.808",lead:"lead.voix",dials:[7,1,1,16,0,0],macros:{d0:[.7,.45],d3:[.5,.55],bass:[.6,.5,.6,.6,.5,.45],lead:[.45,.6,.4,.35,.3,.3]},mix:{pump:.35,space:.3,drumDrive:.3,drumSpace:.06},takes:[o=>o.lanes([7,1,1,16],0,4,[{y:.66},{y:.52},{x:0,y:.42},{y:.58}]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -10> . . . . . -10 . . . /-8 . /-7 . . .",{y:.6}),o=>o.lanes([7,1,2,16],0,4,[{y:.7},{y:.55},{x:0,y:.45},{y:.62}]).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -8> . . . . . -8 . . . /-6 . -8 . . . | -10> . . . . . -10 . . . /-8 . /-7 . . .",{y:.62}).line("lead",0,"7 _ 7 _ 9 . 7 _ 6 . 4 _ _ _ 4 _ | 7 _ 7 _ 9 . 10 _ 9 . 7 _ _ _ _ _ | 7 _ 7 _ 9 . 7 _ 6 . 4 _ _ _ 2 _ | 4 . . . 6 . . . 7> . . . _ _ _ _",{y:.55}).move("lead",0,We(.45,.25,2)),o=>o.lanes([null,1,14,16],0,4,[null,{y:.6},{x:0,y:.5},{y:.7}]).taps(0,0,"X..x..x...x.x... | X..x..x...x.x... | X..x..x...x.x... | X..x..x.X.X.XXXX",{y:.75}).line("bass",0,"-7> . . . -7 . . . /-5 . -7 . . . -7 . | -9> . . . -9 . . . /-7 . -9 . . . -9 . | -8> . . . -8 . . . /-6 . -8 . . . -8 . | -10> . . . /-14 . . . . . . . /-7 . . .",{y:.7}).move("d0",0,wt(.6,.9))],song:[[0,1,"l"],[1,2],[2,1],[1,2],[0,1,"kl"]]},{id:"garage",name:"Garage 2026",trend:"UK garage",ref:"Le retour du UK garage sur TikTok en 2026 : 134 BPM, fa mineur, rythme chaloup\xE9 (r\xE9glages du genre).",tempo:134,swing:58,key:5,scale:"minor",bars:4,kit:["kick.garage","snare.garage","hat.garage","perc.toc"],bass:"bass.speedgarage",lead:"lead.rhodes",dials:[3,4,4,13,10,8],arp:["order","chord"],macros:{bass:[.5,.55,.5,.4,.55,.3],lead:[.45,.5,.4,.25,.35,.4]},mix:{pump:.4,space:.35,drumDrive:.12,drumSpace:.1},takes:[o=>o.lanes([3,4,4,13],0,4,[{y:.58},{y:.5},{x:0,y:.45},{y:.5}]).chords("bass",10,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-7",.55]]).chords("lead",8,[[0,1,"7+9+11+13",.5],[1,1,"5+7+9",.5],[2,1,"6+8+10",.52],[3,1,"7+9+11",.55]]).move("bass",0,We(.5,.25,4)),o=>o.lanes([3,4,2,13],0,4,[{y:.62},{y:.55},{x:0,y:.5},{y:.55}]).chords("bass",10,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-7",.6]]).line("lead",0,"9 . _ 9 . _ 11 . _ 9 _ 7 . _ _ _ | 9 . _ 9 . _ 11 . _ 12 _ 11 . _ _ _ | 9 . _ 9 . _ 11 . _ 9 _ 7 . _ 6 _ | 7 . . . 6 . . . 4 . . . _ _ _ _",{y:.55}).move("bass",2,wt(.35,.7))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"liquide",name:"Liquide",trend:"Drum & bass liquide",ref:"La drum & bass liquide des versions acc\xE9l\xE9r\xE9es de TikTok : 174 BPM, fa mineur (r\xE9glages du genre).",tempo:174,key:5,scale:"minor",bars:8,kit:["kick.break","snare.dnb","hat.ridednb","perc.tombreak"],bass:"bass.reese",lead:"lead.liquide",dials:[5,5,1,0,0,1],arp:["order","chord"],macros:{bass:[.45,.35,.4,.4,.5,.65],lead:[.55,.5,.45,.4,.4,.55]},mix:{pump:.3,space:.55,drumDrive:.15,drumSpace:.18},takes:[o=>o.lanes([5,5,1,null],0,8,[{y:.6},{y:.55},{x:0,y:.42}]).chords("lead",1,[[0,2,"7+9+11+14",.5],[2,2,"5+7+9+12",.5],[4,2,"9+11+13",.52],[6,2,"6+8+10+13",.55]]).line("bass",0,"-7> . . . . . . . . . . . -7 . . . | . . . . . . . . -5 . . . /-7 . . . | -9> . . . . . . . . . . . -9 . . . | . . . . . . . . -7 . . . /-9 . . . | -12> . . . . . . . . . . . -12 . . . | . . . . . . . . -10 . . . /-12 . . . | -8> . . . . . . . . . . . -8 . . . | . . . . . . . . -6 . . . /-7 . . .",{y:.5}).move("lead",2,We(.45,.2,1)),o=>o.lanes([5,5,2,null],0,8,[{y:.66},{y:.6},{x:0,y:.5}]).taps(3,3,"............xxXX",{x:1,y:.6}).taps(3,7,"........xx.xxxXX",{x:0,y:.65}).chords("lead",1,[[0,2,"7+9+11+14",.55],[2,2,"5+7+9+12",.55],[4,2,"9+11+13",.58],[6,2,"6+8+10+13",.6]]).line("bass",0,"-7> . . . . . -7 . . . -5 . /-7 . . . | -7 . . . . . -2 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . -7 . /-9 . . . | -9 . . . . . -4 . . . /-7 . -9 . . . | -12> . . . . . -12 . . . -10 . /-12 . . . | -12 . . . . . -7 . . . /-10 . -12 . . . | -8> . . . . . -8 . . . -6 . /-8 . . . | -8 . . . -6 . . . -5 . . . /-7 . . .",{y:.6}).move("bass",1,We(.4,.25,2)),o=>o.lanes([5,5,2,null],0,8,[{y:.66},{y:.6},{x:0,y:.5}]).taps(3,7,"........xx.xxxXX",{x:0,y:.65}).chords("lead",1,[[0,2,"0+2+4+7",.45],[2,2,"-2+0+2+5",.45],[4,2,"2+4+6",.47],[6,2,"-1+1+3+6",.5]],{v:.7}).line("lead",0,"11> . . . . . . . 9 . . . . . . . | 10 . . . 9 . . . 8 . . . 7 . . . | 7 . . . . . . . 9 . . . . . . . | 10 . . . . . . . 11 . . . 12 . . . | 13> . . . . . . . 11 . . . . . . . | 12 . . . 11 . . . 10 . . . 9 . . . | 8 . . . . . . . 10 . . . . . . . | 11 . . . 10 . . . 8 . . . _ _ _ _",{y:.6}).line("bass",0,"-7> . . . . . -7 . . . -5 . /-7 . . . | -7 . . . . . -2 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . -7 . /-9 . . . | -9 . . . . . -4 . . . /-7 . -9 . . . | -12> . . . . . -12 . . . -10 . /-12 . . . | -12 . . . . . -7 . . . /-10 . -12 . . . | -8> . . . . . -8 . . . -6 . /-8 . . . | -8 . . . -6 . . . -5 . . . /-7 . . .",{y:.6}).move("lead",2,We(.45,.2,1))],song:[[0,1,"k"],[0,1],[1,2],[2,2],[0,1,"b"]]},{id:"rage",name:"Rage",trend:"Rage \xB7 trap m\xE9lodique",ref:"Le rage et la trap m\xE9lodique de TikTok 2026 : 150 BPM, do\u266F mineur harmonique (r\xE9glages du genre), arp\xE8ges satur\xE9s.",tempo:150,key:1,scale:"harmonic",bars:4,kit:["kick.808rage","snare.claprage","hat.trap","perc.laser"],bass:"bass.808rage",lead:"lead.rage",dials:[4,7,6,0,0,15],arp:["order","up"],macros:{d2:[.5,.6],bass:[.65,.3,.55,.6,.6,.5],lead:[.6,.55,.3,.6,.3,.35]},mix:{pump:.3,space:.35,drumDrive:.3,drumSpace:.08},takes:[o=>o.lanes([4,7,6,null],0,4,[{y:.65},{y:.55},{x:0,y:.45}]).taps(3,1,"..............X.",{y:.6}).taps(3,3,"..........X...X.",{y:.65}).chords("lead",15,[[0,1,"7+9+11",.55],[1,1,"5+7+9",.55],[2,1,"3+5+7",.58],[3,1,"4+6+8",.6]],{arp:"up"}).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -11> . . . . . -11 . . . /-9 . -11 . . . | -10> . . . . . -10 . /-7 . . . /-3 . . .",{y:.6}),o=>o.lanes([4,7,6,null],0,4,[{y:.7},{y:.58},{x:0,y:.5}]).taps(3,0,"......X.......X. | ......X.......X. | ......X.......X. | ..X...X...X.XXXX",{y:.7}).chords("lead",15,[[0,1,"7+9+11",.62],[1,1,"5+7+9",.62],[2,1,"3+5+7",.65],[3,1,"4+6+8",.68]],{arp:"up"}).line("bass",0,"-7> . . . . . -7 . . . /-5 . -7 . . . | -9> . . . . . -9 . . . /-7 . -9 . . . | -11> . . . . . -11 . . . /-9 . -11 . . . | -10> . . . . . -10 . /-7 . . . /-3 . . .",{y:.65}).move("lead",1,wt(.5,.85)).move("lead",2,We(.3,.2,2))],song:[[0,1,"kb"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"afrohouse",name:"Afro house 2026",trend:"Afro house",ref:"L\u2019afro house des vid\xE9os de danse de TikTok 2026 : 122 BPM, la mineur (r\xE9glages du genre).",tempo:122,key:9,scale:"minor",bars:8,kit:["kick.afroprofond","snare.clapafro","hat.shakerafro","perc.djembe"],bass:"bass.afrorond",lead:"lead.marimba",dials:[1,1,9,7,7,0],arp:["order","order"],macros:{d3:[.55,.55],bass:[.5,.55,.45,.6,.15,.25],lead:[.45,.55,.35,.2,.4,.45]},mix:{pump:.4,space:.45,drumDrive:.1,drumSpace:.15},takes:[o=>o.lanes([1,1,9,7],0,8,[{y:.58},{y:.5},{x:1,y:.45},{y:.55}]).chords("bass",7,[[0,2,"-7",.5],[2,2,"-8",.5],[4,2,"-9",.52],[6,2,"-8",.55]]),o=>o.lanes([1,1,9,7],0,8,[{y:.62},{y:.52},{x:1,y:.48},{y:.6}]).chords("bass",7,[[0,2,"-7",.55],[2,2,"-8",.55],[4,2,"-9",.55],[6,2,"-8",.58]]).line("lead",0,"7 _ 9 _ 7 _ 11 _ 9 _ 7 _ 4 _ _ _ | 6 _ 7 _ 9 _ 7 _ 6 _ 4 _ 2 _ _ _ | 5 _ 7 _ 5 _ 9 _ 7 _ 5 _ 4 _ _ _ | 6 . . . 7 . . . 9 . . . 11 . . . | 7 _ 9 _ 7 _ 11 _ 9 _ 7 _ 4 _ _ _ | 6 _ 7 _ 9 _ 7 _ 6 _ 4 _ 2 _ _ _ | 5 _ 7 _ 5 _ 9 _ 7 _ 5 _ 4 _ 2 _ | 0 . . . . . . . _ _ _ _ _ _ _ _",{y:.55,gap:.3}).move("lead",4,We(.4,.15,1))],song:[[0,1,"l"],[0,1,"l"],[1,1],[0,1],[1,1]]},{id:"perreo",name:"Perreo 2026",trend:"Reggaeton \xB7 perreo",ref:"Le perreo des chor\xE9graphies de TikTok 2026 : 96 BPM, mi mineur, rythme dembow (r\xE9glages du genre).",tempo:96,key:4,scale:"minor",bars:4,kit:["kick.perreo","snare.dembow","hat.perreo","perc.timbal"],bass:"bass.subperreo",lead:"lead.perreo",dials:[16,3,1,0,11,0],arp:["order","order"],macros:{bass:[.65,.55,.6,.45,.1,.15],lead:[.4,.6,.35,.2,.35,.35]},mix:{pump:.3,space:.35,drumDrive:.15,drumSpace:.08},takes:[o=>o.lanes([16,3,1,null],0,4,[{y:.6},{y:.55},{x:0,y:.42}]).taps(3,3,"............x.xX",{y:.55}).chords("bass",11,[[0,1,"-7",.5],[1,1,"-9",.5],[2,1,"-8",.52],[3,1,"-10",.55]]),o=>o.lanes([16,3,1,null],0,4,[{y:.62},{y:.58},{x:0,y:.45}]).taps(3,1,"............x.xX",{y:.55}).taps(3,3,"........x.x.x.xX",{y:.6}).chords("bass",11,[[0,1,"-7",.55],[1,1,"-9",.55],[2,1,"-8",.58],[3,1,"-10",.6]]).line("lead",0,"11 . 9 _ 11 . 9 _ 7 . . . 9 . 7 _ | 6 . 7 . 9 . . . 7 . . . _ _ _ _ | 11 . 9 _ 11 . 9 _ 7 . . . 9 . 11 _ | 12 . . . 11 . . . 9 . . . _ _ _ _",{y:.55}).move("lead",4,We(.35,.15,1))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"hardtechno",name:"Hard techno TikTok",trend:"Hard techno",ref:"La hard techno des vid\xE9os de sport et de f\xEAte de TikTok 2026 : 152 BPM, la phrygien (r\xE9glages du genre), acide en doubles croches.",tempo:152,key:9,scale:"phrygian",bars:4,kit:["kick.rumble","snare.industriel","hat.industriel","perc.metalindus"],bass:"bass.acidedur",lead:"lead.hurleur",dials:[1,1,10,0,5,0],arp:["order","order"],macros:{d0:[.7,.6],bass:[.4,.75,.55,.4,.3,.5],lead:[.6,.5,.45,.5,.25,.4]},mix:{pump:.45,space:.3,drumDrive:.4,drumSpace:.1},takes:[o=>o.lanes([1,1,10,null],0,4,[{y:.7},{y:.55},{x:0,y:.5}]).taps(3,0,"..x...x...x...x. | ..x...x...x...x. | ..x...x...x...x. | ..x...x...x.x.xx",{x:0,y:.6}).chords("bass",5,[[0,4,"-7+-6",.5]],{arp:"order"}).move("bass",0,We(.5,.3,1)),o=>o.lanes([1,1,2,null],0,4,[{y:.75},{y:.6},{x:0,y:.55}]).taps(3,0,"..x...x...x...x. | ..x...x...x...x. | ..x...x...x...x. | ..x...x...x.x.xx",{x:0,y:.65}).chords("bass",5,[[0,2,"-7+-6",.55],[2,2,"-7+-4",.58]],{arp:"order"}).line("lead",0,"7> . . . _ _ _ _ 8> . . . _ _ _ _ | 7> . . . _ _ 7 . 8 . . . 10 . . . | 7> . . . _ _ _ _ 8> . . . _ _ _ _ | 11 . . . 10 . . . 8 . . . 7 . . .",{y:.6}).move("bass",0,wt(.3,.9)).move("lead",1,We(.5,.3,2))],song:[[0,1,"l"],[0,1],[1,2],[0,1,"k"],[1,2]]},{id:"brume",name:"Brume ralentie",trend:"Slowed + reverb",ref:"Les versions ralenties et noy\xE9es de r\xE9verb\xE9ration (\xAB slowed + reverb \xBB) de TikTok : 78 BPM, do dorien (r\xE9glages du genre).",tempo:78,key:0,scale:"dorian",bars:4,kit:["kick.poussiere","snare.poussiere","hat.vinyle","perc.boisfeutre"],bass:"bass.ronde",lead:"lead.brume",dials:[12,2,1,0,1,1],arp:["order","chord"],macros:{bass:[.45,.6,.35,.45,.4,.45],lead:[.6,.4,.5,.45,.55,.8]},mix:{pump:.15,space:.85,drumDrive:.08,drumSpace:.35},takes:[o=>o.lanes([12,2,1,null],0,4,[{y:.45},{y:.45},{x:0,y:.35}]).taps(3,1,"..........x.....",{y:.4}).taps(3,3,"......x.....x...",{y:.45}).chords("lead",1,[[0,1,"7+9+11+13",.45],[1,1,"10+12+14",.45],[2,1,"5+7+9+11",.48],[3,1,"6+8+10",.5]]).chords("bass",1,[[0,1,"-7",.45],[1,1,"-4",.45],[2,1,"-9",.45],[3,1,"-8",.45]]).move("lead",5,wt(.7,.9)),o=>o.lanes([12,2,1,null],0,4,[{y:.5},{y:.48},{x:0,y:.38}]).taps(3,1,"..........x.....",{y:.4}).taps(3,3,"......x.....x...",{y:.45}).chords("bass",1,[[0,1,"-7",.5],[1,1,"-4",.5],[2,1,"-9",.5],[3,1,"-8",.5]]).line("lead",0,"11 . . . . . 9 . 10 . . . 9 . 7 . | 9 . . . . . . . _ _ 7 . 9 . 10 . | 11 . . . . . 12 . 11 . . . 9 . 7 . | 7 . . . . . . . . . . . _ _ _ _",{y:.45}).move("lead",4,We(.5,.15,1))],song:[[0,1,"b"],[0,1],[1,1],[0,1],[1,1]]}];function _0(o,{raw:e=!1}={}){let t=Pr.find(a=>a.id===o);return t?Ks(Fh(t,e)):null}var ri=class{constructor(e,t){this.store=e,this.ctx=t,this.cur=null,this.audio=null}open(e,t,a={}){this.close(!0);let s=b("div",{class:"sheet-back",onclick:()=>this.close()}),i=b("button",{class:"close","aria-label":"Fermer",onclick:()=>this.close()},be("close")),r=b("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e},b("div",{class:"grab"}),b("header",null,b("h2",{text:e}),...a.actions||[],i),b("div",{class:"body"},t));document.body.append(s,r),requestAnimationFrame(()=>{s.classList.add("open"),r.classList.add("open")});let n=null;return r.querySelector(".grab").addEventListener("pointerdown",l=>{n=l.clientY}),r.addEventListener("pointerup",l=>{n!==null&&l.clientY-n>60&&this.close(),n=null}),this.cur={back:s,sheet:r,onClose:a.onClose},r}close(e){let t=this.cur;if(t){if(this.cur=null,t.onClose&&t.onClose(),e){t.back.remove(),t.sheet.remove();return}t.back.classList.remove("open"),t.sheet.classList.remove("open"),setTimeout(()=>{t.back.remove(),t.sheet.remove()},280)}}menu(){let e=this.store,t=(i,r,n,l)=>b("button",{class:"item",onclick:l},b("span",{class:"ic"},be(i)),b("span",{class:"tx"},b("b",{text:r}),n?b("small",{text:n}):null)),a=document.documentElement.dataset.theme==="dark",s=b("div",{class:"list"},t("folder","Projets",e.project.name,()=>this.library()),t("plus","Nouvelle id\xE9e","Vide ou \xE0 partir d\u2019une sc\xE8ne",()=>this.newIdea()),t("share","Exporter","WAV, pistes s\xE9par\xE9es, MIDI, projet",()=>this.exportSheet()),t("speaker","Lecteur","Rendus et fichiers import\xE9s",()=>this.player()),t("settings","R\xE9glages","M\xE9tronome, clavier piano, doigts, th\xE8me",()=>this.settings()),t("dice","Sons au hasard","Batterie, basse et m\xE9lodie \xB7 annulable",()=>{this.close(),this.ctx.rollDice("all")}),t("wifi","Hors ligne et mises \xE0 jour","",()=>this.offline()),t("info","Aide","Les gestes en une page",()=>this.help()),t("file","Sons et licences","Provenance des banques int\xE9gr\xE9es",()=>this.licences()));this.open("MOTIF",s)}settings(){let e=this.store,t=e.settings,a=(c,h,d,m)=>{let v=b("button",{class:"item switch",role:"switch","aria-checked":String(!!t[c])},b("span",{class:"tx"},b("b",{text:h}),d?b("small",{text:d,style:{whiteSpace:"normal"}}):null),b("i",{class:"knob"}));return v.addEventListener("click",()=>{e.setSetting(c,!e.settings[c]),v.setAttribute("aria-checked",String(!!e.settings[c])),m&&m()}),v},s=(c,h,d)=>b("div",{class:"seg"},...h.map(m=>{let v=b("button",{"aria-pressed":String(t[c]===m)},d(m));return v.addEventListener("click",()=>{e.setSetting(c,m);for(let g of v.parentNode.children)g.setAttribute("aria-pressed",String(g===v))}),v})),i=zh(),r=[["dark","Sombre"],["light","Clair"]];Mt.fluid&&r.push(["halloween","Halloween"]);let n=null;{let c=["Citrouille","Vaudou","Fant\xF4me","Calavera","Momie","Monstre","Squelette"],h=()=>Array.isArray(e.settings.hwCast)&&e.settings.hwCast.length===4?e.settings.hwCast.slice():[0,3,2,1],d=b("div",{class:"cards hwcast"},...["Kick","Snare","Hat","Perc"].map((m,v)=>{let g=b("button",{class:"pat","aria-label":m+" : changer de personnage"},b("small",{text:m}),b("b",{text:c[h()[v]]}));return g.addEventListener("click",()=>{let f=h();f[v]=(f[v]+1)%c.length,e.setSetting("hwCast",f),g.querySelector("b").textContent=c[f[v]]}),g}));n=b("div",{hidden:i!=="halloween"},b("p",{class:"note",text:"Les quatre de la batterie : touche une case pour changer de personnage."}),d,b("div",{class:"list",style:{marginTop:"8px"}},a("hwRelay","Ils se relaient","De temps en temps, l\u2019un d\u2019eux retourne dans sa tombe et un de ceux qu\u2019on ne voit pas sort de terre \xE0 sa place : pendant la lecture toutes les huit mesures, au repos toutes les 25 \xE0 45 secondes.")))}let l=b("div",{class:"seg"},...r.map(([c,h])=>{let d=b("button",{"aria-pressed":String(c===i)},h);return d.addEventListener("click",()=>{Nh(c);for(let m of d.parentNode.children)m.setAttribute("aria-pressed",String(m===d));n&&(n.hidden=c!=="halloween")}),d})),u=b("div",null,b("div",{class:"sect"},b("h3",{text:"M\xE9tronome"}),b("div",{class:"list"},a("metro","M\xE9tronome","Un clic \xE0 chaque temps, plus aigu sur le premier. Raccourci : touche le tempo en haut. Jamais pr\xE9sent dans les exports."),a("metroAlways","Aussi sans enregistrer","Sinon, il ne sonne que pendant l\u2019enregistrement (REC).")),b("p",{class:"note",text:"Volume du clic"}),s("metroLevel",[-12,-6,0,6],c=>(c>0?"+":c<0?"\u2212":"")+Math.abs(c)+" dB")),b("div",{class:"sect"},b("h3",{text:"Surface de jeu"}),b("div",{class:"list"},a("piano","Clavier de piano","Basse et m\xE9lodie : touches blanches et noires, toutes les notes jouables. Les notes de la gamme sont marqu\xE9es d\u2019un point."),a("ghosts","Montrer les doigts \xE0 la lecture","Pendant la lecture, un doigt fant\xF4me refait le geste enregistr\xE9 (chaque gliss\xE9, chaque hauteur), avec sa tra\xEEn\xE9e. Pour les prises plus anciennes, un rond marque chaque note."))),Mt.fluid?b("div",{class:"sect"},b("h3",{text:"Effets fluides"}),b("div",{class:"list"},a("fluid","Fluide sous les doigts","Encre anim\xE9e sur la surface de jeu et les tweaks : tes doigts, les notes rejou\xE9es, le kick. Coup\xE9 si l\u2019iPhone demande de r\xE9duire les animations. D\xE9sactive-le pour \xE9conomiser la batterie.")),b("p",{class:"note",text:"O\xF9"}),s("fluidZone",["keys","all"],c=>c==="keys"?"Dans les touches":"Partout"),b("p",{class:"note",text:"Style"}),s("fluidStyle",["douce","normale","spectaculaire"],c=>({douce:"Doux",normale:"Normal",spectaculaire:"Spectaculaire"})[c]),b("p",{class:"note",text:"Encre"}),s("fluidInk",["libre","maitrisee"],c=>c==="libre"?"Libre":"Ma\xEEtris\xE9e"),b("p",{class:"note",text:"Libre : chaque note, gliss\xE9 et coup d\xE9pose toute son encre, sans limite (\xE7a peut d\xE9border et br\xFBler au blanc). Ma\xEEtris\xE9e : un budget par touche, un geste lent laisse un filet, un geste vif un panache."}),b("p",{class:"note",text:"Couleurs"}),b("div",{class:"seg wrap"},...s("fluidColors",["partie","notes","arc","neon"],c=>({partie:"Partie",notes:"Notes",arc:"Arc-en-ciel",neon:"N\xE9on"})[c]).children),b("p",{class:"note",text:"\xAB Dans les touches \xBB : chaque touche devient un tube, l\u2019encre ne passe pas d\u2019une touche \xE0 l\u2019autre. \xAB Notes \xBB : chaque note a sa couleur (voisines sur le cycle des quintes = couleurs voisines). Spectaculaire : tra\xEEn\xE9es longues, halo, et le kick secoue toute l\u2019encre."}),b("div",{class:"list",style:{marginTop:"8px"}},a("glass","Verre liquide","Le pad et la surface Tweaks deviennent une plaque de verre pos\xE9e sur l\u2019\xE9cran, dans l\u2019esprit Liquid Glass : son bord courbe ce qu\u2019il y a dessous et s\xE9pare un peu les couleurs, ses reflets suivent la lumi\xE8re, elle fl\xE9chit sous le doigt. Choisis son style plus bas."),a("mixGlass","Mix sous verre","Chaque tranche du Mix devient un tube de verre rempli de son niveau, et le son de chaque instrument y monte en lumi\xE8re liquide : un jet \xE0 chaque attaque, un filet tant qu\u2019il sonne."),a("glassSpill","Lumi\xE8re autour du verre","La lumi\xE8re de l\u2019encre d\xE9borde du verre sur l\u2019\xE9cran. Les boutons proches r\xE9v\xE8lent leur relief et projettent une ombre \xE0 l\u2019oppos\xE9 ; les boutons sans fond ne font ressortir que leur texte. Plus ils sont loin de la lumi\xE8re, moins elle les touche.")),b("p",{class:"note",text:"Style du verre"}),b("div",{class:"seg wrap"},...s("glassLook",["optique","liquide","depoli","cristal","prisme"],c=>({optique:"Optique",liquide:"Liquide",depoli:"D\xE9poli",cristal:"Cristal",prisme:"Prisme"})[c]).children),b("p",{class:"note",text:"Optique : une plaque claire et incolore, presque invisible, qui ne courbe que ses bords ; l\u2019encre et les touches restent nettes. Liquide : le verre pr\xE9c\xE9dent, une dalle plus \xE9paisse qui s\u2019\xE9claire de l\u2019encre et sous le doigt. D\xE9poli : un verre laiteux qui floute l\u2019encre en lueurs et s\u2019\xE9claire de la lumi\xE8re autour. Cristal : un bord biseaut\xE9 \xE0 facettes qui d\xE9cale et irise ce qu\u2019il y a dessous et accroche la lumi\xE8re. Prisme : un verre \xE9pais et tr\xE8s clair qui flotte au-dessus de l\u2019\xE9cran ; son large bord arrondi replie l\u2019image pr\xE8s du contour et la d\xE9compose en couleurs."}),b("p",{class:"note",text:"Puissance de la lumi\xE8re autour du verre"}),s("glassLight",["douce","normale","forte","max"],c=>({douce:"Douce",normale:"Normale",forte:"Forte",max:"Max"})[c]),b("p",{class:"note",text:"Hauteur des boutons (plus ils sont hauts, plus leur ombre est longue)"}),s("ctrlHeight",[3,6,10,15],c=>({3:"Plats",6:"Bas",10:"Hauts",15:"Tr\xE8s hauts"})[c]),b("p",{class:"note",text:"Mode clair : le verre et l\u2019encre"}),s("lightLook",["aquarelle","vitrail","classique"],c=>({aquarelle:"Aquarelle",vitrail:"Vitrail",classique:"Classique"})[c]),b("p",{class:"note",text:"Aquarelle : sous le verre un papier ivoire, l\u2019encre est un pigment qui colore l\u2019eau et fonce l\xE0 o\xF9 les couleurs se m\xEAlent ; la lumi\xE8re autour teinte l\u2019\xE9cran. Vitrail : la couleur de la partie, \xE9clair\xE9e comme un vitrail, une encre lumineuse et une lumi\xE8re color\xE9e autour. Classique : l\u2019aspect d\u2019avant."}),b("div",{class:"list",style:{marginTop:"8px"}},a("glassTilt","Le verre suit l\u2019iPhone","La lumi\xE8re reste fixe dans la pi\xE8ce : quand tu inclines le t\xE9l\xE9phone, les reflets glissent sur le verre comme sur un vrai objet. Tenu normalement, la lumi\xE8re vient d\u2019en haut \xE0 gauche. (iOS demande l\u2019autorisation d\u2019utiliser les mouvements.)",()=>{this.store.settings.glassTilt&&this.ctx.enableTilt&&this.ctx.enableTilt()})),b("p",{class:"note",text:"HDR (\xE9cran HDR : reflets, c\u0153urs d\u2019encre et lumi\xE8re autour du verre plus lumineux que le blanc)"}),s("fluidHdr",["normal","intense","max"],c=>({normal:"Normal",intense:"Intense",max:"Max"})[c]),b("div",{class:"list",style:{marginTop:"8px"}},a("hdrLight","HDR aussi en mode clair","L\u2019\xE9cran autour garde sa couleur exacte. Si la surface sous le verre te para\xEEt plus terne en mode clair, coupe-le : l\u2019iPhone assombrit un peu un calque HDR \xE0 c\xF4t\xE9 des couleurs de la page.")),b("p",{class:"note",text:"Moteur graphique"}),s("fluidEngine",["auto","webgl"],c=>c==="auto"?"Auto (WebGPU)":"Compatibilit\xE9 (WebGL)"),b("p",{class:"note",text:this.ctx.fluidStatus?this.ctx.fluidStatus():""}),b("button",{class:"big accent",style:{marginTop:"6px"},onclick:()=>{this.close(),this.ctx.previewFluid&&this.ctx.previewFluid()}},be("sparkle"),"Voir l\u2019aper\xE7u")):null,b("div",{class:"sect"},b("h3",{text:"Apparence"}),l,Mt.fluid?b("p",{class:"note",text:"Halloween : chaque bouton devient un objet d\u2019Halloween en 3D, et une troupe de poup\xE9es vit sur le pad. Elles s\u2019\xE9crasent sous le doigt, crient ou chantent avec le son, suivent ton doigt des yeux et dansent parfois. La nuit tombe autour : brume, braises, et sur le pad un cimeti\xE8re sous la lune. Si tu ne touches plus rien, elles finissent par te regarder."}):null,n),b("p",{class:"note",text:"Ces r\xE9glages restent sur cet appareil ; ils ne changent pas tes projets."}));this.open("R\xE9glages",u)}async library(){let e=this.store,t=b("div",{class:"list"}),a=async()=>{let r=await e.listProjects();t.replaceChildren(...r.map(n=>{let l=(n.patterns||[]).reduce((h,d)=>h+pr(d),0),u=new Date(n.updated||n.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}),c=b("button",{class:"close","aria-label":"Options du projet",onclick:h=>{h.stopPropagation(),this.projectMenu(n,a)}},be("more"));return b("div",{class:"item",role:"button",tabindex:"0","aria-current":String(n.id===e.project.id),onclick:async()=>{await e.openProject(n.id),this.close();let h=e.project;for(let d of[...h.parts.drum.kit,h.parts.bass.preset,h.parts.lead.preset])await this.ctx.loadBanksFor(Ve(d));e.syncAll(),this.ctx.toast("Projet ouvert : "+n.name)}},b("span",{class:"tx"},b("b",{text:n.name}),b("small",{text:`${u} \xB7 ${n.tempo} BPM \xB7 ${l} \xE9v\xE9n.`})),c)}))};await a();let s=b("input",{type:"file",accept:".json,.motif,application/json",class:"hidden"});s.addEventListener("change",async()=>{let r=s.files[0];if(r){try{let n=await r.text();if(n.includes('"motif-3-backup"')){let l=await e.restoreBackup(n);this.ctx.toast(`${l} projet(s) restaur\xE9(s)`),await a()}else e.importProjectText(n),this.ctx.toast("Projet import\xE9"),this.close()}catch(n){this.ctx.toast("Import impossible : "+n.message)}s.value=""}});let i=b("div",null,b("div",{class:"grid2",style:{marginBottom:"12px"}},b("button",{class:"big accent",onclick:()=>this.newIdea()},be("plus"),"Nouvelle"),b("button",{class:"big",onclick:()=>s.click()},be("download"),"Importer")),t,s,b("div",{class:"sect"},b("h3",{text:"Sauvegarde hors de l\u2019app"}),b("p",{class:"note",text:"Les projets sont enregistr\xE9s automatiquement sur cet appareil. Pour les garder ailleurs (Fichiers, iCloud Drive\u2026), exporte une sauvegarde compl\xE8te."}),b("button",{class:"big",onclick:async()=>{let r=await e.backupAll(),n=new File([r],`MOTIF-sauvegarde-${new Date().toISOString().slice(0,10)}.json`,{type:"application/json"});await mo(n)!=="cancelled"&&this.ctx.toast("Sauvegarde pr\xEAte")}},be("share"),"Sauvegarder tous les projets")));this.open("Projets",i)}projectMenu(e,t){let a=this.store,s=b("input",{class:"field",value:e.name,"aria-label":"Nom du projet"}),i=b("div",null,b("div",{class:"sect"},b("h3",{text:"Nom"}),s),b("div",{class:"list"},b("button",{class:"item",onclick:async()=>{let r=s.value.trim()||e.name;e.id===a.project.id?a.rename(r):(e.name=r,await At.put("projects",e)),await a.save(),this.library()}},b("span",{class:"tx"},b("b",{text:"Renommer"}))),b("button",{class:"item",onclick:async()=>{e.id!==a.project.id&&await a.openProject(e.id),await a.duplicateProject(),this.ctx.toast("Copie cr\xE9\xE9e"),this.library()}},b("span",{class:"tx"},b("b",{text:"Dupliquer"}))),b("button",{class:"item",onclick:async()=>{let r=new File([JSON.stringify(e,null,1)],`${Da(e.name)}.motif.json`,{type:"application/json"});await mo(r)}},b("span",{class:"tx"},b("b",{text:"Exporter le fichier projet"}))),b("button",{class:"item",onclick:()=>this.confirm(`Supprimer \xAB ${e.name} \xBB ?`,"Le projet sera effac\xE9 de cet appareil. Exporte-le avant si tu veux le garder.","Supprimer",async()=>{await a.deleteProject(e.id),this.ctx.toast("Projet supprim\xE9"),this.library()})},b("span",{class:"tx"},b("b",{text:"Supprimer\u2026",style:{color:"var(--rec)"}})))));this.open(e.name,i)}confirm(e,t,a,s){let i=b("div",null,b("p",{class:"note",text:t}),b("div",{class:"grid2"},b("button",{class:"big",onclick:()=>this.close(),text:"Annuler"}),b("button",{class:"big accent",style:{background:"var(--rec)",color:"#fff"},onclick:async()=>{this.close(!0),await s()},text:a})));this.open(e,i)}newIdea(){let e=this.store,t=b("div",{class:"list"},b("button",{class:"item",onclick:async()=>{await e.newProject(null),await a()}},b("span",{class:"ic"},be("plus")),b("span",{class:"tx"},b("b",{text:"Id\xE9e vierge"}),b("small",{text:"Kit Studio, 2 mesures"}))),b("button",{class:"item",onclick:async()=>{let r=e.planRandomProject();for(let n of[...r.parts.drum.kit,r.parts.bass.preset,r.parts.lead.preset])await this.ctx.loadBanksFor(Ve(n));await e.save(),e.loadProject(r),await a(`${Ve(r.parts.bass.preset).name} \xB7 ${Ve(r.parts.lead.preset).name} \xB7 touche le d\xE9 pour relancer`)}},b("span",{class:"ic"},be("dice")),b("span",{class:"tx"},b("b",{text:"Id\xE9e au hasard"}),b("small",{text:"Sons et octaves tir\xE9s au sort, tempo et gamme d\u2019une sc\xE8ne"}))),...la.map(r=>b("button",{class:"item",onclick:async()=>{await e.newProject(r.id),await a()}},b("span",{class:"ic"},be("sparkle")),b("span",{class:"tx"},b("b",{text:r.name}),b("small",{text:`${r.bpm} BPM \xB7 ${Es[r.key]} ${As(r.scale).name.toLowerCase()} \xB7 sons de la sc\xE8ne`}))))),a=async r=>{this.close(),this.ctx.toast(r||"Nouvelle id\xE9e");let n=e.project;for(let l of[...n.parts.drum.kit,n.parts.bass.preset,n.parts.lead.preset])await this.ctx.loadBanksFor(Ve(l));e.syncAll()},s=b("div",{class:"list"},...L0.map(r=>{let n=ts(r);return b("button",{class:"item",onclick:async()=>{await e.save(),e.loadProject(A0(r)),await a("Exemple charg\xE9 : touche \u25B6")}},b("span",{class:"ic"},be("play")),b("span",{class:"tx"},b("b",{text:"Exemple "+n.short}),b("small",{text:`Boucle A + variation B \xB7 ${n.bpm} BPM`})))})),i=b("div",{class:"sect"},b("h3",{text:"Tendances 2026 : morceaux jou\xE9s"}),b("p",{class:"note",text:"Vingt morceaux jou\xE9s sur MOTIF : \xE0 la lecture, les doigts fant\xF4mes refont chaque geste, les tweaks bougent, les variations et l\u2019arrangement s\u2019encha\xEEnent. M\xE9lodies originales ; le tempo, la tonalit\xE9, le groove et les sons suivent chaque tendance."}),b("div",{class:"list"},...Pr.map(r=>b("button",{class:"item",onclick:async()=>{await e.save(),e.loadProject(_0(r.id)),await a(`${r.name} \xB7 ${r.trend} \xB7 touche \u25B6`)}},b("span",{class:"ic"},be("play")),b("span",{class:"tx"},b("b",{text:r.name}),b("small",{text:`${r.trend} \xB7 ${r.tempo} BPM \xB7 ${r.bars} mesures`,style:{whiteSpace:"normal"}}))))));this.open("Nouvelle id\xE9e",b("div",null,b("div",{class:"sect"},b("h3",{text:"Partir de z\xE9ro"}),t),i,b("div",{class:"sect"},b("h3",{text:"Exemples \xE0 \xE9couter et modifier"}),s)))}browser(){let e=this.store,t=e.ui,a=t.part==="drum"?ca[t.lane]:t.part,s="all",i=b("div",{class:"list"}),r=b("div",{class:"filters"}),n=()=>t.part==="drum"?e.project.parts.drum.kit[t.lane]:e.project.parts[t.part].preset,l=()=>{let d=ss(a).filter(v=>s==="all"||(s==="core"?!v.style:v.style===s));i.replaceChildren(...d.map(v=>{let g=v.style?ts(v.style):null;return b("button",{class:"item","aria-current":String(v.id===n()),onclick:async()=>{await _r(v.id),l()}},b("span",{class:"tx"},b("b",{text:v.name}),b("small",{text:v.desc||""})),g?b("span",{class:"tag",text:g.short}):null)}));let m=i.querySelector('[aria-current="true"]');m&&m.scrollIntoView({block:"center"})},u=[["all","Tous"],["core","Base"],...la.map(h=>[h.id,h.short])];r.replaceChildren(...u.map(([h,d])=>{let m=b("button",{"aria-pressed":String(s===h)},d);return m.addEventListener("click",()=>{s=h;for(let v of r.children)v.setAttribute("aria-pressed","false");m.setAttribute("aria-pressed","true"),l()}),m}));let c=b("div",null);if(t.part==="drum"){let h=b("div",{class:"seg",style:{marginBottom:"10px"}},...["Kick","Snare","Hat","Perc"].map((m,v)=>b("button",{"aria-pressed":String(t.lane===v),onclick:()=>{t.lane=v,this.browser(),e.changed("preset")}},m))),d=b("div",{class:"filters"},...es.map(m=>b("button",{onclick:async()=>{for(let v of m.kit)await this.ctx.loadBanksFor(Ve(v));e.applyKit(m.id,!1),this.ctx.toast("Kit "+m.name),l()}},m.name)));c.append(h,b("div",{class:"sect"},b("h3",{text:"Kits complets"}),d))}c.append(r,i),this.open(t.part==="drum"?"Sons de batterie":t.part==="bass"?"Basses":"M\xE9lodies",c),l()}keyPicker(){let e=this.store,t=b("div",{class:"cards"},...Es.map((s,i)=>b("button",{class:"pat",style:{width:"52px",height:"48px",fontSize:"16px"},"aria-pressed":String(e.project.key===i),onclick:()=>{e.set("key",i),this.keyPicker()}},s))),a=b("div",{class:"list"},...Wo.map(s=>b("button",{class:"item","aria-current":String(e.project.scale===s.id),onclick:()=>{e.set("scale",s.id),this.keyPicker()}},b("span",{class:"tx"},b("b",{text:s.name}),b("small",{text:s.iv.map(i=>Es[(i+e.project.key)%12]).join(" \xB7 ")})))));this.open("Tonalit\xE9",b("div",null,b("div",{class:"sect"},b("h3",{text:"Tonique"}),t),b("div",{class:"sect"},b("h3",{text:"Gamme (les notes enregistr\xE9es suivent)"}),a)))}clearMenu(){let e=this.store,t=e.ui,a=(r,n,l)=>b("button",{class:"item",onclick:()=>{l(),this.close(),this.ctx.toast("Effac\xE9",{label:"Annuler",fn:()=>e.undo()})}},b("span",{class:"tx"},b("b",{text:r}),b("small",{text:n}))),s=[];t.part==="drum"?(s.push(a(`Effacer ${["le kick","la snare","le hat","la perc"][t.lane]}`,"Seulement cette ligne de batterie",()=>e.clearPart("drum",t.lane))),s.push(a("Effacer toute la batterie","Les quatre lignes",()=>e.clearPart("drum",null)))):s.push(a(`Effacer la ${t.part==="bass"?"basse":"m\xE9lodie"}`,"Toutes les notes de la boucle",()=>e.clearPart(t.part))),s.push(a("Effacer les mouvements","Automation des tweaks de cette partie",()=>{if(t.part==="drum")for(let r=0;r<4;r++)e.clearAuto("d"+r);else e.clearAuto(t.part)})),e.redoStack.length&&s.unshift(b("button",{class:"item",onclick:()=>{e.redo(),this.close(),this.ctx.toast("R\xE9tabli")}},b("span",{class:"tx"},b("b",{text:"R\xE9tablir"}),b("small",{text:"Refaire ce que \u21B6 vient d\u2019annuler"}))));let i=b("div",null,b("p",{class:"note",text:"Pour n\u2019effacer qu\u2019une portion : glisse sur la frise (ou touche une mesure) puis touche la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."}),b("div",{class:"list"},...s));this.open("Effacer",i)}song(){this.store.ui.view="song",document.querySelector('.nav [data-v="song"]').click()}songView(){let e=this.store,t=b("div",{class:"scroll"}),a=[],s=()=>{let r=e.project;t.replaceChildren();let n=new Wt({label:"Tempo",min:()=>40,max:()=>220,get:()=>e.project.tempo,set:g=>e.set("tempo",g),format:g=>({v:String(g),s:"BPM"}),step:5,onTap:()=>h()}),l=new Wt({label:"Swing",min:()=>50,max:()=>75,get:()=>e.project.swing,set:g=>e.set("swing",g),format:g=>({v:g===50?"OFF":g+"%",s:"groove"}),step:8}),u=new Wt({label:"Tonalit\xE9",min:()=>0,max:()=>11,get:()=>e.project.key,set:g=>e.set("key",g),format:g=>({v:Es[g],s:As(e.project.scale).name}),step:14,onTap:()=>this.keyPicker()}),c=[],h=()=>{let g=performance.now();if(c=c.filter(f=>g-f<2500),c.push(g),c.length>=3){let f=(c[c.length-1]-c[0])/(c.length-1);e.set("tempo",Math.round(6e4/f)),n.render()}else this.ctx.toast("Tape encore pour r\xE9gler le tempo")};t.append(b("div",{class:"sect"},b("h3",{text:"Global"}),b("div",{class:"controls"},n.el,l.el,u.el))),requestAnimationFrame(()=>{n.render(),l.render(),u.render()}),t.append(b("div",{class:"sect"},b("h3",{text:"Longueur de la boucle"}),b("div",{class:"seg"},...Kn.map(g=>b("button",{"aria-pressed":String(r.bars===g),onclick:()=>{let f=r.bars;g!==f&&(e.snapshot(),e.set("bars",g),s(),this.ctx.toast(g>f?"Boucle allong\xE9e : le contenu est r\xE9p\xE9t\xE9":"Boucle raccourcie : la fin est coup\xE9e",{label:"Annuler",fn:()=>e.undo()}))}},`${g} mes.`)))));let d=b("div",{class:"cards"},...r.patterns.map((g,f)=>{let p=b("button",{class:"pat","aria-pressed":String(r.current===f),onclick:()=>{e.selectPattern(f),s()}},g.name,b("small",{text:`${pr(g)} \xE9v.`})),y=0;return p.addEventListener("pointerdown",()=>{y=setTimeout(()=>{r.patterns.length>1&&this.confirm(`Supprimer la variation ${g.name} ?`,"Ses notes et mouvements seront effac\xE9s.","Supprimer",()=>{e.deletePattern(f),s()})},650)}),p.addEventListener("pointerup",()=>clearTimeout(y)),p.addEventListener("pointercancel",()=>clearTimeout(y)),p}),r.patterns.length<8?b("button",{class:"pat add","aria-label":"Nouvelle variation (copie)",onclick:()=>{e.addPattern(r.current),s(),this.ctx.toast("Variation copi\xE9e : modifie-la librement")}},"+"):null);t.append(b("div",{class:"sect"},b("h3",{text:"Variations de la boucle"}),d,b("p",{class:"note",text:"\xAB + \xBB copie la variation en cours. Appui long pour supprimer."})));let m=b("div",{class:"secs"});r.song.sections.forEach((g,f)=>{let p=[["d0","K"],["d1","S"],["d2","H"],["d3","P"],["bass","B"],["lead","L"]].map(([y,x])=>b("button",{"aria-pressed":String(!!(g.mute&&g.mute[y])),"aria-label":"Couper "+y,onclick:()=>{let S=JSON.parse(JSON.stringify(r.song));S.sections[f].mute={...S.sections[f].mute,[y]:!(g.mute&&g.mute[y])},e.setSong(S),s()}},x));m.append(b("div",{class:"sec"+(e.ui.playing&&r.song.enabled&&e.ui.section===f?" playing":"")},b("button",{class:"p","aria-label":"Changer de variation",onclick:()=>{let y=JSON.parse(JSON.stringify(r.song));y.sections[f].p=(g.p+1)%r.patterns.length,e.setSong(y),s()}},r.patterns[g.p]?r.patterns[g.p].name:"?"),b("button",{class:"reps",onclick:()=>{let y=JSON.parse(JSON.stringify(r.song)),x=[1,2,4,8];y.sections[f].reps=x[(x.indexOf(g.reps)+1)%x.length],e.setSong(y),s()}},`\xD7${g.reps}`),b("div",{class:"mutes"},...p),b("button",{class:"x","aria-label":"Retirer la section",onclick:()=>{let y=JSON.parse(JSON.stringify(r.song));y.sections.splice(f,1),y.sections.length||(y.enabled=!1),e.setSong(y),s()}},be("close"))))});let v=b("button",{class:"big"+(r.song.enabled?" accent":""),onclick:()=>{r.song.sections.length?e.setSong({...r.song,enabled:!r.song.enabled}):e.autoArrange(),s()}},be("song"),r.song.enabled?"Arrangement activ\xE9 (lecture du morceau)":"Lire l\u2019arrangement");t.append(b("div",{class:"sect"},b("h3",{text:"Arrangement"}),v,b("div",{style:{height:"8px"}}),m,b("div",{class:"grid2",style:{marginTop:"8px"}},b("button",{class:"big",onclick:()=>{let g=JSON.parse(JSON.stringify(r.song));g.sections.push({p:r.current,reps:2,mute:{}}),g.enabled=!0,e.setSong(g),s()}},be("plus"),"Section"),b("button",{class:"big",onclick:()=>{e.autoArrange(),s(),this.ctx.toast("Arrangement cr\xE9\xE9 \xE0 partir de tes variations")}},be("sparkle"),"D\xE9velopper")),b("p",{class:"note",text:"Chaque section joue une variation un certain nombre de fois ; touche K S H P B L pour couper une partie dans la section."}))),t.append(b("div",{class:"sect"},b("h3",{text:"Exporter"}),b("button",{class:"big accent",onclick:()=>this.exportSheet()},be("share"),"WAV, pistes, MIDI, projet")))};s();let i=this.store.on("change",r=>{(r==="section"||r==="song")&&s()});return a.push(i),{el:t,cleanup:()=>a.forEach(r=>r())}}exportSheet(){let e=this.store,t=this.ctx.host(),a=e.project,s=a.song.enabled&&a.song.sections.length,i=b("div",{class:"seg"},...[1,2,4,8].map(f=>b("button",{"aria-pressed":String(f===2),onclick:p=>{for(let y of i.children)y.setAttribute("aria-pressed","false");p.currentTarget.setAttribute("aria-pressed","true"),r=f}},`\xD7${f}`))),r=2,n=b("div",{class:"prog"},b("i")),l=b("p",{class:"note",text:""}),u=b("div",{class:"list"}),c=f=>{n.firstChild.style.width=Math.round(f*100)+"%"},h=(f,p)=>{u.prepend(b("div",{class:"item"},b("span",{class:"tx"},b("b",{text:f.name}),b("small",{text:p})),b("button",{class:"pill on",onclick:async()=>{await mo(f)==="downloaded"&&this.ctx.toast("Fichier t\xE9l\xE9charg\xE9")}},be("share"),"Partager")))},d=f=>{for(let p of v.querySelectorAll("button"))p.disabled=f},m=async f=>{d(!0),c(0),l.textContent=f?"Rendu des pistes\u2026":"Rendu du mix\u2026";try{let p=await w0(e,t,{stems:f,loops:r,onProgress:c,build:this.ctx.build});if(c(1),f){let y=M0(p),x=new File([y],`${Da(a.name)}-pistes.zip`,{type:"application/zip"});h(x,`${p.length} fichiers WAV 24 bits \xB7 ${(y.size/1e6).toFixed(1)} Mo`);let S=p.find(E=>E.group===null);S&&await Lr(S.name,new Blob([S.data],{type:"audio/wav"}),{seconds:S.seconds,project:a.name})}else{let y=p[0],x=new Blob([y.data],{type:"audio/wav"}),S=new File([x],y.name,{type:"audio/wav"});h(S,`${y.seconds.toFixed(1)} s \xB7 WAV 24 bits 48 kHz \xB7 cr\xEAte ${(20*Math.log10(y.peak)).toFixed(1)} dBFS`),await Lr(y.name,x,{seconds:y.seconds,project:a.name})}l.textContent="Pr\xEAt. Touche \xAB Partager \xBB pour l\u2019enregistrer dans Fichiers ou l\u2019envoyer."}catch(p){l.textContent="\xC9chec du rendu : "+p.message}d(!1)},v=b("div",{class:"list"},b("button",{class:"item",onclick:()=>m(!1)},b("span",{class:"ic"},be("speaker")),b("span",{class:"tx"},b("b",{text:"Mix WAV"}),b("small",{text:"Le morceau tel que tu l\u2019entends, effets et mouvements compris"}))),b("button",{class:"item",onclick:()=>m(!0)},b("span",{class:"ic"},be("mix")),b("span",{class:"tx"},b("b",{text:"Pistes s\xE9par\xE9es (ZIP)"}),b("small",{text:"Kick, snare, hat, perc, basse, m\xE9lodie + mix"}))),b("button",{class:"item",onclick:()=>{h(k0(e),"Notes de batterie, basse et m\xE9lodie (MIDI type 1)")}},b("span",{class:"ic"},be("note")),b("span",{class:"tx"},b("b",{text:"MIDI"}),b("small",{text:"Pour continuer dans un logiciel de musique"}))),b("button",{class:"item",onclick:()=>{h(S0(e),"Projet MOTIF modifiable")}},b("span",{class:"ic"},be("file")),b("span",{class:"tx"},b("b",{text:"Fichier projet"}),b("small",{text:"\xC0 r\xE9importer dans MOTIF"})))),g=b("div",null,s?b("p",{class:"note",text:"L\u2019arrangement est activ\xE9 : le rendu suit les sections."}):b("div",{class:"sect"},b("h3",{text:"R\xE9p\xE9titions de la boucle"}),i),v,b("div",{style:{height:"10px"}}),n,l,u);this.open("Exporter",g)}async player(){let e=b("div",{class:"list"}),t=this.audio||(this.audio=b("audio",{preload:"none"})),a=null,s=async()=>{let n=(await At.all("renders")).map(c=>({...c,kind:"Rendu"})),l=(await At.all("files")).map(c=>({...c,kind:"Import\xE9"})),u=[...n,...l].sort((c,h)=>h.created-c.created);u.length?e.replaceChildren(...u.map(c=>{let h=b("button",{class:"pill","aria-label":"Lire"},be("play"));h.addEventListener("click",()=>{if(a&&t.dataset.id===c.id&&!t.paused){t.pause();return}a&&URL.revokeObjectURL(a),a=URL.createObjectURL(c.blob),t.src=a,t.dataset.id=c.id,t.play().catch(()=>{})});let d=b("button",{class:"pill","aria-label":"Partager",onclick:()=>mo(new File([c.blob],c.name,{type:c.type||"audio/wav"}))},be("share")),m=b("button",{class:"pill","aria-label":"Supprimer",onclick:()=>this.confirm("Supprimer ce fichier ?",c.name,"Supprimer",async()=>{await At.del(c.kind==="Rendu"?"renders":"files",c.id),this.player()})},be("trash"));return b("div",{class:"item"},b("span",{class:"tx"},b("b",{text:c.name}),b("small",{text:`${c.kind} \xB7 ${new Date(c.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})} \xB7 ${((c.size||0)/1e6).toFixed(1)} Mo`})),h,d,m)})):e.replaceChildren(b("p",{class:"note",text:"Aucun rendu pour l\u2019instant. Exporte un mix WAV ou importe un fichier audio."}))},i=b("input",{type:"file",accept:"audio/*",class:"hidden",multiple:!0});i.addEventListener("change",async()=>{for(let n of i.files)await At.put("files",{id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),name:n.name,created:Date.now(),size:n.size,type:n.type,blob:n});i.value="",s()});let r=b("div",{class:"sect"},t);t.controls=!0,t.style.width="100%",await s(),this.open("Lecteur",b("div",null,r,b("button",{class:"big",style:{marginBottom:"10px"},onclick:()=>i.click()},be("download"),"Importer un fichier audio"),e,i,b("p",{class:"note",text:"Les rendus et fichiers import\xE9s restent sur cet appareil ; rien n\u2019est envoy\xE9 sur internet."})),{onClose:()=>{t.pause()}})}async offline(){let e=await Un(),t=navigator.storage&&navigator.storage.persisted?await navigator.storage.persisted().catch(()=>!1):!1,a=b("p",{class:"note",text:window.__motifOffline||"V\xE9rification\u2026"}),s=b("div",{class:"prog"},b("i")),i=b("div",null,b("div",{class:"sect"},b("h3",{text:"Hors ligne"}),a,s,b("button",{class:"big accent",style:{marginTop:"10px"},onclick:async()=>{a.textContent="T\xE9l\xE9chargement de tous les sons\u2026";try{await(window.__motifCacheAll?window.__motifCacheAll(r=>{s.firstChild.style.width=Math.round(r*100)+"%"}):Promise.reject(new Error("service worker indisponible"))),a.textContent="Tout est disponible hors ligne."}catch(r){a.textContent="\xC9chec : "+r.message}}},be("download"),"Tout rendre disponible hors ligne")),b("div",{class:"sect"},b("h3",{text:"Version"}),b("p",{class:"note",text:`MOTIF 3 \xB7 version ${this.ctx.build}. Les mises \xE0 jour ne touchent jamais \xE0 tes projets (ils sont dans la base locale, s\xE9par\xE9e du cache).`}),b("button",{class:"big",onclick:()=>window.__motifCheckUpdate&&window.__motifCheckUpdate(!0)},"Rechercher une mise \xE0 jour"),b("p",{class:"note"},"Version pr\xE9c\xE9dente pour comparer : ",b("a",{href:"https://motif-studio-iphone.taxulas.chatgpt.site/figure/",target:"_blank",rel:"noopener",style:{color:"var(--accent)"}},"MOTIF Studio 2.4")," (acc\xE8s priv\xE9).")),b("div",{class:"sect"},b("h3",{text:"Stockage"}),b("p",{class:"note",text:`${t?"Stockage persistant accord\xE9.":"Stockage standard (le navigateur peut le lib\xE9rer si l\u2019appareil manque de place ; exporte une sauvegarde de temps en temps)."}${e?` Utilis\xE9 : ${(e.usage/1e6).toFixed(1)} Mo.`:""}`})),b("div",{class:"sect"},b("h3",{text:"Son"}),b("button",{class:"big",onclick:async()=>{this.close();let r=await this.ctx.host().rebuild();this.ctx.toast(r?"Son r\xE9initialis\xE9":"Touchez l\u2019\xE9cran pour r\xE9activer le son")}},be("speaker"),"R\xE9initialiser le son")));this.open("Hors ligne et mises \xE0 jour",i)}help(){let e=(t,a)=>b("div",{class:"item"},b("span",{class:"tx"},b("b",{text:t}),b("small",{text:a,style:{whiteSpace:"normal"}})));this.open("Les gestes",b("div",{class:"list"},e("Jouer","Touche le pad : le son joue avec le rythme choisi, sans lancer la boucle. Gauche-droite = notes, haut-bas = expression."),e("Enregistrer","REC arme. Le premier toucher lance la boucle et la prise. Rejouer par-dessus remplace ce qui passe sous ton doigt."),e("Rythme et liaisons","Glisse verticalement sur Rythme. Touche-le (ou glisse vers la droite) pour r\xE9gler les liaisons : les notes se lient et glissent."),e("Plage de notes","Glisse la fen\xEAtre pour la d\xE9placer (m\xEAme nombre de notes). Tire une poign\xE9e pour agrandir ou r\xE9duire. Touche ailleurs pour sauter."),e("Plusieurs doigts","Avec plusieurs doigts, l\u2019arp\xE8ge suit l\u2019ordre de pose ; \xAB Doigts \xBB change d\u2019ordre ou joue un accord."),e("Effacer une portion","Glisse sur la frise (ou touche une mesure), puis la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."),e("Changer de son","Glisse le nom ou utilise les fl\xE8ches : la boucle continue avec le nouveau son."),e("Tweaks","Chaque son a ses propres axes. Plusieurs points se bougent \xE0 la fois. Avec REC et lecture, les mouvements s\u2019enregistrent."),e("Batterie","Une colonne par son. Dans une colonne, gauche/milieu/droite = trois variantes, haut-bas = caract\xE8re."),e("Annuler","La fl\xE8che \u21B6 annule la derni\xE8re prise ou modification.")))}async licences(){let e=b("div",null,b("p",{class:"note",text:"Tous les sons synth\xE9tiques sont des cr\xE9ations originales de MOTIF. Les enregistrements int\xE9gr\xE9s sont dans le domaine public (CC0) ; ils ont \xE9t\xE9 convertis en mono, d\xE9coup\xE9s, normalis\xE9s et encod\xE9s en FLAC."}),b("div",{class:"list"},b("div",{class:"item"},b("span",{class:"tx"},b("b",{text:"Virtuosity Drums"}),b("small",{text:"Versilian Studios & Karoryfer Lecolds \xB7 CC0 1.0 \xB7 github.com/sfzinstruments/virtuosity_drums"}))),b("div",{class:"item"},b("span",{class:"tx"},b("b",{text:"Versilian Community Sample Library"}),b("small",{text:"Versilian Studios \xB7 CC0 1.0 \xB7 github.com/sgossner/VCSL"}))),Mt.fluid?b("div",{class:"item"},b("span",{class:"tx"},b("b",{text:"WebGL Fluid Simulation (effets fluides)"}),b("small",{text:"\xA9 2017 Pavel Dobryakov \xB7 licence MIT \xB7 github.com/PavelDoGreat/WebGL-Fluid-Simulation",style:{whiteSpace:"normal"}}))):null),b("p",{class:"note",text:"Le d\xE9tail fichier par fichier (chemin d\u2019origine, commit, transformations, empreinte SHA-256) est dans banks/*/bank.json et SOUNDS.md."}));this.open("Sons et licences",e)}};function zh(){let o=document.documentElement;return o.hasAttribute("data-halloween")?"halloween":o.dataset.theme==="light"?"light":"dark"}function Nh(o){document.documentElement.toggleAttribute("data-halloween",o==="halloween"),document.documentElement.dataset.theme=o==="light"?"light":"dark";try{localStorage.setItem(Mt.storage+".theme",o)}catch{}let e=document.getElementById("themeColor");e&&e.setAttribute("content",o==="light"?"#f3efe6":o==="halloween"?"#0a0612":"#0b0c10"),window.dispatchEvent(new Event("resize")),window.dispatchEvent(new Event("motif:theme"))}function D0({toast:o,store:e,build:t}){if(window.__motifOffline="Le mode hors ligne s\u2019active apr\xE8s le premier chargement complet.",!("serviceWorker"in navigator)){window.__motifOffline="Ce navigateur ne permet pas le mode hors ligne.";return}let a=location.hostname==="localhost"||location.hostname==="127.0.0.1";if(location.protocol!=="https:"&&!a){window.__motifOffline="Hors ligne indisponible sans HTTPS.";return}if(a&&!/[?&]sw\b/.test(location.search)){navigator.serviceWorker.getRegistrations().then(h=>h.forEach(d=>d.unregister())),window.__motifOffline="Service worker d\xE9sactiv\xE9 en d\xE9veloppement local.";return}let s=null,i=new URL("sw.js",location.href).href,r=()=>!!navigator.serviceWorker.controller&&navigator.serviceWorker.controller.scriptURL===i,n=h=>{o("Mise \xE0 jour disponible",{label:"Installer",fn:async()=>{await e.save(),h.postMessage({type:"skipWaiting"})}})};navigator.serviceWorker.register("sw.js",{scope:"./"}).then(h=>{s=h,h.waiting&&r()&&n(h.waiting),h.addEventListener("updatefound",()=>{let d=h.installing;d&&d.addEventListener("statechange",()=>{d.state==="installed"&&r()&&n(d)})}),c()}).catch(h=>{window.__motifOffline="Service worker non install\xE9 : "+h.message});let l=r(),u=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!l||u||(u=!0,e.save().finally(()=>location.reload()))}),navigator.serviceWorker.addEventListener("message",h=>{let d=h.data||{};d.type==="status"&&(window.__motifOffline=d.text),d.type==="cacheProgress"&&window.__motifCacheProgress&&window.__motifCacheProgress(d.value)});async function c(){let h=await navigator.serviceWorker.ready;h.active&&h.active.postMessage({type:"status"})}window.__motifCheckUpdate=async h=>{if(s)try{await s.update(),h&&!s.waiting&&!s.installing&&o("MOTIF est \xE0 jour")}catch{h&&o("Pas de connexion")}},window.__motifCacheAll=h=>new Promise((d,m)=>{navigator.serviceWorker.ready.then(v=>{let g=new MessageChannel;g.port1.onmessage=f=>{let p=f.data;p.type==="progress"?h&&h(p.value):p.type==="done"?(window.__motifOffline="Tout est disponible hors ligne.",d()):p.type==="error"&&m(new Error(p.message))},v.active.postMessage({type:"cacheAll"},[g.port2])},m)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&window.__motifCheckUpdate(!1)})}var C0=Math.PI/180,q0={beta:50,gamma:0},ni=22,li=6;function bo(o,e){let t=o*C0,a=e*C0;return[-Math.sin(a)*Math.cos(t),Math.sin(t),Math.cos(a)*Math.cos(t)]}function Cr(o){let e=[o[0]-.62,o[1],Math.max(.18,o[2])],t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}var Dr=bo(q0.beta,q0.gamma),Ca=Cr(Dr);function O0(o){return[(o[0]-Dr[0])*1.4,(o[1]-Dr[1])*1.4]}var kt=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Hh=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  float offset = 1.33333333;
  vL = vUv - texelSize * offset; vR = vUv + texelSize * offset;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Uh=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
  sum += texture2D(uTexture, vL) * 0.35294117;
  sum += texture2D(uTexture, vR) * 0.35294117;
  gl_FragColor = sum;
}`,jh=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture;
void main () { gl_FragColor = texture2D(uTexture, vUv); }`,Gh=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`,ci=`
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
#endif`,Vh=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; uniform sampler2D uTexture; uniform vec3 curve; uniform float threshold;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
  float br = max(c.r, max(c.g, c.b));
  float rq = clamp(br - curve.x, 0.0, curve.y);
  rq = curve.z * rq * rq;
  c *= max(rq, br - threshold) / max(br, 0.0001);
  gl_FragColor = vec4(c, 0.0);
}`,Wh=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25;
}`,Yh=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture; uniform float intensity;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25 * intensity;
}`,Kh=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uTexture;
void main () {
  vec4 c = texture2D(uTexture, vUv);
  float br = max(c.r, max(c.g, c.b));
  c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
  gl_FragColor = c;
}`,Xh=`
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
}`,$h=`
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
}`,Qh=`
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
}`,Jh=`
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
}`,Zh=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,eu=`
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
}`,tu=`
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
}`,su=`
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
}`,B0={optique:{id:0,bevel:20,thick:26,p:2.2,disp:.012,depth:1},liquide:{id:1,bevel:30,thick:34,p:2.6,disp:.03,depth:1},depoli:{id:2,bevel:26,thick:26,p:2,disp:.008,depth:1},cristal:{id:3,bevel:20,thick:12,p:1,disp:.045,depth:3},prisme:{id:4,bevel:34,thick:28,p:3.2,disp:.015,depth:.9}},hi=o=>B0[o&&o.glassLook||"optique"]||B0.optique,qr={SIM_RESOLUTION:128,DYE_RESOLUTION:512,DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,PRESSURE:.8,PRESSURE_ITERATIONS:16,CURL:24,SPLAT_RADIUS:.22,SPLAT_FORCE:5200,SHADING:!0,BLOOM:!0,BLOOM_ITERATIONS:7,BLOOM_RESOLUTION:192,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:128,SUNRAYS_WEIGHT:.8,IDLE_MS:4500},qa=class{constructor(e={}){this.cfg={...qr,...e},this.canvas=document.createElement("canvas"),this.canvas.className="fluid",this.canvas.setAttribute("aria-hidden","true"),this.ok=!1,this.raf=0,this.last=0,this.lastInput=0,this.queue=[],this.gain=1,this.boost=0,this.slow=0,this.ema=16,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.ok=!1,this.stop()}),this.canvas.addEventListener("webglcontextrestored",()=>this.init()),this.init()}init(){let e={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!0,powerPreference:"low-power"},t=this.canvas.getContext("webgl2",e),a=!!t;if(t||(t=this.canvas.getContext("webgl",e)),!t)return;this.gl=t;try{"drawingBufferColorSpace"in t&&(t.drawingBufferColorSpace="display-p3")}catch{}this.p3=t.drawingBufferColorSpace==="display-p3";let s,i;if(a)t.getExtension("EXT_color_buffer_float"),i=!0;else if(s=t.getExtension("OES_texture_half_float"),i=t.getExtension("OES_texture_half_float_linear"),!s)return;let r=a?t.HALF_FLOAT:s.HALF_FLOAT_OES,n=(d,m)=>this.supports(d,m,r)?{internal:d,format:m}:null,l,u,c;if(a?(l=n(t.RGBA16F,t.RGBA),u=n(t.RG16F,t.RG)||l,c=n(t.R16F,t.RED)||u):l=u=c=n(t.RGBA,t.RGBA),!l)return;this.ext={type:r,rgba:l,rg:u,r:c,linear:!!i},i||(this.cfg.SHADING=!1,this.cfg.BLOOM=!1,this.cfg.SUNRAYS=!1);let h=(d,m,v)=>this.program(d,m,v);this.p={blur:h(Hh,Uh),copy:h(kt,jh),clear:h(kt,Gh),bloomPre:h(kt,Vh),bloomBlur:h(kt,Wh),bloomFinal:h(kt,Yh),sunMask:h(kt,Kh),sun:h(kt,Xh),splat:h(kt,$h),advect:h(kt,Qh,i?[]:["MANUAL_FILTERING"]),div:h(kt,Jh),curl:h(kt,Zh),vort:h(kt,eu),pressure:h(kt,tu),grad:h(kt,su)},this.setDisplay(),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),this.dither=this.noiseTexture(64),this.keys=null,this.scene=null,this.keyTex=null,this.resetLight(),this.maskAll=this.maskTexture(null,1,1),this.maskSim=this.maskDye=this.maskAll,this.dye=null,this.velocity=null,this.ok=!0}supports(e,t,a){let s=this.gl,i=s.createTexture();s.bindTexture(s.TEXTURE_2D,i),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),s.texImage2D(s.TEXTURE_2D,0,e,4,4,0,t,a,null);let r=s.createFramebuffer();s.bindFramebuffer(s.FRAMEBUFFER,r),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,i,0);let n=s.checkFramebufferStatus(s.FRAMEBUFFER)===s.FRAMEBUFFER_COMPLETE;return s.deleteFramebuffer(r),s.deleteTexture(i),n}shader(e,t,a){let s=this.gl,i=s.createShader(e);if(s.shaderSource(i,(a||[]).map(r=>`#define ${r}
`).join("")+t),s.compileShader(i),!s.getShaderParameter(i,s.COMPILE_STATUS)){let r=s.getShaderInfoLog(i);console.warn(r),(this.shaderErrors||(this.shaderErrors=[])).push(r)}return i}program(e,t,a){let s=this.gl,i=s.createProgram();s.attachShader(i,this.shader(s.VERTEX_SHADER,e)),s.attachShader(i,this.shader(s.FRAGMENT_SHADER,t,a)),s.bindAttribLocation(i,0,"aPosition"),s.linkProgram(i),s.getProgramParameter(i,s.LINK_STATUS)||console.warn(s.getProgramInfoLog(i));let r={},n=s.getProgramParameter(i,s.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let u=s.getActiveUniform(i,l).name;r[u]=s.getUniformLocation(i,u)}return{p:i,u:r,bind:()=>s.useProgram(i)}}setDisplay(){let e=[];this.cfg.SHADING&&e.push("SHADING"),this.cfg.BLOOM&&e.push("BLOOM"),this.cfg.SUNRAYS&&e.push("SUNRAYS"),this.p.display=this.program(kt,ci,e),this.p.light=this.program(kt,ci,[...e,"LIGHT_PASS"]),this.p.sources=this.program(kt,ci,[...e,"SOURCES_PASS"]),this.p.haze=this.program(kt,ci,[...e,"HAZE_PASS"])}noiseTexture(e){let t=this.gl,a=new Uint8Array(e*e*3),s=1234567;for(let r=0;r<a.length;r++)s=s*1103515245+12345&2147483647,a[r]=s>>23;let i=t.createTexture();return t.bindTexture(t.TEXTURE_2D,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGB,e,e,0,t.RGB,t.UNSIGNED_BYTE,a),{width:e,height:e,attach:r=>(t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,i),r)}}maskTexture(e,t,a){let s=this.gl,i=fo(this.maskCanvas||(this.maskCanvas=document.createElement("canvas")),e,t,a),r=s.createTexture();return s.bindTexture(s.TEXTURE_2D,r),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!0),s.texImage2D(s.TEXTURE_2D,0,s.RGBA,s.RGBA,s.UNSIGNED_BYTE,i),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),{tex:r,attach:n=>(s.activeTexture(s.TEXTURE0+n),s.bindTexture(s.TEXTURE_2D,r),n)}}setKeys(e,t){!this.ok||t===this.keySig||(this.keySig=t,this.keys=e,this.rebuildMasks(),this.clear())}rebuildMasks(){let e=this.gl;for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&e.deleteTexture(t.tex);if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}this.maskSim=this.maskTexture(this.keys,this.velocity.width,this.velocity.height),this.maskDye=this.maskTexture(this.keys,this.dye.width,this.dye.height)}setScene(e){if(!this.ok)return;let t=this.scene&&this.scene.sig===e.sig;this.scene=e,this.margin=e.glass?this.marginTest||4e3:0,t||(this.keyTexSig=null,this.requestRender())}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,a=this.hostH,s=e.sig+"|"+t+"x"+a;if(this.keyTexSig===s)return;let i=this.gl;this.keyTex&&i.deleteTexture(this.keyTex.tex);let r=ti(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,a),n=i.createTexture();i.bindTexture(i.TEXTURE_2D,n),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!0),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,r),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),this.keyTex={tex:n,attach:l=>(i.activeTexture(i.TEXTURE0+l),i.bindTexture(i.TEXTURE_2D,n),l)},this.keyTexSig=s}resetLight(){this.lightBase=Ca.slice(),this.light=Ca.slice(),this.lightTo=Ca.slice(),this.slide=[0,0],this.slideTo=[0,0],this.up=null,this.touchSlots=[],this.gelOn=!0,this.meters=new Float32Array(8),this.margin=0,this.off=[0,0],this.dpr=1,this.hostW=0,this.hostH=0,this.srcFbo=null,this.lightFbo=null,this.hazeFbo=null,this.keyLitTex=null}setLight(e,t){let a=this.lightBase;this.lightTo=[a[0]*.75+(e-.5)*.45,a[1]*.75+(.5-t)*.45,a[2]]}setTilt(e,t){let a=bo(t,e),s=this.up;this.up=s?s.map((i,r)=>i+(a[r]-i)*.25):a,this.lightBase=Cr(this.up),this.slideTo=O0(this.up),this.lightTo=this.lightBase.slice(),(!s||Math.abs(s[0]-this.up[0])+Math.abs(s[1]-this.up[1])+Math.abs(s[2]-this.up[2])>.002)&&this.wake()}aim(e){this.lightTo=e.slice(),this.wake()}aimReset(){this.lightTo=this.lightBase.slice(),this.wake()}resetTilt(){this.up=null,this.lightBase=Ca.slice(),this.lightTo=Ca.slice(),this.slideTo=[0,0],this.wake()}screenColor(e){if(e=e||[.043,.047,.063],!this.p3)return e;let t=e.map(s=>s<=.04045?s/12.92:((s+.055)/1.055)**2.4);return[.8225*t[0]+.1774*t[1],.0332*t[0]+.9669*t[1],.0171*t[0]+.0724*t[1]+.9108*t[2]].map(s=>s<=.0031308?s*12.92:1.055*s**(1/2.4)-.055)}stepLight(){for(let e=0;e<3;e++)this.light[e]+=(this.lightTo[e]-this.light[e])*.12;for(let e=0;e<2;e++)this.slide[e]+=(this.slideTo[e]-this.slide[e])*.12}setObstacles(e){this.obstacles=(e||[]).slice(0,16),this.wake()}setControlHeight(e){this.ctrlH=e,this.wake()}obstacleData(e){let t=this.dpr||1,a=this.hostH,s=new Float32Array(64),i=new Float32Array(16),r=this.obstacles||[];return r.forEach((n,l)=>{s.set(e?[n[0]*t,a-n[3]*t,n[2]*t,a-n[1]*t]:[n[0]*t,n[1]*t,n[2]*t,n[3]*t],l*4),i[l]=(n[4]||0)*t}),{rects:s,radii:i,n:r.length,lightH:ni*t,ctrlH:(this.ctrlH||li)*t}}setKeyLights(e){let t=this.keyLit||(this.keyLit=new Uint8Array(256)),a=!1;for(let s=0;s<64;s++){let i=Math.round(Math.max(0,Math.min(1,e&&e[s]||0))*255);t[s*4]!==i&&(t[s*4]=i,a=!0)}a&&(this.keyLitDirty=!0,this.wake())}ensureKeyLit(){let e=this.gl;if(this.keyLit||(this.keyLit=new Uint8Array(256)),!this.keyLitTex){let t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);for(let[a,s]of[[e.TEXTURE_MIN_FILTER,e.NEAREST],[e.TEXTURE_MAG_FILTER,e.NEAREST],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,a,s);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,64,1,0,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitTex={tex:t,attach:a=>(e.activeTexture(e.TEXTURE0+a),e.bindTexture(e.TEXTURE_2D,t),a)},this.keyLitDirty=!1}this.keyLitDirty&&(e.bindTexture(e.TEXTURE_2D,this.keyLitTex.tex),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,1,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitDirty=!1)}setMeters(e){for(let t=0;t<8;t++)this.meters[t]=e[t]||0;this.wake()}slabData(e){let t=this.scene||{},a=(t.slabs||[[0,0,1,1]]).slice(0,8),s=new Float32Array(32),i=new Float32Array(32);return a.forEach((r,n)=>s.set(e?[r[0],1-r[3],r[2],1-r[1]]:r,n*4)),(t.fills||[]).slice(0,8).forEach((r,n)=>i.set(r,n*4)),{slabs:s,fills:i,n:a.length}}press(e,t,a,s){let i=performance.now(),r=this.touchSlots.find(n=>n.id===e&&!n.up);s==="down"?(this.touchSlots=this.touchSlots.filter(n=>!n.up||i-n.up<450).slice(-3),this.touchSlots.push({id:e,x:t,y:a,down:i,up:0}),hi(this.scene).id===1&&this.setLight(t,a)):r&&(r.x=t,r.y=a,(s==="up"||s==="cancel")&&(r.up=i,this.lightTo=this.lightBase.slice())),this.wake()}touchUniforms(e){let t=performance.now(),a=new Float32Array(16);return this.touchSlots=this.touchSlots.filter(s=>!s.up||t-s.up<450),this.touchSlots.slice(-4).forEach((s,i)=>{let r=s.up?Math.max(0,1-(t-s.up)/450):Math.min(1,(t-s.down)/90);a.set([s.x,e?1-s.y:s.y,(t-s.down)/1e3,r],i*4)}),a}keyAt(e,t){if(!this.keys)return 0;for(let a=this.keys.length-1;a>=0;a--){let s=this.keys[a];if(e>=s.x0&&e<s.x1&&t>=s.y0&&t<s.y1)return a+1}return 0}fbo(e,t,a,s){let i=this.gl;i.activeTexture(i.TEXTURE0);let r=i.createTexture();i.bindTexture(i.TEXTURE_2D,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texImage2D(i.TEXTURE_2D,0,a.internal,e,t,0,a.format,this.ext.type,null);let n=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,n),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,r,0),i.viewport(0,0,e,t),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),{texture:r,fbo:n,width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,attach:l=>(i.activeTexture(i.TEXTURE0+l),i.bindTexture(i.TEXTURE_2D,r),l)}}double(e,t,a,s){let i=this.fbo(e,t,a,s),r=this.fbo(e,t,a,s);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return i},set read(n){i=n},get write(){return r},set write(n){r=n},swap(){let n=i;i=r,r=n}}}resizeDouble(e,t,a,s,i){if(e.width===t&&e.height===a)return e;let r=this.fbo(t,a,s,i);return this.p.copy.bind(),this.gl.uniform1i(this.p.copy.u.uTexture,e.read.attach(0)),this.blit(r),e.read=r,e.write=this.fbo(t,a,s,i),e.width=t,e.height=a,e.texelSizeX=1/t,e.texelSizeY=1/a,e}res(e){let t=this.hostW/this.hostH;t<1&&(t=1/t);let a=Math.round(e),s=Math.round(e*t);return this.hostW>this.hostH?{width:s,height:a}:{width:a,height:s}}initBuffers(){let e=this.gl,t=this.ext,a=this.cfg,s=this.res(a.SIM_RESOLUTION),i=this.res(a.DYE_RESOLUTION),r=t.linear?e.LINEAR:e.NEAREST;e.disable(e.BLEND),this.dye=this.dye?this.resizeDouble(this.dye,i.width,i.height,t.rgba,r):this.double(i.width,i.height,t.rgba,r),this.velocity=this.velocity?this.resizeDouble(this.velocity,s.width,s.height,t.rg,r):this.double(s.width,s.height,t.rg,r),this.divergence=this.fbo(s.width,s.height,t.r,e.NEAREST),this.curl=this.fbo(s.width,s.height,t.r,e.NEAREST),this.pressure=this.double(s.width,s.height,t.r,e.NEAREST);let n=this.res(a.BLOOM_RESOLUTION);this.bloom=this.fbo(n.width,n.height,t.rgba,r),this.bloomFbos=[];for(let u=0;u<a.BLOOM_ITERATIONS;u++){let c=n.width>>u+1,h=n.height>>u+1;if(c<2||h<2)break;this.bloomFbos.push(this.fbo(c,h,t.rgba,r))}let l=this.res(a.SUNRAYS_RESOLUTION);this.sunrays=this.fbo(l.width,l.height,t.r,r),this.sunraysTemp=this.fbo(l.width,l.height,t.r,r),this.rebuildMasks()}blit(e){let t=this.gl;e?(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)):(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}attach(e){this.ok&&(this.host!==e&&(this.host=e,this.hostW=0,this.ro&&this.ro.disconnect(),this.ro=null),this.canvas.parentNode!==e&&e.insertBefore(this.canvas,e.firstChild),this.ro||(this.ro=new ResizeObserver(()=>this.requestRender()),this.ro.observe(e)),this.requestRender())}detach(){this.stop(),this.canvas.remove(),this.ro&&this.ro.disconnect(),this.ro=null,this.host=null}fit(){let e=this.host;if(!e)return;let t=Math.min(window.devicePixelRatio||1,2),a=e.getBoundingClientRect(),s=(e.closest(".app")||document.documentElement).getBoundingClientRect(),i=this.margin||0,r=y=>Math.round(Math.max(0,Math.min(i,y))),n=r(a.left-s.left),l=r(a.top-s.top),u=r(s.right-a.right),c=r(s.bottom-a.bottom),h=a.width+n+u,d=a.height+l+c,m=`${n},${l},${h},${d}`;m!==this.placeKey&&(this.placeKey=m,Object.assign(this.canvas.style,{left:-n+"px",top:-l+"px",width:h+"px",height:d+"px"}));let v=Math.max(2,Math.round(h*t)),g=Math.max(2,Math.round(d*t));(this.canvas.width!==v||this.canvas.height!==g)&&(this.canvas.width=v,this.canvas.height=g),this.dpr=t,this.off=[Math.round(n*t),Math.round(l*t)];let f=Math.max(2,Math.round(a.width*t)),p=Math.max(2,Math.round(a.height*t));(this.hostW!==f||this.hostH!==p||!this.dye)&&(this.hostW=f,this.hostH=p,this.initBuffers())}get aspect(){return this.hostW/this.hostH}splat(e,t,a,s,i,r=1,n=!1){this.ok&&(this.queue.push([e,t,a,s,i,r,n]),this.queue.length>64&&this.queue.shift(),this.wake())}burst(e,t,a,s=1,i=6,r=.8){let n=Math.random()*Math.PI*2;for(let l=0;l<i;l++){let u=n+l/i*Math.PI*2;this.splat(e+Math.cos(u)*.012,t+Math.sin(u)*.012,Math.cos(u)*.05*s,Math.sin(u)*.05*s,l===0?a:iu(a,.35),r)}}pulse(e){this.boost=Math.max(this.boost,e)}push(e,t,a,s,i=3){this.splat(e,t,a,s,{r:0,g:0,b:0},i,!0)}setStyle(e){let t=this.cfg,a={b:t.BLOOM,s:t.SUNRAYS};Object.assign(t,e),t.BLOOM=a.b,t.SUNRAYS=a.s}wake(){this.lastInput=performance.now(),!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}keepAwake(){!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}stop(){this.raf&&cancelAnimationFrame(this.raf),this.raf=0}clear(){if(!this.ok||!this.dye)return;let e=this.gl;e.clearColor(0,0,0,0);for(let t of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.bloom,this.sunrays])e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.viewport(0,0,t.width,t.height),e.clear(e.COLOR_BUFFER_BIT);this.requestRender()}requestRender(){this.raf||this.pending||!this.ok||!this.canvas.isConnected||(this.pending=requestAnimationFrame(()=>{this.pending=0,!(this.raf||!this.canvas.isConnected)&&(this.fit(),this.render(!0))}))}frame(e){if(this.raf=0,!this.ok||!this.canvas.isConnected)return;let t=Math.min((e-this.last)/1e3,1/60);this.last=e,this.lastFrameAt&&e-this.lastInput<1500&&(this.ema+=(Math.min(200,e-this.lastFrameAt)-this.ema)*.1,this.slow=this.ema>45?this.slow+1:0),this.lastFrameAt=e,this.slow>60&&this.degrade(),this.fit();let a=e-this.lastInput<this.cfg.IDLE_MS;a?(this.rested=!1,this.inkOn!==!1?(this.applyInputs(),this.step(t),this.render()):(this.queue=[],this.render(!0))):this.stage&&(this.rested||(this.clear(),this.rested=!0),(this.restTick=(this.restTick||0)+1)%2===0&&this.render(!0)),this.boost*=.9,a||this.stage?this.raf=requestAnimationFrame(s=>this.frame(s)):this.clear()}degrade(){this.slow=0;let e=this.cfg;if(e.SUNRAYS)e.SUNRAYS=!1;else if(e.BLOOM)e.BLOOM=!1;else if(e.SIM_RESOLUTION>64)e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.dye=null,this.velocity=null,this.hostW=0;else return;this.setDisplay()}applyInputs(){let e=this.queue;this.queue=[];for(let[t,a,s,i,r,n,l]of e)this.splatNow(t,1-a,s*this.cfg.SPLAT_FORCE*au(this.aspect),-i*this.cfg.SPLAT_FORCE*ou(this.aspect),r,n,l?0:this.keyAt(t,a))}splatNow(e,t,a,s,i,r,n){let l=this.gl,u=this.p.splat,c=this.cfg.SPLAT_RADIUS*r/100;this.aspect>1&&(c*=this.aspect),u.bind(),l.uniform1i(u.u.uTarget,this.velocity.read.attach(0)),l.uniform1f(u.u.aspectRatio,this.aspect),l.uniform2f(u.u.point,e,t),l.uniform3f(u.u.color,a,s,0),l.uniform1f(u.u.radius,c),l.uniform1f(u.u.targetId,n?n/255:0),l.uniform1i(u.u.uMask,this.maskSim.attach(1)),this.blit(this.velocity.write),this.velocity.swap(),l.uniform1i(u.u.uMask,this.maskDye.attach(1)),l.uniform1i(u.u.uTarget,this.dye.read.attach(0)),l.uniform3f(u.u.color,i.r*this.gain,i.g*this.gain,i.b*this.gain),this.blit(this.dye.write),this.dye.swap()}step(e){let t=this.gl,a=this.p,s=this.velocity,i=this.cfg;t.disable(t.BLEND),a.curl.bind(),t.uniform2f(a.curl.u.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(a.curl.u.uVelocity,s.read.attach(0)),this.blit(this.curl),a.vort.bind(),t.uniform2f(a.vort.u.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(a.vort.u.uVelocity,s.read.attach(0)),t.uniform1i(a.vort.u.uCurl,this.curl.attach(1)),t.uniform1f(a.vort.u.curl,i.CURL),t.uniform1f(a.vort.u.dt,e),this.blit(s.write),s.swap(),a.div.bind(),t.uniform2f(a.div.u.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(a.div.u.uVelocity,s.read.attach(0)),t.uniform1i(a.div.u.uMask,this.maskSim.attach(2)),this.blit(this.divergence),a.clear.bind(),t.uniform1i(a.clear.u.uTexture,this.pressure.read.attach(0)),t.uniform1f(a.clear.u.value,i.PRESSURE),this.blit(this.pressure.write),this.pressure.swap(),a.pressure.bind(),t.uniform2f(a.pressure.u.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(a.pressure.u.uDivergence,this.divergence.attach(0)),t.uniform1i(a.pressure.u.uMask,this.maskSim.attach(2));for(let n=0;n<i.PRESSURE_ITERATIONS;n++)t.uniform1i(a.pressure.u.uPressure,this.pressure.read.attach(1)),this.blit(this.pressure.write),this.pressure.swap();a.grad.bind(),t.uniform2f(a.grad.u.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(a.grad.u.uPressure,this.pressure.read.attach(0)),t.uniform1i(a.grad.u.uVelocity,s.read.attach(1)),t.uniform1i(a.grad.u.uMask,this.maskSim.attach(2)),this.blit(s.write),s.swap(),a.advect.bind(),t.uniform2f(a.advect.u.texelSize,s.texelSizeX,s.texelSizeY),this.ext.linear||t.uniform2f(a.advect.u.dyeTexelSize,s.texelSizeX,s.texelSizeY);let r=s.read.attach(0);t.uniform1i(a.advect.u.uVelocity,r),t.uniform1i(a.advect.u.uSource,r),t.uniform1i(a.advect.u.uMask,this.maskSim.attach(2)),t.uniform1f(a.advect.u.dt,e),t.uniform1f(a.advect.u.dissipation,i.VELOCITY_DISSIPATION),this.blit(s.write),s.swap(),this.ext.linear||t.uniform2f(a.advect.u.dyeTexelSize,this.dye.texelSizeX,this.dye.texelSizeY),t.uniform1i(a.advect.u.uVelocity,s.read.attach(0)),t.uniform1i(a.advect.u.uSource,this.dye.read.attach(1)),t.uniform1i(a.advect.u.uMask,this.maskDye.attach(2)),t.uniform1f(a.advect.u.dissipation,i.DENSITY_DISSIPATION),this.blit(this.dye.write),this.dye.swap()}render(e){let t=this.gl,a=this.cfg,s=this.p;if(!this.dye)return;e||(a.BLOOM&&this.applyBloom(),a.SUNRAYS&&(this.applySunrays(),this.blur(this.sunrays,this.sunraysTemp,1))),this.ensureKeyTex();let i=this.scene||{};this.stepLight(),t.disable(t.BLEND);let r=t.drawingBufferWidth,n=t.drawingBufferHeight;if(i.glass){let l=this.srcFbo||(this.srcFbo=this.fbo(8,1,this.ext.rgba,t.NEAREST));this.useComposite(s.sources,i),this.blit(l);let u=this.ensureHazeFbo();this.useComposite(s.haze,i),t.uniform2f(s.haze.u.hazeRes,u.width,u.height),this.blit(u);let c=this.ensureLightFbo(r,n);this.useComposite(s.light,i),t.uniform2f(s.light.u.lightScale,r/c.width,n/c.height),s.light.u.uSources&&t.uniform1i(s.light.u.uSources,l.attach(7)),this.blit(c)}this.useComposite(s.display,i),i.glass&&(t.uniform1i(s.display.u.uLight,this.lightFbo.attach(5)),t.uniform2f(s.display.u.canvasRes,r,n),t.uniform2f(s.display.u.lightScale,r/this.lightFbo.width,n/this.lightFbo.height),s.display.u.uHaze&&(t.uniform1i(s.display.u.uHaze,this.hazeFbo.attach(7)),t.uniform2f(s.display.u.hazeRes,this.hazeFbo.width,this.hazeFbo.height))),this.blit(null)}ensureHazeFbo(){let e=this.gl,t=this.res(16),a=this.hazeFbo;return a&&a.width===t.width&&a.height===t.height?a:(a&&(e.deleteTexture(a.texture),e.deleteFramebuffer(a.fbo)),this.hazeFbo=this.fbo(t.width,t.height,this.ext.rgba,this.ext.linear?e.LINEAR:e.NEAREST),this.hazeFbo)}ensureLightFbo(e,t){let a=this.gl,s=Math.max(2,Math.ceil(e/2)),i=Math.max(2,Math.ceil(t/2)),r=this.lightFbo;return r&&r.width===s&&r.height===i?r:(r&&(a.deleteTexture(r.texture),a.deleteFramebuffer(r.fbo)),this.lightFbo=this.fbo(s,i,this.ext.rgba,this.ext.linear?a.LINEAR:a.NEAREST),this.lightFbo)}useComposite(e,t){let a=this.gl,s=this.cfg,i=e.u,r=a.drawingBufferHeight,n=this.hostW,l=this.hostH,u=this.dpr||1;e.bind(),a.uniform2f(i.texelSize,1/n,1/l),a.uniform2f(i.res,n,l),a.uniform2f(i.off,this.off[0],r-this.off[1]-l),a.uniform1f(i.dpr,u),a.uniform1i(i.uTexture,this.dye.read.attach(0)),a.uniform1f(i.gain,1),s.BLOOM&&(a.uniform1i(i.uBloom,this.bloom.attach(1)),a.uniform1i(i.uDithering,this.dither.attach(2)),a.uniform2f(i.ditherScale,n/this.dither.width,l/this.dither.height)),s.SUNRAYS&&a.uniform1i(i.uSunrays,this.sunrays.attach(3));let c=(p,y)=>i[p]&&a.uniform3f(i[p],y[0],y[1],y[2]);c("bgTop",t.bgTop||[.1,.11,.14]),c("bgBot",t.bgBot||[.07,.075,.094]),c("accent",t.accent||[.8,.9,.3]),c("surf",t.surf||[.086,.09,.114]),c("appBg",this.screenColor(t.appBg));let h=t.sep||[1,1,1,.06];a.uniform4f(i.sep,h[0],h[1],h[2],h[3]),a.uniform1f(i.sepPx,(t.sepPx||1)*u),i["kinds[0]"]&&a.uniform4fv(i["kinds[0]"],new Float32Array((t.kinds||Array(6).fill([0,0,0,0])).flat())),a.uniform1f(i.useKeys,t.keys?1:0),a.uniform1f(i.grid,t.kind==="xy"?1:0),a.uniform1f(i.darkTheme,t.dark===!1?0:1),this.keyTex&&t.keys&&a.uniform1i(i.uKeys,this.keyTex.attach(4)),a.uniform1f(i.glass,t.glass?1:0),a.uniform1f(i.radius,(t.radius||20)*u);let d=hi(t);a.uniform1f(i.bevel,d.bevel*u),a.uniform1f(i.thickness,d.thick*u),i.look&&a.uniform4f(i.look,d.id,d.p,d.disp,d.depth);let m=this.stage||[0,0,0,0];i.stage&&a.uniform4f(i.stage,m[0],m[1],m[2],m[3]),a.uniform1f(i.gel,this.gelOn===!1?0:t.gel??1);let v=this.touchUniforms(!0);(i["touches[0]"]||i.touches)&&a.uniform4fv(i["touches[0]"]||i.touches,v);let g=this.slabData(!0);i["slabs[0]"]&&a.uniform4fv(i["slabs[0]"],g.slabs),i["fills[0]"]&&a.uniform4fv(i["fills[0]"],g.fills),i["meters[0]"]&&a.uniform1fv(i["meters[0]"],this.meters),a.uniform1f(i.nSlabs,g.n),a.uniform1f(i.mode,t.kind==="mix"?1:0),a.uniform2f(i.lightDir,this.light[0],this.light[1]),a.uniform1f(i.lightZ,this.light[2]),a.uniform2f(i.slide,this.slide[0],this.slide[1]),a.uniform1f(i.spillK,t.spill||0),a.uniform1f(i.shadowK,t.shadow||0),a.uniform1f(i.style,t.style||0);let f=t.keyGlow||[1,1,1,0];if(i.keyGlow&&a.uniform4f(i.keyGlow,f[0],f[1],f[2],f[3]),this.ensureKeyLit(),i.uKeyLit&&a.uniform1i(i.uKeyLit,this.keyLitTex.attach(6)),i["obst[0]"]){let p=this.obstacleData(!0);a.uniform4fv(i["obst[0]"],p.rects),a.uniform1f(i.nObst,p.n),a.uniform2f(i.obstH,p.lightH,p.ctrlH),i["obstR[0]"]&&a.uniform1fv(i["obstR[0]"],p.radii)}a.uniform1f(i.pulse,Math.min(1,this.boost)),a.uniform1f(i.hdr,1)}applyBloom(){let e=this.gl,t=this.cfg,a=this.p;if(this.bloomFbos.length<2)return;let s=this.bloom;e.disable(e.BLEND),a.bloomPre.bind();let i=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;e.uniform3f(a.bloomPre.u.curve,t.BLOOM_THRESHOLD-i,i*2,.25/i),e.uniform1f(a.bloomPre.u.threshold,t.BLOOM_THRESHOLD),e.uniform1i(a.bloomPre.u.uTexture,this.dye.read.attach(0)),this.blit(s),a.bloomBlur.bind();for(let r of this.bloomFbos)e.uniform2f(a.bloomBlur.u.texelSize,s.texelSizeX,s.texelSizeY),e.uniform1i(a.bloomBlur.u.uTexture,s.attach(0)),this.blit(r),s=r;e.blendFunc(e.ONE,e.ONE),e.enable(e.BLEND);for(let r=this.bloomFbos.length-2;r>=0;r--){let n=this.bloomFbos[r];e.uniform2f(a.bloomBlur.u.texelSize,s.texelSizeX,s.texelSizeY),e.uniform1i(a.bloomBlur.u.uTexture,s.attach(0)),this.blit(n),s=n}e.disable(e.BLEND),a.bloomFinal.bind(),e.uniform2f(a.bloomFinal.u.texelSize,s.texelSizeX,s.texelSizeY),e.uniform1i(a.bloomFinal.u.uTexture,s.attach(0)),e.uniform1f(a.bloomFinal.u.intensity,t.BLOOM_INTENSITY*(1+this.boost*.8)),this.blit(this.bloom)}applySunrays(){let e=this.gl,t=this.p;e.disable(e.BLEND),t.sunMask.bind(),e.uniform1i(t.sunMask.u.uTexture,this.dye.read.attach(0)),this.blit(this.dye.write),t.sun.bind(),e.uniform1f(t.sun.u.weight,this.cfg.SUNRAYS_WEIGHT),e.uniform1i(t.sun.u.uTexture,this.dye.write.attach(0)),this.blit(this.sunrays)}blur(e,t,a){let s=this.gl,i=this.p;i.blur.bind();for(let r=0;r<a;r++)s.uniform2f(i.blur.u.texelSize,e.texelSizeX,0),s.uniform1i(i.blur.u.uTexture,e.attach(0)),this.blit(t),s.uniform2f(i.blur.u.texelSize,0,e.texelSizeY),s.uniform1i(i.blur.u.uTexture,t.attach(0)),this.blit(e)}},au=o=>o<1?o:1,ou=o=>o>1?1/o:1,iu=(o,e)=>({r:o.r*e,g:o.g*e,b:o.b*e});var ru=`
struct U { texel: vec2f, dyeTexel: vec2f, point: vec2f, aspect: f32, radius: f32, color: vec4f, a: f32, b: f32, c: f32, d: f32, curve: vec4f, e: vec4f };
struct VO { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VO {
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var o: VO; o.pos = vec4f(p[i], 0.0, 1.0); o.uv = vec2f(p[i].x * 0.5 + 0.5, 0.5 - p[i].y * 0.5); return o;
}
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var sl: sampler;
fn tx(t: texture_2d<f32>, uv: vec2f) -> vec4f { return textureSampleLevel(t, sl, uv, 0.0); }
`,nu={copy:`@group(0) @binding(2) var t0: texture_2d<f32>;
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
}`},ui=`
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
`,di=`var<private> selRect: vec4f;
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
`,lu=()=>ui+`@group(0) @binding(2) var dye: texture_2d<f32>;
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
`+di+`fn inkAt(uv: vec2f) -> vec3f {
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
}`,Or=`@group(0) @binding(2) var dye: texture_2d<f32>;
@group(0) @binding(3) var bloom: texture_2d<f32>;
@group(0) @binding(4) var keys: texture_2d<f32>;
@group(0) @binding(5) var sn: sampler;
@group(0) @binding(6) var keyLit: texture_2d<f32>;
@group(0) @binding(7) var srcT: texture_2d<f32>;
@group(0) @binding(8) var haze: texture_2d<f32>;
`,cu=()=>ui+Or+di+`@fragment fn fs(i: VO) -> @location(0) vec4f { return aroundLight(i.pos.xy * s.lightScale - s.off); }
`,hu=()=>ui+Or+di+`@fragment fn fs(i: VO) -> @location(0) vec4f {
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
`,uu=()=>ui+Or+di+`@fragment fn fs(i: VO) -> @location(0) vec4f {
  let c0 = floor(i.pos.xy);
  var sum = vec3f(0.0);
  for (var j = 0; j < 8; j = j + 1) {
    for (var n = 0; n < 8; n = n + 1) { sum = sum + glowAt((c0 + (vec2f(f32(n), f32(j)) + 0.5) / 8.0) / s.hazeRes); }
  }
  return vec4f(sum / 64.0, 1.0);
}
`,du=()=>GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST,yo=256,xo=class o extends qa{static supported(){return typeof navigator<"u"&&!!navigator.gpu}static async create(){try{let e=new o;return await e.initGPU(),e.ok?e:null}catch(e){return console.warn("WebGPU indisponible, repli sur WebGL",e),null}}init(){}async initGPU(){this.cfg={...qr},this.ext={linear:!0};let e=await navigator.gpu.requestAdapter();if(!e)return;let t=await e.requestDevice();this.device=t,t.lost.then(()=>{this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let a=0;t.addEventListener("uncapturederror",m=>{console.warn("WebGPU",m.error&&m.error.message),++a>4&&this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let s=this.canvas.getContext("webgpu");if(!s)return;this.ctx=s,this.format="rgba16float";try{s.configure({device:t,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:"extended"},alphaMode:"premultiplied"}),this.p3=!0;let m=s.getConfiguration?s.getConfiguration():null;this.extended=m?!!(m.toneMapping&&m.toneMapping.mode==="extended"):!0,this.rangeOn=!0}catch{this.format=navigator.gpu.getPreferredCanvasFormat(),s.configure({device:t,format:this.format,alphaMode:"premultiplied"}),this.extended=!1,this.p3=!1}this.hdrScreen=this.extended&&matchMedia("(dynamic-range: high)").matches,this.lin=t.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.near=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.rep=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat"}),this.ubuf=t.createBuffer({size:yo*512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.staging=new ArrayBuffer(yo*512),this.f32=new Float32Array(this.staging),this.uOff=0;let i={},r=[],n=(m,v,g,f)=>{let p=t.createShaderModule({code:v});p.getCompilationInfo&&p.getCompilationInfo().then(x=>{for(let S of x.messages)S.type==="error"&&r.push(`${m}:${S.lineNum}: ${S.message}`)}),t.pushErrorScope("validation");let y=t.createRenderPipeline({layout:"auto",vertex:{module:p,entryPoint:"vs"},fragment:{module:p,entryPoint:"fs",targets:[{format:g,blend:f}]},primitive:{topology:"triangle-list"}});return t.popErrorScope().then(x=>{x&&r.push(`${m}: ${x.message}`)}),y},l={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},u=m=>ru+nu[m];i.copyRGBA=n("copy",u("copy"),"rgba16float"),i.copyRG=n("copy",u("copy"),"rg16float"),i.clear=n("clear",u("clear"),"r16float"),i.splatRG=n("splat",u("splat"),"rg16float"),i.splatRGBA=n("splat",u("splat"),"rgba16float"),i.advectRG=n("advect",u("advect"),"rg16float"),i.advectRGBA=n("advect",u("advect"),"rgba16float"),i.divergence=n("div",u("divergence"),"r16float"),i.curl=n("curl",u("curl"),"r16float"),i.vorticity=n("vort",u("vorticity"),"rg16float"),i.pressure=n("pressure",u("pressure"),"r16float"),i.gradient=n("grad",u("gradient"),"rg16float"),i.bloomPre=n("bloomPre",u("bloomPre"),"rgba16float"),i.bloomBlur=n("bloomBlur",u("bloomBlur"),"rgba16float"),i.bloomAdd=n("bloomAdd",u("bloomBlur"),"rgba16float",l),i.sunMask=n("sunMask",u("sunMask"),"rgba16float"),i.sun=n("sun",u("sun"),"r16float"),i.blur=n("blur",u("blur"),"r16float"),i.composite=n("composite",lu(),this.format),i.light=n("light",cu(),"rgba16float"),i.sources=n("sources",hu(),"rgba16float"),i.haze=n("haze",uu(),"rgba16float"),this.pipes=i,this.layouts=new Map;let c=new Uint8Array(4096*4),h=1234567;for(let m=0;m<c.length;m++)h=h*1103515245+12345&2147483647,c[m]=h>>23;this.dither=this.texFromData(64,64,c),this.maskAll=this.texFromData(1,1,new Uint8Array([1,0,0,255])),this.maskSim=this.maskDye=this.maskAll,this.keyTex=this.texFromData(1,1,new Uint8Array([0,0,0,255])),this.keys=null,this.scene=null,this.resetLight(),this.dye=null,this.velocity=null,this.ok=!0,t.pushErrorScope("validation");try{this.canvas.width=96,this.canvas.height=128,this.hostW=96,this.hostH=128,this.initBuffers(),this.splat(.5,.5,.01,.01,{r:.3,g:.2,b:.1}),this.scene={glass:!0},this.applyInputs(),this.step(1/60),this.render(!1),this.scene=null}catch(m){r.push("dry run: "+m.message)}let d=await t.popErrorScope();if(d&&r.push(d.message),await t.queue.onSubmittedWorkDone(),await new Promise(m=>setTimeout(m,0)),this.queue=[],this.dye=null,this.canvas.width=2,this.canvas.height=2,this.hostW=0,r.length){console.warn("MOTIF WebGPU: repli sur WebGL \u2014",r.join(" | ")),this.problems=r,this.ok=!1;return}}tex(e,t,a){let s=this.device.createTexture({size:[e,t],format:a,usage:du()});return{texture:s,view:s.createView(),width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,format:a}}double(e,t,a){let s=this.tex(e,t,a),i=this.tex(e,t,a);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return s},set read(r){s=r},get write(){return i},set write(r){i=r},swap(){let r=s;s=i,i=r}}}texFromData(e,t,a){let s=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return this.device.queue.writeTexture({texture:s},a,{bytesPerRow:e*4},[e,t]),{texture:s,view:s.createView(),width:e,height:t}}texFromCanvas(e){let t=this.device.createTexture({size:[e.width,e.height],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return this.device.queue.copyExternalImageToTexture({source:e},{texture:t},[e.width,e.height]),{texture:t,view:t.createView(),width:e.width,height:e.height}}initBuffers(){let e=this.cfg,t=this.res(e.SIM_RESOLUTION),a=this.res(e.DYE_RESOLUTION);for(let r of[this.dye,this.velocity,this.pressure])r&&(r.read.texture.destroy(),r.write.texture.destroy());for(let r of[this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp,...this.bloomFbos||[]])r&&r.texture.destroy();this.dye=this.double(a.width,a.height,"rgba16float"),this.velocity=this.double(t.width,t.height,"rg16float"),this.divergence=this.tex(t.width,t.height,"r16float"),this.curl=this.tex(t.width,t.height,"r16float"),this.pressure=this.double(t.width,t.height,"r16float");let s=this.res(e.BLOOM_RESOLUTION);this.bloom=this.tex(s.width,s.height,"rgba16float"),this.bloomFbos=[];for(let r=0;r<e.BLOOM_ITERATIONS;r++){let n=s.width>>r+1,l=s.height>>r+1;if(n<2||l<2)break;this.bloomFbos.push(this.tex(n,l,"rgba16float"))}let i=this.res(e.SUNRAYS_RESOLUTION);this.sunrays=this.tex(i.width,i.height,"r16float"),this.sunraysTemp=this.tex(i.width,i.height,"r16float"),this.rebuildMasks(),this.zero()}rebuildMasks(){for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&t.texture.destroy();if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}let e=this.maskCanvas||(this.maskCanvas=document.createElement("canvas"));this.maskSim=this.texFromCanvas(fo(e,this.keys,this.velocity.width,this.velocity.height)),this.maskDye=this.texFromCanvas(fo(e,this.keys,this.dye.width,this.dye.height))}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,a=this.hostH,s=e.sig+"|"+t+"x"+a;this.keyTexSig!==s&&(this.keyTex&&this.keyTex.texture.destroy(),this.keyTex=this.texFromCanvas(ti(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,a)),this.keyTexSig=s)}get enc(){return this._enc||(this._enc=this.device.createCommandEncoder())}uniforms(e,t=1){let a=this.uOff;if(this.uOff+=yo*t,this.uOff>this.staging.byteLength)throw new Error("uniform space");let s=this.f32,i=a/4;return s.fill(0,i,i+yo*t/4),e(s,i),{buffer:this.ubuf,offset:a,size:yo*t}}uni(e){return this.uniforms((t,a)=>{e.texel&&(t[a]=e.texel[0],t[a+1]=e.texel[1]),e.point&&(t[a+4]=e.point[0],t[a+5]=e.point[1]),t[a+6]=e.aspect||0,t[a+7]=e.radius||0,e.color&&(t[a+8]=e.color[0],t[a+9]=e.color[1],t[a+10]=e.color[2]),t[a+12]=e.a||0,t[a+13]=e.b||0,t[a+14]=e.c||0,t[a+15]=e.d||0,e.curve&&(t[a+16]=e.curve[0],t[a+17]=e.curve[1],t[a+18]=e.curve[2])})}pass(e,t,a,s,i){let r=this.layouts.get(e)||(this.layouts.set(e,e.getBindGroupLayout(0)),this.layouts.get(e)),n=[{binding:0,resource:a},{binding:1,resource:this.lin}];s.forEach((c,h)=>{c&&n.push({binding:2+h,resource:c})});let l=this.device.createBindGroup({layout:r,entries:n}),u=this.enc.beginRenderPass({colorAttachments:[{view:t.view||t,loadOp:i?"load":"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]});u.setPipeline(e),u.setBindGroup(0,l),u.draw(3),u.end()}flush(){this._enc&&(this.device.queue.writeBuffer(this.ubuf,0,this.staging,0,this.uOff),this.device.queue.submit([this._enc.finish()]),this._enc=null,this.uOff=0)}zero(){if(this.dye){for(let e of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp])this.enc.beginRenderPass({colorAttachments:[{view:e.view,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]}).end();this.flush()}}clear(){!this.ok||!this.dye||(this.zero(),this.requestRender())}applyInputs(){let e=this.queue;this.queue=[];for(let[t,a,s,i,r,n,l]of e)this.splatNow(t,a,s*this.cfg.SPLAT_FORCE*fu(this.aspect),-i*this.cfg.SPLAT_FORCE*pu(this.aspect),r,n,l?0:this.keyAt(t,a))}splatNow(e,t,a,s,i,r,n){let l=this.cfg.SPLAT_RADIUS*r/100;this.aspect>1&&(l*=this.aspect);let u={point:[e,t],aspect:this.aspect,radius:l,a:n?n/255:0},c=this.velocity,h=this.dye;this.pass(this.pipes.splatRG,c.write,this.uni({...u,color:[a,s,0]}),[c.read.view,this.maskSim.view,this.near]),c.swap(),this.pass(this.pipes.splatRGBA,h.write,this.uni({...u,color:[i.r*this.gain,i.g*this.gain,i.b*this.gain]}),[h.read.view,this.maskDye.view,this.near]),h.swap()}step(e){let t=this.pipes,a=this.velocity,s=this.cfg,i=[a.texelSizeX,a.texelSizeY];this.pass(t.curl,this.curl,this.uni({texel:i}),[a.read.view]),this.pass(t.vorticity,a.write,this.uni({texel:i,a:e,c:s.CURL}),[a.read.view,this.curl.view]),a.swap(),this.pass(t.divergence,this.divergence,this.uni({texel:i}),[a.read.view,this.maskSim.view,this.near]),this.pass(t.clear,this.pressure.write,this.uni({a:s.PRESSURE}),[this.pressure.read.view]),this.pressure.swap();let r=this.uni({texel:i});for(let n=0;n<s.PRESSURE_ITERATIONS;n++)this.pass(t.pressure,this.pressure.write,r,[this.pressure.read.view,this.divergence.view,this.maskSim.view,this.near]),this.pressure.swap();this.pass(t.gradient,a.write,this.uni({texel:i}),[this.pressure.read.view,a.read.view,this.maskSim.view,this.near]),a.swap(),this.pass(t.advectRG,a.write,this.uni({texel:i,a:e,b:s.VELOCITY_DISSIPATION}),[a.read.view,a.read.view,this.maskSim.view,this.near]),a.swap(),this.pass(t.advectRGBA,this.dye.write,this.uni({texel:i,a:e,b:s.DENSITY_DISSIPATION}),[a.read.view,this.dye.read.view,this.maskDye.view,this.near]),this.dye.swap()}applyBloom(){let e=this.pipes,t=this.cfg;if(this.bloomFbos.length<2)return;let a=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;this.pass(e.bloomPre,this.bloom,this.uni({curve:[t.BLOOM_THRESHOLD-a,a*2,.25/a],a:t.BLOOM_THRESHOLD}),[this.dye.read.view]);let s=this.bloom;for(let i of this.bloomFbos)this.pass(e.bloomBlur,i,this.uni({texel:[s.texelSizeX,s.texelSizeY],a:1}),[s.view]),s=i;for(let i=this.bloomFbos.length-2;i>=0;i--){let r=this.bloomFbos[i];this.pass(e.bloomAdd,r,this.uni({texel:[s.texelSizeX,s.texelSizeY],a:1}),[s.view],!0),s=r}this.pass(e.bloomBlur,this.bloom,this.uni({texel:[s.texelSizeX,s.texelSizeY],a:t.BLOOM_INTENSITY*(1+this.boost*.8)}),[s.view])}applySunrays(){let e=this.pipes;this.pass(e.sunMask,this.dye.write,this.uni({}),[this.dye.read.view]),this.pass(e.sun,this.sunrays,this.uni({a:this.cfg.SUNRAYS_WEIGHT}),[this.dye.write.view]),this.pass(e.blur,this.sunraysTemp,this.uni({texel:[this.sunrays.texelSizeX,0]}),[this.sunrays.view]),this.pass(e.blur,this.sunrays,this.uni({texel:[0,this.sunraysTemp.texelSizeY]}),[this.sunraysTemp.view])}setDisplay(){}setExtended(e){if(!(!this.ctx||this.format!=="rgba16float"||this.rangeOn===e)){this.rangeOn=e;try{this.ctx.configure({device:this.device,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:e?"extended":"standard"},alphaMode:"premultiplied"})}catch{}this.requestRender()}}ensureKeyLit(){this.keyLit||(this.keyLit=new Uint8Array(256)),this.keyLitTex||(this.keyLitTex=this.texFromData(64,1,this.keyLit),this.keyLitDirty=!1),this.keyLitDirty&&(this.device.queue.writeTexture({texture:this.keyLitTex.texture},this.keyLit,{bytesPerRow:256},[64,1]),this.keyLitDirty=!1)}ensureHazeTex(){let e=this.res(16),t=this.hazeTex;return t&&t.width===e.width&&t.height===e.height?t:(t&&t.texture.destroy(),this.hazeTex=this.tex(e.width,e.height,"rgba16float"),this.hazeTex)}ensureLightTex(e,t){let a=Math.max(2,Math.ceil(e/2)),s=Math.max(2,Math.ceil(t/2)),i=this.lightTex;return i&&i.width===a&&i.height===s?i:(i&&i.texture.destroy(),this.lightTex=this.tex(a,s,"rgba16float"),this.lightTex)}render(e){if(!this.ok||!this.dye)return;let t=this.cfg;e||(t.BLOOM&&this.applyBloom(),t.SUNRAYS&&this.applySunrays()),this.ensureKeyTex();let a=this.scene||{};this.stepLight();let s=this.hostW,i=this.hostH,r=this.dpr||1,n=this.hdrScreen&&a.hdr||1,l=this.slabData(!1),u=this.canvas.width,c=this.canvas.height,h=a.glass?this.ensureLightTex(u,c):null,d=this.ensureHazeTex(),m=hi(a),v=this.uniforms((f,p)=>{let y=(S,E)=>{for(let L=0;L<E.length;L++)f[p+S+L]=E[L]};y(0,[s,i]),y(2,[this.light[0],this.light[1]]),y(4,a.bgTop||[.1,.11,.14]),y(8,a.bgBot||[.07,.075,.094]),y(12,a.accent||[.8,.9,.3]),y(16,a.sep||[1,1,1,.06]),(a.kinds||[]).forEach((S,E)=>y(20+E*4,S)),y(44,[s/64,i/64]),y(46,[1/s,1/i]),y(48,[(a.sepPx||1)*r,a.keys?1:0,a.kind==="xy"?1:0,a.dark===!1?0:1,a.glass?1:0,(a.radius||20)*r,m.bevel*r,Math.min(1,this.boost)]),y(56,[n,t.BLOOM?1:0,t.SUNRAYS?1:0,t.SHADING?1:0]),f.set(this.touchUniforms(!1),p+60),y(76,[m.thick*r,this.gelOn===!1?0:a.gel??1,h?u/h.width:1,h?c/h.height:1]),f.set(l.slabs,p+80),f.set(l.fills,p+112),f.set(this.meters,p+144),y(152,[this.off[0],this.off[1],this.slide[0],-this.slide[1]]),y(156,[r,l.n,a.kind==="mix"?1:0,this.light[2],a.spill||0,a.shadow||0,u,c]),y(164,a.surf||[.086,.09,.114]),y(168,this.screenColor(a.appBg));let x=this.obstacleData(!1);f.set(x.rects,p+172),y(236,[x.n,x.lightH,x.ctrlH,a.style||0]),f.set(x.radii,p+240),y(256,a.keyGlow||[1,1,1,0]),y(260,[m.id,m.p,m.disp,m.depth]),y(264,[d.width,d.height]),y(268,this.stage||[0,0,0,0])},5);this.ensureKeyLit();let g=this.ctx.getCurrentTexture().createView();if(h){let f=this.srcTex||(this.srcTex=this.tex(8,1,"rgba16float"));this.pass(this.pipes.sources,f,v,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.haze,d,v,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.light,h,v,[this.dye.read.view,this.bloom.view,this.keyTex.view,this.near,this.keyLitTex.view,f.view])}this.pass(this.pipes.composite,g,v,[this.dye.read.view,this.bloom.view,this.sunrays.view,this.dither.view,this.keyTex.view,this.near,this.rep,(h||this.dither).view,this.keyLitTex.view,null,d.view]),this.flush()}degrade(){this.slow=0;let e=this.cfg;e.SUNRAYS?e.SUNRAYS=!1:e.BLOOM?e.BLOOM=!1:e.SIM_RESOLUTION>64&&(e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.hostW=0)}},fu=o=>o<1?o:1,pu=o=>o>1?1/o:1;var Br=[".parts .ptab",".inst .arrow",".inst .name",".nav button"],mu={pad:[".controls .dial",".range",".timeline > *",...Br],xy:[".groups .grp",".autobar > *",...Br],mix:[".mixknobs .dial",".fader .m",...Br]},I0=190,pa={layouts:0,paints:0,writes:0,items:0},vu=o=>{let e=getComputedStyle(o).backgroundColor.match(/[\d.]+/g);return!!e&&(e.length<4||+e[3]>.02)},F0=o=>{let e=document.createElement("div");return e.className=o,e.setAttribute("aria-hidden","true"),e};function z0(o){let e=[],t=null,a=[],s=li,i={r:0,g:0,b:0,x:0,y:0,w:0},r=0,n=0,l=!1,u=1.6,c=null,h=0,d=[],m=0,v={sh:"0 0 0",hl:"255 255 255"},g=F0("spill-over"),f=()=>{for(let A of e){A.el.classList.remove("lit","solid");for(let U of["--e","--ux","--uy","--l"])A.el.style.removeProperty(U)}g.replaceChildren(),e=[]},p=new MutationObserver(A=>{if(!l||!c||h)return;let U=_=>_.target===g;A.some(_=>!U(_)&&(_.type==="attributes"||[..._.addedNodes].some(I=>I.nodeType===1)))&&(h=setTimeout(()=>{h=0,c&&y.layout(c.el,c.kind)},160))}),y={enable(A){l=A,document.documentElement.toggleAttribute("data-spill",A),A?(g.parentNode!==o&&o.append(g),p.observe(o,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["aria-selected","aria-pressed","disabled"]}),p.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),document.fonts&&document.fonts.ready.then(()=>{l&&c&&y.layout(c.el,c.kind)})):(p.disconnect(),f(),g.remove(),c=null,i={r:0,g:0,b:0,x:0,y:0,w:0},d=[],y.onObstacles([]),y.onSources([]))},setPower(A){u=A},setHeight(A){s=A},onObstacles(){},onSources(){},layout(A,U){if(pa.layouts++,f(),t=null,c=null,!l||!A||!A.isConnected){y.onObstacles([]);return}c={el:A,kind:U},t=A.getBoundingClientRect();let _=o.getBoundingClientRect();v=document.documentElement.dataset.theme==="light"?{sh:"70 48 12",hl:"255 255 255"}:{sh:"0 0 0",hl:"255 255 255"};let I=(U==="mix"?[...A.querySelectorAll(".fader")]:[A]).map(Y=>Y.getBoundingClientRect()),j=Y=>I.some(J=>Y.left<J.right&&Y.right>J.left&&Y.top<J.bottom&&Y.bottom>J.top),se=[];a=[];for(let Y of mu[U]||[])for(let J of o.querySelectorAll(Y)){let ue=J.getBoundingClientRect();if(!ue.width)continue;let ve=Math.max(0,t.left-ue.right,ue.left-t.right),de=Math.max(0,t.top-ue.bottom,ue.top-t.bottom);if(Math.hypot(ve,de)>I0*2.5)continue;let Me=vu(J);J.classList.toggle("solid",Me);let ge={el:J,r:ue,solid:Me,ro:"",ang:"",te:-1,ta:0};if(Me){let it={left:`${ue.left-_.left}px`,top:`${ue.top-_.top}px`,width:`${ue.width}px`,height:`${ue.height}px`,borderRadius:getComputedStyle(J).borderRadius};ge.rl=F0(""),Object.assign(ge.rl.style,it),ge.rl.style.setProperty("--hl",v.hl),ge.rl.style.setProperty("--sh",v.sh),g.append(ge.rl),j(ue)||(se.push({d:Math.hypot(ve,de),r:[ue.left-t.left,ue.top-t.top,ue.right-t.left,ue.bottom-t.top,parseFloat(getComputedStyle(J).borderTopLeftRadius)||0]}),a.push(ge))}e.push(ge)}pa.items=e.length,y.onObstacles(se.sort((Y,J)=>Y.d-J.d).slice(0,16).map(Y=>Y.r.map(J=>Math.round(J*10)/10))),i.w>0&&x()},emit(A,U=1,_,I){if(!l)return;let j=A.r*U,se=A.g*U,Y=A.b*U,J=j+se+Y;i.r+=j,i.g+=se,i.b+=Y,_!==void 0&&J>0&&(i.x+=_*J,i.y+=I*J,i.w+=J,S(_,I,J,j,se,Y)),x()}};function x(){r||(n=performance.now(),r=requestAnimationFrame(E))}function S(A,U,_,I,j,se){let Y=t?t.height/t.width:1.4,J=null,ue=1/0;for(let ve of d){let de=Math.hypot(ve.x-A,(ve.y-U)*Y);de<ue&&(ue=de,J=ve)}if(J&&(ue<.22||d.length>=4)){let ve=J.e+_;J.x=(J.x*J.e+A*_)/ve,J.y=(J.y*J.e+U*_)/ve,J.e=ve,J.r+=I,J.g+=j,J.b+=se}else d.push({x:A,y:U,e:_,r:I,g:j,b:se})}function E(A){r=0;let U=Math.min(.1,(A-n)/1e3);n=A;let _=Math.exp(-U/.28);for(let Y in i)i[Y]*=_;let I=i.r+i.g+i.b,j=1-Math.exp(-I*.45),se=Math.exp(-U/.45);for(let Y of d)Y.e*=se,Y.r*=se,Y.g*=se,Y.b*=se;d=d.filter(Y=>Y.e>.01),(d.length||m)&&(m=d.length,y.onSources(d.map(Y=>{let J=Math.max(Y.r,Y.g,Y.b,1e-6);return[Y.x,Y.y,1-Math.exp(-Y.e*.5),Y.r/J,Y.g/J,Y.b/J]}))),t&&q(j<.01&&!d.length?0:1),(j>=.01||d.length)&&(r=requestAnimationFrame(E))}let L=(A,U,_,I,j)=>{A[U]!==j&&(A[U]=j,_.style[I]=j)};function D(A,U,_){let I=U.x-A.x,j=U.y-A.y;Math.abs(I)<.001&&(I=.001),Math.abs(j)<.001&&(j=.001);let se=1;for(let Y of a){if(Y===_)continue;let J=Y.r,ue=(J.left-A.x)/I,ve=(J.right-A.x)/I,de=(J.top-A.y)/j,Me=(J.bottom-A.y)/j,ge=Math.max(Math.min(ue,ve),Math.min(de,Me),0),it=Math.min(Math.max(ue,ve),Math.max(de,Me),1);if(ge<it){let P=4.5*(1-it)+.15*s,G=ni*(1-it)-s,F=Math.min(1,Math.max(0,(G+P)/(2*P)));se*=F*F*(3-2*F)}}return .22+.78*se}function q(A){pa.paints++;let U=A?d.map(_=>({x:t.left+_.x*t.width,y:t.top+_.y*t.height,i:1-Math.exp(-_.e*.5)})):[];for(let _ of e){let{r:I}=_,j=I.left+I.width/2,se=I.top+I.height/2,Y=0,J=0,ue=0,ve=0;for(let de of U){let Me=Math.min(Math.max(de.x,I.left),I.right),ge=Math.min(Math.max(de.y,I.top),I.bottom),it=Math.hypot(Me-de.x,ge-de.y),P=de.i*(a.length?D(de,{x:Me,y:ge},_):1)/(1+(it/I0)**2),G=j-de.x,F=se-de.y,K=Math.hypot(G,F)||1;Y+=P,J+=P*G/K,ue+=P*F/K,ve+=P*it}if(Y>0){ve/=Y;let de=Math.hypot(J,ue)||1;J/=de,ue/=de}else J=0,ue=1;if(Y=Math.min(1,Y*u),_.solid){if(L(_,"ro",_.rl,"opacity",Y<.02?"0":Math.min(1,Y*1.3).toFixed(2)),Y>=.02){let de=`${Math.round(Math.atan2(J,-ue)*180/Math.PI)}deg`;de!==_.ang&&(_.ang=de,_.rl.style.setProperty("--ang",de),pa.writes++)}}else{let de=Y<.03?0:Math.min(1,Y),Me=Math.atan2(ue,J);if(Math.abs(de-_.te)<.03&&Math.abs(Math.atan2(Math.sin(Me-_.ta),Math.cos(Me-_.ta)))<.06||(_.te=de,_.ta=Me,pa.writes++,_.el.classList.toggle("lit",de>0),!de))continue;let ge=_.el.style;ge.setProperty("--e",de.toFixed(2)),ge.setProperty("--ux",J.toFixed(2)),ge.setProperty("--uy",ue.toFixed(2)),ge.setProperty("--l",Math.min(2.2,.7+ve*.006).toFixed(2))}}}return y}var N0={normal:1.6,intense:2.6,max:4},H0={douce:.6,normale:1,forte:1.6,max:2.4},gu=[3,6,10,15],U0={drum:28,bass:345,lead:78},j0=[18,40,52,300],bu=[322,190,160,272],yu={bass:322,lead:190},xu=[0,7,2,9,4,11,6,1,8,3,10,5],wu=["optique","liquide","depoli","cristal","prisme"],G0={douce:{cfg:{DENSITY_DISSIPATION:2.8,VELOCITY_DISSIPATION:.8,CURL:16,SPLAT_RADIUS:.18,BLOOM_INTENSITY:.3,BLOOM_THRESHOLD:.7,SUNRAYS_WEIGHT:.6},gain:.6,shake:0,rise:.01,dose:{down:.35,move:.1,kick:[.06,.2],snare:[.03,.14],hat:[.02,.05],perc:[.02,.06],note:[.1,.25],stir:[.07,.13]}},normale:{cfg:{DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,CURL:24,SPLAT_RADIUS:.22,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,SUNRAYS_WEIGHT:.8},gain:.7,shake:0,rise:.012,dose:{down:.55,move:.16,kick:[.12,.4],snare:[.06,.28],hat:[.03,.1],perc:[.04,.12],note:[.15,.45],stir:[.1,.2]}},spectaculaire:{cfg:{DENSITY_DISSIPATION:1.5,VELOCITY_DISSIPATION:.4,CURL:32,SPLAT_RADIUS:.26,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.72,SUNRAYS_WEIGHT:1},gain:.92,shake:1,rise:.016,dose:{down:.7,move:.2,kick:[.2,.5],snare:[.15,.4],hat:[.15,.05],perc:[.12,.3],note:[.2,.55],stir:[.15,.3]}}};function ku(o,e,t){o=(o%360+360)%360/60;let a=Math.floor(o),s=o-a,i=t*(1-e),r=t*(1-s*e),n=t*(1-(1-s)*e),[l,u,c]=[[t,n,i],[r,t,i],[i,t,n],[i,r,t],[n,i,t],[t,i,r]][a%6];return{r:l,g:u,b:c}}function V0(o,{pad:e,xy:t}){let a=null,s="none",i=()=>{let P=new qa;P.ok&&(a=P,s="webgl")};o.settings.fluidEngine!=="webgl"&&xo.supported()?xo.create().then(P=>{P?(a=P,s=P.hdrScreen?"webgpu-hdr":"webgpu",P.onLost=()=>{a=null,i(),ge.place()}):i(),ge.place()}):setTimeout(()=>{i(),ge.place()});let r=matchMedia("(prefers-reduced-motion: reduce)"),n=o.settings,l=()=>!!n.fluid&&!r.matches,u=()=>!!n.glass,c=z0(e.el.closest(".app")||document.querySelector(".app"));c.onObstacles=P=>{a&&a.setObstacles&&a.setObstacles(P)};let h=()=>document.documentElement.dataset.theme!=="light",d=()=>G0[n.fluidStyle]||G0.spectaculaire,m=null,v=null,g=()=>n.glassSpill===!1?0:H0[n.glassLight]||H0.forte,f=()=>wu.includes(n.glassLook)?n.glassLook:"optique",p=()=>f()==="liquide",y=P=>{let G=n.fluidColors,F=P.part==="drum"||P.part===void 0;return G==="notes"?P.pc!==void 0?xu.indexOf(P.pc)*30:F?j0[P.lane||0]:U0[P.part]:G==="arc"?performance.now()/1e3*48+(F?(P.lane||0)*24:P.x*70):G==="neon"?F?bu[P.lane||0]:yu[P.part]+(P.x-.5)*30:F?j0[P.lane||0]:U0[P.part]+(P.x-.5)*(P.part==="lead"?70:40)},x=(P,G)=>{let F=n.fluidColors==="notes"||n.fluidColors==="arc"||n.fluidColors==="neon",K=n.lightLook||"aquarelle",W=ku(y(P),h()?n.fluidColors==="neon"?1:.82:K==="aquarelle"?.85:K==="vitrail"?.72:F?.42:.28,1),re=G*d().gain,ke={r:W.r*re,g:W.g*re,b:W.b*re};return c.emit(ke,1,P.x,P.y),ke},S=new Map,E=()=>n.fluidInk!=="maitrisee",L=(P,G=.8,F)=>{let K=d().dose[P],W=Array.isArray(K)?K[0]+K[1]*G:K;if(E())return W;if(n.fluidZone==="keys"&&o.ui.view==="pattern"&&(W*=P==="note"||P==="down"||P==="move"?.95:.6),F!==void 0){let re=performance.now(),ke=S.get(F)||{e:0,t:re};ke.e*=Math.exp(-(re-ke.t)/550),ke.t=re;let fe=W/(1+ke.e*2.2);return ke.e+=fe,S.set(F,ke),fe}return W},D=null,q=null,A=()=>{if(a)if(v&&m===v.el){let P=I();a.setKeys(P.map(([G,F,K,W])=>({x0:G,y0:F,x1:K,y1:W})),"mix|"+JSON.stringify(P))}else if(n.fluidZone==="keys"&&o.ui.view==="pattern"){let P=e.keyLayout();a.setKeys(P.keys,P.sig)}else a.setKeys(null,"all")},U=P=>P===e.el?"pad":P===t.el?"xy":"mix",_=null,I=()=>{if(_)return _;let P=v.el.getBoundingClientRect(),G=v.faders.map(F=>{let K=F.el.getBoundingClientRect();return[(K.left-P.left)/P.width,(K.top-P.top)/P.height,(K.right-P.left)/P.width,(K.bottom-P.top)/P.height].map(W=>Math.round(W*1e4)/1e4)});return P.width>0&&(_=G),G},j=P=>Math.pow(Math.max(0,(P+40)/46),1.6),se=()=>{let P=o.project.parts,G=v.faders.map(W=>{let re=W.part==="drum"?P.drum.level[W.lane]:P[W.part].level,ke=W.part==="drum"?P.drum.mute[W.lane]:P[W.part].mute,fe=Pa(getComputedStyle(W.el).getPropertyValue("--fc")),Ke=ke?.3:1;return[fe[0]*Ke,fe[1]*Ke,fe[2]*Ke,Math.round(Math.min(1,j(re))*1e3)/1e3]}),F=parseFloat(getComputedStyle(v.faders[0].el).borderTopLeftRadius)||16,K=Tr({kind:"mix",keys:null,sig:"mix",el:v.el,glass:!0,hdr:Me(),slabs:I(),fills:G,spill:g(),radius:F,look:n.lightLook,gel:.8,glassLook:f()});K.sig!==D&&(D=K.sig,q=K,a.setExtended&&a.setExtended(de()),a.setScene(K))},Y=()=>{let P=fe=>[.18+.64*fe,.72-.38*Math.sin(fe*Math.PI)],G=it(),F=26,K=0,[W,re]=P(0);ge.press("preview",W,re,"down");let ke=()=>{K++;let[fe,Ke]=P(K/F);if(K<F){ge.press("preview",fe,Ke,"move"),p()&&c.emit({r:G[0],g:G[1],b:G[2]},.18,fe,Ke),setTimeout(ke,40);return}ge.press("preview",fe,Ke,"up");let Ut=performance.now(),Xe=()=>{if(!a)return;let ut=(performance.now()-Ut)/1800;if(ut>=1){a.aimReset();return}let $e=Math.PI*(.72-.55*Math.sin(ut*Math.PI));a.aim([Math.cos($e)*.78,Math.sin($e)*.78,.62]),requestAnimationFrame(Xe)};requestAnimationFrame(Xe)};setTimeout(ke,40)},J=[],ue=(P,G)=>{let F=performance.now(),K=J[P];K.e=(K.e||0)*Math.exp(-(F-(K.te||F))/420),K.te=F;let W=G/(1+K.e*3);return K.e+=W,W},ve=P=>{if(!a||!v||m!==v.el)return;let G=performance.now(),F=I(),K=[];v.faders.forEach((W,re)=>{let ke=W.part==="drum"?P.d[W.lane]:P[W.part],fe=Math.max(0,Math.min(1,(20*Math.log10(Math.max(ke||0,1e-5))+48)/48));K[re]=fe;let Ke=J[re]||(J[re]={env:0,t:0}),Ut=fe>Ke.env+.15&&fe>.45;if(Ke.env=Math.max(fe,Ke.env*.9),!l()||!F[re])return;let[Xe,ut,$e,rt]=F[re],mt=(Xe+$e)/2,Os=$e-Xe,wa=rt-ut,tt=rt-wa*.06,gs={part:W.part,lane:W.lane,x:mt,y:tt},bs=.012+.03*fe;Ut?(a.splat(mt,tt,(Math.random()-.5)*Os*.08,-bs*2.2,x(gs,ue(re,.18+.4*fe)),.9),W.part==="drum"&&W.lane===0&&a.pulse(.7*fe),Ke.t=G):fe>.5&&G-Ke.t>160&&(a.splat(mt+(Math.random()-.5)*Os*.4,tt,0,-bs,x(gs,ue(re,.05*fe*fe)),.6),Ke.t=G)}),a.setMeters(K)},de=()=>h()||n.hdrLight!==!1,Me=()=>s==="webgpu-hdr"&&de()?N0[n.fluidHdr]||N0.intense:1,ge={get fluid(){return a},spillStats:pa,engine:()=>s,place(){let P=o.ui.view,G=P==="mix"&&!!v&&n.mixGlass!==!1,F=P==="pattern"?e.el:P==="tweaks"?t.el:G?v.el:null,K=!!a&&!!F&&(l()||u()||G);e.gpu=K&&F===e.el,t.gpu=K&&F===t.el,e.inkUnder=e.gpu&&l();for(let re of[e.el,t.el,v&&v.el])re&&re.classList.toggle("gpu-host",K&&re===F);for(let re of[e.el,t.el])K&&re===F&&u()?re.dataset.glass=f():delete re.dataset.glass;if(!K){a&&a.detach(),m=null,c.enable(!1),e.draw(),P==="tweaks"&&t.draw();return}a.setStyle(G?{...d().cfg,DENSITY_DISSIPATION:Math.max(2.6,d().cfg.DENSITY_DISSIPATION)}:d().cfg),a.gelOn=!r.matches,a.inkOn=l(),c.enable((u()||G)&&n.glassSpill!==!1),c.setPower(g());let W=gu.includes(+n.ctrlHeight)?+n.ctrlHeight:6;c.setHeight(W),a.setControlHeight&&a.setControlHeight(W),requestAnimationFrame(()=>c.layout(F,U(F))),m!==F&&(a.clear(),m=F),a.attach(F),_=null,D=null,ge.syncScene(),A(),F===e.el?e.draw():F===t.el&&t.draw()},setMix(P){v=P,_=null,!P&&m&&m!==e.el&&m!==t.el&&(a&&a.detach(),m=null)},syncScene(){if(!m||!a)return;if(v&&m===v.el)return se();let P=m===e.el,G=P?e.keyLayout():null,F=Tr({kind:P?"pad":"xy",keys:G&&G.keys,sig:G?G.sig:"xy",el:m,glass:!!n.glass,hdr:Me(),spill:g(),look:n.lightLook,gel:P&&e.piano?.4:1,glassLook:f()});F.sig!==D&&(D=F.sig,q=F,a.setExtended&&a.setExtended(de()),a.setScene(F))},press(P,G,F,K){if(!(!a||!m||!a.press)&&(a.press(P,G,F,K),K==="down"&&u()&&p())){let W=it();c.emit({r:W[0],g:W[1],b:W[2]},.45,G,F)}},tilt(P,G){a&&(P===null?a.resetTilt():a.setTilt(P,G))},touch(P,G,F,K,W,re,ke,fe){if(!m||!l())return;A();let Ke={part:P,lane:ke,pc:fe,x:G,y:F};if(re==="down")a.burst(G,F,x(Ke,L("down",.8,"f"+Math.round(G*24))),.5,5,.7);else if(K||W){let Ut=E()?1:Math.min(1,Math.max(.25,Math.hypot(K,W)*45)),Xe=L("move",.8,"m"+P+(ke||0))*Ut*(!E()&&n.fluidZone==="keys"?.7:1);a.splat(G,F,K,W,x(Ke,Xe),1)}},note(P,G,F,K,W=.8,re){if(ge.held||!m||o.ui.view!=="pattern"||!l())return;A();let ke={part:P,lane:K,pc:re,x:G,y:F};if(P==="drum"){let Xe="d"+K;if(K===0)a.burst(G,F,x(ke,L("kick",W,Xe)),1.2*W+.4,7,1.1),a.pulse(.8);else if(K===1){let ut=x(ke,L("snare",W,Xe));a.splat(G,F,.03,-.004,ut,.8),a.splat(G,F,-.03,-.004,ut,.8)}else if(K===2)a.splat(G,F,(Math.random()-.5)*.01,-.02,x(ke,L("hat",W,Xe)),.35);else{let ut=x(ke,L("perc",W,Xe));for(let $e=0;$e<3;$e++){let rt=$e/3*Math.PI*2;a.splat(G+Math.cos(rt)*.03,F+Math.sin(rt)*.03,-Math.sin(rt)*.025,Math.cos(rt)*.025,ut,.5)}}return}let fe=d().rise,Ke=n.fluidZone==="keys",Ut=L("note",W,Ke?P+Math.round(G*24):P)*(!E()&&e.hasStrokes(P)?.5:1);a.splat(G,F,(Math.random()-.5)*fe*.8,-fe,x(ke,Ut),.9)},stir(P,G,F,K,W,re){if(!m||o.ui.view!=="tweaks"||!l())return;let ke=P==="bass"||P==="lead",fe={part:ke?P:"drum",lane:ke?0:+P.slice(1),x:G,y:F};a.splat(G,F,K,W,x(fe,re?L("stir",1):L("stir",0)),re?1:.7)},level(P){if(!ge.held&&!(!m||!P.trig||!l()))for(let G=0;G<P.trig.length;G+=4)P.trig[G]!==0||P.trig[G+1]!==0||(a.pulse(.6),d().shake&&a.push(.5,1.02,0,-.05,5))},keyLights(P){ge.held||a&&a.setKeyLights&&m===e.el&&a.setKeyLights(P)},mixLevels(P){ge.held||P&&ve(P)},preview(){if(!m)return;if(!l()){Y();return}if(A(),v&&m===v.el){let F=K=>({d:[0,1,2,3].map(W=>W===K?1:.01),bass:K===4?1:.01,lead:K===5?1:.01});for(let K=0;K<6;K++)setTimeout(()=>ve(F(K)),K*140);setTimeout(()=>ve({d:[1,.9,.8,.9],bass:1,lead:1}),950),setTimeout(()=>ve({d:[.01,.01,.01,.01],bass:.01,lead:.01}),1500);return}let P=o.ui.part,G=(F,K)=>setTimeout(K,F);if(P==="drum")[[0,0],[180,2],[360,1],[540,2],[720,0],[820,3],[900,2],[1080,1],[1260,0],[1350,3]].forEach(([F,K])=>G(F,()=>ge.note("drum",(K+.5)/4,.55+Math.random()*.25,K,.95)));else{let F=e.piano?e.pianoLayout().keys.filter(W=>!W.black):e.columns(),K=F.length;for(let W=0;W<8;W++){let re=Math.min(K-1,Math.round(W/7*(K-1))),ke=F[re],fe=e.piano?(ke.pos+.5)/e.pianoLayout().whites:(re+.5)/K;G(W*150,()=>ge.note(P,fe,.8-W*.05,0,.95,e.pitchClass(ke.deg,ke.acc)))}G(1250,()=>{a.pulse(1),d().shake&&a.push(.5,1.02,0,-.06,5)})}}};r.addEventListener&&r.addEventListener("change",()=>ge.place()),document.addEventListener("visibilitychange",()=>{a&&(document.visibilityState!=="visible"?a.stop():m&&(a.requestRender(),c.layout(m,U(m))))}),window.addEventListener("resize",()=>{m&&(c.layout(m,U(m)),v&&m===v.el&&(_=null,A(),ge.syncScene()))});let it=()=>q&&q.accent||[.8,.9,.3];return ge}var W0=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,Y0=`#version 300 es
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
}`,K0=`#version 300 es
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
}`,fi=`#version 300 es
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
}`;var mi=11,Ir=mi*4,X0=96,Fr=24;function $0(o,e,t,a){let s=o.createShader(e);return o.shaderSource(s,t),o.compileShader(s),o.getShaderParameter(s,o.COMPILE_STATUS)||a.push(o.getShaderInfoLog(s)||"shader"),s}function Q0(o,e,t,a,s){let i=o.createProgram();o.attachShader(i,$0(o,o.VERTEX_SHADER,e,a)),o.attachShader(i,$0(o,o.FRAGMENT_SHADER,t,a)),(s||[]).forEach((l,u)=>o.bindAttribLocation(i,u,l)),o.linkProgram(i),o.getProgramParameter(i,o.LINK_STATUS)||a.push(o.getProgramInfoLog(i)||"link");let r={},n=o.getProgramParameter(i,o.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let u=o.getActiveUniform(i,l);r[u.name.replace(/\[0\]$/,"")]=o.getUniformLocation(i,u.name)}return{p:i,u:r}}var pi=class{constructor(e){this.errors=[],this.canvas=document.createElement("canvas"),this.canvas.className="ghouls",this.canvas.setAttribute("aria-hidden","true"),e.insertBefore(this.canvas,e.firstChild),this.data=new Float32Array(X0*Ir),this.lost=!1,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.lost=!0}),this.canvas.addEventListener("webglcontextrestored",()=>{this.lost=!1,this.init()}),this.init()}init(){let e=this.canvas.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(this.gl=e,this.ok=!!e,!e)return;this.errors=[],this.night=Q0(e,W0,Y0,this.errors,["aPos"]);let t=["aCorner","iRect","iPlate","iDoll","iAnimA","iAnimB","iAnimC","iColor","iPoseA","iPoseB","iPoseC","iPoseD"];if(this.dolls=Q0(e,K0,fi,this.errors,t),this.errors.length){this.ok=!1;return}this.tri=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.tri),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),this.vaoNight=e.createVertexArray(),e.bindVertexArray(this.vaoNight),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.vaoDolls=e.createVertexArray(),e.bindVertexArray(this.vaoDolls),this.corner=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.corner),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.inst=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.inst),e.bufferData(e.ARRAY_BUFFER,this.data.byteLength,e.DYNAMIC_DRAW);for(let a=0;a<mi;a++)e.enableVertexAttribArray(1+a),e.vertexAttribPointer(1+a,4,e.FLOAT,!1,Ir*4,a*16),e.vertexAttribDivisor(1+a,1);e.bindVertexArray(null),this.keyRects=new Float32Array(Fr*4),this.keyInfo=new Float32Array(Fr*4)}resize(e,t,a){let s=Math.max(1,Math.round(e*a)),i=Math.max(1,Math.round(t*a));(this.canvas.width!==s||this.canvas.height!==i)&&(this.canvas.width=s,this.canvas.height=i),this.scale=s/Math.max(e,1)}draw(e){let t=this.gl;if(!this.ok||this.lost||!t)return;let a=this.canvas.width,s=this.canvas.height,i=this.scale;t.viewport(0,0,a,s),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA);let r=this.night,n=r.u;t.useProgram(r.p),t.uniform2f(n.uRes,a,s),t.uniform1f(n.uScale,i),t.uniform1f(n.uTime,e.time);let l=e.pad||{x:-1e4,y:-1e4,w:1,h:1,r:0};t.uniform4f(n.uPad,l.x,l.y,l.w,l.h),t.uniform1f(n.uPadR,l.r),t.uniform1f(n.uStage,e.pad&&e.stage?1:0);let u=(e.keys||[]).slice(0,Fr);this.keyRects.fill(0),this.keyInfo.fill(0),u.forEach((h,d)=>{this.keyRects.set([h.x0,h.y0,h.x1,h.y1],d*4),this.keyInfo.set([h.black?1:0,h.lit||0,0,0],d*4)}),n.uKeys&&t.uniform4fv(n.uKeys,this.keyRects),n.uKeyInfo&&t.uniform4fv(n.uKeyInfo,this.keyInfo),t.uniform1f(n.uNKeys,u.length),t.uniform3f(n.uAccent,e.accent[0],e.accent[1],e.accent[2]),t.uniform1f(n.uWatch,e.watch),t.uniform1f(n.uBeat,e.beat),t.uniform1f(n.uCalm,e.calm?1:0),t.bindVertexArray(this.vaoNight),t.drawArrays(t.TRIANGLES,0,3);let c=Math.min(e.dolls,X0);if(c>0){let h=this.dolls,d=h.u;t.useProgram(h.p),t.uniform2f(d.uRes,a,s),t.uniform1f(d.uScale,i),t.uniform1f(d.uTime,e.time),t.uniform1f(d.uFlicker,e.flicker),t.uniform1f(d.uWatch,e.watch),t.uniform1f(d.uCalm,e.calm?1:0),d.uMoon&&t.uniform3f(d.uMoon,.55,.7,.45),t.bindVertexArray(this.vaoDolls),t.bindBuffer(t.ARRAY_BUFFER,this.inst),t.bufferSubData(t.ARRAY_BUFFER,0,e.data,0,c*Ir),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,c)}t.bindVertexArray(null)}destroy(){let e=this.gl;if(e){let t=e.getExtension("WEBGL_lose_context");t&&t.loseContext()}this.canvas.remove(),this.ok=!1}};var le={PUMPKIN:0,VOODOO:1,GHOST:2,SKULL:3,MUMMY:4,FRANK:5,SKELETON:6},Su=o=>10+o,De={CAULDRON:20,SKULL:21,PUMPKIN:22,HEART:23,CRYSTAL:24,BAT_L:25,BAT_R:26,DIE:27,HOURGLASS:28,BROOM:29,COFFIN:30,WEB:31,POTION:32,VIALS:33,BOOK:34},Z0=[[".top .logo",De.CAULDRON,"fill"],[".top .tbtn.rec",De.SKULL,"fill","rec"],[".top .tbtn.play",De.PUMPKIN,"fill","play"],[".top .progress",-1,"plate"],[".top .chip.tempo",De.HEART,"left","tempo"],[".top .chip:not(.tempo)",De.CRYSTAL,"left"],[".parts .ptab",o=>Su({drum:le.PUMPKIN,bass:le.FRANK,lead:le.GHOST}[o.dataset.p]??le.GHOST),"face","part"],[".inst .arrow:not(.dice)",(o,e)=>e===0?De.BAT_L:De.BAT_R,"fill"],[".inst .dice",De.DIE,"fill","dice"],[".view .controls .dial",-1,"plate"],[".view .range",-1,"plate"],[".timeline .tbtn",(o,e)=>[De.HOURGLASS,De.BROOM,De.COFFIN][e]??De.COFFIN,"fill","tool"],[".timeline .tl",-1,"plate"],[".groups .grp",-1,"plate"],[".autobar .pill",-1,"plate"],[".faders .fader",-1,"plate"],[".faders .fader .m",-1,"plate"],[".mixknobs .dial",-1,"plate"],[".nav button",(o,e)=>[De.WEB,De.POTION,De.VIALS,De.BOOK][e]??De.WEB,"nav","nav"]],fs=(o,e)=>o+Math.random()*(e-o),yi=(o,e,t)=>Math.max(e,Math.min(t,o)),Bt=o=>(o=yi(o,0,1),o*o*(3-2*o)),So=(o,e,t)=>o+(e-o)*t,xi=(o,e,t)=>[So(o[0],e[0],t),So(o[1],e[1],t),So(o[2],e[2],t)],vi={[le.PUMPKIN]:[[-.42,-.66,.08],[.42,-.66,.08]],[le.VOODOO]:[[-.64,-.2,.04],[.64,-.2,.04]],[le.GHOST]:[[-.6,-.12,.05],[.6,-.12,.05]],[le.SKULL]:[[-.4,-.6,.12],[.4,-.6,.12]],[le.MUMMY]:[[-.5,-.38,.4],[.5,-.38,.4]],[le.FRANK]:[[-.46,-.78,.08],[.46,-.78,.08]],[le.SKELETON]:[[-.32,-.6,.06],[.32,-.6,.06]]},zr=["hip","twist","ll","lr","fxl","fxr","lz","crouch","travel","roll","spin","bounce","head","bend"],Mu={[le.PUMPKIN]:[1,.1],[le.VOODOO]:[.95,.4],[le.GHOST]:[1,.3],[le.SKULL]:[.9,.3],[le.MUMMY]:[.9,.45],[le.FRANK]:[.85,.5],[le.SKELETON]:[.9,.35]},te=(o,e,t={})=>{let a={hl:o,hr:e};for(let s of zr)a[s]=t[s]||0;return t.lz===void 0&&(a.lz=1),a},Yt=(o,e,t)=>{let a={hl:xi(o.hl,e.hl,t),hr:xi(o.hr,e.hr,t)};for(let s of zr)a[s]=So(o[s],e[s],t);return a},wo=(o,e)=>t=>{let a=o.length,s=(t%e+e)%e,i=a-1;for(let l=0;l<a;l++)o[l][0]<=s&&(i=l);let r=o[i][0];r>s&&(r-=e);let n=i+1<a?o[i+1][0]:o[0][0]+e;return n<=r&&(n+=e),Yt(o[i][1],o[(i+1)%a][1],Bt((s-r)/(n-r)))},gi=(o,e,{rate:t=2,lift:a=.5,lz:s=1,bounce:i=.05}={})=>{let r={...o,hl:o.hl.slice(),hr:o.hr.slice()},n=e*t,l=n-Math.floor(n),u=l<.5?Math.sin(Math.PI*l/.5):0,c=Math.floor(n)%2===0;return r.ll=Math.max(r.ll,c?a*u:0),r.lr=Math.max(r.lr,c?0:a*u),a&&(r.lz=s),r.crouch+=i*(1-u),r},Tu=(o,e)=>{let t=o.length,a=Math.floor(e)%t,s=e-Math.floor(e);return Yt(o[(a+t-1)%t],o[a],Bt(s/.22))},J0=te([-.05,.18,.36],[.78,.48,.1],{roll:.32,head:-.06,twist:-.2,bend:.9}),ko=(o,e)=>{let t=o-Math.floor(o);return t<e?Math.sin(Math.PI*t/e):0},Eu=o=>Math.tanh(2.5*o)/Math.tanh(2.5),bi=(o,e,t=.1,a=2,s={})=>{let i=Math.PI*2*a*o;return te([e[0]-.12+t*Math.cos(i),e[1]+t*Math.sin(i),e[2]],[e[0]+.12-t*Math.cos(i),e[1]-t*Math.sin(i),e[2]],{bend:1,...s})},It={passinho:{name:"Passinho do Jamal",weight:4,at(o){let e=te([-.12,-.2,.5],[.48,-.45,.15],{bend:1,crouch:.22}),t=te([-.8,-.45,-.05],[-.15,-.15,.45],{bend:1,crouch:.25,twist:-.75,hip:.08}),a=te([-.5,-.12,.38],[.5,-.3,.38],{bend:1,crouch:.2,roll:.04}),s=te([-.5,-.3,.38],[.5,-.12,.38],{bend:1,crouch:.2,roll:-.04}),i=te([.05,-.22,.48],[-.05,-.06,.48],{bend:1,crouch:.18,twist:1,hip:-.08,fxl:.02,fxr:-.02}),r=te([.05,-.08,.48],[-.05,-.2,.48],{bend:1,crouch:.2,twist:.95,hip:-.08}),n=te([-.6,-.2,.3],[.55,-.25,.3],{bend:1,crouch:.22,twist:.3}),l=wo([[0,e],[.6,t],[1.2,a],[1.6,s],[2,i],[2.5,r],[2.9,i],[3.3,n]],4)(o),u=o*2,c=u-Math.floor(u),h=c<.55?Math.sin(Math.PI*c/.55):0,d=Math.floor(u)%2===0;return l.ll=Math.max(l.ll,d?.55*h:0),l.lr=Math.max(l.lr,d?0:.55*h),l.fxl+=d?-.06*h:0,l.fxr+=d?0:.06*h,l.crouch+=.06*(1-h),l.bounce=-.03*h,l}},rat:{name:"Danse du rat",weight:3,at(o){let e=te([.3,-.18,.46],[.66,-.3,.26],{bend:1,spin:-.6,twist:-.25,crouch:.2,roll:-.1}),t=te([-.3,-.05,.45],[.3,-.05,.45],{bend:1,crouch:.16,head:.03}),a=te([-.66,-.15,.2],[.55,.1,.25],{bend:1,crouch:.22,roll:.08}),s=wo([[0,e],[.55,t],[1.05,a],[1.5,t]],2)(o);return gi(s,o,{rate:4,lift:.6,lz:-.6,bounce:.05})}},dakoto:{name:"Da Koto Nai",weight:2,at(o){let e=te([-.82,.05,.12],[.82,.05,.12],{bend:1,crouch:.28,fxl:-.1,fxr:.1}),t=te([-.12,-.32,.48],[.55,.42,.28],{bend:1,crouch:.2,spin:.45,roll:.06}),a=te([-.75,-.55,.22],[.75,-.55,.22],{bend:1,crouch:.42,fxl:-.18,fxr:.18}),s;return o<1.5?s=bi(o,[0,-.25,.48],.1,2,{crouch:.2}):o<2.5?s=Yt(bi(1.5,[0,-.25,.48],.1,2,{crouch:.2}),e,Bt((o-1.5)/.35)):o<5.5?(s=Yt(e,t,Bt((o-2.5)/.35)),s.head=.05*ko(o,.5)):o<6.5?s=Yt(t,bi(o,[0,-.25,.48],.1,2,{crouch:.2}),Bt((o-5.5)/.3)):s=Yt(bi(6.5,[0,-.25,.48],.1,2,{crouch:.2}),a,Bt((o-6.5)/.3)),gi(s,o,{rate:2,lift:.2,bounce:.08})}},floss:{name:"Floss",weight:2,at(o){if(o>7)return J0;let e=Eu(Math.sin(Math.PI*2*o)),t=Math.cos(Math.PI*2*o);return te([-.16+.62*e,-.66,.34*t],[.16+.62*e,-.66,-.34*t],{hip:-.2*e,twist:.18*e,crouch:.1+.06*Math.abs(e),bounce:.03*Math.abs(e),fxl:-.04*e,fxr:-.04*e})}},riri:{name:"RiRiRi : Joyeux Halloween",weight:3,at(o){let e=te([-.32,.32,.46],[.32,.32,.46],{bend:1,crouch:.15,roll:.1}),t=te([-.1,-.2,.5],[.3,-.1,.45],{bend:1,spin:1.3,ll:1,crouch:.1}),a=te([-.55,.55,.3],[.55,.15,.3],{bend:1,crouch:.2}),s=te([-.55,.15,.3],[.55,.55,.3],{bend:1,crouch:.2}),i=te([-.6,.85,.2],[.6,.85,.2],{bend:.4,bounce:-.08}),r=te([-.85,-.2,.3],[.4,.15,.35],{bend:.8,crouch:.42,roll:-.12}),n=te([-.2,-.18,.5],[.2,-.18,.5],{bend:1,crouch:.18}),l=te([-.3,-.45,.3],[.06,.12,.5],{bend:1,roll:.2,crouch:.15}),u=wo([[0,e],[1,t],[2,a],[2.5,s],[3,i],[4,r],[5.5,n],[6.5,l],[7.2,i]],8)(o);return o>=5.5&&o<6.5&&(u.travel=.12*Math.sin(Math.PI*2*(o-5.5))),gi(u,o,{rate:2,lift:.32,bounce:.05})}},nervy:{name:"Danse nerveuse",weight:2,at(o){let e=te([.1,-.3,.46],[.72,.72,.15],{bend:.6,crouch:.2}),t=te([-.3,-.1,.45],[.3,-.2,.8],{bend:.5,crouch:.22,roll:.15,spin:-.3}),a=te([-.4,.15,.35],[.4,.15,.35],{bend:1,crouch:.25}),s=wo([[0,e],[2,t],[4.5,a],[6,e],[7,a]],8)(o),i=Math.sin(Math.PI*2*6*o);if(s.hl[0]+=.03*i,s.hl[1]+=.02*Math.sin(Math.PI*2*7*o),s.hr[0]-=.03*i,s.hip+=.03*i,o>=4.5&&o<6){let r=Math.sin(Math.PI*2*4*o);s.fxl=.06*r,s.fxr=-.06*r}return gi(s,o,{rate:4,lift:.2,bounce:.03})}},ambiguous:{name:"Danse d\u2019Ambiguous Kim",weight:2,len:32,at(o){let e=s=>{let i=te([-.2,-.78,.3],[.2,-.78,.3],{crouch:.05,fxl:.03,fxr:-.03,head:.04,bounce:.02}),r=te([-.3,-.62,.22],[.3,-.62,.22],{bend:1,head:.06,bounce:-.03}),n=te([-.3,-.6,.22],[.3,-.6,.22],{bend:1,crouch:.14,head:.04}),l=te([-.34,-.5,.2],[.34,-.5,.2],{bend:1,ll:1,roll:.05,bounce:-.08}),u=te([-.36,-.66,.12],[.36,-.66,.12],{bend:.3,lr:.6,lz:-1,fxr:.14,crouch:.1}),c=te([-.12,-.3,.46],[.12,-.3,.46],{bend:1,ll:1,bounce:-.07}),h=te([-.36,-.62,.15],[.36,-.62,.15],{bend:.3,crouch:.2,fxr:.15}),d=te([-.46,-.72,.14],[.46,-.72,.14],{crouch:.38,fxl:-.08,fxr:.34,hip:-.12,travel:-.1,roll:.06,bounce:.06}),m=te([.16,-.15,.48],[-.16,-.1,.46],{bend:1,twist:.15,crouch:.2,fxr:.18}),v=te([-.08,1.1,.1],[.08,1.1,.1],{bend:.7,ll:.8,bounce:-.08}),g=te([-.48,.42,.1],[.48,.42,.1],{bend:1,ll:1,bounce:-.08}),f=te([-.62,.95,.1],[-.2,1,-.05],{bend:.4,ll:.6,roll:.15}),p=te([-.22,.9,.1],[.22,.9,.1],{bend:.8,ll:1,bounce:-.08}),y=te([-.25,0,.45],[.58,1,.05],{bend:.6,ll:.8,roll:-.12}),x=te([-.08,1.1,.1],[.08,1.1,.1],{bend:.7,bounce:-.05}),S=te([-.1,-.3,.45],[.1,-.26,.45],{bend:.8,crouch:.06});return wo([[0,i],[.35,i],[.5,r],[1,n],[1.5,l],[2,u],[2.5,c],[3,h],[3.3,d],[4.75,d],[5,m],[5.25,v],[5.75,g],[6,f],[6.5,p],[6.75,g],[7,y],[7.25,x],[7.5,S]],8)(s)},t;if(o<16)t=e(o%8);else if(o<21)t=e(o-16);else if(o<31){let s=o-21,i=ko(s,.55),r=.06*Math.sin(Math.PI*4*s),n=te([-.14-r,1.12,.04],[.16+r,1.1,.04],{bend:.85,spin:-.6,head:-.04,roll:.06});t=Yt(e(5),n,Bt(s/.5)),t.ll=.95*i,t.lz=.8,t.bounce=.03*(1-i)-.09*i,t.crouch=.08+.12*(1-i)}else t=Yt(te([-.14,1.12,.04],[.16,1.1,.04],{bend:.85,spin:-.6}),te([-.2,-.78,.3],[.2,-.78,.3],{crouch:.05,head:.04}),Bt((o-31)/.8));let a=o<21?o%8:0;if(a>=3.3&&a<4.75){let s=ko(a,.5);t.crouch+=.05*s,t.bounce+=.04*s}return t}},bemsolto:{name:"Passo bem solto",weight:1,at(o){if(o>7)return J0;let e=Math.sin(Math.PI*o),t=ko(o,.5),a=Math.floor(o)%2?-1:1;return te([-.58-.1*e,-.3+.28*t*(a>0?1:.3),.2],[.58-.1*e,-.3+.28*t*(a<0?1:.3),.2],{ll:a<0?.8*t:0,lr:a>0?.8*t:0,fxl:a<0?-.12*t:0,fxr:a>0?.12*t:0,crouch:.15+.12*(1-t),twist:.3*e,hip:.1*e,roll:.12*e,travel:.1*e,bounce:.06*t,bend:.5})}},slick:{name:"Slick back",weight:1,at(o){let e=o*2,t=Math.floor(e)%2===0,a=Math.sin(Math.PI*(e-Math.floor(e))),s=Math.sin(Math.PI*o/4);return te([-.44-.06*s,-.5+.05*a,.12],[.44-.06*s,-.48+.05*a,.12],{ll:t?.9*a:0,lr:t?0:.9*a,lz:-1.6,crouch:.14,travel:.28*s,hip:.05*(t?1:-1)*a,twist:-.08*s,roll:-.05*s,head:.04,bend:.3})}},goule:{name:"Danse de la goule",weight:1,at(o){let e=[te([-.3,-.06,.26],[.3,-.06,.26],{roll:.25,twist:.2,crouch:.15,bend:1}),te([-.8,-.22,.05],[.26,-.58,.18],{roll:-.3,twist:-.25,ll:.5,fxl:-.1,crouch:.25,bend:1}),te([-.42,.28,.16],[.42,.28,.16],{roll:.12,head:.04,bend:1}),te([.18,-.6,.3],[-.18,-.6,.32],{roll:-.22,twist:.3,lr:.5,fxr:.1,crouch:.2,bend:1})];return Tu(e,o*2)}},zombies:{name:"Danse des zombies",weight:1,at(o){let e=o%4,t=e<2?-1:1,a=e%2,s=Math.max(0,Math.sin(Math.PI*2*a))*.08,i=ko(a*2,.7);return te([.5*t-.22,-.12+s,.42],[.5*t+.22,-.1+s,.46],{roll:.3*t,hip:.1*t*Math.sin(Math.PI*a),twist:.2*t,bounce:s*.6,bend:.15,ll:t<0?.55*i:0,lr:t>0?.55*i:0,lz:-.8,crouch:.12,travel:.12*t*Bt(a)})}}};function wi(){let o=Object.keys(It),e=o.reduce((a,s)=>a+It[s].weight,0),t=Math.random()*e;for(let a of o)if(t-=It[a].weight,t<=0)return a;return o[0]}var ps=class{constructor(e,t){this.type=e,this.seed=t,this.sq=0,this.sqv=0,this.sqT=0,this.hx=0,this.hy=0,this.hvx=0,this.hvy=0,this.sw=0,this.swv=0,this.lx=0,this.ly=0,this.ltx=0,this.lty=0,this.blink=0,this.blinkAt=performance.now()+fs(800,4e3),this.mouth=0,this.mouthT=0,this.glow=0,this.glowT=0,this.scare=0,this.reach=0,this.reachT=0,this.held=0,this.color=[1,.55,.15],this.twitchAt=performance.now()+fs(3e3,12e3),this.ink=0,this.dance=null,this.spot=0,this.rise=1,this.swapTo=null;let a=vi[e]||vi[le.PUMPKIN];this.p=te(a[0].slice(),a[1].slice())}press(e=1){this.held++,this.dance=null,this.sqT=.32*e,this.sqv-=2.5*e,this.mouthT=1,this.scare=1,this.hvy-=3.5*e,this.hvx+=fs(-2.5,2.5)*e,this.swv+=fs(-3,3)*e}release(){this.held=Math.max(0,this.held-1),this.held||(this.sqT=0,this.mouthT=0,this.sqv-=3.5,this.hvx+=fs(-2,2))}sing(e=.8,t){this.mouth=Math.max(this.mouth,Math.min(1,.45+e*.6)),this.glow=Math.max(this.glow,Math.min(1,e)),this.sqv-=2.2*e,this.hvy+=1.5*e,t&&(this.color=t)}startle(e){e<=.02||(this.scare=Math.max(this.scare,e),this.sqv-=3*e,this.hvx+=fs(-3,3)*e,this.hvy+=2*e)}step(e,t,a,s){let i=a?.5:1,r=this.sqT+(a?0:.018*Math.sin(t/700+this.seed*9)),n=vi[this.type]||vi[le.PUMPKIN],l=a?0:.04*Math.sin(t/900+this.seed*7),u=te([n[0][0],n[0][1]+l,n[0][2]],[n[1][0],n[1][1]-l,n[1][2]]);if(this.reach>.01){let[p,y]=Mu[this.type]||[.95,.4];u=Yt(u,te([-p,y,.16],[p,y,.16]),this.reach)}if(this.swapTo!==null&&this.outT!==void 0){let p=this.outT,y=Math.sin(t/85);p<.35?u=Yt(u,te([-.42,-.55,.1],[.62+.14*y,.78,.18],{roll:.06*y,bend:.4}),Bt(p/.08)):u=Yt(u,te([-.55-.08*y,.85,.1],[.55-.08*y,.85,.1],{roll:.16*Math.sin(t/70),hip:.08*y}),Bt((p-.35)/.12))}if(this.inT!==void 0){let p=this.inT,y=Math.sin(t/75);p<.6?u=te([-.45,-.5,.1],[.28+.1*y,1.05,.12],{roll:p>.35?.12*Math.sin(t/160):0}):p<.82?u=te([-.72,.82,.1],[.72,.82,.1],{spin:Math.PI*2*Bt((p-.6)/.2)}):u=Yt(te([-.72,.82,.1],[.72,.82,.1],{roll:.18*y}),u,Bt((p-.82)/.18))}let c=0;if(this.dance&&!a){let p=this.dance,y=s-p.start;if(y>=p.len||y<-1)this.dance=null;else if(y>=0){let x=It[p.name].at(y),S=Bt(Math.min(y/.25,(p.len-y)/.25,1));u=Yt(u,x,S),r+=x.bounce*S,c=S}}let h=1-Math.exp(-e*22),d=this.p;d.hl=xi(d.hl,u.hl,h),d.hr=xi(d.hr,u.hr,h);for(let p of zr)p!=="spin"&&p!=="bounce"&&(d[p]=So(d[p],u[p],h));d.spin=u.spin,this.spot+=(c-this.spot)*(1-Math.exp(-e*6)),this.sqv+=(-(this.sq-r)*340-this.sqv*15)*e,this.sq=yi(this.sq+this.sqv*e,-.35,.5),this.hvx+=(-this.hx*180-this.hvx*9)*e,this.hx+=this.hvx*e,this.hvy+=(-(this.hy-d.head)*220-this.hvy*10)*e,this.hy+=this.hvy*e,this.hx=yi(this.hx,-.25,.25),this.hy=yi(this.hy,-.2,.2);let m=a?0:.1*Math.sin(t/1300+this.seed*5)*i;this.swv+=(-(this.sw-m)*90-this.swv*7)*e,this.sw+=this.swv*e;let v=1-Math.exp(-e*10);this.lx+=(this.ltx-this.lx)*v,this.ly+=(this.lty-this.ly)*v,t>this.blinkAt&&(this.blinkStart=t,this.blinkAt=t+fs(1800,6e3)*(a?1.6:1));let g=this.blinkStart?(t-this.blinkStart)/140:9;this.blink=g<1?Math.sin(g*Math.PI):0,!a&&t>this.twitchAt&&(this.twitchAt=t+fs(6e3,16e3),this.hvx+=fs(-4,4),this.swv+=fs(-4,4));let f=1-Math.exp(-e*(this.mouthT>this.mouth?22:7));this.mouth+=(Math.max(this.mouthT,0)-this.mouth)*f,this.glow=Math.max(this.glowT,this.glow*Math.exp(-e*3.2)),this.scare*=Math.exp(-e*3.5),this.reach+=(this.reachT-this.reach)*(1-Math.exp(-e*8))}};function Mo(o){if(o=(o||"").trim(),o.startsWith("color("))return o.match(/[\d.]+/g).map(Number).slice(-3).map(a=>a>1?a/255:a);if(o.startsWith("#"))return(o.length===4?o.slice(1).split("").map(a=>a+a):[o.slice(1,3),o.slice(3,5),o.slice(5,7)]).map(a=>parseInt(a,16)/255);let e=o.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[1,.5,.1]}function el(o,e){if(o==="fill"){let t=Math.min(e.height,e.width)*1.02;return{x:e.left+e.width/2,y:e.top+e.height/2,s:t}}if(o==="left"){let t=e.height*.8;return{x:e.left+e.height*.38,y:e.top+e.height/2,s:t}}if(o==="face"){let t=e.height*.9;return{x:e.left+e.height*.5,y:e.top+e.height/2,s:t}}if(o==="nav"){let t=Math.min(e.height*.7,36);return{x:e.left+e.width/2,y:e.top+t*.55+2,s:t}}return null}var Nr=mi*4,Au=[le.PUMPKIN,le.SKULL,le.GHOST,le.VOODOO],tl=[le.GHOST,le.PUMPKIN,le.SKULL,le.VOODOO,le.MUMMY,le.FRANK,le.SKELETON],sl=9e3,Lu=112,ki=o=>(o=Math.max(0,Math.min(1,o)),o*o*(3-2*o)),Ru=[[0,0,1],[0,1,0],[1,0,0],[-1,0,0],[0,-1,0],[0,0,-1]];function Pu(o){let e=Ru[o-1],t=[[1,0,0],[0,1,0],[0,0,1]].filter(c=>!c.some((h,d)=>h&&e[d])),a=Math.random()<.5?-1:1,s=Math.random()<.5?-1:1,i=e.map((c,h)=>c+.55*a*t[0][h]+.42*s*t[1][h]),r=Math.hypot(...i),n=i[0]/r,l=i[1]/r,u=i[2]/r;return[Math.asin(-n),Math.atan2(-l,u)]}function al(o,{pad:e,app:t,fx:a}){let s=()=>{let R=a&&a();return R&&R.fluid&&R.fluid.ok?R.fluid:null},i=matchMedia("(prefers-reduced-motion: reduce)"),r=null,n=0,l=!1,u=null,c=!0,h=[],d=new Map,m=[],v="",g=[],f=null,p={x:-1,y:-1,t:-1e9},y=performance.now(),x=0,S=new Map,E=new Map,L=0,D=-1,q=!1,A=null,U={tick:0,at:0,msPerTick:6e4/11520},_=0,I=-1,j=null,se=null,Y=0,J=-1,ue=()=>Math.min(window.devicePixelRatio||1,1.75),ve=ue(),de=16,Me=0,ge=0,it=0,P=0,G=0,F=new Float32Array(128*Nr),K=1,W={drum:[1,.5,.1],bass:[.7,.3,1],lead:[.45,1,.3],rec:[1,.15,.12],accent:[1,.5,.1],play:[1,.55,.1]},re=()=>{let R=getComputedStyle(t);for(let N of["drum","bass","lead","rec"])W[N]=Mo(R.getPropertyValue("--"+N));W.accent=Mo(R.getPropertyValue("--accent"))},ke=()=>t.getBoundingClientRect(),fe=()=>K++*.6180339%1;function Ke(){c=!1;let R=[];for(let[N,Q,z,ae]of Z0)t.querySelectorAll(N).forEach((ye,Se)=>{let at=typeof Q=="function"?Q(ye,Se):Q,nt=d.get(ye);at>=0&&(!nt||nt.type!==at)&&(nt=new ps(at,fe()),nt.state=0,nt.act=0,nt.actT=0,d.set(ye,nt));let Xt=parseFloat(getComputedStyle(ye).borderTopLeftRadius)||12;R.push({el:ye,kind:z,tag:ae,doll:at>=0?nt:null,radius:Xt,flash:0,plate:!ye.closest(".gpu-host")})});h=R}let Ut=R=>{let N=null;for(let Q of h)Q.el.contains(R)&&(!N||N.el.contains(Q.el))&&(N=Q);return N},Xe=null,ut=()=>{let R=o.settings.hwCast;return Array.isArray(R)&&R.length===4?R.slice():Au.slice()};function $e(){let R=e.keyLayout(),N=R.sig.startsWith("piano");return Xe||(Xe=ut()),R.sig!==v&&(v=R.sig,m=R.keys.map((Q,z)=>new ps(e.part==="drum"?Xe[z%4]:N&&Q.cut?le.SKULL:tl[z%tl.length],fe())),j&&j.classList.remove("show")),g=R.keys,N}let rt=(R,N)=>{for(let Q=g.length-1;Q>=0;Q--){let z=g[Q];if(z.cut&&R>=z.x0&&R<z.x1&&N>=z.y0&&N<z.y1)return Q}for(let Q=0;Q<g.length;Q++){let z=g[Q];if(!z.cut&&R>=z.x0&&R<z.x1&&N>=z.y0&&N<z.y1)return Q}return-1},mt=(R,N,Q,z,ae)=>{let ye=(R.x1-R.x0)*z;if(e.part==="drum")return{y:.86,s:Math.min(ye*1.02,ae*.38)};if(Q&&R.cut){let at=Math.min(ye*1.25,ae*.15,46);return{y:R.y1-6/ae,s:at}}let Se=Math.min(ye*1.3,ae*.24,74);return{y:1-24/ae,s:Se}};function Os(R,N,Q,z){if(!l)return;$e(),ys(null,N,Q);let ae=E.get(R);if(z==="up"||z==="cancel"){ae!==void 0&&m[ae]&&(m[ae].release(),m[ae].reachT=0),E.delete(R);return}let ye=rt(N,Q);if(ye!==ae&&(ae!==void 0&&m[ae]&&(m[ae].release(),m[ae].reachT=0),ye>=0&&m[ye].press(z==="down"?1:.6),ye>=0?E.set(R,ye):E.delete(R)),ye>=0){let Se=m[ye],at=e.el.getBoundingClientRect(),nt=mt(g[ye],ye,e.piano,at.width,at.height),Xt=nt.y-nt.s/at.height,$t=Math.max(0,Math.min(1,(Xt-Q)/.25));Se.reachT=$t,Se.sqT=$t>.1?-.22*$t:.32}}function wa(R,N,Q,z,ae=.8){if(!l)return;$e();let ye=R==="drum"?z:rt(Math.min(.999,Math.max(0,N)),Math.min(.999,Math.max(0,Q)));if(ye<0&&R!=="drum"){let at=1e9;g.forEach((nt,Xt)=>{let $t=Math.abs((nt.x0+nt.x1)/2-N);!nt.cut&&$t<at&&(at=$t,ye=Xt)})}let Se=m[ye];Se&&Se.sing(ae,W[R]||W.accent)}let tt=R=>q?U.tick/96+(R-U.at)/(U.msPerTick*96):R/(6e4/Lu);function gs(R,N,Q){let z=It[N].len||8;for(let ae of R)ae.dance={name:N,start:Q,len:z};se={dolls:R,name:N,until:Q+z},j||(j=document.createElement("div"),j.className="hw-dance",t.append(j)),j.textContent="\u266A "+It[N].name}function bs(R){if(pe.away||!o.settings.hwRelay||e.part!=="drum"||o.ui.view!=="pattern"||i.matches||m.length!==4||!Xe||m.some(ae=>ae.swapTo!==null||ae.rise<1))return;let N=!1;if(q){let ae=Math.floor(tt(R)/4);ae!==J&&(J=ae,N=ae>0&&ae%8===0)}else R>Y&&(N=Y>0,Y=R+25e3+Math.random()*2e4);if(!N)return;let Q=[le.PUMPKIN,le.VOODOO,le.GHOST,le.SKULL,le.MUMMY,le.FRANK,le.SKELETON].filter(ae=>!Xe.includes(ae)),z=[0,1,2,3].filter(ae=>!m[ae].dance&&!m[ae].held);!Q.length||!z.length||(m[z[Math.floor(Math.random()*z.length)]].swapTo=Q[Math.floor(Math.random()*Q.length)])}function Za(R){if(pe.away||i.matches||!m.length||o.ui.view!=="pattern")return;let N=tt(R);if(q){let Q=Math.floor(N/4);if(Q!==I&&(I=Q,Q%4===2&&!m.some(z=>z.dance)&&Math.random()<.75)){let z=m.filter(Se=>!Se.held&&Se.swapTo===null&&Se.inT===void 0),ae=Math.min(z.length,1+Math.floor(Math.random()*3)),ye=z.sort(()=>Math.random()-.5).slice(0,ae);ye.length&&gs(ye,wi(),Q*4)}}else if(R>_){if(_){let Q=m.filter(z=>!z.held&&!z.dance&&z.swapTo===null&&z.inT===void 0);Q.length&&R-y>2500&&gs([Q[Math.floor(Math.random()*Q.length)]],wi(),Math.ceil(N))}_=R+15e3+Math.random()*15e3}}function ys(R,N,Q){let z=ke();if(R)p.x=R.clientX-z.left,p.y=R.clientY-z.top;else{let ae=e.el.getBoundingClientRect();p.x=ae.left-z.left+N*ae.width,p.y=ae.top-z.top+Q*ae.height}p.t=performance.now(),y=p.t}let Qs=R=>{if(!l)return;ys(R);let N=Ut(R.target),Q=[];if(N){N.flash=1;let z=N.doll;if(z){if(z.press(.8),Q.push(z),(z.type===De.DIE||z.type===De.BOOK||z.type===De.WEB)&&(z.act=0,z.actT=1),z.type===De.DIE){let ae=z.face||1;for(;ae===(z.face||1);)ae=1+Math.floor(Math.random()*6);let[ye,Se]=Pu(ae),at=()=>(Math.random()<.5?-1:1)*Math.PI*2*(1+Math.floor(Math.random()*2));z.rollFrom=[z.rollA??.6,z.rollB??-.5],z.rollTo=[ye+at(),Se+at()],z.rollT=0,z.face=ae}z.type===De.HOURGLASS&&(z.actT=z.actT>.5?0:1),z.type===De.COFFIN&&(z.actT=1)}}S.set(R.pointerId,Q);for(let z of h){if(!z.doll||z===N||!z.pos)continue;let ae=Math.hypot(z.pos.x-p.x,z.pos.y-p.y);z.doll.startle(Math.max(0,1-ae/150)*.6)}},ka=R=>{l&&S.has(R.pointerId)&&ys(R)},Js=R=>{let N=S.get(R.pointerId);if(N){for(let Q of N)Q.release(),Q.type===De.COFFIN&&setTimeout(()=>{Q.actT=0},450);S.delete(R.pointerId)}};function Te(R){if(n=0,!l||!r||pe.held)return;if(pe.every>1&&(pe.skip=((pe.skip||0)+1)%pe.every)){Kt();return}let N=Math.min(.05,Me?(R-Me)/1e3:1/60);Me&&(de=de*.94+(R-Me)*.06,R<G?ge=0:de>18?++ge>45&&ve>1&&(ve=Math.max(1,ve*.85),ge=0):(ge=Math.max(0,ge-1),de<15&&ve<ue()&&(ve=Math.min(ue(),ve+.002))),pe.cap&&(ve=Math.min(ve,pe.cap))),Me=R,c&&Ke(),R-P>500&&(re(),P=R);let Q=i.matches,z=m.some(me=>me.dance||me.swapTo!==null||me.rise<1),ae=R-y<1500||q||S.size||E.size||z;if(it++,!ae&&it%2){Kt();return}let ye=ke();r.resize(ye.width,ye.height,ve);let Se=R-y;x+=((Se>sl&&!z?1:0)-x)*(1-Math.exp(-N*(Se>sl?.8:6))),L*=Math.exp(-N*6);let at=.5+.5*Math.sin(R/90)*Math.sin(R/37+1.3)*(Q?.3:1);Za(R),bs(R);let nt=tt(R),Xt=0,$t=(me,Le,ot,Ee,lt,ct,ie)=>{let H=Xt*Nr;if(F.set(me,H),F.set(Le,H+4),Ee&&ot){let Je=Ee.p;F.set([ot.x,ot.y,ot.s,Ee.type],H+8),F.set([Ee.sq,Ee.hx,Ee.hy,Ee.sw],H+12),F.set([Ee.lx,Ee.ly,Ee.blink,lt],H+16),F.set([Ee.glow,Ee.scare,Ee.seed,Ee.type>=20?Ee.act:Ee.type<10?Ee.p.bend:Ee.reach],H+20),F.set([ct[0],ct[1],ct[2],ie],H+24);let Pt=Ee.extra||Je.hl;F.set([Pt[0],Pt[1],Pt[2],Je.hip],H+28),F.set([Je.hr[0],Je.hr[1],Je.hr[2],Je.twist],H+32),F.set([Je.ll,Je.lr,Je.roll,Ee.ink],H+36),F.set([Je.fxl,Je.fxr,Je.crouch,Je.lz],H+40)}else F.fill(0,H+8,H+Nr),F.set([ct[0],ct[1],ct[2],ie],H+24);Xt++},eo=(me,Le,ot)=>{if(x>.5){me.ltx=0,me.lty=.05;return}R-p.t<3500?(me.ltx=Math.max(-1,Math.min(1,(p.x-Le)/170)),me.lty=Math.max(-1,Math.min(1,(ot-p.y)/220))):(me.ltx=.5*Math.sin(R/2300+me.seed*20),me.lty=.25*Math.sin(R/3100+me.seed*13))};for(let me of h){let Le=me.el.getBoundingClientRect();if(Le.width<2||Le.height<2||Le.bottom<0||Le.top>ye.height+ye.top){me.pos=null;continue}let ot={left:Le.left-ye.left,top:Le.top-ye.top,width:Le.width,height:Le.height,right:Le.right-ye.left,bottom:Le.bottom-ye.top},Ee=me.el,lt=Ee.getAttribute("aria-pressed")==="true",ct=lt||Ee.getAttribute("aria-selected")==="true"||Ee.classList.contains("active")||Ee.classList.contains("on")?1:0,ie=W.accent,H=me.doll,Je=0;if(H){if(H.glowT=0,H.type<20&&(Je=H.mouth),me.tag==="rec"?(ie=W.rec,Je=lt?1:0,H.glowT=lt&&q?.5+.5*L:0):me.tag==="play"?(ie=W.play,Je=lt?1:0,H.glowT=lt?.35+.65*L:0):me.tag==="tempo"?(ie=W.rec,H.glowT=q?L:.5+.5*Math.pow(Math.max(0,Math.sin(R/430)),12)):me.tag==="part"?(ie=W[Ee.dataset.p]||W.accent,H.glowT=ct?.35:0):me.tag==="nav"?(H.glowT=ct?.4:0,ie=W.accent):me.tag==="tool"&&H.type===De.BROOM&&(Je=lt?1:0),H.type===De.DIE){if(H.rollA===void 0&&(H.rollA=.6,H.rollB=-.5,H.face=1,H.rollT=1),H.rollT<1){H.rollT=Math.min(1,H.rollT+N/.85);let qe=1-Math.pow(1-H.rollT,3);H.rollA=H.rollFrom[0]+(H.rollTo[0]-H.rollFrom[0])*qe,H.rollB=H.rollFrom[1]+(H.rollTo[1]-H.rollFrom[1])*qe,H.rollT===1&&(H.rollA%=Math.PI*2,H.rollB%=Math.PI*2)}H.extra=[H.rollA,H.rollB,0]}if(H.type===De.HOURGLASS){H.sand===void 0&&(H.sand=.75);let qe=Math.cos(H.act*Math.PI);Math.abs(qe)>.97&&(H.sand=qe>0?Math.max(0,H.sand-N/9):Math.min(1,H.sand+N/9)),H.extra=[H.sand,0,0]}if(H.type===De.VIALS&&A){let qe=ht=>Math.min(1,Math.sqrt(ht||0)*1.3);H.extra=[.25+.75*qe(A.drum),.25+.75*qe(A.bass),.25+.75*qe(A.lead)]}else H.type===De.VIALS&&(H.extra=[.55,.4,.7]);H.act+=(H.actT-H.act)*(1-Math.exp(-N*(H.type===De.DIE?5:7))),(H.type===De.DIE||H.type===De.BOOK||H.type===De.WEB)&&H.act>.97&&(H.act=0,H.actT=0)}me.flash*=Math.exp(-N*5);let Pt=H?el(me.kind,ot):null;if(me.pos=Pt,H&&(eo(H,Pt.x,Pt.y),H.step(N,R,Q,nt)),$t([ot.left,ot.top,ot.width,ot.height],[me.radius,me.plate?1:0,ct,me.flash],Pt,H,Je,ie,1),Xt>=100)break}let Zs=null,Bo=[],vt=null;if(o.ui.view==="pattern"&&e.el.isConnected){let me=e.el.getBoundingClientRect();if(me.width>10&&me.height>10){let Le=$e();Zs={x:me.left-ye.left,y:me.top-ye.top,w:me.width,h:me.height,r:parseFloat(getComputedStyle(e.el).borderTopLeftRadius)||20};let ot=W[e.part]||W.accent,Ee=!!e.gpu;g.forEach((lt,ct)=>{let ie=m[ct];if(!ie)return;if(pe.away)ie.rise=Math.max(0,ie.rise-N*2.2),ie.dance=null,ie.inT=void 0;else if(ie.swapTo!==null){ie.outT=Math.min(1,(ie.outT||0)+N/2);let ht=ie.outT;if(ie.rise=ht<.35?1:1-ki((ht-.35)/.45),ht>=1){let ea=new ps(ie.swapTo,fe());ea.rise=0,ea.inT=0,Xe[ct]=ie.swapTo,m[ct]=ie=ea}}else if(ie.inT!==void 0){ie.inT=Math.min(1,ie.inT+N/2);let ht=ie.inT;ie.rise=ht<.12?0:ht<.35?.3*ki((ht-.12)/.23):ht<.6?.3+.32*ki((ht-.35)/.25):ht<.78?.62+.38*ki((ht-.6)/.18):1,ht>=.78&&!ie.landed&&(ie.landed=!0,ie.sqv-=3.4,ie.hvy+=2.2,ie.scare=.5),ht===1&&(ie.inT=void 0)}else ie.rise<1&&(ie.rise=Math.min(1,ie.rise+N*1.6));let H=mt(lt,ct,Le,me.width,me.height),Je=Zs.x+(lt.x0+lt.x1)/2*me.width,Pt=Zs.y+H.y*me.height,qe=f&&f[ct]||0;ie.glowT=Math.max(qe*.6,q?.1*L:0),ie.ink+=(Math.max(qe,ie.glow*.8)-ie.ink)*(1-Math.exp(-N*8)),ie.color=ot,eo(ie,Je,Pt-H.s*.6),ie.step(N,R,Q,nt),ie.dance&&se&&se.dolls.includes(ie)&&(vt=vt||{x:0,y:1e9,n:0},vt.x+=Je,vt.n++,vt.y=Math.min(vt.y,Pt-H.s*1.05)),Bo.push({x0:lt.x0,y0:lt.y0,x1:lt.x1,y1:lt.y1,black:!!lt.cut,lit:Math.max(qe,ie.glow*.6)}),$t([0,0,0,0],[ie.spot,ie.rise-1,Ee?1:0,ie.p.spin],{x:Je+ie.p.travel*H.s/2.2,y:Pt,s:H.s},ie,ie.mouth,ot,Ee?.6:1)})}}j&&(vt&&vt.n?(j.style.transform=`translate(${(vt.x/vt.n).toFixed(1)}px, ${(vt.y-22).toFixed(1)}px) translate(-50%, -100%)`,j.classList.add("show")):j.classList.remove("show")),r.draw({time:R/1e3,flicker:at,watch:x,beat:L,calm:Q,pad:Zs,stage:!e.gpu,keys:Bo,accent:W.accent,dolls:Xt,data:F}),r.errors.length&&!pe.reported&&(pe.reported=!0,console.warn("MOTIF Halloween:",r.errors.join(`
`)));let Bs=s();Bs&&(Bs.stage=[1,(Q?R*.25:R)/1e3,x,L],Bs.scene&&Bs.scene.glass&&(o.ui.view==="pattern"||o.ui.view==="tweaks")&&Bs.keepAwake()),Kt()}let Kt=()=>{l&&!n&&document.visibilityState==="visible"&&!pe.held&&(n=requestAnimationFrame(Te))},Oo=()=>{Me=0,G=performance.now()+3e3,Kt()},pe={get on(){return l},get stage(){return l&&!e.gpu},get ok(){return!!(r&&r.ok)},get errors(){return r?r.errors:[]},get ema(){return de},get scale(){return ve},get dolls(){return m},dance(R,N=2){if(!l||!m.length)return;let Q=performance.now();gs(m.slice(0,N),R||wi(),Math.ceil(tt(Q)))},set(R){if(R!==l){if(l=R,l)r=new pi(t),r.ok||console.warn("MOTIF Halloween: WebGL 2 indisponible",r.errors),re(),c=!0,v="",u=new MutationObserver(()=>{c=!0}),u.observe(t,{childList:!0,subtree:!0}),document.addEventListener("pointerdown",Qs,!0),document.addEventListener("pointermove",ka,!0),document.addEventListener("pointerup",Js,!0),document.addEventListener("pointercancel",Js,!0),document.addEventListener("visibilitychange",Oo),y=performance.now(),Me=0,_=performance.now()+9e3,G=performance.now()+3e3,Y=performance.now()+2e4,Kt();else{n&&cancelAnimationFrame(n),n=0,u&&u.disconnect(),u=null,document.removeEventListener("pointerdown",Qs,!0),document.removeEventListener("pointermove",ka,!0),document.removeEventListener("pointerup",Js,!0),document.removeEventListener("pointercancel",Js,!0),document.removeEventListener("visibilitychange",Oo),r&&r.destroy(),r=null,j&&(j.remove(),j=null),h=[],d.clear(),m=[],v="",S.clear(),E.clear();let N=s();N&&(N.stage=null,N.wake())}e.draw()}},refresh(){l&&(re(),c=!0,v="",Xe=null)},press:Os,note:wa,keyLights(R){f=R},level(R){if(!l||!R)return;let N=q;if(q=!!R.playing,q!==N){for(let Q of m)Q.dance=null;I=-1}if(R.playing&&R.tick>=0){U={tick:R.tick,at:performance.now(),msPerTick:6e4/((o.project.tempo||120)*96)},R.abs>=0&&((q!==N||pe.abs0===void 0)&&(pe.abs0=R.abs-R.tick),U.tick=R.abs-pe.abs0);let Q=Math.floor(R.tick/96);if(Q!==D){D=Q,L=1;let z=R.tick%384<96;for(let ae of m)ae.dance||(ae.sqv-=z?1.6:.8);for(let ae of h)ae.doll&&ae.tag==="play"&&(ae.doll.sqv-=z?2.2:1.2)}}if(R.m&&(A={d:R.m.d,bass:R.m.bass,lead:R.m.lead,drum:R.m.drum}),R.trig){for(let Q=0;Q<R.trig.length;Q+=4)if(R.trig[Q]===0&&R.trig[Q+1]===0){for(let z of h)z.doll&&(z.doll.sqv-=1,z.doll.hvy+=.4);break}}},gasp(){if(l){for(let R of h)R.doll&&R.doll.startle(.9);for(let R of m)R.startle(.9)}}};return pe.goAway=R=>{pe.away=R,R||m.forEach((N,Q)=>{if(N.swapTo!==null){let z=new ps(N.swapTo,fe());z.rise=0,z.inT=0,Xe&&(Xe[Q]=N.swapTo),m[Q]=z}else N.rise<.05&&(N.rise=0,N.inT=0,N.landed=!1)}),R&&j&&j.classList.remove("show")},pe.drawNow=()=>{if(!l||!r)return null;let R=pe.held,N=pe.every;return pe.held=!1,pe.every=1,y=performance.now(),Te(performance.now()),pe.held=R,pe.every=N,r.canvas},pe.light=(R,N)=>{pe.every=N,pe.skip=0,R?(pe.saved===void 0&&(pe.saved=ve),ve=Math.min(ve,R)):pe.saved!==void 0&&(ve=Math.min(pe.saved,ue()),pe.saved=void 0,ge=0,de=16,Me=0,G=performance.now()+3e3),pe.cap=R},pe.hold=R=>{if(pe.held=R,R){n&&cancelAnimationFrame(n),n=0;return}for(let N of m)N.sqv=0,N.hvy=0;for(let N of h)N.doll&&(N.doll.sqv=0,N.doll.hvy=0);Me=0,G=performance.now()+3e3,Kt()},e.ghouls=pe,pe}var ee={deck:{x:5.6,z0:-7.2,z1:1,top:0,ground:-1.5},screen:{z:-6.4,bottom:1.85,height:5.5},riser:{z0:-5,z1:-3.2,top:.95,x:3.4},front:[[-1.38,-.35],[0,0],[1.38,-.35]],back:[[-2.3,-4],[-.78,-4.15],[.78,-4.15],[2.3,-4]],dollScale:.9,heads:[[-3.9,9.85,-5.9],[-1.35,9.95,-5.9],[1.35,9.95,-5.9],[3.9,9.85,-5.9]],speakers:[[-4.35,.3],[4.35,.3]],moon:[.16,.36,-.92],fovY:50*Math.PI/180,eye:[0,2.05,10.4],target:[0,2.75,-3],pivot:[0,0,-2.6]},ms=(o,e)=>[o[0]-e[0],o[1]-e[1],o[2]-e[2]],Ba=(o,e)=>[o[0]+e[0],o[1]+e[1],o[2]+e[2]],Mi=(o,e)=>[o[0]*e,o[1]*e,o[2]*e],Ds=(o,e)=>o[0]*e[0]+o[1]*e[1]+o[2]*e[2],To=(o,e)=>[o[1]*e[2]-o[2]*e[1],o[2]*e[0]-o[0]*e[2],o[0]*e[1]-o[1]*e[0]],as=o=>{let e=Math.hypot(o[0],o[1],o[2])||1;return[o[0]/e,o[1]/e,o[2]/e]},ns=(o,e,t)=>o+(e-o)*t,os=(o,e,t)=>[ns(o[0],e[0],t),ns(o[1],e[1],t),ns(o[2],e[2],t)];function Si(o,e){let t=new Array(16);for(let a=0;a<4;a++)for(let s=0;s<4;s++){let i=0;for(let r=0;r<4;r++)i+=o[r*4+s]*e[a*4+r];t[a*4+s]=i}return t}function Hr(o,e,t,a){let s=1/Math.tan(o/2),i=1/(t-a);return[s/e,0,0,0,0,s,0,0,0,0,(a+t)*i,-1,0,0,2*a*t*i,0]}function Ur(o,e,t=[0,1,0]){let a=as(ms(o,e)),s=as(To(t,a)),i=To(a,s);return[s[0],i[0],a[0],0,s[1],i[1],a[1],0,s[2],i[2],a[2],0,-Ds(s,o),-Ds(i,o),-Ds(a,o),1]}function jr(o){let e=o,t=new Array(16),a=e[0]*e[5]-e[1]*e[4],s=e[0]*e[6]-e[2]*e[4],i=e[0]*e[7]-e[3]*e[4],r=e[1]*e[6]-e[2]*e[5],n=e[1]*e[7]-e[3]*e[5],l=e[2]*e[7]-e[3]*e[6],u=e[8]*e[13]-e[9]*e[12],c=e[8]*e[14]-e[10]*e[12],h=e[8]*e[15]-e[11]*e[12],d=e[9]*e[14]-e[10]*e[13],m=e[9]*e[15]-e[11]*e[13],v=e[10]*e[15]-e[11]*e[14],g=1/(a*v-s*m+i*d+r*h-n*c+l*u);return t[0]=(e[5]*v-e[6]*m+e[7]*d)*g,t[1]=(e[2]*m-e[1]*v-e[3]*d)*g,t[2]=(e[13]*l-e[14]*n+e[15]*r)*g,t[3]=(e[10]*n-e[9]*l-e[11]*r)*g,t[4]=(e[6]*h-e[4]*v-e[7]*c)*g,t[5]=(e[0]*v-e[2]*h+e[3]*c)*g,t[6]=(e[14]*i-e[12]*l-e[15]*s)*g,t[7]=(e[8]*l-e[10]*i+e[11]*s)*g,t[8]=(e[4]*m-e[5]*h+e[7]*u)*g,t[9]=(e[1]*h-e[0]*m-e[3]*u)*g,t[10]=(e[12]*n-e[13]*i+e[15]*a)*g,t[11]=(e[9]*i-e[8]*n-e[11]*a)*g,t[12]=(e[5]*c-e[4]*d-e[6]*u)*g,t[13]=(e[0]*d-e[1]*c+e[2]*u)*g,t[14]=(e[13]*s-e[12]*r-e[14]*a)*g,t[15]=(e[8]*r-e[9]*s+e[10]*a)*g,t}function _u(o,e){return[o[0]*e[0]+o[4]*e[1]+o[8]*e[2]+o[12],o[1]*e[0]+o[5]*e[1]+o[9]*e[2]+o[13],o[2]*e[0]+o[6]*e[1]+o[10]*e[2]+o[14],o[3]*e[0]+o[7]*e[1]+o[11]*e[2]+o[15]]}function Cs(o,e,t,a){let s=_u(o,e);return[(s[0]/s[3]*.5+.5)*t,(.5-s[1]/s[3]*.5)*a,s[3]]}function Gr(o){let e=ee.screen,t=e.height*o/2,a=e.bottom,s=e.bottom+e.height;return[[-t,s,e.z],[t,s,e.z],[t,a,e.z],[-t,a,e.z]]}function Du(){let o=ee.screen,e=o.bottom+o.height/2,t=o.height/2/Math.tan(ee.fovY/2);return{eye:[0,e,o.z+t],target:[0,e,o.z]}}function Oa(o=0,e=0,t=1){let a=ee.pivot,s=ms(ee.eye,a),i=Math.cos(o),r=Math.sin(o),n=[(s[0]*i+s[2]*r)*t,(s[1]+e*6)*t,(-s[0]*r+s[2]*i)*t];return{eye:Ba(a,n),target:Ba(ee.target,[0,e*2,0])}}function Vr(){let o=ee.dollScale,e=[],t=(a,s,i)=>{for(let r of[-.8,.8])for(let n of[0,2.35])for(let l of[-.4,.4])e.push([a+r*o,s+n*o,i+l*o])};for(let[a,s]of ee.front)t(a,0,s);for(let[a,s]of ee.back)t(a,ee.riser.top,s);return e}var Cu=Vr();function Ia(o,e,t,a=8){let s=n=>{let l=Yr(Oa(o,0,n),e,t,null,1,0);return Cu.every(u=>{let[c,h,d]=Cs(l,u,e,t);return d>0&&c>a&&c<e-a&&h>a&&h<t-a})};if(s(1))return Oa(o,0,1);let i=1,r=2.6;for(let n=0;n<12;n++){let l=(i+r)/2;s(l)?r=l:i=l}return Oa(o,0,r)}var qu=o=>o*o*(3-2*o);function Wr(o,e=0,t=0,a=null){let s=Du(),i=a||Oa(e,t),r=qu(Math.min(1,Math.max(0,o))),n=os(s.eye,i.eye,r);return n[1]+=Math.sin(r*Math.PI)*1.1,{eye:n,target:os(s.target,i.target,r)}}function Yr(o,e,t,a,s,i){let r=e/t,n=Hr(ee.fovY,r,.3,120),l=Ur(o.eye,o.target),u=Si(n,l);if(i>0&&a){let c=s/r,h=a.width/e,d=a.height/t,m=(a.left+a.width/2)/e*2-1,v=1-(a.top+a.height/2)/t*2,g=ns(1,h/c,i),f=ns(1,d,i),p=m*i,y=v*i;u=Si([g,0,0,0,0,f,0,0,0,0,1,0,p,y,0,1],u)}return u}function Fa(o,e,t){let[[a,s],[i,r],[n,l],[u,c]]=t,h=i-n,d=u-n,m=a-i+n-u,v=r-l,g=c-l,f=s-r+l-c,p=0,y=0;if(Math.abs(m)>1e-9||Math.abs(f)>1e-9){let A=h*g-d*v;p=(m*g-d*f)/A,y=(h*f-m*v)/A}let x=i-a+p*i,S=u-a+y*u,E=a,L=r-s+p*r,D=c-s+y*c,q=s;return[[x/o,S/e,E],[L/o,D/e,q],[p/o,y/e,1]]}function Ti(o,e,t){let a=o[2][0]*e+o[2][1]*t+o[2][2];return[(o[0][0]*e+o[0][1]*t+o[0][2])/a,(o[1][0]*e+o[1][1]*t+o[1][2])/a]}function Ei(o){let[[e,t,a],[s,i,r],[n,l,u]]=o,c=i*u-r*l,h=-(s*u-r*n),d=s*l-i*n,m=e*c+t*h+a*d;if(Math.abs(m)<1e-12)return null;let v=1/m;return[[c*v,-(t*u-a*l)*v,(t*r-a*i)*v],[h*v,(e*u-a*n)*v,-(e*r-a*s)*v],[d*v,-(e*l-t*n)*v,(e*i-t*s)*v]]}function za(o){return`matrix3d(${[o[0][0],o[1][0],0,o[2][0],o[0][1],o[1][1],0,o[2][1],0,0,1,0,o[0][2],o[1][2],0,o[2][2]].map(t=>+t.toPrecision(9)).join(",")})`}var is={x:[-8,8],y:[12,20],z:[-14,-9]},ol=[[-2.2,.8],[-.7,.8],[.7,.8],[2.2,.8]];var Li=80,nl=300,Ou=.8;var ll=[2.2,2,3.6],Xr=32,Ao={minBars:16,level:.37,every:64,bars:4},Bu=.9,Iu=2,cl=(o,e,t)=>Math.max(e,Math.min(t,o));var Fu=(o,e,t)=>{let a=cl((t-o)/(e-o),0,1);return a*a*(3-2*a)};function hl(o){return o>>>=0,o^=o>>>16,o=Math.imul(o,2146121005),o^=o>>>15,o=Math.imul(o,2221713035),o^=o>>>16,o>>>0}function Eo(o,e,t){return(hl((Math.imul(o,2654435761)^Math.imul(e,2246822519)^Math.imul(t,3266489917))>>>0)>>>8)/16777216}var ul=`
#ifndef FINALE_HASH
#define FINALE_HASH
uint fxHash(uint x) { x ^= x >> 16u; x *= 0x7feb352du; x ^= x >> 15u; x *= 0x846ca68bu; x ^= x >> 16u; return x; }
float fxU(uint s, uint k, uint salt) { return float(fxHash((s * 0x9e3779b1u) ^ (k * 0x85ebca77u) ^ (salt * 0xc2b2ae3du)) >> 8u) / 16777216.0; }
#endif
`,Na=o=>Math.max(1,(o&&o.reps)|0);function zu(o,e){let t=(o.patterns||[])[e.p]||(o.patterns||[])[0];if(!t)return 0;let a=o.parts||{},s=e.mute||{},i=a.drum&&a.drum.mute||[],r=0;for(let n=0;n<4;n++)!i[n]&&!s["d"+n]&&(r+=(t.drum&&t.drum[n]&&t.drum[n].hits||[]).length);for(let n of["bass","lead"])!(a[n]&&a[n].mute)&&!s[n]&&(r+=(t[n]&&t[n].notes||[]).length);return r/(o.bars||2)}function Nu(o){let e=o&&o.song;return!e||!e.enabled||!Array.isArray(e.sections)?0:e.sections.reduce((t,a)=>t+Na(a)*(o.bars||2)*4,0)}function dl(o){let e=o&&o.song;if(!e||!e.enabled||!Array.isArray(e.sections)||!e.sections.length)return null;let t=o.bars||2,a=e.sections.map(l=>zu(o,l)),s=Math.max(...a);if(!(s>0))return null;let i=0;a.forEach((l,u)=>{l>=s*Bu&&(i=u)});let r=0;for(let l=0;l<i;l++)r+=Na(e.sections[l])*t*4;let n=Na(e.sections[i])*t;return{section:i,startBeat:r,endBeat:r+n*4,bars:n,density:a[i]}}function Hu(o,e,t=null,a=1){return!Number.isFinite(o)||o<Ao.minBars||!(e>=Ao.level)||Number.isFinite(t)&&t<=o&&o-t<Ao.every?!1:a>1?(Math.round(o)+1)%a===0:!0}var il={blackout:0,launch:1,bouquet:2,flames:3,shell:4,end:5};function Kr(o,e,t,a){let s=d=>Eo(o,e,d),i=s(1),r=a.type??(i<a.w[0]?0:i<a.w[0]+a.w[1]?1:2),n=s(3),l=s(5),u=a.x??a.side*is.x[1]*n*n,c=is.y[0]+(is.y[1]-is.y[0])*Math.pow(s(4),3),h=is.z[0]+(is.z[1]-is.z[0])*l*l;return{beat:t,kind:"shell",type:r,color:a.color??Math.floor(s(2)*4),pos:[cl(u,is.x[0],is.x[1]),c,h],seed:Math.floor(s(6)*4096),...a.bouquet?{bouquet:!0}:{}}}function Ai(o,e){let t=Math.max(1,Math.round(e)||1),a=o,s=hl(Math.round(a*4)>>>0),i=a+4*(t-1),r=[];r.push({beat:a-4,kind:"blackout",end:a,spot:[ee.front[1][0],0,ee.front[1][1]]}),r.push({beat:a,kind:"launch",flash:1,confetti:!0});let n=[0,1,2,3],l=[n,[0,3],[1,2]];for(let d=0;d<t;d++){let m=d===0,v=d===t-1;r.push({beat:a+4*d,kind:"flames",jets:(m||v?n:l[d%3]).slice(),height:m?4.5:v?5:3+.5*(d%2),flash:m||v?0:.4})}let u=4*(t-1);for(let d=1;d<u;d++){let m=Eo(s,d,11)<.15+.45*d/u,v=Eo(s,d,12)<.5?-1:1;r.push(Kr(s,2*d,a+d,{side:v,w:[.45,.25]})),m&&r.push(Kr(s,2*d+1,a+d,{side:-v,w:[.45,.25]}))}let c=10+Math.floor(Eo(s,0,13)*3);r.push({beat:i,kind:"bouquet",count:c,flash:.9});for(let d=0;d<c;d++){let m=.5*Math.floor(8*Math.sqrt(d/c)),v=d*7%c,g=.75*(is.x[0]+(is.x[1]-is.x[0])*(v+.5)/c)+(Eo(s,1e5+d,14)-.5)*1.2;r.push(Kr(s,1e5+d,i+m,{x:g,color:d%4,type:d>=c-2?2:void 0,w:[.55,.25],bouquet:!0}))}r.push({beat:a+4*t,kind:"end"}),r.sort((d,m)=>d.beat-m.beat||il[d.kind]-il[m.kind]);let h=-1/0;for(let d of r)d.flash>0&&(d.beat-h<Iu?d.flash=0:h=d.beat);return r}function Uu(o,e,t){let a=60/(t||120),s=[];for(let i of o){if(i.kind!=="shell")continue;let r=(e-i.beat)*a;r>=-Ou&&r<ll[i.type]&&s.push({shell:i,t:r})}return s}function fl(o){return[o.pos[0],o.pos[1],o.pos[2],o.type*4096+o.seed]}var pl=ul+`
// the finale: spark i of a firework shell, t seconds after its burst (t < 0: the comet climbing to it).
// shell: x, y, z (m), type \xD7 4096 + seed. Returns the spark's position (m) and its brightness (0: not drawn).
// The same computation as shellParticles() in finale.js.
vec4 shellParticle(vec4 shell, float i, float t) {
  const float N = 80.0, RISE = 0.8;
  const vec3 V0 = vec3(10.5, 10.0, 7.5), SPREAD = vec3(0.18, 0.04, 0.3), KD = vec3(2.0, 2.2, 1.3), G = vec3(7.0, 7.0, 6.0), LIFE = vec3(2.2, 2.0, 3.6);
  uint w = uint(shell.w + 0.5), seed = w & 4095u, k = uint(i + 0.5);
  vec3 C = shell.xyz;
  if (t < 0.0) {
    float tau = t - float(k) * 0.025;
    if (k >= 20u || tau < -RISE) return vec4(C, 0.0);
    float u = (tau + RISE) / RISE;
    return vec4(mix(C.x * 0.8, C.x, u), mix(0.5, C.y, 1.0 - (1.0 - u) * (1.0 - u)), C.z, 0.7 * (1.0 - float(k) / 20.0));
  }
  int ty = int(min(w >> 12u, 2u));
  float r1 = fxU(seed, k, 1u), r2 = fxU(seed, k, 2u), r3 = fxU(seed, k, 3u), r4 = fxU(seed, k, 4u);
  vec3 d;
  if (ty == 1) {
    float a = 6.2831853 * (float(k) + 0.5) / N + (r1 - 0.5) * 0.05;
    float al = (fxU(seed, 0u, 5u) - 0.5) * 1.2, be = (fxU(seed, 0u, 6u) - 0.5) * 1.0;
    vec3 q = vec3(cos(a), sin(a) * cos(al), sin(a) * sin(al));
    d = vec3(q.x * cos(be) + q.z * sin(be), q.y, -q.x * sin(be) + q.z * cos(be));
  } else {
    float y = 1.0 - 2.0 * (float(k) + 0.5 + (r1 - 0.5) * 0.8) / N;
    float ph = float(k) * 2.3999632 + float(seed) * 0.0015339808 + (r2 - 0.5) * 0.5;
    float rr = sqrt(max(0.0, 1.0 - y * y));
    d = vec3(rr * cos(ph), y, rr * sin(ph));
  }
  float sp0 = V0[ty] * (1.0 + (r3 - 0.5) * SPREAD[ty]), kd = KD[ty];
  float E = (1.0 - exp(-kd * t)) / kd, fall = G[ty] / kd * (t - E);
  float lf = LIFE[ty] * (0.7 + 0.3 * r4), u = t / lf;
  float b = u >= 1.0 ? 0.0 : 1.0 - smoothstep(0.45, 1.0, u);
  if (ty == 2 && u > 0.3) b *= 0.25 + 0.75 * step(0.45, fxU(seed, k, 16u + uint(t * 14.0)));
  return vec4(C + d * (sp0 * E) - vec3(0.0, fall, 0.0), b);
}
`;var ml=ul+`
// the finale: confetto i, t seconds after the launch from the two cannons at the front corners of the
// stage (even i: the left one). Returns its position (m) and how much it glints (0: not drawn). Once on
// the floor (y = 0) it stays there. The same computation as confetti() in finale.js.
vec4 confetti(float i, float t) {
  const float CK = 2.5;
  uint k = uint(i + 0.5);
  float side = float(k & 1u), sx = 1.0 - 2.0 * side;
  vec3 C = vec3(mix(-5.25, 5.25, side), 0.25, 0.7);
  float tt = t - fxU(77u, k, 6u) * 0.15;
  if (tt < 0.0) return vec4(C, 0.0);
  float v0y = 13.0 + 5.0 * fxU(77u, k, 1u), vt = 0.9 + 0.5 * fxU(77u, k, 2u);
  float lx = C.x + sx * mix(0.3, 8.2, fxU(77u, k, 3u)), lz = mix(0.85, -4.6, fxU(77u, k, 4u));
  float A = 0.25 + 0.35 * fxU(77u, k, 5u), om = 2.2 + 2.0 * fxU(77u, k, 7u), ph = 6.2831853 * fxU(77u, k, 8u);
  float T = (C.y + (v0y + vt) / CK) / vt;
  float ET = (1.0 - exp(-CK * T)) / CK;
  if (tt >= T) return vec4(lx, 0.0, lz, 0.5);
  float gT = 1.0 - exp(-0.8 * T), g = 1.0 - exp(-0.8 * tt);
  float swxT = A * sin(om * T + ph) * gT, swzT = A * 0.6 * cos(om * 0.8 * T + ph) * gT;
  float swx = A * sin(om * tt + ph) * g, swz = A * 0.6 * cos(om * 0.8 * tt + ph) * g;
  float E = (1.0 - exp(-CK * tt)) / CK;
  float y = max(0.0, C.y + (v0y + vt) * E - vt * tt);
  float x = C.x + (lx - C.x - swxT) * E / ET + swx;
  float z = C.z + (lz - C.z - swzT) * E / ET + swz;
  return vec4(x, y, z, 0.35 + 0.65 * abs(cos((6.0 + 8.0 * fxU(77u, k, 9u)) * tt + ph)));
}
`;function rl(o,e,t){let a=dl(o),s=o&&o.song;if(!a)return null;let i=s.sections,r=i.length,n=o.bars||2,l=t,u=((e|0)%r+r)%r;do l+=Na(i[u])*n*4,u=(u+1)%r;while(u!==a.section);return{...a,startBeat:l,endBeat:l+a.bars*4}}var ju=32,Gu=.95;function vl(){let o={plan:null,i:0,from:1/0,end:-1/0,start:1/0,darkFrom:1/0,darkTo:-1/0,flames:[],launch:null,launchTempo:120,launchMs:null,sec:0,secStart:0,placed:!1,openBeat:null,lastBeat:-1/0,bar:null,sum:0,cnt:0,lastLoop:null,lastSongEnd:-1/0,prevSongEnd:-1/0},e=new Float32Array(16),t=s=>{s||(o.launch=null,o.launchMs=null),o.plan=null,o.i=0,o.end=-1/0,o.darkFrom=1/0,o.darkTo=-1/0,o.flames.length=0,o.sec=0,o.secStart=0,o.placed=!1,o.unsure=!1,o.proj=null,o.openBeat=null,o.bar=null,o.sum=o.cnt=0,o.lastLoop=null,o.lastSongEnd=o.prevSongEnd=-1/0},a={get plan(){return o.plan},get active(){return!!o.plan&&o.lastBeat>=o.from&&o.lastBeat<o.end},reset:t,start(s){o.plan=s,o.i=0,o.from=s[0].beat,o.start=s.find(i=>i.kind==="launch").beat,o.end=s.find(i=>i.kind==="end").beat},update({beat:s,tempo:i=120,playing:r,project:n,events:l=[],master:u=0,sec:c=-1,now:h,quiet:d=!1}){let m=60/(i||120),v={dark:0,flames:e,shells:[],confettiT:-1,flash:0,cue:null,active:!1};r&&s<o.lastBeat-1&&t(!0),r&&(o.lastBeat=s),r||(o.plan=null,o.i=0,o.darkFrom=1/0,o.flames.length=0),r&&o.openBeat===null&&(o.openBeat=s);let g=n&&n.song&&n.song.enabled&&Array.isArray(n.song.sections)&&n.song.sections.length>1;if(n!==o.proj&&(o.proj&&r&&(o.placed=!0,o.unsure=!0),o.proj=n),g&&r&&!o.placed&&s>=0){let p=Nu(n),y=n.song.sections,x=n.bars||2,S=p>0?(s%p+p)%p:0,E=0;for(;E<y.length-1&&S>=Na(y[E])*x*4;)S-=Na(y[E])*x*4,E++;o.sec=E,o.secStart=s-S,o.placed=!0,c>=0&&c!==E&&(o.unsure=!0)}for(let p of l)if(p.kind==="section"&&(o.sec=p.v,o.secStart=Math.round(s/4)*4,o.placed=!0,o.unsure=!1,g&&o.plan&&s<o.start)){let y=dl(n);if(y&&p.v===y.section&&Math.abs(o.secStart-o.start)<=2)continue;let x=rl(n,o.sec,o.secStart);(!x||Math.abs(x.startBeat-o.start)>2)&&(o.plan=null,o.i=0,o.lastSongEnd=o.prevSongEnd,o.darkFrom=1/0,o.darkTo=-1/0)}if(r&&!o.plan&&!d){if(g&&o.placed&&!o.unsure){let p=rl(n,o.sec,o.secStart);p&&s<=p.startBeat-4+.5&&p.startBeat-4>=o.openBeat+8&&p.startBeat-4-o.lastSongEnd>=ju*4&&p.startBeat-s<256&&(a.start(Ai(p.startBeat,p.bars)),o.prevSongEnd=o.lastSongEnd,o.lastSongEnd=p.endBeat)}else if(!g){let p=Math.floor(s/4);if(o.bar!==null&&p!==o.bar&&o.cnt){let y=o.sum/o.cnt;p-Math.floor(o.openBeat/4)>=Ao.minBars&&Hu(p,y,o.lastLoop,n&&n.bars||1)&&(a.start(Ai(4*(p+1),Ao.bars)),o.lastLoop=p),o.sum=o.cnt=0}o.bar=p,o.sum+=u,o.cnt++}}let f=o.plan;if(f){for(;o.i<f.length&&f[o.i].beat<=s;){let p=f[o.i++];s-p.beat>2&&p.kind!=="end"||(p.kind==="blackout"?(o.darkFrom=p.beat,o.darkTo=p.end):p.kind==="launch"?(o.launch=p.beat,o.launchTempo=i,o.launchMs=typeof h=="number"?h-(s-p.beat)*m*1e3:null,v.cue="finale"):p.kind==="flames"&&o.flames.push(p),p.flash>0&&(v.flash=Math.max(v.flash,p.flash)))}v.shells=s>=o.start?Uu(f,s,i).slice(-Xr):[],v.active=s>=o.from&&s<o.end,s>o.end+Math.max(...ll)/m&&(o.plan=null,o.i=0)}s>=o.darkFrom&&s<o.darkTo?v.dark=Fu(0,.5,s-o.darkFrom):s>=o.darkTo&&(o.darkFrom=1/0,o.darkTo=-1/0),e.fill(0),o.flames=o.flames.filter(p=>(s-p.beat)*m<Gu);for(let p of o.flames){let y=(s-p.beat)*m,x=y<.08?y/.08:Math.exp(-(y-.08)*3.2);for(let S of p.jets){let E=S*4;x>e[E+3]&&e.set([ol[S][0],ol[S][1],p.height*Math.min(1,.35+y/.12),x],E)}}if(o.launch!==null){let p=o.launchMs!==null&&typeof h=="number"?(h-o.launchMs)/1e3:(s-o.launch)*60/(o.launchTempo||120);p>=0&&p<34?v.confettiT=p:(p>=34||p<-1)&&(o.launch=null)}return v}};return a}var Vu="// the light of the scene on a surface",gl="void main() {",Wu="  vec4 col = vec4(0.0);";function bl(o=fi){let e=o.indexOf(Vu),t=o.lastIndexOf(gl),a=o.indexOf(Wu,t);return e<0||t<e||a<0?null:{head:o.slice(0,e),pose:o.slice(t+gl.length,a)}}var $r=`
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
`,Qr=`
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
`,Jr=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,yl=`#version 300 es
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
uniform vec4 uRamp[4];      // the footlights, lamp by lamp: the bass's notes (low on the left)
uniform vec4 uBulbs[4];     // the bulbs over the screen: the melody's notes
uniform vec4 uLanes;        // the riser's strip under each drummer: its hits
uniform vec3 uBassCol, uLeadCol, uDrumCol;
uniform float uSpeak;       // the speakers' cones push out on the kick
uniform float uBlind;       // the warm lamps of the truss (a new section), glowing as they fade
uniform vec4 uDollCol[7];   // the dancers' colours (their reflections in the lacquered floor)
uniform float uKick;        // the floor quivers with the kick
uniform vec4 uPiece[48];    // the app's pieces when taken apart: centre (w: 1 a frame, 2 and cables, 3 cables only: the
                            // objects on stage), half width, half height
uniform float uLed;         // the big screen without the app on it: it shows the music in lights (0..1)
uniform vec4 uLevels;       // the drum's, the bass's and the melody's levels (0..1), playing
uniform float uNPieces;
uniform vec3 uBurst;        // the finale: the light of the fireworks (their colour \xD7 brightness) and of the flames
${Qr}
out vec4 o;
${$r}
const float DECK_X = 5.6, DECK_Z0 = -7.2, DECK_Z1 = 1.0, GROUND = -1.5;
const vec3 RISER_LO = vec3(-3.4, 0.0, -5.0), RISER_HI = vec3(3.4, 0.95, -3.2);

// a tombstone speaker stack beside the screen: a slab with a round top, two cones on its face; it swells a
// little on the kick. Returns the distance along the ray (1e5: missed), its normal and the point's face coords.
float tombT(vec3 ro, vec3 rd, float cx, out vec3 nn) {
  float k = 1.0 + 0.035 * uSpeak;
  vec3 c = vec3(cx, 0.0, -5.75), hs = vec3(0.44, 1.5, 0.32) * k;     // (tall: their tops show above the drummers)
  float t = 1e5;
  nn = vec3(0.0, 0.0, 1.0);
  vec2 b = boxT(ro, rd, c + vec3(-hs.x, 0.0, -hs.z), c + vec3(hs.x, 2.0 * hs.y, hs.z));
  if (b.x < b.y && b.x > 0.0) {
    t = b.x;
    vec3 p = ro + rd * t - c, q = abs(vec3(p.x / hs.x, (p.y - hs.y) / hs.y, p.z / hs.z));
    nn = q.x > q.y && q.x > q.z ? vec3(sign(p.x), 0.0, 0.0) : q.y > q.z ? vec3(0.0, sign(p.y - hs.y), 0.0) : vec3(0.0, 0.0, sign(p.z));
  }
  vec3 top = c + vec3(0.0, 2.0 * hs.y, 0.0), oc = ro - top;
  float a = dot(rd.xy, rd.xy), bb = dot(oc.xy, rd.xy), cc = dot(oc.xy, oc.xy) - hs.x * hs.x, h = bb * bb - a * cc;
  if (h > 0.0 && a > 1e-6) {
    float tc = (-bb - sqrt(h)) / a;
    vec3 p = oc + rd * tc;
    if (tc > 0.0 && tc < t && abs(p.z) < hs.z && p.y > 0.0) { t = tc; nn = normalize(vec3(p.xy, 0.0)); }
  }
  float tf = (c.z + hs.z - ro.z) / rd.z;
  vec3 pf = ro + rd * tf - top;
  if (tf > 0.0 && tf < t && pf.y > 0.0 && length(pf.xy) < hs.x) { t = tf; nn = vec3(0.0, 0.0, 1.0); }
  return t;
}
float sel4(vec4 v[4], int i) { int k = clamp(i, 0, 15); vec4 w = v[k / 4]; int j = k - (k / 4) * 4; return j == 0 ? w.x : j == 1 ? w.y : j == 2 ? w.z : w.w; }

vec3 sky(vec3 rd) {
  float el = rd.y, az = atan(rd.x, -rd.z);
  vec3 c = mix(vec3(0.16, 0.06, 0.22), vec3(0.015, 0.01, 0.04), smoothstep(-0.05, 0.55, el));
  c += vec3(0.5, 0.18, 0.32) * exp(-max(el, 0.0) * 9.0) * 0.35;                // glow of the stage on the haze
  c += uBurst * (0.05 + 0.2 * exp(-max(el, 0.0) * 2.5));                      // the fireworks light the smoke and the haze
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
  // the app's pieces (taken apart): a frame round each one, lit along its edge
  int pieceI = -1; vec2 pieceAB = vec2(0.0);
  for (int k = 0; k < 16; k++) {
    if (float(k) >= uNPieces) break;
    if (uPiece[k * 3].w > 2.5) continue;
    vec3 pc = uPiece[k * 3].xyz, pu = uPiece[k * 3 + 1].xyz, pv = uPiece[k * 3 + 2].xyz;
    vec3 pn = cross(pu, pv);
    float den = dot(rd, pn);
    if (abs(den) < 1e-6) continue;
    float t = dot(pc - ro, pn) / den;
    if (t <= 0.0 || t >= tHit) continue;
    vec3 q = ro + rd * t - pc;
    float a = dot(q, pu) / dot(pu, pu), bq = dot(q, pv) / dot(pv, pv);
    float ma = 0.08 / length(pu), mb = 0.08 / length(pv);
    if (abs(a) < 1.0 + ma && abs(bq) < 1.0 + mb) { tHit = t; what = 8; pieceI = k; pieceAB = vec2(abs(a) - 1.0 - ma * 0.5, abs(bq) - 1.0 - mb * 0.5) / vec2(ma, mb); }
  }
  // the two tombstone speakers, beside the screen
  vec3 tn = vec3(0.0), tombN = vec3(0.0, 0.0, 1.0);
  float tombX = 0.0;
  for (int k = 0; k < 2; k++) {
    float cx = k == 0 ? -(sw + 0.86) : sw + 0.86;
    float tt = tombT(ro, rd, cx, tn);
    if (tt < tHit) { tHit = tt; what = 7; tombN = tn; tombX = cx; }
  }
  // the hanging pieces' cables, from their top corners up to the truss
  float cable = 0.0;
  for (int k = 0; k < 16; k++) {
    if (float(k) >= uNPieces) break;
    if (uPiece[k * 3].w < 1.5) continue;
    vec3 pc = uPiece[k * 3].xyz, pu = uPiece[k * 3 + 1].xyz, pv = uPiece[k * 3 + 2].xyz;
    // (each cable is upright: where the ray passes closest to it is found in plan view, as for the flames)
    float hz = max(dot(rd.xz, rd.xz), 1e-6);
    for (int j = 0; j < 2; j++) {
      vec3 a = pc + pv + pu * (j == 0 ? -0.85 : 0.85);
      float tc = -dot(ro.xz - a.xz, rd.xz) / hz;
      if (tc <= 0.0 || tc >= tHit) continue;
      vec3 Q = ro + rd * tc;
      if (Q.y < a.y || Q.y > 10.1) continue;
      float dist = length(Q.xz - a.xz), px = max(tc * 0.0012, 0.004);
      cable = max(cable, smoothstep(px * 1.5, px * 0.3, dist));
    }
  }
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
      float note = sel4(uRamp, int(floor(P.x * 1.25 + 7.0)));     // (this lamp's own note of the bass)
      emit += (uFoot * 3.0 + vec3(0.15, 0.08, 0.03) + (uBassCol * 2.0 + vec3(0.6)) * note * 4.0) * lamp;
      emit += uBassCol * note * 0.6 * smoothstep(0.6, 0.0, abs(fract(P.x * 1.25) - 0.5) + abs(P.y + 0.12));
    } else if (what == 4) {
      n = abs(P.y - RISER_HI.y) < 0.01 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0);
      base = n.y > 0.5 ? vec3(0.06, 0.04, 0.05) : vec3(0.025, 0.018, 0.03);
      // a strip of light along the riser's front, in the drum's colour
      if (n.z > 0.5) {
        // (a segment under each drummer lights up on its own hits)
        float lane = P.x < -1.54 ? uLanes.x : P.x < 0.0 ? uLanes.y : P.x < 1.54 ? uLanes.z : uLanes.w;
        float strip = smoothstep(0.05, 0.0, abs(P.y - RISER_HI.y + 0.12));
        emit += (uRiserCol * 2.5 + (uDrumCol * 3.0 + vec3(0.8)) * lane * 3.0) * strip + uDrumCol * lane * 0.5 * smoothstep(0.5, 0.0, abs(P.y - RISER_HI.y + 0.12));
      }
    } else if (what == 8) {
      // a piece's frame: dark metal, a strip of light along its edge (the accent colour, breathing on the beat)
      n = normalize(cross(uPiece[pieceI * 3 + 1].xyz, uPiece[pieceI * 3 + 2].xyz));
      if (dot(n, rd) > 0.0) n = -n;
      base = vec3(0.03, 0.025, 0.04);
      float edge = smoothstep(0.35, 0.0, abs(max(pieceAB.x, pieceAB.y) + 0.1));
      emit += uScreenCol * (0.6 + 1.6 * uBeat) * edge;
    } else if (what == 7) {
      // tombstone speakers: weathered stone, a cross cut in the top, two cones that push out on the kick
      n = tombN;
      float g = n2(P.xy * 9.0) * 0.6 + n2(P.zy * 23.0) * 0.4;
      base = mix(vec3(0.15, 0.145, 0.17), vec3(0.26, 0.25, 0.28), g);
      if (n.z > 0.5) {
        vec2 q = vec2(P.x - tombX, P.y);
        float k = 1.0 + 0.035 * uSpeak;
        float cr = max(step(abs(q.x), 0.035) * step(abs(q.y - 3.18 * k), 0.17), step(abs(q.y - 3.24 * k), 0.035) * step(abs(q.x), 0.11));
        base *= 1.0 - 0.6 * cr;
        for (int c = 0; c < 2; c++) {
          vec2 cc = vec2(0.0, (c == 0 ? 1.95 : 2.7) * k);
          float rr = (c == 0 ? 0.29 : 0.2) * k, d = length(q - cc);
          float cone = smoothstep(rr, rr - 0.015, d);
          float ring = smoothstep(0.02, 0.0, abs(d - rr * (0.62 - 0.08 * uSpeak)));
          base = mix(base, vec3(0.02, 0.018, 0.025) + vec3(0.08) * ring, cone);
          emit += uDrumCol * ring * (0.12 + 0.8 * uSpeak) * cone;
          emit += (uDrumCol * 1.5 + vec3(0.3)) * uSpeak * smoothstep(rr * 0.22, rr * 0.12, d) * 1.6;
        }
      }
    } else if (what == 6) {
      // truss: a lattice of tubes catching the light
      vec3 a = abs(fract(P * 1.8) - 0.5);
      float tube = smoothstep(0.42, 0.5, max(a.x, a.y)) + smoothstep(0.42, 0.5, max(a.y, a.z)) * 0.6;
      n = normalize(vec3(sign(P.x) * 0.3, 0.2, 1.0));
      base = vec3(0.04, 0.035, 0.05) + vec3(0.18, 0.17, 0.2) * clamp(tube, 0.0, 1.0);
      // the warm blinders along the truss: white-hot on a new section, then glowing orange as they fade
      if (P.y > 10.0) {
        float bx = abs(P.x), lx = bx < 1.6 ? 0.8 : bx < 3.2 ? 2.4 : 4.0;
        float disc = smoothstep(0.17, 0.11, length(vec2(bx - lx, P.y - 10.3)));
        emit += mix(vec3(1.0, 0.35, 0.06), vec3(1.6, 1.3, 1.0), smoothstep(0.4, 1.0, uBlind)) * disc * (0.08 + 4.0 * uBlind);
      }
    } else {
      n = vec3(0.0, 0.0, 1.0);
      vec2 q = vec2(abs(P.x), P.y);
      // the frame round the screen (the app sits exactly in its hole), with a row of strobe lamps on top
      float inFrame = step(q.x, sw + 0.22) * step(sb - 0.22, P.y) * step(P.y, stp + 0.32);
      base = mix(vec3(0.02, 0.016, 0.03), vec3(0.05, 0.045, 0.06), inFrame);
      float bolts = smoothstep(0.035, 0.02, length(vec2(fract(P.x * 2.0) - 0.5, (P.y - stp - 0.17) * 2.0))) * inFrame;
      emit += mix(vec3(0.1, 0.08, 0.12), vec3(1.4, 1.35, 1.5), uStrobe) * bolts * (0.3 + 2.5 * uStrobe);
      emit += (uLeadCol * 2.0 + vec3(0.7)) * bolts * sel4(uBulbs, int(floor(P.x * 2.0 + 8.0))) * 3.5;     // (the melody, note by note)
      // scaffolding: a lattice of pipes
      float lat = smoothstep(0.03, 0.0, min(abs(fract(P.x * 0.7 + P.y * 0.7) - 0.5), abs(fract(P.x * 0.7 - P.y * 0.7) - 0.5)));
      base += vec3(0.05, 0.04, 0.06) * lat * (1.0 - inFrame);
      // the screen's glow spilling on its frame
      emit += uScreenCol * 0.12 * inFrame;
      // the screen with no app on it: an LED wall playing the music (bars for the drum, the bass and the
      // melody, a ring on the beat), dot by dot
      if (uLed > 0.0 && q.x < sw && P.y > sb && P.y < stp) {
        vec2 sc = vec2(P.x / sw * 0.5 + 0.5, (P.y - sb) / (stp - sb));
        float asp = (stp - sb) / (2.0 * sw);
        vec2 g = fract(sc * vec2(40.0, 40.0 * asp)) - 0.5;
        float dotm = smoothstep(0.5, 0.25, length(g));
        float colI = floor(sc.x * 21.0), part = floor(colI / 7.0);
        float lv = part < 0.5 ? uLevels.x : part < 1.5 ? uLevels.y : uLevels.z;
        float hb = lv * (0.45 + 0.55 * n2(vec2(colI * 1.7, uTime * 5.0))) * 0.62;
        float bar = step(sc.y, hb) * step(0.2, fract(sc.x * 21.0)) * step(fract(sc.x * 21.0), 0.85);
        vec3 pc3 = part < 0.5 ? uDrumCol : part < 1.5 ? uBassCol : uLeadCol;
        vec3 ledc = pc3 * bar * (0.8 + 1.6 * sc.y) + vec3(0.025, 0.018, 0.035);
        float ring = length((sc - vec2(0.5, 0.8)) * vec2(1.0, asp));
        ledc += (uScreenCol * 2.0 + vec3(0.3)) * smoothstep(0.035, 0.0, abs(ring - 0.11 - 0.06 * uBeat)) * uLevels.w;
        base = mix(base, vec3(0.01), uLed);
        emit = mix(emit, ledc * dotm * 2.4, uLed);
      }
    }
    vec3 lit = base * lightOn(P, n) * 3.0;
    if (what == 2 || what == 4) lit *= shadows(P);
    lit += emit;
    // a sheen on the deck: the moon mirrored on the boards
    if (what == 2) {
      // the lacquered floor: it mirrors the screen's glow, the moving heads, the dancers (as soft colours) and
      // quivers with the kick
      vec3 nr = normalize(n + vec3(sin(P.x * 6.0 + uTime * 9.0), 0.0, cos(P.z * 5.0 - uTime * 8.0)) * 0.03 * uKick);
      vec3 R = reflect(rd, nr);
      float fres = 0.1 + 0.6 * pow(1.0 - max(dot(-rd, nr), 0.0), 4.0);
      vec3 refl = vec3(0.4, 0.4, 0.55) * pow(max(dot(R, uMoonDir), 0.0), 30.0) * 0.4;
      float ts = (sz - P.z) / min(R.z, -1e-4);
      vec3 S = P + R * ts;
      if (R.z < 0.0 && ts > 0.0) refl += uScreenCol * 1.4 * smoothstep(0.1, -0.2, abs(S.x) - sw) * smoothstep(sb - 0.2, sb + 0.1, S.y) * smoothstep(stp + 0.2, stp - 0.1, S.y);
      for (int i = 0; i < 4; i++) refl += uSpotCol[i] * uSpotPos[i].w * pow(max(dot(R, normalize(uSpotPos[i].xyz - P)), 0.0), 300.0) * 2.5;
      for (int i = 0; i < 7; i++) {
        if (float(i) >= uNDolls) break;
        vec4 d = uDolls[i];
        vec2 dxz = d.xz - P.xz, rxz = R.xz;
        float tq = dot(dxz, rxz) / max(dot(rxz, rxz), 1e-5);
        vec3 Q = P + R * tq;
        float dd = length(Q.xz - d.xz);
        float inside = smoothstep(0.55 * d.w, 0.25 * d.w, dd) * step(0.0, tq) * smoothstep(d.y + 2.3 * d.w, d.y + 1.6 * d.w, Q.y) * step(d.y, Q.y);
        refl += uDollCol[i].rgb * inside * 0.45;
      }
      lit += refl * fres;
    }
    // haze: far away things sink into the night
    float fog = 1.0 - exp(-tHit * 0.035);
    col = mix(lit, vec3(0.06, 0.03, 0.08), fog * 0.6);
  }
  col = mix(col, vec3(0.05, 0.045, 0.06), cable * 0.85);
  col += vec3(0.25, 0.1, 0.3) * uBeat * 0.03;
  col += uBurst * 0.035;
  o = vec4(col * uFade, 1.0);
}`,xl=`#version 300 es
in vec2 aCorner;
in vec4 iRect;    // here: the feet (world, m) and the size (m per doll unit)
in vec4 iPlate;   // dance spotlight (long legs), -, -, spin
in vec4 iDoll;    // -, -, 1, type
in vec4 iAnimA; in vec4 iAnimB; in vec4 iAnimC; in vec4 iColor;
in vec4 iPoseA; in vec4 iPoseB; in vec4 iPoseC; in vec4 iPoseD;
in vec4 iBox;     // the dancer's box in its own units, from its pose: half width, top, half depth
uniform mat4 uVP;
out vec2 vPos;
flat out vec4 vRect, vPlate, vDoll, vA, vB, vC, vCol, vPA, vPB, vPC, vPD, vBox;
void main() {
  // the dancer's box (its own units: feet at y = \u22121.1), as tight as its pose allows, on screen: only the
  // pixels where it can be are worked out
  vec2 lo = vec2(1e9), hi = vec2(-1e9);
  for (int i = 0; i < 8; i++) {
    vec3 c = vec3((i & 1) == 0 ? -iBox.x : iBox.x, (i & 2) == 0 ? -1.16 : iBox.y, (i & 4) == 0 ? -iBox.z : iBox.z);
    vec4 p = uVP * vec4(iRect.xyz + (c + vec3(0.0, 1.1, 0.0)) * iRect.w, 1.0);
    vec2 n = p.xy / max(p.w, 0.05);
    lo = min(lo, n); hi = max(hi, n);
  }
  vec2 ndc = mix(lo, hi, aCorner);
  vPos = ndc;
  vRect = iRect; vPlate = iPlate; vDoll = iDoll; vA = iAnimA; vB = iAnimB; vC = iAnimC; vCol = iColor; vPA = iPoseA; vPB = iPoseB; vPC = iPoseC; vPD = iPoseD; vBox = iBox;
  gl_Position = vec4(ndc, 0.0, 1.0);
}`;function wl(o){return`${o.head}
flat in vec4 vBox;
uniform mat4 uInvVP;
uniform vec3 uEye;
uniform float uPix;         // the size of a pixel (radians)
uniform int uSteps;
uniform float uWash;        // the moon and the front-of-house wash (1; down in the finale's darkness)
${Qr}
${$r}

// the stage's light on a dancer (p: the doll's own units, P: the same point in the world)
vec3 shadeShow(vec3 p, vec3 P, vec3 n, vec3 V, vec3 base, float spec, float emit, float sss) {
  float ao = clamp(0.45 + 0.55 * sceneMap(p + n * 0.12).x / 0.12, 0.25, 1.0);
  vec3 lit = base * vec3(0.05, 0.045, 0.06) * ao;
  float dm = max(dot(n, uMoonDir), 0.0), wm = max(dot(n, uMoonDir) * (1.0 - sss) + sss, 0.0);
  lit += base * vec3(0.5, 0.55, 0.8) * mix(dm, wm, sss) * 0.35 * uWash;
  // the front-of-house wash: a warm white from the audience, so that each character keeps its colours
  vec3 Lw = normalize(vec3(0.15, 0.4, 0.9));
  float dw = max(dot(n, Lw) * (1.0 - sss) + sss * 0.6, 0.0);
  lit += (base * vec3(1.0, 0.92, 0.84) * dw * 0.55 * ao + spec * vec3(1.0, 0.95, 0.9) * pow(max(dot(n, normalize(Lw + V)), 0.0), 50.0) * 0.4) * uWash;
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
${o.pose}
  vec4 f = uInvVP * vec4(vPos, 1.0, 1.0);
  vec3 rdW = normalize(f.xyz / f.w - uEye);
  float s = vRect.w;
  vec3 ro = (uEye - vRect.xyz) / s - vec3(0.0, 1.1, 0.0), rd = rdW;
  vec2 tb = boxT(ro, rd, vec3(-vBox.x, -1.13, -vBox.z), vec3(vBox.x, vBox.y, vBox.z));
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
  vec3 p = ro + rd * t;
  // (a near miss: back to its closest point, measured again so that the head's coordinates are this point's;
  // a hit was the last point measured)
  if (h.x >= max(0.0015, t * uPix * 0.3) || t > tb.y) { t = tmin; p = ro + rd * t; h = sceneMap(p); }
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
}`}var kl=`#version 300 es
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
uniform vec4 uLasers[2];    // the seven lasers over the screen (the melody's notes, low on the left), and an eighth
uniform vec3 uLaserCol;
uniform vec4 uScreenTop;    // the screen's half width, top, z, and the lasers' fan (it swings with the beat)
uniform float uCeil;        // the bass's laser ceiling over the crowd
uniform vec3 uCeilCol;
uniform float uTunnel;      // a laser tunnel round the camera (a new section, an encore)
uniform vec4 uFlare[10];    // lens flares: canvas px x, y, strength, size (the moving heads crossing the camera, the blinders)
uniform vec3 uFlareCol[10];
uniform float uPhones;      // the crowd's phones up (the quiet passages)
uniform float uOla;         // seconds since a new section: the wave crosses the crowd (\u22121: none)
uniform float uClap;        // the crowd claps above its heads
uniform float uFade;        // 0..1: the beams appear with the night as the app moves away
uniform float uTime;
uniform vec4 uFlame[4];     // the finale's flame jets at the stage's edge: x, z (m), height (m), strength (0: out)
uniform vec4 uHand;         // \xAB Dans le public \xBB: the hand holding the phone (canvas px: the middle of its bottom edge,
                            // its width; w: how much it is there)
uniform vec2 uHandDir;      // along the phone's bottom edge (canvas, y up): the hand turns with the phone
${Qr}
out vec4 o;
${$r}
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
  float along = 1.0 + 0.8 * pow(abs(b), 6.0);
  float dust = 0.75 + 0.5 * n2(vec2(s * 3.0 - uTime * 0.6, r * 9.0 + float(i) * 7.0));
  float spark = step(0.993, h2(floor(vec2(s * 10.0, r * 30.0) + floor(uTime * 12.0)))) * uSparkle * smoothstep(R * 0.6, 0.0, r);
  return uSpotCol[i] * uSpotPos[i].w * (k * along * dust * 0.2 * uHaze + spark * 0.35);
}
// a laser: a thin beam of light from a to b, seen along the ray (its closest point), a sharp core and a glow in
// the haze; the core never thinner than a pixel
float laser(vec3 ro, vec3 rd, vec3 a, vec3 b) {
  vec3 ab = b - a; float L = length(ab); vec3 u = ab / L;
  vec3 w0 = ro - a;
  float bb = dot(rd, u), d = dot(rd, w0), e = dot(u, w0), den = max(1.0 - bb * bb, 1e-5);
  float s = clamp((e - bb * d) / den, 0.0, L);
  vec3 P = a + u * s;
  float t = max(dot(P - ro, rd), 0.0);
  float dist = length(ro + rd * t - P), px = max(t * uPix, 0.003);
  return exp(-dist * dist / (px * px * 1.2)) + exp(-dist / (px * 7.0)) * 0.12;
}
vec3 lasers(vec3 ro, vec3 rd) {
  vec3 c = vec3(0.0);
  float sw = uScreenTop.x, top = uScreenTop.y, z = uScreenTop.z, fan = uScreenTop.w;
  // the melody: seven lasers on the top of the screen's frame, each one fired by its notes, towards the crowd
  for (int i = 0; i < 7; i++) {
    float k = i < 4 ? uLasers[0][i] : uLasers[1][i - 4];
    if (k < 0.01) continue;
    float fi = float(i) - 3.0;
    vec3 a = vec3(fi * sw * 0.28, top + 0.42, z + 0.3);
    vec3 b = a + normalize(vec3(fi * 0.32 + 0.25 * sin(fan + fi), -0.08 + 0.12 * cos(fan * 0.7 + fi * 1.7), 1.0)) * 30.0;
    c += uLaserCol * k * laser(ro, rd, a, b);
  }
  // the bass: a ceiling of lasers fanning over the crowd from both sides of the truss, turning slowly
  if (uCeil > 0.01) {
    for (int i = 0; i < 4; i++) {
      float fi = float(i), side = i < 2 ? -1.0 : 1.0;
      vec3 a = vec3(side * 4.6, 9.6, z + 0.5);
      float ang = fan * 0.3 + fi * 0.55;
      vec3 b = vec3(-side * (2.0 + 9.0 * fract(fi * 0.37 + fan * 0.05)), 4.2 + sin(ang) * 0.8, 9.0 + 4.0 * cos(ang));
      c += uCeilCol * uCeil * 0.7 * laser(ro, rd, a, b);
    }
  }
  // a tunnel: twelve lasers from the screen's middle, flaring out past the camera and turning
  if (uTunnel > 0.01) {
    vec3 a = vec3(0.0, top - 2.7, z + 0.3);
    for (int i = 0; i < 8; i++) {
      float ang = float(i) * 0.7854 + fan * 0.8;
      vec3 b = vec3(cos(ang) * 6.0, top - 2.7 + sin(ang) * 6.0, 18.0);
      c += mix(uLaserCol, uCeilCol, float(i - (i / 2) * 2)) * uTunnel * laser(ro, rd, a, b);
    }
  }
  return c;
}
// lens flares: a star, a soft halo and a long sideways streak round a light that looks into the camera
vec3 flares(vec2 fc) {
  vec3 c = vec3(0.0);
  for (int i = 0; i < 10; i++) {
    vec4 f = uFlare[i];
    if (f.z < 0.01) continue;
    vec2 d = (fc - f.xy) / f.w;
    float r = length(d), a = atan(d.y, d.x);
    float halo = exp(-r * r * 3.0), core = exp(-r * r * 40.0);
    float star = pow(abs(cos(a * 3.0)), 40.0) * exp(-r * 2.2);
    float streak = exp(-abs(d.y) * 18.0) * exp(-abs(d.x) * 0.55);
    c += uFlareCol[i] * f.z * (halo * 0.14 + core * 1.2 + star * 0.5 + streak * 0.22);
  }
  return c;
}

// the finale's flames: a jet of fire from the stage's edge, seen along the ray where it passes the jet's
// axis (vertical): a body that widens and licks upwards, a white-hot core at the nozzle, a glow in the haze
vec3 flames(vec3 ro, vec3 rd) {
  vec3 c = vec3(0.0);
  float hz = max(dot(rd.xz, rd.xz), 1e-5);
  vec2 side = normalize(vec2(-rd.z, rd.x));
  for (int j = 0; j < 4; j++) {
    vec4 F = uFlame[j];
    if (F.w < 0.01) continue;
    vec2 w0 = ro.xz - F.xy;
    float t = max(-dot(w0, rd.xz) / hz, 0.0);
    vec3 P = ro + rd * t;
    float h = P.y / F.z;                            // 0 at the nozzle, 1 at the top
    if (h < -0.1 || h > 1.6) continue;
    float s = dot(P.xz - F.xy, side);               // across the jet, as the camera sees it (m)
    float hc = clamp(h, 0.0, 1.0), fl = float(j) * 5.3;
    s += (n2(vec2(P.y * 2.2 - uTime * 7.0, fl)) - 0.5) * 0.45 * hc;      // (it sways)
    float R = mix(0.1, 0.42, sqrt(hc)) + 0.02;
    float body = exp(-s * s / (R * R) * 1.6);
    float tongue = n2(vec2(s * 4.0 + fl, P.y * 3.0 - uTime * 11.0));
    float dens = body * smoothstep(1.2, 0.55, h + 0.4 * tongue) * smoothstep(-0.06, 0.06, h);
    float core = exp(-s * s / (R * R) * 7.0) * (1.0 - smoothstep(0.05, 0.6, h));
    vec3 col = mix(vec3(0.95, 0.16, 0.02), vec3(1.0, 0.62, 0.12), body) + vec3(1.0, 0.92, 0.7) * core * 1.4;
    c += col * dens * F.w * 1.6;
    c += vec3(1.0, 0.38, 0.06) * F.w * 0.14 * exp(-abs(s) * 1.1) * smoothstep(1.8, 0.2, h) * step(-0.05, h);
  }
  return c;
}

float seg2(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }

// \xAB Dans le public \xBB: the spectator's hand and forearm under the phone (the phone itself, the app, is laid
// over this canvas): a dark silhouette rimmed by the stage's light, in units of the phone's width
float capsule(vec2 p, vec2 a, vec2 b, float r) { return seg2(p, a, b) - r; }
float handD(vec2 p) {
  float d = capsule(p, vec2(0.12, 0.25), vec2(0.95, -3.2), 0.36);                      // wrist and forearm
  d = min(d, length((p - vec2(0.02, 0.32)) * vec2(1.0, 1.25)) - 0.5);                   // the palm, behind the phone
  for (int k = 0; k < 3; k++) d = min(d, capsule(p, vec2(-0.3, 0.42 + 0.26 * float(k)), vec2(-0.6, 0.47 + 0.27 * float(k)), 0.085));
  d = min(d, capsule(p, vec2(0.35, 0.1), vec2(0.6, 0.52), 0.1));                         // the thumb
  return d;
}
vec4 hand(vec2 fc) {
  if (uHand.w < 0.01) return vec4(0.0);
  vec2 ax = dot(uHandDir, uHandDir) > 0.25 ? normalize(uHandDir) : vec2(1.0, 0.0), q = (fc - uHand.xy) / uHand.z;
  vec2 p = vec2(dot(q, ax), dot(q, vec2(-ax.y, ax.x)));
  float d = handD(p), w = 1.2 / uHand.z;
  float a = clamp(0.5 - d / w, 0.0, 1.0) * uHand.w;
  if (a <= 0.0) return vec4(0.0);
  // (lit along the edges that face the stage: up and to the left)
  float rim = clamp((handD(p - vec2(-0.05, 0.06)) - d) * 9.0, 0.0, 1.0) * smoothstep(-0.12, 0.0, d);
  vec3 c = vec3(0.018, 0.013, 0.02) + ((uSpotCol[0] + uSpotCol[1] + uSpotCol[2] + uSpotCol[3]) * 0.14 + uScreenCol * 0.6 + uFoot * 0.3) * rim;
  return vec4(c, a);
}

// the crowd: rows of people, one row per plane in front of the stage (the nearest row first: it hides the
// ones behind); dark against the light with a rim of the stage's light; some raise their arms, some hold up
// a phone; they jump on the kick
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
    // the wave (a new section) runs across the crowd from left to right: up they go as it passes
    float ola = uOla >= 0.0 ? exp(-pow((P.x - (-10.0 + uOla * 7.5)) / 1.1, 2.0)) : 0.0;
    float jump = uJump * (0.1 + 0.1 * hs) * step(0.4, hs2) + ola * 0.35;
    float base = -1.5 + 1.34 * sz + jump;                  // shoulders
    float lean = (hs - 0.5) * 2.0 * max(0.0, 0.25 - 0.2 * sz);   // (off-centre, but never out of its cell)
    vec2 q = vec2(fx * cw + lean, P.y - base) / sz;
    float head = length((q - vec2(0.0, 0.2)) * vec2(1.0, 0.86)) - 0.095;
    vec2 bq = q - vec2(0.0, -0.4);
    float body = length(max(abs(bq) - vec2(0.13, 0.36), 0.0)) - 0.07;
    float d = min(head, body);
    float w = t * uPix / sz;               // (a pixel, in the row's own units: the edges are smoothed over it)
    // arms up: shoulder, elbow, hand; one or both, swaying with the music
    if (hs2 > 0.45 - ola - uClap * 0.5) {
      float sw = 0.06 * sin(uTime * 3.0 + hs * 20.0) + 0.05 * uBeat;
      for (int a = 0; a < 2; a++) {
        float sd = a == 0 ? 1.0 : -1.0;
        if (a == 1 && hs2 < 0.8 - ola - uClap) break;
        vec2 s0 = vec2(0.15 * sd, 0.0), e0 = vec2((0.25 + 0.04 * hs) * sd, 0.27 + 0.05 * hs), w0 = vec2((0.19 + sw) * sd, 0.55 + 0.06 * hs);
        // (clapping: both hands meet over the head)
        w0 = mix(w0, vec2(0.03 * sd, 0.66), uClap); e0 = mix(e0, vec2(0.22 * sd, 0.36), uClap);
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
      if (hs3 > 0.94 - 0.45 * uPhones && hs2 > 0.45) { vec2 ph = (q - vec2(0.2, 0.66)) / vec2(0.028, 0.045); c += vec3(0.35, 0.45, 0.8) * exp(-dot(ph, ph) * 1.5) * 0.9; }
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
    c += lasers(ro, rd) * uHaze;
    c *= uFade;
  }
  if (uBeams < 0.5) c += flames(ro, rd) * uFade;     // (in front of the dancers, behind the crowd)
  vec4 cr = uCrowd > 0.0 ? crowd(ro, rd) : vec4(0.0);
  float a = cr.a * uCrowd;
  vec3 rgb = c * (1.0 - a) + cr.rgb * a;
  if (uBeams < 0.5) { vec4 hd = hand(gl_FragCoord.xy); rgb = rgb * (1.0 - hd.a) + hd.rgb * hd.a; a = max(a, hd.a); }
  rgb += vec3(1.0, 0.97, 0.92) * uWhite;
  if (uBeams < 0.5) rgb += flares(gl_FragCoord.xy) * uFade;    // (over everything: they happen in the lens)
  // (added light: its alpha stays low so the app under it is lit, not hidden)
  float al = clamp(max(a, uWhite + 0.25 * max(max(rgb.r, rgb.g), rgb.b)), 0.0, 1.0);
  o = vec4(rgb, al);
}`,Sl=`#version 300 es
in vec2 aPos;                       // the unit quad
uniform mat4 uVP;
uniform vec3 uC0, uC1, uC2, uC3;    // its corners in the world: top left, top right, bottom right, bottom left
out vec2 vUV;
void main() {
  vec3 p = mix(mix(uC0, uC1, aPos.x), mix(uC3, uC2, aPos.x), aPos.y);
  vUV = vec2(aPos.x, 1.0 - aPos.y);
  gl_Position = uVP * vec4(p, 1.0);
}`,Ml=`#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uTex;
uniform vec2 uLed;                  // how many LEDs across and down
uniform vec3 uTint;                 // the stage's light on its frame
uniform float uFade;
uniform float uDark;                // the finale's darkness (0: none): the screens go down with the stage
out vec4 o;
void main() {
  vec2 g = vUV * uLed, c = fract(g) - 0.5;
  vec3 s = texture(uTex, (floor(g) + 0.5) / uLed).rgb;
  float led = smoothstep(0.52, 0.2, length(c));
  vec3 col = vec3(0.015, 0.012, 0.025) + s * (0.25 + 1.25 * led);
  // a dark frame round it, catching a little of the stage's light
  float fr = step(0.035, vUV.x) * step(vUV.x, 0.965) * step(0.025, vUV.y) * step(vUV.y, 0.975);
  col = mix(vec3(0.035, 0.03, 0.045) + uTint * 0.05, col, fr);
  o = vec4(col * uFade * (1.0 - 0.8 * uDark), uFade);
}`,Lo=4,Tl=`#version 300 es
precision highp float;
precision highp int;
uniform mat4 uVP;
uniform vec3 uEye;
uniform float uPix;         // the size of a canvas pixel (radians)
uniform vec4 uShell[32];    // x, y, z (m), type \xD7 4096 + seed
uniform vec4 uShellT[32];   // s since its burst (< 0: climbing), colour (0..3), brightness, 0
uniform vec3 uCols[4];      // the parts' colours
uniform vec4 uScreen;       // the big screen (half width, bottom, top, z): the back wall round it hides the sky
out vec3 vCol;
out float vB;
${pl}
// is the spark behind the back wall, the truss or its towers (the eye looks at it through them)? The same
// boxes as STAGE_FS draws.
bool behindStage(vec3 e, vec3 p) {
  vec3 d = p - e;
  if (abs(d.z) < 1e-4) return false;
  float t = (uScreen.w - 0.02 - e.z) / d.z;
  if (t > 0.0 && t < 1.0) { vec3 q = e + d * t; if (abs(q.x) < uScreen.x + 1.1 && q.y > 0.0 && q.y < uScreen.z + 0.75) return true; }
  t = (uScreen.w + 0.48 - e.z) / d.z;
  if (t > 0.0 && t < 1.0) { vec3 q = e + d * t; if ((abs(q.x) < 5.2 && q.y > 10.1 && q.y < 10.5) || (abs(abs(q.x) - 4.9) < 0.22 && q.y < 10.5)) return true; }
  return false;
}
void main() {
  int per = ${Li} * ${Lo};
  int s = gl_VertexID / per, r = gl_VertexID - s * per, i = r / ${Lo}, tr = r - i * ${Lo};
  vec4 T = uShellT[s];
  float t = T.x - float(tr) * 0.035;
  vec4 p = shellParticle(uShell[s], float(i), t);
  float b = p.w * (1.0 - float(tr) * 0.24) * T.z * smoothstep(2.5, 5.5, p.y);
  if (t < 0.0 && T.x >= 0.0) b = 0.0;               // (the comet's trail does not cross the burst)
  if (b > 0.004 && behindStage(uEye, p.xyz)) b = 0.0;
  vec4 q = uVP * vec4(p.xyz, 1.0);
  float dist = max(length(p.xyz - uEye), 1.0);
  gl_PointSize = b > 0.004 ? clamp(0.16 / (dist * uPix), 2.0, 14.0) * (tr == 0 ? 1.0 : 0.7) : 0.0;
  gl_Position = b > 0.004 ? q : vec4(2.0, 2.0, 2.0, 1.0);
  int ty = int(uShell[s].w + 0.5) / 4096;
  vec3 c = uCols[int(T.y + 0.5) & 3];
  c = ty == 2 ? mix(c, vec3(1.0, 0.72, 0.32), 0.65) : c;           // (a willow burns gold)
  float hot = t < 0.0 ? 0.0 : exp(-t * 3.0);
  vCol = t < 0.0 ? vec3(1.0, 0.7, 0.35) : mix(c * 1.2 + 0.08, vec3(1.0, 0.96, 0.88), hot * 0.75);
  vB = b;
}`,El=`#version 300 es
precision mediump float;
in vec3 vCol;
in float vB;
out vec4 o;
void main() {
  vec2 d = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(d, d);
  if (r2 > 1.0) discard;
  float k = exp(-r2 * 5.0) * 0.6 + exp(-r2 * 28.0) * 1.4;
  o = vec4(vCol * vB * k, 0.0);           // (added light)
}`,Al=`#version 300 es
precision highp float;
precision highp int;
uniform mat4 uVP;
uniform vec3 uEye;
uniform float uPix;
uniform float uT;           // s since the launch
uniform float uFloor;       // 1: only those lying on the floor; 0: only those in the air
uniform float uFadeC;       // they fade at last (30 s after the launch)
uniform vec3 uCols[4];
uniform vec3 uLight;        // the stage's light on them
out vec3 vCol;
out float vRot;
out float vW;
${ml}
void main() {
  float fi = float(gl_VertexID);
  vec4 p = confetti(fi, uT);
  bool down = p.y < 0.01;
  float on = p.w > 0.0 && (down == (uFloor > 0.5)) ? 1.0 : 0.0;
  vec4 q = uVP * vec4(p.xyz, 1.0);
  float dist = max(length(p.xyz - uEye), 0.5);
  gl_PointSize = on > 0.0 ? clamp(0.075 / (dist * uPix), 1.5, 12.0) : 0.0;
  gl_Position = on > 0.0 ? q : vec4(2.0, 2.0, 2.0, 1.0);
  vec3 c = uCols[gl_VertexID & 3];
  vCol = min(c * (0.3 + 0.9 * p.w) * uLight, vec3(1.0));
  vRot = fract(fi * 0.618) * 6.2832 + (down ? 0.0 : uT * (2.0 + 4.0 * fract(fi * 0.37)));
  vW = down ? 0.45 : 0.15 + 0.85 * p.w;               // (it tumbles: seen edge-on, it narrows)
}`,Ll=`#version 300 es
precision highp float;
uniform float uFadeC;
in vec3 vCol;
in float vRot;
in float vW;
out vec4 o;
void main() {
  vec2 d = gl_PointCoord * 2.0 - 1.0;
  float c = cos(vRot), s = sin(vRot);
  vec2 q = vec2(c * d.x - s * d.y, s * d.x + c * d.y);
  float a = smoothstep(vW * 0.9, vW * 0.9 - 0.25, abs(q.x)) * smoothstep(0.55, 0.3, abs(q.y)) * uFadeC;
  if (a < 0.01) discard;
  o = vec4(vCol * a, a);
}`;var Ga=12,qs=Ga*4,Rl=12,Ro=96,Va=144,Yu=new Float32Array(192),om=new Float32Array(128),Pl=new Float32Array(12),im=new Float32Array(96),Ha=new Float32Array(3),Ri=new Float32Array(4),Ku=new Float32Array(8),Zr=new Float32Array(16),Xu=new Float32Array(28),$u=new Float32Array(30),Qu=new Float32Array(40);function _l(o,e,t,a){let s=o.createShader(e);return o.shaderSource(s,t),o.compileShader(s),s}function Ua(o,e,t,a){let s=o.createProgram(),i=_l(o,o.VERTEX_SHADER,e),r=_l(o,o.FRAGMENT_SHADER,t);return o.attachShader(s,i),o.attachShader(s,r),(a||[]).forEach((n,l)=>o.bindAttribLocation(s,l,n)),o.linkProgram(s),{p:s,v:i,f:r}}function ja(o,e,t){let{p:a,v:s,f:i}=e;if(!o.getProgramParameter(a,o.LINK_STATUS)){for(let l of[s,i])o.getShaderParameter(l,o.COMPILE_STATUS)||t.push(o.getShaderInfoLog(l)||"shader");return t.push(o.getProgramInfoLog(a)||"link"),null}let r={},n=o.getProgramParameter(a,o.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let u=o.getActiveUniform(a,l);r[u.name.replace(/\[0\]$/,"")]=o.getUniformLocation(a,u.name)}return{p:a,u:r}}function Dl(o){let e=document.createElement("canvas");return e.className=o,e.setAttribute("aria-hidden","true"),e}var Po=class{constructor(){this.errors=[],this.back=Dl("show-back"),this.front=Dl("show-front"),this.lostB=this.lostF=!1,this.stale=!1;for(let[e,t]of[[this.back,"lostB"],[this.front,"lostF"]])e.addEventListener("webglcontextlost",a=>{a.preventDefault(),this[t]=!0,this.ready=!1}),e.addEventListener("webglcontextrestored",()=>{this[t]=!1,this.stale=!0});this.data=new Float32Array(Rl*qs),this.ready=!1,this.start()}start(){let e={premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1};if(this.gb=this.back.getContext("webgl2",{...e,alpha:!1}),this.gf=this.front.getContext("webgl2",{...e,alpha:!0}),this.ok=!!(this.gb&&this.gf),this.ready=!1,!this.ok){this.errors.push("WebGL 2 indisponible");return}let t=bl();if(!t){this.ok=!1,this.errors.push("morceaux du shader des poup\xE9es introuvables");return}this.parallel=!!this.gf.getExtension("KHR_parallel_shader_compile"),this.gb.getExtension("KHR_parallel_shader_compile"),this.t0=performance.now(),this.pStage=Ua(this.gb,Jr,yl,["aPos"]),this.pBeams=Ua(this.gf,Jr,kl,["aPos"]),this.pSide=Ua(this.gf,Sl,Ml,["aPos"]),this.pDolls=Ua(this.gf,xl,wl(t),["aCorner","iRect","iPlate","iDoll","iAnimA","iAnimB","iAnimC","iColor","iPoseA","iPoseB","iPoseC","iPoseD","iBox"]),this.pSpark=Ua(this.gb,Tl,El),this.pConf=Ua(this.gf,Al,Ll)}get lost(){return this.lostB||this.lostF}compiled(){if(this.lost)return!1;if(this.stale){if(this.lost)return!1;this.stale=!1,this.dispose(),this.start()}if(!this.ok||this.ready||!this.parallel)return!0;let e=37297;return[[this.gb,this.pStage],[this.gf,this.pBeams],[this.gf,this.pDolls],[this.gf,this.pSide],[this.gb,this.pSpark],[this.gf,this.pConf]].every(([t,a])=>t.getProgramParameter(a.p,e))}finish(){if(!this.ok||this.ready)return this.ok;if(this.gb.isContextLost()||this.gf.isContextLost())return this.ok;let e=this.gb,t=this.gf,a=this.errors,s=performance.now();if(this.stage=ja(e,this.pStage,a),this.beams=ja(t,this.pBeams,a),this.dolls=ja(t,this.pDolls,a),this.side=ja(t,this.pSide,a),this.spark=ja(e,this.pSpark,a),this.conf=ja(t,this.pConf,a),this.compileMs=Math.round(performance.now()-s),this.readyMs=Math.round(performance.now()-this.t0),!this.stage||!this.beams||!this.dolls||!this.side)return this.ok=!1,!1;let i=new Float32Array([-1,-1,3,-1,-1,3]);for(let[l,u]of[[e,"vaoB"],[t,"vaoF"]]){let c=l.createVertexArray();l.bindVertexArray(c);let h=l.createBuffer();l.bindBuffer(l.ARRAY_BUFFER,h),l.bufferData(l.ARRAY_BUFFER,i,l.STATIC_DRAW),l.enableVertexAttribArray(0),l.vertexAttribPointer(0,2,l.FLOAT,!1,0,0),this[u]=c}this.vaoPB=e.createVertexArray(),this.vaoPF=t.createVertexArray(),this.vaoD=t.createVertexArray(),t.bindVertexArray(this.vaoD);let r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),this.inst=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.inst),t.bufferData(t.ARRAY_BUFFER,this.data.byteLength,t.DYNAMIC_DRAW);for(let l=0;l<Ga;l++)t.enableVertexAttribArray(1+l),t.vertexAttribPointer(1+l,4,t.FLOAT,!1,qs*4,l*16),t.vertexAttribDivisor(1+l,1);this.vaoQ=t.createVertexArray(),t.bindVertexArray(this.vaoQ);let n=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindVertexArray(null),this.sides=[0,1].map(()=>{let l=t.createTexture();t.bindTexture(t.TEXTURE_2D,l),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,Ro,Va,0,t.RGBA,t.UNSIGNED_BYTE,null);for(let[c,h]of[[t.TEXTURE_MIN_FILTER,t.LINEAR],[t.TEXTURE_MAG_FILTER,t.LINEAR],[t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE],[t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE]])t.texParameteri(t.TEXTURE_2D,c,h);let u=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,u),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,l,0),{t:l,fb:u}}),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindVertexArray(null),this.ready=!0,this.warm(),!0}warm(){let e=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),t=i=>new Float32Array(i);this.draw({VP:e,invVP:e,eye:[0,0,1],pix:.001,steps:8,farSteps:8,far:1,n:2,dolls:t(2*qs),shadowDolls:t(28),spotPos:t(16),spotDir:t(16),spotCol:t(12),moon:[0,1,0],time:0,beat:0,foot:[0,0,0],screenCol:[0,0,0],riserCol:[0,0,0],flash:0,strobe:0,sparkle:0,white:0,haze:0,crowd:0,jump:0,screen:[1,1,2,-6],fade:0,side:{quads:[[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]],cams:[{VP:e,invVP:e,eye:[0,0,1],pix:.01,inst:0}],update:[0]},shells:{n:1,pos:t(128),t:t(128)},confetti:{t:0,fade:0,light:[0,0,0]},cols:t(12),veil:0});let a=this.gb,s=this.gf;this.fences=[a.fenceSync(a.SYNC_GPU_COMMANDS_COMPLETE,0),s.fenceSync(s.SYNC_GPU_COMMANDS_COMPLETE,0)],this.warmAt=performance.now(),a.flush(),s.flush()}warmed(){if(!this.fences)return!0;if(performance.now()-this.warmAt>6e3)return this.fences.forEach((t,a)=>{t&&(a?this.gf:this.gb).deleteSync(t)}),this.fences=null,!0;let e=this.fences.every((t,a)=>{let s=a?this.gf:this.gb;return!t||s.getSyncParameter(t,s.SYNC_STATUS)===s.SIGNALED});return e&&(this.fences.forEach((t,a)=>{t&&(a?this.gf:this.gb).deleteSync(t)}),this.fences=null),e}dispose(){if(this.gf&&this.sides){for(let e of this.sides)this.gf.deleteTexture(e.t),this.gf.deleteFramebuffer(e.fb);this.sides=null}for(let[e,t]of[[this.gb,["stage","spark","vaoB","vaoPB"]],[this.gf,["beams","dolls","side","conf","vaoF","vaoD","vaoPF","vaoQ","inst"]]])if(e)for(let a of t){let s=this[a];s&&(s.p?e.deleteProgram(s.p):a.startsWith("vao")?e.deleteVertexArray(s):e.deleteBuffer(s),this[a]=null)}}resize(e,t,a,s){let i=(r,n)=>{let l=Math.max(1,Math.round(e*n)),u=Math.max(1,Math.round(t*n));(r.width!==l||r.height!==u)&&(r.width=l,r.height=u)};i(this.back,a),i(this.front,s)}lights(e,t,a){t.uSpotPos&&e.uniform4fv(t.uSpotPos,a.spotPos),t.uSpotDir&&e.uniform4fv(t.uSpotDir,a.spotDir),t.uSpotCol&&e.uniform3fv(t.uSpotCol,a.spotCol),t.uMoonDir&&e.uniform3fv(t.uMoonDir,a.moon),t.uFoot&&e.uniform3fv(t.uFoot,a.foot),t.uScreenCol&&e.uniform3fv(t.uScreenCol,a.screenCol),t.uFlash&&e.uniform1f(t.uFlash,a.flash||0),t.uBeat&&e.uniform1f(t.uBeat,a.beat||0),t.uTime&&e.uniform1f(t.uTime,a.time||0),t.uInvVP&&e.uniformMatrix4fv(t.uInvVP,!1,a.invVP),t.uEye&&e.uniform3fv(t.uEye,a.eye),t.uWash&&e.uniform1f(t.uWash,a.wash===void 0?1:a.wash)}draw(e){if(!this.ok||!this.ready||this.lost)return;let t=this.gb,a=this.stage,s=a.u;t.viewport(0,0,this.back.width,this.back.height),t.useProgram(a.p),t.uniform2f(s.uRes,this.back.width,this.back.height),this.lights(t,s,e),t.uniform4fv(s.uScreen,e.screen),t.uniform4fv(s.uDolls,e.shadowDolls),t.uniform1f(s.uNDolls,e.n),t.uniform3fv(s.uRiserCol,e.riserCol),t.uniform1f(s.uStrobe,e.strobe),t.uniform1f(s.uFade,e.fade),s.uRamp&&t.uniform4fv(s.uRamp,e.ramp||Zr),s.uBulbs&&t.uniform4fv(s.uBulbs,e.bulbs||Zr),s.uLanes&&t.uniform4fv(s.uLanes,e.lanes||Ri),s.uBassCol&&t.uniform3fv(s.uBassCol,e.bassCol||Ha),s.uLeadCol&&t.uniform3fv(s.uLeadCol,e.leadCol||Ha),s.uDrumCol&&t.uniform3fv(s.uDrumCol,e.drumCol||Ha),s.uSpeak&&t.uniform1f(s.uSpeak,e.speak||0),s.uBlind&&t.uniform1f(s.uBlind,e.blind||0),s.uKick&&t.uniform1f(s.uKick,e.kick||0),s.uDollCol&&t.uniform4fv(s.uDollCol,e.dollCol||Xu),s.uPiece&&t.uniform4fv(s.uPiece,e.pieces||Yu),s.uLed&&t.uniform1f(s.uLed,e.led||0),s.uLevels&&t.uniform4fv(s.uLevels,e.levels||Ri),s.uNPieces&&t.uniform1f(s.uNPieces,e.nPieces||0),s.uBurst&&t.uniform3fv(s.uBurst,e.burst||Ha),t.bindVertexArray(this.vaoB),t.drawArrays(t.TRIANGLES,0,3);let i=e.shells;if(i&&i.n>0&&this.spark){let y=this.spark,x=y.u;t.useProgram(y.p),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.uniformMatrix4fv(x.uVP,!1,e.VP),t.uniform3fv(x.uEye,e.eye),t.uniform1f(x.uPix,e.pix*this.front.height/Math.max(1,this.back.height)),t.uniform4fv(x.uShell,i.pos),t.uniform4fv(x.uShellT,i.t),t.uniform3fv(x.uCols,e.cols||Pl),t.uniform4fv(x.uScreen,e.screen),t.bindVertexArray(this.vaoPB),t.drawArrays(t.POINTS,0,Math.min(i.n,Xr)*Li*Lo),t.disable(t.BLEND)}t.bindVertexArray(null);let r=this.gf;r.viewport(0,0,this.front.width,this.front.height),r.clearColor(0,0,0,e.veil||0),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA);let n=Math.min(e.n,Rl),l=Math.min(e.far||0,n),u=e.confetti,c=y=>{if(!u||u.t<0||!this.conf)return;let x=this.conf,S=x.u;r.useProgram(x.p),r.uniformMatrix4fv(S.uVP,!1,e.VP),r.uniform3fv(S.uEye,e.eye),r.uniform1f(S.uPix,e.pix),r.uniform1f(S.uT,u.t),r.uniform1f(S.uFloor,y?1:0),r.uniform1f(S.uFadeC,u.fade),r.uniform3fv(S.uLight,u.light),r.uniform3fv(S.uCols,e.cols||Pl),r.bindVertexArray(this.vaoPF),r.drawArrays(r.POINTS,0,nl)},h=this.dolls,d=h.u,m=this.beams,v=m.u,g=(y,x,S,E)=>{if(!(x<=0)){r.useProgram(h.p),E&&(this.lights(r,d,e),r.uniformMatrix4fv(d.uVP,!1,e.VP),r.uniform1f(d.uPix,e.pix),d.uFlicker&&r.uniform1f(d.uFlicker,.5+.5*Math.sin(e.time*11)*Math.sin(e.time*27+1.3)),d.uWatch&&r.uniform1f(d.uWatch,0),d.uCalm&&r.uniform1f(d.uCalm,0),d.uScale&&r.uniform1f(d.uScale,1),d.uMoon&&r.uniform3fv(d.uMoon,e.moon)),r.bindVertexArray(this.vaoD),r.bindBuffer(r.ARRAY_BUFFER,this.inst),E&&r.bufferSubData(r.ARRAY_BUFFER,0,e.dolls,0,n*qs);for(let L=0;L<Ga;L++)r.vertexAttribPointer(1+L,4,r.FLOAT,!1,qs*4,y*qs*4+L*16);r.uniform1i(d.uSteps,S),r.drawArraysInstanced(r.TRIANGLE_STRIP,0,4,x)}},f=y=>{r.useProgram(m.p),r.uniform2f(v.uRes,this.front.width,this.front.height),this.lights(r,v,e),r.uniform1f(v.uBeams,y?1:0),r.uniform1f(v.uFade,e.fade),r.uniform1f(v.uHaze,e.haze),r.uniform1f(v.uSparkle,e.sparkle),r.uniform1f(v.uWhite,y?0:e.white),r.uniform1f(v.uCrowd,y?0:e.crowd),r.uniform1f(v.uJump,e.jump),r.uniform1f(v.uPix,e.pix),y?(v.uLasers&&r.uniform4fv(v.uLasers,e.lasers||Ku),v.uLaserCol&&r.uniform3fv(v.uLaserCol,e.laserCol||Ha),v.uScreenTop&&r.uniform4fv(v.uScreenTop,e.screenTop||Ri),v.uCeil&&r.uniform1f(v.uCeil,e.ceil||0),v.uCeilCol&&r.uniform3fv(v.uCeilCol,e.ceilCol||Ha),v.uTunnel&&r.uniform1f(v.uTunnel,e.tunnel||0)):(v.uFlame&&r.uniform4fv(v.uFlame,e.flames||Zr),v.uHand&&r.uniform4fv(v.uHand,e.hand||Ri),v.uHandDir&&r.uniform2f(v.uHandDir,e.handDir?e.handDir[0]:1,e.handDir?e.handDir[1]:0),v.uFlare&&r.uniform4fv(v.uFlare,e.flare||Qu),v.uFlareCol&&r.uniform3fv(v.uFlareCol,e.flareCol||$u),v.uPhones&&r.uniform1f(v.uPhones,e.phones||0),v.uOla&&r.uniform1f(v.uOla,e.ola===void 0?-1:e.ola),v.uClap&&r.uniform1f(v.uClap,e.clap||0)),r.bindVertexArray(this.vaoF),r.drawArrays(r.TRIANGLES,0,3)};if(e.side&&n>0){for(let S of e.side.update){let E=e.side.cams[S],L=this.sides[S];if(!(!E||E.inst<0||E.inst>=n)){r.bindFramebuffer(r.FRAMEBUFFER,L.fb),r.viewport(0,0,Ro,Va),r.clearColor(.05,.02,.08,1),r.clear(r.COLOR_BUFFER_BIT),r.useProgram(h.p),this.lights(r,d,{...e,invVP:E.invVP,eye:E.eye}),r.uniformMatrix4fv(d.uVP,!1,E.VP),r.uniform1f(d.uPix,E.pix),r.bindVertexArray(this.vaoD),r.bindBuffer(r.ARRAY_BUFFER,this.inst),r.bufferSubData(r.ARRAY_BUFFER,0,e.dolls,0,n*qs);for(let D=0;D<Ga;D++)r.vertexAttribPointer(1+D,4,r.FLOAT,!1,qs*4,E.inst*qs*4+D*16);r.uniform1i(d.uSteps,e.steps),r.drawArraysInstanced(r.TRIANGLE_STRIP,0,4,1)}}r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,this.front.width,this.front.height);let y=this.side,x=y.u;r.useProgram(y.p),r.uniformMatrix4fv(x.uVP,!1,e.VP),r.uniform2f(x.uLed,Ro/2,Va/2),r.uniform3fv(x.uTint,e.screenCol),r.uniform1f(x.uFade,e.fade),x.uDark&&r.uniform1f(x.uDark,e.veil||0),r.bindVertexArray(this.vaoQ),r.activeTexture(r.TEXTURE0),e.side.quads.forEach((S,E)=>{r.bindTexture(r.TEXTURE_2D,this.sides[E].t),r.uniform1i(x.uTex,0),r.uniform3fv(x.uC0,S[0]),r.uniform3fv(x.uC1,S[1]),r.uniform3fv(x.uC2,S[2]),r.uniform3fv(x.uC3,S[3]),r.drawArrays(r.TRIANGLE_STRIP,0,4)})}let p=!1;c(!0),l>0&&(g(0,l,e.farSteps||e.steps,!0),p=!0),f(!0),n-l>0&&g(l,n-l,e.steps,!p),c(!1),f(!1),r.bindVertexArray(null)}time(e,t=20){if(!this.ok||!this.ready)return null;let a=new Uint8Array(4),s=()=>{this.gb.readPixels(0,0,1,1,this.gb.RGBA,this.gb.UNSIGNED_BYTE,a),this.gf.readPixels(0,0,1,1,this.gf.RGBA,this.gf.UNSIGNED_BYTE,a)},i=l=>{s();let u=[];for(let c=0;c<5;c++){let h=performance.now();for(let d=0;d<t;d++)this.draw(l);s(),u.push((performance.now()-h)/t)}return u.sort((c,h)=>c-h)[2]},r=i(e),n=i({...e,n:0});return{full:+r.toFixed(2),withoutDancers:+n.toFixed(2),dancers:+(r-n).toFixed(2),front:[this.front.width,this.front.height],back:[this.back.width,this.back.height]}}destroy(){for(let e of[this.gb,this.gf])if(e){let t=e.getExtension("WEBGL_lose_context");t&&t.loseContext()}this.back.remove(),this.front.remove(),this.ok=!1}};var Ju=o=>(o=Math.max(0,Math.min(1,o)),o*o*(3-2*o)),en=(o,e,t)=>o+(e-o)*t,tn=(o,e,t)=>[en(o[0],e[0],t),en(o[1],e[1],t),en(o[2],e[2],t)],Pi=(o,e)=>[o[0]+e[0],o[1]+e[1],o[2]+e[2]],vs=(o,e)=>[o[0]*e,o[1]*e,o[2]*e],an=(o,e)=>[o[1]*e[2]-o[2]*e[1],o[2]*e[0]-o[0]*e[2],o[0]*e[1]-o[1]*e[0]],Cl=o=>{let e=Math.hypot(o[0],o[1],o[2])||1;return[o[0]/e,o[1]/e,o[2]/e]},Zu=(o,e)=>[o[0]-e[0],o[1]-e[1],o[2]-e[2]];function ql(o,e,t,a,s){let i=Cl(Zu(o.target,o.eye)),r=Cl(an(i,[0,1,0])),n=an(r,i),l=2.2,u=l*Math.tan(ee.fovY/2),c=u*e/t,h=Math.min(.62,u*.62),d=h*a,m=s.calm?0:1,v=Math.min(c*.38,c-d*.62),g=-u*.5+m*(.05*(s.jump||0)+.28*(s.raise||0)),f=-.07-m*(.05*Math.sin((s.beat||0)*Math.PI)+.25*(s.raise||0)*Math.sin((s.t||0)*9)),p=.24,y=[o.eye[0]+i[0]*l+r[0]*v+n[0]*g,o.eye[1]+i[1]*l+r[1]*v+n[1]*g,o.eye[2]+i[2]*l+r[2]*v+n[2]*g],x=Math.cos(f),S=Math.sin(f),E=Math.cos(p),L=Math.sin(p),D=[r[0]*x+n[0]*S,r[1]*x+n[1]*S,r[2]*x+n[2]*S],q=[n[0]*x-r[0]*S,n[1]*x-r[1]*S,n[2]*x-r[2]*S],A=[q[0]*E+i[0]*L,q[1]*E+i[1]*L,q[2]*E+i[2]*L];return{c:y,u:vs(D,d/2),v:vs(A,h/2)}}function Wa(o,e,t,a=0,s=0,i=0){let r=Math.cos(a),n=Math.sin(a),l=Math.cos(s),u=Math.sin(s),c=Math.cos(i),h=Math.sin(i),d=[r,0,-n],m=[n*u,l,r*u],v=Pi(vs(d,c),vs(m,h)),g=Pi(vs(m,c),vs(d,-h));return{c:o,u:vs(v,e/2),v:vs(g,t/2)}}var ed=(o,e,t)=>Pi(o.c,Pi(vs(o.u,e*2-1),vs(o.v,1-t*2))),Ya=(o,e)=>e*o.r.height/o.r.width,td=[".view > .controls",".view > .range",".view > .pad",".view > .timeline"],sn=9.75;var Ft={ecran:{name:"\xC9cran g\xE9ant",line:"L\u2019app enti\xE8re sur l\u2019\xE9cran du fond, vivante.",pieces:null},trois:{name:"Trois panneaux",line:"Le haut de l\u2019app en enseigne sous la poutre, la vue en \xE9cran g\xE9ant, les onglets sur le devant de l\u2019estrade.",pieces:[".top",".parts",".inst",".view",".nav"],frame:1,staticView:!0,arrange(o,e){let t={},a=e.screen,s=4.6,i=s/o[0].r.width,r=sn;for(let n of o)if(n.sel===".view"){let l=a.h;t[n.sel]={c:[0,a.c[1],a.c[2]],w:l*n.r.width/n.r.height,h:l}}else if(n.sel===".nav")t[n.sel]={c:[0,.48,-3.17],w:4.2,h:Ya(n,4.2)};else{let l=n.r.height*i;t[n.sel]={c:[0,r-l/2,a.c[2]+.9],w:s,h:l,cable:!0},r-=l+.06}return t},animate(o,e,t){let a=o.cable?.025*Math.sin(t.t*1.3):0;return Wa(o.c,o.w,o.h,a*.5,0,a*.3)}},mur:{name:"Mur d\u2019\xE9crans",line:"Chaque morceau de l\u2019app devient une dalle d\u2019un mur vid\xE9o ; les dalles avancent en vague sur le kick.",pieces:[".top",".parts",".inst",".view",".nav"],fine:td,frame:1,staticView:!0,arrange(o,e){let t={},a=e.screen.c[2]+.12,s=5,i=.1,n=[[".top"],[".parts",".inst"],[".view > .controls"],[".view > .range"],[".view > .pad",".view"],[".view > .timeline"],[".nav"]].map(h=>h.map(d=>o.find(m=>m.sel===d)).filter(Boolean)).filter(h=>h.length),l=n.reduce((h,d)=>h+(d.some(m=>m.sel===".view > .pad"||m.sel===".view")?0:Ya(d[0],d.length>1?(s-i)/2:s)+i),0),u=Math.max(2.2,sn-.4-l),c=sn;for(let h of n){let d=h.some(g=>g.sel===".view > .pad"||g.sel===".view"),m=h.length>1?(s-i)/2:s,v=d?u:Ya(h[0],m);h.forEach((g,f)=>{let p=d?Math.min(s,v*g.r.width/g.r.height):m;t[g.sel]={c:[h.length>1?(f?1:-1)*(m+i)/2:0,c-v/2,a],w:p,h:v}}),c-=v+i}return t},animate(o,e,t){let a=Math.exp(-Math.pow(t.beatPhase*6-t.i*.6,2))*t.kick,s=[o.c[0],o.c[1],o.c[2]+.35*a];return Wa(s,o.w,o.h,.03*Math.sin(t.t*.6+t.i),.025*Math.sin(t.t*.8+t.i*1.3))}},suspendus:{name:"\xC9crans suspendus",line:"Les morceaux pendent de la poutre au bout de leurs c\xE2bles, \xE0 des profondeurs diff\xE9rentes, et se balancent au rythme.",pieces:[".top",".parts",".inst",".view",".nav"],frame:2,arrange(o,e){let t={},a=e.screen,s={".view":[0,-.2,a.c[2]+.3,3],".top":[-2,1.95,-4.6,2.5],".parts":[2.05,1.8,-4.3,2.3],".inst":[-2.15,.15,-3.9,2.2],".nav":[2.15,0,-3.7,2.3]};for(let i of o){let[r,n,l,u]=s[i.sel]||[0,0,-5,2],c=i.sel===".view"?Math.min(4.6,u*i.r.height/i.r.width):Ya(i,u);t[i.sel]={c:[r,a.c[1]+n,l],w:u,h:c,yaw:-r*.12,cable:!0}}return t},animate(o,e,t){let a=.07*Math.sin(t.beat*Math.PI*.5+t.i*1.7),s=-.05*t.pulse,i=[o.c[0]+Math.sin(a)*o.h*.5,o.c[1]+s,o.c[2]];return Wa(i,o.w,o.h,o.yaw+.05*Math.sin(t.t*.4+t.i),0,a)}},satellites:{name:"Satellites",line:"La vue reste l\u2019\xE9cran g\xE9ant ; les autres morceaux tournent lentement autour d\u2019elle, comme des satellites.",pieces:[".top",".parts",".inst",".view",".nav"],frame:1,staticView:!0,arrange(o,e){let t={},a=e.screen,s=o.filter(i=>i.sel!==".view");for(let i of o){if(i.sel===".view"){let n=a.h*.92;t[i.sel]={c:a.c,w:n*i.r.width/i.r.height,h:n};continue}let r=2;t[i.sel]={c:a.c,w:r,h:Ya(i,r),k:s.indexOf(i),n:s.length}}return t},animate(o,e,t){if(o.n===void 0)return Wa(o.c,o.w,o.h);let a=o.k/o.n*Math.PI*2+t.t*.12,s=[o.c[0]+Math.cos(a)*2.45,o.c[1]+Math.sin(a)*3.1,o.c[2]+.8+.4*Math.sin(a*2)];return Wa(s,o.w,o.h,-Math.cos(a)*.35,Math.sin(a)*.2,.08*Math.sin(t.t*.9+o.k))}},carrousel:{name:"Carrousel",line:"Les morceaux sur un carrousel derri\xE8re la sc\xE8ne : il tourne d\u2019un cran toutes les huit mesures pour montrer le suivant.",pieces:[".top",".parts",".inst",".view",".nav"],frame:1,hideBack:!0,arrange(o,e){let t={},a=e.screen;return[...o].sort((s,i)=>(i.sel===".view")-(s.sel===".view")).forEach((s,i)=>{let r=s.sel===".view"?a.h*.85:Math.min(2.6,Ya(s,3.2)*1),n=s.sel===".view"?r*s.r.width/s.r.height:3.2;t[s.sel]={c:a.c,w:n,h:r,k:i,n:o.length,view:s.sel===".view"}}),t},animate(o,e,t){let a=t.beat-(t.beat0||0),s=Math.floor(a/32),i=a/32-s,r=s+(i>31/32?(1-Math.cos((i-31/32)*32*Math.PI))/2:0),n=(o.k-(o.n?r:0))/o.n*Math.PI*2,l=2.4,u=[o.c[0]+Math.sin(n)*l,o.view?o.c[1]:o.c[1]+.6,o.c[2]-1.2+Math.cos(n)*l];return Wa(u,o.w,o.h,n)}},public:{name:"Dans le public",line:"Tu es dans la foule : l\u2019app est sur ton t\xE9l\xE9phone, lev\xE9 au premier plan, et tu joues ; l\u2019\xE9cran g\xE9ant montre la musique.",pieces:null,phone:!0}};function Ol({app:o,rects:e,ghouls:t}){let a=null,s=[],i=[],r=[],n=[],l={},u={bg:"",cls:!1};function c(f,p,y){if(a=Ft[f],!a||!a.pieces)return!1;s=[];let x=o.querySelector(":scope > .view"),S=a.fine&&x&&a.fine.some(D=>o.querySelector(D)),E=a.pieces.flatMap(D=>D===".view"&&S?a.fine:[D]);for(let D of E){let q=D.startsWith(".view >")?o.querySelector(D):o.querySelector(":scope > "+D),A=q&&e.get(q);!A||A.width<2||A.height<2||s.push({sel:D,el:q,r:A,home:p(A)})}if(!s.length)return!1;l=a.arrange(s,y),u.bg=o.style.background,o.style.background="transparent",document.documentElement.classList.add("show-apart");for(let D of s)D.el.style.transformOrigin="0 0",D.el.style.willChange="transform";if(t&&t.canvas){let D=t.canvas,q=e.get(o),A=D.width/q.width,U=D.height/q.height;for(let _ of s){let I=document.createElement("canvas");I.className="show-snap",I.width=Math.max(1,Math.round(_.r.width*Math.min(2,A))),I.height=Math.max(1,Math.round(_.r.height*Math.min(2,U)));try{I.getContext("2d").drawImage(D,(_.r.left-q.left)*A,(_.r.top-q.top)*U,_.r.width*A,_.r.height*U,0,0,I.width,I.height)}catch{}Object.assign(I.style,{position:"absolute",left:"0",top:"0",width:_.r.width+"px",height:_.r.height+"px",zIndex:"-1",pointerEvents:"none"}),_.el.prepend(I),r.push(I),getComputedStyle(_.el).position==="static"&&(_.el.dataset.showPos="1",_.el.style.position="relative")}n.push([D,D.style.visibility]),D.style.visibility="hidden"}i=[];let L=o.querySelector(":scope > .spill-over");if(L)for(let D of L.children){let q=e.get(D);if(!q)continue;let A=q.left+q.width/2,U=q.top+q.height/2,_=s.find(I=>A>=I.r.left&&A<=I.r.right&&U>=I.r.top&&U<=I.r.bottom);_?(i.push({e:D,r:q,p:_}),D.style.transformOrigin="0 0"):(n.push([D,D.style.visibility]),D.style.visibility="hidden")}return!0}function h(f,p,y,x,S){let E=[];s.forEach((L,D)=>{let q=l[L.sel],A=q?a.animate(q,L,{...S,i:D,n:s.length}):L.home,U=Ju(x);if(L.P={c:tn(L.home.c,A.c,U),u:tn(L.home.u,A.u,U),v:tn(L.home.v,A.v,U),cable:!!(q&&q.cable)&&U>.5},L.H=d(L.el,L.r,L.P,L.r,f,p,y),a.hideBack){let _=m(L.P,S.eye);_!==L.away&&(L.away=_,L.el.style.visibility=_?"hidden":"")}E.push(L.P)});for(let L of i)d(L.e,L.r,L.p.P,L.p.r,f,p,y);return E}function d(f,p,y,x,S,E,L){let D=[[p.left,p.top],[p.right,p.top],[p.right,p.bottom],[p.left,p.bottom]].map(([A,U])=>{let _=Cs(S,ed(y,(A-x.left)/x.width,(U-x.top)/x.height),E,L);return[_[0]-p.left,_[1]-p.top]}),q=Fa(p.width,p.height,D);return f.style.transform=za(q),q}let m=(f,p)=>{let y=an(f.u,f.v),x=[p[0]-f.c[0],p[1]-f.c[1],p[2]-f.c[2]];return y[0]*x[0]+y[1]*x[1]+y[2]*x[2]<0};function v(f,p,y){let x=s.find(D=>D.el===f||D.el.contains(f));if(!x||!x.H||x.away)return null;let S=Ei(x.H);if(!S)return null;let[E,L]=Ti(S,p-x.r.left,y-x.r.top);return Number.isFinite(E)?[E+x.r.left,L+x.r.top]:null}function g(){for(let f of s)Object.assign(f.el.style,{transform:"",transformOrigin:"",willChange:"",visibility:""});for(let f of s)f.el.dataset.showPos&&(f.el.style.position="",delete f.el.dataset.showPos);for(let f of i)Object.assign(f.e.style,{transform:"",transformOrigin:""});for(let f of r)f.remove();for(let[f,p]of n)f.style.visibility=p;o.style.background=u.bg,document.documentElement.classList.remove("show-apart"),s=[],i=[],r=[],n=[],a=null}return{start:c,update:h,toPage:v,stop:g,get pieces(){return s},get on(){return!!a},get frame(){return a&&a.frame||0},get staticView(){return!!(a&&a.staticView)}}}var _o={vivants:{name:"Vivants",line:"Les objets d\u2019Halloween restent sur l\u2019app et continuent de vivre."},figes:{name:"Fig\xE9s",line:"Une image immobile des objets : le GPU a une toile de moins \xE0 dessiner."},scene:{name:"Sur sc\xE8ne",line:"Le chaudron, le cr\xE2ne, la citrouille, le c\u0153ur et le d\xE9 quittent l\u2019app et pendent de la poutre en grandes d\xE9coupes qui dansent."}},nn=["trois","mur","satellites"],sd=[{sel:".top .logo",move:"hat"},{sel:".top .tbtn.rec",move:"snare"},{sel:".top .tbtn.play",move:"kick"},{sel:".top .chip.tempo",move:"beat",left:!0},{sel:".inst .dice",move:"bar"}];function Il(o){let e=document.createElement("canvas");e.width=Math.max(1,o.width),e.height=Math.max(1,o.height);try{e.getContext("2d").drawImage(o,0,0)}catch{}return e}function ad(o,e){let t=e?{left:o.left,top:o.top,width:Math.min(o.width,o.height),height:o.height}:o,a=Math.max(t.width,t.height)*.18,s=t.left-a,i=t.top-a,r=t.width+2*a,n=t.height+2*a;return{left:s,top:i,width:r,height:n,right:s+r,bottom:i+n}}var Fl=o=>(o=Math.max(0,Math.min(1,o)),o*o*(3-2*o)),on=(o,e,t)=>o+(e-o)*t,rn=(o,e,t)=>[on(o[0],e[0],t),on(o[1],e[1],t),on(o[2],e[2],t)],Bl=(o,e)=>[o[0]+e[0],o[1]+e[1],o[2]+e[2]],_i=(o,e)=>[o[0]*e,o[1]*e,o[2]*e];function od(o,e,t){let a=(s,i,r)=>{let n=Math.max(0,Math.min(1,(r-s)/(i-s)));return n*n*(3-2*n)};for(let s=0;s<t;s++)for(let i=0;i<e;i++){let r=(s*e+i)*4;if(!o[r+3])continue;let n=Math.hypot((i+.5)/e-.5,(s+.5)/t-.5),l=Math.max(o[r],o[r+1],o[r+2])/255;o[r+3]=Math.round(o[r+3]*a(.13,.22,l)*(1-a(.29,.34,n)))}return o}function id(o,e,t,a,s){let n=1.6*t,l=(o-(e-1)/2)*1.35,u=a.screen.c[1]+a.screen.h/2+1.35,c=a.screen.c[2]+.55,h=(a.beat%1+1)%1,d=Math.pow(1-h,3),m=0,v=.045*Math.sin(a.t*1.1+o*1.9),g=1,f=0;if(a.calm)return{c:[l,u,c],u:[n/2,0,0],v:[0,1.6/2,0]};if(s==="kick")m=.22*a.kick,g=1+.07*a.kick;else if(s==="snare")f=.35*a.snare;else if(s==="hat")v+=.14*Math.sin(a.beat*Math.PI)+.05*a.hat;else if(s==="beat")g=1+.16*d;else if(s==="bar"){let D=a.beat/4,q=D-Math.floor(D);v+=(Math.floor(D)+Fl(q*4))*Math.PI/2}let p=Math.cos(v),y=Math.sin(v),x=Math.cos(f),S=Math.sin(f),E=_i([p,y,0],n*g/2),L=_i([-y*x,p*x,S],1.6*g/2);return{c:[l,u+m,c],u:E,v:L}}function zl({snap:o,app:e,rects:t,A:a}){let s=[],i=o.width/a.width,r=o.height/a.height,n=o.getContext("2d");for(let c of sd){let h=e.querySelector(c.sel),d=h&&t.get(h);if(!d||d.width<2||d.height<2)continue;let m=ad(d,c.left),v=Math.round((m.left-a.left)*i),g=Math.round((m.top-a.top)*r),f=document.createElement("canvas");f.className="show-prop",f.width=Math.max(1,Math.round(m.width*i)),f.height=Math.max(1,Math.round(m.height*r));try{let p=f.getContext("2d");p.drawImage(o,v,g,f.width,f.height,0,0,f.width,f.height);let y=p.getImageData(0,0,f.width,f.height);od(y.data,f.width,f.height),p.putImageData(y,0,0),n.globalCompositeOperation="destination-out",n.drawImage(f,v,g),n.globalCompositeOperation="source-over"}catch{}h.classList.add("show-gone"),Object.assign(f.style,{position:"fixed",left:"0",top:"0",width:m.width+"px",height:m.height+"px",transformOrigin:"0 0",zIndex:"1",pointerEvents:"none",willChange:"transform"}),document.body.append(f),s.push({...c,el:h,c:f,box:m})}function l(c,h,d,m,v,g){let f=[];return s.forEach((p,y)=>{let x=g(p.box),S=id(y,s.length,p.box.width/p.box.height,v,p.move),E=Fl(m),L={c:rn(x.c,S.c,E),u:rn(x.u,S.u,E),v:rn(x.v,S.v,E)},D=(I,j)=>Bl(L.c,Bl(_i(L.u,I),_i(L.v,j))),q=[D(-1,1),D(1,1),D(1,-1),D(-1,-1)].map(I=>Cs(c,I,h,d)),A=q.some(I=>I[2]<=.05);A!==p.hidden&&(p.hidden=A,p.c.style.visibility=A?"hidden":""),A||(p.c.style.transform=za(Fa(p.box.width,p.box.height,q.map(I=>[I[0],I[1]]))));let U=Math.hypot(...L.u),_=Math.hypot(...L.v);f.push({...L,cable:E>.5,hang:{c:L.c,u:[U*.2,0,0],v:[0,_*.62,0]}})}),f}function u(){for(let c of s)c.c.remove(),c.el.classList.remove("show-gone");s.length=0}return{update:l,stop:u,get n(){return s.length}}}var Hl=(o,e,t)=>Math.max(e,Math.min(t,o)),Di=o=>(o=Hl(o,0,1),o*o*(3-2*o)),Nl=Object.keys(It),rd=[[1,.42,.06],[.62,.2,1],[.35,1,.22],[1,.42,.06]],Ci=["passinho","floss","dakoto","riri","zombies","nervy"].filter(o=>It[o]&&(It[o].len||8)===8),ln=[0,0,.62];function nd(o){let e=Array.isArray(o)&&o.length===4?o.slice():[le.PUMPKIN,le.SKULL,le.GHOST,le.VOODOO],t=[le.PUMPKIN,le.VOODOO,le.GHOST,le.SKULL,le.MUMMY,le.FRANK,le.SKELETON].filter(n=>!e.includes(n)),a=n=>{let l=t.indexOf(n);return l>=0?t.splice(l,1)[0]:null},s=a(le.MUMMY)??t.shift(),i=a(le.FRANK)??t.shift(),r=t.shift()??le.SKELETON;return{front:[i,s,r],back:e}}function ld(o,e=Math.random){let t=Nl.filter(r=>!o.includes(r)),a=t.length?t:Nl,s=a.reduce((r,n)=>r+(It[n].weight||1),0),i=e()*s;for(let r of a)if(i-=It[r].weight||1,i<=0)return r;return a[0]}var qi=class{constructor(e,t=1){let a=nd(e),s=t,i=()=>s=(s*.6180339+.137)%1;this.dancers=[],a.front.forEach((r,n)=>this.dancers.push({d:new ps(r,i()),home:[ee.front[n][0],0,ee.front[n][1]],row:"front",role:["bass","lead","free"][n]})),a.back.forEach((r,n)=>this.dancers.push({d:new ps(r,i()),home:[ee.back[n][0],ee.riser.top,ee.back[n][1]],row:"back",lane:n}));for(let r of this.dancers)r.in=0,r.out=0,r.enterAt=1/0,r.exitAt=1/0,r.extraSpin=0,r.bow=0,r.pos=r.home.slice(),r.soloE=0;this.soloist=null,this.encoreAt=null,this.hype=null,this.groups={front:{name:null,end:-1/0},back:{name:null,end:-1/0}},this.recent=[],this.pattern=0,this.palette=0,this.flash=0,this.strobe=0,this.sparkle=0,this.white=0,this.jump=0,this.lastWhite=-1e9,this.shake=0,this.ramp=new Float32Array(16),this.bulbs=new Float32Array(16),this.lanes=new Float32Array(4),this.lasers=new Float32Array(8),this.tunnel=0,this.blind=0,this.clap=0,this.phones=0,this.olaAt=-1e9,this.dark=0,this.switchSoon=!1,this.rnd=Math.random,this.lastBeat=-1/0,this.wasPlaying=!1,this.half=!1}reset(){for(let e of Object.values(this.groups))e.name=null,e.end=-1/0;for(let e of this.dancers)e.pending=null,e.d.dance=null,e.soloE=0;this.switchSoon=!1,this.soloist=null,this.encoreAt=null,this.hype=null}enter(e,t){this.dancers.forEach((a,s)=>{a.enterAt=e+[3,1,5,0,2,4,6][s]*t*.5,a.in=0,a.exitAt=1/0,a.out=0})}leave(e){this.dancers.forEach((t,a)=>{t.exitAt=e+a*45})}get gone(){return this.dancers.every(e=>e.out>=1)}whiteFlash(e,t){this.dark>0||(e-this.lastWhite>400?(this.white=Math.max(this.white,t),this.lastWhite=e):e-this.lastWhite<120&&t>this.white&&(this.white=t))}solo(e,t){let a=this.dancers[e],s=this.half?t/2:t;if(!a||this.soloist||a.in<1)return!1;let i=Math.ceil(s+.01);return this.soloist={x:a,start:i,dance:Ci[(i+e)%Ci.length]},!0}encore(e){let t=this.half?e/2:e;this.encoreAt===null&&!this.hype&&(this.encoreAt=Math.ceil((t+.01)/4)*4)}schedule(e,t,a){let s=this.groups[e],i=this.dancers.filter(c=>c.row===e);if(a){let c=Math.floor(t/4)*4;s.end=Math.min(s.end,t-c<.5?c:c+4);return}if(t<s.end-.05)return;let r=Math.max(s.end,Math.floor(t/4)*4),n=e==="back"&&this.rnd()<.45&&this.groups.front.name?this.groups.front.name:ld(this.recent,this.rnd);e==="front"&&(this.recent.push(n),this.recent.length>3&&this.recent.shift(),this.pattern=(this.pattern+1)%4,this.palette=(this.palette+1)%4);let l=It[n].len||8,u=e==="front"&&l<=16&&this.rnd()<.3;i.forEach((c,h)=>{if(this.soloist&&this.soloist.x===c)return;let d=u?h:0;c.pending={name:n,start:r+d,len:l-d}}),s.name=n,s.end=r+l}update(e,t,a,s,i,r,n,l,u,c){let d=(this.half=n>150)?a/2:a;r&&(!this.wasPlaying||d<this.lastBeat-1)&&this.reset(),this.wasPlaying=r,this.lastBeat=d;let m=(f,p)=>(Math.round(f)%p+p)%p;for(let f of s)if(f.kind==="section")this.switchSoon=!0,this.whiteFlash(t,.55),this.tunnel=1,this.blind=1,this.olaAt=t;else if(f.kind==="kick"){this.flash=Math.max(this.flash,.7),this.jump=1,this.shake=1;for(let p of this.dancers)p.d.dance||(p.d.sqv-=.8);this.stamp(0),this.lanes[0]=1}else f.kind==="snare"?(this.strobe=1,this.stamp(1),this.lanes[1]=1,i.master>.3&&(this.clap=1)):f.kind==="hat"?(this.sparkle=1,this.stamp(2),this.lanes[2]=1):f.kind==="perc"?(this.stamp(3),this.lanes[3]=1):f.kind==="lead"?(this.sing("lead",l.lead),this.bulbs[m(f.v,16)]=1,this.lasers[m(f.v,7)]=1):f.kind==="bass"&&(this.sing("bass",l.bass),this.ramp[m(f.v,14)]=1);if(this.encoreAt!==null&&d>=this.encoreAt-.05){let f=Ci[Math.floor(this.encoreAt/4)%Ci.length],p=this.encoreAt;for(let y of this.dancers)this.soloist&&this.soloist.x===y||(y.pending={name:f,start:p,len:8});for(let y of Object.values(this.groups))y.name=f,y.end=p+8;this.hype={start:p,end:p+8},this.encoreAt=null,this.tunnel=1,this.whiteFlash(t,.6)}if(this.hype&&d>=this.hype.end&&(this.hype=null),r&&(this.schedule("front",d,this.switchSoon),this.schedule("back",d,this.switchSoon),this.switchSoon=!1),this.soloist){let f=this.soloist,p=d-f.start;p>=0&&!f.danced&&(f.danced=!0,f.x.d.dance=null,f.x.pending={name:f.dance,start:f.start+1,len:8},this.whiteFlash(t,.3)),p>=10?(this.soloist=null,f.x.soloE=0):f.x.soloE=p<0?0:p<1?Di(p):p<9?1:1-Di(p-9)}let v=f=>Math.exp(-e*f);this.flash*=v(7),this.strobe*=v(16),this.sparkle*=v(5),this.white*=v(5),this.jump*=v(4.5),this.shake*=v(9);for(let f=0;f<16;f++)this.ramp[f]*=v(5),this.bulbs[f]*=v(5);for(let f=0;f<4;f++)this.lanes[f]*=v(7);for(let f=0;f<8;f++)this.lasers[f]*=v(3.5);this.tunnel*=v(.9),this.blind*=v(.7),this.clap*=v(7),this.phones+=((r?1-Math.min(1,(i.master||0)*3):.6)-this.phones)*(1-v(.5));for(let f of this.dancers){let p=f.d;f.pending&&d>=f.pending.start-.5&&(p.dance=f.pending,f.pending=null);let y=f.soloE||0;if(f.pos=[f.home[0]+(ln[0]-f.home[0])*y,f.home[1]+(ln[1]-f.home[1])*y+Math.sin(y*Math.PI)*(f.home[1]>.1?.6:.25)*(y>0&&y<1?1:0),f.home[2]+(ln[2]-f.home[2])*y],f.extraSpin=this.hype&&d-this.hype.start<1?Math.PI*2*Di(d-this.hype.start):0,f.in=t<f.enterAt?0:Math.min(1,(t-f.enterAt)/750),f.out=t<f.exitAt?0:Math.min(1,(t-f.exitAt)/520),f.bow+=((r?0:1)-f.bow)*(1-v(3)),p.ltx=Hl(u[0]*1.6,-1,1)*.8+.25*Math.sin(t/2100+p.seed*20),p.lty=.08+.15*Math.sin(t/2900+p.seed*13),p.color=f.row==="back"?l.drum:f.role==="bass"?l.bass:f.role==="lead"?l.lead:l.accent,p.step(e,t,!1,d),c&&(p.p.spin=0),f.bow>.01){let x=p.p,S=Di(f.bow);x.crouch+=(.3-x.crouch)*S,x.head+=(-.2-x.head)*S,x.hl=x.hl.map((E,L)=>E+([-.25,-.75,.3][L]-E)*S),x.hr=x.hr.map((E,L)=>E+([.25,-.75,.3][L]-E)*S)}p.ink+=((f.row==="back"?i.d[f.lane]||0:f.role==="lead"?i.lead:f.role==="bass"?i.bass:i.master)*.8-p.ink)*(1-v(8))}this.hype&&(a%1+1)%1<.1&&(this.jump=1);let g=this.lights(t,a,i,l,r,e);return g.ola=t-this.olaAt<3500?(t-this.olaAt)/1e3:-1,g}stamp(e){let t=this.dancers.find(a=>a.row==="back"&&a.lane===e);t&&(t.d.sqv-=t.d.dance?1:1.8,t.d.hvy+=.6,t.d.glow=Math.max(t.d.glow,.5))}sing(e,t){let a=this.dancers.find(s=>s.role===e);a&&a.d.sing(.75,t)}lights(e,t,a,s,i,r=1/60){this.aim||(this.aim=ee.heads.map(()=>null));let n=1-Math.exp(-r*11),l=Math.pow(1-(t%1+1)%1,3),u=this.hype?2:1,c=this.soloist&&this.soloist.x.soloE>.5?this.soloist.x.pos:null,h=[[s.drum,s.bass,s.lead,s.drum],rd,[s.lead,s.accent,s.lead,s.accent],[s.bass,[1,.9,.8],[1,.9,.8],s.bass]][this.palette],d=[a.drum,a.bass,a.lead,a.master],m=new Float32Array(16),v=new Float32Array(16),g=new Float32Array(12),f=t*Math.PI*u;return ee.heads.forEach((p,y)=>{let x=y<2?-1:1,S=y,E,L,D=(t%16+16)%16>=14&&i,q=0;c?(E=c[0]+.25*Math.sin(f+S*1.7),q=c[1]+.9,L=c[2]+.2*Math.cos(f/2+S)):D?(E=6*Math.sin(f/2+S*1.1),q=2.2+.8*Math.sin(f+S),L=11.5):this.pattern===0?(E=p[0]*.55+1.5*Math.sin(f/2+S*.8),L=-1.6+1.2*Math.cos(f/4+S)):this.pattern===1?(E=-x*1.9*Math.sin(f/2)+x*.4,L=-2.2+1.4*Math.sin(f/4+S*1.3)):this.pattern===2?(E=.35*Math.sin(f+S),L=ee.front[1][1]+.3*Math.cos(f/2+S)):(E=2.3*Math.cos(f/2+S*Math.PI/2),L=-2.2+1.7*Math.sin(f/2+S*Math.PI/2));let A=as(ms([E,q,L],p)),U=this.aim[y],_=this.aim[y]=U?as([U[0]+(A[0]-U[0])*n,U[1]+(A[1]-U[1])*n,U[2]+(A[2]-U[2])*n]):A,I=i?.75+1.1*Math.min(1,Math.sqrt(d[y]||0)*1.3)+.6*l:.55;m.set([p[0],p[1],p[2],I],y*4),v.set([_[0],_[1],_[2],Math.cos((c?5:this.pattern===2?6.5:9)*Math.PI/180)],y*4);let j=h[y]||s.accent;if(g.set(j,y*3),this.dark>0){let se=this.dark;if(y===1){let Y=this.dancers.find(Me=>Me.row==="front"&&Me.role==="lead"),J=Y?Y.pos:[0,0,0],ue=as(ms([J[0],J[1]+1,J[2]],p)),ve=as([_[0]+(ue[0]-_[0])*se,_[1]+(ue[1]-_[1])*se,_[2]+(ue[2]-_[2])*se]),de=c?5:this.pattern===2?6.5:9;v.set([ve[0],ve[1],ve[2],Math.cos((de+(4.5-de)*se)*Math.PI/180)],y*4),m[y*4+3]=I+(2.4-I)*se,g.set([j[0]+(1-j[0])*se,j[1]+(.97-j[1])*se,j[2]+(.92-j[2])*se],y*3)}else m[y*4+3]=I*(1-se)}}),{spotPos:m,spotDir:v,spotCol:g,pulse:l}}};var cd=Object.freeze({drum:0,bass:0,lead:0,master:0,d:Object.freeze([0,0,0,0])});function Ul(o){let e={playing:!1,tempo:120,latency:0,levels:{drum:0,bass:0,lead:0,master:0,d:[0,0,0,0]},hist:[],sec:-1,events:[],abs0:null,tick:0,at:0,msPerTick:5.208333333333333,beatAt(t){let a=t-e.latency;return e.playing?(e.tick+(a-e.at)/e.msPerTick)/96:a/600},levelsAt(t){if(!e.latency||!e.hist.length)return e.levels;let a=t-e.latency,s=e.hist;for(let i=s.length-1;i>=0;i--)if(s[i].at<=a)return s[i].L;return cd},take(t){let a=t-e.latency,s=[];for(;e.events.length&&e.events[0].at<=a;)s.push(e.events.shift());return s},onPos(t){let a=performance.now(),s=e.playing;if(e.playing=!!t.playing&&t.tick>=0,e.tempo=o.project.tempo||120,e.msPerTick=6e4/(e.tempo*96),e.playing?((!s||e.abs0===null)&&(e.abs0=t.abs-t.tick),e.tick=t.abs-e.abs0,e.at=a,o.project.song&&o.project.song.enabled&&o.project.song.sections.length&&t.sec!==e.sec&&(e.sec>=0&&e.events.push({at:a,kind:"section",v:t.sec}),e.sec=t.sec)):(e.abs0=null,e.sec=-1),t.m){let i=e.levels,r=.5;if(i.drum=Math.max(t.m.drum||0,i.drum*r),i.bass=Math.max(t.m.bass||0,i.bass*r),i.lead=Math.max(t.m.lead||0,i.lead*r),i.master=Math.max(t.m.master||0,i.master*r),t.m.d)for(let n=0;n<4;n++)i.d[n]=Math.max(t.m.d[n]||0,i.d[n]*r);for(e.hist.push({at:a,L:{drum:i.drum,bass:i.bass,lead:i.lead,master:i.master,d:i.d.slice()}});e.hist.length>1&&a-e.hist[0].at>1e3;)e.hist.shift()}if(t.trig){for(let i=0;i<t.trig.length;i+=4){let r=t.trig[i],n=t.trig[i+1];r===0?e.events.push({at:a,kind:["kick","snare","hat","perc"][n]||"perc",v:n}):e.events.push({at:a,kind:r===1?"bass":"lead",v:n})}e.events.length>256&&e.events.splice(0,e.events.length-256)}}};return e}var Ka=Math.PI/180,ma=Math.PI*2,Lt=(o,e,t)=>Math.max(e,Math.min(t,o)),Do=o=>(o=Lt(o,0,1),o*o*(3-2*o)),jl=(o,e,t)=>Do((t-o)/(e-o)),cn=(o,e)=>Math.hypot(o[0]-e[0],o[1]-e[1],o[2]-e[2]),xe={idle:4e3,dragHold:3e3,dragMin:.03,settle:2500,tiltGain:1.2,tiltDead:1.5,tiltMove:3,tiltYaw:.5,tiltPitch:.15,pitchPerDeg:.01,tiltSpeed:1,bar:4,every:32,long:64,minGap:8,margin:10},hn=ee.dollScale,pn=[.8,0,2.35,.4],hd=[.62,.95,2.05,.4];function Oi(o,e,t,a){let s=[];for(let i of[-a[0],a[0]])for(let r of[a[1],a[2]])for(let n of[-a[3],a[3]])s.push([o+i*hn,e+r*hn,t+n*hn]);return s}var fn=Vr(),Gl=ee.front.flatMap(([o,e])=>Oi(o,0,e,pn)),ud=ee.back.flatMap(([o,e])=>Oi(o,ee.riser.top,e,pn)),zt=ee.front[1],dd=Oi(zt[0],0,zt[1],pn),fd=Oi(zt[0],0,zt[1],hd);function Vl(o,e,t,a,s,i=xe.margin){let r=as(ms(e,o)),n=as(To(r,[0,1,0])),l=To(n,r),u=Math.tan(ee.fovY/2),c=u*a/s,h=1-2*i/a,d=1-2*i/s;for(let m of t){let v=ms(m,o),g=Ds(v,r);if(g<.4||Math.abs(Ds(v,n))>g*c*h||Math.abs(Ds(v,l))>g*u*d)return!1}return!0}function mn(o,e,t,a,s,i=xe.margin){if(Vl(o.eye,o.target,e,t,a,i))return o;let r=0,n=24;for(let l=0;l<18;l++){let u=(r+n)/2;Vl(Ba(o.eye,Mi(s,u)),o.target,e,t,a,i)?n=u:r=u}return{eye:Ba(o.eye,Mi(s,n)),target:o.target}}var vn=o=>as(ms(o.eye,o.target));function pd(o){let e=Math.max(1.1*(1-jl(6.2,6.8,o)),.14*o);return .3+Math.max(0,e-.3)*jl(1.9,2.25,o)}function va(o){let e=Math.max(o.eye[2],ee.screen.z+1.05);return{eye:[o.eye[0],Math.max(o.eye[1],pd(e)),e],target:o.target}}var md=(o,e)=>Math.atan(Math.tan(ee.fovY/2)*o/e),un=new Map,Bi={wide:{pose:(o,e,t,a)=>Ia(.1*e*Math.sin(o*ma/48),t,a)},crane:{subjects:fn,pose(o,e){let t=Do(o/30);return{eye:[e*ns(1.4,.8,t),ns(2,7.2,t),ns(9.4,7.6,t)],target:[e*.3,ns(2.2,.9,t),ns(-2.8,-2.4,t)]}}},low:{subjects:dd,away:o=>as([o.eye[0]-zt[0],0,o.eye[2]-zt[1]]),pose(o,e){let t=e*(.22+.05*Math.sin(o*ma/30)),a=2.2;return{eye:[zt[0]+a*Math.sin(t),1.12,zt[1]+a*Math.cos(t)],target:[zt[0]-e*.3,1.85,zt[1]-3]}}},track:{subjects:Gl,pose(o,e,t,a){let s=2.4*Math.tan(md(t,a))/Math.tan(35*Ka),i=c=>({eye:[c,1.95,5],target:[c*.8,1.45,-2.4]}),r=`${t}|${a}`;if(!un.has(r)){let c=[-s,s].map(h=>{let d=i(h);return mn(d,Gl,t,a,vn(d)).eye});un.set(r,[Math.max(c[0][1],c[1][1]),Math.max(c[0][2],c[1][2])])}let[n,l]=un.get(r),u=e*s*Math.cos(o*ma/50);return{eye:[u,n,l],target:[u*.8,1.45,-2.4]}}},closeup:{subjects:fd,pose(o,e){return{eye:[zt[0]+e*(.35+.12*Math.sin(o*ma/26)),1.55,zt[1]+2.2],target:[zt[0],1.3,zt[1]-.3]}},push:o=>1+.3*(1-Do(o/20))},high:{subjects:fn,pose(o,e){let t=e*(.14+.07*Math.sin(o*ma/40)),a=45*Ka,s=12.5,i=[0,1,-3.2];return{eye:[i[0]+s*Math.sin(t)*Math.cos(a),i[1]+s*Math.sin(a),i[2]+s*Math.cos(t)*Math.cos(a)],target:i}}},riser:{subjects:ud,pose(o,e){let t=3.3+.25*Math.sin(o*ma/34);return{eye:[e*5,t,1.9],target:[e*.5,1.7,-4.1]}}}};Bi.finale={pose(o,e,t,a){let s=Ia(.06*e*Math.sin(o*ma/40),t,a);return{eye:s.eye,target:[s.target[0],s.target[1]+2,s.target[2]]}}};var vd=Object.keys(Bi).filter(o=>o!=="finale"),gd={closeup:.65,low:.72};function Wl(o,e,t,a,s){let i=Bi[o],r=i.pose(e,t,a,s);if(i.subjects&&(r=mn(r,i.subjects,a,s,i.away?i.away(r,t,a,s):vn(r)),i.push)){let n=i.push(e);r={eye:Ba(r.target,Mi(ms(r.eye,r.target),n)),target:r.target}}return va(r)}function bd(o,e,t=0){let a=bo(o,e),s=t*Ka,i=[Math.cos(s),-Math.sin(s),0],r=[Math.sin(s),Math.cos(s),0],n=Ds(a,i),l=Ds(a,r);return{side:Math.asin(Lt(-n,-1,1))/Ka,lift:Math.asin(Lt(l,-1,1))/Ka,norm:Math.hypot(n,a[2])}}var Yl=(o,e)=>Math.sign(o)*Math.max(0,Math.abs(o)-e),dn=o=>Math.atan2(o.eye[0]-ee.pivot[0],o.eye[2]-ee.pivot[2]);function Kl({calm:o=!1,seed:e=1}={}){let t=Math.abs(e|0)%2147483646+1,a=()=>(t=t*16807%2147483647)/2147483647,s={t0:null,lastBeat:null,W:0,H:0,mode:o?"calm":"director",out:null,blend:null,finger:!1,dragFrom:0,dragBase:0,dragOn:!1,dragGoal:0,dragAt:-1e12,tilt:null,ref:null,samples:[],devYaw:0,devPitch:0,tiltBase:[0,0],tiltYaw:0,tiltPitch:0,yaw:0,yawV:0,pitch:0,pitchV:0,shot:"wide",side:1,t:0,from:null,cur:null,u:1,wait:0,len:xe.bar,hold:null,recent:["wide"],since:xe.minGap,section:-1,bar:null,noCutBefore:0,sharpFrom:1,sharpNow:1,sharpOut:1},i=new Map;function r(g,f,p){let y=`${g.toFixed(4)}|${f}|${p}`,x=i.get(y);return x||(i.size>64&&i.clear(),x=Ia(g,f,p),i.set(y,x)),{eye:x.eye.slice(),target:x.target.slice()}}let n=cn(ee.eye,ee.pivot);function l(g,f,p,y){let x=r(g,p,y);if(Math.abs(f)<1e-4)return va(x);let S=Oa(g,f,cn(x.eye,ee.pivot)/n);return va(mn(S,fn,p,y,vn(S),8))}function u(g,f,p){let y=g.tilt;if(!(y&&Number.isFinite(y.beta)&&Number.isFinite(y.gamma)&&(Number.isFinite(y.angle)||g.H>=g.W)&&f-s.t0>=xe.settle))return s.tilt=null,s.ref=null,s.samples.length=0,s.devYaw=s.devPitch=0,!1;let S=bd(y.beta,y.gamma,y.angle||0);if(!s.tilt)s.tilt={...S};else{let Y=1-Math.exp(-p*10);s.tilt.side+=(S.side-s.tilt.side)*Y,s.tilt.lift+=(S.lift-s.tilt.lift)*Y,s.tilt.norm=S.norm}let E=s.tilt,L=()=>({side:E.side,lift:E.lift,norm:Math.max(.5,E.norm)});s.ref||(s.ref=L());let D=s.samples;for((!D.length||f-D[D.length-1][0]>=40)&&D.push([f,E.side,E.lift]);D.length&&f-D[0][0]>xe.idle;)D.shift();let q=1/0,A=-1/0,U=1/0,_=-1/0;for(let[,Y,J]of D)Y<q&&(q=Y),Y>A&&(A=Y),J<U&&(U=J),J>_&&(_=J);let I=(A-q)/s.ref.norm>xe.tiltMove||_-U>xe.tiltMove;!I&&f-D[0][0]>=xe.idle-100&&(s.ref=L());let j=Yl((E.side-s.ref.side)/s.ref.norm,xe.tiltDead),se=Yl(E.lift-s.ref.lift,xe.tiltDead);return s.devYaw=Lt(-j*xe.tiltGain*Ka,-2*xe.tiltYaw,2*xe.tiltYaw),s.devPitch=Lt(-se*xe.pitchPerDeg,-2*xe.tiltPitch,2*xe.tiltPitch),I}function c(g){let f=Lt(s.tiltBase[0]+s.devYaw,-xe.tiltYaw,xe.tiltYaw),p=Lt(s.tiltBase[1]+s.devPitch,-xe.tiltPitch,xe.tiltPitch);s.tiltYaw+=Lt(f-s.tiltYaw,-xe.tiltSpeed*g,xe.tiltSpeed*g),s.tiltPitch+=Lt(p-s.tiltPitch,-xe.tiltSpeed*.3*g,xe.tiltSpeed*.3*g)}function h(){let g=vd.filter(p=>p!==s.shot&&!s.recent.includes(p)),f=g[Math.min(g.length-1,Math.floor(a()*g.length))];return s.recent.push(f),s.recent.length>3&&s.recent.shift(),f}function d(g,f,p,y){let x=Number.isInteger(g.section)?g.section:-1;x>=0&&x!==s.section&&(s.secStart=Math.round(g.beat/xe.bar)*xe.bar);let S=Math.floor((g.beat-(x>=0&&s.secStart||0))/xe.every),E=!1;if((x>=0&&x!==s.section||s.bar!==null&&S===s.bar+1&&(x<0||s.since>=xe.long-1))&&(E=!0),s.section=x,s.bar=S,s.since+=p,s.wasBusy&&!g.busy&&s.shot==="finale"&&(s.pending=!0),s.wasBusy=!!g.busy,!y)return s.pending=!1,null;if(E&&g.busy&&(s.pending=!0),s.pending&&!g.busy&&(E=!0),g.cue&&Bi[g.cue])s.pending=!1,s.from=s.cur||s.out,s.wait=0,s.len=xe.bar,s.u=0,s.sharpFrom=s.sharpNow,s.shot=g.cue,s.side=a()<.5?-1:1,s.t=0,s.since=0;else if(E&&!g.busy&&s.since>=xe.minGap-1&&g.now>=s.noCutBefore){s.pending=!1;let A=g.beat,U=Math.round(A/xe.bar)*xe.bar,_=Math.abs(A-U)<=1.5?U:Math.ceil(A-.25);s.from=s.cur||s.out,s.sharpFrom=s.sharpNow,s.wait=Math.max(0,_-A),s.len=Math.max(2,xe.bar-Math.max(0,A-_)),s.u=0,s.shot=h(),s.side=a()<.5?-1:1,s.t=0,s.since=0}if(s.wait>0){if(s.wait-=p,s.wait>0)return s.sharpNow=s.sharpFrom,s.cur=s.from;s.u=Math.min(1,-s.wait/s.len),s.wait=0}else s.u<1&&(s.u=Math.min(1,s.u+p/s.len));s.t+=f;let L=s.shot==="hold"?s.hold:Wl(s.shot,s.t,s.side,g.W,g.H),D=Do(s.u),q=s.shot==="hold"?1:gd[s.shot]||1;return s.sharpNow=s.u<1?Math.min(s.sharpFrom,q):q,s.cur=s.u<1?va({eye:os(s.from.eye,L.eye,D),target:os(s.from.target,L.target,D)}):L}function m(g,f,p,y,x){return f+=(x*x*(p-g)-2*x*f)*y,[g+f*y,f]}let v={get mode(){return s.mode},get shot(){return s.mode==="director"?s.shot:s.mode==="calm"?"wide":null},get info(){return{shot:s.shot,side:s.side,t:s.t,u:s.u,wait:s.wait}},update(g){let f=g.now,p=Lt(g.dt||0,0,.1),y=g.W,x=g.H,S=g.calm===void 0?o:!!g.calm;s.t0===null&&(s.t0=f,s.noCutBefore=f+xe.idle);let E=s.lastBeat===null?0:g.beat-s.lastBeat,L=E>=0&&E<1.5?E:p*2;s.lastBeat=g.beat;let D=typeof g.drag=="number"&&Number.isFinite(g.drag);D&&(s.finger||(s.dragFrom=g.drag,s.dragOn=!1),!s.dragOn&&Math.abs(g.drag-s.dragFrom)>xe.dragMin&&(s.dragOn=!0,s.dragBase=s.mode==="drag"||s.mode==="tilt"?s.yaw:Lt(dn(s.out),-.6,.6)),s.dragOn&&(s.dragGoal=Lt(s.dragBase+g.drag-s.dragFrom,-.6,.6),s.dragAt=f)),s.finger=D;let q=!S&&u(g,f,p),A;if(S?A="calm":D&&s.dragOn||f-s.dragAt<xe.dragHold?A="drag":q?A="tilt":f-s.dragAt<xe.idle?A="drag":A="director",s.out||(s.out=S?va(r(0,y,x)):Wl("wide",0,1,y,x)),A!==s.mode||y!==s.W||x!==s.H){let se=s.out,Y=s.mode,J=Y==="drag"||Y==="tilt",ue=dn(se);A==="director"&&Y!=="director"&&(s.hold=se,s.shot="hold",s.cur=se,s.u=1,s.wait=0,s.since=xe.minGap,s.sharpFrom=s.sharpNow=1),(A==="drag"||A==="tilt")&&!J&&(s.yaw=Lt(ue,-.6,.6),s.pitch=0,s.yawV=s.pitchV=0),A==="tilt"&&Y!=="tilt"&&(s.tiltYaw=Lt(s.yaw,-xe.tiltYaw,xe.tiltYaw),s.tiltPitch=Lt(s.pitch,-xe.tiltPitch,xe.tiltPitch),s.tiltBase=[s.tiltYaw,s.tiltPitch]),s.blend={from:se,v:0,dur:A===Y?.5:null,sharp:s.sharpOut},s.mode=A,s.W=y,s.H=x}A==="tilt"&&c(p),(A==="drag"||A==="tilt")&&([s.yaw,s.yawV]=m(s.yaw,s.yawV,A==="drag"?s.dragGoal:s.tiltYaw,p,A==="drag"?9:6),[s.pitch,s.pitchV]=m(s.pitch,s.pitchV,A==="drag"?0:s.tiltPitch,p,6));let U=d(g,p,L,A==="director"),_=A==="calm"?va(r(0,y,x)):A==="director"?U:l(s.yaw,s.pitch,y,x),I=s.blend;if(I){I.dur===null&&(I.dur=Lt(.5+.07*cn(I.from.eye,_.eye),.6,1.6)),I.v=Math.min(1,I.v+p/I.dur);let se=Do(I.v);_=va({eye:os(I.from.eye,_.eye,se),target:os(I.from.target,_.target,se)}),I.v>=1&&(s.blend=null)}let j=A==="director"?s.sharpNow:1;return I&&I.v<1&&(j=Math.min(I.sharp,j)),s.out=_,s.sharpOut=j,{eye:_.eye.slice(),target:_.target.slice(),mode:A,shot:v.shot,yaw:dn(_),sharp:j}}};return v}var Co={legere:11,normale:14,forte:19};function Xl({threshold:o=Co.normale,swings:e=5,window:t=700,rest:a=2e3}={}){let s=[],i=null,r=-1e9,n={threshold:o,peak:0,push(l,u,c,h){let d=[l,u,c],m=0;for(let p=1;p<3;p++)Math.abs(d[p])>Math.abs(d[m])&&(m=p);let v=Math.abs(d[m]);if(n.peak=Math.max(v,n.peak*.97),h-r<a)return s=[],i=null,!1;if(v<n.threshold)return i=null,!1;let g=Math.sign(d[m]);if(i&&i.axis===m&&i.sign===g)return!1;i={t:h,axis:m,sign:g};let f=s[s.length-1];return f&&f.sign===g&&f.axis===m?!1:(s.push(i),s=s.filter(p=>h-p.t<=n.window),s.length>=e?(r=h,s=[],i=null,!0):!1)},window:t,reset(){s=[],i=null}};return n}function $l(o=.1){let e=null;return(t,a,s)=>(e||(e=[t,a,s]),e[0]+=(t-e[0])*o,e[1]+=(a-e[1])*o,e[2]+=(s-e[2])*o,[t-e[0],a-e[1],s-e[2]])}var Ql=Ga*4,Jl=Mt.storage+".show",yd={soft:!1,latency:0,shake:"normale",meter:!1,layout:"ecran",objects:"vivants"},zi=(o,e,t)=>Math.max(e,Math.min(t,o)),gn=(o,e)=>{let t=Math.max(...o,.001),a=Math.min(...o);return o.map(s=>Math.max(0,(s-a*.7)/(t-a*.7))*e)},Ct=o=>(o=zi(o,0,1),o*o*(3-2*o)),Ii=1600,Fi=260,Zl=1150,xd=`
canvas.show-back, canvas.show-front { position: fixed; left: 0; top: 0; width: 100vw; height: var(--app-h, 100vh); display: block; }
canvas.show-back { z-index: 0; pointer-events: none; background: #05030a; }
canvas.show-front { z-index: 2; touch-action: none; }
html.show-on .app { z-index: 1; pointer-events: none; transform-origin: 0 0; clip-path: inset(0 round 46px); will-change: transform; }
html.show-on body { background: #05030a; }
html.show-apart .app { clip-path: none; background: transparent !important; }
html.show-apart .app::before { display: none; }
html.show-on .show-gone > svg, html.show-on .show-gone.logo > span, html.show-on .show-gone.logo b { opacity: 1 !important; }
html.show-public .app { z-index: 3; clip-path: inset(-12px round 58px); border-radius: 46px; box-shadow: 0 0 0 9px #0b0b0f, 0 0 0 10.5px #4a4752; }
.show-ui .panel .seg.wrap { flex-wrap: wrap; justify-content: flex-end; }
.show-ui .panel .lay { font-size: 12px; font-weight: 500; opacity: .75; margin: 2px 0 8px; text-align: right; }
.show-ui { position: fixed; left: 0; right: 0; top: 0; height: var(--app-h, 100vh); z-index: 4; pointer-events: none; color: #fff; font: 600 14px/1.3 -apple-system, system-ui, sans-serif; }
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
`;function Ye(o,e,...t){let a=document.createElement(o);for(let s in e||{})s==="onclick"?a.addEventListener("click",e[s]):s==="text"?a.textContent=e[s]:a.setAttribute(s,e[s]);for(let s of t)s&&a.append(s);return a}function ec(o,{app:e,pad:t,timeline:a,fx:s,hw:i,onPlay:r,ensureAudio:n,toast:l}){let u=matchMedia("(prefers-reduced-motion: reduce)"),c={...yd};try{c={...c,...JSON.parse(localStorage.getItem(Jl)||"{}")}}catch{}let h=()=>{try{localStorage.setItem(Jl,JSON.stringify(c))}catch{}},d=Ul(o);d.latency=c.latency||0,o.on("pos",k=>d.onPos(k));let m="idle",v=0,g=0,f=null,p=null,y=null,x=1,S=0,E=0,L=0,D=0,q=0,A=0,U=16.7,_=!1,I=1e9,j=window.devicePixelRatio||1,se=null,Y=null,J=0,ue=null,ve=null,de=1,Me=-1,ge=0,it=[0,0,0],P=0,G=vl(),F=new Float32Array(128),K=new Float32Array(128),W=new Float32Array(12),re={drum:[1,.5,.1],bass:[.7,.3,1],lead:[.45,1,.3],accent:[1,.5,.1]},ke=0,fe=16.7,Ke=60,Ut=0,Xe=0,ut=0,$e=Math.min(window.devicePixelRatio||1,1.25),rt=Math.min(window.devicePixelRatio||1,1.25),mt=40,Os=!1,wa=!1,tt=new Float32Array(12*Ql),gs=new Float32Array(28),bs=null,Za=0,ys=new Float32Array(192),Qs=new Float32Array(40),ka=new Float32Array(30),Js=new Float32Array(28),Te={state:"unknown",listening:!1,asked:!1,samples:[],hits:[],shakes:[],error:""},Kt=Xl({threshold:Co[c.shake]||Co.normale}),Oo=$l(),pe=0,R=0;function N(k){let B=k.acceleration,X,Z,Oe;if(B&&B.x!==null&&B.x!==void 0)X=B.x,Z=B.y,Oe=B.z;else{let we=k.accelerationIncludingGravity;if(!we||we.x===null||we.x===void 0)return;[X,Z,Oe]=Oo(we.x,we.y,we.z)}let He=performance.now();if(Te.samples.push([Math.round(He),+X.toFixed(2),+Z.toFixed(2),+Oe.toFixed(2)]),Te.samples.length>900&&Te.samples.splice(0,Te.samples.length-900),Kt.push(X,Z,Oe,He)){Te.hits.push(Math.round(He));let we={t:Math.round(He),before:Te.samples.slice(-60),after:[]};Te.shakes.push(we),Te.shakes.length>4&&Te.shakes.shift(),setTimeout(()=>{we.after=Te.samples.filter(he=>he[0]>we.t).slice(0,30)},600),Bo(He)?Zi("secousse"):m==="on"&&p&&pe===0&&d.playing&&p.encore(d.beatAt(He))}}function Q(){Te.listening||(Te.listening=!0,window.addEventListener("devicemotion",N))}let z=window.DeviceMotionEvent,ae=!!(z&&typeof z.requestPermission=="function");z?ae?z.requestPermission().then(k=>{Te.state=k,k==="granted"&&Q()}).catch(()=>{Te.state==="unknown"&&(Te.state="\xE0 demander")}):(Te.state="granted",Q()):Te.state="absent";function ye(){!ae||Te.asked||Te.state==="granted"||Te.state==="denied"||(Te.asked=!0,z.requestPermission().then(k=>{Te.state=k,k==="granted"&&Q()}).catch(k=>{Te.state="erreur",Te.error=String(k&&k.message||k)}))}let Se={sentinel:null,authorized:!1,error:""};function at(){Se.authorized||!navigator.wakeLock||(Se.authorized=!0,navigator.wakeLock.request("screen").then(k=>k.release()).catch(k=>{Se.authorized=!1,Se.error=String(k&&k.message||k)}))}function nt(){!navigator.wakeLock||Se.sentinel||navigator.wakeLock.request("screen").then(k=>{if(m==="idle"){k.release();return}Se.sentinel=k,k.addEventListener("release",()=>{Se.sentinel===k&&(Se.sentinel=null)})}).catch(k=>{Se.error=String(k&&k.message||k)})}function Xt(){Se.sentinel&&(Se.sentinel.release().catch(()=>{}),Se.sentinel=null)}let $t=0,eo=()=>{ye(),at(),$t||($t=setTimeout(()=>{!f&&m==="idle"&&(f=new Po)},4e3))};document.addEventListener("touchend",eo,!0),document.addEventListener("click",eo,!0),document.addEventListener("pointerdown",k=>{k.isPrimary&&k.pointerType==="touch"&&(pe=0),pe++},!0);let Zs=()=>{pe=Math.max(0,pe-1),R=performance.now()};document.addEventListener("pointerup",Zs,!0),document.addEventListener("pointercancel",Zs,!0);function Bo(k){return m==="idle"&&o.ui.playing&&!o.ui.armed&&document.visibilityState==="visible"&&pe===0&&k-R>500&&!document.querySelector(".sheet.open")&&!document.querySelector(".wake:not(.hidden)")}let vt=null;e.addEventListener("pointerdown",k=>{!k.target.closest||!k.target.closest(".top .progress")||(n&&n(),clearTimeout(vt),vt=setTimeout(()=>{vt="fired",o.ui.playing||r(),Zi("appui long")},650))},!0);let Bs=()=>{vt==="fired"?ye():clearTimeout(vt),vt=null};e.addEventListener("pointerup",Bs,!0),e.addEventListener("pointercancel",Bs,!0);let me=null,Le=null,ot=0,Ee=(k,B,X)=>Ye("div",{class:"seg"},...B.map(([Z,Oe])=>{let He=Ye("button",{"aria-pressed":String(c[k]===Z),text:Oe});return He.addEventListener("click",we=>{we.stopPropagation(),c[k]=Z,h();for(let he of He.parentNode.children)he.setAttribute("aria-pressed",String(he===He));X&&X(Z)}),He})),lt=Ye("div",{class:"lay",text:(Ft[c.layout]||Ft.ecran).line}),ct=Ye("div",{class:"lay"}),ie=()=>{ct.textContent=(_o[c.objects]||_o.vivants).line+(c.objects==="scene"&&nn.includes(c.layout)?" (Pas avec cette disposition de l\u2019app : ils y restent, fig\xE9s.)":"")};ie();let H=null;function Je(){let k=Ye("div",{class:"panel"},Ye("h4",{text:"Le concert"}),Ye("div",{class:"row"},Ye("span",{text:"Lumi\xE8res"}),Ee("soft",[[!1,"Intenses"],[!0,"Douces"]])),Ye("div",{class:"row"},Ye("span",{text:"Avance du son"}),Ee("latency",[[0,"0"],[100,"0,1 s"],[200,"Bluetooth"],[300,"0,3 s"]],he=>{d.latency=he})),Ye("div",{class:"row"},Ye("span",{text:"Secousse"}),Ee("shake",[["legere","L\xE9g\xE8re"],["normale","Normale"],["forte","Forte"]],he=>{Kt.threshold=Co[he]})),Ye("div",{class:"row"},Ye("span",{text:"Compteur"}),Ee("meter",[[!1,"Non"],[!0,"Oui"]],he=>Z.classList.toggle("on",he))),Ye("div",{class:"row"},Ye("span",{text:"L\u2019app"}),(()=>{let he=Ee("layout",Object.entries(Ft).map(([Qe,Ge])=>[Qe,Ge.name]),Qe=>{lt.textContent=Ft[Qe].line,ie()});return he.classList.add("wrap"),he})()),lt,H=Ye("div",{class:"row"},Ye("span",{text:"Objets"}),Ee("objects",Object.entries(_o).map(([he,Qe])=>[he,Qe.name]),ie)),ct,Ye("p",{text:"L\u2019app et les objets choisis ici servent au prochain concert. Avec des \xE9couteurs Bluetooth, le son arrive apr\xE8s l\u2019image : \xAB Bluetooth \xBB retarde les lumi\xE8res et les danses d\u2019autant. Les flashs de toute l\u2019image ne d\xE9passent jamais trois par seconde."})),B=Ye("div"),X=Ye("button",{text:"Copier la trace"});X.addEventListener("click",he=>{he.stopPropagation();let Qe=JSON.stringify(Pt());(navigator.clipboard?navigator.clipboard.writeText(Qe):Promise.reject()).then(()=>l("Trace copi\xE9e"),()=>l("Copie impossible"))});let Z=Ye("div",{class:"meter"+(c.meter?" on":"")},B,X),Oe=Ye("button",{class:"sx","aria-label":"Revenir \xE0 l\u2019app",text:"\xD7"});Oe.addEventListener("click",he=>{he.stopPropagation(),io()});let He=Ye("button",{class:"sg","aria-label":"R\xE9glages du concert",text:"\u2699"});He.addEventListener("click",he=>{he.stopPropagation(),k.classList.toggle("open"),ot=performance.now()+6e3});let we=Ye("button",{class:"again",text:"Touchez pour relancer"});we.addEventListener("click",he=>{he.stopPropagation(),r()}),Le=Ye("div",{class:"show-ui"},Oe,He,k,we,Z),Le.meterText=B,Le.panel=k,Le.meter=Z}let Pt=()=>({build:"0a5ac1920f",ua:navigator.userAgent,motion:{state:Te.state,error:Te.error,threshold:Kt.threshold,hits:Te.hits.slice(-20),shakes:Te.shakes,samples:Te.samples.slice(-600)},wake:{held:!!Se.sentinel,error:Se.error},gpu:{ema:+fe.toFixed(2),fps:Ke,app:st,sf:+$e.toFixed(2),sb:+rt.toFixed(2),steps:mt,compileMs:f&&f.compileMs,readyMs:f&&f.readyMs,parallel:f&&f.parallel,errors:f?f.errors.slice(0,3):[]}}),qe=null,ht=null,ea=[],Sa=new Map,kn=(k,B)=>{if(!ht)return null;let[X,Z]=Ti(ht,k-y.left,B-y.top);return Number.isFinite(X)?[X+y.left,Z+y.top]:null};function mc(k,B){if(m!=="on"||!t||!t.el||!Qt||o.ui.view!=="pattern")return null;let X=Et?Et.toPage(t.el,k,B):kn(k,B),Z=Qt.get(t.el);return X&&Z&&X[0]>=Z.left&&X[0]<=Z.right&&X[1]>=Z.top&&X[1]<=Z.bottom?X:null}let Vi=(k,B)=>({pointerId:7e3+k.pointerId,clientX:B[0],clientY:B[1],preventDefault(){}});function Sn(k){if(m!=="on"&&m!=="opening")return;let B=mc(k.clientX,k.clientY);if(B){Sa.set(k.pointerId,!0),t.down(Vi(k,B));return}qe={id:k.pointerId,x:k.clientX,y:k.clientY,dx:0,t:performance.now(),moved:0}}function Mn(k){if(Sa.has(k.pointerId)){let Z=Et?Et.toPage(t.el,k.clientX,k.clientY):kn(k.clientX,k.clientY);Z&&t.move(Vi(k,Z));return}if(!qe||k.pointerId!==qe.id)return;let B=k.clientX-qe.x,X=k.clientY-qe.y;qe.moved=Math.max(qe.moved,Math.hypot(B,X)),qe.dx=B,X>90&&Math.abs(X)>Math.abs(B)*1.5&&(qe=null,io())}function Io(k){if(Sa.has(k.pointerId)){Sa.delete(k.pointerId),t.up(Vi(k,[0,0]),k.type==="pointercancel");return}if(!qe||k.pointerId!==qe.id)return;let B=qe.moved<12&&performance.now()-qe.t<400;if(qe=null,!B)return;let X=ea.filter(Z=>k.clientX>=Z.x0&&k.clientX<=Z.x1&&k.clientY>=Z.y0&&k.clientY<=Z.y1).sort((Z,Oe)=>Oe.z-Z.z)[0];X&&p&&d.playing&&p.solo(X.i,d.beatAt(performance.now()))||(Le.classList.add("controls"),ot=performance.now()+3e3)}let vc=()=>{for(let k of Sa.keys())t.up({pointerId:7e3+k,clientX:0,clientY:0,preventDefault(){}},!0);Sa.clear()},Tn=k=>{k.beta!==null&&k.gamma!==null&&(ue={beta:k.beta,gamma:k.gamma,angle:typeof window.orientation=="number"?window.orientation:screen.orientation?screen.orientation.angle:0})},xs=null,Wi=["wake","keepAwake","requestRender"];function Yi(k){let B=s&&s();B&&(B.held=k);let X=B&&B.fluid;if(k&&X&&xs!==X){if(xs)for(let Z of Wi)delete xs[Z];xs=X,X.stop(),X.pending&&(cancelAnimationFrame(X.pending),X.pending=0);for(let Z of Wi)X[Z]=()=>{}}else if(!k&&xs){xs.queue=[];for(let Z of Wi)delete xs[Z];xs=null}i&&i.hold&&i.hold(k||ks)}let st=0,Qt=null,to=null,Is=null,ta=null;function gc(){Qt=new Map([[e,e.getBoundingClientRect()]]);for(let B of e.querySelectorAll("*"))Qt.set(B,B.getBoundingClientRect());to=Element.prototype.getBoundingClientRect;let k=to;Element.prototype.getBoundingClientRect=function(){let B=Qt&&Qt.get(this);return B?DOMRect.fromRect(B):k.call(this)}}function bc(){to&&(Element.prototype.getBoundingClientRect=to,to=null),Qt=null}function Ki(k){k&&!Is?(Is=Object.getOwnPropertyDescriptor(window,"devicePixelRatio")||{inherited:!0},Object.defineProperty(window,"devicePixelRatio",{configurable:!0,get:()=>1})):!k&&Is&&(Is.inherited?delete window.devicePixelRatio:Object.defineProperty(window,"devicePixelRatio",Is),Is=null)}let Xi=0;function $i(k){let B=s&&s()&&s().fluid;if(ta&&(ta!==B||k!==Xi)&&(delete ta.frame,ta=null,Xi=0),!B||k<=1||ta)return;yc(B);let X=Object.getPrototypeOf(B).frame,Z=1;B.slow=0,B.frame=Oe=>{if(B.lastFrameAt=0,Z=(Z+1)%k){B.raf=requestAnimationFrame(He=>B.frame(He));return}X.call(B,Oe)},ta=B,Xi=k}function yc(k){if(k.keepInk)return;let B=Object.getPrototypeOf(k).initBuffers;k.initBuffers=function(){let X=this.res(this.cfg.SIM_RESOLUTION),Z=this.res(this.cfg.DYE_RESOLUTION);this.dye&&this.velocity&&this.velocity.width===X.width&&this.velocity.height===X.height&&this.dye.width===Z.width&&this.dye.height===Z.height||B.call(this)},k.keepInk=!0}let sa=null,Ma=null;function En(k){let B=s&&s()&&s().fluid;k&&B&&!sa?(Ma=B,sa={SUNRAYS:B.cfg.SUNRAYS,BLOOM:B.cfg.BLOOM},B.cfg.SUNRAYS=!1,B.cfg.BLOOM=!1,B.setDisplay&&B.setDisplay()):!k&&sa&&(Ma&&(Object.assign(Ma.cfg,sa),Ma.setDisplay&&Ma.setDisplay()),sa=null,Ma=null)}function so(k){if(st=k,k===9){$i(1),Yi(!0);return}Yi(!1),$i(k||1),i&&i.light&&i.light(k&&Is?1:0,k||1)}let Et=null,An=0,ws="ecran";function Qi(k){let B=Gr(x),[X,Z,,Oe]=B,He=(Ge,aa)=>{let Ue=(Ge-y.left)/y.width,Ce=(aa-y.top)/y.height;return[X[0]+(Z[0]-X[0])*Ue+(Oe[0]-X[0])*Ce,X[1]+(Z[1]-X[1])*Ue+(Oe[1]-X[1])*Ce,X[2]]},we=He(k.left+k.width/2,k.top+k.height/2),he=He(k.right,k.top+k.height/2),Qe=He(k.left+k.width/2,k.top);return{c:we,u:[he[0]-we[0],he[1]-we[1],he[2]-we[2]],v:[Qe[0]-we[0],Qe[1]-we[1],Qe[2]-we[2]]}}function xc(k){let B=Ft[ws]&&Ft[ws].pieces?ws:null;if(B){if(Et=Ol({app:e,rects:Qt,ghouls:k?{canvas:k}:null}),An=d.playing?Math.floor(d.beatAt(performance.now())/32)*32:0,!Et.start(B,Qi,{screen:Ji()})){Et=null;return}e.style.transform=""}}let Ji=()=>({w:ee.screen.height*x,h:ee.screen.height,c:[0,ee.screen.bottom+ee.screen.height/2,ee.screen.z]});function wc(){Et&&(Et.stop(),Et=null)}let ks=!1,Fo=null,Ta=null,Fs=null,ao=!1,oo="vivants";function kc(k){if(ks||!i||!i.on||!i.drawNow||!Qt)return null;let B=i.drawNow();if(!B)return null;let X=Il(B);return k&&(Ta=zl({snap:X,app:e,rects:Qt,A:Qt.get(e)})),Fs=B,Fs.dataset.showVis=B.style.visibility,B.style.visibility="hidden",ks=!0,i.hold&&i.hold(!0),X}function Sc(k){let B=Qt.get(e);k.className="show-snap",Object.assign(k.style,{position:"absolute",left:"0",top:"0",width:B.width+"px",height:B.height+"px",zIndex:"-1",pointerEvents:"none"}),e.prepend(k),Fo=k}function Ln(){ao=!0;let k=!!(Ft[ws]&&Ft[ws].pieces),B=oo,X=k||B!=="vivants"?kc(B==="scene"):null;xc(X),!Et&&X&&Sc(X)}function Mc(){Ta&&(Ta.stop(),Ta=null),Fo&&(Fo.remove(),Fo=null),Fs&&(Fs.style.visibility=Fs.dataset.showVis||"",delete Fs.dataset.showVis,Fs=null),ks&&(ks=!1,i&&i.hold&&st!==9&&i.hold(!1))}function Nd(){}function Zi(k){if(!(m!=="idle"||document.visibilityState!=="visible")){if(f&&(f.lost||!f.ok)&&(f.destroy(),f=null),f||(f=new Po),!f.ok){l("Le concert ne peut pas d\xE9marrer ici (WebGL 2)");return}m="opening",Cn.reason=k,document.activeElement&&/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)&&document.activeElement.blur(),i&&i.goAway&&i.goAway(!0),gc(),j=window.devicePixelRatio||1,so(2),y=e.getBoundingClientRect(),x=y.width/y.height,ws=Ft[c.layout]?c.layout:"ecran",oo=_o[c.objects]?c.objects:"vivants",oo==="scene"&&nn.includes(ws)&&(oo="figes"),ao=!1,me||(me=Ye("style",{text:xd}),document.head.append(me)),Le||Je(),H.style.display=i&&i.on?"":"none",ct.style.display=H.style.display,y=e.getBoundingClientRect(),x=y.width/y.height,q=innerWidth,i&&i.on&&i.drawNow&&(Ft[ws].pieces||oo!=="vivants")||Ln(),p=new qi(o.settings.hwCast),d.events.length=0,document.body.insertBefore(f.back,e),document.body.append(f.front,Le),document.documentElement.classList.add("show-on"),f.front.addEventListener("pointerdown",Sn),f.front.addEventListener("pointermove",Mn),f.front.addEventListener("pointerup",Io),f.front.addEventListener("pointercancel",Io),se=Kl({calm:u.matches,seed:1+Math.floor(Math.random()*1e6)}),Y=null,J=0,ue=null,de=1,Me=-1,G.reset(),it.fill(0),window.addEventListener("deviceorientation",Tn),$e=rt=Math.min(j,1.25),mt=40,E=performance.now(),S=0,Os=!1,g=0,ut=0,fe=16.7,U=16.7,I=1e9,_=!1,A=0,nt(),v=requestAnimationFrame(Dn)}}function io(k){if(m!=="idle"){if(k===!0||m==="opening"||u.matches){zo();return}m!=="closing"&&(m="closing",L=performance.now(),D=L+780,p.leave(L),i&&i.goAway&&i.goAway(!1),Ki(!1),i&&i.light&&st!==9&&i.light(0,st),ks&&!Fs&&st!==9&&i&&i.hold&&(ks=!1,i.hold(!1)),Le.classList.remove("controls","stopped"),Le.panel.classList.remove("open"))}}function zo(){v&&cancelAnimationFrame(v),v=0,m="idle",pe=0,qe=null,vc(),window.removeEventListener("deviceorientation",Tn),G.reset(),se=null,Object.assign(e.style,{transform:"",opacity:""}),document.documentElement.classList.remove("show-on"),f&&(f.back.remove(),f.front.remove()),Le&&(Le.remove(),Le.classList.remove("controls","stopped"),Le.panel.classList.remove("open")),f&&(f.front.removeEventListener("pointerdown",Sn),f.front.removeEventListener("pointermove",Mn),f.front.removeEventListener("pointerup",Io),f.front.removeEventListener("pointercancel",Io)),Ki(!1),En(!1),wc(),Mc(),document.documentElement.classList.remove("show-public"),so(0),i&&i.goAway&&i.away&&i.goAway(!1),bc(),Xt();let k=s&&s();k&&k.place&&k.place(),t&&t.draw(),a&&a.draw()}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&io(!0)}),window.addEventListener("resize",()=>{m!=="idle"&&Math.abs(innerWidth-q)>1&&io(!0)});let Rn=0,er=0,Pn=0,Tc=Hr(34*Math.PI/180,Ro/Va,.1,30);function Ec(k,B,X,Z){let Oe=Z?Z[0]:ee.screen.height*x/2,He=Z?Z[2]:ee.screen.bottom+ee.screen.height,we=[-1,1].map(Ue=>{let Ce=Ue*(Oe+1.05),St=He-1.55,jt=ee.screen.z+.45,qt=.6,ls=.9,ro=-Ue*.22,zs=Math.cos(ro)*qt,Ns=Math.sin(ro)*qt;return[[Ce-zs,St+ls,jt-Ns],[Ce+zs,St+ls,jt+Ns],[Ce+zs,St-ls,jt+Ns],[Ce-zs,St-ls,jt-Ns]]});if(X-Pn>900){Pn=X;let Ue=er,Ce=-1;p.lanes.forEach((St,jt)=>{St>Ce&&(Ce=St,Ue=jt)}),er=Ue}let he=Ue=>{let Ce=k.indexOf(Ue);return Ce>=0&&Ce<B&&Ue.in>=1?Ce:-1},Qe=p.soloist&&p.soloist.x,aa=[p.dancers.find(Ue=>Ue.row==="back"&&Ue.lane===er),Qe||p.dancers.find(Ue=>Ue.role==="lead")].map(Ue=>{if(!Ue)return null;let Ce=ee.dollScale,St=X/1e3,jt=[Ue.pos[0],Ue.pos[1]+1.5*Ce,Ue.pos[2]],qt=[jt[0]+.25*Math.sin(St*.7),jt[1]+.2,jt[2]+3.1*Ce],ls=Si(Tc,Ur(qt,jt));return{VP:new Float32Array(ls),invVP:new Float32Array(jr(ls)),eye:qt,pix:2*Math.tan(17*Math.PI/180)/Va,inst:he(Ue)}});return Rn++,{quads:we,cams:aa,update:[Rn%2]}}function Ac(k){let B=k.p,X=1-k.sq,Z=1/Math.sqrt(Math.max(X,.25)),Oe=Ge=>Math.hypot(Ge[0]+B.hip,Ge[2])+.16,He=Math.max(Oe(B.hl),Oe(B.hr)),we=(Math.max(.86,He)+Math.abs(B.hip))*Z+Math.abs(k.sw)*.7+Math.abs(k.hx)*.6+.04,he=Math.max(.78,He)*Z+.04;Math.abs(B.spin)>.02&&(we=he=Math.max(we,he));let Qe=Math.max(1.32+Math.max(0,k.hy),Math.max(B.hl[1],B.hr[1])+.22)+.16;return Qe=(Qe+1.1)*Math.max(X,.5)-1.1+.05,[Math.min(1.3,we),Math.min(2.2,Math.max(.6,Qe)),Math.min(1.3,he),0]}let _n="",tr=null,sr=(k,B,X)=>{let Z=`${k.toFixed(3)},${B},${X}`;return Z!==_n&&(_n=Z,tr=Ia(k,B,X)),{eye:tr.eye.slice(),target:tr.target.slice()}};function Dn(k){if(v=0,m==="idle")return;let B=Math.min(.05,g?(k-g)/1e3:1/60);if(g&&m==="on"){let C=k-g;fe=fe*.94+C*.06;let V=_&&Math.abs(fe-33.3)<3;G.active&&(ge=k+3e3),fe>18.5&&!V&&k>=ge?++ut>50&&(ut=0,$e>1?$e=Math.max(1,$e*.9):st===2?so(3):!sa&&st&&st!==9&&!(s&&s()&&s().engine&&s().engine()==="webgl")?En(!0):mt>32?mt=32:!ks&&i&&i.on&&i.hold&&!Et&&m==="on"?(ks=!0,i.hold(!0)):st===3?so(4):$e>.85?$e=Math.max(.85,$e*.92):mt>28?mt=28:rt>.8?rt=Math.max(.8,rt*.85):st===4&&fe>(_?48:24)&&so(9)):ut>=0&&(ut=Math.max(0,ut-1))}if(g&&m==="opening"&&S&&k-S>150&&(U=U*.9+(k-g)*.1,I=Math.min(I,k-g)),g=k,Ut++,k-Xe>1e3&&(Ke=Math.round(Ut*1e3/(k-Xe||1e3)),Ut=0,Xe=k),f.lost){if(ge=k+4e3,!A)A=k;else if(k-A>3e3){let C=f;zo(),C.destroy(),f=null;return}}else A=0;if(!f.lost&&!f.ready&&f.compiled()&&(f.finish(),!f.ok)){console.warn("MOTIF Sc\xE8ne :",f.errors.join(`
`)),l("Le concert ne peut pas d\xE9marrer ici"),zo();return}f.ready&&!S&&ao&&(f.warmed()||k-E>6e3)&&(S=k);{let C=s&&s()&&s().fluid;C&&st===9&&C!==xs?Yi(!0):C&&(st===2||st===3||st===4)&&C!==ta&&$i(st)}if(k-ke>500){ke=k;let C=getComputedStyle(e);for(let V of["drum","bass","lead","accent"])re[V]=Mo(C.getPropertyValue("--"+V))}let X=f.back.clientWidth||innerWidth,Z=f.back.clientHeight||innerHeight,Oe=d.beatAt(k),He=d.take(k),we=d.playing;we&&(P=Oe);let he=m==="on"||m==="closing"?G.update({beat:Oe,tempo:d.tempo,playing:we,project:o.project,events:He,master:d.levelsAt(k).master,sec:d.sec,now:k,quiet:m==="closing"}):null,Qe=he?he.dark:0;for(let C of He)C.kind==="section"&&(Me=C.v);we?Me<0&&(Me=Math.max(0,d.sec)):Me=-1;let Ge,aa=0,Ue=1,Ce=u.matches;if(m==="opening"){let C=S?k-S:0,V=Ce?1:zi((C-Fi)/Ii,0,1);Ge=Ce?sr(0,X,Z):Wr(V,0,0,sr(0,X,Z)),aa=Ce?0:1-Ct(V),Ue=Ct(Ce?C/600:V*1.4);let ne=Ce?0:(S?Math.max(0,1-C/Fi):1)*.045;ne&&(Ge.eye=[Ge.eye[0]+ne*Math.sin(k*.11),Ge.eye[1]+ne*Math.sin(k*.137+1),Ge.eye[2]]),Ce&&(e.style.opacity=String(Ct(C/600))),!Is&&ao&&(Ce||Ct(V)>.5)&&(Ki(!0),i&&i.light&&st!==9&&i.light(1,st)),S&&C>=(Ce?600:Fi+Ii)&&(m="on",e.style.opacity="",_=U>28&&I>25)}else if(m==="closing"){let C=k<D?1:1-zi((k-D)/Zl,0,1);if(Ge=Wr(C,0,0,Y||sr(0,X,Z)),aa=1-Ct(C),Ue=Ct(C*1.4),k>D+Zl){p.whiteFlash(k,0),zo();return}}else{let C=o.project.song&&o.project.song.enabled&&o.project.song.sections.length>1,V=se.update({dt:B,now:k,beat:Oe,section:C?Me:-1,tilt:ue,drag:qe&&!Ce?-qe.dx/innerWidth*1.2:null,W:X,H:Z,calm:Ce,cue:he&&he.cue||ve,busy:!!(he&&he.active)});ve=null,Ge={eye:V.eye,target:V.target},Y={eye:V.eye.slice(),target:V.target.slice()},J=V.yaw,de=V.sharp||1}if(m==="closing"&&(Qe*=Ue),m==="on"&&!Os){Os=!0;let C=6e4/(d.tempo||120),V=d.beatAt(k),ne=d.playing?(Math.ceil(V)-V)*C:0;p.enter(k+ne,C),setTimeout(()=>{m==="on"&&p.whiteFlash(performance.now(),.85)},ne)}!Ce&&m==="on"&&p.shake>.01&&(Ge={eye:[Ge.eye[0],Ge.eye[1]+.025*p.shake*Math.sin(k*.08),Ge.eye[2]-.05*p.shake],target:Ge.target});let St=Yr(Ge,X,Z,y,x,aa),jt=jr(St);(m==="opening"||m==="on")&&!ao&&k-E>700&&Ln();let qt=m==="opening"?Ct(((S?k-S:0)-Fi-Ii*.45)/(Ii*.55)):m==="closing"?1-Ct((k-L)/(D-L)):1,ls=(Oe%1+1)%1,ro=Ft[ws]||Ft.ecran,zs=null,Ns=0,Ss=null,No=[];if(Et){let C=Et.update(St,X,Z,qt,{t:k/1e3,beat:P,beat0:An,beatPhase:ls,pulse:Math.pow(1-ls,3),kick:p.flash,eye:Ge.eye,screen:Ji()});for(let ne of C)No.push([ne,ne.cable?2:1]);let V=Et.pieces.findIndex(ne=>ne.sel===".view");if(V>=0&&Et.staticView){let ne=C[V],Pe=Math.hypot(...ne.u),gt=Math.hypot(...ne.v);zs=[Pe,ne.c[1]-gt,ne.c[1]+gt,ne.c[2]]}else Ns=qt;ht=null}else{let C=Gr(x);if(ro.phone){let Pe=Qi(y),gt=ql(Ge,X,Z,x,{beat:Oe,t:k/1e3,jump:p.jump,raise:p.hype?1:0,calm:Ce}),Ms=Ct(qt),bt={c:os(Pe.c,gt.c,Ms),u:os(Pe.u,gt.u,Ms),v:os(Pe.v,gt.v,Ms)};C=[[-1,1],[1,1],[1,-1],[-1,-1]].map(([Ts,yt])=>[0,1,2].map(Gs=>bt.c[Gs]+bt.u[Gs]*Ts+bt.v[Gs]*yt)),document.documentElement.classList.toggle("show-public",qt>.4),Ns=qt}let V=C.map(Pe=>{let gt=Cs(St,Pe,X,Z);return[gt[0]-y.left,gt[1]-y.top]});ro.phone&&qt>.6&&(Ss=[(V[2][0]+V[3][0])/2+y.left,(V[2][1]+V[3][1])/2+y.top,Math.hypot(V[2][0]-V[3][0],V[2][1]-V[3][1]),Ct((qt-.6)/.4),V[2][0]-V[3][0],V[3][1]-V[2][1]]);let ne=Fa(y.width,y.height,V);e.style.transform=za(ne),ht=Ei(ne)}if(Ta){let C=Ta.update(St,X,Z,qt,{t:k/1e3,beat:Oe,kick:p.flash,snare:p.strobe,hat:p.sparkle,screen:Ji(),calm:Ce},Qi);for(let V of C)V.cable&&No.push([V.hang,3])}ys.fill(0),No.slice(0,16).forEach(([C,V],ne)=>{ys.set([...C.c,V],ne*12),ys.set([...C.u,0],ne*12+4),ys.set([...C.v,0],ne*12+8)}),Za=Math.min(16,No.length),we!==wa&&(wa=we,Le.classList.toggle("stopped",!we&&m==="on")),ot&&k>ot&&!Le.panel.classList.contains("open")&&(Le.classList.remove("controls"),ot=0);let Hs=d.levelsAt(k);p.dark=Qe,he&&he.flash&&m==="on"&&p.whiteFlash(k,he.flash);let Gt=p.update(B,k,Oe,He,Hs,we,d.tempo,re,[Math.sin(J),0],Ce),no=c.soft?.4:1,qn=ee.dollScale,Us=0,ar=0,On=p.dancers.slice().sort((C,V)=>C.pos[2]-V.pos[2]);ea=[];for(let C of On){let V=m==="closing"?Math.min(Ct(C.in),1-Ct(C.out)):Ct(C.in);if(V<=.001)continue;let ne=C.d,Pe=ne.p,gt=[C.pos[0]+Pe.travel*qn,C.pos[1],C.pos[2]],Ms=[C.home[0]*.3,ee.screen.bottom+.6,ee.screen.z+.25],bt=os(Ms,gt,V);bt[1]+=Math.sin(V*Math.PI)*2.2;let Ts=qn*(.35+.65*V),yt=Us*Ql;tt.set([bt[0],bt[1],bt[2],Ts],yt),tt.set([ne.spot,0,0,Pe.spin+(1-V)*Math.PI*2+(C.extraSpin||0)],yt+4),tt.set([0,0,1,ne.type],yt+8),tt.set([ne.sq,ne.hx,ne.hy,ne.sw],yt+12),tt.set([ne.lx,ne.ly,ne.blink,ne.mouth],yt+16),tt.set([ne.glow,ne.scare,ne.seed,Pe.bend],yt+20),tt.set([ne.color[0],ne.color[1],ne.color[2],1],yt+24),tt.set([Pe.hl[0],Pe.hl[1],Pe.hl[2],Pe.hip],yt+28),tt.set([Pe.hr[0],Pe.hr[1],Pe.hr[2],Pe.twist],yt+32),tt.set([Pe.ll,Pe.lr,Pe.roll,ne.ink],yt+36),tt.set([Pe.fxl,Pe.fxr,Pe.crouch,Pe.lz],yt+40);let Gs=Ac(ne);tt.set(Gs,yt+44);{let or=1e9,ir=-1e9,rr=1e9,nr=-1e9;for(let _c of[-Gs[0],Gs[0]])for(let Dc of[-1.16,Gs[1]]){let Go=Cs(St,[bt[0]+_c*Ts,bt[1]+(Dc+1.1)*Ts,bt[2]],X,Z);or=Math.min(or,Go[0]),ir=Math.max(ir,Go[0]),rr=Math.min(rr,Go[1]),nr=Math.max(nr,Go[1])}ea.push({i:p.dancers.indexOf(C),x0:or,x1:ir,y0:rr,y1:nr,z:bt[2]})}gs.set([bt[0],bt[1],bt[2],Ts*(V>.98?1:0)],Us*4),Js.set([ne.color[0],ne.color[1],ne.color[2],1],Us*4),bt[2]<-2&&ar===Us&&(ar=Us+1),Us++}let Lc=m==="opening"?1:Math.round(de*20)/20;f.resize(X,Z,rt,$e*Lc);let Rc=we?1:.6,Pc=Ec(On,Us,k,zs);Qs.fill(0);let Bn=f.front.height,oa=f.front.width/X,In=C=>{let V=Cs(St,C,X,Z);return V[2]>0?[V[0]*oa,Bn-V[1]*oa]:null};ee.heads.forEach((C,V)=>{let ne=[Gt.spotDir[V*4],Gt.spotDir[V*4+1],Gt.spotDir[V*4+2]],Pe=Gt.spotDir[V*4+3],gt=[Ge.eye[0]-C[0],Ge.eye[1]-C[1],Ge.eye[2]-C[2]],Ms=Math.hypot(...gt),bt=(ne[0]*gt[0]+ne[1]*gt[1]+ne[2]*gt[2])/Ms,Ts=Math.min(1,zi((bt-(Pe-.04))/.05,0,1)*Gt.spotPos[V*4+3]*.45)*(c.soft?.5:1),yt=Ts>.01&&In(C);yt&&(Qs.set([yt[0],yt[1],Ts,55*oa],V*4),ka.set([.6+.4*Gt.spotCol[V*3],.6+.4*Gt.spotCol[V*3+1],.6+.4*Gt.spotCol[V*3+2]],V*3))}),[-4,-2.4,-.8,.8,2.4,4].forEach((C,V)=>{let ne=p.blind*(1-Qe),Pe=ne>.02&&In([C,10.3,ee.screen.z+.66]);Pe&&(Qs.set([Pe[0],Pe[1],ne*.45,34*oa],(4+V)*4),ka.set([1,.55+.35*p.blind,.2+.5*p.blind],(4+V)*3))});let Jt=1-Qe,Ho=m==="closing"?Ue:1,Fn=(c.soft?.6:1)*Ho,Ea=0,js=[0,0,0],Uo=0,zn=null,Nn=null;if(he){[re.drum,re.bass,re.lead,re.accent].forEach((C,V)=>W.set(gn(C,1.05),V*3));for(let{shell:C,t:V}of he.shells){if(Ea>=32)break;if(F.set(fl(C),Ea*4),K.set([V,C.color,Fn,0],Ea*4),V>=0&&V<1.2){let ne=Math.exp(-V*3.5)*(C.bouquet?.5:.4)*Fn,Pe=W.subarray(C.color*3,C.color*3+3);js=js.map((gt,Ms)=>gt+(.35+.65*Pe[Ms])*ne)}Ea++}for(let C=0;C<4;C++)Uo+=he.flames[C*4+3];if(Uo>0&&(Nn=he.flames.map((C,V)=>V%4===3?C*(c.soft?.7:1)*Ho:C),js=js.map((C,V)=>C+[1,.45,.12][V]*Uo*.18*Ho)),he.confettiT>=0){let C=.55+.6*p.flash+.5*p.white;zn={t:he.confettiT,fade:(1-Ct((he.confettiT-30)/4))*Ho,light:[C,C*.97,C*.92]}}}for(let C=0;C<3;C++)it[C]+=(js[C]-it[C])*(1-Math.exp(-B/(js[C]>it[C]?.3:.7)));js=it.slice();let jo=C=>Jt<1?C.map(V=>V*Jt):C;bs={VP:new Float32Array(St),invVP:new Float32Array(jt),eye:Ge.eye,pix:2*Math.tan(ee.fovY/2)/Math.max(1,f.front.height),steps:mt,farSteps:Math.max(24,mt-10),far:ar,n:Us,dolls:tt,shadowDolls:gs,spotPos:Gt.spotPos.map((C,V)=>V%4===3?C*(c.soft?.75:1):C),spotDir:Gt.spotDir,spotCol:Gt.spotCol,moon:ee.moon,time:(k-E)/1e3,beat:Gt.pulse*(we?1:0),foot:re.bass.map((C,V)=>C*(.25+1.6*Math.min(1,Math.sqrt(Hs.bass||0)*1.2))*Rc*Jt+[1,.5,.15][V]*Math.min(2,Uo)*.9),screenCol:re.accent.map(C=>C*(.35+.5*Math.min(1,Math.sqrt(Hs.master||0)))*(.3+.7*Jt)),riserCol:re.drum.map(C=>C*(.3+1.6*Math.min(1,Math.sqrt(Hs.drum||0)*1.2))*Jt),flash:p.flash*no*Jt,strobe:p.strobe*(c.soft?.3:1)*Jt,sparkle:p.sparkle*no*Jt,white:p.white*(c.soft?.3:1)*(m==="closing"?Ue:1)*(1-Qe),haze:c.soft?.7:1,crowd:1,jump:p.jump,screen:zs||[ee.screen.height*x/2,ee.screen.bottom,ee.screen.bottom+ee.screen.height,ee.screen.z],fade:Ue,ramp:jo(p.ramp),bulbs:jo(p.bulbs),lanes:jo(p.lanes),bassCol:re.bass,leadCol:re.lead,drumCol:re.drum,speak:p.flash*Jt,kick:p.flash,blind:p.blind*no*Jt,dollCol:Js,lasers:jo(p.lasers),laserCol:gn(re.lead,1.5),ceil:we?Math.min(1,Math.sqrt(Hs.bass||0)*1.4)*no*Jt:0,ceilCol:gn(re.bass,1.2),tunnel:p.tunnel*no*Jt,screenTop:[ee.screen.height*x/2,ee.screen.bottom+ee.screen.height,ee.screen.z,Oe*Math.PI*.5],flare:Qs,flareCol:ka,phones:Math.max(p.phones,Qe),ola:Gt.ola,clap:p.clap,side:Pc,veil:Qe*.78,wash:1-Qe*.85,burst:js,flames:Nn,confetti:zn,cols:W,shells:Ea?{n:Ea,pos:F,t:K}:null,pieces:Za?ys:null,nPieces:Za,hand:Ss?[Ss[0]*oa,Bn-Ss[1]*oa,Ss[2]*oa,Ss[3]]:null,handDir:Ss?[Ss[4],Ss[5]]:null,led:Ns,levels:[Math.min(1,Math.sqrt(Hs.drum||0)*1.25),Math.min(1,Math.sqrt(Hs.bass||0)*1.25),Math.min(1,Math.sqrt(Hs.lead||0)*1.25),we?1:0]},f.warmed()&&f.draw(bs),c.meter&&Le.meter.classList.contains("on")&&(Le.meterText.textContent=`${Ke} i/s \xB7 ${fe.toFixed(1)} ms
devant ${$e.toFixed(2)}\xD7 \xB7 fond ${rt.toFixed(2)}\xD7 \xB7 ${mt} pas
shader : ${f.compileMs??"\u2026"} ms d\u2019attente${f.parallel?" (compil\xE9 \xE0 part)":""}
mouvement : ${Te.state}${Te.listening?", \xE9cout\xE9":""}
secousse : ${Kt.peak.toFixed(1)} / ${Kt.threshold} m/s\xB2 \xB7 ${Te.hits.length}
app : ${st===9?"fig\xE9e":st?"en direct, 1 image sur "+st+(sa?", verre all\xE9g\xE9":""):"\u2014"}
cam\xE9ra : ${se?{calm:"fixe",drag:"doigt",tilt:"inclinaison",director:"r\xE9alisateur"}[se.mode]+(se.mode==="director"&&se.shot?" ("+se.shot+")":""):"\u2014"}${ue?"":" \xB7 pas d\u2019inclinaison"}
bouquet : ${G.active?"en cours":G.plan?"pr\xE9vu":"\u2014"}
\xE9cran allum\xE9 : ${Se.sentinel?"oui":"non"}${Se.error?" ("+Se.error.slice(0,30)+")":""}`),v=requestAnimationFrame(Dn)}let Cn={get state(){return m},get ok(){return!f||f.ok},get errors(){return f?f.errors:[]},get stats(){return{state:m,ema:fe,fps:Ke,sf:$e,sb:rt,steps:mt,app:st,dpr:j,compileMs:f&&f.compileMs,parallel:f&&f.parallel,motion:Te.state,wake:!!Se.sentinel,n:p?p.dancers.length:0}},get renderer(){return f},get beat(){return d.beatAt(performance.now())},get director(){return p},get camera(){return se},get finale(){return G},shot(k){ve=k},bouquet(k=4){let B=d.beatAt(performance.now());G.start(Ai(Math.ceil(B/4)*4+4,k))},reason:"",open:Zi,close:io,trace:Pt,measure(k){return f&&bs?f.time(bs,k):null},quality(k){k.sf&&($e=k.sf),k.sb&&(rt=k.sb),k.steps&&(mt=k.steps),ut=-1e9}};return Cn}var bn="0a5ac1920f",T=new Jo;window.__motif=T;var wd={drum:"Drum",bass:"Bass",lead:"Lead"},kd={kick:"KICK",snare:"SNARE \xB7 CLAP",hat:"HAT",perc:"PERC",bass:"BASSE",lead:"M\xC9LODIE"},ga=[["order","Ordre"],["up","Montant"],["down","Descendant"],["chord","Accord"]],pt=null,ba,je,Ht,$a,Nt,$s,ce=null,et=null,tc=!1,O={},sc=0;function Rt(o,e){let t=O.toast;if(t.replaceChildren(b("span",{text:o})),e){let a=b("button",{text:e.label,onclick:()=>{t.classList.remove("show"),e.fn()}});t.append(a)}t.classList.toggle("act",!!e),t.classList.add("show"),clearTimeout(sc),sc=setTimeout(()=>t.classList.remove("show"),e?5e3:2200)}var Xs=null;function ya(){return pt.running?Promise.resolve(!0):pt.start().then(o=>(o&&wn(),o)).catch(o=>(Rt("Audio indisponible : "+o.message),!1))}function nc(o,e){O.wake.querySelector("h1").textContent=o,O.wake.querySelector("p").textContent=e,O.wake.classList.remove("hidden")}function wn(){O.wake.classList.add("hidden")}async function Gi(o){for(let e of l0(o)){let t=e==="drums"?"banks/drums/bank.json":`banks/${e}/bank.json`;if(!pt.loadedBanks.has(t))try{await pt.loadBank(t)}catch(a){Rt("Sons non charg\xE9s ("+e+") : "+a.message)}}}async function lc(){let o=T.project,e=[...o.parts.drum.kit,o.parts.bass.preset,o.parts.lead.preset];for(let t of e)await Gi(Ve(t));T.syncAll()}function Sd(){ba=document.getElementById("app"),ba.dataset.part=T.ui.part,O.logo=b("button",{class:"logo","aria-label":"Menu et projets",onclick:()=>$s.menu()},b("span",{html:be("logo").outerHTML}),b("b",{text:"MOTIF"})),O.rec=b("button",{class:"tbtn rec","aria-label":"Armer l\u2019enregistrement","aria-pressed":"false",onclick:Td},be("rec")),O.play=b("button",{class:"tbtn play","aria-label":"Lecture","aria-pressed":"false",onclick:yn},be("play")),O.progressFill=b("div",{class:"fill"}),O.progressBars=b("div",{class:"bars"}),O.pos=b("span",{class:"pos",text:""}),O.progress=b("div",{class:"progress","aria-hidden":"true"},O.progressFill,O.progressBars,O.pos),O.tempo=b("div",{class:"chip tempo",role:"slider",tabindex:"0","aria-label":"Tempo. Toucher pour le m\xE9tronome, glisser pour changer."},b("b"),b("small",null,b("span",{class:"mi",html:be("metro").outerHTML}),"BPM")),O.key=b("button",{class:"chip","aria-label":"Tonalit\xE9 et gamme",onclick:()=>$s.keyPicker()},b("b"),b("small"));let o=b("div",{class:"top"},O.logo,O.rec,O.play,O.progress,O.tempo,O.key);u0(O.tempo,{get:()=>T.project.tempo,set:t=>{T.set("tempo",t),Qa()},step:6,onTap:Ad}),O.parts=b("div",{class:"parts",role:"tablist"});for(let t of["drum","bass","lead"]){let a=b("button",{class:"ptab",role:"tab","data-p":t,onclick:()=>hc(t)},be(t),wd[t],b("i",{class:"lvl"}),b("i",{class:"mute"}));O.parts.append(a)}O.instName=b("button",{class:"name","aria-label":"Choisir un son",onclick:()=>$s.browser()},b("small"),b("b")),O.prev=b("button",{class:"arrow","aria-label":"Son pr\xE9c\xE9dent",onclick:()=>xn(-1)},be("left")),O.next=b("button",{class:"arrow","aria-label":"Son suivant",onclick:()=>xn(1)},be("right")),O.dice=b("button",{class:"arrow dice","aria-label":"Son au hasard pour cette partie (annulable)",onclick:()=>ic(T.ui.part)},be("dice"));let e=b("div",{class:"inst"},O.prev,O.instName,O.next,O.dice);Md(O.instName),O.view=b("div",{class:"view"}),O.nav=b("nav",{class:"nav",role:"tablist"});for(let[t,a,s]of[["pattern","Pattern","pattern"],["tweaks","Tweaks","tweaks"],["mix","Mix","mix"],["song","Song","song"]])O.nav.append(b("button",{role:"tab","data-v":t,onclick:()=>uc(t)},be(s),a));O.toast=b("div",{class:"toast",role:"status"}),O.wake=b("div",{class:"wake"},b("div",{class:"orb"},be("play")),b("h1",{text:Mt.name}),b("p",{text:"Touchez pour activer le son."})),O.wake.addEventListener("click",async()=>{(pt.ctx?await pt.rebuildIfNeeded():await ya())&&(wn(),await lc())}),ba.append(o,O.parts,e,O.view,O.nav),document.body.append(O.toast,O.wake),je=new si(T,{onFirstTouch:()=>{pt.running||ya()}}),Ht=new ai(T,{onSelect:()=>Ja()}),$a=new ei({get:()=>T.project.parts[T.ui.part].range,set:t=>T.setPart(T.ui.part,"range",t),scale:()=>({scale:T.project.scale,steps:T.project.parts[T.ui.part].steps,key:T.project.key}),onStart:()=>{}}),Nt=new oi(T),$s=new ri(T,{host:()=>pt,toast:Rt,loadBanksFor:Gi,ensureAudio:ya,rollDice:ic,previewFluid:cc,fluidStatus:Ed,enableTilt:oc,build:bn}),ce=V0(T,{pad:je,xy:Nt}),ce&&(je.fx=ce,Nt.fx=ce,window.__motifFx=ce,T.settings.glassTilt&&oc(!0)),et=al(T,{pad:je,app:ba,fx:()=>ce}),window.__motifHw=et,et.set(document.documentElement.hasAttribute("data-halloween")),Xs=ec(T,{app:ba,pad:je,timeline:Ht,fx:()=>ce,hw:et,onPlay:yn,ensureAudio:ya,toast:Rt}),window.__motifShow=Xs}function Md(o){let e=null;o.addEventListener("pointerdown",t=>{e={x:t.clientX,y:t.clientY,t:performance.now()}}),o.addEventListener("pointerup",t=>{if(!e)return;let a=t.clientX-e.x,s=t.clientY-e.y;e=null,Math.abs(a)>40&&Math.abs(a)>Math.abs(s)*1.5&&(xn(a<0?1:-1),o.dataset.swiped="1",setTimeout(()=>{delete o.dataset.swiped},50))}),o.addEventListener("click",t=>{o.dataset.swiped&&(t.stopImmediatePropagation(),t.preventDefault())},!0)}function Td(){ya();let o=T.ui;T.send({type:"transport",cmd:o.armed?"disarm":"arm"})}function yn(){ya().then(()=>T.send({type:"transport",cmd:T.ui.playing?"stop":"play"}))}var ac=!1;function oc(o){let e=()=>{ac||(ac=!0,window.addEventListener("deviceorientation",a=>{ce&&T.settings.glassTilt&&a.gamma!==null&&ce.tilt(a.gamma,a.beta)}))},t=window.DeviceOrientationEvent;if(o){t&&e();return}t&&typeof t.requestPermission=="function"?t.requestPermission().then(a=>{a==="granted"?e():(T.setSetting("glassTilt",!1),Rt("Mouvements refus\xE9s : les reflets suivent ton doigt"))}).catch(()=>T.setSetting("glassTilt",!1)):t&&e()}function Ed(){let o=ce?ce.engine():"none";return{"webgpu-hdr":"Actif : WebGPU, \xE9cran HDR \u2014 l\u2019encre et le verre peuvent d\xE9passer le blanc.",webgpu:"Actif : WebGPU (\xE9cran standard : pas de HDR ici).",webgl:"Actif : WebGL (compatibilit\xE9, sans HDR).",none:"Effets fluides indisponibles sur cet appareil."}[o]}function cc(){if(ce){if(!T.settings.fluid&&!T.settings.glass){Rt("Active le fluide ou le verre pour voir l\u2019aper\xE7u");return}T.ui.view!=="pattern"&&uc("pattern"),setTimeout(()=>{ce.place(),setTimeout(()=>ce.preview(),120)},320)}}function Ad(){let o=!T.settings.metro;T.setSetting("metro",o),Qa(),Rt(o?T.settings.metroAlways?"M\xE9tronome activ\xE9":"M\xE9tronome activ\xE9 pendant l\u2019enregistrement":"M\xE9tronome coup\xE9",o?{label:"R\xE9glages",fn:()=>$s.settings()}:null)}async function ic(o){let e=T.planRandom(o);for(let a of c0(e))await Gi(Ve(a));T.applyRandom(e);let t=[];e.kit&&t.push(o==="drum"?e.kit.map(a=>Ve(a).name).join(" \xB7 "):"kit "+Ve(e.kit[0]).name+"\u2026");for(let a of["bass","lead"])e[a]&&t.push(Ve(e[a].preset).name+(e[a].oct?` (${e[a].oct>0?"+":""}${e[a].oct} oct.)`:""));O.instName.classList.remove("flash"),O.instName.offsetWidth,O.instName.classList.add("flash"),Rt(t.join(" \xB7 "),{label:"Annuler",fn:()=>{T.undo()&&Rt("Sons d\u2019avant r\xE9tablis")}})}function hc(o){if(T.ui.part===o){$s.browser();return}je.releaseAll(),T.ui.part=o,T.ui.group=0,Ht.clear(),ba.dataset.part=o,ji()}function uc(o){je.releaseAll(),Nt.releaseAll(),T.ui.view=o,pc()}function dc(){let o=T.ui;return o.part==="drum"?ca[o.lane]:o.part}function fc(){let o=T.project,e=T.ui;return e.part==="drum"?o.parts.drum.kit[e.lane]:o.parts[e.part].preset}async function xn(o){let e=dc(),t=ss(e),a=t.findIndex(i=>i.id===fc()),s=t[(a+o+t.length)%t.length];await _r(s.id)}async function _r(o){let e=Ve(o);if(!e)return;await Gi(e);let t=T.ui;T.setPreset(t.part,t.lane,o),O.instName.classList.remove("flash"),O.instName.offsetWidth,O.instName.classList.add("flash")}function Qa(){let o=T.project,e=T.ui;O.tempo.querySelector("b").textContent=o.tempo,O.tempo.setAttribute("aria-valuenow",o.tempo),O.tempo.classList.toggle("metro",!!T.settings.metro),O.tempo.classList.toggle("live",!!T.settings.metro&&e.playing&&(e.armed||T.settings.metroAlways)),O.key.querySelector("b").textContent=Es[o.key],O.key.querySelector("small").textContent=As(o.scale).name.slice(0,9),O.rec.setAttribute("aria-pressed",String(e.armed)),O.rec.classList.toggle("waiting",e.armed&&!e.playing),O.play.setAttribute("aria-pressed",String(e.playing)),O.play.replaceChildren(be(e.playing?"stop":"play")),O.play.setAttribute("aria-label",e.playing?"Arr\xEAter":"Lecture"),O.progress.classList.toggle("rec",e.armed),O.progressBars.childElementCount!==o.bars&&O.progressBars.replaceChildren(...Array.from({length:o.bars},()=>b("i"))),e.playing||(O.progressFill.style.width="0",O.pos.textContent=e.armed?"REC pr\xEAt":`${o.bars} mes.`)}function qo(){let o=T.project;for(let e of O.parts.children){let t=e.dataset.p;e.setAttribute("aria-selected",String(t===T.ui.part));let a=t==="drum"?o.parts.drum.mute.every(Boolean):o.parts[t].mute;e.classList.toggle("muted",a)}}function Ui(){let o=T.ui,e=dc(),t=ss(e),a=fc(),s=Ve(a),i=t.findIndex(n=>n.id===a),r=s&&s.style?ts(s.style):null;O.instName.querySelector("small").textContent=`${kd[e]} \xB7 ${i+1}/${t.length}${r?" \xB7 "+r.short:""}`,O.instName.querySelector("b").textContent=s?s.name:"\u2014",O.instName.setAttribute("aria-label",`Son ${s?s.name:""}, ${i+1} sur ${t.length}. Toucher pour parcourir.`)}function ji(){Qa(),qo(),Ui(),pc()}var xa=null;function pc(){let o=T.ui.view;for(let e of O.nav.children)e.setAttribute("aria-selected",String(e.dataset.v===o));xa&&(xa(),xa=null),O.view.replaceChildren(),o==="pattern"?Ld():o==="tweaks"?_d():o==="mix"?Dd():Cd(),ce&&requestAnimationFrame(()=>ce.place())}function Ld(){let o=T.ui,e=T.project,t=b("div",{class:"controls"});if(o.part==="drum")for(let a=0;a<4;a++){let s=new Wt({label:["Kick","Snare","Hat","Perc"][a],min:()=>0,max:()=>Ys[a].length-1,get:()=>T.project.parts.drum.rhythm[a],set:i=>{T.setPart("drum","rhythm",i,a)},format:i=>({v:i===0?"1\xD7":String(i).padStart(2,"0"),s:Ys[a][i].name}),ring:(i,r,n,l)=>Sr(i,r,n,Ys[a][l],null,-1,Ni(),Hi()),onTap:()=>{o.lane=a,Ui(),Xa.forEach((i,r)=>i.el.classList.toggle("active",r===a))},onStart:()=>{o.lane=a,Ui()}});s.el.classList.toggle("active",a===o.lane),t.append(s.el),Xa.push(s)}else{let a=o.part,s=!1,i=new Wt({label:"Rythme",min:()=>0,max:()=>s?hr(hs[e.parts[a].rhythm]):hs.length-1,get:()=>s?T.project.parts[a].ties:T.project.parts[a].rhythm,set:l=>{if(s)T.setPart(a,"ties",l);else{T.setPart(a,"rhythm",l);let u=hr(hs[l]);T.project.parts[a].ties>u&&T.setPart(a,"ties",u)}},format:l=>{let u=T.project.parts[a],c=hs[u.rhythm];return s?{v:l===0?"OFF":String(l),s:c.len===0?"gliss\xE9":"liaisons",l:"Liaisons",ties:!0}:{v:l===0?"\u221E":String(l).padStart(2,"0"),s:c.name+(u.ties?` \xB7 ${u.ties} liaison${u.ties>1?"s":""}`:""),l:"Rythme"}},ring:(l,u,c)=>{let h=T.project.parts[a],d=hs[h.rhythm];Sr(l,u,c,d,Yn(d,h.ties),-1,Ni(),Hi())},onTap:()=>{s=!s,i.render()},onSwipeX:l=>{s=l>0,i.render()},step:16}),r=new Wt({label:"Degr\xE9s",min:()=>0,max:()=>cs.length-1,get:()=>cs.indexOf(T.project.parts[a].steps),set:l=>{T.setPart(a,"steps",cs[l]),$a.render(),je.draw()},format:l=>({v:cs[l]===12?"12":String(cs[l]),s:cs[l]===12?"chromatique":cs[l]===5?"pentatonique":cs[l]===7?"gamme enti\xE8re":"par octave"}),ring:(l,u,c,h)=>{let d=cs[h],m=u/2,v=c/2-2,g=Math.min(u,c)/2-8;l.lineWidth=4,l.lineCap="round";for(let f=0;f<d;f++){let p=-Math.PI/2+f/d*Math.PI*2+.06,y=-Math.PI/2+(f+1)/d*Math.PI*2-.06;l.strokeStyle=f===0?Ni():Hi(2),l.beginPath(),l.arc(m,v,g,p,y),l.stroke()}},step:18}),n=new Wt({label:"Doigts",min:()=>0,max:()=>ga.length-1,get:()=>ga.findIndex(l=>l[0]===T.project.parts[a].arp),set:l=>T.setPart(a,"arp",ga[l][0]),format:l=>({v:["1\u21922","\u2197","\u2198","\u2261"][l],s:ga[l][1]}),onTap:()=>{let l=(ga.findIndex(u=>u[0]===T.project.parts[a].arp)+1)%ga.length;T.setPart(a,"arp",ga[l][0]),n.render()},step:22});n.el.classList.add("small"),t.append(i.el,r.el,n.el),Xa.push(i,r,n)}O.view.append(t),o.part!=="drum"&&O.view.append($a.el),O.view.append(je.el),O.undo=b("button",{class:"tbtn small","aria-label":"Annuler",onclick:()=>{T.undo()&&Rt("Annul\xE9")}},be("undo")),O.redo=b("button",{class:"tbtn small","aria-label":"R\xE9tablir",onclick:()=>{T.redo()&&Rt("R\xE9tabli")}},be("redo")),O.erase=b("button",{class:"tbtn small","aria-label":"Gomme","aria-pressed":String(o.erase),onclick:()=>{T.setErase(!T.ui.erase)}},be("erase")),O.clear=b("button",{class:"tbtn small","aria-label":"Effacer",onclick:Pd},be("trash")),O.view.append(b("div",{class:"timeline"},O.undo,Ht.el,O.erase,O.clear)),requestAnimationFrame(()=>{Xa.forEach(a=>a.render()),o.part!=="drum"&&$a.render(),je.setHint(),je.showHint(!Rd()),je.draw(),Ht.draw(),Ja()}),xa=()=>{Xa.length=0,je.releaseAll()}}var Xa=[];function Rd(){let o=T.pattern,e=T.ui.part;return e==="drum"?o.drum.some(t=>t.hits.length):o[e].notes.length>0}function Ja(){O.erase&&(O.erase.classList.toggle("on",T.ui.erase),O.erase.setAttribute("aria-pressed",String(T.ui.erase)),O.undo.disabled=!T.undoStack.length,O.clear.classList.toggle("on",!!Ht.sel),O.clear.setAttribute("aria-label",Ht.sel?"Effacer la s\xE9lection":"Effacer\u2026"))}function Pd(){let o=T.ui;if(Ht.sel){let e=Ht.sel;T.eraseSpan(o.part,o.part==="drum"?null:void 0,e.t0,e.t1),Ht.clear(),Ja(),Rt("Portion effac\xE9e",{label:"Annuler",fn:()=>T.undo()});return}$s.clearMenu()}function _d(){O.view.append(Nt.groupsEl,Nt.el,Nt.barEl),requestAnimationFrame(()=>Nt.render()),xa=()=>Nt.releaseAll()}function Dd(){let o=T.project,e=b("div",{class:"mix"}),t=b("div",{class:"faders"}),a=[["drum",0,"Kick","--drum"],["drum",1,"Snare","--drum"],["drum",2,"Hat","--drum"],["drum",3,"Perc","--drum"],["bass",null,"Basse","--bass"],["lead",null,"M\xE9lodie","--lead"]],s=[],i=new Map,r=new Map,n=(g,f)=>{let p=i.get(g);p&&(T.setMute(p.part,p.lane,f),p.upd())};t.addEventListener("pointermove",g=>{let f=r.get(g.pointerId);if(!f)return;let p=document.elementFromPoint(g.clientX,g.clientY),y=p&&p.closest(".m");y&&i.has(y)&&!f.done.has(y)&&(f.done.add(y),n(y,f.v),qo())});let l=g=>r.delete(g.pointerId);t.addEventListener("pointerup",l),t.addEventListener("pointercancel",l);for(let[g,f,p,y]of a){let x=()=>g==="drum"?T.project.parts.drum.level[f]:T.project.parts[g].level,S=()=>g==="drum"?T.project.parts.drum.mute[f]:T.project.parts[g].mute,E=b("div",{class:"fill"}),L=b("div",{class:"meter"}),D=b("div",{class:"db"}),q=b("button",{class:"m","aria-pressed":String(S()),"aria-label":"Couper "+p,text:"M"}),A=b("div",{class:"fader",style:{"--fc":`var(${y})`},role:"slider","aria-label":"Volume "+p,tabindex:"0"},E,L,b("div",{class:"t",text:p}),D,q),U=j=>Math.pow((j+40)/46,1.6),_=()=>{let j=x();E.style.height=U(j)*100+"%",D.textContent=(j>0?"+":"")+j.toFixed(1)+" dB",A.classList.toggle("muted",S()),q.setAttribute("aria-pressed",String(S()))},I=null;A.addEventListener("pointerdown",j=>{if(j.target!==q){j.preventDefault();try{A.setPointerCapture(j.pointerId)}catch{}I={y:j.clientY,v:x(),t:performance.now()}}}),A.addEventListener("pointermove",j=>{if(!I)return;let se=A.getBoundingClientRect().height,Y=U(I.v)+(I.y-j.clientY)/se,J=Math.max(-40,Math.min(6,Math.pow(Math.max(0,Math.min(1,Y)),1/1.6)*46-40));T.setLevel(g,f,Math.round(J*2)/2),_()}),A.addEventListener("pointerup",j=>{I&&Math.abs(j.clientY-I.y)<4&&performance.now()-I.t<250&&j.detail===2&&(T.setLevel(g,f,0),_()),I=null}),A.addEventListener("dblclick",()=>{T.setLevel(g,f,0),_()}),i.set(q,{part:g,lane:f,upd:()=>_()}),q.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation();let se=!S();n(q,se),qo(),r.set(j.pointerId,{v:se,done:new Set([q])});try{q.releasePointerCapture(j.pointerId)}catch{}}),q.addEventListener("click",j=>{j.detail===0&&(n(q,!S()),qo())}),_(),s.push({part:g,lane:f,meter:L,el:A}),t.append(A)}let u=(g,f,p,y=.02)=>new Wt({label:g,min:()=>0,max:()=>50,get:()=>Math.round(T.project.mix[f]/y),set:S=>{T.setMix(f,S*y)},format:S=>({v:p(S*y),s:""}),ring:(S,E,L,D)=>{let q=E/2,A=L/2-2,U=Math.min(E,L)/2-8;S.lineWidth=4,S.lineCap="round",S.strokeStyle=Hi(2),S.beginPath(),S.arc(q,A,U,Math.PI*.75,Math.PI*2.25),S.stroke(),S.strokeStyle=Ni(),S.beginPath(),S.arc(q,A,U,Math.PI*.75,Math.PI*.75+D/50*Math.PI*1.5),S.stroke()},step:5}),c=[u("Pump","pump",g=>Math.round(g*100)+""),u("Espace","space",g=>Math.round(g*100)+""),u("Batterie","drumDrive",g=>Math.round(g*100)+"")],h=new Wt({label:"Master",min:()=>0,max:()=>36,get:()=>Math.round((T.project.mix.master+18)*1),set:g=>T.setMix("master",g-18),format:g=>({v:(g-18>0?"+":"")+(g-18)+" dB",s:""}),step:6}),d=b("div",{class:"mixknobs"},...c.map(g=>g.el),h.el);e.append(t,d),O.view.append(e),requestAnimationFrame(()=>{c.forEach(g=>g.render()),h.render()});let m=T.on("pos",g=>{if(g.m){for(let f of s){let p=f.part==="drum"?g.m.d[f.lane]:g.m[f.part],y=20*Math.log10(Math.max(p,1e-5));f.meter.style.height=Math.max(0,Math.min(100,(y+48)/48*100))+"%"}ce&&ce.mixLevels(g.m)}}),v=null;if(ce){ce.setMix({el:t,faders:s.map(({part:p,lane:y,el:x})=>({part:p,lane:y,el:x}))});let g=p=>y=>{let x=t.getBoundingClientRect();ce.press(y.pointerId,(y.clientX-x.left)/x.width,(y.clientY-x.top)/x.height,p)},f=[["pointerdown",g("down")],["pointermove",g("move")],["pointerup",g("up")],["pointercancel",g("cancel")]];for(let[p,y]of f)t.addEventListener(p,y);v=()=>{for(let[p,y]of f)t.removeEventListener(p,y)}}xa=()=>{m(),v&&v(),ce&&ce.setMix(null)}}function Cd(){let o=$s.songView();O.view.append(o.el),xa=o.cleanup}function Ni(){return getComputedStyle(ba).getPropertyValue("--accent").trim()}function Hi(o=1){return document.documentElement.dataset.theme==="dark"?`rgba(255,255,255,${.08*o})`:`rgba(0,0,0,${.08*o})`}var qd=null,rc=-1;function Od(o){qd=o;let e=T.project,t=T.ui;if(o.playing&&o.tick>=0){let a=384*e.bars;O.progressFill.style.width=((o.tick+1)/a*100).toFixed(2)+"%";let s=Math.floor(o.tick/384)+1,i=Math.floor(o.tick%384/96)+1;O.pos.textContent=`${s}.${i}`;let r=Math.floor(o.tick/96);r!==rc&&(rc=r,O.tempo.classList.contains("live")&&(O.tempo.classList.remove("beat","down"),O.tempo.offsetWidth,O.tempo.classList.add("beat"),o.tick%384<96&&O.tempo.classList.add("down")))}if(o.m)for(let a of O.parts.children){let s=a.dataset.p==="drum"?o.m.drum:o.m[a.dataset.p];a.querySelector(".lvl").style.transform=`scaleX(${Math.min(1,Math.sqrt(s||0)*1.1).toFixed(3)})`}if(t.view==="pattern"){let a=e.song.enabled&&e.song.sections.length;je.setClock({tick:o.tick,at:performance.now(),playing:o.playing,msPerTick:6e4/(e.tempo*96),L:384*e.bars,pat:a?e.song.sections[o.sec%e.song.sections.length].p:e.current}),je.onTrig(o.trig,o.m),Ht.setTick(o.playing?o.tick:-1)}t.view==="tweaks"&&Nt.onPos(o),ce&&ce.level(o),et&&et.level(o)}function Bd(o){switch(o){case"transport":Qa(),T.ui.view==="pattern"&&(je.setHint(),Ht.draw()),et&&T.ui.armed&&!tc&&et.gasp(),tc=T.ui.armed;break;case"tempo":case"key":case"scale":case"bars":Qa(),T.ui.view==="pattern"&&($a.render(),je.draw(),Ht.draw());break;case"preset":Ui(),T.ui.view==="tweaks"&&Nt.render(),T.ui.view==="pattern"&&(je.setHint(),je.draw());break;case"notes":T.ui.view==="pattern"&&(Ht.draw(),je.showHint(!1),Ja());break;case"undo":Ja();break;case"erase":Ja(),je.setHint(),je.showHint(!0),je.draw(),T.ui.erase&&Rt(T.ui.playing?"Gomme : touche le pad pour effacer pendant la lecture":"Gomme activ\xE9e \u2014 lance la lecture puis touche le pad");break;case"project":case"pattern":ji();break;case"auto":case"macro":T.ui.view==="tweaks"&&Nt.render();break;case"mix":qo(),ce&&ce.syncScene();break;case"settings:metro":case"settings:metroAlways":Qa();break;case"settings:piano":case"settings:ghosts":T.ui.view==="pattern"&&(je.setHint(),je.draw());break;case"settings:glass":document.documentElement.toggleAttribute("data-glass",!!T.settings.glass),ce&&ce.place();break;case"settings:fluid":case"settings:fluidZone":case"settings:fluidStyle":case"settings:fluidColors":case"settings:fluidInk":case"settings:fluidHdr":case"settings:glassSpill":case"settings:glassLight":case"settings:mixGlass":case"settings:ctrlHeight":case"settings:lightLook":case"settings:hdrLight":case"settings:glassLook":ce&&ce.place();break;case"settings:fluidEngine":T.save().finally(()=>location.reload());break;case"settings:hwCast":case"settings:hwRelay":et&&et.refresh();break;case"settings:glassTilt":ce&&!T.settings.glassTilt&&ce.tilt(null);break;default:o&&o.includes(":range")&&je.draw(),o&&o.endsWith(":steps")&&($a.render(),je.draw()),o&&(o.endsWith(":rhythm")||o.endsWith(":ties"))&&Xa.forEach(e=>e.render())}}function Id(){let o=()=>{je&&je.releaseAll(),Nt&&Nt.releaseAll(),T.ui.playing&&T.send({type:"transport",cmd:"stop"}),T.ui.armed&&T.send({type:"transport",cmd:"disarm"}),T.save(),pt.suspend()};document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="hidden")o();else if(pt.ctx){try{await pt.ctx.resume()}catch{}await pt.probe(400)||nc("Son en pause","Touchez pour r\xE9activer le son.")}}),window.addEventListener("pagehide",()=>T.save()),window.addEventListener("beforeunload",()=>T.save());let e=()=>document.documentElement.style.setProperty("--app-h",window.innerHeight+"px");CSS.supports("height","100dvh")||(e(),window.addEventListener("resize",e)),document.addEventListener("gesturestart",t=>t.preventDefault()),document.addEventListener("dblclick",t=>{t.target.closest("input,textarea")||t.preventDefault()},{passive:!1}),document.addEventListener("touchmove",t=>{t.target.closest(".scroll, .sheet .body, .filters")||t.preventDefault()},{passive:!1})}async function Fd(){await T.init(),pt=new Zo({workletUrl:"worklet.js?v="+bn,onMessage:t=>T.onEngine(t),onState:t=>{(t==="interrupted"||t==="suspended")&&document.visibilityState==="visible"&&T.ui.playing&&nc("Son interrompu","Touchez pour reprendre."),t==="running"&&wn()}}),pt.replay=()=>T.engineState(),pt.rebuildIfNeeded=async()=>{try{await pt.ctx.resume()}catch{}return await pt.probe(250)?!0:(Rt("Red\xE9marrage du son\u2026"),pt.rebuild())},T.engine=pt,Sd(),T.on("change",Bd),T.on("pos",Od),T.on("error",t=>Rt(t)),Id(),window.addEventListener("motif:theme",()=>{et&&(et.set(document.documentElement.hasAttribute("data-halloween")),et.refresh()),ji()}),ji();let o=lc().catch(t=>{window.__motifBankError=String(t&&t.message||t)});(/[?&]diag\b/.test(location.search)||location.hostname==="localhost"&&matchMedia("(display-mode: standalone)").matches)&&zd(o),D0({toast:Rt,store:T,build:bn}),/[?&]fxtest\b/.test(location.search)&&location.hostname==="localhost"&&setTimeout(async()=>{document.querySelectorAll(".wake").forEach(c=>c.remove()),T.settings.glass||T.setSetting("glass",!0);let t=new URLSearchParams(location.search),a=t.get("part"),s=t.get("look"),i=T.settings.glassLook;t.get("theme")==="halloween"&&(document.documentElement.setAttribute("data-halloween",""),document.documentElement.dataset.theme="dark",window.dispatchEvent(new Event("motif:theme")));let r=(t.get("cast")||"").split(",").map(Number);et&&r.length===4&&r.every(c=>c>=0&&c<=6)&&(T.settings.hwCast=r,et.refresh()),t.has("dance")&&et&&setTimeout(()=>et.dance(t.get("dance")||"passinho",3),1500),t.has("show")&&Xs&&(setTimeout(()=>{T.ui.playing||yn(),Xs.open("test")},1500),setTimeout(()=>{let c=Xs.measure(20);fetch("/__log",{method:"POST",body:JSON.stringify({kind:"showtest",ua:navigator.userAgent,engine:ce?ce.engine():"none",stats:Xs.stats,errors:Xs.errors.map(h=>String(h).slice(0,300)),gpu:c,dpr:Xs.stats.dpr,fluidEma:ce&&ce.fluid&&ce.fluid.ema,hwScale:et&&et.scale,view:[innerWidth,innerHeight]})}).catch(()=>{})},11e3)),["drum","bass","lead"].includes(a)&&T.ui.part!==a&&(hc(a),await new Promise(c=>setTimeout(c,400))),s&&(T.settings.glassLook=s,ce&&ce.place(),await new Promise(c=>setTimeout(c,300))),ce&&ce.fluid&&t.has("m")&&(ce.fluid.marginTest=+t.get("m"),ce.place()),t.has("ns")&&T.settings.glassSpill&&T.setSetting("glassSpill",!1),!t.has("ns")&&!T.settings.glassSpill&&T.setSetting("glassSpill",!0);let n=ce&&ce.fluid,l=async c=>{if(!(!t.has("snap")||!n))try{n.render(!0);let h=document.createElement("canvas");h.width=Math.round(n.canvas.width/2),h.height=Math.round(n.canvas.height/2),h.getContext("2d").drawImage(n.canvas,0,0,h.width,h.height),await fetch("/__log",{method:"POST",body:JSON.stringify({kind:"snap",name:c,out:[h.toDataURL("image/png")]})})}catch{}};for(let c=0;c<5;c++)cc(),await new Promise(h=>setTimeout(h,c===1?900:1500)),c===1&&(await l("preview"),await new Promise(h=>setTimeout(h,600)));if(t.has("snap")&&(await new Promise(c=>setTimeout(c,6500)),await l("rest")),t.has("snap")&&t.has("edges")&&n&&n.splat){let c=n.cfg.DENSITY_DISSIPATION;n.cfg.DENSITY_DISSIPATION=0,n.clear();let h=(d,m,v,g,f,p)=>n.splat(d,m,v,g,{r:f[0]*.3,g:f[1]*.3,b:f[2]*.3},p);for(let d=0;d<12;d++)h(.9,.05+d*.08,(d%2?1:-1)*.01,.006,[.45,.05,1],.7);h(.12,.06,.02,.01,[1,.05,.6],.8),h(.14,.35,0,.01,[1,.05,.6],.5),h(.5,.97,.03,-.01,[1,.1,.7],.6),n.applyInputs(),n.render(!1),await new Promise(d=>setTimeout(d,300)),await l("edges"),n.cfg.DENSITY_DISSIPATION=c}s&&(T.settings.glassLook=i,ce&&ce.place());let u=null;try{n.render(!0);let c=document.createElement("canvas");c.width=n.canvas.width,c.height=n.canvas.height;let h=c.getContext("2d");h.drawImage(n.canvas,0,0);let d=n.off?n.off[0]:0,m=n.off?n.off[1]:0,v=n.hostW||c.width,g=n.hostH||c.height,f=(p,y)=>Array.from(h.getImageData(Math.round(d+p*v),Math.round(m+y*g),1,1).data);u={centre:f(.5,.5),rimLeft:f(.004,.5),bevelLeft:f(.03,.5),cornerOutside:f(.001,.001),top:f(.5,.004),below:f(.5,1.02)}}catch(c){u=String(c)}fetch("/__log",{method:"POST",body:JSON.stringify({kind:"fxtest",ua:navigator.userAgent,engine:ce?ce.engine():"none",ok:!!(n&&n.ok),glass:T.settings.glass,sceneGlass:!!(n&&n.scene&&n.scene.glass),shaderErrors:n&&n.shaderErrors?n.shaderErrors.map(c=>String(c).slice(0,300)):null,link:n&&n.gl?n.gl.getProgramParameter(n.p.display.p,n.gl.LINK_STATUS):null,format:n&&n.format,extended:n&&n.extended,hdrScreen:n&&n.hdrScreen,gpuCanvas:!!document.querySelector("canvas.fluid"),slow:n&&n.ema,spill:ce&&ce.spillStats,px:u,hw:et&&et.on?{ok:et.ok,errors:et.errors,ema:et.ema,scale:et.scale}:null})}).catch(()=>{})},2500);let e=()=>{ya()};window.addEventListener("pointerdown",e,{once:!0,capture:!0})}async function zd(o){let e=performance.now();await o;let t=getComputedStyle(document.documentElement),a=document.createElement("div");a.style.cssText="position:fixed;top:0;left:0;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;visibility:hidden",document.body.append(a);let s=getComputedStyle(a),i=document.getElementById("app").getBoundingClientRect(),r=document.querySelector(".nav").getBoundingClientRect(),n=document.querySelector(".pad")&&document.querySelector(".pad").getBoundingClientRect(),l={kind:"diag",ua:navigator.userAgent,standalone:matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,inner:[innerWidth,innerHeight],vv:window.visualViewport?[visualViewport.width,visualViewport.height]:null,dpr:devicePixelRatio,safe:[s.paddingTop,s.paddingBottom],app:[i.top,i.height],navBottom:r.bottom,padH:n?n.height:null,screen:[screen.width,screen.height],docH:document.documentElement.clientHeight,dvh:(()=>{let m=document.createElement("div");m.style.cssText="position:fixed;height:100dvh;width:1px;top:0",document.body.append(m);let v=m.getBoundingClientRect().height;return m.remove(),v})(),vh:(()=>{let m=document.createElement("div");m.style.cssText="position:fixed;height:100vh;width:1px;top:0",document.body.append(m);let v=m.getBoundingClientRect().height;return m.remove(),v})(),fixedInset:(()=>{let m=document.createElement("div");m.style.cssText="position:fixed;inset:0;",document.body.append(m);let v=m.getBoundingClientRect();return m.remove(),[v.top,v.height]})(),samples:T.engine.samples.size,banks:[...T.engine.loadedBanks],bankError:window.__motifBankError||null,ms:Math.round(performance.now()-e),audioSession:"audioSession"in navigator,worklet:typeof AudioWorkletNode<"u",share:!!navigator.canShare,dvhSupported:CSS.supports("height","100dvh")};a.remove(),fetch("/__log",{method:"POST",body:JSON.stringify(l)}).catch(()=>{});let u=0,c=null;T.on("pos",m=>{c=m,m.trig&&(u+=m.trig.length/4)});let h=Date.now(),d=setInterval(()=>{let m=T.engine.ctx,v={kind:"state",t:Math.round((Date.now()-h)/1e3),ctx:m?m.state:"none",sr:m?m.sampleRate:0,base:m?m.baseLatency:0,out:m&&m.outputLatency,time:m?+m.currentTime.toFixed(2):0,playing:T.ui.playing,armed:T.ui.armed,trig:u,view:T.ui.view,part:T.ui.part,preset:T.presetFor(T.ui.part==="drum"?"d0":T.ui.part).id,notes:T.pattern.lead.notes.length+T.pattern.bass.notes.length+T.pattern.drum.reduce((g,f)=>g+f.hits.length,0),standalone:matchMedia("(display-mode: standalone)").matches,h:innerHeight,master:c&&c.m?+c.m.master.toFixed(3):0};fetch("/__log",{method:"POST",body:JSON.stringify(v)}).catch(()=>{}),Date.now()-h>12e4&&clearInterval(d)},2e3)}Fd().catch(o=>{console.error(o),document.getElementById("app").textContent="Erreur au d\xE9marrage : "+o.message});export{_r as choosePreset,Rt as toast};
