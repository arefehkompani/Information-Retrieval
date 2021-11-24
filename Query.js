const Dictionary = require('./Dictionary')
const Tokenizer = require('./Tokenizer')
const Normalizer = require('./Normalizer')

module.exports = class Query {
    constructor(){
        this.Dictionary = new Dictionary
        this.Tokenizer = new Tokenizer
        this.Normalizer = new Normalizer

        this.dictionary = this.Dictionary.set_dictionary()
    }
    
    one_word_query(query) {
        let query_normal = []
        query_normal = this.Normalizer.set_normalizer([query])
        Object.keys(this.dictionary).map((rows,key) => {
            if (rows == query_normal) {
                for (let i = 0; i < Object.keys(this.dictionary[rows]).length-1; i++) {
                    console.log(this.Dictionary.docs_title[Object.keys(this.dictionary[rows])[i]-1])
                }
            }
        })
    }

    multi_word_query(query){
        let query_normal = []
        let query_token = []
        query_token = this.Tokenizer.set_tokenizer(query)
        query_normal = this.Normalizer.set_normalizer(query_token)

        let postings = []
        Object.keys(this.dictionary).map((rows,key) => {
            query_normal.map(token => {
                if (rows==token) {
                    postings.push(this.dictionary[rows])
                }
            })
        })
        console.log(postings);
        
        postings.map((word,key) => {
            for (let i = 0; i < Object.keys(postings[key]).length-1; i++) {
                console.log(Object.keys(postings[key])[i])
            }
        })
        // console.log(postings);
    }

    kind_query(query){
        query.split(' ').length==1 ? this.one_word_query(query) : this.multi_word_query(query)
    }
}