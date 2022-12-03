export function mobileCheck(): boolean {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) return true;
  else return false;
}
