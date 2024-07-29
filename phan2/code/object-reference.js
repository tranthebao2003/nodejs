const obj1 = {
    name: "Bruce Wayne"
}

// nếu chỉ định như vậy thì name của obj2 và obj1
// cùng địa chỉ bộ nhớ nên khi ta thay đổi cái obj2
// thì obj1 cũng sẽ bị thay đổi name
// const obj2 = obj1
// obj2.name = "Clark Kent"

let obj2 = obj1
obj2 = {
    name:  "Clark Kent"
}

console.log(obj1)