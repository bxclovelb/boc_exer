<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Voc_exe_m extends CI_Model {
	
	function __construct() {
		parent::__construct();
		$this->load->database();
		date_default_timezone_set('PRC');
	}
	
	function create_record($user_id,$serial_number){
		$sql = "SELECT count(*) count FROM user_vocabulary_submit_record ".
			"WHERE user_id='".$user_id."' AND serial_number='".$serial_number."'";
		$result = $this->db->query($sql)->result();
		$count = $result[0]->count;
		if($count == 0){
			$sql = "INSERT INTO user_vocabulary_submit_record(user_id,date_time,serial_number,score) VALUES('".
				$user_id."','".date('Y-m-d H:i:s')."','".$serial_number."',-1)";
			$this->db->query($sql);
		}else{
			$sql = "UPDATE user_vocabulary_submit_record SET date_time ='".
			date('Y-m-d H:i:s')."' WHERE user_id='".$user_id."' AND serial_number='".
			$serial_number."'";
			$this->db->query($sql);
		}
	}
	
	function save_ip($ip){
		$ips = explode(".", $ip);
		for($i=0;$i<4;$i++){
			$ips[$i] = str_pad($ips[$i], 3,"0",STR_PAD_LEFT);
		}
		$ip_bigint = intval(implode("", $ips));
		
		$sql = "SELECT school FROM ip_restriction WHERE ".$ip_bigint." BETWEEN from_ip AND to_ip";
		$result = $this->db->query($sql)->result();
		if($result == null){
			$school = "unknown";
		}else{
			$school = $result[0]->school;
		}
		
		$sql = "INSERT INTO ip_track(ip_address,school,date_time) VALUES(".$ip_bigint.",'".$school."','".
			date('Y-m-d H:i:s')."')";
		$this->db->query($sql);
	}
	
	function save_expadding($user_id,$serial_number,$user_answ_string){
		$sql = "UPDATE user_vocabulary_submit_record SET date_time ='".
				date('Y-m-d H:i:s')."',content_1='".$user_answ_string.
				"' WHERE user_id='".$user_id."' AND serial_number='".
				$serial_number."'";
		$success = $this->db->query($sql);
		return $success; 
	}
	
	function save_consolidating($user_id,$serial_number,$user_answ_string){
		$sql = "UPDATE user_vocabulary_submit_record SET date_time ='".
				date('Y-m-d H:i:s')."',content_2='".$user_answ_string.
				"' WHERE user_id='".$user_id."' AND serial_number='".
				$serial_number."'";
		$success = $this->db->query($sql);
		return $success;
	}
	
	function save_fineturning($user_id,$serial_number,$user_answ_string){
		$sql = "UPDATE user_vocabulary_submit_record SET date_time ='".
				date('Y-m-d H:i:s')."',content_3='".$user_answ_string.
				"' WHERE user_id='".$user_id."' AND serial_number='".
				$serial_number."'";
		$success = $this->db->query($sql);
		return $success;
	}
	
	function get_contents($user_id,$serial_number){
		$sql = "SELECT content_1,content_2,content_3 FROM user_vocabulary_submit_record ".
				"WHERE user_id='".$user_id."' AND serial_number='".$serial_number."'";
		$result = $this->db->query($sql)->result();
		return $result[0];
	}
	
	function update_score($user_id,$serial_number,$score){
		$sql = "UPDATE user_vocabulary_submit_record SET score_string ='".$score."',score=".
				$score." WHERE user_id='".$user_id."' AND serial_number='".$serial_number."'";
		$success = $this->db->query($sql);
		return $success;
	}
	
	function get_xml_material($serial_number,$part){
		$sql = "SELECT xml_material_part_".$part." xml_material FROM cached_voc_expanding ".
				"WHERE serial_number='".$serial_number."'";
		$result = $this->db->query($sql)->result();
		return $result[0];
	}
}
