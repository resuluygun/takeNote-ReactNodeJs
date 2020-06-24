import React, { useState, useEffect } from "react";

import Header from "../components/header"
import Footer from "../components/footer"
import CreateArea from "../components/createarea"
import Note from "../components/note"
import MyModal from "../components/myModal"

import {useHistory} from "react-router-dom"

import axios from "axios";
import qs from "qs";

// import $ from "jquery"




function Home() {

    let history = useHistory();


    const [notes, setNotes] = useState([]);
    const [localNote, setLocalNote] = useState({ title: "", content: "" });
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        axios.get("/note/getall").then(data => {
            setNotes(data.data.noteArray);
            // console.log(notes);
        })
    }, []);

    function addNote(object) {
        axios({
            method: "post",
            url: "/note/create",
            data: qs.stringify({
                title: object.title,
                content: object.content,
                index: object.index
            }),
            headers: { 'content-type': "application/x-www-form-urlencoded;charset=utf-8" }
        }).then(result => {

            if (result.data === true) setNotes(prev => { return [...prev, object] })
            else history.replace("/login")
            // console.log(result);
        })
    }

    function deleteNote(idNote, indexNote) {
        axios({
            method: "delete",
            url: "/note/delete",
            data: qs.stringify({
                index: indexNote
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        })
            .then(result => {
                // console.log(result.data);
                if (result.data === true) {
                    setNotes(prevValue => {
                        return prevValue.filter((value, index) => {
                            //console.log(value+" "+index);

                            return idNote !== index
                        })
                    })
                }
                else  history.replace("/login")

            })
    }

    function updateModal(updatedNote) {

        axios({
            method: "put",
            url: "/note/update",
            data: qs.stringify({
                title: updatedNote.title,
                content: updatedNote.content,
                index: updatedNote.index
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        }).then(result => {
            if (result.data === true) {

                setNotes(prevValues => {
                    return prevValues.map(function (note) {
                        return note.index === updatedNote.index ? updatedNote : note
                    })
                })

            }
            else  history.replace("/login")


        })

        // console.log(updatedNote)

    }

    function openModal(arrayIndex, noteIndex) {

        setLocalNote(notes.find(function (foundNote) {
            return foundNote.index === noteIndex
        }))

        setShowModal(!showModal);
    }

    function closeModal() {
        setShowModal(false);
    }

    return (
        <div>
            <Header />

            <CreateArea add={addNote} />

            {/* <div id="note_main_div"> */}
                {notes.map((note, index) => {

                    return <Note key={index} id={index} index={note.index} delete={deleteNote} getModal={openModal} title={note.title} content={note.content} />
                })}
            {/* </div> */}
            {/* <Modal note={localNote} />  */}
            {showModal && <MyModal close={closeModal} update={updateModal} note={localNote} />}
            <Footer />

        </div>
    );
}

export default Home;