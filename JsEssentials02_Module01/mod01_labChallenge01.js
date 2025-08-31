
/*
Exercício retirado do Curso JavaScript Essentials 2, da plataforma Cisco Networking Academy
*/

/*
Problematização:

You have started to organize the paintings you keep at home,
and have decided to make an inventory of some of the most important ones.
Declare an array of objects that will correspond to the following images:
    Mona Lisa (Leonardo da Vinci, 1503), 
    The Last Supper (Leonardo da Vinci, 1495), 
    Starry Night (Vincent van Gogh, 1889), 
    The Scream (Edvard Munch, 1893), 
    Guernica (Pablo Picasso, 1937), 
    The Kiss (Gustav Klimt, 1907), 
    Girl With a Pearl Earring (Johannes Vermeer, 1665), 
    The Birth of Venus (Sandro Botticelli, 1485), 
    Las Meninas (Diego Velázquez, 1656), 
    The Creation of Adam (Michelangelo, 1512).

Display all the images in the list in the console (full information: title, artist and date of creation).
*/

// Abordagem Factory
let createImg = (title, artist, year) => ({title, artist, year});

let images = [
    createImg("Mona Lisa", "Leonardo da Vinci", 1503),
    createImg("The Last Supper", "Leonardo da Vinci", 1495),
    createImg("Starry Night", "Vincent van Gogh", 1889),
    createImg("Girl With a Pearl Earring", "Johannes Vermeer", 1665),
    createImg("The Birth of Venus", "Sandro Botticelli", 1485),
    createImg("Las Meninas", "Diego Velázquez", 1656),
    createImg("The Creation of Adam", "Michelangelo", 1512)
];

images.forEach(img => console.log(`${img.title} (${img.artist}, ${img.year})`));

// Abordagem Constructor
let Img = function (title, artist, year) {
    this.title = title;
    this.artist = artist;
    this.year = year;
};

let images02 = [
    new Img("Mona Lisa", "Leonardo da Vinci", 1503),
    new Img("The Last Supper", "Leonardo da Vinci", 1495),
    new Img("Starry Night", "Vincent van Gogh", 1889),
    new Img("Girl With a Pearl Earring", "Johannes Vermeer", 1665),
    new Img("The Birth of Venus", "Sandro Botticelli", 1485),
    new Img("Las Meninas", "Diego Velázquez", 1656),
    new Img("The Creation of Adam", "Michelangelo", 1512)
];

images02.forEach(img => console.log(`${img.title} (${img.artist}, ${img.year})`));