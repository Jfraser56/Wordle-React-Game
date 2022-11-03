# Wordle

## A Wordle clone built with Typescript in ReactJS.

### Description:
You have 6 guesses to guess the 5 letter word. Each guess will provide the user feedback on which letters in their guess are included in the answer (yellow), in the right location (green), or not included at all (dark grey).

### Features
* Uses ReactJS's state rendering properties to provide the user with realtime feedback on their guess when they press Enter.
* App is able to pull a random 5 letter word from the english dictionary using an external API at the start of each game.
* App checks the users guess by submitting another GET request to an external API, and can validate the guess depending on the status of the returned request. 
* Uses local storage - If the user closes their browser, and revisits the app at later time, their progress will be saved
* App has a light mode and dark mode
* Mobile Friendly
* End of game popup when the user runs out of guesses, or guesses the word correctly with opion to play again, or view Github Code.


### Features to implement
* The help button on the left side of the header should be interactable, and provide a popup window with instructions on how to play.

Use `npm install` to download Wordle dependencies, however the API key is not included, therefore I reccommend just viewing the live app demo

[Live App](https://lighthearted-cannoli-32b359.netlify.app/)

### Preview

<img width="1496" alt="Screen Shot 2022-10-16 at 10 21 01 AM" src="https://user-images.githubusercontent.com/85974596/196040811-98b9340d-c855-4dcc-9598-f7aaabdde798.png">

<img width="1493" alt="Screen Shot 2022-10-16 at 10 21 15 AM" src="https://user-images.githubusercontent.com/85974596/196040774-d8cf7f8c-b95b-459f-9a7a-322300587a2f.png">

<img width="1497" alt="Screen Shot 2022-10-16 at 10 21 54 AM" src="https://user-images.githubusercontent.com/85974596/196040752-3f09c67c-3428-4e2a-b103-f710e4bd280d.png">



