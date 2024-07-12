timer=document.getElementById("timer");
//i=10



// function decrement(j){
//     j-=1;
// }

// function timerStart(){
//     i=10
//     while(i>=0){
//         timer.innerHTML=String(Math.floor(i/600))+String(Math.floor(i/60))+":"+String(Math.floor(i/10))+String(i%10);
//         setTimeout(decrement,1000,i);
//     }
//     timer.innerHTML="Time's Up";
// }

// timerStart();

var timerInterval=0;
// var blinkTimer=0;

function timerUpdate(i,timerInterval){
    //timer.innerHTML=String(Math.floor(i/600))+String(Math.floor(i/60))+":"+String(Math.floor(i/10))+String(i%10);
    if (i<0){
        i=10;
        timer.innerHTML="Time's Up";
        clearInterval(timerInterval);
        right_option.style.backgroundColor="green";
        right_option.style.transition-"all 0.3s ease"
        // blinkTimer=setInterval(function(){timer.style.scale="1.1";
        //                                 setTimeout(function(){timer.style.scale="1",800});},1000);
        document.getElementById("skip").className="disabled";
        for(let i=0;i<4;i++){
            options[i].className="disabled";
        }



        
    }
    else{
        timer.innerHTML=String(Math.floor(i/600))+String(Math.floor(i/60))+":"+String(Math.floor(i/10))+String(i%10);
        i-=1;
    }

    if(i<3){
        timer.style.color="red";
        timer.style.scale="1.1";
        setTimeout(function(){timer.style.scale="1",800});
  
    }


}

function timerStart(){
    var i=10;
    timerUpdate(i);
    timerInterval=setInterval(function(){
        i-=1;
        timerUpdate(i);
    },1000)

}

// for(j=0;j<2;j++){
//     timerStart();
// }

var outputElement=0;

const url="https://opentdb.com/api.php?amount=30&type=multiple"
fetch(url).then(response=>{
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    return response.json();
})

.then(data => {
    // Display data in an HTML element
    outputElement= JSON.parse(JSON.stringify(data, null, 2));
  })

// .catch(error => {
//     console.error('Error:', error);
// });

var question_num=0;
var actual_question_num=0
const options=document.getElementsByTagName("li");
var right_option;
var wrong_options=[];


//question_json=getQuestions();

function writeQuestion(){
    var question=outputElement.results[actual_question_num-1].question;
    document.getElementById("question").innerHTML=question;
    var rightNum=Math.floor((4*Math.random()));
    right_option=options[rightNum];
    right_option.className="right";
    right_option.innerHTML=outputElement.results[actual_question_num-1].correct_answer
    var j=0;
    for(var i=0;i<4;i++){
        if (i!=rightNum){
            wrong_options[j]=options[i]
            wrong_options[j].className="wrong";
            wrong_options[j].innerHTML=outputElement.results[actual_question_num-1].incorrect_answers[j];
            j++;
        }
    }
    right_option.onclick=function(){
        clearInterval(timerInterval);
        right_option.style.backgroundColor="green";
        right_option.style.transition-"all 0.3s ease";
        score+=1;
        scoreVal.innerHTML="Score:"+score+" of "+actual_question_num
        for(let i=0;i<4;i++){
            options[i].className="disabled"
        }
    
    
    }
    for(let i=0;i<wrong_options.length;i++){
        wrong_options[i].onclick=function(){
            clearInterval(timerInterval);
            right_option.style.backgroundColor="green";
            right_option.style.transition="all 0.3s ease";
            wrong_options[i].style.backgroundColor = "red";
            wrong_options[i].style.transition = "all 0.3s ease";
            for(let i=0;i<4;i++){
                options[i].className="disabled"
            }
        
    
        }
    };
    
    




}

















var score=0;
var highscore=localStorage.getItem('highscore')||0;

var scoreVal=document.getElementById("score");

var scoreEnd=document.getElementById("score-end");
var highscoreEnd=document.getElementById("highscore-end");







// for(i=0;i<wrong_options.length;i++){
//     wrong_options[i].onclick=function(){
        

// };


document.getElementById("next").onclick=function(){
    if (question_num>=25){
            if (score>highscore){
                highscore=score;
                localStorage.setItem('highscore',highscore)
            }
            document.getElementById("end").style.display="block";
            setTimeout(function(){document.getElementById("score-end").style.color="wheat"},1000);
            setTimeout(function(){document.getElementById("highscore-end").style.color="wheat"},1000);
           
            

            setTimeout(function(){ scoreEnd.innerHTML="Score: "+score;},1000);
            setTimeout(function(){highscoreEnd.innerHTML="HighScore: "+highscore;},1000);
    }
    
    
    
    for(i=0;i<options.length;i++){
        options[i].style.backgroundColor="black";
    };
    question_num+=1;
    actual_question_num+=1;
    scoreVal.innerHTML="Score: "+score+" of "+question_num
    document.getElementById("question-number").innerHTML="Question "+question_num+" of 25";
    document.getElementById("skip").className="";
    writeQuestion();
    clearInterval(timerInterval);
    // clearInterval(blinkTimer);
    timer.style.color="wheat";
    timerStart();

}

var skipNum=5;
document.getElementById("skip").onclick=function(){
    if (skipNum==1){
        document.getElementById("skip").className="disabled"
    }
    skipNum-=1;
    actual_question_num+=1
    writeQuestion();
    clearInterval(timerInterval);
    timer.style.color="wheat";
    timerStart();
    document.getElementById("skip-num").innerHTML="("+skipNum+" Left)"

}

start=document.getElementById("start");
start.onclick=function(){
    question_num+=1;
    actual_question_num+=1;
    scoreVal.innerHTML="Score: "+score+" of "+question_num;
    document.getElementById("question-number").innerHTML="Question "+question_num+" of 25";
    document.getElementById("highscore").innerHTML="HighScore: "+highscore;
    writeQuestion();
    timerStart();
    document.getElementById("buttons").style.display="flex";
    document.getElementById("quiz").style.display="flex";
    start.style.display="None"

}

// right_option.onclick=function(){
//     clearInterval(timerInterval);
//     right_option.style.backgroundColor="green";
//     right_option.style.transition-"all 0.3s ease";
//     score+=1;
//     scoreVal.innerHTML="Score:"+score+" of "+question_num


// }
// for(let i=0;i<wrong_options.length;i++){
//     wrong_options[i].onclick=function(){
//         clearInterval(timerInterval);
//         right_option.style.backgroundColor="green";
//         right_option.style.transition="all 0.3s ease";
//         wrong_options[i].style.backgroundColor = "red";
//         wrong_options[i].style.transition = "all 0.3s ease";
    

//     }
// };








//var timerInterval=setInterval(timerUpdate,1000);

