module.exports = class Verbs {

    present_roots =['توان','باش','رو','بر','یاور', 'یانداز', 'یای','یاندیش','بخش','باز','خر','بین','شنو','دار','دان','رسان','شناس','گو','گذار','یاب','لرز','ساز','شو','نویس','خوان','کاه','گیر','خواه','کن' ]
    past_roots = ['توانست','بود','کرد','اورد','انداخت','امد','خرید','باخت','برد','رفت','اندیشید','بخشید','دید','شنید','داشت','دانست','رساند','شناخت','گفت','گذشت','یافت','لرزید','ساخت','شد','نوشت','خواند','کاست','گرفت','خواست']
    all_verbs_roots = this.present_roots.concat(this.past_roots)
    empty_list = ['','','','','','','']
    verb_prefix = ['نمی‌', 'می‌','ن','ب',"" ]
    present_verb_postfix = ['م','ی','د','ید','ند','یم']
    past_verb_postfix = ['ایم','اید','ای','ام','اند']
    past_verb_postfix2 = ['م','ی','ید','ند','یم']

    all_verbs() {
        let all_verbs = {}
        console.log(this.verb_prefix)
        this.verb_prefix.map(pref => {
            for(let x=0 ; x<this.present_roots.length ; x++ ){
                let present_root = this.present_roots[x]
                this.present_verb_postfix.map(post => {
                    all_verbs[pref+present_root+post] = present_root
                })
            }
            for(let x=0 ; x<this.past_roots.length ; x++ ){
                let past_root = this.past_roots[x]
                this.past_verb_postfix.map(post => {
                    all_verbs[past_root+'ه‌'+post] = past_root
                })
                this.past_verb_postfix2.map(post => {
                    all_verbs[pref+past_root+post] = past_root
                })
            }
            console.log(all_verbs)
            // for(present_root, past_root in zip(present_roots, past_roots)){
                // for(post in past_verb_postfix2)
                //     all_verbs[pref + past_root+post] = past_root      //نمیرفنم || رفتم
                // for(post in past_verb_postfix)
                //     all_verbs[past_root+'ه‌'+post] = past_root        //رفته‌ایم
                // for(post in present_verb_postfix)
                //     all_verbs[pref+present_root+post] = present_root  // نمی‌روم
            // }
            //console.log(all_verbs);   
        })    
    }
  
}

