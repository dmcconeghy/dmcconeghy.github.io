function Card(props) {
    return <div class="card">
        <div class="card-content">
            {props.content}
            <span class="alert">Alert: {props.content}</span>
        </div>
        <Button />
    </div>
}