function Person (props) {
    let voteCheck = props.age >= 18 ? "Please go vote!" : "Wait until you're 18";

    let hobbies = props.hobbies.map(hobby => <li> { hobby } </li>);

    return (
        <div class="person">
            <p>Learn some information about this person:</p>
            <p> Name: { props.name } | Age: { props.age }</p>
            <p> Hobbies: </p>
                <ul>
                    { hobbies }
                </ul>
            <h3>{ voteCheck } </h3>
        </div>
    )
}