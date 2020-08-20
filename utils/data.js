const descriptions = [
  'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group.',
  'A questionnaire is a research instrument consisting of a series of questions for the purpose of gathering information from respondents.',
  'The Rubik\'s Cube is a 3-D combination puzzle invented in 1974 by Hungarian sculptor and professor of architecture Ernő Rubik. Originally called the Magic Cube, the puzzle was licensed by Rubik to be sold by Ideal Toy Corp.',
  'Black magic has traditionally referred to the use of supernatural powers or magic for evil and selfish purposes.',
  'In computer systems, a snapshot is the state of a system at a particular point in time. The term was coined as an analogy to that in photography.',
  'Maps of Meaning: The Architecture of Belief is a 1999 book by Canadian clinical psychologist and psychology professor Jordan Peterson.',
  'In linguistics, meaning is the information or concepts that a sender intends to convey, or does convey, in communication with a receiver.'
];

const addresses = [
  '119  Rue du Palais, ÉPINAL | Lorraine, 88000',
  '40  Rue du Limas, BASTIA | Corse, 20600',
  '49  avenue du Marechal Juin, SAINT-LEU | Guyane, 97436',
  '88  Quai des Belges, MEAUX | Île-de-France, 77100',
  '59  Avenue des Pr, MONTIGNY-LE-BRETONNEUX | Île-de-France, 78180',
  '94  rue Léon Dierx, LIMOGES | Limousin, 87280',
  '103  rue des Dunes, SAINT-MAUR-DES-FOSSÈS | Île-de-France, 94100',
  '125  Rue de Verdun, MONTCEAU-LES-MINES | Bourgogne, 71300'
];

const randomDescription = () => descriptions[Math.floor(Math.random() * descriptions.length)];

const randomAddress = () => addresses[Math.floor(Math.random() * addresses.length)];

export const randomDistance = (min, max) => randomFromInterval(min, max);

export const randomRating = (min, max) => randomFromInterval(min, max).toFixed(1);

const randomFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const defaultAvatar = 'http://yaspeez.fourthapetech.com/dist/img/avatar5.png';
export const noImgUrl = 'http://yaspeez.fourthapetech.com/content/images/no-image-png.png';

export const apiImg = `https://picsum.photos/100`;

export const markers = [
  {latitude: 48.8647, longitude: 2.3490, name: 'Paris ParisParis ParisParis ParisParisParisParisParis', rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: randomDescription(), image: `${apiImg}`, id: '1', address: randomAddress()},
  {latitude: 48.7874, longitude: 2.3928, name: 'Vitry-sur-Seine', rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: randomDescription(), image: `${apiImg}`, id: '2', address: randomAddress()},
  {latitude: 47.2181, longitude: -1.5528, name: 'Nantes', rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: randomDescription(), image: `${apiImg}`, id: '3', address: randomAddress()},
  {latitude: 43.6045, longitude: 1.4440, name: 'Toulouse', rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: randomDescription(), image: `${apiImg}`, id: '4', address: randomAddress()},
  {latitude: 43.7744, longitude: 7.4975, name: 'Menton', rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: randomDescription(), image: `${apiImg}`, id: '5', address: randomAddress()},
  {latitude: 49.1800, longitude: -0.3700, name: 'Caen', rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: randomDescription(), image: `${apiImg}`, id: '6', address: randomAddress()},
  {latitude: 48.8439, longitude: 2.2473, name: 'Boulogne-Billancourt', rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: randomDescription(), image: `${apiImg}`, id: '7', address: randomAddress()},
];