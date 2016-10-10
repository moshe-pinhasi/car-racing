// the sounds took from http://soundbible.com/free-sound-effects-4.html

const audioStart        = new Sound('gunshot');
const audioTicker       = new Sound('tick');
const audioCheering     = new Sound('cheering');
const audioCarAccelerating     = new Sound('car-accelerating');

const random = new Random();

const elCars = Array.from(document.querySelectorAll('.car'));
const END_OF_GAME = document.getElementById('road').offsetWidth - elCars[0].offsetWidth;
const maxPower = 20;
const roundGap = 5;


// Here is our DOM operation for moving that car:
const moveCar = (elCar, power) => {
	const currLoc = parseInt(elCar.style.left) + power;
	if (currLoc < 0 ) currLoc = 0;
	elCar.style.left = currLoc + 'px';
	return currLoc;
};

const getElementById = (id) => document.getElementById(id);
const setVisibility = (el, visibility) => el.style.visibility = visibility;
const showElement = (id) => setVisibility(getElementById(id), "visible");
const hideElement = (id) => setVisibility(getElementById(id), "hidden");

const endGame = () => {
	
	audioCarAccelerating
		.removeListener('focus')
		.removeListener('blur')
		.stop();
		
	audioCheering
		.addListener('focus')
		.addListener('blur')
		.play();
		
	showElement('startBtn');
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
	hideElement('ticker');
	audioStart.play();
	
	audioCarAccelerating
		.addListener('focus')
		.addListener('blur')
		.play();	
	
	makeRound();
};

const tickerEl = getElementById('ticker');
const ticker = (tikerVal) => {
	if (tikerVal > 0) {
		tickerEl.innerHTML  = tikerVal;
		audioTicker.play();
		setTimeout( () => ticker(--tikerVal), 1000);
		return;
	}
	
	start();
};

const init = () => {

	audioCheering
		.removeListener('focus')
		.removeListener('blur')
		.stop();
		
	hideElement('startBtn');
	showElement('ticker');
	
	elCars.forEach( elCar => elCar.style.left = 0);	
	
};

const newGame = () => {
	init();
	ticker(3);
};