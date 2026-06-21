"use strict";

const API = "https://pokeapi.co/api/v2";
const SPRITES = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
const TOTAL = 151;

const KANTO_NAMES = [
  "Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie",
  "Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate",
  "Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran♀","Nidorina",
  "Nidoqueen","Nidoran♂","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff",
  "Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett",
  "Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag",
  "Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell",
  "Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro",
  "Magnemite","Magneton","Farfetch’d","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder",
  "Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb",
  "Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing",
  "Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu",
  "Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados",
  "Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto",
  "Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"
];

const DEDICATION_MAX_LENGTH = 360;
const APP_LANG = getAppLanguage();
const TYPE_KEYS = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel"];
const TYPE_SHORT = {
  it: { normal: "NOR", fire: "FUO", water: "ACQ", electric: "ELE", grass: "ERB", ice: "GHI", fighting: "LOT", poison: "VEL", ground: "TER", flying: "VOL", psychic: "PSI", bug: "COL", rock: "ROC", ghost: "SPE", dragon: "DRA", dark: "BUI", steel: "ACC" },
  en: { normal: "NOR", fire: "FIR", water: "WAT", electric: "ELE", grass: "GRA", ice: "ICE", fighting: "FIG", poison: "POI", ground: "GRO", flying: "FLY", psychic: "PSY", bug: "BUG", rock: "ROC", ghost: "GHO", dragon: "DRA", dark: "DAR", steel: "STE" }
};
const TYPE_LABELS = {
  it: { normal: "NORMALE", fire: "FUOCO", water: "ACQUA", electric: "ELETTRO", grass: "ERBA", ice: "GHIACCIO", fighting: "LOTTA", poison: "VELENO", ground: "TERRA", flying: "VOLANTE", psychic: "PSICO", bug: "COLEOTTERO", rock: "ROCCIA", ghost: "SPETTRO", dragon: "DRAGO", dark: "BUIO", steel: "ACCIAIO" },
  en: { normal: "NORMAL", fire: "FIRE", water: "WATER", electric: "ELECTRIC", grass: "GRASS", ice: "ICE", fighting: "FIGHTING", poison: "POISON", ground: "GROUND", flying: "FLYING", psychic: "PSYCHIC", bug: "BUG", rock: "ROCK", ghost: "GHOST", dragon: "DRAGON", dark: "DARK", steel: "STEEL" }
};
const STAT_LABELS = {
  it: { hp: "PS", attack: "ATTACCO", defense: "DIFESA", "special-attack": "ATT. SPEC", "special-defense": "DIF. SPEC", speed: "VELOCITÀ" },
  en: { hp: "HP", attack: "ATTACK", defense: "DEFENSE", "special-attack": "SP. ATK", "special-defense": "SP. DEF", speed: "SPEED" }
};
const TYPES = TYPE_KEYS.map(type => [type, typeShort(type)]);

