// es modules
// các tệp có đuôi mjs (module js) để sử dụng 
// import and export 1 cách rõ ràng hơn
// thay vì phải dùng module.exports hay require trong 
// file js bình thường

const add = (a, b) => {
    return a + b
}

const subtract = (a, b) => {
    return a - b
}

// export default add
export default {
    add,
    subtract
}