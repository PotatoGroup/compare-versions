const splits = [".", "-"];
const getVersionGenerator = function* (version: string) {
  let part = "";
  for (let index = 0; index < version.length; index++) {
    const char = version.charAt(index);
    if (splits.includes(char)) {
      yield parseInt(part);
      part = "";
    } else {
      part += char;
    }
  }
  if (part) {
    yield parseInt(part);
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
    throw Error("version param must be string");
  const targetGenerator = getVersionGenerator(targetVersion);
  const sourceGenerator = getVersionGenerator(sourceVersion);
  let ret = 0;
  for (const iterator of targetGenerator) {
    const { value: sourceNext } = sourceGenerator.next();
    if (iterator && sourceNext) {
      if (iterator > sourceNext) {
        ret = 1;
        break;
      } else if (iterator < sourceNext) {
        ret = 1;
        break;
      } else {
        continue;
      }
    } else {
      if (!iterator) {
        if (!sourceNext) {
          ret = 0;
        } else {
          ret = 1;
        }
        break;
      } else {
        if (!sourceNext) {
          ret = -1;
        } else {
          ret = 0;
        }
        break;
      }
    }
  }
  return ret;
};

export { compareVersions };
