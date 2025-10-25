import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './css/Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <NavLink 
                to="/" 
                className={({ isActive }) => 
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                end
            >
                홈
            </NavLink>
            <NavLink 
                to="/chat" 
                className={({ isActive }) => 
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                }
            >
                채팅
            </NavLink>
            <NavLink 
                to="/mypage" 
                className={({ isActive }) => 
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                }
            >
                마이
            </NavLink>
        </footer>
    );
};

export default Footer;