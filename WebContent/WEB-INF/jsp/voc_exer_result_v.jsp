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
<script src="/voc_exer/res/js/jwplayer.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/result.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/commons.js" type="text/javascript"></script>
<script src="/voc_exer/res/js/turner.js" type="text/javascript"></script>

<link href="/voc_exer/res/css/jquery-ui-1.10.1.custom.min.css"
	rel="stylesheet">
<link href="/voc_exer/res/css/bootstrap.min.css" rel="stylesheet">
<link href="/voc_exer/res/css/result.css" rel="stylesheet">
<link href="/voc_exer/res/css/whole.css" rel="stylesheet">

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
				
			<!-- result start -->
			<div id="div_result" class="active">
				<div id="div_result_body" class="div-result-body">
					<ul>
				        <li><a href="#div_result_info">成绩概况</a></li>
				        <li><a href="#div_wrong_word">查看错词</a></li>
				    </ul>
				    <div id="div_result_info">
				    	<div id="div_info_head">
				    		<img src="/voc_exer/res/img/result_book.png" class="img-content"/>
				    		<strong class="strong-content">成绩概况:</strong>
				    	</div>
				    	<div id="div_info_body" class="div-info-body">
				    		<table class="table table-bordered table-hover">
				    			<thead>
				    				<tr>
				    					<td class="td-head"><strong>题目类型</strong></td>
				    					<td class="td-head"><strong>做对题数</strong></td>
				    					<td class="td-head"><strong>做错题数</strong></td>
				    					<td class="td-head"><strong>正确率</strong></td>
				    				</tr>
				    			</thead>
				    			<tbody id="tbody_info">
				    			
				    			</tbody>
				    		</table>
				    	</div>
				    </div>
				    <div id="div_wrong_word">
				    	<div id="div_word_head">
				    		<img src="/voc_exer/res/img/result_book.png" class="img-content"/>
				    		<strong class="strong-content">查看错词:点击可以直接进入查看关于该错词的题型</strong>
				    	</div>
				    	<div id="div_word_body" class="div-word-body">
				    		<div id="div_word_1" class="span3" style="float:left"></div>
				    		<div id="div_word_2" class="span3" style="float:left;margin-left:2.12%"></div>
				    		<div id="div_word_3" class="span3" style="float:left;margin-left:2.12%"></div>
				    		<div id="div_word_4" class="span3" style="float:left;margin-left:2.12%"></div>
				    	</div>
				    </div>
				</div>
			</div>
			<!-- result end -->	
			
		</div>
	</div>
	<form>
		<input id="hidden_user_id" type="hidden" value="<?= $user_id?>">
		<input id="hidden_serial_number" type="hidden" value="<?= $serial_number?>"> 
		<div id="div_mess_wait" class="message">该功能尚未上线，敬请期待！</div>
	</form>
</body>
</html>
