
import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Feedback = ({
  onGoodClick,
  onNeutralClick,
  onBadClick
}) => {
  return (
    <section>
      <header>
        <h2>Feedback</h2>
      </header>
      <div>
        <Button onClick={onGoodClick} text="good" />
        <Button onClick={onNeutralClick} text="neutral" />
        <Button onClick={onBadClick} text="bad" />
      </div>
    </section>
  )
}
const Stadistics = ({ stats }) => {

  const all = stats.reduce((acc, { value }) => acc + value, 0)
  const average = (stats.filter(({ name }) => name === 'good')[0].value - stats.filter(({ name }) => name === 'bad')[0].value) / all || 0
  const positive = stats.filter(({ name }) => name === 'good')[0].value / all * 100 || 0
  return (
    <section>
      <header>
        <h2>Stadistics</h2>
      </header>
      {all ?
        <table>
          <tbody>
            {stats.map(val => (
              <tr key={val.name}>
                <td>{val.name}</td>
                <td>{val.value}</td>
              </tr>
            ))}
            <tr >
              <td>all</td>
              <td>{all}</td>
            </tr>
            <tr >
              <td>average</td>
              <td>{average}</td>
            </tr>
            <tr >
              <td>positive</td>
              <td>{positive} %</td>
            </tr>
          </tbody>
        </table>
        :
        <p>No feedback given</p>
      }

    </section>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Feedback
        onGoodClick={() => setGood(good + 1)}
        onNeutralClick={() => setNeutral(neutral + 1)}
        onBadClick={() => setBad(bad + 1)}
      />
      <Stadistics stats={[
        { name: "good", value: good },
        { name: "neutral", value: neutral },
        { name: "bad", value: bad },
      ]} />
    </>
  )
}

export default App