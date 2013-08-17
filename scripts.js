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
		Inputer.prototype.isFieldAnswered = function () {

		};
		Inputer.prototype.nextField = function () {

		};
		Inputer.prototype.submit = function () {
			var txtArea = document.getElementById('main__fastInput_ta');
			var outElem = $(".main__form_table textarea:eq(" + this.curr_field + " )");

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
			var nextFieldNum = -1;
			var i = 0;
			var isFind = false;
			while(this.qst[i] == true && i < this.qst.length){
				i++;
			}
			if (this.qst[i] === false) {
				isFind = true;
				nextFieldNum = i;
				this.curr_field = i;
			};
			var outElem = document.getElementById('main__fastInput_lbl');
			outElem.innerText = $(".main__form_table label:eq(" + nextFieldNum + " )").text();

		}
		return Inputer;
	}());


	window.onload = function init(){
		var inputerDiv = document.getElementById('Inputer');
		var sendBtn = document.getElementById('main_fastInput-sendBtn');
		var inputer = new Inputer(inputerDiv, sendBtn,"abra",0,0,15);
		inputer.showInputer();
		inputer.showNextQst();
		inputer.listen();
	};	

}());