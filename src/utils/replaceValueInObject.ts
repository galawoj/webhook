export default function replaceValueInObject(
  object: any,
  targetValue: string | number | boolean,
  newValue: string | number | boolean
) {
  for (let e in object) {
    if (typeof object[e] === "object" && object[e] !== null) {
      replaceValueInObject(object[e], targetValue, newValue);
    } else if (object[e] === targetValue) {
      object[e] = newValue;
    }
  }
  return object;
}
