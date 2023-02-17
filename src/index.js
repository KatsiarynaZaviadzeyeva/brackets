module.exports = function check(str, bracketsConfig) {
  let openedConfig = '';
  let closedConfig = '';
  let sameBrackets =  new Map();

  for (let i = 0; i < bracketsConfig.length; i++) {
    openedConfig += bracketsConfig[i][0];
    closedConfig += bracketsConfig[i][1];
    if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
      sameBrackets.set(bracketsConfig[i][0] , 0);
    }
  }

  let openedBrackets = [];
  let openedPosition = [];
  const splitString = str.split('');

  for (let i = 0; i < splitString.length; i++) {
    let item = splitString[i];

    let opBracket = openedConfig.indexOf(item);
    let clBracket = closedConfig.indexOf(item);

    if (opBracket === clBracket) {
      let count= sameBrackets.get(item);
      count ++;
      sameBrackets.set(item,count);
      if (count & 1) {
        clBracket = -1;
      } else {
        opBracket = -1;
      }
    }
    if (opBracket >= 0) {
      openedBrackets.push(item);
      openedPosition.push(i);
    }
    if (clBracket >= 0) {
      if (!openedBrackets.length) {
        return false;
      }
      let lastBracket = openedBrackets.pop();
      let position = openedPosition.pop();
      if (lastBracket != openedConfig[clBracket]) {
        return false;
      }
      if (i - position - 1 > 0 && (i - position - 1) & 1) {
        return false;
      }
    }
  }
  return !openedBrackets.length;
};
