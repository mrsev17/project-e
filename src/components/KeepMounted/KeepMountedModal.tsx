import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './KeepMountedModal.module.css';

interface KeepMountedModalProps {
    photo: string;
    productName: string;
}
const style = {
    padding: '12px',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid transparent',
    boxShadow: 24,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export const KeepMountedModal: React.FC<KeepMountedModalProps> = ({ photo, productName }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // useEffect(() => {
    //     // Update windowWidth when the window is resized
    //     const handleResize = () => {
    //         setWindowWidth(window.innerWidth);
    //     };
    //     window.addEventListener('resize', handleResize);
    //     // Cleanup the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (
        <div className={styles.modalWrapper}>
            <img onClick={handleOpen} src={photo} alt={productName} />
            <Modal className={styles.mountedImage} open={open} onClose={handleClose}>
                <Box sx={style}>
                    <img className={styles.imageCase} src={photo} alt={productName} />
                </Box>
            </Modal>
        </div>
    );
};
