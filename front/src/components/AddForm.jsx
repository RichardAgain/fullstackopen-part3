
import InputField from "./InputField"

const AddForm = ({ nameHooks, numberHooks, onSubmit}) => (
    <form onSubmit={onSubmit}>
        <InputField hooks={nameHooks} text={'name: '}/>
        <InputField hooks={numberHooks} text={'number: '}/>
        
        <div>
        <button type="submit">add</button>
        </div>
    </form>
)

export default AddForm