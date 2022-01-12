import React from 'react'
import { useEffect, useState } from 'react'
import { db, firestore } from './db.js'


function Team() {

    const [list, setList] = useState([])

    useEffect(() => {
        if (db) {
            const listAll = db
                .collection('participantsTeam')
                .orderBy('createdAt')
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                    setList(data)
                })

            return listAll
        }
    }, [db])

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Список команд</h3>
            {list.map((team) =>
                <div className='stack'>
                    <h5>Наименование команды: <b>{team.teamName}</b></h5>
                    <h5>Наименование школы: <b>{team.schoolName}</b></h5>
                    <h5>Класс: <b>{team.grade}</b></h5>
                    <h5>Участники команды (2-4 человека) (ФИО): <b>{team.participants}</b></h5>
                    <h5>Тренеры (если имеются): <b>{team.mentors}</b></h5>
                    <h5>Контактные данные (телефон,эл.почта участников команды, тренеров): <b>{team.contacts}</b></h5>
                </div>
            )}
        </div>
    )
}

export default Team