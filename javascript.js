function groupAndSumByKey(arr) {
  const map = {};
  arr.forEach((str) => {
    const [key, value] = str.split(":");
    if (map[key]) {
      map[key] += parseInt(value);
    } else {
      map[key] = parseInt(value);
    }
  });

  return Object.entries(map)
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");
}

const arr = ["x:1", "y:2", "x:3", "a:15"];
const result = groupAndSumByKey(arr);
console.log(result);
