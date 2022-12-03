import authSaga from 'features/saga/sso/authSaga';
import setupPasswordSaga from 'features/saga/sso/setupPasswordSaga';
import updateProfileSaga from 'features/saga/sso/updateProfileSaga';
import verifyEmailSaga from 'features/saga/sso/verifyEmailSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([authSaga, setupPasswordSaga, updateProfileSaga, verifyEmailSaga]);
}
