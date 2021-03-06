import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SavedCard from './SavedCard';
import discordImg from '../images/discord.png';
import slackImg from '../images/slack.png';

const Home = () => {
	const [ webhooks, setWebhooks ] = useState([]);

	const reloadWebhooks = () => {
		let webhooksStr = localStorage.getItem('webhooks');
		if (webhooksStr) {
			setWebhooks(
				JSON.parse(webhooksStr).map((item) => {
					return (
						<SavedCard
							title={item.name}
							key={item.id}
							img={item.type === 'discord' ? discordImg : slackImg}
							url={item.url}
							id={item.id}
							reload={reloadWebhooks}
						/>
					);
				})
			);
		}
	};

	useEffect(() => {
		reloadWebhooks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="home-container">
			<div className="card platform-card">
				<h5 className="platform-title">Select a platform below.</h5>
				<div className="platform-link-container">
					<Link className="platform-link" to="/add/discord">
						<img alt="discord-img" src={discordImg} />
						<p>Discord</p>
					</Link>
					<Link className="platform-link" to="/add/slack">
						<img alt="slack-img" src={slackImg} />
						<p>Slack</p>
					</Link>
				</div>
			</div>
			<div className="home-flex-container home-delay-ani">
				<div className="home-flex-column about-card-column">
					<h4 className="card-title">What is Talon?</h4>
					<div className="about-card card">
						<p className="about-card-title">About Talon</p>
						<p className="about-card-description">
							Talon is a cross platform application by{' '}
							<span>
								<a
									className="hidden-link"
									href="https://peroxaan.com/"
									rel="noopener noreferrer"
									target="_blank"
								>
									Peroxaan Studios
								</a>
							</span>{' '}
							that let's you manage and interact with webhooks for various services with ease.
						</p>
						<button
							onClick={() => window.open('https://peroxaan.com/Talon/')}
							className="btn about-card-btn"
						>
							Learn More
						</button>
						<button
							onClick={() => window.open('https://twitter.com/TalonApp')}
							className="btn about-card-btn"
						>
							Twitter
						</button>
					</div>
				</div>
				<div className="home-flex-column">
					<h4 className="card-title">
						Saved Webhooks <span>({webhooks.length})</span>
					</h4>
					<p style={{ display: webhooks.length ? 'none' : '' }} className="no-saved-message">
						You currently do not have any saved Webhooks.
					</p>
					{webhooks}
				</div>
			</div>
		</div>
	);
};

export default Home;
