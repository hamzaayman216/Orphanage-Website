//CONNECTIONS START HERE




// Import the express web framework
const express = require("express");

// Create an instance of an Express.js app
const app = express();

// Import the path module
const path = require('path');

// Import the mongoose library for interacting with MongoDB databases
const mongoose = require("mongoose");

// Import the bcrypt library for hashing and comparing passwords
const bcrypt = require('bcrypt');

// Import the express-session library for managing sessions in an Express.js app
const session = require('express-session');

// Import the User model for interacting with the "users" collection in the database
const User = require('./models/user');

// Import the Event model for interacting with the "events" collection in the database
const Event = require('./models/event');

// Import the Job model for interacting with the "jobs" collection in the database
const Job = require("./models/jobopp");

// Import the Admin model for interacting with the "admins" collection in the database
const Admin = require("./models/admin");

// Import the Donation model for interacting with the "donations" collection in the database
const Donation = require("./models/donation");

// Set the "strictQuery" option for all connections made using Mongoose
mongoose.set('strictQuery', true);

// Connect to the MongoDB database using Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/latestdb", {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true // Use the unified topology engine
})
  .then(() => {
    // Connection was successful
    console.log("open");
  })
  .catch(err => {
    // There was an error connecting to the database
    console.log("error");
    console.log(err);
  });




//CONNECTIONS END HERE





//SET START HERE



// Set the directory for the application's views
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to be EJS
app.set('view engine', 'ejs');

