import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import EachTodo from '../components/LoaderWave/EachToDo'
import LoaderWave from '../components/LoaderWave/LoaderWave'
import { TodoItem } from '../lib/schema'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{

    setIsLoading(true);
    fetch("/api/items")
    .then(response => response.json())
    .then(data => 
      {
        setTodoList(data.result)
        setIsLoading(false)
      }
    );

  },[]);

  
  return (
    <div>
      <Head>
        <title>Todo App using Next.JS + Tigris</title>
        <meta name="description" content="Tigris app tutorial" />
      </Head>
      
      <div className={styles.container}>
        
        <h2>Sample Todo app using Next.JS and Tigris</h2>

        {/* Search Header */}
        <div className={styles.searchHeader}>
          <input className={styles.searchInput} placeholder='Type an item to add or search'/>
          <button>Add</button>
          <button>Search</button>
        </div>

        {/* Results section */}
        <div className={styles.results}>
          { isLoading ? (
            <LoaderWave/>
            ) : 
            ( 
            <ul>
              { todoList.map((each)=>{
                return(<EachTodo key={each.id} text={each.text} isCompleted={each.completed}/>)
              })}
            </ul> 
            )
          }
        </div>

      </div>
       
    </div>
  )
}

export default Home
 