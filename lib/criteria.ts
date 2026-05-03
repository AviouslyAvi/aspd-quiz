export type Criterion = {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  name: string;
  itemIds: number[];
};

export const CRITERIA: Criterion[] = [
  { id: 1, name: "Failure to conform / lawful behavior", itemIds: [1, 4, 18, 28] },
  { id: 2, name: "Deceitfulness", itemIds: [3, 8, 24, 27] },
  { id: 3, name: "Impulsivity / failure to plan", itemIds: [7, 13, 20, 30] },
  { id: 4, name: "Irritability / aggressiveness", itemIds: [9, 12, 19, 25] },
  { id: 5, name: "Reckless disregard for safety", itemIds: [6, 16, 22, 23] },
  { id: 6, name: "Consistent irresponsibility", itemIds: [7, 10, 11, 26] },
  { id: 7, name: "Lack of remorse", itemIds: [5, 15, 17, 21, 29] },
];

export const POSITIVE_THRESHOLD = 3.5;
