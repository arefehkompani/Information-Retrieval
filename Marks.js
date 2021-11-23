module.exports = class Marks {
  punctuation = [')','(','>','<',"؛","،",'{','}',"؟",':',"-", '»', '"', '«', '[', ']','"','+','=','?']
  marks = ['/','//', '\\','|','!', '%', '&','*','$', '#','؟', '*','.','_' ]
  alphabet_string_lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q','r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  alphabet_string_upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  english_char = this.alphabet_string_lower.concat(this.alphabet_string_upper)
  stopwords = ["در"]
  sep_list = [" ", '\xad', '\u200e','\u200f', '\u200d', '\u200d', '\u200d'].concat(this.marks)
}
  
