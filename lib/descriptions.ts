export type Tier = {
  minPct: number;
  maxPct: number;
  title: string;
  body: string;
};

export const TIERS: Tier[] = [
  {
    minPct: 0,
    maxPct: 10,
    title: "Your results show little to no alignment with ASPD traits.",
    body: `Your responses show no meaningful presence of the traits associated with Antisocial Personality Disorder. Across every dimension this assessment measures — your relationship with rules and authority, your honesty, your impulse control, your sense of responsibility, your capacity for empathy, and the way you process remorse — your answers consistently reflect someone whose conscience is active, intact, and meaningfully guiding your behavior.

You are not someone who regularly bends the truth to get what you want, and when you have been dishonest, it has likely sat uncomfortably with you rather than passing without a trace. You tend to think about how your decisions land on other people before you make them, and when something you have done has caused harm, you have felt that — not as a performance of guilt, but as a genuine internal response. Responsibility is not something you avoid. You follow through on commitments with enough consistency that the people in your life can count on you, and when you have failed to, it has mattered to you.

Your relationship with rules and social norms is largely cooperative. You may disagree with certain expectations or push back in specific contexts, but you do not have a deep-seated pattern of violating them, and you are not someone who repeatedly finds yourself in conflict with authority, the law, or the basic expectations of the people around you. Physical aggression is not a default response for you, and recklessness — while perhaps present on occasion — is not a defining feature of how you make decisions.

At this score level, ASPD traits are functionally absent from your profile. This does not mean you are without complexity or that you have never acted in ways you regret — it means the particular constellation of traits that defines Antisocial Personality Disorder is not one that describes you. There is nothing in your responses that indicates ASPD is a relevant clinical consideration.`,
  },
  {
    minPct: 11,
    maxPct: 20,
    title: "Your results show minimal alignment with ASPD traits.",
    body: `Your responses reflect a profile in which the traits associated with Antisocial Personality Disorder are present only at the very margins. The core characteristics of ASPD — a pervasive disregard for others' rights, chronic dishonesty and manipulation, a pattern of rule-breaking, impulsivity, aggression, recklessness, and the absence of meaningful remorse — do not define your profile. What your answers reflect instead is a largely prosocial orientation with a small number of tendencies that lean in the direction of ASPD without ever forming a coherent pattern.

You may recognize yourself in one or two of these traits. Perhaps you have a lower threshold for guilt than most people, or you have bent the truth in situations where you felt cornered. Perhaps you have made impulsive decisions that created problems you had to walk back from, or you have found yourself in conflict with rules that felt arbitrary or unfair. These are not unusual human experiences, and in isolation they do not indicate anything clinically significant.

What distinguishes this score level from higher ones is the absence of a pattern. ASPD is not a single trait or a single episode — it is a pervasive and consistent way of relating to the world, to other people, and to one's own sense of responsibility. At this level, that pervasiveness is not present. The tendencies your responses flag are scattered, not systematic, and they appear to be exceptions to a baseline that is generally oriented toward empathy, honesty, and responsibility.

There is nothing in your results that warrants clinical concern regarding ASPD. The traits present are minimal and do not appear to be causing significant harm to you or the people in your life.`,
  },
  {
    minPct: 21,
    maxPct: 30,
    title: "Your results show a low but noticeable presence of ASPD traits.",
    body: `Your responses place you in a range where ASPD-associated traits are detectable and consistent enough to be worth noting, even if they fall well short of the threshold for clinical concern. You are not someone whose life is organized around antisocial behavior, but you are also not someone for whom the traits that define ASPD are entirely foreign. They show up in your responses with enough regularity to suggest that they are genuine features of how you operate, rather than flukes.

The areas most likely to be driving your score at this level include a tendency to push back against rules and expectations you disagree with, a practical rather than principled relationship with honesty, and remorse that is present but shorter-lived than it is for most people. You are probably someone who can rationalize your way out of guilt fairly efficiently — not because you are incapable of empathy, but because you are good at reframing situations in ways that reduce your own culpability. You may also have a history of impulsive decisions that did not account for how they would affect others, not out of malice but out of a genuine orientation toward your own needs and instincts in the moment.

What is notable at this score level is that these traits exist without the full architecture of ASPD. The pattern is partial. You care about people, even if selectively. You take responsibility, even if inconsistently. The antisocial features in your profile are real but contained, and they are not currently shaping your life in ways that cross into serious harm.

At 30%, ASPD traits are present enough to sit with and consider — particularly if they cluster around a specific relationship, environment, or phase of your life — but they do not constitute a clinical picture of Antisocial Personality Disorder.`,
  },
  {
    minPct: 31,
    maxPct: 40,
    title: "Your results show a moderate-low presence of ASPD traits.",
    body: `Your responses reflect a genuine and recurring pattern of ASPD-associated traits that goes beyond occasional tendencies. At this level, the characteristics of Antisocial Personality Disorder are not showing up in isolated pockets of your profile — they are appearing with enough regularity across enough areas that they represent something consistent about how you operate, how you make decisions, and how you relate to the people and systems around you.

You likely recognize yourself in several of the following: a longstanding discomfort with authority and rules that feel imposed rather than reasoned, a history of dishonesty that extended beyond white lies into deliberate misrepresentation when it served you, a pattern of impulsive decisions that others had to absorb the consequences of, and a form of remorse that surfaces briefly before giving way to rationalization. You are not incapable of caring about people, but you tend to prioritize your own interests and instincts in ways that have created friction — in relationships, at work, or with institutional expectations.

What this score level reflects is a personality profile in which antisocial traits are structurally present but not yet fully dominant. The prosocial parts of you are still operating. You have not abandoned responsibility entirely, and you are not someone for whom empathy is completely inaccessible. But the ASPD-associated traits in your profile are not superficial. They have been present for a long time, they show up across more than one domain of your life, and they are likely recognizable to the people who know you well, even if they would not use clinical language to describe what they observe.

This score does not meet the threshold for an ASPD diagnosis on its own, but it reflects a pattern that warrants honest reflection, particularly around the areas of your life where these traits are most concentrated.`,
  },
  {
    minPct: 41,
    maxPct: 50,
    title: "Your results show a moderate presence of ASPD traits.",
    body: `Your score places you at the midpoint of the ASPD trait spectrum, and what that means is that the characteristics defining Antisocial Personality Disorder are present across multiple areas of your life in a pattern that is both consistent and recognizable. This is not a score that reflects a rough patch or a set of situational responses. It reflects something about who you are and how you have operated — across relationships, across jobs, across years.

At this level, the ASPD criteria your responses flag most prominently likely include some combination of chronic dishonesty, a deep resistance to conforming to social norms and laws, impulsivity that has repeatedly led to decisions made without adequate regard for others, and a limited and short-lived experience of remorse. You are probably someone who has had significant friction with authority — employers, institutions, possibly the legal system — and who has found it genuinely difficult to sustain the kind of consistent responsibility that others seem to manage more naturally. You may have walked away from obligations, financial or otherwise, without fully reckoning with the impact on the people left behind.

Your social intelligence is likely strong. You read people well, and you have probably used that ability to your advantage more than once — persuading, maneuvering, or managing how others perceive you. Manipulation may not feel like a moral failing to you so much as a practical skill. Dishonesty, similarly, may feel less like a character flaw and more like a reasonable tool in certain situations.

At 50%, ASPD traits are not a peripheral feature of your personality profile — they are a central one. The pattern is broad enough and entrenched enough that it is shaping your life in meaningful ways. A clinical evaluation to assess the full picture is appropriate at this level.`,
  },
  {
    minPct: 51,
    maxPct: 60,
    title: "Your results show a moderate-high presence of ASPD traits.",
    body: `Your score places you clearly above the midpoint of the ASPD trait spectrum, and the pattern your responses reflect is one that most clinicians would find significant. The characteristics of Antisocial Personality Disorder are not showing up selectively in your profile — they are showing up broadly, across the major domains the disorder affects: your relationship with rules and authority, your honesty, your impulsivity, your aggressiveness, your sense of responsibility toward others, and the degree to which remorse functions as a meaningful check on your behavior.

What this level of score tends to reflect is not someone who stumbled into antisocial patterns under difficult circumstances, but someone for whom these traits have been a consistent feature of their personality and their life across time. The disregard for rules and norms that ASPD involves is not, at this level, occasional friction with authority — it is a sustained pattern of behavior that has put you at odds with legal, institutional, and interpersonal expectations repeatedly. The dishonesty is not limited to self-protective lies but extends to deliberate manipulation and misrepresentation used to manage others and secure outcomes for yourself. The impulsivity has real consequences — for your stability, your relationships, and the people who have been in the path of decisions made without adequate regard for them.

Remorse is likely something you experience in attenuated form, if at all. You may recognize when you have harmed someone, but the internal cost tends to be low and temporary. Rationalization comes easily. The capacity to reframe your role in harmful outcomes is well-developed. This is not a moral judgment — it is a description of how the emotional architecture that governs most people's behavior appears to function differently in you.

At 60%, ASPD traits are a defining feature of your personality profile. A thorough clinical evaluation is warranted, both to assess the full scope of the pattern and to understand its impact on your life and the lives of the people around you.`,
  },
  {
    minPct: 61,
    maxPct: 70,
    title: "Your results show a high presence of ASPD traits.",
    body: `Your responses reflect a strong, pervasive, and well-established alignment with Antisocial Personality Disorder. At this score level, the traits that define ASPD are not limited to one or two criteria — they are distributed across almost every major area the disorder covers, and they appear to have been operating in your life not as a phase or a reaction to circumstance but as a fundamental feature of your personality.

Your disregard for social norms, rules, and laws is not situational. It is a consistent orientation that has likely produced a documented history of behavior — legal trouble, job losses, relationship failures, financial irresponsibility — that reflects a pattern rather than a series of unrelated events. The dishonesty in your profile is not incidental. You are likely someone who lies with ease, who has used false presentations of yourself across different contexts, and who has manipulated others in ways that served your interests with little internal friction. This is not something that happens to you. It is something you do.

Your impulsivity has almost certainly created real wreckage — decisions made in the moment that cost other people in ways you were aware of and moved past. Your aggressiveness may have expressed itself in physical confrontations, intimidation, or a persistent pattern of dominance and control in relationships. Risk-taking that endangers yourself or others has not reliably stopped you. Responsibility — financial, parental, professional, personal — has been a chronic and recurring area of failure, not because you could not manage it but because you did not sustain the motivation to do so when it conflicted with your own interests.

What is most clinically significant at this level is the absence of effective remorse. You may experience something that resembles guilt briefly, but it does not appear to function the way it does for most people — as a force that modifies future behavior and creates accountability. You have developed a highly efficient system for rationalizing your actions, and it has served you well at considerable cost to others.

At 70%, ASPD is not a distant possibility in your profile. It is the central organizing feature.`,
  },
  {
    minPct: 71,
    maxPct: 80,
    title: "Your results show a very high presence of ASPD traits.",
    body: `Your score places you in a range where Antisocial Personality Disorder traits are not only present but thoroughly dominant across your profile. What your responses describe is not someone with a difficult personality or a complicated history — it is someone whose fundamental orientation toward other people, toward rules, toward responsibility, and toward the consequences of their actions is organized around a set of traits that place ASPD at the core of who you are.

The disregard for others' rights that defines ASPD is clearly present in your responses. You have a long and consistent history of behavior that violates the expectations of social norms and likely the law. This is not a chapter of your life — it is the through line. The dishonesty and manipulation your responses reflect are not tools you reach for reluctantly. They are default modes. You are comfortable presenting false versions of yourself, comfortable deceiving people to achieve your goals, and comfortable with the fact that others have been harmed by your misrepresentations. The moral weight of this does not appear to register in the way it does for most people.

Your impulsivity is not a passing tendency — it is a fundamental feature of how you make decisions, and its consequences have likely been severe and repeated. Physical aggression has likely been a real presence in your life, not as an isolated incident but as a recurring response to conflict, provocation, or challenge. You have put yourself and others in dangerous situations without adequate regard for what could happen, and you have done so more than once. You have failed repeatedly to meet financial obligations, hold jobs, honor commitments, or sustain the kind of consistent reliability that relationships and institutions require. And across all of it, the experience of remorse has been minimal, brief, or effectively absent.

At this level of ASPD trait alignment, the pattern described by your responses is one that has caused significant and ongoing harm to people in your life. Clinical assessment is not just warranted — it is urgent.`,
  },
  {
    minPct: 81,
    maxPct: 90,
    title: "Your results show an extensive presence of ASPD traits consistent with ASPD.",
    body: `Your responses paint a picture that aligns closely and comprehensively with a clinical diagnosis of Antisocial Personality Disorder. This is not a score that reflects a few elevated traits or a pattern confined to one area of your life. Across every major criterion that defines ASPD, your answers reflect a consistent, pervasive, and deeply entrenched pattern that has almost certainly been present since before the age of fifteen and has continued, in some form, throughout your adult life.

The disregard for social norms and laws that characterizes ASPD is fully present in your profile. You have a documented or undocumented history of behavior that violates rules, social expectations, and likely the law — not occasionally and not reluctantly, but repeatedly and with a sense of entitlement or indifference that has not meaningfully diminished over time. You are someone who has lied, manipulated, and misrepresented yourself and your intentions with facility and with very little internal cost. You are skilled at reading people and skilled at using what you see. Deception is not something you fall into — it is something you deploy.

Your impulsivity has led to serious, repeated consequences: for your own stability and for the people around you who have absorbed the fallout of decisions you made without regard for them. Aggressiveness has been a real and recurring feature of your life — in confrontations, in relationships, in the way you respond to challenge or disrespect. Recklessness has put people in harm's way. Irresponsibility has left obligations unmet, people unsupported, and situations damaged in ways you have largely moved on from.

Remorse, in any meaningful functional sense, is absent or near-absent in your profile. You may have a theoretical understanding that your behavior has harmed people. But that understanding does not appear to generate the kind of guilt or regret that modifies behavior for most people. The rationalizations you have built around your actions are thorough and self-serving, and they have enabled you to continue patterns that most people would have been stopped by long ago.

At this level, ASPD is not a possibility being explored — it is a clinical reality that your responses strongly support. Formal assessment is essential.`,
  },
  {
    minPct: 91,
    maxPct: 100,
    title: "Your results show full alignment with ASPD traits.",
    body: `Your responses reflect the most complete expression of Antisocial Personality Disorder traits this assessment is designed to measure. At every level this questionnaire probes — your relationship with laws and social norms, the degree of your honesty and manipulation, your impulsivity, your aggressiveness, your recklessness, your capacity for responsibility, and the presence or absence of genuine remorse — your answers point consistently and fully toward ASPD. There is no area of the assessment where your responses suggest meaningful mitigation, and no criterion where the pattern breaks.

What this score describes is a person whose life has been organized, for as long as they can remember, around a fundamental indifference to the rights, wellbeing, and interests of others. The violation of social norms and laws has not been a phase for you or a response to adversity — it has been a baseline. You have likely been in serious and repeated conflict with the legal system, with employers, with intimate partners, and with institutions. You have deceived people systematically — not just when threatened but as a matter of course — using whatever presentation of yourself was most useful in a given moment, with no meaningful attachment to honesty as a value. You have manipulated people to serve your own interests and have done so with a fluency that suggests long practice. The harm this has caused others has not, in any sustained way, troubled you.

Your impulsivity has been severe and consequential. You have made decisions with no meaningful regard for their impact on others, repeatedly and across different areas of your life, and the wreckage of those decisions has been left for others to sort through while you moved on. Your aggressiveness has been a consistent and dangerous feature of your interpersonal life. You have been physically violent or threatening on more than one occasion, and the pattern has not resolved. You have exposed others to physical risk through your recklessness. You have failed chronically and across multiple contexts to meet the responsibilities you took on — financial, parental, professional, personal — not because you were incapable but because sustaining them required a degree of concern for others that is not available to you in any reliable form.

The remorse that functions as the primary internal regulator of most people's behavior toward others is, in your profile, functionally absent. You may understand at an intellectual level that the people in your life have been harmed by your choices. But that understanding does not carry emotional weight, and it does not change what you do. The architecture of conscience that most people navigate their lives with has not been a meaningful presence in yours.

This is the highest score range on this assessment. It reflects a pattern that is total, lifelong, and serious — one that a single questionnaire cannot fully capture but that this assessment is identifying clearly and without ambiguity. Immediate clinical follow-up is not a recommendation. It is a necessity.`,
  },
];

export function findTier(percentage: number): Tier {
  // Each tier band is integer-aligned: 0-10, 11-20, 21-30, ... 91-100.
  // Use floor(pct) and clamp to map exactly into one band.
  const p = Math.max(0, Math.min(100, percentage));
  const found = TIERS.find((t) => p >= t.minPct && p <= t.maxPct);
  if (found) return found;
  // Fallback: lower-band match for non-integer edges (e.g., 10.5 falls between 10 and 11)
  return TIERS.reduce((acc, t) => (p >= t.minPct ? t : acc), TIERS[0]);
}
