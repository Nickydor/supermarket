// import packages
const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser

// import database
const db = require('./helpers/db');
const Products = require('./models/Products');

// use express js 
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// set ejs
app.set('view engine', "ejs");

// home route '/'
app.get('/', (request, response) => {
    // response.send('Welcome to my Superamarket')
    // response.sendFile(__dirname + '/index.html')
    response.render('./cover/index', {username: "John Doe", email:"john@email.com" } );
});

// about route '/about'
app.get('/about', (req, res) => {
    const username = req.query.username
    res.send("This is information about the supermarket " + username);
})

// login route '/login'
app.get('/login', (req, res) => {
    // res.send("This is the login page");
    res.render('./sign-in/index',{email: null} )
})
app.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    // res.send("My email is " + email + ". And my password is " + password);
    res.render('./sign-in/index', {email: email} )
})

// dashboard route '/dashboard'
app.get('/dashboard', async(req, res)=> {
    let successMessage = null;
    let errMessage = null;
    try {
        await Products.findAll().then((products) => {
            console.log(products)
            successMessage = "Successful connection to database";
            res.render('./dashboard/index', 
                {
                    products: products, 
                    success: successMessage,
                    error: errMessage,
        
                },);
        } );
        
        
        
    } catch (err) {
        console.log(err)
        errMessage = "Error: " + err;
        res.render('./dashboard/index', 
            {
                // products: products, 
                success: successMessage,
                error: errMessage,
    
            },);
    }
});

// add product route
app.get('/add-product', (req, res) => {
    res.render('./product/index', {message: null})
});
app.post('/dashboard', async (req, res) => {
    const prodName = req.body.prodName;
    const prodPrice = req.body.prodPrice;
    let message = '';
    try{
        const product = await Products.create({
            prodName: prodName,
            prodPrice: prodPrice
        });
        message = "Product " + prodName + " created successfully";
        res.redirect('/dashboard', 201, {successMessage: message})
    } catch(err){
        message = "Error: " + err;
        res.redirect('/add-product',{ message: message });
    }
});
// edit product route 

// delete product route

// sync database
// db.sync({force: true});
db.sync()

// start application and listen on port 5000
app.listen(5000,() => {
        console.log("Application running on port: ", 5000)
    }
);