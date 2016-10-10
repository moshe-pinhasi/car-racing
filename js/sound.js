class Sound {
	
	constructor(filename) {
		this.audio = new Audio(`sounds/${filename}.mp3`);
	}
	
	play() {
		this.audio.play();
		
		this.audio.onended = () => {
			this.removeListener('focus');
			this.removeListener('blur');	
		};
		
		return this;
	}
	
	stop() {
		this.audio.pause();
		this.audio.currentTime = 0;
		return this;
	}
	
	pause() {
		this.audio.pause();
		return this;
	}
		
	addListener(event) {
		
		if (event === "focus") {
			this.focus = this.play.bind(this);
			window.addEventListener("focus", this.focus, false);
		}
		if (event === "blur") {
			this.blur = this.pause.bind(this);
			window.addEventListener("blur", this.blur, false);
		}
		
		return this;
	}
	
	removeListener(event) {
		this.focus = this.focus || (() => {});
		this.blur = this.blur || (() => {});
		if (event === "focus") window.removeEventListener("focus", this.focus, false);
		if (event === "blur") window.removeEventListener("blur", this.blur, false);
		return this;
	}
	
}
