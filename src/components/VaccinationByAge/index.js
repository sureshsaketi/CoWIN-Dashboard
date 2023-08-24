import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {data} = props
  console.log(data)

  return (
    <div className="vaccination-by-age">
      <h1 className="vaccine-by-age-heading">Vaccination by Age</h1>
      <PieChart height={300} width={1000}>
        <Pie data={data} outerRadius="70%" dataKey="count">
          <Cell name="18-44" fill=" #5a8dee" />
          <Cell name="44-60" fill="#6c757d" />
          <Cell name="Above 60" fill="#2cc6c6" />
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
export default VaccinationByAge
