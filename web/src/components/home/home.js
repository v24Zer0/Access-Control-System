import React, { useEffect, useState } from "react";
import "./home.css";
import ManageDoor from "./manageDoor/manageDoor";
import Hierarchy from "./hierarchy/hierarchy";
import Menu from "./menu/menu";

const Page = {
    hierarchy: 0,
    updateDoor: 1
}

function Home(props) {
    const [page, setPage] = useState(Page.hierarchy);

    useEffect(() => {
        console.log('Home page loaded');
    }, [page])

    return (
        <div>
            <Menu updatePage={setPage} updateUser={props.updateUser}/>
            {page ? <ManageDoor /> : <Hierarchy />}
        </div>
    )
}

export default Home;