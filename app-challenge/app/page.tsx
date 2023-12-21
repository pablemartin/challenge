'use client';
import { FormEvent } from 'react'
import { useState, useEffect } from 'react';;

export default function Page() {

  const [name, setName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isGba, setGba] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleChangeFrom(e) {
    setFromDate(e.target.value);
  }

  function handleChangeTo(e) {
    setToDate(e.target.value);
  }

  function handleChangeGba(e) {
    setGba(e.target.value);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
 
    // const response = await fetch('http://localhost:8000/persona', {
    //   method: 'GET',
    //   body: JSON.stringify({
    //     name: "prueba"
    //   }),
    // })

    const response = await fetch('http://localhost:8000/persona?name='+name)
 
    const data = await response.json()
    console.log(data);
  }
 
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" name="name" value={name} onChange={handleChange} />
        <input type="date" name="from" value={fromDate} onChange={handleChangeFrom} />
        <input type="date" name="to" value={toDate} onChange={handleChangeTo} />
        <input type="checkbox" name="isgba" value={isGba} onChange={handleChangeGba} />
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}