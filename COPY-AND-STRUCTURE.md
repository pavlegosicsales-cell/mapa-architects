# Mapa Architects — Home Page: Copy & Structure

Scope: **home page redesign only.** Structure follows the Norda teardown (`TEARDOWN-norda.md`);
copy is Mapa's own, pulled from the old site and the Instagram captions.

Language: **Serbian primary, English secondary** (matches the existing bilingual site).
SR is written first because that is the buying audience. EN copy is given for every block.

Voice reference: the Instagram captions, not the old website. Short, reflective, concrete.
Old site copy is corporate and translated badly; IG copy is the real voice.

---

## Global

**Nav:** Naslovna · Studio · Projekti · Usluge · Nagrade · Kontakt
(EN: Home · Studio · Projects · Services · Awards · Contact)
Fixed, `mix-blend-mode: difference`, logo left / MENU right, 64px inset.

**Language switch:** SR / EN, top right next to MENU.

**Header contact:** `+381 65 333 81 03` visible in the header on desktop, in the menu overlay on mobile.
The studio converts on direct calls, so the number never hides.

**Title:** `Mapa Architects | Arhitektonski studio, Beograd`
**Meta description (SR, 152 chars):**
`Arhitektonski studio iz Beograda. Projektovanje, enterijeri i vođenje projekata od 2002. Vile, poslovni objekti, auto saloni i tržni centri.`
**Meta description (EN, 149 chars):**
`Belgrade architecture studio. Design, interiors and project management since 2002. Villas, offices, car showrooms and retail across the region.`

---

## 01 — Hero

Three stacked project images sliding up, exactly the Norda intro. Full black, 100vh.
No headline over the hero. The work speaks first, then the studio introduces itself. Same as Norda.

**Images:** three of the strongest, and they must be recent, not the 2016 renders.
Recommended order (from `research/PROJECT-CATALOG.md` + Instagram):
1. Kuća sa dva krova, Kosmaj (needs high-res from Predrag)
2. Fortuna Center, Aranđelovac (`images/site/arhitektura/8/`)
3. BMW & MINI showroom, Čukarica (`images/site/arhitektura/13/`)

**Alt text:**
- `[Kuća sa dva krova, Kosmaj, pogled sa proplanka — placeholder]`
- `Poslovno-trgovački centar Fortuna, Aranđelovac`
- `Salon BMW i MINI, Čukarica, Beograd`

---

## 02 — Uvod / studio

Split-text H2, then a body paragraph. Desktop gets the per-character reveal, tablet and mobile get plain text.

**H2 (SR):**
> Mapa Architects, arhitektonski studio iz Beograda.

**H2 (EN):**
> Mapa Architects, an architecture studio based in Belgrade.

**Body (SR):**
> Svakom projektu prilazimo sa istom pažnjom, bez obzira na veličinu objekta ili nivo investicije. Vila, tržni centar, salon automobila, škola: proces je isti. Slušamo mesto, slušamo klijenta, pa tek onda crtamo.

**Body (EN):**
> We give every project the same attention, whatever its size or budget. A villa, a shopping centre, a car showroom, a school: the process is the same. We read the site, we listen to the client, and only then do we draw.

*(Source: `research/pages/sr-mapa.txt`, rewritten into plain speech. The original is one 200-word sentence.)*

---

## 03 — Brojke / counters

Four scroll-rolled numbers, 2×2, tabular figures, 1px rule above each.

| SR | EN | Number | Source |
|---|---|---|---|
| Godina iskustva | Years | **24** | diplomirao 2002 |
| Realizovanih projekata | Projects | **70** | project archive count |
| Nagrada i priznanja | Awards | **7** | see §06 |
| Godina u Delta Holdingu | — | *(alt option)* | biography |

Fourth counter: **`20+` / Brendova i investitora** ("Brands and clients") reads stronger than a
generic "Clients" number, because the client list is the strongest asset. Use that.

⚠️ Confirm the project count with Predrag before publishing. 70 is what the old site lists;
the real number including recent work is higher.

---

## 04 — Slika preko cele širine

Full-bleed 80vh image with the mask wipe and the four `+` corner marks. No copy.
**Image:** an interior, to break up the exteriors. `images/site/enterijer/8/` (Sani Optik) or
`enterijer/30/` (Fit Office).
**Alt:** `Enterijer poslovnog prostora Fit Office, Beograd`

---

## 05 — O studiju + link

Body copy with two inline bold links, then the big underlined "Studio" link with the circular arrow.

**Body (SR):**
> Studio vodi **Predrag Milutinović**, arhitekta sa licencom Inženjerske komore Srbije i dvadeset četiri godine prakse. Pre Mape bio je direktor za arhitekturu i dizajn menadžment u **Delta Holdingu**, gde je vodio rekonstrukciju hotela Crowne Plaza i razvoj objekata za BMW, MINI, Honda i Maxi.
>
> Danas studio radi projektovanje, enterijere i vođenje projekata: od prve skice do primopredaje ključa.

