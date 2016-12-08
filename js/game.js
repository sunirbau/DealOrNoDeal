

var cashArray = ['$.01','$1','$5','$10','$25','$50','$75','$100','$200','$300','$400','$500','$750','$1,000','$5,000','$10,000','$25,000','$50,000','$75,000','$100,000','$200,000','$300,000','$400000','$500,000','$750,000','$1,000,000'];
var shuffledArray = [];

window.onload = function() {
	initGame();

  $('.btn').on('click', function(e){
  	var briefcase = findBriefCase(this); 
    if(briefcase != undefined){
      this.classList.add('hide');
      disableCashList(briefcase);
    }     
  });

}


var initGame = function() {
  renderCashList(cashArray);
  shuffledArray = shuffle(cashArray);
  renderBriefCases(shuffledArray);
}

var shuffle = function (array) {
	var length = array.length;
	var copy = array.splice(0);
	for (var i = 0 ; i < length; i++) {
		var copyLength = copy.length;
		var j = Math.floor(Math.random() * copyLength);
		shuffledArray[i] = {briefcaseNo:i+1, cash:copy[j]};
		copy.splice(j,1);
	}
	return shuffledArray;
}

var renderCashList = function(array) {
	var statArea = document.querySelector('#statArea');
  var columnTemplate = document.querySelector('#cashColumn');
  var cashColumn = columnTemplate.content.querySelector('div');
  var cashTemplate = document.querySelector('#cash');
  var cash = cashTemplate.content.querySelector('li');

  appendTemplate(statArea,columnTemplate); 
	for (var i = 0 ; i <= array.length; i++) {
       if(i === array.length/2 || i === array.length){
           appendTemplate(statArea,columnTemplate);  
           cashColumn.innerHTML = '';      
       }       
       cash.innerHTML = array [i];
       appendTemplate(cashColumn,cashTemplate); 
	}	
}

var renderBriefCases = function(array) {
	var briefcasesArea = document.querySelector('#briefcasesArea');
	var rowTemplate = document.querySelector('#briefcaseRow');
  var briefcaseRow = rowTemplate.content.querySelector('div');
  var buttonTemplate = document.querySelector('#briefcase');
  var briefcase = buttonTemplate.content.querySelector('button'); 

	for (var i = array.length; i >= 0; i--) {            
       if(i % 3 === 0){
       	   appendTemplate(briefcasesArea,rowTemplate); 
           briefcaseRow.innerHTML='';           
       }      
       if(i > 0) {         
          briefcase.id = array[i-1].briefcaseNo;
          briefcase.innerHTML = array[i-1].briefcaseNo;
       }
       appendTemplate(briefcaseRow,buttonTemplate); 
	}
}

var appendTemplate = function(element, template){
  var clone = document.importNode(template.content, true);
  element.appendChild(clone);
}

var findBriefCase = function(element){
  for(var i=0; i<shuffledArray.length;i++){
    if(parseInt(element.id) === shuffledArray[i].briefcaseNo){
      return shuffledArray[i];
    }
  }
}

var disableCashList = function(briefcase){
  var statArea = document.querySelector('#statArea');
  var cashList = statArea.querySelectorAll('li');
  for(var i=0; i<cashList.length; i++){
    if (cashList[i].innerHTML === briefcase.cash) {
         cashList[i].classList.add('disabled');
         return;
    }
  }
}




