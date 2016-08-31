
class gapiLoader {
	constructor() {
		this.loaded = false;
	}

	loadAPI() {
		try {
			gapi.client.load('tipsters', 'v1', this.loadAPICallback.bind(this), '//' + window.location.host + '/_ah/api');
			gapi.client.load('oauth2', 'v2', function () {});
		}
		catch (e){
			console.log(e);
			if (e instanceof TypeError || e instanceof ReferenceError){
				setTimeout(() => this.loadAPI(), 500);
			}
		}
	}
	
	loadAPICallback () {
		this.loaded = true;
		console.log("tipsters api loaded");
	}

	apiLoaded(){
		return this.loaded === true;
	}
}

export default (new gapiLoader);