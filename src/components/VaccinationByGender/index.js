import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {data} = props
  console.log(data)

  return (
    <div className="vaccination-by-gender">
      <h1 className="vaccine-by-gender-heading">Vaccination by gender</h1>
      <PieChart height={300} width={1000}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: '12',
            fontFamily: 'Roboto',
          }}
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByGender
