# Making the guides yours

A working document for the owner. It covers the nine articles in
`src/content/guides/`, all of which currently ship with `draft: true`.

## The honest framing first

Rewording sentences does not reliably defeat a detector, and detectors are
unreliable in both directions anyway. That is the wrong target.

The right target is a reader who knows the field. Right now these nine articles
read as **well-researched**. Every figure is sourced and every claim is checkable,
which is more than most competing pages offer. What they do not read as is
**lived**. Nothing in them could only have been written by someone who sits with
borrowers and reads bank paperwork every week.

So this document has two halves:

- **Part A** removes the fingerprints, the repeated constructions that mark all
  nine as one batch from one writer. Mechanical, fast, low value on its own.
- **Part B** adds what only you have. This is the part that actually works, both
  against the "generic draft" feel and for how Google reads first-hand experience.

Do Part B even if you skip Part A. Do not do Part A alone.

---

## Part A: the fingerprints

Counted across the nine files. These are not style mistakes, they are repetitions.
One of each is good writing. Seven of each is a signature.

| Pattern | Count | Where it hurts most |
|---|---|---|
| `שימו לב...` as a paragraph opener | 7 | 3 of them are near-identical: `שימו לב מה זה אומר עליכם` |
| `לא X אלא Y` antithesis | 9 | Two of them are in `description` fields, so they show in search results together |
| `לפעמים... לפעמים...` symmetry | 8 | `early-repayment-fees.md:72` closes on it |
| Bold lead-in at paragraph start (`**כותרת.** הסבר`) | 35 | `early-repayment-fees.md` has 8 in one article |
| `כלומר` / `בפועל` as the pivot word | 19 | Pivots should vary; these two carry almost all of them |

The three near-identical ones, in order of priority:

1. `src/content/guides/bridge-loan.md:44` - `אבל שימו לב מה זה אומר עליכם:`
2. `src/content/guides/grace-and-balloon-loans.md:65` - `שימו לב מה זה אומר עליכם:`
3. `src/content/guides/mortgage-mix.md:66` - `שימו לב מה זה אומר:`

Keep one. Rewrite the other two into something that is not a formula, for example
a direct question (`אז מה זה אומר לגבי התיק שלכם?`) or simply deleting the
signpost and starting with the point itself.

### The uniformity nobody notices sentence by sentence

| Article | Words | H2 sections |
|---|---|---|
| bridge-loan | 178 | 6 |
| early-repayment-fees | 184 | 5 |
| grace-and-balloon-loans | 204 | 4 |
| how-much-mortgage | 225 | 5 |
| mortgage-mix | 220 | 5 |
| mortgage-payment-deferral | 264 | 6 |
| preliminary-approval | 186 | 5 |
| prime-rate-mortgage | 201 | 6 |
| what-is-a-mortgage | 234 | 5 |

Nine articles, every one between 178 and 264 words, every one with 4 to 6
sections. A person writing over months does not produce that. A batch does.

Fix by deliberate asymmetry, not by trimming:

- Let **one** article grow well past the others, the one where you have the most
  to say. `mortgage-mix` or `how-much-mortgage` are the natural candidates.
- Let **one** be short and blunt. `what-is-a-mortgage` can be, if you add your own
  explanation and cut two sections.
- Vary the shape: one article with a table, one with no list at all, one that is
  mostly a single worked example.

### The closing move

All nine end the same way: a sentence that links to a service page. It is correct
SEO and it is a tell at nine out of nine.

Change three or four of them. Options that keep the link but break the pattern:

- Put the service link mid-article and close on your own verdict.
- Close on the question you would ask the reader if they called you.
- Close on what you see go wrong most often with this specific topic.

**Time for all of Part A: about 15 minutes per article, 2 to 3 hours total.**

---

## Part B: what only you can add

One item from this list per article is enough. Two is better. This is where the
articles stop being a draft.

### 1. A case you actually handled

The strongest single addition. Rules that keep it safe:

- No name, no city, no identifying detail. `זוג עם משכנתא קיימת מ-2021` is enough.
- Real numbers, rounded. If the balance was 743,000, write "כ-740 אלף".
- The point is not that it ended well. A case where the answer was "אל תעשו את זה"
  is more convincing than a success, and it matches the no-promises rule the site
  is built on.
- One per article. Two makes it a portfolio, not an explanation.

### 2. Your verdict, stated as yours

