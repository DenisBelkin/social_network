const endPoints = require('../../src/common/endPointsList');
const commonServerData = require ('../commonServerData');

const loadAnotherUserInfo = (req,res) => {
    const params = req.body;
    const userId = params.userId;
    commonServerData.mongodb.connect(endPoints.db, (err, db) => {
        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);
        myCollection.findOne({userId}, (err, result) => {
            try {
                if (err) {
                    throw new Error(`Error is somewhere in checking id: ${err}`);
                }
            } catch (err) {
                console.log(err);
            }
            if (result) {
                if (userId === result.userId) {
                    const dataToSend = {
                        firstName: result.firstName,
                        middleName: result.middleName,
                        lastName: result.lastName,
                        age: result.age,
                        photo: result.photo,
                        email: result.email,
                        gender: result.gender,
                        userId: result.userId,
                        friendsList: result.friendsList
                    };
                    res.send(200, dataToSend);
                } else {
                    res.send(200, 'nope');
                }
            } else {
                res.send(200, 'nope and nope');
            }
            db.close();
        });
    });
};

module.exports = {loadAnotherUserInfo};
