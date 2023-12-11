import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { setDependencies } from '../../redux/filterSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { selectDependncies } from '../../redux/filterSlice';
import styles from './AccordionMUI.module.css';

interface AccordionMUIProps {
    category: string;
    options: any;
    setCurrentPage: (page: number) => void;
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    borderRadius: '12px',
    width: '94%',
    margin: '0 auto',
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const AccordionMUI: React.FC<AccordionMUIProps> = ({ category, options, setCurrentPage }) => {
    const dependencies: (string | number)[] = useAppSelector(selectDependncies);
    console.log(dependencies);
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const checkBoxHandle = (option: number | string) => {
        setCurrentPage(1);
        dispatch(setDependencies(option));
    };

    return (
        <div className={styles.accordionWrapper}>
            <Accordion expanded={expanded === category} onChange={handleChange(category)}>
                <AccordionSummary aria-controls={`${category}d-content`} id={`${category}d-header`}>
                    <Typography fontSize={20}>{category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className={styles.categoryList}>
                        {(options as any).map((option: string | number, index: number) => (
                            <li key={index}>
                                <label>
                                    <input type='checkbox' onChange={() => checkBoxHandle(option)} checked={dependencies.includes(option)} />
                                    <span>{option}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
