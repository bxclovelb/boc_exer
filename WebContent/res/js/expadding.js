var currStep = 1;
var spellingNo = -1;
var ballNum = 3;
var spellingNum = 3;
var ifSpellingRight = false;
var matchingItems = new Array();
var spellingItems = new Array();
var spellingSemaphore = true;
var userAnswString = "";
//选项顺序
var matchingOrder = new Array();
//用户拼写答案
var userSpellings = new Array();
//拼写正确答案
var answSpellings = new Array();
//拼写题数
var spellingsCount = 0;
//选项顺序
var completionOrder = new Array();
var userId = "";
var serialNumber = "";
var matchingAnsws = null;
var spellingAnsws = null;
var completionAnsws = null;

$(function(){
	userId = $("#hidden_user_id").val();
	serialNumber = $("#hidden_serial_number").val();
	isReview = $("#hidden_is_review").val(); 
	part = $("#hidden_part").val(); 
	
	initPlayer();

	if(part == "1"){
		if(isReview == "1"){
			currStep = 9;
			getExpaddingAnswers(0);
		}else{
			createMatchingQuestions(isReview);
		}
	}else{
		if(part == "2"){
			currStep = 9;
			nextStep();
		}else if(part == "3"){
			currStep = 10;
			nextStep();
		}
	}
});

//初始化播放器
function initPlayer(){
	$("#jquery_jplayer").jPlayer({
		swfPath:"/voc_exer/res/js",
		supplied:"mp3"
	});
}

//获得expadding答案数组(复习)
function getExpaddingAnswers(type){
	$.ajax({
		url:"/voc_exer/index.php/voc_exer_c/get_contents",
		type:"post",
		dataType:"json",
		data:{
			user_id: userId,
			serial_number: serialNumber
		},
		success:function(data,textStatus){
			var content1 = data.content_1;
			var xmlDoc = parseXmlString(content1);
			if(type == 0){
				matchingAnsws = xmlDoc.getElementsByTagName("matching")[0].getElementsByTagName("item");
				createMatchingQuestions(isReview);
			}else if(type == 1){
				spellingAnsws = xmlDoc.getElementsByTagName("spelling")[0].getElementsByTagName("item");
				showSpellingAnsws();
			}else if(type == 2){
				completionAnsws = xmlDoc.getElementsByTagName("completion")[0].getElementsByTagName("item");
				createCompletionQues(isReview);
			}
		}
	});
}

//获得随机顺序
function getRandomOrder(){
	var nos = ["a","b","c","d"];
	for(var j=0;j<4;j++){
		var index = Math.floor(Math.random() * 4);

		var item = nos[index];
		nos[index] = nos[j];
		nos[j] = item;
	}
	return nos;
}

