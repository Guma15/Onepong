# Onepong

This Program was created on a request by a student at Liverpool university to recreate a test from a research paper.

The program is a one player pong game that does not have an opponent ai, it instead has three walls that the ball can bounce on. This is to simulate one side of a tennis court, according to the research paper it was based on.

The goal of the game is to let the ball hit the player paddle or the right side of the court. This will result in a prompt asking the player what speed the ball was moving in. The speed of the ball randomly changes at the end of each trial between 6 different set speeds. In addition to this the ball can randomly change direction. The player paddle size also changes randomly to increase the increase the difficulty. This occurs 36 times in one block of trials out of 4 blocks meaning the player needs to play 144 times before it the game ends.

Each guess by the player, the actual ball speed, paddle size and trial number is saved by the program and stored in an object. The data is either saved aa dataform object or a json object, depending on which script is used. If the script "onepong.js" is used, the data will be collected into a json object that is downloadable to a .json file. If the "onepong_form.js" script is instead used the data is put in a dataform object that is posted to a google spreadsheet using ajax. 

The scripts used to post the data and later handle it within the google spreadsheet was based on Martin Hawksey's solution: https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/

A more user friendly version of Martin's code was also created by the github group, dwyl:
https://github.com/dwyl/html-form-send-email-via-google-script-without-server

Credit should therefore go to both Martin and dwyl for their code used in this program. Minor changes were made in the script to post the data, the main difference is that it handles a dataform object in javascript, rather than a html created form, see google_sheets.js for more information.

