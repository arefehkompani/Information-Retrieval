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
        let reserve = []
        let r = 0
        postings.map((word,key) => {
            for ( let i = 0; i < Object.keys(postings[key]).length-1; i++) {
                let posting_key = Object.keys(postings[key])[i]
                if(!reserve.includes(posting_key)) {
                    reserve[r] = posting_key
                    r++
                }
            }
        })
        this.check_position(postings,reserve)
    }

    check_position(postings, reserve){
        let positions = {}
        reserve.map(docid => {
            let total = []
            postings.map((word,key) => {
                if (Object.keys(word).includes(docid)) {
                    let pos = Object.values(word[docid])
                    pos.pop()
                    total = total.concat(pos)
                    positions[docid] = []
                    positions[docid] = positions[docid].concat(total)
                }
            })
            
        })
        console.log(positions);
    }

    kind_query(query){
        query.split(' ').length==1 ? this.one_word_query(query) : this.multi_word_query(query)
    }
}