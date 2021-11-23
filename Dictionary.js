const reader = require('xlsx')
const Tokenizer = require('./Tokenizer')
const Normalizer = require('./Normalizer')


module.exports = class Read {
    contents = []
    docs_id = []
    docs_title = []
    docs_url = []
    docs_num = 0
    inverted_index = {}

    constructor(){ 
        const file = reader.readFile('./data/IR1_7k_news.xlsx')
        const sheets = file.SheetNames
        let data = []

        for(let i = 0; i < sheets.length; i++)
        {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }

        this.docs_num = data.length
        data.map((rows,i) => {
            this.contents[i] = rows['content']
            this.docs_url[i] = rows['url']
            this.docs_title[i] = rows['title']
            this.docs_id[i] = i
        })
    }

    create_dictionary() {
        let tokenizer = new Tokenizer
        let normalizer = new Normalizer
        let term_position_in_doc = 1

        this.contents.map((content,id) => {
            let doc_tokens = tokenizer.set_tokenizer(content)
            doc_tokens = normalizer.set_normalizer(doc_tokens)
            doc_tokens.map((token) => {

            })
        })
    }

    set_dictionary() {
        this.create_dictionary()
    }
}