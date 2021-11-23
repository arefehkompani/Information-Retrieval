const Marks = require('./Marks')
const Regex = require('./Regex')
const Verbs = require('./Verbs')
const Dictionary = require('./Dictionary')
const Tokenizer = require('./Tokenizer')
const Normalizer = require('./Normalizer')

class Main {
    constructor(){
        this.Mark = new Marks
        this.Regex = new Regex
        this.Verbs = new Verbs
        this.Dictionary = new Dictionary
        this.Tokenizer = new Tokenizer
        this.Normalizer = new Normalizer
    }

    xa(){
        // console.log(Marks.punctuation)
        let tt = this.Tokenizer.set_tokenizer("ابیآمن یب124 قواعد")
        return this.Normalizer.remove_mokassar(tt)
    }
}

const main = new Main()
console.log(main.xa())
