FEWA
====
Fire Earth Water Air

Shooter game for the js13k 2014 contest

#Game rules#
You have the four elements and 3 types of bricks from each element type.
Striked bricks are weak, filled bricks are stronger and signed bricks are the strongest.
If you shoot the signed bricks with the proper element it has special effect.

Fire special brick explodes the whole column of bricks.
Earth special brick explodes surrounding bricks.
Water special brick explodes the whole row of bricks.
Air special brick explodes all the weak(stroked) air bricks.

The Fire element, most effective against fire bricks, but least effective against water bricks.
The Earth element, most effective against earth bricks, but least effective against air bricks.
The Water element, most effective against water bricks, but least effective against fire bricks.
The Air element, most effective against air bricks, but least effective against earth bricks.

#Controls#
**Swap/Move elements:** Click highlighted column to select an element and click to drop to another column    
**Pause:** P  
**Mute:** M

#Quickstart#
- clone the repo
- in command prompt or terminal run: "npm install", then run "gulp" for development mode or "gulp build" to build production to /dist folder

#Credits#
**Created by:** Zoltan Pasztor & Csaba Tuncsik
**Audio Processing:** [JSFXR](https://github.com/mneubrand/jsfxr) by [@markusneubrand](https://twitter.com/markusneubrand)
**Game sound inspired by:** [@jackrugile](https://twitter.com/jackrugile) (http://codepen.io/jackrugile/blog/arcade-audio-for-js13k-games)
**Game random number utility inspired by:** # JS13KGames Boilerplate (https://github.com/ooflorent/js13k-boilerplate/blob/master/src/rng.js)