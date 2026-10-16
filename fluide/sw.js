// MOTIF service worker. App shell cache is versioned; sound banks live in their own cache
// keyed by file content, so updates never re-download unchanged sounds.
// Several MOTIF versions can live on one site (/motif/ and /motif/fluide/): caches are named after
// the scope, and this worker only answers for its own files, never for another version's pages.
const VERSION = '43b08cdbd7';
const SCOPE = self.registration.scope;
const TAG = new URL(SCOPE).pathname.replace(/[^a-z0-9]+/gi, '-');
const SHELL = `motif3${TAG}shell-${VERSION}`;
const BANKS = `motif3${TAG}banks-v1`;
const LEGACY_BANKS = 'motif3-banks-v1'; // MOTIF 3.0
const SHELL_FILES = ["./","index.html","app.js","worklet.js","export-worker.js","styles.css","manifest.webmanifest","icons/icon.svg","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png"];
const BANK_FILES = [{"url":"banks/balafon/C4.flac","hash":"e1c41d0568fd934e"},{"url":"banks/balafon/C5.flac","hash":"8e5748cd86aefe59"},{"url":"banks/balafon/F3.flac","hash":"0ca3a6fc32b5e88e"},{"url":"banks/balafon/F4.flac","hash":"8459b46e9d3a7e3d"},{"url":"banks/balafon/bank.json","hash":"f05f3ab854eb4c37"},{"url":"banks/chimes/A4.flac","hash":"aeaf7dd06832dd43"},{"url":"banks/chimes/C3.flac","hash":"571bdecb9bed814c"},{"url":"banks/chimes/C4.flac","hash":"e445784d8698ad34"},{"url":"banks/chimes/C5.flac","hash":"d1fbb364cc83b5ce"},{"url":"banks/chimes/C6.flac","hash":"1e4ff6a30a7ffad8"},{"url":"banks/chimes/bank.json","hash":"cb736c4d3275bb9f"},{"url":"banks/clavi/C2.flac","hash":"e2b9e70a1b49570d"},{"url":"banks/clavi/C3.flac","hash":"d91ff060e22805fe"},{"url":"banks/clavi/C4.flac","hash":"1206a2e508bf964c"},{"url":"banks/clavi/C5.flac","hash":"7a14f91a47e94437"},{"url":"banks/clavi/bank.json","hash":"6bb808a2ca7d46b2"},{"url":"banks/dantranh/B2.flac","hash":"68bff496f13d470f"},{"url":"banks/dantranh/Cs4.flac","hash":"ef8c9585309f6d54"},{"url":"banks/dantranh/Ds2.flac","hash":"009d200e283a4bd4"},{"url":"banks/dantranh/Fs3.flac","hash":"9c18043da639b66d"},{"url":"banks/dantranh/Gs4.flac","hash":"77d81efaa5e4b25c"},{"url":"banks/dantranh/bank.json","hash":"a51b30ed064f91c2"},{"url":"banks/drums/bank.json","hash":"559275c23a2bdc62"},{"url":"banks/drums/vcsl-anvil.flac","hash":"21e77b6e33d711f9"},{"url":"banks/drums/vcsl-bassdrum.flac","hash":"b09749fa6dd695ce"},{"url":"banks/drums/vcsl-brake-1.flac","hash":"78d6e72be3d2c2fe"},{"url":"banks/drums/vcsl-brake-2.flac","hash":"e867677acca24c0e"},{"url":"banks/drums/vcsl-cajon-bass.flac","hash":"37c1d2a1f4820548"},{"url":"banks/drums/vcsl-cajon-mid.flac","hash":"ad9275195ba1e191"},{"url":"banks/drums/vcsl-cajon-slap.flac","hash":"91487d2e94998a2a"},{"url":"banks/drums/vcsl-clap-1.flac","hash":"45b241328a9d8b9b"},{"url":"banks/drums/vcsl-clap-2.flac","hash":"f3088174175911ee"},{"url":"banks/drums/vcsl-clap-3.flac","hash":"199b9fbd7994bf53"},{"url":"banks/drums/vcsl-darbuka-1.flac","hash":"ea0806a9db233fd9"},{"url":"banks/drums/vcsl-darbuka-2.flac","hash":"d74dba00634188c1"},{"url":"banks/drums/vcsl-darbuka-3.flac","hash":"dabd59aa0ec90ab9"},{"url":"banks/drums/vcsl-darbuka-4.flac","hash":"2fc220a05fab5882"},{"url":"banks/drums/vcsl-darbuka-5.flac","hash":"8d5d2ff91beff144"},{"url":"banks/drums/vcsl-fingercym.flac","hash":"6a9a9836c0d8eaba"},{"url":"banks/drums/vcsl-frame-hi.flac","hash":"07b7e86f8bb6517a"},{"url":"banks/drums/vcsl-frame-lo.flac","hash":"a152a1cb63b8fbed"},{"url":"banks/drums/vcsl-frame-mute.flac","hash":"4add333a2e3e89f7"},{"url":"banks/drums/vcsl-hh-closed.flac","hash":"b6b7b07141ff8631"},{"url":"banks/drums/vcsl-hh-loose.flac","hash":"6e3b67f90129996e"},{"url":"banks/drums/vcsl-hh-open.flac","hash":"2a2717d49d0d4c7a"},{"url":"banks/drums/vcsl-slit-hi.flac","hash":"7fd75f870c8112fa"},{"url":"banks/drums/vcsl-slit-lo.flac","hash":"30712cb089a297b5"},{"url":"banks/drums/vcsl-soloclap-2.flac","hash":"10f2f637fd8c53c0"},{"url":"banks/drums/vcsl-soloclap-3.flac","hash":"a572650ed5af1167"},{"url":"banks/drums/vd-agogo-hi.flac","hash":"68a4d4adbacddbe6"},{"url":"banks/drums/vd-agogo-lo.flac","hash":"953ce945255c02c6"},{"url":"banks/drums/vd-bell-2-1.wav","hash":"bc6a73d1d4069ca1"},{"url":"banks/drums/vd-bongo-hi-1.flac","hash":"fbafbcf2efafa9dc"},{"url":"banks/drums/vd-bongo-hi-2.flac","hash":"88abd06f60c13caf"},{"url":"banks/drums/vd-bongo-lo.flac","hash":"903a3ffcb63cc545"},{"url":"banks/drums/vd-buzz-12.flac","hash":"7e71f786242fdcb5"},{"url":"banks/drums/vd-buzz-6.flac","hash":"2a9a76046c3c2bf5"},{"url":"banks/drums/vd-cabasa.flac","hash":"1abcaa3151564ebe"},{"url":"banks/drums/vd-claves-1.flac","hash":"0f69efa0221180d3"},{"url":"banks/drums/vd-claves-2.flac","hash":"ed1fa3b37b2a4145"},{"url":"banks/drums/vd-conga-mute.flac","hash":"6fbc7ad7cd28dbdf"},{"url":"banks/drums/vd-conga-open-hi.flac","hash":"687a9775e6c5cce5"},{"url":"banks/drums/vd-conga-open-lo.flac","hash":"8b359a486345e743"},{"url":"banks/drums/vd-cowbell-1.flac","hash":"98d8c983c9379e73"},{"url":"banks/drums/vd-cowbell-2.flac","hash":"35545fa88effa35d"},{"url":"banks/drums/vd-crash-2-1.flac","hash":"6a66821484d55ad7"},{"url":"banks/drums/vd-cuica-1.flac","hash":"a895e35a1ad9192b"},{"url":"banks/drums/vd-cuica-2.flac","hash":"d245cda2a56f38cc"},{"url":"banks/drums/vd-guiro.flac","hash":"a5f21b0018b3c171"},{"url":"banks/drums/vd-hh-closed-2-1.wav","hash":"ed609886b6374752"},{"url":"banks/drums/vd-hh-closed-2-2.wav","hash":"5adf25af6b859d59"},{"url":"banks/drums/vd-hh-closed-4-1.wav","hash":"7ec916490a07a100"},{"url":"banks/drums/vd-hh-closed-4-2.wav","hash":"aede52c8396265bc"},{"url":"banks/drums/vd-hh-half-3.flac","hash":"8566c75ca51b50c7"},{"url":"banks/drums/vd-hh-open-3.wav","hash":"d610ede7d60934b2"},{"url":"banks/drums/vd-htom-14.flac","hash":"a4b7b71687831ac0"},{"url":"banks/drums/vd-htom-8.flac","hash":"eed76a20dfdbaac1"},{"url":"banks/drums/vd-kick-2-1.flac","hash":"fa0d17315d5c984b"},{"url":"banks/drums/vd-kick-3-1.flac","hash":"bcf79d380217902a"},{"url":"banks/drums/vd-kick-4-1.flac","hash":"306e605f05d888e7"},{"url":"banks/drums/vd-kick-4-2.flac","hash":"0b6c3674051369f9"},{"url":"banks/drums/vd-kick-lofi-3.flac","hash":"dfb6efd63180a048"},{"url":"banks/drums/vd-ltom-14.flac","hash":"dd508bdd2656f436"},{"url":"banks/drums/vd-ltom-8.flac","hash":"c5b2c06d28626cdf"},{"url":"banks/drums/vd-ride-2-1.wav","hash":"feeaddde8c83df50"},{"url":"banks/drums/vd-ride-3-1.wav","hash":"db79995997616e74"},{"url":"banks/drums/vd-shaker-d.flac","hash":"3c8b096c19d77cbc"},{"url":"banks/drums/vd-shaker-u.flac","hash":"492e46f3781d9249"},{"url":"banks/drums/vd-sizzle-2-1.flac","hash":"8e4e178eda121acb"},{"url":"banks/drums/vd-snare-16.flac","hash":"a0ca7addc007be08"},{"url":"banks/drums/vd-snare-24.flac","hash":"1493deaf1c1a1543"},{"url":"banks/drums/vd-snare-32.flac","hash":"ca6f2f04aebbd914"},{"url":"banks/drums/vd-snare-36.flac","hash":"c1ce7e1d66a932b5"},{"url":"banks/drums/vd-snare-8.flac","hash":"ae006a945727a7ee"},{"url":"banks/drums/vd-snoff-12.flac","hash":"81de2f5a0f46b1ff"},{"url":"banks/drums/vd-snoff-6.flac","hash":"0ab37edf992e9539"},{"url":"banks/drums/vd-tamb-1.flac","hash":"935a836d737b7db9"},{"url":"banks/drums/vd-tamb-2.flac","hash":"db69a1c3402d035c"},{"url":"banks/drums/vd-timbale-hi.flac","hash":"d0554738e3855964"},{"url":"banks/drums/vd-timbale-lo.flac","hash":"da9f78a757d54fea"},{"url":"banks/drums/vd-tri-mute.flac","hash":"8ab394d92fe5f277"},{"url":"banks/drums/vd-tri-open.flac","hash":"66dc9f4712b67178"},{"url":"banks/drums/vd-tumba.flac","hash":"92517b7b6ce3ae3b"},{"url":"banks/drums/vd-vibraslap.flac","hash":"54d60216a78660ca"},{"url":"banks/drums/vd-woodblock-hi.flac","hash":"555cc6519f60b8ef"},{"url":"banks/drums/vd-woodblock-lo.flac","hash":"f0d204e4a28b0daa"},{"url":"banks/drums/vd-xstick-12.flac","hash":"8ea0e95196520d60"},{"url":"banks/drums/vd-xstick-16.flac","hash":"41feaca96a35838f"},{"url":"banks/drums/vd-xstick-6.flac","hash":"b3a9b632df35f534"},{"url":"banks/fmpiano/C1.flac","hash":"052f4c2c2a9283e3"},{"url":"banks/fmpiano/C2.flac","hash":"b3111d81e1ab4057"},{"url":"banks/fmpiano/C3.flac","hash":"c0cbc91b55d2b007"},{"url":"banks/fmpiano/C4.flac","hash":"7b9790c6d3540075"},{"url":"banks/fmpiano/C5.flac","hash":"d7b51b4853b1192e"},{"url":"banks/fmpiano/C6.flac","hash":"a28fef9254a12a48"},{"url":"banks/fmpiano/bank.json","hash":"177a169f450ef81b"},{"url":"banks/glock/C5.flac","hash":"aac87d38299a0dd8"},{"url":"banks/glock/C6.flac","hash":"d98ff2beeb846586"},{"url":"banks/glock/G4.flac","hash":"04b2c3ceb6d34fb9"},{"url":"banks/glock/G5.flac","hash":"664be6b59da45293"},{"url":"banks/glock/G6.flac","hash":"6f8deb92d750b86f"},{"url":"banks/glock/bank.json","hash":"c552752b735c3f08"},{"url":"banks/harmonica/C3.flac","hash":"77c494d517e56807"},{"url":"banks/harmonica/C4.flac","hash":"f30c9b61ee6d8cd5"},{"url":"banks/harmonica/C5.flac","hash":"f013c8fafc8412c2"},{"url":"banks/harmonica/E3.flac","hash":"43a47b20749da863"},{"url":"banks/harmonica/G4.flac","hash":"a46881a89e1dffa7"},{"url":"banks/harmonica/G5.flac","hash":"89bcc1e394cd12f2"},{"url":"banks/harmonica/bank.json","hash":"6801d8114360ea82"},{"url":"banks/harp/A2.flac","hash":"65ad7f04468cf8a1"},{"url":"banks/harp/A4.flac","hash":"5d500a699a5facb0"},{"url":"banks/harp/B1.flac","hash":"af8a1260b5e2f80c"},{"url":"banks/harp/B3.flac","hash":"7498c2c4061aef9b"},{"url":"banks/harp/B5.flac","hash":"bea1dce01d804ef3"},{"url":"banks/harp/bank.json","hash":"9bd781eaacb61e61"},{"url":"banks/kalimba/A4.flac","hash":"9fe8a1cc2780d34b"},{"url":"banks/kalimba/B2.flac","hash":"6c73bbb299892f92"},{"url":"banks/kalimba/B3.flac","hash":"cfefe4ada7754a94"},{"url":"banks/kalimba/Ds4.flac","hash":"1b0960dbe8a7f588"},{"url":"banks/kalimba/Fs3.flac","hash":"bd4f1b9b9ab0847a"},{"url":"banks/kalimba/bank.json","hash":"be27f573ac550d48"},{"url":"banks/marimba/C2.flac","hash":"de3e5bb7490c89a8"},{"url":"banks/marimba/C4.flac","hash":"c3a47441b85991d7"},{"url":"banks/marimba/C6.flac","hash":"7024fdbcb92474db"},{"url":"banks/marimba/F3.flac","hash":"42545e9e9bd57107"},{"url":"banks/marimba/F5.flac","hash":"cb0241d0a338a63a"},{"url":"banks/marimba/G2.flac","hash":"eba8db43ff11bb14"},{"url":"banks/marimba/G4.flac","hash":"dbe9083aa5243b4c"},{"url":"banks/marimba/bank.json","hash":"37df647920ef7adf"},{"url":"banks/ocarina/A3.flac","hash":"c161d82b0414b123"},{"url":"banks/ocarina/Cs5.flac","hash":"8574411d39d9d91f"},{"url":"banks/ocarina/D4.flac","hash":"dfb87a6fd81222f9"},{"url":"banks/ocarina/Gs4.flac","hash":"05fdb6c61ff4a37b"},{"url":"banks/ocarina/bank.json","hash":"c732f512770e9459"},{"url":"banks/piano/C2.flac","hash":"4553776b9593cd9d"},{"url":"banks/piano/C3.flac","hash":"18d7948d4c84dbb1"},{"url":"banks/piano/C4.flac","hash":"6bbda02bb9f48236"},{"url":"banks/piano/C5.flac","hash":"a5c46d922381ba33"},{"url":"banks/piano/C6.flac","hash":"497639fd9e771595"},{"url":"banks/piano/G2.flac","hash":"466c4d1e7a1a30ff"},{"url":"banks/piano/G3.flac","hash":"d7b647ad02c01bc2"},{"url":"banks/piano/G4.flac","hash":"a5ff8f023ba11939"},{"url":"banks/piano/G5.flac","hash":"9e2d558655e19a65"},{"url":"banks/piano/bank.json","hash":"a838aad5fe1168d0"},{"url":"banks/sax/As2.flac","hash":"54971b7fef240bf7"},{"url":"banks/sax/As3.flac","hash":"8d9273b563818727"},{"url":"banks/sax/As4.flac","hash":"bc9fc0d575c18732"},{"url":"banks/sax/C2.flac","hash":"bbe573fe9db37364"},{"url":"banks/sax/C3.flac","hash":"1a5ea2586ae23e9f"},{"url":"banks/sax/C4.flac","hash":"e6c1e87c55f1d10b"},{"url":"banks/sax/bank.json","hash":"012b90b309e63f33"},{"url":"banks/sets.json","hash":"12214687d53d0e50"},{"url":"banks/vibes/A4.flac","hash":"9ead52c3dd51cb6a"},{"url":"banks/vibes/C3.flac","hash":"506b2639310692b0"},{"url":"banks/vibes/D4.flac","hash":"07138b402e855fcb"},{"url":"banks/vibes/E5.flac","hash":"3649f46ebd105d22"},{"url":"banks/vibes/F2.flac","hash":"3091ad4f0214ca33"},{"url":"banks/vibes/G3.flac","hash":"d9cc619baf949e98"},{"url":"banks/vibes/bank.json","hash":"9d141cdc2b383e0a"}]; // [{url, hash}]
const HASH = new Map(BANK_FILES.map((f) => [new URL(f.url, SCOPE).href, f.hash]));
const OWN = new Set(SHELL_FILES.map((u) => new URL(u, SCOPE).href));

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    await c.addAll(SHELL_FILES.map((u) => new Request(u, { cache: 'reload' })));
    // drum bank is small and used by every project: precache it too
    const b = await caches.open(BANKS);
    for (const f of BANK_FILES.filter((x) => x.url.startsWith('banks/drums/'))) {
      await putBank(b, f).catch(() => {});
    }
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) {
      if (k.startsWith(`motif3${TAG}shell-`) && k !== SHELL) await caches.delete(k);
      if (k !== SHELL && /^motif3-shell-[0-9a-f]+$/.test(k)) await caches.delete(k); // MOTIF 3.0 shell
    }
    const b = await caches.open(BANKS);
    const wanted = new Set(BANK_FILES.map((f) => new URL(f.url, SCOPE).href));
    // sounds cached by MOTIF 3.0 under this scope move over instead of downloading again
    if (BANKS !== LEGACY_BANKS && await caches.has(LEGACY_BANKS)) {
      const old = await caches.open(LEGACY_BANKS);
      for (const req of await old.keys()) {
        if (!req.url.startsWith(SCOPE)) continue;
        if (wanted.has(req.url)) { const r = await old.match(req); if (r) await b.put(req.url, r); }
        await old.delete(req);
      }
      if (!(await old.keys()).length) await caches.delete(LEGACY_BANKS);
    }
    // drop bank files that are no longer part of the app
    for (const req of await b.keys()) if (!wanted.has(req.url)) await b.delete(req);
    await self.clients.claim();
  })());
});