**Body (EN):**
> The studio is led by **Predrag Milutinović**, a licensed architect with twenty four years in practice. Before Mapa he was Director of Architecture and Design Management at **Delta Holding**, where he led the Crowne Plaza Belgrade reconstruction and the rollout of buildings for BMW, MINI, Honda and Maxi.
>
> Today the studio covers design, interiors and project management: from the first sketch to handover.

**Link label:** `Studio` (EN: `Studio`) → `/studio.html`

---

## 06 — Nagrade

Norda's award list, 1px divider per row, staggered fade-up. Format: `Naziv / Dodelilac / Godina`.

| Nagrada | Dodelilac | Godina |
|---|---|---|
| Kuća godine | *(potvrditi sa Predragom)* | 2024 |
| Nagrada za najlepši enterijer u kategoriji hotela | Saint Gobain Rigips | 2014 |
| Nagrada grada Beograda za arhitekturu i urbanizam | Grad Beograd | 2012 |
| Nagrada za najbolje arhitektonsko ostvarenje | Novosti | 2012 |
| 10 najboljih arhitektonskih ostvarenja godine | NIN | 2012 |
| Povelja za arhitektonsko ostvarenje | DaNS | 2010 |
| Prva nagrada za najlepši enterijer u Srbiji i Crnoj Gori | Saint Gobain Rigips | 2009 |

Section label: `Nagrade` + `/ 7` (Norda uses `Awards / 8` in the same slot).
Certificate scans exist in `images/site/nagrade/` if we want a hover thumbnail.

---

## 07 — Video + veliki logo

Sticky 100vh block. Scroll-zoom video, MAPA mark centred, then the white overlay headline.

⚠️ **We have no video.** Two options:
- **A:** ask Predrag for any site or drone footage (best; the section is the visual peak of the page)
- **B:** replace the video with a single full-bleed image and keep the scroll-zoom on the image

**Overlay headline (SR):**
> Ponekad arhitekturu
> ne određuju zidovi,
> nego mesto na kome
> ljudi odluče da zastanu.

**Overlay headline (EN):**
> Sometimes architecture
> is not defined by walls,
> but by the place where
> people decide to stop.

