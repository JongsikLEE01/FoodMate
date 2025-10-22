import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/images/FoodMate_Logo.png'

interface HeaderProps {
    showBack?: boolean;
    showProfile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
    showBack = true,
    showProfile = true
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className={styles.header}>
            {showBack && location.pathname !== '/' && (
                <button 
                    onClick={() => navigate(-1)} 
                    className={styles.backButton}
                >
                    ←
                </button>
            )}
            <div className={styles.logoContainer}>
                <img src={logo} alt='main_logo' className={styles.logo}/> 
            </div>
            {showProfile && (
                <div className={styles.rightContainer}>
                    <button
                        onClick={() => navigate('/mypage')}
                        className={styles.profileIcon}
                    >
                        👤
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;