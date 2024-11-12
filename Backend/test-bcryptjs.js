const bcrypt = require("bcryptjs");

const testPassword = "Emma2312"; // Replace with the actual password used during registration
const storedHash = "$2a$10$vIMkYnuP04x4z8juPAy/Tux6QTWkX6XhLZvFpAKebakzbP.DBTnLS"; // The hash from your database

async function testComparison() {
  const isMatch = await bcrypt.compare(testPassword, storedHash);
  console.log("Does the password match the stored hash?:", isMatch);
}

testComparison();

