const getVersionGenerator = function* (version: string) {
  const matchers = Array.from(version.matchAll(/\d+/g));
  for (let index = 0; index < matchers.length; index++) {
    yield matchers[index][0];
  }
};
/**
 *
 * @param targetVersion (目标版本)
 * @param sourceVersion (源版本)
 * @returns
 *      targetVersion>sourceVersion return 1;
 *      targetVersion===sourceVersion return 0;
 *      targetVersion<sourceVersion return -1;
 */
const compareVersions = (
  targetVersion: string,
  sourceVersion: string
): number => {
  if (!targetVersion || !sourceVersion)
    throw Error("version param must be non-empty string");
  const targetGenerator = getVersionGenerator(targetVersion);
  const sourceGenerator = getVersionGenerator(sourceVersion);
  let targetValue = targetGenerator.next().value;
  let sourceValue = sourceGenerator.next().value;
  while (targetValue !== undefined && sourceValue !== undefined) {
    if (targetValue > sourceValue) {
      return 1;
    } else if (targetValue < sourceValue) {
      return -1;
    } else {
      targetValue = targetGenerator.next().value;
      sourceValue = sourceGenerator.next().value;
    }
  }
  if (targetValue) {
    return -1;
  }
  if (sourceValue) {
    return 1;
  }
  return 0;
};

export { compareVersions };
