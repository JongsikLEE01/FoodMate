import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './css/Header.module.css';
import banner from '../../../assets/images/FoodMate_Bannerr.png'
import { useCoin } from '../../../hooks/Coin'

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { coin } = useCoin();
    const isMyPage = location.pathname === '/mypage'

    const handLeftBtnClick = () => {
        // TODO : 코인 충전 이동 등으로 로직 추가
        alert("코인 충전 페이지로 리다이렉트 예정...")
    }

    return (
        <header className={styles.header}>
           <div className={styles.leftSection} onClick={handLeftBtnClick}>
                <span className={styles.coinText}>
                    남은 코인 : 
                    <strong style={{ marginLeft: '5px', color: '#FFD700' }}>
                        {coin === null ? '...' : coin}
                    </strong>
                </span>
            </div>
            
            <div className={styles.centerSection}>
                <Link to="/" className={styles.logo}>
                    <img src={banner} alt='main_logo' className={styles.logo}/>
                </Link>
            </div>
            
            <div className={styles.rightSection}>
                {isMyPage ? (
                    // 마이페이지일 때는 뒤로 가기
                    <button onClick={() => navigate(-1)} className={styles.icon}>
                        ←
                    </button>
                ) : (
                    // 그 외 화면일 때는 마이페이지
                    <button
                        onClick={() => navigate('/mypage')}
                        className={styles.icon}
                    >
                        👤
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;