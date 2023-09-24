import '../styles/style.css';
import { Game } from './game/game.class';

const gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const gameContext = gameCanvas.getContext('2d');

const game = new Game(gameContext!, document);
game.start();
