// the sounds took from http://soundbible.com/free-sound-effects-4.html

class Random {
	nextInt(maxNumber) {
		return Math.floor((Math.random() * maxNumber));
	}
}

const audioStart        = new Audio('sounds/gunshot.mp3');
const audioTicker       = new Audio('sounds/tick.mp3');
const audioCheering     = new Audio('sounds/cheering.mp3');
const audioCarAccelerating     = new Audio('sounds/car-accelerating.mp3');


const elCars = Array.from(document.querySelectorAll('.car'));
const random = new Random();
const maxPower = 20;
const roundGap = 5;

const END_OF_GAME = document.getElementById('road').offsetWidth - elCars[0].offsetWidth;

// Here is our DOM operation for moving that car:
const moveCar = (elCar, power) => {
	const currLoc = parseInt(elCar.style.left) + power;
	if (currLoc < 0 ) currLoc = 0;
	elCar.style.left = currLoc + 'px';
	return currLoc;
};

const endGame = () => {
	audioCarAccelerating.pause();
	audioCheering.play();
	document.getElementById('startBtn').style.visibility = "visible";
};
				
const makeRound = () => setTimeout( () => {
	const carId = random.nextInt(elCars.length);
	const power = random.nextInt(maxPower);
	moveCar(elCars[carId], power);
	
	if (parseInt(elCars[carId].style.left) < END_OF_GAME) {
		makeRound();
		return;
	}
	
	endGame();
	
}, roundGap);

const start = () => {
	document.getElementById('ticker').style.visibility = "hidden";
	audioStart.play();
	audioCarAccelerating.play();
	makeRound();
};

const ticker = (tikerVal) => {
	if (tikerVal > 0) {
		document.getElementById('ticker').innerHTML  = tikerVal;
		audioTicker.play();
		setTimeout( () => ticker(--tikerVal), 1000);
		return;
	}
	
	start();
};

const init = () => {

	document.getElementById('startBtn').style.visibility = "hidden";
	elCars.forEach( elCar => elCar.style.left = 0);
	
	audioCheering.pause();
	audioCheering.currentTime = 0;
	audioCarAccelerating.currentTime = 0;
	tikerVal = 3;
	
	document.getElementById('ticker').style.visibility = "visible";	
};

const newGame = () => {
	init();
	start(3);
};