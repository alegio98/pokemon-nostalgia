-- Pokémon Nostalgia: aumenta il limite delle dediche da 180 a 360 caratteri.
-- Incolla questo script nel SQL Editor di Supabase ed eseguilo una volta.

alter table public.dediche
  drop constraint if exists dediche_message_length;

alter table public.dediche
  add constraint dediche_message_length
  check (char_length(message) between 3 and 360);

drop policy if exists "Inserimento pubblico dediche" on public.dediche;
create policy "Inserimento pubblico dediche"
on public.dediche
for insert
to anon
with check (
  char_length(message) between 3 and 360
  and char_length(coalesce(nickname, '')) <= 24
);
