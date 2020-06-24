import React, { useState } from "react";
import "./note.css"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';






function Note(props) {


    function deleteClicked(event) {
        props.delete(props.id, props.index);

        event.preventDefault();
    }

    function openModalClicked(event) {

        props.getModal(props.id, props.index);
        event.preventDefault();

    }
    return (

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content}</p>
                <button className="deleteIcon" onClick={deleteClicked}> <DeleteIcon style={{ color: "red" }} /></button>

                {/* <button onClick={updateClicked} type="button" data-toggle="modal" data-target="#exampleModal"  className="editIcon"> <EditIcon /> </button> */}
                <button onClick={openModalClicked} type="button" className="editIcon"> <EditIcon style={{ color: "blue" }} /> </button>

            </div>
        </div>
    )

}



export default Note;