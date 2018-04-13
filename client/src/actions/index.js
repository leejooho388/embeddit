// export function actionName() {
//
//   return {
//     type: ACTION_TYPE,
//     payload: data
//   };
// }

export const TEST_STATE = 'TEST_STATE';

export function changeTestState(text){
  return {
    type: TEST_STATE,
    text,
  }
}