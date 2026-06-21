# Attivare dediche e visite giornaliere

L'interfaccia è già pronta. Per collegarla al database servono circa 5 minuti.

## 1. Crea un progetto Supabase

Apri Supabase, crea un progetto gratuito e attendi che sia pronto.

## 2. Crea tabelle, regole e contatore

Nel progetto apri SQL Editor, crea una nuova query, incolla tutto il contenuto di:

`supabase-setup.sql`

e premi Run.

## 3. Inserisci URL e chiave anon

In Supabase apri Project Settings > API e copia:

- Project URL
- anon / publishable key

Apri `config.js` e incollali così:

```js
window.POKEMON_NOSTALGIA_CONFIG = {
  supabaseUrl: "https://TUO-PROGETTO.supabase.co",
  supabaseAnonKey: "LA-TUA-CHIAVE-ANON"
};
```

Non usare mai la chiave `service_role` nel sito.

## 4. Dove leggere le dediche

Nel dashboard Supabase apri Table Editor > `dediche`.

Troverai nickname, messaggio, data e il campo `approved`, utile per una futura bacheca pubblica moderata.

## 5. Dove vedere le visite

Nell'app compare il numero stimato di browser/dispositivi unici della giornata.

Per lo storico, nel dashboard apri la vista `daily_visit_totals`.

Il conteggio è volutamente rispettoso della privacy: usa un identificatore casuale salvato nel browser e non raccoglie indirizzi IP nel codice dell'app.


## Aumento limite dediche a 360 caratteri

Se avevi già creato le tabelle con la versione precedente, esegui anche `supabase-migration-dediche-360.sql` nel SQL Editor di Supabase. Aggiorna il vincolo del database e la policy di inserimento da 180 a 360 caratteri.
