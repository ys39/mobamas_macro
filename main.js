// main.js
// npm install puppeteer@0.13.0
const pptr = require('puppeteer');
var argv = require('argv');
var settings = require('./settings');

async function run(){

    // launch browser
    const browser = await pptr.launch({
	headless: true,
	args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    //args: ['--lang=ja,en-US,en']
    // make Page
    const page = await browser.newPage()

    // set Size
    await page.setViewport({ width: 720, height: 600 })

	// set UserAgent
	await page.setUserAgent('iPhone')

	var idf = argv.run().targets[0]

	// set Mobamas ID
	if(idf == "1"){
		var midarr = settings.midarr1;
	}else if(idf == "2"){
		var midarr = settings.midarr2;
	}else if(idf == "3"){
		var midarr = settings.midarr3;
	}else if(idf == "4"){
		var midarr = settings.midarr4;
	}else if(idf == "5"){
		var midarr = settings.midarr5;
	}else if(idf == "6"){
		var midarr = settings.midarr6;
	}else if(idf == "7"){
		var midarr = settings.midarr7;
	}else{
		console.log(idf)
		console.log("\n   第一引数に数値を設定してください");
		console.log("   ex) node main.js 1\n")
		process.exit(0);
	}

	// set Cookie
	await page.setCookie({
		"value": "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Mzk1MDU0NzYsImlzcyI6Imh0dHBzOi8vY29ubmVjdC5tb2JhZ2UuanAiLCJ0eXAiOiJzZXNzaW9uIiwiX2V4dCI6eyJpIjoxLCJpZyI6MCwiciI6IjMxMTE5NDMwMSIsImwiOjAsInUiOjIwODA1MTkyODcsInAiOjB9LCJleHAiOjE1NzEwNDE0NzYsInN1YiI6Ijk4MzEwMDAiLCJqdGkiOiIzMTExOTQzMDEifQ.I7YDnsk1KKrK0Mip3Tnghluh2AXGH8DUe12bEW3d_Nc",
		"name": "CSID_P",
		"domain": ".mobage.jp"
	})
	await page.setCookie({
		"value": "73647f88c8df440bd1d8c1c2349a3cafdae8e9a0",
		"name": "CTID_P",
		"domain": ".mobage.jp"
	})
	await page.setCookie({
		"value": "311194301",
		"name": "CSSID",
		"domain": "connect.mobage.jp"
	})

	// loop mid
	for(var mid of midarr) {
	//midarr.forEach(function(mid) {
		// loop count 3
		for(var index = 1; index <= 2; index++){

			// set URL
			var url = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http://125.6.169.35/idolmaster/battles/battle_check/"+mid

			// go to URL
			await page.goto(url)

			// Click Live battle
			const inputElement = await page.$('input[type=submit]');
			await inputElement.click();

			// wait 2 sec
			await page.waitFor(2000);

			// output result
			console.log('Finish Live : MID = %d / %d 回目',mid,index);
		}
	}

	console.log("Finish Live!");

    // finish browser
    await browser.close()
}

// execute run
run()