//生成单词释义题目(合并)
function createMatchingQuestions(isReview){
	//设置direction
	$("#div_direction").html("");
	$("#div_direction").append("<div style='width:70%'><strong style='font-size:15pt;'>选择词义：</strong><span style='font-size:15pt;'>请为每个单词选出中文释义</span></div>");
	//四列
	var divSection1 = $("#div_section_1");
	var divSection2 = $("#div_section_2");
	var divSection3 = $("#div_section_3");
	var divSection4 = $("#div_section_4");
	//
	//生成题目
	$.ajax({
		url:"/voc_exer/getXmlMaterial",
		type:"post",
		dataType:"json",
		data:{
			serialNumber:serialNumber,
			part: 1
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data.xml);
			//获得题目数组
			var items = xmlDoc.getElementsByTagName("matching")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
			//生成问题并放到各列
			for(var i=0;i<items.length;i++){
				//初始化matchingOrder对应项
				matchingOrder[i] = "";
				//生成问题
				var divQuestion = $("<div class='div-matching-question'></div>");
				var divQuestionHead = $("<div class='div-matching-question-head'><span style='color:white'>"+(i+1)+".</span><span>"+items[i].getElementsByTagName("word")[0].firstChild.nodeValue+"</span></div>");
				//生成选项
				var choices = new Array(4);
				if(isReview != "1"){
					/*获得随机顺序*/
					var nos = getRandomOrder();
					
					for(var j=0;j<4;j++){
						if(nos[j] == "a"){
							matchingOrder[i] += "1";
							choices[j] = items[i].getElementsByTagName("a")[0].firstChild.nodeValue;
						}else if(nos[j] == "b"){
							matchingOrder[i] += "2";
							choices[j] = items[i].getElementsByTagName("b")[0].firstChild.nodeValue;
						}else if(nos[j] == "c"){
							matchingOrder[i] += "3";
							choices[j] = items[i].getElementsByTagName("c")[0].firstChild.nodeValue;
						}else if(nos[j] == "d"){
							matchingOrder[i] += "4";
							choices[j] = items[i].getElementsByTagName("d")[0].firstChild.nodeValue;
						}
					}
				}else{
					/*历史顺序*/
					var order = matchingAnsws[i].getElementsByTagName("order")[0].firstChild.nodeValue;	
					for(var j=0;j<4;j++){
						var index = order.charAt(j);
						
						if(index == "1"){
							choices[j] = items[i].getElementsByTagName("a")[0].firstChild.nodeValue;
						}else if(index == "2"){
							choices[j] = items[i].getElementsByTagName("b")[0].firstChild.nodeValue;
						}else if(index == "3"){
							choices[j] = items[i].getElementsByTagName("c")[0].firstChild.nodeValue;
						}else if(index == "4"){
							choices[j] = items[i].getElementsByTagName("d")[0].firstChild.nodeValue;
						}
					}
				}
				var divQuestionBody = $("<div class='div-matching-question-body'><form id='form_matching_"+i+"'><div><input type='radio' name='choices' value='1'>"+choices[0]+"</div><div><input type='radio' name='choices' value='2'>"+choices[1]+"</div><div><input type='radio' name='choices' value='3'>"+choices[2]+"</div><div><input type='radio' name='choices' value='4'>"+choices[3]+"</div></form></div>");
				
				divQuestion.append(divQuestionHead);
				divQuestion.append(divQuestionBody);
				//放到对应列
				if(i%4 == 0){//放在第一列
					divSection1.append(divQuestion);
				}else if(i%4 == 1){//放在第二列
					divSection2.append(divQuestion);
				}else if(i%4 == 2){//放在第三列
					divSection3.append(divQuestion);
				}else if(i%4 == 3){//放在第四列
					divSection4.append(divQuestion);
				}
				
				//如果是复习模式，进行相应操作
				if(isReview == "1"){
					$("#form_matching_"+i+" input").attr("disabled","disabled");
					var userChoose = matchingAnsws[i].getElementsByTagName("user_choose")[0].firstChild.nodeValue;
					var order = matchingAnsws[i].getElementsByTagName("order")[0].firstChild.nodeValue;
					var index = order.indexOf("1");
					$("#form_matching_"+i+" div").slice(index,index+1).css("background-color","#7ffafa");
					if(userChoose != "0"){
						$("#form_matching_"+i+" input").slice(userChoose-1,userChoose).attr("checked","checked");
						if(order.charAt(userChoose-1) == "1"){
							if($.browser.msie && (parseInt($.browser.version,10)===6 || parseInt($.browser.version,10)===7)){
								if(parseInt($.browser.version,10)===6){
									$("#form_matching_"+i+" div").slice(userChoose-1,userChoose).prepend("<span class='badge badge-success' style='float:right'>R</span>");
								}else if(parseInt($.browser.version,10)===7){
									$("#form_matching_"+i+" div").slice(userChoose-1,userChoose).prepend("<span class='badge badge-success' style='float:right'><i class='icon-ok icon-white'></i></span>");
								}
							}else{
								$("#form_matching_"+i+" div").slice(userChoose-1,userChoose).append("<span class='badge badge-success' style='float:right'><i class='icon-ok icon-white'></i></span>");
							}
						}else{
							$("#form_matching_"+i+" div").slice(userChoose-1,userChoose).css("background-color","#fadc7f");
							if($.browser.msie && (parseInt($.browser.version,10)===6 || parseInt($.browser.version,10)===7)){
								if(parseInt($.browser.version,10)===6){
									$("#form_matching_"+i+" div").slice(userChoose-1,userChoose).prepend("<span class='badge badge-important' style='float:right'>F</span>");
								}else{
									$("#form_matching_"+i+" div").slice(userChoose-1,userChoose).prepend("<span class='badge badge-important' style='float:right'><i class='icon-remove icon-white'></i></span>");
								}
							}else{
								$("#form_matching_"+i+" div").slice(userChoose-1,userChoose).append("<span class='badge badge-important' style='float:right'><i class='icon-remove icon-white'></i></span>");
							}
						}
					}
				}
			}
			//将四列放入主区域
			$("#div_matching").append(divSection1);
			$("#div_matching").append(divSection2);
			$("#div_matching").append(divSection3);
			$("#div_matching").append(divSection4);
		}
	});
	
}

