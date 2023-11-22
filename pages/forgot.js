import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

import Link from 'next/link'

import styles from '../styles/Login.module.css'

import LoginCard from '../src/components/cards/loginCard/login'
import Input from '../src/components/forms/input/input'
import Button from '../src/components/forms/button/button'

export default function ForgotPage() {
  const [form, setForm] = useState({
    email: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChangeForm = (event, field) => {
    setForm({
      ...form,
      [field]: event.target.value
    })
  }

  const handleForm = async (e) => {
    e.preventDefault()

    if (!form.email) return setError('O e-mail é obrigatório')

    setError('')
    try {
      const response = await fetch('/api/user/forgot', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      const json = await response.json()

      if (response.status !== 200) throw new Error(json)
      setCookie('authorization', json)
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Recupere sua senha">
        <form className={styles.form}>
          <Input type="e-mail" placeholder="Seu e-mail" value={form['email']} onChange={(event) => handleChangeForm(event, 'email')} />
          <Button onClick={handleForm}>Continuar</Button>
          {error && <p className="error">{error}</p>}
        </form>
      </LoginCard>
    </div>
  )
}
