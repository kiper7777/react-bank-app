import {
    Form,
    REG_EXP_EMAIL,
    REG_EXP_PASSWORD,
  } from './script/form'; 
import { saveSession } from './script/session';

class SignupPageClass extends Form {
    FIELD_NAME = {
      EMAIL: 'email',
      PASSWORD: 'password',
    }

    FIELD_ERROR = {
      IS_EMPTY: 'Введіть значення в поле',
      IS_BIG: 'Дуже довге значення, приберіть зайве',
      EMAIL: 'Введіть коректне значення email адреси',
      PASSWORD: 'Пароль повинен складатися з не менше ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру',
    }

    validate = (name, value) => {
      if (String(value).length < 1) {
        return this.FIELD_ERROR.IS_EMPTY
      }

      if (String(value).length > 20) {
        return this.FIELD_ERROR.IS_BIG
      }

      if (name === this.FIELD_NAME.EMAIL) {
        if (!REG_EXP_EMAIL.test(String(value))) {
          return this.FIELD_ERROR.EMAIL
        }
      }

      if (name === this.FIELD_NAME.PASSWORD) {
        if (!REG_EXP_PASSWORD.test(String(value))) {
          return this.FIELD_ERROR.PASSWORD
        }
      }
    }

    submit = async () => {
      if (this.disabled === true) {
        this.validateAll()
      } else {
        console.log(this.value)

        this.setAlert('progress', 'Завантаження...')

        try {
          const res = await fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: this.convertData(),
          })

          const data = await res.json()

          if (res.ok) {
            this.setAlert('success', data.message)
            saveSession(data.session)
            location.assign('/')
          } else {
            this.setAlert('error', data.message)
          }
        } catch (error) {
          this.setAlert('error', error.message)
        }
      }
    }

    convertData = () => {
      return JSON.stringify({
        [this.FIELD_NAME.EMAIL]:
          this.value[this.FIELD_NAME.EMAIL],
        [this.FIELD_NAME.PASSWORD]:
          this.value[this.FIELD_NAME.PASSWORD],  

      })
    }
    
  }

  window.SignupPage = new SignupPage()

  return <SignupPageClass/>;