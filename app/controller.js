/*
  MainController
*/

;(function() {

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  function MainController($scope,$modal, $log,$http) {
    $scope.dragAccRec = [{name:'Accounts receivable'}];
    $scope.dragAccPay = [{name:'Accounts payable'}];
    $scope.dragAdvRec = [{name:'Advances received (and progress payments)'}];
    $scope.dragInventory = [{name:'Inventory'}];
    $scope.revealAccRec= false;
    $scope.revealInventory= false;
    $scope.revealAccountsPay= false;
    $scope.revealAdvanceRec= false;
    $scope.showWayToHome = false;
    $scope.draggedItemNames=[];


    //Parsing data from quiz.json
    $http.get("app/quiz.json").success(function(data) {
        $scope.data= data;
        $scope.showCorrAns = false;
        $scope.showWrongAns = false;
        $scope.showTruefalseBut = true;
    });
    //Function to hide the divs when dragged to right empty position
    function hide(name){
        switch(name){
          case "Accounts receivable":
                angular.element("#AccRecPos").css('background','#40bf40');
                angular.element("#AccRecBox").css('display','none');
                $scope.revealAccRec= true;
                break;

          case "Accounts payable":
                angular.element("#AccPayPos").css('background','#40bf40');
                angular.element("#AccPayBox").css('display','none');
                $scope.revealAccountsPay= true;
                break;

          case "Advances received (and progress payments)":
                angular.element("#AdvRecPos").css('background','#40bf40');
                angular.element("#AdvRecBox").css('display','none');
                $scope.revealAdvanceRec= true;
                break;

          case "Inventory":
                angular.element("#InventoryPos").css('background','#40bf40');
                angular.element("#inventoryBox").css('display','none');
                $scope.revealInventory= true;
                break;
        }
    }
//Function to obtain information of the dragged item
    $scope.onDrag= function(data,evt){
      $scope.draggedItemName = data.name;
      $scope.draggedItemNames.push(data.name);

    //reveal the way to home button after the quiz
      if($scope.draggedItemNames.length===4){
        $scope.showWayToHome = true;
      }
    };

//Function to do actions after "Accounts receivable" box is taken to correct position
    $scope.AccRecDragStop= function(){
      if($scope.draggedItemName === "Accounts receivable"){
        hide($scope.draggedItemName);
        $scope.open($scope.draggedItemName);
      }
    };
//Function to do actions after "Accounts payable" box is taken to correct position
    $scope.AccPayDragStop= function(){
      if($scope.draggedItemName === "Accounts payable"){
        hide($scope.draggedItemName);
        $scope.open($scope.draggedItemName);
      }
    };
//Function to do actions after "Advances received (and progress payments)" box is taken to correct position
    $scope.AdvRecDragStop= function(){
      if($scope.draggedItemName === "Advances received (and progress payments)"){
        hide($scope.draggedItemName);
        $scope.open($scope.draggedItemName);
      }
    };
//Function to do actions after "Inventory" box is taken to correct position
    $scope.InventoryDragStop= function(){
      if($scope.draggedItemName === "Inventory"){
        hide($scope.draggedItemName);
        $scope.open($scope.draggedItemName);
      }
    };

    $scope.open = function(name) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modal.html',
        controller:  modalCtrl,
        backdrop: 'static'

      });

   //Modal Controller
      function modalCtrl($scope,$modalInstance) {
        //Parsing data from quiz.json
        $http.get("app/quiz.json").success(function(data) {
            $scope.data= data;
            $scope.showCorrAns = false;
            $scope.showWrongAns = false;
            $scope.showTruefalseBut = true;

       //Function to reveal the answers after true or false button is clicked
        $scope.showAns = function(event){
          if(event.target.id === "true"){
            $scope.showCorrAns = true;
            $scope.showTruefalseBut = false;
          }

          if(event.target.id === "false"){
            $scope.showWrongAns = true;
            $scope.showTruefalseBut = false;
          }
      };
     //Function to show next quiz
      $scope.next = function (quiz) {
       $scope.quiz.splice($scope.quiz.indexOf(quiz), 1);
       $scope.showCorrAns = false;
       $scope.showWrongAns = false;
       $scope.showTruefalseBut = true;
       if($scope.quiz.length ===0){
         $modalInstance.close();
       }
    };
    // switch case for showing the right quizes for the respectived dragged box
      switch(name){
          case "Accounts receivable":
                $scope.quiz =$scope.data.accounts_receivable.quiz;
                break;

          case "Accounts payable":
                $scope.quiz = $scope.data.accounts_payable.quiz;
                break;

          case "Advances received (and progress payments)":
                $scope.quiz = $scope.data.advances_received.quiz;
                break;

          case "Inventory":
                $scope.quiz = $scope.data.inventory.quiz;
                break;
        }
      });
     }
   };
  }
})();
