<?php
require('BudgetDatabase.php');
session_start();

if(isset($_SESSION['id']) && isset($_POST['customId']) && isset($_POST['type'])){
	$custom_id = $_POST['customId'];
	$type = $_POST['type'];
	$ID = $_SESSION['id'];

	$db = new BudgetDatabase($ID);
		if($db->initDatabase($type)){
			$deleted =  $db->deleteItem(intval($custom_id));
			if($deleted["n"] == 1){
				echo json_encode(["response"=>"ok"]);
				return;
			}else{
				echo json_encode(["response"=>"Item not deleted"]);
				return;
			}
		}else{
			echo  ["response"=>"Database initialization failed"];
		}
	}else{
		echo json_encode(array("response"=>"error parameter not passed"));
	}

?>