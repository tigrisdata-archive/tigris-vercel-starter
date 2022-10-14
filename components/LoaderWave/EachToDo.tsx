import Image from 'next/image';
import React from 'react';
import styles from '../../styles/EachToDo.module.css';


type Props = {
    text:string;
    isCompleted:boolean;
}
const EachTodo = ({text, isCompleted}:Props) => {

    return(
    <li className={styles.each}>
       <button className={styles.eachButton}>
            <Image src={isCompleted ? '/circle-checked.svg' : '/circle.svg'} width={20} height={20} alt='Check Image' />
            <span style={isCompleted ? {textDecoration: 'line-through'} : {}}>{text}</span>
        </button>
        <button className={styles.deleteBtn}>
            <Image src='/delete.svg' width={24} height={24} alt='Check Image' />
        </button>
    </li>
    );
}

export default EachTodo;