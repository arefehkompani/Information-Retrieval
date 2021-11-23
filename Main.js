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
        let tt = this.Tokenizer.set_tokenizer("ایسنا/اصفهان سرمربی تیم فوتسال فولادمبارکه سپاهان اعتقاد دارد تیمش در چند پست با کمبود بازیکن روبرو است که با رفع آن بهتر ظاهر خواهند شد. قواعد")
        return this.Normalizer.set_normalizer(tt)
    }
}

const main = new Main()
console.log(main.xa())
