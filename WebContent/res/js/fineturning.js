var leftFlags = new Array();
var rightFlags = new Array();
var currIndex = 0;
var currStep = 6;
var quesItems = new Array();
var userId = "";
var serialNumber = "";
var currMode = 0;
var userOrder = new Array(new Array(),new Array());
var droppedOrder = new Array(new Array(),new Array());
var answerOrder = new Array("","");
var userAnswString = "";
var partnershipAnsw = null;
var itemsNum = 5;

$(function(){
	userId = $("#hidden_user_id").val();
	serialNumber = $("#hidden_serial_number").val();
	isReview = $("#hidden_is_review").val(); 
	
	if(isReview == "1"){
		currStep = 12;
		showRightAnswers();
	}else{
		createFineturningQues(currMode);
	}
}); 

//获得fineturning答案数组(复习)
function getFineturningAnswers(type){
	$.ajax({
		url:"/voc_exer/index.php/voc_exer_c/get_contents",
		type:"post",
		dataType:"json",
		data:{
			user_id: userId,
			serial_number: serialNumber
		},
		success:function(data,textStatus){
			var content3 = data.content_3;
			var xmlDoc = parseXmlString(content3);
			if(type == 0){
				partnershipAnsw = xmlDoc.getElementsByTagName("word_partnership")[0];
			}else if(type == 1){
				partnershipAnsw = xmlDoc.getElementsByTagName("word_partnership")[1];
			}
		}
	});
}

//初始化
function initFineturning(mode,num){
	leftFlags = new Array();
	rightFlags = new Array();
	userOrder = new Array(new Array(),new Array());
	droppedOrder = new Array(new Array(),new Array());
	
	for(var i=0;i<num;i++){
		leftFlags[i] = 1;
		rightFlags[i] = i;
		userOrder[mode][i] = "0";
		droppedOrder[mode][i] = "0";
	}
	currIndex = 0;
}