//初始化拼写
function initSpelling(){
	$.ajax({
		url:"/voc_exer/getXmlMaterial",
		type:"post",
		async:false,
		dataType:"json",
		data:{
			serialNumber:serialNumber,
			part: 1
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data.xml);
			//获得题目数组
			var spellingItems = xmlDoc.getElementsByTagName("spelling")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
			//获得拼写题数
			spellingsCount = spellingItems.length;
			//初始化
			for(var i=0;i<spellingsCount;i++){
				userSpellings[i] = "0";
				answSpellings[i] = "0";
			}
		}
	});
}

//产生一个spelling题目(正常)
function createSpellingQues(){
	//初始化参数
	ballNum = 3;
	spellingNo++;
	spellingNum = 3;
	
	//生成题目
	$.ajax({
		url:"/voc_exer/getXmlMaterial",
		type:"post",
		dataType:"json",
		data:{
			serialNumber:serialNumber,
			part: 1
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data.xml);
			//获得题目数组
			var spellingItems = xmlDoc.getElementsByTagName("spelling")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
			//播放单词
			var filename = spellingItems[spellingNo].getElementsByTagName("media_file")[0].firstChild.nodeValue; 
			playSound(filename);
			//单词输入
			var alphabet = spellingItems[spellingNo].getElementsByTagName("word")[0].firstChild.nodeValue.substring(0,1);
			var divInput = $("#div_input");
			divInput.html("");
			
			var table = $("<table></table>");
			var tr = $("<tr></tr>");
			var td0 = $("<td style='width:70px'></td>");
			td0.append("<span><img src='/voc_exer/res/img/pen.png' style='margin-top:18px'></img></span>");
			tr.append(td0);
			var td1 = $("<td style=''></td>");
			td1.append("<span style='margin-left:5px'><input id='input_spelling' type='text' style='height:32px;margin-top:10px;' placeholder='alphabet : "+alphabet+"'></span>");
			tr.append(td1);
			var td2 = $("<td style=''></td>");
			td2.append("<span style='margin-top:10px'><a href='###' onclick='checkSpellingAnswer();'><img src='/voc_exer/res/img/enter.png' style='margin-left:5px;height:42px'></img></a></span>");
			tr.append(td2);
			table.append(tr);
			divInput.append(table);
			//题目
			var sentence = spellingItems[spellingNo].getElementsByTagName("sentence")[0].firstChild.nodeValue;
			var startIndex = sentence.indexOf("[[");
			var endIndex = sentence.indexOf("]]");
			var subSentence = sentence.substring(startIndex,endIndex+2);
			var question = sentence.replace(subSentence,"_____");
			var divQuestion = $("#div_question");
			divQuestion.html("");
			divQuestion.append((spellingNo+1)+" : "+question);
			divQuestion.show();
			//提示信息
			updateInfo();
		}});
}


