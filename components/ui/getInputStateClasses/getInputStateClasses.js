export function getInputStateClasses(isInvalid, isValid) {
  if (isInvalid) return "border-red-500 bg-red-50";
  if (isValid) return "border-green-600 bg-green-50";
  return "border-gray-300";
}
