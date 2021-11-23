const Marks = require('./Marks')
const Verbs = require('./Verbs')

module.exports = class Normalizer {

    constructor(){
        this.Marks = new Marks
        this.Verbs = new Verbs
    }

    remove_punctuation_marks(word_list){
        for(let i=0 ; i<word_list.length ; i++){
            this.Marks.punctuation.map(mark => {
                word_list[i] = word_list[i].replaceAll(mark,"")
            })
        }
        return word_list
    }

    edit_long_letters(word_list){

    }

    remove_mokassar(word_list){
        word_list.map((rows,i) => {
            if (this.Verbs.mokassar_dict().hasOwnProperty(rows)) {
                word_list[i] = this.Verbs.mokassar_dict()[rows]
            }
        })
        console.log(word_list)
    }

    remove_arabic_notation(word_list){

    }

    create_translation_table(src_list, dst_list, word_list){
        word_list.map((rows,j) => {
           for (let i = 0; i < src_list.length; i++) {
               rows = rows.replaceAll(src_list.substr(i,1) ,dst_list.substr(i,1))
               word_list[j] = rows
           }
       })
       return word_list
    }

    char_digit_Unification(word_list){
        word_list.map((x,i) => {
            if(isNaN(x) || (!isNaN(x) & parseFloat(x)<3000)){
                word_list[i] = x
            }
        })
        let translation_src = ' یکی""' // change arabic form of letterts to persian
        let translation_dst = ' ىكي“”'
        translation_src += 'ئ0123456789أإآ%'
        translation_dst += 'ی۰۱۲۳۴۵۶۷۸۹ااا٪'
        
        return this.create_translation_table(translation_src, translation_dst, word_list)
    }

    verb_Steaming(word_list){

    }

    remove_prefix(word_list){

    }

    remove_postfix(word_list){

    }

    morakab_Unification(word_list){

    }

    set_normalizer(word_list){
        word_list = this.remove_punctuation_marks(word_list)
        word_list = this.edit_long_letters(word_list)
        word_list = this.remove_mokassar(word_list)
        word_list = this.remove_arabic_notation(word_list)
        word_list = this.char_digit_Unification(word_list)
        word_list = this.verb_Steaming(word_list)
        word_list = this.remove_prefix(word_list)
        word_list = this.remove_postfix(word_list)
        words_list = this.morakab_Unification(word_list)
        return word_list
    }
}