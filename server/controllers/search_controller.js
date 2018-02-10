const searches = [];
var searchId = 0;
var recId = 0;

var test = {
    id: 0,
    title: "The Big Lebowski",
    type: "Movie",
    text: "blah blah blah",
    recommends: [
        {
            id: 0,
            name: "Jack",
            time: "5:30",
            title: "The Long Goodbye",
            text: "Robert Altman's film deconstructs the classic Noir hero."
        }
    ]
}

module.exports = {
    newSearch: (req, res) => {
    let { title, type, text } = req.body;
    let index = searches.findIndex((el) => (el.title === title && el.type === type));
        if (index === -1) {
            searches.push({ id: searchId, title, type, text, recommends: [] })
            searchId++;
        }
        res.status(200).send(searches);
    },
    getSearch: (req, res) => {
        res.status(200).send(test);
    },
    editSearch: (req, res) => {

    },
    newRec: (req, res) => {
        let { title, text, name, id } = req.body;
        index = searches.findIndex((el) => el.id === Number(id));

        searches[index].recommends.push( { recId, title, name, text } )

        recId++;

        res.status(200).send(searches[index].recommends)

    },
    getRec: (req, res) => {
        let { i } = req.params

        index = searches.findIndex((el) => el.id === Number(i));
        if (index !== -1) {
            res.status(200).send(searches[index].recommends)
        } else {
            res.status(200).json('You got nothin')
        }

    },
    editRec: (req, res) => {

    },
    deleteRec: (req, res) => {

    }
}