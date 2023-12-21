'use client';
import { FormEvent } from 'react'
import { useState, useEffect } from 'react';;
import axios from 'axios';

export default function Page() {

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [dni, setDni] = useState('');
  const [isGba, setGba] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleChangeDni(e) {
    setDni(e.target.value);
  }

  function handleChangeDate(e) {
    setDate(e.target.value);
  }

  function handleChangeGba(e) {
    setGba(e.target.value);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
 
    // const response = await fetch('http://localhost:8000/persona', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     name: name,
    //     date: date,
    //     from_date: '',
    //     to_date: '',
    //     dni: dni,
    //     is_gba: isGba,
    //   }),
    // })

    console.log(isGba);

    // const response = await axios.post('http://localhost:8000/persona', {
    //   name: name,
    //   date: date,
    //   from_date: '',
    //   to_date: '',
    //   dni: dni,
    //   is_gba: isGba,
    // }).then((data)=>{
    //   console.log(data)
    // })
 
    // const data = await response.json()
    // console.log(data);
  }
 
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" name="name" value={name} onChange={handleChange} />
        <input type="number" name="dni" value={dni} onChange={handleChangeDni} />
        <input type="date" name="date" value={date} onChange={handleChangeDate} />
        <input type="checkbox" name="isgba" value={isGba} onChange={handleChangeGba} />
        <button type="submit">Crear</button>
      </div>
    </form>
  )
}