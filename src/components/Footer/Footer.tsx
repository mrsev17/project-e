import { Logo } from '../Logo';
import { IoLogoGithub } from 'react-icons/io';
import { FaLinkedin } from 'react-icons/fa6';
import { SiTelegram } from 'react-icons/si';
import { SubscribeDiscounts } from '../SubscribeDiscounts';
import { useAppSelector } from '../../hooks/hook';
import { toast } from 'react-toastify';
import { selectMode } from '../../redux/modeSlice';
import styles from './Footer.module.css';

export const Footer = () => {
    const notify = () => toast('Currently not available');
    const getMode: boolean = useAppSelector(selectMode);
    const servicesOptions = ['Bonus program', 'Gift cards', 'Credit and payment', 'Trade in', 'Service contracts', 'Payment'];
    const buyerAssistanceOptions = [
        'Сustomer help center',
        'Find order',
        'Delivery terms',
        'Exchange and return of goods',
        'Guarantee',
        'Product status under repair',
    ];
    return (
        <footer>
            <div className={getMode ? styles.footerContainer : styles.footerContainerLight}>
                <div className={getMode ? styles.footerWrapper : styles.footerWrapperLight}>
                    <div className={getMode ? styles.footerWrapperLeft : styles.footerWrapperLeftLight}>
                        <Logo />
                        <SubscribeDiscounts />
                    </div>
                    <div className={getMode ? styles.footerMidWrapper : styles.footerMidWrapperLight}>
                        <div className={getMode ? styles.footerWrapperMid : styles.footerWrapperMidLight}>
                            <p>Services</p>
                            <ul>
                                {servicesOptions.map((link, i) => {
                                    return (
                                        <li key={i}>
                                            <span onClick={() => notify()}>{link}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={getMode ? styles.footerWrapperMid : styles.footerWrapperMidLight}>
                            <p>Buyer assistance</p>
                            <ul>
                                {buyerAssistanceOptions.map((link, i) => {
                                    return (
                                        <li key={i}>
                                            <span onClick={() => notify()}>{link}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className={getMode ? styles.footerWrapperRight : styles.footerWrapperRightLight}>
                        <p>Contact with us</p>
                        <ul>
                            <li>
                                <a href='https://github.com/mrsev17'>
                                    <IoLogoGithub />
                                </a>
                            </li>
                            <li>
                                <a href='https://www.codewars.com/users/mrsev17'>
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                                <a href='https://t.me/mrsev7'>
                                    <SiTelegram />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};