//显示正确答案和用户答案(复习)
function showSpellingAnsws(){
	//显示结束信息
	showEndInfo();
	
	//生成题目
	$.ajax({
		url:"/voc_exer/index.php/voc_exer_c/get_xml_material",
		type:"post",
		dataType:"json",
		data:{
			serial_number:serialNumber,
			part: 1
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data);
			//获得题目数组
			var spellingItems = xmlDoc.getElementsByTagName("spelling")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
			//显示
			for(var i=0;i<spellingItems.length;i++){
				userSpelling = spellingAnsws[i].getElementsByTagName("user_spell")[0].firstChild.nodeValue;
				answSpelling = spellingAnsws[i].getElementsByTagName("answ_spell")[0].firstChild.nodeValue;
				/*获得mp3文件路径*/
				var filename = spellingItems[i].getElementsByTagName("media_file")[0].firstChild.nodeValue;
				/*获得答案*/
				var answer = spellingItems[i].getElementsByTagName("word")[0].firstChild.nodeValue;
				if(userSpelling != "0"){
					if(userSpelling == answSpelling){
						//添加到用户答案
						$("#div_user_choosed").append("<div style='color:green;margin:10px;font-size:24px;line-height:24px'>"+userSpelling+"</div>");
						//添加到正确答案
						var divRightAnswer = getRightAnswerDiv(true,answer,filename);
						$("#div_right_answer").append(divRightAnswer);
					}else{
						//添加到用户答案
						$("#div_user_choosed").append("<div style='color:red;margin:10px;font-size:24px;line-height:24px'>"+userSpelling+"</div>");
						//添加到正确答案
						var divRightAnswer = getRightAnswerDiv(false,answer,filename);
						$("#div_right_answer").append(divRightAnswer);
					}
				}else{
					//添加到用户答案
					$("#div_user_choosed").append("<div style='color:red;margin:10px;font-size:24px;line-height:24px'>未选</div>");
					//添加到正确答案
					var divRightAnswer = getRightAnswerDiv(false,answer,filename);
					$("#div_right_answer").append(divRightAnswer);
				}
			}
		}});
}

//播放单词
function playSound(filename){
	playMp3(filename);
	ballNum--;
	updateInfo();
	$("#span_balls").html("");
	for(var i=0;i<ballNum;i++){
		var aBall = $("<a href='###' class='jp-play'></a>");
		aBall.click(function(){
			playSound(filename);
		});
		aBall.append("<img src='/voc_exer/res/img/ball.png'>");
		$("#span_balls").append(aBall);
	}
}

//更新提示信息
function updateInfo(){
	var divInfo = $("#div_info");
	divInfo.html("");
	divInfo.append("<div style='height:20px;margin-top: 200px;background:url(/voc_exer/res/img/info.png);padding:10px'>您还有"+ballNum+"次听的机会和"+spellingNum+"次输入的机会。</div><div style='height:20px;margin-top:10px;'>"+(spellingNo+1)+"/"+spellingsCount+"</div>");
}

//检查答案
function checkSpellingAnswer(){
	//检测信号量
	if(spellingSemaphore){
		//设置信号量为假
		spellingSemaphore = false;

		//用户答案
		var userChoosed = $.trim($("#input_spelling").val());
		if(userChoosed != null && userChoosed != ""){
			//更新信息
			spellingNum--;
			updateInfo();
			
			//生成题目
			$.ajax({
				url:"/voc_exer/getXmlMaterial",
				type:"post",
				dataType:"json",
				data:{
					serialNumber:serialNumber,
					part: 1
				},
				success:function(data,textStatus){
					//加载并解析xml文件
					var xmlDoc = parseXmlString(data.xml);
					//获得题目数组
					var items = xmlDoc.getElementsByTagName("spelling")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
					//获得答案
					var answer = items[spellingNo].getElementsByTagName("word")[0].firstChild.nodeValue;
					//获得题目数
					var quesNum = items.length;
					//获得mp3文件路径
					var filename = items[spellingNo].getElementsByTagName("media_file")[0].firstChild.nodeValue;
					//根据不同情况做不同的操作
					if(answer == userChoosed){//答对
						//设置userSpellings
						userSpellings[spellingNo] = userChoosed;
						//设置answSpellings
						answSpellings[spellingNo] = answer;
						
						$("#div_user_choosed").append("<div style='color:green;margin:10px;font-size:24px;line-height:24px'>"+userChoosed+"</div>");
						var divRightAnswer = getRightAnswerDiv(true,answer,filename);
						$("#div_right_answer").append(divRightAnswer);
						if(spellingNo < quesNum - 1){
							createSpellingQues();
						}else{
							showEndInfo();
						}
					}else{//答错
						if(spellingNum == 0){//输入次数用完
							//设置userSpellings
							userSpellings[spellingNo] = userChoosed;
							//设置answSpellings
							answSpellings[spellingNo] = answer;
							
							$("#div_user_choosed").append("<div style='color:red;margin:10px;font-size:24px;line-height:24px'>"+userChoosed+"</div>");
							var divRightAnswer = getRightAnswerDiv(false,answer,filename);
							$("#div_right_answer").append(divRightAnswer);
		
							if(spellingNo < quesNum - 1){
								createSpellingQues();
							}else{
								showEndInfo();
							}
						}else{//输入次数未用完
							if(ballNum > 0){
								playSound(filename);
							}
						}
					}
				}});
		}else{
			$("#div_mess_input_word").dialog({
				autoOpen:false,
				draggable:true,
				modal:true,
				resizable:false,
				width:300,
				height:200,
				hide:{effect:"clip",duration:500},
				dialogClass:"message",
				title:"<div style='font-size:15px;' align='center'><i class='icon-exclamation-sign icon-white'></i><strong>冰果英语助手提醒您</strong></div>"
			});
			$("#div_mess_input_word").dialog("open");
		}

		//设置信号量为真
		spellingSemaphore = true;
	}

}

