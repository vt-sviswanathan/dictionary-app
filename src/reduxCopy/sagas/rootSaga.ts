import { all } from "redux-saga/effects";
import watcherDefinitionsSaga from "./handlers/fetchDefinitions";

export default function* rootSaga() {
    yield all([watcherDefinitionsSaga()]);
}