// Parse the request body and populate the request.body object
app.use(express.urlencoded({extended: true}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Add a session to the request
app.use(session({secret: 'notagoodsecret'}))



//SET END HERE



//REQUIRE LOGIN FUNCTIONS START HERE


 
 // Define a middleware function that requires a user to be logged in to access a route
 const requireLogin = (req, res, next) => {
    // If there is no user_id stored in the session, redirect the user to the login route
    if (!req.session.user_id) {
       return res.redirect('/users/login');
    }
    // If a user_id is found, call the next middleware or route handler
    next();
 }
 


//REQUIRE LOGIN FUNCTIONS END HERE






//GET FUNCTIONS FOR ADMIN PAGES START HERE




// Define a route handler for the /admin/login route, which is accessed using the HTTP GET method
app.get('/admin/login', (req, res) => {
    // Render the admin/login view
    res.render('admin/login');
 });
 


 // Define a route handler for the /addevent route, which is accessed using the HTTP GET method
 app.get('/addevent', async (req, res) => {
    // Retrieve all events from the Event collection
    const addevent = await Event.find({});
    // Retrieve all users from the User collection
    const user = await User.find({});
    // Render the addevent/index view, passing in the addevent and user data as locals
    res.render('addevent/index', { addevent, user });
 });
 


 // Define a route handler for the /addjob route, which is accessed using the HTTP GET method
 app.get('/addjob', async (req, res) => {
    // Retrieve all jobs from the Job collection
    const addjob = await Job.find({});
    // Retrieve all users from the User collection
    const user = await User.find({});
    // Render the addjob/index view, passing in the addjob and user data as locals
    res.render('addjob/index', { addjob, user });
 });
 


 // Define a route handler for the /addon route, which is accessed using the HTTP GET method
 app.get('/addon', async (req, res) => {
    // Retrieve all donations from the Donation collection
    const don = await Donation.find({});
    // Render the addon/index view, passing in the don data as a local
    res.render('addon/index', { don });
 });
 


 // Define a route handler for the /adminhome/index route, which is accessed using the HTTP GET method
 app.get('/adminhome/index', (req, res) => {
    // Render the adminhome/index view
    res.render('adminhome/index');
 });




//GET FUNCTIONS FOR ADMIN PAGES END HERE





//GET FUNCTIONS FOR USER PAGES START HERE




// Define a route handler for the /events route, which is accessed using the HTTP GET method
// This route requires the user to be logged in, and will check for this using the requireLogin middleware function
app.get('/events', requireLogin, async (req, res) => {
    // Retrieve all events from the Event collection
    const events = await Event.find({});
    // Render the events/index view, passing in the events data as a local
    res.render('events/index', { events });
 });
 


// Define a route handler for the /events/:id route, which is accessed using the HTTP GET method
app.get('/events/:id', async (req, res) => {
    // Retrieve the event from the Event collection using the Event.findById method
    const event = await Event.findById(req.params.id);
    // Retrieve the user from the User collection using the User.findById method
    const user = await User.findById(req.session.user_id);
    // Check if the user is already registered for the event
    for (let x of event.myusers) {
       // If the user is already registered for the event, render the events/thank view, passing in the event and user data as locals
       if (x == user.id) {
          return res.render('events/thank', { event, user });
       }
    }
    // If the user is not registered for the event, add the user to the event's list of registered users
    event.myusers.push(user);
    // Save the event to the database
    await event.save();
    // Render the events/show view, passing in the event and user data as locals
    return res.render('events/show', { event, user });
 });



// Define a route handler for the /jobopp/index route, which is accessed using the HTTP GET method
// This route requires the user to be logged in, and will check for this using the requireLogin middleware function
app.get('/jobopp/index', requireLogin, async (req, res) => {
   // Retrieve all jobs from the Job collection
   const jobs = await Job.find({});
   // Render the jobopp/index view, passing in the jobs data as a local
   res.render('jobopp/index', { jobs });
});



// Define a route handler for the /jobopp/index/:id route, which is accessed using the HTTP GET method
app.get('/jobopp/index/:id', async (req, res) => {
    // Retrieve the job from the Job collection using the Job.findById method
    const job = await Job.findById(req.params.id);
    // Retrieve the user from the User collection using the User.findById method
    const user = await User.findById(req.session.user_id);
    // Check if the user is already registered for the job
    for (let x of job.users) {
       // If the user is already registered for the job, render the jobopp/thank view, passing in the job and user data as locals
       if (x == user.id) {
          return res.render('jobopp/thank', { job, user });
       }
    }
    // If the user is not registered for the job, add the user to the job's list of registered users
    job.users.push(user);
    // Save the job to the database
    await job.save();
    // Render the jobopp/show view, passing in the job and user data as locals
    return res.render('jobopp/show', { job, user });
 });



// Define a route handler for the /users/signup route, which is accessed using the HTTP GET method
app.get('/users/signup', (req, res) => {
   // Render the users/signup view
   res.render('users/signup');
});



// Define a route handler for the /foodcloth/index route, which is accessed using the HTTP GET method
app.get('/foodcloth/index', (req, res) => {
   // Render the foodcloth/index view
   res.render('foodcloth/index');
});



// Define a route handler for the /aboutus/index route, which is accessed using the HTTP GET method
app.get('/aboutus/index', (req, res) => {
   // Render the aboutus/index view
   res.render('aboutus/index');
});



// Define a route handler for the /users/login route, which is accessed using the HTTP GET method
app.get('/users/login', (req, res) => {
    // Render the users/login view
    res.render('users/login');
 });
 


 // Define a route handler for the /donations/index route, which is accessed using the HTTP GET method
 // This route requires the user to be logged in, and will check for this using the requireLogin middleware function
 app.get('/donations/index', requireLogin, (req, res) => {
    // Render the donations/index view
    res.render('donations/index');
 });
 


 // Define a route handler for the /donform/index route, which is accessed using the HTTP GET method
 // This route requires the user to be logged in, and will check for this using the requireLogin middleware function
 app.get('/donform/index', requireLogin, (req, res) => {
    // Render the donform/index view
    res.render('donform/index');
 });



// Define a route handler for the /moneydon/index route, which is accessed using the HTTP GET method
// This route requires the user to be logged in, and will check for this using the requireLogin middleware function
app.get('/moneydon/index', requireLogin, (req, res) => {
   // Render the moneydon/index view
   res.render('moneydon/index');
});



// Define a route handler for the /visits/index route, which is accessed using the HTTP GET method
app.get('/visits/index', (req, res) => {
   // Render the visits/index view
   res.render('visits/index');
});



// Define a route handler for the /home/index route, which is accessed using the HTTP GET method
app.get('/home/index', (req, res) => {
   // Render the home/index view
   res.render('home/index');
});




//GET FUNCTIONS FOR USER PAGES END HERE





//POST FUNCTIONS FOR USER PAGES START HERE





// Define a route handler for the /users route, which is accessed using the HTTP POST method
app.post('/users', async (req, res) => {
    // Destructure the first, last, email, and password properties from the request body
    const {first, last, email, password} = req.body;
    // Create a new user object with the destructured properties
    const user = new User({
       first,
       last,
       email,
       password
    });
    // Save the user object to the database
    await user.save();
    // Store the user's id in the session
    req.session.user_id = user._id;
    // Redirect the user to the /home/index route
    res.redirect('/home/index');
 });



// Define a route handler for the /donform/thank route, which is accessed using the HTTP GET method
app.get('/donform/thank', (req, res) => {
   // Render the donform/thank view
   res.render('donform/thank');
});



// Define a route handler for the /logout route, which is accessed using the HTTP POST method
app.post('/logout', (req, res) => {
   // Destroy the current session
   req.session.destroy();
   // Redirect the user to the /users/login route
   res.redirect('/users/login');
});



// Define a route handler for the /donform/index route, which is accessed using the HTTP POST method
app.post('/donform/index', async (req, res) => {
   // Create a new donation object with the data from the request body
   const newDonation = new Donation(req.body);
   // Save the donation object to the database
   await newDonation.save();
   // Redirect the user to the /donform/thank route
   res.redirect('/donform/thank');
});



// Define a route handler for the /users/login route, which is accessed using the HTTP POST method
app.post('/users/login', async (req, res) => {
    // Destructure the email and password properties from the request body
    const {email, password} = req.body;
    // Find a user with the matching email and password, and validate the password
    const foundUser = await User.findAndValidate(email, password);
    // If a matching user is found
    if (foundUser) {
       // Store the user's id in the session
       req.session.user_id = foundUser._id;
       // Redirect the user to the /home/index route
       res.redirect('/home/index');
    } else {
       // If no matching user is found, or if the password is incorrect, redirect the user back to the /users/login route
       res.redirect('/users/login');
    }
 });






//POST FUNCTIONS FOR USER PAGES END HERE




//POST FUNCTIONS FOR ADMIN PAGES START HERE





// Define a route handler for the /admin/login route, which is accessed using the HTTP POST method
app.post('/admin/login', async (req, res) => {
    // Destructure the adminEmail and adminPassword properties from the request body
    const {adminEmail, adminPassword} = req.body;
    // Find an admin with the matching email and password, and validate the password
    const foundAdmin = await Admin.findAndValidateAdmin(adminEmail, adminPassword);
    // If a matching admin is found
    if (foundAdmin) {
       // Store the admin's id in the session
       req.session.admin_id = foundAdmin._id;
       // Redirect the user to the /adminhome/index route
       res.redirect('/adminhome/index');
    } else {
       // If no matching admin is found, or if the password is incorrect, redirect the user back to the /admin/login route
       res.redirect('/admin/login');
    }
 });



// Define a route handler for the /addevent route, which is accessed using the HTTP POST method
app.post('/addevent', async (req, res) => {
    // Create a new instance of the Event model, passing in the request body as the argument
    const newEvent = new Event(req.body);
    // Save the new event to the database
    await newEvent.save();
    // Redirect the user back to the /addevent route
    res.redirect('/addevent/');
 });
 


 // Define a route handler for the /addjob route, which is accessed using the HTTP POST method
 app.post('/addjob', async (req, res) => {
    // Create a new instance of the Job model, passing in the request body as the argument
    const newJob = new Job(req.body);
    // Save the new job to the database
    await newJob.save();
    // Redirect the user back to the /addjob route
    res.redirect('/addjob/');
 });





//POST FUNCTIONS FOR ADMIN PAGES END HERE





// Start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    // Log a message to the console when the server starts
    console.log("on port 3000");
 });