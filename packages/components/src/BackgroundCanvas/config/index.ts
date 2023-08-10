import amongUs from './among-us';
import confetti from './confetti';
import connect from './connect';
import growing from './growing';
import nyanCat from './nyan-cat';
import parallax from './parallax';
import trails from './trails';
import twinkle from './twinkle';
const options = [
  amongUs,
  confetti,
  parallax,
  trails,
  twinkle,
  connect,
  growing,
  nyanCat,
];

export const getOptions = () =>
  options[Math.floor(Math.random() * options.length)];
