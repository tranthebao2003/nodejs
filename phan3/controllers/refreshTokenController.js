const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  // req.cookie: đây chính là cookie-parser lưu
  // cookie sau khi đã phân tích cú pháp
  const cookies = req.cookies;

  // OBTIONAL CHAINING
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  // lấy ra jwt trong cookies mình đã tạo
  // và gửi đi cùng lúc trong authController
  // console.log(cookies.jwt)
  
  const refreshToken = cookies.jwt;

  // Cũng ở trong authController mình đã gán refresh token
  // cho những user còn lại (Ngoài user đăng nhập)
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    // forbidden
    console.log('Không tìm thấy user có refreshToken')
    return res.sendStatus(403);
  }

  // evaluate jwt
  // trong trường hợp match trả về true, false
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err || foundUser.username !== decode.username) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: decode.username },
      process.env.ACCESS_TOKEN_SECRET,
      // với product thì nên để 5m đến 10m
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
