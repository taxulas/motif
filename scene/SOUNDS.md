# MOTIF 3 — sons, sources et licences

Généré par `tools/gen-sounds-doc.mjs`. 180 instruments, six familles, chacune avec 20 instruments de base et 10 instruments liés à une scène.

## Ce qui est original, ce qui est enregistré

- **Synthèse originale** : tous les moteurs (analogique virtuel, tables d’ondes, FM, formants, corde physique, résonateurs, batterie synthétique) et les 12 tables d’ondes sont écrits pour MOTIF (`src/core`). Aucune table ni preset tiers n’est importé.
- **Enregistrements intégrés** : uniquement des prises sous licence **CC0 1.0** (domaine public), qui autorise la redistribution dans une application :
  - Virtuosity Drums (Versilian Studios & Karoryfer) — https://github.com/sfzinstruments/virtuosity_drums — commit `9f04cf9a7345` — CC0-1.0
  - Versilian Community Sample Library (VCSL) — https://github.com/sgossner/VCSL — commit `c1ea7bcc3c73` — CC0-1.0
- **Transformations** : conversion mono (mélange de micros pour la batterie), découpe à l’attaque, longueur limitée, fondu de fin, normalisation par groupe, boucle de sustain à fondu enchaîné pour les vents, encodage FLAC 16 bits (ou WAV 16 bits quand le décodeur Apple n’arrive pas à relire le FLAC). Le détail fichier par fichier (chemin d’origine, commit, gains, empreinte SHA-256) est dans `banks/*/bank.json`.
- **Non utilisés** : les banques commerciales (Splice, packs payants…) — leurs licences autorisent l’usage dans un morceau, pas la redistribution comme instrument. Les Adventure Kid Waveforms (dépôt officiel en CC0-1.0) ont été évaluées ; MOTIF utilise finalement ses propres tables.
- Aucun enregistrement personnel n’est inclus.

## Banques

| Banque | Contenu | Fichiers | Taille |
|---|---|---|---|
| drums | batterie Virtuosity Drums + percussions VCSL/Virtuosity | 86 | 4.30 Mo |
| piano | Piano droit (VCSL) | 9 | 0.52 Mo |
| fmpiano | Piano FM TX81Z (VCSL) | 6 | 0.71 Mo |
| clavi | Clavisynth TX81Z (VCSL) | 4 | 0.29 Mo |
| marimba | Marimba (VCSL) | 7 | 0.18 Mo |
| vibes | Vibraphone (VCSL) | 6 | 0.41 Mo |
| kalimba | Kalimba (VCSL) | 5 | 0.31 Mo |
| harp | Harpe de concert (VCSL) | 5 | 0.33 Mo |
| balafon | Balafon (VCSL) | 4 | 0.08 Mo |
| glock | Glockenspiel (VCSL) | 5 | 0.30 Mo |
| sax | Saxophone ténor (VCSL) | 6 | 0.69 Mo |
| harmonica | Harmonica (VCSL) | 6 | 0.85 Mo |
| ocarina | Ocarina (VCSL) | 4 | 0.27 Mo |
| chimes | Cloches à main (VCSL) | 5 | 0.35 Mo |
| dantranh | Đàn tranh (VCSL) | 5 | 0.26 Mo |

La banque de batterie est mise en cache à l’installation ; les autres se chargent quand l’instrument est choisi (ou toutes d’un coup : menu → Hors ligne).

## Scènes

| Scène | Tempo de départ | Kit | Basse | Mélodie |
|---|---|---|---|---|
| Phonk BR · montagem | 130 | Phonk BR | 808montagem | sino |
| UK garage | 134 | UK garage | speedgarage | stabgarage |
| Afro house | 122 | Afro house | afrorond | balafon |
| Amapiano | 112 | Amapiano | logdrum | keys |
| Reggaeton nouvelle vague | 96 | Perreo | subperreo | perreo |
| Jersey club | 142 | Jersey club | bounce | stabjersey |
| Drum & bass | 174 | Drum & bass | turbine | liquide |
| Rage · trap | 150 | Rage | 808rage | rage |
| Hard techno | 152 | Hard techno | acidedur | hurleur |
| Trip-hop atmosphérique | 86 | Trip-hop | ronde | brume |

