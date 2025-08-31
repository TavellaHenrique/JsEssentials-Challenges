
/*
Exercício retirado do Curso JavaScript Essentials 2, da plataforma Cisco Networking Academy
*/

/*
Problematização:

Write two functions, Image and getImage, that will return a new image object based on three given arguments: 
title, artist, and date.

The Image function is the constructor, and getImage is the factory.
Using the images data array from the previous task, create a new array, images1, using the Image constructor 
(don't copy the objects, but just create new ones based on the properties read).

Similarly, from images1 create a new array, images2, using getImage.

Display the contents of images2.
*/

// Código do desafio anterior (solução do próprio curso)
let images = [
    {
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        date: 1503
    },
    {
        title: 'The Last Supper',
        artist: 'Leonardo da Vinci',
        date: 1495
    },
    {
        title: 'The Starry Night',
        artist: 'Vincent van Gogh',
        date: 1889
    },
    {
        title: 'The Scream',
        artist: 'Edvard Munch',
        date: 1893
    },
    {
        title: 'Guernica',
        artist: 'Pablo Picasso',
        date: 1937
    },
    {
        title: 'The Kiss',
        artist: 'Gustav Klimt',
        date: 1907
    },
    {
        title: 'Girl With a Pearl Earring',
        artist: 'Johannes Vermeer',
        date: 1665
    },
    {
        title: 'The Birth of Venus',
        artist: 'Sandro Botticelli',
        date: 1485
    },
    {
        title: 'Las Meninas',
        artist: 'Diego Velázquez',
        date: 1656
    },
    {
        title: 'Creation of Adam',
        artist: 'Michelangelo',
        date: 1512
    }
];

let Img = function(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
};

let getImage = function(title, artist, date) {
    return {title, artist, date};
};

let images1 = [];
let images2 = [];

images.forEach(image => images1.push(new Img(image.title, image.artist, image.date)));
images.forEach(image => images2.push(getImage(image.title, image.artist, image.date)));

images2.forEach(image => console.log(`${image.title} (${image.artist}, ${image.date})`));