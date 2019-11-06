export function getJsonFromString(str) {
  try {
    const object = JSON.parse(str)
    if (typeof object === 'object') {
      return object
    }
    return false
  } catch (e) {
    return false
  }
}
