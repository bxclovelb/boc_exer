<%@page language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="s" uri="/struts-tags"%>
<div class="navbar navbar-fixed-top">
	<div class="navbar-inner">
		<img src="/voc_exer/res/images/bingo.png" style="float: left"> <a
			class="brand" href="javascript:void(0);">英语</a>
		<ul class="nav">
			<li><a href="javascript:void(0);" onclick="goToVocInfo();">个人词汇信息</a>
			</li>
			<li><a id="a_vocbook" href="javascript:void(0);" onclick="goToVocbook();">词汇本</a>
			</li>
			<li><a id="a_voc_test" href="javascript:void(0);" onclick="goToVocTest();">词汇量测试</a>
			</li>
			<li class="active"><a id="a_voc_exer" href="javascript:void(0);">词汇练习</a>
			</li>
		</ul>
	</div>
</div>
