import './style.scss';
import Form from 'react-bootstrap/Form';

export const FormInput = ({label, type='text', id, value, placeholder, message, as, multiple}) => {
    return(
    <div className='form-input'>
        <Form.Label 
        htmlFor="inputPassword5" 
        className='label'>{message ? <span style={{color:'red'}}>{message}</span> : label}</Form.Label>
        <Form.Control
            type={type}
            id={id}
            defaultValue={value}
            aria-describedby="passwordHelpBlock"
            placeholder={placeholder}
            as={as}
            multiple
        />
        <Form.Text id="passwordHelpBlock" muted>
        </Form.Text>
    </div>
    )
}