self.addEventListener('message', (e) => {
  const m = e.data || {};
  if (m.type === 'skipWaiting') self.skipWaiting();
  if (m.type === 'status') status().then((text) => e.source && e.source.postMessage({ type: 'status', text }));
  if (m.type === 'cacheAll') cacheAll(e.ports[0]);
});

async function putBank(b, f) {
  const key = new URL(f.url, SCOPE).href;
  const hit = await b.match(key);
  if (hit && hit.headers.get('x-motif-hash') === f.hash) return;
  const r = await fetch(new Request(key, { cache: 'reload' }));
  if (!r.ok) throw new Error(f.url + ' ' + r.status);
  const body = await r.arrayBuffer();
  await b.put(key, new Response(body, { headers: { 'content-type': r.headers.get('content-type') || 'application/octet-stream', 'x-motif-hash': f.hash } }));
}

async function status() {
  const shell = await caches.open(SHELL);
  const keys = await shell.keys();
  const b = await caches.open(BANKS);
  const bk = await b.keys();
  const shellOk = keys.length >= SHELL_FILES.length;
  const total = BANK_FILES.length;
  let fresh = 0; for (const r of bk) { const hit = await b.match(r); if (hit && hit.headers.get('x-motif-hash') === HASH.get(r.url)) fresh++; }
  if (!shellOk) return 'Installation hors ligne en cours…';
  if (fresh >= total) return 'Prêt hors ligne : application et tous les sons.';
  return `Prêt hors ligne pour l’application et la batterie. Sons en cache : ${fresh}/${total} fichiers (ils se mettent en cache quand tu les utilises).`;
}

