const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// //Iteration 2 - Create a recipe
let someRecipe = {
  title: "Rigatoni alla Genovese",
  level: "Easy Peasy",
  ingredients: [
    "2 pounds red onions, sliced salt to taste",
    "2 (16 ounce) boxes uncooked rigatoni",
    "1 tablespoon chopped fresh marjoram leaves",
    "1 pinch cayenne pepper",
    "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
  ],
  cuisine: "Italian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
  duration: 220,
  creator: "Chef Luigi"
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {

// Iteration 2 - Create a recipe
let createPromise = Recipe.create(someRecipe)
   .then((result) => {
     console.log("title", result)
   })
   .catch((err) => {
       console.log('Something went wrong while inserting')
    })

// Iteration 3 - Insert multiple recipes
let insertPromise = Recipe.insertMany(data)
  .then(() => {
      console.log('multiple recipes created')
  })
  .catch(() => {
      console.log('Something went wrong while inserting')
  })

// // Iteration 4 - Update recipe
  Promise.all([createPromise, insertPromise]) 
    .then(() => {
      Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then((result) => {
        console.log('updated', result)
      })
  })
  .catch(() => {
      console.log('Something went wrong while inserting')
  })

  // Iteration 5 - Remove a recipe
  // .then(() => {
  //   Recipe.deleteOne({ title: 'Carrot Cake' })
  //     .then((result) => {
  //       console.log('deleting recipe', result)
  //   })
  //   .catch(() => {
  //     console.log('Something went wrong while inserting')
})

// Iteration 6 - Close the Database
mongoose.connection.close()

 
  
 
  
  
  