//生成Fineturning题目（正常）
function createFineturningQues(mode){
	//初始化
	//leftFlags = [1,1,1,1,1];
	//rightFlags = [0,1,2,3,4];
	//currIndex = 0;
	//设置direction
	$("#div_direction").html("");
	$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>词语搭配：</strong><span style='font-size:15pt'>请将左右两列中的单词或短语一一组合成贴切的词语搭配。请注意，用逗号隔开的多个单词或短语，应该都能匹配您为其选择的另一列中的单词。</span></div>");
	
	//生成题目
	$.ajax({
		url:"/voc_exer/getXmlMaterial",
		type:"post",
		dataType:"json",
		data:{
			serialNumber:serialNumber,
			part: 3
		},
		success:function(data,textStatus){
			//加载并解析xml字符串
			var xmlDoc = parseXmlString(data.xml);
			//获得题目数组
			var items = null;
			if(mode == 0){
				items = xmlDoc.getElementsByTagName("word_partnership")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
			}else{
				items = xmlDoc.getElementsByTagName("word_partnership")[1].getElementsByTagName("items")[0].getElementsByTagName("item");
			}
			//题目数小于5道则赋值，多于等于5道都取5道
			if(items.length < 5){
				itemsNum = items.length; 
			}
			//初始化
			initFineturning(mode,itemsNum);
			//每行生成随机题目
			var posFlags = new Array();
			for(var i = 0;i < itemsNum;i++){
				posFlags[i] = 1;
			}
			for(var i = 0;i < posFlags.length;i++){
				while(true){
					var rand = Math.floor(Math.random() * posFlags.length);
					if(posFlags[rand] == 1){
						quesItems[i] = $.trim(items[rand].getElementsByTagName("blank")[0].firstChild.nodeValue); 
						posFlags[rand] = 0;
						//记录答案顺序
						answerOrder[mode] += (rand+1) + "";
						break;
					}
				}
			}
			
			//清除原有内容
			$("#div_finetuning_body_left").html("");
			$("#div_finetuning_body_middle").html("");
			$("#div_finetuning_body_right").html("");
		
			$("#div_finetuning_body_left").append("<div class='div-finetuning-body-left-head'>搭配选项</div>");
			$("#div_finetuning_body_right").append("<div align='right' class='div-finetuning-body-right-head'>备选词汇</div>");
			
			for(var i=0;i<itemsNum;i++){
				//添加右边内容
				var divRight = $("<div id='div_turn_right_"+i+"' class='div-turn-right'></div>");
				var textRight = quesItems[i];
				if(textRight.length > 57){
					divRight.append("<div id='div_turn_right_mean_"+i+"' class='div-turn-right-mean'><div>"+textRight+"</div></div>");
				}else{
					divRight.append("<div id='div_turn_right_mean_"+i+"' class='div-turn-right-mean-middle'><div>"+textRight+"</div></div>");
				}
				$("#div_finetuning_body_right").append(divRight);
		
				/*使可被放置*/
				divRight.droppable({
					tolerance:"touch",
					drop:function(event,ui){
						//固定到右边
						var stsLeft = $("#div_turn_right_"+currIndex).offset().left;
						var stsTop = $("#div_turn_right_"+currIndex).offset().top;
						ui.draggable.offset({top:stsTop,left:stsLeft});
					}
				});
				/*使可拖动*/
				$("#div_turn_right_mean_"+i).draggable({ 
					containment: "#div_finetuning_body", 
					scroll: false ,
					revert:"invalid" });
				
				//添加左边内容
				var divLeft = $("<div id='div_turn_left_"+i+"' class='div-turn-left'></div>");
				var textLeft = $.trim(items[i].getElementsByTagName("match")[0].firstChild.nodeValue);
				if(length > 51){
					divLeft.append("<div id='div_turn_left_sts_"+i+"' class='div-turn-left-sents'>"+textLeft+"</div>");
				}else{
					divLeft.append("<div id='div_turn_left_sts_"+i+"' class='div-turn-left-sents-middle'>"+textLeft+"</div>");
				}
				$("#div_finetuning_body_left").append(divLeft);
				/*使可被放置*/
				$("#div_turn_left_"+i).droppable({
					hoverClass:"div-turn-left-hover",
					tolerance:"touch",
					drop:function(event,ui){
						//获得放置框序号
						var no = parseInt($(this).attr("id").charAt(14));
						//获得拖拉框序号
						var index = parseInt(ui.draggable.attr("id").charAt(20)) + 1;
						//设置用户答案顺序
						userOrder[mode][no] = index+"";
						//设置该位子被放置
						droppedOrder[mode][no] = "1";
						//放置时，所在行的右边框框移到拿起的位置
						var divMeaning = $("#div_turn_right_"+rightFlags[no]).children();
						if(divMeaning.offset().left >= 430 && divMeaning.offset().top == $("#div_turn_right_"+no).offset().top){
							var currTop = $("#div_turn_right_"+currIndex).offset().top;
							var currLeft = $("#div_turn_right_"+currIndex).offset().left;
							divMeaning.offset({top:currTop,left:currLeft});
							var temp = rightFlags[no];
							rightFlags[no] = rightFlags[currIndex];
							rightFlags[currIndex] = temp;
						}
						//固定到左边
						var stsLeft = $(this).offset().left;
						var stsTop = $(this).offset().top;
						ui.draggable.offset({top:stsTop,left:stsLeft+375});
						//改变accept，使其他框框不能被放置
						ui.draggable.addClass("active_"+no);
						$(this).droppable("option", "accept", ".active_"+no);
						leftFlags[no] = 0;
					},
					out:function(event,ui){
						//移出时，改变accept，重新使所有框框都可被放置
						var no = parseInt($(this).attr("id").charAt(14));
						ui.draggable.removeClass("active_"+no);
						$(this).droppable("option", "accept", "*");
						leftFlags[no] = 1;
						//设置该位子可放置
						droppedOrder[mode][no] = "0";
					},
					activate: function( event, ui ) {
						//活动框框开始移动时，记录当前所在行
						var rightTop = ui.draggable.offset().top;
						var leftTop = $(this).offset().top;
						if(rightTop == leftTop){
							currIndex = parseInt($(this).attr("id").charAt(14));
						}
					}
				});
			}
		}});
}

