import React, { useState } from "react";
import "./menu.css";

function Menu(props) {
    const [activeClass, setActive] = useState(0);

    const active = "btn nav-button active";
    const inactive = "btn nav-button";

    return (
        <div className="menu">
            <ul className="nav justify-content-center">
                <li>
                    <button className={activeClass ? inactive : active} onClick={() => {props.updatePage(0); setActive(0);}}>View hierarchy</button>
                </li>
                <li>
                    <button className={activeClass ? active : inactive} onClick={() => {props.updatePage(1); setActive(1);}}>Unlock/Lock door</button>
                </li>
                <li>
                    <button className="btn nav-button" onClick={() => props.updateUser(false)}>Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Menu;