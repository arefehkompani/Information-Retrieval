const reader = require('xlsx')


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

    create_dictionary(cont, docid) {
        
    }

    delete_stopwords() {

    }

    set_doctionary() {
        //this.create_dictionary()
    }
}