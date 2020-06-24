import React from "react";
import "./createarea.css"
import qs from "qs";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
const { v4: uuidv4 } = require('uuid');



function CreateArea(props) {

    function handleSubmit(event) {
        const titleElement = document.getElementById("titleInput");
        const contentElement = document.getElementById("contentInput")


        var object = {
            title: titleElement.value,
            content: contentElement.value,
            index: uuidv4()
        }
        // console.log(object.index);
        if (contentElement.value === "") alert("The content can't be empty")
        else props.add(object);

        event.preventDefault();
    }

    return (

        <div className="create-col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-10">
            <form className="form" autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="titleInput" placeholder="Title" />
                </div>
                <div className="form-group">
                    <textarea className="form-control" id="contentInput" placeholder="Content" rows="2"></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn"><AddIcon /></button>
                </div>

            </form>
        </div>
    );

}


export default CreateArea;