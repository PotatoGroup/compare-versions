const getNextVersion = (version: string) => {
  const matchers = Array.from(version.matchAll(/\d+/g));
  const template = version.replaceAll(/\d+/g, "%");
  const versionArr = matchers.map((matcher) => parseInt(matcher[0]));
  const calNextVersion = (arr: Array<number>): Array<number> => {
    const current = arr.pop();
    if (current === void 0) return [1];
    const next = current + 1;
    if (next === 100) {
      return [...calNextVersion(arr), 0];
    } else {
      arr.push(next);
      return arr;
    }
  };
  const nextVersionArr = calNextVersion(versionArr);
  return nextVersionArr.reduce((pre: string, cur: number) => {
    return pre.replace("%", cur.toString());
  }, template);
};

export { getNextVersion };
