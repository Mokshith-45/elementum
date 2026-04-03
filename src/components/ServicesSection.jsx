import React from 'react'
import styles from './ServicesSection.module.css'

const SERVICES = [
  {
    id: 1,
    label: 'Office of multiple interest content',
    title: 'Colaborative & partnership',
  },
  {
    id: 2,
    label: 'The hanger US Air force digital experiments',
    title: 'We talk about our weight',
  },
  {
    id: 3,
    label: 'Delta faucet content, social, digital',
    title: 'Piloting digital confidence',
  },
]

export default function ServicesSection() {
  return (
    <section className={styles.services}>
      {/* Decorative red swoosh top right */}
      <div className={styles.swoosh}>
        <svg width="400" height="180" viewBox="0 0 400 180" fill="none">
          <defs>
            <filter id="swooshShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
            </filter>
          </defs>
          <path
            d="M20 140 Q80 20, 150 60 T300 80 T420 50"
            stroke="#FF6B6B"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            
          />
        </svg>
      </div>

      <div className={`container`}>
        <h2 className={styles.heading}>
          What we <span className={styles.highlightCan}>can</span><br />
          <span className={styles.offerUnderline}>
            offer you!
            <svg className={styles.offerScribble} viewBox="0 0 150 25" preserveAspectRatio="none">
              <path d="M5,18 Q20,5 35,15 T65,15 T95,15 T125,15" stroke="#f5d10a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h2>

        <div className={styles.table}>
          {SERVICES.map((svc, i) => (
            <div key={svc.id} className={styles.row}>
              <div className={styles.rowLeft}>
                <span className={styles.rowLabel}>{svc.label}</span>
              </div>
              <div className={styles.rowCenter}>
                <span className={styles.rowTitle}>{svc.title}</span>
              </div>
              <div className={styles.rowRight}>
                <a href="#" className={styles.arrowLink} aria-label={`Learn more about ${svc.title}`}>
                  →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
