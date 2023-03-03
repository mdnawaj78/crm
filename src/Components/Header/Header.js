import React from 'react' 
import styles from './Header.module.css';
import logo from '../Images/Bitmap.png'
// import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
       <header>
        <div className={styles.logo}>
        {/* <Link to="/">CRM</Link> */}
         <img src={logo} alt="APM logo"/>
          </div>
          <button className={styles.toggle_button} aria-label="Toggle navigation">
            <span className= {styles.toggle_icon}></span> 
            <span className={`${styles.toggle_icon} , ${styles.toggle_middle}`}></span>
            <span className={styles.toggle_icon}></span>
          </button> 
        </header>
    </>
  )
}

export default Header