

var cashArray = ['$.01','$1','$5','$10','$25','$50','$75','$100','$200','$300','$400','$500','$750','$1,000','$5,000','$10,000','$25,000','$50,000','$75,000','$100,000','$200,000','$300,000','$400000','$500,000','$750,000','$1,000,000'];
var shuffledArray = [];

window.onload = function() {
	initGame();

  $('.btn').on('click', function(e){
  	var briefcase = findBriefCase(this); 
    if(briefcase != undefined){
      $(this).addClass('hide');
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
  var $statArea = $('#statArea');
  var $columnTemplate = $('#cashColumn');
  var $cashColumn = $columnTemplate.find('div');
  var $cashTemplate = $('#cash');
  var $cash = $cashTemplate.find('li');

  $statArea.append($cashColumn.clone()); 
  var $cashColumnClone = $cashColumn.clone();
  for (var i = 0 ; i <= array.length; i++) {
       if(i === array.length/2 || i === array.length){
           $statArea.append($cashColumnClone);  
           $cashColumnClone = $cashColumn.clone();    
       } 
       var $cashClone = $cash.clone();     
       $cashClone.html(array [i]);
       $cashColumnClone.append($cashClone); 
  } 
}

var renderBriefCases = function(array) {
  var $briefcasesArea = $('#briefcasesArea');
  var $rowTemplate = $('#briefcaseRow');
  var $briefcaseRow = $rowTemplate.find('div');
  var $buttonTemplate = $('#briefcase');
  var $briefcase = $buttonTemplate.find('button'); 

  var $briefcaseRowClone = $briefcaseRow.clone();
  for (var i = array.length; i >= 0; i--) {            
       if(i % 3 === 0){
           $briefcasesArea.append($briefcaseRowClone); 
           $briefcaseRowClone = $briefcaseRow.clone();          
       }

       var $briefcaseClone = $briefcase.clone();  
       if(i > 0) {         
          $briefcaseClone.attr('id' ,array[i-1].briefcaseNo);
          $briefcaseClone.html(array[i-1].briefcaseNo);
       }
       $briefcaseRowClone.append($briefcaseClone); 
  }
}

var findBriefCase = function(element){
  for(var i=0; i<shuffledArray.length;i++){
    if(parseInt(element.id) === shuffledArray[i].briefcaseNo){
      return shuffledArray[i];
    }
  }
}

var disableCashList = function(briefcase){
  var $statArea = $('#statArea');
  var cashList = $statArea.find('li');
  for(var i=0; i<cashList.length; i++){
    if (cashList[i].innerHTML === briefcase.cash) {
         $(cashList[i]).addClass('disabled');
         return;
    }
  }
}

