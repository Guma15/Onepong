# Onepong

This Program was created on a request by a student at University of Liverpool to recreate a test from a research paper.

The program is a one player pong game that does not have an opponent ai, it instead has three walls that the ball can bounce on. This is to simulate one side of a tennis court, according to the research paper it was based on.

The goal of the game is to let the ball hit the player paddle or the right side of the court. This will result in a prompt asking the player what speed the ball was moving in. The speed of the ball randomly changes between 6 different set speeds after each trial. In addition to this the ball can randomly change direction. The player paddle size also changes randomly to increase the difficulty. The player needs to play 144 times before the game ends. The player is not informed how many trials are left or on what trial they are currently on, this was done on request by the client.

Each guess by the player, the actual ball speed, paddle size and trial number is stored by the program in an dataform object. When the test is finished the script will post the collected data to a google spreadsheet using ajax.

The scripts used to post the data and later handle it within the google spreadsheet was based on Martin Hawksey's solution: https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/

A more user friendly version of Martin's code was also created by the github group, dwyl:
https://github.com/dwyl/html-form-send-email-via-google-script-without-server

Credits should therefore go to both Martin and dwyl for their code used in this program. Minor changes were made in the script to post the data, the main difference is that it handles a dataform object in javascript, rather than a html created form, see google_sheets.js for more information.

The code for the actual game was based on github user maxwhilborg's pong tutorial. Some parts of the structure was kept but it has been heavily edited. Several functions have also been added and removed to better suit the purpose for this project. See his code at the below url: https://github.com/maxwihlborg/youtube-tutorials/blob/master/pong/index.html
