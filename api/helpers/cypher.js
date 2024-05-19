const signature = process.env.SIGNATURE;

function cypher(str) {
  return str.replace(/[a-zA-Z]/g, function (c) {
    return String.fromCharCode(
      (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
    );
  });
}

function decode(str) {
  return cypher(str).replace(signature, "");
}

module.exports = {
  cypher,
  decode,
};