The articles explain and stop. You are allowed an opinion, and an advisor without
one is not credible. Phrase it as a position, not a fact:

- `לדעתנו, במצב הזה...`
- `אנחנו כמעט אף פעם לא ממליצים על...`
- `יש יועצים שיגידו אחרת, וזו עמדה לגיטימית, אבל...`

Keep it away from anything regulated: no promise of savings, no promise of
approval, no claim about a specific bank.

### 3. What you see repeatedly

Not statistics, observations. `רוב מי שפונה אלינו בנושא הזה כבר...` or
`השאלה שאנחנו מקבלים הכי הרבה על...`. Nobody can copy these from a competitor,
and they are the clearest possible signal of first-hand work.

### 4. The economist angle, which is currently unused

You have been an economist since 2007 and none of the nine articles shows it. In a
field full of advisors who explain products, the person who explains **why the
number behaves that way** is a different category. The natural places are
`prime-rate-mortgage` (what a rate decision does to a household budget) and
`how-much-mortgage` (why the income test binds before the LTV test).

### 5. Your own speech

Read each article aloud. Where a sentence is not one you would say, it is not
yours yet. Specifically:

- The articles are consistently calm and measured. If you are blunter than that in
  a meeting, be blunter in the text.
- Idioms you actually use are fingerprints in the good sense, they are yours.
- Sentence length in the drafts is even. Real speech is uneven. Let a two-word
  sentence stand.

---

## Part C: one specific addition per article

Nine slots. Fill each with a concrete memory, not a general statement.

| # | File | The thing only you can write |
|---|---|---|
| 1 | `prime-rate-mortgage.md` | What a real payment did through the rate rises, in shekels, and what people said when they called about it |
| 2 | `preliminary-approval.md` | The most common reason you see an approval lapse or get re-priced before the deal closes |
| 3 | `grace-and-balloon-loans.md` | A contractor financing deal you reviewed, and what the brochure did not say |
| 4 | `mortgage-mix.md` | A mix you refused to recommend, and the reason |
| 5 | `how-much-mortgage.md` | The gap you keep seeing between what people believe they can get and what the income test allows |
| 6 | `early-repayment-fees.md` | The largest exit fee you have seen, and how the written figure differed from the answer on the phone |
| 7 | `bridge-loan.md` | How long a sale actually takes compared with what people plan for |
| 8 | `mortgage-payment-deferral.md` | Someone who asked you about freezing payments, what you told them, and what they did instead |
| 9 | `what-is-a-mortgage.md` | How you explain a mortgage in a first meeting, in your own words |

**Time: 30 to 45 minutes per article when you already have the case in mind.
Roughly a full working day for all nine, or one article an evening for two weeks.**

---

## Part D: what not to touch

These are load-bearing. Changing them breaks either the build, the SEO, or the
legal position.

1. **Every sourced figure.** The 4,742 in the deferral article, the 320 fee, the
   66.66% variable cap, the 30-year limit, the LTV tiers, the Land Law wording.
   Each traces to the link in `sources`. Change a number and the citation becomes
   false.
2. **The `sources` list itself,** and the frontmatter fields. `description` must
   stay between 80 and 180 characters or the build fails. Any Hebrew value
   containing `: ` must be wrapped in quotes, which is the error that broke the
   build four times already.
3. **`primaryKeyword`.** One keyword per URL. Changing one can collide with a
   service page.
4. **Internal links.** They are the reason the nine articles support the service
   pages rather than competing with them.
5. **The absence of promises.** No guaranteed savings, no guaranteed approval, no
   "licensed" or "certified" wording. See `LEGAL-CHECKLIST.md`.

---

## Part E: the order to work in

1. Pick the article you have the most to say about, not the first in the list.
2. Write the case or the observation from Part C first, in your own words, before
   touching anything else. Badly written and true beats polished and generic.
3. Then fix the Part A patterns in that same article.
4. Read it aloud once. Any sentence you would not say gets rewritten or cut.
5. Run `npm run build`. If the frontmatter broke, the error names the line.
6. Set `draft: false` only when you would be comfortable with a banker reading it.

Do not do all nine in one sitting. Nine articles edited in one day acquire a new
uniformity, which is the problem you started with.

## The test at the end

For each article, one question: **could a competitor have written this exact
article from public sources alone?**

Today the answer is yes for all nine. When the answer is no, the article is yours,
and no rewording pass was needed to get there.