async function cacheAll(port) {
  try {
    const b = await caches.open(BANKS);
    let i = 0;
    for (const f of BANK_FILES) {
      await putBank(b, f);
      i++; port.postMessage({ type: 'progress', value: i / BANK_FILES.length });
    }
    port.postMessage({ type: 'done' });
  } catch (err) { port.postMessage({ type: 'error', message: String(err.message || err) }); }
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const path = url.pathname.slice(new URL(SCOPE).pathname.length);
  const bare = url.origin + url.pathname;
  const isShell = req.mode === 'navigate' ? (path === '' || path === 'index.html') : OWN.has(bare);
  if (!path.startsWith('banks/') && !isShell) return; // not ours (e.g. another version in a sub-folder)
  if (path.startsWith('banks/')) {
    // cache-first, stored on first use; the content hash decides when a cached copy is stale
    e.respondWith((async () => {
      const b = await caches.open(BANKS);
      const key = new URL(path, SCOPE).href;
      const want = HASH.get(key) || '';
      const hit = await b.match(key);
      if (hit && hit.headers.get('x-motif-hash') === want) return hit;
      const r = await fetch(new Request(key, { cache: 'no-cache' }));
      if (r.ok) {
        const body = await r.clone().arrayBuffer();
        b.put(key, new Response(body, { headers: { 'content-type': r.headers.get('content-type') || 'application/octet-stream', 'x-motif-hash': want } }));
      }
      return r;
    })());
    return;
  }
  e.respondWith((async () => {
    const c = await caches.open(SHELL);
    // navigation: serve the cached shell (offline-first), refresh in the background
    if (req.mode === 'navigate') {
      const cached = await c.match('index.html');
      if (cached) return cached;
      return fetch(req);
    }
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try { return await fetch(req); } catch { return new Response('', { status: 504 }); }
  })());
});
