(function(){
	"use strict";

	var Inputer = (function(){
		/**
		 * Создает экземпляр Inputera.
		 * @name Inputer
		 * @param {String} def_txt текст по умолчанию.
		 * @param {Number}[] curr_field текущее поле.
		 * @param {Number} answered число отвеченных.
		 */
		function Inputer(inputerDiv,sendBtn,def_txt, curr_field, answered, questions){
			this.inputerDiv = inputerDiv;
			this.def_txt = "";
			this.curr_field = curr_field;
			this.answered = answered;
			this.qst = Array(questions);
			this.sendBtn = sendBtn;
			this.txtArea = document.getElementById('main-fastInput--ta');
			this.txtArea.focus();
			while (--questions >= 0) {
     		   this.qst[questions] = false;
    		}

		}
		Inputer.prototype.listen = function(){
			
			addEvent("click", this.sendBtn, this.submit.bind(this, false));
			$(".main-form__qstion--ta").bind("input propertychange", this.txtChanged.bind(this));
			$(document).keypress(this.pressEnter.bind(this));
		};
		Inputer.prototype.pressEnter = function(e){
			if(e.which == 13) {
				e.preventDefault();
        		this.submit();
   			}
		}
		Inputer.prototype.txtChanged = function(e){
			var getNumStr = e.target.id.replace( /^\D+/g, '');
			var qstNum = parseInt(getNumStr, 10);
			var testStr = $(e.target).val().replace(/\s/g, "");
			if(testStr.length){
				this.changeStatus(qstNum, true);
			}else{
				this.changeStatus(qstNum, false);;
			}
		};
		Inputer.prototype.changeStatus = function (num, status) {

			var tdElem = $(".main-fastInput__status--table td").eq(num);
			if(status){
				tdElem.removeClass('main-fastInput__status--td').addClass('main-fastInput__status--tdOk');
				this.answered++;
			}else{
				tdElem.removeClass('main-fastInput__status--tdOk').addClass('main-fastInput__status--td');
				this.answered--;
			}
			var reDraw = (num === this.curr_field) || (this.isFinished() && status === false); 
			this.qst[num] = status;
			if (reDraw) {
				this.showNextQst();
			}

		};
		Inputer.prototype.isFinished = function () {
			var i = this.qst.length;
			while(--i >= 0){
				if (this.qst[i] === false) {
					return false;
				}
			}
			return true;
		};
		Inputer.prototype.ShowConfirmSubmit = function () {
			$(".main-fastInput__taWrap").hide();
			var outLbl = document.getElementById("main-fastInput_lbl");
			//this.sendBtn.innerHTML = "в Яндекс!";
			$(this.sendBtn).hide();
			outLbl.innerHTML = "<a href='#lastWay'>Отправить данные в Яндекс</a>"; 
			//////////////
			$('a').click(function(){
    				$('html, body').animate({
    			    	scrollTop: $( $.attr(this, 'href') ).offset().top
    				}, 500);
    			return false;
			});

		};

		Inputer.prototype.isFieldAnswered = function () {

		};
		Inputer.prototype.nextField = function () {
			var nextFieldNum = -1;
			var i = 0;
			var isFind = false;
			while(this.qst[i] == true && i < this.qst.length){
				i++;
			}
			//console.log(this.qst[i], "   ", i);
			if (this.qst[i] === false) {
				isFind = true;
				nextFieldNum = i;
				this.curr_field = i;
			}
			return nextFieldNum;

		};
		Inputer.prototype.submit = function () {
			//console.log(this.answered);
			//console.log(this.answered == 15);
			if (this.answered == 15) {
				location.hash = "#lastWay";
			}else{
				var outElem = $(".main-form__qstion--ta").eq(this.curr_field );
				//todo verify
				this.qst[this.curr_field] = true;
				outElem.val(this.txtArea.value);
				outElem.trigger("propertychange");
				this.txtArea.focus();
				this.txtArea.value = "";
				setCaretToPos(this.txtArea,0);
				this.showNextQst();	
			}
			
		};
		Inputer.prototype.hideInputer = function () {
			this.inputerDiv.hidden = true;
		};
		Inputer.prototype.showInputer = function () {
			this.inputerDiv.hidden = false;
		};
		Inputer.prototype.showNextQst = function(){
			var nextFieldNum = this.nextField();
			if (nextFieldNum > -1) {
				var outElem = document.getElementById('main-fastInput_lbl');
				outElem.innerHTML = $(".main-form__qstion--lbl").eq(nextFieldNum).html();
				$(".main-fastInput__taWrap").show();

			}else{
				this.ShowConfirmSubmit();
			}
			
		}
		return Inputer;
	}());


	window.onload = function init(){
		var inputerDiv = document.getElementById('Inputer');
		var sendBtn = document.getElementById('main-fastInput--sendBtn');
		var inputer = new Inputer(inputerDiv, sendBtn,"abra",0,0,15);
		
		ie8_BindInit();

		inputer.showInputer();
		inputer.showNextQst();
		inputer.listen();
	};	


	//////Костыли////////

	function setSelectionRange(input, selectionStart, selectionEnd) {
	  	if (input.setSelectionRange) {
	    	input.focus();
	    	input.setSelectionRange(selectionStart, selectionEnd);
	  	}else if (input.createTextRange) {
		    var range = input.createTextRange();
		    range.collapse(true);
		    range.moveEnd('character', selectionEnd);
		    range.moveStart('character', selectionStart);
		    range.select();
	  }
	}

	function setCaretToPos (input, pos) {
	  setSelectionRange(input, pos, pos);
	}
	function addEvent(evnt, elem, func) {
 		if (elem.addEventListener)  // W3C DOM
    		  elem.addEventListener(evnt,func,false);
   		else if (elem.attachEvent) { // IE DOM
      		elem.attachEvent("on"+evnt, func);
  		}else { // No much to do
      		elem[evnt] = func;
   		}
	}
	function ie8_BindInit(){
		if (!Function.prototype.bind) {
  			Function.prototype.bind = function (oThis) {
    			if (typeof this !== "function") {
			     	// closest thing possible to the ECMAScript 5 internal IsCallable function
			    	throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			    }
	    		var aArgs = Array.prototype.slice.call(arguments, 1), 
		        fToBind = this, 
		        fNOP = function () {},
		        fBound = function () {
          		return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
         	                      aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
	}

}());