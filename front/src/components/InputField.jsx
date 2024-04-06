
const InputField = ({ hooks, text }) => {
    const [newValue, setNewValue] = hooks

    return (
        <div>
            {text} <input value={newValue} onChange={(e) => setNewValue(e.target.value)}/>
        </div>
    )
}

export default InputField