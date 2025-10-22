import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    showBack?: boolean;
    showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
    children, 
    title, 
    showBack = true,
    showFooter = true 
}) => {
    return (
        <div className={styles.layout}>
            {/* <Header title={title} showBack={showBack} /> */}
            <main className={styles.content}>
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
};

export default Layout;