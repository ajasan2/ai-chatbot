import { useState } from "react";

const Success = ({ msg }) => {
    const [show, setShow] = useState(true);
    setTimeout(() => setShow(false), 2000);

    return (
        <div>
            {show && <div className="bg-green-600 text-neutral p-2 rounded-md mt-6 text-sm mb-4">
                <i className="fa-solid fa-circle-check mr-2"></i>{msg}</div>}
        </div>
    );
};

export default Success;