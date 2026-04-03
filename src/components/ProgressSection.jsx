import React, { useEffect, useRef, useState } from 'react'
import styles from './ProgressSection.module.css'

export default function ProgressSection() {
  const progressRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current)
      }
    }
  }, [])

  return (
    <section className={styles.progress} ref={progressRef}>
      {/* ===== TOP SECTION: Text Left, Image Right ===== */}
      <div className={`container ${styles.topSection} ${isVisible ? styles.animate : ''}`}>
        <div className={styles.textCol}>
          <h2 className={`${styles.heading} ${isVisible ? styles.animate : ''}`}>
            <span className={styles.wordYellow}>
              Tomorrow
              <svg className={`${styles.scribble} ${isVisible ? styles.animate : ''}`} width="120" height="16" viewBox="0 0 120 16" fill="none">
                <path
                  d="M 2 12 Q 8 8, 15 10 T 30 10 T 45 10 T 60 10 T 75 10 T 90 10 T 105 12"
                  stroke="#faea0a"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span> should be better than <span className={styles.wordGreen}>today</span>
          </h2>
          <p className={`${styles.body} ${isVisible ? styles.animate : ''}`}>
            We are a team of strategists, designers communicators, researchers. Together, we believe that progress only happens when you refuse to play things safe.
          </p>
          <a href="#" className={`${styles.readMore} ${isVisible ? styles.animate : ''}`}>
            Read more 
            <svg className={styles.arrow} width="50" height="16" viewBox="0 0 50 16" fill="none">
              <line x1="2" y1="8" x2="42" y2="8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="40,5 45,8 40,11" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Right image column */}
        <div className={styles.imageCol}>
          {/* Red triangles */}
          <div className={`${styles.triangle} ${styles.triTopRight} ${isVisible ? styles.animate : ''}`}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <polygon points="35,0 70,70 0,70" fill="#e53935" />
            </svg>
          </div>
          <div className={`${styles.triangle} ${styles.triBottomLeft} ${isVisible ? styles.animate : ''}`}>
            <svg width="48" height="48" viewBox="0 0 48 48">
              <polygon points="24,0 48,48 0,48" fill="#e53935" />
            </svg>
          </div>

          {/* Circular image */}
          <div className={`${styles.circleImg} ${isVisible ? styles.animate : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=480&h=480&fit=crop"
              alt="Team meeting"
            />
          </div>
        </div>
      </div>

      {/* ===== BOTTOM SECTION: Image Left, Text Right ===== */}
      <div className={`container ${styles.bottomSection} ${isVisible ? styles.animate : ''}`}>
        {/* Left image column */}
        <div className={styles.imageCol}>
          {/* Red triangles */}
          <div className={`${styles.triangle} ${styles.triTopLeft} ${isVisible ? styles.animate : ''}`}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <polygon points="35,0 70,70 0,70" fill="#e53935" />
            </svg>
          </div>
          <div className={`${styles.triangle} ${styles.triBottomRight} ${isVisible ? styles.animate : ''}`}>
            <svg width="48" height="48" viewBox="0 0 48 48">
              <polygon points="24,0 48,48 0,48" fill="#e53935" />
            </svg>
          </div>

          {/* Circular image */}
          <div className={`${styles.circleImg} ${isVisible ? styles.animate : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=480&h=480&fit=crop"
              alt="Team working"
            />
          </div>
        </div>

        {/* Right text column */}
        <div className={styles.textCol}>
          <h2 className={`${styles.heading} ${isVisible ? styles.animate : ''}`}>
            <span className={styles.wordGreen}>See</span> how we can help you{' '}
            <span className={styles.wordYellow}>
              progress
              <svg className={`${styles.scribble} ${isVisible ? styles.animate : ''}`} width="120" height="16" viewBox="0 0 120 16" fill="none">
                <path
                  d="M 2 12 Q 8 8, 15 10 T 30 10 T 45 10 T 60 10 T 75 10 T 90 10 T 105 12"
                  stroke="#f6e607"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>
          <p className={`${styles.body} ${isVisible ? styles.animate : ''}`}>
            We add a layer of fearless insights and action that allows change
            makers to accelerate their progress in areas such as brand, design
            digital, comms and social research.
          </p>
          <a href="#" className={`${styles.readMore} ${isVisible ? styles.animate : ''}`}>
            Read more 
            <svg className={styles.arrow} width="50" height="16" viewBox="0 0 50 16" fill="none">
              <line x1="2" y1="8" x2="42" y2="8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="40,5 45,8 40,11" stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Connecting red curve line */}
      <svg className={`${styles.connectingCurve} ${isVisible ? styles.animate : ''}`} viewBox="0 0 1000 800" preserveAspectRatio="none">
        <path
          d="M 750 100 Q 850 250, 800 400 Q 750 550, 350 700"
          stroke="#ff6b5b"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </section>
  )
}
