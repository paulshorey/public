export const sleep = function(ms = 0) {
  return new Promise(r => setTimeout(r, ms))
}

export const forEachAsync = async function(array, fn) {
  for (let t of array) {
    await fn(t)
  }
}
