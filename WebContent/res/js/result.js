var userId = "";
var serialNumber = "";
var xmlDoc = null;
var wrongWordNo = 0;
var currStep = 8;

$(function(){
	userId = $("#hidden_user_id").val();
	serialNumber = $("#hidden_serial_number").val();
	
	$("#div_result_body").tabs();
	setDirection();
	setResultInfo();
});

//设置Direction
function setDirection(){
	//设置direction
	$("#div_direction").html("");
	$("#div_direction").append("<div style='float:left'><a href='###' onclick='review();'><img src='/voc_exer/res/img/review.png'/></a></div>");
	$("#div_direction").append("<div style='float:left;margin-left:20px'><a href='###' onclick='showWaitMessage();'><img src='/voc_exer/res/img/vocabulary.png'/></a></div>");
}

//设置结果信息
function setResultInfo(){
	//访问数据库获得答案信息
	$.ajax({
		url:"/voc_exer/getContents",
		type:"post",
		dataType:"json",
		data:{
			userId: userId,
			serialNumber: serialNumber
		},
		success:function(data,textStatus){
			//获得三个xml字符串
			var content1 = data.contents[0];
			var content2 = data.contents[1];
			var content3 = data.contents[2];
			
			$.ajax({
				url:"/voc_exer/getXmlMaterial",
				type:"post",
				dataType:"json",
				data:{
					serialNumber:serialNumber,
					part: 1
				},
				success:function(data,textStatus){
					//加载并解析第一部份xml字符串
					var xmlDocPart1 = parseXmlString(data.xml);
					
					//词义选择部分
					/*计数器*/
					var matchingRightCount = 0;
					var matchingWrongCount = 0;
					/*获得答案数组*/
					xmlDoc = parseXmlString(content1);
					var matchingItems = xmlDoc.getElementsByTagName("matching")[0].getElementsByTagName("item");
					//获得题目数组
					var matchingQuess = xmlDocPart1.getElementsByTagName("matching")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
					//获得题目个数
					var matchingCount = matchingQuess.length;
					/*比较对错*/
					for(var i=0;i<matchingCount;i++){
						userChoose = matchingItems[i].getElementsByTagName("user_choose")[0].firstChild.nodeValue;
						order = matchingItems[i].getElementsByTagName("order")[0].firstChild.nodeValue;
						if(order.charAt(userChoose-1) == "1"){
							matchingRightCount++;
						}else{
							matchingWrongCount++;
							//记录错误单词
							var word = matchingQuess[i].getElementsByTagName("word")[0].firstChild.nodeValue; 
							recordWrongWord(word,0);
						}
					}
					/*设置页面*/
					$("#tbody_info").html("");
					var matchingTr = $("<tr class='warning'></tr>");
					matchingTr.append("<td>选择词义</td>");
					matchingTr.append("<td>"+matchingRightCount+"</td>");
					matchingTr.append("<td>"+matchingWrongCount+"</td>");
					matchingTr.append("<td>"+Math.round(matchingRightCount*100/matchingCount)+"%</td>");
					$("#tbody_info").append(matchingTr);

					//拼写练习部分
					/*计数器*/
					var spellingRightCount = 0;
					var spellingWrongCount = 0;
					/*获得答案数组*/
					xmlDoc = parseXmlString(content1);
					var spellingItems = xmlDoc.getElementsByTagName("spelling")[0].getElementsByTagName("item");
					//获得题目数组
					var spellingQuess = xmlDocPart1.getElementsByTagName("spelling")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
					//获得题目个数
					var spellingCount = spellingQuess.length;
					/*比较对错*/
					for(var i=0;i<spellingCount;i++){
						userSpelling = spellingItems[i].getElementsByTagName("user_spell")[0].firstChild.nodeValue;
						answSpelling = spellingItems[i].getElementsByTagName("answ_spell")[0].firstChild.nodeValue;
						if(userSpelling != "0"){
							if(userSpelling == answSpelling){
								spellingRightCount++;
							}else{
								spellingWrongCount++;
								//记录错误单词
								var word = spellingQuess[i].getElementsByTagName("word")[0].firstChild.nodeValue; 
								recordWrongWord(word,1);
							}
						}else{
							spellingWrongCount++;
							//记录错误单词
							var word = spellingQuess[i].getElementsByTagName("word")[0].firstChild.nodeValue; 
							recordWrongWord(word,1);
						}
					}
					/*设置页面*/
					var spellingTr = $("<tr class='info'></tr>");
					spellingTr.append("<td>拼写练习</td>");
					spellingTr.append("<td>"+spellingRightCount+"</td>");
					spellingTr.append("<td>"+spellingWrongCount+"</td>");
					spellingTr.append("<td>"+Math.round(spellingRightCount*100/spellingCount)+"%</td>");
					$("#tbody_info").append(spellingTr);

					//选词填空部分
					/*计数器*/
					var completionRightCount = 0;
					var completionWrongCount = 0;
					/*获得答案数组*/
					xmlDoc = parseXmlString(content1);
					var completionItems = xmlDoc.getElementsByTagName("completion")[0].getElementsByTagName("item");
					//获得题目数组
					var completionQuess = xmlDocPart1.getElementsByTagName("completion")[0].getElementsByTagName("items")[0].getElementsByTagName("item");
					//获得题目个数
					var completionCount = completionQuess.length;
					/*比较对错*/
					for(var i=0;i<completionCount;i++){
						userChoose = completionItems[i].getElementsByTagName("user_choose")[0].firstChild.nodeValue;
						order = completionItems[i].getElementsByTagName("order")[0].firstChild.nodeValue;
						if(order.charAt(userChoose-1) == "1"){
							completionRightCount++;
						}else{
							completionWrongCount++;
							//记录错误单词
							var word = completionQuess[i].getElementsByTagName("word")[0].firstChild.nodeValue; 
							recordWrongWord(word,2);
						}
					}
					/*设置页面*/
					var completionTr = $("<tr class='warning'></tr>");
					completionTr.append("<td>选词填空</td>");
					completionTr.append("<td>"+completionRightCount+"</td>");
					completionTr.append("<td>"+completionWrongCount+"</td>");
					completionTr.append("<td>"+Math.round(completionRightCount*100/completionCount)+"%</td>");
					$("#tbody_info").append(completionTr);

					//按句选义部分
					/*计数器*/
					var frequentlyRightCount = 0;
					var frequentlyWrongCount = 0;
					/*获得答案数组*/
					xmlDoc = parseXmlString(content2);
					for(var i=0;i<2;i++){
						var frequentlyItems = xmlDoc.getElementsByTagName("frequently_used_words");
						/*比较对错*/
						userOrder = frequentlyItems[i].getElementsByTagName("user_order")[0].firstChild.nodeValue;
						dropOrder = frequentlyItems[i].getElementsByTagName("drop_order")[0].firstChild.nodeValue;
						answOrder = frequentlyItems[i].getElementsByTagName("answ_order")[0].firstChild.nodeValue;
						for(var j=0;j<userOrder.length;j++){
							if(dropOrder.charAt(j) == "1"){
								var index = parseInt(userOrder.charAt(j));
								if(answOrder.charAt(index) == (j+1)+""){
									frequentlyRightCount++;
								}else{
									frequentlyWrongCount++;
								}
							}else{
								frequentlyWrongCount++;
							}
						}
					}
					/*设置页面*/
					var frequentlyTr = $("<tr class='info'></tr>");
					frequentlyTr.append("<td>按句选义</td>");
					frequentlyTr.append("<td>"+frequentlyRightCount+"</td>");
					frequentlyTr.append("<td>"+frequentlyWrongCount+"</td>");
					frequentlyTr.append("<td>"+Math.round(frequentlyRightCount*100/12)+"%</td>");
					$("#tbody_info").append(frequentlyTr);

					//词语搭配部分
					/*计数器*/
					var partnershipRightCount = 0;
					var partnershipWrongCount = 0;
					/*获得答案数组*/
					xmlDoc = parseXmlString(content3);
					for(var i=0;i<2;i++){
						var partnershipItems = xmlDoc.getElementsByTagName("word_partnership");
						/*比较对错*/
						userOrder = partnershipItems[i].getElementsByTagName("user_order")[0].firstChild.nodeValue;
						dropOrder = partnershipItems[i].getElementsByTagName("drop_order")[0].firstChild.nodeValue;
						answOrder = partnershipItems[i].getElementsByTagName("answ_order")[0].firstChild.nodeValue;
						for(var j=0;j<userOrder.length;j++){
							if(dropOrder.charAt(j) == "1"){
								var index = parseInt(userOrder.charAt(j));
								if(answOrder.charAt(index) == (j+1)+""){
									partnershipRightCount++;
								}else{
									partnershipWrongCount++;
								}
							}else{
								partnershipWrongCount++;
							}
						}
					}
					/*设置页面*/
					var partnershipTr = $("<tr class='warning'></tr>");
					partnershipTr.append("<td>词语搭配</td>");
					partnershipTr.append("<td>"+partnershipRightCount+"</td>");
					partnershipTr.append("<td>"+partnershipWrongCount+"</td>");
					partnershipTr.append("<td>"+Math.round(partnershipRightCount*100/10)+"%</td>");
					$("#tbody_info").append(partnershipTr);

					//更新本次所得分数
					var score = Math.round((matchingRightCount*100/matchingCount + spellingRightCount*100/spellingCount + completionRightCount*100/completionCount + frequentlyRightCount*100/12 + partnershipRightCount*100/10) * 100 / 500);
					$.ajax({
						url:"/voc_exer/updateScore",
						type:"post",
						dataType:"json",
						data:{
							userId: userId,
							serialNumber: serialNumber,
							score: score
						},
						success:function(data,textStatus){
							if(!data){
								alert("成绩保存失败！请稍后重试。");
							}
						}
					});
				}

			});
		}
	});
}

