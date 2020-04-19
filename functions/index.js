const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch');
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_INDEX_NAME = 'users';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

exports.onUsersNameUpdated = functions.firestore.document('usersName/{userDocId}').onWrite((snap, context) => {
  const user = snap.after.data();
  user.objectID = context.params.userDocId;
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(user);
});