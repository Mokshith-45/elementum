import React from 'react'
import styles from './Hero.module.css'

/* Using picsum photos as realistic face placeholders */
const TEAM_PHOTOS = [
  // Group 1 (top)
  { id: 1, src: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=160&h=160&fit=crop&crop=face', style: 'pos1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=160&h=160&fit=crop&crop=face', style: 'pos2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=160&h=160&fit=crop&crop=face', style: 'pos3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&fit=crop&crop=face', style: 'pos4' },
  // Group 2 (bottom)
  { id: 5, src: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=160&h=160&fit=crop&crop=face', style: 'pos5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?w=160&h=160&fit=crop&crop=face', style: 'pos6' },
  { id: 7, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face', style: 'pos7' },
  { id: 8, src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face', style: 'pos8' },
]

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Decorative lines left */}
      <div className={styles.squiggleLeft}>
        <svg width="50" height="140" viewBox="0 0 50 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Red line */}
          <path
            d="M15 10 C10 30, 20 55, 10 80 C0 105, 20 125, 8 140"
            stroke="#E53935"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Black line */}
          <path
            d="M35 10 C30 30, 40 55, 30 80 C20 105, 40 125, 28 140"
            stroke="#000000"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Decorative blob right - perfect semicircle */}
      <div className={styles.blobRight}>
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="110" r="100" fill="#7B2D8B" opacity="0.25" />
          <path
            d="M10 110 A100 100 0 0 1 210 110 L210 200 C210 210, 205 215, 195 215 L25 215 C15 215, 10 210, 10 200 Z"
            fill="#d10bf9"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.textBlock}>
          <h1 className={styles.headline}>
            The{' '}
            <span className={`${styles.highlight} ${styles.highlightYellow}`}>
              thinkers
              <svg className={styles.scribble} viewBox="0 0 120 20" preserveAspectRatio="none">
                <path d="M5,15 Q15,5 25,10 T45,10 T65,10 T85,10 T105,10" stroke="#f8d408" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            and<br />
            doers were{' '}
            <span className={`${styles.highlight} ${styles.highlightPink}`}>
              changing
            </span>
            <br />
            the{' '}
            <span className={`${styles.highlight} ${styles.highlightGreen}`}>
              status
            </span>{' '}
            Quo with
          </h1>

          <p className={styles.subtitle}>
            We are a team of strategists, designers communicators, researchers. Together,<br />
            we believe that progress only happens when you refuse to play things safe.
          </p>
        </div>

        {/* Floating circular team photos */}
        <div className={styles.photosGrid}>
          {TEAM_PHOTOS.map(photo => (
            <div key={photo.id} className={`${styles.photoCircle} ${styles[photo.style]}`}>
              <img src={photo.src} alt="Team member" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
