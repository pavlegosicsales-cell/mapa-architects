# Mapa Architects

Home page redesign for **Mapa Architects d.o.o.**, an architecture studio in Belgrade
(Mileševska 26, founded by Predrag Milutinović, in practice since 2002).

Static site: no build step, no framework.

## Run it

```bash
python -m http.server 8123
```

Then open <http://localhost:8123>.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: hero slideshow, studio intro, counters, awards, services, clients, featured project, press |
| `contact.html` | Contact with a four step wizard enquiry form |
| `privacy.html` | Privacy policy, written to the Serbian data protection act and GDPR |
| `styles.css` | Whole design system |
| `main.js` | Smooth scroll, cursor, reveals, slideshow, accordion, wizard |

## Design system

Monochrome: `#000`, `#fff`, `#777`. Albert Sans throughout. Sharp corners, no radius.
Breakpoints at 810px and 1200px, with a type-only step at 1600px.

Motion is built on [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll,
plus scroll-linked transforms. Everything below 810px drops the scroll choreography and
renders as stacked sections.

`TEARDOWN-norda.md` documents the reference site the design follows.
`COPY-AND-STRUCTURE.md` holds the section by section copy in Serbian and English.
`context.md` holds the client brief.

## Before launch

- [ ] Confirm the live email: `office@mapaarch.com` or `office@predragmilutinovic.com`
- [ ] Confirm the client logo usage rights for BMW, MINI, Honda, Mazda, Fiat and Nike
- [ ] Get high resolution photographs of the recent work (Kuća sa dva krova, Škola oko hrasta)
- [ ] Get real pull quotes for the press section
- [ ] Run the form backend skill and paste the endpoint into `ENDPOINT` in `main.js`
