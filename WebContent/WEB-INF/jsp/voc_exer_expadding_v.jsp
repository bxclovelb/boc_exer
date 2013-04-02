<%@page language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="zh-en">
<head>
<meta charset="utf-8">
<title>冰果英语：词汇增强</title>

<script src="/voc_exer/res/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/jquery-ui-1.9.2.custom.min.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/voc_exer/res/js/jquery.jplayer.min.js"></script>
<script src="/voc_exer/res/js/expadding.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/commons.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/turner.js" type="text/javascript"></script>

<link href="/voc_exer/res/css/jquery-ui-1.10.1.custom.min.css"
	rel="stylesheet">
<link href="/voc_exer/res/css/bootstrap.min.css" rel="stylesheet">
<link href="/voc_exer/res/css/expadding.css" rel="stylesheet">
<link href="/voc_exer/res/css/whole.css" rel="stylesheet">
 

<!--[if IE 6]>
	<link href="/voc_exer/res/css/ie6.min.css" rel="stylesheet">
<![endif]-->
    
</head>
<body>
	<!-- navbar -->
	<%@include file="voc_exer_navbar_v.jsp" %>
	<!-- navbar end -->
	
	<div class="container"
		style="margin-top: 40px; z-index: 1; border: 1px solid gray">
		
		<!-- include header start -->
		<%@include file="voc_exer_head_v.jsp" %>
		<!-- include header end -->
		
		<div class="row-fluid div-body" id="div_body">
		
			<!-- matching start -->
			<div id="div_matching" class='active'>
				<div class='span3' style="margin-left:1.4%" id='div_section_1'></div>
				<div class='span3' style="margin-left:1.4%" id='div_section_2'></div>
				<div class='span3' style="margin-left:1.4%" id='div_section_3'></div>
				<div class='span3' style="margin-left:1.4%" id='div_section_4'></div>
			</div>
			<!-- matching end -->
			
			<!-- spelling start -->
			<div id="div_spelling" 
				style="display: none; margin-top: 30px;margin-left: 30px;margin-right: 30px; border-radius: 10px 10px 10px 10px; background: url(/voc_exer/res/img/bg_body.jpg) repeat-x scroll 0% 0% transparent; height: 550px;">
				<div id="div_section_left" style="padding-left: 30px;width:400px" class="span6">
					<div id="div_listen" style="margin-top: 60px">
						<div id="jquery_jplayer"></div>
						<img src="/voc_exer/res/img/headset.png"> <span
							style="margin-left: 20px" id="span_balls"> <img
							src="/voc_exer/res/img/ball.png"> <img
							src="/voc_exer/res/img/ball.png"> <img
							src="/voc_exer/res/img/ball.png">
						</span>
					</div>
					<div id="div_input"
						style="margin-top: 30px; background-color: #c8e3f9; height: 100px; width: 350px; border-radius: 10px 10px">
						<img style="margin-top: 18px"
							src="/voc_exer/res/img/pen.png"> <input type="button"
							onclick="createSpellingQues();"
							style="margin-left: 50px; width: 150px" value="开始"
							class="btn-large btn-info">
					</div>
					<div id="div_question" style="margin-top: 30px;background-color: #c8e3f9;width:350px;border-radius: 5px 5px;display:none"></div>
					<div id="div_info" style="width:350px;position:absolute;top:550px">
						<div
							style="height: 20px; margin-top: 200px; background: url(/voc_exer/res/img/info.png); padding: 10px">
							请点击开始按钮开始听写。</div>
						<div style="height: 20px; margin-top: 10px;"></div>
					</div>
				</div>
				<div id="div_section_right"
					style="margin-left: 30px;width:420px" class="span6">
					<div
						style="width: 180px; height: 420px; float: left; margin-top: 70px; background-color: #c8e3f9; border-radius: 10px 10px">
						<div align="center" style="font-size: 15pt; margin-top: 20px">
							您的答案
						</div>
						<div id="div_user_choosed" style="margin: 15px; border: 1px solid #54aff7;width:148px; height: 350px; border-radius: 10px 10px ; overflow:auto">
						</div>
					</div>
					<div
						style="width: 180px; height: 420px; float: left; margin-top: 70px; margin-left: 20px; background-color: #c8e3f9; border-radius: 10px 10px">
						<div align="center" style="font-size: 15pt; margin-top: 20px">
							单词列表
						</div>
						<div id="div_right_answer"  
							style="margin: 15px; border: 1px solid #54aff7;width:148px; height: 350px; border-radius: 10px 10px ; overflow:auto">
						</div>
					</div>
				</div>
			</div>
			<!-- spelling end -->
			
			<!-- completion start -->
			<div id="div_completion" style="padding:10px;background-color: white;">
				<div id='div_completion_left' style="margin-left:1%" class='span6' ></div>
				<div id='div_completion_right' style="margin-left:1%" class='span6'></div>
			</div>
			<!-- completion end -->
			
		</div>
	</div>
	<div id="div_mess_input_word" class="message">请输入单词。</div>
	<form>
		<input id="hidden_user_id" type="hidden" value='<s:property value="userId"/>'>
		<input id="hidden_serial_number" type="hidden" value="<s:property value="serialNumber"/>"> 
		<input id="hidden_is_review" type="hidden" value="<s:property value="isReview"/>"> 
		<input id="hidden_part" type="hidden" value="<s:property value="part"/>"> 
	</form>
	
	<script>
		$(function(){if($.browser.msie&&parseInt($.browser.version,10)===6){$('.row div[class^="span"]:last-child').addClass("last-child");$(':button[class="btn"], :reset[class="btn"], :submit[class="btn"], input[type="button"]').addClass("button-reset");$(":checkbox").addClass("input-checkbox");$('[class^="icon-"], [class*=" icon-"]').addClass("icon-sprite");$(".pagination li:first-child a").addClass("pagination-first-child")}})
	</script>
</body>
</html>
