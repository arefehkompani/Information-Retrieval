const Marks = require('./Marks')
const Regex = require('./Regex')
const Verbs = require('./Verbs')

class Main {
    constructor(){
        this.Mark = new Marks
        this.Regex = new Regex
        this.Verbs = new Verbs
    }

    xa(){
        // console.log(Marks.punctuation)
        return this.Verbs.all_verbs()
    }
}

const main = new Main()
console.log(main.xa())