//获得正确答案的div
function getRightAnswerDiv(ifRight,answer,filename){
	var img = $("<img src='/voc_exer/res/img/headphone.png'/>");
	var aImg = $("<a href='###' style='margin-left:10px'></a>"); 
	if(ifRight){
		aImg.addClass("right");
	}else{
		aImg.addClass("wrong");
	}
	aImg.append(img);
	aImg.click(function(){
		playMp3(filename);
	});

	var aWord = $("<a href='###' style='margin-left:10px'>"+answer+"</a>"); 
	if(ifRight){
		aWord.addClass("right");
	}else{
		aWord.addClass("wrong");
	}
	aWord.click(function(){
		playMp3(filename);
	});
	var divRightAnswer = $("<div style='margin:10px;font-size:24px;white-space: nowrap'></div>");
	divRightAnswer.append(aImg);
	divRightAnswer.append(aWord);

	return divRightAnswer;
}

//设置拼写结束信息
function showEndInfo(){
	//球
	$("#span_balls").html("");
	//单词输入
	var divInput = $("#div_input");
	divInput.html("");
	divInput.append("<img src='/voc_exer/res/img/pen.png' style='margin-top:18px;vertical-align:bottom'></img>");
	divInput.append("<span style='font-size:30pt;margin-left:10px'>拼写练习结束!</span>");
	//题目
	$("#div_question").hide();
	//提示信息
	var divInfo = $("#div_info");
	divInfo.html("");
	divInfo.append("<div style='height:20px;margin-top:200px;background:url(/voc_exer/res/img/info.png);padding:10px'>练习结束，点击右上角菜单进入下一部分词汇练习。</div><div style='height:20px;margin-top:10px;'></div>");
}

