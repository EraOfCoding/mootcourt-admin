import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { db } from './db.js'
import './App.css'
import Editor from './Editor';

import Individual from './Individual';
import Team from './Team';

function Home() {
  return (
    <div>
      <h2>Выберите тип списка</h2>
      <div className='choice'>
        <Link to='/team'>Участники с командой</Link>
        <Link to='/individual'>Участники без команды</Link>
        <Link to='/editor'>Выложить итоги и фото</Link>
      </div>
    </div>
  )
}

function App() {

  const [allow, setAllow] = useState(false)
  const [inputPass, setInputPass] = useState('')

  const [password, setPassword] = useState('')

  useEffect(() => {
    if (db) {
      const admindb = db
        .collection('password')
        .orderBy('createdAt')
        .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }))
          setPassword(data)
        })

      return admindb
    }
  }, [db])

  const submit = () => {
    if (password[0].adminPass === inputPass) {
      setAllow(true)
    }
  }

  return (
    <div className="App">
      <hr />
      {allow ?
        <div>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/team' element={<Team />} />
              <Route exact path='/individual' element={<Individual />} />
              <Route exact path='/editor' element={<Editor />} />
            </Routes>
          </BrowserRouter>
        </div>
        :
        <div>
          <h1>Enter password</h1>
          <form onSubmit={submit} className="form">
            <input className="password" value={inputPass} onChange={(e) => setInputPass(e.target.value)} placeholder="Password" />
            <button type="submit">Enter to admin</button>
          </form>
        </div>
      }
    </div>
  );
}

export default App;