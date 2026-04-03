import React from 'react'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={`container ${styles.inner}`}>

        {/* Left text column */}
        <div className={styles.textCol}>
          <h2 className={styles.heading}>
            <span className={styles.italicHighlight}>Tomorrow</span>{' '}
            should<br />
            be better than <span className={styles.underlineGreen}>today</span>
          </h2>
          <p className={styles.body}>
            We are a team of strategists, designers communicators, researchers.
            Together, we believe that progress only happens when you refuse
            to play things safe.
          </p>
          <a href="#" className={styles.readMore}>
            Read more <span className={styles.line} />
          </a>
        </div>

        {/* Right image column */}
        <div className={styles.imageCol}>
          {/* Decorative pink blob */}
          <div className={styles.pinkBlob} />

          {/* Red triangle decorations */}
          <div className={`${styles.triangle} ${styles.triangleTopRight}`}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <polygon points="40,0 80,80 0,80" fill="#e53935" />
            </svg>
          </div>
          <div className={`${styles.triangle} ${styles.triangleBottomLeft}`}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              <polygon points="28,0 56,56 0,56" fill="#e53935" />
            </svg>
          </div>

          {/* Circular image */}
          <div className={styles.circleImg}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=480&h=480&fit=crop"
              alt="Team meeting"
            />
          </div>
        </div>

      </div>

      {/* Decorative red swoosh line */}
      <div className={styles.swoosh}>
        <svg width="300" height="80" viewBox="0 0 300 80" fill="none">
          <path
            d="M0 40 C60 10, 120 70, 180 40 C240 10, 280 60, 300 40"
            stroke="#e53935"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  )
}
