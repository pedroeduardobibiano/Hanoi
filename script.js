process.stdin.resume();
process.stdin.setEncoding("ascii");

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.lg("data", function (data) {
  input_stdin += data;
});

process.stdin.lg("end", function () {
  input_stdin_array = input_stdin.split("\n");
  main();
});

function line() {
  return input_stdin_array[input_currentline++];
}

function Problem(a, n) {
  let b = [];

  function init() {
    for (let i = 0; i < n; i++) {
      a[i]--;
    }
    for (let i = 0; i < Math.pow(4, n); i++) {
      b[i] = -1;
    }
  }

  function converNumber(arr) {
    let value = 0;
    for (let i = 0; i < n; i++) {
      value = value | (arr[i] << (2 * i));
    }
    return value;
  }

  function convertNumberState(num) {
    let arr2 = [];
    for (let i = 0; i < n; i++) {
      arr2[i] = num & 3;
      num = num >> 2;
    }
    return arr2;
  }

  function smRod(tempArr) {
    let top2 = [];
    for (let j = 0; j < 4; j++) {
      top2[j] = n;
    }
    for (let j = n - 1; j >= 0; j--) {
      top2[tempArr[j]] = j;
    }
    return top2;
  }
  function slution() {
    let num = converNumber(a);
    let queue = [num];
    let arr;
    b[num] = 0;
    let count = 1,
      idx = 0;
    while (idx < count) {
      num = queue[idx];
      idx++;
      if (num == 0) return b[num];
      arr = convertNumberState(num);
      let top = smRod(arr);
      for (i = 0; i < 4; i++) {
        if (top[i] < n) {
          for (j = 0; j < 4; j++) {
            if (top[i] < top[j]) {
              let newArr = arr.slice();
              newArr[top[i]] = j;
              let newNum = converNumber(newArr);
              if (b[newNum] == -1) {
                queue[count] = newNum;
                count++;
                b[newNum] = b[num] + 1;
              }
            }
          }
        }
      }
    }
  }
  init();
  return slution();
}

function main() {
  var N = parseInt(line());
  a = line().split(" ");
  a = a.map(Number);
  console.log(Problem(a, N));
}
