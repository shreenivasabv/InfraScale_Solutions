const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // 1. Get the token from the Authorization header
  // This handles the "Bearer <token>" format used in your Axios calls
  const token = req.header("Authorization")?.split(" ")[1];

  // 2. Check if no token is present
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // 3. Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    // 4. Attach the decoded payload to the request object.
    // This payload MUST include the email (e.g., { id: "...", email: "..." })
    req.user = decoded; 
    console.log(req.user.id);

    next();
  } catch (err) {
    // 5. Handle invalid or expired tokens
    res.status(401).json({ message: "Invalid token" });
  }
};