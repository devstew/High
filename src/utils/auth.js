
import Auth0Lock from 'auth0-lock'
const authDomain = 'stewie.auth0.com'
const clientID = 'ShWRDOnZrsnyLgWM3xXdyBoGNkWEF8I0'

class AuthService {
    constructor(){
        this.lock = new Auth0Lock(clientID, authDomain, {
            auth:{
                params: {
                    scope: 'opedid email'
                },
            },
        })

        this.showLock = this.showLock.bind(this)

        this.lock.on('authenticated', this.authProcess.bind(this))
    }

    authProcess = (authResult) => {
        console.log(authResult)
    }

    showLock(){
        this.lock.show()
    }

    setToken = (authFields) => {
        let{
            idToken,
            exp
        } = authFields
        localStorage.setItem('idToken', idToken)
        localStorage.setItem('exp', exp * 1000)
    }

    isCurrent = () => {
        let expString = localStorage.getItem('exp')
        if(!expString) {
            localStorage.removeItem('idToken')
            return false
        }
        let now = new Date()
        let  exp = new Date(parseInt(expString, 10)) // 10 is radix param
        if( exp < now) {
            this.logout()
            return false
        }else{
            return true
        }
    }

    getToken() {
      let idToken = localStorage.getItem('idToken')
      if(this.isCurrent() && idToken)
      {
          return idToken
      }else{
          localStorage.removeItem('idToken')
          localStorage.removeItem('exp')
          return false
      }
    }

    logout = () => {
        localStorage.removeItem('idToken')
        localStorage.removeItem('exp')
        //location.reload()
    }
}

const auth = new AuthService()
export default auth