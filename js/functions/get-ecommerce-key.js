function getEcommerceKey() {
  return window.location.hostname.match(/([a-z]+)\.com/)[1];
}