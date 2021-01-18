const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exercises', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB...')
}).catch(err => {
  console.log('Could not connect to MongoDB...', err)
})

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  price: Number
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse(options) {
  options.forEach(async item => {
    const course = new Course(item)
    const result = await course.save()
    console.log(result)
  })
}
// createCourse(
//   [
//     {"_id":"5a68fdc3615eda645bc6bdec","tags":["express","backend"],"date":"2018-01-24T21:42:27.388Z","name":"Express.js Course","author":"Mosh","isPublished":true,"price":10,"__v":0},
//     {"_id":"5a68fdd7bee8ea64649c2777","tags":["node","backend"],"date":"2018-01-24T21:42:47.912Z","name":"Node.js Course","author":"Mosh","isPublished":true,"price":20,"__v":0},
//     {"_id":"5a68fde3f09ad7646ddec17e","tags":["aspnet","backend"],"date":"2018-01-24T21:42:59.605Z","name":"ASP.NET MVC Course","author":"Mosh","isPublished":true,"price":15,"__v":0},
//     {"_id":"5a68fdf95db93f6477053ddd","tags":["react","frontend"],"date":"2018-01-24T21:43:21.589Z","name":"React Course","author":"Mosh","isPublished":false,"__v":0},
//     {"_id":"5a68fe2142ae6a6482c4c9cb","tags":["node","backend"],"date":"2018-01-24T21:44:01.075Z","name":"Node.js Course by Jack","author":"Jack","isPublished":true,"price":12,"__v":0},
//     {"_id":"5a68ff090c553064a218a547","tags":["node","backend"],"date":"2018-01-24T21:47:53.128Z","name":"Node.js Course by Mary","author":"Mary","isPublished":false,"price":12,"__v":0},
//     {"_id":"5a6900fff467be65019a9001","tags":["angular","frontend"],"date":"2018-01-24T21:56:15.353Z","name":"Angular Course","author":"Mosh","isPublished":true,"price":15,"__v":0}
//   ]
// )

async function getCourses() {
  // const pageNumber = 1
  // const pageSize = 10

  const result = await Course
    // .find()
    // .find({ isPublished: true})
    // .or([{ tags: 'frontend' }, { tags: 'backend' }])
    .find()
    .or([
      { price: { $gte: 15 } },
      { name: /.*by.*/ }
    ])
    // .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] }})
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    // .sort({ name: 1 }) // 升序
    // .sort('-price')
    .select({ name: 1, price: 1 })
    // .count() // 得到筛选出的数组长度
  console.log(result, result.length)
}

getCourses()


/**
 * 比较操作符
 * eq: equal
 * ne: not equal
 * gt: greater than
 * gte: greater than and equal to
 * lt: less than
 * lte: less than and equal to
 * in: in
 * nin: not in
 *
 * .find({ price: { $gt: 10 } })
 * .find({ price: { $gt: 10, $lt: 20 } })
 * .find({ price: { $in: [10, 15, 20] } })
 */

/**
 * 逻辑操作符
 * or
 * and
 * .or([{ author: 'Mosh }, { isPublished: true }])
 * .and([{ author: 'Mosh }, { isPublished: true }])
 */

/**
 * 正则
 * Starts with xxx: /^Mosh/       /^Mosh/i（不区分大小写）
 * Ends with xxx: /Hamedani$/
 * Contains: /.*Mosh.*/
/*
 *
 * .find({ author: /^Mosh/ })
 * .find({ author: /Hamedani$/ })
 */