//记录错误单词
function recordWrongWord(word,type){
	var div = $("<div class='div-the-word'></div>");
	div.click(function(){
		turnToWrongWord(type);
	});
	div.append("<div class='div-the-word-left' align='center'>"+word+"</div>");
	if(type == 0){
		div.append("<div class='div-the-word-right' align='center'>选择词义</div>");
	}else if(type == 1){
		div.append("<div class='div-the-word-right' align='center'>拼写练习</div>");
	}else if(type == 2){
		div.append("<div class='div-the-word-right' align='center'>选词填空</div>");
	}else if(type == 3){
		div.append("<div class='div-the-word-right' align='center'>按句选义</div>");
	}else{
		div.append("<div class='div-the-word-right' align='center'>词语搭配</div>");
	}
	$("#div_word_"+(wrongWordNo%4 + 1)).append(div);
	if(wrongWordNo >= 23){
		if(wrongWordNo % 4 == 3){
			var height = parseInt($("#div_word_body").css("height")) + 50;
			$("#div_word_body").css("height",height);
		}
	}
	wrongWordNo++;
}

//转向错误单词相应页面
function turnToWrongWord(type){
	if(type == 0){
		window.location = "/voc_exer/showExpadding?userId="+userId
		+"&serialNumber="+serialNumber+"&isReview=1&part=1";
	}else if(type == 1){
		window.location = "/voc_exer/showExpadding?userId="+userId
		+"&serialNumber="+serialNumber+"&isReview=1&part=2";
	}else if(type == 2){
		window.location = "/voc_exer/showExpadding?userId="+userId
		+"&serialNumber="+serialNumber+"&isReview=1&part=3";
	}
}

//进入复习模式
function review(){
	window.location = "/voc_exer/showExpadding?userId="+userId
	+"&serialNumber="+serialNumber+"&isReview=1";
}

//转发器
function nextStep(){
	currStep++;
	
	//显示相应页面
	if(currStep == 9){//转向第九步（复习模式），其他页面
		window.location = "/voc_exer/showExpadding?userId="+userId
			+"&serialNumber="+serialNumber+"&isReview=1";
	}
}

function showWaitMessage(){
	$("#div_mess_wait").dialog({
		autoOpen:false,
		draggable:false,
		modal:true,
		resizable:false,
		width:300,
		height:200,
		hide:{effect:"clip",duration:500},
		dialogClass:"message",
		title:"<div style='font-size:15px;' align='center'><i class='icon-exclamation-sign icon-white'></i><strong>冰果英语助手提醒您</strong></div>"
	});
	$("#div_mess_wait").dialog("open");
}