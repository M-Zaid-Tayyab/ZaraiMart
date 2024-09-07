import images from "../config/images";

const dummyCropData = [
  {
    id: '1',
    imageUrl: 'https://source.unsplash.com/400x300/?carrots',
    name: "Carrots",
    rating: "3.5",
    noOfSold: "2,150",
    price: '250',
  },
  {
    id: '2',
    imageUrl: 'https://source.unsplash.com/400x300/?tomatoes',
    name: "Tomatoes",
    rating: "4.2",
    noOfSold: "3,800",
    price: '300',
  },
  {
    id: '3',
    imageUrl: 'https://source.unsplash.com/400x300/?potatoes',
    name: "Potatoes",
    rating: "4.0",
    noOfSold: "5,500",
    price: '400',
  },
  {
    id: '4',
    imageUrl: 'https://source.unsplash.com/400x300/?lettuce',
    name: "Lettuce",
    rating: "4.5",
    noOfSold: "1,950",
    price: '350',
  },
  {
    id: '5',
    imageUrl: 'https://source.unsplash.com/400x300/?broccoli',
    name: "Broccoli",
    rating: "4.7",
    noOfSold: "4,300",
    price: '320',
  },
  {
    id: '6',
    imageUrl: 'https://source.unsplash.com/400x300/?cucumbers',
    name: "Cucumbers",
    rating: "4.1",
    noOfSold: "2,800",
    price: '280',
  },
  {
    id: '7',
    imageUrl: 'https://source.unsplash.com/400x300/?bell-peppers',
    name: "Bell Peppers",
    rating: "4.4",
    noOfSold: "3,600",
    price: '380',
  },
  {
    id: '8',
    imageUrl: 'https://source.unsplash.com/400x300/?spinach',
    name: "Spinach",
    rating: "4.6",
    noOfSold: "2,500",
    price: '300',
  },
  {
    id: '9',
    imageUrl: 'https://source.unsplash.com/400x300/?onions',
    name: "Onions",
    rating: "3.8",
    noOfSold: "4,000",
    price: '260',
  },
  {
    id: '10',
    imageUrl: 'https://source.unsplash.com/400x300/?kale',
    name: "Kale",
    rating: "4.3",
    noOfSold: "2,300",
    price: '310',
  },
];

