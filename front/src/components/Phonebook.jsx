
const Phonebook = ({ toShow, onClick }) => (
    <div>
      <h2>Numbers</h2>
      <ul>
        {toShow.map((person) => 
          <li key={person.id}> {person.name} {person.number} <button onClick={() => onClick(person.id, person.name)}> delete  </button> </li> 
        )}
      </ul>
    </div>
  )

export default Phonebook
