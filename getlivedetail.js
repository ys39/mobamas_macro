// main.js
// npm install puppeteer@0.13.0
const pptr = require('puppeteer');
var argv = require('argv');

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

	var mainpageurl = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http://125.6.169.35/idolmaster/mypage"
	await page.goto(mainpageurl)
	var data = await page.$eval('.btn_main_battle .gauge_value', item => {
		return item.textContent;
	});
	console.log(data)

	// finish browser
	await browser.close()
}

// execute run
run()
