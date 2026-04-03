import React, { useState } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = ['Home', 'Studio', 'Services', 'Contact', 'FAQs']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>Elementum</a>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a href="#" className={styles.navLink}>{link}</a>
            </li>
          ))}
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>
    </nav>
  )
}
