import React, { useState } from 'react'

const Search = () => {
  const [songs, setSongs] = useState([])

  const searchSongs = async (e) => {
    const query = e.target.value
    if(query.length < 2) return;

    const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song`)
    const data = await res.json()
    setSongs(data.results)
  }

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl">Search Songs</h1>
      <input
        type="text"
        placeholder="Search songs..."
        onChange={searchSongs}
        className="mt-4 p-2 text-black rounded"
      />

      {songs.map((song, index) => (
        <div key={index}>
          {song.trackName} - {song.artistName}
        </div>
      ))}
    </div>
  )
}
export default Search