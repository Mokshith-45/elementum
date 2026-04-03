import React from 'react'
import styles from './Footer.module.css'

const FOOTER_COLS = [
  {
    heading: 'Company',
    links: ['Home', 'Studio', 'Services', 'Blog'],
  },
  {
    heading: 'Terms & Policies',
    links: ['Privacy Policy', 'Terms & Conditions', 'Custom', 'Accessibility'],
  },
  {
    heading: 'Follow Us',
    links: ['Instagram', 'LinkedIn', 'Youtube', 'Twitter'],
  },
  {
    heading: 'Terms & Policies',
    isAddress: true,
    address: [
      '1498w Fluton ste, STE',
      '2D Chicago, IL 63867',
      '',
      '(123) 456789000',
      'Info@elementum.com',
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {FOOTER_COLS.map((col, i) => (
            <div key={i} className={styles.col}>
              <h4 className={styles.colHeading}>{col.heading}</h4>
              {col.isAddress ? (
                <address className={styles.address}>
                  {col.address.map((line, j) =>
                    line === '' ? (
                      <br key={j} />
                    ) : (
                      <span key={j} className={styles.addressLine}>{line}</span>
                    )
                  )}
                </address>
              ) : (
                <ul className={styles.linkList}>
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className={styles.footerLink}>{link}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>©2025 Elementum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
