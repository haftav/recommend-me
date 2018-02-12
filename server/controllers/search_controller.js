const searches = [];
var searchId = 0;

var test = {
    id: 0,
    title: "The Big Lebowski",
    type: "Movie",
    text: "blah blah blah",
    recommends: [
        {
            recId: 0,
            name: "Jack",
            time: "5:30",
            title: "The Long Goodbye",
            text: "Robert Altman's film deconstructs the classic Noir hero."
        }
    ]
}

module.exports = {
    newSearch: (req, res) => {
    let { title, type, text, image } = req.body;
    let index = searches.findIndex((el) => (el.title === title && el.type === type));
        if (index === -1) {
            searches.push({ id: searchId, title, type, text, image, recommends: [] })
            searchId++;
        }
        console.log(searches[0])
        res.status(200).send(searches);
    },
    getSearch: (req, res) => {
        res.status(200).send(searches);
    },
    newRec: (req, res) => {
        let { title, text, name, image, time, score } = req.body;
        let id = req.params.id;
        index = searches.findIndex((el) => el.id === Number(id));

        let recId;
        if (searches[index].recommends.length === 0) {
            recId = 0;
        } else {
            recId = searches[index].recommends[searches[index].recommends.length - 1].recId + 1;
        }

        searches[index].recommends.push( { recId, title, name, text, image, time, score } )

        res.status(200).send(searches[index].recommends)

    },
    getRec: (req, res) => {
        let { id } = req.params

        let index = searches.findIndex((el) => el.id === Number(id));
        if (index !== -1) {
            res.status(200).send(searches[index].recommends)
        } else {
            res.status(200).json('You got nothin')
        }

    },
    editRec: (req, res) => {
        let { title, name, text, image, time, score, recId } = req.body;
        let mainId = req.params.id

        let index = searches.findIndex((el) => {
            return el.id === Number(mainId)
        })

        let recIndex = searches[index].recommends.findIndex((el) => el.recId === Number(recId));
        console.log(recIndex);
        console.log('rec: ' + JSON.stringify(searches[index].recommends[recIndex]));

        searches[index].recommends[recIndex] = { title, name, text, image, time, score, recId }
        res.status(200).send(searches[index].recommends);
    },
    deleteRec: (req, res) => {
        const mainId = req.params.mainId;
        const recId = req.params.recId;

        const index = searches[mainId].recommends.findIndex((el) => el.recId === Number(recId))

        searches[mainId].recommends.splice(index, 1);

        res.status(200).send(searches[mainId].recommends)
    },
    upVote: (req, res) => {
        const mainId = req.params.mainId;
        const recId = req.params.recId;

        const index = searches[mainId].recommends.findIndex((el => el.recId === Number(recId)))

        searches[mainId].recommends[index].score++;

        res.status(200).send(searches[mainId].recommends);
    },
    downVote: (req, res) => {
        const mainId = req.params.mainId;
        const recId = req.params.recId;

        const index = searches[mainId].recommends.findIndex((el => el.recId === Number(recId)))

        if (searches[mainId].recommends[index].score > 0) {
            searches[mainId].recommends[index].score--;
        }

        res.status(200).send(searches[mainId].recommends);
    }

}