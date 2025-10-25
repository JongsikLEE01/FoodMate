// 로그인 페이지
import React from 'react';
import KakaoLoginButton from '../../components/auth/KakaoLoginBtn';
import styles from './css/login.module.css';
import logo from '../../assets/images/FoodMate_Logo.png'

const Login: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src={logo} alt='main_logo' className={styles.logo}/>
                
            </div>
            <div className={styles.text}>
                <h4>푸드메이트를 간편하게 카카오톡으로 시작해보세요!</h4>
            </div>
            <div className={styles.loginButton}>
                <KakaoLoginButton />
            </div>
        </div>
    );
};

export default Login; 