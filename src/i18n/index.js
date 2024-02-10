import { createI18n } from "vue-i18n";
const messages = {
    en:{
        msg:{
            title:'user login'
        }
    },
    zh:{
        msg:{
            title:'用户登录'
        }
    }
}

const getCurrentLanguage=()=>{
    const UAlang = navigator.language
    const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
    localStorage.setItem('lang',langCode)
    return 'en'
}
const i18n = createI18n({
    legacy:false,
    globalInjection:true,
    locale:getCurrentLanguage()||'zh',
    mmessages:messages
})

export default i18n