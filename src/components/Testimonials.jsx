import React from 'react'
import styles from './Testimonials.module.css'

const SIDE_AVATARS_LEFT = [
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face', size: 'md', pos: 'top' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face', size: 'lg', pos: 'mid' },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face', size: 'md', pos: 'bot' },
]

const SIDE_AVATARS_RIGHT = [
  { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face', size: 'md', pos: 'top' },
  { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face', size: 'lg', pos: 'mid' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face', size: 'md', pos: 'bot' },
]

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={`container ${styles.inner}`}>

        {/* Left floating avatars */}
        <div className={styles.avatarGroup}>
          {SIDE_AVATARS_LEFT.map((av, i) => (
            <div key={i} className={`${styles.avatar} ${styles[av.size]} ${styles[`left_${av.pos}`]}`}>
              <img src={av.src} alt="" />
            </div>
          ))}
        </div>

        {/* Center content */}
        <div className={styles.center}>
          <h2 className={styles.heading}>
            <span className={styles.highlightPill}>What</span> our customer<br />
            says <span className={styles.underline}>
              About Us
              <svg className={styles.scribble} viewBox="0 0 120 20" preserveAspectRatio="none">
                <path d="M5,15 Q15,5 25,10 T45,10 T65,10 T85,10 T105,10" stroke="#f5d108" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <div className={styles.quoteCard}>
            <span className={styles.openQuote}>"</span>
            <p className={styles.quoteText}>
              Elementum delivered the site with inthe timeline as they requested. Inthe end, the client found a 50%
              increase in traffic with in days since its launch. They also had an impressive ability to use technologies that
              the company hasn't used, which have also proved to be easy to use and reliable
            </p>
            <span className={styles.closeQuote}>"</span>
          </div>
        </div>

        {/* Right floating avatars */}
        <div className={styles.avatarGroup}>
          {SIDE_AVATARS_RIGHT.map((av, i) => (
            <div key={i} className={`${styles.avatar} ${styles[av.size]} ${styles[`right_${av.pos}`]}`}>
              <img src={av.src} alt="" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
