<%@page language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8">
<title>英语：词汇增强</title>
<script src="/voc_exer/res/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/jquery-ui-1.9.2.custom.min.js"
	type="text/javascript"></script>
<script src="/voc_exer/res/js/fineturning.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/commons.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/turner.js" type="text/javascript"></script>

<link href="/voc_exer/res/css/jquery-ui-1.10.1.custom.min.css"
	rel="stylesheet">
<link href="/voc_exer/res/css/bootstrap.min.css" rel="stylesheet">
<link href="/voc_exer/res/css/fineturning.css" rel="stylesheet">
<link href="/voc_exer/res/css/whole.css" rel="stylesheet">

<!--[if IE 6]>
	<link href="/voc_exer/res/css/ie6.min.css" rel="stylesheet">
<![endif]-->

</head>
<body>
	<!-- navbar -->
		<s:include value="voc_exer_navbar_v.jsp"></s:include>
	<!-- navbar end -->
	
	<div class="container"
		style="margin-top: 40px; z-index: 1; border: 1px solid gray;">
		
		<!-- include header start -->
		<s:include value="voc_exer_head_v.jsp"></s:include>
		<!-- include header end -->
		
		<div class="row-fluid div-body" id="div_body">
			<s:if test="$is_review != 1">
				<div id="div_finetuning_head" class="div-finetuning-head">
					<input type="button" value="重置" class="btn" onclick="reset(currStep);">
				</div>
			</s:if>
			<s:else>
				<div id="div_finetuning_head" class="div-finetuning-head">
					<input id="button_right_answer" type="button" value="查看正确答案" class="btn" style="float:right;border:1px solid gray;height:29px" disabled="disabled" onclick="showRightAnswers();">
					<input id="button_user_answer" type="button" value="查看我的答案" class="btn" style="float:right;margin-right:5px;border:1px solid gray;height:29px" onclick="showUserAnswers();">
				</div>
			</s:else>
				
			<!-- finetuning start -->
			<div id="div_finetuning" class="active">
				<div id="div_finetuning_body" class="div-finetuning-body">
					<div id="div_finetuning_body_left" class="div-finetuning-body-left"></div>
					<div id="div_finetuning_body_right" class="div-finetuning-body-right"></div>				
				</div>
			</div>
			<!-- finetuning end -->	
			
		</div>
	</div>
	<form>
		<input id="hidden_user_id" type="hidden" value='<s:property value="userId" />'>
		<input id="hidden_serial_number" type="hidden" value="<s:property value="serialNumber" />">
		<input id="hidden_is_review" type="hidden" value="<s:property value="isReview" />">  
	</form>
	<div id="div_message_success" class="message" style="padding-top:30px">
		恭喜您，已经完成本次词汇训练并提交成功，接下来请看您的答题结果！
		<div align="center" style="margin-top: 120px;"><input type="button" class='btn btn-primary' value="查看" style="width:150px;" onclick="turnToResult();" /></div>
	</div>
	
	<script>
		$(function(){if($.browser.msie&&parseInt($.browser.version,10)===6){$('.row div[class^="span"]:last-child').addClass("last-child");$(':button[class="btn"], :reset[class="btn"], :submit[class="btn"], input[type="button"]').addClass("button-reset");$(":checkbox").addClass("input-checkbox");$('[class^="icon-"], [class*=" icon-"]').addClass("icon-sprite");$(".pagination li:first-child a").addClass("pagination-first-child")}})
	</script>
</body>
</html>
