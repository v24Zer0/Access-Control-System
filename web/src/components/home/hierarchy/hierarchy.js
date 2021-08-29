import React, { useEffect, useState } from "react";
import { buildHierarchy } from "../../../controller/home.controller";
import route from "../../../utility/url";
import "./hierarchy.css";

function Hierarchy() {
    const [loading, setLoading] = useState(true);
    // const [root, setRoot] = useState({});
    // const [areas, setAreas] = useState({});
    // const [doors, setDoors] = useState({});
    const [content, setContent] = useState([]);

    async function fetchData() {
        try {
            const res = await fetch(route.hierarchy, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            // setRoot(data['root']);
            // setAreas(data['areas']);
            // setDoors(data['doors']);
            const hierarchy = renderHierarchy(data.root, data.areas, data.doors);
            setContent(hierarchy);
            console.log(hierarchy);
            setLoading(false);
        } catch(error) {
            console.log(error);
            setLoading(false);
            alert('Something went wrong');
        }
    }

    useEffect(() => {
        // fetch data from api
        fetchData();
    }, []);

    function handleClick(e) {
        setLoading(true); 
        fetchData();
    }

    function renderHierarchy(root, areas, doors) {
        let content = [];
        if(root) {
            content = buildHierarchy(root, areas, doors);
        }
        return content;
    }

    return (
        <div>
            <div><button className="btn btn-primary refresh-button" onClick={handleClick}><img src="/refresh_black_24dp.svg" alt="refresh" /></button></div>
            <div>{loading ? <div id="loading"><img className="loadingImg" src="/rotate_right_black_24dp.svg" alt="loading..." /></div> : <div id="hierarchy">{content}</div>}</div>

        </div>
    )
}

export default Hierarchy;