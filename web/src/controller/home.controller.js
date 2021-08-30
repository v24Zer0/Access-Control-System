import React from "react";

function buildHierarchy(root, areas, doors) {
    let content = [];
    content.push(<div id="rootArea" key={root.name}><h5>{root.name}</h5></div>);
    const doorNames = [];
    const rules = [];
    for(let door of root.doors) {
        doorNames.push(<span className='door' key={door}>{doors[door].name}
        <span className={doors[door].status === 'open' ? 'doorOpen' : 'doorClosed'}> ({doors[door].status})</span>
        </span>);
    }
    for(let rule in root.access_rules) {
        console.log(rule);
        rules.push(<span className='rule' key={root.name+rule}>{rule}</span>);
    }
    let childAreas = [];
    for(let child of root.child_area_ids) {
        let newRoot = areas[child];
        childAreas = buildRecursive(newRoot, areas, doors, childAreas);
    }
    content.push(<div className='areaChildren' key={root.name+' doors+rules'}><div key={root.name+' child'}>[Doors] {doorNames}</div><div key={root.name+'rules'}>[Access_Rules] {rules}</div></div>);
    content.push(<div className='rootChildren' key={'rootChildren'}>{childAreas}</div>);
    return content;
}

function buildRecursive(root, areas, doors, content) {
    content.push(<div className="area" key={root.name}>{root.name}</div>);
    const doorNames = [];
    const rules = [];
    for(let door of root.doors) {
        doorNames.push(<span className='door' key={door}>{doors[door].name}
        <span className={doors[door].status === 'open' ? 'doorOpen' : 'doorClosed'}> ({doors[door].status})</span>
        </span>);
    }
    for(let rule in root.access_rules) {
        rules.push(<span className='rule' key={root.name+rule}>{rule}</span>);
    }
    content.push(<div className='areaChildren' key={root.name+' doors+rules'}><div key={root.name+' child'}>[Doors] {doorNames}</div><div key={root.name+'rules'}>[Access_Rules] {rules}</div></div>);
    // content.push();
    if(root.child_area_ids.length === 0) {
        return content;
    }
    else {
        let childrenContent = [];
        for(let child of root.child_area_ids) {
            let newRoot = areas[child];
            childrenContent = buildRecursive(newRoot, areas, doors, childrenContent);
        }
        content.push(<div className="areaChild" key={root.name+' children'}>{childrenContent}</div>);
        return content
    }
}

export { buildHierarchy };