export function isAuthenticated() {
  const cookie = document.cookie
  console.log("🚀 ~ file: index.ts:3 ~ isAuthenticated ~ cookie", cookie, getItenm('magic-user-info'))
  if (getItenm('magic-user-info')) {
    return true;
  }
  return false
}
function getItenm(sKey:string) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}