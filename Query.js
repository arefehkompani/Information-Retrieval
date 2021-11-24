const Dictionary = require('./Dictionary')
const Tokenizer = require('./Tokenizer')
const Normalizer = require('./Normalizer')

module.exports = class Query {
    constructor(){
        this.Dictionary = new Dictionary
        this.Tokenizer = new Tokenizer
        this.Normalizer = new Normalizer
    }
    
    one_word_query(query) {
        const dictionary = this.Dictionary.set_dictionary()
        let query_normal = []
        query_normal = this.Normalizer.set_normalizer([query])
        Object.keys(dictionary).map((rows,key) => {
            if (rows == query_normal) {
                for (let i = 0; i < Object.keys(dictionary[rows]).length-1; i++) {
                    console.log(this.Dictionary.docs_title[Object.keys(dictionary[rows])[i]-1])
                }
            }
        })
    }

    multi_word_query(query){
        
    }

    kind_query(query){
        query.split(' ').length==1 ? this.one_word_query(query) : this.multi_word_query(query)
    }
}