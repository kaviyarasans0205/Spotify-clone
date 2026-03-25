import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import Player from './Player'
import Display from './Display'
import { PlayerContext } from '../context/PlayerContext'
const Home =() => {
    const {audioRef,track}= useContext(PlayerContext)
    return (
        
        <div className='h-screen bg-black'>
        <div className='h-[100%] flex'>
            <Sidebar/>
            <Display/>
        </div>
        <Player/>
        <audio ref={audioRef} src={track.file} preload='auto'></audio>
        </div>
    )
}
 <div className="text-white p-8">
      <h1 className="text-3xl">Home</h1>
    </div>

   

export default Home