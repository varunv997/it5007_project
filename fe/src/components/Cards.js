import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Games!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/chrome_dino.png'
              text='Take your dino for a ride in this browser based game!'
              label='Arcade'
              path='/services/dino'
            />
            <CardItem
              src='images/gta5.jpg'
              text='Master the sandbox world in GTA V (Coming soon)'
              label='Open World Sandbox'
              path='#'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/nfsmw.jpg'
              text='Welcome to Rockport City, the speed has no limit here! (Coming soon)'
              label='Racing'
              path='#'
            />
            <CardItem
              src='images/fifa22.jpeg'
              text='Experience Football with FIFA 22 (Coming soon)'
              label='Sports'
              path='#'
            />
            <CardItem
              src='images/aoe4.jpg'
              text='Build your civilization, preserve it, conquer others in AOE IV (Coming soon)'
              label='Strategy'
              path='#'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
