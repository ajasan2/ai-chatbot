const Session = ({ session, children }) => {
    const firstUserMessage = session.chatHistory[0]?.parts[0]?.text || 'No messages yet';

    return (
        <div>
            <div className="border-r flex items-start justify-between">
                <div >
                <h2 className="text-base font-bold text-md text-base first-letter:uppercase">{firstUserMessage}</h2>
                    <p className="text-[10px] text-slate-500">{new Date(session.createdAt).toLocaleDateString()}</p>
                </div>
                <div>{children}</div>
            </div>
        <div></div>
        </div>
    )
}

export default Session;