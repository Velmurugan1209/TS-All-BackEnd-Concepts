import CryptoJS from 'crypto-js' ;


const SECRET_KEY = 'my-very-secret-key' ;


const originalText = 'Hello World!' ;


const encrypted = CryptoJS.AES.encrypt(originalText, SECRET_KEY).toString() ;
console.log('Encrypted:', encrypted) ;


const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY) ;
console.log(bytes) ;
const decrypted = bytes.toString(CryptoJS.enc.Utf8) ;
console.log('Decrypted:', decrypted) ;



