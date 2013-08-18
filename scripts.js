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
			var self = this;
			this.inputerDiv = inputerDiv;
			this.def_txt = "";
			this.curr_field = curr_field;
			this.answered = answered;
			this.qst = Array(questions);
			this.sendBtn = sendBtn;

			while (--questions >= 0) {
     		   this.qst[questions] = false;
    		}

		}
		Inputer.prototype.listen = function(){
			this.sendBtn.addEventListener('click',this.submit.bind(this, false));
		}

		Inputer.prototype.nextField = function () {

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
			this.sendBtn.innerText = "в Яндекс!";
			outLbl.innerText = "Отправить данные в Яндекс"; 

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
			console.log(this.qst[i], "   ", i);
			if (this.qst[i] === false) {
				isFind = true;
				nextFieldNum = i;
				this.curr_field = i;
			}
			return nextFieldNum;

		};
		Inputer.prototype.submit = function () {
			var txtArea = document.getElementById('main-fastInput--ta');
			var outElem = $(".main-form__qstion--ta:eq(" + this.curr_field + " )");
			console.log(txtArea.value);
			//todo verify
			this.qst[this.curr_field] = true;
			outElem.val(txtArea.value);
			txtArea.value = "";

			this.showNextQst();
		};
		Inputer.prototype.hideInputer = function () {
			this.inputerDiv.hidden = true;
		};
		Inputer.prototype.showInputer = function () {
			this.inputerDiv.hidden = false;
		};
		Inputer.prototype.showNextQst = function(){
			//todo cycle next
			var nextFieldNum = this.nextField();
			if (nextFieldNum > -1) {
				var outElem = document.getElementById('main-fastInput_lbl');
				outElem.innerText = $(".main-form__qstion--lbl:eq(" + nextFieldNum + " )").text();

			}else{
				this.ShowConfirmSubmit();
			}
			
		}
		return Inputer;
	}());


	window.onload = function init(){
		var inputerDiv = document.getElementById('Inputer');
		var sendBtn = document.getElementById('main-fastInput--sendBtn');
		var inputer = new Inputer(inputerDiv, sendBtn,"abra",0,0,3);
		inputer.showInputer();
		inputer.showNextQst();
		inputer.listen();
	};	

}());