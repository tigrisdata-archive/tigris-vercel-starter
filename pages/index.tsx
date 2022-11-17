import type { NextPage } from 'next'
import Image from 'next/image';
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import EachTodo from '../components/LoaderWave/EachToDo'
import LoaderWave from '../components/LoaderWave/LoaderWave'
import { TodoItem } from '../models/tigris/tigris_netlify_starter/todoItems'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //
  const [querySearch, setQuerySearch] = useState('');
  const [wiggleError, setWiggleError] = useState(false);
  type viewModeType = 'list' | 'search'
  const [viewMode, setViewMode] = useState<viewModeType>('list');

  // Fetch Todo List
  const fetchListItems = ()=>{

    setIsLoading(true);
    setIsError(false);

    fetch("/api/items")
    .then(response => response.json())
    .then(data =>
      {
        setIsLoading(false)
        if(data.result){
          setViewMode('list')
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


  // Load the initial list of todo-items
  useEffect(()=>{
    fetchListItems()
  },[]);


  // Add a new todo-item
  const addToDoItem = () => {

    if(queryCheckWiggle()){
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


  // Delete Todo-item
  const deleteTodoItem = (id?:number) => {

    setIsLoading(true);

    fetch("/api/item/"+id, {
      method:'DELETE',
    })
    .then(() =>
      {
        setIsLoading(false);
        if(viewMode == 'list'){
          fetchListItems();
        }
        else{
          searchQuery();
        }
      }
    )

  }


  // Update Todo-item (mark complete/incomplete)
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
        if(viewMode == 'list'){
          fetchListItems();
        }
        else{
          searchQuery();
        }

      }
    )

  }



  // Search query
  const searchQuery = () => {

    if(queryCheckWiggle()){
      return;
    }
    setIsLoading(true);

    fetch(`/api/items/search?q=${encodeURI(querySearch)}`, {
      method:'GET',
    })
    .then(response => response.json())
    .then((data) =>
      {
        setIsLoading(false);
        if(data.result){
          setViewMode('search')
          setTodoList(data.result)
        }
      }
    )

  }


  // Util search query/input check
  const queryCheckWiggle = () => {

    const result: RegExpMatchArray | null = querySearch.match('^\\S.{0,100}$');
    if(result === null){
      setWiggleError(true);
      return true;
    }
    return false;
  }

  useEffect(()=>{
    if(!wiggleError){
      return;
    }
    const timeOut = setTimeout(()=>{
      setWiggleError(false);
    },500)

    return () => clearTimeout(timeOut);

  },[wiggleError])



  return (
    <div>
      <Head>
        <title>Todo App using Next.js + Tigris</title>
        <meta name="description" content="Tigris app tutorial" />
      </Head>

      <div className={styles.container}>

        <h2>Sample Todo app using Next.js and Tigris</h2>

        {/* Search Header */}
        <div className={styles.searchHeader}>
          <input className={`${styles.searchInput} ${(wiggleError) ? styles.invalid : ''}`} value={querySearch} onChange={e=>{setWiggleError(false); setQuerySearch(e.target.value)}} placeholder='Type an item to add or search'/>
          <button onClick={addToDoItem}>Add</button>
          <button onClick={searchQuery}>Search</button>
        </div>

        {/* Results section */}
        <div className={styles.results}>

          {/* Loader, Errors and Back to List mode */}
          {isError && <p className={styles.errorText}>Something went wrong.. </p>}
          {isLoading && <LoaderWave/>}
          {viewMode=='search' && <button className={styles.clearSearch} onClick={()=>{setQuerySearch(''); fetchListItems()}}>Go back to list</button>}

          {/* Todo Item List */}
          {(todoList.length < 1) ? <p className={styles.noItems}>{(viewMode=='search') ? 'No items found.. ' : 'Add a todo by typing in the field above and hit Add!' }</p> :
           (<ul>
              { todoList.map((each)=>{
                return(<EachTodo key={each.id} toDoItem={each} deleteHandler={deleteTodoItem} updateHandler={updateTodoItem}/>)
              })}
            </ul>)
          }


        </div>

        <a href="https://tigrisdata.com/"><Image src="/tigris_logo.svg" alt="Tigris Logo" width={100} height={100}/></a>

      </div>

    </div>
  )
}

export default Home
