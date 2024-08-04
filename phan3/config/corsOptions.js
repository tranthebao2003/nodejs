// third party middleware
// khi truy cập từ những domain, live sever, localhost thì được phép
// truy cập vào tài nguyên
// liên quan đến bảo mật, tạm thời bỏ qua
const whitelist = [
  "https://www.google.com",
  " http://192.168.1.4:5500",
  "http://localhost:3500",
];
const coresOptions = {
    origin: (origin, callback) => {
        // những danh sách nào ko có trong danh
        // hoặc !origin có thể truy cập resourse
        // vì !origin nghĩa là false undefine
        // mik đang trong giai đoạn phát triển
        // thì header mình là undefined
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(coresOptions))