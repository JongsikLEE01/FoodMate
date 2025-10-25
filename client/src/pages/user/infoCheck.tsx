import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/infoCheck.module.css';

const UserInfoCheck: React.FC = () => {
    const navigate = useNavigate();

    const handleChoice = (hasInfo: boolean) => {
        if (hasInfo) {
            navigate('/'); // 정보가 있는 경우 메인 페이지로
        } else {
            navigate('/user/profile-setup'); // 정보가 없는 경우 입력 폼으로
        }
    };

    return (
        <div className={styles.container}>
            <h2>
                입력해둔 정보가 있으신가요?
            </h2>
            <div className={styles.btn}>
                <button
                    onClick={() => handleChoice(true)}
                    className={styles.yesBtn}
                >
                    예
                </button>
                <button
                    onClick={() => handleChoice(false)}
                    className={styles.noBtn}
                >
                    아니오
                </button>
            </div>
        </div>
    );
};

export default UserInfoCheck;