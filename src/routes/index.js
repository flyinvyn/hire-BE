const express = require('express')
const router = express.Router()
const ProductRouter = require('../routes/Products')
const CategoryRouter = require('../routes/Category')
const TransactionnRouter = require('../routes/Transactionn')

router.use('/products', ProductRouter)
router.use('/category', CategoryRouter)
router.use('/transaction', TransactionnRouter)

module.exports = router