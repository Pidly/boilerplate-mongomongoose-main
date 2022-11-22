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

let food = "Coconut";

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, person) => {
    if (err) {
      return console.error(err);
    }
    done(null, person);
  })
};

let personId = 1;
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, person) => {
    if (err) {
      return console.error(err);
    }
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) {
      return console.log(err);
    }

    console.log(person);
    
    const foodToAdd = "hamburger";
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if (err) {
        return console.error(err);
      }
  
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, person) => {
    if(err) {
      return console.log(err);
    }
    done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      return console.log(err);
    }
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) {
      return console.log(err);
    }
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort({name: 1})
        .limit(2)
        .select({age: 0})
        .exec((err, data) => {
          if (err) {
            console.log(err);
          }
          done(null, data);
        })
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
