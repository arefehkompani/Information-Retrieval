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
            if (i<4) {
                this.contents[i] = rows['content']
                this.docs_url[i] = rows['url']
                this.docs_title[i] = rows['title']
                this.docs_id[i] = i
                               
            }
        })
    }

    create_dictionary() {
        let tokenizer = new Tokenizer
        let normalizer = new Normalizer
        let term_position_in_doc = 1
        let positional_index = {}
        let doc_tokens_content = []

        let contents = ["سلام داشتم مسلمی در مجمد شده استاد خر1400", "من مدرسه پگاه بودم مدیر خری داشت"]
        contents.map((content,id) => {
            //Get all tokens in the excel file
            let doc_tok = tokenizer.set_tokenizer(content)
            let normal = normalizer.set_normalizer(doc_tok)
            Array.prototype.push.apply(doc_tokens_content,normal)
        })

        doc_tokens_content = [...new Set(doc_tokens_content)]
        
        doc_tokens_content.map((token,id) => {
            //Check the tokens with the content to find the position
            positional_index[token] = {}
            contents.map((content,tokenid) => {
                let match
                var re = RegExp(`${token}`, 'g')
                content = tokenizer.set_tokenizer(content)
                content = normalizer.set_content_normal(content)
                while ((match = re.exec(content)) != null) {
                    
                    console.log(token,tokenid,match.index);
                    positional_index[token][tokenid] = [match.index]
                    //console.log("match found at " + match.index);
                }
            })
        })
        //console.log(positional_index);
    }

    set_dictionary() {
        this.create_dictionary()
    }
}