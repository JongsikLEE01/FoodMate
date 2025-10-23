import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <button onClick={() => {}} className={styles.icon}>
                    ≡
                </button>
            </div>
            
            <div className={styles.centerSection}>
                <Link to="/" className={styles.logo}>
                    FoodMate
                </Link>
            </div>
            
            <div className={styles.rightSection}>
                <button
                    onClick={() => navigate('/mypage')}
                    className={styles.icon}
                >
                    👤
                </button>
            </div>
        </header>
    );
};

export default Header;