const I18N = {
  it: {
    docTitle: "Pokédex Rosso Fuoco",
    metaDescription: "Un Pokédex fan-made in stile Pokémon Rosso Fuoco, rapido e pensato per smartphone.",
    fireRed: "ROSSOFUOCO",
    headline: "Il Pokédex di sempre.<br />Ora sul tuo telefono.",
    intro: "Rivivi l’atmosfera di Kanto con un Pokédex ispirato a Rosso Fuoco: essenziale, rapido e sempre a portata di mano.",
    features: ["151 Pokémon di Kanto", "Schede in stile Game Boy Advance", "Ricerca, filtri e statistiche", "Preferiti e catturati salvati sul dispositivo"],
    openDex: "APRI IL POKÉDEX",
    fanNote: "Progetto fan-made, non ufficiale e senza pubblicità.",
    menu: "Apri filtri", letterAria: "Lascia una dedica nostalgica", seen: "VISTI", caught: "PRESI", favorites: "FAVORITI", visitorsToday: "VISITE OGGI",
    searchPlaceholder: "Nome o numero…", searchAria: "Cerca Pokémon per nome o numero", filters: "FILTRI", all: "TUTTI", favoriteFilter: "PREFERITI", caughtFilter: "CATTURATI", filterByType: "FILTRA PER TIPO",
    loadingDatabase: "CARICAMENTO DATABASE…", searchAction: "CERCA", install: "INSTALLA", backToDex: "Torna al Pokédex", cry: "Ascolta il verso", info: "INFO", stats: "STAT", moves: "MOSSE", descriptionShort: "DESCR", previous: "PREC.", caughtButton: "PRESO", caughtButtonDone: "PRESO ✓", savedButton: "SALVATO", saveButton: "SALVA", next: "SUCC.",
    letterMail: "POSTA ALLENATORI", letterTitle: "LASCIA UNA DEDICA", close: "Chiudi", letterIntro: "Scrivi un ricordo, una frase o una dedica legata al tuo viaggio nel mondo Pokémon. La leggerà il creatore del progetto.", nickname: "NOME O NICKNAME", optional: "FACOLTATIVO", nicknamePlaceholder: "Es. Allenatore Rosso", dedication: "LA TUA DEDICA", dedicationPlaceholder: "Quel giorno in cui ho scelto il mio primo Pokémon…", sendLetter: "SPEDISCI LA LETTERA",
    footer: "Dati forniti da PokéAPI. Pokémon e i relativi nomi e immagini appartengono ai rispettivi titolari. Questo progetto è un tributo fan-made non affiliato a Nintendo, Game Freak o The Pokémon Company.",
    localMode: "MODALITÀ LOCALE: DATI BASE DISPONIBILI", noPokemon: "NESSUN POKÉMON TROVATO.<br>PROVA UN ALTRO FILTRO.", results: "RISULTATI", scanType: "SCANSIONE TIPO", filterOffline: "Filtro non disponibile senza connessione", scanning: "SCANSIONE IN CORSO…", signalMissing: "SEGNALE POKÉDEX ASSENTE", detailError: "Non riesco a recuperare la scheda completa. Controlla la connessione e riprova.", retry: "RIPROVA",
    hiddenAbility: "NASC.", frontBack: "FRONTE / RETRO", type: "TIPO", height: "ALTEZZA", weight: "PESO", abilities: "ABILITÀ", pokedexRecord: "REGISTRAZIONE POKÉDEX", evolutionLine: "LINEA EVOLUTIVA", noEvolutionData: "DATI EVOLUZIONE NON DISPONIBILI", baseStats: "STATISTICHE BASE", total: "TOTALE", trainingData: "DATI ALLENAMENTO", baseExp: "ESP. BASE", noMoves: "NESSUNA MOSSA PER LIVELLO TROVATA NEL GRUPPO VERSIONE ROSSO FUOCO / VERDE FOGLIA.", level: "LIV.", movesNote: "Elenco delle mosse apprese salendo di livello nel gruppo versione Rosso Fuoco / Verde Foglia.", dexEntry: "VOCE DEL POKÉDEX", classification: "CLASSIFICAZIONE", typeEffectiveness: "EFFICACIA DEI TIPI", weakTo: "DEBOLE A", resists: "RESISTE A", immuneTo: "IMMUNE A", noRegistration: "NESSUNA REGISTRAZIONE DISPONIBILE.",
    removedCaught: "Rimosso dai catturati", removedFavorites: "Rimosso dai preferiti", addedCaught: "Pokémon registrato come catturato", addedFavorite: "Pokémon aggiunto ai preferiti", audioUnavailable: "Audio non disponibile", serviceNotLinked: "SERVIZIO NON ANCORA COLLEGATO", serviceInactive: "LA POSTA NON È ANCORA ATTIVA", minChars: "SCRIVI ALMENO 3 CARATTERI", waitMinute: "ASPETTA UN MINUTO PRIMA DI RISPEDIRE", sending: "SPEDIZIONE IN CORSO…", sent: "LETTERA SPEDITA. GRAZIE, ALLENATORE!", received: "Dedica ricevuta", sendError: "ERRORE DI INVIO. RIPROVA TRA POCO"
  },
  en: {
    docTitle: "FireRed Pokédex",
    metaDescription: "A fan-made Pokémon FireRed style Pokédex, fast, nostalgic and made for smartphones.",
    fireRed: "FIRERED",
    headline: "The classic Pokédex feeling.<br />Now on your phone.",
    intro: "Bring back the Kanto atmosphere with a FireRed-inspired Pokédex: simple, quick and always in your pocket.",
    features: ["151 Kanto Pokémon", "Game Boy Advance style cards", "Search, filters and stats", "Favorites and caught Pokémon saved on device"],
    openDex: "OPEN THE POKÉDEX",
    fanNote: "Fan-made, unofficial and ad-free.",
    menu: "Open filters", letterAria: "Leave a nostalgic message", seen: "SEEN", caught: "CAUGHT", favorites: "FAVORITES", visitorsToday: "VISITS TODAY",
    searchPlaceholder: "Name or number…", searchAria: "Search Pokémon by name or number", filters: "FILTERS", all: "ALL", favoriteFilter: "FAVORITES", caughtFilter: "CAUGHT", filterByType: "FILTER BY TYPE",
    loadingDatabase: "LOADING DATABASE…", searchAction: "SEARCH", install: "INSTALL", backToDex: "Back to Pokédex", cry: "Play cry", info: "INFO", stats: "STATS", moves: "MOVES", descriptionShort: "DESC", previous: "PREV.", caughtButton: "CAUGHT", caughtButtonDone: "CAUGHT ✓", savedButton: "SAVED", saveButton: "SAVE", next: "NEXT",
    letterMail: "TRAINER MAIL", letterTitle: "LEAVE A MESSAGE", close: "Close", letterIntro: "Write a memory, a line or a dedication connected to your Pokémon journey. The creator of the project will read it.", nickname: "NAME OR NICKNAME", optional: "OPTIONAL", nicknamePlaceholder: "E.g. Trainer Red", dedication: "YOUR MESSAGE", dedicationPlaceholder: "The day I chose my first Pokémon…", sendLetter: "SEND THE LETTER",
    footer: "Data provided by PokéAPI. Pokémon and their names and images belong to their respective owners. This is an unofficial fan-made tribute and is not affiliated with Nintendo, Game Freak or The Pokémon Company.",
    localMode: "LOCAL MODE: BASIC DATA AVAILABLE", noPokemon: "NO POKÉMON FOUND.<br>TRY ANOTHER FILTER.", results: "RESULTS", scanType: "SCANNING TYPE", filterOffline: "Filter unavailable without connection", scanning: "SCANNING…", signalMissing: "POKÉDEX SIGNAL LOST", detailError: "I can’t load the full entry. Check your connection and try again.", retry: "RETRY",
    hiddenAbility: "HIDDEN", frontBack: "FRONT / BACK", type: "TYPE", height: "HEIGHT", weight: "WEIGHT", abilities: "ABILITIES", pokedexRecord: "POKÉDEX RECORD", evolutionLine: "EVOLUTION LINE", noEvolutionData: "EVOLUTION DATA UNAVAILABLE", baseStats: "BASE STATS", total: "TOTAL", trainingData: "TRAINING DATA", baseExp: "BASE EXP.", noMoves: "NO LEVEL-UP MOVES FOUND FOR THE FIRE RED / LEAF GREEN VERSION GROUP.", level: "LV.", movesNote: "List of moves learned by leveling up in the Fire Red / Leaf Green version group.", dexEntry: "POKÉDEX ENTRY", classification: "CLASSIFICATION", typeEffectiveness: "TYPE EFFECTIVENESS", weakTo: "WEAK TO", resists: "RESISTS", immuneTo: "IMMUNE TO", noRegistration: "NO REGISTRATION AVAILABLE.",
    removedCaught: "Removed from caught", removedFavorites: "Removed from favorites", addedCaught: "Pokémon registered as caught", addedFavorite: "Pokémon added to favorites", audioUnavailable: "Audio unavailable", serviceNotLinked: "SERVICE NOT CONNECTED YET", serviceInactive: "MAIL SERVICE IS NOT ACTIVE YET", minChars: "WRITE AT LEAST 3 CHARACTERS", waitMinute: "WAIT ONE MINUTE BEFORE SENDING AGAIN", sending: "SENDING…", sent: "LETTER SENT. THANK YOU, TRAINER!", received: "Message received", sendError: "SEND ERROR. TRY AGAIN SOON"
  }
};

