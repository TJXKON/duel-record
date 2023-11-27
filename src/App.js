import { useState } from 'react';
import './App.css';

import recordsData from './records.json';
import { Button } from 'react-bootstrap';
import Records from './Records.js';
import AddRecord from './AddRecord.js';
import RateTable from './RateTable';
import Chart from './Chart.js';


function App() {
  
  const [data,setRecords] = useState(recordsData);
  /**useEffect(()=>{
    setRecords(recordsData);
  })*/
  
  const submitRecord=(record)=>{
    
    if(!record){
      return;
    }

    const newRecords = data.concat([{player:record.player,opp:record.opp,details:record.details,first:record.first,result:record.result}]);
    setRecords(newRecords);
  }
/*
  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData,{
        header:true,
        skipEmptyLines:true}).data;
        setRecords(parsedData);
    };
    fetchData();
  },[]);
**/

  const [activeComponent, setActiveComponent] = useState('Records');

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
   <div>
      <h1>Duel Records</h1>
      <div className='buttons' active>
      <Button variant="dark" size="lg" className='button'
        onClick={() => handleButtonClick('Records')}
        disabled={activeComponent === 'Records'}>List of Records</Button>
        <Button variant="dark" size="lg" className='button'
        onClick={() => handleButtonClick('RateTable')}
        disabled={activeComponent === 'RateTable'}>
        Win Rate Breakdown</Button>
        <Button variant="dark" size="lg" className='button'
        onClick={() => handleButtonClick('AddRecord')}
        disabled={activeComponent === 'AddRecord'}>Add Record</Button>
        <Button variant="dark" size="lg" className='button'
        onClick={() => handleButtonClick('Chart')}
        disabled={activeComponent === 'Chart'}>Pie Chart</Button>
      </div>
      <div className='table-container'>
      {activeComponent === 'RateTable' && <RateTable records={data}/>}
      {activeComponent === 'Records' && <Records records={data}/>}
      {activeComponent === 'AddRecord' && <AddRecord onNewRecord={(newRecord)=>submitRecord(newRecord)}/>}
      {activeComponent === 'Chart' && <Chart records={data}/>}
      </div>
      <br/><br/>
      <footer/>
   </div>
  );
}

export default App;
