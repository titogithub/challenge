//Given a string S that consists of only alphanumeric characters and dashes.
//The string is separated into N + 1 groups by N dashes. Also given an integer K.
//We want to reformat the string S, such that each group contains exactly K characters, except for the first group,
//which could be shorter than K but still must contain at least one character.
//Furthermore, a dash must be inserted between two groups, and you should convert all lowercase letters to uppercase.
//
//Return the reformatted string.
//
//Examples:
//Input: S = “5F3Z-2e-9-w”, K = 4
//Output: “5F3Z-2E9W”
//Explanation: The string S has been split into two parts,
//each part has 4 characters.
//Note that two extra dashes are not needed and can be removed.
//Input: S = “2-5g-3-J”, K = 2
//Output: “2-5G-3J”
//Explanation: The string s has been split into three parts,
//each part has 2 characters except the first part
//as it could be shorter as mentioned above
//
const testSequence = "5F3Z-2e-9-w";

const result = challenge(testSequence, 5);

console.log("result: ", result);

function challenge(sequence, k) {
  const [first, ...rest] = splitGroups(sequence);
  let restJoined = rest.join("");

  const [firsGroupSequence, restFirstGroupSequence] = handleFirstGroup(
    first,
    k,
  );

  const aux = [];
  let counter = 0;

  if (restFirstGroupSequence) {
    restJoined += firsGroupSequence;
  }

  for (let index = 0; index < restJoined.length; index++) {
    const element = restJoined[index];
    aux.push(element);
    counter += 1;
    if (counter === k && index !== restJoined.length - 1) {
      aux.push("-");
      counter = 0;
    }
  }

  const firstGroupSequenceWithKgroups = firsGroupSequence.concat(
    aux.length ? "-" + aux.join("") : "",
  );

  const lowerCasedSequence = toLowerCase(
    Array.from(firstGroupSequenceWithKgroups),
  );

  return lowerCasedSequence.join("");
}

function toLowerCase(sequence) {
  return sequence.map((s) => {
    if (s.includes("-")) {
      return s;
    }

    return s.toLocaleString();
  });
}

function handleFirstGroup(firstGroupSequence, k) {
  if (typeof firstGroupSequence !== "string") {
    throw new Error("wrong type of input");
  }

  const isShorterThanK = firstGroupSequence.length < k;

  if (isShorterThanK) {
    return [firstGroupSequence];
  }

  const firstGroup = firstGroupSequence.slice(0, k);

  const secondGroup = firstGroupSequence.slice(
    k + 1,
    firstGroupSequence.length,
  );

  return [firstGroup, secondGroup];
}

function splitGroups(sequence) {
  const [first, ...rest] = sequence.split("-");

  return [first, ...rest];
}