const state = {
  pokemon: KANTO_NAMES.map((name, index) => ({ id: index + 1, name, apiName: normalizeName(name) })),
  query: "",
  collection: "all",
  selectedType: null,
  typeIds: null,
  currentId: 1,
  currentTab: "info",
  currentDetail: null,
  detailCache: new Map(),
  typeCache: new Map(),
  abilityCache: new Map(),
  seen: loadSet("rf-seen"),
  caught: loadSet("rf-caught"),
  favorites: loadSet("rf-favorites"),
  deferredInstall: null,
  showBackSprite: false,
  backendReady: false
};

const el = {};
let toastTimer;

window.addEventListener("DOMContentLoaded", init);

function init() {
  cacheElements();
  applyStaticLanguage();
  renderTypeButtons();
  bindEvents();
  renderCounters();
  renderList();
  hydrateListNames();
  registerServiceWorker();
  registerDailyVisit();
  routeFromHash();
}

function cacheElements() {
  [
    "list-screen","detail-screen","pokemon-list","search-input","status-line","filters-panel","filter-toggle","type-grid",
    "seen-count","caught-count","favorite-count","detail-number","detail-name","detail-body","cry-button","toggle-caught",
    "toggle-favorite","previous-pokemon","next-pokemon","back-button","nostalgia-letter-button","menu-button","nav-search","nav-filters",
    "install-button","desktop-open","toast","daily-visitors","letter-modal","letter-backdrop","letter-close","letter-form",
    "letter-nickname","letter-message","letter-count","letter-status","letter-submit"
  ].forEach(id => { el[toCamel(id)] = document.getElementById(id); });
  el.rowTemplate = document.getElementById("pokemon-row-template");
  el.tabs = [...document.querySelectorAll(".detail-tab")];
  el.collectionButtons = [...document.querySelectorAll("[data-collection]")];
}

function bindEvents() {
  el.searchInput.addEventListener("input", event => {
    state.query = event.target.value.trim().toLocaleLowerCase(APP_LANG);
    renderList();
  });
  el.filterToggle.addEventListener("click", toggleFilters);
  el.menuButton.addEventListener("click", toggleFilters);
  el.navFilters.addEventListener("click", toggleFilters);
  el.navSearch.addEventListener("click", () => el.searchInput.focus());
  el.desktopOpen.addEventListener("click", () => {
    document.getElementById("app").scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el.searchInput.focus(), 350);
  });
  el.nostalgiaLetterButton.addEventListener("click", openLetterModal);
  el.letterBackdrop.addEventListener("click", closeLetterModal);
  el.letterClose.addEventListener("click", closeLetterModal);
  el.letterMessage.addEventListener("input", updateLetterCounter);
  el.letterForm.addEventListener("submit", submitDedication);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape" && !el.letterModal.hidden) closeLetterModal();
  });
  el.backButton.addEventListener("click", closeDetail);
  el.previousPokemon.addEventListener("click", () => openPokemon(state.currentId === 1 ? TOTAL : state.currentId - 1));
  el.nextPokemon.addEventListener("click", () => openPokemon(state.currentId === TOTAL ? 1 : state.currentId + 1));
  el.toggleCaught.addEventListener("click", () => toggleSetItem("caught", state.currentId));
  el.toggleFavorite.addEventListener("click", () => toggleSetItem("favorites", state.currentId));
  el.cryButton.addEventListener("click", playCry);
  el.tabs.forEach(tab => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));
  el.collectionButtons.forEach(button => button.addEventListener("click", () => {
    state.collection = button.dataset.collection;
    el.collectionButtons.forEach(item => item.classList.toggle("active", item === button));
    renderList();
  }));
  window.addEventListener("hashchange", routeFromHash);
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    state.deferredInstall = event;
    el.installButton.hidden = false;
  });
  el.installButton.addEventListener("click", installApp);
}

function renderTypeButtons() {
  const fragment = document.createDocumentFragment();
  TYPES.forEach(([type, short]) => {
    const button = document.createElement("button");
    button.className = `type-chip type-${type}`;
    button.type = "button";
    button.textContent = short;
    button.dataset.type = type;
    button.title = typeLabel(type);
    button.addEventListener("click", () => selectType(type, button));
    fragment.append(button);
  });
  el.typeGrid.replaceChildren(fragment);
}

async function hydrateListNames() {
  try {
    const data = await fetchJson(`${API}/pokemon?limit=${TOTAL}&offset=0`, 9000);
    if (!Array.isArray(data.results) || data.results.length < TOTAL) throw new Error("Risposta incompleta");
    state.pokemon = data.results.slice(0, TOTAL).map((item, index) => ({
      id: index + 1,
      name: KANTO_NAMES[index],
      apiName: item.name
    }));
    renderList();
  } catch (error) {
    setStatus(t("localMode"));
  }
}

