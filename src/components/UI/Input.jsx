
export const InputComponent = (props) => {
    return (
        <input
            type={props.type}
            className={props.className}
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
        ></input>
    )
}