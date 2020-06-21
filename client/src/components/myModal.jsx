import React, { useEffect, useState } from "react"
import "./myModal.css"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CreateArea from "./createarea"



function MyModal(props) {

    const [modalNote, setModalNote] = useState({ title: props.note.title, content: props.note.content, index: props.note.index })

    var myModal, closeIcon;

    useEffect(() => {
        myModal = document.getElementById("myModal");
        closeIcon = document.getElementsByClassName("close")[0]
    }, [])


    function closeModal() {
        // console.log("closeModal called")

        props.update(modalNote)
        props.close();

    }

    window.onclick = function (event) {
        // // console.log("window called and target :")
        console.log(event.target);

        myModal = document.getElementById("myModal");
        if (event.target === myModal) closeModal()
    }

    function deleteClicked(event) {
        props.delete(props.id, props.index);
        event.preventDefault();
    }

    //for update note in the modal
    function handleChange(event) {
        const { name, value } = event.target
        console.log(name, value);

        setModalNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        })
        console.log(modalNote)

    }


    return (


        // Modal
        <div id="myModal" className="customModal">

            {/* Modal Content */}
            <div className="customModal-content" >

                <button onClick={closeModal} id="modalClose">&times;</button>
                <form id="formPadding">
                    <input value={modalNote.title} name="title" type="text" onChange={handleChange} className="form-control" id="updateTitleInput" placeholder="Title" autoComplete="off" />
                    <textarea value={modalNote.content} name="content" onChange={handleChange} className="form-control" id="updateContentInput" placeholder="Content" rows="2" autoComplete="off"></textarea>
                </form>
                <button onClick={closeModal} className="saveChanges">Save Changes</button>
            </div>
        </div>
    )
}



export default MyModal;