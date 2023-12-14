import { Logo } from '../Logo';
import { IoLogoGithub } from 'react-icons/io';
import { FaLinkedin } from 'react-icons/fa6';
import { SiTelegram } from 'react-icons/si';
import { SubscribeDiscounts } from '../SubscribeDiscounts';
import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './Footer.module.css';

export const Footer = () => {
    const getMode: boolean = useAppSelector(selectMode);
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
                                <li>
                                    <a href=''>Bonus program</a>
                                </li>
                                <li>
                                    <a href=''>Gift cards</a>
                                </li>
                                <li>
                                    <a href=''>Credit and payment</a>
                                </li>
                                <li>
                                    <a href=''>Trade in</a>
                                </li>
                                <li>
                                    <a href=''>Service contracts</a>
                                </li>
                                <li>
                                    <a href=''>Payment</a>
                                </li>
                            </ul>
                        </div>
                        <div className={getMode ? styles.footerWrapperMid : styles.footerWrapperMidLight}>
                            <p>Buyer assistance</p>
                            <ul>
                                <li>
                                    <a href=''>Сustomer help center</a>
                                </li>
                                <li>
                                    <a href=''>Find order</a>
                                </li>
                                <li>
                                    <a href=''>Delivery terms</a>
                                </li>
                                <li>
                                    <a href=''>Exchange and return of goods</a>
                                </li>
                                <li>
                                    <a href=''>Guarantee</a>
                                </li>
                                <li>
                                    <a href=''>Product status under repair</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={getMode ? styles.footerWrapperRight : styles.footerWrapperRightLight}>
                        <p>Contact with us</p>
                        <ul>
                            <li>
                                <a href='https://github.com/mrsev17'>
                                    <IoLogoGithub />
                                    <span>Git Hub</span>
                                </a>
                            </li>
                            <li>
                                <a href='https://www.codewars.com/users/mrsev17'>
                                    <FaLinkedin />
                                    <span>Linked In</span>
                                </a>
                            </li>
                            <li>
                                <a href='https://t.me/mrsev7'>
                                    <SiTelegram />
                                    <span>Telegram</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};
