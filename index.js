
const container=document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const movieSelect=document.querySelector('#movie');
const seatCount= document.querySelector('#count');
const totalPrice= document.querySelector('#total');

let ticketPrice=+movieSelect.value;

populateUI();

//set movie data

function setMovieData(ticketPrice,movieIndex){  

    localStorage.setItem('movieIndex',movieIndex);
    localStorage.setItem('ticketPrice',ticketPrice);   

}


//update seat count 

function updateSeatCount() {

    const seatSelected=document.querySelectorAll(".row .seat.selected");
    const seatSelectedCount = seatSelected.length;

    const seatIndex=[...seatSelected].map( seat => [...seats].indexOf(seat));
    localStorage.setItem('seatsSelectedIndex',JSON.stringify(seatIndex));
    
    seatCount.innerText=seatSelectedCount;
    totalPrice.innerText=seatSelectedCount*ticketPrice;
  
}

// load data from local storage to UI 

function populateUI(){

    const selectedSeats= JSON.parse(localStorage.getItem('seatsSelectedIndex'));
    console.log(selectedSeats);

    if(selectedSeats !=null && selectedSeats.length>0){
        seats.forEach((seat,index) => {
          
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('movieIndex');

    if(selectedMovieIndex !=null){
        movieSelect.selectedIndex=selectedMovieIndex;
    }
}

//event listener for changing movies

movieSelect.addEventListener('change', e => {
    ticketPrice=e.target.value;
    setMovieData( e.target.value,  e.target.selectedIndex);
    updateSeatCount();
})

//event listener for selecting seats
container.addEventListener('click', e => {
    
    if(e.target.classList.contains('seat') && 
       !e.target.classList.contains('occupied')){

        e.target.classList.toggle('selected');
        updateSeatCount();
       }
})

//update the seats 
updateSeatCount();

