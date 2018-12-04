<?php
require('BudgetDatabase.php');
session_start();

	if(isset($_SESSION['id']) && isset($_POST['getData']) ){
		$ID = $_SESSION['id'];
		$data = [];
		$error = [];
		$response = [];

		$db_income = new BudgetDatabase($ID);
		
		if($db_income->initDatabase("income")){
			$ary = $db_income->display();
			if($ary){
				array_push($data, array("income" => $ary) );
			}else{
				array_push($error, array("income"=>"No records found in Income Collection"  ) );
			}
		}else{
			array_push($error, array("database"=> "Database initialition failed"));
		}

		$db_income = new BudgetDatabase($ID);
		
		if($db_income->initDatabase("expense")){
			$ary = $db_income->display();
			if($ary){
				array_push($data, array( "expense" => $ary ) );
			}else{
				array_push($error, array( "expense" => "No records found in Expense Collection"  ));
			}
		}else{
			array_push($error, array( "databse" => "Database initialition failed"));
		}
		$response["data"]=$data;
		$response["error"]=$error;

		echo json_encode(array("response"=>$response));
	}	
	else{
		echo json_encode(array("result"=>"Error, Parameters not passed"));
	}

	
?>