	//转向个人词汇信息
	function goToVocInfo(){
		window.location = "/voc_info/showInfo?userId="+userId;
	} 

	//转向词汇量测试
	function goToVocTest(){
		window.location = "/voc_test/showPage?userId="+userId;
	}
	
	//转向词汇本
	function goToVocbook(){
		//获得用户上一次所选级别
		$.getJSON("/voc_info/getUserBand?userId="+userId+"&rand="+Math.random(),
			function(data){
				//转向词汇本
				window.location = "/voc_book/showNormal?userId="+userId+"&theBand="+data.band+"&model=0";
			}
		);
	}