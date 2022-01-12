import React, { useState, useEffect } from 'react'
import { db, firebase } from './db.js'
import './Editor.css'

function Editor() {
    const [title, setTitle] = useState('')
    const [mainImageURL, setMainImageURL] = useState('')
    const [imageNum, setImageNum] = useState('')
    const [imagesURL, setImagesURL] = useState([])
    const [imagesCaption, setImagesCaption] = useState([])
    const [text, setText] = useState('')
    const [error, setError] = useState('')

    async function postForm(e) {
        e.preventDefault()
        if (title !== '' && mainImageURL !== '' && text !== '') {
            const postsRef = db.collection('results')

            setError(false)
            setTitle('')
            setMainImageURL('')
            setImageNum(0)
            setImagesURL([])
            setImagesCaption([])
            setText('')

            await postsRef.add({
                title: title,
                featuredImage: mainImageURL,
                imagesURL: imagesURL,
                imagesCaption: imagesCaption,
                text: text,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else {
            setError(true)
        }

    }

    const fileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setMainImageURL(await fileRef.getDownloadURL());

        e.target.value = null
    }

    const updateImagesURL = index => async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);

        let newArr = imagesURL
        newArr[index] = await fileRef.getDownloadURL()

        setImagesURL(newArr)
    }

    const updateImagesCaption = index => e => {
        let newArr = imagesCaption
        newArr[index] = e.target.value

        setImagesCaption(newArr)
    }

    return (
        <div className="admin-container">
            <div className="postform-container">
                <h2 className="section-title">Create a post</h2>
                <form onSubmit={postForm} className="postform">
                    <input className="postform-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title*" name="title" />
                    <input type="file" className="postform-input" onChange={fileChange} placeholder="Featured image*" name="image" />
                    <input type="number" className="postform-input" value={imageNum} onChange={(e) => setImageNum(e.target.value)} placeholder="Number of images" name="image number" />
                    {Array.apply(null, { length: imageNum }).map((e, i) =>
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
                            <input type="file" key={i} className="postform-input" onChange={updateImagesURL(i)} placeholder={`${i + 1} image*`} name="image" />
                            <input key={i} className="postform-input" value={imagesCaption[i]} onChange={updateImagesCaption(i)} placeholder={`${i + 1} image caption (optional)`} name="image caption" />
                        </div>
                    )}
                    <textarea className="postform-textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder="Main text" cols="40" rows="5" name="text" />
                    <button className="adminform-btn" type="submit">Submit</button>
                    {error ? <div style={{ paddingTop: '30px' }}><h6>Ошибка: заполните нужные поля</h6></div> : <div></div>}
                </form>
            </div>
        </div>
    )
}

export default Editor