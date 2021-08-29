import React, { useState } from "react";
import { updateDoor } from "../../../controller/door.controller";
import "./manageDoor.css";

function ManageDoor() {
    const [doorId, setDoor] = useState('');

    function handleClick(e) {
        const type = e.target.name;
        updateDoor(type, doorId);
    }

    return (
        <div>
            <div className="doorPage"> 
                <div id="unlock">
                    <h4>Unlock Door</h4>
                    <div className="form-floating">
                        <input className="form-control" placeholder="Door ID" type="text" name="unlock" onInput={e => setDoor(e.target.value)}/>
                        <label htmlFor="unlock">Door ID</label>
                    </div>
                    <button className="btn btn-success update-door-btn" name="unlock" onClick={handleClick}>Unlock</button>
                </div>
                <div id="lock">
                    <h4>Lock Door</h4>
                    <div className="form-floating">
                        <input className="form-control" placeholder="Door ID" type="text" name="lock" onInput={e => setDoor(e.target.value)}/>
                        <label htmlFor="lock">Door ID</label>
                    </div>
                    <button className="btn btn-danger update-door-btn" name="lock" onClick={handleClick}>Lock</button>
                </div>
            </div>
        </div>
    )
}

export default ManageDoor;