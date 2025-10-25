import React from 'react';
import Header from '../header/Header';
import styles from './css/Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
    children, 
    title,
    showHeader = true
}) => {
    return (
        <div className={styles.layout}>
            {showHeader && <Header />}
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
};

export default Layout;