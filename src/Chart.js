import { PieChart,pieArcLabelClasses  } from '@mui/x-charts/PieChart';
function Chart(props) {
    const data = props.records;

    const groupedData = data.reduce((acc, curr) => {
        const label = curr.opp;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});
      
    const arr = Object.entries(groupedData).map(([label, value]) => ({
        label,
        value
      }));
      arr.sort((a, b) => b.value - a.value);
    
      const totalValue = arr.reduce((total, entry) => total + entry.value, 0);

      const threshold = 0.03 * totalValue;
      const newArr = arr.reduce(
        (acc, entry) => {
          if (entry.value < threshold) {
            acc.others.value += entry.value;
            acc.others.labels.push(entry.label);
          } else {
            acc.filteredArr.push(entry);
          }
          return acc;
        },
        { filteredArr: [], others: { label: "others", value: 0, labels: [] } }
      );

      newArr.filteredArr.push({
        label: newArr.others.label,
        value: newArr.others.value
      });

      console.log(newArr.filteredArr);
    return(
        <div>
          <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label} : ${item.value}`,
              arcLabelMinAngle: 30,
              highlightScope: {faded: 'global',highlighted: 'item' },
              highlighted: {opacity:0.1},
              faded: {additionalRadius:-20,color:'black'},
              data: newArr.filteredArr
            }]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontSize:24,
              },
            }}
          width={900}
          height={500}
          />
          
          
        </div>
    );
}

export default Chart;