var playing = false;
var score;
var trialsleft;
var step;
var action; // used internal function
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
$(function(){
    //click on start reset button
    $("#startreset").on("click",function(){
        //we are playing
        if(playing == true){
            //relodad page
            location.reload();


        }else{
            
            //we are not playing
            playing=true;//game initiated
            score=0;//set score to 0
            $("#scorevalue").html(score);

            //show trials left
            $("#trialsLeft").show();
            trialsleft = 3;
            addHearts();

            //hide game over box
            $("#gameOver").hide();

            //change button to reset game
            $("#startreset").html("Reset Game")
            startAction();

            
        }


    });

    //click on start reset button
        // are we playin
            //yes
                //relodad page
            //no 
                //show trails left
                //change button text to "reset game"
                //1.create a random fruit 
                //define random step
                //2.move fruit down by one step every 30 second
                    //check is the fruit too low
                        //no -> repeat number 2
                        //yes -> any trials left
                            //yes->repeat number 1 remove one heart
                            //no-> gameover button text to start game
    //slice a fruit
        //play a sound in the backgorun
        //explode fruit

    //functions

    $("#fruit1").on("mouseover",function(){
        score++;
        $("#scorevalue").html(score); //update score

        document.getElementById("slicesound").play();//play sound
        //$("#slicesound")[0].play();//jquery style

        //stop fruit
        clearInterval(action);

        //hifr fruit
        $("#fruit1").hide("explode",500);

        setTimeout(startAction,600);
    });

    function addHearts(){
        $("#trialsLeft").empty();
        for(i = 0; i < trialsleft; i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
    }

    function startAction(){

        //generate fruit
        $("#fruit1").show();
        
        chooseFruit();//choose a random fruit

        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});//random position

        step= 1+Math.round(5*Math.random());//change step

        //Move fruit down by one step every 10ms 

        action = setInterval(function(){
            
            //move fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + step);                              
            
            //check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //check if any trials left
                if(trialsleft > 1){
                    //generate fruit
                    $("#fruit1").show();
                    
                    chooseFruit();//choose a random fruit

                    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});//random position

                    step= 1+Math.round(5*Math.random());//change step
                    
                    //reduce trails by one
                    trialsleft--;

                    //populate trialsLeft box
                    addHearts();
                }else{//game over
                    playing=false;
                    $("#startreset").html("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 10);
    }

    //generate a random fruit

    function chooseFruit(){

        $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] +'.png');   
        
    }

    //Stop dropping fruits

    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});