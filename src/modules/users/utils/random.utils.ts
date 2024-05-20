export function generateUserId(): string {
  const randomeNumber = Math.floor(10000 + Math.random() * 90000);
  return `ECL${randomeNumber}`;
}
