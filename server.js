const  {app , PORT } = require('./app');

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})