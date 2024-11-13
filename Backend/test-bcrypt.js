const bcrypt = require("bcryptjs");

async function testPasswordFunctionality() {
  const password = "testpassword";

  // Hash the password
  const hash = await bcrypt.hash(password, 10);
  console.log("Generated hash:", hash);

  // Compare the password with the hash
  const isMatch = await bcrypt.compare(password, hash);
  console.log("Password matches hash:", isMatch); // Should print true
}

testPasswordFunctionality();

