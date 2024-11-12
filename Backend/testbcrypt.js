const bcrypt = require("bcryptjs");

async function testHashAndCompare() {
  const plainPassword = "Emma2312"; // Use your plain text password here

  // Hash the password
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log("Generated hash:", hash);

  // Compare the password with the hash
  const isMatch = await bcrypt.compare(plainPassword, hash);
  console.log("Does the password match the generated hash?:", isMatch);
}

testHashAndCompare();

