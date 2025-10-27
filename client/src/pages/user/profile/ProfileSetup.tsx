import React from 'react';
import Layout from '../../../components/common/Layout/Layout';
import StepInput from '../../../components/profile/StepInput';
import StepBtn from '../../../components/profile/StepBtn';
import ProgressBar from '../../../components/profile/ProgressBar';
import StepButtonSelector from '../../../components/profile/StepButtonSelector';
import styles from './css/profile-setup.module.css';
import { useProfileSetup } from '../../../hooks/ProfileSetup';
import { STEPS } from './ts/steps'

const ProfileSetup: React.FC = () => {
    const {
        step,
        formData,
        currentStep,
        progress,
        setStep,
        handleChange,
        handleOptionClick,
        handleSubmit,
        handleSkip,
    } = useProfileSetup();

    return (
        <Layout showHeader={false}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{currentStep.title}</h1>
                    <p className={styles.subtitle}>{currentStep.subtitle}</p>
                </div>

                <div className={styles.formContainer}>
                    <ProgressBar progress={progress} />

                    <form onSubmit={handleSubmit}>
                        <StepInput
                            field={currentStep.field}
                            type={currentStep.type}
                            value={formData[currentStep.field]}
                            placeholder={currentStep.placeholder}
                            onChange={handleChange}
                        />

                        {/* 👈 버튼 셀렉터 렌더링 추가 */}
                        {currentStep.options && currentStep.options.length > 0 && (
                            <StepButtonSelector
                                options={currentStep.options}
                                currentValue={formData[currentStep.field] as string || ''}
                                onOptionClick={handleOptionClick}
                            />
                        )}

                        <StepBtn
                            isLastStep={step === STEPS.length}
                            onNext={() => setStep(step + 1)}
                            onSkip={handleSkip}
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileSetup;