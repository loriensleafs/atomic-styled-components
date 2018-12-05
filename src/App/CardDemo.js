import React, { Fragment, useCallback, useState } from 'react';
import Avatar from './../Avatar';
import Box from './../Box';
import Button from './../Button';
import Card from './../Card';
import CardActionArea from './../CardActionArea';
import CardActions from './../CardActions';
import CardContent from './../CardContent';
import CardMedia from './../CardMedia';
import Collapse from './../Collapse';
import ExpandMoreIcon from './../svgIcons/ExpandMore';
import FavoriteIcon from './../svgIcons/Favorite';
import Flex from './../Flex';
import IconButton from './../IconButton';
import List from './../List';
import ListItem from './../ListItem';
import ListItemText from './../ListItemText';
import MoreVertIcon from './../svgIcons/MoreVert';
import Rotate from './../Rotate';
import ShareIcon from './../svgIcons/Share';
import Typography from './../Typography';
import cn from './../theme/className';
import DemoBox from './DemoBox';
import { PlayArrowIcon, SkipNextIcon, SkipPreviousIcon } from './DemoIcons';
import CardHeader from '../CardHeader/CardHeader';

const Bullet = () => (
	<span className={cn({ display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)' })}>
		•
	</span>
);

const DemoNavigation = () => (
	<Box minWidth={200} maxWidth={200} style={{ fontSize: '12px' }}>
		<List dense style={{ position: 'sticky', top: 0 }}>
			<ListItem button>
				<ListItemText secondary="Contents" />
			</ListItem>
			<ListItem button component="a" href="#contained-buttons">
				<ListItemText secondary="Simple Card" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Complex Interaction" disabled />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Media" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="UI Controls" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="API" disabled />
			</ListItem>
		</List>
	</Box>
);

const DemoIntro = () => (
	<Fragment>
		<Typography variant="h2" mb={3}>
			Cards
		</Typography>
		<Typography variant="h5" mb={4}>
			Cards contain content and actions about a single subject.
		</Typography>
		<Typography mb={4}>
			<a href="https://material.io/design/components/cards.html">Cards</a> are surfaces that
			display content and actions on a single topic.
			<br />
			<br />
			They should be easy to scan for relevant and actionable information. Elements, like text
			and images, should be placed on them in a way that clearly indicates hierarchy.
		</Typography>
	</Fragment>
);

const SimpleCard = () => (
	<Fragment>
		<Typography id="contained-buttons" variant="h4" mb={4}>
			Simple Card
		</Typography>
		<Typography mb={3}>
			Although cards can support multiple actions, UI controls, and an overflow menu, use
			restraint and remember that cards are entry points to more complex and detailed
			information.
		</Typography>
		<DemoBox>
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
		</DemoBox>
	</Fragment>
);

const ComplexInteractiveCard = () => {
	const [expanded, setExpanded] = useState(false);

	return (
		<Fragment>
			<Typography variant="h4" mb={4}>
				Complex Interaction
			</Typography>
			<Typography mb={3}>On desktop, card content can expand.</Typography>
			<DemoBox>
				<Card maxWidth={400}>
					<CardHeader
						avatar={
							<Avatar aria-label="Recipe" bg="primary.main">
								R
							</Avatar>
						}
						action={
							<IconButton mr={2}>
								<MoreVertIcon />
							</IconButton>
						}
						title="Shrimp and Chorizo Paella"
						subheader="September 14, 2016"
					/>
					<CardMedia
						h={0}
						image="https://material-ui.com/static/images/cards/paella.jpg"
						pt="56.25%"
						title="Paella dish"
					/>
					<CardContent>
						<Typography>
							This impressive paella is a perfect party dish and a fun meal to cook
							together with your guests. Add 1 cup of frozen peas along with the
							mussels, if you like.
						</Typography>
					</CardContent>
					<CardActions disableActionSpacing>
						<Flex w={1} justifyContent="space-between">
							<Box>
								<IconButton>
									<FavoriteIcon />
								</IconButton>
								<IconButton>
									<ShareIcon />
								</IconButton>
							</Box>
							<IconButton
								aria-expanded={expanded}
								aria-label="Show more"
								onClick={() => setExpanded(() => !expanded)}>
								<Rotate deg={expanded ? 180 : 0}>
									<ExpandMoreIcon />
								</Rotate>
							</IconButton>
						</Flex>
					</CardActions>
					<Collapse in={expanded}>
						<CardContent>
							<Typography>Method:</Typography>
							<br />
							<Typography>
								Heat 1/2 cup of the broth in a pot until simmering, add saffron and
								set aside for 10 minutes.
							</Typography>
							<br />
							<Typography>
								Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
								over medium-high heat. Add chicken, shrimp and chorizo, and cook,
								stirring occasionally until lightly browned, 6 to 8 minutes.
								Transfer shrimp to a large plate and set aside, leaving chicken and
								chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
								onion, salt and pepper, and cook, stirring often until thickened and
								fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
								cups chicken broth; bring to a boil.
							</Typography>
							<br />
							<Typography>
								Add rice and stir very gently to distribute. Top with artichokes and
								peppers, and cook without stirring, until most of the liquid is
								absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
								shrimp and mussels, tucking them down into the rice, and cook again
								without stirring, until mussels have opened and rice is just tender,
								5 to 7 minutes more. (Discard any mussels that don’t open.)
							</Typography>
							<br />
							<Typography>
								Set aside off of the heat to let rest for 10 minutes, and then
								serve.
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			</DemoBox>
		</Fragment>
	);
};

const MediaCard = () => (
	<Fragment>
		<Typography id="contained-buttons" variant="h4" mb={4}>
			Media
		</Typography>
		<Typography mb={3}>Example of a card using an image to reinforce the content.</Typography>
		<DemoBox>
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
		</DemoBox>
	</Fragment>
);

const UIControlsCard = () => (
	<Fragment>
		<Typography id="contained-buttons" variant="h4" mb={4}>
			UI Controls
		</Typography>
		<Typography mb={3}>
			Supplemental actions within the card are explicitly called out using icons, text, and UI
			controls, typically placed at the bottom of the card.
			<br />
			<br />
			Here's an example of a media control card.
		</Typography>
		<DemoBox>
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
		</DemoBox>
	</Fragment>
);

export default () => (
	<Flex w={1}>
		<Box>
			<DemoIntro />
			<SimpleCard />
			<ComplexInteractiveCard />
			<MediaCard />
			<UIControlsCard />
		</Box>
		<DemoNavigation />
	</Flex>
);
