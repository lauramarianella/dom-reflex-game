
function run(){    
    let nodeMain = document.querySelector('.main');
    let btnGameBtn = document.createElement('button');
    btnGameBtn.innerText ='Start Game';
    btnGameBtn.className = "gameButton";
    btnGameBtn.addEventListener('click', ()=>{window.location.href = 'game.html'});
    nodeMain.appendChild(btnGameBtn);

    let btnInstructionsGameBtn = document.createElement('button');
    btnInstructionsGameBtn.innerText ='Instructions';
    btnInstructionsGameBtn.className = "gameButton";
    btnInstructionsGameBtn.addEventListener('click', ()=>{
                                                            let divInstructions = document.getElementById('divIdInstructions');
                                                            (divInstructions.style.display === 'none')? divInstructions.style.display = 'block' : divInstructions.style.display = 'none';
                                                         });
    nodeMain.appendChild(btnInstructionsGameBtn);
}
//run();