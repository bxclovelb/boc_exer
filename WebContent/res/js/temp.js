	//生成单词拼写题目
	function createSpellingQuestions(){
		//清空主区域
		$("#div_body").html("");
		//拼写主区域
		var divSpellingBody = $("<div style='margin:30px;border-radius:10px 10px'></div>")
		divSpellingBody.css("background","url('/voc_exe/res/img/bg_body.jpg') repeat-x");
		divSpellingBody.css("height","550px");
		//设置direction
		$("#div_direction").html("");
		$("#div_direction").append("<div style='width:70%'><strong style='font-size:15pt;'>拼写练习：</strong><span style='font-size:15pt;'>听单词，练拼写。拼完后输入回车，如果不对可以重新拼。每个单词有3次机会听和拼。</span></div>");
		//生成左右两大列
		var divSectionLeft = $("<div class='span6' style='padding-left:30px' id='div_section_left'></div>");
		var divSectionRight = $("<div class='span6' style='padding-left:10px;padding-right:15px' id='div_section_right'></div>");
		//生成左大列各项
		/*耳机，播放次数*/
		var divListen = $("<div style='margin-top:60px' id='div_listen'></div>");
		divListen.append("<div id='div_mp3'></div>");
		divListen.append("<img src='/voc_exe/res/img/headset.png'>");
		var spanBalls = divListen.append("<span id='span_balls' style='margin-left:20px'></span>");
		spanBalls.append("<img src='/voc_exe/res/img/ball.png'>");
		spanBalls.append("<img src='/voc_exe/res/img/ball.png'>");
		spanBalls.append("<img src='/voc_exe/res/img/ball.png'>");
		divSectionLeft.append(divListen);
		/*单词输入*/
		var divInput = $("<div style='margin-top:30px;background-color:white;height:100px;width:350px;border-radius:10px 10px' id='div_input'></div>");
		divInput.append("<img src='/voc_exe/res/img/pen.png' style='margin-top:18px;vertical-align:bottom'></img>");
		divInput.append("<input type='button' class='btn-large btn-warning' value='开始' style='margin-left:50px;width:150px' onclick='createSpellingQues();'>");
		//divInput.append("<span style='margin-left:5px'><input type='text' style='height:32px;margin-top:10px' placeholder='letter'></span>");
		//divInput.append("<a href='javascript:void(0);' onclick=''><img src='/voc_exe/res/img/enter.png' style='margin-left:5px;height:42px'></img></a>");
		divSectionLeft.append(divInput);
		/*题目*/
		var divQuestion = $("<div style='margin-top:30px;' id='div_question'></div>");
		divSectionLeft.append(divQuestion);
		/*提示信息*/
		var divInfo = $("<div style='margin-top:30px;width:350px;' id='div_info'></div>");
		divInfo.append("<div style='height:20px;margin-top:200px;background:url(/voc_exe/res/img/info.png);padding:10px'>请点击开始按钮开始听写。</div>");
		divInfo.append("<div style='height:20px;margin-top:10px;'>10</div>");
		divSectionLeft.append(divInfo);
		//生成右大列两部分
		/*第一部份*/
		var divSectionRight1 = $("<div style='width:190px;height:420px;float:left;margin-top:70px;background-color:white;border-radius:10px 10px'></div>");
		var divSectionRightHead1 = $("<div align='center' style='font-size:15pt;margin-top:20px'>您的答案</div>");
		divSectionRight1.append(divSectionRightHead1);
		var divSectionRightBody1 = $("<div style='font-size:15pt;margin:15px;border:1px solid black;height:350px;border-radius:10px 10px'></div>");
		divSectionRight1.append(divSectionRightBody1);
		divSectionRight.append(divSectionRight1);
		/*第二部份*/
		var divSectionRight2 = $("<div style='width:190px;height:420px;float:left;margin-top:70px;margin-left:20px;background-color:white;border-radius:10px 10px'></div>");
		var divSectionRightHead2 = $("<div align='center' style='font-size:15pt;margin-top:20px'>单词列表</div>");
		divSectionRight2.append(divSectionRightHead2);
		var divSectionRightBody2 = $("<div style='font-size:15pt;margin:15px;border:1px solid black;height:350px;border-radius:10px 10px'></div>");
		divSectionRight2.append(divSectionRightBody2);
		divSectionRight.append(divSectionRight2);
		
		//将两大列放入主区域中
		divSpellingBody.append(divSectionLeft);
		divSpellingBody.append(divSectionRight);
		//将拼写主区域放入主区域
		$("#div_body").append(divSpellingBody);
	}