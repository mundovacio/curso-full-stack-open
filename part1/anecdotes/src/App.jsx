import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const initialVotes = anecdotes.reduce((acc, _, i) => (acc[i] = 0, acc), {});

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const handleRandomAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    while (randomIndex === selected) {
      randomIndex = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomIndex)
  }

  const handleNextAnecdote = () => {
    setSelected(selected == 7 ? 0 : selected + 1)
  }

  const handlVoteAnecdote = () => {
    const newVotes = { ...votes }
    newVotes[selected] += 1;
    setVotes(newVotes)
  }

  const getAnecdoteMostVoted = () => {
    let maxVoted = 0
    let maxVotedIndex = 0

    for (const [anecdoteIndex, anecdoteVotes] of Object.entries(votes)) {
      if (anecdoteVotes > maxVoted) {
        maxVoted = anecdoteVotes
        maxVotedIndex = anecdoteIndex
      }
    }

    return maxVotedIndex
  }

  return (
    <>
      <section>
        <header>
          <h2>Anecdore of the day</h2>
          <div>
            <Button onClick={handleNextAnecdote} text={'Next anecdote'} />
            <Button onClick={handleRandomAnecdote} text={'Random anecdote'} />
          </div>
        </header>
        <p>{anecdotes[selected]}</p>
        <footer>
          <p>Has {votes[selected]} votes <Button onClick={handlVoteAnecdote} text={'Vote'} /></p>
        </footer>
      </section>
      <section>
        <header>
          <h2>Anecdore with most votes</h2>
        </header>
        {anecdotes[getAnecdoteMostVoted()]}
        <footer>
          <p>Has {votes[getAnecdoteMostVoted()]} votes</p>
        </footer>
      </section>
    </>
  )
}

export default App