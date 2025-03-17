import React from 'react'
import UseReducerList from './useReducerList'
import List from './List'
import Currency from './Currency'

export default function App() {
  return (
    <div className='wrapper'>
      <UseReducerList/>
      <List/>
      <Currency/>
    </div>
  )
}
