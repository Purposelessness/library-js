export {removeQueryParams};

function removeQueryParams(url) {
  return url.split('?')[0];
}