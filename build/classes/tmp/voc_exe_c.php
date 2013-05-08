<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Voc_exe_c extends CI_Controller {

	public function index($user_id,$serial_number,$is_review = 0,$part = 1)
	{
		if($is_review == 0){
			$this->load->model("voc_exe_m");
			$this->voc_exe_m->create_record($user_id,$serial_number);
		}
		
		$ip = $this->input->ip_address();
		$this->save_ip($ip);
		
		$data["user_id"] = $user_id;
		$data["serial_number"] = $serial_number;
		$data["is_review"] = $is_review;
		$data["part"] = $part;
		$this->load->view('voc_exe_expadding_v',$data);
	}
	
	function save_ip($ip){
		$this->load->model("voc_exe_m");
		$this->voc_exe_m->save_ip($ip);
	}
	
	function show_consolidating($user_id,$serial_number,$is_review = 0)
	{
		$data["user_id"] = $user_id;
		$data["serial_number"] = $serial_number;
		$data["is_review"] = $is_review;
		$this->load->view('voc_exe_consolidating_v',$data);
	}
	
	function show_finetuning($user_id,$serial_number,$is_review = 0){
		$data["user_id"] = $user_id;
		$data["serial_number"] = $serial_number;
		$data["is_review"] = $is_review;
		$this->load->view('voc_exe_finetuning_v',$data);
	}
	
	function show_result($user_id,$serial_number){
		$data["user_id"] = $user_id;
		$data["serial_number"] = $serial_number;
		$this->load->view('voc_exe_result_v',$data);
	}
	
	function save_expadding(){
		$user_answ_string = $this->input->post("user_answ_string");
		$user_id = $this->input->post("user_id");
		$serial_number = $this->input->post("serial_number");
		$this->load->model("voc_exe_m");
		$success = $this->voc_exe_m->save_expadding($user_id,$serial_number,$user_answ_string);
		echo json_encode($success);
	}
	
	function save_consolidating(){
		$user_answ_string = $this->input->post("user_answ_string");
		$user_id = $this->input->post("user_id");
		$serial_number = $this->input->post("serial_number");
		$this->load->model("voc_exe_m");
		$success = $this->voc_exe_m->save_consolidating($user_id,$serial_number,$user_answ_string);
		echo json_encode($success);		
	}
	
	function save_fineturning(){
		$user_answ_string = $this->input->post("user_answ_string");
		$user_id = $this->input->post("user_id");
		$serial_number = $this->input->post("serial_number");
		$this->load->model("voc_exe_m");
		$success = $this->voc_exe_m->save_fineturning($user_id,$serial_number,$user_answ_string);
		echo json_encode($success);
	}
	
	function get_contents(){
		$serial_number = $this->input->post("serial_number");
		$user_id = $this->input->post("user_id");
		$this->load->model("voc_exe_m");
		$result = $this->voc_exe_m->get_contents($user_id,$serial_number);
		$data["content_1"] = $result->content_1;
		$data["content_2"] = $result->content_2;
		$data["content_3"] = $result->content_3;
		echo json_encode($data);
	}
	
	function update_score(){
		$serial_number = $this->input->post("serial_number");
		$user_id = $this->input->post("user_id");
		$score = $this->input->post("score");
		$this->load->model("voc_exe_m");
		$success = $this->voc_exe_m->update_score($user_id,$serial_number,$score);
		echo json_encode($success);
	}
	
	function get_xml_material(){
		$serial_number = $this->input->post("serial_number");
		$part = $this->input->post("part");
		$this->load->model("voc_exe_m");
		$result = $this->voc_exe_m->get_xml_material($serial_number,$part)->xml_material;
		if($part == "1"){
			
			$data = "<expadding>".str_replace("{MEDIA_PATH}", "http://www.bingoenglish.com/mediafile/voice_mp3", $result)."</expadding>";
		}else if($part == "2"){
			$data = "<consolidating>".$result."</consolidating>";
		}else if($part == "3"){
			$data = "<finetuning>".$result."</finetuning>";
		}
		
		echo json_encode($data);
	}
	
	function test(){
		$this->load->view('test');
	}
}
