const app = require('./src/app.js');
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`); 
});
