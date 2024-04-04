const Session = ({ session, children }) => {
    const firstUserMessage = session.chatHistory[0]?.parts[0]?.text || 'No messages yet';

    return (
        <div className="mb-3">
            <div className="flex items-start justify-between">
                <div>
                <h2 className="font-bold text-lg text-indigo-600 first-letter:uppercase overflow-hidden text-overflow-ellipsis whitespace-nowrap">{firstUserMessage}</h2>
                    <p className="text-[10px] text-slate-500">{new Date(session.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="self-center">{children}</div>
            </div>
        <div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500 to-indigo-50 mt-3"></div>
        </div>
    )
}

export default Session;