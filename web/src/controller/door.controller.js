async function updateDoor(type, door) {
    let url = '';
    if(type === 'unlock') {
        url = type;
    }
    else if(type === 'lock') {
        url = type;
    }
    try {
        const res = await fetch(`http://localhost:3001/door/${url}`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ door: door })
        });
        const data = await res.json();
        console.log(data);
        alert(data.message);
    } catch(error) {
        console.log(error);
        alert('Something went wrong');
    }
}

export {updateDoor};