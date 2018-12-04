
<?php

require("UserDatabase.php");

class BudgetDatabase{
		var $item_collection;
		var $user_collection;
		var $key_type = "type";
		var $key_description = "description";
		var $key_value = "value";
		var $key_id = "custom_id";
		var $id;
	
		public function __construct($id){
			$this->id = $id;
		}

		function initDatabase($type){	
			$flag = false;
			$item_col = "";
			
			$conn = Database::getConnection();
			
			if($conn){
            
				$this->user_collection = $conn->selectCollection( Database::database, UserDatabase::key_user_collection);	
				
				if($type == "income"){
					$income_col = "income_".$this->id;
	 				$this->item_collection = $conn->selectCollection( Database::database, $income_col);
				}else if($type == "expense"){
					$expense_col = "expense_".$this->id;
					$this->item_collection = $conn->selectCollection( Database::database, $expense_col);
				}
				$flag = true;	
			} 
		
			return $flag;
						
		}

		function deleteItem($custom_id){
			 return $this->item_collection -> remove([$this->key_id => $custom_id]);
		}

		function insert($index, $type,$description, $value){
			if( $this->item_collection -> insert(
				array($this->key_type => $type,
				$this->key_description => $description,
				$this->key_value => $value,
				$this->key_id => $index)) )
				{
					echo json_encode(array("result"=>"ok","custom_id"=>$index));			
				}
			else{
				echo json_encode(array("result"=>"error during insrtition"));
			}
		}

		function getItemCustomId($session_id, $type){
			$retVal = $this->user_collection -> findAndModify(
				array('_id' => new MongoID($session_id)),
				array('$inc' => array($type => 1)),
				null,
				array(
					"new" => true,
				)
			);
			return $retVal[$type];

		}

		function display(){
			$cursor = $this->item_collection -> find();	
			if(empty($cursor)){
				return false;
			}else{
				$ary = [];
				foreach ($cursor as $doc) {
					
					array_push($ary,
						array($this->key_type=>$doc[$this->key_type],
						$this->key_description=>$doc[$this->key_description],
						$this->key_value=>$doc[$this->key_value],
						$this->key_id=>$doc[$this->key_id]
					));
				}
				return $ary;
			}
		}
	}

?>