function renderList() {
  const query = normalizeSearch(state.query);
  const filtered = state.pokemon.filter(pokemon => {
    const matchesText = !query || String(pokemon.id) === query || pad(pokemon.id).includes(query) || normalizeSearch(pokemon.name).includes(query) || normalizeSearch(pokemon.apiName).includes(query);
    const matchesCollection = state.collection === "all" || state[state.collection].has(pokemon.id);
    const matchesType = !state.selectedType || (state.typeIds && state.typeIds.has(pokemon.id));
    return matchesText && matchesCollection && matchesType;
  });

  const fragment = document.createDocumentFragment();
  filtered.forEach(pokemon => {
    const row = el.rowTemplate.content.firstElementChild.cloneNode(true);
    row.dataset.id = pokemon.id;
    row.querySelector(".pokemon-id").textContent = `N°${pad(pokemon.id)}`;
    row.querySelector(".pokemon-name").textContent = upper(pokemon.name);
    const badges = [];
    if (state.caught.has(pokemon.id)) badges.push("●");
    if (state.favorites.has(pokemon.id)) badges.push("♥");
    row.querySelector(".row-badges").textContent = badges.join(" ");
    const image = row.querySelector(".pokemon-sprite");
    image.src = spriteUrl(pokemon.id);
    image.alt = `Sprite of ${pokemon.name}`;
    image.addEventListener("error", handleSpriteError);
    row.addEventListener("click", () => openPokemon(pokemon.id));
    fragment.append(row);
  });

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = t("noPokemon");
    fragment.append(empty);
  }

  el.pokemonList.replaceChildren(fragment);
  setStatus(`${filtered.length} ${t("results")} · KANTO N°001–151`);
}

function toggleFilters() {
  const open = el.filtersPanel.hidden;
  el.filtersPanel.hidden = !open;
  el.filterToggle.setAttribute("aria-expanded", String(open));
}

async function selectType(type, button) {
  if (state.selectedType === type) {
    state.selectedType = null;
    state.typeIds = null;
    document.querySelectorAll(".type-chip").forEach(item => item.classList.remove("active"));
    renderList();
    return;
  }

  state.selectedType = type;
  document.querySelectorAll(".type-chip").forEach(item => item.classList.toggle("active", item === button));
  setStatus(`${t("scanType")} ${typeLabel(type)}…`);

  try {
    if (!state.typeCache.has(type)) {
      const data = await fetchJson(`${API}/type/${type}`, 10000);
      const ids = new Set(data.pokemon.map(entry => parseResourceId(entry.pokemon.url)).filter(id => id >= 1 && id <= TOTAL));
      state.typeCache.set(type, { ids, data });
    }
    state.typeIds = state.typeCache.get(type).ids;
  } catch (error) {
    state.typeIds = new Set();
    showToast(t("filterOffline"));
  }
  renderList();
}

function openPokemon(id, replace = false) {
  const safeId = Math.max(1, Math.min(TOTAL, Number(id) || 1));
  const hash = `#pokemon/${safeId}`;
  if (replace) history.replaceState(null, "", hash);
  else if (location.hash !== hash) location.hash = hash;
  else showDetail(safeId);
}

function closeDetail() {
  if (location.hash.startsWith("#pokemon/")) location.hash = "#list";
  else showList();
}

