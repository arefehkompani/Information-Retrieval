const reader = require('xlsx')
const Tokenizer = require('./Tokenizer')
const Normalizer = require('./Normalizer')
const fs = require('fs');
const Path = require('path')

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
            if (i<500) {
                this.contents[i] = rows['content']
                this.docs_url[i] = rows['url']
                this.docs_title[i] = rows['title']
                this.docs_id[i] = i
            }
        })
    }

    create_file(text){
        fs.writeFile('Dictionary.json', JSON.stringify(text), 'utf8', function (err) {
            if (err) return console.log(err);
            //console.log('created');
          });
    }

    create_dictionary() {
        let tokenizer = new Tokenizer
        let normalizer = new Normalizer
        let positional_index = {}
        let doc_tokens_content = []
        let numtoken = 0
        //let contents = ["سلام دانشگاه امیرکبیر خوبی سلام چطوری دانشگاه علموص صنعتی عارفه خوبه 1400آبان ما رفتیم","آبان 99 گفته شد دانشگاه صنعتی امیرکبیر که کرونا داشتم"," صنعتی"]
        this.contents.map((content,id) => {
            //Get all tokens in the excel file
            let doc_tok = tokenizer.set_tokenizer(content)
            let normal = normalizer.set_normalizer(doc_tok)
            numtoken += doc_tok.length
            //Array.prototype.push.apply(doc_tok_total,doc_tok)
            Array.prototype.push.apply(doc_tokens_content,normal)
            console.clear()
            console.log("create token of content: " + id);
        })
        
        console.log("Token total length: "+numtoken);
        console.log("Normal total length: "+doc_tokens_content.length);
        doc_tokens_content = [...new Set(doc_tokens_content)]
        let alltokenlength = doc_tokens_content.length*500
        console.log(alltokenlength);
        doc_tokens_content.map((token,id) => {
            //Check the tokens with the content to find the position
            positional_index[token] = {}
            
            let sumtotal = 0
            this.contents.map((content,tokenid) => {
                if (tokenid<500) {
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
                    console.clear()
                    console.log("in process: "+ alltokenlength--)
                }
            })
            //console.log(positional_index);
        })
         
        normalizer.get_heaplaw()
        return positional_index
    }
    sorted(unordered){
        const ordered = Object.keys(unordered).sort().reduce(
            (obj, key) => { 
              obj[key] = unordered[key]; 
              return obj;
        },{});
        //console.log(ordered);
        return ordered
    }
    set_dictionary() {
        let dict = this.create_dictionary()
        this.create_file(dict)
        return dict
    }
}