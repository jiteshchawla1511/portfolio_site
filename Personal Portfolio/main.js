const typeWriter = function(txtElement,words,wait = 1000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
}


// Type Method
typeWriter.prototype.type = function(){

    // Current index of Word
    const current = this.wordIndex % this.words.length;

    // Get full text of current word
    const fullTxt = this.words[current];

    // console.log(fullTxt);

    //Check if deleting
    if(this.isDeleting){
        //Remove The character
        this.txt = fullTxt.substring(0,this.txt.length - 1);

    } else{
        // Add a Character
        this.txt = fullTxt.substring(0,this.txt.length + 1);

    }

    // insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    

    //Initial Type Speed
    let typeSpeed = 100;

    if(this.isDeleting){
      typeSpeed /= 2;
    }
    
    //If word is Complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Make a Pause at end 
        typeSpeed = this.wait;

        // Set delete for me
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        //Pause before start typing
        typeSpeed = 100;
    }
    setTimeout(() => this.type(),typeSpeed);

}


//Init on DOM Load
document.addEventListener('DOMContentLoaded',init);

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter
    new typeWriter(txtElement,words,wait);

}