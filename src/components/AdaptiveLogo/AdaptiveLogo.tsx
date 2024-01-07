import { Logo } from '../Logo';
import styles from './AdaptiveLogo.module.css';

export const AdaptiveLogo: React.FC = () => {
    return (
        <div className={styles.adaptiveLogoContent}>
            <Logo />
        </div>
    );
};