Ce sont des **directions de production**, pas un classement des dix genres les plus écoutés. Signaux consultés : rapport Splice × MIDiA « Sounds of 2026 » (afro house +778 % de téléchargements, speed garage +625 %, phonk +265 %, hard techno / jump-up / hard dance en hausse à trois chiffres) ; la sélection initiale et ses autres sources (Beatport mi-2026, SoundCloud 2026, Spotify) viennent de la recherche faite pour la version 2.3 et n’ont pas toutes été revérifiées une à une ici. Aucun son ne copie un morceau ou un artiste.

## Catalogue

### Kick (30)

| Nom | Scène | Source | Gestes (puck / pad) | Niveau mesuré |
|---|---|---|---|---|
| Rond | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -17.0 LUFS |
| Club | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Profond | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.3 LUFS |
| 808 long | base | kick synthétique | Glisse / Queue · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Feutré | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -17.1 LUFS |
| Acoustique | base | kick synthétique + prise CC0 | Peau ↔ Sub / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Sec | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -18.5 LUFS |
| Grosse caisse | base | kick synthétique + prise CC0 | Ampleur / Accord · pad ↕ Couleur · zones Court, Normal, Long | -15.9 LUFS |
| Saturé | base | kick synthétique | Saturation / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.1 LUFS |
| Rebond | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.2 LUFS |
| Sub | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.3 LUFS |
| Clic | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -17.5 LUFS |
| Vinyle | base | kick synthétique + prise CC0 | Usure / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Neuf-zéro | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -17.2 LUFS |
| Boom | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Papier | base | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -18.3 LUFS |
| Plié | base | kick synthétique | Pli / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Cajón | base | prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Basse, Milieu, Claque | -16.0 LUFS |
| Tambour sur cadre | base | prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Ouvert, Étouffé, Petit | -16.0 LUFS |
| Tom grave | base | kick synthétique + prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Montagem | Phonk BR | kick synthétique | Écrêtage / Queue · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Garage | UKG | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.7 LUFS |
| Afro profond | Afro | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.1 LUFS |
| Piano feutre | Amapiano | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -18.1 LUFS |
| Perreo | Perreo | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Jersey | Jersey | kick synthétique | Frappe / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Break | DnB | kick synthétique + prise CC0 | Peau ↔ Sub / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| 808 rage | Rage | kick synthétique | Saturation / Queue · pad ↕ Couleur · zones Court, Normal, Long | -16.0 LUFS |
| Rumble | Hard | kick synthétique | Rumble / Dureté · pad ↕ Couleur · zones Court, Normal, Long | -15.8 LUFS |
| Poussière | Trip-hop | kick synthétique + prise CC0 | Usure / Longueur · pad ↕ Couleur · zones Court, Normal, Long | -16.2 LUFS |

### Snare · clap (30)

| Nom | Scène | Source | Gestes (puck / pad) | Niveau mesuré |
|---|---|---|---|---|
| Classique | base | caisse claire synthétique | Corps / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Clap 808 | base | clap synthétique | Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -18.0 LUFS |
| Rimshot | base | percussion modale | Accord / Résonance · pad ↕ Frappe · zones Fantôme, Normal, Ouvert | -23.7 LUFS |
| Acoustique | base | prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Cross-stick, Centre, Buzz | -18.0 LUFS |
| Sans timbre | base | prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Grave, Normal, Aigu | -18.0 LUFS |
| Fantôme | base | caisse claire synthétique | Corps / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -20.2 LUFS |
| Crépitant | base | caisse claire synthétique | Corps / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Clap serré | base | clap synthétique | Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -18.9 LUFS |
| Clap large | base | clap synthétique | Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -18.0 LUFS |
| Claquement | base | clap synthétique | Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -19.7 LUFS |
| Mains | base | prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Seul, Groupe, Salle | -17.9 LUFS |
| Lo-fi | base | caisse claire synthétique | Usure / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.2 LUFS |
| Métal | base | caisse claire synthétique | Résonance / Accord · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Tom-caisse | base | caisse claire synthétique | Corps / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Balai | base | caisse claire synthétique | Geste / Brillance · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Électro | base | caisse claire synthétique | Corps / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Caisse + clap | base | caisse claire synthétique + prise CC0 | Caisse ↔ Clap / Queue · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Ressort | base | caisse claire synthétique | Corps / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Roulement | base | prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Cross-stick | base | prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Clap montagem | Phonk BR | clap synthétique | Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -18.0 LUFS |
| Garage snare | UKG | caisse claire synthétique + prise CC0 | Corps / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Clap afro | Afro | clap synthétique | Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -18.0 LUFS |
| Rim piano | Amapiano | percussion modale + prise CC0 | Accord / Bois ↔ Baguette · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Snare dembow | Perreo | caisse claire synthétique | Corps / Grain · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Clap jersey | Jersey | clap synthétique + prise CC0 | Synthé ↔ Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -18.0 LUFS |
| Snare DnB | DnB | caisse claire synthétique + prise CC0 | Crack / Corps · pad ↕ Claquant · zones Fantôme, Normal, Ouvert | -18.0 LUFS |
| Clap rage | Rage | clap synthétique | Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -18.0 LUFS |
| Clap industriel | Hard | clap synthétique | Mains / Salle · pad ↕ Éclat · zones Serré, Normal, Large | -18.0 LUFS |
| Snare poussière | Trip-hop | prise CC0 | Accord / Longueur · pad ↕ Couleur · zones Fantôme, Normal, Ouvert | -18.0 LUFS |