*(Predrag's own words, from the Twin Roof House caption. This is the single best line the studio has written. It belongs here, at the biggest type size on the page.)*

---

## 08 — Usluge

H1 `Usluge`, intro paragraph, image block, then the 6-step accordion.

**Intro (SR):**
> Pokrivamo ceo put objekta, od ideje do useljenja. Klijent može uzeti jednu uslugu ili sve.

**Intro (EN):**
> We cover the whole life of a building, from idea to move-in. Take one service or all of them.

### Accordion, 6 items

**/ 01 Projektovanje** *(Design)*
> Idejno rešenje, idejni projekat, projekat za građevinsku dozvolu i projekat za izvođenje. Radimo objekte svih namena: stambene, poslovne, trgovinske, industrijske i objekte javne namene.

**/ 02 Enterijer** *(Interior design)*
> Enterijeri stanova, kuća, kancelarija, hotela i prodajnih prostora. Od rasporeda i svetla do izbora materijala i nameštaja.

**/ 03 Vođenje projekata** *(Project management)*
> Organizacija, planiranje i kontrola projekta kroz sve faze. Rokovi, budžet i koordinacija svih učesnika na jednom mestu.

**/ 04 Upravljanje projektovanjem** *(Design management)*
> Koordinacija projektantskih timova na velikim objektima. Vodimo arhitekte, inženjere i konsultante tako da se projekti slože pre nego što se počne da gradi.

**/ 05 Strateško i konceptualno planiranje** *(Strategic and conceptual planning)*
> Analiza lokacije, provera isplativosti i definisanje programa pre nego što se povuče prva linija. Ovde se donose odluke koje kasnije koštaju najviše.

**/ 06 Nadzor** *(Design control and supervision)*
> Projektantski i stručni nadzor tokom izgradnje. Redovni obilasci gradilišta i kontrola da se izvedeno poklapa sa projektovanim.

*(Sources: `research/pages/sr-services.txt` for the six service names, biography for the scope descriptions. The old site lists the six names with zero explanation; the descriptions are new.)*

---

## 09 — Klijenti i investitori

Norda's "Our Partners" grid, 2 rows × 4 logo cards, corner brackets at 5% opacity.

**H1:** `Klijenti` (EN: `Clients`)

**Intro (SR):**
> Radili smo za investitore koji ne prihvataju improvizaciju: automobilske brendove, trgovinske lance, hotelske grupe i banke. Ista pažnja ide i na privatnu kuću.

**Intro (EN):**
> We have worked for clients who do not accept improvisation: car brands, retail chains, hotel groups and banks. A private house gets the same attention.

**Eight logos:** BMW · MINI · HONDA · Mazda · Maxi (Delhaize) · Generali · IHG · Zumtobel
*(Reserve list: Delta Holding, Univerzal Banka, Bauhaus, NIKE, H&M, Fiat)*

⚠️ **Logo rights.** Using client logos is normal in an architecture portfolio, but confirm with
Predrag that none of the framework agreements restrict it. If any do, swap that logo for a
text-only list, which reads just as well in this monochrome layout.

---

## 10 — Zaključni tekst

One centred paragraph, max 640px, no heading. Norda's closing statement slot.

**SR:**
> Poštujemo standarde koje smo sami postavili i način saradnje koji nas je doveo dovde. Svaki novi projekat je drugačiji i to je jedini deo posla koji se ne menja.

**EN:**
> We keep to the standards we set ourselves and the way of working that brought us here. Every new project is different, and that is the one part of the job that never changes.

---

## 11 — Izdvojen projekat

50vh mask-wipe image, then H2 + intro + `Pogledaj projekat` link.

**Project:** Kuća sa dva krova, Kosmaj (the newest and by far the best-performing on Instagram)

**H2 (SR):** `Kuća sa dva krova, Kosmaj`
**H2 (EN):** `Twin Roof House, Kosmaj`

**Intro (SR):**
> Kuća između šume, proplanka i horizonta. Jedinstveni krov presečen je atrijumom i drvetom koje kroz njega prolazi. Ognjište stoji na produženoj osi kuće, okrenuto ka zalasku sunca, i zatvara prostornu sekvencu koja počinje na ulazu.

**Intro (EN):**
> A house between the forest, the clearing and the horizon. A single roof, cut open by an atrium and the tree that grows through it. The hearth sits on the extended axis of the house, facing the sunset, closing a spatial sequence that starts at the front door.

**Link label:** `Pogledaj projekat` (EN: `View project`)

*(Source: `research/INSTAGRAM.md`, first two captions, lightly joined.)*

---

## 12 — Objavljeno / press

**This replaces Norda's testimonials slideshow.** We have no client testimonials, and inventing
them is not an option. Press coverage is the honest equivalent and Mapa has plenty of it.

Same slideshow mechanic, same layout: quote left, image right, drag cursor, dot pagination.

Entries pulled from the Instagram highlights and the publications page:

| Izvor | Tip |
|---|---|
| NIN | 10 najboljih arhitektonskih ostvarenja |
| Novosti | nagrada za najbolje ostvarenje |
| DaNS | povelja |
| Gradnja | intervju |
| M kvadrat | intervju |
| Cord Magazine | intervju |
| Sfera | podcast |

⚠️ We need the actual pull quotes. `images/site/publikacije/` holds 19 scans; ask Predrag for
one quotable line and a date per outlet. Until then this section is a marquee of outlet names
plus a `Objavljeno u` label, which still works.

**Marquee text:** `MAPA ARCHITECTS ~ ` repeated, H1 size, Norda's ticker exactly.

---

## 13 — Footer

Black. Giant MAPA wordmark watermark, then:

**Left — kontakt**
> Mileševska 26, 11000 Beograd
> +381 65 333 81 03
> office@mapaarch.com ⚠️ *(confirm: the SR page says office@predragmilutinovic.com)*

**Middle — mapa sajta**
Naslovna · Studio · Projekti · Usluge · Nagrade · Kontakt · Politika privatnosti

**Right — mreže**
Instagram · Facebook · Threads
*(Drop Twitter/X. `@arhpedja` has not been active and a dead link in the footer costs more than it gives.)*

**Bottom line:**
`© 2026 Mapa Architects d.o.o. Sva prava zadržana.`
`Licenca 300 B972 05, Inženjerska komora Srbije`

**Newsletter:** Norda has a newsletter signup here. Mapa does not send a newsletter.
Replace the block with a short enquiry prompt and one CTA:

> **Imate projekat?**
> Javite nam se, pogledaćemo lokaciju i javiti da li je izvodljivo.
> `Pošaljite upit` → contact page

(EN: **Have a project?** / Get in touch and we will look at the site and tell you if it works. / `Send an enquiry`)

---

## Copy standards applied

- Zero em-dashes. Colons, commas and periods only.
- No "seamlessly", "cutting-edge", "leverage", "unlock", "in today's fast-paced world".
- No "Learn more" or "Click here". Every CTA says what happens: `Pogledaj projekat`, `Pošaljite upit`.
- Real numbers only: 24 years, 70 projects, 7 awards, all traceable to `context.md`.
- Alt text describes the actual building, never a stock-photo concept.
- Second person where it fits: "Klijent može uzeti jednu uslugu ili sve."

---

## Open decisions before the build

1. **Scope.** Skill 02 normally builds home + contact + privacy. You said home page redesign only.
   Confirm: home only, or home + contact (with the wizard form) + privacy?
2. **Privacy policy jurisdiction.** The skill's boilerplate is Australian. Mapa is a Serbian d.o.o.,
   so it needs Zakon o zaštiti podataka o ličnosti / GDPR wording, in Serbian. I will write that
   version, not the Australian one.
3. **Typeface.** The brand face is Futura PT, which matches the geometric MAPA wordmark and is the
   right call. It is a paid Adobe Fonts family. If Predrag has no licence, the closest free
   substitutes are Jost or Poppins. Norda's Albert Sans is a fallback but it fights the logo.
4. **Video** for section 07, or an image instead.
5. **Client logos** clearance for section 09.
6. **Press pull quotes** for section 12.
7. **Email address** conflict, still unresolved from Skill 01.

None of these block starting the build. 1 and 3 change the most, so answer those two and I will build.
