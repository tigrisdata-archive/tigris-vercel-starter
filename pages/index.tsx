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
  const [isError, setIsError] = useState(false);

  //
  const [querySearch, setQuerySearch] = useState('');
  const [wiggleError, setWiggleError] = useState(false);

  const fetchListItems = ()=>{
    
    setIsLoading(true);
    setIsError(false);

    fetch("/api/items")
    .then(response => response.json())
    .then(data => 
      {
        setIsLoading(false)
        if(data.result){  
          setTodoList(data.result)
        }
        else {
          setIsError(true)
        }
      }
    )
    .catch(() => {
      setIsLoading(false)
      setIsError(true)
    });
  }


  //Load the initial list of todo-items
  useEffect(()=>{
    fetchListItems()
  },[]);

  
  //Add a new todo-item
  const addToDoItem = () => {
    setWiggleError(false);

    const result: RegExpMatchArray | null = querySearch.match('^\\S.*');
    if(result == null){
      setWiggleError(true);
      return;
    }

    setIsLoading(true);

    fetch("/api/items", {
      method:'POST',
      body:JSON.stringify({text:querySearch, completed:false})
    })
    .then(() => 
      {
        setIsLoading(false);
        setQuerySearch('');
        fetchListItems();
      }
    )

  }


  //Delete Todo-item
  const deleteTodoItem = (id?:number) => {

    setIsLoading(true);

    fetch("/api/item/"+id, {
      method:'DELETE',
    })
    .then(() => 
      {
        setIsLoading(false);
        fetchListItems();
      }
    )

  }


  // Mark Todo-item
  const updateTodoItem = (item:TodoItem) => {

    item.completed = !item.completed;
    setIsLoading(true);
  
    fetch("/api/item/"+item.id, {
      method:'PUT',
      body:JSON.stringify(item)
    })
    .then(() => 
      {
        setIsLoading(false);
        fetchListItems();
      }
    )

  }


  
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
          <input className={`${styles.searchInput} ${(wiggleError) ? styles.invalid : ''}`} value={querySearch} onChange={e=>{setWiggleError(false); setQuerySearch(e.target.value)}} placeholder='Type an item to add or search'/>
          <button onClick={addToDoItem}>Add</button>
          <button style={{pointerEvents:'none'}}>Search</button>
        </div>

        {/* Results section */}
        <div className={styles.results}>
         
          {isError && <p className={styles.errorText}>Something went wrong.. </p>}
          {isLoading && <LoaderWave/>}

          <ul>
            { todoList.map((each)=>{
              return(<EachTodo key={each.id} toDoItem={each} deleteHandler={deleteTodoItem} updateHandler={updateTodoItem}/>)
            })}
          </ul> 
            
        </div>

      </div>
       
    </div>
  )
}

export default Home
 