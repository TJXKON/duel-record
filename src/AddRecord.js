import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddRecord({onNewRecord}){
    const [inputs,setInputs] = useState({});
    const [first,setFirst] = useState("O");
    const [result,setResult] = useState("W");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    const handleFirst = (event) =>{
        setFirst(event.target.value);
    }
    const handleResult = (event) =>{
        setResult(event.target.value);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const record = {player:inputs.player,opp:inputs.opp,details:inputs.details,first:first,result:result};
        onNewRecord(record);
    };


    return(
        <div className='add-record'>
        <h3>Add Record</h3>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Player</Form.Label>
                <Form.Control type="text" name='player' value={inputs.player||""} onChange={handleChange} placeholder='Enter player' required />
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>Opponent</Form.Label>
                <Form.Control type="text" name='opp' value={inputs.opp||""} onChange={handleChange} placeholder='Enter opponent' required />
                <Form.Label>Details</Form.Label>
                <Form.Control type="text" name='details' value={inputs.details||""} onChange={handleChange} placeholder="Enter Details"/>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>First</Form.Label>
                <Form.Select value={first} onChange={handleFirst}>
                    <option value='O'>First</option>
                    <option value='X'>Second</option>
                </Form.Select>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>Result</Form.Label>
                <Form.Select value={result} onChange={handleResult}>
                    <option value="W">Win</option>
                    <option value="L">Lose</option>
                </Form.Select>
            </Form.Group>
            <br/>
            <Button type="submit">Submit</Button>
        </Form>
    </div>
    )
}

export default AddRecord;