import './App.css';

import { Table } from 'react-bootstrap';
import React from 'react';


function RateTable(props){
    const data = props.records;

    const groupedData = data.reduce((acc, item) => {
        const key = `${item.player}-${item.opp}`;
        acc[key] = acc[key] || { player: item.player, opp: item.opp, total: 0, firstCount:0, winCount:0 };
        acc[key].total += 1;
        acc[key].firstCount += item.first === 'O' ? 1 : 0;
        acc[key].winCount += item.result === 'W' ? 1 : 0;

        return acc;
      }, {});

    const tableData = Object.values(groupedData);

    const players = [...new Set(data.map((item) => item.player))];
    const opps = [...new Set(data.map((item) => item.opp))];



    return(
        <div>
            <h2>Win Rate Breakdown</h2>
        <Table bordered hover>
        <thead>
          <tr>
            <th>Opponent/Player</th>
            {players.map((player) => (
              <th key={player}>{player}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {opps.map((opp) => (
            <tr key={opp}>
              <td>{opp}</td>
              {players.map((player) => {
                const key = `${player}-${opp}`;
                const item = tableData.find((i) => i.player === player && i.opp === opp) || { total: 0, firstCount: 0 };
                const firstRate = item.total !== 0 ? ((item.firstCount / item.total) * 100).toFixed(2) : 0;
                const winRate = item.total !== 0 ? ((item.winCount / item.total) * 100).toFixed(2) : 0;
                return (
                  <td key={key} className={winRate<45&&item.total>0?"low-rate":winRate>55?"high-rate":"mod-rate"}>
                    {`${item.total}, First: ${firstRate}%, Win: ${winRate}%`}
                  </td>
                );
              })}
              
            </tr>
          ))}
        <tr>
  <td><strong>Total</strong></td>
  {players.map((player) => {
    const totalPlayerData = tableData.filter((item) => item.player === player);
    const totalFirstCount = totalPlayerData.reduce((acc, item) => acc + item.firstCount, 0);
    const totalWinCount = totalPlayerData.reduce((acc, item) => acc + item.winCount, 0);
    const totalMatchCount = totalPlayerData.reduce((acc, item) => acc + item.total, 0);
    const playerFirstRate = totalMatchCount !== 0 ? ((totalFirstCount / totalMatchCount) * 100).toFixed(2) : 0;
    const playerWinRate = totalMatchCount !== 0 ? ((totalWinCount / totalMatchCount) * 100).toFixed(2) : 0;
    return (<td key={player}><strong>{`First: ${playerFirstRate}%, Win: ${playerWinRate}%`}</strong></td>);
  })}
</tr>  
        </tbody>
      </Table>
      </div>
    );

}
export default RateTable;