
exports.unixToDateTimeConverter = (unix = Date.now()) => {
  const date = new Date(unix)
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
    hour: date.getHours().toString().padStart(2, '0'),
    min: date.getMinutes().toString().padStart(2, '0'),
    sec: date.getSeconds().toString().padStart(2, '0')
  }
}

exports.getRandomInt = (min, max)=>{
  //The maximum is exclusive and the minimum is inclusive
  let minimum = Math.ceil(min)
  let maximum = Math.floor(max)
  return ( Math.floor(Math.random() * (maximum - minimum) + minimum) ).toString()
}

exports.getRandomColor = (dark = 10, light = 240)=>{
  const getRandomInt = (min, max)=>{
    //The maximum is exclusive and the minimum is inclusive
    let minimum = Math.ceil(min)
    let maximum = Math.floor(max)
    return ( Math.floor(Math.random() * (maximum - minimum) + minimum) ).toString()
  }
  return `rgb(${getRandomInt(dark, light)}, ${getRandomInt(dark, light)}, ${getRandomInt(dark, light)})`
}