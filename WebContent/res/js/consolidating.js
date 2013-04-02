var leftFlags = new Array();
var rightFlags = new Array();
var currIndex = 0;
var currStep = 4;
var quesItems = new Array();
var userId = "";
var serialNumber = "";
var userOrder = new Array(new Array(),new Array());
var droppedOrder = new Array(new Array(),new Array());
var answerOrder = new Array("","");
var currMode = 0;
var userAnswString = "";
var frequentlyAnsw = null;
var itemsNum = 6;

$(function(){
	userId = $("#hidden_user_id").val();
	serialNumber = $("#hidden_serial_number").val();
	isReview = $("#hidden_is_review").val(); 

	if(isReview == "1"){
		currStep = 12;
		showRightAnswers();
	}else{
		createFrequentlyQues(currMode);
	}
}); 

//获得consolidating答案数组(复习)
function getConsolidatingAnswers(type){
	$.ajax({
		url:"/voc_exer/index.php/voc_exer_c/get_contents",
		type:"post",
		dataType:"json",
		data:{
			user_id: userId,
			serial_number: serialNumber
		},
		success:function(data,textStatus){
			var content2 = data.content_2;
			var xmlDoc = parseXmlString(content2);
			if(type == 0){
				frequentlyAnsw = xmlDoc.getElementsByTagName("frequently_used_words")[0];
			}else if(type == 1){
				frequentlyAnsw = xmlDoc.getElementsByTagName("frequently_used_words")[1];
			}
		}
	});
}

//初始化
function initFrequently(mode,num){
	for(var i=0;i<num;i++){
		leftFlags[i] = 1;
		rightFlags[i] = i;
		userOrder[mode][i] = ""+(i+1);
		droppedOrder[mode][i] = "0";
	}
	currIndex = 0;
}

