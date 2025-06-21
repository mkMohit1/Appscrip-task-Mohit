'use client'
import { useState } from 'react';
import styles from './Header.module.css'
import { FaHeart, FaShoppingBag, FaUser, FaSearch, FaGlobe, FaBars } from 'react-icons/fa'

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
return (
  <header>
    {/* Top Strip */}
    <div className={styles.topStrip}>
      <span>🧱 Lorem ipsum dolor</span>
      <span>🧱 Lorem ipsum dolor</span>
      <span>🧱 Lorem ipsum dolor</span>
    </div>

    {/* Main Header */}
    <div className={styles.mainHeader}>
      <div className={styles.mobileLeft}>
        <FaBars className={styles.menuIcon}
          onClick={() => setMobileMenuOpen(prev => !prev)}
        />
        <div className={styles.logo}>🌀</div>
      </div>

      <h2 className={styles.title}>LOGO</h2>

      <div className={styles.icons}>
        <FaSearch />
        <FaHeart />
        <FaShoppingBag />
        {/* bellow two will be hide in case of mobile */}
        <FaUser />
        <span className={styles.lang}>ENG ▾</span>
      </div>
    </div>

    {/* Nav Bar (hidden on mobile) */}
    <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.showMobileMenu : ''}`}>
      <ul>
        <li>SHOP</li>
        <li>SKILLS</li>
        <li>STORIES</li>
        <li>ABOUT</li>
        <li>CONTACT US</li>
      </ul>
    </nav>
  </header>
)
}
export default Header;
