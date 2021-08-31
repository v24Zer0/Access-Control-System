import route from "../utility/url";

async function updateDoor(type, door) {
    let url = '';
    if(type === 'unlock') {
        url = route.unlockDoor;
    }
    else if(type === 'lock') {
        url = route.lockDoor;
    }
    try {
        const res = await fetch(url, {
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

export { updateDoor };