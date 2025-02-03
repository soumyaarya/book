const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;
require('dotenv').config()
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
  });
//middleware
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173','https://book-git-main-soumya-aryas-projects.vercel.app'],
     credentials:true,
     allowedHeaders: ['Authorization', 'Content-Type']

}))
//routes
const orderRoutes = require('./src/orders/order.route')
const bookRoutes = require('./src/books/book.route')
const userRoutes = require('./src/users/user.route')
const adminRoutes = require('./src/stats/admin.stats')
app.use("/api/books",bookRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/auth',userRoutes)
app.use('/api/admin',adminRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL); 
    app.use('/',(req,res)=>{
        res.json({message:'Book store server is running'})
    });
}
main().then(()=>console.log("Mongodb connected successfully")).catch(err=> console.log(err))


app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})
