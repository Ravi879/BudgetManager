<?php

class Database{
	const host="mongodb://localhost:27017";
	const username="users";
	const password="abc123";
	const database="budgety";


	public static function getConnection(){
		$conn = false;
		try{
			 $conn =  new MongoClient(
				Database::host,
				  array("username" => Database::username, 
						"password" => Database::password, 
                        "db"=> Database::database
					));
					
		}catch( Exception $e){
			echo  "<center><h1>Doesn't work</h1></center>";
			print_r($e);
		  
			$conn = false;
		}finally{
          return $conn;
		}
	}
		
}

?>

