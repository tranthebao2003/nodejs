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
const { patch } = require("../routes/root");

const handleLogin = async (req, res) => {
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
  if(match){
    // create JWTs
    const accessToken = jwt.sign(
      {
        "username": foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      // trong sp nên để expiresIn này khoảng 10p
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
      path.json(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    )

    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.status(200).json({accessToken})
  } else{
    res.sendStatus(401)
  }
}

module.exports = {handleLogin}
  