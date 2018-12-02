import React, { Fragment } from 'react';
import Flex from './../Flex';
import Button from './../Button';
import Card from './../Card';
import CardActionArea from './../CardActionArea';
import CardActions from './../CardActions';
import CardContent from './../CardContent';
import CardHeader from './../CardHeader';
import CardMedia from './../CardMedia';
import IconButton from './../IconButton';
import Typography from './../Typography';
import cn from './../theme/className';
import { PlayArrowIcon, SkipNextIcon, SkipPreviousIcon } from './DemoIcons';

function Bullet() {
	return (
		<span className={cn({ display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)' })}>
			•
		</span>
	);
}

function CardDemo(props) {
	return (
		<Fragment>
			<Flex justifyContent="center" mb={4}>
				<Card minWidth={275}>
					<CardContent>
						<Typography color="text.secondary" mb={1}>
							Word of the Day
						</Typography>
						<Typography variant="h5">
							be
							<Bullet />
							nev
							<Bullet />o<Bullet />
							lent
						</Typography>
						<Typography mb={3} color="text.secondary">
							adjective
						</Typography>
						<Typography>
							well meaning and kindly.
							<br />
							{'"a benevolent smile"'}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Learn More</Button>
					</CardActions>
				</Card>
			</Flex>
			<Flex justifyContent="center" mb={4}>
				<Card maxWidth={345}>
					<CardActionArea>
						<CardMedia
							h={140}
							image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
							title="Contemplative Reptile"
						/>
						<CardContent>
							<Typography variant="h5" mb={2}>
								Lizard
							</Typography>
							<Typography>
								Lizards are a widespread group of squamate reptiles, with over 6,000
								species, ranging across all continents except Antarctica
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">
							Share
						</Button>
						<Button size="small" color="primary">
							Learn More
						</Button>
					</CardActions>
				</Card>
			</Flex>
			<Flex justifyContent="center" mb={4}>
				<Card>
					<Flex>
						<Flex direction="col">
							<CardContent>
								<Flex direction="col" flex="1 0 auto">
									<Typography variant="h5">Live From Space</Typography>
									<Typography variant="subtitle1" color="text.secondary">
										Mac Miller
									</Typography>
								</Flex>
							</CardContent>
							<Flex align="center" pl={2} pb={1}>
								<IconButton aria-label="Previous">
									<SkipPreviousIcon />
								</IconButton>
								<IconButton aria-label="Play/pause">
									<PlayArrowIcon />
								</IconButton>
								<IconButton aria-label="Next">
									<SkipNextIcon />
								</IconButton>
							</Flex>
						</Flex>
						<CardMedia
							w={151}
							image="https://material-ui.com/static/images/cards/live-from-space.jpg"
							title="Live from space album cover"
						/>
					</Flex>
				</Card>
			</Flex>
		</Fragment>
	);
}

export default CardDemo;