### Hat (30)

| Nom | Scène | Source | Gestes (puck / pad) | Niveau mesuré |
|---|---|---|---|---|
| Analogique | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Bruit blanc | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Acoustique | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Ride | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Ride, Cloche, Forte | -24.0 LUFS |
| Crash | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Court, Crash, Rivets | -24.0 LUFS |
| Fin | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Sombre | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Brillant | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Lo-fi | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Tss | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Shaker | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Aller, Retour, Alterné | -24.0 LUFS |
| Tambourin | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Doux, Normal, Long | -24.0 LUFS |
| Triangle | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Étouffé, Ouvert, Long | -24.0 LUFS |
| Cabasa | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Doux, Normal, Long | -24.0 LUFS |
| Charleston clair | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Fermé, Lâche, Ouvert | -24.0 LUFS |
| Clochette | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.1 LUFS |
| Granuleux | base | bruit sculpté | Grain / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -23.9 LUFS |
| Stéréo | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Pichenette | base | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Court, Normal, Long | -24.0 LUFS |
| Pédale | base | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Hat drift | Phonk BR | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.1 LUFS |
| Hat garage | UKG | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Shaker afro | Afro | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Aller, Retour, Cabasa | -24.0 LUFS |
| Shaker piano | Amapiano | bruit sculpté | Geste / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Hat perreo | Perreo | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Hat jersey | Jersey | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Ride DnB | DnB | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Ride, Cloche, Ouverte | -24.0 LUFS |
| Hat trap | Rage | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Hat industriel | Hard | métal + souffle | Métal ↔ Souffle / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |
| Hat vinyle | Trip-hop | prise CC0 | Accord / Brillance · pad ↕ Longueur · zones Fermé, Mi-ouvert, Ouvert | -24.0 LUFS |

### Perc (30)

