import { Logo } from '../Logo';
import styles from './AdaptiveLogo.module.css';

export const AdaptiveLogo = () => {
    return (
        <div className={styles.adaptiveLogoContent}>
            <Logo />
        </div>
    );
};
