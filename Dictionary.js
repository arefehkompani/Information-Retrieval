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
        let positional_index = {}
        let doc_tokens_content = []
        let contents = ["سلام دانشگاه خوبی سلام چطوری دانشگاه علموص عارفه خوبه 1400آبان ما رفتیم","آبان 99 گفته شد دانشگاه امیرکبیر که کرونا داشتم"]
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
            let sumtotal = 0
            contents.map((content,tokenid) => {
                let match
                var re = RegExp(`${token}`, 'g')
                let content_token = tokenizer.set_tokenizer(content)
                let pos = []
                content_token = normalizer.set_content_normal(content_token)
                while ((match = re.exec(content_token)) != null) {
                    let space = content.slice(0,match.index).match(new RegExp(` `, 'g'), '')
                    pos.push(space ? space.length+1 : 1)
                }
                if (pos.length != 0) {
                    positional_index[token][tokenid+1] = pos
                    positional_index[token][tokenid+1]['sum'] = pos.length
                }
                sumtotal += pos.length
                positional_index[token]['sum'] = sumtotal
            })
        })
        return positional_index
    }
    sorted(unordered){
        const ordered = Object.keys(unordered).sort().reduce(
            (obj, key) => { 
              obj[key] = unordered[key]; 
              return obj;
        },{});
        console.log(ordered);
        return ordered
    }
    set_dictionary() {
        return this.sorted(this.create_dictionary())
    }
}