| Nom | Scène | Source | Gestes (puck / pad) | Niveau mesuré |
|---|---|---|---|---|
| Conga | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Tumba, Ouverte, Étouffée | -21.0 LUFS |
| Bongo | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Aigu, Aigu tendu | -21.0 LUFS |
| Cloche | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Médium, Aigu | -21.0 LUFS |
| Cloche 808 | base | cloche à 2 oscillateurs | Accord / Longueur · pad ↕ Couleur · zones Grave, Médium, Aigu | -21.0 LUFS |
| Agogô | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Aiguë, Aiguë tendue | -21.0 LUFS |
| Claves | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Médium, Aigu | -21.0 LUFS |
| Wood-block | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Aigu, Très aigu | -21.0 LUFS |
| Güiro | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Court, Normal, Long | -21.0 LUFS |
| Timbales | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Aiguë, Sec | -21.0 LUFS |
| Cuíca | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Aiguë, Très aiguë | -21.0 LUFS |
| Darbouka | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Centre, Bord, Claque | -20.9 LUFS |
| Cajón aigu | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Milieu, Claque, Claque sèche | -21.0 LUFS |
| Tambour à fente | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Aigu, Aigu tendu | -21.0 LUFS |
| Toms | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Basse, Haute, Haute tendue | -21.0 LUFS |
| Goutte | base | percussion modale | Accord / Résonance · pad ↕ Frappe · zones Grave, Médium, Aigu | -25.1 LUFS |
| Bois synthétique | base | percussion modale | Accord / Résonance · pad ↕ Frappe · zones Grave, Médium, Aigu | -25.2 LUFS |
| Tom 808 | base | tom modal | Accord / Résonance · pad ↕ Frappe · zones Grave, Médium, Aigu | -21.0 LUFS |
| Vibraslap | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Court, Normal, Long | -21.0 LUFS |
| Enclume | base | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Enclume, Frein 1, Frein 2 | -21.0 LUFS |
| Blip | base | percussion modale | Accord / Résonance · pad ↕ Frappe · zones Grave, Médium, Aigu | -25.4 LUFS |
| Cloche phonk | Phonk BR | cloche à 2 oscillateurs | Saturation / Longueur · pad ↕ Accord · zones Courte, Normale, Longue | -21.1 LUFS |
| Toc garage | UKG | percussion modale | Accord / Résonance · pad ↕ Frappe · zones Grave, Médium, Aigu | -29.4 LUFS |
| Peau afro | Afro | tom modal | Accord / Peau ↔ Claque · pad ↕ Frappe · zones Grave, Médium, Aigu | -21.0 LUFS |
| Log drum | Amapiano | tom modal | Glisse / Grain · pad ↕ Accord · zones Court, Normal, Long | -21.0 LUFS |
| Timbal perreo | Perreo | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Aiguë, Ouverte | -21.0 LUFS |
| Couinement | Jersey | percussion modale | Accord / Résonance · pad ↕ Frappe · zones Grave, Médium, Aigu | -23.5 LUFS |
| Tom break | DnB | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Tom basse, Tom haute, Caisse sans timbre | -21.0 LUFS |
| Laser | Rage | percussion modale | Accord / Résonance · pad ↕ Frappe · zones Grave, Médium, Aigu | -21.5 LUFS |
| Métal industriel | Hard | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Frein 1, Frein 2, Enclume | -20.9 LUFS |
| Bois feutré | Trip-hop | prise CC0 | Accord / Résonance · pad ↕ Couleur · zones Grave, Aigu, Claves | -21.0 LUFS |

### Basse (30)

