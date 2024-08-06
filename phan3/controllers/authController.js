const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs/promises')
const path = require('path');

const handleLogin = async (req, res) => {
  // MỤC ĐÍCH LÀ XÁC THỰC NGƯỜI DÙNG (AUTHENTICATION)
  const { user, password } = req.body;
  if (!user || !password) {
    return res
      .status(400)
      .json({ "message": "Username and password are requied" });
  }

  const foundUser = usersDB.users.find((person) => person.username === user)
  if(!foundUser){
    // unauthenticated
    return res.status(401).json({"message":"Không được xác thực"})
  }

  // evaluate password
  // trong trường hợp match trả về true, false
  const match = await bcrypt.compare(password, foundUser.password)

  // MỤC ĐÍCH CỦA JWT LÀ ĐỂ CẤP QUYỀN (AUTHORIZATION)
  if(match){
    // create JWTs
    const accessToken = jwt.sign(
      {
        "username": foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      // trong sp nên để expiresIn này khoảng 10m
      {expiresIn: '30s'}
    )

    const refreshToken = jwt.sign(
      {
        "username": foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      // trong sp nên để expiresIn này khoảng 10p
      {expiresIn: '1d'}
    )

    // Saving refeshToken with current user
    const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
    // dùng toàn tử spread để thêm key mới cho object
    const currentUser = {...foundUser, refreshToken}
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    )

    // Tên cookie: 'jwt'
    // Giá trị cookie: refreshToken
    // httpOnly: true: Thiết lập cookie chỉ có thể 
    // truy cập được bởi máy chủ (HTTP only), không 
    // thể truy cập từ JavaScript trên trình duyệt, 
    // giúp bảo vệ khỏi các tấn công XSS
    // maxAge: 24 * 60 * 60 * 1000: Thiết lập thời gian sống của cookie 
    // maxAge đơn vị là milisecond nên 24 * 60 * 60 * 1000 chỉ
    // là phép nhân đơn thuần để ra đc số milisecond cần thiết 
    // bằng với 1 ngày thôi
    // là 24 giờ (24 giờ * 60 phút * 60 giây * 1000 mili giây)
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.json({accessToken})
  } else{
    res.sendStatus(401)
  }
}

module.exports = {handleLogin}
  