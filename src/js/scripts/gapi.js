
class gapiLoader {
	constructor() {
		this.loaded = false;
	}

	loadAPI() {
		try {
			gapi.client.load('conference', 'v1', this.loadAPICallback.bind(this), '//' + window.location.host + '/_ah/api');
			gapi.client.load('oauth2', 'v2', function () {});
		}
		catch (e){
			if (e instanceof TypeError){
				setTimeout(() => this.loadAPI(), 500);
			}
		}
	}
	
	loadAPICallback () {
		this.loaded = true;
		console.log(this.loaded? "api loaded": "fuck this");
	}

	apiLoaded(){
		return this.loaded === true;
	}
}

export default (new gapiLoader);