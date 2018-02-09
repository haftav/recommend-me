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
            rec: "The Long Goodbye",
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

    },
    getRec: (req, res) => {

    },
    editRec: (req, res) => {

    },
    deleteRec: (req, res) => {

    }
}