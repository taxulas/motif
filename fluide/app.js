var Va="fluide",He=Va==="fluide"?{id:"fluide",storage:"motif3-fluide",name:"MOTIF Fluide",fluid:!0}:{id:"main",storage:"motif3",name:"MOTIF",fluid:!1};var Ka=He.storage,Ya=1,os=null;function Xa(){return os||(os=new Promise((r,e)=>{let t=indexedDB.open(Ka,Ya);t.onupgradeneeded=()=>{let s=t.result;s.objectStoreNames.contains("projects")||s.createObjectStore("projects",{keyPath:"id"}),s.objectStoreNames.contains("renders")||s.createObjectStore("renders",{keyPath:"id"}),s.objectStoreNames.contains("files")||s.createObjectStore("files",{keyPath:"id"}),s.objectStoreNames.contains("kv")||s.createObjectStore("kv")},t.onsuccess=()=>{let s=t.result;s.onversionchange=()=>s.close(),r(s)},t.onerror=()=>e(t.error),t.onblocked=()=>e(new Error("Base locale bloqu\xE9e par un autre onglet"))}),os)}function Vt(r,e,t){return Xa().then(s=>new Promise((i,a)=>{let o=s.transaction(r,e),n=o.objectStore(r),l;Promise.resolve(t(n)).then(c=>{l=c}),o.oncomplete=()=>i(l),o.onerror=()=>a(o.error),o.onabort=()=>a(o.error||new Error("transaction annul\xE9e"))}))}var Kt=r=>new Promise((e,t)=>{r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)}),Ce={put:(r,e,t)=>Vt(r,"readwrite",s=>Kt(t===void 0?s.put(e):s.put(e,t))),get:(r,e)=>Vt(r,"readonly",t=>Kt(t.get(e))),del:(r,e)=>Vt(r,"readwrite",t=>Kt(t.delete(e))),all:r=>Vt(r,"readonly",e=>Kt(e.getAll())),keys:r=>Vt(r,"readonly",e=>Kt(e.getAllKeys()))};async function vi(){try{if(navigator.storage&&navigator.storage.persist)return await navigator.storage.persisted()?!0:await navigator.storage.persist()}catch{}return!1}async function gi(){try{if(navigator.storage&&navigator.storage.estimate)return await navigator.storage.estimate()}catch{}return null}var nt=["Do","R\xE9\u266D","R\xE9","Mi\u266D","Mi","Fa","Fa\u266F","Sol","La\u266D","La","Si\u266D","Si"];var rs=[{id:"major",name:"Majeur",iv:[0,2,4,5,7,9,11],minor:!1},{id:"minor",name:"Mineur",iv:[0,2,3,5,7,8,10],minor:!0},{id:"dorian",name:"Dorien",iv:[0,2,3,5,7,9,10],minor:!0},{id:"phrygian",name:"Phrygien",iv:[0,1,3,5,7,8,10],minor:!0},{id:"harmonic",name:"Mineur harmonique",iv:[0,2,3,5,7,8,11],minor:!0},{id:"phrygdom",name:"Phrygien dominant",iv:[0,1,4,5,7,8,10],minor:!1},{id:"mixolydian",name:"Mixolydien",iv:[0,2,4,5,7,9,10],minor:!1},{id:"lydian",name:"Lydien",iv:[0,2,4,6,7,9,11],minor:!1},{id:"melodic",name:"Mineur m\xE9lodique",iv:[0,2,3,5,7,9,11],minor:!0},{id:"hungarian",name:"Hongrois",iv:[0,2,3,6,7,8,11],minor:!0}];function lt(r){return rs.find(e=>e.id===r)||rs[0]}var $a=[0,4,2,5,1,6,3],Ja=[0,4,2,6,3,1,5],tt=[1,2,3,4,5,6,7,12];function _s(r,e){let t=lt(r);if(e>=12){let a=[];for(let o=0;o<12;o++){let n=0;for(let l=0;l<7;l++)t.iv[l]<=o&&(n=l);a.push({deg:n,acc:o-t.iv[n],semi:o})}return a}return(t.minor?Ja:$a).slice(0,Math.max(1,Math.min(7,e))).sort((a,o)=>a-o).map(a=>({deg:a,acc:0,semi:t.iv[a]}))}function bi(r,e,t,s,i=48){let a=lt(s),o=Math.floor(r/7),n=r-o*7;return i+t+o*12+a.iv[n]+(e||0)}function vt(r,e,t){let s=lt(t),i=Math.floor(r/7);return i*12+s.iv[r-i*7]+(e||0)}function rt(r,e,t){let s=_s(e,t),i=s.length,a=Math.floor(r.lo/12)-1,o=0,n=(c,d)=>c*12+s[d].semi;for(;n(a,o)<r.lo;)o++,o>=i&&(o=0,a++);let l=[];for(let c=0;c<r.n;c++){let d=s[o];l.push({deg:a*7+d.deg,acc:d.acc,semi:a*12+d.semi,octave:a,isRoot:d.semi===0&&d.acc===0}),o++,o>=i&&(o=0,a++)}return l}function Qa(r,e){let t=lt(e),s=Math.floor(r/12),i=r-s*12,a=0;for(let o=0;o<7;o++)t.iv[o]<=i&&(a=o);return{deg:s*7+a,acc:i-t.iv[a]}}var Za=new Set([1,3,6,8,10]),ft=.6,At=.62;function yi(r,e,t,s){let i=rt(r,e,t),a=h=>Za.has(((s+h)%12+12)%12),o=i[0].semi,n=i[i.length-1].semi;for(;n-o<11;)n++,n-o<11&&o--;a(o)&&o--,a(n)&&n++;let l=new Set(rt({lo:o-12,n:96},e,t).map(h=>h.semi)),c=[],d=0;for(let h=o;h<=n;h++){let v=a(h),{deg:f,acc:m}=Qa(h,e);c.push({semi:h,black:v,pos:d,deg:f,acc:m,inScale:l.has(h),isRoot:(h%12+12)%12===0}),v||d++}return{keys:c,whites:d}}function xi(r,e,t){let{keys:s,whites:i}=r;if(t<ft){for(let o of s)if(o.black&&Math.abs(e-o.pos/i)<At/i/2)return o}let a=Math.min(i-1,Math.max(0,Math.floor(e*i)));return s.find(o=>!o.black&&o.pos===a)}function eo(r,e,t){let s=_s(e,t),i=Math.floor(r/12),a=null;for(let o=i-1;o<=i;o++)for(let n of s){let l=o*12+n.semi;l<=r&&(a===null||l>a)&&(a=l)}return a===null?r:a}function ki(r,e,t,s){let i=rt(r,e,t),a=i.length?i[i.length-1].semi:r.lo,o=eo(r.lo,e,s),n=0,l=rt({lo:o,n:64},e,s);for(let c of l)if(c.semi<=a+.5)n++;else break;return{lo:o,n:Math.max(1,Math.min(36,n))}}var Os=24;function N(r,e,t=16){let s=e.map(([i,a,o])=>[Math.round(i*Os),Math.max(3,Math.round(a*Os)),o?1:0]);return s.sort((i,a)=>i[0]-a[0]),{name:r,len:t*Os,ev:s}}function Ke(r,e,t,s,i,a=0,o=16){let n=[];for(let l=0;l<s;l++)n.push([e+l*t,i,a&&l%a===0]);return N(r,n,o)}function dt(r,e,t=384){return{name:r,len:t,ev:e.map(([s,i,a])=>[s,i,a?1:0])}}var pt=[{name:"Libre",len:0,ev:[]},N("Ronde",[[0,15.5,1]]),N("Blanches",[[0,7.5,1],[8,7.5,0]]),N("Noires",[[0,3.2,1],[4,3.2,0],[8,3.2,0],[12,3.2,0]]),Ke("Croches",0,2,8,1.5,4),Ke("Doubles",0,1,16,.8,4),N("Point\xE9es",[[0,2.6,1],[3,2.6,0],[6,2.6,0],[9,2.6,0],[12,1.6,1],[14,1.6,0]]),N("Tresillo",[[0,2.6,1],[3,2.6,0],[6,1.6,0],[8,2.6,1],[11,2.6,0],[14,1.6,0]]),N("Contretemps",[[2,1.5,1],[6,1.5,0],[10,1.5,1],[14,1.5,0]]),N("Galop",[[0,1.6,1],[2,.8,0],[3,.8,0],[4,1.6,1],[6,.8,0],[7,.8,0],[8,1.6,1],[10,.8,0],[11,.8,0],[12,1.6,1],[14,.8,0],[15,.8,0]]),N("Deux-pas",[[0,2.5,1],[3,1.5,0],[6,3.5,0],[10,1.5,1],[12,3.5,0]]),N("Dembow",[[0,1.5,1],[3,.9,0],[4,1.5,0],[7,.9,0],[8,1.5,1],[11,.9,0],[12,1.5,0],[15,.9,0]]),dt("Triolets",Array.from({length:12},(r,e)=>[e*32,26,e%3===0])),N("Log drum",[[0,2,1],[3,1,0],[6,2.5,1],[10,1,0],[12,1,0],[14,1.6,1]]),N("Jersey",[[0,2.5,1],[4,2.5,1],[8,1.5,1],[10,2,0],[13,2.5,1]]),Ke("Arp\xE8ge",0,1,16,.9,3),N("Rafales",[[0,.45,1],[.5,.45,0],[1,.45,0],[1.5,.45,0],[6,1.5,1],[8,.45,1],[8.5,.45,0],[9,.45,0],[9.5,.45,0],[12,1.5,0],[14,1.5,1]])],g=.5,to=[{name:"Coup par coup",len:0,ev:[]},N("Quatre temps",[[0,g,1],[4,g,0],[8,g,0],[12,g,0]]),N("Un et trois",[[0,g,1],[8,g,0]]),N("Deux-pas",[[0,g,1],[10,g,0]]),N("Trap",[[0,g,1],[7,g,0],[10,g,0]],16),N("Breakbeat",[[0,g,1],[10,g,0],[16,g,1],[23,g,0],[26,g,0]],32),N("Jersey",[[0,g,1],[4,g,1],[8,g,1],[10,g,0],[13,g,1]]),N("Montagem",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),N("Afro",[[0,g,1],[4,g,0],[7,g,0],[8,g,0],[12,g,0]]),N("Amapiano",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[14,g,0]]),N("Martel\xE9",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[14,g,0],[15,g,0]]),N("Roulant",[[0,g,1],[3,g,0],[4,g,0],[8,g,0],[11,g,0],[12,g,0]]),N("Demi-temps",[[0,g,1],[11,g,0],[19,g,0]],32),N("Syncope",[[0,g,1],[6,g,0],[10,g,0]]),Ke("Croches",0,2,8,g,4),Ke("Rouleau",0,1,16,g,4),N("Reggaeton",[[0,g,1],[4,g,0],[8,g,0],[12,g,0],[10,g,0]])],so=[{name:"Coup par coup",len:0,ev:[]},N("Deux et quatre",[[4,g,1],[12,g,1]]),N("Demi-temps",[[8,g,1]]),N("Dembow",[[3,g,1],[6,g,0],[11,g,1],[14,g,0]]),N("Deux-pas",[[4,g,1],[12,g,1],[15,g,0]]),N("Breakbeat",[[4,g,1],[12,g,1],[20,g,1],[25,g,0],[28,g,1]],32),N("Jersey",[[4,g,1],[12,g,1],[14,g,0],[15,g,0]]),N("Trap",[[8,g,1],[24,g,1],[30,g,0],[31,g,0]],32),N("Funk",[[4,g,1],[7,g,0],[12,g,1],[14,g,0]]),N("Afro",[[4,g,1],[10,g,0],[12,g,1]]),N("Fant\xF4mes",[[4,g,1],[9,g,0],[12,g,1],[15,g,0]]),Ke("Croches",0,2,8,g,2),N("Rafale",[[12,g,1],[13,g,0],[14,g,0],[15,g,1]]),N("Contretemps",[[2,g,1],[6,g,0],[10,g,1],[14,g,0]]),N("Trois-trois-deux",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0]]),N("Syncop\xE9",[[3,g,1],[10,g,1]]),Ke("Roulement",0,1,16,g,4)],io=[{name:"Coup par coup",len:0,ev:[]},Ke("Croches",0,2,8,g,2),Ke("Doubles",0,1,16,g,4),N("Contretemps",[[2,g,1],[6,g,1],[10,g,1],[14,g,1]]),N("Deux-pas",[[0,g,1],[2,g,0],[3,g,0],[6,g,1],[8,g,0],[10,g,1],[11,g,0],[14,g,1]]),dt("Triolets",Array.from({length:12},(r,e)=>[e*32,12,e%3===0])),dt("Roulements",[0,24,48,60,72,96,120,144,156,168,180,192,216,240,264,276,288,312,336,344,352,360,368,376].map((r,e)=>[r,6,r%96===0])),Ke("Noires",0,4,4,g,1),N("Galop",[[0,g,1],[2,g,0],[3,g,0],[4,g,1],[6,g,0],[7,g,0],[8,g,1],[10,g,0],[11,g,0],[12,g,1],[14,g,0],[15,g,0]]),N("Afro",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0],[15,g,0]]),N("Accents",Array.from({length:16},(r,e)=>[e,g,e%4===2])),dt("Triolets 16",Array.from({length:24},(r,e)=>[e*16,8,e%6===0])),N("Sautill\xE9",[[0,g,1],[3,g,0],[4,g,1],[7,g,0],[8,g,1],[11,g,0],[12,g,1],[15,g,0]]),N("Point\xE9es",[[0,g,1],[3,g,0],[6,g,0],[9,g,0],[12,g,1]]),dt("Rafales",[0,48,96,108,120,132,192,240,288,300,312,324,336,348,360,372].map(r=>[r,6,r%96===0])),N("Clave",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),N("Shuffle",[[0,g,1],[3,g,0],[4,g,1],[7,g,0],[8,g,1],[11,g,0],[12,g,1],[14,g,0],[15,g,0]])],ao=[{name:"Coup par coup",len:0,ev:[]},N("Clave son",[[0,g,1],[3,g,0],[6,g,0],[10,g,1],[12,g,0]]),N("Clave rumba",[[0,g,1],[3,g,0],[7,g,0],[10,g,1],[12,g,0]]),N("Tresillo",[[0,g,1],[3,g,0],[6,g,0],[8,g,1],[11,g,0],[14,g,0]]),Ke("Shaker",0,1,16,g,2),N("Tumbao",[[2,g,0],[3,g,1],[6,g,0],[7,g,1],[10,g,0],[11,g,1],[14,g,0],[15,g,1]]),N("Cloche phonk",[[0,g,1],[2,g,0],[3,g,1],[5,g,0],[6,g,1],[8,g,0],[10,g,1],[11,g,0],[13,g,1],[14,g,0]]),dt("Cloche 12/8",[0,2,4,5,7,9,11].map((r,e)=>[r*32,12,e===0])),N("Contretemps",[[2,g,1],[6,g,0],[10,g,1],[14,g,0]]),N("Log",[[3,g,1],[6,g,0],[11,g,1],[14,g,0]]),Ke("Croches",0,2,8,g,2),Ke("Noires",0,4,4,g,1),N("Syncope",[[1,g,1],[4,g,0],[7,g,1],[10,g,0],[13,g,1]]),N("Rim deux-pas",[[3,g,0],[7,g,1],[11,g,0],[14,g,1]]),dt("Triolets",Array.from({length:12},(r,e)=>[e*32,12,e%3===0])),dt("Rafales",[288,300,312,324,336,348,360,372].map((r,e)=>[r,6,e===0])),N("Montagem",[[0,g,1],[3,g,0],[6,g,1],[8,g,0],[10,g,1],[12,g,0],[14,g,1]])],Dt=[to,so,io,ao];function wi(r,e){let t=r.ev.length;if(!e||t<2)return[];let s=Math.min(e,t-1),i=[];for(let a=0;a<s;a++){let o=Math.round((a+1)*t/(s+1));o<1&&(o=1),o>t-1&&(o=t-1),i.includes(o)||i.push(o)}return i}function Is(r){return Math.max(0,r.ev.length-1)}var Si=[1,2,4,8];var gt={lo:-24,hi:36,maxN:24,maxSemis:37};function ns(r,e,t=gt){let s=_s(r,e),i=[];for(let a=Math.floor(t.lo/12);a<=Math.ceil(t.hi/12);a++)for(let o of s){let n=a*12+o.semi;n>=t.lo&&n<t.hi&&i.push(n)}return i.sort((a,o)=>a-o)}function Bs(r,e,t,s,i=gt){let a=ns(t,s,i),o=0,n=1/0;a.forEach((c,d)=>{let h=Math.abs(c-e);h<n&&(n=h,o=d)});let l=Math.min(r.n,a.length);return o=Math.max(0,Math.min(a.length-l,o)),{lo:a[o],n:l}}function Fs(r,e,t,s,i,a=gt){let o=ns(s,i,a),n=rt(r,s,i),l=n[0].semi,c=n[n.length-1].semi,d=o[0],h=1/0;for(let m of o){let p=Math.abs(m-t);p<h&&(h=p,d=m)}let v=(m,p)=>o.filter(b=>b>=m&&b<=p).length;if(e==="left"){let m=Math.min(d,c);return m=Math.max(m,c-a.maxSemis+1),{lo:m,n:Math.min(a.maxN,Math.max(1,v(m,c)))}}let f=Math.max(d,l);return f=Math.min(f,l+a.maxSemis-1),{lo:l,n:Math.min(a.maxN,Math.max(1,v(l,f)))}}var Li="motif-3",oo=3;function yt(){let r=new Uint8Array(8);return crypto.getRandomValues(r),Array.from(r,e=>e.toString(16).padStart(2,"0")).join("")}function bt(r="A"){return{name:r,drum:[{hits:[]},{hits:[]},{hits:[]},{hits:[]}],bass:{notes:[]},lead:{notes:[]},auto:{},gest:{bass:[],lead:[],drum:[]}}}function xt(r={}){let e=Date.now();return{format:Li,v:oo,id:yt(),name:r.name||"Nouvelle id\xE9e",created:e,updated:e,tempo:r.tempo||120,swing:50,key:r.key??2,scale:r.scale||"minor",bars:2,parts:{drum:{kit:r.kit||[null,null,null,null],macros:[null,null,null,null],rhythm:[1,1,1,4],mute:[!1,!1,!1,!1],level:[0,0,0,0]},bass:{preset:r.bass||null,macros:null,rhythm:4,ties:0,steps:5,range:{lo:-12,n:8},arp:"order",q:24,mute:!1,level:0},lead:{preset:r.lead||null,macros:null,rhythm:5,ties:0,steps:5,range:{lo:0,n:10},arp:"order",q:24,mute:!1,level:0}},mix:{drum:0,bass:0,lead:0,pump:.3,master:0,space:.5,drumDrive:.15,drumSpace:.1},patterns:[bt("A")],current:0,song:{enabled:!1,sections:[]}}}var ie=(r,e,t,s)=>{let i=Number(r);return Number.isFinite(i)?Math.min(s,Math.max(t,i)):e};function Pt(r){if(!r||typeof r!="object")throw new Error("Fichier de projet illisible");if(r.format&&r.format!==Li)throw new Error("Format de projet inconnu");let t=xt();t.id=typeof r.id=="string"?r.id.slice(0,40):yt(),t.name=typeof r.name=="string"&&r.name.trim()?r.name.slice(0,80):"Sans titre",t.created=ie(r.created,Date.now(),0,1e15),t.updated=ie(r.updated,Date.now(),0,1e15),t.tempo=ie(r.tempo,120,40,220),t.swing=ie(r.swing,50,50,75),t.key=ie(r.key,0,0,11)|0,t.scale=typeof r.scale=="string"?r.scale:"minor",t.bars=[1,2,4,8].includes(r.bars)?r.bars:2;let s=r.parts||{};if(s.drum){let o=s.drum;t.parts.drum.kit=[0,1,2,3].map(n=>o.kit&&typeof o.kit[n]=="string"?o.kit[n]:null),t.parts.drum.macros=[0,1,2,3].map(n=>o.macros&&Array.isArray(o.macros[n])?o.macros[n].slice(0,7).map(l=>l===null?null:ie(l,.5,0,1)):null),t.parts.drum.rhythm=[0,1,2,3].map(n=>ie(o.rhythm&&o.rhythm[n],1,0,16)|0),t.parts.drum.mute=[0,1,2,3].map(n=>!!(o.mute&&o.mute[n])),t.parts.drum.level=[0,1,2,3].map(n=>ie(o.level&&o.level[n],0,-40,6))}for(let o of["bass","lead"]){let n=s[o];if(!n)continue;let l=t.parts[o];l.preset=typeof n.preset=="string"?n.preset:null,l.macros=Array.isArray(n.macros)?n.macros.slice(0,7).map(c=>c===null?null:ie(c,.5,0,1)):null,l.rhythm=ie(n.rhythm,l.rhythm,0,16)|0,l.ties=ie(n.ties,0,0,24)|0,l.steps=[1,2,3,4,5,6,7,12].includes(n.steps)?n.steps:l.steps,n.range&&(l.range={lo:ie(n.range.lo,l.range.lo,-36,48)|0,n:ie(n.range.n,l.range.n,1,36)|0}),l.arp=["order","up","down","chord"].includes(n.arp)?n.arp:"order",l.q=[6,12,24,48].includes(n.q)?n.q:24,l.mute=!!n.mute,l.level=ie(n.level,0,-40,6)}if(r.mix)for(let o of Object.keys(t.mix))r.mix[o]!==void 0&&(t.mix[o]=ie(r.mix[o],t.mix[o],-40,12));let i=384*t.bars,a=Array.isArray(r.patterns)&&r.patterns.length?r.patterns.slice(0,8):[bt("A")];return t.patterns=a.map((o,n)=>{let l=bt(typeof o.name=="string"?o.name.slice(0,12):String.fromCharCode(65+n));for(let c=0;c<4;c++){let d=o.drum&&o.drum[c]&&Array.isArray(o.drum[c].hits)?o.drum[c].hits:[];l.drum[c].hits=d.filter(h=>h&&h.t>=0&&h.t<i).slice(0,4e3).map(h=>({t:h.t|0,v:ie(h.v,.8,0,1),x:ie(h.x,1,0,2)|0,c:ie(h.c,.5,0,1)}))}for(let c of["bass","lead"]){let d=o[c]&&Array.isArray(o[c].notes)?o[c].notes:[];l[c].notes=d.filter(h=>h&&h.t>=0&&h.t<i).slice(0,4e3).map(h=>({t:h.t|0,d:ie(h.d,24,1,i)|0,deg:ie(h.deg,0,-60,60)|0,acc:ie(h.acc,0,-2,2)|0,v:ie(h.v,.8,0,1),tie:!!h.tie,...typeof h.y=="number"?{y:ie(h.y,.5,0,1)}:{}}))}if(o.gest&&typeof o.gest=="object")for(let c of["bass","lead","drum"]){let d=Array.isArray(o.gest[c])?o.gest[c]:[],h=2e4;l.gest[c]=[];for(let v of d){if(!v||!Array.isArray(v.p)||h<=0)continue;let f=v.p.filter(m=>Array.isArray(m)&&m[0]>=0&&m[0]<i).slice(0,h).map(m=>c==="drum"?[Math.round(ie(m[0],0,0,i)*10)/10,ie(m[1],.5,0,1),ie(m[2],.5,0,1)]:[Math.round(ie(m[0],0,0,i)*10)/10,ie(m[1],.5,0,1),ie(m[2],.5,0,1),ie(m[3],0,-60,60)|0,ie(m[4],0,-2,2)|0]);f.length&&(h-=f.length,l.gest[c].push(c==="drum"?{l:ie(v.l,0,0,3)|0,p:f}:{p:f}))}}if(o.auto&&typeof o.auto=="object"){for(let c of["d0","d1","d2","d3","bass","lead"])if(o.auto[c])for(let d=0;d<7;d++){let h=o.auto[c][d];if(Array.isArray(h)&&h.length){l.auto[c]=l.auto[c]||{};let v=i/12;l.auto[c][d]=Array.from({length:v},(f,m)=>{let p=h[m];return p==null||p<0?-1:ie(p,-1,0,1)})}}}return l}),t.current=ie(r.current,0,0,t.patterns.length-1)|0,r.song&&Array.isArray(r.song.sections)&&(t.song.sections=r.song.sections.slice(0,64).map(o=>({p:ie(o.p,0,0,t.patterns.length-1)|0,reps:ie(o.reps,1,1,16)|0,mute:o.mute&&typeof o.mute=="object"?{d0:!!o.mute.d0,d1:!!o.mute.d1,d2:!!o.mute.d2,d3:!!o.mute.d3,bass:!!o.mute.bass,lead:!!o.mute.lead}:{}})),t.song.enabled=!!r.song.enabled&&t.song.sections.length>0),t}function Mi(r,e){let t=384*r.bars,s=384*e;if(e!==r.bars){for(let i of r.patterns){let a=(o,n)=>{if(s>t){let l=[];for(let c=t;c<s;c+=t)for(let d of o)d.t+c<s&&l.push(n(d,c));return o.concat(l)}return o.filter(l=>l.t<s).map(l=>l.d&&l.t+l.d>s?{...l,d:s-l.t}:l)};for(let o=0;o<4;o++)i.drum[o].hits=a(i.drum[o].hits,(n,l)=>({...n,t:n.t+l}));for(let o of["bass","lead"])i[o].notes=a(i[o].notes,(n,l)=>({...n,t:n.t+l}));if(i.gest)for(let o of["bass","lead","drum"]){let n=i.gest[o]||[];if(s>t){let l=[];for(let c=t;c<s;c+=t)for(let d of n)l.push({...d,p:d.p.map(h=>[h[0]+c,...h.slice(1)])});i.gest[o]=n.concat(l)}else i.gest[o]=n.map(l=>({...l,p:l.p.filter(c=>c[0]<s)})).filter(l=>l.p.length)}for(let o in i.auto)for(let n in i.auto[o]){let l=i.auto[o][n],c=s/12;i.auto[o][n]=Array.from({length:c},(d,h)=>l[h%l.length])}}r.bars=e}}function Ns(r,e,t,s,i,a=!0){if(ro(r,e,e==="drum"?t:void 0,s,i),e==="drum"){let o=t==null?[0,1,2,3]:[t];for(let n of o)r.drum[n].hits=r.drum[n].hits.filter(l=>l.t<s||l.t>=i);if(a)for(let n of o)Ti(r,"d"+n,s,i)}else r[e].notes=r[e].notes.filter(o=>o.t<s||o.t>=i),a&&Ti(r,e,s,i)}function ro(r,e,t,s,i){if(!r.gest||!r.gest[e])return;let a=[];for(let o of r.gest[e]){if(e==="drum"&&t!==void 0&&t!==null&&o.l!==t){a.push(o);continue}let n=o.p.filter(c=>c[0]<s),l=o.p.filter(c=>c[0]>=i);if(n.length===o.p.length){a.push(o);continue}for(let c of[n,l])c.length&&a.push({...o,p:c})}r.gest[e]=a}function Ti(r,e,t,s){let i=r.auto[e];if(i){for(let a in i){let o=i[a];for(let n=Math.floor(t/12);n<Math.ceil(s/12)&&n<o.length;n++)o[n]=-1;o.every(n=>n<0)&&delete i[a]}Object.keys(i).length||delete r.auto[e]}}function Ri(r,e,t){r.range=ki(r.range,t,r.steps,e),r.steps=e}function Us(r){return r.drum.reduce((e,t)=>e+t.hits.length,0)+r.bass.notes.length+r.lead.notes.length}var no=[{name:"Court",off:{bodyDecay:-1,boomDecay:-1,smpDecay:-1.5}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8,boomDecay:.6,smpDecay:.6}}],lo=[{name:"Frappe",def:.5,map:[["click",-.3,.45],["pAmt",-10,10],["clickTone",-.6,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1.2],["boomDecay",-1,1]]}],co={name:"Couleur",def:.6,map:[["tone",-2.6,0],["drive",-.12,.3]]},fe=(r,e,t,s={})=>({id:"kick."+r,name:e,style:s.style||null,desc:s.desc||"",p:{kind:0,...t},samples:s.samples,variants:s.variants||no,macros:s.macros||lo,expr:s.expr||co,trim:s.trim||0}),Ei=[["vd-kick-2-1",0,70],["vd-kick-3-1",71,104],["vd-kick-4-1",105,127],["vd-kick-4-2",105,127]],Ai=[fe("rond","Rond",{freq:50,pAmt:26,pDecay:.045,bodyDecay:.42,click:.3,clickTone:3200,drive:.15,driveType:3},{desc:"Rond et polyvalent, attaque douce"}),fe("club","Club",{freq:53,pAmt:34,pDecay:.03,pAmt2:14,pDecay2:.003,bodyDecay:.34,bodyShape:.2,click:.5,clickTone:4500,drive:.3,driveType:1},{desc:"Punch de club, m\xE9dium pr\xE9sent"}),fe("profond","Profond",{freq:43,pAmt:22,pDecay:.06,bodyDecay:.6,boom:.35,boomDecay:.9,click:.18,tone:6e3},{desc:"Grave profond, queue souple"}),fe("808","808 long",{freq:46,pAmt:18,pDecay:.028,bodyDecay:.35,boom:.85,boomDecay:1.6,click:.22,clickTone:2500,drive:.12},{desc:"Grosse caisse 808 tenue",macros:[{name:"Glisse",def:.35,map:[["pDecay",-1,2.2],["pAmt",-6,14]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,1.2],["boom",-.4,.15]]}]}),fe("feutre","Feutr\xE9",{freq:56,pAmt:14,pDecay:.05,bodyDecay:.28,click:.08,tone:2200,drive:.25,driveType:3},{desc:"Mat, chaud, presque acoustique"}),fe("acoustique","Acoustique",{freq:52,pAmt:10,pDecay:.04,bodyDecay:.22,bodyLevel:.35,click:0,smpLevel:1.05,smpDecay:2},{desc:"Grosse caisse de batterie jazz, prises Virtuosity Drums",samples:Ei,macros:[{name:"Peau \u2194 Sub",def:.3,map:[["smpLevel",.15,-.6],["bodyLevel",-.25,.6]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.7,map:[["tone",-2.6,0],["drive",0,.35]]}}),fe("sec","Sec",{freq:62,pAmt:30,pDecay:.018,bodyDecay:.16,click:.6,clickTone:5e3},{desc:"Tr\xE8s court, net, rapide"}),fe("concert","Grosse caisse",{freq:45,pAmt:6,pDecay:.05,bodyDecay:.7,bodyLevel:.4,click:0,smpLevel:1.1,smpDecay:2.5},{desc:"Grosse caisse d\u2019orchestre (VCSL), ample",samples:[["vcsl-bassdrum"]],macros:[{name:"Ampleur",def:.5,map:[["smpDecay",-1.6,1],["bodyLevel",-.3,.4]]},{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]}]}),fe("sature","Satur\xE9",{freq:54,pAmt:32,pDecay:.035,bodyDecay:.32,drive:.65,driveType:1,click:.4,tone:12e3},{desc:"Saturation franche, attaque mordante",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.28],["tone",-1,.6]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),fe("rebond","Rebond",{freq:50,pAmt:24,pDecay:.095,bodyDecay:.5,click:.25},{desc:"Chute de hauteur lente, \xE9lastique"}),fe("sub","Sub",{freq:41,pAmt:10,pDecay:.04,bodyDecay:.8,click:.06,tone:3e3},{desc:"Presque une note de sub"}),fe("clic","Clic",{freq:55,pAmt:28,pDecay:.014,bodyDecay:.3,click:1,clickTone:7e3,clickDecay:.0018},{desc:"Clic aigu tr\xE8s pr\xE9cis"}),fe("vinyle","Vinyle",{freq:54,pAmt:16,pDecay:.04,bodyDecay:.3,bodyLevel:.6,crush:.3,tone:4e3,drive:.3,driveType:3,smpLevel:.8,smpDecay:1},{desc:"Kick poussi\xE9reux, micro lo-fi",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.25,.4],["tone",.6,-1]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]}),fe("909","Neuf-z\xE9ro",{freq:54,pAmt:30,pDecay:.03,bodyDecay:.3,bodyShape:.45,click:.55,clickTone:6e3,clickDecay:.006},{desc:"Analogique techno, l\xE9g\xE8rement carr\xE9"}),fe("boom","Boom",{freq:47,pAmt:22,pDecay:.04,bodyDecay:.3,boom:.55,boomDecay:1.1,drive:.2},{desc:"Hip-hop ample, queue tenue"}),fe("papier","Papier",{freq:65,pAmt:20,pDecay:.02,bodyDecay:.14,click:.45,clickTone:1600,tone:4e3},{desc:"Sec et mat, comme un carton"}),fe("plie","Pli\xE9",{freq:50,pAmt:30,pDecay:.03,bodyDecay:.4,drive:.45,driveType:2,tone:8e3},{desc:"Repliement d\u2019onde : grain harmonique",macros:[{name:"Pli",def:.4,map:[["drive",-.3,.45]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.3,1]]}]}),fe("cajon","Caj\xF3n",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse en bois frapp\xE9e (VCSL)",samples:[["vcsl-cajon-bass",0,127,0],["vcsl-cajon-mid",0,127,1],["vcsl-cajon-slap",0,127,2]],variants:[{name:"Basse"},{name:"Milieu"},{name:"Claque"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),fe("cadre","Tambour sur cadre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Frame drum (VCSL), grave et feutr\xE9",samples:[["vcsl-frame-lo",0,127,0],["vcsl-frame-mute",0,127,1],["vcsl-frame-hi",0,127,2]],variants:[{name:"Ouvert"},{name:"\xC9touff\xE9"},{name:"Petit"}],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,3]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.5]]}]}),fe("tom","Tom grave",{freq:68,pAmt:7,pDecay:.05,bodyDecay:.45,bodyLevel:.45,click:0,smpLevel:1,smpDecay:2},{desc:"Tom basse de batterie + sous-couche synth\xE9tique",samples:[["vd-ltom-8",0,90],["vd-ltom-14",91,127]],macros:[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"Longueur",def:.5,map:[["smpDecay",-2,1],["bodyDecay",-1,1]]}]}),fe("montagem","Montagem",{freq:50,pAmt:40,pDecay:.032,pAmt2:18,pDecay2:.003,bodyDecay:.45,bodyShape:.5,drive:.85,driveType:1,click:.5,tone:1e4,boom:.3,boomDecay:.7},{style:"phonk",desc:"\xC9cr\xEAt\xE9, agressif, pens\xE9 pour la montagem",macros:[{name:"\xC9cr\xEAtage",def:.5,map:[["drive",-.4,.15],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boom",-.3,.4],["boomDecay",-1,1]]}]}),fe("garage","Garage",{freq:56,pAmt:28,pDecay:.028,bodyDecay:.26,click:.45,clickTone:5200,drive:.18,bodyShape:.15},{style:"ukg",desc:"Court et rebondi pour le 2-step"}),fe("afroprofond","Afro profond",{freq:44,pAmt:16,pDecay:.06,bodyDecay:.5,click:.12,clickTone:2200,drive:.2,driveType:3,boom:.35,boomDecay:1,tone:5e3},{style:"afro",desc:"Profond, chaud, laisse respirer"}),fe("pianofeutre","Piano feutre",{freq:51,pAmt:15,pDecay:.045,bodyDecay:.24,click:.14,tone:3200,drive:.15,driveType:3},{style:"amapiano",desc:"Discret, laisse la place au log drum"}),fe("perreo","Perreo",{freq:57,pAmt:30,pDecay:.035,bodyDecay:.34,bodyShape:.25,click:.4,clickTone:3800,drive:.32,driveType:0},{style:"reggaeton",desc:"Rond et dense pour le dembow"}),fe("jersey","Jersey",{freq:60,pAmt:44,pDecay:.02,pAmt2:12,pDecay2:.002,bodyDecay:.22,click:.75,clickTone:6e3,drive:.38,driveType:1},{style:"jersey",desc:"Tr\xE8s articul\xE9 pour les rafales"}),fe("break","Break",{freq:55,pAmt:26,pDecay:.02,bodyDecay:.18,bodyLevel:.5,click:.2,drive:.25,smpLevel:1,smpDecay:.35},{style:"dnb",desc:"Acoustique serr\xE9 + sub court",samples:Ei,macros:[{name:"Peau \u2194 Sub",def:.45,map:[["smpLevel",.1,-.6],["bodyLevel",-.3,.5]]},{name:"Longueur",def:.5,map:[["smpDecay",-1,2],["bodyDecay",-1,1]]}]}),fe("808rage","808 rage",{freq:45,pAmt:24,pDecay:.03,bodyDecay:.4,boom:.95,boomDecay:1.9,bodyShape:.35,drive:.55,driveType:0,click:.3,tone:9e3},{style:"rage",desc:"808 satur\xE9e et tenue",macros:[{name:"Saturation",def:.5,map:[["drive",-.35,.35],["bodyShape",-.3,.3]]},{name:"Queue",def:.5,map:[["boomDecay",-1.6,.8]]}]}),fe("rumble","Rumble",{freq:45,pAmt:38,pDecay:.025,bodyDecay:.28,drive:.9,driveType:0,boom:.75,boomDecay:.9,click:.45,tone:5e3,hp:35},{style:"hardtechno",desc:"Kick dur avec tra\xEEne grave satur\xE9e",macros:[{name:"Rumble",def:.5,map:[["boom",-.5,.35],["boomDecay",-1,.8]]},{name:"Duret\xE9",def:.5,map:[["drive",-.4,.15],["click",-.3,.4]]}]}),fe("poussiere","Poussi\xE8re",{freq:52,pAmt:18,pDecay:.05,bodyDecay:.4,click:.2,tone:1600,crush:.4,drive:.3,driveType:3,smpLevel:.6,smpDecay:1},{style:"triphop",desc:"\xC9touff\xE9 et granuleux, tempo lent",samples:[["vd-kick-lofi-3"]],macros:[{name:"Usure",def:.4,map:[["crush",-.35,.45],["tone",1,-.6],["drive",-.2,.3]]},{name:"Longueur",def:.5,map:[["bodyDecay",-1.2,1],["smpDecay",-1.5,1]]}]})];var ho=[{name:"Fant\xF4me",off:{level:-9,noiseDecay:-.7,bodyDecay:-.5,smpDecay:-1}},{name:"Normal"},{name:"Ouvert",off:{noiseDecay:.8,bodyDecay:.4,revSend:.1,smpDecay:.8}}],uo=[{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1],["noiseTone",-.8,.8]]}],fo={name:"Claquant",def:.5,map:[["snap",-.3,.45],["drive",-.05,.3]]},po=[{name:"Serr\xE9",off:{bursts:-1,noiseDecay:-.8}},{name:"Normal"},{name:"Large",off:{bursts:1,noiseDecay:.7,width:.3,revSend:.15}}],mo=[{name:"Mains",def:.5,map:[["burstGap",-.6,.6],["bursts",-1,2]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["revSend",-.05,.3]]}],vo={name:"\xC9clat",def:.5,map:[["noiseTone",-.5,.6],["drive",-.05,.3]]},go=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Longueur",def:.6,map:[["smpDecay",-2.5,.6]]}],bo={name:"Couleur",def:.6,map:[["tone",-2.3,0],["drive",-.05,.3]]},pe=(r,e,t,s={})=>({id:"snare."+r,name:e,style:s.style||null,desc:s.desc||"",p:{kind:1,freq:190,...t},samples:s.samples,variants:s.variants||(t.kind===2?po:ho),macros:s.macros||(t.kind===2?mo:t.kind===7?go:uo),expr:s.expr||(t.kind===2?vo:t.kind===7?bo:fo),trim:s.trim||0}),zs=[["vd-snare-8",0,50],["vd-snare-16",51,80],["vd-snare-24",81,100],["vd-snare-32",101,117],["vd-snare-36",118,127]],ls=[["vd-xstick-6",0,60],["vd-xstick-12",61,100],["vd-xstick-16",101,127]],cs=[["vcsl-clap-1"],["vcsl-clap-2"],["vcsl-clap-3"]],hs=(r,e)=>r.map(([t,s=0,i=127])=>[t,s,i,e]),Di=[pe("classique","Classique",{pAmt:6,pDecay:.03,bodyDecay:.1,body2:.5,ratio2:1.62,noiseLevel:.8,noiseTone:9e3,noiseHP:800,noiseDecay:.2,snap:.5,clickTone:4500},{desc:"Caisse claire analogique \xE9quilibr\xE9e"}),pe("clap808","Clap 808",{kind:2,noiseLevel:1,noiseTone:1150,noiseQ:.4,noiseHP:600,noiseDecay:.18,bursts:4,burstGap:.0085,width:.4},{desc:"Clap analogique classique"}),pe("rim","Rimshot",{kind:4,freq:520,mdMat:7,bodyDecay:.13,mdHard:.9,click:.35,clickTone:3500},{desc:"Cercle de caisse claire, bois\xE9 et court",macros:[{name:"Accord",def:.5,map:[["tune",-5,5]]},{name:"R\xE9sonance",def:.4,map:[["bodyDecay",-1,1.4]]}],expr:{name:"Frappe",def:.6,map:[["mdHard",-.4,.1],["click",-.3,.15],["level",2.5,-2]]}}),pe("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:3},{desc:"Caisse claire jazz (Virtuosity Drums) : cross-stick, centre, buzz",samples:[...hs(ls,0),...hs(zs,1),["vd-buzz-6",0,80,2],["vd-buzz-12",81,127,2]],variants:[{name:"Cross-stick"},{name:"Centre"},{name:"Buzz"}]}),pe("sanstimbre","Sans timbre",{kind:7,smpLevel:1,smpDecay:3},{desc:"Timbre rel\xE2ch\xE9 : son de tom sec",samples:[["vd-snoff-6",0,80],["vd-snoff-12",81,127]],variants:[{name:"Grave",off:{smpTune:-3}},{name:"Normal"},{name:"Aigu",off:{smpTune:3}}]}),pe("fantome","Fant\xF4me",{freq:210,pAmt:4,bodyDecay:.06,noiseLevel:.5,noiseTone:7e3,noiseHP:1200,noiseDecay:.09,snap:.2,level:-3},{desc:"L\xE9ger, pour les notes fant\xF4mes"}),pe("crepitant","Cr\xE9pitant",{pAmt:5,bodyDecay:.12,bodyLevel:.6,noiseLevel:1,noiseTone:6e3,noiseHP:400,noiseDecay:.45,crush:.15,snap:.3},{desc:"Longue queue de grain"}),pe("clapserre","Clap serr\xE9",{kind:2,noiseLevel:1,noiseTone:1600,noiseQ:.35,noiseHP:700,noiseDecay:.08,bursts:2,burstGap:.005,width:.25},{desc:"Clap court et pr\xE9cis"}),pe("claplarge","Clap large",{kind:2,noiseLevel:1,noiseTone:1050,noiseQ:.25,noiseHP:500,noiseDecay:.4,bursts:5,burstGap:.011,width:1,revSend:.25},{desc:"Clap ample en st\xE9r\xE9o"}),pe("doigts","Claquement",{kind:2,noiseLevel:1.1,noiseTone:2600,noiseQ:.7,noiseHP:1500,noiseDecay:.05,bursts:1,burstGap:.004,width:.1},{desc:"Claquement de doigts sec"}),pe("mains","Mains",{kind:7,smpLevel:1,smpDecay:3},{desc:"Vrais claps (VCSL) : seul, groupe, groupe en salle",samples:[["vcsl-soloclap-2",0,90,0],["vcsl-soloclap-3",91,127,0],...hs(cs,1),...hs(cs,2)],variants:[{name:"Seul"},{name:"Groupe"},{name:"Salle",off:{revSend:.3}}]}),pe("lofi","Lo-fi",{pAmt:8,bodyDecay:.1,body2:.4,noiseLevel:.85,noiseTone:7e3,noiseHP:900,noiseDecay:.18,crush:.5,tone:5e3,snap:.3},{desc:"\xC9chantillonneur vieilli, 8 bits",macros:[{name:"Usure",def:.5,map:[["crush",-.35,.35],["tone",.8,-.8]]},{name:"Grain",def:.5,map:[["noiseDecay",-1,1]]}]}),pe("metal","M\xE9tal",{freq:240,pAmt:3,bodyDecay:.35,body2:.9,ratio2:2.31,noiseLevel:.6,noiseTone:9e3,noiseHP:1500,noiseDecay:.16,snap:.4},{desc:"R\xE9sonance m\xE9tallique accord\xE9e",macros:[{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.2,1],["body2",-.5,.1]]},{name:"Accord",def:.5,map:[["tune",-6,6]]}]}),pe("tomsnare","Tom-caisse",{freq:160,pAmt:12,pDecay:.05,bodyDecay:.22,body2:.3,ratio2:1.5,noiseLevel:.35,noiseTone:6e3,noiseHP:700,noiseDecay:.12},{desc:"Tonal, \xE0 mi-chemin du tom"}),pe("balai","Balai",{bodyLevel:.15,bodyDecay:.05,noiseLevel:.9,noiseTone:5e3,noiseHP:1200,noiseDecay:.3,noiseAttack:.03,snap:0},{desc:"Frottement de balai, attaque lente",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.5,1.2],["noiseDecay",-.7,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.8],["noiseHP",-.6,.6]]}]}),pe("electro","\xC9lectro",{freq:230,pAmt:18,pDecay:.02,bodyDecay:.12,noiseLevel:.9,noiseTone:12e3,noiseHP:1800,noiseDecay:.16,snap:.8,clickTone:6e3,drive:.3,driveType:1},{desc:"Brillant, chute de hauteur rapide"}),pe("snareclap","Caisse + clap",{pAmt:6,bodyDecay:.1,body2:.4,noiseLevel:.6,noiseTone:8e3,noiseHP:1e3,noiseDecay:.16,snap:.3,smpLevel:.7,smpDecay:2},{desc:"Caisse synth\xE9tique doubl\xE9e de vrais claps",samples:cs,macros:[{name:"Caisse \u2194 Clap",def:.5,map:[["smpLevel",-.5,.5],["noiseLevel",.3,-.4],["bodyLevel",.2,-.5]]},{name:"Queue",def:.5,map:[["noiseDecay",-1,1],["smpDecay",-2.5,.5],["revSend",-.05,.25]]}]}),pe("ressort","Ressort",{freq:180,pAmt:9,pDecay:.06,bodyDecay:.6,body2:.7,ratio2:1.45,noiseLevel:.5,noiseTone:7e3,noiseHP:900,noiseDecay:.25,drive:.2},{desc:"Corps qui sonne longtemps"}),pe("roulement","Roulement",{kind:7,smpLevel:1,smpDecay:3},{desc:"Buzz de caisse claire (roul\xE9 press\xE9)",samples:[["vd-buzz-6",0,80],["vd-buzz-12",81,127]]}),pe("crossstick","Cross-stick",{kind:7,smpLevel:1,smpDecay:3},{desc:"Baguette pos\xE9e sur le cercle",samples:ls}),pe("clapmontagem","Clap montagem",{kind:2,noiseLevel:1,noiseTone:1400,noiseQ:.3,noiseHP:600,noiseDecay:.2,bursts:3,burstGap:.007,drive:.8,driveType:1,width:.4},{style:"phonk",desc:"Clap \xE9cras\xE9, tr\xE8s pr\xE9sent"}),pe("garage","Garage snare",{freq:220,pAmt:8,bodyDecay:.07,noiseLevel:.85,noiseTone:11e3,noiseHP:1500,noiseDecay:.11,snap:.6,smpLevel:.4,smpDecay:1},{style:"ukg",desc:"Sec et nerveux pour le 2-step",samples:ls}),pe("clapafro","Clap afro",{kind:2,noiseLevel:.9,noiseTone:1e3,noiseQ:.2,noiseHP:450,noiseDecay:.3,bursts:4,burstGap:.012,width:.9,revSend:.2},{style:"afro",desc:"Doux, large, a\xE9r\xE9"}),pe("rimpiano","Rim piano",{kind:4,freq:600,mdMat:7,bodyDecay:.06,mdHard:.8,click:.4,bodyLevel:.5,smpLevel:.7,smpDecay:1},{style:"amapiano",desc:"Rimshot bois\xE9 et feutr\xE9",samples:ls,macros:[{name:"Accord",def:.5,map:[["tune",-5,5],["smpTune",-5,5]]},{name:"Bois \u2194 Baguette",def:.5,map:[["bodyLevel",-.4,.4],["smpLevel",.4,-.5]]}]}),pe("dembow","Snare dembow",{freq:200,pAmt:10,bodyDecay:.08,noiseLevel:.9,noiseTone:8e3,noiseHP:1200,noiseDecay:.12,snap:.7,drive:.2},{style:"reggaeton",desc:"Claquant et court"}),pe("clapjersey","Clap jersey",{kind:2,noiseLevel:1,noiseTone:1300,noiseQ:.3,noiseHP:600,noiseDecay:.22,bursts:4,burstGap:.008,drive:.35,driveType:1,smpLevel:.5,smpDecay:2},{style:"jersey",desc:"Clap \xE9norme, doubl\xE9",samples:cs,macros:[{name:"Synth\xE9 \u2194 Mains",def:.4,map:[["smpLevel",-.45,.7],["noiseLevel",.3,-.6]]},{name:"Salle",def:.5,map:[["noiseDecay",-1,1.2],["smpDecay",-2,.5],["revSend",-.05,.3]]}]}),pe("dnb","Snare DnB",{freq:200,bodyDecay:.1,bodyLevel:.5,noiseLevel:.6,noiseTone:9e3,noiseHP:1200,noiseDecay:.16,snap:.6,drive:.3,smpLevel:1,smpDecay:1.5},{style:"dnb",desc:"Crack acoustique renforc\xE9",samples:zs,macros:[{name:"Crack",def:.5,map:[["snap",-.3,.5],["drive",-.2,.35]]},{name:"Corps",def:.5,map:[["bodyLevel",-.4,.4],["tune",-3,3],["smpTune",-2,2]]}]}),pe("claprage","Clap rage",{kind:2,noiseLevel:1,noiseTone:1250,noiseQ:.3,noiseHP:500,noiseDecay:.25,bursts:3,burstGap:.009,width:1,drive:.5,revSend:.2},{style:"rage",desc:"Large et satur\xE9"}),pe("industriel","Clap industriel",{kind:2,noiseLevel:1,noiseTone:1800,noiseQ:.55,noiseHP:700,noiseDecay:.35,bursts:4,burstGap:.01,drive:.6,driveType:2,width:.6,revSend:.3},{style:"hardtechno",desc:"R\xE9sonance m\xE9tallique, salle froide"}),pe("poussiere","Snare poussi\xE8re",{kind:7,smpLevel:1,smpDecay:3,crush:.35,tone:4500,drive:.3,driveType:3,revSend:.15},{style:"triphop",desc:"Caisse claire us\xE9e, lente",samples:zs})];var yo=[{name:"Ferm\xE9"},{name:"Mi-ouvert",off:{noiseDecay:1.3}},{name:"Ouvert",off:{noiseDecay:2.6,revSend:.05}}],xo=[{name:"M\xE9tal \u2194 Souffle",def:.5,map:[["metal",.35,-.5]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.7],["noiseHP",-.7,.5]]}],ko={name:"Longueur",def:.4,map:[["noiseDecay",-.7,1],["smpDecay",-1.5,1]]},wo=[{name:"Accord",def:.5,map:[["smpTune",-4,4]]},{name:"Brillance",def:.6,map:[["tone",-2.4,0],["hp",0,1.6]]}],So={name:"Longueur",def:.65,map:[["smpDecay",-3,.5]]},me=(r,e,t,s={})=>({id:"hat."+r,name:e,style:s.style||null,desc:s.desc||"",p:{kind:3,freq:400,noiseLevel:.8,...t},samples:s.samples,variants:s.variants||yo,macros:s.macros||(t.kind===7?wo:xo),expr:s.expr||(t.kind===7?So:ko),trim:s.trim||0}),Pi=[["vd-hh-closed-2-1",0,80,0],["vd-hh-closed-2-2",0,80,0],["vd-hh-closed-4-1",81,127,0],["vd-hh-closed-4-2",81,127,0],["vd-hh-half-3",0,127,1],["vd-hh-open-3",0,127,2]],Ci=[{name:"Doux",off:{level:-5}},{name:"Normal"},{name:"Long",off:{smpDecay:1,revSend:.08}}],qi=[me("analogique","Analogique",{metal:.75,noiseTone:9e3,noiseHP:6500,noiseDecay:.06},{desc:"M\xE9tallique fa\xE7on bo\xEEte \xE0 rythmes"}),me("bruit","Bruit blanc",{metal:0,noiseTone:1e4,noiseHP:7e3,noiseDecay:.05,width:.5},{desc:"Souffle pur, tr\xE8s lisible"}),me("acoustique","Acoustique",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Charleston jazz (Virtuosity Drums) : ferm\xE9, mi-ouvert, ouvert",samples:Pi,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]}),me("ride","Ride",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Cymbale ride : frappe, cloche",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Forte"}]}),me("crash","Crash",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Crash et cymbale \xE0 rivets",samples:[["vd-crash-2-1",0,127,0],["vd-crash-2-1",0,127,1],["vd-sizzle-2-1",0,127,2]],variants:[{name:"Court",off:{smpDecay:-2.5}},{name:"Crash"},{name:"Rivets"}]}),me("fin","Fin",{metal:.5,noiseTone:13e3,noiseHP:9e3,noiseDecay:.04},{desc:"Petit tic aigu"}),me("sombre","Sombre",{metal:.6,metalTune:-7,noiseTone:6e3,noiseHP:3500,noiseDecay:.08},{desc:"Grave et feutr\xE9"}),me("brillant","Brillant",{metal:.4,noiseTone:14e3,noiseHP:8e3,noiseDecay:.07,width:.7},{desc:"Air et brillance"}),me("lofi","Lo-fi",{metal:.6,noiseTone:9e3,noiseHP:5e3,noiseDecay:.06,crush:.45,tone:9e3},{desc:"Granuleux, r\xE9duit en bits"}),me("tss","Tss",{metal:.2,noiseTone:11e3,noiseHP:6e3,noiseDecay:.2,noiseAttack:.008},{desc:"Souffle ouvert, attaque douce"}),me("shaker","Shaker",{kind:7,smpLevel:1,smpDecay:4},{desc:"Shaker (Virtuosity Drums) aller / retour",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-shaker-d",0,127,2],["vd-shaker-u",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Altern\xE9"}]}),me("tambourin","Tambourin",{kind:7,smpLevel:1,smpDecay:4,choke:0},{desc:"Tambourin secou\xE9",samples:[["vd-tamb-1"],["vd-tamb-2"]],variants:Ci}),me("triangle","Triangle",{kind:7,smpLevel:1,smpDecay:6,choke:1},{desc:"Triangle \xE9touff\xE9 ou ouvert",samples:[["vd-tri-mute",0,127,0],["vd-tri-open",0,127,1],["vd-tri-open",0,127,2]],variants:[{name:"\xC9touff\xE9"},{name:"Ouvert"},{name:"Long",off:{revSend:.15}}]}),me("cabasa","Cabasa",{kind:7,smpLevel:1,smpDecay:4},{desc:"Perles m\xE9talliques frott\xE9es",samples:[["vd-cabasa"]],variants:Ci}),me("charleston2","Charleston clair",{kind:7,smpLevel:1,smpDecay:4,choke:1},{desc:"Autre charleston (VCSL) : ferm\xE9, l\xE2che, ouvert",samples:[["vcsl-hh-closed",0,127,0],["vcsl-hh-loose",0,127,1],["vcsl-hh-open",0,127,2]],variants:[{name:"Ferm\xE9"},{name:"L\xE2che"},{name:"Ouvert"}]}),me("clochette","Clochette",{metal:1,metalTune:12,noiseTone:8e3,noiseHP:4e3,noiseDecay:.15},{desc:"M\xE9tal accord\xE9, presque une cloche"}),me("grain","Granuleux",{kind:6,noiseTone:9e3,noiseQ:.3,noiseHP:5e3,noiseDecay:.07,noiseAttack:.004,bodyShape:.75,noiseLevel:1},{desc:"Grains de sable irr\xE9guliers",macros:[{name:"Grain",def:.5,map:[["bodyShape",-.5,.25]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),me("large","St\xE9r\xE9o",{metal:.3,noiseTone:1e4,noiseHP:6e3,noiseDecay:.09,width:1},{desc:"Ouvert dans l\u2019image st\xE9r\xE9o"}),me("pichenette","Pichenette",{kind:7,smpLevel:1,smpDecay:6,choke:0},{desc:"Cymbalettes \xE0 doigts (VCSL)",samples:[["vcsl-fingercym"]],variants:[{name:"Court",off:{smpDecay:-3}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),me("pedale","P\xE9dale",{metal:.5,noiseTone:7e3,noiseHP:5e3,noiseDecay:.025,noiseAttack:.004},{desc:"Chick sec de p\xE9dale"}),me("drift","Hat drift",{metal:.7,noiseTone:1e4,noiseHP:7500,noiseDecay:.045,drive:.4},{style:"phonk",desc:"Court et croustillant"}),me("garage","Hat garage",{metal:.55,noiseTone:11e3,noiseHP:7e3,noiseDecay:.055,width:.4},{style:"ukg",desc:"Swing et ouvertures nettes"}),me("shakerafro","Shaker afro",{kind:7,smpLevel:1,smpDecay:4,revSend:.18,tone:7e3,smpTune:-2},{style:"afro",desc:"Shaker organique, un peu d\u2019espace",samples:[["vd-shaker-d",0,127,0],["vd-shaker-u",0,127,1],["vd-cabasa",0,127,2]],variants:[{name:"Aller"},{name:"Retour"},{name:"Cabasa"}]}),me("shakerpiano","Shaker piano",{kind:6,noiseTone:7500,noiseQ:.3,noiseHP:4e3,noiseDecay:.14,noiseAttack:.02,bodyShape:.4,width:.6,noiseLevel:1},{style:"amapiano",desc:"Long shaker soyeux",macros:[{name:"Geste",def:.5,map:[["noiseAttack",-1.2,1],["noiseDecay",-.6,.8]]},{name:"Brillance",def:.5,map:[["noiseTone",-.8,.6]]}]}),me("perreo","Hat perreo",{metal:.65,noiseTone:9500,noiseHP:6e3,noiseDecay:.05},{style:"reggaeton",desc:"R\xE9gulier et lisible"}),me("jersey","Hat jersey",{metal:.5,noiseTone:12e3,noiseHP:8e3,noiseDecay:.035,drive:.25},{style:"jersey",desc:"Pointu pour les doubles croches"}),me("ridednb","Ride DnB",{kind:7,smpLevel:1,smpDecay:.7,hp:1800,choke:1},{style:"dnb",desc:"Ride serr\xE9e et rapide",samples:[["vd-ride-2-1",0,127,0],["vd-bell-2-1",0,127,1],["vd-ride-3-1",0,127,2]],variants:[{name:"Ride"},{name:"Cloche"},{name:"Ouverte",off:{smpDecay:2}}]}),me("trap","Hat trap",{metal:.8,noiseTone:10500,noiseHP:8e3,noiseDecay:.03,drive:.2},{style:"rage",desc:"Tr\xE8s serr\xE9, fait pour les roulements"}),me("industriel","Hat industriel",{metal:.3,noiseTone:9e3,noiseHP:5e3,noiseDecay:.25,drive:.7,driveType:2,revSend:.1},{style:"hardtechno",desc:"Ouvert, dur, satur\xE9"}),me("vinyle","Hat vinyle",{kind:7,smpLevel:1,smpDecay:4,crush:.4,tone:6e3,choke:1},{style:"triphop",desc:"Charleston us\xE9 et sombre",samples:Pi,variants:[{name:"Ferm\xE9"},{name:"Mi-ouvert"},{name:"Ouvert"}]})];var To=[{name:"Grave",off:{tune:-5,smpTune:-5}},{name:"M\xE9dium"},{name:"Aigu",off:{tune:5,smpTune:5}}],Lo=[{name:"Accord",def:.5,map:[["smpTune",-5,5],["tune",-5,5]]},{name:"R\xE9sonance",def:.6,map:[["smpDecay",-2.5,.6],["revSend",-.05,.25]]}],Mo={name:"Couleur",def:.6,map:[["tone",-2.4,0],["drive",-.05,.3]]},Ro=[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"R\xE9sonance",def:.5,map:[["bodyDecay",-1.3,1.3]]}],Eo={name:"Frappe",def:.6,map:[["mdHard",-.4,.2],["click",-.2,.15],["level",2.5,-2]]},ve=(r,e,t,s={})=>({id:"perc."+r,name:e,style:s.style||null,desc:s.desc||"",p:{kind:7,smpLevel:1,smpDecay:4,...t},samples:s.samples,variants:s.variants||To,macros:s.macros||((t.kind??7)===7?Lo:Ro),expr:s.expr||((t.kind??7)===7?Mo:Eo),trim:s.trim||0}),_e=(...r)=>r.flatMap((e,t)=>e.map(([s,i=0,a=127])=>[s,i,a,t])),Oi=[ve("conga","Conga",{},{desc:"Tumba, conga ouverte, conga \xE9touff\xE9e (Virtuosity Drums)",samples:_e([["vd-tumba"]],[["vd-conga-open-lo",0,100],["vd-conga-open-hi",101,127]],[["vd-conga-mute"]]),variants:[{name:"Tumba"},{name:"Ouverte"},{name:"\xC9touff\xE9e"}]}),ve("bongo","Bongo",{},{desc:"Paire de bongos",samples:_e([["vd-bongo-lo"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]],[["vd-bongo-hi-1"],["vd-bongo-hi-2"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),ve("cloche","Cloche",{},{desc:"Cloche de vache r\xE9elle",samples:[["vd-cowbell-1",0,90],["vd-cowbell-2",91,127]]}),ve("cloche808","Cloche 808",{kind:5,freq:540,ratio2:1.48,bodyDecay:.06,noiseDecay:.35,noiseTone:2600,noiseQ:.3,bodyLevel:1},{desc:"Cloche analogique \xE0 deux oscillateurs",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.5,1],["bodyDecay",-1,1]]}],expr:{name:"Couleur",def:.5,map:[["noiseTone",-.6,.6],["drive",0,.4]]}}),ve("agogo","Agog\xF4",{},{desc:"Cloches agog\xF4 grave et aigu\xEB",samples:_e([["vd-agogo-lo"]],[["vd-agogo-hi"]],[["vd-agogo-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Aigu\xEB tendue",off:{smpTune:2}}]}),ve("claves","Claves",{},{desc:"Deux b\xE2tons de bois",samples:[["vd-claves-1",0,90],["vd-claves-2",91,127]]}),ve("bloc","Wood-block",{},{desc:"Bloc de bois grave / aigu",samples:_e([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-woodblock-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Tr\xE8s aigu",off:{smpTune:4}}]}),ve("guiro","G\xFCiro",{},{desc:"R\xE2pe en bois",samples:[["vd-guiro"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long"}]}),ve("timbales","Timbales",{},{desc:"Timbales latines",samples:_e([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Sec",off:{smpDecay:-2}}]}),ve("cuica","Cu\xEDca",{},{desc:"Tambour \xE0 friction br\xE9silien",samples:_e([["vd-cuica-1"]],[["vd-cuica-2"]],[["vd-cuica-2"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Tr\xE8s aigu\xEB",off:{smpTune:4}}]}),ve("darbuka","Darbouka",{},{desc:"Frappes de darbouka (VCSL)",samples:_e([["vcsl-darbuka-1"],["vcsl-darbuka-2"]],[["vcsl-darbuka-3"]],[["vcsl-darbuka-4"],["vcsl-darbuka-5"]]),variants:[{name:"Centre"},{name:"Bord"},{name:"Claque"}]}),ve("cajon","Caj\xF3n aigu",{},{desc:"Claques de caj\xF3n",samples:_e([["vcsl-cajon-mid"]],[["vcsl-cajon-slap"]],[["vcsl-cajon-slap"]]),variants:[{name:"Milieu"},{name:"Claque"},{name:"Claque s\xE8che",off:{smpDecay:-2}}]}),ve("fente","Tambour \xE0 fente",{},{desc:"Log drum en bois (VCSL)",samples:_e([["vcsl-slit-lo"]],[["vcsl-slit-hi"]],[["vcsl-slit-hi"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Aigu tendu",off:{smpTune:3}}]}),ve("toms","Toms",{},{desc:"Toms de batterie",samples:_e([["vd-ltom-8",0,90],["vd-ltom-14",91,127]],[["vd-htom-8",0,90],["vd-htom-14",91,127]],[["vd-htom-14"]]),variants:[{name:"Basse"},{name:"Haute"},{name:"Haute tendue",off:{smpTune:3}}]}),ve("goutte","Goutte",{kind:4,freq:900,mdMat:2,pAmt:12,pDecay:.02,bodyDecay:.4,mdHard:.4,revSend:.1},{desc:"Goutte de verre accord\xE9e"}),ve("boisynth","Bois synth\xE9tique",{kind:4,freq:750,mdMat:0,bodyDecay:.2,mdHard:.7,click:.2},{desc:"R\xE9sonateur de bois"}),ve("tom808","Tom 808",{kind:8,freq:120,mdMat:3,pAmt:10,pDecay:.1,bodyDecay:.45,mdHard:.5},{desc:"Tom analogique qui chute"}),ve("vibraslap","Vibraslap",{},{desc:"Claquement vibrant",samples:[["vd-vibraslap"]],variants:[{name:"Court",off:{smpDecay:-2}},{name:"Normal"},{name:"Long",off:{revSend:.15}}]}),ve("enclume","Enclume",{drive:.15},{desc:"M\xE9taux frapp\xE9s : enclume, tambours de frein",samples:_e([["vcsl-anvil"]],[["vcsl-brake-1"]],[["vcsl-brake-2"]]),variants:[{name:"Enclume"},{name:"Frein 1"},{name:"Frein 2"}]}),ve("blip","Blip",{kind:4,freq:1200,mdMat:4,pAmt:24,pDecay:.008,bodyDecay:.11,mdHard:.9},{desc:"Bip synth\xE9tique zapp\xE9"}),ve("clochephonk","Cloche phonk",{kind:5,freq:560,ratio2:1.48,bodyDecay:.08,noiseDecay:.25,noiseTone:2800,noiseQ:.35,drive:.5,driveType:1},{style:"phonk",desc:"Cloche satur\xE9e, jouable en m\xE9lodie (axe vertical = hauteur)",variants:[{name:"Courte",off:{noiseDecay:-1.2}},{name:"Normale"},{name:"Longue",off:{noiseDecay:.8}}],macros:[{name:"Saturation",def:.5,map:[["drive",-.4,.4]]},{name:"Longueur",def:.5,map:[["noiseDecay",-1.2,1]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),ve("toc","Toc garage",{kind:4,freq:950,mdMat:0,bodyDecay:.12,mdHard:.85,click:.25,clickTone:5e3,drive:.1},{style:"ukg",desc:"Bois tr\xE8s court pour le shuffle"}),ve("djembe","Peau afro",{kind:8,freq:220,mdMat:3,pAmt:14,pDecay:.03,bodyDecay:.25,noiseLevel:.4,noiseDecay:.05,noiseHP:1500,noiseTone:6e3,click:.4,clickTone:3e3},{style:"afro",desc:"Peau synth\xE9tique avec claque",macros:[{name:"Accord",def:.5,map:[["tune",-7,7]]},{name:"Peau \u2194 Claque",def:.4,map:[["noiseLevel",-.3,.6],["bodyLevel",.2,-.4]]}]}),ve("logdrum","Log drum",{kind:8,freq:90,mdMat:3,pAmt:19,pDecay:.05,bodyDecay:.5,mdHard:.7,drive:.3,driveType:3},{style:"amapiano",desc:"Log drum percussif (axe vertical = hauteur)",variants:[{name:"Court",off:{bodyDecay:-1}},{name:"Normal"},{name:"Long",off:{bodyDecay:.8}}],macros:[{name:"Glisse",def:.5,map:[["pAmt",-10,10],["pDecay",-.6,.8]]},{name:"Grain",def:.4,map:[["drive",-.25,.45],["mdHard",-.3,.3]]}],expr:{name:"Accord",def:.5,map:[["tune",-12,12]]}}),ve("timbal","Timbal perreo",{smpDecay:.8,drive:.3,smpTune:2,hp:300,tone:9e3},{style:"reggaeton",desc:"Timbales s\xE8ches pour le dembow",samples:_e([["vd-timbale-lo"]],[["vd-timbale-hi"]],[["vd-timbale-hi"]]),variants:[{name:"Grave"},{name:"Aigu\xEB"},{name:"Ouverte",off:{smpDecay:2}}]}),ve("couinement","Couinement",{kind:4,freq:1400,mdMat:4,pAmt:7,pDecay:.06,bodyDecay:.22,mdHard:.9,drive:.2},{style:"jersey",desc:"Petit cri synth\xE9tique, original"}),ve("tombreak","Tom break",{smpDecay:.6,drive:.25},{style:"dnb",desc:"Toms tendus pour les breaks",samples:_e([["vd-ltom-14"]],[["vd-htom-14"]],[["vd-snoff-12"]]),variants:[{name:"Tom basse"},{name:"Tom haute"},{name:"Caisse sans timbre"}]}),ve("laser","Laser",{kind:4,freq:1600,mdMat:4,pAmt:30,pDecay:.01,bodyDecay:.13,mdHard:1,drive:.4},{style:"rage",desc:"Bip laser satur\xE9"}),ve("metalindus","M\xE9tal industriel",{drive:.6,driveType:2,revSend:.2},{style:"hardtechno",desc:"Freins frapp\xE9s, satur\xE9s, salle froide",samples:_e([["vcsl-brake-1"]],[["vcsl-brake-2"]],[["vcsl-anvil"]]),variants:[{name:"Frein 1"},{name:"Frein 2"},{name:"Enclume"}]}),ve("boisfeutre","Bois feutr\xE9",{tone:2500,crush:.2,revSend:.2},{style:"triphop",desc:"Bois \xE9touff\xE9 et lointain",samples:_e([["vd-woodblock-lo"]],[["vd-woodblock-hi"]],[["vd-claves-1"]]),variants:[{name:"Grave"},{name:"Aigu"},{name:"Claves"}]})];var ge=(r,e,t,s,i,a,o,n={})=>({id:"bass."+r,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||1,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.03,aA:.003,aR:.08,...s},groups:i,macros:a,expr:o,trim:n.trim||0}),x=(r,e,t)=>({name:r,def:e,map:t}),st=[x("\xC9cho",0,[["dlMix",0,.35],["dlFb",0,.3]]),x("Salle",.1,[["rvSend",-.03,.3]])],Hs=[ge("sub","Sub pur","va",{osc1Wave:3,fType:4,vDrive:.15,vDriveType:3,aD:.3,aS:.95,aR:.12,osc2Wave:3,osc2Semi:12,osc2Level:0},["Chaleur","Forme","Glisse"],[x("Harmoniques",.3,[["vDrive",-.15,.5]]),x("Octave",0,[["osc2Level",0,.55]]),x("Attaque",.2,[["aA",-.5,6]]),x("Rel\xE2che",.3,[["aR",-.8,2.5]]),x("Glisse",.4,[["glide",-2,2.5],["pEnvAmt",0,5],["pEnvTime",0,1]]),x("Tenue",.8,[["aS",-.6,.05],["aD",-1,1]])],{name:"Grain",def:.3,map:[["fxDrive",0,.45],["fxLP",0,-1.5]]},{desc:"Sinus pur, grave centr\xE9"}),ge("moog","Moog rond","va",{osc1Wave:0,fType:0,cutoff:280,reso:.35,fEnv:3.2,fD:.22,fS:.15,keyTrack:.4,subLevel:.5,aS:.9},["Filtre","Enveloppe","Couleur"],[x("Ouverture",.45,[["cutoff",-1.5,2]]),x("R\xE9sonance",.4,[["reso",-.35,.6],["cutoff",0,.5]]),x("Mordant",.5,[["fEnv",-2.5,3]]),x("D\xE9clin",.45,[["fD",-1.5,1.6]]),x("Saturation",.2,[["fDrive",0,.8]]),x("Sub",.5,[["subLevel",-.5,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,2]]},{desc:"Analogique classique, rond et souple"}),ge("acide","Acide","va",{osc1Wave:0,osc2Wave:1,osc2Level:0,fType:0,cutoff:380,reso:.82,fEnv:4,fD:.16,fS:0,keyTrack:.5,velFilt:.7,glide:.07,aD:.25,aS:.7,aR:.06,vDrive:.2},["Filtre","Accent","Grain"],[x("Coupure",.4,[["cutoff",-1.5,2.2]]),x("R\xE9sonance",.7,[["reso",-.45,.14]]),x("Enveloppe",.5,[["fEnv",-2.5,3]]),x("D\xE9clin",.4,[["fD",-1.4,1.8]]),x("Distorsion",.25,[["vDrive",-.2,.7]]),x("Scie \u2194 Carr\xE9",0,[["osc1Level",0,-1],["osc2Level",0,1]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{desc:"Ligne acide r\xE9sonante, glisse sur les liaisons"}),ge("reese","Reese","va",{osc1Wave:0,unison:3,detune:18,spread:.35,osc2Wave:0,osc2Semi:-12,osc2Level:.3,fType:0,cutoff:900,reso:.15,fEnv:.5,subLevel:.6,chMix:.2,lfoRate:.25,aS:1,aR:.15},["Battement","Filtre","Largeur"],[x("D\xE9saccord",.4,[["detune",-12,25]]),x("Mouvement",.3,[["lfoCut",0,1.6]]),x("Ouverture",.45,[["cutoff",-1.5,1.8]]),x("Mordant",.25,[["fDrive",0,.8]]),x("Largeur",.4,[["spread",-.35,.6],["chMix",-.2,.4]]),x("Sub",.6,[["subLevel",-.6,.4]])],{name:"Ouverture",def:.4,map:[["cutoff",-1.2,1.6]]},{desc:"Scies d\xE9saccord\xE9es qui battent lentement"}),ge("808","808 gliss\xE9e","va",{osc1Wave:3,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.3,vDriveType:0,glide:.09,aD:1.5,aS:.6,aR:.2},["Saturation","Glisse","Queue"],[x("Saturation",.4,[["vDrive",-.3,.5]]),x("Mordant",.2,[["fxDrive",0,.5]]),x("Glisse",.45,[["glide",-2,2]]),x("Punch",.5,[["pEnvAmt",-10,12]]),x("Queue",.5,[["aD",-1.5,1.5]]),x("Tenue",.5,[["aS",-.5,.35]])],{name:"Saturation",def:.4,map:[["vDrive",-.25,.45]]},{desc:"808 accord\xE9e, les notes qui se chevauchent glissent",glideMode:"legato"}),ge("fm","FM grave","fm",{fmAlgo:0,fmR1:1,fmR2:1,fmL2:2.5,fmD2:.25,fmS2:.2,fmR3:3,fmL3:.6,fmD3:.12,fmS3:0,fmL4:0,fType:4,aS:.85,aR:.1},["Brillance","M\xE9tal","Espace"],[x("Indice",.45,[["fmL2",-2,3]]),x("D\xE9clin",.45,[["fmD2",-1.5,2]]),x("Rapport",0,[["fmR2",0,2.5]]),x("R\xE9troaction",0,[["fmFb",0,.7],["fmL4",0,1.5]]),...st],{name:"Indice",def:.4,map:[["fmL2",-1.5,2.5]]},{desc:"Basse FM num\xE9rique, attaque brillante"}),ge("pluck","Pluck basse","va",{osc1Wave:0,osc2Wave:1,osc2Level:.4,fType:0,cutoff:200,reso:.25,fEnv:4.5,fD:.12,aD:.35,aS:.2,aR:.1},["Pincement","Corps","Espace"],[x("Pincement",.5,[["fEnv",-2.5,2.5],["fD",-.8,.8]]),x("R\xE9sonance",.3,[["reso",-.2,.5]]),x("Longueur",.4,[["aD",-1,2],["aS",-.15,.5]]),x("Grave",.3,[["subLevel",0,.8]]),...st],{name:"Brillance",def:.4,map:[["cutoff",-1,2]]},{desc:"Court et articul\xE9 pour la house"}),ge("orgue","Orgue basse","wt",{wtTable:4,wtPos:.35,subLevel:.6,fType:1,cutoff:2500,reso:0,fEnv:0,fD:.06,chMix:.15,chRate:.8,aA:.002,aS:1,aR:.06},["Tirettes","Percussion","Rotation"],[x("Tirettes",.35,[["wtPos",-.35,.65]]),x("Sub",.6,[["subLevel",-.6,.4]]),x("Clic",.2,[["fEnv",0,3.5]]),x("Douceur",0,[["cutoff",0,-2.2]]),x("Rotation",.2,[["chMix",-.15,.6],["chRate",0,2.6]]),x("Saturation",.1,[["fxDrive",0,.5]])],{name:"Tirettes",def:.4,map:[["wtPos",-.3,.5]]},{desc:"Orgue grave fa\xE7on house/garage"}),ge("contrebasse","Contrebasse","pluck",{pkDecay:1.2,pkDamp:.55,pkBright:.45,pkBody:.5,fType:1,cutoff:3e3,glide:.06,aS:1,aR:.15},["Corde","Caisse","Doigt"],[x("Tension",.5,[["pkDamp",.45,-.45],["pkBright",-.2,.25]]),x("R\xE9sonance",.5,[["pkDecay",-1.2,1.4]]),x("Caisse",.5,[["pkBody",-.4,.4]]),x("Bois\xE9",.5,[["cutoff",-1.6,1]]),x("Attaque",.45,[["pkBright",-.35,.45]]),x("Glisse",.3,[["glide",-2,2]])],{name:"Attaque",def:.45,map:[["pkBright",-.3,.4]]},{desc:"Corde pinc\xE9e physique, chaude"}),ge("electrique","\xC9lectrique","va",{osc1Wave:0,osc2Wave:4,osc2PW:.3,osc2Level:.3,fType:0,cutoff:950,reso:.1,fEnv:2,fD:.3,vDrive:.05,aD:.6,aS:.5},["Doigt","Ampli","Espace"],[x("Attaque",.4,[["fEnv",-1,2.5]]),x("M\xE9diums",.5,[["osc2Level",-.3,.6],["osc2PW",-.2,.2]]),x("Ampli",.25,[["vDrive",-.1,.6]]),x("Grave",.3,[["subLevel",0,.7]]),...st],{name:"Brillance",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Basse \xE9lectrique au doigt, m\xE9diums pr\xE9sents"}),ge("wobble","Wobble","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,fType:0,cutoff:300,reso:.5,lfoBeats:.5,lfoCut:3,lfoShape:0,subLevel:.5,vDrive:.25,aS:1,aR:.1},["Oscillation","Filtre","Grain"],[x("Vitesse",.5,[["lfoBeats",1.5,-.375]]),x("Profondeur",.6,[["lfoCut",-2.5,1.2]]),x("Ouverture",.4,[["cutoff",-1,1.8]]),x("R\xE9sonance",.5,[["reso",-.3,.4]]),x("Saturation",.3,[["vDrive",-.2,.6]]),x("Sub",.5,[["subLevel",-.5,.5]])],{name:"Profondeur",def:.5,map:[["lfoCut",-2,1]]},{desc:"Filtre oscillant cal\xE9 sur le tempo"}),ge("hoover","Hoover","va",{osc1Wave:4,osc1PW:.3,unison:5,detune:30,spread:.8,osc2Wave:0,osc2Semi:-12,osc2Level:.6,lfoPW:.2,lfoRate:3,pEnvAmt:-5,pEnvTime:.12,fType:0,cutoff:1500,reso:.1,chMix:.4,aS:1,aR:.2},["Plong\xE9e","Ch\u0153ur","Filtre"],[x("Plong\xE9e",.5,[["pEnvAmt",5,-7],["pEnvTime",-.5,1]]),x("Pulsation",.4,[["lfoPW",-.2,.2]]),x("D\xE9saccord",.5,[["detune",-20,25]]),x("Ch\u0153ur",.4,[["chMix",-.3,.5]]),x("Ouverture",.5,[["cutoff",-1.5,1.5]]),x("R\xE9sonance",.2,[["reso",-.1,.5]])],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.2]]},{desc:"Rave des ann\xE9es 90, plongeant et large"}),ge("carre","Carr\xE9","va",{osc1Wave:4,osc1PW:.5,subLevel:.2,fType:1,cutoff:3e3,reso:.1,fEnv:1.5,fD:.15,aD:.4,aS:.6},["Forme","Filtre","Espace"],[x("Largeur",1,[["osc1PW",-.4,0]]),x("Sub",.4,[["subLevel",-.4,.6]]),x("Ouverture",.5,[["cutoff",-2,1.5]]),x("Mordant",.3,[["fEnv",-1,3]]),...st],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Onde carr\xE9e, clin d\u2019\u0153il 8 bits"}),ge("grondement","Grondement","wt",{wtTable:3,wtPos:.3,unison:3,detune:10,spread:.3,lfoBeats:1,lfoWt:.6,fType:1,cutoff:4e3,vDrive:.4,subLevel:.6,aS:1,aR:.12},["Gorge","Filtre","Grain"],[x("Gorge",.3,[["wtPos",-.3,.7]]),x("Mouvement",.5,[["lfoWt",-.6,.4],["lfoBeats",.6,-.5]]),x("Ouverture",.6,[["cutoff",-2.5,1]]),x("R\xE9sonance",.2,[["reso",0,.6]]),x("Saturation",.4,[["vDrive",-.3,.5]]),x("Sub",.6,[["subLevel",-.6,.4]])],{name:"Gorge",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Table d\u2019ondes qui \xAB parle \xBB, style bass music"}),ge("doux","Doux","va",{osc1Wave:2,vDriveType:3,subLevel:.6,fType:1,cutoff:1200,aA:.01,aS:.9,aR:.2},["Rondeur","Souffle","Espace"],[x("Ouverture",.4,[["cutoff",-1,1.6]]),x("Sub",.6,[["subLevel",-.6,.4]]),x("Attaque",.3,[["aA",-.5,4]]),x("Chaleur",.2,[["vDrive",0,.4]]),...st],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.5]]},{desc:"Triangle tendre pour deep house"}),ge("pulse","Pulse","va",{osc1Wave:4,osc1PW:.22,lfoPW:.15,lfoRate:.35,fType:0,cutoff:700,reso:.2,fEnv:2,fD:.25,aS:.8,subLevel:.3},["Impulsion","Filtre","Espace"],[x("Largeur",.3,[["osc1PW",-.17,.27]]),x("Modulation",.5,[["lfoPW",-.15,.2],["lfoRate",-1,2]]),x("Ouverture",.45,[["cutoff",-1.5,1.8]]),x("Mordant",.4,[["fEnv",-1.5,3]]),...st],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{desc:"Impulsion \xE0 largeur mouvante"}),ge("saturee","Satur\xE9e","va",{osc1Wave:0,fType:0,cutoff:900,reso:.25,fDrive:.8,vDrive:.5,fxDrive:.3,fxDriveType:1,subLevel:.5,aS:.9},["Distorsion","Filtre","Grave"],[x("Entr\xE9e",.6,[["fDrive",-.6,.2]]),x("Sortie",.4,[["vDrive",-.4,.45],["fxDrive",-.2,.4]]),x("Ouverture",.5,[["cutoff",-1.5,1.5]]),x("R\xE9sonance",.3,[["reso",-.2,.55]]),x("Sub",.5,[["subLevel",-.5,.5]]),x("Largeur",0,[["unison",0,2.4],["detune",0,18],["spread",0,.5]])],{name:"Distorsion",def:.4,map:[["vDrive",-.3,.45]]},{desc:"Scie satur\xE9e en deux \xE9tages"}),ge("yoy","Yoy","formant",{formVowel:.2,formShift:-5,formQ:.6,formMix:.3,subLevel:.7,fType:4,glide:.07,lfoForm:0,lfoBeats:.5,aS:1,aR:.1},["Voyelle","Mouvement","Grain"],[x("Voyelle",.2,[["formVowel",-.2,.8]]),x("Gorge",.5,[["formShift",-6,6]]),x("Parole",.35,[["lfoForm",0,1]]),x("Vitesse",.5,[["lfoBeats",1.5,-.375]]),x("Saturation",.3,[["vDrive",0,.6]]),x("Sub",.7,[["subLevel",-.7,.3]])],{name:"Voyelle",def:.3,map:[["formVowel",-.2,.7]]},{desc:"Basse qui articule des voyelles (axe vertical)"}),ge("stab","Stab","va",{osc1Wave:0,unison:5,detune:20,spread:.5,fType:0,cutoff:500,reso:.3,fEnv:3.5,fD:.1,aD:.22,aS:.05,aR:.08,dlMix:.12,dlBeats:.75},["Impact","Filtre","Espace"],[x("Longueur",.4,[["aD",-1,1.6],["fD",-.8,1.2]]),x("\xC9paisseur",.5,[["detune",-15,20],["unison",-3,2]]),x("Ouverture",.45,[["cutoff",-1.2,1.8]]),x("R\xE9sonance",.4,[["reso",-.25,.45]]),...st],{name:"Ouverture",def:.45,map:[["cutoff",-1,1.6]]},{desc:"Coup court et \xE9pais"}),ge("marimba","Marimba grave","sampler",{fType:1,cutoff:6e3,aS:1,aR:.25,rvSend:.06},["Bois","Espace","Grain"],[x("Douceur",.2,[["cutoff",0,-2.5]]),x("Attaque",.5,[["smpStart",0,.06]]),x("\xC9cho",0,[["dlMix",0,.3]]),x("Salle",.15,[["rvSend",-.05,.3]]),x("Grain",0,[["fxDrive",0,.45]]),x("Sub",0,[["subLevel",0,.5]])],{name:"Douceur",def:.2,map:[["cutoff",0,-2]]},{desc:"Marimba enregistr\xE9 (VCSL) dans le grave",bank:"marimba"}),ge("808montagem","808 montagem","va",{osc1Wave:3,fType:4,pEnvAmt:16,pEnvTime:.025,vDrive:.75,vDriveType:1,glide:.08,aD:1.2,aS:.5,aR:.15,fxDrive:.2,fxDriveType:1},["\xC9cr\xEAtage","Glisse","Queue"],[x("\xC9cr\xEAtage",.5,[["vDrive",-.4,.25]]),x("Mordant",.3,[["fxDrive",-.2,.5]]),x("Glisse",.45,[["glide",-2,2]]),x("Punch",.5,[["pEnvAmt",-12,10]]),x("Queue",.5,[["aD",-1.5,1.5]]),x("Tenue",.5,[["aS",-.45,.35]])],{name:"\xC9cr\xEAtage",def:.5,map:[["vDrive",-.3,.25]]},{style:"phonk",glideMode:"legato",desc:"808 tr\xE8s satur\xE9e qui glisse"}),ge("speedgarage","Speed garage","va",{osc1Wave:0,unison:2,detune:12,spread:.2,fType:0,cutoff:450,reso:.3,lfoBeats:.5,lfoCut:1.2,subLevel:.7,glide:.05,aS:.9,aR:.08,vDrive:.2},["Oscillation","Filtre","Grave"],[x("Vitesse",.5,[["lfoBeats",1.5,-.375]]),x("Profondeur",.4,[["lfoCut",-1.2,1.5]]),x("Ouverture",.4,[["cutoff",-1,2]]),x("R\xE9sonance",.4,[["reso",-.25,.45]]),x("Sub",.7,[["subLevel",-.7,.3]]),x("Saturation",.3,[["vDrive",-.2,.5]])],{name:"Ouverture",def:.4,map:[["cutoff",-1,1.8]]},{style:"ukg",desc:"Basse qui \xAB wobble \xBB pour le 2-step"}),ge("afrorond","Afro rond","fm",{fmAlgo:0,fmR1:1,fmR2:2,fmL2:1.2,fmD2:.12,fmS2:.05,fmL3:0,fmL4:0,subLevel:.5,fType:1,cutoff:3e3,aD:.6,aS:.4,aR:.12,rvSend:.05},["Pincement","Corps","Espace"],[x("Pincement",.5,[["fmL2",-1,2],["fmD2",-.5,.8]]),x("Couleur",0,[["fmR2",0,1]]),x("Longueur",.4,[["aD",-1,1.5],["aS",-.3,.4]]),x("Sub",.5,[["subLevel",-.5,.5]]),...st],{name:"Pincement",def:.4,map:[["fmL2",-.8,1.8]]},{style:"afro",desc:"Ronde et bois\xE9e, laisse respirer les percussions"}),ge("logdrum","Log drum","modal",{mdMat:3,mdDecay:.6,mdHard:.6,pEnvAmt:14,pEnvTime:.045,vDrive:.35,vDriveType:3,fType:4,aA:.001,aD:2,aS:1,aR:.25,subLevel:.25},["Glisse","Bois","Queue"],[x("Glisse",.5,[["pEnvAmt",-10,10]]),x("Vitesse",.5,[["pEnvTime",-1,1.2]]),x("Frappe",.5,[["mdHard",-.4,.4]]),x("Grain",.35,[["vDrive",-.3,.5]]),x("Queue",.5,[["mdDecay",-1.2,1.2]]),x("Sub",.25,[["subLevel",-.25,.5]])],{name:"Glisse",def:.5,map:[["pEnvAmt",-8,8]]},{style:"amapiano",desc:"Basse percussive qui chute, au c\u0153ur de l\u2019amapiano"}),ge("subperreo","Sub perreo","va",{osc1Wave:3,osc2Wave:2,osc2Semi:12,osc2Level:.25,fType:4,pEnvAmt:4,pEnvTime:.02,vDrive:.25,aD:.5,aS:.7,aR:.1},["Rondeur","Punch","Espace"],[x("Pr\xE9sence",.3,[["osc2Level",-.25,.4]]),x("Chaleur",.3,[["vDrive",-.2,.45]]),x("Punch",.4,[["pEnvAmt",-4,12]]),x("Longueur",.5,[["aD",-1,1.5]]),...st],{name:"Pr\xE9sence",def:.3,map:[["osc2Level",-.2,.4]]},{style:"reggaeton",desc:"Sub lisible m\xEAme sur petit haut-parleur"}),ge("bounce","Bounce","va",{osc1Wave:3,osc2Wave:1,osc2Level:.25,fType:1,cutoff:1400,pEnvAmt:24,pEnvTime:.015,aD:.18,aS:.3,aR:.06,vDrive:.3},["Rebond","Forme","Espace"],[x("Rebond",.5,[["pEnvAmt",-16,16],["pEnvTime",-.5,1]]),x("Longueur",.4,[["aD",-1,1.6],["aS",-.3,.5]]),x("Carr\xE9",.3,[["osc2Level",-.25,.6]]),x("Saturation",.3,[["vDrive",-.2,.5]]),...st],{name:"Rebond",def:.5,map:[["pEnvAmt",-12,12]]},{style:"jersey",desc:"Petit bond de hauteur \xE0 chaque note"}),ge("turbine","Reese turbine","va",{osc1Wave:0,unison:7,detune:22,spread:.5,osc2Wave:0,osc2Semi:-12,osc2Level:.35,fType:0,cutoff:1100,reso:.15,fDrive:.4,lfoRate:.15,lfoCut:.6,subLevel:.7,chMix:.2,aS:1,aR:.15},["Turbine","Filtre","Largeur"],[x("D\xE9saccord",.45,[["detune",-15,28]]),x("Rotation",.4,[["lfoRate",-1.5,3],["lfoCut",-.5,1]]),x("Ouverture",.45,[["cutoff",-1.5,1.6]]),x("Mordant",.4,[["fDrive",-.4,.5]]),x("Largeur",.5,[["spread",-.5,.5],["chMix",-.2,.35]]),x("Sub",.7,[["subLevel",-.7,.3]])],{name:"Ouverture",def:.45,map:[["cutoff",-1.2,1.5]]},{style:"dnb",desc:"Sept scies qui tournent, sub s\xE9par\xE9"}),ge("808rage","808 rage","va",{osc1Wave:3,osc2Wave:3,osc2Semi:12,osc2Level:.35,fType:4,pEnvAmt:12,pEnvTime:.03,vDrive:.65,vDriveType:0,glide:.1,aD:2,aS:.55,aR:.2},["Saturation","Glisse","Queue"],[x("Saturation",.5,[["vDrive",-.4,.3]]),x("Octave",.35,[["osc2Level",-.35,.4]]),x("Glisse",.5,[["glide",-2,2]]),x("Punch",.5,[["pEnvAmt",-10,12]]),x("Queue",.5,[["aD",-1.5,1.2]]),x("Tenue",.5,[["aS",-.45,.35]])],{name:"Saturation",def:.5,map:[["vDrive",-.35,.3]]},{style:"rage",glideMode:"legato",desc:"808 large avec octave, pour le rage"}),ge("acidedur","Acide dur","va",{osc1Wave:0,fType:0,cutoff:500,reso:.88,fEnv:4,fD:.14,velFilt:.7,glide:.06,aD:.22,aS:.7,aR:.05,vDrive:.4,fxDrive:.6,fxDriveType:2},["Filtre","Accent","Pli"],[x("Coupure",.4,[["cutoff",-1.5,2.2]]),x("R\xE9sonance",.8,[["reso",-.5,.1]]),x("Enveloppe",.5,[["fEnv",-2.5,3]]),x("D\xE9clin",.4,[["fD",-1.4,1.8]]),x("Pli",.5,[["fxDrive",-.5,.35]]),x("Saturation",.4,[["vDrive",-.35,.5]])],{name:"Coupure",def:.4,map:[["cutoff",-1,2.2]]},{style:"hardtechno",desc:"Acide repli\xE9, tr\xE8s agressif"}),ge("ronde","Basse ronde","va",{osc1Wave:2,subLevel:.6,fType:1,cutoff:500,aA:.015,aS:.6,aR:.18,vDrive:.35,vDriveType:3,glide:.1,dlMix:.15,dlBeats:.75,dlFb:.35,rvSend:.08,aD:.8},["Rondeur","Dub","Usure"],[x("Ouverture",.4,[["cutoff",-1,1.6],["vDrive",-.1,.25]]),x("Chaleur",.3,[["vDrive",-.2,.45]]),x("\xC9cho",.3,[["dlMix",-.15,.3],["dlFb",0,.35]]),x("Salle",.2,[["rvSend",-.08,.25]]),x("Bande",0,[["vibDepth",0,.15],["vibRate",0,-1.5]]),x("Usure",0,[["fxCrush",0,.35]])],{name:"Ouverture",def:.4,map:[["cutoff",-.8,1.4]]},{style:"triphop",desc:"Basse dub ronde avec \xE9cho"})];var De=(r,e,t,s,i,a,o,n={})=>({id:"lead."+r,name:e,engine:t,style:n.style||null,desc:n.desc||"",poly:n.poly||6,glideMode:n.glideMode||"tie",bank:n.bank,sampleSet:n.bank,p:{rvSend:.12,aR:.25,...s},groups:i,macros:a,expr:o,trim:n.trim||0}),A=(r,e,t)=>({name:r,def:e,map:t}),Re=[A("\xC9cho",.2,[["dlMix",-.15,.35],["dlFb",-.1,.3]]),A("Salle",.3,[["rvSend",-.1,.4]])],js=A("Bande",0,[["vibDepth",0,.32],["vibRate",0,-1.8],["vibDelay",0,-3],["fxLP",0,-2.2],["fxCrush",0,.12]]),je=(r,e,t,s,i,a={})=>De(r,e,"sampler",{fType:1,cutoff:9e3,reso:.05,aA:.001,aD:2,aS:1,aR:.35,...s},a.groups||["Toucher","Couleur","Espace"],a.macros||[A("Douceur",.15,[["cutoff",0,-3],["level",0,4]]),A("Attaque",0,[["smpStart",0,.08],["aA",0,7.5]]),A("Chorus",.1,[["chMix",-.1,.5]]),js,...Re],a.expr||{name:"Douceur",def:.2,map:[["cutoff",.5,-2.5],["level",-.5,3]]},{bank:t,desc:i,...a}),Gs=[De("supersaw","Supersaw","va",{osc1Wave:0,unison:7,detune:28,spread:.9,fType:1,cutoff:6e3,reso:.1,fEnv:1,fD:.5,aA:.005,aD:.6,aS:.75,aR:.35,chMix:.25,dlMix:.15,dlBeats:.75,rvSend:.2},["Essaim","Filtre","Espace"],[A("D\xE9saccord",.5,[["detune",-20,25]]),A("Largeur",.6,[["spread",-.6,.1],["width",-.5,.4]]),A("Ouverture",.5,[["cutoff",-2.2,1.2]]),A("Mordant",.3,[["fEnv",-1,3],["fD",-.8,.6]]),...Re],{name:"Ouverture",def:.5,map:[["cutoff",-1.8,1]]},{desc:"Sept scies d\xE9saccord\xE9es, large et brillant"}),De("pluck","Pluck","va",{osc1Wave:0,osc2Wave:1,osc2Level:.5,osc2Semi:12,fType:0,cutoff:900,reso:.25,fEnv:4,fD:.14,aA:.001,aD:.3,aS:0,aR:.2,dlMix:.25,dlBeats:.75,rvSend:.15},["Pincement","Filtre","Espace"],[A("Longueur",.4,[["aD",-1,1.8],["fD",-.8,1.5]]),A("Octave",.5,[["osc2Level",-.5,.5]]),A("Brillance",.5,[["cutoff",-1.5,1.8],["fEnv",-1,1]]),A("R\xE9sonance",.3,[["reso",-.2,.5]]),...Re],{name:"Brillance",def:.5,map:[["cutoff",-1.2,1.6]]},{desc:"Pincement synth\xE9tique avec \xE9cho point\xE9"}),je("piano","Piano","piano",{rvSend:.15},"Piano droit enregistr\xE9 (VCSL)"),De("rhodes","Rhodes FM","fm",{fmAlgo:1,fmR1:1,fmR2:1,fmL2:1.1,fmD2:.9,fmS2:.15,fmR3:1,fmL3:1.4,fmD3:1.5,fmS3:.3,fmR4:14,fmL4:1.6,fmD4:.06,fmS4:0,fmDetune:4,aA:.002,aD:2.5,aS:.4,aR:.4,chMix:.35,chRate:.6,lfoAmp:.12,lfoRate:4.5,rvSend:.15},["Lames","Corps","Espace"],[A("Lame",.45,[["fmL4",-1.4,2]]),A("Cloche",.4,[["fmD4",-1,2]]),A("Grain",.4,[["fmL2",-.9,1.6]]),A("Tr\xE9molo",.3,[["lfoAmp",-.12,.45],["lfoRate",-.6,.6]]),...Re],{name:"Toucher",def:.5,map:[["fmL2",-.6,1],["fmL4",-.8,.8]]},{desc:"Piano \xE9lectrique FM avec tr\xE9molo et chorus"}),je("marimba","Marimba","marimba",{rvSend:.12,dlMix:.08},"Marimba en bois (VCSL)"),je("vibraphone","Vibraphone","vibes",{lfoAmp:.3,lfoRate:5.5,rvSend:.2},"Vibraphone, moteur de tr\xE9molo r\xE9glable",{macros:[A("Douceur",.1,[["cutoff",0,-3]]),A("Moteur",.5,[["lfoAmp",-.3,.4],["lfoRate",-1.5,1]]),A("Chorus",0,[["chMix",0,.5]]),js,...Re]}),je("kalimba","Kalimba","kalimba",{rvSend:.15,dlMix:.12,dlBeats:.75},"Piano \xE0 pouces du Kenya (VCSL)"),De("verre","Cloche de verre","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:3,fmD2:2,fmS2:.1,fmR3:7,fmL3:.5,fmD3:.4,fmS3:0,fmL4:0,aA:.001,aD:3,aS:0,aR:1.2,chMix:.2,rvSend:.3},["M\xE9tal","Dur\xE9e","Espace"],[A("Rapport",.5,[["fmR2",-1.5,1.5]]),A("\xC9clat",.5,[["fmL2",-2,3],["fmL3",-.5,1.5]]),A("Dur\xE9e",.5,[["aD",-1.5,1.2],["fmD2",-1.5,1]]),A("Scintillement",0,[["fmDetune",0,12],["chMix",0,.4]]),...Re],{name:"\xC9clat",def:.5,map:[["fmL2",-1.5,2.5]]},{desc:"Cloche FM cristalline, longue r\xE9sonance"}),De("orgue","Orgue","wt",{wtTable:4,wtPos:.55,fType:4,aA:.002,aS:1,aR:.08,chMix:.45,chRate:.8,chDepth:.6,subLevel:.15,rvSend:.12},["Tirettes","Rotation","Saturation"],[A("Tirettes",.55,[["wtPos",-.55,.45]]),A("16 pieds",.15,[["subLevel",-.15,.6]]),A("Vitesse",.3,[["chRate",-.6,3]]),A("Profondeur",.6,[["chMix",-.45,.4],["chDepth",-.3,.4]]),A("Saturation",.1,[["fxDrive",0,.55]]),A("Salle",.25,[["rvSend",-.1,.35]])],{name:"Tirettes",def:.5,map:[["wtPos",-.4,.4]]},{desc:"Orgue \xE0 tirettes et cabine tournante"}),De("nappe","Nappe chaude","wt",{wtTable:6,wtPos:.4,unison:3,detune:14,spread:.8,fType:1,cutoff:2500,aA:.6,aD:1,aS:.9,aR:1.2,lfoWt:.2,lfoRate:.15,chMix:.4,rvSend:.35},["Mati\xE8re","Souffle","Espace"],[A("Mati\xE8re",.4,[["wtPos",-.4,.6]]),A("Mouvement",.3,[["lfoWt",-.2,.6],["lfoRate",-1,2]]),A("Attaque",.4,[["aA",-2.5,1.5]]),A("Ouverture",.5,[["cutoff",-1.5,1.5]]),...Re],{name:"Ouverture",def:.5,map:[["cutoff",-1.5,1.5]]},{desc:"Nappe douce qui respire",poly:6}),De("voix","Voix","formant",{formVowel:0,formShift:0,formQ:.55,formMix:.25,vibDepth:.22,vibRate:5.2,vibDelay:.35,aA:.04,aS:.9,aR:.3,chMix:.2,rvSend:.2},["Voyelle","Gorge","Espace"],[A("Voyelle",0,[["formVowel",0,1]]),A("Parole",0,[["lfoForm",0,.8],["lfoBeats",0,1]]),A("Gorge",.5,[["formShift",-7,7]]),A("Vibrato",.5,[["vibDepth",-.22,.3]]),...Re],{name:"Voyelle",def:.2,map:[["formVowel",-.2,.8]]},{desc:"Synth\xE8se de voyelles, ch\u0153ur artificiel",poly:4}),je("ocarina","Ocarina","ocarina",{vibDepth:.08,vibDelay:.4,rvSend:.18},"Ocarina souffl\xE9 (VCSL)",{poly:3}),je("saxo","Saxophone","sax",{vibDepth:.12,vibRate:5,vibDelay:.45,cutoff:7e3,rvSend:.15},"Saxophone t\xE9nor enregistr\xE9 (VCSL)",{poly:2,macros:[A("Souffle",.2,[["cutoff",0,-2.5],["noiseLevel",0,.06]]),A("Vibrato",.4,[["vibDepth",-.12,.25],["vibDelay",0,-2]]),A("Grain",0,[["fxDrive",0,.45]]),js,...Re]}),je("harmonica","Harmonica","harmonica",{vibDepth:.05,rvSend:.12},"Harmonica diatonique (VCSL)",{poly:4}),De("guitare","Guitare pinc\xE9e","pluck",{pkBright:.7,pkDamp:.35,pkDecay:2.5,pkBody:.4,fType:4,aS:1,aR:.3,chMix:.15,dlMix:.12,rvSend:.15},["Corde","Caisse","Espace"],[A("Attaque",.6,[["pkBright",-.5,.3]]),A("Sustain",.5,[["pkDecay",-1.5,1.5],["pkDamp",.2,-.25]]),A("Caisse",.4,[["pkBody",-.4,.5]]),A("Chorus",.3,[["chMix",-.15,.4]]),...Re],{name:"Attaque",def:.5,map:[["pkBright",-.4,.3]]},{desc:"Corde pinc\xE9e physique, nylon ou acier"}),je("harpe","Harpe","harp",{rvSend:.22},"Harpe de concert (VCSL)"),De("chip","Chiptune","va",{osc1Wave:4,osc1PW:.25,fType:4,vibDepth:.25,vibRate:6.5,vibDelay:.15,lfoPW:0,aA:.001,aD:.2,aS:.7,aR:.08,dlMix:.1,dlBeats:.5,rvSend:.05},["Onde","Vibrato","Espace"],[A("Largeur",.5,[["osc1PW",-.2,.25]]),A("Balayage",0,[["lfoPW",0,.22],["lfoRate",0,1]]),A("Vibrato",.4,[["vibDepth",-.25,.4]]),A("Arp\xE8ge",0,[["pEnvAmt",0,12],["pEnvTime",0,-1]]),...Re],{name:"Largeur",def:.5,map:[["osc1PW",-.2,.2]]},{desc:"Onde carr\xE9e de console 8 bits",poly:3}),De("sync","Sync","wt",{wtTable:7,wtPos:.3,wtEnv:.4,fEnv:0,fA:.002,fD:.35,fS:.2,unison:2,detune:8,spread:.6,fType:4,vDrive:.3,glide:.06,aS:.85,aR:.15,dlMix:.15,rvSend:.12},["Synchro","Mouvement","Espace"],[A("Synchro",.3,[["wtPos",-.3,.6]]),A("Balayage",.5,[["wtEnv",-.4,.5],["fD",-1,1]]),A("Vibration",0,[["lfoWt",0,.5],["lfoRate",0,1.5]]),A("Saturation",.3,[["vDrive",-.3,.5]]),...Re],{name:"Synchro",def:.3,map:[["wtPos",-.25,.6]]},{desc:"Lead synchronis\xE9 mordant, glisse sur les liaisons",poly:1}),De("cordes","Cordes synth\xE9","va",{osc1Wave:0,unison:5,detune:14,spread:.7,osc2Wave:0,osc2Semi:12,osc2Level:.3,fType:1,cutoff:3500,aA:.35,aD:1,aS:.9,aR:.9,vibDepth:.08,vibDelay:.5,chMix:.35,rvSend:.3},["Archet","Ensemble","Espace"],[A("Attaque",.4,[["aA",-2.5,1.5]]),A("Ouverture",.5,[["cutoff",-1.5,1.4]]),A("Ensemble",.5,[["detune",-10,16],["chMix",-.25,.4]]),A("Octave",.3,[["osc2Level",-.3,.5]]),...Re],{name:"Ouverture",def:.5,map:[["cutoff",-1.4,1.2]]},{desc:"Ensemble de cordes analogique"}),je("glock","Glockenspiel","glock",{rvSend:.2,dlMix:.1},"Lames de m\xE9tal brillantes (VCSL)"),De("sino","Sino montagem","fm",{fmAlgo:0,fmR1:1,fmR2:3.5,fmL2:2.2,fmD2:.35,fmS2:.1,fmR3:1.5,fmL3:.8,fmD3:.2,fmS3:0,aA:.001,aD:.8,aS:.2,aR:.3,fxDrive:.5,fxDriveType:1,dlMix:.2,dlBeats:.5,rvSend:.1},["M\xE9tal","\xC9cr\xEAtage","Espace"],[A("Rapport",.5,[["fmR2",-1.5,1.5]]),A("\xC9clat",.5,[["fmL2",-1.5,2.5]]),A("\xC9cr\xEAtage",.5,[["fxDrive",-.45,.4]]),A("Longueur",.4,[["aD",-1,1.5],["aS",-.2,.5]]),...Re],{name:"\xC9clat",def:.5,map:[["fmL2",-1.2,2]]},{style:"phonk",desc:"Cloche m\xE9tallique satur\xE9e, m\xE9lodies de montagem"}),je("stabgarage","Stab garage","clavi",{cutoff:7e3,chMix:.3,dlMix:.18,dlBeats:.75,rvSend:.12,aR:.15},"Clavisynth TX81Z enregistr\xE9, accords courts",{style:"ukg"}),je("balafon","Balafon afro","balafon",{dlMix:.2,dlBeats:.75,rvSend:.2},"Balafon (xylophone ouest-africain) avec \xE9cho",{style:"afro"}),je("keys","Keys amapiano","fmpiano",{cutoff:5e3,chMix:.45,chRate:.5,dlMix:.18,dlBeats:.75,rvSend:.25},"Piano FM TX81Z enregistr\xE9, chorus et \xE9cho",{style:"amapiano"}),je("perreo","Pluck perreo","dantranh",{fxDrive:.15,dlMix:.15,dlBeats:.5,rvSend:.12},"Cithare \u0111\xE0n tranh enregistr\xE9e (VCSL), en pincements",{style:"reggaeton"}),De("stabjersey","Stab jersey","va",{osc1Wave:0,unison:5,detune:24,spread:.8,osc2Wave:1,osc2Semi:12,osc2Level:.35,fType:1,cutoff:5e3,fEnv:2,fD:.12,pEnvAmt:2,pEnvTime:.02,aA:.001,aD:.18,aS:.1,aR:.12,rvSend:.15},["Impact","Filtre","Espace"],[A("Longueur",.4,[["aD",-1,1.8],["aS",-.1,.5]]),A("Hoquet",.4,[["pEnvAmt",-2,10]]),A("Brillance",.5,[["cutoff",-1.8,1.2]]),A("\xC9paisseur",.5,[["detune",-18,20],["osc2Level",-.35,.4]]),...Re],{name:"Brillance",def:.5,map:[["cutoff",-1.5,1.2]]},{style:"jersey",desc:"Stab brillant pour les rafales"}),De("liquide","Pad liquide","wt",{wtTable:10,wtPos:.6,unison:4,detune:10,spread:.8,fType:1,cutoff:2200,lfoCut:.6,lfoBeats:4,aA:.25,aD:1,aS:.85,aR:1.5,chMix:.35,dlMix:.15,rvSend:.45},["Mati\xE8re","Mar\xE9e","Espace"],[A("Mati\xE8re",.5,[["wtPos",-.5,.4]]),A("Ouverture",.5,[["cutoff",-1.5,1.5]]),A("Mar\xE9e",.4,[["lfoCut",-.6,1.2]]),A("Attaque",.4,[["aA",-2,1.5]]),...Re],{name:"Ouverture",def:.5,map:[["cutoff",-1.2,1.4]]},{style:"dnb",desc:"Nappe douce et mouvante pour le liquid"}),De("rage","Lead rage","va",{osc1Wave:0,unison:7,detune:32,spread:1,osc2Wave:4,osc2PW:.2,osc2Level:.4,fType:1,cutoff:7e3,pEnvAmt:-3,pEnvTime:.08,vDrive:.3,aA:.003,aD:.5,aS:.65,aR:.25,dlMix:.2,dlBeats:.5,rvSend:.18},["Essaim","Plong\xE9e","Espace"],[A("D\xE9saccord",.5,[["detune",-20,20]]),A("Saturation",.3,[["vDrive",-.3,.5]]),A("Plong\xE9e",.5,[["pEnvAmt",3,-9],["pEnvTime",-.6,1]]),A("Brillance",.6,[["cutoff",-2,.6]]),...Re],{name:"Brillance",def:.6,map:[["cutoff",-1.8,.6]]},{style:"rage",desc:"Lead large et satur\xE9 qui plonge"}),De("hurleur","Hurleur","va",{osc1Wave:0,osc2Wave:0,osc2Fine:12,osc2Level:.8,fType:0,cutoff:1200,reso:.75,fEnv:2,fD:.4,vDrive:.6,fxDrive:.3,fxDriveType:2,glide:.08,lfoRate:6,lfoCut:0,aS:1,aR:.12,dlMix:.12,rvSend:.15},["Cri","Filtre","Espace"],[A("Saturation",.5,[["vDrive",-.4,.35],["fxDrive",-.25,.4]]),A("Hurlement",0,[["lfoCut",0,1.5],["lfoRate",-1,1]]),A("Coupure",.5,[["cutoff",-1.5,2]]),A("R\xE9sonance",.7,[["reso",-.4,.2]]),...Re],{name:"Coupure",def:.5,map:[["cutoff",-1.2,1.8]]},{style:"hardtechno",desc:"Lead r\xE9sonant et repli\xE9, glisse",poly:1}),je("brume","Cloches brumeuses","chimes",{cutoff:4e3,vibDepth:.1,vibRate:.9,vibDelay:.01,fxCrush:.15,chMix:.3,rvSend:.45,dlMix:.15,dlBeats:1.5},"Cloches \xE0 main, bande us\xE9e et grande salle",{style:"triphop"})];var Ie=(r,e,t,s,i,a,o)=>({id:r,name:e,style:t,kit:s.map((n,l)=>["kick.","snare.","hat.","perc."][l]+n),rhythm:i,bass:a&&"bass."+a,lead:o&&"lead."+o}),Je=[Ie("studio","Studio",null,["club","classique","analogique","conga"],[1,1,1,3],"moog","pluck"),Ie("acoustique","Acoustique",null,["acoustique","acoustique","acoustique","toms"],[2,1,1,11],"contrebasse","piano"),Ie("organique","Organique",null,["cajon","mains","shaker","darbuka"],[3,1,2,1],"contrebasse","kalimba"),Ie("analogique","Analogique",null,["909","clap808","analogique","cloche808"],[1,1,3,8],"acide","supersaw"),Ie("lofi","Lo-fi",null,["vinyle","lofi","lofi","bloc"],[2,1,1,12],"doux","rhodes"),Ie("phonk","Phonk BR","phonk",["montagem","clapmontagem","drift","clochephonk"],[7,1,2,6],"808montagem","sino"),Ie("ukg","UK garage","ukg",["garage","garage","garage","toc"],[3,4,4,13],"speedgarage","stabgarage"),Ie("afro","Afro house","afro",["afroprofond","clapafro","shakerafro","djembe"],[1,9,9,7],"afrorond","balafon"),Ie("amapiano","Amapiano","amapiano",["pianofeutre","rimpiano","shakerpiano","logdrum"],[9,9,4,9],"logdrum","keys"),Ie("reggaeton","Perreo","reggaeton",["perreo","dembow","perreo","timbal"],[16,3,1,3],"subperreo","perreo"),Ie("jersey","Jersey club","jersey",["jersey","clapjersey","jersey","couinement"],[6,6,2,12],"bounce","stabjersey"),Ie("dnb","Drum & bass","dnb",["break","dnb","ridednb","tombreak"],[5,5,1,15],"turbine","liquide"),Ie("rage","Rage","rage",["808rage","claprage","trap","laser"],[4,7,6,12],"808rage","rage"),Ie("hardtechno","Hard techno","hardtechno",["rumble","industriel","industriel","metalindus"],[10,1,3,8],"acidedur","hurleur"),Ie("triphop","Trip-hop","triphop",["poussiere","poussiere","vinyle","boisfeutre"],[12,2,1,11],"ronde","brume")];var kt=[{id:"phonk",name:"Phonk BR \xB7 montagem",short:"Phonk BR",bpm:130,key:1,scale:"phrygian"},{id:"ukg",name:"UK garage",short:"UKG",bpm:134,key:5,scale:"minor"},{id:"afro",name:"Afro house",short:"Afro",bpm:122,key:9,scale:"minor"},{id:"amapiano",name:"Amapiano",short:"Amapiano",bpm:112,key:2,scale:"dorian"},{id:"reggaeton",name:"Reggaeton nouvelle vague",short:"Perreo",bpm:96,key:4,scale:"minor"},{id:"jersey",name:"Jersey club",short:"Jersey",bpm:142,key:7,scale:"minor"},{id:"dnb",name:"Drum & bass",short:"DnB",bpm:174,key:5,scale:"minor"},{id:"rage",name:"Rage \xB7 trap",short:"Rage",bpm:150,key:1,scale:"harmonic"},{id:"hardtechno",name:"Hard techno",short:"Hard",bpm:152,key:9,scale:"phrygian"},{id:"triphop",name:"Trip-hop atmosph\xE9rique",short:"Trip-hop",bpm:86,key:0,scale:"dorian"}];function Qe(r){return kt.find(e=>e.id===r)||null}var _i={"kick.rond":1.7,"kick.club":3.2,"kick.profond":.9,"kick.808":-.8,"kick.feutre":2.9,"kick.acoustique":-6.4,"kick.sec":.7,"kick.concert":-7.3,"kick.sature":6.2,"kick.rebond":-.1,"kick.sub":3.5,"kick.clic":1.4,"kick.vinyle":-2.6,"kick.909":-.1,"kick.boom":1.1,"kick.papier":1.8,"kick.plie":3.1,"kick.cajon":-7.1,"kick.cadre":-8,"kick.tom":-6,"kick.montagem":2.8,"kick.garage":2.6,"kick.afroprofond":2.4,"kick.pianofeutre":2.5,"kick.perreo":4.1,"kick.jersey":4.4,"kick.break":1.5,"kick.808rage":-.3,"kick.rumble":5.9,"kick.poussiere":.4,"snare.classique":-1.4,"snare.clap808":.8,"snare.rim":6.2,"snare.acoustique":-12.3,"snare.sanstimbre":-11.5,"snare.fantome":2.5,"snare.crepitant":-3.3,"snare.clapserre":.5,"snare.claplarge":-2.8,"snare.doigts":1.1,"snare.mains":-12.6,"snare.lofi":-.5,"snare.metal":-5.7,"snare.tomsnare":-2.9,"snare.balai":-.2,"snare.electro":-2.8,"snare.snareclap":-8.3,"snare.ressort":-7.1,"snare.roulement":-11.5,"snare.crossstick":-12.7,"snare.clapmontagem":-1.9,"snare.garage":-4.5,"snare.clapafro":-.7,"snare.rimpiano":-7.2,"snare.dembow":.5,"snare.clapjersey":-11.2,"snare.dnb":-10.8,"snare.claprage":-3.3,"snare.industriel":-4,"snare.poussiere":-9.6,"hat.analogique":4.9,"hat.bruit":-2.7,"hat.acoustique":-17.6,"hat.ride":-19.8,"hat.crash":-18.2,"hat.fin":3.1,"hat.sombre":.3,"hat.brillant":-1.6,"hat.lofi":5.2,"hat.tss":-8.9,"hat.shaker":-18.7,"hat.tambourin":-17.9,"hat.triangle":-20.2,"hat.cabasa":-15.6,"hat.charleston2":-17.5,"hat.clochette":-2.5,"hat.grain":-6.3,"hat.large":-4.9,"hat.pichenette":-19.1,"hat.pedale":3.6,"hat.drift":-.1,"hat.garage":1.9,"hat.shakerafro":-15.5,"hat.shakerpiano":-10.6,"hat.perreo":3.2,"hat.jersey":-.3,"hat.ridednb":-11.9,"hat.trap":6.4,"hat.industriel":-10.8,"hat.vinyle":-13.3,"perc.conga":-14.9,"perc.bongo":-15.5,"perc.cloche":-15.8,"perc.cloche808":-4.2,"perc.agogo":-17.5,"perc.claves":-17,"perc.bloc":-16.9,"perc.guiro":-16.4,"perc.timbales":-15.2,"perc.cuica":-15.9,"perc.darbuka":-15.4,"perc.cajon":-13.6,"perc.fente":-14.7,"perc.toms":-15,"perc.goutte":10.4,"perc.boisynth":12.5,"perc.tom808":-13.9,"perc.vibraslap":-16.3,"perc.enclume":-17.6,"perc.blip":6.5,"perc.clochephonk":-4.3,"perc.toc":9.2,"perc.djembe":-8.1,"perc.logdrum":-10.8,"perc.timbal":-7.2,"perc.couinement":3.1,"perc.tombreak":-7.6,"perc.laser":7,"perc.metalindus":-9.6,"perc.boisfeutre":-12.3,"bass.sub":-8.5,"bass.moog":-7.8,"bass.acide":-3.3,"bass.reese":-8.5,"bass.808":-4.6,"bass.fm":-8.6,"bass.pluck":4.1,"bass.orgue":-6.8,"bass.contrebasse":1.1,"bass.electrique":-.4,"bass.wobble":-5,"bass.hoover":-9.7,"bass.carre":-11.2,"bass.grondement":-7.1,"bass.doux":-8.2,"bass.pulse":-6.1,"bass.saturee":-12.3,"bass.yoy":-6.3,"bass.stab":.3,"bass.marimba":-10.2,"bass.808montagem":-4,"bass.speedgarage":-7.8,"bass.afrorond":-6.6,"bass.logdrum":-4.3,"bass.subperreo":-6.3,"bass.bounce":-.2,"bass.turbine":-7.9,"bass.808rage":-.3,"bass.acidedur":-11.2,"bass.ronde":-4.7,"lead.supersaw":-14.5,"lead.pluck":-5,"lead.piano":-17.4,"lead.rhodes":-11.9,"lead.marimba":-16.4,"lead.vibraphone":-15.9,"lead.kalimba":-17.3,"lead.verre":-8.9,"lead.orgue":-12.4,"lead.nappe":-16.9,"lead.voix":-9,"lead.ocarina":-16.9,"lead.saxo":-15.9,"lead.harmonica":-16.1,"lead.guitare":-7.6,"lead.harpe":-16.9,"lead.chip":-18.2,"lead.sync":-8.9,"lead.cordes":-15.7,"lead.glock":-17.7,"lead.sino":-18.3,"lead.stabgarage":-15.7,"lead.balafon":-15.6,"lead.keys":-17.1,"lead.perreo":-18.2,"lead.stabjersey":-8,"lead.liquide":-14.9,"lead.rage":-12.1,"lead.hurleur":-15.4,"lead.brume":-17.4};var Ws=[{id:"kick",name:"Kick",list:Ai},{id:"snare",name:"Snare \xB7 clap",list:Di},{id:"hat",name:"Hat",list:qi},{id:"perc",name:"Perc",list:Oi},{id:"bass",name:"Basse",list:Hs},{id:"lead",name:"M\xE9lodie",list:Gs}],wt=["kick","snare","hat","perc"],Vs=new Map;for(let r of Ws)for(let e of r.list){if(Vs.has(e.id))throw new Error("duplicate preset id "+e.id);e.family=r.id,e.trim=(e.trim||0)+(_i[e.id]||0),Vs.set(e.id,e)}function ye(r){return Vs.get(r)||null}function Ze(r){return(Ws.find(e=>e.id===r)||Ws[0]).list}function Ii(r){return Je.find(e=>e.id===r)||null}var Ct={kit:Je[0].kit,bass:Hs[0].id,lead:Gs[0].id};function Bi(r){return r?r.bank?[r.bank]:r.samples&&r.samples.length?["drums"]:[]:[]}var Ao={bass:[28,47],lead:[48,67]},Do=48;function qt(r,e=Math.random,t){let s=r.length>1&&t!==void 0?r.filter(i=>i!==t):r;return s[Math.floor(e()*s.length)%s.length]}function Po(r,e,t){let[s,i]=Ao[r],a=[];for(let o=-4;o<=4;o++){let n=Do+t+e.lo+12*o;n>=s&&n<=i&&a.push(o)}return a.length?a:[0]}function Ks(r,e="all",t=Math.random){let s={kit:null,bass:null,lead:null},i=r;(e==="all"||e==="drum")&&(s.kit=wt.map((a,o)=>qt(Ze(a),t,void 0).id),s.kit.every((a,o)=>a===i.parts.drum.kit[o])&&(s.kit[0]=qt(Ze("kick"),t,Ze("kick").find(a=>a.id===s.kit[0])).id));for(let a of["bass","lead"]){if(e!=="all"&&e!==a)continue;let o=Ze(a),n=o.find(d=>d.id===i.parts[a].preset),l=qt(o,t,n).id,c=qt(Po(a,i.parts[a].range,i.key),t);s[a]={preset:l,oct:c}}return s}function Fi(r){return[...r.kit||[],r.bass&&r.bass.preset,r.lead&&r.lead.preset].filter(Boolean)}function Ys(r,e){let t=r;e.kit&&(t.parts.drum.kit=e.kit.slice(),t.parts.drum.macros=[null,null,null,null]);for(let s of["bass","lead"]){let i=e[s];if(!i)continue;let a=t.parts[s];if(a.preset=i.preset,a.macros=null,i.oct){a.range={lo:a.range.lo+12*i.oct,n:a.range.n};for(let o of t.patterns){for(let n of o[s].notes)n.deg+=7*i.oct;if(o.gest&&o.gest[s])for(let n of o.gest[s])for(let l of n.p)l[3]+=7*i.oct}}}return t}function Ni(r=Math.random){let e=qt(kt,r),t=qt(Je,r),s=xt({tempo:e.bpm,key:Math.floor(r()*12)%12,scale:e.scale,name:"Id\xE9e au hasard"});return s.parts.drum.kit=t.kit.slice(),s.parts.drum.rhythm=t.rhythm.slice(),s.parts.bass.preset=Ze("bass")[0].id,s.parts.lead.preset=Ze("lead")[0].id,Ys(s,Ks(s,"all",r)),s}var us=He.storage+".",Co={metro:!1,metroAlways:!1,metroLevel:0,piano:!1,ghosts:!0,fluid:!0,fluidZone:"keys",fluidStyle:"spectaculaire",fluidColors:"partie",fluidInk:"libre",glass:He.fluid,fluidHdr:"intense",fluidEngine:"auto",glassTilt:!1,glassSpill:!0,glassLight:"forte",mixGlass:He.fluid,ctrlHeight:6,lightLook:"aquarelle",hdrLight:!0,glassLook:"optique"},qo=60,ds=class{constructor(){this.project=null,this.ui={part:"lead",view:"pattern",lane:0,group:0,erase:!1,playing:!1,armed:!1,tick:-1,sel:null,section:0,browse:null},this.listeners=new Map,this.undoStack=[],this.redoStack=[],this.saveTimer=null,this.dirty=!1,this.engine=null,this.lastSaved=0,this.settings={...Co};try{Object.assign(this.settings,JSON.parse(localStorage.getItem(us+"settings")||"{}"))}catch{}this.diceMark=null}setSetting(e,t){this.settings[e]=t;try{localStorage.setItem(us+"settings",JSON.stringify(this.settings))}catch{}e.startsWith("metro")&&this.send(...this.metroMessages()),this.changed("settings:"+e)}metroMessages(){let e=this.settings;return[{type:"batch",list:[{type:"set",key:"metro",value:e.metro?e.metroAlways?2:1:0},{type:"set",key:"metroLevel",value:e.metroLevel}]}]}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.listeners.get(e).delete(t)}emit(e,t){let s=this.listeners.get(e);if(s)for(let i of s)i(t)}changed(e){this.emit("change",e)}async init(){let e=null;try{let t=localStorage.getItem(us+"last");t&&(e=await Ce.get("projects",t))}catch{}if(e)try{e=Pt(e)}catch{e=null}return e||(e=this.starterProject()),this.project=e,this.ensurePresets(),vi(),e}starterProject(e){let t=e&&Je.find(a=>a.style===e)||Je[0],s=Qe(t.style),i=xt({kit:t.kit.slice(),bass:t.bass||Ct.bass,lead:t.lead||Ct.lead,tempo:s?s.bpm:118,key:s?s.key:2,scale:s?s.scale:"minor",name:s?"Id\xE9e "+s.short:"Nouvelle id\xE9e"});return i.parts.drum.rhythm=t.rhythm.slice(),i}ensurePresets(){let e=this.project,t=e.parts.drum;for(let s=0;s<4;s++)(!t.kit[s]||!ye(t.kit[s]))&&(t.kit[s]=Ct.kit[s]);(!e.parts.bass.preset||!ye(e.parts.bass.preset))&&(e.parts.bass.preset=Ct.bass),(!e.parts.lead.preset||!ye(e.parts.lead.preset))&&(e.parts.lead.preset=Ct.lead)}scheduleSave(){this.dirty=!0,clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.save(),700)}async save(){if(clearTimeout(this.saveTimer),!!this.project){this.project.updated=Date.now();try{await Ce.put("projects",JSON.parse(JSON.stringify(this.project))),localStorage.setItem(us+"last",this.project.id),this.dirty=!1,this.lastSaved=Date.now(),this.emit("saved",this.lastSaved)}catch(e){this.emit("error","Sauvegarde impossible : "+(e&&e.message||e))}}}async listProjects(){return(await Ce.all("projects")).sort((t,s)=>(s.updated||0)-(t.updated||0))}async openProject(e){await this.save();let t=await Ce.get("projects",e);if(!t)throw new Error("Projet introuvable");this.loadProject(Pt(t))}loadProject(e){this.project=e,this.ensurePresets(),this.undoStack=[],this.redoStack=[],this.ui.sel=null,this.syncAll(),this.changed("project"),this.scheduleSave()}async newProject(e){await this.save(),this.loadProject(this.starterProject(e))}planRandom(e){return Ks(this.project,e)}applyRandom(e){let t=this.undoStack[this.undoStack.length-1];(!t||t!==this.diceMark)&&this.snapshot(),Ys(this.project,e),this.syncAll(),this.changed("project"),this.scheduleSave(),this.diceMark=this.undoStack[this.undoStack.length-1]}planRandomProject(){return Ni()}async duplicateProject(){await this.save();let e=JSON.parse(JSON.stringify(this.project));e.id=yt(),e.name=this.project.name+" (copie)",e.created=e.updated=Date.now(),this.loadProject(e)}async deleteProject(e){if(await Ce.del("projects",e),this.project&&this.project.id===e){let t=await this.listProjects();t.length?this.loadProject(Pt(t[0])):this.loadProject(this.starterProject())}}rename(e){this.project.name=e.slice(0,80)||"Sans titre",this.changed("name"),this.scheduleSave()}snapshot(){this.undoStack.push(JSON.stringify(this.project)),this.undoStack.length>qo&&this.undoStack.shift(),this.redoStack.length=0,this.changed("undo")}undo(){return this.undoStack.length?(this.redoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.undoStack.pop())),!0):!1}redo(){return this.redoStack.length?(this.undoStack.push(JSON.stringify(this.project)),this.restore(JSON.parse(this.redoStack.pop())),!0):!1}restore(e){let t=this.ui.playing;this.project=e,this.syncAll(!0),this.changed("project"),this.changed("undo"),this.scheduleSave()}send(e){this.engine&&this.engine.send(e)}presetMessage(e,t){let s=this.project;if(e==="drum"){let i=ye(s.parts.drum.kit[t]);return{type:"preset",part:e,lane:t,preset:i,macros:s.parts.drum.macros[t]}}return{type:"preset",part:e,preset:ye(s.parts[e].preset),macros:s.parts[e].macros}}engineState(){let e=[];for(let t=0;t<4;t++)e.push(this.presetMessage("drum",t));return e.push(this.presetMessage("bass")),e.push(this.presetMessage("lead")),e.push({type:"project",project:this.project}),e.push({type:"erase",on:this.ui.erase}),e.push(...this.metroMessages()[0].list),e}syncAll(){this.engine&&this.engine.send({type:"batch",list:this.engineState()})}onEngine(e){let t=this.project;switch(e.type){case"pos":this.ui.tick=e.tick,this.emit("pos",e);break;case"state":this.ui.playing=e.playing,this.ui.armed=e.armed,this.changed("transport");break;case"takeStart":this.snapshot();break;case"autoStart":this.snapshot();break;case"take":{let s=t.patterns[e.pat];if(!s)break;e.part==="drum"?s.drum[e.lane].hits=e.data:s[e.part].notes=e.data,this.changed("notes"),this.scheduleSave();break}case"gest":{let s=t.patterns[e.pat];if(!s)break;s.gest=s.gest||{bass:[],lead:[],drum:[]},s.gest[e.part]=e.data,this.changed("gest"),this.scheduleSave();break}case"auto":{let s=t.patterns[e.pat];if(!s)break;e.data?(s.auto[e.target]=s.auto[e.target]||{},s.auto[e.target][e.slot]=e.data):s.auto[e.target]&&(delete s.auto[e.target][e.slot],Object.keys(s.auto[e.target]).length||delete s.auto[e.target]),this.changed("auto"),this.scheduleSave();break}case"macro":{let s=this.macrosFor(e.target,!0);s[e.slot]=Math.round(e.value*1e3)/1e3,this.changed("macro"),this.scheduleSave();break}case"section":this.ui.section=e.index,this.changed("section");break;default:break}}macrosFor(e,t){let s=this.project;if(e==="bass"||e==="lead")return!s.parts[e].macros&&t&&(s.parts[e].macros=[null,null,null,null,null,null,null]),s.parts[e].macros;let i=+e.slice(1);return!s.parts.drum.macros[i]&&t&&(s.parts.drum.macros[i]=[null,null,null,null,null,null,null]),s.parts.drum.macros[i]}macroValue(e,t){let s=this.macrosFor(e,!1);if(s&&s[t]!==null&&s[t]!==void 0)return s[t];let i=this.presetFor(e);if(t===6)return i&&i.expr&&i.expr.def!==void 0?i.expr.def:.5;let a=i&&i.macros&&i.macros[t];return a&&a.def!==void 0?a.def:.5}presetFor(e){let t=this.project;return e==="bass"||e==="lead"?ye(t.parts[e].preset):ye(t.parts.drum.kit[+e.slice(1)])}get pattern(){return this.project.patterns[this.project.current]}setPreset(e,t,s){let i=this.project;this.snapshot(),e==="drum"?(i.parts.drum.kit[t]=s,i.parts.drum.macros[t]=null):(i.parts[e].preset=s,i.parts[e].macros=null),this.send(this.presetMessage(e,t)),this.changed("preset"),this.scheduleSave()}applyKit(e,t){let s=Ii(e);if(!s)return;this.snapshot();let i=this.project;if(i.parts.drum.kit=s.kit.slice(),i.parts.drum.macros=[null,null,null,null],i.parts.drum.rhythm=s.rhythm.slice(),t){s.bass&&(i.parts.bass.preset=s.bass,i.parts.bass.macros=null),s.lead&&(i.parts.lead.preset=s.lead,i.parts.lead.macros=null);let a=Qe(s.style);a&&(i.tempo=a.bpm,i.key=a.key,i.scale=a.scale)}this.syncAll(),this.changed("project"),this.scheduleSave()}set(e,t,s={}){let i=this.project;switch(s.undo&&this.snapshot(),e){case"tempo":i.tempo=Math.round(Math.min(220,Math.max(40,t))),this.send({type:"set",key:e,value:i.tempo});break;case"swing":i.swing=Math.min(75,Math.max(50,Math.round(t))),this.send({type:"set",key:e,value:i.swing});break;case"key":i.key=(t%12+12)%12,this.send({type:"set",key:e,value:i.key});break;case"scale":i.scale=t,this.send({type:"set",key:e,value:t});break;case"bars":Mi(i,t),this.send({type:"project",project:i});break;default:break}this.changed(e),this.scheduleSave()}setPart(e,t,s,i){let a=this.project;if(e==="drum")a.parts.drum[t][i]=s,this.send({type:"set",key:t,value:s,part:e,lane:i});else{let o=a.parts[e];t==="steps"?Ri(o,s,a.scale):t==="range"?o.range=s:(o[t]=s,this.send({type:"set",key:t==="q"?"quant":t,value:s,part:e}))}this.changed(e+":"+t),this.scheduleSave()}setMix(e,t){let s=this.project;s.mix[e]=t,this.send({type:"set",key:"mix",value:{[e]:t}}),this.changed("mix"),this.scheduleSave()}setLevel(e,t,s){e==="drum"?(this.project.parts.drum.level[t]=s,this.send({type:"set",key:"level",part:e,lane:t,value:s})):(this.project.parts[e].level=s,this.send({type:"set",key:"level",part:e,value:s})),this.changed("mix"),this.scheduleSave()}setMute(e,t,s){e==="drum"?(this.project.parts.drum.mute[t]=s,this.send({type:"set",key:"mute",part:e,lane:t,value:s})):(this.project.parts[e].mute=s,this.send({type:"set",key:"mute",part:e,value:s})),this.changed("mix"),this.scheduleSave()}eraseSpan(e,t,s,i){this.snapshot();let a=this.pattern;Ns(a,e,t,s,i,!0),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearPart(e,t){this.snapshot();let s=384*this.project.bars;Ns(this.pattern,e,t,0,s,!1),this.pushPattern(e,t),this.changed("notes"),this.scheduleSave()}clearAuto(e,t){this.snapshot();let s=this.pattern;s.auto[e]&&(t===void 0?delete s.auto[e]:(delete s.auto[e][t],Object.keys(s.auto[e]).length||delete s.auto[e]));let i=t===void 0?[0,1,2,3,4,5,6]:[t];for(let a of i)this.send({type:"auto",pat:this.project.current,target:e,slot:a,data:null});this.changed("auto"),this.scheduleSave()}pushPattern(e,t){let s=this.pattern,i=this.project.current;if(s.gest&&this.send({type:"gest",pat:i,part:e,data:s.gest[e]||[]}),e==="drum"){let a=t==null?[0,1,2,3]:[t];for(let o of a)this.send({type:"pattern",pat:i,part:e,lane:o,data:s.drum[o].hits});for(let o of a)this.pushAuto("d"+o)}else this.send({type:"pattern",pat:i,part:e,data:s[e].notes}),this.pushAuto(e)}pushAuto(e){let t=this.pattern,s=this.project.current;for(let i=0;i<7;i++)this.send({type:"auto",pat:s,target:e,slot:i,data:t.auto[e]&&t.auto[e][i]?t.auto[e][i]:null})}selectPattern(e){let t=this.project;e<0||e>=t.patterns.length||(t.current=e,this.send({type:"set",key:"current",value:e}),this.changed("pattern"),this.scheduleSave())}addPattern(e){let t=this.project;if(t.patterns.length>=8)return;this.snapshot();let s=String.fromCharCode(65+t.patterns.length),i=e!==void 0?{...JSON.parse(JSON.stringify(t.patterns[e])),name:s}:bt(s);t.patterns.push(i),t.current=t.patterns.length-1,this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave()}deletePattern(e){let t=this.project;t.patterns.length<=1||(this.snapshot(),t.patterns.splice(e,1),t.patterns.forEach((s,i)=>{s.name=String.fromCharCode(65+i)}),t.song.sections=t.song.sections.filter(s=>s.p!==e).map(s=>({...s,p:s.p>e?s.p-1:s.p})),t.current=Math.min(t.current,t.patterns.length-1),t.song.sections.length||(t.song.enabled=!1),this.send({type:"project",project:t}),this.changed("pattern"),this.scheduleSave())}setSong(e,t=!0){t&&this.snapshot(),this.project.song=e,this.send({type:"set",key:"song",value:e}),this.changed("song"),this.scheduleSave()}autoArrange(){let e=this.project,t=0,s=e.patterns.length>1?1:0,i=(o,n,l={})=>({p:o,reps:n,mute:l}),a=[i(t,2,{d0:!0,bass:!0,lead:!0}),i(t,2,{lead:!0}),i(s,4),i(t,2,{d0:!0,d1:!0,bass:!0}),i(s,4),i(t,2,{bass:!0,d2:!0,d3:!0})];this.setSong({enabled:!0,sections:a})}setErase(e){this.ui.erase=e,this.send({type:"erase",on:e}),this.changed("erase")}exportProjectJSON(){return JSON.stringify({...this.project,app:"MOTIF 3",exported:new Date().toISOString()},null,1)}importProjectText(e){let t=JSON.parse(e),s=Pt(t);return s.id=yt(),s.updated=Date.now(),this.loadProject(s),s}async backupAll(){let e=await Ce.all("projects");return JSON.stringify({format:"motif-3-backup",exported:new Date().toISOString(),projects:e},null,1)}async restoreBackup(e){let t=JSON.parse(e);if(t.format!=="motif-3-backup"||!Array.isArray(t.projects))throw new Error("Sauvegarde non reconnue");let s=0;for(let i of t.projects)try{let a=Pt(i);await Ce.put("projects",a),s++}catch{}return s}};var fs=class{constructor({workletUrl:e,onMessage:t,onState:s}){this.workletUrl=e,this.onMessage=t,this.onState=s||(()=>{}),this.ctx=null,this.node=null,this.ready=!1,this.starting=null,this.samples=new Map,this.sampleSets=[],this.loadedBanks=new Set,this.replay=()=>[],this.queue=[],this.lastFrameCheck=0,this.setSessionType()}setSessionType(){try{"audioSession"in navigator&&(navigator.audioSession.type="playback")}catch{}}get running(){return!!(this.ctx&&this.ctx.state==="running"&&this.ready)}start(){return this.running?Promise.resolve(!0):this.ctx&&this.ready&&this.ctx.state!=="closed"?this.ctx.resume().then(()=>this.ctx.state==="running"):this.starting?this.starting:(this.starting=this.build().finally(()=>{this.starting=null}),this.starting)}async build(){this.setSessionType();let e=window.AudioContext||window.webkitAudioContext,t=new e({latencyHint:"interactive"});this.ctx=t;let s=t.resume();t.onstatechange=()=>this.onState(t.state),await t.audioWorklet.addModule(this.workletUrl);let i=new AudioWorkletNode(t,"motif-engine",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]});i.port.onmessage=n=>this.receive(n.data),i.onprocessorerror=()=>{this.ready=!1,this.onState("error")},i.connect(t.destination),this.node=i;let a=Array.from(this.samples.values());a.length&&i.port.postMessage({type:"samples",list:a}),this.sampleSets.length&&i.port.postMessage({type:"sampleSets",sets:this.sampleSets});let o=this.replay();o.length&&i.port.postMessage({type:"batch",list:o});for(let n of this.queue)i.port.postMessage(n);this.queue.length=0,this.ready=!0;try{await s}catch{}return this.onState(t.state),t.state==="running"}async rebuild(){let e=this.ctx;if(this.ready=!1,this.node=null,this.ctx=null,e)try{await e.close()}catch{}return this.start()}receive(e){if(e){if(e.type==="batch"){for(let t of e.list)this.onMessage(t);return}this.onMessage(e)}}send(e){this.node&&this.ready?this.node.port.postMessage(e):e.type==="project"||e.type==="preset"||e.type==="set"||e.type==="macro"||e.type==="pattern"||e.type}suspend(){return this.ctx&&this.ctx.state==="running"?this.ctx.suspend().catch(()=>{}):Promise.resolve()}async probe(e=350){if(!this.ctx)return!1;let t=this.ctx.currentTime;return await new Promise(s=>setTimeout(s,e)),this.ctx.state==="running"&&this.ctx.currentTime>t}async loadBank(e,t){if(this.loadedBanks.has(e))return;let s=await fetch(e);if(!s.ok)throw new Error("Banque introuvable : "+e);let i=await s.json(),a=e.slice(0,e.lastIndexOf("/")+1),o=this.ctx||new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(1,1,48e3),n=0,l=[],c=i.samples.map(async d=>{if(this.samples.has(d.id))return;let h=await fetch(a+d.file);if(!h.ok)throw new Error("Son manquant : "+d.file);let v=await h.arrayBuffer(),f=await Oo(o,v),m=f.getChannelData(0),p;if(f.numberOfChannels>1){let k=f.getChannelData(1);p=new Float32Array(m.length);for(let T=0;T<p.length;T++)p[T]=.5*(m[T]+k[T])}else p=new Float32Array(m);let b=new Float32Array(p.length+4);b.set(p,1);let y={id:d.id,sr:f.sampleRate,data:b,gain:d.gain||1,loopStart:d.loopStart?d.loopStart*f.sampleRate/d.sr+1:0,loopEnd:d.loopEnd?d.loopEnd*f.sampleRate/d.sr+1:0};this.samples.set(d.id,y),l.push(y),n++,t&&t(n/i.samples.length)});if(await Promise.all(c),i.sets)for(let d of i.sets)this.sampleSets.find(h=>h.id===d.id)||this.sampleSets.push(d);this.loadedBanks.add(e),this.node&&this.ready&&(l.length&&this.node.port.postMessage({type:"samples",list:l}),this.node.port.postMessage({type:"sampleSets",sets:this.sampleSets}))}};function Oo(r,e){return new Promise((t,s)=>{let i=r.decodeAudioData(e,t,s);i&&i.then&&i.then(t,s)})}function u(r,e,...t){let s=document.createElement(r);if(e)for(let i in e){let a=e[i];if(!(a==null||a===!1))if(i==="class")s.className=a;else if(i==="html")s.innerHTML=a;else if(i==="text")s.textContent=a;else if(i.startsWith("on"))s.addEventListener(i.slice(2),a);else if(i==="style"&&typeof a=="object")for(let o in a)o.startsWith("--")?s.style.setProperty(o,a[o]):s.style[o]=a[o];else s.setAttribute(i,a===!0?"":a)}for(let i of t.flat())i!=null&&i!==!1&&s.append(i.nodeType?i:document.createTextNode(String(i)));return s}function _o(r){let e=document.createElement("template");return e.innerHTML=r.trim(),e.content.firstChild}var oe=(r,e="")=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${e}>${r}</svg>`,Io={logo:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="9" width="3.2" height="6" rx="1.6" fill="var(--drum)"/><rect x="7" y="5" width="3.2" height="14" rx="1.6" fill="var(--bass)"/><rect x="12" y="2" width="3.2" height="20" rx="1.6" fill="var(--lead)"/><rect x="17" y="7" width="3.2" height="10" rx="1.6" fill="currentColor" opacity=".55"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" fill="currentColor"/></svg>',stop:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor"/></svg>',rec:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.5"/></svg>',undo:oe('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'),redo:oe('<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>'),erase:oe('<path d="m7 21-4.3-4.3a1.5 1.5 0 0 1 0-2.1L13.4 3.9a1.5 1.5 0 0 1 2.1 0l4.6 4.6a1.5 1.5 0 0 1 0 2.1L10 21"/><path d="M22 21H7"/><path d="m5.5 12 6.5 6.5"/>'),trash:oe('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>'),left:oe('<path d="m15 18-6-6 6-6"/>'),right:oe('<path d="m9 18 6-6-6-6"/>'),down:oe('<path d="m6 9 6 6 6-6"/>'),close:oe('<path d="M18 6 6 18M6 6l12 12"/>'),plus:oe('<path d="M12 5v14M5 12h14"/>'),check:oe('<path d="M20 6 9 17l-5-5"/>'),more:oe('<circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/>'),drum:oe('<circle cx="7" cy="8" r="1.4" fill="currentColor"/><circle cx="12" cy="8" r="1.4" fill="currentColor"/><circle cx="17" cy="8" r="1.4" fill="currentColor"/><circle cx="7" cy="14" r="1.4" fill="currentColor"/><circle cx="12" cy="14" r="1.4" fill="currentColor"/><circle cx="17" cy="14" r="1.4" fill="currentColor"/>','stroke-width="1"'),bass:oe('<path d="M2 13c2.5 0 2.5-6 5-6s2.5 10 5 10 2.5-10 5-10 2.5 6 5 6"/>'),lead:oe('<path d="M3 15l4-7 4 9 4-11 3 7h3"/>'),pattern:oe('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 4v16M13 4v16M18 4v16" opacity=".55"/>'),tweaks:oe('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="9" cy="10" r="2.2"/><circle cx="15" cy="15" r="2.2"/>'),mix:oe('<path d="M6 4v16M12 4v16M18 4v16"/><rect x="4" y="13" width="4" height="3" rx="1" fill="currentColor"/><rect x="10" y="7" width="4" height="3" rx="1" fill="currentColor"/><rect x="16" y="11" width="4" height="3" rx="1" fill="currentColor"/>'),song:oe('<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="18" r="2"/>'),share:oe('<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'),download:oe('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'),folder:oe('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),file:oe('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),note:oe('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),sun:oe('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),moon:oe('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),info:oe('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),wifi:oe('<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>'),copy:oe('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),sparkle:oe('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>'),speaker:oe('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),metro:oe('<path d="M9.2 3h5.6l4.2 18H5z"/><path d="M12 15.5 17.5 6"/><path d="M8 15.5h8"/>'),dice:oe('<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none"/>'),piano:oe('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 13v7M15 13v7"/><rect x="7.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/><rect x="13.6" y="4" width="2.8" height="9" rx=".6" fill="currentColor" stroke="none"/>'),settings:oe('<path d="M4 7h9M18 7h2M4 17h3M12 17h8"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="9.5" cy="17" r="2.3"/>'),touch:oe('<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="7.5" opacity=".55"/>'),pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.3" fill="currentColor"/></svg>'};function K(r){return _o(Io[r])}function Bo(){return Math.min(window.devicePixelRatio||1,2.5)}function it(r){let e=r.getBoundingClientRect(),t=Bo(),s=Math.max(1,Math.round(e.width*t)),i=Math.max(1,Math.round(e.height*t));return(r.width!==s||r.height!==i)&&(r.width=s,r.height=i),{w:e.width,h:e.height,d:t}}function Te(r,e=document.querySelector(".app")||document.documentElement){return getComputedStyle(e).getPropertyValue(r).trim()}function Ui(r,{get:e,set:t,step:s=12,axis:i="y",onStart:a,onEnd:o,onTap:n}){let l=null;r.addEventListener("pointerdown",d=>{d.preventDefault();try{r.setPointerCapture(d.pointerId)}catch{}l={x:d.clientX,y:d.clientY,v:e(),moved:!1,id:d.pointerId},a&&a()}),r.addEventListener("pointermove",d=>{if(!l||d.pointerId!==l.id)return;let h=i==="y"?l.y-d.clientY:d.clientX-l.x;Math.abs(h)>4&&(l.moved=!0),l.moved&&t(l.v+Math.round(h/s),d)});let c=d=>{if(!l||d.pointerId!==l.id)return;let h=l;l=null,!h.moved&&n&&n(d),o&&o()};r.addEventListener("pointerup",c),r.addEventListener("pointercancel",c)}var Ye=class{constructor(e){this.o=e,this.el=u("div",{class:"dial",role:"slider",tabindex:"0","aria-label":e.label}),this.cv=u("canvas"),this.vEl=u("div",{class:"v"}),this.lEl=u("div",{class:"l",text:e.label}),this.sEl=u("div",{class:"s"}),this.el.append(this.cv,this.vEl,this.lEl,this.sEl);let t=null;this.el.addEventListener("pointerdown",i=>{i.preventDefault();try{this.el.setPointerCapture(i.pointerId)}catch{}t={x:i.clientX,y:i.clientY,v:this.o.get(),id:i.pointerId,moved:!1,axis:null},this.el.classList.add("active"),e.onStart&&e.onStart()}),this.el.addEventListener("pointermove",i=>{if(!t||i.pointerId!==t.id)return;let a=i.clientX-t.x,o=t.y-i.clientY;if(!t.axis&&Math.hypot(a,o)>8&&(t.axis=Math.abs(a)>Math.abs(o)*1.3?"x":"y"),t.axis==="x"&&e.onSwipeX&&!t.swiped&&Math.abs(a)>26&&(t.swiped=!0,e.onSwipeX(a>0?1:-1),t.v=this.o.get(),t.y=i.clientY,t.axis="y2"),t.axis==="y"||t.axis==="y2"){t.moved=!0;let n=e.step||14,l=Math.max(e.min(),Math.min(e.max(),t.v+Math.round(o/n)));l!==this.o.get()&&(this.o.set(l),this.render())}});let s=i=>{if(!t||i.pointerId!==t.id)return;let a=t;t=null,this.el.classList.remove("active"),!a.axis&&e.onTap&&e.onTap(),e.onEnd&&e.onEnd()};this.el.addEventListener("pointerup",s),this.el.addEventListener("pointercancel",s),this.el.addEventListener("keydown",i=>{let a=i.key==="ArrowUp"||i.key==="ArrowRight"?1:i.key==="ArrowDown"||i.key==="ArrowLeft"?-1:0;if(a){i.preventDefault();let o=Math.max(e.min(),Math.min(e.max(),this.o.get()+a));this.o.set(o),this.render()}else(i.key==="Enter"||i.key===" ")&&e.onTap&&(i.preventDefault(),e.onTap())})}render(){let e=this.o,t=e.format(e.get());this.vEl.textContent=t.v,this.sEl.textContent=t.s||"",t.l!==void 0&&(this.lEl.textContent=t.l),this.el.setAttribute("aria-valuenow",String(e.get())),this.el.setAttribute("aria-valuetext",`${t.v} ${t.s||""}`.trim()),this.el.classList.toggle("ties",!!t.ties);let{w:s,h:i,d:a}=it(this.cv),o=this.cv.getContext("2d");o.setTransform(a,0,0,a,0,0),o.clearRect(0,0,s,i),e.ring&&e.ring(o,s,i,e.get())}};function Xs(r,e,t,s,i,a,o,n){let l=e/2,c=t/2-2,d=Math.min(e,t)/2-8;if(r.lineCap="round",r.strokeStyle=n,r.lineWidth=1,r.beginPath(),r.arc(l,c,d,0,Math.PI*2),r.stroke(),!s||!s.len){r.strokeStyle=o,r.lineWidth=3,r.globalAlpha=.6,r.beginPath(),r.arc(l,c,d,-Math.PI/2,Math.PI*1.5),r.stroke(),r.globalAlpha=1;return}let h=v=>-Math.PI/2+v/s.len*Math.PI*2;if(s.ev.forEach(([v,f,m],p)=>{let b=h(v),y=h(Math.min(v+f,s.len))-.02;if(r.strokeStyle=o,r.lineWidth=m?5:3.5,r.beginPath(),r.arc(l,c,d,b+.03,Math.max(b+.06,y)),r.stroke(),i&&i.includes(p)){let k=s.ev[(p-1+s.ev.length)%s.ev.length];r.strokeStyle=o,r.lineWidth=2,r.globalAlpha=.9,r.beginPath(),r.arc(l,c,d-8,h(k[0])+.05,b-.02+(p===0?Math.PI*2:0)),r.stroke(),r.globalAlpha=1,r.fillStyle=o,r.beginPath(),r.arc(l+Math.cos(b)*(d-8),c+Math.sin(b)*(d-8),2.6,0,Math.PI*2),r.fill()}}),a>=0){let v=h(a);r.fillStyle=Te("--ink"),r.beginPath(),r.arc(l+Math.cos(v)*d,c+Math.sin(v)*d,3,0,Math.PI*2),r.fill()}}var St=gt.lo,Xt=gt.hi,Fo=gt.maxN;function $t(r,e){let t=48+e+r;return nt[(t%12+12)%12]+(Math.floor(t/12)-1)}var ps=class{constructor({get:e,set:t,scale:s,onStart:i}){this.get=e,this.set=t,this.scale=s,this.onStart=i,this.el=u("div",{class:"range",role:"group","aria-label":"Plage de notes",tabindex:"0"}),this.cv=u("canvas"),this.lbl=u("div",{class:"lbl"}),this.el.append(this.cv,this.lbl),this.drag=null,this.el.addEventListener("pointerdown",a=>this.down(a)),this.el.addEventListener("pointermove",a=>this.move(a)),this.el.addEventListener("pointerup",a=>this.up(a)),this.el.addEventListener("pointercancel",a=>this.up(a)),this.el.addEventListener("keydown",a=>this.key(a))}x2semi(e){return St+e/this.w*(Xt-St)}semi2x(e){return(e-St)/(Xt-St)*this.w}notes(){let{scale:e,steps:t}=this.scale();return ns(e,t)}windowPx(){let{scale:e,steps:t}=this.scale(),s=this.get(),i=rt(s,e,t),a=i[0].semi,o=i[i.length-1].semi;return{x0:this.semi2x(a-.45),x1:this.semi2x(o+.55),lo:a,hi:o,cols:i}}nearestNote(e){let t=this.notes(),s=t[0],i=1/0;for(let a of t){let o=Math.abs(a-e);o<i&&(i=o,s=a)}return s}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.el.getBoundingClientRect(),s=e.clientX-t.left,i=this.windowPx(),a=Math.max(18,Math.min(30,(i.x1-i.x0)*.25)),o;Math.abs(s-i.x0)<=a&&s<(i.x0+i.x1)/2?o="left":Math.abs(s-i.x1)<=a&&s>(i.x0+i.x1)/2?o="right":s>i.x0&&s<i.x1?o="move":o="jump";let n=this.get();this.drag={id:e.pointerId,mode:o,x0:s,lo:i.lo,hi:i.hi,n:n.n,moved:!1},this.onStart&&this.onStart(),o==="jump"&&this.jumpTo(s,n.n),this.render()}jumpTo(e,t){let{scale:s,steps:i}=this.scale(),a=this.notes(),o=this.x2semi(e),n=0,l=1/0;a.forEach((d,h)=>{let v=Math.abs(d-o);v<l&&(l=v,n=h)});let c=Bs({lo:a[Math.max(0,n-Math.floor(t/2))],n:t},a[Math.max(0,n-Math.floor(t/2))],s,i);this.set(c),this.drag.lo=c.lo,this.drag.mode="move",this.drag.x0=e}move(e){let t=this.drag;if(!t||e.pointerId!==t.id)return;let s=this.el.getBoundingClientRect(),i=e.clientX-s.left;Math.abs(i-t.x0)>3&&(t.moved=!0);let a=(i-t.x0)/this.w*(Xt-St),{scale:o,steps:n}=this.scale(),l=this.get(),c;t.mode==="move"?c=Bs({lo:t.lo,n:t.n},t.lo+a,o,n):t.mode==="left"?c=Fs({lo:t.lo,n:t.n},"left",t.lo+a,o,n):t.mode==="right"&&(c=Fs({lo:t.lo,n:t.n},"right",t.hi+a,o,n)),c&&(c.lo!==l.lo||c.n!==l.n)&&this.set(c),this.render()}up(e){this.drag&&e.pointerId===this.drag.id&&(this.drag=null,this.render())}key(e){let t=this.notes(),s=this.get(),i=t.indexOf(this.nearestNote(s.lo));if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();let a=e.key==="ArrowRight"?1:-1;if(e.shiftKey)this.set({lo:s.lo,n:Math.max(1,Math.min(Fo,s.n+a))});else{let o=Math.max(0,Math.min(t.length-s.n,i+a));this.set({lo:t[o],n:s.n})}this.render()}}render(){let{w:e,h:t,d:s}=it(this.cv);this.w=e,this.h=t;let i=this.cv.getContext("2d");i.setTransform(s,0,0,s,0,0),i.clearRect(0,0,e,t);let{scale:a,steps:o,key:n}=this.scale(),l=Te("--accent"),c=Te("--ink"),d=Te("--ink-3"),h=document.documentElement.dataset.theme==="dark",v=6,f=t-18;for(let T=Math.floor(St/12);T<Math.ceil(Xt/12);T++){let R=this.semi2x(T*12-.5),O=this.semi2x(T*12+11.5);i.fillStyle=T%2===0?h?"rgba(255,255,255,0.045)":"rgba(0,0,0,0.045)":"rgba(0,0,0,0)",i.fillRect(R,v,O-R,f-v)}let m=this.windowPx(),p=9;i.fillStyle=l,i.globalAlpha=h?.22:.3,Le(i,m.x0,v-2,m.x1-m.x0,f-v+4,p),i.fill(),i.globalAlpha=1,i.strokeStyle=l,i.lineWidth=2,Le(i,m.x0,v-2,m.x1-m.x0,f-v+4,p),i.stroke();let b=this.notes(),y=e/(Xt-St);for(let T of b){let R=this.semi2x(T),O=T>=m.lo&&T<=m.hi,H=(T%12+12)%12===0,le=Math.floor(T/12);i.fillStyle=O?c:d,i.globalAlpha=O?le%2===0?1:.72:.35;let Q=Math.max(2,Math.min(y*.55,6)),P=H?f-v-4:(f-v)*.62;Le(i,R-Q/2,f-2-P,Q,P,Q/2),i.fill(),i.globalAlpha=1}i.fillStyle=l;for(let T of[m.x0,m.x1])Le(i,T-3.5,v+(f-v)/2-11,7,22,3.5),i.fill();this.drag&&(i.fillStyle=l,i.globalAlpha=.12,i.fillRect(0,0,e,t),i.globalAlpha=1);let k=m.cols.length;this.lbl.textContent=`${$t(m.lo,n)} \u2192 ${$t(m.hi,n)} \xB7 ${k} note${k>1?"s":""}`,this.el.setAttribute("aria-label","Plage de notes : "+this.lbl.textContent)}};function Le(r,e,t,s,i,a){a=Math.max(0,Math.min(a,s/2,i/2)),r.beginPath(),r.moveTo(e+a,t),r.lineTo(e+s-a,t),r.quadraticCurveTo(e+s,t,e+s,t+a),r.lineTo(e+s,t+i-a),r.quadraticCurveTo(e+s,t+i,e+s-a,t+i),r.lineTo(e+a,t+i),r.quadraticCurveTo(e,t+i,e,t+i-a),r.lineTo(e,t+a),r.quadraticCurveTo(e,t,e+a,t),r.closePath()}function $s(r){return Array.from({length:r},(e,t)=>({x0:t/r,y0:0,x1:(t+1)/r,y1:1}))}function zi(r){let{keys:e,whites:t}=r,s=[];for(let a of e)a.black||s.push({x0:a.pos/t,y0:0,x1:(a.pos+1)/t,y1:1});let i=At/t/2;for(let a of e)a.black&&s.push({x0:a.pos/t-i,y0:0,x1:a.pos/t+i,y1:ft,cut:!0});return s}var Tt={plain:0,shaded:1,white:2,black:3,laneEven:4,laneOdd:5};function Ot(r){if(r=(r||"").trim(),r.startsWith("color(")){let t=r.match(/[\d.]+/g).map(Number);return[t[t.length-3],t[t.length-2],t[t.length-1]].map(s=>s>1?s/255:s)}if(r.startsWith("#"))return(r.length===4?r.slice(1).split("").map(s=>s+s):[r.slice(1,3),r.slice(3,5),r.slice(5,7)]).map(s=>parseInt(s,16)/255);let e=r.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[0,0,0]}function No(r,e,t,s){let i=n=>[1,1,1,n],a=n=>[0,0,0,n],o=n=>[...e,n];return s?[i(0),i(.03),i(.06),[.035,.015,.055,.72],i(0),i(.025)]:r?[i(0),i(.035),i(.075),[.031,.035,.047,1],i(0),i(.03)]:t==="aquarelle"?[a(0),a(.03),i(.55),[.16,.14,.13,.93],a(0),a(.025)]:t==="vitrail"?[a(.02),i(.16),i(.4),o(.9),i(.12),a(.03)]:[a(.035),i(.13),i(.34),o(.88),i(.1),a(.04)]}var Hi={classique:0,aquarelle:1,vitrail:2},ji=(r,e,t)=>r.map((s,i)=>s+(e[i]-s)*t);function Js({kind:r,keys:e,sig:t,el:s,glass:i,hdr:a,slabs:o,fills:n,spill:l=0,radius:c,look:d="aquarelle",gel:h=1,glassLook:v="optique"}){let f=getComputedStyle(s.closest(".app")||document.documentElement),m=document.documentElement.dataset.theme!=="light",p=document.documentElement.hasAttribute("data-halloween"),b=Ot(f.getPropertyValue("--accent")),y=Ot(f.getPropertyValue("--accent-ink"));(m||!(d in Hi))&&(d=m?"dark":"aquarelle");let k=d==="aquarelle",T=m?[26/255,28/255,35/255]:k?[.98,.965,.933]:d==="vitrail"?ji(b,[1,1,1],.35):b,R=m?[18/255,19/255,24/255]:k?[.945,.918,.871]:d==="vitrail"?ji(b,[1,1,1],.1):b,O=k?[.25,.2,.15,e&&e.length<=4?.18:.12]:r==="pad"&&e&&e.length<=4?m?[1,1,1,.1]:[0,0,0,.12]:m?[1,1,1,.06]:[0,0,0,.07],H=c||parseFloat(getComputedStyle(s).borderTopLeftRadius)||20,le=Ot(f.getPropertyValue("--surface")),Q=Ot(f.getPropertyValue("--bg")),P=i?m?1:.6:0;return{kind:r,keys:e,dark:m,accent:b,bgTop:T,bgBot:R,sep:O,sepPx:e&&e.length<=4?2:1,kinds:No(m,y,d,p),glass:!!i,hdr:a||1,radius:H,surf:le,appBg:Q,slabs:o||[[0,0,1,1]],fills:n||[],spill:i?l:0,shadow:P,style:m?0:Hi[d],gel:h,glassLook:v,keyGlow:m||k?[...b,k?.55:.5]:[1,1,1,.55],sig:`${r}|${t}|${m}|${p}|${d}|${h}|${v}|${b.join()}|${i}|${a}|${H}|${l}|${JSON.stringify(o||0)}|${JSON.stringify(n||0)}`}}function ms(r,e,t,s){r.width=t,r.height=s;let i=r.getContext("2d");return i.imageSmoothingEnabled=!1,i.fillStyle="#000",i.fillRect(0,0,t,s),(e||[]).forEach((a,o)=>{let n=Math.round(a.x0*t),l=Math.round(a.x1*t),c=Math.round(a.y0*s),d=Math.round(a.y1*s);a.cut&&(i.fillStyle="#000",i.fillRect(n-1,c,l-n+2,d-c+1)),i.fillStyle=`rgb(${o+1},${(a.kind||0)*40},0)`,i.fillRect(n,c,Math.max(1,l-n),Math.max(1,d-c))}),r}function Jt(r,e,t,s){r.width=t,r.height=s;let i=r.getContext("2d");if(i.imageSmoothingEnabled=!1,!e)return i.fillStyle="rgb(1,0,0)",i.fillRect(0,0,t,s),r;i.fillStyle="#000",i.fillRect(0,0,t,s);let a=Math.max(1,Math.round(t/180));return e.forEach((o,n)=>{let l=Math.round(o.x0*t),c=Math.round(o.x1*t),d=Math.round(o.y0*s),h=Math.round(o.y1*s);o.cut&&(i.fillStyle="#000",i.fillRect(l-a,d,c-l+2*a,h-d+a)),i.fillStyle=`rgb(${n+1},0,0)`,i.fillRect(l+a,d+(o.y0>0?a:0),Math.max(1,c-l-2*a),Math.max(1,h-d-(o.y0>0?a:0)-(o.y1<1?a:0)))}),r}var vs=class{constructor(e,t={}){this.store=e,this.opts=t,this.el=u("div",{class:"pad",role:"application","aria-label":"Surface de jeu"}),this.cv=u("canvas"),this.hint=u("div",{class:"hint"},u("b",{text:"\xC0 toi de jouer."}),u("span",{text:""})),this.axY=u("div",{class:"ax y"}),this.el.append(this.cv,this.hint,this.axY),this.touches=new Map,this.ripples=[],this.level=0,this.raf=0,this.flash=new Map,this.ghosts=[],this.fx=null,this.ghouls=null,this.gpu=!1,this.under=!1,this.inkUnder=!1,this.pianoCache=null,this.el.addEventListener("pointerdown",s=>this.down(s)),this.el.addEventListener("pointermove",s=>this.move(s)),this.el.addEventListener("pointerup",s=>this.up(s)),this.el.addEventListener("pointercancel",s=>this.up(s,!0)),this.el.addEventListener("lostpointercapture",s=>{this.touches.has(s.pointerId)&&this.up(s,!0)}),this.el.addEventListener("contextmenu",s=>s.preventDefault()),this.ro=new ResizeObserver(()=>this.draw()),this.ro.observe(this.el)}get part(){return this.store.ui.part}columns(){let e=this.store.project,t=e.parts[this.part];return rt(t.range,e.scale,t.steps)}get piano(){return this.part!=="drum"&&!!this.store.settings.piano}pianoLayout(){let e=this.store.project,t=e.parts[this.part],s=`${t.range.lo}:${t.range.n}:${e.scale}:${t.steps}:${e.key}`;return(!this.pianoCache||this.pianoCache.k!==s)&&(this.pianoCache={k:s,L:yi(t.range,e.scale,t.steps,e.key)}),this.pianoCache.L}inkShare(){return this.fx&&this.store.settings.fluid?.4:1}keyLayout(){if(this.part==="drum")return{sig:"drum",keys:$s(4).map((i,a)=>({...i,kind:a%2?Tt.laneOdd:Tt.laneEven}))};if(this.piano){let i=this.pianoLayout();return{sig:"piano:"+this.pianoCache.k,keys:zi(i).map(a=>({...a,kind:a.cut?Tt.black:Tt.white}))}}let e=this.columns(),t=e.length,s=i=>(i.octave%2+2)%2===0;return{sig:"cols:"+t+":"+e.map(i=>s(i)?1:0).join(""),keys:$s(t).map((i,a)=>({...i,kind:s(e[a])?Tt.shaded:Tt.plain}))}}pitchClass(e,t){let s=this.store.project;return((s.key+vt(e,t,s.scale))%12+12)%12}keyBox(e,t){if(!t.black)return{x0:t.pos/e.whites,w:1/e.whites};let s=At/e.whites/2;return{x0:t.pos/e.whites-s,w:2*s}}setClock(e){this.clock=e,e.playing&&this.hasStrokes()&&this.kick()}playingPattern(){let e=this.clock,t=this.store.project;return e&&t.patterns[e.pat]||this.store.pattern}hasStrokes(e=this.part){let t=this.playingPattern().gest;return!!(t&&t[e]&&t[e].length)}clockTick(e){let t=this.clock;if(!t||!t.playing||t.tick<0)return-1;let s=Math.min(120,e-t.at)/t.msPerTick;return(t.tick+s)%t.L}pointToPad(e,t,s){if(e==="drum")return{x:(t+s[1])/4,y:1-s[2]};let i=this.store.project.scale,a=vt(s[3],s[4],i);if(this.piano){let c=this.pianoLayout(),d=c.keys.find(v=>v.semi===a);if(!d)return null;let h=this.keyBox(c,d);return{x:h.x0+s[1]*h.w,y:(1-s[2])*(d.black?ft:1)}}let o=this.columns(),n=-1,l=3;return o.forEach((c,d)=>{let h=Math.abs(c.semi-a);h<l&&(l=h,n=d)}),n<0?null:{x:(n+s[1])/o.length,y:1-s[2]}}strokeAt(e,t,s){let i=t.p,a=i.length;if(!a||s<i[0][0]||s>i[a-1][0]+(a===1?6:1.5))return null;let o=0;for(;o<a-1&&i[o+1][0]<=s;)o++;let n=this.pointToPad(e,t.l,i[o]);if(o===a-1)return n;let l=this.pointToPad(e,t.l,i[o+1]);if(!n||!l)return n||l;let c=(s-i[o][0])/Math.max(.1,i[o+1][0]-i[o][0]);return{x:n.x+(l.x-n.x)*c,y:n.y+(l.y-n.y)*c}}drawReplay(e,t,s,i,a,o){let n=this.clockTick(o),l=this.part,c=this.playingPattern().gest,d=new Map;if(n<0||!c||!c[l])return this.strokePrev=d,!1;let h=this.store.settings.ghosts,v=new Set([...this.touches.values()].map(f=>f.lane));for(let f of c[l]){if(l!=="drum"&&this.touches.size)break;if(l==="drum"&&v.has(f.l))continue;let m=this.strokeAt(l,f,n);if(!m)continue;let p=this.strokePrev&&this.strokePrev.get(f);if(d.set(f,m),this.fx){let R=f.p[0],O=l==="drum"?void 0:this.pitchClass(R[3],R[4]);p?(m.x!==p.x||m.y!==p.y)&&this.fx.touch(l,m.x,m.y,m.x-p.x,m.y-p.y,"move",f.l,O):this.fx.touch(l,m.x,m.y,0,0,"down",f.l,O)}if(!h)continue;e.lineCap="round",e.lineJoin="round";let b=m;for(let R=1;R<=14;R++){let O=this.strokeAt(l,f,n-R*2);if(!O)break;let H=1-R/15;e.strokeStyle=i?ne(a,.55*H):`rgba(255,255,255,${.15+.6*H})`,e.lineWidth=2+12*H,e.beginPath(),e.moveTo(b.x*t,b.y*s),e.lineTo(O.x*t,O.y*s),e.stroke(),b=O}let y=m.x*t,k=m.y*s,T=e.createRadialGradient(y,k,0,y,k,46);i?(T.addColorStop(0,ne(a,.32)),T.addColorStop(1,ne(a,0))):(T.addColorStop(0,"rgba(255,255,255,0.45)"),T.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=T,e.fillRect(y-46,k-46,92,92),e.lineWidth=2,e.strokeStyle=i?ne(a,.8):"rgba(255,255,255,0.9)",e.setLineDash([5,4]),e.beginPath(),e.arc(y,k,19,0,Math.PI*2),e.stroke(),e.setLineDash([])}return this.strokePrev=d,!0}keyGeom(e,t){return t.black?{x:t.pos/e.whites,top:ft}:{x:(t.pos+.5)/e.whites,top:1}}local(e){let t=this.el.getBoundingClientRect();return{x:Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,(e.clientY-t.top)/t.height))}}msgFor(e,t,s){let i=this.part;if(i==="drum"){let l=Math.min(3,Math.floor(s.x*4)),c=s.x*4-l;return{type:"pad",part:i,lane:l,id:e,phase:t,x:c,y:1-s.y,v:.9}}if(this.piano){let l=this.pianoLayout(),c=xi(l,s.x,s.y),d=c.black?1-Math.min(1,s.y/ft):1-s.y,h=this.keyBox(l,c),v=Math.min(1,Math.max(0,(s.x-h.x0)/h.w));return{type:"pad",part:i,id:e,phase:t,deg:c.deg,acc:c.acc,y:d,fx:v,v:.85,col:l.keys.indexOf(c)}}let a=this.columns(),o=Math.min(a.length-1,Math.floor(s.x*a.length)),n=a[o];return{type:"pad",part:i,id:e,phase:t,deg:n.deg,acc:n.acc,y:1-s.y,fx:s.x*a.length-o,v:.85,col:o}}down(e){e.preventDefault(),this.opts.onFirstTouch&&this.opts.onFirstTouch();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.local(e),s=this.msgFor(e.pointerId,"down",t);this.touches.set(e.pointerId,{...t,rx:t.x,ry:t.y,lane:s.lane,col:s.col,deg:s.deg,acc:s.acc,t:performance.now()}),this.fx&&(this.fx.touch(this.part,t.x,t.y,0,0,"down",s.lane,s.deg!==void 0?this.pitchClass(s.deg,s.acc):void 0),this.fx.press(e.pointerId,t.x,t.y,"down")),this.ghouls&&this.ghouls.press(e.pointerId,t.x,t.y,"down"),this.store.send(s),this.hint.style.opacity="0",this.kick()}move(e){let t=this.touches.get(e.pointerId);if(!t)return;let s=this.local(e);if(this.fx&&(this.fx.touch(this.part,s.x,s.y,s.x-t.rx,s.y-t.ry,"move",t.lane,t.pc),this.fx.press(e.pointerId,s.x,s.y,"move"),t.rx=s.x,t.ry=s.y),this.ghouls&&this.ghouls.press(e.pointerId,s.x,s.y,"move"),this.part==="drum"){let i=t.lane,a=Math.min(.999,Math.max(0,s.x*4-i));this.store.send({type:"pad",part:"drum",lane:i,id:e.pointerId,phase:"move",x:a,y:1-s.y}),t.x=(i+a)/4,t.y=s.y}else{let i=this.msgFor(e.pointerId,"move",s);t.x=s.x,t.y=s.y,t.col=i.col,t.deg=i.deg,t.acc=i.acc,this.fx&&(t.pc=this.pitchClass(i.deg,i.acc)),this.store.send(i)}}up(e,t){let s=this.touches.get(e.pointerId);if(!s)return;this.touches.delete(e.pointerId),this.fx&&this.fx.press(e.pointerId,s.x,s.y,"up"),this.ghouls&&this.ghouls.press(e.pointerId,s.x,s.y,"up");let i=this.part;i==="drum"?this.store.send({type:"pad",part:i,lane:s.lane,id:e.pointerId,phase:t?"cancel":"up"}):this.store.send({type:"pad",part:i,id:e.pointerId,phase:t?"cancel":"up"})}releaseAll(){for(let[e,t]of this.touches)this.part==="drum"?this.store.send({type:"pad",part:"drum",lane:t.lane,id:e,phase:"cancel"}):this.store.send({type:"pad",part:this.part,id:e,phase:"cancel"});this.touches.clear()}get layers(){return!!(this.fx||this.ghouls&&this.ghouls.on)}noteFx(...e){this.fx&&this.fx.note(...e),this.ghouls&&this.ghouls.on&&this.ghouls.note(...e)}onTrig(e,t){if(t){let o=this.part==="drum"?t.drum:t[this.part];this.level=Math.max(this.level*.6,o||0)}if(!e){this.level>.01&&this.kick();return}let s=this.part,i=performance.now(),a=this.store.settings.ghosts&&!this.hasStrokes(s);for(let o=0;o<e.length;o+=4){let n=e[o],l=e[o+1],c=e[o+2],d=e[o+3];if(d===-1&&this.layers){if(s==="drum"&&n===0){for(let[,h]of this.touches)if(h.lane===l){this.noteFx("drum",h.x,h.y,l,.9);break}}else if(s==="bass"&&n===1||s==="lead"&&n===2){let h=null;for(let[,v]of this.touches)(!h||v.deg===l&&v.acc===c)&&(h=v);h&&this.noteFx(s,h.x,h.y,0,.9,this.pitchClass(l,c))}}if(s==="drum"&&n===0){if(this.ripples.push({lane:l,zone:c,t:i}),d!==-1){let h=(l+(c+.5)/3)/4,v=d>=0?1-d:.5;a&&d>=0&&this.ghosts.push({x:h,y:v,t:i}),this.layers&&this.noteFx("drum",h,v,l)}}else if(s==="bass"&&n===1||s==="lead"&&n===2){let h=d>=0?d:this.store.macroValue(s,6);if(this.piano){let v=this.pianoLayout(),f=vt(l,c,this.store.project.scale),m=v.keys.findIndex(p=>p.semi===f);if(this.ripples.push({col:m,t:i}),d!==-1&&m>=0){let p=this.keyGeom(v,v.keys[m]);a&&this.ghosts.push({x:p.x,y:(1-h)*p.top,t:i}),this.layers&&this.noteFx(s,p.x,(1-h)*p.top,0,.8,this.pitchClass(l,c))}}else{let v=this.columns(),f=v.findIndex(m=>m.deg===l&&m.acc===c);this.ripples.push({col:f,deg:l,t:i}),d!==-1&&f>=0&&(a&&this.ghosts.push({x:(f+.5)/v.length,y:1-h,t:i}),this.layers&&this.noteFx(s,(f+.5)/v.length,1-h,0,.8,this.pitchClass(l,c)))}}}this.ripples.length>40&&this.ripples.splice(0,this.ripples.length-40),this.ghosts.length>24&&this.ghosts.splice(0,this.ghosts.length-24),this.kick()}kick(){this.raf||(this.raf=requestAnimationFrame(()=>{this.raf=0,this.draw(!0)}))}setHint(){let e=this.store.ui,t=this.store.presetFor(this.part==="drum"?"d0":this.part),s;e.erase?s="Gomme : touche pendant la lecture pour effacer":this.part==="drum"?s="Une colonne par son \xB7 \u2194 variante \xB7 \u2195\uFE0E caract\xE8re":s=`${this.piano?"Clavier":"Notes \u2194"} \xB7 ${t&&t.expr?t.expr.name:"Expression"} \u2195\uFE0E`,this.hint.querySelector("b").textContent=e.erase?"Gomme":e.armed&&!e.playing?"Pr\xEAt \xE0 enregistrer":"\xC0 toi de jouer.",this.hint.querySelector("span").textContent=e.armed&&!e.playing?"Le premier toucher lance la boucle":s,this.axY.textContent=this.part==="drum"?"Caract\xE8re":t&&t.expr?t.expr.name:"",this.axY.hidden=this.piano}showHint(e){this.hint.style.opacity=e?"1":"0"}draw(e){let{w:t,h:s,d:i}=it(this.cv),a=this.cv.getContext("2d");a.setTransform(i,0,0,i,0,0);let o=document.documentElement.dataset.theme==="dark",n=Te("--accent"),l=Te("--accent-ink"),c=Te("--ink"),d=performance.now();this.fx&&this.fx.syncScene(),this.under=this.gpu||!!(this.ghouls&&this.ghouls.stage);let h=this.under;if(a.clearRect(0,0,t,s),h&&(a.save(),Le(a,0,0,t,s,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),a.clip()),!h){if(o){let p=a.createLinearGradient(0,0,0,s);p.addColorStop(0,"#1a1c23"),p.addColorStop(1,"#121318"),a.fillStyle=p}else a.fillStyle=n;a.fillRect(0,0,t,s)}this.part==="drum"?this.drawDrums(a,t,s,o,n,l,c,d):this.drawMelodic(a,t,s,o,n,l,c,d);for(let[,p]of this.touches){let b=p.x*t,y=p.y*s,k=Math.max(70,Math.min(t,s)*.35)*(1+this.level*.6),T=a.createRadialGradient(b,y,0,b,y,k);o?(T.addColorStop(0,ne(n,.55+this.level*.3)),T.addColorStop(.35,ne(n,.18)),T.addColorStop(1,ne(n,0))):(T.addColorStop(0,"rgba(255,255,255,0.65)"),T.addColorStop(.4,"rgba(255,255,255,0.18)"),T.addColorStop(1,"rgba(255,255,255,0)")),a.globalCompositeOperation=o?"lighter":"source-over",a.fillStyle=T,a.fillRect(b-k,y-k,2*k,2*k),a.globalCompositeOperation="source-over",a.strokeStyle=o?ne(n,.9):"rgba(255,255,255,0.9)",a.lineWidth=2,a.beginPath(),a.arc(b,y,22,0,Math.PI*2),a.stroke()}this.drawGhosts(a,t,s,o,n,d);let f=this.drawReplay(a,t,s,o,n,d);if(this.store.ui.erase){a.fillStyle=o?"rgba(255,80,80,0.08)":"rgba(0,0,0,0.08)";for(let p=-s;p<t;p+=22)a.beginPath(),a.moveTo(p,s),a.lineTo(p+s,0),a.lineTo(p+s+8,0),a.lineTo(p+8,s),a.fill()}h&&a.restore(),this.level*=.9;let m=this.touches.size||this.ripples.some(p=>d-p.t<600)||this.ghosts.length||this.level>.02||f;this.ripples=this.ripples.filter(p=>d-p.t<600),this.ghosts=this.ghosts.filter(p=>d-p.t<Gi),m&&e&&this.kick()}drawGhosts(e,t,s,i,a,o){for(let n of this.ghosts){let l=(o-n.t)/Gi;if(l>=1)continue;let c=n.x*t,d=Math.min(s-8,Math.max(8,n.y*s)),h=(1-l)*(1-l),v=15+10*l,f=e.createRadialGradient(c,d,0,c,d,v*2.2);i?(f.addColorStop(0,ne(a,.35*h)),f.addColorStop(1,ne(a,0))):(f.addColorStop(0,`rgba(255,255,255,${.5*h})`),f.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=f,e.fillRect(c-v*2.2,d-v*2.2,v*4.4,v*4.4),e.lineWidth=2,e.strokeStyle=i?ne(a,.85*h):`rgba(255,255,255,${.95*h})`,e.beginPath(),e.arc(c,d,v,0,Math.PI*2),e.stroke(),e.fillStyle=i?ne(a,.9*h):`rgba(255,255,255,${h})`,e.beginPath(),e.arc(c,d,3.5,0,Math.PI*2),e.fill()}}drawPiano(e,t,s,i,a,o,n){let l=this.pianoLayout(),c=t/l.whites,d=c*At,h=s*ft,v=this.store.project.key,f=new Set;for(let[,O]of this.touches)O.col!==void 0&&f.add(O.col);let m=new Map;for(let O of this.ripples)O.col>=0&&m.set(O.col,Math.max(m.get(O.col)||0,(1-(n-O.t)/600)*this.inkShare()));let p=!this.inkUnder,b=(O,H)=>f.has(H)?i?ne(a,.75):"rgba(255,255,255,0.92)":O?i?"#08090c":ne(o,.88):i?"rgba(255,255,255,0.075)":"rgba(255,255,255,0.34)",y=this.under?new Float32Array(64):null,k=l.whites,T=0,R=0;l.keys.forEach((O,H)=>{if(O.black)return;let le=O.pos*c,Q=m.get(H)||0;if(this.under?p&&(y[T]=Math.max(f.has(H)?1:0,Q)):(e.fillStyle=b(!1,H),Le(e,le+1,0,c-2,s,Math.min(8,c/4)),e.fill(),Q>0&&(e.fillStyle=i?ne(a,.4*Q):`rgba(255,255,255,${.5*Q})`,Le(e,le+1,0,c-2,s,Math.min(8,c/4)),e.fill())),T++,this.keyMark(e,O,le+c/2,s-30,i,a,o),c>20||O.isRoot){e.fillStyle=i?"rgba(255,255,255,0.5)":ne(o,.65),e.font=`600 ${c>30?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let P=$t(O.semi,v);e.fillText(O.isRoot||c>30?P:P.replace(/-?\d+$/,""),le+c/2,s-10)}}),l.keys.forEach((O,H)=>{if(!O.black)return;let le=O.pos/l.whites*t-d/2,Q=m.get(H)||0;this.under?p&&(y[k+R]=Math.max(f.has(H)?1:0,Q)):(e.fillStyle=b(!0,H),Le(e,le,-6,d,h+6,Math.min(6,d/4)),e.fill(),i&&!f.has(H)&&(e.strokeStyle="rgba(255,255,255,0.10)",e.lineWidth=1,Le(e,le+.5,-6,d-1,h+5.5,Math.min(6,d/4)),e.stroke()),Q>0&&(e.fillStyle=ne(a,.55*Q),Le(e,le,-6,d,h+6,Math.min(6,d/4)),e.fill())),R++,this.keyMark(e,O,le+d/2,h-16,!0,a,o)}),y&&this.fx&&this.fx.keyLights(p?y:null),y&&this.ghouls&&this.ghouls.keyLights(p?y:null)}keyMark(e,t,s,i,a,o,n){!t.inScale&&!t.isRoot||(t.isRoot?e.fillStyle=a?o:n:e.fillStyle=a?"rgba(255,255,255,0.6)":ne(n,.45),e.beginPath(),e.arc(s,i,t.isRoot?3.6:2.6,0,Math.PI*2),e.fill())}drawMelodic(e,t,s,i,a,o,n,l){if(this.piano){this.drawPiano(e,t,s,i,a,o,l);return}let c=this.columns(),d=c.length,h=t/d,v=this.store.project.key;for(let m=0;m<d;m++){let p=c[m],b=m*h,y=(p.octave%2+2)%2===0;this.under||(i?e.fillStyle=y?"rgba(255,255,255,0.035)":"rgba(255,255,255,0)":e.fillStyle=y?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.035)",e.fillRect(b,0,h,s),m>0&&(e.fillStyle=i?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",e.fillRect(b-.5,0,1,s))),m>0&&c[m-1].octave!==p.octave&&(e.fillStyle=i?ne(a,.22):"rgba(255,255,255,0.45)",e.fillRect(b-.75,0,1.5,s)),p.isRoot&&(e.fillStyle=i?ne(a,.75):o,e.globalAlpha=i?1:.55,Le(e,b+h/2-3,s-30,6,6,3),e.fill(),e.globalAlpha=1),e.fillStyle=i?"rgba(255,255,255,0.45)":ne(o,.6),e.font=`600 ${h>34?11:9}px -apple-system, system-ui, sans-serif`,e.textAlign="center";let k=$t(p.semi,v);(h>22||p.isRoot)&&e.fillText(h>30?k:k.replace(/\d+$/,""),b+h/2,s-10)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let m=new Float32Array(64),p=this.store.settings.ghosts?.6:1;for(let[,b]of this.touches){let y=Math.min(d-1,Math.floor(b.x*d));m[y]=Math.max(m[y],.45)}for(let b of this.ripples)b.col>=0&&b.col<64&&(m[b.col]=Math.max(m[b.col],p*(1-(l-b.t)/600)));this.fx&&this.fx.keyLights(m),this.ghouls&&this.ghouls.keyLights(m);return}for(let[,m]of this.touches){let p=Math.min(d-1,Math.floor(m.x*d));e.fillStyle=i?ne(a,.16):"rgba(255,255,255,0.22)",e.fillRect(p*h,0,h,s)}let f=(this.store.settings.ghosts?.6:1)*this.inkShare();for(let m of this.ripples){if(m.col<0)continue;let p=(l-m.t)/600,b=m.col*h;e.fillStyle=i?ne(a,.45*f*(1-p)):`rgba(255,255,255,${.5*f*(1-p)})`,e.fillRect(b+2,0,h-4,s)}}drawDrums(e,t,s,i,a,o,n,l){let c=t/4,d=this.store.project;for(let h=0;h<4;h++){let v=h*c;this.under||(e.fillStyle=i?h%2?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.0)":h%2?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.1)",e.fillRect(v,0,c,s),h>0&&(e.fillStyle=i?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)",e.fillRect(v-1,0,2,s)));for(let m=1;m<3;m++)e.fillStyle=i?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.05)",e.fillRect(v+m*c/3,s*.18,1,s*.64);let f=this.store.presetFor("d"+h);if(e.textAlign="center",e.fillStyle=i?"rgba(255,255,255,0.85)":ne(o,.85),e.font="750 13px -apple-system, system-ui, sans-serif",e.fillText(["Kick","Snare","Hat","Perc"][h],v+c/2,22),e.font="600 10.5px -apple-system, system-ui, sans-serif",e.fillStyle=i?"rgba(255,255,255,0.45)":ne(o,.6),e.fillText(Uo(e,f?f.name:"",c-8),v+c/2,38),f&&f.variants)for(let m=0;m<3;m++)e.beginPath(),e.arc(v+(m+.5)*c/3,s-12,2.2,0,Math.PI*2),e.fill();d.parts.drum.mute[h]&&(e.fillStyle=i?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.35)",e.fillRect(v,0,c,s))}e.font="750 12px -apple-system, system-ui, sans-serif",e.textAlign="center";for(let[,h]of this.touches){let v=h.lane,f=this.store.presetFor("d"+v);if(!f||!f.variants)continue;let m=Math.min(2,Math.max(0,Math.floor((h.x*4-v)*3))),p=f.variants[m]?f.variants[m].name:"",b=Math.min(t-40,Math.max(40,h.x*t)),y=Math.max(70,h.y*s-44);e.fillStyle=i?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.75)";let k=e.measureText(p).width+16;Le(e,b-k/2,y-15,k,22,11),e.fill(),e.fillStyle=i?"#fff":o,e.fillText(p,b,y)}if(this.inkUnder){this.fx&&this.fx.keyLights(null);return}if(this.under){let h=new Float32Array(64);for(let v of this.ripples)h[v.lane]=Math.max(h[v.lane],1-(l-v.t)/600);this.fx&&this.fx.keyLights(h),this.ghouls&&this.ghouls.keyLights(h);return}for(let h of this.ripples){let v=(l-h.t)/600,f=h.lane*c,m=e.createLinearGradient(0,s,0,0),p=.55*(1-v)*this.inkShare();i?(m.addColorStop(0,ne(a,p)),m.addColorStop(1,ne(a,0))):(m.addColorStop(0,`rgba(255,255,255,${p})`),m.addColorStop(1,"rgba(255,255,255,0)")),e.fillStyle=m,e.fillRect(f+2,0,c-4,s)}}},Gi=520;function Uo(r,e,t){if(r.measureText(e).width<=t)return e;for(;e.length>1&&r.measureText(e+"\u2026").width>t;)e=e.slice(0,-1);return e+"\u2026"}function ne(r,e){if(r=r.trim(),r.startsWith("#")){let t=r.length===4?r.slice(1).split("").map(s=>parseInt(s+s,16)):[1,3,5].map(s=>parseInt(r.slice(s,s+2),16));return`rgba(${t[0]},${t[1]},${t[2]},${e})`}return r.startsWith("color(")?r.replace(/\)\s*$/,` / ${e})`):r.startsWith("rgb(")?r.replace("rgb(","rgba(").replace(")",`,${e})`):r}var gs=class{constructor(e,{onSelect:t}){this.store=e,this.onSelect=t,this.el=u("div",{class:"tl",role:"img","aria-label":"Frise de la boucle"}),this.cv=u("canvas"),this.el.append(this.cv),this.sel=null,this.drag=null,this.tick=-1,this.el.addEventListener("pointerdown",i=>{i.preventDefault();try{this.el.setPointerCapture(i.pointerId)}catch{}let a=this.tickAt(i);this.drag={id:i.pointerId,t0:a,moved:!1}}),this.el.addEventListener("pointermove",i=>{if(!this.drag||i.pointerId!==this.drag.id)return;let a=this.tickAt(i);Math.abs(a-this.drag.t0)>=24&&(this.drag.moved=!0),this.drag.moved&&(this.sel={t0:Math.min(a,this.drag.t0),t1:Math.max(a,this.drag.t0)+24},this.draw())});let s=i=>{if(!this.drag||i.pointerId!==this.drag.id)return;let a=this.drag;if(this.drag=null,!a.moved)if(this.sel&&a.t0>=this.sel.t0&&a.t0<this.sel.t1)this.sel=null;else{let o=Math.floor(a.t0/384);this.sel={t0:o*384,t1:(o+1)*384}}this.draw(),this.onSelect(this.sel)};this.el.addEventListener("pointerup",s),this.el.addEventListener("pointercancel",s),new ResizeObserver(()=>this.draw()).observe(this.el)}get L(){return 384*this.store.project.bars}tickAt(e){let t=this.el.getBoundingClientRect(),s=Math.min(.9999,Math.max(0,(e.clientX-t.left)/t.width));return Math.floor(s*this.L/24)*24}clear(){this.sel=null,this.draw()}setTick(e){e!==this.tick&&(this.tick=e,this.draw())}draw(){let{w:e,h:t,d:s}=it(this.cv),i=this.cv.getContext("2d");i.setTransform(s,0,0,s,0,0),i.clearRect(0,0,e,t);let a=this.store.project,o=this.store.ui,n=this.L,l=Te("--accent"),c=Te("--ink"),d=Te("--line-2"),h=f=>f/n*e;for(let f=0;f<=a.bars;f++)i.fillStyle=d,i.fillRect(Math.round(h(f*384))-.5,0,1,t);for(let f=0;f<n;f+=96)i.fillStyle=d,i.globalAlpha=.5,i.fillRect(Math.round(h(f)),t-5,1,5),i.globalAlpha=1;this.sel&&(i.fillStyle=ne(l,.28),Le(i,h(this.sel.t0)+1,2,h(this.sel.t1)-h(this.sel.t0)-2,t-4,6),i.fill(),i.strokeStyle=l,i.lineWidth=1.5,i.stroke());let v=a.patterns[a.current];if(o.part==="drum"){let f=(t-8)/4;for(let m=0;m<4;m++){i.fillStyle=c,i.globalAlpha=m===o.lane?.95:.6;for(let p of v.drum[m].hits){let b=h(p.t),y=Math.max(2,e/(n/24)*.55);Le(i,b,4+m*f+1,y,f-2,1.5),i.fill()}}i.globalAlpha=1}else{let f=v[o.part].notes;if(f.length){let m=1/0,p=-1/0;for(let T of f){let R=vt(T.deg,T.acc,a.scale);m=Math.min(m,R),p=Math.max(p,R)}let b=Math.max(12,p-m+1);i.fillStyle=c,i.strokeStyle=c;let y=null,k=f.slice().sort((T,R)=>T.t-R.t);for(let T of k){let R=vt(T.deg,T.acc,a.scale),O=t-6-(R-m)/b*(t-12),H=h(T.t),le=Math.max(2.5,h(T.t+T.d)-H-1);i.globalAlpha=.85,Le(i,H,O-2.5,le,5,2.5),i.fill(),T.tie&&y&&(i.lineWidth=1.5,i.beginPath(),i.moveTo(y.x,y.y),i.lineTo(H+1,O),i.stroke()),y={x:H+le,y:O}}i.globalAlpha=1}}o.playing&&this.tick>=0&&(i.fillStyle=o.armed?Te("--rec"):l,i.fillRect(h(this.tick)-1,0,2,t))}};var bs=class{constructor(e){this.store=e,this.groupsEl=u("div",{class:"groups",role:"tablist"}),this.el=u("div",{class:"pad",role:"application","aria-label":"Surface de transformation"}),this.cv=u("canvas"),this.axX=u("div",{class:"ax x"}),this.axY=u("div",{class:"ax y"}),this.el.append(this.cv,this.axX,this.axY),this.info=u("div",{class:"info"}),this.clearBtn=u("button",{class:"pill",text:"Effacer les mouvements",onclick:()=>this.clearAuto()}),this.barEl=u("div",{class:"autobar"},this.info,this.clearBtn),this.touch=new Map,this.live=null,this.fx=null,this.gpu=!1,this.prev=new Map,this.el.addEventListener("pointerdown",t=>this.down(t)),this.el.addEventListener("pointermove",t=>this.move(t)),this.el.addEventListener("pointerup",t=>this.up(t)),this.el.addEventListener("pointercancel",t=>this.up(t)),new ResizeObserver(()=>this.draw()).observe(this.el)}groups(){let e=this.store,t=e.ui.part;if(t==="drum")return[0,1,2,3].map(a=>{let o=e.presetFor("d"+a),n=o&&o.macros||[];return{label:["Kick","Snare","Hat","Perc"][a],sub:o?o.name:"",target:"d"+a,sx:0,sy:1,xName:n[0]?n[0].name:"X",yName:n[1]?n[1].name:"Y"}});let s=e.presetFor(t);return(s&&s.groups||["Groupe 1","Groupe 2","Groupe 3"]).map((a,o)=>{let n=s.macros[o*2],l=s.macros[o*2+1];return{label:a,sub:`${n?n.name:"X"} \xB7 ${l?l.name:"Y"}`,target:t,sx:o*2,sy:o*2+1,xName:n?n.name:"X",yName:l?l.name:"Y"}})}value(e,t){let s=this.store;for(let[,i]of this.touch){let a=this.groups()[i];if(a.target===e.target&&(a.sx===t||a.sy===t)&&this.touchVals&&this.touchVals[e.target+":"+t]!==void 0)return this.touchVals[e.target+":"+t]}if(this.live&&s.ui.playing){if(e.target==="bass")return this.live[8+t];if(e.target==="lead")return this.live[15+t];let i=+e.target.slice(1);return this.live[i*2+t]}return s.macroValue(e.target,t)}hasAuto(e){let s=this.store.pattern.auto[e.target];return!!(s&&(s[e.sx]||s[e.sy]))}render(){let e=this.groups(),t=Math.min(this.store.ui.group,e.length-1);this.groupsEl.replaceChildren(...e.map((a,o)=>u("button",{class:"grp"+(this.hasAuto(a)?" auto":""),role:"tab","aria-selected":String(o===t),onclick:()=>{this.store.ui.group=o,this.render()}},u("span",{class:"num",text:String(o+1)}),u("b",{text:a.label}),u("small",{text:a.sub}),u("i",{class:"rec"}))));let s=e[t];this.axX.textContent=s.xName+" \u2192",this.axY.textContent=s.yName+" \u2192";let i=e.filter(a=>this.hasAuto(a)).length;this.info.textContent=this.store.ui.armed?"REC : bouge un point pendant la lecture pour enregistrer":i?`${i} groupe${i>1?"s":""} avec mouvements enregistr\xE9s`:"Glisse un point \xB7 plusieurs doigts possibles",this.clearBtn.disabled=!this.hasAuto(s),this.draw()}pos(e){let t=this.el.getBoundingClientRect();return{x:Math.min(1,Math.max(0,(e.clientX-t.left)/t.width)),y:Math.min(1,Math.max(0,1-(e.clientY-t.top)/t.height))}}down(e){e.preventDefault();try{this.el.setPointerCapture(e.pointerId)}catch{}let t=this.pos(e),s=this.groups(),i=this.el.getBoundingClientRect(),a=-1,o=1/0;s.forEach((l,c)=>{if([...this.touch.values()].includes(c))return;let d=(this.value(l,l.sx)-t.x)*i.width,h=(this.value(l,l.sy)-t.y)*i.height,v=Math.hypot(d,h);v<o&&(o=v,a=c)});let n=o<44?a:Math.min(this.store.ui.group,s.length-1);[...this.touch.values()].includes(n)||(this.touch.set(e.pointerId,n),this.store.ui.group=n,this.send(s[n],t,"down"),this.render())}move(e){let t=this.touch.get(e.pointerId);t!==void 0&&(this.send(this.groups()[t],this.pos(e),"move"),this.draw())}up(e){let t=this.touch.get(e.pointerId);if(t===void 0)return;this.touch.delete(e.pointerId);let s=this.groups()[t];this.fx&&this.fx.press(s.target+":"+s.sx,0,0,"up"),this.store.send({type:"tweak",target:s.target,slot:s.sx,phase:"up"}),this.store.send({type:"tweak",target:s.target,slot:s.sy,phase:"up"}),this.render()}releaseAll(){let e=this.groups();for(let[,t]of this.touch){let s=e[t];s&&(this.store.send({type:"tweak",target:s.target,slot:s.sx,phase:"up"}),this.store.send({type:"tweak",target:s.target,slot:s.sy,phase:"up"}))}this.touch.clear()}send(e,t,s){if(this.fx&&this.fx.press(e.target+":"+e.sx,t.x,1-t.y,s==="down"?"down":"move"),this.fx){let i=e.target+":"+e.sx,a=this.prev.get(i);this.fx.stir(e.target,t.x,1-t.y,a?t.x-a.x:0,a?a.y-t.y:0,!0),this.prev.set(i,{x:t.x,y:t.y})}this.touchVals=this.touchVals||{},this.touchVals[e.target+":"+e.sx]=t.x,this.touchVals[e.target+":"+e.sy]=t.y,this.store.send({type:"tweak",target:e.target,slot:e.sx,value:t.x,phase:s}),this.store.send({type:"tweak",target:e.target,slot:e.sy,value:t.y,phase:s})}clearAuto(){let e=this.groups(),t=e[Math.min(this.store.ui.group,e.length-1)];this.store.clearAuto(t.target,t.sx),this.store.clearAuto(t.target,t.sy),this.render()}onPos(e){this.live=e.mac,(this.store.ui.playing||this.touch.size)&&this.draw()}draw(){let{w:e,h:t,d:s}=it(this.cv),i=this.cv.getContext("2d");i.setTransform(s,0,0,s,0,0);let a=document.documentElement.dataset.theme==="dark",o=Te("--accent"),n=Te("--accent-ink");if(i.clearRect(0,0,e,t),this.fx&&this.fx.syncScene(),this.gpu&&(i.save(),Le(i,0,0,e,t,parseFloat(getComputedStyle(this.el).borderTopLeftRadius)||0),i.clip()),!this.gpu){if(a){let d=i.createLinearGradient(0,0,e,t);d.addColorStop(0,"#1b1d24"),d.addColorStop(1,"#121318"),i.fillStyle=d}else i.fillStyle=o;i.fillRect(0,0,e,t),i.strokeStyle=a?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",i.lineWidth=1;for(let d=1;d<4;d++)i.beginPath(),i.moveTo(d*e/4,0),i.lineTo(d*e/4,t),i.stroke(),i.beginPath(),i.moveTo(0,d*t/4),i.lineTo(e,d*t/4),i.stroke()}let l=this.groups(),c=Math.min(this.store.ui.group,l.length-1);l.forEach((d,h)=>{let v=this.value(d,d.sx)*e,f=(1-this.value(d,d.sy))*t,m=[...this.touch.values()].includes(h);if(this.fx&&!m){let y=d.target+":"+d.sx,k=this.prev.get(y),T=v/e,R=1-f/t;k&&this.store.ui.playing&&Math.hypot(T-k.x,R-k.y)>.003&&this.fx.stir(d.target,T,1-R,T-k.x,k.y-R,!1),this.prev.set(y,{x:T,y:R})}let p=m?120:70,b=i.createRadialGradient(v,f,0,v,f,p);a?(b.addColorStop(0,ne(o,h===c?.4:.18)),b.addColorStop(1,ne(o,0))):(b.addColorStop(0,`rgba(255,255,255,${h===c?.5:.25})`),b.addColorStop(1,"rgba(255,255,255,0)")),i.fillStyle=b,i.fillRect(v-p,f-p,2*p,2*p),i.beginPath(),i.arc(v,f,m?26:21,0,Math.PI*2),i.fillStyle=a?h===c?ne(o,.95):"rgba(255,255,255,0.12)":h===c?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.4)",i.fill(),i.lineWidth=2,i.strokeStyle=a?ne(o,.9):"rgba(255,255,255,0.95)",i.stroke(),i.fillStyle=a?h===c?n:"rgba(255,255,255,0.9)":n,i.font="800 14px -apple-system, system-ui, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(String(h+1),v,f+1),this.hasAuto(d)&&(i.beginPath(),i.arc(v+17,f-17,4,0,Math.PI*2),i.fillStyle=Te("--rec"),i.fill())}),i.textBaseline="alphabetic",this.gpu&&i.restore()}};var zo=96,Ho=[36,38,42,63],Wi={0:[36,36,35],1:[37,38,40],2:[42,44,46],3:[64,63,62]};function Vi(r){let e=[r&127];for(;r>>=7;)e.unshift(r&127|128);return e}function Zs(r){return Array.from(r,e=>e.charCodeAt(0)&127)}function Ki(r){return[r>>>24&255,r>>>16&255,r>>>8&255,r&255]}function Qs(r){return[r>>>8&255,r&255]}function ys(r,e){e.sort((i,a)=>i.t-a.t||i.order-a.order);let t=[0,255,3,...Vi(r.length),...Zs(r)],s=0;for(let i of e)t.push(...Vi(Math.max(0,i.t-s)),...i.data),s=i.t;return t.push(0,255,47,0),[...Zs("MTrk"),...Ki(t.length),...t]}function Yi(r,{loops:e=1}={}){let t=384*r.bars,s=r.song&&r.song.enabled&&r.song.sections.length?r.song.sections:[{p:r.current,reps:e,mute:{}}],i=[],a=[],o=[],n=0;for(let v of s){let f=r.patterns[v.p]||r.patterns[0];for(let m=0;m<(v.reps||1);m++){for(let p=0;p<4;p++)if(!(r.parts.drum.mute[p]||v.mute&&v.mute["d"+p]))for(let b of f.drum[p].hits){let y=Wi[p]&&Wi[p][b.x]||Ho[p],k=Math.max(1,Math.round(b.v*127));i.push({t:n+b.t,order:1,data:[153,y,k]}),i.push({t:n+b.t+12,order:0,data:[137,y,0]})}for(let[p,b,y]of[["bass",a,0],["lead",o,1]])if(!(r.parts[p].mute||v.mute&&v.mute[p]))for(let k of f[p].notes){let T=Math.max(0,Math.min(127,bi(k.deg,k.acc,r.key,r.scale,48))),R=Math.max(1,Math.round(k.v*127));b.push({t:n+k.t,order:1,data:[144|y,T,R]}),b.push({t:n+k.t+Math.max(1,Math.min(k.d,t)),order:0,data:[128|y,T,0]})}n+=t}}let l=Math.round(6e7/r.tempo),c=[{t:0,order:0,data:[255,81,3,l>>16&255,l>>8&255,l&255]},{t:0,order:0,data:[255,88,4,4,2,24,8]}],d=[ys(r.name||"MOTIF",c),ys("Batterie",i),ys("Basse",a),ys("M\xE9lodie",o)],h=[...Zs("MThd"),...Ki(6),...Qs(1),...Qs(d.length),...Qs(zo)];return new Uint8Array([...h,...d.flat()])}var jo=(()=>{let r=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let s=0;s<8;s++)t=t&1?3988292384^t>>>1:t>>>1;r[e]=t>>>0}return r})();function Go(r){let e=4294967295;for(let t=0;t<r.length;t++)e=jo[(e^r[t])&255]^e>>>8;return(e^4294967295)>>>0}function Xi(r){let e=new TextEncoder,t=[],s=[],i=0,a=new Date,o=a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1,n=a.getFullYear()-1980<<9|a.getMonth()+1<<5|a.getDate();for(let d of r){let h=e.encode(d.name),v=Go(d.data),f=new DataView(new ArrayBuffer(30));f.setUint32(0,67324752,!0),f.setUint16(4,20,!0),f.setUint16(6,2048,!0),f.setUint16(8,0,!0),f.setUint16(10,o,!0),f.setUint16(12,n,!0),f.setUint32(14,v,!0),f.setUint32(18,d.data.length,!0),f.setUint32(22,d.data.length,!0),f.setUint16(26,h.length,!0),f.setUint16(28,0,!0),t.push(new Uint8Array(f.buffer),h,d.data);let m=new DataView(new ArrayBuffer(46));m.setUint32(0,33639248,!0),m.setUint16(4,20,!0),m.setUint16(6,20,!0),m.setUint16(8,2048,!0),m.setUint16(10,0,!0),m.setUint16(12,o,!0),m.setUint16(14,n,!0),m.setUint32(16,v,!0),m.setUint32(20,d.data.length,!0),m.setUint32(24,d.data.length,!0),m.setUint16(28,h.length,!0),m.setUint32(42,i,!0),s.push(new Uint8Array(m.buffer),h),i+=30+h.length+d.data.length}let l=s.reduce((d,h)=>d+h.length,0),c=new DataView(new ArrayBuffer(22));return c.setUint32(0,101010256,!0),c.setUint16(8,r.length,!0),c.setUint16(10,r.length,!0),c.setUint32(12,l,!0),c.setUint32(16,i,!0),new Blob([...t,...s,new Uint8Array(c.buffer)],{type:"application/zip"})}var Lt=null,Wo=0,_t=new Map;function Vo(r){return Lt||(Lt=new Worker("export-worker.js?v="+r),Lt.onmessage=e=>{let t=e.data,s=_t.get(t.id);s&&(t.type==="progress"?s.onProgress&&s.onProgress(t.value):t.type==="done"?(_t.delete(t.id),s.resolve(t)):t.type==="error"&&(_t.delete(t.id),s.reject(new Error(t.message))))},Lt.onerror=e=>{for(let[,t]of _t)t.reject(new Error(e.message||"Erreur du moteur d\u2019export"));_t.clear(),Lt=null},Lt)}function It(r){return(r||"motif").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-zA-Z0-9 _-]+/g,"").trim().replace(/\s+/g,"-").slice(0,40)||"motif"}async function $i(r,e,{stems:t=!1,loops:s=2,sr:i=48e3,bits:a=24,onProgress:o,build:n}){let l=JSON.parse(JSON.stringify(r.project)),c=[];for(let y=0;y<4;y++)c.push({part:"drum",lane:y,preset:ye(l.parts.drum.kit[y]),macros:l.parts.drum.macros[y]});c.push({part:"bass",preset:ye(l.parts.bass.preset),macros:l.parts.bass.macros}),c.push({part:"lead",preset:ye(l.parts.lead.preset),macros:l.parts.lead.macros});let d=Array.from(e.samples.values()).map(y=>({id:y.id,sr:y.sr,data:y.data,gain:y.gain,loopStart:y.loopStart,loopEnd:y.loopEnd})),h=++Wo,v=Vo(n),f=await new Promise((y,k)=>{_t.set(h,{resolve:y,reject:k,onProgress:o}),v.postMessage({type:"render",id:h,project:l,presets:c,samples:d,sampleSets:e.sampleSets,stems:t,loops:s,sr:i,bits:a})}),m=It(l.name),p={null:"mix",d0:"kick",d1:"snare",d2:"hat",d3:"perc",bass:"basse",lead:"melodie"};return f.files.map(y=>({name:`${m}-${p[y.group]}.wav`,data:new Uint8Array(y.wav),peak:y.peak,seconds:y.seconds,group:y.group}))}async function ei(r,e,t){let s={id:yt(),name:r,created:Date.now(),size:e.size,type:e.type,blob:e,...t};return await Ce.put("renders",s),s}function Ji(r){let e=Yi(r.project,{loops:1});return new File([e],`${It(r.project.name)}.mid`,{type:"audio/midi"})}function Qi(r){return new File([r.exportProjectJSON()],`${It(r.project.name)}.motif.json`,{type:"application/json"})}function Zi(r){return Xi(r.map(e=>({name:e.name,data:e.data})))}async function Zt(r){try{if(navigator.canShare&&navigator.canShare({files:[r]}))return await navigator.share({files:[r],title:r.name}),"shared"}catch(s){if(s&&s.name==="AbortError")return"cancelled"}let e=URL.createObjectURL(r),t=document.createElement("a");return t.href=e,t.download=r.name,document.body.append(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(e),6e4),"downloaded"}var ta={phonk:{bassR:11,leadR:9,roots:[0,0,-2,-3],contour:[7,8,7,4,7,8,9,7],bassTies:2,leadSteps:7},ukg:{bassR:10,leadR:8,roots:[0,-2,-4,-3],contour:[9,7,9,11],bassTies:1,leadSteps:7},afro:{bassR:8,leadR:7,roots:[0,0,-2,-3],contour:[7,9,11,9,7,6],bassTies:0,leadSteps:5},amapiano:{bassR:13,leadR:3,roots:[0,-3,-2,-4],contour:[9,11,9,7],bassTies:2,leadSteps:7,chords:!0},reggaeton:{bassR:11,leadR:7,roots:[0,-2,-3,-1],contour:[7,9,10,9,7,6],bassTies:0,leadSteps:7},jersey:{bassR:14,leadR:14,roots:[0,-2,-3,-2],contour:[11,9,7,9],bassTies:0,leadSteps:7,chords:!0},dnb:{bassR:2,leadR:1,roots:[0,-3,-2,-4],contour:[9,11,12,11],bassTies:1,leadSteps:7,chords:!0},rage:{bassR:1,leadR:15,roots:[0,-1,-3,-4],contour:[7,11,14,11,9,7],bassTies:0,leadSteps:7},hardtechno:{bassR:5,leadR:4,roots:[0,0,1,0],contour:[7,7,8,7],bassTies:3,leadSteps:7},triphop:{bassR:3,leadR:2,roots:[0,-2,-3,-4],contour:[9,7,6,4],bassTies:1,leadSteps:7,chords:!0}};function Ko(r,e,t,s){let i=Dt[r][e],a=384*t,o=[];if(!i||!i.len)return o;for(let n=0;n<a;n+=i.len)for(let[l,,c]of i.ev){if(n+l>=a)continue;let d=1;r===2&&(d=0),o.push({t:n+l,v:c?.95:.74,x:d,c:.5})}return r===2&&s&&o.length&&(o[o.length-1].x=2),r===1&&o.length>2&&(o[o.length-1].v=1),o}function ea(r,e,t,{ties:s=0,chord:i=null}={}){let a=pt[r],o=384*e,n=[];if(!a||!a.len)return n;let l=a.ev.length,c=new Set;for(let h=0;h<s;h++)c.add(Math.round((h+1)*l/(s+1)));let d=0;for(let h=0;h<o;h+=a.len)a.ev.forEach(([v,f,m],p)=>{if(h+v>=o)return;let b=c.has(p)&&p>0,y=f;c.has((p+1)%l)&&(y=((p+1)%l===0?a.len+a.ev[0][0]:a.ev[p+1][0])-v+3);let k=t(h+v,d++),T=m?.95:.8;if(i)for(let R of i)n.push({t:h+v,d:Math.min(y,o-h-v),deg:k+R,acc:0,v:T*.9,tie:!1});else n.push({t:h+v,d:Math.min(y,o-h-v),deg:k,acc:0,v:T,tie:b})});return n}function sa(r){let e=Je.find(c=>c.style===r),t=Qe(r),s=ta[r],i=xt({kit:e.kit.slice(),bass:e.bass,lead:e.lead,tempo:t.bpm,key:t.key,scale:t.scale,name:"Exemple "+t.short});i.parts.drum.rhythm=e.rhythm.slice(),i.parts.bass.rhythm=s.bassR,i.parts.bass.ties=s.bassTies,i.parts.lead.rhythm=s.leadR,i.parts.lead.steps=s.leadSteps;let a=2,o=384,n=c=>s.roots[Math.floor(c/(o/2))%s.roots.length],l=c=>{let d=bt(c?"B":"A");for(let h=0;h<4;h++){let v=c&&h===2?Math.min(16,e.rhythm[h]+1):e.rhythm[h];d.drum[h].hits=Ko(h,v,a,c)}if(c&&d.drum[1].hits.length)for(let h of[o*2-48,o*2-24])d.drum[1].hits.push({t:h,v:.7,x:0,c:.5});return d.bass.notes=ea(s.bassR,a,h=>n(h)-7,{ties:s.bassTies}),d.lead.notes=ea(s.leadR,a,(h,v)=>s.contour[(v+(c?2:0))%s.contour.length]+(s.chords?n(h):0),{chord:s.chords?[0,2,4]:null}),c||(d.lead.notes=d.lead.notes.filter(h=>h.t<o||!s.chords||h.t%96===0)),d};return i.patterns=[l(!1),l(!0)],i.song={enabled:!1,sections:[]},i}var ia=Object.keys(ta);var xs=class{constructor(e,t){this.store=e,this.ctx=t,this.cur=null,this.audio=null}open(e,t,s={}){this.close(!0);let i=u("div",{class:"sheet-back",onclick:()=>this.close()}),a=u("button",{class:"close","aria-label":"Fermer",onclick:()=>this.close()},K("close")),o=u("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":e},u("div",{class:"grab"}),u("header",null,u("h2",{text:e}),...s.actions||[],a),u("div",{class:"body"},t));document.body.append(i,o),requestAnimationFrame(()=>{i.classList.add("open"),o.classList.add("open")});let n=null;return o.querySelector(".grab").addEventListener("pointerdown",l=>{n=l.clientY}),o.addEventListener("pointerup",l=>{n!==null&&l.clientY-n>60&&this.close(),n=null}),this.cur={back:i,sheet:o,onClose:s.onClose},o}close(e){let t=this.cur;if(t){if(this.cur=null,t.onClose&&t.onClose(),e){t.back.remove(),t.sheet.remove();return}t.back.classList.remove("open"),t.sheet.classList.remove("open"),setTimeout(()=>{t.back.remove(),t.sheet.remove()},280)}}menu(){let e=this.store,t=(a,o,n,l)=>u("button",{class:"item",onclick:l},u("span",{class:"ic"},K(a)),u("span",{class:"tx"},u("b",{text:o}),n?u("small",{text:n}):null)),s=document.documentElement.dataset.theme==="dark",i=u("div",{class:"list"},t("folder","Projets",e.project.name,()=>this.library()),t("plus","Nouvelle id\xE9e","Vide ou \xE0 partir d\u2019une sc\xE8ne",()=>this.newIdea()),t("share","Exporter","WAV, pistes s\xE9par\xE9es, MIDI, projet",()=>this.exportSheet()),t("speaker","Lecteur","Rendus et fichiers import\xE9s",()=>this.player()),t("settings","R\xE9glages","M\xE9tronome, clavier piano, doigts, th\xE8me",()=>this.settings()),t("dice","Sons au hasard","Batterie, basse et m\xE9lodie \xB7 annulable",()=>{this.close(),this.ctx.rollDice("all")}),t("wifi","Hors ligne et mises \xE0 jour","",()=>this.offline()),t("info","Aide","Les gestes en une page",()=>this.help()),t("file","Sons et licences","Provenance des banques int\xE9gr\xE9es",()=>this.licences()));this.open("MOTIF",i)}settings(){let e=this.store,t=e.settings,s=(c,d,h,v)=>{let f=u("button",{class:"item switch",role:"switch","aria-checked":String(!!t[c])},u("span",{class:"tx"},u("b",{text:d}),h?u("small",{text:h,style:{whiteSpace:"normal"}}):null),u("i",{class:"knob"}));return f.addEventListener("click",()=>{e.setSetting(c,!e.settings[c]),f.setAttribute("aria-checked",String(!!e.settings[c])),v&&v()}),f},i=(c,d,h)=>u("div",{class:"seg"},...d.map(v=>{let f=u("button",{"aria-pressed":String(t[c]===v)},h(v));return f.addEventListener("click",()=>{e.setSetting(c,v);for(let m of f.parentNode.children)m.setAttribute("aria-pressed",String(m===f))}),f})),a=Yo(),o=[["dark","Sombre"],["light","Clair"]];He.fluid&&o.push(["halloween","Halloween"]);let n=u("div",{class:"seg"},...o.map(([c,d])=>{let h=u("button",{"aria-pressed":String(c===a)},d);return h.addEventListener("click",()=>{Xo(c);for(let v of h.parentNode.children)v.setAttribute("aria-pressed",String(v===h))}),h})),l=u("div",null,u("div",{class:"sect"},u("h3",{text:"M\xE9tronome"}),u("div",{class:"list"},s("metro","M\xE9tronome","Un clic \xE0 chaque temps, plus aigu sur le premier. Raccourci : touche le tempo en haut. Jamais pr\xE9sent dans les exports."),s("metroAlways","Aussi sans enregistrer","Sinon, il ne sonne que pendant l\u2019enregistrement (REC).")),u("p",{class:"note",text:"Volume du clic"}),i("metroLevel",[-12,-6,0,6],c=>(c>0?"+":c<0?"\u2212":"")+Math.abs(c)+" dB")),u("div",{class:"sect"},u("h3",{text:"Surface de jeu"}),u("div",{class:"list"},s("piano","Clavier de piano","Basse et m\xE9lodie : touches blanches et noires, toutes les notes jouables. Les notes de la gamme sont marqu\xE9es d\u2019un point."),s("ghosts","Montrer les doigts \xE0 la lecture","Pendant la lecture, un doigt fant\xF4me refait le geste enregistr\xE9 (chaque gliss\xE9, chaque hauteur), avec sa tra\xEEn\xE9e. Pour les prises plus anciennes, un rond marque chaque note."))),He.fluid?u("div",{class:"sect"},u("h3",{text:"Effets fluides"}),u("div",{class:"list"},s("fluid","Fluide sous les doigts","Encre anim\xE9e sur la surface de jeu et les tweaks : tes doigts, les notes rejou\xE9es, le kick. Coup\xE9 si l\u2019iPhone demande de r\xE9duire les animations. D\xE9sactive-le pour \xE9conomiser la batterie.")),u("p",{class:"note",text:"O\xF9"}),i("fluidZone",["keys","all"],c=>c==="keys"?"Dans les touches":"Partout"),u("p",{class:"note",text:"Style"}),i("fluidStyle",["douce","normale","spectaculaire"],c=>({douce:"Doux",normale:"Normal",spectaculaire:"Spectaculaire"})[c]),u("p",{class:"note",text:"Encre"}),i("fluidInk",["libre","maitrisee"],c=>c==="libre"?"Libre":"Ma\xEEtris\xE9e"),u("p",{class:"note",text:"Libre : chaque note, gliss\xE9 et coup d\xE9pose toute son encre, sans limite (\xE7a peut d\xE9border et br\xFBler au blanc). Ma\xEEtris\xE9e : un budget par touche, un geste lent laisse un filet, un geste vif un panache."}),u("p",{class:"note",text:"Couleurs"}),u("div",{class:"seg wrap"},...i("fluidColors",["partie","notes","arc","neon"],c=>({partie:"Partie",notes:"Notes",arc:"Arc-en-ciel",neon:"N\xE9on"})[c]).children),u("p",{class:"note",text:"\xAB Dans les touches \xBB : chaque touche devient un tube, l\u2019encre ne passe pas d\u2019une touche \xE0 l\u2019autre. \xAB Notes \xBB : chaque note a sa couleur (voisines sur le cycle des quintes = couleurs voisines). Spectaculaire : tra\xEEn\xE9es longues, halo, et le kick secoue toute l\u2019encre."}),u("div",{class:"list",style:{marginTop:"8px"}},s("glass","Verre liquide","Le pad et la surface Tweaks deviennent une plaque de verre pos\xE9e sur l\u2019\xE9cran, dans l\u2019esprit Liquid Glass : son bord courbe ce qu\u2019il y a dessous et s\xE9pare un peu les couleurs, ses reflets suivent la lumi\xE8re, elle fl\xE9chit sous le doigt. Choisis son style plus bas."),s("mixGlass","Mix sous verre","Chaque tranche du Mix devient un tube de verre rempli de son niveau, et le son de chaque instrument y monte en lumi\xE8re liquide : un jet \xE0 chaque attaque, un filet tant qu\u2019il sonne."),s("glassSpill","Lumi\xE8re autour du verre","La lumi\xE8re de l\u2019encre d\xE9borde du verre sur l\u2019\xE9cran. Les boutons proches r\xE9v\xE8lent leur relief et projettent une ombre \xE0 l\u2019oppos\xE9 ; les boutons sans fond ne font ressortir que leur texte. Plus ils sont loin de la lumi\xE8re, moins elle les touche.")),u("p",{class:"note",text:"Style du verre"}),u("div",{class:"seg wrap"},...i("glassLook",["optique","liquide","depoli","cristal","prisme"],c=>({optique:"Optique",liquide:"Liquide",depoli:"D\xE9poli",cristal:"Cristal",prisme:"Prisme"})[c]).children),u("p",{class:"note",text:"Optique : une plaque claire et incolore, presque invisible, qui ne courbe que ses bords ; l\u2019encre et les touches restent nettes. Liquide : le verre pr\xE9c\xE9dent, une dalle plus \xE9paisse qui s\u2019\xE9claire de l\u2019encre et sous le doigt. D\xE9poli : un verre laiteux qui floute l\u2019encre en lueurs et s\u2019\xE9claire de la lumi\xE8re autour. Cristal : un bord biseaut\xE9 \xE0 facettes qui d\xE9cale et irise ce qu\u2019il y a dessous et accroche la lumi\xE8re. Prisme : un verre \xE9pais et tr\xE8s clair qui flotte au-dessus de l\u2019\xE9cran ; son large bord arrondi replie l\u2019image pr\xE8s du contour et la d\xE9compose en couleurs."}),u("p",{class:"note",text:"Puissance de la lumi\xE8re autour du verre"}),i("glassLight",["douce","normale","forte","max"],c=>({douce:"Douce",normale:"Normale",forte:"Forte",max:"Max"})[c]),u("p",{class:"note",text:"Hauteur des boutons (plus ils sont hauts, plus leur ombre est longue)"}),i("ctrlHeight",[3,6,10,15],c=>({3:"Plats",6:"Bas",10:"Hauts",15:"Tr\xE8s hauts"})[c]),u("p",{class:"note",text:"Mode clair : le verre et l\u2019encre"}),i("lightLook",["aquarelle","vitrail","classique"],c=>({aquarelle:"Aquarelle",vitrail:"Vitrail",classique:"Classique"})[c]),u("p",{class:"note",text:"Aquarelle : sous le verre un papier ivoire, l\u2019encre est un pigment qui colore l\u2019eau et fonce l\xE0 o\xF9 les couleurs se m\xEAlent ; la lumi\xE8re autour teinte l\u2019\xE9cran. Vitrail : la couleur de la partie, \xE9clair\xE9e comme un vitrail, une encre lumineuse et une lumi\xE8re color\xE9e autour. Classique : l\u2019aspect d\u2019avant."}),u("div",{class:"list",style:{marginTop:"8px"}},s("glassTilt","Le verre suit l\u2019iPhone","La lumi\xE8re reste fixe dans la pi\xE8ce : quand tu inclines le t\xE9l\xE9phone, les reflets glissent sur le verre comme sur un vrai objet. Tenu normalement, la lumi\xE8re vient d\u2019en haut \xE0 gauche. (iOS demande l\u2019autorisation d\u2019utiliser les mouvements.)",()=>{this.store.settings.glassTilt&&this.ctx.enableTilt&&this.ctx.enableTilt()})),u("p",{class:"note",text:"HDR (\xE9cran HDR : reflets, c\u0153urs d\u2019encre et lumi\xE8re autour du verre plus lumineux que le blanc)"}),i("fluidHdr",["normal","intense","max"],c=>({normal:"Normal",intense:"Intense",max:"Max"})[c]),u("div",{class:"list",style:{marginTop:"8px"}},s("hdrLight","HDR aussi en mode clair","L\u2019\xE9cran autour garde sa couleur exacte. Si la surface sous le verre te para\xEEt plus terne en mode clair, coupe-le : l\u2019iPhone assombrit un peu un calque HDR \xE0 c\xF4t\xE9 des couleurs de la page.")),u("p",{class:"note",text:"Moteur graphique"}),i("fluidEngine",["auto","webgl"],c=>c==="auto"?"Auto (WebGPU)":"Compatibilit\xE9 (WebGL)"),u("p",{class:"note",text:this.ctx.fluidStatus?this.ctx.fluidStatus():""}),u("button",{class:"big accent",style:{marginTop:"6px"},onclick:()=>{this.close(),this.ctx.previewFluid&&this.ctx.previewFluid()}},K("sparkle"),"Voir l\u2019aper\xE7u")):null,u("div",{class:"sect"},u("h3",{text:"Apparence"}),n,He.fluid?u("p",{class:"note",text:"Halloween : chaque bouton, chaque onglet et chaque touche du pad devient une petite poup\xE9e en 3D. Elle s\u2019\xE9crase sous le doigt, crie ou chante avec le son, et ses yeux suivent ton doigt. La nuit tombe autour : brume, braises, et sur le pad un cimeti\xE8re sous la lune. Si tu ne touches plus rien, elles finissent par te regarder."}):null),u("p",{class:"note",text:"Ces r\xE9glages restent sur cet appareil ; ils ne changent pas tes projets."}));this.open("R\xE9glages",l)}async library(){let e=this.store,t=u("div",{class:"list"}),s=async()=>{let o=await e.listProjects();t.replaceChildren(...o.map(n=>{let l=(n.patterns||[]).reduce((h,v)=>h+Us(v),0),c=new Date(n.updated||n.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}),d=u("button",{class:"close","aria-label":"Options du projet",onclick:h=>{h.stopPropagation(),this.projectMenu(n,s)}},K("more"));return u("div",{class:"item",role:"button",tabindex:"0","aria-current":String(n.id===e.project.id),onclick:async()=>{await e.openProject(n.id),this.close();let h=e.project;for(let v of[...h.parts.drum.kit,h.parts.bass.preset,h.parts.lead.preset])await this.ctx.loadBanksFor(ye(v));e.syncAll(),this.ctx.toast("Projet ouvert : "+n.name)}},u("span",{class:"tx"},u("b",{text:n.name}),u("small",{text:`${c} \xB7 ${n.tempo} BPM \xB7 ${l} \xE9v\xE9n.`})),d)}))};await s();let i=u("input",{type:"file",accept:".json,.motif,application/json",class:"hidden"});i.addEventListener("change",async()=>{let o=i.files[0];if(o){try{let n=await o.text();if(n.includes('"motif-3-backup"')){let l=await e.restoreBackup(n);this.ctx.toast(`${l} projet(s) restaur\xE9(s)`),await s()}else e.importProjectText(n),this.ctx.toast("Projet import\xE9"),this.close()}catch(n){this.ctx.toast("Import impossible : "+n.message)}i.value=""}});let a=u("div",null,u("div",{class:"grid2",style:{marginBottom:"12px"}},u("button",{class:"big accent",onclick:()=>this.newIdea()},K("plus"),"Nouvelle"),u("button",{class:"big",onclick:()=>i.click()},K("download"),"Importer")),t,i,u("div",{class:"sect"},u("h3",{text:"Sauvegarde hors de l\u2019app"}),u("p",{class:"note",text:"Les projets sont enregistr\xE9s automatiquement sur cet appareil. Pour les garder ailleurs (Fichiers, iCloud Drive\u2026), exporte une sauvegarde compl\xE8te."}),u("button",{class:"big",onclick:async()=>{let o=await e.backupAll(),n=new File([o],`MOTIF-sauvegarde-${new Date().toISOString().slice(0,10)}.json`,{type:"application/json"});await Zt(n)!=="cancelled"&&this.ctx.toast("Sauvegarde pr\xEAte")}},K("share"),"Sauvegarder tous les projets")));this.open("Projets",a)}projectMenu(e,t){let s=this.store,i=u("input",{class:"field",value:e.name,"aria-label":"Nom du projet"}),a=u("div",null,u("div",{class:"sect"},u("h3",{text:"Nom"}),i),u("div",{class:"list"},u("button",{class:"item",onclick:async()=>{let o=i.value.trim()||e.name;e.id===s.project.id?s.rename(o):(e.name=o,await Ce.put("projects",e)),await s.save(),this.library()}},u("span",{class:"tx"},u("b",{text:"Renommer"}))),u("button",{class:"item",onclick:async()=>{e.id!==s.project.id&&await s.openProject(e.id),await s.duplicateProject(),this.ctx.toast("Copie cr\xE9\xE9e"),this.library()}},u("span",{class:"tx"},u("b",{text:"Dupliquer"}))),u("button",{class:"item",onclick:async()=>{let o=new File([JSON.stringify(e,null,1)],`${It(e.name)}.motif.json`,{type:"application/json"});await Zt(o)}},u("span",{class:"tx"},u("b",{text:"Exporter le fichier projet"}))),u("button",{class:"item",onclick:()=>this.confirm(`Supprimer \xAB ${e.name} \xBB ?`,"Le projet sera effac\xE9 de cet appareil. Exporte-le avant si tu veux le garder.","Supprimer",async()=>{await s.deleteProject(e.id),this.ctx.toast("Projet supprim\xE9"),this.library()})},u("span",{class:"tx"},u("b",{text:"Supprimer\u2026",style:{color:"var(--rec)"}})))));this.open(e.name,a)}confirm(e,t,s,i){let a=u("div",null,u("p",{class:"note",text:t}),u("div",{class:"grid2"},u("button",{class:"big",onclick:()=>this.close(),text:"Annuler"}),u("button",{class:"big accent",style:{background:"var(--rec)",color:"#fff"},onclick:async()=>{this.close(!0),await i()},text:s})));this.open(e,a)}newIdea(){let e=this.store,t=u("div",{class:"list"},u("button",{class:"item",onclick:async()=>{await e.newProject(null),await s()}},u("span",{class:"ic"},K("plus")),u("span",{class:"tx"},u("b",{text:"Id\xE9e vierge"}),u("small",{text:"Kit Studio, 2 mesures"}))),u("button",{class:"item",onclick:async()=>{let a=e.planRandomProject();for(let o of[...a.parts.drum.kit,a.parts.bass.preset,a.parts.lead.preset])await this.ctx.loadBanksFor(ye(o));await e.save(),e.loadProject(a),await s(`${ye(a.parts.bass.preset).name} \xB7 ${ye(a.parts.lead.preset).name} \xB7 touche le d\xE9 pour relancer`)}},u("span",{class:"ic"},K("dice")),u("span",{class:"tx"},u("b",{text:"Id\xE9e au hasard"}),u("small",{text:"Sons et octaves tir\xE9s au sort, tempo et gamme d\u2019une sc\xE8ne"}))),...kt.map(a=>u("button",{class:"item",onclick:async()=>{await e.newProject(a.id),await s()}},u("span",{class:"ic"},K("sparkle")),u("span",{class:"tx"},u("b",{text:a.name}),u("small",{text:`${a.bpm} BPM \xB7 ${nt[a.key]} ${lt(a.scale).name.toLowerCase()} \xB7 sons de la sc\xE8ne`}))))),s=async a=>{this.close(),this.ctx.toast(a||"Nouvelle id\xE9e");let o=e.project;for(let n of[...o.parts.drum.kit,o.parts.bass.preset,o.parts.lead.preset])await this.ctx.loadBanksFor(ye(n));e.syncAll()},i=u("div",{class:"list"},...ia.map(a=>{let o=Qe(a);return u("button",{class:"item",onclick:async()=>{await e.save(),e.loadProject(sa(a)),await s("Exemple charg\xE9 : touche \u25B6")}},u("span",{class:"ic"},K("play")),u("span",{class:"tx"},u("b",{text:"Exemple "+o.short}),u("small",{text:`Boucle A + variation B \xB7 ${o.bpm} BPM`})))}));this.open("Nouvelle id\xE9e",u("div",null,u("div",{class:"sect"},u("h3",{text:"Partir de z\xE9ro"}),t),u("div",{class:"sect"},u("h3",{text:"Exemples \xE0 \xE9couter et modifier"}),i)))}browser(){let e=this.store,t=e.ui,s=t.part==="drum"?wt[t.lane]:t.part,i="all",a=u("div",{class:"list"}),o=u("div",{class:"filters"}),n=()=>t.part==="drum"?e.project.parts.drum.kit[t.lane]:e.project.parts[t.part].preset,l=()=>{let v=Ze(s).filter(m=>i==="all"||(i==="core"?!m.style:m.style===i));a.replaceChildren(...v.map(m=>{let p=m.style?Qe(m.style):null;return u("button",{class:"item","aria-current":String(m.id===n()),onclick:async()=>{await ti(m.id),l()}},u("span",{class:"tx"},u("b",{text:m.name}),u("small",{text:m.desc||""})),p?u("span",{class:"tag",text:p.short}):null)}));let f=a.querySelector('[aria-current="true"]');f&&f.scrollIntoView({block:"center"})},c=[["all","Tous"],["core","Base"],...kt.map(h=>[h.id,h.short])];o.replaceChildren(...c.map(([h,v])=>{let f=u("button",{"aria-pressed":String(i===h)},v);return f.addEventListener("click",()=>{i=h;for(let m of o.children)m.setAttribute("aria-pressed","false");f.setAttribute("aria-pressed","true"),l()}),f}));let d=u("div",null);if(t.part==="drum"){let h=u("div",{class:"seg",style:{marginBottom:"10px"}},...["Kick","Snare","Hat","Perc"].map((f,m)=>u("button",{"aria-pressed":String(t.lane===m),onclick:()=>{t.lane=m,this.browser(),e.changed("preset")}},f))),v=u("div",{class:"filters"},...Je.map(f=>u("button",{onclick:async()=>{for(let m of f.kit)await this.ctx.loadBanksFor(ye(m));e.applyKit(f.id,!1),this.ctx.toast("Kit "+f.name),l()}},f.name)));d.append(h,u("div",{class:"sect"},u("h3",{text:"Kits complets"}),v))}d.append(o,a),this.open(t.part==="drum"?"Sons de batterie":t.part==="bass"?"Basses":"M\xE9lodies",d),l()}keyPicker(){let e=this.store,t=u("div",{class:"cards"},...nt.map((i,a)=>u("button",{class:"pat",style:{width:"52px",height:"48px",fontSize:"16px"},"aria-pressed":String(e.project.key===a),onclick:()=>{e.set("key",a),this.keyPicker()}},i))),s=u("div",{class:"list"},...rs.map(i=>u("button",{class:"item","aria-current":String(e.project.scale===i.id),onclick:()=>{e.set("scale",i.id),this.keyPicker()}},u("span",{class:"tx"},u("b",{text:i.name}),u("small",{text:i.iv.map(a=>nt[(a+e.project.key)%12]).join(" \xB7 ")})))));this.open("Tonalit\xE9",u("div",null,u("div",{class:"sect"},u("h3",{text:"Tonique"}),t),u("div",{class:"sect"},u("h3",{text:"Gamme (les notes enregistr\xE9es suivent)"}),s)))}clearMenu(){let e=this.store,t=e.ui,s=(o,n,l)=>u("button",{class:"item",onclick:()=>{l(),this.close(),this.ctx.toast("Effac\xE9",{label:"Annuler",fn:()=>e.undo()})}},u("span",{class:"tx"},u("b",{text:o}),u("small",{text:n}))),i=[];t.part==="drum"?(i.push(s(`Effacer ${["le kick","la snare","le hat","la perc"][t.lane]}`,"Seulement cette ligne de batterie",()=>e.clearPart("drum",t.lane))),i.push(s("Effacer toute la batterie","Les quatre lignes",()=>e.clearPart("drum",null)))):i.push(s(`Effacer la ${t.part==="bass"?"basse":"m\xE9lodie"}`,"Toutes les notes de la boucle",()=>e.clearPart(t.part))),i.push(s("Effacer les mouvements","Automation des tweaks de cette partie",()=>{if(t.part==="drum")for(let o=0;o<4;o++)e.clearAuto("d"+o);else e.clearAuto(t.part)})),e.redoStack.length&&i.unshift(u("button",{class:"item",onclick:()=>{e.redo(),this.close(),this.ctx.toast("R\xE9tabli")}},u("span",{class:"tx"},u("b",{text:"R\xE9tablir"}),u("small",{text:"Refaire ce que \u21B6 vient d\u2019annuler"}))));let a=u("div",null,u("p",{class:"note",text:"Pour n\u2019effacer qu\u2019une portion : glisse sur la frise (ou touche une mesure) puis touche la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."}),u("div",{class:"list"},...i));this.open("Effacer",a)}song(){this.store.ui.view="song",document.querySelector('.nav [data-v="song"]').click()}songView(){let e=this.store,t=u("div",{class:"scroll"}),s=[],i=()=>{let o=e.project;t.replaceChildren();let n=new Ye({label:"Tempo",min:()=>40,max:()=>220,get:()=>e.project.tempo,set:p=>e.set("tempo",p),format:p=>({v:String(p),s:"BPM"}),step:5,onTap:()=>h()}),l=new Ye({label:"Swing",min:()=>50,max:()=>75,get:()=>e.project.swing,set:p=>e.set("swing",p),format:p=>({v:p===50?"OFF":p+"%",s:"groove"}),step:8}),c=new Ye({label:"Tonalit\xE9",min:()=>0,max:()=>11,get:()=>e.project.key,set:p=>e.set("key",p),format:p=>({v:nt[p],s:lt(e.project.scale).name}),step:14,onTap:()=>this.keyPicker()}),d=[],h=()=>{let p=performance.now();if(d=d.filter(b=>p-b<2500),d.push(p),d.length>=3){let b=(d[d.length-1]-d[0])/(d.length-1);e.set("tempo",Math.round(6e4/b)),n.render()}else this.ctx.toast("Tape encore pour r\xE9gler le tempo")};t.append(u("div",{class:"sect"},u("h3",{text:"Global"}),u("div",{class:"controls"},n.el,l.el,c.el))),requestAnimationFrame(()=>{n.render(),l.render(),c.render()}),t.append(u("div",{class:"sect"},u("h3",{text:"Longueur de la boucle"}),u("div",{class:"seg"},...Si.map(p=>u("button",{"aria-pressed":String(o.bars===p),onclick:()=>{let b=o.bars;p!==b&&(e.snapshot(),e.set("bars",p),i(),this.ctx.toast(p>b?"Boucle allong\xE9e : le contenu est r\xE9p\xE9t\xE9":"Boucle raccourcie : la fin est coup\xE9e",{label:"Annuler",fn:()=>e.undo()}))}},`${p} mes.`)))));let v=u("div",{class:"cards"},...o.patterns.map((p,b)=>{let y=u("button",{class:"pat","aria-pressed":String(o.current===b),onclick:()=>{e.selectPattern(b),i()}},p.name,u("small",{text:`${Us(p)} \xE9v.`})),k=0;return y.addEventListener("pointerdown",()=>{k=setTimeout(()=>{o.patterns.length>1&&this.confirm(`Supprimer la variation ${p.name} ?`,"Ses notes et mouvements seront effac\xE9s.","Supprimer",()=>{e.deletePattern(b),i()})},650)}),y.addEventListener("pointerup",()=>clearTimeout(k)),y.addEventListener("pointercancel",()=>clearTimeout(k)),y}),o.patterns.length<8?u("button",{class:"pat add","aria-label":"Nouvelle variation (copie)",onclick:()=>{e.addPattern(o.current),i(),this.ctx.toast("Variation copi\xE9e : modifie-la librement")}},"+"):null);t.append(u("div",{class:"sect"},u("h3",{text:"Variations de la boucle"}),v,u("p",{class:"note",text:"\xAB + \xBB copie la variation en cours. Appui long pour supprimer."})));let f=u("div",{class:"secs"});o.song.sections.forEach((p,b)=>{let y=[["d0","K"],["d1","S"],["d2","H"],["d3","P"],["bass","B"],["lead","L"]].map(([k,T])=>u("button",{"aria-pressed":String(!!(p.mute&&p.mute[k])),"aria-label":"Couper "+k,onclick:()=>{let R=JSON.parse(JSON.stringify(o.song));R.sections[b].mute={...R.sections[b].mute,[k]:!(p.mute&&p.mute[k])},e.setSong(R),i()}},T));f.append(u("div",{class:"sec"+(e.ui.playing&&o.song.enabled&&e.ui.section===b?" playing":"")},u("button",{class:"p","aria-label":"Changer de variation",onclick:()=>{let k=JSON.parse(JSON.stringify(o.song));k.sections[b].p=(p.p+1)%o.patterns.length,e.setSong(k),i()}},o.patterns[p.p]?o.patterns[p.p].name:"?"),u("button",{class:"reps",onclick:()=>{let k=JSON.parse(JSON.stringify(o.song)),T=[1,2,4,8];k.sections[b].reps=T[(T.indexOf(p.reps)+1)%T.length],e.setSong(k),i()}},`\xD7${p.reps}`),u("div",{class:"mutes"},...y),u("button",{class:"x","aria-label":"Retirer la section",onclick:()=>{let k=JSON.parse(JSON.stringify(o.song));k.sections.splice(b,1),k.sections.length||(k.enabled=!1),e.setSong(k),i()}},K("close"))))});let m=u("button",{class:"big"+(o.song.enabled?" accent":""),onclick:()=>{o.song.sections.length?e.setSong({...o.song,enabled:!o.song.enabled}):e.autoArrange(),i()}},K("song"),o.song.enabled?"Arrangement activ\xE9 (lecture du morceau)":"Lire l\u2019arrangement");t.append(u("div",{class:"sect"},u("h3",{text:"Arrangement"}),m,u("div",{style:{height:"8px"}}),f,u("div",{class:"grid2",style:{marginTop:"8px"}},u("button",{class:"big",onclick:()=>{let p=JSON.parse(JSON.stringify(o.song));p.sections.push({p:o.current,reps:2,mute:{}}),p.enabled=!0,e.setSong(p),i()}},K("plus"),"Section"),u("button",{class:"big",onclick:()=>{e.autoArrange(),i(),this.ctx.toast("Arrangement cr\xE9\xE9 \xE0 partir de tes variations")}},K("sparkle"),"D\xE9velopper")),u("p",{class:"note",text:"Chaque section joue une variation un certain nombre de fois ; touche K S H P B L pour couper une partie dans la section."}))),t.append(u("div",{class:"sect"},u("h3",{text:"Exporter"}),u("button",{class:"big accent",onclick:()=>this.exportSheet()},K("share"),"WAV, pistes, MIDI, projet")))};i();let a=this.store.on("change",o=>{(o==="section"||o==="song")&&i()});return s.push(a),{el:t,cleanup:()=>s.forEach(o=>o())}}exportSheet(){let e=this.store,t=this.ctx.host(),s=e.project,i=s.song.enabled&&s.song.sections.length,a=u("div",{class:"seg"},...[1,2,4,8].map(b=>u("button",{"aria-pressed":String(b===2),onclick:y=>{for(let k of a.children)k.setAttribute("aria-pressed","false");y.currentTarget.setAttribute("aria-pressed","true"),o=b}},`\xD7${b}`))),o=2,n=u("div",{class:"prog"},u("i")),l=u("p",{class:"note",text:""}),c=u("div",{class:"list"}),d=b=>{n.firstChild.style.width=Math.round(b*100)+"%"},h=(b,y)=>{c.prepend(u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:b.name}),u("small",{text:y})),u("button",{class:"pill on",onclick:async()=>{await Zt(b)==="downloaded"&&this.ctx.toast("Fichier t\xE9l\xE9charg\xE9")}},K("share"),"Partager")))},v=b=>{for(let y of m.querySelectorAll("button"))y.disabled=b},f=async b=>{v(!0),d(0),l.textContent=b?"Rendu des pistes\u2026":"Rendu du mix\u2026";try{let y=await $i(e,t,{stems:b,loops:o,onProgress:d,build:this.ctx.build});if(d(1),b){let k=Zi(y),T=new File([k],`${It(s.name)}-pistes.zip`,{type:"application/zip"});h(T,`${y.length} fichiers WAV 24 bits \xB7 ${(k.size/1e6).toFixed(1)} Mo`);let R=y.find(O=>O.group===null);R&&await ei(R.name,new Blob([R.data],{type:"audio/wav"}),{seconds:R.seconds,project:s.name})}else{let k=y[0],T=new Blob([k.data],{type:"audio/wav"}),R=new File([T],k.name,{type:"audio/wav"});h(R,`${k.seconds.toFixed(1)} s \xB7 WAV 24 bits 48 kHz \xB7 cr\xEAte ${(20*Math.log10(k.peak)).toFixed(1)} dBFS`),await ei(k.name,T,{seconds:k.seconds,project:s.name})}l.textContent="Pr\xEAt. Touche \xAB Partager \xBB pour l\u2019enregistrer dans Fichiers ou l\u2019envoyer."}catch(y){l.textContent="\xC9chec du rendu : "+y.message}v(!1)},m=u("div",{class:"list"},u("button",{class:"item",onclick:()=>f(!1)},u("span",{class:"ic"},K("speaker")),u("span",{class:"tx"},u("b",{text:"Mix WAV"}),u("small",{text:"Le morceau tel que tu l\u2019entends, effets et mouvements compris"}))),u("button",{class:"item",onclick:()=>f(!0)},u("span",{class:"ic"},K("mix")),u("span",{class:"tx"},u("b",{text:"Pistes s\xE9par\xE9es (ZIP)"}),u("small",{text:"Kick, snare, hat, perc, basse, m\xE9lodie + mix"}))),u("button",{class:"item",onclick:()=>{h(Ji(e),"Notes de batterie, basse et m\xE9lodie (MIDI type 1)")}},u("span",{class:"ic"},K("note")),u("span",{class:"tx"},u("b",{text:"MIDI"}),u("small",{text:"Pour continuer dans un logiciel de musique"}))),u("button",{class:"item",onclick:()=>{h(Qi(e),"Projet MOTIF modifiable")}},u("span",{class:"ic"},K("file")),u("span",{class:"tx"},u("b",{text:"Fichier projet"}),u("small",{text:"\xC0 r\xE9importer dans MOTIF"})))),p=u("div",null,i?u("p",{class:"note",text:"L\u2019arrangement est activ\xE9 : le rendu suit les sections."}):u("div",{class:"sect"},u("h3",{text:"R\xE9p\xE9titions de la boucle"}),a),m,u("div",{style:{height:"10px"}}),n,l,c);this.open("Exporter",p)}async player(){let e=u("div",{class:"list"}),t=this.audio||(this.audio=u("audio",{preload:"none"})),s=null,i=async()=>{let n=(await Ce.all("renders")).map(d=>({...d,kind:"Rendu"})),l=(await Ce.all("files")).map(d=>({...d,kind:"Import\xE9"})),c=[...n,...l].sort((d,h)=>h.created-d.created);c.length?e.replaceChildren(...c.map(d=>{let h=u("button",{class:"pill","aria-label":"Lire"},K("play"));h.addEventListener("click",()=>{if(s&&t.dataset.id===d.id&&!t.paused){t.pause();return}s&&URL.revokeObjectURL(s),s=URL.createObjectURL(d.blob),t.src=s,t.dataset.id=d.id,t.play().catch(()=>{})});let v=u("button",{class:"pill","aria-label":"Partager",onclick:()=>Zt(new File([d.blob],d.name,{type:d.type||"audio/wav"}))},K("share")),f=u("button",{class:"pill","aria-label":"Supprimer",onclick:()=>this.confirm("Supprimer ce fichier ?",d.name,"Supprimer",async()=>{await Ce.del(d.kind==="Rendu"?"renders":"files",d.id),this.player()})},K("trash"));return u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:d.name}),u("small",{text:`${d.kind} \xB7 ${new Date(d.created).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})} \xB7 ${((d.size||0)/1e6).toFixed(1)} Mo`})),h,v,f)})):e.replaceChildren(u("p",{class:"note",text:"Aucun rendu pour l\u2019instant. Exporte un mix WAV ou importe un fichier audio."}))},a=u("input",{type:"file",accept:"audio/*",class:"hidden",multiple:!0});a.addEventListener("change",async()=>{for(let n of a.files)await Ce.put("files",{id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),name:n.name,created:Date.now(),size:n.size,type:n.type,blob:n});a.value="",i()});let o=u("div",{class:"sect"},t);t.controls=!0,t.style.width="100%",await i(),this.open("Lecteur",u("div",null,o,u("button",{class:"big",style:{marginBottom:"10px"},onclick:()=>a.click()},K("download"),"Importer un fichier audio"),e,a,u("p",{class:"note",text:"Les rendus et fichiers import\xE9s restent sur cet appareil ; rien n\u2019est envoy\xE9 sur internet."})),{onClose:()=>{t.pause()}})}async offline(){let e=await gi(),t=navigator.storage&&navigator.storage.persisted?await navigator.storage.persisted().catch(()=>!1):!1,s=u("p",{class:"note",text:window.__motifOffline||"V\xE9rification\u2026"}),i=u("div",{class:"prog"},u("i")),a=u("div",null,u("div",{class:"sect"},u("h3",{text:"Hors ligne"}),s,i,u("button",{class:"big accent",style:{marginTop:"10px"},onclick:async()=>{s.textContent="T\xE9l\xE9chargement de tous les sons\u2026";try{await(window.__motifCacheAll?window.__motifCacheAll(o=>{i.firstChild.style.width=Math.round(o*100)+"%"}):Promise.reject(new Error("service worker indisponible"))),s.textContent="Tout est disponible hors ligne."}catch(o){s.textContent="\xC9chec : "+o.message}}},K("download"),"Tout rendre disponible hors ligne")),u("div",{class:"sect"},u("h3",{text:"Version"}),u("p",{class:"note",text:`MOTIF 3 \xB7 version ${this.ctx.build}. Les mises \xE0 jour ne touchent jamais \xE0 tes projets (ils sont dans la base locale, s\xE9par\xE9e du cache).`}),u("button",{class:"big",onclick:()=>window.__motifCheckUpdate&&window.__motifCheckUpdate(!0)},"Rechercher une mise \xE0 jour"),u("p",{class:"note"},"Version pr\xE9c\xE9dente pour comparer : ",u("a",{href:"https://motif-studio-iphone.taxulas.chatgpt.site/figure/",target:"_blank",rel:"noopener",style:{color:"var(--accent)"}},"MOTIF Studio 2.4")," (acc\xE8s priv\xE9).")),u("div",{class:"sect"},u("h3",{text:"Stockage"}),u("p",{class:"note",text:`${t?"Stockage persistant accord\xE9.":"Stockage standard (le navigateur peut le lib\xE9rer si l\u2019appareil manque de place ; exporte une sauvegarde de temps en temps)."}${e?` Utilis\xE9 : ${(e.usage/1e6).toFixed(1)} Mo.`:""}`})),u("div",{class:"sect"},u("h3",{text:"Son"}),u("button",{class:"big",onclick:async()=>{this.close();let o=await this.ctx.host().rebuild();this.ctx.toast(o?"Son r\xE9initialis\xE9":"Touchez l\u2019\xE9cran pour r\xE9activer le son")}},K("speaker"),"R\xE9initialiser le son")));this.open("Hors ligne et mises \xE0 jour",a)}help(){let e=(t,s)=>u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:t}),u("small",{text:s,style:{whiteSpace:"normal"}})));this.open("Les gestes",u("div",{class:"list"},e("Jouer","Touche le pad : le son joue avec le rythme choisi, sans lancer la boucle. Gauche-droite = notes, haut-bas = expression."),e("Enregistrer","REC arme. Le premier toucher lance la boucle et la prise. Rejouer par-dessus remplace ce qui passe sous ton doigt."),e("Rythme et liaisons","Glisse verticalement sur Rythme. Touche-le (ou glisse vers la droite) pour r\xE9gler les liaisons : les notes se lient et glissent."),e("Plage de notes","Glisse la fen\xEAtre pour la d\xE9placer (m\xEAme nombre de notes). Tire une poign\xE9e pour agrandir ou r\xE9duire. Touche ailleurs pour sauter."),e("Plusieurs doigts","Avec plusieurs doigts, l\u2019arp\xE8ge suit l\u2019ordre de pose ; \xAB Doigts \xBB change d\u2019ordre ou joue un accord."),e("Effacer une portion","Glisse sur la frise (ou touche une mesure), puis la corbeille. La gomme efface pendant la lecture, l\xE0 o\xF9 tu touches."),e("Changer de son","Glisse le nom ou utilise les fl\xE8ches : la boucle continue avec le nouveau son."),e("Tweaks","Chaque son a ses propres axes. Plusieurs points se bougent \xE0 la fois. Avec REC et lecture, les mouvements s\u2019enregistrent."),e("Batterie","Une colonne par son. Dans une colonne, gauche/milieu/droite = trois variantes, haut-bas = caract\xE8re."),e("Annuler","La fl\xE8che \u21B6 annule la derni\xE8re prise ou modification.")))}async licences(){let e=u("div",null,u("p",{class:"note",text:"Tous les sons synth\xE9tiques sont des cr\xE9ations originales de MOTIF. Les enregistrements int\xE9gr\xE9s sont dans le domaine public (CC0) ; ils ont \xE9t\xE9 convertis en mono, d\xE9coup\xE9s, normalis\xE9s et encod\xE9s en FLAC."}),u("div",{class:"list"},u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"Virtuosity Drums"}),u("small",{text:"Versilian Studios & Karoryfer Lecolds \xB7 CC0 1.0 \xB7 github.com/sfzinstruments/virtuosity_drums"}))),u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"Versilian Community Sample Library"}),u("small",{text:"Versilian Studios \xB7 CC0 1.0 \xB7 github.com/sgossner/VCSL"}))),He.fluid?u("div",{class:"item"},u("span",{class:"tx"},u("b",{text:"WebGL Fluid Simulation (effets fluides)"}),u("small",{text:"\xA9 2017 Pavel Dobryakov \xB7 licence MIT \xB7 github.com/PavelDoGreat/WebGL-Fluid-Simulation",style:{whiteSpace:"normal"}}))):null),u("p",{class:"note",text:"Le d\xE9tail fichier par fichier (chemin d\u2019origine, commit, transformations, empreinte SHA-256) est dans banks/*/bank.json et SOUNDS.md."}));this.open("Sons et licences",e)}};function Yo(){let r=document.documentElement;return r.hasAttribute("data-halloween")?"halloween":r.dataset.theme==="light"?"light":"dark"}function Xo(r){document.documentElement.toggleAttribute("data-halloween",r==="halloween"),document.documentElement.dataset.theme=r==="light"?"light":"dark";try{localStorage.setItem(He.storage+".theme",r)}catch{}let e=document.getElementById("themeColor");e&&e.setAttribute("content",r==="light"?"#f3efe6":r==="halloween"?"#0a0612":"#0b0c10"),window.dispatchEvent(new Event("resize")),window.dispatchEvent(new Event("motif:theme"))}function aa({toast:r,store:e,build:t}){if(window.__motifOffline="Le mode hors ligne s\u2019active apr\xE8s le premier chargement complet.",!("serviceWorker"in navigator)){window.__motifOffline="Ce navigateur ne permet pas le mode hors ligne.";return}let s=location.hostname==="localhost"||location.hostname==="127.0.0.1";if(location.protocol!=="https:"&&!s){window.__motifOffline="Hors ligne indisponible sans HTTPS.";return}if(s&&!/[?&]sw\b/.test(location.search)){navigator.serviceWorker.getRegistrations().then(h=>h.forEach(v=>v.unregister())),window.__motifOffline="Service worker d\xE9sactiv\xE9 en d\xE9veloppement local.";return}let i=null,a=new URL("sw.js",location.href).href,o=()=>!!navigator.serviceWorker.controller&&navigator.serviceWorker.controller.scriptURL===a,n=h=>{r("Mise \xE0 jour disponible",{label:"Installer",fn:async()=>{await e.save(),h.postMessage({type:"skipWaiting"})}})};navigator.serviceWorker.register("sw.js",{scope:"./"}).then(h=>{i=h,h.waiting&&o()&&n(h.waiting),h.addEventListener("updatefound",()=>{let v=h.installing;v&&v.addEventListener("statechange",()=>{v.state==="installed"&&o()&&n(v)})}),d()}).catch(h=>{window.__motifOffline="Service worker non install\xE9 : "+h.message});let l=o(),c=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!l||c||(c=!0,e.save().finally(()=>location.reload()))}),navigator.serviceWorker.addEventListener("message",h=>{let v=h.data||{};v.type==="status"&&(window.__motifOffline=v.text),v.type==="cacheProgress"&&window.__motifCacheProgress&&window.__motifCacheProgress(v.value)});async function d(){let h=await navigator.serviceWorker.ready;h.active&&h.active.postMessage({type:"status"})}window.__motifCheckUpdate=async h=>{if(i)try{await i.update(),h&&!i.waiting&&!i.installing&&r("MOTIF est \xE0 jour")}catch{h&&r("Pas de connexion")}},window.__motifCacheAll=h=>new Promise((v,f)=>{navigator.serviceWorker.ready.then(m=>{let p=new MessageChannel;p.port1.onmessage=b=>{let y=b.data;y.type==="progress"?h&&h(y.value):y.type==="done"?(window.__motifOffline="Tout est disponible hors ligne.",v()):y.type==="error"&&f(new Error(y.message))},m.active.postMessage({type:"cacheAll"},[p.port2])},f)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&window.__motifCheckUpdate(!1)})}var oa=Math.PI/180,ra={beta:50,gamma:0},ks=22,ws=6;function ii(r,e){let t=r*oa,s=e*oa;return[-Math.sin(s)*Math.cos(t),Math.sin(t),Math.cos(s)*Math.cos(t)]}function ai(r){let e=[r[0]-.62,r[1],Math.max(.18,r[2])],t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}var si=ii(ra.beta,ra.gamma),Bt=ai(si);function na(r){return[(r[0]-si[0])*1.4,(r[1]-si[1])*1.4]}var Ee=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,$o=`
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  float offset = 1.33333333;
  vL = vUv - texelSize * offset; vR = vUv + texelSize * offset;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Jo=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; varying vec2 vL; varying vec2 vR;
uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
  sum += texture2D(uTexture, vL) * 0.35294117;
  sum += texture2D(uTexture, vR) * 0.35294117;
  gl_FragColor = sum;
}`,Qo=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture;
void main () { gl_FragColor = texture2D(uTexture, vUv); }`,Zo=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`,Ss=`
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
#endif`,er=`
precision mediump float; precision mediump sampler2D;
varying vec2 vUv; uniform sampler2D uTexture; uniform vec3 curve; uniform float threshold;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
  float br = max(c.r, max(c.g, c.b));
  float rq = clamp(br - curve.x, 0.0, curve.y);
  rq = curve.z * rq * rq;
  c *= max(rq, br - threshold) / max(br, 0.0001);
  gl_FragColor = vec4(c, 0.0);
}`,tr=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25;
}`,sr=`
precision mediump float; precision mediump sampler2D;
varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture; uniform float intensity;
void main () {
  vec4 sum = texture2D(uTexture, vL) + texture2D(uTexture, vR) + texture2D(uTexture, vT) + texture2D(uTexture, vB);
  gl_FragColor = sum * 0.25 * intensity;
}`,ir=`
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uTexture;
void main () {
  vec4 c = texture2D(uTexture, vUv);
  float br = max(c.r, max(c.g, c.b));
  c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
  gl_FragColor = c;
}`,ar=`
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
}`,or=`
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
}`,rr=`
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
}`,nr=`
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
}`,lr=`
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,cr=`
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
}`,hr=`
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
}`,ur=`
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
}`,la={optique:{id:0,bevel:20,thick:26,p:2.2,disp:.012,depth:1},liquide:{id:1,bevel:30,thick:34,p:2.6,disp:.03,depth:1},depoli:{id:2,bevel:26,thick:26,p:2,disp:.008,depth:1},cristal:{id:3,bevel:20,thick:12,p:1,disp:.045,depth:3},prisme:{id:4,bevel:34,thick:28,p:3.2,disp:.015,depth:.9}},Ts=r=>la[r&&r.glassLook||"optique"]||la.optique,oi={SIM_RESOLUTION:128,DYE_RESOLUTION:512,DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,PRESSURE:.8,PRESSURE_ITERATIONS:16,CURL:24,SPLAT_RADIUS:.22,SPLAT_FORCE:5200,SHADING:!0,BLOOM:!0,BLOOM_ITERATIONS:7,BLOOM_RESOLUTION:192,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:128,SUNRAYS_WEIGHT:.8,IDLE_MS:4500},Ft=class{constructor(e={}){this.cfg={...oi,...e},this.canvas=document.createElement("canvas"),this.canvas.className="fluid",this.canvas.setAttribute("aria-hidden","true"),this.ok=!1,this.raf=0,this.last=0,this.lastInput=0,this.queue=[],this.gain=1,this.boost=0,this.slow=0,this.ema=16,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.ok=!1,this.stop()}),this.canvas.addEventListener("webglcontextrestored",()=>this.init()),this.init()}init(){let e={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!0,powerPreference:"low-power"},t=this.canvas.getContext("webgl2",e),s=!!t;if(t||(t=this.canvas.getContext("webgl",e)),!t)return;this.gl=t;try{"drawingBufferColorSpace"in t&&(t.drawingBufferColorSpace="display-p3")}catch{}this.p3=t.drawingBufferColorSpace==="display-p3";let i,a;if(s)t.getExtension("EXT_color_buffer_float"),a=!0;else if(i=t.getExtension("OES_texture_half_float"),a=t.getExtension("OES_texture_half_float_linear"),!i)return;let o=s?t.HALF_FLOAT:i.HALF_FLOAT_OES,n=(v,f)=>this.supports(v,f,o)?{internal:v,format:f}:null,l,c,d;if(s?(l=n(t.RGBA16F,t.RGBA),c=n(t.RG16F,t.RG)||l,d=n(t.R16F,t.RED)||c):l=c=d=n(t.RGBA,t.RGBA),!l)return;this.ext={type:o,rgba:l,rg:c,r:d,linear:!!a},a||(this.cfg.SHADING=!1,this.cfg.BLOOM=!1,this.cfg.SUNRAYS=!1);let h=(v,f,m)=>this.program(v,f,m);this.p={blur:h($o,Jo),copy:h(Ee,Qo),clear:h(Ee,Zo),bloomPre:h(Ee,er),bloomBlur:h(Ee,tr),bloomFinal:h(Ee,sr),sunMask:h(Ee,ir),sun:h(Ee,ar),splat:h(Ee,or),advect:h(Ee,rr,a?[]:["MANUAL_FILTERING"]),div:h(Ee,nr),curl:h(Ee,lr),vort:h(Ee,cr),pressure:h(Ee,hr),grad:h(Ee,ur)},this.setDisplay(),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),this.dither=this.noiseTexture(64),this.keys=null,this.scene=null,this.keyTex=null,this.resetLight(),this.maskAll=this.maskTexture(null,1,1),this.maskSim=this.maskDye=this.maskAll,this.dye=null,this.velocity=null,this.ok=!0}supports(e,t,s){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texImage2D(i.TEXTURE_2D,0,e,4,4,0,t,s,null);let o=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,o),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,a,0);let n=i.checkFramebufferStatus(i.FRAMEBUFFER)===i.FRAMEBUFFER_COMPLETE;return i.deleteFramebuffer(o),i.deleteTexture(a),n}shader(e,t,s){let i=this.gl,a=i.createShader(e);if(i.shaderSource(a,(s||[]).map(o=>`#define ${o}
`).join("")+t),i.compileShader(a),!i.getShaderParameter(a,i.COMPILE_STATUS)){let o=i.getShaderInfoLog(a);console.warn(o),(this.shaderErrors||(this.shaderErrors=[])).push(o)}return a}program(e,t,s){let i=this.gl,a=i.createProgram();i.attachShader(a,this.shader(i.VERTEX_SHADER,e)),i.attachShader(a,this.shader(i.FRAGMENT_SHADER,t,s)),i.bindAttribLocation(a,0,"aPosition"),i.linkProgram(a),i.getProgramParameter(a,i.LINK_STATUS)||console.warn(i.getProgramInfoLog(a));let o={},n=i.getProgramParameter(a,i.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let c=i.getActiveUniform(a,l).name;o[c]=i.getUniformLocation(a,c)}return{p:a,u:o,bind:()=>i.useProgram(a)}}setDisplay(){let e=[];this.cfg.SHADING&&e.push("SHADING"),this.cfg.BLOOM&&e.push("BLOOM"),this.cfg.SUNRAYS&&e.push("SUNRAYS"),this.p.display=this.program(Ee,Ss,e),this.p.light=this.program(Ee,Ss,[...e,"LIGHT_PASS"]),this.p.sources=this.program(Ee,Ss,[...e,"SOURCES_PASS"]),this.p.haze=this.program(Ee,Ss,[...e,"HAZE_PASS"])}noiseTexture(e){let t=this.gl,s=new Uint8Array(e*e*3),i=1234567;for(let o=0;o<s.length;o++)i=i*1103515245+12345&2147483647,s[o]=i>>23;let a=t.createTexture();return t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGB,e,e,0,t.RGB,t.UNSIGNED_BYTE,s),{width:e,height:e,attach:o=>(t.activeTexture(t.TEXTURE0+o),t.bindTexture(t.TEXTURE_2D,a),o)}}maskTexture(e,t,s){let i=this.gl,a=Jt(this.maskCanvas||(this.maskCanvas=document.createElement("canvas")),e,t,s),o=i.createTexture();return i.bindTexture(i.TEXTURE_2D,o),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!0),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,a),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),{tex:o,attach:n=>(i.activeTexture(i.TEXTURE0+n),i.bindTexture(i.TEXTURE_2D,o),n)}}setKeys(e,t){!this.ok||t===this.keySig||(this.keySig=t,this.keys=e,this.rebuildMasks(),this.clear())}rebuildMasks(){let e=this.gl;for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&e.deleteTexture(t.tex);if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}this.maskSim=this.maskTexture(this.keys,this.velocity.width,this.velocity.height),this.maskDye=this.maskTexture(this.keys,this.dye.width,this.dye.height)}setScene(e){if(!this.ok)return;let t=this.scene&&this.scene.sig===e.sig;this.scene=e,this.margin=e.glass?this.marginTest||4e3:0,t||(this.keyTexSig=null,this.requestRender())}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,s=this.hostH,i=e.sig+"|"+t+"x"+s;if(this.keyTexSig===i)return;let a=this.gl;this.keyTex&&a.deleteTexture(this.keyTex.tex);let o=ms(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,s),n=a.createTexture();a.bindTexture(a.TEXTURE_2D,n),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,o),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),this.keyTex={tex:n,attach:l=>(a.activeTexture(a.TEXTURE0+l),a.bindTexture(a.TEXTURE_2D,n),l)},this.keyTexSig=i}resetLight(){this.lightBase=Bt.slice(),this.light=Bt.slice(),this.lightTo=Bt.slice(),this.slide=[0,0],this.slideTo=[0,0],this.up=null,this.touchSlots=[],this.gelOn=!0,this.meters=new Float32Array(8),this.margin=0,this.off=[0,0],this.dpr=1,this.hostW=0,this.hostH=0,this.srcFbo=null,this.lightFbo=null,this.hazeFbo=null,this.keyLitTex=null}setLight(e,t){let s=this.lightBase;this.lightTo=[s[0]*.75+(e-.5)*.45,s[1]*.75+(.5-t)*.45,s[2]]}setTilt(e,t){let s=ii(t,e),i=this.up;this.up=i?i.map((a,o)=>a+(s[o]-a)*.25):s,this.lightBase=ai(this.up),this.slideTo=na(this.up),this.lightTo=this.lightBase.slice(),(!i||Math.abs(i[0]-this.up[0])+Math.abs(i[1]-this.up[1])+Math.abs(i[2]-this.up[2])>.002)&&this.wake()}aim(e){this.lightTo=e.slice(),this.wake()}aimReset(){this.lightTo=this.lightBase.slice(),this.wake()}resetTilt(){this.up=null,this.lightBase=Bt.slice(),this.lightTo=Bt.slice(),this.slideTo=[0,0],this.wake()}screenColor(e){if(e=e||[.043,.047,.063],!this.p3)return e;let t=e.map(i=>i<=.04045?i/12.92:((i+.055)/1.055)**2.4);return[.8225*t[0]+.1774*t[1],.0332*t[0]+.9669*t[1],.0171*t[0]+.0724*t[1]+.9108*t[2]].map(i=>i<=.0031308?i*12.92:1.055*i**(1/2.4)-.055)}stepLight(){for(let e=0;e<3;e++)this.light[e]+=(this.lightTo[e]-this.light[e])*.12;for(let e=0;e<2;e++)this.slide[e]+=(this.slideTo[e]-this.slide[e])*.12}setObstacles(e){this.obstacles=(e||[]).slice(0,16),this.wake()}setControlHeight(e){this.ctrlH=e,this.wake()}obstacleData(e){let t=this.dpr||1,s=this.hostH,i=new Float32Array(64),a=new Float32Array(16),o=this.obstacles||[];return o.forEach((n,l)=>{i.set(e?[n[0]*t,s-n[3]*t,n[2]*t,s-n[1]*t]:[n[0]*t,n[1]*t,n[2]*t,n[3]*t],l*4),a[l]=(n[4]||0)*t}),{rects:i,radii:a,n:o.length,lightH:ks*t,ctrlH:(this.ctrlH||ws)*t}}setKeyLights(e){let t=this.keyLit||(this.keyLit=new Uint8Array(256)),s=!1;for(let i=0;i<64;i++){let a=Math.round(Math.max(0,Math.min(1,e&&e[i]||0))*255);t[i*4]!==a&&(t[i*4]=a,s=!0)}s&&(this.keyLitDirty=!0,this.wake())}ensureKeyLit(){let e=this.gl;if(this.keyLit||(this.keyLit=new Uint8Array(256)),!this.keyLitTex){let t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);for(let[s,i]of[[e.TEXTURE_MIN_FILTER,e.NEAREST],[e.TEXTURE_MAG_FILTER,e.NEAREST],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,s,i);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,64,1,0,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitTex={tex:t,attach:s=>(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,t),s)},this.keyLitDirty=!1}this.keyLitDirty&&(e.bindTexture(e.TEXTURE_2D,this.keyLitTex.tex),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,1,e.RGBA,e.UNSIGNED_BYTE,this.keyLit),this.keyLitDirty=!1)}setMeters(e){for(let t=0;t<8;t++)this.meters[t]=e[t]||0;this.wake()}slabData(e){let t=this.scene||{},s=(t.slabs||[[0,0,1,1]]).slice(0,8),i=new Float32Array(32),a=new Float32Array(32);return s.forEach((o,n)=>i.set(e?[o[0],1-o[3],o[2],1-o[1]]:o,n*4)),(t.fills||[]).slice(0,8).forEach((o,n)=>a.set(o,n*4)),{slabs:i,fills:a,n:s.length}}press(e,t,s,i){let a=performance.now(),o=this.touchSlots.find(n=>n.id===e&&!n.up);i==="down"?(this.touchSlots=this.touchSlots.filter(n=>!n.up||a-n.up<450).slice(-3),this.touchSlots.push({id:e,x:t,y:s,down:a,up:0}),Ts(this.scene).id===1&&this.setLight(t,s)):o&&(o.x=t,o.y=s,(i==="up"||i==="cancel")&&(o.up=a,this.lightTo=this.lightBase.slice())),this.wake()}touchUniforms(e){let t=performance.now(),s=new Float32Array(16);return this.touchSlots=this.touchSlots.filter(i=>!i.up||t-i.up<450),this.touchSlots.slice(-4).forEach((i,a)=>{let o=i.up?Math.max(0,1-(t-i.up)/450):Math.min(1,(t-i.down)/90);s.set([i.x,e?1-i.y:i.y,(t-i.down)/1e3,o],a*4)}),s}keyAt(e,t){if(!this.keys)return 0;for(let s=this.keys.length-1;s>=0;s--){let i=this.keys[s];if(e>=i.x0&&e<i.x1&&t>=i.y0&&t<i.y1)return s+1}return 0}fbo(e,t,s,i){let a=this.gl;a.activeTexture(a.TEXTURE0);let o=a.createTexture();a.bindTexture(a.TEXTURE_2D,o),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,i),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,i),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texImage2D(a.TEXTURE_2D,0,s.internal,e,t,0,s.format,this.ext.type,null);let n=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,n),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,o,0),a.viewport(0,0,e,t),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),{texture:o,fbo:n,width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,attach:l=>(a.activeTexture(a.TEXTURE0+l),a.bindTexture(a.TEXTURE_2D,o),l)}}double(e,t,s,i){let a=this.fbo(e,t,s,i),o=this.fbo(e,t,s,i);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return a},set read(n){a=n},get write(){return o},set write(n){o=n},swap(){let n=a;a=o,o=n}}}resizeDouble(e,t,s,i,a){if(e.width===t&&e.height===s)return e;let o=this.fbo(t,s,i,a);return this.p.copy.bind(),this.gl.uniform1i(this.p.copy.u.uTexture,e.read.attach(0)),this.blit(o),e.read=o,e.write=this.fbo(t,s,i,a),e.width=t,e.height=s,e.texelSizeX=1/t,e.texelSizeY=1/s,e}res(e){let t=this.hostW/this.hostH;t<1&&(t=1/t);let s=Math.round(e),i=Math.round(e*t);return this.hostW>this.hostH?{width:i,height:s}:{width:s,height:i}}initBuffers(){let e=this.gl,t=this.ext,s=this.cfg,i=this.res(s.SIM_RESOLUTION),a=this.res(s.DYE_RESOLUTION),o=t.linear?e.LINEAR:e.NEAREST;e.disable(e.BLEND),this.dye=this.dye?this.resizeDouble(this.dye,a.width,a.height,t.rgba,o):this.double(a.width,a.height,t.rgba,o),this.velocity=this.velocity?this.resizeDouble(this.velocity,i.width,i.height,t.rg,o):this.double(i.width,i.height,t.rg,o),this.divergence=this.fbo(i.width,i.height,t.r,e.NEAREST),this.curl=this.fbo(i.width,i.height,t.r,e.NEAREST),this.pressure=this.double(i.width,i.height,t.r,e.NEAREST);let n=this.res(s.BLOOM_RESOLUTION);this.bloom=this.fbo(n.width,n.height,t.rgba,o),this.bloomFbos=[];for(let c=0;c<s.BLOOM_ITERATIONS;c++){let d=n.width>>c+1,h=n.height>>c+1;if(d<2||h<2)break;this.bloomFbos.push(this.fbo(d,h,t.rgba,o))}let l=this.res(s.SUNRAYS_RESOLUTION);this.sunrays=this.fbo(l.width,l.height,t.r,o),this.sunraysTemp=this.fbo(l.width,l.height,t.r,o),this.rebuildMasks()}blit(e){let t=this.gl;e?(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)):(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}attach(e){this.ok&&(this.host!==e&&(this.host=e,this.hostW=0,this.ro&&this.ro.disconnect(),this.ro=null),this.canvas.parentNode!==e&&e.insertBefore(this.canvas,e.firstChild),this.ro||(this.ro=new ResizeObserver(()=>this.requestRender()),this.ro.observe(e)),this.requestRender())}detach(){this.stop(),this.canvas.remove(),this.ro&&this.ro.disconnect(),this.ro=null,this.host=null}fit(){let e=this.host;if(!e)return;let t=Math.min(window.devicePixelRatio||1,2),s=e.getBoundingClientRect(),i=(e.closest(".app")||document.documentElement).getBoundingClientRect(),a=this.margin||0,o=k=>Math.round(Math.max(0,Math.min(a,k))),n=o(s.left-i.left),l=o(s.top-i.top),c=o(i.right-s.right),d=o(i.bottom-s.bottom),h=s.width+n+c,v=s.height+l+d,f=`${n},${l},${h},${v}`;f!==this.placeKey&&(this.placeKey=f,Object.assign(this.canvas.style,{left:-n+"px",top:-l+"px",width:h+"px",height:v+"px"}));let m=Math.max(2,Math.round(h*t)),p=Math.max(2,Math.round(v*t));(this.canvas.width!==m||this.canvas.height!==p)&&(this.canvas.width=m,this.canvas.height=p),this.dpr=t,this.off=[Math.round(n*t),Math.round(l*t)];let b=Math.max(2,Math.round(s.width*t)),y=Math.max(2,Math.round(s.height*t));(this.hostW!==b||this.hostH!==y||!this.dye)&&(this.hostW=b,this.hostH=y,this.initBuffers())}get aspect(){return this.hostW/this.hostH}splat(e,t,s,i,a,o=1,n=!1){this.ok&&(this.queue.push([e,t,s,i,a,o,n]),this.queue.length>64&&this.queue.shift(),this.wake())}burst(e,t,s,i=1,a=6,o=.8){let n=Math.random()*Math.PI*2;for(let l=0;l<a;l++){let c=n+l/a*Math.PI*2;this.splat(e+Math.cos(c)*.012,t+Math.sin(c)*.012,Math.cos(c)*.05*i,Math.sin(c)*.05*i,l===0?s:pr(s,.35),o)}}pulse(e){this.boost=Math.max(this.boost,e)}push(e,t,s,i,a=3){this.splat(e,t,s,i,{r:0,g:0,b:0},a,!0)}setStyle(e){let t=this.cfg,s={b:t.BLOOM,s:t.SUNRAYS};Object.assign(t,e),t.BLOOM=s.b,t.SUNRAYS=s.s}wake(){this.lastInput=performance.now(),!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}keepAwake(){!this.raf&&this.ok&&this.canvas.isConnected&&document.visibilityState==="visible"&&(this.last=performance.now(),this.lastFrameAt=0,this.raf=requestAnimationFrame(e=>this.frame(e)))}stop(){this.raf&&cancelAnimationFrame(this.raf),this.raf=0}clear(){if(!this.ok||!this.dye)return;let e=this.gl;e.clearColor(0,0,0,0);for(let t of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.bloom,this.sunrays])e.bindFramebuffer(e.FRAMEBUFFER,t.fbo),e.viewport(0,0,t.width,t.height),e.clear(e.COLOR_BUFFER_BIT);this.requestRender()}requestRender(){this.raf||this.pending||!this.ok||!this.canvas.isConnected||(this.pending=requestAnimationFrame(()=>{this.pending=0,!(this.raf||!this.canvas.isConnected)&&(this.fit(),this.render(!0))}))}frame(e){if(this.raf=0,!this.ok||!this.canvas.isConnected)return;let t=Math.min((e-this.last)/1e3,1/60);this.last=e,this.lastFrameAt&&e-this.lastInput<1500&&(this.ema+=(Math.min(200,e-this.lastFrameAt)-this.ema)*.1,this.slow=this.ema>45?this.slow+1:0),this.lastFrameAt=e,this.slow>60&&this.degrade(),this.fit();let s=e-this.lastInput<this.cfg.IDLE_MS;s?(this.rested=!1,this.inkOn!==!1?(this.applyInputs(),this.step(t),this.render()):(this.queue=[],this.render(!0))):this.stage&&(this.rested||(this.clear(),this.rested=!0),(this.restTick=(this.restTick||0)+1)%2===0&&this.render(!0)),this.boost*=.9,s||this.stage?this.raf=requestAnimationFrame(i=>this.frame(i)):this.clear()}degrade(){this.slow=0;let e=this.cfg;if(e.SUNRAYS)e.SUNRAYS=!1;else if(e.BLOOM)e.BLOOM=!1;else if(e.SIM_RESOLUTION>64)e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.dye=null,this.velocity=null,this.hostW=0;else return;this.setDisplay()}applyInputs(){let e=this.queue;this.queue=[];for(let[t,s,i,a,o,n,l]of e)this.splatNow(t,1-s,i*this.cfg.SPLAT_FORCE*dr(this.aspect),-a*this.cfg.SPLAT_FORCE*fr(this.aspect),o,n,l?0:this.keyAt(t,s))}splatNow(e,t,s,i,a,o,n){let l=this.gl,c=this.p.splat,d=this.cfg.SPLAT_RADIUS*o/100;this.aspect>1&&(d*=this.aspect),c.bind(),l.uniform1i(c.u.uTarget,this.velocity.read.attach(0)),l.uniform1f(c.u.aspectRatio,this.aspect),l.uniform2f(c.u.point,e,t),l.uniform3f(c.u.color,s,i,0),l.uniform1f(c.u.radius,d),l.uniform1f(c.u.targetId,n?n/255:0),l.uniform1i(c.u.uMask,this.maskSim.attach(1)),this.blit(this.velocity.write),this.velocity.swap(),l.uniform1i(c.u.uMask,this.maskDye.attach(1)),l.uniform1i(c.u.uTarget,this.dye.read.attach(0)),l.uniform3f(c.u.color,a.r*this.gain,a.g*this.gain,a.b*this.gain),this.blit(this.dye.write),this.dye.swap()}step(e){let t=this.gl,s=this.p,i=this.velocity,a=this.cfg;t.disable(t.BLEND),s.curl.bind(),t.uniform2f(s.curl.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.curl.u.uVelocity,i.read.attach(0)),this.blit(this.curl),s.vort.bind(),t.uniform2f(s.vort.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.vort.u.uVelocity,i.read.attach(0)),t.uniform1i(s.vort.u.uCurl,this.curl.attach(1)),t.uniform1f(s.vort.u.curl,a.CURL),t.uniform1f(s.vort.u.dt,e),this.blit(i.write),i.swap(),s.div.bind(),t.uniform2f(s.div.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.div.u.uVelocity,i.read.attach(0)),t.uniform1i(s.div.u.uMask,this.maskSim.attach(2)),this.blit(this.divergence),s.clear.bind(),t.uniform1i(s.clear.u.uTexture,this.pressure.read.attach(0)),t.uniform1f(s.clear.u.value,a.PRESSURE),this.blit(this.pressure.write),this.pressure.swap(),s.pressure.bind(),t.uniform2f(s.pressure.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.pressure.u.uDivergence,this.divergence.attach(0)),t.uniform1i(s.pressure.u.uMask,this.maskSim.attach(2));for(let n=0;n<a.PRESSURE_ITERATIONS;n++)t.uniform1i(s.pressure.u.uPressure,this.pressure.read.attach(1)),this.blit(this.pressure.write),this.pressure.swap();s.grad.bind(),t.uniform2f(s.grad.u.texelSize,i.texelSizeX,i.texelSizeY),t.uniform1i(s.grad.u.uPressure,this.pressure.read.attach(0)),t.uniform1i(s.grad.u.uVelocity,i.read.attach(1)),t.uniform1i(s.grad.u.uMask,this.maskSim.attach(2)),this.blit(i.write),i.swap(),s.advect.bind(),t.uniform2f(s.advect.u.texelSize,i.texelSizeX,i.texelSizeY),this.ext.linear||t.uniform2f(s.advect.u.dyeTexelSize,i.texelSizeX,i.texelSizeY);let o=i.read.attach(0);t.uniform1i(s.advect.u.uVelocity,o),t.uniform1i(s.advect.u.uSource,o),t.uniform1i(s.advect.u.uMask,this.maskSim.attach(2)),t.uniform1f(s.advect.u.dt,e),t.uniform1f(s.advect.u.dissipation,a.VELOCITY_DISSIPATION),this.blit(i.write),i.swap(),this.ext.linear||t.uniform2f(s.advect.u.dyeTexelSize,this.dye.texelSizeX,this.dye.texelSizeY),t.uniform1i(s.advect.u.uVelocity,i.read.attach(0)),t.uniform1i(s.advect.u.uSource,this.dye.read.attach(1)),t.uniform1i(s.advect.u.uMask,this.maskDye.attach(2)),t.uniform1f(s.advect.u.dissipation,a.DENSITY_DISSIPATION),this.blit(this.dye.write),this.dye.swap()}render(e){let t=this.gl,s=this.cfg,i=this.p;if(!this.dye)return;e||(s.BLOOM&&this.applyBloom(),s.SUNRAYS&&(this.applySunrays(),this.blur(this.sunrays,this.sunraysTemp,1))),this.ensureKeyTex();let a=this.scene||{};this.stepLight(),t.disable(t.BLEND);let o=t.drawingBufferWidth,n=t.drawingBufferHeight;if(a.glass){let l=this.srcFbo||(this.srcFbo=this.fbo(8,1,this.ext.rgba,t.NEAREST));this.useComposite(i.sources,a),this.blit(l);let c=this.ensureHazeFbo();this.useComposite(i.haze,a),t.uniform2f(i.haze.u.hazeRes,c.width,c.height),this.blit(c);let d=this.ensureLightFbo(o,n);this.useComposite(i.light,a),t.uniform2f(i.light.u.lightScale,o/d.width,n/d.height),i.light.u.uSources&&t.uniform1i(i.light.u.uSources,l.attach(7)),this.blit(d)}this.useComposite(i.display,a),a.glass&&(t.uniform1i(i.display.u.uLight,this.lightFbo.attach(5)),t.uniform2f(i.display.u.canvasRes,o,n),t.uniform2f(i.display.u.lightScale,o/this.lightFbo.width,n/this.lightFbo.height),i.display.u.uHaze&&(t.uniform1i(i.display.u.uHaze,this.hazeFbo.attach(7)),t.uniform2f(i.display.u.hazeRes,this.hazeFbo.width,this.hazeFbo.height))),this.blit(null)}ensureHazeFbo(){let e=this.gl,t=this.res(16),s=this.hazeFbo;return s&&s.width===t.width&&s.height===t.height?s:(s&&(e.deleteTexture(s.texture),e.deleteFramebuffer(s.fbo)),this.hazeFbo=this.fbo(t.width,t.height,this.ext.rgba,this.ext.linear?e.LINEAR:e.NEAREST),this.hazeFbo)}ensureLightFbo(e,t){let s=this.gl,i=Math.max(2,Math.ceil(e/2)),a=Math.max(2,Math.ceil(t/2)),o=this.lightFbo;return o&&o.width===i&&o.height===a?o:(o&&(s.deleteTexture(o.texture),s.deleteFramebuffer(o.fbo)),this.lightFbo=this.fbo(i,a,this.ext.rgba,this.ext.linear?s.LINEAR:s.NEAREST),this.lightFbo)}useComposite(e,t){let s=this.gl,i=this.cfg,a=e.u,o=s.drawingBufferHeight,n=this.hostW,l=this.hostH,c=this.dpr||1;e.bind(),s.uniform2f(a.texelSize,1/n,1/l),s.uniform2f(a.res,n,l),s.uniform2f(a.off,this.off[0],o-this.off[1]-l),s.uniform1f(a.dpr,c),s.uniform1i(a.uTexture,this.dye.read.attach(0)),s.uniform1f(a.gain,1),i.BLOOM&&(s.uniform1i(a.uBloom,this.bloom.attach(1)),s.uniform1i(a.uDithering,this.dither.attach(2)),s.uniform2f(a.ditherScale,n/this.dither.width,l/this.dither.height)),i.SUNRAYS&&s.uniform1i(a.uSunrays,this.sunrays.attach(3));let d=(y,k)=>a[y]&&s.uniform3f(a[y],k[0],k[1],k[2]);d("bgTop",t.bgTop||[.1,.11,.14]),d("bgBot",t.bgBot||[.07,.075,.094]),d("accent",t.accent||[.8,.9,.3]),d("surf",t.surf||[.086,.09,.114]),d("appBg",this.screenColor(t.appBg));let h=t.sep||[1,1,1,.06];s.uniform4f(a.sep,h[0],h[1],h[2],h[3]),s.uniform1f(a.sepPx,(t.sepPx||1)*c),a["kinds[0]"]&&s.uniform4fv(a["kinds[0]"],new Float32Array((t.kinds||Array(6).fill([0,0,0,0])).flat())),s.uniform1f(a.useKeys,t.keys?1:0),s.uniform1f(a.grid,t.kind==="xy"?1:0),s.uniform1f(a.darkTheme,t.dark===!1?0:1),this.keyTex&&t.keys&&s.uniform1i(a.uKeys,this.keyTex.attach(4)),s.uniform1f(a.glass,t.glass?1:0),s.uniform1f(a.radius,(t.radius||20)*c);let v=Ts(t);s.uniform1f(a.bevel,v.bevel*c),s.uniform1f(a.thickness,v.thick*c),a.look&&s.uniform4f(a.look,v.id,v.p,v.disp,v.depth);let f=this.stage||[0,0,0,0];a.stage&&s.uniform4f(a.stage,f[0],f[1],f[2],f[3]),s.uniform1f(a.gel,this.gelOn===!1?0:t.gel??1);let m=this.touchUniforms(!0);(a["touches[0]"]||a.touches)&&s.uniform4fv(a["touches[0]"]||a.touches,m);let p=this.slabData(!0);a["slabs[0]"]&&s.uniform4fv(a["slabs[0]"],p.slabs),a["fills[0]"]&&s.uniform4fv(a["fills[0]"],p.fills),a["meters[0]"]&&s.uniform1fv(a["meters[0]"],this.meters),s.uniform1f(a.nSlabs,p.n),s.uniform1f(a.mode,t.kind==="mix"?1:0),s.uniform2f(a.lightDir,this.light[0],this.light[1]),s.uniform1f(a.lightZ,this.light[2]),s.uniform2f(a.slide,this.slide[0],this.slide[1]),s.uniform1f(a.spillK,t.spill||0),s.uniform1f(a.shadowK,t.shadow||0),s.uniform1f(a.style,t.style||0);let b=t.keyGlow||[1,1,1,0];if(a.keyGlow&&s.uniform4f(a.keyGlow,b[0],b[1],b[2],b[3]),this.ensureKeyLit(),a.uKeyLit&&s.uniform1i(a.uKeyLit,this.keyLitTex.attach(6)),a["obst[0]"]){let y=this.obstacleData(!0);s.uniform4fv(a["obst[0]"],y.rects),s.uniform1f(a.nObst,y.n),s.uniform2f(a.obstH,y.lightH,y.ctrlH),a["obstR[0]"]&&s.uniform1fv(a["obstR[0]"],y.radii)}s.uniform1f(a.pulse,Math.min(1,this.boost)),s.uniform1f(a.hdr,1)}applyBloom(){let e=this.gl,t=this.cfg,s=this.p;if(this.bloomFbos.length<2)return;let i=this.bloom;e.disable(e.BLEND),s.bloomPre.bind();let a=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;e.uniform3f(s.bloomPre.u.curve,t.BLOOM_THRESHOLD-a,a*2,.25/a),e.uniform1f(s.bloomPre.u.threshold,t.BLOOM_THRESHOLD),e.uniform1i(s.bloomPre.u.uTexture,this.dye.read.attach(0)),this.blit(i),s.bloomBlur.bind();for(let o of this.bloomFbos)e.uniform2f(s.bloomBlur.u.texelSize,i.texelSizeX,i.texelSizeY),e.uniform1i(s.bloomBlur.u.uTexture,i.attach(0)),this.blit(o),i=o;e.blendFunc(e.ONE,e.ONE),e.enable(e.BLEND);for(let o=this.bloomFbos.length-2;o>=0;o--){let n=this.bloomFbos[o];e.uniform2f(s.bloomBlur.u.texelSize,i.texelSizeX,i.texelSizeY),e.uniform1i(s.bloomBlur.u.uTexture,i.attach(0)),this.blit(n),i=n}e.disable(e.BLEND),s.bloomFinal.bind(),e.uniform2f(s.bloomFinal.u.texelSize,i.texelSizeX,i.texelSizeY),e.uniform1i(s.bloomFinal.u.uTexture,i.attach(0)),e.uniform1f(s.bloomFinal.u.intensity,t.BLOOM_INTENSITY*(1+this.boost*.8)),this.blit(this.bloom)}applySunrays(){let e=this.gl,t=this.p;e.disable(e.BLEND),t.sunMask.bind(),e.uniform1i(t.sunMask.u.uTexture,this.dye.read.attach(0)),this.blit(this.dye.write),t.sun.bind(),e.uniform1f(t.sun.u.weight,this.cfg.SUNRAYS_WEIGHT),e.uniform1i(t.sun.u.uTexture,this.dye.write.attach(0)),this.blit(this.sunrays)}blur(e,t,s){let i=this.gl,a=this.p;a.blur.bind();for(let o=0;o<s;o++)i.uniform2f(a.blur.u.texelSize,e.texelSizeX,0),i.uniform1i(a.blur.u.uTexture,e.attach(0)),this.blit(t),i.uniform2f(a.blur.u.texelSize,0,e.texelSizeY),i.uniform1i(a.blur.u.uTexture,t.attach(0)),this.blit(e)}},dr=r=>r<1?r:1,fr=r=>r>1?1/r:1,pr=(r,e)=>({r:r.r*e,g:r.g*e,b:r.b*e});var mr=`
struct U { texel: vec2f, dyeTexel: vec2f, point: vec2f, aspect: f32, radius: f32, color: vec4f, a: f32, b: f32, c: f32, d: f32, curve: vec4f, e: vec4f };
struct VO { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VO {
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var o: VO; o.pos = vec4f(p[i], 0.0, 1.0); o.uv = vec2f(p[i].x * 0.5 + 0.5, 0.5 - p[i].y * 0.5); return o;
}
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var sl: sampler;
fn tx(t: texture_2d<f32>, uv: vec2f) -> vec4f { return textureSampleLevel(t, sl, uv, 0.0); }
`,vr={copy:`@group(0) @binding(2) var t0: texture_2d<f32>;
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
}`},Ls=`
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
`,Ms=`var<private> selRect: vec4f;
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
`,gr=()=>Ls+`@group(0) @binding(2) var dye: texture_2d<f32>;
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
`+Ms+`fn inkAt(uv: vec2f) -> vec3f {
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
}`,ri=`@group(0) @binding(2) var dye: texture_2d<f32>;
@group(0) @binding(3) var bloom: texture_2d<f32>;
@group(0) @binding(4) var keys: texture_2d<f32>;
@group(0) @binding(5) var sn: sampler;
@group(0) @binding(6) var keyLit: texture_2d<f32>;
@group(0) @binding(7) var srcT: texture_2d<f32>;
@group(0) @binding(8) var haze: texture_2d<f32>;
`,br=()=>Ls+ri+Ms+`@fragment fn fs(i: VO) -> @location(0) vec4f { return aroundLight(i.pos.xy * s.lightScale - s.off); }
`,yr=()=>Ls+ri+Ms+`@fragment fn fs(i: VO) -> @location(0) vec4f {
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
`,xr=()=>Ls+ri+Ms+`@fragment fn fs(i: VO) -> @location(0) vec4f {
  let c0 = floor(i.pos.xy);
  var sum = vec3f(0.0);
  for (var j = 0; j < 8; j = j + 1) {
    for (var n = 0; n < 8; n = n + 1) { sum = sum + glowAt((c0 + (vec2f(f32(n), f32(j)) + 0.5) / 8.0) / s.hazeRes); }
  }
  return vec4f(sum / 64.0, 1.0);
}
`,kr=()=>GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST,es=256,ts=class r extends Ft{static supported(){return typeof navigator<"u"&&!!navigator.gpu}static async create(){try{let e=new r;return await e.initGPU(),e.ok?e:null}catch(e){return console.warn("WebGPU indisponible, repli sur WebGL",e),null}}init(){}async initGPU(){this.cfg={...oi},this.ext={linear:!0};let e=await navigator.gpu.requestAdapter();if(!e)return;let t=await e.requestDevice();this.device=t,t.lost.then(()=>{this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let s=0;t.addEventListener("uncapturederror",f=>{console.warn("WebGPU",f.error&&f.error.message),++s>4&&this.ok&&(this.ok=!1,this.onLost&&this.onLost())});let i=this.canvas.getContext("webgpu");if(!i)return;this.ctx=i,this.format="rgba16float";try{i.configure({device:t,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:"extended"},alphaMode:"premultiplied"}),this.p3=!0;let f=i.getConfiguration?i.getConfiguration():null;this.extended=f?!!(f.toneMapping&&f.toneMapping.mode==="extended"):!0,this.rangeOn=!0}catch{this.format=navigator.gpu.getPreferredCanvasFormat(),i.configure({device:t,format:this.format,alphaMode:"premultiplied"}),this.extended=!1,this.p3=!1}this.hdrScreen=this.extended&&matchMedia("(dynamic-range: high)").matches,this.lin=t.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.near=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.rep=t.createSampler({magFilter:"nearest",minFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat"}),this.ubuf=t.createBuffer({size:es*512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.staging=new ArrayBuffer(es*512),this.f32=new Float32Array(this.staging),this.uOff=0;let a={},o=[],n=(f,m,p,b)=>{let y=t.createShaderModule({code:m});y.getCompilationInfo&&y.getCompilationInfo().then(T=>{for(let R of T.messages)R.type==="error"&&o.push(`${f}:${R.lineNum}: ${R.message}`)}),t.pushErrorScope("validation");let k=t.createRenderPipeline({layout:"auto",vertex:{module:y,entryPoint:"vs"},fragment:{module:y,entryPoint:"fs",targets:[{format:p,blend:b}]},primitive:{topology:"triangle-list"}});return t.popErrorScope().then(T=>{T&&o.push(`${f}: ${T.message}`)}),k},l={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},c=f=>mr+vr[f];a.copyRGBA=n("copy",c("copy"),"rgba16float"),a.copyRG=n("copy",c("copy"),"rg16float"),a.clear=n("clear",c("clear"),"r16float"),a.splatRG=n("splat",c("splat"),"rg16float"),a.splatRGBA=n("splat",c("splat"),"rgba16float"),a.advectRG=n("advect",c("advect"),"rg16float"),a.advectRGBA=n("advect",c("advect"),"rgba16float"),a.divergence=n("div",c("divergence"),"r16float"),a.curl=n("curl",c("curl"),"r16float"),a.vorticity=n("vort",c("vorticity"),"rg16float"),a.pressure=n("pressure",c("pressure"),"r16float"),a.gradient=n("grad",c("gradient"),"rg16float"),a.bloomPre=n("bloomPre",c("bloomPre"),"rgba16float"),a.bloomBlur=n("bloomBlur",c("bloomBlur"),"rgba16float"),a.bloomAdd=n("bloomAdd",c("bloomBlur"),"rgba16float",l),a.sunMask=n("sunMask",c("sunMask"),"rgba16float"),a.sun=n("sun",c("sun"),"r16float"),a.blur=n("blur",c("blur"),"r16float"),a.composite=n("composite",gr(),this.format),a.light=n("light",br(),"rgba16float"),a.sources=n("sources",yr(),"rgba16float"),a.haze=n("haze",xr(),"rgba16float"),this.pipes=a,this.layouts=new Map;let d=new Uint8Array(4096*4),h=1234567;for(let f=0;f<d.length;f++)h=h*1103515245+12345&2147483647,d[f]=h>>23;this.dither=this.texFromData(64,64,d),this.maskAll=this.texFromData(1,1,new Uint8Array([1,0,0,255])),this.maskSim=this.maskDye=this.maskAll,this.keyTex=this.texFromData(1,1,new Uint8Array([0,0,0,255])),this.keys=null,this.scene=null,this.resetLight(),this.dye=null,this.velocity=null,this.ok=!0,t.pushErrorScope("validation");try{this.canvas.width=96,this.canvas.height=128,this.hostW=96,this.hostH=128,this.initBuffers(),this.splat(.5,.5,.01,.01,{r:.3,g:.2,b:.1}),this.scene={glass:!0},this.applyInputs(),this.step(1/60),this.render(!1),this.scene=null}catch(f){o.push("dry run: "+f.message)}let v=await t.popErrorScope();if(v&&o.push(v.message),await t.queue.onSubmittedWorkDone(),await new Promise(f=>setTimeout(f,0)),this.queue=[],this.dye=null,this.canvas.width=2,this.canvas.height=2,this.hostW=0,o.length){console.warn("MOTIF WebGPU: repli sur WebGL \u2014",o.join(" | ")),this.problems=o,this.ok=!1;return}}tex(e,t,s){let i=this.device.createTexture({size:[e,t],format:s,usage:kr()});return{texture:i,view:i.createView(),width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,format:s}}double(e,t,s){let i=this.tex(e,t,s),a=this.tex(e,t,s);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,get read(){return i},set read(o){i=o},get write(){return a},set write(o){a=o},swap(){let o=i;i=a,a=o}}}texFromData(e,t,s){let i=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return this.device.queue.writeTexture({texture:i},s,{bytesPerRow:e*4},[e,t]),{texture:i,view:i.createView(),width:e,height:t}}texFromCanvas(e){let t=this.device.createTexture({size:[e.width,e.height],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return this.device.queue.copyExternalImageToTexture({source:e},{texture:t},[e.width,e.height]),{texture:t,view:t.createView(),width:e.width,height:e.height}}initBuffers(){let e=this.cfg,t=this.res(e.SIM_RESOLUTION),s=this.res(e.DYE_RESOLUTION);for(let o of[this.dye,this.velocity,this.pressure])o&&(o.read.texture.destroy(),o.write.texture.destroy());for(let o of[this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp,...this.bloomFbos||[]])o&&o.texture.destroy();this.dye=this.double(s.width,s.height,"rgba16float"),this.velocity=this.double(t.width,t.height,"rg16float"),this.divergence=this.tex(t.width,t.height,"r16float"),this.curl=this.tex(t.width,t.height,"r16float"),this.pressure=this.double(t.width,t.height,"r16float");let i=this.res(e.BLOOM_RESOLUTION);this.bloom=this.tex(i.width,i.height,"rgba16float"),this.bloomFbos=[];for(let o=0;o<e.BLOOM_ITERATIONS;o++){let n=i.width>>o+1,l=i.height>>o+1;if(n<2||l<2)break;this.bloomFbos.push(this.tex(n,l,"rgba16float"))}let a=this.res(e.SUNRAYS_RESOLUTION);this.sunrays=this.tex(a.width,a.height,"r16float"),this.sunraysTemp=this.tex(a.width,a.height,"r16float"),this.rebuildMasks(),this.zero()}rebuildMasks(){for(let t of[this.maskSim,this.maskDye])t&&t!==this.maskAll&&t.texture.destroy();if(!this.keys||!this.dye){this.maskSim=this.maskDye=this.maskAll;return}let e=this.maskCanvas||(this.maskCanvas=document.createElement("canvas"));this.maskSim=this.texFromCanvas(Jt(e,this.keys,this.velocity.width,this.velocity.height)),this.maskDye=this.texFromCanvas(Jt(e,this.keys,this.dye.width,this.dye.height))}ensureKeyTex(){let e=this.scene;if(!e||!e.keys)return;let t=this.hostW,s=this.hostH,i=e.sig+"|"+t+"x"+s;this.keyTexSig!==i&&(this.keyTex&&this.keyTex.texture.destroy(),this.keyTex=this.texFromCanvas(ms(this.keyCanvas||(this.keyCanvas=document.createElement("canvas")),e.keys,t,s)),this.keyTexSig=i)}get enc(){return this._enc||(this._enc=this.device.createCommandEncoder())}uniforms(e,t=1){let s=this.uOff;if(this.uOff+=es*t,this.uOff>this.staging.byteLength)throw new Error("uniform space");let i=this.f32,a=s/4;return i.fill(0,a,a+es*t/4),e(i,a),{buffer:this.ubuf,offset:s,size:es*t}}uni(e){return this.uniforms((t,s)=>{e.texel&&(t[s]=e.texel[0],t[s+1]=e.texel[1]),e.point&&(t[s+4]=e.point[0],t[s+5]=e.point[1]),t[s+6]=e.aspect||0,t[s+7]=e.radius||0,e.color&&(t[s+8]=e.color[0],t[s+9]=e.color[1],t[s+10]=e.color[2]),t[s+12]=e.a||0,t[s+13]=e.b||0,t[s+14]=e.c||0,t[s+15]=e.d||0,e.curve&&(t[s+16]=e.curve[0],t[s+17]=e.curve[1],t[s+18]=e.curve[2])})}pass(e,t,s,i,a){let o=this.layouts.get(e)||(this.layouts.set(e,e.getBindGroupLayout(0)),this.layouts.get(e)),n=[{binding:0,resource:s},{binding:1,resource:this.lin}];i.forEach((d,h)=>{d&&n.push({binding:2+h,resource:d})});let l=this.device.createBindGroup({layout:o,entries:n}),c=this.enc.beginRenderPass({colorAttachments:[{view:t.view||t,loadOp:a?"load":"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]});c.setPipeline(e),c.setBindGroup(0,l),c.draw(3),c.end()}flush(){this._enc&&(this.device.queue.writeBuffer(this.ubuf,0,this.staging,0,this.uOff),this.device.queue.submit([this._enc.finish()]),this._enc=null,this.uOff=0)}zero(){if(this.dye){for(let e of[this.dye.read,this.dye.write,this.velocity.read,this.velocity.write,this.pressure.read,this.pressure.write,this.divergence,this.curl,this.bloom,this.sunrays,this.sunraysTemp])this.enc.beginRenderPass({colorAttachments:[{view:e.view,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]}).end();this.flush()}}clear(){!this.ok||!this.dye||(this.zero(),this.requestRender())}applyInputs(){let e=this.queue;this.queue=[];for(let[t,s,i,a,o,n,l]of e)this.splatNow(t,s,i*this.cfg.SPLAT_FORCE*wr(this.aspect),-a*this.cfg.SPLAT_FORCE*Sr(this.aspect),o,n,l?0:this.keyAt(t,s))}splatNow(e,t,s,i,a,o,n){let l=this.cfg.SPLAT_RADIUS*o/100;this.aspect>1&&(l*=this.aspect);let c={point:[e,t],aspect:this.aspect,radius:l,a:n?n/255:0},d=this.velocity,h=this.dye;this.pass(this.pipes.splatRG,d.write,this.uni({...c,color:[s,i,0]}),[d.read.view,this.maskSim.view,this.near]),d.swap(),this.pass(this.pipes.splatRGBA,h.write,this.uni({...c,color:[a.r*this.gain,a.g*this.gain,a.b*this.gain]}),[h.read.view,this.maskDye.view,this.near]),h.swap()}step(e){let t=this.pipes,s=this.velocity,i=this.cfg,a=[s.texelSizeX,s.texelSizeY];this.pass(t.curl,this.curl,this.uni({texel:a}),[s.read.view]),this.pass(t.vorticity,s.write,this.uni({texel:a,a:e,c:i.CURL}),[s.read.view,this.curl.view]),s.swap(),this.pass(t.divergence,this.divergence,this.uni({texel:a}),[s.read.view,this.maskSim.view,this.near]),this.pass(t.clear,this.pressure.write,this.uni({a:i.PRESSURE}),[this.pressure.read.view]),this.pressure.swap();let o=this.uni({texel:a});for(let n=0;n<i.PRESSURE_ITERATIONS;n++)this.pass(t.pressure,this.pressure.write,o,[this.pressure.read.view,this.divergence.view,this.maskSim.view,this.near]),this.pressure.swap();this.pass(t.gradient,s.write,this.uni({texel:a}),[this.pressure.read.view,s.read.view,this.maskSim.view,this.near]),s.swap(),this.pass(t.advectRG,s.write,this.uni({texel:a,a:e,b:i.VELOCITY_DISSIPATION}),[s.read.view,s.read.view,this.maskSim.view,this.near]),s.swap(),this.pass(t.advectRGBA,this.dye.write,this.uni({texel:a,a:e,b:i.DENSITY_DISSIPATION}),[s.read.view,this.dye.read.view,this.maskDye.view,this.near]),this.dye.swap()}applyBloom(){let e=this.pipes,t=this.cfg;if(this.bloomFbos.length<2)return;let s=t.BLOOM_THRESHOLD*t.BLOOM_SOFT_KNEE+1e-4;this.pass(e.bloomPre,this.bloom,this.uni({curve:[t.BLOOM_THRESHOLD-s,s*2,.25/s],a:t.BLOOM_THRESHOLD}),[this.dye.read.view]);let i=this.bloom;for(let a of this.bloomFbos)this.pass(e.bloomBlur,a,this.uni({texel:[i.texelSizeX,i.texelSizeY],a:1}),[i.view]),i=a;for(let a=this.bloomFbos.length-2;a>=0;a--){let o=this.bloomFbos[a];this.pass(e.bloomAdd,o,this.uni({texel:[i.texelSizeX,i.texelSizeY],a:1}),[i.view],!0),i=o}this.pass(e.bloomBlur,this.bloom,this.uni({texel:[i.texelSizeX,i.texelSizeY],a:t.BLOOM_INTENSITY*(1+this.boost*.8)}),[i.view])}applySunrays(){let e=this.pipes;this.pass(e.sunMask,this.dye.write,this.uni({}),[this.dye.read.view]),this.pass(e.sun,this.sunrays,this.uni({a:this.cfg.SUNRAYS_WEIGHT}),[this.dye.write.view]),this.pass(e.blur,this.sunraysTemp,this.uni({texel:[this.sunrays.texelSizeX,0]}),[this.sunrays.view]),this.pass(e.blur,this.sunrays,this.uni({texel:[0,this.sunraysTemp.texelSizeY]}),[this.sunraysTemp.view])}setDisplay(){}setExtended(e){if(!(!this.ctx||this.format!=="rgba16float"||this.rangeOn===e)){this.rangeOn=e;try{this.ctx.configure({device:this.device,format:"rgba16float",colorSpace:"display-p3",toneMapping:{mode:e?"extended":"standard"},alphaMode:"premultiplied"})}catch{}this.requestRender()}}ensureKeyLit(){this.keyLit||(this.keyLit=new Uint8Array(256)),this.keyLitTex||(this.keyLitTex=this.texFromData(64,1,this.keyLit),this.keyLitDirty=!1),this.keyLitDirty&&(this.device.queue.writeTexture({texture:this.keyLitTex.texture},this.keyLit,{bytesPerRow:256},[64,1]),this.keyLitDirty=!1)}ensureHazeTex(){let e=this.res(16),t=this.hazeTex;return t&&t.width===e.width&&t.height===e.height?t:(t&&t.texture.destroy(),this.hazeTex=this.tex(e.width,e.height,"rgba16float"),this.hazeTex)}ensureLightTex(e,t){let s=Math.max(2,Math.ceil(e/2)),i=Math.max(2,Math.ceil(t/2)),a=this.lightTex;return a&&a.width===s&&a.height===i?a:(a&&a.texture.destroy(),this.lightTex=this.tex(s,i,"rgba16float"),this.lightTex)}render(e){if(!this.ok||!this.dye)return;let t=this.cfg;e||(t.BLOOM&&this.applyBloom(),t.SUNRAYS&&this.applySunrays()),this.ensureKeyTex();let s=this.scene||{};this.stepLight();let i=this.hostW,a=this.hostH,o=this.dpr||1,n=this.hdrScreen&&s.hdr||1,l=this.slabData(!1),c=this.canvas.width,d=this.canvas.height,h=s.glass?this.ensureLightTex(c,d):null,v=this.ensureHazeTex(),f=Ts(s),m=this.uniforms((b,y)=>{let k=(R,O)=>{for(let H=0;H<O.length;H++)b[y+R+H]=O[H]};k(0,[i,a]),k(2,[this.light[0],this.light[1]]),k(4,s.bgTop||[.1,.11,.14]),k(8,s.bgBot||[.07,.075,.094]),k(12,s.accent||[.8,.9,.3]),k(16,s.sep||[1,1,1,.06]),(s.kinds||[]).forEach((R,O)=>k(20+O*4,R)),k(44,[i/64,a/64]),k(46,[1/i,1/a]),k(48,[(s.sepPx||1)*o,s.keys?1:0,s.kind==="xy"?1:0,s.dark===!1?0:1,s.glass?1:0,(s.radius||20)*o,f.bevel*o,Math.min(1,this.boost)]),k(56,[n,t.BLOOM?1:0,t.SUNRAYS?1:0,t.SHADING?1:0]),b.set(this.touchUniforms(!1),y+60),k(76,[f.thick*o,this.gelOn===!1?0:s.gel??1,h?c/h.width:1,h?d/h.height:1]),b.set(l.slabs,y+80),b.set(l.fills,y+112),b.set(this.meters,y+144),k(152,[this.off[0],this.off[1],this.slide[0],-this.slide[1]]),k(156,[o,l.n,s.kind==="mix"?1:0,this.light[2],s.spill||0,s.shadow||0,c,d]),k(164,s.surf||[.086,.09,.114]),k(168,this.screenColor(s.appBg));let T=this.obstacleData(!1);b.set(T.rects,y+172),k(236,[T.n,T.lightH,T.ctrlH,s.style||0]),b.set(T.radii,y+240),k(256,s.keyGlow||[1,1,1,0]),k(260,[f.id,f.p,f.disp,f.depth]),k(264,[v.width,v.height]),k(268,this.stage||[0,0,0,0])},5);this.ensureKeyLit();let p=this.ctx.getCurrentTexture().createView();if(h){let b=this.srcTex||(this.srcTex=this.tex(8,1,"rgba16float"));this.pass(this.pipes.sources,b,m,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.haze,v,m,[this.dye.read.view,this.bloom.view]),this.pass(this.pipes.light,h,m,[this.dye.read.view,this.bloom.view,this.keyTex.view,this.near,this.keyLitTex.view,b.view])}this.pass(this.pipes.composite,p,m,[this.dye.read.view,this.bloom.view,this.sunrays.view,this.dither.view,this.keyTex.view,this.near,this.rep,(h||this.dither).view,this.keyLitTex.view,null,v.view]),this.flush()}degrade(){this.slow=0;let e=this.cfg;e.SUNRAYS?e.SUNRAYS=!1:e.BLOOM?e.BLOOM=!1:e.SIM_RESOLUTION>64&&(e.SIM_RESOLUTION=64,e.PRESSURE_ITERATIONS=10,this.hostW=0)}},wr=r=>r<1?r:1,Sr=r=>r>1?1/r:1;var ni=[".parts .ptab",".inst .arrow",".inst .name",".nav button"],Tr={pad:[".controls .dial",".range",".timeline > *",...ni],xy:[".groups .grp",".autobar > *",...ni],mix:[".mixknobs .dial",".fader .m",...ni]},ca=190,Mt={layouts:0,paints:0,writes:0,items:0},Lr=r=>{let e=getComputedStyle(r).backgroundColor.match(/[\d.]+/g);return!!e&&(e.length<4||+e[3]>.02)},ha=r=>{let e=document.createElement("div");return e.className=r,e.setAttribute("aria-hidden","true"),e};function ua(r){let e=[],t=null,s=[],i=ws,a={r:0,g:0,b:0,x:0,y:0,w:0},o=0,n=0,l=!1,c=1.6,d=null,h=0,v=[],f=0,m={sh:"0 0 0",hl:"255 255 255"},p=ha("spill-over"),b=()=>{for(let P of e){P.el.classList.remove("lit","solid");for(let $ of["--e","--ux","--uy","--l"])P.el.style.removeProperty($)}p.replaceChildren(),e=[]},y=new MutationObserver(P=>{if(!l||!d||h)return;let $=_=>_.target===p;P.some(_=>!$(_)&&(_.type==="attributes"||[..._.addedNodes].some(W=>W.nodeType===1)))&&(h=setTimeout(()=>{h=0,d&&k.layout(d.el,d.kind)},160))}),k={enable(P){l=P,document.documentElement.toggleAttribute("data-spill",P),P?(p.parentNode!==r&&r.append(p),y.observe(r,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["aria-selected","aria-pressed","disabled"]}),y.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),document.fonts&&document.fonts.ready.then(()=>{l&&d&&k.layout(d.el,d.kind)})):(y.disconnect(),b(),p.remove(),d=null,a={r:0,g:0,b:0,x:0,y:0,w:0},v=[],k.onObstacles([]),k.onSources([]))},setPower(P){c=P},setHeight(P){i=P},onObstacles(){},onSources(){},layout(P,$){if(Mt.layouts++,b(),t=null,d=null,!l||!P||!P.isConnected){k.onObstacles([]);return}d={el:P,kind:$},t=P.getBoundingClientRect();let _=r.getBoundingClientRect();m=document.documentElement.dataset.theme==="light"?{sh:"70 48 12",hl:"255 255 255"}:{sh:"0 0 0",hl:"255 255 255"};let W=($==="mix"?[...P.querySelectorAll(".fader")]:[P]).map(U=>U.getBoundingClientRect()),z=U=>W.some(q=>U.left<q.right&&U.right>q.left&&U.top<q.bottom&&U.bottom>q.top),he=[];s=[];for(let U of Tr[$]||[])for(let q of r.querySelectorAll(U)){let te=q.getBoundingClientRect();if(!te.width)continue;let J=Math.max(0,t.left-te.right,te.left-t.right),ee=Math.max(0,t.top-te.bottom,te.top-t.bottom);if(Math.hypot(J,ee)>ca*2.5)continue;let we=Lr(q);q.classList.toggle("solid",we);let ce={el:q,r:te,solid:we,ro:"",ang:"",te:-1,ta:0};if(we){let We={left:`${te.left-_.left}px`,top:`${te.top-_.top}px`,width:`${te.width}px`,height:`${te.height}px`,borderRadius:getComputedStyle(q).borderRadius};ce.rl=ha(""),Object.assign(ce.rl.style,We),ce.rl.style.setProperty("--hl",m.hl),ce.rl.style.setProperty("--sh",m.sh),p.append(ce.rl),z(te)||(he.push({d:Math.hypot(J,ee),r:[te.left-t.left,te.top-t.top,te.right-t.left,te.bottom-t.top,parseFloat(getComputedStyle(q).borderTopLeftRadius)||0]}),s.push(ce))}e.push(ce)}Mt.items=e.length,k.onObstacles(he.sort((U,q)=>U.d-q.d).slice(0,16).map(U=>U.r.map(q=>Math.round(q*10)/10))),a.w>0&&T()},emit(P,$=1,_,W){if(!l)return;let z=P.r*$,he=P.g*$,U=P.b*$,q=z+he+U;a.r+=z,a.g+=he,a.b+=U,_!==void 0&&q>0&&(a.x+=_*q,a.y+=W*q,a.w+=q,R(_,W,q,z,he,U)),T()}};function T(){o||(n=performance.now(),o=requestAnimationFrame(O))}function R(P,$,_,W,z,he){let U=t?t.height/t.width:1.4,q=null,te=1/0;for(let J of v){let ee=Math.hypot(J.x-P,(J.y-$)*U);ee<te&&(te=ee,q=J)}if(q&&(te<.22||v.length>=4)){let J=q.e+_;q.x=(q.x*q.e+P*_)/J,q.y=(q.y*q.e+$*_)/J,q.e=J,q.r+=W,q.g+=z,q.b+=he}else v.push({x:P,y:$,e:_,r:W,g:z,b:he})}function O(P){o=0;let $=Math.min(.1,(P-n)/1e3);n=P;let _=Math.exp(-$/.28);for(let U in a)a[U]*=_;let W=a.r+a.g+a.b,z=1-Math.exp(-W*.45),he=Math.exp(-$/.45);for(let U of v)U.e*=he,U.r*=he,U.g*=he,U.b*=he;v=v.filter(U=>U.e>.01),(v.length||f)&&(f=v.length,k.onSources(v.map(U=>{let q=Math.max(U.r,U.g,U.b,1e-6);return[U.x,U.y,1-Math.exp(-U.e*.5),U.r/q,U.g/q,U.b/q]}))),t&&Q(z<.01&&!v.length?0:1),(z>=.01||v.length)&&(o=requestAnimationFrame(O))}let H=(P,$,_,W,z)=>{P[$]!==z&&(P[$]=z,_.style[W]=z)};function le(P,$,_){let W=$.x-P.x,z=$.y-P.y;Math.abs(W)<.001&&(W=.001),Math.abs(z)<.001&&(z=.001);let he=1;for(let U of s){if(U===_)continue;let q=U.r,te=(q.left-P.x)/W,J=(q.right-P.x)/W,ee=(q.top-P.y)/z,we=(q.bottom-P.y)/z,ce=Math.max(Math.min(te,J),Math.min(ee,we),0),We=Math.min(Math.max(te,J),Math.max(ee,we),1);if(ce<We){let S=4.5*(1-We)+.15*i,C=ks*(1-We)-i,E=Math.min(1,Math.max(0,(C+S)/(2*S)));he*=E*E*(3-2*E)}}return .22+.78*he}function Q(P){Mt.paints++;let $=P?v.map(_=>({x:t.left+_.x*t.width,y:t.top+_.y*t.height,i:1-Math.exp(-_.e*.5)})):[];for(let _ of e){let{r:W}=_,z=W.left+W.width/2,he=W.top+W.height/2,U=0,q=0,te=0,J=0;for(let ee of $){let we=Math.min(Math.max(ee.x,W.left),W.right),ce=Math.min(Math.max(ee.y,W.top),W.bottom),We=Math.hypot(we-ee.x,ce-ee.y),S=ee.i*(s.length?le(ee,{x:we,y:ce},_):1)/(1+(We/ca)**2),C=z-ee.x,E=he-ee.y,D=Math.hypot(C,E)||1;U+=S,q+=S*C/D,te+=S*E/D,J+=S*We}if(U>0){J/=U;let ee=Math.hypot(q,te)||1;q/=ee,te/=ee}else q=0,te=1;if(U=Math.min(1,U*c),_.solid){if(H(_,"ro",_.rl,"opacity",U<.02?"0":Math.min(1,U*1.3).toFixed(2)),U>=.02){let ee=`${Math.round(Math.atan2(q,-te)*180/Math.PI)}deg`;ee!==_.ang&&(_.ang=ee,_.rl.style.setProperty("--ang",ee),Mt.writes++)}}else{let ee=U<.03?0:Math.min(1,U),we=Math.atan2(te,q);if(Math.abs(ee-_.te)<.03&&Math.abs(Math.atan2(Math.sin(we-_.ta),Math.cos(we-_.ta)))<.06||(_.te=ee,_.ta=we,Mt.writes++,_.el.classList.toggle("lit",ee>0),!ee))continue;let ce=_.el.style;ce.setProperty("--e",ee.toFixed(2)),ce.setProperty("--ux",q.toFixed(2)),ce.setProperty("--uy",te.toFixed(2)),ce.setProperty("--l",Math.min(2.2,.7+J*.006).toFixed(2))}}}return k}var da={normal:1.6,intense:2.6,max:4},fa={douce:.6,normale:1,forte:1.6,max:2.4},Mr=[3,6,10,15],pa={drum:28,bass:345,lead:78},ma=[18,40,52,300],Rr=[322,190,160,272],Er={bass:322,lead:190},Ar=[0,7,2,9,4,11,6,1,8,3,10,5],Dr=["optique","liquide","depoli","cristal","prisme"],va={douce:{cfg:{DENSITY_DISSIPATION:2.8,VELOCITY_DISSIPATION:.8,CURL:16,SPLAT_RADIUS:.18,BLOOM_INTENSITY:.3,BLOOM_THRESHOLD:.7,SUNRAYS_WEIGHT:.6},gain:.6,shake:0,rise:.01,dose:{down:.35,move:.1,kick:[.06,.2],snare:[.03,.14],hat:[.02,.05],perc:[.02,.06],note:[.1,.25],stir:[.07,.13]}},normale:{cfg:{DENSITY_DISSIPATION:2.1,VELOCITY_DISSIPATION:.6,CURL:24,SPLAT_RADIUS:.22,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.65,SUNRAYS_WEIGHT:.8},gain:.7,shake:0,rise:.012,dose:{down:.55,move:.16,kick:[.12,.4],snare:[.06,.28],hat:[.03,.1],perc:[.04,.12],note:[.15,.45],stir:[.1,.2]}},spectaculaire:{cfg:{DENSITY_DISSIPATION:1.5,VELOCITY_DISSIPATION:.4,CURL:32,SPLAT_RADIUS:.26,BLOOM_INTENSITY:.45,BLOOM_THRESHOLD:.72,SUNRAYS_WEIGHT:1},gain:.92,shake:1,rise:.016,dose:{down:.7,move:.2,kick:[.2,.5],snare:[.15,.4],hat:[.15,.05],perc:[.12,.3],note:[.2,.55],stir:[.15,.3]}}};function Pr(r,e,t){r=(r%360+360)%360/60;let s=Math.floor(r),i=r-s,a=t*(1-e),o=t*(1-i*e),n=t*(1-(1-i)*e),[l,c,d]=[[t,n,a],[o,t,a],[a,t,n],[a,o,t],[n,a,t],[t,a,o]][s%6];return{r:l,g:c,b:d}}function ga(r,{pad:e,xy:t}){let s=null,i="none",a=()=>{let S=new Ft;S.ok&&(s=S,i="webgl")};r.settings.fluidEngine!=="webgl"&&ts.supported()?ts.create().then(S=>{S?(s=S,i=S.hdrScreen?"webgpu-hdr":"webgpu",S.onLost=()=>{s=null,a(),ce.place()}):a(),ce.place()}):setTimeout(()=>{a(),ce.place()});let o=matchMedia("(prefers-reduced-motion: reduce)"),n=r.settings,l=()=>!!n.fluid&&!o.matches,c=()=>!!n.glass,d=ua(e.el.closest(".app")||document.querySelector(".app"));d.onObstacles=S=>{s&&s.setObstacles&&s.setObstacles(S)};let h=()=>document.documentElement.dataset.theme!=="light",v=()=>va[n.fluidStyle]||va.spectaculaire,f=null,m=null,p=()=>n.glassSpill===!1?0:fa[n.glassLight]||fa.forte,b=()=>Dr.includes(n.glassLook)?n.glassLook:"optique",y=()=>b()==="liquide",k=S=>{let C=n.fluidColors,E=S.part==="drum"||S.part===void 0;return C==="notes"?S.pc!==void 0?Ar.indexOf(S.pc)*30:E?ma[S.lane||0]:pa[S.part]:C==="arc"?performance.now()/1e3*48+(E?(S.lane||0)*24:S.x*70):C==="neon"?E?Rr[S.lane||0]:Er[S.part]+(S.x-.5)*30:E?ma[S.lane||0]:pa[S.part]+(S.x-.5)*(S.part==="lead"?70:40)},T=(S,C)=>{let E=n.fluidColors==="notes"||n.fluidColors==="arc"||n.fluidColors==="neon",D=n.lightLook||"aquarelle",I=Pr(k(S),h()?n.fluidColors==="neon"?1:.82:D==="aquarelle"?.85:D==="vitrail"?.72:E?.42:.28,1),Y=C*v().gain,ae={r:I.r*Y,g:I.g*Y,b:I.b*Y};return d.emit(ae,1,S.x,S.y),ae},R=new Map,O=()=>n.fluidInk!=="maitrisee",H=(S,C=.8,E)=>{let D=v().dose[S],I=Array.isArray(D)?D[0]+D[1]*C:D;if(O())return I;if(n.fluidZone==="keys"&&r.ui.view==="pattern"&&(I*=S==="note"||S==="down"||S==="move"?.95:.6),E!==void 0){let Y=performance.now(),ae=R.get(E)||{e:0,t:Y};ae.e*=Math.exp(-(Y-ae.t)/550),ae.t=Y;let se=I/(1+ae.e*2.2);return ae.e+=se,R.set(E,ae),se}return I},le=null,Q=null,P=()=>{if(s)if(m&&f===m.el){let S=W();s.setKeys(S.map(([C,E,D,I])=>({x0:C,y0:E,x1:D,y1:I})),"mix|"+JSON.stringify(S))}else if(n.fluidZone==="keys"&&r.ui.view==="pattern"){let S=e.keyLayout();s.setKeys(S.keys,S.sig)}else s.setKeys(null,"all")},$=S=>S===e.el?"pad":S===t.el?"xy":"mix",_=null,W=()=>{if(_)return _;let S=m.el.getBoundingClientRect(),C=m.faders.map(E=>{let D=E.el.getBoundingClientRect();return[(D.left-S.left)/S.width,(D.top-S.top)/S.height,(D.right-S.left)/S.width,(D.bottom-S.top)/S.height].map(I=>Math.round(I*1e4)/1e4)});return S.width>0&&(_=C),C},z=S=>Math.pow(Math.max(0,(S+40)/46),1.6),he=()=>{let S=r.project.parts,C=m.faders.map(I=>{let Y=I.part==="drum"?S.drum.level[I.lane]:S[I.part].level,ae=I.part==="drum"?S.drum.mute[I.lane]:S[I.part].mute,se=Ot(getComputedStyle(I.el).getPropertyValue("--fc")),xe=ae?.3:1;return[se[0]*xe,se[1]*xe,se[2]*xe,Math.round(Math.min(1,z(Y))*1e3)/1e3]}),E=parseFloat(getComputedStyle(m.faders[0].el).borderTopLeftRadius)||16,D=Js({kind:"mix",keys:null,sig:"mix",el:m.el,glass:!0,hdr:we(),slabs:W(),fills:C,spill:p(),radius:E,look:n.lightLook,gel:.8,glassLook:b()});D.sig!==le&&(le=D.sig,Q=D,s.setExtended&&s.setExtended(ee()),s.setScene(D))},U=()=>{let S=se=>[.18+.64*se,.72-.38*Math.sin(se*Math.PI)],C=We(),E=26,D=0,[I,Y]=S(0);ce.press("preview",I,Y,"down");let ae=()=>{D++;let[se,xe]=S(D/E);if(D<E){ce.press("preview",se,xe,"move"),y()&&d.emit({r:C[0],g:C[1],b:C[2]},.18,se,xe),setTimeout(ae,40);return}ce.press("preview",se,xe,"up");let ot=performance.now(),Ae=()=>{if(!s)return;let $e=(performance.now()-ot)/1800;if($e>=1){s.aimReset();return}let Fe=Math.PI*(.72-.55*Math.sin($e*Math.PI));s.aim([Math.cos(Fe)*.78,Math.sin(Fe)*.78,.62]),requestAnimationFrame(Ae)};requestAnimationFrame(Ae)};setTimeout(ae,40)},q=[],te=(S,C)=>{let E=performance.now(),D=q[S];D.e=(D.e||0)*Math.exp(-(E-(D.te||E))/420),D.te=E;let I=C/(1+D.e*3);return D.e+=I,I},J=S=>{if(!s||!m||f!==m.el)return;let C=performance.now(),E=W(),D=[];m.faders.forEach((I,Y)=>{let ae=I.part==="drum"?S.d[I.lane]:S[I.part],se=Math.max(0,Math.min(1,(20*Math.log10(Math.max(ae||0,1e-5))+48)/48));D[Y]=se;let xe=q[Y]||(q[Y]={env:0,t:0}),ot=se>xe.env+.15&&se>.45;if(xe.env=Math.max(se,xe.env*.9),!l()||!E[Y])return;let[Ae,$e,Fe,M]=E[Y],F=(Ae+Fe)/2,j=Fe-Ae,G=M-$e,X=M-G*.06,ue={part:I.part,lane:I.lane,x:F,y:X},Ne=.012+.03*se;ot?(s.splat(F,X,(Math.random()-.5)*j*.08,-Ne*2.2,T(ue,te(Y,.18+.4*se)),.9),I.part==="drum"&&I.lane===0&&s.pulse(.7*se),xe.t=C):se>.5&&C-xe.t>160&&(s.splat(F+(Math.random()-.5)*j*.4,X,0,-Ne,T(ue,te(Y,.05*se*se)),.6),xe.t=C)}),s.setMeters(D)},ee=()=>h()||n.hdrLight!==!1,we=()=>i==="webgpu-hdr"&&ee()?da[n.fluidHdr]||da.intense:1,ce={get fluid(){return s},spillStats:Mt,engine:()=>i,place(){let S=r.ui.view,C=S==="mix"&&!!m&&n.mixGlass!==!1,E=S==="pattern"?e.el:S==="tweaks"?t.el:C?m.el:null,D=!!s&&!!E&&(l()||c()||C);e.gpu=D&&E===e.el,t.gpu=D&&E===t.el,e.inkUnder=e.gpu&&l();for(let Y of[e.el,t.el,m&&m.el])Y&&Y.classList.toggle("gpu-host",D&&Y===E);for(let Y of[e.el,t.el])D&&Y===E&&c()?Y.dataset.glass=b():delete Y.dataset.glass;if(!D){s&&s.detach(),f=null,d.enable(!1),e.draw(),S==="tweaks"&&t.draw();return}s.setStyle(C?{...v().cfg,DENSITY_DISSIPATION:Math.max(2.6,v().cfg.DENSITY_DISSIPATION)}:v().cfg),s.gelOn=!o.matches,s.inkOn=l(),d.enable((c()||C)&&n.glassSpill!==!1),d.setPower(p());let I=Mr.includes(+n.ctrlHeight)?+n.ctrlHeight:6;d.setHeight(I),s.setControlHeight&&s.setControlHeight(I),requestAnimationFrame(()=>d.layout(E,$(E))),f!==E&&(s.clear(),f=E),s.attach(E),_=null,le=null,ce.syncScene(),P(),E===e.el?e.draw():E===t.el&&t.draw()},setMix(S){m=S,_=null,!S&&f&&f!==e.el&&f!==t.el&&(s&&s.detach(),f=null)},syncScene(){if(!f||!s)return;if(m&&f===m.el)return he();let S=f===e.el,C=S?e.keyLayout():null,E=Js({kind:S?"pad":"xy",keys:C&&C.keys,sig:C?C.sig:"xy",el:f,glass:!!n.glass,hdr:we(),spill:p(),look:n.lightLook,gel:S&&e.piano?.4:1,glassLook:b()});E.sig!==le&&(le=E.sig,Q=E,s.setExtended&&s.setExtended(ee()),s.setScene(E))},press(S,C,E,D){if(!(!s||!f||!s.press)&&(s.press(S,C,E,D),D==="down"&&c()&&y())){let I=We();d.emit({r:I[0],g:I[1],b:I[2]},.45,C,E)}},tilt(S,C){s&&(S===null?s.resetTilt():s.setTilt(S,C))},touch(S,C,E,D,I,Y,ae,se){if(!f||!l())return;P();let xe={part:S,lane:ae,pc:se,x:C,y:E};if(Y==="down")s.burst(C,E,T(xe,H("down",.8,"f"+Math.round(C*24))),.5,5,.7);else if(D||I){let ot=O()?1:Math.min(1,Math.max(.25,Math.hypot(D,I)*45)),Ae=H("move",.8,"m"+S+(ae||0))*ot*(!O()&&n.fluidZone==="keys"?.7:1);s.splat(C,E,D,I,T(xe,Ae),1)}},note(S,C,E,D,I=.8,Y){if(!f||r.ui.view!=="pattern"||!l())return;P();let ae={part:S,lane:D,pc:Y,x:C,y:E};if(S==="drum"){let Ae="d"+D;if(D===0)s.burst(C,E,T(ae,H("kick",I,Ae)),1.2*I+.4,7,1.1),s.pulse(.8);else if(D===1){let $e=T(ae,H("snare",I,Ae));s.splat(C,E,.03,-.004,$e,.8),s.splat(C,E,-.03,-.004,$e,.8)}else if(D===2)s.splat(C,E,(Math.random()-.5)*.01,-.02,T(ae,H("hat",I,Ae)),.35);else{let $e=T(ae,H("perc",I,Ae));for(let Fe=0;Fe<3;Fe++){let M=Fe/3*Math.PI*2;s.splat(C+Math.cos(M)*.03,E+Math.sin(M)*.03,-Math.sin(M)*.025,Math.cos(M)*.025,$e,.5)}}return}let se=v().rise,xe=n.fluidZone==="keys",ot=H("note",I,xe?S+Math.round(C*24):S)*(!O()&&e.hasStrokes(S)?.5:1);s.splat(C,E,(Math.random()-.5)*se*.8,-se,T(ae,ot),.9)},stir(S,C,E,D,I,Y){if(!f||r.ui.view!=="tweaks"||!l())return;let ae=S==="bass"||S==="lead",se={part:ae?S:"drum",lane:ae?0:+S.slice(1),x:C,y:E};s.splat(C,E,D,I,T(se,Y?H("stir",1):H("stir",0)),Y?1:.7)},level(S){if(!(!f||!S.trig||!l()))for(let C=0;C<S.trig.length;C+=4)S.trig[C]!==0||S.trig[C+1]!==0||(s.pulse(.6),v().shake&&s.push(.5,1.02,0,-.05,5))},keyLights(S){s&&s.setKeyLights&&f===e.el&&s.setKeyLights(S)},mixLevels(S){S&&J(S)},preview(){if(!f)return;if(!l()){U();return}if(P(),m&&f===m.el){let E=D=>({d:[0,1,2,3].map(I=>I===D?1:.01),bass:D===4?1:.01,lead:D===5?1:.01});for(let D=0;D<6;D++)setTimeout(()=>J(E(D)),D*140);setTimeout(()=>J({d:[1,.9,.8,.9],bass:1,lead:1}),950),setTimeout(()=>J({d:[.01,.01,.01,.01],bass:.01,lead:.01}),1500);return}let S=r.ui.part,C=(E,D)=>setTimeout(D,E);if(S==="drum")[[0,0],[180,2],[360,1],[540,2],[720,0],[820,3],[900,2],[1080,1],[1260,0],[1350,3]].forEach(([E,D])=>C(E,()=>ce.note("drum",(D+.5)/4,.55+Math.random()*.25,D,.95)));else{let E=e.piano?e.pianoLayout().keys.filter(I=>!I.black):e.columns(),D=E.length;for(let I=0;I<8;I++){let Y=Math.min(D-1,Math.round(I/7*(D-1))),ae=E[Y],se=e.piano?(ae.pos+.5)/e.pianoLayout().whites:(Y+.5)/D;C(I*150,()=>ce.note(S,se,.8-I*.05,0,.95,e.pitchClass(ae.deg,ae.acc)))}C(1250,()=>{s.pulse(1),v().shake&&s.push(.5,1.02,0,-.06,5)})}}};o.addEventListener&&o.addEventListener("change",()=>ce.place()),document.addEventListener("visibilitychange",()=>{s&&(document.visibilityState!=="visible"?s.stop():f&&(s.requestRender(),d.layout(f,$(f))))}),window.addEventListener("resize",()=>{f&&(d.layout(f,$(f)),m&&f===m.el&&(_=null,P(),ce.syncScene()))});let We=()=>Q&&Q.accent||[.8,.9,.3];return ce}var ba=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,ya=`#version 300 es
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
}`,xa=`#version 300 es
in vec2 aCorner;            // 0..1
in vec4 iRect;              // the plate: x, y, w, h (CSS px, y down)
in vec4 iPlate;             // corner radius, plate (1) or none (0), active (0..1), press flash
in vec4 iDoll;              // feet x, y (CSS px), height (CSS px), type
in vec4 iAnimA;             // squash, head x, head y, sway
in vec4 iAnimB;             // look x, look y, blink, mouth
in vec4 iAnimC;             // glow, scare, seed, reach
in vec4 iColor;             // glow colour, shadow strength
uniform vec2 uRes; uniform float uScale;
out vec2 vPos;
flat out vec4 vRect, vPlate, vDoll, vA, vB, vC, vCol;
void main() {
  // the quad covers the plate and the doll (with room for its squash, a jump and its glow)
  vec2 lo = iRect.xy, hi = iRect.xy + iRect.zw;
  if (iPlate.y < 0.5) { lo = vec2(1e5); hi = vec2(-1e5); }
  if (iDoll.z > 0.5) {
    float s = iDoll.z;
    lo = min(lo, iDoll.xy - vec2(0.75 * s, 1.25 * s));
    hi = max(hi, iDoll.xy + vec2(0.75 * s, 0.12 * s));
  }
  lo -= 6.0; hi += 6.0;
  vec2 p = mix(lo, hi, aCorner);
  vPos = p;
  vRect = iRect; vPlate = iPlate; vDoll = iDoll; vA = iAnimA; vB = iAnimB; vC = iAnimC; vCol = iColor;
  vec2 ndc = p * uScale / uRes * 2.0 - 1.0;
  gl_Position = vec4(ndc.x, -ndc.y, 0.0, 1.0);
}`,ka=`#version 300 es
precision highp float;
in vec2 vPos;
flat in vec4 vRect, vPlate, vDoll, vA, vB, vC, vCol;
uniform float uTime; uniform float uScale; uniform float uFlicker; uniform float uWatch; uniform float uCalm;
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

float TYPE, SEED, SQ, SWAY, BLINK, MOUTH, GLOW, SCARE, REACH;
vec2 HEAD, LOOK;

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
float sdBox2(vec2 p, vec2 b) { vec2 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0); }
float tri2(vec2 p, float r) {
  const float k = 1.7320508;
  p.x = abs(p.x) - r; p.y = p.y + r / k;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -2.0 * r, 0.0);
  return -length(p) * sign(p.y);
}
vec2 U(vec2 a, vec2 b) { return a.x < b.x ? a : b; }

// the head turns towards the finger (yaw, pitch) and wobbles on its spring
vec3 headSpace(vec3 p, vec3 c) {
  vec3 q = p - c;
  q.xz = rot(LOOK.x * 0.55) * q.xz;
  q.yz = rot(-LOOK.y * 0.32) * q.yz;
  return q;
}

// arms: from the shoulder down to a hand, raised when the doll reaches for a finger above it
void armPair(vec3 p, vec3 sh, vec3 hand, vec3 handUp, float r, inout float d, float k) {
  vec3 hd = mix(hand, handUp, REACH);
  float swing = 0.06 * sin(uTime * 2.3 + SEED * 9.0);
  vec3 hl = vec3(-hd.x, hd.y + swing, hd.z), hr = vec3(hd.x, hd.y - swing, hd.z);
  float a = min(sdCap(p, vec3(-sh.x, sh.y, sh.z), hl, r), sdCap(p, vec3(sh.x, sh.y, sh.z), hr, r));
  d = smin(d, a, k);
}

// ---- 0: the jack-o'-lantern doll ----
float pumpkinFace(vec2 p) {
  float wide = 1.0 + 0.3 * SCARE;
  vec2 e = vec2(abs(p.x) - 0.25, p.y - 0.13);
  e.y /= max(1.0 - BLINK * 0.85, 0.15);
  float eyes = tri2(e / wide, 0.12) * wide;
  float nose = tri2(vec2(p.x, p.y + 0.02), 0.055);
  vec2 m = vec2(p.x, p.y + 0.2);
  float open = MOUTH;
  float outer = length(m * vec2(1.0, 1.75 - 1.1 * open)) - 0.33;
  float inner = length((m - vec2(0.0, 0.14 + 0.14 * open)) * vec2(1.0, 1.45 - 0.5 * open)) - 0.34;
  float mouth = max(outer, -inner);
  // two square teeth hanging from the top of the grin
  mouth = max(mouth, -sdBox2(m - vec2(0.1, 0.0 + 0.05 * open), vec2(0.045, 0.06)));
  mouth = max(mouth, -sdBox2(m - vec2(-0.12, -0.02 - 0.05 * open), vec2(0.045, 0.05)));
  return min(min(eyes, nose), mouth);
}
vec2 pumpkin(vec3 p) {
  vec3 q = headSpace(p, vec3(HEAD.x, 0.26 + HEAD.y, 0.0));
  float a = atan(q.x, q.z);
  float lobes = pow(abs(sin(a * 4.0)), 0.6);
  float d = sdEll(q, vec3(0.72, 0.55, 0.66)) + 0.05 * (1.0 - lobes) * smoothstep(0.6, 0.05, abs(q.y));
  float f = pumpkinFace(q.xy);
  float cut = max(f, 0.2 - q.z);
  d = smax(d, -cut, 0.012);
  vec2 res = vec2(d * 0.85, (f < 0.015 && q.z > 0.08) ? M_GLOW : M_SKIN);
  vec3 sq = q - vec3(0.0, 0.47, -0.03);
  sq.x -= 0.6 * sq.y * sq.y;
  res = U(res, vec2(sdCap(sq, vec3(0.0), vec3(0.0, 0.22, 0.0), 0.075 - 0.08 * max(sq.y, 0.0)), M_STEM));
  // a witch's cloak, little arms, boots
  float b = sdRCone(p - vec3(0.0, -0.93, 0.0), 0.36, 0.17, 0.62);
  armPair(p, vec3(0.2, -0.38, 0.0), vec3(0.42, -0.66, 0.08), vec3(0.55, 0.42, 0.12), 0.07, b, 0.05);
  res = U(res, vec2(b, M_CLOTH));
  float boots = min(sdEll(p - vec3(-0.13, -1.03, 0.06), vec3(0.11, 0.08, 0.15)), sdEll(p - vec3(0.13, -1.03, 0.06), vec3(0.11, 0.08, 0.15)));
  return U(res, vec2(boots, M_BOOT));
}

// ---- 1: the voodoo doll ----
vec2 voodoo(vec3 p) {
  vec3 hc = vec3(HEAD.x, 0.33 + HEAD.y, 0.0);
  vec3 q = headSpace(p, hc);
  float head = sdEll(q, vec3(0.5, 0.46, 0.4));
  float d = smin(head, sdRBox(p - vec3(0.0, -0.45, 0.0), vec3(0.2, 0.28, 0.12), 0.14), 0.16);
  armPair(p, vec3(0.24, -0.28, 0.0), vec3(0.64, -0.2, 0.04), vec3(0.5, 0.48, 0.12), 0.105, d, 0.07);
  d = smin(d, min(sdCap(p, vec3(-0.14, -0.78, 0.0), vec3(-0.17, -1.0, 0.03), 0.11), sdCap(p, vec3(0.14, -0.78, 0.0), vec3(0.17, -1.0, 0.03), 0.11)), 0.05);
  // the mouth: stitched shut, it tears open to scream
  vec3 mq = q - vec3(0.0, -0.17, 0.38);
  float mo = length(mq.xy * vec2(1.0, 2.6 - 1.7 * MOUTH)) - 0.13 * (0.2 + MOUTH);
  d = smax(d, -max(mo, -mq.z - 0.07), 0.015);
  vec2 res = vec2(d, (mo < 0.0 && mq.z > -0.07) ? M_DARK : M_SKIN);
  // a big button eye sewn on the left
  vec3 bq = q - vec3(-0.18, 0.06, 0.37);
  float bt = max(length(bq.xy) - 0.115, abs(bq.z) - 0.035) - 0.012;
  res = U(res, vec2(bt, M_BUTTON));
  // the rope tied round its neck
  vec3 nq = p - vec3(HEAD.x * 0.5, -0.06 + HEAD.y * 0.5, 0.0);
  float rope = length(vec2(length(nq.xz * vec2(1.0, 1.35)) - 0.25, nq.y)) - 0.035;
  res = U(res, vec2(rope, M_ROPE));
  // pins stuck in it
  vec3 pa1 = vec3(0.1, -0.33, 0.12), pd1 = normalize(vec3(0.45, 0.45, 0.8));
  vec3 pa2 = vec3(-0.12, -0.55, 0.12), pd2 = normalize(vec3(-0.6, 0.1, 0.8));
  vec3 pa3 = hc + vec3(0.2, 0.25, 0.1), pd3 = normalize(vec3(0.5, 0.75, 0.45));
  float sh = min(min(sdCap(p, pa1, pa1 + pd1 * 0.36, 0.014), sdCap(p, pa2, pa2 + pd2 * 0.3, 0.014)), sdCap(p, pa3, pa3 + pd3 * 0.3, 0.014));
  res = U(res, vec2(sh, M_METAL));
  float ph = min(min(length(p - pa1 - pd1 * 0.38) - 0.06, length(p - pa2 - pd2 * 0.32) - 0.055), length(p - pa3 - pd3 * 0.32) - 0.055);
  return U(res, vec2(ph, M_PIN));
}

// ---- 2: the ghost ----
vec2 ghost(vec3 p) {
  float bob = 0.1 + 0.06 * sin(uTime * 2.1 + SEED * 6.0);
  p.y -= bob;
  vec3 q = headSpace(p, vec3(HEAD.x, 0.34 + HEAD.y, 0.0));
  float head = length(q * vec3(1.0, 0.96, 1.05)) - 0.5;
  float a = atan(p.x, p.z);
  vec3 sp = p - vec3(0.0, -0.98, 0.0);
  float skirt = sdRCone(sp, 0.6 + 0.04 * sin(a * 5.0 + uTime * 3.0), 0.4, 1.25);
  float d = smin(head, skirt, 0.28);
  // little arms under the sheet, waving
  float wv = 0.12 * sin(uTime * 3.0 + SEED * 5.0);
  vec3 hand = vec3(0.6, -0.12 + wv, 0.05);
  d = smin(d, min(sdCap(p, vec3(-0.3, 0.0, 0.0), vec3(-hand.x, hand.y - 2.0 * wv, hand.z), 0.1), sdCap(p, vec3(0.3, 0.0, 0.0), mix(hand, vec3(0.55, 0.55, 0.1), REACH), 0.1)), 0.18);
  // the waving hem
  float hem = -0.93 + 0.07 * sin(a * 7.0 + uTime * 3.1 + SEED * 4.0) + 0.04 * sin(a * 3.0 - uTime * 1.7);
  d = smax(d, hem - p.y, 0.05);
  // a hollow face
  vec2 f = q.xy;
  float wide = 1.0 + 0.3 * SCARE;
  vec2 e = vec2(abs(f.x) - 0.17, f.y - 0.08);
  float eyes = length(e * vec2(1.0, 0.72 / max(1.0 - 0.9 * BLINK, 0.1)) / wide) - 0.095;
  vec2 m = f - vec2(0.0, -0.16);
  float mouth = length(m * vec2(1.0 / (0.6 + 0.6 * MOUTH), 1.0 / (0.35 + 0.9 * MOUTH))) - 0.1;
  float face = min(eyes, mouth);
  d = smax(d, -max(face, 0.32 - q.z), 0.02);
  return vec2(d * 0.9, (face < 0.01 && q.z > 0.2) ? M_DARK : M_CLOTH);
}

// ---- 3: the calavera ----
vec2 skull(vec3 p) {
  vec3 q = headSpace(p, vec3(HEAD.x, 0.4 + HEAD.y, 0.0));
  float cran = sdEll(q - vec3(0.0, 0.06, -0.02), vec3(0.5, 0.47, 0.5));
  float d = smin(cran, sdEll(q - vec3(0.0, -0.16, 0.1), vec3(0.4, 0.24, 0.36)), 0.12);
  float jo = MOUTH * 0.17;
  d = smin(d, sdRBox(q - vec3(0.0, -0.39 - jo, 0.13), vec3(0.19, 0.05, 0.15), 0.08), 0.03 + 0.05 * (1.0 - MOUTH));
  vec3 e = vec3(abs(q.x) - 0.19, q.y + 0.0, q.z - 0.42);
  float sock = length(e * vec3(1.0, 1.0 + 0.5 * BLINK, 1.0)) - 0.15 * (1.0 + 0.2 * SCARE);
  d = smax(d, -sock, 0.05);
  d = smax(d, -sdEll(q - vec3(0.0, -0.16, 0.47), vec3(0.05, 0.075, 0.12)), 0.02);
  // the open mouth: dark between the jaws
  vec2 res = vec2(d, M_BONE);
  // glowing pupils deep in the sockets, following the finger
  vec3 lp = vec3(LOOK.x * 0.05, LOOK.y * 0.04, 0.0);
  float pu = min(length(q - vec3(-0.19, 0.0, 0.31) - lp), length(q - vec3(0.19, 0.0, 0.31) - lp)) - 0.05 * (1.0 + 0.6 * SCARE) * (1.0 - 0.8 * BLINK);
  res = U(res, vec2(pu, M_GLOW));
  // a dark robe, bony hands
  float b = sdRCone(p - vec3(0.0, -0.98, 0.0), 0.38, 0.15, 0.82);
  armPair(p, vec3(0.16, -0.25, 0.0), vec3(0.4, -0.6, 0.12), vec3(0.52, 0.5, 0.12), 0.075, b, 0.06);
  res = U(res, vec2(b, M_CLOTH));
  float hands = min(length(p - vec3(-0.42, -0.64, 0.14) - vec3(0.0, REACH * 1.1, 0.0)), length(p - vec3(0.42, -0.64, 0.14) - vec3(0.0, REACH * 1.1, 0.0))) - 0.075;
  return U(res, vec2(hands, M_BONE));
}

// ---- 4: the mummy ----
vec2 mummy(vec3 p) {
  vec3 hc = vec3(HEAD.x, 0.36 + HEAD.y, 0.0);
  vec3 q = headSpace(p, hc);
  float d = smin(sdEll(q, vec3(0.45, 0.48, 0.42)), sdCap(p, vec3(0.0, -0.2, 0.0), vec3(0.0, -0.72, 0.0), 0.3), 0.12);
  armPair(p, vec3(0.26, -0.22, 0.0), vec3(0.5, -0.38, 0.4), vec3(0.5, 0.5, 0.2), 0.095, d, 0.06);
  d = smin(d, min(sdCap(p, vec3(-0.13, -0.8, 0.0), vec3(-0.15, -1.03, 0.04), 0.11), sdCap(p, vec3(0.13, -0.8, 0.0), vec3(0.15, -1.03, 0.04), 0.11)), 0.05);
  // bandages: raised bands wound round it, a little crooked
  float a = atan(p.x, p.z);
  float band = fract(p.y * 6.5 + 0.18 * sin(a + p.y * 3.0 + SEED * 5.0));
  d -= 0.022 * smoothstep(0.0, 0.18, band) * smoothstep(1.0, 0.82, band);
  // one eye peeks out between the bands
  vec3 eq = q - vec3(-0.15, 0.07, 0.33);
  float gap = length(eq.xy * vec2(1.0, 1.7)) - 0.15;
  d = smax(d, -max(gap, -eq.z - 0.06), 0.03);
  vec2 res = vec2(d * 0.85, M_SKIN);
  res = U(res, vec2(length(eq - vec3(0.0, 0.0, -0.06)) - 0.095 * (1.0 + 0.3 * SCARE), M_EYE));
  // the other one glows through the cloth
  vec3 e2 = q - vec3(0.16, 0.07, 0.38);
  res = U(res, vec2(length(e2.xy * vec2(1.0, 4.0 / max(1.0 - BLINK, 0.2))) - 0.07 + max(0.0, -e2.z - 0.02), M_GLOW));
  // a loose end of bandage, hanging from the side of its head and swaying
  float sw = 0.06 * sin(uTime * 2.0 + SEED * 3.0);
  vec3 l0 = hc + vec3(0.36, 0.12, 0.05), l1 = l0 + vec3(0.1 + sw, -0.22, 0.02), l2 = l1 + vec3(0.02 + 1.6 * sw, -0.2, 0.0);
  float loose = sdRBox(p - (l0 + l1) * 0.5, vec3(0.03, length(l1 - l0) * 0.5, 0.012), 0.01);
  loose = min(loose, sdRBox(p - (l1 + l2) * 0.5, vec3(0.028, length(l2 - l1) * 0.5, 0.012), 0.01));
  return U(res, vec2(loose, M_SKIN));
}

// ---- 5: the little monster with bolts ----
vec2 frank(vec3 p) {
  vec3 hc = vec3(HEAD.x, 0.4 + HEAD.y, 0.0);
  vec3 q = headSpace(p, hc);
  float head = sdRBox(q, vec3(0.32, 0.34, 0.26), 0.15);
  float brow = sdRBox(q - vec3(0.0, 0.13, 0.36), vec3(0.3, 0.04, 0.04), 0.04);
  float d = smin(head, brow, 0.05);
  // the mouth: a grim line that opens into a grimace
  vec3 mq = q - vec3(0.0, -0.2, 0.41);
  float mo = sdBox2(mq.xy, vec2(0.16, 0.012 + 0.09 * MOUTH)) - 0.02;
  d = smax(d, -max(mo, -mq.z - 0.08), 0.015);
  vec2 res = vec2(d, (mo < 0.0 && mq.z > -0.08) ? M_DARK : M_SKIN);
  // hair on top, a jagged fringe
  float hair = sdRBox(q - vec3(0.0, 0.43, -0.02), vec3(0.34, 0.06 + 0.025 * sin(q.x * 38.0), 0.31), 0.06);
  res = U(res, vec2(hair, M_HAIR));
  // eyes under the heavy brow
  vec3 lp = vec3(LOOK.x * 0.02, 0.0, 0.0);
  float eyes = min(length(q - vec3(-0.15, 0.02, 0.34) - lp), length(q - vec3(0.15, 0.02, 0.34) - lp)) - 0.08 * (1.0 + 0.25 * SCARE);
  res = U(res, vec2(eyes, M_EYE));
  // bolts in its neck
  vec3 nb = p - vec3(HEAD.x * 0.6, 0.0 + HEAD.y * 0.4, 0.0);
  float bolts = sdCap(nb, vec3(-0.44, 0.0, 0.0), vec3(0.44, 0.0, 0.0), 0.055);
  bolts = smax(bolts, 0.32 - abs(nb.x), 0.01);
  res = U(res, vec2(bolts, M_METAL));
  // a jacket too small, long arms, big boots
  float b = sdRBox(p - vec3(0.0, -0.48, 0.0), vec3(0.26, 0.26, 0.15), 0.12);
  armPair(p, vec3(0.32, -0.28, 0.0), vec3(0.46, -0.78, 0.08), vec3(0.55, 0.5, 0.1), 0.085, b, 0.06);
  res = U(res, vec2(b, M_CLOTH));
  float hands = min(length(p - vec3(-0.47, -0.82, 0.08) - vec3(0.0, REACH * 1.3, 0.0)), length(p - vec3(0.47, -0.82, 0.08) - vec3(0.0, REACH * 1.3, 0.0))) - 0.085;
  res = U(res, vec2(hands, M_SKIN));
  float boots = min(sdRBox(p - vec3(-0.15, -1.0, 0.05), vec3(0.08, 0.06, 0.12), 0.04), sdRBox(p - vec3(0.15, -1.0, 0.05), vec3(0.08, 0.06, 0.12), 0.04));
  return U(res, vec2(boots, M_BOOT));
}

// the doll, squashed and stretched about its feet and leaning
vec2 dollMap(vec3 p) {
  float sy = 1.0 - SQ, sx = inversesqrt(max(sy, 0.25));
  vec3 q = p;
  q.y = (q.y + 1.1) / sy - 1.1;
  q.xz /= sx;
  q.x -= SWAY * (q.y + 1.1) * (q.y + 1.1) * 0.12;
  vec2 r;
  if (TYPE < 0.5) r = pumpkin(q);
  else if (TYPE < 1.5) r = voodoo(q);
  else if (TYPE < 2.5) r = ghost(q);
  else if (TYPE < 3.5) r = skull(q);
  else if (TYPE < 4.5) r = mummy(q);
  else r = frank(q);
  r.x *= min(sy, 1.0 / sx) * 0.92;
  return r;
}

vec3 normalAt(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  float e = 0.0025;
  return normalize(k.xyy * dollMap(p + k.xyy * e).x + k.yyx * dollMap(p + k.yyx * e).x + k.yxy * dollMap(p + k.yxy * e).x + k.xxx * dollMap(p + k.xxx * e).x);
}

// where the head is (after squash and sway), to place details on it
vec3 headLocal(vec3 p) {
  float sy = 1.0 - SQ, sx = inversesqrt(max(sy, 0.25));
  vec3 q = p;
  q.y = (q.y + 1.1) / sy - 1.1;
  q.xz /= sx;
  q.x -= SWAY * (q.y + 1.1) * (q.y + 1.1) * 0.12;
  float hy = TYPE < 0.5 ? 0.26 : TYPE < 1.5 ? 0.33 : TYPE < 2.5 ? 0.34 : TYPE < 3.5 ? 0.4 : TYPE < 4.5 ? 0.36 : 0.4;
  if (TYPE > 1.5 && TYPE < 2.5) q.y -= 0.1 + 0.06 * sin(uTime * 2.1 + SEED * 6.0);
  return headSpace(q, vec3(HEAD.x, hy + HEAD.y, 0.0));
}

// colours, stitches, eyes: what each material looks like at p
vec3 baseColor(float m, vec3 p, vec3 hq, out float spec, out float emit, out float sss) {
  spec = 0.0; emit = 0.0; sss = 0.0;
  vec3 c = vec3(0.5);
  float n = noise(p.xy * 14.0 + SEED * 10.0);
  if (m == M_SKIN) {
    if (TYPE < 0.5) {            // pumpkin flesh: orange, darker in the grooves
      float a = atan(hq.x, hq.z);
      float g = pow(abs(sin(a * 4.0)), 0.6);
      c = mix(vec3(0.62, 0.18, 0.02), vec3(1.0, 0.48, 0.06), 0.35 + 0.65 * g) * (0.85 + 0.25 * n);
      spec = 0.35; sss = 0.3;
    } else if (TYPE < 1.5) {     // burlap: woven, with an X stitch on the right eye and a heart patch
      float weave = 0.5 + 0.5 * sin(p.x * 140.0) * sin(p.y * 140.0);
      c = mix(vec3(0.55, 0.4, 0.24), vec3(0.75, 0.6, 0.4), 0.5 * weave + 0.5 * n);
      vec2 e = hq.xy - vec2(0.18, 0.06);
      float x1 = abs(e.x - e.y), x2 = abs(e.x + e.y);
      if (hq.z > 0.2 && max(abs(e.x), abs(e.y)) < 0.1 && min(x1, x2) < 0.022) c = vec3(0.12, 0.05, 0.05);
      vec2 mq = hq.xy - vec2(0.0, -0.17);
      if (hq.z > 0.25 && abs(mq.y) < 0.09 * (1.0 + MOUTH) && abs(mq.x) < 0.17 && abs(fract(mq.x * 14.0) - 0.5) < 0.12 && abs(mq.y) > 0.02 * MOUTH) c = vec3(0.1, 0.04, 0.04);
      vec2 hp = p.xy - vec2(-0.1, -0.38);
      hp.y -= sqrt(abs(hp.x)) * 0.12;
      if (p.z > 0.05 && length(hp * vec2(1.0, 1.3)) < 0.1) { c = vec3(0.8, 0.05, 0.08) * (0.8 + 0.3 * n); spec = 0.2; }
    } else if (TYPE > 3.5 && TYPE < 4.5) {   // old bandages
      float a = atan(p.x, p.z);
      float band = fract(p.y * 6.5 + 0.18 * sin(a + p.y * 3.0 + SEED * 5.0));
      c = mix(vec3(0.55, 0.48, 0.34), vec3(0.92, 0.88, 0.76), smoothstep(0.0, 0.25, band) * smoothstep(1.0, 0.75, band)) * (0.85 + 0.25 * n);
    } else {                      // green skin, a stitched scar on the forehead
      c = vec3(0.42, 0.66, 0.32) * (0.85 + 0.25 * n);
      spec = 0.15; sss = 0.15;
      vec2 s = hq.xy - vec2(-0.05, 0.3);
      if (hq.z > 0.2 && abs(s.y + 0.04 * s.x) < 0.012 && abs(s.x) < 0.22) c = vec3(0.12, 0.08, 0.1);
      if (hq.z > 0.2 && abs(s.x) < 0.2 && abs(s.y) < 0.045 && abs(fract(s.x * 18.0) - 0.5) < 0.1) c = vec3(0.12, 0.08, 0.1);
    }
  } else if (m == M_CLOTH) {
    if (TYPE > 1.5 && TYPE < 2.5) { c = vec3(0.93, 0.92, 1.0); sss = 0.65; spec = 0.1; }   // the sheet
    else if (TYPE < 0.5) c = vec3(0.1, 0.18, 0.08) * (0.8 + 0.3 * n);
    else if (TYPE > 2.5 && TYPE < 3.5) c = vec3(0.12, 0.06, 0.16) * (0.8 + 0.3 * n);
    else c = vec3(0.16, 0.12, 0.22) * (0.8 + 0.3 * n);
  } else if (m == M_BONE) {
    c = vec3(0.93, 0.89, 0.8) * (0.9 + 0.12 * n); spec = 0.45;
    // sugar-skull flowers round the sockets and on the forehead
    vec2 f1 = vec2(abs(hq.x) - 0.19, hq.y);
    float r1 = length(f1), a1 = atan(f1.y, f1.x);
    float pet = 0.2 + 0.035 * cos(a1 * 8.0);
    if (hq.z > 0.15 && r1 > 0.155 && r1 < pet) c = mix(vec3(1.0, 0.35, 0.65), vec3(0.2, 0.85, 1.0), step(0.0, hq.x));
    vec2 f2 = hq.xy - vec2(0.0, 0.3);
    float r2 = length(f2), a2 = atan(f2.y, f2.x);
    if (hq.z > 0.2 && r2 < 0.07 + 0.025 * cos(a2 * 5.0)) c = vec3(1.0, 0.6, 0.1);
    if (hq.z > 0.2 && r2 < 0.025) c = vec3(0.3, 0.9, 0.4);
    // teeth on the jaw
    vec2 tq = hq.xy - vec2(0.0, -0.33);
    if (hq.z > 0.2 && abs(tq.y) < 0.045 && abs(tq.x) < 0.17 && abs(fract(tq.x * 13.0) - 0.5) < 0.07) c = vec3(0.35, 0.3, 0.28);
  } else if (m == M_STEM) { c = vec3(0.22, 0.32, 0.1) * (0.8 + 0.4 * n); }
  else if (m == M_HAIR) { c = vec3(0.04, 0.035, 0.05); spec = 0.6; }
  else if (m == M_BOOT) { c = vec3(0.07, 0.05, 0.06); spec = 0.5; }
  else if (m == M_ROPE) { c = vec3(0.45, 0.32, 0.18) * (0.75 + 0.4 * sin(atan(p.x, p.z) * 30.0 + p.y * 60.0)); }
  else if (m == M_METAL) { c = vec3(0.6, 0.62, 0.66); spec = 1.0; }
  else if (m == M_PIN) {
    float k = floor(hash(floor(p.xy * 6.0) + SEED) * 3.0);
    c = k < 1.0 ? vec3(0.95, 0.12, 0.15) : k < 2.0 ? vec3(1.0, 0.8, 0.1) : vec3(0.1, 0.8, 0.95); spec = 1.0;
  } else if (m == M_BUTTON) {
    c = vec3(0.05, 0.04, 0.06); spec = 1.0;
    vec2 b = hq.xy - vec2(-0.18, 0.06);
    vec2 hl = abs(b) - 0.035;
    if (length(hl) < 0.018) c = vec3(0.5, 0.4, 0.3);
    if (abs(length(b) - 0.085) < 0.008) c = vec3(0.12, 0.1, 0.12);
  } else if (m == M_EYE) {
    // a white eye whose iris looks at the finger; the lid comes down as it blinks
    vec3 ec = TYPE > 3.5 && TYPE < 4.5 ? vec3(-0.15, 0.07, 0.27) : vec3(sign(hq.x) * 0.15, 0.02, 0.34);
    vec3 e = normalize(hq - ec);
    vec3 dir = normalize(vec3(LOOK.x * 0.8, LOOK.y * 0.6, 1.0));
    float cs = dot(e, dir);
    c = vec3(0.95, 0.93, 0.88);
    float irisR = 0.93 - 0.05 * SCARE;
    if (cs > irisR) c = TYPE > 3.5 && TYPE < 4.5 ? vec3(0.75, 0.1, 0.05) : vec3(0.35, 0.75, 0.25);
    if (cs > 0.975 + 0.012 * SCARE) c = vec3(0.02);
    spec = 1.0;
    float lid = TYPE > 4.5 ? 0.45 : 0.0;
    if (e.y > 1.0 - 2.0 * max(BLINK, lid)) c = TYPE > 4.5 ? vec3(0.36, 0.58, 0.28) : vec3(0.8, 0.75, 0.62);
  } else if (m == M_DARK) { c = vec3(0.03, 0.01, 0.02); }
  else if (m == M_GLOW) {
    // candle light inside the carving, sockets and eyes: it flickers, and takes the colour of the sound
    vec3 warm = vec3(1.0, 0.58, 0.14);
    vec3 g = mix(warm, vCol.rgb, clamp(GLOW, 0.0, 1.0) * 0.85);
    float depth = TYPE < 0.5 ? (0.6 + 0.8 * smoothstep(0.42, 0.2, hq.z)) : 1.0;
    emit = (0.9 + 0.6 * uFlicker + 1.8 * GLOW + 0.6 * uWatch) * depth;
    c = g;
  }
  return c;
}

void main() {
  TYPE = vDoll.w; SEED = vC.z; SQ = vA.x; HEAD = vA.yz; SWAY = vA.w;
  LOOK = vB.xy; BLINK = vB.z; MOUTH = vB.w; GLOW = vC.x; SCARE = vC.y; REACH = vC.w;
  vec4 col = vec4(0.0);
  // ---- the plate: dark velvet, a stitched seam, a warm glow when it is on ----
  if (vPlate.y > 0.5) {
    vec2 c = vRect.xy + vRect.zw * 0.5;
    vec2 q = vPos - c;
    vec2 hs = vRect.zw * 0.5;
    float r = min(vPlate.x, min(hs.x, hs.y));
    vec2 qq = abs(q) - hs + r;
    float d = length(max(qq, 0.0)) + min(max(qq.x, qq.y), 0.0) - r;
    float a = smoothstep(0.75, -0.75, d);
    if (a > 0.0) {
      float n = noise(vPos * 0.6) * 0.5 + noise(vPos * 2.3) * 0.5;
      vec3 pc = mix(vec3(0.075, 0.04, 0.1), vec3(0.13, 0.07, 0.16), 0.5 + 0.5 * (-q.y / hs.y)) * (0.85 + 0.3 * n);
      // inner shadow and a soft top light
      pc *= 0.65 + 0.35 * smoothstep(-10.0, -1.0, d) * 0.0 + 0.35 * smoothstep(0.0, -9.0, d);
      pc += vec3(0.25, 0.15, 0.3) * 0.12 * smoothstep(-hs.y, -hs.y + 10.0, q.y);
      // the stitched seam, 4 px inside the edge
      float seam = abs(d + 4.0);
      float along = abs(qq.x) > abs(qq.y) ? q.y : q.x;
      float dash = step(0.45, fract(along / 6.0));
      pc = mix(pc, vec3(0.85, 0.48, 0.2), smoothstep(0.9, 0.2, seam) * dash * 0.45);
      // on: a coloured light inside the plate; pressed: a flash
      float on = vPlate.z, fl = vPlate.w;
      pc += vCol.rgb * (on * 0.22 + fl * 0.35) * smoothstep(0.0, -16.0, d) + vCol.rgb * (on * 0.5 + fl) * 0.5 * exp(-abs(d) * 0.35);
      col = vec4(pc * a, a);
    }
  }
  // ---- the doll ----
  if (vDoll.z > 0.5) {
    float u = vDoll.z / 2.2;                          // CSS px per doll unit
    vec2 lp = vec2(vPos.x - vDoll.x, vDoll.y - vPos.y) / u + vec2(0.0, -1.1);
    // its shadow on the plate, smaller when it floats or jumps
    float lift = max(-SQ, 0.0) * 1.5 + (TYPE > 1.5 && TYPE < 2.5 ? 0.25 : 0.0);
    vec2 sp = (lp - vec2(0.0, -1.1)) / vec2(0.62 + 0.3 * SQ, 0.12);
    float sh = exp(-dot(sp, sp) * 1.4) * 0.55 * vCol.a * (1.0 - 0.5 * lift);
    col.rgb *= 1.0 - sh; col.a = max(col.a, sh * 0.8);
    // its aura when it sings, or when they all watch you
    float aur = (GLOW * 0.9 + uWatch * 0.25) * exp(-dot(lp - vec2(0.0, 0.1), lp - vec2(0.0, 0.1)) * 0.9);
    col.rgb += vCol.rgb * aur * 0.35; col.a = max(col.a, min(aur * 0.35, 1.0));
    if (dot(lp - vec2(0.0, 0.0), lp - vec2(0.0, 0.0)) < 3.2) {
      vec3 ro = vec3(lp, 2.0), rd = vec3(0.0, 0.0, -1.0);
      float px = 1.0 / (u * uScale);                 // one pixel, in doll units
      float eps = max(0.0015, px * 0.3);
      float t = 0.6, dmin = 1e5, tmin = 0.0;
      vec2 h = vec2(1e5, 0.0);
      for (int i = 0; i < 44; i++) {
        h = dollMap(ro + rd * t);
        if (h.x < dmin) { dmin = h.x; tmin = t; }
        if (h.x < eps || t > 3.4) break;
        t += h.x;
      }
      float cover = h.x < eps ? 1.0 : smoothstep(px * 1.2, 0.0, dmin);
      if (cover > 0.0) {
        if (h.x >= eps) { t = tmin; h = dollMap(ro + rd * t); }
        vec3 p = ro + rd * t;
        vec3 n = normalAt(p);
        vec3 hq = headLocal(p);
        float spec, emit, sss;
        vec3 base = baseColor(h.y, p, hq, spec, emit, sss);
        // light: a candle in front and below (it flickers), the moon from above left, a coloured
        // rim light from behind, a dim violet ambient
        vec3 Lc = normalize(vec3(0.35, -0.35, 0.87));
        vec3 Lm = normalize(vec3(-0.55, 0.75, 0.35));
        float dc = max(dot(n, Lc), 0.0), dm = max(dot(n, Lm), 0.0);
        float wc = max(dot(n, Lc) * (1.0 - sss) + sss, 0.0);
        float ao = clamp(0.45 + 0.55 * dollMap(p + n * 0.12).x / 0.12, 0.25, 1.0);
        vec3 candle = vec3(1.0, 0.62, 0.32) * (0.85 + 0.35 * uFlicker);
        vec3 moon = vec3(0.55, 0.62, 1.0);
        vec3 lit = base * (vec3(0.13, 0.08, 0.18) * ao + candle * mix(dc, wc, sss) * 0.95 + moon * dm * 0.45);
        float fres = pow(1.0 - max(n.z, 0.0), 3.0);
        vec3 rimC = mix(vec3(0.55, 0.3, 1.0), vCol.rgb, clamp(GLOW + 0.3, 0.0, 1.0));
        lit += rimC * fres * (0.55 + 0.6 * GLOW) * ao;
        vec3 hv = normalize(Lc + vec3(0.0, 0.0, 1.0));
        lit += candle * pow(max(dot(n, hv), 0.0), 40.0) * spec * 0.9;
        vec3 hm = normalize(Lm + vec3(0.0, 0.0, 1.0));
        lit += moon * pow(max(dot(n, hm), 0.0), 60.0) * spec * 0.6;
        lit += base * emit;
        // when they watch you, their faces catch a ghostly green
        lit += vec3(0.2, 0.6, 0.35) * uWatch * 0.12 * fres;
        float a = cover;
        col.rgb = col.rgb * (1.0 - a) + lit * a;
        col.a = col.a + a * (1.0 - col.a);
      }
    }
  }
  o = col;
}`;var Es=7,li=Es*4,wa=96,ci=24;function Sa(r,e,t,s){let i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),r.getShaderParameter(i,r.COMPILE_STATUS)||s.push(r.getShaderInfoLog(i)||"shader"),i}function Ta(r,e,t,s,i){let a=r.createProgram();r.attachShader(a,Sa(r,r.VERTEX_SHADER,e,s)),r.attachShader(a,Sa(r,r.FRAGMENT_SHADER,t,s)),(i||[]).forEach((l,c)=>r.bindAttribLocation(a,c,l)),r.linkProgram(a),r.getProgramParameter(a,r.LINK_STATUS)||s.push(r.getProgramInfoLog(a)||"link");let o={},n=r.getProgramParameter(a,r.ACTIVE_UNIFORMS);for(let l=0;l<n;l++){let c=r.getActiveUniform(a,l);o[c.name.replace(/\[0\]$/,"")]=r.getUniformLocation(a,c.name)}return{p:a,u:o}}var Rs=class{constructor(e){this.errors=[],this.canvas=document.createElement("canvas"),this.canvas.className="ghouls",this.canvas.setAttribute("aria-hidden","true"),e.insertBefore(this.canvas,e.firstChild),this.data=new Float32Array(wa*li),this.lost=!1,this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.lost=!0}),this.canvas.addEventListener("webglcontextrestored",()=>{this.lost=!1,this.init()}),this.init()}init(){let e=this.canvas.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(this.gl=e,this.ok=!!e,!e)return;this.errors=[],this.night=Ta(e,ba,ya,this.errors,["aPos"]);let t=["aCorner","iRect","iPlate","iDoll","iAnimA","iAnimB","iAnimC","iColor"];if(this.dolls=Ta(e,xa,ka,this.errors,t),this.errors.length){this.ok=!1;return}this.tri=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.tri),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),this.vaoNight=e.createVertexArray(),e.bindVertexArray(this.vaoNight),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.vaoDolls=e.createVertexArray(),e.bindVertexArray(this.vaoDolls),this.corner=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.corner),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),this.inst=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.inst),e.bufferData(e.ARRAY_BUFFER,this.data.byteLength,e.DYNAMIC_DRAW);for(let s=0;s<Es;s++)e.enableVertexAttribArray(1+s),e.vertexAttribPointer(1+s,4,e.FLOAT,!1,li*4,s*16),e.vertexAttribDivisor(1+s,1);e.bindVertexArray(null),this.keyRects=new Float32Array(ci*4),this.keyInfo=new Float32Array(ci*4)}resize(e,t,s){let i=Math.max(1,Math.round(e*s)),a=Math.max(1,Math.round(t*s));(this.canvas.width!==i||this.canvas.height!==a)&&(this.canvas.width=i,this.canvas.height=a),this.scale=i/Math.max(e,1)}draw(e){let t=this.gl;if(!this.ok||this.lost||!t)return;let s=this.canvas.width,i=this.canvas.height,a=this.scale;t.viewport(0,0,s,i),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA);let o=this.night,n=o.u;t.useProgram(o.p),t.uniform2f(n.uRes,s,i),t.uniform1f(n.uScale,a),t.uniform1f(n.uTime,e.time);let l=e.pad||{x:-1e4,y:-1e4,w:1,h:1,r:0};t.uniform4f(n.uPad,l.x,l.y,l.w,l.h),t.uniform1f(n.uPadR,l.r),t.uniform1f(n.uStage,e.pad&&e.stage?1:0);let c=(e.keys||[]).slice(0,ci);this.keyRects.fill(0),this.keyInfo.fill(0),c.forEach((h,v)=>{this.keyRects.set([h.x0,h.y0,h.x1,h.y1],v*4),this.keyInfo.set([h.black?1:0,h.lit||0,0,0],v*4)}),n.uKeys&&t.uniform4fv(n.uKeys,this.keyRects),n.uKeyInfo&&t.uniform4fv(n.uKeyInfo,this.keyInfo),t.uniform1f(n.uNKeys,c.length),t.uniform3f(n.uAccent,e.accent[0],e.accent[1],e.accent[2]),t.uniform1f(n.uWatch,e.watch),t.uniform1f(n.uBeat,e.beat),t.uniform1f(n.uCalm,e.calm?1:0),t.bindVertexArray(this.vaoNight),t.drawArrays(t.TRIANGLES,0,3);let d=Math.min(e.dolls,wa);if(d>0){let h=this.dolls,v=h.u;t.useProgram(h.p),t.uniform2f(v.uRes,s,i),t.uniform1f(v.uScale,a),t.uniform1f(v.uTime,e.time),t.uniform1f(v.uFlicker,e.flicker),t.uniform1f(v.uWatch,e.watch),t.uniform1f(v.uCalm,e.calm?1:0),t.bindVertexArray(this.vaoDolls),t.bindBuffer(t.ARRAY_BUFFER,this.inst),t.bufferSubData(t.ARRAY_BUFFER,0,e.data,0,d*li),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,d)}t.bindVertexArray(null)}destroy(){let e=this.gl;if(e){let t=e.getExtension("WEBGL_lose_context");t&&t.loseContext()}this.canvas.remove(),this.ok=!1}};var B={PUMPKIN:0,VOODOO:1,GHOST:2,SKULL:3,MUMMY:4,FRANK:5},Cr=[B.PUMPKIN,B.VOODOO,B.GHOST,B.SKULL,B.MUMMY,B.FRANK],La=[[".top .logo",B.GHOST,"icon"],[".top .tbtn.rec",B.SKULL,"icon","rec"],[".top .tbtn.play",B.PUMPKIN,"icon","play"],[".top .progress",-1,"plate"],[".top .chip.tempo",B.MUMMY,"side","tempo"],[".top .chip:not(.tempo)",B.FRANK,"side"],[".parts .ptab",r=>({drum:B.VOODOO,bass:B.FRANK,lead:B.GHOST})[r.dataset.p]??B.GHOST,"side","part"],[".inst .arrow:not(.dice)",B.SKULL,"icon"],[".inst .dice",B.PUMPKIN,"icon"],[".view .controls .dial",(r,e)=>[B.MUMMY,B.VOODOO,B.GHOST,B.SKULL][e%4],"peek"],[".view .range",B.GHOST,"peek"],[".timeline .tbtn",(r,e)=>[B.MUMMY,B.GHOST,B.SKULL,B.VOODOO][e%4],"icon"],[".timeline .tl",-1,"plate"],[".groups .grp",(r,e)=>[B.FRANK,B.MUMMY,B.GHOST][e%3],"peek"],[".autobar .pill",(r,e)=>[B.SKULL,B.PUMPKIN,B.VOODOO][e%3],"side"],[".faders .fader",(r,e)=>[B.PUMPKIN,B.SKULL,B.GHOST,B.VOODOO,B.FRANK,B.MUMMY][e%6],"peek","fader"],[".faders .fader .m",B.SKULL,"icon","mute"],[".mixknobs .dial",(r,e)=>[B.GHOST,B.MUMMY,B.VOODOO,B.PUMPKIN][e%4],"peek"],[".song .pill",(r,e)=>Cr[e%6],"side"],[".nav button",(r,e)=>[B.PUMPKIN,B.VOODOO,B.SKULL,B.GHOST][e%4],"nav"]],Zl=[B.PUMPKIN,B.SKULL,B.GHOST,B.VOODOO],at=(r,e)=>r+Math.random()*(e-r),ss=class{constructor(e,t){this.type=e,this.seed=t,this.sq=0,this.sqv=0,this.sqT=0,this.hx=0,this.hy=0,this.hvx=0,this.hvy=0,this.sw=0,this.swv=0,this.lx=0,this.ly=0,this.ltx=0,this.lty=0,this.blink=0,this.blinkAt=performance.now()+at(800,4e3),this.mouth=0,this.mouthT=0,this.glow=0,this.glowT=0,this.glowHold=0,this.scare=0,this.reach=0,this.reachT=0,this.held=0,this.color=[1,.55,.15],this.twitchAt=performance.now()+at(3e3,12e3)}press(e=1){this.held++,this.sqT=.36*e,this.sqv-=2.5*e,this.mouthT=1,this.scare=1,this.hvy-=3.5*e,this.hvx+=at(-2.5,2.5)*e,this.swv+=at(-3,3)*e}release(){this.held=Math.max(0,this.held-1),this.held||(this.sqT=0,this.mouthT=0,this.sqv-=3.5,this.hvx+=at(-2,2))}sing(e=.8,t){this.mouth=Math.max(this.mouth,Math.min(1,.45+e*.6)),this.glow=Math.max(this.glow,Math.min(1,e)),this.sqv-=2.2*e,this.hvy+=1.5*e,t&&(this.color=t)}startle(e){e<=.02||(this.scare=Math.max(this.scare,e),this.sqv-=3*e,this.hvx+=at(-3,3)*e,this.hvy+=2*e)}step(e,t,s){let i=s?.5:1,a=this.sqT+(s?0:.018*Math.sin(t/700+this.seed*9));this.sqv+=(-(this.sq-a)*340-this.sqv*15)*e,this.sq=Math.max(-.35,Math.min(.5,this.sq+this.sqv*e)),this.hvx+=(-this.hx*180-this.hvx*9)*e,this.hx+=this.hvx*e,this.hvy+=(-this.hy*220-this.hvy*10)*e,this.hy+=this.hvy*e,this.hx=Math.max(-.25,Math.min(.25,this.hx)),this.hy=Math.max(-.2,Math.min(.2,this.hy));let o=s?0:.12*Math.sin(t/1300+this.seed*5)*i;this.swv+=(-(this.sw-o)*90-this.swv*7)*e,this.sw+=this.swv*e;let n=1-Math.exp(-e*10);this.lx+=(this.ltx-this.lx)*n,this.ly+=(this.lty-this.ly)*n,t>this.blinkAt&&(this.blinkStart=t,this.blinkAt=t+at(1800,6e3)*(s?1.6:1));let l=this.blinkStart?(t-this.blinkStart)/140:9;this.blink=l<1?Math.sin(l*Math.PI):0,!s&&t>this.twitchAt&&(this.twitchAt=t+at(6e3,16e3),this.hvx+=at(-4,4),this.swv+=at(-4,4));let c=1-Math.exp(-e*(this.mouthT>this.mouth?22:7));this.mouth+=(Math.max(this.mouthT,0)-this.mouth)*c,this.glow=Math.max(this.glowT,this.glow*Math.exp(-e*3.2)),this.scare*=Math.exp(-e*3.5),this.reach+=(this.reachT-this.reach)*(1-Math.exp(-e*8))}};function hi(r){if(r=(r||"").trim(),r.startsWith("color("))return r.match(/[\d.]+/g).map(Number).slice(-3).map(s=>s>1?s/255:s);if(r.startsWith("#"))return(r.length===4?r.slice(1).split("").map(s=>s+s):[r.slice(1,3),r.slice(3,5),r.slice(5,7)]).map(s=>parseInt(s,16)/255);let e=r.match(/[\d.]+/g);return e?e.slice(0,3).map(t=>+t/255):[1,.5,.1]}function Ma(r,e){if(r==="icon"){let t=Math.min(e.height*.9,e.width*1.05);return{x:e.left+e.width/2,y:e.bottom-2,s:t}}if(r==="side"){let t=e.height*.98;return{x:e.left+t*.42,y:e.bottom-1,s:t}}if(r==="nav"){let t=Math.min(e.height*.62,34);return{x:e.left+e.width/2,y:e.top+t+2,s:t}}if(r==="peek"){let t=Math.min(e.height*.36,e.width*.4,32);return{x:e.left+5+t*.36,y:e.top+4+t,s:t}}return null}var Ra=Es*4,qr=[B.PUMPKIN,B.SKULL,B.GHOST,B.VOODOO],Ea=[B.GHOST,B.PUMPKIN,B.SKULL,B.VOODOO,B.MUMMY,B.FRANK],Aa=9e3;function Da(r,{pad:e,app:t,fx:s}){let i=()=>{let M=s&&s();return M&&M.fluid&&M.fluid.ok?M.fluid:null},a=matchMedia("(prefers-reduced-motion: reduce)"),o=null,n=0,l=!1,c=null,d=!0,h=[],v=new Map,f=[],m="",p=[],b=null,y={x:-1,y:-1,t:-1e9},k=performance.now(),T=0,R=new Map,O=new Map,H=0,le=-1,Q=!1,P=null,$=()=>Math.min(window.devicePixelRatio||1,1.75),_=$(),W=16,z=0,he=0,U=0,q=new Float32Array(128*Ra),te=1,J={drum:[1,.5,.1],bass:[.7,.3,1],lead:[.45,1,.3],rec:[1,.15,.12],accent:[1,.5,.1],play:[1,.55,.1]},ee=()=>{let M=getComputedStyle(t);for(let F of["drum","bass","lead","rec"])J[F]=hi(M.getPropertyValue("--"+F));J.accent=hi(M.getPropertyValue("--accent"))},we=()=>t.getBoundingClientRect();function ce(){d=!1;let M=[];for(let[F,j,G,X]of La)t.querySelectorAll(F).forEach((ue,Ne)=>{let Se=typeof j=="function"?j(ue,Ne):j,Oe=v.get(ue);Se>=0&&(!Oe||Oe.type!==Se)&&(Oe=new ss(Se,te++*.6180339%1),v.set(ue,Oe));let ct=parseFloat(getComputedStyle(ue).borderTopLeftRadius)||12;M.push({el:ue,kind:G,tag:X,doll:Se>=0?Oe:null,radius:ct,flash:0,plate:!ue.closest(".gpu-host")})});h=M}let We=M=>{let F=null;for(let j of h)j.el.contains(M)&&(!F||F.el.contains(j.el))&&(F=j);return F};function S(){let M=e.keyLayout(),F=M.sig.startsWith("piano");return M.sig!==m&&(m=M.sig,f=M.keys.map((j,G)=>new ss(e.part==="drum"?qr[G%4]:F&&j.cut?B.SKULL:Ea[G%Ea.length],te++*.6180339%1))),p=M.keys,F}let C=(M,F)=>{for(let j=p.length-1;j>=0;j--){let G=p[j];if(G.cut&&M>=G.x0&&M<G.x1&&F>=G.y0&&F<G.y1)return j}for(let j=0;j<p.length;j++){let G=p[j];if(!G.cut&&M>=G.x0&&M<G.x1&&F>=G.y0&&F<G.y1)return j}return-1},E=(M,F,j,G,X)=>{let ue=(M.x1-M.x0)*G;if(e.part==="drum")return{y:.86,s:Math.min(ue*1.02,X*.38)};if(j&&M.cut){let Se=Math.min(ue*1.25,X*.15,46);return{y:M.y1-6/X,s:Se}}let Ne=Math.min(ue*1.3,X*.24,74);return{y:1-24/X,s:Ne}};function D(M,F,j,G){if(!l)return;S(),Y(null,F,j);let X=O.get(M);if(G==="up"||G==="cancel"){X!==void 0&&f[X]&&(f[X].release(),f[X].reachT=0),O.delete(M);return}let ue=C(F,j);if(ue!==X&&(X!==void 0&&f[X]&&(f[X].release(),f[X].reachT=0),ue>=0&&f[ue].press(G==="down"?1:.6),ue>=0?O.set(M,ue):O.delete(M)),ue>=0){let Ne=f[ue],Se=e.el.getBoundingClientRect(),Oe=E(p[ue],ue,e.piano,Se.width,Se.height),ct=Oe.y-Oe.s/Se.height,et=Math.max(0,Math.min(1,(ct-j)/.25));Ne.reachT=et,Ne.sqT=et>.1?-.22*et:.36}}function I(M,F,j,G,X=.8){if(!l)return;S();let ue=M==="drum"?G:C(Math.min(.999,Math.max(0,F)),Math.min(.999,Math.max(0,j)));if(ue<0&&M!=="drum"){let Se=1e9;p.forEach((Oe,ct)=>{let et=Math.abs((Oe.x0+Oe.x1)/2-F);!Oe.cut&&et<Se&&(Se=et,ue=ct)})}let Ne=f[ue];Ne&&Ne.sing(X,J[M]||J.accent)}function Y(M,F,j){let G=we();if(M)y.x=M.clientX-G.left,y.y=M.clientY-G.top;else{let X=e.el.getBoundingClientRect();y.x=X.left-G.left+F*X.width,y.y=X.top-G.top+j*X.height}y.t=performance.now(),k=y.t}let ae=M=>{if(!l)return;Y(M);let F=We(M.target),j=[];F&&F.doll?(F.doll.press(),j.push(F.doll),F.flash=1):F&&(F.flash=1),R.set(M.pointerId,j);for(let G of h){if(!G.doll||G===F||!G.pos)continue;let X=Math.hypot(G.pos.x-y.x,G.pos.y-G.pos.s*.5-y.y);G.doll.startle(Math.max(0,1-X/150)*.8)}},se=M=>{l&&R.has(M.pointerId)&&Y(M)},xe=M=>{let F=R.get(M.pointerId);if(F){for(let j of F)j.release();R.delete(M.pointerId)}};function ot(M){if(n=0,!l||!o)return;let F=Math.min(.05,z?(M-z)/1e3:1/60);z&&(W=W*.94+(M-z)*.06,W>21?++he>45&&_>1&&(_=Math.max(1,_*.85),he=0):(he=0,W<15&&_<$()&&(_=Math.min($(),_+.002)))),z=M,d&&ce();let j=a.matches,G=M-k<1500||Q||R.size||O.size;if(U++,!G&&U%2){Ae();return}let X=we();o.resize(X.width,X.height,_);let ue=M-k;T+=((ue>Aa?1:0)-T)*(1-Math.exp(-F*(ue>Aa?.8:6))),H*=Math.exp(-F*6);let Ne=.5+.5*Math.sin(M/90)*Math.sin(M/37+1.3)*(j?.3:1),Se=0,Oe=(Z,Pe,Ue,de,Ve,ze)=>{let re=Se*Ra;q.set(Z,re),q.set(Pe,re+4),de&&Ue?(q.set([Ue.x,Ue.y,Ue.s,de.type],re+8),q.set([de.sq,de.hx,de.hy,de.sw],re+12),q.set([de.lx,de.ly,de.blink,de.mouth],re+16),q.set([de.glow,de.scare,de.seed,de.reach],re+20)):q.fill(0,re+8,re+24),q.set([Ve[0],Ve[1],Ve[2],ze],re+24),Se++},ct=(Z,Pe,Ue)=>{if(T>.5){Z.ltx=0,Z.lty=.05;return}M-y.t<3500?(Z.ltx=Math.max(-1,Math.min(1,(y.x-Pe)/170)),Z.lty=Math.max(-1,Math.min(1,(Ue-y.y)/220))):(Z.ltx=.5*Math.sin(M/2300+Z.seed*20),Z.lty=.25*Math.sin(M/3100+Z.seed*13))};for(let Z of h){let Pe=Z.el.getBoundingClientRect();if(Pe.width<2||Pe.height<2||Pe.bottom<0||Pe.top>X.height+X.top){Z.pos=null;continue}let Ue={left:Pe.left-X.left,top:Pe.top-X.top,width:Pe.width,height:Pe.height,right:Pe.right-X.left,bottom:Pe.bottom-X.top},de=Z.el,Ve=de.getAttribute("aria-pressed")==="true"||de.getAttribute("aria-selected")==="true"||de.classList.contains("active")||de.classList.contains("on")?1:0,ze=J.accent,re=Z.doll;if(Z.tag==="rec")ze=J.rec,re&&(re.glowT=Ve?.7:0);else if(Z.tag==="play")ze=J.play,re&&(re.glowT=Ve?.45+.55*H:0);else if(Z.tag==="part")ze=J[de.dataset.p]||J.accent,re&&(re.glowT=Ve?.35:0);else if(Z.tag==="mute")Ve=0,re&&(re.mouthT=de.getAttribute("aria-pressed")==="true"?0:re.mouthT);else if(Z.tag==="fader"&&P&&re){let ut=h.filter(Wa=>Wa.tag==="fader").indexOf(Z),as=ut<4?P.d?P.d[ut]:0:ut===4?P.bass:P.lead,mi=Math.min(1,Math.sqrt(as||0)*1.3);re.glowT=mi*.9,re.held||(re.mouthT=mi),ze=ut<4?J.drum:ut===4?J.bass:J.lead}re&&!Z.tag&&(re.glowT=0),Z.flash*=Math.exp(-F*5);let ht=re?Ma(Z.kind,Ue):null;if(Z.pos=ht,re&&(ct(re,ht.x,ht.y-ht.s*.6),re.step(F,M,j)),Oe([Ue.left,Ue.top,Ue.width,Ue.height],[Z.radius,Z.plate?1:0,Ve,Z.flash],ht,re,ze,1),Se>=100)break}let et=null,pi=[];if(r.ui.view==="pattern"&&e.el.isConnected){let Z=e.el.getBoundingClientRect();if(Z.width>10&&Z.height>10){let Pe=S();et={x:Z.left-X.left,y:Z.top-X.top,w:Z.width,h:Z.height,r:parseFloat(getComputedStyle(e.el).borderTopLeftRadius)||20};let Ue=J[e.part]||J.accent;p.forEach((de,Ve)=>{let ze=f[Ve];if(!ze)return;let re=E(de,Ve,Pe,Z.width,Z.height),ht=et.x+(de.x0+de.x1)/2*Z.width,ut=et.y+re.y*Z.height,as=b&&b[Ve]||0;ze.glowT=Math.max(as*.8,Q?.12*H:0),ct(ze,ht,ut-re.s*.6),ze.step(F,M,j),pi.push({x0:de.x0,y0:de.y0,x1:de.x1,y1:de.y1,black:!!de.cut,lit:Math.max(as,ze.glow*.6)}),Oe([0,0,0,0],[0,0,0,0],{x:ht,y:ut,s:re.s},ze,Ue,e.gpu?.6:1)})}}o.draw({time:M/1e3,flicker:Ne,watch:T,beat:H,calm:j,pad:et,stage:!e.gpu,keys:pi,accent:J.accent,dolls:Se,data:q});let Wt=i();Wt&&(Wt.stage=[1,(j?M*.25:M)/1e3,T,H],Wt.scene&&Wt.scene.glass&&(r.ui.view==="pattern"||r.ui.view==="tweaks")&&Wt.keepAwake()),o.errors.length&&!Fe.reported&&(Fe.reported=!0,console.warn("MOTIF Halloween:",o.errors.join(`
`))),Ae()}let Ae=()=>{l&&!n&&document.visibilityState==="visible"&&(n=requestAnimationFrame(ot))},$e=()=>{z=0,Ae()},Fe={get on(){return l},get stage(){return l&&!e.gpu},get ok(){return!!(o&&o.ok)},get errors(){return o?o.errors:[]},get ema(){return W},get scale(){return _},set(M){if(M!==l){if(l=M,l)o=new Rs(t),o.ok||console.warn("MOTIF Halloween: WebGL 2 indisponible",o.errors),ee(),d=!0,m="",c=new MutationObserver(()=>{d=!0}),c.observe(t,{childList:!0,subtree:!0}),document.addEventListener("pointerdown",ae,!0),document.addEventListener("pointermove",se,!0),document.addEventListener("pointerup",xe,!0),document.addEventListener("pointercancel",xe,!0),document.addEventListener("visibilitychange",$e),k=performance.now(),z=0,Ae();else{n&&cancelAnimationFrame(n),n=0,c&&c.disconnect(),c=null,document.removeEventListener("pointerdown",ae,!0),document.removeEventListener("pointermove",se,!0),document.removeEventListener("pointerup",xe,!0),document.removeEventListener("pointercancel",xe,!0),document.removeEventListener("visibilitychange",$e),o&&o.destroy(),o=null;let F=i();F&&(F.stage=null,F.wake()),h=[],v.clear(),f=[],m="",R.clear(),O.clear()}e.draw()}},refresh(){l&&(ee(),d=!0,m="")},press:D,note:I,keyLights(M){b=M},level(M){if(!(!l||!M)){if(Q=!!M.playing,M.playing&&M.tick>=0){let F=Math.floor(M.tick/96);if(F!==le){le=F,H=1;let j=M.tick%384<96;for(let G of h)G.doll&&(G.tag==="play"||G.tag==="tempo")&&G.doll.sing(j?.9:.5,G.tag==="play"?J.play:J.accent);for(let G of f)G.sqv-=j?1.6:.8}}if(M.m&&(P={d:M.m.d,bass:M.m.bass,lead:M.m.lead,drum:M.m.drum}),M.trig){for(let F=0;F<M.trig.length;F+=4)if(M.trig[F]===0&&M.trig[F+1]===0){for(let j of h)j.doll&&(j.doll.sqv-=1.4,j.doll.hvy+=.6);break}}}},gasp(){if(l){for(let M of h)M.doll&&M.doll.startle(.9);for(let M of f)M.startle(.9)}}};return e.ghouls=Fe,Fe}var ui="a7579e1ead",w=new ds;window.__motif=w;var Or={drum:"Drum",bass:"Bass",lead:"Lead"},_r={kick:"KICK",snare:"SNARE \xB7 CLAP",hat:"HAT",perc:"PERC",bass:"BASSE",lead:"M\xC9LODIE"},Rt=[["order","Ordre"],["up","Montant"],["down","Descendant"],["chord","Accord"]],Me=null,Ut,be,Xe,zt,Ge,mt,V=null,qe=null,Pa=!1,L={},Ca=0;function Be(r,e){let t=L.toast;if(t.replaceChildren(u("span",{text:r})),e){let s=u("button",{text:e.label,onclick:()=>{t.classList.remove("show"),e.fn()}});t.append(s)}t.classList.toggle("act",!!e),t.classList.add("show"),clearTimeout(Ca),Ca=setTimeout(()=>t.classList.remove("show"),e?5e3:2200)}function Ht(){return Me.running?Promise.resolve(!0):Me.start().then(r=>(r&&fi(),r)).catch(r=>(Be("Audio indisponible : "+r.message),!1))}function Ba(r,e){L.wake.querySelector("h1").textContent=r,L.wake.querySelector("p").textContent=e,L.wake.classList.remove("hidden")}function fi(){L.wake.classList.add("hidden")}async function qs(r){for(let e of Bi(r)){let t=e==="drums"?"banks/drums/bank.json":`banks/${e}/bank.json`;if(!Me.loadedBanks.has(t))try{await Me.loadBank(t)}catch(s){Be("Sons non charg\xE9s ("+e+") : "+s.message)}}}async function Fa(){let r=w.project,e=[...r.parts.drum.kit,r.parts.bass.preset,r.parts.lead.preset];for(let t of e)await qs(ye(t));w.syncAll()}function Ir(){Ut=document.getElementById("app"),Ut.dataset.part=w.ui.part,L.logo=u("button",{class:"logo","aria-label":"Menu et projets",onclick:()=>mt.menu()},u("span",{html:K("logo").outerHTML}),u("b",{text:"MOTIF"})),L.rec=u("button",{class:"tbtn rec","aria-label":"Armer l\u2019enregistrement","aria-pressed":"false",onclick:Fr},K("rec")),L.play=u("button",{class:"tbtn play","aria-label":"Lecture","aria-pressed":"false",onclick:Nr},K("play")),L.progressFill=u("div",{class:"fill"}),L.progressBars=u("div",{class:"bars"}),L.pos=u("span",{class:"pos",text:""}),L.progress=u("div",{class:"progress","aria-hidden":"true"},L.progressFill,L.progressBars,L.pos),L.tempo=u("div",{class:"chip tempo",role:"slider",tabindex:"0","aria-label":"Tempo. Toucher pour le m\xE9tronome, glisser pour changer."},u("b"),u("small",null,u("span",{class:"mi",html:K("metro").outerHTML}),"BPM")),L.key=u("button",{class:"chip","aria-label":"Tonalit\xE9 et gamme",onclick:()=>mt.keyPicker()},u("b"),u("small"));let r=u("div",{class:"top"},L.logo,L.rec,L.play,L.progress,L.tempo,L.key);Ui(L.tempo,{get:()=>w.project.tempo,set:t=>{w.set("tempo",t),jt()},step:6,onTap:zr}),L.parts=u("div",{class:"parts",role:"tablist"});for(let t of["drum","bass","lead"]){let s=u("button",{class:"ptab",role:"tab","data-p":t,onclick:()=>Ua(t)},K(t),Or[t],u("i",{class:"lvl"}),u("i",{class:"mute"}));L.parts.append(s)}L.instName=u("button",{class:"name","aria-label":"Choisir un son",onclick:()=>mt.browser()},u("small"),u("b")),L.prev=u("button",{class:"arrow","aria-label":"Son pr\xE9c\xE9dent",onclick:()=>di(-1)},K("left")),L.next=u("button",{class:"arrow","aria-label":"Son suivant",onclick:()=>di(1)},K("right")),L.dice=u("button",{class:"arrow dice","aria-label":"Son au hasard pour cette partie (annulable)",onclick:()=>_a(w.ui.part)},K("dice"));let e=u("div",{class:"inst"},L.prev,L.instName,L.next,L.dice);Br(L.instName),L.view=u("div",{class:"view"}),L.nav=u("nav",{class:"nav",role:"tablist"});for(let[t,s,i]of[["pattern","Pattern","pattern"],["tweaks","Tweaks","tweaks"],["mix","Mix","mix"],["song","Song","song"]])L.nav.append(u("button",{role:"tab","data-v":t,onclick:()=>za(t)},K(i),s));L.toast=u("div",{class:"toast",role:"status"}),L.wake=u("div",{class:"wake"},u("div",{class:"orb"},K("play")),u("h1",{text:He.name}),u("p",{text:"Touchez pour activer le son."})),L.wake.addEventListener("click",async()=>{(Me.ctx?await Me.rebuildIfNeeded():await Ht())&&(fi(),await Fa())}),Ut.append(r,L.parts,e,L.view,L.nav),document.body.append(L.toast,L.wake),be=new vs(w,{onFirstTouch:()=>{Me.running||Ht()}}),Xe=new gs(w,{onSelect:()=>Gt()}),zt=new ps({get:()=>w.project.parts[w.ui.part].range,set:t=>w.setPart(w.ui.part,"range",t),scale:()=>({scale:w.project.scale,steps:w.project.parts[w.ui.part].steps,key:w.project.key}),onStart:()=>{}}),Ge=new bs(w),mt=new xs(w,{host:()=>Me,toast:Be,loadBanksFor:qs,ensureAudio:Ht,rollDice:_a,previewFluid:Na,fluidStatus:Ur,enableTilt:Oa,build:ui}),V=ga(w,{pad:be,xy:Ge}),V&&(be.fx=V,Ge.fx=V,window.__motifFx=V,w.settings.glassTilt&&Oa(!0)),qe=Da(w,{pad:be,app:Ut,fx:()=>V}),window.__motifHw=qe,qe.set(document.documentElement.hasAttribute("data-halloween"))}function Br(r){let e=null;r.addEventListener("pointerdown",t=>{e={x:t.clientX,y:t.clientY,t:performance.now()}}),r.addEventListener("pointerup",t=>{if(!e)return;let s=t.clientX-e.x,i=t.clientY-e.y;e=null,Math.abs(s)>40&&Math.abs(s)>Math.abs(i)*1.5&&(di(s<0?1:-1),r.dataset.swiped="1",setTimeout(()=>{delete r.dataset.swiped},50))}),r.addEventListener("click",t=>{r.dataset.swiped&&(t.stopImmediatePropagation(),t.preventDefault())},!0)}function Fr(){Ht();let r=w.ui;w.send({type:"transport",cmd:r.armed?"disarm":"arm"})}function Nr(){Ht().then(()=>w.send({type:"transport",cmd:w.ui.playing?"stop":"play"}))}var qa=!1;function Oa(r){let e=()=>{qa||(qa=!0,window.addEventListener("deviceorientation",s=>{V&&w.settings.glassTilt&&s.gamma!==null&&V.tilt(s.gamma,s.beta)}))},t=window.DeviceOrientationEvent;if(r){t&&e();return}t&&typeof t.requestPermission=="function"?t.requestPermission().then(s=>{s==="granted"?e():(w.setSetting("glassTilt",!1),Be("Mouvements refus\xE9s : les reflets suivent ton doigt"))}).catch(()=>w.setSetting("glassTilt",!1)):t&&e()}function Ur(){let r=V?V.engine():"none";return{"webgpu-hdr":"Actif : WebGPU, \xE9cran HDR \u2014 l\u2019encre et le verre peuvent d\xE9passer le blanc.",webgpu:"Actif : WebGPU (\xE9cran standard : pas de HDR ici).",webgl:"Actif : WebGL (compatibilit\xE9, sans HDR).",none:"Effets fluides indisponibles sur cet appareil."}[r]}function Na(){if(V){if(!w.settings.fluid&&!w.settings.glass){Be("Active le fluide ou le verre pour voir l\u2019aper\xE7u");return}w.ui.view!=="pattern"&&za("pattern"),setTimeout(()=>{V.place(),setTimeout(()=>V.preview(),120)},320)}}function zr(){let r=!w.settings.metro;w.setSetting("metro",r),jt(),Be(r?w.settings.metroAlways?"M\xE9tronome activ\xE9":"M\xE9tronome activ\xE9 pendant l\u2019enregistrement":"M\xE9tronome coup\xE9",r?{label:"R\xE9glages",fn:()=>mt.settings()}:null)}async function _a(r){let e=w.planRandom(r);for(let s of Fi(e))await qs(ye(s));w.applyRandom(e);let t=[];e.kit&&t.push(r==="drum"?e.kit.map(s=>ye(s).name).join(" \xB7 "):"kit "+ye(e.kit[0]).name+"\u2026");for(let s of["bass","lead"])e[s]&&t.push(ye(e[s].preset).name+(e[s].oct?` (${e[s].oct>0?"+":""}${e[s].oct} oct.)`:""));L.instName.classList.remove("flash"),L.instName.offsetWidth,L.instName.classList.add("flash"),Be(t.join(" \xB7 "),{label:"Annuler",fn:()=>{w.undo()&&Be("Sons d\u2019avant r\xE9tablis")}})}function Ua(r){if(w.ui.part===r){mt.browser();return}be.releaseAll(),w.ui.part=r,w.ui.group=0,Xe.clear(),Ut.dataset.part=r,Cs()}function za(r){be.releaseAll(),Ge.releaseAll(),w.ui.view=r,Ga()}function Ha(){let r=w.ui;return r.part==="drum"?wt[r.lane]:r.part}function ja(){let r=w.project,e=w.ui;return e.part==="drum"?r.parts.drum.kit[e.lane]:r.parts[e.part].preset}async function di(r){let e=Ha(),t=Ze(e),s=t.findIndex(a=>a.id===ja()),i=t[(s+r+t.length)%t.length];await ti(i.id)}async function ti(r){let e=ye(r);if(!e)return;await qs(e);let t=w.ui;w.setPreset(t.part,t.lane,r),L.instName.classList.remove("flash"),L.instName.offsetWidth,L.instName.classList.add("flash")}function jt(){let r=w.project,e=w.ui;L.tempo.querySelector("b").textContent=r.tempo,L.tempo.setAttribute("aria-valuenow",r.tempo),L.tempo.classList.toggle("metro",!!w.settings.metro),L.tempo.classList.toggle("live",!!w.settings.metro&&e.playing&&(e.armed||w.settings.metroAlways)),L.key.querySelector("b").textContent=nt[r.key],L.key.querySelector("small").textContent=lt(r.scale).name.slice(0,9),L.rec.setAttribute("aria-pressed",String(e.armed)),L.rec.classList.toggle("waiting",e.armed&&!e.playing),L.play.setAttribute("aria-pressed",String(e.playing)),L.play.replaceChildren(K(e.playing?"stop":"play")),L.play.setAttribute("aria-label",e.playing?"Arr\xEAter":"Lecture"),L.progress.classList.toggle("rec",e.armed),L.progressBars.childElementCount!==r.bars&&L.progressBars.replaceChildren(...Array.from({length:r.bars},()=>u("i"))),e.playing||(L.progressFill.style.width="0",L.pos.textContent=e.armed?"REC pr\xEAt":`${r.bars} mes.`)}function is(){let r=w.project;for(let e of L.parts.children){let t=e.dataset.p;e.setAttribute("aria-selected",String(t===w.ui.part));let s=t==="drum"?r.parts.drum.mute.every(Boolean):r.parts[t].mute;e.classList.toggle("muted",s)}}function Ps(){let r=w.ui,e=Ha(),t=Ze(e),s=ja(),i=ye(s),a=t.findIndex(n=>n.id===s),o=i&&i.style?Qe(i.style):null;L.instName.querySelector("small").textContent=`${_r[e]} \xB7 ${a+1}/${t.length}${o?" \xB7 "+o.short:""}`,L.instName.querySelector("b").textContent=i?i.name:"\u2014",L.instName.setAttribute("aria-label",`Son ${i?i.name:""}, ${a+1} sur ${t.length}. Toucher pour parcourir.`)}function Cs(){jt(),is(),Ps(),Ga()}var Et=null;function Ga(){let r=w.ui.view;for(let e of L.nav.children)e.setAttribute("aria-selected",String(e.dataset.v===r));Et&&(Et(),Et=null),L.view.replaceChildren(),r==="pattern"?Hr():r==="tweaks"?Wr():r==="mix"?Vr():Kr(),V&&requestAnimationFrame(()=>V.place())}function Hr(){let r=w.ui,e=w.project,t=u("div",{class:"controls"});if(r.part==="drum")for(let s=0;s<4;s++){let i=new Ye({label:["Kick","Snare","Hat","Perc"][s],min:()=>0,max:()=>Dt[s].length-1,get:()=>w.project.parts.drum.rhythm[s],set:a=>{w.setPart("drum","rhythm",a,s)},format:a=>({v:a===0?"1\xD7":String(a).padStart(2,"0"),s:Dt[s][a].name}),ring:(a,o,n,l)=>Xs(a,o,n,Dt[s][l],null,-1,As(),Ds()),onTap:()=>{r.lane=s,Ps(),Nt.forEach((a,o)=>a.el.classList.toggle("active",o===s))},onStart:()=>{r.lane=s,Ps()}});i.el.classList.toggle("active",s===r.lane),t.append(i.el),Nt.push(i)}else{let s=r.part,i=!1,a=new Ye({label:"Rythme",min:()=>0,max:()=>i?Is(pt[e.parts[s].rhythm]):pt.length-1,get:()=>i?w.project.parts[s].ties:w.project.parts[s].rhythm,set:l=>{if(i)w.setPart(s,"ties",l);else{w.setPart(s,"rhythm",l);let c=Is(pt[l]);w.project.parts[s].ties>c&&w.setPart(s,"ties",c)}},format:l=>{let c=w.project.parts[s],d=pt[c.rhythm];return i?{v:l===0?"OFF":String(l),s:d.len===0?"gliss\xE9":"liaisons",l:"Liaisons",ties:!0}:{v:l===0?"\u221E":String(l).padStart(2,"0"),s:d.name+(c.ties?` \xB7 ${c.ties} liaison${c.ties>1?"s":""}`:""),l:"Rythme"}},ring:(l,c,d)=>{let h=w.project.parts[s],v=pt[h.rhythm];Xs(l,c,d,v,wi(v,h.ties),-1,As(),Ds())},onTap:()=>{i=!i,a.render()},onSwipeX:l=>{i=l>0,a.render()},step:16}),o=new Ye({label:"Degr\xE9s",min:()=>0,max:()=>tt.length-1,get:()=>tt.indexOf(w.project.parts[s].steps),set:l=>{w.setPart(s,"steps",tt[l]),zt.render(),be.draw()},format:l=>({v:tt[l]===12?"12":String(tt[l]),s:tt[l]===12?"chromatique":tt[l]===5?"pentatonique":tt[l]===7?"gamme enti\xE8re":"par octave"}),ring:(l,c,d,h)=>{let v=tt[h],f=c/2,m=d/2-2,p=Math.min(c,d)/2-8;l.lineWidth=4,l.lineCap="round";for(let b=0;b<v;b++){let y=-Math.PI/2+b/v*Math.PI*2+.06,k=-Math.PI/2+(b+1)/v*Math.PI*2-.06;l.strokeStyle=b===0?As():Ds(2),l.beginPath(),l.arc(f,m,p,y,k),l.stroke()}},step:18}),n=new Ye({label:"Doigts",min:()=>0,max:()=>Rt.length-1,get:()=>Rt.findIndex(l=>l[0]===w.project.parts[s].arp),set:l=>w.setPart(s,"arp",Rt[l][0]),format:l=>({v:["1\u21922","\u2197","\u2198","\u2261"][l],s:Rt[l][1]}),onTap:()=>{let l=(Rt.findIndex(c=>c[0]===w.project.parts[s].arp)+1)%Rt.length;w.setPart(s,"arp",Rt[l][0]),n.render()},step:22});n.el.classList.add("small"),t.append(a.el,o.el,n.el),Nt.push(a,o,n)}L.view.append(t),r.part!=="drum"&&L.view.append(zt.el),L.view.append(be.el),L.undo=u("button",{class:"tbtn small","aria-label":"Annuler",onclick:()=>{w.undo()&&Be("Annul\xE9")}},K("undo")),L.redo=u("button",{class:"tbtn small","aria-label":"R\xE9tablir",onclick:()=>{w.redo()&&Be("R\xE9tabli")}},K("redo")),L.erase=u("button",{class:"tbtn small","aria-label":"Gomme","aria-pressed":String(r.erase),onclick:()=>{w.setErase(!w.ui.erase)}},K("erase")),L.clear=u("button",{class:"tbtn small","aria-label":"Effacer",onclick:Gr},K("trash")),L.view.append(u("div",{class:"timeline"},L.undo,Xe.el,L.erase,L.clear)),requestAnimationFrame(()=>{Nt.forEach(s=>s.render()),r.part!=="drum"&&zt.render(),be.setHint(),be.showHint(!jr()),be.draw(),Xe.draw(),Gt()}),Et=()=>{Nt.length=0,be.releaseAll()}}var Nt=[];function jr(){let r=w.pattern,e=w.ui.part;return e==="drum"?r.drum.some(t=>t.hits.length):r[e].notes.length>0}function Gt(){L.erase&&(L.erase.classList.toggle("on",w.ui.erase),L.erase.setAttribute("aria-pressed",String(w.ui.erase)),L.undo.disabled=!w.undoStack.length,L.clear.classList.toggle("on",!!Xe.sel),L.clear.setAttribute("aria-label",Xe.sel?"Effacer la s\xE9lection":"Effacer\u2026"))}function Gr(){let r=w.ui;if(Xe.sel){let e=Xe.sel;w.eraseSpan(r.part,r.part==="drum"?null:void 0,e.t0,e.t1),Xe.clear(),Gt(),Be("Portion effac\xE9e",{label:"Annuler",fn:()=>w.undo()});return}mt.clearMenu()}function Wr(){L.view.append(Ge.groupsEl,Ge.el,Ge.barEl),requestAnimationFrame(()=>Ge.render()),Et=()=>Ge.releaseAll()}function Vr(){let r=w.project,e=u("div",{class:"mix"}),t=u("div",{class:"faders"}),s=[["drum",0,"Kick","--drum"],["drum",1,"Snare","--drum"],["drum",2,"Hat","--drum"],["drum",3,"Perc","--drum"],["bass",null,"Basse","--bass"],["lead",null,"M\xE9lodie","--lead"]],i=[],a=new Map,o=new Map,n=(p,b)=>{let y=a.get(p);y&&(w.setMute(y.part,y.lane,b),y.upd())};t.addEventListener("pointermove",p=>{let b=o.get(p.pointerId);if(!b)return;let y=document.elementFromPoint(p.clientX,p.clientY),k=y&&y.closest(".m");k&&a.has(k)&&!b.done.has(k)&&(b.done.add(k),n(k,b.v),is())});let l=p=>o.delete(p.pointerId);t.addEventListener("pointerup",l),t.addEventListener("pointercancel",l);for(let[p,b,y,k]of s){let T=()=>p==="drum"?w.project.parts.drum.level[b]:w.project.parts[p].level,R=()=>p==="drum"?w.project.parts.drum.mute[b]:w.project.parts[p].mute,O=u("div",{class:"fill"}),H=u("div",{class:"meter"}),le=u("div",{class:"db"}),Q=u("button",{class:"m","aria-pressed":String(R()),"aria-label":"Couper "+y,text:"M"}),P=u("div",{class:"fader",style:{"--fc":`var(${k})`},role:"slider","aria-label":"Volume "+y,tabindex:"0"},O,H,u("div",{class:"t",text:y}),le,Q),$=z=>Math.pow((z+40)/46,1.6),_=()=>{let z=T();O.style.height=$(z)*100+"%",le.textContent=(z>0?"+":"")+z.toFixed(1)+" dB",P.classList.toggle("muted",R()),Q.setAttribute("aria-pressed",String(R()))},W=null;P.addEventListener("pointerdown",z=>{if(z.target!==Q){z.preventDefault();try{P.setPointerCapture(z.pointerId)}catch{}W={y:z.clientY,v:T(),t:performance.now()}}}),P.addEventListener("pointermove",z=>{if(!W)return;let he=P.getBoundingClientRect().height,U=$(W.v)+(W.y-z.clientY)/he,q=Math.max(-40,Math.min(6,Math.pow(Math.max(0,Math.min(1,U)),1/1.6)*46-40));w.setLevel(p,b,Math.round(q*2)/2),_()}),P.addEventListener("pointerup",z=>{W&&Math.abs(z.clientY-W.y)<4&&performance.now()-W.t<250&&z.detail===2&&(w.setLevel(p,b,0),_()),W=null}),P.addEventListener("dblclick",()=>{w.setLevel(p,b,0),_()}),a.set(Q,{part:p,lane:b,upd:()=>_()}),Q.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation();let he=!R();n(Q,he),is(),o.set(z.pointerId,{v:he,done:new Set([Q])});try{Q.releasePointerCapture(z.pointerId)}catch{}}),Q.addEventListener("click",z=>{z.detail===0&&(n(Q,!R()),is())}),_(),i.push({part:p,lane:b,meter:H,el:P}),t.append(P)}let c=(p,b,y,k=.02)=>new Ye({label:p,min:()=>0,max:()=>50,get:()=>Math.round(w.project.mix[b]/k),set:R=>{w.setMix(b,R*k)},format:R=>({v:y(R*k),s:""}),ring:(R,O,H,le)=>{let Q=O/2,P=H/2-2,$=Math.min(O,H)/2-8;R.lineWidth=4,R.lineCap="round",R.strokeStyle=Ds(2),R.beginPath(),R.arc(Q,P,$,Math.PI*.75,Math.PI*2.25),R.stroke(),R.strokeStyle=As(),R.beginPath(),R.arc(Q,P,$,Math.PI*.75,Math.PI*.75+le/50*Math.PI*1.5),R.stroke()},step:5}),d=[c("Pump","pump",p=>Math.round(p*100)+""),c("Espace","space",p=>Math.round(p*100)+""),c("Batterie","drumDrive",p=>Math.round(p*100)+"")],h=new Ye({label:"Master",min:()=>0,max:()=>36,get:()=>Math.round((w.project.mix.master+18)*1),set:p=>w.setMix("master",p-18),format:p=>({v:(p-18>0?"+":"")+(p-18)+" dB",s:""}),step:6}),v=u("div",{class:"mixknobs"},...d.map(p=>p.el),h.el);e.append(t,v),L.view.append(e),requestAnimationFrame(()=>{d.forEach(p=>p.render()),h.render()});let f=w.on("pos",p=>{if(p.m){for(let b of i){let y=b.part==="drum"?p.m.d[b.lane]:p.m[b.part],k=20*Math.log10(Math.max(y,1e-5));b.meter.style.height=Math.max(0,Math.min(100,(k+48)/48*100))+"%"}V&&V.mixLevels(p.m)}}),m=null;if(V){V.setMix({el:t,faders:i.map(({part:y,lane:k,el:T})=>({part:y,lane:k,el:T}))});let p=y=>k=>{let T=t.getBoundingClientRect();V.press(k.pointerId,(k.clientX-T.left)/T.width,(k.clientY-T.top)/T.height,y)},b=[["pointerdown",p("down")],["pointermove",p("move")],["pointerup",p("up")],["pointercancel",p("cancel")]];for(let[y,k]of b)t.addEventListener(y,k);m=()=>{for(let[y,k]of b)t.removeEventListener(y,k)}}Et=()=>{f(),m&&m(),V&&V.setMix(null)}}function Kr(){let r=mt.songView();L.view.append(r.el),Et=r.cleanup}function As(){return getComputedStyle(Ut).getPropertyValue("--accent").trim()}function Ds(r=1){return document.documentElement.dataset.theme==="dark"?`rgba(255,255,255,${.08*r})`:`rgba(0,0,0,${.08*r})`}var Yr=null,Ia=-1;function Xr(r){Yr=r;let e=w.project,t=w.ui;if(r.playing&&r.tick>=0){let s=384*e.bars;L.progressFill.style.width=((r.tick+1)/s*100).toFixed(2)+"%";let i=Math.floor(r.tick/384)+1,a=Math.floor(r.tick%384/96)+1;L.pos.textContent=`${i}.${a}`;let o=Math.floor(r.tick/96);o!==Ia&&(Ia=o,L.tempo.classList.contains("live")&&(L.tempo.classList.remove("beat","down"),L.tempo.offsetWidth,L.tempo.classList.add("beat"),r.tick%384<96&&L.tempo.classList.add("down")))}if(r.m)for(let s of L.parts.children){let i=s.dataset.p==="drum"?r.m.drum:r.m[s.dataset.p];s.querySelector(".lvl").style.transform=`scaleX(${Math.min(1,Math.sqrt(i||0)*1.1).toFixed(3)})`}if(t.view==="pattern"){let s=e.song.enabled&&e.song.sections.length;be.setClock({tick:r.tick,at:performance.now(),playing:r.playing,msPerTick:6e4/(e.tempo*96),L:384*e.bars,pat:s?e.song.sections[r.sec%e.song.sections.length].p:e.current}),be.onTrig(r.trig,r.m),Xe.setTick(r.playing?r.tick:-1)}t.view==="tweaks"&&Ge.onPos(r),V&&V.level(r),qe&&qe.level(r)}function $r(r){switch(r){case"transport":jt(),w.ui.view==="pattern"&&(be.setHint(),Xe.draw()),qe&&w.ui.armed&&!Pa&&qe.gasp(),Pa=w.ui.armed;break;case"tempo":case"key":case"scale":case"bars":jt(),w.ui.view==="pattern"&&(zt.render(),be.draw(),Xe.draw());break;case"preset":Ps(),w.ui.view==="tweaks"&&Ge.render(),w.ui.view==="pattern"&&(be.setHint(),be.draw());break;case"notes":w.ui.view==="pattern"&&(Xe.draw(),be.showHint(!1),Gt());break;case"undo":Gt();break;case"erase":Gt(),be.setHint(),be.showHint(!0),be.draw(),w.ui.erase&&Be(w.ui.playing?"Gomme : touche le pad pour effacer pendant la lecture":"Gomme activ\xE9e \u2014 lance la lecture puis touche le pad");break;case"project":case"pattern":Cs();break;case"auto":case"macro":w.ui.view==="tweaks"&&Ge.render();break;case"mix":is(),V&&V.syncScene();break;case"settings:metro":case"settings:metroAlways":jt();break;case"settings:piano":case"settings:ghosts":w.ui.view==="pattern"&&(be.setHint(),be.draw());break;case"settings:glass":document.documentElement.toggleAttribute("data-glass",!!w.settings.glass),V&&V.place();break;case"settings:fluid":case"settings:fluidZone":case"settings:fluidStyle":case"settings:fluidColors":case"settings:fluidInk":case"settings:fluidHdr":case"settings:glassSpill":case"settings:glassLight":case"settings:mixGlass":case"settings:ctrlHeight":case"settings:lightLook":case"settings:hdrLight":case"settings:glassLook":V&&V.place();break;case"settings:fluidEngine":w.save().finally(()=>location.reload());break;case"settings:glassTilt":V&&!w.settings.glassTilt&&V.tilt(null);break;default:r&&r.includes(":range")&&be.draw(),r&&r.endsWith(":steps")&&(zt.render(),be.draw()),r&&(r.endsWith(":rhythm")||r.endsWith(":ties"))&&Nt.forEach(e=>e.render())}}function Jr(){let r=()=>{be&&be.releaseAll(),Ge&&Ge.releaseAll(),w.ui.playing&&w.send({type:"transport",cmd:"stop"}),w.ui.armed&&w.send({type:"transport",cmd:"disarm"}),w.save(),Me.suspend()};document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="hidden")r();else if(Me.ctx){try{await Me.ctx.resume()}catch{}await Me.probe(400)||Ba("Son en pause","Touchez pour r\xE9activer le son.")}}),window.addEventListener("pagehide",()=>w.save()),window.addEventListener("beforeunload",()=>w.save());let e=()=>document.documentElement.style.setProperty("--app-h",window.innerHeight+"px");CSS.supports("height","100dvh")||(e(),window.addEventListener("resize",e)),document.addEventListener("gesturestart",t=>t.preventDefault()),document.addEventListener("dblclick",t=>{t.target.closest("input,textarea")||t.preventDefault()},{passive:!1}),document.addEventListener("touchmove",t=>{t.target.closest(".scroll, .sheet .body, .filters")||t.preventDefault()},{passive:!1})}async function Qr(){await w.init(),Me=new fs({workletUrl:"worklet.js?v="+ui,onMessage:t=>w.onEngine(t),onState:t=>{(t==="interrupted"||t==="suspended")&&document.visibilityState==="visible"&&w.ui.playing&&Ba("Son interrompu","Touchez pour reprendre."),t==="running"&&fi()}}),Me.replay=()=>w.engineState(),Me.rebuildIfNeeded=async()=>{try{await Me.ctx.resume()}catch{}return await Me.probe(250)?!0:(Be("Red\xE9marrage du son\u2026"),Me.rebuild())},w.engine=Me,Ir(),w.on("change",$r),w.on("pos",Xr),w.on("error",t=>Be(t)),Jr(),window.addEventListener("motif:theme",()=>{qe&&(qe.set(document.documentElement.hasAttribute("data-halloween")),qe.refresh()),Cs()}),Cs();let r=Fa().catch(t=>{window.__motifBankError=String(t&&t.message||t)});(/[?&]diag\b/.test(location.search)||location.hostname==="localhost"&&matchMedia("(display-mode: standalone)").matches)&&Zr(r),aa({toast:Be,store:w,build:ui}),/[?&]fxtest\b/.test(location.search)&&location.hostname==="localhost"&&setTimeout(async()=>{document.querySelectorAll(".wake").forEach(c=>c.remove()),w.settings.glass||w.setSetting("glass",!0);let t=new URLSearchParams(location.search),s=t.get("part"),i=t.get("look"),a=w.settings.glassLook;t.get("theme")==="halloween"&&(document.documentElement.setAttribute("data-halloween",""),document.documentElement.dataset.theme="dark",window.dispatchEvent(new Event("motif:theme"))),["drum","bass","lead"].includes(s)&&w.ui.part!==s&&(Ua(s),await new Promise(c=>setTimeout(c,400))),i&&(w.settings.glassLook=i,V&&V.place(),await new Promise(c=>setTimeout(c,300))),V&&V.fluid&&t.has("m")&&(V.fluid.marginTest=+t.get("m"),V.place()),t.has("ns")&&w.settings.glassSpill&&w.setSetting("glassSpill",!1),!t.has("ns")&&!w.settings.glassSpill&&w.setSetting("glassSpill",!0);let o=V&&V.fluid,n=async c=>{if(!(!t.has("snap")||!o))try{o.render(!0);let d=document.createElement("canvas");d.width=Math.round(o.canvas.width/2),d.height=Math.round(o.canvas.height/2),d.getContext("2d").drawImage(o.canvas,0,0,d.width,d.height),await fetch("/__log",{method:"POST",body:JSON.stringify({kind:"snap",name:c,out:[d.toDataURL("image/png")]})})}catch{}};for(let c=0;c<5;c++)Na(),await new Promise(d=>setTimeout(d,c===1?900:1500)),c===1&&(await n("preview"),await new Promise(d=>setTimeout(d,600)));if(t.has("snap")&&(await new Promise(c=>setTimeout(c,6500)),await n("rest")),t.has("snap")&&t.has("edges")&&o&&o.splat){let c=o.cfg.DENSITY_DISSIPATION;o.cfg.DENSITY_DISSIPATION=0,o.clear();let d=(h,v,f,m,p,b)=>o.splat(h,v,f,m,{r:p[0]*.3,g:p[1]*.3,b:p[2]*.3},b);for(let h=0;h<12;h++)d(.9,.05+h*.08,(h%2?1:-1)*.01,.006,[.45,.05,1],.7);d(.12,.06,.02,.01,[1,.05,.6],.8),d(.14,.35,0,.01,[1,.05,.6],.5),d(.5,.97,.03,-.01,[1,.1,.7],.6),o.applyInputs(),o.render(!1),await new Promise(h=>setTimeout(h,300)),await n("edges"),o.cfg.DENSITY_DISSIPATION=c}i&&(w.settings.glassLook=a,V&&V.place());let l=null;try{o.render(!0);let c=document.createElement("canvas");c.width=o.canvas.width,c.height=o.canvas.height;let d=c.getContext("2d");d.drawImage(o.canvas,0,0);let h=o.off?o.off[0]:0,v=o.off?o.off[1]:0,f=o.hostW||c.width,m=o.hostH||c.height,p=(b,y)=>Array.from(d.getImageData(Math.round(h+b*f),Math.round(v+y*m),1,1).data);l={centre:p(.5,.5),rimLeft:p(.004,.5),bevelLeft:p(.03,.5),cornerOutside:p(.001,.001),top:p(.5,.004),below:p(.5,1.02)}}catch(c){l=String(c)}fetch("/__log",{method:"POST",body:JSON.stringify({kind:"fxtest",ua:navigator.userAgent,engine:V?V.engine():"none",ok:!!(o&&o.ok),glass:w.settings.glass,sceneGlass:!!(o&&o.scene&&o.scene.glass),shaderErrors:o&&o.shaderErrors?o.shaderErrors.map(c=>String(c).slice(0,300)):null,link:o&&o.gl?o.gl.getProgramParameter(o.p.display.p,o.gl.LINK_STATUS):null,format:o&&o.format,extended:o&&o.extended,hdrScreen:o&&o.hdrScreen,gpuCanvas:!!document.querySelector("canvas.fluid"),slow:o&&o.ema,spill:V&&V.spillStats,px:l,hw:qe&&qe.on?{ok:qe.ok,errors:qe.errors,ema:qe.ema,scale:qe.scale}:null})}).catch(()=>{})},2500);let e=()=>{Ht()};window.addEventListener("pointerdown",e,{once:!0,capture:!0})}async function Zr(r){let e=performance.now();await r;let t=getComputedStyle(document.documentElement),s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;visibility:hidden",document.body.append(s);let i=getComputedStyle(s),a=document.getElementById("app").getBoundingClientRect(),o=document.querySelector(".nav").getBoundingClientRect(),n=document.querySelector(".pad")&&document.querySelector(".pad").getBoundingClientRect(),l={kind:"diag",ua:navigator.userAgent,standalone:matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,inner:[innerWidth,innerHeight],vv:window.visualViewport?[visualViewport.width,visualViewport.height]:null,dpr:devicePixelRatio,safe:[i.paddingTop,i.paddingBottom],app:[a.top,a.height],navBottom:o.bottom,padH:n?n.height:null,screen:[screen.width,screen.height],docH:document.documentElement.clientHeight,dvh:(()=>{let f=document.createElement("div");f.style.cssText="position:fixed;height:100dvh;width:1px;top:0",document.body.append(f);let m=f.getBoundingClientRect().height;return f.remove(),m})(),vh:(()=>{let f=document.createElement("div");f.style.cssText="position:fixed;height:100vh;width:1px;top:0",document.body.append(f);let m=f.getBoundingClientRect().height;return f.remove(),m})(),fixedInset:(()=>{let f=document.createElement("div");f.style.cssText="position:fixed;inset:0;",document.body.append(f);let m=f.getBoundingClientRect();return f.remove(),[m.top,m.height]})(),samples:w.engine.samples.size,banks:[...w.engine.loadedBanks],bankError:window.__motifBankError||null,ms:Math.round(performance.now()-e),audioSession:"audioSession"in navigator,worklet:typeof AudioWorkletNode<"u",share:!!navigator.canShare,dvhSupported:CSS.supports("height","100dvh")};s.remove(),fetch("/__log",{method:"POST",body:JSON.stringify(l)}).catch(()=>{});let c=0,d=null;w.on("pos",f=>{d=f,f.trig&&(c+=f.trig.length/4)});let h=Date.now(),v=setInterval(()=>{let f=w.engine.ctx,m={kind:"state",t:Math.round((Date.now()-h)/1e3),ctx:f?f.state:"none",sr:f?f.sampleRate:0,base:f?f.baseLatency:0,out:f&&f.outputLatency,time:f?+f.currentTime.toFixed(2):0,playing:w.ui.playing,armed:w.ui.armed,trig:c,view:w.ui.view,part:w.ui.part,preset:w.presetFor(w.ui.part==="drum"?"d0":w.ui.part).id,notes:w.pattern.lead.notes.length+w.pattern.bass.notes.length+w.pattern.drum.reduce((p,b)=>p+b.hits.length,0),standalone:matchMedia("(display-mode: standalone)").matches,h:innerHeight,master:d&&d.m?+d.m.master.toFixed(3):0};fetch("/__log",{method:"POST",body:JSON.stringify(m)}).catch(()=>{}),Date.now()-h>12e4&&clearInterval(v)},2e3)}Qr().catch(r=>{console.error(r),document.getElementById("app").textContent="Erreur au d\xE9marrage : "+r.message});export{ti as choosePreset,Be as toast};