//生成问题 (正常)
function createFrequentlyQues(mode){
	//初始化
	//leftFlags = [1,1,1,1,1,1];
	//rightFlags = [0,1,2,3,4,5];
	//currIndex = 0;
	
	//设置direction
	$("#div_direction").html("");
	$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>词义配对：</strong><span style='font-size:15pt;'>仔细阅读左列中的句子，在右列中找出这个单词在句中的释义，一一配对。用鼠标拖动释义与相对应的句子“对接”。</span></div>");
	//生成题目
	$.ajax({
		url:"/voc_exer/getXmlMaterial",
		type:"post",
		dataType:"json",
		data:{
			serialNumber:serialNumber,
			part: 2
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data.xml);
			//获得题目数组
			var items = null;
			if(mode == 0){
				//items = xmlDoc.getElementsByTagName("frequently_used_words")[0].getElementsByTagName("items")[0].getElementsByTagName("item")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
				items = xmlDoc.getElementsByTagName("frequently_used_words")[0].
						getElementsByTagName("items")[0].getElementsByTagName("word")[0].
						parentNode.getElementsByTagName("items")[0].getElementsByTagName("item");
				
			}else{
				//items = xmlDoc.getElementsByTagName("frequently_used_words")[0].getElementsByTagName("items")[0].getElementsByTagName("item")[7].getElementsByTagName("items")[0].getElementsByTagName("item");
				items = xmlDoc.getElementsByTagName("frequently_used_words")[0].
						getElementsByTagName("items")[0].getElementsByTagName("word")[1].
						parentNode.getElementsByTagName("items")[0].getElementsByTagName("item");
			}
			//题目数小于6道则赋值，多于等于6道都取6道
			if(items.length < 6){
				itemsNum = items.length; 
			}
			
			//初始化
			initFrequently(mode,itemsNum);
			
			//每行生成随机题目
			var posFlags = new Array();
			for(var i = 0;i < itemsNum;i++){
				posFlags[i] = 1;
			}
			for(var i = 0;i < posFlags.length;i++){
				while(true){
					var rand = Math.floor(Math.random() * posFlags.length);
					if(posFlags[rand] == 1){
						quesItems[i] = $.trim(items[rand].getElementsByTagName("definition")[0].firstChild.nodeValue); 
						posFlags[rand] = 0;
						//记录答案顺序
						answerOrder[mode] += (rand+1) + "";
						break;
					}
				}
			}

			//清除原有内容
			$("#div_consolidating_body_left").html("");
			$("#div_consolidating_body_middle").html("");
			$("#div_consolidating_body_right").html("");

			$("#div_consolidating_body_left").append("<div class='div-consolidating-body-left-head'>Sentence</div>");
			$("#div_consolidating_body_right").append("<div align='right' class='div-consolidating-body-right-head'>Meanings</div>");

			for(var i=0;i<itemsNum;i++){
				//添加右边内容
				var divRight = $("<div id='div_freq_right_"+i+"' class='div-freq-right'></div>");
				var textRight = quesItems[i];
				if(textRight.length > 57){
					divRight.append("<div id='div_freq_right_mean_"+i+"' class='div-freq-right-mean'><div>"+textRight+"</div></div>");
				}else{
					divRight.append("<div id='div_freq_right_mean_"+i+"' class='div-freq-right-mean-middle'><div>"+textRight+"</div></div>");
				}
				$("#div_consolidating_body_right").append(divRight);

				/*使可被放置*/
				divRight.droppable({
					tolerance:"touch",
					drop:function(event,ui){
						//固定到右边
						var stsLeft = $("#div_freq_right_"+currIndex).offset().left;
						var stsTop = $("#div_freq_right_"+currIndex).offset().top;
						ui.draggable.offset({top:stsTop,left:stsLeft});
					}
				});
				/*使可拖动*/
				$("#div_freq_right_mean_"+i).draggable({ 
					containment: "#div_consolidating_body", 
					scroll: false ,
					revert:"invalid" });

				//添加左边内容
				var divLeft = $("<div id='div_freq_left_"+i+"' class='div-freq-left'></div>");
				var sentence = $.trim(items[i].getElementsByTagName("sentence")[0].firstChild.nodeValue);
				//使IE支持indexOf
				if(!Array.indexOf)
				{
				    Array.prototype.indexOf = function(obj)
				    {               
				        for(var i=0; i<this.length; i++)
				        {
				            if(this[i]==obj)
				            {
				                return i;
				            }
				        }
				        return -1;
				    }
				} 
				var startIndex = sentence.indexOf("[[");
				var endIndex = sentence.indexOf("]]");
				var subSentence = sentence.substring(startIndex,endIndex+2);
				var length = sentence.length-4;
				var textLeft = sentence.replace(subSentence,"<strong style='text-decoration: underline;'>"+sentence.substring(startIndex+2,endIndex)+"</strong>");
				if(length > 51){
					divLeft.append("<div id='div_freq_left_sts_"+i+"' class='div-freq-left-sents'>"+textLeft+"</div>");
				}else{
					divLeft.append("<div id='div_freq_left_sts_"+i+"' class='div-freq-left-sents-middle'>"+textLeft+"</div>");
				}
				$("#div_consolidating_body_left").append(divLeft);

				/*使可被放置*/
				$("#div_freq_left_"+i).droppable({
					hoverClass:"div-freq-left-hover",
					tolerance:"touch",
					drop:function(event,ui){
						//获得放置框序号
						var no = parseInt($(this).attr("id").charAt(14));
						//获得拖拉框序号
						var index = parseInt(ui.draggable.attr("id").charAt(20));
						//设置该位子被放置
						droppedOrder[mode][no] = "1";
						//放置时，所在行的右边框框移到拿起的位置
						var divMeaning = $("#div_freq_right_"+rightFlags[no]).children();
						if(divMeaning.offset().left >= 430 && divMeaning.offset().top == $("#div_freq_right_"+no).offset().top){
							var currTop = $("#div_freq_right_"+currIndex).offset().top;
							var currLeft = $("#div_freq_right_"+currIndex).offset().left;
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



//生成问题 (复习)
function createFrequentlyQuesReview(mode){
	//设置direction
	$("#div_direction").html("");
	$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>词义配对：</strong><span style='font-size:15pt;'>仔细阅读左列中的句子，在右列中找出这个单词在句中的释义，一一配对。用鼠标拖动释义与相对应的句子“对接”。</span></div>");

	//生成题目
	$.ajax({
		url:"/voc_exer/index.php/voc_exer_c/get_xml_material",
		type:"post",
		dataType:"json",
		data:{
			serial_number:serialNumber,
			part: 2
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data);
			//获得题目数组
			var items = null;
			if(mode == 0){
				//items = xmlDoc.getElementsByTagName("frequently_used_words")[0].getElementsByTagName("items")[0].getElementsByTagName("item")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
				items = xmlDoc.getElementsByTagName("frequently_used_words")[0].
						getElementsByTagName("items")[0].getElementsByTagName("word")[0].
						parentNode.getElementsByTagName("items")[0].getElementsByTagName("item");
				
			}else{
				//items = xmlDoc.getElementsByTagName("frequently_used_words")[0].getElementsByTagName("items")[0].getElementsByTagName("item")[7].getElementsByTagName("items")[0].getElementsByTagName("item");
				items = xmlDoc.getElementsByTagName("frequently_used_words")[0].
						getElementsByTagName("items")[0].getElementsByTagName("word")[1].
						parentNode.getElementsByTagName("items")[0].getElementsByTagName("item");
			}
			//题目数小于6道则赋值，多于等于6道都取6道
			if(items.length < 6){
				itemsNum = items.length; 
			}
			//清除原有内容
			$("#div_consolidating_body_left").html("");
			$("#div_consolidating_body_middle").html("");
			$("#div_consolidating_body_right").html("");

			$("#div_consolidating_body_left").append("<div class='div-consolidating-body-left-head'>Sentence</div>");
			$("#div_consolidating_body_right").append("<div align='right' class='div-consolidating-body-right-head'>Meanings</div>");

			for(var i=0;i<itemsNum;i++){
				//添加右边内容
				var divRight = $("<div id='div_freq_right_"+i+"' class='div-freq-right'></div>");
				var textRight = $.trim(items[i].getElementsByTagName("definition")[0].firstChild.nodeValue);
				if(textRight.length > 57){
					divRight.append("<div id='div_freq_right_mean_"+i+"' class='div-freq-right-mean' style='cursor:auto'><div>"+textRight+"</div></div>");
				}else{
					divRight.append("<div id='div_freq_right_mean_"+i+"' class='div-freq-right-mean-middle' style='cursor:auto'><div>"+textRight+"</div></div>");
				}
				$("#div_consolidating_body_right").append(divRight);

				//添加左边内容
				var divLeft = $("<div id='div_freq_left_"+i+"' class='div-freq-left'></div>");
				var sentence = $.trim(items[i].getElementsByTagName("sentence")[0].firstChild.nodeValue);
				var startIndex = sentence.indexOf("[[");
				var endIndex = sentence.indexOf("]]");
				var subSentence = sentence.substring(startIndex,endIndex+2);
				var length = sentence.length-4;
				var textLeft = sentence.replace(subSentence,"<strong style='text-decoration: underline;'>"+sentence.substring(startIndex+2,endIndex)+"</strong>");
				if(length > 51){
					divLeft.append("<div id='div_freq_left_sts_"+i+"' class='div-freq-left-sents'>"+textLeft+"</div>");
				}else{
					divLeft.append("<div id='div_freq_left_sts_"+i+"' class='div-freq-left-sents-middle'>"+textLeft+"</div>");
				}
				$("#div_consolidating_body_left").append(divLeft);

				//固定到左边
				var stsLeft = divLeft.offset().left;
				var stsTop = divLeft.offset().top;
				divRight.offset({top:stsTop,left:stsLeft+375});
			}
		}});
}

//生成问题2 (复习)
function createFrequentlyQuesReview2(mode){
	//设置direction
	$("#div_direction").html("");
	$("#div_direction").html("<div style='width:70%'><strong style='font-size:15pt;'>词义配对：</strong><span style='font-size:15pt;'>仔细阅读左列中的句子，在右列中找出这个单词在句中的释义，一一配对。用鼠标拖动释义与相对应的句子“对接”。</span></div>");

	//生成题目
	$.ajax({
		url:"/voc_exer/index.php/voc_exer_c/get_xml_material",
		type:"post",
		dataType:"json",
		data:{
			serial_number:serialNumber,
			part: 2
		},
		success:function(data,textStatus){
			//加载并解析xml文件
			var xmlDoc = parseXmlString(data);
			//获得题目数组
			var items = null;
			var items = null;
			if(mode == 0){
				//items = xmlDoc.getElementsByTagName("frequently_used_words")[0].getElementsByTagName("items")[0].getElementsByTagName("item")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
				items = xmlDoc.getElementsByTagName("frequently_used_words")[0].
						getElementsByTagName("items")[0].getElementsByTagName("word")[0].
						parentNode.getElementsByTagName("items")[0].getElementsByTagName("item");
				
			}else{
				//items = xmlDoc.getElementsByTagName("frequently_used_words")[0].getElementsByTagName("items")[0].getElementsByTagName("item")[7].getElementsByTagName("items")[0].getElementsByTagName("item");
				items = xmlDoc.getElementsByTagName("frequently_used_words")[0].
						getElementsByTagName("items")[0].getElementsByTagName("word")[1].
						parentNode.getElementsByTagName("items")[0].getElementsByTagName("item");
			}
			//题目数小于6道则赋值，多于等于6道都取6道
			if(items.length < 6){
				itemsNum = items.length; 
			}
			//清除原有内容
			$("#div_consolidating_body_left").html("");
			$("#div_consolidating_body_middle").html("");
			$("#div_consolidating_body_right").html("");

			$("#div_consolidating_body_left").append("<div class='div-consolidating-body-left-head'>Sentence</div>");
			$("#div_consolidating_body_right").append("<div align='right' class='div-consolidating-body-right-head'>Meanings</div>");

			//添加内容
			userOrder = frequentlyAnsw.getElementsByTagName("user_order")[0].firstChild.nodeValue;
			dropOrder = frequentlyAnsw.getElementsByTagName("drop_order")[0].firstChild.nodeValue;
			answOrder = frequentlyAnsw.getElementsByTagName("answ_order")[0].firstChild.nodeValue;
			for(var i=0;i<itemsNum;i++){
				//添加右边内容
				var divRight = $("<div id='div_freq_right_"+i+"' class='div-freq-right'></div>");
				var textRight = $.trim(items[parseInt(answOrder.charAt(parseInt(userOrder.charAt(i))))-1].getElementsByTagName("definition")[0].firstChild.nodeValue);
				
				if(textRight.length > 57){
					divRight.append("<div id='div_freq_right_mean_"+i+"' class='div-freq-right-mean' style='cursor:auto'><div>"+textRight+"</div></div>");
				}else{
					divRight.append("<div id='div_freq_right_mean_"+i+"' class='div-freq-right-mean-middle' style='cursor:auto'><div>"+textRight+"</div></div>");
				}
				$("#div_consolidating_body_right").append(divRight);

				//添加左边内容
				var divLeft = $("<div id='div_freq_left_"+i+"' class='div-freq-left'></div>");
				var sentence = $.trim(items[i].getElementsByTagName("sentence")[0].firstChild.nodeValue);
				var startIndex = sentence.indexOf("[[");
				var endIndex = sentence.indexOf("]]");
				var subSentence = sentence.substring(startIndex,endIndex+2);
				var length = sentence.length-4;
				var textLeft = sentence.replace(subSentence,"<strong style='text-decoration: underline;'>"+sentence.substring(startIndex+2,endIndex)+"</strong>");
				if(length > 51){
					divLeft.append("<div id='div_freq_left_sts_"+i+"' class='div-freq-left-sents'>"+textLeft+"</div>");
				}else{
					divLeft.append("<div id='div_freq_left_sts_"+i+"' class='div-freq-left-sents-middle'>"+textLeft+"</div>");
				}
				$("#div_consolidating_body_left").append(divLeft);

				if(dropOrder.charAt(i) == "1"){
					//固定到左边
					var stsLeft = divLeft.offset().left;
					var stsTop = divLeft.offset().top;
					divRight.offset({top:stsTop,left:stsLeft+375});
					//添加对错标志
					var index = parseInt(userOrder.charAt(i));
					if(answOrder.charAt(index) == (i+1)+""){
						if ($.browser.msie&&parseInt($.browser.version,10)===6){
							$("#div_freq_right_mean_"+i+" div").prepend("<span class='badge badge-success' style='margin-right:5px'>R</span>");
						}else{
							$("#div_freq_right_mean_"+i+" div").prepend("<span class='badge badge-success' style='margin-right:5px'><i class='icon-ok icon-white'></i></span>");
						}
					}else{
						if ($.browser.msie&&parseInt($.browser.version,10)===6){
							$("#div_freq_right_mean_"+i+" div").prepend("<span class='badge badge-important' style='margin-right:5px'>F</span>");
						}else{
							$("#div_freq_right_mean_"+i+" div").prepend("<span class='badge badge-important' style='margin-right:5px'><i class='icon-remove icon-white'></i></span>");
						}
					}
				}else{
					//固定到右边
					var currTop = $("#div_freq_right_"+i).offset().top;
					var currLeft = $("#div_freq_right_"+i).offset().left;
					divRight.offset({top:currTop,left:currLeft});
				}
			}
		}});
}

//显示用户答案（复习）
function showUserAnswers(){
	$("#button_user_answer").attr("disabled","disabled");
	$("#button_right_answer").removeAttr("disabled");
	getConsolidatingAnswers(currMode);
	createFrequentlyQuesReview2(currMode);
}

//显示正确答案（复习）
function showRightAnswers(){
	$("#button_right_answer").attr("disabled","disabled");
	$("#button_user_answer").removeAttr("disabled");
	getConsolidatingAnswers(currMode);
	createFrequentlyQuesReview(currMode);
}

//重置
function reset(currStep){
	if(currStep == 4){//第一部份
		createFrequentlyQues(currMode);
	}else{//第二部份
		createFrequentlyQues(currMode);
	}
}

//转发器
function nextStep(){
	currStep++;

	//显示相应页面
	if(currStep == 5){//转向第五步
		setUserAnswString();
		currMode = 1;
		createFrequentlyQues(currMode);
	}else if(currStep == 6){//转向第六步，其他页面
		setUserAnswString();
		saveConsolidating();
	}else if(currStep == 13){//转向第13步
		currMode = 1;
		showRightAnswers();
	}else if(currStep == 14){//转向第15步，其他页面
		window.location = "/voc_exer/index.php/voc_exer_c/show_finetuning/"+userId+"/"+serialNumber+"/1";
	}
}

//设置用户答案字符串
function setUserAnswString(){
	if(currStep == 5){//记录第四步用户答案
		userAnswString += "<consolidating>";
		userAnswString += "<frequently_used_words>";
		userAnswString += "<user_order>"+rightFlags.join("")+"</user_order>";
		userAnswString += "<drop_order>"+droppedOrder[0].join("")+"</drop_order>";
		userAnswString += "<answ_order>"+answerOrder[0]+"</answ_order>";
		userAnswString += "</frequently_used_words>";
	}else if(currStep == 6){//记录第五步用户答案
		userAnswString += "<frequently_used_words>";
		userAnswString += "<user_order>"+rightFlags.join("")+"</user_order>";
		userAnswString += "<drop_order>"+droppedOrder[1].join("")+"</drop_order>";
		userAnswString += "<answ_order>"+answerOrder[1]+"</answ_order>";
		userAnswString += "</frequently_used_words>";
		userAnswString += "</consolidating>";
	}
}

//保存答案
function saveConsolidating(){
	$.ajax({
		url:"/voc_exer/saveConsolidating",
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
			window.location = "/voc_exer/showFinetuning?userId="+userId+"&serialNumber="+serialNumber;
		}
	});
}