function routeFromHash() {
  const match = location.hash.match(/^#pokemon\/(\d{1,3})$/);
  if (match) showDetail(Number(match[1]));
  else showList();
}

function showList() {
  el.detailScreen.hidden = true;
  el.listScreen.hidden = false;
  document.title = t("docTitle");
}

async function showDetail(id) {
  if (id < 1 || id > TOTAL) return openPokemon(1, true);
  state.currentId = id;
  state.currentTab = "info";
  state.showBackSprite = false;
  state.seen.add(id);
  saveSet("rf-seen", state.seen);
  renderCounters();
  updateActionButtons();
  el.listScreen.hidden = true;
  el.detailScreen.hidden = false;
  el.detailNumber.textContent = `N°${pad(id)}`;
  el.detailName.textContent = upper(KANTO_NAMES[id - 1]);
  el.cryButton.disabled = true;
  el.tabs.forEach(tab => {
    const active = tab.dataset.tab === "info";
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  el.detailBody.innerHTML = `<div class="loading-card"><div class="pixel-loader" aria-hidden="true"></div><p>${t("scanning")}</p></div>`;
  document.title = `${KANTO_NAMES[id - 1]} · ${t("docTitle")}`;

  try {
    const detail = await getPokemonDetail(id);
    if (state.currentId !== id) return;
    state.currentDetail = detail;
    el.detailName.textContent = upper(detail.name);
    el.cryButton.disabled = !detail.cry;
    renderCurrentTab();
  } catch (error) {
    if (state.currentId !== id) return;
    state.currentDetail = null;
    el.detailBody.innerHTML = `
      <div class="error-card">
        <strong>${t("signalMissing")}</strong><br>
        ${t("detailError")}
        <br><button type="button" id="retry-detail">${t("retry")}</button>
      </div>`;
    document.getElementById("retry-detail").addEventListener("click", () => {
      state.detailCache.delete(id);
      showDetail(id);
    });
  }
}

async function getPokemonDetail(id) {
  if (state.detailCache.has(id)) return state.detailCache.get(id);

  const promise = (async () => {
    const [pokemon, species] = await Promise.all([
      fetchJson(`${API}/pokemon/${id}`, 12000),
      fetchJson(`${API}/pokemon-species/${id}`, 12000)
    ]);

    const abilityEntries = await Promise.all(pokemon.abilities.map(async entry => ({
      hidden: entry.is_hidden,
      name: await getLocalizedAbility(entry.ability)
    })));

    const evolutionPromise = species.evolution_chain?.url
      ? fetchJson(species.evolution_chain.url, 10000).then(parseEvolutionChain).catch(() => [])
      : Promise.resolve([]);

    const matchupPromise = calculateMatchups(pokemon.types.map(entry => entry.type.name)).catch(() => null);
    const [evolutions, matchups] = await Promise.all([evolutionPromise, matchupPromise]);

    const localizedName = findLocalized(species.names, APP_LANG) || findLocalized(species.names, "en") || KANTO_NAMES[id - 1];
    const genus = species.genera?.find(entry => entry.language.name === APP_LANG)?.genus
      || species.genera?.find(entry => entry.language.name === "en")?.genus
      || "POKÉMON";
    const description = chooseDescription(species.flavor_text_entries);
    const types = pokemon.types.sort((a, b) => a.slot - b.slot).map(entry => entry.type.name);
    const stats = pokemon.stats.map(entry => ({ name: entry.stat.name, value: entry.base_stat }));
    const moves = extractFireRedMoves(pokemon.moves);

    return {
      id,
      name: localizedName,
      genus,
      description,
      height: pokemon.height / 10,
      weight: pokemon.weight / 10,
      baseExperience: pokemon.base_experience,
      types,
      abilities: abilityEntries,
      stats,
      moves,
      evolutions,
      matchups,
      frontSprite: pokemon.sprites?.versions?.["generation-iii"]?.["firered-leafgreen"]?.front_default || spriteUrl(id),
      backSprite: pokemon.sprites?.versions?.["generation-iii"]?.["firered-leafgreen"]?.back_default || spriteUrl(id, true),
      cry: pokemon.cries?.legacy || pokemon.cries?.latest || null
    };
  })();

  state.detailCache.set(id, promise);
  try {
    const detail = await promise;
    state.detailCache.set(id, detail);
    return detail;
  } catch (error) {
    state.detailCache.delete(id);
    throw error;
  }
}

function switchTab(tabName) {
  state.currentTab = tabName;
  el.tabs.forEach(tab => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  renderCurrentTab();
}

function renderCurrentTab() {
  if (!state.currentDetail) return;
  const renderers = {
    info: renderInfoTab,
    stats: renderStatsTab,
    moves: renderMovesTab,
    description: renderDescriptionTab
  };
  el.detailBody.innerHTML = renderers[state.currentTab](state.currentDetail);
  bindDetailContentEvents();
}

function renderInfoTab(detail) {
  const abilities = detail.abilities.map(item => `${item.name}${item.hidden ? ` (${t("hiddenAbility")})` : ""}`).join(" / ");
  const evolutionHtml = detail.evolutions.length
    ? detail.evolutions.map((entry, index) => `${index ? '<span class="evolution-arrow">›</span>' : ''}<button class="evolution-button" data-evolution-id="${entry.id}" type="button"><img src="${spriteUrl(entry.id)}" alt="" loading="lazy"><span>${upper(entry.name)}</span></button>`).join("")
    : `<span class="notice-card">${t("noEvolutionData")}</span>`;

  return `
    <div class="hero-card">
      <img class="hero-sprite" id="hero-sprite" src="${detail.frontSprite}" data-front="${detail.frontSprite}" data-back="${detail.backSprite}" alt="Sprite of ${escapeHtml(detail.name)}">
      <button class="sprite-switch" id="sprite-switch" type="button">${t("frontBack")}</button>
    </div>
    <section class="detail-section">
      <h3>${escapeHtml(upper(detail.genus))}</h3>
      <div class="data-grid">
        <div class="data-cell"><span>${t("type")}</span><strong>${typePills(detail.types)}</strong></div>
        <div class="data-cell"><span>${t("height")}</span><strong>${formatDecimal(detail.height)} m</strong></div>
        <div class="data-cell"><span>${t("weight")}</span><strong>${formatDecimal(detail.weight)} kg</strong></div>
        <div class="data-cell"><span>${t("abilities")}</span><strong>${escapeHtml(upper(abilities))}</strong></div>
      </div>
    </section>
    <section class="detail-section">
      <h3>${t("pokedexRecord")}</h3>
      <div class="description-box">${escapeHtml(detail.description)}</div>
    </section>
    <section class="detail-section">
      <h3>${t("evolutionLine")}</h3>
      <div class="evolution-row">${evolutionHtml}</div>
    </section>
    ${renderMatchups(detail.matchups)}
  `;
}

function renderStatsTab(detail) {
  const total = detail.stats.reduce((sum, stat) => sum + stat.value, 0);
  return `
    <section class="detail-section" style="margin-top:0">
      <h3>${t("baseStats")}</h3>
      <div class="stat-list">
        ${detail.stats.map(stat => `
          <div class="stat-row">
            <span class="stat-name">${statLabel(stat.name)}</span>
            <span class="stat-value">${stat.value}</span>
            <div class="stat-track"><div class="stat-fill" style="width:${Math.min(100, stat.value / 2.55)}%"></div></div>
          </div>`).join("")}
      </div>
      <div class="total-row"><span>${t("total")}</span><span>${total}</span></div>
    </section>
    <section class="detail-section">
      <h3>${t("trainingData")}</h3>
      <div class="data-grid">
        <div class="data-cell"><span>${t("baseExp")}</span><strong>${detail.baseExperience ?? "—"}</strong></div>
        <div class="data-cell"><span>${t("type")}</span><strong>${typePills(detail.types)}</strong></div>
      </div>
    </section>`;
}

function renderMovesTab(detail) {
  if (!detail.moves.length) return `<div class="notice-card">${t("noMoves")}</div>`;
  return `
    <div class="move-list">
      ${detail.moves.map(move => `
        <div class="move-row">
          <span class="move-level">${t("level")} ${String(move.level).padStart(2, "0")}</span>
          <span class="move-name">${escapeHtml(upper(formatSlug(move.name)))}</span>
        </div>`).join("")}
    </div>
    <p class="notice-card">${t("movesNote")}</p>`;
}

function renderDescriptionTab(detail) {
  return `
    <section class="detail-section" style="margin-top:0">
      <h3>${t("dexEntry")}</h3>
      <div class="description-box" style="min-height:230px">${escapeHtml(detail.description)}</div>
    </section>
    <section class="detail-section">
      <h3>${t("classification")}</h3>
      <div class="description-box">${escapeHtml(detail.genus)}<br><br>${typePills(detail.types)}</div>
    </section>`;
}

function bindDetailContentEvents() {
  const switcher = document.getElementById("sprite-switch");
  if (switcher) switcher.addEventListener("click", toggleSpriteSide);
  document.querySelectorAll("[data-evolution-id]").forEach(button => button.addEventListener("click", () => openPokemon(Number(button.dataset.evolutionId))));
  document.querySelectorAll(".hero-sprite, .evolution-button img").forEach(image => image.addEventListener("error", handleSpriteError));
}

function toggleSpriteSide() {
  const image = document.getElementById("hero-sprite");
  if (!image) return;
  state.showBackSprite = !state.showBackSprite;
  image.src = state.showBackSprite ? image.dataset.back : image.dataset.front;
}

function renderMatchups(matchups) {
  if (!matchups) return "";
  const group = (label, values, multiplier) => values.length ? `<div class="matchup-group"><strong>${label}</strong>${values.map(type => `<span class="type-pill type-${type}">${typeLabel(type)}${multiplier}</span>`).join("")}</div>` : "";
  return `
    <section class="detail-section">
      <h3>${t("typeEffectiveness")}</h3>
      <div class="matchup-list">
        ${group(t("weakTo"), matchups.weak, " ×2")}
        ${group(t("resists"), matchups.resist, " ×½")}
        ${group(t("immuneTo"), matchups.immune, " ×0")}
      </div>
    </section>`;
}

async function calculateMatchups(types) {
  const datasets = await Promise.all(types.map(async type => {
    if (state.typeCache.has(type)?.data) return state.typeCache.get(type).data;
    const data = await fetchJson(`${API}/type/${type}`, 9000);
    const ids = new Set(data.pokemon.map(entry => parseResourceId(entry.pokemon.url)).filter(id => id >= 1 && id <= TOTAL));
    state.typeCache.set(type, { ids, data });
    return data;
  }));

  const multipliers = Object.fromEntries(TYPES.map(([type]) => [type, 1]));
  datasets.forEach(data => {
    data.damage_relations.double_damage_from.forEach(entry => { if (entry.name in multipliers) multipliers[entry.name] *= 2; });
    data.damage_relations.half_damage_from.forEach(entry => { if (entry.name in multipliers) multipliers[entry.name] *= .5; });
    data.damage_relations.no_damage_from.forEach(entry => { if (entry.name in multipliers) multipliers[entry.name] = 0; });
  });

  return {
    weak: Object.entries(multipliers).filter(([, value]) => value > 1).sort((a, b) => b[1] - a[1]).map(([type]) => type),
    resist: Object.entries(multipliers).filter(([, value]) => value > 0 && value < 1).sort((a, b) => a[1] - b[1]).map(([type]) => type),
    immune: Object.entries(multipliers).filter(([, value]) => value === 0).map(([type]) => type)
  };
}

function parseEvolutionChain(data) {
  const entries = [];
  const walk = node => {
    const id = parseResourceId(node.species.url);
    if (id >= 1 && id <= TOTAL && !entries.some(item => item.id === id)) {
      entries.push({ id, name: KANTO_NAMES[id - 1] || formatSlug(node.species.name) });
    }
    node.evolves_to.forEach(walk);
  };
  walk(data.chain);
  return entries;
}

function extractFireRedMoves(moves) {
  const selected = [];
  moves.forEach(entry => {
    const levels = entry.version_group_details
      .filter(detail => detail.version_group.name === "firered-leafgreen" && detail.move_learn_method.name === "level-up")
      .map(detail => detail.level_learned_at);
    if (levels.length) selected.push({ name: entry.move.name, level: Math.min(...levels) });
  });
  return selected.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
}

async function getLocalizedAbility(resource) {
  if (state.abilityCache.has(resource.name)) return state.abilityCache.get(resource.name);
  const fallback = formatSlug(resource.name);
  const promise = fetchJson(resource.url, 7000)
    .then(data => findLocalized(data.names, APP_LANG) || findLocalized(data.names, "en") || fallback)
    .catch(() => fallback);
  state.abilityCache.set(resource.name, promise);
  const name = await promise;
  state.abilityCache.set(resource.name, name);
  return name;
}

function chooseDescription(entries = []) {
  const priority = [
    entry => entry.language.name === APP_LANG && entry.version.name === "firered",
    entry => entry.language.name === APP_LANG,
    entry => entry.language.name === "en" && entry.version.name === "firered",
    entry => entry.language.name === "en"
  ];
  const found = priority.map(test => entries.find(test)).find(Boolean);
  return found ? found.flavor_text.replace(/[\n\f\r]+/g, " ").replace(/\s+/g, " ").trim() : t("noRegistration");
}

function toggleSetItem(key, id) {
  const set = state[key];
  if (set.has(id)) {
    set.delete(id);
    showToast(key === "caught" ? t("removedCaught") : t("removedFavorites"));
  } else {
    set.add(id);
    showToast(key === "caught" ? t("addedCaught") : t("addedFavorite"));
  }
  saveSet(key === "caught" ? "rf-caught" : "rf-favorites", set);
  renderCounters();
  updateActionButtons();
  renderList();
}

function updateActionButtons() {
  const caught = state.caught.has(state.currentId);
  const favorite = state.favorites.has(state.currentId);
  el.toggleCaught.classList.toggle("active", caught);
  el.toggleFavorite.classList.toggle("active", favorite);
  el.toggleCaught.innerHTML = `<kbd>A</kbd> ${caught ? t("caughtButtonDone") : t("caughtButton")}`;
  el.toggleFavorite.innerHTML = `<kbd>♥</kbd> ${favorite ? t("savedButton") : t("saveButton")}`;
}

function renderCounters() {
  el.seenCount.textContent = state.seen.size;
  el.caughtCount.textContent = state.caught.size;
  el.favoriteCount.textContent = state.favorites.size;
}

function playCry() {
  if (!state.currentDetail?.cry) return;
  const audio = new Audio(state.currentDetail.cry);
  audio.volume = .42;
  audio.play().catch(() => showToast(t("audioUnavailable")));
}


function getBackendConfig() {
  const config = window.POKEMON_NOSTALGIA_CONFIG || {};
  return {
    url: String(config.supabaseUrl || "").replace(/\/$/, ""),
    key: String(config.supabaseAnonKey || "")
  };
}

function backendIsConfigured() {
  const { url, key } = getBackendConfig();
  return /^https:\/\/.+\.supabase\.co$/i.test(url) && key.length > 40;
}

function backendHeaders(extra = {}) {
  const { key } = getBackendConfig();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra
  };
}

function getVisitorId() {
  const storageKey = "pokemon-nostalgia-visitor-id";
  let id = localStorage.getItem(storageKey);
  if (id) return id;
  id = typeof crypto?.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(storageKey, id);
  return id;
}

async function registerDailyVisit() {
  if (!el.dailyVisitors) return;
  if (!backendIsConfigured()) {
    el.dailyVisitors.textContent = "—";
    return;
  }

  try {
    const { url } = getBackendConfig();
    const response = await fetch(`${url}/rest/v1/rpc/register_daily_visit`, {
      method: "POST",
      headers: backendHeaders(),
      body: JSON.stringify({ p_visitor_id: getVisitorId() })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const count = await response.json();
    el.dailyVisitors.textContent = Number(count || 0).toLocaleString(appLocale());
    state.backendReady = true;
  } catch (error) {
    el.dailyVisitors.textContent = "—";
  }
}

function openLetterModal() {
  el.letterModal.hidden = false;
  el.letterStatus.textContent = backendIsConfigured()
    ? ""
    : t("serviceNotLinked");
  updateLetterCounter();
  setTimeout(() => el.letterNickname.focus(), 50);
}

function closeLetterModal() {
  el.letterModal.hidden = true;
  el.letterStatus.textContent = "";
}

function updateLetterCounter() {
  el.letterCount.textContent = String(el.letterMessage.value.length);
}

async function submitDedication(event) {
  event.preventDefault();
  const nickname = el.letterNickname.value.trim().slice(0, 24);
  const message = el.letterMessage.value.trim().slice(0, DEDICATION_MAX_LENGTH);

  if (message.length < 3) {
    el.letterStatus.textContent = t("minChars");
    el.letterMessage.focus();
    return;
  }

  if (!backendIsConfigured()) {
    el.letterStatus.textContent = t("serviceInactive");
    return;
  }

  const lastSent = Number(localStorage.getItem("pokemon-nostalgia-last-letter") || 0);
  if (Date.now() - lastSent < 60000) {
    el.letterStatus.textContent = t("waitMinute");
    return;
  }

  el.letterSubmit.disabled = true;
  el.letterStatus.textContent = t("sending");

  try {
    const { url } = getBackendConfig();
    const response = await fetch(`${url}/rest/v1/dediche`, {
      method: "POST",
      headers: backendHeaders({ Prefer: "return=minimal" }),
      body: JSON.stringify({ nickname: nickname || null, message })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    localStorage.setItem("pokemon-nostalgia-last-letter", String(Date.now()));
    el.letterForm.reset();
    updateLetterCounter();
    el.letterStatus.textContent = t("sent");
    showToast(t("received"));
  } catch (error) {
    el.letterStatus.textContent = t("sendError");
  } finally {
    el.letterSubmit.disabled = false;
  }
}

async function installApp() {
  if (!state.deferredInstall) return;
  state.deferredInstall.prompt();
  await state.deferredInstall.userChoice;
  state.deferredInstall = null;
  el.installButton.hidden = true;
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

async function fetchJson(url, timeout = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function findLocalized(names = [], language) {
  return names.find(entry => entry.language.name === language)?.name || null;
}

function typePills(types) {
  return types.map(type => `<span class="type-pill type-${type}">${typeLabel(type)}</span>`).join("");
}

function spriteUrl(id, back = false) {
  return `${SPRITES}/versions/generation-iii/firered-leafgreen/${back ? "back/" : ""}${id}.png`;
}

function handleSpriteError(event) {
  const image = event.currentTarget;
  const owner = image.closest("[data-id], [data-evolution-id]");
  const id = Number(owner?.dataset.id || owner?.dataset.evolutionId || state.currentId || 1);
  if (!image.dataset.fallback) {
    image.dataset.fallback = "1";
    image.src = `${SPRITES}/${id}.png`;
  } else if (image.dataset.fallback === "1") {
    image.dataset.fallback = "2";
    image.src = "./assets/pokeball-placeholder.svg";
  } else {
    image.removeEventListener("error", handleSpriteError);
  }
}

function setStatus(text) { el.statusLine.textContent = text; }

function showToast(message) {
  clearTimeout(toastTimer);
  el.toast.textContent = upper(message);
  el.toast.classList.add("show");
  toastTimer = setTimeout(() => el.toast.classList.remove("show"), 2200);
}


function getAppLanguage() {
  const params = new URLSearchParams(location.search);
  const forced = params.get("lang") || localStorage.getItem("pokemon-nostalgia-lang") || "";
  if (/^it\b/i.test(forced)) return "it";
  if (/^en\b/i.test(forced)) return "en";
  return /^it\b/i.test(navigator.language || "") ? "it" : "en";
}

function t(key) {
  return I18N[APP_LANG]?.[key] ?? I18N.en[key] ?? I18N.it[key] ?? key;
}

function appLocale() {
  return APP_LANG === "it" ? "it-IT" : "en-US";
}

function upper(value) {
  return String(value).toLocaleUpperCase(APP_LANG === "it" ? "it" : "en");
}

function typeLabel(type) {
  return TYPE_LABELS[APP_LANG]?.[type] || TYPE_LABELS.en[type] || upper(formatSlug(type));
}

function typeShort(type) {
  return TYPE_SHORT[APP_LANG]?.[type] || TYPE_SHORT.en[type] || upper(String(type).slice(0, 3));
}

function statLabel(name) {
  return STAT_LABELS[APP_LANG]?.[name] || STAT_LABELS.en[name] || upper(formatSlug(name));
}

function applyStaticLanguage() {
  document.documentElement.lang = APP_LANG;
  document.title = t("docTitle");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("metaDescription"));

  const brandSub = document.querySelector(".brand-sub");
  if (brandSub) brandSub.innerHTML = `<span class="mini-ball" aria-hidden="true"></span> ${t("fireRed")}`;
  const introTitle = document.querySelector(".intro-panel h1");
  if (introTitle) introTitle.innerHTML = t("headline");
  const introCopy = document.querySelector(".intro-copy");
  if (introCopy) introCopy.textContent = t("intro");
  document.querySelectorAll(".feature-list p").forEach((item, index) => {
    const icon = item.querySelector("span")?.outerHTML || "";
    item.innerHTML = `${icon} ${t("features")[index] || item.textContent}`;
  });
  if (el.desktopOpen) el.desktopOpen.textContent = t("openDex");
  const fanNote = document.querySelector(".fan-note");
  if (fanNote) fanNote.textContent = t("fanNote");
  const legal = document.querySelector(".legal-footer");
  if (legal) legal.textContent = t("footer");

  el.menuButton?.setAttribute("aria-label", t("menu"));
  el.nostalgiaLetterButton?.setAttribute("aria-label", t("letterAria"));
  document.querySelector("#list-screen .app-header h2").textContent = "POKÉDEX";
  document.querySelector("#list-screen .app-header .eyebrow").textContent = t("fireRed");
  const counters = [t("seen"), t("caught"), t("favorites"), t("visitorsToday")];
  document.querySelectorAll(".counter-strip span").forEach((item, index) => { item.textContent = counters[index] || item.textContent; });
  el.searchInput.placeholder = t("searchPlaceholder");
  el.searchInput.setAttribute("aria-label", t("searchAria"));
  el.filterToggle.textContent = t("filters");
  document.querySelector('[data-collection="all"]').textContent = t("all");
  document.querySelector('[data-collection="favorites"]').textContent = t("favoriteFilter");
  document.querySelector('[data-collection="caught"]').textContent = t("caughtFilter");
  document.querySelector(".filter-label").textContent = t("filterByType");
  el.statusLine.textContent = t("loadingDatabase");
  el.navSearch.innerHTML = `<kbd>A</kbd> ${t("searchAction")}`;
  el.navFilters.innerHTML = `<kbd>START</kbd> ${t("filters")}`;
  el.installButton.innerHTML = `<kbd>+</kbd> ${t("install")}`;

  el.backButton?.setAttribute("aria-label", t("backToDex"));
  el.cryButton?.setAttribute("aria-label", t("cry"));
  const tabLabels = { info: t("info"), stats: t("stats"), moves: t("moves"), description: t("descriptionShort") };
  el.tabs.forEach(tab => { tab.textContent = tabLabels[tab.dataset.tab] || tab.textContent; });
  el.previousPokemon.innerHTML = `<kbd>◀</kbd> ${t("previous")}`;
  el.nextPokemon.innerHTML = `${t("next")} <kbd>▶</kbd>`;

  const modal = el.letterModal;
  if (modal) {
    modal.querySelector(".letter-backdrop")?.setAttribute("aria-label", t("close"));
    modal.querySelector(".letter-card-header span").textContent = t("letterMail");
    modal.querySelector("#letter-title").textContent = t("letterTitle");
    modal.querySelector(".letter-close")?.setAttribute("aria-label", t("close"));
    modal.querySelector(".letter-form > p").textContent = t("letterIntro");
    modal.querySelector('label:nth-of-type(1) > span').innerHTML = `${t("nickname")} <small>(${t("optional")})</small>`;
    el.letterNickname.placeholder = t("nicknamePlaceholder");
    modal.querySelector('label:nth-of-type(2) > span').textContent = t("dedication");
    el.letterMessage.placeholder = t("dedicationPlaceholder");
    el.letterMessage.maxLength = DEDICATION_MAX_LENGTH;
    modal.querySelector(".letter-meta strong").innerHTML = `<span id="letter-count">0</span>/${DEDICATION_MAX_LENGTH}`;
    el.letterCount = document.getElementById("letter-count");
    el.letterSubmit.textContent = t("sendLetter");
  }
}

function loadSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || "[]").map(Number)); }
  catch { return new Set(); }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set].sort((a, b) => a - b)));
}

function parseResourceId(url) {
  const match = String(url).match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : NaN;
}

function normalizeName(name) {
  return name.toLocaleLowerCase("en").replace("♀", "-f").replace("♂", "-m").replace(/[^a-z0-9♀♂]+/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-");
}

function normalizeSearch(value) {
  return String(value).toLocaleLowerCase(APP_LANG).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.’'\s_-]+/g, "");
}

function formatSlug(value) {
  return String(value).split("-").map(part => part ? part[0].toUpperCase() + part.slice(1) : "").join(" ");
}

function formatDecimal(value) {
  return Number(value).toLocaleString(appLocale(), { maximumFractionDigits: 1 });
}

function pad(value) { return String(value).padStart(3, "0"); }
function toCamel(value) { return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
