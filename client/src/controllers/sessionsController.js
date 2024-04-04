const getSessions = async () => {
    const res = await fetch('/api/sessions/user', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });

    const data = await res.json();
    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
}

const createSession = async (value) => {
    if (!value) {
        throw Error("Please enter a question.")
    }

    const res = await fetch("api/sessions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            message: value,
        }),
    });

    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
}

const deleteSession = async (_id) => {
    const res = await fetch(`/api/sessions/${_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
    
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
}

const updateSession = async (_id, value) => {
    if (!_id || !value) {
        throw Error("Malformed request");
    }

    const res = await fetch(`/api/sessions/${_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            message: value
        }),
    });

    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
}

export { getSessions, createSession, deleteSession, updateSession };