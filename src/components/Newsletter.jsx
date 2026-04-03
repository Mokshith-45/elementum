import React, { useState } from 'react'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className={styles.newsletter}>
      {/* Decorative purple shape */}
      <div className={styles.purpleShape}>
        <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
          <path
            d="M80 0 C80 0, 20 20, 10 60 C0 100, 40 120, 40 120 L80 120 Z"
            fill="#7b2d8b"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Decorative red swoosh */}
      <div className={styles.swoosh}>
        <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
          <path
            d="M0 30 C30 10, 60 50, 90 30 C120 10, 140 45, 160 30"
            stroke="#e53935"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>
          Subscribe to<br />
          our newsletter
        </h2>
        <p className={styles.subtitle}>
          To make your stay special and even more memorable
        </p>

        {submitted ? (
          <div className={styles.successMsg}>
            Thank you for subscribing! 🎉
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <button type="submit" className={styles.btn}>
              Subscribe Now
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
