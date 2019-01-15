const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for your response');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');
		_.chain(req.body)
			.map(({ email, url }) => {
				// URL helps us extract just the route and not the domain
				const match = p.test(new URL(url).pathname);
				// we cannot destructure match bcos match might return an object of required details or null
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			// remove undefined events
			.compact()
			// remove duplicate records
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true }
					}
				).exec();
			})
			.value();

		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		// Send an email!
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			// send back user object so header can be updated
			res.send(user);
		} catch (error) {
			res.status(422).send(error);
		}
	});
};
