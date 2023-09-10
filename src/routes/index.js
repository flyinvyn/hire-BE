const express = require('express')
const router = express.Router()
const userRouter = require('../routes/users')
const skillRouter = require('../routes/skils')
const experienceRouter = require('../routes/experinece')
const portofolioRouter = require('../routes/portofolio')
const recruiterRouter = require('../routes/recruiter')
const hireRouter = require('../routes/hire')

router.use('/worker', userRouter)
router.use('/skill', skillRouter)
router.use('/experience', experienceRouter)
router.use('/portofolio', portofolioRouter)
router.use('/recruiter', recruiterRouter)
router.use('/hire', hireRouter)

module.exports = router