//生成选词填空题目
function createCompletionQues(isReview){
	//生成题目
	$.ajax({
		url:"/voc_exer/getXmlMaterial",
		type:"post",
		dataType:"json",
		data:{
			serialNumber:serialNumber,
			part: 1
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data.xml);
	
			//获得题目数组
			var items = xmlDoc.getElementsByTagName("completion")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
			//左右两列
			var divLeft = $("#div_completion_left");
			var divRight = $("#div_completion_right");
			//把题目放入两列
			for(var i = 0;i < items.length;i++){
				//初始化completionOrder对应项
				completionOrder[i] = "";
				//生成问题
				var divQuestion = $("<div class='div-completion-question'></div>");
				var sentence = items[i].getElementsByTagName("body")[0].firstChild.nodeValue;
				var startIndex = sentence.indexOf("[[");
				var endIndex = sentence.indexOf("]]");
				var subSentence = sentence.substring(startIndex,endIndex+2);
				var question = sentence.replace(subSentence,"_____");
				var divQuestionHead = $("<div><span style='color:white;'>"+(i+1)+".</span> <span>"+question+"</span></div>");
				if(question.length <= 53)
					divQuestionHead.addClass("div-completion-question-head");
				else
					divQuestionHead.addClass("div-completion-question-head-short");
				//生成选项
				var choices = new Array(4);
				if(isReview != "1"){
					/*打乱顺序*/
					var nos = ["a","b","c","d"];
					for(var j=0;j<4;j++){
						var index = Math.floor(Math.random() * 4);
			
						var item = nos[index];
						nos[index] = nos[j];
						nos[j] = item;
					}
					for(var j=0;j<4;j++){
						if(nos[j] == "a"){
							completionOrder[i] += "1";
							choices[j] = items[i].getElementsByTagName("a")[0].firstChild.nodeValue;
						}else if(nos[j] == "b"){
							completionOrder[i] += "2";
							choices[j] = items[i].getElementsByTagName("b")[0].firstChild.nodeValue;
						}else if(nos[j] == "c"){
							completionOrder[i] += "3";
							choices[j] = items[i].getElementsByTagName("c")[0].firstChild.nodeValue;
						}else if(nos[j] == "d"){
							completionOrder[i] += "4";
							choices[j] = items[i].getElementsByTagName("d")[0].firstChild.nodeValue;
						}
					}
				}else{
					/*历史顺序*/
					var order = completionAnsws[i].getElementsByTagName("order")[0].firstChild.nodeValue;	
					for(var j=0;j<4;j++){
						var index = order.charAt(j);
						
						if(index == "1"){
							choices[j] = items[i].getElementsByTagName("a")[0].firstChild.nodeValue;
						}else if(index == "2"){
							choices[j] = items[i].getElementsByTagName("b")[0].firstChild.nodeValue;
						}else if(index == "3"){
							choices[j] = items[i].getElementsByTagName("c")[0].firstChild.nodeValue;
						}else if(index == "4"){
							choices[j] = items[i].getElementsByTagName("d")[0].firstChild.nodeValue;
						}
					}
				}
				var divQuestionBody = $("<div class='div-completion-question-body'><form id='form_completion_"+i+"'><div><input type='radio' name='choices' value='1'><span>"+choices[0]+"</span></div><div><input type='radio' name='choices' value='2'><span>"+choices[1]+"</span></div><div><input type='radio' name='choices' value='3'><span>"+choices[2]+"</span></div><div><input type='radio' name='choices' value='4'><span>"+choices[3]+"</span></div></form></div>");
		
				divQuestion.append(divQuestionHead);
				divQuestion.append(divQuestionBody);
				//放到对应列
				if(i%2 == 0){//放在左列
					divLeft.append(divQuestion);
				}else if(i%2 == 1){//放在右列
					divRight.append(divQuestion);
				}
				
				//如果是复习模式，则进行相应操作
				if(isReview == "1"){
					$("#form_completion_"+i+" input").attr("disabled","disabled");
					var userChoose = completionAnsws[i].getElementsByTagName("user_choose")[0].firstChild.nodeValue;
					var order = completionAnsws[i].getElementsByTagName("order")[0].firstChild.nodeValue;
					var index = order.indexOf("1");
					$("#form_completion_"+i+" div").slice(index,index+1).css("background-color","#7ffafa");
					if(userChoose != "0"){
						var order = completionAnsws[i].getElementsByTagName("order")[0].firstChild.nodeValue;
						$("#form_completion_"+i+" input").slice(userChoose-1,userChoose).attr("checked","checked");
						if(order.charAt(userChoose-1) == "1"){
							if($.browser.msie && (parseInt($.browser.version,10)===6 || parseInt($.browser.version,10)===7)){
								if(parseInt($.browser.version,10)===6){
									$("#form_completion_"+i+" div").slice(userChoose-1,userChoose).prepend("<span class='badge badge-success' style='float:right'>R</span>");
								}else{
									$("#form_completion_"+i+" div").slice(userChoose-1,userChoose).prepend("<span class='badge badge-success' style='float:right'><i class='icon-ok icon-white'></i></span>");	
								}
							}else{
								$("#form_completion_"+i+" div").slice(userChoose-1,userChoose).append("<span class='badge badge-success' style='float:right'><i class='icon-ok icon-white'></i></span>");
							}
						}else{
							$("#form_completion_"+i+" div").slice(userChoose-1,userChoose).css("background-color","#fadc7f");
							if($.browser.msie && (parseInt($.browser.version,10)===6 || parseInt($.browser.version,10)===7)){
								if(parseInt($.browser.version,10)===6){
									$("#form_completion_"+i+" div").slice(userChoose-1,userChoose).prepend("<span class='badge badge-important' style='float:right'>F</span>");
								}else{
									$("#form_completion_"+i+" div").slice(userChoose-1,userChoose).prepend("<span class='badge badge-important' style='float:right'><i class='icon-remove icon-white'></i></span>");	
								}
							}else{
								$("#form_completion_"+i+" div").slice(userChoose-1,userChoose).append("<span class='badge badge-important' style='float:right'><i class='icon-remove icon-white'></i></span>");
							}
						}
					}
				}
			}
			//放入主区域
			$("#div_completion").append(divLeft);
			$("#div_completion").append(divRight);
		}});
}



