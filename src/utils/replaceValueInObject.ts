export default function replaceValueInObject(
  object: any,
  targetValue: string | number | boolean,
  newValue: string | number | boolean
) {
  for (let e in object) {
    if (typeof object[e] === "object" && object[e] !== null) {
      if (Array.isArray(object[e])) {
        for (let arrayEl of object[e]) {
          if (typeof arrayEl === "object" && arrayEl !== null) {
            replaceValueInObject(arrayEl, targetValue, newValue);
          } else if (arrayEl === targetValue) {
            const arrayIndex = object[e].indexOf(arrayEl);
            object[e][arrayIndex] = newValue;
          }
        }
      } else {
        replaceValueInObject(object[e], targetValue, newValue);
      }
    } else if (object[e] === targetValue) {
      object[e] = newValue;
    }
  }
  return object;
}
