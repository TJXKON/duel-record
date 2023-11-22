import { Table } from 'react-bootstrap';
import './App.css';

function Records(props){
    const records = props.records;
    

    return(
        <div>
          <h2>List of Records</h2>
        <Table bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Player</th>
            <th>Opponent</th>
            <th>Details</th>
            <th>First</th>
            <th>Win/Lose</th>
          </tr>
          </thead>
          <tbody>
          {records.map((item,i)=>{
            return  <tr key={i}>
                    <td>{i}</td>
                    <td>{item.player}</td>
                    <td>{item.opp}</td>
                    <td>{item.details}</td>
                    <td>{item.first}</td>
                    <td>{item.result==='W'?'Win':'Lose'}</td>
                    </tr>})}
        </tbody>
      </Table>
      </div>
    )
}

export default Records;