const vegetableData = [
  { id: 'all', name: 'All' },
  { id: '1', name: 'Carrot' },
  { id: '2', name: 'Broccoli' },
  { id: '3', name: 'Spinach' },
  { id: '4', name: 'Tomato' },
  { id: '5', name: 'Cucumber' },
  { id: '6', name: 'Bell Pepper' },
  { id: '7', name: 'Onion' },
  { id: '8', name: 'Lettuce' },
];
const sortData = [
  { id: '1', name: 'Popular' },
  { id: '2', name: 'Most recent' },
  { id: '3', name: 'Price high' },
  { id: '4', name: 'Price Low' },
];
const reviewFilter = [
  { id: 'all', rating: 'All' },
  { id: '1', rating: '5' },
  { id: '2', rating: '4' },
  { id: '3', rating: '3' },
  { id: '4', rating: '2' },
  { id: '5', rating: '1' },
];
const dummyReviews=[
  {
    "name": "Darlene Robertson",
    "rating": 5,
    "review": "The plant is very good, my son likes it very much and watching it every day 💯💯💯",
    "likes": 756,
    "postedDate": "6 days ago",
    "isLiked": true
  },
  {
    "name": "John Smith",
    "rating": 4,
    "review": "Impressive product, adds a nice touch to my room. Recommended! 👍",
    "likes": 432,
    "postedDate": "1 week ago",
    "isLiked": false
  },
  {
    "name": "Emily Davis",
    "rating": 3,
    "review": "Decent plant, but the color faded sooner than expected. 🌱",
    "likes": 213,
    "postedDate": "10 days ago",
    "isLiked": true
  },
  {
    "name": "Robert Johnson",
    "rating": 5,
    "review": "Absolutely fantastic! Brightens up any space effortlessly. 🌟",
    "likes": 1024,
    "postedDate": "2 weeks ago",
    "isLiked": false
  },
  {
    "name": "Alice Brown",
    "rating": 2,
    "review": "Not what I expected. Started wilting after a few days. 😕",
    "likes": 87,
    "postedDate": "3 weeks ago",
    "isLiked": true
  },
  {
    "name": "Carlos Rodriguez",
    "rating": 4,
    "review": "Great addition to my home. Low maintenance and visually pleasing. 👌",
    "likes": 625,
    "postedDate": "1 month ago",
    "isLiked": true
  }
];
const dummyOrderData = [
  { cropName: 'Tomatoes', status: 'pending', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?tomatoes' },
  { cropName: 'Potatoes', status: 'completed', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?potatoes' },
  { cropName: 'Carrots', status: 'active', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?carrots' },
  { cropName: 'Lettuce', status: 'pending', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?lettuce' },
  { cropName: 'Cucumbers', status: 'completed', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?cucumbers' },
  { cropName: 'Bell Peppers', status: 'active', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?bell-peppers' },
  { cropName: 'Broccoli', status: 'pending', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?broccoli' },
  { cropName: 'Spinach', status: 'completed', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?spinach' },
  { cropName: 'Onions', status: 'active', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?onions' },
  { cropName: 'Garlic', status: 'pending', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?garlic' },
  { cropName: 'Kale', status: 'completed', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?kale' },
  { cropName: 'Zucchini', status: 'active', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?zucchini' },
  { cropName: 'Corn', status: 'pending', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?corn' },
  { cropName: 'Cabbage', status: 'completed', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?cabbage' },
  { cropName: 'Green Beans', status: 'active', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?green-beans' },
  { cropName: 'Pumpkin', status: 'pending', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?pumpkin' },
  { cropName: 'Radishes', status: 'completed', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?radishes' },
  { cropName: 'Peas', status: 'active', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?peas' },
  { cropName: 'Artichokes', status: 'pending', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?artichokes' },
  { cropName: 'Beets', status: 'completed', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?beets' },
  { cropName: 'Asparagus', status: 'active', quantity: Math.floor(Math.random() * 100) + 1, price: parseInt((Math.random() * 10000).toFixed(2)), imageUrl: 'https://source.unsplash.com/400x300/?asparagus' },
];
const messages = [
  {
    id: 1,
    leftIcon: images.Message.user,
    user: "Smith",
    message: "61480 Sunbrook Park, PC 5679",
    unread: 5,
    date: "Yesterday"
  },
  {
    id: 2,
    leftIcon: images.Message.user,
    user: "John",
    message: "Hey, how's it going?",
    date: "Today"
  },
  {
    id: 3,
    leftIcon: images.Message.user,
    user: "Emma",
    message: "Sure! See you then.",
    unread: 2,
    date: "2 days ago"
  },
  {
    id: 4,
    leftIcon: images.Message.user,
    user: "Alex",
    message: "What time are we meeting?",
    unread: 3,
    date: "3 days ago"
  },
  {
    id: 5,
    leftIcon: images.Message.user,
    user: "Sarah",
    message: "Can you please send me the file?",
    date: "4 days ago"
  },
];
const addressData = [
  {
    id: '1',
    title: 'Home',
    address: '61480 Sunbrook Park, PC 5679',
  },
  {
    id: '2',
    title: 'Office',
    address: '6993 Meadow Valley Terra, PC 3637',
  },
  {
    id: '3',
    title: 'Apartment',
    address: '21833 Clyde Gallagher, PC 4662',
  },
  {
    id: '4',
    title: "Parent's House",
    address: '61480 Sunbrook Park, PC 5679',
  },
];
const unitsData = [
  { label: 'Kilogram', value: 'kg' },
  { label: 'Gram', value: 'g' },
  { label: 'Ton', value: 'ton' },
  { label: 'Man', value: 'man' },
  { label: 'Litre', value: 'L' },
  { label: 'Dozen', value: 'dozen' },
  { label: 'Quintal', value: 'quintal' },
  { label: 'Bushel', value: 'bushel' },
  { label: 'Bag', value: 'bag' },
  { label: 'Bale', value: 'bale' },
  { label: 'Crate', value: 'crate' },
  { label: 'Tray', value: 'tray' },
  { label: 'Bundle', value: 'bundle' },
  { label: 'Box', value: 'box' },
  { label: 'Pail', value: 'pail' },
  { label: 'Sack', value: 'sack' },
  { label: 'Packet', value: 'packet' },
  { label: 'Jar', value: 'jar' },
  { label: 'Can', value: 'can' },
  { label: 'Bag', value: 'bag' },
  { label: 'Barrel', value: 'barrel' },
  { label: 'Crate', value: 'crate' },
  { label: 'Drum', value: 'drum' },
  { label: 'Packet', value: 'packet' },
  { label: 'Tin', value: 'tin' },
  { label: 'Bucket', value: 'bucket' },
  { label: 'Cubic meter', value: 'm^3' },
  { label: 'Foot', value: 'ft' },
  { label: 'Inch', value: 'in' },
  { label: 'Meter', value: 'm' },
  { label: 'Millimeter', value: 'mm' },
  { label: 'Centimeter', value: 'cm' },
];
const cropCategories = [
  { label: 'Dairy', value: 'Dairy' },
  { label: 'Grain', value: 'Grain' },
  { label: 'Sugar', value: 'Sugar' },
  { label: 'Fruits', value: 'Fruits' },
  { label: 'Vegetables', value: 'Vegetables' },
  { label: 'Pulses', value: 'Pulses' },
  { label: 'Oilseeds', value: 'Oilseeds' },
  { label: 'Spices', value: 'Spices' },
  { label: 'Livestock', value: 'Livestock' },
  { label: 'Poultry', value: 'Poultry' },
  { label: 'Fishery', value: 'Fishery' },
  { label: 'Forestry', value: 'Forestry' },
  { label: 'Horticulture', value: 'Horticulture' },
  { label: 'Others', value: 'Others' },
];

export { dummyCropData, vegetableData,reviewFilter,dummyReviews,sortData,dummyOrderData,messages,addressData,unitsData,cropCategories };
