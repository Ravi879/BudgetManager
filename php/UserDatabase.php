
<?php
require('Database.php');

class UserDatabase{
		var $collection;
	    const key_username = "username";
		const key_email = "email";
		const key_password = "password";
		const key_id = "_id";
		const key_expense = "expense";
		const key_income = "income";
		const key_user_collection = "user";
		
		public function __construct(){
			
		}
		
		function initDatabase(){	
			$flag = false;
			$conn = Database::getConnection();
			if($conn){
				$this->collection = $conn->selectCollection( Database::database, UserDatabase::key_user_collection);
				$flag = true;
			} 
			return $flag;
		}

		function createUser($username, $email, $password){
			$ary = [];
			if($this->isExists(UserDatabase::key_username, $username)){
				$ary["message"] = "User Name already exists";
				return $ary;
			}

			if($this->isExists(UserDatabase::key_email, $email)){
				$ary["message"] = "E-mail address already exists";
				return $ary;
			}

			if($this->isExists(UserDatabase::key_password, $password)){
				$ary["message"] = "Password not Available";
				return $ary;
			}


			$ary = $this->collection -> insert(
				array(UserDatabase::key_username => $username,
				UserDatabase::key_email => $email,
				UserDatabase::key_password => $password,
				UserDatabase::key_income => 0,
				UserDatabase::key_expense => 0)
			);
			return $ary;
		}

		function isExists($key,$val){
			$cursor = $this->collection -> find(
				array($key=>$val)
			);
			$flag = false;
			foreach($cursor as $c){
				$flag = true;
			}
			return $flag;
		}

		function getSingleUser($email,$password){
			$cursor = $this->collection -> find(
				(array(UserDatabase::key_email => $email,UserDatabase::key_password => $password)),
				array(UserDatabase::key_id=>1));	

			$id = false;
			foreach($cursor as $doc){
				if($doc[UserDatabase::key_id]){
					$id = $doc[UserDatabase::key_id];
				}
			}
			return $id;
		}
	}


?>