| Nom | Scène | Source | Gestes (puck / pad) | Niveau mesuré |
|---|---|---|---|---|
| Sub pur | base | analogique virtuel | Chaleur : Harmoniques / Octave · Forme : Attaque / Relâche · Glisse : Glisse / Tenue · pad ↕ Grain | -15.5 LUFS |
| Moog rond | base | analogique virtuel | Filtre : Ouverture / Résonance · Enveloppe : Mordant / Déclin · Couleur : Saturation / Sub · pad ↕ Ouverture | -15.5 LUFS |
| Acide | base | analogique virtuel | Filtre : Coupure / Résonance · Accent : Enveloppe / Déclin · Grain : Distorsion / Scie ↔ Carré · pad ↕ Coupure | -15.4 LUFS |
| Reese | base | analogique virtuel | Battement : Désaccord / Mouvement · Filtre : Ouverture / Mordant · Largeur : Largeur / Sub · pad ↕ Ouverture | -15.5 LUFS |
| 808 glissée | base | analogique virtuel | Saturation : Saturation / Mordant · Glisse : Glisse / Punch · Queue : Queue / Tenue · pad ↕ Saturation | -15.5 LUFS |
| FM grave | base | FM 4 opérateurs | Brillance : Indice / Déclin · Métal : Rapport / Rétroaction · Espace : Écho / Salle · pad ↕ Indice | -15.5 LUFS |
| Pluck basse | base | analogique virtuel | Pincement : Pincement / Résonance · Corps : Longueur / Grave · Espace : Écho / Salle · pad ↕ Brillance | -17.9 LUFS |
| Orgue basse | base | tables d’ondes | Tirettes : Tirettes / Sub · Percussion : Clic / Douceur · Rotation : Rotation / Saturation · pad ↕ Tirettes | -15.5 LUFS |
| Contrebasse | base | corde physique | Corde : Tension / Résonance · Caisse : Caisse / Boisé · Doigt : Attaque / Glisse · pad ↕ Attaque | -16.8 LUFS |
| Électrique | base | analogique virtuel | Doigt : Attaque / Médiums · Ampli : Ampli / Grave · Espace : Écho / Salle · pad ↕ Brillance | -15.5 LUFS |
| Wobble | base | analogique virtuel | Oscillation : Vitesse / Profondeur · Filtre : Ouverture / Résonance · Grain : Saturation / Sub · pad ↕ Profondeur | -15.5 LUFS |
| Hoover | base | analogique virtuel | Plongée : Plongée / Pulsation · Chœur : Désaccord / Chœur · Filtre : Ouverture / Résonance · pad ↕ Ouverture | -15.5 LUFS |
| Carré | base | analogique virtuel | Forme : Largeur / Sub · Filtre : Ouverture / Mordant · Espace : Écho / Salle · pad ↕ Ouverture | -15.5 LUFS |
| Grondement | base | tables d’ondes | Gorge : Gorge / Mouvement · Filtre : Ouverture / Résonance · Grain : Saturation / Sub · pad ↕ Gorge | -15.5 LUFS |
| Doux | base | analogique virtuel | Rondeur : Ouverture / Sub · Souffle : Attaque / Chaleur · Espace : Écho / Salle · pad ↕ Ouverture | -15.5 LUFS |
| Pulse | base | analogique virtuel | Impulsion : Largeur / Modulation · Filtre : Ouverture / Mordant · Espace : Écho / Salle · pad ↕ Ouverture | -15.4 LUFS |
| Saturée | base | analogique virtuel | Distorsion : Entrée / Sortie · Filtre : Ouverture / Résonance · Grave : Sub / Largeur · pad ↕ Distorsion | -15.5 LUFS |
| Yoy | base | formants | Voyelle : Voyelle / Gorge · Mouvement : Parole / Vitesse · Grain : Saturation / Sub · pad ↕ Voyelle | -15.5 LUFS |
| Stab | base | analogique virtuel | Impact : Longueur / Épaisseur · Filtre : Ouverture / Résonance · Espace : Écho / Salle · pad ↕ Ouverture | -19.8 LUFS |
| Marimba grave | base | prise CC0 + traitement | Bois : Douceur / Attaque · Espace : Écho / Salle · Grain : Grain / Sub · pad ↕ Douceur | -15.5 LUFS |
| 808 montagem | Phonk BR | analogique virtuel | Écrêtage : Écrêtage / Mordant · Glisse : Glisse / Punch · Queue : Queue / Tenue · pad ↕ Écrêtage | -15.5 LUFS |
| Speed garage | UKG | analogique virtuel | Oscillation : Vitesse / Profondeur · Filtre : Ouverture / Résonance · Grave : Sub / Saturation · pad ↕ Ouverture | -15.4 LUFS |
| Afro rond | Afro | FM 4 opérateurs | Pincement : Pincement / Couleur · Corps : Longueur / Sub · Espace : Écho / Salle · pad ↕ Pincement | -15.5 LUFS |
| Log drum | Amapiano | résonateurs modaux | Glisse : Glisse / Vitesse · Bois : Frappe / Grain · Queue : Queue / Sub · pad ↕ Glisse | -15.5 LUFS |
| Sub perreo | Perreo | analogique virtuel | Rondeur : Présence / Chaleur · Punch : Punch / Longueur · Espace : Écho / Salle · pad ↕ Présence | -15.5 LUFS |
| Bounce | Jersey | analogique virtuel | Rebond : Rebond / Longueur · Forme : Carré / Saturation · Espace : Écho / Salle · pad ↕ Rebond | -15.5 LUFS |
| Reese turbine | DnB | analogique virtuel | Turbine : Désaccord / Rotation · Filtre : Ouverture / Mordant · Largeur : Largeur / Sub · pad ↕ Ouverture | -15.5 LUFS |
| 808 rage | Rage | analogique virtuel | Saturation : Saturation / Octave · Glisse : Glisse / Punch · Queue : Queue / Tenue · pad ↕ Saturation | -15.5 LUFS |
| Acide dur | Hard | analogique virtuel | Filtre : Coupure / Résonance · Accent : Enveloppe / Déclin · Pli : Pli / Saturation · pad ↕ Coupure | -15.5 LUFS |
| Basse ronde | Trip-hop | analogique virtuel | Rondeur : Ouverture / Chaleur · Dub : Écho / Salle · Usure : Bande / Usure · pad ↕ Ouverture | -15.6 LUFS |

### Mélodie (30)

