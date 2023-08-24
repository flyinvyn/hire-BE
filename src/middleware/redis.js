// const client = require('../config/redis')
// const  {response} = require('../helper/common')

// const hitCacheProductDetail = async(req,res,next)=>{
//     const idProduct = req.params.id
//     const idTransaction = req.params.id
//     const product = await client.get(`product/${idProduct}`)
//     const transaction = await client.get(`transaction/${idTransaction}`)
//     if(product){
//         return response(res, JSON.parse(product) ,200,'get data success from redis')
//     }else if (transaction) {
//         return response(res, JSON.parse(transaction) ,200,'get data success from redis')
//     }
//     next()
// }

// const hitCacheCategoryDetail = async(req,res,next)=>{
//     const idcategory = req.params.id
//     const idTransaction = req.params.id
//     const category = await client.get(`category/${idcategory}`)
//     const transaction = await client.get(`transaction/${idTransaction}`)
//     if(category){
//         return response(res, JSON.parse(category) ,200,'get data success from redis')
//     }else if (transaction) {
//         return response(res, JSON.parse(transaction) ,200,'get data success from redis')
//     }
//     next()
// }

// const clearCacheProductDetail = (req,res,next) =>{
//     const idProduct = req.params.id
//     client.del(`product/${idProduct}`)
//     next()
// }

// const clearCacheCategoryDetail = (req,res,next) =>{
//     const idcategory = req.params.id
//     client.del(`category/${idcategory}`)
//     next()
// }
// module.exports = {hitCacheProductDetail,hitCacheCategoryDetail,clearCacheProductDetail,clearCacheCategoryDetail}
