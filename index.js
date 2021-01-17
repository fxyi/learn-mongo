const mongoose = require('mongoose')
const promise = mongoose.connect('mongodb://localhost/playground')

promise.then(() => {
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
  isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
  })
  const result = await course.save()
  console.log(result)
}
// createCourse()

async function getCourses() {
  const pageNumber = 1
  const pageSize = 10

  const result = await Course
    .find({ author: 'Mosh' })
    .skit((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // 升序
    .select({ name: 1, tags: 1 })
    .count() // 得到筛选出的数组长度
  console.log(result)
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
 * Contains: /.*Mosh.*/           /*
*
* .find({ author: /^Mosh/ })
* .find({ author: /Hamedani$/ })
*/