| Nom | Scène | Source | Gestes (puck / pad) | Niveau mesuré |
|---|---|---|---|---|
| Supersaw | base | analogique virtuel | Essaim : Désaccord / Largeur · Filtre : Ouverture / Mordant · Espace : Écho / Salle · pad ↕ Ouverture | -17.5 LUFS |
| Pluck | base | analogique virtuel | Pincement : Longueur / Octave · Filtre : Brillance / Résonance · Espace : Écho / Salle · pad ↕ Brillance | -21.1 LUFS |
| Piano | base | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Rhodes FM | base | FM 4 opérateurs | Lames : Lame / Cloche · Corps : Grain / Trémolo · Espace : Écho / Salle · pad ↕ Toucher | -17.5 LUFS |
| Marimba | base | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Vibraphone | base | prise CC0 + traitement | Toucher : Douceur / Moteur · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Kalimba | base | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Cloche de verre | base | FM 4 opérateurs | Métal : Rapport / Éclat · Durée : Durée / Scintillement · Espace : Écho / Salle · pad ↕ Éclat | -17.4 LUFS |
| Orgue | base | tables d’ondes | Tirettes : Tirettes / 16 pieds · Rotation : Vitesse / Profondeur · Saturation : Saturation / Salle · pad ↕ Tirettes | -17.5 LUFS |
| Nappe chaude | base | tables d’ondes | Matière : Matière / Mouvement · Souffle : Attaque / Ouverture · Espace : Écho / Salle · pad ↕ Ouverture | -17.5 LUFS |
| Voix | base | formants | Voyelle : Voyelle / Parole · Gorge : Gorge / Vibrato · Espace : Écho / Salle · pad ↕ Voyelle | -17.4 LUFS |
| Ocarina | base | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Saxophone | base | prise CC0 + traitement | Toucher : Souffle / Vibrato · Couleur : Grain / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Harmonica | base | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Guitare pincée | base | corde physique | Corde : Attaque / Sustain · Caisse : Caisse / Chorus · Espace : Écho / Salle · pad ↕ Attaque | -17.5 LUFS |
| Harpe | base | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Chiptune | base | analogique virtuel | Onde : Largeur / Balayage · Vibrato : Vibrato / Arpège · Espace : Écho / Salle · pad ↕ Largeur | -17.5 LUFS |
| Sync | base | tables d’ondes | Synchro : Synchro / Balayage · Mouvement : Vibration / Saturation · Espace : Écho / Salle · pad ↕ Synchro | -17.5 LUFS |
| Cordes synthé | base | analogique virtuel | Archet : Attaque / Ouverture · Ensemble : Ensemble / Octave · Espace : Écho / Salle · pad ↕ Ouverture | -17.5 LUFS |
| Glockenspiel | base | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Sino montagem | Phonk BR | FM 4 opérateurs | Métal : Rapport / Éclat · Écrêtage : Écrêtage / Longueur · Espace : Écho / Salle · pad ↕ Éclat | -17.4 LUFS |
| Stab garage | UKG | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Balafon afro | Afro | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Keys amapiano | Amapiano | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |
| Pluck perreo | Perreo | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.4 LUFS |
| Stab jersey | Jersey | analogique virtuel | Impact : Longueur / Hoquet · Filtre : Brillance / Épaisseur · Espace : Écho / Salle · pad ↕ Brillance | -17.5 LUFS |
| Pad liquide | DnB | tables d’ondes | Matière : Matière / Ouverture · Marée : Marée / Attaque · Espace : Écho / Salle · pad ↕ Ouverture | -17.5 LUFS |
| Lead rage | Rage | analogique virtuel | Essaim : Désaccord / Saturation · Plongée : Plongée / Brillance · Espace : Écho / Salle · pad ↕ Brillance | -17.5 LUFS |
| Hurleur | Hard | analogique virtuel | Cri : Saturation / Hurlement · Filtre : Coupure / Résonance · Espace : Écho / Salle · pad ↕ Coupure | -17.5 LUFS |
| Cloches brumeuses | Trip-hop | prise CC0 + traitement | Toucher : Douceur / Attaque · Couleur : Chorus / Bande · Espace : Écho / Salle · pad ↕ Douceur | -17.5 LUFS |

_Niveau mesuré : phrase de référence jouée seule, avant le master, après calibrage (`tools/calibrate.mjs`). Ce sont des mesures, pas un jugement d’écoute._
