const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://Rasmus:${password}@cluster0-cisxd.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = Person({
  name: process.argv[3],
  number: process.argv[4], })

if(person.name !== undefined && person.number !== undefined)

{
  person.save().then(() => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close() })

}

else { Person
  .find({})
  .then(result => {
    console.log('phonebook: ')
    result.forEach(person => {
      console.log(person.name, person.number) })
    mongoose.connection.close() }) }