<%@page language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8">
<title>冰果英语：词汇增强</title>
<script src="/voc_exer/res/js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/jquery-ui-1.9.2.custom.min.js"
	type="text/javascript"></script>
<script src="/voc_exer/res/js/jwplayer.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/consolidating.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/commons.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/turner.js" type="text/javascript"></script>

<link href="/voc_exer/res/css/jjquery-ui-1.10.1.custom.min.css"
	rel="stylesheet">
<link href="/voc_exer/res/css/bootstrap.min.css" rel="stylesheet">
<link href="/voc_exer/res/css/consolidating.css" rel="stylesheet">
<link href="/voc_exer/res/css/whole.css" rel="stylesheet">

<!--[if IE 6]>
	<link href="/voc_exer/res/css/ie6.min.css" rel="stylesheet">
<![endif]-->

</head>
<body>
	<!-- navbar -->
		<?php include 'voc_exer_navbar_v.php'; ?>
	<!-- navbar end -->
	
	<div class="container"
		style="margin-top: 40px; z-index: 1; border: 1px solid gray;">
		
		<!-- include header start -->
		<?php include 'voc_exer_head_v.php'; ?>
		<!-- include header end -->
		
		<div class="row-fluid div-body" id="div_body">
		<?php if ($is_review != 1): ?>
			<div id="div_consolidating_head" class="div-consolidating-head">
				<input type="button" value="重置" class="btn" style="height:28px" onclick="reset(currStep);">
			</div>
		<?php else:?>
			<div id="div_consolidating_head" class="div-consolidating-head">
				<input id="button_right_answer" type="button" value="查看正确答案" class="btn" style="float:right;border:1px solid gray;height:29px" disabled="disabled" onclick="showRightAnswers();">
				<input id="button_user_answer" type="button" value="查看我的答案" class="btn" style="float:right;margin-right:5px;border:1px solid gray;height:29px" onclick="showUserAnswers();">
			</div>
		<?php endif;?>
				
			<!-- consolidating start -->
			<div id="div_consolidating" class="active">
				<div id="div_consolidating_body" class="div-consolidating-body">
					<div id="div_consolidating_body_left" class="div-consolidating-body-left"></div>
					<div id="div_consolidating_body_right" class="div-consolidating-body-right"></div>				
				</div>
			</div>
			<!-- consolidating end -->	
			
		</div>
	</div>
	<form>
		<input id="hidden_user_id" type="hidden" value="<?= $user_id?>">
		<input id="hidden_serial_number" type="hidden" value="<?= $serial_number?>"> 
		<input id="hidden_is_review" type="hidden" value="<?= $is_review?>"> 
	</form>
	
	<script>
		$(function(){if($.browser.msie&&parseInt($.browser.version,10)===6){$('.row div[class^="span"]:last-child').addClass("last-child");$(':button[class="btn"], :reset[class="btn"], :submit[class="btn"], input[type="button"]').addClass("button-reset");$(":checkbox").addClass("input-checkbox");$('[class^="icon-"], [class*=" icon-"]').addClass("icon-sprite");$(".pagination li:first-child a").addClass("pagination-first-child")}})
	</script>
</body>
</html>
