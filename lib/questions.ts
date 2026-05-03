export type Question = {
  id: number;
  text: string;
  part: 1 | 2 | 3;
  reverse: boolean;
};

const REVERSE_IDS = new Set([2, 5, 11, 15, 20, 26, 30]);

const RAW: Array<Pick<Question, "id" | "text" | "part">> = [
  { id: 1, part: 1, text: "I find that most rules exist for other people more than they apply to me." },
  { id: 2, part: 1, text: "I tend to think carefully before making decisions that could affect others." },
  { id: 3, part: 1, text: "When I want something, I'm willing to bend the truth a little to get it." },
  { id: 4, part: 1, text: "I've had run-ins with authority figures — police, supervisors, school officials — more than once." },
  { id: 5, part: 1, text: "I usually feel bad when I've done something that upset or hurt someone." },
  { id: 6, part: 1, text: "I enjoy taking risks, even when the outcome could be dangerous." },
  { id: 7, part: 1, text: "I've lost or left several jobs without having another one lined up." },
  { id: 8, part: 1, text: "I find it easy to talk people into doing things they might not have done otherwise." },
  { id: 9, part: 1, text: "When someone provokes me, I tend to react quickly and physically." },
  { id: 10, part: 1, text: "I've borrowed money or had financial obligations that I didn't follow through on." },
  { id: 11, part: 2, text: "I see myself as someone who follows through on commitments." },
  { id: 12, part: 2, text: "I've gotten into physical altercations more than once in my adult life." },
  { id: 13, part: 2, text: "I tend to act on impulse and think about consequences later." },
  { id: 14, part: 2, text: "I've presented myself differently to different people to get what I needed." },
  { id: 15, part: 2, text: "I genuinely care about how my choices affect the people around me." },
  { id: 16, part: 2, text: "I've done things behind the wheel — or in other situations — that most people would consider reckless." },
  { id: 17, part: 2, text: "When I look back on times I hurt someone, I mostly feel that it wasn't that big a deal." },
  { id: 18, part: 2, text: "I've broken rules or laws more than once, even when I didn't have to." },
  { id: 19, part: 2, text: "I am good at reading people and using that to my advantage." },
  { id: 20, part: 2, text: "I often make plans and stick with them." },
  { id: 21, part: 3, text: "When I've caused problems for someone, I usually didn't lose much sleep over it." },
  { id: 22, part: 3, text: "I've put myself or others in dangerous situations without worrying much about it at the time." },
  { id: 23, part: 3, text: "I was in trouble a lot as a kid — fighting, skipping school, getting into things I wasn't supposed to." },
  { id: 24, part: 3, text: "I've used different names or stories about myself depending on the situation." },
  { id: 25, part: 3, text: "I can be aggressive when I feel disrespected or challenged." },
  { id: 26, part: 3, text: "I consider myself a reliable person that others can count on." },
  { id: 27, part: 3, text: "I've deliberately misled someone to get something I wanted." },
  { id: 28, part: 3, text: "As a teenager, I sometimes did things that could have gotten me arrested." },
  { id: 29, part: 3, text: "I find that guilt doesn't affect me the way it seems to affect other people." },
  { id: 30, part: 3, text: "I prefer to think through big decisions rather than act on the fly." },
];

export const QUESTIONS: Question[] = RAW.map((q) => ({
  ...q,
  reverse: REVERSE_IDS.has(q.id),
}));

export const SCALE_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Disagree",
  2: "Slightly Disagree",
  3: "Neutral",
  4: "Slightly Agree",
  5: "Agree",
};
