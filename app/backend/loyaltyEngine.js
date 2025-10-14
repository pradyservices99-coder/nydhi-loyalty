export function calculatePoints(amount, tag) {
  let multiplier = 3; // default tier
  if (tag === "premium") multiplier = 5;
  if (tag === "clearance") multiplier = 0;
  return amount * multiplier;
}
