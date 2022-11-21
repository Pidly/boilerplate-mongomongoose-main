require('dotenv').config();
let mongoose = require('mongoose');

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

var mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'Ken',
    age: 24,
    favoriteFoods: ['Pizza']
  })

  person.save((err, data) => {
    if (err) {
      return console.error(err);
    }

    done(null, data);
  })
};

let arrayOfPeople = [
  {name: 'Penny', age: 20, favoriteFoods: ["Red Plate", "Roots Platter", "Tom Kha Soup"]},
  {name: 'Haley', age: 23, favoriteFoods: ["Coconut", "Fruit Salad", "Pink Cake"]}
];

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      return console.error(err);
    }

    done(null, people);
  });
};

let personName = "Penny";
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, person) => {
    if (err) {
      return console.error(err);
    }
    done(null, person);
  })
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