//转发器
function nextStep(){
	currStep++;

	//隐藏当前页面
	$("#div_body .active").hide();
	$("#div_body .active").removeClass('active');
	//显示相应页面
	if(currStep == 2){//转向第二步
		$("#div_spelling").addClass('active');
		$("#div_direction").html("");
		$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>拼写练习：</strong><span style='font-size:15pt;'>听单词，练拼写。拼完后输入回车，如果不对可以重新拼。每个单词有3次机会听和拼。</span></div>");
		$("#div_spelling").show();
		
		//初始化拼写
		initSpelling();
		
		setUserAnswString();
	}else if(currStep == 3){//转向第三步
		$("#div_completion").addClass('active');
		$("#div_direction").html("");
		$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>选词填空：</strong><span style='font-size:15pt;'>选出最合适填入句中空格的一个单词。</span></div>");
		$("#div_completion").show();
		createCompletionQues(isReview);
		
		setUserAnswString();
	}else if(currStep == 4){//转向第四步，其他页面
		setUserAnswString();
		saveExpadding();
	}else if(currStep == 10){//转向第10步（复习）
		$("#div_spelling").addClass('active');
		$("#div_direction").html("");
		$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>拼写练习：</strong><span style='font-size:15pt;'>听单词，练拼写。拼完后输入回车，如果不对可以重新拼。每个单词有3次机会听和拼。</span></div>");
		$("#div_spelling").show();
		
		getExpaddingAnswers(1);
	}else if(currStep == 11){//转向第11步（复习）
		$("#div_completion").addClass('active');
		$("#div_direction").html("");
		$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>选词填空：</strong><span style='font-size:15pt;'>选出最合适填入句中空格的一个单词。</span></div>");
		$("#div_completion").show();
		
		getExpaddingAnswers(2);
	}else if(currStep == 12){//转向第12步（复习） ,转向其他页面
		window.location = "/voc_exer/index.php/voc_exer_c/show_consolidating/"+userId+"/"+serialNumber+"/1";
	}
}

//设置用户答案字符串
function setUserAnswString(){
	if(currStep == 2){//记录第一步用户答案
		userAnswString += "<expadding>";
		userAnswString += "<matching>";
		for(var i=0;i<matchingOrder.length;i++){
			userAnswString += "<item>";
			var userChoose = $("#form_matching_"+i+" input:checked").val();
			if(userChoose == null ){
				userAnswString += "<user_choose>0</user_choose>";
			}else{
				userAnswString += "<user_choose>"+userChoose+"</user_choose>";
			}
			userAnswString += "<order>"+matchingOrder[i]+"</order>";
			userAnswString += "</item>";
		}
		userAnswString += "</matching>";
	}else if(currStep == 3){//记录第二步用户答案
		userAnswString += "<spelling>";
		for(var i=0;i<spellingsCount;i++){
			userAnswString += "<item>";
			userAnswString += "<user_spell>" + userSpellings[i] + "</user_spell>";
			userAnswString += "<answ_spell>" + answSpellings[i] + "</answ_spell>";
			userAnswString += "</item>";
		}
		userAnswString += "</spelling>";
	}else if(currStep == 4){//记录第三步用户答案
		userAnswString += "<completion>";
		for(var i=0;i<completionOrder.length;i++){
			userAnswString += "<item>";
			var userChoose = $("#form_completion_"+i+" input:checked").val();
			if(userChoose == null ){
				userAnswString += "<user_choose>0</user_choose>";
			}else{
				userAnswString += "<user_choose>"+userChoose+"</user_choose>";
			}
			userAnswString += "<order>"+completionOrder[i]+"</order>";
			userAnswString += "</item>";
		}
		userAnswString += "</completion>";
		userAnswString += "</expadding>";
	}
}

function saveExpadding(){
	$.ajax({
		url:"/voc_exer/saveExpadding",
		type:"post",
		dataType:"json",
		data:{
			userId: userId,
			serialNumber: serialNumber,
			userAnswString: userAnswString
		},
		success:function(data,textStatus){
			if(!data.success){
				alert("成绩保存失败！请稍后重试。");
			}
			
			window.location.href = "/voc_exer/showConsolidating?userId="+userId+"&serialNumber="+serialNumber;
		}
	});
}