//生成Fineturning题目（复习）
function createFineturningQuesReview(mode){
	//初始化
	//leftFlags = [1,1,1,1,1];
	//rightFlags = [0,1,2,3,4];
	//currIndex = 0;
	//设置direction
	$("#div_direction").html("");
	$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>词语搭配：</strong><span style='font-size:15pt'>请将左右两列中的单词或短语一一组合成贴切的词语搭配。请注意，用逗号隔开的多个单词或短语，应该都能匹配您为其选择的另一列中的单词。</span></div>");

	//生成题目
	$.ajax({
		url:"/voc_exer/index.php/voc_exer_c/get_xml_material",
		type:"post",
		dataType:"json",
		data:{
			serial_number:serialNumber,
			part: 3
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data);
			//获得题目数组
			var items = null;
			if(mode == 0){
				items = xmlDoc.getElementsByTagName("word_partnership")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
			}else{
				items = xmlDoc.getElementsByTagName("word_partnership")[1].getElementsByTagName("items")[0].getElementsByTagName("item");
			}
			//题目数小于5道则赋值，多于等于5道都取5道
			if(items.length < 5){
				itemsNum = items.length; 
			}
			//初始化
			initFineturning(mode,itemsNum);
			//清除原有内容
			$("#div_finetuning_body_left").html("");
			$("#div_finetuning_body_middle").html("");
			$("#div_finetuning_body_right").html("");
		
			$("#div_finetuning_body_left").append("<div class='div-finetuning-body-left-head'>搭配选项</div>");
			$("#div_finetuning_body_right").append("<div align='right' class='div-finetuning-body-right-head'>备选词汇</div>");
			
			for(var i=0;i<itemsNum;i++){
				//添加右边内容
				var divRight = $("<div id='div_turn_right_"+i+"' class='div-turn-right'></div>");
				var textRight = $.trim(items[i].getElementsByTagName("blank")[0].firstChild.nodeValue);
				if(textRight.length > 57){
					divRight.append("<div id='div_turn_right_mean_"+i+"' class='div-turn-right-mean' style='cursor:auto'><div>"+textRight+"</div></div>");
				}else{
					divRight.append("<div id='div_turn_right_mean_"+i+"' class='div-turn-right-mean-middle' style='cursor:auto'><div>"+textRight+"</div></div>");
				}
				$("#div_finetuning_body_right").append(divRight);
				
				//添加左边内容
				var divLeft = $("<div id='div_turn_left_"+i+"' class='div-turn-left'></div>");
				var textLeft = $.trim(items[i].getElementsByTagName("match")[0].firstChild.nodeValue);
				if(length > 51){
					divLeft.append("<div id='div_turn_left_sts_"+i+"' class='div-turn-left-sents'>"+textLeft+"</div>");
				}else{
					divLeft.append("<div id='div_turn_left_sts_"+i+"' class='div-turn-left-sents-middle'>"+textLeft+"</div>");
				}
				$("#div_finetuning_body_left").append(divLeft);
				
				//固定到左边
				var stsLeft = divLeft.offset().left;
				var stsTop = divLeft.offset().top;
				divRight.offset({top:stsTop,left:stsLeft+375});
			}
		}});
}

//生成Fineturning题目2（复习）
function createFineturningQuesReview2(mode){
	//初始化
	leftFlags = [1,1,1,1,1];
	rightFlags = [0,1,2,3,4];
	currIndex = 0;
	//设置direction
	$("#div_direction").html("");
	$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>词语搭配：</strong><span style='font-size:15pt'>请将左右两列中的单词或短语一一组合成贴切的词语搭配。请注意，用逗号隔开的多个单词或短语，应该都能匹配您为其选择的另一列中的单词。</span></div>");
	
	//生成题目
	$.ajax({
		url:"/voc_exer/index.php/voc_exer_c/get_xml_material",
		type:"post",
		dataType:"json",
		data:{
			serial_number:serialNumber,
			part: 3
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data);
			//获得题目数组
			var items = null;
			if(mode == 0){
				items = xmlDoc.getElementsByTagName("word_partnership")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
			}else{
				items = xmlDoc.getElementsByTagName("word_partnership")[1].getElementsByTagName("items")[0].getElementsByTagName("item");
			}
			//清除原有内容
			$("#div_finetuning_body_left").html("");
			$("#div_finetuning_body_middle").html("");
			$("#div_finetuning_body_right").html("");
		
			$("#div_finetuning_body_left").append("<div class='div-finetuning-body-left-head'>搭配选项</div>");
			$("#div_finetuning_body_right").append("<div align='right' class='div-finetuning-body-right-head'>备选词汇</div>");
			
			//添加内容
			userOrder = partnershipAnsw.getElementsByTagName("user_order")[0].firstChild.nodeValue;
			dropOrder = partnershipAnsw.getElementsByTagName("drop_order")[0].firstChild.nodeValue;
			answOrder = partnershipAnsw.getElementsByTagName("answ_order")[0].firstChild.nodeValue;
			for(var i=0;i<userOrder.length;i++){
				//添加右边内容
				var divRight = $("<div id='div_turn_right_"+i+"' class='div-turn-right'></div>");
				var textRight = $.trim(items[parseInt(answOrder.charAt(parseInt(userOrder.charAt(i))))-1].getElementsByTagName("blank")[0].firstChild.nodeValue);
				if(textRight.length > 57){
					divRight.append("<div id='div_turn_right_mean_"+i+"' class='div-turn-right-mean' style='cursor:auto'><div>"+textRight+"</div></div>");
				}else{
					divRight.append("<div id='div_turn_right_mean_"+i+"' class='div-turn-right-mean-middle' style='cursor:auto'><div>"+textRight+"</div></div>");
				}
				$("#div_finetuning_body_right").append(divRight);
				
				//添加左边内容
				var divLeft = $("<div id='div_turn_left_"+i+"' class='div-turn-left'></div>");
				var textLeft = $.trim(items[i].getElementsByTagName("match")[0].firstChild.nodeValue);
				if(length > 51){
					divLeft.append("<div id='div_turn_left_sts_"+i+"' class='div-turn-left-sents'>"+textLeft+"</div>");
				}else{
					divLeft.append("<div id='div_turn_left_sts_"+i+"' class='div-turn-left-sents-middle'>"+textLeft+"</div>");
				}
				$("#div_finetuning_body_left").append(divLeft);
				
				if(dropOrder.charAt(i) == "1"){
					//固定到左边
					var stsLeft = divLeft.offset().left;
					var stsTop = divLeft.offset().top;
					divRight.offset({top:stsTop,left:stsLeft+375});
					//添加对错标志
					var index = parseInt(userOrder.charAt(i));
					if(answOrder.charAt(index) == (i+1)+""){
						if ($.browser.msie&&parseInt($.browser.version,10)===6){
							$("#div_turn_right_mean_"+i+" div").prepend("<span class='badge badge-success' style='margin-right:5px;'>R</span>");
						}else{
							$("#div_turn_right_mean_"+i+" div").prepend("<span class='badge badge-success' style='margin-right:5px;'><i class='icon-ok icon-white'></i></span>");
						}
					}else{
						if ($.browser.msie&&parseInt($.browser.version,10)===6){
							$("#div_turn_right_mean_"+i+" div").prepend("<span class='badge badge-important' style='margin-right:5px'>F</span>");
						}else{
							$("#div_turn_right_mean_"+i+" div").prepend("<span class='badge badge-important' style='margin-right:5px'><i class='icon-remove icon-white'></i></span>");
						}
					}
				}else{
					//固定到右边
					var currTop = $("#div_turn_right_"+i).offset().top;
					var currLeft = $("#div_turn_right_"+i).offset().left;
					divRight.offset({top:currTop,left:currLeft});
				}
			}
		}});
}

