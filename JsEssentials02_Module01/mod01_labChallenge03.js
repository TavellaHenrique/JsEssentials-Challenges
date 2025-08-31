
/*
Create an images object that will be used to store the images.
The object should have a list property, which will be an array of image objects and methods:

contains - which takes as its argument the title of the image and returns true if the image is already placed in the list (otherwise it returns false)
add – which takes three arguments (title, artist, and date) and creates a new object based on them and adds it to the list (if it has not already been added)
show - which displays all images on the list;
clear – which removes all objects from the list.
While creating an object, use the Image constructor prepared in the earlier task.

Test the script by calling the sequence:
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.show();
// -> Mona Lisa (Leonardo da Vinci, 1503)
// -> Last Supper (Leonardo da Vinci, 1495)
// -> The Starry Night (Vincent van Gogh, 1889)
images.clear();
images.show();
*/

let Img = function(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
};

let images = {
    list: Array(),
    contains: function(title) {
        for (let img of this.list) {
            if (title === img.title) {
                return true;
            }
        }
        return false;
    },
    add: function(title, artist, date) {
        if (!this.contains(title)) {
            this.list.push(new Img(title, artist, date));
        }
    },
    show: function() {
        this.list.forEach(img => {console.log(`${img.title} (${img.artist}, ${img.date})`)});
    },
    clear: function() {
        for (img in this.list) {
            delete this.list[img];
        }
    },
};

images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.show();
images.clear();
images.show();