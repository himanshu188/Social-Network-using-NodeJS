// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const profiles ={
	hpatel:{
		username: 'hpatel',
		name: 'himanshu patel',
		languages: ['javascript', 'java', 'python']
	},

	sjobs: {
		username: 'sjobs',
		name: 'steve jobs',
		languages: ['Swift', 'Objective C', 'C++']
	},

	bgates: {
		username: 'bgates',
		name: 'bill gates',
		languages: ['C', 'C#', 'Java']
	}
}
/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('profile', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

router.post('/post', (req, res) => {

	const body = req.body
	res.json({
		confirmation: 'success',
		data: body
	})
})

router.get('/query', (req, res) => {
	const name = req.query.name
	const age = req.query.age
	// res.json({		
	// 	query: 'test',
	// 	name: name,
	// 	age: age
	// })
	const data = {
		name: name,
		age: age
	}
	res.render('profile', data)
})

router.get('/profiles', (req, res) => {
	const keys = Object.keys(profiles)
	const list = []
	keys.forEach(key => {
		list.push(profiles[key])
	})

	// const timestamp = new Date()
	const data = {
		profiles: list,
		timestamp: req.timestamp
	}
	res.render('profiles', data)
})

router.get('/:path', (req, res) => {
	const path = req.params.path
	res.json({		
		data: path
	})
})

router.get('/:profile/:username', (req, res) => {
	const profile = req.params.profile
	const username = req.params.username
	const profile1 = profiles[username]
	
	if(profile1 == null){
		res.json({
			confirmation: 'fail',
			message:'Profile ' + username + ' not found'
		})
		return
	}
	const timestamp = new Date()
	profile1.timestamp = timestamp.toString()
	res.render('profile', profile1)
	// res.json({		
	// 	confirmation: 'success',
	// 	profile : profile1		
	// })
})

router.get('/test', (req, res) => {
	res.json({
		data: 'This is the test response'
	})
})

router.post('/addprofile', (req, res) => {

	const body = req.body
	body['languages'] = req.body.languages.split(', ')

	profiles[body.username] = body
	res.redirect('/profile/' + body.username)
	// res.json({
	// 	confirmation: 'success',
	// 	route: 'register',
	// 	data: body
	// })
})

/*  This route render json data */
router.get('/json', (req, res) => {
	res.json({
		confirmation: 'success',
		app: process.env.TURBO_APP_ID,
		data: 'this is a sample json route.'
	})
})

/*  This route sends text back as plain text. */
router.get('/send', (req, res) => {
	res.send('This is the Send Route')
})

/*  This route redirects requests to Turbo360. */
router.get('/redirect', (req, res) => {
	res.redirect('https://www.turbo360.co/landing')
})


module.exports = router