//显示用户答案（复习）
function showUserAnswers(){
	$("#button_user_answer").attr("disabled","disabled");
	$("#button_right_answer").removeAttr("disabled");
	getFineturningAnswers(currMode);
	createFineturningQuesReview2(currMode);
}

//显示正确答案（复习）
function showRightAnswers(){
	$("#button_right_answer").attr("disabled","disabled");
	$("#button_user_answer").removeAttr("disabled");
	getFineturningAnswers(currMode);
	createFineturningQuesReview(currMode);
}

//重置
function reset(currStep){
	if(currStep == 6){//第一部份
		createFineturningQues(currMode);
	}else{//第二部份
		createFineturningQues(currMode);
	}
}

//转发器
function nextStep(){
	currStep++;
	
	//显示相应页面
	if(currStep == 7){//转向第七步
		setUserAnswString();
		currMode = 1;
		createFineturningQues(currMode);
	}else if(currStep == 8){//转向第八步，其他页面
		setUserAnswString();
		saveFineturning();
	}else if(currStep == 13){//转向第13步
		currMode = 1;
		showRightAnswers();
	}else if(currStep == 14){//转向第15步，其他页面
		window.location = "/voc_exer/index.php/voc_exer_c/show_result/"+userId+"/"+serialNumber;
	}
}

//设置用户答案字符串
function setUserAnswString(){
	if(currStep == 7){//记录第六步用户答案
		userAnswString += "<fineturning>";
		userAnswString += "<word_partnership>";
		userAnswString += "<user_order>"+rightFlags.join("")+"</user_order>";
		userAnswString += "<drop_order>"+droppedOrder[0].join("")+"</drop_order>";
		userAnswString += "<answ_order>"+answerOrder[0]+"</answ_order>";
		userAnswString += "</word_partnership>";
	}else if(currStep == 8){//记录第七步用户答案
		userAnswString += "<word_partnership>";
		userAnswString += "<user_order>"+rightFlags.join("")+"</user_order>";
		userAnswString += "<drop_order>"+droppedOrder[1].join("")+"</drop_order>";
		userAnswString += "<answ_order>"+answerOrder[1]+"</answ_order>";
		userAnswString += "</word_partnership>";
		userAnswString += "</fineturning>";
	}
}

//保存答案
function saveFineturning(){
	$.ajax({
		url:"/voc_exer/saveFineturning",
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
			}else{
				$("#div_message_success").dialog({
					autoOpen:false,
					draggable:false,
					modal:true,
					resizable:false,
					width:400,
					height:300,
					hide:{effect:"clip",duration:500},
					dialogClass:"message",
					title:"<div style='font-size:15px;' align='center'><i class='icon-exclamation-sign icon-white'></i><strong>冰果英语助手提醒您</strong></div>"
				});
				$("#div_message_success").dialog("open");
			}
		}
	});
}

function turnToResult(){
	window.location = "/voc_exer/showResult?userId="+userId+"&serialNumber="+serialNumber;
}