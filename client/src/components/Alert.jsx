import { useState } from 'react';

const Alert = ({ msg }) => {
    const [show, setShow] = useState(true);
    setTimeout(() => setShow(false), 2000);

    return (
        <div>
            {show && <div className="bg-red-500 text-neutral p-2 rounded-md mt-6 text-sm mb-4">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>{msg}</div>}
        </div>
    );
};

export default Alert;